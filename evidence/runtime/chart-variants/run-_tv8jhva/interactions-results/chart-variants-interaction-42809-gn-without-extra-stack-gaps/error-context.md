# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-variants-interactions.spec.ts >> horizontal bars have a visible numeric axis and native 3D segments align without extra stack gaps
- Location: tests/e2e/chart-variants-interactions.spec.ts:61:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 6
Received: 0
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
      - status [ref=e74]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
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
        - code [ref=e129]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig, useReducedMotion } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; function App() { const [revision, setRevision] = useState(0); const reduced = useReducedMotion() ?? false; return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-bar\" data-recipe=\"category-wide\"> <ChartExample id=\"bar\" recipe=\"category-wide\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
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
            - generic [ref=e157]:
              - generic [ref=e158]:
                - generic:
                  - generic:
                    - generic: "0"
                    - generic: "20"
                    - generic: "40"
                    - generic: "60"
                    - generic: "80"
                - generic:
                  - generic: 一班
                  - generic: 二班
                  - generic: 三班
                  - generic: 四班
                  - generic: 五班
                  - generic: 六班
              - paragraph [ref=e174]: 人数 · 按日期或班级比较
              - group [ref=e175]:
                - generic "查看精确数据" [ref=e176] [cursor=pointer]
            - status [ref=e177]: 示例数据 · 已更新 0 次 · 已减少动效
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
            - heading "Bar Chart - 3D Stacked" [level=3] [ref=e185]
            - paragraph [ref=e186]: 分段侧面的立体堆叠柱
          - generic [ref=e187]:
            - generic [ref=e188]:
              - button "更新数据" [ref=e189] [cursor=pointer]
              - button "重播动效" [ref=e191] [cursor=pointer]
            - generic [ref=e193]:
              - generic [ref=e194]:
                - generic:
                  - generic:
                    - generic: "0"
                    - generic: "20"
                    - generic: "40"
                    - generic: "60"
                    - generic: "80"
                    - generic: "100"
                - generic:
                  - generic: 一班
                  - generic: 二班
                  - generic: 三班
                  - generic: 四班
                  - generic: 五班
                  - generic: 六班
              - paragraph [ref=e217]: 完成与进行中互斥，堆叠为两类人数合计。
              - group [ref=e218]:
                - generic "查看精确数据" [ref=e219] [cursor=pointer]
            - status [ref=e220]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e221]:
              - generic "查看本卡代码" [ref=e222] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e223] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e224]: 对应官网示例
            - generic [ref=e225]: （新标签页打开）
        - region [ref=e226]:
          - generic [ref=e227]:
            - heading "Bar Chart - Multiple Series" [level=3] [ref=e228]
            - paragraph [ref=e229]: 按类别比较多系列分组柱
          - generic [ref=e230]:
            - generic [ref=e231]:
              - button "更新数据" [ref=e232] [cursor=pointer]
              - button "重播动效" [ref=e234] [cursor=pointer]
            - generic [ref=e236]:
              - generic [ref=e237]:
                - generic:
                  - generic:
                    - generic: "0"
                    - generic: "20"
                    - generic: "40"
                    - generic: "60"
                    - generic: "80"
                - generic:
                  - generic: 一班
                  - generic: 二班
                  - generic: 三班
                  - generic: 四班
                  - generic: 五班
                  - generic: 六班
              - paragraph [ref=e260]: 人数 · 按日期或班级比较
              - group [ref=e261]:
                - generic "查看精确数据" [ref=e262] [cursor=pointer]
            - status [ref=e263]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e264]:
              - generic "查看本卡代码" [ref=e265] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e266] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e267]: 对应官网示例
            - generic [ref=e268]: （新标签页打开）
        - region [ref=e269]:
          - generic [ref=e270]:
            - heading "Bar Chart - Stacked" [level=3] [ref=e271]
            - paragraph [ref=e272]: 互斥类别的分段间隔堆叠
          - generic [ref=e273]:
            - generic [ref=e274]:
              - button "更新数据" [ref=e275] [cursor=pointer]
              - button "重播动效" [ref=e277] [cursor=pointer]
            - generic [ref=e279]:
              - generic [ref=e280]:
                - generic:
                  - generic:
                    - generic: "0"
                    - generic: "20"
                    - generic: "40"
                    - generic: "60"
                    - generic: "80"
                    - generic: "100"
                - generic:
                  - generic: 一班
                  - generic: 二班
                  - generic: 三班
                  - generic: 四班
                  - generic: 五班
                  - generic: 六班
              - paragraph [ref=e303]: 完成与进行中互斥，堆叠为两类人数合计。
              - group [ref=e304]:
                - generic "查看精确数据" [ref=e305] [cursor=pointer]
            - status [ref=e306]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e307]:
              - generic "查看本卡代码" [ref=e308] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e309] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e310]: 对应官网示例
            - generic [ref=e311]: （新标签页打开）
        - region [ref=e312]:
          - generic [ref=e313]:
            - heading "Bar Chart - Horizontal" [level=3] [ref=e314]
            - paragraph [ref=e315]: 横向柱与纵向类别标签
          - generic [ref=e316]:
            - generic [ref=e317]:
              - button "更新数据" [ref=e318] [cursor=pointer]
              - button "重播动效" [ref=e320] [cursor=pointer]
            - generic [ref=e322]:
              - generic [ref=e323]:
                - img [ref=e325]:
                  - generic [ref=e339]:
                    - generic [ref=e340]: "0"
                    - generic [ref=e341]: "20"
                    - generic [ref=e342]: "40"
                    - generic [ref=e343]: "60"
                    - generic [ref=e344]: "80"
                - generic:
                  - generic: 一班
                  - generic: 二班
                  - generic: 三班
                  - generic: 四班
                  - generic: 五班
                  - generic: 六班
              - paragraph [ref=e345]: 人数 · 按日期或班级比较
              - group [ref=e346]:
                - generic "查看精确数据" [ref=e347] [cursor=pointer]
            - status [ref=e348]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e349]:
              - generic "查看本卡代码" [ref=e350] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e351] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e352]: 对应官网示例
            - generic [ref=e353]: （新标签页打开）
        - region [ref=e354]:
          - generic [ref=e355]:
            - heading "Bar Chart - Dense Data" [level=3] [ref=e356]
            - paragraph [ref=e357]: 60天密集柱与窄间隔
          - generic [ref=e358]:
            - generic [ref=e359]:
              - button "更新数据" [ref=e360] [cursor=pointer]
              - button "重播动效" [ref=e362] [cursor=pointer]
            - generic [ref=e364]:
              - generic [ref=e365]:
                - generic:
                  - generic:
                    - generic: "0"
                    - generic: "20"
                    - generic: "40"
                    - generic: "60"
                    - generic: "80"
                    - generic: "100"
                - generic:
                  - generic: 2026-07-01
                  - generic: 2026-07-16
                  - generic: 2026-07-31
                  - generic: 2026-08-15
              - paragraph [ref=e435]: 人数 · 按日期或班级比较
              - group [ref=e436]:
                - generic "查看精确数据" [ref=e437] [cursor=pointer]
            - status [ref=e438]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e439]:
              - generic "查看本卡代码" [ref=e440] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e441] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e442]: 对应官网示例
            - generic [ref=e443]: （新标签页打开）
        - region [ref=e444]:
          - generic [ref=e445]:
            - heading "Bar Chart - No Gap" [level=3] [ref=e446]
            - paragraph [ref=e447]: 零间隙柱、渐变与线指示器
          - generic [ref=e448]:
            - generic [ref=e449]:
              - button "更新数据" [ref=e450] [cursor=pointer]
              - button "重播动效" [ref=e452] [cursor=pointer]
            - paragraph [ref=e455]: 滚动到此处查看示例
            - status [ref=e456]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e457]:
              - generic "查看本卡代码" [ref=e458] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e459] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e460]: 对应官网示例
            - generic [ref=e461]: （新标签页打开）
    - region [ref=e462]:
      - heading "图形材质" [level=2] [ref=e463]
      - generic [ref=e464]:
        - region [ref=e465]:
          - generic [ref=e466]:
            - heading "Bar Chart - 3D Depth" [level=3] [ref=e467]
            - paragraph [ref=e468]: 顶面侧面构成立体柱及线指示器
          - generic [ref=e469]:
            - generic [ref=e470]:
              - button "更新数据" [ref=e471] [cursor=pointer]
              - button "重播动效" [ref=e473] [cursor=pointer]
            - paragraph [ref=e476]: 滚动到此处查看示例
            - status [ref=e477]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e478]:
              - generic "查看本卡代码" [ref=e479] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e480] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e481]: 对应官网示例
            - generic [ref=e482]: （新标签页打开）
        - region [ref=e483]:
          - generic [ref=e484]:
            - heading "Bar Chart - Gradient" [level=3] [ref=e485]
            - paragraph [ref=e486]: 系列渐变柱填充
          - generic [ref=e487]:
            - generic [ref=e488]:
              - button "更新数据" [ref=e489] [cursor=pointer]
              - button "重播动效" [ref=e491] [cursor=pointer]
            - paragraph [ref=e493]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=e495]: 滚动到此处查看示例
            - status [ref=e496]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e497]:
              - generic "查看本卡代码" [ref=e498] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e499] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e500]: 对应官网示例
            - generic [ref=e501]: （新标签页打开）
        - region [ref=e502]:
          - generic [ref=e503]:
            - heading "Bar Chart - Shape & Gradient" [level=3] [ref=e504]
            - paragraph [ref=e505]: 离散方块柱、渐变与吸附圆环指示
          - generic [ref=e506]:
            - generic [ref=e507]:
              - button "更新数据" [ref=e508] [cursor=pointer]
              - button "重播动效" [ref=e510] [cursor=pointer]
            - paragraph [ref=e512]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=e514]: 滚动到此处查看示例
            - status [ref=e515]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e516]:
              - generic "查看本卡代码" [ref=e517] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e518] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e519]: 对应官网示例
            - generic [ref=e520]: （新标签页打开）
        - region [ref=e521]:
          - generic [ref=e522]:
            - heading "Bar Chart - Shape Squircle Ring" [level=3] [ref=e523]
            - paragraph [ref=e524]: 圆角方块柱与吸附方环指示
          - generic [ref=e525]:
            - generic [ref=e526]:
              - button "更新数据" [ref=e527] [cursor=pointer]
              - button "重播动效" [ref=e529] [cursor=pointer]
            - paragraph [ref=e532]: 滚动到此处查看示例
            - status [ref=e533]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e534]:
              - generic "查看本卡代码" [ref=e535] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e536] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e537]: 对应官网示例
            - generic [ref=e538]: （新标签页打开）
        - region [ref=e539]:
          - generic [ref=e540]:
            - heading "Bar Chart - Pattern" [level=3] [ref=e541]
            - paragraph [ref=e542]: 斜线图案柱填充
          - generic [ref=e543]:
            - generic [ref=e544]:
              - button "更新数据" [ref=e545] [cursor=pointer]
              - button "重播动效" [ref=e547] [cursor=pointer]
            - paragraph [ref=e550]: 滚动到此处查看示例
            - status [ref=e551]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e552]:
              - generic "查看本卡代码" [ref=e553] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e554] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e555]: 对应官网示例
            - generic [ref=e556]: （新标签页打开）
    - region [ref=e557]:
      - heading "坐标与辅助读数" [level=2] [ref=e558]
      - generic [ref=e559]:
        - region [ref=e560]:
          - generic [ref=e561]:
            - heading "Bar Chart - Left Y axis" [level=3] [ref=e562]
            - paragraph [ref=e563]: 分组柱共用左侧数值轴
          - generic [ref=e564]:
            - generic [ref=e565]:
              - button "更新数据" [ref=e566] [cursor=pointer]
              - button "重播动效" [ref=e568] [cursor=pointer]
            - paragraph [ref=e571]: 滚动到此处查看示例
            - status [ref=e572]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e573]:
              - generic "查看本卡代码" [ref=e574] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e575] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e576]: 对应官网示例
            - generic [ref=e577]: （新标签页打开）
        - region [ref=e578]:
          - generic [ref=e579]:
            - heading "Bar Chart - Left and right Y axes" [level=3] [ref=e580]
            - paragraph [ref=e581]: 左右独立数值轴
          - generic [ref=e582]:
            - generic [ref=e583]:
              - button "更新数据" [ref=e584] [cursor=pointer]
              - button "重播动效" [ref=e586] [cursor=pointer]
            - paragraph [ref=e589]: 滚动到此处查看示例
            - status [ref=e590]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e591]:
              - generic "查看本卡代码" [ref=e592] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e593] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e594]: 对应官网示例
            - generic [ref=e595]: （新标签页打开）
        - region [ref=e596]:
          - generic [ref=e597]:
            - heading "Bar Chart - Pattern Background" [level=3] [ref=e598]
            - paragraph [ref=e599]: 图案背景替代网格
          - generic [ref=e600]:
            - generic [ref=e601]:
              - button "更新数据" [ref=e602] [cursor=pointer]
              - button "重播动效" [ref=e604] [cursor=pointer]
            - paragraph [ref=e607]: 滚动到此处查看示例
            - status [ref=e608]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e609]:
              - generic "查看本卡代码" [ref=e610] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e611] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e612]: 对应官网示例
            - generic [ref=e613]: （新标签页打开）
        - region [ref=e614]:
          - generic [ref=e615]:
            - heading "Bar Chart - Dot Grid Background" [level=3] [ref=e616]
            - paragraph [ref=e617]: 带边缘渐隐的点阵背景
          - generic [ref=e618]:
            - generic [ref=e619]:
              - button "更新数据" [ref=e620] [cursor=pointer]
              - button "重播动效" [ref=e622] [cursor=pointer]
            - paragraph [ref=e625]: 滚动到此处查看示例
            - status [ref=e626]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e627]:
              - generic "查看本卡代码" [ref=e628] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e629] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e630]: 对应官网示例
            - generic [ref=e631]: （新标签页打开）
        - region [ref=e632]:
          - generic [ref=e633]:
            - heading "Bar Chart - Reference Band" [level=3] [ref=e634]
            - paragraph [ref=e635]: 水平参考区间与边界标识
          - generic [ref=e636]:
            - generic [ref=e637]:
              - button "更新数据" [ref=e638] [cursor=pointer]
              - button "重播动效" [ref=e640] [cursor=pointer]
            - paragraph [ref=e643]: 滚动到此处查看示例
            - status [ref=e644]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e645]:
              - generic "查看本卡代码" [ref=e646] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e647] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e648]: 对应官网示例
            - generic [ref=e649]: （新标签页打开）
        - region [ref=e650]:
          - generic [ref=e651]:
            - heading "Bar Chart - Pattern Reference Band" [level=3] [ref=e652]
            - paragraph [ref=e653]: 图案参考区间与相应轴标签
          - generic [ref=e654]:
            - generic [ref=e655]:
              - button "更新数据" [ref=e656] [cursor=pointer]
              - button "重播动效" [ref=e658] [cursor=pointer]
            - paragraph [ref=e661]: 滚动到此处查看示例
            - status [ref=e662]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e663]:
              - generic "查看本卡代码" [ref=e664] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e665] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e666]: 对应官网示例
            - generic [ref=e667]: （新标签页打开）
    - region [ref=e668]:
      - heading "交互与状态" [level=2] [ref=e669]
      - generic [ref=e670]:
        - region [ref=e671]:
          - generic [ref=e672]:
            - heading "Bar Chart - Interactive" [level=3] [ref=e673]
            - paragraph [ref=e674]: 90天活动柱图与悬浮读数
          - generic [ref=e675]:
            - generic [ref=e676]:
              - button "更新数据" [ref=e677] [cursor=pointer]
              - button "重播动效" [ref=e679] [cursor=pointer]
            - paragraph [ref=e682]: 滚动到此处查看示例
            - status [ref=e683]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e684]:
              - generic "查看本卡代码" [ref=e685] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e686] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e687]: 对应官网示例
            - generic [ref=e688]: （新标签页打开）
        - region [ref=e689]:
          - generic [ref=e690]:
            - heading "Bar Chart - Loading" [level=3] [ref=e691]
            - paragraph [ref=e692]: 占位柱斜向扫光加载
          - generic [ref=e693]:
            - generic [ref=e694]:
              - button "更新数据" [ref=e695] [cursor=pointer]
              - button "重播动效" [ref=e697] [cursor=pointer]
            - paragraph [ref=e700]: 滚动到此处查看示例
            - status [ref=e701]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e702]:
              - generic "查看本卡代码" [ref=e703] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e704] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e705]: 对应官网示例
            - generic [ref=e706]: （新标签页打开）
        - region [ref=e707]:
          - generic [ref=e708]:
            - heading "Bar Chart - Custom Tooltip" [level=3] [ref=e709]
            - paragraph [ref=e710]: 提示内容与数值格式定制
          - generic [ref=e711]:
            - generic [ref=e712]:
              - button "更新数据" [ref=e713] [cursor=pointer]
              - button "重播动效" [ref=e715] [cursor=pointer]
            - paragraph [ref=e718]: 滚动到此处查看示例
            - status [ref=e719]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e720]:
              - generic "查看本卡代码" [ref=e721] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e722] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e723]: 对应官网示例
            - generic [ref=e724]: （新标签页打开）
  - navigation "相关图型" [ref=e725]:
    - link "面积图" [ref=e726] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e728] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e730] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e732] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e734] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e736] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e738] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e740] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e742] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e744] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e746] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e748] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e750] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e752] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e754] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e756] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e758] [cursor=pointer]:
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
  49 |   const path=card.locator('path[stroke="var(--chart-1)"]').first();const before=await path.getAttribute("d");
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
> 66 |   expect(values.length).toBe(6);expect(values.every(Number.isFinite)).toBe(true);
     |                         ^ Error: expect(received).toBe(expected) // Object.is equality
  67 | });
  68 | 
```