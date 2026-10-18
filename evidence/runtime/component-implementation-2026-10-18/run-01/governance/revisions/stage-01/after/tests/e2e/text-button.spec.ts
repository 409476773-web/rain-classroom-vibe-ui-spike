import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test, type Locator } from "@playwright/test";

import { contrastRatio } from "./color-contrast";

const captureEvidence = (
  globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }
).process?.env?.RAIN_CAPTURE_TEXT_BUTTON === "1";

async function colors(control: Locator) {
  return control.evaluate((element) => {
    const style = getComputedStyle(element);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("A color sampling context is required");
    function rgba(value: string) {
      context!.clearRect(0, 0, 1, 1);
      context!.fillStyle = value;
      context!.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = context!.getImageData(0, 0, 1, 1).data;
      return `rgba(${r}, ${g}, ${b}, ${a! / 255})`;
    }
    return { foreground: rgba(style.color), background: rgba(style.backgroundColor) };
  });
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.goto("/#text-button");
});

test("TextButton route exposes an honest interactive review page", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1, name: "TextButton 文字按钮" })).toBeVisible();
  await expect(page.getByText("最新配方 · 视觉验收已通过")).toBeVisible();
  await expect(page.getByText(/演示数据，不会连接后台或修改课程/)).toBeVisible();
  for (const name of ["颜色与状态", "三档尺寸", "图标组合", "试试加载", "放进输入框", "真正的链接"]) {
    await expect(page.getByRole("region", { name })).toBeVisible();
  }
  await page.getByRole("link", { name: "返回组件页", exact: true }).click();
  await expect(page).toHaveURL(/#components$/);
  await page.getByRole("link", { name: "体验 TextButton 文字按钮", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: "TextButton 文字按钮" })).toBeFocused();
});

test("text actions retain their three colors, subtle pressed feedback and readable contrast", async ({ page }) => {
  const region = page.getByRole("region", { name: "颜色与状态" });
  for (const [name, expectedColor] of [
    ["普通灰蓝", "rgb(73, 93, 135)"],
    ["突出主题蓝", "rgb(15, 85, 223)"],
    ["危险红", "rgb(202, 39, 50)"],
  ]) {
    const group = region.getByRole("group", { name, exact: true });
    const button = group.locator('button[data-state="default"]');
    await expect(button).toHaveCSS("color", expectedColor!);
    await expect(button).toHaveCSS("border-top-width", "0px");
    await expect(button).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    const normal = await colors(button);
    expect(contrastRatio(normal.foreground, normal.background)).toBeGreaterThanOrEqual(4.5);
    await button.hover();
    await expect(button).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    const hover = await colors(button);
    expect(hover.foreground).toBe(normal.foreground);
    expect(contrastRatio(hover.foreground, hover.background)).toBeGreaterThanOrEqual(4.5);
    await page.mouse.down();
    await expect.poll(async () => (await colors(button)).background).not.toBe(hover.background);
    const pressed = await colors(button);
    expect(pressed.foreground).toBe(normal.foreground);
    expect(contrastRatio(pressed.foreground, pressed.background)).toBeGreaterThanOrEqual(4.5);
    await page.mouse.up();

    const disabled = group.locator('button[data-state="disabled"]');
    await expect(disabled).toBeDisabled();
    await expect(disabled).toHaveCSS("opacity", "1");
    await disabled.hover({ force: true });
    await expect(disabled).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(disabled).toHaveCSS("color", expectedColor!);
    for (const foreground of await disabled.locator('[data-slot="label"], [data-slot="leading-icon"], [data-slot="trailing-icon"]').all()) {
      await expect(foreground).toHaveCSS("opacity", "0.3");
    }

    const loading = group.locator('button[data-state="loading"]');
    await expect(loading).toHaveCSS("opacity", "1");
    await expect(loading).toHaveCSS("color", expectedColor!);
    await expect(loading).toHaveAttribute("aria-busy", "true");
  }
});

test("the three text sizes and governed icon compositions remain distinct from ordinary Button", async ({ page }) => {
  const region = page.getByRole("region", { name: "三档尺寸" });
  for (const [size, height, fontSize, lineHeight] of [
    ["small", "20px", "12px", "14px"],
    ["compact", "24px", "13px", "18px"],
    ["regular", "26px", "14px", "20px"],
  ]) {
    const button = region.locator(`button[data-size="${size}"]`);
    await expect(button).toHaveCSS("height", height!);
    await expect(button).toHaveCSS("font-size", fontSize!);
    await expect(button).toHaveCSS("line-height", lineHeight!);
    await expect(button).toHaveCSS("font-weight", "400");
    await expect(button).toHaveCSS("min-width", "0px");
    await expect(button).toHaveCSS("padding-left", "6px");
    await expect(button).toHaveCSS("padding-right", "6px");
    await expect(button.locator('[data-slot="label"]')).toHaveCSS("text-overflow", "clip");
  }
  const icons = page.getByRole("region", { name: "图标组合" });
  const buttons = icons.locator('button[data-variant="text"]');
  await expect(buttons).toHaveCount(4);
  for (const [index, count] of [0, 1, 1, 2].entries()) {
    await expect(buttons.nth(index).locator('[data-rain-id="icon"]')).toHaveCount(count);
    await expect(buttons.nth(index).locator('[data-rain-id="icon"]:not([aria-hidden=true])')).toHaveCount(0);
  }
  const edit = icons.locator('[data-icon="icon/edit-pencil"]').first();
  await expect(edit).toBeVisible();
  await expect(edit).toHaveCSS("width", "16px");
  expect(await edit.evaluate((element) => getComputedStyle(element).maskImage)).not.toBe("none");
  const disclosure = icons.getByRole("button", { name: /^(展开说明|收起说明)$/ });
  await expect(disclosure.locator('[data-icon="icon/double-arrow-down"]')).toBeVisible();
  await expect(disclosure.locator('[data-rain-id="icon"]')).toHaveCSS("width", "12px");
  await disclosure.click();
  await expect(disclosure).toHaveAccessibleName("收起说明");
  await expect(disclosure.locator('[data-icon="icon/double-arrow-up"]')).toBeVisible();
  const options = icons.getByRole("button", { name: "编辑选项", exact: true });
  await expect(options.locator('[data-icon="icon/arrow-down"]')).toBeVisible();
  await options.click();
  await expect(options.locator('[data-icon="icon/arrow-up"]')).toBeVisible();
  await expect(icons.locator('svg, [data-icon="edit"], [data-icon="chevron-right"]')).toHaveCount(0);
});

test("all four compositions expose their actual loading geometry without a hidden fixed-width policy", async ({ page }) => {
  const region = page.getByRole("region", { name: "图标组合" });
  const buttons = region.locator('button[data-variant="text"]');
  const normalWidths = await buttons.evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().width));
  await region.getByRole("checkbox", { name: "对比加载前后" }).check();
  // A 16px leading indicator plus 4px gap replaces a 16px leading icon;
  // the 12px trailing icon plus 4px gap disappears. These are candidates,
  // not a claim that layout movement has been approved by the designer.
  for (const [index, widthChange] of [20, 0, 4, -16].entries()) {
    const button = buttons.nth(index);
    await expect(button).toHaveAttribute("data-state", "loading");
    await expect(button.locator('[data-slot="loading-indicator"]')).toHaveCount(1);
    await expect(button.locator('[data-slot="leading-icon"], [data-slot="trailing-icon"]')).toHaveCount(0);
    const loadingWidth = await button.evaluate((element) => element.getBoundingClientRect().width);
    expect(loadingWidth - normalWidths[index]!).toBeCloseTo(widthChange, 1);
  }
  await region.getByRole("checkbox", { name: "对比加载前后" }).uncheck();
  for (const [index, count] of [0, 1, 1, 2].entries()) {
    await expect(buttons.nth(index).locator('[data-rain-id="icon"]')).toHaveCount(count);
  }
});

test("keyboard and loading are real, retain focus and reject repeated activation", async ({ page }) => {
  const region = page.getByRole("region", { name: "试试加载" });
  const button = region.getByRole("button", { name: "导出演示数据", exact: true });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("data-state", "loading");
  await expect(button).toBeFocused();
  await expect(button).not.toHaveAttribute("disabled");
  await page.keyboard.press("Space");
  await page.keyboard.press("Enter");
  await expect(region.getByRole("status")).toContainText("已触发 1 次");
  await expect(button.locator('[data-slot="trailing-icon"]')).toHaveCount(0);
  const spinner = button.locator('[data-slot="loading-indicator"]');
  await expect(spinner).toHaveCSS("animation-duration", "0.8s");
  expect(await spinner.evaluate((element) => getComputedStyle(element).maskImage)).toContain("button-loading");
  await expect(region.getByRole("status")).toContainText("已完成 1 次", { timeout: 6000 });
  await expect(button).toHaveAttribute("data-state", "default");
  await expect(button).toBeFocused();
});

test("input-hosted actions stay present and keep input and action focus separate", async ({ page }) => {
  const region = page.getByRole("region", { name: "放进输入框" });
  for (const [name, size] of [["常规输入框", "regular"], ["紧凑输入框", "compact"]]) {
    const group = region.getByRole("group", { name, exact: true });
    const input = group.getByRole("textbox");
    const action = group.getByRole("button", { name: "检查", exact: true });
    await expect(action).toBeVisible();
    await expect(action).toBeDisabled();
    await expect(action).toHaveAttribute("data-size", size!);
    const disabledBox = await action.boundingBox();
    await input.fill("课堂示例");
    await expect(action).toBeEnabled();
    const enabledBox = await action.boundingBox();
    expect(enabledBox?.width).toBeCloseTo(disabledBox?.width ?? 0, 1);
    await action.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(group.locator('[data-slot="clear-action"]')).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(input).toBeFocused();
    const host = input.locator('xpath=ancestor::*[@data-rain-id="ui-input"]');
    await expect(host).toHaveCSS("outline-color", "rgb(61, 123, 255)");
    await expect(host).toHaveCSS("outline-width", "1px");
    await expect(host).toHaveCSS("outline-offset", "0px");
    await expect(host).toHaveCSS("box-shadow", "rgba(61, 123, 255, 0.2) 0px 0px 0px 3px");
    await input.press("Tab");
    await expect(group.locator('[data-slot="clear-action"]')).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(action).toBeFocused();
    expect(await action.evaluate((element) => element.matches(":focus-visible"))).toBe(true);
    await expect(host).toHaveCSS("box-shadow", "none");
    await expect(action).toHaveCSS("outline-width", "1px");
    const actionHalo = await action.evaluate((element) => getComputedStyle(element).boxShadow
      .replaceAll("rgba(0, 0, 0, 0) 0px 0px 0px 0px, ", ""));
    expect(actionHalo).toBe("rgba(61, 123, 255, 0.2) 0px 0px 0px 3px");
    await page.keyboard.press("Enter");
    await expect(action).toHaveAttribute("aria-busy", "true");
    await expect(action).toBeFocused();
    await input.fill("稍后修改");
    await expect(action).toHaveAttribute("data-state", "default", { timeout: 6000 });
    await expect(group.getByRole("status")).toContainText("课堂示例", { timeout: 6000 });
    await expect(input).toHaveValue("稍后修改");
    await input.clear();
    await expect(action).toBeDisabled();
    await expect(action).toBeVisible();
  }
  await region.getByRole("checkbox", { name: "模拟暂不可用" }).check();
  for (const input of await region.getByRole("textbox").all()) await input.fill("有内容");
  for (const action of await region.getByRole("button", { name: "检查", exact: true }).all()) {
    await expect(action).toBeDisabled();
  }
});

test("links preserve native navigation, inline underline and an explicit new-tab notice", async ({ page }) => {
  const region = page.getByRole("region", { name: "真正的链接" });
  const standalone = region.getByRole("link", { name: "打开演示帮助", exact: true });
  await expect(standalone).not.toHaveAttribute("target");
  await expect(standalone).toHaveCSS("text-decoration-line", "none");
  const normalColor = await standalone.evaluate((element) => getComputedStyle(element).color);
  await standalone.hover();
  await expect(standalone).not.toHaveCSS("color", normalColor);
  await expect(standalone).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(standalone).toHaveCSS("text-decoration-line", "none");
  const inline = region.getByRole("link", { name: "阅读使用说明", exact: true });
  await expect(inline).toHaveCSS("text-decoration-line", "underline");
  await expect(inline).toHaveCSS("white-space", "normal");
  await expect(inline).toHaveCSS("padding-left", "0px");
  const newTab = region.getByRole("link", { name: /另开帮助.*新标签页打开/ });
  for (const theme of ["light", "dark"] as const) {
    await page.evaluate((value) => { document.documentElement.dataset.rainTheme = value; }, theme);
    await newTab.focus();
    await page.keyboard.press("Tab");
    await expect(inline).toBeFocused();
    await expect(inline).toHaveCSS("outline-color", theme === "light" ? "rgb(61, 123, 255)" : "rgb(42, 93, 203)");
    await expect(inline).toHaveCSS("outline-width", "1px");
    await expect(inline).toHaveCSS("outline-offset", "0px");
    await expect(inline).toHaveCSS("box-shadow", `${theme === "light" ? "rgba(61, 123, 255, 0.2)" : "rgba(56, 96, 255, 0.3)"} 0px 0px 0px 3px`);
  }
  await page.emulateMedia({ forcedColors: "active" });
  await newTab.focus();
  await page.keyboard.press("Tab");
  await expect(inline).toBeFocused();
  await expect(inline).toHaveCSS("outline-width", "2px");
  await expect(inline).toHaveCSS("box-shadow", "none");
  await expect(inline).not.toHaveCSS("outline-color", "rgba(0, 0, 0, 0)");
  await page.emulateMedia({ forcedColors: "none" });
  await page.evaluate(() => { document.documentElement.dataset.rainTheme = "light"; });
  await expect(newTab).toHaveAttribute("rel", /noopener/);
  await expect(newTab).toHaveAttribute("rel", /noreferrer/);
  const popupPromise = page.waitForEvent("popup");
  await newTab.click();
  const popup = await popupPromise;
  await expect(popup.getByRole("heading", { level: 1, name: "TextButton 演示帮助" })).toBeVisible();
  await popup.close();
  await expect(page).toHaveURL(/#text-button$/);
  await standalone.click();
  await expect(page.getByRole("heading", { level: 1, name: "TextButton 演示帮助" })).toBeFocused();
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1, name: "TextButton 文字按钮" })).toBeFocused();
});

test("focus remains visible in high contrast and motion can be reduced", async ({ page }) => {
  await page.getByRole("link", { name: "返回组件页", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "查看主题、状态与尺寸对照", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  const focused = page.locator('button[data-variant="text"]:focus-visible');
  await expect(focused).toHaveCount(1);
  const ring = await focused.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outline: style.outlineColor, width: style.outlineWidth, shadow: style.boxShadow };
  });
  expect(ring.width).toBe("1px");
  expect(ring.outline).toBe("rgb(61, 123, 255)");
  expect(ring.shadow).toContain("0.2");
  await page.emulateMedia({ forcedColors: "active" });
  await expect(focused).not.toHaveCSS("outline-style", "none");
  const outline = await focused.evaluate((element) => getComputedStyle(element).outlineColor);
  expect(outline).not.toBe("rgba(0, 0, 0, 0)");
  await page.emulateMedia({ forcedColors: "none", reducedMotion: "reduce" });
  for (const indicator of await page.locator('[data-slot="loading-indicator"]').all()) {
    await expect(indicator).toHaveCSS("animation-name", "none");
  }
});

test("the review page reflows on narrow screens and at enlarged scale", async ({ page }) => {
  if (captureEvidence) {
    await page.screenshot({ path: evidenceOutputPath("evidence/runtime/day-3/text-button-desktop.png"), fullPage: true, animations: "disabled" });
  }
  for (const width of [375, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    for (const label of await page.locator('button[data-variant="text"] [data-slot="label"]').all()) {
      const geometry = await label.evaluate((element) => ({ client: element.clientWidth, scroll: element.scrollWidth }));
      expect(geometry.scroll).toBeLessThanOrEqual(geometry.client + 1);
    }
  }
  await page.setViewportSize({ width: 375, height: 900 });
  if (captureEvidence) {
    await page.screenshot({ path: evidenceOutputPath("evidence/runtime/day-3/text-button-mobile.png"), fullPage: true, animations: "disabled" });
  }
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  const enlarged = await page.evaluate(() => ({
    viewport: window.innerWidth,
    documentScroll: document.documentElement.scrollWidth,
    bodyClient: document.body.clientWidth,
    mainRendered: document.querySelector("main")?.getBoundingClientRect().width,
    regularHeight: document.querySelector('[data-size="regular"]')?.getBoundingClientRect().height,
  }));
  // Under root CSS zoom, body layout units shrink but the document scroll
  // width remains in viewport units. Compare like units and prove 2x scale.
  expect(enlarged.bodyClient).toBe(720);
  expect(enlarged.regularHeight).toBe(52);
  expect(enlarged.documentScroll).toBeLessThanOrEqual(enlarged.viewport);
  expect(enlarged.mainRendered).toBeLessThanOrEqual(enlarged.viewport);
  for (const label of await page.locator('button[data-variant="text"] [data-slot="label"]').all()) {
    const geometry = await label.evaluate((element) => ({
      left: element.getBoundingClientRect().left,
      right: element.getBoundingClientRect().right,
      client: element.clientWidth,
      scroll: element.scrollWidth,
    }));
    expect(geometry.left).toBeGreaterThanOrEqual(0);
    expect(geometry.right).toBeLessThanOrEqual(enlarged.viewport);
    expect(geometry.scroll).toBeLessThanOrEqual(geometry.client + 1);
  }
});

test("long action copy stays whole while a prose link actually wraps in a narrow example", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  const region = page.getByRole("region", { name: "完整文字与窄空间" });
  const action = region.getByRole("button", { name: "为本课程重新生成课堂练习", exact: true });
  await action.click();
  await expect(region.getByRole("status")).toContainText("已触发 1 次");
  const label = action.locator('[data-slot="label"]');
  await expect(label).toHaveCSS("white-space", "nowrap");
  await expect(label).toHaveCSS("text-overflow", "clip");
  const box = await label.evaluate((element) => ({ client: element.clientWidth, scroll: element.scrollWidth }));
  expect(box.scroll).toBeLessThanOrEqual(box.client + 1);
  const link = region.getByRole("link", { name: "了解课堂练习的生成方式与使用注意事项", exact: true });
  await expect(link).toHaveCSS("text-decoration-line", "underline");
  const lineCount = await link.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size;
  });
  expect(lineCount).toBeGreaterThan(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});
