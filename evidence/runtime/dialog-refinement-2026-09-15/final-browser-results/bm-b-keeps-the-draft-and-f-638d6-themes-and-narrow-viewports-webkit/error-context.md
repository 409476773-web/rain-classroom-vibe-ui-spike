# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bm-b.spec.ts >> keeps the draft and fixed actions across layouts, themes and narrow viewports
- Location: tests/e2e/bm-b.spec.ts:67:1

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 305
Received:    374
```

# Page snapshot

```yaml
- generic [ref=f1e1]:
  - main [ref=f1e4]:
    - generic [ref=f1e5]:
      - generic [ref=f1e6]:
        - heading [level=1] [ref=f1e7]: 教材资料
        - paragraph [ref=f1e8]: 组织教材信息，为课程准备阅读材料。
      - button [ref=f1e9] [cursor=pointer]:
        - generic [ref=f1e10]: 切换深色
    - region [ref=f1e11]:
      - article [ref=f1e12]:
        - heading [level=2] [ref=f1e14]: 设计方法与实践
        - generic [ref=f1e16]:
          - paragraph [ref=f1e17]: 设计学 · 教学示例编写组 · 示例出版社
          - paragraph [ref=f1e18]: 从观察真实问题开始，学习调研、构思与原型验证。 结合课堂讨论和实践项目，形成有依据的设计判断。
          - paragraph [ref=f1e19]: 尚未添加附件
          - button [expanded] [ref=f1e20] [cursor=pointer]:
            - generic [ref=f1e21]: 编辑教材
      - group [ref=f1e22]:
        - generic [ref=f1e23] [cursor=pointer]: 演示选项
      - paragraph [ref=f1e24]: 虚构教材示例。保存与上传均为本地模拟，刷新页面后恢复初始内容。
  - generic:
    - button [ref=f1e27]
    - dialog [ref=f1e28]:
      - generic [ref=f1e29]:
        - generic [ref=f1e30]:
          - generic [ref=f1e31]:
            - generic [ref=f1e32]:
              - heading "编辑教材" [level=2] [ref=f1e33]
              - paragraph [ref=f1e34]: 完善教材信息与阅读材料，保存后更新课程教材。
            - button "关闭教材编辑" [ref=f1e35] [cursor=pointer]:
              - generic [ref=f1e36]: 关闭
          - generic "表单布局" [ref=f1e37]:
            - generic [ref=f1e38] [cursor=pointer]:
              - checkbox "宽版容器" [checked] [ref=f1e39]
              - generic [ref=f1e43]: 宽版容器
            - generic [ref=f1e45] [cursor=pointer]:
              - checkbox "双列布局" [checked] [ref=f1e46]
              - generic [ref=f1e50]: 双列布局
        - form "教材表单" [ref=f1e53]:
          - generic [ref=f1e54]:
            - region [ref=f1e55]:
              - heading "基本信息" [level=3] [ref=f1e56]
              - generic [ref=f1e57]:
                - generic [ref=f1e58]:
                  - generic [ref=f1e59]:
                    - text: 教材标题
                    - generic [ref=f1e60]: "*"
                  - generic [ref=f1e61]:
                    - textbox "教材标题" [ref=f1e62]:
                      - /placeholder: 请输入教材标题
                      - text: 设计方法与实践
                    - generic [ref=f1e64]: 7/80
                - generic [ref=f1e65]:
                  - generic [ref=f1e66]:
                    - generic [ref=f1e67]: 作者
                    - generic [ref=f1e68]:
                      - textbox "作者" [ref=f1e69]: 教学示例编写组
                      - generic [ref=f1e71]: 7/80
                  - generic [ref=f1e72]:
                    - generic [ref=f1e73]: 出版社
                    - generic [ref=f1e74]:
                      - textbox "出版社" [ref=f1e75]: 示例出版社
                      - generic [ref=f1e77]: 5/80
                  - generic [ref=f1e78]:
                    - generic [ref=f1e79]:
                      - text: 所属学科
                      - generic [ref=f1e80]: "*"
                    - generic [ref=f1e81]:
                      - generic [ref=f1e82]:
                        - combobox "所属学科" [ref=f1e83] [cursor=pointer]:
                          - generic "设计学" [ref=f1e85]
                        - button "清除所属学科" [ref=f1e87] [cursor=pointer]
                      - generic [ref=f1e93]: 已选：设计学
                    - textbox [ref=f1e94]: design
            - region [ref=f1e95]:
              - heading "简介" [level=3] [ref=f1e96]
              - generic [ref=f1e97]:
                - generic [ref=f1e98]:
                  - generic [ref=f1e99]:
                    - text: 内容简介
                    - generic [ref=f1e100]: "*"
                  - textbox "内容简介" [active] [ref=f1e102]: 布局变化保留这段长文本。 多行内容正常阅读与编辑。
                  - generic [ref=f1e103]: 介绍主要内容与学习目标，最多 2000 个字符。
                - generic [ref=f1e104]:
                  - generic [ref=f1e105]:
                    - generic [ref=f1e106]: 作者简介
                    - textbox "作者简介" [ref=f1e108]: 由课程教学团队共同编写，供教学演示使用。
                  - generic [ref=f1e109]:
                    - generic [ref=f1e110]: 本书特色
                    - textbox "本书特色" [ref=f1e112]: 以真实任务组织学习，连接方法、案例与课堂实践。
            - region [ref=f1e113]:
              - heading "目录" [level=3] [ref=f1e114]
              - generic [ref=f1e115]:
                - generic [ref=f1e116]: 目录内容
                - textbox "目录内容" [ref=f1e118]: 第一章 观察与提问 第二章 理解使用者 第三章 构思与表达 第四章 原型与验证
                - generic [ref=f1e119]: 按章节分行填写，最多 4000 个字符。
            - region [ref=f1e120]:
              - heading "教材内容 / 附件" [level=3] [ref=f1e121]
              - generic [ref=f1e122]:
                - paragraph [ref=f1e123]: 支持 PDF、PNG、JPEG，最多 10 个，每个不超过 20 MB。本演示仅模拟上传，不传输文件内容。
                - button "添加教材附件" [ref=f1e124] [cursor=pointer]
                - list "附件列表"
        - generic [ref=f1e126]:
          - status [ref=f1e128]: 修改将在保存后生效
          - generic [ref=f1e129]:
            - button "取消" [ref=f1e130] [cursor=pointer]
            - button "保存教材" [ref=f1e132] [cursor=pointer]
    - button [ref=f1e134]
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | 
  4   | const evidence = process.env.RAIN_BM_B_EVIDENCE ?? "/tmp/rain-bm-b-rn10";
  5   | test.beforeEach(async ({ page }) => {
  6   |   await page.goto((process.env.RAIN_DIALOG_PROTOTYPE_URL ?? "http://127.0.0.1:4174") + "/#bm-b");
  7   |   await expect(page.getByRole("heading", { level: 1, name: "教材资料" })).toBeVisible();
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
  78  |     await expect.poll(() => dialog.evaluate(el => el.getAnimations().length)).toBe(0);
  79  |     const description = page.getByRole("textbox", { name: "内容简介", exact: true });
  80  |     await description.fill("布局变化保留这段长文本。\n多行内容正常阅读与编辑。");
  81  |     for (const width of [1440, 768, 390, 320]) {
  82  |       await page.setViewportSize({ width, height: width <= 390 ? 740 : 900 });
  83  |       await expect(dialog).toHaveAttribute("data-rain-theme", theme);
  84  |       await expect(dialog).toHaveAttribute("data-density", "default");
  85  |       const geometry = await dialog.evaluate(element => {
  86  |         const body = element.querySelector<HTMLElement>('[data-slot="body"]')!;
  87  |         const footer = element.querySelector<HTMLElement>('[data-slot="footer"]')!;
  88  |         const grid = element.querySelector<HTMLElement>('[data-rain-id="layout-grid"]')!;
  89  |         const rect = element.getBoundingClientRect(), before = footer.getBoundingClientRect();
  90  |         body.scrollTop = body.scrollHeight;
  91  |         const after = footer.getBoundingClientRect();
  92  |         return { left: rect.left, right: rect.right, bottom: rect.bottom, footerBefore: before.top, footerAfter: after.top,
  93  |           scrollable: body.scrollHeight > body.clientHeight, scrolled: body.scrollTop, bodyBottom: body.getBoundingClientRect().bottom,
  94  |           overflow: element.scrollWidth > element.clientWidth, columns: getComputedStyle(grid).gridTemplateColumns.split(" ").length,
  95  |           actions: [...footer.querySelectorAll('button')].map(button => { const box = button.getBoundingClientRect(); return { left: box.left, right: box.right, bottom: box.bottom }; }) };
  96  |       });
> 97  |       expect(geometry.left).toBeGreaterThanOrEqual(15); expect(geometry.right).toBeLessThanOrEqual(width - 15);
      |                                                                                ^ Error: expect(received).toBeLessThanOrEqual(expected)
  98  |       expect(geometry.bottom).toBeLessThanOrEqual(width <= 390 ? 725 : 885); expect(geometry.overflow).toBe(false);
  99  |       expect(geometry.scrollable).toBe(true); expect(geometry.scrolled).toBeGreaterThan(0);
  100 |       expect(geometry.footerAfter).toBe(geometry.footerBefore); expect(geometry.bodyBottom).toBeLessThanOrEqual(geometry.footerAfter + 1);
  101 |       for (const action of geometry.actions) { expect(action.left - geometry.left).toBeGreaterThanOrEqual(20); expect(geometry.right - action.right).toBeGreaterThanOrEqual(20); expect(action.bottom).toBeLessThan(geometry.bottom); }
  102 |       expect(geometry.columns).toBe(width <= 390 ? 1 : 2);
  103 |       await expect(description).toHaveValue("布局变化保留这段长文本。\n多行内容正常阅读与编辑。");
  104 |       measurements.push({ theme, width, ...geometry });
  105 |       if (testInfo.project.name === "chromium" && [1440, 390].includes(width)) {
  106 |         mkdirSync(evidence, { recursive: true });
  107 |         await page.screenshot({ path: `${evidence}/${theme}-${width}-footer.png` });
  108 |         await dialog.locator('[data-slot="body"]').evaluate(element => { element.scrollTop = 0; });
  109 |         await page.screenshot({ path: `${evidence}/${theme}-${width}-top.png` });
  110 |       }
  111 |     }
  112 |     await page.setViewportSize({ width: 1440, height: 900 });
  113 |     await page.getByText("双列布局", { exact: true }).click();
  114 |     await expect(dialog.locator('[data-rain-id="layout-grid"]').first()).toHaveAttribute("data-columns", "1");
  115 |     await page.getByText("宽版容器", { exact: true }).click();
  116 |     await expect(description).toHaveValue("布局变化保留这段长文本。\n多行内容正常阅读与编辑。");
  117 |     await page.getByText("宽版容器", { exact: true }).click(); await page.getByText("双列布局", { exact: true }).click();
  118 |     const tabKey = testInfo.project.name === "webkit" ? "Alt+Tab" : "Tab";
  119 |     await page.getByRole("button", { name: "取消", exact: true }).focus();
  120 |     await page.keyboard.press(tabKey); await expect(page.getByRole("button", { name: "保存教材" })).toBeFocused();
  121 |     await page.keyboard.press(tabKey); await expect(dialog.getByRole("button", { name: "关闭教材编辑" })).toBeFocused();
  122 |     await page.getByRole("button", { name: "取消", exact: true }).click();
  123 |     await page.getByRole("button", { name: "放弃修改" }).click();
  124 |   }
  125 |   expect(consoleErrors).toEqual([]);
  126 |   writeFileSync(`${evidence}/${testInfo.project.name}-geometry.json`, JSON.stringify(measurements, null, 2));
  127 | });
  128 | 
```