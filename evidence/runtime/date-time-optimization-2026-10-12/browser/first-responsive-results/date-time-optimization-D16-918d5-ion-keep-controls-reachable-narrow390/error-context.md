# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: date-time-optimization.spec.ts >> D16 D17 dark compact forced colors zoom and reduced motion keep controls reachable
- Location: tests/e2e/date-time-optimization.spec.ts:259:1

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
  173 | test("D13 nested month and time menus own Escape and Enter never saves the host form", async ({ page }, info) => {
  174 |   test.skip(!basicProject(info), "Keyboard layering exercised in Chromium and WebKit.");
  175 |   await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  176 |   const month = panel(page).getByRole("combobox", { name: "选择月份", exact: true });
  177 |   await month.click(); await expect(page.getByRole("listbox")).toBeVisible(); await page.keyboard.press("Escape");
  178 |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(panel(page)).toBeVisible(); await expect(month).toBeFocused();
  179 |   const suggestions = panel(page).getByRole("combobox", { name: "日期常用时间", exact: true });
  180 |   await suggestions.click(); await expect(page.getByRole("listbox")).toBeVisible(); await page.keyboard.press("Escape");
  181 |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(suggestions).toBeFocused();
  182 |   await box(page, "日期小时").fill("9"); await box(page, "日期小时").press("Enter");
  183 |   await expect(panel(page)).toBeVisible(); await expect(page.getByRole("status", { name: "作业保存结果" })).not.toContainText("设置已保存");
  184 |   await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  185 |   for (const [opener, title, field] of [["对话框设置日期", "作业日期设置", "对话框截止日期"], ["侧栏设置时间", "作业时间设置", "侧栏截止时间"]]) {
  186 |     await page.getByRole("button", { name: opener!, exact: true }).click();
  187 |     const outer = page.getByRole("dialog", { name: title!, exact: true });
  188 |     await outer.getByRole("button", { name: field!, exact: true }).click(); await expect(panel(page)).toBeVisible();
  189 |     await page.keyboard.press("Escape"); await expect(panel(page)).toHaveCount(0); await expect(outer).toBeVisible();
  190 |     await page.keyboard.press("Escape"); await expect(outer).toHaveCount(0);
  191 |   }
  192 | });
  193 | 
  194 | test("D15 D18 current time refresh rejects expired drafts and host save preserves data", async ({ page }, info) => {
  195 |   test.skip(!basicProject(info), "Clock and host validation exercised in Chromium and WebKit.");
  196 |   await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  197 |   await dateTime(page, "日期", "2026-10-12", "10", "01"); await expect(confirm(page)).toBeEnabled();
  198 |   await page.clock.setFixedTime(new Date("2026-10-12T10:01:30+08:00"));
  199 |   // The host subscribes to foreground focus; dispatch that lifecycle notification without reloading the draft.
  200 |   await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  201 |   await expect(confirm(page)).toBeDisabled(); await expect(box(page, "日期分钟")).toHaveValue("01");
  202 |   await box(page, "日期分钟").fill("02"); await confirm(page).click();
  203 |   await expect(trigger).toHaveText("2026-10-12 10:02");
  204 |   await page.clock.setFixedTime(new Date("2026-10-12T10:02:00+08:00"));
  205 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  206 |   await expect(page.getByText("截止时间必须晚于当前时间，请重新选择。", { exact: true })).toBeVisible();
  207 |   await expect(trigger).toHaveText("2026-10-12 10:02");
  208 |   await open(page, "作业截止时间"); await panel(page).getByRole("button", { name: "明天 23:59", exact: true }).click(); await confirm(page).click();
  209 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  210 |   await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("设置已保存");
  211 |   await page.getByText("定时开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "定时开放", exact: true })).toBeChecked();
  212 |   await page.clock.setFixedTime(new Date("2026-10-13T10:00:00+08:00"));
  213 |   await page.getByText("立即开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "立即开放", exact: true })).toBeChecked();
  214 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  215 |   await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("立即开放");
  216 |   await page.getByText("定时开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "定时开放", exact: true })).toBeChecked();
  217 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  218 |   await expect(page.getByText("开放时间已经过去，请重新选择。", { exact: true })).toBeVisible();
  219 | });
  220 | 
  221 | test("D18 exam entry boundaries clamp late entry and keep duration independent", async ({ page }, info) => {
  222 |   test.skip(!basicProject(info), "Admission behavior exercised in Chromium and WebKit.");
  223 |   await page.goto("/#date-picker");
  224 |   for (const [preset, result] of [["开放前 1 分钟", "尚未开放"], ["开放时刻", "可答题 1 小时"], ["关闭前 30 分钟", "可答题 30 分钟"], ["关闭时刻", "考试已关闭"]]) {
  225 |     await open(page, "模拟入场时间"); await panel(page).getByRole("button", { name: preset!, exact: true }).click(); await confirm(page).click();
  226 |     await expect(page.getByLabel("模拟入场结果", { exact: true })).toContainText(result!);
  227 |   }
  228 |   const duration = page.getByRole("spinbutton", { name: "答题时长", exact: true }); await duration.fill("180"); await duration.press("Tab");
  229 |   await expect(page.getByText("答题时长超过开放窗口；按本演示策略，所有人最晚在关闭时间结束，原时长设置保留。", { exact: true })).toBeVisible();
  230 |   await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  231 |   await expect(page.getByRole("status", { name: "考试保存结果" })).toContainText("答题时长 180 分钟");
  232 |   await duration.fill("-"); await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  233 |   await expect(page.getByText("请输入正整数答题时长。", { exact: true })).toBeVisible();
  234 | });
  235 | 
  236 | test("D16 responsive panels preserve draft, contain overflow and retain touch hit areas", async ({ page }, info) => {
  237 |   await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  238 |   await expect(panel(page).getByRole("grid")).toHaveCount(basicProject(info) ? 2 : 1);
  239 |   await box(page, "结束分钟").fill("15");
  240 |   const coarse = info.project.name.startsWith("touch");
  241 |   if (coarse) {
  242 |     await expect(panel(page)).toHaveClass(/rain-date-picker__sheet/);
  243 |     const targets = await panel(page).locator('.rain-calendar__day-button, .rain-date-picker__actions > button, .rain-calendar__nav > button').evaluateAll(nodes => nodes.map(node => ({ tag: node.getAttribute("aria-label") || node.textContent, width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
  244 |     expect(targets.every(target => target.width >= 44 && target.height >= 44), JSON.stringify(targets)).toBe(true);
  245 |   }
  246 |   await hasNoDuplicateIds(page);
  247 |   const bounds = await panel(page).boundingBox(); const viewport = page.viewportSize()!;
  248 |   expect(bounds!.x).toBeGreaterThanOrEqual(-1); expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width + 1);
  249 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  250 |   await screenshot(panel(page), info, "datetime-panel");
  251 |   if (coarse) {
  252 |     await page.setViewportSize({ width: viewport.width, height: 480 });
  253 |     await box(page, "结束分钟").scrollIntoViewIfNeeded(); await expect(box(page, "结束分钟")).toHaveValue("15");
  254 |     await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  255 |   }
  256 |   await confirm(page).click(); await expect(trigger).toHaveText("2026-10-13 23:00 至 2026-10-14 01:15");
  257 | });
  258 | 
  259 | test("D16 D17 dark compact forced colors zoom and reduced motion keep controls reachable", async ({ page }, info) => {
  260 |   test.skip(!["desktop", "narrow390", "touch600"].includes(info.project.name), "Visual stress cases use representative fine and coarse pointers.");
  261 |   await page.goto("/#date-picker");
  262 |   await page.getByRole("button", { name: "深色", exact: true }).click(); await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  263 |   await open(page, "活动时间段"); await screenshot(panel(page), info, "datetime-dark-compact");
  264 |   await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  265 |   await expect(panel(page)).toHaveCSS("transition-duration", "0s");
  266 |   await box(page, "开始日期").focus(); await expect(box(page, "开始日期")).toBeFocused();
  267 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  268 |   await screenshot(panel(page), info, "datetime-forced-colors");
  269 |   await page.keyboard.press("Escape");
  270 |   // CSS zoom exercises layout at 200%; OS/browser zoom and physical keyboards remain human checks.
  271 |   await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  272 |   await open(page, "活动时间段"); await box(page, "结束分钟").fill("30");
> 273 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
      |                                                                             ^ Error: expect(locator).toBeInViewport() failed
  274 |   await screenshot(panel(page), info, "datetime-200-percent");
  275 |   await confirm(page).click();
  276 | });
  277 | 
  278 | test("D17 rapid month changes leave one live month and respect reduced motion", async ({ page }, info) => {
  279 |   test.skip(!basicProject(info), "Calendar motion exercised in Chromium and WebKit.");
  280 |   await page.goto("/#date-picker"); await open(page, "截止日期");
  281 |   const calendar = panel(page).locator('[data-rain-id="ui-calendar"]');
  282 |   const duration = await calendar.evaluate(node => getComputedStyle(node).getPropertyValue("--rdp-animation_duration").trim());
  283 |   expect(parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1000)).toBe(220);
  284 |   const next = calendar.getByRole("button", { name: "下个月", exact: true });
  285 |   await next.click({ delay: 0 }); await next.click({ delay: 0 }); await next.click({ delay: 0 });
  286 |   await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText(/1月/);
  287 |   await expect(calendar.locator('[data-animated-month][aria-hidden="true"]')).toHaveCount(0);
  288 |   await expect(calendar.getByRole("grid")).toHaveCount(1);
  289 |   await page.emulateMedia({ reducedMotion: "reduce" }); await next.click();
  290 |   await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText(/2月/);
  291 |   await expect(calendar.locator("[data-animated-month]")).toHaveCount(0);
  292 |   await expect(calendar.locator(".rain-calendar__day-button").first()).toHaveCSS("transition-duration", "0s");
  293 | });
  294 | 
  295 | test("D20 UTC labels reflect the actual host timezone", async ({ browser }, info) => {
  296 |   test.skip(info.project.name !== "desktop", "Timezone behavior is browser-locale independent and exercised once in UTC.");
  297 |   const context = await browser.newContext({ timezoneId: "UTC", locale: "zh-CN", viewport: { width: 1440, height: 1000 } });
  298 |   const page = await context.newPage(); await page.clock.setFixedTime(fixedNow); await page.goto("http://127.0.0.1:5395/#date-picker");
  299 |   for (const label of ["作业设置摘要", "考试设置摘要", "时间段摘要"]) {
  300 |     await expect(page.getByLabel(label, { exact: true })).toContainText("本机时间（UTC）");
  301 |     await expect(page.getByLabel(label, { exact: true })).not.toContainText("北京时间");
  302 |   }
  303 |   await page.getByTestId("date-time-exam").screenshot({ path: `${evidence}/timezone-utc.png` }); await context.close();
  304 | });
  305 | 
```