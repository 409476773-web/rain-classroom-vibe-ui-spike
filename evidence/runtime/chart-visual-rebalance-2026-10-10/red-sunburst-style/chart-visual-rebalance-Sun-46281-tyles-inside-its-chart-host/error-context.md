# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-visual-rebalance.spec.ts >> Sunburst text entry retains the Rain text Button styles inside its chart host
- Location: tests/e2e/chart-visual-rebalance.spec.ts:3:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 8
+ Received  + 8

  Object {
-   "background": "rgba(0, 0, 0, 0)",
-   "borderWidth": "0px",
+   "background": "rgb(255, 255, 255)",
+   "borderWidth": "1px",
    "fontFamily": "\"PingFang SC\", \"Microsoft YaHei\", ui-sans-serif, sans-serif",
-   "fontSize": "12px",
+   "fontSize": "16px",
    "fontWeight": "400",
-   "lineHeight": "14px",
+   "lineHeight": "24px",
    "padding": Array [
-     "3px",
-     "6px",
-     "3px",
-     "6px",
+     "8px",
+     "8px",
+     "8px",
+     "8px",
    ],
  }
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "旭日图" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 课程内容层级、扇区聚焦与逐层下钻。
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
        - button "更新数据" [ref=e20] [cursor=pointer]
        - button "重播动效" [ref=e22] [cursor=pointer]
      - generic [ref=e24]:
        - generic [ref=e26]:
          - generic [ref=e28]:
            - heading "学习内容" [level=3] [ref=e29]
            - group "当前层级，可用键盘查看下级" [ref=e30]:
              - button "查看基础课程" [ref=e31] [cursor=pointer]:
                - generic [ref=e32]: 基础课程 · 270 人次
              - button "查看进阶课程" [ref=e33] [cursor=pointer]:
                - generic [ref=e34]: 进阶课程 · 354 人次
              - button "查看应用课程" [ref=e35] [cursor=pointer]:
                - generic [ref=e36]: 应用课程 · 438 人次
          - img "Sunburst chart of 学习内容" [ref=e38]:
            - generic [ref=e43] [cursor=pointer]
            - generic [ref=e45] [cursor=pointer]
            - generic [ref=e47] [cursor=pointer]
            - generic [ref=e49]:
              - generic: 基础课程
              - generic: 视频
              - generic: 阅读
              - generic: 练习
              - generic: 进阶课程
              - generic: 视频
              - generic: 阅读
              - generic: 练习
              - generic: 应用课程
              - generic: 视频
              - generic: 阅读
              - generic: 练习
          - generic [ref=e50]: 悬停读取；点击扇区或聚焦下级按钮按Enter、Space下钻，面包屑返回。
        - group [ref=e51]:
          - generic "查看精确数据" [ref=e52] [cursor=pointer]
      - status [ref=e53]: 示例数据 · 已更新 0 次
  - generic [ref=e54]:
    - heading "数据与使用边界" [level=2] [ref=e55]
    - paragraph [ref=e56]: 父项由叶项求和，父项不重复提供value。
    - paragraph [ref=e57]: 小扇区和深层数据通过提示及精确表补充读取。
    - paragraph [ref=e58]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e59] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - generic [ref=e61]:
    - region [ref=e62]:
      - heading "API 与结构" [level=2] [ref=e63]
      - table [ref=e65]:
        - caption [ref=e66]: 旭日图 常用接口
        - rowgroup [ref=e67]:
          - row [ref=e68]:
            - columnheader "名称" [ref=e69]
            - columnheader "类型" [ref=e70]
            - columnheader "默认" [ref=e71]
            - columnheader "说明" [ref=e72]
        - rowgroup [ref=e73]:
          - row [ref=e74]:
            - rowheader [ref=e75]:
              - code [ref=e76]: data / value
            - cell [ref=e77]:
              - code [ref=e78]: 原生图型合同
            - cell "—" [ref=e79]
            - cell "父项由叶项求和，父项不重复提供value。" [ref=e80]
          - row [ref=e81]:
            - rowheader [ref=e82]:
              - code [ref=e83]: children
            - cell [ref=e84]:
              - code [ref=e85]: Compound Parts
            - cell "—" [ref=e86]
            - cell "通过公共 charts 子入口组合图形、坐标、图例与 Tooltip；每个图型的实际 Parts 见完整源码。" [ref=e87]
          - row [ref=e88]:
            - rowheader [ref=e89]:
              - code [ref=e90]: className / style / margin
            - cell [ref=e91]:
              - code [ref=e92]: 原生尺寸接口
            - cell "—" [ref=e93]
            - cell "宿主容器需具有明确尺寸；Rain根节点为 rain-chart，配方为 data-recipe。" [ref=e94]
          - row [ref=e95]:
            - rowheader [ref=e96]:
              - code [ref=e97]: enterTransition / animationDuration
            - cell [ref=e98]:
              - code [ref=e99]: 原生动效配置
            - cell "—" [ref=e100]
            - cell "默认保留 Bklit 强度；减少动效时使用立即显示、关闭脉冲并暂停模拟生产者。" [ref=e101]
      - paragraph [ref=e102]: Parts / Slots：chart-root、legend、tooltip、精确数据（宿主提供）
    - region [ref=e103]:
      - heading "调用示例" [level=2] [ref=e104]
      - generic [ref=e105]:
        - generic [ref=e106]:
          - button "复制代码" [ref=e107] [cursor=pointer]
          - status
        - code [ref=e110]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-sunburst\" data-recipe=\"category-near\"> <ChartExample id=\"sunburst\" recipe=\"category-near\" revision={revision} reduced={reduced} state=\"normal\" size=\"standard\" miniSize=\"compact\" seriesCount={3} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e111]:
        - text: 当前源码：
        - code [ref=e112]: packages/ui/src/charts/vendor/charts/sunburst-chart.tsx
  - group [ref=e113]:
    - generic "调用配置、完整源码与示例数据" [ref=e114] [cursor=pointer]
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
  - region "全部图表变体" [ref=e115]:
    - navigation "变体分组" [ref=e116]:
      - button "图形材质" [ref=e117] [cursor=pointer]
      - button "交互与状态" [ref=e119] [cursor=pointer]
    - region [ref=e121]:
      - heading "图形材质" [level=2] [ref=e122]
      - region [ref=e124]:
        - generic [ref=e125]:
          - heading "Sunburst Chart - Patterns" [level=3] [ref=e126]
          - paragraph [ref=e127]: 指定内环扇区使用斜线图案
        - generic [ref=e128]:
          - generic [ref=e129]:
            - button "更新数据" [ref=e130] [cursor=pointer]
            - button "重播动效" [ref=e132] [cursor=pointer]
          - paragraph [ref=e135]: 滚动到此处查看示例
          - status [ref=e136]: 示例数据 · 已更新 0 次
          - group [ref=e137]:
            - generic "查看本卡代码" [ref=e138] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/structure.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e139] [cursor=pointer]:
          - /url: https://bklit.com/charts/sunburst-chart
          - generic [ref=e140]: 对应官网示例
          - generic [ref=e141]: （新标签页打开）
    - region [ref=e142]:
      - heading "交互与状态" [level=2] [ref=e143]
      - generic [ref=e144]:
        - region [ref=e145]:
          - generic [ref=e146]:
            - heading "Sunburst Chart - Interactive" [level=3] [ref=e147]
            - paragraph [ref=e148]: 层级构成、下钻与返回
          - generic [ref=e149]:
            - generic [ref=e150]:
              - button "更新数据" [ref=e151] [cursor=pointer]
              - button "重播动效" [ref=e153] [cursor=pointer]
            - paragraph [ref=e156]: 滚动到此处查看示例
            - status [ref=e157]: 示例数据 · 已更新 0 次
            - group [ref=e158]:
              - generic "查看本卡代码" [ref=e159] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/structure.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e160] [cursor=pointer]:
            - /url: https://bklit.com/charts/sunburst-chart
            - generic [ref=e161]: 对应官网示例
            - generic [ref=e162]: （新标签页打开）
        - region [ref=e163]:
          - generic [ref=e164]:
            - heading "Sunburst Chart - Legend" [level=3] [ref=e165]
            - paragraph [ref=e166]: 图例随当前层级及悬浮同步
          - generic [ref=e167]:
            - generic [ref=e168]:
              - button "更新数据" [ref=e169] [cursor=pointer]
              - button "重播动效" [ref=e171] [cursor=pointer]
            - paragraph [ref=e174]: 滚动到此处查看示例
            - status [ref=e175]: 示例数据 · 已更新 0 次
            - group [ref=e176]:
              - generic "查看本卡代码" [ref=e177] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/structure.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e178] [cursor=pointer]:
            - /url: https://bklit.com/charts/sunburst-chart
            - generic [ref=e179]: 对应官网示例
            - generic [ref=e180]: （新标签页打开）
  - navigation "相关图型" [ref=e181]:
    - link "面积图" [ref=e182] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e184] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e186] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e188] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e190] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e192] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e194] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e196] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e198] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e200] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e202] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e204] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e206] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e208] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e210] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e212] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e214] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e216] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e218] [cursor=pointer]:
      - /url: "#chart-network"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("Sunburst text entry retains the Rain text Button styles inside its chart host", async ({ page }) => {
  4  |   await page.goto("/#chart-sunburst");
  5  |   const entry = page.locator('[data-rain-id="chart-sunburst"]').getByRole("button", { name: "查看基础课程", exact: true });
  6  |   await expect(entry).toBeVisible();
  7  |   const styles = await entry.evaluate(button => {
  8  |     const control = button.cloneNode(true) as HTMLElement;
  9  |     control.setAttribute("aria-hidden", "true");
  10 |     control.style.position = "fixed";
  11 |     control.style.left = "-10000px";
  12 |     document.body.append(control);
  13 |     const reading = (node: Element) => {
  14 |       const css = getComputedStyle(node);
  15 |       return { borderWidth: css.borderTopWidth, background: css.backgroundColor, padding: [css.paddingTop, css.paddingRight, css.paddingBottom, css.paddingLeft], fontSize: css.fontSize, fontFamily: css.fontFamily, fontWeight: css.fontWeight, lineHeight: css.lineHeight };
  16 |     };
  17 |     const actual = reading(button);
  18 |     const reference = reading(control);
  19 |     control.remove();
  20 |     return { actual, reference };
  21 |   });
> 22 |   expect(styles.actual).toEqual(styles.reference);
     |                         ^ Error: expect(received).toEqual(expected) // deep equality
  23 | });
  24 | 
```