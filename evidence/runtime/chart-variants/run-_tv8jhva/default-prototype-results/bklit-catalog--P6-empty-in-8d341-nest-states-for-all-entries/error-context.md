# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bklit-catalog.spec.ts >> [P6] empty, invalid, zero and missing are honest states for all entries
- Location: tests/e2e/bklit-catalog.spec.ts:162:1

# Error details

```
Error: locator.selectOption: Error: strict mode violation: getByRole('combobox', { name: '示例状态' }) resolved to 2 elements:
    1) <select aria-label="示例状态">…</select> aka getByLabel('示例状态', { exact: true })
    2) <select aria-label="饼图示例状态">…</select> aka getByLabel('饼图示例状态')

Call log:
  - waiting for getByRole('combobox', { name: '示例状态' })

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
                          - img "500 人":
                            - generic:
                              - generic:
                                - generic:
                                  - generic: "5"
                                  - generic: "0"
                                  - generic: "0"
                            - generic: 人
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
                - paragraph [ref=e171]: 滚动到此处查看示例
                - status [ref=e172]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e173]:
                  - generic "查看本卡代码" [ref=e174] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e175] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e176]:
              - generic [ref=e177]:
                - heading "Pie Chart - Gradients" [level=3] [ref=e178]
                - paragraph [ref=e179]: 各扇区径向渐变
              - generic [ref=e180]:
                - generic [ref=e181]:
                  - button "更新数据" [ref=e182] [cursor=pointer]
                  - button "重播动效" [ref=e184] [cursor=pointer]
                - paragraph [ref=e186]: 本卡使用独立示例配色，保留材质或色阶差异。
                - paragraph [ref=e188]: 滚动到此处查看示例
                - status [ref=e189]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e190]:
                  - generic "查看本卡代码" [ref=e191] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e192] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e193]:
              - generic [ref=e194]:
                - heading "Donut Chart - Patterns" [level=3] [ref=e195]
                - paragraph [ref=e196]: 图案环饼与中心标签
              - generic [ref=e197]:
                - generic [ref=e198]:
                  - button "更新数据" [ref=e199] [cursor=pointer]
                  - button "重播动效" [ref=e201] [cursor=pointer]
                - paragraph [ref=e204]: 滚动到此处查看示例
                - status [ref=e205]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e206]:
                  - generic "查看本卡代码" [ref=e207] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e208] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
        - region [ref=e209]:
          - heading "坐标与辅助读数" [level=2] [ref=e210]
          - region [ref=e212]:
            - generic [ref=e213]:
              - heading "Pie Chart - Custom Center" [level=3] [ref=e214]
              - paragraph [ref=e215]: 定制中心内容与读数
            - generic [ref=e216]:
              - generic [ref=e217]:
                - button "更新数据" [ref=e218] [cursor=pointer]
                - button "重播动效" [ref=e220] [cursor=pointer]
              - paragraph [ref=e223]: 滚动到此处查看示例
              - status [ref=e224]: 示例数据 · 已更新 0 次 · 已减少动效
              - group [ref=e225]:
                - generic "查看本卡代码" [ref=e226] [cursor=pointer]
                - option "main.tsx" [selected]
                - option "index.html"
                - option "chart-variants/radial.tsx"
                - option "chart-variants/shared.tsx"
                - option "chart-data.ts"
                - option "chart-catalog.ts"
                - option "chart-examples.css"
            - link "对应官网示例（新标签页打开）" [ref=e227] [cursor=pointer]:
              - /url: https://bklit.com/charts/pie-chart
        - region [ref=e228]:
          - heading "交互与状态" [level=2] [ref=e229]
          - generic [ref=e230]:
            - region [ref=e231]:
              - generic [ref=e232]:
                - heading "Pie Chart - Legend" [level=3] [ref=e233]
                - paragraph [ref=e234]: 图例与扇区悬浮联动
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
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e246] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e247]:
              - generic [ref=e248]:
                - heading "Pie Chart - Grow Hover" [level=3] [ref=e249]
                - paragraph [ref=e250]: 悬浮时增大外径
              - generic [ref=e251]:
                - generic [ref=e252]:
                  - button "更新数据" [ref=e253] [cursor=pointer]
                  - button "重播动效" [ref=e255] [cursor=pointer]
                - paragraph [ref=e258]: 滚动到此处查看示例
                - status [ref=e259]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e260]:
                  - generic "查看本卡代码" [ref=e261] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e262] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
            - region [ref=e263]:
              - generic [ref=e264]:
                - heading "Donut Chart - Grow Hover" [level=3] [ref=e265]
                - paragraph [ref=e266]: 环饼悬浮增大外径并联动中心值
              - generic [ref=e267]:
                - generic [ref=e268]:
                  - button "更新数据" [ref=e269] [cursor=pointer]
                  - button "重播动效" [ref=e271] [cursor=pointer]
                - paragraph [ref=e274]: 滚动到此处查看示例
                - status [ref=e275]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e276]:
                  - generic "查看本卡代码" [ref=e277] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/radial.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e278] [cursor=pointer]:
                - /url: https://bklit.com/charts/pie-chart
```

# Test source

```ts
  68  |         facts.push({ width, id, legend });
  69  |       }
  70  |       if (id === "gauge") {
  71  |         const arc = await host.locator('[data-rain-id="ui-chart-gauge"]').evaluate(el => {
  72  |           const plot = el.querySelector("svg")!.getBoundingClientRect();
  73  |           const reading = el.querySelector("span.tabular-nums")!.parentElement!.getBoundingClientRect();
  74  |           return { centerOffset: (reading.top + reading.height / 2) - (plot.top + plot.height / 2) };
  75  |         });
  76  |         expect(Math.abs(arc.centerOffset)).toBeLessThan(1);
  77  |         await page.screenshot({ path: `${evidence}/gauge-arc-${width}.png`, fullPage: true });
  78  |         await page.getByRole("combobox", { name: "仪表形态", exact: true }).selectOption("linear");
  79  |         await page.waitForTimeout(250);
  80  |         const linear = await host.locator('[data-rain-id="ui-chart-gauge"]').evaluate(el => {
  81  |           const label = el.querySelector("span.text-chart-foreground-muted")!;
  82  |           const labelBox = label.getBoundingClientRect();
  83  |           const track = el.querySelector("svg")!.getBoundingClientRect();
  84  |           return { labelWidth: labelBox.width, labelHeight: labelBox.height, labelFont: getComputedStyle(label).fontSize, readingGap: track.top - labelBox.bottom };
  85  |         });
  86  |         expect(linear.labelWidth).toBeGreaterThan(20);
  87  |         expect(linear.labelHeight).toBeGreaterThan(0);
  88  |         expect(parseFloat(linear.labelFont)).toBeLessThanOrEqual(13);
  89  |         expect(linear.readingGap).toBeGreaterThanOrEqual(7);
  90  |         expect(linear.readingGap).toBeLessThanOrEqual(9);
  91  |         facts.push({ width, id, arc, linear });
  92  |       }
  93  |       if (id === "sunburst") {
  94  |         const labels = await host.locator("svg text").evaluateAll(nodes => nodes.map(x => ({ label: x.textContent, fill: getComputedStyle(x).fill, stroke: getComputedStyle(x).stroke, fontSize: getComputedStyle(x).fontSize })));
  95  |         expect(labels.length).toBeGreaterThan(0);
  96  |         expect(labels.every(label => label.fill === "rgb(255, 255, 255)" && label.stroke === "none")).toBe(true);
  97  |         facts.push({ width, id, labels });
  98  |       }
  99  |       if (id === "funnel") {
  100 |         const numbers = await host.locator(".font-semibold.text-foreground").evaluateAll(nodes => nodes.map(x => ({ label: x.textContent, fontSize: getComputedStyle(x).fontSize, weight: getComputedStyle(x).fontWeight, color: getComputedStyle(x).color, expected: getComputedStyle(x).getPropertyValue("--rain-category-text-neutral-4").trim() })));
  101 |         expect(numbers.length).toBe(4);
  102 |         expect(numbers.every(x => x.fontSize === "13px" && x.weight === "400")).toBe(true);
  103 |         facts.push({ width, id, numbers });
  104 |       }
  105 |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  106 |       await page.screenshot({ path: `${evidence}/${id}-${width}.png`, fullPage: true });
  107 |     }
  108 |   }
  109 |   await writeFile(`${evidence}/style-facts.json`, JSON.stringify(facts, null, 2));
  110 | });
  111 | 
  112 | test("[P0] Rain chart catalog is a usable independent entry", async ({ page }) => {
  113 |   await page.goto("/bklit-catalog.html");
  114 |   await expect(page.getByRole("heading", { name: "Rain 图表库", exact: true })).toBeVisible({ timeout: 5000 });
  115 |   await expect(page.getByRole("navigation", { name: "图型目录" }).getByRole("link")).toHaveCount(17);
  116 |   await expect(page.locator('[data-rain-id="chart-area"] svg').first()).toBeVisible();
  117 | });
  118 | 
  119 | for (const [phase, ids] of Object.entries(groups)) for (const id of ids) for (const width of [1440,900,390]) {
  120 |   test(`[${phase}] ${id} renders, reads and updates at ${width}px`, async ({ page }) => {
  121 |     const errors: string[] = [];
  122 |     page.on("pageerror", error => errors.push(error.message));
  123 |     await page.setViewportSize({ width, height: 1000 });
  124 |     if (width !== 1440) await page.emulateMedia({ reducedMotion: "reduce" });
  125 |     await page.goto(`/bklit-catalog.html#chart-${id}`);
  126 |     const host = page.locator(`[data-rain-id="chart-${id}"]`).first();
  127 |     await expect(host.locator("svg").first()).toBeVisible();
  128 |     await expect(host.locator('svg :is(path[d],rect,circle)').first()).toBeAttached();
  129 |     await page.waitForTimeout(width === 1440 ? 1800 : 300);
  130 |     await mkdir(evidence, { recursive: true });
  131 |     await page.screenshot({ path: `${evidence}/${id}-${width}.png`, fullPage: true });
  132 |     await host.getByText("查看精确数据", { exact:true }).click();
  133 |     await expect(host.locator("table")).toBeVisible();
  134 |     const before = await host.locator("tbody").innerText();
  135 |     expect(await host.locator("tbody tr").count()).toBeGreaterThan(0);
  136 |     await page.locator("[data-chart-default-controls]").getByRole("button", { name:"更新数据", exact:true }).click();
  137 |     await expect(page.locator(".rain-chart-catalog__status")).toContainText("已更新 1 次");
  138 |     await expect.poll(() => host.locator("tbody").innerText()).not.toBe(before);
  139 |     await expect.poll(() => host.locator("svg").evaluateAll(nodes => Math.max(0, ...nodes.map(node => node.getBoundingClientRect().width)))).toBeGreaterThan(30);
  140 |     const svgIndex = await host.locator("svg").evaluateAll(nodes => nodes.map((node,i) => ({ i, area:node.getBoundingClientRect().width*node.getBoundingClientRect().height })).sort((a,b) => b.area-a.area)[0]!.i);
  141 |     const plot = host.locator("svg").nth(svgIndex);
  142 |     const geometry = await plot.evaluate(svg => ({
  143 |       width: svg.getBoundingClientRect().width, height: svg.getBoundingClientRect().height,
  144 |       invalid: [...svg.querySelectorAll("path[d]")].filter(p => /NaN|Infinity/.test(p.getAttribute("d") ?? "")).length,
  145 |       labelColor: [...svg.querySelectorAll("text")].map(t => getComputedStyle(t).fill).slice(0,12),
  146 |     }));
  147 |     expect(geometry.width).toBeGreaterThan(30); expect(geometry.height).toBeGreaterThan(30); expect(geometry.invalid).toBe(0);
  148 |     const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  149 |     expect(overflow).toBe(false);
  150 |     const hoverable = !["gauge","live-line"].includes(id);
  151 |     if (hoverable) {
  152 |       const box = await plot.boundingBox();
  153 |       await page.mouse.move(box!.x+geometry.width*.48,box!.y+geometry.height*.45);
  154 |       await page.waitForTimeout(300);
  155 |       await page.screenshot({ path: `${evidence}/${id}-${width}-hover.png`, fullPage: true });
  156 |     }
  157 |     expect(errors).toEqual([]);
  158 |     await writeFile(`${evidence}/${id}-${width}-facts.json`, JSON.stringify({ id,width,geometry,errors,hoverChecked:hoverable },null,2));
  159 |   });
  160 | }
  161 | 
  162 | test("[P6] empty, invalid, zero and missing are honest states for all entries", async ({ page }) => {
  163 |   await page.emulateMedia({ reducedMotion:"reduce" });
  164 |   const errors: string[] = []; page.on("pageerror", e => errors.push(e.message));
  165 |   for (const id of Object.values(groups).flat()) {
  166 |     await page.goto(`/bklit-catalog.html#chart-${id}`);
  167 |     const host = page.locator(`[data-rain-id="chart-${id}"]`).first();
> 168 |     await page.getByRole("combobox", { name:"示例状态" }).selectOption("empty");
      |                                                       ^ Error: locator.selectOption: Error: strict mode violation: getByRole('combobox', { name: '示例状态' }) resolved to 2 elements:
  169 |     await expect(host).toContainText("暂无数据");
  170 |     await page.getByRole("combobox", { name:"示例状态" }).selectOption("invalid");
  171 |     await expect(host).toContainText("已拒绝无效数据");
  172 |     await page.getByRole("combobox", { name:"示例状态" }).selectOption("zero");
  173 |     await expect(host).not.toContainText("NaN");
  174 |     await page.getByRole("combobox", { name:"示例状态" }).selectOption("missing");
  175 |     if (!["heatmap","choropleth"].includes(id)) await expect(host).toContainText("缺测");
  176 |   }
  177 |   expect(errors).toEqual([]);
  178 | });
  179 | 
  180 | test("[P4] multiple candlesticks keep independent SVG gradients", async ({ page }) => {
  181 |   await page.goto("/bklit-catalog.html#chart-candlestick");
  182 |   await page.getByRole("button", { name: "对照实例" }).click();
  183 |   await expect(page.locator('[data-rain-id="chart-candlestick"]')).toHaveCount(2);
  184 |   await expect(page.locator('[data-rain-id="chart-candlestick"] svg').first()).toBeVisible();
  185 |   const ids = await page.locator("linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  186 |   expect(ids.length).toBeGreaterThan(1);
  187 |   expect(new Set(ids).size).toBe(ids.length);
  188 | });
  189 | 
  190 | test("[P5] multiple funnels isolate gradient definitions", async ({ page }) => {
  191 |   await page.emulateMedia({ reducedMotion:"reduce" });
  192 |   await page.goto("/bklit-catalog.html#chart-funnel");
  193 |   await page.getByRole("button", { name:"对照实例" }).click();
  194 |   await expect(page.locator('[data-rain-id="chart-funnel"]')).toHaveCount(2);
  195 |   await expect.poll(() => page.locator("linearGradient[id]").count()).toBeGreaterThan(1);
  196 |   const ids = await page.locator("linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  197 |   expect(new Set(ids).size).toBe(ids.length);
  198 | });
  199 | 
  200 | test("[P1] composed bars leave visible space to both axes", async ({ page }) => {
  201 |   await page.emulateMedia({ reducedMotion:"reduce" });
  202 |   for (const width of [1440,900,390]) {
  203 |     await page.setViewportSize({width,height:1000});
  204 |     await page.goto("/bklit-catalog.html#chart-composed");
  205 |     const host = page.locator('[data-rain-id="chart-composed"]');
  206 |     await expect(host.locator('.series-bar rect').first()).toBeVisible();
  207 |     await page.waitForTimeout(400);
  208 |     const facts = await host.evaluate(el => {
  209 |       const bars = [...el.querySelectorAll('.series-bar rect')].map(x => x.getBoundingClientRect()).filter(x=>x.height>1);
  210 |       const svg = el.querySelector('svg')!.getBoundingClientRect();
  211 |       const labels = [...el.querySelectorAll('span.text-chart-label')].filter(x=>/^\d+%?$/.test(x.textContent ?? "")).map(x=>x.getBoundingClientRect());
  212 |       const left = labels.filter(x=>x.x<svg.x+svg.width/3), right = labels.filter(x=>x.x>svg.x+svg.width*2/3);
  213 |       return {left:Math.min(...bars.map(x=>x.left))-Math.max(...left.map(x=>x.right)),right:Math.min(...right.map(x=>x.left))-Math.max(...bars.map(x=>x.right))};
  214 |     });
  215 |     expect(facts.left).toBeGreaterThanOrEqual(8);expect(facts.right).toBeGreaterThanOrEqual(8);
  216 |   }
  217 | });
  218 | 
  219 | test("[P6] reducing series after a focused last legend item is safe", async ({ page }) => {
  220 |   await page.emulateMedia({reducedMotion:"reduce"});
  221 |   const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
  222 |   for (const id of ["pie","ring","radar"]) {
  223 |     await page.goto(`/bklit-catalog.html#chart-${id}`);
  224 |     await page.getByRole("combobox",{name:"系列数"}).selectOption("5");
  225 |     const host=page.locator(`[data-rain-id="chart-${id}"]`);
  226 |     await host.locator('.rain-chart-legend-button').last().click();
  227 |     await page.getByRole("combobox",{name:"系列数"}).selectOption("3");
  228 |     await expect(host.locator('svg').first()).toBeVisible();
  229 |   }
  230 |   expect(errors).toEqual([]);
  231 | });
  232 | 
  233 | test("[P6] reduced-motion first date and moving highlight are actual readouts", async ({ page }) => {
  234 |   await page.emulateMedia({ reducedMotion: "reduce" });
  235 |   await page.goto("/bklit-catalog.html#chart-area");
  236 |   const chart = page.locator('[data-rain-id="chart-area"]');
  237 |   await expect(chart.locator("svg").first()).toBeVisible();
  238 |   const box = (await chart.locator("svg").first().boundingBox())!;
  239 |   await page.mouse.move(box.x + box.width * .65, box.y + box.height * .4);
  240 |   await expect(chart.locator(".rain-chart-tooltip")).toContainText("9月16日");
  241 |   const visiblePill = () => chart.locator(".bg-zinc-900").evaluate(el => [...el.querySelectorAll("span")].filter(span => {
  242 |     const mask = span.closest(".relative.h-6.overflow-hidden"); if (!mask) return false;
  243 |     const text = span.getBoundingClientRect(), clip = mask.getBoundingClientRect();
  244 |     return text.y + text.height / 2 >= clip.top && text.y + text.height / 2 < clip.bottom;
  245 |   }).map(span => span.textContent).join(" "));
  246 |   await expect.poll(visiblePill).toBe("Sep 16");
  247 |   await page.goto("/bklit-catalog.html#chart-line");
  248 |   const plot = page.locator('[data-rain-id="chart-line"] svg').first();
  249 |   await expect(plot).toBeVisible();
  250 |   await expect.poll(() => plot.evaluate(node => node.getBoundingClientRect().width)).toBeGreaterThan(500);
  251 |   const lineBox = (await plot.boundingBox())!;
  252 |   const clips = () => plot.locator("clipPath rect").evaluateAll(nodes => nodes.filter(node => Number.parseFloat(node.getAttribute("width") ?? "") < 400).map(node => Number.parseFloat(node.getAttribute("x") ?? "")));
  253 |   await page.mouse.move(lineBox.x + lineBox.width * .22, lineBox.y + lineBox.height * .4);
  254 |   await expect.poll(async () => (await clips()).length).toBe(3);
  255 |   await page.mouse.move(lineBox.x + lineBox.width * .78, lineBox.y + lineBox.height * .4);
  256 |   await page.waitForTimeout(65); const immediate = await clips();
  257 |   await page.waitForTimeout(150); const settled = await clips();
  258 |   expect(immediate.length).toBe(3);
  259 |   immediate.forEach((x, index) => expect(Math.abs(x - settled[index]!)).toBeLessThan(.1));
  260 | });
  261 | 
  262 | test("[P3] narrow Sankey labels preserve spacing, the node-center readout and single flow", async ({ page }) => {
  263 |   await page.setViewportSize({ width: 390, height: 1000 });
  264 |   await page.emulateMedia({ reducedMotion: "reduce" });
  265 |   await page.goto("/bklit-catalog.html#chart-sankey");
  266 |   const host = page.locator('[data-rain-id="chart-sankey"]');
  267 |   for (const state of ["normal", "long"]) {
  268 |     await page.getByRole("combobox", { name: "示例状态" }).selectOption(state);
```