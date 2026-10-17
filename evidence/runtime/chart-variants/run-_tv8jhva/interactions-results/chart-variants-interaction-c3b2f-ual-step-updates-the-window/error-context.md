# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-variants-interactions.spec.ts >> live pause keeps the actual path offscreen and in background, manual step updates the window
- Location: tests/e2e/chart-variants-interactions.spec.ts:44:1

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: locator.getAttribute: Test timeout of 45000ms exceeded.
Call log:
  - waiting for locator('[data-chart-variant="live-line-default"]').locator('path[stroke="var(--chart-1)"]').first()

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "实时折线" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 有界数据更新、实时读数、暂停恢复与原生光点。
  - generic [ref=e11]:
    - heading "图型与可选配方" [level=2] [ref=e12]
    - paragraph [ref=e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e17]:
            - option "清晰线与轻面积" [selected]
            - option "正负与涨跌"
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
        - generic [ref=e25]:
          - button "暂停实时" [ref=e26] [cursor=pointer]
          - button "追加一次" [disabled] [ref=e27] [cursor=pointer]
          - status [ref=e28]: 每秒更新 · 103/120条
        - generic [ref=e29]:
          - img [ref=e31]:
            - generic [ref=e32]: "100.93"
          - generic:
            - generic:
              - generic: "60"
              - generic: "80"
              - generic: "100"
              - generic: "120"
          - generic:
            - generic: 12:40
            - generic: 13:00
            - generic: 13:20
            - generic: 13:40
        - paragraph [ref=e46]:
          - text: 最新人数
          - strong [ref=e47]: "101"
          - text: 人 · 模拟数据，时间戳单位为秒。
        - group [ref=e48]:
          - generic "查看精确数据" [ref=e49] [cursor=pointer]
      - status [ref=e50]: 示例数据 · 已更新 0 次
  - generic [ref=e51]:
    - heading "数据与使用边界" [level=2] [ref=e52]
    - paragraph [ref=e53]: time为Unix秒且单调递增；缓冲≤120条，窗口60秒。
    - paragraph [ref=e54]: 本例使用本地模拟生产者；减少动效时改为手动追加。
    - paragraph [ref=e55]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=e56]:
    - region [ref=e57]:
      - heading "API 与结构" [level=2] [ref=e58]
      - table [ref=e60]:
        - caption [ref=e61]: 实时折线 常用接口
        - rowgroup [ref=e62]:
          - row [ref=e63]:
            - columnheader "名称" [ref=e64]
            - columnheader "类型" [ref=e65]
            - columnheader "默认" [ref=e66]
            - columnheader "说明" [ref=e67]
        - rowgroup [ref=e68]:
          - row [ref=e69]:
            - rowheader [ref=e70]:
              - code [ref=e71]: data / value
            - cell [ref=e72]:
              - code [ref=e73]: 原生图型合同
            - cell "—" [ref=e74]
            - cell "time为Unix秒且单调递增；缓冲≤120条，窗口60秒。" [ref=e75]
          - row [ref=e76]:
            - rowheader [ref=e77]:
              - code [ref=e78]: children
            - cell [ref=e79]:
              - code [ref=e80]: Compound Parts
            - cell "—" [ref=e81]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e82]
          - row [ref=e83]:
            - rowheader [ref=e84]:
              - code [ref=e85]: className / style / margin
            - cell [ref=e86]:
              - code [ref=e87]: 原生尺寸接口
            - cell "—" [ref=e88]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e89]
          - row [ref=e90]:
            - rowheader [ref=e91]:
              - code [ref=e92]: enterTransition / animationDuration
            - cell [ref=e93]:
              - code [ref=e94]: 原生动效配置
            - cell "—" [ref=e95]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e96]
      - paragraph [ref=e97]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e98]:
      - heading "调用示例" [level=2] [ref=e99]
      - generic [ref=e100]:
        - generic [ref=e101]:
          - button "复制代码" [ref=e102] [cursor=pointer]
          - status
        - code [ref=e105]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig, useReducedMotion } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; function App() { const [revision, setRevision] = useState(0); const reduced = useReducedMotion() ?? false; return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-live-line\" data-recipe=\"trend-soft\"> <ChartExample id=\"live-line\" recipe=\"trend-soft\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e106]:
        - text: 当前源码：
        - code [ref=e107]: packages/ui/src/charts/vendor/charts/live-line-chart.tsx
  - group [ref=e108]:
    - generic "调用配置、完整源码与示例数据" [ref=e109] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-variants/profit-loss.tsx"
    - option "chart-variants/shared.tsx"
    - option "chart-data.ts"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
  - region "全部图表变体" [ref=e110]:
    - navigation "变体分组" [ref=e111]:
      - button "基础结构" [ref=e112] [cursor=pointer]
      - button "图形材质" [ref=e114] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e116] [cursor=pointer]
      - button "交互与状态" [ref=e118] [cursor=pointer]
    - region [ref=e120]:
      - heading "基础结构" [level=2] [ref=e121]
      - generic [ref=e122]:
        - region [ref=e123]:
          - generic [ref=e124]:
            - heading "Live Line Chart" [level=3] [ref=e125]
            - paragraph [ref=e126]: 平滑滚动、实时点与提示交互
          - generic [ref=e127]:
            - generic [ref=e128]:
              - button "更新数据" [ref=e129] [cursor=pointer]
              - button "重播动效" [ref=e131] [cursor=pointer]
            - generic [ref=e133]:
              - generic [ref=e134]:
                - button "恢复实时" [active] [ref=e135] [cursor=pointer]
                - button "追加一次" [ref=e136] [cursor=pointer]
                - status [ref=e137]: 已暂停 · 61/120 条
              - generic [ref=e138]:
                - img [ref=e140]:
                  - generic [ref=e141]: 89 人
                - generic:
                  - generic: 12:23
                  - generic: 12:33
                  - generic: 12:43
                  - generic: 12:53
                - generic:
                  - generic:
                    - generic: "60"
                    - generic: "80"
                    - generic: "100"
                    - generic: "120"
              - paragraph [ref=e157]: 最新人数 89 人 · 最近 30 秒 · 模拟数据，时间戳为 Unix 秒。
              - group [ref=e158]:
                - generic "查看精确数据" [ref=e159] [cursor=pointer]
            - status [ref=e160]: 示例数据 · 已更新 0 次
            - group [ref=e161]:
              - generic "查看本卡代码" [ref=e162] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/special.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e163] [cursor=pointer]:
            - /url: https://bklit.com/charts/live-line-chart
            - generic [ref=e164]: 对应官网示例
            - generic [ref=e165]: （新标签页打开）
        - region [ref=e166]:
          - generic [ref=e167]:
            - heading "Live Line - Line Only" [level=3] [ref=e168]
            - paragraph [ref=e169]: 仅折线与实时点，隐藏面积
          - generic [ref=e170]:
            - generic [ref=e171]:
              - button "更新数据" [ref=e172] [cursor=pointer]
              - button "重播动效" [ref=e174] [cursor=pointer]
            - generic [ref=e176]:
              - generic [ref=e177]:
                - button "暂停实时" [ref=e178] [cursor=pointer]
                - button "追加一次" [disabled] [ref=e179] [cursor=pointer]
                - status [ref=e180]: 每 0.6 秒更新 · 120/120 条
              - generic [ref=e181]:
                - img [ref=e183]:
                  - generic [ref=e184]: 103 人
                - generic:
                  - generic: 13:08
                  - generic: 13:17
                  - generic: 13:27
                  - generic: 13:36
                - generic:
                  - generic:
                    - generic: "60"
                    - generic: "80"
                    - generic: "100"
                    - generic: "120"
              - paragraph [ref=e199]: 最新人数 106 人 · 最近 28 秒 · 模拟数据，时间戳为 Unix 秒。
              - group [ref=e200]:
                - generic "查看精确数据" [ref=e201] [cursor=pointer]
            - status [ref=e202]: 示例数据 · 已更新 0 次
            - group [ref=e203]:
              - generic "查看本卡代码" [ref=e204] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/special.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e205] [cursor=pointer]:
            - /url: https://bklit.com/charts/live-line-chart
            - generic [ref=e206]: 对应官网示例
            - generic [ref=e207]: （新标签页打开）
    - region [ref=e208]:
      - heading "图形材质" [level=2] [ref=e209]
      - generic [ref=e210]:
        - region [ref=e211]:
          - generic [ref=e212]:
            - heading "Live Line - Now Offset" [level=3] [ref=e213]
            - paragraph [ref=e214]: 右侧保留前沿空间并渐隐
          - generic [ref=e215]:
            - generic [ref=e216]:
              - button "更新数据" [ref=e217] [cursor=pointer]
              - button "重播动效" [ref=e219] [cursor=pointer]
            - generic [ref=e221]:
              - generic [ref=e222]:
                - button "暂停实时" [ref=e223] [cursor=pointer]
                - button "追加一次" [disabled] [ref=e224] [cursor=pointer]
                - status [ref=e225]: 每 0.6 秒更新 · 120/120 条
              - generic [ref=e226]:
                - img [ref=e228]:
                  - generic [ref=e229]: 103 人
                - generic:
                  - generic: 13:23
                  - generic: 13:29
                  - generic: 13:36
                  - generic: 13:43
                - generic:
                  - generic:
                    - generic: "80"
                    - generic: "100"
              - paragraph [ref=e246]: 最新人数 106 人 · 最近 20 秒 · 模拟数据，时间戳为 Unix 秒。
              - group [ref=e247]:
                - generic "查看精确数据" [ref=e248] [cursor=pointer]
            - status [ref=e249]: 示例数据 · 已更新 0 次
            - group [ref=e250]:
              - generic "查看本卡代码" [ref=e251] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/special.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e252] [cursor=pointer]:
            - /url: https://bklit.com/charts/live-line-chart
            - generic [ref=e253]: 对应官网示例
            - generic [ref=e254]: （新标签页打开）
        - region [ref=e255]:
          - generic [ref=e256]:
            - heading "Live Line - Momentum Colors" [level=3] [ref=e257]
            - paragraph [ref=e258]: 随上升下降方向切换颜色
          - generic [ref=e259]:
            - generic [ref=e260]:
              - button "更新数据" [ref=e261] [cursor=pointer]
              - button "重播动效" [ref=e263] [cursor=pointer]
            - paragraph [ref=e265]: 本卡使用独立示例配色，保留材质或色阶差异。
            - generic [ref=e266]:
              - generic [ref=e267]:
                - button "暂停实时" [ref=e268] [cursor=pointer]
                - button "追加一次" [disabled] [ref=e269] [cursor=pointer]
                - status [ref=e270]: 每 0.6 秒更新 · 120/120 条
              - generic [ref=e271]:
                - img [ref=e273]:
                  - generic [ref=e274]: 103 人
                - generic:
                  - generic: 13:11
                  - generic: 13:19
                  - generic: 13:28
                  - generic: 13:36
                - generic:
                  - generic:
                    - generic: "60"
                    - generic: "80"
                    - generic: "100"
                    - generic: "120"
              - paragraph [ref=e291]: 最新人数 106 人 · 最近 25 秒 · 模拟数据，时间戳为 Unix 秒。
              - group [ref=e292]:
                - generic "查看精确数据" [ref=e293] [cursor=pointer]
            - status [ref=e294]: 示例数据 · 已更新 0 次
            - group [ref=e295]:
              - generic "查看本卡代码" [ref=e296] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/special.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e297] [cursor=pointer]:
            - /url: https://bklit.com/charts/live-line-chart
            - generic [ref=e298]: 对应官网示例
            - generic [ref=e299]: （新标签页打开）
    - region [ref=e300]:
      - heading "坐标与辅助读数" [level=2] [ref=e301]
      - generic [ref=e302]:
        - region [ref=e303]:
          - generic [ref=e304]:
            - heading "Live Line - Pattern Background" [level=3] [ref=e305]
            - paragraph [ref=e306]: 图案背景替代网格
          - generic [ref=e307]:
            - generic [ref=e308]:
              - button "更新数据" [ref=e309] [cursor=pointer]
              - button "重播动效" [ref=e311] [cursor=pointer]
            - paragraph [ref=e314]: 滚动到此处查看示例
            - status [ref=e315]: 示例数据 · 已更新 0 次
            - group [ref=e316]:
              - generic "查看本卡代码" [ref=e317] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/special.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e318] [cursor=pointer]:
            - /url: https://bklit.com/charts/live-line-chart
            - generic [ref=e319]: 对应官网示例
            - generic [ref=e320]: （新标签页打开）
        - region [ref=e321]:
          - generic [ref=e322]:
            - heading "Live Line - Dot Grid Background" [level=3] [ref=e323]
            - paragraph [ref=e324]: 带边缘渐隐的点阵背景
          - generic [ref=e325]:
            - generic [ref=e326]:
              - button "更新数据" [ref=e327] [cursor=pointer]
              - button "重播动效" [ref=e329] [cursor=pointer]
            - paragraph [ref=e332]: 滚动到此处查看示例
            - status [ref=e333]: 示例数据 · 已更新 0 次
            - group [ref=e334]:
              - generic "查看本卡代码" [ref=e335] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/special.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e336] [cursor=pointer]:
            - /url: https://bklit.com/charts/live-line-chart
            - generic [ref=e337]: 对应官网示例
            - generic [ref=e338]: （新标签页打开）
        - region [ref=e339]:
          - generic [ref=e340]:
            - heading "Live Line - Reference Band" [level=3] [ref=e341]
            - paragraph [ref=e342]: 随实时图显示目标参考区间
          - generic [ref=e343]:
            - generic [ref=e344]:
              - button "更新数据" [ref=e345] [cursor=pointer]
              - button "重播动效" [ref=e347] [cursor=pointer]
            - paragraph [ref=e350]: 滚动到此处查看示例
            - status [ref=e351]: 示例数据 · 已更新 0 次
            - group [ref=e352]:
              - generic "查看本卡代码" [ref=e353] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/special.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e354] [cursor=pointer]:
            - /url: https://bklit.com/charts/live-line-chart
            - generic [ref=e355]: 对应官网示例
            - generic [ref=e356]: （新标签页打开）
        - region [ref=e357]:
          - generic [ref=e358]:
            - heading "Live Line - Pattern Reference Band" [level=3] [ref=e359]
            - paragraph [ref=e360]: 图案参考区间与相应轴标签
          - generic [ref=e361]:
            - generic [ref=e362]:
              - button "更新数据" [ref=e363] [cursor=pointer]
              - button "重播动效" [ref=e365] [cursor=pointer]
            - paragraph [ref=e368]: 滚动到此处查看示例
            - status [ref=e369]: 示例数据 · 已更新 0 次
            - group [ref=e370]:
              - generic "查看本卡代码" [ref=e371] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/special.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e372] [cursor=pointer]:
            - /url: https://bklit.com/charts/live-line-chart
            - generic [ref=e373]: 对应官网示例
            - generic [ref=e374]: （新标签页打开）
    - region [ref=e375]:
      - heading "交互与状态" [level=2] [ref=e376]
      - region [ref=e378]:
        - generic [ref=e379]:
          - heading "Live Line Chart - Interactive" [level=3] [ref=e380]
          - paragraph [ref=e381]: 实时流、十字指示与动态轴
        - generic [ref=e382]:
          - generic [ref=e383]:
            - button "更新数据" [ref=e384] [cursor=pointer]
            - button "重播动效" [ref=e386] [cursor=pointer]
          - paragraph [ref=e389]: 滚动到此处查看示例
          - status [ref=e390]: 示例数据 · 已更新 0 次
          - group [ref=e391]:
            - generic "查看本卡代码" [ref=e392] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/special.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e393] [cursor=pointer]:
          - /url: https://bklit.com/charts/live-line-chart
          - generic [ref=e394]: 对应官网示例
          - generic [ref=e395]: （新标签页打开）
  - navigation "相关图型" [ref=e396]:
    - link "面积图" [ref=e397] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e399] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e401] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e403] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e405] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e407] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e409] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e411] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e413] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e415] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e417] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e419] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e421] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e423] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e425] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e427] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e429] [cursor=pointer]:
      - /url: "#chart-live-line"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { mkdir } from "node:fs/promises";
  3  | const evidence = process.env.RAIN_CHART_VARIANTS_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/interactions";
  4  | 
  5  | test("six curves repaint actual geometry and the downloaded call stays synchronized", async ({page}) => {
  6  |   await page.emulateMedia({reducedMotion:"reduce"});
  7  |   await page.goto("/#chart-area");
  8  |   const card=page.locator('[data-chart-variant="area-interactive"]');await card.scrollIntoViewIfNeeded();
  9  |   const curve=card.getByRole("combobox",{name:"图表曲线"});
  10 |   await expect(curve.locator("option")).toHaveCount(6);
  11 |   const paths=card.locator('path[stroke="var(--chart-1)"]');await expect(paths.first()).toBeVisible();
  12 |   const original=await paths.first().getAttribute("d");
  13 |   await curve.selectOption("step");await expect.poll(()=>paths.first().getAttribute("d")).not.toBe(original);
  14 |   await card.getByText("查看本卡代码",{exact:true}).click();await expect(card.locator("pre")).toContainText('curveName="step"');
  15 |   await page.locator("h1").scrollIntoViewIfNeeded();await card.scrollIntoViewIfNeeded();await expect(curve).toHaveValue("step");
  16 | });
  17 | 
  18 | test("Brush mouse and keyboard control the same visible handles, window, and exact rows",async({page})=>{
  19 |   await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-line");
  20 |   const card=page.locator('[data-chart-variant="line-trio-brush"]');await card.scrollIntoViewIfNeeded();
  21 |   const left=card.locator(".visx-brush-handle-left");await expect(left).toBeVisible();
  22 |   const before=(await left.boundingBox())!.x;
  23 |   const start=card.getByRole("slider",{name:"范围开始日期"});await start.focus();await page.keyboard.press("ArrowRight");
  24 |   await expect(start).toHaveValue("1");await expect.poll(async()=> (await left.boundingBox())!.x).toBeGreaterThan(before+5);
  25 |   await card.getByText("查看精确数据",{exact:true}).click();await expect(card.locator("tbody tr")).toHaveCount(29);
  26 |   await card.getByRole("button",{name:"重置范围"}).click();await expect(start).toHaveValue("0");await expect.poll(async()=> (await left.boundingBox())!.x).toBeCloseTo(before,0);
  27 |   const right=card.locator(".visx-brush-handle-right");const box=(await right.boundingBox())!;
  28 |   await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x-160,box.y+box.height/2,{steps:8});await page.mouse.up();
  29 |   await expect.poll(()=>card.getByRole("slider",{name:"范围结束日期"}).inputValue()).not.toBe("29");
  30 |   await card.getByRole("button",{name:"重置范围"}).click();await expect(card.locator("tbody tr")).toHaveCount(30);
  31 |   await mkdir(evidence,{recursive:true});await card.screenshot({path:`${evidence}/line-brush-pointer-keyboard-reset.png`});
  32 | });
  33 | 
  34 | test("temporary drag selection disappears after release while data stays complete",async({page})=>{
  35 |   await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-area");
  36 |   const card=page.locator('[data-chart-variant="area-segment-selection"]');await card.scrollIntoViewIfNeeded();
  37 |   const plot=card.locator('[data-rain-id="ui-chart-area"] svg').first();const box=(await plot.boundingBox())!;
  38 |   const band=card.locator('rect[fill="var(--chart-segment-background)"]');
  39 |   await page.mouse.move(box.x+120,box.y+100);await page.mouse.down();await page.mouse.move(box.x+360,box.y+100,{steps:8});await expect(band).toBeVisible();
  40 |   await page.mouse.up();await expect(band).toHaveCount(0);
  41 |   await card.getByText("查看精确数据",{exact:true}).click();await expect(card.locator("tbody tr")).toHaveCount(30);
  42 | });
  43 | 
  44 | test("live pause keeps the actual path offscreen and in background, manual step updates the window",async({page})=>{
  45 |   await page.clock.install();await page.goto("/#chart-live-line");
  46 |   const card=page.locator('[data-chart-variant="live-line-default"]');await card.scrollIntoViewIfNeeded();
  47 |   await expect(card.locator('[data-live-count]')).toBeVisible();await page.clock.runFor(1000);
  48 |   await card.getByRole("button",{name:"暂停实时",exact:true}).click();
> 49 |   const path=card.locator('path[stroke="var(--chart-1)"]').first();const before=await path.getAttribute("d");
     |                                                                                            ^ Error: locator.getAttribute: Test timeout of 45000ms exceeded.
  50 |   const count=await card.locator('[data-live-count]').getAttribute("data-live-count");
  51 |   await card.getByRole("button",{name:"恢复实时",exact:true}).blur();await page.locator("h1").scrollIntoViewIfNeeded();
  52 |   await page.clock.fastForward(120_000);await card.scrollIntoViewIfNeeded();await page.clock.runFor(50);
  53 |   await expect(card.getByRole("button",{name:"恢复实时",exact:true})).toBeVisible();await expect(path).toHaveAttribute("d",before!);await expect(card.locator('[data-live-count]')).toHaveAttribute("data-live-count",count!);
  54 |   await card.getByRole("button",{name:"追加一次",exact:true}).click();await page.clock.runFor(50);
  55 |   await expect.poll(()=>path.getAttribute("d")).not.toBe(before);
  56 |   await card.getByRole("button",{name:"恢复实时",exact:true}).click();await page.clock.runFor(650);
  57 |   await expect.poll(()=>card.locator('[data-live-count]').getAttribute("data-live-count")).not.toBe(count);
  58 |   await page.emulateMedia({reducedMotion:"reduce"});await expect(card.locator('[data-live-paused]')).toHaveAttribute("data-live-paused","true");
  59 | });
  60 | 
  61 | test("horizontal bars have a visible numeric axis and native 3D segments align without extra stack gaps",async({page})=>{
  62 |   await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-bar");
  63 |   const horizontal=page.locator('[data-chart-variant="bar-horizontal"]');await horizontal.scrollIntoViewIfNeeded();await expect(horizontal.locator('g[aria-label="人数刻度"] text').first()).toBeVisible();
  64 |   const stack=page.locator('[data-chart-variant="bar-3d-stacked"]');await stack.scrollIntoViewIfNeeded();
  65 |   const values=await stack.locator('g.bar-series-进行中 rect').evaluateAll(nodes=>nodes.map(node=>Number(node.getAttribute("y"))));
  66 |   expect(values.length).toBe(6);expect(values.every(Number.isFinite)).toBe(true);
  67 | });
  68 | 
```