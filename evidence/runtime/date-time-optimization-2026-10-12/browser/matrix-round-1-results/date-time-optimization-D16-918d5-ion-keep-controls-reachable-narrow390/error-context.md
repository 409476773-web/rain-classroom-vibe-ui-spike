# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: date-time-optimization.spec.ts >> D16 D17 dark compact forced colors zoom and reduced motion keep controls reachable
- Location: tests/e2e/date-time-optimization.spec.ts:278:1

# Error details

```
Error: expect(locator).toBeInViewport() failed

Locator:  getByRole('dialog', { name: /^选择日期/ }).getByRole('button', { name: '确定', exact: true })
Expected: in viewport
Received: viewport ratio 0
Timeout:  5000ms

Call log:
  - Expect "toBeInViewport" with timeout 5000ms
  - waiting for getByRole('dialog', { name: /^选择日期/ }).getByRole('button', { name: '确定', exact: true })
    14 × locator resolved to <button type="button" data-slot="root" data-size="small" data-tone="default" data-focus="control" data-state="default" data-density="compact" data-variant="primary" data-rain-id="ui-button" class="rain-button box-border relative inline-flex flex-none items-center justify-center py-rain-0 overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-button font-rain-button no-underline transition-rain-button duration-rain-button ease-rain-butto…>…</button>
       - unexpected value "viewport ratio 0"

```

```yaml
- button "确定"
```

# Test source

```ts
  192 |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(suggestions).toBeFocused();
  193 |   await box(page, "日期小时").fill("9"); await box(page, "日期小时").press("Enter");
  194 |   await expect(panel(page)).toBeVisible(); await expect(page.getByRole("status", { name: "作业保存结果" })).not.toContainText("设置已保存");
  195 |   await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  196 |   for (const [opener, title, field] of [["对话框设置日期", "作业日期设置", "对话框截止日期"], ["侧栏设置时间", "作业时间设置", "侧栏截止时间"]]) {
  197 |     await page.getByRole("button", { name: opener!, exact: true }).click();
  198 |     const outer = page.getByRole("dialog", { name: title!, exact: true });
  199 |     await outer.getByRole("button", { name: field!, exact: true }).click(); await expect(panel(page)).toBeVisible();
  200 |     await page.keyboard.press("Escape"); await expect(panel(page)).toHaveCount(0); await expect(outer).toBeVisible();
  201 |     await page.keyboard.press("Escape"); await expect(outer).toHaveCount(0);
  202 |   }
  203 | });
  204 | 
  205 | test("D15 D18 current time refresh rejects expired drafts and host save preserves data", async ({ page }, info) => {
  206 |   test.skip(!basicProject(info), "Clock and host validation exercised in Chromium and WebKit.");
  207 |   await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  208 |   await dateTime(page, "日期", "2026-10-12", "10", "01"); await expect(confirm(page)).toBeEnabled();
  209 |   await page.clock.setFixedTime(new Date("2026-10-12T10:01:30+08:00"));
  210 |   // The host subscribes to foreground focus; dispatch that lifecycle notification without reloading the draft.
  211 |   await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  212 |   await expect(confirm(page)).toBeDisabled(); await expect(box(page, "日期分钟")).toHaveValue("01");
  213 |   await box(page, "日期分钟").fill("02"); await confirm(page).click();
  214 |   await expect(trigger).toHaveText("2026-10-12 10:02");
  215 |   await page.clock.setFixedTime(new Date("2026-10-12T10:02:00+08:00"));
  216 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  217 |   await expect(page.getByText("截止时间必须晚于当前时间，请重新选择。", { exact: true })).toBeVisible();
  218 |   await expect(trigger).toHaveText("2026-10-12 10:02");
  219 |   await open(page, "作业截止时间"); await panel(page).getByRole("button", { name: "明天 23:59", exact: true }).click(); await confirm(page).click();
  220 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  221 |   await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("设置已保存");
  222 |   await page.getByText("定时开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "定时开放", exact: true })).toBeChecked();
  223 |   await page.clock.setFixedTime(new Date("2026-10-13T10:00:00+08:00"));
  224 |   await page.getByText("立即开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "立即开放", exact: true })).toBeChecked();
  225 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  226 |   await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("立即开放");
  227 |   await page.getByText("定时开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "定时开放", exact: true })).toBeChecked();
  228 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  229 |   await expect(page.getByText("开放时间已经过去，请重新选择。", { exact: true })).toBeVisible();
  230 | });
  231 | 
  232 | test("D18 exam entry boundaries clamp late entry and keep duration independent", async ({ page }, info) => {
  233 |   test.skip(!basicProject(info), "Admission behavior exercised in Chromium and WebKit.");
  234 |   await page.goto("/#date-picker");
  235 |   for (const [preset, result] of [["开放前 1 分钟", "尚未开放"], ["开放时刻", "可答题 1 小时"], ["关闭前 30 分钟", "可答题 30 分钟"], ["关闭时刻", "考试已关闭"]]) {
  236 |     await open(page, "模拟入场时间"); await panel(page).getByRole("button", { name: preset!, exact: true }).click(); await confirm(page).click();
  237 |     await expect(page.getByLabel("模拟入场结果", { exact: true })).toContainText(result!);
  238 |   }
  239 |   const duration = page.getByRole("spinbutton", { name: "答题时长", exact: true }); await duration.fill("180"); await duration.press("Tab");
  240 |   await expect(page.getByText("答题时长超过开放窗口；按本演示策略，所有人最晚在关闭时间结束，原时长设置保留。", { exact: true })).toBeVisible();
  241 |   await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  242 |   await expect(page.getByRole("status", { name: "考试保存结果" })).toContainText("答题时长 180 分钟");
  243 |   await duration.fill("-"); await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  244 |   await expect(page.getByText("请输入正整数答题时长。", { exact: true })).toBeVisible();
  245 | });
  246 | 
  247 | test("D16 responsive panels preserve draft, contain overflow and retain touch hit areas", async ({ page }, info) => {
  248 |   await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  249 |   await expect(panel(page).getByRole("grid")).toHaveCount(basicProject(info) ? 2 : 1);
  250 |   await box(page, "结束分钟").fill("15");
  251 |   const coarse = info.project.name.startsWith("touch");
  252 |   if (coarse) {
  253 |     await expect(panel(page)).toHaveClass(/rain-date-picker__sheet/);
  254 |     const targets = await panel(page).locator('.rain-calendar__day-button, .rain-date-picker__actions > button, .rain-calendar__nav > button').evaluateAll(nodes => nodes.map(node => ({ tag: node.getAttribute("aria-label") || node.textContent, width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
  255 |     writeFileSync(`${evidence}/touch-targets-${info.project.name}.json`, JSON.stringify(targets, null, 2));
  256 |     expect(targets.every(target => target.width >= 44 && target.height >= 44), JSON.stringify(targets)).toBe(true);
  257 |   }
  258 |   await hasNoDuplicateIds(page);
  259 |   const bounds = await panel(page).boundingBox(); const viewport = page.viewportSize()!;
  260 |   expect(bounds!.x).toBeGreaterThanOrEqual(-1); expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width + 1);
  261 |   expect(bounds!.y).toBeGreaterThanOrEqual(-1); expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height + 1);
  262 |   const content = panel(page).locator(coarse ? ".rain-sheet-body" : ".rain-date-picker__body");
  263 |   const actions = panel(page).locator('[data-slot="actions"]');
  264 |   await expect.poll(async () => {
  265 |     const body = await content.boundingBox(), footer = await actions.boundingBox();
  266 |     return body!.y + body!.height - footer!.y;
  267 |   }, { message: "the scrollable body must finish before the action footer" }).toBeLessThanOrEqual(1);
  268 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  269 |   await screenshot(panel(page), info, "datetime-panel");
  270 |   if (coarse) {
  271 |     await page.setViewportSize({ width: viewport.width, height: 480 });
  272 |     await box(page, "结束分钟").scrollIntoViewIfNeeded(); await expect(box(page, "结束分钟")).toHaveValue("15");
  273 |     await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  274 |   }
  275 |   await confirm(page).click(); await expect(trigger).toHaveText("2026-10-13 23:00 至 2026-10-14 01:15");
  276 | });
  277 | 
  278 | test("D16 D17 dark compact forced colors zoom and reduced motion keep controls reachable", async ({ page }, info) => {
  279 |   test.skip(!["desktop", "narrow390", "touch600"].includes(info.project.name), "Visual stress cases use representative fine and coarse pointers.");
  280 |   await page.goto("/#date-picker");
  281 |   await page.getByRole("button", { name: "深色", exact: true }).click(); await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  282 |   await open(page, "活动时间段"); await screenshot(panel(page), info, "datetime-dark-compact");
  283 |   await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  284 |   await expect(panel(page)).toHaveCSS("transition-duration", "0s");
  285 |   await box(page, "开始日期").focus(); await expect(box(page, "开始日期")).toBeFocused();
  286 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  287 |   await screenshot(panel(page), info, "datetime-forced-colors");
  288 |   await page.keyboard.press("Escape");
  289 |   // CSS zoom exercises layout at 200%; OS/browser zoom and physical keyboards remain human checks.
  290 |   await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  291 |   await open(page, "活动时间段"); await box(page, "结束分钟").fill("30");
> 292 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
      |                                                                             ^ Error: expect(locator).toBeInViewport() failed
  293 |   await screenshot(panel(page), info, "datetime-200-percent");
  294 |   await confirm(page).click();
  295 | });
  296 | 
  297 | test("D17 rapid month changes leave one live month and respect reduced motion", async ({ page }, info) => {
  298 |   test.skip(!basicProject(info), "Calendar motion exercised in Chromium and WebKit.");
  299 |   await page.goto("/#date-picker"); await open(page, "截止日期");
  300 |   const calendar = panel(page).locator('[data-rain-id="ui-calendar"]');
  301 |   const duration = await calendar.evaluate(node => getComputedStyle(node).getPropertyValue("--rdp-animation_duration").trim());
  302 |   expect(parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1000)).toBe(220);
  303 |   const next = calendar.getByRole("button", { name: "下个月", exact: true });
  304 |   await next.click({ delay: 0 }); await next.click({ delay: 0 }); await next.click({ delay: 0 });
  305 |   await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText(/1月/);
  306 |   await expect(calendar.locator('[data-animated-month][aria-hidden="true"]')).toHaveCount(0);
  307 |   await expect(calendar.getByRole("grid")).toHaveCount(1);
  308 |   await page.emulateMedia({ reducedMotion: "reduce" }); await next.click();
  309 |   await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText(/2月/);
  310 |   await expect(calendar.locator("[data-animated-month]")).toHaveCount(0);
  311 |   await expect(calendar.locator(".rain-calendar__day-button").first()).toHaveCSS("transition-duration", "0s");
  312 | });
  313 | 
  314 | test("D20 UTC labels reflect the actual host timezone", async ({ browser }, info) => {
  315 |   test.skip(info.project.name !== "desktop", "Timezone behavior is browser-locale independent and exercised once in UTC.");
  316 |   const context = await browser.newContext({ timezoneId: "UTC", locale: "zh-CN", viewport: { width: 1440, height: 1000 } });
  317 |   const page = await context.newPage(); await page.clock.setFixedTime(fixedNow); await page.goto("http://127.0.0.1:5395/#date-picker");
  318 |   for (const label of ["作业设置摘要", "考试设置摘要", "时间段摘要"]) {
  319 |     await expect(page.getByLabel(label, { exact: true })).toContainText("本机时间（UTC）");
  320 |     await expect(page.getByLabel(label, { exact: true })).not.toContainText("北京时间");
  321 |   }
  322 |   await page.getByTestId("date-time-exam").screenshot({ path: `${evidence}/timezone-utc.png` }); await context.close();
  323 | });
  324 | 
```