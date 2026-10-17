# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-map.spec.ts >> motion has intermediate drill and zoom frames; reduced motion reaches final state directly
- Location: tests/e2e/chart-business-map.spec.ts:242:1

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: locator.click: Test timeout of 45000ms exceeded.
Call log:
  - waiting for getByRole('option', { name: '全国', exact: true })
    - locator resolved to <option value="national">全国</option>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    16 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms
  - element was detached from the DOM, retrying
    - locator resolved to <option value="national">全国</option>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    10 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- main [ref=f1e3]:
  - generic [ref=f1e4]:
    - link "返回组件目录" [ref=f1e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=f1e7]:
      - heading "全国与省市下钻" [level=1] [ref=f1e8]
      - generic [ref=f1e9]: 业务配方 · 未发布 · 待视觉审阅
    - paragraph [ref=f1e10]: 从全国查看各省参与强度，再进入省内真实城市与省直管县级区域。边界有可追溯来源，统计与地区详情使用示例数据。
  - generic [ref=f1e11]:
    - generic [ref=f1e12]:
      - heading "全国 · 地区参与人数" [level=2] [ref=f1e13]
      - generic [ref=f1e14]: CH-117 · 示例数据
    - generic [ref=f1e15]:
      - generic [ref=f1e16]:
        - combobox "地图地区" [ref=f1e18] [cursor=pointer]:
          - generic "全国" [ref=f1e20]
        - generic [ref=f1e24]: 已选：全国
      - textbox [ref=f1e25]: national
    - generic [ref=f1e30]:
      - img [ref=f1e31]:
        - generic [ref=f1e33]:
          - generic [ref=f1e34] [cursor=pointer]
          - generic [ref=f1e35] [cursor=pointer]
          - generic [ref=f1e36] [cursor=pointer]
          - generic [ref=f1e37] [cursor=pointer]
          - generic [ref=f1e38] [cursor=pointer]
          - generic [ref=f1e39] [cursor=pointer]
          - generic [ref=f1e40] [cursor=pointer]
          - generic [ref=f1e41] [cursor=pointer]
          - generic [ref=f1e42] [cursor=pointer]
          - generic [ref=f1e43] [cursor=pointer]
          - generic [ref=f1e44] [cursor=pointer]
          - generic [ref=f1e45] [cursor=pointer]
          - generic [ref=f1e46] [cursor=pointer]
          - generic [ref=f1e47] [cursor=pointer]
          - generic [ref=f1e48] [cursor=pointer]
          - generic [ref=f1e49] [cursor=pointer]
          - generic [ref=f1e50] [cursor=pointer]
          - generic [ref=f1e51] [cursor=pointer]
          - generic [ref=f1e52] [cursor=pointer]
          - generic [ref=f1e53] [cursor=pointer]
          - generic [ref=f1e54] [cursor=pointer]
          - generic [ref=f1e55] [cursor=pointer]
          - generic [ref=f1e56] [cursor=pointer]
          - generic [ref=f1e57] [cursor=pointer]
          - generic [ref=f1e58] [cursor=pointer]
          - generic [ref=f1e59] [cursor=pointer]
          - generic [ref=f1e60] [cursor=pointer]
          - generic [ref=f1e61] [cursor=pointer]
          - generic [ref=f1e62] [cursor=pointer]
          - generic [ref=f1e63] [cursor=pointer]
          - generic [ref=f1e64] [cursor=pointer]
          - generic [ref=f1e65] [cursor=pointer]
          - generic [ref=f1e66] [cursor=pointer]
          - generic [ref=f1e67] [cursor=pointer]
      - group "地图视图工具" [ref=f1e68]:
        - button "放大地图" [ref=f1e69] [cursor=pointer]
        - button "缩小地图" [disabled] [ref=f1e72]
        - button "恢复地图视图" [disabled] [ref=f1e75]
    - group "参与人数色阶，0到300人，另有无数据" [ref=f1e78]:
      - generic [ref=f1e79]: 全国范围
      - generic [ref=f1e80]: 0 人
      - generic [ref=f1e87]: 300 人
      - generic [ref=f1e88]: 无数据
    - paragraph [ref=f1e91]: 指向地区查看人数，点击省份进入省内，点击城市保留读数。
    - generic [ref=f1e92]:
      - generic [ref=f1e93]: 边界来源
      - link "HDX/OCHA （新标签页打开）" [ref=f1e94] [cursor=pointer]:
        - /url: https://data.humdata.org/dataset/cod-ab-chn
        - generic [ref=f1e95]: HDX/OCHA
        - generic [ref=f1e96]: （新标签页打开）
      - text: ·
      - link "CC BY 3.0 IGO （新标签页打开）" [ref=f1e97] [cursor=pointer]:
        - /url: https://creativecommons.org/licenses/by/3.0/igo/
        - generic [ref=f1e98]: CC BY 3.0 IGO
        - generic [ref=f1e99]: （新标签页打开）
      - text: /
      - link "© OpenStreetMap contributors （新标签页打开）" [ref=f1e100] [cursor=pointer]:
        - /url: https://www.openstreetmap.org/copyright
        - generic [ref=f1e101]: © OpenStreetMap contributors
        - generic [ref=f1e102]: （新标签页打开）
      - text: ·
      - link "ODbL （新标签页打开）" [ref=f1e103] [cursor=pointer]:
        - /url: https://opendatacommons.org/licenses/odbl/1-0/
        - generic [ref=f1e104]: ODbL
        - generic [ref=f1e105]: （新标签页打开）
    - group [ref=f1e106]:
      - generic "查看精确数据" [ref=f1e107] [cursor=pointer]
    - group [ref=f1e108]:
      - generic "边界与统计说明" [ref=f1e109] [cursor=pointer]
  - group [ref=f1e110]:
    - generic "体验不同数据状态与配色" [ref=f1e111]
    - option "全国" [selected]
    - option "河北省"
    - option "山西省"
    - option "内蒙古自治区"
    - option "辽宁省"
    - option "吉林省"
    - option "黑龙江省"
    - option "江苏省"
    - option "浙江省"
    - option "安徽省"
    - option "福建省"
    - option "江西省"
    - option "山东省"
    - option "河南省"
    - option "湖北省"
    - option "湖南省"
    - option "广东省"
    - option "广西壮族自治区"
    - option "海南省"
    - option "四川省"
    - option "贵州省"
    - option "云南省"
    - option "西藏自治区"
    - option "陕西省"
    - option "甘肃省"
    - option "青海省"
    - option "宁夏回族自治区"
    - option "新疆维吾尔自治区"
    - option "正常" [selected]
    - option "全部为零"
    - option "全部缺测"
    - option "无效数值"
    - option "未匹配统计ID"
    - option "模拟加载失败"
    - option "蓝灰单色" [selected]
    - option "紫蓝强度"
  - group [ref=f1e112]:
    - generic "中国地图配置、完整源码与边界数据" [ref=f1e113] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | 
  4   | test.use({ hasTouch: true });
  5   | const evidence = "evidence/runtime/chart-china-selector-feedback-2026-10-10/browser";
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
  20  |   if (!(await page.getByRole("listbox", { name: "选项" }).isVisible())) await layer(page).getByRole("combobox", { name: "地图地区", exact: true }).click();
  21  | }
  22  | async function choose(page: Page, name: string, key?: string) {
  23  |   await picker(page);
  24  |   const option = page.getByRole("option", { name, exact: true });
  25  |   if (key) {
  26  |     const search = page.getByRole("combobox", { name: "搜索选项" });
  27  |     await search.fill(name); await search.press("Enter");
> 28  |   } else await option.click();
      |                       ^ Error: locator.click: Test timeout of 45000ms exceeded.
  29  | }
  30  | async function expectTooltip(container: Locator, title: string, value?: string) {
  31  |   const tooltip = container.locator(".rain-chart-tooltip");
  32  |   await expect(tooltip).toBeVisible();
  33  |   await expect(tooltip).toContainText(title);
  34  |   if (value) await expect(tooltip).toContainText(value);
  35  |   await expect.poll(() => tooltip.evaluate(node => {
  36  |     const b = node.getBoundingClientRect();
  37  |     return b.left >= 0 && b.top >= 0 && b.right <= window.innerWidth && b.bottom <= window.innerHeight;
  38  |   })).toBe(true);
  39  | }
  40  | async function fillPoint(path: Locator) {
  41  |   await expect(path).toBeVisible();
  42  |   await path.scrollIntoViewIfNeeded();
  43  |   return path.evaluate(async element => {
  44  |     await Promise.all(element.closest("svg")!.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => undefined)));
  45  |     const path = element as SVGPathElement, box = path.getBBox(), matrix = path.getScreenCTM()!;
  46  |     for (const y of [.5, .4, .6, .3, .7, .2, .8, .1, .9]) for (const x of [.5, .4, .6, .3, .7, .2, .8, .1, .9]) {
  47  |       const point = new DOMPoint(box.x + box.width * x, box.y + box.height * y);
  48  |       if (path.isPointInFill(point)) {
  49  |         const screen = point.matrixTransform(matrix), hit = document.elementFromPoint(screen.x, screen.y);
  50  |         if (hit?.closest("[data-feature-id]")?.getAttribute("data-feature-id") === path.getAttribute("data-feature-id")) return { x: screen.x, y: screen.y };
  51  |       }
  52  |     }
  53  |     throw new Error("No actual filled point in the region polygon");
  54  |   });
  55  | }
  56  | 
  57  | 
  58  | for (const motion of ["no-preference", "reduce"] as const) {
  59  |   test(`${motion}: compact tools, stable scale/readings, keyboard drill and saved national view`, async ({ page }) => {
  60  |     const errors: string[] = [];
  61  |     page.on("pageerror", error => errors.push(error.message));
  62  |     await page.emulateMedia({ reducedMotion: motion });
  63  |     await page.goto("/#chart-china");
  64  |     await settle(page, 34);
  65  |     await mkdir(evidence, { recursive: true });
  66  |     await expect(page.getByRole("listbox", { name: "选项" })).not.toBeVisible();
  67  |     const tools = layer(page).getByRole("group", { name: "地图视图工具" });
  68  |     const sizes = await tools.getByRole("button").evaluateAll(nodes => nodes.map(node => ({ button: node.getBoundingClientRect().width, icon: node.querySelector(".rain-icon")!.getBoundingClientRect().width })));
  69  |     expect(sizes).toEqual(Array(3).fill({ button: 28, icon: 14 }));
  70  |     await expect(tools.getByRole("button", { name: "缩小地图" })).toBeDisabled();
  71  |     await expect(tools.getByRole("button", { name: "恢复地图视图" })).toBeDisabled();
  72  |     const original = await transform(page).getAttribute("transform");
  73  |     await tools.getByRole("button", { name: "放大地图" }).click();
  74  |     await expect.poll(() => transform(page).getAttribute("transform")).not.toBe(original);
  75  |     await tools.getByRole("button", { name: "缩小地图" }).click();
  76  |     await expect(transform(page)).toHaveAttribute("transform", original!);
  77  |     await tools.getByRole("button", { name: "放大地图" }).click();
  78  |     const saved = await transform(page).getAttribute("transform");
  79  |     const point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  80  |     const color = await active(page).locator('path[data-feature-id="440000"]').evaluate(node => getComputedStyle(node).fill);
  81  |     await page.mouse.move(point.x, point.y);
  82  |     await expectTooltip(layer(page), "广东省");
  83  |     expect(await active(page).locator('path[data-feature-id="440000"]').evaluate(node => getComputedStyle(node).fill)).toBe(color);
  84  |     await choose(page, "广东省", "Enter");
  85  |     await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
  86  |     await settle(page, 21);
  87  |     await expect(layer(page).getByRole("combobox", { name: "地图地区" })).toBeFocused();
  88  |     await choose(page, "深圳市", "Space");
  89  |     const detail = layer(page).getByRole("region", { name: "地区样本详情" });
  90  |     await expect(detail).toHaveAttribute("data-selected-region", "440300");
  91  |     await expect(active(page).locator('path[data-feature-id="440300"]')).toHaveAttribute("data-selected", "true");
  92  |     const domain = await layer(page).locator(".rain-china-scale").getAttribute("data-domain-max");
  93  |     await active(page).evaluate(node => node.setAttribute("data-retained", "true"));
  94  |     await demo(page);
  95  |     await page.getByRole("button", { name: "更新数据", exact: true }).click();
  96  |     await expect(detail).toContainText("37 人");
  97  |     await expect(active(page)).toHaveAttribute("data-retained", "true");
  98  |     await expect(layer(page).locator(".rain-china-scale")).toHaveAttribute("data-domain-max", domain!);
  99  |     await page.getByRole("combobox", { name: "地图图表配色" }).selectOption("intensity");
  100 |     await expect(active(page)).toHaveAttribute("data-retained", "true");
  101 |     await layer(page).getByText("查看精确数据", { exact: true }).click();
  102 |     await expect(layer(page).locator('[data-china-row="440300"]')).toContainText("37 人");
  103 |     await page.getByRole("combobox", { name: "地图图表配色" }).selectOption("monochrome-blue");
  104 |     await page.mouse.move(4, 4);
  105 |     await layer(page).screenshot({ path: `${evidence}/guangdong-detail-${motion}.png` });
  106 |     await choose(page, "全国", "Enter");
  107 |     await settle(page, 34);
  108 |     await expect(transform(page)).toHaveAttribute("transform", saved!);
  109 |     await expect(active(page).locator('path[data-feature-id="440000"]')).toHaveAttribute("data-selected", "true");
  110 |     await expect(layer(page).getByRole("combobox", { name: "地图地区" })).toBeFocused();
  111 |     await tools.getByRole("button", { name: "恢复地图视图" }).click();
  112 |     await expect(transform(page)).toHaveAttribute("transform", original!);
  113 |     await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  114 |     await expect(layer(page)).toHaveAttribute("data-revision", "1");
  115 |     await layer(page).screenshot({ path: `${evidence}/national-${motion}.png` });
  116 |     expect(errors).toEqual([]);
  117 |     await writeFile(`${evidence}/desktop-${motion}.json`, JSON.stringify({ sizes, saved, original, domain, errors }, null, 2));
  118 |   });
  119 | 
  120 |   test(`${motion}: 390px long names, direct counties, zero/missing, rejection and retry keep canvas stable`, async ({ page }) => {
  121 |     const errors: string[] = [];
  122 |     page.on("pageerror", error => errors.push(error.message));
  123 |     await page.emulateMedia({ reducedMotion: motion });
  124 |     await page.setViewportSize({ width: 390, height: 844 });
  125 |     await page.goto("/#chart-china");
  126 |     await settle(page, 34);
  127 |     await demo(page);
  128 |     await page.getByRole("combobox", { name: "地图查看范围" }).selectOption("650000");
```