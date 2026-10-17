import { expect, test, type Locator, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { makeMatrixFixtures } from "../../apps/playground/src/docs/components/chart-business/matrix-data";

const evidence = "evidence/runtime/chart-matrix-sticky-layout-2026-10-09/browser";
const matrix = (page: Page, fixture: string) => page.locator(`[data-matrix-example="${fixture}"] [data-rain-id="ui-chart-matrix"]`);
const cell = (chart: Locator, row: string, column: string) => chart.locator(`[data-slot="cell"][data-row-id="${row}"][data-column-id="${column}"]`);
const quantityValue = (revision: number, row: string, column: string) => {
  const datum = makeMatrixFixtures(revision).find(fixture => fixture.id === "course-count")!.cells.find(cell => cell.rowId === row && cell.columnId === column);
  if (datum?.kind !== "value") throw new Error("Quantity fixture must have a numeric reading");
  return datum.value;
};
async function record(name: string, facts: unknown) {
  await mkdir(evidence, { recursive: true });
  await writeFile(`${evidence}/${name}.json`, JSON.stringify(facts, null, 2));
}
async function open(page: Page, reduced = true) {
  await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" });
  await page.goto("/#chart-matrix");
  await expect(matrix(page, "course-count").locator('[data-slot="cell"]')).toHaveCount(36);
}
test("matrix and mini pages own separate examples and downloads", async ({ page }) => {
  await open(page);
  await expect(page.getByRole("heading", { level: 1, name: "分类矩阵", exact: true })).toBeVisible();
  await expect(page.locator('[data-rain-id="ui-chart-matrix"]')).toHaveCount(5);
  await expect(page.locator('.rain-business-mini-gallery')).toHaveCount(0);
  await expect(page.locator('[data-rain-id="doc-chart-business"]')).toHaveCount(0);
  await page.getByRole("button", { name: "12×12", exact: true }).click();
  await expect(matrix(page,"course-similarity").locator('[data-slot="cell"]')).toHaveCount(144);
  const source=page.locator('[data-source="default"]');
  await source.locator("summary").click();
  const matrixFiles=await source.getByRole("combobox", {name:"示例源码文件"}).locator("option").allTextContents();
  expect(matrixFiles.some(file=>file.includes("matrix-examples"))).toBe(true);
  expect(matrixFiles.some(file=>file.includes("mini-"))).toBe(false);
  await page.getByRole("heading", {level:1,name:"分类矩阵",exact:true}).scrollIntoViewIfNeeded();
  await page.screenshot({path:`${evidence}/matrix-page.png`});
  await page.goto("/#chart-business");
  await expect(page.getByRole("heading",{level:1,name:"迷你图表与业务组合",exact:true})).toBeVisible();
  await expect(page.locator('[data-rain-id="ui-chart-matrix"]')).toHaveCount(0);
  await expect(page.locator('.rain-business-mini-gallery')).toHaveCount(1);
  const business=page.locator('[data-source="business"]');
  await business.locator("summary").click();
  const businessFiles=await business.getByRole("combobox",{name:"业务图表源码文件"}).locator("option").allTextContents();
  expect(businessFiles.some(file=>file.includes("mini-"))).toBe(true);
  expect(businessFiles.some(file=>file.includes("matrix"))).toBe(false);
  await record("page-ownership",{matrixCount:5,miniPageMatrixCount:0,matrixFiles,businessFiles});
});

async function equalColumns(chart: Locator, size: number) {
  const widths = await chart.locator("tbody tr").first().locator('[data-slot="cell"]').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().width));
  expect(widths).toHaveLength(size);
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(1);
  return widths;
}

for (const size of [6, 12]) test(`${size}x${size} matrices keep equal columns with long headers and contained narrow scrolling`, async ({ page }) => {
  await open(page);
  await page.getByRole("button", { name: `${size}×${size}`, exact: true }).click();
  const chart = matrix(page, "course-similarity");
  await chart.scrollIntoViewIfNeeded();
  const normal = await equalColumns(chart, size);
  await page.getByRole("combobox", { name: "示例状态" }).selectOption("long");
  const desktop = await equalColumns(chart, size);
  await page.setViewportSize({ width: 390, height: 844 });
  const narrow = await equalColumns(chart, size);
  const scroll = await chart.locator('[data-slot="scroll-container"]').evaluate(node => ({ width: node.clientWidth, content: node.scrollWidth }));
  expect(scroll.content).toBeGreaterThan(scroll.width);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await record(`equal-columns-${size}`, { normal, desktop, narrow, scroll });
  await chart.screenshot({ path: `${evidence}/matrix-${size}-narrow.png` });
});

test("quantity bubbles use a shared area and color scale with white transparent in-bubble readings", async ({ page }) => {
  await open(page);
  const chart = matrix(page, "course-count");
  await chart.scrollIntoViewIfNeeded();
  const bubbles = await chart.locator('[data-slot="cell"][data-state="value"]').evaluateAll(nodes => nodes.map(node => {
    const circle = node.querySelector<SVGCircleElement>("circle")!;
    const reading = node.querySelector<SVGTextElement>('text[data-slot="reading"]');
    const container = reading?.closest('[data-slot="reading-container"]');
    const fill = getComputedStyle(circle).fill;
    const rgb = fill.match(/^rgba?\((.+)\)$/), srgb = fill.match(/^color\(srgb (.+)\)$/);
    const channels = (rgb?.[1] ?? srgb?.[1] ?? "").split(/[\s,\/]+/).filter(Boolean).slice(0, 3).map(part => parseFloat(part) / (part.endsWith("%") ? 100 : rgb ? 255 : 1));
    const luminance = channels.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index]!, 0);
    return { value: Number(node.getAttribute("aria-label")), radius: circle.r.baseVal.value, fill, luminance, chroma: Math.max(...channels) - Math.min(...channels),
      visibleReading: !!reading && getComputedStyle(reading).visibility !== "hidden" && (!container || getComputedStyle(container).visibility !== "hidden"),
      readingFill: reading ? getComputedStyle(reading).fill : null, readingBackground: container ? getComputedStyle(container).backgroundColor : null };
  }));
  expect(bubbles.length).toBeGreaterThan(10);
  expect(new Set(bubbles.map(item => item.fill)).size).toBeGreaterThan(3);
  const ordered = [...bubbles].sort((a, b) => a.value - b.value);
  expect(ordered.at(-1)!.luminance).toBeLessThan(ordered[0]!.luminance);
  expect(ordered.at(-1)!.chroma).toBeGreaterThan(ordered[0]!.chroma);
  const normalizedAreas = bubbles.filter(item => item.value > 0).map(item => item.radius ** 2 / item.value);
  expect(Math.max(...normalizedAreas) - Math.min(...normalizedAreas)).toBeLessThan(.001);
  const visible = bubbles.filter(item => item.visibleReading);
  expect(visible.length).toBeGreaterThan(0);
  expect(visible.every(item => item.readingFill === "rgb(255, 255, 255)" && item.readingBackground === "rgba(0, 0, 0, 0)")).toBe(true);
  await expect(chart.locator('[data-slot="reading-plate"]')).toHaveCount(0);
  await record("bubble-encoding", { bubbles, normalizedAreas });
  await chart.screenshot({ path: `${evidence}/bubble-matrix.png` });
});

test("heat readings have no backing plate and legends match continuous, quantity and level encodings", async ({ page }) => {
  await open(page);
  const heat = matrix(page, "course-similarity");
  await heat.scrollIntoViewIfNeeded();
  const backgrounds = await heat.locator('[data-slot="cell"] [data-slot="reading-container"]').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor));
  expect(backgrounds.length).toBeGreaterThan(0);
  expect(backgrounds.every(value => value === "rgba(0, 0, 0, 0)")).toBe(true);
  await expect(heat.locator('[data-slot="reading-plate"]')).toHaveCount(0);
  const gradient = heat.locator('[data-slot="legend-gradient"]');
  await expect(gradient).toHaveCount(1);
  const gradientFacts = await gradient.evaluate(node => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height, background: getComputedStyle(node).backgroundImage }));
  expect(gradientFacts.height).toBeLessThanOrEqual(12);
  expect(gradientFacts.width).toBeGreaterThan(gradientFacts.height * 10);
  expect(gradientFacts.background).toContain("gradient");
  const quantity = matrix(page, "course-count").locator('[data-slot="legend"]');
  const quantityFacts = await quantity.locator("circle").evaluateAll(nodes => nodes.map(node => ({ radius: (node as SVGCircleElement).r.baseVal.value, fill: getComputedStyle(node).fill })));
  expect(quantityFacts).toHaveLength(3);
  expect(quantityFacts.every(item => item.radius > 0)).toBe(true);
  expect(new Set(quantityFacts.map(item => item.fill)).size).toBe(3);
  expect(await quantity.evaluate(node => node.getBoundingClientRect().height)).toBeLessThanOrEqual(72);
  const levels = matrix(page, "support-level").locator('[data-slot="legend"]');
  await expect(levels).toContainText("无直接支撑");
  await expect(levels).toContainText("一般支撑");
  await expect(levels).toContainText("核心支撑");
  const radii = await levels.locator("circle").evaluateAll(nodes => nodes.map(node => (node as SVGCircleElement).r.baseVal.value));
  expect(radii).toHaveLength(3);
  expect(new Set(radii).size).toBe(1);
  await record("legends", { backgrounds, gradientFacts, quantityFacts, levelRadii: radii });
});

test("gradient and grade legend focus highlight matching cells without changing data fills", async ({ page }) => {
  await open(page);
  const heat = matrix(page, "course-similarity");
  const heatCells = heat.locator('[data-slot="cell"][data-state="value"]');
  const before = await heatCells.locator('[data-slot="cell-mark"]').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor));
  const ranges = heat.locator('[data-slot="legend"]').getByRole("button");
  await expect(ranges).toHaveCount(5);
  await ranges.nth(2).focus();
  const matching = heat.locator('[data-slot="cell"][data-state="value"][data-highlighted="true"]');
  const dimmed = heat.locator('[data-slot="cell"][data-state="value"][data-highlighted="false"]');
  expect(await matching.count()).toBeGreaterThan(0);
  expect(await dimmed.count()).toBeGreaterThan(0);
  expect(await heatCells.locator('[data-slot="cell-mark"]').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor))).toEqual(before);
  const levels = matrix(page, "support-level");
  await levels.locator('[data-slot="legend"]').getByRole("button", { name: "核心支撑", exact: true }).focus();
  const highlighted = await levels.locator('[data-slot="cell"][data-highlighted="true"]').evaluateAll(nodes => nodes.map(node => node.getAttribute("aria-label")));
  expect(highlighted.length).toBeGreaterThan(0);
  expect(highlighted.every(label => label === "核心支撑")).toBe(true);
  expect(await levels.locator('[data-slot="cell"][data-highlighted="false"]').count()).toBeGreaterThan(0);
  await record("legend-linkage", { matchedHeatCells: await matching.count(), dimmedHeatCells: await dimmed.count(), levelReadings: highlighted, fillPreserved: true });
});

test("adjacent cells reuse one tooltip and keyboard arrows inspect matching row and column", async ({ page }) => {
  await open(page);
  const chart = matrix(page, "course-count");
  const first = cell(chart, "category-2", "college-2");
  const next = cell(chart, "category-2", "college-3");
  await first.hover();
  const tooltip = page.locator(".rain-matrix__tooltip");
  await expect(tooltip).toHaveCount(1);
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toContainText(String(quantityValue(0, "category-2", "college-2")));
  await tooltip.evaluate(node => node.setAttribute("data-test-same-tooltip", "true"));
  await next.hover();
  await expect(tooltip).toHaveAttribute("data-test-same-tooltip", "true");
  await expect(tooltip).toContainText(String(quantityValue(0, "category-2", "college-3")));
  await expect(next).toHaveAttribute("data-active", "true");
  await chart.locator('[data-slot="scroll-container"]').focus();
  await expect(next).toHaveAttribute("data-active", "true");
  await page.keyboard.press("ArrowLeft");
  await expect(first).toHaveAttribute("data-active", "true");
  await page.keyboard.press("ArrowRight");
  await expect(next).toHaveAttribute("data-active", "true");
  await expect(chart.locator('[data-slot="scroll-container"]')).toBeFocused();
  await expect(tooltip).toContainText("人文学院");
  await expect(tooltip).toContainText("学科基础");
  await page.keyboard.press("ArrowDown");
  const below = cell(chart, "category-3", "college-3");
  await expect(below).toHaveAttribute("data-active", "true");
  await expect(tooltip).toContainText(String(quantityValue(0, "category-3", "college-3")));
  await record("inspection", { sharedTooltipNode: true, horizontalAndVerticalKeyboardNavigation: true });
});

test("offscreen entry starts when viewed and includes intermediate bubble geometry", async ({ page }) => {
  await open(page, false);
  const chart = matrix(page, "course-count");
  const target = cell(chart, "category-6", "college-6").locator("circle").first();
  expect(await chart.evaluate(node => node.getBoundingClientRect().top)).toBeGreaterThan(1000);
  await page.waitForTimeout(1800);
  await chart.scrollIntoViewIfNeeded();
  const samples = await target.evaluate(async node => {
    const circle = node as SVGCircleElement;
    const frames: { time: number; width: number; opacity: number }[] = [];
    const start = performance.now();
    await new Promise<void>(resolve => {
      const sample = (now: number) => {
        const parent = circle.closest('[data-slot="mark-container"]')!;
        frames.push({ time: now - start, width: circle.getBoundingClientRect().width, opacity: Number(getComputedStyle(parent).opacity) });
        if (now - start < 1800) requestAnimationFrame(sample); else resolve();
      };
      requestAnimationFrame(sample);
    });
    return frames;
  });
  const final = samples.at(-1)!;
  expect(final.width).toBeGreaterThan(0);
  expect(final.opacity).toBeCloseTo(1, 2);
  expect(samples.some(frame => frame.width > 0 && frame.width < final.width - .1 || frame.opacity > 0 && frame.opacity < .99)).toBe(true);
  await record("viewport-entry", { samples, intermediateFrame: true });
});

test("updates and sorting retain coordinate nodes and animate through intermediate geometry", async ({ page }) => {
  await open(page, false);
  const chart = matrix(page, "course-count");
  const target = cell(chart, "category-4", "college-4");
  await chart.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800);
  await target.evaluate(node => node.setAttribute("data-test-stable-coordinate", "true"));
  const circle = target.locator("circle").first();
  const before = await circle.evaluate(node => node.getBoundingClientRect().width);
  await page.getByRole("button", { name: "更新数据", exact: true }).evaluate(node => (node as HTMLButtonElement).click());
  const updateFrames = await circle.evaluate(async node => {
    const frames: { width: number; readingVisible: boolean }[] = [], start = performance.now();
    await new Promise<void>(resolve => {
      const frame = (now: number) => {
        const reading = node.closest('[data-slot="cell"]')!.querySelector('text[data-slot="reading"]')!;
        frames.push({ width: node.getBoundingClientRect().width, readingVisible: getComputedStyle(reading).visibility === "visible" });
        if (now - start < 1100) requestAnimationFrame(frame); else resolve();
      };
      requestAnimationFrame(frame);
    });
    return frames;
  });
  const after = updateFrames.at(-1)!.width;
  expect(Math.sign(after - before)).toBe(Math.sign(quantityValue(1, "category-4", "college-4") - quantityValue(0, "category-4", "college-4")));
  expect(updateFrames.some(frame => frame.width > Math.min(before, after) + .01 && frame.width < Math.max(before, after) - .01)).toBe(true);
  expect(updateFrames.every(frame => frame.readingVisible)).toBe(true);
  await expect(target).toHaveAttribute("data-test-stable-coordinate", "true");
  const original = await circle.evaluate(node => { const box = node.getBoundingClientRect(), chart = node.closest('[data-rain-id="ui-chart-matrix"]')!.getBoundingClientRect(); return { x: box.x + box.width / 2 - chart.x, y: box.y + box.height / 2 - chart.y }; });
  await page.getByRole("button", { name: "反转行列顺序" }).evaluate(node => (node as HTMLButtonElement).click());
  const sortFrames = await circle.evaluate(async node => {
    const positions: { x: number; y: number }[] = [], start = performance.now();
    await new Promise<void>(resolve => {
      const frame = (now: number) => { const box = node.getBoundingClientRect(), chart = node.closest('[data-rain-id="ui-chart-matrix"]')!.getBoundingClientRect(); positions.push({ x: box.x + box.width / 2 - chart.x, y: box.y + box.height / 2 - chart.y }); if (now - start < 1100) requestAnimationFrame(frame); else resolve(); };
      requestAnimationFrame(frame);
    });
    return positions;
  });
  const end = sortFrames.at(-1)!;
  const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
  expect(distance(original, end)).toBeGreaterThan(5);
  const totalDistance = distance(original, end);
  expect(sortFrames.some(position => distance(position, original) > totalDistance * .1 && distance(position, end) > totalDistance * .1)).toBe(true);
  await expect(target).toHaveAttribute("data-test-stable-coordinate", "true");
  await record("update-sort", { before, after, updateFrames, original, sortFrames, end, retainedCoordinate: true });
});

test("reduced motion exposes final values immediately without hidden readouts after update", async ({ page }) => {
  await open(page);
  const chart = matrix(page, "course-count");
  await chart.scrollIntoViewIfNeeded();
  const target = cell(chart, "category-6", "college-6");
  const circle = target.locator("circle").first();
  const first = await circle.evaluate(node => node.getBoundingClientRect().width);
  await page.getByRole("button", { name: "更新数据", exact: true }).evaluate(node => (node as HTMLButtonElement).click());
  await expect(target).toHaveAttribute("aria-label", String(quantityValue(1, "category-6", "college-6")));
  const immediate = await circle.evaluate(node => node.getBoundingClientRect().width);
  expect(Math.sign(immediate - first)).toBe(Math.sign(quantityValue(1, "category-6", "college-6") - quantityValue(0, "category-6", "college-6")));
  await page.waitForTimeout(60);
  expect(await circle.evaluate(node => node.getBoundingClientRect().width)).toBeCloseTo(immediate, 2);
  expect(await target.locator('text[data-slot="reading"]').evaluate(node => getComputedStyle(node).visibility)).toBe("visible");
  expect(await target.locator('[data-slot="mark-container"]').evaluate(node => Number(getComputedStyle(node).opacity))).toBe(1);
  await record("reduced-motion", { first, immediate, readoutVisible: true });
});

test("clicking a hovered nonfirst cell preserves its inspected coordinate", async ({ page }) => {
  await open(page);
  const chart = matrix(page, "course-count"), target = cell(chart, "category-2", "college-3");
  await target.hover();
  await expect(target).toHaveAttribute("data-active", "true");
  await target.click();
  const facts = await chart.locator('[data-slot="cell"][data-active="true"]').evaluateAll(nodes => nodes.map(node => ({ row: node.getAttribute("data-row-id"), column: node.getAttribute("data-column-id") })));
  await record("pointer-focus", { expected: { row: "category-2", column: "college-3" }, actual: facts });
  await expect(target).toHaveAttribute("data-active", "true");
  await expect(page.locator(".rain-matrix__tooltip")).toContainText(String(quantityValue(0, "category-2", "college-3")));
});

test("keyboard focus reveals the inspected coordinate beyond a sticky row heading after horizontal scrolling", async ({ page }) => {
  await open(page);
  await page.setViewportSize({ width: 390, height: 844 });
  const chart = matrix(page, "weekday-hour"), region = chart.locator('[data-slot="scroll-container"]');
  await region.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(150);
  await region.evaluate(node => { node.scrollLeft = node.scrollWidth - node.clientWidth; });
  await region.focus();
  const active = chart.locator('[data-slot="cell"][data-active="true"]');
  await expect(active).toHaveCount(1);
  const facts = await active.evaluate(node => {
    const cell = node.getBoundingClientRect(), heading = node.parentElement!.querySelector("th")!.getBoundingClientRect();
    const region = node.closest('[data-slot="scroll-container"]')!.getBoundingClientRect();
    return { left: cell.left, right: cell.right, headingRight: heading.right, regionRight: region.right, row: node.getAttribute("data-row-id"), column: node.getAttribute("data-column-id") };
  });
  await record("keyboard-scrolled-focus", facts);
  expect(facts.left).toBeGreaterThanOrEqual(facts.headingRight - 1);
  expect(facts.right).toBeLessThanOrEqual(facts.regionRight + 1);
});

test("semester legend shows the eight discrete semesters without fractional intervals", async ({ page }) => {
  await open(page);
  const legend = matrix(page, "course-version").locator('[data-slot="legend"]');
  const labels = await legend.getByRole("button").evaluateAll(nodes => nodes.map(node => node.getAttribute("aria-label") ?? node.textContent!.trim()));
  await record("semester-legend", { labels });
  expect(labels).toHaveLength(8);
  labels.forEach((label, index) => {
    expect(label).not.toMatch(/\d+\.\d+/);
    expect(label.match(/\d+/g)).toEqual([String(index + 1)]);
  });
});

test("zero-to-large bubble transition never paints a visible glyph beyond its current circle", async ({ page }) => {
  await open(page, false);
  const control = page.getByRole("combobox", { name: "示例状态" });
  await control.selectOption("zero");
  const chart = matrix(page, "course-count"), target = cell(chart, "category-6", "college-6");
  await chart.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(1800);
  await target.evaluate(node => node.setAttribute("data-test-painted-coordinate", "true"));
  await control.evaluate(node => node.setAttribute("data-test-painted-state-control", "true"));
  const frames = await target.evaluate(async node => {
    const frames: { time: number; radius: number; visible: boolean; farthestGlyphCorner: number }[] = [], start = performance.now();
    const control = document.querySelector<HTMLSelectElement>('[data-test-painted-state-control="true"]')!;
    control.value = "normal";
    control.dispatchEvent(new Event("change", { bubbles: true }));
    await new Promise<void>(resolve => {
      const sample = (now: number) => {
        const circle = node.querySelector<SVGCircleElement>("circle")!, text = node.querySelector<SVGTextElement>('text[data-slot="reading"]')!;
        const bounds = circle.getBoundingClientRect(), center = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
        const textBounds = text.getBBox(), transform = text.getScreenCTM()!;
        const corners = [[textBounds.x, textBounds.y], [textBounds.x + textBounds.width, textBounds.y], [textBounds.x, textBounds.y + textBounds.height], [textBounds.x + textBounds.width, textBounds.y + textBounds.height]];
        const farthestGlyphCorner = Math.max(...corners.map(([x, y]) => { const point = new DOMPoint(x, y).matrixTransform(transform); return Math.hypot(point.x - center.x, point.y - center.y); }));
        let opacity = 1;
        for (let parent: Element | null = text; parent && parent !== node; parent = parent.parentElement) opacity *= Number(getComputedStyle(parent).opacity);
        frames.push({ time: now - start, radius: bounds.width / 2, visible: getComputedStyle(text).visibility === "visible" && opacity > .01, farthestGlyphCorner });
        if (now - start < 900) requestAnimationFrame(sample); else resolve();
      };
      requestAnimationFrame(sample);
    });
    return frames;
  });
  await record("painted-bubble-fit", { frames, tolerancePx: 1 });
  await expect(target).toHaveAttribute("data-test-painted-coordinate", "true");
  expect(frames.some(frame => frame.visible)).toBe(true);
  expect(frames.filter(frame => frame.visible).every(frame => frame.farthestGlyphCorner <= frame.radius + 1)).toBe(true);
});

test("heat readout tone follows the painted light-to-dark and dark-to-light fill without a plate", async ({ page }) => {
  await open(page, false);
  const control = page.getByRole("combobox", { name: "示例状态" });
  await control.selectOption("zero");
  const chart = matrix(page, "course-similarity"), target = cell(chart, "course-4", "course-1");
  await chart.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(1800);
  await control.evaluate(node => node.setAttribute("data-test-painted-state-control", "true"));
  const results = [];
  for (const state of ["normal", "zero"]) {
    const frames = await target.evaluate(async (node, state) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const context = canvas.getContext("2d", { colorSpace: "srgb", willReadFrequently: true });
      if (!context) throw new Error("A native sRGB color sampling context is required");
      const luminance = (color: string) => {
        // CSS transitions may report oklab(); let the browser convert painted colors to sRGB.
        context.clearRect(0, 0, 1, 1);
        context.fillStyle = color;
        context.fillRect(0, 0, 1, 1);
        const channels = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map(value => value / 255);
        return channels.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index]!, 0);
      };
      const chart = node.closest('[data-rain-id="ui-chart-matrix"]')!;
      const dark = luminance(getComputedStyle(chart.querySelector(".rain-matrix__color-probe--dark")!).color);
      const light = luminance(getComputedStyle(chart.querySelector(".rain-matrix__color-probe--light")!).color);
      const frames: { time: number; background: string; readout: string; plate: string; chosenRatio: number; bestRatio: number }[] = [], start = performance.now();
      const control = document.querySelector<HTMLSelectElement>('[data-test-painted-state-control="true"]')!;
      control.value = state;
      control.dispatchEvent(new Event("change", { bubbles: true }));
      await new Promise<void>(resolve => {
        const sample = (now: number) => {
          const mark = node.querySelector('[data-slot="cell-mark"]')!, reading = node.querySelector('[data-slot="reading"]')!, container = node.querySelector('[data-slot="reading-container"]')!;
          const background = getComputedStyle(mark).backgroundColor, readout = getComputedStyle(reading).color, fill = luminance(background);
          const ratio = (tone: number) => (Math.max(tone, fill) + .05) / (Math.min(tone, fill) + .05);
          frames.push({ time: now - start, background, readout, plate: getComputedStyle(container).backgroundColor, chosenRatio: ratio(luminance(readout)), bestRatio: Math.max(ratio(dark), ratio(light)) });
          if (now - start < 900) requestAnimationFrame(sample); else resolve();
        };
        requestAnimationFrame(sample);
      });
      return frames;
    }, state);
    results.push({ state, frames });
  }
  await record("painted-heat-tone", { results, contrastChoiceTolerance: .1 });
  for (const { frames } of results) {
    expect(new Set(frames.map(frame => frame.background)).size).toBeGreaterThan(2);
    expect(frames.every(frame => frame.plate === "rgba(0, 0, 0, 0)")).toBe(true);
    expect(frames.every(frame => frame.chosenRatio >= frame.bestRatio - .1)).toBe(true);
  }
});
