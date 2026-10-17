import { test, expect, type Page, type Locator } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const observations = new WeakMap<Page, { errors: string[]; checks: unknown[] }>();
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light", forcedColors: "none" });
  await page.addInitScript(() => {
    if (document.documentElement) document.documentElement.setAttribute("data-rain-theme", "light");
    else document.addEventListener("DOMContentLoaded", () => document.documentElement.setAttribute("data-rain-theme", "light"), { once: true });
  });
  const record = { errors: [] as string[], checks: [] as unknown[] }; observations.set(page, record);
  page.on("pageerror", error => record.errors.push(String(error)));
});
test.afterEach(async ({ page }, info) => {
  const record = observations.get(page)!;
  try {
    record.checks.push(await page.evaluate(() => ({ theme: document.documentElement.getAttribute("data-rain-theme"), reduced: matchMedia("(prefers-reduced-motion: reduce)").matches, width: innerWidth, pageWidth: document.documentElement.scrollWidth })));
    await page.screenshot({ path: info.outputPath("final-state.png") });
  } finally {
    mkdirSync(info.outputDir, { recursive: true });
    writeFileSync(info.outputPath("facts.json"), JSON.stringify({ name: info.title, project: info.project.name, status: info.status, ...record }, null, 2));
  }
  expect(record.errors).toEqual([]);
});

async function setup(page: Page) {
  const served = page.waitForResponse(response => /\/@visx_brush\.js(?:\?|$)/.test(response.url()));
  await page.goto("/#chart-line");
  const module = await served, body = await module.text(), moduleMarkers = [...new Set(body.match(/@visx\+brush@[^/\s]+\/node_modules\/@visx\/brush/g) ?? [])];
  observations.get(page)!.checks.push({ servedBrushModule: { url: module.url(), sha256: createHash("sha256").update(body).digest("hex"), bytes: body.length, moduleMarkers } });
  expect(module.ok()).toBe(true); expect(moduleMarkers.some(marker => marker.startsWith("@visx+brush@4.0.1-alpha.0"))).toBe(true); expect(moduleMarkers.some(marker => marker.startsWith("@visx+brush@3.12.0"))).toBe(false);
  const card = page.locator('[data-chart-variant="line-trio-brush"]'); await card.scrollIntoViewIfNeeded();
  await expect(card.locator(".visx-brush-handle-right")).toBeVisible();
  const table = card.locator("details.rain-chart-data");
  if (!(await table.getAttribute("open"))) await table.locator("summary").click();
  await expect(card.locator("tbody tr")).toHaveCount(30);
  const baseline = await rows(card);
  const native = await card.locator(".visx-brush").elementHandle(); expect(native).not.toBeNull();
  return { card, baseline, native: native!, start: card.getByRole("slider", { name: "范围开始日期", exact: true }), end: card.getByRole("slider", { name: "范围结束日期", exact: true }) };
}
async function rows(card: Locator) {
  return card.locator("tbody tr").evaluateAll(nodes => nodes.map(node => [...node.querySelectorAll("th,td")].map(cell => cell.textContent!.trim())));
}
async function geometry(card: Locator) {
  return card.locator(".visx-brush").evaluate(node => {
    const selection = node.querySelector(".visx-brush-selection")!, left = node.querySelector(".visx-brush-handle-left")!, right = node.querySelector(".visx-brush-handle-right")!;
    return { x: Number(selection.getAttribute("x")), width: Number(selection.getAttribute("width")), leftX: Number(left.getAttribute("x")), rightX: Number(right.getAttribute("x")), leftBox: left.getBoundingClientRect().toJSON(), rightBox: right.getBoundingClientRect().toJSON() };
  });
}
async function exactWindow(page: Page, card: Locator, baseline: string[][], name: string) {
  const from = Number(await card.getByRole("slider", { name: "范围开始日期", exact: true }).inputValue()), to = Number(await card.getByRole("slider", { name: "范围结束日期", exact: true }).inputValue());
  expect(Number.isInteger(from) && Number.isInteger(to)).toBe(true); expect(from).toBeGreaterThanOrEqual(0); expect(to).toBeLessThanOrEqual(29); expect(to).toBeGreaterThan(from);
  await expect(card.locator("tbody tr")).toHaveCount(to - from + 1);
  expect(await rows(card)).toEqual(baseline.slice(from, to + 1));
  const status = card.getByRole("status", { name: "当前查看范围", exact: true });
  await expect(status).toContainText(baseline[from]![0]!); await expect(status).toContainText(baseline[to]![0]!);
  const paths = await card.locator(".rain-chart-plot path.visx-linepath").evaluateAll(nodes => nodes.map(node => node.getAttribute("d")));
  expect(paths.length).toBe(3); expect(paths.every(path => path && !/NaN|Infinity|undefined/.test(path))).toBe(true);
  const extent = await geometry(card); expect(Object.values(extent).filter(value => typeof value === "number").every(Number.isFinite)).toBe(true); expect(extent.width).toBeGreaterThan(0);
  observations.get(page)!.checks.push({ action: name, from, to, dates: [baseline[from]![0], baseline[to]![0]], rows: to - from + 1, extent, paths });
  return { from, to, extent };
}
async function keyboard(page: Page, target: Locator, key: string) {
  await page.mouse.move(0, 0); await target.scrollIntoViewIfNeeded(); await page.keyboard.press("Tab"); await target.focus(); await expect(target).toBeFocused(); await target.press(key);
}
async function capturedRange(page: Page, card: Locator, from: number, to: number, discrete = true) {
  if (!(await card.locator("pre").count())) await card.getByText("查看本卡代码", { exact: true }).click();
  const iso = await page.evaluate(([a,b]) => [new Date(2026, 8, a + 1).toISOString(), new Date(2026, 8, b + 1).toISOString()], [from, to] as [number, number]);
  if (discrete) { await expect(card.locator("pre")).toContainText(`"brush":["${iso[0]}","${iso[1]}"]`); observations.get(page)!.checks.push({ capturedBrush: iso, source: "keyboard exact dates" }); }
  else {
    const match = (await card.locator("pre").textContent())!.match(/"brush":\["([^"]+)","([^"]+)"\]/); expect(match).not.toBeNull();
    const dates = [match![1]!, match![2]!], millis = dates.map(value => new Date(value).getTime()), discreteMillis = iso.map(value => new Date(value!).getTime());
    expect(millis.every(Number.isFinite)).toBe(true); expect(millis[0]).toBeLessThanOrEqual(discreteMillis[0]!); expect(millis[0]).toBeGreaterThan(discreteMillis[0]! - 86400000); expect(millis[1]).toBeGreaterThanOrEqual(discreteMillis[1]!); expect(millis[1]).toBeLessThan(discreteMillis[1]! + 86400000);
    observations.get(page)!.checks.push({ capturedBrush: dates, source: "continuous pointer time range; displayed rows are its inclusive date subset" });
  }
}
async function reset(page: Page, card: Locator, baseline: string[][], initialWidth: number) {
  await keyboard(page, card.getByRole("button", { name: "重置范围", exact: true }), "Enter");
  await expect(card.getByRole("slider", { name: "范围开始日期", exact: true })).toHaveValue("0");
  await expect(card.getByRole("slider", { name: "范围结束日期", exact: true })).toHaveValue("29");
  await exactWindow(page, card, baseline, "keyboard reset to complete exact window");
  await expect.poll(async () => (await geometry(card)).x).toBeCloseTo(0, 0);
  await expect.poll(async () => (await geometry(card)).width).toBeCloseTo(initialWidth, 0);
}

test("Brush keyboard endpoints synchronize native handles, exact rows, captured range and reset", async ({ page }, info) => {
  const { card, baseline, native, start, end } = await setup(page), original = await geometry(card);
  await keyboard(page, start, "ArrowRight"); await expect(start).toHaveValue("1");
  const first = await exactWindow(page, card, baseline, "start ArrowRight"); expect(first.from).toBe(1); expect(first.to).toBe(29); expect(first.extent.leftX).toBeGreaterThan(original.leftX);
  await keyboard(page, end, "ArrowLeft"); await expect(end).toHaveValue("28");
  const second = await exactWindow(page, card, baseline, "end ArrowLeft"); expect(second.from).toBe(1); expect(second.to).toBe(28); expect(second.extent.rightX).toBeLessThan(original.rightX);
  await capturedRange(page, card, 1, 28); await reset(page, card, baseline, original.width); await capturedRange(page, card, 0, 29);
  expect(await native.evaluate(node => node.isConnected && node === node.closest('[data-chart-variant]')!.querySelector(".visx-brush"))).toBe(true);
  observations.get(page)!.checks.push({ nativeRetained: true }); await card.screenshot({ path: info.outputPath("keyboard-reset-card.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(info.project.use.viewport!.width + 1);
});

test("Brush real multi-move resize and selection pan preserve exact window and reset", async ({ page }, info) => {
  const { card, baseline, native, start, end } = await setup(page), original = await geometry(card);
  const right = card.locator(".visx-brush-handle-right"); await right.scrollIntoViewIfNeeded(); const box = (await right.boundingBox())!, y = box.y + box.height / 2, x = box.x + box.width / 2;
  const beforePath = await card.locator(".rain-chart-plot path.visx-linepath").first().getAttribute("d");
  await page.mouse.move(x, y); await page.mouse.down();
  await page.mouse.move(x - original.width * .18, y, { steps: 4 }); await expect.poll(() => end.inputValue()).not.toBe("29");
  const preview1 = await exactWindow(page, card, baseline, "resize first real pointer preview");
  await page.mouse.move(x - original.width * .32, y, { steps: 4 }); await expect.poll(async () => Number(await end.inputValue())).toBeLessThan(preview1.to);
  const preview2 = await exactWindow(page, card, baseline, "resize second real pointer preview"); expect(preview2.extent.rightX).toBeLessThan(preview1.extent.rightX);
  await page.mouse.up(); const committed = await exactWindow(page, card, baseline, "resize commit"); expect(committed.to).toBe(preview2.to);
  await expect.poll(() => card.locator(".rain-chart-plot path.visx-linepath").first().getAttribute("d")).not.toBe(beforePath);
  await capturedRange(page, card, committed.from, committed.to, false); await reset(page, card, baseline, original.width);
  await keyboard(page, start, "Home"); for (let i = 0; i < 5; i++) await start.press("ArrowRight");
  await keyboard(page, end, "End"); for (let i = 0; i < 9; i++) await end.press("ArrowLeft");
  const selected = await exactWindow(page, card, baseline, "interior keyboard window before pan"); expect(selected.from).toBe(5); expect(selected.to).toBe(20);
  const selection = card.locator(".visx-brush-selection"); await selection.scrollIntoViewIfNeeded(); const area = (await selection.boundingBox())!, centerX = area.x + area.width / 2, centerY = area.y + area.height / 2;
  await page.mouse.move(centerX, centerY); await page.mouse.down(); await page.mouse.move(centerX + original.width * .15, centerY, { steps: 6 }); await page.mouse.up();
  await expect.poll(async () => Number(await start.inputValue())).toBeGreaterThan(5);
  const panned = await exactWindow(page, card, baseline, "real pointer selection pan"); expect(panned.to).toBeGreaterThan(20); expect(panned.extent.x).toBeGreaterThan(selected.extent.x);
  expect(panned.extent.width).toBeCloseTo(selected.extent.width, 0); await capturedRange(page, card, panned.from, panned.to, false); await reset(page, card, baseline, original.width);
  expect(await native.evaluate(node => node.isConnected && node === node.closest('[data-chart-variant]')!.querySelector(".visx-brush"))).toBe(true);
  observations.get(page)!.checks.push({ nativeRetained: true }); await card.screenshot({ path: info.outputPath("pointer-reset-card.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(info.project.use.viewport!.width + 1);
});
