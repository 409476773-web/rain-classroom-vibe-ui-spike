# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: charts-playground.spec.ts >> [E01] interrupted normal-motion updates preserve missing gaps and reduced motion reaches the terminal reading
- Location: tests/e2e/charts-playground.spec.ts:51:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 48
+ Received  +  0

@@ -21,54 +21,6 @@
    "缺测",
    "缺测",
    "缺测",
    "缺测",
    "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
-   "缺测",
  ]
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "面积图" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 时间趋势、轻渐变面积与原生聚焦。
  - generic [ref=e11]:
    - heading "图型与可选配方" [level=2] [ref=e12]
    - paragraph [ref=e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e17]:
            - option "清晰线与轻面积" [selected]
            - option "蓝紫近邻"
            - option "多色类别"
            - option "协调实色"
            - option "蓝灰单色"
        - generic [ref=e18]:
          - text: 示例状态
          - combobox "示例状态" [ref=e19]:
            - option "正常"
            - option "无数据"
            - option "零值"
            - option "单项／单点"
            - option "长标签"
            - option "缺测" [selected]
            - option "无效数据"
        - generic [ref=e20]:
          - text: 系列数
          - combobox "系列数" [ref=e21]:
            - option "3" [selected]
            - option "5"
        - generic [ref=e22]:
          - text: 尺寸配方
          - combobox "尺寸配方" [ref=e23]:
            - option "标准" [selected]
            - option "迷你 / 嵌入"
        - button "更新数据" [active] [ref=e24] [cursor=pointer]
        - button "重播动效" [ref=e26] [cursor=pointer]
      - generic [ref=e28]:
        - status [ref=e29]:
          - strong [ref=e30]: 全部缺测
          - paragraph [ref=e31]: 保留日期与精确数据；没有有效观测，不绘制曲线或柱形。
        - button "参与人数 · 人 · 缺测" [ref=e34] [cursor=pointer]
        - group [ref=e37]:
          - generic "查看精确数据" [ref=e38] [cursor=pointer]
          - generic "精确数据表，可横向滚动" [ref=e39]:
            - table [ref=e40]:
              - caption [ref=e41]: 示例精确数据
              - rowgroup [ref=e42]:
                - row [ref=e43]:
                  - columnheader "日期" [ref=e44]
                  - columnheader "参与人数 · 人" [ref=e45]
              - rowgroup [ref=e46]:
                - row [ref=e47]:
                  - rowheader "9月1日" [ref=e48]
                  - cell "缺测" [ref=e49]
                - row [ref=e50]:
                  - rowheader "9月2日" [ref=e51]
                  - cell "缺测" [ref=e52]
                - row [ref=e53]:
                  - rowheader "9月3日" [ref=e54]
                  - cell "缺测" [ref=e55]
                - row [ref=e56]:
                  - rowheader "9月4日" [ref=e57]
                  - cell "缺测" [ref=e58]
                - row [ref=e59]:
                  - rowheader "9月5日" [ref=e60]
                  - cell "缺测" [ref=e61]
                - row [ref=e62]:
                  - rowheader "9月6日" [ref=e63]
                  - cell "缺测" [ref=e64]
                - row [ref=e65]:
                  - rowheader "9月7日" [ref=e66]
                  - cell "缺测" [ref=e67]
                - row [ref=e68]:
                  - rowheader "9月8日" [ref=e69]
                  - cell "缺测" [ref=e70]
                - row [ref=e71]:
                  - rowheader "9月9日" [ref=e72]
                  - cell "缺测" [ref=e73]
                - row [ref=e74]:
                  - rowheader "9月10日" [ref=e75]
                  - cell "缺测" [ref=e76]
                - row [ref=e77]:
                  - rowheader "9月11日" [ref=e78]
                  - cell "缺测" [ref=e79]
                - row [ref=e80]:
                  - rowheader "9月12日" [ref=e81]
                  - cell "缺测" [ref=e82]
                - row [ref=e83]:
                  - rowheader "9月13日" [ref=e84]
                  - cell "缺测" [ref=e85]
                - row [ref=e86]:
                  - rowheader "9月14日" [ref=e87]
                  - cell "缺测" [ref=e88]
                - row [ref=e89]:
                  - rowheader "9月15日" [ref=e90]
                  - cell "缺测" [ref=e91]
                - row [ref=e92]:
                  - rowheader "9月16日" [ref=e93]
                  - cell "缺测" [ref=e94]
                - row [ref=e95]:
                  - rowheader "9月17日" [ref=e96]
                  - cell "缺测" [ref=e97]
                - row [ref=e98]:
                  - rowheader "9月18日" [ref=e99]
                  - cell "缺测" [ref=e100]
                - row [ref=e101]:
                  - rowheader "9月19日" [ref=e102]
                  - cell "缺测" [ref=e103]
                - row [ref=e104]:
                  - rowheader "9月20日" [ref=e105]
                  - cell "缺测" [ref=e106]
                - row [ref=e107]:
                  - rowheader "9月21日" [ref=e108]
                  - cell "缺测" [ref=e109]
                - row [ref=e110]:
                  - rowheader "9月22日" [ref=e111]
                  - cell "缺测" [ref=e112]
                - row [ref=e113]:
                  - rowheader "9月23日" [ref=e114]
                  - cell "缺测" [ref=e115]
                - row [ref=e116]:
                  - rowheader "9月24日" [ref=e117]
                  - cell "缺测" [ref=e118]
      - status [ref=e119]: 示例数据 · 已更新 2 次
  - generic [ref=e120]:
    - heading "数据与使用边界" [level=2] [ref=e121]
    - paragraph [ref=e122]: 按日期排序；各系列同量纲。本例为人数，透明叠加而非堆叠。
    - paragraph [ref=e123]: 缺测不能默认补零；迷你图是尺寸配方。
    - paragraph [ref=e124]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e125] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - generic [ref=e127]:
    - region [ref=e128]:
      - heading "API 与结构" [level=2] [ref=e129]
      - table [ref=e131]:
        - caption [ref=e132]: 面积图 常用接口
        - rowgroup [ref=e133]:
          - row [ref=e134]:
            - columnheader "名称" [ref=e135]
            - columnheader "类型" [ref=e136]
            - columnheader "默认" [ref=e137]
            - columnheader "说明" [ref=e138]
        - rowgroup [ref=e139]:
          - row [ref=e140]:
            - rowheader [ref=e141]:
              - code [ref=e142]: data / value
            - cell [ref=e143]:
              - code [ref=e144]: 原生图型合同
            - cell "—" [ref=e145]
            - cell "按日期排序；各系列同量纲。本例为人数，透明叠加而非堆叠。" [ref=e146]
          - row [ref=e147]:
            - rowheader [ref=e148]:
              - code [ref=e149]: children
            - cell [ref=e150]:
              - code [ref=e151]: Compound Parts
            - cell "—" [ref=e152]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e153]
          - row [ref=e154]:
            - rowheader [ref=e155]:
              - code [ref=e156]: className / style / margin
            - cell [ref=e157]:
              - code [ref=e158]: 原生尺寸接口
            - cell "—" [ref=e159]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e160]
          - row [ref=e161]:
            - rowheader [ref=e162]:
              - code [ref=e163]: enterTransition / animationDuration
            - cell [ref=e164]:
              - code [ref=e165]: 原生动效配置
            - cell "—" [ref=e166]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e167]
      - paragraph [ref=e168]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e169]:
      - heading "调用示例" [level=2] [ref=e170]
      - generic [ref=e171]:
        - generic [ref=e172]:
          - button "复制代码" [ref=e173] [cursor=pointer]
          - status
        - code [ref=e176]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(2); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-area\" data-recipe=\"trend-soft\"> <ChartExample id=\"area\" recipe=\"trend-soft\" revision={revision} reduced={reduced} state=\"missing\" size=\"standard\" miniSize=\"compact\" seriesCount={3} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e177]:
        - text: 当前源码：
        - code [ref=e178]: packages/ui/src/charts/vendor/charts/area-chart.tsx
  - group [ref=e179]:
    - generic "调用配置、完整源码与示例数据" [ref=e180] [cursor=pointer]
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
  - region "全部图表变体" [ref=e181]:
    - navigation "变体分组" [ref=e182]:
      - button "基础结构" [ref=e183] [cursor=pointer]
      - button "图形材质" [ref=e185] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e187] [cursor=pointer]
      - button "交互与状态" [ref=e189] [cursor=pointer]
    - region [ref=e191]:
      - heading "基础结构" [level=2] [ref=e192]
      - generic [ref=e193]:
        - region [ref=e194]:
          - generic [ref=e195]:
            - heading "Area Chart" [level=3] [ref=e196]
            - paragraph [ref=e197]: 默认平滑渐变面积
          - generic [ref=e198]:
            - generic [ref=e199]:
              - button "更新数据" [ref=e200] [cursor=pointer]
              - button "重播动效" [ref=e202] [cursor=pointer]
            - paragraph [ref=e205]: 滚动到此处查看示例
            - status [ref=e206]: 示例数据 · 已更新 0 次
            - group [ref=e207]:
              - generic "查看本卡代码" [ref=e208] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e209] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e210]: 对应官网示例
            - generic [ref=e211]: （新标签页打开）
        - region [ref=e212]:
          - generic [ref=e213]:
            - heading "Area Chart - Step" [level=3] [ref=e214]
            - paragraph [ref=e215]: 阶梯插值表达离散变化
          - generic [ref=e216]:
            - generic [ref=e217]:
              - button "更新数据" [ref=e218] [cursor=pointer]
              - button "重播动效" [ref=e220] [cursor=pointer]
            - paragraph [ref=e223]: 滚动到此处查看示例
            - status [ref=e224]: 示例数据 · 已更新 0 次
            - group [ref=e225]:
              - generic "查看本卡代码" [ref=e226] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e227] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e228]: 对应官网示例
            - generic [ref=e229]: （新标签页打开）
        - region [ref=e230]:
          - generic [ref=e231]:
            - heading "Area Chart - Stacked" [level=3] [ref=e232]
            - paragraph [ref=e233]: 多面积叠加对比；不推定累计求和
          - generic [ref=e234]:
            - generic [ref=e235]:
              - button "更新数据" [ref=e236] [cursor=pointer]
              - button "重播动效" [ref=e238] [cursor=pointer]
            - paragraph [ref=e241]: 滚动到此处查看示例
            - status [ref=e242]: 示例数据 · 已更新 0 次
            - group [ref=e243]:
              - generic "查看本卡代码" [ref=e244] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e245] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e246]: 对应官网示例
            - generic [ref=e247]: （新标签页打开）
    - region [ref=e248]:
      - heading "图形材质" [level=2] [ref=e249]
      - generic [ref=e250]:
        - region [ref=e251]:
          - generic [ref=e252]:
            - heading "Area Chart - Gradient" [level=3] [ref=e253]
            - paragraph [ref=e254]: 调整底部透明度的面积填充
          - generic [ref=e255]:
            - generic [ref=e256]:
              - button "更新数据" [ref=e257] [cursor=pointer]
              - button "重播动效" [ref=e259] [cursor=pointer]
            - paragraph [ref=e261]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=e263]: 滚动到此处查看示例
            - status [ref=e264]: 示例数据 · 已更新 0 次
            - group [ref=e265]:
              - generic "查看本卡代码" [ref=e266] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e267] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e268]: 对应官网示例
            - generic [ref=e269]: （新标签页打开）
        - region [ref=e270]:
          - generic [ref=e271]:
            - heading "Area Chart - No Stroke" [level=3] [ref=e272]
            - paragraph [ref=e273]: 隐藏面积轮廓线
          - generic [ref=e274]:
            - generic [ref=e275]:
              - button "更新数据" [ref=e276] [cursor=pointer]
              - button "重播动效" [ref=e278] [cursor=pointer]
            - paragraph [ref=e281]: 滚动到此处查看示例
            - status [ref=e282]: 示例数据 · 已更新 0 次
            - group [ref=e283]:
              - generic "查看本卡代码" [ref=e284] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e285] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e286]: 对应官网示例
            - generic [ref=e287]: （新标签页打开）
        - region [ref=e288]:
          - generic [ref=e289]:
            - heading "Area Chart - Fade Edges" [level=3] [ref=e290]
            - paragraph [ref=e291]: 左右边缘渐隐
          - generic [ref=e292]:
            - generic [ref=e293]:
              - button "更新数据" [ref=e294] [cursor=pointer]
              - button "重播动效" [ref=e296] [cursor=pointer]
            - paragraph [ref=e299]: 滚动到此处查看示例
            - status [ref=e300]: 示例数据 · 已更新 0 次
            - group [ref=e301]:
              - generic "查看本卡代码" [ref=e302] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e303] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e304]: 对应官网示例
            - generic [ref=e305]: （新标签页打开）
        - region [ref=e306]:
          - generic [ref=e307]:
            - heading "Area Chart - Pattern" [level=3] [ref=e308]
            - paragraph [ref=e309]: 斜线图案面积填充
          - generic [ref=e310]:
            - generic [ref=e311]:
              - button "更新数据" [ref=e312] [cursor=pointer]
              - button "重播动效" [ref=e314] [cursor=pointer]
            - paragraph [ref=e317]: 滚动到此处查看示例
            - status [ref=e318]: 示例数据 · 已更新 0 次
            - group [ref=e319]:
              - generic "查看本卡代码" [ref=e320] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e321] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e322]: 对应官网示例
            - generic [ref=e323]: （新标签页打开）
        - region [ref=e324]:
          - generic [ref=e325]:
            - heading "Area Chart - Series Markers" [level=3] [ref=e326]
            - paragraph [ref=e327]: 各数据点使用圆环标记
          - generic [ref=e328]:
            - generic [ref=e329]:
              - button "更新数据" [ref=e330] [cursor=pointer]
              - button "重播动效" [ref=e332] [cursor=pointer]
            - paragraph [ref=e335]: 滚动到此处查看示例
            - status [ref=e336]: 示例数据 · 已更新 0 次
            - group [ref=e337]:
              - generic "查看本卡代码" [ref=e338] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e339] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e340]: 对应官网示例
            - generic [ref=e341]: （新标签页打开）
        - region [ref=e342]:
          - generic [ref=e343]:
            - heading "Area Chart - Dashed Tail" [level=3] [ref=e344]
            - paragraph [ref=e345]: 未完整时段使用虚线尾段
          - generic [ref=e346]:
            - generic [ref=e347]:
              - button "更新数据" [ref=e348] [cursor=pointer]
              - button "重播动效" [ref=e350] [cursor=pointer]
            - paragraph [ref=e353]: 滚动到此处查看示例
            - status [ref=e354]: 示例数据 · 已更新 0 次
            - group [ref=e355]:
              - generic "查看本卡代码" [ref=e356] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e357] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e358]: 对应官网示例
            - generic [ref=e359]: （新标签页打开）
    - region [ref=e360]:
      - heading "坐标与辅助读数" [level=2] [ref=e361]
      - generic [ref=e362]:
        - region [ref=e363]:
          - generic [ref=e364]:
            - heading "Area Chart - Left Y axis" [level=3] [ref=e365]
            - paragraph [ref=e366]: 同量纲系列共用左纵轴
          - generic [ref=e367]:
            - generic [ref=e368]:
              - button "更新数据" [ref=e369] [cursor=pointer]
              - button "重播动效" [ref=e371] [cursor=pointer]
            - paragraph [ref=e374]: 滚动到此处查看示例
            - status [ref=e375]: 示例数据 · 已更新 0 次
            - group [ref=e376]:
              - generic "查看本卡代码" [ref=e377] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e378] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e379]: 对应官网示例
            - generic [ref=e380]: （新标签页打开）
        - region [ref=e381]:
          - generic [ref=e382]:
            - heading "Area Chart - Left and right Y axes" [level=3] [ref=e383]
            - paragraph [ref=e384]: 左右独立纵轴与量纲
          - generic [ref=e385]:
            - generic [ref=e386]:
              - button "更新数据" [ref=e387] [cursor=pointer]
              - button "重播动效" [ref=e389] [cursor=pointer]
            - paragraph [ref=e392]: 滚动到此处查看示例
            - status [ref=e393]: 示例数据 · 已更新 0 次
            - group [ref=e394]:
              - generic "查看本卡代码" [ref=e395] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e396] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e397]: 对应官网示例
            - generic [ref=e398]: （新标签页打开）
        - region [ref=e399]:
          - generic [ref=e400]:
            - heading "Area Chart - Pattern Background" [level=3] [ref=e401]
            - paragraph [ref=e402]: 图案背景替代网格
          - generic [ref=e403]:
            - generic [ref=e404]:
              - button "更新数据" [ref=e405] [cursor=pointer]
              - button "重播动效" [ref=e407] [cursor=pointer]
            - paragraph [ref=e410]: 滚动到此处查看示例
            - status [ref=e411]: 示例数据 · 已更新 0 次
            - group [ref=e412]:
              - generic "查看本卡代码" [ref=e413] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e414] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e415]: 对应官网示例
            - generic [ref=e416]: （新标签页打开）
        - region [ref=e417]:
          - generic [ref=e418]:
            - heading "Area Chart - Dot Grid Background" [level=3] [ref=e419]
            - paragraph [ref=e420]: 带边缘渐隐的点阵背景
          - generic [ref=e421]:
            - generic [ref=e422]:
              - button "更新数据" [ref=e423] [cursor=pointer]
              - button "重播动效" [ref=e425] [cursor=pointer]
            - paragraph [ref=e428]: 滚动到此处查看示例
            - status [ref=e429]: 示例数据 · 已更新 0 次
            - group [ref=e430]:
              - generic "查看本卡代码" [ref=e431] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e432] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e433]: 对应官网示例
            - generic [ref=e434]: （新标签页打开）
        - region [ref=e435]:
          - generic [ref=e436]:
            - heading "Area Chart - Reference Band" [level=3] [ref=e437]
            - paragraph [ref=e438]: 带边界标识的水平参考区间
          - generic [ref=e439]:
            - generic [ref=e440]:
              - button "更新数据" [ref=e441] [cursor=pointer]
              - button "重播动效" [ref=e443] [cursor=pointer]
            - paragraph [ref=e446]: 滚动到此处查看示例
            - status [ref=e447]: 示例数据 · 已更新 0 次
            - group [ref=e448]:
              - generic "查看本卡代码" [ref=e449] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e450] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e451]: 对应官网示例
            - generic [ref=e452]: （新标签页打开）
        - region [ref=e453]:
          - generic [ref=e454]:
            - heading "Area Chart - Pattern Reference Band" [level=3] [ref=e455]
            - paragraph [ref=e456]: 图案参考区间与相应轴标签
          - generic [ref=e457]:
            - generic [ref=e458]:
              - button "更新数据" [ref=e459] [cursor=pointer]
              - button "重播动效" [ref=e461] [cursor=pointer]
            - paragraph [ref=e464]: 滚动到此处查看示例
            - status [ref=e465]: 示例数据 · 已更新 0 次
            - group [ref=e466]:
              - generic "查看本卡代码" [ref=e467] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e468] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e469]: 对应官网示例
            - generic [ref=e470]: （新标签页打开）
    - region [ref=e471]:
      - heading "交互与状态" [level=2] [ref=e472]
      - generic [ref=e473]:
        - region [ref=e474]:
          - generic [ref=e475]:
            - heading "Area Chart - Interactive" [level=3] [ref=e476]
            - paragraph [ref=e477]: 双面积趋势、曲线选择与临时拖选
          - generic [ref=e478]:
            - generic [ref=e479]:
              - button "更新数据" [ref=e480] [cursor=pointer]
              - button "重播动效" [ref=e482] [cursor=pointer]
            - paragraph [ref=e485]: 滚动到此处查看示例
            - status [ref=e486]: 示例数据 · 已更新 0 次
            - group [ref=e487]:
              - generic "查看本卡代码" [ref=e488] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e489] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e490]: 对应官网示例
            - generic [ref=e491]: （新标签页打开）
        - region [ref=e492]:
          - generic [ref=e493]:
            - heading "Area Chart - Loading" [level=3] [ref=e494]
            - paragraph [ref=e495]: 网格与前景脉冲加载
          - generic [ref=e496]:
            - generic [ref=e497]:
              - button "更新数据" [ref=e498] [cursor=pointer]
              - button "重播动效" [ref=e500] [cursor=pointer]
            - paragraph [ref=e503]: 滚动到此处查看示例
            - status [ref=e504]: 示例数据 · 已更新 0 次
            - group [ref=e505]:
              - generic "查看本卡代码" [ref=e506] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e507] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e508]: 对应官网示例
            - generic [ref=e509]: （新标签页打开）
        - region [ref=e510]:
          - generic [ref=e511]:
            - heading "Area Chart - Loading (Sweep)" [level=3] [ref=e512]
            - paragraph [ref=e513]: 斜向扫光骨架加载
          - generic [ref=e514]:
            - generic [ref=e515]:
              - button "更新数据" [ref=e516] [cursor=pointer]
              - button "重播动效" [ref=e518] [cursor=pointer]
            - paragraph [ref=e521]: 滚动到此处查看示例
            - status [ref=e522]: 示例数据 · 已更新 0 次
            - group [ref=e523]:
              - generic "查看本卡代码" [ref=e524] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e525] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e526]: 对应官网示例
            - generic [ref=e527]: （新标签页打开）
        - region [ref=e528]:
          - generic [ref=e529]:
            - heading "Area Chart - Segment Selection" [level=3] [ref=e530]
            - paragraph [ref=e531]: 按下并拖动时高亮一段范围
          - generic [ref=e532]:
            - generic [ref=e533]:
              - button "更新数据" [ref=e534] [cursor=pointer]
              - button "重播动效" [ref=e536] [cursor=pointer]
            - paragraph [ref=e539]: 滚动到此处查看示例
            - status [ref=e540]: 示例数据 · 已更新 0 次
            - group [ref=e541]:
              - generic "查看本卡代码" [ref=e542] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e543] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e544]: 对应官网示例
            - generic [ref=e545]: （新标签页打开）
  - navigation "相关图型" [ref=e546]:
    - link "面积图" [ref=e547] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e549] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e551] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e553] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e555] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e557] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e559] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e561] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e563] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e565] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e567] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e569] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e571] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e573] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e575] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e577] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e579] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e581] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e583] [cursor=pointer]:
      - /url: "#chart-network"
```

# Test source

```ts
  1   | import { test, expect, type Locator, type Page } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | import { CHART_ENTRIES } from "../../apps/playground/src/docs/components/chart-catalog";
  4   | 
  5   | const evidence = process.env.RAIN_CHART_PLAYGROUND_EVIDENCE_DIR ?? "evidence/runtime/bklit-rain-catalog/playground";
  6   | 
  7   | async function hoverDefaultDate(page: Page, host: Locator, index: number, composed = false) {
  8   |   const svg = host.locator(".rain-chart-plot svg").first();
  9   |   await svg.scrollIntoViewIfNeeded();
  10  |   const box = (await svg.boundingBox())!;
  11  |   await page.mouse.move(box.x + 58 + (box.width - 58 - (composed ? 58 : 24)) * index / 23, box.y + box.height / 2);
  12  | }
  13  | 
  14  | test("[E01] standard missing readings keep dates, real zero and tooltip meanings", async ({ page }) => {
  15  |   await page.emulateMedia({ reducedMotion: "reduce" });
  16  |   const facts = [];
  17  |   for (const id of ["line", "area", "composed"]) {
  18  |     await page.goto(`/#chart-${id}`);
  19  |     const host = page.locator(`[data-rain-id="chart-${id}"]`);
  20  |     await page.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("missing");
  21  |     await expect(host.locator(".rain-chart-plot svg").first()).toBeVisible();
  22  |     await host.getByText("查看精确数据", { exact: true }).click();
  23  |     const rows = host.locator("tbody tr");
  24  |     await expect(rows).toHaveCount(24);
  25  |     await expect(rows.nth(1)).toContainText("缺测");
  26  |     await expect(rows.nth(2).locator("td").first()).toHaveText("0");
  27  |     await expect(rows.last()).toContainText("缺测");
  28  |     if (id === "composed") await expect(rows.nth(2)).toContainText("不适用");
  29  |     await expect(host.locator(".legend-container")).toContainText("缺测");
  30  |     const tooltip = host.locator(".rain-chart-tooltip");
  31  |     await hoverDefaultDate(page, host, 1, id === "composed");
  32  |     await expect(tooltip).toContainText("9月2日");
  33  |     await expect(tooltip).toContainText("缺测");
  34  |     await expect(tooltip).not.toContainText("null");
  35  |     await expect(tooltip).not.toContainText("不适用");
  36  |     await hoverDefaultDate(page, host, 2, id === "composed");
  37  |     await expect(tooltip).toContainText("9月3日");
  38  |     await expect(tooltip).toContainText("0");
  39  |     await expect(tooltip).not.toContainText("缺测");
  40  |     if (id === "composed") await expect(tooltip).toContainText("不适用");
  41  |     expect(await host.locator(".rain-chart-plot path[d]").evaluateAll(paths => paths.some(path => (path.getAttribute("d")?.match(/M/g) ?? []).length > 1))).toBe(true);
  42  |     const dates = await rows.locator("th").allTextContents();
  43  |     facts.push({ id, dates, tooltipZero: await tooltip.innerText(), finalReading: await rows.last().innerText() });
  44  |     await page.mouse.move(0, 0);
  45  |     await mkdir(evidence, { recursive: true });
  46  |     await host.screenshot({ path: `${evidence}/e01-standard-${id}-missing.png` });
  47  |   }
  48  |   await writeFile(`${evidence}/e01-standard-facts.json`, JSON.stringify(facts, null, 2));
  49  | });
  50  | 
  51  | test("[E01] interrupted normal-motion updates preserve missing gaps and reduced motion reaches the terminal reading", async ({ page }) => {
  52  |   const facts = [];
  53  |   for (const id of ["line", "area", "composed"]) {
  54  |     await page.emulateMedia({ reducedMotion: "no-preference" });
  55  |     await page.goto(`/#chart-${id}`);
  56  |     const host = page.locator(`[data-rain-id="chart-${id}"]`);
  57  |     const controls = page.locator("[data-chart-default-controls]");
  58  |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("missing");
  59  |     await expect(host.locator(".rain-chart-plot svg").first()).toBeVisible();
  60  |     await host.getByText("查看精确数据", { exact: true }).click();
  61  |     const dates = await host.locator("tbody th").allTextContents();
  62  |     await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  63  |     await page.waitForTimeout(80);
  64  |     const during = await host.locator(".rain-chart-plot path[d]").evaluateAll(paths => paths.map(path => path.getAttribute("d")));
  65  |     expect(during.some(path => (path?.match(/M/g) ?? []).length > 1)).toBe(true);
  66  |     expect(during.every(path => !/NaN|Infinity|undefined/.test(path ?? ""))).toBe(true);
  67  |     await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  68  |     await expect(host.getByRole("status")).toContainText("全部缺测");
  69  |     await expect(host.locator("svg")).toHaveCount(0);
  70  |     await expect(host.locator("tbody tr")).toHaveCount(24);
> 71  |     expect(await host.locator("tbody td").allTextContents()).toEqual(Array(24 * 3).fill("缺测"));
      |                                                              ^ Error: expect(received).toEqual(expected) // deep equality
  72  |     expect(await host.locator("tbody th").allTextContents()).toEqual(dates);
  73  |     await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  74  |     await expect(host.locator(".rain-chart-plot svg").first()).toBeVisible();
  75  |     await expect(host.locator("tbody tr").nth(1)).toContainText("缺测");
  76  |     await page.emulateMedia({ reducedMotion: "reduce" });
  77  |     await expect(page.getByRole("status").filter({ hasText: "已按系统设置减少动效" })).toBeVisible();
  78  |     await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  79  |     const reduced = await host.locator(".rain-chart-plot path[d]").evaluateAll(paths => paths.map(path => path.getAttribute("d")));
  80  |     await page.waitForTimeout(100);
  81  |     expect(await host.locator(".rain-chart-plot path[d]").evaluateAll(paths => paths.map(path => path.getAttribute("d")))).toEqual(reduced);
  82  |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("normal");
  83  |     await expect(host.locator("svg").first()).toBeVisible();
  84  |     expect(await host.locator("tbody td").allTextContents()).not.toContain("缺测");
  85  |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("zero");
  86  |     await expect(host.locator("tbody td").first()).toHaveText("0");
  87  |     if (id === "composed") await expect(host.locator("tbody tr").first()).toContainText("不适用");
  88  |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("single");
  89  |     await expect(host.locator("tbody tr")).toHaveCount(1);
  90  |     await expect(host.locator("svg").first()).toBeVisible();
  91  |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("invalid");
  92  |     await expect(host).toContainText("已拒绝无效数据");
  93  |     await expect(host.locator("svg")).toHaveCount(0);
  94  |     facts.push({ id, datesRetained: true, intermediateGaps: true, allMissingRows: 24, reducedGeometryStable: true, normalZeroSingleInvalid: true });
  95  |   }
  96  |   await mkdir(evidence, { recursive: true });
  97  |   await writeFile(`${evidence}/e01-motion-facts.json`, JSON.stringify(facts, null, 2));
  98  | });
  99  | 
  100 | test("[E01] both mini trend sizes keep their slots and missing latest readings across state changes", async ({ page }) => {
  101 |   await page.emulateMedia({ reducedMotion: "reduce" });
  102 |   const facts = [];
  103 |   for (const id of ["line", "area"]) for (const size of ["compact", "comfortable"]) {
  104 |     await page.goto(`/#chart-${id}`);
  105 |     const host = page.locator(`[data-rain-id="chart-${id}"]`);
  106 |     const controls = page.locator("[data-chart-default-controls]");
  107 |     await controls.getByRole("combobox", { name: "尺寸配方", exact: true }).selectOption("mini");
  108 |     await controls.getByRole("combobox", { name: "迷你型号", exact: true }).selectOption(size);
  109 |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("missing");
  110 |     const slot = host.locator(".rain-business-mini-slot");
  111 |     await expect(slot).toHaveCSS("width", size === "compact" ? "96px" : "128px");
  112 |     await expect(slot).toHaveCSS("height", size === "compact" ? "32px" : "48px");
  113 |     await expect(host.locator(".rain-chart-metric strong")).toHaveText("缺测");
  114 |     await expect(slot.locator("svg").first()).toBeVisible();
  115 |     await host.getByText("查看精确数据", { exact: true }).click();
  116 |     await expect(host.locator("tbody tr")).toHaveCount(24);
  117 |     await expect(host.locator("tbody tr").last()).toContainText("缺测");
  118 |     await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  119 |     await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  120 |     await expect(host.getByRole("status")).toContainText("全部缺测");
  121 |     await expect(slot.locator("svg")).toHaveCount(0);
  122 |     await expect(host.locator(".rain-chart-metric strong")).toHaveText("缺测");
  123 |     await expect(slot).toHaveCSS("width", size === "compact" ? "96px" : "128px");
  124 |     await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  125 |     await expect(slot.locator("svg").first()).toBeVisible();
  126 |     for (const state of ["zero", "normal", "single"]) {
  127 |       await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption(state);
  128 |       await expect(slot.locator("svg").first()).toBeVisible();
  129 |       await expect(host.locator("tbody tr")).toHaveCount(state === "single" ? 1 : 24);
  130 |       if (state === "zero") await expect(host.locator(".rain-chart-metric strong")).toHaveText("0");
  131 |       else await expect(host.locator(".rain-chart-metric strong")).not.toHaveText("缺测");
  132 |     }
  133 |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("invalid");
  134 |     await expect(host).toContainText("已拒绝无效数据");
  135 |     await expect(host.locator("svg")).toHaveCount(0);
  136 |     facts.push({ id, size, latestMissing: true, allMissingSlotPreserved: true, states: ["missing", "zero", "normal", "single", "invalid"] });
  137 |   }
  138 |   await mkdir(evidence, { recursive: true });
  139 |   await writeFile(`${evidence}/e01-mini-facts.json`, JSON.stringify(facts, null, 2));
  140 | });
  141 | 
  142 | test("[E02] standard and both mini bars retain real zeros and explain their reference-only scale", async ({ page }) => {
  143 |   await page.emulateMedia({ reducedMotion: "reduce" });
  144 |   for (const size of ["standard", "compact", "comfortable"]) {
  145 |     await page.goto("/#chart-bar");
  146 |     const host = page.locator('[data-rain-id="chart-bar"]');
  147 |     const controls = page.locator("[data-chart-default-controls]");
  148 |     if (size !== "standard") {
  149 |       await controls.getByRole("combobox", { name: "尺寸配方", exact: true }).selectOption("mini");
  150 |       await controls.getByRole("combobox", { name: "迷你型号", exact: true }).selectOption(size);
  151 |     }
  152 |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("zero");
  153 |     await expect(host.getByText(/全零.*量程.*1/)).toBeVisible();
  154 |     await host.getByText("查看精确数据", { exact: true }).click();
  155 |     await expect(host.locator("tbody tr")).toHaveCount(6);
  156 |     expect((await host.locator("tbody td").allTextContents()).every(text => text === "0")).toBe(true);
  157 |     const bars = host.locator('g[class^="bar-series-"] rect');
  158 |     await expect(bars).toHaveCount(size === "standard" ? 18 : 6);
  159 |     expect(await bars.evaluateAll(nodes => nodes.every(node => Number(node.getAttribute("height")) === 0))).toBe(true);
  160 |     for (const state of ["normal", "single"]) {
  161 |       await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption(state);
  162 |       await expect(host.getByText(/全零.*量程.*1/)).toHaveCount(0);
  163 |       await expect(host.locator("tbody tr")).toHaveCount(state === "single" ? 1 : 6);
  164 |       await expect(host.locator("svg").first()).toBeVisible();
  165 |     }
  166 |     await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("invalid");
  167 |     await expect(host).toContainText("已拒绝无效数据");
  168 |     await expect(host.locator("svg")).toHaveCount(0);
  169 |   }
  170 | });
  171 | 
```