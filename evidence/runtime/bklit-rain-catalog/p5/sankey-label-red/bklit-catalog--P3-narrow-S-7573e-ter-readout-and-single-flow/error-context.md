# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bklit-catalog.spec.ts >> [P3] narrow Sankey labels preserve spacing, the node-center readout and single flow
- Location: tests/e2e/bklit-catalog.spec.ts:157:1

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 8
Received:    -4
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
      - heading "桑基图" [level=2] [ref=e29]
      - paragraph [ref=e30]: 稳定节点身份、双色流向渐变和路径聚焦。
      - generic [ref=e31]:
        - generic [ref=e32]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e33]:
            - option "来源到目标渐变" [selected]
            - option "蓝紫近邻"
            - option "多色类别"
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
        - generic [ref=e42]:
          - img [ref=e43]:
            - generic [ref=e44]:
              - generic [ref=e45]:
                - generic [ref=e46] [cursor=pointer]
                - generic [ref=e47] [cursor=pointer]
                - generic [ref=e48] [cursor=pointer]
                - generic [ref=e49] [cursor=pointer]
              - generic [ref=e50]:
                - generic [ref=e51] [cursor=pointer]: 课程入口
                - generic [ref=e55] [cursor=pointer]: 学习提醒
                - generic [ref=e59] [cursor=pointer]: 观看视频
                - generic [ref=e63] [cursor=pointer]: 阅读资料
                - generic [ref=e67] [cursor=pointer]: 完成学习
                - generic [ref=e71] [cursor=pointer]: 继续学习
          - generic:
            - generic:
              - generic:
                - generic:
                  - generic: 课程入口
                  - generic:
                    - generic:
                      - generic: 流量 · 人次
                      - generic: "400"
        - group [ref=e75]:
          - generic "查看精确数据" [ref=e76] [cursor=pointer]
      - status [ref=e77]: 示例数据 · 已按系统设置减少动效
      - paragraph [ref=e78]:
        - strong [ref=e79]: 数据要求：
        - text: source/target引用有效节点，权重非负；本例中间节点守恒。
      - paragraph [ref=e80]:
        - strong [ref=e81]: 使用边界：
        - text: 显示的是人次流向，不等于去重人数。
      - group [ref=e82]:
        - generic "调用配置、完整源码与示例数据" [ref=e83] [cursor=pointer]
        - option "main.tsx" [selected]
        - option "index.html"
        - option "chart-examples.tsx"
        - option "chart-data.ts"
        - option "chart-catalog.ts"
        - option "chart-examples.css"
```

# Test source

```ts
  74  | 
  75  | test("[P4] multiple candlesticks keep independent SVG gradients", async ({ page }) => {
  76  |   await page.goto("/bklit-catalog.html#chart-candlestick");
  77  |   await page.getByRole("button", { name: "对照实例" }).click();
  78  |   await expect(page.locator('[data-rain-id="chart-candlestick"]')).toHaveCount(2);
  79  |   await expect(page.locator('[data-rain-id="chart-candlestick"] svg').first()).toBeVisible();
  80  |   const ids = await page.locator("linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  81  |   expect(ids.length).toBeGreaterThan(1);
  82  |   expect(new Set(ids).size).toBe(ids.length);
  83  | });
  84  | 
  85  | test("[P5] multiple funnels isolate gradient definitions", async ({ page }) => {
  86  |   await page.emulateMedia({ reducedMotion:"reduce" });
  87  |   await page.goto("/bklit-catalog.html#chart-funnel");
  88  |   await page.getByRole("button", { name:"对照实例" }).click();
  89  |   await expect(page.locator('[data-rain-id="chart-funnel"]')).toHaveCount(2);
  90  |   await expect.poll(() => page.locator("linearGradient[id]").count()).toBeGreaterThan(1);
  91  |   const ids = await page.locator("linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  92  |   expect(new Set(ids).size).toBe(ids.length);
  93  | });
  94  | 
  95  | test("[P1] composed bars leave visible space to both axes", async ({ page }) => {
  96  |   await page.emulateMedia({ reducedMotion:"reduce" });
  97  |   for (const width of [1440,900,390]) {
  98  |     await page.setViewportSize({width,height:1000});
  99  |     await page.goto("/bklit-catalog.html#chart-composed");
  100 |     const host = page.locator('[data-rain-id="chart-composed"]');
  101 |     await expect(host.locator('.series-bar rect').first()).toBeVisible();
  102 |     await page.waitForTimeout(400);
  103 |     const facts = await host.evaluate(el => {
  104 |       const bars = [...el.querySelectorAll('.series-bar rect')].map(x => x.getBoundingClientRect()).filter(x=>x.height>1);
  105 |       const svg = el.querySelector('svg')!.getBoundingClientRect();
  106 |       const labels = [...el.querySelectorAll('span.text-chart-label')].filter(x=>/^\d+%?$/.test(x.textContent ?? "")).map(x=>x.getBoundingClientRect());
  107 |       const left = labels.filter(x=>x.x<svg.x+svg.width/3), right = labels.filter(x=>x.x>svg.x+svg.width*2/3);
  108 |       return {left:Math.min(...bars.map(x=>x.left))-Math.max(...left.map(x=>x.right)),right:Math.min(...right.map(x=>x.left))-Math.max(...bars.map(x=>x.right))};
  109 |     });
  110 |     expect(facts.left).toBeGreaterThanOrEqual(8);expect(facts.right).toBeGreaterThanOrEqual(8);
  111 |   }
  112 | });
  113 | 
  114 | test("[P6] reducing series after a focused last legend item is safe", async ({ page }) => {
  115 |   await page.emulateMedia({reducedMotion:"reduce"});
  116 |   const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
  117 |   for (const id of ["pie","ring","radar"]) {
  118 |     await page.goto(`/bklit-catalog.html#chart-${id}`);
  119 |     await page.getByRole("combobox",{name:"系列数"}).selectOption("5");
  120 |     const host=page.locator(`[data-rain-id="chart-${id}"]`);
  121 |     await host.locator('.rain-chart-legend-button').last().click();
  122 |     await page.getByRole("combobox",{name:"系列数"}).selectOption("3");
  123 |     await expect(host.locator('svg').first()).toBeVisible();
  124 |   }
  125 |   expect(errors).toEqual([]);
  126 | });
  127 | 
  128 | test("[P6] reduced-motion first date and moving highlight are actual readouts", async ({ page }) => {
  129 |   await page.emulateMedia({ reducedMotion: "reduce" });
  130 |   await page.goto("/bklit-catalog.html#chart-area");
  131 |   const chart = page.locator('[data-rain-id="chart-area"]');
  132 |   await expect(chart.locator("svg").first()).toBeVisible();
  133 |   const box = (await chart.locator("svg").first().boundingBox())!;
  134 |   await page.mouse.move(box.x + box.width * .65, box.y + box.height * .4);
  135 |   await expect(chart.locator(".rain-chart-tooltip")).toContainText("9月16日");
  136 |   const visiblePill = () => chart.locator(".bg-zinc-900").evaluate(el => [...el.querySelectorAll("span")].filter(span => {
  137 |     const mask = span.closest(".relative.h-6.overflow-hidden"); if (!mask) return false;
  138 |     const text = span.getBoundingClientRect(), clip = mask.getBoundingClientRect();
  139 |     return text.y + text.height / 2 >= clip.top && text.y + text.height / 2 < clip.bottom;
  140 |   }).map(span => span.textContent).join(" "));
  141 |   await expect.poll(visiblePill).toBe("Sep 16");
  142 |   await page.goto("/bklit-catalog.html#chart-line");
  143 |   const plot = page.locator('[data-rain-id="chart-line"] svg').first();
  144 |   await expect(plot).toBeVisible();
  145 |   await expect.poll(() => plot.evaluate(node => node.getBoundingClientRect().width)).toBeGreaterThan(500);
  146 |   const lineBox = (await plot.boundingBox())!;
  147 |   const clips = () => plot.locator("clipPath rect").evaluateAll(nodes => nodes.filter(node => Number.parseFloat(node.getAttribute("width") ?? "") < 400).map(node => Number.parseFloat(node.getAttribute("x") ?? "")));
  148 |   await page.mouse.move(lineBox.x + lineBox.width * .22, lineBox.y + lineBox.height * .4);
  149 |   await expect.poll(async () => (await clips()).length).toBe(3);
  150 |   await page.mouse.move(lineBox.x + lineBox.width * .78, lineBox.y + lineBox.height * .4);
  151 |   await page.waitForTimeout(65); const immediate = await clips();
  152 |   await page.waitForTimeout(150); const settled = await clips();
  153 |   expect(immediate.length).toBe(3);
  154 |   immediate.forEach((x, index) => expect(Math.abs(x - settled[index]!)).toBeLessThan(.1));
  155 | });
  156 | 
  157 | test("[P3] narrow Sankey labels preserve spacing, the node-center readout and single flow", async ({ page }) => {
  158 |   await page.setViewportSize({ width: 390, height: 1000 });
  159 |   await page.emulateMedia({ reducedMotion: "reduce" });
  160 |   await page.goto("/bklit-catalog.html#chart-sankey");
  161 |   const host = page.locator('[data-rain-id="chart-sankey"]');
  162 |   for (const state of ["normal", "long"]) {
  163 |     await page.getByRole("combobox", { name: "示例状态" }).selectOption(state);
  164 |     const node = host.locator(".sankey-nodes rect").first();
  165 |     await expect(node).toBeVisible(); await node.hover();
  166 |     await expect(host.locator(".rain-chart-tooltip")).toContainText(state === "long" ? "课程入口 · 综合课程学习情况" : "课程入口");
  167 |     await expect(host.locator(".rain-chart-tooltip")).toContainText("400");
  168 |     const boxes = await host.evaluate(element => {
  169 |       const read = (node: Element) => { const b = node.getBoundingClientRect(); return { left: b.left, right: b.right, top: b.top, bottom: b.bottom }; };
  170 |       return { labels: [...element.querySelectorAll(".sankey-nodes text")].map(read), nodes: [...element.querySelectorAll(".sankey-nodes rect")].map(read) };
  171 |     });
  172 |     expect(boxes.labels.every(box => box.left >= 0 && box.right <= 390)).toBe(true);
  173 |     for (const label of boxes.labels) for (const rect of boxes.nodes) {
> 174 |       if (label.bottom > rect.top && label.top < rect.bottom) expect(Math.max(rect.left - label.right, label.left - rect.right)).toBeGreaterThanOrEqual(8);
      |                                                                                                                                  ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  175 |     }
  176 |   }
  177 |   await page.getByRole("combobox", { name: "示例状态" }).selectOption("single");
  178 |   await expect(host.locator(".sankey-nodes rect")).toHaveCount(2);
  179 |   await host.getByText("查看精确数据", { exact: true }).click();
  180 |   await expect(host.locator("tbody tr")).toHaveCount(1);
  181 |   await expect(host.locator("tbody")).toContainText("420");
  182 | });
  183 | 
  184 | test("[P2] both native gauge shapes use Rain gradient and real 0/50/100 readings", async ({ page }) => {
  185 |   await page.emulateMedia({ reducedMotion: "reduce" });
  186 |   await page.goto("/bklit-catalog.html#chart-gauge");
  187 |   const host = page.locator('[data-rain-id="chart-gauge"]');
  188 |   for (const shape of ["arc", "linear"]) {
  189 |     await page.getByRole("combobox", { name: "仪表形态" }).selectOption(shape);
  190 |     for (const value of ["50", "100"]) {
  191 |       await page.getByRole("combobox", { name: "仪表读数" }).selectOption(value);
  192 |       await expect.poll(() => host.locator('svg path[fill^="url("]').count()).toBe(Number(value) / 100 * 40);
  193 |       const stops = await host.locator("linearGradient stop").evaluateAll(nodes => nodes.map(node => getComputedStyle(node).stopColor));
  194 |       expect(new Set(stops).size).toBe(2);
  195 |     }
  196 |     await page.getByRole("combobox", { name: "示例状态" }).selectOption("zero");
  197 |     await expect(host.locator('svg path[fill^="url("]')).toHaveCount(0);
  198 |     await page.getByRole("combobox", { name: "示例状态" }).selectOption("normal");
  199 |   }
  200 | });
  201 | 
```