# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bklit-catalog.spec.ts >> [feedback] compact labels, legend gaps and gauge readings stay readable at 880 and 390px
- Location: tests/e2e/bklit-catalog.spec.ts:48:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-rain-id="chart-line"]').first().locator('svg').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-rain-id="chart-line"]').first().locator('svg').first()

```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | 
  4   | const evidence = process.env.RAIN_BKLIT_CATALOG_EVIDENCE_DIR ?? "evidence/runtime/bklit-rain-catalog/runtime";
  5   | const groups = { P1:["area","line","bar","composed"], P2:["pie","ring","radar","scatter","funnel","gauge"], P3:["sankey","sunburst","heatmap","choropleth"], P4:["candlestick","profit-loss","live-line"] };
  6   | 
  7   | test("[feedback] stacked bars use the cumulative domain through recipe, series and data changes", async ({ page }) => {
  8   |   await page.emulateMedia({ reducedMotion: "reduce" });
  9   |   const facts = [];
  10  |   for (const width of [880, 390]) {
  11  |     await page.setViewportSize({ width, height: 764 });
  12  |     await page.goto(`/bklit-catalog.html?feedback-width=${width}#chart-bar`);
  13  |     const host = page.locator('[data-rain-id="chart-bar"]').first();
  14  |     await page.getByRole("combobox", { name: "柱形配方", exact: true }).selectOption("stacked");
  15  |     for (const count of [3, 5]) {
  16  |       await page.getByRole("combobox", { name: "系列数", exact: true }).selectOption(String(count));
  17  |       for (const recipe of ["category-wide", "bar-gradient", "bar-fade"]) {
  18  |         await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption(recipe);
  19  |         await page.waitForTimeout(200);
  20  |         const geometry = await host.evaluate(el => {
  21  |           const plot = el.querySelector("svg")!.getBoundingClientRect();
  22  |           const bars = [...el.querySelectorAll('g[class^="bar-series-"] rect')].map(x => x.getBoundingClientRect());
  23  |           const ticks = [...el.querySelectorAll("span.text-chart-label")].map(x => Number(x.textContent)).filter(Number.isFinite);
  24  |           return { minTop: Math.min(...bars.map(x => x.top)) - plot.top, maxBottom: Math.max(...bars.map(x => x.bottom)) - plot.top, height: plot.height, count: bars.length, maxTick: Math.max(...ticks) };
  25  |         });
  26  |         facts.push({ width, seriesCount: count, recipe, ...geometry });
  27  |         await mkdir(evidence, { recursive: true });
  28  |         await writeFile(`${evidence}/stacked-bars-facts.json`, JSON.stringify(facts, null, 2));
  29  |         await page.screenshot({ path: `${evidence}/stacked-bars-${width}-${count}-${recipe}.png`, fullPage: true });
  30  |         expect(geometry.count).toBe(count * 6);
  31  |         expect(geometry.minTop).toBeGreaterThanOrEqual(23);
  32  |         expect(geometry.maxBottom).toBeLessThanOrEqual(geometry.height - 37);
  33  |         expect(geometry.maxTick).toBeGreaterThanOrEqual(count === 3 ? 102 : 132);
  34  |       }
  35  |     }
  36  |     await host.getByText("查看精确数据", { exact: true }).click();
  37  |     await expect(host.locator("table")).toBeVisible();
  38  |     const previous = Number(await host.locator("tbody td").first().innerText());
  39  |     await page.locator("[data-chart-default-controls]").getByRole("button", { name: "更新数据", exact: true }).click();
  40  |     await expect(host.locator("tbody td").first()).toHaveText(String(previous + 3));
  41  |     await expect.poll(() => host.locator('g[class^="bar-series-"] rect').evaluateAll(nodes => Math.min(...nodes.map(x => Number(x.getAttribute("y")))))).toBeGreaterThanOrEqual(0);
  42  |     await page.getByRole("combobox", { name: "柱形配方", exact: true }).selectOption("grouped");
  43  |     await expect(host.locator(".legend-container")).toContainText("参与人数");
  44  |     await expect.poll(() => host.locator('g[class^="bar-series-"] rect').evaluateAll(nodes => Math.min(...nodes.map(x => Number(x.getAttribute("y")))))).toBeGreaterThanOrEqual(0);
  45  |   }
  46  | });
  47  | 
  48  | test("[feedback] compact labels, legend gaps and gauge readings stay readable at 880 and 390px", async ({ page }) => {
  49  |   test.setTimeout(60_000);
  50  |   await page.emulateMedia({ reducedMotion: "reduce" });
  51  |   await mkdir(evidence, { recursive: true });
  52  |   const facts = [];
  53  |   for (const width of [880, 390]) {
  54  |     await page.setViewportSize({ width, height: 764 });
  55  |     for (const id of ["line", "bar", "gauge", "sunburst", "funnel"]) {
  56  |       await page.goto(`/bklit-catalog.html#chart-${id}`);
  57  |       const host = page.locator(`[data-rain-id="chart-${id}"]`).first();
> 58  |       await expect(host.locator("svg").first()).toBeVisible();
      |                                                 ^ Error: expect(locator).toBeVisible() failed
  59  |       await page.waitForTimeout(2200);
  60  |       if (id === "line" || id === "bar") {
  61  |         const legend = await host.locator(".legend-container").evaluate(el => ({
  62  |           fontSizes: [...el.querySelectorAll("button > span:last-child")].map(x => getComputedStyle(x).fontSize),
  63  |           columnGap: getComputedStyle(el).columnGap,
  64  |         }));
  65  |         expect(legend.fontSizes.length).toBeGreaterThan(0);
  66  |         expect(legend.fontSizes.every(size => size === "13px")).toBe(true);
  67  |         expect(legend.columnGap).toBe("24px");
  68  |         facts.push({ width, id, legend });
  69  |       }
  70  |       if (id === "gauge") {
  71  |         const arc = await host.locator('[data-rain-id="ui-chart-gauge"]').evaluate(el => {
  72  |           const plot = el.querySelector("svg")!.getBoundingClientRect();
  73  |           const reading = el.querySelector("span.tabular-nums")!.parentElement!.getBoundingClientRect();
  74  |           return { centerOffset: (reading.top + reading.height / 2) - (plot.top + plot.height / 2) };
  75  |         });
  76  |         expect(Math.abs(arc.centerOffset)).toBeLessThan(1);
  77  |         await page.screenshot({ path: `${evidence}/gauge-arc-${width}.png`, fullPage: true });
  78  |         await page.getByRole("combobox", { name: "仪表形态", exact: true }).selectOption("linear");
  79  |         await page.waitForTimeout(250);
  80  |         const linear = await host.locator('[data-rain-id="ui-chart-gauge"]').evaluate(el => {
  81  |           const label = el.querySelector("span.text-chart-foreground-muted")!;
  82  |           const labelBox = label.getBoundingClientRect();
  83  |           const track = el.querySelector("svg")!.getBoundingClientRect();
  84  |           return { labelWidth: labelBox.width, labelHeight: labelBox.height, labelFont: getComputedStyle(label).fontSize, readingGap: track.top - labelBox.bottom };
  85  |         });
  86  |         expect(linear.labelWidth).toBeGreaterThan(20);
  87  |         expect(linear.labelHeight).toBeGreaterThan(0);
  88  |         expect(parseFloat(linear.labelFont)).toBeLessThanOrEqual(13);
  89  |         expect(linear.readingGap).toBeGreaterThanOrEqual(7);
  90  |         expect(linear.readingGap).toBeLessThanOrEqual(9);
  91  |         facts.push({ width, id, arc, linear });
  92  |       }
  93  |       if (id === "sunburst") {
  94  |         const labels = await host.locator("svg text").evaluateAll(nodes => nodes.map(x => ({ label: x.textContent, fill: getComputedStyle(x).fill, stroke: getComputedStyle(x).stroke, fontSize: getComputedStyle(x).fontSize })));
  95  |         expect(labels.length).toBeGreaterThan(0);
  96  |         expect(labels.every(label => label.fill === "rgb(255, 255, 255)" && label.stroke === "none")).toBe(true);
  97  |         facts.push({ width, id, labels });
  98  |       }
  99  |       if (id === "funnel") {
  100 |         const numbers = await host.locator(".font-semibold.text-foreground").evaluateAll(nodes => nodes.map(x => ({ label: x.textContent, fontSize: getComputedStyle(x).fontSize, weight: getComputedStyle(x).fontWeight, color: getComputedStyle(x).color, expected: getComputedStyle(x).getPropertyValue("--rain-category-text-neutral-4").trim() })));
  101 |         expect(numbers.length).toBe(4);
  102 |         expect(numbers.every(x => x.fontSize === "13px" && x.weight === "400")).toBe(true);
  103 |         facts.push({ width, id, numbers });
  104 |       }
  105 |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  106 |       await page.screenshot({ path: `${evidence}/${id}-${width}.png`, fullPage: true });
  107 |     }
  108 |   }
  109 |   await writeFile(`${evidence}/style-facts.json`, JSON.stringify(facts, null, 2));
  110 | });
  111 | 
  112 | test("[P0] Rain chart catalog is a usable independent entry", async ({ page }) => {
  113 |   await page.goto("/bklit-catalog.html");
  114 |   await expect(page.getByRole("heading", { name: "Rain 图表库", exact: true })).toBeVisible({ timeout: 5000 });
  115 |   await expect(page.getByRole("navigation", { name: "图型目录" }).getByRole("link")).toHaveCount(17);
  116 |   await expect(page.locator('[data-rain-id="chart-area"] svg').first()).toBeVisible();
  117 | });
  118 | 
  119 | for (const [phase, ids] of Object.entries(groups)) for (const id of ids) for (const width of [1440,900,390]) {
  120 |   test(`[${phase}] ${id} renders, reads and updates at ${width}px`, async ({ page }) => {
  121 |     const errors: string[] = [];
  122 |     page.on("pageerror", error => errors.push(error.message));
  123 |     await page.setViewportSize({ width, height: 1000 });
  124 |     if (width !== 1440) await page.emulateMedia({ reducedMotion: "reduce" });
  125 |     await page.goto(`/bklit-catalog.html#chart-${id}`);
  126 |     const host = page.locator(`[data-rain-id="chart-${id}"]`).first();
  127 |     await expect(host.locator("svg").first()).toBeVisible();
  128 |     await expect(host.locator('svg :is(path[d],rect,circle)').first()).toBeAttached();
  129 |     await page.waitForTimeout(width === 1440 ? 1800 : 300);
  130 |     await mkdir(evidence, { recursive: true });
  131 |     await page.screenshot({ path: `${evidence}/${id}-${width}.png`, fullPage: true });
  132 |     await host.getByText("查看精确数据", { exact:true }).click();
  133 |     await expect(host.locator("table")).toBeVisible();
  134 |     const before = await host.locator("tbody").innerText();
  135 |     expect(await host.locator("tbody tr").count()).toBeGreaterThan(0);
  136 |     await page.locator("[data-chart-default-controls]").getByRole("button", { name:"更新数据", exact:true }).click();
  137 |     await expect(page.locator(".rain-chart-catalog__status")).toContainText("已更新 1 次");
  138 |     await expect.poll(() => host.locator("tbody").innerText()).not.toBe(before);
  139 |     await expect.poll(() => host.locator("svg").evaluateAll(nodes => Math.max(0, ...nodes.map(node => node.getBoundingClientRect().width)))).toBeGreaterThan(30);
  140 |     const svgIndex = await host.locator("svg").evaluateAll(nodes => nodes.map((node,i) => ({ i, area:node.getBoundingClientRect().width*node.getBoundingClientRect().height })).sort((a,b) => b.area-a.area)[0]!.i);
  141 |     const plot = host.locator("svg").nth(svgIndex);
  142 |     const geometry = await plot.evaluate(svg => ({
  143 |       width: svg.getBoundingClientRect().width, height: svg.getBoundingClientRect().height,
  144 |       invalid: [...svg.querySelectorAll("path[d]")].filter(p => /NaN|Infinity/.test(p.getAttribute("d") ?? "")).length,
  145 |       labelColor: [...svg.querySelectorAll("text")].map(t => getComputedStyle(t).fill).slice(0,12),
  146 |     }));
  147 |     expect(geometry.width).toBeGreaterThan(30); expect(geometry.height).toBeGreaterThan(30); expect(geometry.invalid).toBe(0);
  148 |     const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  149 |     expect(overflow).toBe(false);
  150 |     const hoverable = !["gauge","live-line"].includes(id);
  151 |     if (hoverable) {
  152 |       const box = await plot.boundingBox();
  153 |       await page.mouse.move(box!.x+geometry.width*.48,box!.y+geometry.height*.45);
  154 |       await page.waitForTimeout(300);
  155 |       await page.screenshot({ path: `${evidence}/${id}-${width}-hover.png`, fullPage: true });
  156 |     }
  157 |     expect(errors).toEqual([]);
  158 |     await writeFile(`${evidence}/${id}-${width}-facts.json`, JSON.stringify({ id,width,geometry,errors,hoverChecked:hoverable },null,2));
```