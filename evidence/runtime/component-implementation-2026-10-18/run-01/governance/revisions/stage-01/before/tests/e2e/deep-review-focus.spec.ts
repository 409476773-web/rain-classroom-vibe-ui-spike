import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const evidence = "evidence/runtime/deep-review-fixes-2026-10-17/browser";

for (const [id, module, loading] of [
  ["slider", "g5-component-pages", "正在载入表单组件…"],
  ["drawer", "g6-interaction-pages", "正在载入交互组件…"],
] as const) {
  test(`first keyboard navigation focuses ${id} after its delayed document loads`, async ({ page }) => {
    let release!: () => void;
    const pending = new Promise<void>(resolve => { release = resolve; });
    await page.route(`**/${module}.tsx*`, async route => { await pending; await route.continue(); });
    await page.goto("/#components");
    const link = page.locator(`a[href="#${id}"]`).first();
    await link.focus();
    await page.keyboard.press("Enter");
    try { await expect(page.getByRole("status").filter({ hasText: loading })).toBeVisible(); }
    finally { release(); }
    await expect(page.locator(`#${id}-title`)).toBeFocused();
  });
}

test("a late document does not steal focus after leaving its route", async ({ page }) => {
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/g6-interaction-pages.tsx*", async route => { await pending; await route.continue(); });
  await page.goto("/#components");
  await page.locator('a[href="#drawer"]').first().focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status").filter({ hasText: "正在载入交互组件…" })).toBeVisible();
  await page.evaluate(() => { location.hash = "components"; });
  await expect(page.locator("#core-ui-title")).toBeFocused();
  release();
  await page.waitForLoadState("networkidle");
  await expect(page.locator("#core-ui-title")).toBeFocused();
});

test("Field shows local errors and focuses the first invalid field at desktop and narrow widths", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  mkdirSync(evidence, { recursive: true });
  await page.goto("/#field");
  const form = page.getByRole("form", { name: "作业发布设置" });
  const course = form.getByRole("combobox", { name: "所属课程" });
  const points = form.getByRole("spinbutton", { name: "满分" });
  await form.getByRole("button", { name: "清除所属课程" }).click();
  await points.fill("");
  await form.getByRole("button", { name: "保存设置" }).click();
  await expect(course).toBeFocused();
  await expect(course).toHaveAttribute("aria-invalid", "true");
  await expect(course).toHaveAccessibleDescription("请选择所属课程。");
  await expect(points).toHaveAccessibleDescription(/请输入 1–200 之间的整数满分。/);
  await form.screenshot({ path: `${evidence}/field-errors-desktop.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await form.screenshot({ path: `${evidence}/field-errors-narrow.png` });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
  await course.fill("人工智能");
  await page.getByRole("option", { name: /人工智能导论/ }).click();
  await form.getByRole("button", { name: "保存设置" }).click();
  await expect(points).toBeFocused();
  await points.fill("100");
  await form.getByRole("button", { name: "保存设置" }).click();
  await expect(form.getByRole("status", { name: "作业保存结果" })).toContainText("设置已保存");
  expect(errors).toEqual([]);
});
