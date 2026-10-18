import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 1100 });
  await page.goto("/#tabs");
  await page.evaluate(async url => (await import(url)).mountCompositionsFixture(), `/@fs${resolve("tests/e2e/css-composition.fixture.tsx")}`);
  await expect(page.getByRole("form", { name: "分区作业设置" })).toBeVisible();
});
test.afterEach(async ({ page }) => expect((await page.pageErrors()).map(error => error.message)).toEqual([]));

test("filters only on submit, resets draft and results, and uses a 32px control row", async ({ page }) => {
  const scope = page.getByRole("region", { name: "资源筛选组合" });
  await expect(scope.getByRole("status")).toHaveText("找到 3 项资源");
  await scope.getByRole("textbox", { name: "资源名称" }).fill("案例");
  await expect(scope.getByRole("status")).toHaveText("找到 3 项资源");
  await scope.getByRole("button", { name: "查询", exact: true }).click();
  await expect(scope.getByRole("status")).toHaveText("找到 2 项资源");
  await scope.getByRole("button", { name: "重置", exact: true }).click();
  await expect(scope.getByRole("textbox", { name: "资源名称" })).toHaveValue("");
  await expect(scope.getByRole("status")).toHaveText("找到 3 项资源");
  const dimensions = await scope.evaluate(root => ({
    input: root.querySelector('[data-rain-id="ui-input"]')!.getBoundingClientRect().height,
    select: root.querySelector('[data-rain-id="ui-select"] [data-slot="frame"]')!.getBoundingClientRect().height,
    buttons: [...root.querySelectorAll('button[type="submit"], button[type="button"][data-rain-id="ui-button"]')].map(node => node.getBoundingClientRect().height),
  }));
  expect(dimensions.input).toBe(32); expect(dimensions.select).toBe(32);
  expect(dimensions.buttons.every(height => height === 32)).toBe(true);
});

test("complete copied Field example associates course and numeric errors, focuses the first and preserves unrelated fields", async ({ page }) => {
  const form = page.getByRole("form", { name: "分区作业设置" });
  const course = form.getByRole("combobox", { name: "所属课程" });
  const points = form.getByRole("spinbutton", { name: "满分" });
  const submit = form.getByRole("button", { name: "保存设置" });
  await submit.click();
  await expect(course).toBeFocused(); await expect(course).toHaveAttribute("aria-invalid", "true");
  await expect(course).toHaveAccessibleDescription(/请选择所属课程/);
  await expect(points).toHaveAttribute("aria-invalid", "true");
  await expect(points).toHaveAccessibleDescription(/1–200/);
  await course.click(); await page.getByRole("option", { name: "人工智能导论", exact: true }).click();
  await expect(points).toHaveAttribute("aria-invalid", "true");
  await submit.click(); await expect(points).toBeFocused();
  await expect(form.getByRole("textbox", { name: "作业名称" })).toHaveValue("第五讲案例分析");
  await points.fill("100"); await submit.click();
  await expect(form.getByRole("status")).toContainText("已保存到当前页面，满分 100 分");
  expect(await points.evaluate(node => node.closest('[data-rain-id="ui-input-number"]')?.getBoundingClientRect().height ?? node.closest('.rain-input')!.getBoundingClientRect().height)).toBe(36);
  expect(await submit.evaluate(node => node.getBoundingClientRect().height)).toBe(36);
});

test("grading drafts follow task IDs, navigation does not save, and explicit save advances only after valid scoring", async ({ page }) => {
  const scope = page.getByRole("region", { name: "连续批改操作组合" });
  await scope.getByRole("button", { name: "保存并继续" }).click();
  await expect(scope.getByRole("heading")).toHaveText("学生甲 · 案例分析题");
  await expect(scope.getByRole("spinbutton", { name: "得分" })).toBeFocused();
  await scope.getByRole("spinbutton", { name: "得分" }).fill("12");
  await scope.getByRole("textbox", { name: "评语" }).fill("依据充分，补充比较即可。");
  await scope.getByRole("button", { name: "下一份", exact: true }).click();
  await expect(scope.getByRole("spinbutton", { name: "得分" })).toHaveValue("");
  await expect(scope.getByRole("status", { name: "批改保存结果" })).toHaveText("已保存 0 / 2 份评分。");
  await scope.getByRole("button", { name: "上一份", exact: true }).click();
  await expect(scope.getByRole("spinbutton", { name: "得分" })).toHaveValue("12");
  await expect(scope.getByRole("textbox", { name: "评语" })).toHaveValue("依据充分，补充比较即可。");
  await scope.getByRole("button", { name: "保存并继续" }).click();
  await expect(scope.getByRole("heading")).toHaveText("学生乙 · 案例分析题");
  await expect(scope.getByRole("status", { name: "批改保存结果" })).toContainText("学生甲的评分已保存");
  await scope.getByRole("spinbutton", { name: "得分" }).fill("16");
  await scope.getByRole("button", { name: "保存评分" }).click();
  await scope.getByRole("button", { name: "上一份", exact: true }).click();
  await expect(scope.getByRole("spinbutton", { name: "得分" })).toHaveValue("12");
  await expect(scope.getByRole("status", { name: "批改保存结果" })).toHaveText("已保存 2 / 2 份评分。");
  const output = evidenceOutputPath("evidence/runtime/deep-review-fixes-2026-10-17/composition"); mkdirSync(output, { recursive: true });
  await page.locator("#composition-verification").screenshot({ path: resolve(output, "desktop.png") });
  await page.setViewportSize({ width: 390, height: 900 });
  const overflow = await page.locator("#composition-verification").evaluate(node => ({ scroll: node.scrollWidth, client: node.clientWidth }));
  expect(overflow.scroll).toBeLessThanOrEqual(overflow.client);
  await page.locator("#composition-verification").screenshot({ path: resolve(output, "narrow.png") });
  writeFileSync(resolve(output, "layout.json"), `${JSON.stringify({ viewport: 390, overflow }, null, 2)}\n`);
});
