import { expect, test, type Locator, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const evidence = fileURLToPath(new URL("../../evidence/runtime/g5-components-2026-10-12/browser-dates/", import.meta.url));
mkdirSync(evidence, { recursive: true });
const errors = new Map<string, string[]>();
test.beforeEach(({ page }, info) => {
  const messages: string[] = []; errors.set(info.testId, messages);
  page.on("pageerror", error => messages.push(error.message));
  page.on("console", message => { if (message.type() === "error") messages.push(message.text()); });
});
test.afterEach(({}, info) => {
  const messages = errors.get(info.testId) ?? [];
  writeFileSync(`${evidence}/console-${info.project.name}-${info.line}.json`, JSON.stringify(messages, null, 2));
  expect(messages, "uncaught browser errors").toEqual([]);
});
const popup = (page: Page) => page.getByRole("dialog");
const day = (scope: Page | Locator, date: number, month = 10, year = 2026) => scope.getByRole("button", { name: new RegExp(`^${year}年${month}月${date}日`) }).first();
const confirm = (page: Page) => popup(page).getByRole("button", { name: "确定", exact: true });
async function open(page: Page, name: string) { const trigger = page.getByRole("button", { name, exact: true }); await trigger.click(); await expect(popup(page)).toBeVisible(); return trigger; }

test("calendar keeps Chinese weekdays, selected state, disabled dates and keyboard navigation", async ({ page }, info) => {
  await page.goto("/#calendar");
  const calendar = page.locator('[data-rain-id="ui-calendar"]').first();
  await expect(calendar.getByRole("button", { name: "上个月", exact: true }).locator('[data-icon="icon/arrow-left"]')).toBeVisible();
  await expect(calendar.getByRole("button", { name: "下个月", exact: true }).locator('[data-icon="icon/arrow-right"]')).toBeVisible();
  await expect(calendar.getByRole("columnheader", { includeHidden: true }).first()).toHaveText("一");
  await day(calendar, 13).click();
  await expect(day(calendar, 13)).toHaveAttribute("data-selected-single", "true");
  await expect(day(calendar, 13)).toHaveCSS("color", "rgb(255, 255, 255)");
  const selectedColors = await day(calendar, 13).evaluate(node => ({ button: getComputedStyle(node).color, label: getComputedStyle(node.querySelector('[data-slot="label"]')!).color }));
  expect(selectedColors.label, "the selected number inherits the on-color foreground").toBe(selectedColors.button);
  await expect(page.getByText("已选：2026-10-13", { exact: true })).toBeVisible();
  await page.keyboard.press("ArrowRight"); await expect(day(calendar, 14)).toBeFocused();
  await page.keyboard.press("Enter"); await expect(day(calendar, 14)).toHaveAttribute("data-selected-single", "true");
  const rangeCalendar = page.locator('[data-rain-id="ui-calendar"]').nth(1);
  await expect(day(rangeCalendar, 17)).toBeDisabled();
  await expect(day(rangeCalendar, 19)).toBeEnabled();
  await calendar.screenshot({ path: `${evidence}/calendar-${info.project.name}-selected.png` });
});

test("month animation lasts 220ms, cleans snapshots after rapid changes, and respects reduced motion", async ({ page }, info) => {
  await page.goto("/#calendar");
  const calendar = page.locator('[data-rain-id="ui-calendar"]').first();
  const next = calendar.getByRole("button", { name: "下个月", exact: true });
  await next.click();
  const duration = await calendar.locator(".rdp-caption_before_exit").evaluate(node => getComputedStyle(node).animationDuration);
  expect(duration).toBe("0.22s");
  await expect(calendar.locator('[data-animated-month][aria-hidden="true"]')).toHaveCount(0);
  await next.click({ delay: 0 }); await next.click({ delay: 0 });
  await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText(/1月/);
  await expect(calendar.locator('[data-animated-month][aria-hidden="true"]')).toHaveCount(0);
  await next.click();
  await expect(calendar.locator(".rdp-caption_before_exit")).toHaveCount(1);
  await expect(calendar.locator('[data-animated-month][aria-hidden="true"]')).toHaveCount(0);
  const facts = await calendar.evaluate(node => ({ liveMonths: node.querySelectorAll('[data-animated-month]').length, duration: getComputedStyle(node).getPropertyValue('--rdp-animation_duration').trim() }));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(calendar.locator("[data-animated-month]")).toHaveCount(0);
  await next.click(); await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText(/3月/);
  expect(await calendar.locator('.rain-calendar__day-button').first().evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0s");
  writeFileSync(`${evidence}/motion-${info.project.name}.json`, JSON.stringify({ measuredDuration: duration, ...facts, reducedAnimatedMonths: 0 }, null, 2));
  await calendar.screenshot({ path: `${evidence}/calendar-${info.project.name}-reduced.png` });
});

test("single date commits only on Confirm and drops cancel, Escape and outside drafts", async ({ page }, info) => {
  await page.goto("/#date-picker");
  const trigger = await open(page, "截止日期");
  await expect(popup(page).getByText("点击确定后生效", { exact: true })).toHaveCount(0);
  await expect(popup(page)).not.toHaveAttribute("aria-describedby");
  await expect(popup(page).getByRole("button", { name: "取消", exact: true })).toHaveAttribute("data-variant", "tertiary");
  await day(popup(page), 22).click(); await expect(trigger).toHaveText("2026-10-20");
  await confirm(page).click(); await expect(trigger).toHaveText("2026-10-22"); await expect(trigger).toBeFocused();
  await open(page, "截止日期"); await day(popup(page), 23).click();
  await popup(page).getByRole("button", { name: "取消", exact: true }).click(); await expect(trigger).toBeFocused();
  await open(page, "截止日期"); await day(popup(page), 24).click(); await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  await open(page, "截止日期"); await day(popup(page), 25).click();
  const outside = page.getByRole("button", { name: "深色", exact: true }); await outside.click(); await expect(outside).toBeFocused();
  await expect(trigger).toHaveText("2026-10-22"); await expect(popup(page)).toHaveCount(0);
  await open(page, "截止日期"); await popup(page).screenshot({ path: `${evidence}/single-${info.project.name}-dark.png` });
});

test("single datetime keeps invalid time uncommitted and formats the confirmed minute", async ({ page }, info) => {
  await page.goto("/#date-picker"); const trigger = await open(page, "截止时间");
  const hour = popup(page).getByRole("spinbutton", { name: "日期小时" }), minute = popup(page).getByRole("spinbutton", { name: "日期分钟" });
  await hour.fill("25"); await expect(confirm(page)).toBeDisabled();
  await expect(popup(page).locator('[data-slot="summary"]')).toHaveText("2026-10-20 --:--");
  await hour.fill("9"); await minute.fill("5"); await expect(trigger).toHaveText("2026-10-20 18:00");
  await popup(page).screenshot({ path: `${evidence}/single-time-${info.project.name}.png` });
  await confirm(page).click(); await expect(trigger).toHaveText("2026-10-20 09:05");
});

test("range uses a start/end phase, permits same-day values, and retains drafts through resize", async ({ page }, info) => {
  await page.goto("/#date-picker"); const trigger = await open(page, "日期区间");
  await expect(popup(page).getByRole("grid")).toHaveCount(info.project.name === "desktop" ? 2 : 1);
  await day(popup(page), 20).click(); await expect(confirm(page)).toBeDisabled();
  await page.setViewportSize({ width: 390, height: 844 }); await expect(popup(page).getByRole("grid")).toHaveCount(1);
  await day(popup(page), 12).click(); await expect(confirm(page)).toBeEnabled();
  await expect(popup(page).locator('[data-slot="summary"]')).toHaveText("2026-10-12 至 2026-10-20");
  await day(popup(page), 22).click(); await expect(confirm(page)).toBeDisabled();
  await day(popup(page), 22).click(); await popup(page).screenshot({ path: `${evidence}/range-${info.project.name}-narrow.png` });
  await confirm(page).click(); await expect(trigger).toHaveText("2026-10-22 至 2026-10-22");
});

test("range datetime validates order, aligns time groups, and requires an explicit nonempty commit", async ({ page }, info) => {
  await page.goto("/#date-picker"); const trigger = await open(page, "开放时间");
  await expect(popup(page).getByRole("grid")).toHaveCount(info.project.name === "desktop" ? 2 : 1);
  await day(popup(page), 12).click(); await day(popup(page), 12).click();
  await popup(page).getByRole("spinbutton", { name: "结束小时" }).fill("8");
  await expect(confirm(page)).toBeDisabled(); await expect(popup(page).getByRole("status", { name: "日期选择提示" })).toContainText("不能早于");
  await popup(page).getByRole("spinbutton", { name: "结束小时" }).fill("10");
  const boxes = await popup(page).locator('.rain-date-picker__time').evaluateAll(nodes => nodes.map(node => { const b = node.getBoundingClientRect(); return {x:b.x,y:b.y,width:b.width,height:b.height}; }));
  expect(boxes).toHaveLength(2);
  if (info.project.name === "desktop") expect(Math.abs(boxes[0]!.y - boxes[1]!.y)).toBeLessThan(2);
  else expect(boxes[1]!.y).toBeGreaterThan(boxes[0]!.y);
  await popup(page).screenshot({ path: `${evidence}/range-time-${info.project.name}.png` });
  writeFileSync(`${evidence}/range-time-${info.project.name}-layout.json`, JSON.stringify(boxes, null, 2));
  await confirm(page).scrollIntoViewIfNeeded();
  await expect(confirm(page)).toBeInViewport();
  if (info.project.name === "narrow") await popup(page).screenshot({ path: `${evidence}/range-time-${info.project.name}-footer.png` });
  await confirm(page).click(); await expect(trigger).toHaveText("2026-10-12 09:00 至 2026-10-12 10:00");
  await open(page, "开放时间"); await popup(page).getByRole("button", { name: "清空", exact: true }).click(); await expect(confirm(page)).toBeDisabled();
  await page.keyboard.press("Escape"); await expect(trigger).toHaveText("2026-10-12 09:00 至 2026-10-12 10:00");
});

test("nested month/year selectors own dismissal and preserve distinct field identities", async ({ page }, info) => {
  await page.goto("/#date-picker"); const trigger = await open(page, "截止时间");
  const year = popup(page).getByRole("combobox", { name: "选择年份" });
  await year.click(); await expect(page.getByRole("listbox")).toBeVisible(); await page.keyboard.press("Escape");
  await expect(page.getByRole("listbox")).toHaveCount(0); await expect(popup(page)).toBeVisible(); await expect(year).toBeFocused();
  await popup(page).getByRole("combobox", { name: "选择月份" }).click();
  await page.getByRole("option", { name: "11月", exact: true }).click();
  await expect(day(popup(page), 12, 11)).toBeVisible();
  await expect(popup(page).locator('[data-animated-month][aria-hidden="true"]')).toHaveCount(0);
  const duplicateIds = await page.evaluate(() => { const ids = [...document.querySelectorAll('[id]')].map(n => n.id); return ids.filter((id, i) => ids.indexOf(id) !== i); });
  expect(duplicateIds).toEqual([]);
  await day(popup(page), 12, 11).click(); await confirm(page).click(); await expect(trigger).toHaveText("2026-11-12 18:00"); await expect(trigger).toBeFocused();
  writeFileSync(`${evidence}/nested-${info.project.name}.json`, JSON.stringify({ duplicateIds, focusReturned: true }, null, 2));
});
