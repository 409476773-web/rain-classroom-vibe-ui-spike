# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bm-b.spec.ts >> visual: Dialog spacing and surfaces across form presentations
- Location: tests/e2e/bm-b.spec.ts:10:1

# Error details

```
Error: expect(locator).toHaveCSS(expected) failed

Locator:  getByRole('dialog').locator('[data-slot="description"]')
Expected: "8px"
Received: "0px"
Timeout:  5000ms

Call log:
  - Expect "toHaveCSS" with timeout 5000ms
  - waiting for getByRole('dialog').locator('[data-slot="description"]')
    14 × locator resolved to <p id="base-ui-_r_9_" data-slot="description" class="rain-dialog-description m-rain-0 text-rain-size-14 leading-rain-24">完善教材信息与阅读材料，保存后更新课程教材。</p>
       - unexpected value "0px"

```

```yaml
- paragraph: 完善教材信息与阅读材料，保存后更新课程教材。
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | 
  4   | const prototypeUrl = process.env.RAIN_DIALOG_PROTOTYPE_URL ?? "http://127.0.0.1:4174";
  5   | test.beforeEach(async ({ page }) => {
  6   |   await page.goto(prototypeUrl + "/#bm-b");
  7   |   await expect(page.getByRole("heading", { level: 1, name: "教材资料" })).toBeVisible();
  8   | });
  9   | 
  10  | test("visual: Dialog spacing and surfaces across form presentations", async ({ page }, info) => {
  11  |   const facts = [];
  12  |   for (const theme of ["light", "dark"]) for (const [width, wide, twoColumns] of [
  13  |     [1440, true, true], [1440, false, true], [1440, false, false], [1440, true, false], [390, true, true], [320, false, false],
  14  |   ] as const) {
  15  |     await page.setViewportSize({ width, height: width <= 390 ? 740 : 900 });
  16  |     await page.goto("about:blank"); await page.goto(prototypeUrl + "/#bm-b");
  17  |     if (theme === "dark") await page.getByRole("button", { name: "切换深色" }).click();
  18  |     await page.getByRole("button", { name: "编辑教材", exact: true }).click();
  19  |     const popup = page.getByRole("dialog"), body = popup.locator('[data-slot="body"]'), footer = popup.locator('[data-slot="footer"]');
  20  |     if (!wide) await popup.getByText("宽版容器", { exact: true }).click();
  21  |     if (!twoColumns) await popup.getByText("双列布局", { exact: true }).click();
  22  |     await expect.poll(() => popup.evaluate(el => el.getAnimations().length)).toBe(0);
> 23  |     await expect(popup.locator('[data-slot="description"]')).toHaveCSS("margin-top", "8px");
      |                                                              ^ Error: expect(locator).toHaveCSS(expected) failed
  24  |     await expect(popup.locator('[data-slot="header"]')).toHaveCSS("padding", "24px");
  25  |     await expect(footer).toHaveCSS("padding", "16px 24px");
  26  |     await expect(footer).toHaveCSS("border-top-width", "1px");
  27  |     const geometry = await popup.evaluate(el => {
  28  |       const rect = el.getBoundingClientRect(), title = el.querySelector('[data-slot="title"]')!, close = el.querySelector('[aria-label="关闭教材编辑"]')!;
  29  |       const footer = el.querySelector('[data-slot="footer"]')!, grid = el.querySelector('[data-rain-id="layout-grid"]')!;
  30  |       const style = getComputedStyle(footer), surface = getComputedStyle(el).backgroundColor, actions = footer.querySelector('[data-rain-id="layout-inline"]')!;
  31  |       const buttons = [...actions.querySelectorAll('button')].map(b => b.getBoundingClientRect().toJSON());
  32  |       return { width: rect.width, x: rect.x, bottom: rect.bottom, overflow: el.scrollWidth > el.clientWidth,
  33  |         closeOffset: close.getBoundingClientRect().y + close.getBoundingClientRect().height / 2 - title.getBoundingClientRect().y - parseFloat(getComputedStyle(title).lineHeight) / 2,
  34  |         surface, footerSurface: style.backgroundColor === "rgba(0, 0, 0, 0)" ? surface : style.backgroundColor,
  35  |         contentRight: grid.getBoundingClientRect().right, actionRight: buttons[1]!.right, gap: buttons[1]!.x - buttons[0]!.right,
  36  |         columns: getComputedStyle(grid).gridTemplateColumns.split(" ").length };
  37  |     });
  38  |     expect(geometry.width).toBe(Math.min(wide ? 916 : 616, width - (width <= 640 ? 32 : 80)));
  39  |     expect(geometry.overflow).toBe(false); expect(Math.abs(geometry.closeOffset)).toBeLessThanOrEqual(1);
  40  |     expect(geometry.footerSurface).toBe(geometry.surface); expect(geometry.actionRight).toBeCloseTo(geometry.contentRight, 1);
  41  |     expect(geometry.gap).toBe(12); expect(geometry.columns).toBe(twoColumns && width > 390 ? 2 : 1);
  42  |     await expect(footer.locator('[data-variant="primary"]')).toHaveCount(1);
  43  |     const name = `${theme}-${width}-${wide ? 916 : 616}-${twoColumns ? 2 : 1}col`;
  44  |     await body.evaluate(el => { el.scrollTop = 0; }); await page.screenshot({ path: info.outputPath(`${name}-top.png`) });
  45  |     const before = await footer.boundingBox(); await body.evaluate(el => { el.scrollTop = el.scrollHeight; });
  46  |     expect(await footer.boundingBox()).toEqual(before); await page.screenshot({ path: info.outputPath(`${name}-bottom.png`) });
  47  |     facts.push({ theme, viewportWidth: width, wide, twoColumns, ...geometry });
  48  |   }
  49  |   writeFileSync(info.outputPath("visual-geometry.json"), JSON.stringify(facts, null, 2));
  50  | });
  51  | 
  52  | test("visual: narrow validation, upload, save and discard states in both themes", async ({ page }, info) => {
  53  |   await page.setViewportSize({ width: 390, height: 740 });
  54  |   for (const theme of ["light", "dark"]) {
  55  |     await page.goto("about:blank"); await page.goto(prototypeUrl + "/#bm-b");
  56  |     if (theme === "dark") await page.getByRole("button", { name: "切换深色" }).click();
  57  |     await page.getByText("演示选项", { exact: true }).click();
  58  |     await page.getByText("模拟下次保存失败", { exact: true }).click(); await page.getByText("模拟下次上传失败", { exact: true }).click();
  59  |     await page.getByRole("button", { name: "编辑教材", exact: true }).click();
  60  |     const popup = page.getByRole("dialog"), title = popup.getByRole("textbox", { name: "教材标题", exact: true });
  61  |     await title.fill(""); await popup.getByRole("button", { name: "保存教材" }).click();
  62  |     await expect(title).toHaveAttribute("aria-invalid", "true"); await page.screenshot({ path: info.outputPath(`${theme}-validation.png`) });
  63  |     await title.fill("课堂实践与课程设计");
  64  |     const chooserReady = page.waitForEvent("filechooser"); await popup.getByRole("button", { name: "添加教材附件", exact: true }).click();
  65  |     await (await chooserReady).setFiles({ name: "课堂实践与课程设计补充阅读材料.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.7 mock") });
  66  |     await expect(popup.getByText(/上传失败，请重试/)).toBeVisible();
  67  |     await popup.locator('[data-slot="body"]').evaluate(el => { el.scrollTop = el.scrollHeight; });
  68  |     await page.screenshot({ path: info.outputPath(`${theme}-upload-failed.png`) });
  69  |     await popup.getByRole("button", { name: "重试上传 课堂实践与课程设计补充阅读材料.pdf" }).click();
  70  |     await expect(popup.getByText(/模拟上传成功/)).toBeVisible();
  71  |     await popup.getByRole("button", { name: "保存教材" }).click(); await expect(popup).toHaveAttribute("aria-busy", "true");
  72  |     await page.screenshot({ path: info.outputPath(`${theme}-saving.png`) });
  73  |     await expect(popup.getByRole("alert")).toHaveText("保存失败，填写内容已保留。请重试。");
  74  |     await expect(popup.getByRole("alert")).toBeFocused(); await page.screenshot({ path: info.outputPath(`${theme}-save-failed.png`) });
  75  |     await popup.getByRole("button", { name: "关闭教材编辑" }).click();
  76  |     const alert = page.getByRole("alertdialog"); await expect(alert.getByRole("button", { name: "继续编辑" })).toBeFocused();
  77  |     await expect.poll(() => alert.evaluate(el => el.getAnimations().length)).toBe(0);
  78  |     await expect(alert.locator('[data-slot="footer"]')).toHaveCSS("border-top-width", "0px");
  79  |     await page.screenshot({ path: info.outputPath(`${theme}-discard.png`) });
  80  |     await alert.getByRole("button", { name: "继续编辑" }).click(); await expect(alert).toHaveCount(0);
  81  |     await expect(title).toHaveValue("课堂实践与课程设计");
  82  |   }
  83  | });
  84  | 
  85  | test("validates, retries, commits, discards and restores focus", async ({ page }) => {
  86  |   const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  87  |   await page.getByText("演示选项", { exact: true }).click();
  88  |   await page.getByText("模拟下次保存失败", { exact: true }).click();
  89  |   const trigger = page.getByRole("button", { name: "编辑教材", exact: true });
  90  |   await trigger.click();
  91  |   const title = page.getByRole("textbox", { name: "教材标题", exact: true });
  92  |   await expect(title).toBeFocused();
  93  |   await title.fill(""); await page.getByRole("button", { name: "保存教材" }).click();
  94  |   await expect(title).toBeFocused(); await expect(title).toHaveAttribute("aria-invalid", "true");
  95  |   await title.fill("新教材 · 课堂实践");
  96  |   await page.getByRole("textbox", { name: "内容简介", exact: true }).fill("第一段：学习目标\n第二段：实践与反思");
  97  |   await page.getByRole("combobox", { name: "所属学科" }).click();
  98  |   await page.getByRole("option", { name: "教育学", exact: true }).click();
  99  |   await page.getByRole("button", { name: "保存教材" }).click();
  100 |   await expect(title).toBeDisabled(); await page.keyboard.press("Escape");
  101 |   await expect(page.getByRole("dialog")).toBeVisible();
  102 |   await expect(page.getByRole("alert")).toHaveText("保存失败，填写内容已保留。请重试。");
  103 |   await expect(page.getByRole("alert")).toBeFocused(); await expect(title).toHaveValue("新教材 · 课堂实践");
  104 |   await page.getByRole("button", { name: "重试保存" }).click();
  105 |   await expect(page.getByRole("dialog")).toBeHidden(); await expect(trigger).toBeFocused();
  106 |   await expect(page.getByRole("heading", { name: "新教材 · 课堂实践" })).toBeVisible();
  107 |   await expect(page.locator('[data-slot="saved-description"]')).toHaveText("第一段：学习目标\n第二段：实践与反思");
  108 |   await trigger.click(); await title.fill("应该丢弃"); await page.keyboard.press("Escape");
  109 |   await page.getByRole("button", { name: "放弃修改" }).click();
  110 |   await expect(trigger).toBeFocused(); await trigger.click(); await expect(title).toHaveValue("新教材 · 课堂实践");
  111 |   await page.getByRole("button", { name: "关闭教材编辑" }).click();
  112 |   await expect(trigger).toBeFocused(); await trigger.click();
  113 |   await page.mouse.click(2, 2); await expect(page.getByRole("dialog")).toBeVisible();
  114 |   await page.keyboard.press("Escape");
  115 |   expect(errors).toEqual([]);
  116 | });
  117 | 
  118 | test("handles file validation, upload failure, retry, removal and commit", async ({ page }) => {
  119 |   await page.getByText("演示选项", { exact: true }).click();
  120 |   await page.getByText("模拟下次上传失败", { exact: true }).click();
  121 |   await page.getByRole("button", { name: "编辑教材", exact: true }).click();
  122 |   const upload = page.getByLabel("添加教材附件", { exact: true });
  123 |   const chooserReady = page.waitForEvent("filechooser");
```