# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-visual-rebalance.spec.ts >> native TrendLegend keeps its borderless transparent reading style
- Location: tests/e2e/chart-visual-rebalance.spec.ts:25:1

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.scrollIntoViewIfNeeded: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('[data-chart-variant="line-default"]')

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "折线图" [level=1] [ref=e8]
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
            - option "蓝紫近邻" [selected]
            - option "多色类别"
            - option "协调实色"
            - option "蓝灰单色"
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
            - group [ref=e94]:
              - generic "查看精确数据" [ref=e95] [cursor=pointer]
            - generic [ref=e96]:
              - button "更新数据" [ref=e97] [cursor=pointer]
              - button "重播动效" [ref=e99] [cursor=pointer]
              - status [ref=e101]: 示例数据 · 已更新 0 次
            - group [ref=e102]:
              - generic "查看本卡代码" [ref=e103] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e104] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e105]: 对应官网示例
            - generic [ref=e106]: （新标签页打开）
        - region [ref=e107]:
          - generic [ref=e108]:
            - heading "Line Chart - Multiple Lines" [level=3] [ref=e109]
            - paragraph [ref=e110]: 多系列时间趋势对比
          - generic [ref=e111]:
            - generic [ref=e112]:
              - generic [ref=e127]:
                - button "参与人数 · 人" [ref=e129] [cursor=pointer]
                - button "完成人数 · 人" [ref=e132] [cursor=pointer]
              - group [ref=e134]:
                - generic "查看精确数据" [ref=e135] [cursor=pointer]
            - generic [ref=e136]:
              - button "更新数据" [ref=e137] [cursor=pointer]
              - button "重播动效" [ref=e139] [cursor=pointer]
              - status [ref=e141]: 示例数据 · 已更新 0 次
            - group [ref=e142]:
              - generic "查看本卡代码" [ref=e143] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e144] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e145]: 对应官网示例
            - generic [ref=e146]: （新标签页打开）
    - region [ref=e147]:
      - heading "图形材质" [level=2] [ref=e148]
      - generic [ref=e149]:
        - region [ref=e150]:
          - generic [ref=e151]:
            - heading "Line Chart - Series Markers" [level=3] [ref=e152]
            - paragraph [ref=e153]: 各观测点圆环标记
          - generic [ref=e154]:
            - paragraph [ref=e156]: 滚动到此处查看示例
            - generic [ref=e157]:
              - button "更新数据" [ref=e158] [cursor=pointer]
              - button "重播动效" [ref=e160] [cursor=pointer]
              - status [ref=e162]: 示例数据 · 已更新 0 次
            - group [ref=e163]:
              - generic "查看本卡代码" [ref=e164] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e165] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e166]: 对应官网示例
            - generic [ref=e167]: （新标签页打开）
        - region [ref=e168]:
          - generic [ref=e169]:
            - heading "Line Chart - Dashed Tail" [level=3] [ref=e170]
            - paragraph [ref=e171]: 从指定索引开始绘制虚线尾段
          - generic [ref=e172]:
            - paragraph [ref=e174]: 滚动到此处查看示例
            - generic [ref=e175]:
              - button "更新数据" [ref=e176] [cursor=pointer]
              - button "重播动效" [ref=e178] [cursor=pointer]
              - status [ref=e180]: 示例数据 · 已更新 0 次
            - group [ref=e181]:
              - generic "查看本卡代码" [ref=e182] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e183] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e184]: 对应官网示例
            - generic [ref=e185]: （新标签页打开）
    - region [ref=e186]:
      - heading "坐标与辅助读数" [level=2] [ref=e187]
      - generic [ref=e188]:
        - region [ref=e189]:
          - generic [ref=e190]:
            - heading "Line Chart - Markers" [level=3] [ref=e191]
            - paragraph [ref=e192]: 标注关键事件
          - generic [ref=e193]:
            - paragraph [ref=e195]: 滚动到此处查看示例
            - generic [ref=e196]:
              - button "更新数据" [ref=e197] [cursor=pointer]
              - button "重播动效" [ref=e199] [cursor=pointer]
              - status [ref=e201]: 示例数据 · 已更新 0 次
            - group [ref=e202]:
              - generic "查看本卡代码" [ref=e203] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e204] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e205]: 对应官网示例
            - generic [ref=e206]: （新标签页打开）
        - region [ref=e207]:
          - generic [ref=e208]:
            - heading "Line Chart - X Axis" [level=3] [ref=e209]
            - paragraph [ref=e210]: 显示日期横轴
          - generic [ref=e211]:
            - paragraph [ref=e213]: 滚动到此处查看示例
            - generic [ref=e214]:
              - button "更新数据" [ref=e215] [cursor=pointer]
              - button "重播动效" [ref=e217] [cursor=pointer]
              - status [ref=e219]: 示例数据 · 已更新 0 次
            - group [ref=e220]:
              - generic "查看本卡代码" [ref=e221] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e222] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e223]: 对应官网示例
            - generic [ref=e224]: （新标签页打开）
        - region [ref=e225]:
          - generic [ref=e226]:
            - heading "Line Chart - X & Y Axis" [level=3] [ref=e227]
            - paragraph [ref=e228]: 横轴日期与水平参考网格
          - generic [ref=e229]:
            - paragraph [ref=e231]: 滚动到此处查看示例
            - generic [ref=e232]:
              - button "更新数据" [ref=e233] [cursor=pointer]
              - button "重播动效" [ref=e235] [cursor=pointer]
              - status [ref=e237]: 示例数据 · 已更新 0 次
            - group [ref=e238]:
              - generic "查看本卡代码" [ref=e239] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e240] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e241]: 对应官网示例
            - generic [ref=e242]: （新标签页打开）
        - region [ref=e243]:
          - generic [ref=e244]:
            - heading "Line Chart - Left Y axis" [level=3] [ref=e245]
            - paragraph [ref=e246]: 多个系列共用左纵轴
          - generic [ref=e247]:
            - paragraph [ref=e249]: 滚动到此处查看示例
            - generic [ref=e250]:
              - button "更新数据" [ref=e251] [cursor=pointer]
              - button "重播动效" [ref=e253] [cursor=pointer]
              - status [ref=e255]: 示例数据 · 已更新 0 次
            - group [ref=e256]:
              - generic "查看本卡代码" [ref=e257] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e258] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e259]: 对应官网示例
            - generic [ref=e260]: （新标签页打开）
        - region [ref=e261]:
          - generic [ref=e262]:
            - heading "Line Chart - Left and right Y axes" [level=3] [ref=e263]
            - paragraph [ref=e264]: 左右独立纵轴与量纲
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
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e276] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e277]: 对应官网示例
            - generic [ref=e278]: （新标签页打开）
        - region [ref=e279]:
          - generic [ref=e280]:
            - heading "Line Chart - Pattern Background" [level=3] [ref=e281]
            - paragraph [ref=e282]: 图案背景替代网格
          - generic [ref=e283]:
            - paragraph [ref=e285]: 滚动到此处查看示例
            - generic [ref=e286]:
              - button "更新数据" [ref=e287] [cursor=pointer]
              - button "重播动效" [ref=e289] [cursor=pointer]
              - status [ref=e291]: 示例数据 · 已更新 0 次
            - group [ref=e292]:
              - generic "查看本卡代码" [ref=e293] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e294] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e295]: 对应官网示例
            - generic [ref=e296]: （新标签页打开）
        - region [ref=e297]:
          - generic [ref=e298]:
            - heading "Line Chart - Dot Grid Background" [level=3] [ref=e299]
            - paragraph [ref=e300]: 带边缘渐隐的点阵背景
          - generic [ref=e301]:
            - paragraph [ref=e303]: 滚动到此处查看示例
            - generic [ref=e304]:
              - button "更新数据" [ref=e305] [cursor=pointer]
              - button "重播动效" [ref=e307] [cursor=pointer]
              - status [ref=e309]: 示例数据 · 已更新 0 次
            - group [ref=e310]:
              - generic "查看本卡代码" [ref=e311] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e312] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e313]: 对应官网示例
            - generic [ref=e314]: （新标签页打开）
        - region [ref=e315]:
          - generic [ref=e316]:
            - heading "Line Chart - Reference Band" [level=3] [ref=e317]
            - paragraph [ref=e318]: 水平参考区间与边界标识
          - generic [ref=e319]:
            - paragraph [ref=e321]: 滚动到此处查看示例
            - generic [ref=e322]:
              - button "更新数据" [ref=e323] [cursor=pointer]
              - button "重播动效" [ref=e325] [cursor=pointer]
              - status [ref=e327]: 示例数据 · 已更新 0 次
            - group [ref=e328]:
              - generic "查看本卡代码" [ref=e329] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e330] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e331]: 对应官网示例
            - generic [ref=e332]: （新标签页打开）
        - region [ref=e333]:
          - generic [ref=e334]:
            - heading "Line Chart - Pattern Reference Band" [level=3] [ref=e335]
            - paragraph [ref=e336]: 图案参考区间与相应轴标签
          - generic [ref=e337]:
            - paragraph [ref=e339]: 滚动到此处查看示例
            - generic [ref=e340]:
              - button "更新数据" [ref=e341] [cursor=pointer]
              - button "重播动效" [ref=e343] [cursor=pointer]
              - status [ref=e345]: 示例数据 · 已更新 0 次
            - group [ref=e346]:
              - generic "查看本卡代码" [ref=e347] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e348] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e349]: 对应官网示例
            - generic [ref=e350]: （新标签页打开）
    - region [ref=e351]:
      - heading "交互与状态" [level=2] [ref=e352]
      - generic [ref=e353]:
        - region [ref=e354]:
          - generic [ref=e355]:
            - heading "Line Chart - Trio with Brush" [level=3] [ref=e356]
            - paragraph [ref=e357]: 三条曲线、顶部图例、点阵与范围缩放
          - generic [ref=e358]:
            - paragraph [ref=e360]: 滚动到此处查看示例
            - generic [ref=e361]:
              - button "更新数据" [ref=e362] [cursor=pointer]
              - button "重播动效" [ref=e364] [cursor=pointer]
              - status [ref=e366]: 示例数据 · 已更新 0 次
            - group [ref=e367]:
              - generic "查看本卡代码" [ref=e368] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e369] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e370]: 对应官网示例
            - generic [ref=e371]: （新标签页打开）
        - region [ref=e372]:
          - generic [ref=e373]:
            - heading "Line Chart - Projection" [level=3] [ref=e374]
            - paragraph [ref=e375]: 目标与自动预测曲线、终端标记
          - generic [ref=e376]:
            - paragraph [ref=e378]: 滚动到此处查看示例
            - generic [ref=e379]:
              - button "更新数据" [ref=e380] [cursor=pointer]
              - button "重播动效" [ref=e382] [cursor=pointer]
              - status [ref=e384]: 示例数据 · 已更新 0 次
            - group [ref=e385]:
              - generic "查看本卡代码" [ref=e386] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e387] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e388]: 对应官网示例
            - generic [ref=e389]: （新标签页打开）
        - region [ref=e390]:
          - generic [ref=e391]:
            - heading "Line Chart - Segment Selection" [level=3] [ref=e392]
            - paragraph [ref=e393]: 按下并拖动时高亮一段范围
          - generic [ref=e394]:
            - paragraph [ref=e396]: 滚动到此处查看示例
            - generic [ref=e397]:
              - button "更新数据" [ref=e398] [cursor=pointer]
              - button "重播动效" [ref=e400] [cursor=pointer]
              - status [ref=e402]: 示例数据 · 已更新 0 次
            - group [ref=e403]:
              - generic "查看本卡代码" [ref=e404] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e405] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e406]: 对应官网示例
            - generic [ref=e407]: （新标签页打开）
        - region [ref=e408]:
          - generic [ref=e409]:
            - heading "Line Chart - Loading" [level=3] [ref=e410]
            - paragraph [ref=e411]: 网格与前景脉冲加载
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
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e423] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e424]: 对应官网示例
            - generic [ref=e425]: （新标签页打开）
        - region [ref=e426]:
          - generic [ref=e427]:
            - heading "Line Chart - Loading (Sweep)" [level=3] [ref=e428]
            - paragraph [ref=e429]: 斜向扫光折线骨架
          - generic [ref=e430]:
            - paragraph [ref=e432]: 滚动到此处查看示例
            - generic [ref=e433]:
              - button "更新数据" [ref=e434] [cursor=pointer]
              - button "重播动效" [ref=e436] [cursor=pointer]
              - status [ref=e438]: 示例数据 · 已更新 0 次
            - group [ref=e439]:
              - generic "查看本卡代码" [ref=e440] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e441] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e442]: 对应官网示例
            - generic [ref=e443]: （新标签页打开）
  - generic [ref=e444]:
    - heading "数据与使用边界" [level=2] [ref=e445]
    - paragraph [ref=e446]: Date日期与有限数值；本例按日记录人数。
    - paragraph [ref=e447]: 本例不宣称缺口插值、点击固定或图例隐藏。
    - paragraph [ref=e448]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e449] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - group [ref=e451]:
    - generic "接口与调用示例" [ref=e452] [cursor=pointer]
  - navigation "相关图型" [ref=e453]:
    - link "面积图" [ref=e454] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e456] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e458] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e460] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e462] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e464] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e466] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e468] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e470] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e472] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e474] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e476] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e478] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e480] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e482] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e484] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e486] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e488] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e490] [cursor=pointer]:
      - /url: "#chart-network"
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | 
  3   | test("Sunburst text entry retains the Rain text Button styles inside its chart host", async ({ page }) => {
  4   |   await page.goto("/#chart-sunburst");
  5   |   const entry = page.locator('[data-rain-id="chart-sunburst"]').getByRole("button", { name: "查看基础课程", exact: true });
  6   |   await expect(entry).toBeVisible();
  7   |   const styles = await entry.evaluate(button => {
  8   |     const control = button.cloneNode(true) as HTMLElement;
  9   |     control.setAttribute("aria-hidden", "true");
  10  |     control.style.position = "fixed";
  11  |     control.style.left = "-10000px";
  12  |     document.body.append(control);
  13  |     const reading = (node: Element) => {
  14  |       const css = getComputedStyle(node);
  15  |       return { borderWidth: css.borderTopWidth, background: css.backgroundColor, padding: [css.paddingTop, css.paddingRight, css.paddingBottom, css.paddingLeft], fontSize: css.fontSize, fontFamily: css.fontFamily, fontWeight: css.fontWeight, lineHeight: css.lineHeight };
  16  |     };
  17  |     const actual = reading(button);
  18  |     const reference = reading(control);
  19  |     control.remove();
  20  |     return { actual, reference };
  21  |   });
  22  |   expect(styles.actual).toEqual(styles.reference);
  23  | });
  24  | 
  25  | test("native TrendLegend keeps its borderless transparent reading style", async ({ page }) => {
  26  |   await page.goto("/#chart-line");
  27  |   const card = page.locator('[data-chart-variant="line-default"]');
> 28  |   await card.scrollIntoViewIfNeeded();
      |              ^ Error: locator.scrollIntoViewIfNeeded: Test timeout of 90000ms exceeded.
  29  |   const legendEntry = card.locator(".rain-chart-legend-button").first();
  30  |   await expect(legendEntry).toBeVisible();
  31  |   const style = await legendEntry.evaluate(node => {
  32  |     const css = getComputedStyle(node);
  33  |     return {
  34  |       borderWidth: css.borderTopWidth,
  35  |       background: css.backgroundColor,
  36  |       padding: [css.paddingTop, css.paddingRight, css.paddingBottom, css.paddingLeft],
  37  |       expectedPadding: ["--rain-space-6", "--rain-space-8", "--rain-space-6", "--rain-space-8"].map(name => css.getPropertyValue(name).trim()),
  38  |     };
  39  |   });
  40  |   expect(style.borderWidth).toBe("0px");
  41  |   expect(style.background).toBe("rgba(0, 0, 0, 0)");
  42  |   expect(style.padding).toEqual(style.expectedPadding);
  43  | });
  44  | 
  45  | for (const width of [1440, 390]) {
  46  |   test(`Sunburst parent navigation remains operable with Enter and Space at ${width}px`, async ({ page }) => {
  47  |     await page.setViewportSize({ width, height: 1000 });
  48  |     await page.goto("/#chart-sunburst");
  49  |     const host = page.locator('[data-rain-id="chart-sunburst"]');
  50  |     const course = host.getByRole("button", { name: "查看基础课程", exact: true });
  51  |     await course.focus();
  52  |     await course.press("Enter");
  53  |     const back = host.getByRole("link", { name: "返回学习内容", exact: true });
  54  |     await expect(back).toBeFocused();
  55  |     await expect(host.getByRole("group", { name: /当前层级/ })).toContainText("视频");
  56  |     await back.press("Enter");
  57  |     await expect(course).toBeFocused();
  58  |     await course.press("Space");
  59  |     await expect(back).toBeFocused();
  60  |     await back.press("Enter");
  61  |     await expect(course).toBeFocused();
  62  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  63  |   });
  64  | 
  65  |   test(`chart operations and the progressive interface reference remain keyboard operable at ${width}px`, async ({ page }) => {
  66  |     await page.setViewportSize({ width, height: 1000 });
  67  |     await page.goto("/#chart-line");
  68  |     const controls = page.locator("[data-chart-default-controls]");
  69  |     const palette = controls.getByRole("combobox", { name: "视觉配方", exact: true });
  70  |     await palette.focus();
  71  |     await palette.selectOption("monochrome-blue");
  72  |     const update = controls.getByRole("button", { name: "更新数据", exact: true });
  73  |     for (let count = 0; count < 8 && !await update.evaluate(node => node === document.activeElement); count++) await page.keyboard.press("Tab");
  74  |     await expect(update).toBeFocused();
  75  |     await update.press("Enter");
  76  |     await expect(page.getByRole("status").filter({ hasText: "示例数据 · 已更新 1 次" }).first()).toBeVisible();
  77  |     await page.keyboard.press("Tab");
  78  |     const replay = controls.getByRole("button", { name: "重播动效", exact: true });
  79  |     await expect(replay).toBeFocused();
  80  |     await replay.press("Space");
  81  |     await expect(replay).toBeFocused();
  82  |     const reference = page.locator(".component-doc__reference");
  83  |     const interfaceSummary = page.locator("summary").filter({ hasText: /^接口与调用示例$/ });
  84  |     await expect(reference).toBeHidden();
  85  |     await interfaceSummary.focus();
  86  |     await interfaceSummary.press("Enter");
  87  |     await expect(reference.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
  88  |     await expect(reference.getByRole("button", { name: "复制代码", exact: true })).toBeVisible();
  89  |     await interfaceSummary.press("Enter");
  90  |     await expect(reference).toBeHidden();
  91  |     await expect(interfaceSummary).toBeFocused();
  92  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  93  |   });
  94  | }
  95  | 
  96  | test("variant updates, replay and downloadable source retain the current state", async ({ page }) => {
  97  |   await page.goto("/#chart-bar");
  98  |   const card = page.locator('[data-chart-variant="bar-default"]');
  99  |   await card.scrollIntoViewIfNeeded();
  100 |   await expect(card.locator('[data-ready="true"]')).toBeVisible();
  101 |   const update = card.getByRole("button", { name: "更新数据", exact: true });
  102 |   await update.focus();
  103 |   await update.press("Enter");
  104 |   await expect(card.getByRole("status").filter({ hasText: "已更新 1 次" })).toBeVisible();
  105 |   await page.keyboard.press("Tab");
  106 |   const replay = card.getByRole("button", { name: "重播动效", exact: true });
  107 |   await expect(replay).toBeFocused();
  108 |   await replay.press("Space");
  109 |   const source = card.locator("details.rain-chart-source");
  110 |   await source.locator("summary").focus();
  111 |   await source.locator("summary").press("Enter");
  112 |   await expect(source.locator("pre")).toContainText("revision={1} replay={1}");
  113 |   const downloadLink = source.getByRole("link", { name: "下载 chart-variants/bar.tsx", exact: true });
  114 |   await expect(downloadLink).toBeVisible();
  115 |   const downloadEvent = page.waitForEvent("download");
  116 |   await downloadLink.focus();
  117 |   await downloadLink.press("Enter");
  118 |   const download = await downloadEvent;
  119 |   expect(download.suggestedFilename()).toMatch(/bar\.tsx$/);
  120 |   expect(await download.failure()).toBeNull();
  121 |   expect(decodeURIComponent((await downloadLink.getAttribute("href"))!)).toContain("export function BarVariant");
  122 | });
  123 | 
```