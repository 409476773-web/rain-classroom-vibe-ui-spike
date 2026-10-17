import { expect, test } from "@playwright/test";

test.use({ timezoneId: "Asia/Shanghai" });

test("calendar precision uses the same local dates and weekdays as the actual cells", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-heatmap");
  const card = page.locator('[data-chart-variant="heatmap-default"]');
  await card.scrollIntoViewIfNeeded();
  await card.getByText("查看精确数据", { exact: true }).click();
  const first = card.locator("tbody tr").first();
  const last = card.locator("tbody tr").last();
  await expect(first.locator("th")).toHaveText("2026-04-01");
  await expect(first).toContainText("周三");
  await expect(last.locator("th")).toHaveText("2026-09-26");
  await expect(last).toContainText("周六");
});

test("horizontal calendar reads a zero after scrolling and retains its scroll while offscreen", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-heatmap");
  const card = page.locator('[data-chart-variant="heatmap-horizontal-scroll"]');
  await card.scrollIntoViewIfNeeded();
  const viewport = card.getByRole("region", { name: "全年活动日历，可横向滚动" });
  await expect(viewport.locator("svg")).toBeVisible();
  await viewport.evaluate(node => { node.scrollLeft = node.scrollWidth - node.clientWidth; });
  const scroll = await viewport.evaluate(node => node.scrollLeft);
  expect(scroll).toBeGreaterThan(0);
  const lastCell = viewport.locator('rect.visx-heatmap-rect:not([pointer-events="none"])').last();
  await lastCell.hover();
  const tooltip = card.locator(".rain-chart-tooltip");
  await expect(tooltip).toContainText("September 26th 2026");
  await expect(tooltip).toContainText("活跃等级 0 / 4");
  const bounds = await viewport.boundingBox();
  const reading = await tooltip.boundingBox();
  expect(reading!.x).toBeGreaterThanOrEqual(bounds!.x - 1);
  expect(reading!.x + reading!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width + 1);
  await card.screenshot({ path: test.info().outputPath("heatmap-scroll-zero-tooltip.png") });
  await page.locator("h1").scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute("data-active", "false");
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute("data-active", "true");
  expect(await viewport.evaluate(node => node.scrollLeft)).toBeCloseTo(scroll, 0);
});

test("world-map zoom and reset preserve the native transform across an offscreen visit", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-choropleth");
  const card = page.locator('[data-chart-variant="choropleth-interactive"]');
  await card.scrollIntoViewIfNeeded();
  const map = card.locator('svg > g[transform^="matrix"]').first();
  await expect(map).toBeVisible();
  const initial = await map.getAttribute("transform");
  await card.getByRole("button", { name: "放大地图", exact: true }).click();
  await expect.poll(() => map.getAttribute("transform")).not.toBe(initial);
  const zoomed = await map.getAttribute("transform");
  await page.locator("h1").scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute("data-active", "false");
  await card.scrollIntoViewIfNeeded();
  await expect(map).toHaveAttribute("transform", zoomed!);
  await card.getByRole("button", { name: "重置地图", exact: true }).click();
  await expect(map).toHaveAttribute("transform", initial!);
  await page.setViewportSize({ width: 390, height: 1000 });
  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await card.screenshot({ path: test.info().outputPath("choropleth-zoom-reset-390.png") });
});

test("sunburst current-level legend and drill path persist, then return to the root", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-sunburst");
  const card = page.locator('[data-chart-variant="sunburst-legend"]');
  await card.scrollIntoViewIfNeeded();
  const legend = card.getByRole("group", { name: "当前层级图例" });
  await legend.getByRole("button", { name: /基础课程/ }).click();
  await expect(legend.getByRole("button", { name: /视频/ })).toBeVisible();
  await expect(legend.getByRole("button", { name: /进阶课程/ })).toHaveCount(0);
  await card.getByText("查看本卡代码", { exact: true }).click();
  const focusSource = decodeURIComponent((await card.getByRole("link", { name: "下载 main.tsx", exact: true }).getAttribute("href"))!.split(",").slice(1).join(","));
  expect(focusSource).toContain('"focusId":');
  expect(focusSource).toContain("基础课程");
  await page.locator("h1").scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute("data-active", "false");
  await card.scrollIntoViewIfNeeded();
  await expect(legend.getByRole("button", { name: /视频/ })).toBeVisible();
  await card.getByRole("link", { name: "返回学习内容", exact: true }).click();
  await expect(legend.getByRole("button", { name: /进阶课程/ })).toBeVisible();
});

test("loading stops its animated label offscreen and in reduced motion while preserving the ready choice", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#chart-heatmap");
  const card = page.locator('[data-chart-variant="heatmap-loading"]');
  await card.scrollIntoViewIfNeeded();
  await expect(card.getByRole("button", { name: "显示数据", exact: true })).toBeVisible();
  await expect(card.locator('[role="status"] span[aria-hidden]')).not.toHaveCount(0);
  await page.locator("h1").scrollIntoViewIfNeeded();
  await expect(card).toHaveAttribute("data-active", "false");
  await expect(card.locator('[role="status"] span[aria-hidden]')).toHaveCount(0);
  await expect(card.getByRole("status").filter({ hasText: "静态占位" })).toBeVisible();
  await card.scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(card.locator('[role="status"] span[aria-hidden]')).toHaveCount(0);
  await card.getByRole("button", { name: "显示数据", exact: true }).click();
  await expect(card.getByRole("button", { name: "开始加载", exact: true })).toBeVisible();
  await card.getByText("查看本卡代码", { exact: true }).click();
  const loadingSource = decodeURIComponent((await card.getByRole("link", { name: "下载 main.tsx", exact: true }).getAttribute("href"))!.split(",").slice(1).join(","));
  expect(loadingSource).toContain('"loading":false');
  await page.locator("h1").scrollIntoViewIfNeeded();
  await card.scrollIntoViewIfNeeded();
  await expect(card.getByRole("button", { name: "开始加载", exact: true })).toBeVisible();
});
