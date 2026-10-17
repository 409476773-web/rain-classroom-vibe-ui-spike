# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-structure.spec.ts >> sunburst starts with a title and uses the existing Breadcrumb after drill at 390px
- Location: tests/e2e/chart-feedback-structure.spec.ts:45:39

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "15px"
Received: "16px"
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
          - heading "学习内容" [level=3] [ref=e28]
          - img "Sunburst chart of 学习内容" [ref=e30]:
            - generic [ref=e49] [cursor=pointer]
            - generic [ref=e51] [cursor=pointer]
            - generic [ref=e53] [cursor=pointer]
            - generic [ref=e55]:
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
          - generic [ref=e56]: 悬停读取，点击扇区下钻；面包屑返回上层。
        - group [ref=e57]:
          - generic "查看精确数据" [ref=e58] [cursor=pointer]
      - status [ref=e59]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - generic [ref=e60]:
    - heading "数据与使用边界" [level=2] [ref=e61]
    - paragraph [ref=e62]: 父项由叶项求和，父项不重复提供value。
    - paragraph [ref=e63]: 小扇区和深层数据通过提示及精确表补充读取。
    - paragraph [ref=e64]: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；本页为浅色标准尺寸，迷你尺寸只在趋势图提供。
  - generic [ref=e65]:
    - region [ref=e66]:
      - heading "API 与结构" [level=2] [ref=e67]
      - table [ref=e69]:
        - caption [ref=e70]: 旭日图 常用接口
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
            - cell "父项由叶项求和，父项不重复提供value。" [ref=e84]
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
        - code [ref=e114]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig } from \"motion/react\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import { ChartExample } from \"./chart-examples\"; import { useChartReducedMotion } from \"./chart-variants/shared\"; function App() { const [revision, setRevision] = useState(0); const reduced = useChartReducedMotion(); return <MotionConfig reducedMotion=\"user\"> <main style={{ maxWidth: 880, margin: \"auto\", padding: \"var(--rain-space-24)\" }}> <button onClick={() => setRevision(value => value + 1)}>更新数据</button> <div className=\"rain-chart\" data-rain-id=\"chart-sunburst\" data-recipe=\"category-near\"> <ChartExample id=\"sunburst\" recipe=\"category-near\" revision={revision} reduced={reduced} /> </div> </main> </MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e115]:
        - text: 当前源码：
        - code [ref=e116]: packages/ui/src/charts/vendor/charts/sunburst-chart.tsx
  - group [ref=e117]:
    - generic "调用配置、完整源码与示例数据" [ref=e118] [cursor=pointer]
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
  - region "全部图表变体" [ref=e119]:
    - navigation "变体分组" [ref=e120]:
      - button "图形材质" [ref=e121] [cursor=pointer]
      - button "交互与状态" [ref=e123] [cursor=pointer]
    - region [ref=e125]:
      - heading "图形材质" [level=2] [ref=e126]
      - region [ref=e128]:
        - generic [ref=e129]:
          - heading "Sunburst Chart - Patterns" [level=3] [ref=e130]
          - paragraph [ref=e131]: 指定内环扇区使用斜线图案
        - generic [ref=e132]:
          - generic [ref=e133]:
            - button "更新数据" [ref=e134] [cursor=pointer]
            - button "重播动效" [ref=e136] [cursor=pointer]
          - paragraph [ref=e139]: 滚动到此处查看示例
          - status [ref=e140]: 示例数据 · 已更新 0 次 · 已减少动效
          - group [ref=e141]:
            - generic "查看本卡代码" [ref=e142] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/structure.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e143] [cursor=pointer]:
          - /url: https://bklit.com/charts/sunburst-chart
          - generic [ref=e144]: 对应官网示例
          - generic [ref=e145]: （新标签页打开）
    - region [ref=e146]:
      - heading "交互与状态" [level=2] [ref=e147]
      - generic [ref=e148]:
        - region [ref=e149]:
          - generic [ref=e150]:
            - heading "Sunburst Chart - Interactive" [level=3] [ref=e151]
            - paragraph [ref=e152]: 层级构成、下钻与返回
          - generic [ref=e153]:
            - generic [ref=e154]:
              - button "更新数据" [ref=e155] [cursor=pointer]
              - button "重播动效" [ref=e157] [cursor=pointer]
            - generic [ref=e159]:
              - generic [ref=e160]:
                - generic [ref=e161]:
                  - heading "学习内容" [level=3] [ref=e163]
                  - img "Sunburst chart of 学习内容" [ref=e165]:
                    - generic [ref=e184] [cursor=pointer]
                    - generic [ref=e186] [cursor=pointer]
                    - generic [ref=e188] [cursor=pointer]
                    - generic [ref=e190]:
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
                  - generic [ref=e191]: 点选内环查看下级；点中心或路径返回。
                - group "当前层级，可用键盘查看下级" [ref=e192]:
                  - button "查看基础课程" [ref=e193] [cursor=pointer]
                  - button "查看进阶课程" [ref=e195] [cursor=pointer]
                  - button "查看应用课程" [ref=e197] [cursor=pointer]
              - paragraph [ref=e199]: 学习内容构成 · 人。总量只累加叶项；内环是课程分类，外环是学习内容。
              - group [ref=e200]:
                - generic "查看精确数据" [ref=e201] [cursor=pointer]
            - status [ref=e202]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e203]:
              - generic "查看本卡代码" [ref=e204] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/structure.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e205] [cursor=pointer]:
            - /url: https://bklit.com/charts/sunburst-chart
            - generic [ref=e206]: 对应官网示例
            - generic [ref=e207]: （新标签页打开）
        - region [ref=e208]:
          - generic [ref=e209]:
            - heading "Sunburst Chart - Legend" [level=3] [ref=e210]
            - paragraph [ref=e211]: 图例随当前层级及悬浮同步
          - generic [ref=e212]:
            - generic [ref=e213]:
              - button "更新数据" [ref=e214] [cursor=pointer]
              - button "重播动效" [ref=e216] [cursor=pointer]
            - generic [ref=e218]:
              - generic [ref=e219]:
                - generic [ref=e220]:
                  - heading "学习内容" [level=3] [ref=e222]
                  - img "Sunburst chart of 学习内容" [ref=e224]:
                    - generic [ref=e243] [cursor=pointer]
                    - generic [ref=e245] [cursor=pointer]
                    - generic [ref=e247] [cursor=pointer]
                  - generic [ref=e249]: 点选内环查看下级；点中心或路径返回。
                - group "当前层级图例" [ref=e250]:
                  - generic [ref=e251]:
                    - button "基础课程，270 人，查看下级" [ref=e253] [cursor=pointer]:
                      - generic [ref=e254]:
                        - text: 基础课程
                        - generic [ref=e256]:
                          - generic [ref=e257]: 270 人
                          - generic [ref=e258]: 25%
                    - button "进阶课程，354 人，查看下级" [ref=e260] [cursor=pointer]:
                      - generic [ref=e261]:
                        - text: 进阶课程
                        - generic [ref=e263]:
                          - generic [ref=e264]: 354 人
                          - generic [ref=e265]: 33%
                    - button "应用课程，438 人，查看下级" [ref=e267] [cursor=pointer]:
                      - generic [ref=e268]:
                        - text: 应用课程
                        - generic [ref=e270]:
                          - generic [ref=e271]: 438 人
                          - generic [ref=e272]: 41%
              - paragraph [ref=e273]: 学习内容构成 · 人。总量只累加叶项；图例与当前层级、悬浮扇区同步。
              - group [ref=e274]:
                - generic "查看精确数据" [ref=e275] [cursor=pointer]
            - status [ref=e276]: 示例数据 · 已更新 0 次 · 已减少动效
            - group [ref=e277]:
              - generic "查看本卡代码" [ref=e278] [cursor=pointer]
              - option "main.tsx" [selected]
              - option "index.html"
              - option "chart-variants/structure.tsx"
              - option "chart-variants/shared.tsx"
              - option "chart-variants/data/README.md"
              - option "chart-variants/data/world.geojson"
              - option "chart-data.ts"
              - option "chart-catalog.ts"
              - option "chart-examples.css"
          - link "对应官网示例 （新标签页打开）" [ref=e279] [cursor=pointer]:
            - /url: https://bklit.com/charts/sunburst-chart
            - generic [ref=e280]: 对应官网示例
            - generic [ref=e281]: （新标签页打开）
  - navigation "相关图型" [ref=e282]:
    - link "面积图" [ref=e283] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e285] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e287] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e289] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e291] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e293] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e295] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e297] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e299] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e301] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e303] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e305] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e307] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e309] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e311] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e313] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e315] [cursor=pointer]:
      - /url: "#chart-live-line"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { mkdirSync } from "node:fs";
  3  | const evidence = "evidence/runtime/chart-variants/feedback-2026-10-08/structure";
  4  | test.beforeAll(() => mkdirSync(evidence, { recursive: true }));
  5  | test.beforeEach(async ({ page }) => { await page.emulateMedia({ reducedMotion: "reduce" }); });
  6  | 
  7  | for (const width of [1280, 880, 390]) test(`calendar month, quarter and weekday labels occupy separate aligned tracks at ${width}px`, async ({ page }) => {
  8  |   await page.setViewportSize({ width, height: 796 });
  9  |   await page.goto("/#chart-heatmap");
  10 |   const card = page.locator('[data-chart-variant="heatmap-contributions"]');
  11 |   await card.scrollIntoViewIfNeeded();
  12 |   const root = card.locator('[data-slot="chart-root"]');
  13 |   const month = root.getByText("Oct", { exact: true });
  14 |   const quarter = root.getByText("Q4", { exact: true });
  15 |   await expect(month).toBeVisible(); await expect(quarter).toBeVisible();
  16 |   const monthBox = (await month.boundingBox())!, quarterBox = (await quarter.boundingBox())!;
  17 |   expect(quarterBox.y).toBeGreaterThanOrEqual(monthBox.y + monthBox.height + 2);
  18 |   const labels = await root.locator("span").evaluateAll(nodes => nodes.filter(node => /^(M|W|F)$/.test(node.textContent ?? "")).map(node => { const r = node.getBoundingClientRect(); return { top: r.top, bottom: r.bottom }; }).sort((a, b) => a.top - b.top));
  19 |   expect(labels).toHaveLength(3);
  20 |   for (let index = 1; index < labels.length; index++) expect(labels[index]!.top).toBeGreaterThanOrEqual(labels[index - 1]!.bottom);
  21 |   const months = await root.locator("span").evaluateAll(nodes => nodes.filter(node => /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/.test(node.textContent ?? "")).map(node => { const r = node.getBoundingClientRect(); return { left: r.left, right: r.right }; }).sort((a, b) => a.left - b.left));
  22 |   expect(months).toHaveLength(12);
  23 |   for (let index = 1; index < months.length; index++) expect(months[index]!.left).toBeGreaterThanOrEqual(months[index - 1]!.right);
  24 |   expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  25 |   await card.screenshot({ path: `${evidence}/calendar-contributions-${width}.png` });
  26 |   const example = page.locator("main.component-doc > section.component-doc__example").first();
  27 |   await example.scrollIntoViewIfNeeded();
  28 |   await expect(example.locator('[data-rain-id="ui-chart-heatmap"] svg')).toBeVisible();
  29 |   await example.screenshot({ path: `${evidence}/calendar-default-${width}.png` });
  30 | });
  31 | 
  32 | for (const width of [1280, 880, 390]) test(`the default geographic example renders actual world outlines at ${width}px`, async ({ page }) => {
  33 |   await page.setViewportSize({ width, height: 796 });
  34 |   await page.goto("/#chart-choropleth");
  35 |   const example = page.locator("main.component-doc > section.component-doc__example").first();
  36 |   await expect(example.locator("svg path")).toHaveCount(177);
  37 |   await expect(example).toContainText("Natural Earth");
  38 |   const map = example.locator('[data-rain-id="ui-chart-choropleth"]');
  39 |   const box = (await map.boundingBox())!;
  40 |   expect(Math.abs(box.width / box.height - 16 / 9)).toBeLessThan(.02);
  41 |   expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  42 |   await example.screenshot({ path: `${evidence}/world-default-${width}.png` });
  43 | });
  44 | 
  45 | for (const width of [1280, 880, 390]) test(`sunburst starts with a title and uses the existing Breadcrumb after drill at ${width}px`, async ({ page }) => {
  46 |   await page.setViewportSize({ width, height: 796 });
  47 |   await page.goto("/#chart-sunburst");
  48 |   const card = page.locator('[data-chart-variant="sunburst-legend"]');
  49 |   await card.scrollIntoViewIfNeeded();
  50 |   const title = card.getByRole("heading", { name: "学习内容", exact: true });
  51 |   await expect(title).toBeVisible();
> 52 |   expect(await title.evaluate(node => getComputedStyle(node).fontSize)).toBe("15px");
     |                                                                         ^ Error: expect(received).toBe(expected) // Object.is equality
  53 |   const legend = card.getByRole("group", { name: "当前层级图例" });
  54 |   await legend.getByRole("button", { name: /基础课程/ }).click();
  55 |   const breadcrumb = card.locator('[data-rain-id="ui-breadcrumb"]');
  56 |   await expect(breadcrumb).toBeVisible();
  57 |   await expect(card.getByRole("navigation", { name: "学习内容层级" })).toHaveCount(1);
  58 |   await expect(breadcrumb.locator("nav")).toHaveCount(0);
  59 |   await expect(breadcrumb.getByText("基础课程", { exact: true })).toHaveAttribute("aria-current", "page");
  60 |   await card.screenshot({ path: `${evidence}/sunburst-breadcrumb-${width}.png` });
  61 |   await breadcrumb.getByRole("link", { name: "返回学习内容" }).click();
  62 |   await expect(title).toBeVisible(); await expect(legend).toContainText("进阶课程");
  63 |   await card.screenshot({ path: `${evidence}/sunburst-root-title-${width}.png` });
  64 |   const example = page.locator("main.component-doc > section.component-doc__example").first();
  65 |   await example.scrollIntoViewIfNeeded();
  66 |   await expect(example.getByRole("heading", { name: "学习内容", exact: true })).toBeVisible();
  67 |   await example.screenshot({ path: `${evidence}/sunburst-default-title-${width}.png` });
  68 | });
  69 | 
```