import { expect, test, type Locator, type Page, type TestInfo } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const evidenceRoot = fileURLToPath(new URL("../../evidence/runtime/date-picker-ux-refinement-2026-10-12/browser/", import.meta.url));
const evidence = process.env.RAIN_DATE_TIME_CSS_ZOOM_STRESS === "1" ? `${evidenceRoot}/css-zoom-stress` : evidenceRoot;
mkdirSync(evidence, { recursive: true });
const fixedNow = new Date("2026-10-12T10:00:30+08:00");
const consoleErrors = new Map<string, string[]>();
const panel = (page: Page) => page.getByRole("dialog", { name: /^选择日期/ });
const confirm = (page: Page) => panel(page).getByRole("button", { name: "确定", exact: true });
const box = (page: Page, label: string) => panel(page).getByRole("textbox", { name: label, exact: true });
const summary = (page: Page) => panel(page).locator('[data-slot="summary"]');
const hint = (page: Page) => panel(page).getByRole("status", { name: "日期选择提示" });
const step = (page: Page) => panel(page).getByRole("status", { name: "日期选择步骤" });
const editDate = (page: Page, endpoint: "开始" | "结束") => panel(page).getByRole("button", { name: `在日历中修改${endpoint}日期`, exact: true });
const basicProject = (info: TestInfo) => ["desktop", "webkit"].includes(info.project.name);
const day = (page: Page, year: number, month: number, date: number) => panel(page).getByRole("button", { name: new RegExp(`^${year}年${month}月${date}日`) }).first();
async function open(page: Page, label: string) {
  await expect(panel(page)).toHaveCount(0);
  const trigger = page.getByRole("button", { name: label, exact: true });
  await trigger.click(); await expect(panel(page)).toBeVisible(); return trigger;
}
async function dateTime(page: Page, endpoint: "开始" | "结束" | "日期", date: string, hour: string, minute: string) {
  await box(page, endpoint === "日期" ? "日期" : `${endpoint}日期`).fill(date);
  await box(page, `${endpoint}时间`).fill(`${hour}:${minute}`);
  await box(page, `${endpoint}时间`).press("Tab");
}
async function screenshot(locator: Locator, info: TestInfo, name: string) {
  await locator.screenshot({ path: `${evidence}/${name}-${info.project.name}.png` });
}
async function hasNoDuplicateIds(page: Page) {
  expect(await page.evaluate(() => {
    const ids = [...document.querySelectorAll("[id]")].map(node => node.id);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  })).toEqual([]);
}
async function assertPanelGeometry(page: Page) {
  const popup = panel(page);
  await expect.poll(async () => {
    const bounds = await popup.boundingBox(), viewport = page.viewportSize()!;
    return Math.max(-bounds!.x, -bounds!.y, bounds!.x + bounds!.width - viewport.width, bounds!.y + bounds!.height - viewport.height);
  }, { message: "the complete panel stays within the viewport after layout settles" }).toBeLessThanOrEqual(1);
  const sheet = await popup.evaluate(node => node.classList.contains("rain-date-picker__sheet"));
  const content = popup.locator(sheet ? ".rain-sheet-body" : ".rain-date-picker__body");
  const actions = popup.locator('[data-slot="actions"]');
  await expect.poll(async () => {
    const body = await content.boundingBox(), footer = await actions.boundingBox();
    return body!.y + body!.height - footer!.y;
  }, { message: "the scrollable body must finish before the action footer" }).toBeLessThanOrEqual(1);
  expect(await popup.evaluate(node => node.scrollWidth - node.clientWidth), "date panel has no horizontal overflow").toBeLessThanOrEqual(1);
  expect(await content.evaluate(node => node.scrollWidth - node.clientWidth), "scrolling body has no horizontal overflow").toBeLessThanOrEqual(1);
}

test.beforeEach(async ({ page }, info) => {
  const messages: string[] = []; consoleErrors.set(info.testId, messages);
  page.on("pageerror", error => messages.push(error.message));
  page.on("console", message => { if (message.type() === "error") messages.push(message.text()); });
  // Freeze Date only. Normal browser timers continue to run for Base UI and animations.
  await page.clock.setFixedTime(fixedNow);
});
test.afterEach(async ({}, info) => {
  const messages = consoleErrors.get(info.testId) ?? [];
  writeFileSync(`${evidence}/console-${info.project.name}-${info.line}.json`, JSON.stringify(messages, null, 2));
  expect(messages, "uncaught browser errors").toEqual([]);
});

test("D18 D20 all three task samples save locally with complete dates and timezone", async ({ page, browser }, info) => {
  await page.goto("/#date-picker");
  const environment = await page.evaluate(() => ({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, currentDate: new Date().toISOString(), coarsePointer: matchMedia("(pointer: coarse)").matches, width: innerWidth, height: innerHeight }));
  writeFileSync(`${evidence}/environment-${info.project.name}.json`, JSON.stringify({ browser: browser.browserType().name(), version: browser.version(), ...environment }, null, 2));
  for (const [id, button, status, label, text] of [
    ["date-time-homework", "保存设置", "作业保存结果", "作业设置摘要", "截止 2026-10-13 23:59"],
    ["date-time-exam", "保存考试设置", "考试保存结果", "考试设置摘要", "答题时长 60 分钟"],
    ["date-time-cross-day", "保存时间段", "时间段保存结果", "时间段摘要", "2026-10-14 01:00"],
  ]) {
    const section = page.getByTestId(id!);
    await section.getByRole("button", { name: button!, exact: true }).click();
    await expect(section.getByRole("status", { name: status! })).toContainText(text!);
    await expect(section.getByLabel(label!, { exact: true })).toContainText("Asia/Shanghai · 北京时间");
    await screenshot(section, info, id!);
  }
  await hasNoDuplicateIds(page);
});

test("D01 D02 D03 strict typed dates and minute precision preserve the committed value", async ({ page }, info) => {
  test.skip(!basicProject(info), "Input semantics exercised in Chromium and WebKit.");
  await page.goto("/#date-picker"); const trigger = await open(page, "截止时间");
  const date = box(page, "日期");
  await date.fill("2026-02-30"); await date.press("Tab");
  await expect(confirm(page)).toBeDisabled(); await expect(date).toHaveValue("2026-02-30");
  await expect(hint(page)).toHaveCount(1); await expect(hint(page)).toContainText("日期无效");
  await expect(date).toHaveAttribute("aria-invalid", "true");
  await expect(box(page, "日期时间")).not.toHaveAttribute("aria-invalid", "true");
  await date.fill("2028-02-29"); await expect(panel(page).getByRole("combobox", { name: "选择月份" })).toHaveText("2月");
  await panel(page).getByRole("button", { name: "下个月", exact: true }).click();
  await box(page, "日期时间").fill("9:5"); await box(page, "日期时间").press("Tab");
  await expect(panel(page).getByRole("combobox", { name: "选择月份" })).toHaveText("3月");
  await expect(date).toHaveValue("2028-02-29"); await expect(box(page, "日期时间")).toHaveValue("09:05");
  await expect(summary(page)).toHaveCount(0);
  await box(page, "日期时间").fill("25:05"); await expect(confirm(page)).toBeDisabled();
  await box(page, "日期时间").fill("23:"); await expect(confirm(page)).toBeDisabled();
  await expect(date).toHaveValue("2028-02-29");
  await box(page, "日期时间").fill("23:59"); await confirm(page).click();
  await expect(trigger).toHaveText("2028-02-29 23:59");
  await open(page, "开放时间"); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  await expect(confirm(page)).toBeDisabled(); await expect(hint(page)).toHaveCount(0);
  await expect(box(page, "开始时间")).toHaveValue(""); await expect(box(page, "结束时间")).toHaveValue("");
  await day(page, 2026, 10, 13).click(); await expect(confirm(page)).toBeDisabled();
  await box(page, "开始时间").fill("09:00");
  await expect(step(page)).toHaveText("请选择结束日期"); await expect(hint(page)).toHaveCount(0);
});

test("D03 pasted HH:mm and IME composition never commit an unfinished value", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Clipboard permissions and simulated IME are Chromium browser checks.");
  await page.goto("/#date-picker"); await open(page, "截止时间");
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.evaluate(() => navigator.clipboard.writeText("09:30"));
  const time = box(page, "日期时间"); await time.focus(); await time.press("ControlOrMeta+A"); await time.press("ControlOrMeta+V");
  await expect(time).toHaveValue("09:30");
  await expect(panel(page).locator('[data-slot="time-field"] input')).toHaveCount(1);
  await expect(panel(page).getByRole("combobox", { name: /常用时间/ })).toHaveCount(0);
  await time.dispatchEvent("compositionstart", { data: "9" });
  await expect(confirm(page)).toBeDisabled();
  await time.press("Enter"); await expect(panel(page)).toBeVisible();
  await time.dispatchEvent("compositionend", { data: "9" }); await expect(confirm(page)).toBeEnabled();
  await box(page, "日期").dispatchEvent("compositionstart", { data: "2026" });
  await expect(confirm(page)).toBeDisabled();
  await box(page, "日期").dispatchEvent("compositionend", { data: "2026" }); await expect(confirm(page)).toBeEnabled();
});

test("D04 D05 D06 D07 endpoint editing preserves identities and enforces a positive teaching window", async ({ page }, info) => {
  test.skip(!basicProject(info), "Endpoint semantics exercised in Chromium and WebKit.");
  await page.goto("/#date-picker"); const trigger = await open(page, "考试开放窗口");
  await expect(panel(page).getByRole("grid")).toHaveCount(1);
  await expect(panel(page).getByRole("button", { name: "按时长设置结束", exact: true })).toHaveCount(0);
  await box(page, "结束时间").fill("11:30");
  await expect(box(page, "开始日期")).toHaveValue("2026-10-13"); await expect(box(page, "开始时间")).toHaveValue("09:00");
  await box(page, "结束时间").fill("10:30"); await expect(summary(page)).toHaveText(/^共\s*1\s*小时\s*30\s*分钟$/);
  await box(page, "结束时间").fill("09:00");
  await expect(confirm(page)).toBeDisabled(); await expect(hint(page)).toHaveCount(1); await expect(hint(page)).toContainText("至少1分钟");
  await expect(box(page, "结束时间")).toHaveAttribute("aria-invalid", "true");
  await expect(box(page, "结束日期")).not.toHaveAttribute("aria-invalid", "true");
  await expect(box(page, "开始时间")).not.toHaveAttribute("aria-invalid", "true");
  await box(page, "结束时间").fill("10:30");
  await box(page, "开始时间").fill("11:00"); await expect(confirm(page)).toBeDisabled();
  await expect(box(page, "结束时间")).toHaveValue("10:30"); await expect(hint(page)).toContainText("不能早于");
  await box(page, "开始时间").fill("09:00");
  await editDate(page, "结束").click(); await expect(editDate(page, "结束")).toHaveAttribute("aria-pressed", "true");
  await box(page, "开始日期").focus(); await day(page, 2026, 10, 14).click();
  await expect(box(page, "开始日期")).toHaveValue("2026-10-13"); await expect(box(page, "结束日期")).toHaveValue("2026-10-14");
  await day(page, 2026, 10, 13).click(); await confirm(page).click();
  await expect(trigger).toHaveText("2026-10-13 09:00 至 2026-10-13 10:30");
  await expect(page.getByLabel("考试设置摘要", { exact: true })).toContainText("1 小时 30 分钟");
  // The generic date-only range still accepts a same-day value.
  const dateTrigger = await open(page, "日期区间");
  await box(page, "开始日期").focus();
  await day(page, 2026, 10, 20).click(); await day(page, 2026, 10, 20).click(); await confirm(page).click();
  await expect(dateTrigger).toHaveText("2026-10-20 至 2026-10-20");
  await open(page, "日期区间"); await expect(summary(page)).toHaveCount(0);
  await editDate(page, "结束").click(); await day(page, 2026, 10, 21).click();
  await expect(box(page, "开始日期")).toHaveValue("2026-10-20"); await expect(box(page, "结束日期")).toHaveValue("2026-10-21");
  await day(page, 2026, 10, 22).click(); await day(page, 2026, 10, 23).click(); await confirm(page).click();
  await expect(dateTrigger).toHaveText("2026-10-22 至 2026-10-23");
});

test("D08 D09 month-end and year-end midnight repair is explicit and happens once", async ({ page }, info) => {
  test.skip(!basicProject(info), "Calendar boundaries exercised in Chromium and WebKit.");
  await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  await dateTime(page, "开始", "2026-10-31", "23", "00");
  await dateTime(page, "结束", "2026-10-31", "01", "00"); await expect(confirm(page)).toBeDisabled();
  await panel(page).getByRole("button", { name: "结束日期改为次日", exact: true }).click();
  await expect(box(page, "结束日期")).toHaveValue("2026-11-01");
  await expect(summary(page)).toHaveText(/^次日 · 共\s*2\s*小时$/);
  await expect(panel(page).getByRole("button", { name: "结束日期改为次日", exact: true })).toHaveCount(0);
  await confirm(page).click(); await expect(trigger).toHaveText("2026-10-31 23:00 至 2026-11-01 01:00");
  await open(page, "活动时间段");
  await dateTime(page, "开始", "2026-12-31", "23", "00"); await dateTime(page, "结束", "2027-01-01", "01", "00");
  await expect(summary(page)).toContainText(/2\s*小时/); await confirm(page).click();
  await expect(trigger).toHaveText("2026-12-31 23:00 至 2027-01-01 01:00");
  await open(page, "活动时间段");
  await dateTime(page, "开始", "2028-02-28", "23", "00"); await dateTime(page, "结束", "2028-02-29", "01", "00");
  await expect(summary(page)).toContainText(/2\s*小时/); await confirm(page).click();
  await expect(trigger).toHaveText("2028-02-28 23:00 至 2028-02-29 01:00");
});

test("D10 D11 external examples and optional duration preserve saving boundaries and never lock later edits", async ({ page }, info) => {
  test.skip(!basicProject(info), "Duration behavior exercised in Chromium and WebKit.");
  await page.goto("/#date-picker");
  const example = page.getByTestId("date-time-cross-day");
  await example.getByRole("group", { name: "加载示例", exact: true }).getByRole("button", { name: "同日 90 分钟", exact: true }).click();
  await expect(panel(page)).toHaveCount(0);
  await expect(example.getByRole("status", { name: "时间段保存结果", exact: true })).not.toContainText("时间段已保存");
  const trigger = await open(page, "活动时间段");
  await expect(trigger).toHaveText("2026-10-13 09:00 至 2026-10-13 10:30");
  await expect(panel(page).getByRole("button", { name: /同日 90 分钟|跨午夜|跨月时段/ })).toHaveCount(0);
  await expect(summary(page)).toContainText(/1\s*小时\s*30\s*分钟/);
  const durationToggle = panel(page).getByRole("button", { name: "按时长设置结束", exact: true });
  await expect(durationToggle).toHaveAttribute("aria-expanded", "false"); await expect(box(page, "自定义时长（分钟）")).toHaveCount(0);
  await durationToggle.click(); await expect(durationToggle).toHaveAttribute("aria-expanded", "true");
  await panel(page).getByRole("button", { name: "60分钟", exact: true }).click();
  await expect(box(page, "结束时间")).toHaveValue("10:00");
  await expect(trigger).toHaveText("2026-10-13 09:00 至 2026-10-13 10:30");
  await box(page, "自定义时长（分钟）").fill("45"); await panel(page).getByRole("button", { name: "应用时长", exact: true }).click();
  await expect(box(page, "结束时间")).toHaveValue("09:45");
  await box(page, "开始时间").fill("09:15"); await expect(box(page, "结束时间")).toHaveValue("09:45");
  await expect(summary(page)).toContainText(/30\s*分钟/);
  await box(page, "自定义时长（分钟）").fill("0"); await expect(panel(page).getByRole("button", { name: "应用时长", exact: true })).toBeDisabled();
  await confirm(page).click(); await expect(trigger).toHaveText("2026-10-13 09:15 至 2026-10-13 09:45");
  await page.clock.setFixedTime(new Date("2026-10-12T23:59:30+08:00"));
  const deadline = await open(page, "作业截止时间");
  await expect(panel(page).getByRole("button", { name: "今天 23:59", exact: true })).toBeDisabled();
  await expect(panel(page).getByRole("button", { name: "明天 23:59", exact: true })).toBeEnabled();
  await expect(deadline).toHaveText("2026-10-13 23:59");
});

test("D12 cancel Escape outside and clear do not leak drafts; reopen resets selection intent", async ({ page }, info) => {
  test.skip(!basicProject(info), "Dismissal behavior exercised in Chromium and WebKit.");
  await page.goto("/#date-picker"); const trigger = await open(page, "截止时间");
  await box(page, "日期").fill("2026-12-25"); await panel(page).getByRole("button", { name: "取消", exact: true }).click();
  await expect(trigger).toHaveText("2026-10-20 18:00"); await expect(trigger).toBeFocused();
  await open(page, "截止时间"); await box(page, "日期时间").fill("12:00"); await page.keyboard.press("Escape");
  await expect(trigger).toHaveText("2026-10-20 18:00");
  await open(page, "截止时间"); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  await expect(box(page, "日期")).toHaveValue(""); await expect(box(page, "日期时间")).toHaveValue("");
  await panel(page).getByRole("button", { name: "取消", exact: true }).click(); await expect(trigger).toHaveText("2026-10-20 18:00");
  await open(page, "截止时间"); await box(page, "日期").fill("2026-11-10");
  await page.getByRole("button", { name: "深色", exact: true }).click(); await expect(panel(page)).toHaveCount(0);
  await expect(trigger).toHaveText("2026-10-20 18:00");
  const rangeTrigger = await open(page, "活动时间段");
  await editDate(page, "结束").click(); await box(page, "开始时间").fill("-");
  await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  for (const label of ["开始日期", "开始时间", "结束日期", "结束时间"]) await expect(box(page, label)).toHaveValue("");
  await expect(hint(page)).toHaveCount(0); await expect(editDate(page, "开始")).toHaveAttribute("aria-pressed", "true");
  await day(page, 2026, 10, 20).click(); await expect(confirm(page)).toBeDisabled();
  await day(page, 2026, 10, 21).click();
  await box(page, "开始时间").fill("23:00"); await box(page, "结束时间").fill("01:00"); await confirm(page).click();
  await expect(rangeTrigger).toHaveText("2026-10-20 23:00 至 2026-10-21 01:00");
});

test("D13 nested month menus own Escape and a single HH:mm input never saves the host form on Enter", async ({ page }, info) => {
  test.skip(!basicProject(info), "Keyboard layering exercised in Chromium and WebKit.");
  await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  const month = panel(page).getByRole("combobox", { name: "选择月份", exact: true });
  await month.click(); await expect(page.getByRole("listbox")).toBeVisible(); await page.keyboard.press("Escape");
  await expect(page.getByRole("listbox")).toHaveCount(0); await expect(panel(page)).toBeVisible(); await expect(month).toBeFocused();
  await expect(panel(page).getByRole("combobox", { name: /常用时间/ })).toHaveCount(0);
  await expect(panel(page).locator('[data-slot="time-field"] input')).toHaveCount(1);
  const time = box(page, "日期时间");
  await time.fill("9:7"); await time.press("Enter"); await expect(time).toHaveValue("09:07");
  await time.press("ArrowUp"); await expect(time).toHaveValue("09:08");
  await time.press("ArrowDown"); await expect(time).toHaveValue("09:07");
  await expect(panel(page)).toBeVisible(); await expect(page.getByRole("status", { name: "作业保存结果" })).not.toContainText("设置已保存");
  await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  for (const [opener, title, field] of [["对话框设置日期", "作业日期设置", "对话框截止日期"], ["侧栏设置时间", "作业时间设置", "侧栏截止时间"]]) {
    await page.getByRole("button", { name: opener!, exact: true }).click();
    const outer = page.getByRole("dialog", { name: title!, exact: true });
    await outer.getByRole("button", { name: field!, exact: true }).click(); await expect(panel(page)).toBeVisible();
    await page.keyboard.press("Escape"); await expect(panel(page)).toHaveCount(0); await expect(outer).toBeVisible();
    await page.keyboard.press("Escape"); await expect(outer).toHaveCount(0);
  }
});

test("D15 D18 current time refresh rejects expired drafts and host save preserves data", async ({ page }, info) => {
  test.skip(!basicProject(info), "Clock and host validation exercised in Chromium and WebKit.");
  await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  await dateTime(page, "日期", "2026-10-12", "10", "01"); await expect(confirm(page)).toBeEnabled();
  await page.clock.setFixedTime(new Date("2026-10-12T10:01:30+08:00"));
  // The host subscribes to foreground focus; dispatch that lifecycle notification without reloading the draft.
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(confirm(page)).toBeDisabled(); await expect(box(page, "日期时间")).toHaveValue("10:01");
  await box(page, "日期时间").fill("10:02"); await confirm(page).click();
  await expect(trigger).toHaveText("2026-10-12 10:02");
  await page.clock.setFixedTime(new Date("2026-10-12T10:02:00+08:00"));
  await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  await expect(page.getByText("截止时间必须晚于当前时间，请重新选择。", { exact: true })).toBeVisible();
  await expect(trigger).toHaveText("2026-10-12 10:02");
  await open(page, "作业截止时间"); await panel(page).getByRole("button", { name: "明天 23:59", exact: true }).click(); await confirm(page).click();
  await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("设置已保存");
  await page.getByText("定时开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "定时开放", exact: true })).toBeChecked();
  await page.clock.setFixedTime(new Date("2026-10-13T10:00:00+08:00"));
  await page.getByText("立即开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "立即开放", exact: true })).toBeChecked();
  await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("立即开放");
  await page.getByText("定时开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "定时开放", exact: true })).toBeChecked();
  await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  await expect(page.getByText("开放时间已经过去，请重新选择。", { exact: true })).toBeVisible();
});

test("D18 exam entry boundaries clamp late entry and keep duration independent", async ({ page }, info) => {
  test.skip(!basicProject(info), "Admission behavior exercised in Chromium and WebKit.");
  await page.goto("/#date-picker");
  for (const [preset, result] of [["开放前 1 分钟", "尚未开放"], ["开放时刻", "可答题 1 小时"], ["关闭前 30 分钟", "可答题 30 分钟"], ["关闭时刻", "考试已关闭"]]) {
    await open(page, "模拟入场时间"); await panel(page).getByRole("button", { name: preset!, exact: true }).click(); await confirm(page).click();
    await expect(page.getByLabel("模拟入场结果", { exact: true })).toContainText(result!);
  }
  const duration = page.getByRole("spinbutton", { name: "答题时长", exact: true }); await duration.fill("180"); await duration.press("Tab");
  await expect(page.getByText("答题时长超过开放窗口；按本演示策略，所有人最晚在关闭时间结束，原时长设置保留。", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  await expect(page.getByRole("status", { name: "考试保存结果" })).toContainText("答题时长 180 分钟");
  await duration.fill("-"); await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  await expect(page.getByText("请输入正整数答题时长。", { exact: true })).toBeVisible();
});

test("D15 an open panel refreshes automatically at the next minute without focus or reopening", async ({ page }, info) => {
  test.skip(!basicProject(info), "Automatic host clock refresh exercised in Chromium and WebKit.");
  // Install a running clock before page load; do not pause the timers used by floating layers.
  await page.clock.install({ time: fixedNow });
  await page.clock.setSystemTime(fixedNow);
  await page.goto("/#date-picker"); await open(page, "作业截止时间");
  await dateTime(page, "日期", "2026-10-12", "10", "01"); await expect(confirm(page)).toBeEnabled();
  await page.clock.fastForward(31_000);
  await expect(confirm(page)).toBeDisabled(); await expect(box(page, "日期时间")).toHaveValue("10:01");
  await expect(hint(page)).toContainText("超出允许范围");
});

test("D16 responsive panels preserve draft, contain overflow and retain touch hit areas", async ({ page }, info) => {
  await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  await expect(panel(page).getByRole("grid")).toHaveCount(1);
  await expect(panel(page).getByRole("combobox", { name: /常用时间/ })).toHaveCount(0);
  await expect(panel(page).locator('[data-slot="time-field"] input')).toHaveCount(2);
  await screenshot(panel(page), info, "datetime-panel-initial");
  await box(page, "结束时间").fill("01:15");
  const coarse = info.project.name.startsWith("touch");
  if (coarse) {
    await expect(panel(page)).toHaveClass(/rain-date-picker__sheet/);
    const targets = await panel(page).locator('.rain-calendar__day-button, .rain-date-picker__actions > button, .rain-calendar__nav > button, button[aria-label^="在日历中修改"]').evaluateAll(nodes => nodes.map(node => ({ tag: node.getAttribute("aria-label") || node.textContent, width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
    writeFileSync(`${evidence}/touch-targets-${info.project.name}.json`, JSON.stringify(targets, null, 2));
    expect.soft(targets.every(target => target.width + 0.01 >= 44 && target.height + 0.01 >= 44), JSON.stringify(targets)).toBe(true);
    const durationToggle = panel(page).getByRole("button", { name: "按时长设置结束", exact: true });
    await durationToggle.click();
    const fields = await panel(page).locator('.rain-date-picker__endpoint [data-rain-id="ui-input"], .rain-date-picker__custom-duration [data-rain-id="ui-input"]').evaluateAll(nodes => nodes.map(node => ({ label: node.querySelector("input")?.getAttribute("aria-label"), width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
    writeFileSync(`${evidence}/touch-input-frames-${info.project.name}.json`, JSON.stringify(fields, null, 2));
    expect.soft(fields.every(target => target.width + 0.01 >= 44 && target.height + 0.01 >= 44), JSON.stringify(fields)).toBe(true);
    const timeTargets = await panel(page).locator('[data-slot="time-field"] [data-rain-id="ui-input"]').evaluateAll(nodes => nodes.map(node => ({ label: node.querySelector("input")?.getAttribute("aria-label"), width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
    writeFileSync(`${evidence}/touch-time-targets-${info.project.name}.json`, JSON.stringify(timeTargets, null, 2));
    expect(timeTargets).toHaveLength(2);
    expect.soft(timeTargets.every(target => target.width + 0.01 >= 44 && target.height + 0.01 >= 44), JSON.stringify(timeTargets)).toBe(true);
    await durationToggle.click(); await expect(box(page, "自定义时长（分钟）")).toHaveCount(0);
  }
  await hasNoDuplicateIds(page);
  const viewport = page.viewportSize()!;
  await assertPanelGeometry(page);
  await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  await screenshot(panel(page), info, "datetime-panel");
  if (coarse) {
    await page.setViewportSize({ width: viewport.width, height: 480 });
    await assertPanelGeometry(page);
    await box(page, "结束时间").scrollIntoViewIfNeeded(); await expect(box(page, "结束时间")).toHaveValue("01:15");
    await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
    await screenshot(panel(page), info, "datetime-shrunk-viewport");
  }
  await confirm(page).click(); await expect(trigger).toHaveText("2026-10-13 23:00 至 2026-10-14 01:15");
});

test("D16 D17 dark compact forced colors and reduced motion keep controls reachable", async ({ page }, info) => {
  test.skip(!["desktop", "narrow390", "touch600"].includes(info.project.name), "Visual stress cases use representative fine and coarse pointers.");
  await page.goto("/#date-picker");
  await page.getByRole("button", { name: "深色", exact: true }).click(); await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  await open(page, "活动时间段"); await screenshot(panel(page), info, "datetime-dark-compact");
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  await expect(panel(page)).toHaveCSS("transition-duration", "0s");
  await box(page, "开始日期").focus(); await expect(box(page, "开始日期")).toBeFocused();
  await assertPanelGeometry(page);
  await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  await screenshot(panel(page), info, "datetime-forced-colors");
  await page.keyboard.press("Escape");
});

test("D16 200 percent viewport equivalent and minimum reflow preserve the open draft", async ({ page }, info) => {
  test.skip(!basicProject(info), "720px equivalent layout and 320px minimum reflow exercised in Chromium and WebKit.");
  await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  await box(page, "结束时间").fill("01:30");
  // A 1440×1000 browser at 200% has a 720×500 CSS layout viewport. This is layout equivalence, not native zoom automation.
  for (const viewport of [{ width: 720, height: 500 }, { width: 320, height: 480 }]) {
    await page.setViewportSize(viewport);
    await expect(panel(page).getByRole("grid")).toHaveCount(1);
    await expect(box(page, "结束时间")).toHaveValue("01:30");
    await expect(box(page, "结束时间")).toBeFocused();
    await expect(box(page, "结束时间")).toBeInViewport({ ratio: 0.99 });
    await assertPanelGeometry(page);
    await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
    await screenshot(panel(page), info, `datetime-reflow-${viewport.width}`);
  }
  await confirm(page).click(); await expect(trigger).toHaveText("2026-10-13 23:00 至 2026-10-14 01:30");
});

test("D16 additional CSS zoom stress at 390px keeps all content reachable", async ({ page }, info) => {
  await page.goto("/#date-picker");
  await page.getByRole("button", { name: "深色", exact: true }).click(); await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  // Additional below-minimum stress: CSS zoom doubles an already narrow 390px viewport to an effective 195 CSS pixels.
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  await open(page, "活动时间段"); await box(page, "结束时间").fill("01:30");
  await page.screenshot({ path: `${evidence}/css-zoom-390-stress.png` });
  await assertPanelGeometry(page);
  await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  await screenshot(panel(page), info, "datetime-200-percent");
  await confirm(page).click();
});

test("D17 rapid month changes leave one live month and respect reduced motion", async ({ page }, info) => {
  test.skip(!basicProject(info), "Calendar motion exercised in Chromium and WebKit.");
  await page.goto("/#date-picker"); await open(page, "截止日期");
  const calendar = panel(page).locator('[data-rain-id="ui-calendar"]');
  const duration = await calendar.evaluate(node => getComputedStyle(node).getPropertyValue("--rdp-animation_duration").trim());
  expect(parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1000)).toBe(220);
  const next = calendar.getByRole("button", { name: "下个月", exact: true });
  await next.click({ delay: 0 }); await next.click({ delay: 0 }); await next.click({ delay: 0 });
  await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText("1月");
  await expect(calendar.locator('[data-animated-month][aria-hidden="true"]')).toHaveCount(0);
  await expect(calendar.getByRole("grid")).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: "reduce" }); await next.click();
  await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText("2月");
  await expect(calendar.locator("[data-animated-month]")).toHaveCount(0);
  await expect(calendar.locator(".rain-calendar__day-button").first()).toHaveCSS("transition-duration", "0s");
});

test("D20 UTC labels reflect the actual host timezone", async ({ browser }, info) => {
  test.skip(info.project.name !== "desktop", "Timezone behavior is browser-locale independent and exercised once in UTC.");
  const context = await browser.newContext({ timezoneId: "UTC", locale: "zh-CN", viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const messages = consoleErrors.get(info.testId)!;
  page.on("pageerror", error => messages.push(error.message));
  page.on("console", message => { if (message.type() === "error") messages.push(message.text()); });
  await page.clock.setFixedTime(fixedNow); await page.goto("http://127.0.0.1:5395/#date-picker");
  for (const label of ["作业设置摘要", "考试设置摘要", "时间段摘要"]) {
    await expect(page.getByLabel(label, { exact: true })).toContainText("本机时间（UTC）");
    await expect(page.getByLabel(label, { exact: true })).not.toContainText("北京时间");
  }
  await page.getByTestId("date-time-exam").screenshot({ path: `${evidence}/timezone-utc.png` }); await context.close();
});
