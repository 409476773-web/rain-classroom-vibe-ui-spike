# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: table.spec.ts >> cards share fields and menus while only checkboxes select records
- Location: tests/e2e/table.spec.ts:304:1

# Error details

```
Error: expect(locator).toBeDisabled() failed

Locator:  getByRole('button', { name: '按资料名称排序', exact: true })
Expected: disabled
Received: enabled
Timeout:  5000ms

Call log:
  - Expect "toBeDisabled" with timeout 5000ms
  - waiting for getByRole('button', { name: '按资料名称排序', exact: true })
    13 × locator resolved to <button tabindex="0" type="button" data-slot="root" id="base-ui-_r_g_" data-size="compact" data-tone="default" data-variant="text" aria-haspopup="menu" data-focus="control" data-state="default" aria-label="按资料名称排序" aria-expanded="false" data-density="compact" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-action-ghos…>…</button>
       - unexpected value "enabled"

```

```yaml
- button "按资料名称排序": 资料名称 · 升序
```

# Test source

```ts
  252 |   writeFileSync(resolve(directory, "measurements.json"), JSON.stringify(measurements, null, 2));
  253 | });
  254 | 
  255 | test("the independent prototype consumes the same public components and recipe", async ({ page }) => {
  256 |   await page.goto(`${process.env.RAIN_TABLE_PROTOTYPE_URL ?? "http://127.0.0.1:5199"}/#materials`);
  257 |   await expect(page.locator('[data-rain-id="prototype-materials-consumer"]')).toBeVisible();
  258 |   await expect(page.getByRole("table")).toBeVisible();
  259 |   await setCheckbox(page, "选择 设计方法导论", true);
  260 |   await expect(page.getByText("已选 1 份资料", { exact: true })).toBeVisible();
  261 |   await page.getByRole("button", { name: "切换深色", exact: true }).click();
  262 |   await expect(page.locator('[data-rain-id="prototype-materials-consumer"]')).toHaveAttribute("data-rain-theme", "dark");
  263 | });
  264 | 
  265 | test("the confirmed pager owns capacity, jump and filtered totals in both table views", async ({ page }) => {
  266 |   const nav = page.getByRole("navigation", { name: "分页", exact: true });
  267 |   await expect(nav).toHaveAttribute("data-rain-id", "ui-pagination");
  268 |   await expect(nav.locator('[data-slot="total"]')).toHaveText("共 13 条");
  269 |   await expect(page.getByRole("combobox", { name: "每页数量" })).toHaveCount(0);
  270 |   await setCheckbox(page, "选择 设计方法导论", true);
  271 |   await nav.getByRole("button", { name: "第 3 页", exact: true }).click();
  272 |   await nav.getByRole("button", { name: "分页设置", exact: true }).click();
  273 |   await page.getByRole("button", { name: "每页 10 条", exact: true }).click();
  274 |   await expect(nav.locator('[aria-current="page"]')).toHaveText("2");
  275 |   await expect(page.locator('tbody tr').first()).toContainText("课堂活动设计");
  276 |   await expect(page.getByText("已选 1 份资料", { exact: true })).toBeVisible();
  277 |   await nav.getByRole("button", { name: "分页设置", exact: true }).click();
  278 |   await page.getByRole("textbox", { name: "跳转到页码", exact: true }).fill("1");
  279 |   await page.getByRole("textbox", { name: "跳转到页码", exact: true }).press("Enter");
  280 |   await expect(page.getByRole("checkbox", { name: "选择 设计方法导论", exact: true })).toBeChecked();
  281 |   await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  282 |   await expect(nav.getByRole("button", { name: "分页设置", exact: true })).toContainText("10");
  283 |   await page.setViewportSize({ width: 320, height: 844 });
  284 |   await nav.getByRole("button", { name: "分页设置", exact: true }).click();
  285 |   const settings = page.locator('[data-slot="settings"]');
  286 |   const bounds = await settings.boundingBox();
  287 |   expect(bounds!.x).toBeGreaterThanOrEqual(0);
  288 |   expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
  289 |   await page.getByRole("button", { name: "每页 5 条", exact: true }).click();
  290 |   await page.getByRole("button", { name: "表格视图", exact: true }).click();
  291 |   await page.getByRole("button", { name: "刷新资料", exact: true }).click();
  292 |   await expect(nav).toHaveAttribute("aria-busy", "true");
  293 |   await expect(nav.getByRole("button", { name: "下一页", exact: true })).toBeDisabled();
  294 |   await nav.getByRole("button", { name: "下一页", exact: true }).dispatchEvent("click");
  295 |   await expect(nav.locator('[aria-current="page"]')).toContainText("1");
  296 |   await expect(nav).not.toHaveAttribute("aria-busy", "true");
  297 |   await page.getByRole("textbox", { name: "查找资料", exact: true }).fill("不存在的资料");
  298 |   await page.getByRole("button", { name: "搜索", exact: true }).click();
  299 |   await expect(nav.locator('[data-slot="total"]')).toHaveText("共 0 条");
  300 |   await expect(nav.getByRole("button", { name: "上一页", exact: true })).toBeDisabled();
  301 |   await expect(nav.getByRole("button", { name: "下一页", exact: true })).toBeDisabled();
  302 | });
  303 | 
  304 | test("cards share fields and menus while only checkboxes select records", async ({ page }) => {
  305 |   const more = page.getByRole("button", { name: "更多操作 设计方法导论", exact: true });
  306 |   await expect(more).toHaveAttribute("data-tone", "brand");
  307 |   await more.click();
  308 |   await expect(page.getByRole("menu")).toHaveCSS("width", "140px");
  309 |   await page.keyboard.press("Escape");
  310 |   const tableTags = await page.locator('tbody tr').first().locator('[data-rain-id="ui-tag"]').evaluateAll(tags => tags.map(tag => [tag.textContent, tag.getAttribute("data-color"), tag.getAttribute("data-appearance")]));
  311 |   await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  312 |   const card = page.getByRole("article", { name: "设计方法导论", exact: true });
  313 |   expect(await card.locator('[data-rain-id="ui-tag"]').evaluateAll(tags => tags.map(tag => [tag.textContent, tag.getAttribute("data-color"), tag.getAttribute("data-appearance")]))).toEqual(tableTags);
  314 |   await card.click({ position: { x: 3, y: 3 } });
  315 |   await card.getByRole("heading").click();
  316 |   await card.getByText("阅读材料", { exact: true }).click();
  317 |   await expect(card.getByRole("checkbox")).not.toBeChecked();
  318 |   await expect(more).toHaveAttribute("data-rain-id", "ui-icon-button");
  319 |   await expect(more.locator('[data-icon="icon/more-horizontal"]')).toBeVisible();
  320 |   await more.focus(); await page.keyboard.press("Enter");
  321 |   await expect(page.getByRole("menuitem", { name: "查看资料", exact: true })).toBeVisible();
  322 |   await expect(page.getByRole("menu")).toHaveCSS("width", "140px");
  323 |   await page.keyboard.press("Escape");
  324 |   await expect(more).toBeFocused();
  325 |   await more.click(); await page.getByRole("menuitem", { name: "查看资料", exact: true }).click();
  326 |   await expect(page.getByRole("status")).toContainText("正在查看《设计方法导论》");
  327 |   await expect(card.getByRole("checkbox")).not.toBeChecked();
  328 |   await page.getByRole("button", { name: "更多操作 课堂观察记录", exact: true }).click();
  329 |   await expect(page.getByRole("menuitem", { name: /记录稍后处理/ })).toHaveAttribute("aria-disabled", "true");
  330 |   await page.keyboard.press("Escape");
  331 |   await expect(page.getByRole("checkbox", { name: "选择 课堂观察记录", exact: true })).toBeDisabled();
  332 |   await card.getByRole("checkbox").focus(); await page.keyboard.press("Space");
  333 |   await expect(card).toHaveAttribute("data-selected", "true");
  334 |   await expect(page.getByRole("checkbox", { name: "选择当前页可操作资料", exact: true })).toHaveAttribute("aria-checked", "mixed");
  335 |   await setCheckbox(page, "选择当前页可操作资料", true);
  336 |   await expect(page.getByText("已选 4 份资料", { exact: true })).toBeVisible();
  337 |   await page.getByRole("button", { name: "下一页", exact: true }).click();
  338 |   await setCheckbox(page, "选择当前页可操作资料", true);
  339 |   await expect(page.getByText("已选 9 份资料", { exact: true })).toBeVisible();
  340 |   await page.getByRole("button", { name: "上一页", exact: true }).click();
  341 |   await setCheckbox(page, "选择当前页可操作资料", false);
  342 |   await expect(page.getByText("已选 5 份资料", { exact: true })).toBeVisible();
  343 |   await page.getByRole("button", { name: "按资料名称排序", exact: true }).click();
  344 |   await page.getByRole("menuitemradio", { name: "资料名称 · 升序", exact: true }).click();
  345 |   const ids = await page.locator('[aria-label="课程资料卡片"] [data-record-id]').evaluateAll(cards => cards.map(card => card.getAttribute("data-record-id")));
  346 |   await page.getByRole("button", { name: "表格视图", exact: true }).click();
  347 |   await expect(page.locator('th[aria-sort="ascending"]')).toHaveCount(1);
  348 |   expect(await page.locator('tbody tr').evaluateAll(rows => rows.map(row => row.getAttribute("data-record-id")))).toEqual(ids);
  349 |   await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  350 |   await expect(page.getByRole("button", { name: "按资料名称排序", exact: true })).toContainText("升序");
  351 |   await page.getByRole("button", { name: "刷新资料", exact: true }).click();
> 352 |   await expect(page.getByRole("button", { name: "按资料名称排序", exact: true })).toBeDisabled();
      |                                                                            ^ Error: expect(locator).toBeDisabled() failed
  353 |   await expect(page.getByRole("checkbox", { name: "选择当前页可操作资料", exact: true })).toBeDisabled();
  354 |   await expect(page.getByRole("status")).toContainText("资料已刷新");
  355 |   await expect(page.getByText("已选 5 份资料", { exact: true })).toBeVisible();
  356 | });
  357 | 
  358 | test("card hierarchy, selected feedback and fixed actions fit themes, densities and long titles", async ({ page }, info) => {
  359 |   const directory = resolve(process.env.RAIN_TABLE_EVIDENCE_DIR ?? "/tmp/rain-table-card-parity", info.project.name);
  360 |   mkdirSync(directory, { recursive: true });
  361 |   const measurements = [];
  362 |   await page.setViewportSize({ width: 1440, height: 1000 });
  363 |   await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  364 |   await setCheckbox(page, "选择 设计方法导论", true);
  365 |   for (const dark of [false, true]) for (const compact of [false, true]) {
  366 |     await setCheckbox(page, "深色主题", dark);
  367 |     await setCheckbox(page, "紧凑密度", compact);
  368 |     const card = page.getByRole("article", { name: "设计方法导论", exact: true });
  369 |     const other = page.getByRole("article", { name: "教学案例研读", exact: true });
  370 |     const result = await card.evaluate(card => {
  371 |       const title = card.querySelector('h3')!, time = card.querySelector('time')!, checkbox = card.querySelector('[data-rain-id="ui-checkbox"]')!, more = card.querySelector('button')!;
  372 |       const box = (el: Element) => { const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height, right: b.right, bottom: b.bottom }; };
  373 |       const text = (el: Element) => { const s = getComputedStyle(el); return { color: s.color, size: s.fontSize, weight: s.fontWeight }; };
  374 |       return { bounds: box(card), title: box(title), checkbox: box(checkbox), more: box(more), time: box(time), titleText: text(title), timeText: text(time), background: getComputedStyle(card).backgroundColor };
  375 |     });
  376 |     expect(result.checkbox.y).toBe(result.title.y);
  377 |     expect(result.more.y).toBe(result.title.y);
  378 |     expect(result.checkbox.right).toBeLessThan(result.title.x);
  379 |     expect(result.title.right).toBeLessThan(result.more.x);
  380 |     expect(result.time.x).toBe(result.title.x);
  381 |     expect(result.time.y).toBeGreaterThan(result.title.bottom);
  382 |     expect(result.titleText).toMatchObject({ size: "16px", weight: "600" });
  383 |     expect(result.timeText).toEqual({ size: "13px", weight: "400", color: dark ? "rgb(148, 156, 184)" : "rgb(86, 104, 143)" });
  384 |     expect(result.background).not.toBe(await other.evaluate(el => getComputedStyle(el).backgroundColor));
  385 |     const contentFlow = await page.locator('[aria-label="课程资料卡片"] [data-record-id]').evaluateAll(cards => cards.map(card => {
  386 |       const title = card.querySelector('h3')!.getBoundingClientRect(), tag = card.querySelector('[data-rain-id="ui-tag"]')!.getBoundingClientRect();
  387 |       const time = card.querySelector('time')!.getBoundingClientRect(), permission = card.querySelector('p[id$="-locked"]')?.getBoundingClientRect();
  388 |       return { id: card.getAttribute("data-record-id"), top: card.getBoundingClientRect().top, height: card.getBoundingClientRect().height,
  389 |         titleToTags: tag.top - title.bottom, tagsToTime: time.top - tag.bottom, permissionAfterTime: permission ? permission.top - time.bottom : null };
  390 |     }));
  391 |     for (const item of contentFlow) {
  392 |       expect(item.titleToTags).toBe(12);
  393 |       expect(item.tagsToTime).toBe(8);
  394 |       if (item.permissionAfterTime !== null) expect(item.permissionAfterTime).toBe(8);
  395 |     }
  396 |     expect(contentFlow[0]!.top).toBe(contentFlow[1]!.top);
  397 |     expect(contentFlow[0]!.height).toBe(contentFlow[1]!.height);
  398 |     measurements.push({ dark, compact, ...result, contentFlow });
  399 |     await page.locator('.data-table-recipe').screenshot({ path: resolve(directory, `cards-${dark ? "dark" : "light"}-${compact ? "compact" : "default"}.png`), animations: "disabled" });
  400 |   }
  401 |   await page.getByRole("navigation", { name: "分页", exact: true }).getByRole("button", { name: "第 3 页", exact: true }).click();
  402 |   for (const width of [390, 320]) {
  403 |     await page.setViewportSize({ width, height: 844 });
  404 |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  405 |     for (const card of await page.locator('[aria-label="课程资料卡片"] [data-record-id]').all()) {
  406 |       const bounds = await card.boundingBox();
  407 |       const title = await card.getByRole("heading").boundingBox(), more = await card.getByRole("button").boundingBox();
  408 |       expect(bounds!.x).toBeGreaterThanOrEqual(16);
  409 |       expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width - 16);
  410 |       expect(title!.x + title!.width).toBeLessThan(more!.x);
  411 |       expect(title!.y).toBe(more!.y);
  412 |       const tag = await card.locator('[data-rain-id="ui-tag"]').first().boundingBox();
  413 |       expect(tag!.y - title!.y - title!.height).toBe(12);
  414 |       expect(await card.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  415 |     }
  416 |     await page.locator('.data-table-recipe').screenshot({ path: resolve(directory, `cards-narrow-${width}.png`), animations: "disabled" });
  417 |   }
  418 |   await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  419 |   const checkbox = page.locator('[aria-label="课程资料卡片"]').getByRole("checkbox").first();
  420 |   await checkbox.focus();
  421 |   await page.keyboard.press(info.project.name === "webkit" ? "Alt+Tab" : "Tab");
  422 |   await expect(page.locator('[aria-label="课程资料卡片"]').getByRole("button").first()).toBeFocused();
  423 |   await page.keyboard.press(info.project.name === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab");
  424 |   await expect(checkbox).toBeFocused();
  425 |   await page.keyboard.press("Space");
  426 |   await expect(checkbox).toBeChecked();
  427 |   expect(await checkbox.evaluate(el => el.matches(":focus-visible"))).toBe(true);
  428 |   writeFileSync(resolve(directory, "card-measurements.json"), JSON.stringify(measurements, null, 2));
  429 | });
  430 | 
  431 | 
  432 | test("material menus fit content in both themes and narrow cards", async ({ page }, info) => {
  433 |   const directory = resolve(process.env.RAIN_TABLE_EVIDENCE_DIR ?? "/tmp/rain-menu-width", info.project.name);
  434 |   mkdirSync(directory, { recursive: true });
  435 |   await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  436 |   for (const dark of [false, true]) for (const width of [1440, 320]) {
  437 |     await setCheckbox(page, "深色主题", dark);
  438 |     await page.setViewportSize({ width, height: 1000 });
  439 |     for (const title of ["设计方法导论", "课堂观察记录"]) {
  440 |       await page.getByRole("button", { name: `更多操作 ${title}`, exact: true }).click();
  441 |       const menu = page.getByRole("menu");
  442 |       await expect(menu).toBeVisible();
  443 |       if (title === "设计方法导论") await expect(menu).toHaveCSS("width", "140px");
  444 |       const box = (await menu.boundingBox())!;
  445 |       expect(box.width).toBeGreaterThanOrEqual(140);
  446 |       expect(box.width).toBeLessThanOrEqual(320);
  447 |       expect(box.x).toBeGreaterThanOrEqual(8);
  448 |       expect(box.x + box.width).toBeLessThanOrEqual(width - 8);
  449 |       expect(await menu.evaluate(node => node.scrollWidth - node.clientWidth)).toBeLessThanOrEqual(1);
  450 |       if (title === "课堂观察记录") await expect(menu.getByText("只读资料不可修改", { exact: true })).toBeVisible();
  451 |       await page.screenshot({ path: resolve(directory, `menu-${dark ? "dark" : "light"}-${width}-${title}.png`) });
  452 |       await page.keyboard.press("Escape");
```