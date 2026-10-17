import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

async function plotRenderCounts(page: Page) {
  return page.locator(".chart-body[data-render-count]").evaluateAll(nodes => nodes.map(node => Number((node as HTMLElement).dataset.renderCount)));
}

async function expectNewPlotRenders(page: Page, previous: number[]) {
  await expect.poll(async () => (await plotRenderCounts(page)).every((count, index) => count > previous[index]!)).toBe(true);
  await expect(page.locator('[data-chart-ready="true"]')).toHaveCount(7);
}

test("renders actual charts and keeps exact readings available", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/chart-validation.html");
  await expect(page.getByRole("heading", { name: "Rain 图表实验室", exact: true })).toBeVisible();
  await expect(page.locator('[data-chart-ready="true"]')).toHaveCount(7);
  await expect(page.locator('[data-chart-error]')).toHaveCount(0);
  await expect(page.locator("canvas")).toHaveCount(7);
  const painted = await page.locator("canvas").evaluateAll(canvases => canvases.map(canvas => {
    const node = canvas as HTMLCanvasElement;
    const pixels = node.getContext("2d")!.getImageData(0, 0, node.width, node.height).data;
    let visible = 0;
    for (let index = 3; index < pixels.length; index += 4) if (pixels[index]! > 20) visible++;
    return visible;
  }));
  expect(painted.every(count => count > 100)).toBe(true);
  await page.screenshot({ path: "evidence/runtime/chart-library-validation/overview.png" });
  await page.screenshot({ path: "evidence/runtime/chart-library-validation/full-page.png", fullPage: true });
  await page.locator(".combination-sample").screenshot({ path: "evidence/runtime/chart-library-validation/combination.png" });
  for (const sample of ["matrix", "sankey", "network"]) {
    await page.locator(`[aria-labelledby="${sample}-sample-title"]`).screenshot({ path: `evidence/runtime/chart-library-validation/${sample}.png` });
  }
  await page.getByRole("button", { name: "查看精确数据" }).first().click();
  await expect(page.getByRole("table").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("updates appearance and data without losing selected readings", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/chart-validation.html");
  await expect(page.locator('[data-chart-ready="true"]')).toHaveCount(7);
  await page.getByLabel("趋势读数").selectOption("5");
  const before = await page.locator('[data-testid="trend-readout"]').textContent();
  const firstRenders = await plotRenderCounts(page);
  const canvasBefore = await page.locator("canvas").first().evaluate(canvas => (canvas as HTMLCanvasElement).toDataURL());
  await page.getByRole("button", { name: "实色" , exact: true }).click();
  await expectNewPlotRenders(page, firstRenders);
  await expect(page.locator('[data-testid="trend-readout"]')).toHaveText(before!);
  const nextRenders = await plotRenderCounts(page);
  await page.getByRole("button", { name: "更新样本数据" }).click();
  await expectNewPlotRenders(page, nextRenders);
  await expect(page.locator('[data-testid="trend-readout"]')).not.toHaveText(before!);
  expect(await page.locator("canvas").first().evaluate(canvas => (canvas as HTMLCanvasElement).toDataURL())).not.toBe(canvasBefore);
  await expect(page.locator('[data-chart-error]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("preserves zero and missing and remains usable on a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/chart-validation.html");
  await expect(page.locator('[data-chart-ready="true"]')).toHaveCount(7);
  await page.getByLabel("趋势读数").selectOption("3");
  await expect(page.locator('[data-testid="trend-readout"]')).toContainText("0");
  await page.getByLabel("趋势读数").selectOption("7");
  await expect(page.locator('[data-testid="trend-readout"]')).toContainText("缺测");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole("button", { name: "12 × 12" , exact: true }).click();
  await expect(page.locator('[data-chart-error]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: "evidence/runtime/chart-library-validation/mobile-dense.png" });
  await page.screenshot({ path: "evidence/runtime/chart-library-validation/mobile-full.png", fullPage: true });
});

test("keeps chart range, axis readings and relation selection coherent across updates", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/chart-validation.html");
  await expect(page.locator('[data-chart-ready="true"]')).toHaveCount(7);
  await page.getByRole("button", { name: "后 6 周", exact: true }).click();
  await expect(page.getByTestId("combination-range")).toContainText("共 6 周");
  await expect(page.getByLabel("组合读数").locator("option")).toHaveCount(6);
  await page.getByLabel("追踪路径", { exact: true }).selectOption("source-2>target-2");
  await page.getByLabel("聚焦节点", { exact: true }).selectOption("method");
  const rawInstances = await page.locator(".g2-chart").evaluateAll(nodes => nodes.map(node => (node as HTMLElement).dataset.chartInstance));
  const beforePalette = await plotRenderCounts(page);
  await page.getByRole("button", { name: "多类别色", exact: true }).click();
  await expectNewPlotRenders(page, beforePalette);
  const beforeData = await plotRenderCounts(page);
  await page.getByRole("button", { name: "更新样本数据", exact: true }).click();
  await expectNewPlotRenders(page, beforeData);
  await expect(page.getByLabel("追踪路径", { exact: true })).toHaveValue("source-2>target-2");
  await expect(page.getByLabel("聚焦节点", { exact: true })).toHaveValue("method");
  await expect(page.getByTestId("sankey-readout")).toContainText("20 人次");
  await expect(page.getByTestId("combination-range")).toContainText("共 6 周");
  await expect(page.getByTestId("combination-readout")).toContainText("完成 269 人");
  await expect(page.locator('[data-chart-ready="true"]')).toHaveCount(7);
  expect(await page.locator(".g2-chart").evaluateAll(nodes => nodes.map(node => (node as HTMLElement).dataset.chartInstance))).toEqual(rawInstances);
  await page.locator(".combination-sample").screenshot({ path: "evidence/runtime/chart-library-validation/combination-updated.png" });
  await page.getByRole("button", { name: "气泡矩阵", exact: true }).click();
  await expect(page.locator('[data-chart-ready="true"]')).toHaveCount(7);
  await expect(page.locator('[data-chart-error]')).toHaveCount(0);
  expect(errors).toEqual([]);
  await page.locator('[aria-labelledby="matrix-sample-title"]').screenshot({ path: "evidence/runtime/chart-library-validation/bubble.png" });
});
