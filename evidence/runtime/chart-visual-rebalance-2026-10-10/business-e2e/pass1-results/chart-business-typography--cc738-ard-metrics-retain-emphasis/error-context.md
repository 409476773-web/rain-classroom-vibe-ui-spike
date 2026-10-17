# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-typography-feedback.spec.ts >> business labels and ordinary mini readings use one 13px hierarchy while card metrics retain emphasis
- Location: tests/e2e/chart-business-typography-feedback.spec.ts:20:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Array [
+   "14px/22px",
    "13px/20px",
  ]
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "迷你图表与业务组合" [level=1] [ref=e8]
      - generic [ref=e9]: 共享候选 · 未发布 · 待视觉审阅
    - paragraph [ref=e10]: 大小条形、轻量趋势、构成与进度，组合进日常阅读数据的地方。
  - generic [ref=e11]:
    - generic [ref=e12]:
      - text: 配色
      - combobox "业务图表配色" [ref=e13]:
        - option "蓝灰单色" [selected]
        - option "蓝紫近邻"
        - option "多色类别"
    - generic [ref=e14]:
      - text: 数据状态
      - combobox "业务数据状态" [ref=e15]:
        - option "正常"
        - option "全零"
        - option "缺测" [selected]
        - option "无效数据"
        - option "无数据"
        - option "单项"
        - option "长名称"
    - button "更新数据" [ref=e16] [cursor=pointer]
    - button "重播动效" [ref=e18] [cursor=pointer]
    - button "按数量排序" [ref=e20] [cursor=pointer]
    - button "只看50人以上" [ref=e22] [cursor=pointer]
    - button "40行场景" [ref=e24] [cursor=pointer]
  - status [ref=e26]: 示例数据 · 更新 0 次 · 已按系统设置减少动效
  - generic [ref=e27]:
    - region [ref=e28]:
      - heading "同一量程，大小都能比较" [level=2] [ref=e29]
      - generic [ref=e30]:
        - generic [ref=e32]:
          - generic:
            - generic:
              - generic "计算机学院"
            - generic:
              - generic "经济管理学院"
            - generic:
              - generic "人文学院"
            - generic:
              - generic "理学院"
            - generic:
              - generic "外国语学院"
        - figure [ref=e43]:
          - list [ref=e44]:
            - listitem [ref=e45]:
              - generic [ref=e46]: 计算机学院
              - generic [ref=e48]: — 人
            - listitem [ref=e49]:
              - generic [ref=e50]: 经济管理学院
              - generic [ref=e53]: 50 人
            - listitem [ref=e54]:
              - generic [ref=e55]: 人文学院
              - generic [ref=e58]: 100 人
            - listitem [ref=e59]:
              - generic [ref=e60]: 理学院
              - generic [ref=e63]: 75 人
            - listitem [ref=e64]:
              - generic [ref=e65]: 外国语学院
              - generic [ref=e68]: 45 人
    - generic [ref=e69]:
      - heading "分组比较与互斥堆叠" [level=2] [ref=e70]
      - generic [ref=e71]:
        - figure "本期与上期参与人数" [ref=e72]:
          - generic [ref=e75]:
            - generic:
              - generic:
                - generic "计算机学院"
              - generic:
                - generic "经济管理学院"
              - generic:
                - generic "人文学院"
              - generic:
                - generic "理学院"
              - generic:
                - generic "外国语学院"
          - paragraph [ref=e91]:
            - generic [ref=e92]: 本期
            - generic [ref=e94]: 上期
          - group [ref=e96]:
            - generic "查看分项读数" [ref=e97]
        - figure "互斥课程构成" [ref=e98]:
          - generic [ref=e101]:
            - generic:
              - generic:
                - generic "计算机学院"
              - generic:
                - generic "经济管理学院"
              - generic:
                - generic "人文学院"
              - generic:
                - generic "理学院"
              - generic:
                - generic "外国语学院"
          - paragraph [ref=e124]:
            - generic [ref=e125]: 已完成
            - generic [ref=e127]: 进行中
            - generic [ref=e129]: 待开始
          - group [ref=e131]:
            - generic "查看分项读数" [ref=e132]
      - generic [ref=e133]:
        - generic [ref=e134]: 评分 7.5 / 10
        - generic [ref=e138]: 相对位置 12 / 60（从前到后）
    - region [ref=e142]:
      - heading "同一图形，两种阅读密度" [level=2] [ref=e143]
      - generic [ref=e144]:
        - region [ref=e145]:
          - heading "数量条" [level=3] [ref=e146]
          - generic [ref=e147]:
            - figure "紧凑" [ref=e148]:
              - generic [ref=e149]: 缺测
            - figure "舒展" [ref=e154]:
              - generic [ref=e155]: 缺测
          - generic [ref=e160]: 本期人数 · 缺测 人
        - region [ref=e162]:
          - heading "构成分段" [level=3] [ref=e163]
          - generic [ref=e164]:
            - figure "紧凑" [ref=e165]:
              - generic [ref=e166]: 缺测
            - figure "舒展" [ref=e171]:
              - generic [ref=e172]: 缺测
          - list [ref=e178]:
            - listitem [ref=e179]:
              - text: 已完成
              - generic [ref=e181]: 缺测 人
            - listitem [ref=e182]:
              - text: 进行中
              - generic [ref=e184]: 3 人
            - listitem [ref=e185]:
              - text: 待开始
              - generic [ref=e187]: 2 人
        - region [ref=e188]:
          - heading "每日柱图" [level=3] [ref=e189]
          - generic [ref=e190]:
            - figure "紧凑" [ref=e191]:
              - generic [ref=e192]: 缺测
            - figure "舒展" [ref=e197]:
              - generic [ref=e198]: 缺测
          - generic [ref=e203]: 近8天每日人数 · 共同上限 88 人
        - region [ref=e205]:
          - heading "小饼" [level=3] [ref=e206]
          - generic [ref=e207]:
            - figure "紧凑" [ref=e208]:
              - generic [ref=e209]: 缺测
            - figure "舒展" [ref=e214]:
              - generic [ref=e215]: 缺测
          - list [ref=e221]:
            - listitem [ref=e222]:
              - text: 已完成
              - generic [ref=e224]: 缺测 人
            - listitem [ref=e225]:
              - text: 进行中
              - generic [ref=e227]: 3 人
            - listitem [ref=e228]:
              - text: 待开始
              - generic [ref=e230]: 2 人
        - region [ref=e231]:
          - heading "环饼" [level=3] [ref=e232]
          - generic [ref=e233]:
            - figure "紧凑" [ref=e234]:
              - generic [ref=e235]: 缺测
            - figure "舒展" [ref=e240]:
              - generic [ref=e241]: 缺测
          - list [ref=e247]:
            - listitem [ref=e248]:
              - text: 已完成
              - generic [ref=e250]: 缺测 人
            - listitem [ref=e251]:
              - text: 进行中
              - generic [ref=e253]: 3 人
            - listitem [ref=e254]:
              - text: 待开始
              - generic [ref=e256]: 2 人
        - region [ref=e257]:
          - heading "完成环" [level=3] [ref=e258]
          - generic [ref=e259]:
            - figure "紧凑" [ref=e260]:
              - generic [ref=e261]: 缺测
            - figure "舒展" [ref=e266]:
              - generic [ref=e267]: 缺测
          - generic [ref=e272]: 完成 缺测 人 · 目标 100 人
        - region [ref=e274]:
          - heading "完成弧" [level=3] [ref=e275]
          - generic [ref=e276]:
            - figure "紧凑" [ref=e277]:
              - generic [ref=e278]: 缺测
            - figure "舒展" [ref=e283]:
              - generic [ref=e284]: 缺测
          - generic [ref=e289]: 完成 缺测 人 · 目标 100 人
        - region [ref=e291]:
          - heading "折线走势" [level=3] [ref=e292]
          - generic [ref=e293]:
            - figure "紧凑" [ref=e294]:
              - generic [ref=e295]: 缺测
            - figure "舒展" [ref=e300]:
              - generic [ref=e301]: 缺测
          - generic [ref=e306]: 近8天每日人数 · 观察变化
        - region [ref=e307]:
          - heading "面积走势" [level=3] [ref=e308]
          - generic [ref=e309]:
            - figure "紧凑" [ref=e310]:
              - generic [ref=e311]: 缺测
            - figure "舒展" [ref=e316]:
              - generic [ref=e317]: 缺测
          - generic [ref=e322]: 近8天每日人数 · 观察变化
    - region [ref=e323]:
      - heading "指标卡：图文就近成组" [level=2] [ref=e324]
      - generic [ref=e325]:
        - article [ref=e326]:
          - heading "本期参与人数" [level=3] [ref=e328]
          - generic [ref=e329]:
            - generic [ref=e330]:
              - generic [ref=e331]: — 人
              - generic [ref=e332]: 缺测
            - paragraph [ref=e335]: 近8天每日人数 · 趋势按自身范围展开
        - article [ref=e336]:
          - heading "课程构成" [level=3] [ref=e338]
          - generic [ref=e339]:
            - generic [ref=e340]:
              - generic [ref=e341]: — 门
              - generic [ref=e342]: 缺测
            - generic [ref=e345]:
              - generic [ref=e346]:
                - text: 已完成
                - generic [ref=e348]: —
              - generic [ref=e349]:
                - text: 进行中
                - generic [ref=e351]: "3"
              - generic [ref=e352]:
                - text: 待开始
                - generic [ref=e354]: "2"
        - article [ref=e355]:
          - heading "目标完成" [level=3] [ref=e357]
          - generic [ref=e358]:
            - generic [ref=e359]:
              - generic [ref=e360]: —
              - generic [ref=e361]: 缺测
            - paragraph [ref=e364]: 已完成 — / 100 项
    - region [ref=e365]:
      - heading "表格：紧凑型号，一起比较" [level=2] [ref=e366]
      - paragraph [ref=e367]: 参与人数共用 0—100 人量程；每日柱图共用 0—88 人量程。面积走势用于看各自变化；点击学院名称读取每个数据点。
      - region "学院数据与迷你图表" [ref=e368]:
        - table [ref=e369]:
          - rowgroup [ref=e370]:
            - row [ref=e371]:
              - columnheader "学院" [ref=e372]
              - columnheader "参与人数" [ref=e373]
              - columnheader "近8天趋势" [ref=e374]
              - columnheader "每日分布" [ref=e375]
              - columnheader "课程构成" [ref=e376]
              - columnheader "目标完成" [ref=e377]
          - rowgroup [ref=e378]:
            - row [ref=e379]:
              - cell [ref=e380]:
                - button "计算机学院" [ref=e381] [cursor=pointer]
              - cell "— 人" [ref=e383]
              - cell "缺测" [ref=e387]
              - cell "缺测" [ref=e391]
              - cell "缺测" [ref=e395]:
                - generic "已完成 — / 进行中 3 / 待开始 2" [ref=e396]: 缺测
              - cell "缺测" [ref=e400]
            - row [ref=e405]:
              - cell [ref=e406]:
                - button "经济管理学院" [ref=e407] [cursor=pointer]
              - cell "50 人" [ref=e409]
              - cell [ref=e414]
              - cell [ref=e427]
              - cell "共 50 门" [ref=e446]:
                - generic "已完成 25 / 进行中 15 / 待开始 10" [ref=e447]: 共 50 门
              - cell "35%" [ref=e456]:
                - generic [ref=e457]:
                  - img [ref=e463]:
                    - generic [ref=e465] [cursor=pointer]
                  - generic [ref=e468]: 35%
            - row [ref=e469]:
              - cell [ref=e470]:
                - button "人文学院" [ref=e471] [cursor=pointer]
              - cell "100 人" [ref=e473]
              - cell [ref=e478]
              - cell [ref=e491]
              - cell "共 100 门" [ref=e510]:
                - generic "已完成 50 / 进行中 30 / 待开始 20" [ref=e511]: 共 100 门
              - cell "50%" [ref=e520]:
                - generic [ref=e521]:
                  - img [ref=e527]:
                    - generic [ref=e529] [cursor=pointer]
                  - generic [ref=e532]: 50%
            - row [ref=e533]:
              - cell [ref=e534]:
                - button "理学院" [ref=e535] [cursor=pointer]
              - cell "75 人" [ref=e537]
              - cell [ref=e542]
              - cell [ref=e555]
              - cell "共 75 门" [ref=e574]:
                - generic "已完成 38 / 进行中 23 / 待开始 14" [ref=e575]: 共 75 门
              - cell "65%" [ref=e584]:
                - generic [ref=e585]:
                  - img [ref=e591]:
                    - generic [ref=e593] [cursor=pointer]
                  - generic [ref=e596]: 65%
            - row [ref=e597]:
              - cell [ref=e598]:
                - button "外国语学院" [ref=e599] [cursor=pointer]
              - cell "45 人" [ref=e601]
              - cell [ref=e606]
              - cell [ref=e619]
              - cell "共 45 门" [ref=e638]:
                - generic "已完成 23 / 进行中 14 / 待开始 8" [ref=e639]: 共 45 门
              - cell "80%" [ref=e648]:
                - generic [ref=e649]:
                  - img [ref=e655]:
                    - generic [ref=e657] [cursor=pointer]
                  - generic [ref=e660]: 80%
    - region [ref=e661]:
      - heading "课程列表：读数就近成组" [level=2] [ref=e662]
      - list [ref=e663]:
        - listitem [ref=e664]:
          - strong [ref=e666]: 计算机学院 · 教学任务
          - generic [ref=e667]: 评分 — / 10
          - generic [ref=e670]:
            - generic [ref=e671]: 缺测
            - generic [ref=e674]: 已完成 — / 100 项
        - listitem [ref=e676]:
          - strong [ref=e678]: 经济管理学院 · 教学任务
          - generic [ref=e679]: 评分 5.0 / 10
          - generic [ref=e683]:
            - img [ref=e689]:
              - generic [ref=e691] [cursor=pointer]
            - generic [ref=e694]:
              - generic [ref=e695]: 35%
              - generic [ref=e696]: 已完成 35 / 100 项
        - listitem [ref=e697]:
          - strong [ref=e699]: 人文学院 · 教学任务
          - generic [ref=e700]: 评分 10.0 / 10
          - generic [ref=e704]:
            - img [ref=e710]:
              - generic [ref=e712] [cursor=pointer]
            - generic [ref=e715]:
              - generic [ref=e716]: 50%
              - generic [ref=e717]: 已完成 50 / 100 项
      - generic [ref=e718]:
        - generic [ref=e719]: 缺测
        - generic [ref=e722]:
          - strong [ref=e723]: 计算机学院 · 本期教学任务
          - paragraph [ref=e724]: 已完成 — / 100 项
  - group [ref=e725]:
    - generic "条形与嵌入组合源码" [ref=e726] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-business/mini-data.ts"
    - option "chart-business/mini-layout.ts"
    - option "chart-business/mini-examples.tsx"
    - option "chart-business/bar-examples.tsx"
    - option "chart-business/embedding-examples.tsx"
    - option "chart-business/chart-business.css"
```

# Test source

```ts
  1   | import { expect, test, type Page } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | 
  4   | const evidence = process.env.RAIN_CHART_EXPERIENCE_EVIDENCE_DIR ? `${process.env.RAIN_CHART_EXPERIENCE_EVIDENCE_DIR}/typography` : "evidence/runtime/chart-mini-typography-feedback-2026-10-09/browser";
  5   | 
  6   | async function openBusiness(page: Page) {
  7   |   await page.emulateMedia({ reducedMotion: "reduce" });
  8   |   await page.goto("/#chart-business");
  9   |   await page.evaluate(() => document.fonts.ready);
  10  |   await expect(page.locator('[data-business="horizontal"] span.text-right.text-xs').first()).toBeVisible();
  11  |   await page.locator(".rain-business-table tbody tr").first().scrollIntoViewIfNeeded();
  12  |   await expect(page.locator(".rain-business-table tbody tr")).toHaveCount(5);
  13  | }
  14  | 
  15  | async function saveFacts(name: string, facts: unknown) {
  16  |   await mkdir(evidence, { recursive: true });
  17  |   await writeFile(`${evidence}/${name}.json`, JSON.stringify(facts, null, 2));
  18  | }
  19  | 
  20  | test("business labels and ordinary mini readings use one 13px hierarchy while card metrics retain emphasis", async ({ page }) => {
  21  |   await openBusiness(page);
  22  |   const labels = await page.locator('[data-business^="horizontal"] span.text-right.text-xs, .rain-business-ranking__label, .rain-business-row-link').evaluateAll(nodes => nodes.map(node => {
  23  |     const css = getComputedStyle(node);
  24  |     return { text: node.textContent, className: node.className, fontSize: css.fontSize, lineHeight: css.lineHeight };
  25  |   }));
  26  |   const ordinarySelector = [
  27  |     ".rain-business-mini-gallery h3", ".rain-business-mini-gallery figcaption", ".rain-business-mini-gallery__description",
  28  |     ".rain-business-mini-legend li", ".rain-business-mini-legend li > span",
  29  |     ".rain-business-reading", ".rain-business-reading small", ".rain-business-number small",
  30  |     ".rain-business-progress-reading strong", ".rain-business-progress-reading > span",
  31  |     ".rain-business-cards p", ".rain-business-composition-reading",
  32  |     ".rain-business-cell-radial", ".rain-business-cell-radial small",
  33  |     ".rain-business-course-list span", ".rain-business-list-progress b", ".rain-business-comfortable-group p",
  34  |   ].join(", ");
  35  |   const ordinary = await page.locator(ordinarySelector).evaluateAll(nodes => nodes.map(node => {
  36  |     const css = getComputedStyle(node);
  37  |     return { text: node.textContent, className: node.className, fontSize: css.fontSize, lineHeight: css.lineHeight };
  38  |   }));
  39  |   const metrics = await page.locator(".rain-business-cards .rain-business-number").evaluateAll(nodes => nodes.map(node => {
  40  |     const css = getComputedStyle(node);
  41  |     return { text: node.textContent, fontSize: css.fontSize, lineHeight: css.lineHeight };
  42  |   }));
  43  |   await page.getByRole("combobox", { name: "业务数据状态" }).selectOption("missing");
  44  |   await expect(page.locator(".rain-business-mini-gallery .rain-business-mini-state").first()).toBeVisible();
  45  |   const states = await page.locator(".rain-business-mini-state").evaluateAll(nodes => nodes.map(node => {
  46  |     const css = getComputedStyle(node);
  47  |     return { text: node.textContent, fontSize: css.fontSize, lineHeight: css.lineHeight };
  48  |   }));
  49  |   await saveFacts("typography", { labels, ordinary, metrics, states });
  50  |   await page.locator(".rain-business-mini-gallery").screenshot({ path: `${evidence}/typography-missing.png` });
  51  |   expect(labels.length).toBeGreaterThanOrEqual(15);
  52  |   expect.soft([...new Set(labels.map(label => label.fontSize))]).toEqual(["13px"]);
  53  |   expect(ordinary.length).toBeGreaterThan(0);
  54  |   expect(states.length).toBeGreaterThan(0);
> 55  |   expect.soft([...new Set([...ordinary, ...states].map(reading => `${reading.fontSize}/${reading.lineHeight}`))]).toEqual(["13px/20px"]);
      |                                                                                                                   ^ Error: expect(received).toEqual(expected) // deep equality
  56  |   expect(metrics).toHaveLength(3);
  57  |   for (const metric of metrics) {
  58  |     expect(metric.fontSize).toBe("28px");
  59  |     expect(metric.lineHeight).toBe("36px");
  60  |   }
  61  | });
  62  | 
  63  | test("card and table trends prefer filled compact areas while the gallery retains both trend forms", async ({ page }) => {
  64  |   await openBusiness(page);
  65  |   const hostTrends = page.locator('.rain-business-cards [data-mini-kind="line"], .rain-business-cards [data-mini-kind="area"], .rain-business-table [data-mini-kind="line"], .rain-business-table [data-mini-kind="area"]');
  66  |   for (const trend of await hostTrends.all()) {
  67  |     await trend.scrollIntoViewIfNeeded();
  68  |     if (await trend.getAttribute("data-mini-kind") === "area") await expect(trend.locator("path.visx-area-closed")).toHaveCount(1);
  69  |   }
  70  |   const trends = await hostTrends.evaluateAll(nodes => nodes.map(node => {
  71  |     const slot = node.querySelector(".rain-business-mini-slot")!.getBoundingClientRect();
  72  |     const fills = [...node.querySelectorAll<SVGPathElement>("path[d]")].map(path => {
  73  |       const css = getComputedStyle(path);
  74  |       const box = path.getBBox();
  75  |       const gradientId = path.getAttribute("fill")?.match(/#([^)'\"]+)/)?.[1];
  76  |       const gradient = gradientId ? document.getElementById(gradientId) : null;
  77  |       const paintedGradient = [...(gradient?.querySelectorAll("stop") ?? [])].some(stop => Number(getComputedStyle(stop).stopOpacity) > 0);
  78  |       return { fill: css.fill, opacity: css.opacity, fillOpacity: css.fillOpacity, closed: /[zZ]\s*$/.test(path.getAttribute("d") ?? ""), paintedGradient, width: box.width, height: box.height };
  79  |     }).filter(path => path.closed && path.paintedGradient && Number(path.opacity) > 0 && Number(path.fillOpacity) > 0 && path.width > 0 && path.height > 0);
  80  |     return { host: node.closest(".rain-business-cards") ? "card" : "table", kind: node.getAttribute("data-mini-kind"), size: node.getAttribute("data-size"), width: slot.width, height: slot.height, fills };
  81  |   }));
  82  |   const gallery = await page.locator('.rain-business-mini-gallery [data-mini-kind="line"], .rain-business-mini-gallery [data-mini-kind="area"]').evaluateAll(nodes => nodes.map(node => ({ kind: node.getAttribute("data-mini-kind"), size: node.getAttribute("data-size") })));
  83  |   await saveFacts("area-hosts", { trends, gallery });
  84  |   await page.locator(".rain-business-cards").screenshot({ path: `${evidence}/area-card.png` });
  85  |   await page.locator(".rain-business-table").screenshot({ path: `${evidence}/area-table.png` });
  86  |   expect(trends).toHaveLength(6);
  87  |   for (const trend of trends) {
  88  |     expect.soft(trend.kind, trend.host).toBe("area");
  89  |     expect.soft(trend.size, trend.host).toBe("compact");
  90  |     expect.soft(trend.width, trend.host).toBe(96);
  91  |     expect.soft(trend.height, trend.host).toBe(32);
  92  |     expect.soft(trend.fills.length, trend.host).toBeGreaterThan(0);
  93  |   }
  94  |   expect(gallery).toEqual([
  95  |     { kind: "line", size: "compact" }, { kind: "line", size: "comfortable" },
  96  |     { kind: "area", size: "compact" }, { kind: "area", size: "comfortable" },
  97  |   ]);
  98  | });
  99  | 
  100 | test("small quantity bars preserve fractions and physical round caps at every table value", async ({ page }) => {
  101 |   await openBusiness(page);
  102 |   const bars = await page.locator(".rain-business-table .rain-data-bar").evaluateAll(nodes => nodes.map(node => {
  103 |     const track = node.getBoundingClientRect();
  104 |     const fill = node.querySelector<HTMLElement>(".rain-data-bar__fill")!;
  105 |     const box = fill.getBoundingClientRect();
  106 |     const css = getComputedStyle(fill);
  107 |     const matrix = new DOMMatrixReadOnly(css.transform === "none" ? undefined : css.transform);
  108 |     const declaredRadius = parseFloat(css.borderTopRightRadius);
  109 |     // Uniform CSS radii are normalized to half the local short side before transforms apply.
  110 |     const usedRadius = Math.min(declaredRadius, fill.offsetWidth / 2, fill.offsetHeight / 2);
  111 |     return { fraction: Number(node.getAttribute("data-fraction")), trackWidth: track.width, trackHeight: track.height, width: box.width, height: box.height,
  112 |       localWidth: fill.offsetWidth, localHeight: fill.offsetHeight, transform: css.transform, a: matrix.a, d: matrix.d,
  113 |       declaredRadius, usedRadius, physicalRadiusX: usedRadius * Math.abs(matrix.a), physicalRadiusY: usedRadius * Math.abs(matrix.d) };
  114 |   }));
  115 |   await saveFacts("quantity-caps", { bars });
  116 |   await page.locator(".rain-business-table").screenshot({ path: `${evidence}/quantity-caps.png` });
  117 |   expect(bars.map(bar => bar.fraction)).toEqual([.25, .5, 1, .75, .45]);
  118 |   for (const bar of bars) {
  119 |     expect.soft(bar.trackHeight, `${bar.fraction}`).toBe(6);
  120 |     expect.soft(bar.width / bar.trackWidth, `${bar.fraction}`).toBeCloseTo(bar.fraction, 3);
  121 |     expect.soft(bar.height, `${bar.fraction}`).toBe(6);
  122 |     expect.soft(bar.a, `${bar.fraction}`).toBeCloseTo(1, 5);
  123 |     expect.soft(bar.d, `${bar.fraction}`).toBeCloseTo(1, 5);
  124 |     expect.soft(bar.physicalRadiusX, `${bar.fraction}`).toBeCloseTo(3, 3);
  125 |     expect.soft(bar.physicalRadiusY, `${bar.fraction}`).toBeCloseTo(3, 3);
  126 |   }
  127 | });
  128 | 
```