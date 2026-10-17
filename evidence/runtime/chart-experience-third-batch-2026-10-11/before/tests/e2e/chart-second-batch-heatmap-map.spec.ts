import { expect, test, type Locator, type Page } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const run = "evidence/runtime/chart-experience-second-batch-2026-10-11/heatmap-matrix-map";
const folder = `${run}/heatmap-browser/${process.env.RAIN_HEATMAP_BROWSER_RUN ?? "after-01"}`;
const nativeFiles = ["heatmap-context.tsx", "heatmap-cells.tsx", "heatmap-chart.tsx", "heatmap-legend.tsx", "heatmap-legend-gradient.tsx", "heatmap-utils.ts"].map(file => `packages/ui/src/charts/vendor/charts/heatmap/${file}`).concat("packages/ui/src/charts/vendor/charts/choropleth/choropleth-chart.tsx", "apps/playground/src/docs/components/chart-variants/structure.tsx", "packages/ui/src/charts/styles.css", "packages/ui/src/charts/utilities.generated.css");
const variantIds = ["heatmap-contributions", "heatmap-default", "heatmap-pattern-levels", "heatmap-solid-separators", "heatmap-compact-y-quarter", "heatmap-dashed-separators", "heatmap-loading", "heatmap-horizontal-scroll", "heatmap-gradient-legend", "heatmap-monday-start", "heatmap-active-scale-hover"];
const cells = (host: Locator) => host.locator(".visx-heatmap-rects g > rect:first-child");
const grid = (host: Locator) => host.getByRole("region", { name: "日历热图", exact: true });
async function sources() { return Promise.all(nativeFiles.map(async path => ({ path, sha256: createHash("sha256").update(await readFile(path, "utf8")).digest("hex") }))); }
async function save(name: string, facts: unknown) { await mkdir(folder, { recursive: true }); await writeFile(`${folder}/${name}.json`, JSON.stringify(facts, null, 2)); }
async function ready(page: Page, width: number, motion: "reduce" | "no-preference", family = "heatmap") {
  await page.setViewportSize({ width, height: 1000 });
  await page.emulateMedia({ reducedMotion: motion });
  await page.clock.setFixedTime(new Date("2026-10-11T00:00:00+08:00"));
  await page.goto(`/?second-batch-heatmap=${process.env.RAIN_HEATMAP_BROWSER_RUN ?? "after-01"}#chart-${family}`);
  const host = page.locator(`[data-rain-id="chart-${family}"]`);
  await expect(host).toBeVisible();
  await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
  return host;
}
async function sourceCalendar(page: Page, revision: number, state = "normal") {
  return page.evaluate(async ({ revision, state }) => {
    const path = "/src/docs/components/chart-data.ts";
    const module = await import(/* @vite-ignore */ path);
    return module.makeHeatmap(revision, state).flatMap((column: any) => column.bins.map((bin: any) => ({ date: bin.date.toISOString(), count: bin.count, day: bin.date.getDate(), month: bin.date.getMonth() + 1 })));
  }, { revision, state });
}
async function geometry(host: Locator) {
  return cells(host).evaluateAll(nodes => nodes.map(node => ({ x: node.getAttribute("x"), y: node.getAttribute("y"), width: node.getAttribute("width"), height: node.getAttribute("height"), rx: node.getAttribute("rx"), fill: getComputedStyle(node).fill })));
}
async function settle(host: Locator, reduced: boolean) {
  if (!reduced) await host.page().waitForTimeout(1500);
  await host.page().evaluate(() => document.fonts.ready);
  await expect(grid(host)).toHaveCount(1);
  return geometry(host);
}

for (const width of [1440, 390]) for (const motion of ["no-preference", "reduce"] as const) {
  test(`${width}px ${motion}: actual default calendar reads missing, zero and current update values through pointer and keyboard`, async ({ page }) => {
    const errors: string[] = [], before = await sources(), facts: any = { width, motion };
    page.on("pageerror", error => errors.push(error.message));
    try {
      const host = await ready(page, width, motion);
      const controls = page.locator("[data-chart-default-controls]");
      const painted = await settle(host, motion === "reduce");
      const legend = await host.getByRole("button", { name: /^等级 / }).evaluateAll(nodes => nodes.map(node => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height, padding: getComputedStyle(node).padding, border: getComputedStyle(node).borderWidth, background: getComputedStyle(node).backgroundColor })));
      facts.legend = legend;
      expect(legend).toEqual(Array.from({ length: 5 }, () => ({ width: 11, height: 11, padding: "0px", border: "0px", background: "rgba(0, 0, 0, 0)" })));
      await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("missing");
      const initial = await sourceCalendar(page, 0, "missing");
      expect(painted).toHaveLength(initial.length);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      const missingIndex = initial.findIndex((bin: any) => bin.count < 0), zeroIndex = initial.findIndex((bin: any) => bin.count === 0);
      expect(missingIndex).toBeGreaterThanOrEqual(0);
      const tooltip = host.locator(".rain-chart-tooltip");
      await cells(host).nth(missingIndex).hover();
      await expect(tooltip).toContainText("缺测");
      await expect(tooltip).not.toContainText("-1 次学习");
      facts.missing = { source: initial[missingIndex], text: await tooltip.textContent(), fill: await cells(host).nth(missingIndex).evaluate(node => getComputedStyle(node).fill) };
      await cells(host).nth(zeroIndex).hover();
      await expect(tooltip).toContainText("0 次学习");
      expect(await cells(host).nth(zeroIndex).evaluate(node => getComputedStyle(node).fill)).not.toBe(facts.missing.fill);
      const changedIndex = initial.findIndex((bin: any, index: number) => bin.count >= 1 && index > 7);
      await cells(host).nth(changedIndex).hover();
      await controls.getByRole("button", { name: "更新数据", exact: true }).focus();
      await page.keyboard.press("Enter");
      const updated = await sourceCalendar(page, 1, "missing");
      await expect(tooltip).toContainText(`${updated[changedIndex]!.count} 次学习`);
      facts.updatedHover = { source: updated[changedIndex], text: await tooltip.textContent() };
      await grid(host).focus();
      await expect(grid(host)).toHaveAttribute("data-heatmap-active-date", updated[changedIndex]!.date);
      const top = await page.evaluate(() => scrollY);
      await grid(host).press("Control+Home");
      await expect(grid(host)).toHaveAttribute("data-heatmap-active-date", initial[0]!.date);
      for (let index = 0; index < missingIndex; index++) await grid(host).press("ArrowDown");
      await expect(grid(host)).toContainText("缺测");
      await expect(tooltip).toContainText("缺测");
      const outline = host.locator("[data-heatmap-focus-outline]");
      await expect(outline).toHaveCount(1);
      expect(await outline.evaluate(node => getComputedStyle(node).stroke)).not.toBe("none");
      expect(await page.evaluate(() => scrollY)).toBe(top);
      await host.screenshot({ path: `${folder}/default-${width}-${motion}-missing-focus.png` });
      await grid(host).press("Escape");
      await expect(tooltip).toHaveCount(0);
      await expect(outline).toHaveCount(0);
      const level = host.getByRole("button", { name: "等级 2", exact: true });
      await level.focus();
      await cells(host).nth(zeroIndex).hover();
      await page.mouse.move(0, 0);
      await expect(level).toBeFocused();
      await level.press("Escape");
      await expect(tooltip).toHaveCount(0);
      await level.click();
      await expect.poll(() => host.getByRole("button", { name: /^等级 / }).evaluateAll(nodes => nodes.map(node => Number(getComputedStyle(node).opacity)))).toEqual([.3, .3, 1, .3, .3]);
      facts.escapeThenClick = { readLevel: 2, temporary: true };
      facts.levelActions = [];
      for (const action of ["Enter", "Space", "click"] as const) {
        await controls.getByRole("button", { name: "更新数据", exact: true }).focus();
        await level.focus();
        await expect.poll(() => cells(host).evaluateAll(nodes => nodes.map(node => Number(getComputedStyle(node).opacity)))).toContain(.3);
        expect(await level.getAttribute("aria-pressed")).toBeNull();
        if (action === "click") await level.click(); else await level.press(action);
        await expect.poll(() => host.getByRole("button", { name: /^等级 / }).evaluateAll(nodes => nodes.map(node => Number(getComputedStyle(node).opacity)))).toEqual([.3, .3, 1, .3, .3]);
        facts.levelActions.push({ action, readLevel: 2, temporary: true, cellCount: await cells(host).count() });
      }
      await controls.getByRole("button", { name: "更新数据", exact: true }).focus();
      await level.focus();
      await expect.poll(() => cells(host).evaluateAll(nodes => nodes.map(node => Number(getComputedStyle(node).opacity)))).toContain(.3);
      await page.mouse.click(0, 0);
      await expect.poll(() => cells(host).evaluateAll(nodes => nodes.map(node => Number(getComputedStyle(node).opacity)))).toEqual(Array(initial.length).fill(1));
      const pointer = await cells(host).nth(zeroIndex).evaluate(node => {
        const box = node.getBoundingClientRect();
        return { nativeHit: document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2) === node };
      });
      expect(pointer.nativeHit).toBe(true);
      facts.initial = painted;
      facts.updated = await geometry(host);
      expect(facts.updated.map((cell: any) => [cell.x, cell.y, cell.width, cell.height, cell.rx])).toEqual(painted.map(cell => [cell.x, cell.y, cell.width, cell.height, cell.rx]));
      facts.pointer = pointer;
    } finally {
      const after = await sources(); await save(`default-${width}-${motion}`, { ...facts, before, after, errors }); expect(after).toEqual(before);
    }
    expect(errors).toEqual([]);
  });

  test(`${width}px ${motion}: all eleven native variants have bounded real dates and one cell entry`, async ({ page }) => {
    test.setTimeout(90000);
    const errors: string[] = [], before = await sources(), facts: any[] = [];
    page.on("pageerror", error => errors.push(error.message));
    try {
      await ready(page, width, motion);
      for (const variantId of variantIds) {
        const host = page.locator(`[data-chart-variant="${variantId}"]`);
        await host.scrollIntoViewIfNeeded();
        await expect(host.locator('[data-ready="true"]')).toBeVisible();
        if (variantId === "heatmap-loading") {
          await expect(grid(host)).toHaveCount(0);
          await expect(host.getByRole("button", { name: /^等级 / })).toHaveCount(0);
          await host.getByRole("button", { name: "显示数据", exact: true }).click();
        }
        await page.mouse.move(0, 0);
        const painted = await settle(host, motion === "reduce");
        const legend = await host.getByRole("button", { name: /^等级 / }).evaluateAll(nodes => nodes.map(node => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height, padding: getComputedStyle(node).padding, border: getComputedStyle(node).borderWidth, background: getComputedStyle(node).backgroundColor })));
        for (const swatch of legend) {
          expect(swatch.height).toBeCloseTo(11, 2);
          // Chromium layout quantizes the existing 67px gradient / 5 segments to 1/64px.
          expect(Math.abs(swatch.width - (variantId === "heatmap-gradient-legend" ? 13.4 : 11))).toBeLessThanOrEqual(1 / 64);
          expect(swatch.padding).toBe("0px"); expect(swatch.border).toBe("0px"); expect(swatch.background).toBe("rgba(0, 0, 0, 0)");
        }
        const expected = await page.evaluate(async variantId => {
          const path = "/src/docs/components/chart-variants/structure.tsx";
          const module = await import(/* @vite-ignore */ path);
          const months = ["heatmap-horizontal-scroll", "heatmap-contributions"].includes(variantId) ? 12 : 6;
          const monday = variantId === "heatmap-monday-start";
          const start = new Date(2026, 9 - months, 1), end = new Date(2026, 8, monday ? 27 : 26);
          return module.structureHeatmapData(0, months, monday ? 1 : 0).flatMap((column: any) => column.bins).filter((bin: any) => bin.date >= start && bin.date <= end).sort((a: any, b: any) => a.date.getTime() - b.date.getTime()).map((bin: any) => ({ date: bin.date.toISOString(), count: bin.count }));
        }, variantId);
        expect(painted).toHaveLength(expected.length);
        expect(await host.locator("svg [tabindex]").count()).toBe(0);
        await grid(host).focus();
        await grid(host).press("Control+Home");
        await expect(grid(host)).toHaveAttribute("data-heatmap-active-date", expected[0]!.date);
        await grid(host).press("Control+End");
        await expect(grid(host)).toHaveAttribute("data-heatmap-active-date", expected.at(-1)!.date);
        await expect(host.locator(".rain-chart-tooltip")).toContainText(expected.at(-1)!.count < 0 ? "缺测" : `${variantId === "heatmap-gradient-legend" ? "耗时等级" : "活跃等级"} ${expected.at(-1)!.count} / 4`);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
        facts.push({ variantId, count: painted.length, first: expected[0], last: expected.at(-1), painted, legend, entry: await grid(host).getAttribute("data-heatmap-active-date") });
        await grid(host).press("Escape");
      }
    } finally { const after = await sources(); await save(`variants-${width}-${motion}`, { before, after, errors, facts }); expect(after).toEqual(before); }
    expect(errors).toEqual([]);
  });

  test(`${width}px ${motion}: five official flow variants expose exact thin/zero samples and preserve normal data`, async ({ page }) => {
    const before = await sources(), errors: string[] = [], facts: any[] = [];
    page.on("pageerror", error => errors.push(error.message));
    try {
      await ready(page, width, motion, "sankey");
      for (const variantId of ["sankey-interactive", "sankey-default", "sankey-no-labels", "sankey-simple", "sankey-solid-links"]) {
        const host = page.locator(`[data-chart-variant="${variantId}"]`);
        await host.scrollIntoViewIfNeeded(); await expect(host.locator('[data-ready="true"]')).toBeVisible();
        await host.locator("details.rain-chart-data > summary").click();
        const select = host.getByRole("combobox", { name: "桑基边界样本", exact: true });
        const rows = async () => host.locator("tbody tr").evaluateAll(nodes => nodes.map(node => ({ source: node.children[0]!.textContent!, target: node.children[1]!.textContent!, value: Number(node.children[2]!.textContent) })));
        const normal = await rows();
        for (const scenario of ["sankey-thin", "sankey-zero-link", "normal"]) {
          await select.selectOption(scenario);
          const exact = await rows(), positive = exact.filter(row => row.value > 0);
          await expect(host.locator(".sankey-links > path")).toHaveCount(positive.length);
          if (scenario === "normal") expect(exact).toEqual(normal);
          else expect(exact.find(row => row.target === "继续学习")!.value).toBe(scenario === "sankey-thin" ? 1 : 0);
          for (const source of new Set(exact.map(row => row.source))) {
            const incoming = exact.filter(row => row.target === source).reduce((sum, row) => sum + row.value, 0);
            if (incoming) expect(exact.filter(row => row.source === source).reduce((sum, row) => sum + row.value, 0)).toBe(incoming);
          }
          expect(await host.locator("svg").evaluateAll(nodes => nodes.some(node => /NaN|Infinity/.test(node.innerHTML)))).toBe(false);
          const path = host.locator(".sankey-links > path").last();
          const point = await path.evaluate(node => {
            const path = node as SVGPathElement, local = path.getPointAtLength(path.getTotalLength() / 2), matrix = path.getScreenCTM()!;
            const screen = new DOMPoint(local.x, local.y).matrixTransform(matrix);
            return { x: screen.x, y: screen.y };
          });
          await page.mouse.move(point.x, point.y);
          const tooltip = host.locator(".rain-chart-tooltip");
          await expect(tooltip).toContainText(positive.at(-1)!.source);
          await expect(tooltip).toContainText(positive.at(-1)!.target);
          await expect(tooltip).toContainText(`${positive.at(-1)!.value} 人次`);
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
          facts.push({ variantId, scenario, exact, plotted: positive.length, tooltip: await tooltip.textContent() });
          await page.mouse.move(0, 0);
        }
      }
    } finally { const after = await sources(); await save(`flow-${width}-${motion}`, { before, after, errors, facts }); expect(after).toEqual(before); }
    expect(errors).toEqual([]);
  });
}

for (const motion of ["no-preference", "reduce"] as const) test(`390px ${motion}: end-date keyboard inspection scrolls only the native calendar wrapper`, async ({ page }) => {
  await ready(page, 390, motion);
  const host = page.locator('[data-chart-variant="heatmap-horizontal-scroll"]');
  await host.scrollIntoViewIfNeeded(); await expect(host.locator('[data-ready="true"]')).toBeVisible();
  await settle(host, motion === "reduce");
  const scroll = host.locator(".rain-chart-heatmap-scroll");
  await grid(host).focus();
  const before = await page.evaluate(() => scrollY);
  await grid(host).press("Control+End");
  await expect.poll(() => scroll.evaluate(node => node.scrollLeft)).toBeGreaterThan(0);
  const facts = await scroll.evaluate(node => {
    const box = node.getBoundingClientRect(), active = node.querySelector("[data-heatmap-focus-outline]")!.getBoundingClientRect(), tooltip = node.querySelector(".rain-chart-tooltip")!.getBoundingClientRect();
    return { scroll: node.scrollLeft, content: node.scrollWidth, width: node.clientWidth, pageY: scrollY, documentWidth: document.documentElement.scrollWidth, viewport: innerWidth, box: { left: box.left, right: box.right }, cell: { left: active.left, right: active.right }, tooltip: { left: tooltip.left, right: tooltip.right } };
  });
  expect(facts.pageY).toBe(before);
  expect(facts.cell.left).toBeGreaterThanOrEqual(facts.box.left);
  expect(facts.cell.right).toBeLessThanOrEqual(facts.box.right + 1);
  expect(facts.tooltip.left).toBeGreaterThanOrEqual(0);
  expect(facts.tooltip.right).toBeLessThanOrEqual(391);
  expect(facts.documentWidth).toBeLessThanOrEqual(391);
  await save(`scroll-${motion}`, facts);
  await host.screenshot({ path: `${folder}/scroll-${motion}.png` });
});

test("390px emulated touch: an unzoomed world map permits actual page scrolling, while the zoom variant retains touch control", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 900 }, hasTouch: true, isMobile: true, reducedMotion: "reduce", timezoneId: "Asia/Shanghai" });
  const page = await context.newPage(), errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  try {
    const host = await ready(page, 390, "reduce", "choropleth");
    const svg = host.locator("svg").first();
    await expect(svg).toHaveCSS("touch-action", "auto");
    const box = (await svg.boundingBox())!, x = box.x + box.width / 2, y = box.y + box.height * .75;
    const before = await page.evaluate(() => scrollY), session = await context.newCDPSession(page);
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let step = 1; step <= 8; step++) { await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y - step * 14 }] }); await page.waitForTimeout(25); }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 10);
    await expect(host.locator(".rain-chart-tooltip")).toHaveCount(0);
    const after = await page.evaluate(() => scrollY);
    const zoom = page.locator('[data-chart-variant="choropleth-interactive"]');
    await zoom.scrollIntoViewIfNeeded(); await expect(zoom.locator('[data-ready="true"]')).toBeVisible();
    await expect(zoom.locator("svg").first()).toHaveCSS("touch-action", "none");
    const transform = zoom.locator('svg > g[transform^="matrix"]').first(), original = await transform.getAttribute("transform");
    await zoom.getByRole("button", { name: "放大地图", exact: true }).click();
    await expect.poll(() => transform.getAttribute("transform")).not.toBe(original);
    await save("world-touch", { before, after, original, zoomed: await transform.getAttribute("transform"), errors });
    expect(errors).toEqual([]);
  } finally { await context.close(); }
});
