# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-map-scope.spec.ts >> all 27 available provinces keep the range selector consistent with their actual map layer
- Location: tests/e2e/chart-business-map-scope.spec.ts:5:1

# Error details

```
Error: locator.press: Error: strict mode violation: getByRole('option', { name: '山东省', exact: true }) resolved to 2 elements:
    1) <option value="370000">山东省</option> aka getByLabel('地图查看范围')
    2) <div role="option" aria-label="山东省" data-focus="item" data-slot="option" id="base-ui-_r_2_-15" aria-selected="false" data-selected="false" class="rain-menu-item relative flex w-full min-w-rain-0 items-center gap-rain-10 rounded-rain-6 border-none px-rain-12 py-rain-6 text-left font-rain-ui text-rain-size-15 leading-rain-22 tracking-rain-default font-rain-regular no-underline cursor-pointer select-none outline-none">…</div> aka getByLabel('山东省')

Call log:
  - waiting for getByRole('option', { name: '山东省', exact: true })

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
    - generic [ref=e275]:
      - generic [ref=e276]:
        - text: 查看范围
        - combobox "地图查看范围" [ref=e277]:
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
      - generic [ref=e278]:
        - text: 数据状态
        - combobox "地图数据状态" [ref=e279]:
          - option "正常" [selected]
          - option "全部为零"
          - option "全部缺测"
          - option "无效数值"
          - option "未匹配统计ID"
          - option "模拟加载失败"
      - generic [ref=e280]:
        - text: 配色
        - combobox "地图图表配色" [ref=e281]:
          - option "蓝灰单色" [selected]
          - option "紫蓝强度"
      - button "更新数据" [ref=e282] [cursor=pointer]
    - status [ref=e284]: 示例数据 · 更新 0 次 · 已按系统设置减少动效
  - group [ref=e285]:
    - generic "中国地图配置、完整源码与边界数据" [ref=e286] [cursor=pointer]
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
  11 |   await page.getByText("体验不同数据状态与配色", { exact: true }).click();
  12 |   await page.getByRole("combobox", { name: "地图地区", exact: true }).click();
  13 |   const scope = page.getByRole("combobox", { name: "地图查看范围" });
> 14 |   await page.getByRole("option", { name: "山东省", exact: true }).press("Enter");
     |                                                                ^ Error: locator.press: Error: strict mode violation: getByRole('option', { name: '山东省', exact: true }) resolved to 2 elements:
  15 |   await expect(scope).toHaveValue("370000");
  16 |   await expect(scope.locator("option")).toHaveCount(28);
  17 |   for (const province of provinces) {
  18 |     await scope.selectOption(province.id);
  19 |     const chart = page.locator(`[data-china-layer="${province.id}"]`);
  20 |     await expect(chart.getByRole("heading", { name: `${province.name} · 地区参与人数`, exact: true })).toBeVisible();
  21 |     await expect(chart.locator('[data-map-active="true"] path[data-feature-id]')).toHaveCount(regions.filter(region => region.parentId === province.id).length);
  22 |     await expect(scope).toHaveValue(province.id);
  23 |   }
  24 |   await page.getByRole("combobox", { name: "地图地区", exact: true }).click();
  25 |   await page.getByRole("option", { name: "全国", exact: true }).click();
  26 |   await expect(scope).toHaveValue("national");
  27 | });
  28 | 
```