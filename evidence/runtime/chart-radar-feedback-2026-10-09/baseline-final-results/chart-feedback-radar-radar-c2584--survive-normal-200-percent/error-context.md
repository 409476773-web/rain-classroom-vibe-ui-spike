# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-radar.spec.ts >> radar labels and finite geometry survive normal-200-percent
- Location: tests/e2e/chart-feedback-radar.spec.ts:148:3

# Error details

```
Error: radar-default

expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 0
```

```
Error: radar-triangle

expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 0
```

```
Error: radar-hexagon

expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 0
```

```
Error: radar-single-series

expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0
```

```
Error: radar-minimal

expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 0
```

```
Error: radar-grid-only

expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 0
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "雷达图" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 同尺度维度的多系列能力比较。
  - generic [ref=e11]:
    - heading "图型与可选配方" [level=2] [ref=e12]
    - paragraph [ref=e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e17]:
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
        - button "更新数据" [ref=e22] [cursor=pointer]
        - button "重播动效" [ref=e24] [cursor=pointer]
      - generic [ref=e26]:
        - img [ref=e30]:
          - generic [ref=e31]:
            - generic [ref=e32]:
              - generic [ref=e43]: "20"
              - generic [ref=e45]: "40"
              - generic [ref=e47]: "60"
              - generic [ref=e49]: "80"
              - generic [ref=e51]: "100"
            - generic [ref=e58] [cursor=pointer]
            - generic [ref=e65] [cursor=pointer]
            - generic [ref=e72] [cursor=pointer]
            - generic [ref=e79]:
              - generic [ref=e80]: 知识掌握
              - generic [ref=e82]: 到课情况
              - generic [ref=e84]: 练习表现
              - generic [ref=e86]: 学习参与
              - generic [ref=e88]: 复习完成
        - generic [ref=e90]:
          - button "课程一" [ref=e92] [cursor=pointer]
          - button "课程二" [ref=e96] [cursor=pointer]
          - button "课程三" [ref=e100] [cursor=pointer]
        - group [ref=e103]:
          - generic "查看精确数据" [ref=e104] [cursor=pointer]
      - status [ref=e105]: 示例数据 · 已更新 0 次
  - generic [ref=e106]:
    - heading "数据与使用边界" [level=2] [ref=e107]
    - paragraph [ref=e108]: 指标顺序固定，原生数据归一到0—100。
    - paragraph [ref=e109]: 不同量纲必须先说明归一方式；本例为示例分数。
    - paragraph [ref=e110]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e111] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - generic [ref=e113]:
    - region [ref=e114]:
      - heading "API 与结构" [level=2] [ref=e115]
      - table [ref=e117]:
        - caption [ref=e118]: 雷达图 常用接口
        - rowgroup [ref=e119]:
          - row [ref=e120]:
            - columnheader "名称" [ref=e121]
            - columnheader "类型" [ref=e122]
            - columnheader "默认" [ref=e123]
            - columnheader "说明" [ref=e124]
        - rowgroup [ref=e125]:
          - row [ref=e126]:
            - rowheader [ref=e127]:
              - code [ref=e128]: data / value
            - cell [ref=e129]:
              - code [ref=e130]: 原生图型合同
            - cell "—" [ref=e131]
            - cell "指标顺序固定，原生数据归一到0—100。" [ref=e132]
          - row [ref=e133]:
            - rowheader [ref=e134]:
              - code [ref=e135]: children
            - cell [ref=e136]:
              - code [ref=e137]: Compound Parts
            - cell "—" [ref=e138]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e139]
          - row [ref=e140]:
            - rowheader [ref=e141]:
              - code [ref=e142]: className / style / margin
            - cell [ref=e143]:
              - code [ref=e144]: 原生尺寸接口
            - cell "—" [ref=e145]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e146]
          - row [ref=e147]:
            - rowheader [ref=e148]:
              - code [ref=e149]: enterTransition / animationDuration
            - cell [ref=e150]:
              - code [ref=e151]: 原生动效配置
            - cell "—" [ref=e152]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e153]
      - paragraph [ref=e154]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e155]:
      - heading "调用示例" [level=2] [ref=e156]
      - generic [ref=e157]:
        - generic [ref=e158]:
          - button "复制代码" [ref=e159] [cursor=pointer]
          - status
        - code [ref=e162]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-radar\" data-recipe=\"category-near\"> <ChartExample id=\"radar\" recipe=\"category-near\" revision={revision} reduced={reduced} state=\"normal\" size=\"standard\" miniSize=\"compact\" seriesCount={3} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e163]:
        - text: 当前源码：
        - code [ref=e164]: packages/ui/src/charts/vendor/charts/radar-chart.tsx
  - group [ref=e165]:
    - generic "调用配置、完整源码与示例数据" [ref=e166] [cursor=pointer]
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
  - region "全部图表变体" [ref=e167]:
    - navigation "变体分组" [ref=e168]:
      - button "基础结构" [ref=e169] [cursor=pointer]
      - button "坐标与辅助读数" [ref=e171] [cursor=pointer]
    - region [ref=e173]:
      - heading "基础结构" [level=2] [ref=e174]
      - generic [ref=e175]:
        - region [ref=e176]:
          - generic [ref=e177]:
            - heading "Radar Chart" [level=3] [ref=e178]
            - paragraph [ref=e179]: 五维指标的多系列能力对比
          - generic [ref=e180]:
            - generic [ref=e181]:
              - button "更新数据" [ref=e182] [cursor=pointer]
              - button "重播动效" [ref=e184] [cursor=pointer]
            - generic [ref=e186]:
              - img [ref=e190]:
                - generic [ref=e191]:
                  - generic [ref=e192]:
                    - generic [ref=e203]: "20"
                    - generic [ref=e205]: "40"
                    - generic [ref=e207]: "60"
                    - generic [ref=e209]: "80"
                    - generic [ref=e211]: "100"
                  - generic [ref=e218]:
                    - generic [ref=e219]: 理解
                    - generic [ref=e221]: 分析
                    - generic [ref=e223]: 应用
                    - generic [ref=e225]: 表达
                    - generic [ref=e227]: 协作
                  - generic [ref=e229] [cursor=pointer]
                  - generic [ref=e236] [cursor=pointer]
              - paragraph [ref=e243]: 5 个维度共用 0–100 分量程；均为示例评分，未混合不同单位。
              - generic "评分系列" [ref=e244]:
                - generic [ref=e245]: 课程 A
                - generic [ref=e247]: 课程 B
              - group [ref=e249]:
                - generic "查看精确数据" [ref=e250] [cursor=pointer]
            - status [ref=e251]: 示例数据 · 已更新 0 次
            - group [ref=e252]:
              - generic "查看本卡代码" [ref=e253] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e254] [cursor=pointer]:
            - /url: https://bklit.com/charts/radar-chart
            - generic [ref=e255]: 对应官网示例
            - generic [ref=e256]: （新标签页打开）
        - region [ref=e257]:
          - generic [ref=e258]:
            - heading "Radar Chart - Triangle" [level=3] [ref=e259]
            - paragraph [ref=e260]: 三维指标对比
          - generic [ref=e261]:
            - generic [ref=e262]:
              - button "更新数据" [ref=e263] [cursor=pointer]
              - button "重播动效" [ref=e265] [cursor=pointer]
            - generic [ref=e267]:
              - img [ref=e271]:
                - generic [ref=e272]:
                  - generic [ref=e273]:
                    - generic [ref=e284]: "20"
                    - generic [ref=e286]: "40"
                    - generic [ref=e288]: "60"
                    - generic [ref=e290]: "80"
                    - generic [ref=e292]: "100"
                  - generic [ref=e297]:
                    - generic [ref=e298]: 理解
                    - generic [ref=e300]: 分析
                    - generic [ref=e302]: 应用
                  - generic [ref=e304] [cursor=pointer]
                  - generic [ref=e309] [cursor=pointer]
              - paragraph [ref=e314]: 3 个维度共用 0–100 分量程；均为示例评分，未混合不同单位。
              - generic "评分系列" [ref=e315]:
                - generic [ref=e316]: 课程 A
                - generic [ref=e318]: 课程 B
              - group [ref=e320]:
                - generic "查看精确数据" [ref=e321] [cursor=pointer]
            - status [ref=e322]: 示例数据 · 已更新 0 次
            - group [ref=e323]:
              - generic "查看本卡代码" [ref=e324] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e325] [cursor=pointer]:
            - /url: https://bklit.com/charts/radar-chart
            - generic [ref=e326]: 对应官网示例
            - generic [ref=e327]: （新标签页打开）
        - region [ref=e328]:
          - generic [ref=e329]:
            - heading "Radar Chart - Hexagon" [level=3] [ref=e330]
            - paragraph [ref=e331]: 六维填充图，隐藏描边与点
          - generic [ref=e332]:
            - generic [ref=e333]:
              - button "更新数据" [ref=e334] [cursor=pointer]
              - button "重播动效" [ref=e336] [cursor=pointer]
            - generic [ref=e338]:
              - img [ref=e342]:
                - generic [ref=e343]:
                  - generic [ref=e355]:
                    - generic [ref=e356]: 理解
                    - generic [ref=e358]: 分析
                    - generic [ref=e360]: 应用
                    - generic [ref=e362]: 表达
                    - generic [ref=e364]: 协作
                    - generic [ref=e366]: 创造
                  - generic [ref=e368] [cursor=pointer]
                  - generic [ref=e370] [cursor=pointer]
              - paragraph [ref=e372]: 6 个维度共用 0–100 分量程；均为示例评分，未混合不同单位。
              - generic "评分系列" [ref=e373]:
                - generic [ref=e374]: 课程 A
                - generic [ref=e376]: 课程 B
              - group [ref=e378]:
                - generic "查看精确数据" [ref=e379] [cursor=pointer]
            - status [ref=e380]: 示例数据 · 已更新 0 次
            - group [ref=e381]:
              - generic "查看本卡代码" [ref=e382] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e383] [cursor=pointer]:
            - /url: https://bklit.com/charts/radar-chart
            - generic [ref=e384]: 对应官网示例
            - generic [ref=e385]: （新标签页打开）
        - region [ref=e386]:
          - generic [ref=e387]:
            - heading "Radar Chart - Single Series" [level=3] [ref=e388]
            - paragraph [ref=e389]: 单一能力轮廓且隐藏角点
          - generic [ref=e390]:
            - generic [ref=e391]:
              - button "更新数据" [ref=e392] [cursor=pointer]
              - button "重播动效" [ref=e394] [cursor=pointer]
            - generic [ref=e396]:
              - img [ref=e400]:
                - generic [ref=e401]:
                  - generic [ref=e402]:
                    - generic [ref=e413]: "20"
                    - generic [ref=e415]: "40"
                    - generic [ref=e417]: "60"
                    - generic [ref=e419]: "80"
                    - generic [ref=e421]: "100"
                  - generic [ref=e428]:
                    - generic [ref=e429]: 理解
                    - generic [ref=e431]: 分析
                    - generic [ref=e433]: 应用
                    - generic [ref=e435]: 表达
                    - generic [ref=e437]: 协作
                  - generic [ref=e439] [cursor=pointer]
              - paragraph [ref=e441]: 5 个维度共用 0–100 分量程；均为示例评分，未混合不同单位。
              - generic "评分系列" [ref=e442]: 示例课程
              - group [ref=e445]:
                - generic "查看精确数据" [ref=e446] [cursor=pointer]
            - status [ref=e447]: 示例数据 · 已更新 0 次
            - group [ref=e448]:
              - generic "查看本卡代码" [ref=e449] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e450] [cursor=pointer]:
            - /url: https://bklit.com/charts/radar-chart
            - generic [ref=e451]: 对应官网示例
            - generic [ref=e452]: （新标签页打开）
    - region [ref=e453]:
      - heading "坐标与辅助读数" [level=2] [ref=e454]
      - generic [ref=e455]:
        - region [ref=e456]:
          - generic [ref=e457]:
            - heading "Radar Chart - Minimal" [level=3] [ref=e458]
            - paragraph [ref=e459]: 较少网格层并隐藏数值标签
          - generic [ref=e460]:
            - generic [ref=e461]:
              - button "更新数据" [ref=e462] [cursor=pointer]
              - button "重播动效" [ref=e464] [cursor=pointer]
            - generic [ref=e466]:
              - img [ref=e470]:
                - generic [ref=e471]:
                  - generic [ref=e479]:
                    - generic [ref=e480]: 理解
                    - generic [ref=e482]: 分析
                    - generic [ref=e484]: 应用
                    - generic [ref=e486]: 表达
                    - generic [ref=e488]: 协作
                  - generic [ref=e490] [cursor=pointer]
                  - generic [ref=e492] [cursor=pointer]
              - paragraph [ref=e494]: 5 个维度共用 0–100 分量程；均为示例评分，未混合不同单位。
              - generic "评分系列" [ref=e495]:
                - generic [ref=e496]: 课程 A
                - generic [ref=e498]: 课程 B
              - group [ref=e500]:
                - generic "查看精确数据" [ref=e501] [cursor=pointer]
            - status [ref=e502]: 示例数据 · 已更新 0 次
            - group [ref=e503]:
              - generic "查看本卡代码" [ref=e504] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e505] [cursor=pointer]:
            - /url: https://bklit.com/charts/radar-chart
            - generic [ref=e506]: 对应官网示例
            - generic [ref=e507]: （新标签页打开）
        - region [ref=e508]:
          - generic [ref=e509]:
            - heading "Radar Chart - Grid Only" [level=3] [ref=e510]
            - paragraph [ref=e511]: 保留环形网格，隐藏放射轴
          - generic [ref=e512]:
            - generic [ref=e513]:
              - button "更新数据" [ref=e514] [cursor=pointer]
              - button "重播动效" [ref=e516] [cursor=pointer]
            - generic [ref=e518]:
              - img [ref=e522]:
                - generic [ref=e523]:
                  - generic [ref=e524]:
                    - generic [ref=e535]: "20"
                    - generic [ref=e537]: "40"
                    - generic [ref=e539]: "60"
                    - generic [ref=e541]: "80"
                    - generic [ref=e543]: "100"
                  - generic [ref=e545]:
                    - generic [ref=e546]: 理解
                    - generic [ref=e548]: 分析
                    - generic [ref=e550]: 应用
                  - generic [ref=e552] [cursor=pointer]
                  - generic [ref=e557] [cursor=pointer]
              - paragraph [ref=e562]: 3 个维度共用 0–100 分量程；均为示例评分，未混合不同单位。
              - generic "评分系列" [ref=e563]:
                - generic [ref=e564]: 课程 A
                - generic [ref=e566]: 课程 B
              - group [ref=e568]:
                - generic "查看精确数据" [ref=e569] [cursor=pointer]
            - status [ref=e570]: 示例数据 · 已更新 0 次
            - group [ref=e571]:
              - generic "查看本卡代码" [ref=e572] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/radial.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e573] [cursor=pointer]:
            - /url: https://bklit.com/charts/radar-chart
            - generic [ref=e574]: 对应官网示例
            - generic [ref=e575]: （新标签页打开）
  - navigation "相关图型" [ref=e576]:
    - link "面积图" [ref=e577] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e579] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e581] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e583] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e585] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e587] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e589] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e591] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e593] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e595] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e597] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e599] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e601] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e603] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e605] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e607] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e609] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e611] [cursor=pointer]:
      - /url: "#chart-matrix"
```

# Test source

```ts
  65  |   expect(await hoverReadings(second)).toEqual([{ opacity: 1, fill: .15, stroke: 2 }, { opacity: 1, fill: .15, stroke: 2 }]);
  66  |   const focused = await button.evaluate(node => ({ outline: getComputedStyle(node).outlineStyle, width: getComputedStyle(node).outlineWidth }));
  67  |   expect(focused.outline).not.toBe("none");
  68  |   expect(parseFloat(focused.width)).toBeGreaterThan(0);
  69  |   await facts("focused-isolation", { first: await hoverReadings(first), second: await hoverReadings(second), focused });
  70  |   await first.screenshot({ path: `${evidence}/legend-focus.png` });
  71  |   await button.blur();
  72  |   await expect.poll(async () => (await hoverReadings(first)).every(row => row.opacity === 1 && row.fill === .15)).toBe(true);
  73  |   await first.getByRole("button", { name: "课程 B", exact: true }).hover();
  74  |   await expect.poll(async () => (await hoverReadings(first))[1]!.fill).toBeCloseTo(.35, 2);
  75  |   await page.mouse.move(1, 1);
  76  |   await expect.poll(async () => (await hoverReadings(first)).every(row => row.opacity === 1 && row.fill === .15)).toBe(true);
  77  |   await groups(first).last().hover({ force: true });
  78  |   await expect.poll(async () => (await hoverReadings(first))[1]!.fill).toBeCloseTo(.35, 2);
  79  |   await page.mouse.move(1, 1);
  80  |   await expect.poll(async () => (await hoverReadings(first)).every(row => row.opacity === 1 && row.fill === .15)).toBe(true);
  81  | });
  82  | 
  83  | test("three five and six dimension outer grids meet their 100 point metric directions", async ({ page }) => {
  84  |   await open(page);
  85  |   const rows = [];
  86  |   for (const [id, dimensions] of [["radar-triangle", 3], ["radar-default", 5], ["radar-hexagon", 6]] as const) {
  87  |     const card = cardFor(page, id);
  88  |     await ready(card);
  89  |     const result = await card.locator('[data-rain-id="ui-chart-radar"] svg').evaluate((svg, n) => {
  90  |       const point = (node: SVGGraphicsElement, x: number, y: number) => new DOMPoint(x, y).matrixTransform(node.getScreenCTM()!);
  91  |       const center = point(svg as SVGSVGElement, Number(svg.getAttribute("width")) / 2, Number(svg.getAttribute("height")) / 2);
  92  |       const polygons = [...svg.querySelectorAll<SVGPathElement>('path[fill="none"]')].map(path => {
  93  |         const numbers = (path.getAttribute("d") ?? "").match(/-?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)?.map(Number) ?? [];
  94  |         const vertices = Array.from({ length: numbers.length / 2 }, (_, i) => point(path, numbers[i * 2]!, numbers[i * 2 + 1]!));
  95  |         return { vertices, radius: Math.max(...vertices.map(p => Math.hypot(p.x - center.x, p.y - center.y))) };
  96  |       });
  97  |       const outer = polygons.sort((a, b) => b.radius - a.radius)[0]!;
  98  |       const axes = [...svg.querySelectorAll<SVGLineElement>("line")].map(line => point(line, Number(line.getAttribute("x2")), Number(line.getAttribute("y2"))));
  99  |       // The hexagon intentionally hides axes; labels still define every metric direction.
  100 |       const endpoints = axes.length === n ? axes : [...svg.querySelectorAll<SVGTextElement>("text")].map(text => {
  101 |         const p = point(text, Number(text.getAttribute("x")), Number(text.getAttribute("y")));
  102 |         const r = Math.hypot(p.x - center.x, p.y - center.y);
  103 |         return { x: center.x + (p.x - center.x) * outer.radius / r, y: center.y + (p.y - center.y) * outer.radius / r };
  104 |       });
  105 |       return { axisCount: axes.length, endpoints: endpoints.map(p => ({ x: p.x, y: p.y })), radius: outer.radius,
  106 |         distances: endpoints.map(p => Math.min(...outer.vertices.map(v => Math.hypot(v.x - p.x, v.y - p.y)))) };
  107 |     }, dimensions);
  108 |     rows.push({ id, dimensions, ...result });
  109 |   }
  110 |   await facts("grid-axis-alignment", rows);
  111 |   for (const row of rows) {
  112 |     expect.soft(row.endpoints.length, row.id).toBe(row.dimensions);
  113 |     expect.soft(row.radius, row.id).toBeGreaterThan(50);
  114 |     for (const distance of row.distances) expect.soft(distance, row.id).toBeLessThan(1);
  115 |   }
  116 | });
  117 | 
  118 | test("default and variant radar hover glows stay light and local to their series", async ({ page }) => {
  119 |   await open(page, "no-preference");
  120 |   const rows = [];
  121 |   for (const id of ["default-example", ...variants]) {
  122 |     const card = id === "default-example" ? page.locator('[data-rain-id="chart-radar"]') : cardFor(page, id);
  123 |     await ready(card);
  124 |     await page.waitForTimeout(1800);
  125 |     await groups(card).last().hover({ force: true });
  126 |     await expect.poll(async () => (await hoverReadings(card)).at(-1)!.fill).toBeCloseTo(.35, 2);
  127 |     const filter = await groups(card).last().locator("path").evaluate(node => getComputedStyle(node).filter);
  128 |     const slash = filter.match(/\/\s*([\d.]+)(%)?\s*\)/);
  129 |     const rgba = filter.match(/rgba\([^)]*,\s*([\d.]+)\)/);
  130 |     const alpha = slash ? Number(slash[1]) / (slash[2] ? 100 : 1) : rgba ? Number(rgba[1]) : 1;
  131 |     const pixels = [...filter.matchAll(/(-?\d+(?:\.\d+)?)px/g)].map(match => Number(match[1]));
  132 |     rows.push({ id, filter, alpha, blur: pixels.at(-1) });
  133 |     await card.screenshot({ path: `${evidence}/${id}-hover.png` });
  134 |     await page.mouse.move(1, 1);
  135 |   }
  136 |   await facts("hover-glow", rows);
  137 |   for (const row of rows) {
  138 |     if (["radar-hexagon", "radar-grid-only"].includes(row.id)) expect.soft(row.filter, row.id).toBe("none");
  139 |     else {
  140 |       expect.soft(row.filter, row.id).toContain("drop-shadow(");
  141 |       expect.soft(row.alpha, row.id).toBeLessThanOrEqual(.3);
  142 |       expect.soft(row.blur, row.id).toBeLessThanOrEqual(6);
  143 |     }
  144 |   }
  145 | });
  146 | 
  147 | for (const scenario of [{ name: "reduced-390", reduced: "reduce", width: 390, zoom: 1 }, { name: "normal-200-percent", reduced: "no-preference", width: 1280, zoom: 2 }] as const) {
  148 |   test(`radar labels and finite geometry survive ${scenario.name}`, async ({ page }) => {
  149 |     await open(page, scenario.reduced, scenario.width);
  150 |     if (scenario.zoom === 2) await page.addStyleTag({ content: "html { zoom: 2; }" });
  151 |     const rows = [];
  152 |     for (const id of variants) {
  153 |       const card = cardFor(page, id);
  154 |       await ready(card);
  155 |       if (scenario.reduced === "no-preference") await page.waitForTimeout(1500);
  156 |       const row = await card.evaluate(node => {
  157 |         const svg = node.querySelector('[data-rain-id="ui-chart-radar"] svg')!;
  158 |         const paths = [...svg.querySelectorAll("path[d]")].map(path => path.getAttribute("d"));
  159 |         const text = [...node.querySelectorAll(".legend-container button, .rain-chart-variant-legend button")].map(button => ({
  160 |           label: button.textContent?.trim(), right: button.getBoundingClientRect().right, left: button.getBoundingClientRect().left,
  161 |         }));
  162 |         return { paths, text, card: node.getBoundingClientRect().toJSON() };
  163 |       });
  164 |       rows.push({ id, ...row });
> 165 |       expect.soft(row.text.length, id).toBe(id === "radar-single-series" ? 1 : 2);
      |                                        ^ Error: radar-grid-only
  166 |       for (const path of row.paths) expect.soft(path, id).not.toMatch(/NaN|Infinity/);
  167 |       for (const text of row.text) {
  168 |         expect.soft(text.right, id).toBeLessThanOrEqual(scenario.width + 1);
  169 |         expect.soft(text.left, id).toBeGreaterThanOrEqual(-1);
  170 |       }
  171 |     }
  172 |     await facts(scenario.name, rows);
  173 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(scenario.width + 1);
  174 |     await cardFor(page, "radar-default").screenshot({ path: `${evidence}/${scenario.name}.png` });
  175 |   });
  176 | }
  177 | 
```