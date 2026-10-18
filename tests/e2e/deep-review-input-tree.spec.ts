import { expect, test } from "@playwright/test";

test("native reset restores Input and SearchInput without changing controlled or cancelled fields", async ({ page }) => {
  await page.goto("/#input");
  await page.evaluate(async (fixturePath) => (await import(fixturePath)).mountResetFixture(),
    `/@fs${new URL("./deep-review-input-tree.fixture.tsx", import.meta.url).pathname}`);
  const title = page.getByRole("textbox", { name: "重置课程", exact: true });
  const query = page.getByRole("textbox", { name: "重置搜索" });
  const external = page.getByRole("textbox", { name: "外部课程" });
  await title.fill("新课程名称");
  await query.fill("新搜索词");
  await external.fill("外部新值");
  const immediate = await page.locator("#reset-owner").evaluate((node) => {
    const form = node as HTMLFormElement;
    form.reset();
    return Object.fromEntries(new FormData(form));
  });
  expect(immediate).toEqual({ title: "原值", query: "", controlled: "宿主值", external: "外部原值" });
  await expect(title).toHaveValue("原值");
  await expect(query).toHaveValue("");
  await expect(external).toHaveValue("外部原值");
  await expect(title.locator("xpath=..").locator('[data-slot="count"]')).toHaveText("2");
  await expect(query.locator("xpath=..").locator('[data-slot="count"]')).toHaveText("0");
  await expect(page.getByRole("button", { name: "清除重置搜索" })).toHaveCount(0);
  await title.fill("再次编辑");
  await page.getByRole("button", { name: "原生重置" }).click();
  await expect(title).toHaveValue("原值");
  await page.getByRole("textbox", { name: "取消重置课程" }).fill("取消后保留");
  await page.getByRole("button", { name: "取消重置", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "取消重置课程" })).toHaveValue("取消后保留");
  await expect(page.getByRole("textbox", { name: "受控课程" })).toHaveValue("宿主值");
});

for (const controlled of [false, true]) test(`root StrictMode restarts initial ${controlled ? "controlled" : "default"} Tree loading`, async ({ page }) => {
  await page.goto("/#tree");
  await page.evaluate(async ({ fixturePath, controlled }) => (await import(fixturePath)).mountTreeFixture(controlled),
    { fixturePath: `/@fs${new URL("./deep-review-input-tree.fixture.tsx", import.meta.url).pathname}`, controlled });
  await expect(page.locator("#strict-tree-fixture")).toHaveAttribute("data-requests", "[true,false]");
  await page.getByRole("button", { name: "完成旧请求" }).click();
  await expect(page.getByRole("treeitem", { name: "过期节点" })).toHaveCount(0);
  await page.getByRole("button", { name: "完成当前请求" }).click();
  await expect(page.getByRole("treeitem", { name: "有效节点" })).toBeVisible();
  await expect(page.getByText("加载中…", { exact: true })).toHaveCount(0);
});
