# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dialog.spec.ts >> composition: short Dialog keeps one content edge and intentional group intervals
- Location: tests/e2e/dialog.spec.ts:141:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 24
Received: 23.69427490234375
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
        - button "关闭编辑" [ref=e100] [cursor=pointer]
      - generic [ref=e103]:
        - generic [ref=e104]:
          - generic [ref=e105]:
            - generic [ref=e106]:
              - text: 课程名称
              - generic [ref=e107]: "*"
            - generic [ref=e108]:
              - textbox "课程名称" [active] [ref=e109]: 设计方法与实践
              - button "清除课程名称" [ref=e111] [cursor=pointer]
          - generic [ref=e114]:
            - generic [ref=e115]:
              - text: 教学方式
              - generic [ref=e116]: "*"
            - generic [ref=e117]:
              - combobox "教学方式" [ref=e119] [cursor=pointer]:
                - generic "研讨课" [ref=e121]
              - generic [ref=e125]: 已选：研讨课
            - textbox [ref=e126]: seminar
            - generic [ref=e127]: 根据本学期的主要教学方式选择。
        - region "调整说明" [ref=e128]:
          - separator [ref=e129]
          - generic [ref=e130]:
            - heading "调整后会发生什么" [level=3] [ref=e131]
            - paragraph [ref=e132]: 课程名称将用于课程空间与学习提醒。修改教学方式不会改变已发布的学习任务。
      - generic [ref=e133]:
        - status
        - generic [ref=e134]:
          - button "取消" [ref=e135] [cursor=pointer]
          - button "保存更改" [ref=e137] [cursor=pointer]
```

# Test source

```ts
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
  74  |     expect(await footer.boundingBox()).toEqual(before); expect(before!.y + before!.height).toBeLessThanOrEqual(784);
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
> 155 |     expect(facts.fields[0]!.y - facts.description.bottom).toBe(24);
      |                                                           ^ Error: expect(received).toBe(expected) // Object.is equality
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