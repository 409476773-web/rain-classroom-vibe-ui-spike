# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dialog.spec.ts >> RO-03/06: dark default portal, paints and long-content geometry
- Location: tests/e2e/dialog.spec.ts:56:3

# Error details

```
Error: expect(locator).toHaveCSS(expected) failed

Locator:  getByRole('dialog', { name: '编辑课程资料', exact: true })
Expected: "rgba(194, 212, 255, 0.1)"
Received: "rgb(211, 218, 240)"
Timeout:  5000ms

Call log:
  - Expect "toHaveCSS" with timeout 5000ms
  - waiting for getByRole('dialog', { name: '编辑课程资料', exact: true })
    14 × locator resolved to <div id="_r_5_" data-open="" role="dialog" tabindex="-1" aria-busy="false" data-slot="content" data-rain-theme="dark" data-density="default" data-rain-id="ui-dialog" data-base-ui-focusable="" aria-labelledby="base-ui-_r_a_" aria-describedby="base-ui-_r_b_" data-local-recipe="course-edit-dialog" class="rain-dialog box-border flex flex-col min-w-rain-0 rounded-rain-10 border-solid border-rain-line-1 shadow-rain-dialog font-rain-ui text-rain-size-14 leading-rain-24 font-rain-regular">…</div>
       - unexpected value "rgb(211, 218, 240)"

```

```yaml
- dialog "编辑课程资料":
  - heading "编辑课程资料" [level=2]
  - paragraph: 调整课程名称与教学方式，保存后更新课程信息。
  - button "关闭编辑"
  - text: 课程名称
  - textbox "课程名称": 设计方法与实践
  - button "清除课程名称"
  - text: 教学方式
  - combobox "教学方式": 研讨课
  - text: 已选：研讨课 根据本学期的主要教学方式选择。
  - separator
  - region "调整说明"
  - status
  - button "取消"
  - button "保存更改"
```

# Test source

```ts
  1   | import { expect, test, type Page } from "@playwright/test";
  2   | import { writeFileSync } from "node:fs";
  3   | 
  4   | const editor = (page: Page) => page.getByRole("dialog", { name: "编辑课程资料", exact: true });
  5   | async function check(page: Page, name: string) {
  6   |   await page.getByRole("checkbox", { name }).focus(); await page.keyboard.press("Space");
  7   |   await expect(page.getByRole("checkbox", { name })).toBeChecked();
  8   | }
  9   | async function openEditor(page: Page) {
  10  |   await page.getByRole("button", { name: "编辑课程资料", exact: true }).click();
  11  |   await expect(editor(page)).toBeVisible();
  12  |   await expect(page.getByRole("textbox", { name: "课程名称" })).toBeFocused();
  13  | }
  14  | 
  15  | test("RO-01/02: modal focus, nested Select dismissal and trigger return", async ({ page }) => {
  16  |   await page.goto("/#dialog"); await openEditor(page);
  17  |   const popup = editor(page), select = popup.getByRole("combobox", { name: "教学方式" });
  18  |   await expect(popup).toHaveAccessibleDescription("调整课程名称与教学方式，保存后更新课程信息。");
  19  |   await expect(popup.locator("button button")).toHaveCount(0);
  20  |   await select.click(); await expect(page.getByRole("listbox")).toBeVisible();
  21  |   await page.keyboard.press("Escape"); await expect(page.getByRole("listbox")).toHaveCount(0);
  22  |   await expect(popup).toBeVisible(); await expect(select).toBeFocused();
  23  |   await select.click();
  24  |   await popup.getByRole("heading", { name: "编辑课程资料" }).click();
  25  |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(popup).toBeVisible();
  26  |   await popup.getByRole("button", { name: "保存更改" }).focus(); await page.keyboard.press("Tab");
  27  |   expect(await popup.evaluate(el => el.contains(document.activeElement))).toBe(true);
  28  |   await page.keyboard.press("Escape"); await expect(popup).toHaveCount(0);
  29  |   await expect(page.getByRole("button", { name: "编辑课程资料", exact: true })).toBeFocused();
  30  |   await openEditor(page); await page.mouse.click(5, 5); await expect(popup).toHaveCount(0);
  31  | });
  32  | 
  33  | test("RO-04/05: validation, pending dismissal guard, failure, retry and cancel own separate values", async ({ page }) => {
  34  |   await page.goto("/#dialog"); await openEditor(page);
  35  |   const popup = editor(page), name = popup.getByRole("textbox", { name: "课程名称" });
  36  |   await name.fill("  "); await popup.getByRole("button", { name: "保存更改" }).click();
  37  |   await expect(name).toHaveAttribute("aria-invalid", "true");
  38  |   await expect(name).toHaveAccessibleDescription("请输入课程名称"); await expect(name).toBeFocused();
  39  |   await name.fill("交互设计研讨"); await popup.getByRole("combobox", { name: "教学方式" }).click();
  40  |   await page.getByRole("option", { name: "实践课", exact: true }).click();
  41  |   await popup.getByRole("button", { name: "保存更改" }).dblclick();
  42  |   await expect(popup).toHaveAttribute("aria-busy", "true"); await expect(name).toBeDisabled();
  43  |   await expect(popup.getByRole("combobox", { name: "教学方式" })).toBeDisabled();
  44  |   await page.keyboard.press("Escape"); await page.mouse.click(5, 5); await expect(popup).toBeVisible();
  45  |   await expect(popup.getByRole("alert")).toHaveText("保存失败，当前内容已保留。请重试。");
  46  |   await expect(name).toHaveValue("交互设计研讨");
  47  |   await expect(page.locator('[data-slot="committed-name"]')).toHaveText("设计方法与实践");
  48  |   await popup.getByRole("button", { name: "重试保存" }).click(); await expect(popup).toHaveCount(0);
  49  |   await expect(page.locator('[data-slot="committed-name"]')).toHaveText("交互设计研讨");
  50  |   await expect(page.locator('[data-slot="committed-mode"]')).toHaveText("实践课");
  51  |   await openEditor(page); await name.fill("取消时不得提交"); await popup.getByRole("button", { name: "取消", exact: true }).click();
  52  |   await openEditor(page); await expect(name).toHaveValue("交互设计研讨");
  53  | });
  54  | 
  55  | for (const theme of ["light", "dark"] as const) for (const compact of [false, true]) {
  56  |   test(`RO-03/06: ${theme} ${compact ? "compact" : "default"} portal, paints and long-content geometry`, async ({ page }, info) => {
  57  |     await page.setViewportSize({ width: 1280, height: 800 }); await page.goto("/#dialog");
  58  |     if (theme === "dark") await check(page, "深色主题");
  59  |     if (compact) await check(page, "紧凑控件");
  60  |     await check(page, "长内容"); await openEditor(page);
  61  |     const popup = editor(page), body = popup.locator('[data-slot="body"]'), footer = popup.locator('[data-slot="footer"]');
  62  |     await expect(popup).toHaveAttribute("data-rain-theme", theme);
  63  |     await expect(popup).toHaveAttribute("data-density", compact ? "compact" : "default");
  64  |     await expect(popup.getByRole("textbox", { name: "课程名称" }).locator('xpath=ancestor::*[@data-rain-id="ui-input"]')).toHaveAttribute("data-size", compact ? "24" : "32");
  65  |     await expect(body).toHaveCSS("row-gap", "16px");
> 66  |     await expect(popup.locator('[data-slot="header"]')).toHaveCSS("padding", "24px");
      |                         ^ Error: expect(locator).toHaveCSS(expected) failed
  67  |     await expect(footer).toHaveCSS("padding", "24px");
  68  |     await expect(popup).toHaveCSS("border-width", "1px");
  69  |     await expect(popup).toHaveCSS("border-color", theme === "dark" ? "rgba(194, 212, 255, 0.1)" : "rgba(16, 63, 183, 0.16)");
  70  |     await expect(popup).toHaveCSS("width", "560px"); await expect(popup).toHaveCSS("border-radius", "10px");
  71  |     expect(await body.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
  72  |     const before = await footer.boundingBox(); await body.evaluate(el => { el.scrollTop = el.scrollHeight; });
  73  |     expect(await footer.boundingBox()).toEqual(before); expect(before!.y + before!.height).toBeLessThanOrEqual(784);
  74  |     await body.evaluate(el => { el.scrollTop = 0; });
  75  |     await popup.getByRole("combobox", { name: "教学方式" }).click();
  76  |     const list = page.getByRole("listbox"); await expect(list).toBeVisible();
  77  |     await expect(list.locator('xpath=ancestor-or-self::*[@data-rain-theme][1]')).toHaveAttribute("data-rain-theme", theme);
  78  |     const option = page.getByRole("option", { name: "讲授课", exact: true });
  79  |     expect(await option.evaluate(el => { const r = el.getBoundingClientRect(); return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)); })).toBe(true);
  80  |     await option.click();
  81  |     await popup.getByRole("button", { name: "保存更改" }).focus();
  82  |     await page.keyboard.press("Shift+Tab");
  83  |     await expect(popup.getByRole("button", { name: "取消", exact: true })).toBeFocused();
  84  |     const paints = await popup.evaluate(el => {
  85  |       const surface = getComputedStyle(el);
  86  |       return { background: surface.backgroundColor, border: surface.borderColor,
  87  |         text: [el, el.querySelector('[data-slot="title"]')!, el.querySelector('[data-slot="description"]')!].map(node => ({ color: getComputedStyle(node).color, font: getComputedStyle(node).fontFamily, size: getComputedStyle(node).fontSize })),
  88  |         focus: { color: getComputedStyle(document.activeElement!).outlineColor, width: getComputedStyle(document.activeElement!).outlineWidth, visible: document.activeElement!.matches(":focus-visible") } };
  89  |     });
  90  |     writeFileSync(info.outputPath(`paints-${theme}-${compact}.json`), JSON.stringify({ theme, compact, paints, userAgent: await page.evaluate(() => navigator.userAgent) }, null, 2));
  91  |     await page.screenshot({ path: info.outputPath(`dialog-${theme}-${compact}.png`) });
  92  |     // Live ancestor changes are explicitly synchronized into already open portals.
  93  |     await page.locator('[data-rain-id="dialog-page"]').evaluate(el => el.setAttribute("data-rain-theme", el.getAttribute("data-rain-theme") === "dark" ? "light" : "dark"));
  94  |     await expect(popup).toHaveAttribute("data-rain-theme", theme === "dark" ? "light" : "dark");
  95  |   });
  96  | }
  97  | 
  98  | test("RO-06: narrow viewport, forced colors, separator and nested dialog isolation", async ({ page }, info) => {
  99  |   await page.setViewportSize({ width: 375, height: 667 }); await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  100 |   await page.goto("/#dialog"); await check(page, "长内容"); await openEditor(page);
  101 |   const popup = editor(page), rect = await popup.boundingBox();
  102 |   expect(rect!.x).toBeGreaterThanOrEqual(16); expect(rect!.width).toBeLessThanOrEqual(343);
  103 |   const footer = await popup.locator('[data-slot="footer"]').boundingBox(); expect(footer!.y + footer!.height).toBeLessThanOrEqual(651);
  104 |   await expect(popup.getByRole("separator")).toHaveCSS("height", "1px");
  105 |   await page.screenshot({ path: info.outputPath("dialog-narrow-forced-colors.png") });
  106 |   await page.keyboard.press("Escape");
  107 |   await expect(page.locator('.dialog-review-separators [data-rain-id="ui-separator"]')).toHaveCSS("width", "1px");
  108 |   await page.getByRole("button", { name: "查看发布提示" }).click(); await page.getByRole("button", { name: "查看说明" }).click();
  109 |   const nested = page.getByRole("dialog", { name: "资料说明", exact: true }); await expect(nested).toBeVisible();
  110 |   await expect(nested).not.toHaveAttribute("data-local-recipe"); await expect(nested.locator('[data-slot="header"]')).toHaveCSS("flex-direction", "column");
  111 |   await page.keyboard.press("Escape"); await expect(nested).toHaveCount(0); await expect(page.getByRole("button", { name: "查看说明" })).toBeFocused();
  112 |   await page.keyboard.press("Escape"); await expect(page.getByRole("button", { name: "查看发布提示" })).toBeFocused();
  113 | });
  114 | 
  115 | test("RN-04 consumer: independent prototype uses Dialog with existing Card intact", async ({ page }) => {
  116 |   await page.goto(process.env.RAIN_DIALOG_PROTOTYPE_URL ?? "http://127.0.0.1:4174");
  117 |   const card = page.locator('[data-example="cr-01"]'); await expect(card).toHaveCSS("padding-top", "20px");
  118 |   await openEditor(page); await expect(editor(page)).toHaveCSS("border-radius", "10px");
  119 |   await editor(page).getByRole("button", { name: "取消", exact: true }).click();
  120 |   await expect(card).toHaveCSS("padding-top", "20px");
  121 | });
  122 | 
```