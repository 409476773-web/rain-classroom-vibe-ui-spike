# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-curve-refinement.spec.ts >> 390px no-preference >> representative official area, dual-axis line and markers keep their actual native path and interactions
- Location: tests/e2e/chart-curve-refinement.spec.ts:98:3

# Error details

```
Error: official-line-dual-y-axis-390-reduce-monochrome-blue: colors, widths, fill, typography, legends, dates and viewport

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
            - paragraph [ref=e112]: 滚动到此处查看示例
            - generic [ref=e113]:
              - button "更新数据" [ref=e114] [cursor=pointer]
              - button "重播动效" [ref=e116] [cursor=pointer]
              - status [ref=e118]: 示例数据 · 已更新 0 次
            - group [ref=e119]:
              - generic "查看本卡代码" [ref=e120] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e121] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e122]: 对应官网示例
            - generic [ref=e123]: （新标签页打开）
    - region [ref=e124]:
      - heading "图形材质" [level=2] [ref=e125]
      - generic [ref=e126]:
        - region [ref=e127]:
          - generic [ref=e128]:
            - heading "Line Chart - Series Markers" [level=3] [ref=e129]
            - paragraph [ref=e130]: 各观测点圆环标记
          - generic [ref=e131]:
            - paragraph [ref=e133]: 滚动到此处查看示例
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
          - generic [ref=e146]:
            - heading "Line Chart - Dashed Tail" [level=3] [ref=e147]
            - paragraph [ref=e148]: 从指定索引开始绘制虚线尾段
          - generic [ref=e149]:
            - paragraph [ref=e151]: 滚动到此处查看示例
            - generic [ref=e152]:
              - button "更新数据" [ref=e153] [cursor=pointer]
              - button "重播动效" [ref=e155] [cursor=pointer]
              - status [ref=e157]: 示例数据 · 已更新 0 次
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
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e161]: 对应官网示例
            - generic [ref=e162]: （新标签页打开）
    - region [ref=e163]:
      - heading "坐标与辅助读数" [level=2] [ref=e164]
      - generic [ref=e165]:
        - region [ref=e166]:
          - generic [ref=e167]:
            - heading "Line Chart - Markers" [level=3] [ref=e168]
            - paragraph [ref=e169]: 标注关键事件
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
          - generic [ref=e185]:
            - heading "Line Chart - X Axis" [level=3] [ref=e186]
            - paragraph [ref=e187]: 显示日期横轴
          - generic [ref=e188]:
            - paragraph [ref=e190]: 滚动到此处查看示例
            - generic [ref=e191]:
              - button "更新数据" [ref=e192] [cursor=pointer]
              - button "重播动效" [ref=e194] [cursor=pointer]
              - status [ref=e196]: 示例数据 · 已更新 0 次
            - group [ref=e197]:
              - generic "查看本卡代码" [ref=e198] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e199] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e200]: 对应官网示例
            - generic [ref=e201]: （新标签页打开）
        - region [ref=e202]:
          - generic [ref=e203]:
            - heading "Line Chart - X & Y Axis" [level=3] [ref=e204]
            - paragraph [ref=e205]: 横轴日期与水平参考网格
          - generic [ref=e206]:
            - paragraph [ref=e208]: 滚动到此处查看示例
            - generic [ref=e209]:
              - button "更新数据" [ref=e210] [cursor=pointer]
              - button "重播动效" [ref=e212] [cursor=pointer]
              - status [ref=e214]: 示例数据 · 已更新 0 次
            - group [ref=e215]:
              - generic "查看本卡代码" [ref=e216] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e217] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e218]: 对应官网示例
            - generic [ref=e219]: （新标签页打开）
        - region [ref=e220]:
          - generic [ref=e221]:
            - heading "Line Chart - Left Y axis" [level=3] [ref=e222]
            - paragraph [ref=e223]: 多个系列共用左纵轴
          - generic [ref=e224]:
            - generic [ref=e225]:
              - generic [ref=e226]:
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
              - generic [ref=e240]:
                - button "参与人数 · 人" [ref=e242] [cursor=pointer]
                - button "完成人数 · 人" [ref=e245] [cursor=pointer]
              - group [ref=e247]:
                - generic "查看精确数据" [ref=e248] [cursor=pointer]
            - generic [ref=e249]:
              - button "更新数据" [ref=e250] [cursor=pointer]
              - button "重播动效" [ref=e252] [cursor=pointer]
              - status [ref=e254]: 示例数据 · 已更新 0 次
            - group [ref=e255]:
              - generic "查看本卡代码" [ref=e256] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e257] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e258]: 对应官网示例
            - generic [ref=e259]: （新标签页打开）
        - region [ref=e260]:
          - generic [ref=e261]:
            - heading "Line Chart - Left and right Y axes" [level=3] [ref=e262]
            - paragraph [ref=e263]: 左右独立纵轴与量纲
          - generic [ref=e264]:
            - generic [ref=e265]:
              - generic [ref=e266]:
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
              - generic [ref=e280]:
                - button "参与人数 · 人" [ref=e282] [cursor=pointer]
                - button "完成率 · %" [ref=e285] [cursor=pointer]
              - paragraph [ref=e287]: 左轴：参与人数 · 人；右轴：完成率 · %。两轴独立读取。
              - group [ref=e288]:
                - generic "查看精确数据" [ref=e289] [cursor=pointer]
            - generic [ref=e290]:
              - button "更新数据" [ref=e291] [cursor=pointer]
              - button "重播动效" [ref=e293] [cursor=pointer]
              - status [ref=e295]: 示例数据 · 已更新 0 次
            - group [ref=e296]:
              - generic "查看本卡代码" [ref=e297] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e298] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e299]: 对应官网示例
            - generic [ref=e300]: （新标签页打开）
        - region [ref=e301]:
          - generic [ref=e302]:
            - heading "Line Chart - Pattern Background" [level=3] [ref=e303]
            - paragraph [ref=e304]: 图案背景替代网格
          - generic [ref=e305]:
            - generic [ref=e306]:
              - generic [ref=e307]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 9
                  - generic: Sep 17
                  - generic: Sep 24
              - group [ref=e318]:
                - generic "查看精确数据" [ref=e319] [cursor=pointer]
            - generic [ref=e320]:
              - button "更新数据" [ref=e321] [cursor=pointer]
              - button "重播动效" [ref=e323] [cursor=pointer]
              - status [ref=e325]: 示例数据 · 已更新 0 次
            - group [ref=e326]:
              - generic "查看本卡代码" [ref=e327] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e328] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e329]: 对应官网示例
            - generic [ref=e330]: （新标签页打开）
        - region [ref=e331]:
          - generic [ref=e332]:
            - heading "Line Chart - Dot Grid Background" [level=3] [ref=e333]
            - paragraph [ref=e334]: 带边缘渐隐的点阵背景
          - generic [ref=e335]:
            - paragraph [ref=e337]: 滚动到此处查看示例
            - generic [ref=e338]:
              - button "更新数据" [ref=e339] [cursor=pointer]
              - button "重播动效" [ref=e341] [cursor=pointer]
              - status [ref=e343]: 示例数据 · 已更新 0 次
            - group [ref=e344]:
              - generic "查看本卡代码" [ref=e345] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e346] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e347]: 对应官网示例
            - generic [ref=e348]: （新标签页打开）
        - region [ref=e349]:
          - generic [ref=e350]:
            - heading "Line Chart - Reference Band" [level=3] [ref=e351]
            - paragraph [ref=e352]: 水平参考区间与边界标识
          - generic [ref=e353]:
            - paragraph [ref=e355]: 滚动到此处查看示例
            - generic [ref=e356]:
              - button "更新数据" [ref=e357] [cursor=pointer]
              - button "重播动效" [ref=e359] [cursor=pointer]
              - status [ref=e361]: 示例数据 · 已更新 0 次
            - group [ref=e362]:
              - generic "查看本卡代码" [ref=e363] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e364] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e365]: 对应官网示例
            - generic [ref=e366]: （新标签页打开）
        - region [ref=e367]:
          - generic [ref=e368]:
            - heading "Line Chart - Pattern Reference Band" [level=3] [ref=e369]
            - paragraph [ref=e370]: 图案参考区间与相应轴标签
          - generic [ref=e371]:
            - paragraph [ref=e373]: 滚动到此处查看示例
            - generic [ref=e374]:
              - button "更新数据" [ref=e375] [cursor=pointer]
              - button "重播动效" [ref=e377] [cursor=pointer]
              - status [ref=e379]: 示例数据 · 已更新 0 次
            - group [ref=e380]:
              - generic "查看本卡代码" [ref=e381] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e382] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e383]: 对应官网示例
            - generic [ref=e384]: （新标签页打开）
    - region [ref=e385]:
      - heading "交互与状态" [level=2] [ref=e386]
      - generic [ref=e387]:
        - region [ref=e388]:
          - generic [ref=e389]:
            - heading "Line Chart - Trio with Brush" [level=3] [ref=e390]
            - paragraph [ref=e391]: 三条曲线、顶部图例、点阵与范围缩放
          - generic [ref=e392]:
            - paragraph [ref=e394]: 滚动到此处查看示例
            - generic [ref=e395]:
              - button "更新数据" [ref=e396] [cursor=pointer]
              - button "重播动效" [ref=e398] [cursor=pointer]
              - status [ref=e400]: 示例数据 · 已更新 0 次
            - group [ref=e401]:
              - generic "查看本卡代码" [ref=e402] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e403] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e404]: 对应官网示例
            - generic [ref=e405]: （新标签页打开）
        - region [ref=e406]:
          - generic [ref=e407]:
            - heading "Line Chart - Projection" [level=3] [ref=e408]
            - paragraph [ref=e409]: 目标与自动预测曲线、终端标记
          - generic [ref=e410]:
            - paragraph [ref=e412]: 滚动到此处查看示例
            - generic [ref=e413]:
              - button "更新数据" [ref=e414] [cursor=pointer]
              - button "重播动效" [ref=e416] [cursor=pointer]
              - status [ref=e418]: 示例数据 · 已更新 0 次
            - group [ref=e419]:
              - generic "查看本卡代码" [ref=e420] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e421] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e422]: 对应官网示例
            - generic [ref=e423]: （新标签页打开）
        - region [ref=e424]:
          - generic [ref=e425]:
            - heading "Line Chart - Segment Selection" [level=3] [ref=e426]
            - paragraph [ref=e427]: 按下并拖动时高亮一段范围
          - generic [ref=e428]:
            - paragraph [ref=e430]: 滚动到此处查看示例
            - generic [ref=e431]:
              - button "更新数据" [ref=e432] [cursor=pointer]
              - button "重播动效" [ref=e434] [cursor=pointer]
              - status [ref=e436]: 示例数据 · 已更新 0 次
            - group [ref=e437]:
              - generic "查看本卡代码" [ref=e438] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e439] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e440]: 对应官网示例
            - generic [ref=e441]: （新标签页打开）
        - region [ref=e442]:
          - generic [ref=e443]:
            - heading "Line Chart - Loading" [level=3] [ref=e444]
            - paragraph [ref=e445]: 网格与前景脉冲加载
          - generic [ref=e446]:
            - paragraph [ref=e448]: 滚动到此处查看示例
            - generic [ref=e449]:
              - button "更新数据" [ref=e450] [cursor=pointer]
              - button "重播动效" [ref=e452] [cursor=pointer]
              - status [ref=e454]: 示例数据 · 已更新 0 次
            - group [ref=e455]:
              - generic "查看本卡代码" [ref=e456] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e457] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e458]: 对应官网示例
            - generic [ref=e459]: （新标签页打开）
        - region [ref=e460]:
          - generic [ref=e461]:
            - heading "Line Chart - Loading (Sweep)" [level=3] [ref=e462]
            - paragraph [ref=e463]: 斜向扫光折线骨架
          - generic [ref=e464]:
            - paragraph [ref=e466]: 滚动到此处查看示例
            - generic [ref=e467]:
              - button "更新数据" [ref=e468] [cursor=pointer]
              - button "重播动效" [ref=e470] [cursor=pointer]
              - status [ref=e472]: 示例数据 · 已更新 0 次
            - group [ref=e473]:
              - generic "查看本卡代码" [ref=e474] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e475] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e476]: 对应官网示例
            - generic [ref=e477]: （新标签页打开）
  - generic [ref=e478]:
    - heading "数据与使用边界" [level=2] [ref=e479]
    - paragraph [ref=e480]: Date日期与有限数值；本例按日记录人数。
    - paragraph [ref=e481]: 本例不宣称缺口插值、点击固定或图例隐藏。
    - paragraph [ref=e482]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e483] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - group [ref=e485]:
    - generic "接口与调用示例" [ref=e486] [cursor=pointer]
  - navigation "相关图型" [ref=e487]:
    - link "面积图" [ref=e488] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e490] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e492] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e494] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e496] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e498] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e500] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e502] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e504] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e506] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e508] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e510] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e512] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e514] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e516] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e518] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e520] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e522] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e524] [cursor=pointer]:
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
      |                                                                                                                                                                                                                                     ^ Error: official-line-dual-y-axis-390-reduce-monochrome-blue: colors, widths, fill, typography, legends, dates and viewport
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