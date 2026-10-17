# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-map.spec.ts >> unified region selector searches, switches provinces, restores focus and retains detail on Escape
- Location: tests/e2e/chart-business-map.spec.ts:299:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByRole('option', { name: '全国', exact: true })
Expected: "true"
Error: strict mode violation: getByRole('option', { name: '全国', exact: true }) resolved to 2 elements:
    1) <option value="national">全国</option> aka getByLabel('地图查看范围').getByRole('option', { name: '全国' })
    2) <div role="option" aria-label="全国" data-focus="item" data-slot="option" data-highlighted="" data-selected="true" id="base-ui-_r_2_-0" aria-selected="true" class="rain-menu-item relative flex w-full min-w-rain-0 items-center gap-rain-10 rounded-rain-6 border-none px-rain-12 py-rain-6 text-left font-rain-ui text-rain-size-15 leading-rain-22 tracking-rain-default font-rain-regular no-underline cursor-pointer select-none outline-none">…</div> aka getByLabel('全国')

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
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
  207 |     await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  208 |     await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  209 |     await expect.poll(() => transform(page).getAttribute("transform")).not.toBe(before);
  210 |     await reset();
  211 |   }
  212 |   point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  213 |   await page.touchscreen.tap(point.x, point.y);
  214 |   await settle(page, 21);
  215 |   await session.detach();
  216 | });
  217 | 
  218 | test("failed drill retains national map, retry enters requested layer, late request respects latest intent", async ({ page }) => {
  219 |   await page.emulateMedia({ reducedMotion: "reduce" });
  220 |   let attempts = 0;
  221 |   await page.route("**/cities-hdx.geojson", async route => { attempts++; if (attempts === 1) await route.abort(); else { await new Promise(resolve => setTimeout(resolve, 250)); await route.continue(); } });
  222 |   await page.goto("/#chart-china");
  223 |   await settle(page, 34);
  224 |   const height = (await layer(page).locator(".rain-china-canvas").boundingBox())!.height;
  225 |   await choose(page, "广东省");
  226 |   await expect(layer(page).getByRole("alert")).toContainText("边界加载失败");
  227 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  228 |   await expect(paths(page)).toHaveCount(34);
  229 |   expect((await layer(page).locator(".rain-china-canvas").boundingBox())!.height).toBe(height);
  230 |   await layer(page).getByRole("button", { name: "重试加载" }).click();
  231 |   await expect(layer(page).getByRole("status")).toContainText("正在进入广东省");
  232 |   await demo(page);
  233 |   await page.getByRole("combobox", { name: "地图查看范围" }).selectOption("330000");
  234 |   await settle(page, 11);
  235 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "330000");
  236 |   await choose(page, "全国");
  237 |   await settle(page, 34);
  238 |   await choose(page, "广东省");
  239 |   await settle(page, 21);
  240 | });
  241 | 
  242 | test("motion has intermediate drill and zoom frames; reduced motion reaches final state directly", async ({ page }) => {
  243 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  244 |   await page.goto("/#chart-china");
  245 |   await settle(page, 34);
  246 |   const point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  247 |   const sampled = page.evaluate(async () => {
  248 |     const frames: { opacity: number; transform: string; active: string | null }[][] = [];
  249 |     for (let index = 0; index < 40; index++) {
  250 |       await new Promise(requestAnimationFrame);
  251 |       frames.push([...document.querySelectorAll(".rain-china-layer")].map(node => ({ opacity: Number(getComputedStyle(node).opacity), transform: getComputedStyle(node).transform, active: node.getAttribute("data-map-active") })));
  252 |     }
  253 |     return frames;
  254 |   });
  255 |   await page.mouse.click(point.x, point.y);
  256 |   const frames = await sampled;
  257 |   await settle(page, 21);
  258 |   expect(frames.some(frame => frame.length === 2 && frame.some(node => node.opacity > 0 && node.opacity < 1))).toBe(true);
  259 |   await layer(page).getByRole("button", { name: "放大地图" }).click();
  260 |   expect(await transform(page).evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0.24s");
  261 |   await page.emulateMedia({ reducedMotion: "reduce" });
  262 |   await choose(page, "全国");
  263 |   await settle(page, 34);
  264 |   await expect.poll(() => transform(page).evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0s");
  265 |   await mkdir(evidence, { recursive: true });
  266 |   await writeFile(`${evidence}/motion-frames.json`, JSON.stringify({ frames, scope: "Actual requestAnimationFrame styles, not a frame-rate benchmark" }, null, 2));
  267 | });
  268 | test("all five original world-map variants retain 177 real regions and native zoom/reset", async ({ page }) => {
  269 |   await page.emulateMedia({ reducedMotion: "reduce" });
  270 |   await page.goto("/#chart-choropleth");
  271 |   for (const id of ["choropleth-interactive", "choropleth-default", "choropleth-analytics", "choropleth-graticule", "choropleth-patterns"]) {
  272 |     const card = page.locator(`[data-chart-variant="${id}"]`);
  273 |     await card.scrollIntoViewIfNeeded();
  274 |     await expect(card.locator(".choropleth-features path[data-feature-id]")).toHaveCount(177);
  275 |     expect(await card.locator(".choropleth-features path[data-feature-id]").evaluateAll(paths => paths.every(path => !/NaN|Infinity/.test(path.getAttribute("d") ?? "")))).toBe(true);
  276 |   }
  277 |   const card = page.locator('[data-chart-variant="choropleth-interactive"]');
  278 |   await card.scrollIntoViewIfNeeded();
  279 |   const edgePoint = await fillPoint(card.locator('.choropleth-features path[data-feature-id="1159320937"]').last());
  280 |   const viewport = await card.locator("svg").evaluate(node => ({ left: node.getBoundingClientRect().left, width: node.getBoundingClientRect().width }));
  281 |   expect(edgePoint.x).toBeGreaterThan(viewport.left + viewport.width * .7);
  282 |   await page.mouse.move(edgePoint.x, edgePoint.y);
  283 |   const preciseValue = await card.getByRole("row", { includeHidden: true }).filter({ hasText: "Japan" }).locator("td").last().textContent();
  284 |   await expectTooltip(card, "Japan", preciseValue === "缺测" ? preciseValue : `${preciseValue} 人`);
  285 |   const transform = card.locator('svg > g[transform^="matrix"]').first();
  286 |   const before = await transform.getAttribute("transform");
  287 |   await card.getByRole("button", { name: "放大地图", exact: true }).click();
  288 |   await expect.poll(() => transform.getAttribute("transform")).not.toBe(before);
  289 |   const zoomed = await transform.getAttribute("transform");
  290 |   await page.locator("h1").scrollIntoViewIfNeeded();
  291 |   await expect(card).toHaveAttribute("data-active", "false");
  292 |   await card.scrollIntoViewIfNeeded();
  293 |   await expect(transform).toHaveAttribute("transform", zoomed!);
  294 |   await card.getByRole("button", { name: "重置地图", exact: true }).click();
  295 |   await expect(transform).toHaveAttribute("transform", before!);
  296 | });
  297 | 
  298 | 
  299 | test("unified region selector searches, switches provinces, restores focus and retains detail on Escape", async ({ page }) => {
  300 |   await page.emulateMedia({ reducedMotion: "reduce" });
  301 |   await page.goto("/#chart-china");
  302 |   await settle(page, 34);
  303 |   const selector = layer(page).getByRole("combobox", { name: "地图地区" });
  304 |   await expect(selector).toHaveText("全国");
  305 |   await expect(layer(page).getByRole("button", { name: "选择地区" })).toHaveCount(0);
  306 |   await page.locator('.rain-china-region-select [data-slot="arrow"]').click();
> 307 |   await expect(page.getByRole("option", { name: "全国", exact: true })).toHaveAttribute("data-selected", "true");
      |                                                                       ^ Error: expect(locator).toHaveAttribute(expected) failed
  308 |   const popup = page.locator(".rain-china-picker");
  309 |   await expect(popup).toHaveCSS("width", "320px");
  310 |   const search = page.getByRole("combobox", { name: "搜索选项" });
  311 |   await expect(search).toBeFocused();
  312 |   await search.fill("不存在的地区");
  313 |   await expect(page.getByRole("status")).toContainText("没有匹配选项");
  314 |   await expect(paths(page)).toHaveCount(34);
  315 |   await search.fill("浙江");
  316 |   await expect(page.getByRole("option", { name: "广东省", exact: true })).toHaveCount(0);
  317 |   await search.press("Enter");
  318 |   await settle(page, 11);
  319 |   await expect(selector).toHaveText("浙江省");
  320 |   await expect(selector).toBeFocused();
  321 |   await picker(page);
  322 |   await expect(search).toHaveValue("");
  323 |   await expect(page.getByRole("group", { name: "浙江省 · 城市与地区" })).toBeVisible();
  324 |   await search.fill("杭州");
  325 |   await search.press("Enter");
  326 |   await expect(selector).toHaveText("杭州市");
  327 |   await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "330100");
  328 |   await picker(page);
  329 |   await search.fill("广西");
  330 |   await search.press("Escape");
  331 |   await expect(selector).toBeFocused();
  332 |   await expect(layer(page).getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "330100");
  333 |   await choose(page, "广东省");
  334 |   await settle(page, 21);
  335 |   await expect(selector).toHaveText("广东省");
  336 |   await choose(page, "全国");
  337 |   await settle(page, 34);
  338 |   await expect(selector).toHaveText("全国");
  339 |   await picker(page);
  340 |   await mkdir(evidence, { recursive: true });
  341 |   await page.screenshot({ path: `${evidence}/national-selector.png`, fullPage: true });
  342 | });
  343 | 
```