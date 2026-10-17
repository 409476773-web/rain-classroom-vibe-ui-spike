# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-refinement.spec.ts >> playground 1197px >> playground every heatmap legend has room below its calendar at 1197
- Location: tests/e2e/chart-feedback-refinement.spec.ts:64:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('main [data-rain-id="chart-heatmap"]').first().getByText('少', { exact: true }).locator('..')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('main [data-rain-id="chart-heatmap"]').first().getByText('少', { exact: true }).locator('..')
    10 × locator resolved to <div class="flex w-full items-center gap-1.5 text-chart-label text-xs justify-end">…</div>
       - unexpected value "hidden"

```

```yaml
- main:
  - link "返回组件目录":
    - /url: "#components"
  - heading "日历热图" [level=1]
  - text: G4 · 共享候选 · 未发布 · 视觉待复核
  - paragraph: 每一天的学习强度、顺序色阶与单元格聚焦。
  - heading "图型与可选配方" [level=2]
  - paragraph: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
  - text: 视觉配方
  - combobox "视觉配方":
    - option "连续强度色阶" [selected]
    - option "蓝灰单色"
  - text: 示例状态
  - combobox "示例状态":
    - option "正常" [selected]
    - option "无数据"
    - option "零值"
    - option "单项／单点"
    - option "长标签"
    - option "缺测"
    - option "无效数据"
  - button "更新数据"
  - button "重播动效"
  - text: Jun Jul Aug Sep Oct M W F
  - group: 查看精确数据
  - status: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - heading "数据与使用边界" [level=2]
  - paragraph: 每列一个周日开始的星期，7个日期；0为有效读数，-1为缺测。
  - paragraph: 原生是日历，不是任意分类矩阵。
  - paragraph: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - region "API 与结构":
    - heading "API 与结构" [level=2]
    - table "日历热图 常用接口":
      - caption: 日历热图 常用接口
      - rowgroup:
        - row "名称 类型 默认 说明":
          - columnheader "名称"
          - columnheader "类型"
          - columnheader "默认"
          - columnheader "说明"
      - rowgroup:
        - row "data / value 原生图型合同 — 每列一个周日开始的星期，7个日期；0为有效读数，-1为缺测。":
          - rowheader "data / value":
            - code: data / value
          - cell "原生图型合同":
            - code: 原生图型合同
          - cell "—"
          - cell "每列一个周日开始的星期，7个日期；0为有效读数，-1为缺测。"
        - row "children Compound Parts — 通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。":
          - rowheader "children":
            - code: children
          - cell "Compound Parts":
            - code: Compound Parts
          - cell "—"
          - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。"
        - row "className / style / margin 原生尺寸接口 — 宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。":
          - rowheader "className / style / margin":
            - code: className / style / margin
          - cell "原生尺寸接口":
            - code: 原生尺寸接口
          - cell "—"
          - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。"
        - row "enterTransition / animationDuration 原生动效配置 — 默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。":
          - rowheader "enterTransition / animationDuration":
            - code: enterTransition / animationDuration
          - cell "原生动效配置":
            - code: 原生动效配置
          - cell "—"
          - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。"
    - paragraph: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
  - region "调用示例":
    - heading "调用示例" [level=2]
    - button "复制代码"
    - status
    - code: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-heatmap\" data-recipe=\"intensity\"> <ChartExample id=\"heatmap\" recipe=\"intensity\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
    - paragraph:
      - text: 当前源码：
      - code: packages/ui/src/charts/vendor/charts/heatmap/heatmap-chart.tsx
  - group: 调用配置、完整源码与示例数据
  - region "全部图表变体":
    - navigation "变体分组":
      - button "基础结构"
      - button "图形材质"
      - button "坐标与辅助读数"
      - button "交互与状态"
    - region "基础结构":
      - heading "基础结构" [level=2]
      - region "Heatmap Chart":
        - heading "Heatmap Chart" [level=3]
        - paragraph: 半年贡献日历格、坐标与提示
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
      - region "Heatmap Chart - Monday Start":
        - heading "Heatmap Chart - Monday Start" [level=3]
        - paragraph: 周一起始并弱化周末行
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
    - region "图形材质":
      - heading "图形材质" [level=2]
      - region "Heatmap Chart - Pattern Levels":
        - heading "Heatmap Chart - Pattern Levels" [level=3]
        - paragraph: 色阶图案同步用于格子与图例
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
    - region "坐标与辅助读数":
      - heading "坐标与辅助读数" [level=2]
      - region "Heatmap Chart - Solid Separators":
        - heading "Heatmap Chart - Solid Separators" [level=3]
        - paragraph: 纯色实线季度分隔
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
      - region "Heatmap Chart - Compact Y Axis & Quarter Separators":
        - heading "Heatmap Chart - Compact Y Axis & Quarter Separators" [level=3]
        - paragraph: 紧凑星期标签与渐隐季度线
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
      - region "Heatmap Chart - Dashed Separators":
        - heading "Heatmap Chart - Dashed Separators" [level=3]
        - paragraph: 隐藏纵轴并显示渐隐虚线季度分隔
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
      - region "Heatmap Chart - Gradient Legend":
        - heading "Heatmap Chart - Gradient Legend" [level=3]
        - paragraph: 连续渐变图例与定制两端文案
        - button "更新数据"
        - button "重播动效"
        - paragraph: 本卡使用独立示例配色，保留材质或色阶差异。
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
    - region "交互与状态":
      - heading "交互与状态" [level=2]
      - region "Heatmap Chart - Contributions":
        - heading "Heatmap Chart - Contributions" [level=3]
        - paragraph: 圆形日历格、季度线与图例联动
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
      - region "Heatmap Chart - Loading":
        - heading "Heatmap Chart - Loading" [level=3]
        - paragraph: 单元格扫光骨架加载
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
      - region "Heatmap Chart - Horizontal Scroll":
        - heading "Heatmap Chart - Horizontal Scroll" [level=3]
        - paragraph: 半年窗口内横向浏览全年
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
      - region "Heatmap Chart - Active Scale Hover":
        - heading "Heatmap Chart - Active Scale Hover" [level=3]
        - paragraph: 增大悬浮单元格与格间距
        - button "更新数据"
        - button "重播动效"
        - paragraph: 滚动到此处查看示例
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
  - navigation "相关图型":
    - link "面积图":
      - /url: "#chart-area"
    - link "折线图":
      - /url: "#chart-line"
    - link "柱状图":
      - /url: "#chart-bar"
    - link "组合图":
      - /url: "#chart-composed"
    - link "饼图 / 环饼":
      - /url: "#chart-pie"
    - link "多目标进度环":
      - /url: "#chart-ring"
    - link "雷达图":
      - /url: "#chart-radar"
    - link "时间散点":
      - /url: "#chart-scatter"
    - link "漏斗图":
      - /url: "#chart-funnel"
    - link "仪表图":
      - /url: "#chart-gauge"
    - link "桑基图":
      - /url: "#chart-sankey"
    - link "旭日图":
      - /url: "#chart-sunburst"
    - link "日历热图":
      - /url: "#chart-heatmap"
    - link "分区地图":
      - /url: "#chart-choropleth"
    - link "K线图":
      - /url: "#chart-candlestick"
    - link "盈亏线":
      - /url: "#chart-profit-loss"
    - link "实时折线":
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
> 78 |     await expect(legend).toBeVisible();
     |                          ^ Error: expect(locator).toBeVisible() failed
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