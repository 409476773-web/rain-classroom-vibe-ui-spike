# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bklit-catalog.spec.ts >> [feedback] compact labels, legend gaps and gauge readings stay readable at 880 and 390px
- Location: tests/e2e/bklit-catalog.spec.ts:48:1

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 9
Received:    14
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
      - heading "仪表图" [level=2] [ref=e29]
      - paragraph [ref=e30]: 单项达成率的弧形或线形刻度表达。
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e33]:
            - option "清晰线与轻面积" [selected]
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
        - generic [ref=e40]:
          - text: 形态
          - combobox "仪表形态" [ref=e41] [cursor=pointer]:
            - option "弧形刻度"
            - option "线形刻度" [selected]
        - generic [ref=e42]:
          - text: 读数
          - combobox "仪表读数" [ref=e43] [cursor=pointer]:
            - option "当前数据" [selected]
            - option "50%"
            - option "100%"
        - generic [ref=e50]:
          - generic [ref=e51]:
            - img "76" [ref=e52]:
              - generic [ref=e55]:
                - generic [ref=e56]: "7"
                - generic [ref=e58]: "6"
            - text: "%"
          - generic [ref=e60]: 目标达成率
        - group [ref=e134]:
          - generic "查看精确数据" [ref=e135] [cursor=pointer]
      - status [ref=e136]: 示例数据 · 已按系统设置减少动效
      - paragraph [ref=e137]:
        - strong [ref=e138]: 数据要求：
        - text: value限定0—100；业务量程需先归一，中心显示同一比率。
      - paragraph [ref=e139]:
        - strong [ref=e140]: 使用边界：
        - text: 本例不提供任意量程或阈值告警的语义。
      - group [ref=e141]:
        - generic "调用配置、完整源码与示例数据" [ref=e142] [cursor=pointer]
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
      - region "全部图表变体" [ref=e143]:
        - navigation "变体分组" [ref=e144]:
          - button "基础结构" [ref=e145] [cursor=pointer]
          - button "图形材质" [ref=e146] [cursor=pointer]
          - button "坐标与辅助读数" [ref=e147] [cursor=pointer]
        - region [ref=e148]:
          - heading "基础结构" [level=2] [ref=e149]
          - generic [ref=e150]:
            - region [ref=e151]:
              - generic [ref=e152]:
                - heading "Gauge" [level=3] [ref=e153]
                - paragraph [ref=e154]: 刻度弧、主题填充与中心数值
              - generic [ref=e155]:
                - generic [ref=e156]:
                  - button "更新数据" [ref=e157] [cursor=pointer]
                  - button "重播动效" [ref=e159] [cursor=pointer]
                - paragraph [ref=e162]: 滚动到此处查看示例
                - status [ref=e163]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e164]:
                  - generic "查看本卡代码" [ref=e165] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e166] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e167]:
              - generic [ref=e168]:
                - heading "Gauge — sparse ring, quarter sweep" [level=3] [ref=e169]
                - paragraph [ref=e170]: 稀疏刻度的局部弧段；角度按源例复核
              - generic [ref=e171]:
                - generic [ref=e172]:
                  - button "更新数据" [ref=e173] [cursor=pointer]
                  - button "重播动效" [ref=e175] [cursor=pointer]
                - paragraph [ref=e178]: 滚动到此处查看示例
                - status [ref=e179]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e180]:
                  - generic "查看本卡代码" [ref=e181] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e182] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e183]:
              - generic [ref=e184]:
                - heading "Gauge — same density, bottom half sweep" [level=3] [ref=e185]
                - paragraph [ref=e186]: 保持稀疏刻度并转向下半圆
              - generic [ref=e187]:
                - generic [ref=e188]:
                  - button "更新数据" [ref=e189] [cursor=pointer]
                  - button "重播动效" [ref=e191] [cursor=pointer]
                - paragraph [ref=e194]: 滚动到此处查看示例
                - status [ref=e195]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e196]:
                  - generic "查看本卡代码" [ref=e197] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e198] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e199]:
              - generic [ref=e200]:
                - heading "Gauge — flipped sweep (270° → 450°)" [level=3] [ref=e201]
                - paragraph [ref=e202]: 旋转弧段，使缺口位于另一侧
              - generic [ref=e203]:
                - generic [ref=e204]:
                  - button "更新数据" [ref=e205] [cursor=pointer]
                  - button "重播动效" [ref=e207] [cursor=pointer]
                - paragraph [ref=e210]: 滚动到此处查看示例
                - status [ref=e211]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e212]:
                  - generic "查看本卡代码" [ref=e213] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e214] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e215]:
              - generic [ref=e216]:
                - heading "Gauge — linear notch track" [level=3] [ref=e217]
                - paragraph [ref=e218]: 响应容器宽度的横向刻度条
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
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e230] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
        - region [ref=e231]:
          - heading "图形材质" [level=2] [ref=e232]
          - generic [ref=e233]:
            - region [ref=e234]:
              - generic [ref=e235]:
                - heading "Gauge — tight arc, filleted corners" [level=3] [ref=e236]
                - paragraph [ref=e237]: 无刻度间隙、圆角与自定弧段
              - generic [ref=e238]:
                - generic [ref=e239]:
                  - button "更新数据" [ref=e240] [cursor=pointer]
                  - button "重播动效" [ref=e242] [cursor=pointer]
                - paragraph [ref=e245]: 滚动到此处查看示例
                - status [ref=e246]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e247]:
                  - generic "查看本卡代码" [ref=e248] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e249] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e250]:
              - generic [ref=e251]:
                - heading "Gauge — dual arc gradients" [level=3] [ref=e252]
                - paragraph [ref=e253]: 激活及未激活弧段分别渐变
              - generic [ref=e254]:
                - generic [ref=e255]:
                  - button "更新数据" [ref=e256] [cursor=pointer]
                  - button "重播动效" [ref=e258] [cursor=pointer]
                - paragraph [ref=e260]: 本卡使用独立示例配色，保留材质或色阶差异。
                - paragraph [ref=e262]: 滚动到此处查看示例
                - status [ref=e263]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e264]:
                  - generic "查看本卡代码" [ref=e265] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e266] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e267]:
              - generic [ref=e268]:
                - heading "Gauge — pattern foreground, dim solid track" [level=3] [ref=e269]
                - paragraph [ref=e270]: 前景图案与低透明度实色轨道
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
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e282] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e283]:
              - generic [ref=e284]:
                - heading "Gauge — soft fillets, full depth" [level=3] [ref=e285]
                - paragraph [ref=e286]: 保留刻度深度并柔化圆角
              - generic [ref=e287]:
                - generic [ref=e288]:
                  - button "更新数据" [ref=e289] [cursor=pointer]
                  - button "重播动效" [ref=e291] [cursor=pointer]
                - paragraph [ref=e294]: 滚动到此处查看示例
                - status [ref=e295]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e296]:
                  - generic "查看本卡代码" [ref=e297] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e298] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e299]:
              - generic [ref=e300]:
                - heading "Gauge — short notches, bold corners" [level=3] [ref=e301]
                - paragraph [ref=e302]: 缩短刻度径向深度并加大圆角
              - generic [ref=e303]:
                - generic [ref=e304]:
                  - button "更新数据" [ref=e305] [cursor=pointer]
                  - button "重播动效" [ref=e307] [cursor=pointer]
                - paragraph [ref=e310]: 滚动到此处查看示例
                - status [ref=e311]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e312]:
                  - generic "查看本卡代码" [ref=e313] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e314] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e315]:
              - generic [ref=e316]:
                - heading "Gauge — near-circular notches" [level=3] [ref=e317]
                - paragraph [ref=e318]: 几何约束下近圆形刻度
              - generic [ref=e319]:
                - generic [ref=e320]:
                  - button "更新数据" [ref=e321] [cursor=pointer]
                  - button "重播动效" [ref=e323] [cursor=pointer]
                - paragraph [ref=e326]: 滚动到此处查看示例
                - status [ref=e327]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e328]:
                  - generic "查看本卡代码" [ref=e329] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e330] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
            - region [ref=e331]:
              - generic [ref=e332]:
                - heading "Gauge — linear dual gradients" [level=3] [ref=e333]
                - paragraph [ref=e334]: 横向激活及未激活刻度分别渐变
              - generic [ref=e335]:
                - generic [ref=e336]:
                  - button "更新数据" [ref=e337] [cursor=pointer]
                  - button "重播动效" [ref=e339] [cursor=pointer]
                - paragraph [ref=e341]: 本卡使用独立示例配色，保留材质或色阶差异。
                - paragraph [ref=e343]: 滚动到此处查看示例
                - status [ref=e344]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e345]:
                  - generic "查看本卡代码" [ref=e346] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-variants/data/README.md"
                  - option "chart-variants/data/world.geojson"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e347] [cursor=pointer]:
                - /url: https://bklit.com/charts/gauge-chart
        - region [ref=e348]:
          - heading "坐标与辅助读数" [level=2] [ref=e349]
          - region [ref=e351]:
            - generic [ref=e352]:
              - heading "Gauge — linear with label below" [level=3] [ref=e353]
              - paragraph [ref=e354]: 横向刻度条下方显示标签与值
            - generic [ref=e355]:
              - generic [ref=e356]:
                - button "更新数据" [ref=e357] [cursor=pointer]
                - button "重播动效" [ref=e359] [cursor=pointer]
              - paragraph [ref=e362]: 滚动到此处查看示例
              - status [ref=e363]: 示例数据 · 已更新 0 次 · 已减少动效
              - group [ref=e364]:
                - generic "查看本卡代码" [ref=e365] [cursor=pointer]
                - option "main.tsx" [selected]
                - option "index.html"
                - option "chart-variants/comparison.tsx"
                - option "chart-variants/shared.tsx"
                - option "chart-variants/data/README.md"
                - option "chart-variants/data/world.geojson"
                - option "chart-data.ts"
                - option "chart-catalog.ts"
                - option "chart-examples.css"
            - link "对应官网示例（新标签页打开）" [ref=e366] [cursor=pointer]:
              - /url: https://bklit.com/charts/gauge-chart
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | 
  4   | const evidence = process.env.RAIN_BKLIT_CATALOG_EVIDENCE_DIR ?? "evidence/runtime/bklit-rain-catalog/runtime";
  5   | const groups = { P1:["area","line","bar","composed"], P2:["pie","ring","radar","scatter","funnel","gauge"], P3:["sankey","sunburst","heatmap","choropleth"], P4:["candlestick","profit-loss","live-line"] };
  6   | 
  7   | test("[feedback] stacked bars use the cumulative domain through recipe, series and data changes", async ({ page }) => {
  8   |   await page.emulateMedia({ reducedMotion: "reduce" });
  9   |   const facts = [];
  10  |   for (const width of [880, 390]) {
  11  |     await page.setViewportSize({ width, height: 764 });
  12  |     await page.goto(`/bklit-catalog.html?feedback-width=${width}#chart-bar`);
  13  |     const host = page.locator('[data-rain-id="chart-bar"]').first();
  14  |     await page.getByRole("combobox", { name: "柱形配方", exact: true }).selectOption("stacked");
  15  |     for (const count of [3, 5]) {
  16  |       await page.getByRole("combobox", { name: "系列数", exact: true }).selectOption(String(count));
  17  |       for (const recipe of ["category-wide", "bar-gradient", "bar-fade"]) {
  18  |         await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption(recipe);
  19  |         await page.waitForTimeout(200);
  20  |         const geometry = await host.evaluate(el => {
  21  |           const plot = el.querySelector("svg")!.getBoundingClientRect();
  22  |           const bars = [...el.querySelectorAll('g[class^="bar-series-"] rect')].map(x => x.getBoundingClientRect());
  23  |           const ticks = [...el.querySelectorAll("span.text-chart-label")].map(x => Number(x.textContent)).filter(Number.isFinite);
  24  |           return { minTop: Math.min(...bars.map(x => x.top)) - plot.top, maxBottom: Math.max(...bars.map(x => x.bottom)) - plot.top, height: plot.height, count: bars.length, maxTick: Math.max(...ticks) };
  25  |         });
  26  |         facts.push({ width, seriesCount: count, recipe, ...geometry });
  27  |         await mkdir(evidence, { recursive: true });
  28  |         await writeFile(`${evidence}/stacked-bars-facts.json`, JSON.stringify(facts, null, 2));
  29  |         await page.screenshot({ path: `${evidence}/stacked-bars-${width}-${count}-${recipe}.png`, fullPage: true });
  30  |         expect(geometry.count).toBe(count * 6);
  31  |         expect(geometry.minTop).toBeGreaterThanOrEqual(23);
  32  |         expect(geometry.maxBottom).toBeLessThanOrEqual(geometry.height - 37);
  33  |         expect(geometry.maxTick).toBeGreaterThanOrEqual(count === 3 ? 102 : 132);
  34  |       }
  35  |     }
  36  |     await host.getByText("查看精确数据", { exact: true }).click();
  37  |     await expect(host.locator("table")).toBeVisible();
  38  |     const previous = Number(await host.locator("tbody td").first().innerText());
  39  |     await page.locator("[data-chart-default-controls]").getByRole("button", { name: "更新数据", exact: true }).click();
  40  |     await expect(host.locator("tbody td").first()).toHaveText(String(previous + 3));
  41  |     await expect.poll(() => host.locator('g[class^="bar-series-"] rect').evaluateAll(nodes => Math.min(...nodes.map(x => Number(x.getAttribute("y")))))).toBeGreaterThanOrEqual(0);
  42  |     await page.getByRole("combobox", { name: "柱形配方", exact: true }).selectOption("grouped");
  43  |     await expect(host.locator(".legend-container")).toContainText("参与人数");
  44  |     await expect.poll(() => host.locator('g[class^="bar-series-"] rect').evaluateAll(nodes => Math.min(...nodes.map(x => Number(x.getAttribute("y")))))).toBeGreaterThanOrEqual(0);
  45  |   }
  46  | });
  47  | 
  48  | test("[feedback] compact labels, legend gaps and gauge readings stay readable at 880 and 390px", async ({ page }) => {
  49  |   test.setTimeout(60_000);
  50  |   await page.emulateMedia({ reducedMotion: "reduce" });
  51  |   await mkdir(evidence, { recursive: true });
  52  |   const facts = [];
  53  |   for (const width of [880, 390]) {
  54  |     await page.setViewportSize({ width, height: 764 });
  55  |     for (const id of ["line", "bar", "gauge", "sunburst", "funnel"]) {
  56  |       await page.goto(`/bklit-catalog.html#chart-${id}`);
  57  |       const host = page.locator(`[data-rain-id="chart-${id}"]`).first();
  58  |       await expect(host.locator("svg").first()).toBeVisible();
  59  |       await page.waitForTimeout(2200);
  60  |       if (id === "line" || id === "bar") {
  61  |         const legend = await host.locator(".legend-container").evaluate(el => ({
  62  |           fontSizes: [...el.querySelectorAll("button > span:last-child")].map(x => getComputedStyle(x).fontSize),
  63  |           columnGap: getComputedStyle(el).columnGap,
  64  |         }));
  65  |         expect(legend.fontSizes.length).toBeGreaterThan(0);
  66  |         expect(legend.fontSizes.every(size => size === "13px")).toBe(true);
  67  |         expect(legend.columnGap).toBe("24px");
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
> 90  |         expect(linear.readingGap).toBeLessThanOrEqual(9);
      |                                   ^ Error: expect(received).toBeLessThanOrEqual(expected)
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
  168 |     await page.locator("[data-chart-default-controls]").getByRole("combobox", { name:"示例状态", exact: true }).selectOption("empty");
  169 |     await expect(host).toContainText("暂无数据");
  170 |     await page.locator("[data-chart-default-controls]").getByRole("combobox", { name:"示例状态", exact: true }).selectOption("invalid");
  171 |     await expect(host).toContainText("已拒绝无效数据");
  172 |     await page.locator("[data-chart-default-controls]").getByRole("combobox", { name:"示例状态", exact: true }).selectOption("zero");
  173 |     await expect(host).not.toContainText("NaN");
  174 |     await page.locator("[data-chart-default-controls]").getByRole("combobox", { name:"示例状态", exact: true }).selectOption("missing");
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
```