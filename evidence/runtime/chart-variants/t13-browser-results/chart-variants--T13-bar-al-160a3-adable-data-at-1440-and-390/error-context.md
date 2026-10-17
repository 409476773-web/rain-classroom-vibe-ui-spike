# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-variants.spec.ts >> [T13] bar: all 21 frozen cards render real geometry and readable data at 1440 and 390
- Location: tests/e2e/chart-variants.spec.ts:50:3

# Error details

```
Error: bar-default SVG definitions are instance-safe

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 7

- Array []
+ Array [
+   "bdb-clip-_r_2j_-__",
+   "bdb-clip-_r_2j_-__",
+   "bdb-clip-_r_2j_-__",
+   "bdb-clip-_r_2j_-__",
+   "bdb-clip-_r_2j_-__",
+ ]
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
                - generic "查看精确数据" [active] [ref=e176] [cursor=pointer]
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
            - paragraph [ref=e323]: 滚动到此处查看示例
            - status [ref=e324]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e325]:
              - generic "查看本卡代码" [ref=e326] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e327] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e328]: 对应官网示例
            - generic [ref=e329]: （新标签页打开）
        - region [ref=e330]:
          - generic [ref=e331]:
            - heading "Bar Chart - Dense Data" [level=3] [ref=e332]
            - paragraph [ref=e333]: 60天密集柱与窄间隔
          - generic [ref=e334]:
            - generic [ref=e335]:
              - button "更新数据" [ref=e336] [cursor=pointer]
              - button "重播动效" [ref=e338] [cursor=pointer]
            - paragraph [ref=e341]: 滚动到此处查看示例
            - status [ref=e342]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e343]:
              - generic "查看本卡代码" [ref=e344] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e345] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e346]: 对应官网示例
            - generic [ref=e347]: （新标签页打开）
        - region [ref=e348]:
          - generic [ref=e349]:
            - heading "Bar Chart - No Gap" [level=3] [ref=e350]
            - paragraph [ref=e351]: 零间隙柱、渐变与线指示器
          - generic [ref=e352]:
            - generic [ref=e353]:
              - button "更新数据" [ref=e354] [cursor=pointer]
              - button "重播动效" [ref=e356] [cursor=pointer]
            - paragraph [ref=e359]: 滚动到此处查看示例
            - status [ref=e360]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e361]:
              - generic "查看本卡代码" [ref=e362] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e363] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e364]: 对应官网示例
            - generic [ref=e365]: （新标签页打开）
    - region [ref=e366]:
      - heading "图形材质" [level=2] [ref=e367]
      - generic [ref=e368]:
        - region [ref=e369]:
          - generic [ref=e370]:
            - heading "Bar Chart - 3D Depth" [level=3] [ref=e371]
            - paragraph [ref=e372]: 顶面侧面构成立体柱及线指示器
          - generic [ref=e373]:
            - generic [ref=e374]:
              - button "更新数据" [ref=e375] [cursor=pointer]
              - button "重播动效" [ref=e377] [cursor=pointer]
            - paragraph [ref=e380]: 滚动到此处查看示例
            - status [ref=e381]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e382]:
              - generic "查看本卡代码" [ref=e383] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e384] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e385]: 对应官网示例
            - generic [ref=e386]: （新标签页打开）
        - region [ref=e387]:
          - generic [ref=e388]:
            - heading "Bar Chart - Gradient" [level=3] [ref=e389]
            - paragraph [ref=e390]: 系列渐变柱填充
          - generic [ref=e391]:
            - generic [ref=e392]:
              - button "更新数据" [ref=e393] [cursor=pointer]
              - button "重播动效" [ref=e395] [cursor=pointer]
            - paragraph [ref=e397]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=e399]: 滚动到此处查看示例
            - status [ref=e400]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e401]:
              - generic "查看本卡代码" [ref=e402] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e403] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e404]: 对应官网示例
            - generic [ref=e405]: （新标签页打开）
        - region [ref=e406]:
          - generic [ref=e407]:
            - heading "Bar Chart - Shape & Gradient" [level=3] [ref=e408]
            - paragraph [ref=e409]: 离散方块柱、渐变与吸附圆环指示
          - generic [ref=e410]:
            - generic [ref=e411]:
              - button "更新数据" [ref=e412] [cursor=pointer]
              - button "重播动效" [ref=e414] [cursor=pointer]
            - paragraph [ref=e416]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=e418]: 滚动到此处查看示例
            - status [ref=e419]: 示例数据 · 已更新 0 次 · 已减少动效
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
            - heading "Bar Chart - Shape Squircle Ring" [level=3] [ref=e427]
            - paragraph [ref=e428]: 圆角方块柱与吸附方环指示
          - generic [ref=e429]:
            - generic [ref=e430]:
              - button "更新数据" [ref=e431] [cursor=pointer]
              - button "重播动效" [ref=e433] [cursor=pointer]
            - paragraph [ref=e436]: 滚动到此处查看示例
            - status [ref=e437]: 示例数据 · 已更新 0 次 · 已减少动效
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
            - heading "Bar Chart - Pattern" [level=3] [ref=e445]
            - paragraph [ref=e446]: 斜线图案柱填充
          - generic [ref=e447]:
            - generic [ref=e448]:
              - button "更新数据" [ref=e449] [cursor=pointer]
              - button "重播动效" [ref=e451] [cursor=pointer]
            - paragraph [ref=e454]: 滚动到此处查看示例
            - status [ref=e455]: 示例数据 · 已更新 0 次 · 已减少动效
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
      - heading "坐标与辅助读数" [level=2] [ref=e462]
      - generic [ref=e463]:
        - region [ref=e464]:
          - generic [ref=e465]:
            - heading "Bar Chart - Left Y axis" [level=3] [ref=e466]
            - paragraph [ref=e467]: 分组柱共用左侧数值轴
          - generic [ref=e468]:
            - generic [ref=e469]:
              - button "更新数据" [ref=e470] [cursor=pointer]
              - button "重播动效" [ref=e472] [cursor=pointer]
            - paragraph [ref=e475]: 滚动到此处查看示例
            - status [ref=e476]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e477]:
              - generic "查看本卡代码" [ref=e478] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e479] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e480]: 对应官网示例
            - generic [ref=e481]: （新标签页打开）
        - region [ref=e482]:
          - generic [ref=e483]:
            - heading "Bar Chart - Left and right Y axes" [level=3] [ref=e484]
            - paragraph [ref=e485]: 左右独立数值轴
          - generic [ref=e486]:
            - generic [ref=e487]:
              - button "更新数据" [ref=e488] [cursor=pointer]
              - button "重播动效" [ref=e490] [cursor=pointer]
            - paragraph [ref=e493]: 滚动到此处查看示例
            - status [ref=e494]: 示例数据 · 已更新 0 次 · 已减少动效
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
            - heading "Bar Chart - Pattern Background" [level=3] [ref=e502]
            - paragraph [ref=e503]: 图案背景替代网格
          - generic [ref=e504]:
            - generic [ref=e505]:
              - button "更新数据" [ref=e506] [cursor=pointer]
              - button "重播动效" [ref=e508] [cursor=pointer]
            - paragraph [ref=e511]: 滚动到此处查看示例
            - status [ref=e512]: 示例数据 · 已更新 0 次 · 已减少动效
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
            - heading "Bar Chart - Dot Grid Background" [level=3] [ref=e520]
            - paragraph [ref=e521]: 带边缘渐隐的点阵背景
          - generic [ref=e522]:
            - generic [ref=e523]:
              - button "更新数据" [ref=e524] [cursor=pointer]
              - button "重播动效" [ref=e526] [cursor=pointer]
            - paragraph [ref=e529]: 滚动到此处查看示例
            - status [ref=e530]: 示例数据 · 已更新 0 次 · 已减少动效
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
        - region [ref=e536]:
          - generic [ref=e537]:
            - heading "Bar Chart - Reference Band" [level=3] [ref=e538]
            - paragraph [ref=e539]: 水平参考区间与边界标识
          - generic [ref=e540]:
            - generic [ref=e541]:
              - button "更新数据" [ref=e542] [cursor=pointer]
              - button "重播动效" [ref=e544] [cursor=pointer]
            - paragraph [ref=e547]: 滚动到此处查看示例
            - status [ref=e548]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e549]:
              - generic "查看本卡代码" [ref=e550] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e551] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e552]: 对应官网示例
            - generic [ref=e553]: （新标签页打开）
        - region [ref=e554]:
          - generic [ref=e555]:
            - heading "Bar Chart - Pattern Reference Band" [level=3] [ref=e556]
            - paragraph [ref=e557]: 图案参考区间与相应轴标签
          - generic [ref=e558]:
            - generic [ref=e559]:
              - button "更新数据" [ref=e560] [cursor=pointer]
              - button "重播动效" [ref=e562] [cursor=pointer]
            - generic [ref=e564]:
              - generic [ref=e565]:
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
              - paragraph [ref=e586]: 人数 · 按日期或班级比较 目标参考区间：40—70人。
              - group [ref=e587]:
                - generic "查看精确数据" [ref=e588] [cursor=pointer]
            - status [ref=e589]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e590]:
              - generic "查看本卡代码" [ref=e591] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e592] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e593]: 对应官网示例
            - generic [ref=e594]: （新标签页打开）
    - region [ref=e595]:
      - heading "交互与状态" [level=2] [ref=e596]
      - generic [ref=e597]:
        - region [ref=e598]:
          - generic [ref=e599]:
            - heading "Bar Chart - Interactive" [level=3] [ref=e600]
            - paragraph [ref=e601]: 90天活动柱图与悬浮读数
          - generic [ref=e602]:
            - generic [ref=e603]:
              - button "更新数据" [ref=e604] [cursor=pointer]
              - button "重播动效" [ref=e606] [cursor=pointer]
            - generic [ref=e608]:
              - generic [ref=e609]:
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
                  - generic: 2026-07-24
                  - generic: 2026-08-16
                  - generic: 2026-09-08
              - paragraph [ref=e709]: 人数 · 按日期或班级比较
              - group [ref=e710]:
                - generic "查看精确数据" [ref=e711] [cursor=pointer]
            - status [ref=e712]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e713]:
              - generic "查看本卡代码" [ref=e714] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e715] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e716]: 对应官网示例
            - generic [ref=e717]: （新标签页打开）
        - region [ref=e718]:
          - generic [ref=e719]:
            - heading "Bar Chart - Loading" [level=3] [ref=e720]
            - paragraph [ref=e721]: 占位柱斜向扫光加载
          - generic [ref=e722]:
            - generic [ref=e723]:
              - button "更新数据" [ref=e724] [cursor=pointer]
              - button "重播动效" [ref=e726] [cursor=pointer]
            - generic [ref=e728]:
              - generic [ref=e729]:
                - button "显示数据" [ref=e730] [cursor=pointer]
                - status [ref=e731]: 静态加载占位 · 点击显示数据
              - status [ref=e732]: 加载中…
              - paragraph [ref=e733]: 人数 · 按日期或班级比较
              - group [ref=e734]:
                - generic "查看精确数据" [ref=e735] [cursor=pointer]
            - status [ref=e736]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e737]:
              - generic "查看本卡代码" [ref=e738] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e739] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e740]: 对应官网示例
            - generic [ref=e741]: （新标签页打开）
        - region [ref=e742]:
          - generic [ref=e743]:
            - heading "Bar Chart - Custom Tooltip" [level=3] [ref=e744]
            - paragraph [ref=e745]: 提示内容与数值格式定制
          - generic [ref=e746]:
            - generic [ref=e747]:
              - button "更新数据" [ref=e748] [cursor=pointer]
              - button "重播动效" [ref=e750] [cursor=pointer]
            - generic [ref=e752]:
              - generic [ref=e753]:
                - generic:
                  - generic:
                    - generic: ¥0
                    - generic: ¥2,000
                    - generic: ¥4,000
                    - generic: ¥6,000
                    - generic: ¥8,000
                - generic:
                  - generic: 一班
                  - generic: 二班
                  - generic: 三班
                  - generic: 四班
                  - generic: 五班
                  - generic: 六班
              - paragraph [ref=e769]: 完成补助 · 人民币（元）
              - group [ref=e770]:
                - generic "查看精确数据" [ref=e771] [cursor=pointer]
            - status [ref=e772]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e773]:
              - generic "查看本卡代码" [ref=e774] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/bar.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e775] [cursor=pointer]:
            - /url: https://bklit.com/charts/bar-chart
            - generic [ref=e776]: 对应官网示例
            - generic [ref=e777]: （新标签页打开）
  - navigation "相关图型" [ref=e778]:
    - link "面积图" [ref=e779] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e781] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e783] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e785] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e787] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e789] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e791] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e793] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e795] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e797] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e799] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e801] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e803] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e805] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e807] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e809] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e811] [cursor=pointer]:
      - /url: "#chart-live-line"
```

# Test source

```ts
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
  98  |         expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${variant.id} at ${width}px`).toBe(true);
  99  |         const duplicateDefs = await page.evaluate(() => {
  100 |           const ids = [...document.querySelectorAll("svg defs [id]")].map(node => node.id);
  101 |           return ids.filter((id, index) => ids.indexOf(id) !== index);
  102 |         });
> 103 |         expect(duplicateDefs, `${variant.id} SVG definitions are instance-safe`).toEqual([]);
      |                                                                                  ^ Error: bar-default SVG definitions are instance-safe
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