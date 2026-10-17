import { expect, test, type Page } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const run = "evidence/runtime/chart-behavior-fixes-2026-10-11";
const runName = process.env.RAIN_CHART_AXIS_RUN ?? "after-01";
const evidence = `${run}/browser/x-axis/${runName}`;
const baseline = process.env.RAIN_CHART_AXIS_BASELINE === "1";
const sourcePath = resolve("packages/ui/src/charts/vendor/charts/x-axis.tsx");
const beforeSource = await readFile(`${run}/before/packages/ui/src/charts/vendor/charts/x-axis.tsx`, "utf8");
const beforeHash = createHash("sha256").update(beforeSource).digest("hex");
const requireFromVite = createRequire(import.meta.resolve("vite"));
const { transformSync } = await import(requireFromVite.resolve("rolldown/utils"));
const compiledBefore = transformSync(sourcePath, beforeSource, { jsx: { runtime: "automatic", development: true } }).code;
const bodyStart = "const X_AXIS_POSITION_TWEEN_MS";
const beforeBody = compiledBefore.slice(compiledBefore.indexOf(bodyStart));

type Sample = {
  reason: string; elapsed: number; viewport: number; documentWidth: number;
  ticks: { id: number; label: string; left: number; right: number; center: number; position: string; transition: string; color: string; fontSize: string; inlineLeft: string; overlayWidth: number; containingWidth: number }[];
  overflowTicks: { label: string | null; host: string | null | undefined; example: string | undefined; right: number; inlineLeft: string; parentWidth: number; transition: string }[];
  overflowElements: { tag: string; class: string | null; host: string | null | undefined; right: number; width: number; attributeWidth: string | null; parentClass: string; parentWidth: number }[];
};
type FrameAudit = { samples: Sample[]; beforeIds: number[]; afterIds: number[]; firstEvent: string | null };

async function attachBefore(page: Page, intercepted: string[]) {
  if (!baseline) return;
  await page.route(url => decodeURIComponent(url.pathname) === `/@fs${sourcePath}` && !url.searchParams.has("raw"), async route => {
    const response = await route.fetch();
    const liveModule = await response.text();
    const index = liveModule.indexOf(bodyStart);
    expect(index).toBeGreaterThan(0);
    // Keep Vite's resolved dependency/development prelude, use the exact saved
    // baseline source for every function, JSX body and export in the module.
    intercepted.push(route.request().url());
    await route.fulfill({ response, body: liveModule.slice(0, index) + beforeBody, headers: { ...response.headers(), "content-type": "application/javascript" } });
  });
}

async function beginFrames(page: Page, selector: string, targetWidth: number | null, frames = 8, durationMs = 0) {
  await page.evaluate(({ selector, targetWidth, frames, durationMs }) => {
    const host = document.querySelector(selector)!;
    const store = window as unknown as { __axisIds?: WeakMap<Element, number>; __axisCounter?: number; __axisDone?: Promise<FrameAudit> };
    store.__axisIds ??= new WeakMap();
    store.__axisCounter ??= 0;
    const ticks = () => [...host.querySelectorAll("span.whitespace-nowrap.text-chart-label.text-xs")].filter(node => {
      const parent = node.parentElement!;
      return parent.style.bottom === "12px" && parent.style.width === "0px" && parent.style.display === "flex";
    });
    const id = (node: Element) => {
      if (!store.__axisIds!.has(node)) store.__axisIds!.set(node, ++store.__axisCounter!);
      return store.__axisIds!.get(node)!;
    };
    const beforeIds = ticks().map(id);
    const samples: Sample[] = [];
    let count = 0, started: number | null = targetWidth == null ? performance.now() : null;
    let firstEvent: string | null = null;
    let finish: (value: FrameAudit) => void;
    store.__axisDone = new Promise(resolve => { finish = resolve; });
    const sample = (reason: string) => {
      if (targetWidth !== null && innerWidth !== targetWidth) return;
      started ??= performance.now();
      firstEvent ??= reason;
      samples.push({ reason, elapsed: performance.now() - started, viewport: innerWidth, documentWidth: document.documentElement.scrollWidth,
        overflowTicks: [...document.querySelectorAll('span.whitespace-nowrap.text-chart-label.text-xs')].filter(node => node.getBoundingClientRect().right > innerWidth + 1).map(node => ({ label: node.textContent, host: node.closest('[data-rain-id]')?.getAttribute('data-rain-id'), example: node.closest('[data-chart-example],[data-category-example]')?.outerHTML.slice(0,200), right: node.getBoundingClientRect().right, inlineLeft: node.parentElement!.style.left, parentWidth: node.parentElement!.parentElement!.getBoundingClientRect().width, transition: getComputedStyle(node.parentElement!).transition })),
        overflowElements: [...document.querySelectorAll('svg,div,span')].filter(node => node.getBoundingClientRect().right > innerWidth + 1 && node.closest('.rain-chart-plot,.rain-category-plot')).map(node => ({ tag: node.tagName, class: node.getAttribute('class'), host: node.closest('[data-rain-id]')?.getAttribute('data-rain-id'), right: node.getBoundingClientRect().right, width: node.getBoundingClientRect().width, attributeWidth: node.getAttribute('width'), parentClass: node.parentElement!.getAttribute('class') ?? '', parentWidth: node.parentElement!.getBoundingClientRect().width })).slice(0,25),
        ticks: ticks().map(node => {
          const box = node.getBoundingClientRect(), parent = node.parentElement!, style = getComputedStyle(parent), text = getComputedStyle(node);
          return { id: id(node), label: node.textContent ?? "", left: box.left, right: box.right, center: (box.left + box.right) / 2, position: style.left, transition: style.transition, color: text.color, fontSize: text.fontSize, inlineLeft: parent.style.left, overlayWidth: parent.parentElement!.getBoundingClientRect().width, containingWidth: parent.parentElement!.parentElement!.getBoundingClientRect().width };
        }),
      });
    };
    const resize = () => sample("resize-event");
    addEventListener("resize", resize);
    const observer = new ResizeObserver(() => sample("resize-observer"));
    const plot = host.querySelector(".rain-chart-plot,.rain-category-plot") ?? host;
    observer.observe(plot);
    const next = () => {
      if (targetWidth === null || innerWidth === targetWidth) { sample("raf"); count++; }
      if (count < frames || started === null || performance.now() - started < durationMs) requestAnimationFrame(next);
      else {
        observer.disconnect(); removeEventListener("resize", resize);
        finish!({ samples, beforeIds, afterIds: ticks().map(id), firstEvent });
      }
    };
    requestAnimationFrame(next);
  }, { selector, targetWidth, frames, durationMs });
}

async function finishFrames(page: Page): Promise<FrameAudit> {
  return page.evaluate(async () => (window as unknown as { __axisDone: Promise<FrameAudit> }).__axisDone);
}

const cases = ["line", "area", "composed", "scatter", "profit-loss", "category"];
for (const family of cases) for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`${family} ${reducedMotion}: earliest resize frames retain axis identity, hover and data reads`, async ({ page }) => {
    await mkdir(evidence, { recursive: true });
    const intercepted: string[] = [], errors: string[] = [], audits: FrameAudit[] = [];
    page.on("pageerror", error => errors.push(String(error)));
    await attachBefore(page, intercepted);
    await page.emulateMedia({ reducedMotion });
    await page.goto(`/?axis-resize-audit=${runName}#chart-${family}`);
    const category = family === "category";
    if (category) await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("semester");
    const selector = category ? '[data-category-example="semester"]' : `[data-rain-id="chart-${family}"]`;
    const host = page.locator(selector);
    const plot = host.locator(".rain-chart-plot,.rain-category-plot").first();
    await expect(plot.locator("svg").first()).toBeVisible();
    await expect(host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first()).toBeVisible();
    const controls = page.locator(category ? ".rain-category-controls" : "[data-chart-default-controls]");
    const beforeVisual = await host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first().evaluate(node => ({ color: getComputedStyle(node).color, fontSize: getComputedStyle(node).fontSize }));
    try {
      for (const width of [390, 1440]) {
        await beginFrames(page, selector, width);
        await page.setViewportSize({ width, height: 1000 });
        audits.push(await finishFrames(page));
      }
      // The data update remains in progress when the responsive shrink begins.
      await beginFrames(page, selector, 390);
      await controls.getByRole("button", { name: "更新数据", exact: true }).evaluate(button => (button as HTMLButtonElement).click());
      await page.setViewportSize({ width: 390, height: 1000 });
      audits.push(await finishFrames(page));
      const svg = plot.locator("svg").first(); await svg.scrollIntoViewIfNeeded();
      const box = (await svg.boundingBox())!;
      // Initial reveal deliberately disables input; retry the genuine pointer
      // after it becomes interactive, without changing any resize-frame sample.
      await expect(async () => {
        await page.mouse.move(0, 0);
        await page.mouse.move(box.x + 80, box.y + box.height / 2);
        await expect(host.locator(category ? ".rain-category-tooltip" : ".rain-chart-tooltip")).toBeVisible({ timeout: 100 });
      }).toPass({ timeout: 5000, intervals: [50] });
      await page.mouse.move(0, 0);
      await host.screenshot({ path: `${evidence}/${family}-${reducedMotion}-390.png` });
    } finally {
      await writeFile(`${evidence}/${family}-${reducedMotion}.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, beforeVisual, audits }, null, 2));
    }
    expect(errors).toEqual([]);
    if (baseline) expect(intercepted.length).toBeGreaterThan(0);
    for (const audit of audits) {
      expect(audit.samples.filter(sample => sample.reason === "raf")).toHaveLength(8);
      expect(audit.afterIds).toEqual(audit.beforeIds);
      expect(audit.samples.every(sample => sample.documentWidth <= sample.viewport + 1), JSON.stringify(audit.samples.map(sample => ({ reason: sample.reason, elapsed: sample.elapsed, width: sample.documentWidth })))).toBe(true);
      expect(audit.samples.flatMap(sample => sample.ticks).every(tick => tick.color === beforeVisual.color && tick.fontSize === beforeVisual.fontSize)).toBe(true);
    }
  });
}

test("native consumer: same-size data positions animate normally and mounted media changes become immediate", async ({ page }) => {
  await mkdir(evidence, { recursive: true });
  const intercepted: string[] = [], errors: string[] = [];
  const audits: FrameAudit[] = [];
  page.on("pageerror", error => errors.push(String(error)));
  await attachBefore(page, intercepted);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(`/?axis-native-consumer=${runName}`);
  const module = `/@fs${resolve(`${run}/x-axis-consumer.tsx`)}`;
  await page.evaluate(async module => { await import(/* @vite-ignore */ module); }, module);
  const host = page.locator("[data-test-axis-host]");
  await expect(host.getByText("Sep 2", { exact: true })).toBeVisible();
  const position = () => host.getByText("Sep 2", { exact: true }).evaluate(node => getComputedStyle(node.parentElement!).left);
  try {
    await beginFrames(page, "[data-test-axis-host]", null, 40, 650);
    await page.getByRole("button", { name: "Change time domain" }).click();
    const normal = await finishFrames(page); audits.push(normal);
    const normalPositions = normal.samples.filter(sample => sample.reason === "raf").map(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position));
    expect(normalPositions.some(left => left > 170.5 && left < 299.5)).toBe(true);
    expect(Number.parseFloat(await position())).toBeCloseTo(170, 3);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await beginFrames(page, "[data-test-axis-host]", null, 8);
    await page.getByRole("button", { name: "Change time domain" }).click();
    const reduced = await finishFrames(page); audits.push(reduced);
    // The caller keeps animationDuration=1100; the mounted XAxis must react itself.
    expect(reduced.samples.filter(sample => sample.reason === "raf").slice(-4).every(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position) === 300)).toBe(true);
    expect(reduced.samples.flatMap(sample => sample.ticks).every(tick => !tick.transition.startsWith("left"))).toBe(true);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await beginFrames(page, "[data-test-axis-host]", null, 40, 650);
    await page.getByRole("button", { name: "Change time domain" }).click();
    const restored = await finishFrames(page); audits.push(restored);
    expect(restored.samples.some(sample => sample.ticks.some(tick => tick.label === "Sep 2" && Number.parseFloat(tick.position) > 170.5 && Number.parseFloat(tick.position) < 299.5))).toBe(true);
    expect(Number.parseFloat(await position())).toBeCloseTo(170, 3);
  } finally {
    await writeFile(`${evidence}/native-consumer.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, audits }, null, 2));
  }
  expect(errors).toEqual([]);
});
