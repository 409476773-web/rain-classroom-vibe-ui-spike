# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-map.spec.ts >> motion has intermediate drill and zoom frames; reduced motion reaches final state directly
- Location: tests/e2e/chart-business-map.spec.ts:239:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "0s"
Received: "0.24s"
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
      - navigation "当前地图层级" [ref=e16]:
        - list [ref=e17]:
          - listitem [ref=e18]:
            - generic [ref=e19]: 全国
      - button "选择地区" [ref=e20] [cursor=pointer]
    - generic [ref=e26]:
      - img [ref=e27]:
        - generic [ref=e29]:
          - generic [ref=e30] [cursor=pointer]
          - generic [ref=e31] [cursor=pointer]
          - generic [ref=e32] [cursor=pointer]
          - generic [ref=e33] [cursor=pointer]
          - generic [ref=e34] [cursor=pointer]
          - generic [ref=e35] [cursor=pointer]
          - generic [ref=e36] [cursor=pointer]
          - generic [ref=e37] [cursor=pointer]
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
      - group "地图视图工具" [ref=e64]:
        - button "放大地图" [ref=e65] [cursor=pointer]
        - button "缩小地图" [disabled] [ref=e68]
        - button "恢复地图视图" [disabled] [ref=e71]
    - group "参与人数色阶，0到300人，另有无数据" [ref=e74]:
      - generic [ref=e75]: 全国范围
      - generic [ref=e76]: 0 人
      - generic [ref=e83]: 300 人
      - generic [ref=e84]: 无数据
    - paragraph [ref=e87]: 刚才查看：广东省。指向地区查看人数，点击省份进入省内，点击城市保留读数。
    - generic [ref=e88]:
      - generic [ref=e89]: 边界来源
      - link "HDX/OCHA （新标签页打开）" [ref=e90] [cursor=pointer]:
        - /url: https://data.humdata.org/dataset/cod-ab-chn
        - generic [ref=e91]: HDX/OCHA
        - generic [ref=e92]: （新标签页打开）
      - text: ·
      - link "CC BY 3.0 IGO （新标签页打开）" [ref=e93] [cursor=pointer]:
        - /url: https://creativecommons.org/licenses/by/3.0/igo/
        - generic [ref=e94]: CC BY 3.0 IGO
        - generic [ref=e95]: （新标签页打开）
      - text: /
      - link "© OpenStreetMap contributors （新标签页打开）" [ref=e96] [cursor=pointer]:
        - /url: https://www.openstreetmap.org/copyright
        - generic [ref=e97]: © OpenStreetMap contributors
        - generic [ref=e98]: （新标签页打开）
      - text: ·
      - link "ODbL （新标签页打开）" [ref=e99] [cursor=pointer]:
        - /url: https://opendatacommons.org/licenses/odbl/1-0/
        - generic [ref=e100]: ODbL
        - generic [ref=e101]: （新标签页打开）
    - group [ref=e102]:
      - generic "查看精确数据" [ref=e103] [cursor=pointer]
    - group [ref=e104]:
      - generic "边界与统计说明" [ref=e105] [cursor=pointer]
  - group [ref=e106]:
    - generic "体验不同数据状态与配色" [ref=e107]
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
  - group [ref=e108]:
    - generic "中国地图配置、完整源码与边界数据" [ref=e109] [cursor=pointer]
```

# Test source

```ts
  161 |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  162 |     expect(errors).toEqual([]);
  163 |   });
  164 | }
  165 | 
  166 | test("ordinary wheel scrolls the page; drag and pinch do not activate; rapid click and tap do", async ({ page }) => {
  167 |   await page.emulateMedia({ reducedMotion: "reduce" });
  168 |   await page.goto("/#chart-china");
  169 |   await settle(page, 34);
  170 |   const original = await transform(page).getAttribute("transform");
  171 |   let point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  172 |   await page.mouse.move(point.x, point.y);
  173 |   const scroll = await page.evaluate(() => scrollY);
  174 |   await page.mouse.wheel(0, 180);
  175 |   await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(scroll);
  176 |   await expect(transform(page)).toHaveAttribute("transform", original!);
  177 |   const reset = async () => {
  178 |     const button = layer(page).getByRole("button", { name: "恢复地图视图" });
  179 |     if (await button.isEnabled()) await button.click();
  180 |     await expect(transform(page)).toHaveAttribute("transform", original!);
  181 |   };
  182 |   point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  183 |   await page.mouse.move(point.x, point.y); await page.mouse.down();
  184 |   await page.mouse.move(point.x + 65, point.y + 18, { steps: 6 }); await page.mouse.up();
  185 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  186 |   await reset();
  187 |   point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  188 |   await page.mouse.click(point.x, point.y);
  189 |   await settle(page, 21);
  190 |   await layer(page).getByRole("link", { name: "返回全国" }).click();
  191 |   await settle(page, 34);
  192 |   const session = await page.context().newCDPSession(page);
  193 |   point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  194 |   await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x, y: point.y }] });
  195 |   await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x + 50, y: point.y - 40 }] });
  196 |   await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  197 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  198 |   await reset();
  199 |   for (const asymmetric of [false, true]) {
  200 |     point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  201 |     const before = await transform(page).getAttribute("transform");
  202 |     await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ id: 0, x: point.x - 18, y: point.y }, { id: 1, x: point.x + 18, y: point.y }] });
  203 |     await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ id: 0, x: point.x - (asymmetric ? 18 : 42), y: point.y }, { id: 1, x: point.x + (asymmetric ? 70 : 42), y: point.y }] });
  204 |     await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  205 |     await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  206 |     await expect.poll(() => transform(page).getAttribute("transform")).not.toBe(before);
  207 |     await reset();
  208 |   }
  209 |   point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  210 |   await page.touchscreen.tap(point.x, point.y);
  211 |   await settle(page, 21);
  212 |   await session.detach();
  213 | });
  214 | 
  215 | test("failed drill retains national map, retry enters requested layer, late request respects latest intent", async ({ page }) => {
  216 |   await page.emulateMedia({ reducedMotion: "reduce" });
  217 |   let attempts = 0;
  218 |   await page.route("**/cities-hdx.geojson", async route => { attempts++; if (attempts === 1) await route.abort(); else { await new Promise(resolve => setTimeout(resolve, 250)); await route.continue(); } });
  219 |   await page.goto("/#chart-china");
  220 |   await settle(page, 34);
  221 |   const height = (await layer(page).locator(".rain-china-canvas").boundingBox())!.height;
  222 |   await choose(page, "广东省");
  223 |   await expect(layer(page).getByRole("alert")).toContainText("边界加载失败");
  224 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "national");
  225 |   await expect(paths(page)).toHaveCount(34);
  226 |   expect((await layer(page).locator(".rain-china-canvas").boundingBox())!.height).toBe(height);
  227 |   await layer(page).getByRole("button", { name: "重试加载" }).click();
  228 |   await expect(layer(page).getByRole("status")).toContainText("正在进入广东省");
  229 |   await demo(page);
  230 |   await page.getByRole("combobox", { name: "地图查看范围" }).selectOption("330000");
  231 |   await settle(page, 11);
  232 |   await expect(layer(page)).toHaveAttribute("data-china-layer", "330000");
  233 |   await layer(page).getByRole("link", { name: "返回全国" }).click();
  234 |   await settle(page, 34);
  235 |   await choose(page, "广东省");
  236 |   await settle(page, 21);
  237 | });
  238 | 
  239 | test("motion has intermediate drill and zoom frames; reduced motion reaches final state directly", async ({ page }) => {
  240 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  241 |   await page.goto("/#chart-china");
  242 |   await settle(page, 34);
  243 |   const point = await fillPoint(active(page).locator('path[data-feature-id="440000"]'));
  244 |   const sampled = page.evaluate(async () => {
  245 |     const frames: { opacity: number; transform: string; active: string | null }[][] = [];
  246 |     for (let index = 0; index < 40; index++) {
  247 |       await new Promise(requestAnimationFrame);
  248 |       frames.push([...document.querySelectorAll(".rain-china-layer")].map(node => ({ opacity: Number(getComputedStyle(node).opacity), transform: getComputedStyle(node).transform, active: node.getAttribute("data-map-active") })));
  249 |     }
  250 |     return frames;
  251 |   });
  252 |   await page.mouse.click(point.x, point.y);
  253 |   const frames = await sampled;
  254 |   await settle(page, 21);
  255 |   expect(frames.some(frame => frame.length === 2 && frame.some(node => node.opacity > 0 && node.opacity < 1))).toBe(true);
  256 |   await layer(page).getByRole("button", { name: "放大地图" }).click();
  257 |   expect(await transform(page).evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0.24s");
  258 |   await page.emulateMedia({ reducedMotion: "reduce" });
  259 |   await layer(page).getByRole("link", { name: "返回全国" }).click();
  260 |   await settle(page, 34);
> 261 |   expect(await transform(page).evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0s");
      |                                                                                             ^ Error: expect(received).toBe(expected) // Object.is equality
  262 |   await mkdir(evidence, { recursive: true });
  263 |   await writeFile(`${evidence}/motion-frames.json`, JSON.stringify({ frames, scope: "Actual requestAnimationFrame styles, not a frame-rate benchmark" }, null, 2));
  264 | });
  265 | test("all five original world-map variants retain 177 real regions and native zoom/reset", async ({ page }) => {
  266 |   await page.emulateMedia({ reducedMotion: "reduce" });
  267 |   await page.goto("/#chart-choropleth");
  268 |   for (const id of ["choropleth-interactive", "choropleth-default", "choropleth-analytics", "choropleth-graticule", "choropleth-patterns"]) {
  269 |     const card = page.locator(`[data-chart-variant="${id}"]`);
  270 |     await card.scrollIntoViewIfNeeded();
  271 |     await expect(card.locator(".choropleth-features path[data-feature-id]")).toHaveCount(177);
  272 |     expect(await card.locator(".choropleth-features path[data-feature-id]").evaluateAll(paths => paths.every(path => !/NaN|Infinity/.test(path.getAttribute("d") ?? "")))).toBe(true);
  273 |   }
  274 |   const card = page.locator('[data-chart-variant="choropleth-interactive"]');
  275 |   await card.scrollIntoViewIfNeeded();
  276 |   const edgePoint = await fillPoint(card.locator('.choropleth-features path[data-feature-id="1159320937"]').last());
  277 |   const viewport = await card.locator("svg").evaluate(node => ({ left: node.getBoundingClientRect().left, width: node.getBoundingClientRect().width }));
  278 |   expect(edgePoint.x).toBeGreaterThan(viewport.left + viewport.width * .7);
  279 |   await page.mouse.move(edgePoint.x, edgePoint.y);
  280 |   const preciseValue = await card.getByRole("row", { includeHidden: true }).filter({ hasText: "Japan" }).locator("td").last().textContent();
  281 |   await expectTooltip(card, "Japan", preciseValue === "缺测" ? preciseValue : `${preciseValue} 人`);
  282 |   const transform = card.locator('svg > g[transform^="matrix"]').first();
  283 |   const before = await transform.getAttribute("transform");
  284 |   await card.getByRole("button", { name: "放大地图", exact: true }).click();
  285 |   await expect.poll(() => transform.getAttribute("transform")).not.toBe(before);
  286 |   const zoomed = await transform.getAttribute("transform");
  287 |   await page.locator("h1").scrollIntoViewIfNeeded();
  288 |   await expect(card).toHaveAttribute("data-active", "false");
  289 |   await card.scrollIntoViewIfNeeded();
  290 |   await expect(transform).toHaveAttribute("transform", zoomed!);
  291 |   await card.getByRole("button", { name: "重置地图", exact: true }).click();
  292 |   await expect(transform).toHaveAttribute("transform", before!);
  293 | });
  294 | 
  295 | 
```