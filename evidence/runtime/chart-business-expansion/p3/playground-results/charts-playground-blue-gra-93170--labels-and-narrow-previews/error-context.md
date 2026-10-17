# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: charts-playground.spec.ts >> blue-gray monochrome is available in 15 native catalog entries with ordered intensity, readable sunburst labels and narrow previews
- Location: tests/e2e/charts-playground.spec.ts:105:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5387/bklit-catalog.html#chart-area
Call log:
  - navigating to "http://127.0.0.1:5387/bklit-catalog.html#chart-area", waiting until "load"

```

# Test source

```ts
  13  |   await expect(heading).toBeFocused();
  14  |   await page.getByRole("link", { name: "返回组件目录" }).click();
  15  |   await expect(group).toBeVisible();
  16  | });
  17  | 
  18  | test("[T09] all 17 native documentation entries render, read and expose their actual source", async ({ page }) => {
  19  |   await page.emulateMedia({ reducedMotion: "reduce" });
  20  |   const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  21  |   await mkdir(evidence, { recursive: true });
  22  |   const entries=CHART_ENTRIES.filter(entry => entry.origin === "bklit");
  23  |   expect(entries).toHaveLength(17);
  24  |   for (const entry of entries) {
  25  |     await page.goto(`/#chart-${entry.id}`);
  26  |     await expect(page.getByRole("heading", { level: 1, name: entry.label })).toBeVisible();
  27  |     const chart = page.locator(`[data-rain-id="chart-${entry.id}"]`);
  28  |     await expect(chart.locator("svg").first()).toBeVisible();
  29  |     await chart.getByText("查看精确数据", { exact: true }).click();
  30  |     await expect(chart.locator("tbody tr").first()).toBeVisible();
  31  |     await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
  32  |     await expect(page.getByRole("link", { name: "下载 chart-examples.tsx", exact: true })).toHaveAttribute("href", /AreaChart|LineChart/);
  33  |     await page.getByRole("combobox", { name: "示例源码文件" }).selectOption("chart-data.ts");
  34  |     await expect(page.locator('.rain-chart-source[data-source="default"] pre')).toContainText("makeTimeline");
  35  |     await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
  36  |     await page.screenshot({ path: `${evidence}/${entry.id}.png`, fullPage: true });
  37  |   }
  38  |   expect(errors).toEqual([]);
  39  |   await writeFile(`${evidence}/entry-facts.json`, JSON.stringify({ entries: entries.map(entry => entry.id), errors }, null, 2));
  40  | });
  41  | 
  42  | test("[T09] recipe source stays current and the narrow chart doc does not overflow", async ({ page }) => {
  43  |   await page.setViewportSize({ width: 390, height: 1000 });
  44  |   await page.emulateMedia({ reducedMotion: "reduce" });
  45  |   await page.goto("/#chart-bar");
  46  |   await page.getByRole("combobox", { name: "视觉配方" }).selectOption("bar-fade");
  47  |   await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
  48  |   await expect(page.locator('.rain-chart-source[data-source="default"] pre')).toContainText('data-recipe="bar-fade"');
  49  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  50  |   await page.screenshot({ path: `${evidence}/bar-fade-390.png`, fullPage: true });
  51  | });
  52  | 
  53  | test("[T09] chart styles leave a normal Rain switch unchanged", async ({ page }) => {
  54  |   await page.goto("/#switch");
  55  |   const control = page.getByRole("switch", { name: "自动发布" });
  56  |   await expect(control).toBeVisible();
  57  |   const style = () => control.evaluate(node => {
  58  |     const css = getComputedStyle(node); return [css.width, css.height, css.fontFamily, css.backgroundColor, css.borderRadius];
  59  |   });
  60  |   const before = await style();
  61  |   await page.evaluate(() => { location.hash = "#chart-area"; });
  62  |   await expect(page.getByRole("heading", { level: 1, name: "面积图" })).toBeVisible();
  63  |   await page.getByRole("link", { name: "返回组件目录" }).click();
  64  |   await page.getByRole("link", { name: "Switch 开关", exact: true }).click();
  65  |   await expect(control).toBeVisible();
  66  |   expect(await style()).toEqual(before);
  67  | });
  68  | 
  69  | test("blue-gray monochrome repaints actual bars, areas and stage gradients and restores the previous recipe", async ({ page }) => {
  70  |   await page.emulateMedia({ reducedMotion: "reduce" });
  71  |   const colors = ["#6288C7", "#3F5D91", "#91B0E1", "#BFD3F2", "#E5EEFC"];
  72  |   const facts = [];
  73  |   for (const id of ["bar", "area", "funnel"]) {
  74  |     await page.goto(`/#chart-${id}`);
  75  |     const host = page.locator(`[data-rain-id="chart-${id}"]`);
  76  |     const select = page.getByRole("combobox", { name: "视觉配方", exact: true });
  77  |     const previousRecipe = await select.inputValue();
  78  |     const previousColors = await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()));
  79  |     await select.selectOption("monochrome-blue", { timeout: 5000 });
  80  |     await expect(host).toHaveAttribute("data-recipe", "monochrome-blue");
  81  |     expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()))).toEqual(colors);
  82  |     if (id === "bar") {
  83  |       expect(await host.locator('g[class^="bar-series-"] rect').evaluateAll(nodes => [...new Set(nodes.map(node => getComputedStyle(node).fill))])).toEqual(["rgb(98, 136, 199)", "rgb(63, 93, 145)", "rgb(145, 176, 225)"]);
  84  |       await host.locator(".legend-container button").first().focus();
  85  |       await expect(host.locator(".legend-container button").first()).toBeFocused();
  86  |     }
  87  |     if (id === "area") {
  88  |       await expect(host.locator('path[stroke="var(--chart-1)"]').first()).toHaveCSS("stroke", "rgb(98, 136, 199)");
  89  |     }
  90  |     if (id === "funnel") {
  91  |       const stops = await host.locator("linearGradient stop").evaluateAll(nodes => [...new Set(nodes.map(node => getComputedStyle(node).stopColor))]);
  92  |       expect(stops).toEqual(expect.arrayContaining(["rgb(63, 93, 145)", "rgb(98, 136, 199)", "rgb(145, 176, 225)", "rgb(191, 211, 242)", "rgb(229, 238, 252)"]));
  93  |     }
  94  |     await page.locator("[data-chart-default-controls]").getByRole("button", { name: "更新数据", exact: true }).click();
  95  |     await expect(page.getByRole("status").filter({ hasText: "已更新 1 次" })).toBeVisible();
  96  |     facts.push({ id, colors, updated: true });
  97  |     await mkdir(`${evidence}/monochrome`, { recursive: true });
  98  |     await page.screenshot({ path: `${evidence}/monochrome/${id}.png`, fullPage: true });
  99  |     await select.selectOption(previousRecipe);
  100 |     expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()))).toEqual(previousColors);
  101 |   }
  102 |   await writeFile(`${evidence}/monochrome/facts.json`, JSON.stringify(facts, null, 2));
  103 | });
  104 | 
  105 | test("blue-gray monochrome is available in 15 native catalog entries with ordered intensity, readable sunburst labels and narrow previews", async ({ page }) => {
  106 |   await page.emulateMedia({ reducedMotion: "reduce" });
  107 |   const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  108 |   const entries = CHART_ENTRIES.filter(entry => entry.origin === "bklit" && entry.recipes.includes("monochrome-blue"));
  109 |   expect(entries).toHaveLength(15);
  110 |   const palette = ["rgb(98, 136, 199)", "rgb(63, 93, 145)", "rgb(145, 176, 225)", "rgb(191, 211, 242)", "rgb(229, 238, 252)"];
  111 |   const facts = [];
  112 |   for (const entry of entries) {
> 113 |     await page.goto(`http://127.0.0.1:5387/bklit-catalog.html#chart-${entry.id}`);
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5387/bklit-catalog.html#chart-area
  114 |     const host = page.locator(`[data-rain-id="chart-${entry.id}"]`).first();
  115 |     await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption({ label: "蓝灰单色" });
  116 |     await expect(host.locator("svg").first()).toBeVisible();
  117 |     await expect.poll(() => host.locator("svg path, svg rect, svg circle, svg stop").evaluateAll((nodes, colors) => nodes.some(node => [getComputedStyle(node).fill, getComputedStyle(node).stroke, getComputedStyle(node).stopColor].some(color => colors.includes(color))), palette)).toBe(true);
  118 |     if (["heatmap", "choropleth"].includes(entry.id)) {
  119 |       expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-scale-0${i + 1}`).trim()))).toEqual(["#E5EEFC", "#BFD3F2", "#91B0E1", "#6288C7", "#3F5D91"]);
  120 |     }
  121 |     if (entry.id === "sunburst") {
  122 |       const labels = host.locator('svg text[style*="font-weight: 600"]');
  123 |       await expect(labels.first()).toBeVisible();
  124 |       expect(await labels.evaluateAll(nodes => nodes.every(node => getComputedStyle(node).fill === "rgb(20, 35, 70)"))).toBe(true);
  125 |     }
  126 |     if (["area", "bar", "funnel"].includes(entry.id)) {
  127 |       if (entry.id === "funnel") await expect.poll(() => host.locator(".rain-chart-funnel").getByText("进入课程", { exact: true }).evaluate(node => getComputedStyle(node.parentElement!.parentElement!).opacity)).toBe("1");
  128 |       await page.getByRole("button", { name: "对照实例", exact: true }).click();
  129 |       const gradients = await page.locator("svg linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  130 |       expect(new Set(gradients).size).toBe(gradients.length);
  131 |       await page.getByRole("button", { name: "对照实例", exact: true }).click();
  132 |       await mkdir(`${evidence}/monochrome`, { recursive: true });
  133 |       await page.screenshot({ path: `${evidence}/monochrome/${entry.id}-1440.png`, fullPage: true });
  134 |       await page.setViewportSize({ width: 390, height: 900 });
  135 |       const beforeResize = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth }));
  136 |       await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  137 |       const afterResize = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth }));
  138 |       facts.push({ id: entry.id, beforeResize, afterResize });
  139 |       await page.screenshot({ path: `${evidence}/monochrome/${entry.id}-390.png`, fullPage: true });
  140 |       await page.setViewportSize({ width: 1440, height: 1000 });
  141 |     }
  142 |     facts.push({ id: entry.id, paletteApplied: true });
  143 |   }
  144 |   expect(errors).toEqual([]);
  145 |   await mkdir(`${evidence}/monochrome`, { recursive: true });
  146 |   await writeFile(`${evidence}/monochrome/catalog-facts.json`, JSON.stringify({ palette, entries: facts, errors }, null, 2));
  147 | });
  148 | 
```