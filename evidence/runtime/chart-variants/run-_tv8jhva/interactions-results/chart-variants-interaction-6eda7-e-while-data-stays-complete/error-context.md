# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-variants-interactions.spec.ts >> temporary drag selection disappears after release while data stays complete
- Location: tests/e2e/chart-variants-interactions.spec.ts:34:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-chart-variant="area-segment-selection"]').locator('tbody tr')
Expected: 30
Received: 24
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('[data-chart-variant="area-segment-selection"]').locator('tbody tr')
    14 × locator resolved to 24 elements
       - unexpected value "24"

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "面积图" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 时间趋势、轻渐变面积与原生聚焦。
  - generic [ref=e11]:
    - heading "图型与可选配方" [level=2] [ref=e12]
    - paragraph [ref=e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e17]:
            - option "清晰线与轻面积" [selected]
            - option "蓝紫近邻"
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
        - button "参与人数 · 人" [ref=e43] [cursor=pointer]
        - group [ref=e46]:
          - generic "查看精确数据" [ref=e47] [cursor=pointer]
      - status [ref=e48]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - generic [ref=e49]:
    - heading "数据与使用边界" [level=2] [ref=e50]
    - paragraph [ref=e51]: 按日期排序；各系列同量纲。本例为人数，透明叠加而非堆叠。
    - paragraph [ref=e52]: 缺测不能默认补零；迷你图是尺寸配方。
    - paragraph [ref=e53]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=e54]:
    - region [ref=e55]:
      - heading "API 与结构" [level=2] [ref=e56]
      - table [ref=e58]:
        - caption [ref=e59]: 面积图 常用接口
        - rowgroup [ref=e60]:
          - row [ref=e61]:
            - columnheader "名称" [ref=e62]
            - columnheader "类型" [ref=e63]
            - columnheader "默认" [ref=e64]
            - columnheader "说明" [ref=e65]
        - rowgroup [ref=e66]:
          - row [ref=e67]:
            - rowheader [ref=e68]:
              - code [ref=e69]: data / value
            - cell [ref=e70]:
              - code [ref=e71]: 原生图型合同
            - cell "—" [ref=e72]
            - cell "按日期排序；各系列同量纲。本例为人数，透明叠加而非堆叠。" [ref=e73]
          - row [ref=e74]:
            - rowheader [ref=e75]:
              - code [ref=e76]: children
            - cell [ref=e77]:
              - code [ref=e78]: Compound Parts
            - cell "—" [ref=e79]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e80]
          - row [ref=e81]:
            - rowheader [ref=e82]:
              - code [ref=e83]: className / style / margin
            - cell [ref=e84]:
              - code [ref=e85]: 原生尺寸接口
            - cell "—" [ref=e86]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e87]
          - row [ref=e88]:
            - rowheader [ref=e89]:
              - code [ref=e90]: enterTransition / animationDuration
            - cell [ref=e91]:
              - code [ref=e92]: 原生动效配置
            - cell "—" [ref=e93]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e94]
      - paragraph [ref=e95]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e96]:
      - heading "调用示例" [level=2] [ref=e97]
      - generic [ref=e98]:
        - generic [ref=e99]:
          - button "复制代码" [ref=e100] [cursor=pointer]
          - status
        - code [ref=e103]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig, useReducedMotion } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; function App() { const [revision, setRevision] = useState(0); const reduced = useReducedMotion() ?? false; return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-area\" data-recipe=\"trend-soft\"> <ChartExample id=\"area\" recipe=\"trend-soft\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e104]:
        - text: 当前源码：
        - code [ref=e105]: packages/ui/src/charts/vendor/charts/area-chart.tsx
  - group [ref=e106]:
    - generic "调用配置、完整源码与示例数据" [ref=e107] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-variants/profit-loss.tsx"
    - option "chart-variants/shared.tsx"
    - option "chart-data.ts"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
  - region "全部图表变体" [ref=e108]:
    - navigation "变体分组" [ref=e109]:
      - button "基础结构" [ref=e110] [cursor=pointer]
      - button "图形材质" [ref=e112] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e114] [cursor=pointer]
      - button "交互与状态" [ref=e116] [cursor=pointer]
    - region [ref=e118]:
      - heading "基础结构" [level=2] [ref=e119]
      - generic [ref=e120]:
        - region [ref=e121]:
          - generic [ref=e122]:
            - heading "Area Chart" [level=3] [ref=e123]
            - paragraph [ref=e124]: 默认平滑渐变面积
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
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e136] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e137]: 对应官网示例
            - generic [ref=e138]: （新标签页打开）
        - region [ref=e139]:
          - generic [ref=e140]:
            - heading "Area Chart - Step" [level=3] [ref=e141]
            - paragraph [ref=e142]: 阶梯插值表达离散变化
          - generic [ref=e143]:
            - generic [ref=e144]:
              - button "更新数据" [ref=e145] [cursor=pointer]
              - button "重播动效" [ref=e147] [cursor=pointer]
            - paragraph [ref=e150]: 滚动到此处查看示例
            - status [ref=e151]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e152]:
              - generic "查看本卡代码" [ref=e153] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e154] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e155]: 对应官网示例
            - generic [ref=e156]: （新标签页打开）
        - region [ref=e157]:
          - generic [ref=e158]:
            - heading "Area Chart - Stacked" [level=3] [ref=e159]
            - paragraph [ref=e160]: 多面积叠加对比；不推定累计求和
          - generic [ref=e161]:
            - generic [ref=e162]:
              - button "更新数据" [ref=e163] [cursor=pointer]
              - button "重播动效" [ref=e165] [cursor=pointer]
            - paragraph [ref=e168]: 滚动到此处查看示例
            - status [ref=e169]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e170]:
              - generic "查看本卡代码" [ref=e171] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e172] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e173]: 对应官网示例
            - generic [ref=e174]: （新标签页打开）
    - region [ref=e175]:
      - heading "图形材质" [level=2] [ref=e176]
      - generic [ref=e177]:
        - region [ref=e178]:
          - generic [ref=e179]:
            - heading "Area Chart - Gradient" [level=3] [ref=e180]
            - paragraph [ref=e181]: 调整底部透明度的面积填充
          - generic [ref=e182]:
            - generic [ref=e183]:
              - button "更新数据" [ref=e184] [cursor=pointer]
              - button "重播动效" [ref=e186] [cursor=pointer]
            - paragraph [ref=e188]: 本卡使用独立示例配色，保留材质或色阶差异。
            - paragraph [ref=e190]: 滚动到此处查看示例
            - status [ref=e191]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e192]:
              - generic "查看本卡代码" [ref=e193] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e194] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e195]: 对应官网示例
            - generic [ref=e196]: （新标签页打开）
        - region [ref=e197]:
          - generic [ref=e198]:
            - heading "Area Chart - No Stroke" [level=3] [ref=e199]
            - paragraph [ref=e200]: 隐藏面积轮廓线
          - generic [ref=e201]:
            - generic [ref=e202]:
              - button "更新数据" [ref=e203] [cursor=pointer]
              - button "重播动效" [ref=e205] [cursor=pointer]
            - paragraph [ref=e208]: 滚动到此处查看示例
            - status [ref=e209]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e210]:
              - generic "查看本卡代码" [ref=e211] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e212] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e213]: 对应官网示例
            - generic [ref=e214]: （新标签页打开）
        - region [ref=e215]:
          - generic [ref=e216]:
            - heading "Area Chart - Fade Edges" [level=3] [ref=e217]
            - paragraph [ref=e218]: 左右边缘渐隐
          - generic [ref=e219]:
            - generic [ref=e220]:
              - button "更新数据" [ref=e221] [cursor=pointer]
              - button "重播动效" [ref=e223] [cursor=pointer]
            - paragraph [ref=e226]: 滚动到此处查看示例
            - status [ref=e227]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e228]:
              - generic "查看本卡代码" [ref=e229] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e230] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e231]: 对应官网示例
            - generic [ref=e232]: （新标签页打开）
        - region [ref=e233]:
          - generic [ref=e234]:
            - heading "Area Chart - Pattern" [level=3] [ref=e235]
            - paragraph [ref=e236]: 斜线图案面积填充
          - generic [ref=e237]:
            - generic [ref=e238]:
              - button "更新数据" [ref=e239] [cursor=pointer]
              - button "重播动效" [ref=e241] [cursor=pointer]
            - paragraph [ref=e244]: 滚动到此处查看示例
            - status [ref=e245]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e246]:
              - generic "查看本卡代码" [ref=e247] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e248] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e249]: 对应官网示例
            - generic [ref=e250]: （新标签页打开）
        - region [ref=e251]:
          - generic [ref=e252]:
            - heading "Area Chart - Series Markers" [level=3] [ref=e253]
            - paragraph [ref=e254]: 各数据点使用圆环标记
          - generic [ref=e255]:
            - generic [ref=e256]:
              - button "更新数据" [ref=e257] [cursor=pointer]
              - button "重播动效" [ref=e259] [cursor=pointer]
            - paragraph [ref=e262]: 滚动到此处查看示例
            - status [ref=e263]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e264]:
              - generic "查看本卡代码" [ref=e265] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e266] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e267]: 对应官网示例
            - generic [ref=e268]: （新标签页打开）
        - region [ref=e269]:
          - generic [ref=e270]:
            - heading "Area Chart - Dashed Tail" [level=3] [ref=e271]
            - paragraph [ref=e272]: 未完整时段使用虚线尾段
          - generic [ref=e273]:
            - generic [ref=e274]:
              - button "更新数据" [ref=e275] [cursor=pointer]
              - button "重播动效" [ref=e277] [cursor=pointer]
            - paragraph [ref=e280]: 滚动到此处查看示例
            - status [ref=e281]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e282]:
              - generic "查看本卡代码" [ref=e283] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e284] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e285]: 对应官网示例
            - generic [ref=e286]: （新标签页打开）
    - region [ref=e287]:
      - heading "坐标与辅助读数" [level=2] [ref=e288]
      - generic [ref=e289]:
        - region [ref=e290]:
          - generic [ref=e291]:
            - heading "Area Chart - Left Y axis" [level=3] [ref=e292]
            - paragraph [ref=e293]: 同量纲系列共用左纵轴
          - generic [ref=e294]:
            - generic [ref=e295]:
              - button "更新数据" [ref=e296] [cursor=pointer]
              - button "重播动效" [ref=e298] [cursor=pointer]
            - paragraph [ref=e301]: 滚动到此处查看示例
            - status [ref=e302]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e303]:
              - generic "查看本卡代码" [ref=e304] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e305] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e306]: 对应官网示例
            - generic [ref=e307]: （新标签页打开）
        - region [ref=e308]:
          - generic [ref=e309]:
            - heading "Area Chart - Left and right Y axes" [level=3] [ref=e310]
            - paragraph [ref=e311]: 左右独立纵轴与量纲
          - generic [ref=e312]:
            - generic [ref=e313]:
              - button "更新数据" [ref=e314] [cursor=pointer]
              - button "重播动效" [ref=e316] [cursor=pointer]
            - paragraph [ref=e319]: 滚动到此处查看示例
            - status [ref=e320]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e321]:
              - generic "查看本卡代码" [ref=e322] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e323] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e324]: 对应官网示例
            - generic [ref=e325]: （新标签页打开）
        - region [ref=e326]:
          - generic [ref=e327]:
            - heading "Area Chart - Pattern Background" [level=3] [ref=e328]
            - paragraph [ref=e329]: 图案背景替代网格
          - generic [ref=e330]:
            - generic [ref=e331]:
              - button "更新数据" [ref=e332] [cursor=pointer]
              - button "重播动效" [ref=e334] [cursor=pointer]
            - paragraph [ref=e337]: 滚动到此处查看示例
            - status [ref=e338]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e339]:
              - generic "查看本卡代码" [ref=e340] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e341] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e342]: 对应官网示例
            - generic [ref=e343]: （新标签页打开）
        - region [ref=e344]:
          - generic [ref=e345]:
            - heading "Area Chart - Dot Grid Background" [level=3] [ref=e346]
            - paragraph [ref=e347]: 带边缘渐隐的点阵背景
          - generic [ref=e348]:
            - generic [ref=e349]:
              - button "更新数据" [ref=e350] [cursor=pointer]
              - button "重播动效" [ref=e352] [cursor=pointer]
            - paragraph [ref=e355]: 滚动到此处查看示例
            - status [ref=e356]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e357]:
              - generic "查看本卡代码" [ref=e358] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e359] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e360]: 对应官网示例
            - generic [ref=e361]: （新标签页打开）
        - region [ref=e362]:
          - generic [ref=e363]:
            - heading "Area Chart - Reference Band" [level=3] [ref=e364]
            - paragraph [ref=e365]: 带边界标识的水平参考区间
          - generic [ref=e366]:
            - generic [ref=e367]:
              - button "更新数据" [ref=e368] [cursor=pointer]
              - button "重播动效" [ref=e370] [cursor=pointer]
            - paragraph [ref=e373]: 滚动到此处查看示例
            - status [ref=e374]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e375]:
              - generic "查看本卡代码" [ref=e376] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e377] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e378]: 对应官网示例
            - generic [ref=e379]: （新标签页打开）
        - region [ref=e380]:
          - generic [ref=e381]:
            - heading "Area Chart - Pattern Reference Band" [level=3] [ref=e382]
            - paragraph [ref=e383]: 图案参考区间与相应轴标签
          - generic [ref=e384]:
            - generic [ref=e385]:
              - button "更新数据" [ref=e386] [cursor=pointer]
              - button "重播动效" [ref=e388] [cursor=pointer]
            - paragraph [ref=e391]: 滚动到此处查看示例
            - status [ref=e392]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e393]:
              - generic "查看本卡代码" [ref=e394] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e395] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e396]: 对应官网示例
            - generic [ref=e397]: （新标签页打开）
    - region [ref=e398]:
      - heading "交互与状态" [level=2] [ref=e399]
      - generic [ref=e400]:
        - region [ref=e401]:
          - generic [ref=e402]:
            - heading "Area Chart - Interactive" [level=3] [ref=e403]
            - paragraph [ref=e404]: 双面积趋势、曲线选择与临时拖选
          - generic [ref=e405]:
            - generic [ref=e406]:
              - button "更新数据" [ref=e407] [cursor=pointer]
              - button "重播动效" [ref=e409] [cursor=pointer]
            - paragraph [ref=e412]: 滚动到此处查看示例
            - status [ref=e413]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e414]:
              - generic "查看本卡代码" [ref=e415] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e416] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e417]: 对应官网示例
            - generic [ref=e418]: （新标签页打开）
        - region [ref=e419]:
          - generic [ref=e420]:
            - heading "Area Chart - Loading" [level=3] [ref=e421]
            - paragraph [ref=e422]: 网格与前景脉冲加载
          - generic [ref=e423]:
            - generic [ref=e424]:
              - button "更新数据" [ref=e425] [cursor=pointer]
              - button "重播动效" [ref=e427] [cursor=pointer]
            - generic [ref=e429]:
              - generic [ref=e430]:
                - button "显示数据" [pressed] [ref=e431] [cursor=pointer]
                - status [ref=e432]: 加载动画已暂停，显示静态数据
              - generic [ref=e433]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 9
                  - generic: Sep 17
                  - generic: Sep 24
              - group [ref=e445]:
                - generic "查看精确数据" [ref=e446] [cursor=pointer]
            - status [ref=e447]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e448]:
              - generic "查看本卡代码" [ref=e449] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e450] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e451]: 对应官网示例
            - generic [ref=e452]: （新标签页打开）
        - region [ref=e453]:
          - generic [ref=e454]:
            - heading "Area Chart - Loading (Sweep)" [level=3] [ref=e455]
            - paragraph [ref=e456]: 斜向扫光骨架加载
          - generic [ref=e457]:
            - generic [ref=e458]:
              - button "更新数据" [ref=e459] [cursor=pointer]
              - button "重播动效" [ref=e461] [cursor=pointer]
            - generic [ref=e463]:
              - generic [ref=e464]:
                - button "显示数据" [pressed] [ref=e465] [cursor=pointer]
                - status [ref=e466]: 加载动画已暂停，显示静态数据
              - generic [ref=e467]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 9
                  - generic: Sep 17
                  - generic: Sep 24
              - group [ref=e479]:
                - generic "查看精确数据" [ref=e480] [cursor=pointer]
            - status [ref=e481]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e482]:
              - generic "查看本卡代码" [ref=e483] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e484] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e485]: 对应官网示例
            - generic [ref=e486]: （新标签页打开）
        - region [ref=e487]:
          - generic [ref=e488]:
            - heading "Area Chart - Segment Selection" [level=3] [ref=e489]
            - paragraph [ref=e490]: 按下并拖动时高亮一段范围
          - generic [ref=e491]:
            - generic [ref=e492]:
              - button "更新数据" [ref=e493] [cursor=pointer]
              - button "重播动效" [ref=e495] [cursor=pointer]
            - generic [ref=e497]:
              - generic [ref=e498]:
                - generic:
                  - generic: Sep 1
                  - generic: Sep 9
                  - generic: Sep 17
                  - generic: Sep 24
              - paragraph [ref=e510]: 按下并拖动显示临时范围，松开后恢复全量；精确数值见数据表。
              - group [ref=e511]:
                - generic "查看精确数据" [active] [ref=e512] [cursor=pointer]
                - generic "精确数据表，可横向滚动" [ref=e513]:
                  - table [ref=e514]:
                    - caption [ref=e515]: 示例精确数据
                    - rowgroup [ref=e516]:
                      - row [ref=e517]:
                        - columnheader "日期" [ref=e518]
                        - columnheader "参与人数 · 人" [ref=e519]
                    - rowgroup [ref=e520]:
                      - row [ref=e521]:
                        - rowheader "9月1日" [ref=e522]
                        - cell "190" [ref=e523]
                      - row [ref=e524]:
                        - rowheader "9月2日" [ref=e525]
                        - cell "220" [ref=e526]
                      - row [ref=e527]:
                        - rowheader "9月3日" [ref=e528]
                        - cell "242" [ref=e529]
                      - row [ref=e530]:
                        - rowheader "9月4日" [ref=e531]
                        - cell "251" [ref=e532]
                      - row [ref=e533]:
                        - rowheader "9月5日" [ref=e534]
                        - cell "246" [ref=e535]
                      - row [ref=e536]:
                        - rowheader "9月6日" [ref=e537]
                        - cell "231" [ref=e538]
                      - row [ref=e539]:
                        - rowheader "9月7日" [ref=e540]
                        - cell "211" [ref=e541]
                      - row [ref=e542]:
                        - rowheader "9月8日" [ref=e543]
                        - cell "197" [ref=e544]
                      - row [ref=e545]:
                        - rowheader "9月9日" [ref=e546]
                        - cell "194" [ref=e547]
                      - row [ref=e548]:
                        - rowheader "9月10日" [ref=e549]
                        - cell "206" [ref=e550]
                      - row [ref=e551]:
                        - rowheader "9月11日" [ref=e552]
                        - cell "230" [ref=e553]
                      - row [ref=e554]:
                        - rowheader "9月12日" [ref=e555]
                        - cell "260" [ref=e556]
                      - row [ref=e557]:
                        - rowheader "9月13日" [ref=e558]
                        - cell "290" [ref=e559]
                      - row [ref=e560]:
                        - rowheader "9月14日" [ref=e561]
                        - cell "310" [ref=e562]
                      - row [ref=e563]:
                        - rowheader "9月15日" [ref=e564]
                        - cell "316" [ref=e565]
                      - row [ref=e566]:
                        - rowheader "9月16日" [ref=e567]
                        - cell "309" [ref=e568]
                      - row [ref=e569]:
                        - rowheader "9月17日" [ref=e570]
                        - cell "292" [ref=e571]
                      - row [ref=e572]:
                        - rowheader "9月18日" [ref=e573]
                        - cell "273" [ref=e574]
                      - row [ref=e575]:
                        - rowheader "9月19日" [ref=e576]
                        - cell "261" [ref=e577]
                      - row [ref=e578]:
                        - rowheader "9月20日" [ref=e579]
                        - cell "260" [ref=e580]
                      - row [ref=e581]:
                        - rowheader "9月21日" [ref=e582]
                        - cell "274" [ref=e583]
                      - row [ref=e584]:
                        - rowheader "9月22日" [ref=e585]
                        - cell "299" [ref=e586]
                      - row [ref=e587]:
                        - rowheader "9月23日" [ref=e588]
                        - cell "330" [ref=e589]
                      - row [ref=e590]:
                        - rowheader "9月24日" [ref=e591]
                        - cell "359" [ref=e592]
            - status [ref=e593]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e594]:
              - generic "查看本卡代码" [ref=e595] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/trend.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/profit-loss.tsx"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e596] [cursor=pointer]:
            - /url: https://bklit.com/charts/area-chart
            - generic [ref=e597]: 对应官网示例
            - generic [ref=e598]: （新标签页打开）
  - navigation "相关图型" [ref=e599]:
    - link "面积图" [ref=e600] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e602] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e604] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e606] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e608] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e610] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e612] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e614] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e616] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e618] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e620] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e622] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e624] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e626] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e628] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e630] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e632] [cursor=pointer]:
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
  29 |   await expect.poll(()=>card.getByRole("slider",{name:"范围结束日期"}).inputValue()).not.toBe("29");
  30 |   await card.getByRole("button",{name:"重置范围"}).click();await expect(card.locator("tbody tr")).toHaveCount(30);
  31 |   await mkdir(evidence,{recursive:true});await card.screenshot({path:`${evidence}/line-brush-pointer-keyboard-reset.png`});
  32 | });
  33 | 
  34 | test("temporary drag selection disappears after release while data stays complete",async({page})=>{
  35 |   await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-area");
  36 |   const card=page.locator('[data-chart-variant="area-segment-selection"]');await card.scrollIntoViewIfNeeded();
  37 |   const plot=card.locator('[data-rain-id="ui-chart-area"] svg').first();const box=(await plot.boundingBox())!;
  38 |   const band=card.locator('rect[fill="var(--chart-segment-background)"]');
  39 |   await page.mouse.move(box.x+120,box.y+100);await page.mouse.down();await page.mouse.move(box.x+360,box.y+100,{steps:8});await expect(band).toBeVisible();
  40 |   await page.mouse.up();await expect(band).toHaveCount(0);
> 41 |   await card.getByText("查看精确数据",{exact:true}).click();await expect(card.locator("tbody tr")).toHaveCount(30);
     |                                                                                              ^ Error: expect(locator).toHaveCount(expected) failed
  42 | });
  43 | 
  44 | test("live pause keeps the actual path offscreen and in background, manual step updates the window",async({page})=>{
  45 |   await page.clock.install();await page.goto("/#chart-live-line");
  46 |   const card=page.locator('[data-chart-variant="live-line-default"]');await card.scrollIntoViewIfNeeded();
  47 |   await expect(card.locator('[data-live-count]')).toBeVisible();await page.clock.runFor(1000);
  48 |   await card.getByRole("button",{name:"暂停实时",exact:true}).click();
  49 |   const path=card.locator('path[stroke="var(--chart-1)"]').first();const before=await path.getAttribute("d");
  50 |   const count=await card.locator('[data-live-count]').getAttribute("data-live-count");
  51 |   await card.getByRole("button",{name:"恢复实时",exact:true}).blur();await page.locator("h1").scrollIntoViewIfNeeded();
  52 |   await page.clock.fastForward(120_000);await card.scrollIntoViewIfNeeded();await page.clock.runFor(50);
  53 |   await expect(card.getByRole("button",{name:"恢复实时",exact:true})).toBeVisible();await expect(path).toHaveAttribute("d",before!);await expect(card.locator('[data-live-count]')).toHaveAttribute("data-live-count",count!);
  54 |   await card.getByRole("button",{name:"追加一次",exact:true}).click();await page.clock.runFor(50);
  55 |   await expect.poll(()=>path.getAttribute("d")).not.toBe(before);
  56 |   await card.getByRole("button",{name:"恢复实时",exact:true}).click();await page.clock.runFor(650);
  57 |   await expect.poll(()=>card.locator('[data-live-count]').getAttribute("data-live-count")).not.toBe(count);
  58 |   await page.emulateMedia({reducedMotion:"reduce"});await expect(card.locator('[data-live-paused]')).toHaveAttribute("data-live-paused","true");
  59 | });
  60 | 
  61 | test("horizontal bars have a visible numeric axis and native 3D segments align without extra stack gaps",async({page})=>{
  62 |   await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/#chart-bar");
  63 |   const horizontal=page.locator('[data-chart-variant="bar-horizontal"]');await horizontal.scrollIntoViewIfNeeded();await expect(horizontal.locator('g[aria-label="人数刻度"] text').first()).toBeVisible();
  64 |   const stack=page.locator('[data-chart-variant="bar-3d-stacked"]');await stack.scrollIntoViewIfNeeded();
  65 |   const values=await stack.locator('g.bar-series-进行中 rect').evaluateAll(nodes=>nodes.map(node=>Number(node.getAttribute("y"))));
  66 |   expect(values.length).toBe(6);expect(values.every(Number.isFinite)).toBe(true);
  67 | });
  68 | 
```