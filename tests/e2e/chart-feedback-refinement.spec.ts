import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test, type Locator } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const evidence = process.env.RAIN_CHART_REFINEMENT_EVIDENCE_DIR ?? evidenceOutputPath("evidence/runtime/chart-variants/feedback-2026-10-08-round2/browser");
test.beforeAll(() => mkdir(evidence, { recursive: true }));
const centerX = async (plot: Locator) => { const box = (await plot.boundingBox())!; return box.x + box.width / 2; };
async function centeredHeading(card: Locator) {
  const text = card.locator(".rain-chart-sunburst-title");
  const x = await text.evaluate(node => { const range = document.createRange(); range.selectNodeContents(node); const box = range.getBoundingClientRect(); return box.x + box.width / 2; });
  expect(Math.abs(x - await centerX(card.locator('[data-rain-id="ui-chart-sunburst"] svg').first()))).toBeLessThan(2);
}
async function centeredTrail(card: Locator) {
  const trail = card.getByRole("navigation", { name: "学习内容层级" });
  const x = await trail.locator("ol").evaluate(node => { const boxes = [...node.children].map(child => child.getBoundingClientRect()); return (Math.min(...boxes.map(box => box.left)) + Math.max(...boxes.map(box => box.right))) / 2; });
  expect(Math.abs(x - await centerX(card.locator('[data-rain-id="ui-chart-sunburst"] svg').first()))).toBeLessThan(2);
}

for (const site of [
  { name: "playground", base: "http://127.0.0.1:5173/" },
  { name: "prototype", base: "http://127.0.0.1:5387/bklit-catalog.html" },
]) for (const width of [1197, 390]) test.describe(`${site.name} ${width}px`, () => {
  test.beforeEach(async ({ page }) => { await page.setViewportSize({ width, height: 796 }); await page.emulateMedia({ reducedMotion: "reduce" }); });
  test(`${site.name} pie legend hover has no shadow at ${width}`, async ({ page }) => {
    await page.goto(`${site.base}#chart-pie`);
    const card = page.locator('[data-chart-variant="pie-legend"]');
    await card.scrollIntoViewIfNeeded();
    await card.locator(".rain-chart-variant-legend-item").nth(1).focus();
    await expect(card.locator(".rain-chart-center-label")).toHaveText("研讨课");
    await page.waitForTimeout(300);
    const filters = await card.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).filter));
    expect(filters.length).toBeGreaterThan(0);
    expect(filters.every(filter => filter === "none")).toBe(true);
    await card.screenshot({ path: `${evidence}/${site.name}-pie-legend-hover-${width}.png` });
  });
  test(`${site.name} every ring has only a centered percentage and label at ${width}`, async ({ page }) => {
    await page.goto(`${site.base}#chart-ring`);
    await expect(page.locator('[data-chart-variant^="ring-"]')).toHaveCount(6);
    for (const card of await page.locator('[data-chart-variant^="ring-"]').all()) {
      await card.scrollIntoViewIfNeeded();
      const reading = card.locator(".rain-chart-center-reading");
      await expect(reading).toHaveText("70.0%阅读进度");
      const svg = card.locator("svg").first();
      const box = (await reading.boundingBox())!, plot = (await svg.boundingBox())!;
      expect(Math.abs(box.x + box.width / 2 - plot.x - plot.width / 2)).toBeLessThan(2);
      expect(Math.abs(box.y + box.height / 2 - plot.y - plot.height / 2)).toBeLessThan(2);
      await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
    }
    const legend = page.locator('[data-chart-variant="ring-legend"]');
    await legend.scrollIntoViewIfNeeded();
    await legend.getByRole("button", { name: /^练习进度/ }).focus();
    await expect(legend.locator(".rain-chart-center-reading")).toHaveText("66.7%练习进度");
    await expect(legend.getByRole("progressbar", { name: "练习进度进度" })).toHaveAttribute("aria-valuemax", "12");
  });
  test(`${site.name} reference range dashed boundaries stay light at ${width}`, async ({ page }) => {
    for (const family of ["bar", "area", "line", "scatter", "candlestick"]) {
      await page.goto(`${site.base}#chart-${family}`);
      const card = page.locator(`[data-chart-variant="${family}-reference-band"]`);
      await card.scrollIntoViewIfNeeded();
      const lines = card.locator(".chart-reference-area line[stroke-dasharray]");
      await expect(lines).toHaveCount(2);
      expect(await lines.evaluateAll(nodes => nodes.every(node => Number(getComputedStyle(node).strokeOpacity) <= .25))).toBe(true);
      await card.screenshot({ path: `${evidence}/${site.name}-${family}-reference-band-${width}.png` });
    }
  });
  test(`${site.name} every heatmap legend has room below its calendar at ${width}`, async ({ page }) => {
    await page.goto(`${site.base}#chart-heatmap`);
    await expect(page.locator('[data-chart-variant^="heatmap-"]')).toHaveCount(11);
    for (const card of await page.locator('[data-chart-variant^="heatmap-"]').all()) {
      await card.scrollIntoViewIfNeeded();
      const legend = card.getByText(/^(少|低耗时)$/).locator("..");
      await expect(legend).toBeVisible();
      const cells = card.locator(".visx-heatmap-rects rect");
      const bottom = await cells.evaluateAll(nodes => Math.max(...nodes.map(node => node.getBoundingClientRect().bottom)));
      const box = (await legend.boundingBox())!;
      expect(box.y - bottom).toBeGreaterThanOrEqual(16);
      await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
    }
    const example = page.locator('main [data-rain-id="chart-heatmap"]').first();
    const legend = example.getByText("少", { exact: true }).locator("..");
    await expect(legend).toBeVisible();
    expect((await legend.boundingBox())!.height).toBeGreaterThan(0);
    await example.screenshot({ path: `${evidence}/${site.name}-heatmap-default-example-${width}.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  });
  test(`${site.name} all sunburst titles and drilled Breadcrumbs are centered at ${width}`, async ({ page }) => {
    await page.goto(`${site.base}#chart-sunburst`);
    await expect(page.locator('[data-chart-variant^="sunburst-"]')).toHaveCount(3);
    for (const card of await page.locator('[data-chart-variant^="sunburst-"]').all()) {
      await card.scrollIntoViewIfNeeded();
      await centeredHeading(card);
      await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-root-${width}.png` });
      await card.getByRole("button", { name: /基础课程/ }).click();
      await centeredTrail(card);
      await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-drill-${width}.png` });
      await card.getByRole("link", { name: "返回学习内容" }).click();
      await centeredHeading(card);
    }
    const example = page.locator('main [data-rain-id="chart-sunburst"]').first();
    await example.scrollIntoViewIfNeeded();
    await centeredHeading(example);
    await example.screenshot({ path: `${evidence}/${site.name}-sunburst-default-root-${width}.png` });
  });
});
