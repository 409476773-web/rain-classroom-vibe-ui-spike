# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-refinement.spec.ts >> playground every ring has only a centered percentage and label at 390
- Location: tests/e2e/chart-feedback-refinement.spec.ts:34:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('[data-chart-variant="ring-legend"]').locator('.rain-chart-center-reading')
Expected: "66.7%练习进度"
Received: "66.7%练习进度8 / 12 项"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('[data-chart-variant="ring-legend"]').locator('.rain-chart-center-reading')
    14 × locator resolved to <div class="rain-chart-center-reading">…</div>
       - unexpected value "66.7%练习进度8 / 12 项"

```

```yaml
- strong: 66.7%
- text: 练习进度 8 / 12 项
```

# Test source

```ts
  1  | import { expect, test, type Locator } from "@playwright/test";
  2  | import { mkdir } from "node:fs/promises";
  3  | 
  4  | const evidence = process.env.RAIN_CHART_REFINEMENT_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/feedback-2026-10-08-round2/browser";
  5  | test.beforeAll(() => mkdir(evidence, { recursive: true }));
  6  | const centerX = async (plot: Locator) => { const box = (await plot.boundingBox())!; return box.x + box.width / 2; };
  7  | async function centeredHeading(card: Locator) {
  8  |   const text = card.locator(".rain-chart-sunburst-title");
  9  |   const x = await text.evaluate(node => { const range = document.createRange(); range.selectNodeContents(node); const box = range.getBoundingClientRect(); return box.x + box.width / 2; });
  10 |   expect(Math.abs(x - await centerX(card.locator('[data-rain-id="ui-chart-sunburst"] svg').first()))).toBeLessThan(2);
  11 | }
  12 | async function centeredTrail(card: Locator) {
  13 |   const trail = card.getByRole("navigation", { name: "学习内容层级" });
  14 |   const x = await trail.locator("ol").evaluate(node => { const boxes = [...node.children].map(child => child.getBoundingClientRect()); return (Math.min(...boxes.map(box => box.left)) + Math.max(...boxes.map(box => box.right))) / 2; });
  15 |   expect(Math.abs(x - await centerX(card.locator('[data-rain-id="ui-chart-sunburst"] svg').first()))).toBeLessThan(2);
  16 | }
  17 | 
  18 | for (const site of [
  19 |   { name: "playground", base: "http://127.0.0.1:5173/" },
  20 |   { name: "prototype", base: "http://127.0.0.1:5387/bklit-catalog.html" },
  21 | ]) for (const width of [1197, 390]) {
  22 |   test.beforeEach(async ({ page }) => { await page.setViewportSize({ width, height: 796 }); await page.emulateMedia({ reducedMotion: "reduce" }); });
  23 |   test(`${site.name} pie legend hover has no shadow at ${width}`, async ({ page }) => {
  24 |     await page.goto(`${site.base}#chart-pie`);
  25 |     const card = page.locator('[data-chart-variant="pie-legend"]');
  26 |     await card.scrollIntoViewIfNeeded();
  27 |     await card.locator(".rain-chart-variant-legend-item").nth(1).focus();
  28 |     await page.waitForTimeout(300);
  29 |     const filters = await card.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).filter));
  30 |     expect(filters.length).toBeGreaterThan(0);
  31 |     expect(filters.every(filter => filter === "none")).toBe(true);
  32 |     await card.screenshot({ path: `${evidence}/${site.name}-pie-legend-hover-${width}.png` });
  33 |   });
  34 |   test(`${site.name} every ring has only a centered percentage and label at ${width}`, async ({ page }) => {
  35 |     await page.goto(`${site.base}#chart-ring`);
  36 |     for (const card of await page.locator('[data-chart-variant^="ring-"]').all()) {
  37 |       await card.scrollIntoViewIfNeeded();
  38 |       const reading = card.locator(".rain-chart-center-reading");
  39 |       await expect(reading).toHaveText("70.0%阅读进度");
  40 |       const svg = card.locator("svg").first();
  41 |       const box = (await reading.boundingBox())!, plot = (await svg.boundingBox())!;
  42 |       expect(Math.abs(box.x + box.width / 2 - plot.x - plot.width / 2)).toBeLessThan(2);
  43 |       expect(Math.abs(box.y + box.height / 2 - plot.y - plot.height / 2)).toBeLessThan(2);
  44 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  45 |     }
  46 |     const legend = page.locator('[data-chart-variant="ring-legend"]');
  47 |     await legend.scrollIntoViewIfNeeded();
  48 |     await legend.getByRole("button", { name: /^练习进度/ }).focus();
> 49 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("66.7%练习进度");
     |                                                                ^ Error: expect(locator).toHaveText(expected) failed
  50 |     await expect(legend.getByRole("progressbar", { name: "练习进度进度" })).toHaveAttribute("aria-valuemax", "12");
  51 |   });
  52 |   test(`${site.name} reference range dashed boundaries stay light at ${width}`, async ({ page }) => {
  53 |     for (const family of ["bar", "area", "line", "scatter", "candlestick"]) {
  54 |       await page.goto(`${site.base}#chart-${family}`);
  55 |       const card = page.locator(`[data-chart-variant="${family}-reference-band"]`);
  56 |       await card.scrollIntoViewIfNeeded();
  57 |       const lines = card.locator(".chart-reference-area line[stroke-dasharray]");
  58 |       await expect(lines).toHaveCount(2);
  59 |       expect(await lines.evaluateAll(nodes => nodes.every(node => Number(getComputedStyle(node).strokeOpacity) <= .25))).toBe(true);
  60 |       await card.screenshot({ path: `${evidence}/${site.name}-${family}-reference-band-${width}.png` });
  61 |     }
  62 |   });
  63 |   test(`${site.name} every heatmap legend has room below its calendar at ${width}`, async ({ page }) => {
  64 |     await page.goto(`${site.base}#chart-heatmap`);
  65 |     for (const card of await page.locator('[data-chart-variant^="heatmap-"]').all()) {
  66 |       await card.scrollIntoViewIfNeeded();
  67 |       const legend = card.getByText(/^(少|低耗时)$/).locator("..");
  68 |       await expect(legend).toBeVisible();
  69 |       const cells = card.locator(".visx-heatmap-rects rect");
  70 |       const bottom = await cells.evaluateAll(nodes => Math.max(...nodes.map(node => node.getBoundingClientRect().bottom)));
  71 |       const box = (await legend.boundingBox())!;
  72 |       expect(box.y - bottom).toBeGreaterThanOrEqual(16);
  73 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  74 |     }
  75 |     const example = page.locator('main [data-rain-id="chart-heatmap"]').first();
  76 |     const legend = example.getByText("少", { exact: true }).locator("..");
  77 |     await expect(legend).toBeVisible();
  78 |     expect((await legend.boundingBox())!.height).toBeGreaterThan(0);
  79 |     await example.screenshot({ path: `${evidence}/${site.name}-heatmap-default-example-${width}.png` });
  80 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  81 |   });
  82 |   test(`${site.name} all sunburst titles and drilled Breadcrumbs are centered at ${width}`, async ({ page }) => {
  83 |     await page.goto(`${site.base}#chart-sunburst`);
  84 |     for (const card of await page.locator('[data-chart-variant^="sunburst-"]').all()) {
  85 |       await card.scrollIntoViewIfNeeded();
  86 |       await centeredHeading(card);
  87 |       await card.getByRole("button", { name: /基础课程/ }).click();
  88 |       await centeredTrail(card);
  89 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-drill-${width}.png` });
  90 |       await card.getByRole("link", { name: "返回学习内容" }).click();
  91 |       await centeredHeading(card);
  92 |     }
  93 |     const example = page.locator('main [data-rain-id="chart-sunburst"]').first();
  94 |     await example.scrollIntoViewIfNeeded();
  95 |     await centeredHeading(example);
  96 |   });
  97 | }
  98 | 
```