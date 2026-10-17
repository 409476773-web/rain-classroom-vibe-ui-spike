# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-x-axis-resize.spec.ts >> line no-preference: earliest resize frames retain axis identity, hover and data reads
- Location: tests/e2e/chart-x-axis-resize.spec.ts:91:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-rain-id="chart-line"]').locator('.rain-chart-tooltip')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-rain-id="chart-line"]').locator('.rain-chart-tooltip')

```

```yaml
- main:
  - link "返回组件目录":
    - /url: "#components"
  - heading "折线图" [level=1]
  - text: G4 · 共享候选 · 未发布 · 视觉待复核
  - paragraph: 连续趋势与多系列比较，保留真实端点。
  - heading "图型与可选配方" [level=2]
  - paragraph: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
  - text: 0 100 200 300 400 Sep 1 Sep 9 Sep 17 Sep 24
  - button "参与人数 · 人"
  - button "完成人数 · 人"
  - button "复习人数 · 人"
  - group: 查看精确数据
  - text: 视觉配方
  - combobox "视觉配方":
    - option "清晰线与轻面积"
    - option "蓝紫近邻" [selected]
    - option "多色类别"
    - option "协调实色"
    - option "蓝灰单色"
  - text: 示例状态
  - combobox "示例状态":
    - option "正常" [selected]
    - option "无数据"
    - option "零值"
    - option "单项／单点"
    - option "长标签"
    - option "缺测"
    - option "无效数据"
  - text: 系列数
  - combobox "系列数":
    - option "3" [selected]
    - option "5"
  - text: 尺寸配方
  - combobox "尺寸配方":
    - option "标准" [selected]
    - option "迷你 / 嵌入"
  - button "更新数据"
  - button "重播动效"
  - status: 示例数据 · 已更新 1 次
  - group: 调用配置、完整源码与示例数据
  - region "全部图表变体":
    - navigation "变体分组":
      - button "基础结构"
      - button "图形材质"
      - button "坐标与辅助读数"
      - button "交互与状态"
    - region "基础结构":
      - heading "基础结构" [level=2]
      - region "Line Chart - Linear":
        - heading "Line Chart - Linear" [level=3]
        - paragraph: 数据点之间直线连接
        - group: 查看精确数据
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - Multiple Lines":
        - heading "Line Chart - Multiple Lines" [level=3]
        - paragraph: 多系列时间趋势对比
        - button "参与人数 · 人"
        - button "完成人数 · 人"
        - group: 查看精确数据
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
    - region "图形材质":
      - heading "图形材质" [level=2]
      - region "Line Chart - Series Markers":
        - heading "Line Chart - Series Markers" [level=3]
        - paragraph: 各观测点圆环标记
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - Dashed Tail":
        - heading "Line Chart - Dashed Tail" [level=3]
        - paragraph: 从指定索引开始绘制虚线尾段
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
    - region "坐标与辅助读数":
      - heading "坐标与辅助读数" [level=2]
      - region "Line Chart - Markers":
        - heading "Line Chart - Markers" [level=3]
        - paragraph: 标注关键事件
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - X Axis":
        - heading "Line Chart - X Axis" [level=3]
        - paragraph: 显示日期横轴
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - X & Y Axis":
        - heading "Line Chart - X & Y Axis" [level=3]
        - paragraph: 横轴日期与水平参考网格
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - Left Y axis":
        - heading "Line Chart - Left Y axis" [level=3]
        - paragraph: 多个系列共用左纵轴
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - Left and right Y axes":
        - heading "Line Chart - Left and right Y axes" [level=3]
        - paragraph: 左右独立纵轴与量纲
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - Pattern Background":
        - heading "Line Chart - Pattern Background" [level=3]
        - paragraph: 图案背景替代网格
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - Dot Grid Background":
        - heading "Line Chart - Dot Grid Background" [level=3]
        - paragraph: 带边缘渐隐的点阵背景
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - Reference Band":
        - heading "Line Chart - Reference Band" [level=3]
        - paragraph: 水平参考区间与边界标识
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - Pattern Reference Band":
        - heading "Line Chart - Pattern Reference Band" [level=3]
        - paragraph: 图案参考区间与相应轴标签
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
    - region "交互与状态":
      - heading "交互与状态" [level=2]
      - region "Line Chart - Trio with Brush":
        - heading "Line Chart - Trio with Brush" [level=3]
        - paragraph: 三条曲线、顶部图例、点阵与范围缩放
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - Projection":
        - heading "Line Chart - Projection" [level=3]
        - paragraph: 目标与自动预测曲线、终端标记
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - Segment Selection":
        - heading "Line Chart - Segment Selection" [level=3]
        - paragraph: 按下并拖动时高亮一段范围
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - Loading":
        - heading "Line Chart - Loading" [level=3]
        - paragraph: 网格与前景脉冲加载
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
      - region "Line Chart - Loading (Sweep)":
        - heading "Line Chart - Loading (Sweep)" [level=3]
        - paragraph: 斜向扫光折线骨架
        - paragraph: 滚动到此处查看示例
        - button "更新数据"
        - button "重播动效"
        - status: 示例数据 · 已更新 0 次
        - group: 查看本卡代码
        - link "对应官网示例 （新标签页打开）":
          - /url: https://bklit.com/charts/line-chart
  - heading "数据与使用边界" [level=2]
  - paragraph: Date日期与有限数值；本例按日记录人数。
  - paragraph: 本例不宣称缺口插值、点击固定或图例隐藏。
  - paragraph:
    - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
    - link "查看条形和迷你图表在表格、卡片、列表中的组合":
      - /url: "#chart-business"
    - text: 。
  - group: 接口与调用示例
  - navigation "相关图型":
    - link "面积图":
      - /url: "#chart-area"
    - link "折线图":
      - /url: "#chart-line"
    - link "柱状图":
      - /url: "#chart-bar"
    - link "组合图":
      - /url: "#chart-composed"
    - link "饼图 / 环饼":
      - /url: "#chart-pie"
    - link "多目标进度环":
      - /url: "#chart-ring"
    - link "雷达图":
      - /url: "#chart-radar"
    - link "时间散点":
      - /url: "#chart-scatter"
    - link "漏斗图":
      - /url: "#chart-funnel"
    - link "仪表图":
      - /url: "#chart-gauge"
    - link "桑基图":
      - /url: "#chart-sankey"
    - link "旭日图":
      - /url: "#chart-sunburst"
    - link "日历热图":
      - /url: "#chart-heatmap"
    - link "分区地图":
      - /url: "#chart-choropleth"
    - link "K线图":
      - /url: "#chart-candlestick"
    - link "盈亏线":
      - /url: "#chart-profit-loss"
    - link "实时折线":
      - /url: "#chart-live-line"
    - link "分类矩阵":
      - /url: "#chart-matrix"
    - link "网络关系图":
      - /url: "#chart-network"
```

# Test source

```ts
  21  | type FrameAudit = { samples: Sample[]; beforeIds: number[]; afterIds: number[]; firstEvent: string | null };
  22  | 
  23  | async function attachBefore(page: Page, intercepted: string[]) {
  24  |   if (!baseline) return;
  25  |   await page.route(url => decodeURIComponent(url.pathname) === `/@fs${sourcePath}` && !url.searchParams.has("raw"), async route => {
  26  |     const response = await route.fetch();
  27  |     const liveModule = await response.text();
  28  |     const index = liveModule.indexOf(bodyStart);
  29  |     expect(index).toBeGreaterThan(0);
  30  |     // Keep Vite's resolved dependency/development prelude, use the exact saved
  31  |     // baseline source for every function, JSX body and export in the module.
  32  |     intercepted.push(route.request().url());
  33  |     await route.fulfill({ response, body: liveModule.slice(0, index) + beforeBody, headers: { ...response.headers(), "content-type": "application/javascript" } });
  34  |   });
  35  | }
  36  | 
  37  | async function beginFrames(page: Page, selector: string, targetWidth: number | null, frames = 8) {
  38  |   await page.evaluate(({ selector, targetWidth, frames }) => {
  39  |     const host = document.querySelector(selector)!;
  40  |     const store = window as unknown as { __axisIds?: WeakMap<Element, number>; __axisCounter?: number; __axisDone?: Promise<FrameAudit> };
  41  |     store.__axisIds ??= new WeakMap();
  42  |     store.__axisCounter ??= 0;
  43  |     const ticks = () => [...host.querySelectorAll("span.whitespace-nowrap.text-chart-label.text-xs")].filter(node => {
  44  |       const parent = node.parentElement!;
  45  |       return parent.style.bottom === "12px" && parent.style.width === "0px" && parent.style.display === "flex";
  46  |     });
  47  |     const id = (node: Element) => {
  48  |       if (!store.__axisIds!.has(node)) store.__axisIds!.set(node, ++store.__axisCounter!);
  49  |       return store.__axisIds!.get(node)!;
  50  |     };
  51  |     const beforeIds = ticks().map(id);
  52  |     const samples: Sample[] = [];
  53  |     let count = 0, started: number | null = targetWidth == null ? performance.now() : null;
  54  |     let firstEvent: string | null = null;
  55  |     let finish: (value: FrameAudit) => void;
  56  |     store.__axisDone = new Promise(resolve => { finish = resolve; });
  57  |     const sample = (reason: string) => {
  58  |       if (targetWidth !== null && innerWidth !== targetWidth) return;
  59  |       started ??= performance.now();
  60  |       firstEvent ??= reason;
  61  |       samples.push({ reason, elapsed: performance.now() - started, viewport: innerWidth, documentWidth: document.documentElement.scrollWidth,
  62  |         ticks: ticks().map(node => {
  63  |           const box = node.getBoundingClientRect(), parent = node.parentElement!, style = getComputedStyle(parent), text = getComputedStyle(node);
  64  |           return { id: id(node), label: node.textContent ?? "", left: box.left, right: box.right, center: (box.left + box.right) / 2, position: style.left, transition: style.transition, color: text.color, fontSize: text.fontSize };
  65  |         }),
  66  |       });
  67  |     };
  68  |     const resize = () => sample("resize-event");
  69  |     addEventListener("resize", resize);
  70  |     const observer = new ResizeObserver(() => sample("resize-observer"));
  71  |     const plot = host.querySelector(".rain-chart-plot,.rain-category-plot") ?? host;
  72  |     observer.observe(plot);
  73  |     const next = () => {
  74  |       if (targetWidth === null || innerWidth === targetWidth) { sample("raf"); count++; }
  75  |       if (count < frames) requestAnimationFrame(next);
  76  |       else {
  77  |         observer.disconnect(); removeEventListener("resize", resize);
  78  |         finish!({ samples, beforeIds, afterIds: ticks().map(id), firstEvent });
  79  |       }
  80  |     };
  81  |     requestAnimationFrame(next);
  82  |   }, { selector, targetWidth, frames });
  83  | }
  84  | 
  85  | async function finishFrames(page: Page): Promise<FrameAudit> {
  86  |   return page.evaluate(async () => (window as unknown as { __axisDone: Promise<FrameAudit> }).__axisDone);
  87  | }
  88  | 
  89  | const cases = ["line", "area", "composed", "scatter", "profit-loss", "category"];
  90  | for (const family of cases) for (const reducedMotion of ["no-preference", "reduce"] as const) {
  91  |   test(`${family} ${reducedMotion}: earliest resize frames retain axis identity, hover and data reads`, async ({ page }) => {
  92  |     await mkdir(evidence, { recursive: true });
  93  |     const intercepted: string[] = [], errors: string[] = [], audits: FrameAudit[] = [];
  94  |     page.on("pageerror", error => errors.push(String(error)));
  95  |     await attachBefore(page, intercepted);
  96  |     await page.emulateMedia({ reducedMotion });
  97  |     await page.goto(`/?axis-resize-audit=${runName}#chart-${family}`);
  98  |     const category = family === "category";
  99  |     if (category) await page.getByRole("combobox", { name: "分类业务场景" }).selectOption("semester");
  100 |     const selector = category ? '[data-category-example="semester"]' : `[data-rain-id="chart-${family}"]`;
  101 |     const host = page.locator(selector);
  102 |     const plot = host.locator(".rain-chart-plot,.rain-category-plot").first();
  103 |     await expect(plot.locator("svg").first()).toBeVisible();
  104 |     await expect(host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first()).toBeVisible();
  105 |     const controls = page.locator(category ? ".rain-category-controls" : "[data-chart-default-controls]");
  106 |     const beforeVisual = await host.locator("span.whitespace-nowrap.text-chart-label.text-xs").first().evaluate(node => ({ color: getComputedStyle(node).color, fontSize: getComputedStyle(node).fontSize }));
  107 |     try {
  108 |       for (const width of [390, 1440]) {
  109 |         await beginFrames(page, selector, width);
  110 |         await page.setViewportSize({ width, height: 1000 });
  111 |         audits.push(await finishFrames(page));
  112 |       }
  113 |       // The data update remains in progress when the responsive shrink begins.
  114 |       await beginFrames(page, selector, 390);
  115 |       await controls.getByRole("button", { name: "更新数据", exact: true }).evaluate(button => (button as HTMLButtonElement).click());
  116 |       await page.setViewportSize({ width: 390, height: 1000 });
  117 |       audits.push(await finishFrames(page));
  118 |       const svg = plot.locator("svg").first(); await svg.scrollIntoViewIfNeeded();
  119 |       const box = (await svg.boundingBox())!;
  120 |       await page.mouse.move(box.x + 80, box.y + box.height / 2);
> 121 |       await expect(host.locator(category ? ".rain-category-tooltip" : ".rain-chart-tooltip")).toBeVisible();
      |                                                                                               ^ Error: expect(locator).toBeVisible() failed
  122 |       await page.mouse.move(0, 0);
  123 |       await host.screenshot({ path: `${evidence}/${family}-${reducedMotion}-390.png` });
  124 |     } finally {
  125 |       await writeFile(`${evidence}/${family}-${reducedMotion}.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, beforeVisual, audits }, null, 2));
  126 |     }
  127 |     expect(errors).toEqual([]);
  128 |     if (baseline) expect(intercepted.length).toBeGreaterThan(0);
  129 |     for (const audit of audits) {
  130 |       expect(audit.samples.filter(sample => sample.reason === "raf")).toHaveLength(8);
  131 |       expect(audit.afterIds).toEqual(audit.beforeIds);
  132 |       expect(audit.samples.every(sample => sample.documentWidth <= sample.viewport + 1), JSON.stringify(audit.samples.map(sample => ({ reason: sample.reason, elapsed: sample.elapsed, width: sample.documentWidth })))).toBe(true);
  133 |       expect(audit.samples.flatMap(sample => sample.ticks).every(tick => tick.color === beforeVisual.color && tick.fontSize === beforeVisual.fontSize)).toBe(true);
  134 |     }
  135 |   });
  136 | }
  137 | 
  138 | test("native consumer: same-size data positions animate normally and mounted media changes become immediate", async ({ page }) => {
  139 |   await mkdir(evidence, { recursive: true });
  140 |   const intercepted: string[] = [], errors: string[] = [];
  141 |   const audits: FrameAudit[] = [];
  142 |   page.on("pageerror", error => errors.push(String(error)));
  143 |   await attachBefore(page, intercepted);
  144 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  145 |   await page.goto(`/?axis-native-consumer=${runName}`);
  146 |   const module = `/@fs${resolve(`${run}/x-axis-consumer.tsx`)}`;
  147 |   await page.evaluate(async module => { await import(/* @vite-ignore */ module); }, module);
  148 |   const host = page.locator("[data-test-axis-host]");
  149 |   await expect(host.getByText("Sep 2", { exact: true })).toBeVisible();
  150 |   const position = () => host.getByText("Sep 2", { exact: true }).evaluate(node => getComputedStyle(node.parentElement!).left);
  151 |   try {
  152 |     await beginFrames(page, "[data-test-axis-host]", null, 40);
  153 |     await page.getByRole("button", { name: "Change time domain" }).click();
  154 |     const normal = await finishFrames(page); audits.push(normal);
  155 |     const normalPositions = normal.samples.filter(sample => sample.reason === "raf").map(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position));
  156 |     expect(normalPositions.some(left => left > 170.5 && left < 299.5)).toBe(true);
  157 |     expect(Number.parseFloat(await position())).toBeCloseTo(170, 3);
  158 |     await page.emulateMedia({ reducedMotion: "reduce" });
  159 |     await beginFrames(page, "[data-test-axis-host]", null, 8);
  160 |     await page.getByRole("button", { name: "Change time domain" }).click();
  161 |     const reduced = await finishFrames(page); audits.push(reduced);
  162 |     // The caller keeps animationDuration=1100; the mounted XAxis must react itself.
  163 |     expect(reduced.samples.filter(sample => sample.reason === "raf").slice(-4).every(sample => Number.parseFloat(sample.ticks.find(tick => tick.label === "Sep 2")!.position) === 300)).toBe(true);
  164 |     expect(reduced.samples.flatMap(sample => sample.ticks).every(tick => !tick.transition.includes("500ms"))).toBe(true);
  165 |     await page.emulateMedia({ reducedMotion: "no-preference" });
  166 |     await beginFrames(page, "[data-test-axis-host]", null, 40);
  167 |     await page.getByRole("button", { name: "Change time domain" }).click();
  168 |     const restored = await finishFrames(page); audits.push(restored);
  169 |     expect(restored.samples.some(sample => sample.ticks.some(tick => tick.label === "Sep 2" && Number.parseFloat(tick.position) > 170.5 && Number.parseFloat(tick.position) < 299.5))).toBe(true);
  170 |   } finally {
  171 |     await writeFile(`${evidence}/native-consumer.json`, JSON.stringify({ baseline, beforeHash, intercepted, errors, audits }, null, 2));
  172 |   }
  173 |   expect(errors).toEqual([]);
  174 | });
  175 | 
```