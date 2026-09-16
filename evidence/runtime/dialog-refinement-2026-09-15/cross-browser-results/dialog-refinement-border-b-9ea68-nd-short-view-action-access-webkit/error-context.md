# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dialog-refinement.spec.ts >> border-box widths, 40/60/16 insets and short-view action access
- Location: tests/e2e/dialog-refinement.spec.ts:37:1

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 343
Received: 336.14000701904297

Expected precision:    1
Expected difference: < 0.05
Received difference:   6.859992980957031
```

# Page snapshot

```yaml
- generic [ref=f1e1]:
  - main [ref=f1e4]:
    - generic [ref=f1e5]:
      - link [ref=f1e6]:
        - /url: "#components"
        - generic [ref=f1e7]: 返回组件
      - heading [level=1] [ref=f1e8]: Dialog 对话框
      - paragraph [ref=f1e9]: 集中完成一项编辑或确认，保留任务上下文与明确的返回路径。
      - generic [ref=f1e10]: 待评审候选
      - generic [ref=f1e13]:
        - generic [ref=f1e14] [cursor=pointer]:
          - checkbox [ref=f1e15]
          - generic [ref=f1e18]: 深色主题
        - generic [ref=f1e20] [cursor=pointer]:
          - checkbox [ref=f1e21]
          - generic [ref=f1e24]: 紧凑控件
        - generic [ref=f1e26] [cursor=pointer]:
          - checkbox [ref=f1e27]
          - generic [ref=f1e30]: 长内容
      - generic [ref=f1e32] [cursor=pointer]:
        - checkbox [ref=f1e33]
        - generic [ref=f1e36]: 按钮间距 12px
      - region [ref=f1e38]:
        - generic [ref=f1e39]:
          - heading [level=2] [ref=f1e40]: 课程资料
          - paragraph [ref=f1e41]: 设计方法与实践
          - paragraph [ref=f1e42]: 研讨课
        - button [ref=f1e43] [cursor=pointer]:
          - generic [ref=f1e44]: 编辑课程资料
        - paragraph [ref=f1e45]: 虚构课程演示：每次打开后首次保存会模拟失败，重试可成功。有未保存修改时，取消会先请求确认。
      - generic [ref=f1e46]:
        - heading [level=2] [ref=f1e47]: 重要确认
        - button [ref=f1e48] [cursor=pointer]:
          - generic [ref=f1e49]: 查看发布提示
      - generic [ref=f1e50]:
        - heading [level=2] [ref=f1e51]: 尺寸与蒙层
        - paragraph [ref=f1e52]: 固定档位以外框计量。桌面保留40或60px，窄屏保留16px；无蒙层只影响绘制，模态与关闭策略分别配置。
        - generic [ref=f1e53]:
          - generic [ref=f1e54]:
            - generic [ref=f1e55]: 预览蒙层
            - generic [ref=f1e56]:
              - combobox [ref=f1e58] [cursor=pointer]:
                - generic [ref=f1e59]: 模态任务
              - generic [ref=f1e64]: 已选：模态任务
            - textbox [ref=f1e65]: modal
          - generic [ref=f1e66] [cursor=pointer]:
            - checkbox [ref=f1e67]
            - generic [ref=f1e70]: 桌面边距 60px
        - generic [ref=f1e72]:
          - button [ref=f1e73] [cursor=pointer]:
            - generic [ref=f1e74]: 416px
          - button [expanded] [ref=f1e75] [cursor=pointer]:
            - generic [ref=f1e76]: 616px
          - button [ref=f1e77] [cursor=pointer]:
            - generic [ref=f1e78]: 1116px
          - button [ref=f1e79] [cursor=pointer]:
            - generic [ref=f1e80]: 随视口扩展
      - generic [ref=f1e81]:
        - heading [level=2] [ref=f1e82]: Separator 分隔线
        - paragraph [ref=f1e83]: 用于区分相邻内容组，不承担交互。
        - separator [ref=f1e84]
        - generic [ref=f1e85]:
          - generic [ref=f1e86]: 课程介绍
          - separator [ref=f1e87]
          - generic [ref=f1e88]: 学习安排
      - group [ref=f1e89]:
        - generic [ref=f1e90] [cursor=pointer]: 使用与验证边界
  - generic:
    - button [ref=f1e93]
    - dialog [ref=f1e94]:
      - generic [ref=f1e95]:
        - generic [ref=f1e96]:
          - heading "尺寸预览" [level=2] [ref=f1e97]
          - paragraph [ref=f1e98]: 弹窗保持居中，内容增加时由正文滚动。
        - paragraph [ref=f1e100]: 选择适合当前任务的宽度。复杂任务可使用随视口扩展模式。
        - button "完成预览" [active] [ref=f1e102] [cursor=pointer]
    - button [ref=f1e104]
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from "@playwright/test";
  2   | import { writeFileSync } from "node:fs";
  3   | 
  4   | const modal = (page: Page) => page.locator('.rain-dialog[data-rain-id="ui-dialog"]');
  5   | async function settled(popup: Locator) { await expect.poll(() => popup.evaluate(el => el.getAnimations().length)).toBe(0); }
  6   | async function toggle(page: Page, name: string) { await page.getByRole("checkbox", { name, exact: true }).focus(); await page.keyboard.press("Space"); }
  7   | async function visibleMasks(page: Page) { return page.locator('.rain-dialog-backdrop').evaluateAll(elements => elements.filter(el => getComputedStyle(el).visibility === "visible" && Number(getComputedStyle(el).opacity) > 0).length); }
  8   | 
  9   | test("confirmed mask paints, one effective layer and weak-mask dismissal in both themes", async ({ page }, info) => {
  10  |   await page.setViewportSize({ width: 1440, height: 900 });
  11  |   const facts = [];
  12  |   for (const theme of ["light", "dark"]) {
  13  |     await page.goto("/#dialog"); if (theme === "dark") await toggle(page, "深色主题");
  14  |     for (const [name, value, light, dark] of [
  15  |       ["无蒙层", "none", "", ""], ["视觉区分", "separation", "rgba(34, 48, 81, 0.06)", "rgba(5, 9, 26, 0.15)"],
  16  |       ["轻度聚焦", "focus", "rgba(34, 48, 81, 0.15)", "rgba(5, 9, 26, 0.7)"],
  17  |       ["模态任务", "modal", "rgba(34, 48, 81, 0.5)", "rgba(3, 5, 16, 0.9)"],
  18  |       ["特殊沉浸", "immersive", "rgba(27, 35, 56, 0.8)", "rgba(5, 9, 26, 0.9)"],
  19  |     ]) {
  20  |       await page.getByRole("combobox", { name: "预览蒙层" }).click(); await page.getByRole("option", { name, exact: true }).click();
  21  |       await page.getByRole("button", { name: "416px", exact: true }).click(); await settled(modal(page));
  22  |       if (value === "none") await expect(page.locator('.rain-dialog-backdrop')).toHaveCount(0);
  23  |       else {
  24  |         await expect(page.locator('.rain-dialog-backdrop')).toHaveCSS("background-color", theme === "light" ? light! : dark!);
  25  |         expect(await visibleMasks(page)).toBe(1);
  26  |       }
  27  |       facts.push({ theme, value, background: await page.locator('.dialog-review').evaluate(el => getComputedStyle(el).backgroundColor) });
  28  |       await page.screenshot({ path: info.outputPath(`mask-${theme}-${value}.png`) });
  29  |       await page.mouse.click(5, 5);
  30  |       if (value === "separation" || value === "focus") await expect(modal(page)).toHaveCount(0);
  31  |       else { await expect(modal(page)).toBeVisible(); await page.keyboard.press("Escape"); await expect(modal(page)).toHaveCount(0); }
  32  |     }
  33  |   }
  34  |   writeFileSync(info.outputPath("mask-facts.json"), JSON.stringify(facts, null, 2));
  35  | });
  36  | 
  37  | test("border-box widths, 40/60/16 insets and short-view action access", async ({ page }, info) => {
  38  |   const facts = [];
  39  |   for (const viewport of [{ width: 1440, height: 900 }, { width: 375, height: 667 }, { width: 320, height: 568 }]) {
  40  |     await page.setViewportSize(viewport); await page.goto("/#dialog");
  41  |     for (const inset of [40, 60]) {
  42  |       if (inset === 60) await toggle(page, "桌面边距 60px");
  43  |       for (const width of [416, 616, 1116, "viewport"] as const) {
  44  |         await page.getByRole("button", { name: width === "viewport" ? "随视口扩展" : `${width}px`, exact: true }).click();
  45  |         const popup = modal(page); await settled(popup);
  46  |         const rect = (await popup.boundingBox())!, margin = viewport.width <= 640 ? 16 : inset;
  47  |         const expected = width === "viewport" ? viewport.width - margin * 2 : Math.min(width, viewport.width - margin * 2);
> 48  |         expect(rect.width).toBeCloseTo(expected, 1); expect(rect.x).toBeCloseTo((viewport.width - expected) / 2, 1);
      |                            ^ Error: expect(received).toBeCloseTo(expected, precision)
  49  |         expect(rect.height).toBeGreaterThanOrEqual(128); expect(rect.y).toBeGreaterThanOrEqual(margin - 1);
  50  |         expect(rect.y + rect.height).toBeLessThanOrEqual(viewport.height - margin + 1);
  51  |         expect(await popup.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  52  |         facts.push({ viewport, inset, width, rect });
  53  |         await page.keyboard.press("Escape"); await expect(popup).toHaveCount(0);
  54  |       }
  55  |     }
  56  |   }
  57  |   await page.setViewportSize({ width: 375, height: 180 }); await page.goto("/#dialog");
  58  |   await page.getByRole("button", { name: "编辑课程资料", exact: true }).click();
  59  |   await settled(modal(page));
  60  |   await page.getByRole("button", { name: "取消", exact: true }).scrollIntoViewIfNeeded();
  61  |   const button = (await page.getByRole("button", { name: "取消", exact: true }).boundingBox())!;
  62  |   expect(button.y).toBeGreaterThanOrEqual(16); expect(button.y + button.height).toBeLessThanOrEqual(164);
  63  |   await page.screenshot({ path: info.outputPath("short-viewport.png") });
  64  |   await page.getByRole("button", { name: "取消", exact: true }).click(); await expect(modal(page)).toHaveCount(0);
  65  |   writeFileSync(info.outputPath("geometry.json"), JSON.stringify(facts, null, 2));
  66  | });
  67  | 
  68  | for (const theme of ["light", "dark"]) test(`nested confirmation preserves draft, scroll and safe focus: ${theme}`, async ({ page }, info) => {
  69  |   await page.goto("/#dialog"); if (theme === "dark") await toggle(page, "深色主题"); await toggle(page, "长内容");
  70  |   const trigger = page.getByRole("button", { name: "编辑课程资料", exact: true }); await trigger.click();
  71  |   const popup = modal(page), body = popup.locator('[data-slot="body"]'); await settled(popup);
  72  |   await popup.getByRole("textbox", { name: "课程名称" }).fill("保留草稿与滚动位置");
  73  |   await body.evaluate(el => { el.scrollTop = 280; }); const scroll = await body.evaluate(el => el.scrollTop);
  74  |   const backgroundScroll = await page.evaluate(() => window.scrollY);
  75  |   await popup.getByRole("button", { name: "取消", exact: true }).click();
  76  |   const alert = page.getByRole("alertdialog", { name: "放弃课程修改？" }); await settled(alert);
  77  |   await expect(alert.getByRole("button", { name: "继续编辑" })).toBeFocused();
  78  |   await expect(alert).toHaveAttribute("data-rain-theme", theme); expect(await visibleMasks(page)).toBe(1);
  79  |   await expect(popup).toHaveAttribute("data-nested-dialog-open", "");
  80  |   await expect(alert).not.toHaveAttribute("data-local-recipe");
  81  |   await page.mouse.click(5, 5); await expect(alert).toBeVisible();
  82  |   await page.mouse.wheel(0, 600); expect(await page.evaluate(() => window.scrollY)).toBe(backgroundScroll);
  83  |   await page.screenshot({ path: info.outputPath(`nested-${theme}.png`) });
  84  |   await page.keyboard.press("Escape"); await expect(alert).toHaveCount(0);
  85  |   await expect(popup.getByRole("button", { name: "取消", exact: true })).toBeFocused();
  86  |   expect(await body.evaluate(el => el.scrollTop)).toBe(scroll);
  87  |   await expect(popup.getByRole("textbox", { name: "课程名称" })).toHaveValue("保留草稿与滚动位置");
  88  |   expect(await visibleMasks(page)).toBe(1);
  89  |   await popup.getByRole("button", { name: "关闭编辑" }).click(); await settled(alert);
  90  |   await alert.getByRole("button", { name: "放弃修改" }).click();
  91  |   await expect(page.locator('.rain-dialog-portal .rain-dialog-portal > .rain-dialog-backdrop')).toHaveCSS("transition-duration", "0.18s");
  92  |   await expect(popup).toHaveCount(0); await expect(alert).toHaveCount(0); await expect(trigger).toBeFocused();
  93  |   await expect(page.locator('.rain-dialog-backdrop')).toHaveCount(0);
  94  |   await trigger.click(); await expect(popup.getByRole("textbox", { name: "课程名称" })).toHaveValue("设计方法与实践");
  95  | });
  96  | 
  97  | test("actual action groups use 8 or 12px and one primary action", async ({ page }) => {
  98  |   for (const gap of [8, 12]) {
  99  |     await page.goto("/#dialog"); if (gap === 12) await toggle(page, "按钮间距 12px");
  100 |     await page.getByRole("button", { name: "编辑课程资料", exact: true }).click(); await settled(modal(page));
  101 |     const actions = modal(page).locator('.course-dialog-actions'); await expect(actions).toHaveCSS("gap", `${gap}px`);
  102 |     await expect(actions.locator('[data-variant="primary"]')).toHaveCount(1);
  103 |     const boxes = await actions.getByRole("button").evaluateAll(buttons => buttons.map(b => { const r = b.getBoundingClientRect(); return { x: r.x, right: r.right }; }));
  104 |     expect(boxes[1]!.x - boxes[0]!.right).toBeCloseTo(gap, 1);
  105 |     await page.keyboard.press("Escape"); await expect(modal(page)).toHaveCount(0);
  106 |   }
  107 | });
  108 | 
  109 | test("180ms centered transitions, reversible paint and reduced motion", async ({ page }, info) => {
  110 |   await page.goto("/#dialog"); await page.getByRole("button", { name: "616px", exact: true }).click();
  111 |   const popup = modal(page); await settled(popup);
  112 |   await expect(popup).toHaveCSS("transition-duration", "0.18s, 0.18s");
  113 |   const samples = await popup.evaluate(async el => {
  114 |     // Exercise the CSS transition's reversal using the same public lifecycle attributes as Base UI.
  115 |     const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
  116 |     const sample = () => { const r = el.getBoundingClientRect(); return { opacity: Number(getComputedStyle(el).opacity), x: r.x + r.width / 2, y: r.y + r.height / 2 }; };
  117 |     const before = sample(); el.setAttribute("data-ending-style", ""); await frame(); await frame(); await frame();
  118 |     const closing = sample(); el.removeAttribute("data-ending-style"); await frame(); const reversed = sample();
  119 |     return { before, closing, reversed };
  120 |   });
  121 |   expect(samples.closing.opacity).toBeLessThan(1); expect(samples.closing.opacity).toBeGreaterThan(0);
  122 |   expect(Math.abs(samples.reversed.opacity - samples.closing.opacity)).toBeLessThan(.5);
  123 |   for (const sample of Object.values(samples)) { expect(sample.x).toBeCloseTo(640, 1); expect(sample.y).toBeCloseTo(360, 1); }
  124 |   await settled(popup);
  125 |   await page.keyboard.press("Escape");
  126 |   // The painted backdrop must keep intercepting background pointer input until unmount.
  127 |   const exitTarget = await page.evaluate(() => document.elementFromPoint(5, 5)?.className);
  128 |   expect(exitTarget).toContain("rain-dialog-backdrop"); await expect(popup).toHaveCount(0);
  129 |   await page.emulateMedia({ reducedMotion: "reduce" }); await page.getByRole("button", { name: "随视口扩展" }).click();
  130 |   await expect(popup).toHaveCSS("transition-duration", "0s, 0s"); await settled(popup);
  131 |   await expect(popup).toHaveCSS("opacity", "1");
  132 |   writeFileSync(info.outputPath("motion.json"), JSON.stringify(samples, null, 2));
  133 | });
  134 | 
  135 | 
  136 | test("no-mask modal blocks background clicks throughout exit without painting a mask", async ({ page }) => {
  137 |   await page.goto("/#dialog");
  138 |   await page.getByRole("combobox", { name: "预览蒙层" }).click(); await page.getByRole("option", { name: "无蒙层", exact: true }).click();
  139 |   const trigger = page.getByRole("button", { name: "616px", exact: true }); await trigger.scrollIntoViewIfNeeded();
  140 |   const box = (await trigger.boundingBox())!, point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  141 |   await trigger.evaluate(el => { el.dataset.clicks = "0"; el.addEventListener("click", () => { el.dataset.clicks = String(Number(el.dataset.clicks) + 1); }); });
  142 |   await trigger.click(); await settled(modal(page)); await expect(page.locator('.rain-dialog-backdrop')).toHaveCount(0);
  143 |   await page.keyboard.press("Escape");
  144 |   expect(await page.evaluate(p => document.elementFromPoint(p.x, p.y)?.className, point)).toContain("rain-dialog-portal");
  145 |   await page.mouse.click(point.x, point.y); await expect(modal(page)).toHaveCount(0); await expect(trigger).toHaveAttribute("data-clicks", "1");
  146 | });
  147 | 
```