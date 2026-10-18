import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test, type Locator, type Page } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const base = "evidence/runtime/chart-experience-third-batch-2026-10-11/candle-live/candle-browser";
const run = process.env.RAIN_CANDLE_BROWSER_RUN ?? "after-01";
const folder = evidenceOutputPath(`${base}/${run}`);
const variants = ["candlestick-tooltip-line-default", "candlestick-tooltip-line-gradient", "candlestick-chart-1-3", "candlestick-lime-emerald-yellow-red", "candlestick-solid-colors", "candlestick-pattern", "candlestick-tooltip-only", "candlestick-pattern-background", "candlestick-dot-grid-background", "candlestick-reference-band", "candlestick-pattern-reference-band"];
const files = [
  "apps/playground/src/docs/components/chart-variants/special.tsx", "apps/playground/src/docs/components/chart-examples.tsx",
  "apps/playground/src/docs/components/chart-data.ts", "apps/playground/src/docs/components/chart-point-reading.tsx",
  "apps/playground/src/docs/components/chart-variants/shared.tsx", "apps/playground/src/docs/components/chart-variant-gallery.tsx",
  "apps/playground/src/docs/components/chart-page.tsx", "apps/playground/src/docs/components/chart-page.css",
  "packages/ui/src/charts/vendor/charts/candlestick-chart.tsx", "packages/ui/src/charts/vendor/charts/candlestick.tsx",
  "packages/ui/src/charts/vendor/charts/use-chart-interaction.ts", "packages/ui/src/charts/vendor/charts/use-scheduled-tooltip.ts",
  "packages/ui/src/charts/vendor/charts/chart-legend.tsx", "packages/ui/src/charts/vendor/charts/legend/use-legend-interaction.ts",
];
type Candle = {date: string; time: number; label: string; open: number; high: number; low: number; close: number; direction: string};
const native = (host: Locator) => host.locator('[data-rain-id="ui-chart-candlestick"]');
// Native bodies are the second rect in each candle group. Pattern overlays and wicks remain separate.
const bodies = (host: Locator) => native(host).locator(".chart-candlesticks > g > rect:nth-child(2)");
const groups = (host: Locator) => native(host).locator(".chart-candlesticks > g");
const status = (host: Locator) => host.locator("[data-point-reading] > [role=status]");
async function sources() { return Promise.all(files.map(async path => ({ path, sha256: createHash("sha256").update(await readFile(path, "utf8")).digest("hex") }))); }
async function raw(page: Page, revision = 0, scenario = "normal"): Promise<Candle[]> {
  return page.evaluate(async ({revision, scenario}) => {
    const path = "/src/docs/components/chart-data.ts";
    const module = await import(/* @vite-ignore */ path);
    return module.applyCandleBoundary(module.makeCandles(revision), scenario).map((point: any) => ({...point, date: point.date.toISOString(), time: point.date.getTime(), label: module.dateLabel(point.date), direction: point.close > point.open ? "上涨" : point.close < point.open ? "下跌" : "平盘"}));
  }, {revision, scenario});
}
async function geometry(host: Locator) {
  return bodies(host).evaluateAll(nodes => nodes.map(node => ({x: node.getAttribute("x"), y: node.getAttribute("y"), width: node.getAttribute("width"), height: node.getAttribute("height"), fill: node.getAttribute("fill"), computedFill: getComputedStyle(node).fill, stroke: node.getAttribute("stroke")})));
}
async function settle(page: Page, host: Locator, motion: "reduce" | "no-preference") {
  await native(host).scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(bodies(host).first()).toBeVisible();
  if (motion === "no-preference") await page.waitForTimeout(1300);
  await page.waitForTimeout(180);
}
async function table(host: Locator, data: Candle[]) {
  await expect(host.locator("tbody tr")).toHaveCount(data.length);
  const actual = await host.locator("tbody tr").evaluateAll(nodes => nodes.map(node => [...node.querySelectorAll("th,td")].map(cell => cell.textContent ?? "")));
  expect(actual).toEqual(data.map(point => [point.label, String(point.open), String(point.high), String(point.low), String(point.close), point.direction]));
  expect(data.every(point => point.high >= Math.max(point.open, point.close) && point.low <= Math.min(point.open, point.close))).toBe(true);
  expect(new Set(data.map(point => point.date)).size).toBe(data.length);
  return actual;
}
async function read(host: Locator, point: Candle) {
  const reader = host.getByRole("combobox", {name: "读取日期", exact: true});
  await reader.focus();
  await expect(reader).toBeFocused();
  await reader.selectOption(String(point.time));
  await expect(reader).toHaveValue(String(point.time));
  await expect(status(host)).toHaveAttribute("data-point-reading-date", point.date);
  for (const [key, label] of [["open", "开盘"], ["high", "最高"], ["low", "最低"], ["close", "收盘"]] as const) await expect(status(host)).toContainText(`${label} ${point[key]} 指数`);
  await expect(status(host)).toContainText(`方向 ${point.direction}`);
  return status(host).textContent();
}
async function clean(page: Page, host: Locator) {
  const attributes = await native(host).locator("path[d],rect").evaluateAll(nodes => nodes.map(node => [...node.attributes].map(attribute => attribute.value).join(" ")));
  expect(attributes.some(value => /NaN|Infinity/.test(value))).toBe(false);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
}
async function directionColors(host: Locator, data: Candle[]) {
  const shapes = await geometry(host);
  expect(shapes).toHaveLength(data.length);
  const up = data.findIndex(point => point.close >= point.open), down = data.findIndex(point => point.close < point.open);
  expect(up).toBeGreaterThanOrEqual(0); expect(down).toBeGreaterThanOrEqual(0);
  const upFill = shapes[up]!.fill, downFill = shapes[down]!.fill;
  expect(upFill).not.toBe(downFill);
  for (let index = 0; index < data.length; index++) expect(shapes[index]!.fill).toBe(data[index]!.close >= data[index]!.open ? upFill : downFill);
  return {upFill, downFill, shapes};
}
async function legend(page: Page, host: Locator) {
  const key = host.locator(".rain-chart-legend-button").nth(1);
  await key.focus(); await expect(key).toBeFocused();
  expect(await key.getAttribute("aria-pressed")).toBeNull();
  await expect.poll(() => groups(host).evaluateAll(nodes => nodes.some(node => Number(node.getAttribute("opacity")) < 1))).toBe(true);
  const count = await bodies(host).count();
  await key.press("Escape");
  await expect.poll(() => groups(host).evaluateAll(nodes => nodes.every(node => Number(node.getAttribute("opacity")) === 1))).toBe(true);
  // Escape keeps focus; clicking the same button must read again without a focus transition.
  await key.click();
  await expect.poll(() => groups(host).evaluateAll(nodes => nodes.some(node => Number(node.getAttribute("opacity")) < 1))).toBe(true);
  expect(await bodies(host).count()).toBe(count);
  await page.mouse.move(0, 0); await page.locator("h1").dispatchEvent("pointerdown");
  await expect.poll(() => groups(host).evaluateAll(nodes => nodes.every(node => Number(node.getAttribute("opacity")) === 1))).toBe(true);
  return {count, ariaPressed: await key.getAttribute("aria-pressed"), escapeSameButtonClick: true};
}
async function fixedPointerUpdate(page: Page, host: Locator, update: Locator, index = 10) {
  const original = (await raw(page))[index]!;
  await read(host, original);
  await native(host).scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const rect = bodies(host).nth(index);
  const box = (await rect.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  const tip = host.locator(".rain-chart-tooltip");
  await expect(tip).toBeVisible();
  const values = tip.locator("span.tabular-nums");
  await expect(values).toHaveText([original.open, original.high, original.low, original.close].map(String));
  await update.dispatchEvent("click");
  const revised = (await raw(page, 1))[index]!;
  await expect(values).toHaveText([revised.open, revised.high, revised.low, revised.close].map(String));
  await expect(status(host)).toHaveAttribute("data-point-reading-date", original.date);
  await expect(status(host)).toContainText(`收盘 ${revised.close} 指数`);
  const result = {original, revised, tooltip: await tip.textContent(), reader: await status(host).textContent()};
  await page.mouse.move(0, 0);
  return result;
}
async function samples(page: Page, host: Locator, motion: "reduce" | "no-preference", name: string) {
  await settle(page, host, motion);
  const normal = await raw(page), originalGeometry = await geometry(host);
  await table(host, normal);
  const colors = await directionColors(host, normal);
  const legendFacts = await legend(page, host);
  const sample = host.getByRole("combobox", {name: "K线边界样本", exact: true});
  const reader = host.getByRole("combobox", {name: "读取日期", exact: true});
  await sample.selectOption("candlestick-dense");
  await settle(page, host, motion);
  const dense = await raw(page, 0, "candlestick-dense");
  await expect(bodies(host)).toHaveCount(96);
  await expect(reader.locator("option")).toHaveCount(97);
  const denseTable = await table(host, dense), denseReading = await read(host, dense[95]!);
  await clean(page, host);
  await host.screenshot({path: `${folder}/${name}-dense.png`});
  await sample.selectOption("candlestick-flat");
  await settle(page, host, motion);
  const flat = await raw(page, 0, "candlestick-flat");
  await expect(reader).toHaveValue("");
  await expect(status(host)).toContainText("请选择读取日期");
  const flatTable = await table(host, flat), flatReading = await read(host, flat[4]!);
  expect(flat.every(point => point.open === point.close && point.direction === "平盘")).toBe(true);
  const flatGeometry = await geometry(host);
  expect(flatGeometry).toHaveLength(20);
  expect(flatGeometry.every(shape => Number(shape.height) === 1)).toBe(true);
  await clean(page, host); await host.screenshot({path: `${folder}/${name}-flat.png`});
  await sample.selectOption("normal");
  await settle(page, host, motion);
  await table(host, normal);
  expect(await geometry(host)).toEqual(originalGeometry);
  await expect(status(host)).toHaveAttribute("data-point-reading-date", flat[4]!.date);
  await expect(status(host)).toContainText(`收盘 ${normal[4]!.close} 指数`);
  const details = host.locator("details.rain-chart-data");
  await details.locator("summary").click();
  const scroll = details.getByLabel("精确数据表，可横向滚动");
  await scroll.focus(); await expect(scroll).toBeFocused();
  await clean(page, host);
  return {name, normal, colors, legend: legendFacts, dense: {data: dense, table: denseTable, reading: denseReading}, flat: {data: flat, table: flatTable, reading: flatReading, shapes: flatGeometry}, restoredGeometry: await geometry(host), nativeDateMenuArrowCommit: "not claimed; focus and actual selectOption value verified"};
}

for (const width of [1440, 390]) for (const motion of ["no-preference", "reduce"] as const) {
  test(`${width}px ${motion}: default and all eleven Candle variants preserve OHLC, date identity, directions and invalid refusal`, async ({page}) => {
    test.setTimeout(240000);
    const before = await sources(), errors: string[] = [], records: any[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await mkdir(folder, {recursive: true});
    try {
      await page.setViewportSize({width, height: 1000}); await page.emulateMedia({reducedMotion: motion});
      await page.goto(`/?candle-third-batch=${run}#chart-candlestick`);
      let host = page.locator('[data-rain-id="chart-candlestick"]');
      await expect(host).toBeVisible(); await page.evaluate(() => document.fonts.ready);
      const controls = page.locator("[data-chart-default-controls]");
      const defaultFacts = await samples(page, host, motion, `default-${width}-${motion}`);
      // Close the table before a fixed-coordinate pointer re-read.
      await host.locator("details.rain-chart-data > summary").click();
      records.push({...defaultFacts, fixedPointerUpdate: await fixedPointerUpdate(page, host, controls.getByRole("button", {name: "更新数据", exact: true}))});
      await controls.getByRole("combobox", {name: "示例状态", exact: true}).selectOption("invalid");
      await expect(host).toContainText("已拒绝无效数据"); await expect(native(host)).toHaveCount(0);
      records.push({name: "default-invalid", text: await host.textContent(), nativeCount: await native(host).count()});
      await controls.getByRole("combobox", {name: "示例状态", exact: true}).selectOption("normal");
      await expect(native(host)).toHaveCount(1);
      for (const id of variants) {
        host = page.locator(`[data-chart-variant="${id}"]`);
        await host.scrollIntoViewIfNeeded(); await expect(host.locator('[data-ready="true"]')).toBeVisible();
        const result = await samples(page, host, motion, `${id}-${width}-${motion}`);
        await host.locator("details.rain-chart-data > summary").click();
        const fixed = id === "candlestick-tooltip-line-default" ? await fixedPointerUpdate(page, host, host.locator('[data-action="update"]')) : undefined;
        const state = host.getByRole("combobox", {name: "K线示例状态", exact: true});
        await state.selectOption("invalid"); await expect(host).toContainText("已拒绝无效数据");
        await expect(native(host)).toHaveCount(0); await expect(host).toContainText("OHLC关系错误");
        const refusal = await host.locator(".rain-chart-empty").textContent();
        await state.selectOption("normal"); await expect(native(host)).toHaveCount(1);
        await settle(page, host, motion); await clean(page, host);
        records.push({...result, fixedPointerUpdate: fixed, refusal, restoredNativeCount: await native(host).count()});
      }
    } finally {
      const after = await sources(); await writeFile(`${folder}/${width}-${motion}.json`, JSON.stringify({width, motion, before, after, errors, records}, null, 2));
      expect(after).toEqual(before);
    }
    expect(errors).toEqual([]); expect(records.filter(record => record.normal)).toHaveLength(12);
  });
}
