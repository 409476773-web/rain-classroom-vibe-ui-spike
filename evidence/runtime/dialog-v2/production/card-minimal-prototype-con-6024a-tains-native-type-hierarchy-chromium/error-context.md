# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: card.spec.ts >> minimal prototype consumes Card without Playground CSS and retains native type hierarchy
- Location: tests/e2e/card.spec.ts:349:1

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
    14 × locator resolved to <article data-slot="root" aria-label="课程公告" data-size="default" data-example="cr-01" data-variant="panel" data-rain-id="ui-card" class="rain-card flex min-w-0 flex-col gap-(--rain-card-section-gap) py-(--rain-card-spacing) overflow-visible rounded-rain-8 border-solid border-rain-line-1 border-rain-category-border-neutral-3 bg-rain-category-background-neutral-1 text-rain-category-text-neutral-2">…</article>
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
  260 |   await expect(page.getByRole("button", { name: "更多操作", exact: true })).toBeFocused();
  261 |   await page.keyboard.press("Enter");
  262 |   await page.getByRole("menuitem", { name: "复制提醒", exact: true }).click();
  263 |   await expect(page.locator('[data-example="cr-04"]').getByRole("status")).toContainText("未写入剪贴板");
  264 |   await page.getByText("更多预览条件", { exact: true }).click();
  265 |   await page.getByRole("checkbox", { name: "长内容" }).focus(); await page.keyboard.press("Space");
  266 |   await page.getByRole("checkbox", { name: "窄容器" }).focus(); await page.keyboard.press("Space");
  267 |   const reminder = page.locator('[data-example="cr-04"]');
  268 |   for (const width of [300, 360, 361, 384]) {
  269 |     await reminder.evaluate((el, value) => { el.style.width = `${value}px`; }, width);
  270 |     for (const titleText of ["学习提醒", "第三单元学习提醒与后续课堂安排、材料准备和学习任务说明", "UninterruptedEnglishTitle".repeat(5)]) {
  271 |       await reminder.locator('[data-slot="title"]').evaluate((el, text) => { el.textContent = text; }, titleText);
  272 |       const title = (await reminder.locator('[data-slot="title"]').boundingBox())!;
  273 |       const action = (await reminder.getByRole("button", { name: "更多操作" }).boundingBox())!;
  274 |       expect(action.x).toBeGreaterThanOrEqual(title.x + title.width);
  275 |       expect(Math.abs(action.y - title.y)).toBeLessThan(2);
  276 |       expect(await reminder.evaluate(el => el.scrollWidth <= el.clientWidth + 2)).toBe(true);
  277 |     }
  278 |   }
  279 |   await reminder.evaluate(el => el.style.removeProperty("width"));
  280 |   expect((await body.boundingBox())!.y).toBeGreaterThan((await media.boundingBox())!.y + (await media.boundingBox())!.height - 1);
  281 |   const metricCard = page.locator('[data-example="cr-03"]');
  282 |   await metricCard.locator('[data-slot="value"]').evaluate(el => { el.textContent = "12345678901234567890"; });
  283 |   expect(await metricCard.evaluate(el => el.scrollWidth <= el.clientWidth + 2)).toBe(true);
  284 |   await expect(metricCard.locator('[data-slot="value"]')).toHaveCSS("font-size", "22px");
  285 |   await course.locator('[data-slot="title"]').evaluate(el => { el.textContent += "AnUninterruptedEnglishCourseTitle".repeat(5); });
  286 |   for (const element of await page.locator(".card-gallery .rain-card").all()) {
  287 |     expect(await element.evaluate(el => el.scrollWidth <= el.clientWidth + 2)).toBe(true);
  288 |   }
  289 | });
  290 | 
  291 | test("Card themes and preference emulation retain visible content", async ({ page }, testInfo) => {
  292 |   await page.setViewportSize({ width: 1440, height: 1200 });
  293 |   await page.goto("/#card");
  294 |   async function checkFooterReference(theme: string) {
  295 |     const reminder = page.locator('[data-example="cr-04"]');
  296 |     const footer = reminder.locator('[data-slot="footer"]');
  297 |     await expect(footer).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  298 |     await expect(footer).toHaveCSS("border-top-width", "0px");
  299 |     const height = (await reminder.boundingBox())!.height;
  300 |     await reminder.screenshot({ path: testInfo.outputPath(`${theme}-reminder-default.png`) });
  301 |     await page.getByText("更多预览条件", { exact: true }).click();
  302 |     const reference = page.getByRole("checkbox", { name: "浅底操作区（样式参考）" });
  303 |     await expect(reference).not.toBeChecked();
  304 |     await page.getByRole("textbox", { name: "提醒标题" }).fill("保留样式切换草稿");
  305 |     await reference.focus(); await page.keyboard.press("Space");
  306 |     await expect(footer).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  307 |     await expect(footer).not.toHaveCSS("background-color", await reminder.evaluate(el => getComputedStyle(el).backgroundColor));
  308 |     expect((await reminder.boundingBox())!.height).toBe(height);
  309 |     await reminder.screenshot({ path: testInfo.outputPath(`${theme}-reminder-reference.png`) });
  310 |     await reference.focus(); await page.keyboard.press("Space");
  311 |     await expect(footer).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  312 |     await expect(page.getByRole("textbox", { name: "提醒标题" })).toHaveValue("保留样式切换草稿");
  313 |     await page.getByText("更多预览条件", { exact: true }).click();
  314 |   }
  315 |   await checkFooterReference("light");
  316 |   const target = page.locator('[data-example="cr-01"]');
  317 |   const light = await target.evaluate(el => getComputedStyle(el).backgroundColor);
  318 |   await page.screenshot({ path: testInfo.outputPath("card-light.png"), fullPage: true });
  319 |   await recordCardAppearance(page, testInfo, "light");
  320 |   await choose(page, "主题", "深色");
  321 |   await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("color", await page.locator(".card-review").evaluate(el => getComputedStyle(el).color));
  322 |   expect(await target.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(light);
  323 |   await page.screenshot({ path: testInfo.outputPath("card-dark.png"), fullPage: true });
  324 |   await recordCardAppearance(page, testInfo, "dark");
  325 |   await checkFooterReference("dark");
  326 |   await page.getByText("开发验证", { exact: true }).click();
  327 |   await expect(page.locator('[data-example="theme-island"]')).toHaveCSS("background-color", light);
  328 |   await page.screenshot({ path: testInfo.outputPath("card-developer-dark.png"), fullPage: true });
  329 |   await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  330 |   await expect(page.getByRole("textbox", { name: "提醒标题" })).toBeVisible();
  331 |   await page.getByRole("button", { name: "保存提醒", exact: true }).focus();
  332 |   await page.keyboard.press("Enter");
  333 |   await expect(page.locator('[data-example="cr-04"]').getByRole("status")).toContainText("已保存");
  334 |   await page.setViewportSize({ width: 360, height: 900 });
  335 |   await page.getByText("更多预览条件", { exact: true }).click();
  336 |   await page.getByRole("checkbox", { name: "长内容" }).focus(); await page.keyboard.press("Space");
  337 |   expect(await page.locator("body").evaluate(el => el.scrollWidth <= innerWidth)).toBe(true);
  338 |   await page.screenshot({ path: testInfo.outputPath("card-narrow-forced-colors.png"), fullPage: true });
  339 | });
  340 | 
  341 | test("Card content layout utilities override the old visual declaration", async ({ page }) => {
  342 |   await page.goto("/#components");
  343 |   const content = page.locator('[data-rain-id="ui-card"] [data-slot="content"]').first();
  344 |   await content.evaluate(element => element.classList.add("px-rain-0"));
  345 |   await expect(content).toHaveCSS("padding-left", "0px");
  346 |   await expect(content).toHaveCSS("padding-right", "0px");
  347 | });
  348 | 
  349 | test("minimal prototype consumes Card without Playground CSS and retains native type hierarchy", async ({ page }, testInfo) => {
  350 |   const errors: string[] = [];
  351 |   page.on("pageerror", error => errors.push(error.message));
  352 |   await page.setViewportSize({ width: 1440, height: 1200 });
  353 |   await page.goto(process.env.RAIN_CARD_PROTOTYPE_URL ?? "http://127.0.0.1:4174");
  354 |   await expect(page.getByRole("heading", { name: "课程空间", level: 1 })).toBeVisible();
  355 |   await expect(page.getByRole("heading", { name: "课程公告", level: 2 })).toHaveCSS("font-size", "16px");
  356 |   const description = page.locator('[data-example="cr-01"] [data-slot="description"]');
  357 |   await expect(description).toHaveCSS("font-size", "13px");
  358 |   await expect(description).toHaveCSS("line-height", "22px");
  359 |   await expect(page.locator('[data-example="cr-02"] [data-slot="description"]')).toHaveCSS("font-size", "14px");
> 360 |   await expect(page.locator('[data-example="cr-01"]')).toHaveCSS("padding-top", "20px");
      |                                                        ^ Error: expect(locator).toHaveCSS(expected) failed
  361 |   await expect(page.locator('[data-example="cr-04"] [data-slot="footer"]')).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  362 |   const requests = await page.evaluate(() => performance.getEntriesByType("resource").map(entry => entry.name));
  363 |   expect(requests.some(url => /playground|card-page/.test(url))).toBe(false);
  364 |   await page.getByRole("button", { name: "更多操作", exact: true }).click();
  365 |   await page.getByRole("menuitem", { name: "稍后处理", exact: true }).click();
  366 |   await expect(page.locator('[data-example="cr-04"]').getByRole("status")).toContainText("稍后处理");
  367 |   await page.getByRole("button", { name: "切换深色" }).click();
  368 |   await expect(description).toHaveCSS("font-size", "13px");
  369 |   await page.screenshot({ path: testInfo.outputPath("prototype-dark.png"), fullPage: true });
  370 |   await page.setViewportSize({ width: 360, height: 900 });
  371 |   expect(await page.locator("body").evaluate(el => el.scrollWidth <= innerWidth)).toBe(true);
  372 |   await page.getByRole("textbox", { name: "提醒标题" }).fill("原型独立消费");
  373 |   await page.getByRole("button", { name: "保存提醒", exact: true }).click();
  374 |   await expect(page.locator('[data-example="cr-04"]').getByRole("status")).toContainText("原型独立消费");
  375 |   expect(errors).toEqual([]);
  376 | });
  377 | 
```