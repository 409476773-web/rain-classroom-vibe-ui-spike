import { expect, test, type Locator, type Page } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const run = "evidence/runtime/chart-experience-third-batch-2026-10-11/scatter";
const folder = `${run}/browser/${process.env.RAIN_SCATTER_BROWSER_RUN ?? "after-01"}`;
const files = ["apps/playground/src/docs/components/chart-point-reading.tsx", "apps/playground/src/docs/components/chart-variants/comparison.tsx", "packages/ui/src/charts/vendor/charts/scatter-chart.tsx", "packages/ui/src/charts/vendor/charts/use-scatter-chart-interaction.ts"];
const variants = ["scatter-default", "scatter-no-rings", "scatter-small-dots", "scatter-wide-ring-gap", "scatter-left-y-axis", "scatter-dual-y-axis", "scatter-pattern-background", "scatter-dot-grid-background", "scatter-reference-band", "scatter-pattern-reference-band"];
const status = (host: Locator) => host.locator("[data-point-reading-date], [data-point-reading] > [role=status]");
const native = (host: Locator) => host.locator('[data-rain-id="ui-chart-scatter"]');
const circles = (host: Locator) => native(host).locator("svg").first().locator("circle:not(.visx-pattern-circle)");
async function sources() { return Promise.all(files.map(async path => ({ path, sha256: createHash("sha256").update(await readFile(path, "utf8")).digest("hex") }))); }
async function save(name: string, facts: unknown) { await mkdir(folder, { recursive: true }); await writeFile(`${folder}/${name}.json`, JSON.stringify(facts, null, 2)); }
async function ready(page: Page, width: number, motion: "reduce" | "no-preference") {
  await page.setViewportSize({ width, height: 1000 });
  await page.emulateMedia({ reducedMotion: motion });
  await page.clock.setFixedTime(new Date("2026-10-11T00:00:00+08:00"));
  await page.goto(`/?scatter-third-batch=${process.env.RAIN_SCATTER_BROWSER_RUN ?? "after-01"}#chart-scatter`);
  const host = page.locator('[data-rain-id="chart-scatter"]');
  await expect(host).toBeVisible();
  await page.locator("[data-chart-default-controls]").getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
  await expect(circles(host).first()).toBeVisible();
  if (motion === "no-preference") await page.waitForTimeout(1500);
  await page.evaluate(() => document.fonts.ready);
  return host;
}
async function geometry(host: Locator) {
  return circles(host).evaluateAll(nodes => nodes.map(node => ({ transform: node.closest("g[transform]")?.getAttribute("transform"), cx: node.getAttribute("cx"), cy: node.getAttribute("cy"), r: node.getAttribute("r"), fill: getComputedStyle(node).fill, stroke: getComputedStyle(node).stroke, strokeWidth: node.getAttribute("stroke-width") })));
}
async function hoverAtCircle(host: Locator, index: number) {
  const circle = circles(host).nth(index);
  await circle.scrollIntoViewIfNeeded();
  const box = (await circle.boundingBox())!;
  await host.page().mouse.move(box.x + box.width / 2, box.y + box.height / 2);
}
async function timeline(page: Page, revision: number, scenario = "normal", state = "normal") {
  return page.evaluate(async ({ revision, scenario, state }) => {
    const path = "/src/docs/components/chart-data.ts";
    const module = await import(/* @vite-ignore */ path);
    const raw = state === "missing" ? module.makeMissingTimeline(revision) : module.makeTimeline(revision, state);
    return module.applyScatterBoundary(raw, scenario).map((point: any) => ({ ...point, date: point.date.toISOString(), time: point.date.getTime() }));
  }, { revision, scenario, state });
}
async function assertClean(page: Page, host: Locator) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  const paths = await native(host).locator("path[d]").evaluateAll(nodes => nodes.map(node => node.getAttribute("d")));
  expect(paths.some(path => /NaN|Infinity/.test(path ?? ""))).toBe(false);
  expect(await native(host).locator('[tabindex="0"],button').count()).toBe(0);
}

for (const width of [1440, 390]) for (const motion of ["no-preference", "reduce"] as const) {
  test(`${width}px ${motion}: default dense and overlapping dates retain all exact series and current pointer values`, async ({ page }) => {
    const errors: string[] = [], before = await sources(), facts: any = { width, motion };
    page.on("pageerror", error => errors.push(error.message));
    try {
      const host = await ready(page, width, motion);
      const controls = page.locator("[data-chart-default-controls]");
      await controls.getByRole("combobox", { name: "系列数", exact: true }).selectOption("5");
      await page.mouse.move(0, 0);
      const normal = await geometry(host);
      const sample = host.getByRole("combobox", { name: "散点边界样本", exact: true });
      const reader = host.getByRole("combobox", { name: "读取日期", exact: true });
      await sample.selectOption("scatter-dense");
      const dense = await timeline(page, 0, "scatter-dense");
      await expect(host.locator("tbody tr")).toHaveCount(96);
      await expect(reader.locator("option")).toHaveCount(97);
      await expect(circles(host)).toHaveCount(normal.length * 4);
      await reader.focus();
      await expect(reader).toBeFocused();
      await reader.selectOption(String(dense[95]!.time));
      await expect(reader).toHaveValue(String(dense[95]!.time));
      await expect(status(host)).toHaveAttribute("data-point-reading-date", dense[95]!.date);
      for (const [key, label] of [["enrolled", "参与人数"], ["completed", "完成人数"], ["returned", "复习人数"], ["answered", "答题人数"], ["reviewed", "讨论人数"]] as const) await expect(status(host)).toContainText(`${label} ${dense[95]![key]} 人`);
      facts.dense = { last: dense[95], reading: await status(host).textContent(), baseMarkerCount: await circles(host).count() };
      await assertClean(page, host);
      await host.screenshot({ path: `${folder}/default-${width}-${motion}-dense.png` });
      await sample.selectOption("scatter-overlap");
      const overlap = await timeline(page, 0, "scatter-overlap");
      await expect(reader).toHaveValue("");
      await expect(status(host)).toContainText("请选择读取日期");
      await reader.selectOption(String(overlap[5]!.time));
      const pointMarkers = normal.length / (5 * 24);
      await hoverAtCircle(host, 5 * pointMarkers);
      const tip = host.locator(".rain-chart-tooltip");
      for (const label of ["参与人数", "完成人数", "复习人数", "答题人数", "讨论人数"]) await expect(status(host)).toContainText(`${label} ${overlap[5]!.enrolled} 人`);
      await expect(tip).toContainText(`${overlap[5]!.enrolled} 人`);
      const beforeUpdateScroll = await page.evaluate(() => scrollY);
      await controls.getByRole("button", { name: "更新数据", exact: true }).focus();
      await page.keyboard.press("Enter");
      const updated = await timeline(page, 1, "scatter-overlap");
      const afterUpdateScroll = await page.evaluate(() => scrollY);
      const readingClearedAfterFocusScroll = await tip.count() === 0 && afterUpdateScroll !== beforeUpdateScroll;
      if (readingClearedAfterFocusScroll) await hoverAtCircle(host, 5 * pointMarkers);
      await expect(tip).toContainText(`${updated[5]!.enrolled} 人`);
      await expect(status(host)).toHaveAttribute("data-point-reading-date", overlap[5]!.date);
      await expect(status(host)).toContainText(`参与人数 ${updated[5]!.enrolled} 人`);
      facts.overlap = { source: updated[5], reading: await status(host).textContent(), tooltip: await tip.textContent(), updateFocus: { beforeUpdateScroll, afterUpdateScroll, readingClearedAfterFocusScroll, pointedAgain: readingClearedAfterFocusScroll } };
      await page.mouse.move(0, 0);
      await sample.selectOption("normal");
      await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("zero");
      await reader.selectOption(String(updated[0]!.time));
      await expect(status(host)).toContainText("参与人数 0 人");
      await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("missing");
      const missing = await timeline(page, 1, "normal", "missing");
      await expect(host).toContainText("本样本含缺测");
      await expect(native(host)).toHaveCount(0);
      await expect(reader).toHaveCount(0);
      facts.missingAndZero = { missing: missing[1], zero: missing[2], missingGate: await host.textContent() };
      await assertClean(page, host);
    } finally { const after = await sources(); await save(`default-${width}-${motion}`, { ...facts, before, after, errors }); expect(after).toEqual(before); }
    expect(errors).toEqual([]);
  });

  test(`${width}px ${motion}: all ten original Scatter variants use dense dates, overlap readings and stable normal geometry`, async ({ page }) => {
    test.setTimeout(180000);
    const errors: string[] = [], before = await sources(), facts: any[] = [];
    page.on("pageerror", error => errors.push(error.message));
    try {
      await ready(page, width, motion);
      for (const id of variants) {
        const host = page.locator(`[data-chart-variant="${id}"]`);
        await host.scrollIntoViewIfNeeded();
        await expect(host.locator('[data-ready="true"]')).toBeVisible();
        await expect(circles(host).first()).toBeVisible();
        if (motion === "no-preference") await page.waitForTimeout(1300);
        await page.mouse.move(0, 0);
        const normal = await geometry(host);
        const readingOnly = id.includes("-background") || id.includes("-reference-band");
        const seriesCount = readingOnly ? 1 : 2;
        const sample = host.getByRole("combobox", { name: "散点边界样本", exact: true });
        const reader = host.getByRole("combobox", { name: "读取日期", exact: true });
        await sample.selectOption("scatter-dense");
        const dense = await timeline(page, 0, "scatter-dense");
        await expect(host.locator("tbody tr")).toHaveCount(96);
        await expect(reader.locator("option")).toHaveCount(97);
        await expect(circles(host)).toHaveCount(normal.length * 4);
        await reader.selectOption(String(dense[95]!.time));
        await expect(status(host)).toHaveAttribute("data-point-reading-date", dense[95]!.date);
        await expect(status(host)).toContainText(`参与人数 ${dense[95]!.enrolled} 人`);
        await sample.selectOption("normal");
        await page.mouse.move(0, 0);
        expect(await geometry(host)).toEqual(normal);
        await expect(reader).toHaveValue("");
        await sample.selectOption("scatter-overlap");
        const overlap = await timeline(page, 0, "scatter-overlap");
        await reader.selectOption(String(overlap[5]!.time));
        await hoverAtCircle(host, 5 * normal.length / (seriesCount * 24));
        const tip = host.locator(".rain-chart-tooltip");
        await expect(tip).toContainText(`${overlap[5]!.enrolled} 人`);
        if (!readingOnly) await expect(status(host)).toContainText(id === "scatter-dual-y-axis" ? "完成率 100 %" : `完成人数 ${overlap[5]!.enrolled} 人`);
        await host.locator('[data-action="update"]').focus();
        await page.keyboard.press("Enter");
        const updated = await timeline(page, 1, "scatter-overlap");
        await expect(tip).toContainText(`${updated[5]!.enrolled} 人`);
        await expect(status(host)).toHaveAttribute("data-point-reading-date", overlap[5]!.date);
        await expect(status(host)).toContainText(`参与人数 ${updated[5]!.enrolled} 人`);
        await assertClean(page, host);
        const rows = await host.locator("tbody tr").allTextContents();
        facts.push({ id, normal, denseMarkerCount: normal.length * 4, seriesCount, overlap: updated[5], reading: await status(host).textContent(), tooltip: await tip.textContent(), exactRows: rows });
        if (id === "scatter-default" || id === "scatter-dual-y-axis") await host.screenshot({ path: `${folder}/${id}-${width}-${motion}-overlap.png` });
      }
    } finally { const after = await sources(); await save(`variants-${width}-${motion}`, { facts, before, after, errors }); expect(after).toEqual(before); }
    expect(errors).toEqual([]);
  });
}

test("390px real touch on Scatter scrolls the page and cancels the temporary reading", async ({ browser }) => {
  const before = await sources();
  const context = await browser.newContext({ viewport: { width: 390, height: 1000 }, hasTouch: true, isMobile: true, timezoneId: "Asia/Shanghai" });
  const page = await context.newPage(), errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  let facts: any = {};
  try {
    const host = await ready(page, 390, "reduce");
    const box = (await native(host).boundingBox())!;
    const cdp = await context.newCDPSession(page);
    const x = box.x + box.width * .55, y = box.y + box.height * .6;
    const initial = await page.evaluate(() => scrollY);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let index = 1; index <= 8; index++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y - index * 12 }] }); await page.waitForTimeout(25); }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await page.waitForTimeout(150);
    const current = await page.evaluate(() => scrollY);
    expect(current - initial).toBeGreaterThan(70);
    await expect(host.locator(".rain-chart-tooltip")).toHaveCount(0);
    expect(await native(host).evaluate(node => getComputedStyle(node).touchAction)).toBe("pan-y");
    facts = { initial, current, box, gestureDistance: 96, touchAction: "pan-y", tooltipCleared: true };
    await page.screenshot({ path: `${folder}/touch-scroll-390.png` });
  } finally { const after = await sources(); await save("touch-scroll-390", { ...facts, before, after, errors }); expect(after).toEqual(before); await context.close(); }
  expect(errors).toEqual([]);
});

test("390px real two-finger Scatter preserves time selection during horizontal and vertical movement", async ({ browser }) => {
  const before = await sources();
  const context = await browser.newContext({ viewport: { width: 390, height: 1000 }, hasTouch: true, isMobile: true, timezoneId: "Asia/Shanghai" });
  const page = await context.newPage(), errors: string[] = [], warnings: string[] = [], facts: any[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "warning" || message.type() === "error") warnings.push(message.text()); });
  try {
    await page.goto("/");
    await page.evaluate(async url => {
      const module = await import(/* @vite-ignore */ url);
      const node = document.createElement("div");
      document.body.replaceChildren(node);
      module.mountScatterTouchHarness(node);
    }, `/@fs/${process.cwd()}/${run}/touch-harness.tsx`);
    await page.addStyleTag({ content: ".scatter-touch-evidence{width:324px;height:320px}" });
    const chart = page.locator('[data-rain-id="ui-chart-scatter"]');
    await expect(chart.locator("circle").first()).toBeVisible();
    await page.waitForTimeout(250);
    const box = (await chart.boundingBox())!, cdp = await context.newCDPSession(page);
    const y = box.y + 180, first = { x: box.x + 80, y }, second = { x: box.x + 220, y };
    const read = async (name: string) => {
      const state = JSON.parse((await page.locator("[data-scatter-touch-probe]").textContent())!);
      const scroll = await page.evaluate(() => scrollY);
      facts.push({ name, ...state, scroll });
      return state;
    };
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [first, second] });
    expect((await read("start")).selection).toMatchObject({ active: true, startIndex: 0, endIndex: 1 });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ ...first, x: first.x - 10 }, { ...second, x: second.x + 10 }] });
    expect((await read("horizontal")).selection).toMatchObject({ active: true, startIndex: 0, endIndex: 2 });
    for (let index = 1; index <= 4; index++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: first.x - 10, y: y - index * 20 }, { x: second.x + 10, y: y - index * 20 }] }); await page.waitForTimeout(25); }
    expect((await read("vertical")).selection).toMatchObject({ active: true, startIndex: 0, endIndex: 2 });
    expect(await page.evaluate(() => scrollY)).toBe(0);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    expect((await read("end")).selection).toBeNull();
  } finally { const after = await sources(); await save("two-finger-390", { facts, warnings, errors, before, after }); expect(after).toEqual(before); await context.close(); }
  expect(errors).toEqual([]);
});
