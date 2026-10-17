# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-matrix-refinement.spec.ts >> heat readout tone follows the painted light-to-dark and dark-to-light fill without a plate
- Location: tests/e2e/chart-business-matrix-refinement.spec.ts:328:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-matrix-example="course-count"] [data-rain-id="ui-chart-matrix"]').locator('[data-slot="cell"]')
Expected: 36
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('[data-matrix-example="course-count"] [data-rain-id="ui-chart-matrix"]').locator('[data-slot="cell"]')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]: "[plugin:vite:oxc] Transform failed with 1 error: [PARSE_ERROR] Logical expressions and coalesce expressions cannot be mixed ╭─[ ../../packages/ui/src/charts/matrix/matrix-chart.tsx:188:28 ] │ 188 │ const background = mark && luminance(getComputedStyle(mark).backgroundColor) ?? luminance(getComputedStyle(probe).backgroundColor); │ ───────────────────────────────────────────────────────┬─────────────────────────────────────────────────────── │ ╰───────────────────────────────────────────────────────── │ │ Help: Wrap either expression by parentheses ─────╯"
  - generic [ref=e6]: /Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/packages/ui/src/charts/matrix/matrix-chart.tsx
  - generic [ref=e7]: at transformWithOxc (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/card-v2/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:4103:19) at TransformPluginContext.transform (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/card-v2/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:4174:26) at EnvironmentPluginContainer.transform (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/card-v2/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:30932:51) at async loadAndTransform (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/card-v2/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:20671:26) at async viteTransformMiddleware (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/card-v2/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:25205:20)
  - generic [ref=e8]:
    - text: Click outside, press Esc key, or fix the code to dismiss.You can also disable this overlay by setting
    - code [ref=e9]: server.hmr.overlay
    - text: to
    - code [ref=e10]: "false"
    - text: in
    - code [ref=e11]: vite.config.ts
    - text: .
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | 
  4   | const evidence = "evidence/runtime/chart-matrix-refinement-2026-10-09/browser";
  5   | const matrix = (page: Page, fixture: string) => page.locator(`[data-matrix-example="${fixture}"] [data-rain-id="ui-chart-matrix"]`);
  6   | const cell = (chart: Locator, row: string, column: string) => chart.locator(`[data-slot="cell"][data-row-id="${row}"][data-column-id="${column}"]`);
  7   | async function record(name: string, facts: unknown) {
  8   |   await mkdir(evidence, { recursive: true });
  9   |   await writeFile(`${evidence}/${name}.json`, JSON.stringify(facts, null, 2));
  10  | }
  11  | async function open(page: Page, reduced = true) {
  12  |   await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" });
  13  |   await page.goto("/#chart-business");
> 14  |   await expect(matrix(page, "course-count").locator('[data-slot="cell"]')).toHaveCount(36);
      |                                                                            ^ Error: expect(locator).toHaveCount(expected) failed
  15  | }
  16  | async function equalColumns(chart: Locator, size: number) {
  17  |   const widths = await chart.locator("tbody tr").first().locator('[data-slot="cell"]').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().width));
  18  |   expect(widths).toHaveLength(size);
  19  |   expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(1);
  20  |   return widths;
  21  | }
  22  | 
  23  | for (const size of [6, 12]) test(`${size}x${size} matrices keep equal columns with long headers and contained narrow scrolling`, async ({ page }) => {
  24  |   await open(page);
  25  |   await page.getByRole("button", { name: `${size}×${size}`, exact: true }).click();
  26  |   const chart = matrix(page, "course-similarity");
  27  |   await chart.scrollIntoViewIfNeeded();
  28  |   const normal = await equalColumns(chart, size);
  29  |   await page.getByRole("combobox", { name: "业务数据状态" }).selectOption("long");
  30  |   const desktop = await equalColumns(chart, size);
  31  |   await page.setViewportSize({ width: 390, height: 844 });
  32  |   const narrow = await equalColumns(chart, size);
  33  |   const scroll = await chart.locator('[data-slot="scroll-container"]').evaluate(node => ({ width: node.clientWidth, content: node.scrollWidth }));
  34  |   expect(scroll.content).toBeGreaterThan(scroll.width);
  35  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  36  |   await record(`equal-columns-${size}`, { normal, desktop, narrow, scroll });
  37  |   await chart.screenshot({ path: `${evidence}/matrix-${size}-narrow.png` });
  38  | });
  39  | 
  40  | test("quantity bubbles use a shared area and color scale with white transparent in-bubble readings", async ({ page }) => {
  41  |   await open(page);
  42  |   const chart = matrix(page, "course-count");
  43  |   await chart.scrollIntoViewIfNeeded();
  44  |   const bubbles = await chart.locator('[data-slot="cell"][data-state="value"]').evaluateAll(nodes => nodes.map(node => {
  45  |     const circle = node.querySelector<SVGCircleElement>("circle")!;
  46  |     const reading = node.querySelector<SVGTextElement>('text[data-slot="reading"]');
  47  |     const container = reading?.closest('[data-slot="reading-container"]');
  48  |     const fill = getComputedStyle(circle).fill;
  49  |     const rgb = fill.match(/^rgba?\((.+)\)$/), srgb = fill.match(/^color\(srgb (.+)\)$/);
  50  |     const channels = (rgb?.[1] ?? srgb?.[1] ?? "").split(/[\s,\/]+/).filter(Boolean).slice(0, 3).map(part => parseFloat(part) / (part.endsWith("%") ? 100 : rgb ? 255 : 1));
  51  |     const luminance = channels.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index]!, 0);
  52  |     return { value: Number(node.getAttribute("aria-label")), radius: circle.r.baseVal.value, fill, luminance, chroma: Math.max(...channels) - Math.min(...channels),
  53  |       visibleReading: !!reading && getComputedStyle(reading).visibility !== "hidden" && (!container || getComputedStyle(container).visibility !== "hidden"),
  54  |       readingFill: reading ? getComputedStyle(reading).fill : null, readingBackground: container ? getComputedStyle(container).backgroundColor : null };
  55  |   }));
  56  |   expect(bubbles.length).toBeGreaterThan(10);
  57  |   expect(new Set(bubbles.map(item => item.fill)).size).toBeGreaterThan(3);
  58  |   const ordered = [...bubbles].sort((a, b) => a.value - b.value);
  59  |   expect(ordered.at(-1)!.luminance).toBeLessThan(ordered[0]!.luminance);
  60  |   expect(ordered.at(-1)!.chroma).toBeGreaterThan(ordered[0]!.chroma);
  61  |   const normalizedAreas = bubbles.filter(item => item.value > 0).map(item => item.radius ** 2 / item.value);
  62  |   expect(Math.max(...normalizedAreas) - Math.min(...normalizedAreas)).toBeLessThan(.001);
  63  |   const visible = bubbles.filter(item => item.visibleReading);
  64  |   expect(visible.length).toBeGreaterThan(0);
  65  |   expect(visible.every(item => item.readingFill === "rgb(255, 255, 255)" && item.readingBackground === "rgba(0, 0, 0, 0)")).toBe(true);
  66  |   await expect(chart.locator('[data-slot="reading-plate"]')).toHaveCount(0);
  67  |   await record("bubble-encoding", { bubbles, normalizedAreas });
  68  |   await chart.screenshot({ path: `${evidence}/bubble-matrix.png` });
  69  | });
  70  | 
  71  | test("heat readings have no backing plate and legends match continuous, quantity and level encodings", async ({ page }) => {
  72  |   await open(page);
  73  |   const heat = matrix(page, "course-similarity");
  74  |   await heat.scrollIntoViewIfNeeded();
  75  |   const backgrounds = await heat.locator('[data-slot="cell"] [data-slot="reading-container"]').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor));
  76  |   expect(backgrounds.length).toBeGreaterThan(0);
  77  |   expect(backgrounds.every(value => value === "rgba(0, 0, 0, 0)")).toBe(true);
  78  |   await expect(heat.locator('[data-slot="reading-plate"]')).toHaveCount(0);
  79  |   const gradient = heat.locator('[data-slot="legend-gradient"]');
  80  |   await expect(gradient).toHaveCount(1);
  81  |   const gradientFacts = await gradient.evaluate(node => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height, background: getComputedStyle(node).backgroundImage }));
  82  |   expect(gradientFacts.height).toBeLessThanOrEqual(12);
  83  |   expect(gradientFacts.width).toBeGreaterThan(gradientFacts.height * 10);
  84  |   expect(gradientFacts.background).toContain("gradient");
  85  |   const quantity = matrix(page, "course-count").locator('[data-slot="legend"]');
  86  |   const quantityFacts = await quantity.locator("circle").evaluateAll(nodes => nodes.map(node => ({ radius: (node as SVGCircleElement).r.baseVal.value, fill: getComputedStyle(node).fill })));
  87  |   expect(quantityFacts).toHaveLength(3);
  88  |   expect(quantityFacts.every(item => item.radius > 0)).toBe(true);
  89  |   expect(new Set(quantityFacts.map(item => item.fill)).size).toBe(3);
  90  |   expect(await quantity.evaluate(node => node.getBoundingClientRect().height)).toBeLessThanOrEqual(72);
  91  |   const levels = matrix(page, "support-level").locator('[data-slot="legend"]');
  92  |   await expect(levels).toContainText("无直接支撑");
  93  |   await expect(levels).toContainText("一般支撑");
  94  |   await expect(levels).toContainText("核心支撑");
  95  |   const radii = await levels.locator("circle").evaluateAll(nodes => nodes.map(node => (node as SVGCircleElement).r.baseVal.value));
  96  |   expect(radii).toHaveLength(3);
  97  |   expect(new Set(radii).size).toBe(1);
  98  |   await record("legends", { backgrounds, gradientFacts, quantityFacts, levelRadii: radii });
  99  | });
  100 | 
  101 | test("gradient and grade legend focus highlight matching cells without changing data fills", async ({ page }) => {
  102 |   await open(page);
  103 |   const heat = matrix(page, "course-similarity");
  104 |   const heatCells = heat.locator('[data-slot="cell"][data-state="value"]');
  105 |   const before = await heatCells.locator('[data-slot="cell-mark"]').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor));
  106 |   const ranges = heat.locator('[data-slot="legend"]').getByRole("button");
  107 |   await expect(ranges).toHaveCount(5);
  108 |   await ranges.nth(2).focus();
  109 |   const matching = heat.locator('[data-slot="cell"][data-state="value"][data-highlighted="true"]');
  110 |   const dimmed = heat.locator('[data-slot="cell"][data-state="value"][data-highlighted="false"]');
  111 |   expect(await matching.count()).toBeGreaterThan(0);
  112 |   expect(await dimmed.count()).toBeGreaterThan(0);
  113 |   expect(await heatCells.locator('[data-slot="cell-mark"]').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor))).toEqual(before);
  114 |   const levels = matrix(page, "support-level");
```