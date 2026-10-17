import { test, expect, type Locator, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { CHART_ENTRIES } from "/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/apps/playground/src/docs/components/chart-catalog";

const evidence = process.env.RAIN_CHART_PLAYGROUND_EVIDENCE_DIR ?? "evidence/runtime/chart-demo-data-expansion-2026-10-11/browser-output/charts-playground.spec";

async function hoverDefaultDate(page: Page, host: Locator, index: number, composed = false) {
  const svg = host.locator(".rain-chart-plot svg").first();
  await svg.scrollIntoViewIfNeeded();
  const box = (await svg.boundingBox())!;
  await page.mouse.move(box.x + 58 + (box.width - 58 - (composed ? 58 : 24)) * index / 23, box.y + box.height / 2);
}

test("[E01] standard missing readings keep dates, real zero and tooltip meanings", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const facts = [];
  for (const id of ["line", "area", "composed"]) {
    await page.goto(`/#chart-${id}`);
    const host = page.locator(`[data-rain-id="chart-${id}"]`);
    await page.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("missing");
    await expect(host.locator(".rain-chart-plot svg").first()).toBeVisible();
    await host.getByText("查看精确数据", { exact: true }).click();
    const rows = host.locator("tbody tr");
    await expect(rows).toHaveCount(24);
    await expect(rows.nth(1)).toContainText("缺测");
    await expect(rows.nth(2).locator("td").first()).toHaveText("0");
    await expect(rows.last()).toContainText("缺测");
    if (id === "composed") await expect(rows.nth(2)).toContainText("不适用");
    await expect(host.locator(".legend-container")).toContainText("缺测");
    const tooltip = host.locator(".rain-chart-tooltip");
    await hoverDefaultDate(page, host, 1, id === "composed");
    await expect(tooltip).toContainText("9月2日");
    await expect(tooltip).toContainText("缺测");
    await expect(tooltip).not.toContainText("null");
    await expect(tooltip).not.toContainText("不适用");
    await hoverDefaultDate(page, host, 2, id === "composed");
    await expect(tooltip).toContainText("9月3日");
    await expect(tooltip).toContainText("0");
    await expect(tooltip).not.toContainText("缺测");
    if (id === "composed") await expect(tooltip).toContainText("不适用");
    expect(await host.locator(".rain-chart-plot path[d]").evaluateAll(paths => paths.some(path => (path.getAttribute("d")?.match(/M/g) ?? []).length > 1))).toBe(true);
    const dates = await rows.locator("th").allTextContents();
    facts.push({ id, dates, tooltipZero: await tooltip.innerText(), finalReading: await rows.last().innerText() });
    await page.mouse.move(0, 0);
    await mkdir(evidence, { recursive: true });
    await host.screenshot({ path: `${evidence}/e01-standard-${id}-missing.png` });
  }
  await writeFile(`${evidence}/e01-standard-facts.json`, JSON.stringify(facts, null, 2));
});

test("[E01] interrupted normal-motion updates preserve missing gaps and reduced motion reaches the terminal reading", async ({ page }) => {
  const facts = [];
  for (const id of ["line", "area", "composed"]) {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`/#chart-${id}`);
    const host = page.locator(`[data-rain-id="chart-${id}"]`);
    const controls = page.locator("[data-chart-default-controls]");
    await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("missing");
    await expect(host.locator(".rain-chart-plot svg").first()).toBeVisible();
    await host.getByText("查看精确数据", { exact: true }).click();
    const dates = await host.locator("tbody th").allTextContents();
    await controls.getByRole("button", { name: "更新数据", exact: true }).click();
    await page.waitForTimeout(80);
    const during = await host.locator(".rain-chart-plot path[d]").evaluateAll(paths => paths.map(path => path.getAttribute("d")));
    expect(during.some(path => (path?.match(/M/g) ?? []).length > 1)).toBe(true);
    expect(during.every(path => !/NaN|Infinity|undefined/.test(path ?? ""))).toBe(true);
    await controls.getByRole("button", { name: "更新数据", exact: true }).click();
    await expect(host.getByRole("status")).toContainText("全部缺测");
    await expect(host.locator("svg")).toHaveCount(0);
    await expect(host.locator("tbody tr")).toHaveCount(24);
    expect(await host.locator("tbody td").allTextContents()).toEqual(Array(24 * (await host.locator("thead th").count() - 1)).fill("缺测"));
    expect(await host.locator("tbody th").allTextContents()).toEqual(dates);
    await controls.getByRole("button", { name: "更新数据", exact: true }).click();
    await expect(host.locator(".rain-chart-plot svg").first()).toBeVisible();
    await expect(host.locator("tbody tr").nth(1)).toContainText("缺测");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.getByRole("status").filter({ hasText: "已按系统设置减少动效" })).toBeVisible();
    await controls.getByRole("button", { name: "更新数据", exact: true }).click();
    const reduced = await host.locator(".rain-chart-plot path[d]").evaluateAll(paths => paths.map(path => path.getAttribute("d")));
    await page.waitForTimeout(100);
    expect(await host.locator(".rain-chart-plot path[d]").evaluateAll(paths => paths.map(path => path.getAttribute("d")))).toEqual(reduced);
    await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("normal");
    await expect(host.locator("svg").first()).toBeVisible();
    expect(await host.locator("tbody td").allTextContents()).not.toContain("缺测");
    await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("zero");
    await expect(host.locator("tbody td").first()).toHaveText("0");
    if (id === "composed") await expect(host.locator("tbody tr").first()).toContainText("不适用");
    await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("single");
    await expect(host.locator("tbody tr")).toHaveCount(1);
    await expect(host.locator("svg").first()).toBeVisible();
    await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("invalid");
    await expect(host).toContainText("已拒绝无效数据");
    await expect(host.locator("svg")).toHaveCount(0);
    facts.push({ id, datesRetained: true, intermediateGaps: true, normalIntermediatePaths: during, allMissingRows: 24, reducedGeometryStable: true, reducedFinalPaths: reduced, normalZeroSingleInvalid: true });
  }
  await mkdir(evidence, { recursive: true });
  await writeFile(`${evidence}/e01-motion-facts.json`, JSON.stringify(facts, null, 2));
});

test("[E01] both mini trend sizes keep their slots and missing latest readings across state changes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await mkdir(evidence, { recursive: true });
  const facts = [];
  for (const id of ["line", "area"]) for (const size of ["compact", "comfortable"]) {
    await page.goto(`/#chart-${id}`);
    const host = page.locator(`[data-rain-id="chart-${id}"]`);
    const controls = page.locator("[data-chart-default-controls]");
    await controls.getByRole("combobox", { name: "尺寸配方", exact: true }).selectOption("mini");
    await controls.getByRole("combobox", { name: "迷你型号", exact: true }).selectOption(size);
    await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("missing");
    const slot = host.locator(".rain-business-mini-slot");
    await expect(slot).toHaveCSS("width", size === "compact" ? "96px" : "128px");
    await expect(slot).toHaveCSS("height", size === "compact" ? "32px" : "48px");
    await expect(host.locator(".rain-chart-metric strong")).toHaveText("缺测");
    await expect(slot.locator("svg").first()).toBeVisible();
    await host.getByText("查看精确数据", { exact: true }).click();
    await expect(host.locator("tbody tr")).toHaveCount(24);
    await expect(host.locator("tbody tr").last()).toContainText("缺测");
    await host.screenshot({ path: `${evidence}/e01-mini-${id}-${size}-missing.png` });
    await controls.getByRole("button", { name: "更新数据", exact: true }).click();
    await controls.getByRole("button", { name: "更新数据", exact: true }).click();
    await expect(host.getByRole("status")).toContainText("全部缺测");
    await expect(slot.locator("svg")).toHaveCount(0);
    await expect(host.locator(".rain-chart-metric strong")).toHaveText("缺测");
    await expect(slot).toHaveCSS("width", size === "compact" ? "96px" : "128px");
    await host.screenshot({ path: `${evidence}/e01-mini-${id}-${size}-all-missing.png` });
    await controls.getByRole("button", { name: "更新数据", exact: true }).click();
    await expect(slot.locator("svg").first()).toBeVisible();
    for (const state of ["zero", "normal", "single"]) {
      await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption(state);
      await expect(slot.locator("svg").first()).toBeVisible();
      await expect(host.locator("tbody tr")).toHaveCount(state === "single" ? 1 : 24);
      if (state === "zero") await expect(host.locator(".rain-chart-metric strong")).toHaveText("0");
      else await expect(host.locator(".rain-chart-metric strong")).not.toHaveText("缺测");
    }
    await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("invalid");
    await expect(host).toContainText("已拒绝无效数据");
    await expect(host.locator("svg")).toHaveCount(0);
    facts.push({ id, size, latestMissing: true, allMissingSlotPreserved: true, states: ["missing", "zero", "normal", "single", "invalid"] });
  }
  await mkdir(evidence, { recursive: true });
  await writeFile(`${evidence}/e01-mini-facts.json`, JSON.stringify(facts, null, 2));
});

test("[E02] standard and both mini bars retain real zeros and explain their reference-only scale", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await mkdir(evidence, { recursive: true });
  for (const size of ["standard", "compact", "comfortable"]) {
    await page.goto("/#chart-bar");
    const host = page.locator('[data-rain-id="chart-bar"]');
    const controls = page.locator("[data-chart-default-controls]");
    if (size !== "standard") {
      await controls.getByRole("combobox", { name: "尺寸配方", exact: true }).selectOption("mini");
      await controls.getByRole("combobox", { name: "迷你型号", exact: true }).selectOption(size);
    }
    await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("zero");
    await expect(host.getByText(/全零.*量程.*1/)).toBeVisible();
    await host.getByText("查看精确数据", { exact: true }).click();
    await expect(host.locator("tbody tr")).toHaveCount(6);
    expect((await host.locator("tbody td").allTextContents()).every(text => text === "0")).toBe(true);
    const bars = host.locator('g[class^="bar-series-"] rect');
    await expect(bars).toHaveCount(size === "standard" ? 18 : 6);
    expect(await bars.evaluateAll(nodes => nodes.every(node => Number(node.getAttribute("height")) === 0))).toBe(true);
    await host.screenshot({ path: `${evidence}/e02-bar-${size}-zero.png` });
    for (const state of ["normal", "single"]) {
      await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption(state);
      await expect(host.getByText(/全零.*量程.*1/)).toHaveCount(0);
      await expect(host.locator("tbody tr")).toHaveCount(state === "single" ? 1 : 6);
      await expect(host.locator("svg").first()).toBeVisible();
    }
    await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("invalid");
    await expect(host).toContainText("已拒绝无效数据");
    await expect(host.locator("svg")).toHaveCount(0);
  }
});

for (const motion of ["no-preference", "reduce"] as const) test(`[E03] sunburst keyboard drill, multilevel return and external focus survive ${motion}`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: motion });
  await mkdir(evidence, { recursive: true });
  await page.goto("/#chart-sunburst");
  const host = page.locator('[data-rain-id="chart-sunburst"]');
  const controls = page.locator("[data-chart-default-controls]");
  const course = host.getByRole("button", { name: "查看基础课程", exact: true });
  await course.focus();
  await course.press("Enter");
  const back = host.getByRole("link", { name: "返回学习内容", exact: true });
  await expect(back).toBeFocused();
  await expect(host.getByRole("group", { name: /当前层级/ })).toContainText("视频");
  await expect(host.getByRole("button", { name: "查看视频", exact: true })).toHaveCount(0);
  for (const label of ["更新数据", "重播动效"]) {
    const update = controls.getByRole("button", { name: label, exact: true });
    await update.focus();
    await update.press("Enter");
    await expect(back).toBeVisible();
    await expect(host.getByText("基础课程", { exact: true })).toHaveAttribute("aria-current", "page");
    await expect(update).toBeFocused();
  }
  await back.focus();
  await back.press("Enter");
  await expect(course).toBeFocused();
  await course.press("Space");
  await expect(back).toBeFocused();
  const state = controls.getByRole("combobox", { name: "示例状态", exact: true });
  await state.focus();
  await state.selectOption("long");
  await expect(state).toBeFocused();
  await expect(host.getByRole("heading", { name: "学习内容", exact: true })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 1000 });
  const longCourse = host.getByRole("button", { name: /查看基础课程/ });
  await host.screenshot({ path: `${evidence}/e03-sunburst-${motion}-390-long-root.png` });
  await longCourse.focus();
  await longCourse.press("Enter");
  const video = host.getByRole("button", { name: "查看视频", exact: true });
  await video.focus();
  await video.press("Space");
  const breadcrumb = host.getByRole("navigation", { name: "学习内容层级" });
  await expect(breadcrumb.getByRole("link")).toHaveCount(2);
  await expect(breadcrumb.getByRole("link").last()).toBeFocused();
  await expect(host.getByRole("group", { name: /当前层级/ }).getByRole("button")).toHaveCount(0);
  await host.screenshot({ path: `${evidence}/e03-sunburst-${motion}-390-long-deep.png` });
  await breadcrumb.getByRole("link").nth(1).focus();
  await breadcrumb.getByRole("link").nth(1).press("Enter");
  await expect(video).toBeFocused();
  await back.focus();
  await back.press("Enter");
  await expect(longCourse).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await longCourse.press("Enter");
  await state.focus();
  await state.selectOption("normal");
  await expect(state).toBeFocused();
  await expect(host.getByRole("heading", { name: "学习内容", exact: true })).toBeVisible();
  await host.getByText("查看精确数据", { exact: true }).click();
  await expect(host.locator("tbody tr")).toHaveCount(9);
  await mkdir(evidence, { recursive: true });
  await host.screenshot({ path: `${evidence}/e03-sunburst-${motion}-390.png` });
  await writeFile(`${evidence}/e03-sunburst-${motion}.json`, JSON.stringify({ motion, enterAndSpace: true, leafNotButton: true, multilevelReturn: true, externalFocusPreserved: true, width: 390 }, null, 2));
});

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
