# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-refinement.spec.ts >> playground 1197px >> playground pie legend hover has no shadow at 1197
- Location: tests/e2e/chart-feedback-refinement.spec.ts:23:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

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
        - code [ref=e115]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-pie\" data-recipe=\"category-near\"> <ChartExample id=\"pie\" recipe=\"category-near\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
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
    - option "chart-variants/data/README.md"
    - option "chart-variants/data/world.geojson"
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
            - paragraph [ref=e144]: 滚动到此处查看示例
            - status [ref=e145]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e146]:
              - generic "查看本卡代码" [ref=e147] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e148] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e149]: 对应官网示例
            - generic [ref=e150]: （新标签页打开）
        - region [ref=e151]:
          - generic [ref=e152]:
            - heading "Pie Chart - Donut" [level=3] [ref=e153]
            - paragraph [ref=e154]: 空心环饼与动态中心读数
          - generic [ref=e155]:
            - generic [ref=e156]:
              - button "更新数据" [ref=e157] [cursor=pointer]
              - button "重播动效" [ref=e159] [cursor=pointer]
            - paragraph [ref=e162]: 滚动到此处查看示例
            - status [ref=e163]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e164]:
              - generic "查看本卡代码" [ref=e165] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e166] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e167]: 对应官网示例
            - generic [ref=e168]: （新标签页打开）
    - region [ref=e169]:
      - heading "图形材质" [level=2] [ref=e170]
      - generic [ref=e171]:
        - region [ref=e172]:
          - generic [ref=e173]:
            - heading "Pie Chart - Patterns" [level=3] [ref=e174]
            - paragraph [ref=e175]: 每扇区的斜线图案
          - generic [ref=e176]:
            - generic [ref=e177]:
              - button "更新数据" [ref=e178] [cursor=pointer]
              - button "重播动效" [ref=e180] [cursor=pointer]
            - paragraph [ref=e183]: 滚动到此处查看示例
            - status [ref=e184]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e185]:
              - generic "查看本卡代码" [ref=e186] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e187] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e188]: 对应官网示例
            - generic [ref=e189]: （新标签页打开）
        - region [ref=e190]:
          - generic [ref=e191]:
            - heading "Pie Chart - Gradients" [level=3] [ref=e192]
            - paragraph [ref=e193]: 各扇区径向渐变
          - generic [ref=e194]:
            - generic [ref=e195]:
              - button "更新数据" [ref=e196] [cursor=pointer]
              - button "重播动效" [ref=e198] [cursor=pointer]
            - paragraph [ref=e200]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=e202]: 滚动到此处查看示例
            - status [ref=e203]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e204]:
              - generic "查看本卡代码" [ref=e205] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e206] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e207]: 对应官网示例
            - generic [ref=e208]: （新标签页打开）
        - region [ref=e209]:
          - generic [ref=e210]:
            - heading "Donut Chart - Patterns" [level=3] [ref=e211]
            - paragraph [ref=e212]: 图案环饼与中心标签
          - generic [ref=e213]:
            - generic [ref=e214]:
              - button "更新数据" [ref=e215] [cursor=pointer]
              - button "重播动效" [ref=e217] [cursor=pointer]
            - paragraph [ref=e220]: 滚动到此处查看示例
            - status [ref=e221]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e222]:
              - generic "查看本卡代码" [ref=e223] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e224] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e225]: 对应官网示例
            - generic [ref=e226]: （新标签页打开）
    - region [ref=e227]:
      - heading "坐标与辅助读数" [level=2] [ref=e228]
      - region [ref=e230]:
        - generic [ref=e231]:
          - heading "Pie Chart - Custom Center" [level=3] [ref=e232]
          - paragraph [ref=e233]: 定制中心内容与读数
        - generic [ref=e234]:
          - generic [ref=e235]:
            - button "更新数据" [ref=e236] [cursor=pointer]
            - button "重播动效" [ref=e238] [cursor=pointer]
          - generic [ref=e240]:
            - generic [ref=e241]:
              - text: 示例状态
              - combobox "饼图示例状态" [ref=e242] [cursor=pointer]:
                - option "正常" [selected]
                - option "总量为0"
                - option "长中心文案"
            - generic [ref=e246]:
              - img [ref=e247]:
                - generic [ref=e248]:
                  - generic [ref=e249] [cursor=pointer]
                  - generic [ref=e251] [cursor=pointer]
                  - generic [ref=e253] [cursor=pointer]
                  - generic [ref=e255] [cursor=pointer]
              - generic:
                - generic:
                  - generic:
                    - img "500":
                      - generic:
                        - generic:
                          - generic:
                            - generic: "5"
                            - generic: "0"
                            - generic: "0"
                    - text: 人
                  - generic: 课程人数
            - status [ref=e257]: 分母为全部类别合计 500 人；各类别互斥。
            - group [ref=e258]:
              - generic "查看精确数据" [ref=e259] [cursor=pointer]
          - status [ref=e260]: 示例数据 · 已更新 0 次 · 已减少动效
          - group [ref=e261]:
            - generic "查看本卡代码" [ref=e262] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/radial.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e263] [cursor=pointer]:
          - /url: https://bklit.com/charts/pie-chart
          - generic [ref=e264]: 对应官网示例
          - generic [ref=e265]: （新标签页打开）
    - region [ref=e266]:
      - heading "交互与状态" [level=2] [ref=e267]
      - generic [ref=e268]:
        - region [ref=e269]:
          - generic [ref=e270]:
            - heading "Pie Chart - Legend" [level=3] [ref=e271]
            - paragraph [ref=e272]: 图例与扇区悬浮联动
          - generic [ref=e273]:
            - generic [ref=e274]:
              - button "更新数据" [ref=e275] [cursor=pointer]
              - button "重播动效" [ref=e277] [cursor=pointer]
            - generic [ref=e279]:
              - generic [ref=e283]:
                - img [ref=e284]:
                  - generic [ref=e285]:
                    - generic [ref=e286] [cursor=pointer]
                    - generic [ref=e288] [cursor=pointer]
                    - generic [ref=e290] [cursor=pointer]
                    - generic [ref=e292] [cursor=pointer]
                - generic:
                  - generic:
                    - generic:
                      - img "142":
                        - generic:
                          - generic:
                            - generic:
                              - generic: "1"
                              - generic: "4"
                              - generic: "2"
                      - text: 人
                    - generic: 研讨课
              - generic "类别图例" [ref=e294]:
                - button "讲授课 186 人" [ref=e295] [cursor=pointer]:
                  - generic [ref=e297]: 讲授课
                  - generic [ref=e298]: 186 人
                - button "研讨课 142 人" [active] [ref=e299] [cursor=pointer]:
                  - generic [ref=e301]: 研讨课
                  - generic [ref=e302]: 142 人
                - button "实验课 98 人" [ref=e303] [cursor=pointer]:
                  - generic [ref=e305]: 实验课
                  - generic [ref=e306]: 98 人
                - button "实践课 74 人" [ref=e307] [cursor=pointer]:
                  - generic [ref=e309]: 实践课
                  - generic [ref=e310]: 74 人
              - status [ref=e311]: 研讨课：142 人，占 28.4%
              - group [ref=e313]:
                - generic "查看精确数据" [ref=e314] [cursor=pointer]
            - status [ref=e315]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e316]:
              - generic "查看本卡代码" [ref=e317] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e318] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e319]: 对应官网示例
            - generic [ref=e320]: （新标签页打开）
        - region [ref=e321]:
          - generic [ref=e322]:
            - heading "Pie Chart - Grow Hover" [level=3] [ref=e323]
            - paragraph [ref=e324]: 悬浮时增大外径
          - generic [ref=e325]:
            - generic [ref=e326]:
              - button "更新数据" [ref=e327] [cursor=pointer]
              - button "重播动效" [ref=e329] [cursor=pointer]
            - generic [ref=e331]:
              - img [ref=e336]:
                - generic [ref=e337]:
                  - generic [ref=e338] [cursor=pointer]
                  - generic [ref=e340] [cursor=pointer]
                  - generic [ref=e342] [cursor=pointer]
                  - generic [ref=e344] [cursor=pointer]
              - status [ref=e346]: 分母为全部类别合计 500 人；各类别互斥。
              - group [ref=e347]:
                - generic "查看精确数据" [ref=e348] [cursor=pointer]
            - status [ref=e349]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e350]:
              - generic "查看本卡代码" [ref=e351] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e352] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e353]: 对应官网示例
            - generic [ref=e354]: （新标签页打开）
        - region [ref=e355]:
          - generic [ref=e356]:
            - heading "Donut Chart - Grow Hover" [level=3] [ref=e357]
            - paragraph [ref=e358]: 环饼悬浮增大外径并联动中心值
          - generic [ref=e359]:
            - generic [ref=e360]:
              - button "更新数据" [ref=e361] [cursor=pointer]
              - button "重播动效" [ref=e363] [cursor=pointer]
            - generic [ref=e365]:
              - generic [ref=e369]:
                - img [ref=e370]:
                  - generic [ref=e371]:
                    - generic [ref=e372] [cursor=pointer]
                    - generic [ref=e374] [cursor=pointer]
                    - generic [ref=e376] [cursor=pointer]
                    - generic [ref=e378] [cursor=pointer]
                - generic:
                  - generic:
                    - generic:
                      - img "500":
                        - generic:
                          - generic:
                            - generic:
                              - generic: "5"
                              - generic: "0"
                              - generic: "0"
                      - text: 人
                    - generic: 总人数
              - status [ref=e380]: 分母为全部类别合计 500 人；各类别互斥。
              - group [ref=e381]:
                - generic "查看精确数据" [ref=e382] [cursor=pointer]
            - status [ref=e383]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e384]:
              - generic "查看本卡代码" [ref=e385] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e386] [cursor=pointer]:
            - /url: https://bklit.com/charts/pie-chart
            - generic [ref=e387]: 对应官网示例
            - generic [ref=e388]: （新标签页打开）
  - navigation "相关图型" [ref=e389]:
    - link "面积图" [ref=e390] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e392] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e394] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e396] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e398] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e400] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e402] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e404] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e406] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e408] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e410] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e412] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e414] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e416] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e418] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e420] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e422] [cursor=pointer]:
      - /url: "#chart-live-line"
```

# Test source

```ts
  1  | import { expect, test, type Locator } from "@playwright/test";
  2  | import { mkdir } from "node:fs/promises";
  3  | 
  4  | const evidence = process.env.RAIN_CHART_REFINEMENT_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/feedback-2026-10-08-round2/browser";
  5  | test.beforeAll(() => mkdir(evidence, { recursive: true }));
  6  | const centerX = async (plot: Locator) => { const box = (await plot.boundingBox())!; return box.x + box.width / 2; };
  7  | async function centeredHeading(card: Locator) {
  8  |   const text = card.locator(".rain-chart-sunburst-title");
  9  |   const x = await text.evaluate(node => { const range = document.createRange(); range.selectNodeContents(node); const box = range.getBoundingClientRect(); return box.x + box.width / 2; });
  10 |   expect(Math.abs(x - await centerX(card.locator('[data-rain-id="ui-chart-sunburst"] svg').first()))).toBeLessThan(2);
  11 | }
  12 | async function centeredTrail(card: Locator) {
  13 |   const trail = card.getByRole("navigation", { name: "学习内容层级" });
  14 |   const x = await trail.locator("ol").evaluate(node => { const boxes = [...node.children].map(child => child.getBoundingClientRect()); return (Math.min(...boxes.map(box => box.left)) + Math.max(...boxes.map(box => box.right))) / 2; });
  15 |   expect(Math.abs(x - await centerX(card.locator('[data-rain-id="ui-chart-sunburst"] svg').first()))).toBeLessThan(2);
  16 | }
  17 | 
  18 | for (const site of [
  19 |   { name: "playground", base: "http://127.0.0.1:5173/" },
  20 |   { name: "prototype", base: "http://127.0.0.1:5387/bklit-catalog.html" },
  21 | ]) for (const width of [1197, 390]) test.describe(`${site.name} ${width}px`, () => {
  22 |   test.beforeEach(async ({ page }) => { await page.setViewportSize({ width, height: 796 }); await page.emulateMedia({ reducedMotion: "reduce" }); });
  23 |   test(`${site.name} pie legend hover has no shadow at ${width}`, async ({ page }) => {
  24 |     await page.goto(`${site.base}#chart-pie`);
  25 |     const card = page.locator('[data-chart-variant="pie-legend"]');
  26 |     await card.scrollIntoViewIfNeeded();
  27 |     await card.locator(".rain-chart-variant-legend-item").nth(1).focus();
  28 |     await expect(card.locator(".rain-chart-center-label")).toHaveText("研讨课");
  29 |     await page.waitForTimeout(300);
  30 |     const filters = await card.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).filter));
  31 |     expect(filters.length).toBeGreaterThan(0);
> 32 |     expect(filters.every(filter => filter === "none")).toBe(true);
     |                                                        ^ Error: expect(received).toBe(expected) // Object.is equality
  33 |     await card.screenshot({ path: `${evidence}/${site.name}-pie-legend-hover-${width}.png` });
  34 |   });
  35 |   test(`${site.name} every ring has only a centered percentage and label at ${width}`, async ({ page }) => {
  36 |     await page.goto(`${site.base}#chart-ring`);
  37 |     for (const card of await page.locator('[data-chart-variant^="ring-"]').all()) {
  38 |       await card.scrollIntoViewIfNeeded();
  39 |       const reading = card.locator(".rain-chart-center-reading");
  40 |       await expect(reading).toHaveText("70.0%阅读进度");
  41 |       const svg = card.locator("svg").first();
  42 |       const box = (await reading.boundingBox())!, plot = (await svg.boundingBox())!;
  43 |       expect(Math.abs(box.x + box.width / 2 - plot.x - plot.width / 2)).toBeLessThan(2);
  44 |       expect(Math.abs(box.y + box.height / 2 - plot.y - plot.height / 2)).toBeLessThan(2);
  45 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  46 |     }
  47 |     const legend = page.locator('[data-chart-variant="ring-legend"]');
  48 |     await legend.scrollIntoViewIfNeeded();
  49 |     await legend.getByRole("button", { name: /^练习进度/ }).focus();
  50 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("66.7%练习进度");
  51 |     await expect(legend.getByRole("progressbar", { name: "练习进度进度" })).toHaveAttribute("aria-valuemax", "12");
  52 |   });
  53 |   test(`${site.name} reference range dashed boundaries stay light at ${width}`, async ({ page }) => {
  54 |     for (const family of ["bar", "area", "line", "scatter", "candlestick"]) {
  55 |       await page.goto(`${site.base}#chart-${family}`);
  56 |       const card = page.locator(`[data-chart-variant="${family}-reference-band"]`);
  57 |       await card.scrollIntoViewIfNeeded();
  58 |       const lines = card.locator(".chart-reference-area line[stroke-dasharray]");
  59 |       await expect(lines).toHaveCount(2);
  60 |       expect(await lines.evaluateAll(nodes => nodes.every(node => Number(getComputedStyle(node).strokeOpacity) <= .25))).toBe(true);
  61 |       await card.screenshot({ path: `${evidence}/${site.name}-${family}-reference-band-${width}.png` });
  62 |     }
  63 |   });
  64 |   test(`${site.name} every heatmap legend has room below its calendar at ${width}`, async ({ page }) => {
  65 |     await page.goto(`${site.base}#chart-heatmap`);
  66 |     for (const card of await page.locator('[data-chart-variant^="heatmap-"]').all()) {
  67 |       await card.scrollIntoViewIfNeeded();
  68 |       const legend = card.getByText(/^(少|低耗时)$/).locator("..");
  69 |       await expect(legend).toBeVisible();
  70 |       const cells = card.locator(".visx-heatmap-rects rect");
  71 |       const bottom = await cells.evaluateAll(nodes => Math.max(...nodes.map(node => node.getBoundingClientRect().bottom)));
  72 |       const box = (await legend.boundingBox())!;
  73 |       expect(box.y - bottom).toBeGreaterThanOrEqual(16);
  74 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  75 |     }
  76 |     const example = page.locator('main [data-rain-id="chart-heatmap"]').first();
  77 |     const legend = example.getByText("少", { exact: true }).locator("..");
  78 |     await expect(legend).toBeVisible();
  79 |     expect((await legend.boundingBox())!.height).toBeGreaterThan(0);
  80 |     await example.screenshot({ path: `${evidence}/${site.name}-heatmap-default-example-${width}.png` });
  81 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  82 |   });
  83 |   test(`${site.name} all sunburst titles and drilled Breadcrumbs are centered at ${width}`, async ({ page }) => {
  84 |     await page.goto(`${site.base}#chart-sunburst`);
  85 |     for (const card of await page.locator('[data-chart-variant^="sunburst-"]').all()) {
  86 |       await card.scrollIntoViewIfNeeded();
  87 |       await centeredHeading(card);
  88 |       await card.getByRole("button", { name: /基础课程/ }).click();
  89 |       await centeredTrail(card);
  90 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-drill-${width}.png` });
  91 |       await card.getByRole("link", { name: "返回学习内容" }).click();
  92 |       await centeredHeading(card);
  93 |     }
  94 |     const example = page.locator('main [data-rain-id="chart-sunburst"]').first();
  95 |     await example.scrollIntoViewIfNeeded();
  96 |     await centeredHeading(example);
  97 |   });
  98 | });
  99 | 
```