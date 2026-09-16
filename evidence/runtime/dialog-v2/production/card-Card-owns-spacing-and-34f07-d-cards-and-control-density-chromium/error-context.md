# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: card.spec.ts >> Card owns spacing and parts independently of nested cards and control density
- Location: tests/e2e/card.spec.ts:57:1

# Error details

```
Error: expect(locator).toHaveCSS(expected) failed

Locator:  locator('[data-example="cr-01"]')
Expected: "20px"
Received: "0px"
Timeout:  5000ms

Call log:
  - Expect "toHaveCSS" with timeout 5000ms
  - waiting for locator('[data-example="cr-01"]')
    14 × locator resolved to <article data-slot="root" aria-label="课程公告" data-size="default" data-example="cr-01" data-variant="panel" data-rain-id="ui-card" class="rain-card flex min-w-0 flex-col gap-(--rain-card-section-gap) py-(--rain-card-spacing) overflow-visible rounded-rain-8 border-solid border-rain-line-1 border-rain-category-border-neutral-3 bg-rain-category-background-neutral-1 text-rain-category-text-neutral-2 [--rain-card-spacing:var(--rain-space-20)]">…</article>
       - unexpected value "0px"

```

```yaml
- article "课程公告":
  - heading "课程公告" [level=2]
  - paragraph: 今天 09:30 · 教学团队
  - text: 请在周五前完成第三单元学习。遇到问题时，可以先回看课堂案例，再整理到讨论区。
```

# Test source

```ts
  1   | import { writeFileSync } from "node:fs";
  2   | import { expect, test } from "@playwright/test";
  3   | 
  4   | async function choose(page: import("@playwright/test").Page, label: string, option: string) {
  5   |   await page.getByRole("combobox", { name: label, exact: true }).click();
  6   |   await page.getByRole("option", { name: option, exact: true }).click();
  7   | }
  8   | 
  9   | async function recordCardAppearance(page: import("@playwright/test").Page, testInfo: import("@playwright/test").TestInfo, theme: string) {
  10  |   const paints = await page.locator(".card-gallery").evaluate(gallery => {
  11  |     const rgba = (value: string) => { const channels = value.match(/[\d.]+/g)!.map(Number); return [channels[0]!, channels[1]!, channels[2]!, channels[3] ?? 1]; };
  12  |     const over = (front: number[], back: number[]) => front.slice(0, 3).map((channel, i) => channel * front[3]! + back[i]! * (1 - front[3]!));
  13  |     const surface = (element: Element | null) => {
  14  |       const chain: Element[] = [];
  15  |       for (let node = element; node; node = node.parentElement) chain.unshift(node);
  16  |       return chain.reduce((base, node) => over(rgba(getComputedStyle(node).backgroundColor), base), [255, 255, 255]);
  17  |     };
  18  |     const luminance = (color: number[]) => color.reduce((sum, value, index) => {
  19  |       const channel = value / 255;
  20  |       return sum + (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4) * [0.2126, 0.7152, 0.0722][index]!;
  21  |     }, 0);
  22  |     const contrast = (a: number[], b: number[]) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);
  23  |     return Array.from(gallery.querySelectorAll('[data-slot="title"], [data-slot="description"], [data-slot="content"], [data-slot="value"], [data-slot="unit"], [data-slot="footer"], button [data-slot="label"], .card-action-status')).map(el => {
  24  |       const style = getComputedStyle(el), background = surface(el), box = el.getBoundingClientRect();
  25  |       return { card: el.closest('[data-example]')?.getAttribute('data-example'), slot: el.getAttribute('data-slot') ?? 'status', text: el.textContent,
  26  |         font: style.fontFamily, size: style.fontSize, weight: style.fontWeight, lineHeight: style.lineHeight,
  27  |         color: style.color, background, contrast: contrast(over(rgba(style.color), background), background),
  28  |         width: box.width, height: box.height, borderTop: style.borderTopWidth };
  29  |     });
  30  |   });
  31  |   const focus = [];
  32  |   for (const name of ["更多操作", "保存提醒", "查看课程"]) {
  33  |     const control = page.getByRole("button", { name, exact: true });
  34  |     await control.focus();
  35  |     await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab");
  36  |     await expect(control).toBeFocused();
  37  |     focus.push(await control.evaluate(el => {
  38  |       const style = getComputedStyle(el), parent = getComputedStyle(el.parentElement!);
  39  |       return { name: el.getAttribute('aria-label') ?? el.textContent, color: style.outlineColor, width: style.outlineWidth,
  40  |         style: style.outlineStyle, shadow: style.boxShadow, focusVisible: el.matches(':focus-visible'),
  41  |         parentBackground: parent.backgroundColor, rootBackground: getComputedStyle(el.closest('[data-rain-id="ui-card"]')!).backgroundColor,
  42  |         rootOverflow: getComputedStyle(el.closest('[data-rain-id="ui-card"]')!).overflow };
  43  |     }));
  44  |   }
  45  |   const cdp = await page.context().newCDPSession(page);
  46  |   await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
  47  |   const { root } = await cdp.send("DOM.getDocument");
  48  |   const fonts = [];
  49  |   for (const selector of ['[data-example="cr-01"] [data-slot="title"]', '[data-example="cr-03"] [data-slot="value"]', '[data-example="cr-03"] [data-slot="unit"]']) {
  50  |     const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector });
  51  |     fonts.push({ selector, ...(await cdp.send("CSS.getPlatformFontsForNode", { nodeId })) });
  52  |   }
  53  |   await cdp.detach();
  54  |   writeFileSync(testInfo.outputPath(`card-${theme}-appearance.json`), JSON.stringify({ theme, userAgent: await page.evaluate(() => navigator.userAgent), viewport: page.viewportSize(), paints, focus, fonts }, null, 2));
  55  | }
  56  | 
  57  | test("Card owns spacing and parts independently of nested cards and control density", async ({ page }) => {
  58  |   await page.setViewportSize({ width: 1440, height: 1200 });
  59  |   await page.goto("/#card");
  60  |   const card = (name: string) => page.locator('[data-example="' + name + '"]');
> 61  |   await expect(card("cr-01")).toHaveCSS("padding-top", "20px");
      |                               ^ Error: expect(locator).toHaveCSS(expected) failed
  62  |   await expect(card("cr-01")).toHaveCSS("row-gap", "16px");
  63  |   await expect(card("cr-01").locator('[data-slot="content"]')).toHaveCSS("padding-left", "20px");
  64  |   await expect(page.locator(".card-review-developer")).not.toHaveAttribute("open");
  65  |   await page.getByText("开发验证", { exact: true }).click();
  66  |   await expect(card("isolation-target")).toHaveCSS("padding-top", "24px");
  67  |   await expect(card("isolation-target").locator(':scope > [data-slot="content"]')).toHaveCSS("padding-left", "0px");
  68  |   for (const name of ["nested-default", "isolation-control"]) {
  69  |     await expect(card(name)).toHaveCSS("padding-top", "20px");
  70  |     await expect(card(name).locator(':scope > [data-slot="content"]')).toHaveCSS("padding-left", "20px");
  71  |   }
  72  |   await card("isolation-control").evaluate(el => el.setAttribute("data-size", "sm"));
  73  |   await expect(card("isolation-control")).toHaveCSS("padding-top", "12px");
  74  |   await expect(card("isolation-control")).toHaveCSS("row-gap", "12px");
  75  |   await card("isolation-control").evaluate(el => el.setAttribute("data-size", "default"));
  76  |   expect(await card("isolation-target").locator(':scope > [data-slot="header"]').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(" ").length)).toBe(1);
  77  |   await expect(card("cr-04").locator('[data-slot="action"]')).toHaveCSS("grid-column-start", "2");
  78  |   const input = page.getByRole("textbox", { name: "提醒标题" });
  79  |   const height = await input.evaluate(el => el.getBoundingClientRect().height);
  80  |   await choose(page, "卡片内边距", "12px");
  81  |   await expect(card("cr-01")).toHaveCSS("padding-top", "12px");
  82  |   expect(await input.evaluate(el => el.getBoundingClientRect().height)).toBe(height);
  83  |   await page.getByRole("checkbox", { name: "紧凑控件" }).focus(); await page.keyboard.press("Space");
  84  |   expect(await input.evaluate(el => el.getBoundingClientRect().height)).toBeLessThan(height);
  85  |   await expect(card("cr-01")).toHaveCSS("padding-top", "12px");
  86  |   await page.getByText("更多预览条件", { exact: true }).click();
  87  |   await page.getByRole("checkbox", { name: "显示 Header" }).focus(); await page.keyboard.press("Space");
  88  |   await page.getByRole("checkbox", { name: "显示 Footer" }).focus(); await page.keyboard.press("Space");
  89  |   await expect(card("cr-04").locator('[data-slot="header"], [data-slot="footer"]')).toHaveCount(0);
  90  |   await expect(card("cr-04").locator('[data-slot="content"]')).toBeVisible();
  91  |   await expect(card("cr-04")).toHaveCSS("padding-bottom", "12px");
  92  |   await expect(card("cr-01")).not.toHaveAttribute("tabindex");
  93  |   await expect(card("cr-01")).not.toHaveAttribute("role");
  94  |   // Collapsing documentation checks never unmounts the form or discards its draft.
  95  |   await input.fill("保留当前草稿");
  96  |   for (const summary of ["更多预览条件", "开发验证"]) {
  97  |     await page.getByText(summary, { exact: true }).click();
  98  |     await expect(input).toHaveValue("保留当前草稿");
  99  |     await page.getByText(summary, { exact: true }).click();
  100 |     await expect(input).toHaveValue("保留当前草稿");
  101 |   }
  102 |   const wide = card("wide-actions");
  103 |   for (const width of [300, 384]) {
  104 |     await wide.evaluate((el, value) => { el.style.width = `${value}px`; }, width);
  105 |     const descriptionBox = (await wide.locator('[data-slot="description"]').boundingBox())!;
  106 |     const actionBox = (await wide.locator('[data-slot="action"]').boundingBox())!;
  107 |     expect(actionBox.y).toBeGreaterThanOrEqual(descriptionBox.y + descriptionBox.height);
  108 |     expect(await wide.evaluate(el => el.scrollWidth <= el.clientWidth + 2)).toBe(true);
  109 |   }
  110 | });
  111 | 
  112 | test("Card inset presets keep effective gaps within insets without changing drafts or controls", async ({ page }, testInfo) => {
  113 |   await page.setViewportSize({ width: 1440, height: 1200 });
  114 |   await page.goto("/#card");
  115 |   const input = page.getByRole("textbox", { name: "提醒标题" });
  116 |   await input.fill("五档切换保留草稿");
  117 |   const measurements = [];
  118 |   for (const theme of ["浅色", "深色"]) {
  119 |     await choose(page, "主题", theme);
  120 |     for (const long of [false, true]) {
  121 |       await page.getByText("更多预览条件", { exact: true }).click();
  122 |       for (const label of ["长内容", "窄容器"]) {
  123 |         const checkbox = page.getByRole("checkbox", { name: label, exact: true });
  124 |         if (await checkbox.isChecked() !== long) { await checkbox.focus(); await page.keyboard.press("Space"); }
  125 |       }
  126 |       await page.getByText("更多预览条件", { exact: true }).click();
  127 |       if (long) {
  128 |         await page.getByRole("button", { name: "保存提醒", exact: true }).click();
  129 |         await page.getByRole("button", { name: "查看课程", exact: true }).click();
  130 |       }
  131 |       for (const inset of [12, 16, 20, 24, 32]) {
  132 |         await choose(page, "卡片内边距", `${inset}px`);
  133 |         const geometry = await page.locator(".card-gallery").evaluate(gallery => {
  134 |           const box = (el: Element) => el.getBoundingClientRect();
  135 |           return Array.from(gallery.querySelectorAll<HTMLElement>('[data-rain-id="ui-card"]')).map(root => {
  136 |             const header = root.querySelector('[data-slot="header"]')!, content = root.querySelector('[data-slot="content"]')!;
  137 |             const footer = root.querySelector('[data-slot="footer"]'), body = root.querySelector(".course-card-body") ?? root;
  138 |             const first = content.children[0], second = content.children[1];
  139 |             const save = root.querySelector('.rain-button[data-variant="primary"]');
  140 |             const feedback = root.querySelector(".course-card-feedback");
  141 |             const last = feedback ?? footer?.lastElementChild ?? content;
  142 |             return {
  143 |               id: root.dataset.example, width: box(root).width,
  144 |               insetLeft: Number.parseFloat(getComputedStyle(content).paddingLeft),
  145 |               insetRight: Number.parseFloat(getComputedStyle(content).paddingRight),
  146 |               insetTop: box(header).top - box(body).top - (body === root ? 1 : 0),
  147 |               insetBottom: box(body).bottom - box(last!).bottom - (body === root ? 1 : 0),
  148 |               headerContent: box(content).top - box(header).bottom,
  149 |               contentFooter: footer ? box(save ?? footer).top - box(content).bottom : null,
  150 |               footerFeedback: feedback && footer ? box(feedback).top - box(footer).bottom : null,
  151 |               fieldGap: root.dataset.example === "cr-04" ? box(second!).top - box(first!).bottom : null,
  152 |               fieldInnerGap: root.dataset.example === "cr-04" ? Number.parseFloat(getComputedStyle(first!).rowGap) : null,
  153 |               controlHeight: root.querySelector('[data-rain-id="ui-input"]')?.getBoundingClientRect().height,
  154 |               buttonHeight: save ? box(save).height : null,
  155 |               titleSize: getComputedStyle(header.querySelector('[data-slot="title"]')!).fontSize,
  156 |               overflow: root.scrollWidth > root.clientWidth + 1,
  157 |             };
  158 |           });
  159 |         });
  160 |         for (const card of geometry) {
  161 |           expect(card.insetLeft).toBe(inset); expect(card.insetRight).toBe(inset);
```