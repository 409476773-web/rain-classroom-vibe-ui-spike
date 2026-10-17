# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-map-scope.spec.ts >> all 27 available provinces keep the range selector consistent with their actual map layer
- Location: tests/e2e/chart-business-map-scope.spec.ts:5:1

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByRole('combobox', { name: '地图查看范围' })
Expected: "370000"
Received: "national"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for getByRole('combobox', { name: '地图查看范围' })
    13 × locator resolved to <select aria-label="地图查看范围">…</select>
       - unexpected value "national"

```

```yaml
- combobox "地图查看范围":
  - option "全国" [selected]
  - option "广东省"
  - option "浙江省"
  - option "新疆维吾尔自治区"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { readFileSync } from "node:fs";
  3  | import { resolve } from "node:path";
  4  | 
  5  | test("all 27 available provinces keep the range selector consistent with their actual map layer", async ({ page }) => {
  6  |   const regions = JSON.parse(readFileSync(resolve("apps/playground/src/docs/components/chart-business/data/china/regions.json"), "utf8")) as { id: string; name: string; hasChildren: boolean; parentId: string | null }[];
  7  |   const provinces = regions.filter(region => region.hasChildren);
  8  |   expect(provinces).toHaveLength(27);
  9  |   await page.emulateMedia({ reducedMotion: "reduce" });
  10 |   await page.goto("/#chart-china");
  11 |   const scope = page.getByRole("combobox", { name: "地图查看范围" });
  12 |   await page.getByRole("button", { name: "山东省", exact: true }).press("Enter");
> 13 |   await expect(scope).toHaveValue("370000");
     |                       ^ Error: expect(locator).toHaveValue(expected) failed
  14 |   await expect(scope.locator("option")).toHaveCount(28);
  15 |   for (const province of provinces) {
  16 |     await scope.selectOption(province.id);
  17 |     const chart = page.locator(`[data-china-layer="${province.id}"]`);
  18 |     await expect(chart.getByRole("heading", { name: `${province.name} · 地区参与人数`, exact: true })).toBeVisible();
  19 |     await expect(chart.getByRole("list", { name: "地区列表" }).getByRole("button")).toHaveCount(regions.filter(region => region.parentId === province.id).length);
  20 |     await expect(scope).toHaveValue(province.id);
  21 |   }
  22 |   await page.getByRole("button", { name: "返回全国", exact: true }).click();
  23 |   await expect(scope).toHaveValue("national");
  24 | });
  25 | 
```