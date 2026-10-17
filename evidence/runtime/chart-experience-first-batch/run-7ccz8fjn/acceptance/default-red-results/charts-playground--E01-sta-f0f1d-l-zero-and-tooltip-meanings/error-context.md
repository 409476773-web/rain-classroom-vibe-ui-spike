# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: charts-playground.spec.ts >> [E01] standard missing readings keep dates, real zero and tooltip meanings
- Location: tests/e2e/charts-playground.spec.ts:14:1

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
        - generic [ref=e44]:
          - button "参与人数 · 人 · 缺测" [ref=e46] [cursor=pointer]
          - button "完成人数 · 人 · 缺测" [ref=e50] [cursor=pointer]
          - button "复习人数 · 人 · 缺测" [ref=e54] [cursor=pointer]
        - paragraph [ref=e57]: 缺测日期保留缺口；0是有效观测，分母为0时完成率不适用。更新数据可查看比率全缺测及全部缺测。
        - group [ref=e58]:
          - generic "查看精确数据" [ref=e59] [cursor=pointer]
      - status [ref=e60]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - generic [ref=e61]:
    - heading "数据与使用边界" [level=2] [ref=e62]
    - paragraph [ref=e63]: Date日期与有限数值；本例按日记录人数。
    - paragraph [ref=e64]: 本例不宣称缺口插值、点击固定或图例隐藏。
    - paragraph [ref=e65]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e66] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - generic [ref=e68]:
    - region [ref=e69]:
      - heading "API 与结构" [level=2] [ref=e70]
      - table [ref=e72]:
        - caption [ref=e73]: 折线图 常用接口
        - rowgroup [ref=e74]:
          - row [ref=e75]:
            - columnheader "名称" [ref=e76]
            - columnheader "类型" [ref=e77]
            - columnheader "默认" [ref=e78]
            - columnheader "说明" [ref=e79]
        - rowgroup [ref=e80]:
          - row [ref=e81]:
            - rowheader [ref=e82]:
              - code [ref=e83]: data / value
            - cell [ref=e84]:
              - code [ref=e85]: 原生图型合同
            - cell "—" [ref=e86]
            - cell "Date日期与有限数值；本例按日记录人数。" [ref=e87]
          - row [ref=e88]:
            - rowheader [ref=e89]:
              - code [ref=e90]: children
            - cell [ref=e91]:
              - code [ref=e92]: Compound Parts
            - cell "—" [ref=e93]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e94]
          - row [ref=e95]:
            - rowheader [ref=e96]:
              - code [ref=e97]: className / style / margin
            - cell [ref=e98]:
              - code [ref=e99]: 原生尺寸接口
            - cell "—" [ref=e100]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e101]
          - row [ref=e102]:
            - rowheader [ref=e103]:
              - code [ref=e104]: enterTransition / animationDuration
            - cell [ref=e105]:
              - code [ref=e106]: 原生动效配置
            - cell "—" [ref=e107]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e108]
      - paragraph [ref=e109]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e110]:
      - heading "调用示例" [level=2] [ref=e111]
      - generic [ref=e112]:
        - generic [ref=e113]:
          - button "复制代码" [ref=e114] [cursor=pointer]
          - status
        - code [ref=e117]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-line\" data-recipe=\"category-near\"> <ChartExample id=\"line\" recipe=\"category-near\" revision={revision} reduced={reduced} state=\"missing\" size=\"standard\" miniSize=\"compact\" seriesCount={3} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e118]:
        - text: 当前源码：
        - code [ref=e119]: packages/ui/src/charts/vendor/charts/line-chart.tsx
  - group [ref=e120]:
    - generic "调用配置、完整源码与示例数据" [ref=e121] [cursor=pointer]
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
  - region "全部图表变体" [ref=e122]:
    - navigation "变体分组" [ref=e123]:
      - button "基础结构" [ref=e124] [cursor=pointer]
      - button "图形材质" [ref=e126] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e128] [cursor=pointer]
      - button "交互与状态" [ref=e130] [cursor=pointer]
    - region [ref=e132]:
      - heading "基础结构" [level=2] [ref=e133]
      - generic [ref=e134]:
        - region [ref=e135]:
          - generic [ref=e136]:
            - heading "Line Chart - Linear" [level=3] [ref=e137]
            - paragraph [ref=e138]: 数据点之间直线连接
          - generic [ref=e139]:
            - generic [ref=e140]:
              - button "更新数据" [ref=e141] [cursor=pointer]
              - button "重播动效" [ref=e143] [cursor=pointer]
            - paragraph [ref=e146]: 滚动到此处查看示例
            - status [ref=e147]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e148]:
              - generic "查看本卡代码" [ref=e149] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e150] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e151]: 对应官网示例
            - generic [ref=e152]: （新标签页打开）
        - region [ref=e153]:
          - generic [ref=e154]:
            - heading "Line Chart - Multiple Lines" [level=3] [ref=e155]
            - paragraph [ref=e156]: 多系列时间趋势对比
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
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e168] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e169]: 对应官网示例
            - generic [ref=e170]: （新标签页打开）
    - region [ref=e171]:
      - heading "图形材质" [level=2] [ref=e172]
      - generic [ref=e173]:
        - region [ref=e174]:
          - generic [ref=e175]:
            - heading "Line Chart - Series Markers" [level=3] [ref=e176]
            - paragraph [ref=e177]: 各观测点圆环标记
          - generic [ref=e178]:
            - generic [ref=e179]:
              - button "更新数据" [ref=e180] [cursor=pointer]
              - button "重播动效" [ref=e182] [cursor=pointer]
            - paragraph [ref=e185]: 滚动到此处查看示例
            - status [ref=e186]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e187]:
              - generic "查看本卡代码" [ref=e188] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e189] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e190]: 对应官网示例
            - generic [ref=e191]: （新标签页打开）
        - region [ref=e192]:
          - generic [ref=e193]:
            - heading "Line Chart - Dashed Tail" [level=3] [ref=e194]
            - paragraph [ref=e195]: 从指定索引开始绘制虚线尾段
          - generic [ref=e196]:
            - generic [ref=e197]:
              - button "更新数据" [ref=e198] [cursor=pointer]
              - button "重播动效" [ref=e200] [cursor=pointer]
            - paragraph [ref=e203]: 滚动到此处查看示例
            - status [ref=e204]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e205]:
              - generic "查看本卡代码" [ref=e206] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e207] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e208]: 对应官网示例
            - generic [ref=e209]: （新标签页打开）
    - region [ref=e210]:
      - heading "坐标与辅助读数" [level=2] [ref=e211]
      - generic [ref=e212]:
        - region [ref=e213]:
          - generic [ref=e214]:
            - heading "Line Chart - Markers" [level=3] [ref=e215]
            - paragraph [ref=e216]: 标注关键事件
          - generic [ref=e217]:
            - generic [ref=e218]:
              - button "更新数据" [ref=e219] [cursor=pointer]
              - button "重播动效" [ref=e221] [cursor=pointer]
            - paragraph [ref=e224]: 滚动到此处查看示例
            - status [ref=e225]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e226]:
              - generic "查看本卡代码" [ref=e227] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e228] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e229]: 对应官网示例
            - generic [ref=e230]: （新标签页打开）
        - region [ref=e231]:
          - generic [ref=e232]:
            - heading "Line Chart - X Axis" [level=3] [ref=e233]
            - paragraph [ref=e234]: 显示日期横轴
          - generic [ref=e235]:
            - generic [ref=e236]:
              - button "更新数据" [ref=e237] [cursor=pointer]
              - button "重播动效" [ref=e239] [cursor=pointer]
            - paragraph [ref=e242]: 滚动到此处查看示例
            - status [ref=e243]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e244]:
              - generic "查看本卡代码" [ref=e245] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e246] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e247]: 对应官网示例
            - generic [ref=e248]: （新标签页打开）
        - region [ref=e249]:
          - generic [ref=e250]:
            - heading "Line Chart - X & Y Axis" [level=3] [ref=e251]
            - paragraph [ref=e252]: 横轴日期与水平参考网格
          - generic [ref=e253]:
            - generic [ref=e254]:
              - button "更新数据" [ref=e255] [cursor=pointer]
              - button "重播动效" [ref=e257] [cursor=pointer]
            - paragraph [ref=e260]: 滚动到此处查看示例
            - status [ref=e261]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e262]:
              - generic "查看本卡代码" [ref=e263] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e264] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e265]: 对应官网示例
            - generic [ref=e266]: （新标签页打开）
        - region [ref=e267]:
          - generic [ref=e268]:
            - heading "Line Chart - Left Y axis" [level=3] [ref=e269]
            - paragraph [ref=e270]: 多个系列共用左纵轴
          - generic [ref=e271]:
            - generic [ref=e272]:
              - button "更新数据" [ref=e273] [cursor=pointer]
              - button "重播动效" [ref=e275] [cursor=pointer]
            - paragraph [ref=e278]: 滚动到此处查看示例
            - status [ref=e279]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e280]:
              - generic "查看本卡代码" [ref=e281] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e282] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e283]: 对应官网示例
            - generic [ref=e284]: （新标签页打开）
        - region [ref=e285]:
          - generic [ref=e286]:
            - heading "Line Chart - Left and right Y axes" [level=3] [ref=e287]
            - paragraph [ref=e288]: 左右独立纵轴与量纲
          - generic [ref=e289]:
            - generic [ref=e290]:
              - button "更新数据" [ref=e291] [cursor=pointer]
              - button "重播动效" [ref=e293] [cursor=pointer]
            - paragraph [ref=e296]: 滚动到此处查看示例
            - status [ref=e297]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e298]:
              - generic "查看本卡代码" [ref=e299] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e300] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e301]: 对应官网示例
            - generic [ref=e302]: （新标签页打开）
        - region [ref=e303]:
          - generic [ref=e304]:
            - heading "Line Chart - Pattern Background" [level=3] [ref=e305]
            - paragraph [ref=e306]: 图案背景替代网格
          - generic [ref=e307]:
            - generic [ref=e308]:
              - button "更新数据" [ref=e309] [cursor=pointer]
              - button "重播动效" [ref=e311] [cursor=pointer]
            - paragraph [ref=e314]: 滚动到此处查看示例
            - status [ref=e315]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e316]:
              - generic "查看本卡代码" [ref=e317] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e318] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e319]: 对应官网示例
            - generic [ref=e320]: （新标签页打开）
        - region [ref=e321]:
          - generic [ref=e322]:
            - heading "Line Chart - Dot Grid Background" [level=3] [ref=e323]
            - paragraph [ref=e324]: 带边缘渐隐的点阵背景
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
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e336] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e337]: 对应官网示例
            - generic [ref=e338]: （新标签页打开）
        - region [ref=e339]:
          - generic [ref=e340]:
            - heading "Line Chart - Reference Band" [level=3] [ref=e341]
            - paragraph [ref=e342]: 水平参考区间与边界标识
          - generic [ref=e343]:
            - generic [ref=e344]:
              - button "更新数据" [ref=e345] [cursor=pointer]
              - button "重播动效" [ref=e347] [cursor=pointer]
            - paragraph [ref=e350]: 滚动到此处查看示例
            - status [ref=e351]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e352]:
              - generic "查看本卡代码" [ref=e353] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e354] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e355]: 对应官网示例
            - generic [ref=e356]: （新标签页打开）
        - region [ref=e357]:
          - generic [ref=e358]:
            - heading "Line Chart - Pattern Reference Band" [level=3] [ref=e359]
            - paragraph [ref=e360]: 图案参考区间与相应轴标签
          - generic [ref=e361]:
            - generic [ref=e362]:
              - button "更新数据" [ref=e363] [cursor=pointer]
              - button "重播动效" [ref=e365] [cursor=pointer]
            - paragraph [ref=e368]: 滚动到此处查看示例
            - status [ref=e369]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e370]:
              - generic "查看本卡代码" [ref=e371] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e372] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e373]: 对应官网示例
            - generic [ref=e374]: （新标签页打开）
    - region [ref=e375]:
      - heading "交互与状态" [level=2] [ref=e376]
      - generic [ref=e377]:
        - region [ref=e378]:
          - generic [ref=e379]:
            - heading "Line Chart - Trio with Brush" [level=3] [ref=e380]
            - paragraph [ref=e381]: 三条曲线、顶部图例、点阵与范围缩放
          - generic [ref=e382]:
            - generic [ref=e383]:
              - button "更新数据" [ref=e384] [cursor=pointer]
              - button "重播动效" [ref=e386] [cursor=pointer]
            - paragraph [ref=e389]: 滚动到此处查看示例
            - status [ref=e390]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e391]:
              - generic "查看本卡代码" [ref=e392] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e393] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e394]: 对应官网示例
            - generic [ref=e395]: （新标签页打开）
        - region [ref=e396]:
          - generic [ref=e397]:
            - heading "Line Chart - Projection" [level=3] [ref=e398]
            - paragraph [ref=e399]: 目标与自动预测曲线、终端标记
          - generic [ref=e400]:
            - generic [ref=e401]:
              - button "更新数据" [ref=e402] [cursor=pointer]
              - button "重播动效" [ref=e404] [cursor=pointer]
            - paragraph [ref=e407]: 滚动到此处查看示例
            - status [ref=e408]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e409]:
              - generic "查看本卡代码" [ref=e410] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e411] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e412]: 对应官网示例
            - generic [ref=e413]: （新标签页打开）
        - region [ref=e414]:
          - generic [ref=e415]:
            - heading "Line Chart - Segment Selection" [level=3] [ref=e416]
            - paragraph [ref=e417]: 按下并拖动时高亮一段范围
          - generic [ref=e418]:
            - generic [ref=e419]:
              - button "更新数据" [ref=e420] [cursor=pointer]
              - button "重播动效" [ref=e422] [cursor=pointer]
            - paragraph [ref=e425]: 滚动到此处查看示例
            - status [ref=e426]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e427]:
              - generic "查看本卡代码" [ref=e428] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e429] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e430]: 对应官网示例
            - generic [ref=e431]: （新标签页打开）
        - region [ref=e432]:
          - generic [ref=e433]:
            - heading "Line Chart - Loading" [level=3] [ref=e434]
            - paragraph [ref=e435]: 网格与前景脉冲加载
          - generic [ref=e436]:
            - generic [ref=e437]:
              - button "更新数据" [ref=e438] [cursor=pointer]
              - button "重播动效" [ref=e440] [cursor=pointer]
            - paragraph [ref=e443]: 滚动到此处查看示例
            - status [ref=e444]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e445]:
              - generic "查看本卡代码" [ref=e446] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e447] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e448]: 对应官网示例
            - generic [ref=e449]: （新标签页打开）
        - region [ref=e450]:
          - generic [ref=e451]:
            - heading "Line Chart - Loading (Sweep)" [level=3] [ref=e452]
            - paragraph [ref=e453]: 斜向扫光折线骨架
          - generic [ref=e454]:
            - generic [ref=e455]:
              - button "更新数据" [ref=e456] [cursor=pointer]
              - button "重播动效" [ref=e458] [cursor=pointer]
            - paragraph [ref=e461]: 滚动到此处查看示例
            - status [ref=e462]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e463]:
              - generic "查看本卡代码" [ref=e464] [cursor=pointer]
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
          - link "对应官网示例 （新标签页打开）" [ref=e465] [cursor=pointer]:
            - /url: https://bklit.com/charts/line-chart
            - generic [ref=e466]: 对应官网示例
            - generic [ref=e467]: （新标签页打开）
  - navigation "相关图型" [ref=e468]:
    - link "面积图" [ref=e469] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e471] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e473] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e475] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e477] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e479] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e481] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e483] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e485] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e487] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e489] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e491] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e493] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e495] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e497] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e499] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e501] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e503] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e505] [cursor=pointer]:
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
> 21  |     await expect(host.locator(".rain-chart-plot svg")).toBeVisible();
      |                                                        ^ Error: expect(locator).toBeVisible() failed
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
  59  |     await expect(host.locator(".rain-chart-plot svg")).toBeVisible();
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
```