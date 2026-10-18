# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: css-local-consumption.spec.ts >> [B01-entry] bklit-catalog loads its declared Foundation motion dependency
- Location: tests/e2e/css-local-consumption.spec.ts:69:4

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
    - generic [ref=e5]:
      - heading "Rain 图表库" [level=1] [ref=e6]
      - paragraph [ref=e7]: 19种图型，Rain 配色与字体，Bklit 原生图形与业务扩展。
    - link "查看原生与 Rain 对照" [ref=e8] [cursor=pointer]:
      - /url: /bklit-validation.html
  - generic [ref=e9]:
    - navigation "图型目录" [ref=e10]:
      - link "面积图" [ref=e11] [cursor=pointer]:
        - /url: "#chart-area"
      - link "折线图" [ref=e12] [cursor=pointer]:
        - /url: "#chart-line"
      - link "柱状图" [ref=e13] [cursor=pointer]:
        - /url: "#chart-bar"
      - link "组合图" [ref=e14] [cursor=pointer]:
        - /url: "#chart-composed"
      - link "饼图 / 环饼" [ref=e15] [cursor=pointer]:
        - /url: "#chart-pie"
      - link "多目标进度环" [ref=e16] [cursor=pointer]:
        - /url: "#chart-ring"
      - link "雷达图" [ref=e17] [cursor=pointer]:
        - /url: "#chart-radar"
      - link "时间散点" [ref=e18] [cursor=pointer]:
        - /url: "#chart-scatter"
      - link "漏斗图" [ref=e19] [cursor=pointer]:
        - /url: "#chart-funnel"
      - link "仪表图" [ref=e20] [cursor=pointer]:
        - /url: "#chart-gauge"
      - link "桑基图" [ref=e21] [cursor=pointer]:
        - /url: "#chart-sankey"
      - link "旭日图" [ref=e22] [cursor=pointer]:
        - /url: "#chart-sunburst"
      - link "日历热图" [ref=e23] [cursor=pointer]:
        - /url: "#chart-heatmap"
      - link "分区地图" [ref=e24] [cursor=pointer]:
        - /url: "#chart-choropleth"
      - link "K线图" [ref=e25] [cursor=pointer]:
        - /url: "#chart-candlestick"
      - link "盈亏线" [ref=e26] [cursor=pointer]:
        - /url: "#chart-profit-loss"
      - link "实时折线" [ref=e27] [cursor=pointer]:
        - /url: "#chart-live-line"
      - link "分类矩阵" [ref=e28] [cursor=pointer]:
        - /url: "#chart-matrix"
      - link "网络关系图" [ref=e29] [cursor=pointer]:
        - /url: "#chart-network"
    - region [ref=e30]:
      - heading "面积图" [level=2] [ref=e31]
      - paragraph [ref=e32]: 时间趋势、轻渐变面积与原生聚焦。
      - generic [ref=e33]:
        - generic [ref=e34]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e35]:
            - option "清晰线与轻面积" [selected]
            - option "蓝紫近邻"
            - option "多色类别"
            - option "协调实色"
            - option "蓝灰单色"
        - generic [ref=e36]:
          - text: 示例状态
          - combobox "示例状态" [ref=e37]:
            - option "正常数据" [selected]
            - option "无数据"
            - option "零值"
            - option "长标签"
            - option "单项／单点"
            - option "缺测"
            - option "无效数据"
        - generic [ref=e38]:
          - text: 尺寸
          - combobox "图表尺寸" [ref=e39]:
            - option "标准" [selected]
            - option "迷你 / 嵌入"
        - generic [ref=e40]:
          - text: 系列数
          - combobox "系列数" [ref=e41]:
            - option "3系列" [selected]
            - option "5系列"
        - button "更新数据" [ref=e42] [cursor=pointer]
        - button "重播动效" [ref=e43] [cursor=pointer]
        - button "对照实例" [ref=e44] [cursor=pointer]
      - generic [ref=e45]:
        - generic [ref=e46]:
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
        - button "参与人数 · 人" [ref=e61] [cursor=pointer]
        - group [ref=e64]:
          - generic "查看精确数据" [ref=e65] [cursor=pointer]
      - status [ref=e66]: 示例数据
      - paragraph [ref=e67]:
        - strong [ref=e68]: 数据要求：
        - text: 按日期排序；各系列同量纲。本例为人数，透明叠加而非堆叠。
      - paragraph [ref=e69]:
        - strong [ref=e70]: 使用边界：
        - text: 缺测不能默认补零；迷你图是尺寸配方。
      - group [ref=e71]:
        - generic "调用配置、完整源码与示例数据" [ref=e72] [cursor=pointer]
        - option "main.tsx" [selected]
        - option "index.html"
        - option "chart-point-reading.tsx"
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
      - region "全部图表变体" [ref=e73]:
        - navigation "变体分组" [ref=e74]:
          - button "基础结构" [ref=e75] [cursor=pointer]
          - button "图形材质" [ref=e76] [cursor=pointer]
          - button "坐标与辅助读数" [ref=e77] [cursor=pointer]
          - button "交互与状态" [ref=e78] [cursor=pointer]
        - region [ref=e79]:
          - heading "基础结构" [level=2] [ref=e80]
          - generic [ref=e81]:
            - region [ref=e82]:
              - generic [ref=e83]:
                - heading "Area Chart" [level=3] [ref=e84]
                - paragraph [ref=e85]: 默认平滑渐变面积
              - generic [ref=e86]:
                - generic [ref=e87]:
                  - generic [ref=e88]:
                    - generic:
                      - generic: Sep 1
                      - generic: Sep 9
                      - generic: Sep 17
                      - generic: Sep 24
                  - group [ref=e101]:
                    - generic "查看精确数据" [ref=e102] [cursor=pointer]
                - generic [ref=e103]:
                  - button "更新数据" [ref=e104] [cursor=pointer]
                  - button "重播动效" [ref=e106] [cursor=pointer]
                  - status [ref=e108]: 示例数据 · 已更新 0 次
                - group [ref=e109]:
                  - generic "查看本卡代码" [ref=e110] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e111] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e112]:
              - generic [ref=e113]:
                - heading "Area Chart - Step" [level=3] [ref=e114]
                - paragraph [ref=e115]: 阶梯插值表达离散变化
              - generic [ref=e116]:
                - generic [ref=e117]:
                  - generic [ref=e118]:
                    - generic:
                      - generic: Sep 1
                      - generic: Sep 9
                      - generic: Sep 17
                      - generic: Sep 24
                  - group [ref=e131]:
                    - generic "查看精确数据" [ref=e132] [cursor=pointer]
                - generic [ref=e133]:
                  - button "更新数据" [ref=e134] [cursor=pointer]
                  - button "重播动效" [ref=e136] [cursor=pointer]
                  - status [ref=e138]: 示例数据 · 已更新 0 次
                - group [ref=e139]:
                  - generic "查看本卡代码" [ref=e140] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e141] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e142]:
              - generic [ref=e143]:
                - heading "Area Chart - Stacked" [level=3] [ref=e144]
                - paragraph [ref=e145]: 多面积叠加对比；不推定累计求和
              - generic [ref=e146]:
                - paragraph [ref=e148]: 滚动到此处查看示例
                - generic [ref=e149]:
                  - button "更新数据" [ref=e150] [cursor=pointer]
                  - button "重播动效" [ref=e152] [cursor=pointer]
                  - status [ref=e154]: 示例数据 · 已更新 0 次
                - group [ref=e155]:
                  - generic "查看本卡代码" [ref=e156] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e157] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
        - region [ref=e158]:
          - heading "图形材质" [level=2] [ref=e159]
          - generic [ref=e160]:
            - region [ref=e161]:
              - generic [ref=e162]:
                - heading "Area Chart - Gradient" [level=3] [ref=e163]
                - paragraph [ref=e164]: 调整底部透明度的面积填充
              - generic [ref=e165]:
                - paragraph [ref=e166]: 本卡使用独立示例配色，保留材质或色阶差异。
                - paragraph [ref=e168]: 滚动到此处查看示例
                - generic [ref=e169]:
                  - button "更新数据" [ref=e170] [cursor=pointer]
                  - button "重播动效" [ref=e172] [cursor=pointer]
                  - status [ref=e174]: 示例数据 · 已更新 0 次
                - group [ref=e175]:
                  - generic "查看本卡代码" [ref=e176] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e177] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e178]:
              - generic [ref=e179]:
                - heading "Area Chart - No Stroke" [level=3] [ref=e180]
                - paragraph [ref=e181]: 隐藏面积轮廓线
              - generic [ref=e182]:
                - paragraph [ref=e184]: 滚动到此处查看示例
                - generic [ref=e185]:
                  - button "更新数据" [ref=e186] [cursor=pointer]
                  - button "重播动效" [ref=e188] [cursor=pointer]
                  - status [ref=e190]: 示例数据 · 已更新 0 次
                - group [ref=e191]:
                  - generic "查看本卡代码" [ref=e192] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e193] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e194]:
              - generic [ref=e195]:
                - heading "Area Chart - Fade Edges" [level=3] [ref=e196]
                - paragraph [ref=e197]: 左右边缘渐隐
              - generic [ref=e198]:
                - paragraph [ref=e200]: 滚动到此处查看示例
                - generic [ref=e201]:
                  - button "更新数据" [ref=e202] [cursor=pointer]
                  - button "重播动效" [ref=e204] [cursor=pointer]
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
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e209] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e210]:
              - generic [ref=e211]:
                - heading "Area Chart - Pattern" [level=3] [ref=e212]
                - paragraph [ref=e213]: 斜线图案面积填充
              - generic [ref=e214]:
                - paragraph [ref=e216]: 滚动到此处查看示例
                - generic [ref=e217]:
                  - button "更新数据" [ref=e218] [cursor=pointer]
                  - button "重播动效" [ref=e220] [cursor=pointer]
                  - status [ref=e222]: 示例数据 · 已更新 0 次
                - group [ref=e223]:
                  - generic "查看本卡代码" [ref=e224] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e225] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e226]:
              - generic [ref=e227]:
                - heading "Area Chart - Series Markers" [level=3] [ref=e228]
                - paragraph [ref=e229]: 各数据点使用圆环标记
              - generic [ref=e230]:
                - paragraph [ref=e232]: 滚动到此处查看示例
                - generic [ref=e233]:
                  - button "更新数据" [ref=e234] [cursor=pointer]
                  - button "重播动效" [ref=e236] [cursor=pointer]
                  - status [ref=e238]: 示例数据 · 已更新 0 次
                - group [ref=e239]:
                  - generic "查看本卡代码" [ref=e240] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e241] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e242]:
              - generic [ref=e243]:
                - heading "Area Chart - Dashed Tail" [level=3] [ref=e244]
                - paragraph [ref=e245]: 未完整时段使用虚线尾段
              - generic [ref=e246]:
                - paragraph [ref=e248]: 滚动到此处查看示例
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
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e257] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
        - region [ref=e258]:
          - heading "坐标与辅助读数" [level=2] [ref=e259]
          - generic [ref=e260]:
            - region [ref=e261]:
              - generic [ref=e262]:
                - heading "Area Chart - Left Y axis" [level=3] [ref=e263]
                - paragraph [ref=e264]: 同量纲系列共用左纵轴
              - generic [ref=e265]:
                - paragraph [ref=e267]: 滚动到此处查看示例
                - generic [ref=e268]:
                  - button "更新数据" [ref=e269] [cursor=pointer]
                  - button "重播动效" [ref=e271] [cursor=pointer]
                  - status [ref=e273]: 示例数据 · 已更新 0 次
                - group [ref=e274]:
                  - generic "查看本卡代码" [ref=e275] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e276] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e277]:
              - generic [ref=e278]:
                - heading "Area Chart - Left and right Y axes" [level=3] [ref=e279]
                - paragraph [ref=e280]: 左右独立纵轴与量纲
              - generic [ref=e281]:
                - paragraph [ref=e283]: 滚动到此处查看示例
                - generic [ref=e284]:
                  - button "更新数据" [ref=e285] [cursor=pointer]
                  - button "重播动效" [ref=e287] [cursor=pointer]
                  - status [ref=e289]: 示例数据 · 已更新 0 次
                - group [ref=e290]:
                  - generic "查看本卡代码" [ref=e291] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e292] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e293]:
              - generic [ref=e294]:
                - heading "Area Chart - Pattern Background" [level=3] [ref=e295]
                - paragraph [ref=e296]: 图案背景替代网格
              - generic [ref=e297]:
                - paragraph [ref=e299]: 滚动到此处查看示例
                - generic [ref=e300]:
                  - button "更新数据" [ref=e301] [cursor=pointer]
                  - button "重播动效" [ref=e303] [cursor=pointer]
                  - status [ref=e305]: 示例数据 · 已更新 0 次
                - group [ref=e306]:
                  - generic "查看本卡代码" [ref=e307] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e308] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e309]:
              - generic [ref=e310]:
                - heading "Area Chart - Dot Grid Background" [level=3] [ref=e311]
                - paragraph [ref=e312]: 带边缘渐隐的点阵背景
              - generic [ref=e313]:
                - paragraph [ref=e315]: 滚动到此处查看示例
                - generic [ref=e316]:
                  - button "更新数据" [ref=e317] [cursor=pointer]
                  - button "重播动效" [ref=e319] [cursor=pointer]
                  - status [ref=e321]: 示例数据 · 已更新 0 次
                - group [ref=e322]:
                  - generic "查看本卡代码" [ref=e323] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e324] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e325]:
              - generic [ref=e326]:
                - heading "Area Chart - Reference Band" [level=3] [ref=e327]
                - paragraph [ref=e328]: 带边界标识的水平参考区间
              - generic [ref=e329]:
                - paragraph [ref=e331]: 滚动到此处查看示例
                - generic [ref=e332]:
                  - button "更新数据" [ref=e333] [cursor=pointer]
                  - button "重播动效" [ref=e335] [cursor=pointer]
                  - status [ref=e337]: 示例数据 · 已更新 0 次
                - group [ref=e338]:
                  - generic "查看本卡代码" [ref=e339] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e340] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e341]:
              - generic [ref=e342]:
                - heading "Area Chart - Pattern Reference Band" [level=3] [ref=e343]
                - paragraph [ref=e344]: 图案参考区间与相应轴标签
              - generic [ref=e345]:
                - paragraph [ref=e347]: 滚动到此处查看示例
                - generic [ref=e348]:
                  - button "更新数据" [ref=e349] [cursor=pointer]
                  - button "重播动效" [ref=e351] [cursor=pointer]
                  - status [ref=e353]: 示例数据 · 已更新 0 次
                - group [ref=e354]:
                  - generic "查看本卡代码" [ref=e355] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e356] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
        - region [ref=e357]:
          - heading "交互与状态" [level=2] [ref=e358]
          - generic [ref=e359]:
            - region [ref=e360]:
              - generic [ref=e361]:
                - heading "Area Chart - Interactive" [level=3] [ref=e362]
                - paragraph [ref=e363]: 双面积趋势、曲线选择与临时拖选
              - generic [ref=e364]:
                - paragraph [ref=e366]: 滚动到此处查看示例
                - generic [ref=e367]:
                  - button "更新数据" [ref=e368] [cursor=pointer]
                  - button "重播动效" [ref=e370] [cursor=pointer]
                  - status [ref=e372]: 示例数据 · 已更新 0 次
                - group [ref=e373]:
                  - generic "查看本卡代码" [ref=e374] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e375] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e376]:
              - generic [ref=e377]:
                - heading "Area Chart - Loading" [level=3] [ref=e378]
                - paragraph [ref=e379]: 网格与前景脉冲加载
              - generic [ref=e380]:
                - paragraph [ref=e382]: 滚动到此处查看示例
                - generic [ref=e383]:
                  - button "更新数据" [ref=e384] [cursor=pointer]
                  - button "重播动效" [ref=e386] [cursor=pointer]
                  - status [ref=e388]: 示例数据 · 已更新 0 次
                - group [ref=e389]:
                  - generic "查看本卡代码" [ref=e390] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e391] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e392]:
              - generic [ref=e393]:
                - heading "Area Chart - Loading (Sweep)" [level=3] [ref=e394]
                - paragraph [ref=e395]: 斜向扫光骨架加载
              - generic [ref=e396]:
                - paragraph [ref=e398]: 滚动到此处查看示例
                - generic [ref=e399]:
                  - button "更新数据" [ref=e400] [cursor=pointer]
                  - button "重播动效" [ref=e402] [cursor=pointer]
                  - status [ref=e404]: 示例数据 · 已更新 0 次
                - group [ref=e405]:
                  - generic "查看本卡代码" [ref=e406] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e407] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
            - region [ref=e408]:
              - generic [ref=e409]:
                - heading "Area Chart - Segment Selection" [level=3] [ref=e410]
                - paragraph [ref=e411]: 按下并拖动时高亮一段范围
              - generic [ref=e412]:
                - paragraph [ref=e414]: 滚动到此处查看示例
                - generic [ref=e415]:
                  - button "更新数据" [ref=e416] [cursor=pointer]
                  - button "重播动效" [ref=e418] [cursor=pointer]
                  - status [ref=e420]: 示例数据 · 已更新 0 次
                - group [ref=e421]:
                  - generic "查看本卡代码" [ref=e422] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/trend.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/profit-loss.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-point-reading.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e423] [cursor=pointer]:
                - /url: https://bklit.com/charts/area-chart
```

# Test source

```ts
  1  | import { writeFileSync } from "node:fs";
  2  | import { expect, test, type Locator, type TestInfo } from "@playwright/test";
  3  | 
  4  | async function attachJson(info: TestInfo, name: string, value: unknown) {
  5  |   const path = info.outputPath(`${name}.json`);
  6  |   writeFileSync(path, JSON.stringify(value, null, 2));
  7  |   await info.attach(name, { path, contentType: "application/json" });
  8  | }
  9  | const playground = "http://127.0.0.1:5392", prototype = "http://127.0.0.1:5393";
  10 | async function tokenConsumption(locator: Locator, property: string, variable: string) {
  11 |   await expect(locator).toBeVisible();
  12 |   const result = await locator.evaluate((node, { property, variable }) => {
  13 |     const current = getComputedStyle(node), probe = document.createElement("span");
  14 |     probe.style.cssText = "position:fixed;visibility:hidden;pointer-events:none";
  15 |     probe.style.setProperty(property, `var(${variable})`); node.append(probe);
  16 |     const result = { property, variable, actual: current.getPropertyValue(property), token: current.getPropertyValue(variable).trim(), resolved: getComputedStyle(probe).getPropertyValue(property) };
  17 |     probe.remove(); return result;
  18 |   }, { property, variable });
  19 |   expect(result.token).not.toBe(""); expect(result.actual).toBe(result.resolved); return result;
  20 | }
  21 | test.afterEach(async ({ page }) => expect((await page.pageErrors()).map(error => error.message)).toEqual([]));
  22 | 
  23 | test("[B01-local] spinner and menu labels use the registered semibold role", async ({ page }, info) => {
  24 |   await page.goto(`${playground}/#spinner`);
  25 |   const spinner = await tokenConsumption(page.locator(".component-doc__loading-result strong"), "font-weight", "--rain-font-weight-semibold");
  26 |   await page.locator(".component-doc__loading-result").screenshot({ path: info.outputPath("spinner-role.png") });
  27 |   await page.goto(`${playground}/#navigation-menu`); await page.getByRole("button", { name: "教学空间", exact: true }).click();
  28 |   const menu = await tokenConsumption(page.locator(".g3-doc-nav-link strong").first(), "font-weight", "--rain-font-weight-semibold");
  29 |   await page.locator(".rain-navigation-menu-content").screenshot({ path: info.outputPath("navigation-label.png") });
  30 |   await attachJson(info, "computed-typography", { spinner, menu });
  31 | });
  32 | 
  33 | test("[B01-local] slider label and output roles and task pagination width are computed", async ({ page }, info) => {
  34 |   await page.goto(`${playground}/#slider`);
  35 |   const label = await tokenConsumption(page.locator(".slider-example__heading > label").first(), "font-weight", "--rain-font-weight-semibold");
  36 |   const output = await tokenConsumption(page.locator(".slider-example__heading > output").first(), "font-weight", "--rain-font-weight-semibold");
  37 |   await page.locator(".slider-example__heading").first().screenshot({ path: info.outputPath("slider-label-output.png") });
  38 |   await page.goto(`${playground}/#drawer`); await page.getByRole("button", { name: /^查看任务：/ }).first().click();
  39 |   const position = page.locator(".g6-task-details-position"); await expect(position).toBeVisible(); await expect(position).toHaveCSS("min-width", "48px");
  40 |   const width = (await position.boundingBox())!.width; expect(width).toBeGreaterThanOrEqual(48);
  41 |   await page.locator(".g6-task-details-footer").screenshot({ path: info.outputPath("task-pagination.png") });
  42 |   await attachJson(info, "computed-local-roles", { label, output, pagination: { minWidth: "48px", width } });
  43 | });
  44 | 
  45 | test("[B01-local] exam display-mode width remains local and its selection works", async ({ page }, info) => {
  46 |   await page.goto(`${prototype}/#exam-editor`); await page.locator(".em-question").first().hover(); await page.getByRole("button", { name: "移动到", exact: true }).first().click();
  47 |   const modes = page.locator(".em-display-modes"); await expect(modes).toBeVisible(); await expect(modes).toHaveCSS("width", "240px");
  48 |   await modes.getByRole("tab", { name: "紧凑", exact: true }).click(); await expect(modes.getByRole("tab", { name: "紧凑", exact: true })).toHaveAttribute("aria-selected", "true");
  49 |   await expect(modes).toHaveCSS("width", "240px"); await page.locator(".em-target-toolbar").screenshot({ path: info.outputPath("exam-display-modes.png") });
  50 | });
  51 | 
  52 | test("[B01-local] Bklit active link and data disclosure resolve semantic roles", async ({ page }, info) => {
  53 |   await page.goto(`${prototype}/bklit-validation.html`);
  54 |   const link = page.getByRole("link", { name: "查看 G2 实验 ↗" });
  55 |   const linkColor = await tokenConsumption(link, "color", "--rain-color-text-link");
  56 |   await page.keyboard.press("Tab"); await link.focus(); await expect(link).toHaveCSS("outline-width", "2px");
  57 |   const linkFocus = await tokenConsumption(link, "outline-color", "--rain-color-focus-control");
  58 |   await page.locator(".bklit-page-heading").screenshot({ path: info.outputPath("bklit-link-focus.png") });
  59 |   const summary = page.locator(".bklit-data summary").first(); await summary.focus(); await expect(summary).toHaveCSS("outline-width", "2px");
  60 |   const chartFocus = await tokenConsumption(summary, "outline-color", "--rain-color-focus-control");
  61 |   await summary.screenshot({ path: info.outputPath("bklit-data-focus.png") });
  62 |   await attachJson(info, "computed-color-roles", { linkColor, linkFocus, chartFocus });
  63 | });
  64 | 
  65 | for (const entry of [
  66 |   { name: "drawer", url: `${playground}/drawer-refinement-consumer.html`, selector: "button" },
  67 |   { name: "bklit-validation", url: `${prototype}/bklit-validation.html`, selector: ".bklit-lab" },
  68 |   { name: "bklit-catalog", url: `${prototype}/bklit-catalog.html`, selector: ".rain-chart-catalog" },
  69 | ]) test(`[B01-entry] ${entry.name} loads its declared Foundation motion dependency`, async ({ page }, info) => {
  70 |   await page.goto(entry.url); const consumer = page.locator(entry.selector).first(); await expect(consumer).toBeVisible();
  71 |   const fact = await consumer.evaluate(node => ({ feedback: getComputedStyle(node).getPropertyValue("--rain-motion-feedback-duration").trim(), overlay: getComputedStyle(node).getPropertyValue("--rain-motion-overlay-duration").trim(), region: getComputedStyle(node).getPropertyValue("--rain-motion-region-duration").trim(), ease: getComputedStyle(node).getPropertyValue("--rain-motion-ease-out").trim(), uiButtonCount: document.querySelectorAll(".rain-button").length, inputNumberCount: document.querySelectorAll('[data-rain-id="ui-input-number"]').length, fieldStyleRegistered: [...document.styleSheets].some(sheet => [...sheet.cssRules].some(rule => rule.cssText.includes("--rain-field-focus-line:"))) }));
  72 |   await attachJson(info, "entry-computed-dependencies", fact);
  73 |   await page.screenshot({ path: info.outputPath(`${entry.name}-entry.png`), fullPage: false });
> 74 |   if (entry.name === "bklit-catalog") { expect(fact.uiButtonCount).toBeGreaterThan(0); expect(fact.fieldStyleRegistered).toBe(true); }
     |                                                                                                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  75 |   expect(fact.feedback).not.toBe(""); expect(fact.overlay).not.toBe(""); expect(fact.region).not.toBe(""); expect(fact.ease).not.toBe("");
  76 | });
  77 | 
```