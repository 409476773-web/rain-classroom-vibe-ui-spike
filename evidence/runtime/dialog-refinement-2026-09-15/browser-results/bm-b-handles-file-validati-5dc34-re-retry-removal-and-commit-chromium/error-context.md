# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bm-b.spec.ts >> handles file validation, upload failure, retry, removal and commit
- Location: tests/e2e/bm-b.spec.ts:43:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: '教材资料', level: 1 })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: '教材资料', level: 1 })

```

```yaml
- main:
  - region "Rain Next Playground":
    - paragraph: Rain Classroom · Foundation Spike
    - heading "Rain Next Playground" [level=1]
    - paragraph: Day 3 Core UI 已完成本地实现和自动检查，现作为 B2 对照基线。 图标库继续复用；各组件人工验收与发布状态独立记录。
    - text: token-foundations-v1
    - strong: 第 0/1 批 · 基础能力建设 · 视觉验收待确认
  - region "直接入口":
    - paragraph: START HERE
    - heading "直接入口" [level=2]
    - paragraph: 使用普通链接进入当前可检查区域；本阶段不建立持久文档导航。
    - list:
      - listitem:
        - link "Foundations：查看 Token 目录、完整排版方案，以及字体、密度、Focus 与 Motion 使用规则。":
          - /url: "#foundations"
          - text: 基础体系总入口 Foundations 查看 Token 目录、完整排版方案，以及字体、密度、Focus 与 Motion 使用规则。
      - listitem:
        - link "Components：检查 Button、Input、Select、Tabs、Dropdown/Popover、Tag/Badge 与 Surface/Card，查看完整组件用法。":
          - /url: "#components"
          - text: 组件与组合入口 Components 检查 Button、Input、Select、Tabs、Dropdown/Popover、Tag/Badge 与 Surface/Card，查看完整组件用法。
      - listitem:
        - link "Benchmarks：四类真实业务切片已登记，目前仅提供验证入口。":
          - /url: "#benchmarks"
          - text: 4 个已登记 Benchmarks 四类真实业务切片已登记，目前仅提供验证入口。
      - listitem:
        - link "Icons：按用途查找图标，查看默认选择、配色与使用示例。":
          - /url: "#icons"
          - text: 雨课堂完整图标目录 Icons 按用途查找图标，查看默认选择、配色与使用示例。
    - paragraph:
      - link "Token 基础建设：颜色、排版、线条、圆角与间距":
        - /url: "#token-foundations"
  - region "组件范围":
    - paragraph: COMPONENTS
    - heading "组件范围" [level=2]
    - paragraph: 四个基础家族已完成本地实现和自动检查；点击 Components 可查看待人工验收的候选。
  - region "Benchmark 入口":
    - paragraph: 01 / 04
    - heading "Benchmark 入口" [level=2]
    - paragraph: 四类范围均已登记；实现、自动验证与 Human Gate 仍各自独立。
    - list:
      - listitem:
        - article: BM-A Compact Data Management 已完成 2 条正式来源
      - listitem:
        - article: BM-B Default Large Form 已完成 1 条正式来源
      - listitem:
        - article: BM-C Complex Workbench 尚未实现 3 条正式来源
      - listitem:
        - article: BM-D Report / Key Data 尚未实现 2 条正式来源
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | 
  4   | const evidence = process.env.RAIN_BM_B_EVIDENCE ?? "/tmp/rain-bm-b-rn10";
  5   | test.beforeEach(async ({ page }) => {
  6   |   await page.goto("/#bm-b");
> 7   |   await expect(page.getByRole("heading", { level: 1, name: "教材资料" })).toBeVisible();
      |                                                                       ^ Error: expect(locator).toBeVisible() failed
  8   | });
  9   | 
  10  | test("validates, retries, commits, discards and restores focus", async ({ page }) => {
  11  |   const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  12  |   await page.getByText("演示选项", { exact: true }).click();
  13  |   await page.getByText("模拟下次保存失败", { exact: true }).click();
  14  |   const trigger = page.getByRole("button", { name: "编辑教材", exact: true });
  15  |   await trigger.click();
  16  |   const title = page.getByRole("textbox", { name: "教材标题", exact: true });
  17  |   await expect(title).toBeFocused();
  18  |   await title.fill(""); await page.getByRole("button", { name: "保存教材" }).click();
  19  |   await expect(title).toBeFocused(); await expect(title).toHaveAttribute("aria-invalid", "true");
  20  |   await title.fill("新教材 · 课堂实践");
  21  |   await page.getByRole("textbox", { name: "内容简介", exact: true }).fill("第一段：学习目标\n第二段：实践与反思");
  22  |   await page.getByRole("combobox", { name: "所属学科" }).click();
  23  |   await page.getByRole("option", { name: "教育学", exact: true }).click();
  24  |   await page.getByRole("button", { name: "保存教材" }).click();
  25  |   await expect(title).toBeDisabled(); await page.keyboard.press("Escape");
  26  |   await expect(page.getByRole("dialog")).toBeVisible();
  27  |   await expect(page.getByRole("alert")).toHaveText("保存失败，填写内容已保留。请重试。");
  28  |   await expect(page.getByRole("alert")).toBeFocused(); await expect(title).toHaveValue("新教材 · 课堂实践");
  29  |   await page.getByRole("button", { name: "重试保存" }).click();
  30  |   await expect(page.getByRole("dialog")).toBeHidden(); await expect(trigger).toBeFocused();
  31  |   await expect(page.getByRole("heading", { name: "新教材 · 课堂实践" })).toBeVisible();
  32  |   await expect(page.locator('[data-slot="saved-description"]')).toHaveText("第一段：学习目标\n第二段：实践与反思");
  33  |   await trigger.click(); await title.fill("应该丢弃"); await page.keyboard.press("Escape");
  34  |   await page.getByRole("button", { name: "放弃修改" }).click();
  35  |   await expect(trigger).toBeFocused(); await trigger.click(); await expect(title).toHaveValue("新教材 · 课堂实践");
  36  |   await page.getByRole("button", { name: "关闭教材编辑" }).click();
  37  |   await expect(trigger).toBeFocused(); await trigger.click();
  38  |   await page.mouse.click(2, 2); await expect(page.getByRole("dialog")).toBeVisible();
  39  |   await page.keyboard.press("Escape");
  40  |   expect(errors).toEqual([]);
  41  | });
  42  | 
  43  | test("handles file validation, upload failure, retry, removal and commit", async ({ page }) => {
  44  |   await page.getByText("演示选项", { exact: true }).click();
  45  |   await page.getByText("模拟下次上传失败", { exact: true }).click();
  46  |   await page.getByRole("button", { name: "编辑教材", exact: true }).click();
  47  |   const upload = page.getByLabel("添加教材附件", { exact: true });
  48  |   const chooserReady = page.waitForEvent("filechooser");
  49  |   await page.getByRole("button", { name: "添加教材附件", exact: true }).click();
  50  |   const chooser = await chooserReady;
  51  |   await chooser.setFiles({ name: "bad.exe", mimeType: "application/octet-stream", buffer: Buffer.from("invalid") });
  52  |   await expect(page.getByRole("alert")).toContainText("请选择 PDF");
  53  |   await upload.setInputFiles({ name: "课堂实践.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.7 mock") });
  54  |   await page.getByRole("button", { name: "保存教材" }).click();
  55  |   await expect(page.getByRole("button", { name: "添加教材附件", exact: true })).toBeFocused();
  56  |   await expect(page.getByText(/上传失败，请重试/)).toBeVisible();
  57  |   await page.getByRole("button", { name: "重试上传 课堂实践.pdf" }).click();
  58  |   await expect(page.getByText(/模拟上传成功/)).toBeVisible();
  59  |   await upload.setInputFiles({ name: "remove.png", mimeType: "image/png", buffer: Buffer.from("mock") });
  60  |   await page.getByRole("button", { name: "移除附件 remove.png" }).click();
  61  |   await expect(page.getByText("remove.png", { exact: true })).toBeHidden();
  62  |   await page.getByRole("button", { name: "保存教材" }).click();
  63  |   await expect(page.getByRole("dialog")).toBeHidden();
  64  |   await expect(page.locator('[data-slot="saved-attachments"]')).toHaveText("已保存附件：课堂实践.pdf");
  65  | });
  66  | 
  67  | test("keeps the draft and fixed actions across layouts, themes and narrow viewports", async ({ page }, testInfo) => {
  68  |   const consoleErrors: string[] = [];
  69  |   page.on("pageerror", error => consoleErrors.push(error.message));
  70  |   page.on("console", message => { if (message.type() === "error") consoleErrors.push(message.text()); });
  71  |   await page.reload();
  72  |   await expect(page.getByRole("heading", { level: 1, name: "教材资料" })).toBeVisible();
  73  |   const measurements = [];
  74  |   for (const theme of ["light", "dark"]) {
  75  |     if (theme === "dark") await page.getByRole("button", { name: "切换深色" }).click();
  76  |     await page.getByRole("button", { name: "编辑教材", exact: true }).click();
  77  |     const dialog = page.getByRole("dialog");
  78  |     const description = page.getByRole("textbox", { name: "内容简介", exact: true });
  79  |     await description.fill("布局变化保留这段长文本。\n多行内容正常阅读与编辑。");
  80  |     for (const width of [1440, 768, 390, 320]) {
  81  |       await page.setViewportSize({ width, height: width <= 390 ? 740 : 900 });
  82  |       await expect(dialog).toHaveAttribute("data-rain-theme", theme);
  83  |       await expect(dialog).toHaveAttribute("data-density", "default");
  84  |       const geometry = await dialog.evaluate(element => {
  85  |         const body = element.querySelector<HTMLElement>('[data-slot="body"]')!;
  86  |         const footer = element.querySelector<HTMLElement>('[data-slot="footer"]')!;
  87  |         const grid = element.querySelector<HTMLElement>('[data-rain-id="layout-grid"]')!;
  88  |         const rect = element.getBoundingClientRect(), before = footer.getBoundingClientRect();
  89  |         body.scrollTop = body.scrollHeight;
  90  |         const after = footer.getBoundingClientRect();
  91  |         return { left: rect.left, right: rect.right, bottom: rect.bottom, footerBefore: before.top, footerAfter: after.top,
  92  |           scrollable: body.scrollHeight > body.clientHeight, scrolled: body.scrollTop, bodyBottom: body.getBoundingClientRect().bottom,
  93  |           overflow: element.scrollWidth > element.clientWidth, columns: getComputedStyle(grid).gridTemplateColumns.split(" ").length,
  94  |           actions: [...footer.querySelectorAll('button')].map(button => { const box = button.getBoundingClientRect(); return { left: box.left, right: box.right, bottom: box.bottom }; }) };
  95  |       });
  96  |       expect(geometry.left).toBeGreaterThanOrEqual(15); expect(geometry.right).toBeLessThanOrEqual(width - 15);
  97  |       expect(geometry.bottom).toBeLessThanOrEqual(width <= 390 ? 725 : 885); expect(geometry.overflow).toBe(false);
  98  |       expect(geometry.scrollable).toBe(true); expect(geometry.scrolled).toBeGreaterThan(0);
  99  |       expect(geometry.footerAfter).toBe(geometry.footerBefore); expect(geometry.bodyBottom).toBeLessThanOrEqual(geometry.footerAfter + 1);
  100 |       for (const action of geometry.actions) { expect(action.left - geometry.left).toBeGreaterThanOrEqual(20); expect(geometry.right - action.right).toBeGreaterThanOrEqual(20); expect(action.bottom).toBeLessThan(geometry.bottom); }
  101 |       expect(geometry.columns).toBe(width <= 390 ? 1 : 2);
  102 |       await expect(description).toHaveValue("布局变化保留这段长文本。\n多行内容正常阅读与编辑。");
  103 |       measurements.push({ theme, width, ...geometry });
  104 |       if (testInfo.project.name === "chromium" && [1440, 390].includes(width)) {
  105 |         mkdirSync(evidence, { recursive: true });
  106 |         await page.screenshot({ path: `${evidence}/${theme}-${width}-footer.png` });
  107 |         await dialog.locator('[data-slot="body"]').evaluate(element => { element.scrollTop = 0; });
```