# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dialog-refinement.spec.ts >> footer shares the popup surface with dividers only on long forms
- Location: tests/e2e/dialog-refinement.spec.ts:113:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.focus: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('checkbox', { name: '长内容', exact: true })

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
  - generic:
    - dialog [ref=e93]:
      - generic [ref=e94]:
        - generic [ref=e95]:
          - generic [ref=e96]:
            - heading [level=2] [ref=e97]: 编辑课程资料
            - paragraph [ref=e98]: 调整课程名称与教学方式，保存后更新课程信息。
          - button [ref=e99] [cursor=pointer]
        - generic [ref=e102]:
          - generic [ref=e103]:
            - generic [ref=e104]:
              - generic [ref=e105]:
                - text: 课程名称
                - generic [ref=e106]: "*"
              - textbox [ref=e108]: 设计方法与实践（修改）
            - generic [ref=e110]:
              - generic [ref=e111]:
                - text: 教学方式
                - generic [ref=e112]: "*"
              - generic [ref=e113]:
                - combobox [ref=e115] [cursor=pointer]:
                  - generic [ref=e116]: 研讨课
                - generic [ref=e121]: 已选：研讨课
              - textbox [ref=e122]: seminar
              - generic [ref=e123]: 根据本学期的主要教学方式选择。
          - region [ref=e124]:
            - separator [ref=e125]
            - generic [ref=e126]:
              - heading [level=3] [ref=e127]: 调整后会发生什么
              - paragraph [ref=e128]: 课程名称将用于课程空间与学习提醒。修改教学方式不会改变已发布的学习任务。
        - generic [ref=e130]:
          - button [ref=e131] [cursor=pointer]:
            - generic [ref=e132]: 取消
          - button [ref=e133] [cursor=pointer]:
            - generic [ref=e134]: 保存更改
    - alertdialog [ref=e139]:
      - generic [ref=e140]:
        - generic [ref=e141]:
          - heading "放弃课程修改？" [level=2] [ref=e142]
          - paragraph [ref=e143]: 尚未保存的课程名称和教学方式将丢失。
        - generic [ref=e144]:
          - button "继续编辑" [active] [ref=e145] [cursor=pointer]
          - button "放弃修改" [ref=e147] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from "@playwright/test";
  2   | import { writeFileSync } from "node:fs";
  3   | 
  4   | const modal = (page: Page) => page.locator('.rain-dialog[data-rain-id="ui-dialog"]');
  5   | async function settled(popup: Locator) {
  6   |   await expect(popup).not.toHaveAttribute("data-starting-style", "");
  7   |   await expect(popup).toHaveCSS("opacity", "1");
  8   |   await expect.poll(() => popup.evaluate(el => el.getAnimations().length)).toBe(0);
  9   | }
> 10  | async function toggle(page: Page, name: string) { await page.getByRole("checkbox", { name, exact: true }).focus(); await page.keyboard.press("Space"); }
      |                                                                                                           ^ Error: locator.focus: Test timeout of 30000ms exceeded.
  11  | async function visibleMasks(page: Page) { return page.locator('.rain-dialog-backdrop').evaluateAll(elements => elements.filter(el => getComputedStyle(el).visibility === "visible" && Number(getComputedStyle(el).opacity) > 0).length); }
  12  | 
  13  | test("confirmed mask paints, one effective layer and weak-mask dismissal in both themes", async ({ page }, info) => {
  14  |   await page.setViewportSize({ width: 1440, height: 900 });
  15  |   const facts = [];
  16  |   for (const theme of ["light", "dark"]) {
  17  |     await page.goto("/#dialog"); if (theme === "dark") await toggle(page, "深色主题");
  18  |     for (const [name, value, light, dark] of [
  19  |       ["无蒙层", "none", "", ""], ["视觉区分", "separation", "rgba(34, 48, 81, 0.06)", "rgba(5, 9, 26, 0.15)"],
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
```