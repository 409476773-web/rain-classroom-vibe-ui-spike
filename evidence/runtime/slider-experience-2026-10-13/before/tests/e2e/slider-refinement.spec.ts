import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const evidence = fileURLToPath(new URL("../../evidence/runtime/slider-refinement-2026-10-13/browser/", import.meta.url));
mkdirSync(evidence, { recursive: true });
test.beforeEach(async ({ page }) => {
  page.on("pageerror", error => { throw error; });
  await page.goto("/#slider");
  await expect(page.getByRole("heading", { name: "Slider 数值滑块", exact: true })).toBeVisible();
});

test("catalogue, four working forms, copyable examples and the complete page", async ({ page, context }, info) => {
  await page.goto("/#components");
  await page.locator('a[href="#slider"]').click();
  await expect(page.locator("#slider-title")).toBeFocused();
  for (const name of ["单值阈值与精确输入", "双端成绩范围", "连续参数即时反馈", "小数步长与单位"]) {
    await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "复制代码", exact: true }).last().click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("setDraft(next)");
  await page.getByRole("heading", { name: "Slider 数值滑块", exact: true }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: evidence + "/" + info.project.name + "-light-full.png", fullPage: true });
});

test("precise threshold preserves empty and invalid drafts and saves only valid values", async ({ page }, info) => {
  const input = page.getByRole("spinbutton", { name: "精确及格线", exact: true });
  const slider = page.getByRole("slider", { name: "及格线", exact: true });
  await input.fill("");
  await expect(input).toHaveValue(""); await expect(slider).toHaveValue("60");
  await input.fill("150");
  await expect(input).toHaveValue("150"); await expect(slider).toHaveValue("60");
  await expect(page.getByRole("button", { name: "保存及格线" })).toBeDisabled();
  await expect(page.getByText("不能超过 100", { exact: true })).toHaveCount(1);
  await page.locator(".g5-panel").first().screenshot({ path: evidence + "/" + info.project.name + "-threshold-error.png" });
  await input.fill("65"); await expect(slider).toHaveValue("65");
  await page.getByRole("button", { name: "保存及格线" }).click();
  await expect(page.getByRole("status", { name: "及格线保存结果" })).toContainText("65 分");
});

test("decimal drafts, step validation and keyboard changes share the playback scale", async ({ page }) => {
  const input = page.getByRole("spinbutton", { name: "精确播放速度", exact: true });
  const slider = page.getByRole("slider", { name: "播放速度", exact: true });
  await input.fill("1."); await expect(input).toHaveValue("1.");
  await input.fill("1.23");
  await expect(input).toHaveValue("1.23"); await expect(slider).toHaveValue("1");
  await expect(page.getByText("请按 0.05 的步长调整", { exact: true })).toBeVisible();
  await input.fill("1.30"); await expect(input).toHaveValue("1.30"); await expect(slider).toHaveValue("1.3");
  await slider.press("ArrowRight"); await expect(slider).toHaveValue("1.35");
  await expect(page.getByRole("tooltip")).toContainText("1.35 倍");
  await slider.press("End"); await expect(slider).toHaveValue("2");
  await slider.press("Home"); await expect(slider).toHaveValue("0.5");
});

test("endpoint conflicts stay editable and precise input completes one filter operation", async ({ page }, info) => {
  const lower = page.getByRole("spinbutton", { name: "成绩下限", exact: true });
  const upper = page.getByRole("spinbutton", { name: "成绩上限", exact: true });
  const result = page.getByRole("status", { name: "成绩筛选结果" });
  await lower.fill("95"); await expect(lower).toHaveValue("95");
  await expect(page.getByRole("slider", { name: "成绩下限滑钮", exact: true })).toHaveValue("40");
  await expect(upper).toHaveValue("90");
  await expect(page.getByText("下限不能高于上限", { exact: true })).toHaveCount(1);
  await expect(result).toContainText("40–90 分");
  await lower.fill("60"); await expect(result).toContainText("40–90 分");
  await lower.press("Enter"); await expect(result).toContainText("60–90 分");
  await page.getByRole("button", { name: "加载相等范围", exact: true }).click();
  await expect(lower).toHaveValue("60"); await expect(upper).toHaveValue("60");
  await page.locator(".g5-panel").nth(1).screenshot({ path: evidence + "/" + info.project.name + "-equal.png" });
});

test("range identity, dynamic bounds, focus and a single value tip survive equality", async ({ page }) => {
  const low = page.getByRole("slider", { name: "成绩下限滑钮", exact: true });
  const high = page.getByRole("slider", { name: "成绩上限滑钮", exact: true });
  await low.press("End");
  await expect(low).toHaveValue("90"); await expect(high).toHaveValue("90");
  await expect(low).toHaveAttribute("aria-valuemax", "90"); await expect(high).toHaveAttribute("aria-valuemin", "90");
  await expect(page.getByRole("tooltip")).toHaveCount(1);
  await expect(page.getByRole("tooltip")).toContainText("成绩下限滑钮 90 分");
  await page.keyboard.press("Tab"); await expect(high).toBeFocused();
  await expect(page.getByRole("tooltip")).toHaveCount(1);
  await expect(page.getByRole("tooltip")).toContainText("成绩上限滑钮 90 分");
  await high.press("ArrowRight"); await expect(high).toHaveValue("91");
  await expect(low).toHaveAttribute("aria-valuemax", "91");
  await expect(high.locator("..")).toHaveCSS("outline-width", "2px");
  expect(await high.evaluate(node => getComputedStyle(node.parentElement!).outlineColor)).not.toBe("rgba(0, 0, 0, 0)");
});

test("a repaired opposite endpoint keeps confirmed input, thumbs and filter results together", async ({ page }) => {
  const lower = page.getByRole("spinbutton", { name: "成绩下限", exact: true });
  const upper = page.getByRole("spinbutton", { name: "成绩上限", exact: true });
  const result = page.getByRole("status", { name: "成绩筛选结果" });
  await lower.fill("95"); await upper.fill("96"); await upper.press("Enter");
  await expect(result).toContainText("40–90 分");
  await lower.press("Enter");
  await expect(page.getByRole("slider", { name: "成绩下限滑钮", exact: true })).toHaveValue("95");
  await expect(page.getByRole("slider", { name: "成绩上限滑钮", exact: true })).toHaveValue("96");
  await expect(result).toContainText("95–96 分");
});

test("value tips dismiss with Escape and remain available when the pointer enters the popup", async ({ page }) => {
  const slider = page.getByRole("slider", { name: "及格线", exact: true });
  await slider.press("ArrowRight");
  await expect(page.getByRole("tooltip")).toBeVisible();
  await slider.press("Escape");
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  await expect(slider).toBeFocused();
  await expect(slider).toHaveValue("61");
  await page.getByRole("spinbutton", { name: "精确及格线" }).click();
  await slider.locator("..").hover();
  await expect(page.getByRole("tooltip")).toBeVisible();
  await page.getByRole("tooltip").hover();
  await expect(page.getByRole("tooltip")).toBeVisible();
});

test("an incomplete sign at the other endpoint blocks a filter confirmation", async ({ page }) => {
  const lower = page.getByRole("spinbutton", { name: "成绩下限", exact: true });
  const upper = page.getByRole("spinbutton", { name: "成绩上限", exact: true });
  await upper.fill("-"); await lower.fill("60"); await lower.press("Enter");
  await expect(upper).toHaveValue("-");
  await expect(page.getByRole("status", { name: "成绩筛选结果" })).toContainText("40–90 分");
  await page.getByRole("slider", { name: "成绩下限滑钮", exact: true }).press("ArrowRight");
  await expect(page.getByRole("status", { name: "成绩筛选结果" })).toContainText("40–90 分");
  await page.getByRole("button", { name: "恢复常用范围", exact: true }).click();
  await expect(upper).toHaveValue("90");
  await lower.fill("61"); await lower.press("Enter");
  await expect(page.getByRole("status", { name: "成绩筛选结果" })).toContainText("61–90 分");
  await lower.fill("-");
  await page.getByRole("slider", { name: "成绩下限滑钮", exact: true }).press("ArrowRight");
  await expect(lower).toHaveValue("62");
  await expect(page.getByRole("status", { name: "成绩筛选结果" })).toContainText("62–90 分");
});

test("drag previews values and commits the filter after release", async ({ page }) => {
  const input = page.getByRole("slider", { name: "成绩下限滑钮", exact: true });
  await input.scrollIntoViewIfNeeded();
  const thumb = await input.locator("..").boundingBox();
  const control = await input.locator("../..").boundingBox();
  const result = page.getByRole("status", { name: "成绩筛选结果" });
  await page.mouse.move(thumb!.x + thumb!.width / 2, thumb!.y + thumb!.height / 2);
  await page.mouse.down();
  await page.mouse.move(control!.x + 8 + (control!.width - 16) * 0.6, thumb!.y + thumb!.height / 2, { steps: 6 });
  await expect(input).toHaveValue("60");
  await expect(result).toContainText("40–90 分");
  await expect(page.getByRole("tooltip")).toHaveCount(1);
  await page.mouse.up();
  await expect(result).toContainText("60–90 分");
});

test("selected track is quieter at rest and responds to hover, focus and dragging", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const slider = page.getByRole("slider", { name: "及格线", exact: true });
  const range = page.locator(".rain-slider__range").first();
  const root = page.locator(".rain-slider").first();
  const thumbPaint = page.locator(".rain-slider__thumb").first();
  const facts = [];
  for (const theme of ["浅色", "深色"]) {
    await page.getByRole("button", { name: theme, exact: true }).click();
    await page.mouse.move(0, 0);
    const idle = await range.evaluate(node => getComputedStyle(node).backgroundColor);
    await expect(thumbPaint).toHaveCSS("background-color", idle);
    const palette = await root.evaluate(node => getComputedStyle(node).getPropertyValue("--rain-category-fill-brand-solid-2").match(/[\d.]+/g)?.map(Number));
    const channels = idle.match(/[\d.]+/g)!.map(Number);
    expect(channels.slice(0, 3).map(value => idle.startsWith("color(srgb") ? Math.round(value * 255) : value)).toEqual(palette);
    expect(channels[3]).toBe(0.55);
    await expect(page.locator('[data-slot="thumb-indicator"]')).toHaveCount(0);
    await page.locator(".g5-panel").first().screenshot({ path: evidence + "/" + info.project.name + "-" + (theme === "浅色" ? "light" : "dark") + "-track-idle.png" });
    await slider.press("ArrowRight");
    const active = await range.evaluate(node => getComputedStyle(node).backgroundColor);
    expect(active).not.toBe(idle);
    await expect(thumbPaint).toHaveCSS("background-color", active);
    await page.locator(".g5-panel").first().screenshot({ path: evidence + "/" + info.project.name + "-" + (theme === "浅色" ? "light" : "dark") + "-track-active.png" });
    await page.getByRole("spinbutton", { name: "精确及格线", exact: true }).focus();
    await expect(range).toHaveCSS("background-color", idle);
    await expect(thumbPaint).toHaveCSS("background-color", idle);
    if (info.project.name === "desktop") {
      await page.locator(".rain-slider__control").first().hover();
      await expect(range).toHaveCSS("background-color", active);
      await page.mouse.move(0, 0);
      await expect(range).toHaveCSS("background-color", idle);
    }
    const thumb = await slider.locator("..").boundingBox();
    await page.mouse.move(thumb!.x + thumb!.width / 2, thumb!.y + thumb!.height / 2);
    await page.mouse.down();
    await expect(root).toHaveAttribute("data-dragging", "");
    await page.mouse.move(thumb!.x + 10, thumb!.y - 24);
    await expect(range).toHaveCSS("background-color", active);
    await page.mouse.up();
    await page.getByRole("spinbutton", { name: "精确及格线", exact: true }).focus();
    await page.mouse.move(0, 0);
    await expect(range).toHaveCSS("background-color", idle);
    const disabled = page.locator(".rain-slider[data-disabled] .rain-slider__range");
    const disabledPaint = await disabled.evaluate(node => getComputedStyle(node).backgroundColor);
    await page.locator(".rain-slider[data-disabled] .rain-slider__control").hover();
    await expect(disabled).toHaveCSS("background-color", disabledPaint);
    facts.push({ theme, idle, active, disabled: disabledPaint });
  }
  writeFileSync(evidence + "/" + info.project.name + "-track-states.json", JSON.stringify(facts, null, 2) + "\n");
});

test("themes, density, edge-aligned marks, hit areas and portal tips retain geometry", async ({ page }, info) => {
  const facts = [];
  for (const theme of ["浅色", "深色"]) {
    await page.getByRole("button", { name: theme, exact: true }).click();
    for (const compact of [false, true]) {
      const toggle = page.getByRole("button", { name: "紧凑密度", exact: true });
      if ((await toggle.getAttribute("aria-pressed") === "true") !== compact) await toggle.click();
      const thumb = page.locator(".rain-slider__thumb").first();
      await expect(thumb).toHaveCSS("width", compact ? "12px" : "16px");
      await page.getByRole("slider", { name: "及格线", exact: true }).press("Home");
      await page.getByRole("slider", { name: "及格线", exact: true }).press("End");
      await page.getByRole("spinbutton", { name: "精确及格线" }).fill("60");
      const geometry = await page.locator(".rain-slider").first().evaluate(node => {
        const thumb = node.querySelector(".rain-slider__thumb")!, mark = node.querySelector('[data-value="60"] .rain-slider__mark-tick')!;
        const a = thumb.getBoundingClientRect(), b = mark.getBoundingClientRect();
        const hit = getComputedStyle(thumb, "::after");
        const core = getComputedStyle(thumb, "::before");
        return { difference: Math.abs(a.x + a.width / 2 - (b.x + b.width / 2)), width: a.width,
          coreWidth: parseFloat(core.width), ringWidth: parseFloat(core.left),
          hitWidth: a.width - parseFloat(hit.left) - parseFloat(hit.right),
          hitHeight: a.height - parseFloat(hit.top) - parseFloat(hit.bottom),
          controlHeight: node.querySelector('[data-slot="control"]')!.getBoundingClientRect().height };
      });
      expect(geometry.difference).toBeLessThanOrEqual(1);
      expect(geometry.ringWidth).toBe(2);
      expect(geometry.coreWidth).toBe(geometry.width - 4);
      expect(geometry.hitWidth).toBeGreaterThanOrEqual(info.project.name === "touch" ? 44 : compact ? 28 : 32);
      expect(geometry.hitHeight).toBeGreaterThanOrEqual(info.project.name === "touch" ? 44 : compact ? 28 : 32);
      await page.getByRole("slider", { name: "及格线", exact: true }).press("ArrowRight");
      const tooltip = page.getByRole("tooltip");
      await expect(tooltip).toBeVisible();
      expect(await tooltip.evaluate(node => Boolean(node.closest(".g5-panel")))).toBe(false);
      const bounds = await tooltip.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0); expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
      facts.push({ theme, compact, ...geometry });
      await page.locator(".g5-panel").first().screenshot({ path: evidence + "/" + info.project.name + "-" + (theme === "浅色" ? "light" : "dark") + "-" + (compact ? "compact" : "default") + ".png" });
    }
  }
  writeFileSync(evidence + "/" + info.project.name + "-geometry.json", JSON.stringify(facts, null, 2) + "\n");
});

test("disabled, reduced motion, forced colors and the local comparison keep their boundaries", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByRole("slider", { name: "禁用滑块", exact: true })).toBeDisabled();
  await expect(page.locator(".rain-slider__thumb").first()).toHaveCSS("transition-duration", "0s");
  await page.getByRole("button", { name: "实心蓝对照", exact: true }).click();
  await expect(page.locator(".slider-examples")).toHaveAttribute("data-comparison", "solid");
  await page.getByRole("button", { name: "表面色内芯与品牌描边", exact: true }).click();
  await expect(page.locator(".slider-examples")).toHaveAttribute("data-comparison", "outline");
  await page.emulateMedia({ forcedColors: "active" });
  await page.getByRole("slider", { name: "及格线", exact: true }).press("ArrowRight");
  await expect(page.locator(".rain-slider__thumb").first()).toHaveCSS("outline-style", "solid");
  await page.getByRole("spinbutton", { name: "精确及格线", exact: true }).click();
  for (const comparison of ["实心蓝对照", "表面色内芯与品牌描边"]) {
    await page.getByRole("button", { name: comparison, exact: true }).click();
    const paints = await page.locator(".rain-slider__thumb").evaluateAll(nodes => nodes.map(node => ({
      outer: getComputedStyle(node).backgroundColor, inner: getComputedStyle(node, "::before").backgroundColor,
      innerDisplay: getComputedStyle(node, "::before").display, forcedColorAdjust: getComputedStyle(node).forcedColorAdjust,
      panel: getComputedStyle(node.closest(".g5-panel")!).backgroundColor,
    })));
    for (const paint of paints) {
      expect(paint.forcedColorAdjust).toBe("none");
      expect(paint.outer).not.toBe(paint.panel);
      if (paint.innerDisplay !== "none") expect(paint.outer).not.toBe(paint.inner);
    }
  }
  await page.locator(".g5-panel").first().screenshot({ path: evidence + "/" + info.project.name + "-forced-colors.png" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
});
