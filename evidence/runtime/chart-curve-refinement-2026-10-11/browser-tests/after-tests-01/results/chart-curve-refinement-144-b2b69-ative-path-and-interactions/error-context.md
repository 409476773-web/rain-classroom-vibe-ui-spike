# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-curve-refinement.spec.ts >> 1440px no-preference >> representative official area, dual-axis line and markers keep their actual native path and interactions
- Location: tests/e2e/chart-curve-refinement.spec.ts:98:3

# Error details

```
Error: official-line-dual-y-axis-1440-reduce-monochrome-blue: colors, widths, fill, typography, legends, dates and viewport

expect(received).toEqual(expected) // deep equality

- Expected  - 12
+ Received  +  1

@@ -3,22 +3,11 @@
      "Sep 1",
      "Sep 9",
      "Sep 17",
      "Sep 24",
    ],
-   "fills": Array [
-     Array [
-       "rgba(0, 0, 0, 0)",
-       "1",
-       "1",
-     ],
-     Array [
-       "rgba(0, 0, 0, 0)",
-       "1",
-       "1",
-     ],
-   ],
+   "fills": Array [],
    "legends": Array [
      "参与人数 · 人",
      "完成率 · %",
    ],
    "paths": Array [
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "折线图" [active] [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 连续趋势与多系列比较，保留真实端点。
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
            - generic: Sep 1
            - generic: Sep 9
            - generic: Sep 17
            - generic: Sep 24
        - generic [ref=e32]:
          - button "参与人数 · 人" [ref=e34] [cursor=pointer]
          - button "完成人数 · 人" [ref=e38] [cursor=pointer]
          - button "复习人数 · 人" [ref=e42] [cursor=pointer]
        - group [ref=e45]:
          - generic "查看精确数据" [ref=e46] [cursor=pointer]
      - generic [ref=e47]:
        - generic [ref=e48]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e49]:
            - option "清晰线与轻面积"
            - option "蓝紫近邻"
            - option "多色类别"
            - option "协调实色"
            - option "蓝灰单色" [selected]
        - generic [ref=e50]:
          - text: 示例状态
          - combobox "示例状态" [ref=e51]:
            - option "正常" [selected]
            - option "无数据"
            - option "零值"
            - option "单项／单点"
            - option "长标签"
            - option "缺测"
            - option "无效数据"
        - generic [ref=e52]:
          - text: 系列数
          - combobox "系列数" [ref=e53]:
            - option "3" [selected]
            - option "5"
        - generic [ref=e54]:
          - text: 尺寸配方
          - combobox "尺寸配方" [ref=e55]:
            - option "标准" [selected]
            - option "迷你 / 嵌入"
        - button "更新数据" [ref=e56] [cursor=pointer]
        - button "重播动效" [ref=e58] [cursor=pointer]
      - status [ref=e60]: 示例数据 · 已更新 0 次
  - group [ref=e61]:
    - generic "调用配置、完整源码与示例数据" [ref=e62] [cursor=pointer]
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
  - region "全部图表变体" [ref=e63]:
    - navigation "变体分组" [ref=e64]:
      - button "基础结构" [ref=e65] [cursor=pointer]
      - button "图形材质" [ref=e67] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e69] [cursor=pointer]
      - button "交互与状态" [ref=e71] [cursor=pointer]
    - region [ref=e73]:
      - heading "基础结构" [level=2] [ref=e74]
      - generic [ref=e75]:
        - region [ref=e76]:
          - generic [ref=e77]:
            - heading "Line Chart - Linear" [level=3] [ref=e78]
            - paragraph [ref=e79]: 数据点之间直线连接
          - generic [ref=e80]:
            - group [ref=e93]:
              - generic "查看精确数据" [ref=e94] [cursor=pointer]
            - generic [ref=e95]:
              - button "更新数据" [ref=e96] [cursor=pointer]
              - button "重播动效" [ref=e98] [cursor=pointer]
              - status [ref=e100]: 示例数据 · 已更新 0 次
            - group [ref=e101]:
              - generic "查看本卡代码" [ref=e102] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e103] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e104]: 对应官网示例
            - generic [ref=e105]: （新标签页打开）
        - region [ref=e106]:
          - generic [ref=e107]:
            - heading "Line Chart - Multiple Lines" [level=3] [ref=e108]
            - paragraph [ref=e109]: 多系列时间趋势对比
          - generic [ref=e110]:
            - generic [ref=e111]:
              - generic [ref=e125]:
                - button "参与人数 · 人" [ref=e127] [cursor=pointer]
                - button "完成人数 · 人" [ref=e130] [cursor=pointer]
              - group [ref=e132]:
                - generic "查看精确数据" [ref=e133] [cursor=pointer]
            - generic [ref=e134]:
              - button "更新数据" [ref=e135] [cursor=pointer]
              - button "重播动效" [ref=e137] [cursor=pointer]
              - status [ref=e139]: 示例数据 · 已更新 0 次
            - group [ref=e140]:
              - generic "查看本卡代码" [ref=e141] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e142] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e143]: 对应官网示例
            - generic [ref=e144]: （新标签页打开）
    - region [ref=e145]:
      - heading "图形材质" [level=2] [ref=e146]
      - generic [ref=e147]:
        - region [ref=e148]:
          - generic [ref=e149]:
            - heading "Line Chart - Series Markers" [level=3] [ref=e150]
            - paragraph [ref=e151]: 各观测点圆环标记
          - generic [ref=e152]:
            - paragraph [ref=e154]: 滚动到此处查看示例
            - generic [ref=e155]:
              - button "更新数据" [ref=e156] [cursor=pointer]
              - button "重播动效" [ref=e158] [cursor=pointer]
              - status [ref=e160]: 示例数据 · 已更新 0 次
            - group [ref=e161]:
              - generic "查看本卡代码" [ref=e162] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e163] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e164]: 对应官网示例
            - generic [ref=e165]: （新标签页打开）
        - region [ref=e166]:
          - generic [ref=e167]:
            - heading "Line Chart - Dashed Tail" [level=3] [ref=e168]
            - paragraph [ref=e169]: 从指定索引开始绘制虚线尾段
          - generic [ref=e170]:
            - paragraph [ref=e172]: 滚动到此处查看示例
            - generic [ref=e173]:
              - button "更新数据" [ref=e174] [cursor=pointer]
              - button "重播动效" [ref=e176] [cursor=pointer]
              - status [ref=e178]: 示例数据 · 已更新 0 次
            - group [ref=e179]:
              - generic "查看本卡代码" [ref=e180] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e181] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e182]: 对应官网示例
            - generic [ref=e183]: （新标签页打开）
    - region [ref=e184]:
      - heading "坐标与辅助读数" [level=2] [ref=e185]
      - generic [ref=e186]:
        - region [ref=e187]:
          - generic [ref=e188]:
            - heading "Line Chart - Markers" [level=3] [ref=e189]
            - paragraph [ref=e190]: 标注关键事件
          - generic [ref=e191]:
            - paragraph [ref=e193]: 滚动到此处查看示例
            - generic [ref=e194]:
              - button "更新数据" [ref=e195] [cursor=pointer]
              - button "重播动效" [ref=e197] [cursor=pointer]
              - status [ref=e199]: 示例数据 · 已更新 0 次
            - group [ref=e200]:
              - generic "查看本卡代码" [ref=e201] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e202] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e203]: 对应官网示例
            - generic [ref=e204]: （新标签页打开）
        - region [ref=e205]:
          - generic [ref=e206]:
            - heading "Line Chart - X Axis" [level=3] [ref=e207]
            - paragraph [ref=e208]: 显示日期横轴
          - generic [ref=e209]:
            - paragraph [ref=e211]: 滚动到此处查看示例
            - generic [ref=e212]:
              - button "更新数据" [ref=e213] [cursor=pointer]
              - button "重播动效" [ref=e215] [cursor=pointer]
              - status [ref=e217]: 示例数据 · 已更新 0 次
            - group [ref=e218]:
              - generic "查看本卡代码" [ref=e219] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e220] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e221]: 对应官网示例
            - generic [ref=e222]: （新标签页打开）
        - region [ref=e223]:
          - generic [ref=e224]:
            - heading "Line Chart - X & Y Axis" [level=3] [ref=e225]
            - paragraph [ref=e226]: 横轴日期与水平参考网格
          - generic [ref=e227]:
            - paragraph [ref=e229]: 滚动到此处查看示例
            - generic [ref=e230]:
              - button "更新数据" [ref=e231] [cursor=pointer]
              - button "重播动效" [ref=e233] [cursor=pointer]
              - status [ref=e235]: 示例数据 · 已更新 0 次
            - group [ref=e236]:
              - generic "查看本卡代码" [ref=e237] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e238] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e239]: 对应官网示例
            - generic [ref=e240]: （新标签页打开）
        - region [ref=e241]:
          - generic [ref=e242]:
            - heading "Line Chart - Left Y axis" [level=3] [ref=e243]
            - paragraph [ref=e244]: 多个系列共用左纵轴
          - generic [ref=e245]:
            - generic [ref=e246]:
              - generic [ref=e247]:
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
              - generic [ref=e261]:
                - button "参与人数 · 人" [ref=e263] [cursor=pointer]
                - button "完成人数 · 人" [ref=e266] [cursor=pointer]
              - group [ref=e268]:
                - generic "查看精确数据" [ref=e269] [cursor=pointer]
            - generic [ref=e270]:
              - button "更新数据" [ref=e271] [cursor=pointer]
              - button "重播动效" [ref=e273] [cursor=pointer]
              - status [ref=e275]: 示例数据 · 已更新 0 次
            - group [ref=e276]:
              - generic "查看本卡代码" [ref=e277] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e278] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e279]: 对应官网示例
            - generic [ref=e280]: （新标签页打开）
        - region [ref=e281]:
          - generic [ref=e282]:
            - heading "Line Chart - Left and right Y axes" [level=3] [ref=e283]
            - paragraph [ref=e284]: 左右独立纵轴与量纲
          - generic [ref=e285]:
            - generic [ref=e286]:
              - generic [ref=e287]:
                - generic:
                  - generic:
                    - generic: 0人
                    - generic: 100人
                    - generic: 200人
                    - generic: 300人
                    - generic: 400人
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
              - generic [ref=e301]:
                - button "参与人数 · 人" [ref=e303] [cursor=pointer]
                - button "完成率 · %" [ref=e306] [cursor=pointer]
              - paragraph [ref=e308]: 左轴：参与人数 · 人；右轴：完成率 · %。两轴独立读取。
              - group [ref=e309]:
                - generic "查看精确数据" [ref=e310] [cursor=pointer]
            - generic [ref=e311]:
              - button "更新数据" [ref=e312] [cursor=pointer]
              - button "重播动效" [ref=e314] [cursor=pointer]
              - status [ref=e316]: 示例数据 · 已更新 0 次
            - group [ref=e317]:
              - generic "查看本卡代码" [ref=e318] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e319] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e320]: 对应官网示例
            - generic [ref=e321]: （新标签页打开）
        - region [ref=e322]:
          - generic [ref=e323]:
            - heading "Line Chart - Pattern Background" [level=3] [ref=e324]
            - paragraph [ref=e325]: 图案背景替代网格
          - generic [ref=e326]:
            - generic [ref=e327]:
              - generic [ref=e328]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 9
                  - generic: Sep 17
                  - generic: Sep 24
              - group [ref=e339]:
                - generic "查看精确数据" [ref=e340] [cursor=pointer]
            - generic [ref=e341]:
              - button "更新数据" [ref=e342] [cursor=pointer]
              - button "重播动效" [ref=e344] [cursor=pointer]
              - status [ref=e346]: 示例数据 · 已更新 0 次
            - group [ref=e347]:
              - generic "查看本卡代码" [ref=e348] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e349] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e350]: 对应官网示例
            - generic [ref=e351]: （新标签页打开）
        - region [ref=e352]:
          - generic [ref=e353]:
            - heading "Line Chart - Dot Grid Background" [level=3] [ref=e354]
            - paragraph [ref=e355]: 带边缘渐隐的点阵背景
          - generic [ref=e356]:
            - generic [ref=e357]:
              - generic [ref=e358]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 9
                  - generic: Sep 17
                  - generic: Sep 24
              - group [ref=e369]:
                - generic "查看精确数据" [ref=e370] [cursor=pointer]
            - generic [ref=e371]:
              - button "更新数据" [ref=e372] [cursor=pointer]
              - button "重播动效" [ref=e374] [cursor=pointer]
              - status [ref=e376]: 示例数据 · 已更新 0 次
            - group [ref=e377]:
              - generic "查看本卡代码" [ref=e378] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e379] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e380]: 对应官网示例
            - generic [ref=e381]: （新标签页打开）
        - region [ref=e382]:
          - generic [ref=e383]:
            - heading "Line Chart - Reference Band" [level=3] [ref=e384]
            - paragraph [ref=e385]: 水平参考区间与边界标识
          - generic [ref=e386]:
            - paragraph [ref=e388]: 滚动到此处查看示例
            - generic [ref=e389]:
              - button "更新数据" [ref=e390] [cursor=pointer]
              - button "重播动效" [ref=e392] [cursor=pointer]
              - status [ref=e394]: 示例数据 · 已更新 0 次
            - group [ref=e395]:
              - generic "查看本卡代码" [ref=e396] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e397] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e398]: 对应官网示例
            - generic [ref=e399]: （新标签页打开）
        - region [ref=e400]:
          - generic [ref=e401]:
            - heading "Line Chart - Pattern Reference Band" [level=3] [ref=e402]
            - paragraph [ref=e403]: 图案参考区间与相应轴标签
          - generic [ref=e404]:
            - paragraph [ref=e406]: 滚动到此处查看示例
            - generic [ref=e407]:
              - button "更新数据" [ref=e408] [cursor=pointer]
              - button "重播动效" [ref=e410] [cursor=pointer]
              - status [ref=e412]: 示例数据 · 已更新 0 次
            - group [ref=e413]:
              - generic "查看本卡代码" [ref=e414] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e415] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e416]: 对应官网示例
            - generic [ref=e417]: （新标签页打开）
    - region [ref=e418]:
      - heading "交互与状态" [level=2] [ref=e419]
      - generic [ref=e420]:
        - region [ref=e421]:
          - generic [ref=e422]:
            - heading "Line Chart - Trio with Brush" [level=3] [ref=e423]
            - paragraph [ref=e424]: 三条曲线、顶部图例、点阵与范围缩放
          - generic [ref=e425]:
            - paragraph [ref=e427]: 滚动到此处查看示例
            - generic [ref=e428]:
              - button "更新数据" [ref=e429] [cursor=pointer]
              - button "重播动效" [ref=e431] [cursor=pointer]
              - status [ref=e433]: 示例数据 · 已更新 0 次
            - group [ref=e434]:
              - generic "查看本卡代码" [ref=e435] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e436] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e437]: 对应官网示例
            - generic [ref=e438]: （新标签页打开）
        - region [ref=e439]:
          - generic [ref=e440]:
            - heading "Line Chart - Projection" [level=3] [ref=e441]
            - paragraph [ref=e442]: 目标与自动预测曲线、终端标记
          - generic [ref=e443]:
            - paragraph [ref=e445]: 滚动到此处查看示例
            - generic [ref=e446]:
              - button "更新数据" [ref=e447] [cursor=pointer]
              - button "重播动效" [ref=e449] [cursor=pointer]
              - status [ref=e451]: 示例数据 · 已更新 0 次
            - group [ref=e452]:
              - generic "查看本卡代码" [ref=e453] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e454] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e455]: 对应官网示例
            - generic [ref=e456]: （新标签页打开）
        - region [ref=e457]:
          - generic [ref=e458]:
            - heading "Line Chart - Segment Selection" [level=3] [ref=e459]
            - paragraph [ref=e460]: 按下并拖动时高亮一段范围
          - generic [ref=e461]:
            - paragraph [ref=e463]: 滚动到此处查看示例
            - generic [ref=e464]:
              - button "更新数据" [ref=e465] [cursor=pointer]
              - button "重播动效" [ref=e467] [cursor=pointer]
              - status [ref=e469]: 示例数据 · 已更新 0 次
            - group [ref=e470]:
              - generic "查看本卡代码" [ref=e471] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e472] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e473]: 对应官网示例
            - generic [ref=e474]: （新标签页打开）
        - region [ref=e475]:
          - generic [ref=e476]:
            - heading "Line Chart - Loading" [level=3] [ref=e477]
            - paragraph [ref=e478]: 网格与前景脉冲加载
          - generic [ref=e479]:
            - paragraph [ref=e481]: 滚动到此处查看示例
            - generic [ref=e482]:
              - button "更新数据" [ref=e483] [cursor=pointer]
              - button "重播动效" [ref=e485] [cursor=pointer]
              - status [ref=e487]: 示例数据 · 已更新 0 次
            - group [ref=e488]:
              - generic "查看本卡代码" [ref=e489] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e490] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e491]: 对应官网示例
            - generic [ref=e492]: （新标签页打开）
        - region [ref=e493]:
          - generic [ref=e494]:
            - heading "Line Chart - Loading (Sweep)" [level=3] [ref=e495]
            - paragraph [ref=e496]: 斜向扫光折线骨架
          - generic [ref=e497]:
            - paragraph [ref=e499]: 滚动到此处查看示例
            - generic [ref=e500]:
              - button "更新数据" [ref=e501] [cursor=pointer]
              - button "重播动效" [ref=e503] [cursor=pointer]
              - status [ref=e505]: 示例数据 · 已更新 0 次
            - group [ref=e506]:
              - generic "查看本卡代码" [ref=e507] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e508] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e509]: 对应官网示例
            - generic [ref=e510]: （新标签页打开）
  - generic [ref=e511]:
    - heading "数据与使用边界" [level=2] [ref=e512]
    - paragraph [ref=e513]: Date日期与有限数值；本例按日记录人数。
    - paragraph [ref=e514]: 本例不宣称缺口插值、点击固定或图例隐藏。
    - paragraph [ref=e515]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e516] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - group [ref=e518]:
    - generic "接口与调用示例" [ref=e519] [cursor=pointer]
  - navigation "相关图型" [ref=e520]:
    - link "面积图" [ref=e521] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e523] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e525] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e527] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e529] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e531] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e533] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e535] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e537] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e539] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e541] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e543] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e545] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e547] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e549] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e551] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e553] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e555] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e557] [cursor=pointer]:
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
> 59  | async function compareBaseline(id:string,facts:any){const before=JSON.parse(await readFile(`${beforeFolder}/${id}.json`,'utf8'));expect(presentation(facts),`${id}: colors, widths, fill, typography, legends, dates and viewport`).toEqual(presentation(before));}
      |                                                                                                                                                                                                                                     ^ Error: official-line-dual-y-axis-1440-reduce-monochrome-blue: colors, widths, fill, typography, legends, dates and viewport
  60  | async function save(name:string,value:any){await mkdir(folder,{recursive:true});await writeFile(`${folder}/${name}.json`,JSON.stringify(value,null,2));}
  61  | async function markersAndTail(host:Locator){
  62  |  const facts=await host.evaluate(node=>{
  63  |   const circles=[...node.querySelectorAll('svg circle')];const xs=[...new Set(circles.map(circle=>Number(circle.getAttribute('cx'))))].sort((a,b)=>a-b);
  64  |   const tails=[...node.querySelectorAll('svg path[stroke-dasharray]')].filter(path=>path.getAttribute('stroke-dasharray')==='6,4').map(path=>{const id=(path.getAttribute('clip-path')??'').match(/#([^)]*)/)?.[1];const clip=id?document.getElementById(id)?.querySelector('rect'):null;return{strokeWidth:Number(path.getAttribute('stroke-width')),clipStart:Number(clip?.getAttribute('x'))};});return{circles:circles.length,xs,tails};
  65  |  });
  66  |  expect(facts.circles).toBe(28);expect(facts.xs).toHaveLength(7);expect(facts.tails).toHaveLength(2);for(const tail of facts.tails)expect(tail.clipStart).toBeCloseTo(facts.xs[4]!-tail.strokeWidth,4);return facts;
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
```