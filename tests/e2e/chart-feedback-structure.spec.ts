import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
const evidence = process.env.RAIN_CHART_EXPERIENCE_EVIDENCE_DIR ? `${process.env.RAIN_CHART_EXPERIENCE_EVIDENCE_DIR}/structure` : evidenceOutputPath("evidence/runtime/chart-variants/feedback-2026-10-08/structure");
test.beforeAll(() => mkdirSync(evidence, { recursive: true }));
test.beforeEach(async ({ page }) => { await page.emulateMedia({ reducedMotion: "reduce" }); });

for (const width of [1280, 880, 390]) test(`calendar month, quarter and weekday labels occupy separate aligned tracks at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 796 });
  await page.goto("/#chart-heatmap");
  const card = page.locator('[data-chart-variant="heatmap-contributions"]');
  await card.scrollIntoViewIfNeeded();
  const root = card.locator('[data-slot="chart-root"]');
  const month = root.getByText("Oct", { exact: true });
  const quarter = root.getByText("Q4", { exact: true });
  await expect(month).toBeVisible(); await expect(quarter).toBeVisible();
  const monthBox = (await month.boundingBox())!, quarterBox = (await quarter.boundingBox())!;
  expect(quarterBox.y).toBeGreaterThanOrEqual(monthBox.y + monthBox.height + 2);
  const labels = await root.locator("span").evaluateAll(nodes => nodes.filter(node => /^(M|W|F)$/.test(node.textContent ?? "")).map(node => { const r = node.getBoundingClientRect(); return { top: r.top, bottom: r.bottom }; }).sort((a, b) => a.top - b.top));
  expect(labels).toHaveLength(3);
  for (let index = 1; index < labels.length; index++) expect(labels[index]!.top).toBeGreaterThanOrEqual(labels[index - 1]!.bottom);
  const months = await root.locator("span").evaluateAll(nodes => nodes.filter(node => /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/.test(node.textContent ?? "")).map(node => { const r = node.getBoundingClientRect(); return { left: r.left, right: r.right }; }).sort((a, b) => a.left - b.left));
  expect(months).toHaveLength(12);
  for (let index = 1; index < months.length; index++) expect(months[index]!.left).toBeGreaterThanOrEqual(months[index - 1]!.right);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  await card.screenshot({ path: `${evidence}/calendar-contributions-${width}.png` });
  const example = page.locator("main.component-doc > section.component-doc__example").first();
  await example.scrollIntoViewIfNeeded();
  await expect(example.locator('[data-rain-id="ui-chart-heatmap"] svg')).toBeVisible();
  await example.screenshot({ path: `${evidence}/calendar-default-${width}.png` });
});

for (const width of [1280, 880, 390]) test(`the default geographic example renders actual world outlines at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 796 });
  await page.goto("/#chart-choropleth");
  const example = page.locator("main.component-doc > section.component-doc__example").first();
  await expect(example.locator("svg path")).toHaveCount(177);
  await expect(example).toContainText("Natural Earth");
  const map = example.locator('[data-rain-id="ui-chart-choropleth"]');
  const box = (await map.boundingBox())!;
  expect(Math.abs(box.width / box.height - 16 / 9)).toBeLessThan(.02);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  await example.screenshot({ path: `${evidence}/world-default-${width}.png` });
});

for (const width of [1280, 880, 390]) test(`sunburst starts with a title and uses the existing Breadcrumb after drill at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 796 });
  await page.goto("/#chart-sunburst");
  const card = page.locator('[data-chart-variant="sunburst-legend"]');
  await card.scrollIntoViewIfNeeded();
  const title = card.getByRole("heading", { name: "学习内容", exact: true });
  await expect(title).toBeVisible();
  expect(await title.evaluate(node => getComputedStyle(node).fontSize)).toBe("15px");
  const legend = card.getByRole("group", { name: "当前层级图例" });
  await legend.getByRole("button", { name: /基础课程/ }).click();
  const breadcrumb = card.locator('[data-rain-id="ui-breadcrumb"]');
  await expect(breadcrumb).toBeVisible();
  await expect(card.getByRole("navigation", { name: "学习内容层级" })).toHaveCount(1);
  await expect(breadcrumb.locator("nav")).toHaveCount(0);
  await expect(breadcrumb.getByText("基础课程", { exact: true })).toHaveAttribute("aria-current", "page");
  await card.screenshot({ path: `${evidence}/sunburst-breadcrumb-${width}.png` });
  await breadcrumb.getByRole("link", { name: "返回学习内容" }).click();
  await expect(title).toBeVisible(); await expect(legend).toContainText("进阶课程");
  await card.screenshot({ path: `${evidence}/sunburst-root-title-${width}.png` });
  const example = page.locator("main.component-doc > section.component-doc__example").first();
  await example.scrollIntoViewIfNeeded();
  await expect(example.getByRole("heading", { name: "学习内容", exact: true })).toBeVisible();
  await example.screenshot({ path: `${evidence}/sunburst-default-title-${width}.png` });
});
