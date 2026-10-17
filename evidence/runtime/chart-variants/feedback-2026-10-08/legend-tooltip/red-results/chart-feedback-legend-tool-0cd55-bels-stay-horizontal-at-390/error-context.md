# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-legend-tooltip.spec.ts >> chart labels stay horizontal at 390
- Location: tests/e2e/chart-feedback-legend-tooltip.spec.ts:13:3

# Error details

```
Error: bar: 参与人数 · 人

expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 6
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "柱状图" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 分组比较、互斥堆叠、同色渐变与圆头渐隐柱。
  - generic [ref=e11]:
    - heading "图型与可选配方" [level=2] [ref=e12]
    - paragraph [ref=e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e17]:
            - option "蓝紫近邻"
            - option "多色类别" [selected]
            - option "协调实色"
            - option "蓝灰单色"
            - option "同色渐变柱"
            - option "圆头渐隐柱"
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
        - generic [ref=e27]:
          - text: 柱形
          - combobox "柱形配方" [ref=e28] [cursor=pointer]:
            - option "分组柱" [selected]
            - option "互斥等级堆叠"
        - generic [ref=e29]:
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
        - generic [ref=e59]:
          - button "参与人数 · 人" [ref=e61] [cursor=pointer]
          - button "完成人数 · 人" [ref=e65] [cursor=pointer]
          - button "复习人数 · 人" [ref=e69] [cursor=pointer]
        - group [ref=e72]:
          - generic "查看精确数据" [ref=e73] [cursor=pointer]
      - status [ref=e74]: 示例数据 · 已更新 0 次
  - generic [ref=e75]:
    - heading "数据与使用边界" [level=2] [ref=e76]
    - paragraph [ref=e77]: 类别键唯一；分组人数不可相加，堆叠改用互斥等级人数。
    - paragraph [ref=e78]: 原生柱坐标以0为下界，本例拒绝负值。
    - paragraph [ref=e79]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=e80]:
    - region [ref=e81]:
      - heading "API 与结构" [level=2] [ref=e82]
      - table [ref=e84]:
        - caption [ref=e85]: 柱状图 常用接口
        - rowgroup [ref=e86]:
          - row [ref=e87]:
            - columnheader "名称" [ref=e88]
            - columnheader "类型" [ref=e89]
            - columnheader "默认" [ref=e90]
            - columnheader "说明" [ref=e91]
        - rowgroup [ref=e92]:
          - row [ref=e93]:
            - rowheader [ref=e94]:
              - code [ref=e95]: data / value
            - cell [ref=e96]:
              - code [ref=e97]: 原生图型合同
            - cell "—" [ref=e98]
            - cell "类别键唯一；分组人数不可相加，堆叠改用互斥等级人数。" [ref=e99]
          - row [ref=e100]:
            - rowheader [ref=e101]:
              - code [ref=e102]: children
            - cell [ref=e103]:
              - code [ref=e104]: Compound Parts
            - cell "—" [ref=e105]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e106]
          - row [ref=e107]:
            - rowheader [ref=e108]:
              - code [ref=e109]: className / style / margin
            - cell [ref=e110]:
              - code [ref=e111]: 原生尺寸接口
            - cell "—" [ref=e112]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e113]
          - row [ref=e114]:
            - rowheader [ref=e115]:
              - code [ref=e116]: enterTransition / animationDuration
            - cell [ref=e117]:
              - code [ref=e118]: 原生动效配置
            - cell "—" [ref=e119]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e120]
      - paragraph [ref=e121]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e122]:
      - heading "调用示例" [level=2] [ref=e123]
      - generic [ref=e124]:
        - generic [ref=e125]:
          - button "复制代码" [ref=e126] [cursor=pointer]
          - status
        - code [ref=e129]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-bar\" data-recipe=\"category-wide\"> <ChartExample id=\"bar\" recipe=\"category-wide\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e130]:
        - text: 当前源码：
        - code [ref=e131]: packages/ui/src/charts/vendor/charts/bar-chart.tsx
  - group [ref=e132]:
    - generic "调用配置、完整源码与示例数据" [ref=e133] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-variants/profit-loss.tsx"
    - option "chart-variants/shared.tsx"
    - option "chart-data.ts"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
  - region "全部图表变体" [ref=e134]:
    - navigation "变体分组" [ref=e135]:
      - button "基础结构" [ref=e136] [cursor=pointer]
      - button "图形材质" [ref=e138] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e140] [cursor=pointer]
      - button "交互与状态" [ref=e142] [cursor=pointer]
    - region [ref=e144]:
      - heading "基础结构" [level=2] [ref=e145]
      - generic [ref=e146]:
        - region [ref=e147]:
          - generic [ref=e148]:
            - heading "Bar Chart" [level=3] [ref=e149]
            - paragraph [ref=e150]: 默认圆头纵向柱
          - generic [ref=e151]:
            - generic [ref=e152]:
              - button "更新数据" [ref=e153] [cursor=pointer]
              - button "重播动效" [ref=e155] [cursor=pointer]
            - paragraph [ref=e158]: 滚动到此处查看示例
            - status [ref=e159]: 示例数据 · 已更新 0 次
            - group [ref=e160]:
              - generic "查看本卡代码" [ref=e161] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e162] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e163]: 对应官网示例
            - generic [ref=e164]: （新标签页打开）
        - region [ref=e165]:
          - generic [ref=e166]:
            - heading "Bar Chart - 3D Stacked" [level=3] [ref=e167]
            - paragraph [ref=e168]: 分段侧面的立体堆叠柱
          - generic [ref=e169]:
            - generic [ref=e170]:
              - button "更新数据" [ref=e171] [cursor=pointer]
              - button "重播动效" [ref=e173] [cursor=pointer]
            - paragraph [ref=e176]: 滚动到此处查看示例
            - status [ref=e177]: 示例数据 · 已更新 0 次
            - group [ref=e178]:
              - generic "查看本卡代码" [ref=e179] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e180] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e181]: 对应官网示例
            - generic [ref=e182]: （新标签页打开）
        - region [ref=e183]:
          - generic [ref=e184]:
            - heading "Bar Chart - Multiple Series" [level=3] [ref=e185]
            - paragraph [ref=e186]: 按类别比较多系列分组柱
          - generic [ref=e187]:
            - generic [ref=e188]:
              - button "更新数据" [ref=e189] [cursor=pointer]
              - button "重播动效" [ref=e191] [cursor=pointer]
            - paragraph [ref=e194]: 滚动到此处查看示例
            - status [ref=e195]: 示例数据 · 已更新 0 次
            - group [ref=e196]:
              - generic "查看本卡代码" [ref=e197] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e198] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e199]: 对应官网示例
            - generic [ref=e200]: （新标签页打开）
        - region [ref=e201]:
          - generic [ref=e202]:
            - heading "Bar Chart - Stacked" [level=3] [ref=e203]
            - paragraph [ref=e204]: 互斥类别的分段间隔堆叠
          - generic [ref=e205]:
            - generic [ref=e206]:
              - button "更新数据" [ref=e207] [cursor=pointer]
              - button "重播动效" [ref=e209] [cursor=pointer]
            - paragraph [ref=e212]: 滚动到此处查看示例
            - status [ref=e213]: 示例数据 · 已更新 0 次
            - group [ref=e214]:
              - generic "查看本卡代码" [ref=e215] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e216] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e217]: 对应官网示例
            - generic [ref=e218]: （新标签页打开）
        - region [ref=e219]:
          - generic [ref=e220]:
            - heading "Bar Chart - Horizontal" [level=3] [ref=e221]
            - paragraph [ref=e222]: 横向柱与纵向类别标签
          - generic [ref=e223]:
            - generic [ref=e224]:
              - button "更新数据" [ref=e225] [cursor=pointer]
              - button "重播动效" [ref=e227] [cursor=pointer]
            - paragraph [ref=e230]: 滚动到此处查看示例
            - status [ref=e231]: 示例数据 · 已更新 0 次
            - group [ref=e232]:
              - generic "查看本卡代码" [ref=e233] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e234] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e235]: 对应官网示例
            - generic [ref=e236]: （新标签页打开）
        - region [ref=e237]:
          - generic [ref=e238]:
            - heading "Bar Chart - Dense Data" [level=3] [ref=e239]
            - paragraph [ref=e240]: 60天密集柱与窄间隔
          - generic [ref=e241]:
            - generic [ref=e242]:
              - button "更新数据" [ref=e243] [cursor=pointer]
              - button "重播动效" [ref=e245] [cursor=pointer]
            - paragraph [ref=e248]: 滚动到此处查看示例
            - status [ref=e249]: 示例数据 · 已更新 0 次
            - group [ref=e250]:
              - generic "查看本卡代码" [ref=e251] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e252] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e253]: 对应官网示例
            - generic [ref=e254]: （新标签页打开）
        - region [ref=e255]:
          - generic [ref=e256]:
            - heading "Bar Chart - No Gap" [level=3] [ref=e257]
            - paragraph [ref=e258]: 零间隙柱、渐变与线指示器
          - generic [ref=e259]:
            - generic [ref=e260]:
              - button "更新数据" [ref=e261] [cursor=pointer]
              - button "重播动效" [ref=e263] [cursor=pointer]
            - paragraph [ref=e266]: 滚动到此处查看示例
            - status [ref=e267]: 示例数据 · 已更新 0 次
            - group [ref=e268]:
              - generic "查看本卡代码" [ref=e269] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e270] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e271]: 对应官网示例
            - generic [ref=e272]: （新标签页打开）
    - region [ref=e273]:
      - heading "图形材质" [level=2] [ref=e274]
      - generic [ref=e275]:
        - region [ref=e276]:
          - generic [ref=e277]:
            - heading "Bar Chart - 3D Depth" [level=3] [ref=e278]
            - paragraph [ref=e279]: 顶面侧面构成立体柱及线指示器
          - generic [ref=e280]:
            - generic [ref=e281]:
              - button "更新数据" [ref=e282] [cursor=pointer]
              - button "重播动效" [ref=e284] [cursor=pointer]
            - paragraph [ref=e287]: 滚动到此处查看示例
            - status [ref=e288]: 示例数据 · 已更新 0 次
            - group [ref=e289]:
              - generic "查看本卡代码" [ref=e290] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e291] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e292]: 对应官网示例
            - generic [ref=e293]: （新标签页打开）
        - region [ref=e294]:
          - generic [ref=e295]:
            - heading "Bar Chart - Gradient" [level=3] [ref=e296]
            - paragraph [ref=e297]: 系列渐变柱填充
          - generic [ref=e298]:
            - generic [ref=e299]:
              - button "更新数据" [ref=e300] [cursor=pointer]
              - button "重播动效" [ref=e302] [cursor=pointer]
            - paragraph [ref=e304]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=e306]: 滚动到此处查看示例
            - status [ref=e307]: 示例数据 · 已更新 0 次
            - group [ref=e308]:
              - generic "查看本卡代码" [ref=e309] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e310] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e311]: 对应官网示例
            - generic [ref=e312]: （新标签页打开）
        - region [ref=e313]:
          - generic [ref=e314]:
            - heading "Bar Chart - Shape & Gradient" [level=3] [ref=e315]
            - paragraph [ref=e316]: 离散方块柱、渐变与吸附圆环指示
          - generic [ref=e317]:
            - generic [ref=e318]:
              - button "更新数据" [ref=e319] [cursor=pointer]
              - button "重播动效" [ref=e321] [cursor=pointer]
            - paragraph [ref=e323]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=e325]: 滚动到此处查看示例
            - status [ref=e326]: 示例数据 · 已更新 0 次
            - group [ref=e327]:
              - generic "查看本卡代码" [ref=e328] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e329] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e330]: 对应官网示例
            - generic [ref=e331]: （新标签页打开）
        - region [ref=e332]:
          - generic [ref=e333]:
            - heading "Bar Chart - Shape Squircle Ring" [level=3] [ref=e334]
            - paragraph [ref=e335]: 圆角方块柱与吸附方环指示
          - generic [ref=e336]:
            - generic [ref=e337]:
              - button "更新数据" [ref=e338] [cursor=pointer]
              - button "重播动效" [ref=e340] [cursor=pointer]
            - paragraph [ref=e343]: 滚动到此处查看示例
            - status [ref=e344]: 示例数据 · 已更新 0 次
            - group [ref=e345]:
              - generic "查看本卡代码" [ref=e346] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e347] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e348]: 对应官网示例
            - generic [ref=e349]: （新标签页打开）
        - region [ref=e350]:
          - generic [ref=e351]:
            - heading "Bar Chart - Pattern" [level=3] [ref=e352]
            - paragraph [ref=e353]: 斜线图案柱填充
          - generic [ref=e354]:
            - generic [ref=e355]:
              - button "更新数据" [ref=e356] [cursor=pointer]
              - button "重播动效" [ref=e358] [cursor=pointer]
            - paragraph [ref=e361]: 滚动到此处查看示例
            - status [ref=e362]: 示例数据 · 已更新 0 次
            - group [ref=e363]:
              - generic "查看本卡代码" [ref=e364] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e365] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e366]: 对应官网示例
            - generic [ref=e367]: （新标签页打开）
    - region [ref=e368]:
      - heading "坐标与辅助读数" [level=2] [ref=e369]
      - generic [ref=e370]:
        - region [ref=e371]:
          - generic [ref=e372]:
            - heading "Bar Chart - Left Y axis" [level=3] [ref=e373]
            - paragraph [ref=e374]: 分组柱共用左侧数值轴
          - generic [ref=e375]:
            - generic [ref=e376]:
              - button "更新数据" [ref=e377] [cursor=pointer]
              - button "重播动效" [ref=e379] [cursor=pointer]
            - paragraph [ref=e382]: 滚动到此处查看示例
            - status [ref=e383]: 示例数据 · 已更新 0 次
            - group [ref=e384]:
              - generic "查看本卡代码" [ref=e385] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e386] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e387]: 对应官网示例
            - generic [ref=e388]: （新标签页打开）
        - region [ref=e389]:
          - generic [ref=e390]:
            - heading "Bar Chart - Left and right Y axes" [level=3] [ref=e391]
            - paragraph [ref=e392]: 左右独立数值轴
          - generic [ref=e393]:
            - generic [ref=e394]:
              - button "更新数据" [ref=e395] [cursor=pointer]
              - button "重播动效" [ref=e397] [cursor=pointer]
            - paragraph [ref=e400]: 滚动到此处查看示例
            - status [ref=e401]: 示例数据 · 已更新 0 次
            - group [ref=e402]:
              - generic "查看本卡代码" [ref=e403] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e404] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e405]: 对应官网示例
            - generic [ref=e406]: （新标签页打开）
        - region [ref=e407]:
          - generic [ref=e408]:
            - heading "Bar Chart - Pattern Background" [level=3] [ref=e409]
            - paragraph [ref=e410]: 图案背景替代网格
          - generic [ref=e411]:
            - generic [ref=e412]:
              - button "更新数据" [ref=e413] [cursor=pointer]
              - button "重播动效" [ref=e415] [cursor=pointer]
            - paragraph [ref=e418]: 滚动到此处查看示例
            - status [ref=e419]: 示例数据 · 已更新 0 次
            - group [ref=e420]:
              - generic "查看本卡代码" [ref=e421] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e422] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e423]: 对应官网示例
            - generic [ref=e424]: （新标签页打开）
        - region [ref=e425]:
          - generic [ref=e426]:
            - heading "Bar Chart - Dot Grid Background" [level=3] [ref=e427]
            - paragraph [ref=e428]: 带边缘渐隐的点阵背景
          - generic [ref=e429]:
            - generic [ref=e430]:
              - button "更新数据" [ref=e431] [cursor=pointer]
              - button "重播动效" [ref=e433] [cursor=pointer]
            - paragraph [ref=e436]: 滚动到此处查看示例
            - status [ref=e437]: 示例数据 · 已更新 0 次
            - group [ref=e438]:
              - generic "查看本卡代码" [ref=e439] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e440] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e441]: 对应官网示例
            - generic [ref=e442]: （新标签页打开）
        - region [ref=e443]:
          - generic [ref=e444]:
            - heading "Bar Chart - Reference Band" [level=3] [ref=e445]
            - paragraph [ref=e446]: 水平参考区间与边界标识
          - generic [ref=e447]:
            - generic [ref=e448]:
              - button "更新数据" [ref=e449] [cursor=pointer]
              - button "重播动效" [ref=e451] [cursor=pointer]
            - paragraph [ref=e454]: 滚动到此处查看示例
            - status [ref=e455]: 示例数据 · 已更新 0 次
            - group [ref=e456]:
              - generic "查看本卡代码" [ref=e457] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e458] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e459]: 对应官网示例
            - generic [ref=e460]: （新标签页打开）
        - region [ref=e461]:
          - generic [ref=e462]:
            - heading "Bar Chart - Pattern Reference Band" [level=3] [ref=e463]
            - paragraph [ref=e464]: 图案参考区间与相应轴标签
          - generic [ref=e465]:
            - generic [ref=e466]:
              - button "更新数据" [ref=e467] [cursor=pointer]
              - button "重播动效" [ref=e469] [cursor=pointer]
            - paragraph [ref=e472]: 滚动到此处查看示例
            - status [ref=e473]: 示例数据 · 已更新 0 次
            - group [ref=e474]:
              - generic "查看本卡代码" [ref=e475] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e476] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e477]: 对应官网示例
            - generic [ref=e478]: （新标签页打开）
    - region [ref=e479]:
      - heading "交互与状态" [level=2] [ref=e480]
      - generic [ref=e481]:
        - region [ref=e482]:
          - generic [ref=e483]:
            - heading "Bar Chart - Interactive" [level=3] [ref=e484]
            - paragraph [ref=e485]: 90天活动柱图与悬浮读数
          - generic [ref=e486]:
            - generic [ref=e487]:
              - button "更新数据" [ref=e488] [cursor=pointer]
              - button "重播动效" [ref=e490] [cursor=pointer]
            - paragraph [ref=e493]: 滚动到此处查看示例
            - status [ref=e494]: 示例数据 · 已更新 0 次
            - group [ref=e495]:
              - generic "查看本卡代码" [ref=e496] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e497] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e498]: 对应官网示例
            - generic [ref=e499]: （新标签页打开）
        - region [ref=e500]:
          - generic [ref=e501]:
            - heading "Bar Chart - Loading" [level=3] [ref=e502]
            - paragraph [ref=e503]: 占位柱斜向扫光加载
          - generic [ref=e504]:
            - generic [ref=e505]:
              - button "更新数据" [ref=e506] [cursor=pointer]
              - button "重播动效" [ref=e508] [cursor=pointer]
            - paragraph [ref=e511]: 滚动到此处查看示例
            - status [ref=e512]: 示例数据 · 已更新 0 次
            - group [ref=e513]:
              - generic "查看本卡代码" [ref=e514] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e515] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e516]: 对应官网示例
            - generic [ref=e517]: （新标签页打开）
        - region [ref=e518]:
          - generic [ref=e519]:
            - heading "Bar Chart - Custom Tooltip" [level=3] [ref=e520]
            - paragraph [ref=e521]: 提示内容与数值格式定制
          - generic [ref=e522]:
            - generic [ref=e523]:
              - button "更新数据" [ref=e524] [cursor=pointer]
              - button "重播动效" [ref=e526] [cursor=pointer]
            - paragraph [ref=e529]: 滚动到此处查看示例
            - status [ref=e530]: 示例数据 · 已更新 0 次
            - group [ref=e531]:
              - generic "查看本卡代码" [ref=e532] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e533] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e534]: 对应官网示例
            - generic [ref=e535]: （新标签页打开）
  - navigation "相关图型" [ref=e536]:
    - link "面积图" [ref=e537] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e539] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e541] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e543] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e545] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e547] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e549] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e551] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e553] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e555] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e557] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e559] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e561] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e563] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e565] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e567] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e569] [cursor=pointer]:
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
> 24 |         expect(reading.lines, `${entry}: ${await label.textContent()}`).toBe(1);
     |                                                                         ^ Error: bar: 参与人数 · 人
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
  40 |       expect((await singleLineText(button.getByText(label, { exact: true }))).lines).toBe(1);
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