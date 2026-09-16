import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

test.beforeEach(async ({ page }) => {
  page.on("pageerror", error => { throw error; });
  page.on("console", message => { if (message.type() === "error") throw new Error(message.text()); });
  await page.goto("/#bm-a");
  await expect(page.locator('[data-scenario="bm-a"]')).toBeVisible();
});

test("material scene density switches geometry without resetting the current view or selection", async ({ page }) => {
  for (const hash of ["#bm-a", "#materials"]) {
    await page.goto("about:blank");
    await page.goto(`/${hash}`);
    const compact = page.getByRole("checkbox", { name: "紧凑密度", exact: true });
    await expect(compact).toBeChecked();
    const geometry = () => page.locator("table").evaluate(table => ["thead tr", "tbody tr"].map(selector => table.querySelector(selector)!.getBoundingClientRect().height));
    await expect.poll(geometry).toEqual([32, 44]);
    const selected = page.getByRole("checkbox", { name: "选择 设计方法导论", exact: true });
    await selected.locator("..").click();
    await compact.locator("..").click();
    await expect.poll(geometry).toEqual([44, 50]);
    await expect(selected).toBeChecked();
    await page.getByRole("button", { name: "卡片视图", exact: true }).click();
    await compact.focus();
    await page.keyboard.press("Space");
    await expect(compact).toBeChecked();
    await expect(page.getByRole("button", { name: "卡片视图", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(selected).toBeChecked();
    await page.getByRole("button", { name: "表格视图", exact: true }).click();
    await expect.poll(geometry).toEqual([32, 44]);
  }
});

test("production BM-A keeps ID selection across pages and views and publishes only selected editable records", async ({ page }, info) => {
  const directory = resolve(process.env.RAIN_BMA_EVIDENCE_DIR ?? "/tmp/rain-bm-a-rn09/browser", info.project.name);
  mkdirSync(directory, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  const select = page.getByRole("checkbox", { name: "选择 教学案例研读", exact: true });
  await select.locator("..").click();
  await page.getByRole("button", { name: "下一页", exact: true }).click();
  await expect(page.getByText("含其他页 1 份", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  await page.getByRole("button", { name: "上一页", exact: true }).click();
  await expect(select).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "选择 课堂观察记录", exact: true })).toBeDisabled();
  await page.getByRole("button", { name: "标为已发布", exact: true }).click();
  await expect(page.getByRole("article", { name: "教学案例研读", exact: true }).getByText("已发布", { exact: true })).toBeVisible();
  await expect(page.getByRole("article", { name: "课程阅读清单", exact: true }).getByText("草稿", { exact: true })).toBeVisible();
  await expect(page.getByRole("article", { name: "课堂观察记录", exact: true }).getByText("草稿", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "刷新资料", exact: true }).click();
  await expect(page.getByRole("button", { name: "卡片视图", exact: true })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("资料已刷新");
  await expect(page.getByRole("article", { name: "教学案例研读", exact: true }).getByText("已发布", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "表格视图", exact: true }).click();
  await page.screenshot({ path: resolve(directory, "bm-a-table.png") });
  await page.getByRole("textbox", { name: "查找资料", exact: true }).fill("教学案例");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  await expect(page.locator('tbody tr')).toHaveCount(1);
  await expect(page.getByText("筛选结果 1 份", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "清空筛选", exact: true }).click();
  await expect(page.getByText("共 13 份资料", { exact: true })).toBeVisible();
});

test("production BM-A recovers from refresh failure and empty states with keyboard and narrow dark layout", async ({ page }, info) => {
  const directory = resolve(process.env.RAIN_BMA_EVIDENCE_DIR ?? "/tmp/rain-bm-a-rn09/browser", info.project.name);
  mkdirSync(directory, { recursive: true });
  await page.getByRole("button", { name: "卡片视图", exact: true }).click();
  await page.getByRole("checkbox", { name: "选择 设计方法导论", exact: true }).locator("..").click();
  await page.getByText("试用加载与空数据状态", { exact: true }).click();
  await page.getByRole("checkbox", { name: "下次刷新模拟失败", exact: true }).locator("..").click();
  await page.getByRole("button", { name: "刷新资料", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("刷新失败");
  await expect(page.getByRole("checkbox", { name: "选择 设计方法导论", exact: true })).toBeChecked();
  await page.getByRole("button", { name: "重试", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("资料已刷新");
  await expect(page.getByRole("alert")).toHaveCount(0);
  await page.getByRole("button", { name: "按资料名称排序", exact: true }).focus();
  await page.keyboard.press("ArrowDown");
  await page.getByRole("menuitemradio", { name: "资料名称 · 降序", exact: true }).click();
  await expect(page.getByRole("button", { name: "按资料名称排序", exact: true })).toContainText("降序");
  await page.getByRole("button", { name: "切换深色", exact: true }).click();
  await page.setViewportSize({ width: 390, height: 1000 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: resolve(directory, "bm-a-dark-cards.png") });
  await page.getByRole("textbox", { name: "查找资料", exact: true }).fill("不存在");
  await page.getByRole("button", { name: "搜索", exact: true }).click();
  await expect(page.getByRole("heading", { name: "没有找到相关资料", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "清空筛选", exact: true }).click();
  await page.getByRole("button", { name: "预览空数据", exact: true }).click();
  await expect(page.getByRole("heading", { name: "还没有课程资料", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "添加示例资料", exact: true }).click();
  await expect(page.getByText("共 13 份资料", { exact: true })).toBeVisible();
});
