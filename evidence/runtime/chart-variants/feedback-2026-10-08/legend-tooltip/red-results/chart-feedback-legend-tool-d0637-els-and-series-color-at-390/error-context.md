# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-legend-tooltip.spec.ts >> ring progress keeps labels and series color at 390
- Location: tests/e2e/chart-feedback-legend-tooltip.spec.ts:32:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 4
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "多目标进度环" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 每一环展示一个独立目标的达成进度。
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
        - generic [ref=e20]:
          - text: 系列数
          - combobox "系列数" [ref=e21]:
            - option "3" [selected]
            - option "5"
        - button "更新数据" [ref=e22] [cursor=pointer]
        - button "重播动效" [ref=e24] [cursor=pointer]
      - generic [ref=e26]:
        - generic [ref=e30]:
          - img [ref=e31]:
            - generic [ref=e32]:
              - generic [ref=e33] [cursor=pointer]
              - generic [ref=e35] [cursor=pointer]
          - generic: 各项目标独立
        - generic [ref=e37]:
          - button "课程完成" [ref=e39] [cursor=pointer]
          - button "作业完成" [ref=e43] [cursor=pointer]
          - button "复习目标" [ref=e47] [cursor=pointer]
        - status [ref=e50]: 每环使用自身目标值；悬停或聚焦图例读取进度。
        - group [ref=e51]:
          - generic "查看精确数据" [ref=e52] [cursor=pointer]
      - status [ref=e53]: 示例数据 · 已更新 0 次
  - generic [ref=e54]:
    - heading "数据与使用边界" [level=2] [ref=e55]
    - paragraph [ref=e56]: 每项value/maxValue，0≤value≤maxValue且maxValue>0。
    - paragraph [ref=e57]: 各项目标独立，不相加成总数；构成环饼属于饼图。
    - paragraph [ref=e58]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=e59]:
    - region [ref=e60]:
      - heading "API 与结构" [level=2] [ref=e61]
      - table [ref=e63]:
        - caption [ref=e64]: 多目标进度环 常用接口
        - rowgroup [ref=e65]:
          - row [ref=e66]:
            - columnheader "名称" [ref=e67]
            - columnheader "类型" [ref=e68]
            - columnheader "默认" [ref=e69]
            - columnheader "说明" [ref=e70]
        - rowgroup [ref=e71]:
          - row [ref=e72]:
            - rowheader [ref=e73]:
              - code [ref=e74]: data / value
            - cell [ref=e75]:
              - code [ref=e76]: 原生图型合同
            - cell "—" [ref=e77]
            - cell "每项value/maxValue，0≤value≤maxValue且maxValue>0。" [ref=e78]
          - row [ref=e79]:
            - rowheader [ref=e80]:
              - code [ref=e81]: children
            - cell [ref=e82]:
              - code [ref=e83]: Compound Parts
            - cell "—" [ref=e84]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e85]
          - row [ref=e86]:
            - rowheader [ref=e87]:
              - code [ref=e88]: className / style / margin
            - cell [ref=e89]:
              - code [ref=e90]: 原生尺寸接口
            - cell "—" [ref=e91]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e92]
          - row [ref=e93]:
            - rowheader [ref=e94]:
              - code [ref=e95]: enterTransition / animationDuration
            - cell [ref=e96]:
              - code [ref=e97]: 原生动效配置
            - cell "—" [ref=e98]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e99]
      - paragraph [ref=e100]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e101]:
      - heading "调用示例" [level=2] [ref=e102]
      - generic [ref=e103]:
        - generic [ref=e104]:
          - button "复制代码" [ref=e105] [cursor=pointer]
          - status
        - code [ref=e108]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-ring\" data-recipe=\"category-near\"> <ChartExample id=\"ring\" recipe=\"category-near\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e109]:
        - text: 当前源码：
        - code [ref=e110]: packages/ui/src/charts/vendor/charts/ring-chart.tsx
  - group [ref=e111]:
    - generic "调用配置、完整源码与示例数据" [ref=e112] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-variants/profit-loss.tsx"
    - option "chart-variants/shared.tsx"
    - option "chart-data.ts"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
  - region "全部图表变体" [ref=e113]:
    - navigation "变体分组" [ref=e114]:
      - button "基础结构" [ref=e115] [cursor=pointer]
      - button "图形材质" [ref=e117] [cursor=pointer]
      - button "交互与状态" [ref=e119] [cursor=pointer]
    - region [ref=e121]:
      - heading "基础结构" [level=2] [ref=e122]
      - generic [ref=e123]:
        - region [ref=e124]:
          - generic [ref=e125]:
            - heading "Ring Chart" [level=3] [ref=e126]
            - paragraph [ref=e127]: 多个独立目标的进度环与中心值
          - generic [ref=e128]:
            - generic [ref=e129]:
              - button "更新数据" [ref=e130] [cursor=pointer]
              - button "重播动效" [ref=e132] [cursor=pointer]
            - paragraph [ref=e135]: 滚动到此处查看示例
            - status [ref=e136]: 示例数据 · 已更新 0 次
            - group [ref=e137]:
              - generic "查看本卡代码" [ref=e138] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e139] [cursor=pointer]:
            - /url: https://bklit.com/charts/ring-chart
            - generic [ref=e140]: 对应官网示例
            - generic [ref=e141]: （新标签页打开）
        - region [ref=e142]:
          - generic [ref=e143]:
            - heading "Ring Chart - Three Quarter" [level=3] [ref=e144]
            - paragraph [ref=e145]: 270度进度弧
          - generic [ref=e146]:
            - generic [ref=e147]:
              - button "更新数据" [ref=e148] [cursor=pointer]
              - button "重播动效" [ref=e150] [cursor=pointer]
            - paragraph [ref=e153]: 滚动到此处查看示例
            - status [ref=e154]: 示例数据 · 已更新 0 次
            - group [ref=e155]:
              - generic "查看本卡代码" [ref=e156] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e157] [cursor=pointer]:
            - /url: https://bklit.com/charts/ring-chart
            - generic [ref=e158]: 对应官网示例
            - generic [ref=e159]: （新标签页打开）
        - region [ref=e160]:
          - generic [ref=e161]:
            - heading "Ring Chart - Half Circle" [level=3] [ref=e162]
            - paragraph [ref=e163]: 180度上半圆进度弧
          - generic [ref=e164]:
            - generic [ref=e165]:
              - button "更新数据" [ref=e166] [cursor=pointer]
              - button "重播动效" [ref=e168] [cursor=pointer]
            - paragraph [ref=e171]: 滚动到此处查看示例
            - status [ref=e172]: 示例数据 · 已更新 0 次
            - group [ref=e173]:
              - generic "查看本卡代码" [ref=e174] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e175] [cursor=pointer]:
            - /url: https://bklit.com/charts/ring-chart
            - generic [ref=e176]: 对应官网示例
            - generic [ref=e177]: （新标签页打开）
    - region [ref=e178]:
      - heading "图形材质" [level=2] [ref=e179]
      - generic [ref=e180]:
        - region [ref=e181]:
          - generic [ref=e182]:
            - heading "Ring Chart - Flat Caps" [level=3] [ref=e183]
            - paragraph [ref=e184]: 平直环端替代圆头
          - generic [ref=e185]:
            - generic [ref=e186]:
              - button "更新数据" [ref=e187] [cursor=pointer]
              - button "重播动效" [ref=e189] [cursor=pointer]
            - paragraph [ref=e192]: 滚动到此处查看示例
            - status [ref=e193]: 示例数据 · 已更新 0 次
            - group [ref=e194]:
              - generic "查看本卡代码" [ref=e195] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e196] [cursor=pointer]:
            - /url: https://bklit.com/charts/ring-chart
            - generic [ref=e197]: 对应官网示例
            - generic [ref=e198]: （新标签页打开）
        - region [ref=e199]:
          - generic [ref=e200]:
            - heading "Ring Chart - Thick Rings" [level=3] [ref=e201]
            - paragraph [ref=e202]: 加粗环并调整环间距
          - generic [ref=e203]:
            - generic [ref=e204]:
              - button "更新数据" [ref=e205] [cursor=pointer]
              - button "重播动效" [ref=e207] [cursor=pointer]
            - generic [ref=e209]:
              - generic [ref=e213]:
                - img [ref=e214]:
                  - generic [ref=e216] [cursor=pointer]
                - generic: 各项目标独立
              - status [ref=e218]: 每环使用自己的目标分母；各项目标独立，不合计为总进度。
              - group [ref=e219]:
                - generic "查看精确数据" [ref=e220] [cursor=pointer]
            - status [ref=e221]: 示例数据 · 已更新 0 次
            - group [ref=e222]:
              - generic "查看本卡代码" [ref=e223] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e224] [cursor=pointer]:
            - /url: https://bklit.com/charts/ring-chart
            - generic [ref=e225]: 对应官网示例
            - generic [ref=e226]: （新标签页打开）
    - region [ref=e227]:
      - heading "交互与状态" [level=2] [ref=e228]
      - region [ref=e230]:
        - generic [ref=e231]:
          - heading "Ring Chart - Legend" [level=3] [ref=e232]
          - paragraph [ref=e233]: 带进度条的交互图例
        - generic [ref=e234]:
          - generic [ref=e235]:
            - button "更新数据" [ref=e236] [cursor=pointer]
            - button "重播动效" [ref=e238] [cursor=pointer]
          - generic [ref=e240]:
            - generic [ref=e244]:
              - img [ref=e245]:
                - generic [ref=e247] [cursor=pointer]
              - generic: 各项目标独立
            - generic "独立目标进度图例" [ref=e249]:
              - button "阅读进度 28/40 · 70.0% 28" [ref=e250] [cursor=pointer]:
                - generic [ref=e252]: 阅读进度
                - generic [ref=e253]: 28/40 · 70.0%
                - progressbar "阅读进度进度" [ref=e254]
              - button "练习进度 8/12 · 66.7% 8" [ref=e255] [cursor=pointer]:
                - generic [ref=e257]: 练习进度
                - generic [ref=e258]: 8/12 · 66.7%
                - progressbar "练习进度进度" [ref=e259]
              - button "复习进度 5/10 · 50.0% 5" [ref=e260] [cursor=pointer]:
                - generic [ref=e262]: 复习进度
                - generic [ref=e263]: 5/10 · 50.0%
                - progressbar "复习进度进度" [ref=e264]
            - status [ref=e265]: 每环使用自己的目标分母；各项目标独立，不合计为总进度。
            - group [ref=e266]:
              - generic "查看精确数据" [ref=e267] [cursor=pointer]
          - status [ref=e268]: 示例数据 · 已更新 0 次
          - group [ref=e269]:
            - generic "查看本卡代码" [ref=e270] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/radial.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e271] [cursor=pointer]:
          - /url: https://bklit.com/charts/ring-chart
          - generic [ref=e272]: 对应官网示例
          - generic [ref=e273]: （新标签页打开）
  - navigation "相关图型" [ref=e274]:
    - link "面积图" [ref=e275] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e277] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e279] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e281] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e283] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e285] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e287] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e289] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e291] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e293] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e295] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e297] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e299] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e301] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e303] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e305] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e307] [cursor=pointer]:
      - /url: "#chart-live-line"
```

# Test source

```ts
  1  | import { expect, test, type Locator } from "@playwright/test";
  2  | 
  3  | async function singleLineText(locator: Locator) {
  4  |   return locator.evaluate(node => {
  5  |     const range = document.createRange();
  6  |     range.selectNodeContents(node);
  7  |     return { lines: new Set([...range.getClientRects()].map(rect => Math.round(rect.top))).size,
  8  |       width: node.getBoundingClientRect().width, font: parseFloat(getComputedStyle(node).fontSize) };
  9  |   });
  10 | }
  11 | 
  12 | for (const width of [1280, 1311, 390]) {
  13 |   test(`chart labels stay horizontal at ${width}`, async ({ page }) => {
  14 |     await page.setViewportSize({ width, height: 796 });
  15 |     for (const entry of ["bar", "radar", "ring"]) {
  16 |       await page.goto(`/#chart-${entry}`);
  17 |       const example = page.locator(".component-doc__example").first();
  18 |       await example.scrollIntoViewIfNeeded();
  19 |       const keys = example.locator(".rain-chart-legend-button");
  20 |       await expect(keys.first()).toBeVisible();
  21 |       for (const key of await keys.all()) {
  22 |         const label = key.locator("span").filter({ hasText: /\S/ }).first();
  23 |         const reading = await singleLineText(label);
  24 |         expect(reading.lines, `${entry}: ${await label.textContent()}`).toBe(1);
  25 |         expect(reading.width).toBeGreaterThan(reading.font * 2);
  26 |       }
  27 |       await example.screenshot({ path: test.info().outputPath(`${entry}-${width}.png`) });
  28 |     }
  29 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  30 |   });
  31 | 
  32 |   test(`ring progress keeps labels and series color at ${width}`, async ({ page }) => {
  33 |     await page.setViewportSize({ width, height: 796 });
  34 |     await page.goto("/#chart-ring");
  35 |     const card = page.locator('[data-chart-variant="ring-legend"]');
  36 |     await card.scrollIntoViewIfNeeded();
  37 |     for (const [label, value, max] of [["阅读进度", 28, 40], ["练习进度", 8, 12], ["复习进度", 5, 10]] as const) {
  38 |       const button = card.getByRole("button").filter({ hasText: label });
  39 |       await expect(button).toBeVisible();
> 40 |       expect((await singleLineText(button.getByText(label, { exact: true }))).lines).toBe(1);
     |                                                                                      ^ Error: expect(received).toBe(expected) // Object.is equality
  41 |       const progress = card.getByRole("progressbar", { name: `${label}进度`, exact: true });
  42 |       await expect(progress).toHaveAttribute("aria-valuenow", String(value));
  43 |       await expect(progress).toHaveAttribute("aria-valuemax", String(max));
  44 |       const geometry = await progress.evaluate(node => {
  45 |         const track = [...node.querySelectorAll<HTMLElement>("div")].find(child => child.getBoundingClientRect().height > 0 && getComputedStyle(child).overflow === "hidden")!;
  46 |         const fill = track?.firstElementChild as HTMLElement | null;
  47 |         return { height: track?.getBoundingClientRect().height, rounded: track ? parseFloat(getComputedStyle(track).borderRadius) : 0,
  48 |           track: track ? getComputedStyle(track).backgroundColor : "", fill: fill ? getComputedStyle(fill).backgroundColor : "" };
  49 |       });
  50 |       expect(geometry.height).toBeLessThanOrEqual(8);
  51 |       expect(geometry.rounded).toBeGreaterThanOrEqual(3);
  52 |       expect(geometry.fill).not.toBe("rgb(0, 128, 0)");
  53 |       expect(geometry.fill).not.toBe(geometry.track);
  54 |       await button.focus();
  55 |     }
  56 |     await expect(card.locator("progress")).toHaveCount(0);
  57 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  58 |     await card.screenshot({ path: test.info().outputPath(`ring-progress-${width}.png`) });
  59 |   });
  60 | 
  61 |   test(`map hover tooltip has compact padded content within the plot at ${width}`, async ({ page }) => {
  62 |     await page.setViewportSize({ width, height: 796 });
  63 |     await page.goto("/#chart-choropleth");
  64 |     const card = page.locator('[data-chart-variant="choropleth-default"]');
  65 |     await card.scrollIntoViewIfNeeded();
  66 |     await card.locator("path.cursor-pointer").nth(3).hover({ force: true });
  67 |     const tooltip = card.locator(".rain-chart-tooltip");
  68 |     await expect(tooltip).toContainText("Canada");
  69 |     await expect(tooltip).toContainText("44");
  70 |     await page.waitForTimeout(250);
  71 |     const title = tooltip.getByText("Canada", { exact: true });
  72 |     const metrics = await title.evaluate(node => {
  73 |       const panel = node.closest(".rain-chart-tooltip")!;
  74 |       const text = node.getBoundingClientRect(), box = panel.getBoundingClientRect();
  75 |       return { font: parseFloat(getComputedStyle(node).fontSize), insetLeft: text.left - box.left, insetTop: text.top - box.top };
  76 |     });
  77 |     expect(metrics.font).toBeLessThanOrEqual(14);
  78 |     expect(metrics.insetLeft).toBeGreaterThanOrEqual(8);
  79 |     expect(metrics.insetTop).toBeGreaterThanOrEqual(8);
  80 |     const box = await tooltip.boundingBox(), plot = await card.locator(".rain-chart-plot").boundingBox();
  81 |     expect(box!.x).toBeGreaterThanOrEqual(plot!.x - 1);
  82 |     expect(box!.x + box!.width).toBeLessThanOrEqual(plot!.x + plot!.width + 1);
  83 |     await card.screenshot({ path: test.info().outputPath(`map-tooltip-${width}.png`) });
  84 |   });
  85 | }
  86 | 
```