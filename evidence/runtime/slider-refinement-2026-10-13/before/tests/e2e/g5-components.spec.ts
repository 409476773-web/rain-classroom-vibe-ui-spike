import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getG5EvidenceDirectory } from "../../scripts/g5-evidence-paths.mjs";
const evidence = getG5EvidenceDirectory(fileURLToPath(new URL("../../", import.meta.url)), "evidence/runtime/g5-components-2026-10-12/browser");
mkdirSync(evidence, { recursive: true });
const ids = ["label", "field", "input-group", "native-select", "combobox", "slider", "calendar", "date-picker"];
test.beforeEach(({ page }) => {
  page.on("pageerror", error => { throw error; });
});
test("eight catalogue routes focus headings and copy public examples", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  for (const id of ids) {
    await page.goto("/#components");
    await page.locator(`a[href="#${id}"]`).first().click();
    await expect(page.locator(`#${id}-title`)).toBeFocused();
    await expect(page.getByRole("heading", { name: "API 与结构", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "复制代码", exact: true }).last().click();
    await expect(page.getByText("已复制", { exact: true })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('@rain-next/ui');
  }
});
test("all eight pages keep token typography, light/dark density and narrow layouts", async ({ page }, info) => {
  const facts = [];
  for (const id of ids) {
    await page.goto(`/#${id}`);
    await expect(page.locator(`#${id}-title`)).toBeVisible();
    await page.getByRole("button", { name: "浅色", exact: true }).click();
    await expect(page.locator(`#${id}-title`)).toHaveCSS("font-size", "16px");
    await expect(page.locator(`#${id}-title`)).toHaveCSS("line-height", "24px");
    expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    await page.locator(".g5-panel").first().screenshot({ path: `${evidence}/${id}-${info.project.name}-light.png` });
    await page.getByRole("button", { name: "深色", exact: true }).click();
    await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
    await expect(page.locator("main.component-doc")).toHaveAttribute("data-rain-theme", "dark");
    const controls = await page.locator('.g5-panel [data-rain-id][data-density]').evaluateAll(nodes => nodes.map(node => ({ id: node.getAttribute('data-rain-id'), density: node.getAttribute('data-density'), height: node.getBoundingClientRect().height })));
    expect(controls.filter(node => node.density !== "compact")).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    await page.locator(".g5-panel").first().screenshot({ path: `${evidence}/${id}-${info.project.name}-dark-compact.png` });
    facts.push({ id, controls });
  }
  writeFileSync(`${evidence}/density-${info.project.name}.json`, JSON.stringify(facts, null, 2));
});
test("label, native form, feedback composer and assignment save are operable", async ({ page }) => {
  await page.goto("/#label");
  await page.locator("label").filter({ hasText: "课程名称" }).first().click();
  await expect(page.getByRole("textbox", { name: "课程名称" })).toBeFocused();
  await page.goto("/#native-select");
  await page.getByRole("combobox", { name: "任务类型" }).selectOption("practice");
  await page.getByRole("button", { name: "提交任务类型" }).click();
  await expect(page.getByText("提交值：practice")).toBeVisible();
  await page.goto("/#input-group");
  const textarea = page.getByRole("textbox", { name: "评语", exact: true });
  await page.getByText("先肯定依据，再指出可改进之处。", { exact: true }).click();
  await expect(textarea).toBeFocused();
  await textarea.fill("证据充分，请进一步说明因果联系。");
  await page.getByRole("button", { name: "提交评语" }).click();
  await expect(page.getByRole("status", { name: "评语提交结果" })).toContainText("已提交：证据充分");
  await page.getByRole("button", { name: "清空评语" }).click();
  await expect(textarea).toHaveValue("");
  await expect(page.getByRole("textbox", { name: "未修改的输入组合" })).toHaveValue("请说明你的判断依据。");
  await page.goto("/#field");
  await page.getByRole("button", { name: "保存设置" }).click();
  await expect(page.getByRole("form", { name: "作业发布设置" }).getByRole("status", { name: "作业保存结果" })).toContainText("设置已保存");
  await page.getByRole("textbox", { name: "作业名称" }).fill(" ");
  await page.getByRole("button", { name: "保存设置" }).click();
  await expect(page.getByRole("textbox", { name: "作业名称" })).toBeFocused();
  await expect(page.getByText("请输入作业名称。", { exact: true })).toBeVisible();
});
test("existing field and G4 routes remain available", async ({ page }) => {
  for (const id of ["input", "select", "input-number", "typography", "item", "progress"]) {
    await page.goto(`/#${id}`);
    await expect(page.locator(`#${id}-title`)).toBeVisible();
  }
});

test("teaching filters apply course, score and only confirmed dates", async ({ page }) => {
  await page.goto("/#date-picker");
  const count = page.locator(".g5-filter-result strong");
  await expect(count).toHaveText("2");
  await page.getByRole("slider", { name: "筛选成绩下限", exact: true }).focus();
  await page.keyboard.press("Home");
  await expect(count).toHaveText("3");
  await page.getByRole("button", { name: "统计日期", exact: true }).click();
  const popup = page.locator(".rain-date-picker__popup");
  await popup.getByRole("button", { name: /^2026年10月12日/ }).first().click();
  await popup.getByRole("button", { name: /^2026年10月13日/ }).first().click();
  await expect(count).toHaveText("3");
  await popup.getByRole("button", { name: "确定", exact: true }).click();
  await expect(popup).toHaveCount(0); await expect(count).toHaveText("1");
  const course = page.getByRole("combobox", { name: "筛选课程", exact: true });
  await course.fill("设计"); await course.press("ArrowDown"); await course.press("Enter");
  await expect(count).toHaveText("0");
});


test("Combobox popup and Slider keep keyboard, runtime paint and reduced motion", async ({ page }, info) => {
  await page.goto("/#combobox");
  const input = page.getByRole("combobox", { name: "检索课程", exact: true });
  await input.click();
  const popup = page.locator(".rain-combobox__popup");
  await expect(popup).toBeVisible();
  await expect(popup).toHaveCSS("transition-duration", "0.18s, 0.18s");
  await expect(popup).toHaveCSS("opacity", "1");
  const field = input.locator('xpath=ancestor::*[@data-rain-id="ui-combobox"]');
  expect(Math.abs((await popup.boundingBox())!.width - (await field.boundingBox())!.width)).toBeLessThanOrEqual(1);
  await popup.screenshot({ path: `${evidence}/combobox-popup-${info.project.name}.png` });
  await expect(page.getByRole("button", { name: "清除检索课程" })).toBeVisible();
  await page.getByRole("button", { name: "清除检索课程" }).click();
  await expect(input).toBeFocused();
  await input.fill("设计"); await input.press("ArrowDown"); await input.press("Enter");
  await expect(input).toHaveValue("设计研究方法");
  await page.getByRole("button", { name: "深色", exact: true }).click();
  await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  await input.click();
  await expect(page.locator(".rain-combobox__positioner")).toHaveAttribute("data-rain-theme", "dark");
  await popup.screenshot({ path: `${evidence}/combobox-popup-${info.project.name}-dark.png` });
  await input.press("Escape");
  await expect(popup).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" }); await input.click();
  await expect(popup).toHaveCSS("transition-duration", "0s");
  await input.press("Escape"); await expect(popup).toHaveCount(0);
  const retryInput = page.getByRole("combobox", { name: "重试课程", exact: true });
  await retryInput.click();
  const retry = popup.getByRole("button", { name: "重试", exact: true });
  await expect(retry.locator('[data-icon="icon/refresh"]')).toBeVisible();
  await popup.screenshot({ path: `${evidence}/combobox-retry-${info.project.name}.png` });
  await retry.click();
  await expect(retryInput).toBeFocused();
  await expect(popup.getByRole("alert")).toHaveCount(0);
  await retryInput.press("Escape");
  await page.goto("/#slider");
  const slider = page.getByRole("slider", { name: "调整及格线", exact: true });
  await slider.focus(); await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveAttribute("aria-valuenow", "61");
  await expect(page.getByRole("spinbutton", { name: "精确及格线" })).toHaveValue("61");
  const thumb = page.locator('.rain-slider__thumb').first();
  await expect(thumb).toHaveCSS("transition-duration", "0s");
  const bounds = await slider.boundingBox(); expect(bounds!.width).toBeGreaterThan(0);
  await thumb.screenshot({ path: `${evidence}/slider-thumb-${info.project.name}-reduced.png` });
});

test("DatePicker nested in Dialog and Sheet closes only the active layer and restores focus", async ({ page }, info) => {
  await page.goto("/#date-picker");
  for (const [openName, title, fieldLabel] of [["对话框设置日期", "作业日期设置", "对话框截止日期"], ["侧栏设置时间", "作业时间设置", "侧栏截止时间"]]) {
    const trigger = page.getByRole("button", { name: openName, exact: true });
    await trigger.click();
    const outer = page.getByRole("dialog", { name: title, exact: true });
    await expect(outer).toBeVisible();
    await expect(outer.getByRole("button", { name: /^完成.*设置$/ })).toHaveAttribute("data-variant", "primary");
    const dateTrigger = outer.getByRole("button", { name: fieldLabel, exact: true });
    await dateTrigger.click();
    const popup = page.locator(".rain-date-picker__popup");
    await expect(popup).toBeVisible();
    await popup.screenshot({ path: `${evidence}/nested-${title}-${info.project.name}.png` });
    const year = popup.getByRole("combobox", { name: "选择年份", exact: true });
    await year.click();
    await expect(page.getByRole("listbox")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("listbox")).toHaveCount(0);
    await expect(year).toBeFocused();
    await expect(popup).toBeVisible(); await expect(outer).toBeVisible();
    const confirm = popup.getByRole("button", { name: "确定", exact: true });
    await confirm.scrollIntoViewIfNeeded(); await expect(confirm).toBeInViewport();
    await confirm.click();
    await expect(popup).toHaveCount(0); await expect(outer).toBeVisible();
    await expect(dateTrigger).toBeFocused(); await dateTrigger.click();
    await page.keyboard.press("Escape");
    await expect(popup).toHaveCount(0); await expect(outer).toBeVisible();
    await expect(dateTrigger).toBeFocused();
    await outer.screenshot({ path: `${evidence}/completed-${title}-${info.project.name}.png` });
    await page.keyboard.press("Escape");
    await expect(outer).toHaveCount(0); await expect(trigger).toBeFocused();
  }
});
