# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-legend-tooltip.spec.ts >> chart labels stay horizontal at 1280
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
        - generic [ref=e65]:
          - button "参与人数 · 人" [ref=e67] [cursor=pointer]
          - button "完成人数 · 人" [ref=e71] [cursor=pointer]
          - button "复习人数 · 人" [ref=e75] [cursor=pointer]
        - group [ref=e78]:
          - generic "查看精确数据" [ref=e79] [cursor=pointer]
      - status [ref=e80]: 示例数据 · 已更新 0 次
  - generic [ref=e81]:
    - heading "数据与使用边界" [level=2] [ref=e82]
    - paragraph [ref=e83]: 类别键唯一；分组人数不可相加，堆叠改用互斥等级人数。
    - paragraph [ref=e84]: 原生柱坐标以0为下界，本例拒绝负值。
    - paragraph [ref=e85]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=e86]:
    - region [ref=e87]:
      - heading "API 与结构" [level=2] [ref=e88]
      - table [ref=e90]:
        - caption [ref=e91]: 柱状图 常用接口
        - rowgroup [ref=e92]:
          - row [ref=e93]:
            - columnheader "名称" [ref=e94]
            - columnheader "类型" [ref=e95]
            - columnheader "默认" [ref=e96]
            - columnheader "说明" [ref=e97]
        - rowgroup [ref=e98]:
          - row [ref=e99]:
            - rowheader [ref=e100]:
              - code [ref=e101]: data / value
            - cell [ref=e102]:
              - code [ref=e103]: 原生图型合同
            - cell "—" [ref=e104]
            - cell "类别键唯一；分组人数不可相加，堆叠改用互斥等级人数。" [ref=e105]
          - row [ref=e106]:
            - rowheader [ref=e107]:
              - code [ref=e108]: children
            - cell [ref=e109]:
              - code [ref=e110]: Compound Parts
            - cell "—" [ref=e111]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e112]
          - row [ref=e113]:
            - rowheader [ref=e114]:
              - code [ref=e115]: className / style / margin
            - cell [ref=e116]:
              - code [ref=e117]: 原生尺寸接口
            - cell "—" [ref=e118]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e119]
          - row [ref=e120]:
            - rowheader [ref=e121]:
              - code [ref=e122]: enterTransition / animationDuration
            - cell [ref=e123]:
              - code [ref=e124]: 原生动效配置
            - cell "—" [ref=e125]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e126]
      - paragraph [ref=e127]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e128]:
      - heading "调用示例" [level=2] [ref=e129]
      - generic [ref=e130]:
        - generic [ref=e131]:
          - button "复制代码" [ref=e132] [cursor=pointer]
          - status
        - code [ref=e135]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-bar\" data-recipe=\"category-wide\"> <ChartExample id=\"bar\" recipe=\"category-wide\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e136]:
        - text: 当前源码：
        - code [ref=e137]: packages/ui/src/charts/vendor/charts/bar-chart.tsx
  - group [ref=e138]:
    - generic "调用配置、完整源码与示例数据" [ref=e139] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-variants/profit-loss.tsx"
    - option "chart-variants/shared.tsx"
    - option "chart-data.ts"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
  - region "全部图表变体" [ref=e140]:
    - navigation "变体分组" [ref=e141]:
      - button "基础结构" [ref=e142] [cursor=pointer]
      - button "图形材质" [ref=e144] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e146] [cursor=pointer]
      - button "交互与状态" [ref=e148] [cursor=pointer]
    - region [ref=e150]:
      - heading "基础结构" [level=2] [ref=e151]
      - generic [ref=e152]:
        - region [ref=e153]:
          - generic [ref=e154]:
            - heading "Bar Chart" [level=3] [ref=e155]
            - paragraph [ref=e156]: 默认圆头纵向柱
          - generic [ref=e157]:
            - generic [ref=e158]:
              - button "更新数据" [ref=e159] [cursor=pointer]
              - button "重播动效" [ref=e161] [cursor=pointer]
            - paragraph [ref=e164]: 滚动到此处查看示例
            - status [ref=e165]: 示例数据 · 已更新 0 次
            - group [ref=e166]:
              - generic "查看本卡代码" [ref=e167] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e168] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e169]: 对应官网示例
            - generic [ref=e170]: （新标签页打开）
        - region [ref=e171]:
          - generic [ref=e172]:
            - heading "Bar Chart - 3D Stacked" [level=3] [ref=e173]
            - paragraph [ref=e174]: 分段侧面的立体堆叠柱
          - generic [ref=e175]:
            - generic [ref=e176]:
              - button "更新数据" [ref=e177] [cursor=pointer]
              - button "重播动效" [ref=e179] [cursor=pointer]
            - paragraph [ref=e182]: 滚动到此处查看示例
            - status [ref=e183]: 示例数据 · 已更新 0 次
            - group [ref=e184]:
              - generic "查看本卡代码" [ref=e185] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e186] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e187]: 对应官网示例
            - generic [ref=e188]: （新标签页打开）
        - region [ref=e189]:
          - generic [ref=e190]:
            - heading "Bar Chart - Multiple Series" [level=3] [ref=e191]
            - paragraph [ref=e192]: 按类别比较多系列分组柱
          - generic [ref=e193]:
            - generic [ref=e194]:
              - button "更新数据" [ref=e195] [cursor=pointer]
              - button "重播动效" [ref=e197] [cursor=pointer]
            - paragraph [ref=e200]: 滚动到此处查看示例
            - status [ref=e201]: 示例数据 · 已更新 0 次
            - group [ref=e202]:
              - generic "查看本卡代码" [ref=e203] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e204] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e205]: 对应官网示例
            - generic [ref=e206]: （新标签页打开）
        - region [ref=e207]:
          - generic [ref=e208]:
            - heading "Bar Chart - Stacked" [level=3] [ref=e209]
            - paragraph [ref=e210]: 互斥类别的分段间隔堆叠
          - generic [ref=e211]:
            - generic [ref=e212]:
              - button "更新数据" [ref=e213] [cursor=pointer]
              - button "重播动效" [ref=e215] [cursor=pointer]
            - paragraph [ref=e218]: 滚动到此处查看示例
            - status [ref=e219]: 示例数据 · 已更新 0 次
            - group [ref=e220]:
              - generic "查看本卡代码" [ref=e221] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e222] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e223]: 对应官网示例
            - generic [ref=e224]: （新标签页打开）
        - region [ref=e225]:
          - generic [ref=e226]:
            - heading "Bar Chart - Horizontal" [level=3] [ref=e227]
            - paragraph [ref=e228]: 横向柱与纵向类别标签
          - generic [ref=e229]:
            - generic [ref=e230]:
              - button "更新数据" [ref=e231] [cursor=pointer]
              - button "重播动效" [ref=e233] [cursor=pointer]
            - paragraph [ref=e236]: 滚动到此处查看示例
            - status [ref=e237]: 示例数据 · 已更新 0 次
            - group [ref=e238]:
              - generic "查看本卡代码" [ref=e239] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e240] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e241]: 对应官网示例
            - generic [ref=e242]: （新标签页打开）
        - region [ref=e243]:
          - generic [ref=e244]:
            - heading "Bar Chart - Dense Data" [level=3] [ref=e245]
            - paragraph [ref=e246]: 60天密集柱与窄间隔
          - generic [ref=e247]:
            - generic [ref=e248]:
              - button "更新数据" [ref=e249] [cursor=pointer]
              - button "重播动效" [ref=e251] [cursor=pointer]
            - paragraph [ref=e254]: 滚动到此处查看示例
            - status [ref=e255]: 示例数据 · 已更新 0 次
            - group [ref=e256]:
              - generic "查看本卡代码" [ref=e257] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e258] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e259]: 对应官网示例
            - generic [ref=e260]: （新标签页打开）
        - region [ref=e261]:
          - generic [ref=e262]:
            - heading "Bar Chart - No Gap" [level=3] [ref=e263]
            - paragraph [ref=e264]: 零间隙柱、渐变与线指示器
          - generic [ref=e265]:
            - generic [ref=e266]:
              - button "更新数据" [ref=e267] [cursor=pointer]
              - button "重播动效" [ref=e269] [cursor=pointer]
            - paragraph [ref=e272]: 滚动到此处查看示例
            - status [ref=e273]: 示例数据 · 已更新 0 次
            - group [ref=e274]:
              - generic "查看本卡代码" [ref=e275] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e276] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e277]: 对应官网示例
            - generic [ref=e278]: （新标签页打开）
    - region [ref=e279]:
      - heading "图形材质" [level=2] [ref=e280]
      - generic [ref=e281]:
        - region [ref=e282]:
          - generic [ref=e283]:
            - heading "Bar Chart - 3D Depth" [level=3] [ref=e284]
            - paragraph [ref=e285]: 顶面侧面构成立体柱及线指示器
          - generic [ref=e286]:
            - generic [ref=e287]:
              - button "更新数据" [ref=e288] [cursor=pointer]
              - button "重播动效" [ref=e290] [cursor=pointer]
            - paragraph [ref=e293]: 滚动到此处查看示例
            - status [ref=e294]: 示例数据 · 已更新 0 次
            - group [ref=e295]:
              - generic "查看本卡代码" [ref=e296] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e297] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e298]: 对应官网示例
            - generic [ref=e299]: （新标签页打开）
        - region [ref=e300]:
          - generic [ref=e301]:
            - heading "Bar Chart - Gradient" [level=3] [ref=e302]
            - paragraph [ref=e303]: 系列渐变柱填充
          - generic [ref=e304]:
            - generic [ref=e305]:
              - button "更新数据" [ref=e306] [cursor=pointer]
              - button "重播动效" [ref=e308] [cursor=pointer]
            - paragraph [ref=e310]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=e312]: 滚动到此处查看示例
            - status [ref=e313]: 示例数据 · 已更新 0 次
            - group [ref=e314]:
              - generic "查看本卡代码" [ref=e315] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e316] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e317]: 对应官网示例
            - generic [ref=e318]: （新标签页打开）
        - region [ref=e319]:
          - generic [ref=e320]:
            - heading "Bar Chart - Shape & Gradient" [level=3] [ref=e321]
            - paragraph [ref=e322]: 离散方块柱、渐变与吸附圆环指示
          - generic [ref=e323]:
            - generic [ref=e324]:
              - button "更新数据" [ref=e325] [cursor=pointer]
              - button "重播动效" [ref=e327] [cursor=pointer]
            - paragraph [ref=e329]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=e331]: 滚动到此处查看示例
            - status [ref=e332]: 示例数据 · 已更新 0 次
            - group [ref=e333]:
              - generic "查看本卡代码" [ref=e334] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e335] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e336]: 对应官网示例
            - generic [ref=e337]: （新标签页打开）
        - region [ref=e338]:
          - generic [ref=e339]:
            - heading "Bar Chart - Shape Squircle Ring" [level=3] [ref=e340]
            - paragraph [ref=e341]: 圆角方块柱与吸附方环指示
          - generic [ref=e342]:
            - generic [ref=e343]:
              - button "更新数据" [ref=e344] [cursor=pointer]
              - button "重播动效" [ref=e346] [cursor=pointer]
            - paragraph [ref=e349]: 滚动到此处查看示例
            - status [ref=e350]: 示例数据 · 已更新 0 次
            - group [ref=e351]:
              - generic "查看本卡代码" [ref=e352] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e353] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e354]: 对应官网示例
            - generic [ref=e355]: （新标签页打开）
        - region [ref=e356]:
          - generic [ref=e357]:
            - heading "Bar Chart - Pattern" [level=3] [ref=e358]
            - paragraph [ref=e359]: 斜线图案柱填充
          - generic [ref=e360]:
            - generic [ref=e361]:
              - button "更新数据" [ref=e362] [cursor=pointer]
              - button "重播动效" [ref=e364] [cursor=pointer]
            - paragraph [ref=e367]: 滚动到此处查看示例
            - status [ref=e368]: 示例数据 · 已更新 0 次
            - group [ref=e369]:
              - generic "查看本卡代码" [ref=e370] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e371] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e372]: 对应官网示例
            - generic [ref=e373]: （新标签页打开）
    - region [ref=e374]:
      - heading "坐标与辅助读数" [level=2] [ref=e375]
      - generic [ref=e376]:
        - region [ref=e377]:
          - generic [ref=e378]:
            - heading "Bar Chart - Left Y axis" [level=3] [ref=e379]
            - paragraph [ref=e380]: 分组柱共用左侧数值轴
          - generic [ref=e381]:
            - generic [ref=e382]:
              - button "更新数据" [ref=e383] [cursor=pointer]
              - button "重播动效" [ref=e385] [cursor=pointer]
            - paragraph [ref=e388]: 滚动到此处查看示例
            - status [ref=e389]: 示例数据 · 已更新 0 次
            - group [ref=e390]:
              - generic "查看本卡代码" [ref=e391] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e392] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e393]: 对应官网示例
            - generic [ref=e394]: （新标签页打开）
        - region [ref=e395]:
          - generic [ref=e396]:
            - heading "Bar Chart - Left and right Y axes" [level=3] [ref=e397]
            - paragraph [ref=e398]: 左右独立数值轴
          - generic [ref=e399]:
            - generic [ref=e400]:
              - button "更新数据" [ref=e401] [cursor=pointer]
              - button "重播动效" [ref=e403] [cursor=pointer]
            - paragraph [ref=e406]: 滚动到此处查看示例
            - status [ref=e407]: 示例数据 · 已更新 0 次
            - group [ref=e408]:
              - generic "查看本卡代码" [ref=e409] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e410] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e411]: 对应官网示例
            - generic [ref=e412]: （新标签页打开）
        - region [ref=e413]:
          - generic [ref=e414]:
            - heading "Bar Chart - Pattern Background" [level=3] [ref=e415]
            - paragraph [ref=e416]: 图案背景替代网格
          - generic [ref=e417]:
            - generic [ref=e418]:
              - button "更新数据" [ref=e419] [cursor=pointer]
              - button "重播动效" [ref=e421] [cursor=pointer]
            - paragraph [ref=e424]: 滚动到此处查看示例
            - status [ref=e425]: 示例数据 · 已更新 0 次
            - group [ref=e426]:
              - generic "查看本卡代码" [ref=e427] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e428] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e429]: 对应官网示例
            - generic [ref=e430]: （新标签页打开）
        - region [ref=e431]:
          - generic [ref=e432]:
            - heading "Bar Chart - Dot Grid Background" [level=3] [ref=e433]
            - paragraph [ref=e434]: 带边缘渐隐的点阵背景
          - generic [ref=e435]:
            - generic [ref=e436]:
              - button "更新数据" [ref=e437] [cursor=pointer]
              - button "重播动效" [ref=e439] [cursor=pointer]
            - paragraph [ref=e442]: 滚动到此处查看示例
            - status [ref=e443]: 示例数据 · 已更新 0 次
            - group [ref=e444]:
              - generic "查看本卡代码" [ref=e445] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e446] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e447]: 对应官网示例
            - generic [ref=e448]: （新标签页打开）
        - region [ref=e449]:
          - generic [ref=e450]:
            - heading "Bar Chart - Reference Band" [level=3] [ref=e451]
            - paragraph [ref=e452]: 水平参考区间与边界标识
          - generic [ref=e453]:
            - generic [ref=e454]:
              - button "更新数据" [ref=e455] [cursor=pointer]
              - button "重播动效" [ref=e457] [cursor=pointer]
            - paragraph [ref=e460]: 滚动到此处查看示例
            - status [ref=e461]: 示例数据 · 已更新 0 次
            - group [ref=e462]:
              - generic "查看本卡代码" [ref=e463] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e464] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e465]: 对应官网示例
            - generic [ref=e466]: （新标签页打开）
        - region [ref=e467]:
          - generic [ref=e468]:
            - heading "Bar Chart - Pattern Reference Band" [level=3] [ref=e469]
            - paragraph [ref=e470]: 图案参考区间与相应轴标签
          - generic [ref=e471]:
            - generic [ref=e472]:
              - button "更新数据" [ref=e473] [cursor=pointer]
              - button "重播动效" [ref=e475] [cursor=pointer]
            - paragraph [ref=e478]: 滚动到此处查看示例
            - status [ref=e479]: 示例数据 · 已更新 0 次
            - group [ref=e480]:
              - generic "查看本卡代码" [ref=e481] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e482] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e483]: 对应官网示例
            - generic [ref=e484]: （新标签页打开）
    - region [ref=e485]:
      - heading "交互与状态" [level=2] [ref=e486]
      - generic [ref=e487]:
        - region [ref=e488]:
          - generic [ref=e489]:
            - heading "Bar Chart - Interactive" [level=3] [ref=e490]
            - paragraph [ref=e491]: 90天活动柱图与悬浮读数
          - generic [ref=e492]:
            - generic [ref=e493]:
              - button "更新数据" [ref=e494] [cursor=pointer]
              - button "重播动效" [ref=e496] [cursor=pointer]
            - paragraph [ref=e499]: 滚动到此处查看示例
            - status [ref=e500]: 示例数据 · 已更新 0 次
            - group [ref=e501]:
              - generic "查看本卡代码" [ref=e502] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e503] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e504]: 对应官网示例
            - generic [ref=e505]: （新标签页打开）
        - region [ref=e506]:
          - generic [ref=e507]:
            - heading "Bar Chart - Loading" [level=3] [ref=e508]
            - paragraph [ref=e509]: 占位柱斜向扫光加载
          - generic [ref=e510]:
            - generic [ref=e511]:
              - button "更新数据" [ref=e512] [cursor=pointer]
              - button "重播动效" [ref=e514] [cursor=pointer]
            - paragraph [ref=e517]: 滚动到此处查看示例
            - status [ref=e518]: 示例数据 · 已更新 0 次
            - group [ref=e519]:
              - generic "查看本卡代码" [ref=e520] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e521] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e522]: 对应官网示例
            - generic [ref=e523]: （新标签页打开）
        - region [ref=e524]:
          - generic [ref=e525]:
            - heading "Bar Chart - Custom Tooltip" [level=3] [ref=e526]
            - paragraph [ref=e527]: 提示内容与数值格式定制
          - generic [ref=e528]:
            - generic [ref=e529]:
              - button "更新数据" [ref=e530] [cursor=pointer]
              - button "重播动效" [ref=e532] [cursor=pointer]
            - paragraph [ref=e535]: 滚动到此处查看示例
            - status [ref=e536]: 示例数据 · 已更新 0 次
            - group [ref=e537]:
              - generic "查看本卡代码" [ref=e538] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e539] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e540]: 对应官网示例
            - generic [ref=e541]: （新标签页打开）
  - navigation "相关图型" [ref=e542]:
    - link "面积图" [ref=e543] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e545] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e547] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e549] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e551] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e553] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e555] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e557] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e559] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e561] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e563] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e565] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e567] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e569] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e571] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e573] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e575] [cursor=pointer]:
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