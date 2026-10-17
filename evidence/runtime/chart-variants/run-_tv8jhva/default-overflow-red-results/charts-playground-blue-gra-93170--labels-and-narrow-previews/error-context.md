# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: charts-playground.spec.ts >> blue-gray monochrome is available in 15 native catalog entries with ordered intensity, readable sunburst labels and narrow previews
- Location: tests/e2e/charts-playground.spec.ts:103:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
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
      - heading "漏斗图" [level=2] [ref=e29]
      - paragraph [ref=e30]: 学习路径的阶段人数、层叠光感与原生悬停。
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e33]:
            - option "清晰线与轻面积"
            - option "蓝紫近邻"
            - option "协调实色"
            - option "蓝灰单色" [selected]
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
        - button "对照实例" [active] [ref=e38] [cursor=pointer]
      - generic [ref=e39]:
        - generic [ref=e40]:
          - generic [ref=e43] [cursor=pointer]:
            - generic [ref=e44]: 1000 人
            - generic [ref=e46]: 100%
            - generic [ref=e48]: 进入课程
          - generic [ref=e51] [cursor=pointer]:
            - generic [ref=e52]: 780 人
            - generic [ref=e54]: 78%
            - generic [ref=e56]: 观看视频
          - generic [ref=e59] [cursor=pointer]:
            - generic [ref=e60]: 560 人
            - generic [ref=e62]: 56%
            - generic [ref=e64]: 完成练习
          - generic [ref=e67] [cursor=pointer]:
            - generic [ref=e68]: 420 人
            - generic [ref=e70]: 42%
            - generic [ref=e72]: 完成学习
        - status [ref=e74]: 百分比以第一阶段人数为分母。
        - group [ref=e75]:
          - generic "查看精确数据" [ref=e76] [cursor=pointer]
      - status [ref=e77]: 示例数据 · 已按系统设置减少动效
      - paragraph [ref=e78]:
        - strong [ref=e79]: 数据要求：
        - text: 顺序固定且数值非负；阶段百分比以入口人数为分母。
      - paragraph [ref=e80]:
        - strong [ref=e81]: 使用边界：
        - text: 阶段增长不能直接解释为流失率；零入口不显示无意义比例。
      - group [ref=e82]:
        - generic "调用配置、完整源码与示例数据" [ref=e83] [cursor=pointer]
        - option "main.tsx" [selected]
        - option "index.html"
        - option "chart-examples.tsx"
        - option "chart-variants/profit-loss.tsx"
        - option "chart-variants/shared.tsx"
        - option "chart-data.ts"
        - option "chart-catalog.ts"
        - option "chart-examples.css"
      - region "全部图表变体" [ref=e84]:
        - navigation "变体分组" [ref=e85]:
          - button "基础结构" [ref=e86] [cursor=pointer]
          - button "图形材质" [ref=e87] [cursor=pointer]
          - button "坐标与辅助读数" [ref=e88] [cursor=pointer]
        - region [ref=e89]:
          - heading "基础结构" [level=2] [ref=e90]
          - generic [ref=e91]:
            - region [ref=e92]:
              - generic [ref=e93]:
                - heading "Funnel Chart" [level=3] [ref=e94]
                - paragraph [ref=e95]: 多层光环漏斗与阶段悬浮读取
              - generic [ref=e96]:
                - generic [ref=e97]:
                  - button "更新数据" [ref=e98] [cursor=pointer]
                  - button "重播动效" [ref=e100] [cursor=pointer]
                - generic [ref=e102]:
                  - generic [ref=e104]:
                    - generic [ref=e107] [cursor=pointer]:
                      - generic [ref=e108]: 1,000
                      - generic [ref=e110]: 100%
                      - generic [ref=e112]: 进入课程
                    - generic [ref=e115] [cursor=pointer]:
                      - generic [ref=e116]: "780"
                      - generic [ref=e118]: 78%
                      - generic [ref=e120]: 观看视频
                    - generic [ref=e123] [cursor=pointer]:
                      - generic [ref=e124]: "560"
                      - generic [ref=e126]: 56%
                      - generic [ref=e128]: 完成练习
                    - generic [ref=e131] [cursor=pointer]:
                      - generic [ref=e132]: "420"
                      - generic [ref=e134]: 42%
                      - generic [ref=e136]: 完成学习
                  - generic [ref=e138]:
                    - button "进入课程" [ref=e140] [cursor=pointer]
                    - button "观看视频" [ref=e143] [cursor=pointer]
                    - button "完成练习" [ref=e146] [cursor=pointer]
                    - button "完成学习" [ref=e149] [cursor=pointer]
                  - paragraph [ref=e151]: 各阶段比例均以首阶段 1,000 人为分母。
                  - group [ref=e152]:
                    - generic "查看精确数据" [ref=e153] [cursor=pointer]
                - status [ref=e154]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e155]:
                  - generic "查看本卡代码" [ref=e156] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e157] [cursor=pointer]:
                - /url: https://bklit.com/charts/funnel-chart
            - region [ref=e158]:
              - generic [ref=e159]:
                - heading "Vertical" [level=3] [ref=e160]
                - paragraph [ref=e161]: 由上向下的纵向漏斗
              - generic [ref=e162]:
                - generic [ref=e163]:
                  - button "更新数据" [ref=e164] [cursor=pointer]
                  - button "重播动效" [ref=e166] [cursor=pointer]
                - generic [ref=e168]:
                  - generic [ref=e170]:
                    - generic [ref=e173] [cursor=pointer]:
                      - generic [ref=e174]: 1,000
                      - generic [ref=e176]: 100%
                      - generic [ref=e178]: 进入课程
                    - generic [ref=e181] [cursor=pointer]:
                      - generic [ref=e182]: "780"
                      - generic [ref=e184]: 78%
                      - generic [ref=e186]: 观看视频
                    - generic [ref=e189] [cursor=pointer]:
                      - generic [ref=e190]: "560"
                      - generic [ref=e192]: 56%
                      - generic [ref=e194]: 完成练习
                    - generic [ref=e197] [cursor=pointer]:
                      - generic [ref=e198]: "420"
                      - generic [ref=e200]: 42%
                      - generic [ref=e202]: 完成学习
                  - generic [ref=e204]:
                    - button "进入课程" [ref=e206] [cursor=pointer]
                    - button "观看视频" [ref=e209] [cursor=pointer]
                    - button "完成练习" [ref=e212] [cursor=pointer]
                    - button "完成学习" [ref=e215] [cursor=pointer]
                  - paragraph [ref=e217]: 各阶段比例均以首阶段 1,000 人为分母。
                  - group [ref=e218]:
                    - generic "查看精确数据" [ref=e219] [cursor=pointer]
                - status [ref=e220]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e221]:
                  - generic "查看本卡代码" [ref=e222] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e223] [cursor=pointer]:
                - /url: https://bklit.com/charts/funnel-chart
            - region [ref=e224]:
              - generic [ref=e225]:
                - heading "Vertical Straight with Grid" [level=3] [ref=e226]
                - paragraph [ref=e227]: 纵向直边漏斗加辅助网格
              - generic [ref=e228]:
                - generic [ref=e229]:
                  - button "更新数据" [ref=e230] [cursor=pointer]
                  - button "重播动效" [ref=e232] [cursor=pointer]
                - paragraph [ref=e235]: 滚动到此处查看示例
                - status [ref=e236]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e237]:
                  - generic "查看本卡代码" [ref=e238] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e239] [cursor=pointer]:
                - /url: https://bklit.com/charts/funnel-chart
            - region [ref=e240]:
              - generic [ref=e241]:
                - heading "Straight Edges" [level=3] [ref=e242]
                - paragraph [ref=e243]: 直线几何边替代曲边
              - generic [ref=e244]:
                - generic [ref=e245]:
                  - button "更新数据" [ref=e246] [cursor=pointer]
                  - button "重播动效" [ref=e248] [cursor=pointer]
                - paragraph [ref=e251]: 滚动到此处查看示例
                - status [ref=e252]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e253]:
                  - generic "查看本卡代码" [ref=e254] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e255] [cursor=pointer]:
                - /url: https://bklit.com/charts/funnel-chart
        - region [ref=e256]:
          - heading "图形材质" [level=2] [ref=e257]
          - generic [ref=e258]:
            - region [ref=e259]:
              - generic [ref=e260]:
                - heading "Per-Segment Colors" [level=3] [ref=e261]
                - paragraph [ref=e262]: 每阶段使用独立纯色
              - generic [ref=e263]:
                - generic [ref=e264]:
                  - button "更新数据" [ref=e265] [cursor=pointer]
                  - button "重播动效" [ref=e267] [cursor=pointer]
                - paragraph [ref=e269]: 本卡使用独立示例配色，保留材质或色阶差异。
                - paragraph [ref=e271]: 滚动到此处查看示例
                - status [ref=e272]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e273]:
                  - generic "查看本卡代码" [ref=e274] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e275] [cursor=pointer]:
                - /url: https://bklit.com/charts/funnel-chart
            - region [ref=e276]:
              - generic [ref=e277]:
                - heading "Gradient Segments" [level=3] [ref=e278]
                - paragraph [ref=e279]: 阶段采用线性渐变
              - generic [ref=e280]:
                - generic [ref=e281]:
                  - button "更新数据" [ref=e282] [cursor=pointer]
                  - button "重播动效" [ref=e284] [cursor=pointer]
                - paragraph [ref=e286]: 本卡使用独立示例配色，保留材质或色阶差异。
                - paragraph [ref=e288]: 滚动到此处查看示例
                - status [ref=e289]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e290]:
                  - generic "查看本卡代码" [ref=e291] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e292] [cursor=pointer]:
                - /url: https://bklit.com/charts/funnel-chart
            - region [ref=e293]:
              - generic [ref=e294]:
                - heading "Pattern Fill" [level=3] [ref=e295]
                - paragraph [ref=e296]: 最内层使用斜线图案
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
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e308] [cursor=pointer]:
                - /url: https://bklit.com/charts/funnel-chart
        - region [ref=e309]:
          - heading "坐标与辅助读数" [level=2] [ref=e310]
          - generic [ref=e311]:
            - region [ref=e312]:
              - generic [ref=e313]:
                - heading "Grouped Labels" [level=3] [ref=e314]
                - paragraph [ref=e315]: 标签集中成组排列
              - generic [ref=e316]:
                - generic [ref=e317]:
                  - button "更新数据" [ref=e318] [cursor=pointer]
                  - button "重播动效" [ref=e320] [cursor=pointer]
                - paragraph [ref=e323]: 滚动到此处查看示例
                - status [ref=e324]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e325]:
                  - generic "查看本卡代码" [ref=e326] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e327] [cursor=pointer]:
                - /url: https://bklit.com/charts/funnel-chart
            - region [ref=e328]:
              - generic [ref=e329]:
                - heading "Grid Background" [level=3] [ref=e330]
                - paragraph [ref=e331]: 交替底带与网格辅助比较
              - generic [ref=e332]:
                - generic [ref=e333]:
                  - button "更新数据" [ref=e334] [cursor=pointer]
                  - button "重播动效" [ref=e336] [cursor=pointer]
                - paragraph [ref=e339]: 滚动到此处查看示例
                - status [ref=e340]: 示例数据 · 已更新 0 次 · 已减少动效
                - group [ref=e341]:
                  - generic "查看本卡代码" [ref=e342] [cursor=pointer]
                  - option "main.tsx" [selected]
                  - option "index.html"
                  - option "chart-variants/comparison.tsx"
                  - option "chart-variants/shared.tsx"
                  - option "chart-data.ts"
                  - option "chart-catalog.ts"
                  - option "chart-examples.css"
              - link "对应官网示例（新标签页打开）" [ref=e343] [cursor=pointer]:
                - /url: https://bklit.com/charts/funnel-chart
```

# Test source

```ts
  34  |     await page.screenshot({ path: `${evidence}/${entry.id}.png`, fullPage: true });
  35  |   }
  36  |   expect(errors).toEqual([]);
  37  |   await writeFile(`${evidence}/entry-facts.json`, JSON.stringify({ entries: CHART_ENTRIES.map(entry => entry.id), errors }, null, 2));
  38  | });
  39  | 
  40  | test("[T09] recipe source stays current and the narrow chart doc does not overflow", async ({ page }) => {
  41  |   await page.setViewportSize({ width: 390, height: 1000 });
  42  |   await page.emulateMedia({ reducedMotion: "reduce" });
  43  |   await page.goto("/#chart-bar");
  44  |   await page.getByRole("combobox", { name: "视觉配方" }).selectOption("bar-fade");
  45  |   await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
  46  |   await expect(page.locator('.rain-chart-source[data-source="default"] pre')).toContainText('data-recipe="bar-fade"');
  47  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  48  |   await page.screenshot({ path: `${evidence}/bar-fade-390.png`, fullPage: true });
  49  | });
  50  | 
  51  | test("[T09] chart styles leave a normal Rain switch unchanged", async ({ page }) => {
  52  |   await page.goto("/#switch");
  53  |   const control = page.getByRole("switch", { name: "自动发布" });
  54  |   await expect(control).toBeVisible();
  55  |   const style = () => control.evaluate(node => {
  56  |     const css = getComputedStyle(node); return [css.width, css.height, css.fontFamily, css.backgroundColor, css.borderRadius];
  57  |   });
  58  |   const before = await style();
  59  |   await page.evaluate(() => { location.hash = "#chart-area"; });
  60  |   await expect(page.getByRole("heading", { level: 1, name: "面积图" })).toBeVisible();
  61  |   await page.getByRole("link", { name: "返回组件目录" }).click();
  62  |   await page.getByRole("link", { name: "Switch 开关", exact: true }).click();
  63  |   await expect(control).toBeVisible();
  64  |   expect(await style()).toEqual(before);
  65  | });
  66  | 
  67  | test("blue-gray monochrome repaints actual bars, areas and stage gradients and restores the previous recipe", async ({ page }) => {
  68  |   await page.emulateMedia({ reducedMotion: "reduce" });
  69  |   const colors = ["#6288C7", "#3F5D91", "#91B0E1", "#BFD3F2", "#E5EEFC"];
  70  |   const facts = [];
  71  |   for (const id of ["bar", "area", "funnel"]) {
  72  |     await page.goto(`/#chart-${id}`);
  73  |     const host = page.locator(`[data-rain-id="chart-${id}"]`);
  74  |     const select = page.getByRole("combobox", { name: "视觉配方", exact: true });
  75  |     const previousRecipe = await select.inputValue();
  76  |     const previousColors = await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()));
  77  |     await select.selectOption("monochrome-blue", { timeout: 5000 });
  78  |     await expect(host).toHaveAttribute("data-recipe", "monochrome-blue");
  79  |     expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()))).toEqual(colors);
  80  |     if (id === "bar") {
  81  |       expect(await host.locator('g[class^="bar-series-"] rect').evaluateAll(nodes => [...new Set(nodes.map(node => getComputedStyle(node).fill))])).toEqual(["rgb(98, 136, 199)", "rgb(63, 93, 145)", "rgb(145, 176, 225)"]);
  82  |       await host.locator(".legend-container button").first().focus();
  83  |       await expect(host.locator(".legend-container button").first()).toBeFocused();
  84  |     }
  85  |     if (id === "area") {
  86  |       await expect(host.locator('path[stroke="var(--chart-1)"]').first()).toHaveCSS("stroke", "rgb(98, 136, 199)");
  87  |     }
  88  |     if (id === "funnel") {
  89  |       const stops = await host.locator("linearGradient stop").evaluateAll(nodes => [...new Set(nodes.map(node => getComputedStyle(node).stopColor))]);
  90  |       expect(stops).toEqual(expect.arrayContaining(["rgb(63, 93, 145)", "rgb(98, 136, 199)", "rgb(145, 176, 225)", "rgb(191, 211, 242)", "rgb(229, 238, 252)"]));
  91  |     }
  92  |     await page.locator("[data-chart-default-controls]").getByRole("button", { name: "更新数据", exact: true }).click();
  93  |     await expect(page.getByRole("status").filter({ hasText: "已更新 1 次" })).toBeVisible();
  94  |     facts.push({ id, colors, updated: true });
  95  |     await mkdir(`${evidence}/monochrome`, { recursive: true });
  96  |     await page.screenshot({ path: `${evidence}/monochrome/${id}.png`, fullPage: true });
  97  |     await select.selectOption(previousRecipe);
  98  |     expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()))).toEqual(previousColors);
  99  |   }
  100 |   await writeFile(`${evidence}/monochrome/facts.json`, JSON.stringify(facts, null, 2));
  101 | });
  102 | 
  103 | test("blue-gray monochrome is available in 15 native catalog entries with ordered intensity, readable sunburst labels and narrow previews", async ({ page }) => {
  104 |   await page.emulateMedia({ reducedMotion: "reduce" });
  105 |   const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  106 |   const entries = CHART_ENTRIES.filter(entry => entry.recipes.includes("monochrome-blue"));
  107 |   expect(entries).toHaveLength(15);
  108 |   const palette = ["rgb(98, 136, 199)", "rgb(63, 93, 145)", "rgb(145, 176, 225)", "rgb(191, 211, 242)", "rgb(229, 238, 252)"];
  109 |   const facts = [];
  110 |   for (const entry of entries) {
  111 |     await page.goto(`http://127.0.0.1:5387/bklit-catalog.html#chart-${entry.id}`);
  112 |     const host = page.locator(`[data-rain-id="chart-${entry.id}"]`).first();
  113 |     await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption({ label: "蓝灰单色" });
  114 |     await expect(host.locator("svg").first()).toBeVisible();
  115 |     await expect.poll(() => host.locator("svg path, svg rect, svg circle, svg stop").evaluateAll((nodes, colors) => nodes.some(node => [getComputedStyle(node).fill, getComputedStyle(node).stroke, getComputedStyle(node).stopColor].some(color => colors.includes(color))), palette)).toBe(true);
  116 |     if (["heatmap", "choropleth"].includes(entry.id)) {
  117 |       expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-scale-0${i + 1}`).trim()))).toEqual(["#E5EEFC", "#BFD3F2", "#91B0E1", "#6288C7", "#3F5D91"]);
  118 |     }
  119 |     if (entry.id === "sunburst") {
  120 |       const labels = host.locator('svg text[style*="font-weight: 600"]');
  121 |       await expect(labels.first()).toBeVisible();
  122 |       expect(await labels.evaluateAll(nodes => nodes.every(node => getComputedStyle(node).fill === "rgb(20, 35, 70)"))).toBe(true);
  123 |     }
  124 |     if (["area", "bar", "funnel"].includes(entry.id)) {
  125 |       if (entry.id === "funnel") await expect.poll(() => host.locator(".rain-chart-funnel").getByText("进入课程", { exact: true }).evaluate(node => getComputedStyle(node.parentElement!.parentElement!).opacity)).toBe("1");
  126 |       await page.getByRole("button", { name: "对照实例", exact: true }).click();
  127 |       const gradients = await page.locator("svg linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  128 |       expect(new Set(gradients).size).toBe(gradients.length);
  129 |       await page.getByRole("button", { name: "对照实例", exact: true }).click();
  130 |       await mkdir(`${evidence}/monochrome`, { recursive: true });
  131 |       await page.screenshot({ path: `${evidence}/monochrome/${entry.id}-1440.png`, fullPage: true });
  132 |       await page.setViewportSize({ width: 390, height: 900 });
  133 |       const beforeResize = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth }));
> 134 |       await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      |                                                                                                            ^ Error: expect(received).toBe(expected) // Object.is equality
  135 |       const afterResize = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth }));
  136 |       facts.push({ id: entry.id, beforeResize, afterResize });
  137 |       await page.screenshot({ path: `${evidence}/monochrome/${entry.id}-390.png`, fullPage: true });
  138 |       await page.setViewportSize({ width: 1440, height: 1000 });
  139 |     }
  140 |     facts.push({ id: entry.id, paletteApplied: true });
  141 |   }
  142 |   expect(errors).toEqual([]);
  143 |   await mkdir(`${evidence}/monochrome`, { recursive: true });
  144 |   await writeFile(`${evidence}/monochrome/catalog-facts.json`, JSON.stringify({ palette, entries: facts, errors }, null, 2));
  145 | });
  146 | 
```