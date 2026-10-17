import { expect, test, type Locator, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import reference from "../../apps/playground/src/docs/components/chart-variants/reference.json" with { type: "json" };

type Resources = { producers: number; nativeFrames: number; observers: number; visibilityListeners: number; activeHosts: number; creates: number; cancels: number; samples: string[] };
declare global { interface Window { __liveResources: () => Resources; __liveDisposalProbe: () => Resources; __liveOriginal: Element; } }
const variants = reference.filter(item => item.chartId === "live-line").map(item => item.id);
const hosts = ["default", ...variants];
expect(variants).toHaveLength(9);

test.beforeEach(async ({ page }) => {
  await page.clock.install({ time: new Date("2026-10-11T00:00:00Z") });
  await page.addInitScript(() => {
    const producers = new Map<number, string>();
    const frames = new Set<number>();
    const observers = new Set<IntersectionObserver>();
    const listeners = new Set<EventListenerOrEventListenerObject>();
    const samples: string[] = [];
    let creates = 0, cancels = 0;
    const isHost = (stack: string) => /chart-examples\.tsx|chart-variants\/special\.tsx/.test(stack);
    const set = window.setInterval, clear = window.clearInterval;
    window.setInterval = function (callback, delay, ...args) {
      const stack = new Error().stack ?? "";
      const id = set.call(this, callback, delay, ...args);
      if ((delay === 600 || delay === 1000) && isHost(stack)) {
        producers.set(id, stack); creates++;
        if (samples.length < 4) samples.push(`producer ${delay}ms: ${stack.split("\n")[2]}`);
      }
      return id;
    };
    window.clearInterval = function (id) { if (producers.delete(id as number)) cancels++; clear.call(this, id); };
    const raf = window.requestAnimationFrame, cancel = window.cancelAnimationFrame;
    window.requestAnimationFrame = function (callback) {
      const owned = callback.name === "tick" && /live-line-chart\.tsx/.test(new Error().stack ?? "");
      let id = 0;
      id = raf.call(this, time => { if (owned) frames.delete(id); callback(time); });
      if (owned) frames.add(id);
      return id;
    };
    window.cancelAnimationFrame = function (id) { frames.delete(id); cancel.call(this, id); };
    const Observer = window.IntersectionObserver;
    window.IntersectionObserver = class extends Observer {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        super(callback, options);
        if (/chart-examples\.tsx|chart-variants\/special\.tsx|chart-variant-gallery\.tsx/.test(new Error().stack ?? "")) observers.add(this);
      }
      override disconnect() { observers.delete(this); super.disconnect(); }
    };
    const add = document.addEventListener, remove = document.removeEventListener;
    document.addEventListener = function (this: Document, type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions) {
      if (type === "visibilitychange" && callback && /chart-examples\.tsx|chart-variants\/special\.tsx|chart-variant-gallery\.tsx/.test(new Error().stack ?? "")) listeners.add(callback);
      add.call(this, type, callback as EventListenerOrEventListenerObject, options);
    } as typeof document.addEventListener;
    document.removeEventListener = function (this: Document, type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions) { if (type === "visibilitychange" && callback) listeners.delete(callback); remove.call(this, type, callback as EventListenerOrEventListenerObject, options); } as typeof document.removeEventListener;
    window.__liveResources = () => ({ producers: producers.size, nativeFrames: frames.size, observers: observers.size, visibilityListeners: listeners.size, activeHosts: document.querySelectorAll('[data-live-paused="false"]').length, creates, cancels, samples });
  });
});

function host(page: Page, id: string) { return page.locator(id === "default" ? '[data-rain-id="chart-live-line"]' : `[data-chart-variant="${id}"]`); }
function plot(root: Locator) { return root.locator('[data-rain-id="ui-chart-live-line"]'); }
function meta(root: Locator) { return root.locator("[data-live-paused][data-live-count]"); }
async function rows(root: Locator) { return root.locator("tbody tr").evaluateAll(nodes => nodes.map(row => [...row.querySelectorAll("th,td")].map(cell => cell.textContent))); }
async function resources(page: Page) { return page.evaluate(() => window.__liveResources()); }
async function geometry(root: Locator) {
  return plot(root).evaluate(node => ({ paths: [...node.querySelectorAll("path[d]")].map(path => path.getAttribute("d")!), axes: [...node.querySelectorAll(".text-chart-label")].map(label => label.textContent), width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height }));
}
function finite(value: Awaited<ReturnType<typeof geometry>>) { expect(value.paths.length).toBeGreaterThan(0); expect(value.paths.every(path => path.length > 0 && !/NaN|Infinity|undefined/.test(path))).toBe(true); expect(value.width).toBeGreaterThan(100); expect(value.height).toBeGreaterThan(100); }
async function ready(page: Page, id: string) {
  await page.goto("/#chart-live-line");
  const root = host(page, id);
  if (id !== "default") await root.scrollIntoViewIfNeeded();
  await expect(plot(root)).toBeVisible();
  await plot(root).scrollIntoViewIfNeeded();
  await page.clock.runFor(400);
  await expect(plot(root).locator("path.visx-linepath").first()).toHaveAttribute("d", /M/);
  return root;
}
async function onePerActive(page: Page) {
  await expect.poll(async () => { const value = await resources(page); return [value.producers - value.activeHosts, value.nativeFrames - value.activeHosts]; }).toEqual([0, 0]);
  const value = await resources(page); expect(value.activeHosts).toBeGreaterThan(0); return value;
}
async function stopped(page: Page) { await expect.poll(async () => { const value = await resources(page); return [value.producers, value.nativeFrames]; }).toEqual([0, 0]); return resources(page); }
async function dispose(page: Page) {
  const before = await resources(page);
  await page.evaluate(() => { window.__liveDisposalProbe = window.__liveResources; location.hash = "#components"; });
  await expect(page.locator("[data-live-count]")).toHaveCount(0);
  await page.clock.runFor(100);
  expect(await page.evaluate(() => window.__liveDisposalProbe === window.__liveResources)).toBe(true);
  const value = await stopped(page); expect(value.observers).toBe(0); expect(value.visibilityListeners).toBe(0); expect(value.creates).toBe(before.creates);
  return { ...value, sameProbe: true, before };
}
function action(page: Page, root: Locator, id: string, name: string) { return (id === "default" ? page.locator("[data-chart-default-controls]") : root).getByRole("button", { name, exact: true }); }

test("all ten actual hosts retain finite geometry through automatic, pause, keyboard manual and reduced states", async ({ page }, info) => {
  const errors: string[] = []; page.on("pageerror", error => errors.push(String(error)));
  const observations: unknown[] = [];
  const reduced = (info.project.use as { reducedMotion?: string }).reducedMotion === "reduce";
  try {
    for (const id of hosts) {
      await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" });
      const root = await ready(page, id);
      const initial = await rows(root); expect(initial).toHaveLength(60); finite(await geometry(root));
      if (reduced) {
        await expect(meta(root)).toHaveAttribute("data-live-paused", "true");
        await expect(root.getByRole("button", { name: /暂停实时|恢复实时/ })).toBeDisabled();
        await page.clock.runFor(1600); expect(await rows(root)).toEqual(initial); await stopped(page);
      } else {
        await expect(meta(root)).toHaveAttribute("data-live-paused", "false");
        await onePerActive(page);
        await expect(plot(root).locator('animate[repeatCount="indefinite"]')).toHaveCount(2);
        await page.clock.runFor(1600); expect((await rows(root)).length).toBeGreaterThan(initial.length);
        await root.getByRole("button", { name: "暂停实时", exact: true }).click();
        await expect(meta(root)).toHaveAttribute("data-live-paused", "true");
      }
      await page.clock.runFor(250);
      const frozenRows = await rows(root), frozenGeometry = await geometry(root); finite(frozenGeometry);
      await page.clock.runFor(1600); expect(await rows(root)).toEqual(frozenRows); expect(await geometry(root)).toEqual(frozenGeometry);
      await expect(plot(root).locator('animate[repeatCount="indefinite"]')).toHaveCount(0);
      await plot(root).screenshot({ path: info.outputPath(`${id}-paused.png`) });
      const manual = root.getByRole("button", { name: "追加一次", exact: true });
      await manual.focus(); await manual.press("Enter"); await expect(manual).toBeFocused();
      await page.clock.runFor(100);
      const manualRows = await rows(root); expect(manualRows).toHaveLength(frozenRows.length + 1);
      expect(Number(manualRows.at(-1)![0])).toBeGreaterThan(Number(frozenRows.at(-1)![0]));
      expect(manualRows.slice(0, -1)).toEqual(frozenRows);
      const manualGeometry = await geometry(root); finite(manualGeometry); expect(manualGeometry.paths).not.toEqual(frozenGeometry.paths);
      await plot(root).screenshot({ path: info.outputPath(`${id}-manual.png`) });
      if (!reduced) {
        await root.getByRole("button", { name: "恢复实时", exact: true }).click();
        await expect(meta(root)).toHaveAttribute("data-live-paused", "false");
        await page.clock.runFor(1200); expect((await rows(root)).length).toBeGreaterThan(manualRows.length);
        await page.emulateMedia({ reducedMotion: "reduce" }); await expect(meta(root)).toHaveAttribute("data-live-paused", "true");
        const reducedRows = await rows(root); await page.clock.runFor(1200); expect(await rows(root)).toEqual(reducedRows); await stopped(page);
        await page.emulateMedia({ reducedMotion: "no-preference" }); await expect(meta(root)).toHaveAttribute("data-live-paused", "false"); await onePerActive(page);
      }
      observations.push({ id, initialCount: initial.length, pausedCount: frozenRows.length, manualCount: manualRows.length, frozenAxes: frozenGeometry.axes, manualAxes: manualGeometry.axes, finiteGeometry: true, keyboardManual: true, disposal: await dispose(page) });
    }
    expect(errors).toEqual([]);
  } finally { mkdirSync(info.outputDir, { recursive: true }); writeFileSync(info.outputPath("facts.json"), JSON.stringify({ scope: "10 real hosts", mode: info.project.name, observations, pageErrors: errors }, null, 2)); }
});

for (const id of ["default", "live-line-default"]) test(`${id} plot-only visibility, simulated background, 65s user freeze, update and disposal`, async ({ page }, info) => {
  const errors: string[] = []; page.on("pageerror", error => errors.push(String(error)));
  const record: Record<string, unknown> = { id, mode: info.project.name, background: "document.hidden + visibilitychange simulation; not OS background", longWait: "Playwright clock fastForward 65000ms" };
  try {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const root = await ready(page, id); await expect(meta(root)).toHaveAttribute("data-live-paused", "false");
    await page.clock.runFor(1600); record.automatic = await onePerActive(page);
    const details = root.locator("details.rain-chart-data"); await details.locator("summary").click();
    await root.locator("tbody tr").nth(25).scrollIntoViewIfNeeded();
    await expect.poll(() => plot(root).evaluate(node => node.getBoundingClientRect().bottom < 0)).toBe(true);
    await expect(root.locator("tbody tr").nth(25)).toBeVisible();
    if (id !== "default") await expect(root).toHaveAttribute("data-active", "true");
    await expect(meta(root)).toHaveAttribute("data-live-paused", "true");
    await page.clock.runFor(100);
    const offRows = await rows(root), offGeometry = await geometry(root);
    record.offscreenResources = await stopped(page);
    await page.clock.runFor(2200); expect(await rows(root)).toEqual(offRows); expect(await geometry(root)).toEqual(offGeometry);
    await page.screenshot({ path: info.outputPath("plot-offscreen-table-visible.png") });
    await plot(root).scrollIntoViewIfNeeded(); await expect(meta(root)).toHaveAttribute("data-live-paused", "false");
    await page.clock.runFor(1200); expect((await rows(root)).length).toBeGreaterThan(offRows.length); await onePerActive(page);
    await page.evaluate(() => { Object.defineProperty(document, "hidden", { configurable: true, get: () => true }); document.dispatchEvent(new Event("visibilitychange")); });
    await expect(meta(root)).toHaveAttribute("data-live-paused", "true"); await page.clock.runFor(100);
    const backgroundRows = await rows(root); record.backgroundResources = await stopped(page);
    await page.clock.runFor(2200); expect(await rows(root)).toEqual(backgroundRows);
    await page.evaluate(() => { delete (document as unknown as Record<string, unknown>).hidden; document.dispatchEvent(new Event("visibilitychange")); });
    await expect(meta(root)).toHaveAttribute("data-live-paused", "false"); await page.clock.runFor(1200); await onePerActive(page);
    await root.getByRole("button", { name: "暂停实时", exact: true }).click(); await expect(meta(root)).toHaveAttribute("data-live-paused", "true"); await page.clock.runFor(100);
    await plot(root).evaluate(node => { window.__liveOriginal = node; });
    const pausedRows = await rows(root), pausedGeometry = await geometry(root);
    await page.clock.fastForward(65000);
    await action(page, root, id, "重播动效").click(); await page.clock.runFor(100);
    expect(await plot(root).evaluate(node => node === window.__liveOriginal)).toBe(true);
    expect(await rows(root)).toEqual(pausedRows); expect(await geometry(root)).toEqual(pausedGeometry);
    record.longFreeze = { count: pausedRows.length, sameChartDom: true, sameRawPoints: true, sameNativePaths: true, sameRenderedWindowAxes: true, axes: pausedGeometry.axes };
    await plot(root).scrollIntoViewIfNeeded(); await page.emulateMedia({ reducedMotion: "reduce" }); await page.clock.runFor(1200);
    expect(await rows(root)).toEqual(pausedRows); expect(await geometry(root)).toEqual(pausedGeometry); await stopped(page);
    await page.emulateMedia({ reducedMotion: "no-preference" }); await expect(root.getByRole("button", { name: "恢复实时", exact: true })).toBeEnabled();
    expect(await rows(root)).toEqual(pausedRows); await page.clock.runFor(1200); expect(await rows(root)).toEqual(pausedRows);
    await root.getByRole("button", { name: "追加一次", exact: true }).click(); await page.clock.runFor(100);
    expect((await rows(root)).length).toBe(pausedRows.length + 1); expect((await geometry(root)).paths).not.toEqual(pausedGeometry.paths);
    if (await details.getAttribute("open") !== null) await details.locator("summary").click();
    await root.getByRole("button", { name: "恢复实时", exact: true }).click(); await plot(root).scrollIntoViewIfNeeded(); await expect(meta(root)).toHaveAttribute("data-live-paused", "false");
    await page.clock.runFor(100); const beforeUpdate = await onePerActive(page); const updateRows = await rows(root);
    await action(page, root, id, "更新数据").click(); await plot(root).scrollIntoViewIfNeeded(); await page.clock.runFor(100);
    record.updateResources = { before: beforeUpdate, after: await onePerActive(page) }; expect(await rows(root)).not.toEqual(updateRows); finite(await geometry(root));
    await page.clock.runFor(1600); const timedRows = await rows(root); expect(timedRows.length).toBeGreaterThan(60); expect(timedRows.length).toBeLessThanOrEqual(120);
    const times = timedRows.map(row => Number(row[0])); expect(times.every((time, index) => index === 0 || time > times[index - 1]!)).toBe(true);
    await plot(root).screenshot({ path: info.outputPath("updated-running.png") });
    record.disposal = await dispose(page); expect(errors).toEqual([]);
  } finally { mkdirSync(info.outputDir, { recursive: true }); writeFileSync(info.outputPath("facts.json"), JSON.stringify({ ...record, pageErrors: errors }, null, 2)); }
});
