# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bklit-catalog.spec.ts >> [P2] ring renders, reads and updates at 390px
- Location: tests/e2e/bklit-catalog.spec.ts:180:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "RingChart padding must be smaller than the radius",
+ ]
```

# Test source

```ts
  117 |       await page.waitForTimeout(2200);
  118 |       if (id === "line" || id === "bar") {
  119 |         const legend = await host.locator(".legend-container").evaluate(el => ({
  120 |           fontSizes: [...el.querySelectorAll("button > span:last-child")].map(x => getComputedStyle(x).fontSize),
  121 |           columnGap: getComputedStyle(el).columnGap,
  122 |         }));
  123 |         expect(legend.fontSizes.length).toBeGreaterThan(0);
  124 |         expect(legend.fontSizes.every(size => size === "13px")).toBe(true);
  125 |         expect(legend.columnGap).toBe("24px");
  126 |         facts.push({ width, id, legend });
  127 |       }
  128 |       if (id === "gauge") {
  129 |         const arc = await host.locator('[data-rain-id="ui-chart-gauge"]').evaluate(el => {
  130 |           const plot = el.querySelector("svg")!.getBoundingClientRect();
  131 |           const reading = el.querySelector("span.tabular-nums")!.parentElement!.getBoundingClientRect();
  132 |           return { centerOffset: (reading.top + reading.height / 2) - (plot.top + plot.height / 2) };
  133 |         });
  134 |         expect(Math.abs(arc.centerOffset)).toBeLessThan(1);
  135 |         await page.screenshot({ path: `${evidence}/gauge-arc-${width}.png`, fullPage: true });
  136 |         await page.getByRole("combobox", { name: "仪表形态", exact: true }).selectOption("linear");
  137 |         await page.waitForTimeout(250);
  138 |         const linear = await host.locator('[data-rain-id="ui-chart-gauge"]').evaluate(el => {
  139 |           const label = el.querySelector("span.text-chart-foreground-muted")!;
  140 |           const labelBox = label.getBoundingClientRect();
  141 |           const reading = label.parentElement!;
  142 |           const track = el.querySelector("svg")!.getBoundingClientRect();
  143 |           return { labelWidth: labelBox.width, labelHeight: labelBox.height, labelFont: getComputedStyle(label).fontSize, readingDirection: getComputedStyle(reading).flexDirection, readingGap: track.top - reading.getBoundingClientRect().bottom };
  144 |         });
  145 |         expect(linear.labelWidth).toBeGreaterThan(20);
  146 |         expect(linear.labelHeight).toBeGreaterThan(0);
  147 |         expect(parseFloat(linear.labelFont)).toBeLessThanOrEqual(13);
  148 |         expect(linear.readingDirection).toBe("row");
  149 |         expect(linear.readingGap).toBeGreaterThanOrEqual(7);
  150 |         expect(linear.readingGap).toBeLessThanOrEqual(9);
  151 |         facts.push({ width, id, arc, linear });
  152 |       }
  153 |       if (id === "sunburst") {
  154 |         const labels = await host.locator("svg text").evaluateAll(nodes => nodes.map(x => ({ label: x.textContent, fill: getComputedStyle(x).fill, stroke: getComputedStyle(x).stroke, fontSize: getComputedStyle(x).fontSize })));
  155 |         expect(labels.length).toBeGreaterThan(0);
  156 |         expect(labels.every(label => label.fill === "rgb(255, 255, 255)" && label.stroke === "none")).toBe(true);
  157 |         facts.push({ width, id, labels });
  158 |       }
  159 |       if (id === "funnel") {
  160 |         const numbers = await host.locator(".font-semibold.text-foreground").evaluateAll(nodes => nodes.map(x => ({ label: x.textContent, fontSize: getComputedStyle(x).fontSize, weight: getComputedStyle(x).fontWeight, color: getComputedStyle(x).color, expected: getComputedStyle(x).getPropertyValue("--rain-category-text-neutral-4").trim() })));
  161 |         expect(numbers.length).toBe(4);
  162 |         expect(numbers.every(x => x.fontSize === "13px" && x.weight === "400")).toBe(true);
  163 |         facts.push({ width, id, numbers });
  164 |       }
  165 |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  166 |       await page.screenshot({ path: `${evidence}/${id}-${width}.png`, fullPage: true });
  167 |     }
  168 |   }
  169 |   await writeFile(`${evidence}/style-facts.json`, JSON.stringify(facts, null, 2));
  170 | });
  171 | 
  172 | test("[P0] Rain chart catalog is a usable independent entry", async ({ page }) => {
  173 |   await page.goto("/bklit-catalog.html");
  174 |   await expect(page.getByRole("heading", { name: "Rain 图表库", exact: true })).toBeVisible({ timeout: 5000 });
  175 |   await expect(page.getByRole("navigation", { name: "图型目录" }).getByRole("link")).toHaveCount(17);
  176 |   await expect(page.locator('[data-rain-id="chart-area"] svg').first()).toBeVisible();
  177 | });
  178 | 
  179 | for (const [phase, ids] of Object.entries(groups)) for (const id of ids) for (const width of [1440,900,390]) {
  180 |   test(`[${phase}] ${id} renders, reads and updates at ${width}px`, async ({ page }) => {
  181 |     const errors: string[] = [];
  182 |     page.on("pageerror", error => errors.push(error.message));
  183 |     await page.setViewportSize({ width, height: 1000 });
  184 |     if (width !== 1440) await page.emulateMedia({ reducedMotion: "reduce" });
  185 |     await page.goto(`/bklit-catalog.html#chart-${id}`);
  186 |     const host = page.locator(`[data-rain-id="chart-${id}"]`).first();
  187 |     await expect(host.locator("svg").first()).toBeVisible();
  188 |     await expect(host.locator('svg :is(path[d],rect,circle)').first()).toBeAttached();
  189 |     await page.waitForTimeout(width === 1440 ? 1800 : 300);
  190 |     await mkdir(evidence, { recursive: true });
  191 |     await page.screenshot({ path: `${evidence}/${id}-${width}.png`, fullPage: true });
  192 |     await host.getByText("查看精确数据", { exact:true }).click();
  193 |     await expect(host.locator("table")).toBeVisible();
  194 |     const before = await host.locator("tbody").innerText();
  195 |     expect(await host.locator("tbody tr").count()).toBeGreaterThan(0);
  196 |     await page.locator("[data-chart-default-controls]").getByRole("button", { name:"更新数据", exact:true }).click();
  197 |     await expect(page.locator(".rain-chart-catalog__status")).toContainText("已更新 1 次");
  198 |     await expect.poll(() => host.locator("tbody").innerText()).not.toBe(before);
  199 |     await expect.poll(() => host.locator("svg").evaluateAll(nodes => Math.max(0, ...nodes.map(node => node.getBoundingClientRect().width)))).toBeGreaterThan(30);
  200 |     const svgIndex = await host.locator("svg").evaluateAll(nodes => nodes.map((node,i) => ({ i, area:node.getBoundingClientRect().width*node.getBoundingClientRect().height })).sort((a,b) => b.area-a.area)[0]!.i);
  201 |     const plot = host.locator("svg").nth(svgIndex);
  202 |     const geometry = await plot.evaluate(svg => ({
  203 |       width: svg.getBoundingClientRect().width, height: svg.getBoundingClientRect().height,
  204 |       invalid: [...svg.querySelectorAll("path[d]")].filter(p => /NaN|Infinity/.test(p.getAttribute("d") ?? "")).length,
  205 |       labelColor: [...svg.querySelectorAll("text")].map(t => getComputedStyle(t).fill).slice(0,12),
  206 |     }));
  207 |     expect(geometry.width).toBeGreaterThan(30); expect(geometry.height).toBeGreaterThan(30); expect(geometry.invalid).toBe(0);
  208 |     const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  209 |     expect(overflow).toBe(false);
  210 |     const hoverable = !["gauge","live-line"].includes(id);
  211 |     if (hoverable) {
  212 |       const box = await plot.boundingBox();
  213 |       await page.mouse.move(box!.x+geometry.width*.48,box!.y+geometry.height*.45);
  214 |       await page.waitForTimeout(300);
  215 |       await page.screenshot({ path: `${evidence}/${id}-${width}-hover.png`, fullPage: true });
  216 |     }
> 217 |     expect(errors).toEqual([]);
      |                    ^ Error: expect(received).toEqual(expected) // deep equality
  218 |     await writeFile(`${evidence}/${id}-${width}-facts.json`, JSON.stringify({ id,width,geometry,errors,hoverChecked:hoverable },null,2));
  219 |   });
  220 | }
  221 | 
  222 | test("[P6] empty, invalid, zero and missing are honest states for all entries", async ({ page }) => {
  223 |   await page.emulateMedia({ reducedMotion:"reduce" });
  224 |   const errors: string[] = []; page.on("pageerror", e => errors.push(e.message));
  225 |   for (const id of Object.values(groups).flat()) {
  226 |     await page.goto(`/bklit-catalog.html#chart-${id}`);
  227 |     const host = page.locator(`[data-rain-id="chart-${id}"]`).first();
  228 |     await page.locator("[data-chart-default-controls]").getByRole("combobox", { name:"示例状态", exact: true }).selectOption("empty");
  229 |     await expect(host).toContainText("暂无数据");
  230 |     await page.locator("[data-chart-default-controls]").getByRole("combobox", { name:"示例状态", exact: true }).selectOption("invalid");
  231 |     await expect(host).toContainText("已拒绝无效数据");
  232 |     await page.locator("[data-chart-default-controls]").getByRole("combobox", { name:"示例状态", exact: true }).selectOption("zero");
  233 |     await expect(host).not.toContainText("NaN");
  234 |     await page.locator("[data-chart-default-controls]").getByRole("combobox", { name:"示例状态", exact: true }).selectOption("missing");
  235 |     if (!["heatmap","choropleth"].includes(id)) await expect(host).toContainText("缺测");
  236 |   }
  237 |   expect(errors).toEqual([]);
  238 | });
  239 | 
  240 | test("[P4] multiple candlesticks keep independent SVG gradients", async ({ page }) => {
  241 |   await page.goto("/bklit-catalog.html#chart-candlestick");
  242 |   await page.getByRole("button", { name: "对照实例" }).click();
  243 |   await expect(page.locator('[data-rain-id="chart-candlestick"]')).toHaveCount(2);
  244 |   await expect(page.locator('[data-rain-id="chart-candlestick"] svg').first()).toBeVisible();
  245 |   const ids = await page.locator("linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  246 |   expect(ids.length).toBeGreaterThan(1);
  247 |   expect(new Set(ids).size).toBe(ids.length);
  248 | });
  249 | 
  250 | test("[P5] multiple funnels isolate gradient definitions", async ({ page }) => {
  251 |   await page.emulateMedia({ reducedMotion:"reduce" });
  252 |   await page.goto("/bklit-catalog.html#chart-funnel");
  253 |   await page.getByRole("button", { name:"对照实例" }).click();
  254 |   await expect(page.locator('[data-rain-id="chart-funnel"]')).toHaveCount(2);
  255 |   await expect.poll(() => page.locator("linearGradient[id]").count()).toBeGreaterThan(1);
  256 |   const ids = await page.locator("linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  257 |   expect(new Set(ids).size).toBe(ids.length);
  258 | });
  259 | 
  260 | test("[P1] composed bars leave visible space to both axes", async ({ page }) => {
  261 |   await page.emulateMedia({ reducedMotion:"reduce" });
  262 |   for (const width of [1440,900,390]) {
  263 |     await page.setViewportSize({width,height:1000});
  264 |     await page.goto("/bklit-catalog.html#chart-composed");
  265 |     const host = page.locator('[data-rain-id="chart-composed"]');
  266 |     await expect(host.locator('.series-bar rect').first()).toBeVisible();
  267 |     await page.waitForTimeout(400);
  268 |     const facts = await host.evaluate(el => {
  269 |       const bars = [...el.querySelectorAll('.series-bar rect')].map(x => x.getBoundingClientRect()).filter(x=>x.height>1);
  270 |       const svg = el.querySelector('svg')!.getBoundingClientRect();
  271 |       const labels = [...el.querySelectorAll('span.text-chart-label')].filter(x=>/^\d+%?$/.test(x.textContent ?? "")).map(x=>x.getBoundingClientRect());
  272 |       const left = labels.filter(x=>x.x<svg.x+svg.width/3), right = labels.filter(x=>x.x>svg.x+svg.width*2/3);
  273 |       return {left:Math.min(...bars.map(x=>x.left))-Math.max(...left.map(x=>x.right)),right:Math.min(...right.map(x=>x.left))-Math.max(...bars.map(x=>x.right))};
  274 |     });
  275 |     expect(facts.left).toBeGreaterThanOrEqual(8);expect(facts.right).toBeGreaterThanOrEqual(8);
  276 |   }
  277 | });
  278 | 
  279 | test("[P6] reducing series after a focused last legend item is safe", async ({ page }) => {
  280 |   await page.emulateMedia({reducedMotion:"reduce"});
  281 |   const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
  282 |   for (const id of ["pie","ring","radar"]) {
  283 |     await page.goto(`/bklit-catalog.html#chart-${id}`);
  284 |     await page.getByRole("combobox",{name:"系列数"}).selectOption("5");
  285 |     const host=page.locator(`[data-rain-id="chart-${id}"]`);
  286 |     await host.locator('.rain-chart-legend-button').last().click();
  287 |     await page.getByRole("combobox",{name:"系列数"}).selectOption("3");
  288 |     await expect(host.locator('svg').first()).toBeVisible();
  289 |   }
  290 |   expect(errors).toEqual([]);
  291 | });
  292 | 
  293 | test("[P6] reduced-motion first date and moving highlight are actual readouts", async ({ page }) => {
  294 |   await page.emulateMedia({ reducedMotion: "reduce" });
  295 |   await page.goto("/bklit-catalog.html#chart-area");
  296 |   const chart = page.locator('[data-rain-id="chart-area"]');
  297 |   await expect(chart.locator("svg").first()).toBeVisible();
  298 |   const box = (await chart.locator("svg").first().boundingBox())!;
  299 |   await page.mouse.move(box.x + box.width * .65, box.y + box.height * .4);
  300 |   await expect(chart.locator(".rain-chart-tooltip")).toContainText("9月16日");
  301 |   const visiblePill = () => chart.locator(".bg-zinc-900").evaluate(el => [...el.querySelectorAll("span")].filter(span => {
  302 |     const mask = span.closest(".relative.h-6.overflow-hidden"); if (!mask) return false;
  303 |     const text = span.getBoundingClientRect(), clip = mask.getBoundingClientRect();
  304 |     return text.y + text.height / 2 >= clip.top && text.y + text.height / 2 < clip.bottom;
  305 |   }).map(span => span.textContent).join(" "));
  306 |   await expect.poll(visiblePill).toBe("Sep 16");
  307 |   await page.goto("/bklit-catalog.html#chart-line");
  308 |   const plot = page.locator('[data-rain-id="chart-line"] svg').first();
  309 |   await expect(plot).toBeVisible();
  310 |   await expect.poll(() => plot.evaluate(node => node.getBoundingClientRect().width)).toBeGreaterThan(500);
  311 |   const lineBox = (await plot.boundingBox())!;
  312 |   const clips = () => plot.locator("clipPath rect").evaluateAll(nodes => nodes.filter(node => Number.parseFloat(node.getAttribute("width") ?? "") < 400).map(node => Number.parseFloat(node.getAttribute("x") ?? "")));
  313 |   await page.mouse.move(lineBox.x + lineBox.width * .22, lineBox.y + lineBox.height * .4);
  314 |   await expect.poll(async () => (await clips()).length).toBe(3);
  315 |   await page.mouse.move(lineBox.x + lineBox.width * .78, lineBox.y + lineBox.height * .4);
  316 |   await page.waitForTimeout(65); const immediate = await clips();
  317 |   await page.waitForTimeout(150); const settled = await clips();
```