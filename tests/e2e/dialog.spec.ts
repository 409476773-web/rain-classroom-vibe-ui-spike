import { expect, test, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";

const editor = (page: Page) => page.getByRole("dialog", { name: "编辑课程资料", exact: true });
async function check(page: Page, name: string) {
  await page.getByRole("checkbox", { name }).focus(); await page.keyboard.press("Space");
  await expect(page.getByRole("checkbox", { name })).toBeChecked();
}
async function openEditor(page: Page) {
  await page.getByRole("button", { name: "编辑课程资料", exact: true }).click();
  await expect(editor(page)).toBeVisible();
  await expect.poll(() => editor(page).evaluate(el => el.getAnimations().length)).toBe(0);
  await expect(page.getByRole("textbox", { name: "课程名称" })).toBeFocused();
}

test("RO-01/02: modal focus, nested Select dismissal and trigger return", async ({ page }) => {
  await page.goto("/#dialog"); await openEditor(page);
  const popup = editor(page), select = popup.getByRole("combobox", { name: "教学方式" });
  await expect(popup).toHaveAccessibleDescription("调整课程名称与教学方式，保存后更新课程信息。");
  await expect(popup.locator("button button")).toHaveCount(0);
  await select.click(); await expect(page.getByRole("listbox")).toBeVisible();
  await page.keyboard.press("Escape"); await expect(page.getByRole("listbox")).toHaveCount(0);
  await expect(popup).toBeVisible(); await expect(select).toBeFocused();
  await select.click();
  await popup.getByRole("heading", { name: "编辑课程资料" }).click();
  await expect(page.getByRole("listbox")).toHaveCount(0); await expect(popup).toBeVisible();
  await popup.getByRole("button", { name: "保存更改" }).focus(); await page.keyboard.press("Tab");
  await expect(popup.getByRole("button", { name: "关闭编辑" })).toBeFocused();
  await page.keyboard.press("Escape"); await expect(popup).toHaveCount(0);
  await expect(page.getByRole("button", { name: "编辑课程资料", exact: true })).toBeFocused();
  await openEditor(page); await page.mouse.click(5, 5); await expect(popup).toBeVisible();
});

test("RO-04/05: validation, pending dismissal guard, failure, retry and cancel own separate values", async ({ page }) => {
  await page.goto("/#dialog"); await openEditor(page);
  const popup = editor(page), name = popup.getByRole("textbox", { name: "课程名称" });
  await name.fill("  "); await popup.getByRole("button", { name: "保存更改" }).click();
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toHaveAccessibleDescription("请输入课程名称"); await expect(name).toBeFocused();
  await name.fill("交互设计研讨"); await popup.getByRole("combobox", { name: "教学方式" }).click();
  await page.getByRole("option", { name: "实践课", exact: true }).click();
  await popup.getByRole("button", { name: "保存更改" }).dblclick();
  await expect(popup).toHaveAttribute("aria-busy", "true"); await expect(name).toBeDisabled();
  await expect(popup.getByRole("combobox", { name: "教学方式" })).toBeDisabled();
  await page.keyboard.press("Escape"); await page.mouse.click(5, 5); await expect(popup).toBeVisible();
  await expect(popup.getByRole("alert")).toHaveText("保存失败，当前内容已保留。请重试。");
  await expect(name).toHaveValue("交互设计研讨");
  await expect(page.locator('[data-slot="committed-name"]')).toHaveText("设计方法与实践");
  await popup.getByRole("button", { name: "重试保存" }).click(); await expect(popup).toHaveCount(0);
  await expect(page.locator('[data-slot="committed-name"]')).toHaveText("交互设计研讨");
  await expect(page.locator('[data-slot="committed-mode"]')).toHaveText("实践课");
  await openEditor(page); await name.fill("取消时不得提交"); await popup.getByRole("button", { name: "取消", exact: true }).click();
  await page.getByRole("button", { name: "放弃修改" }).click();
  await openEditor(page); await expect(name).toHaveValue("交互设计研讨");
});

for (const theme of ["light", "dark"] as const) for (const compact of [false, true]) {
  test(`RO-03/06: ${theme} ${compact ? "compact" : "default"} portal, paints and long-content geometry`, async ({ page }, info) => {
    await page.setViewportSize({ width: 1280, height: 800 }); await page.goto("/#dialog");
    if (theme === "dark") await check(page, "深色主题");
    if (compact) await check(page, "紧凑控件");
    await check(page, "长内容"); await openEditor(page);
    const popup = editor(page), body = popup.locator('[data-slot="body"]'), footer = popup.locator('[data-slot="footer"]');
    await expect(popup).toHaveAttribute("data-rain-theme", theme);
    await expect(popup).toHaveAttribute("data-density", compact ? "compact" : "default");
    await expect(popup.getByRole("textbox", { name: "课程名称" }).locator('xpath=ancestor::*[@data-rain-id="ui-input"]')).toHaveAttribute("data-size", compact ? "24" : "32");
    await expect(body).toHaveCSS("row-gap", "24px");
    await expect(popup.locator('[data-slot="header"]')).toHaveCSS("padding", "24px");
    await expect(footer).toHaveCSS("padding", "16px 24px");
    await expect(popup).toHaveCSS("border-width", "1px");
    await expect(popup).toHaveCSS("border-color", theme === "dark" ? "rgba(194, 212, 255, 0.1)" : "rgba(16, 63, 183, 0.16)");
    await expect(popup).toHaveCSS("width", "616px"); await expect(popup).toHaveCSS("border-radius", "10px");
    expect(await body.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
    const before = await footer.boundingBox(); await body.evaluate(el => { el.scrollTop = el.scrollHeight; });
    expect(await footer.boundingBox()).toEqual(before); expect(before!.y + before!.height).toBeLessThanOrEqual(784);
    await body.evaluate(el => { el.scrollTop = 0; });
    await popup.getByRole("combobox", { name: "教学方式" }).click();
    const list = page.getByRole("listbox"); await expect(list).toBeVisible();
    await expect(list.locator('xpath=ancestor-or-self::*[@data-rain-theme][1]')).toHaveAttribute("data-rain-theme", theme);
    const option = page.getByRole("option", { name: "讲授课", exact: true });
    expect(await option.evaluate(el => { const r = el.getBoundingClientRect(); return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)); })).toBe(true);
    await option.click();
    await popup.getByRole("button", { name: "保存更改" }).focus();
    await page.keyboard.press("Shift+Tab");
    await expect(popup.getByRole("button", { name: "取消", exact: true })).toBeFocused();
    const paints = await popup.evaluate(el => {
      const surface = getComputedStyle(el);
      return { background: surface.backgroundColor, border: surface.borderColor,
        text: [el, el.querySelector('[data-slot="title"]')!, el.querySelector('[data-slot="description"]')!].map(node => ({ color: getComputedStyle(node).color, font: getComputedStyle(node).fontFamily, size: getComputedStyle(node).fontSize })),
        footer: { background: getComputedStyle(el.querySelector('[data-slot="footer"]')!).backgroundColor,
          border: getComputedStyle(el.querySelector('[data-slot="footer"]')!).borderTopColor,
          color: getComputedStyle(el.querySelector('[data-slot="footer"]')!).color },
        focus: { color: getComputedStyle(document.activeElement!).outlineColor, width: getComputedStyle(document.activeElement!).outlineWidth, visible: document.activeElement!.matches(":focus-visible") } };
    });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
    const { root } = await cdp.send("DOM.getDocument");
    const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: '.rain-dialog [data-slot="title"]' });
    const fonts = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
    await cdp.detach();
    writeFileSync(info.outputPath(`paints-${theme}-${compact}.json`), JSON.stringify({ theme, compact, paints, fonts, userAgent: await page.evaluate(() => navigator.userAgent) }, null, 2));
    await page.screenshot({ path: info.outputPath(`dialog-${theme}-${compact}.png`) });
    // Live ancestor changes are explicitly synchronized into already open portals.
    await page.locator('[data-rain-id="dialog-page"]').evaluate(el => el.setAttribute("data-rain-theme", el.getAttribute("data-rain-theme") === "dark" ? "light" : "dark"));
    await expect(popup).toHaveAttribute("data-rain-theme", theme === "dark" ? "light" : "dark");
  });
}

test("RO-06: narrow viewport, forced colors, separator and nested dialog isolation", async ({ page }, info) => {
  await page.setViewportSize({ width: 375, height: 667 }); await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  await page.goto("/#dialog"); await check(page, "长内容"); await openEditor(page);
  const popup = editor(page), rect = await popup.boundingBox();
  expect(rect!.x).toBeGreaterThanOrEqual(16); expect(rect!.width).toBeLessThanOrEqual(343);
  const footer = await popup.locator('[data-slot="footer"]').boundingBox(); expect(footer!.y + footer!.height).toBeLessThanOrEqual(651);
  await expect(popup.getByRole("separator")).toHaveCSS("height", "1px");
  await page.screenshot({ path: info.outputPath("dialog-narrow-forced-colors.png") });
  await page.setViewportSize({ width: 320, height: 667 }); await page.emulateMedia({ forcedColors: "none" });
  await popup.getByRole("button", { name: "保存更改" }).click(); await expect(popup).toHaveAttribute("aria-busy", "true");
  const cancel = await popup.getByRole("button", { name: "取消", exact: true }).boundingBox();
  const save = await popup.getByRole("button", { name: "保存更改" }).boundingBox();
  const status = await popup.getByRole("status").boundingBox();
  expect(cancel!.y).toBe(save!.y); expect(save!.x + save!.width).toBeLessThanOrEqual(279);
  expect(status!.y + status!.height).toBeLessThan(cancel!.y);
  await page.screenshot({ path: info.outputPath("dialog-narrow-pending-group.png") });
  await expect(popup.getByRole("alert")).toBeVisible(); await page.keyboard.press("Escape");
  await expect(page.locator('.dialog-review-separators [data-rain-id="ui-separator"]')).toHaveCSS("width", "1px");
  await page.getByRole("button", { name: "查看发布提示" }).click();
  const confirmation = page.getByRole("alertdialog", { name: "发布前再看一眼" });
  await expect(confirmation).toBeVisible();
  await expect(confirmation).not.toHaveAttribute("data-local-recipe");
  await expect(confirmation.getByRole("button", { name: "返回检查" })).toBeFocused();
  await page.keyboard.press("Escape"); await expect(confirmation).toHaveCount(0);
  await expect(page.getByRole("button", { name: "查看发布提示" })).toBeFocused();
});

test("RN-04 consumer: independent prototype uses Dialog with existing Card intact", async ({ page }) => {
  await page.goto(process.env.RAIN_DIALOG_PROTOTYPE_URL ?? "http://127.0.0.1:4174");
  const card = page.locator('[data-example="cr-01"]'); await expect(card).toHaveCSS("padding-top", "20px");
  await openEditor(page); await expect(editor(page)).toHaveCSS("border-radius", "10px");
  await editor(page).getByRole("button", { name: "取消", exact: true }).click();
  await expect(card).toHaveCSS("padding-top", "20px");
});

test("composition: short Dialog keeps one content edge and intentional group intervals", async ({ page }, info) => {
  for (const theme of ["light", "dark"] as const) for (const compact of [false, true]) {
    await page.setViewportSize({ width: 1280, height: 800 }); await page.goto("about:blank"); await page.goto("/#dialog");
    if (theme === "dark") await check(page, "深色主题");
    if (compact) await check(page, "紧凑控件");
    await openEditor(page);
    const popup = editor(page); await expect(popup).toHaveCSS("width", "516px");
    const facts = await popup.evaluate(el => {
      const box = (selector: string) => { const r = el.querySelector(selector)!.getBoundingClientRect(); return { x: r.x, y: r.y, right: r.right, bottom: r.bottom, width: r.width, height: r.height }; };
      return { title: box('[data-slot="title"]'), description: box('[data-slot="description"]'),
        fields: Array.from(el.querySelectorAll('form > *')).map(n => { const r = n.getBoundingClientRect(); return { x: r.x, y: r.y, bottom: r.bottom }; }),
        separator: box('[data-rain-id="ui-separator"]'), noteTitle: box('section h3'), note: box('section p'),
        close: box('[aria-label="关闭编辑"]'), footer: box('[data-slot="footer"]'), save: box('[type="submit"]') };
    });
    expect(facts.fields[0]!.y - facts.description.bottom).toBe(24);
    expect(facts.fields[1]!.y - facts.fields[0]!.bottom).toBe(20);
    expect(facts.separator.y - facts.fields[1]!.bottom).toBe(24);
    expect(facts.noteTitle.y - facts.separator.bottom).toBe(16);
    expect(facts.note.y - facts.noteTitle.bottom).toBe(4);
    expect(facts.footer.y - facts.note.bottom).toBe(24);
    expect(new Set([facts.title.x, facts.fields[0]!.x, facts.fields[1]!.x, facts.separator.x, facts.note.x]).size).toBe(1);
    expect(facts.save.right).toBe(facts.separator.right);
    expect(facts.save.height).toBe(32);
    expect(facts.close.y + facts.close.height / 2).toBe(facts.title.y + facts.title.height / 2);
    writeFileSync(info.outputPath(`composition-${theme}-${compact}.json`), JSON.stringify(facts, null, 2));
    await page.screenshot({ path: info.outputPath(`short-${theme}-${compact}.png`) });
  }
});
