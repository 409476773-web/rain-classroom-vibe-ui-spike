# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dialog.spec.ts >> RO-03/06: light compact portal, paints and long-content geometry
- Location: tests/e2e/dialog.spec.ts:52:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.check: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('checkbox', { name: '紧凑控件' })
    - locator resolved to <input value="on" class="sr-only" type="checkbox" data-slot="input" aria-checked="false" data-focus="control" aria-labelledby="_r_2_-label"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
    - retrying click action
      - waiting 100ms
    57 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- main [ref=e4]:
  - link "返回组件" [ref=e5] [cursor=pointer]:
    - /url: "#components"
  - heading "Dialog 对话框" [level=1] [ref=e7]
  - paragraph [ref=e8]: 集中完成一项编辑或确认，保留任务上下文与明确的返回路径。
  - generic [ref=e9]: 待评审候选
  - generic "预览设置" [ref=e12]:
    - generic [ref=e13] [cursor=pointer]:
      - checkbox "深色主题" [ref=e14]
      - generic [ref=e17]: 深色主题
    - generic [ref=e19] [cursor=pointer]:
      - checkbox "紧凑控件" [ref=e20]
      - generic [ref=e23]: 紧凑控件
    - generic [ref=e25] [cursor=pointer]:
      - checkbox "长内容" [ref=e26]
      - generic [ref=e29]: 长内容
  - region "课程资料编辑" [ref=e31]:
    - generic [ref=e32]:
      - heading "课程资料" [level=2] [ref=e33]
      - paragraph [ref=e34]: 设计方法与实践
      - paragraph [ref=e35]: 研讨课
    - button "编辑课程资料" [ref=e36] [cursor=pointer]
    - status
    - paragraph [ref=e38]: 虚构课程演示：每次打开后首次保存会模拟失败，重试可成功。取消会放弃本轮修改。
  - generic [ref=e39]:
    - heading "轻量确认" [level=2] [ref=e40]
    - button "查看发布提示" [ref=e41] [cursor=pointer]
  - generic [ref=e43]:
    - heading "Separator 分隔线" [level=2] [ref=e44]
    - paragraph [ref=e45]: 用于区分相邻内容组，不承担交互。
    - separator [ref=e46]
    - generic [ref=e47]:
      - generic [ref=e48]: 课程介绍
      - separator [ref=e49]
      - generic [ref=e50]: 学习安排
  - group [ref=e51]:
    - generic "使用与验证边界" [ref=e52] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect, test, type Page } from "@playwright/test";
  2   | import { writeFileSync } from "node:fs";
  3   | 
  4   | const editor = (page: Page) => page.getByRole("dialog", { name: "编辑课程资料", exact: true });
  5   | async function openEditor(page: Page) {
  6   |   await page.getByRole("button", { name: "编辑课程资料", exact: true }).click();
  7   |   await expect(editor(page)).toBeVisible();
  8   |   await expect(page.getByRole("textbox", { name: "课程名称" })).toBeFocused();
  9   | }
  10  | 
  11  | test("RO-01/02: modal focus, nested Select dismissal and trigger return", async ({ page }) => {
  12  |   await page.goto("/#dialog"); await openEditor(page);
  13  |   const popup = editor(page), select = popup.getByRole("combobox", { name: "教学方式" });
  14  |   await expect(popup).toHaveAccessibleDescription("调整课程名称与教学方式，保存后更新课程信息。");
  15  |   await expect(popup.locator("button button")).toHaveCount(0);
  16  |   await select.click(); await expect(page.getByRole("listbox")).toBeVisible();
  17  |   await page.keyboard.press("Escape"); await expect(page.getByRole("listbox")).toHaveCount(0);
  18  |   await expect(popup).toBeVisible(); await expect(select).toBeFocused();
  19  |   await select.click();
  20  |   await popup.getByRole("heading", { name: "编辑课程资料" }).click();
  21  |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(popup).toBeVisible();
  22  |   await popup.getByRole("button", { name: "保存更改" }).focus(); await page.keyboard.press("Tab");
  23  |   expect(await popup.evaluate(el => el.contains(document.activeElement))).toBe(true);
  24  |   await page.keyboard.press("Escape"); await expect(popup).toHaveCount(0);
  25  |   await expect(page.getByRole("button", { name: "编辑课程资料", exact: true })).toBeFocused();
  26  |   await openEditor(page); await page.mouse.click(5, 5); await expect(popup).toHaveCount(0);
  27  | });
  28  | 
  29  | test("RO-04/05: validation, pending dismissal guard, failure, retry and cancel own separate values", async ({ page }) => {
  30  |   await page.goto("/#dialog"); await openEditor(page);
  31  |   const popup = editor(page), name = popup.getByRole("textbox", { name: "课程名称" });
  32  |   await name.fill("  "); await popup.getByRole("button", { name: "保存更改" }).click();
  33  |   await expect(name).toHaveAttribute("aria-invalid", "true");
  34  |   await expect(name).toHaveAccessibleDescription("请输入课程名称"); await expect(name).toBeFocused();
  35  |   await name.fill("交互设计研讨"); await popup.getByRole("combobox", { name: "教学方式" }).click();
  36  |   await page.getByRole("option", { name: "实践课", exact: true }).click();
  37  |   await popup.getByRole("button", { name: "保存更改" }).dblclick();
  38  |   await expect(popup).toHaveAttribute("aria-busy", "true"); await expect(name).toBeDisabled();
  39  |   await expect(popup.getByRole("combobox", { name: "教学方式" })).toBeDisabled();
  40  |   await page.keyboard.press("Escape"); await page.mouse.click(5, 5); await expect(popup).toBeVisible();
  41  |   await expect(popup.getByRole("alert")).toHaveText("保存失败，当前内容已保留。请重试。");
  42  |   await expect(name).toHaveValue("交互设计研讨");
  43  |   await expect(page.locator('[data-slot="committed-name"]')).toHaveText("设计方法与实践");
  44  |   await popup.getByRole("button", { name: "重试保存" }).click(); await expect(popup).toHaveCount(0);
  45  |   await expect(page.locator('[data-slot="committed-name"]')).toHaveText("交互设计研讨");
  46  |   await expect(page.locator('[data-slot="committed-mode"]')).toHaveText("实践课");
  47  |   await openEditor(page); await name.fill("取消时不得提交"); await popup.getByRole("button", { name: "取消", exact: true }).click();
  48  |   await openEditor(page); await expect(name).toHaveValue("交互设计研讨");
  49  | });
  50  | 
  51  | for (const theme of ["light", "dark"] as const) for (const compact of [false, true]) {
  52  |   test(`RO-03/06: ${theme} ${compact ? "compact" : "default"} portal, paints and long-content geometry`, async ({ page }, info) => {
  53  |     await page.setViewportSize({ width: 1280, height: 800 }); await page.goto("/#dialog");
  54  |     if (theme === "dark") await page.getByRole("checkbox", { name: "深色主题" }).check();
> 55  |     if (compact) await page.getByRole("checkbox", { name: "紧凑控件" }).check();
      |                                                                     ^ Error: locator.check: Test timeout of 30000ms exceeded.
  56  |     await page.getByRole("checkbox", { name: "长内容" }).check(); await openEditor(page);
  57  |     const popup = editor(page), body = popup.locator('[data-slot="body"]'), footer = popup.locator('[data-slot="footer"]');
  58  |     await expect(popup).toHaveAttribute("data-rain-theme", theme);
  59  |     await expect(popup).toHaveAttribute("data-density", compact ? "compact" : "default");
  60  |     await expect(popup.getByRole("textbox", { name: "课程名称" }).locator('xpath=ancestor::*[@data-rain-id="ui-input"]')).toHaveAttribute("data-size", compact ? "24" : "32");
  61  |     await expect(body).toHaveCSS("row-gap", "16px");
  62  |     await expect(popup).toHaveCSS("width", "560px"); await expect(popup).toHaveCSS("border-radius", "10px");
  63  |     expect(await body.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
  64  |     const before = await footer.boundingBox(); await body.evaluate(el => { el.scrollTop = el.scrollHeight; });
  65  |     expect(await footer.boundingBox()).toEqual(before); expect(before!.y + before!.height).toBeLessThanOrEqual(784);
  66  |     await body.evaluate(el => { el.scrollTop = 0; });
  67  |     await popup.getByRole("combobox", { name: "教学方式" }).click();
  68  |     const list = page.getByRole("listbox"); await expect(list).toBeVisible();
  69  |     await expect(list.locator('xpath=ancestor-or-self::*[@data-rain-theme][1]')).toHaveAttribute("data-rain-theme", theme);
  70  |     const option = page.getByRole("option", { name: "讲授课", exact: true });
  71  |     expect(await option.evaluate(el => { const r = el.getBoundingClientRect(); return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)); })).toBe(true);
  72  |     await option.click();
  73  |     await popup.getByRole("button", { name: "取消", exact: true }).focus();
  74  |     const paints = await popup.evaluate(el => {
  75  |       const surface = getComputedStyle(el);
  76  |       return { background: surface.backgroundColor, border: surface.borderColor,
  77  |         text: [el, el.querySelector('[data-slot="title"]')!, el.querySelector('[data-slot="description"]')!].map(node => ({ color: getComputedStyle(node).color, font: getComputedStyle(node).fontFamily, size: getComputedStyle(node).fontSize })),
  78  |         focus: { color: getComputedStyle(document.activeElement!).outlineColor, width: getComputedStyle(document.activeElement!).outlineWidth, visible: document.activeElement!.matches(":focus-visible") } };
  79  |     });
  80  |     writeFileSync(info.outputPath(`paints-${theme}-${compact}.json`), JSON.stringify({ theme, compact, paints, userAgent: await page.evaluate(() => navigator.userAgent) }, null, 2));
  81  |     await page.screenshot({ path: info.outputPath(`dialog-${theme}-${compact}.png`) });
  82  |     // Live ancestor changes are explicitly synchronized into already open portals.
  83  |     await page.locator('[data-rain-id="dialog-page"]').evaluate(el => el.setAttribute("data-rain-theme", el.getAttribute("data-rain-theme") === "dark" ? "light" : "dark"));
  84  |     await expect(popup).toHaveAttribute("data-rain-theme", theme === "dark" ? "light" : "dark");
  85  |   });
  86  | }
  87  | 
  88  | test("RO-06: narrow viewport, forced colors, separator and nested dialog isolation", async ({ page }, info) => {
  89  |   await page.setViewportSize({ width: 375, height: 667 }); await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  90  |   await page.goto("/#dialog"); await page.getByRole("checkbox", { name: "长内容" }).check(); await openEditor(page);
  91  |   const popup = editor(page), rect = await popup.boundingBox();
  92  |   expect(rect!.x).toBeGreaterThanOrEqual(16); expect(rect!.width).toBeLessThanOrEqual(343);
  93  |   const footer = await popup.locator('[data-slot="footer"]').boundingBox(); expect(footer!.y + footer!.height).toBeLessThanOrEqual(651);
  94  |   await expect(popup.getByRole("separator")).toHaveCSS("height", "1px");
  95  |   await page.screenshot({ path: info.outputPath("dialog-narrow-forced-colors.png") });
  96  |   await page.keyboard.press("Escape");
  97  |   await expect(page.locator('.dialog-review-separators [data-rain-id="ui-separator"]')).toHaveCSS("width", "1px");
  98  |   await page.getByRole("button", { name: "查看发布提示" }).click(); await page.getByRole("button", { name: "查看说明" }).click();
  99  |   const nested = page.getByRole("dialog", { name: "资料说明", exact: true }); await expect(nested).toBeVisible();
  100 |   await expect(nested).not.toHaveAttribute("data-local-recipe"); await expect(nested.locator('[data-slot="header"]')).toHaveCSS("flex-direction", "column");
  101 |   await page.keyboard.press("Escape"); await expect(nested).toHaveCount(0); await expect(page.getByRole("button", { name: "查看说明" })).toBeFocused();
  102 |   await page.keyboard.press("Escape"); await expect(page.getByRole("button", { name: "查看发布提示" })).toBeFocused();
  103 | });
  104 | 
  105 | test("RN-04 consumer: independent prototype uses Dialog with existing Card intact", async ({ page }) => {
  106 |   await page.goto(process.env.RAIN_DIALOG_PROTOTYPE_URL ?? "http://127.0.0.1:4174");
  107 |   const card = page.locator('[data-example="cr-01"]'); await expect(card).toHaveCSS("padding-top", "20px");
  108 |   await openEditor(page); await expect(editor(page)).toHaveCSS("border-radius", "10px");
  109 |   await editor(page).getByRole("button", { name: "取消", exact: true }).click();
  110 |   await expect(card).toHaveCSS("padding-top", "20px");
  111 | });
  112 | 
```