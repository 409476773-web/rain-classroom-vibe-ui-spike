# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-map.spec.ts >> rapid click after drag/reset activates the current real polygon
- Location: tests/e2e/chart-business-map.spec.ts:224:1

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
  143 |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "659012");
  144 |     await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("normal");
  145 |     await layer(page).getByRole("button", { name: "返回全国", exact: true }).click();
  146 |     await layer(page).getByRole("button", { name: "北京市", exact: true }).click();
  147 |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("直辖市");
  148 |     await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  149 |     await layer(page).getByRole("button", { name: "香港特别行政区", exact: true }).click();
  150 |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("当前来源未提供下级地图");
  151 |     expect(errors).toEqual([]);
  152 |   });
  153 | }
  154 | 
  155 | test("actual filled polygon click and tap drill; mouse/touch drag and two-finger pinch do not activate", async ({ page }) => {
  156 |   await page.emulateMedia({ reducedMotion: "reduce" });
  157 |   await page.goto("/#chart-china");
  158 |   const map = layer(page).locator("svg");
  159 |   const guangdong = () => layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last();
  160 |   let point = await fillPoint(guangdong());
  161 |   const transform = map.locator('> g[transform^="matrix"]').first();
  162 |   const initial = await transform.getAttribute("transform");
  163 |   const initialCss = await transform.evaluate(node => getComputedStyle(node).transform);
  164 |   const reset = async () => {
  165 |     await layer(page).getByRole("button", { name: "重置地图", exact: true }).click();
  166 |     await expect(transform).toHaveAttribute("transform", initial!);
  167 |     await expect.poll(() => transform.evaluate(node => getComputedStyle(node).transform)).toBe(initialCss);
  168 |   };
  169 |   await page.mouse.move(point.x, point.y);
  170 |   await page.mouse.down();
  171 |   await page.mouse.move(point.x + 65, point.y + 18, { steps: 6 });
  172 |   await page.mouse.up();
  173 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  174 |   await reset();
  175 |   point = await fillPoint(guangdong());
  176 |   await page.mouse.move(point.x, point.y);
  177 |   await expect(layer(page).locator('.choropleth-features > path[data-feature-id="440000"]')).toHaveCount(1);
  178 |   await page.mouse.click(point.x, point.y);
  179 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
  180 |   await layer(page).getByRole("button", { name: "返回全国", exact: true }).click();
  181 |   const session = await page.context().newCDPSession(page);
  182 |   point = await fillPoint(guangdong());
  183 |   await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x, y: point.y }] });
  184 |   await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x + 50, y: point.y + 15 }] });
  185 |   await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  186 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  187 |   await reset();
  188 |   point = await fillPoint(guangdong());
  189 |   const before = await transform.getAttribute("transform");
  190 |   await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x - 18, y: point.y }, { id: 1, x: point.x + 18, y: point.y }] });
  191 |   await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x - 42, y: point.y }, { id: 1, x: point.x + 42, y: point.y }] });
  192 |   await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  193 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  194 |   await expect.poll(() => transform.getAttribute("transform")).not.toBe(before);
  195 |   await reset();
  196 |   point = await fillPoint(guangdong());
  197 |   const asymmetricBefore = await transform.getAttribute("transform");
  198 |   await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x - 18, y: point.y }, { id: 1, x: point.x + 18, y: point.y }] });
  199 |   await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x - 18, y: point.y }, { id: 1, x: point.x + 70, y: point.y }] });
  200 |   await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  201 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  202 |   await expect.poll(() => transform.getAttribute("transform")).not.toBe(asymmetricBefore);
  203 |   await reset();
  204 |   point = await fillPoint(guangdong());
  205 |   await page.touchscreen.tap(point.x, point.y);
  206 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
  207 |   await session.detach();
  208 |   await mkdir(evidence, { recursive: true });
  209 |   await writeFile(`${evidence}/pointer-touch.json`, JSON.stringify({ pointerClick: true, pointerDragSuppressed: true, touchDragSuppressed: true, pinchChangedTransformWithoutActivation: true, asymmetricPinchChangedTransformWithoutActivation: true, touchTap: true, physicalHardware: "not-checked" }, null, 2));
  210 | });
  211 | 
  212 | test("rapid direct polygon click retains the true region target through hover changes", async ({ page }) => {
  213 |   await page.emulateMedia({ reducedMotion: "reduce" });
  214 |   await page.goto("/#chart-china");
  215 |   const point = await fillPoint(layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last());
  216 |   await beginClickCapture(page);
  217 |   await page.mouse.click(point.x, point.y);
  218 |   const events = await page.locator("html").getAttribute("data-test-china-click-events");
  219 |   await mkdir(evidence, { recursive: true });
  220 |   await writeFile(`${evidence}/rapid-click-events.json`, JSON.stringify({ point, events: JSON.parse(events ?? "[]"), scope: "Native mouse click without hover settlement; actual document capture and elementFromPoint" }, null, 2));
  221 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
  222 | });
  223 | 
  224 | test("rapid click after drag/reset activates the current real polygon", async ({ page }) => {
  225 |   await page.emulateMedia({ reducedMotion: "reduce" });
  226 |   await page.goto("/#chart-china");
  227 |   let point = await fillPoint(layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last());
  228 |   await beginClickCapture(page);
  229 |   const transform = layer(page).locator('svg > g[transform^="matrix"]').first();
  230 |   const initialCss = await transform.evaluate(node => getComputedStyle(node).transform);
  231 |   await page.mouse.move(point.x, point.y);
  232 |   await page.mouse.down();
  233 |   await page.mouse.move(point.x + 65, point.y + 18, { steps: 6 });
  234 |   await page.mouse.up();
  235 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  236 |   await layer(page).getByRole("button", { name: "重置地图", exact: true }).click();
  237 |   await expect.poll(() => transform.evaluate(node => getComputedStyle(node).transform)).toBe(initialCss);
  238 |   point = await fillPoint(layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last());
  239 |   await page.mouse.click(point.x, point.y);
  240 |   const events = await page.locator("html").getAttribute("data-test-china-click-events");
  241 |   await mkdir(evidence, { recursive: true });
  242 |   await writeFile(`${evidence}/drag-reset-press-events.json`, JSON.stringify({ point, events: JSON.parse(events ?? "[]"), scope: "Native drag/reset then direct rapid click without hover settlement; actual down/up/click capture" }, null, 2));
> 243 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
      |                             ^ Error: expect(locator).toHaveAttribute(expected) failed
  244 | });
  245 | 
  246 | test("all five original world-map variants retain 177 real regions and native zoom/reset", async ({ page }) => {
  247 |   await page.emulateMedia({ reducedMotion: "reduce" });
  248 |   await page.goto("/#chart-choropleth");
  249 |   for (const id of ["choropleth-interactive", "choropleth-default", "choropleth-analytics", "choropleth-graticule", "choropleth-patterns"]) {
  250 |     const card = page.locator(`[data-chart-variant="${id}"]`);
  251 |     await card.scrollIntoViewIfNeeded();
  252 |     await expect(card.locator(".choropleth-features path[data-feature-id]")).toHaveCount(177);
  253 |     expect(await card.locator(".choropleth-features path[data-feature-id]").evaluateAll(paths => paths.every(path => !/NaN|Infinity/.test(path.getAttribute("d") ?? "")))).toBe(true);
  254 |   }
  255 |   const card = page.locator('[data-chart-variant="choropleth-interactive"]');
  256 |   await card.scrollIntoViewIfNeeded();
  257 |   const edgePoint = await fillPoint(card.locator('.choropleth-features path[data-feature-id="1159320937"]').last());
  258 |   const viewport = await card.locator("svg").evaluate(node => ({ left: node.getBoundingClientRect().left, width: node.getBoundingClientRect().width }));
  259 |   expect(edgePoint.x).toBeGreaterThan(viewport.left + viewport.width * .7);
  260 |   await page.mouse.move(edgePoint.x, edgePoint.y);
  261 |   const preciseValue = await card.getByRole("row", { hidden: true }).filter({ hasText: "Japan" }).locator("td").last().textContent();
  262 |   await expectTooltip(card, "Japan", preciseValue === "缺测" ? preciseValue : `${preciseValue} 人`);
  263 |   const transform = card.locator('svg > g[transform^="matrix"]').first();
  264 |   const before = await transform.getAttribute("transform");
  265 |   await card.getByRole("button", { name: "放大地图", exact: true }).click();
  266 |   await expect.poll(() => transform.getAttribute("transform")).not.toBe(before);
  267 |   const zoomed = await transform.getAttribute("transform");
  268 |   await page.locator("h1").scrollIntoViewIfNeeded();
  269 |   await expect(card).toHaveAttribute("data-active", "false");
  270 |   await card.scrollIntoViewIfNeeded();
  271 |   await expect(transform).toHaveAttribute("transform", zoomed!);
  272 |   await card.getByRole("button", { name: "重置地图", exact: true }).click();
  273 |   await expect(transform).toHaveAttribute("transform", before!);
  274 | });
  275 | 
```