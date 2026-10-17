# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: date-time-optimization.spec.ts >> D10 D11 presets and custom duration change only the draft and never lock later edits
- Location: tests/e2e/date-time-optimization.spec.ts:139:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('dialog', { name: /^选择日期/ }).locator('[data-slot="summary"]')
Expected substring: "1小时30分钟"
Received string:    "2026-10-13 09:00 至 2026-10-13 10:30 · 时段长度 1 小时 30 分钟"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for getByRole('dialog', { name: /^选择日期/ }).locator('[data-slot="summary"]')
    14 × locator resolved to <div data-slot="summary" class="rain-date-picker__summary">2026-10-13 09:00 至 2026-10-13 10:30 · 时段长度 1 小时 3…</div>
       - unexpected value "2026-10-13 09:00 至 2026-10-13 10:30 · 时段长度 1 小时 30 分钟"

```

```yaml
- text: 2026-10-13 09:00 至 2026-10-13 10:30 · 时段长度 1 小时 30 分钟
```

# Test source

```ts
  44  |   writeFileSync(`${evidence}/console-${info.project.name}-${info.line}.json`, JSON.stringify(messages, null, 2));
  45  |   expect(messages, "uncaught browser errors").toEqual([]);
  46  | });
  47  | 
  48  | test("D18 D20 all three task samples save locally with complete dates and timezone", async ({ page }, info) => {
  49  |   await page.goto("/#date-picker");
  50  |   for (const [id, button, status, label, text] of [
  51  |     ["date-time-homework", "保存设置", "作业保存结果", "作业设置摘要", "截止 2026-10-13 23:59"],
  52  |     ["date-time-exam", "保存考试设置", "考试保存结果", "考试设置摘要", "答题时长 60 分钟"],
  53  |     ["date-time-cross-day", "保存时间段", "时间段保存结果", "时间段摘要", "2026-10-14 01:00"],
  54  |   ]) {
  55  |     const section = page.getByTestId(id!);
  56  |     await section.getByRole("button", { name: button!, exact: true }).click();
  57  |     await expect(section.getByRole("status", { name: status! })).toContainText(text!);
  58  |     await expect(section.getByLabel(label!, { exact: true })).toContainText("Asia/Shanghai · 北京时间");
  59  |     await screenshot(section, info, id!);
  60  |   }
  61  |   await hasNoDuplicateIds(page);
  62  | });
  63  | 
  64  | test("D01 D02 D03 strict typed dates and minute precision preserve the committed value", async ({ page }, info) => {
  65  |   test.skip(!basicProject(info), "Input semantics exercised in Chromium and WebKit.");
  66  |   await page.goto("/#date-picker"); const trigger = await open(page, "截止时间");
  67  |   const date = box(page, "日期");
  68  |   await date.fill("2026-02-30"); await date.press("Tab");
  69  |   await expect(confirm(page)).toBeDisabled(); await expect(date).toHaveValue("2026-02-30");
  70  |   await expect(hint(page)).toContainText("日期无效");
  71  |   await date.fill("2028-02-29"); await expect(panel(page).getByRole("combobox", { name: "选择月份" })).toHaveText(/2月/);
  72  |   await panel(page).getByRole("button", { name: "下个月", exact: true }).click();
  73  |   await box(page, "日期小时").fill("9"); await box(page, "日期分钟").fill("5"); await box(page, "日期分钟").press("Tab");
  74  |   await expect(panel(page).getByRole("combobox", { name: "选择月份" })).toHaveText(/3月/);
  75  |   await expect(summary(page)).toHaveText("2028-02-29 09:05");
  76  |   await box(page, "日期小时").fill("25"); await expect(confirm(page)).toBeDisabled();
  77  |   await box(page, "日期小时").fill("23"); await box(page, "日期分钟").fill(""); await expect(confirm(page)).toBeDisabled();
  78  |   await expect(date).toHaveValue("2028-02-29");
  79  |   await box(page, "日期分钟").fill("59"); await confirm(page).click();
  80  |   await expect(trigger).toHaveText("2028-02-29 23:59");
  81  |   await open(page, "开放时间"); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  82  |   await expect(confirm(page)).toBeDisabled(); await expect(hint(page)).not.toHaveAttribute("data-invalid", "true");
  83  |   await day(page, 2026, 10, 13).click(); await expect(confirm(page)).toBeDisabled();
  84  |   await expect(hint(page)).toHaveText("请选择结束日期");
  85  | });
  86  | 
  87  | test("D03 pasted HH:mm and IME composition never commit an unfinished value", async ({ page }, info) => {
  88  |   test.skip(info.project.name !== "desktop", "Clipboard permissions and simulated IME are Chromium browser checks.");
  89  |   await page.goto("/#date-picker"); await open(page, "截止时间");
  90  |   await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  91  |   await page.evaluate(() => navigator.clipboard.writeText("09:30"));
  92  |   const hour = box(page, "日期小时"); await hour.focus(); await hour.press("ControlOrMeta+V");
  93  |   await expect(hour).toHaveValue("09"); await expect(box(page, "日期分钟")).toHaveValue("30");
  94  |   await hour.dispatchEvent("compositionstart", { data: "9" });
  95  |   await expect(confirm(page)).toBeDisabled();
  96  |   await hour.press("Enter"); await expect(panel(page)).toBeVisible();
  97  |   await hour.dispatchEvent("compositionend", { data: "9" }); await expect(confirm(page)).toBeEnabled();
  98  |   await box(page, "日期").dispatchEvent("compositionstart", { data: "2026" });
  99  |   await expect(confirm(page)).toBeDisabled();
  100 |   await box(page, "日期").dispatchEvent("compositionend", { data: "2026" }); await expect(confirm(page)).toBeEnabled();
  101 | });
  102 | 
  103 | test("D04 D05 D06 D07 endpoint editing preserves identities and enforces a positive teaching window", async ({ page }, info) => {
  104 |   test.skip(!basicProject(info), "Endpoint semantics exercised in Chromium and WebKit.");
  105 |   await page.goto("/#date-picker"); const trigger = await open(page, "考试开放窗口");
  106 |   await box(page, "结束分钟").fill("30");
  107 |   await expect(box(page, "开始日期")).toHaveValue("2026-10-13"); await expect(box(page, "开始小时")).toHaveValue("09");
  108 |   await box(page, "结束小时").fill("10"); await expect(summary(page)).toContainText("1小时30分钟");
  109 |   await box(page, "结束小时").fill("09"); await box(page, "结束分钟").fill("00");
  110 |   await expect(confirm(page)).toBeDisabled(); await expect(hint(page)).toContainText("至少1分钟");
  111 |   await box(page, "结束小时").fill("10"); await box(page, "结束分钟").fill("30");
  112 |   await box(page, "开始小时").fill("11"); await expect(confirm(page)).toBeDisabled();
  113 |   await expect(box(page, "结束小时")).toHaveValue("10"); await expect(hint(page)).toContainText("不能早于");
  114 |   await box(page, "开始小时").fill("09"); await confirm(page).click();
  115 |   await expect(trigger).toHaveText("2026-10-13 09:00 至 2026-10-13 10:30");
  116 |   await expect(page.getByLabel("考试设置摘要", { exact: true })).toContainText("1 小时 30 分钟");
  117 |   // The generic date-only range still accepts a same-day value.
  118 |   const dateTrigger = await open(page, "日期区间");
  119 |   await day(page, 2026, 10, 20).click(); await day(page, 2026, 10, 20).click(); await confirm(page).click();
  120 |   await expect(dateTrigger).toHaveText("2026-10-20 至 2026-10-20");
  121 | });
  122 | 
  123 | test("D08 D09 month-end and year-end midnight repair is explicit and happens once", async ({ page }, info) => {
  124 |   test.skip(!basicProject(info), "Calendar boundaries exercised in Chromium and WebKit.");
  125 |   await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  126 |   await dateTime(page, "开始", "2026-10-31", "23", "00");
  127 |   await dateTime(page, "结束", "2026-10-31", "01", "00"); await expect(confirm(page)).toBeDisabled();
  128 |   await panel(page).getByRole("button", { name: "结束日期改为次日", exact: true }).click();
  129 |   await expect(box(page, "结束日期")).toHaveValue("2026-11-01");
  130 |   await expect(summary(page)).toContainText("次日 01:00 · 时段长度 2小时");
  131 |   await expect(panel(page).getByRole("button", { name: "结束日期改为次日", exact: true })).toHaveCount(0);
  132 |   await confirm(page).click(); await expect(trigger).toHaveText("2026-10-31 23:00 至 2026-11-01 01:00");
  133 |   await open(page, "活动时间段");
  134 |   await dateTime(page, "开始", "2026-12-31", "23", "00"); await dateTime(page, "结束", "2027-01-01", "01", "00");
  135 |   await expect(summary(page)).toContainText("2小时"); await confirm(page).click();
  136 |   await expect(trigger).toHaveText("2026-12-31 23:00 至 2027-01-01 01:00");
  137 | });
  138 | 
  139 | test("D10 D11 presets and custom duration change only the draft and never lock later edits", async ({ page }, info) => {
  140 |   test.skip(!basicProject(info), "Duration behavior exercised in Chromium and WebKit.");
  141 |   await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  142 |   await panel(page).getByRole("button", { name: "同日 90 分钟", exact: true }).click();
  143 |   await expect(trigger).toHaveText("2026-10-13 23:00 至 2026-10-14 01:00");
> 144 |   await expect(summary(page)).toContainText("1小时30分钟");
      |                               ^ Error: expect(locator).toContainText(expected) failed
  145 |   await box(page, "自定义时长（分钟）").fill("45"); await panel(page).getByRole("button", { name: "应用时长", exact: true }).click();
  146 |   await expect(box(page, "结束小时")).toHaveValue("09"); await expect(box(page, "结束分钟")).toHaveValue("45");
  147 |   await box(page, "开始分钟").fill("15"); await expect(box(page, "结束分钟")).toHaveValue("45");
  148 |   await expect(summary(page)).toContainText("30分钟");
  149 |   await box(page, "自定义时长（分钟）").fill("0"); await expect(panel(page).getByRole("button", { name: "应用时长", exact: true })).toBeDisabled();
  150 |   await confirm(page).click(); await expect(trigger).toHaveText("2026-10-13 09:15 至 2026-10-13 09:45");
  151 | });
  152 | 
  153 | test("D12 cancel Escape outside and clear do not leak drafts; reopen resets selection intent", async ({ page }, info) => {
  154 |   test.skip(!basicProject(info), "Dismissal behavior exercised in Chromium and WebKit.");
  155 |   await page.goto("/#date-picker"); const trigger = await open(page, "截止时间");
  156 |   await box(page, "日期").fill("2026-12-25"); await panel(page).getByRole("button", { name: "取消", exact: true }).click();
  157 |   await expect(trigger).toHaveText("2026-10-20 18:00"); await expect(trigger).toBeFocused();
  158 |   await open(page, "截止时间"); await box(page, "日期小时").fill("12"); await page.keyboard.press("Escape");
  159 |   await expect(trigger).toHaveText("2026-10-20 18:00");
  160 |   await open(page, "截止时间"); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  161 |   await panel(page).getByRole("button", { name: "取消", exact: true }).click(); await expect(trigger).toHaveText("2026-10-20 18:00");
  162 |   await open(page, "截止时间"); await box(page, "日期").fill("2026-11-10");
  163 |   await page.getByRole("button", { name: "深色", exact: true }).click(); await expect(panel(page)).toHaveCount(0);
  164 |   await expect(trigger).toHaveText("2026-10-20 18:00");
  165 |   const rangeTrigger = await open(page, "活动时间段");
  166 |   await box(page, "结束日期").focus(); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  167 |   await day(page, 2026, 10, 20).click(); await expect(confirm(page)).toBeDisabled();
  168 |   await day(page, 2026, 10, 21).click(); await confirm(page).click();
  169 |   await expect(rangeTrigger).toHaveText("2026-10-20 23:00 至 2026-10-21 01:00");
  170 | });
  171 | 
  172 | test("D13 nested month and time menus own Escape and Enter never saves the host form", async ({ page }, info) => {
  173 |   test.skip(!basicProject(info), "Keyboard layering exercised in Chromium and WebKit.");
  174 |   await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  175 |   const month = panel(page).getByRole("combobox", { name: "选择月份", exact: true });
  176 |   await month.click(); await expect(page.getByRole("listbox")).toBeVisible(); await page.keyboard.press("Escape");
  177 |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(panel(page)).toBeVisible(); await expect(month).toBeFocused();
  178 |   const suggestions = panel(page).getByRole("combobox", { name: "日期常用时间", exact: true });
  179 |   await suggestions.click(); await expect(page.getByRole("listbox")).toBeVisible(); await page.keyboard.press("Escape");
  180 |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(suggestions).toBeFocused();
  181 |   await box(page, "日期小时").fill("9"); await box(page, "日期小时").press("Enter");
  182 |   await expect(panel(page)).toBeVisible(); await expect(page.getByRole("status", { name: "作业保存结果" })).not.toContainText("设置已保存");
  183 |   await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  184 |   for (const [opener, title, field] of [["对话框设置日期", "作业日期设置", "对话框截止日期"], ["侧栏设置时间", "作业时间设置", "侧栏截止时间"]]) {
  185 |     await page.getByRole("button", { name: opener!, exact: true }).click();
  186 |     const outer = page.getByRole("dialog", { name: title!, exact: true });
  187 |     await outer.getByRole("button", { name: field!, exact: true }).click(); await expect(panel(page)).toBeVisible();
  188 |     await page.keyboard.press("Escape"); await expect(panel(page)).toHaveCount(0); await expect(outer).toBeVisible();
  189 |     await page.keyboard.press("Escape"); await expect(outer).toHaveCount(0);
  190 |   }
  191 | });
  192 | 
  193 | test("D15 D18 current time refresh rejects expired drafts and host save preserves data", async ({ page }, info) => {
  194 |   test.skip(!basicProject(info), "Clock and host validation exercised in Chromium and WebKit.");
  195 |   await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  196 |   await dateTime(page, "日期", "2026-10-12", "10", "01"); await expect(confirm(page)).toBeEnabled();
  197 |   await page.clock.setFixedTime(new Date("2026-10-12T10:01:30+08:00"));
  198 |   // The host subscribes to foreground focus; dispatch that lifecycle notification without reloading the draft.
  199 |   await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  200 |   await expect(confirm(page)).toBeDisabled(); await expect(box(page, "日期分钟")).toHaveValue("01");
  201 |   await box(page, "日期分钟").fill("02"); await confirm(page).click();
  202 |   await expect(trigger).toHaveText("2026-10-12 10:02");
  203 |   await page.clock.setFixedTime(new Date("2026-10-12T10:02:00+08:00"));
  204 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  205 |   await expect(page.getByText("截止时间必须晚于当前时间，请重新选择。", { exact: true })).toBeVisible();
  206 |   await expect(trigger).toHaveText("2026-10-12 10:02");
  207 |   await open(page, "作业截止时间"); await panel(page).getByRole("button", { name: "明天 23:59", exact: true }).click(); await confirm(page).click();
  208 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  209 |   await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("设置已保存");
  210 |   await page.getByRole("radio", { name: "定时开放", exact: true }).check();
  211 |   await page.clock.setFixedTime(new Date("2026-10-13T10:00:00+08:00"));
  212 |   await page.getByRole("radio", { name: "立即开放", exact: true }).check();
  213 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  214 |   await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("立即开放");
  215 |   await page.getByRole("radio", { name: "定时开放", exact: true }).check();
  216 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  217 |   await expect(page.getByText("开放时间已经过去，请重新选择。", { exact: true })).toBeVisible();
  218 | });
  219 | 
  220 | test("D18 exam entry boundaries clamp late entry and keep duration independent", async ({ page }, info) => {
  221 |   test.skip(!basicProject(info), "Admission behavior exercised in Chromium and WebKit.");
  222 |   await page.goto("/#date-picker");
  223 |   for (const [preset, result] of [["开放前 1 分钟", "尚未开放"], ["开放时刻", "可答题 1 小时"], ["关闭前 30 分钟", "可答题 30 分钟"], ["关闭时刻", "考试已关闭"]]) {
  224 |     await open(page, "模拟入场时间"); await panel(page).getByRole("button", { name: preset!, exact: true }).click(); await confirm(page).click();
  225 |     await expect(page.getByLabel("模拟入场结果", { exact: true })).toContainText(result!);
  226 |   }
  227 |   const duration = page.getByRole("spinbutton", { name: "答题时长", exact: true }); await duration.fill("180"); await duration.press("Tab");
  228 |   await expect(page.getByText("答题时长超过开放窗口；按本演示策略，所有人最晚在关闭时间结束，原时长设置保留。", { exact: true })).toBeVisible();
  229 |   await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  230 |   await expect(page.getByRole("status", { name: "考试保存结果" })).toContainText("答题时长 180 分钟");
  231 |   await duration.fill("-"); await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  232 |   await expect(page.getByText("请输入正整数答题时长。", { exact: true })).toBeVisible();
  233 | });
  234 | 
  235 | test("D16 responsive panels preserve draft, contain overflow and retain touch hit areas", async ({ page }, info) => {
  236 |   await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  237 |   await expect(panel(page).getByRole("grid")).toHaveCount(basicProject(info) ? 2 : 1);
  238 |   await box(page, "结束分钟").fill("15");
  239 |   const coarse = info.project.name.startsWith("touch");
  240 |   if (coarse) {
  241 |     await expect(panel(page)).toHaveClass(/rain-date-picker__sheet/);
  242 |     const targets = await panel(page).locator('.rain-calendar__day-button, .rain-date-picker__actions > button, .rain-calendar__nav > button').evaluateAll(nodes => nodes.map(node => ({ tag: node.getAttribute("aria-label") || node.textContent, width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
  243 |     expect(targets.every(target => target.width >= 44 && target.height >= 44), JSON.stringify(targets)).toBe(true);
  244 |   }
```