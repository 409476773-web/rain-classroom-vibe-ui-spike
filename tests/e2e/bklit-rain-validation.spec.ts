import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence = process.env.RAIN_BKLIT_EVIDENCE_DIR ?? evidenceOutputPath("evidence/runtime/bklit-rain-validation");

test("four real Bklit pairs render without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/bklit-validation.html");
  await expect(page.getByRole("heading", { name: "Bklit × Rain", exact: true })).toBeVisible();
  for (const sample of ["area", "composed", "sankey", "mini"]) {
    for (const theme of ["native", "rain"]) {
      const panel = page.locator(`[data-sample="${sample}"][data-theme="${theme}"]`);
      await expect(panel.locator("svg").first()).toBeVisible();
      expect(await panel.locator("svg path[d]").count()).toBeGreaterThan(0);
      if (sample !== "sankey") await expect(panel.locator('svg > g[style]').first()).toHaveCSS("cursor", "crosshair");
    }
  }
  expect(errors).toEqual([]);
  await mkdir(evidence, { recursive: true });
  await page.screenshot({ path: `${evidence}/desktop.png`, fullPage: true });
});

test("both themes read the same points and update without replaying entry", async ({ page }) => {
  await page.goto("/bklit-validation.html");
  const texts: string[] = [];
  for (const theme of ["native", "rain"]) {
    const panel = page.locator(`[data-sample="area"][data-theme="${theme}"]`);
    const svg = panel.locator("svg").first();
    await expect(panel.locator('svg > g[style]').first()).toHaveCSS("cursor", "crosshair");
    await svg.hover({ position: { x: 260, y: 140 } });
    await expect(panel.locator(".sample-tooltip")).toContainText("参与人数");
    texts.push(await panel.locator(".sample-tooltip").innerText());
  }
  expect(texts[0]).toEqual(texts[1]);
  const chart = page.locator('[data-sample="area"][data-theme="rain"]');
  const clip = chart.locator('clipPath[id^="chart-area-grow"]');
  const clipId = await clip.getAttribute("id");
  const series = chart.locator('path[fill="transparent"][stroke="var(--chart-1)"]').first();
  const before = await series.getAttribute("d");
  const initialMetric = await page.locator('[data-theme="rain"] .bklit-metric strong').innerText();
  await page.getByRole("button", { name: "更新数据" }).click();
  await expect(page.getByRole("status")).toContainText("更新后");
  await expect.poll(() => series.getAttribute("d")).not.toBe(before);
  await expect(clip).toHaveAttribute("id", clipId!);
  await expect(page.locator('[data-theme="rain"] .bklit-metric strong')).not.toHaveText(initialMetric);
  expect(await page.locator('.bklit-metric strong').allTextContents()).toEqual([
    await page.locator('[data-theme="rain"] .bklit-metric strong').innerText(),
    await page.locator('[data-theme="rain"] .bklit-metric strong').innerText(),
  ]);
  await page.getByRole("combobox", { name: "Rain 配色" }).selectOption("wide");
  const color = await series.evaluate(el => getComputedStyle(el).stroke);
  expect(color).toBe("rgb(35, 110, 255)");
  await page.locator('#composed').scrollIntoViewIfNeeded();
  await page.locator('#composed [data-theme="rain"] svg').first().hover({ position: { x: 260, y: 150 } });
  await expect(page.locator('#composed [data-theme="rain"] .sample-tooltip')).toContainText("完成率");
  await expect(page.locator('#composed [data-theme="rain"] .sample-tooltip')).toHaveCSS("opacity", "1");
  await page.locator("#composed").screenshot({ path: `${evidence}/composed-hover.png` });
  await page.locator("#area summary").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#area table")).toBeVisible();
  await expect(page.locator("#area tbody tr")).toHaveCount(30);
});

test("Sankey focus and mini tooltip retain exact data", async ({ page }) => {
  await page.goto("/bklit-validation.html");
  const flow = page.locator('[data-sample="sankey"][data-theme="rain"]');
  await page.locator('#sankey').scrollIntoViewIfNeeded();
  await flow.locator('.sankey-nodes rect').first().hover();
  await expect(flow.locator('.sample-tooltip')).toContainText("课程入口");
  await expect(flow.locator('.sample-tooltip')).toContainText("400");
  await expect(flow.locator('.sample-tooltip')).toHaveCSS("opacity", "1");
  await page.locator("#sankey").screenshot({ path: `${evidence}/sankey-hover.png` });
  const mini = page.locator('[data-sample="mini"][data-theme="rain"]');
  await page.locator('#mini').scrollIntoViewIfNeeded();
  const box = await mini.locator('.bklit-mini-plot').boundingBox();
  expect(box?.width).toBe(96); expect(box?.height).toBe(40);
  await mini.locator('svg').first().hover({ position: { x: 75, y: 20 } });
  await expect(mini.locator('.sample-tooltip')).toContainText("参与人数");
  await expect(mini.locator('.sample-tooltip')).toHaveCSS("opacity", "1");
  await page.locator("#mini").screenshot({ path: `${evidence}/mini-hover.png` });
});

test("native entry actually reveals progressively and replays", async ({ page }) => {
  await page.goto("/bklit-validation.html");
  const chart = page.locator('[data-sample="area"][data-theme="rain"]');
  await expect(chart.locator('svg > g[style]').first()).toHaveCSS("cursor", "crosshair");
  const clip = chart.locator('clipPath[id^="chart-area-grow"] rect');
  const width = async () => Number.parseFloat((await clip.getAttribute("width"))!);
  const fullWidth = await width();
  await page.getByRole("button", { name: "重播入场" }).click();
  await expect.poll(width, { intervals: [30] }).toBeLessThan(fullWidth / 2);
  await expect.poll(width, { intervals: [30] }).toBeGreaterThan(fullWidth * .2);
  const partialWidth = await width();
  expect(partialWidth).toBeLessThan(fullWidth);
  await expect.poll(width).toBeCloseTo(fullWidth, 0);
  await writeFile(`${evidence}/motion-facts.json`, JSON.stringify({ fullWidth, partialWidth, replayObserved: true }, null, 2));
});

test("narrow layout and reduced motion preserve readable data", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/bklit-validation.html");
  await expect(page.getByRole("status")).toContainText("已跟随系统减少动效");
  for (const sample of ["area", "composed", "sankey", "mini"]) {
    await expect(page.locator(`[data-sample="${sample}"][data-theme="rain"] svg`).first()).toBeVisible();
  }
  const size = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: innerWidth }));
  expect(size.content).toBeLessThanOrEqual(size.viewport);
  await page.screenshot({ path: `${evidence}/narrow-reduced.png`, fullPage: true });
  await writeFile(`${evidence}/browser-facts.json`, JSON.stringify({ narrow: size, reducedMotion: true }, null, 2));
});

test("paired gradients resolve inside their own chart", async ({ page }) => {
  await page.goto("/bklit-validation.html");
  await expect(page.locator('[data-sample="sankey"] linearGradient').first()).toBeAttached();
  const ids = await page.locator("svg [id]").evaluateAll(nodes => nodes.map(n => n.id));
  expect(new Set(ids).size).toBe(ids.length);
  await expect(page.getByRole("button", { name: "重播入场" })).toHaveCSS("height", "32px");
});
