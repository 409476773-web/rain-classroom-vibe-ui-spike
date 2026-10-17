# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: charts-playground.spec.ts >> blue-gray monochrome repaints actual bars, areas and stage gradients and restores the previous recipe
- Location: tests/e2e/charts-playground.spec.ts:67:1

# Error details

```
TimeoutError: locator.selectOption: Timeout 5000ms exceeded.
Call log:
  - waiting for getByRole('combobox', { name: '视觉配方', exact: true })
    - locator resolved to <select aria-label="视觉配方">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    10 × waiting for element to be visible and enabled
       - did not find some options
     - retrying select option action
       - waiting 500ms

```

# Page snapshot

```yaml
- main [ref=f1e3]:
  - generic [ref=f1e4]:
    - link "返回组件目录" [ref=f1e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=f1e7]:
      - heading "柱状图" [level=1] [ref=f1e8]
      - generic [ref=f1e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=f1e10]: 分组比较、互斥堆叠、同色渐变与圆头渐隐柱。
  - generic [ref=f1e11]:
    - heading "图型与可选配方" [level=2] [ref=f1e12]
    - paragraph [ref=f1e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=f1e14]:
      - generic [ref=f1e15]:
        - generic [ref=f1e16]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=f1e17]:
            - option "蓝紫近邻"
            - option "多色类别" [selected]
            - option "协调实色"
            - option "同色渐变柱"
            - option "圆头渐隐柱"
        - generic [ref=f1e18]:
          - text: 示例状态
          - combobox "示例状态" [ref=f1e19]:
            - option "正常" [selected]
            - option "无数据"
            - option "零值"
            - option "单项／单点"
            - option "长标签"
            - option "缺测"
            - option "无效数据"
        - generic [ref=f1e20]:
          - text: 系列数
          - combobox "系列数" [ref=f1e21]:
            - option "3" [selected]
            - option "5"
        - button "更新数据" [ref=f1e22] [cursor=pointer]
        - button "重播动效" [ref=f1e24] [cursor=pointer]
      - generic [ref=f1e26]:
        - generic [ref=f1e27]:
          - text: 柱形
          - combobox "柱形配方" [ref=f1e28] [cursor=pointer]:
            - option "分组柱" [selected]
            - option "互斥等级堆叠"
        - generic [ref=f1e29]:
          - generic:
            - generic:
              - generic: "0"
              - generic: "100"
              - generic: "200"
              - generic: "300"
          - generic:
            - generic: 课程一
            - generic: 课程二
            - generic: 课程三
            - generic: 课程四
            - generic: 课程五
            - generic: 课程六
        - generic [ref=f1e59]:
          - button "参与人数 · 人" [ref=f1e61] [cursor=pointer]
          - button "完成人数 · 人" [ref=f1e65] [cursor=pointer]
          - button "复习人数 · 人" [ref=f1e69] [cursor=pointer]
        - group [ref=f1e72]:
          - generic "查看精确数据" [ref=f1e73] [cursor=pointer]
      - status [ref=f1e74]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - generic [ref=f1e75]:
    - heading "数据与使用边界" [level=2] [ref=f1e76]
    - paragraph [ref=f1e77]: 类别键唯一；分组人数不可相加，堆叠改用互斥等级人数。
    - paragraph [ref=f1e78]: 原生柱坐标以0为下界，本例拒绝负值。
    - paragraph [ref=f1e79]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=f1e80]:
    - region [ref=f1e81]:
      - heading "API 与结构" [level=2] [ref=f1e82]
      - table [ref=f1e84]:
        - caption [ref=f1e85]: 柱状图 常用接口
        - rowgroup [ref=f1e86]:
          - row [ref=f1e87]:
            - columnheader "名称" [ref=f1e88]
            - columnheader "类型" [ref=f1e89]
            - columnheader "默认" [ref=f1e90]
            - columnheader "说明" [ref=f1e91]
        - rowgroup [ref=f1e92]:
          - row [ref=f1e93]:
            - rowheader [ref=f1e94]:
              - code [ref=f1e95]: data / value
            - cell [ref=f1e96]:
              - code [ref=f1e97]: 原生图型合同
            - cell "—" [ref=f1e98]
            - cell "类别键唯一；分组人数不可相加，堆叠改用互斥等级人数。" [ref=f1e99]
          - row [ref=f1e100]:
            - rowheader [ref=f1e101]:
              - code [ref=f1e102]: children
            - cell [ref=f1e103]:
              - code [ref=f1e104]: Compound Parts
            - cell "—" [ref=f1e105]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=f1e106]
          - row [ref=f1e107]:
            - rowheader [ref=f1e108]:
              - code [ref=f1e109]: className / style / margin
            - cell [ref=f1e110]:
              - code [ref=f1e111]: 原生尺寸接口
            - cell "—" [ref=f1e112]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=f1e113]
          - row [ref=f1e114]:
            - rowheader [ref=f1e115]:
              - code [ref=f1e116]: enterTransition / animationDuration
            - cell [ref=f1e117]:
              - code [ref=f1e118]: 原生动效配置
            - cell "—" [ref=f1e119]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=f1e120]
      - paragraph [ref=f1e121]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=f1e122]:
      - heading "调用示例" [level=2] [ref=f1e123]
      - generic [ref=f1e124]:
        - generic [ref=f1e125]:
          - button "复制代码" [ref=f1e126] [cursor=pointer]
          - status
        - code [ref=f1e129]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig, useReducedMotion } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; function App() { const [revision, setRevision] = useState(0); const reduced = useReducedMotion() ?? false; return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-bar\" data-recipe=\"category-wide\"> <ChartExample id=\"bar\" recipe=\"category-wide\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=f1e130]:
        - text: 当前源码：
        - code [ref=f1e131]: packages/ui/src/charts/vendor/charts/bar-chart.tsx
  - group [ref=f1e132]:
    - generic "调用配置、完整源码与示例数据" [ref=f1e133] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-data.ts"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
  - navigation "相关图型" [ref=f1e134]:
    - link "面积图" [ref=f1e135] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=f1e137] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=f1e139] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=f1e141] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=f1e143] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=f1e145] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=f1e147] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=f1e149] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=f1e151] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=f1e153] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=f1e155] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=f1e157] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=f1e159] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=f1e161] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=f1e163] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=f1e165] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=f1e167] [cursor=pointer]:
      - /url: "#chart-live-line"
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | import { CHART_ENTRIES } from "../../apps/playground/src/docs/components/chart-catalog";
  4   | 
  5   | const evidence = process.env.RAIN_CHART_PLAYGROUND_EVIDENCE_DIR ?? "evidence/runtime/bklit-rain-catalog/playground";
  6   | 
  7   | test("[T09] catalog navigation restores focus after the lazy chart page loads", async ({ page }) => {
  8   |   await page.goto("/#components");
  9   |   const group = page.getByRole("region", { name: "G4 · 图表与图表基础" });
  10  |   await expect(group.getByRole("link")).toHaveCount(17);
  11  |   await group.getByRole("link", { name: "面积图", exact: true }).click();
  12  |   const heading = page.getByRole("heading", { name: "面积图", level: 1 });
  13  |   await expect(heading).toBeFocused();
  14  |   await page.getByRole("link", { name: "返回组件目录" }).click();
  15  |   await expect(group).toBeVisible();
  16  | });
  17  | 
  18  | test("[T09] all 17 public documentation entries render, read and expose their actual source", async ({ page }) => {
  19  |   await page.emulateMedia({ reducedMotion: "reduce" });
  20  |   const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  21  |   await mkdir(evidence, { recursive: true });
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
> 77  |     await select.selectOption("monochrome-blue", { timeout: 5000 });
      |                  ^ TimeoutError: locator.selectOption: Timeout 5000ms exceeded.
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
```