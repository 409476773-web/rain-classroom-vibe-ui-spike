import { expect, test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { measureColorContrast } from "../../packages/foundations/src/color-registry";

const evidence = resolve(process.env.RAIN_SELECTION_PATTERNS_EVIDENCE_DIR ?? "evidence/runtime/selection-patterns");
const main = (page: Page) => page.locator('[data-rain-id="selection-patterns-page"]');
const choose = async (page: Page, name: string) => page.getByRole("radio", { name, exact: true }).locator("..").click();
test.beforeEach(async ({ page }) => {
  mkdirSync(evidence, { recursive: true });
  await page.goto("/#selection-patterns");
  await expect(page.getByRole("heading", { name: "选择组合", exact: true })).toBeVisible();
});

test("SEL-010/011/013/014/035: preview is independent, reachable and never submits", async ({ page }) => {
  const group = page.getByRole("radiogroup", { name: "评分模板", exact: true });
  const selected = group.getByRole("radio", { name: "实验报告量规", exact: true });
  const first = group.getByRole("button", { name: "查看预览：实验报告量规" });
  const second = group.getByRole("button", { name: "查看预览：课程项目量规" });
  await selected.focus(); await page.keyboard.press("Tab"); await expect(first).toBeFocused();
  await page.keyboard.press("Tab"); await expect(second).toBeFocused();
  await page.keyboard.press("Shift+Tab"); await expect(first).toBeFocused();
  await page.keyboard.press("Tab"); await page.keyboard.press("ArrowDown"); await expect(selected).toBeChecked();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "课程项目量规" });
  await expect(dialog).toBeVisible(); await expect(dialog.getByRole("heading", { name: "课程项目量规" })).toBeFocused();
  await expect(page.getByTestId("preview-selection")).toHaveText("当前选择：实验报告量规");
  await expect(page.getByTestId("preview-submitted")).toContainText("尚未读取");
  // Base UI returns focus from its boundary guard on the next animation frame.
  for (let i = 0; i < 5; i++) { await page.keyboard.press("Tab"); await expect.poll(() => dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true); }
  await page.keyboard.press("Escape"); await expect(dialog).not.toBeVisible(); await expect(second).toBeFocused();
  await second.click(); await page.getByRole("button", { name: "关闭预览" }).click(); await expect(second).toBeFocused();
  await second.click(); await page.locator(".rain-selection-preview__backdrop").click({ position: { x: 4, y: 4 } }); await expect(dialog).not.toBeVisible();
  await expect(selected).toBeChecked(); await expect(page.getByTestId("preview-submitted")).toContainText("尚未读取");
  await choose(page, "课程项目量规"); await page.getByRole("button", { name: "取消选择修改" }).click();
  await expect(selected).toBeChecked(); await expect(page.getByTestId("preview-submitted")).toContainText("尚未读取");
  expect(await main(page).locator('.rain-selection-card label button, .rain-selection-card label a, .rain-selection-card label input:not([type="radio"]):not([type="checkbox"])').count()).toBe(0);
});

test("SEL-012/016: removed triggers have a fallback and disabled selections retain usable help", async ({ page }) => {
  const previewButton = page.getByRole("button", { name: "查看预览：课程项目量规" });
  await previewButton.click();
  await page.getByText("预览入口变化演示", { exact: true }).click();
  await page.getByRole("button", { name: "模拟移除预览入口" }).click();
  await expect(previewButton).toHaveCount(0);
  await page.getByRole("button", { name: "关闭预览" }).click();
  await expect(page.getByRole("heading", { name: "先预览，再选择", exact: true })).toBeFocused();
  await expect(page.getByTestId("preview-selection")).toHaveText("当前选择：实验报告量规");
  const unavailable = page.getByRole("radio", { name: "归档模板", exact: true });
  await expect(unavailable).toBeDisabled(); await unavailable.locator("..").click({ force: true }); await expect(unavailable).not.toBeChecked();
  const help = page.getByRole("button", { name: "查看原因：归档模板" });
  await help.focus(); await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "归档模板" })).toContainText("已有评分记录仍然保留");
  await page.keyboard.press("Escape"); await expect(help).toBeFocused();
  await expect(page.getByTestId("preview-submitted")).toContainText("尚未读取");
});

test("SEL-014/020/021/022/035: active fields validate and submit, inactive drafts are retained and excluded", async ({ page }) => {
  const limited = page.getByRole("radio", { name: "限制次数", exact: true });
  await choose(page, "限制次数"); await expect(limited).toBeFocused();
  const input = page.getByRole("textbox", { name: "最多作答次数" });
  await page.keyboard.press("Tab"); await expect(input).toBeFocused();
  await input.fill("12"); await page.keyboard.press("ArrowLeft");
  expect(await input.evaluate((node: HTMLInputElement) => node.selectionStart)).toBe(1);
  await page.keyboard.press("ArrowDown"); await expect(limited).toBeChecked();
  await input.fill("0"); await page.getByRole("button", { name: "读取作答设置" }).click();
  await expect(input).toHaveAttribute("aria-invalid", "true"); await expect(input).toBeFocused();
  await expect(page.getByTestId("dependent-payload")).toContainText("尚未读取");
  await choose(page, "不限次数");
  await expect(input).not.toBeVisible(); await expect(page.getByRole("form", { name: "关联字段示例" }).locator('input[name="attempts"]')).toBeDisabled();
  const native = await page.getByRole("form", { name: "关联字段示例" }).evaluate((form: HTMLFormElement) => ({ valid: form.checkValidity(), entries: [...new FormData(form)] }));
  expect(native).toEqual({ valid: true, entries: [["attempt-mode", "unlimited"]] });
  await page.getByRole("button", { name: "读取作答设置" }).click();
  await expect(page.getByTestId("dependent-payload")).toHaveText('当前提交数据：{"mode":"unlimited"}');
  await choose(page, "限制次数"); await expect(input).toHaveValue("0");
  await input.fill("12"); await page.getByRole("button", { name: "读取作答设置" }).click();
  await expect(page.getByTestId("dependent-payload")).toHaveText('当前提交数据：{"mode":"limited","attempts":12}');
  await page.getByRole("button", { name: "恢复默认设置" }).click();
  await expect(page.getByRole("radio", { name: "不限次数", exact: true })).toBeChecked();
  await choose(page, "限制次数"); await expect(input).toHaveValue("3");
});

test("SEL-006/015/018/024/025: page selection preserves locked and other pages through search and pagination", async ({ page }) => {
  const all = page.getByRole("checkbox", { name: "全选本页可修改课程", exact: true });
  await expect(all).toBeChecked({ indeterminate: true }); expect(await all.getAttribute("name")).toBeNull();
  await all.locator("..").click(); await expect(all).toBeChecked();
  await expect(page.getByTestId("page-selected")).toContainText("累计选择 4 门");
  await all.locator("..").click(); await expect(all).not.toBeChecked();
  await expect(page.getByTestId("page-selected")).toHaveText("累计选择 2 门：公共实验安全、学术英语");
  await page.getByText("查看提交数据与范围说明", { exact: true }).click();
  await page.getByRole("button", { name: "读取课程选择" }).click();
  await expect(page.getByTestId("page-payload")).toHaveText('业务提交：["shared","english"]');
  await expect(page.getByTestId("page-native")).toHaveText("原生表单：[]");
  await page.getByRole("button", { name: "下一页" }).click(); await expect(all).toBeChecked({ indeterminate: true });
  await all.locator("..").click(); await expect(all).toBeChecked();
  await page.getByRole("button", { name: "读取课程选择" }).click();
  await expect(page.getByTestId("page-payload")).toHaveText('业务提交：["shared","english","calculus"]');
  await expect(page.getByTestId("page-native")).toHaveText('原生表单：["english","calculus"]');
  await page.getByRole("button", { name: "上一页" }).click(); await expect(all).not.toBeChecked();
  const search = page.getByRole("textbox", { name: "搜索课程" });
  await search.fill("大学"); await expect(page.getByTestId("page-scope")).toContainText("「大学」搜索结果");
  await all.locator("..").click(); await expect(page.getByTestId("page-selected")).toContainText("累计选择 4 门");
  await search.fill("不存在的课程"); await expect(all).toBeDisabled(); await expect(all).not.toBeChecked();
  await page.getByRole("button", { name: "清除搜索课程" }).click();
  await expect(all).toBeChecked({ indeterminate: true });
  await page.getByRole("button", { name: "恢复初始课程" }).click();
  await expect(page.getByTestId("page-selected")).toHaveText("累计选择 3 门：大学物理实验、公共实验安全、学术英语");
});

test("SEL-005/023: all-locked and unknown scopes are disabled/unchecked, never mixed", async ({ page }) => {
  const all = page.getByRole("checkbox", { name: "全选本页可修改课程", exact: true });
  await page.getByRole("textbox", { name: "搜索课程" }).fill("公共实验");
  await expect(page.getByRole("checkbox", { name: "公共实验安全", exact: true })).toBeChecked();
  await expect(all).toBeDisabled(); await expect(all).not.toBeChecked();
  expect(await all.evaluate((input: HTMLInputElement) => input.indeterminate)).toBe(false);
  await page.getByRole("button", { name: "清除搜索课程" }).click();
  await page.getByText("查看提交数据与范围说明", { exact: true }).click();
  await page.getByRole("checkbox", { name: "模拟加载中", exact: true }).locator("..").click();
  await expect(all).toBeDisabled(); await expect(all).not.toBeChecked();
  expect(await all.evaluate((input: HTMLInputElement) => input.indeterminate)).toBe(false);
  await expect(page.locator('[data-rain-id="pattern-page-selection"]')).toHaveAttribute("aria-busy", "true");
  await page.getByRole("checkbox", { name: "模拟加载中", exact: true }).locator("..").click();
  await expect(all).toBeChecked({ indeterminate: true });
});

test("Light/Dark/compact/narrow: themed portal, readable new text and no horizontal overflow", async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1600, height: 1100 }); await page.evaluate(() => document.fonts.ready);
  await choose(page, "限制次数");
  const facts: Record<string, unknown> = { browserName, browserVersion: page.context().browser()?.version(), viewport: page.viewportSize() };
  for (const theme of ["light", "dark"] as const) {
    await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    await page.evaluate(() => Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => {}))));
    await main(page).screenshot({ path: resolve(evidence, `${theme}.png`) });
    await page.getByRole("button", { name: "查看预览：实验报告量规" }).click();
    const dialog = page.getByRole("dialog", { name: "实验报告量规" });
    await expect(dialog).toHaveAttribute("data-rain-theme", theme);
    const measured = await dialog.evaluate((node) => {
      const style = getComputedStyle(node), rect = node.getBoundingClientRect();
      return { theme: node.getAttribute("data-rain-theme"), background: style.backgroundColor, color: style.color, font: style.fontFamily, shadow: style.boxShadow,
        width: rect.width, height: rect.height, scrollWidth: node.scrollWidth, clientWidth: node.clientWidth,
        texts: Array.from(node.querySelectorAll<HTMLElement>('h2, [data-slot="description"], dt, dd')).map((text) => ({ text: text.textContent, color: getComputedStyle(text).color, size: getComputedStyle(text).fontSize })),
      };
    });
    const rgb = (value: string) => value.match(/[\d.]+/g)!.slice(0, 3).map(Number) as [number, number, number];
    const contrast = measured.texts.map((text) => ({ ...text, ratio: measureColorContrast({ rgb: rgb(text.color), alpha: 1 }, { rgb: rgb(measured.background), alpha: 1 }) }));
    for (const text of contrast) expect(text.ratio, `${theme}: ${text.text}`).toBeGreaterThanOrEqual(4.5);
    expect(measured.font).toContain("PingFang SC"); expect(measured.shadow).not.toBe("none");
    facts[theme] = { ...measured, texts: contrast };
    await dialog.screenshot({ path: resolve(evidence, `preview-${theme}.png`) });
    await page.getByRole("button", { name: "关闭预览" }).click();
  }
  await page.getByRole("button", { name: "浅色", exact: true }).click();
  await page.getByRole("button", { name: "紧凑密度" }).click();
  await main(page).screenshot({ path: resolve(evidence, "compact.png") });
  await page.getByRole("button", { name: "查看预览：实验报告量规" }).click();
  await expect(page.getByRole("dialog")).toHaveAttribute("data-density", "compact"); await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 320, height: 720 });
  await main(page).screenshot({ path: resolve(evidence, "narrow.png") });
  facts.narrow = await main(page).evaluate((node) => ({ width: node.getBoundingClientRect().width, scrollWidth: node.scrollWidth, clientWidth: node.clientWidth, documentWidth: document.documentElement.scrollWidth, viewport: innerWidth }));
  expect((facts.narrow as { documentWidth: number }).documentWidth).toBeLessThanOrEqual(320);
  await page.getByRole("button", { name: "查看预览：实验报告量规" }).click();
  const narrow = page.getByRole("dialog");
  const bounds = await narrow.boundingBox(); expect(bounds!.x).toBeGreaterThanOrEqual(16); expect(bounds!.width).toBeLessThanOrEqual(288);
  expect(bounds!.height).toBeLessThanOrEqual(688);
  await narrow.locator('[data-slot="body"]').evaluate((node) => { node.scrollTop = node.scrollHeight; });
  await expect(page.getByRole("button", { name: "关闭预览" })).toBeInViewport();
  writeFileSync(resolve(evidence, "browser-facts.json"), JSON.stringify(facts, null, 2));
});

test("custom inactive fields cannot select the containing card", async ({ page }) => {
  const card = page.getByRole("radio", { name: "限制次数", exact: true }).locator("../..");
  const neutral = await card.evaluate((node) => getComputedStyle(node).borderTopColor);
  // Composition probe: a consumer may retain a checked Checkbox draft in this public fields slot.
  await card.locator('[data-rain-id="pattern-dependent-fields"]').evaluate((fields) => {
    const draft = document.createElement("input"); draft.type = "checkbox"; draft.checked = true; fields.append(draft);
  });
  await expect(card).toHaveCSS("border-top-color", neutral);
  await expect(card).toHaveCSS("background-image", "none");
  await expect(page.getByRole("radio", { name: "限制次数", exact: true })).not.toBeChecked();
});

test("forced colors, reduced motion and touch retain selection and modal operation", async ({ page, browser, baseURL }) => {
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  const limited = page.getByRole("radio", { name: "限制次数", exact: true });
  const enabledBorder = await limited.locator("..").locator('[data-slot="control"]').evaluate((node) => getComputedStyle(node).borderTopColor);
  await expect(limited.locator("../..")).toHaveCSS("border-top-color", enabledBorder);
  const all = page.getByRole("checkbox", { name: "全选本页可修改课程", exact: true });
  await all.focus(); await page.keyboard.press("Space"); await expect(all).toBeChecked();
  await main(page).screenshot({ path: resolve(evidence, "forced-colors.png") });
  await page.getByRole("button", { name: "查看预览：课程项目量规" }).click();
  const colors = await page.getByRole("dialog").evaluate((node) => ({ text: getComputedStyle(node).color, background: getComputedStyle(node).backgroundColor, border: getComputedStyle(node).borderTopColor }));
  expect(colors.text).not.toBe(colors.background); expect(colors.border).not.toBe(colors.background);
  await page.keyboard.press("Escape");
  const touch = await browser.newContext({ baseURL, hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  const mobile = await touch.newPage();
  try {
    await mobile.goto("/#selection-patterns");
    const trigger = mobile.getByRole("button", { name: "查看预览：课程项目量规" });
    await trigger.tap(); await expect(mobile.getByRole("dialog", { name: "课程项目量规" })).toBeVisible();
    await mobile.getByRole("button", { name: "关闭预览" }).tap();
    await expect(mobile.getByRole("radio", { name: "实验报告量规", exact: true })).toBeChecked();
    await mobile.getByRole("checkbox", { name: "全选本页可修改课程", exact: true }).locator("..").tap();
    await expect(mobile.getByTestId("page-selected")).toContainText("累计选择 4 门");
  } finally { await touch.close(); }
});
