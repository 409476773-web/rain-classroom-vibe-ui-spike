# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-second-batch-matrix-china.spec.ts >> china reduce: actual keyboard drill and native touch scrolling at 390px
- Location: tests/e2e/chart-second-batch-matrix-china.spec.ts:127:3

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-china-layer]').locator('[data-map-active="true"]').locator('svg > g[transform^="matrix"]').first()
Expected: "matrix(1, 0, 0, 1, 0, 0)"
Received: "matrix(1, 0, 0, 1, -355.8634948730469, -566.0374755859375)"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('[data-china-layer]').locator('[data-map-active="true"]').locator('svg > g[transform^="matrix"]').first()
    14 × locator resolved to <g transform="matrix(1, 0, 0, 1, -355.8634948730469, -566.0374755859375)">…</g>
       - unexpected value "matrix(1, 0, 0, 1, -355.8634948730469, -566.0374755859375)"

```

# Test source

```ts
  50  |     const end = await activeFacts(chart);
  51  |     const fixture = makeMatrixFixtures(0, "normal", 12).find(item => item.id === id)!;
  52  |     const datum = fixture.cells.find(item => item.rowId === finalRow && item.columnId === finalColumn);
  53  |     expect(end.reading).toBe(datum?.kind === "value" ? fixture.valueFormat!(datum.value) : "缺测");
  54  |     expect(end.labels).toEqual([fixture.rows.at(-1)!.label, fixture.columns.at(-1)!.label]);
  55  |     expect(end.left).toBeGreaterThanOrEqual(end.headingRight - 1);
  56  |     expect(end.right).toBeLessThanOrEqual(end.viewportRight + 1);
  57  |     expect(end.scrollLeft).toBeGreaterThan(0);
  58  |     await expect(chart.locator('[role="status"]')).toContainText(end.reading!);
  59  |     await page.keyboard.press("ArrowLeft");
  60  |     const stable = chart.locator('[data-slot="cell"][data-active="true"]'), handle = await stable.elementHandle();
  61  |     const before = await activeFacts(chart);
  62  |     // Activate the real update control without moving keyboard focus out of the matrix.
  63  |     await page.getByRole("button", { name: "更新数据", exact: true }).evaluate(node => (node as HTMLButtonElement).click());
  64  |     const updated = makeMatrixFixtures(1, "normal", 12).find(item => item.id === id)!;
  65  |     const nextValue = updated.cells.find(item => item.rowId === before.row && item.columnId === before.column)!;
  66  |     if (nextValue.kind !== "value") throw new Error("The adjacent update target must be a value");
  67  |     await expect(stable).toHaveAttribute("aria-label", updated.valueFormat!(nextValue.value));
  68  |     await expect(region).toBeFocused();
  69  |     expect(await handle!.evaluate(node => node.isConnected)).toBe(true);
  70  |     const after = await activeFacts(chart);
  71  |     expect(after.row).toBe(before.row); expect(after.column).toBe(before.column); expect(after.reading).not.toBe(before.reading);
  72  |     await expect(chart.locator(".rain-matrix__tooltip")).toContainText(after.reading!);
  73  |     await page.keyboard.press("Escape"); await expect(chart.locator('[data-active="true"][data-slot="cell"]')).toHaveCount(0);
  74  |     const state = page.getByRole("combobox", { name: "示例状态", exact: true });
  75  |     await state.selectOption("zero");
  76  |     const zero = id === "course-similarity" ? cell(chart, "course-1", "course-2") : cell(chart, "weekday-1", "hour-1");
  77  |     const missing = id === "course-similarity" ? cell(chart, "course-1", "course-1") : cell(chart, "weekday-7", "hour-24");
  78  |     await expect(zero).toHaveAttribute("data-state", "zero"); await expect(zero).toHaveAttribute("aria-label", id === "course-similarity" ? "0%" : "0");
  79  |     await expect(missing).toHaveAttribute("data-state", "missing"); await expect(missing).toHaveAttribute("aria-label", "缺测");
  80  |     await state.selectOption("long"); await region.scrollIntoViewIfNeeded();
  81  |     const layout = await region.evaluate(node => ({ width: node.clientWidth, content: node.scrollWidth, heading: node.querySelector("tbody th")!.getBoundingClientRect().width, columns: [...node.querySelectorAll('tbody tr:first-child [data-slot="cell"]')].map(cell => cell.getBoundingClientRect().width) }));
  82  |     expect(layout.columns).toHaveLength(size); expect(Math.max(...layout.columns) - Math.min(...layout.columns)).toBeLessThanOrEqual(1);
  83  |     expect(layout.heading).toBeLessThanOrEqual(layout.width * .4 + 1); expect(layout.content).toBeGreaterThan(layout.width);
  84  |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  85  |     await region.focus(); await page.keyboard.press("Control+End");
  86  |     await chart.screenshot({ path: `${evidence}/matrix-${id}-390.png` });
  87  |     record(`matrix-${id}`, { end, before, after, layout, nativeSingleEntry: true, zeroMissingDistinct: true });
  88  |   });
  89  | }
  90  | 
  91  | const china = (page: Page) => page.locator("[data-china-layer]");
  92  | const activeMap = (page: Page) => china(page).locator('[data-map-active="true"]');
  93  | const mapTransform = (page: Page) => activeMap(page).locator('svg > g[transform^="matrix"]').first();
  94  | async function mapReady(page: Page, count: number) {
  95  |   await expect(activeMap(page).locator("path[data-feature-id]")).toHaveCount(count);
  96  |   await expect(activeMap(page)).toHaveCSS("opacity", "1"); await expect(activeMap(page)).toHaveCSS("transform", "none");
  97  |   expect(await activeMap(page).locator("path[data-feature-id]").evaluateAll(nodes => nodes.every(node => (node.getAttribute("d") ?? "").length > 20 && !/NaN|Infinity/.test(node.getAttribute("d") ?? "")))).toBe(true);
  98  | }
  99  | async function chooseRegion(page: Page, name: string) {
  100 |   const picker = china(page).getByRole("combobox", { name: "地图地区", exact: true });
  101 |   await picker.focus(); await picker.press("Enter");
  102 |   const search = page.getByRole("combobox", { name: "搜索选项", exact: true });
  103 |   await search.fill(name); await search.press("Enter");
  104 |   await expect(picker).toBeFocused();
  105 | }
  106 | async function filledPoint(path: Locator) {
  107 |   await path.scrollIntoViewIfNeeded();
  108 |   return path.evaluate(node => {
  109 |     const path = node as SVGPathElement, box = path.getBBox(), matrix = path.getScreenCTM()!;
  110 |     for (const y of [.5, .4, .6, .3, .7]) for (const x of [.5, .4, .6, .3, .7]) {
  111 |       const point = new DOMPoint(box.x + box.width * x, box.y + box.height * y);
  112 |       if (path.isPointInFill(point)) { const screen = point.matrixTransform(matrix); if (document.elementFromPoint(screen.x, screen.y)?.closest("[data-feature-id]") === path) return { x: screen.x, y: screen.y }; }
  113 |     }
  114 |     throw new Error("No visible filled point on the actual region polygon");
  115 |   });
  116 | }
  117 | async function swipe(page: Page, point: { x: number; y: number }, dx: number, dy: number) {
  118 |   const session = await page.context().newCDPSession(page);
  119 |   try {
  120 |     await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, ...point }] });
  121 |     for (let move = 1; move <= 8; move++) { await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x + dx * move / 8, y: point.y + dy * move / 8 }] }); await page.waitForTimeout(25); }
  122 |     await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  123 |   } finally { await session.detach(); }
  124 | }
  125 | 
  126 | for (const motion of ["no-preference", "reduce"] as const) {
  127 |   test(`china ${motion}: actual keyboard drill and native touch scrolling at 390px`, async ({ page }) => {
  128 |     await page.emulateMedia({ reducedMotion: motion }); await page.goto("/#chart-china"); await mapReady(page, 34);
  129 |     const national = await mapTransform(page).getAttribute("transform");
  130 |     const svg = activeMap(page).locator("svg"); await expect(svg).toHaveCSS("touch-action", "pan-y");
  131 |     await chooseRegion(page, "广东省"); await expect(china(page)).toHaveAttribute("data-china-layer", "440000"); await mapReady(page, 21);
  132 |     await chooseRegion(page, "深圳市");
  133 |     const detail = china(page).getByRole("region", { name: "地区样本详情", exact: true });
  134 |     await expect(detail).toHaveAttribute("data-selected-region", "440300");
  135 |     await expect(activeMap(page).locator('path[data-feature-id="440300"]')).toHaveAttribute("data-selected", "true");
  136 |     const initialValue = 158; // Shenzhen 440300 in the existing Guangdong snapshot, revision 0.
  137 |     await expect(detail).toContainText(`${initialValue} 人`);
  138 |     await page.getByText("体验不同数据状态与配色", { exact: true }).click();
  139 |     await page.getByRole("button", { name: "更新数据", exact: true }).click();
  140 |     const value = 162;
  141 |     await expect(detail).toContainText(`${value} 人`); await expect(detail).toHaveAttribute("data-selected-region", "440300");
  142 |     await china(page).getByText("查看精确数据", { exact: true }).click();
  143 |     await expect(china(page).locator('[data-china-row="440300"]')).toContainText(`${value} 人`);
  144 |     await china(page).screenshot({ path: `${evidence}/china-guangdong-${motion}-390.png` });
  145 |     await chooseRegion(page, "全国"); await mapReady(page, 34); await expect(china(page)).toHaveAttribute("data-china-layer", "national");
  146 |     await expect(mapTransform(page)).toHaveAttribute("transform", national!);
  147 |     let point = await filledPoint(activeMap(page).locator('path[data-feature-id="440000"]'));
  148 |     const scrollBefore = await page.evaluate(() => scrollY); await swipe(page, point, 0, -100);
  149 |     await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(scrollBefore + 20);
> 150 |     await expect(mapTransform(page)).toHaveAttribute("transform", national!);
      |                                      ^ Error: expect(locator).toHaveAttribute(expected) failed
  151 |     await expect(china(page).locator(".rain-chart-tooltip")).toHaveCount(0);
  152 |     const scrollAfter = await page.evaluate(() => scrollY);
  153 |     await page.waitForTimeout(500);
  154 |     await china(page).getByRole("button", { name: "放大地图", exact: true }).click(); await expect(svg).toHaveCSS("touch-action", "none");
  155 |     point = await filledPoint(activeMap(page).locator('path[data-feature-id="440000"]'));
  156 |     const zoomed = await mapTransform(page).getAttribute("transform"), zoomScroll = await page.evaluate(() => scrollY);
  157 |     await swipe(page, point, -45, -80);
  158 |     await expect.poll(() => mapTransform(page).getAttribute("transform")).not.toBe(zoomed);
  159 |     await expect(china(page)).toHaveAttribute("data-china-layer", "national");
  160 |     expect(Math.abs(await page.evaluate(() => scrollY) - zoomScroll)).toBeLessThanOrEqual(1);
  161 |     await expect(china(page).locator(".rain-chart-tooltip")).toHaveCount(0);
  162 |     const dragged = await mapTransform(page).getAttribute("transform");
  163 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  164 |     await china(page).screenshot({ path: `${evidence}/china-touch-${motion}-390.png` });
  165 |     record(`china-${motion}`, { national, initialValue, updatedValue: value, selectedId: "440300", nationalRegions: 34, guangdongRegions: 21, scrollBefore, scrollAfter, zoomScroll, zoomed, dragged, actualCDPTouch: true });
  166 |   });
  167 | }
  168 | 
```