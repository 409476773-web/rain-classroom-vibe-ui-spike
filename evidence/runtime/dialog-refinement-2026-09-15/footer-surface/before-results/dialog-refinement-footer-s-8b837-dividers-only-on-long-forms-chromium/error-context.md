# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dialog-refinement.spec.ts >> footer shares the popup surface with dividers only on long forms
- Location: tests/e2e/dialog-refinement.spec.ts:113:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rgb(255, 255, 255)"
Received: "rgb(247, 249, 255)"
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
  20  |       ["轻度聚焦", "focus", "rgba(34, 48, 81, 0.15)", "rgba(5, 9, 26, 0.7)"],
  21  |       ["模态任务", "modal", "rgba(34, 48, 81, 0.5)", "rgba(3, 5, 16, 0.9)"],
  22  |       ["特殊沉浸", "immersive", "rgba(27, 35, 56, 0.8)", "rgba(5, 9, 26, 0.9)"],
  23  |     ]) {
  24  |       await page.getByRole("combobox", { name: "预览蒙层" }).click(); await page.getByRole("option", { name, exact: true }).click();
  25  |       await page.getByRole("button", { name: "416px", exact: true }).click(); await settled(modal(page));
  26  |       if (value === "none") await expect(page.locator('.rain-dialog-backdrop')).toHaveCount(0);
  27  |       else {
  28  |         await expect(page.locator('.rain-dialog-backdrop')).toHaveCSS("background-color", theme === "light" ? light! : dark!);
  29  |         expect(await visibleMasks(page)).toBe(1);
  30  |       }
  31  |       facts.push({ theme, value, background: await page.locator('.dialog-review').evaluate(el => getComputedStyle(el).backgroundColor) });
  32  |       await page.screenshot({ path: info.outputPath(`mask-${theme}-${value}.png`) });
  33  |       await page.mouse.click(5, 5);
  34  |       if (value === "separation" || value === "focus") await expect(modal(page)).toHaveCount(0);
  35  |       else { await expect(modal(page)).toBeVisible(); await page.keyboard.press("Escape"); await expect(modal(page)).toHaveCount(0); }
  36  |     }
  37  |   }
  38  |   writeFileSync(info.outputPath("mask-facts.json"), JSON.stringify(facts, null, 2));
  39  | });
  40  | 
  41  | test("border-box widths, 40/60/16 insets and short-view action access", async ({ page }, info) => {
  42  |   const facts = [];
  43  |   for (const viewport of [{ width: 1440, height: 900 }, { width: 375, height: 667 }, { width: 320, height: 568 }]) {
  44  |     await page.setViewportSize(viewport); await page.goto("/#dialog");
  45  |     for (const inset of [40, 60]) {
  46  |       if (inset === 60) await toggle(page, "桌面边距 60px");
  47  |       for (const width of [416, 616, 1116, "viewport"] as const) {
  48  |         await page.getByRole("button", { name: width === "viewport" ? "随视口扩展" : `${width}px`, exact: true }).click();
  49  |         const popup = modal(page); await settled(popup);
  50  |         const rect = (await popup.boundingBox())!, margin = viewport.width <= 640 ? 16 : inset;
  51  |         const expected = width === "viewport" ? viewport.width - margin * 2 : Math.min(width, viewport.width - margin * 2);
  52  |         expect(rect.width).toBeCloseTo(expected, 1); expect(rect.x).toBeCloseTo((viewport.width - expected) / 2, 1);
  53  |         expect(rect.height).toBeGreaterThanOrEqual(128); expect(rect.y).toBeGreaterThanOrEqual(margin - 1);
  54  |         expect(rect.y + rect.height).toBeLessThanOrEqual(viewport.height - margin + 1);
  55  |         expect(await popup.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  56  |         facts.push({ viewport, inset, width, rect });
  57  |         await page.keyboard.press("Escape"); await expect(popup).toHaveCount(0);
  58  |       }
  59  |     }
  60  |   }
  61  |   await page.setViewportSize({ width: 375, height: 180 }); await page.goto("/#dialog");
  62  |   await page.getByRole("button", { name: "编辑课程资料", exact: true }).click();
  63  |   await settled(modal(page));
  64  |   await page.getByRole("button", { name: "取消", exact: true }).scrollIntoViewIfNeeded();
  65  |   const button = (await page.getByRole("button", { name: "取消", exact: true }).boundingBox())!;
  66  |   expect(button.y).toBeGreaterThanOrEqual(16); expect(button.y + button.height).toBeLessThanOrEqual(164);
  67  |   await page.screenshot({ path: info.outputPath("short-viewport.png") });
  68  |   await page.getByRole("button", { name: "取消", exact: true }).click(); await expect(modal(page)).toHaveCount(0);
  69  |   writeFileSync(info.outputPath("geometry.json"), JSON.stringify(facts, null, 2));
  70  | });
  71  | 
  72  | for (const theme of ["light", "dark"]) test(`nested confirmation preserves draft, scroll and safe focus: ${theme}`, async ({ page }, info) => {
  73  |   await page.goto("/#dialog"); if (theme === "dark") await toggle(page, "深色主题"); await toggle(page, "长内容");
  74  |   const trigger = page.getByRole("button", { name: "编辑课程资料", exact: true }); await trigger.click();
  75  |   const popup = modal(page), body = popup.locator('[data-slot="body"]'); await settled(popup);
  76  |   await popup.getByRole("textbox", { name: "课程名称" }).fill("保留草稿与滚动位置");
  77  |   await body.evaluate(el => { el.scrollTop = 280; }); const scroll = await body.evaluate(el => el.scrollTop);
  78  |   const backgroundScroll = await page.evaluate(() => window.scrollY);
  79  |   await popup.getByRole("button", { name: "取消", exact: true }).click();
  80  |   const alert = page.getByRole("alertdialog", { name: "放弃课程修改？" }); await settled(alert);
  81  |   await expect(alert.getByRole("button", { name: "继续编辑" })).toBeFocused();
  82  |   await expect(alert).toHaveAttribute("data-rain-theme", theme); expect(await visibleMasks(page)).toBe(1);
  83  |   await expect(popup).toHaveAttribute("data-nested-dialog-open", "");
  84  |   await expect(alert).not.toHaveAttribute("data-local-recipe");
  85  |   await page.mouse.click(5, 5); await expect(alert).toBeVisible();
  86  |   await page.mouse.wheel(0, 600); expect(await page.evaluate(() => window.scrollY)).toBe(backgroundScroll);
  87  |   await page.screenshot({ path: info.outputPath(`nested-${theme}.png`) });
  88  |   await page.keyboard.press("Escape"); await expect(alert).toHaveCount(0);
  89  |   await expect(popup.getByRole("button", { name: "取消", exact: true })).toBeFocused();
  90  |   expect(await body.evaluate(el => el.scrollTop)).toBe(scroll);
  91  |   await expect(popup.getByRole("textbox", { name: "课程名称" })).toHaveValue("保留草稿与滚动位置");
  92  |   expect(await visibleMasks(page)).toBe(1);
  93  |   await popup.getByRole("button", { name: "关闭编辑" }).click(); await settled(alert);
  94  |   await alert.getByRole("button", { name: "放弃修改" }).click();
  95  |   await expect(page.locator('.rain-dialog-portal .rain-dialog-portal > .rain-dialog-backdrop')).toHaveCSS("transition-duration", "0.18s");
  96  |   await expect(popup).toHaveCount(0); await expect(alert).toHaveCount(0); await expect(trigger).toBeFocused();
  97  |   await expect(page.locator('.rain-dialog-backdrop')).toHaveCount(0);
  98  |   await trigger.click(); await expect(popup.getByRole("textbox", { name: "课程名称" })).toHaveValue("设计方法与实践");
  99  | });
  100 | 
  101 | test("actual action groups use 8 or 12px and one primary action", async ({ page }) => {
  102 |   for (const gap of [8, 12]) {
  103 |     await page.goto("/#dialog"); if (gap === 12) await toggle(page, "按钮间距 12px");
  104 |     await page.getByRole("button", { name: "编辑课程资料", exact: true }).click(); await settled(modal(page));
  105 |     const actions = modal(page).locator('.course-dialog-actions'); await expect(actions).toHaveCSS("gap", `${gap}px`);
  106 |     await expect(actions.locator('[data-variant="primary"]')).toHaveCount(1);
  107 |     const boxes = await actions.getByRole("button").evaluateAll(buttons => buttons.map(b => { const r = b.getBoundingClientRect(); return { x: r.x, right: r.right }; }));
  108 |     expect(boxes[1]!.x - boxes[0]!.right).toBeCloseTo(gap, 1);
  109 |     await page.keyboard.press("Escape"); await expect(modal(page)).toHaveCount(0);
  110 |   }
  111 | });
  112 | 
  113 | test("footer shares the popup surface with dividers only on long forms", async ({ page }, info) => {
  114 |   async function checkFooter(popup: Locator, divider: boolean) {
  115 |     const paint = await popup.evaluate(el => {
  116 |       const footer = el.querySelector('[data-slot="footer"]')!, surface = getComputedStyle(el).backgroundColor;
  117 |       const background = getComputedStyle(footer).backgroundColor;
  118 |       return { surface, footer: background === "rgba(0, 0, 0, 0)" ? surface : background };
  119 |     });
> 120 |     expect(paint.footer).toBe(paint.surface);
      |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  121 |     await expect(popup.locator('[data-slot="footer"]').first()).toHaveCSS("border-top-width", divider ? "1px" : "0px");
  122 |     expect(await popup.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  123 |   }
  124 |   for (const theme of ["light", "dark"]) for (const width of [1440, 375]) for (const longContent of [false, true]) {
  125 |     await page.setViewportSize({ width, height: width === 375 ? 667 : 900 });
  126 |     await page.goto("/#dialog"); if (theme === "dark") await toggle(page, "深色主题");
  127 |     if (longContent) await toggle(page, "长内容");
  128 |     await page.getByRole("button", { name: "编辑课程资料", exact: true }).click();
  129 |     const popup = modal(page); await settled(popup);
  130 |     await checkFooter(popup, longContent);
  131 |     await page.screenshot({ path: info.outputPath(`footer-${theme}-${width}-${longContent ? "long" : "short"}.png`) });
  132 |     await popup.getByRole("textbox", { name: "课程名称" }).fill("设计方法与实践（修改）");
  133 |     await popup.getByRole("button", { name: "取消", exact: true }).click();
  134 |     const alert = page.getByRole("alertdialog", { name: "放弃课程修改？" }); await settled(alert);
  135 |     await checkFooter(alert, false);
  136 |     await page.screenshot({ path: info.outputPath(`footer-${theme}-${width}-${longContent ? "long" : "short"}-confirmation.png`) });
  137 |   }
  138 | });
  139 | 
  140 | test("180ms centered transitions, reversible paint and reduced motion", async ({ page }, info) => {
  141 |   await page.goto("/#dialog"); await page.getByRole("button", { name: "616px", exact: true }).click();
  142 |   const popup = modal(page); await settled(popup);
  143 |   await expect(popup).toHaveCSS("transition-duration", "0.18s, 0.18s");
  144 |   const samples = await popup.evaluate(async el => {
  145 |     // Exercise the CSS transition's reversal using the same public lifecycle attributes as Base UI.
  146 |     const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
  147 |     const sample = () => { const r = el.getBoundingClientRect(); return { opacity: Number(getComputedStyle(el).opacity), x: r.x + r.width / 2, y: r.y + r.height / 2 }; };
  148 |     const before = sample(); el.setAttribute("data-ending-style", ""); await frame(); await frame(); await frame();
  149 |     const closing = sample(); el.removeAttribute("data-ending-style"); await frame(); const reversed = sample();
  150 |     return { before, closing, reversed };
  151 |   });
  152 |   expect(samples.closing.opacity).toBeLessThan(1); expect(samples.closing.opacity).toBeGreaterThan(0);
  153 |   expect(Math.abs(samples.reversed.opacity - samples.closing.opacity)).toBeLessThan(.5);
  154 |   for (const sample of Object.values(samples)) { expect(sample.x).toBeCloseTo(640, 1); expect(sample.y).toBeCloseTo(360, 1); }
  155 |   await settled(popup);
  156 |   await page.keyboard.press("Escape");
  157 |   // The painted backdrop must keep intercepting background pointer input until unmount.
  158 |   const exitTarget = await page.evaluate(() => document.elementFromPoint(5, 5)?.className);
  159 |   expect(exitTarget).toContain("rain-dialog-backdrop"); await expect(popup).toHaveCount(0);
  160 |   await page.emulateMedia({ reducedMotion: "reduce" }); await page.getByRole("button", { name: "随视口扩展" }).click();
  161 |   await expect(popup).toHaveCSS("transition-duration", "0s, 0s"); await settled(popup);
  162 |   await expect(popup).toHaveCSS("opacity", "1");
  163 |   writeFileSync(info.outputPath("motion.json"), JSON.stringify(samples, null, 2));
  164 | });
  165 | 
  166 | 
  167 | test("no-mask modal blocks background clicks throughout exit without painting a mask", async ({ page }) => {
  168 |   await page.goto("/#dialog");
  169 |   await page.getByRole("combobox", { name: "预览蒙层" }).click(); await page.getByRole("option", { name: "无蒙层", exact: true }).click();
  170 |   const trigger = page.getByRole("button", { name: "616px", exact: true }); await trigger.scrollIntoViewIfNeeded();
  171 |   const box = (await trigger.boundingBox())!, point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  172 |   await trigger.evaluate(el => { el.dataset.clicks = "0"; el.addEventListener("click", () => { el.dataset.clicks = String(Number(el.dataset.clicks) + 1); }); });
  173 |   await trigger.click(); await settled(modal(page)); await expect(page.locator('.rain-dialog-backdrop')).toHaveCount(0);
  174 |   await page.keyboard.press("Escape");
  175 |   expect(await page.evaluate(p => document.elementFromPoint(p.x, p.y)?.className, point)).toContain("rain-dialog-portal");
  176 |   await page.mouse.click(point.x, point.y); await expect(modal(page)).toHaveCount(0); await expect(trigger).toHaveAttribute("data-clicks", "1");
  177 | });
  178 | 
  179 | 
  180 | test("visual viewport shrink and pan keep actions reachable without changing the layout viewport", async ({ page }, info) => {
  181 |   await page.setViewportSize({ width: 1280, height: 900 }); await page.goto("/#dialog");
  182 |   await page.getByRole("button", { name: "编辑课程资料", exact: true }).click(); await settled(modal(page));
  183 |   const before = await page.evaluate(() => ({ width: innerWidth, height: innerHeight }));
  184 |   await page.evaluate(() => {
  185 |     const viewport = window.visualViewport!;
  186 |     for (const [key, value] of Object.entries({ width: 375, height: 320, offsetLeft: 30, offsetTop: 80 })) Object.defineProperty(viewport, key, { configurable: true, get: () => value });
  187 |     viewport.dispatchEvent(new Event("resize")); viewport.dispatchEvent(new Event("scroll"));
  188 |   });
  189 |   const popup = modal(page), box = (await popup.boundingBox())!;
  190 |   expect(await page.evaluate(() => ({ width: innerWidth, height: innerHeight }))).toEqual(before);
  191 |   expect(box.width).toBeCloseTo(343, 1); expect(box.x).toBeCloseTo(46, 1);
  192 |   expect(box.y).toBeGreaterThanOrEqual(96); expect(box.y + box.height).toBeLessThanOrEqual(384);
  193 |   const cancel = popup.getByRole("button", { name: "取消", exact: true }); await cancel.scrollIntoViewIfNeeded();
  194 |   const action = (await cancel.boundingBox())!; expect(action.y).toBeGreaterThanOrEqual(96); expect(action.y + action.height).toBeLessThanOrEqual(384);
  195 |   await page.screenshot({ path: info.outputPath("visual-viewport.png") });
  196 |   await cancel.click(); await expect(popup).toHaveCount(0);
  197 | });
  198 | 
  199 | 
  200 | test("long titles and action labels retain typography and wrap safely on a narrow screen", async ({ page }, info) => {
  201 |   await page.setViewportSize({ width: 320, height: 568 }); await page.goto("/#dialog");
  202 |   await page.getByRole("button", { name: "编辑课程资料", exact: true }).click(); const popup = modal(page); await settled(popup);
  203 |   await popup.evaluate(el => {
  204 |     // Stress the public parts with longer content while retaining the real Button label/size structure.
  205 |     el.querySelector('[data-slot="title"]')!.textContent = "调整《设计方法与实践》课程资料及本学期教学安排";
  206 |     const labels = el.querySelectorAll('.course-dialog-actions [data-slot="label"]');
  207 |     labels[0]!.textContent = "返回继续检查课程资料"; labels[1]!.textContent = "确认并保存本次课程修改";
  208 |   });
  209 |   const facts = await popup.evaluate(el => {
  210 |     const rect = el.getBoundingClientRect(), title = el.querySelector('[data-slot="title"]')!, close = el.querySelector('[aria-label="关闭编辑"]')!;
  211 |     return { overflow: el.scrollWidth > el.clientWidth, titleTop: title.getBoundingClientRect().y, lineHeight: parseFloat(getComputedStyle(title).lineHeight), close: close.getBoundingClientRect().toJSON(),
  212 |       actions: [...el.querySelectorAll('.course-dialog-actions button')].map(button => ({ box: button.getBoundingClientRect().toJSON(), font: getComputedStyle(button.querySelector('[data-slot="label"]')!).fontSize })), rect: rect.toJSON() };
  213 |   });
  214 |   expect(facts.overflow).toBe(false); expect(facts.close.y + facts.close.height / 2).toBeCloseTo(facts.titleTop + facts.lineHeight / 2, 1);
  215 |   expect(facts.actions[1]!.box.y).toBeGreaterThan(facts.actions[0]!.box.y);
  216 |   for (const action of facts.actions) { expect(action.font).toBe("14px"); expect(action.box.x).toBeGreaterThanOrEqual(facts.rect.x + 24); expect(action.box.right).toBeLessThanOrEqual(facts.rect.right - 24); }
  217 |   await page.screenshot({ path: info.outputPath("long-labels-narrow.png") });
  218 | });
  219 | 
  220 | test("reopening through the real trigger reverses an in-flight exit without remounting", async ({ page }, info) => {
```