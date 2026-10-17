# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-curve-refinement.spec.ts >> 390px reduce >> representative official area, dual-axis line and markers keep their actual native path and interactions
- Location: tests/e2e/chart-curve-refinement.spec.ts:98:3

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 7
Received length: 1
Received array:  [0]
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "组合图" [active] [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 面积、柱与线共享日期，人数和比率分别读取。
  - generic [ref=e11]:
    - heading "图型与可选配方" [level=2] [ref=e12]
    - paragraph [ref=e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - generic:
            - generic:
              - generic: "0"
              - generic: "100"
              - generic: "200"
              - generic: "300"
              - generic: "400"
          - generic:
            - generic:
              - generic: 0%
              - generic: 20%
              - generic: 40%
              - generic: 60%
              - generic: 80%
          - generic:
            - generic: Sep 1
            - generic: Sep 9
            - generic: Sep 17
            - generic: Sep 24
        - generic [ref=e55]:
          - button "参与人数 · 人" [ref=e57] [cursor=pointer]
          - button "完成人数 · 人" [ref=e61] [cursor=pointer]
          - button "完成率 · %" [ref=e65] [cursor=pointer]
        - group [ref=e68]:
          - generic "查看精确数据" [ref=e69] [cursor=pointer]
      - generic [ref=e70]:
        - generic [ref=e71]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e72]:
            - option "蓝紫近邻"
            - option "多色类别"
            - option "协调实色"
            - option "蓝灰单色" [selected]
        - generic [ref=e73]:
          - text: 示例状态
          - combobox "示例状态" [ref=e74]:
            - option "正常" [selected]
            - option "无数据"
            - option "零值"
            - option "单项／单点"
            - option "长标签"
            - option "缺测"
            - option "无效数据"
        - button "更新数据" [ref=e75] [cursor=pointer]
        - button "重播动效" [ref=e77] [cursor=pointer]
      - status [ref=e79]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - group [ref=e80]:
    - generic "调用配置、完整源码与示例数据" [ref=e81] [cursor=pointer]
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
  - region "全部图表变体" [ref=e82]:
    - navigation "变体分组" [ref=e83]:
      - button "基础结构" [ref=e84] [cursor=pointer]
      - button "图形材质" [ref=e86] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e88] [cursor=pointer]
    - region [ref=e90]:
      - heading "基础结构" [level=2] [ref=e91]
      - generic [ref=e92]:
        - region [ref=e93]:
          - generic [ref=e94]:
            - heading "Composed Chart" [level=3] [ref=e95]
            - paragraph [ref=e96]: 共享时间轴组合面积、柱与折线
          - generic [ref=e97]:
            - generic [ref=e98]:
              - generic [ref=e99]:
                - text: 曲线
                - combobox "图表曲线" [ref=e100] [cursor=pointer]:
                  - option "Natural"
                  - option "Monotone X"
                  - option "Linear"
                  - option "Step"
                  - option "Basis"
                  - option "Catmull–Rom" [selected]
              - generic [ref=e101]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 9
                  - generic: Sep 17
                  - generic: Sep 24
              - generic [ref=e140]:
                - button "完成人数 · 人" [ref=e142] [cursor=pointer]
                - button "参与人数 · 人" [ref=e145] [cursor=pointer]
                - button "复习人数 · 人" [ref=e148] [cursor=pointer]
              - group [ref=e150]:
                - generic "查看精确数据" [ref=e151] [cursor=pointer]
            - generic [ref=e152]:
              - button "更新数据" [ref=e153] [cursor=pointer]
              - button "重播动效" [ref=e155] [cursor=pointer]
              - status [ref=e157]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e158]:
              - generic "查看本卡代码" [ref=e159] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e160] [cursor=pointer]:
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e161]: 对应官网示例
            - generic [ref=e162]: （新标签页打开）
        - region [ref=e163]:
          - generic [ref=e164]:
            - heading "Composed Chart — Bar + line" [level=3] [ref=e165]
            - paragraph [ref=e166]: 每日柱与一条趋势线
          - generic [ref=e167]:
            - paragraph [ref=e169]: 滚动到此处查看示例
            - generic [ref=e170]:
              - button "更新数据" [ref=e171] [cursor=pointer]
              - button "重播动效" [ref=e173] [cursor=pointer]
              - status [ref=e175]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e176]:
              - generic "查看本卡代码" [ref=e177] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e178] [cursor=pointer]:
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e179]: 对应官网示例
            - generic [ref=e180]: （新标签页打开）
        - region [ref=e181]:
          - generic [ref=e182]:
            - heading "Composed Chart — Stacked SeriesBar + line" [level=3] [ref=e183]
            - paragraph [ref=e184]: 互斥分段堆叠柱与趋势线
          - generic [ref=e185]:
            - paragraph [ref=e187]: 滚动到此处查看示例
            - generic [ref=e188]:
              - button "更新数据" [ref=e189] [cursor=pointer]
              - button "重播动效" [ref=e191] [cursor=pointer]
              - status [ref=e193]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e194]:
              - generic "查看本卡代码" [ref=e195] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e196] [cursor=pointer]:
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e197]: 对应官网示例
            - generic [ref=e198]: （新标签页打开）
        - region [ref=e199]:
          - generic [ref=e200]:
            - heading "Composed Chart — Grouped bars, no gap" [level=3] [ref=e201]
            - paragraph [ref=e202]: 零间隙分组柱
          - generic [ref=e203]:
            - paragraph [ref=e205]: 滚动到此处查看示例
            - generic [ref=e206]:
              - button "更新数据" [ref=e207] [cursor=pointer]
              - button "重播动效" [ref=e209] [cursor=pointer]
              - status [ref=e211]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e212]:
              - generic "查看本卡代码" [ref=e213] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e214] [cursor=pointer]:
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e215]: 对应官网示例
            - generic [ref=e216]: （新标签页打开）
        - region [ref=e217]:
          - generic [ref=e218]:
            - heading "Composed Chart — Bar + two lines" [level=3] [ref=e219]
            - paragraph [ref=e220]: 每日柱与两条趋势线
          - generic [ref=e221]:
            - paragraph [ref=e223]: 滚动到此处查看示例
            - generic [ref=e224]:
              - button "更新数据" [ref=e225] [cursor=pointer]
              - button "重播动效" [ref=e227] [cursor=pointer]
              - status [ref=e229]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e230]:
              - generic "查看本卡代码" [ref=e231] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e232] [cursor=pointer]:
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e233]: 对应官网示例
            - generic [ref=e234]: （新标签页打开）
    - region [ref=e235]:
      - heading "图形材质" [level=2] [ref=e236]
      - generic [ref=e237]:
        - region [ref=e238]:
          - generic [ref=e239]:
            - heading "Composed Chart — Lime / amber / red" [level=3] [ref=e240]
            - paragraph [ref=e241]: 多类型系列的独立强调色
          - generic [ref=e242]:
            - paragraph [ref=e244]: 滚动到此处查看示例
            - generic [ref=e245]:
              - button "更新数据" [ref=e246] [cursor=pointer]
              - button "重播动效" [ref=e248] [cursor=pointer]
              - status [ref=e250]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e251]:
              - generic "查看本卡代码" [ref=e252] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e253] [cursor=pointer]:
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e254]: 对应官网示例
            - generic [ref=e255]: （新标签页打开）
        - region [ref=e256]:
          - generic [ref=e257]:
            - heading "Composed Chart — Pattern fills" [level=3] [ref=e258]
            - paragraph [ref=e259]: 图案柱、纯色柱与趋势线
          - generic [ref=e260]:
            - generic [ref=e261]:
              - generic [ref=e262]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 9
                  - generic: Sep 17
                  - generic: Sep 24
              - generic [ref=e323]:
                - button "完成人数 · 人" [ref=e325] [cursor=pointer]
                - button "复习人数 · 人" [ref=e328] [cursor=pointer]
                - button "参与人数 · 人" [ref=e331] [cursor=pointer]
              - group [ref=e333]:
                - generic "查看精确数据" [ref=e334] [cursor=pointer]
            - generic [ref=e335]:
              - button "更新数据" [ref=e336] [cursor=pointer]
              - button "重播动效" [ref=e338] [cursor=pointer]
              - status [ref=e340]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e341]:
              - generic "查看本卡代码" [ref=e342] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e343] [cursor=pointer]:
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e344]: 对应官网示例
            - generic [ref=e345]: （新标签页打开）
        - region [ref=e346]:
          - generic [ref=e347]:
            - heading "Composed Chart — Markers & dashed tail" [level=3] [ref=e348]
            - paragraph [ref=e349]: 折线和面积的点标记及虚线尾段
          - generic [ref=e350]:
            - generic [ref=e351]:
              - generic [ref=e352]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 3
                  - generic: Sep 5
                  - generic: Sep 7
              - generic [ref=e424]:
                - button "参与人数 · 人" [ref=e426] [cursor=pointer]
                - button "复习人数 · 人" [ref=e429] [cursor=pointer]
              - paragraph [ref=e431]: 面积和线共同表示复习人数，第5个数据点起使用虚线标出尚未结束的时段。
              - group [ref=e432]:
                - generic "查看精确数据" [ref=e433] [cursor=pointer]
            - generic [ref=e434]:
              - button "更新数据" [ref=e435] [cursor=pointer]
              - button "重播动效" [ref=e437] [cursor=pointer]
              - status [ref=e439]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e440]:
              - generic "查看本卡代码" [ref=e441] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e442] [cursor=pointer]:
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e443]: 对应官网示例
            - generic [ref=e444]: （新标签页打开）
    - region [ref=e445]:
      - heading "坐标与辅助读数" [level=2] [ref=e446]
      - generic [ref=e447]:
        - region [ref=e448]:
          - generic [ref=e449]:
            - heading "Composed Chart — Left Y axis" [level=3] [ref=e450]
            - paragraph [ref=e451]: 柱和线共用左侧数值轴
          - generic [ref=e452]:
            - generic [ref=e453]:
              - generic [ref=e454]:
                - generic:
                  - generic:
                    - generic: 0人
                    - generic: 100人
                    - generic: 200人
                    - generic: 300人
                    - generic: 400人
                - generic:
                  - generic: Sep 1
                  - generic: Sep 9
                  - generic: Sep 17
                  - generic: Sep 24
              - generic [ref=e490]:
                - button "完成人数 · 人" [ref=e492] [cursor=pointer]
                - button "参与人数 · 人" [ref=e495] [cursor=pointer]
              - group [ref=e497]:
                - generic "查看精确数据" [ref=e498] [cursor=pointer]
            - generic [ref=e499]:
              - button "更新数据" [ref=e500] [cursor=pointer]
              - button "重播动效" [ref=e502] [cursor=pointer]
              - status [ref=e504]: 示例数据 · 已更新 0 次 · 已减少动效
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
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e508]: 对应官网示例
            - generic [ref=e509]: （新标签页打开）
        - region [ref=e510]:
          - generic [ref=e511]:
            - heading "Composed Chart — Left and right Y axes" [level=3] [ref=e512]
            - paragraph [ref=e513]: 左轴数量、右轴独立量纲
          - generic [ref=e514]:
            - paragraph [ref=e516]: 滚动到此处查看示例
            - generic [ref=e517]:
              - button "更新数据" [ref=e518] [cursor=pointer]
              - button "重播动效" [ref=e520] [cursor=pointer]
              - status [ref=e522]: 示例数据 · 已更新 0 次 · 已减少动效
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
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e526]: 对应官网示例
            - generic [ref=e527]: （新标签页打开）
        - region [ref=e528]:
          - generic [ref=e529]:
            - heading "Composed Chart - Pattern Background" [level=3] [ref=e530]
            - paragraph [ref=e531]: 图案背景替代网格
          - generic [ref=e532]:
            - paragraph [ref=e534]: 滚动到此处查看示例
            - generic [ref=e535]:
              - button "更新数据" [ref=e536] [cursor=pointer]
              - button "重播动效" [ref=e538] [cursor=pointer]
              - status [ref=e540]: 示例数据 · 已更新 0 次 · 已减少动效
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
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e544]: 对应官网示例
            - generic [ref=e545]: （新标签页打开）
        - region [ref=e546]:
          - generic [ref=e547]:
            - heading "Composed Chart - Dot Grid Background" [level=3] [ref=e548]
            - paragraph [ref=e549]: 带边缘渐隐的点阵背景
          - generic [ref=e550]:
            - paragraph [ref=e552]: 滚动到此处查看示例
            - generic [ref=e553]:
              - button "更新数据" [ref=e554] [cursor=pointer]
              - button "重播动效" [ref=e556] [cursor=pointer]
              - status [ref=e558]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e559]:
              - generic "查看本卡代码" [ref=e560] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e561] [cursor=pointer]:
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e562]: 对应官网示例
            - generic [ref=e563]: （新标签页打开）
        - region [ref=e564]:
          - generic [ref=e565]:
            - heading "Composed Chart - Reference Band" [level=3] [ref=e566]
            - paragraph [ref=e567]: 水平参考区间与边界标识
          - generic [ref=e568]:
            - paragraph [ref=e570]: 滚动到此处查看示例
            - generic [ref=e571]:
              - button "更新数据" [ref=e572] [cursor=pointer]
              - button "重播动效" [ref=e574] [cursor=pointer]
              - status [ref=e576]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e577]:
              - generic "查看本卡代码" [ref=e578] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e579] [cursor=pointer]:
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e580]: 对应官网示例
            - generic [ref=e581]: （新标签页打开）
        - region [ref=e582]:
          - generic [ref=e583]:
            - heading "Composed Chart - Pattern Reference Band" [level=3] [ref=e584]
            - paragraph [ref=e585]: 图案参考区间与相应轴标签
          - generic [ref=e586]:
            - paragraph [ref=e588]: 滚动到此处查看示例
            - generic [ref=e589]:
              - button "更新数据" [ref=e590] [cursor=pointer]
              - button "重播动效" [ref=e592] [cursor=pointer]
              - status [ref=e594]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e595]:
              - generic "查看本卡代码" [ref=e596] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e597] [cursor=pointer]:
            - /url: https://bklit.com/charts/composed-chart
            - generic [ref=e598]: 对应官网示例
            - generic [ref=e599]: （新标签页打开）
  - generic [ref=e600]:
    - heading "数据与使用边界" [level=2] [ref=e601]
    - paragraph [ref=e602]: 完成率=完成人数/参与人数；左轴人，右轴%。
    - paragraph [ref=e603]: 0参与时比率不适用，移除比率曲线而非显示0%。
    - paragraph [ref=e604]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e605] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - group [ref=e607]:
    - generic "接口与调用示例" [ref=e608] [cursor=pointer]
  - navigation "相关图型" [ref=e609]:
    - link "面积图" [ref=e610] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e612] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e614] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e616] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e618] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e620] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e622] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e624] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e626] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e628] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e630] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e632] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e634] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e636] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e638] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e640] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e642] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e644] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e646] [cursor=pointer]:
      - /url: "#chart-network"
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from '@playwright/test';
  2   | import { mkdir, readFile, writeFile } from 'node:fs/promises';
  3   | import { observed, settled, hashSources, run, capture } from '../../evidence/runtime/chart-curve-refinement-2026-10-11/browser-observer.mjs';
  4   | 
  5   | const runName=process.env.RAIN_CURVE_BROWSER_RUN ?? 'after-tests';
  6   | const folder=`${run}/browser-tests/${runName}`;
  7   | const beforeFolder=`${run}/browser-before`;
  8   | const shapes=['line','area','composed'] as const;
  9   | const official=[
  10  |  {family:'area',id:'area-default',keys:['enrolled']},
  11  |  {family:'line',id:'line-dual-y-axis',keys:['enrolled','rate']},
  12  |  {family:'composed',id:'composed-markers-dashed-tail',keys:['returned'],markers:true},
  13  | ] as const;
  14  | 
  15  | function turns(values:(number|null)[]){let previous=0,count=0;for(let i=1;i<values.length;i++){if(values[i]===null||values[i-1]===null){previous=0;continue;}const change=Math.sign(values[i]!-values[i-1]!);if(change&&previous&&change!==previous)count++;if(change)previous=change;}return count;}
  16  | const paint=(value:string)=>value.replace(/url\([^)]+\)/g,'url(<instance-paint>)');
  17  | function presentation(facts:any){return{
  18  |  paths:facts.paths.map((p:any)=>[paint(p.stroke),p.strokeWidth,p.strokeOpacity,p.opacity,p.dasharray]).sort(),
  19  |  fills:facts.fills.map((p:any)=>[paint(p.fill),p.fillOpacity,p.opacity]).sort(),
  20  |  legends:facts.legends,dateLabels:facts.dateLabels,
  21  |  text:facts.textStyle.map((p:any)=>[p.fontFamily,p.fontSize,p.fontWeight,p.color,p.fill]).sort(),
  22  |  svgSizes:facts.svgs.map((p:any)=>[p.width,p.height,p.box.width,p.box.height]),
  23  | };}
  24  | async function timeline(page:Page,revision:number,state='normal'){
  25  |  return page.evaluate(async({revision,state})=>{
  26  |   const modulePath='/src/docs/components/chart-data.ts';const module=await import(/* @vite-ignore */ modulePath);
  27  |   const rows=state==='missing'?module.makeMissingTimeline(revision):module.makeTimeline(revision,state);
  28  |   return rows.map((p:any)=>({date:p.date.getDate(),enrolled:p.enrolled,completed:p.completed,returned:p.returned,rate:p.rate}));
  29  |  },{revision,state});
  30  | }
  31  | async function miniValues(page:Page,revision:number,state='normal'){
  32  |  return page.evaluate(async({revision,state})=>{
  33  |   const modulePath='/src/docs/components/chart-business/mini-data.ts';const module=await import(/* @vite-ignore */ modulePath);
  34  |   return module.makeMiniRows(revision,state)[0]?.trend ?? [];
  35  |  },{revision,state});
  36  | }
  37  | function geometry(facts:any,allowedTurns:number|number[],label:string){
  38  |  expect(facts.finite,label).toBe(true);expect(facts.documentWidth).toBeLessThanOrEqual(facts.viewportWidth+1);
  39  |  for(const [index,path] of facts.paths.entries()){expect(path.xMonotone,`${label}: actual rendered path runs backwards in x`).toBe(true);
  40  |   // Across missing-data M breaks getPointAtLength jumps; that jump is not a peak.
  41  |   const limit=Array.isArray(allowedTurns)?allowedTurns[index]:allowedTurns;
  42  |   expect(limit,`${label}: a visible native path has an explicit series limit`).toBeDefined();
  43  |   if(limit===undefined)throw new Error(`${label}: no series turn limit for native path ${index}`);
  44  |   if(path.subpaths===1)expect(path.extrema,`${label}: rendered extrema exceed source-data turns; ${path.d}`).toBeLessThanOrEqual(limit);
  45  |  }
  46  | }
  47  | async function idle(host:Locator,reduced:boolean):Promise<any>{return settled(host,{minimumMs:reduced?0:1500});}
  48  | async function realTooltip(page:Page,host:Locator,rows:any[],label:string,keys:string[],official=false){
  49  |  const plot=host.locator('.rain-chart-plot,.rain-chart-mini-plot').first();await plot.scrollIntoViewIfNeeded();const box=(await plot.boundingBox())!;
  50  |  const tooltip=host.locator('.rain-chart-tooltip');
  51  |  await expect(async()=>{await page.mouse.move(0,0);await page.mouse.move(box.x+Math.min(80,box.width/3),box.y+box.height/2);await expect(tooltip).toBeVisible({timeout:100});}).toPass({timeout:5000,intervals:[50]});
  52  |  const text=(await tooltip.textContent())??'';const date=text.match(/9月(\d+)日/);expect(date,`${label}: actual tooltip date`).toBeTruthy();
  53  |  const source=rows.find(row=>row.date===Number(date![1]));expect(source,`${label}: tooltip date belongs to actual data`).toBeDefined();
  54  |  const valueTexts=await tooltip.locator('span.tabular-nums').allTextContents();
  55  |  const expected=keys.map(key=>key==='rate'?`${Number(source[key]).toFixed(1)}${official?' ':''}%`:`${source[key]} 人`);
  56  |  expect(valueTexts,`${label}: each tooltip series matches the original count or displayed full-precision rate`).toEqual(expected);
  57  |  await page.mouse.move(0,0);return{text,date:Number(date![1]),valueTexts};
  58  | }
  59  | async function compareBaseline(id:string,facts:any){const before=JSON.parse(await readFile(`${beforeFolder}/${id}.json`,'utf8'));expect(presentation(facts),`${id}: colors, widths, fill, typography, legends, dates and viewport`).toEqual(presentation(before));}
  60  | async function save(name:string,value:any){await mkdir(folder,{recursive:true});await writeFile(`${folder}/${name}.json`,JSON.stringify(value,null,2));}
  61  | async function markersAndTail(host:Locator){
  62  |  const facts=await host.evaluate(node=>{
  63  |   const circles=[...node.querySelectorAll('svg circle')];const xs=[...new Set(circles.map(circle=>Number(circle.getAttribute('cx'))))].sort((a,b)=>a-b);
  64  |   const tails=[...node.querySelectorAll('svg path[stroke-dasharray]')].filter(path=>path.getAttribute('stroke-dasharray')==='6,4').map(path=>{const id=(path.getAttribute('clip-path')??'').match(/#([^)]*)/)?.[1];const clip=id?document.getElementById(id)?.querySelector('rect'):null;return{strokeWidth:Number(path.getAttribute('stroke-width')),clipStart:Number(clip?.getAttribute('x'))};});return{circles:circles.length,xs,tails};
  65  |  });
> 66  |  expect(facts.circles).toBe(28);expect(facts.xs).toHaveLength(7);expect(facts.tails).toHaveLength(2);for(const tail of facts.tails)expect(tail.clipStart).toBeCloseTo(facts.xs[4]!-tail.strokeWidth,4);return facts;
      |                                                  ^ Error: expect(received).toHaveLength(expected)
  67  | }
  68  | 
  69  | for(const width of[1440,390])for(const mode of['no-preference','reduce'] as const){
  70  |  const reduced=mode==='reduce';
  71  |  test.describe(`${width}px ${mode}`,()=>{
  72  |   test.beforeEach(async({page})=>{await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:mode});await page.clock.setFixedTime(new Date('2026-10-11T00:00:00+08:00'));});
  73  |   test('default line, area and composed retain reads, geometry and state behavior',async({page})=>{
  74  |    test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
  75  |    try{for(const family of shapes){
  76  |     await page.goto(`/?curve-refinement=${runName}#chart-${family}`);await page.getByRole('combobox',{name:'视觉配方',exact:true}).selectOption('category-near');
  77  |     const host=page.locator(`[data-rain-id="chart-${family}"]`),controls=page.locator('[data-chart-default-controls]');
  78  |     const keys=family==='composed'?['enrolled','rate']:['enrolled','completed','returned'];
  79  |     let rows=await timeline(page,0);const normal=await idle(host,reduced);geometry(normal,keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${family}-normal`);await compareBaseline(`default-${family}-${width}-reduce-category-near`,normal);
  80  |     const tooltipKeys=family==='composed'?['enrolled','completed','rate']:keys;
  81  |     const initialTooltip=await realTooltip(page,host,rows,`${family}-normal`,tooltipKeys);facts.push({family,state:'normal',revision:0,observed:normal,tooltip:initialTooltip});
  82  |     await controls.getByRole('button',{name:'更新数据',exact:true}).click();rows=await timeline(page,1);const updated=await idle(host,reduced);geometry(updated,keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${family}-updated`);expect(presentation(updated)).toEqual(presentation(normal));expect(updated.table).not.toEqual(normal.table);
  83  |     expect(updated.paths.map((p:any)=>p.d)).not.toEqual(normal.paths.map((p:any)=>p.d));
  84  |     facts.push({family,state:'normal',revision:1,observed:updated,tooltip:await realTooltip(page,host,rows,`${family}-updated`,tooltipKeys)});
  85  |     await controls.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await idle(host,reduced);expect(replay.paths.map((p:any)=>p.d)).toEqual(updated.paths.map((p:any)=>p.d));expect(presentation(replay)).toEqual(presentation(updated));facts.push({family,state:'replay',revision:1,observed:replay});
  86  |     for(const state of['missing','zero','single']){
  87  |      await controls.getByRole('combobox',{name:'示例状态',exact:true}).selectOption(state);const current=await idle(host,reduced);expect(current.finite).toBe(true);expect(current.documentWidth).toBeLessThanOrEqual(width+1);
  88  |      const stateRows=await timeline(page,1,state);expect(current.table).toHaveLength(stateRows.length);
  89  |      if(state==='missing')expect((await host.textContent())??'').toMatch(/缺测|不适用/);
  90  |      if(state==='zero'){geometry(current,0,`${family}-zero`);if(family==='composed')await expect(host).toContainText('完成率不适用');}
  91  |      if(state==='single')expect(current.table).toHaveLength(1);
  92  |      facts.push({family,state,revision:1,observed:current});
  93  |     }
  94  |    }}finally{const sourcesAfter=await hashSources();await save(`default-${width}-${mode}`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
  95  |    expect(errors).toEqual([]);
  96  |   });
  97  | 
  98  |   test('representative official area, dual-axis line and markers keep their actual native path and interactions',async({page})=>{
  99  |    test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
  100 |    try{for(const item of official){
  101 |     await page.goto(`/?curve-refinement=${runName}#chart-${item.family}`);await page.getByRole('combobox',{name:'视觉配方',exact:true}).selectOption('monochrome-blue');
  102 |     const host=page.locator(`[data-chart-variant="${item.id}"]`);await host.scrollIntoViewIfNeeded();await expect(host.locator('[data-ready="true"]')).toBeVisible();
  103 |     let rows=await timeline(page,0);if('markers'in item&&item.markers)rows=rows.slice(0,7);const normal=await idle(host,reduced);geometry(normal,'markers'in item&&item.markers?turns(rows.map((row:any)=>row.returned)):item.keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${item.id}-normal`);await compareBaseline(`official-${item.id}-${width}-reduce-monochrome-blue`,normal);
  104 |     if('markers'in item&&item.markers)await markersAndTail(host);
  105 |     if(item.id.includes('dual'))await expect(host).toContainText('%');
  106 |     const tooltipKeys='markers'in item&&item.markers?['enrolled','returned']:item.keys;
  107 |     facts.push({id:item.id,revision:0,observed:normal,tooltip:await realTooltip(page,host,rows,item.id,[...tooltipKeys],true)});
  108 |     await host.getByRole('button',{name:'更新数据',exact:true}).click();rows=await timeline(page,1);if('markers'in item&&item.markers)rows=rows.slice(0,7);const updated=await idle(host,reduced);geometry(updated,'markers'in item&&item.markers?turns(rows.map((row:any)=>row.returned)):item.keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${item.id}-updated`);expect(presentation(updated)).toEqual(presentation(normal));expect(updated.paths.map((p:any)=>p.d)).not.toEqual(normal.paths.map((p:any)=>p.d));facts.push({id:item.id,revision:1,observed:updated,tooltip:await realTooltip(page,host,rows,`${item.id}-updated`,[...tooltipKeys],true)});
  109 |     await host.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await idle(host,reduced);expect(replay.paths.map((p:any)=>p.d)).toEqual(updated.paths.map((p:any)=>p.d));expect(presentation(replay)).toEqual(presentation(updated));if('markers'in item&&item.markers)await markersAndTail(host);facts.push({id:item.id,state:'replay',observed:replay});
  110 |    }}finally{const sourcesAfter=await hashSources();await save(`official-${width}-${mode}`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
  111 |    expect(errors).toEqual([]);
  112 |   });
  113 | 
  114 |   test('mini line and area retain both native sizes, shared readings, states and replay',async({page})=>{
  115 |    test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
  116 |    try{
  117 |     await page.goto(`/?curve-refinement=${runName}#chart-business`);const gallery=page.locator('.rain-business-mini-gallery'),controls=page.locator('.rain-business-controls');
  118 |     const take=async(state:string,revision:number)=>{const samples:any[]=[];const values=await miniValues(page,revision,state);for(const kind of['line','area'])for(const size of['compact','comfortable']){
  119 |      const slot=gallery.locator(`[data-mini-kind="${kind}"][data-size="${size}"]`),figure=slot.locator('xpath=ancestor::figure');await slot.scrollIntoViewIfNeeded();await expect(slot).toBeVisible();
  120 |      let current:any;if(state==='missing'){await expect(slot).toHaveAttribute('data-mini-state','missing');current=await observed(figure);expect(current.paths).toHaveLength(0);}else{current=await idle(figure,reduced);geometry(current,turns(values),`mini-${kind}-${size}-${state}`);}
  121 |      const box=await slot.locator('.rain-business-mini-slot').boundingBox();expect(box!.width).toBe(size==='compact'?96:128);expect(box!.height).toBe(size==='compact'?32:48);
  122 |      const caption=await figure.evaluate(node=>document.getElementById(node.getAttribute('aria-describedby')!)?.textContent??'');expect(caption).toBeTruthy();
  123 |      // MiniTrend is deliberately decorative and has no tooltip part in its contract.
  124 |      expect(await slot.locator('.rain-chart-tooltip').count()).toBe(0);if(state==='normal'&&revision===0)await compareBaseline(`mini-${kind}-${size}-${width}-reduce-monochrome-blue`,current);
  125 |      samples.push({kind,size,caption,observed:current});
  126 |     }expect(samples[0].caption).toBe(samples[1].caption);expect(samples[2].caption).toBe(samples[3].caption);facts.push({state,revision,samples});return samples;};
  127 |     const normal=await take('normal',0);await controls.getByRole('button',{name:'更新数据',exact:true}).click();const updated=await take('normal',1);
  128 |     updated.forEach((sample,index)=>{expect(presentation(sample.observed)).toEqual(presentation(normal[index].observed));expect(sample.observed.paths.map((p:any)=>p.d)).not.toEqual(normal[index].observed.paths.map((p:any)=>p.d));});
  129 |     await controls.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await take('normal',1);replay.forEach((sample,index)=>expect(sample.observed.paths.map((p:any)=>p.d)).toEqual(updated[index].observed.paths.map((p:any)=>p.d)));
  130 |     for(const state of['zero','missing','single']){await controls.getByRole('combobox',{name:'业务数据状态',exact:true}).selectOption(state);await take(state,1);}
  131 |    }finally{const sourcesAfter=await hashSources();await save(`mini-${width}-${mode}`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
  132 |    expect(errors).toEqual([]);
  133 |   });
  134 |  });
  135 | }
  136 | 
  137 | for(const width of[1440,390])test(`${width}px reduce: category area curves retain all original points, exact tables and missing boundaries`,async({page})=>{
  138 |  test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
  139 |  await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});await page.clock.setFixedTime(new Date('2026-10-11T00:00:00+08:00'));
  140 |  const raw=async(id:string,revision:number,state:string)=>page.evaluate(async({id,revision,state})=>{const modulePath='/src/docs/components/chart-business/comparison-data.ts';const module=await import(/* @vite-ignore */modulePath);return module.makeCategoryFixtures(revision,state).find((fixture:any)=>fixture.id===id);},{id,revision,state});
  141 |  try{for(const id of['semester','period','version']){
  142 |   await page.goto(`/?curve-refinement=${runName}#chart-category`);const controls=page.locator('.rain-category-controls');await controls.getByRole('combobox',{name:'分类业务场景',exact:true}).selectOption(id);
  143 |   const host=page.locator(`[data-category-example="${id}"]`);await host.locator('summary').click();
  144 |   const take=async(revision:number,state:string)=>{
  145 |    const fixture=await raw(id,revision,state),current=await idle(host,true);expect(current.finite).toBe(true);expect(current.documentWidth).toBeLessThanOrEqual(width+1);expect(current.paths).toHaveLength(fixture.series.length);
  146 |    const expectedRows=fixture.rows.map((row:any)=>[row.label,...(id==='period'?[row.currentDate??'无观测日期',row.previousDate??'无观测日期']:[]),...fixture.series.map((series:any)=>row[series.key]===null?'缺测':String(row[series.key]))]);
  147 |    expect(await host.locator('tbody tr').evaluateAll(rows=>rows.map(row=>[...row.querySelectorAll('th,td')].map(cell=>cell.textContent?.trim())))).toEqual(expectedRows);
  148 |    for(const [index,path]of current.paths.entries()){
  149 |     const sourceCount=fixture.rows.filter((row:any)=>row[fixture.series[index].key]!==null).length;expect((path.d.match(/[MCL]/gi)??[]).length,`${id} ${state}: actual native stroke retains every non-null original point`).toBe(sourceCount);expect(path.xMonotone).toBe(true);
  150 |     if(state==='zero')expect(path.extrema).toBe(0);if(state==='missing'&&id!=='period')expect(path.subpaths).toBe(2);
  151 |    }
  152 |    facts.push({id,revision,state,sourceRows:fixture.rows,sourceSeries:fixture.series,observed:current});return{fixture,current};
  153 |   };
  154 |   const normal=await take(0,'normal');await capture(page,host,`category-${id}-${width}-reduce-normal`,`${folder}/category`);
  155 |   const viewport=host.locator('.rain-category-scroll');await viewport.scrollIntoViewIfNeeded();const box=(await viewport.boundingBox())!;const tooltip=host.locator('.rain-category-tooltip');
  156 |   await expect(async()=>{await page.mouse.move(0,0);await page.mouse.move(box.x+Math.min(150,box.width/2),box.y+100);await expect(tooltip).toBeVisible({timeout:100});}).toPass({timeout:5000,intervals:[50]});
  157 |   const tooltipText=(await tooltip.textContent())??'',point=normal.fixture.rows.find((row:any)=>tooltipText.includes(row.label));expect(point).toBeTruthy();expect(await tooltip.locator('span.tabular-nums').allTextContents()).toEqual(normal.fixture.series.map((series:any)=>point[series.key]===null?'缺测':`${point[series.key]}${series.unit}`));
  158 |   if(id==='period'){expect(tooltipText).toContain(point.currentDate??'无观测日期');expect(tooltipText).toContain(point.previousDate??'无观测日期');}
  159 |   await host.screenshot({path:`${folder}/category/category-${id}-${width}-tooltip.png`,animations:'disabled'});facts.push({id,state:'tooltip',tooltipText});await page.mouse.move(0,0);
  160 |   await controls.getByRole('button',{name:'更新数据',exact:true}).click();const updated=await take(1,'normal');expect(updated.current.paths.map((p:any)=>p.d)).not.toEqual(normal.current.paths.map((p:any)=>p.d));expect(presentation(updated.current)).toEqual(presentation(normal.current));
  161 |   await controls.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await take(1,'normal');expect(replay.current.paths.map((p:any)=>p.d)).toEqual(updated.current.paths.map((p:any)=>p.d));
  162 |   for(const state of['zero','missing']){await controls.getByRole('combobox',{name:'分类数据状态',exact:true}).selectOption(state);await take(1,state);}
  163 |   if(width===390){const scroll=await viewport.evaluate(node=>({width:node.clientWidth,total:node.scrollWidth,overflow:getComputedStyle(node).overflowX}));expect(scroll.total).toBeGreaterThan(scroll.width);expect(scroll.overflow).toBe('auto');}
  164 |  }}finally{const sourcesAfter=await hashSources();await save(`category-${width}-reduce`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
  165 |  expect(errors).toEqual([]);
  166 | });
```