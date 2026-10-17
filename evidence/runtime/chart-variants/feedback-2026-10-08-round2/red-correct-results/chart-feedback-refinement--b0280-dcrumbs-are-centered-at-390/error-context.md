# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-refinement.spec.ts >> playground 390px >> playground all sunburst titles and drilled Breadcrumbs are centered at 390
- Location: tests/e2e/chart-feedback-refinement.spec.ts:83:3

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 2
Received:   148
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "旭日图" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 课程内容层级、扇区聚焦与逐层下钻。
  - generic [ref=e11]:
    - heading "图型与可选配方" [level=2] [ref=e12]
    - paragraph [ref=e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e17]:
            - option "蓝紫近邻" [selected]
            - option "多色类别"
            - option "协调实色"
            - option "蓝灰单色"
        - generic [ref=e18]:
          - text: 示例状态
          - combobox "示例状态" [ref=e19]:
            - option "正常" [selected]
            - option "无数据"
            - option "零值"
            - option "单项／单点"
            - option "长标签"
            - option "缺测"
            - option "无效数据"
        - button "更新数据" [ref=e20] [cursor=pointer]
        - button "重播动效" [ref=e22] [cursor=pointer]
      - generic [ref=e24]:
        - generic [ref=e26]:
          - heading "学习内容" [level=3] [ref=e28]
          - img "Sunburst chart of 学习内容" [ref=e30]:
            - generic [ref=e49] [cursor=pointer]
            - generic [ref=e51] [cursor=pointer]
            - generic [ref=e53] [cursor=pointer]
            - generic [ref=e55]:
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
          - generic [ref=e56]: 悬停读取，点击扇区下钻；面包屑返回上层。
        - group [ref=e57]:
          - generic "查看精确数据" [ref=e58] [cursor=pointer]
      - status [ref=e59]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - generic [ref=e60]:
    - heading "数据与使用边界" [level=2] [ref=e61]
    - paragraph [ref=e62]: 父项由叶项求和，父项不重复提供value。
    - paragraph [ref=e63]: 小扇区和深层数据通过提示及精确表补充读取。
    - paragraph [ref=e64]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=e65]:
    - region [ref=e66]:
      - heading "API 与结构" [level=2] [ref=e67]
      - table [ref=e69]:
        - caption [ref=e70]: 旭日图 常用接口
        - rowgroup [ref=e71]:
          - row [ref=e72]:
            - columnheader "名称" [ref=e73]
            - columnheader "类型" [ref=e74]
            - columnheader "默认" [ref=e75]
            - columnheader "说明" [ref=e76]
        - rowgroup [ref=e77]:
          - row [ref=e78]:
            - rowheader [ref=e79]:
              - code [ref=e80]: data / value
            - cell [ref=e81]:
              - code [ref=e82]: 原生图型合同
            - cell "—" [ref=e83]
            - cell "父项由叶项求和，父项不重复提供value。" [ref=e84]
          - row [ref=e85]:
            - rowheader [ref=e86]:
              - code [ref=e87]: children
            - cell [ref=e88]:
              - code [ref=e89]: Compound Parts
            - cell "—" [ref=e90]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e91]
          - row [ref=e92]:
            - rowheader [ref=e93]:
              - code [ref=e94]: className / style / margin
            - cell [ref=e95]:
              - code [ref=e96]: 原生尺寸接口
            - cell "—" [ref=e97]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e98]
          - row [ref=e99]:
            - rowheader [ref=e100]:
              - code [ref=e101]: enterTransition / animationDuration
            - cell [ref=e102]:
              - code [ref=e103]: 原生动效配置
            - cell "—" [ref=e104]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e105]
      - paragraph [ref=e106]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e107]:
      - heading "调用示例" [level=2] [ref=e108]
      - generic [ref=e109]:
        - generic [ref=e110]:
          - button "复制代码" [ref=e111] [cursor=pointer]
          - status
        - code [ref=e114]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-sunburst\" data-recipe=\"category-near\"> <ChartExample id=\"sunburst\" recipe=\"category-near\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e115]:
        - text: 当前源码：
        - code [ref=e116]: packages/ui/src/charts/vendor/charts/sunburst-chart.tsx
  - group [ref=e117]:
    - generic "调用配置、完整源码与示例数据" [ref=e118] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-variants/profit-loss.tsx"
    - option "chart-variants/shared.tsx"
    - option "chart-data.ts"
    - option "chart-variants/data/README.md"
    - option "chart-variants/data/world.geojson"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
  - region "全部图表变体" [ref=e119]:
    - navigation "变体分组" [ref=e120]:
      - button "图形材质" [ref=e121] [cursor=pointer]
      - button "交互与状态" [ref=e123] [cursor=pointer]
    - region [ref=e125]:
      - heading "图形材质" [level=2] [ref=e126]
      - region [ref=e128]:
        - generic [ref=e129]:
          - heading "Sunburst Chart - Patterns" [level=3] [ref=e130]
          - paragraph [ref=e131]: 指定内环扇区使用斜线图案
        - generic [ref=e132]:
          - generic [ref=e133]:
            - button "更新数据" [ref=e134] [cursor=pointer]
            - button "重播动效" [ref=e136] [cursor=pointer]
          - paragraph [ref=e139]: 滚动到此处查看示例
          - status [ref=e140]: 示例数据 · 已更新 0 次 · 已减少动效
          - group [ref=e141]:
            - generic "查看本卡代码" [ref=e142] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/structure.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e143] [cursor=pointer]:
          - /url: https://bklit.com/charts/sunburst-chart
          - generic [ref=e144]: 对应官网示例
          - generic [ref=e145]: （新标签页打开）
    - region [ref=e146]:
      - heading "交互与状态" [level=2] [ref=e147]
      - generic [ref=e148]:
        - region [ref=e149]:
          - generic [ref=e150]:
            - heading "Sunburst Chart - Interactive" [level=3] [ref=e151]
            - paragraph [ref=e152]: 层级构成、下钻与返回
          - generic [ref=e153]:
            - generic [ref=e154]:
              - button "更新数据" [ref=e155] [cursor=pointer]
              - button "重播动效" [ref=e157] [cursor=pointer]
            - paragraph [ref=e160]: 滚动到此处查看示例
            - status [ref=e161]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e162]:
              - generic "查看本卡代码" [ref=e163] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/structure.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e164] [cursor=pointer]:
            - /url: https://bklit.com/charts/sunburst-chart
            - generic [ref=e165]: 对应官网示例
            - generic [ref=e166]: （新标签页打开）
        - region [ref=e167]:
          - generic [ref=e168]:
            - heading "Sunburst Chart - Legend" [level=3] [ref=e169]
            - paragraph [ref=e170]: 图例随当前层级及悬浮同步
          - generic [ref=e171]:
            - generic [ref=e172]:
              - button "更新数据" [ref=e173] [cursor=pointer]
              - button "重播动效" [ref=e175] [cursor=pointer]
            - paragraph [ref=e178]: 滚动到此处查看示例
            - status [ref=e179]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e180]:
              - generic "查看本卡代码" [ref=e181] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/structure.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e182] [cursor=pointer]:
            - /url: https://bklit.com/charts/sunburst-chart
            - generic [ref=e183]: 对应官网示例
            - generic [ref=e184]: （新标签页打开）
  - navigation "相关图型" [ref=e185]:
    - link "面积图" [ref=e186] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e188] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e190] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e192] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e194] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e196] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e198] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e200] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e202] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e204] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e206] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e208] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e210] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e212] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e214] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e216] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e218] [cursor=pointer]:
      - /url: "#chart-live-line"
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
> 10 |   expect(Math.abs(x - await centerX(card.locator('[data-rain-id="ui-chart-sunburst"] svg').first()))).toBeLessThan(2);
     |                                                                                                       ^ Error: expect(received).toBeLessThan(expected)
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
  40 |       await expect(reading).toHaveText("70.0%阅读进度");
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