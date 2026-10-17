# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bklit-catalog.spec.ts >> [P1] composed bars leave visible space to both axes
- Location: tests/e2e/bklit-catalog.spec.ts:94:1

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 8
Received:    -32.68511962890625
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
      - heading "组合图" [level=2] [ref=e29]
      - paragraph [ref=e30]: 面积、柱与线共享日期，人数和比率分别读取。
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e33]:
            - option "蓝紫近邻" [selected]
            - option "多色类别"
            - option "协调实色"
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
          - generic:
            - generic:
              - generic: "0"
              - generic: "100"
              - generic: "200"
              - generic: "300"
              - generic: "400"
          - generic:
            - generic:
              - generic: 0%
              - generic: 20%
              - generic: 40%
              - generic: 60%
              - generic: 80%
              - generic: 100%
          - generic:
            - generic: Sep 1
            - generic: Sep 9
            - generic: Sep 17
            - generic: Sep 24
        - generic [ref=e79]:
          - button "参与人数 · 人" [ref=e81] [cursor=pointer]
          - button "完成人数 · 人" [ref=e85] [cursor=pointer]
          - button "完成率 · %" [ref=e89] [cursor=pointer]
        - group [ref=e92]:
          - generic "查看精确数据" [ref=e93] [cursor=pointer]
      - status [ref=e94]: 示例数据 · 已按系统设置减少动效
      - paragraph [ref=e95]:
        - strong [ref=e96]: 数据要求：
        - text: 完成率=完成人数/参与人数；左轴人，右轴%。
      - paragraph [ref=e97]:
        - strong [ref=e98]: 使用边界：
        - text: 0参与时比率不适用，移除比率曲线而非显示0%。
      - group [ref=e99]:
        - generic "调用与配方配置" [ref=e100] [cursor=pointer]
```

# Test source

```ts
  9   |   await expect(page.getByRole("heading", { name: "Rain 图表库", exact: true })).toBeVisible({ timeout: 5000 });
  10  |   await expect(page.getByRole("navigation", { name: "图型目录" }).getByRole("link")).toHaveCount(17);
  11  |   await expect(page.locator('[data-rain-id="chart-area"] svg').first()).toBeVisible();
  12  | });
  13  | 
  14  | for (const [phase, ids] of Object.entries(groups)) for (const id of ids) for (const width of [1440,900,390]) {
  15  |   test(`[${phase}] ${id} renders, reads and updates at ${width}px`, async ({ page }) => {
  16  |     const errors: string[] = [];
  17  |     page.on("pageerror", error => errors.push(error.message));
  18  |     await page.setViewportSize({ width, height: 1000 });
  19  |     if (width !== 1440) await page.emulateMedia({ reducedMotion: "reduce" });
  20  |     await page.goto(`/bklit-catalog.html#chart-${id}`);
  21  |     const host = page.locator(`[data-rain-id="chart-${id}"]`).first();
  22  |     await expect(host.locator("svg").first()).toBeVisible();
  23  |     await expect(host.locator('svg :is(path[d],rect,circle)').first()).toBeAttached();
  24  |     await page.waitForTimeout(width === 1440 ? 1800 : 300);
  25  |     await mkdir(evidence, { recursive: true });
  26  |     await page.screenshot({ path: `${evidence}/${id}-${width}.png`, fullPage: true });
  27  |     await host.getByText("查看精确数据", { exact:true }).click();
  28  |     await expect(host.locator("table")).toBeVisible();
  29  |     const before = await host.locator("tbody").innerText();
  30  |     expect(await host.locator("tbody tr").count()).toBeGreaterThan(0);
  31  |     await page.getByRole("button", { name:"更新数据", exact:true }).click();
  32  |     await expect(page.getByRole("status").last()).toContainText("已更新 1 次");
  33  |     await expect.poll(() => host.locator("tbody").innerText()).not.toBe(before);
  34  |     const svgIndex = await host.locator("svg").evaluateAll(nodes => nodes.map((node,i) => ({ i, area:node.getBoundingClientRect().width*node.getBoundingClientRect().height })).sort((a,b) => b.area-a.area)[0]!.i);
  35  |     const plot = host.locator("svg").nth(svgIndex);
  36  |     const geometry = await plot.evaluate(svg => ({
  37  |       width: svg.getBoundingClientRect().width, height: svg.getBoundingClientRect().height,
  38  |       invalid: [...svg.querySelectorAll("path[d]")].filter(p => /NaN|Infinity/.test(p.getAttribute("d") ?? "")).length,
  39  |       labelColor: [...svg.querySelectorAll("text")].map(t => getComputedStyle(t).fill).slice(0,12),
  40  |     }));
  41  |     expect(geometry.width).toBeGreaterThan(30); expect(geometry.height).toBeGreaterThan(30); expect(geometry.invalid).toBe(0);
  42  |     const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  43  |     expect(overflow).toBe(false);
  44  |     const hoverable = !["gauge","live-line"].includes(id);
  45  |     if (hoverable) {
  46  |       const box = await plot.boundingBox();
  47  |       await page.mouse.move(box!.x+geometry.width*.48,box!.y+geometry.height*.45);
  48  |       await page.waitForTimeout(300);
  49  |       await page.screenshot({ path: `${evidence}/${id}-${width}-hover.png`, fullPage: true });
  50  |     }
  51  |     expect(errors).toEqual([]);
  52  |     await writeFile(`${evidence}/${id}-${width}-facts.json`, JSON.stringify({ id,width,geometry,errors,hoverChecked:hoverable },null,2));
  53  |   });
  54  | }
  55  | 
  56  | test("[P6] empty, invalid, zero and missing are honest states for all entries", async ({ page }) => {
  57  |   await page.emulateMedia({ reducedMotion:"reduce" });
  58  |   const errors: string[] = []; page.on("pageerror", e => errors.push(e.message));
  59  |   for (const id of Object.values(groups).flat()) {
  60  |     await page.goto(`/bklit-catalog.html#chart-${id}`);
  61  |     const host = page.locator(`[data-rain-id="chart-${id}"]`).first();
  62  |     await page.getByRole("combobox", { name:"示例状态" }).selectOption("empty");
  63  |     await expect(host).toContainText("暂无数据");
  64  |     await page.getByRole("combobox", { name:"示例状态" }).selectOption("invalid");
  65  |     await expect(host).toContainText("数据不符合合同");
  66  |     await page.getByRole("combobox", { name:"示例状态" }).selectOption("zero");
  67  |     await expect(host).not.toContainText("NaN");
  68  |     await page.getByRole("combobox", { name:"示例状态" }).selectOption("missing");
  69  |     if (!["heatmap","choropleth"].includes(id)) await expect(host).toContainText("缺测");
  70  |   }
  71  |   expect(errors).toEqual([]);
  72  | });
  73  | 
  74  | test("[P4] multiple candlesticks keep independent SVG gradients", async ({ page }) => {
  75  |   await page.goto("/bklit-catalog.html#chart-candlestick");
  76  |   await page.getByRole("button", { name: "对照实例" }).click();
  77  |   await expect(page.locator('[data-rain-id="chart-candlestick"]')).toHaveCount(2);
  78  |   await expect(page.locator('[data-rain-id="chart-candlestick"] svg').first()).toBeVisible();
  79  |   const ids = await page.locator("linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  80  |   expect(ids.length).toBeGreaterThan(1);
  81  |   expect(new Set(ids).size).toBe(ids.length);
  82  | });
  83  | 
  84  | test("[P5] multiple funnels isolate gradient definitions", async ({ page }) => {
  85  |   await page.emulateMedia({ reducedMotion:"reduce" });
  86  |   await page.goto("/bklit-catalog.html#chart-funnel");
  87  |   await page.getByRole("button", { name:"对照实例" }).click();
  88  |   await expect(page.locator('[data-rain-id="chart-funnel"]')).toHaveCount(2);
  89  |   await expect.poll(() => page.locator("linearGradient[id]").count()).toBeGreaterThan(1);
  90  |   const ids = await page.locator("linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  91  |   expect(new Set(ids).size).toBe(ids.length);
  92  | });
  93  | 
  94  | test("[P1] composed bars leave visible space to both axes", async ({ page }) => {
  95  |   await page.emulateMedia({ reducedMotion:"reduce" });
  96  |   for (const width of [1440,900,390]) {
  97  |     await page.setViewportSize({width,height:1000});
  98  |     await page.goto("/bklit-catalog.html#chart-composed");
  99  |     const host = page.locator('[data-rain-id="chart-composed"]');
  100 |     await expect(host.locator('.series-bar rect').first()).toBeVisible();
  101 |     await page.waitForTimeout(400);
  102 |     const facts = await host.evaluate(el => {
  103 |       const bars = [...el.querySelectorAll('.series-bar rect')].map(x => x.getBoundingClientRect()).filter(x=>x.height>1);
  104 |       const svg = el.querySelector('svg')!.getBoundingClientRect();
  105 |       const labels = [...el.querySelectorAll('span.text-chart-label')].map(x=>x.getBoundingClientRect());
  106 |       const left = labels.filter(x=>x.x<svg.x+svg.width/3), right = labels.filter(x=>x.x>svg.x+svg.width*2/3);
  107 |       return {left:Math.min(...bars.map(x=>x.left))-Math.max(...left.map(x=>x.right)),right:Math.min(...right.map(x=>x.left))-Math.max(...bars.map(x=>x.right))};
  108 |     });
> 109 |     expect(facts.left).toBeGreaterThanOrEqual(8);expect(facts.right).toBeGreaterThanOrEqual(8);
      |                        ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  110 |   }
  111 | });
  112 | 
  113 | test("[P6] reducing series after a focused last legend item is safe", async ({ page }) => {
  114 |   await page.emulateMedia({reducedMotion:"reduce"});
  115 |   const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
  116 |   for (const id of ["pie","ring","radar"]) {
  117 |     await page.goto(`/bklit-catalog.html#chart-${id}`);
  118 |     await page.getByRole("combobox",{name:"系列数"}).selectOption("5");
  119 |     const host=page.locator(`[data-rain-id="chart-${id}"]`);
  120 |     await host.locator('.rain-chart-legend-button').last().click();
  121 |     await page.getByRole("combobox",{name:"系列数"}).selectOption("3");
  122 |     await expect(host.locator('svg').first()).toBeVisible();
  123 |   }
  124 |   expect(errors).toEqual([]);
  125 | });
  126 | 
```