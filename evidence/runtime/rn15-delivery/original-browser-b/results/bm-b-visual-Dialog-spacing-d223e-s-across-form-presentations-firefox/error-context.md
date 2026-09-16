# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bm-b.spec.ts >> visual: Dialog spacing and surfaces across form presentations
- Location: tests/e2e/bm-b.spec.ts:10:1

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 1145
Received: 1153

Expected precision:    1
Expected difference: < 0.05
Received difference:   8
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
  - dialog [ref=f1e28]:
    - generic [ref=f1e29]:
      - generic [ref=f1e30]:
        - generic [ref=f1e31]:
          - generic [ref=f1e32]:
            - heading "编辑教材" [level=2] [ref=f1e33]
            - generic "表单布局" [ref=f1e34]:
              - generic [ref=f1e35] [cursor=pointer]:
                - checkbox "宽版容器" [checked] [ref=f1e36]
                - generic [ref=f1e40]: 宽版容器
              - generic [ref=f1e42] [cursor=pointer]:
                - checkbox "双列布局" [checked] [ref=f1e43]
                - generic [ref=f1e47]: 双列布局
          - button "关闭教材编辑" [ref=f1e49] [cursor=pointer]
        - paragraph [ref=f1e52]: 完善教材信息与阅读材料，保存后更新课程教材。
      - form "教材表单" [ref=f1e54]:
        - generic [ref=f1e55]:
          - region [ref=f1e56]:
            - heading "基本信息" [level=3] [ref=f1e57]
            - generic [ref=f1e58]:
              - generic [ref=f1e59]:
                - generic [ref=f1e60]:
                  - text: 教材标题
                  - generic [ref=f1e61]: "*"
                - generic [ref=f1e62]:
                  - textbox "教材标题" [active] [ref=f1e63]:
                    - /placeholder: 请输入教材标题
                    - text: 设计方法与实践
                  - button "清除教材标题" [ref=f1e65] [cursor=pointer]
                  - generic [ref=f1e68]: 7/80
              - generic [ref=f1e69]:
                - generic [ref=f1e70]:
                  - generic [ref=f1e71]: 作者
                  - generic [ref=f1e72]:
                    - textbox "作者" [ref=f1e73]: 教学示例编写组
                    - generic [ref=f1e75]: 7/80
                - generic [ref=f1e76]:
                  - generic [ref=f1e77]: 出版社
                  - generic [ref=f1e78]:
                    - textbox "出版社" [ref=f1e79]: 示例出版社
                    - generic [ref=f1e81]: 5/80
                - generic [ref=f1e82]:
                  - generic [ref=f1e83]:
                    - text: 所属学科
                    - generic [ref=f1e84]: "*"
                  - generic [ref=f1e85]:
                    - generic [ref=f1e86]:
                      - combobox "所属学科" [ref=f1e87] [cursor=pointer]:
                        - generic "设计学" [ref=f1e89]
                      - button "清除所属学科" [ref=f1e91] [cursor=pointer]
                    - generic [ref=f1e97]: 已选：设计学
                  - textbox [ref=f1e98]: design
          - region [ref=f1e99]:
            - heading "简介" [level=3] [ref=f1e100]
            - generic [ref=f1e101]:
              - generic [ref=f1e102]:
                - generic [ref=f1e103]:
                  - text: 内容简介
                  - generic [ref=f1e104]: "*"
                - textbox "内容简介" [ref=f1e106]: 从观察真实问题开始，学习调研、构思与原型验证。 结合课堂讨论和实践项目，形成有依据的设计判断。
                - generic [ref=f1e107]: 介绍主要内容与学习目标，最多 2000 个字符。
              - generic [ref=f1e108]:
                - generic [ref=f1e109]:
                  - generic [ref=f1e110]: 作者简介
                  - textbox "作者简介" [ref=f1e112]: 由课程教学团队共同编写，供教学演示使用。
                - generic [ref=f1e113]:
                  - generic [ref=f1e114]: 本书特色
                  - textbox "本书特色" [ref=f1e116]: 以真实任务组织学习，连接方法、案例与课堂实践。
          - region [ref=f1e117]:
            - heading "目录" [level=3] [ref=f1e118]
            - generic [ref=f1e119]:
              - generic [ref=f1e120]: 目录内容
              - textbox "目录内容" [ref=f1e122]: 第一章 观察与提问 第二章 理解使用者 第三章 构思与表达 第四章 原型与验证
              - generic [ref=f1e123]: 按章节分行填写，最多 4000 个字符。
          - region [ref=f1e124]:
            - heading "教材内容 / 附件" [level=3] [ref=f1e125]
            - generic [ref=f1e126]:
              - paragraph [ref=f1e127]: 支持 PDF、PNG、JPEG，最多 10 个，每个不超过 20 MB。本演示仅模拟上传，不传输文件内容。
              - button "添加教材附件" [ref=f1e128] [cursor=pointer]
              - list "附件列表"
      - generic [ref=f1e130]:
        - status [ref=f1e132]: 修改将在保存后生效
        - generic [ref=f1e133]:
          - button "取消" [ref=f1e134] [cursor=pointer]
          - button "保存教材" [ref=f1e136] [cursor=pointer]
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
  23  |     const description = popup.locator('[data-slot="description"]');
  24  |     await expect(description).toHaveCSS("margin-top", "0px");
  25  |     await expect(popup.locator('[data-slot="header"]')).toHaveCSS("row-gap", "8px");
  26  |     expect(await description.evaluate(el => el.getBoundingClientRect().top - el.previousElementSibling!.getBoundingClientRect().bottom)).toBe(8);
  27  |     await expect(popup.locator('[data-slot="header"]')).toHaveCSS("padding", "24px");
  28  |     await expect(footer).toHaveCSS("padding", "16px 24px");
  29  |     await expect(footer).toHaveCSS("border-top-width", "1px");
  30  |     const geometry = await popup.evaluate(el => {
  31  |       const rect = el.getBoundingClientRect(), title = el.querySelector('[data-slot="title"]')!, close = el.querySelector('[aria-label="关闭教材编辑"]')!;
  32  |       const footer = el.querySelector('[data-slot="footer"]')!, grid = el.querySelector('[data-rain-id="layout-grid"]')!;
  33  |       const style = getComputedStyle(footer), surface = getComputedStyle(el).backgroundColor, actions = footer.querySelector('[data-rain-id="layout-inline"]')!;
  34  |       const buttons = [...actions.querySelectorAll('button')].map(b => b.getBoundingClientRect().toJSON());
  35  |       return { width: rect.width, x: rect.x, bottom: rect.bottom, overflow: el.scrollWidth > el.clientWidth,
  36  |         closeOffset: close.getBoundingClientRect().y + close.getBoundingClientRect().height / 2 - title.getBoundingClientRect().y - parseFloat(getComputedStyle(title).lineHeight) / 2,
  37  |         surface, footerSurface: style.backgroundColor === "rgba(0, 0, 0, 0)" ? surface : style.backgroundColor,
  38  |         contentRight: grid.getBoundingClientRect().right, actionRight: buttons[1]!.right, gap: buttons[1]!.x - buttons[0]!.right,
  39  |         columns: getComputedStyle(grid).gridTemplateColumns.split(" ").length };
  40  |     });
  41  |     expect(geometry.width).toBe(Math.min(wide ? 916 : 616, width - (width <= 640 ? 32 : 80)));
  42  |     expect(geometry.overflow).toBe(false); expect(Math.abs(geometry.closeOffset)).toBeLessThanOrEqual(1);
> 43  |     expect(geometry.footerSurface).toBe(geometry.surface); expect(geometry.actionRight).toBeCloseTo(geometry.contentRight, 1);
      |                                                                                         ^ Error: expect(received).toBeCloseTo(expected, precision)
  44  |     expect(geometry.gap).toBe(12); expect(geometry.columns).toBe(twoColumns && width > 390 ? 2 : 1);
  45  |     await expect(footer.locator('[data-variant="primary"]')).toHaveCount(1);
  46  |     const name = `${theme}-${width}-${wide ? 916 : 616}-${twoColumns ? 2 : 1}col`;
  47  |     await body.evaluate(el => { el.scrollTop = 0; }); await page.screenshot({ path: info.outputPath(`${name}-top.png`) });
  48  |     const before = await footer.boundingBox(); await body.evaluate(el => { el.scrollTop = el.scrollHeight; });
  49  |     expect(await footer.boundingBox()).toEqual(before); await page.screenshot({ path: info.outputPath(`${name}-bottom.png`) });
  50  |     facts.push({ theme, viewportWidth: width, wide, twoColumns, ...geometry });
  51  |   }
  52  |   writeFileSync(info.outputPath("visual-geometry.json"), JSON.stringify(facts, null, 2));
  53  | });
  54  | 
  55  | test("visual: narrow validation, upload, save and discard states in both themes", async ({ page }, info) => {
  56  |   await page.setViewportSize({ width: 390, height: 740 });
  57  |   for (const theme of ["light", "dark"]) {
  58  |     await page.goto("about:blank"); await page.goto(prototypeUrl + "/#bm-b");
  59  |     if (theme === "dark") await page.getByRole("button", { name: "切换深色" }).click();
  60  |     await page.getByText("演示选项", { exact: true }).click();
  61  |     await page.getByText("模拟下次保存失败", { exact: true }).click(); await page.getByText("模拟下次上传失败", { exact: true }).click();
  62  |     await page.getByRole("button", { name: "编辑教材", exact: true }).click();
  63  |     const popup = page.getByRole("dialog"), title = popup.getByRole("textbox", { name: "教材标题", exact: true });
  64  |     await title.fill(""); await popup.getByRole("button", { name: "保存教材" }).click();
  65  |     await expect(title).toHaveAttribute("aria-invalid", "true"); await page.screenshot({ path: info.outputPath(`${theme}-validation.png`) });
  66  |     await title.fill("课堂实践与课程设计");
  67  |     const chooserReady = page.waitForEvent("filechooser"); await popup.getByRole("button", { name: "添加教材附件", exact: true }).click();
  68  |     await (await chooserReady).setFiles({ name: "课堂实践与课程设计补充阅读材料.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.7 mock") });
  69  |     await expect(popup.getByText(/上传失败，请重试/)).toBeVisible();
  70  |     await popup.locator('[data-slot="body"]').evaluate(el => { el.scrollTop = el.scrollHeight; });
  71  |     await page.screenshot({ path: info.outputPath(`${theme}-upload-failed.png`) });
  72  |     await popup.getByRole("button", { name: "重试上传 课堂实践与课程设计补充阅读材料.pdf" }).click();
  73  |     await expect(popup.getByText(/模拟上传成功/)).toBeVisible();
  74  |     await popup.getByRole("button", { name: "保存教材" }).click(); await expect(popup).toHaveAttribute("aria-busy", "true");
  75  |     await page.screenshot({ path: info.outputPath(`${theme}-saving.png`) });
  76  |     await expect(popup.getByRole("alert")).toHaveText("保存失败，填写内容已保留。请重试。");
  77  |     await expect(popup.getByRole("alert")).toBeFocused(); await page.screenshot({ path: info.outputPath(`${theme}-save-failed.png`) });
  78  |     await popup.getByRole("button", { name: "关闭教材编辑" }).click();
  79  |     const alert = page.getByRole("alertdialog"); await expect(alert.getByRole("button", { name: "继续编辑" })).toBeFocused();
  80  |     await expect.poll(() => alert.evaluate(el => el.getAnimations().length)).toBe(0);
  81  |     await expect(alert.locator('[data-slot="footer"]')).toHaveCSS("border-top-width", "0px");
  82  |     await page.screenshot({ path: info.outputPath(`${theme}-discard.png`) });
  83  |     await alert.getByRole("button", { name: "继续编辑" }).click(); await expect(alert).toHaveCount(0);
  84  |     await expect(title).toHaveValue("课堂实践与课程设计");
  85  |   }
  86  | });
  87  | 
  88  | test("validates, retries, commits, discards and restores focus", async ({ page }) => {
  89  |   const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  90  |   await page.getByText("演示选项", { exact: true }).click();
  91  |   await page.getByText("模拟下次保存失败", { exact: true }).click();
  92  |   const trigger = page.getByRole("button", { name: "编辑教材", exact: true });
  93  |   await trigger.click();
  94  |   const title = page.getByRole("textbox", { name: "教材标题", exact: true });
  95  |   await expect(title).toBeFocused();
  96  |   await title.fill(""); await page.getByRole("button", { name: "保存教材" }).click();
  97  |   await expect(title).toBeFocused(); await expect(title).toHaveAttribute("aria-invalid", "true");
  98  |   await title.fill("新教材 · 课堂实践");
  99  |   await page.getByRole("textbox", { name: "内容简介", exact: true }).fill("第一段：学习目标\n第二段：实践与反思");
  100 |   await page.getByRole("combobox", { name: "所属学科" }).click();
  101 |   await page.getByRole("option", { name: "教育学", exact: true }).click();
  102 |   await page.getByRole("button", { name: "保存教材" }).click();
  103 |   await expect(title).toBeDisabled(); await page.keyboard.press("Escape");
  104 |   await expect(page.getByRole("dialog")).toBeVisible();
  105 |   await expect(page.getByRole("alert")).toHaveText("保存失败，填写内容已保留。请重试。");
  106 |   await expect(page.getByRole("alert")).toBeFocused(); await expect(title).toHaveValue("新教材 · 课堂实践");
  107 |   await page.getByRole("button", { name: "重试保存" }).click();
  108 |   await expect(page.getByRole("dialog")).toBeHidden(); await expect(trigger).toBeFocused();
  109 |   await expect(page.getByRole("heading", { name: "新教材 · 课堂实践" })).toBeVisible();
  110 |   await expect(page.locator('[data-slot="saved-description"]')).toHaveText("第一段：学习目标\n第二段：实践与反思");
  111 |   await trigger.click(); await title.fill("应该丢弃"); await page.keyboard.press("Escape");
  112 |   await page.getByRole("button", { name: "放弃修改" }).click();
  113 |   await expect(trigger).toBeFocused(); await trigger.click(); await expect(title).toHaveValue("新教材 · 课堂实践");
  114 |   await page.getByRole("button", { name: "关闭教材编辑" }).click();
  115 |   await expect(trigger).toBeFocused(); await trigger.click();
  116 |   await page.mouse.click(2, 2); await expect(page.getByRole("dialog")).toBeVisible();
  117 |   await page.keyboard.press("Escape");
  118 |   expect(errors).toEqual([]);
  119 | });
  120 | 
  121 | test("handles file validation, upload failure, retry, removal and commit", async ({ page }) => {
  122 |   await page.getByText("演示选项", { exact: true }).click();
  123 |   await page.getByText("模拟下次上传失败", { exact: true }).click();
  124 |   await page.getByRole("button", { name: "编辑教材", exact: true }).click();
  125 |   const upload = page.getByLabel("添加教材附件", { exact: true });
  126 |   const chooserReady = page.waitForEvent("filechooser");
  127 |   await page.getByRole("button", { name: "添加教材附件", exact: true }).click();
  128 |   const chooser = await chooserReady;
  129 |   await chooser.setFiles({ name: "bad.exe", mimeType: "application/octet-stream", buffer: Buffer.from("invalid") });
  130 |   await expect(page.getByRole("alert")).toContainText("请选择 PDF");
  131 |   await upload.setInputFiles({ name: "课堂实践.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.7 mock") });
  132 |   await page.getByRole("button", { name: "保存教材" }).click();
  133 |   await expect(page.getByRole("button", { name: "添加教材附件", exact: true })).toBeFocused();
  134 |   await expect(page.getByText(/上传失败，请重试/)).toBeVisible();
  135 |   await page.getByRole("button", { name: "重试上传 课堂实践.pdf" }).click();
  136 |   await expect(page.getByText(/模拟上传成功/)).toBeVisible();
  137 |   await upload.setInputFiles({ name: "remove.png", mimeType: "image/png", buffer: Buffer.from("mock") });
  138 |   await page.getByRole("button", { name: "移除附件 remove.png" }).click();
  139 |   await expect(page.getByText("remove.png", { exact: true })).toBeHidden();
  140 |   await page.getByRole("button", { name: "保存教材" }).click();
  141 |   await expect(page.getByRole("dialog")).toBeHidden();
  142 |   await expect(page.locator('[data-slot="saved-attachments"]')).toHaveText("已保存附件：课堂实践.pdf");
  143 | });
```