# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-radar.spec.ts >> all radar variant legends match the default label typography and expose buttons
- Location: tests/e2e/chart-feedback-radar.spec.ts:28:1

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: locator.evaluate: Test timeout of 45000ms exceeded.
Call log:
  - waiting for locator('[data-rain-id="chart-radar"] .rain-chart-legend-button').first()

```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | 
  4   | const evidence = process.env.RAIN_CHART_RADAR_EVIDENCE_DIR ?? "evidence/runtime/chart-radar-feedback-2026-10-09/browser";
  5   | const variants = ["radar-default", "radar-triangle", "radar-hexagon", "radar-single-series", "radar-minimal", "radar-grid-only"];
  6   | test.beforeAll(() => mkdir(evidence, { recursive: true }));
  7   | const cardFor = (page: Page, id: string) => page.locator(`[data-chart-variant="${id}"]`);
  8   | const groups = (card: Locator) => card.locator('[data-rain-id="ui-chart-radar"] svg g[style*="cursor"]');
  9   | const legend = (card: Locator) => card.locator(".legend-container, .rain-chart-variant-legend").last();
  10  | async function facts(name: string, value: unknown) { await writeFile(`${evidence}/${name}.json`, JSON.stringify(value, null, 2)); }
  11  | async function open(page: Page, reduced: "reduce" | "no-preference" = "reduce", width = 1280) {
  12  |   await page.emulateMedia({ reducedMotion: reduced });
  13  |   await page.setViewportSize({ width, height: 796 });
  14  |   await page.goto("/#chart-radar");
  15  | }
  16  | async function ready(card: Locator) {
  17  |   await card.scrollIntoViewIfNeeded();
  18  |   await expect(groups(card).first().locator("path")).toHaveAttribute("d", /M.+Z/);
  19  | }
  20  | async function hoverReadings(card: Locator) {
  21  |   return groups(card).evaluateAll(nodes => nodes.map(node => ({
  22  |     opacity: Number(getComputedStyle(node).opacity),
  23  |     fill: Number(getComputedStyle(node.querySelector("path")!).fillOpacity),
  24  |     stroke: Number(getComputedStyle(node.querySelector("path")!).strokeWidth),
  25  |   })));
  26  | }
  27  | 
  28  | test("all radar variant legends match the default label typography and expose buttons", async ({ page }) => {
  29  |   await open(page);
> 30  |   const base = await page.locator('[data-rain-id="chart-radar"] .rain-chart-legend-button').first().evaluate(node => {
      |                                                                                                     ^ Error: locator.evaluate: Test timeout of 45000ms exceeded.
  31  |     const style = getComputedStyle(node);
  32  |     return { font: style.fontSize, weight: style.fontWeight, color: style.color };
  33  |   });
  34  |   const rows = [];
  35  |   for (const id of variants) {
  36  |     const card = cardFor(page, id);
  37  |     await ready(card);
  38  |     const row = await legend(card).evaluate(node => [...node.children].map(item => {
  39  |       const button = item.matches("button") ? item : item.querySelector("button");
  40  |       const label = button ?? item;
  41  |       const style = getComputedStyle(label);
  42  |       return { label: label.textContent?.trim(), button: Boolean(button), font: style.fontSize, weight: style.fontWeight, color: style.color };
  43  |     }));
  44  |     rows.push({ id, row });
  45  |   }
  46  |   await facts("legend-typography", { base, rows });
  47  |   expect(base).toMatchObject({ font: "13px", weight: "400" });
  48  |   for (const { id, row } of rows) {
  49  |     expect.soft(row.length, id).toBe(id === "radar-single-series" ? 1 : 2);
  50  |     for (const item of row) expect.soft(item, id).toMatchObject({ button: true, ...base });
  51  |   }
  52  | });
  53  | 
  54  | test("radar legend focus and pointer inspect the matching series without affecting another instance", async ({ page }) => {
  55  |   await open(page);
  56  |   const first = cardFor(page, "radar-default"), second = cardFor(page, "radar-triangle");
  57  |   await ready(first);
  58  |   await ready(second);
  59  |   const button = first.getByRole("button", { name: "课程 A", exact: true });
  60  |   await expect(button).toHaveCount(1);
  61  |   await button.focus();
  62  |   await expect.poll(async () => (await hoverReadings(first))[0]!.fill).toBeCloseTo(.35, 2);
  63  |   await expect.poll(async () => (await hoverReadings(first))[1]!.opacity).toBeCloseTo(.3, 2);
  64  |   expect(await hoverReadings(second)).toEqual([{ opacity: 1, fill: .15, stroke: 2 }, { opacity: 1, fill: .15, stroke: 2 }]);
  65  |   const focused = await button.evaluate(node => ({ outline: getComputedStyle(node).outlineStyle, width: getComputedStyle(node).outlineWidth }));
  66  |   expect(focused.outline).not.toBe("none");
  67  |   expect(parseFloat(focused.width)).toBeGreaterThan(0);
  68  |   await facts("focused-isolation", { first: await hoverReadings(first), second: await hoverReadings(second), focused });
  69  |   await first.screenshot({ path: `${evidence}/legend-focus.png` });
  70  |   await button.blur();
  71  |   await expect.poll(async () => (await hoverReadings(first)).every(row => row.opacity === 1 && row.fill === .15)).toBe(true);
  72  |   await first.getByRole("button", { name: "课程 B", exact: true }).hover();
  73  |   await expect.poll(async () => (await hoverReadings(first))[1]!.fill).toBeCloseTo(.35, 2);
  74  |   await page.mouse.move(1, 1);
  75  |   await expect.poll(async () => (await hoverReadings(first)).every(row => row.opacity === 1 && row.fill === .15)).toBe(true);
  76  |   await groups(first).last().hover({ force: true });
  77  |   await expect.poll(async () => (await hoverReadings(first))[1]!.fill).toBeCloseTo(.35, 2);
  78  |   await page.mouse.move(1, 1);
  79  |   await expect.poll(async () => (await hoverReadings(first)).every(row => row.opacity === 1 && row.fill === .15)).toBe(true);
  80  | });
  81  | 
  82  | test("three five and six dimension outer grids meet their 100 point metric directions", async ({ page }) => {
  83  |   await open(page);
  84  |   const rows = [];
  85  |   for (const [id, dimensions] of [["radar-triangle", 3], ["radar-default", 5], ["radar-hexagon", 6]] as const) {
  86  |     const card = cardFor(page, id);
  87  |     await ready(card);
  88  |     const result = await card.locator('[data-rain-id="ui-chart-radar"] svg').evaluate((svg, n) => {
  89  |       const point = (node: SVGGraphicsElement, x: number, y: number) => new DOMPoint(x, y).matrixTransform(node.getScreenCTM()!);
  90  |       const center = point(svg as SVGSVGElement, Number(svg.getAttribute("width")) / 2, Number(svg.getAttribute("height")) / 2);
  91  |       const polygons = [...svg.querySelectorAll<SVGPathElement>('path[fill="none"]')].map(path => {
  92  |         const numbers = (path.getAttribute("d") ?? "").match(/-?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)?.map(Number) ?? [];
  93  |         const vertices = Array.from({ length: numbers.length / 2 }, (_, i) => point(path, numbers[i * 2]!, numbers[i * 2 + 1]!));
  94  |         return { vertices, radius: Math.max(...vertices.map(p => Math.hypot(p.x - center.x, p.y - center.y))) };
  95  |       });
  96  |       const outer = polygons.sort((a, b) => b.radius - a.radius)[0]!;
  97  |       const axes = [...svg.querySelectorAll<SVGLineElement>("line")].map(line => point(line, Number(line.getAttribute("x2")), Number(line.getAttribute("y2"))));
  98  |       // The hexagon intentionally hides axes; labels still define every metric direction.
  99  |       const endpoints = axes.length === n ? axes : [...svg.querySelectorAll<SVGTextElement>("text")].map(text => {
  100 |         const p = point(text, Number(text.getAttribute("x")), Number(text.getAttribute("y")));
  101 |         const r = Math.hypot(p.x - center.x, p.y - center.y);
  102 |         return { x: center.x + (p.x - center.x) * outer.radius / r, y: center.y + (p.y - center.y) * outer.radius / r };
  103 |       });
  104 |       return { axisCount: axes.length, endpoints: endpoints.map(p => ({ x: p.x, y: p.y })), radius: outer.radius,
  105 |         distances: endpoints.map(p => Math.min(...outer.vertices.map(v => Math.hypot(v.x - p.x, v.y - p.y)))) };
  106 |     }, dimensions);
  107 |     rows.push({ id, dimensions, ...result });
  108 |   }
  109 |   await facts("grid-axis-alignment", rows);
  110 |   for (const row of rows) {
  111 |     expect.soft(row.endpoints.length, row.id).toBe(row.dimensions);
  112 |     expect.soft(row.radius, row.id).toBeGreaterThan(50);
  113 |     for (const distance of row.distances) expect.soft(distance, row.id).toBeLessThan(1);
  114 |   }
  115 | });
  116 | 
  117 | test("default and variant radar hover glows stay light and local to their series", async ({ page }) => {
  118 |   await open(page, "no-preference");
  119 |   const rows = [];
  120 |   for (const id of ["default-example", ...variants]) {
  121 |     const card = id === "default-example" ? page.locator('[data-rain-id="chart-radar"]') : cardFor(page, id);
  122 |     await ready(card);
  123 |     await page.waitForTimeout(1800);
  124 |     await groups(card).last().hover({ force: true });
  125 |     await expect.poll(async () => (await hoverReadings(card)).at(-1)!.fill).toBeCloseTo(.35, 2);
  126 |     const filter = await groups(card).last().locator("path").evaluate(node => getComputedStyle(node).filter);
  127 |     const slash = filter.match(/\/\s*([\d.]+)(%)?\s*\)/);
  128 |     const rgba = filter.match(/rgba\([^)]*,\s*([\d.]+)\)/);
  129 |     const alpha = slash ? Number(slash[1]) / (slash[2] ? 100 : 1) : rgba ? Number(rgba[1]) : 1;
  130 |     const pixels = [...filter.matchAll(/(-?\d+(?:\.\d+)?)px/g)].map(match => Number(match[1]));
```