import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { test, expect, type Locator, type Page } from "@playwright/test";

test.use({ video: "on" });

const EVIDENCE = process.env.RAIN_CHART_TREND_EVIDENCE_DIR ?? evidenceOutputPath("evidence/runtime/chart-trend-motion");

async function openTrend(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/chart-validation.html");
  const sample = page.locator('[aria-labelledby="trend-sample-title"]');
  const chart = sample.locator("[data-chart-ready]").first();
  await expect(chart).toHaveAttribute("data-chart-ready", "true");
  await expect.poll(async () => Number(await chart.getAttribute("data-render-count"))).toBeGreaterThan(0);
  const overlay = sample.getByTestId("trend-interaction");
  // This assertion is the RED boundary on the unmodified v0.4 page.
  await expect(overlay).toBeVisible();
  await expect(overlay).toHaveAttribute("role", "group");
  await expect(overlay).toHaveAttribute("aria-label", "趋势图交互区");
  await expect(overlay).toHaveAttribute("tabindex", "0");
  return {
    sample, chart, overlay, errors,
    tooltip: sample.getByRole("tooltip"),
    readout: sample.getByTestId("trend-readout"),
    date: sample.getByTestId("trend-date-pill"),
    week: (index: number) => overlay.locator(`[data-week-index="${index}"]`),
  };
}

async function expectReading(target: Locator, current: number | "缺测", previous: number) {
  await expect(target).toContainText(new RegExp(`本期[\\s：:]*${current}(?:\\D|$)`));
  await expect(target).toContainText(new RegExp(`上期[\\s：:]*${previous}(?:\\D|$)`));
}

async function centerX(target: Locator) {
  const bounds = await target.boundingBox();
  expect(bounds).not.toBeNull();
  return bounds!.x + bounds!.width / 2;
}

async function twoFrames(page: Page) {
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}

async function expectPanelSettled(page: Page, tooltip: Locator) {
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveCSS("opacity", "1");
  await expect.poll(async () => {
    const before = await tooltip.boundingBox();
    await twoFrames(page);
    const after = await tooltip.boundingBox();
    if (!before || !after) return Infinity;
    return Math.abs(before.x - after.x) + Math.abs(before.y - after.y);
  }).toBeLessThan(0.5);
}

async function expectNewRender(chart: Locator, previous: number) {
  await expect.poll(async () => Number(await chart.getAttribute("data-render-count"))).toBeGreaterThan(previous);
  await expect(chart).toHaveAttribute("data-chart-ready", "true");
}

test("trend motion: hover keeps guide, markers, date and exact readings on the same week", async ({ page }) => {
  const { sample, chart, overlay, tooltip, readout, date, week, errors } = await openTrend(page);
  await expect(overlay).toHaveAttribute("data-motion", "spring");
  await expect(tooltip).toBeHidden();
  const rendersBeforeHover = await chart.getAttribute("data-render-count");
  // Several real pointer moves are retained in the video for motion review.
  for (const index of [2, 5, 10, 5]) {
    await week(index).hover();
    await expect(overlay).toHaveAttribute("data-active-week", String(index));
    await expectPanelSettled(page, tooltip);
  }
  await expectReading(tooltip, 82, 64);
  await expectReading(readout, 82, 64);
  await expect(date).toContainText("第6周");
  const expectedX = await centerX(week(5));
  for (const target of [
    sample.getByTestId("trend-crosshair"),
    sample.locator('[data-testid="trend-marker"][data-series="本期"]'),
    sample.locator('[data-testid="trend-marker"][data-series="上期"]'),
    date,
  ]) {
    await expect(target).toBeVisible();
    expect(Math.abs(await centerX(target) - expectedX)).toBeLessThanOrEqual(2.5);
  }
  await expect(chart).toHaveAttribute("data-render-count", rendersBeforeHover!);
  await sample.screenshot({ path: `${EVIDENCE}/hover.png` });
  await page.getByRole("heading", { name: "Rain 图表实验室", exact: true }).hover();
  await expect(tooltip).toBeHidden();
  await expect(chart).toHaveAttribute("data-render-count", rendersBeforeHover!);
  expect(errors).toEqual([]);
});

test("trend motion: a pinned week survives pointer moves and data updates until released", async ({ page }) => {
  const { sample, chart, overlay, tooltip, readout, week, errors } = await openTrend(page);
  await week(5).click();
  await expect(overlay).toHaveAttribute("data-pinned", "true");
  await week(9).hover();
  await expect(overlay).toHaveAttribute("data-active-week", "5");
  await expectReading(tooltip, 82, 64);
  const before = Number(await chart.getAttribute("data-render-count"));
  await page.getByRole("button", { name: "更新样本数据", exact: true }).click();
  await expectNewRender(chart, before);
  await expect(overlay).toHaveAttribute("data-pinned", "true");
  await expect(overlay).toHaveAttribute("data-active-week", "5");
  await expectReading(tooltip, 89, 64);
  await expectReading(readout, 89, 64);
  await expectPanelSettled(page, tooltip);
  await sample.screenshot({ path: `${EVIDENCE}/pinned-updated.png` });
  await week(9).click();
  await expect(overlay).toHaveAttribute("data-active-week", "9");
  await expect(overlay).toHaveAttribute("data-pinned", "true");
  await overlay.focus();
  await overlay.press("Escape");
  await expect(overlay).toHaveAttribute("data-pinned", "false");
  await week(5).click();
  const canvas = await sample.locator("canvas").boundingBox();
  expect(canvas).not.toBeNull();
  // The top-left Canvas margin is outside the plot's week hit targets.
  await page.mouse.click(canvas!.x + 4, canvas!.y + 4);
  await expect(overlay).toHaveAttribute("data-pinned", "false");
  expect(errors).toEqual([]);
});

test("trend motion: keyboard reading and pinning are equivalent to pointer selection", async ({ page }) => {
  const { overlay, tooltip, readout, errors } = await openTrend(page);
  await overlay.focus();
  await overlay.press("Home");
  await expect(overlay).toHaveAttribute("data-active-week", "0");
  await expectReading(tooltip, 42, 35);
  await overlay.press("ArrowRight");
  await expect(overlay).toHaveAttribute("data-active-week", "1");
  await expectReading(readout, 56, 46);
  await overlay.press("End");
  await expect(overlay).toHaveAttribute("data-active-week", "11");
  await expectReading(tooltip, 106, 88);
  await overlay.press("ArrowLeft");
  await expect(overlay).toHaveAttribute("data-active-week", "10");
  await overlay.press("Enter");
  await expect(overlay).toHaveAttribute("data-pinned", "true");
  await overlay.press("Escape");
  await expect(overlay).toHaveAttribute("data-pinned", "false");
  await overlay.press("Home");
  await overlay.press("Space");
  await expect(overlay).toHaveAttribute("data-pinned", "true");
  await expect(overlay).toHaveAttribute("data-active-week", "0");
  expect(errors).toEqual([]);
});

test("trend motion: legend visibility updates pinned readings and keeps one series visible", async ({ page }) => {
  const { sample, chart, overlay, tooltip, readout, week, errors } = await openTrend(page);
  await week(5).click();
  const beforeUpdate = Number(await chart.getAttribute("data-render-count"));
  await page.getByRole("button", { name: "更新样本数据", exact: true }).click();
  await expectNewRender(chart, beforeUpdate);
  await expectReading(tooltip, 89, 64);
  const current = sample.getByRole("button", { name: "本期", exact: true });
  const previous = sample.getByRole("button", { name: "上期", exact: true });
  const lines = sample.locator(".trend-guides > g[clip-path] > path");
  const areas = sample.locator(".trend-materials > g[mask] path");
  const currentColor = await sample.locator('[data-testid="trend-marker"][data-series="本期"] circle').first().getAttribute("stroke");
  await expect(lines).toHaveCount(3);
  await expect(areas).toHaveCount(3);
  await expect(current).toHaveAttribute("aria-pressed", "true");
  await expect(previous).toHaveAttribute("aria-pressed", "true");
  const before = Number(await chart.getAttribute("data-render-count"));
  await previous.click();
  await expectNewRender(chart, before);
  await expect(previous).toHaveAttribute("aria-pressed", "false");
  // Current has two continuous segments separated by a real missing week.
  // Removed native nodes must not leave copied highlights or material behind.
  await expect(lines).toHaveCount(2);
  await expect(areas).toHaveCount(2);
  expect(await lines.evaluateAll(paths => paths.map(path => path.getAttribute("stroke")))).toEqual([currentColor, currentColor]);
  expect(await areas.evaluateAll(paths => paths.map(path => {
    const fill = path.getAttribute("fill") ?? "";
    const gradientId = /^url\(#(.+)\)$/.exec(fill)?.[1];
    return gradientId ? document.getElementById(gradientId)?.querySelector("stop")?.getAttribute("stop-color") : fill;
  }))).toEqual([currentColor, currentColor]);
  await expect(overlay).toHaveAttribute("data-pinned", "true");
  await expect(overlay).toHaveAttribute("data-active-week", "5");
  await expect(tooltip).toContainText(/本期[\s：:]*89/);
  await expect(tooltip).not.toContainText("上期");
  await expect(readout).not.toContainText("上期");
  await expect(sample.locator('[data-testid="trend-marker"][data-series="上期"]')).toBeHidden();
  if (await current.isEnabled()) await current.click();
  await expect(current).toHaveAttribute("aria-pressed", "true");
  await expect(tooltip).toContainText(/本期[\s：:]*89/);
  const beforeRestore = Number(await chart.getAttribute("data-render-count"));
  await previous.click();
  await expectNewRender(chart, beforeRestore);
  await expect(previous).toHaveAttribute("aria-pressed", "true");
  await expect(lines).toHaveCount(3);
  await expect(areas).toHaveCount(3);
  await expectReading(tooltip, 89, 64);
  await expectReading(readout, 89, 64);
  await expect(overlay).toHaveAttribute("data-active-week", "5");
  expect(errors).toEqual([]);
});

test("trend motion: reduced motion keeps zero, missing values and edge panels usable at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const { sample, overlay, tooltip, readout, week, errors } = await openTrend(page);
  await expect(overlay).toHaveAttribute("data-motion", "reduced");
  await week(3).hover();
  await expect(overlay).toHaveAttribute("data-active-week", "3");
  await expectReading(tooltip, 0, 47);
  await expectReading(readout, 0, 47);
  await expect(sample.locator('[data-testid="trend-marker"][data-series="本期"]')).toBeVisible();
  await week(7).hover();
  await expect(overlay).toHaveAttribute("data-active-week", "7");
  await expectReading(tooltip, "缺测", 70);
  await expectReading(readout, "缺测", 70);
  await expect(sample.locator('[data-testid="trend-marker"][data-series="本期"]')).toBeHidden();
  await expect(sample.locator('[data-testid="trend-marker"][data-series="上期"]')).toBeVisible();
  for (const index of [0, 11]) {
    await week(index).hover();
    await expect(overlay).toHaveAttribute("data-active-week", String(index));
    const first = await tooltip.boundingBox();
    await twoFrames(page);
    const next = await tooltip.boundingBox();
    const card = await sample.boundingBox();
    expect(first).not.toBeNull();
    expect(next).not.toBeNull();
    expect(card).not.toBeNull();
    expect(Math.abs(next!.x - first!.x) + Math.abs(next!.y - first!.y)).toBeLessThanOrEqual(0.5);
    expect(next!.x).toBeGreaterThanOrEqual(card!.x - 1);
    expect(next!.x + next!.width).toBeLessThanOrEqual(card!.x + card!.width + 1);
    expect(await tooltip.evaluate(node => node.getAnimations({ subtree: true }).filter(animation => animation.playState === "running").length)).toBe(0);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await sample.screenshot({ path: `${EVIDENCE}/narrow-reduced.png` });
  expect(errors).toEqual([]);
});

test("trend motion: a pinned marker stays on the live native curve throughout a data morph", async ({ page }, testInfo) => {
  const { sample, chart, overlay, tooltip, week, errors } = await openTrend(page);
  await expect(overlay).toHaveAttribute("data-motion", "spring");
  await week(5).click();
  // Settle the pinned selection after several updates before measuring the
  // next native morph, instead of relying on its initial pointer spring.
  for (let update = 0; update < 4; update++) {
    const previous = Number(await chart.getAttribute("data-render-count"));
    await page.getByRole("button", { name: "更新样本数据", exact: true }).click();
    await expectNewRender(chart, previous);
  }
  await expectReading(tooltip, 110, 64);
  await expectPanelSettled(page, tooltip);
  await expect(sample.locator(".trend-guides > g[clip-path] > path")).toHaveCount(3);
  const previous = Number(await chart.getAttribute("data-render-count"));
  const sampling = page.evaluate(async () => {
    const root = document.querySelector('[aria-labelledby="trend-sample-title"]')!;
    const versions = new Map<string, number>();
    const pathVersions: { version: number; paths: { d: string; transform: string }[] }[] = [];
    const frames: { elapsedMs: number; visible: boolean; markerX: number | null; markerY: number | null; distancePx: number | null; candidates: number; pathVersion: number }[] = [];
    const started = performance.now();
    return new Promise<{ frames: typeof frames; pathVersions: typeof pathVersions }>(resolve => {
      const sampleFrame = (now: number) => {
        // Query the attached layer anew each frame; never retain exited paths.
        const marker = root.querySelector<SVGGElement>('[data-testid="trend-marker"][data-series="本期"]')!;
        const circle = marker.querySelector<SVGCircleElement>("circle")!;
        const color = circle.getAttribute("stroke");
        const paths = [...root.querySelectorAll<SVGPathElement>(".trend-guides > g[clip-path] > path")]
          .filter(path => path.isConnected && path.getAttribute("stroke") === color && path.getAttribute("d") && path.getTotalLength() > 0 && path.getScreenCTM());
        const pathData = paths.map(path => ({ d: path.getAttribute("d")!, transform: path.getAttribute("transform") ?? "" }));
        const signature = JSON.stringify(pathData);
        if (!versions.has(signature)) {
          versions.set(signature, versions.size);
          pathVersions.push({ version: versions.get(signature)!, paths: pathData });
        }
        const visible = getComputedStyle(marker).visibility === "visible"
          && Number(getComputedStyle(root.querySelector(".trend-guides")!).opacity) > 0.99;
        const matrix = circle.getScreenCTM();
        const center = matrix ? new DOMPoint(circle.cx.baseVal.value, circle.cy.baseVal.value).matrixTransform(matrix) : null;
        let nearest = Infinity;
        if (visible && center) {
          for (const path of paths) {
            const total = path.getTotalLength();
            const ctm = path.getScreenCTM()!;
            const distance = (length: number) => {
              const local = path.getPointAtLength(length);
              const point = new DOMPoint(local.x, local.y).matrixTransform(ctm);
              return Math.hypot(point.x - center.x, point.y - center.y);
            };
            // Measure Euclidean distance independently of the implementation's
            // X-to-Y projection: coarse path sampling, then local refinement.
            const steps = Math.max(1, Math.ceil(total / 6));
            let bestLength = 0; let bestDistance = Infinity;
            for (let step = 0; step <= steps; step++) {
              const length = total * step / steps;
              const candidate = distance(length);
              if (candidate < bestDistance) { bestDistance = candidate; bestLength = length; }
            }
            let low = Math.max(0, bestLength - total / steps);
            let high = Math.min(total, bestLength + total / steps);
            for (let refinement = 0; refinement < 12; refinement++) {
              const left = low + (high - low) / 3;
              const right = high - (high - low) / 3;
              if (distance(left) < distance(right)) high = right; else low = left;
            }
            nearest = Math.min(nearest, distance((low + high) / 2));
          }
        }
        frames.push({
          elapsedMs: Number((now - started).toFixed(2)), visible,
          markerX: center?.x ?? null, markerY: center?.y ?? null,
          distancePx: Number.isFinite(nearest) ? nearest : null,
          candidates: paths.length, pathVersion: versions.get(signature)!,
        });
        if (now - started < 1000) requestAnimationFrame(sampleFrame);
        else resolve({ frames, pathVersions });
      };
      requestAnimationFrame(sampleFrame);
    });
  });
  await page.getByRole("button", { name: "更新样本数据", exact: true }).click();
  const facts = await sampling;
  await expectNewRender(chart, previous);
  const visibleFrames = facts.frames.filter(frame => frame.visible);
  const maximumDistance = Math.max(...visibleFrames.map(frame => frame.distancePx ?? Infinity));
  const movingPaths = new Set(visibleFrames.filter(frame => frame.candidates > 0).map(frame => frame.pathVersion)).size;
  const markerYs = visibleFrames.map(frame => frame.markerY!).filter(value => value !== null);
  const evidence = JSON.stringify({
    scenario: { pinnedWeek: 6, warmupUpdates: 4, before: 110, after: 117, tolerancePx: 1.5 },
    summary: { sampledFrames: facts.frames.length, visibleFrames: visibleFrames.length, pathVersions: movingPaths, maximumDistancePx: Number.isFinite(maximumDistance) ? maximumDistance : null },
    ...facts,
  }, null, 2) + "\n";
  await testInfo.attach("marker-native-morph", { body: evidence, contentType: "application/json" });
  expect(visibleFrames.length).toBeGreaterThanOrEqual(10);
  expect(visibleFrames.length, "the pinned week is present throughout this update").toBe(facts.frames.length);
  expect(movingPaths).toBeGreaterThan(2);
  expect(Math.max(...markerYs) - Math.min(...markerYs)).toBeGreaterThan(1);
  expect(maximumDistance).toBeLessThanOrEqual(1.5);
  await expect(overlay).toHaveAttribute("data-pinned", "true");
  await expect(overlay).toHaveAttribute("data-active-week", "5");
  await expectReading(tooltip, 117, 64);
  expect(errors).toEqual([]);
});
