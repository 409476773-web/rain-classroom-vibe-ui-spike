import { expect, test, type Locator } from "@playwright/test";
import { mkdirSync } from "node:fs";

const url = process.env.RAIN_V12_G3_URL ?? "http://127.0.0.1:4174";
const evidence = "evidence/runtime/token-first-v12-g3/browser";
async function expectInsideViewport(locator: Locator) {
  expect(await locator.evaluate(element => {
    const rect = element.getBoundingClientRect();
    return rect.left >= 0 && rect.top >= 0 && rect.right <= innerWidth + 1 && rect.bottom <= innerHeight + 1;
  })).toBe(true);
}

test.beforeAll(() => mkdirSync(evidence, { recursive: true }));
test.beforeEach(async ({ page }) => {
  await page.goto(`${url}/#token-first-g3`);
  await expect(page.locator('main[data-rain-id="token-first-g3"]')).toBeVisible();
});

test("desktop directions and shared navigation remain operable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole("heading", { name: "工作台总览" })).toBeVisible();
  await page.screenshot({ path: `${evidence}/desktop-hierarchy.png`, fullPage: true });
  await page.getByRole("button", { name: "密度型" }).click();
  await expect(page.getByRole("main")).toHaveAttribute("data-direction", "density");
  await expect(page.locator(".g3-sidebar-desktop .rain-sidebar")).toHaveCSS("width", "220px");
  await page.screenshot({ path: `${evidence}/desktop-density.png`, fullPage: true });
  await page.getByRole("button", { name: "折叠导航" }).click();
  await expect(page.getByRole("button", { name: "展开导航" })).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByLabel("主导航").getByRole("link", { name: "我的任务" })).toBeVisible();
  await page.getByRole("button", { name: "展开导航" }).click();

  await page.getByLabel("主导航").getByRole("link", { name: "我的任务" }).click();
  await expect(page).toHaveURL(/section=tasks/);
  await expect(page.getByRole("heading", { name: "我的任务", exact: true })).toBeVisible();
  await expect(page.getByLabel("主导航").getByRole("link", { name: "我的任务" })).toHaveAttribute("aria-current", "page");
  await page.getByLabel("主导航").getByRole("link", { name: "总览" }).click();

  const commandInput = page.getByRole("combobox", { name: "搜索命令，例如：打开任务详情" });
  await page.keyboard.press("Meta+k");
  await expect(commandInput).toBeFocused();
  await commandInput.fill("打开任务详情");
  await commandInput.press("Enter");
  await expect(page.locator(".g3-live-status")).toHaveText("已打开任务详情");

  await page.getByRole("button", { name: "查看" }).click();
  await expect(page.getByLabel("工作台导航").getByRole("link", { name: "团队动态" })).toBeVisible();
  await expectInsideViewport(page.getByLabel("工作台导航").getByRole("link", { name: "团队动态" }));
  const menuTrigger = page.getByRole("menuitem", { name: "操作" });
  await menuTrigger.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menuitem", { name: "创建跟进任务" })).toBeVisible();
  await expectInsideViewport(page.getByRole("menuitem", { name: "创建跟进任务" }));
  expect(await page.locator(".g3-task-scroll-area [data-slot='viewport']").evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true);
  await page.locator(".g3-task-scroll-area [data-slot='viewport']").focus();
  await page.keyboard.press("End");
  await expect.poll(() => page.locator(".g3-task-scroll-area [data-slot='viewport']").evaluate(element => element.scrollTop)).toBeGreaterThan(0);
});

test("task overlays, focus recovery and narrow layout stay usable", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 900 });
  await page.screenshot({ path: `${evidence}/tablet-900.png`, fullPage: true });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  const firstTask = page.locator(".g3-task-row").first();
  await firstTask.click({ button: "right" });
  await expect(page.getByRole("menuitem", { name: "标记为重点" })).toBeVisible();
  await page.getByRole("menuitem", { name: "标记为重点" }).click();
  await expect(page.getByText("重点", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "林老师" }).first().hover();
  await expect(page.getByText("负责跟进这项教学工作", { exact: false })).toBeVisible();
  await expectInsideViewport(page.locator('[data-rain-id="ui-hover-card"][data-slot="popup"]').first());

  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  const mobileTrigger = page.getByRole("button", { name: "打开导航" });
  await expect(mobileTrigger).toBeVisible();
  await mobileTrigger.click();
  await expect(page.getByRole("dialog", { name: "教学工作台" })).toBeVisible();
  await expect(page.getByRole("dialog", { name: "教学工作台" }).getByRole("link", { name: "我的任务" })).toBeVisible();
  await page.screenshot({ path: `${evidence}/mobile-sheet-open.png`, fullPage: true });
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "教学工作台" })).toBeHidden();
  await expect(mobileTrigger).toBeFocused();
  await page.screenshot({ path: `${evidence}/mobile-forced-colors.png`, fullPage: true });
});

test("sheet nested overlays and long text remain inside the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "打开导航" }).click();
  const dialog = page.getByRole("dialog", { name: "教学工作台" });
  await expect(dialog).toBeVisible();
  await page.screenshot({ path: `${evidence}/mobile-sheet-normal.png`, fullPage: true });
  await dialog.getByRole("menuitem", { name: "面板操作" }).click();
  await expect(page.getByRole("menuitem", { name: "检查任务" })).toBeVisible();
  await page.getByRole("menuitem", { name: "检查任务" }).click();
  await expect(page.locator(".g3-live-status")).toHaveText("已执行面板操作");
  await page.keyboard.press("Tab");
  await dialog.getByRole("button", { name: "导航说明" }).focus();
  await expect(page.getByRole("tooltip", { name: "当前导航范围" })).toBeVisible();
  await expectInsideViewport(page.getByRole("tooltip", { name: "当前导航范围" }));
  await dialog.getByRole("link", { name: "协作成员" }).focus();
  await expect(page.getByText("林老师 · 负责当前任务")).toBeVisible();
  await expectInsideViewport(page.getByText("林老师 · 负责当前任务"));
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.keyboard.press("Escape");
  await dialog.getByRole("link", { name: "我的任务" }).click();
  await expect(page).toHaveURL(/section=tasks/);
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("heading", { name: "我的任务", exact: true })).toBeVisible();
  await page.locator(".g3-task-copy strong").last().evaluate(element => { element.textContent = "跨课程跨学期班级协同的超长超长超长任务名称与完整说明".repeat(5); });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});
