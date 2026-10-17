# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-feedback-radial.spec.ts >> prototype radial readings and material fixes at 1280
- Location: tests/e2e/chart-feedback-radial.spec.ts:9:3

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 19.200000000000003
Received:   20
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
            - option "蓝紫近邻"
            - option "多色类别" [selected]
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
                - generic [ref=e101]:
                  - generic [ref=e102]:
                    - text: 示例状态
                    - combobox "饼图示例状态" [ref=e103] [cursor=pointer]:
                      - option "正常" [selected]
                      - option "总量为0"
                      - option "长中心文案"
                  - img [ref=e108]:
                    - generic [ref=e109]:
                      - generic [ref=e110] [cursor=pointer]
                      - generic [ref=e112] [cursor=pointer]
                      - generic [ref=e114] [cursor=pointer]
                      - generic [ref=e116] [cursor=pointer]
                  - status [ref=e118]: 分母为全部类别合计 500 人；各类别互斥。
                  - group [ref=e119]:
                    - generic "查看精确数据" [ref=e120] [cursor=pointer]
                - status [ref=e121]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e122]:
                  - generic "查看本卡代码" [ref=e123] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e124] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e125]:
              - generic [ref=e126]:
                - heading "Pie Chart - Donut" [level=3] [ref=e127]
                - paragraph [ref=e128]: 空心环饼与动态中心读数
              - generic [ref=e129]:
                - generic [ref=e130]:
                  - button "更新数据" [ref=e131] [cursor=pointer]
                  - button "重播动效" [ref=e133] [cursor=pointer]
                - generic [ref=e135]:
                  - generic [ref=e139]:
                    - img [ref=e140]:
                      - generic [ref=e141]:
                        - generic [ref=e142] [cursor=pointer]
                        - generic [ref=e144] [cursor=pointer]
                        - generic [ref=e146] [cursor=pointer]
                        - generic [ref=e148] [cursor=pointer]
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
                        - generic: 总人数
                  - status [ref=e150]: 分母为全部类别合计 500 人；各类别互斥。
                  - group [ref=e151]:
                    - generic "查看精确数据" [ref=e152] [cursor=pointer]
                - status [ref=e153]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e154]:
                  - generic "查看本卡代码" [ref=e155] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e156] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
        - region [ref=e157]:
          - heading "图形材质" [level=2] [ref=e158]
          - generic [ref=e159]:
            - region [ref=e160]:
              - generic [ref=e161]:
                - heading "Pie Chart - Patterns" [level=3] [ref=e162]
                - paragraph [ref=e163]: 每扇区的斜线图案
              - generic [ref=e164]:
                - generic [ref=e165]:
                  - button "更新数据" [ref=e166] [cursor=pointer]
                  - button "重播动效" [ref=e168] [cursor=pointer]
                - generic [ref=e170]:
                  - img [ref=e175]:
                    - generic [ref=e176]:
                      - generic [ref=e177] [cursor=pointer]
                      - generic [ref=e179] [cursor=pointer]
                      - generic [ref=e181] [cursor=pointer]
                      - generic [ref=e183] [cursor=pointer]
                  - status [ref=e185]: 分母为全部类别合计 100 人；各类别互斥。
                  - group [ref=e186]:
                    - generic "查看精确数据" [ref=e187] [cursor=pointer]
                - status [ref=e188]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e189]:
                  - generic "查看本卡代码" [ref=e190] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e191] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e192]:
              - generic [ref=e193]:
                - heading "Pie Chart - Gradients" [level=3] [ref=e194]
                - paragraph [ref=e195]: 各扇区径向渐变
              - generic [ref=e196]:
                - generic [ref=e197]:
                  - button "更新数据" [ref=e198] [cursor=pointer]
                  - button "重播动效" [ref=e200] [cursor=pointer]
                - paragraph [ref=e202]: 本卡使用独立示例配色，保留材质或色阶差异。
                - generic [ref=e203]:
                  - img [ref=e208]:
                    - generic [ref=e209]:
                      - generic [ref=e210] [cursor=pointer]
                      - generic [ref=e212] [cursor=pointer]
                      - generic [ref=e214] [cursor=pointer]
                  - status [ref=e216]: 分母为全部类别合计 100 人；各类别互斥。
                  - group [ref=e217]:
                    - generic "查看精确数据" [ref=e218] [cursor=pointer]
                - status [ref=e219]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e220]:
                  - generic "查看本卡代码" [ref=e221] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e222] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e223]:
              - generic [ref=e224]:
                - heading "Donut Chart - Patterns" [level=3] [ref=e225]
                - paragraph [ref=e226]: 图案环饼与中心标签
              - generic [ref=e227]:
                - generic [ref=e228]:
                  - button "更新数据" [ref=e229] [cursor=pointer]
                  - button "重播动效" [ref=e231] [cursor=pointer]
                - paragraph [ref=e234]: 滚动到此处查看示例
                - status [ref=e235]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e236]:
                  - generic "查看本卡代码" [ref=e237] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e238] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
        - region [ref=e239]:
          - heading "坐标与辅助读数" [level=2] [ref=e240]
          - region [ref=e242]:
            - generic [ref=e243]:
              - heading "Pie Chart - Custom Center" [level=3] [ref=e244]
              - paragraph [ref=e245]: 定制中心内容与读数
            - generic [ref=e246]:
              - generic [ref=e247]:
                - button "更新数据" [ref=e248] [cursor=pointer]
                - button "重播动效" [ref=e250] [cursor=pointer]
              - paragraph [ref=e253]: 滚动到此处查看示例
              - status [ref=e254]: 示例数据 · 已更新 0 次 · 已减少动效
              - group [ref=e255]:
                - generic "查看本卡代码" [ref=e256] [cursor=pointer]
                - option "main.tsx" [selected]
                - option "index.html"
                - option "chart-variants/radial.tsx"
                - option "chart-variants/shared.tsx"
                - option "chart-data.ts"
                - option "chart-catalog.ts"
                - option "chart-examples.css"
            - link "对应官网示例（新标签页打开）" [ref=e257] [cursor=pointer]:
              - /url: https://bklit.com/charts/pie-chart
        - region [ref=e258]:
          - heading "交互与状态" [level=2] [ref=e259]
          - generic [ref=e260]:
            - region [ref=e261]:
              - generic [ref=e262]:
                - heading "Pie Chart - Legend" [level=3] [ref=e263]
                - paragraph [ref=e264]: 图例与扇区悬浮联动
              - generic [ref=e265]:
                - generic [ref=e266]:
                  - button "更新数据" [ref=e267] [cursor=pointer]
                  - button "重播动效" [ref=e269] [cursor=pointer]
                - paragraph [ref=e272]: 滚动到此处查看示例
                - status [ref=e273]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e274]:
                  - generic "查看本卡代码" [ref=e275] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e276] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e277]:
              - generic [ref=e278]:
                - heading "Pie Chart - Grow Hover" [level=3] [ref=e279]
                - paragraph [ref=e280]: 悬浮时增大外径
              - generic [ref=e281]:
                - generic [ref=e282]:
                  - button "更新数据" [ref=e283] [cursor=pointer]
                  - button "重播动效" [ref=e285] [cursor=pointer]
                - paragraph [ref=e288]: 滚动到此处查看示例
                - status [ref=e289]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e290]:
                  - generic "查看本卡代码" [ref=e291] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e292] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e293]:
              - generic [ref=e294]:
                - heading "Donut Chart - Grow Hover" [level=3] [ref=e295]
                - paragraph [ref=e296]: 环饼悬浮增大外径并联动中心值
              - generic [ref=e297]:
                - generic [ref=e298]:
                  - button "更新数据" [ref=e299] [cursor=pointer]
                  - button "重播动效" [ref=e301] [cursor=pointer]
                - paragraph [ref=e304]: 滚动到此处查看示例
                - status [ref=e305]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e306]:
                  - generic "查看本卡代码" [ref=e307] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e308] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { mkdir, writeFile } from "node:fs/promises";
  3  | 
  4  | const evidence = "evidence/runtime/chart-variants/feedback-2026-10-08/radial";
  5  | for (const site of [
  6  |   { name: "playground", base: "http://127.0.0.1:5173/" },
  7  |   { name: "prototype", base: "http://127.0.0.1:5387/bklit-catalog.html" },
  8  | ]) for (const width of [1280, 390]) {
  9  |   test(`${site.name} radial readings and material fixes at ${width}`, async ({ page }) => {
  10 |     await page.emulateMedia({ reducedMotion: "reduce" });
  11 |     await page.setViewportSize({ width, height: 796 });
  12 |     const facts: unknown[] = [];
  13 |     await mkdir(evidence, { recursive: true });
  14 |     await page.goto(`${site.base}#chart-pie`);
  15 |     const donut = page.locator('[data-chart-variant="pie-donut"]');
  16 |     await donut.scrollIntoViewIfNeeded();
  17 |     await expect(donut.locator('[data-slot="chart-stat-suffix"]')).toHaveText("人");
  18 |     const reading = await donut.locator(".rain-chart-center-value").evaluate(node => {
  19 |       const number = node.querySelector("number-flow-react")!;
  20 |       const unit = node.querySelector("small")!;
  21 |       return { value: number.getAttribute("aria-label"), gap: unit.getBoundingClientRect().left - number.getBoundingClientRect().right,
  22 |         valueFont: parseFloat(getComputedStyle(node).fontSize), unitFont: parseFloat(getComputedStyle(unit).fontSize) };
  23 |     });
  24 |     expect(reading.value).toBe("500");
  25 |     expect(reading.gap).toBeGreaterThanOrEqual(0);
  26 |     expect(reading.gap).toBeLessThanOrEqual(4);
> 27 |     expect(reading.unitFont).toBeLessThan(reading.valueFont * .8);
     |                              ^ Error: expect(received).toBeLessThan(expected)
  28 |     facts.push({ id: "pie-donut", ...reading });
  29 |     await donut.screenshot({ path: `${evidence}/${site.name}-pie-donut-${width}.png` });
  30 | 
  31 |     const gradient = page.locator('[data-chart-variant="pie-gradients"]');
  32 |     await gradient.scrollIntoViewIfNeeded();
  33 |     await expect(gradient.locator("radialGradient")).toHaveCount(3);
  34 |     const hues = await gradient.locator("radialGradient").evaluateAll(nodes => nodes.map(node => [...node.querySelectorAll("stop")].map(stop => stop.getAttribute("stop-color"))));
  35 |     expect(hues.every(colors => new Set(colors).size === 1)).toBe(true);
  36 |     facts.push({ id: "pie-gradients", hues });
  37 |     await gradient.screenshot({ path: `${evidence}/${site.name}-pie-gradients-${width}.png` });
  38 |     const pattern = page.locator('[data-chart-variant="pie-patterns"]');
  39 |     await pattern.scrollIntoViewIfNeeded();
  40 |     await pattern.locator('svg path[fill="transparent"]').first().hover();
  41 |     const filters = await pattern.locator("svg path").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).filter));
  42 |     expect(filters.every(filter => filter === "none")).toBe(true);
  43 |     facts.push({ id: "pie-patterns", filters });
  44 |     await pattern.screenshot({ path: `${evidence}/${site.name}-pie-patterns-hover-${width}.png` });
  45 | 
  46 |     await page.goto(`${site.base}#chart-ring`);
  47 |     const ring = page.locator('[data-chart-variant="ring-default"]');
  48 |     await ring.scrollIntoViewIfNeeded();
  49 |     await expect(ring.locator(".rain-chart-center-reading")).toHaveText("70.0%阅读进度28 / 40 项");
  50 |     await ring.screenshot({ path: `${evidence}/${site.name}-ring-default-${width}.png` });
  51 |     const legend = page.locator('[data-chart-variant="ring-legend"]');
  52 |     await legend.scrollIntoViewIfNeeded();
  53 |     await legend.getByRole("button", { name: /^练习进度/ }).focus();
  54 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("66.7%练习进度8 / 12 项");
  55 |     await legend.getByRole("button", { name: /^练习进度/ }).blur();
  56 |     await expect(legend.locator(".rain-chart-center-reading")).toHaveText("70.0%阅读进度28 / 40 项");
  57 |     facts.push({ id: "ring-default", defaultReading: "70.0% / 阅读进度 / 28 of 40", hoverReading: "66.7% / 练习进度 / 8 of 12" });
  58 | 
  59 |     await page.goto(`${site.base}#chart-gauge`);
  60 |     const gauge = page.locator('[data-chart-variant="gauge-linear-label-below"]');
  61 |     await gauge.scrollIntoViewIfNeeded();
  62 |     await expect(gauge.getByRole("img", { name: "72", exact: true })).toBeVisible();
  63 |     const layout = await gauge.locator('[class*="@container/chart-center"]').evaluate(node => {
  64 |       const [value, label] = [...node.querySelectorAll(":scope > span")].map(span => span.getBoundingClientRect().toJSON());
  65 |       return { direction: getComputedStyle(node).flexDirection, value, label };
  66 |     });
  67 |     expect(layout.direction).toBe("row");
  68 |     expect(layout.label!.left).toBeGreaterThan(layout.value!.right);
  69 |     expect(layout.label!.top).toBeLessThan(layout.value!.bottom);
  70 |     facts.push({ id: "gauge-linear-label-below", ...layout });
  71 |     await gauge.screenshot({ path: `${evidence}/${site.name}-gauge-linear-${width}.png` });
  72 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  73 |     await writeFile(`${evidence}/${site.name}-${width}-facts.json`, JSON.stringify(facts, null, 2));
  74 |   });
  75 | }
  76 | 
```