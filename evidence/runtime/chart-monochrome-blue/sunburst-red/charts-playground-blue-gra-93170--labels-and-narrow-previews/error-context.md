# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: charts-playground.spec.ts >> blue-gray monochrome is available in 15 native catalog entries with ordered intensity, readable sunburst labels and narrow previews
- Location: tests/e2e/charts-playground.spec.ts:103:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - heading "Rain 图表库" [level=1] [ref=e6]
      - paragraph [ref=e7]: 17种图型，Rain 配色与字体，Bklit 原生动效与交互。
    - link "查看原生与 Rain 对照" [ref=e8] [cursor=pointer]:
      - /url: /bklit-validation.html
  - generic [ref=e9]:
    - navigation "图型目录" [ref=e10]:
      - link "面积图" [ref=e11] [cursor=pointer]:
        - /url: "#chart-area"
      - link "折线图" [ref=e12] [cursor=pointer]:
        - /url: "#chart-line"
      - link "柱状图" [ref=e13] [cursor=pointer]:
        - /url: "#chart-bar"
      - link "组合图" [ref=e14] [cursor=pointer]:
        - /url: "#chart-composed"
      - link "饼图 / 环饼" [ref=e15] [cursor=pointer]:
        - /url: "#chart-pie"
      - link "多目标进度环" [ref=e16] [cursor=pointer]:
        - /url: "#chart-ring"
      - link "雷达图" [ref=e17] [cursor=pointer]:
        - /url: "#chart-radar"
      - link "时间散点" [ref=e18] [cursor=pointer]:
        - /url: "#chart-scatter"
      - link "漏斗图" [ref=e19] [cursor=pointer]:
        - /url: "#chart-funnel"
      - link "仪表图" [ref=e20] [cursor=pointer]:
        - /url: "#chart-gauge"
      - link "桑基图" [ref=e21] [cursor=pointer]:
        - /url: "#chart-sankey"
      - link "旭日图" [ref=e22] [cursor=pointer]:
        - /url: "#chart-sunburst"
      - link "日历热图" [ref=e23] [cursor=pointer]:
        - /url: "#chart-heatmap"
      - link "分区地图" [ref=e24] [cursor=pointer]:
        - /url: "#chart-choropleth"
      - link "K线图" [ref=e25] [cursor=pointer]:
        - /url: "#chart-candlestick"
      - link "盈亏线" [ref=e26] [cursor=pointer]:
        - /url: "#chart-profit-loss"
      - link "实时折线" [ref=e27] [cursor=pointer]:
        - /url: "#chart-live-line"
    - region [ref=e28]:
      - heading "旭日图" [level=2] [ref=e29]
      - paragraph [ref=e30]: 课程内容层级、扇区聚焦与逐层下钻。
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e33]:
            - option "蓝紫近邻"
            - option "多色类别"
            - option "协调实色"
            - option "蓝灰单色" [selected]
        - generic [ref=e34]:
          - text: 示例状态
          - combobox "示例状态" [ref=e35]:
            - option "正常数据" [selected]
            - option "无数据"
            - option "零值"
            - option "长标签"
            - option "单项／单点"
            - option "缺测"
            - option "无效数据"
        - button "更新数据" [ref=e36] [cursor=pointer]
        - button "重播动效" [ref=e37] [cursor=pointer]
        - button "对照实例" [active] [ref=e38] [cursor=pointer]
      - generic [ref=e39]:
        - generic [ref=e41]:
          - navigation "Drill-down path" [ref=e42]:
            - button "学习内容" [ref=e45] [cursor=pointer]
          - img "Sunburst chart of 学习内容" [ref=e47]:
            - generic [ref=e66] [cursor=pointer]
            - generic [ref=e68] [cursor=pointer]
            - generic [ref=e70] [cursor=pointer]
            - generic [ref=e72]:
              - generic: 基础课程
              - generic: 视频
              - generic: 阅读
              - generic: 练习
              - generic: 进阶课程
              - generic: 视频
              - generic: 阅读
              - generic: 练习
              - generic: 应用课程
              - generic: 视频
              - generic: 阅读
              - generic: 练习
          - generic [ref=e73]: 悬停读取，点击扇区下钻；面包屑返回上层。
        - group [ref=e74]:
          - generic "查看精确数据" [ref=e75] [cursor=pointer]
      - status [ref=e76]: 示例数据 · 已按系统设置减少动效
      - paragraph [ref=e77]:
        - strong [ref=e78]: 数据要求：
        - text: 父项由叶项求和，父项不重复提供value。
      - paragraph [ref=e79]:
        - strong [ref=e80]: 使用边界：
        - text: 小扇区和深层数据通过提示及精确表补充读取。
      - group [ref=e81]:
        - generic "调用配置、完整源码与示例数据" [ref=e82] [cursor=pointer]
        - option "main.tsx" [selected]
        - option "index.html"
        - option "chart-examples.tsx"
        - option "chart-data.ts"
        - option "chart-catalog.ts"
        - option "chart-examples.css"
```

# Test source

```ts
  22  |   for (const entry of CHART_ENTRIES) {
  23  |     await page.goto(`/#chart-${entry.id}`);
  24  |     await expect(page.getByRole("heading", { level: 1, name: entry.label })).toBeVisible();
  25  |     const chart = page.locator(`[data-rain-id="chart-${entry.id}"]`);
  26  |     await expect(chart.locator("svg").first()).toBeVisible();
  27  |     await chart.getByText("查看精确数据", { exact: true }).click();
  28  |     await expect(chart.locator("tbody tr").first()).toBeVisible();
  29  |     await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
  30  |     await expect(page.getByRole("link", { name: "下载 chart-examples.tsx", exact: true })).toHaveAttribute("href", /AreaChart|LineChart/);
  31  |     await page.getByRole("combobox", { name: "示例源码文件" }).selectOption("chart-data.ts");
  32  |     await expect(page.locator(".rain-chart-source pre")).toContainText("makeTimeline");
  33  |     await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
  34  |     await page.screenshot({ path: `${evidence}/${entry.id}.png`, fullPage: true });
  35  |   }
  36  |   expect(errors).toEqual([]);
  37  |   await writeFile(`${evidence}/entry-facts.json`, JSON.stringify({ entries: CHART_ENTRIES.map(entry => entry.id), errors }, null, 2));
  38  | });
  39  | 
  40  | test("[T09] recipe source stays current and the narrow chart doc does not overflow", async ({ page }) => {
  41  |   await page.setViewportSize({ width: 390, height: 1000 });
  42  |   await page.emulateMedia({ reducedMotion: "reduce" });
  43  |   await page.goto("/#chart-bar");
  44  |   await page.getByRole("combobox", { name: "视觉配方" }).selectOption("bar-fade");
  45  |   await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
  46  |   await expect(page.locator(".rain-chart-source pre")).toContainText('data-recipe="bar-fade"');
  47  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  48  |   await page.screenshot({ path: `${evidence}/bar-fade-390.png`, fullPage: true });
  49  | });
  50  | 
  51  | test("[T09] chart styles leave a normal Rain switch unchanged", async ({ page }) => {
  52  |   await page.goto("/#switch");
  53  |   const control = page.getByRole("switch", { name: "自动发布" });
  54  |   await expect(control).toBeVisible();
  55  |   const style = () => control.evaluate(node => {
  56  |     const css = getComputedStyle(node); return [css.width, css.height, css.fontFamily, css.backgroundColor, css.borderRadius];
  57  |   });
  58  |   const before = await style();
  59  |   await page.evaluate(() => { location.hash = "#chart-area"; });
  60  |   await expect(page.getByRole("heading", { level: 1, name: "面积图" })).toBeVisible();
  61  |   await page.getByRole("link", { name: "返回组件目录" }).click();
  62  |   await page.getByRole("link", { name: "Switch 开关", exact: true }).click();
  63  |   await expect(control).toBeVisible();
  64  |   expect(await style()).toEqual(before);
  65  | });
  66  | 
  67  | test("blue-gray monochrome repaints actual bars, areas and stage gradients and restores the previous recipe", async ({ page }) => {
  68  |   await page.emulateMedia({ reducedMotion: "reduce" });
  69  |   const colors = ["#6288C7", "#3F5D91", "#91B0E1", "#BFD3F2", "#E5EEFC"];
  70  |   const facts = [];
  71  |   for (const id of ["bar", "area", "funnel"]) {
  72  |     await page.goto(`/#chart-${id}`);
  73  |     const host = page.locator(`[data-rain-id="chart-${id}"]`);
  74  |     const select = page.getByRole("combobox", { name: "视觉配方", exact: true });
  75  |     const previousRecipe = await select.inputValue();
  76  |     const previousColors = await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()));
  77  |     await select.selectOption("monochrome-blue", { timeout: 5000 });
  78  |     await expect(host).toHaveAttribute("data-recipe", "monochrome-blue");
  79  |     expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()))).toEqual(colors);
  80  |     if (id === "bar") {
  81  |       expect(await host.locator('g[class^="bar-series-"] rect').evaluateAll(nodes => [...new Set(nodes.map(node => getComputedStyle(node).fill))])).toEqual(["rgb(98, 136, 199)", "rgb(63, 93, 145)", "rgb(145, 176, 225)"]);
  82  |       await host.locator(".legend-container button").first().focus();
  83  |       await expect(host.locator(".legend-container button").first()).toBeFocused();
  84  |     }
  85  |     if (id === "area") {
  86  |       await expect(host.locator('path[stroke="var(--chart-1)"]').first()).toHaveCSS("stroke", "rgb(98, 136, 199)");
  87  |     }
  88  |     if (id === "funnel") {
  89  |       const stops = await host.locator("linearGradient stop").evaluateAll(nodes => [...new Set(nodes.map(node => getComputedStyle(node).stopColor))]);
  90  |       expect(stops).toEqual(expect.arrayContaining(["rgb(63, 93, 145)", "rgb(98, 136, 199)", "rgb(145, 176, 225)", "rgb(191, 211, 242)", "rgb(229, 238, 252)"]));
  91  |     }
  92  |     await page.getByRole("button", { name: "更新数据", exact: true }).click();
  93  |     await expect(page.getByRole("status").filter({ hasText: "已更新 1 次" })).toBeVisible();
  94  |     facts.push({ id, colors, updated: true });
  95  |     await mkdir(`${evidence}/monochrome`, { recursive: true });
  96  |     await page.screenshot({ path: `${evidence}/monochrome/${id}.png`, fullPage: true });
  97  |     await select.selectOption(previousRecipe);
  98  |     expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()))).toEqual(previousColors);
  99  |   }
  100 |   await writeFile(`${evidence}/monochrome/facts.json`, JSON.stringify(facts, null, 2));
  101 | });
  102 | 
  103 | test("blue-gray monochrome is available in 15 native catalog entries with ordered intensity, readable sunburst labels and narrow previews", async ({ page }) => {
  104 |   await page.emulateMedia({ reducedMotion: "reduce" });
  105 |   const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  106 |   const entries = CHART_ENTRIES.filter(entry => entry.recipes.includes("monochrome-blue"));
  107 |   expect(entries).toHaveLength(15);
  108 |   const palette = ["rgb(98, 136, 199)", "rgb(63, 93, 145)", "rgb(145, 176, 225)", "rgb(191, 211, 242)", "rgb(229, 238, 252)"];
  109 |   const facts = [];
  110 |   for (const entry of entries) {
  111 |     await page.goto(`http://127.0.0.1:5387/bklit-catalog.html#chart-${entry.id}`);
  112 |     const host = page.locator(`[data-rain-id="chart-${entry.id}"]`).first();
  113 |     await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption({ label: "蓝灰单色" });
  114 |     await expect(host.locator("svg").first()).toBeVisible();
  115 |     await expect.poll(() => host.locator("svg path, svg rect, svg circle, svg stop").evaluateAll((nodes, colors) => nodes.some(node => [getComputedStyle(node).fill, getComputedStyle(node).stroke, getComputedStyle(node).stopColor].some(color => colors.includes(color))), palette)).toBe(true);
  116 |     if (["heatmap", "choropleth"].includes(entry.id)) {
  117 |       expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-scale-0${i + 1}`).trim()))).toEqual(["#E5EEFC", "#BFD3F2", "#91B0E1", "#6288C7", "#3F5D91"]);
  118 |     }
  119 |     if (entry.id === "sunburst") {
  120 |       const labels = host.locator('svg text[style*="font-weight: 600"]');
  121 |       await expect(labels.first()).toBeVisible();
> 122 |       expect(await labels.evaluateAll(nodes => nodes.every(node => getComputedStyle(node).fill === "rgb(20, 35, 70)"))).toBe(true);
      |                                                                                                                         ^ Error: expect(received).toBe(expected) // Object.is equality
  123 |     }
  124 |     if (["area", "bar", "funnel"].includes(entry.id)) {
  125 |       await page.getByRole("button", { name: "对照实例", exact: true }).click();
  126 |       const gradients = await page.locator("svg linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  127 |       expect(new Set(gradients).size).toBe(gradients.length);
  128 |       await page.getByRole("button", { name: "对照实例", exact: true }).click();
  129 |       await mkdir(`${evidence}/monochrome`, { recursive: true });
  130 |       await page.screenshot({ path: `${evidence}/monochrome/${entry.id}-1440.png`, fullPage: true });
  131 |       await page.setViewportSize({ width: 390, height: 900 });
  132 |       const beforeResize = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth }));
  133 |       await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  134 |       const afterResize = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth }));
  135 |       facts.push({ id: entry.id, beforeResize, afterResize });
  136 |       await page.screenshot({ path: `${evidence}/monochrome/${entry.id}-390.png`, fullPage: true });
  137 |       await page.setViewportSize({ width: 1440, height: 1000 });
  138 |     }
  139 |     facts.push({ id: entry.id, paletteApplied: true });
  140 |   }
  141 |   expect(errors).toEqual([]);
  142 |   await mkdir(`${evidence}/monochrome`, { recursive: true });
  143 |   await writeFile(`${evidence}/monochrome/catalog-facts.json`, JSON.stringify({ palette, entries: facts, errors }, null, 2));
  144 | });
  145 | 
```