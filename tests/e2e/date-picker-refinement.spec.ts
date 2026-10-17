import { expect, test, type Locator, type Page, type TestInfo } from "@playwright/test";

const panel = (page: Page) => page.getByRole("dialog", { name: /^选择日期/ });
const field = (page: Page, name: string) => panel(page).getByRole("textbox", { name, exact: true });
const action = (page: Page, name: string) => panel(page).getByRole("button", { name, exact: true });
const day = (page: Page, date: number) => panel(page).getByRole("button", { name: new RegExp(`^2026年10月${date}日`) }).first();
const errors = new Map<string, string[]>();

async function open(page: Page, name: string) {
  const trigger = page.getByRole("button", { name, exact: true });
  await trigger.click(); await expect(panel(page)).toBeVisible();
  return trigger;
}

async function tabTo(page: Page, target: Locator) {
  for (let count = 0; count < 24; count++) {
    if (await target.evaluate(node => node === document.activeElement)) break;
    await page.keyboard.press("Tab");
  }
  await expect(target, "the control is reachable through the actual Tab order").toBeFocused();
}

async function assertPanelGeometry(page: Page) {
  await expect.poll(async () => panel(page).evaluate(node => {
    const box = node.getBoundingClientRect();
    return Math.max(-box.left, -box.top, box.right - innerWidth, box.bottom - innerHeight);
  }), { message: "the complete panel stays within the short viewport" }).toBeLessThanOrEqual(1);
  const overflow = await panel(page).evaluate(node => [node, ...node.querySelectorAll(".rain-date-picker__body, .rain-sheet-body")]
    .map(element => ({ element: element.className, overflow: element.scrollWidth - element.clientWidth })));
  expect(overflow.filter(item => item.overflow > 1), "the panel and its scrolling bodies must not overflow horizontally").toEqual([]);
  await action(page, "确定").scrollIntoViewIfNeeded();
  await expect(action(page, "确定")).toBeInViewport({ ratio: 1 });
  await expect(action(page, "取消")).toBeInViewport({ ratio: 1 });
}

async function assertUnclippedFieldFocus(page: Page, input: Locator) {
  await input.focus();
  await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab");
  await expect(input).toBeFocused();
  await input.scrollIntoViewIfNeeded();
  const result = await input.evaluate(node => {
    const frame = node.closest<HTMLElement>(".rain-field-frame")!;
    const style = getComputedStyle(frame), box = frame.getBoundingClientRect();
    const outline = style.outlineStyle === "none" ? 0 : parseFloat(style.outlineWidth) + Math.max(0, parseFloat(style.outlineOffset));
    // The shared Input currently uses an unblurred outer halo. Read its extent
    // from computed paint so this checks clipping rather than a copied CSS value.
    const shadows = style.boxShadow.split(/,(?![^(]*\))/).filter(shadow => !shadow.includes("inset")).map(shadow => {
      const lengths = [...shadow.matchAll(/(-?\d*\.?\d+)px/g)].map(match => Number(match[1]));
      return Math.max(Math.abs(lengths[0] ?? 0), Math.abs(lengths[1] ?? 0)) + (lengths[2] ?? 0) + (lengths[3] ?? 0);
    });
    const extent = Math.max(0, outline, ...shadows);
    const ring = { left: box.left - extent, top: box.top - extent, right: box.right + extent, bottom: box.bottom + extent };
    const clipped: { ancestor: string; axis: string; overflow: number }[] = [];
    const check = (ancestor: string, axis: string, amount: number) => { if (amount > 0.75) clipped.push({ ancestor, axis, overflow: amount }); };
    check("viewport", "x", Math.max(-ring.left, ring.right - innerWidth));
    check("viewport", "y", Math.max(-ring.top, ring.bottom - innerHeight));
    for (let ancestor = frame.parentElement; ancestor; ancestor = ancestor.parentElement) {
      const css = getComputedStyle(ancestor), bounds = ancestor.getBoundingClientRect();
      const paintContainment = /paint|strict|content/.test(css.contain);
      const name = `${ancestor.tagName.toLowerCase()}.${ancestor.className}`;
      const left = bounds.left + ancestor.clientLeft, top = bounds.top + ancestor.clientTop;
      if (paintContainment || /hidden|clip|auto|scroll/.test(css.overflowX)) {
        check(name, "x", Math.max(left - ring.left, ring.right - left - ancestor.clientWidth));
      }
      if (paintContainment || /hidden|clip|auto|scroll/.test(css.overflowY)) {
        check(name, "y", Math.max(top - ring.top, ring.bottom - top - ancestor.clientHeight));
      }
    }
    return { label: node.getAttribute("aria-label") || node.id, focusVisible: node.matches(":focus-visible"), extent, ring, clipped };
  });
  expect(result.focusVisible, "the input retains a keyboard focus indicator").toBe(true);
  expect(result.extent, "the shared field actually paints an outer focus indicator").toBeGreaterThan(0);
  expect(result.clipped, JSON.stringify(result, null, 2)).toEqual([]);
  return result;
}

async function recordPanel(page: Page, info: TestInfo, name: string) {
  await page.screenshot({ path: info.outputPath(`${name}.png`) });
}

test.describe("DatePicker UX refinement for desktop Popover and touch Sheet", () => {
  test.beforeEach(async ({ page }, info) => {
    const messages: string[] = []; errors.set(info.testId, messages);
    page.on("pageerror", error => messages.push(error.message));
    page.on("console", message => { if (message.type() === "error") messages.push(message.text()); });
    await page.clock.setFixedTime(new Date("2026-10-12T10:00:30+08:00"));
    await page.goto("/#date-picker");
  });
  test.afterEach(async ({}, info) => {
    const messages = errors.get(info.testId) ?? [];
    await info.attach("browser-errors", { body: JSON.stringify(messages), contentType: "application/json" });
    expect(messages, "uncaught browser errors").toEqual([]);
    errors.delete(info.testId);
  });

  for (const viewport of [{ width: 320, height: 480 }, { width: 390, height: 480 }, { width: 480, height: 360 }]) {
    test(`range layouts and ancestor focus clipping at ${viewport.width}x${viewport.height}`, async ({ page }, info) => {
      await page.setViewportSize(viewport);
      for (const name of ["日期区间", "开放时间"]) {
        await open(page, name);
        await expect(panel(page)).toHaveClass(info.project.name === "touch" ? /rain-date-picker__sheet/ : /rain-date-picker__popup/);
        await expect(panel(page).getByRole("grid")).toHaveCount(1);
        if (info.project.name === "touch") {
          const calendarButtons = panel(page).getByRole("button", { name: /^在日历中修改(开始|结束)日期$/ });
          await expect(calendarButtons).toHaveCount(2);
          await expect.poll(async () => calendarButtons.evaluateAll(nodes => nodes.flatMap(node => {
            const rect = node.getBoundingClientRect();
            return [rect.width, rect.height];
          }).filter(size => size < 44)), { message: "both endpoint calendar buttons must measure at least 44px wide and high" }).toEqual([]);
        }
        await assertPanelGeometry(page);
        const labels = name === "日期区间" ? ["开始日期", "结束日期"] : ["开始日期", "开始时间", "结束日期", "结束时间"];
        const focus = [];
        for (const label of labels) focus.push(await assertUnclippedFieldFocus(page, field(page, label)));
        await info.attach(`${name}-focus-geometry`, { body: JSON.stringify({ viewport, focus }, null, 2), contentType: "application/json" });
        if (name === "开放时间") {
          await expect(panel(page).locator('[data-slot="time-field"] input')).toHaveCount(2);
          await expect(panel(page).getByRole("combobox", { name: /常用时间/ })).toHaveCount(0);
        }
        await assertPanelGeometry(page);
        await recordPanel(page, info, name === "日期区间" ? "date-range" : "datetime-range");
        await action(page, "取消").click(); await expect(panel(page)).toHaveCount(0);
      }
    });
  }

  test("Tab and Shift+Tab reach inputs; nested Escape and picker Escape restore the right focus", async ({ page }, info) => {
    const trigger = page.getByRole("button", { name: "截止时间", exact: true });
    await trigger.focus(); await page.keyboard.press("Enter"); await expect(panel(page)).toBeVisible();
    const date = field(page, "日期"), time = field(page, "日期时间");
    await tabTo(page, date);
    await page.keyboard.press("Tab"); await expect(action(page, "在日历中修改日期")).toBeFocused();
    await page.keyboard.press("Shift+Tab"); await expect(date).toBeFocused();
    await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await expect(time).toBeFocused();
    await time.press("ControlOrMeta+A"); await page.keyboard.type("9:7"); await time.press("Enter");
    await expect(time).toHaveValue("09:07"); await expect(panel(page)).toBeVisible();
    await expect(trigger).toHaveText("2026-10-20 18:00");
    const year = panel(page).getByRole("combobox", { name: "选择年份", exact: true });
    await tabTo(page, year); await year.press("Enter"); await expect(page.getByRole("listbox")).toBeVisible();
    await page.keyboard.press("Escape"); await expect(page.getByRole("listbox")).toHaveCount(0);
    await expect(panel(page)).toBeVisible(); await expect(year).toBeFocused();
    await recordPanel(page, info, "keyboard-return-from-year");
    await page.keyboard.press("Escape"); await expect(panel(page)).toHaveCount(0); await expect(trigger).toBeFocused();
    await expect(trigger).toHaveText("2026-10-20 18:00");
  });

  test("date input focus preserves two-click ranges and explicit endpoint editing lasts one selection", async ({ page }, info) => {
    const trigger = await open(page, "日期区间");
    await field(page, "开始日期").click(); await day(page, 12).click();
    await expect(action(page, "确定")).toBeDisabled();
    await expect(panel(page).getByRole("status", { name: "日期选择提示" })).toHaveCount(0);
    const step = panel(page).getByRole("status", { name: "日期选择步骤" });
    await expect(step).toHaveText("请选择结束日期"); await expect(step).toHaveCSS("clip-path", "inset(50%)");
    await day(page, 14).click();
    await expect(field(page, "开始日期")).toHaveValue("2026-10-12"); await expect(field(page, "结束日期")).toHaveValue("2026-10-14");
    await action(page, "在日历中修改结束日期").click(); await day(page, 15).click();
    await expect(field(page, "开始日期")).toHaveValue("2026-10-12"); await expect(field(page, "结束日期")).toHaveValue("2026-10-15");
    await day(page, 17).click(); await expect(field(page, "结束日期")).toHaveValue("");
    await day(page, 18).click(); await expect(panel(page).locator('[data-slot="summary"]')).toHaveCount(0);
    await recordPanel(page, info, "date-range-restarted");
    await action(page, "确定").click(); await expect(trigger).toHaveText("2026-10-17 至 2026-10-18");
  });

  test("one ordered-window error links only to time; clearing all raw drafts then cancelling restores the committed range", async ({ page }, info) => {
    const trigger = await open(page, "活动时间段");
    const committed = "2026-10-13 23:00 至 2026-10-14 01:00";
    await expect(trigger).toHaveText(committed);
    await field(page, "结束日期").fill("2026-10-13"); await field(page, "结束时间").fill("01:00");
    const hint = panel(page).getByRole("status", { name: "日期选择提示" });
    await expect(panel(page).getByText("结束时间不能早于开始时间", { exact: true })).toHaveCount(1);
    await expect(action(page, "确定")).toBeDisabled();
    await expect(field(page, "结束时间")).toHaveAttribute("aria-invalid", "true");
    await expect(field(page, "结束时间")).toHaveAttribute("aria-describedby", (await hint.getAttribute("id"))!);
    await expect(field(page, "结束日期")).not.toHaveAttribute("aria-invalid", "true");
    await recordPanel(page, info, "single-range-error");
    await action(page, "按时长设置结束").click();
    await field(page, "开始时间").fill(":"); await field(page, "自定义时长（分钟）").fill("-2");
    await action(page, "清空").click();
    for (const name of ["开始日期", "结束日期", "开始时间", "结束时间", "自定义时长（分钟）"]) await expect(field(page, name)).toHaveValue("");
    await expect(action(page, "确定")).toBeDisabled(); await expect(trigger).toHaveText(committed);
    await action(page, "取消").click(); await expect(panel(page)).toHaveCount(0); await expect(trigger).toBeFocused();
    await open(page, "活动时间段");
    await expect(field(page, "开始日期")).toHaveValue("2026-10-13"); await expect(field(page, "开始时间")).toHaveValue("23:00");
    await expect(field(page, "结束日期")).toHaveValue("2026-10-14"); await expect(field(page, "结束时间")).toHaveValue("01:00");
    await expect(action(page, "按时长设置结束")).toHaveAttribute("aria-expanded", "false");
    await action(page, "按时长设置结束").click(); await expect(field(page, "自定义时长（分钟）")).toHaveValue("");
    await recordPanel(page, info, "cancel-restored-range");
    await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  });
});
