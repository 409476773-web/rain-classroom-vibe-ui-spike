import { expect, test } from "@playwright/test";
import { writeFileSync } from "node:fs";
const evidence = "evidence/runtime/input-number";
test.beforeEach(async ({ page }) => { await page.goto("/#input-number"); await expect(page.getByRole("heading", { name: "InputNumber 数字输入框" })).toBeVisible(); });

test("embedded fields align at 32px and reserve five digits without jumping width", async ({ page }, testInfo) => {
  const measurements = [];
  for (const name of ["最低分", "最高分", "随堂练习分值", "课后作业分值"]) {
    const input = page.getByRole("spinbutton", { name, exact: true });
    const root = input.locator('xpath=ancestor::*[@data-rain-id="ui-input-number"]');
    const frame = root.locator('[data-slot="frame"]');
    const before = (await frame.boundingBox())!;
    expect(before.height).toBe(32);
    if (name.endsWith("分值")) expect(before.width).toBeLessThan(115);
    await input.fill("12345");
    if (name.endsWith("分值")) {
      const label = await input.locator('xpath=ancestor::tr').locator('.number-page__grade-label').boundingBox();
      const field = (await frame.boundingBox())!;
      expect(label!.y + label!.height / 2).toBe(field.y + field.height / 2);
    }
    const textFits = await input.evaluate(node => {
      const style = getComputedStyle(node), context = document.createElement("canvas").getContext("2d")!;
      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      return node.getBoundingClientRect().width >= context.measureText((node as HTMLInputElement).value).width;
    });
    expect(textFits).toBe(true);
    expect((await frame.boundingBox())!.width).toBe(before.width);
    await input.fill("");
    expect((await frame.boundingBox())!.width).toBe(before.width);
    measurements.push({ name, height: before.height, width: before.width, fiveDigitsFit: textFits });
  }
  const minimum = page.getByRole("spinbutton", { name: "最低分", exact: true });
  await minimum.fill("101");
  const controls = [minimum, page.getByRole("spinbutton", { name: "最高分", exact: true })];
  const frames = await Promise.all(controls.map(input => input.locator('xpath=ancestor::*[@data-slot="frame"]').boundingBox()));
  const reset = (await page.getByRole("button", { name: "重置条件", exact: true }).boundingBox())!;
  expect(reset.height).toBe(32);
  for (const frame of frames) expect(frame!.y).toBe(reset.y);
  await page.getByRole("button", { name: "重置条件", exact: true }).click();
  await expect(minimum).toHaveValue("");
  for (const name of ["左右加减 · 得分", "传统箭头 · 得分"]) {
    const input = page.getByRole("spinbutton", { name, exact: true });
    const root = input.locator('xpath=ancestor::*[@data-rain-id="ui-input-number"]');
    await expect(input).toHaveAttribute("aria-valuemax", "10");
    await input.fill("11");
    await input.blur();
    await expect(input).toHaveValue("11");
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await input.press("ArrowDown");
    await expect(input).toHaveValue("10.5");
    await input.fill("");
    await expect(root.locator('[data-slot="suffix-text"]')).toHaveText("/10分");
  }
  writeFileSync(`${evidence}/${testInfo.project.name}-embedded-geometry.json`, JSON.stringify(measurements, null, 2) + "\n");
});

test("native submission uses the current draft and blocks incomplete, range and precision errors", async ({ page }) => {
  const score = page.getByRole("spinbutton", { name: "满分", exact: true });
  const result = page.getByTestId("save-result");
  await score.fill("-");
  await score.press("Enter");
  await expect(score).toHaveValue("-");
  await expect(result).toHaveText("尚未保存");
  await expect(score).toHaveAttribute("aria-invalid", "true");
  await score.fill("120");
  await page.getByRole("button", { name: "保存设置" }).click();
  await expect(score).toHaveValue("120");
  await expect(result).toHaveText("尚未保存");
  await score.fill("1.23");
  await page.getByRole("button", { name: "保存设置" }).click();
  await expect(result).toHaveText("尚未保存");
  await score.fill("1.");
  await score.evaluate(input => (input as HTMLInputElement).form!.requestSubmit());
  await expect(score).toHaveValue("1");
  await expect(result).toContainText("满分 1 分");
  await score.fill("12.5");
  await score.press("Enter");
  await expect(result).toContainText("满分 12.5 分");
  await page.getByRole("button", { name: "重置", exact: true }).click();
  await expect(score).toHaveValue("12");
  await expect(result).toHaveText("已重置");
});

test("important values use the Data font at bold weight without changing field typography sizes", async ({ page }, testInfo) => {
  const facts = [];
  for (const label of ["描边", "填充", "底线"]) {
    const normal = page.getByRole("spinbutton", { name: `${label} · 传统数值`, exact: true });
    const important = page.getByRole("spinbutton", { name: `${label} · 分值`, exact: true });
    const typography = await important.evaluate(input => {
      const style = getComputedStyle(input), value = input.closest('[data-slot="value-region"]')!;
      const unit = getComputedStyle(value.querySelector('[data-slot="suffix-text"]')!);
      return { family: style.fontFamily, weight: style.fontWeight, size: style.fontSize, line: style.lineHeight,
        numeric: style.fontVariantNumeric, unitFamily: unit.fontFamily, unitWeight: unit.fontWeight };
    });
    expect(typography.family).toContain("LINE Seed JP App_OTF");
    expect(typography.weight).toBe("700");
    expect(typography.numeric).toBe("lining-nums tabular-nums");
    expect(typography.size).toBe(await normal.evaluate(node => getComputedStyle(node).fontSize));
    expect(typography.line).toBe(await normal.evaluate(node => getComputedStyle(node).lineHeight));
    expect(typography.unitFamily).not.toContain("LINE Seed");
    expect(typography.unitWeight).toBe("400");
    facts.push({ appearance: label, ...typography });
  }
  const score = page.getByRole("spinbutton", { name: "满分", exact: true });
  for (const button of ["左右加减", "右侧箭头"]) {
    await page.getByRole("button", { name: button, exact: true }).click();
    await score.fill("120");
    await expect(score).toHaveAttribute("aria-invalid", "true");
    await expect(score).toHaveCSS("font-weight", "700");
    await expect(score).toHaveCSS("font-size", "14px");
  }
  for (const size of [24, 28, 32, 36]) {
    const input = page.getByRole("spinbutton", { name: `${size}px`, exact: true });
    await expect(input).toHaveCSS("font-weight", "700");
    await expect(input).toHaveCSS("font-size", size === 24 ? "13px" : "14px");
  }
  for (const name of ["只读", "禁用"]) await expect(page.getByRole("spinbutton", { name, exact: true })).toHaveCSS("font-weight", "700");
  const direct = page.getByRole("spinbutton", { name: "直接填写", exact: true });
  await direct.fill("");
  const placeholder = await direct.evaluate(input => ({family:getComputedStyle(input, "::placeholder").fontFamily,weight:getComputedStyle(input, "::placeholder").fontWeight}));
  expect(placeholder.family).not.toContain("LINE Seed");
  expect(placeholder.weight).toBe("400");
  writeFileSync(`${evidence}/${testInfo.project.name}-key-data-typography.json`, JSON.stringify(facts, null, 2) + "\n");
});

test("corrective stepping, clear, permissions and keyboard behave consistently", async ({ page }, testInfo) => {
  const clearable = page.getByRole("spinbutton", { name: "满分", exact: true });
  const clearSlot = clearable.locator('xpath=ancestor::*[@data-rain-id="ui-input-number"]').locator('[data-slot="clear-slot"]');
  await expect(clearSlot).toHaveCSS("opacity", "0");
  await clearable.scrollIntoViewIfNeeded();
  const initial = await clearable.boundingBox();
  await clearable.hover();
  await expect(clearSlot).toHaveCSS("opacity", "1");
  expect(await clearable.boundingBox()).toEqual(initial);
  await page.mouse.move(0, 0);
  await expect(clearSlot).toHaveCSS("opacity", "0");
  await clearable.focus();
  await expect(clearSlot).toHaveCSS("opacity", "1");
  await clearable.press(testInfo.project.name === "webkit" ? "Alt+Tab" : "Tab");
  await expect(page.getByRole("button", { name: "清除满分", exact: true })).toBeFocused();
  const outside = page.getByRole("spinbutton", { name: "超出上限", exact: true });
  await expect(page.getByRole("button", { name: "增加超出上限" })).toBeDisabled();
  await page.getByRole("button", { name: "减少超出上限" }).click();
  await expect(outside).toHaveValue("119");
  await expect(outside).toHaveAttribute("aria-invalid", "true");
  const score = page.getByRole("spinbutton", { name: "满分", exact: true });
  await score.fill("001.50");
  await score.press("ArrowUp");
  await expect(score).toHaveValue("002.00");
  await score.hover();
  await page.mouse.wheel(0, -100);
  await expect(score).toHaveValue("002.00");
  await page.getByRole("button", { name: "清除满分" }).click();
  await expect(score).toHaveValue("");
  await expect(score).toBeFocused();
  await expect(score).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByRole("spinbutton", { name: "只读", exact: true })).toHaveAttribute("readonly", "");
  await expect(page.getByRole("button", { name: "增加只读" })).toBeDisabled();
  await expect(page.getByRole("spinbutton", { name: "禁用", exact: true })).toBeDisabled();
});

test("three appearances preserve shared geometry, dark theme, focus and narrow layout", async ({ page }, testInfo) => {
  const prefix = testInfo.project.name === "webkit" ? "webkit-" : "";
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const matrix = page.getByTestId("appearance-matrix");
  const geometry = await matrix.locator(".number-page__panel").evaluateAll(panels => panels.map(panel => {
    const text = panel.querySelector('[data-rain-id="ui-input"]')!;
    const frame = panel.querySelector('.rain-input-number')!;
    const step = frame.querySelector('button')!;
    const style = getComputedStyle(frame), button = getComputedStyle(step);
    return { appearance: panel.getAttribute('data-appearance'), inputHeight: text.getBoundingClientRect().height,
      numberWidth: frame.getBoundingClientRect().width, numberHeight: frame.getBoundingClientRect().height, buttonWidth: step.getBoundingClientRect().width,
      buttonHeight: step.getBoundingClientRect().height, divider: button.borderRightWidth,
      borderTop: style.borderTopColor, borderBottom: style.borderBottomWidth, radius: style.borderRadius };
  }));
  for (const item of geometry) { expect(item.numberHeight).toBe(item.inputHeight); expect(item.buttonWidth).toBe(32); expect(item.numberWidth).toBeLessThan(160); }
  const full = page.getByRole("spinbutton", { name: "按需撑满", exact: true });
  expect(await full.evaluate(input => input.closest('[data-rain-id="ui-input-number"]')!.getBoundingClientRect().width)).toBeGreaterThan(160);
  expect(geometry[2]!.divider).toBe("0px");
  expect(geometry[2]!.borderTop).toBe("rgba(0, 0, 0, 0)");
  const compact = page.getByRole("spinbutton", { name: "24px", exact: true });
  const compactFrame = compact.locator('xpath=ancestor::*[@data-slot="frame"]');
  const compactButton = compactFrame.getByRole("button", { name: "增加24px" });
  const hit = await compactButton.evaluate(button => {
    const box = button.getBoundingClientRect(), extra = getComputedStyle(button, "::before");
    return { x: box.x, y: box.y, width: box.width, height: box.height - parseFloat(extra.top) - parseFloat(extra.bottom) };
  });
  expect(hit.width).toBeGreaterThanOrEqual(24); expect(hit.height).toBeGreaterThanOrEqual(24);
  await compactButton.scrollIntoViewIfNeeded();
  const box = (await compactButton.boundingBox())!;
  await page.mouse.click(box.x + box.width / 2, box.y - 0.5);
  await expect(compact).toHaveValue("4");
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: `${evidence}/${prefix}light.png`, fullPage: true });
  await page.getByRole("button", { name: "深色", exact: true }).click();
  expect(await page.locator("h1").evaluate(node => getComputedStyle(node).color)).toBe(await page.locator("main").evaluate(node => getComputedStyle(node).color));
  await page.screenshot({ path: `${evidence}/${prefix}dark.png`, fullPage: true });
  await page.getByRole("spinbutton", { name: "描边 · 数量", exact: true }).focus();
  expect(await page.getByRole("spinbutton", { name: "描边 · 数量", exact: true }).evaluate(input => getComputedStyle(input.closest('[data-slot="frame"]')!).outlineStyle)).toBe("solid");
  await page.screenshot({ path: `${evidence}/${prefix}focus.png` });
  await page.emulateMedia({ forcedColors: "active" });
  await page.screenshot({ path: `${evidence}/${prefix}forced-colors.png` });
  await page.emulateMedia({ forcedColors: "none" });
  await page.setViewportSize({ width: 375, height: 812 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: `${evidence}/${prefix}narrow.png`, fullPage: true });
  expect(errors).toEqual([]);
  writeFileSync(`${evidence}/${prefix}geometry.json`, JSON.stringify(geometry, null, 2) + "\n");
});

test("Classic stacked controls stay compact, reveal without shifting, and retain editing semantics", async ({ page, browser }, testInfo) => {
  const prefix = testInfo.project.name === "webkit" ? "webkit-" : "";
  const geometry = [];
  for (const label of ["描边", "填充", "底线"]) {
    const input = page.getByRole("spinbutton", { name: `${label} · 传统数值`, exact: true });
    const root = input.locator('xpath=ancestor::*[@data-rain-id="ui-input-number"]');
    const controls = root.locator('[data-slot="controls"]');
    const before = await input.boundingBox();
    await expect(controls).toHaveCSS("opacity", "0");
    const width = (await root.boundingBox())!.width;
    expect(width).toBeLessThan(100);
    await expect(input).toHaveCSS("text-align", "start");
    await root.hover();
    await expect(controls).toHaveCSS("opacity", "1");
    expect(await input.boundingBox()).toEqual(before);
    await expect(controls).toHaveCSS("border-left-width", label === "底线" ? "0px" : "1px");
    const up = controls.getByRole("button", { name: `增加${label} · 传统数值` });
    const down = controls.getByRole("button", { name: `减少${label} · 传统数值` });
    const upBox = (await up.boundingBox())!, downBox = (await down.boundingBox())!;
    expect(upBox.y).toBeLessThan(downBox.y);
    await page.mouse.move(0, 0);
    await input.focus();
    await expect(controls).toHaveCSS("opacity", "1");
    await input.press("ArrowUp");
    await expect(input).toHaveValue("4");
    // macOS WebKit's native button navigation uses Option+Tab with its default preference.
    await input.press(testInfo.project.name === "webkit" ? "Alt+Tab" : "Tab");
    await expect(up).toBeFocused();
    await expect(up).toHaveCSS("outline-style", "solid");
    await up.press("Space");
    await expect(input).toHaveValue("5");
    await input.press("ArrowDown");
    await expect(input).toHaveValue("4");
    await down.click();
    await expect(input).toHaveValue("3");
    const affixed = page.getByRole("spinbutton", { name: `${label} · 分值`, exact: true });
    const affixedWidth = await affixed.evaluate(node => node.closest('[data-rain-id="ui-input-number"]')!.getBoundingClientRect().width);
    expect(affixedWidth).toBeGreaterThan(width);
    expect(affixedWidth).toBeLessThan(145);
    geometry.push({ appearance: label, width, affixedWidth, height: (await root.boundingBox())!.height, increase: upBox, decrease: downBox });
    await input.blur();
    await page.mouse.move(0, 0);
  }
  const score = page.getByRole("spinbutton", { name: "满分", exact: true });
  await score.fill("-");
  await page.getByRole("button", { name: "右侧箭头", exact: true }).click();
  await expect(score).toHaveValue("-");
  await expect(score).toHaveAttribute("aria-invalid", "true");
  expect(await score.evaluate(node => node.closest('[data-rain-id="ui-input-number"]')!.getBoundingClientRect().width)).toBeLessThan(160);
  await score.fill("1.");
  await score.press("Enter");
  await expect(page.getByTestId("save-result")).toContainText("满分 1 分");
  const outside = page.getByRole("spinbutton", { name: "超出上限", exact: true });
  await outside.focus();
  await expect(page.getByRole("button", { name: "增加超出上限" })).toBeDisabled();
  await page.getByRole("button", { name: "减少超出上限" }).click();
  await expect(outside).toHaveValue("119");
  await expect(outside).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByRole("button", { name: "增加只读" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "减少只读" })).toBeDisabled();
  await expect(page.getByRole("spinbutton", { name: "禁用", exact: true })).toBeDisabled();
  const plain = page.getByRole("spinbutton", { name: "直接填写", exact: true }).locator('xpath=ancestor::*[@data-rain-id="ui-input-number"]');
  await expect(plain.locator('[data-slot="controls"]')).toHaveCount(0);
  const full = page.getByRole("spinbutton", { name: "按需撑满", exact: true });
  expect(await full.evaluate(node => node.closest('[data-rain-id="ui-input-number"]')!.getBoundingClientRect().width)).toBeGreaterThan(160);
  for (const size of [24, 28, 32, 36]) {
    const control = page.getByRole("spinbutton", { name: `${size}px`, exact: true });
    expect(await control.evaluate(node => node.closest('[data-slot="frame"]')!.getBoundingClientRect().height)).toBe(size);
  }
  for (const name of ["最低分", "最高分"]) {
    const input = page.getByRole("spinbutton", { name, exact: true });
    const label = input.locator('xpath=ancestor::*[@data-slot="frame"]').locator('label > span').first();
    expect(await label.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true);
  }
  await page.getByRole("spinbutton", { name: "描边 · 传统数值", exact: true }).focus();
  await page.screenshot({ path: `${evidence}/${prefix}stacked-focus.png` });
  await page.emulateMedia({ forcedColors: "active" });
  await page.screenshot({ path: `${evidence}/${prefix}stacked-forced-colors.png` });
  await page.emulateMedia({ forcedColors: "none" });
  await page.getByRole("button", { name: "深色", exact: true }).click();
  await page.getByRole("spinbutton", { name: "随堂练习分值", exact: true }).focus();
  await page.screenshot({ path: `${evidence}/${prefix}stacked-dark.png` });
  await page.setViewportSize({ width: 375, height: 812 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("spinbutton", { name: "随堂练习分值", exact: true }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${evidence}/${prefix}stacked-narrow.png` });
  writeFileSync(`${evidence}/${prefix}stacked-geometry.json`, JSON.stringify(geometry, null, 2) + "\n");
  const touchContext = await browser.newContext({ hasTouch: true, viewport: { width: 375, height: 812 } });
  const touchPage = await touchContext.newPage();
  await touchPage.goto(page.url());
  const touchInput = touchPage.getByRole("spinbutton", { name: "描边 · 传统数值", exact: true });
  const touchRoot = touchInput.locator('xpath=ancestor::*[@data-rain-id="ui-input-number"]');
  await expect(touchRoot.locator('[data-slot="controls"]')).toHaveCSS("opacity", "1");
  await touchRoot.getByRole("button", { name: "增加描边 · 传统数值" }).tap();
  await expect(touchInput).toHaveValue("4");
  await touchPage.getByRole("button", { name: "增加描边 · 数量", exact: true }).tap();
  await expect(touchPage.getByRole("spinbutton", { name: "描边 · 数量", exact: true })).toHaveValue("4");
  await touchPage.getByRole("spinbutton", { name: "满分", exact: true }).tap();
  await touchPage.getByRole("button", { name: "清除满分", exact: true }).tap();
  await expect(touchPage.getByRole("spinbutton", { name: "满分", exact: true })).toHaveValue("");
  await touchContext.close();
});
