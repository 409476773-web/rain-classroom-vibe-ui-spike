import { expect, test } from "@playwright/test";

const route = (params: string) => `/#token-first-g3?rebuild=1&${params}`;

test("platform filters with the shared Select and Table, with one search focus treatment", async ({ page }) => {
  await page.goto(route("scene=platform&page=exams&recipe=S02&view=page&count=4"));
  await expect(page.locator('.nr-page-content [data-rain-id="ui-table"]')).toBeVisible();
  const status = page.locator('.nr-page-content [data-rain-id="ui-select"]');
  await expect(status).toBeVisible();
  await status.locator('[data-slot="control"]').click();
  await page.getByRole("option", { name: "进行中" }).click();
  await expect(page.locator('.nr-page-content [data-rain-id="ui-table"] tbody tr')).toHaveCount(10);
  const search = page.getByRole("textbox", { name: "搜索考试" });
  await search.focus();
  expect(await search.evaluate(element => getComputedStyle(element).outlineStyle)).toBe("none");
  await search.fill("不存在的考试");
  await expect(page.locator('.nr-page-content [data-rain-id="ui-empty"]')).toBeVisible();
});

test("course fixtures and class pages use shared selection and pagination", async ({ page }) => {
  await page.goto(route("scene=course&page=course-content&recipe=S05&course=math&scope=package&view=page&count=4"));
  await page.getByRole("button", { name: "课程测试", exact: true }).click();
  const count = page.locator('.nr-course-test-panel [data-rain-id="ui-select"]');
  await expect(count).toBeVisible();
  await count.locator('[data-slot="control"]').click();
  await page.getByRole("option", { name: "200", exact: true }).click();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "全部班级" }).click();
  await expect(page.locator('.nr-class-popup [data-rain-id="ui-pagination"]')).toBeVisible();
});

test("unit drafts and command notes use the shared Textarea", async ({ page }) => {
  await page.goto(route("scene=course&page=course-content&recipe=S05&course=math&scope=package&unit=unit-source-01&view=page&count=4"));
  await expect(page.locator('.nr-unit-editor [data-rain-id="ui-textarea"]')).toBeVisible();
  await page.goto(route("scene=commands&page=exams&recipe=M01&view=page&count=4"));
  await expect(page.locator('.nr-command-workbench [data-rain-id="ui-textarea"]')).toHaveCount(2);
});

test("unfamiliar equipment page uses shared empty and reservation feedback", async ({ page }) => {
  await page.goto(route("scene=lab&view=page"));
  await page.getByRole("textbox", { name: "搜索设备" }).fill("不存在的设备");
  await expect(page.locator('.nr-lab [data-rain-id="ui-empty"]')).toBeVisible();
  await page.getByRole("textbox", { name: "搜索设备" }).fill("光谱");
  await page.getByRole("button", { name: "查看 紫外可见分光光度计" }).click();
  await page.getByRole("button", { name: "确认预约" }).click();
  await expect(page.locator('.nr-lab [role="status"] [data-rain-id="ui-alert"]')).toContainText("已预约");
});
