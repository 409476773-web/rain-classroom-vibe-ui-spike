# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-refinement.spec.ts >> prototype 1197px >> prototype every ring has only a centered percentage and label at 1197
- Location: tests/e2e/chart-feedback-refinement.spec.ts:35:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('[data-chart-variant^="ring-"]').first().locator('.rain-chart-center-reading')
Expected: "70.0%阅读进度"
Received: "70.0%阅读进度28 / 40 项"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('[data-chart-variant^="ring-"]').first().locator('.rain-chart-center-reading')
    13 × locator resolved to <div class="rain-chart-center-reading">…</div>
       - unexpected value "70.0%阅读进度28 / 40 项"

```

```yaml
- strong: 70.0%
- text: 阅读进度 28 / 40 项
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
  21 | ]) for (const width of [1197, 390]) test.describe(`${site.name} ${width}px`, () => {
  22 |   test.beforeEach(async ({ page }) => { await page.setViewportSize({ width, height: 796 }); await page.emulateMedia({ reducedMotion: "reduce" }); });
  23 |   test(`${site.name} pie legend hover has no shadow at ${width}`, async ({ page }) => {
  24 |     await page.goto(`${site.base}#chart-pie`);
  25 |     const card = page.locator('[data-chart-variant="pie-legend"]');
  26 |     await card.scrollIntoViewIfNeeded();
  27 |     await card.locator(".rain-chart-variant-legend-item").nth(1).focus();
  28 |     await expect(card.locator(".rain-chart-center-label")).toHaveText("研讨课");
  29 |     await page.waitForTimeout(300);
  30 |     const filters = await card.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).filter));
  31 |     expect(filters.length).toBeGreaterThan(0);
  32 |     expect(filters.every(filter => filter === "none")).toBe(true);
  33 |     await card.screenshot({ path: `${evidence}/${site.name}-pie-legend-hover-${width}.png` });
  34 |   });
  35 |   test(`${site.name} every ring has only a centered percentage and label at ${width}`, async ({ page }) => {
  36 |     await page.goto(`${site.base}#chart-ring`);
  37 |     for (const card of await page.locator('[data-chart-variant^="ring-"]').all()) {
  38 |       await card.scrollIntoViewIfNeeded();
  39 |       const reading = card.locator(".rain-chart-center-reading");
> 40 |       await expect(reading).toHaveText("70.0%阅读进度");
     |                             ^ Error: expect(locator).toHaveText(expected) failed
  41 |       const svg = card.locator("svg").first();
  42 |       const box = (await reading.boundingBox())!, plot = (await svg.boundingBox())!;
  43 |       expect(Math.abs(box.x + box.width / 2 - plot.x - plot.width / 2)).toBeLessThan(2);
  44 |       expect(Math.abs(box.y + box.height / 2 - plot.y - plot.height / 2)).toBeLessThan(2);
  45 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  46 |     }
  47 |     const legend = page.locator('[data-chart-variant="ring-legend"]');
  48 |     await legend.scrollIntoViewIfNeeded();
  49 |     await legend.getByRole("button", { name: /^练习进度/ }).focus();
  50 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("66.7%练习进度");
  51 |     await expect(legend.getByRole("progressbar", { name: "练习进度进度" })).toHaveAttribute("aria-valuemax", "12");
  52 |   });
  53 |   test(`${site.name} reference range dashed boundaries stay light at ${width}`, async ({ page }) => {
  54 |     for (const family of ["bar", "area", "line", "scatter", "candlestick"]) {
  55 |       await page.goto(`${site.base}#chart-${family}`);
  56 |       const card = page.locator(`[data-chart-variant="${family}-reference-band"]`);
  57 |       await card.scrollIntoViewIfNeeded();
  58 |       const lines = card.locator(".chart-reference-area line[stroke-dasharray]");
  59 |       await expect(lines).toHaveCount(2);
  60 |       expect(await lines.evaluateAll(nodes => nodes.every(node => Number(getComputedStyle(node).strokeOpacity) <= .25))).toBe(true);
  61 |       await card.screenshot({ path: `${evidence}/${site.name}-${family}-reference-band-${width}.png` });
  62 |     }
  63 |   });
  64 |   test(`${site.name} every heatmap legend has room below its calendar at ${width}`, async ({ page }) => {
  65 |     await page.goto(`${site.base}#chart-heatmap`);
  66 |     for (const card of await page.locator('[data-chart-variant^="heatmap-"]').all()) {
  67 |       await card.scrollIntoViewIfNeeded();
  68 |       const legend = card.getByText(/^(少|低耗时)$/).locator("..");
  69 |       await expect(legend).toBeVisible();
  70 |       const cells = card.locator(".visx-heatmap-rects rect");
  71 |       const bottom = await cells.evaluateAll(nodes => Math.max(...nodes.map(node => node.getBoundingClientRect().bottom)));
  72 |       const box = (await legend.boundingBox())!;
  73 |       expect(box.y - bottom).toBeGreaterThanOrEqual(16);
  74 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  75 |     }
  76 |     const example = page.locator('main [data-rain-id="chart-heatmap"]').first();
  77 |     const legend = example.getByText("少", { exact: true }).locator("..");
  78 |     await expect(legend).toBeVisible();
  79 |     expect((await legend.boundingBox())!.height).toBeGreaterThan(0);
  80 |     await example.screenshot({ path: `${evidence}/${site.name}-heatmap-default-example-${width}.png` });
  81 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  82 |   });
  83 |   test(`${site.name} all sunburst titles and drilled Breadcrumbs are centered at ${width}`, async ({ page }) => {
  84 |     await page.goto(`${site.base}#chart-sunburst`);
  85 |     for (const card of await page.locator('[data-chart-variant^="sunburst-"]').all()) {
  86 |       await card.scrollIntoViewIfNeeded();
  87 |       await centeredHeading(card);
  88 |       await card.getByRole("button", { name: /基础课程/ }).click();
  89 |       await centeredTrail(card);
  90 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-drill-${width}.png` });
  91 |       await card.getByRole("link", { name: "返回学习内容" }).click();
  92 |       await centeredHeading(card);
  93 |     }
  94 |     const example = page.locator('main [data-rain-id="chart-sunburst"]').first();
  95 |     await example.scrollIntoViewIfNeeded();
  96 |     await centeredHeading(example);
  97 |   });
  98 | });
  99 | 
```