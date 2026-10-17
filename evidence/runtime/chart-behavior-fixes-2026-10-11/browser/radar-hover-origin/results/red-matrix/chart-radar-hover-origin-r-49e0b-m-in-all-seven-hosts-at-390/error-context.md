# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-radar-hover-origin.spec.ts >> reduced radar focus preserves the original screen transform in all seven hosts at 390
- Location: tests/e2e/chart-radar-hover-origin.spec.ts:62:3

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: -0.8255157470703125
Received: 0

Expected precision:    3
Expected difference: < 0.0005
Received difference:   0.8255157470703125
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from "@playwright/test";
  2   | import { createHash } from "node:crypto";
  3   | import { createRequire } from "node:module";
  4   | import { mkdir, readFile, writeFile } from "node:fs/promises";
  5   | import { resolve } from "node:path";
  6   | 
  7   | const run = "evidence/runtime/chart-behavior-fixes-2026-10-11";
  8   | const phase = process.env.RAIN_RADAR_ORIGIN_PHASE ?? "green";
  9   | const evidence = `${run}/browser/radar-hover-origin/${phase}`;
  10  | const sourcePath = resolve("packages/ui/src/charts/vendor/charts/radar-area.tsx");
  11  | const before = await readFile(`${run}/before/packages/ui/src/charts/vendor/charts/radar-area.tsx`, "utf8");
  12  | const current = await readFile(sourcePath, "utf8");
  13  | const hash = (source: string) => createHash("sha256").update(source).digest("hex");
  14  | const viteRequire = createRequire(import.meta.resolve("vite"));
  15  | const { transformSync } = await import(viteRequire.resolve("rolldown/utils"));
  16  | const compiled = transformSync(sourcePath, before, { jsx: { runtime: "automatic", development: true } }).code;
  17  | const marker = "function getStrokeWidth";
  18  | const body = compiled.slice(compiled.indexOf(marker));
  19  | const ids = ["default", "radar-default", "radar-triangle", "radar-hexagon", "radar-single-series", "radar-minimal", "radar-grid-only"];
  20  | const hostFor = (page: Page, id: string) => page.locator(id === "default" ? '[data-rain-id="chart-radar"]' : `[data-chart-variant="${id}"]`);
  21  | 
  22  | async function snapshot(host: Locator) {
  23  |   return host.evaluate(node => {
  24  |     const svg = node.querySelector<SVGSVGElement>('[data-rain-id="ui-chart-radar"] svg')!;
  25  |     const matrix = (value: DOMMatrix | null) => value ? { a: value.a, b: value.b, c: value.c, d: value.d, e: value.e, f: value.f } : null;
  26  |     const radius = (Math.min(Number(svg.getAttribute("width")), Number(svg.getAttribute("height"))) - (node.getAttribute("data-rain-id") === "chart-radar" ? 100 : 96)) / 2;
  27  |     const table = [...node.querySelectorAll("tbody tr")].map(row => [...row.querySelectorAll("td")].map(cell => Number(cell.textContent)));
  28  |     const groups = [...svg.querySelectorAll<SVGGElement>('g[style*="cursor"]')].map((group, index) => {
  29  |       const path = group.querySelector("path")!;
  30  |       const style = getComputedStyle(group), pathStyle = getComputedStyle(path);
  31  |       const coordinates = (path.getAttribute("d")?.match(/-?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
  32  |       const values = table[index] ?? [];
  33  |       const expected = values.flatMap((value, metric) => {
  34  |         const angle = metric * Math.PI * 2 / values.length - Math.PI / 2;
  35  |         return [radius * value / 100 * Math.cos(angle), radius * value / 100 * Math.sin(angle)];
  36  |       });
  37  |       const screen = group.getScreenCTM()!;
  38  |       const parentScreen = (group.parentElement as unknown as SVGGraphicsElement).getScreenCTM()!;
  39  |       return {
  40  |         d: path.getAttribute("d"),
  41  |         points: [...group.querySelectorAll("circle")].map(point => ({ cx: point.getAttribute("cx"), cy: point.getAttribute("cy"), r: point.getAttribute("r") })),
  42  |         fill: pathStyle.fill, fillOpacity: pathStyle.fillOpacity, stroke: pathStyle.stroke, strokeWidth: pathStyle.strokeWidth, filter: pathStyle.filter,
  43  |         opacity: style.opacity, transform: style.transform, transformOrigin: style.transformOrigin, transformBox: style.transformBox,
  44  |         relativeScreenCTM: matrix(parentScreen.inverse().multiply(screen)), screenCTM: matrix(screen),
  45  |         coordinateError: coordinates.length === expected.length && expected.length > 0 ? Math.max(...coordinates.map((value, offset) => Math.abs(value - expected[offset]!))) : Infinity,
  46  |       };
  47  |     });
  48  |     return { radius, table, groups, atTarget: groups.length === table.length && groups.length > 0 && groups.every(group => group.coordinateError < .0001) };
  49  |   });
  50  | }
  51  | 
  52  | type Geometry = Awaited<ReturnType<typeof snapshot>>;
  53  | async function focusSnapshot(host: Locator) {
  54  |   await host.locator(".rain-chart-legend-button").first().focus();
  55  |   await expect.poll(async () => (await snapshot(host)).groups[0]!.fillOpacity).toBe("0.35");
  56  |   await expect.poll(async () => (await snapshot(host)).groups[0]!.transform).toBe("matrix(1.05, 0, 0, 1.05, 0, 0)");
  57  |   await host.page().evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  58  |   return snapshot(host);
  59  | }
  60  | 
  61  | for (const width of [1440, 390]) {
  62  |   test(`reduced radar focus preserves the original screen transform in all seven hosts at ${width}`, async ({ browser }) => {
  63  |     await mkdir(evidence, { recursive: true });
  64  |     const reference = new Map<string, { idle: Geometry; focused: Geometry }>();
  65  |     const results: unknown[] = [], errors: string[] = [], interceptions: string[] = [];
  66  |     try {
  67  |       for (const baseline of [true, false]) {
  68  |         const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce", timezoneId: "Asia/Shanghai" });
  69  |         const page = await context.newPage();
  70  |         page.on("pageerror", error => errors.push(String(error)));
  71  |         if (baseline) await page.route(url => decodeURIComponent(url.pathname) === `/@fs${sourcePath}` && !url.searchParams.has("raw"), async route => {
  72  |           const response = await route.fetch(), live = await response.text(), index = live.indexOf(marker);
  73  |           expect(index).toBeGreaterThan(0);
  74  |           interceptions.push(route.request().url());
  75  |           await route.fulfill({ response, body: live.slice(0, index) + body, headers: { ...response.headers(), "content-type": "application/javascript" } });
  76  |         });
  77  |         try {
  78  |           await page.clock.setFixedTime(new Date("2026-10-11T00:00:00+08:00"));
  79  |           await page.goto(`/?radar-hover-origin=${phase}-${baseline ? "before" : "after"}-${width}#chart-radar`);
  80  |           await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
  81  |           for (const id of ids) {
  82  |             const host = hostFor(page, id);
  83  |             await host.scrollIntoViewIfNeeded();
  84  |             if (id !== "default") await expect(host).toHaveAttribute("data-active", "true");
  85  |             await page.mouse.move(0, 0);
  86  |             await expect.poll(async () => (await snapshot(host)).atTarget).toBe(true);
  87  |             await page.evaluate(() => document.fonts.ready);
  88  |             const idle = await snapshot(host), focused = await focusSnapshot(host);
  89  |             results.push({ id, baseline, idle, focused });
  90  |             await host.screenshot({ path: `${evidence}/${width}-${baseline ? "before" : "after"}-${id}-focused.png`, animations: "disabled" });
  91  |             if (baseline) reference.set(id, { idle, focused });
  92  |             else {
  93  |               const expected = reference.get(id)!;
  94  |               expect(idle.table).toEqual(expected.idle.table);
  95  |               expect(idle.groups.map(group => [group.d, group.points, group.fill, group.stroke, group.filter, group.opacity])).toEqual(expected.idle.groups.map(group => [group.d, group.points, group.fill, group.stroke, group.filter, group.opacity]));
  96  |               for (const [index, group] of focused.groups.entries()) {
  97  |                 const old = expected.focused.groups[index]!;
  98  |                 expect([group.d, group.points, group.fill, group.fillOpacity, group.stroke, group.strokeWidth, group.filter, group.opacity]).toEqual([old.d, old.points, old.fill, old.fillOpacity, old.stroke, old.strokeWidth, old.filter, old.opacity]);
> 99  |                 for (const key of ["a", "b", "c", "d", "e", "f"] as const) expect(group.relativeScreenCTM![key]).toBeCloseTo(old.relativeScreenCTM![key], 3);
      |                                                                                                                  ^ Error: expect(received).toBeCloseTo(expected, precision)
  100 |                 expect(group.transformBox).toBe(old.transformBox);
  101 |                 expect(group.transformOrigin).toBe(old.transformOrigin);
  102 |               }
  103 |             }
  104 |             await host.locator(".rain-chart-legend-button").first().evaluate(node => (node as HTMLButtonElement).blur());
  105 |           }
  106 |         } finally { await context.close(); }
  107 |       }
  108 |       expect(interceptions.length).toBeGreaterThan(0);
  109 |       expect(errors).toEqual([]);
  110 |       expect(await readFile(sourcePath, "utf8")).toBe(current);
  111 |     } finally {
  112 |       await writeFile(`${evidence}/${width}.json`, JSON.stringify({ width, phase, beforeSha256: hash(before), currentSha256: hash(current), testFixtureOnly: true, interceptions, results, errors }, null, 2));
  113 |     }
  114 |   });
  115 | }
  116 | 
```