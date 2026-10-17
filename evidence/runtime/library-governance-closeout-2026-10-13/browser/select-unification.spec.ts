import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const evidence = "evidence/runtime/library-governance-closeout-2026-10-13/browser";
mkdirSync(evidence, { recursive: true });
test.beforeEach(({ page }) => { page.on("pageerror", error => { throw error; }); });

test("legacy route uses Rain panels across themes and viewport sizes", async ({ page }, info) => {
  await page.goto("/#native-select");
  await expect(page.getByRole("heading", { name: "Select 选择器", level: 1 })).toBeVisible();
  await expect(page.locator("select")).toHaveCount(0);
  const trigger = page.getByRole("combobox", { name: "任务类型", exact: true });
  const facts = [];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ["light", "dark"] as const) {
      await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
      await trigger.click();
      const popup = page.locator('[data-rain-id="ui-select-popup"]');
      await expect(popup).toBeVisible();
      await expect(page.getByRole("option", { name: "已归档任务", exact: true })).toHaveAttribute("aria-disabled", "true");
      const visual = await popup.evaluate(element => {
        const style = getComputedStyle(element), rect = element.getBoundingClientRect();
        return { theme: element.closest("[data-rain-theme]")?.getAttribute("data-rain-theme"), background: style.backgroundColor,
          color: style.color, borderRadius: style.borderRadius, padding: style.padding, fontSize: style.fontSize,
          fontFamily: style.fontFamily, left: rect.left, right: rect.right };
      });
      expect(visual.theme).toBe(theme);
      expect(visual.left).toBeGreaterThanOrEqual(0);
      expect(visual.right).toBeLessThanOrEqual(width);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
      await page.screenshot({ path: `${evidence}/${info.project.name}-${width}-${theme}.png` });
      facts.push({ width, ...visual });
      await page.keyboard.press("Escape");
      await expect(popup).not.toBeVisible();
      await expect(trigger).toBeFocused();
    }
  }
  writeFileSync(`${evidence}/${info.project.name}-visual.json`, JSON.stringify(facts, null, 2));
});

test("form submission, required feedback, keyboard and assignment choice remain operable", async ({ page }) => {
  await page.goto("/#select");
  const trigger = page.getByRole("combobox", { name: "任务类型", exact: true });
  await page.getByRole("button", { name: "清除任务类型", exact: true }).click();
  await page.getByRole("button", { name: "提交任务类型", exact: true }).click();
  await expect(page.getByText("请选择任务类型。", { exact: true })).toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.getByRole("status", { name: "任务类型提交结果" })).not.toContainText("提交值");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.keyboard.press("End");
  await expect(page.getByRole("option", { name: "课堂练习", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveText("课堂练习");
  await expect(trigger).toBeFocused();
  await expect(page.getByRole("listbox")).toHaveCount(0);
  await page.getByRole("button", { name: "提交任务类型", exact: true }).click();
  await expect(page.getByRole("status", { name: "任务类型提交结果" })).toHaveText("提交值：practice");
  await expect(page.getByText("请选择任务类型。", { exact: true })).toHaveCount(0);
  await page.goto("/#field");
  const form = page.getByRole("form", { name: "作业发布设置" });
  await expect(form.locator("select")).toHaveCount(0);
  const kind = form.getByRole("combobox", { name: "作业类型", exact: true });
  await kind.click();
  await page.getByRole("option", { name: "讨论任务", exact: true }).click();
  await expect(kind).toHaveText("讨论任务");
  expect(await form.evaluate(element => new FormData(element as HTMLFormElement).get("kind"))).toBe("discussion");
  await form.getByRole("button", { name: "保存设置", exact: true }).click();
  await expect(form.getByRole("status", { name: "作业保存结果" })).toContainText("设置已保存");
});
