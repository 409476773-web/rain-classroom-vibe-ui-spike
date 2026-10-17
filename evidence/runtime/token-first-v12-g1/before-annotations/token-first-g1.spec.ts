import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { contrastRatio } from "./color-contrast";
const url = process.env.RAIN_V12_URL ?? "http://127.0.0.1:5369";
const evidence = `evidence/runtime/token-first-v12-g1/browser-${process.env.RAIN_V12_RUN ?? Date.now()}`;
test.beforeAll(() => mkdirSync(evidence, { recursive: true }));

test("G1 rendered text, control boundaries, focus and native accessibility modes", async ({ page }) => {
  expect(contrastRatio("color(srgb 1 1 1)", "rgb(0, 0, 0)")).toBe(21);
  await page.goto(`${url}/#token-first-g1`);
  await page.getByRole("button", { name: "示例作答", exact: true }).first().click();
  const readings: unknown[] = [];
  for (const theme of ["light", "dark"]) {
    if (theme === "dark") await page.getByRole("button", { name: "切换深色" }).click();
    const colors = await page.evaluate(() => {
      const styles = (s: string) => getComputedStyle(document.querySelector(s)!);
      const surface = styles('.g1-toolbar-sample').backgroundColor;
      return [
        ...['.rain-g1-alert-warning', '.rain-g1-alert-destructive', '.g1-toolbar .rain-button'].map(selector => ({ selector, foreground: styles(selector).color, background: styles(selector).backgroundColor, surface, minimum: 4.5 })),
        { selector: 'field text', foreground: styles('.rain-input__control').color, background: styles('.rain-field-frame').backgroundColor, surface, minimum: 4.5 },
        { selector: 'field boundary', foreground: styles('.rain-field-frame').borderTopColor, background: surface, surface, minimum: 3 },
        { selector: 'switch boundary', foreground: styles('.rain-g1-switch').borderTopColor, background: surface, surface, minimum: 3 },
        { selector: 'switch thumb', foreground: styles('.rain-g1-switch-thumb').backgroundColor, background: styles('.rain-g1-switch').backgroundColor, surface, minimum: 3 },
        { selector: 'switch label', foreground: styles('.g1-switch-label').color, background: surface, surface, minimum: 4.5 },
        ...['.g1-card-grid .g1-support', '.g1-card-focus p', '.g1-example .g1-answer'].map(selector => ({ selector, foreground: styles(selector).color, background: styles('.g1-card-grid').backgroundColor, surface: styles('.g1-cards > article').backgroundColor, minimum: 4.5 })),
      ];
    });
    for (const color of colors) {
      const ratio = contrastRatio(color.foreground, color.background, color.surface);
      readings.push({ theme, ...color, ratio });
      expect(ratio, `${theme}: ${color.selector}`).toBeGreaterThanOrEqual(color.minimum);
    }
    const toggle = page.getByRole('switch', { name: '仅看待批改' }).first();
    await page.getByRole('textbox', { name: '查找作答' }).first().press('ArrowRight');
    await expect(page.locator('.rain-field-frame').first()).toHaveCSS('outline-width', '2px');
    await toggle.press('Space');
    const focus = await toggle.evaluate(el => ({ outline: getComputedStyle(el).outlineColor, width: getComputedStyle(el).outlineWidth, surface: getComputedStyle(el.closest('.g1-toolbar-sample')!).backgroundColor }));
    expect(focus.width).toBe('2px');
    expect(contrastRatio(focus.outline, focus.surface)).toBeGreaterThanOrEqual(3);
    readings.push({ theme, focus });
    await toggle.press('Space');
  }
  await page.emulateMedia({ reducedMotion: 'reduce', forcedColors: 'active' });
  await expect(page.locator('.rain-g1-switch-thumb').first()).toHaveCSS('transition-duration', '0s');
  const toggle = page.getByRole('switch', { name: '仅看待批改' }).first();
  await toggle.press('Space'); await expect(toggle).toHaveAttribute('aria-checked', 'true');
  await page.screenshot({ path: `${evidence}/forced-colors.png`, fullPage: true });
  writeFileSync(`${evidence}/rendered-contrast.json`, JSON.stringify(readings, null, 2));
});

test("G1 toolbar dimensions, filtering, keyboard and sibling isolation", async ({ page }) => {
  await page.goto(`${url}/#token-first-g1`);
  const toolbar = page.getByRole("region", { name: "default 工具栏" });
  const sibling = page.getByRole("region", { name: "sibling 工具栏" });
  await expect(toolbar.getByRole("tab")).toHaveText(["A 卷", "B 卷"]);
  await expect(toolbar.getByRole("combobox")).toHaveCount(0);
  await expect(toolbar.locator("label").filter({ hasText: "查找作答" })).toHaveCount(0);
  await expect(toolbar.locator('[data-icon="icon/search"]')).toHaveCount(1);
  await expect(toolbar.locator('.g1-switch-label')).toHaveCSS('gap', '6px');
  expect((await toolbar.getByRole("tablist").boundingBox())!.x).toBeLessThan((await toolbar.getByRole("textbox").boundingBox())!.x);
  await toolbar.getByRole("textbox").fill("实验");
  await expect(toolbar.getByRole("status")).toContainText("6 份作答");
  await expect(sibling.getByRole("status")).toContainText("18 份作答");
  await toolbar.getByRole("switch").press("Space");
  await expect(toolbar.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  await expect(toolbar.getByRole("status")).toContainText("5 份作答");
  await toolbar.getByRole("textbox").fill("不存在的对象");
  await expect(toolbar.getByRole("status")).toContainText("没有匹配结果");
  await toolbar.getByRole("button", { name: "恢复条件" }).click();
  await toolbar.getByRole("tab", { name: "B 卷" }).press("Enter");
  await expect(toolbar.getByRole("tab", { name: "B 卷" })).toHaveAttribute("aria-selected", "true");
  await expect(sibling.getByRole("tab", { name: "A 卷" })).toHaveAttribute("aria-selected", "true");
  await expect(toolbar.getByRole("tabpanel")).toHaveAccessibleName("B 卷");
  const geometry = await toolbar.evaluate(el => [...el.querySelectorAll('.rain-input, [role="tab"], .g1-toolbar > button')].filter(e => e.getBoundingClientRect().height > 0).map(e => ({ role: e.getAttribute("role") || e.tagName, height: e.getBoundingClientRect().height })));
  expect(geometry.length).toBeGreaterThanOrEqual(3);
  for (const box of geometry) expect(box.height).toBe(box.role === "tab" ? 32 : 36);
  await toolbar.getByRole("switch").press("Tab");
  expect(await page.locator(":focus-visible").count()).toBe(1);
  await page.screenshot({ path: `${evidence}/samples-first.png`, fullPage: true });
  writeFileSync(`${evidence}/geometry.json`, JSON.stringify(geometry, null, 2));
});

test("G1 cards, local menu paint, nested portal, dynamic theme and focus return", async ({ page }) => {
  await page.goto(`${url}/#token-first-g1`);
  const cards = page.locator('.g1-cards > article');
  const paints = await cards.evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor));
  expect(paints[0]).toBe(paints[2]); expect(paints[1]).not.toBe(paints[0]);
  await cards.nth(1).getByRole("button", { name: "更多操作" }).click();
  await expect(page.getByRole("menu")).toHaveCSS("background-color", paints[1]!);
  await page.getByRole("menuitem", { name: "标记为复核", exact: true }).click();
  await expect(cards.nth(1).getByRole("status")).toContainText("已标记复核");
  await expect(cards.nth(2).getByRole("status")).toHaveCount(0);
  const rubric = cards.first().getByRole("button", { name: "评分细则" });
  await rubric.press("Enter");
  const rules = page.getByRole("dialog", { name: "评分细则" });
  await expect(rules.getByText(/研究对象与现象说明/)).toBeVisible();
  await page.screenshot({ path: `${evidence}/rubric-dialog.png`, fullPage: true });
  await rules.getByRole("button", { name: "长作答如何判断" }).click();
  await expect(rules.locator('[data-slot="accordion-trigger-icon"]:visible')).toHaveCount(1);
  await expect(rules.getByText(/不根据字数直接给分/)).toBeVisible();
  await page.keyboard.press("Escape"); await expect(rubric).toBeFocused();
  const answer = cards.first().getByRole("button", { name: "示例作答", exact: true });
  await expect(answer).toHaveAttribute("aria-expanded", "false");
  await answer.click(); await expect(answer).toHaveAttribute("aria-expanded", "true");
  await answer.click(); await expect(answer).toHaveAttribute("aria-expanded", "false");
  await expect(cards.first().getByText(/先明确研究对象/)).toBeHidden();
  await answer.press("Enter"); await expect(cards.first().getByText(/先明确研究对象/)).toBeVisible();
  for (const button of await cards.first().getByRole("button").all()) expect((await button.boundingBox())!.height).toBeLessThanOrEqual(28);
  const groupBox = (await cards.first().locator('.g1-card-grid').boundingBox())!;
  const answerBox = (await cards.first().locator('.g1-example').boundingBox())!;
  expect(answerBox.x).toBe(groupBox.x); expect(answerBox.width).toBe(groupBox.width);
  const titleX = await answer.locator('[data-slot="label"]').evaluate(el => el.getBoundingClientRect().x);
  const bodyX = await cards.first().locator('.g1-example .g1-answer').evaluate(el => el.getBoundingClientRect().x);
  expect(titleX).toBeCloseTo(bodyX, 0);
  await expect(answer.locator('.rain-icon')).toHaveCSS("transform", "matrix(-1, 0, 0, -1, 0, 0)");
  await page.screenshot({ path: `${evidence}/samples-expanded.png`, fullPage: true });
  const trigger = cards.first().getByRole("button", { name: "查看批改说明" });
  await page.setViewportSize({ width: 390, height: 844 });
  await trigger.click(); const dialog = page.getByRole("dialog");
  const box = await dialog.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  await expect(dialog).toHaveAttribute("data-rain-theme", "light");
  await dialog.getByRole("button", { name: "切换主题" }).click();
  await expect(dialog).toHaveAttribute("data-rain-theme", "dark");
  await dialog.getByRole("button", { name: "说明选项" }).click();
  await expect(page.getByRole("menu").locator("..")).toHaveAttribute("data-rain-theme", "dark");
  await page.screenshot({ path: `${evidence}/nested-dark.png`, fullPage: true });
  await page.keyboard.press("Escape"); await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "说明选项" })).toBeFocused();
  await page.keyboard.press("Escape"); await expect(dialog).toHaveCount(0); await expect(trigger).toBeFocused();
});

test("G1 built layouts: two directions each, narrow windows, chart data and fonts", async ({ page }) => {
  const errors: string[] = []; page.on("pageerror", e => errors.push(e.message));
  for (const view of ["workbench", "report"] as const) {
    await page.goto(`${url}/#token-first-${view}`);
    for (const direction of ["A", "B"]) {
      await page.getByRole("radio", { name: new RegExp(`^${direction} ·`) }).press("Space");
      for (const width of [1440, 900, 390]) {
        await page.setViewportSize({ width, height: 1000 });
        await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("font-size", "16px");
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
        await page.screenshot({ path: `${evidence}/${view}-${direction}-${width}.png`, fullPage: true });
      }
    }
    if (view === "report") { await expect(page.getByRole("table")).toContainText("79.9"); }
  }
  await page.goto(`${url}/#token-first-g1`);
  await page.getByRole("button", { name: "切换深色" }).click();
  await page.screenshot({ path: `${evidence}/samples-dark-390.png`, fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  const fonts = await page.evaluate(() => ({ ui: document.fonts.check('14px "PingFang SC"'), data: document.fonts.check('20px "LINE Seed JP App_OTF"'), actualUI: getComputedStyle(document.querySelector("h1")!).fontFamily, actualData: getComputedStyle(document.querySelector(".g1-score strong")!).fontFamily }));
  const client = await page.context().newCDPSession(page);
  await client.send("DOM.enable"); await client.send("CSS.enable");
  const { root } = await client.send("DOM.getDocument");
  const renderedFonts: Record<string, unknown> = {};
  for (const selector of [".g1 h1", ".g1-score strong"]) {
    const { nodeId } = await client.send("DOM.querySelector", { nodeId: root.nodeId, selector });
    renderedFonts[selector] = await client.send("CSS.getPlatformFontsForNode", { nodeId });
  }
  writeFileSync(`${evidence}/fonts-and-errors.json`, JSON.stringify({ fonts, renderedFonts, errors }, null, 2));
  expect(errors).toEqual([]);
});
