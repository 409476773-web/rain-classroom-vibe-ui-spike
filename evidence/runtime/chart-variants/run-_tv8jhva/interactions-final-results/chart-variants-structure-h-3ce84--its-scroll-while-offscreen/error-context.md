# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-variants-structure.spec.ts >> horizontal calendar reads a zero after scrolling and retains its scroll while offscreen
- Location: tests/e2e/chart-variants-structure.spec.ts:19:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('[data-chart-variant="heatmap-horizontal-scroll"]').locator('.rain-chart-tooltip')
Expected substring: "September 26th 2026"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('[data-chart-variant="heatmap-horizontal-scroll"]').locator('.rain-chart-tooltip')

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
        - text: Q4 Q1 Q2 Q3 Oct Nov Dec Jan Feb Mar Apr May Jun Jul Aug Sep S M T W T F S 少 多
        - paragraph: 2025年10月1日—2026年9月26日，截至完整周。0 是有效读数，缺测不计为 0。
        - group: 查看精确数据
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
      - region "Heatmap Chart - Loading":
        - heading "Heatmap Chart - Loading" [level=3]
        - paragraph: 单元格扫光骨架加载
        - button "更新数据"
        - button "重播动效"
        - button "显示数据"
        - status: 正在加载活动日历
        - text: Apr May Jun Jul Aug Sep M W F 少 多
        - paragraph: 2026年4月1日—2026年9月26日，截至完整周。0 是有效读数，缺测不计为 0。
        - group: 查看精确数据
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
      - region "Heatmap Chart - Horizontal Scroll":
        - heading "Heatmap Chart - Horizontal Scroll" [level=3]
        - paragraph: 半年窗口内横向浏览全年
        - button "更新数据"
        - button "重播动效"
        - region "全年活动日历，可横向滚动": Oct Nov Dec Jan Feb Mar Apr May Jun Jul Aug Sep Mon Wed Fri September 26th 2026 Saturday 活跃等级 0 / 4
        - text: 少 多
        - paragraph: 2025年10月1日—2026年9月26日，截至完整周。全年窗口 · 固定格宽，可横向滚动。
        - group: 查看精确数据
        - status: 示例数据 · 已更新 0 次 · 已减少动效
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/heatmap-chart
      - region "Heatmap Chart - Active Scale Hover":
        - heading "Heatmap Chart - Active Scale Hover" [level=3]
        - paragraph: 增大悬浮单元格与格间距
        - button "更新数据"
        - button "重播动效"
        - text: Apr May Jun Jul Aug Sep M W F 少 多
        - paragraph: 2026年4月1日—2026年9月26日，截至完整周。0 是有效读数，缺测不计为 0。
        - group: 查看精确数据
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
  1   | import { expect, test } from "@playwright/test";
  2   | 
  3   | test.use({ timezoneId: "Asia/Shanghai" });
  4   | 
  5   | test("calendar precision uses the same local dates and weekdays as the actual cells", async ({ page }) => {
  6   |   await page.emulateMedia({ reducedMotion: "reduce" });
  7   |   await page.goto("/#chart-heatmap");
  8   |   const card = page.locator('[data-chart-variant="heatmap-default"]');
  9   |   await card.scrollIntoViewIfNeeded();
  10  |   await card.getByText("查看精确数据", { exact: true }).click();
  11  |   const first = card.locator("tbody tr").first();
  12  |   const last = card.locator("tbody tr").last();
  13  |   await expect(first.locator("th")).toHaveText("2026-04-01");
  14  |   await expect(first).toContainText("周三");
  15  |   await expect(last.locator("th")).toHaveText("2026-09-26");
  16  |   await expect(last).toContainText("周六");
  17  | });
  18  | 
  19  | test("horizontal calendar reads a zero after scrolling and retains its scroll while offscreen", async ({ page }) => {
  20  |   await page.emulateMedia({ reducedMotion: "reduce" });
  21  |   await page.goto("/#chart-heatmap");
  22  |   const card = page.locator('[data-chart-variant="heatmap-horizontal-scroll"]');
  23  |   await card.scrollIntoViewIfNeeded();
  24  |   const viewport = card.getByRole("region", { name: "全年活动日历，可横向滚动" });
  25  |   await expect(viewport.locator("svg")).toBeVisible();
  26  |   await viewport.evaluate(node => { node.scrollLeft = node.scrollWidth - node.clientWidth; });
  27  |   const scroll = await viewport.evaluate(node => node.scrollLeft);
  28  |   expect(scroll).toBeGreaterThan(0);
  29  |   const lastCell = viewport.locator('rect.visx-heatmap-rect:not([pointer-events="none"])').last();
  30  |   await lastCell.hover();
  31  |   const tooltip = card.locator(".rain-chart-tooltip");
> 32  |   await expect(tooltip).toContainText("September 26th 2026");
      |                         ^ Error: expect(locator).toContainText(expected) failed
  33  |   await expect(tooltip).toContainText("活跃等级 0 / 4");
  34  |   const bounds = await viewport.boundingBox();
  35  |   const reading = await tooltip.boundingBox();
  36  |   expect(reading!.x).toBeGreaterThanOrEqual(bounds!.x - 1);
  37  |   expect(reading!.x + reading!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width + 1);
  38  |   await card.screenshot({ path: test.info().outputPath("heatmap-scroll-zero-tooltip.png") });
  39  |   await page.locator("h1").scrollIntoViewIfNeeded();
  40  |   await expect(card).toHaveAttribute("data-active", "false");
  41  |   await card.scrollIntoViewIfNeeded();
  42  |   await expect(card).toHaveAttribute("data-active", "true");
  43  |   expect(await viewport.evaluate(node => node.scrollLeft)).toBeCloseTo(scroll, 0);
  44  | });
  45  | 
  46  | test("world-map zoom and reset preserve the native transform across an offscreen visit", async ({ page }) => {
  47  |   await page.emulateMedia({ reducedMotion: "reduce" });
  48  |   await page.goto("/#chart-choropleth");
  49  |   const card = page.locator('[data-chart-variant="choropleth-interactive"]');
  50  |   await card.scrollIntoViewIfNeeded();
  51  |   const map = card.locator('svg > g[transform^="matrix"]').first();
  52  |   await expect(map).toBeVisible();
  53  |   const initial = await map.getAttribute("transform");
  54  |   await card.getByRole("button", { name: "放大地图", exact: true }).click();
  55  |   await expect.poll(() => map.getAttribute("transform")).not.toBe(initial);
  56  |   const zoomed = await map.getAttribute("transform");
  57  |   await page.locator("h1").scrollIntoViewIfNeeded();
  58  |   await expect(card).toHaveAttribute("data-active", "false");
  59  |   await card.scrollIntoViewIfNeeded();
  60  |   await expect(map).toHaveAttribute("transform", zoomed!);
  61  |   await card.getByRole("button", { name: "重置地图", exact: true }).click();
  62  |   await expect(map).toHaveAttribute("transform", initial!);
  63  |   await page.setViewportSize({ width: 390, height: 1000 });
  64  |   await card.scrollIntoViewIfNeeded();
  65  |   await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  66  |   await card.screenshot({ path: test.info().outputPath("choropleth-zoom-reset-390.png") });
  67  | });
  68  | 
  69  | test("sunburst current-level legend and drill path persist, then return to the root", async ({ page }) => {
  70  |   await page.emulateMedia({ reducedMotion: "reduce" });
  71  |   await page.goto("/#chart-sunburst");
  72  |   const card = page.locator('[data-chart-variant="sunburst-legend"]');
  73  |   await card.scrollIntoViewIfNeeded();
  74  |   const legend = card.getByRole("group", { name: "当前层级图例" });
  75  |   await legend.getByRole("button", { name: /基础课程/ }).click();
  76  |   await expect(legend.getByRole("button", { name: /视频/ })).toBeVisible();
  77  |   await expect(legend.getByRole("button", { name: /进阶课程/ })).toHaveCount(0);
  78  |   await page.locator("h1").scrollIntoViewIfNeeded();
  79  |   await expect(card).toHaveAttribute("data-active", "false");
  80  |   await card.scrollIntoViewIfNeeded();
  81  |   await expect(legend.getByRole("button", { name: /视频/ })).toBeVisible();
  82  |   await card.getByRole("button", { name: "返回学习内容", exact: true }).click();
  83  |   await expect(legend.getByRole("button", { name: /进阶课程/ })).toBeVisible();
  84  | });
  85  | 
  86  | test("loading stops its animated label offscreen and in reduced motion while preserving the ready choice", async ({ page }) => {
  87  |   await page.emulateMedia({ reducedMotion: "no-preference" });
  88  |   await page.goto("/#chart-heatmap");
  89  |   const card = page.locator('[data-chart-variant="heatmap-loading"]');
  90  |   await card.scrollIntoViewIfNeeded();
  91  |   await expect(card.getByRole("button", { name: "显示数据", exact: true })).toBeVisible();
  92  |   await expect(card.locator('[role="status"] span[aria-hidden]')).not.toHaveCount(0);
  93  |   await page.locator("h1").scrollIntoViewIfNeeded();
  94  |   await expect(card).toHaveAttribute("data-active", "false");
  95  |   await expect(card.locator('[role="status"] span[aria-hidden]')).toHaveCount(0);
  96  |   await expect(card.getByRole("status").filter({ hasText: "静态占位" })).toBeVisible();
  97  |   await card.scrollIntoViewIfNeeded();
  98  |   await page.emulateMedia({ reducedMotion: "reduce" });
  99  |   await expect(card.locator('[role="status"] span[aria-hidden]')).toHaveCount(0);
  100 |   await card.getByRole("button", { name: "显示数据", exact: true }).click();
  101 |   await expect(card.getByRole("button", { name: "开始加载", exact: true })).toBeVisible();
  102 |   await page.locator("h1").scrollIntoViewIfNeeded();
  103 |   await card.scrollIntoViewIfNeeded();
  104 |   await expect(card.getByRole("button", { name: "开始加载", exact: true })).toBeVisible();
  105 | });
  106 | 
```