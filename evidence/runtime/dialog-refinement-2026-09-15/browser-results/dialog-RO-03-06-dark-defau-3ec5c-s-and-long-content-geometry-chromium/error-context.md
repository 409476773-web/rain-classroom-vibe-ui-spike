# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dialog.spec.ts >> RO-03/06: dark default portal, paints and long-content geometry
- Location: tests/e2e/dialog.spec.ts:57:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 4
+ Received  + 4

  Object {
-   "height": 64.56396484375,
-   "width": 609.8814392089844,
-   "x": 335.0592346191406,
-   "y": 692.0279541015625,
+   "height": 64.754150390625,
+   "width": 611.6780090332031,
+   "x": 334.1609802246094,
+   "y": 692.88818359375,
  }
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
          - checkbox [checked] [ref=e15]
          - generic [ref=e19]: 深色主题
        - generic [ref=e21] [cursor=pointer]:
          - checkbox [ref=e22]
          - generic [ref=e25]: 紧凑控件
        - generic [ref=e27] [cursor=pointer]:
          - checkbox [checked] [ref=e28]
          - generic [ref=e32]: 长内容
      - generic [ref=e34] [cursor=pointer]:
        - checkbox [ref=e35]
        - generic [ref=e38]: 按钮间距 12px
      - region [ref=e40]:
        - generic [ref=e41]:
          - heading [level=2] [ref=e42]: 课程资料
          - paragraph [ref=e43]: 设计方法与实践
          - paragraph [ref=e44]: 研讨课
        - button [expanded] [ref=e45] [cursor=pointer]:
          - generic [ref=e46]: 编辑课程资料
        - paragraph [ref=e47]: 虚构课程演示：每次打开后首次保存会模拟失败，重试可成功。有未保存修改时，取消会先请求确认。
      - generic [ref=e48]:
        - heading [level=2] [ref=e49]: 重要确认
        - button [ref=e50] [cursor=pointer]:
          - generic [ref=e51]: 查看发布提示
      - generic [ref=e52]:
        - heading [level=2] [ref=e53]: 尺寸与蒙层
        - paragraph [ref=e54]: 固定档位以外框计量。桌面保留40或60px，窄屏保留16px；无蒙层只影响绘制，模态与关闭策略分别配置。
        - generic [ref=e55]:
          - generic [ref=e56]:
            - generic [ref=e57]: 预览蒙层
            - generic [ref=e58]:
              - combobox [ref=e60] [cursor=pointer]:
                - generic [ref=e61]: 模态任务
              - generic [ref=e66]: 已选：模态任务
            - textbox [ref=e67]: modal
          - generic [ref=e68] [cursor=pointer]:
            - checkbox [ref=e69]
            - generic [ref=e72]: 桌面边距 60px
        - generic [ref=e74]:
          - button [ref=e75] [cursor=pointer]:
            - generic [ref=e76]: 416px
          - button [ref=e77] [cursor=pointer]:
            - generic [ref=e78]: 616px
          - button [ref=e79] [cursor=pointer]:
            - generic [ref=e80]: 1116px
          - button [ref=e81] [cursor=pointer]:
            - generic [ref=e82]: 随视口扩展
      - generic [ref=e83]:
        - heading [level=2] [ref=e84]: Separator 分隔线
        - paragraph [ref=e85]: 用于区分相邻内容组，不承担交互。
        - separator [ref=e86]
        - generic [ref=e87]:
          - generic [ref=e88]: 课程介绍
          - separator [ref=e89]
          - generic [ref=e90]: 学习安排
      - group [ref=e91]:
        - generic [ref=e92] [cursor=pointer]: 使用与验证边界
  - dialog [ref=e96]:
    - generic [ref=e97]:
      - generic [ref=e98]:
        - generic [ref=e99]:
          - heading "编辑课程资料" [level=2] [ref=e100]
          - paragraph [ref=e101]: 调整课程名称与教学方式，保存后更新课程信息。
        - button "关闭编辑" [ref=e102] [cursor=pointer]
      - generic [ref=e105]:
        - generic [ref=e106]:
          - generic [ref=e107]:
            - generic [ref=e108]:
              - text: 课程名称
              - generic [ref=e109]: "*"
            - generic [ref=e110]:
              - textbox "课程名称" [active] [ref=e111]: 设计方法与实践
              - button "清除课程名称" [ref=e113] [cursor=pointer]
          - generic [ref=e116]:
            - generic [ref=e117]:
              - text: 教学方式
              - generic [ref=e118]: "*"
            - generic [ref=e119]:
              - combobox "教学方式" [ref=e121] [cursor=pointer]:
                - generic "研讨课" [ref=e123]
              - generic [ref=e127]: 已选：研讨课
            - textbox [ref=e128]: seminar
            - generic [ref=e129]: 根据本学期的主要教学方式选择。
        - region "调整说明" [ref=e130]:
          - separator [ref=e131]
          - generic [ref=e132]:
            - heading "调整后会发生什么" [level=3] [ref=e133]
            - paragraph [ref=e134]: 课程名称将用于课程空间与学习提醒。修改教学方式不会改变已发布的学习任务。
          - list [ref=e135]:
            - listitem [ref=e136]:
              - heading "第 1 周 · 教学安排" [level=4] [ref=e137]
              - paragraph [ref=e138]: 围绕真实学习问题组织课堂讨论，结合阅读、实践与小组交流完成学习任务。课程资料调整后，保留已有讨论、学生作品和学习记录。
            - listitem [ref=e139]:
              - heading "第 2 周 · 教学安排" [level=4] [ref=e140]
              - paragraph [ref=e141]: 围绕真实学习问题组织课堂讨论，结合阅读、实践与小组交流完成学习任务。课程资料调整后，保留已有讨论、学生作品和学习记录。
            - listitem [ref=e142]:
              - heading "第 3 周 · 教学安排" [level=4] [ref=e143]
              - paragraph [ref=e144]: 围绕真实学习问题组织课堂讨论，结合阅读、实践与小组交流完成学习任务。课程资料调整后，保留已有讨论、学生作品和学习记录。
            - listitem [ref=e145]:
              - heading "第 4 周 · 教学安排" [level=4] [ref=e146]
              - paragraph [ref=e147]: 围绕真实学习问题组织课堂讨论，结合阅读、实践与小组交流完成学习任务。课程资料调整后，保留已有讨论、学生作品和学习记录。
            - listitem [ref=e148]:
              - heading "第 5 周 · 教学安排" [level=4] [ref=e149]
              - paragraph [ref=e150]: 围绕真实学习问题组织课堂讨论，结合阅读、实践与小组交流完成学习任务。课程资料调整后，保留已有讨论、学生作品和学习记录。
            - listitem [ref=e151]:
              - heading "第 6 周 · 教学安排" [level=4] [ref=e152]
              - paragraph [ref=e153]: 围绕真实学习问题组织课堂讨论，结合阅读、实践与小组交流完成学习任务。课程资料调整后，保留已有讨论、学生作品和学习记录。
            - listitem [ref=e154]:
              - heading "第 7 周 · 教学安排" [level=4] [ref=e155]
              - paragraph [ref=e156]: 围绕真实学习问题组织课堂讨论，结合阅读、实践与小组交流完成学习任务。课程资料调整后，保留已有讨论、学生作品和学习记录。
            - listitem [ref=e157]:
              - heading "第 8 周 · 教学安排" [level=4] [ref=e158]
              - paragraph [ref=e159]: 围绕真实学习问题组织课堂讨论，结合阅读、实践与小组交流完成学习任务。课程资料调整后，保留已有讨论、学生作品和学习记录。
      - generic [ref=e160]:
        - status
        - generic [ref=e161]:
          - button "取消" [ref=e162] [cursor=pointer]
          - button "保存更改" [ref=e164] [cursor=pointer]
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
  30  |   await openEditor(page); await page.mouse.click(5, 5); await expect(popup).toBeVisible();
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
  52  |   await page.getByRole("button", { name: "放弃修改" }).click();
  53  |   await openEditor(page); await expect(name).toHaveValue("交互设计研讨");
  54  | });
  55  | 
  56  | for (const theme of ["light", "dark"] as const) for (const compact of [false, true]) {
  57  |   test(`RO-03/06: ${theme} ${compact ? "compact" : "default"} portal, paints and long-content geometry`, async ({ page }, info) => {
  58  |     await page.setViewportSize({ width: 1280, height: 800 }); await page.goto("/#dialog");
  59  |     if (theme === "dark") await check(page, "深色主题");
  60  |     if (compact) await check(page, "紧凑控件");
  61  |     await check(page, "长内容"); await openEditor(page);
  62  |     const popup = editor(page), body = popup.locator('[data-slot="body"]'), footer = popup.locator('[data-slot="footer"]');
  63  |     await expect(popup).toHaveAttribute("data-rain-theme", theme);
  64  |     await expect(popup).toHaveAttribute("data-density", compact ? "compact" : "default");
  65  |     await expect(popup.getByRole("textbox", { name: "课程名称" }).locator('xpath=ancestor::*[@data-rain-id="ui-input"]')).toHaveAttribute("data-size", compact ? "24" : "32");
  66  |     await expect(body).toHaveCSS("row-gap", "24px");
  67  |     await expect(popup.locator('[data-slot="header"]')).toHaveCSS("padding", "24px");
  68  |     await expect(footer).toHaveCSS("padding", "16px 24px");
  69  |     await expect(popup).toHaveCSS("border-width", "1px");
  70  |     await expect(popup).toHaveCSS("border-color", theme === "dark" ? "rgba(194, 212, 255, 0.1)" : "rgba(16, 63, 183, 0.16)");
  71  |     await expect(popup).toHaveCSS("width", "616px"); await expect(popup).toHaveCSS("border-radius", "10px");
  72  |     expect(await body.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
  73  |     const before = await footer.boundingBox(); await body.evaluate(el => { el.scrollTop = el.scrollHeight; });
> 74  |     expect(await footer.boundingBox()).toEqual(before); expect(before!.y + before!.height).toBeLessThanOrEqual(784);
      |                                        ^ Error: expect(received).toEqual(expected) // deep equality
  75  |     await body.evaluate(el => { el.scrollTop = 0; });
  76  |     await popup.getByRole("combobox", { name: "教学方式" }).click();
  77  |     const list = page.getByRole("listbox"); await expect(list).toBeVisible();
  78  |     await expect(list.locator('xpath=ancestor-or-self::*[@data-rain-theme][1]')).toHaveAttribute("data-rain-theme", theme);
  79  |     const option = page.getByRole("option", { name: "讲授课", exact: true });
  80  |     expect(await option.evaluate(el => { const r = el.getBoundingClientRect(); return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)); })).toBe(true);
  81  |     await option.click();
  82  |     await popup.getByRole("button", { name: "保存更改" }).focus();
  83  |     await page.keyboard.press("Shift+Tab");
  84  |     await expect(popup.getByRole("button", { name: "取消", exact: true })).toBeFocused();
  85  |     const paints = await popup.evaluate(el => {
  86  |       const surface = getComputedStyle(el);
  87  |       return { background: surface.backgroundColor, border: surface.borderColor,
  88  |         text: [el, el.querySelector('[data-slot="title"]')!, el.querySelector('[data-slot="description"]')!].map(node => ({ color: getComputedStyle(node).color, font: getComputedStyle(node).fontFamily, size: getComputedStyle(node).fontSize })),
  89  |         footer: { background: getComputedStyle(el.querySelector('[data-slot="footer"]')!).backgroundColor,
  90  |           border: getComputedStyle(el.querySelector('[data-slot="footer"]')!).borderTopColor,
  91  |           color: getComputedStyle(el.querySelector('[data-slot="footer"]')!).color },
  92  |         focus: { color: getComputedStyle(document.activeElement!).outlineColor, width: getComputedStyle(document.activeElement!).outlineWidth, visible: document.activeElement!.matches(":focus-visible") } };
  93  |     });
  94  |     const cdp = await page.context().newCDPSession(page);
  95  |     await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
  96  |     const { root } = await cdp.send("DOM.getDocument");
  97  |     const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: '.rain-dialog [data-slot="title"]' });
  98  |     const fonts = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
  99  |     await cdp.detach();
  100 |     writeFileSync(info.outputPath(`paints-${theme}-${compact}.json`), JSON.stringify({ theme, compact, paints, fonts, userAgent: await page.evaluate(() => navigator.userAgent) }, null, 2));
  101 |     await page.screenshot({ path: info.outputPath(`dialog-${theme}-${compact}.png`) });
  102 |     // Live ancestor changes are explicitly synchronized into already open portals.
  103 |     await page.locator('[data-rain-id="dialog-page"]').evaluate(el => el.setAttribute("data-rain-theme", el.getAttribute("data-rain-theme") === "dark" ? "light" : "dark"));
  104 |     await expect(popup).toHaveAttribute("data-rain-theme", theme === "dark" ? "light" : "dark");
  105 |   });
  106 | }
  107 | 
  108 | test("RO-06: narrow viewport, forced colors, separator and nested dialog isolation", async ({ page }, info) => {
  109 |   await page.setViewportSize({ width: 375, height: 667 }); await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  110 |   await page.goto("/#dialog"); await check(page, "长内容"); await openEditor(page);
  111 |   const popup = editor(page), rect = await popup.boundingBox();
  112 |   expect(rect!.x).toBeGreaterThanOrEqual(16); expect(rect!.width).toBeLessThanOrEqual(343);
  113 |   const footer = await popup.locator('[data-slot="footer"]').boundingBox(); expect(footer!.y + footer!.height).toBeLessThanOrEqual(651);
  114 |   await expect(popup.getByRole("separator")).toHaveCSS("height", "1px");
  115 |   await page.screenshot({ path: info.outputPath("dialog-narrow-forced-colors.png") });
  116 |   await page.setViewportSize({ width: 320, height: 667 }); await page.emulateMedia({ forcedColors: "none" });
  117 |   await popup.getByRole("button", { name: "保存更改" }).click(); await expect(popup).toHaveAttribute("aria-busy", "true");
  118 |   const cancel = await popup.getByRole("button", { name: "取消", exact: true }).boundingBox();
  119 |   const save = await popup.getByRole("button", { name: "保存更改" }).boundingBox();
  120 |   const status = await popup.getByRole("status").boundingBox();
  121 |   expect(cancel!.y).toBe(save!.y); expect(save!.x + save!.width).toBeLessThanOrEqual(279);
  122 |   expect(status!.y + status!.height).toBeLessThan(cancel!.y);
  123 |   await page.screenshot({ path: info.outputPath("dialog-narrow-pending-group.png") });
  124 |   await expect(popup.getByRole("alert")).toBeVisible(); await page.keyboard.press("Escape");
  125 |   await expect(page.locator('.dialog-review-separators [data-rain-id="ui-separator"]')).toHaveCSS("width", "1px");
  126 |   await page.getByRole("button", { name: "查看发布提示" }).click(); await page.getByRole("button", { name: "查看说明" }).click();
  127 |   const nested = page.getByRole("dialog", { name: "资料说明", exact: true }); await expect(nested).toBeVisible();
  128 |   await expect(nested).not.toHaveAttribute("data-local-recipe"); await expect(nested.locator('[data-slot="header"]')).toHaveCSS("flex-direction", "column");
  129 |   await page.keyboard.press("Escape"); await expect(nested).toHaveCount(0); await expect(page.getByRole("button", { name: "查看说明" })).toBeFocused();
  130 |   await page.keyboard.press("Escape"); await expect(page.getByRole("button", { name: "查看发布提示" })).toBeFocused();
  131 | });
  132 | 
  133 | test("RN-04 consumer: independent prototype uses Dialog with existing Card intact", async ({ page }) => {
  134 |   await page.goto(process.env.RAIN_DIALOG_PROTOTYPE_URL ?? "http://127.0.0.1:4174");
  135 |   const card = page.locator('[data-example="cr-01"]'); await expect(card).toHaveCSS("padding-top", "20px");
  136 |   await openEditor(page); await expect(editor(page)).toHaveCSS("border-radius", "10px");
  137 |   await editor(page).getByRole("button", { name: "取消", exact: true }).click();
  138 |   await expect(card).toHaveCSS("padding-top", "20px");
  139 | });
  140 | 
  141 | test("composition: short Dialog keeps one content edge and intentional group intervals", async ({ page }, info) => {
  142 |   for (const theme of ["light", "dark"] as const) for (const compact of [false, true]) {
  143 |     await page.setViewportSize({ width: 1280, height: 800 }); await page.goto("about:blank"); await page.goto("/#dialog");
  144 |     if (theme === "dark") await check(page, "深色主题");
  145 |     if (compact) await check(page, "紧凑控件");
  146 |     await openEditor(page);
  147 |     const popup = editor(page); await expect(popup).toHaveCSS("width", "516px");
  148 |     const facts = await popup.evaluate(el => {
  149 |       const box = (selector: string) => { const r = el.querySelector(selector)!.getBoundingClientRect(); return { x: r.x, y: r.y, right: r.right, bottom: r.bottom, width: r.width, height: r.height }; };
  150 |       return { title: box('[data-slot="title"]'), description: box('[data-slot="description"]'),
  151 |         fields: Array.from(el.querySelectorAll('form > *')).map(n => { const r = n.getBoundingClientRect(); return { x: r.x, y: r.y, bottom: r.bottom }; }),
  152 |         separator: box('[data-rain-id="ui-separator"]'), noteTitle: box('section h3'), note: box('section p'),
  153 |         close: box('[aria-label="关闭编辑"]'), footer: box('[data-slot="footer"]'), save: box('[type="submit"]') };
  154 |     });
  155 |     expect(facts.fields[0]!.y - facts.description.bottom).toBe(24);
  156 |     expect(facts.fields[1]!.y - facts.fields[0]!.bottom).toBe(20);
  157 |     expect(facts.separator.y - facts.fields[1]!.bottom).toBe(24);
  158 |     expect(facts.noteTitle.y - facts.separator.bottom).toBe(16);
  159 |     expect(facts.note.y - facts.noteTitle.bottom).toBe(4);
  160 |     expect(facts.footer.y - facts.note.bottom).toBe(24);
  161 |     expect(new Set([facts.title.x, facts.fields[0]!.x, facts.fields[1]!.x, facts.separator.x, facts.note.x]).size).toBe(1);
  162 |     expect(facts.save.right).toBe(facts.separator.right);
  163 |     expect(facts.save.height).toBe(32);
  164 |     expect(facts.close.y + facts.close.height / 2).toBe(facts.title.y + facts.title.height / 2);
  165 |     writeFileSync(info.outputPath(`composition-${theme}-${compact}.json`), JSON.stringify(facts, null, 2));
  166 |     await page.screenshot({ path: info.outputPath(`short-${theme}-${compact}.png`) });
  167 |   }
  168 | });
  169 | 
```