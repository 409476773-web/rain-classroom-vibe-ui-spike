# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-map.spec.ts >> no-preference: 390px long names, direct counties, zero/missing, rejection and retry keep canvas stable
- Location: tests/e2e/chart-business-map.spec.ts:120:3

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('option', { name: '全国', exact: true }) resolved to 2 elements:
    1) <option value="national">全国</option> aka getByLabel('地图查看范围')
    2) <div role="option" aria-label="全国" data-focus="item" data-slot="option" id="base-ui-_r_2_-0" aria-selected="false" data-selected="false" class="rain-menu-item relative flex w-full min-w-rain-0 items-center gap-rain-10 rounded-rain-6 border-none px-rain-12 py-rain-6 text-left font-rain-ui text-rain-size-15 leading-rain-22 tracking-rain-default font-rain-regular no-underline cursor-pointer select-none outline-none">…</div> aka getByLabel('全国')

Call log:
  - waiting for getByRole('option', { name: '全国', exact: true })

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
      - heading "新疆维吾尔自治区 · 地区参与人数" [level=2] [ref=e13]
      - generic [ref=e14]: CH-117 · 示例数据
    - generic [ref=e15]:
      - generic [ref=e16]:
        - combobox "地图地区" [expanded] [ref=e18] [cursor=pointer]:
          - generic "白杨市" [ref=e20]
        - generic [ref=e24]: 已选：白杨市
        - dialog [ref=e27]:
          - combobox "搜索选项" [expanded] [active] [ref=e32]
          - listbox "选项" [ref=e34]:
            - option "全国" [ref=e36] [cursor=pointer]
            - group "新疆维吾尔自治区 · 城市与地区" [ref=e40]:
              - option "乌鲁木齐市" [ref=e42] [cursor=pointer]
              - option "克拉玛依市" [ref=e46] [cursor=pointer]
              - option "吐鲁番市" [ref=e50] [cursor=pointer]
              - option "哈密市" [ref=e54] [cursor=pointer]
              - option "昌吉回族自治州" [ref=e58] [cursor=pointer]
              - option "博尔塔拉蒙古自治州" [ref=e62] [cursor=pointer]
              - option "巴音郭楞蒙古自治州" [ref=e66] [cursor=pointer]
              - option "阿克苏地区" [ref=e70] [cursor=pointer]
              - option "克孜勒苏柯尔克孜自治州" [ref=e74] [cursor=pointer]
              - option "喀什地区" [ref=e78] [cursor=pointer]
              - option "和田地区" [ref=e82] [cursor=pointer]
              - option "伊犁哈萨克自治州" [ref=e86] [cursor=pointer]
              - option "塔城地区" [ref=e90] [cursor=pointer]
              - option "阿勒泰地区" [ref=e94] [cursor=pointer]
              - option "石河子市" [ref=e98] [cursor=pointer]:
                - generic [ref=e99]:
                  - generic [ref=e100]: 石河子市
                  - generic [ref=e101]: 省直管县级
              - option "阿拉尔市" [ref=e103] [cursor=pointer]:
                - generic [ref=e104]:
                  - generic [ref=e105]: 阿拉尔市
                  - generic [ref=e106]: 省直管县级
              - option "图木舒克市" [ref=e108] [cursor=pointer]:
                - generic [ref=e109]:
                  - generic [ref=e110]: 图木舒克市
                  - generic [ref=e111]: 省直管县级
              - option "五家渠市" [ref=e113] [cursor=pointer]:
                - generic [ref=e114]:
                  - generic [ref=e115]: 五家渠市
                  - generic [ref=e116]: 省直管县级
              - option "北屯市" [ref=e118] [cursor=pointer]:
                - generic [ref=e119]:
                  - generic [ref=e120]: 北屯市
                  - generic [ref=e121]: 省直管县级
              - option "铁门关市" [ref=e123] [cursor=pointer]:
                - generic [ref=e124]:
                  - generic [ref=e125]: 铁门关市
                  - generic [ref=e126]: 省直管县级
              - option "双河市" [ref=e128] [cursor=pointer]:
                - generic [ref=e129]:
                  - generic [ref=e130]: 双河市
                  - generic [ref=e131]: 省直管县级
              - option "可克达拉市" [ref=e133] [cursor=pointer]:
                - generic [ref=e134]:
                  - generic [ref=e135]: 可克达拉市
                  - generic [ref=e136]: 省直管县级
              - option "昆玉市" [ref=e138] [cursor=pointer]:
                - generic [ref=e139]:
                  - generic [ref=e140]: 昆玉市
                  - generic [ref=e141]: 省直管县级
              - option "胡杨河市" [ref=e143] [cursor=pointer]:
                - generic [ref=e144]:
                  - generic [ref=e145]: 胡杨河市
                  - generic [ref=e146]: 省直管县级
              - option "新星市" [ref=e148] [cursor=pointer]:
                - generic [ref=e149]:
                  - generic [ref=e150]: 新星市
                  - generic [ref=e151]: 省直管县级
              - option "白杨市" [selected] [ref=e153] [cursor=pointer]:
                - generic [ref=e154]:
                  - generic [ref=e155]: 白杨市
                  - generic [ref=e156]: 省直管县级
            - group "省级地区" [ref=e159]:
              - option "北京市" [ref=e161] [cursor=pointer]:
                - generic [ref=e162]:
                  - generic [ref=e163]: 北京市
                  - generic [ref=e164]: 直辖市
              - option "天津市" [ref=e166] [cursor=pointer]:
                - generic [ref=e167]:
                  - generic [ref=e168]: 天津市
                  - generic [ref=e169]: 直辖市
              - option "河北省" [ref=e171] [cursor=pointer]
              - option "山西省" [ref=e175] [cursor=pointer]
              - option "内蒙古自治区" [ref=e179] [cursor=pointer]
              - option "辽宁省" [ref=e183] [cursor=pointer]
              - option "吉林省" [ref=e187] [cursor=pointer]
              - option "黑龙江省" [ref=e191] [cursor=pointer]
              - option "上海市" [ref=e195] [cursor=pointer]:
                - generic [ref=e196]:
                  - generic [ref=e197]: 上海市
                  - generic [ref=e198]: 直辖市
              - option "江苏省" [ref=e200] [cursor=pointer]
              - option "浙江省" [ref=e204] [cursor=pointer]
              - option "安徽省" [ref=e208] [cursor=pointer]
              - option "福建省" [ref=e212] [cursor=pointer]
              - option "江西省" [ref=e216] [cursor=pointer]
              - option "山东省" [ref=e220] [cursor=pointer]
              - option "河南省" [ref=e224] [cursor=pointer]
              - option "湖北省" [ref=e228] [cursor=pointer]
              - option "湖南省" [ref=e232] [cursor=pointer]
              - option "广东省" [ref=e236] [cursor=pointer]
              - option "广西壮族自治区" [ref=e240] [cursor=pointer]
              - option "海南省" [ref=e244] [cursor=pointer]
              - option "重庆市" [ref=e248] [cursor=pointer]:
                - generic [ref=e249]:
                  - generic [ref=e250]: 重庆市
                  - generic [ref=e251]: 直辖市
              - option "四川省" [ref=e253] [cursor=pointer]
              - option "贵州省" [ref=e257] [cursor=pointer]
              - option "云南省" [ref=e261] [cursor=pointer]
              - option "西藏自治区" [ref=e265] [cursor=pointer]
              - option "陕西省" [ref=e269] [cursor=pointer]
              - option "甘肃省" [ref=e273] [cursor=pointer]
              - option "青海省" [ref=e277] [cursor=pointer]
              - option "宁夏回族自治区" [ref=e281] [cursor=pointer]
              - option "新疆维吾尔自治区" [ref=e285] [cursor=pointer]
              - option "台湾省" [ref=e289] [cursor=pointer]:
                - generic [ref=e290]:
                  - generic [ref=e291]: 台湾省
                  - generic [ref=e292]: 当前来源无下级地图
              - option "香港特别行政区" [ref=e294] [cursor=pointer]:
                - generic [ref=e295]:
                  - generic [ref=e296]: 香港特别行政区
                  - generic [ref=e297]: 当前来源无下级地图
              - option "澳门特别行政区" [ref=e299] [cursor=pointer]:
                - generic [ref=e300]:
                  - generic [ref=e301]: 澳门特别行政区
                  - generic [ref=e302]: 当前来源无下级地图
      - textbox [ref=e306]: "659012"
    - generic [ref=e311]:
      - img [ref=e312]:
        - generic [ref=e314]:
          - generic [ref=e315] [cursor=pointer]
          - generic [ref=e316] [cursor=pointer]
          - generic [ref=e317] [cursor=pointer]
          - generic [ref=e318] [cursor=pointer]
          - generic [ref=e319] [cursor=pointer]
          - generic [ref=e320] [cursor=pointer]
          - generic [ref=e321] [cursor=pointer]
          - generic [ref=e322] [cursor=pointer]
          - generic [ref=e323] [cursor=pointer]
          - generic [ref=e324] [cursor=pointer]
          - generic [ref=e325] [cursor=pointer]
          - generic [ref=e326] [cursor=pointer]
          - generic [ref=e327] [cursor=pointer]
          - generic [ref=e328] [cursor=pointer]
          - generic [ref=e329] [cursor=pointer]
          - generic [ref=e330] [cursor=pointer]
          - generic [ref=e331] [cursor=pointer]
          - generic [ref=e332] [cursor=pointer]
          - generic [ref=e333] [cursor=pointer]
          - generic [ref=e334] [cursor=pointer]
          - generic [ref=e335] [cursor=pointer]
          - generic [ref=e336] [cursor=pointer]
          - generic [ref=e337] [cursor=pointer]
          - generic [ref=e338] [cursor=pointer]
          - generic [ref=e339] [cursor=pointer]
          - generic [ref=e340] [cursor=pointer]
      - group "地图视图工具" [ref=e341]:
        - button "放大地图" [ref=e342] [cursor=pointer]
        - button "缩小地图" [disabled] [ref=e345]
        - button "恢复地图视图" [disabled] [ref=e348]
    - group "参与人数色阶，0到200人，另有无数据" [ref=e351]:
      - generic [ref=e352]: 省内范围
      - generic [ref=e353]: 0 人
      - generic [ref=e360]: 200 人
      - generic [ref=e361]: 无数据
    - region "地区样本详情" [ref=e364]:
      - generic [ref=e365]:
        - heading "白杨市" [level=3] [ref=e366]
        - generic [ref=e367]:
          - generic [ref=e368]: 195 人
          - generic [ref=e369]: 195人
          - button "关闭地区详情" [ref=e370] [cursor=pointer]
      - paragraph [ref=e373]: 省直管县级 · 地区代码 659012 · 示例详情（Mock）
    - generic [ref=e374]:
      - generic [ref=e375]: 边界来源
      - link "HDX/OCHA （新标签页打开）" [ref=e376] [cursor=pointer]:
        - /url: https://data.humdata.org/dataset/cod-ab-chn
        - generic [ref=e377]: HDX/OCHA
        - generic [ref=e378]: （新标签页打开）
      - text: ·
      - link "CC BY 3.0 IGO （新标签页打开）" [ref=e379] [cursor=pointer]:
        - /url: https://creativecommons.org/licenses/by/3.0/igo/
        - generic [ref=e380]: CC BY 3.0 IGO
        - generic [ref=e381]: （新标签页打开）
      - text: /
      - link "© OpenStreetMap contributors （新标签页打开）" [ref=e382] [cursor=pointer]:
        - /url: https://www.openstreetmap.org/copyright
        - generic [ref=e383]: © OpenStreetMap contributors
        - generic [ref=e384]: （新标签页打开）
      - text: ·
      - link "ODbL （新标签页打开）" [ref=e385] [cursor=pointer]:
        - /url: https://opendatacommons.org/licenses/odbl/1-0/
        - generic [ref=e386]: ODbL
        - generic [ref=e387]: （新标签页打开）
    - group [ref=e388]:
      - generic "查看精确数据" [ref=e389] [cursor=pointer]
    - group [ref=e390]:
      - generic "边界与统计说明" [ref=e391] [cursor=pointer]
  - group [ref=e392]:
    - generic "体验不同数据状态与配色" [ref=e393]
    - generic [ref=e394]:
      - generic [ref=e395]:
        - text: 查看范围
        - combobox "地图查看范围" [ref=e396]:
          - option "全国"
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
          - option "新疆维吾尔自治区" [selected]
      - generic [ref=e397]:
        - text: 数据状态
        - combobox "地图数据状态" [ref=e398]:
          - option "正常" [selected]
          - option "全部为零"
          - option "全部缺测"
          - option "无效数值"
          - option "未匹配统计ID"
          - option "模拟加载失败"
      - generic [ref=e399]:
        - text: 配色
        - combobox "地图图表配色" [ref=e400]:
          - option "蓝灰单色" [selected]
          - option "紫蓝强度"
      - button "更新数据" [ref=e401] [cursor=pointer]
    - status [ref=e403]: 示例数据 · 更新 0 次
  - group [ref=e404]:
    - generic "中国地图配置、完整源码与边界数据" [ref=e405] [cursor=pointer]
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
      |                       ^ Error: locator.click: Error: strict mode violation: getByRole('option', { name: '全国', exact: true }) resolved to 2 elements:
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