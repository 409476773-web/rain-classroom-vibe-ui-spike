import { expect, test, type Locator, type Page } from "@playwright/test";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const run = "evidence/runtime/chart-behavior-fixes-2026-10-11";
const phase = process.env.RAIN_RADAR_ORIGIN_PHASE ?? "green";
const evidence = `${run}/browser/radar-hover-origin/${phase}`;
const sourcePath = resolve("packages/ui/src/charts/vendor/charts/radar-area.tsx");
const before = await readFile(`${run}/before/packages/ui/src/charts/vendor/charts/radar-area.tsx`, "utf8");
const current = await readFile(sourcePath, "utf8");
const hash = (source: string) => createHash("sha256").update(source).digest("hex");
const viteRequire = createRequire(import.meta.resolve("vite"));
const { transformSync } = await import(viteRequire.resolve("rolldown/utils"));
const compiled = transformSync(sourcePath, before, { jsx: { runtime: "automatic", development: true } }).code;
const marker = "function getStrokeWidth";
const body = compiled.slice(compiled.indexOf(marker));
const ids = ["default", "radar-default", "radar-triangle", "radar-hexagon", "radar-single-series", "radar-minimal", "radar-grid-only"];
const hostFor = (page: Page, id: string) => page.locator(id === "default" ? '[data-rain-id="chart-radar"]' : `[data-chart-variant="${id}"]`);

async function snapshot(host: Locator) {
  return host.evaluate(node => {
    const svg = node.querySelector<SVGSVGElement>('[data-rain-id="ui-chart-radar"] svg')!;
    const matrix = (value: DOMMatrix | null) => value ? { a: value.a, b: value.b, c: value.c, d: value.d, e: value.e, f: value.f } : null;
    const radius = (Math.min(Number(svg.getAttribute("width")), Number(svg.getAttribute("height"))) - (node.getAttribute("data-rain-id") === "chart-radar" ? 100 : 96)) / 2;
    const table = [...node.querySelectorAll("tbody tr")].map(row => [...row.querySelectorAll("td")].map(cell => Number(cell.textContent)));
    const groups = [...svg.querySelectorAll<SVGGElement>('g[style*="cursor"]')].map((group, index) => {
      const path = group.querySelector("path")!;
      const style = getComputedStyle(group), pathStyle = getComputedStyle(path);
      const coordinates = (path.getAttribute("d")?.match(/-?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
      const values = table[index] ?? [];
      const expected = values.flatMap((value, metric) => {
        const angle = metric * Math.PI * 2 / values.length - Math.PI / 2;
        return [radius * value / 100 * Math.cos(angle), radius * value / 100 * Math.sin(angle)];
      });
      const screen = group.getScreenCTM()!;
      const parentScreen = (group.parentElement as unknown as SVGGraphicsElement).getScreenCTM()!;
      return {
        d: path.getAttribute("d"),
        points: [...group.querySelectorAll("circle")].map(point => ({ cx: point.getAttribute("cx"), cy: point.getAttribute("cy"), r: point.getAttribute("r") })),
        fill: pathStyle.fill, fillOpacity: pathStyle.fillOpacity, stroke: pathStyle.stroke, strokeWidth: pathStyle.strokeWidth, filter: pathStyle.filter,
        opacity: style.opacity, transform: style.transform, transformOrigin: style.transformOrigin, transformBox: style.transformBox,
        relativeScreenCTM: matrix(parentScreen.inverse().multiply(screen)), screenCTM: matrix(screen),
        coordinateError: coordinates.length === expected.length && expected.length > 0 ? Math.max(...coordinates.map((value, offset) => Math.abs(value - expected[offset]!))) : Infinity,
      };
    });
    return { radius, table, groups, atTarget: groups.length === table.length && groups.length > 0 && groups.every(group => group.coordinateError < .0001) };
  });
}

type Geometry = Awaited<ReturnType<typeof snapshot>>;
async function focusSnapshot(host: Locator) {
  await host.locator(".rain-chart-legend-button").first().focus();
  await expect.poll(async () => (await snapshot(host)).groups[0]!.fillOpacity).toBe("0.35");
  await expect.poll(async () => (await snapshot(host)).groups[0]!.transform).toBe("matrix(1.05, 0, 0, 1.05, 0, 0)");
  await host.page().evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  return snapshot(host);
}

for (const width of [1440, 390]) {
  test(`reduced radar focus preserves the original screen transform in all seven hosts at ${width}`, async ({ browser }) => {
    await mkdir(evidence, { recursive: true });
    const reference = new Map<string, { idle: Geometry; focused: Geometry }>();
    const results: unknown[] = [], errors: string[] = [], interceptions: string[] = [];
    try {
      for (const baseline of [true, false]) {
        const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce", timezoneId: "Asia/Shanghai" });
        const page = await context.newPage();
        page.on("pageerror", error => errors.push(String(error)));
        if (baseline) await page.route(url => decodeURIComponent(url.pathname) === `/@fs${sourcePath}` && !url.searchParams.has("raw"), async route => {
          const response = await route.fetch(), live = await response.text(), index = live.indexOf(marker);
          expect(index).toBeGreaterThan(0);
          interceptions.push(route.request().url());
          await route.fulfill({ response, body: live.slice(0, index) + body, headers: { ...response.headers(), "content-type": "application/javascript" } });
        });
        try {
          await page.clock.setFixedTime(new Date("2026-10-11T00:00:00+08:00"));
          await page.goto(`/?radar-hover-origin=${phase}-${baseline ? "before" : "after"}-${width}#chart-radar`);
          await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
          for (const id of ids) {
            const host = hostFor(page, id);
            await host.scrollIntoViewIfNeeded();
            if (id !== "default") await expect(host).toHaveAttribute("data-active", "true");
            await page.mouse.move(0, 0);
            await expect.poll(async () => (await snapshot(host)).atTarget).toBe(true);
            await page.evaluate(() => document.fonts.ready);
            const idle = await snapshot(host), focused = await focusSnapshot(host);
            results.push({ id, baseline, idle, focused });
            await host.screenshot({ path: `${evidence}/${width}-${baseline ? "before" : "after"}-${id}-focused.png`, animations: "disabled" });
            if (baseline) reference.set(id, { idle, focused });
            else {
              const expected = reference.get(id)!;
              expect(idle.table).toEqual(expected.idle.table);
              expect(idle.groups.map(group => [group.d, group.points, group.fill, group.stroke, group.filter, group.opacity])).toEqual(expected.idle.groups.map(group => [group.d, group.points, group.fill, group.stroke, group.filter, group.opacity]));
              for (const [index, group] of focused.groups.entries()) {
                const old = expected.focused.groups[index]!;
                expect([group.d, group.points, group.fill, group.fillOpacity, group.stroke, group.strokeWidth, group.filter, group.opacity]).toEqual([old.d, old.points, old.fill, old.fillOpacity, old.stroke, old.strokeWidth, old.filter, old.opacity]);
                for (const key of ["a", "b", "c", "d", "e", "f"] as const) expect(group.relativeScreenCTM![key]).toBeCloseTo(old.relativeScreenCTM![key], 3);
                expect(group.transformBox).toBe(old.transformBox);
                expect(group.transformOrigin).toBe(old.transformOrigin);
              }
            }
            await host.locator(".rain-chart-legend-button").first().evaluate(node => (node as HTMLButtonElement).blur());
          }
        } finally { await context.close(); }
      }
      expect(interceptions.length).toBeGreaterThan(0);
      expect(errors).toEqual([]);
      expect(await readFile(sourcePath, "utf8")).toBe(current);
    } finally {
      await writeFile(`${evidence}/${width}.json`, JSON.stringify({ width, phase, beforeSha256: hash(before), currentSha256: hash(current), testFixtureOnly: true, interceptions, results, errors }, null, 2));
    }
  });
}
