# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-variants.spec.ts >> [T13] pie: all 9 frozen cards render real geometry and readable data at 1440 and 390
- Location: tests/e2e/chart-variants.spec.ts:50:3

# Error details

```
Error: pie browser errors

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 10

- Array []
+ Array [
+   "Error: <path> attribute d: Expected moveto path command ('M' or 'm'), \"undefined\".",
+   "Error: <path> attribute d: Expected moveto path command ('M' or 'm'), \"undefined\".",
+   "Error: <path> attribute d: Expected moveto path command ('M' or 'm'), \"undefined\".",
+   "Error: <path> attribute d: Expected moveto path command ('M' or 'm'), \"undefined\".",
+   "Error: <path> attribute d: Expected moveto path command ('M' or 'm'), \"undefined\".",
+   "Error: <path> attribute d: Expected moveto path command ('M' or 'm'), \"undefined\".",
+   "Error: <path> attribute d: Expected moveto path command ('M' or 'm'), \"undefined\".",
+   "Error: <path> attribute d: Expected moveto path command ('M' or 'm'), \"undefined\".",
+ ]
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "饼图 / 环饼" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 类别构成与原生扇区聚焦，支持环饼形态。
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
          - text: 形态
          - combobox "饼图形态" [ref=e28] [cursor=pointer]:
            - option "环饼" [selected]
            - option "饼图"
        - generic [ref=e32]:
          - img [ref=e33]:
            - generic [ref=e34]:
              - generic [ref=e35] [cursor=pointer]
              - generic [ref=e37] [cursor=pointer]
              - generic [ref=e39] [cursor=pointer]
          - generic:
            - generic:
              - generic:
                - img "764":
                  - generic:
                    - generic:
                      - generic:
                        - generic: "7"
                        - generic: "6"
                        - generic: "4"
              - generic: 课程总量
        - generic [ref=e41]:
          - button "课程一 320" [ref=e43] [cursor=pointer]:
            - generic [ref=e45]: 课程一
            - generic [ref=e46]: "320"
          - button "课程二 248" [ref=e48] [cursor=pointer]:
            - generic [ref=e50]: 课程二
            - generic [ref=e51]: "248"
          - button "课程三 196" [ref=e53] [cursor=pointer]:
            - generic [ref=e55]: 课程三
            - generic [ref=e56]: "196"
        - status [ref=e57]: 合计 764 · 各类别互斥
        - group [ref=e58]:
          - generic "查看精确数据" [ref=e59] [cursor=pointer]
      - status [ref=e60]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - generic [ref=e61]:
    - heading "数据与使用边界" [level=2] [ref=e62]
    - paragraph [ref=e63]: 互斥类别非负值，分母为所有类别总量。
    - paragraph [ref=e64]: 零总量不生成占比；较多小扇区需精确表辅助。
    - paragraph [ref=e65]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=e66]:
    - region [ref=e67]:
      - heading "API 与结构" [level=2] [ref=e68]
      - table [ref=e70]:
        - caption [ref=e71]: 饼图 / 环饼 常用接口
        - rowgroup [ref=e72]:
          - row [ref=e73]:
            - columnheader "名称" [ref=e74]
            - columnheader "类型" [ref=e75]
            - columnheader "默认" [ref=e76]
            - columnheader "说明" [ref=e77]
        - rowgroup [ref=e78]:
          - row [ref=e79]:
            - rowheader [ref=e80]:
              - code [ref=e81]: data / value
            - cell [ref=e82]:
              - code [ref=e83]: 原生图型合同
            - cell "—" [ref=e84]
            - cell "互斥类别非负值，分母为所有类别总量。" [ref=e85]
          - row [ref=e86]:
            - rowheader [ref=e87]:
              - code [ref=e88]: children
            - cell [ref=e89]:
              - code [ref=e90]: Compound Parts
            - cell "—" [ref=e91]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e92]
          - row [ref=e93]:
            - rowheader [ref=e94]:
              - code [ref=e95]: className / style / margin
            - cell [ref=e96]:
              - code [ref=e97]: 原生尺寸接口
            - cell "—" [ref=e98]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e99]
          - row [ref=e100]:
            - rowheader [ref=e101]:
              - code [ref=e102]: enterTransition / animationDuration
            - cell [ref=e103]:
              - code [ref=e104]: 原生动效配置
            - cell "—" [ref=e105]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e106]
      - paragraph [ref=e107]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e108]:
      - heading "调用示例" [level=2] [ref=e109]
      - generic [ref=e110]:
        - generic [ref=e111]:
          - button "复制代码" [ref=e112] [cursor=pointer]
          - status
        - code [ref=e115]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig, useReducedMotion } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; function App() { const [revision, setRevision] = useState(0); const reduced = useReducedMotion() ?? false; return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-pie\" data-recipe=\"category-wide\"> <ChartExample id=\"pie\" recipe=\"category-wide\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e116]:
        - text: 当前源码：
        - code [ref=e117]: packages/ui/src/charts/vendor/charts/pie-chart.tsx
  - group [ref=e118]:
    - generic "调用配置、完整源码与示例数据" [ref=e119] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-variants/profit-loss.tsx"
    - option "chart-variants/shared.tsx"
    - option "chart-data.ts"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
  - region "全部图表变体" [ref=e120]:
    - navigation "变体分组" [ref=e121]:
      - button "基础结构" [ref=e122] [cursor=pointer]
      - button "图形材质" [ref=e124] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e126] [cursor=pointer]
      - button "交互与状态" [ref=e128] [cursor=pointer]
    - region [ref=e130]:
      - heading "基础结构" [level=2] [ref=e131]
      - generic [ref=e132]:
        - region [ref=e133]:
          - generic [ref=e134]:
            - heading "Pie Chart" [level=3] [ref=e135]
            - paragraph [ref=e136]: 互斥类别的实心饼图
          - generic [ref=e137]:
            - generic [ref=e138]:
              - button "更新数据" [ref=e139] [cursor=pointer]
              - button "重播动效" [ref=e141] [cursor=pointer]
            - generic [ref=e143]:
              - generic [ref=e144]:
                - text: 示例状态
                - combobox "饼图示例状态" [ref=e145] [cursor=pointer]:
                  - option "正常" [selected]
                  - option "总量为0"
                  - option "长中心文案"
              - img [ref=e150]:
                - generic [ref=e151]:
                  - generic [ref=e152] [cursor=pointer]
                  - generic [ref=e154] [cursor=pointer]
                  - generic [ref=e156] [cursor=pointer]
                  - generic [ref=e158] [cursor=pointer]
              - status [ref=e160]: 分母为全部类别合计 500 人；各类别互斥。
              - group [ref=e161]:
                - generic "查看精确数据" [ref=e162] [cursor=pointer]
            - status [ref=e163]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e164]:
              - generic "查看本卡代码" [ref=e165] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e166] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e167]: 对应官网示例
            - generic [ref=e168]: （新标签页打开）
        - region [ref=e169]:
          - generic [ref=e170]:
            - heading "Pie Chart - Donut" [level=3] [ref=e171]
            - paragraph [ref=e172]: 空心环饼与动态中心读数
          - generic [ref=e173]:
            - generic [ref=e174]:
              - button "更新数据" [ref=e175] [cursor=pointer]
              - button "重播动效" [ref=e177] [cursor=pointer]
            - generic [ref=e179]:
              - generic [ref=e183]:
                - img [ref=e184]:
                  - generic [ref=e185]:
                    - generic [ref=e186] [cursor=pointer]
                    - generic [ref=e188] [cursor=pointer]
                    - generic [ref=e190] [cursor=pointer]
                    - generic [ref=e192] [cursor=pointer]
                - generic:
                  - generic:
                    - generic:
                      - img "500 人":
                        - generic:
                          - generic:
                            - generic:
                              - generic: "5"
                              - generic: "0"
                              - generic: "0"
                        - generic: 人
                    - generic: 总人数
              - status [ref=e194]: 分母为全部类别合计 500 人；各类别互斥。
              - group [ref=e195]:
                - generic "查看精确数据" [ref=e196] [cursor=pointer]
            - status [ref=e197]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e198]:
              - generic "查看本卡代码" [ref=e199] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e200] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e201]: 对应官网示例
            - generic [ref=e202]: （新标签页打开）
    - region [ref=e203]:
      - heading "图形材质" [level=2] [ref=e204]
      - generic [ref=e205]:
        - region [ref=e206]:
          - generic [ref=e207]:
            - heading "Pie Chart - Patterns" [level=3] [ref=e208]
            - paragraph [ref=e209]: 每扇区的斜线图案
          - generic [ref=e210]:
            - generic [ref=e211]:
              - button "更新数据" [ref=e212] [cursor=pointer]
              - button "重播动效" [ref=e214] [cursor=pointer]
            - generic [ref=e216]:
              - img [ref=e221]:
                - generic [ref=e222]:
                  - generic [ref=e223] [cursor=pointer]
                  - generic [ref=e225] [cursor=pointer]
                  - generic [ref=e227] [cursor=pointer]
                  - generic [ref=e229] [cursor=pointer]
              - status [ref=e231]: 分母为全部类别合计 100 人；各类别互斥。
              - group [ref=e232]:
                - generic "查看精确数据" [ref=e233] [cursor=pointer]
            - status [ref=e234]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e235]:
              - generic "查看本卡代码" [ref=e236] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e237] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e238]: 对应官网示例
            - generic [ref=e239]: （新标签页打开）
        - region [ref=e240]:
          - generic [ref=e241]:
            - heading "Pie Chart - Gradients" [level=3] [ref=e242]
            - paragraph [ref=e243]: 各扇区径向渐变
          - generic [ref=e244]:
            - generic [ref=e245]:
              - button "更新数据" [ref=e246] [cursor=pointer]
              - button "重播动效" [ref=e248] [cursor=pointer]
            - paragraph [ref=e250]: 本卡使用独立示例配色，保留材质或色阶差异。
            - generic [ref=e251]:
              - img [ref=e256]:
                - generic [ref=e257]:
                  - generic [ref=e258] [cursor=pointer]
                  - generic [ref=e260] [cursor=pointer]
                  - generic [ref=e262] [cursor=pointer]
              - status [ref=e264]: 分母为全部类别合计 100 人；各类别互斥。
              - group [ref=e265]:
                - generic "查看精确数据" [ref=e266] [cursor=pointer]
            - status [ref=e267]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e268]:
              - generic "查看本卡代码" [ref=e269] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e270] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e271]: 对应官网示例
            - generic [ref=e272]: （新标签页打开）
        - region [ref=e273]:
          - generic [ref=e274]:
            - heading "Donut Chart - Patterns" [level=3] [ref=e275]
            - paragraph [ref=e276]: 图案环饼与中心标签
          - generic [ref=e277]:
            - generic [ref=e278]:
              - button "更新数据" [ref=e279] [cursor=pointer]
              - button "重播动效" [ref=e281] [cursor=pointer]
            - generic [ref=e283]:
              - generic [ref=e287]:
                - img [ref=e288]:
                  - generic [ref=e289]:
                    - generic [ref=e290] [cursor=pointer]
                    - generic [ref=e292] [cursor=pointer]
                    - generic [ref=e294] [cursor=pointer]
                    - generic [ref=e296] [cursor=pointer]
                - generic:
                  - generic:
                    - generic:
                      - img "100 人":
                        - generic:
                          - generic:
                            - generic:
                              - generic: "1"
                              - generic: "0"
                              - generic: "0"
                        - generic: 人
                    - generic: 总人数
              - status [ref=e298]: 分母为全部类别合计 100 人；各类别互斥。
              - group [ref=e299]:
                - generic "查看精确数据" [ref=e300] [cursor=pointer]
            - status [ref=e301]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e302]:
              - generic "查看本卡代码" [ref=e303] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e304] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e305]: 对应官网示例
            - generic [ref=e306]: （新标签页打开）
    - region [ref=e307]:
      - heading "坐标与辅助读数" [level=2] [ref=e308]
      - region [ref=e310]:
        - generic [ref=e311]:
          - heading "Pie Chart - Custom Center" [level=3] [ref=e312]
          - paragraph [ref=e313]: 定制中心内容与读数
        - generic [ref=e314]:
          - generic [ref=e315]:
            - button "更新数据" [ref=e316] [cursor=pointer]
            - button "重播动效" [ref=e318] [cursor=pointer]
          - generic [ref=e320]:
            - generic [ref=e321]:
              - text: 示例状态
              - combobox "饼图示例状态" [ref=e322] [cursor=pointer]:
                - option "正常" [selected]
                - option "总量为0"
                - option "长中心文案"
            - generic [ref=e326]:
              - img [ref=e327]:
                - generic [ref=e328]:
                  - generic [ref=e329] [cursor=pointer]
                  - generic [ref=e331] [cursor=pointer]
                  - generic [ref=e333] [cursor=pointer]
                  - generic [ref=e335] [cursor=pointer]
              - generic:
                - generic:
                  - generic:
                    - img "500 人":
                      - generic:
                        - generic:
                          - generic:
                            - generic: "5"
                            - generic: "0"
                            - generic: "0"
                      - generic: 人
                  - generic: 课程人数
            - status [ref=e337]: 分母为全部类别合计 500 人；各类别互斥。
            - group [ref=e338]:
              - generic "查看精确数据" [ref=e339] [cursor=pointer]
          - status [ref=e340]: 示例数据 · 已更新 0 次 · 已减少动效
          - group [ref=e341]:
            - generic "查看本卡代码" [ref=e342] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/radial.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e343] [cursor=pointer]:
          - /url: https://bklit.com/charts/pie-chart
          - generic [ref=e344]: 对应官网示例
          - generic [ref=e345]: （新标签页打开）
    - region [ref=e346]:
      - heading "交互与状态" [level=2] [ref=e347]
      - generic [ref=e348]:
        - region [ref=e349]:
          - generic [ref=e350]:
            - heading "Pie Chart - Legend" [level=3] [ref=e351]
            - paragraph [ref=e352]: 图例与扇区悬浮联动
          - generic [ref=e353]:
            - generic [ref=e354]:
              - button "更新数据" [ref=e355] [cursor=pointer]
              - button "重播动效" [ref=e357] [cursor=pointer]
            - generic [ref=e359]:
              - generic [ref=e363]:
                - img [ref=e364]:
                  - generic [ref=e365]:
                    - generic [ref=e366] [cursor=pointer]
                    - generic [ref=e368] [cursor=pointer]
                    - generic [ref=e370] [cursor=pointer]
                    - generic [ref=e372] [cursor=pointer]
                - generic:
                  - generic:
                    - generic:
                      - img "500 人":
                        - generic:
                          - generic:
                            - generic:
                              - generic: "5"
                              - generic: "0"
                              - generic: "0"
                        - generic: 人
                    - generic: 总人数
              - generic "类别图例" [ref=e374]:
                - button "讲授课 186 人" [ref=e375] [cursor=pointer]:
                  - generic [ref=e377]: 讲授课
                  - generic [ref=e378]: 186 人
                - button "研讨课 142 人" [ref=e379] [cursor=pointer]:
                  - generic [ref=e381]: 研讨课
                  - generic [ref=e382]: 142 人
                - button "实验课 98 人" [ref=e383] [cursor=pointer]:
                  - generic [ref=e385]: 实验课
                  - generic [ref=e386]: 98 人
                - button "实践课 74 人" [ref=e387] [cursor=pointer]:
                  - generic [ref=e389]: 实践课
                  - generic [ref=e390]: 74 人
              - status [ref=e391]: 分母为全部类别合计 500 人；各类别互斥。
              - group [ref=e392]:
                - generic "查看精确数据" [ref=e393] [cursor=pointer]
            - status [ref=e394]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e395]:
              - generic "查看本卡代码" [ref=e396] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e397] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e398]: 对应官网示例
            - generic [ref=e399]: （新标签页打开）
        - region [ref=e400]:
          - generic [ref=e401]:
            - heading "Pie Chart - Grow Hover" [level=3] [ref=e402]
            - paragraph [ref=e403]: 悬浮时增大外径
          - generic [ref=e404]:
            - generic [ref=e405]:
              - button "更新数据" [ref=e406] [cursor=pointer]
              - button "重播动效" [ref=e408] [cursor=pointer]
            - generic [ref=e410]:
              - img [ref=e415]:
                - generic [ref=e416]:
                  - generic [ref=e417] [cursor=pointer]
                  - generic [ref=e419] [cursor=pointer]
                  - generic [ref=e421] [cursor=pointer]
                  - generic [ref=e423] [cursor=pointer]
              - status [ref=e425]: 分母为全部类别合计 500 人；各类别互斥。
              - group [ref=e426]:
                - generic "查看精确数据" [ref=e427] [cursor=pointer]
            - status [ref=e428]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e429]:
              - generic "查看本卡代码" [ref=e430] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e431] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e432]: 对应官网示例
            - generic [ref=e433]: （新标签页打开）
        - region [ref=e434]:
          - generic [ref=e435]:
            - heading "Donut Chart - Grow Hover" [level=3] [ref=e436]
            - paragraph [ref=e437]: 环饼悬浮增大外径并联动中心值
          - generic [ref=e438]:
            - generic [ref=e439]:
              - button "更新数据" [ref=e440] [cursor=pointer]
              - button "重播动效" [ref=e442] [cursor=pointer]
            - generic [ref=e444]:
              - generic [ref=e448]:
                - img [ref=e449]:
                  - generic [ref=e450]:
                    - generic [ref=e451] [cursor=pointer]
                    - generic [ref=e453] [cursor=pointer]
                    - generic [ref=e455] [cursor=pointer]
                    - generic [ref=e457] [cursor=pointer]
                - generic:
                  - generic:
                    - generic:
                      - img "500 人":
                        - generic:
                          - generic:
                            - generic:
                              - generic: "5"
                              - generic: "0"
                              - generic: "0"
                        - generic: 人
                    - generic: 总人数
              - status [ref=e459]: 分母为全部类别合计 500 人；各类别互斥。
              - group [ref=e460]:
                - generic "查看精确数据" [active] [ref=e461] [cursor=pointer]
            - status [ref=e462]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e463]:
              - generic "查看本卡代码" [ref=e464] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e465] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e466]: 对应官网示例
            - generic [ref=e467]: （新标签页打开）
  - navigation "相关图型" [ref=e468]:
    - link "面积图" [ref=e469] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e471] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e473] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e475] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e477] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e479] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e481] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e483] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e485] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e487] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e489] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e491] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e493] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e495] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e497] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e499] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e501] [cursor=pointer]:
      - /url: "#chart-live-line"
```

# Test source

```ts
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
  103 |         expect(duplicateDefs, `${variant.id} SVG definitions are instance-safe`).toEqual([]);
  104 |         audit.push({ id: variant.id, width, ...result, rows, duplicateDefs });
  105 |         if (variant === variants[0]) {
  106 |           await card.scrollIntoViewIfNeeded();
  107 |           await card.screenshot({ path: `${evidence}/${family}-${width}-all-variants-reduce.png` });
  108 |         }
  109 |       }
  110 |     }
  111 |     await writeFile(`${evidence}/${family}-render-audit.json`, `${JSON.stringify({ family, count: variants.length, errors, audit }, null, 2)}\n`);
> 112 |     expect(errors, `${family} browser errors`).toEqual([]);
      |                                                ^ Error: pie browser errors
  113 |   });
  114 | }
  115 | 
```