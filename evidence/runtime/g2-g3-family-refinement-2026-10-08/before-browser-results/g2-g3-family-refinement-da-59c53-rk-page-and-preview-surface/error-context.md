# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g2-g3-family-refinement.spec.ts >> dark documentation paints a dark page and preview surface
- Location: tests/e2e/g2-g3-family-refinement.spec.ts:80:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('html')
Expected: "dark"
Received: ""
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('html')
    14 × locator resolved to <html lang="zh-CN">…</html>
       - unexpected value "null"

```

```yaml
- document:
  - main
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdirSync } from "node:fs";
  3   | import { fileURLToPath } from "node:url";
  4   | 
  5   | const captures = fileURLToPath(new URL("../../evidence/runtime/g2-g3-family-refinement-2026-10-08/browser/", import.meta.url));
  6   | mkdirSync(captures, { recursive: true });
  7   | 
  8   | test("separated toggles have one boundary each and retain independent selection", async ({ page }) => {
  9   |   await page.goto("/#toggle-group");
  10  |   const fields = page.getByRole("group", { name: "显示字段", exact: true });
  11  |   const surface = await fields.evaluate(el => ({ padding: getComputedStyle(el).padding, border: getComputedStyle(el).borderWidth, background: getComputedStyle(el).backgroundColor }));
  12  |   expect(surface.padding).toBe("0px");
  13  |   expect(surface.border).toBe("0px");
  14  |   expect(surface.background).toBe("rgba(0, 0, 0, 0)");
  15  |   await page.screenshot({ path: `${captures}/toggle-group-light.png`, fullPage: true });
  16  |   const score = fields.getByRole("button", { name: "分数", exact: true });
  17  |   const previous = await score.getAttribute("aria-pressed");
  18  |   await score.click();
  19  |   await expect(score).toHaveAttribute("aria-pressed", previous === "true" ? "false" : "true");
  20  |   await expect(fields.getByRole("button", { name: "姓名", exact: true })).toHaveAttribute("aria-pressed", "true");
  21  |   const modes = page.getByRole("group", { name: "显示模式", exact: true });
  22  |   await modes.getByRole("button", { name: "列表", exact: true }).press("ArrowRight");
  23  |   await expect(modes.getByRole("button", { name: "分栏", exact: true })).toBeFocused();
  24  |   await page.keyboard.press("Space");
  25  |   await expect(modes.getByRole("button", { name: "分栏", exact: true })).toHaveAttribute("aria-pressed", "true");
  26  | });
  27  | 
  28  | test("Command keeps its typography, bounds and actual compact density", async ({ page }) => {
  29  |   await page.goto("/#command");
  30  |   const command = page.locator('[data-rain-id="ui-command"]');
  31  |   const input = command.getByRole("combobox");
  32  |   expect(await input.evaluate(el => getComputedStyle(el).fontSize)).toBe("14px");
  33  |   expect(await command.locator('[data-slot="list"]').evaluate(el => getComputedStyle(el).maxHeight)).toBe("320px");
  34  |   expect((await command.boundingBox())!.width).toBeLessThanOrEqual(480);
  35  |   const normal = (await command.getByRole("option").first().boundingBox())!.height;
  36  |   await page.screenshot({ path: `${captures}/command-light.png`, fullPage: true });
  37  |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  38  |   const compact = (await command.getByRole("option").first().boundingBox())!.height;
  39  |   expect(compact).toBeLessThan(normal);
  40  |   expect((await input.boundingBox())!.height).toBe(30);
  41  | });
  42  | 
  43  | test("Command executes with keyboard, skips disabled items and supports empty results", async ({ page }) => {
  44  |   await page.goto("/#command");
  45  |   const input = page.getByRole("combobox");
  46  |   await input.fill("新建");
  47  |   await input.press("Enter");
  48  |   await expect(page.getByRole("status").filter({ hasText: "已新建 1 份" })).toBeVisible();
  49  |   await input.fill("资料预览");
  50  |   await input.press("Enter");
  51  |   await expect(page.getByRole("status").filter({ hasText: "预览已打开" })).toBeVisible();
  52  |   await input.fill("不存在的命令");
  53  |   await expect(page.getByText("没有匹配的命令", { exact: true })).toBeVisible();
  54  |   await input.fill("发布");
  55  |   await expect(page.getByRole("option", { name: /发布资料/ })).toHaveAttribute("aria-disabled", "true");
  56  |   await input.press("Enter");
  57  |   await expect(page.getByRole("status").filter({ hasText: "已新建 1 份" })).toBeVisible();
  58  | });
  59  | 
  60  | test("Sidebar restores group hierarchy and centers collapsed icons without losing location", async ({ page }) => {
  61  |   await page.goto("/#sidebar");
  62  |   const nav = page.getByRole("navigation", { name: "示例工作台导航", exact: true });
  63  |   expect(await nav.getByRole("heading", { name: "工作区", exact: true }).evaluate(el => getComputedStyle(el).fontSize)).toBe("12px");
  64  |   await page.screenshot({ path: `${captures}/sidebar-light.png`, fullPage: true });
  65  |   const normal = (await nav.getByRole("link", { name: "我的课程", exact: true }).boundingBox())!.height;
  66  |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  67  |   expect((await nav.getByRole("link", { name: "我的课程", exact: true }).boundingBox())!.height).toBeLessThan(normal);
  68  |   await nav.getByRole("link", { name: "我的课程", exact: true }).click();
  69  |   await page.getByRole("button", { name: "收起示例导航", exact: true }).click();
  70  |   const current = nav.getByRole("link", { name: "我的课程", exact: true });
  71  |   await expect(current).toHaveAttribute("aria-current", "page");
  72  |   const centerOffset = await current.evaluate(el => {
  73  |     const row = el.getBoundingClientRect(), icon = el.querySelector('[data-slot="icon"]')!.getBoundingClientRect();
  74  |     return Math.abs((row.left + row.right) / 2 - (icon.left + icon.right) / 2);
  75  |   });
  76  |   expect(centerOffset).toBeLessThanOrEqual(1);
  77  |   await page.screenshot({ path: `${captures}/sidebar-collapsed.png`, fullPage: true });
  78  | });
  79  | 
  80  | test("dark documentation paints a dark page and preview surface", async ({ page }) => {
  81  |   for (const id of ["toggle-group", "command", "sidebar"]) {
  82  |     await page.goto(`/#${id}`);
  83  |     await page.getByRole("button", { name: "深色", exact: true }).click();
> 84  |     await expect(page.locator("html")).toHaveAttribute("data-rain-theme", "dark");
      |                                        ^ Error: expect(locator).toHaveAttribute(expected) failed
  85  |     const preview = await page.locator(".component-doc__preview").first().evaluate(el => getComputedStyle(el).backgroundColor);
  86  |     expect(preview).toBe("rgb(30, 36, 59)");
  87  |     await page.screenshot({ path: `${captures}/${id}-dark.png`, fullPage: true });
  88  |   }
  89  | });
  90  | 
  91  | test("first family samples and adjacent documentation fit a narrow viewport", async ({ page }) => {
  92  |   await page.setViewportSize({ width: 390, height: 844 });
  93  |   for (const id of ["toggle-group", "command", "sidebar", "toggle", "skeleton", "sheet", "context-menu", "navigation-menu"]) {
  94  |     await page.goto(`/#${id}`);
  95  |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  96  |     expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(391);
  97  |     if (["toggle-group", "command", "sidebar"].includes(id)) await page.screenshot({ path: `${captures}/${id}-narrow.png`, fullPage: true });
  98  |   }
  99  | });
  100 | 
```