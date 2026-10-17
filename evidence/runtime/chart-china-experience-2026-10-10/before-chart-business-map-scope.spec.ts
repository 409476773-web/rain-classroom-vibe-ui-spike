import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

test("all 27 available provinces keep the range selector consistent with their actual map layer", async ({ page }) => {
  const regions = JSON.parse(readFileSync(resolve("apps/playground/src/docs/components/chart-business/data/china/regions.json"), "utf8")) as { id: string; name: string; hasChildren: boolean; parentId: string | null }[];
  const provinces = regions.filter(region => region.hasChildren);
  expect(provinces).toHaveLength(27);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-china");
  const scope = page.getByRole("combobox", { name: "地图查看范围" });
  await page.getByRole("button", { name: "山东省", exact: true }).press("Enter");
  await expect(scope).toHaveValue("370000");
  await expect(scope.locator("option")).toHaveCount(28);
  for (const province of provinces) {
    await scope.selectOption(province.id);
    const chart = page.locator(`[data-china-layer="${province.id}"]`);
    await expect(chart.getByRole("heading", { name: `${province.name} · 地区参与人数`, exact: true })).toBeVisible();
    await expect(chart.getByRole("list", { name: "地区列表" }).getByRole("button")).toHaveCount(regions.filter(region => region.parentId === province.id).length);
    await expect(scope).toHaveValue(province.id);
  }
  await page.getByRole("button", { name: "返回全国", exact: true }).click();
  await expect(scope).toHaveValue("national");
});
