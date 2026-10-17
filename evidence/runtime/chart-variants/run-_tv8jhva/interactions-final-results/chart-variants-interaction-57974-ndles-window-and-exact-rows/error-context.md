# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-variants-interactions.spec.ts >> Brush mouse and keyboard control the same visible handles, window, and exact rows
- Location: tests/e2e/chart-variants-interactions.spec.ts:18:1

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "29"

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
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
          - text: 视觉配方
          - combobox "视觉配方" [ref=e17]:
            - option "清晰线与轻面积"
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
        - generic [ref=e22]:
          - text: 尺寸配方
          - combobox "尺寸配方" [ref=e23]:
            - option "标准" [selected]
            - option "迷你 96 × 40"
        - button "更新数据" [ref=e24] [cursor=pointer]
        - button "重播动效" [ref=e26] [cursor=pointer]
      - generic [ref=e28]:
        - generic [ref=e29]:
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
        - generic [ref=e44]:
          - button "参与人数 · 人" [ref=e46] [cursor=pointer]
          - button "完成人数 · 人" [ref=e50] [cursor=pointer]
          - button "复习人数 · 人" [ref=e54] [cursor=pointer]
        - group [ref=e57]:
          - generic "查看精确数据" [ref=e58] [cursor=pointer]
      - status [ref=e59]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - generic [ref=e60]:
    - heading "数据与使用边界" [level=2] [ref=e61]
    - paragraph [ref=e62]: Date日期与有限数值；本例按日记录人数。
    - paragraph [ref=e63]: 本例不宣称缺口插值、点击固定或图例隐藏。
    - paragraph [ref=e64]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=e65]:
    - region [ref=e66]:
      - heading "API 与结构" [level=2] [ref=e67]
      - table [ref=e69]:
        - caption [ref=e70]: 折线图 常用接口
        - rowgroup [ref=e71]:
          - row [ref=e72]:
            - columnheader "名称" [ref=e73]
            - columnheader "类型" [ref=e74]
            - columnheader "默认" [ref=e75]
            - columnheader "说明" [ref=e76]
        - rowgroup [ref=e77]:
          - row [ref=e78]:
            - rowheader [ref=e79]:
              - code [ref=e80]: data / value
            - cell [ref=e81]:
              - code [ref=e82]: 原生图型合同
            - cell "—" [ref=e83]
            - cell "Date日期与有限数值；本例按日记录人数。" [ref=e84]
          - row [ref=e85]:
            - rowheader [ref=e86]:
              - code [ref=e87]: children
            - cell [ref=e88]:
              - code [ref=e89]: Compound Parts
            - cell "—" [ref=e90]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e91]
          - row [ref=e92]:
            - rowheader [ref=e93]:
              - code [ref=e94]: className / style / margin
            - cell [ref=e95]:
              - code [ref=e96]: 原生尺寸接口
            - cell "—" [ref=e97]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e98]
          - row [ref=e99]:
            - rowheader [ref=e100]:
              - code [ref=e101]: enterTransition / animationDuration
            - cell [ref=e102]:
              - code [ref=e103]: 原生动效配置
            - cell "—" [ref=e104]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e105]
      - paragraph [ref=e106]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e107]:
      - heading "调用示例" [level=2] [ref=e108]
      - generic [ref=e109]:
        - generic [ref=e110]:
          - button "复制代码" [ref=e111] [cursor=pointer]
          - status
        - code [ref=e114]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-line\" data-recipe=\"category-near\"> <ChartExample id=\"line\" recipe=\"category-near\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e115]:
        - text: 当前源码：
        - code [ref=e116]: packages/ui/src/charts/vendor/charts/line-chart.tsx
  - group [ref=e117]:
    - generic "调用配置、完整源码与示例数据" [ref=e118] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-variants/profit-loss.tsx"
    - option "chart-variants/shared.tsx"
    - option "chart-data.ts"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
  - region "全部图表变体" [ref=e119]:
    - navigation "变体分组" [ref=e120]:
      - button "基础结构" [ref=e121] [cursor=pointer]
      - button "图形材质" [ref=e123] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e125] [cursor=pointer]
      - button "交互与状态" [ref=e127] [cursor=pointer]
    - region [ref=e129]:
      - heading "基础结构" [level=2] [ref=e130]
      - generic [ref=e131]:
        - region [ref=e132]:
          - generic [ref=e133]:
            - heading "Line Chart - Linear" [level=3] [ref=e134]
            - paragraph [ref=e135]: 数据点之间直线连接
          - generic [ref=e136]:
            - generic [ref=e137]:
              - button "更新数据" [ref=e138] [cursor=pointer]
              - button "重播动效" [ref=e140] [cursor=pointer]
            - paragraph [ref=e143]: 滚动到此处查看示例
            - status [ref=e144]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e145]:
              - generic "查看本卡代码" [ref=e146] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e147] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e148]: 对应官网示例
            - generic [ref=e149]: （新标签页打开）
        - region [ref=e150]:
          - generic [ref=e151]:
            - heading "Line Chart - Multiple Lines" [level=3] [ref=e152]
            - paragraph [ref=e153]: 多系列时间趋势对比
          - generic [ref=e154]:
            - generic [ref=e155]:
              - button "更新数据" [ref=e156] [cursor=pointer]
              - button "重播动效" [ref=e158] [cursor=pointer]
            - paragraph [ref=e161]: 滚动到此处查看示例
            - status [ref=e162]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e163]:
              - generic "查看本卡代码" [ref=e164] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e165] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e166]: 对应官网示例
            - generic [ref=e167]: （新标签页打开）
    - region [ref=e168]:
      - heading "图形材质" [level=2] [ref=e169]
      - generic [ref=e170]:
        - region [ref=e171]:
          - generic [ref=e172]:
            - heading "Line Chart - Series Markers" [level=3] [ref=e173]
            - paragraph [ref=e174]: 各观测点圆环标记
          - generic [ref=e175]:
            - generic [ref=e176]:
              - button "更新数据" [ref=e177] [cursor=pointer]
              - button "重播动效" [ref=e179] [cursor=pointer]
            - paragraph [ref=e182]: 滚动到此处查看示例
            - status [ref=e183]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e184]:
              - generic "查看本卡代码" [ref=e185] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e186] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e187]: 对应官网示例
            - generic [ref=e188]: （新标签页打开）
        - region [ref=e189]:
          - generic [ref=e190]:
            - heading "Line Chart - Dashed Tail" [level=3] [ref=e191]
            - paragraph [ref=e192]: 从指定索引开始绘制虚线尾段
          - generic [ref=e193]:
            - generic [ref=e194]:
              - button "更新数据" [ref=e195] [cursor=pointer]
              - button "重播动效" [ref=e197] [cursor=pointer]
            - paragraph [ref=e200]: 滚动到此处查看示例
            - status [ref=e201]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e202]:
              - generic "查看本卡代码" [ref=e203] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e204] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e205]: 对应官网示例
            - generic [ref=e206]: （新标签页打开）
    - region [ref=e207]:
      - heading "坐标与辅助读数" [level=2] [ref=e208]
      - generic [ref=e209]:
        - region [ref=e210]:
          - generic [ref=e211]:
            - heading "Line Chart - Markers" [level=3] [ref=e212]
            - paragraph [ref=e213]: 标注关键事件
          - generic [ref=e214]:
            - generic [ref=e215]:
              - button "更新数据" [ref=e216] [cursor=pointer]
              - button "重播动效" [ref=e218] [cursor=pointer]
            - paragraph [ref=e221]: 滚动到此处查看示例
            - status [ref=e222]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e223]:
              - generic "查看本卡代码" [ref=e224] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e225] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e226]: 对应官网示例
            - generic [ref=e227]: （新标签页打开）
        - region [ref=e228]:
          - generic [ref=e229]:
            - heading "Line Chart - X Axis" [level=3] [ref=e230]
            - paragraph [ref=e231]: 显示日期横轴
          - generic [ref=e232]:
            - generic [ref=e233]:
              - button "更新数据" [ref=e234] [cursor=pointer]
              - button "重播动效" [ref=e236] [cursor=pointer]
            - paragraph [ref=e239]: 滚动到此处查看示例
            - status [ref=e240]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e241]:
              - generic "查看本卡代码" [ref=e242] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e243] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e244]: 对应官网示例
            - generic [ref=e245]: （新标签页打开）
        - region [ref=e246]:
          - generic [ref=e247]:
            - heading "Line Chart - X & Y Axis" [level=3] [ref=e248]
            - paragraph [ref=e249]: 横轴日期与水平参考网格
          - generic [ref=e250]:
            - generic [ref=e251]:
              - button "更新数据" [ref=e252] [cursor=pointer]
              - button "重播动效" [ref=e254] [cursor=pointer]
            - paragraph [ref=e257]: 滚动到此处查看示例
            - status [ref=e258]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e259]:
              - generic "查看本卡代码" [ref=e260] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e261] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e262]: 对应官网示例
            - generic [ref=e263]: （新标签页打开）
        - region [ref=e264]:
          - generic [ref=e265]:
            - heading "Line Chart - Left Y axis" [level=3] [ref=e266]
            - paragraph [ref=e267]: 多个系列共用左纵轴
          - generic [ref=e268]:
            - generic [ref=e269]:
              - button "更新数据" [ref=e270] [cursor=pointer]
              - button "重播动效" [ref=e272] [cursor=pointer]
            - paragraph [ref=e275]: 滚动到此处查看示例
            - status [ref=e276]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e277]:
              - generic "查看本卡代码" [ref=e278] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e279] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e280]: 对应官网示例
            - generic [ref=e281]: （新标签页打开）
        - region [ref=e282]:
          - generic [ref=e283]:
            - heading "Line Chart - Left and right Y axes" [level=3] [ref=e284]
            - paragraph [ref=e285]: 左右独立纵轴与量纲
          - generic [ref=e286]:
            - generic [ref=e287]:
              - button "更新数据" [ref=e288] [cursor=pointer]
              - button "重播动效" [ref=e290] [cursor=pointer]
            - paragraph [ref=e293]: 滚动到此处查看示例
            - status [ref=e294]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e295]:
              - generic "查看本卡代码" [ref=e296] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e297] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e298]: 对应官网示例
            - generic [ref=e299]: （新标签页打开）
        - region [ref=e300]:
          - generic [ref=e301]:
            - heading "Line Chart - Pattern Background" [level=3] [ref=e302]
            - paragraph [ref=e303]: 图案背景替代网格
          - generic [ref=e304]:
            - generic [ref=e305]:
              - button "更新数据" [ref=e306] [cursor=pointer]
              - button "重播动效" [ref=e308] [cursor=pointer]
            - paragraph [ref=e311]: 滚动到此处查看示例
            - status [ref=e312]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e313]:
              - generic "查看本卡代码" [ref=e314] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e315] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e316]: 对应官网示例
            - generic [ref=e317]: （新标签页打开）
        - region [ref=e318]:
          - generic [ref=e319]:
            - heading "Line Chart - Dot Grid Background" [level=3] [ref=e320]
            - paragraph [ref=e321]: 带边缘渐隐的点阵背景
          - generic [ref=e322]:
            - generic [ref=e323]:
              - button "更新数据" [ref=e324] [cursor=pointer]
              - button "重播动效" [ref=e326] [cursor=pointer]
            - paragraph [ref=e329]: 滚动到此处查看示例
            - status [ref=e330]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e331]:
              - generic "查看本卡代码" [ref=e332] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e333] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e334]: 对应官网示例
            - generic [ref=e335]: （新标签页打开）
        - region [ref=e336]:
          - generic [ref=e337]:
            - heading "Line Chart - Reference Band" [level=3] [ref=e338]
            - paragraph [ref=e339]: 水平参考区间与边界标识
          - generic [ref=e340]:
            - generic [ref=e341]:
              - button "更新数据" [ref=e342] [cursor=pointer]
              - button "重播动效" [ref=e344] [cursor=pointer]
            - paragraph [ref=e347]: 滚动到此处查看示例
            - status [ref=e348]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e349]:
              - generic "查看本卡代码" [ref=e350] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e351] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e352]: 对应官网示例
            - generic [ref=e353]: （新标签页打开）
        - region [ref=e354]:
          - generic [ref=e355]:
            - heading "Line Chart - Pattern Reference Band" [level=3] [ref=e356]
            - paragraph [ref=e357]: 图案参考区间与相应轴标签
          - generic [ref=e358]:
            - generic [ref=e359]:
              - button "更新数据" [ref=e360] [cursor=pointer]
              - button "重播动效" [ref=e362] [cursor=pointer]
            - generic [ref=e364]:
              - generic [ref=e365]:
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
              - generic [ref=e378]:
                - button "参与人数 · 人" [ref=e380] [cursor=pointer]
                - button "完成人数 · 人" [ref=e383] [cursor=pointer]
              - group [ref=e385]:
                - generic "查看精确数据" [ref=e386] [cursor=pointer]
            - status [ref=e387]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e388]:
              - generic "查看本卡代码" [ref=e389] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e390] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e391]: 对应官网示例
            - generic [ref=e392]: （新标签页打开）
    - region [ref=e393]:
      - heading "交互与状态" [level=2] [ref=e394]
      - generic [ref=e395]:
        - region [ref=e396]:
          - generic [ref=e397]:
            - heading "Line Chart - Trio with Brush" [level=3] [ref=e398]
            - paragraph [ref=e399]: 三条曲线、顶部图例、点阵与范围缩放
          - generic [ref=e400]:
            - generic [ref=e401]:
              - button "更新数据" [ref=e402] [cursor=pointer]
              - button "重播动效" [ref=e404] [cursor=pointer]
            - generic [ref=e406]:
              - generic [ref=e407]:
                - button "桌面访问 · 次" [ref=e409] [cursor=pointer]
                - button "移动访问 · 次" [ref=e412] [cursor=pointer]
                - button "平板访问 · 次" [ref=e415] [cursor=pointer]
              - generic [ref=e418]:
                - generic [ref=e419]:
                  - generic:
                    - generic: Sep 1
                    - generic: Sep 11
                    - generic: Sep 21
                    - generic: Sep 30
                - generic [ref=e433]:
                  - generic [ref=e434]:
                    - text: 开始
                    - slider "范围开始日期" [ref=e435]: "0"
                  - generic [ref=e436]:
                    - text: 结束
                    - slider "范围结束日期" [ref=e437]: "29"
                  - button "重置范围" [ref=e438] [cursor=pointer]
                  - status "当前查看范围" [ref=e439]: 9月1日—9月30日
                - group [ref=e440]:
                  - generic "查看精确数据" [ref=e441] [cursor=pointer]
                  - generic "精确数据表，可横向滚动" [ref=e442]:
                    - table [ref=e443]:
                      - caption [ref=e444]: 当前查看范围的精确数据
                      - rowgroup [ref=e445]:
                        - row [ref=e446]:
                          - columnheader "日期" [ref=e447]
                          - columnheader "桌面访问 · 次" [ref=e448]
                          - columnheader "移动访问 · 次" [ref=e449]
                          - columnheader "平板访问 · 次" [ref=e450]
                      - rowgroup [ref=e451]:
                        - row [ref=e452]:
                          - rowheader "9月1日" [ref=e453]
                          - cell "180" [ref=e454]
                          - cell "175" [ref=e455]
                          - cell "190" [ref=e456]
                        - row [ref=e457]:
                          - rowheader "9月2日" [ref=e458]
                          - cell "206" [ref=e459]
                          - cell "178" [ref=e460]
                          - cell "202" [ref=e461]
                        - row [ref=e462]:
                          - rowheader "9月3日" [ref=e463]
                          - cell "230" [ref=e464]
                          - cell "178" [ref=e465]
                          - cell "211" [ref=e466]
                        - row [ref=e467]:
                          - rowheader "9月4日" [ref=e468]
                          - cell "253" [ref=e469]
                          - cell "174" [ref=e470]
                          - cell "200" [ref=e471]
                        - row [ref=e472]:
                          - rowheader "9月5日" [ref=e473]
                          - cell "242" [ref=e474]
                          - cell "167" [ref=e475]
                          - cell "206" [ref=e476]
                        - row [ref=e477]:
                          - rowheader "9月6日" [ref=e478]
                          - cell "259" [ref=e479]
                          - cell "136" [ref=e480]
                          - cell "210" [ref=e481]
                        - row [ref=e482]:
                          - rowheader "9月7日" [ref=e483]
                          - cell "272" [ref=e484]
                          - cell "127" [ref=e485]
                          - cell "193" [ref=e486]
                        - row [ref=e487]:
                          - rowheader "9月8日" [ref=e488]
                          - cell "251" [ref=e489]
                          - cell "117" [ref=e490]
                          - cell "194" [ref=e491]
                        - row [ref=e492]:
                          - rowheader "9月9日" [ref=e493]
                          - cell "256" [ref=e494]
                          - cell "109" [ref=e495]
                          - cell "194" [ref=e496]
                        - row [ref=e497]:
                          - rowheader "9月10日" [ref=e498]
                          - cell "258" [ref=e499]
                          - cell "103" [ref=e500]
                          - cell "174" [ref=e501]
                        - row [ref=e502]:
                          - rowheader "9月11日" [ref=e503]
                          - cell "256" [ref=e504]
                          - cell "76" [ref=e505]
                          - cell "172" [ref=e506]
                        - row [ref=e507]:
                          - rowheader "9月12日" [ref=e508]
                          - cell "221" [ref=e509]
                          - cell "76" [ref=e510]
                          - cell "150" [ref=e511]
                        - row [ref=e512]:
                          - rowheader "9月13日" [ref=e513]
                          - cell "215" [ref=e514]
                          - cell "79" [ref=e515]
                          - cell "148" [ref=e516]
                        - row [ref=e517]:
                          - rowheader "9月14日" [ref=e518]
                          - cell "207" [ref=e519]
                          - cell "86" [ref=e520]
                          - cell "146" [ref=e521]
                        - row [ref=e522]:
                          - rowheader "9月15日" [ref=e523]
                          - cell "169" [ref=e524]
                          - cell "74" [ref=e525]
                          - cell "126" [ref=e526]
                        - row [ref=e527]:
                          - rowheader "9月16日" [ref=e528]
                          - cell "162" [ref=e529]
                          - cell "88" [ref=e530]
                          - cell "126" [ref=e531]
                        - row [ref=e532]:
                          - rowheader "9月17日" [ref=e533]
                          - cell "157" [ref=e534]
                          - cell "105" [ref=e535]
                          - cell "127" [ref=e536]
                        - row [ref=e537]:
                          - rowheader "9月18日" [ref=e538]
                          - cell "154" [ref=e539]
                          - cell "123" [ref=e540]
                          - cell "110" [ref=e541]
                        - row [ref=e542]:
                          - rowheader "9月19日" [ref=e543]
                          - cell "123" [ref=e544]
                          - cell "142" [ref=e545]
                          - cell "115" [ref=e546]
                        - row [ref=e547]:
                          - rowheader "9月20日" [ref=e548]
                          - cell "127" [ref=e549]
                          - cell "139" [ref=e550]
                          - cell "102" [ref=e551]
                        - row [ref=e552]:
                          - rowheader "9月21日" [ref=e553]
                          - cell "135" [ref=e554]
                          - cell "157" [ref=e555]
                          - cell "110" [ref=e556]
                        - row [ref=e557]:
                          - rowheader "9月22日" [ref=e558]
                          - cell "116" [ref=e559]
                          - cell "173" [ref=e560]
                          - cell "120" [ref=e561]
                        - row [ref=e562]:
                          - rowheader "9月23日" [ref=e563]
                          - cell "131" [ref=e564]
                          - cell "186" [ref=e565]
                          - cell "112" [ref=e566]
                        - row [ref=e567]:
                          - rowheader "9月24日" [ref=e568]
                          - cell "150" [ref=e569]
                          - cell "174" [ref=e570]
                          - cell "125" [ref=e571]
                        - row [ref=e572]:
                          - rowheader "9月25日" [ref=e573]
                          - cell "172" [ref=e574]
                          - cell "180" [ref=e575]
                          - cell "140" [ref=e576]
                        - row [ref=e577]:
                          - rowheader "9月26日" [ref=e578]
                          - cell "165" [ref=e579]
                          - cell "183" [ref=e580]
                          - cell "136" [ref=e581]
                        - row [ref=e582]:
                          - rowheader "9月27日" [ref=e583]
                          - cell "191" [ref=e584]
                          - cell "182" [ref=e585]
                          - cell "152" [ref=e586]
                        - row [ref=e587]:
                          - rowheader "9月28日" [ref=e588]
                          - cell "216" [ref=e589]
                          - cell "177" [ref=e590]
                          - cell "169" [ref=e591]
                        - row [ref=e592]:
                          - rowheader "9月29日" [ref=e593]
                          - cell "210" [ref=e594]
                          - cell "148" [ref=e595]
                          - cell "166" [ref=e596]
                        - row [ref=e597]:
                          - rowheader "9月30日" [ref=e598]
                          - cell "234" [ref=e599]
                          - cell "139" [ref=e600]
                          - cell "182" [ref=e601]
              - paragraph [ref=e626]: 拖动下方窗口缩放时间范围；键盘可用两个范围滑块，重置后显示全量。
            - status [ref=e627]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e628]:
              - generic "查看本卡代码" [ref=e629] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e630] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e631]: 对应官网示例
            - generic [ref=e632]: （新标签页打开）
        - region [ref=e633]:
          - generic [ref=e634]:
            - heading "Line Chart - Projection" [level=3] [ref=e635]
            - paragraph [ref=e636]: 目标与自动预测曲线、终端标记
          - generic [ref=e637]:
            - generic [ref=e638]:
              - button "更新数据" [ref=e639] [cursor=pointer]
              - button "重播动效" [ref=e641] [cursor=pointer]
            - generic [ref=e643]:
              - generic [ref=e644]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 10
                  - generic: Sep 20
                  - generic: Sep 30
              - generic [ref=e665]:
                - button "已观测参与人数 · 人" [ref=e667] [cursor=pointer]
                - button "目标预测 · 人" [ref=e670] [cursor=pointer]
                - button "自动预测 · 人" [ref=e673] [cursor=pointer]
              - paragraph [ref=e675]: 末次已观测值为空心锚点；两条虚线分别表示6日目标与末段斜率外推，远端圆点是预测端点。预测值不是实际观测。
              - group [ref=e676]:
                - generic "查看精确数据" [ref=e677] [cursor=pointer]
            - status [ref=e678]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e679]:
              - generic "查看本卡代码" [ref=e680] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e681] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e682]: 对应官网示例
            - generic [ref=e683]: （新标签页打开）
        - region [ref=e684]:
          - generic [ref=e685]:
            - heading "Line Chart - Segment Selection" [level=3] [ref=e686]
            - paragraph [ref=e687]: 按下并拖动时高亮一段范围
          - generic [ref=e688]:
            - generic [ref=e689]:
              - button "更新数据" [ref=e690] [cursor=pointer]
              - button "重播动效" [ref=e692] [cursor=pointer]
            - generic [ref=e694]:
              - paragraph [ref=e706]: 按下并拖动显示临时范围，松开后恢复全量；精确数值见数据表。
              - group [ref=e707]:
                - generic "查看精确数据" [ref=e708] [cursor=pointer]
            - status [ref=e709]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e710]:
              - generic "查看本卡代码" [ref=e711] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e712] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e713]: 对应官网示例
            - generic [ref=e714]: （新标签页打开）
        - region [ref=e715]:
          - generic [ref=e716]:
            - heading "Line Chart - Loading" [level=3] [ref=e717]
            - paragraph [ref=e718]: 网格与前景脉冲加载
          - generic [ref=e719]:
            - generic [ref=e720]:
              - button "更新数据" [ref=e721] [cursor=pointer]
              - button "重播动效" [ref=e723] [cursor=pointer]
            - paragraph [ref=e726]: 滚动到此处查看示例
            - status [ref=e727]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e728]:
              - generic "查看本卡代码" [ref=e729] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e730] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e731]: 对应官网示例
            - generic [ref=e732]: （新标签页打开）
        - region [ref=e733]:
          - generic [ref=e734]:
            - heading "Line Chart - Loading (Sweep)" [level=3] [ref=e735]
            - paragraph [ref=e736]: 斜向扫光折线骨架
          - generic [ref=e737]:
            - generic [ref=e738]:
              - button "更新数据" [ref=e739] [cursor=pointer]
              - button "重播动效" [ref=e741] [cursor=pointer]
            - paragraph [ref=e744]: 滚动到此处查看示例
            - status [ref=e745]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e746]:
              - generic "查看本卡代码" [ref=e747] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e748] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e749]: 对应官网示例
            - generic [ref=e750]: （新标签页打开）
  - navigation "相关图型" [ref=e751]:
    - link "面积图" [ref=e752] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e754] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e756] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e758] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e760] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e762] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e764] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e766] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e768] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e770] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e772] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e774] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e776] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e778] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e780] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e782] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e784] [cursor=pointer]:
      - /url: "#chart-live-line"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { mkdir } from "node:fs/promises";
  3  | const evidence = process.env.RAIN_CHART_VARIANTS_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/interactions";
  4  | 
  5  | test("six curves repaint actual geometry and the downloaded call stays synchronized", async ({page}) => {
  6  |   await page.emulateMedia({reducedMotion:"reduce"});
  7  |   await page.goto("/#chart-area");
  8  |   const card=page.locator('[data-chart-variant="area-interactive"]');await card.scrollIntoViewIfNeeded();
  9  |   const curve=card.getByRole("combobox",{name:"图表曲线"});
  10 |   await expect(curve.locator("option")).toHaveCount(6);
  11 |   const paths=card.locator('path[stroke="var(--chart-1)"]');await expect(paths.first()).toBeVisible();
  12 |   const original=await paths.first().getAttribute("d");
  13 |   await curve.selectOption("step");await expect.poll(()=>paths.first().getAttribute("d")).not.toBe(original);
  14 |   await card.getByText("查看本卡代码",{exact:true}).click();await expect(card.locator("pre")).toContainText('curveName="step"');
  15 |   await page.locator("h1").scrollIntoViewIfNeeded();await card.scrollIntoViewIfNeeded();await expect(curve).toHaveValue("step");
  16 | });
  17 | 
  18 | test("Brush mouse and keyboard control the same visible handles, window, and exact rows",async({page})=>{
  19 |   await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-line");
  20 |   const card=page.locator('[data-chart-variant="line-trio-brush"]');await card.scrollIntoViewIfNeeded();
  21 |   const left=card.locator(".visx-brush-handle-left");await expect(left).toBeVisible();
  22 |   const before=(await left.boundingBox())!.x;
  23 |   const start=card.getByRole("slider",{name:"范围开始日期"});await start.focus();await page.keyboard.press("ArrowRight");
  24 |   await expect(start).toHaveValue("1");await expect.poll(async()=> (await left.boundingBox())!.x).toBeGreaterThan(before+5);
  25 |   await card.getByText("查看精确数据",{exact:true}).click();await expect(card.locator("tbody tr")).toHaveCount(29);
  26 |   await card.getByRole("button",{name:"重置范围"}).click();await expect(start).toHaveValue("0");await expect.poll(async()=> (await left.boundingBox())!.x).toBeCloseTo(before,0);
  27 |   const right=card.locator(".visx-brush-handle-right");const box=(await right.boundingBox())!;
  28 |   await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x-160,box.y+box.height/2,{steps:8});await page.mouse.up();
> 29 |   await expect.poll(()=>card.getByRole("slider",{name:"范围结束日期"}).inputValue()).not.toBe("29");
     |                                                                                    ^ Error: expect(received).not.toBe(expected) // Object.is equality
  30 |   await card.getByRole("button",{name:"重置范围"}).click();await expect(card.locator("tbody tr")).toHaveCount(30);
  31 |   await mkdir(evidence,{recursive:true});await card.screenshot({path:`${evidence}/line-brush-pointer-keyboard-reset.png`});
  32 | });
  33 | 
  34 | test("temporary drag selection disappears after release while data stays complete",async({page})=>{
  35 |   await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-area");
  36 |   const card=page.locator('[data-chart-variant="area-segment-selection"]');await card.scrollIntoViewIfNeeded();
  37 |   const plot=card.locator('[data-rain-id="ui-chart-area"] svg').first();const box=(await plot.boundingBox())!;
  38 |   const band=card.locator('rect[fill="var(--chart-segment-background)"]');
  39 |   const originalRows=await card.locator("tbody tr").count();
  40 |   await page.mouse.move(box.x+120,box.y+100);await page.mouse.down();await page.mouse.move(box.x+360,box.y+100,{steps:8});await expect(band).toBeVisible();
  41 |   await page.mouse.up();await expect(band).toHaveCount(0);
  42 |   await card.getByText("查看精确数据",{exact:true}).click();await expect(card.locator("tbody tr")).toHaveCount(originalRows);
  43 | });
  44 | 
  45 | test("live pause keeps the actual path offscreen and in background, manual step updates the window",async({page})=>{
  46 |   await page.clock.install();await page.goto("/#chart-live-line");
  47 |   const card=page.locator('[data-chart-variant="live-line-default"]');await card.scrollIntoViewIfNeeded();
  48 |   await expect(card.locator('[data-live-count]')).toBeVisible();await page.clock.runFor(1000);
  49 |   await card.getByRole("button",{name:"暂停实时",exact:true}).click();
  50 |   const path=card.locator('[data-rain-id="ui-chart-live-line"] path.visx-linepath').first();const before=await path.getAttribute("d");
  51 |   const count=await card.locator('[data-live-count]').getAttribute("data-live-count");
  52 |   await card.getByRole("button",{name:"恢复实时",exact:true}).blur();await page.locator("h1").scrollIntoViewIfNeeded();
  53 |   await page.clock.fastForward(120_000);await card.scrollIntoViewIfNeeded();await page.clock.runFor(50);
  54 |   await expect(card.getByRole("button",{name:"恢复实时",exact:true})).toBeVisible();await expect(path).toHaveAttribute("d",before!);await expect(card.locator('[data-live-count]')).toHaveAttribute("data-live-count",count!);
  55 |   await card.getByRole("button",{name:"追加一次",exact:true}).click();await page.clock.runFor(50);
  56 |   await expect.poll(()=>path.getAttribute("d")).not.toBe(before);
  57 |   await card.getByRole("button",{name:"恢复实时",exact:true}).click();await page.clock.runFor(650);
  58 |   await expect.poll(()=>card.locator('[data-live-count]').getAttribute("data-live-count")).not.toBe(count);
  59 |   await page.emulateMedia({reducedMotion:"reduce"});await expect(card.locator('[data-live-paused]')).toHaveAttribute("data-live-paused","true");
  60 | });
  61 | 
  62 | test("horizontal bars have a visible numeric axis and native 3D segments align without extra stack gaps",async({page})=>{
  63 |   await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-bar");
  64 |   const horizontal=page.locator('[data-chart-variant="bar-horizontal"]');await horizontal.scrollIntoViewIfNeeded();await expect(horizontal.locator('g[aria-label="人数刻度"] text').first()).toBeVisible();
  65 |   const stack=page.locator('[data-chart-variant="bar-3d-stacked"]');await stack.scrollIntoViewIfNeeded();
  66 |   const secondSeries=stack.locator('g[class^="bar-series-"]').nth(1).locator("rect");await expect(secondSeries).toHaveCount(6);
  67 |   const values=await secondSeries.evaluateAll(nodes=>nodes.map(node=>Number(node.getAttribute("y"))));
  68 |   expect(values.length).toBe(6);expect(values.every(Number.isFinite)).toBe(true);
  69 | });
  70 | 
```