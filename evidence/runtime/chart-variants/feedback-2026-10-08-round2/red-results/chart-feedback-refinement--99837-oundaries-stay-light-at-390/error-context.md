# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-refinement.spec.ts >> prototype reference range dashed boundaries stay light at 390
- Location: tests/e2e/chart-feedback-refinement.spec.ts:52:3

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
      - paragraph [ref=e7]: 17种图型，Rain 配色与字体，Bklit 原生动效与交互。
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
    - region [ref=e28]:
      - heading "柱状图" [level=2] [ref=e29]
      - paragraph [ref=e30]: 分组比较、互斥堆叠、同色渐变与圆头渐隐柱。
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e33]:
            - option "蓝紫近邻" [selected]
            - option "多色类别"
            - option "协调实色"
            - option "蓝灰单色"
            - option "同色渐变柱"
            - option "圆头渐隐柱"
        - generic [ref=e34]:
          - text: 示例状态
          - combobox "示例状态" [ref=e35]:
            - option "正常数据" [selected]
            - option "无数据"
            - option "零值"
            - option "长标签"
            - option "单项／单点"
            - option "缺测"
            - option "无效数据"
        - generic [ref=e36]:
          - text: 系列数
          - combobox "系列数" [ref=e37]:
            - option "3系列" [selected]
            - option "5系列"
        - button "更新数据" [ref=e38] [cursor=pointer]
        - button "重播动效" [ref=e39] [cursor=pointer]
        - button "对照实例" [ref=e40] [cursor=pointer]
      - generic [ref=e41]:
        - generic [ref=e42]:
          - text: 柱形
          - combobox "柱形配方" [ref=e43] [cursor=pointer]:
            - option "分组柱" [selected]
            - option "互斥等级堆叠"
        - generic [ref=e44]:
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
        - generic [ref=e74]:
          - button "参与人数 · 人" [ref=e76] [cursor=pointer]
          - button "完成人数 · 人" [ref=e80] [cursor=pointer]
          - button "复习人数 · 人" [ref=e84] [cursor=pointer]
        - group [ref=e87]:
          - generic "查看精确数据" [ref=e88] [cursor=pointer]
      - status [ref=e89]: 示例数据 · 已按系统设置减少动效
      - paragraph [ref=e90]:
        - strong [ref=e91]: 数据要求：
        - text: 类别键唯一；分组人数不可相加，堆叠改用互斥等级人数。
      - paragraph [ref=e92]:
        - strong [ref=e93]: 使用边界：
        - text: 原生柱坐标以0为下界，本例拒绝负值。
      - group [ref=e94]:
        - generic "调用配置、完整源码与示例数据" [ref=e95] [cursor=pointer]
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
      - region "全部图表变体" [ref=e96]:
        - navigation "变体分组" [ref=e97]:
          - button "基础结构" [ref=e98] [cursor=pointer]
          - button "图形材质" [ref=e99] [cursor=pointer]
          - button "坐标与辅助读数" [ref=e100] [cursor=pointer]
          - button "交互与状态" [ref=e101] [cursor=pointer]
        - region [ref=e102]:
          - heading "基础结构" [level=2] [ref=e103]
          - generic [ref=e104]:
            - region [ref=e105]:
              - generic [ref=e106]:
                - heading "Bar Chart" [level=3] [ref=e107]
                - paragraph [ref=e108]: 默认圆头纵向柱
              - generic [ref=e109]:
                - generic [ref=e110]:
                  - button "更新数据" [ref=e111] [cursor=pointer]
                  - button "重播动效" [ref=e113] [cursor=pointer]
                - paragraph [ref=e116]: 滚动到此处查看示例
                - status [ref=e117]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e118]:
                  - generic "查看本卡代码" [ref=e119] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e120] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e121]:
              - generic [ref=e122]:
                - heading "Bar Chart - 3D Stacked" [level=3] [ref=e123]
                - paragraph [ref=e124]: 分段侧面的立体堆叠柱
              - generic [ref=e125]:
                - generic [ref=e126]:
                  - button "更新数据" [ref=e127] [cursor=pointer]
                  - button "重播动效" [ref=e129] [cursor=pointer]
                - paragraph [ref=e132]: 滚动到此处查看示例
                - status [ref=e133]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e134]:
                  - generic "查看本卡代码" [ref=e135] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e136] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e137]:
              - generic [ref=e138]:
                - heading "Bar Chart - Multiple Series" [level=3] [ref=e139]
                - paragraph [ref=e140]: 按类别比较多系列分组柱
              - generic [ref=e141]:
                - generic [ref=e142]:
                  - button "更新数据" [ref=e143] [cursor=pointer]
                  - button "重播动效" [ref=e145] [cursor=pointer]
                - paragraph [ref=e148]: 滚动到此处查看示例
                - status [ref=e149]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e150]:
                  - generic "查看本卡代码" [ref=e151] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e152] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e153]:
              - generic [ref=e154]:
                - heading "Bar Chart - Stacked" [level=3] [ref=e155]
                - paragraph [ref=e156]: 互斥类别的分段间隔堆叠
              - generic [ref=e157]:
                - generic [ref=e158]:
                  - button "更新数据" [ref=e159] [cursor=pointer]
                  - button "重播动效" [ref=e161] [cursor=pointer]
                - paragraph [ref=e164]: 滚动到此处查看示例
                - status [ref=e165]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e166]:
                  - generic "查看本卡代码" [ref=e167] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e168] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e169]:
              - generic [ref=e170]:
                - heading "Bar Chart - Horizontal" [level=3] [ref=e171]
                - paragraph [ref=e172]: 横向柱与纵向类别标签
              - generic [ref=e173]:
                - generic [ref=e174]:
                  - button "更新数据" [ref=e175] [cursor=pointer]
                  - button "重播动效" [ref=e177] [cursor=pointer]
                - paragraph [ref=e180]: 滚动到此处查看示例
                - status [ref=e181]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e182]:
                  - generic "查看本卡代码" [ref=e183] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e184] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e185]:
              - generic [ref=e186]:
                - heading "Bar Chart - Dense Data" [level=3] [ref=e187]
                - paragraph [ref=e188]: 60天密集柱与窄间隔
              - generic [ref=e189]:
                - generic [ref=e190]:
                  - button "更新数据" [ref=e191] [cursor=pointer]
                  - button "重播动效" [ref=e193] [cursor=pointer]
                - paragraph [ref=e196]: 滚动到此处查看示例
                - status [ref=e197]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e198]:
                  - generic "查看本卡代码" [ref=e199] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e200] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e201]:
              - generic [ref=e202]:
                - heading "Bar Chart - No Gap" [level=3] [ref=e203]
                - paragraph [ref=e204]: 零间隙柱、渐变与线指示器
              - generic [ref=e205]:
                - generic [ref=e206]:
                  - button "更新数据" [ref=e207] [cursor=pointer]
                  - button "重播动效" [ref=e209] [cursor=pointer]
                - paragraph [ref=e212]: 滚动到此处查看示例
                - status [ref=e213]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e214]:
                  - generic "查看本卡代码" [ref=e215] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e216] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
        - region [ref=e217]:
          - heading "图形材质" [level=2] [ref=e218]
          - generic [ref=e219]:
            - region [ref=e220]:
              - generic [ref=e221]:
                - heading "Bar Chart - 3D Depth" [level=3] [ref=e222]
                - paragraph [ref=e223]: 顶面侧面构成立体柱及线指示器
              - generic [ref=e224]:
                - generic [ref=e225]:
                  - button "更新数据" [ref=e226] [cursor=pointer]
                  - button "重播动效" [ref=e228] [cursor=pointer]
                - paragraph [ref=e231]: 滚动到此处查看示例
                - status [ref=e232]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e233]:
                  - generic "查看本卡代码" [ref=e234] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e235] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e236]:
              - generic [ref=e237]:
                - heading "Bar Chart - Gradient" [level=3] [ref=e238]
                - paragraph [ref=e239]: 系列渐变柱填充
              - generic [ref=e240]:
                - generic [ref=e241]:
                  - button "更新数据" [ref=e242] [cursor=pointer]
                  - button "重播动效" [ref=e244] [cursor=pointer]
                - paragraph [ref=e246]: 本卡使用独立示例配色，保留材质或色阶差异。
                - paragraph [ref=e248]: 滚动到此处查看示例
                - status [ref=e249]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e250]:
                  - generic "查看本卡代码" [ref=e251] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e252] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e253]:
              - generic [ref=e254]:
                - heading "Bar Chart - Shape & Gradient" [level=3] [ref=e255]
                - paragraph [ref=e256]: 离散方块柱、渐变与吸附圆环指示
              - generic [ref=e257]:
                - generic [ref=e258]:
                  - button "更新数据" [ref=e259] [cursor=pointer]
                  - button "重播动效" [ref=e261] [cursor=pointer]
                - paragraph [ref=e263]: 本卡使用独立示例配色，保留材质或色阶差异。
                - paragraph [ref=e265]: 滚动到此处查看示例
                - status [ref=e266]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e267]:
                  - generic "查看本卡代码" [ref=e268] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e269] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e270]:
              - generic [ref=e271]:
                - heading "Bar Chart - Shape Squircle Ring" [level=3] [ref=e272]
                - paragraph [ref=e273]: 圆角方块柱与吸附方环指示
              - generic [ref=e274]:
                - generic [ref=e275]:
                  - button "更新数据" [ref=e276] [cursor=pointer]
                  - button "重播动效" [ref=e278] [cursor=pointer]
                - paragraph [ref=e281]: 滚动到此处查看示例
                - status [ref=e282]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e283]:
                  - generic "查看本卡代码" [ref=e284] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e285] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e286]:
              - generic [ref=e287]:
                - heading "Bar Chart - Pattern" [level=3] [ref=e288]
                - paragraph [ref=e289]: 斜线图案柱填充
              - generic [ref=e290]:
                - generic [ref=e291]:
                  - button "更新数据" [ref=e292] [cursor=pointer]
                  - button "重播动效" [ref=e294] [cursor=pointer]
                - paragraph [ref=e297]: 滚动到此处查看示例
                - status [ref=e298]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e299]:
                  - generic "查看本卡代码" [ref=e300] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e301] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
        - region [ref=e302]:
          - heading "坐标与辅助读数" [level=2] [ref=e303]
          - generic [ref=e304]:
            - region [ref=e305]:
              - generic [ref=e306]:
                - heading "Bar Chart - Left Y axis" [level=3] [ref=e307]
                - paragraph [ref=e308]: 分组柱共用左侧数值轴
              - generic [ref=e309]:
                - generic [ref=e310]:
                  - button "更新数据" [ref=e311] [cursor=pointer]
                  - button "重播动效" [ref=e313] [cursor=pointer]
                - paragraph [ref=e316]: 滚动到此处查看示例
                - status [ref=e317]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e318]:
                  - generic "查看本卡代码" [ref=e319] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e320] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e321]:
              - generic [ref=e322]:
                - heading "Bar Chart - Left and right Y axes" [level=3] [ref=e323]
                - paragraph [ref=e324]: 左右独立数值轴
              - generic [ref=e325]:
                - generic [ref=e326]:
                  - button "更新数据" [ref=e327] [cursor=pointer]
                  - button "重播动效" [ref=e329] [cursor=pointer]
                - paragraph [ref=e332]: 滚动到此处查看示例
                - status [ref=e333]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e334]:
                  - generic "查看本卡代码" [ref=e335] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e336] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e337]:
              - generic [ref=e338]:
                - heading "Bar Chart - Pattern Background" [level=3] [ref=e339]
                - paragraph [ref=e340]: 图案背景替代网格
              - generic [ref=e341]:
                - generic [ref=e342]:
                  - button "更新数据" [ref=e343] [cursor=pointer]
                  - button "重播动效" [ref=e345] [cursor=pointer]
                - paragraph [ref=e348]: 滚动到此处查看示例
                - status [ref=e349]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e350]:
                  - generic "查看本卡代码" [ref=e351] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e352] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e353]:
              - generic [ref=e354]:
                - heading "Bar Chart - Dot Grid Background" [level=3] [ref=e355]
                - paragraph [ref=e356]: 带边缘渐隐的点阵背景
              - generic [ref=e357]:
                - generic [ref=e358]:
                  - button "更新数据" [ref=e359] [cursor=pointer]
                  - button "重播动效" [ref=e361] [cursor=pointer]
                - generic [ref=e363]:
                  - generic [ref=e364]:
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
                  - paragraph [ref=e379]: 人数 · 按日期或班级比较
                  - group [ref=e380]:
                    - generic "查看精确数据" [ref=e381] [cursor=pointer]
                - status [ref=e382]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e383]:
                  - generic "查看本卡代码" [ref=e384] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e385] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e386]:
              - generic [ref=e387]:
                - heading "Bar Chart - Reference Band" [level=3] [ref=e388]
                - paragraph [ref=e389]: 水平参考区间与边界标识
              - generic [ref=e390]:
                - generic [ref=e391]:
                  - button "更新数据" [ref=e392] [cursor=pointer]
                  - button "重播动效" [ref=e394] [cursor=pointer]
                - generic [ref=e396]:
                  - generic [ref=e397]:
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
                  - paragraph [ref=e418]: 人数 · 按日期或班级比较 目标参考区间：40—70人。
                  - group [ref=e419]:
                    - generic "查看精确数据" [ref=e420] [cursor=pointer]
                - status [ref=e421]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e422]:
                  - generic "查看本卡代码" [ref=e423] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e424] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e425]:
              - generic [ref=e426]:
                - heading "Bar Chart - Pattern Reference Band" [level=3] [ref=e427]
                - paragraph [ref=e428]: 图案参考区间与相应轴标签
              - generic [ref=e429]:
                - generic [ref=e430]:
                  - button "更新数据" [ref=e431] [cursor=pointer]
                  - button "重播动效" [ref=e433] [cursor=pointer]
                - generic [ref=e435]:
                  - generic [ref=e436]:
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
                  - paragraph [ref=e457]: 人数 · 按日期或班级比较 目标参考区间：40—70人。
                  - group [ref=e458]:
                    - generic "查看精确数据" [ref=e459] [cursor=pointer]
                - status [ref=e460]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e461]:
                  - generic "查看本卡代码" [ref=e462] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e463] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
        - region [ref=e464]:
          - heading "交互与状态" [level=2] [ref=e465]
          - generic [ref=e466]:
            - region [ref=e467]:
              - generic [ref=e468]:
                - heading "Bar Chart - Interactive" [level=3] [ref=e469]
                - paragraph [ref=e470]: 90天活动柱图与悬浮读数
              - generic [ref=e471]:
                - generic [ref=e472]:
                  - button "更新数据" [ref=e473] [cursor=pointer]
                  - button "重播动效" [ref=e475] [cursor=pointer]
                - paragraph [ref=e478]: 滚动到此处查看示例
                - status [ref=e479]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e480]:
                  - generic "查看本卡代码" [ref=e481] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e482] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e483]:
              - generic [ref=e484]:
                - heading "Bar Chart - Loading" [level=3] [ref=e485]
                - paragraph [ref=e486]: 占位柱斜向扫光加载
              - generic [ref=e487]:
                - generic [ref=e488]:
                  - button "更新数据" [ref=e489] [cursor=pointer]
                  - button "重播动效" [ref=e491] [cursor=pointer]
                - paragraph [ref=e494]: 滚动到此处查看示例
                - status [ref=e495]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e496]:
                  - generic "查看本卡代码" [ref=e497] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e498] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
            - region [ref=e499]:
              - generic [ref=e500]:
                - heading "Bar Chart - Custom Tooltip" [level=3] [ref=e501]
                - paragraph [ref=e502]: 提示内容与数值格式定制
              - generic [ref=e503]:
                - generic [ref=e504]:
                  - button "更新数据" [ref=e505] [cursor=pointer]
                  - button "重播动效" [ref=e507] [cursor=pointer]
                - paragraph [ref=e510]: 滚动到此处查看示例
                - status [ref=e511]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e512]:
                  - generic "查看本卡代码" [ref=e513] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/bar.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e514] [cursor=pointer]:
                - /url: https://bklit.com/charts/bar-chart
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
  21 | ]) for (const width of [1197, 390]) {
  22 |   test.beforeEach(async ({ page }) => { await page.setViewportSize({ width, height: 796 }); await page.emulateMedia({ reducedMotion: "reduce" }); });
  23 |   test(`${site.name} pie legend hover has no shadow at ${width}`, async ({ page }) => {
  24 |     await page.goto(`${site.base}#chart-pie`);
  25 |     const card = page.locator('[data-chart-variant="pie-legend"]');
  26 |     await card.scrollIntoViewIfNeeded();
  27 |     await card.locator(".rain-chart-variant-legend-item").nth(1).focus();
  28 |     await page.waitForTimeout(300);
  29 |     const filters = await card.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).filter));
  30 |     expect(filters.length).toBeGreaterThan(0);
  31 |     expect(filters.every(filter => filter === "none")).toBe(true);
  32 |     await card.screenshot({ path: `${evidence}/${site.name}-pie-legend-hover-${width}.png` });
  33 |   });
  34 |   test(`${site.name} every ring has only a centered percentage and label at ${width}`, async ({ page }) => {
  35 |     await page.goto(`${site.base}#chart-ring`);
  36 |     for (const card of await page.locator('[data-chart-variant^="ring-"]').all()) {
  37 |       await card.scrollIntoViewIfNeeded();
  38 |       const reading = card.locator(".rain-chart-center-reading");
  39 |       await expect(reading).toHaveText("70.0%阅读进度");
  40 |       const svg = card.locator("svg").first();
  41 |       const box = (await reading.boundingBox())!, plot = (await svg.boundingBox())!;
  42 |       expect(Math.abs(box.x + box.width / 2 - plot.x - plot.width / 2)).toBeLessThan(2);
  43 |       expect(Math.abs(box.y + box.height / 2 - plot.y - plot.height / 2)).toBeLessThan(2);
  44 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  45 |     }
  46 |     const legend = page.locator('[data-chart-variant="ring-legend"]');
  47 |     await legend.scrollIntoViewIfNeeded();
  48 |     await legend.getByRole("button", { name: /^练习进度/ }).focus();
  49 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("66.7%练习进度");
  50 |     await expect(legend.getByRole("progressbar", { name: "练习进度进度" })).toHaveAttribute("aria-valuemax", "12");
  51 |   });
  52 |   test(`${site.name} reference range dashed boundaries stay light at ${width}`, async ({ page }) => {
  53 |     for (const family of ["bar", "area", "line", "scatter", "candlestick"]) {
  54 |       await page.goto(`${site.base}#chart-${family}`);
  55 |       const card = page.locator(`[data-chart-variant="${family}-reference-band"]`);
  56 |       await card.scrollIntoViewIfNeeded();
  57 |       const lines = card.locator(".chart-reference-area line[stroke-dasharray]");
  58 |       await expect(lines).toHaveCount(2);
> 59 |       expect(await lines.evaluateAll(nodes => nodes.every(node => Number(getComputedStyle(node).strokeOpacity) <= .25))).toBe(true);
     |                                                                                                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  60 |       await card.screenshot({ path: `${evidence}/${site.name}-${family}-reference-band-${width}.png` });
  61 |     }
  62 |   });
  63 |   test(`${site.name} every heatmap legend has room below its calendar at ${width}`, async ({ page }) => {
  64 |     await page.goto(`${site.base}#chart-heatmap`);
  65 |     for (const card of await page.locator('[data-chart-variant^="heatmap-"]').all()) {
  66 |       await card.scrollIntoViewIfNeeded();
  67 |       const legend = card.getByText(/^(少|低耗时)$/).locator("..");
  68 |       await expect(legend).toBeVisible();
  69 |       const cells = card.locator(".visx-heatmap-rects rect");
  70 |       const bottom = await cells.evaluateAll(nodes => Math.max(...nodes.map(node => node.getBoundingClientRect().bottom)));
  71 |       const box = (await legend.boundingBox())!;
  72 |       expect(box.y - bottom).toBeGreaterThanOrEqual(16);
  73 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  74 |     }
  75 |     const example = page.locator('main [data-rain-id="chart-heatmap"]').first();
  76 |     const legend = example.getByText("少", { exact: true }).locator("..");
  77 |     await expect(legend).toBeVisible();
  78 |     expect((await legend.boundingBox())!.height).toBeGreaterThan(0);
  79 |     await example.screenshot({ path: `${evidence}/${site.name}-heatmap-default-example-${width}.png` });
  80 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  81 |   });
  82 |   test(`${site.name} all sunburst titles and drilled Breadcrumbs are centered at ${width}`, async ({ page }) => {
  83 |     await page.goto(`${site.base}#chart-sunburst`);
  84 |     for (const card of await page.locator('[data-chart-variant^="sunburst-"]').all()) {
  85 |       await card.scrollIntoViewIfNeeded();
  86 |       await centeredHeading(card);
  87 |       await card.getByRole("button", { name: /基础课程/ }).click();
  88 |       await centeredTrail(card);
  89 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-drill-${width}.png` });
  90 |       await card.getByRole("link", { name: "返回学习内容" }).click();
  91 |       await centeredHeading(card);
  92 |     }
  93 |     const example = page.locator('main [data-rain-id="chart-sunburst"]').first();
  94 |     await example.scrollIntoViewIfNeeded();
  95 |     await centeredHeading(example);
  96 |   });
  97 | }
  98 | 
```