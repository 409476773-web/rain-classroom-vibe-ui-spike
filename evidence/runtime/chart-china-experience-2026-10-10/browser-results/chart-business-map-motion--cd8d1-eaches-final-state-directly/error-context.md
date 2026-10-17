# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-map.spec.ts >> motion has intermediate drill and zoom frames; reduced motion reaches final state directly
- Location: tests/e2e/chart-business-map.spec.ts:239:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-china-layer]').locator('[data-map-active="true"]').locator('path[data-feature-id]').locator('xpath=self::path[@data-feature-id="440000"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-china-layer]').locator('[data-map-active="true"]').locator('path[data-feature-id]').locator('xpath=self::path[@data-feature-id="440000"]')

```

```yaml
- main:
  - link "返回组件目录":
    - /url: "#components"
  - heading "全国与省市下钻" [level=1]
  - text: 业务配方 · 未发布 · 待视觉审阅
  - paragraph: 从全国查看各省参与强度，再进入省内真实城市与省直管县级区域。边界有可追溯来源，统计与地区详情使用示例数据。
  - heading "全国 · 地区参与人数" [level=2]
  - text: CH-117 · 示例数据
  - navigation "当前地图层级":
    - list:
      - listitem: 全国
  - button "选择地区"
  - group "地图视图工具":
    - button "放大地图"
    - button "缩小地图" [disabled]
    - button "恢复地图视图" [disabled]
  - group "参与人数色阶，0到300人，另有无数据": 全国范围 0 人 300 人 无数据
  - paragraph: 指向地区查看人数，点击省份进入省内，点击城市保留读数。
  - text: 边界来源
  - link "HDX/OCHA （新标签页打开）":
    - /url: https://data.humdata.org/dataset/cod-ab-chn
  - text: ·
  - link "CC BY 3.0 IGO （新标签页打开）":
    - /url: https://creativecommons.org/licenses/by/3.0/igo/
  - text: /
  - link "© OpenStreetMap contributors （新标签页打开）":
    - /url: https://www.openstreetmap.org/copyright
  - text: ·
  - link "ODbL （新标签页打开）":
    - /url: https://opendatacommons.org/licenses/odbl/1-0/
  - group: 查看精确数据
  - group: 边界与统计说明
  - group: 体验不同数据状态与配色
  - group: 中国地图配置、完整源码与边界数据
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | 
  4   | test.use({ hasTouch: true });
  5   | const evidence = "evidence/runtime/chart-china-experience-2026-10-10/browser";
  6   | const layer = (page: Page) => page.locator("[data-china-layer]");
  7   | const active = (page: Page) => layer(page).locator('[data-map-active="true"]');
  8   | const paths = (page: Page) => active(page).locator("path[data-feature-id]");
  9   | const transform = (page: Page) => active(page).locator('svg > g[transform^="matrix"]').first();
  10  | async function settle(page: Page, count: number) {
  11  |   await expect(paths(page)).toHaveCount(count);
  12  |   await expect(active(page)).toHaveCSS("opacity", "1");
  13  |   await expect(active(page)).toHaveCSS("transform", "none");
  14  | }
  15  | async function demo(page: Page) {
  16  |   const section = page.locator(".rain-china-demo");
  17  |   if (await section.getAttribute("open") == null) await section.locator("summary").click();
  18  | }
  19  | async function picker(page: Page) {
  20  |   if (!(await page.getByRole("list", { name: "地区列表" }).isVisible())) await layer(page).getByRole("button", { name: "选择地区", exact: true }).click();
  21  | }
  22  | async function choose(page: Page, name: string, key?: string) {
  23  |   await picker(page);
  24  |   const button = page.getByRole("button", { name, exact: true });
  25  |   if (key) await button.press(key); else await button.click();
  26  | }
  27  | async function expectTooltip(container: Locator, title: string, value?: string) {
  28  |   const tooltip = container.locator(".rain-chart-tooltip");
  29  |   await expect(tooltip).toBeVisible();
  30  |   await expect(tooltip).toContainText(title);
  31  |   if (value) await expect(tooltip).toContainText(value);
  32  |   await expect.poll(() => tooltip.evaluate(node => {
  33  |     const b = node.getBoundingClientRect();
  34  |     return b.left >= 0 && b.top >= 0 && b.right <= window.innerWidth && b.bottom <= window.innerHeight;
  35  |   })).toBe(true);
  36  | }
  37  | async function fillPoint(path: Locator) {
> 38  |   await expect(path).toBeVisible();
      |                      ^ Error: expect(locator).toBeVisible() failed
  39  |   await path.scrollIntoViewIfNeeded();
  40  |   return path.evaluate(async element => {
  41  |     await Promise.all(element.closest("svg")!.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => undefined)));
  42  |     const path = element as SVGPathElement, box = path.getBBox(), matrix = path.getScreenCTM()!;
  43  |     for (const y of [.5, .4, .6, .3, .7, .2, .8, .1, .9]) for (const x of [.5, .4, .6, .3, .7, .2, .8, .1, .9]) {
  44  |       const point = new DOMPoint(box.x + box.width * x, box.y + box.height * y);
  45  |       if (path.isPointInFill(point)) {
  46  |         const screen = point.matrixTransform(matrix), hit = document.elementFromPoint(screen.x, screen.y);
  47  |         if (hit?.closest("[data-feature-id]")?.getAttribute("data-feature-id") === path.getAttribute("data-feature-id")) return { x: screen.x, y: screen.y };
  48  |       }
  49  |     }
  50  |     throw new Error("No actual filled point in the region polygon");
  51  |   });
  52  | }
  53  | 
  54  | 
  55  | for (const motion of ["no-preference", "reduce"] as const) {
  56  |   test(`${motion}: compact tools, stable scale/readings, keyboard drill and saved national view`, async ({ page }) => {
  57  |     const errors: string[] = [];
  58  |     page.on("pageerror", error => errors.push(error.message));
  59  |     await page.emulateMedia({ reducedMotion: motion });
  60  |     await page.goto("/#chart-china");
  61  |     await settle(page, 34);
  62  |     await mkdir(evidence, { recursive: true });
  63  |     await expect(page.getByRole("list", { name: "地区列表" })).not.toBeVisible();
  64  |     const tools = layer(page).getByRole("group", { name: "地图视图工具" });
  65  |     const sizes = await tools.getByRole("button").evaluateAll(nodes => nodes.map(node => ({ button: node.getBoundingClientRect().width, icon: node.querySelector("svg")!.getBoundingClientRect().width })));
  66  |     expect(sizes).toEqual(Array(3).fill({ button: 28, icon: 14 }));
  67  |     await expect(tools.getByRole("button", { name: "缩小地图" })).toBeDisabled();
  68  |     await expect(tools.getByRole("button", { name: "恢复地图视图" })).toBeDisabled();
  69  |     const original = await transform(page).getAttribute("transform");
  70  |     await tools.getByRole("button", { name: "放大地图" }).click();
  71  |     await expect.poll(() => transform(page).getAttribute("transform")).not.toBe(original);
  72  |     await tools.getByRole("button", { name: "缩小地图" }).click();
  73  |     await expect(transform(page)).toHaveAttribute("transform", original!);
  74  |     await tools.getByRole("button", { name: "放大地图" }).click();
  75  |     const saved = await transform(page).getAttribute("transform");
  76  |     const point = await fillPoint(paths(page).locator('xpath=self::path[@data-feature-id="440000"]'));
  77  |     const color = await paths(page).locator('xpath=self::path[@data-feature-id="440000"]').evaluate(node => getComputedStyle(node).fill);
  78  |     await page.mouse.move(point.x, point.y);
  79  |     await expectTooltip(layer(page), "广东省");
  80  |     expect(await paths(page).locator('xpath=self::path[@data-feature-id="440000"]').evaluate(node => getComputedStyle(node).fill)).toBe(color);
  81  |     await choose(page, "广东省", "Enter");
  82  |     await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
  83  |     await settle(page, 21);
  84  |     await expect(page.locator('[aria-current="page"]').filter({ hasText: "广东省" })).toBeFocused();
  85  |     await choose(page, "深圳市", "Space");
  86  |     const detail = layer(page).getByRole("region", { name: "地区样本详情" });
  87  |     await expect(detail).toHaveAttribute("data-selected-region", "440300");
  88  |     await expect(paths(page).locator('xpath=self::path[@data-feature-id="440300"]')).toHaveAttribute("data-selected", "true");
  89  |     const domain = await layer(page).locator(".rain-china-scale").getAttribute("data-domain-max");
  90  |     await active(page).evaluate(node => node.setAttribute("data-retained", "true"));
  91  |     await demo(page);
  92  |     await page.getByRole("button", { name: "更新数据", exact: true }).click();
  93  |     await expect(detail).toContainText("37 人");
  94  |     await expect(active(page)).toHaveAttribute("data-retained", "true");
  95  |     await expect(layer(page).locator(".rain-china-scale")).toHaveAttribute("data-domain-max", domain!);
  96  |     await page.getByRole("combobox", { name: "地图图表配色" }).selectOption("intensity");
  97  |     await expect(active(page)).toHaveAttribute("data-retained", "true");
  98  |     await layer(page).getByText("查看精确数据", { exact: true }).click();
  99  |     await expect(layer(page).locator('[data-china-row="440300"]')).toContainText("37 人");
  100 |     await page.getByRole("combobox", { name: "地图图表配色" }).selectOption("monochrome-blue");
  101 |     await page.mouse.move(4, 4);
  102 |     await layer(page).screenshot({ path: `${evidence}/guangdong-detail-${motion}.png` });
  103 |     await layer(page).getByRole("link", { name: "返回全国" }).press("Enter");
  104 |     await settle(page, 34);
  105 |     await expect(transform(page)).toHaveAttribute("transform", saved!);
  106 |     await expect(paths(page).locator('xpath=self::path[@data-feature-id="440000"]')).toHaveAttribute("data-selected", "true");
  107 |     await expect(page.locator('[aria-current="page"]')).toBeFocused();
  108 |     await tools.getByRole("button", { name: "恢复地图视图" }).click();
  109 |     await expect(transform(page)).toHaveAttribute("transform", original!);
  110 |     await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  111 |     await expect(layer(page)).toHaveAttribute("data-revision", "1");
  112 |     await layer(page).screenshot({ path: `${evidence}/national-${motion}.png` });
  113 |     expect(errors).toEqual([]);
  114 |     await writeFile(`${evidence}/desktop-${motion}.json`, JSON.stringify({ sizes, saved, original, domain, errors }, null, 2));
  115 |   });
  116 | 
  117 |   test(`${motion}: 390px long names, direct counties, zero/missing, rejection and retry keep canvas stable`, async ({ page }) => {
  118 |     const errors: string[] = [];
  119 |     page.on("pageerror", error => errors.push(error.message));
  120 |     await page.emulateMedia({ reducedMotion: motion });
  121 |     await page.setViewportSize({ width: 390, height: 844 });
  122 |     await page.goto("/#chart-china");
  123 |     await settle(page, 34);
  124 |     await demo(page);
  125 |     await page.getByRole("combobox", { name: "地图查看范围" }).selectOption("650000");
  126 |     await settle(page, 26);
  127 |     await picker(page);
  128 |     await expect(page.getByRole("button", { name: "巴音郭楞蒙古自治州", exact: true })).toBeVisible();
  129 |     const popup = await page.locator(".rain-china-picker").boundingBox();
  130 |     expect(popup!.x).toBeGreaterThanOrEqual(0);
  131 |     expect(popup!.x + popup!.width).toBeLessThanOrEqual(390);
  132 |     await choose(page, "白杨市");
  133 |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("省直管县级");
  134 |     await layer(page).scrollIntoViewIfNeeded();
  135 |     await page.screenshot({ path: `${evidence}/xinjiang-390-${motion}.png`, fullPage: true });
  136 |     const height = (await layer(page).locator(".rain-china-canvas").boundingBox())!.height;
  137 |     await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("zero");
  138 |     await expect(layer(page).getByLabel(/参与人数色阶/)).toContainText("全部为 0");
```