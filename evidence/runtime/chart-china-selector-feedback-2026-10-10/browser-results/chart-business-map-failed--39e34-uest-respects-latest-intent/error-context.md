# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-map.spec.ts >> failed drill retains national map, retry enters requested layer, late request respects latest intent
- Location: tests/e2e/chart-business-map.spec.ts:218:1

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('option', { name: '广东省', exact: true }) resolved to 2 elements:
    1) <option value="440000">广东省</option> aka getByLabel('地图查看范围').getByRole('option', { name: '广东省' })
    2) <div role="option" aria-label="广东省" data-focus="item" data-slot="option" id="base-ui-_r_2_-19" aria-selected="false" data-selected="false" class="rain-menu-item relative flex w-full min-w-rain-0 items-center gap-rain-10 rounded-rain-6 border-none px-rain-12 py-rain-6 text-left font-rain-ui text-rain-size-15 leading-rain-22 tracking-rain-default font-rain-regular no-underline cursor-pointer select-none outline-none">…</div> aka getByLabel('广东省')

Call log:
  - waiting for getByRole('option', { name: '广东省', exact: true })

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "全国与省市下钻" [level=1] [ref=e8]
      - generic [ref=e9]: 业务配方 · 未发布 · 待视觉审阅
    - paragraph [ref=e10]: 从全国查看各省参与强度，再进入省内真实城市与省直管县级区域。边界有可追溯来源，统计与地区详情使用示例数据。
  - generic [ref=e11]:
    - generic [ref=e12]:
      - heading "全国 · 地区参与人数" [level=2] [ref=e13]
      - generic [ref=e14]: CH-117 · 示例数据
    - generic [ref=e15]:
      - generic [ref=e16]:
        - combobox "地图地区" [expanded] [ref=e18] [cursor=pointer]:
          - generic "全国" [ref=e20]
        - generic [ref=e24]: 已选：全国
        - dialog [ref=e27]:
          - combobox "搜索选项" [expanded] [active] [ref=e32]
          - listbox "选项" [ref=e34]:
            - option "全国" [selected] [ref=e36] [cursor=pointer]
            - group "省级地区" [ref=e41]:
              - option "北京市" [ref=e43] [cursor=pointer]:
                - generic [ref=e44]:
                  - generic [ref=e45]: 北京市
                  - generic [ref=e46]: 直辖市
              - option "天津市" [ref=e48] [cursor=pointer]:
                - generic [ref=e49]:
                  - generic [ref=e50]: 天津市
                  - generic [ref=e51]: 直辖市
              - option "河北省" [ref=e53] [cursor=pointer]
              - option "山西省" [ref=e57] [cursor=pointer]
              - option "内蒙古自治区" [ref=e61] [cursor=pointer]
              - option "辽宁省" [ref=e65] [cursor=pointer]
              - option "吉林省" [ref=e69] [cursor=pointer]
              - option "黑龙江省" [ref=e73] [cursor=pointer]
              - option "上海市" [ref=e77] [cursor=pointer]:
                - generic [ref=e78]:
                  - generic [ref=e79]: 上海市
                  - generic [ref=e80]: 直辖市
              - option "江苏省" [ref=e82] [cursor=pointer]
              - option "浙江省" [ref=e86] [cursor=pointer]
              - option "安徽省" [ref=e90] [cursor=pointer]
              - option "福建省" [ref=e94] [cursor=pointer]
              - option "江西省" [ref=e98] [cursor=pointer]
              - option "山东省" [ref=e102] [cursor=pointer]
              - option "河南省" [ref=e106] [cursor=pointer]
              - option "湖北省" [ref=e110] [cursor=pointer]
              - option "湖南省" [ref=e114] [cursor=pointer]
              - option "广东省" [ref=e118] [cursor=pointer]
              - option "广西壮族自治区" [ref=e122] [cursor=pointer]
              - option "海南省" [ref=e126] [cursor=pointer]
              - option "重庆市" [ref=e130] [cursor=pointer]:
                - generic [ref=e131]:
                  - generic [ref=e132]: 重庆市
                  - generic [ref=e133]: 直辖市
              - option "四川省" [ref=e135] [cursor=pointer]
              - option "贵州省" [ref=e139] [cursor=pointer]
              - option "云南省" [ref=e143] [cursor=pointer]
              - option "西藏自治区" [ref=e147] [cursor=pointer]
              - option "陕西省" [ref=e151] [cursor=pointer]
              - option "甘肃省" [ref=e155] [cursor=pointer]
              - option "青海省" [ref=e159] [cursor=pointer]
              - option "宁夏回族自治区" [ref=e163] [cursor=pointer]
              - option "新疆维吾尔自治区" [ref=e167] [cursor=pointer]
              - option "台湾省" [ref=e171] [cursor=pointer]:
                - generic [ref=e172]:
                  - generic [ref=e173]: 台湾省
                  - generic [ref=e174]: 当前来源无下级地图
              - option "香港特别行政区" [ref=e176] [cursor=pointer]:
                - generic [ref=e177]:
                  - generic [ref=e178]: 香港特别行政区
                  - generic [ref=e179]: 当前来源无下级地图
              - option "澳门特别行政区" [ref=e181] [cursor=pointer]:
                - generic [ref=e182]:
                  - generic [ref=e183]: 澳门特别行政区
                  - generic [ref=e184]: 当前来源无下级地图
      - textbox [ref=e188]: national
    - generic [ref=e193]:
      - img [ref=e194]:
        - generic [ref=e196]:
          - generic [ref=e197] [cursor=pointer]
          - generic [ref=e198] [cursor=pointer]
          - generic [ref=e199] [cursor=pointer]
          - generic [ref=e200] [cursor=pointer]
          - generic [ref=e201] [cursor=pointer]
          - generic [ref=e202] [cursor=pointer]
          - generic [ref=e203] [cursor=pointer]
          - generic [ref=e204] [cursor=pointer]
          - generic [ref=e205] [cursor=pointer]
          - generic [ref=e206] [cursor=pointer]
          - generic [ref=e207] [cursor=pointer]
          - generic [ref=e208] [cursor=pointer]
          - generic [ref=e209] [cursor=pointer]
          - generic [ref=e210] [cursor=pointer]
          - generic [ref=e211] [cursor=pointer]
          - generic [ref=e212] [cursor=pointer]
          - generic [ref=e213] [cursor=pointer]
          - generic [ref=e214] [cursor=pointer]
          - generic [ref=e215] [cursor=pointer]
          - generic [ref=e216] [cursor=pointer]
          - generic [ref=e217] [cursor=pointer]
          - generic [ref=e218] [cursor=pointer]
          - generic [ref=e219] [cursor=pointer]
          - generic [ref=e220] [cursor=pointer]
          - generic [ref=e221] [cursor=pointer]
          - generic [ref=e222] [cursor=pointer]
          - generic [ref=e223] [cursor=pointer]
          - generic [ref=e224] [cursor=pointer]
          - generic [ref=e225] [cursor=pointer]
          - generic [ref=e226] [cursor=pointer]
          - generic [ref=e227] [cursor=pointer]
          - generic [ref=e228] [cursor=pointer]
          - generic [ref=e229] [cursor=pointer]
          - generic [ref=e230] [cursor=pointer]
      - group "地图视图工具" [ref=e231]:
        - button "放大地图" [ref=e232] [cursor=pointer]
        - button "缩小地图" [disabled] [ref=e235]
        - button "恢复地图视图" [disabled] [ref=e238]
    - group "参与人数色阶，0到300人，另有无数据" [ref=e241]:
      - generic [ref=e242]: 全国范围
      - generic [ref=e243]: 0 人
      - generic [ref=e250]: 300 人
      - generic [ref=e251]: 无数据
    - paragraph [ref=e254]: 指向地区查看人数，点击省份进入省内，点击城市保留读数。
    - generic [ref=e255]:
      - generic [ref=e256]: 边界来源
      - link "HDX/OCHA （新标签页打开）" [ref=e257] [cursor=pointer]:
        - /url: https://data.humdata.org/dataset/cod-ab-chn
        - generic [ref=e258]: HDX/OCHA
        - generic [ref=e259]: （新标签页打开）
      - text: ·
      - link "CC BY 3.0 IGO （新标签页打开）" [ref=e260] [cursor=pointer]:
        - /url: https://creativecommons.org/licenses/by/3.0/igo/
        - generic [ref=e261]: CC BY 3.0 IGO
        - generic [ref=e262]: （新标签页打开）
      - text: /
      - link "© OpenStreetMap contributors （新标签页打开）" [ref=e263] [cursor=pointer]:
        - /url: https://www.openstreetmap.org/copyright
        - generic [ref=e264]: © OpenStreetMap contributors
        - generic [ref=e265]: （新标签页打开）
      - text: ·
      - link "ODbL （新标签页打开）" [ref=e266] [cursor=pointer]:
        - /url: https://opendatacommons.org/licenses/odbl/1-0/
        - generic [ref=e267]: ODbL
        - generic [ref=e268]: （新标签页打开）
    - group [ref=e269]:
      - generic "查看精确数据" [ref=e270] [cursor=pointer]
    - group [ref=e271]:
      - generic "边界与统计说明" [ref=e272] [cursor=pointer]
  - group [ref=e273]:
    - generic "体验不同数据状态与配色" [ref=e274]
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
  - group [ref=e275]:
    - generic "中国地图配置、完整源码与边界数据" [ref=e276] [cursor=pointer]
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
      |                       ^ Error: locator.click: Error: strict mode violation: getByRole('option', { name: '广东省', exact: true }) resolved to 2 elements:
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