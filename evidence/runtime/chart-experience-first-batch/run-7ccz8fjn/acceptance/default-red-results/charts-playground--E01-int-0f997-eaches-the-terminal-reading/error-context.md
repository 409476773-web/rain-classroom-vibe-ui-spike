# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: charts-playground.spec.ts >> [E01] interrupted normal-motion updates preserve missing gaps and reduced motion reaches the terminal reading
- Location: tests/e2e/charts-playground.spec.ts:51:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-rain-id="chart-line"]').locator('.rain-chart-plot svg')
Expected: visible
Error: strict mode violation: locator('[data-rain-id="chart-line"]').locator('.rain-chart-plot svg') resolved to 2 elements:
    1) <svg height="320" width="1390" aria-hidden="true">…</svg> aka locator('svg').first()
    2) <svg width="100%" height="100%" aria-hidden="true" class="pointer-events-none absolute inset-0">…</svg> aka locator('svg').nth(1)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-rain-id="chart-line"]').locator('.rain-chart-plot svg')

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
        - generic [ref=e45]:
          - button "参与人数 · 人 · 缺测" [ref=e47] [cursor=pointer]
          - button "完成人数 · 人 · 缺测" [ref=e51] [cursor=pointer]
          - button "复习人数 · 人 · 缺测" [ref=e55] [cursor=pointer]
        - paragraph [ref=e58]: 缺测日期保留缺口；0是有效观测，分母为0时完成率不适用。更新数据可查看比率全缺测及全部缺测。
        - group [ref=e59]:
          - generic "查看精确数据" [ref=e60] [cursor=pointer]
      - status [ref=e61]: 示例数据 · 已更新 0 次
  - generic [ref=e62]:
    - heading "数据与使用边界" [level=2] [ref=e63]
    - paragraph [ref=e64]: Date日期与有限数值；本例按日记录人数。
    - paragraph [ref=e65]: 本例不宣称缺口插值、点击固定或图例隐藏。
    - paragraph [ref=e66]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e67] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - generic [ref=e69]:
    - region [ref=e70]:
      - heading "API 与结构" [level=2] [ref=e71]
      - table [ref=e73]:
        - caption [ref=e74]: 折线图 常用接口
        - rowgroup [ref=e75]:
          - row [ref=e76]:
            - columnheader "名称" [ref=e77]
            - columnheader "类型" [ref=e78]
            - columnheader "默认" [ref=e79]
            - columnheader "说明" [ref=e80]
        - rowgroup [ref=e81]:
          - row [ref=e82]:
            - rowheader [ref=e83]:
              - code [ref=e84]: data / value
            - cell [ref=e85]:
              - code [ref=e86]: 原生图型合同
            - cell "—" [ref=e87]
            - cell "Date日期与有限数值；本例按日记录人数。" [ref=e88]
          - row [ref=e89]:
            - rowheader [ref=e90]:
              - code [ref=e91]: children
            - cell [ref=e92]:
              - code [ref=e93]: Compound Parts
            - cell "—" [ref=e94]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e95]
          - row [ref=e96]:
            - rowheader [ref=e97]:
              - code [ref=e98]: className / style / margin
            - cell [ref=e99]:
              - code [ref=e100]: 原生尺寸接口
            - cell "—" [ref=e101]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e102]
          - row [ref=e103]:
            - rowheader [ref=e104]:
              - code [ref=e105]: enterTransition / animationDuration
            - cell [ref=e106]:
              - code [ref=e107]: 原生动效配置
            - cell "—" [ref=e108]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e109]
      - paragraph [ref=e110]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e111]:
      - heading "调用示例" [level=2] [ref=e112]
      - generic [ref=e113]:
        - generic [ref=e114]:
          - button "复制代码" [ref=e115] [cursor=pointer]
          - status
        - code [ref=e118]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-line\" data-recipe=\"category-near\"> <ChartExample id=\"line\" recipe=\"category-near\" revision={revision} reduced={reduced} state=\"missing\" size=\"standard\" miniSize=\"compact\" seriesCount={3} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e119]:
        - text: 当前源码：
        - code [ref=e120]: packages/ui/src/charts/vendor/charts/line-chart.tsx
  - group [ref=e121]:
    - generic "调用配置、完整源码与示例数据" [ref=e122] [cursor=pointer]
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
  - region "全部图表变体" [ref=e123]:
    - navigation "变体分组" [ref=e124]:
      - button "基础结构" [ref=e125] [cursor=pointer]
      - button "图形材质" [ref=e127] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e129] [cursor=pointer]
      - button "交互与状态" [ref=e131] [cursor=pointer]
    - region [ref=e133]:
      - heading "基础结构" [level=2] [ref=e134]
      - generic [ref=e135]:
        - region [ref=e136]:
          - generic [ref=e137]:
            - heading "Line Chart - Linear" [level=3] [ref=e138]
            - paragraph [ref=e139]: 数据点之间直线连接
          - generic [ref=e140]:
            - generic [ref=e141]:
              - button "更新数据" [ref=e142] [cursor=pointer]
              - button "重播动效" [ref=e144] [cursor=pointer]
            - paragraph [ref=e147]: 滚动到此处查看示例
            - status [ref=e148]: 示例数据 · 已更新 0 次
            - group [ref=e149]:
              - generic "查看本卡代码" [ref=e150] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e151] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e152]: 对应官网示例
            - generic [ref=e153]: （新标签页打开）
        - region [ref=e154]:
          - generic [ref=e155]:
            - heading "Line Chart - Multiple Lines" [level=3] [ref=e156]
            - paragraph [ref=e157]: 多系列时间趋势对比
          - generic [ref=e158]:
            - generic [ref=e159]:
              - button "更新数据" [ref=e160] [cursor=pointer]
              - button "重播动效" [ref=e162] [cursor=pointer]
            - paragraph [ref=e165]: 滚动到此处查看示例
            - status [ref=e166]: 示例数据 · 已更新 0 次
            - group [ref=e167]:
              - generic "查看本卡代码" [ref=e168] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e169] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e170]: 对应官网示例
            - generic [ref=e171]: （新标签页打开）
    - region [ref=e172]:
      - heading "图形材质" [level=2] [ref=e173]
      - generic [ref=e174]:
        - region [ref=e175]:
          - generic [ref=e176]:
            - heading "Line Chart - Series Markers" [level=3] [ref=e177]
            - paragraph [ref=e178]: 各观测点圆环标记
          - generic [ref=e179]:
            - generic [ref=e180]:
              - button "更新数据" [ref=e181] [cursor=pointer]
              - button "重播动效" [ref=e183] [cursor=pointer]
            - paragraph [ref=e186]: 滚动到此处查看示例
            - status [ref=e187]: 示例数据 · 已更新 0 次
            - group [ref=e188]:
              - generic "查看本卡代码" [ref=e189] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e190] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e191]: 对应官网示例
            - generic [ref=e192]: （新标签页打开）
        - region [ref=e193]:
          - generic [ref=e194]:
            - heading "Line Chart - Dashed Tail" [level=3] [ref=e195]
            - paragraph [ref=e196]: 从指定索引开始绘制虚线尾段
          - generic [ref=e197]:
            - generic [ref=e198]:
              - button "更新数据" [ref=e199] [cursor=pointer]
              - button "重播动效" [ref=e201] [cursor=pointer]
            - paragraph [ref=e204]: 滚动到此处查看示例
            - status [ref=e205]: 示例数据 · 已更新 0 次
            - group [ref=e206]:
              - generic "查看本卡代码" [ref=e207] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e208] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e209]: 对应官网示例
            - generic [ref=e210]: （新标签页打开）
    - region [ref=e211]:
      - heading "坐标与辅助读数" [level=2] [ref=e212]
      - generic [ref=e213]:
        - region [ref=e214]:
          - generic [ref=e215]:
            - heading "Line Chart - Markers" [level=3] [ref=e216]
            - paragraph [ref=e217]: 标注关键事件
          - generic [ref=e218]:
            - generic [ref=e219]:
              - button "更新数据" [ref=e220] [cursor=pointer]
              - button "重播动效" [ref=e222] [cursor=pointer]
            - paragraph [ref=e225]: 滚动到此处查看示例
            - status [ref=e226]: 示例数据 · 已更新 0 次
            - group [ref=e227]:
              - generic "查看本卡代码" [ref=e228] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e229] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e230]: 对应官网示例
            - generic [ref=e231]: （新标签页打开）
        - region [ref=e232]:
          - generic [ref=e233]:
            - heading "Line Chart - X Axis" [level=3] [ref=e234]
            - paragraph [ref=e235]: 显示日期横轴
          - generic [ref=e236]:
            - generic [ref=e237]:
              - button "更新数据" [ref=e238] [cursor=pointer]
              - button "重播动效" [ref=e240] [cursor=pointer]
            - paragraph [ref=e243]: 滚动到此处查看示例
            - status [ref=e244]: 示例数据 · 已更新 0 次
            - group [ref=e245]:
              - generic "查看本卡代码" [ref=e246] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e247] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e248]: 对应官网示例
            - generic [ref=e249]: （新标签页打开）
        - region [ref=e250]:
          - generic [ref=e251]:
            - heading "Line Chart - X & Y Axis" [level=3] [ref=e252]
            - paragraph [ref=e253]: 横轴日期与水平参考网格
          - generic [ref=e254]:
            - generic [ref=e255]:
              - button "更新数据" [ref=e256] [cursor=pointer]
              - button "重播动效" [ref=e258] [cursor=pointer]
            - paragraph [ref=e261]: 滚动到此处查看示例
            - status [ref=e262]: 示例数据 · 已更新 0 次
            - group [ref=e263]:
              - generic "查看本卡代码" [ref=e264] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e265] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e266]: 对应官网示例
            - generic [ref=e267]: （新标签页打开）
        - region [ref=e268]:
          - generic [ref=e269]:
            - heading "Line Chart - Left Y axis" [level=3] [ref=e270]
            - paragraph [ref=e271]: 多个系列共用左纵轴
          - generic [ref=e272]:
            - generic [ref=e273]:
              - button "更新数据" [ref=e274] [cursor=pointer]
              - button "重播动效" [ref=e276] [cursor=pointer]
            - paragraph [ref=e279]: 滚动到此处查看示例
            - status [ref=e280]: 示例数据 · 已更新 0 次
            - group [ref=e281]:
              - generic "查看本卡代码" [ref=e282] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e283] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e284]: 对应官网示例
            - generic [ref=e285]: （新标签页打开）
        - region [ref=e286]:
          - generic [ref=e287]:
            - heading "Line Chart - Left and right Y axes" [level=3] [ref=e288]
            - paragraph [ref=e289]: 左右独立纵轴与量纲
          - generic [ref=e290]:
            - generic [ref=e291]:
              - button "更新数据" [ref=e292] [cursor=pointer]
              - button "重播动效" [ref=e294] [cursor=pointer]
            - paragraph [ref=e297]: 滚动到此处查看示例
            - status [ref=e298]: 示例数据 · 已更新 0 次
            - group [ref=e299]:
              - generic "查看本卡代码" [ref=e300] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e301] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e302]: 对应官网示例
            - generic [ref=e303]: （新标签页打开）
        - region [ref=e304]:
          - generic [ref=e305]:
            - heading "Line Chart - Pattern Background" [level=3] [ref=e306]
            - paragraph [ref=e307]: 图案背景替代网格
          - generic [ref=e308]:
            - generic [ref=e309]:
              - button "更新数据" [ref=e310] [cursor=pointer]
              - button "重播动效" [ref=e312] [cursor=pointer]
            - paragraph [ref=e315]: 滚动到此处查看示例
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
            - heading "Line Chart - Dot Grid Background" [level=3] [ref=e324]
            - paragraph [ref=e325]: 带边缘渐隐的点阵背景
          - generic [ref=e326]:
            - generic [ref=e327]:
              - button "更新数据" [ref=e328] [cursor=pointer]
              - button "重播动效" [ref=e330] [cursor=pointer]
            - paragraph [ref=e333]: 滚动到此处查看示例
            - status [ref=e334]: 示例数据 · 已更新 0 次
            - group [ref=e335]:
              - generic "查看本卡代码" [ref=e336] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e337] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e338]: 对应官网示例
            - generic [ref=e339]: （新标签页打开）
        - region [ref=e340]:
          - generic [ref=e341]:
            - heading "Line Chart - Reference Band" [level=3] [ref=e342]
            - paragraph [ref=e343]: 水平参考区间与边界标识
          - generic [ref=e344]:
            - generic [ref=e345]:
              - button "更新数据" [ref=e346] [cursor=pointer]
              - button "重播动效" [ref=e348] [cursor=pointer]
            - paragraph [ref=e351]: 滚动到此处查看示例
            - status [ref=e352]: 示例数据 · 已更新 0 次
            - group [ref=e353]:
              - generic "查看本卡代码" [ref=e354] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e355] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e356]: 对应官网示例
            - generic [ref=e357]: （新标签页打开）
        - region [ref=e358]:
          - generic [ref=e359]:
            - heading "Line Chart - Pattern Reference Band" [level=3] [ref=e360]
            - paragraph [ref=e361]: 图案参考区间与相应轴标签
          - generic [ref=e362]:
            - generic [ref=e363]:
              - button "更新数据" [ref=e364] [cursor=pointer]
              - button "重播动效" [ref=e366] [cursor=pointer]
            - paragraph [ref=e369]: 滚动到此处查看示例
            - status [ref=e370]: 示例数据 · 已更新 0 次
            - group [ref=e371]:
              - generic "查看本卡代码" [ref=e372] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e373] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e374]: 对应官网示例
            - generic [ref=e375]: （新标签页打开）
    - region [ref=e376]:
      - heading "交互与状态" [level=2] [ref=e377]
      - generic [ref=e378]:
        - region [ref=e379]:
          - generic [ref=e380]:
            - heading "Line Chart - Trio with Brush" [level=3] [ref=e381]
            - paragraph [ref=e382]: 三条曲线、顶部图例、点阵与范围缩放
          - generic [ref=e383]:
            - generic [ref=e384]:
              - button "更新数据" [ref=e385] [cursor=pointer]
              - button "重播动效" [ref=e387] [cursor=pointer]
            - paragraph [ref=e390]: 滚动到此处查看示例
            - status [ref=e391]: 示例数据 · 已更新 0 次
            - group [ref=e392]:
              - generic "查看本卡代码" [ref=e393] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e394] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e395]: 对应官网示例
            - generic [ref=e396]: （新标签页打开）
        - region [ref=e397]:
          - generic [ref=e398]:
            - heading "Line Chart - Projection" [level=3] [ref=e399]
            - paragraph [ref=e400]: 目标与自动预测曲线、终端标记
          - generic [ref=e401]:
            - generic [ref=e402]:
              - button "更新数据" [ref=e403] [cursor=pointer]
              - button "重播动效" [ref=e405] [cursor=pointer]
            - paragraph [ref=e408]: 滚动到此处查看示例
            - status [ref=e409]: 示例数据 · 已更新 0 次
            - group [ref=e410]:
              - generic "查看本卡代码" [ref=e411] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e412] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e413]: 对应官网示例
            - generic [ref=e414]: （新标签页打开）
        - region [ref=e415]:
          - generic [ref=e416]:
            - heading "Line Chart - Segment Selection" [level=3] [ref=e417]
            - paragraph [ref=e418]: 按下并拖动时高亮一段范围
          - generic [ref=e419]:
            - generic [ref=e420]:
              - button "更新数据" [ref=e421] [cursor=pointer]
              - button "重播动效" [ref=e423] [cursor=pointer]
            - paragraph [ref=e426]: 滚动到此处查看示例
            - status [ref=e427]: 示例数据 · 已更新 0 次
            - group [ref=e428]:
              - generic "查看本卡代码" [ref=e429] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e430] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e431]: 对应官网示例
            - generic [ref=e432]: （新标签页打开）
        - region [ref=e433]:
          - generic [ref=e434]:
            - heading "Line Chart - Loading" [level=3] [ref=e435]
            - paragraph [ref=e436]: 网格与前景脉冲加载
          - generic [ref=e437]:
            - generic [ref=e438]:
              - button "更新数据" [ref=e439] [cursor=pointer]
              - button "重播动效" [ref=e441] [cursor=pointer]
            - paragraph [ref=e444]: 滚动到此处查看示例
            - status [ref=e445]: 示例数据 · 已更新 0 次
            - group [ref=e446]:
              - generic "查看本卡代码" [ref=e447] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e448] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e449]: 对应官网示例
            - generic [ref=e450]: （新标签页打开）
        - region [ref=e451]:
          - generic [ref=e452]:
            - heading "Line Chart - Loading (Sweep)" [level=3] [ref=e453]
            - paragraph [ref=e454]: 斜向扫光折线骨架
          - generic [ref=e455]:
            - generic [ref=e456]:
              - button "更新数据" [ref=e457] [cursor=pointer]
              - button "重播动效" [ref=e459] [cursor=pointer]
            - paragraph [ref=e462]: 滚动到此处查看示例
            - status [ref=e463]: 示例数据 · 已更新 0 次
            - group [ref=e464]:
              - generic "查看本卡代码" [ref=e465] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e466] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e467]: 对应官网示例
            - generic [ref=e468]: （新标签页打开）
  - navigation "相关图型" [ref=e469]:
    - link "面积图" [ref=e470] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e472] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e474] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e476] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e478] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e480] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e482] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e484] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e486] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e488] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e490] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e492] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e494] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e496] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e498] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e500] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e502] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e504] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e506] [cursor=pointer]:
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
  21  |     await expect(host.locator(".rain-chart-plot svg")).toBeVisible();
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
> 59  |     await expect(host.locator(".rain-chart-plot svg")).toBeVisible();
      |                                                        ^ Error: expect(locator).toBeVisible() failed
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
  71  |     expect(await host.locator("tbody td").allTextContents()).toEqual(Array(24 * 3).fill("缺测"));
  72  |     expect(await host.locator("tbody th").allTextContents()).toEqual(dates);
  73  |     await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  74  |     await expect(host.locator(".rain-chart-plot svg")).toBeVisible();
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
  114 |     await expect(slot.locator("svg")).toBeVisible();
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
  125 |     await expect(slot.locator("svg")).toBeVisible();
  126 |     for (const state of ["zero", "normal", "single"]) {
  127 |       await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption(state);
  128 |       await expect(slot.locator("svg")).toBeVisible();
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
```