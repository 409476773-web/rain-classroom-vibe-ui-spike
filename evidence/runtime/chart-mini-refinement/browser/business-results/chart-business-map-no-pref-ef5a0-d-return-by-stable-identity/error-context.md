# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-map.spec.ts >> no-preference: national and province maps fit actual boundaries, retain readings and return by stable identity
- Location: tests/e2e/chart-business-map.spec.ts:26:3

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1090.75
Received:    1130.75
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
      - text: 查看范围
      - combobox "地图查看范围" [ref=e13]:
        - option "全国" [selected]
        - option "广东省"
        - option "浙江省"
        - option "新疆维吾尔自治区"
    - generic [ref=e14]:
      - text: 数据状态
      - combobox "地图数据状态" [ref=e15]:
        - option "正常" [selected]
        - option "全部为零"
        - option "全部缺测"
        - option "无效数值"
        - option "未匹配统计ID"
        - option "模拟加载失败"
    - generic [ref=e16]:
      - text: 配色
      - combobox "地图图表配色" [ref=e17]:
        - option "蓝灰单色" [selected]
        - option "紫蓝强度"
    - button "更新数据" [ref=e18] [cursor=pointer]
  - status [ref=e20]: 示例数据 · 更新 0 次
  - generic [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e23]: CH-117
      - heading "全国 · 地区参与人数" [level=2] [ref=e24]
    - navigation "当前地图层级" [ref=e26]:
      - list [ref=e27]:
        - listitem [ref=e28]:
          - generic [ref=e29]: 全国
    - paragraph [ref=e30]: 示例参与人数 · 各层独立统计、独立量程；全国与省内的颜色深浅不直接比较。统计值与地区详情均为 Mock。
    - generic [ref=e33]:
      - img [ref=e34]:
        - generic [ref=e37]:
          - generic [ref=e38] [cursor=pointer]
          - generic [ref=e39] [cursor=pointer]
          - generic [ref=e40] [cursor=pointer]
          - generic [ref=e41] [cursor=pointer]
          - generic [ref=e42] [cursor=pointer]
          - generic [ref=e43] [cursor=pointer]
          - generic [ref=e44] [cursor=pointer]
          - generic [ref=e45] [cursor=pointer]
          - generic [ref=e46] [cursor=pointer]
          - generic [ref=e47] [cursor=pointer]
          - generic [ref=e48] [cursor=pointer]
          - generic [ref=e49] [cursor=pointer]
          - generic [ref=e50] [cursor=pointer]
          - generic [ref=e51] [cursor=pointer]
          - generic [ref=e52] [cursor=pointer]
          - generic [ref=e53] [cursor=pointer]
          - generic [ref=e54] [cursor=pointer]
          - generic [ref=e55] [cursor=pointer]
          - generic [ref=e56] [cursor=pointer]
          - generic [ref=e57] [cursor=pointer]
          - generic [ref=e58] [cursor=pointer]
          - generic [ref=e59] [cursor=pointer]
          - generic [ref=e60] [cursor=pointer]
          - generic [ref=e61] [cursor=pointer]
          - generic [ref=e62] [cursor=pointer]
          - generic [ref=e63] [cursor=pointer]
          - generic [ref=e64] [cursor=pointer]
          - generic [ref=e65] [cursor=pointer]
          - generic [ref=e66] [cursor=pointer]
          - generic [ref=e67] [cursor=pointer]
          - generic [ref=e68] [cursor=pointer]
          - generic [ref=e69] [cursor=pointer]
          - generic [ref=e70] [cursor=pointer]
          - generic [ref=e71] [cursor=pointer]
      - generic [ref=e72]:
        - button "放大地图" [ref=e73] [cursor=pointer]:
          - generic [ref=e74]: 放大
        - button "缩小地图" [ref=e75] [cursor=pointer]:
          - generic [ref=e76]: 缩小
        - button "重置地图" [ref=e77] [cursor=pointer]:
          - generic [ref=e78]: 重置
    - paragraph [ref=e79]:
      - text: 固定混合快照：地区名称按 2024 清单，HDX 为 2020 快照（实际边界年代未知），OSM 于 2026-10-09—10 提取；不代表最新行政边界。
      - link "HDX/OCHA （新标签页打开）" [ref=e80] [cursor=pointer]:
        - /url: https://data.humdata.org/dataset/cod-ab-chn
        - generic [ref=e81]: HDX/OCHA
        - generic [ref=e82]: （新标签页打开）
      - text: （
      - link "CC BY 3.0 IGO （新标签页打开）" [ref=e83] [cursor=pointer]:
        - /url: https://creativecommons.org/licenses/by/3.0/igo/
        - generic [ref=e84]: CC BY 3.0 IGO
        - generic [ref=e85]: （新标签页打开）
      - text: ）；
      - link "© OpenStreetMap contributors （新标签页打开）" [ref=e86] [cursor=pointer]:
        - /url: https://www.openstreetmap.org/copyright
        - generic [ref=e87]: © OpenStreetMap contributors
        - generic [ref=e88]: （新标签页打开）
      - text: （
      - link "ODbL （新标签页打开）" [ref=e89] [cursor=pointer]:
        - /url: https://opendatacommons.org/licenses/odbl/1-0/
        - generic [ref=e90]: ODbL
        - generic [ref=e91]: （新标签页打开）
      - text: ）。
    - group "参与人数色阶，0到251人，另有无数据" [ref=e92]:
      - generic [ref=e93]: 0 人
      - generic [ref=e99]: 251 人
      - generic [ref=e101]: 无数据
    - paragraph [ref=e102]: 可点地图或用下方地区按钮操作，支持 Enter / 空格。省份进入省内层；直辖市和无下级来源地区进入说明。
    - list "地区列表" [ref=e103]:
      - listitem [ref=e104]:
        - button "北京市" [ref=e105] [cursor=pointer]:
          - generic [ref=e106]:
            - generic [ref=e107]: 北京市
            - generic [ref=e108]: 0 人
        - generic [ref=e109]: 直辖市
      - listitem [ref=e110]:
        - button "天津市" [ref=e111] [cursor=pointer]:
          - generic [ref=e112]:
            - generic [ref=e113]: 天津市
            - generic [ref=e114]: 无数据
        - generic [ref=e115]: 直辖市
      - listitem [ref=e116]:
        - button "河北省" [ref=e117] [cursor=pointer]:
          - generic [ref=e118]:
            - generic [ref=e119]: 河北省
            - generic [ref=e120]: 34 人
        - generic [ref=e121]: 省级
      - listitem [ref=e122]:
        - button "山西省" [ref=e123] [cursor=pointer]:
          - generic [ref=e124]:
            - generic [ref=e125]: 山西省
            - generic [ref=e126]: 41 人
        - generic [ref=e127]: 省级
      - listitem [ref=e128]:
        - button "内蒙古自治区" [ref=e129] [cursor=pointer]:
          - generic [ref=e130]:
            - generic [ref=e131]: 内蒙古自治区
            - generic [ref=e132]: 48 人
        - generic [ref=e133]: 省级
      - listitem [ref=e134]:
        - button "辽宁省" [ref=e135] [cursor=pointer]:
          - generic [ref=e136]:
            - generic [ref=e137]: 辽宁省
            - generic [ref=e138]: 55 人
        - generic [ref=e139]: 省级
      - listitem [ref=e140]:
        - button "吉林省" [ref=e141] [cursor=pointer]:
          - generic [ref=e142]:
            - generic [ref=e143]: 吉林省
            - generic [ref=e144]: 62 人
        - generic [ref=e145]: 省级
      - listitem [ref=e146]:
        - button "黑龙江省" [ref=e147] [cursor=pointer]:
          - generic [ref=e148]:
            - generic [ref=e149]: 黑龙江省
            - generic [ref=e150]: 69 人
        - generic [ref=e151]: 省级
      - listitem [ref=e152]:
        - button "上海市" [ref=e153] [cursor=pointer]:
          - generic [ref=e154]:
            - generic [ref=e155]: 上海市
            - generic [ref=e156]: 76 人
        - generic [ref=e157]: 直辖市
      - listitem [ref=e158]:
        - button "江苏省" [ref=e159] [cursor=pointer]:
          - generic [ref=e160]:
            - generic [ref=e161]: 江苏省
            - generic [ref=e162]: 83 人
        - generic [ref=e163]: 省级
      - listitem [ref=e164]:
        - button "浙江省" [ref=e165] [cursor=pointer]:
          - generic [ref=e166]:
            - generic [ref=e167]: 浙江省
            - generic [ref=e168]: 90 人
        - generic [ref=e169]: 省级
      - listitem [ref=e170]:
        - button "安徽省" [ref=e171] [cursor=pointer]:
          - generic [ref=e172]:
            - generic [ref=e173]: 安徽省
            - generic [ref=e174]: 97 人
        - generic [ref=e175]: 省级
      - listitem [ref=e176]:
        - button "福建省" [ref=e177] [cursor=pointer]:
          - generic [ref=e178]:
            - generic [ref=e179]: 福建省
            - generic [ref=e180]: 104 人
        - generic [ref=e181]: 省级
      - listitem [ref=e182]:
        - button "江西省" [ref=e183] [cursor=pointer]:
          - generic [ref=e184]:
            - generic [ref=e185]: 江西省
            - generic [ref=e186]: 111 人
        - generic [ref=e187]: 省级
      - listitem [ref=e188]:
        - button "山东省" [ref=e189] [cursor=pointer]:
          - generic [ref=e190]:
            - generic [ref=e191]: 山东省
            - generic [ref=e192]: 118 人
        - generic [ref=e193]: 省级
      - listitem [ref=e194]:
        - button "河南省" [ref=e195] [cursor=pointer]:
          - generic [ref=e196]:
            - generic [ref=e197]: 河南省
            - generic [ref=e198]: 125 人
        - generic [ref=e199]: 省级
      - listitem [ref=e200]:
        - button "湖北省" [ref=e201] [cursor=pointer]:
          - generic [ref=e202]:
            - generic [ref=e203]: 湖北省
            - generic [ref=e204]: 132 人
        - generic [ref=e205]: 省级
      - listitem [ref=e206]:
        - button "湖南省" [ref=e207] [cursor=pointer]:
          - generic [ref=e208]:
            - generic [ref=e209]: 湖南省
            - generic [ref=e210]: 139 人
        - generic [ref=e211]: 省级
      - listitem [ref=e212]:
        - button "广东省" [ref=e213] [cursor=pointer]:
          - generic [ref=e214]:
            - generic [ref=e215]: 广东省
            - generic [ref=e216]: 146 人
        - generic [ref=e217]: 省级
      - listitem [ref=e218]:
        - button "广西壮族自治区" [ref=e219] [cursor=pointer]:
          - generic [ref=e220]:
            - generic [ref=e221]: 广西壮族自治区
            - generic [ref=e222]: 153 人
        - generic [ref=e223]: 省级
      - listitem [ref=e224]:
        - button "海南省" [ref=e225] [cursor=pointer]:
          - generic [ref=e226]:
            - generic [ref=e227]: 海南省
            - generic [ref=e228]: 160 人
        - generic [ref=e229]: 省级
      - listitem [ref=e230]:
        - button "重庆市" [ref=e231] [cursor=pointer]:
          - generic [ref=e232]:
            - generic [ref=e233]: 重庆市
            - generic [ref=e234]: 167 人
        - generic [ref=e235]: 直辖市
      - listitem [ref=e236]:
        - button "四川省" [ref=e237] [cursor=pointer]:
          - generic [ref=e238]:
            - generic [ref=e239]: 四川省
            - generic [ref=e240]: 174 人
        - generic [ref=e241]: 省级
      - listitem [ref=e242]:
        - button "贵州省" [ref=e243] [cursor=pointer]:
          - generic [ref=e244]:
            - generic [ref=e245]: 贵州省
            - generic [ref=e246]: 181 人
        - generic [ref=e247]: 省级
      - listitem [ref=e248]:
        - button "云南省" [ref=e249] [cursor=pointer]:
          - generic [ref=e250]:
            - generic [ref=e251]: 云南省
            - generic [ref=e252]: 188 人
        - generic [ref=e253]: 省级
      - listitem [ref=e254]:
        - button "西藏自治区" [ref=e255] [cursor=pointer]:
          - generic [ref=e256]:
            - generic [ref=e257]: 西藏自治区
            - generic [ref=e258]: 195 人
        - generic [ref=e259]: 省级
      - listitem [ref=e260]:
        - button "陕西省" [ref=e261] [cursor=pointer]:
          - generic [ref=e262]:
            - generic [ref=e263]: 陕西省
            - generic [ref=e264]: 202 人
        - generic [ref=e265]: 省级
      - listitem [ref=e266]:
        - button "甘肃省" [ref=e267] [cursor=pointer]:
          - generic [ref=e268]:
            - generic [ref=e269]: 甘肃省
            - generic [ref=e270]: 209 人
        - generic [ref=e271]: 省级
      - listitem [ref=e272]:
        - button "青海省" [ref=e273] [cursor=pointer]:
          - generic [ref=e274]:
            - generic [ref=e275]: 青海省
            - generic [ref=e276]: 216 人
        - generic [ref=e277]: 省级
      - listitem [ref=e278]:
        - button "宁夏回族自治区" [ref=e279] [cursor=pointer]:
          - generic [ref=e280]:
            - generic [ref=e281]: 宁夏回族自治区
            - generic [ref=e282]: 223 人
        - generic [ref=e283]: 省级
      - listitem [ref=e284]:
        - button "新疆维吾尔自治区" [ref=e285] [cursor=pointer]:
          - generic [ref=e286]:
            - generic [ref=e287]: 新疆维吾尔自治区
            - generic [ref=e288]: 230 人
        - generic [ref=e289]: 省级
      - listitem [ref=e290]:
        - button "台湾省" [ref=e291] [cursor=pointer]:
          - generic [ref=e292]:
            - generic [ref=e293]: 台湾省
            - generic [ref=e294]: 237 人
        - generic [ref=e295]: 省级
      - listitem [ref=e296]:
        - button "香港特别行政区" [ref=e297] [cursor=pointer]:
          - generic [ref=e298]:
            - generic [ref=e299]: 香港特别行政区
            - generic [ref=e300]: 244 人
        - generic [ref=e301]: 省级
      - listitem [ref=e302]:
        - button "澳门特别行政区" [ref=e303] [cursor=pointer]:
          - generic [ref=e304]:
            - generic [ref=e305]: 澳门特别行政区
            - generic [ref=e306]: 251 人
        - generic [ref=e307]: 省级
    - group [ref=e308]:
      - generic "查看精确数据" [ref=e309] [cursor=pointer]
    - paragraph [ref=e310]: 当前省级层 34 个地区；省内层保留实际地级和省直管县级身份，未扩展区县地图。
  - group [ref=e311]:
    - generic "中国地图配置、完整源码与边界数据" [ref=e312] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | 
  4   | test.use({ hasTouch: true });
  5   | const evidence = "evidence/runtime/chart-business-expansion/p5/browser/host";
  6   | const layer = (page: Page) => page.locator("[data-china-layer]");
  7   | 
  8   | async function fillPoint(path: Locator) {
  9   |   await expect(path).toBeVisible();
  10  |   await path.scrollIntoViewIfNeeded();
  11  |   return path.evaluate(async element => {
  12  |     await Promise.all(element.closest("svg")!.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => undefined)));
  13  |     const path = element as SVGPathElement, box = path.getBBox(), matrix = path.getScreenCTM()!;
  14  |     for (const y of [.5, .4, .6, .3, .7, .2, .8, .1, .9]) for (const x of [.5, .4, .6, .3, .7, .2, .8, .1, .9]) {
  15  |       const point = new DOMPoint(box.x + box.width * x, box.y + box.height * y);
  16  |       if (path.isPointInFill(point)) {
  17  |         const screen = point.matrixTransform(matrix), hit = document.elementFromPoint(screen.x, screen.y);
  18  |         if (hit?.closest("[data-feature-id]")?.getAttribute("data-feature-id") === path.getAttribute("data-feature-id")) return { x: screen.x, y: screen.y };
  19  |       }
  20  |     }
  21  |     throw new Error("No actual filled point in the region polygon");
  22  |   });
  23  | }
  24  | 
  25  | for (const motion of ["no-preference", "reduce"] as const) {
  26  |   test(`${motion}: national and province maps fit actual boundaries, retain readings and return by stable identity`, async ({ page }) => {
  27  |     const errors: string[] = [];
  28  |     page.on("pageerror", error => errors.push(error.message));
  29  |     await page.emulateMedia({ reducedMotion: motion });
  30  |     await page.goto("/#chart-china");
  31  |     await mkdir(evidence, { recursive: true });
  32  |     await expect(page.getByRole("heading", { name: "全国与省市下钻", exact: true })).toBeVisible();
  33  |     await expect(layer(page).getByRole("list", { name: "地区列表" }).getByRole("button")).toHaveCount(34);
  34  |     await expect(layer(page).locator(".choropleth-features path")).toHaveCount(34);
  35  |     const controlBounds = await layer(page).locator(".rain-china-map-controls").evaluate(node => ({ bottom: node.getBoundingClientRect().bottom, mapBottom: node.closest(".rain-china-map")!.getBoundingClientRect().bottom }));
> 36  |     expect(controlBounds.bottom).toBeLessThanOrEqual(controlBounds.mapBottom);
      |                                  ^ Error: expect(received).toBeLessThanOrEqual(expected)
  37  |     await layer(page).screenshot({ path: `${evidence}/national-${motion}.png` });
  38  |     await layer(page).getByRole("button", { name: "广东省", exact: true }).focus();
  39  |     await page.keyboard.press("Enter");
  40  |     await expect(layer(page)).toHaveAttribute("data-china-layer", "440000");
  41  |     await expect(layer(page).getByRole("list", { name: "地区列表" }).getByRole("button")).toHaveCount(21);
  42  |     await expect(layer(page).locator(".choropleth-features path")).toHaveCount(21);
  43  |     expect(await layer(page).locator(".choropleth-features path").evaluateAll(paths => paths.every(path => !/NaN|Infinity/.test(path.getAttribute("d") ?? "")))).toBe(true);
  44  |     const bounds = await layer(page).locator("svg").evaluate(svg => {
  45  |       const viewport = svg.getBoundingClientRect();
  46  |       return [...svg.querySelectorAll(".choropleth-features path")].map(path => { const b = path.getBoundingClientRect(); return { left: b.left - viewport.left, top: b.top - viewport.top, right: b.right - viewport.left, bottom: b.bottom - viewport.top, width: viewport.width, height: viewport.height }; });
  47  |     });
  48  |     expect(bounds.every(b => b.left >= 15 && b.top >= 15 && b.right <= b.width - 15 && b.bottom <= b.height - 15)).toBe(true);
  49  |     const city = layer(page).getByRole("button", { name: "广州市", exact: true });
  50  |     await city.focus();
  51  |     await page.keyboard.press(" ");
  52  |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "440100");
  53  |     await expect(layer(page).locator('path[data-feature-id="440100"][data-selected="true"]')).toHaveCount(1);
  54  |     await layer(page).locator(".rain-china-map").evaluate(node => node.setAttribute("data-test-retained-map", "true"));
  55  |     await page.getByRole("button", { name: "更新数据", exact: true }).click();
  56  |     await page.getByRole("combobox", { name: "地图图表配色" }).selectOption("intensity");
  57  |     await expect(layer(page).locator('[data-test-retained-map="true"]')).toHaveCount(1);
  58  |     await expect(city).toHaveAttribute("aria-pressed", "true");
  59  |     const palette = await layer(page).evaluate(node => ({ first: getComputedStyle(node).getPropertyValue("--chart-scale-01").trim(), last: getComputedStyle(node).getPropertyValue("--chart-scale-05").trim() }));
  60  |     expect(palette.first).not.toBe(palette.last);
  61  |     await page.getByRole("combobox", { name: "地图图表配色" }).selectOption("monochrome-blue");
  62  |     const mono = await layer(page).evaluate(node => getComputedStyle(node).getPropertyValue("--chart-scale-05").trim());
  63  |     expect(mono.toLowerCase()).toBe("#3f5d91");
  64  |     const buttonValue = await city.locator('[data-slot="value"]').textContent();
  65  |     await layer(page).getByText("查看精确数据", { exact: true }).click();
  66  |     await expect(layer(page).locator('[data-china-row="440100"]')).toContainText(buttonValue!);
  67  |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText(buttonValue!);
  68  |     await layer(page).screenshot({ path: `${evidence}/guangdong-detail-${motion}.png` });
  69  |     await layer(page).getByRole("button", { name: "返回全国", exact: true }).click();
  70  |     await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  71  |     await expect(layer(page).locator('path[data-feature-id="440000"][data-selected="true"]')).toHaveCount(1);
  72  |     await expect(layer(page)).toHaveAttribute("data-revision", "1");
  73  |     await expect(layer(page)).toHaveAttribute("data-recipe", "monochrome-blue");
  74  |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveCount(0);
  75  |     await page.getByRole("combobox", { name: "地图查看范围" }).selectOption("330000");
  76  |     await expect(layer(page).getByRole("list", { name: "地区列表" }).getByRole("button")).toHaveCount(11);
  77  |     await layer(page).getByRole("button", { name: "杭州市", exact: true }).click();
  78  |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "330100");
  79  |     await layer(page).screenshot({ path: `${evidence}/zhejiang-${motion}.png` });
  80  |     expect(errors).toEqual([]);
  81  |     await writeFile(`${evidence}/readings-${motion}.json`, JSON.stringify({ motion, bounds, palette, mono, buttonValue, preservedRevision: 1, pageErrors: errors }, null, 2));
  82  |   });
  83  | 
  84  |   test(`${motion}: 390px keeps long real names, truthful states and loading retry`, async ({ page }) => {
  85  |     const errors: string[] = [];
  86  |     page.on("pageerror", error => errors.push(error.message));
  87  |     await page.emulateMedia({ reducedMotion: motion });
  88  |     await page.setViewportSize({ width: 390, height: 844 });
  89  |     await page.goto("/#chart-china");
  90  |     await page.getByRole("combobox", { name: "地图查看范围" }).selectOption("650000");
  91  |     await expect(layer(page).getByRole("list", { name: "地区列表" }).getByRole("button")).toHaveCount(26);
  92  |     await expect(layer(page).getByRole("button", { name: "巴音郭楞蒙古自治州", exact: true })).toBeVisible();
  93  |     await layer(page).getByRole("button", { name: "白杨市", exact: true }).click();
  94  |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("省直管县级");
  95  |     await mkdir(evidence, { recursive: true });
  96  |     await page.screenshot({ path: `${evidence}/xinjiang-390-${motion}.png`, fullPage: true });
  97  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  98  |     await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("zero");
  99  |     await expect(layer(page).getByLabel(/参与人数色阶/)).toContainText("全部为 0");
  100 |     await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("missing");
  101 |     await expect(layer(page).getByLabel(/参与人数色阶/)).toContainText("暂无有效数值");
  102 |     await expect(layer(page).getByLabel(/参与人数色阶/)).not.toContainText("全部为 0");
  103 |     const fills = await layer(page).locator(".choropleth-features path").evaluateAll(paths => paths.map(path => getComputedStyle(path).fill));
  104 |     expect(new Set(fills).size).toBe(1);
  105 |     await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("unmatched");
  106 |     await expect(layer(page).getByRole("alert")).toContainText("999999");
  107 |     await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("invalid");
  108 |     await expect(layer(page).getByRole("alert")).toContainText("已拒绝无效统计数据");
  109 |     await expect(layer(page).locator("svg")).toHaveCount(0);
  110 |     await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("load-error");
  111 |     await expect(layer(page).getByRole("alert")).toContainText("边界加载失败");
  112 |     await layer(page).getByRole("button", { name: "重试加载", exact: true }).click();
  113 |     await expect(layer(page).getByRole("list", { name: "地区列表" }).getByRole("button")).toHaveCount(26);
  114 |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "659012");
  115 |     await page.getByRole("combobox", { name: "地图数据状态" }).selectOption("normal");
  116 |     await layer(page).getByRole("button", { name: "返回全国", exact: true }).click();
  117 |     await layer(page).getByRole("button", { name: "北京市", exact: true }).click();
  118 |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("直辖市");
  119 |     await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  120 |     await layer(page).getByRole("button", { name: "香港特别行政区", exact: true }).click();
  121 |     await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toContainText("当前来源未提供下级地图");
  122 |     expect(errors).toEqual([]);
  123 |   });
  124 | }
  125 | 
  126 | test("actual filled polygon click and tap drill; mouse/touch drag and two-finger pinch do not activate", async ({ page }) => {
  127 |   await page.emulateMedia({ reducedMotion: "reduce" });
  128 |   await page.goto("/#chart-china");
  129 |   const map = layer(page).locator("svg");
  130 |   const guangdong = () => layer(page).locator('.choropleth-features path[data-feature-id="440000"]').last();
  131 |   let point = await fillPoint(guangdong());
  132 |   const transform = map.locator('> g[transform^="matrix"]').first();
  133 |   const initial = await transform.getAttribute("transform");
  134 |   const initialCss = await transform.evaluate(node => getComputedStyle(node).transform);
  135 |   const reset = async () => {
  136 |     await layer(page).getByRole("button", { name: "重置地图", exact: true }).click();
```