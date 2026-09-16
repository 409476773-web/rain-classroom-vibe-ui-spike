# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layouts.spec.ts >> RN-06 independent consumer: prototype uses the package alongside unchanged Card and Dialog
- Location: tests/e2e/layouts.spec.ts:243:1

# Error details

```
Error: expect(locator).toHaveCSS(expected) failed

Locator:  getByRole('dialog', { name: '编辑课程资料', exact: true })
Expected: "480px"
Received: "516px"
Timeout:  5000ms

Call log:
  - Expect "toHaveCSS" with timeout 5000ms
  - waiting for getByRole('dialog', { name: '编辑课程资料', exact: true })
    14 × locator resolved to <div id="_r_c_" data-open="" role="dialog" tabindex="-1" data-inset="40" data-width="516" aria-busy="false" data-slot="content" data-density="default" data-rain-theme="light" data-rain-id="ui-dialog" data-base-ui-focusable="" aria-labelledby="base-ui-_r_15_" aria-describedby="base-ui-_r_16_" data-local-recipe="course-edit-dialog" class="rain-dialog box-border flex flex-col min-w-rain-0 rounded-rain-10 border-solid border-rain-line-1 shadow-rain-dialog font-rain-ui text-rain-size-14 leading-rain-24 …>…</div>
       - unexpected value "516px"

```

```yaml
- dialog "编辑课程资料":
  - heading "编辑课程资料" [level=2]
  - paragraph: 调整课程名称与教学方式，保存后更新课程信息。
  - button "关闭编辑"
  - text: 课程名称
  - textbox "课程名称": 设计方法与实践
  - button "清除课程名称"
  - text: 教学方式
  - combobox "教学方式": 研讨课
  - text: 已选：研讨课 根据本学期的主要教学方式选择。
  - region "调整说明"
  - status
  - button "取消"
  - button "保存更改"
```

# Test source

```ts
  149 |   await expect(page.getByRole("alert")).toContainText("边缘留白 ≥ 分区间距 ≥ 信息间距");
  150 |   expect((await panelGeometry(page)).item).toBe(8);
  151 |   await chooseSpacing(page, "信息间距", 8); await page.getByRole("button", { name: "应用面板间距" }).click();
  152 |   await expect(page.getByRole("alert")).toHaveCount(0);
  153 |   await expect(page.getByRole("status").filter({ hasText: "已应用到下方" })).toBeVisible();
  154 | });
  155 | 
  156 | test("outer cards: apply all three spacings independently from panels without losing drafts", async ({ page }, info) => {
  157 |   await page.setViewportSize({ width: 1280, height: 900 }); await page.goto("/#layouts");
  158 |   const course = page.getByRole("textbox", { name: "课程名称", exact: true }), title = page.getByRole("textbox", { name: "资料标题", exact: true });
  159 |   const originalCourse = await course.elementHandle(), originalTitle = await title.elementHandle();
  160 |   await course.fill("外层卡片调整保留课程草稿"); await title.fill("外层卡片调整保留资料草稿");
  161 |   await page.getByText("调整外层卡片间距", { exact: true }).click();
  162 |   const form = page.getByRole("form", { name: "外层卡片间距", exact: true });
  163 |   async function setCard(inset: number, section: number, item: number) {
  164 |     for (const [name, value] of [["边缘留白", inset], ["分区间距", section], ["信息间距", item]] as const) {
  165 |       await form.getByRole("combobox", { name, exact: true }).click();
  166 |       await page.getByRole("option", { name: `${value}px`, exact: true }).click();
  167 |     }
  168 |     await form.getByRole("button", { name: "应用卡片间距" }).click();
  169 |   }
  170 |   const cards = page.locator('[data-example="layout-settings"], [data-example="layout-materials"]');
  171 |   const results = [];
  172 |   for (const [inset, section, item] of [[32, 24, 16], [16, 16, 16], [0, 0, 0], [40, 40, 40]] as const) {
  173 |     await setCard(inset, section, item); await expect(form.getByRole("alert")).toHaveCount(0);
  174 |     const geometry = await cards.evaluateAll(nodes => nodes.map(el => {
  175 |       const header = el.querySelector(':scope > [data-slot="header"]')!, content = el.querySelector(':scope > [data-slot="content"]')!;
  176 |       const edge = el.getBoundingClientRect(), h = header.getBoundingClientRect(), c = content.getBoundingClientRect(), border = parseFloat(getComputedStyle(el).borderWidth);
  177 |       const groups = content.querySelector('[data-example="settings-sections"], [data-example="material-sections"]')!;
  178 |       const info = groups.querySelector('[data-example="settings-grid"], [data-example="query-inline"]')!;
  179 |       return { top: h.top - edge.top - border, bottom: edge.bottom - c.bottom - border,
  180 |         headerLeft: header.firstElementChild!.getBoundingClientRect().left - edge.left - border,
  181 |         contentLeft: groups.getBoundingClientRect().left - edge.left - border,
  182 |         contentRight: edge.right - groups.getBoundingClientRect().right - border,
  183 |         headerSection: c.top - h.bottom, bodySection: groups.children[1]!.getBoundingClientRect().top - groups.children[0]!.getBoundingClientRect().bottom,
  184 |         item: getComputedStyle(info).gap };
  185 |     }));
  186 |     expect(geometry).toEqual([0, 1].map(() => ({ top: inset, bottom: inset, headerLeft: inset, contentLeft: inset, contentRight: inset, headerSection: section, bodySection: section, item: `${item}px` })));
  187 |     const smallGaps = await cards.evaluateAll(nodes => nodes.flatMap(el => [
  188 |       parseFloat(getComputedStyle(el.querySelector(':scope > [data-slot="header"]')!).rowGap),
  189 |       parseFloat(getComputedStyle(el.querySelector('.layout-example-actions')!).gap),
  190 |     ]));
  191 |     for (const gap of smallGaps) expect(gap).toBeLessThanOrEqual(item);
  192 |     expect((await panelGeometry(page)).inset).toBe(16);
  193 |     expect((await panelGeometry(page)).item).toBe(8);
  194 |     expect(await course.evaluate((el, old) => el === old, originalCourse)).toBe(true);
  195 |     expect(await title.evaluate((el, old) => el === old, originalTitle)).toBe(true);
  196 |     await expect(course).toHaveValue("外层卡片调整保留课程草稿"); await expect(title).toHaveValue("外层卡片调整保留资料草稿");
  197 |     results.push({ chosen: { inset, section, item }, geometry });
  198 |   }
  199 |   await setCard(8, 16, 8); await expect(form.getByRole("alert")).toBeVisible();
  200 |   await expect(cards.first()).toHaveCSS("padding-top", "40px");
  201 |   await setCard(16, 8, 12); await expect(form.getByRole("alert")).toBeVisible();
  202 |   await expect(cards.first()).toHaveCSS("gap", "40px");
  203 |   await setCard(40, 40, 40); await expect(form.getByRole("alert")).toHaveCount(0);
  204 |   await page.getByText("调整外层卡片间距", { exact: true }).click();
  205 |   await page.getByText("调整资料面板间距", { exact: true }).click();
  206 |   await chooseSpacing(page, "边缘留白", 24); await page.getByRole("button", { name: "应用面板间距" }).click();
  207 |   await expect(cards.first()).toHaveCSS("padding-top", "40px"); expect((await panelGeometry(page)).inset).toBe(24);
  208 |   await page.setViewportSize({ width: 320, height: 800 }); await check(page, "深色主题"); await check(page, "紧凑控件");
  209 |   await expect(split(page)).toHaveAttribute("data-stacked", "true");
  210 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  211 |   const buttonsFit = await cards.evaluateAll(nodes => nodes.every(el => {
  212 |     const content = el.querySelector(':scope > [data-slot="content"]')!, bounds = content.getBoundingClientRect(), css = getComputedStyle(content);
  213 |     return [...el.querySelectorAll('.layout-example-actions button')].every(button => {
  214 |       const r = button.getBoundingClientRect();
  215 |       return r.left >= bounds.left + parseFloat(css.paddingLeft) && r.right <= bounds.right - parseFloat(css.paddingRight);
  216 |     });
  217 |   }));
  218 |   expect(buttonsFit).toBe(true);
  219 |   await page.screenshot({ path: info.outputPath("outer-40-panel-24-narrow.png"), fullPage: true });
  220 |   writeFileSync(info.outputPath("outer-card-spacing.json"), JSON.stringify(results, null, 2));
  221 | });
  222 | 
  223 | test("RN-06 narrow viewport: grouped actions, long validation, theme changes and forced colors remain usable", async ({ page }, info) => {
  224 |   await page.setViewportSize({ width: 320, height: 800 }); await page.goto("/#layouts");
  225 |   await expect(split(page)).toHaveAttribute("data-stacked", "true");
  226 |   const name = page.getByRole("textbox", { name: "课程名称", exact: true });
  227 |   await name.fill(""); await page.getByRole("button", { name: "保存设置", exact: true }).click();
  228 |   await expect(name).toBeFocused(); await expect(name).toHaveAttribute("aria-invalid", "true");
  229 |   await expect(name).toHaveAccessibleDescription("请输入课程名称。较长的课程名称也可以完整填写，内容会保留在当前页面。");
  230 |   for (const actions of [page.locator('[data-example="query-actions"]'), page.locator('[data-example="layout-settings"] .layout-example-actions')]) {
  231 |     const positions = await actions.getByRole("button").evaluateAll(nodes => nodes.map(el => { const r = el.getBoundingClientRect(); return { top: r.top, left: r.left, right: r.right }; }));
  232 |     expect(positions[0]!.top).toBe(positions[1]!.top); expect(positions[1]!.right).toBeLessThanOrEqual(304);
  233 |   }
  234 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  235 |   await page.screenshot({ path: info.outputPath("viewport-320-error.png"), fullPage: true });
  236 |   await check(page, "深色主题"); await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  237 |   await main(page).focus();
  238 |   await page.keyboard.press("Tab");
  239 |   expect(await page.evaluate(() => document.activeElement !== document.body)).toBe(true);
  240 |   await page.screenshot({ path: info.outputPath("viewport-320-forced-colors.png"), fullPage: true });
  241 | });
  242 | 
  243 | test("RN-06 independent consumer: prototype uses the package alongside unchanged Card and Dialog", async ({ page }) => {
  244 |   await page.goto(process.env.RAIN_LAYOUTS_PROTOTYPE_URL ?? "http://127.0.0.1:4174");
  245 |   await expect(page.locator('[data-example="settings-grid"]')).toHaveCSS("gap", "12px");
  246 |   await expect(page.locator('[data-example="cr-01"]')).toHaveCSS("padding-top", "20px");
  247 |   await expect(page.locator('[data-rain-id="layout-split"]')).toBeVisible();
  248 |   await page.getByRole("button", { name: "编辑课程资料", exact: true }).click();
> 249 |   await expect(page.getByRole("dialog", { name: "编辑课程资料", exact: true })).toHaveCSS("width", "480px");
      |                                                                           ^ Error: expect(locator).toHaveCSS(expected) failed
  250 | });
  251 | 
```