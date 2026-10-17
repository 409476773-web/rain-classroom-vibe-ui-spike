# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-radar.spec.ts >> radar legend focus and pointer inspect the matching series without affecting another instance
- Location: tests/e2e/chart-feedback-radar.spec.ts:55:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

  Array [
    Object {
      "fill": 0.15,
      "opacity": 1,
-     "stroke": 2,
+     "stroke": NaN,
    },
    Object {
      "fill": 0.15,
      "opacity": 1,
-     "stroke": 2,
+     "stroke": NaN,
    },
  ]
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "雷达图" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 同尺度维度的多系列能力比较。
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
        - img [ref=e30]:
          - generic [ref=e31]:
            - generic [ref=e32]:
              - generic [ref=e43]: "20"
              - generic [ref=e45]: "40"
              - generic [ref=e47]: "60"
              - generic [ref=e49]: "80"
              - generic [ref=e51]: "100"
            - generic [ref=e58] [cursor=pointer]
            - generic [ref=e64] [cursor=pointer]
            - generic [ref=e70] [cursor=pointer]
            - generic [ref=e76]:
              - generic [ref=e77]: 知识掌握
              - generic [ref=e79]: 到课情况
              - generic [ref=e81]: 练习表现
              - generic [ref=e83]: 学习参与
              - generic [ref=e85]: 复习完成
        - generic [ref=e87]:
          - button "课程一" [ref=e89] [cursor=pointer]
          - button "课程二" [ref=e93] [cursor=pointer]
          - button "课程三" [ref=e97] [cursor=pointer]
        - group [ref=e100]:
          - generic "查看精确数据" [ref=e101] [cursor=pointer]
      - status [ref=e102]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - generic [ref=e103]:
    - heading "数据与使用边界" [level=2] [ref=e104]
    - paragraph [ref=e105]: 指标顺序固定，原生数据归一到0—100。
    - paragraph [ref=e106]: 不同量纲必须先说明归一方式；本例为示例分数。
    - paragraph [ref=e107]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e108] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - generic [ref=e110]:
    - region [ref=e111]:
      - heading "API 与结构" [level=2] [ref=e112]
      - table [ref=e114]:
        - caption [ref=e115]: 雷达图 常用接口
        - rowgroup [ref=e116]:
          - row [ref=e117]:
            - columnheader "名称" [ref=e118]
            - columnheader "类型" [ref=e119]
            - columnheader "默认" [ref=e120]
            - columnheader "说明" [ref=e121]
        - rowgroup [ref=e122]:
          - row [ref=e123]:
            - rowheader [ref=e124]:
              - code [ref=e125]: data / value
            - cell [ref=e126]:
              - code [ref=e127]: 原生图型合同
            - cell "—" [ref=e128]
            - cell "指标顺序固定，原生数据归一到0—100。" [ref=e129]
          - row [ref=e130]:
            - rowheader [ref=e131]:
              - code [ref=e132]: children
            - cell [ref=e133]:
              - code [ref=e134]: Compound Parts
            - cell "—" [ref=e135]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e136]
          - row [ref=e137]:
            - rowheader [ref=e138]:
              - code [ref=e139]: className / style / margin
            - cell [ref=e140]:
              - code [ref=e141]: 原生尺寸接口
            - cell "—" [ref=e142]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e143]
          - row [ref=e144]:
            - rowheader [ref=e145]:
              - code [ref=e146]: enterTransition / animationDuration
            - cell [ref=e147]:
              - code [ref=e148]: 原生动效配置
            - cell "—" [ref=e149]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e150]
      - paragraph [ref=e151]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e152]:
      - heading "调用示例" [level=2] [ref=e153]
      - generic [ref=e154]:
        - generic [ref=e155]:
          - button "复制代码" [ref=e156] [cursor=pointer]
          - status
        - code [ref=e159]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-radar\" data-recipe=\"category-near\"> <ChartExample id=\"radar\" recipe=\"category-near\" revision={revision} reduced={reduced} state=\"normal\" size=\"standard\" miniSize=\"compact\" seriesCount={3} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e160]:
        - text: 当前源码：
        - code [ref=e161]: packages/ui/src/charts/vendor/charts/radar-chart.tsx
  - group [ref=e162]:
    - generic "调用配置、完整源码与示例数据" [ref=e163] [cursor=pointer]
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
    - option "chart-business/mini-examples.tsx"
    - option "chart-business/mini-data.ts"
    - option "chart-business/mini-layout.ts"
    - option "chart-business/chart-business.css"
    - option "chart-business/matrix-examples.tsx"
    - option "chart-business/matrix-data.ts"
    - option "chart-business/network-examples.tsx"
    - option "chart-business/network-data.ts"
    - option "chart-business/network-page.css"
  - region "全部图表变体" [ref=e164]:
    - navigation "变体分组" [ref=e165]:
      - button "基础结构" [ref=e166] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e168] [cursor=pointer]
    - region [ref=e170]:
      - heading "基础结构" [level=2] [ref=e171]
      - generic [ref=e172]:
        - region [ref=e173]:
          - generic [ref=e174]:
            - heading "Radar Chart" [level=3] [ref=e175]
            - paragraph [ref=e176]: 五维指标的多系列能力对比
          - generic [ref=e177]:
            - generic [ref=e178]:
              - button "更新数据" [ref=e179] [cursor=pointer]
              - button "重播动效" [ref=e181] [cursor=pointer]
            - generic [ref=e183]:
              - img [ref=e187]:
                - generic [ref=e188]:
                  - generic [ref=e189]:
                    - generic [ref=e200]: "20"
                    - generic [ref=e202]: "40"
                    - generic [ref=e204]: "60"
                    - generic [ref=e206]: "80"
                    - generic [ref=e208]: "100"
                  - generic [ref=e215]:
                    - generic [ref=e216]: 理解
                    - generic [ref=e218]: 分析
                    - generic [ref=e220]: 应用
                    - generic [ref=e222]: 表达
                    - generic [ref=e224]: 协作
                  - generic [ref=e226] [cursor=pointer]
                  - generic [ref=e233] [cursor=pointer]
              - paragraph [ref=e240]: 5 个维度共用 0–100 分量程；均为示例评分，未混合不同单位。
              - generic [ref=e241]:
                - button "课程 A" [active] [ref=e243] [cursor=pointer]
                - button "课程 B" [ref=e247] [cursor=pointer]
              - group [ref=e250]:
                - generic "查看精确数据" [ref=e251] [cursor=pointer]
            - status [ref=e252]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e253]:
              - generic "查看本卡代码" [ref=e254] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e255] [cursor=pointer]:
            - /url: https://bklit.com/charts/radar-chart
            - generic [ref=e256]: 对应官网示例
            - generic [ref=e257]: （新标签页打开）
        - region [ref=e258]:
          - generic [ref=e259]:
            - heading "Radar Chart - Triangle" [level=3] [ref=e260]
            - paragraph [ref=e261]: 三维指标对比
          - generic [ref=e262]:
            - generic [ref=e263]:
              - button "更新数据" [ref=e264] [cursor=pointer]
              - button "重播动效" [ref=e266] [cursor=pointer]
            - generic [ref=e268]:
              - img [ref=e272]:
                - generic [ref=e273]:
                  - generic [ref=e274]:
                    - generic [ref=e285]: "20"
                    - generic [ref=e287]: "40"
                    - generic [ref=e289]: "60"
                    - generic [ref=e291]: "80"
                    - generic [ref=e293]: "100"
                  - generic [ref=e298]:
                    - generic [ref=e299]: 理解
                    - generic [ref=e301]: 分析
                    - generic [ref=e303]: 应用
                  - generic [ref=e305] [cursor=pointer]
                  - generic [ref=e310] [cursor=pointer]
              - paragraph [ref=e315]: 3 个维度共用 0–100 分量程；均为示例评分，未混合不同单位。
              - generic [ref=e316]:
                - button "课程 A" [ref=e318] [cursor=pointer]
                - button "课程 B" [ref=e322] [cursor=pointer]
              - group [ref=e325]:
                - generic "查看精确数据" [ref=e326] [cursor=pointer]
            - status [ref=e327]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e328]:
              - generic "查看本卡代码" [ref=e329] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e330] [cursor=pointer]:
            - /url: https://bklit.com/charts/radar-chart
            - generic [ref=e331]: 对应官网示例
            - generic [ref=e332]: （新标签页打开）
        - region [ref=e333]:
          - generic [ref=e334]:
            - heading "Radar Chart - Hexagon" [level=3] [ref=e335]
            - paragraph [ref=e336]: 六维填充图，隐藏描边与点
          - generic [ref=e337]:
            - generic [ref=e338]:
              - button "更新数据" [ref=e339] [cursor=pointer]
              - button "重播动效" [ref=e341] [cursor=pointer]
            - generic [ref=e343]:
              - img [ref=e347]:
                - generic [ref=e348]:
                  - generic [ref=e360]:
                    - generic [ref=e361]: 理解
                    - generic [ref=e363]: 分析
                    - generic [ref=e365]: 应用
                    - generic [ref=e367]: 表达
                    - generic [ref=e369]: 协作
                    - generic [ref=e371]: 创造
                  - generic [ref=e373] [cursor=pointer]
                  - generic [ref=e375] [cursor=pointer]
              - paragraph [ref=e377]: 6 个维度共用 0–100 分量程；均为示例评分，未混合不同单位。
              - generic [ref=e378]:
                - button "课程 A" [ref=e380] [cursor=pointer]
                - button "课程 B" [ref=e384] [cursor=pointer]
              - group [ref=e387]:
                - generic "查看精确数据" [ref=e388] [cursor=pointer]
            - status [ref=e389]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e390]:
              - generic "查看本卡代码" [ref=e391] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e392] [cursor=pointer]:
            - /url: https://bklit.com/charts/radar-chart
            - generic [ref=e393]: 对应官网示例
            - generic [ref=e394]: （新标签页打开）
        - region [ref=e395]:
          - generic [ref=e396]:
            - heading "Radar Chart - Single Series" [level=3] [ref=e397]
            - paragraph [ref=e398]: 单一能力轮廓且隐藏角点
          - generic [ref=e399]:
            - generic [ref=e400]:
              - button "更新数据" [ref=e401] [cursor=pointer]
              - button "重播动效" [ref=e403] [cursor=pointer]
            - generic [ref=e405]:
              - img [ref=e409]:
                - generic [ref=e410]:
                  - generic [ref=e411]:
                    - generic [ref=e422]: "20"
                    - generic [ref=e424]: "40"
                    - generic [ref=e426]: "60"
                    - generic [ref=e428]: "80"
                    - generic [ref=e430]: "100"
                  - generic [ref=e437]:
                    - generic [ref=e438]: 理解
                    - generic [ref=e440]: 分析
                    - generic [ref=e442]: 应用
                    - generic [ref=e444]: 表达
                    - generic [ref=e446]: 协作
                  - generic [ref=e448] [cursor=pointer]
              - paragraph [ref=e450]: 5 个维度共用 0–100 分量程；均为示例评分，未混合不同单位。
              - button "示例课程" [ref=e453] [cursor=pointer]
              - group [ref=e456]:
                - generic "查看精确数据" [ref=e457] [cursor=pointer]
            - status [ref=e458]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e459]:
              - generic "查看本卡代码" [ref=e460] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e461] [cursor=pointer]:
            - /url: https://bklit.com/charts/radar-chart
            - generic [ref=e462]: 对应官网示例
            - generic [ref=e463]: （新标签页打开）
    - region [ref=e464]:
      - heading "坐标与辅助读数" [level=2] [ref=e465]
      - generic [ref=e466]:
        - region [ref=e467]:
          - generic [ref=e468]:
            - heading "Radar Chart - Minimal" [level=3] [ref=e469]
            - paragraph [ref=e470]: 较少网格层并隐藏数值标签
          - generic [ref=e471]:
            - generic [ref=e472]:
              - button "更新数据" [ref=e473] [cursor=pointer]
              - button "重播动效" [ref=e475] [cursor=pointer]
            - paragraph [ref=e478]: 滚动到此处查看示例
            - status [ref=e479]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e480]:
              - generic "查看本卡代码" [ref=e481] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e482] [cursor=pointer]:
            - /url: https://bklit.com/charts/radar-chart
            - generic [ref=e483]: 对应官网示例
            - generic [ref=e484]: （新标签页打开）
        - region [ref=e485]:
          - generic [ref=e486]:
            - heading "Radar Chart - Grid Only" [level=3] [ref=e487]
            - paragraph [ref=e488]: 保留环形网格，隐藏放射轴
          - generic [ref=e489]:
            - generic [ref=e490]:
              - button "更新数据" [ref=e491] [cursor=pointer]
              - button "重播动效" [ref=e493] [cursor=pointer]
            - paragraph [ref=e496]: 滚动到此处查看示例
            - status [ref=e497]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e498]:
              - generic "查看本卡代码" [ref=e499] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e500] [cursor=pointer]:
            - /url: https://bklit.com/charts/radar-chart
            - generic [ref=e501]: 对应官网示例
            - generic [ref=e502]: （新标签页打开）
  - navigation "相关图型" [ref=e503]:
    - link "面积图" [ref=e504] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e506] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e508] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e510] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e512] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e514] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e516] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e518] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e520] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e522] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e524] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e526] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e528] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e530] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e532] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e534] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e536] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e538] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e540] [cursor=pointer]:
      - /url: "#chart-network"
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
  15  |   await expect(page.locator('[data-rain-id="doc-chart-radar"]')).toBeVisible();
  16  | }
  17  | async function ready(card: Locator) {
  18  |   await card.scrollIntoViewIfNeeded();
  19  |   await expect(groups(card).first().locator("path")).toHaveAttribute("d", /M.+Z/);
  20  | }
  21  | async function hoverReadings(card: Locator) {
  22  |   return groups(card).evaluateAll(nodes => nodes.map(node => ({
  23  |     opacity: Number(getComputedStyle(node).opacity),
  24  |     fill: Number(getComputedStyle(node.querySelector("path")!).fillOpacity),
  25  |     stroke: Number(getComputedStyle(node.querySelector("path")!).strokeWidth),
  26  |   })));
  27  | }
  28  | 
  29  | test("all radar variant legends match the default label typography and expose buttons", async ({ page }) => {
  30  |   await open(page);
  31  |   const base = await page.locator('[data-rain-id="chart-radar"] .rain-chart-legend-button').first().evaluate(node => {
  32  |     const style = getComputedStyle(node);
  33  |     return { font: style.fontSize, weight: style.fontWeight, color: style.color };
  34  |   });
  35  |   const rows = [];
  36  |   for (const id of variants) {
  37  |     const card = cardFor(page, id);
  38  |     await ready(card);
  39  |     const row = await legend(card).evaluate(node => [...node.children].map(item => {
  40  |       const button = item.matches("button") ? item : item.querySelector("button");
  41  |       const label = button ?? item;
  42  |       const style = getComputedStyle(label);
  43  |       return { label: label.textContent?.trim(), button: Boolean(button), font: style.fontSize, weight: style.fontWeight, color: style.color };
  44  |     }));
  45  |     rows.push({ id, row });
  46  |   }
  47  |   await facts("legend-typography", { base, rows });
  48  |   expect(base).toMatchObject({ font: "13px", weight: "400" });
  49  |   for (const { id, row } of rows) {
  50  |     expect.soft(row.length, id).toBe(id === "radar-single-series" ? 1 : 2);
  51  |     for (const item of row) expect.soft(item, id).toMatchObject({ button: true, ...base });
  52  |   }
  53  | });
  54  | 
  55  | test("radar legend focus and pointer inspect the matching series without affecting another instance", async ({ page }) => {
  56  |   await open(page);
  57  |   const first = cardFor(page, "radar-default"), second = cardFor(page, "radar-triangle");
  58  |   await ready(first);
  59  |   await ready(second);
  60  |   const button = first.getByRole("button", { name: "课程 A", exact: true });
  61  |   await expect(button).toHaveCount(1);
  62  |   await button.focus();
  63  |   await expect.poll(async () => (await hoverReadings(first))[0]!.fill).toBeCloseTo(.35, 2);
  64  |   await expect.poll(async () => (await hoverReadings(first))[1]!.opacity).toBeCloseTo(.3, 2);
> 65  |   expect(await hoverReadings(second)).toEqual([{ opacity: 1, fill: .15, stroke: 2 }, { opacity: 1, fill: .15, stroke: 2 }]);
      |                                       ^ Error: expect(received).toEqual(expected) // deep equality
  66  |   const focused = await button.evaluate(node => ({ outline: getComputedStyle(node).outlineStyle, width: getComputedStyle(node).outlineWidth }));
  67  |   expect(focused.outline).not.toBe("none");
  68  |   expect(parseFloat(focused.width)).toBeGreaterThan(0);
  69  |   await facts("focused-isolation", { first: await hoverReadings(first), second: await hoverReadings(second), focused });
  70  |   await first.screenshot({ path: `${evidence}/legend-focus.png` });
  71  |   await button.blur();
  72  |   await expect.poll(async () => (await hoverReadings(first)).every(row => row.opacity === 1 && row.fill === .15)).toBe(true);
  73  |   await first.getByRole("button", { name: "课程 B", exact: true }).hover();
  74  |   await expect.poll(async () => (await hoverReadings(first))[1]!.fill).toBeCloseTo(.35, 2);
  75  |   await page.mouse.move(1, 1);
  76  |   await expect.poll(async () => (await hoverReadings(first)).every(row => row.opacity === 1 && row.fill === .15)).toBe(true);
  77  |   await groups(first).last().hover({ force: true });
  78  |   await expect.poll(async () => (await hoverReadings(first))[1]!.fill).toBeCloseTo(.35, 2);
  79  |   await page.mouse.move(1, 1);
  80  |   await expect.poll(async () => (await hoverReadings(first)).every(row => row.opacity === 1 && row.fill === .15)).toBe(true);
  81  | });
  82  | 
  83  | test("three five and six dimension outer grids meet their 100 point metric directions", async ({ page }) => {
  84  |   await open(page);
  85  |   const rows = [];
  86  |   for (const [id, dimensions] of [["radar-triangle", 3], ["radar-default", 5], ["radar-hexagon", 6]] as const) {
  87  |     const card = cardFor(page, id);
  88  |     await ready(card);
  89  |     const result = await card.locator('[data-rain-id="ui-chart-radar"] svg').evaluate((svg, n) => {
  90  |       const point = (node: SVGGraphicsElement, x: number, y: number) => new DOMPoint(x, y).matrixTransform(node.getScreenCTM()!);
  91  |       const center = point(svg as SVGSVGElement, Number(svg.getAttribute("width")) / 2, Number(svg.getAttribute("height")) / 2);
  92  |       const polygons = [...svg.querySelectorAll<SVGPathElement>('path[fill="none"]')].map(path => {
  93  |         const numbers = (path.getAttribute("d") ?? "").match(/-?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)?.map(Number) ?? [];
  94  |         const vertices = Array.from({ length: numbers.length / 2 }, (_, i) => point(path, numbers[i * 2]!, numbers[i * 2 + 1]!));
  95  |         return { vertices, radius: Math.max(...vertices.map(p => Math.hypot(p.x - center.x, p.y - center.y))) };
  96  |       });
  97  |       const outer = polygons.sort((a, b) => b.radius - a.radius)[0]!;
  98  |       const axes = [...svg.querySelectorAll<SVGLineElement>("line")].map(line => point(line, Number(line.getAttribute("x2")), Number(line.getAttribute("y2"))));
  99  |       // The hexagon intentionally hides axes; labels still define every metric direction.
  100 |       const endpoints = axes.length === n ? axes : [...svg.querySelectorAll<SVGTextElement>("text")].map(text => {
  101 |         const p = point(text, Number(text.getAttribute("x")), Number(text.getAttribute("y")));
  102 |         const r = Math.hypot(p.x - center.x, p.y - center.y);
  103 |         return { x: center.x + (p.x - center.x) * outer.radius / r, y: center.y + (p.y - center.y) * outer.radius / r };
  104 |       });
  105 |       return { axisCount: axes.length, endpoints: endpoints.map(p => ({ x: p.x, y: p.y })), radius: outer.radius,
  106 |         distances: endpoints.map(p => Math.min(...outer.vertices.map(v => Math.hypot(v.x - p.x, v.y - p.y)))) };
  107 |     }, dimensions);
  108 |     rows.push({ id, dimensions, ...result });
  109 |   }
  110 |   await facts("grid-axis-alignment", rows);
  111 |   for (const row of rows) {
  112 |     expect.soft(row.endpoints.length, row.id).toBe(row.dimensions);
  113 |     expect.soft(row.radius, row.id).toBeGreaterThan(50);
  114 |     for (const distance of row.distances) expect.soft(distance, row.id).toBeLessThan(1);
  115 |   }
  116 | });
  117 | 
  118 | test("default and variant radar hover glows stay light and local to their series", async ({ page }) => {
  119 |   await open(page, "no-preference");
  120 |   const rows = [];
  121 |   for (const id of ["default-example", ...variants]) {
  122 |     const card = id === "default-example" ? page.locator('[data-rain-id="chart-radar"]') : cardFor(page, id);
  123 |     await ready(card);
  124 |     await page.waitForTimeout(1800);
  125 |     await groups(card).last().hover({ force: true });
  126 |     await expect.poll(async () => (await hoverReadings(card)).at(-1)!.fill).toBeCloseTo(.35, 2);
  127 |     const filter = await groups(card).last().locator("path").evaluate(node => getComputedStyle(node).filter);
  128 |     const slash = filter.match(/\/\s*([\d.]+)(%)?\s*\)/);
  129 |     const rgba = filter.match(/rgba\([^)]*,\s*([\d.]+)\)/);
  130 |     const alpha = slash ? Number(slash[1]) / (slash[2] ? 100 : 1) : rgba ? Number(rgba[1]) : 1;
  131 |     const pixels = [...filter.matchAll(/(-?\d+(?:\.\d+)?)px/g)].map(match => Number(match[1]));
  132 |     rows.push({ id, filter, alpha, blur: pixels.at(-1) });
  133 |     await card.screenshot({ path: `${evidence}/${id}-hover.png` });
  134 |     await page.mouse.move(1, 1);
  135 |   }
  136 |   await facts("hover-glow", rows);
  137 |   for (const row of rows) {
  138 |     if (["radar-hexagon", "radar-grid-only"].includes(row.id)) expect.soft(row.filter, row.id).toBe("none");
  139 |     else {
  140 |       expect.soft(row.filter, row.id).toContain("drop-shadow(");
  141 |       expect.soft(row.alpha, row.id).toBeLessThanOrEqual(.3);
  142 |       expect.soft(row.blur, row.id).toBeLessThanOrEqual(6);
  143 |     }
  144 |   }
  145 | });
  146 | 
  147 | for (const scenario of [{ name: "reduced-390", reduced: "reduce", width: 390, zoom: 1 }, { name: "normal-200-percent", reduced: "no-preference", width: 1280, zoom: 2 }] as const) {
  148 |   test(`radar labels and finite geometry survive ${scenario.name}`, async ({ page }) => {
  149 |     await open(page, scenario.reduced, scenario.width);
  150 |     if (scenario.zoom === 2) await page.addStyleTag({ content: "html { zoom: 2; }" });
  151 |     const rows = [];
  152 |     for (const id of variants) {
  153 |       const card = cardFor(page, id);
  154 |       await ready(card);
  155 |       if (scenario.reduced === "no-preference") await page.waitForTimeout(1500);
  156 |       const row = await card.evaluate(node => {
  157 |         const svg = node.querySelector('[data-rain-id="ui-chart-radar"] svg')!;
  158 |         const paths = [...svg.querySelectorAll("path[d]")].map(path => path.getAttribute("d"));
  159 |         const text = [...node.querySelectorAll(".legend-container button, .rain-chart-variant-legend button")].map(button => ({
  160 |           label: button.textContent?.trim(), right: button.getBoundingClientRect().right, left: button.getBoundingClientRect().left,
  161 |         }));
  162 |         return { paths, text, card: node.getBoundingClientRect().toJSON() };
  163 |       });
  164 |       rows.push({ id, ...row });
  165 |       expect.soft(row.text.length, id).toBe(id === "radar-single-series" ? 1 : 2);
```