import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const evidence = resolve(process.env.RAIN_SELECTION_PLAYGROUND_EVIDENCE_DIR ?? "evidence/runtime/selection-playground");
test.beforeEach(async ({ page }) => {
  mkdirSync(evidence, { recursive: true });
  await page.goto("/#selection-playground");
  await expect(page.getByRole("heading", { name: "选择 Playground", exact: true })).toBeVisible();
});

test("SC-04 editing, keyboard classification and real-source lookup preserve stable identities", async ({ page }) => {
  await page.getByRole("button", { name: "选择项", exact: true }).focus(); await page.keyboard.press("Space");
  await expect(page.getByRole("button", { name: "选择项", exact: true })).toHaveAttribute("aria-pressed", "true");
  const title = page.getByRole("textbox", { name: "第一项标题", exact: true });
  await title.fill("");
  const group = page.getByRole("radiogroup", { name: "单项选择", exact: true });
  await expect(group.getByRole("radio", { name: "未命名选项", exact: true })).toBeChecked();
  await title.fill("新的课程模板");
  await page.getByRole("textbox", { name: "第一项说明", exact: true }).fill("替换后的说明");
  await expect(group.getByRole("radio", { name: "新的课程模板", exact: true })).toHaveAttribute("value", "first");
  await expect(group.getByRole("radio", { name: "新的课程模板", exact: true })).toHaveAccessibleDescription("替换后的说明");
  await page.getByRole("radio", { name: "错误提示", exact: true }).locator("..").click();
  await expect(group).toHaveAttribute("aria-invalid", "true");
  await page.getByRole("radio", { name: "禁用", exact: true }).locator("..").click();
  await expect(group.getByRole("radio", { name: "新的课程模板", exact: true })).toBeDisabled();
  await title.fill("另一个选项");
  const identity = await page.getByRole("form", { name: "选择工作台", exact: true }).evaluate((form) => ({
    ids: [...form.querySelectorAll("[id]")].map((node) => node.id),
    values: [...form.querySelectorAll<HTMLInputElement>('input[type="radio"]')].map((input) => input.value),
    readonly: form.querySelectorAll("input[readonly]").length,
    resolvedLabels: [...form.querySelectorAll("input")].every((input) => input.getAttribute("aria-labelledby")!.split(" ").every((id) => document.getElementById(id))),
  }));
  expect(new Set(identity.ids).size).toBe(identity.ids.length); expect(identity.values).toEqual(["first", "second"]);
  expect(identity.readonly).toBe(0); expect(identity.resolvedLabels).toBe(true);
  await page.getByText("查找源码与使用边界", { exact: true }).click();
  const search = page.getByRole("textbox", { name: "检索选择资产", exact: true });
  await search.fill("RadioPreviewCard");
  await expect(page.getByRole("heading", { name: "RadioPreviewCard", exact: true })).toBeVisible();
  await expect(page.getByText("找到 1 项资产", { exact: true })).toBeVisible();
  await search.fill("不存在的资产"); await expect(page.getByText("没有符合条件的资产。", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "返回组件", exact: true }).click();
  await page.getByRole("link", { name: "打开分类选择 Playground 与源码检索", exact: true }).click();
  await expect(page.getByRole("heading", { name: "选择 Playground", exact: true })).toBeFocused();
});

test("SC-04 modal target, finite mixed selection and active draft payload remain independent", async ({ page }) => {
  await page.getByRole("button", { name: "组合模式", exact: true }).click();
  const selected = page.getByRole("radio", { name: "课程项目方案", exact: true });
  const other = page.getByRole("radio", { name: "另一个选项", exact: true });
  const preview = page.getByRole("button", { name: "查看预览：另一个选项", exact: true });
  await selected.focus(); await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "查看预览：课程项目方案", exact: true })).toBeFocused();
  await page.keyboard.press("Tab"); await expect(preview).toBeFocused(); await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "另一个选项", exact: true })).toBeVisible();
  // The modal correctly hides its background from the accessibility tree.
  await expect(page.locator('input[name="workbench-preview"][value="first"]')).toBeChecked(); await expect(page.getByTestId("workbench-payload")).toHaveText("尚未读取提交数据");
  await expect(page.getByTestId("workbench-preview")).toContainText("second");
  await page.keyboard.press("Escape"); await expect(preview).toBeFocused();
  const all = page.getByRole("checkbox", { name: "全选当前演示范围", exact: true });
  await expect(all).toBeChecked({ indeterminate: true });
  await all.focus(); await page.keyboard.press("Space"); await expect(all).toBeChecked();
  await page.keyboard.press("Space"); await expect(all).not.toBeChecked();
  const note = page.getByRole("textbox", { name: "关联备注", exact: true });
  await note.fill("本次保留的备注"); await page.keyboard.press("ArrowLeft"); await expect(selected).toBeChecked();
  await other.locator("..").click(); await expect(note).not.toBeVisible();
  await page.getByRole("button", { name: "读取提交数据", exact: true }).click();
  await expect(page.getByTestId("workbench-payload")).not.toContainText("本次保留的备注");
  await selected.locator("..").click(); await expect(note).toHaveValue("本次保留的备注");
  await page.getByRole("button", { name: "读取提交数据", exact: true }).click();
  await expect(page.getByTestId("workbench-payload")).toContainText("本次保留的备注");
  await page.getByRole("radio", { name: "禁用", exact: true }).locator("..").click();
  await expect(selected).toBeDisabled(); await expect(all).toBeDisabled(); await expect(all).not.toBeChecked();
  await expect(preview).toBeEnabled(); await preview.click(); await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "读取提交数据", exact: true }).click();
  const payload = JSON.parse((await page.getByTestId("workbench-payload").textContent())!);
  expect(payload.radio).toBe("first"); expect(payload.native).toEqual({}); expect(payload.fields).toBeUndefined();
});

test("SC-04 four container widths, themes, density and 320px source paths remain readable", async ({ page, browser }) => {
  const errors: string[] = []; page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1600, height: 1100 });
  const main = page.locator('[data-rain-id="selection-playground-page"]');
  await page.getByRole("button", { name: "选择卡片", exact: true }).click();
  await page.getByRole("textbox", { name: "第一项标题", exact: true }).fill("课程综合项目过程性评价与跨学科能力发展的完整评分方案");
  await page.getByRole("textbox", { name: "第一项说明", exact: true }).fill("通过观察项目准备、研究过程和最终展示，综合了解学生的学习投入、知识应用与团队协作情况。");
  const widths: unknown[] = [];
  for (const width of [296, 320, 564, 612]) {
    await page.getByRole("button", { name: `${width}px`, exact: true }).click();
    const facts = await page.getByRole("form", { name: "选择工作台", exact: true }).evaluate((form) => ({
      width: form.getBoundingClientRect().width, scrollWidth: form.scrollWidth, clientWidth: form.clientWidth,
      cards: Array.from(form.querySelectorAll<HTMLElement>('.rain-selection-card')).map((card) => ({ width: card.getBoundingClientRect().width, scroll: card.scrollWidth, client: card.clientWidth })),
    }));
    expect(facts.width).toBe(width); expect(facts.scrollWidth).toBeLessThanOrEqual(facts.clientWidth);
    for (const card of facts.cards) expect(card.scroll).toBeLessThanOrEqual(card.client);
    widths.push(facts);
  }
  const themes: unknown[] = [];
  for (const theme of ["light", "dark"] as const) {
    await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    await page.evaluate(() => Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => {}))));
    themes.push(await main.evaluate((node) => ({ theme: node.getAttribute("data-rain-theme"), font: getComputedStyle(node).fontFamily, color: getComputedStyle(node).color, background: getComputedStyle(node).backgroundColor })));
    await main.screenshot({ path: resolve(evidence, `${theme}.png`) });
  }
  await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  await expect(page.locator('.rain-selection-card').first()).toHaveAttribute("data-density", "compact");
  await main.screenshot({ path: resolve(evidence, "compact.png") });
  await page.setViewportSize({ width: 320, height: 800 });
  await page.getByText("查找源码与使用边界", { exact: true }).click();
  await page.getByRole("textbox", { name: "检索选择资产", exact: true }).fill("independent");
  await page.getByText("来源、依赖与验收范围", { exact: true }).click();
  const narrow = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
  expect(narrow.document).toBe(320);
  await main.screenshot({ path: resolve(evidence, "narrow.png") });
  expect(errors).toEqual([]);
  writeFileSync(resolve(evidence, "browser-facts.json"), JSON.stringify({ verifiedAt: new Date().toISOString(), browserVersion: browser.version(), platform: await page.evaluate(() => navigator.platform), headless: "@base-ui/react 1.8.0", widths, themes, narrow, errors, assistiveTechnology: "not-run", humanGate: "awaiting_human" }, null, 2));
});

test("SC-04 long unbroken preview titles wrap and scroll while the close action stays reachable", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.getByRole("button", { name: "组合模式", exact: true }).click();
  const title = "CourseTemplate".repeat(120);
  await page.getByRole("textbox", { name: "第一项标题", exact: true }).fill(title);
  const trigger = page.getByRole("button", { name: `查看预览：${title}`, exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: title, exact: true });
  const heading = dialog.getByRole("heading", { name: title, exact: true });
  await expect(heading).toBeFocused(); await expect(heading).toHaveText(title);
  const text = await heading.evaluate((node) => ({ scroll: node.scrollWidth, width: node.clientWidth }));
  expect(text.scroll).toBeLessThanOrEqual(text.width);
  const header = dialog.locator("header");
  await page.keyboard.press("PageDown");
  await expect.poll(() => header.evaluate((node) => node.scrollTop)).toBeGreaterThan(0);
  const close = dialog.getByRole("button", { name: "关闭预览", exact: true });
  const rect = await close.boundingBox(); expect(rect!.y + rect!.height).toBeLessThanOrEqual(720);
  await dialog.screenshot({ path: resolve(evidence, "long-preview.png") });
  await close.click(); await expect(trigger).toBeFocused();
});

test("SC-04 forced colors, reduced motion and touch retain working selection and preview", async ({ page, browser, baseURL }) => {
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.getByRole("button", { name: "组合模式", exact: true }).click();
  const all = page.getByRole("checkbox", { name: "全选当前演示范围", exact: true });
  await all.focus(); await page.keyboard.press("Space"); await expect(all).toBeChecked();
  await page.locator('[data-rain-id="selection-playground-page"]').screenshot({ path: resolve(evidence, "forced-colors.png") });
  const touch = await browser.newContext({ baseURL, hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  try {
    const mobile = await touch.newPage(); await mobile.goto("/#selection-playground");
    await mobile.getByRole("button", { name: "组合模式", exact: true }).tap();
    await mobile.getByRole("button", { name: "查看预览：另一个选项", exact: true }).tap();
    await expect(mobile.getByRole("dialog", { name: "另一个选项", exact: true })).toBeVisible();
    await mobile.getByRole("button", { name: "关闭预览", exact: true }).tap();
    await expect(mobile.getByRole("radio", { name: "课程项目方案", exact: true })).toBeChecked();
  } finally { await touch.close(); }
});
