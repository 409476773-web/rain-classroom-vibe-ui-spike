# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-x-axis-resize.spec.ts >> line no-preference: earliest resize frames retain axis identity, hover and data reads
- Location: tests/e2e/chart-x-axis-resize.spec.ts:92:3

# Error details

```
Error: [{"reason":"resize-event","elapsed":0,"width":999},{"reason":"raf","elapsed":0.20000000298023224,"width":999},{"reason":"resize-observer","elapsed":0.7000000029802322,"width":999},{"reason":"raf","elapsed":22.600000001490116,"width":999},{"reason":"raf","elapsed":44.70000000298023,"width":390},{"reason":"raf","elapsed":51.899999998509884,"width":390},{"reason":"raf","elapsed":58,"width":390},{"reason":"raf","elapsed":63.399999998509884,"width":390},{"reason":"raf","elapsed":68.29999999701977,"width":390},{"reason":"raf","elapsed":77.20000000298023,"width":390}]

expect(received).toBe(expected) // Object.is equality

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
      - status [ref=e60]: 示例数据 · 已更新 1 次
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
            - paragraph [ref=e247]: 滚动到此处查看示例
            - generic [ref=e248]:
              - button "更新数据" [ref=e249] [cursor=pointer]
              - button "重播动效" [ref=e251] [cursor=pointer]
              - status [ref=e253]: 示例数据 · 已更新 0 次
            - group [ref=e254]:
              - generic "查看本卡代码" [ref=e255] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e256] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e257]: 对应官网示例
            - generic [ref=e258]: （新标签页打开）
        - region [ref=e259]:
          - generic [ref=e260]:
            - heading "Line Chart - Left and right Y axes" [level=3] [ref=e261]
            - paragraph [ref=e262]: 左右独立纵轴与量纲
          - generic [ref=e263]:
            - paragraph [ref=e265]: 滚动到此处查看示例
            - generic [ref=e266]:
              - button "更新数据" [ref=e267] [cursor=pointer]
              - button "重播动效" [ref=e269] [cursor=pointer]
              - status [ref=e271]: 示例数据 · 已更新 0 次
            - group [ref=e272]:
              - generic "查看本卡代码" [ref=e273] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e274] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e275]: 对应官网示例
            - generic [ref=e276]: （新标签页打开）
        - region [ref=e277]:
          - generic [ref=e278]:
            - heading "Line Chart - Pattern Background" [level=3] [ref=e279]
            - paragraph [ref=e280]: 图案背景替代网格
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
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e292] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e293]: 对应官网示例
            - generic [ref=e294]: （新标签页打开）
        - region [ref=e295]:
          - generic [ref=e296]:
            - heading "Line Chart - Dot Grid Background" [level=3] [ref=e297]
            - paragraph [ref=e298]: 带边缘渐隐的点阵背景
          - generic [ref=e299]:
            - paragraph [ref=e301]: 滚动到此处查看示例
            - generic [ref=e302]:
              - button "更新数据" [ref=e303] [cursor=pointer]
              - button "重播动效" [ref=e305] [cursor=pointer]
              - status [ref=e307]: 示例数据 · 已更新 0 次
            - group [ref=e308]:
              - generic "查看本卡代码" [ref=e309] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e310] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e311]: 对应官网示例
            - generic [ref=e312]: （新标签页打开）
        - region [ref=e313]:
          - generic [ref=e314]:
            - heading "Line Chart - Reference Band" [level=3] [ref=e315]
            - paragraph [ref=e316]: 水平参考区间与边界标识
          - generic [ref=e317]:
            - paragraph [ref=e319]: 滚动到此处查看示例
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
            - heading "Line Chart - Pattern Reference Band" [level=3] [ref=e333]
            - paragraph [ref=e334]: 图案参考区间与相应轴标签
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
      - heading "交互与状态" [level=2] [ref=e350]
      - generic [ref=e351]:
        - region [ref=e352]:
          - generic [ref=e353]:
            - heading "Line Chart - Trio with Brush" [level=3] [ref=e354]
            - paragraph [ref=e355]: 三条曲线、顶部图例、点阵与范围缩放
          - generic [ref=e356]:
            - paragraph [ref=e358]: 滚动到此处查看示例
            - generic [ref=e359]:
              - button "更新数据" [ref=e360] [cursor=pointer]
              - button "重播动效" [ref=e362] [cursor=pointer]
              - status [ref=e364]: 示例数据 · 已更新 0 次
            - group [ref=e365]:
              - generic "查看本卡代码" [ref=e366] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e367] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e368]: 对应官网示例
            - generic [ref=e369]: （新标签页打开）
        - region [ref=e370]:
          - generic [ref=e371]:
            - heading "Line Chart - Projection" [level=3] [ref=e372]
            - paragraph [ref=e373]: 目标与自动预测曲线、终端标记
          - generic [ref=e374]:
            - paragraph [ref=e376]: 滚动到此处查看示例
            - generic [ref=e377]:
              - button "更新数据" [ref=e378] [cursor=pointer]
              - button "重播动效" [ref=e380] [cursor=pointer]
              - status [ref=e382]: 示例数据 · 已更新 0 次
            - group [ref=e383]:
              - generic "查看本卡代码" [ref=e384] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e385] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e386]: 对应官网示例
            - generic [ref=e387]: （新标签页打开）
        - region [ref=e388]:
          - generic [ref=e389]:
            - heading "Line Chart - Segment Selection" [level=3] [ref=e390]
            - paragraph [ref=e391]: 按下并拖动时高亮一段范围
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
            - heading "Line Chart - Loading" [level=3] [ref=e408]
            - paragraph [ref=e409]: 网格与前景脉冲加载
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
            - heading "Line Chart - Loading (Sweep)" [level=3] [ref=e426]
            - paragraph [ref=e427]: 斜向扫光折线骨架
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
  - generic [ref=e442]:
    - heading "数据与使用边界" [level=2] [ref=e443]
    - paragraph [ref=e444]: Date日期与有限数值；本例按日记录人数。
    - paragraph [ref=e445]: 本例不宣称缺口插值、点击固定或图例隐藏。
    - paragraph [ref=e446]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e447] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - group [ref=e449]:
    - generic "接口与调用示例" [ref=e450] [cursor=pointer]
  - navigation "相关图型" [ref=e451]:
    - link "面积图" [ref=e452] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e454] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e456] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e458] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e460] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e462] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e464] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e466] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e468] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e470] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e472] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e474] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e476] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e478] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e480] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e482] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e484] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e486] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e488] [cursor=pointer]:
      - /url: "#chart-network"
```

# Test source

```ts
  38  |   await page.evaluate(({ selector, targetWidth, frames }) => {
  39  |     const host = document.querySelector(selector)!;
  40  |     const store = window as unknown as { __axisIds?: WeakMap<Element, number>; __axisCounter?: number; __axisDone?: Promise<FrameAudit> };
  41  |     store.__axisIds ??= new WeakMap();
  42  |     store.__axisCounter ??= 0;
  43  |     const ticks = () => [...host.querySelectorAll("span.whitespace-nowrap.text-chart-label.text-xs")].filter(node => {
  44  |       const parent = node.parentElement!;
  45  |       return parent.style.bottom === "12px" && parent.style.width === "0px" && parent.style.display === "flex";
  46  |     });
  47  |     const id = (node: Element) => {
  48  |       if (!store.__axisIds!.has(node)) store.__axisIds!.set(node, ++store.__axisCounter!);
  49  |       return store.__axisIds!.get(node)!;
  50  |     };
  51  |     const beforeIds = ticks().map(id);
  52  |     const samples: Sample[] = [];
  53  |     let count = 0, started: number | null = targetWidth == null ? performance.now() : null;
  54  |     let firstEvent: string | null = null;
  55  |     let finish: (value: FrameAudit) => void;
  56  |     store.__axisDone = new Promise(resolve => { finish = resolve; });
  57  |     const sample = (reason: string) => {
  58  |       if (targetWidth !== null && innerWidth !== targetWidth) return;
  59  |       started ??= performance.now();
  60  |       firstEvent ??= reason;
  61  |       samples.push({ reason, elapsed: performance.now() - started, viewport: innerWidth, documentWidth: document.documentElement.scrollWidth,
  62  |         overflowTicks: [...document.querySelectorAll('span.whitespace-nowrap.text-chart-label.text-xs')].filter(node => node.getBoundingClientRect().right > innerWidth + 1).map(node => ({ label: node.textContent, host: node.closest('[data-rain-id]')?.getAttribute('data-rain-id'), example: node.closest('[data-chart-example],[data-category-example]')?.outerHTML.slice(0,200), right: node.getBoundingClientRect().right, inlineLeft: node.parentElement!.style.left, parentWidth: node.parentElement!.parentElement!.getBoundingClientRect().width, transition: getComputedStyle(node.parentElement!).transition })),
  63  |         ticks: ticks().map(node => {
  64  |           const box = node.getBoundingClientRect(), parent = node.parentElement!, style = getComputedStyle(parent), text = getComputedStyle(node);
  65  |           return { id: id(node), label: node.textContent ?? "", left: box.left, right: box.right, center: (box.left + box.right) / 2, position: style.left, transition: style.transition, color: text.color, fontSize: text.fontSize, inlineLeft: parent.style.left, overlayWidth: parent.parentElement!.getBoundingClientRect().width, containingWidth: parent.parentElement!.parentElement!.getBoundingClientRect().width };
  66  |         }),
  67  |       });
  68  |     };
  69  |     const resize = () => sample("resize-event");
  70  |     addEventListener("resize", resize);
  71  |     const observer = new ResizeObserver(() => sample("resize-observer"));
  72  |     const plot = host.querySelector(".rain-chart-plot,.rain-category-plot") ?? host;
  73  |     observer.observe(plot);
  74  |     const next = () => {
  75  |       if (targetWidth === null || innerWidth === targetWidth) { sample("raf"); count++; }
  76  |       if (count < frames) requestAnimationFrame(next);
  77  |       else {
  78  |         observer.disconnect(); removeEventListener("resize", resize);
  79  |         finish!({ samples, beforeIds, afterIds: ticks().map(id), firstEvent });
  80  |       }
  81  |     };
  82  |     requestAnimationFrame(next);
  83  |   }, { selector, targetWidth, frames });
  84  | }
  85  | 
  86  | async function finishFrames(page: Page): Promise<FrameAudit> {
  87  |   return page.evaluate(async () => (window as unknown as { __axisDone: Promise<FrameAudit> }).__axisDone);
  88  | }
  89  | 
  90  | const cases = ["line", "area", "composed", "scatter", "profit-loss", "category"];
  91  | for (const family of cases) for (const reducedMotion of ["no-preference", "reduce"] as const) {
  92  |   test(`${family} ${reducedMotion}: earliest resize frames retain axis identity, hover and data reads`, async ({ page }) => {
  93  |     await mkdir(evidence, { recursive: true });
  94  |     const intercepted: string[] = [], errors: string[] = [], audits: FrameAudit[] = [];
  95  |     page.on("pageerror", error => errors.push(String(error)));
  96  |     await attachBefore(page, intercepted);
  97  |     await page.emulateMedia({ reducedMotion });
  98  |     await page.goto(`/?axis-resize-audit=${runName}#chart-${family}`);
  99  |     const category = family === "category";
  100 |     if (category) await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("semester");
  101 |     const selector = category ? '[data-category-example="semester"]' : `[data-rain-id="chart-${family}"]`;
  102 |     const host = page.locator(selector);
  103 |     const plot = host.locator(".rain-chart-plot,.rain-category-plot").first();
  104 |     await expect(plot.locator("svg").first()).toBeVisible();
  105 |     await expect(host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first()).toBeVisible();
  106 |     const controls = page.locator(category ? ".rain-category-controls" : "[data-chart-default-controls]");
  107 |     const beforeVisual = await host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first().evaluate(node => ({ color: getComputedStyle(node).color, fontSize: getComputedStyle(node).fontSize }));
  108 |     try {
  109 |       for (const width of [390, 1440]) {
  110 |         await beginFrames(page, selector, width);
  111 |         await page.setViewportSize({ width, height: 1000 });
  112 |         audits.push(await finishFrames(page));
  113 |       }
  114 |       // The data update remains in progress when the responsive shrink begins.
  115 |       await beginFrames(page, selector, 390);
  116 |       await controls.getByRole("button", { name: "更新数据", exact: true }).evaluate(button => (button as HTMLButtonElement).click());
  117 |       await page.setViewportSize({ width: 390, height: 1000 });
  118 |       audits.push(await finishFrames(page));
  119 |       const svg = plot.locator("svg").first(); await svg.scrollIntoViewIfNeeded();
  120 |       const box = (await svg.boundingBox())!;
  121 |       // Initial reveal deliberately disables input; retry the genuine pointer
  122 |       // after it becomes interactive, without changing any resize-frame sample.
  123 |       await expect(async () => {
  124 |         await page.mouse.move(0, 0);
  125 |         await page.mouse.move(box.x + 80, box.y + box.height / 2);
  126 |         await expect(host.locator(category ? ".rain-category-tooltip" : ".rain-chart-tooltip")).toBeVisible({ timeout: 100 });
  127 |       }).toPass({ timeout: 5000, intervals: [50] });
  128 |       await page.mouse.move(0, 0);
  129 |       await host.screenshot({ path: `${evidence}/${family}-${reducedMotion}-390.png` });
  130 |     } finally {
  131 |       await writeFile(`${evidence}/${family}-${reducedMotion}.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, beforeVisual, audits }, null, 2));
  132 |     }
  133 |     expect(errors).toEqual([]);
  134 |     if (baseline) expect(intercepted.length).toBeGreaterThan(0);
  135 |     for (const audit of audits) {
  136 |       expect(audit.samples.filter(sample => sample.reason === "raf")).toHaveLength(8);
  137 |       expect(audit.afterIds).toEqual(audit.beforeIds);
> 138 |       expect(audit.samples.every(sample => sample.documentWidth <= sample.viewport + 1), JSON.stringify(audit.samples.map(sample => ({ reason: sample.reason, elapsed: sample.elapsed, width: sample.documentWidth })))).toBe(true);
      |                                                                                                                                                                                                                          ^ Error: [{"reason":"resize-event","elapsed":0,"width":999},{"reason":"raf","elapsed":0.20000000298023224,"width":999},{"reason":"resize-observer","elapsed":0.7000000029802322,"width":999},{"reason":"raf","elapsed":22.600000001490116,"width":999},{"reason":"raf","elapsed":44.70000000298023,"width":390},{"reason":"raf","elapsed":51.899999998509884,"width":390},{"reason":"raf","elapsed":58,"width":390},{"reason":"raf","elapsed":63.399999998509884,"width":390},{"reason":"raf","elapsed":68.29999999701977,"width":390},{"reason":"raf","elapsed":77.20000000298023,"width":390}]
  139 |       expect(audit.samples.flatMap(sample => sample.ticks).every(tick => tick.color === beforeVisual.color && tick.fontSize === beforeVisual.fontSize)).toBe(true);
  140 |     }
  141 |   });
  142 | }
  143 | 
  144 | test("native consumer: same-size data positions animate normally and mounted media changes become immediate", async ({ page }) => {
  145 |   await mkdir(evidence, { recursive: true });
  146 |   const intercepted: string[] = [], errors: string[] = [];
  147 |   const audits: FrameAudit[] = [];
  148 |   page.on("pageerror", error => errors.push(String(error)));
  149 |   await attachBefore(page, intercepted);
  150 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  151 |   await page.goto(`/?axis-native-consumer=${runName}`);
  152 |   const module = `/@fs${resolve(`${run}/x-axis-consumer.tsx`)}`;
  153 |   await page.evaluate(async module => { await import(/* @vite-ignore */ module); }, module);
  154 |   const host = page.locator("[data-test-axis-host]");
  155 |   await expect(host.getByText("Sep 2", { exact: true })).toBeVisible();
  156 |   const position = () => host.getByText("Sep 2", { exact: true }).evaluate(node => getComputedStyle(node.parentElement!).left);
  157 |   try {
  158 |     await beginFrames(page, "[data-test-axis-host]", null, 40);
  159 |     await page.getByRole("button", { name: "Change time domain" }).click();
  160 |     const normal = await finishFrames(page); audits.push(normal);
  161 |     const normalPositions = normal.samples.filter(sample => sample.reason === "raf").map(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position));
  162 |     expect(normalPositions.some(left => left > 170.5 && left < 299.5)).toBe(true);
  163 |     expect(Number.parseFloat(await position())).toBeCloseTo(170, 3);
  164 |     await page.emulateMedia({ reducedMotion: "reduce" });
  165 |     await beginFrames(page, "[data-test-axis-host]", null, 8);
  166 |     await page.getByRole("button", { name: "Change time domain" }).click();
  167 |     const reduced = await finishFrames(page); audits.push(reduced);
  168 |     // The caller keeps animationDuration=1100; the mounted XAxis must react itself.
  169 |     expect(reduced.samples.filter(sample => sample.reason === "raf").slice(-4).every(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position) === 300)).toBe(true);
  170 |     expect(reduced.samples.flatMap(sample => sample.ticks).every(tick => !tick.transition.includes("500ms"))).toBe(true);
  171 |     await page.emulateMedia({ reducedMotion: "no-preference" });
  172 |     await beginFrames(page, "[data-test-axis-host]", null, 40);
  173 |     await page.getByRole("button", { name: "Change time domain" }).click();
  174 |     const restored = await finishFrames(page); audits.push(restored);
  175 |     expect(restored.samples.some(sample => sample.ticks.some(tick => tick.label === "Sep 2" && Number.parseFloat(tick.position) > 170.5 && Number.parseFloat(tick.position) < 299.5))).toBe(true);
  176 |   } finally {
  177 |     await writeFile(`${evidence}/native-consumer.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, audits }, null, 2));
  178 |   }
  179 |   expect(errors).toEqual([]);
  180 | });
  181 | 
```