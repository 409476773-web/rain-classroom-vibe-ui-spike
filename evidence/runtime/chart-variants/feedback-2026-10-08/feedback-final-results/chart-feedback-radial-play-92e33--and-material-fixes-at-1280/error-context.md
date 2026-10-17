# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-radial.spec.ts >> playground radial readings and material fixes at 1280
- Location: tests/e2e/chart-feedback-radial.spec.ts:9:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 311.34375
Received:   311.34375
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "仪表图" [active] [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 单项达成率的弧形或线形刻度表达。
  - generic [ref=e11]:
    - heading "图型与可选配方" [level=2] [ref=e12]
    - paragraph [ref=e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e17]:
            - option "清晰线与轻面积" [selected]
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
          - text: 形态
          - combobox "仪表形态" [ref=e26] [cursor=pointer]:
            - option "弧形刻度" [selected]
            - option "线形刻度"
        - generic [ref=e27]:
          - text: 读数
          - combobox "仪表读数" [ref=e28] [cursor=pointer]:
            - option "当前数据" [selected]
            - option "50%"
            - option "100%"
        - generic [ref=e33]:
          - generic:
            - generic:
              - generic:
                - img "76":
                  - generic:
                    - generic:
                      - generic:
                        - generic: "7"
                        - generic: "6"
                - text: "%"
              - generic: 目标达成率
        - group [ref=e105]:
          - generic "查看精确数据" [ref=e106] [cursor=pointer]
      - status [ref=e107]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - generic [ref=e108]:
    - heading "数据与使用边界" [level=2] [ref=e109]
    - paragraph [ref=e110]: value限定0—100；业务量程需先归一，中心显示同一比率。
    - paragraph [ref=e111]: 本例不提供任意量程或阈值告警的语义。
    - paragraph [ref=e112]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=e113]:
    - region [ref=e114]:
      - heading "API 与结构" [level=2] [ref=e115]
      - table [ref=e117]:
        - caption [ref=e118]: 仪表图 常用接口
        - rowgroup [ref=e119]:
          - row [ref=e120]:
            - columnheader "名称" [ref=e121]
            - columnheader "类型" [ref=e122]
            - columnheader "默认" [ref=e123]
            - columnheader "说明" [ref=e124]
        - rowgroup [ref=e125]:
          - row [ref=e126]:
            - rowheader [ref=e127]:
              - code [ref=e128]: data / value
            - cell [ref=e129]:
              - code [ref=e130]: 原生图型合同
            - cell "—" [ref=e131]
            - cell "value限定0—100；业务量程需先归一，中心显示同一比率。" [ref=e132]
          - row [ref=e133]:
            - rowheader [ref=e134]:
              - code [ref=e135]: children
            - cell [ref=e136]:
              - code [ref=e137]: Compound Parts
            - cell "—" [ref=e138]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e139]
          - row [ref=e140]:
            - rowheader [ref=e141]:
              - code [ref=e142]: className / style / margin
            - cell [ref=e143]:
              - code [ref=e144]: 原生尺寸接口
            - cell "—" [ref=e145]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e146]
          - row [ref=e147]:
            - rowheader [ref=e148]:
              - code [ref=e149]: enterTransition / animationDuration
            - cell [ref=e150]:
              - code [ref=e151]: 原生动效配置
            - cell "—" [ref=e152]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e153]
      - paragraph [ref=e154]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e155]:
      - heading "调用示例" [level=2] [ref=e156]
      - generic [ref=e157]:
        - generic [ref=e158]:
          - button "复制代码" [ref=e159] [cursor=pointer]
          - status
        - code [ref=e162]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-gauge\" data-recipe=\"trend-soft\"> <ChartExample id=\"gauge\" recipe=\"trend-soft\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e163]:
        - text: 当前源码：
        - code [ref=e164]: packages/ui/src/charts/vendor/charts/gauge.tsx
  - group [ref=e165]:
    - generic "调用配置、完整源码与示例数据" [ref=e166] [cursor=pointer]
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
  - region "全部图表变体" [ref=e167]:
    - navigation "变体分组" [ref=e168]:
      - button "基础结构" [ref=e169] [cursor=pointer]
      - button "图形材质" [ref=e171] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e173] [cursor=pointer]
    - region [ref=e175]:
      - heading "基础结构" [level=2] [ref=e176]
      - generic [ref=e177]:
        - region [ref=e178]:
          - generic [ref=e179]:
            - heading "Gauge" [level=3] [ref=e180]
            - paragraph [ref=e181]: 刻度弧、主题填充与中心数值
          - generic [ref=e182]:
            - generic [ref=e183]:
              - button "更新数据" [ref=e184] [cursor=pointer]
              - button "重播动效" [ref=e186] [cursor=pointer]
            - paragraph [ref=e189]: 滚动到此处查看示例
            - status [ref=e190]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e191]:
              - generic "查看本卡代码" [ref=e192] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e193] [cursor=pointer]:
            - /url: https://bklit.com/charts/gauge-chart
            - generic [ref=e194]: 对应官网示例
            - generic [ref=e195]: （新标签页打开）
        - region [ref=e196]:
          - generic [ref=e197]:
            - heading "Gauge — sparse ring, quarter sweep" [level=3] [ref=e198]
            - paragraph [ref=e199]: 稀疏刻度的局部弧段；角度按源例复核
          - generic [ref=e200]:
            - generic [ref=e201]:
              - button "更新数据" [ref=e202] [cursor=pointer]
              - button "重播动效" [ref=e204] [cursor=pointer]
            - paragraph [ref=e207]: 滚动到此处查看示例
            - status [ref=e208]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e209]:
              - generic "查看本卡代码" [ref=e210] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e211] [cursor=pointer]:
            - /url: https://bklit.com/charts/gauge-chart
            - generic [ref=e212]: 对应官网示例
            - generic [ref=e213]: （新标签页打开）
        - region [ref=e214]:
          - generic [ref=e215]:
            - heading "Gauge — same density, bottom half sweep" [level=3] [ref=e216]
            - paragraph [ref=e217]: 保持稀疏刻度并转向下半圆
          - generic [ref=e218]:
            - generic [ref=e219]:
              - button "更新数据" [ref=e220] [cursor=pointer]
              - button "重播动效" [ref=e222] [cursor=pointer]
            - paragraph [ref=e225]: 滚动到此处查看示例
            - status [ref=e226]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e227]:
              - generic "查看本卡代码" [ref=e228] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e229] [cursor=pointer]:
            - /url: https://bklit.com/charts/gauge-chart
            - generic [ref=e230]: 对应官网示例
            - generic [ref=e231]: （新标签页打开）
        - region [ref=e232]:
          - generic [ref=e233]:
            - heading "Gauge — flipped sweep (270° → 450°)" [level=3] [ref=e234]
            - paragraph [ref=e235]: 旋转弧段，使缺口位于另一侧
          - generic [ref=e236]:
            - generic [ref=e237]:
              - button "更新数据" [ref=e238] [cursor=pointer]
              - button "重播动效" [ref=e240] [cursor=pointer]
            - paragraph [ref=e243]: 滚动到此处查看示例
            - status [ref=e244]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e245]:
              - generic "查看本卡代码" [ref=e246] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e247] [cursor=pointer]:
            - /url: https://bklit.com/charts/gauge-chart
            - generic [ref=e248]: 对应官网示例
            - generic [ref=e249]: （新标签页打开）
        - region [ref=e250]:
          - generic [ref=e251]:
            - heading "Gauge — linear notch track" [level=3] [ref=e252]
            - paragraph [ref=e253]: 响应容器宽度的横向刻度条
          - generic [ref=e254]:
            - generic [ref=e255]:
              - button "更新数据" [ref=e256] [cursor=pointer]
              - button "重播动效" [ref=e258] [cursor=pointer]
            - paragraph [ref=e261]: 滚动到此处查看示例
            - status [ref=e262]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e263]:
              - generic "查看本卡代码" [ref=e264] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e265] [cursor=pointer]:
            - /url: https://bklit.com/charts/gauge-chart
            - generic [ref=e266]: 对应官网示例
            - generic [ref=e267]: （新标签页打开）
    - region [ref=e268]:
      - heading "图形材质" [level=2] [ref=e269]
      - generic [ref=e270]:
        - region [ref=e271]:
          - generic [ref=e272]:
            - heading "Gauge — tight arc, filleted corners" [level=3] [ref=e273]
            - paragraph [ref=e274]: 无刻度间隙、圆角与自定弧段
          - generic [ref=e275]:
            - generic [ref=e276]:
              - button "更新数据" [ref=e277] [cursor=pointer]
              - button "重播动效" [ref=e279] [cursor=pointer]
            - paragraph [ref=e282]: 滚动到此处查看示例
            - status [ref=e283]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e284]:
              - generic "查看本卡代码" [ref=e285] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e286] [cursor=pointer]:
            - /url: https://bklit.com/charts/gauge-chart
            - generic [ref=e287]: 对应官网示例
            - generic [ref=e288]: （新标签页打开）
        - region [ref=e289]:
          - generic [ref=e290]:
            - heading "Gauge — dual arc gradients" [level=3] [ref=e291]
            - paragraph [ref=e292]: 激活及未激活弧段分别渐变
          - generic [ref=e293]:
            - generic [ref=e294]:
              - button "更新数据" [ref=e295] [cursor=pointer]
              - button "重播动效" [ref=e297] [cursor=pointer]
            - paragraph [ref=e299]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=e301]: 滚动到此处查看示例
            - status [ref=e302]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e303]:
              - generic "查看本卡代码" [ref=e304] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e305] [cursor=pointer]:
            - /url: https://bklit.com/charts/gauge-chart
            - generic [ref=e306]: 对应官网示例
            - generic [ref=e307]: （新标签页打开）
        - region [ref=e308]:
          - generic [ref=e309]:
            - heading "Gauge — pattern foreground, dim solid track" [level=3] [ref=e310]
            - paragraph [ref=e311]: 前景图案与低透明度实色轨道
          - generic [ref=e312]:
            - generic [ref=e313]:
              - button "更新数据" [ref=e314] [cursor=pointer]
              - button "重播动效" [ref=e316] [cursor=pointer]
            - paragraph [ref=e319]: 滚动到此处查看示例
            - status [ref=e320]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e321]:
              - generic "查看本卡代码" [ref=e322] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e323] [cursor=pointer]:
            - /url: https://bklit.com/charts/gauge-chart
            - generic [ref=e324]: 对应官网示例
            - generic [ref=e325]: （新标签页打开）
        - region [ref=e326]:
          - generic [ref=e327]:
            - heading "Gauge — soft fillets, full depth" [level=3] [ref=e328]
            - paragraph [ref=e329]: 保留刻度深度并柔化圆角
          - generic [ref=e330]:
            - generic [ref=e331]:
              - button "更新数据" [ref=e332] [cursor=pointer]
              - button "重播动效" [ref=e334] [cursor=pointer]
            - paragraph [ref=e337]: 滚动到此处查看示例
            - status [ref=e338]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e339]:
              - generic "查看本卡代码" [ref=e340] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e341] [cursor=pointer]:
            - /url: https://bklit.com/charts/gauge-chart
            - generic [ref=e342]: 对应官网示例
            - generic [ref=e343]: （新标签页打开）
        - region [ref=e344]:
          - generic [ref=e345]:
            - heading "Gauge — short notches, bold corners" [level=3] [ref=e346]
            - paragraph [ref=e347]: 缩短刻度径向深度并加大圆角
          - generic [ref=e348]:
            - generic [ref=e349]:
              - button "更新数据" [ref=e350] [cursor=pointer]
              - button "重播动效" [ref=e352] [cursor=pointer]
            - paragraph [ref=e355]: 滚动到此处查看示例
            - status [ref=e356]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e357]:
              - generic "查看本卡代码" [ref=e358] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e359] [cursor=pointer]:
            - /url: https://bklit.com/charts/gauge-chart
            - generic [ref=e360]: 对应官网示例
            - generic [ref=e361]: （新标签页打开）
        - region [ref=e362]:
          - generic [ref=e363]:
            - heading "Gauge — near-circular notches" [level=3] [ref=e364]
            - paragraph [ref=e365]: 几何约束下近圆形刻度
          - generic [ref=e366]:
            - generic [ref=e367]:
              - button "更新数据" [ref=e368] [cursor=pointer]
              - button "重播动效" [ref=e370] [cursor=pointer]
            - paragraph [ref=e373]: 滚动到此处查看示例
            - status [ref=e374]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e375]:
              - generic "查看本卡代码" [ref=e376] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e377] [cursor=pointer]:
            - /url: https://bklit.com/charts/gauge-chart
            - generic [ref=e378]: 对应官网示例
            - generic [ref=e379]: （新标签页打开）
        - region [ref=e380]:
          - generic [ref=e381]:
            - heading "Gauge — linear dual gradients" [level=3] [ref=e382]
            - paragraph [ref=e383]: 横向激活及未激活刻度分别渐变
          - generic [ref=e384]:
            - generic [ref=e385]:
              - button "更新数据" [ref=e386] [cursor=pointer]
              - button "重播动效" [ref=e388] [cursor=pointer]
            - paragraph [ref=e390]: 本卡使用独立示例配色，保留材质或色阶差异。
            - generic [ref=e391]:
              - group "预设进度" [ref=e523]:
                - button "0%" [ref=e524] [cursor=pointer]
                - button "50%" [ref=e525] [cursor=pointer]
                - button "100%" [ref=e526] [cursor=pointer]
                - status "当前进度" [ref=e527]: 72%
              - group [ref=e528]:
                - generic "查看精确数据" [ref=e529] [cursor=pointer]
            - status [ref=e530]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e531]:
              - generic "查看本卡代码" [ref=e532] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/comparison.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e533] [cursor=pointer]:
            - /url: https://bklit.com/charts/gauge-chart
            - generic [ref=e534]: 对应官网示例
            - generic [ref=e535]: （新标签页打开）
    - region [ref=e536]:
      - heading "坐标与辅助读数" [level=2] [ref=e537]
      - region [ref=e539]:
        - generic [ref=e540]:
          - heading "Gauge — linear with label below" [level=3] [ref=e541]
          - paragraph [ref=e542]: 横向刻度条下方显示标签与值
        - generic [ref=e543]:
          - generic [ref=e544]:
            - button "更新数据" [ref=e545] [cursor=pointer]
            - button "重播动效" [ref=e547] [cursor=pointer]
          - generic [ref=e549]:
            - generic [ref=e683]:
              - generic [ref=e684]:
                - img "72" [ref=e685]:
                  - generic [ref=e688]:
                    - generic [ref=e689]: "7"
                    - generic [ref=e691]: "2"
                - text: "%"
              - generic [ref=e693]: 完成进度
            - group "预设进度" [ref=e694]:
              - button "0%" [ref=e695] [cursor=pointer]
              - button "50%" [ref=e696] [cursor=pointer]
              - button "100%" [ref=e697] [cursor=pointer]
              - status "当前进度" [ref=e698]: 72%
            - group [ref=e699]:
              - generic "查看精确数据" [ref=e700] [cursor=pointer]
          - status [ref=e701]: 示例数据 · 已更新 0 次 · 已减少动效
          - group [ref=e702]:
            - generic "查看本卡代码" [ref=e703] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/comparison.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e704] [cursor=pointer]:
          - /url: https://bklit.com/charts/gauge-chart
          - generic [ref=e705]: 对应官网示例
          - generic [ref=e706]: （新标签页打开）
  - navigation "相关图型" [ref=e707]:
    - link "面积图" [ref=e708] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e710] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e712] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e714] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e716] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e718] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e720] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e722] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e724] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e726] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e728] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e730] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e732] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e734] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e736] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e738] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e740] [cursor=pointer]:
      - /url: "#chart-live-line"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { mkdir, writeFile } from "node:fs/promises";
  3  | 
  4  | const evidence = process.env.RAIN_CHART_FEEDBACK_RADIAL_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/feedback-2026-10-08/radial";
  5  | for (const site of [
  6  |   { name: "playground", base: "http://127.0.0.1:5173/" },
  7  |   { name: "prototype", base: "http://127.0.0.1:5387/bklit-catalog.html" },
  8  | ]) for (const width of [1280, 390]) {
  9  |   test(`${site.name} radial readings and material fixes at ${width}`, async ({ page }) => {
  10 |     await page.emulateMedia({ reducedMotion: "reduce" });
  11 |     await page.setViewportSize({ width, height: 796 });
  12 |     const facts: unknown[] = [];
  13 |     await mkdir(evidence, { recursive: true });
  14 |     await page.goto(`${site.base}#chart-pie`);
  15 |     const donut = page.locator('[data-chart-variant="pie-donut"]');
  16 |     await donut.scrollIntoViewIfNeeded();
  17 |     await expect(donut.locator('[data-slot="chart-stat-suffix"]')).toHaveText("人");
  18 |     const reading = await donut.locator(".rain-chart-center-value").evaluate(node => {
  19 |       const number = node.querySelector("number-flow-react")!;
  20 |       const unit = node.querySelector("small")!;
  21 |       return { value: number.getAttribute("aria-label"), gap: unit.getBoundingClientRect().left - number.getBoundingClientRect().right,
  22 |         valueFont: parseFloat(getComputedStyle(node).fontSize), unitFont: parseFloat(getComputedStyle(unit).fontSize) };
  23 |     });
  24 |     expect(reading.value).toBe("500");
  25 |     expect(reading.gap).toBeGreaterThanOrEqual(0);
  26 |     expect(reading.gap).toBeLessThanOrEqual(4);
  27 |     expect(reading.unitFont).toBeLessThan(reading.valueFont * .8);
  28 |     facts.push({ id: "pie-donut", ...reading });
  29 |     await donut.screenshot({ path: `${evidence}/${site.name}-pie-donut-${width}.png` });
  30 | 
  31 |     const gradient = page.locator('[data-chart-variant="pie-gradients"]');
  32 |     await gradient.scrollIntoViewIfNeeded();
  33 |     await expect(gradient.locator("radialGradient")).toHaveCount(3);
  34 |     const hues = await gradient.locator("radialGradient").evaluateAll(nodes => nodes.map(node => [...node.querySelectorAll("stop")].map(stop => stop.getAttribute("stop-color"))));
  35 |     expect(hues.every(colors => new Set(colors).size === 1)).toBe(true);
  36 |     facts.push({ id: "pie-gradients", hues });
  37 |     await gradient.screenshot({ path: `${evidence}/${site.name}-pie-gradients-${width}.png` });
  38 |     const pattern = page.locator('[data-chart-variant="pie-patterns"]');
  39 |     await pattern.scrollIntoViewIfNeeded();
  40 |     await pattern.locator('svg path[fill="transparent"]').first().hover();
  41 |     const filters = await pattern.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).filter));
  42 |     expect(filters.every(filter => filter === "none")).toBe(true);
  43 |     facts.push({ id: "pie-patterns", filters });
  44 |     await pattern.screenshot({ path: `${evidence}/${site.name}-pie-patterns-hover-${width}.png` });
  45 | 
  46 |     await page.goto(`${site.base}#chart-ring`);
  47 |     const ring = page.locator('[data-chart-variant="ring-default"]');
  48 |     await ring.scrollIntoViewIfNeeded();
  49 |     await expect(ring.locator(".rain-chart-center-reading")).toHaveText("70.0%阅读进度28 / 40 项");
  50 |     await ring.screenshot({ path: `${evidence}/${site.name}-ring-default-${width}.png` });
  51 |     const legend = page.locator('[data-chart-variant="ring-legend"]');
  52 |     await legend.scrollIntoViewIfNeeded();
  53 |     await legend.getByRole("button", { name: /^练习进度/ }).focus();
  54 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("66.7%练习进度8 / 12 项");
  55 |     await legend.getByRole("button", { name: /^练习进度/ }).blur();
  56 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("70.0%阅读进度28 / 40 项");
  57 |     facts.push({ id: "ring-default", defaultReading: "70.0% / 阅读进度 / 28 of 40", hoverReading: "66.7% / 练习进度 / 8 of 12" });
  58 | 
  59 |     await page.goto(`${site.base}#chart-gauge`);
  60 |     const gauge = page.locator('[data-chart-variant="gauge-linear-label-below"]');
  61 |     await gauge.scrollIntoViewIfNeeded();
  62 |     await expect(gauge.getByRole("img", { name: "72", exact: true })).toBeVisible();
  63 |     await expect(gauge.locator("svg path")).toHaveCount(124);
  64 |     const notches = await gauge.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).opacity));
  65 |     expect(notches.every(opacity => opacity === "1")).toBe(true);
  66 |     const layout = await gauge.locator('[class*="@container/chart-center"]').evaluate(node => {
  67 |       const [value, label] = [...node.querySelectorAll(":scope > span")].map(span => span.getBoundingClientRect().toJSON());
  68 |       return { direction: getComputedStyle(node).flexDirection, value, label };
  69 |     });
  70 |     expect(layout.direction).toBe("row");
> 71 |     expect(layout.label!.left).toBeGreaterThan(layout.value!.right);
     |                                ^ Error: expect(received).toBeGreaterThan(expected)
  72 |     expect(layout.label!.top).toBeLessThan(layout.value!.bottom);
  73 |     facts.push({ id: "gauge-linear-label-below", notches, ...layout });
  74 |     await gauge.screenshot({ path: `${evidence}/${site.name}-gauge-linear-${width}.png` });
  75 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  76 |     await writeFile(`${evidence}/${site.name}-${width}-facts.json`, JSON.stringify(facts, null, 2));
  77 |   });
  78 | }
  79 | 
```