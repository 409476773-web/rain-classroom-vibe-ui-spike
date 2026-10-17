# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-refinement.spec.ts >> prototype 390px >> prototype all sunburst titles and drilled Breadcrumbs are centered at 390
- Location: tests/e2e/chart-feedback-refinement.spec.ts:83:3

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 2
Received:   110
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - heading "Rain 图表库" [level=1] [ref=e6]
      - paragraph [ref=e7]: 17种图型，Rain 配色与字体，Bklit 原生动效与交互。
    - link "查看原生与 Rain 对照" [ref=e8] [cursor=pointer]:
      - /url: /bklit-validation.html
  - generic [ref=e9]:
    - navigation "图型目录" [ref=e10]:
      - link "面积图" [ref=e11] [cursor=pointer]:
        - /url: "#chart-area"
      - link "折线图" [ref=e12] [cursor=pointer]:
        - /url: "#chart-line"
      - link "柱状图" [ref=e13] [cursor=pointer]:
        - /url: "#chart-bar"
      - link "组合图" [ref=e14] [cursor=pointer]:
        - /url: "#chart-composed"
      - link "饼图 / 环饼" [ref=e15] [cursor=pointer]:
        - /url: "#chart-pie"
      - link "多目标进度环" [ref=e16] [cursor=pointer]:
        - /url: "#chart-ring"
      - link "雷达图" [ref=e17] [cursor=pointer]:
        - /url: "#chart-radar"
      - link "时间散点" [ref=e18] [cursor=pointer]:
        - /url: "#chart-scatter"
      - link "漏斗图" [ref=e19] [cursor=pointer]:
        - /url: "#chart-funnel"
      - link "仪表图" [ref=e20] [cursor=pointer]:
        - /url: "#chart-gauge"
      - link "桑基图" [ref=e21] [cursor=pointer]:
        - /url: "#chart-sankey"
      - link "旭日图" [ref=e22] [cursor=pointer]:
        - /url: "#chart-sunburst"
      - link "日历热图" [ref=e23] [cursor=pointer]:
        - /url: "#chart-heatmap"
      - link "分区地图" [ref=e24] [cursor=pointer]:
        - /url: "#chart-choropleth"
      - link "K线图" [ref=e25] [cursor=pointer]:
        - /url: "#chart-candlestick"
      - link "盈亏线" [ref=e26] [cursor=pointer]:
        - /url: "#chart-profit-loss"
      - link "实时折线" [ref=e27] [cursor=pointer]:
        - /url: "#chart-live-line"
    - region [ref=e28]:
      - heading "旭日图" [level=2] [ref=e29]
      - paragraph [ref=e30]: 课程内容层级、扇区聚焦与逐层下钻。
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e33]:
            - option "蓝紫近邻" [selected]
            - option "多色类别"
            - option "协调实色"
            - option "蓝灰单色"
        - generic [ref=e34]:
          - text: 示例状态
          - combobox "示例状态" [ref=e35]:
            - option "正常数据" [selected]
            - option "无数据"
            - option "零值"
            - option "长标签"
            - option "单项／单点"
            - option "缺测"
            - option "无效数据"
        - button "更新数据" [ref=e36] [cursor=pointer]
        - button "重播动效" [ref=e37] [cursor=pointer]
        - button "对照实例" [ref=e38] [cursor=pointer]
      - generic [ref=e39]:
        - generic [ref=e41]:
          - heading "学习内容" [level=3] [ref=e43]
          - img "Sunburst chart of 学习内容" [ref=e45]:
            - generic [ref=e64] [cursor=pointer]
            - generic [ref=e66] [cursor=pointer]
            - generic [ref=e68] [cursor=pointer]
            - generic [ref=e70]:
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
          - generic [ref=e71]: 悬停读取，点击扇区下钻；面包屑返回上层。
        - group [ref=e72]:
          - generic "查看精确数据" [ref=e73] [cursor=pointer]
      - status [ref=e74]: 示例数据 · 已按系统设置减少动效
      - paragraph [ref=e75]:
        - strong [ref=e76]: 数据要求：
        - text: 父项由叶项求和，父项不重复提供value。
      - paragraph [ref=e77]:
        - strong [ref=e78]: 使用边界：
        - text: 小扇区和深层数据通过提示及精确表补充读取。
      - group [ref=e79]:
        - generic "调用配置、完整源码与示例数据" [ref=e80] [cursor=pointer]
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
      - region "全部图表变体" [ref=e81]:
        - navigation "变体分组" [ref=e82]:
          - button "图形材质" [ref=e83] [cursor=pointer]
          - button "交互与状态" [ref=e84] [cursor=pointer]
        - region [ref=e85]:
          - heading "图形材质" [level=2] [ref=e86]
          - region [ref=e88]:
            - generic [ref=e89]:
              - heading "Sunburst Chart - Patterns" [level=3] [ref=e90]
              - paragraph [ref=e91]: 指定内环扇区使用斜线图案
            - generic [ref=e92]:
              - generic [ref=e93]:
                - button "更新数据" [ref=e94] [cursor=pointer]
                - button "重播动效" [ref=e96] [cursor=pointer]
              - generic [ref=e98]:
                - generic [ref=e99]:
                  - generic [ref=e100]:
                    - heading "学习内容" [level=3] [ref=e102]
                    - img "Sunburst chart of 学习内容" [ref=e104]:
                      - generic [ref=e123] [cursor=pointer]
                      - generic [ref=e125] [cursor=pointer]
                      - generic [ref=e127] [cursor=pointer]
                    - generic [ref=e129]: 点选内环查看下级；点中心或路径返回。
                  - group "当前层级，可用键盘查看下级" [ref=e130]:
                    - button "查看基础课程" [ref=e131] [cursor=pointer]
                    - button "查看进阶课程" [ref=e133] [cursor=pointer]
                    - button "查看应用课程" [ref=e135] [cursor=pointer]
                - paragraph [ref=e137]: 学习内容构成 · 人。总量只累加叶项；内环是课程分类，外环是学习内容。
                - group [ref=e138]:
                  - generic "查看精确数据" [ref=e139] [cursor=pointer]
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
            - link "对应官网示例（新标签页打开）" [ref=e143] [cursor=pointer]:
              - /url: https://bklit.com/charts/sunburst-chart
        - region [ref=e144]:
          - heading "交互与状态" [level=2] [ref=e145]
          - generic [ref=e146]:
            - region [ref=e147]:
              - generic [ref=e148]:
                - heading "Sunburst Chart - Interactive" [level=3] [ref=e149]
                - paragraph [ref=e150]: 层级构成、下钻与返回
              - generic [ref=e151]:
                - generic [ref=e152]:
                  - button "更新数据" [ref=e153] [cursor=pointer]
                  - button "重播动效" [ref=e155] [cursor=pointer]
                - generic [ref=e157]:
                  - generic [ref=e158]:
                    - generic [ref=e159]:
                      - heading "学习内容" [level=3] [ref=e161]
                      - img "Sunburst chart of 学习内容" [ref=e163]:
                        - generic [ref=e182] [cursor=pointer]
                        - generic [ref=e184] [cursor=pointer]
                        - generic [ref=e186] [cursor=pointer]
                        - generic [ref=e188]:
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
                      - generic [ref=e189]: 点选内环查看下级；点中心或路径返回。
                    - group "当前层级，可用键盘查看下级" [ref=e190]:
                      - button "查看基础课程" [ref=e191] [cursor=pointer]
                      - button "查看进阶课程" [ref=e193] [cursor=pointer]
                      - button "查看应用课程" [ref=e195] [cursor=pointer]
                  - paragraph [ref=e197]: 学习内容构成 · 人。总量只累加叶项；内环是课程分类，外环是学习内容。
                  - group [ref=e198]:
                    - generic "查看精确数据" [ref=e199] [cursor=pointer]
                - status [ref=e200]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e201]:
                  - generic "查看本卡代码" [ref=e202] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/structure.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e203] [cursor=pointer]:
                - /url: https://bklit.com/charts/sunburst-chart
            - region [ref=e204]:
              - generic [ref=e205]:
                - heading "Sunburst Chart - Legend" [level=3] [ref=e206]
                - paragraph [ref=e207]: 图例随当前层级及悬浮同步
              - generic [ref=e208]:
                - generic [ref=e209]:
                  - button "更新数据" [ref=e210] [cursor=pointer]
                  - button "重播动效" [ref=e212] [cursor=pointer]
                - paragraph [ref=e215]: 滚动到此处查看示例
                - status [ref=e216]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e217]:
                  - generic "查看本卡代码" [ref=e218] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/structure.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e219] [cursor=pointer]:
                - /url: https://bklit.com/charts/sunburst-chart
```

# Test source

```ts
  1  | import { expect, test, type Locator } from "@playwright/test";
  2  | import { mkdir } from "node:fs/promises";
  3  | 
  4  | const evidence = process.env.RAIN_CHART_REFINEMENT_EVIDENCE_DIR ?? "evidence/runtime/chart-variants/feedback-2026-10-08-round2/browser";
  5  | test.beforeAll(() => mkdir(evidence, { recursive: true }));
  6  | const centerX = async (plot: Locator) => { const box = (await plot.boundingBox())!; return box.x + box.width / 2; };
  7  | async function centeredHeading(card: Locator) {
  8  |   const text = card.locator(".rain-chart-sunburst-title");
  9  |   const x = await text.evaluate(node => { const range = document.createRange(); range.selectNodeContents(node); const box = range.getBoundingClientRect(); return box.x + box.width / 2; });
> 10 |   expect(Math.abs(x - await centerX(card.locator('[data-rain-id="ui-chart-sunburst"] svg').first()))).toBeLessThan(2);
     |                                                                                                       ^ Error: expect(received).toBeLessThan(expected)
  11 | }
  12 | async function centeredTrail(card: Locator) {
  13 |   const trail = card.getByRole("navigation", { name: "学习内容层级" });
  14 |   const x = await trail.locator("ol").evaluate(node => { const boxes = [...node.children].map(child => child.getBoundingClientRect()); return (Math.min(...boxes.map(box => box.left)) + Math.max(...boxes.map(box => box.right))) / 2; });
  15 |   expect(Math.abs(x - await centerX(card.locator('[data-rain-id="ui-chart-sunburst"] svg').first()))).toBeLessThan(2);
  16 | }
  17 | 
  18 | for (const site of [
  19 |   { name: "playground", base: "http://127.0.0.1:5173/" },
  20 |   { name: "prototype", base: "http://127.0.0.1:5387/bklit-catalog.html" },
  21 | ]) for (const width of [1197, 390]) test.describe(`${site.name} ${width}px`, () => {
  22 |   test.beforeEach(async ({ page }) => { await page.setViewportSize({ width, height: 796 }); await page.emulateMedia({ reducedMotion: "reduce" }); });
  23 |   test(`${site.name} pie legend hover has no shadow at ${width}`, async ({ page }) => {
  24 |     await page.goto(`${site.base}#chart-pie`);
  25 |     const card = page.locator('[data-chart-variant="pie-legend"]');
  26 |     await card.scrollIntoViewIfNeeded();
  27 |     await card.locator(".rain-chart-variant-legend-item").nth(1).focus();
  28 |     await expect(card.locator(".rain-chart-center-label")).toHaveText("研讨课");
  29 |     await page.waitForTimeout(300);
  30 |     const filters = await card.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).filter));
  31 |     expect(filters.length).toBeGreaterThan(0);
  32 |     expect(filters.every(filter => filter === "none")).toBe(true);
  33 |     await card.screenshot({ path: `${evidence}/${site.name}-pie-legend-hover-${width}.png` });
  34 |   });
  35 |   test(`${site.name} every ring has only a centered percentage and label at ${width}`, async ({ page }) => {
  36 |     await page.goto(`${site.base}#chart-ring`);
  37 |     for (const card of await page.locator('[data-chart-variant^="ring-"]').all()) {
  38 |       await card.scrollIntoViewIfNeeded();
  39 |       const reading = card.locator(".rain-chart-center-reading");
  40 |       await expect(reading).toHaveText("70.0%阅读进度");
  41 |       const svg = card.locator("svg").first();
  42 |       const box = (await reading.boundingBox())!, plot = (await svg.boundingBox())!;
  43 |       expect(Math.abs(box.x + box.width / 2 - plot.x - plot.width / 2)).toBeLessThan(2);
  44 |       expect(Math.abs(box.y + box.height / 2 - plot.y - plot.height / 2)).toBeLessThan(2);
  45 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  46 |     }
  47 |     const legend = page.locator('[data-chart-variant="ring-legend"]');
  48 |     await legend.scrollIntoViewIfNeeded();
  49 |     await legend.getByRole("button", { name: /^练习进度/ }).focus();
  50 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("66.7%练习进度");
  51 |     await expect(legend.getByRole("progressbar", { name: "练习进度进度" })).toHaveAttribute("aria-valuemax", "12");
  52 |   });
  53 |   test(`${site.name} reference range dashed boundaries stay light at ${width}`, async ({ page }) => {
  54 |     for (const family of ["bar", "area", "line", "scatter", "candlestick"]) {
  55 |       await page.goto(`${site.base}#chart-${family}`);
  56 |       const card = page.locator(`[data-chart-variant="${family}-reference-band"]`);
  57 |       await card.scrollIntoViewIfNeeded();
  58 |       const lines = card.locator(".chart-reference-area line[stroke-dasharray]");
  59 |       await expect(lines).toHaveCount(2);
  60 |       expect(await lines.evaluateAll(nodes => nodes.every(node => Number(getComputedStyle(node).strokeOpacity) <= .25))).toBe(true);
  61 |       await card.screenshot({ path: `${evidence}/${site.name}-${family}-reference-band-${width}.png` });
  62 |     }
  63 |   });
  64 |   test(`${site.name} every heatmap legend has room below its calendar at ${width}`, async ({ page }) => {
  65 |     await page.goto(`${site.base}#chart-heatmap`);
  66 |     for (const card of await page.locator('[data-chart-variant^="heatmap-"]').all()) {
  67 |       await card.scrollIntoViewIfNeeded();
  68 |       const legend = card.getByText(/^(少|低耗时)$/).locator("..");
  69 |       await expect(legend).toBeVisible();
  70 |       const cells = card.locator(".visx-heatmap-rects rect");
  71 |       const bottom = await cells.evaluateAll(nodes => Math.max(...nodes.map(node => node.getBoundingClientRect().bottom)));
  72 |       const box = (await legend.boundingBox())!;
  73 |       expect(box.y - bottom).toBeGreaterThanOrEqual(16);
  74 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  75 |     }
  76 |     const example = page.locator('main [data-rain-id="chart-heatmap"]').first();
  77 |     const legend = example.getByText("少", { exact: true }).locator("..");
  78 |     await expect(legend).toBeVisible();
  79 |     expect((await legend.boundingBox())!.height).toBeGreaterThan(0);
  80 |     await example.screenshot({ path: `${evidence}/${site.name}-heatmap-default-example-${width}.png` });
  81 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  82 |   });
  83 |   test(`${site.name} all sunburst titles and drilled Breadcrumbs are centered at ${width}`, async ({ page }) => {
  84 |     await page.goto(`${site.base}#chart-sunburst`);
  85 |     for (const card of await page.locator('[data-chart-variant^="sunburst-"]').all()) {
  86 |       await card.scrollIntoViewIfNeeded();
  87 |       await centeredHeading(card);
  88 |       await card.getByRole("button", { name: /基础课程/ }).click();
  89 |       await centeredTrail(card);
  90 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-drill-${width}.png` });
  91 |       await card.getByRole("link", { name: "返回学习内容" }).click();
  92 |       await centeredHeading(card);
  93 |     }
  94 |     const example = page.locator('main [data-rain-id="chart-sunburst"]').first();
  95 |     await example.scrollIntoViewIfNeeded();
  96 |     await centeredHeading(example);
  97 |   });
  98 | });
  99 | 
```