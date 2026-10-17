# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-variants.spec.ts >> [T13] sankey: all 5 frozen cards render real geometry and readable data at 1440 and 390
- Location: tests/e2e/chart-variants.spec.ts:50:3

# Error details

```
Error: sankey-interactive at 390px

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "桑基图" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 稳定节点身份、双色流向渐变和路径聚焦。
  - generic [ref=e11]:
    - heading "图型与可选配方" [level=2] [ref=e12]
    - paragraph [ref=e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e17]:
            - option "来源到目标渐变" [selected]
            - option "蓝紫近邻"
            - option "多色类别"
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
        - img [ref=e28]:
          - generic [ref=e29]:
            - generic [ref=e30]:
              - generic [ref=e31] [cursor=pointer]
              - generic [ref=e32] [cursor=pointer]
              - generic [ref=e33] [cursor=pointer]
              - generic [ref=e34] [cursor=pointer]
            - generic [ref=e35]:
              - generic [ref=e36] [cursor=pointer]: 入口
              - generic [ref=e40] [cursor=pointer]: 提醒
              - generic [ref=e44] [cursor=pointer]: 视频
              - generic [ref=e48] [cursor=pointer]: 资料
              - generic [ref=e52] [cursor=pointer]: 完成
              - generic [ref=e56] [cursor=pointer]: 继续
        - paragraph [ref=e60]: 图中使用短名称；悬停节点或打开精确数据可读取完整名称。
        - group [ref=e61]:
          - generic "查看精确数据" [ref=e62] [cursor=pointer]
      - status [ref=e63]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - generic [ref=e64]:
    - heading "数据与使用边界" [level=2] [ref=e65]
    - paragraph [ref=e66]: source/target引用有效节点，权重非负；本例中间节点守恒。
    - paragraph [ref=e67]: 显示的是人次流向，不等于去重人数。
    - paragraph [ref=e68]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=e69]:
    - region [ref=e70]:
      - heading "API 与结构" [level=2] [ref=e71]
      - table [ref=e73]:
        - caption [ref=e74]: 桑基图 常用接口
        - rowgroup [ref=e75]:
          - row [ref=e76]:
            - columnheader "名称" [ref=e77]
            - columnheader "类型" [ref=e78]
            - columnheader "默认" [ref=e79]
            - columnheader "说明" [ref=e80]
        - rowgroup [ref=e81]:
          - row [ref=e82]:
            - rowheader [ref=e83]:
              - code [ref=e84]: data / value
            - cell [ref=e85]:
              - code [ref=e86]: 原生图型合同
            - cell "—" [ref=e87]
            - cell "source/target引用有效节点，权重非负；本例中间节点守恒。" [ref=e88]
          - row [ref=e89]:
            - rowheader [ref=e90]:
              - code [ref=e91]: children
            - cell [ref=e92]:
              - code [ref=e93]: Compound Parts
            - cell "—" [ref=e94]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e95]
          - row [ref=e96]:
            - rowheader [ref=e97]:
              - code [ref=e98]: className / style / margin
            - cell [ref=e99]:
              - code [ref=e100]: 原生尺寸接口
            - cell "—" [ref=e101]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e102]
          - row [ref=e103]:
            - rowheader [ref=e104]:
              - code [ref=e105]: enterTransition / animationDuration
            - cell [ref=e106]:
              - code [ref=e107]: 原生动效配置
            - cell "—" [ref=e108]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e109]
      - paragraph [ref=e110]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e111]:
      - heading "调用示例" [level=2] [ref=e112]
      - generic [ref=e113]:
        - generic [ref=e114]:
          - button "复制代码" [ref=e115] [cursor=pointer]
          - status
        - code [ref=e118]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig, useReducedMotion } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; function App() { const [revision, setRevision] = useState(0); const reduced = useReducedMotion() ?? false; return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-sankey\" data-recipe=\"flow\"> <ChartExample id=\"sankey\" recipe=\"flow\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e119]:
        - text: 当前源码：
        - code [ref=e120]: packages/ui/src/charts/vendor/charts/sankey/sankey-chart.tsx
  - group [ref=e121]:
    - generic "调用配置、完整源码与示例数据" [ref=e122] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-variants/profit-loss.tsx"
    - option "chart-variants/shared.tsx"
    - option "chart-data.ts"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
  - region "全部图表变体" [ref=e123]:
    - navigation "变体分组" [ref=e124]:
      - button "基础结构" [ref=e125] [cursor=pointer]
      - button "图形材质" [ref=e127] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e129] [cursor=pointer]
      - button "交互与状态" [ref=e131] [cursor=pointer]
    - region [ref=e133]:
      - heading "基础结构" [level=2] [ref=e134]
      - generic [ref=e135]:
        - region [ref=e136]:
          - generic [ref=e137]:
            - heading "Sankey Chart" [level=3] [ref=e138]
            - paragraph [ref=e139]: 带节点标签和提示的流向图
          - generic [ref=e140]:
            - generic [ref=e141]:
              - button "更新数据" [ref=e142] [cursor=pointer]
              - button "重播动效" [ref=e144] [cursor=pointer]
            - generic [ref=e146]:
              - img [ref=e150]:
                - generic [ref=e151]:
                  - generic [ref=e152]:
                    - generic [ref=e153] [cursor=pointer]
                    - generic [ref=e154] [cursor=pointer]
                    - generic [ref=e155] [cursor=pointer]
                    - generic [ref=e156] [cursor=pointer]
                  - generic [ref=e157]:
                    - generic [ref=e158] [cursor=pointer]:
                      - generic [ref=e160]: 课程入口
                      - generic [ref=e162]: 0 sessions
                    - generic [ref=e164] [cursor=pointer]:
                      - generic [ref=e166]: 学习提醒
                      - generic [ref=e168]: 0 sessions
                    - generic [ref=e170] [cursor=pointer]:
                      - generic [ref=e172]: 观看视频
                      - generic [ref=e174]: 380 sessions
                    - generic [ref=e176] [cursor=pointer]:
                      - generic [ref=e178]: 阅读资料
                      - generic [ref=e180]: 220 sessions
                    - generic [ref=e182] [cursor=pointer]:
                      - generic [ref=e184]: 完成学习
                      - generic [ref=e186]: 420 sessions
                    - generic [ref=e188] [cursor=pointer]:
                      - generic [ref=e190]: 继续学习
                      - generic [ref=e192]: 180 sessions
              - paragraph [ref=e194]: 流量 · 人。中间节点流入量等于流出量；完成与继续学习是互斥结果。
              - group [ref=e195]:
                - generic "查看精确数据" [ref=e196] [cursor=pointer]
            - status [ref=e197]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e198]:
              - generic "查看本卡代码" [ref=e199] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/structure.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e200] [cursor=pointer]:
            - /url: https://bklit.com/charts/sankey-chart
            - generic [ref=e201]: 对应官网示例
            - generic [ref=e202]: （新标签页打开）
        - region [ref=e203]:
          - generic [ref=e204]:
            - heading "Sankey Chart - Simple" [level=3] [ref=e205]
            - paragraph [ref=e206]: 减少节点的最简流向
          - generic [ref=e207]:
            - generic [ref=e208]:
              - button "更新数据" [ref=e209] [cursor=pointer]
              - button "重播动效" [ref=e211] [cursor=pointer]
            - generic [ref=e213]:
              - img [ref=e217]:
                - generic [ref=e218]:
                  - generic [ref=e219]:
                    - generic [ref=e220] [cursor=pointer]
                    - generic [ref=e221] [cursor=pointer]
                  - generic [ref=e222]:
                    - generic [ref=e223] [cursor=pointer]:
                      - generic [ref=e225]: 课程入口
                      - generic [ref=e227]: 0 sessions
                    - generic [ref=e229] [cursor=pointer]:
                      - generic [ref=e231]: 完成学习
                      - generic [ref=e233]: 280 sessions
                    - generic [ref=e235] [cursor=pointer]:
                      - generic [ref=e237]: 继续学习
                      - generic [ref=e239]: 120 sessions
              - paragraph [ref=e241]: 流量 · 人。中间节点流入量等于流出量；完成与继续学习是互斥结果。
              - group [ref=e242]:
                - generic "查看精确数据" [ref=e243] [cursor=pointer]
            - status [ref=e244]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e245]:
              - generic "查看本卡代码" [ref=e246] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/structure.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e247] [cursor=pointer]:
            - /url: https://bklit.com/charts/sankey-chart
            - generic [ref=e248]: 对应官网示例
            - generic [ref=e249]: （新标签页打开）
    - region [ref=e250]:
      - heading "图形材质" [level=2] [ref=e251]
      - region [ref=e253]:
        - generic [ref=e254]:
          - heading "Sankey Chart - Solid Links" [level=3] [ref=e255]
          - paragraph [ref=e256]: 实色连接替代渐变
        - generic [ref=e257]:
          - generic [ref=e258]:
            - button "更新数据" [ref=e259] [cursor=pointer]
            - button "重播动效" [ref=e261] [cursor=pointer]
          - generic [ref=e263]:
            - img [ref=e267]:
              - generic [ref=e268]:
                - generic [ref=e269]:
                  - generic [ref=e270] [cursor=pointer]
                  - generic [ref=e271] [cursor=pointer]
                  - generic [ref=e272] [cursor=pointer]
                  - generic [ref=e273] [cursor=pointer]
                - generic [ref=e274]:
                  - generic [ref=e275] [cursor=pointer]:
                    - generic [ref=e277]: 课程入口
                    - generic [ref=e279]: 0 sessions
                  - generic [ref=e281] [cursor=pointer]:
                    - generic [ref=e283]: 学习提醒
                    - generic [ref=e285]: 0 sessions
                  - generic [ref=e287] [cursor=pointer]:
                    - generic [ref=e289]: 观看视频
                    - generic [ref=e291]: 380 sessions
                  - generic [ref=e293] [cursor=pointer]:
                    - generic [ref=e295]: 阅读资料
                    - generic [ref=e297]: 220 sessions
                  - generic [ref=e299] [cursor=pointer]:
                    - generic [ref=e301]: 完成学习
                    - generic [ref=e303]: 420 sessions
                  - generic [ref=e305] [cursor=pointer]:
                    - generic [ref=e307]: 继续学习
                    - generic [ref=e309]: 180 sessions
            - paragraph [ref=e311]: 流量 · 人。中间节点流入量等于流出量；完成与继续学习是互斥结果。
            - group [ref=e312]:
              - generic "查看精确数据" [ref=e313] [cursor=pointer]
          - status [ref=e314]: 示例数据 · 已更新 0 次 · 已减少动效
          - group [ref=e315]:
            - generic "查看本卡代码" [ref=e316] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/structure.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e317] [cursor=pointer]:
          - /url: https://bklit.com/charts/sankey-chart
          - generic [ref=e318]: 对应官网示例
          - generic [ref=e319]: （新标签页打开）
    - region [ref=e320]:
      - heading "坐标与辅助读数" [level=2] [ref=e321]
      - region [ref=e323]:
        - generic [ref=e324]:
          - heading "Sankey Chart - No Labels" [level=3] [ref=e325]
          - paragraph [ref=e326]: 隐藏节点标签的紧凑流向图
        - generic [ref=e327]:
          - generic [ref=e328]:
            - button "更新数据" [ref=e329] [cursor=pointer]
            - button "重播动效" [ref=e331] [cursor=pointer]
          - generic [ref=e333]:
            - img [ref=e337]:
              - generic [ref=e338]:
                - generic [ref=e339]:
                  - generic [ref=e340] [cursor=pointer]
                  - generic [ref=e341] [cursor=pointer]
                  - generic [ref=e342] [cursor=pointer]
                  - generic [ref=e343] [cursor=pointer]
                - generic [ref=e344]:
                  - generic [ref=e345] [cursor=pointer]
                  - generic [ref=e347] [cursor=pointer]
                  - generic [ref=e349] [cursor=pointer]
                  - generic [ref=e351] [cursor=pointer]
                  - generic [ref=e353] [cursor=pointer]
                  - generic [ref=e355] [cursor=pointer]
            - paragraph [ref=e357]: 流量 · 人。中间节点流入量等于流出量；完成与继续学习是互斥结果。图上隐藏标签，可在提示和精确数据中读取来源与去向。
            - group [ref=e358]:
              - generic "查看精确数据" [ref=e359] [cursor=pointer]
          - status [ref=e360]: 示例数据 · 已更新 0 次 · 已减少动效
          - group [ref=e361]:
            - generic "查看本卡代码" [ref=e362] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/structure.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e363] [cursor=pointer]:
          - /url: https://bklit.com/charts/sankey-chart
          - generic [ref=e364]: 对应官网示例
          - generic [ref=e365]: （新标签页打开）
    - region [ref=e366]:
      - heading "交互与状态" [level=2] [ref=e367]
      - region [ref=e369]:
        - generic [ref=e370]:
          - heading "Sankey Chart - Interactive" [level=3] [ref=e371]
          - paragraph [ref=e372]: 从来源到结果的流向交互
        - generic [ref=e373]:
          - generic [ref=e374]:
            - button "更新数据" [ref=e375] [cursor=pointer]
            - button "重播动效" [ref=e377] [cursor=pointer]
          - generic [ref=e379]:
            - img [ref=e383]:
              - generic [ref=e384]:
                - generic [ref=e385]:
                  - generic [ref=e386] [cursor=pointer]
                  - generic [ref=e387] [cursor=pointer]
                  - generic [ref=e388] [cursor=pointer]
                  - generic [ref=e389] [cursor=pointer]
                - generic [ref=e390]:
                  - generic [ref=e391] [cursor=pointer]:
                    - generic [ref=e393]: 课程入口
                    - generic [ref=e395]: 0 sessions
                  - generic [ref=e397] [cursor=pointer]:
                    - generic [ref=e399]: 学习提醒
                    - generic [ref=e401]: 0 sessions
                  - generic [ref=e403] [cursor=pointer]:
                    - generic [ref=e405]: 观看视频
                    - generic [ref=e407]: 380 sessions
                  - generic [ref=e409] [cursor=pointer]:
                    - generic [ref=e411]: 阅读资料
                    - generic [ref=e413]: 220 sessions
                  - generic [ref=e415] [cursor=pointer]:
                    - generic [ref=e417]: 完成学习
                    - generic [ref=e419]: 420 sessions
                  - generic [ref=e421] [cursor=pointer]:
                    - generic [ref=e423]: 继续学习
                    - generic [ref=e425]: 180 sessions
            - paragraph [ref=e427]: 流量 · 人。中间节点流入量等于流出量；完成与继续学习是互斥结果。
            - group [ref=e428]:
              - generic "查看精确数据" [active] [ref=e429] [cursor=pointer]
          - status [ref=e430]: 示例数据 · 已更新 0 次 · 已减少动效
          - group [ref=e431]:
            - generic "查看本卡代码" [ref=e432] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/structure.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e433] [cursor=pointer]:
          - /url: https://bklit.com/charts/sankey-chart
          - generic [ref=e434]: 对应官网示例
          - generic [ref=e435]: （新标签页打开）
  - navigation "相关图型" [ref=e436]:
    - link "面积图" [ref=e437] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e439] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e441] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e443] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e445] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e447] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e449] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e451] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e453] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e455] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e457] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e459] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e461] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e463] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e465] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e467] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e469] [cursor=pointer]:
      - /url: "#chart-live-line"
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | import CHART_VARIANT_REFERENCE from "../../apps/playground/src/docs/components/chart-variants/reference.json" with { type: "json" };
  4   | 
  5   | const evidence = process.env.RAIN_CHART_VARIANTS_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/current";
  6   | 
  7   | test("[T01] variants remain on one page, local updates stay isolated and group navigation preserves the route", async ({ page }) => {
  8   |   await page.emulateMedia({ reducedMotion: "reduce" });
  9   |   await page.goto("/#chart-bar");
  10  |   const first = page.locator('[data-chart-variant="bar-default"]');
  11  |   const second = page.locator('[data-chart-variant="bar-multiple-series"]');
  12  |   await first.scrollIntoViewIfNeeded();
  13  |   await expect(first.locator('[data-ready="true"]')).toBeVisible();
  14  |   await first.getByRole("button", { name: "更新数据", exact: true }).click();
  15  |   await expect(first.getByRole("status").filter({ hasText: "已更新 1 次" })).toBeVisible();
  16  |   await expect(second.getByRole("status").filter({ hasText: "已更新 0 次" })).toHaveCount(1);
  17  |   await page.getByRole("button", { name: "基础结构", exact: true }).click();
  18  |   await expect(page.locator("#chart-bar-variants-structure")).toBeFocused();
  19  |   await expect(page).toHaveURL(/#chart-bar$/);
  20  |   for (const width of [1440, 900, 390]) {
  21  |     await page.setViewportSize({ width, height: 1000 });
  22  |     await first.scrollIntoViewIfNeeded();
  23  |     await first.getByText("查看本卡代码", { exact: true }).click();
  24  |     await expect(first.locator("pre")).toContainText('variantId="bar-default"');
  25  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  26  |     await mkdir(evidence, { recursive: true });
  27  |     await first.screenshot({ path: `${evidence}/bar-default-category-wide-normal-${width}-reduce.png` });
  28  |     await first.getByText("查看本卡代码", { exact: true }).click();
  29  |   }
  30  | });
  31  | 
  32  | test("[T03] each displayed card exposes its actual family source and current parameters", async ({ page }) => {
  33  |   await page.emulateMedia({ reducedMotion: "reduce" });
  34  |   await page.goto("/#chart-bar");
  35  |   const card = page.locator('[data-chart-variant="bar-default"]');
  36  |   await card.scrollIntoViewIfNeeded();
  37  |   await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
  38  |   await card.getByRole("button", { name: "更新数据", exact: true }).click();
  39  |   await card.getByText("查看本卡代码", { exact: true }).click();
  40  |   await expect(card.locator("pre")).toContainText('recipe="monochrome-blue" revision={1}');
  41  |   await card.getByRole("combobox", { name: "本卡源码文件" }).selectOption("chart-variants/bar.tsx");
  42  |   await expect(card.locator("pre")).toContainText("export function BarVariant");
  43  |   const href = await card.getByRole("link", { name: "下载 chart-variants/bar.tsx", exact: true }).getAttribute("href");
  44  |   expect(decodeURIComponent(href!)).toContain('from "@rain-next/ui/charts"');
  45  | });
  46  | 
  47  | const familyIds = [...new Set(CHART_VARIANT_REFERENCE.map(row => row.chartId))];
  48  | for (const family of familyIds) {
  49  |   const variants = CHART_VARIANT_REFERENCE.filter(row => row.chartId === family);
  50  |   test(`[T13] ${family}: all ${variants.length} frozen cards render real geometry and readable data at 1440 and 390`, async ({ page }) => {
  51  |     test.setTimeout(180_000);
  52  |     const errors: string[] = [];
  53  |     page.on("pageerror", error => errors.push(error.message));
  54  |     page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  55  |     await page.emulateMedia({ reducedMotion: "reduce" });
  56  |     await page.setViewportSize({ width: 1440, height: 1000 });
  57  |     await page.goto(`/#chart-${family}`);
  58  |     await expect(page.locator("[data-chart-variant]")).toHaveCount(variants.length);
  59  |     await mkdir(evidence, { recursive: true });
  60  |     const audit: Record<string, unknown>[] = [];
  61  |     for (const width of [1440, 390]) {
  62  |       await page.setViewportSize({ width, height: 1000 });
  63  |       for (const variant of variants) {
  64  |         const card = page.locator(`[data-chart-variant="${variant.id}"]`);
  65  |         await card.scrollIntoViewIfNeeded();
  66  |         await expect(card.locator('[data-ready="true"]')).toBeVisible();
  67  |         await expect(card).toHaveAttribute("data-active", "true");
  68  |         const showData = card.getByRole("button", { name: "显示数据", exact: true });
  69  |         if (await showData.count()) await showData.click();
  70  |         const geometry = async () => card.locator(".rain-chart-variant__plot").evaluate(plot => {
  71  |           const roots = [...plot.querySelectorAll('[data-slot="chart-root"]')];
  72  |           const invalid: string[] = [];
  73  |           const marks = roots.flatMap(root => [...root.querySelectorAll("svg path[d], svg rect, svg circle, svg polygon, svg line")]).filter(node => {
  74  |             if (node.closest("defs, clipPath, mask")) return false;
  75  |             for (const name of ["d", "points", "x", "y", "width", "height", "cx", "cy", "r", "x1", "x2", "y1", "y2"]) {
  76  |               const value = node.getAttribute(name);
  77  |               if (value && /NaN|Infinity|undefined/.test(value)) invalid.push(`${node.tagName}.${name}=${value}`);
  78  |             }
  79  |             const rect = node.getBoundingClientRect();
  80  |             const style = getComputedStyle(node);
  81  |             const painted = style.fill !== "none" && style.fill !== "transparent" && style.fill !== "rgba(0, 0, 0, 0)" || style.stroke !== "none" && style.stroke !== "transparent";
  82  |             return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0 && painted;
  83  |           });
  84  |           return { nativeRoots: roots.length, visibleMarks: marks.length, paths: marks.filter(node => node.tagName.toLowerCase() === "path").length, invalid };
  85  |         });
  86  |         await expect.poll(async () => (await geometry()).visibleMarks, { message: `${variant.id} has painted finite native marks at ${width}px` }).toBeGreaterThan(0);
  87  |         const result = await geometry();
  88  |         expect(result.nativeRoots, variant.id).toBeGreaterThan(0);
  89  |         expect(result.invalid, variant.id).toEqual([]);
  90  |         const summary = card.getByText("查看精确数据", { exact: true });
  91  |         await summary.click();
  92  |         const table = card.getByRole("table");
  93  |         await expect(table, `${variant.id} exact data is readable`).toBeVisible();
  94  |         const rows = await table.locator("tbody tr").count();
  95  |         expect(rows, variant.id).toBeGreaterThan(0);
  96  |         expect(await table.textContent(), variant.id).not.toMatch(/NaN|Infinity|undefined/);
  97  |         await summary.click();
> 98  |         expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${variant.id} at ${width}px`).toBe(true);
      |                                                                                                                                  ^ Error: sankey-interactive at 390px
  99  |         const duplicateDefs = await page.evaluate(() => {
  100 |           const ids = [...document.querySelectorAll("svg defs [id]")].map(node => node.id);
  101 |           return ids.filter((id, index) => ids.indexOf(id) !== index);
  102 |         });
  103 |         expect(duplicateDefs, `${variant.id} SVG definitions are instance-safe`).toEqual([]);
  104 |         audit.push({ id: variant.id, width, ...result, rows, duplicateDefs });
  105 |         if (variant === variants[0]) {
  106 |           await card.scrollIntoViewIfNeeded();
  107 |           await card.screenshot({ path: `${evidence}/${family}-${width}-all-variants-reduce.png` });
  108 |         }
  109 |       }
  110 |     }
  111 |     await writeFile(`${evidence}/${family}-render-audit.json`, `${JSON.stringify({ family, count: variants.length, errors, audit }, null, 2)}\n`);
  112 |     expect(errors, `${family} browser errors`).toEqual([]);
  113 |   });
  114 | }
  115 | 
```