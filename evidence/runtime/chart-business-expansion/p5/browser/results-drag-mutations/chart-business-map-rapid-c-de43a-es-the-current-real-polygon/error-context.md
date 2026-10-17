# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-map.spec.ts >> rapid click after drag/reset activates the current real polygon
- Location: tests/e2e/chart-business-map.spec.ts:237:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-china-layer]')
Expected: "440000"
Received: "national"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('[data-china-layer]')
    14 × locator resolved to <section data-revision="0" data-state="normal" data-china-layer="national" data-recipe="monochrome-blue" class="rain-china-example rain-chart">…</section>
       - unexpected value "national"

```

```yaml
- text: CH-117
- heading "全国 · 地区参与人数" [level=2]
- navigation "当前地图层级":
  - list
- paragraph: 示例参与人数 · 各层独立统计、独立量程；全国与省内的颜色深浅不直接比较。统计值与地区详情均为 Mock。
- button "放大地图": 放大
- button "缩小地图": 缩小
- button "重置地图": 重置
- text: 广东省 示例参与人数 146 人
- paragraph:
  - text: 固定混合快照：地区名称按 2024 清单，HDX 为 2020 快照（实际边界年代未知），OSM 于 2026-10-09—10 提取；不代表最新行政边界。
  - link "HDX/OCHA （新标签页打开）":
    - /url: https://data.humdata.org/dataset/cod-ab-chn
  - text: （
  - link "CC BY 3.0 IGO （新标签页打开）":
    - /url: https://creativecommons.org/licenses/by/3.0/igo/
  - text: ）；
  - link "© OpenStreetMap contributors （新标签页打开）":
    - /url: https://www.openstreetmap.org/copyright
  - text: （
  - link "ODbL （新标签页打开）":
    - /url: https://opendatacommons.org/licenses/odbl/1-0/
  - text: ）。
- group "参与人数色阶，0到251人，另有无数据": 0 人 251 人 无数据
- paragraph: 可点地图或用下方地区按钮操作，支持 Enter / 空格。省份进入省内层；直辖市和无下级来源地区进入说明。
- list "地区列表":
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
  - listitem
- group: 查看精确数据
- paragraph: 当前省级层 34 个地区；省内层保留实际地级和省直管县级身份，未扩展区县地图。
```

# Test source

```ts
  157 |     await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("normal");
  158 |     await layer(page).getByRole("button", { name: "返回全国", exact: true }).click();
  159 |     await layer(page).getByRole("button", { name: "北京市", exact: true }).click();
  160 |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("直辖市");
  161 |     await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  162 |     await layer(page).getByRole("button", { name: "香港特别行政区", exact: true }).click();
  163 |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("当前来源未提供下级地图");
  164 |     expect(errors).toEqual([]);
  165 |   });
  166 | }
  167 | 
  168 | test("actual filled polygon click and tap drill; mouse/touch drag and two-finger pinch do not activate", async ({ page }) => {
  169 |   await page.emulateMedia({ reducedMotion: "reduce" });
  170 |   await page.goto("/#chart-china");
  171 |   const map = layer(page).locator("svg");
  172 |   const guangdong = () => layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last();
  173 |   let point = await fillPoint(guangdong());
  174 |   const transform = map.locator('> g[transform^="matrix"]').first();
  175 |   const initial = await transform.getAttribute("transform");
  176 |   const initialCss = await transform.evaluate(node => getComputedStyle(node).transform);
  177 |   const reset = async () => {
  178 |     await layer(page).getByRole("button", { name: "重置地图", exact: true }).click();
  179 |     await expect(transform).toHaveAttribute("transform", initial!);
  180 |     await expect.poll(() => transform.evaluate(node => getComputedStyle(node).transform)).toBe(initialCss);
  181 |   };
  182 |   await page.mouse.move(point.x, point.y);
  183 |   await page.mouse.down();
  184 |   await page.mouse.move(point.x + 65, point.y + 18, { steps: 6 });
  185 |   await page.mouse.up();
  186 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  187 |   await reset();
  188 |   point = await fillPoint(guangdong());
  189 |   await page.mouse.move(point.x, point.y);
  190 |   await expect(guangdong()).toHaveAttribute("opacity", "1");
  191 |   await page.mouse.click(point.x, point.y);
  192 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
  193 |   await layer(page).getByRole("button", { name: "返回全国", exact: true }).click();
  194 |   const session = await page.context().newCDPSession(page);
  195 |   point = await fillPoint(guangdong());
  196 |   await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x, y: point.y }] });
  197 |   await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x + 50, y: point.y + 15 }] });
  198 |   await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  199 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  200 |   await reset();
  201 |   point = await fillPoint(guangdong());
  202 |   const before = await transform.getAttribute("transform");
  203 |   await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x - 18, y: point.y }, { id: 1, x: point.x + 18, y: point.y }] });
  204 |   await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x - 42, y: point.y }, { id: 1, x: point.x + 42, y: point.y }] });
  205 |   await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  206 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  207 |   await expect.poll(() => transform.getAttribute("transform")).not.toBe(before);
  208 |   await reset();
  209 |   point = await fillPoint(guangdong());
  210 |   const asymmetricBefore = await transform.getAttribute("transform");
  211 |   await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x - 18, y: point.y }, { id: 1, x: point.x + 18, y: point.y }] });
  212 |   await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x - 18, y: point.y }, { id: 1, x: point.x + 70, y: point.y }] });
  213 |   await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  214 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  215 |   await expect.poll(() => transform.getAttribute("transform")).not.toBe(asymmetricBefore);
  216 |   await reset();
  217 |   point = await fillPoint(guangdong());
  218 |   await page.touchscreen.tap(point.x, point.y);
  219 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
  220 |   await session.detach();
  221 |   await mkdir(evidence, { recursive: true });
  222 |   await writeFile(`${evidence}/pointer-touch.json`, JSON.stringify({ pointerClick: true, pointerDragSuppressed: true, touchDragSuppressed: true, pinchChangedTransformWithoutActivation: true, asymmetricPinchChangedTransformWithoutActivation: true, touchTap: true, physicalHardware: "not-checked" }, null, 2));
  223 | });
  224 | 
  225 | test("rapid direct polygon click retains the true region target through hover changes", async ({ page }) => {
  226 |   await page.emulateMedia({ reducedMotion: "reduce" });
  227 |   await page.goto("/#chart-china");
  228 |   const point = await fillPoint(layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last());
  229 |   await beginClickCapture(page);
  230 |   await page.mouse.click(point.x, point.y);
  231 |   const events = await page.locator("html").getAttribute("data-test-china-click-events");
  232 |   await mkdir(evidence, { recursive: true });
  233 |   await writeFile(`${evidence}/rapid-click-events.json`, JSON.stringify({ point, events: JSON.parse(events ?? "[]"), scope: "Native mouse click without hover settlement; actual document capture and elementFromPoint" }, null, 2));
  234 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
  235 | });
  236 | 
  237 | test("rapid click after drag/reset activates the current real polygon", async ({ page }) => {
  238 |   await page.emulateMedia({ reducedMotion: "reduce" });
  239 |   await page.goto("/#chart-china");
  240 |   let point = await fillPoint(layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last());
  241 |   await beginClickCapture(page);
  242 |   const transform = layer(page).locator('svg > g[transform^="matrix"]').first();
  243 |   const initialCss = await transform.evaluate(node => getComputedStyle(node).transform);
  244 |   await page.mouse.move(point.x, point.y);
  245 |   await page.mouse.down();
  246 |   await page.mouse.move(point.x + 65, point.y + 18, { steps: 6 });
  247 |   await page.mouse.up();
  248 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  249 |   await layer(page).getByRole("button", { name: "重置地图", exact: true }).click();
  250 |   await expect.poll(() => transform.evaluate(node => getComputedStyle(node).transform)).toBe(initialCss);
  251 |   point = await fillPoint(layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last());
  252 |   await page.mouse.click(point.x, point.y);
  253 |   const events = await page.locator("html").getAttribute("data-test-china-click-events");
  254 |   const mutations = await page.locator("html").getAttribute("data-test-china-path-mutations");
  255 |   await mkdir(evidence, { recursive: true });
  256 |   await writeFile(`${evidence}/drag-reset-press-events.json`, JSON.stringify({ point, events: JSON.parse(events ?? "[]"), mutations: JSON.parse(mutations ?? "[]"), scope: "Native drag/reset then direct rapid click without hover settlement; actual down/up/click capture and path insertion/removal observation" }, null, 2));
> 257 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
      |                             ^ Error: expect(locator).toHaveAttribute(expected) failed
  258 | });
  259 | 
  260 | test("all five original world-map variants retain 177 real regions and native zoom/reset", async ({ page }) => {
  261 |   await page.emulateMedia({ reducedMotion: "reduce" });
  262 |   await page.goto("/#chart-choropleth");
  263 |   for (const id of ["choropleth-interactive", "choropleth-default", "choropleth-analytics", "choropleth-graticule", "choropleth-patterns"]) {
  264 |     const card = page.locator(`[data-chart-variant="${id}"]`);
  265 |     await card.scrollIntoViewIfNeeded();
  266 |     await expect(card.locator(".choropleth-features path[data-feature-id]")).toHaveCount(177);
  267 |     expect(await card.locator(".choropleth-features path[data-feature-id]").evaluateAll(paths => paths.every(path => !/NaN|Infinity/.test(path.getAttribute("d") ?? "")))).toBe(true);
  268 |   }
  269 |   const card = page.locator('[data-chart-variant="choropleth-interactive"]');
  270 |   await card.scrollIntoViewIfNeeded();
  271 |   const edgePoint = await fillPoint(card.locator('.choropleth-features path[data-feature-id="1159320937"]').last());
  272 |   const viewport = await card.locator("svg").evaluate(node => ({ left: node.getBoundingClientRect().left, width: node.getBoundingClientRect().width }));
  273 |   expect(edgePoint.x).toBeGreaterThan(viewport.left + viewport.width * .7);
  274 |   await page.mouse.move(edgePoint.x, edgePoint.y);
  275 |   const preciseValue = await card.getByRole("row", { includeHidden: true }).filter({ hasText: "Japan" }).locator("td").last().textContent();
  276 |   await expectTooltip(card, "Japan", preciseValue === "缺测" ? preciseValue : `${preciseValue} 人`);
  277 |   const transform = card.locator('svg > g[transform^="matrix"]').first();
  278 |   const before = await transform.getAttribute("transform");
  279 |   await card.getByRole("button", { name: "放大地图", exact: true }).click();
  280 |   await expect.poll(() => transform.getAttribute("transform")).not.toBe(before);
  281 |   const zoomed = await transform.getAttribute("transform");
  282 |   await page.locator("h1").scrollIntoViewIfNeeded();
  283 |   await expect(card).toHaveAttribute("data-active", "false");
  284 |   await card.scrollIntoViewIfNeeded();
  285 |   await expect(transform).toHaveAttribute("transform", zoomed!);
  286 |   await card.getByRole("button", { name: "重置地图", exact: true }).click();
  287 |   await expect(transform).toHaveAttribute("transform", before!);
  288 | });
  289 | 
```