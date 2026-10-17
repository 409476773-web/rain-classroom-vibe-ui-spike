# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-visual-rebalance.spec.ts >> native TrendLegend keeps its borderless transparent reading style
- Location: tests/e2e/chart-visual-rebalance.spec.ts:25:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "0px"
Received: "1px"
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
            - generic [ref=e336]:
              - generic [ref=e337]:
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
              - generic [ref=e351]:
                - button "参与人数 · 人" [ref=e353] [cursor=pointer]
                - button "完成人数 · 人" [ref=e356] [cursor=pointer]
              - group [ref=e358]:
                - generic "查看精确数据" [ref=e359] [cursor=pointer]
            - generic [ref=e360]:
              - button "更新数据" [ref=e361] [cursor=pointer]
              - button "重播动效" [ref=e363] [cursor=pointer]
              - status [ref=e365]: 示例数据 · 已更新 0 次
            - group [ref=e366]:
              - generic "查看本卡代码" [ref=e367] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e368] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e369]: 对应官网示例
            - generic [ref=e370]: （新标签页打开）
    - region [ref=e371]:
      - heading "交互与状态" [level=2] [ref=e372]
      - generic [ref=e373]:
        - region [ref=e374]:
          - generic [ref=e375]:
            - heading "Line Chart - Trio with Brush" [level=3] [ref=e376]
            - paragraph [ref=e377]: 三条曲线、顶部图例、点阵与范围缩放
          - generic [ref=e378]:
            - generic [ref=e379]:
              - generic [ref=e380]:
                - button "桌面访问 · 次" [ref=e382] [cursor=pointer]
                - button "移动访问 · 次" [ref=e385] [cursor=pointer]
                - button "平板访问 · 次" [ref=e388] [cursor=pointer]
              - generic [ref=e391]:
                - generic [ref=e392]:
                  - generic:
                    - generic: Sep 1
                    - generic: Sep 11
                    - generic: Sep 21
                    - generic: Sep 30
                - generic [ref=e407]:
                  - generic [ref=e408]:
                    - text: 开始
                    - slider "范围开始日期" [ref=e409]: "0"
                  - generic [ref=e410]:
                    - text: 结束
                    - slider "范围结束日期" [ref=e411]: "29"
                  - button "重置范围" [ref=e412] [cursor=pointer]
                  - status "当前查看范围" [ref=e413]: 9月1日—9月30日
                - group [ref=e414]:
                  - generic "查看精确数据" [ref=e415] [cursor=pointer]
              - paragraph [ref=e440]: 拖动下方窗口缩放时间范围；键盘可用两个范围滑块，重置后显示全量。
            - generic [ref=e441]:
              - button "更新数据" [ref=e442] [cursor=pointer]
              - button "重播动效" [ref=e444] [cursor=pointer]
              - status [ref=e446]: 示例数据 · 已更新 0 次
            - group [ref=e447]:
              - generic "查看本卡代码" [ref=e448] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e449] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e450]: 对应官网示例
            - generic [ref=e451]: （新标签页打开）
        - region [ref=e452]:
          - generic [ref=e453]:
            - heading "Line Chart - Projection" [level=3] [ref=e454]
            - paragraph [ref=e455]: 目标与自动预测曲线、终端标记
          - generic [ref=e456]:
            - generic [ref=e457]:
              - generic [ref=e458]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 10
                  - generic: Sep 20
                  - generic: Sep 30
              - generic [ref=e479]:
                - button "已观测参与人数 · 人" [ref=e481] [cursor=pointer]
                - button "目标预测 · 人" [ref=e484] [cursor=pointer]
                - button "自动预测 · 人" [ref=e487] [cursor=pointer]
              - paragraph [ref=e489]: 末次已观测值为空心锚点；两条虚线分别表示6日目标与末段斜率外推，远端圆点是预测端点。预测值不是实际观测。
              - group [ref=e490]:
                - generic "查看精确数据" [ref=e491] [cursor=pointer]
            - generic [ref=e492]:
              - button "更新数据" [ref=e493] [cursor=pointer]
              - button "重播动效" [ref=e495] [cursor=pointer]
              - status [ref=e497]: 示例数据 · 已更新 0 次
            - group [ref=e498]:
              - generic "查看本卡代码" [ref=e499] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e500] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e501]: 对应官网示例
            - generic [ref=e502]: （新标签页打开）
        - region [ref=e503]:
          - generic [ref=e504]:
            - heading "Line Chart - Segment Selection" [level=3] [ref=e505]
            - paragraph [ref=e506]: 按下并拖动时高亮一段范围
          - generic [ref=e507]:
            - generic [ref=e508]:
              - paragraph [ref=e520]: 按下并拖动显示临时范围，松开后恢复全量；精确数值见数据表。
              - group [ref=e521]:
                - generic "查看精确数据" [ref=e522] [cursor=pointer]
            - generic [ref=e523]:
              - button "更新数据" [ref=e524] [cursor=pointer]
              - button "重播动效" [ref=e526] [cursor=pointer]
              - status [ref=e528]: 示例数据 · 已更新 0 次
            - group [ref=e529]:
              - generic "查看本卡代码" [ref=e530] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e531] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e532]: 对应官网示例
            - generic [ref=e533]: （新标签页打开）
        - region [ref=e534]:
          - generic [ref=e535]:
            - heading "Line Chart - Loading" [level=3] [ref=e536]
            - paragraph [ref=e537]: 网格与前景脉冲加载
          - generic [ref=e538]:
            - paragraph [ref=e540]: 滚动到此处查看示例
            - generic [ref=e541]:
              - button "更新数据" [ref=e542] [cursor=pointer]
              - button "重播动效" [ref=e544] [cursor=pointer]
              - status [ref=e546]: 示例数据 · 已更新 0 次
            - group [ref=e547]:
              - generic "查看本卡代码" [ref=e548] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e549] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e550]: 对应官网示例
            - generic [ref=e551]: （新标签页打开）
        - region [ref=e552]:
          - generic [ref=e553]:
            - heading "Line Chart - Loading (Sweep)" [level=3] [ref=e554]
            - paragraph [ref=e555]: 斜向扫光折线骨架
          - generic [ref=e556]:
            - paragraph [ref=e558]: 滚动到此处查看示例
            - generic [ref=e559]:
              - button "更新数据" [ref=e560] [cursor=pointer]
              - button "重播动效" [ref=e562] [cursor=pointer]
              - status [ref=e564]: 示例数据 · 已更新 0 次
            - group [ref=e565]:
              - generic "查看本卡代码" [ref=e566] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e567] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e568]: 对应官网示例
            - generic [ref=e569]: （新标签页打开）
  - generic [ref=e570]:
    - heading "数据与使用边界" [level=2] [ref=e571]
    - paragraph [ref=e572]: Date日期与有限数值；本例按日记录人数。
    - paragraph [ref=e573]: 本例不宣称缺口插值、点击固定或图例隐藏。
    - paragraph [ref=e574]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e575] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - group [ref=e577]:
    - generic "接口与调用示例" [ref=e578] [cursor=pointer]
  - navigation "相关图型" [ref=e579]:
    - link "面积图" [ref=e580] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e582] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e584] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e586] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e588] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e590] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e592] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e594] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e596] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e598] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e600] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e602] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e604] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e606] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e608] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e610] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e612] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e614] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e616] [cursor=pointer]:
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
  27  |   const card = page.locator('[data-chart-variant="line-trio-brush"]');
  28  |   await card.scrollIntoViewIfNeeded();
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
> 40  |   expect(style.borderWidth).toBe("0px");
      |                             ^ Error: expect(received).toBe(expected) // Object.is equality
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