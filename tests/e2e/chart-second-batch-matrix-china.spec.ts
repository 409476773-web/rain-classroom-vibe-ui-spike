import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test, type Locator, type Page } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { makeMatrixFixtures } from "../../apps/playground/src/docs/components/chart-business/matrix-data";

const evidence = evidenceOutputPath("evidence/runtime/chart-experience-second-batch-2026-10-11/heatmap-matrix-map/matrix-china");
const browserErrors = new WeakMap<Page, string[]>();
const matrix = (page: Page, id: string) => page.locator(`[data-matrix-example="${id}"] [data-rain-id="ui-chart-matrix"]`);
const cell = (chart: Locator, row: string, column: string) => chart.locator(`[data-slot="cell"][data-row-id="${row}"][data-column-id="${column}"]`);
function record(name: string, facts: unknown) { writeFileSync(`${evidence}/${name}.json`, JSON.stringify(facts, null, 2) + "\n"); }
function hashes() {
  const files: string[] = [];
  for (const path of ["packages/ui/src/charts/matrix", "apps/playground/src/docs/components/chart-business/data/china"]) files.push(...readdirSync(path, { recursive: true }).filter(file => /\.(tsx?|css|json|geojson|md)$/.test(file)).map(file => `${path}/${file}`));
  for (const file of readdirSync("apps/playground/src/docs/components/chart-business")) if (/^(china-region|matrix-)/.test(file)) files.push(`apps/playground/src/docs/components/chart-business/${file}`);
  return Object.fromEntries(files.sort().map(file => [file, createHash("sha256").update(readFileSync(file)).digest("hex")]));
}
let sourceBefore: ReturnType<typeof hashes>;
test.beforeAll(() => { mkdirSync(evidence, { recursive: true }); sourceBefore = hashes(); record("source-before", sourceBefore); });
test.afterAll(() => { const after = hashes(); record("source-after", after); record("source-parity", { unchanged: JSON.stringify(after) === JSON.stringify(sourceBefore), files: Object.keys(after).length }); expect(after).toEqual(sourceBefore); });
test.beforeEach(async ({ page }) => {
  const errors: string[] = []; browserErrors.set(page, errors);
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
});
test.afterEach(async ({ page }, info) => {
  const name = info.title.replace(/[^a-z0-9]+/gi, "-");
  record(`${name}-browser-errors`, browserErrors.get(page));
  if (info.status !== "passed") record(`${name}-layout`, await page.evaluate(() => ({ width: innerWidth, pageWidth: document.documentElement.scrollWidth, scrollX, tables: [...document.querySelectorAll('[data-rain-id="ui-table-scroll-area"],.rain-china-data')].map(node => ({ className: node.className, width: node.getBoundingClientRect().width, maxWidth: getComputedStyle(node).maxWidth, overflowX: getComputedStyle(node).overflowX, clientWidth: node.clientWidth, scrollWidth: node.scrollWidth })) })));
  expect(browserErrors.get(page)).toEqual([]);
});

async function activeFacts(chart: Locator) {
  return chart.locator('[data-slot="cell"][data-active="true"]').evaluate(node => {
    const bounds = node.getBoundingClientRect(), heading = node.parentElement!.querySelector("th")!.getBoundingClientRect();
    const region = node.closest('[data-slot="scroll-container"]')!, viewport = region.getBoundingClientRect();
    const labels = (node.getAttribute("headers") ?? "").split(" ").map(id => document.getElementById(id)?.textContent?.trim());
    return { row: node.getAttribute("data-row-id"), column: node.getAttribute("data-column-id"), reading: node.getAttribute("aria-label"), labels, left: bounds.left, right: bounds.right, headingRight: heading.right, viewportRight: viewport.right, scrollLeft: region.scrollLeft };
  });
}

for (const [id, size, finalRow, finalColumn] of [["course-similarity", 12, "course-12", "course-12"], ["weekday-hour", 24, "weekday-7", "hour-24"]] as const) {
  test(`matrix ${id}: accurate keyboard readings, stable updates and contained 390px scrolling`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#chart-matrix");
    if (id === "course-similarity") await page.getByRole("button", { name: "12×12", exact: true }).click();
    const chart = matrix(page, id), region = chart.locator('[data-slot="scroll-container"]');
    await expect(chart.locator("tbody tr")).toHaveCount(id === "course-similarity" ? 12 : 7);
    await expect(chart.locator('[data-slot="cell"]')).toHaveCount(id === "course-similarity" ? 144 : 168);
    await expect(region.locator("[tabindex]" )).toHaveCount(0);
    await region.scrollIntoViewIfNeeded(); await page.mouse.move(0, 0); await region.focus();
    await page.keyboard.press("Control+End");
    await expect(cell(chart, finalRow, finalColumn)).toHaveAttribute("data-active", "true");
    const end = await activeFacts(chart);
    const fixture = makeMatrixFixtures(0, "normal", 12).find(item => item.id === id)!;
    const datum = fixture.cells.find(item => item.rowId === finalRow && item.columnId === finalColumn);
    expect(end.reading).toBe(datum?.kind === "value" ? fixture.valueFormat!(datum.value) : "缺测");
    expect(end.labels).toEqual([fixture.rows.at(-1)!.label, fixture.columns.at(-1)!.label]);
    expect(end.left).toBeGreaterThanOrEqual(end.headingRight - 1);
    expect(end.right).toBeLessThanOrEqual(end.viewportRight + 1);
    expect(end.scrollLeft).toBeGreaterThan(0);
    await expect(chart.locator('[role="status"]')).toContainText(end.reading!);
    await page.keyboard.press("ArrowLeft");
    const stable = chart.locator('[data-slot="cell"][data-active="true"]'), handle = await stable.elementHandle();
    const before = await activeFacts(chart);
    // Activate the real update control without moving keyboard focus out of the matrix.
    await page.getByRole("button", { name: "更新数据", exact: true }).evaluate(node => (node as HTMLButtonElement).click());
    const updated = makeMatrixFixtures(1, "normal", 12).find(item => item.id === id)!;
    const nextValue = updated.cells.find(item => item.rowId === before.row && item.columnId === before.column)!;
    if (nextValue.kind !== "value") throw new Error("The adjacent update target must be a value");
    await expect(stable).toHaveAttribute("aria-label", updated.valueFormat!(nextValue.value));
    await expect(region).toBeFocused();
    expect(await handle!.evaluate(node => node.isConnected)).toBe(true);
    const after = await activeFacts(chart);
    expect(after.row).toBe(before.row); expect(after.column).toBe(before.column); expect(after.reading).not.toBe(before.reading);
    await expect(chart.locator(".rain-matrix__tooltip")).toContainText(after.reading!);
    await page.keyboard.press("Escape"); await expect(chart.locator('[data-active="true"][data-slot="cell"]')).toHaveCount(0);
    const state = page.getByRole("combobox", { name: "示例状态", exact: true });
    await state.selectOption("zero");
    const zero = id === "course-similarity" ? cell(chart, "course-1", "course-2") : cell(chart, "weekday-1", "hour-1");
    const missing = id === "course-similarity" ? cell(chart, "course-1", "course-1") : cell(chart, "weekday-7", "hour-24");
    await expect(zero).toHaveAttribute("data-state", "zero"); await expect(zero).toHaveAttribute("aria-label", id === "course-similarity" ? "0%" : "0");
    await expect(missing).toHaveAttribute("data-state", "missing"); await expect(missing).toHaveAttribute("aria-label", "缺测");
    await state.selectOption("long"); await region.scrollIntoViewIfNeeded();
    const layout = await region.evaluate(node => ({ width: node.clientWidth, content: node.scrollWidth, heading: node.querySelector("tbody th")!.getBoundingClientRect().width, columns: [...node.querySelectorAll('tbody tr:first-child [data-slot="cell"]')].map(cell => cell.getBoundingClientRect().width) }));
    expect(layout.columns).toHaveLength(size); expect(Math.max(...layout.columns) - Math.min(...layout.columns)).toBeLessThanOrEqual(1);
    expect(layout.heading).toBeLessThanOrEqual(layout.width * .4 + 1); expect(layout.content).toBeGreaterThan(layout.width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await region.focus(); await page.keyboard.press("Control+End");
    await chart.screenshot({ path: `${evidence}/matrix-${id}-390.png` });
    record(`matrix-${id}`, { end, before, after, layout, nativeSingleEntry: true, zeroMissingDistinct: true });
  });
}

const china = (page: Page) => page.locator("[data-china-layer]");
const activeMap = (page: Page) => china(page).locator('[data-map-active="true"]');
const mapTransform = (page: Page) => activeMap(page).locator('svg > g[transform^="matrix"]').first();
async function mapReady(page: Page, count: number) {
  await expect(activeMap(page).locator("path[data-feature-id]")).toHaveCount(count);
  await expect(activeMap(page)).toHaveCSS("opacity", "1"); await expect(activeMap(page)).toHaveCSS("transform", "none");
  expect(await activeMap(page).locator("path[data-feature-id]").evaluateAll(nodes => nodes.every(node => (node.getAttribute("d") ?? "").length > 20 && !/NaN|Infinity/.test(node.getAttribute("d") ?? "")))).toBe(true);
}
async function chooseRegion(page: Page, name: string) {
  const picker = china(page).getByRole("combobox", { name: "地图地区", exact: true });
  await picker.focus(); await picker.press("Enter");
  const search = page.getByRole("combobox", { name: "搜索选项", exact: true });
  await search.fill(name); await search.press("Enter");
  await expect(picker).toBeFocused();
}
async function filledPoint(path: Locator) {
  await path.scrollIntoViewIfNeeded();
  return path.evaluate(node => {
    const path = node as SVGPathElement, box = path.getBBox(), matrix = path.getScreenCTM()!;
    for (const y of [.5, .4, .6, .3, .7]) for (const x of [.5, .4, .6, .3, .7]) {
      const point = new DOMPoint(box.x + box.width * x, box.y + box.height * y);
      if (path.isPointInFill(point)) { const screen = point.matrixTransform(matrix); if (document.elementFromPoint(screen.x, screen.y)?.closest("[data-feature-id]") === path) return { x: screen.x, y: screen.y }; }
    }
    throw new Error("No visible filled point on the actual region polygon");
  });
}
async function swipe(page: Page, point: { x: number; y: number }, dx: number, dy: number) {
  const session = await page.context().newCDPSession(page);
  try {
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, ...point }] });
    for (let move = 1; move <= 8; move++) { await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x + dx * move / 8, y: point.y + dy * move / 8 }] }); await page.waitForTimeout(25); }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  } finally { await session.detach(); }
}

for (const motion of ["no-preference", "reduce"] as const) {
  test(`china ${motion}: actual keyboard drill and native touch scrolling at 390px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: motion }); await page.goto("/#chart-china"); await mapReady(page, 34);
    const national = await mapTransform(page).getAttribute("transform");
    const svg = activeMap(page).locator("svg"); await expect(svg).toHaveCSS("touch-action", "pan-y");
    await chooseRegion(page, "广东省"); await expect(china(page)).toHaveAttribute("data-china-layer", "440000"); await mapReady(page, 21);
    await chooseRegion(page, "深圳市");
    const detail = china(page).getByRole("region", { name: "地区样本详情", exact: true });
    await expect(detail).toHaveAttribute("data-selected-region", "440300");
    await expect(activeMap(page).locator('path[data-feature-id="440300"]')).toHaveAttribute("data-selected", "true");
    const initialValue = 158; // Shenzhen 440300 in the existing Guangdong snapshot, revision 0.
    await expect(detail).toContainText(`${initialValue} 人`);
    await page.getByText("体验不同数据状态与配色", { exact: true }).click();
    await page.getByRole("button", { name: "更新数据", exact: true }).click();
    const value = 162;
    await expect(detail).toContainText(`${value} 人`); await expect(detail).toHaveAttribute("data-selected-region", "440300");
    await china(page).getByText("查看精确数据", { exact: true }).click();
    await expect(china(page).locator('[data-china-row="440300"]')).toContainText(`${value} 人`);
    await china(page).screenshot({ path: `${evidence}/china-guangdong-${motion}-390.png` });
    await chooseRegion(page, "全国"); await mapReady(page, 34); await expect(china(page)).toHaveAttribute("data-china-layer", "national");
    await expect(mapTransform(page)).toHaveAttribute("transform", national!);
    await svg.evaluate(node => {
      const timeline: unknown[] = [];
      (node as SVGSVGElement & { touchTimeline: unknown[] }).touchTimeline = timeline;
      for (const type of ["pointerdown", "pointermove", "pointerup", "pointercancel"]) node.addEventListener(type, event => {
        const pointer = event as PointerEvent;
        const sample = (phase: string) => timeline.push({ phase, pointerType: pointer.pointerType, clientX: pointer.clientX, clientY: pointer.clientY, scrollY, transform: node.querySelector(":scope > g")?.getAttribute("transform") });
        sample(type); requestAnimationFrame(() => sample(type + "-frame"));
      }, true);
    });
    let point = await filledPoint(activeMap(page).locator('path[data-feature-id="440000"]'));
    const scrollBefore = await page.evaluate(() => scrollY); await swipe(page, point, 0, -100);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(scrollBefore + 20);
    record(`touch-scroll-timeline-${motion}`, { point, scrollBefore, scrollAfter: await page.evaluate(() => scrollY), transformBefore: national, transformAfter: await mapTransform(page).getAttribute("transform"), timeline: await svg.evaluate(node => (node as SVGSVGElement & { touchTimeline: unknown[] }).touchTimeline) });
    await expect(mapTransform(page)).toHaveAttribute("transform", national!);
    await expect(china(page).locator(".rain-chart-tooltip")).toHaveCount(0);
    const scrollAfter = await page.evaluate(() => scrollY);
    await page.waitForTimeout(500);
    await china(page).getByRole("button", { name: "放大地图", exact: true }).click(); await expect(svg).toHaveCSS("touch-action", "none");
    point = await filledPoint(activeMap(page).locator('path[data-feature-id="440000"]'));
    const zoomed = await mapTransform(page).getAttribute("transform"), zoomScroll = await page.evaluate(() => scrollY);
    await swipe(page, point, -45, -80);
    await expect.poll(() => mapTransform(page).getAttribute("transform")).not.toBe(zoomed);
    await expect(china(page)).toHaveAttribute("data-china-layer", "national");
    expect(Math.abs(await page.evaluate(() => scrollY) - zoomScroll)).toBeLessThanOrEqual(1);
    await expect(china(page).locator(".rain-chart-tooltip")).toHaveCount(0);
    const dragged = await mapTransform(page).getAttribute("transform");
    await china(page).screenshot({ path: `${evidence}/china-touch-${motion}-390.png` });
    await china(page).getByRole("button", { name: "恢复地图视图", exact: true }).click();
    await expect(mapTransform(page)).toHaveAttribute("transform", national!); await expect(svg).toHaveCSS("touch-action", "pan-y");
    point = await filledPoint(activeMap(page).locator('path[data-feature-id="440000"]'));
    await page.touchscreen.tap(point.x, point.y); await mapReady(page, 21);
    await chooseRegion(page, "全国"); await mapReady(page, 34);
    await activeMap(page).locator("svg").scrollIntoViewIfNeeded();
    const bounds = (await svg.boundingBox())!, center = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
    const session = await page.context().newCDPSession(page);
    try {
      await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: center.x - 18, y: center.y }, { id: 1, x: center.x + 18, y: center.y }] });
      for (let move = 1; move <= 6; move++) { await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: center.x - 18 - move * 5, y: center.y }, { id: 1, x: center.x + 18 + move * 5, y: center.y }] }); await page.waitForTimeout(25); }
      await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    } finally { await session.detach(); }
    await expect.poll(() => mapTransform(page).getAttribute("transform")).not.toBe(national);
    await expect(svg).toHaveCSS("touch-action", "none");
    const pinched = await mapTransform(page).getAttribute("transform");
    await chooseRegion(page, "广东省"); await mapReady(page, 21); await chooseRegion(page, "全国"); await mapReady(page, 34);
    await expect(mapTransform(page)).toHaveAttribute("transform", pinched!);
    await page.getByRole("combobox", { name: "地图数据状态", exact: true }).selectOption("load-error");
    await chooseRegion(page, "广东省");
    await expect(china(page).getByRole("alert")).toContainText("边界加载失败");
    await expect(china(page)).toHaveAttribute("data-china-layer", "national");
    await expect(activeMap(page).locator("path[data-feature-id]")).toHaveCount(34);
    await expect(mapTransform(page)).toHaveAttribute("transform", pinched!);
    await china(page).getByRole("button", { name: "重试加载", exact: true }).click(); await mapReady(page, 21);
    await chooseRegion(page, "全国"); await mapReady(page, 34);
    await expect(mapTransform(page)).toHaveAttribute("transform", pinched!);
    const exact = china(page).getByRole("region", { name: "地区精确数据，可横向滚动", exact: true });
    await exact.scrollIntoViewIfNeeded(); await exact.focus();
    for (let key = 0; key < 4; key++) await page.keyboard.press("ArrowRight");
    const table = await exact.evaluate(node => ({ width: node.clientWidth, content: node.scrollWidth, left: node.getBoundingClientRect().left, right: node.getBoundingClientRect().right, scrollLeft: node.scrollLeft, headers: [...node.querySelectorAll("thead th")].map(th => th.textContent?.trim()), lastCellRight: node.querySelector("tbody tr td:last-child")!.getBoundingClientRect().right }));
    await expect(exact).toBeFocused(); expect(table.content).toBeGreaterThanOrEqual(600); expect(table.content).toBeGreaterThan(table.width);
    expect(table.headers).toEqual(["地区代码", "地区", "层级", "参与人数"]); expect(table.lastCellRight).toBeLessThanOrEqual(table.right + 1); expect(table.scrollLeft).toBeGreaterThan(0);
    await exact.screenshot({ path: `${evidence}/china-exact-table-${motion}-390.png` });
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    record(`china-${motion}`, { national, initialValue, updatedValue: value, selectedId: "440300", nationalRegions: 34, guangdongRegions: 21, scrollBefore, scrollAfter, zoomScroll, zoomed, dragged, pinched, restoredView: true, touchTap: true, failurePreservedOldMap: true, actualCDPTouch: true, pageWidth, table });
    expect(pageWidth).toBeLessThanOrEqual(390);
  });
}
