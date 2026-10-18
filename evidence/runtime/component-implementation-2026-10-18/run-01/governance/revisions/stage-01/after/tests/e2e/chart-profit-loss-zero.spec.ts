import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test, type Locator } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const run = "evidence/runtime/chart-behavior-fixes-2026-10-11";
const evidence = process.env.RAIN_CHART_PROFIT_LOSS_EVIDENCE_DIR ?? evidenceOutputPath(`${run}/browser/profit-loss`);
const useBaselineSplitter = process.env.RAIN_CHART_PROFIT_LOSS_BASELINE === "1";
const ownerPath = "packages/ui/src/charts/vendor/charts/profit-loss-segments.ts";
const fixtureProfiles = [
  { name: "negative-zero-positive", values: [-1, 0, 1], groups: [[0, 1], [1, 2]], positive: [false, true] },
  { name: "positive-zero-negative", values: [1, 0, -1], groups: [[0, 1], [1, 2]], positive: [true, false] },
  { name: "zero-platforms", values: [-2, 0, 0, 3, 0, 0, -2], groups: [[0, 1, 2], [2, 3, 4, 5], [5, 6]], positive: [false, true, false] },
];
const hash = (source: string) => createHash("sha256").update(source).digest("hex");

async function compile(source: string, name: string) {
  const rootRequire = createRequire(resolve("package.json"));
  const viteRequire = createRequire(rootRequire.resolve("vite"));
  const { transformSync } = await import(viteRequire.resolve("rolldown/utils"));
  return transformSync(name, source).code as string;
}

async function readSegments(paths: Locator) {
  return paths.evaluateAll(nodes => nodes.map(node => {
    const path = node as SVGPathElement;
    const numbers = (path.getAttribute("d")?.match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
    return {
      stroke: path.getAttribute("stroke"),
      d: path.getAttribute("d"),
      vertices: Array.from({ length: numbers.length / 2 }, (_, index) => ({ x: numbers[index * 2]!, y: numbers[index * 2 + 1]! })),
      points: Array.from({ length: 31 }, (_, index) => {
        const point = path.getPointAtLength(path.getTotalLength() * index / 30);
        return { x: point.x, y: point.y };
      }),
      box: { width: path.getBBox().width, height: path.getBBox().height },
    };
  }));
}

for (const width of [1440, 390]) for (const motion of ["no-preference", "reduce"] as const) {
  test(`[ProfitLossZero] real exact-zero readings, sign geometry and tooltip at ${width}px ${motion}`, async ({ page }) => {
    await mkdir(evidence, { recursive: true });
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: motion });
    const source = await readFile("apps/playground/src/docs/components/chart-data.ts", "utf8");
    const start = source.indexOf("export function makeProfitLoss(");
    const end = source.indexOf("\n}\n", start) + 3;
    expect(start).toBeGreaterThanOrEqual(0);
    expect(end).toBeGreaterThan(start);
    const fixtureBody = `export function makeProfitLoss(revision = 0, state = "normal") {
      if (state === "empty") return [];
      const profiles = ${JSON.stringify(fixtureProfiles.map(profile => profile.values))};
      const values = state === "zero" ? Array(7).fill(0) : profiles[revision % profiles.length];
      return values.map((value, index) => ({ date: new Date(2026, 8, index + 1), value }));
    }\n\n`;
    const fixtureModule = await compile(source.slice(0, start) + fixtureBody + source.slice(end), "chart-data.ts");
    const currentOwner = await readFile(ownerPath, "utf8");
    const splitterSource = useBaselineSplitter ? await readFile(`${run}/before/${ownerPath}`, "utf8") : currentOwner;
    const requests: string[] = [];
    const errors: string[] = [];
    const snapshots: unknown[] = [];
    page.on("pageerror", error => errors.push(String(error)));
    await page.route(url => url.pathname.endsWith("/src/docs/components/chart-data.ts") && !url.searchParams.has("raw"), async route => {
      requests.push(route.request().url());
      await route.fulfill({ status: 200, contentType: "application/javascript", body: fixtureModule });
    });
    if (useBaselineSplitter) {
      const baselineModule = await compile(splitterSource, "profit-loss-segments.ts");
      await page.route(url => url.pathname.endsWith("/charts/profit-loss-segments.ts") && !url.searchParams.has("raw"), async route => {
        requests.push(route.request().url());
        await route.fulfill({ status: 200, contentType: "application/javascript", body: baselineModule });
      });
    }
    await page.goto("/#chart-profit-loss");
    const chart = page.locator('[data-rain-id="chart-profit-loss"]');
    const controls = page.locator("[data-chart-default-controls]");
    const svg = chart.locator(".rain-chart-plot svg").first();
    const paths = chart.locator('[data-slot="profit-loss-line"] path');
    const { scaleLinear } = await import(createRequire(resolve("packages/ui/package.json")).resolve("@visx/scale"));
    try {
      await expect(svg).toBeVisible();
      await chart.getByText("查看精确数据", { exact: true }).click();
      for (const [revision, profile] of fixtureProfiles.entries()) {
        if (revision) await controls.getByRole("button", { name: "更新数据", exact: true }).click();
        const rows = chart.locator("tbody tr");
        await expect(rows).toHaveCount(profile.values.length);
        await expect(rows.locator("td")).toHaveText(profile.values.map(String));
        await expect(rows.locator("th")).toHaveText(profile.values.map((_, index) => `9月${index + 1}日`));
        await expect(paths).toHaveCount(profile.positive.length);
        await expect.poll(async () => {
          const segments = await readSegments(paths);
          const size = await svg.evaluate(node => ({ width: Number(node.getAttribute("width")), height: Number(node.getAttribute("height")) }));
          const innerWidth = size.width - 58 - 24;
          const innerHeight = size.height - 24 - 38;
          const min = Math.min(...profile.values), max = Math.max(...profile.values);
          const padding = (max - min) * .05;
          const y = scaleLinear({ domain: [min - padding, max + padding], range: [innerHeight, 0], nice: true });
          return segments.length === profile.groups.length && segments.every((segment, groupIndex) => {
            const indices = profile.groups[groupIndex]!;
            return segment.vertices.length === indices.length && segment.vertices.every((vertex, index) => {
              const rowIndex = indices[index]!;
              return Math.abs(vertex.x - innerWidth * rowIndex / (profile.values.length - 1)) <= .1 && Math.abs(vertex.y - y(profile.values[rowIndex]!)) <= .1;
            });
          });
        }, { message: `${profile.name}: actual SVG vertices must match exact table readings` }).toBe(true);
        const segments = await readSegments(paths);
        const zeroY = segments[0]!.vertices.at(-1)!.y;
        expect(segments.map(segment => segment.stroke)).toEqual(profile.positive.map(positive => positive ? "var(--chart-positive)" : "var(--chart-negative)"));
        expect(segments.every((segment, index) => segment.points.every(point => Number.isFinite(point.x) && Number.isFinite(point.y) && (profile.positive[index] ? point.y <= zeroY + .1 : point.y >= zeroY - .1)))).toBe(true);
        const tooltips = [];
        for (const [index, value] of profile.values.entries()) {
          await svg.scrollIntoViewIfNeeded();
          const box = (await svg.boundingBox())!;
          const tooltip = chart.locator(".rain-chart-tooltip");
          await expect.poll(async () => {
            await page.mouse.move(0, 0);
            await page.mouse.move(box.x + 58 + (box.width - 58 - 24) * index / (profile.values.length - 1), box.y + box.height / 2);
            return tooltip.isVisible();
          }, { message: "real hover becomes interactive after the chart reveal" }).toBe(true);
          await expect(tooltip).toContainText(`9月${index + 1}日`);
          await expect(tooltip.locator(".tabular-nums")).toHaveText(value > 0 ? `+${value}` : String(value));
          const color = await tooltip.locator('span[style*="background-color"]').evaluate(node => (node as HTMLElement).style.backgroundColor);
          expect(color).toBe(value < 0 ? "var(--chart-negative)" : "var(--chart-positive)");
          tooltips.push({ index, value, text: await tooltip.innerText(), color });
        }
        await page.mouse.move(0, 0);
        snapshots.push({ revision, name: profile.name, values: profile.values, zeroY, segments, tooltips });
        await chart.screenshot({ path: `${evidence}/${width}-${motion}-${profile.name}.png` });
      }
      await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("zero");
      await expect(chart.locator("tbody tr")).toHaveCount(7);
      await expect(chart.locator("tbody td")).toHaveText(Array(7).fill("0"));
      await expect(paths).toHaveCount(1);
      await expect.poll(() => paths.first().evaluate(node => (node as SVGPathElement).getBBox().height)).toBe(0);
      await expect(paths.first()).toHaveAttribute("stroke", "var(--chart-positive)");
      snapshots.push({ allZero: true, segments: await readSegments(paths) });
      await chart.screenshot({ path: `${evidence}/${width}-${motion}-all-zero.png` });
      expect(errors).toEqual([]);
      expect(requests.filter(url => new URL(url).pathname.endsWith("/src/docs/components/chart-data.ts"))).toHaveLength(1);
      if (useBaselineSplitter) expect(requests.some(url => new URL(url).pathname.endsWith("/charts/profit-loss-segments.ts"))).toBe(true);
      expect(await readFile(ownerPath, "utf8")).toBe(currentOwner);
      expect(await readFile("apps/playground/src/docs/components/chart-data.ts", "utf8")).toBe(source);
    } finally {
      await chart.screenshot({ path: `${evidence}/${width}-${motion}-final-or-failed.png` });
      await writeFile(`${evidence}/${width}-${motion}.json`, JSON.stringify({ width, motion, baselineSplitter: useBaselineSplitter, currentOwnerSha256: hash(currentOwner), testedSplitterSha256: hash(splitterSource), appDataSha256: hash(source), testFixtureOnly: true, requests, errors, snapshots, finalSegments: await readSegments(paths) }, null, 2));
    }
  });
}
