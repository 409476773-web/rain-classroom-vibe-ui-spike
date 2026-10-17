import { test, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { CHART_ENTRIES } from "../../apps/playground/src/docs/components/chart-catalog";

const evidence = process.env.RAIN_CHART_PLAYGROUND_EVIDENCE_DIR ?? "evidence/runtime/bklit-rain-catalog/playground";

test("[T09] catalog navigation restores focus after the lazy chart page loads", async ({ page }) => {
  await page.goto("/#components");
  const group = page.getByRole("region", { name: "G4 · 图表与图表基础" });
  await expect(group.getByRole("link")).toHaveCount(CHART_ENTRIES.length + 3);
  await group.getByRole("link", { name: "面积图", exact: true }).click();
  const heading = page.getByRole("heading", { name: "面积图", level: 1 });
  await expect(heading).toBeFocused();
  await page.getByRole("link", { name: "返回组件目录" }).click();
  await expect(group).toBeVisible();
});

test("[T09] all 17 native documentation entries render, read and expose their actual source", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  await mkdir(evidence, { recursive: true });
  const entries=CHART_ENTRIES.filter(entry => entry.origin === "bklit");
  expect(entries).toHaveLength(17);
  for (const entry of entries) {
    await page.goto(`/#chart-${entry.id}`);
    await expect(page.getByRole("heading", { level: 1, name: entry.label })).toBeVisible();
    const chart = page.locator(`[data-rain-id="chart-${entry.id}"]`);
    await expect(chart.locator("svg").first()).toBeVisible();
    await chart.getByText("查看精确数据", { exact: true }).click();
    await expect(chart.locator("tbody tr").first()).toBeVisible();
    await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
    await expect(page.getByRole("link", { name: "下载 chart-examples.tsx", exact: true })).toHaveAttribute("href", /AreaChart|LineChart/);
    await page.getByRole("combobox", { name: "示例源码文件" }).selectOption("chart-data.ts");
    await expect(page.locator('.rain-chart-source[data-source="default"] pre')).toContainText("makeTimeline");
    await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
    await page.screenshot({ path: `${evidence}/${entry.id}.png`, fullPage: true });
  }
  expect(errors).toEqual([]);
  await writeFile(`${evidence}/entry-facts.json`, JSON.stringify({ entries: entries.map(entry => entry.id), errors }, null, 2));
});

test("[T09] recipe source stays current and the narrow chart doc does not overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-bar");
  await page.getByRole("combobox", { name: "视觉配方" }).selectOption("bar-fade");
  await page.getByText("调用配置、完整源码与示例数据", { exact: true }).click();
  await expect(page.locator('.rain-chart-source[data-source="default"] pre')).toContainText('data-recipe="bar-fade"');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.screenshot({ path: `${evidence}/bar-fade-390.png`, fullPage: true });
});

test("[T09] chart styles leave a normal Rain switch unchanged", async ({ page }) => {
  await page.goto("/#switch");
  const control = page.getByRole("switch", { name: "自动发布" });
  await expect(control).toBeVisible();
  const style = () => control.evaluate(node => {
    const css = getComputedStyle(node); return [css.width, css.height, css.fontFamily, css.backgroundColor, css.borderRadius];
  });
  const before = await style();
  await page.evaluate(() => { location.hash = "#chart-area"; });
  await expect(page.getByRole("heading", { level: 1, name: "面积图" })).toBeVisible();
  await page.getByRole("link", { name: "返回组件目录" }).click();
  await page.getByRole("link", { name: "Switch 开关", exact: true }).click();
  await expect(control).toBeVisible();
  expect(await style()).toEqual(before);
});

test("blue-gray monochrome repaints actual bars, areas and stage gradients and restores the previous recipe", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const colors = ["#6288C7", "#3F5D91", "#91B0E1", "#BFD3F2", "#E5EEFC"];
  const facts = [];
  for (const id of ["bar", "area", "funnel"]) {
    await page.goto(`/#chart-${id}`);
    const host = page.locator(`[data-rain-id="chart-${id}"]`);
    const select = page.getByRole("combobox", { name: "视觉配方", exact: true });
    const previousRecipe = await select.inputValue();
    const previousColors = await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()));
    await select.selectOption("monochrome-blue", { timeout: 5000 });
    await expect(host).toHaveAttribute("data-recipe", "monochrome-blue");
    expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()))).toEqual(colors);
    if (id === "bar") {
      expect(await host.locator('g[class^="bar-series-"] rect').evaluateAll(nodes => [...new Set(nodes.map(node => getComputedStyle(node).fill))])).toEqual(["rgb(98, 136, 199)", "rgb(63, 93, 145)", "rgb(145, 176, 225)"]);
      await host.locator(".legend-container button").first().focus();
      await expect(host.locator(".legend-container button").first()).toBeFocused();
    }
    if (id === "area") {
      await expect(host.locator('path[stroke="var(--chart-1)"]').first()).toHaveCSS("stroke", "rgb(98, 136, 199)");
    }
    if (id === "funnel") {
      const stops = await host.locator("linearGradient stop").evaluateAll(nodes => [...new Set(nodes.map(node => getComputedStyle(node).stopColor))]);
      expect(stops).toEqual(expect.arrayContaining(["rgb(63, 93, 145)", "rgb(98, 136, 199)", "rgb(145, 176, 225)", "rgb(191, 211, 242)", "rgb(229, 238, 252)"]));
    }
    await page.locator("[data-chart-default-controls]").getByRole("button", { name: "更新数据", exact: true }).click();
    await expect(page.getByRole("status").filter({ hasText: "已更新 1 次" })).toBeVisible();
    facts.push({ id, colors, updated: true });
    await mkdir(`${evidence}/monochrome`, { recursive: true });
    await page.screenshot({ path: `${evidence}/monochrome/${id}.png`, fullPage: true });
    await select.selectOption(previousRecipe);
    expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-${i + 1}`).trim()))).toEqual(previousColors);
  }
  await writeFile(`${evidence}/monochrome/facts.json`, JSON.stringify(facts, null, 2));
});

test("blue-gray monochrome is available in 15 native catalog entries with ordered intensity, readable sunburst labels and narrow previews", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  const entries = CHART_ENTRIES.filter(entry => entry.origin === "bklit" && entry.recipes.includes("monochrome-blue"));
  expect(entries).toHaveLength(15);
  const palette = ["rgb(98, 136, 199)", "rgb(63, 93, 145)", "rgb(145, 176, 225)", "rgb(191, 211, 242)", "rgb(229, 238, 252)"];
  const facts = [];
  for (const entry of entries) {
    await page.goto(`http://127.0.0.1:5387/bklit-catalog.html#chart-${entry.id}`);
    const host = page.locator(`[data-rain-id="chart-${entry.id}"]`).first();
    await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption({ label: "蓝灰单色" });
    await expect(host.locator("svg").first()).toBeVisible();
    await expect.poll(() => host.locator("svg path, svg rect, svg circle, svg stop").evaluateAll((nodes, colors) => nodes.some(node => [getComputedStyle(node).fill, getComputedStyle(node).stroke, getComputedStyle(node).stopColor].some(color => colors.includes(color))), palette)).toBe(true);
    if (["heatmap", "choropleth"].includes(entry.id)) {
      expect(await host.evaluate(node => Array.from({ length: 5 }, (_, i) => getComputedStyle(node).getPropertyValue(`--chart-scale-0${i + 1}`).trim()))).toEqual(["#E5EEFC", "#BFD3F2", "#91B0E1", "#6288C7", "#3F5D91"]);
    }
    if (entry.id === "sunburst") {
      const labels = host.locator('svg text[style*="font-weight: 600"]');
      await expect(labels.first()).toBeVisible();
      expect(await labels.evaluateAll(nodes => nodes.every(node => getComputedStyle(node).fill === "rgb(20, 35, 70)"))).toBe(true);
    }
    if (["area", "bar", "funnel"].includes(entry.id)) {
      if (entry.id === "funnel") await expect.poll(() => host.locator(".rain-chart-funnel").getByText("进入课程", { exact: true }).evaluate(node => getComputedStyle(node.parentElement!.parentElement!).opacity)).toBe("1");
      await page.getByRole("button", { name: "对照实例", exact: true }).click();
      const gradients = await page.locator("svg linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
      expect(new Set(gradients).size).toBe(gradients.length);
      await page.getByRole("button", { name: "对照实例", exact: true }).click();
      await mkdir(`${evidence}/monochrome`, { recursive: true });
      await page.screenshot({ path: `${evidence}/monochrome/${entry.id}-1440.png`, fullPage: true });
      await page.setViewportSize({ width: 390, height: 900 });
      const beforeResize = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth }));
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      const afterResize = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth }));
      facts.push({ id: entry.id, beforeResize, afterResize });
      await page.screenshot({ path: `${evidence}/monochrome/${entry.id}-390.png`, fullPage: true });
      await page.setViewportSize({ width: 1440, height: 1000 });
    }
    facts.push({ id: entry.id, paletteApplied: true });
  }
  expect(errors).toEqual([]);
  await mkdir(`${evidence}/monochrome`, { recursive: true });
  await writeFile(`${evidence}/monochrome/catalog-facts.json`, JSON.stringify({ palette, entries: facts, errors }, null, 2));
});
