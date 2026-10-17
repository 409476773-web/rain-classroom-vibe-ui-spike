# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-refinement.spec.ts >> prototype pie legend hover has no shadow at 390
- Location: tests/e2e/chart-feedback-refinement.spec.ts:23:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
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
      - heading "饼图 / 环饼" [level=2] [ref=e29]
      - paragraph [ref=e30]: 类别构成与原生扇区聚焦，支持环饼形态。
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
        - generic [ref=e36]:
          - text: 系列数
          - combobox "系列数" [ref=e37]:
            - option "3系列" [selected]
            - option "5系列"
        - button "更新数据" [ref=e38] [cursor=pointer]
        - button "重播动效" [ref=e39] [cursor=pointer]
        - button "对照实例" [ref=e40] [cursor=pointer]
      - generic [ref=e41]:
        - generic [ref=e42]:
          - text: 形态
          - combobox "饼图形态" [ref=e43] [cursor=pointer]:
            - option "环饼" [selected]
            - option "饼图"
        - generic [ref=e47]:
          - img [ref=e48]:
            - generic [ref=e49]:
              - generic [ref=e50] [cursor=pointer]
              - generic [ref=e52] [cursor=pointer]
              - generic [ref=e54] [cursor=pointer]
          - generic:
            - generic:
              - generic:
                - img "764":
                  - generic:
                    - generic:
                      - generic:
                        - generic: "7"
                        - generic: "6"
                        - generic: "4"
              - generic: 课程总量
        - generic [ref=e56]:
          - button "课程一 320" [ref=e58] [cursor=pointer]:
            - generic [ref=e60]: 课程一
            - generic [ref=e61]: "320"
          - button "课程二 248" [ref=e63] [cursor=pointer]:
            - generic [ref=e65]: 课程二
            - generic [ref=e66]: "248"
          - button "课程三 196" [ref=e68] [cursor=pointer]:
            - generic [ref=e70]: 课程三
            - generic [ref=e71]: "196"
        - status [ref=e72]: 合计 764 · 各类别互斥
        - group [ref=e73]:
          - generic "查看精确数据" [ref=e74] [cursor=pointer]
      - status [ref=e75]: 示例数据 · 已按系统设置减少动效
      - paragraph [ref=e76]:
        - strong [ref=e77]: 数据要求：
        - text: 互斥类别非负值，分母为所有类别总量。
      - paragraph [ref=e78]:
        - strong [ref=e79]: 使用边界：
        - text: 零总量不生成占比；较多小扇区需精确表辅助。
      - group [ref=e80]:
        - generic "调用配置、完整源码与示例数据" [ref=e81] [cursor=pointer]
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
      - region "全部图表变体" [ref=e82]:
        - navigation "变体分组" [ref=e83]:
          - button "基础结构" [ref=e84] [cursor=pointer]
          - button "图形材质" [ref=e85] [cursor=pointer]
          - button "坐标与辅助读数" [ref=e86] [cursor=pointer]
          - button "交互与状态" [ref=e87] [cursor=pointer]
        - region [ref=e88]:
          - heading "基础结构" [level=2] [ref=e89]
          - generic [ref=e90]:
            - region [ref=e91]:
              - generic [ref=e92]:
                - heading "Pie Chart" [level=3] [ref=e93]
                - paragraph [ref=e94]: 互斥类别的实心饼图
              - generic [ref=e95]:
                - generic [ref=e96]:
                  - button "更新数据" [ref=e97] [cursor=pointer]
                  - button "重播动效" [ref=e99] [cursor=pointer]
                - paragraph [ref=e102]: 滚动到此处查看示例
                - status [ref=e103]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e104]:
                  - generic "查看本卡代码" [ref=e105] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e106] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e107]:
              - generic [ref=e108]:
                - heading "Pie Chart - Donut" [level=3] [ref=e109]
                - paragraph [ref=e110]: 空心环饼与动态中心读数
              - generic [ref=e111]:
                - generic [ref=e112]:
                  - button "更新数据" [ref=e113] [cursor=pointer]
                  - button "重播动效" [ref=e115] [cursor=pointer]
                - paragraph [ref=e118]: 滚动到此处查看示例
                - status [ref=e119]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e120]:
                  - generic "查看本卡代码" [ref=e121] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e122] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
        - region [ref=e123]:
          - heading "图形材质" [level=2] [ref=e124]
          - generic [ref=e125]:
            - region [ref=e126]:
              - generic [ref=e127]:
                - heading "Pie Chart - Patterns" [level=3] [ref=e128]
                - paragraph [ref=e129]: 每扇区的斜线图案
              - generic [ref=e130]:
                - generic [ref=e131]:
                  - button "更新数据" [ref=e132] [cursor=pointer]
                  - button "重播动效" [ref=e134] [cursor=pointer]
                - paragraph [ref=e137]: 滚动到此处查看示例
                - status [ref=e138]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e139]:
                  - generic "查看本卡代码" [ref=e140] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e141] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e142]:
              - generic [ref=e143]:
                - heading "Pie Chart - Gradients" [level=3] [ref=e144]
                - paragraph [ref=e145]: 各扇区径向渐变
              - generic [ref=e146]:
                - generic [ref=e147]:
                  - button "更新数据" [ref=e148] [cursor=pointer]
                  - button "重播动效" [ref=e150] [cursor=pointer]
                - paragraph [ref=e152]: 本卡使用独立示例配色，保留材质或色阶差异。
                - paragraph [ref=e154]: 滚动到此处查看示例
                - status [ref=e155]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e156]:
                  - generic "查看本卡代码" [ref=e157] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e158] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e159]:
              - generic [ref=e160]:
                - heading "Donut Chart - Patterns" [level=3] [ref=e161]
                - paragraph [ref=e162]: 图案环饼与中心标签
              - generic [ref=e163]:
                - generic [ref=e164]:
                  - button "更新数据" [ref=e165] [cursor=pointer]
                  - button "重播动效" [ref=e167] [cursor=pointer]
                - paragraph [ref=e170]: 滚动到此处查看示例
                - status [ref=e171]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e172]:
                  - generic "查看本卡代码" [ref=e173] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e174] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
        - region [ref=e175]:
          - heading "坐标与辅助读数" [level=2] [ref=e176]
          - region [ref=e178]:
            - generic [ref=e179]:
              - heading "Pie Chart - Custom Center" [level=3] [ref=e180]
              - paragraph [ref=e181]: 定制中心内容与读数
            - generic [ref=e182]:
              - generic [ref=e183]:
                - button "更新数据" [ref=e184] [cursor=pointer]
                - button "重播动效" [ref=e186] [cursor=pointer]
              - generic [ref=e188]:
                - generic [ref=e189]:
                  - text: 示例状态
                  - combobox "饼图示例状态" [ref=e190] [cursor=pointer]:
                    - option "正常" [selected]
                    - option "总量为0"
                    - option "长中心文案"
                - generic [ref=e194]:
                  - img [ref=e195]:
                    - generic [ref=e196]:
                      - generic [ref=e197] [cursor=pointer]
                      - generic [ref=e199] [cursor=pointer]
                      - generic [ref=e201] [cursor=pointer]
                      - generic [ref=e203] [cursor=pointer]
                  - generic:
                    - generic:
                      - generic:
                        - img "500":
                          - generic:
                            - generic:
                              - generic:
                                - generic: "5"
                                - generic: "0"
                                - generic: "0"
                        - text: 人
                      - generic: 课程人数
                - status [ref=e205]: 分母为全部类别合计 500 人；各类别互斥。
                - group [ref=e206]:
                  - generic "查看精确数据" [ref=e207] [cursor=pointer]
              - status [ref=e208]: 示例数据 · 已更新 0 次 · 已减少动效
              - group [ref=e209]:
                - generic "查看本卡代码" [ref=e210] [cursor=pointer]
                - option "main.tsx" [selected]
                - option "index.html"
                - option "chart-variants/radial.tsx"
                - option "chart-variants/shared.tsx"
                - option "chart-variants/data/README.md"
                - option "chart-variants/data/world.geojson"
                - option "chart-data.ts"
                - option "chart-catalog.ts"
                - option "chart-examples.css"
            - link "对应官网示例（新标签页打开）" [ref=e211] [cursor=pointer]:
              - /url: https://bklit.com/charts/pie-chart
        - region [ref=e212]:
          - heading "交互与状态" [level=2] [ref=e213]
          - generic [ref=e214]:
            - region [ref=e215]:
              - generic [ref=e216]:
                - heading "Pie Chart - Legend" [level=3] [ref=e217]
                - paragraph [ref=e218]: 图例与扇区悬浮联动
              - generic [ref=e219]:
                - generic [ref=e220]:
                  - button "更新数据" [ref=e221] [cursor=pointer]
                  - button "重播动效" [ref=e223] [cursor=pointer]
                - generic [ref=e225]:
                  - generic [ref=e229]:
                    - img [ref=e230]:
                      - generic [ref=e231]:
                        - generic [ref=e232] [cursor=pointer]
                        - generic [ref=e234] [cursor=pointer]
                        - generic [ref=e236] [cursor=pointer]
                        - generic [ref=e238] [cursor=pointer]
                    - generic:
                      - generic:
                        - generic:
                          - img "142":
                            - generic:
                              - generic:
                                - generic:
                                  - generic: "1"
                                  - generic: "4"
                                  - generic: "2"
                          - text: 人
                        - generic: 研讨课
                  - generic "类别图例" [ref=e240]:
                    - button "讲授课 186 人" [ref=e241] [cursor=pointer]:
                      - generic [ref=e243]: 讲授课
                      - generic [ref=e244]: 186 人
                    - button "研讨课 142 人" [active] [ref=e245] [cursor=pointer]:
                      - generic [ref=e247]: 研讨课
                      - generic [ref=e248]: 142 人
                    - button "实验课 98 人" [ref=e249] [cursor=pointer]:
                      - generic [ref=e251]: 实验课
                      - generic [ref=e252]: 98 人
                    - button "实践课 74 人" [ref=e253] [cursor=pointer]:
                      - generic [ref=e255]: 实践课
                      - generic [ref=e256]: 74 人
                  - status [ref=e257]: 研讨课：142 人，占 28.4%
                  - group [ref=e259]:
                    - generic "查看精确数据" [ref=e260] [cursor=pointer]
                - status [ref=e261]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e262]:
                  - generic "查看本卡代码" [ref=e263] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e264] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e265]:
              - generic [ref=e266]:
                - heading "Pie Chart - Grow Hover" [level=3] [ref=e267]
                - paragraph [ref=e268]: 悬浮时增大外径
              - generic [ref=e269]:
                - generic [ref=e270]:
                  - button "更新数据" [ref=e271] [cursor=pointer]
                  - button "重播动效" [ref=e273] [cursor=pointer]
                - generic [ref=e275]:
                  - img [ref=e280]:
                    - generic [ref=e281]:
                      - generic [ref=e282] [cursor=pointer]
                      - generic [ref=e284] [cursor=pointer]
                      - generic [ref=e286] [cursor=pointer]
                      - generic [ref=e288] [cursor=pointer]
                  - status [ref=e290]: 分母为全部类别合计 500 人；各类别互斥。
                  - group [ref=e291]:
                    - generic "查看精确数据" [ref=e292] [cursor=pointer]
                - status [ref=e293]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e294]:
                  - generic "查看本卡代码" [ref=e295] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e296] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e297]:
              - generic [ref=e298]:
                - heading "Donut Chart - Grow Hover" [level=3] [ref=e299]
                - paragraph [ref=e300]: 环饼悬浮增大外径并联动中心值
              - generic [ref=e301]:
                - generic [ref=e302]:
                  - button "更新数据" [ref=e303] [cursor=pointer]
                  - button "重播动效" [ref=e305] [cursor=pointer]
                - paragraph [ref=e308]: 滚动到此处查看示例
                - status [ref=e309]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e310]:
                  - generic "查看本卡代码" [ref=e311] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e312] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
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
  10 |   expect(Math.abs(x - await centerX(card.locator('[data-rain-id="ui-chart-sunburst"] svg').first()))).toBeLessThan(2);
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
  21 | ]) for (const width of [1197, 390]) {
  22 |   test.beforeEach(async ({ page }) => { await page.setViewportSize({ width, height: 796 }); await page.emulateMedia({ reducedMotion: "reduce" }); });
  23 |   test(`${site.name} pie legend hover has no shadow at ${width}`, async ({ page }) => {
  24 |     await page.goto(`${site.base}#chart-pie`);
  25 |     const card = page.locator('[data-chart-variant="pie-legend"]');
  26 |     await card.scrollIntoViewIfNeeded();
  27 |     await card.locator(".rain-chart-variant-legend-item").nth(1).focus();
  28 |     await page.waitForTimeout(300);
  29 |     const filters = await card.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).filter));
  30 |     expect(filters.length).toBeGreaterThan(0);
> 31 |     expect(filters.every(filter => filter === "none")).toBe(true);
     |                                                        ^ Error: expect(received).toBe(expected) // Object.is equality
  32 |     await card.screenshot({ path: `${evidence}/${site.name}-pie-legend-hover-${width}.png` });
  33 |   });
  34 |   test(`${site.name} every ring has only a centered percentage and label at ${width}`, async ({ page }) => {
  35 |     await page.goto(`${site.base}#chart-ring`);
  36 |     for (const card of await page.locator('[data-chart-variant^="ring-"]').all()) {
  37 |       await card.scrollIntoViewIfNeeded();
  38 |       const reading = card.locator(".rain-chart-center-reading");
  39 |       await expect(reading).toHaveText("70.0%阅读进度");
  40 |       const svg = card.locator("svg").first();
  41 |       const box = (await reading.boundingBox())!, plot = (await svg.boundingBox())!;
  42 |       expect(Math.abs(box.x + box.width / 2 - plot.x - plot.width / 2)).toBeLessThan(2);
  43 |       expect(Math.abs(box.y + box.height / 2 - plot.y - plot.height / 2)).toBeLessThan(2);
  44 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  45 |     }
  46 |     const legend = page.locator('[data-chart-variant="ring-legend"]');
  47 |     await legend.scrollIntoViewIfNeeded();
  48 |     await legend.getByRole("button", { name: /^练习进度/ }).focus();
  49 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("66.7%练习进度");
  50 |     await expect(legend.getByRole("progressbar", { name: "练习进度进度" })).toHaveAttribute("aria-valuemax", "12");
  51 |   });
  52 |   test(`${site.name} reference range dashed boundaries stay light at ${width}`, async ({ page }) => {
  53 |     for (const family of ["bar", "area", "line", "scatter", "candlestick"]) {
  54 |       await page.goto(`${site.base}#chart-${family}`);
  55 |       const card = page.locator(`[data-chart-variant="${family}-reference-band"]`);
  56 |       await card.scrollIntoViewIfNeeded();
  57 |       const lines = card.locator(".chart-reference-area line[stroke-dasharray]");
  58 |       await expect(lines).toHaveCount(2);
  59 |       expect(await lines.evaluateAll(nodes => nodes.every(node => Number(getComputedStyle(node).strokeOpacity) <= .25))).toBe(true);
  60 |       await card.screenshot({ path: `${evidence}/${site.name}-${family}-reference-band-${width}.png` });
  61 |     }
  62 |   });
  63 |   test(`${site.name} every heatmap legend has room below its calendar at ${width}`, async ({ page }) => {
  64 |     await page.goto(`${site.base}#chart-heatmap`);
  65 |     for (const card of await page.locator('[data-chart-variant^="heatmap-"]').all()) {
  66 |       await card.scrollIntoViewIfNeeded();
  67 |       const legend = card.getByText(/^(少|低耗时)$/).locator("..");
  68 |       await expect(legend).toBeVisible();
  69 |       const cells = card.locator(".visx-heatmap-rects rect");
  70 |       const bottom = await cells.evaluateAll(nodes => Math.max(...nodes.map(node => node.getBoundingClientRect().bottom)));
  71 |       const box = (await legend.boundingBox())!;
  72 |       expect(box.y - bottom).toBeGreaterThanOrEqual(16);
  73 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-${width}.png` });
  74 |     }
  75 |     const example = page.locator('main [data-rain-id="chart-heatmap"]').first();
  76 |     const legend = example.getByText("少", { exact: true }).locator("..");
  77 |     await expect(legend).toBeVisible();
  78 |     expect((await legend.boundingBox())!.height).toBeGreaterThan(0);
  79 |     await example.screenshot({ path: `${evidence}/${site.name}-heatmap-default-example-${width}.png` });
  80 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  81 |   });
  82 |   test(`${site.name} all sunburst titles and drilled Breadcrumbs are centered at ${width}`, async ({ page }) => {
  83 |     await page.goto(`${site.base}#chart-sunburst`);
  84 |     for (const card of await page.locator('[data-chart-variant^="sunburst-"]').all()) {
  85 |       await card.scrollIntoViewIfNeeded();
  86 |       await centeredHeading(card);
  87 |       await card.getByRole("button", { name: /基础课程/ }).click();
  88 |       await centeredTrail(card);
  89 |       await card.screenshot({ path: `${evidence}/${site.name}-${await card.getAttribute("data-chart-variant")}-drill-${width}.png` });
  90 |       await card.getByRole("link", { name: "返回学习内容" }).click();
  91 |       await centeredHeading(card);
  92 |     }
  93 |     const example = page.locator('main [data-rain-id="chart-sunburst"]').first();
  94 |     await example.scrollIntoViewIfNeeded();
  95 |     await centeredHeading(example);
  96 |   });
  97 | }
  98 | 
```