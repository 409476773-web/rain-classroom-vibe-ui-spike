# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dialog.spec.ts >> RO-01/02: modal focus, nested Select dismissal and trigger return
- Location: tests/e2e/dialog.spec.ts:16:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e4]:
    - generic [ref=e5]:
      - link [ref=e6] [cursor=pointer]:
        - /url: "#components"
        - generic [ref=e7]: 返回组件
      - heading [level=1] [ref=e8]: Dialog 对话框
      - paragraph [ref=e9]: 集中完成一项编辑或确认，保留任务上下文与明确的返回路径。
      - generic [ref=e10]: 待评审候选
      - generic [ref=e13]:
        - generic [ref=e14] [cursor=pointer]:
          - checkbox [ref=e15]
          - generic [ref=e18]: 深色主题
        - generic [ref=e20] [cursor=pointer]:
          - checkbox [ref=e21]
          - generic [ref=e24]: 紧凑控件
        - generic [ref=e26] [cursor=pointer]:
          - checkbox [ref=e27]
          - generic [ref=e30]: 长内容
      - generic [ref=e32] [cursor=pointer]:
        - checkbox [ref=e33]
        - generic [ref=e36]: 按钮间距 12px
      - region [ref=e38]:
        - generic [ref=e39]:
          - heading [level=2] [ref=e40]: 课程资料
          - paragraph [ref=e41]: 设计方法与实践
          - paragraph [ref=e42]: 研讨课
        - button [expanded] [ref=e43] [cursor=pointer]:
          - generic [ref=e44]: 编辑课程资料
        - paragraph [ref=e45]: 虚构课程演示：每次打开后首次保存会模拟失败，重试可成功。有未保存修改时，取消会先请求确认。
      - generic [ref=e46]:
        - heading [level=2] [ref=e47]: 重要确认
        - button [ref=e48] [cursor=pointer]:
          - generic [ref=e49]: 查看发布提示
      - generic [ref=e50]:
        - heading [level=2] [ref=e51]: 尺寸与蒙层
        - paragraph [ref=e52]: 固定档位以外框计量。桌面保留40或60px，窄屏保留16px；无蒙层只影响绘制，模态与关闭策略分别配置。
        - generic [ref=e53]:
          - generic [ref=e54]:
            - generic [ref=e55]: 预览蒙层
            - generic [ref=e56]:
              - combobox [ref=e58] [cursor=pointer]:
                - generic [ref=e59]: 模态任务
              - generic [ref=e64]: 已选：模态任务
            - textbox [ref=e65]: modal
          - generic [ref=e66] [cursor=pointer]:
            - checkbox [ref=e67]
            - generic [ref=e70]: 桌面边距 60px
        - generic [ref=e72]:
          - button [ref=e73] [cursor=pointer]:
            - generic [ref=e74]: 416px
          - button [ref=e75] [cursor=pointer]:
            - generic [ref=e76]: 616px
          - button [ref=e77] [cursor=pointer]:
            - generic [ref=e78]: 1116px
          - button [ref=e79] [cursor=pointer]:
            - generic [ref=e80]: 随视口扩展
      - generic [ref=e81]:
        - heading [level=2] [ref=e82]: Separator 分隔线
        - paragraph [ref=e83]: 用于区分相邻内容组，不承担交互。
        - separator [ref=e84]
        - generic [ref=e85]:
          - generic [ref=e86]: 课程介绍
          - separator [ref=e87]
          - generic [ref=e88]: 学习安排
      - group [ref=e89]:
        - generic [ref=e90] [cursor=pointer]: 使用与验证边界
  - dialog [ref=e94]:
    - generic [ref=e95]:
      - generic [ref=e96]:
        - generic [ref=e97]:
          - heading "编辑课程资料" [level=2] [ref=e98]
          - paragraph [ref=e99]: 调整课程名称与教学方式，保存后更新课程信息。
        - button "关闭编辑" [active] [ref=e100] [cursor=pointer]
      - generic [ref=e103]:
        - generic [ref=e104]:
          - generic [ref=e105]:
            - generic [ref=e106]:
              - text: 课程名称
              - generic [ref=e107]: "*"
            - textbox "课程名称" [ref=e109]: 设计方法与实践
          - generic [ref=e111]:
            - generic [ref=e112]:
              - text: 教学方式
              - generic [ref=e113]: "*"
            - generic [ref=e114]:
              - combobox "教学方式" [ref=e116] [cursor=pointer]:
                - generic "研讨课" [ref=e118]
              - generic [ref=e122]: 已选：研讨课
            - textbox [ref=e123]: seminar
            - generic [ref=e124]: 根据本学期的主要教学方式选择。
        - region "调整说明" [ref=e125]:
          - separator [ref=e126]
          - generic [ref=e127]:
            - heading "调整后会发生什么" [level=3] [ref=e128]
            - paragraph [ref=e129]: 课程名称将用于课程空间与学习提醒。修改教学方式不会改变已发布的学习任务。
      - generic [ref=e130]:
        - status
        - generic [ref=e131]:
          - button "取消" [ref=e132] [cursor=pointer]
          - button "保存更改" [ref=e134] [cursor=pointer]
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
  12  |   await expect.poll(() => editor(page).evaluate(el => el.getAnimations().length)).toBe(0);
  13  |   await expect(page.getByRole("textbox", { name: "课程名称" })).toBeFocused();
  14  | }
  15  | 
  16  | test("RO-01/02: modal focus, nested Select dismissal and trigger return", async ({ page }) => {
  17  |   await page.goto("/#dialog"); await openEditor(page);
  18  |   const popup = editor(page), select = popup.getByRole("combobox", { name: "教学方式" });
  19  |   await expect(popup).toHaveAccessibleDescription("调整课程名称与教学方式，保存后更新课程信息。");
  20  |   await expect(popup.locator("button button")).toHaveCount(0);
  21  |   await select.click(); await expect(page.getByRole("listbox")).toBeVisible();
  22  |   await page.keyboard.press("Escape"); await expect(page.getByRole("listbox")).toHaveCount(0);
  23  |   await expect(popup).toBeVisible(); await expect(select).toBeFocused();
  24  |   await select.click();
  25  |   await popup.getByRole("heading", { name: "编辑课程资料" }).click();
  26  |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(popup).toBeVisible();
  27  |   await popup.getByRole("button", { name: "保存更改" }).focus(); await page.keyboard.press("Tab");
> 28  |   expect(await popup.evaluate(el => el.contains(document.activeElement))).toBe(true);
      |                                                                           ^ Error: expect(received).toBe(expected) // Object.is equality
  29  |   await page.keyboard.press("Escape"); await expect(popup).toHaveCount(0);
  30  |   await expect(page.getByRole("button", { name: "编辑课程资料", exact: true })).toBeFocused();
  31  |   await openEditor(page); await page.mouse.click(5, 5); await expect(popup).toBeVisible();
  32  | });
  33  | 
  34  | test("RO-04/05: validation, pending dismissal guard, failure, retry and cancel own separate values", async ({ page }) => {
  35  |   await page.goto("/#dialog"); await openEditor(page);
  36  |   const popup = editor(page), name = popup.getByRole("textbox", { name: "课程名称" });
  37  |   await name.fill("  "); await popup.getByRole("button", { name: "保存更改" }).click();
  38  |   await expect(name).toHaveAttribute("aria-invalid", "true");
  39  |   await expect(name).toHaveAccessibleDescription("请输入课程名称"); await expect(name).toBeFocused();
  40  |   await name.fill("交互设计研讨"); await popup.getByRole("combobox", { name: "教学方式" }).click();
  41  |   await page.getByRole("option", { name: "实践课", exact: true }).click();
  42  |   await popup.getByRole("button", { name: "保存更改" }).dblclick();
  43  |   await expect(popup).toHaveAttribute("aria-busy", "true"); await expect(name).toBeDisabled();
  44  |   await expect(popup.getByRole("combobox", { name: "教学方式" })).toBeDisabled();
  45  |   await page.keyboard.press("Escape"); await page.mouse.click(5, 5); await expect(popup).toBeVisible();
  46  |   await expect(popup.getByRole("alert")).toHaveText("保存失败，当前内容已保留。请重试。");
  47  |   await expect(name).toHaveValue("交互设计研讨");
  48  |   await expect(page.locator('[data-slot="committed-name"]')).toHaveText("设计方法与实践");
  49  |   await popup.getByRole("button", { name: "重试保存" }).click(); await expect(popup).toHaveCount(0);
  50  |   await expect(page.locator('[data-slot="committed-name"]')).toHaveText("交互设计研讨");
  51  |   await expect(page.locator('[data-slot="committed-mode"]')).toHaveText("实践课");
  52  |   await openEditor(page); await name.fill("取消时不得提交"); await popup.getByRole("button", { name: "取消", exact: true }).click();
  53  |   await page.getByRole("button", { name: "放弃修改" }).click();
  54  |   await openEditor(page); await expect(name).toHaveValue("交互设计研讨");
  55  | });
  56  | 
  57  | for (const theme of ["light", "dark"] as const) for (const compact of [false, true]) {
  58  |   test(`RO-03/06: ${theme} ${compact ? "compact" : "default"} portal, paints and long-content geometry`, async ({ page }, info) => {
  59  |     await page.setViewportSize({ width: 1280, height: 800 }); await page.goto("/#dialog");
  60  |     if (theme === "dark") await check(page, "深色主题");
  61  |     if (compact) await check(page, "紧凑控件");
  62  |     await check(page, "长内容"); await openEditor(page);
  63  |     const popup = editor(page), body = popup.locator('[data-slot="body"]'), footer = popup.locator('[data-slot="footer"]');
  64  |     await expect(popup).toHaveAttribute("data-rain-theme", theme);
  65  |     await expect(popup).toHaveAttribute("data-density", compact ? "compact" : "default");
  66  |     await expect(popup.getByRole("textbox", { name: "课程名称" }).locator('xpath=ancestor::*[@data-rain-id="ui-input"]')).toHaveAttribute("data-size", compact ? "24" : "32");
  67  |     await expect(body).toHaveCSS("row-gap", "24px");
  68  |     await expect(popup.locator('[data-slot="header"]')).toHaveCSS("padding", "24px");
  69  |     await expect(footer).toHaveCSS("padding", "16px 24px");
  70  |     await expect(popup).toHaveCSS("border-width", "1px");
  71  |     await expect(popup).toHaveCSS("border-color", theme === "dark" ? "rgba(194, 212, 255, 0.1)" : "rgba(16, 63, 183, 0.16)");
  72  |     await expect(popup).toHaveCSS("width", "616px"); await expect(popup).toHaveCSS("border-radius", "10px");
  73  |     expect(await body.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
  74  |     const before = await footer.boundingBox(); await body.evaluate(el => { el.scrollTop = el.scrollHeight; });
  75  |     expect(await footer.boundingBox()).toEqual(before); expect(before!.y + before!.height).toBeLessThanOrEqual(784);
  76  |     await body.evaluate(el => { el.scrollTop = 0; });
  77  |     await popup.getByRole("combobox", { name: "教学方式" }).click();
  78  |     const list = page.getByRole("listbox"); await expect(list).toBeVisible();
  79  |     await expect(list.locator('xpath=ancestor-or-self::*[@data-rain-theme][1]')).toHaveAttribute("data-rain-theme", theme);
  80  |     const option = page.getByRole("option", { name: "讲授课", exact: true });
  81  |     expect(await option.evaluate(el => { const r = el.getBoundingClientRect(); return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)); })).toBe(true);
  82  |     await option.click();
  83  |     await popup.getByRole("button", { name: "保存更改" }).focus();
  84  |     await page.keyboard.press("Shift+Tab");
  85  |     await expect(popup.getByRole("button", { name: "取消", exact: true })).toBeFocused();
  86  |     const paints = await popup.evaluate(el => {
  87  |       const surface = getComputedStyle(el);
  88  |       return { background: surface.backgroundColor, border: surface.borderColor,
  89  |         text: [el, el.querySelector('[data-slot="title"]')!, el.querySelector('[data-slot="description"]')!].map(node => ({ color: getComputedStyle(node).color, font: getComputedStyle(node).fontFamily, size: getComputedStyle(node).fontSize })),
  90  |         footer: { background: getComputedStyle(el.querySelector('[data-slot="footer"]')!).backgroundColor,
  91  |           border: getComputedStyle(el.querySelector('[data-slot="footer"]')!).borderTopColor,
  92  |           color: getComputedStyle(el.querySelector('[data-slot="footer"]')!).color },
  93  |         focus: { color: getComputedStyle(document.activeElement!).outlineColor, width: getComputedStyle(document.activeElement!).outlineWidth, visible: document.activeElement!.matches(":focus-visible") } };
  94  |     });
  95  |     const cdp = await page.context().newCDPSession(page);
  96  |     await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
  97  |     const { root } = await cdp.send("DOM.getDocument");
  98  |     const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: '.rain-dialog [data-slot="title"]' });
  99  |     const fonts = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
  100 |     await cdp.detach();
  101 |     writeFileSync(info.outputPath(`paints-${theme}-${compact}.json`), JSON.stringify({ theme, compact, paints, fonts, userAgent: await page.evaluate(() => navigator.userAgent) }, null, 2));
  102 |     await page.screenshot({ path: info.outputPath(`dialog-${theme}-${compact}.png`) });
  103 |     // Live ancestor changes are explicitly synchronized into already open portals.
  104 |     await page.locator('[data-rain-id="dialog-page"]').evaluate(el => el.setAttribute("data-rain-theme", el.getAttribute("data-rain-theme") === "dark" ? "light" : "dark"));
  105 |     await expect(popup).toHaveAttribute("data-rain-theme", theme === "dark" ? "light" : "dark");
  106 |   });
  107 | }
  108 | 
  109 | test("RO-06: narrow viewport, forced colors, separator and nested dialog isolation", async ({ page }, info) => {
  110 |   await page.setViewportSize({ width: 375, height: 667 }); await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  111 |   await page.goto("/#dialog"); await check(page, "长内容"); await openEditor(page);
  112 |   const popup = editor(page), rect = await popup.boundingBox();
  113 |   expect(rect!.x).toBeGreaterThanOrEqual(16); expect(rect!.width).toBeLessThanOrEqual(343);
  114 |   const footer = await popup.locator('[data-slot="footer"]').boundingBox(); expect(footer!.y + footer!.height).toBeLessThanOrEqual(651);
  115 |   await expect(popup.getByRole("separator")).toHaveCSS("height", "1px");
  116 |   await page.screenshot({ path: info.outputPath("dialog-narrow-forced-colors.png") });
  117 |   await page.setViewportSize({ width: 320, height: 667 }); await page.emulateMedia({ forcedColors: "none" });
  118 |   await popup.getByRole("button", { name: "保存更改" }).click(); await expect(popup).toHaveAttribute("aria-busy", "true");
  119 |   const cancel = await popup.getByRole("button", { name: "取消", exact: true }).boundingBox();
  120 |   const save = await popup.getByRole("button", { name: "保存更改" }).boundingBox();
  121 |   const status = await popup.getByRole("status").boundingBox();
  122 |   expect(cancel!.y).toBe(save!.y); expect(save!.x + save!.width).toBeLessThanOrEqual(279);
  123 |   expect(status!.y + status!.height).toBeLessThan(cancel!.y);
  124 |   await page.screenshot({ path: info.outputPath("dialog-narrow-pending-group.png") });
  125 |   await expect(popup.getByRole("alert")).toBeVisible(); await page.keyboard.press("Escape");
  126 |   await expect(page.locator('.dialog-review-separators [data-rain-id="ui-separator"]')).toHaveCSS("width", "1px");
  127 |   await page.getByRole("button", { name: "查看发布提示" }).click();
  128 |   const confirmation = page.getByRole("alertdialog", { name: "发布前再看一眼" });
```