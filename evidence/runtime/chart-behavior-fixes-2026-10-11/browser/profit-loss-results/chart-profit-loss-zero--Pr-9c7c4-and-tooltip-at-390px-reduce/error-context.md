# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-profit-loss-zero.spec.ts >> [ProfitLossZero] real exact-zero readings, sign geometry and tooltip at 390px reduce
- Location: tests/e2e/chart-profit-loss-zero.spec.ts:43:3

# Error details

```
Error: negative-zero-positive: actual SVG vertices must match exact table readings

negative-zero-positive: actual SVG vertices must match exact table readings

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "盈亏线" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 零线两侧的正负值、连续过零与分段渐变。
  - generic [ref=e11]:
    - heading "图型与可选配方" [level=2] [ref=e12]
    - paragraph [ref=e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - generic:
            - generic:
              - generic: "-1"
              - generic: "-0.5"
              - generic: "0"
              - generic: "0.5"
              - generic: "1"
          - generic:
            - generic: Sep 1
            - generic: Sep 2
            - generic: Sep 3
        - generic [ref=e31]:
          - button "非负值" [ref=e33] [cursor=pointer]
          - button "负值" [ref=e37] [cursor=pointer]
        - paragraph [ref=e40]: 0为基准值，零线高亮；颜色沿用原生正负分段规则。
        - group [ref=e41]:
          - generic "查看精确数据" [active] [ref=e42] [cursor=pointer]
          - generic "精确数据表，可横向滚动" [ref=e43]:
            - table [ref=e44]:
              - caption [ref=e45]: 示例精确数据
              - rowgroup [ref=e46]:
                - row [ref=e47]:
                  - columnheader "日期" [ref=e48]
                  - columnheader "相对基准变化" [ref=e49]
              - rowgroup [ref=e50]:
                - row [ref=e51]:
                  - rowheader "9月1日" [ref=e52]
                  - cell "-1" [ref=e53]
                - row [ref=e54]:
                  - rowheader "9月2日" [ref=e55]
                  - cell "0" [ref=e56]
                - row [ref=e57]:
                  - rowheader "9月3日" [ref=e58]
                  - cell "1" [ref=e59]
      - generic [ref=e60]:
        - generic [ref=e61]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e62]:
            - option "正负与涨跌" [selected]
        - generic [ref=e63]:
          - text: 示例状态
          - combobox "示例状态" [ref=e64]:
            - option "正常" [selected]
            - option "无数据"
            - option "零值"
            - option "单项／单点"
            - option "长标签"
            - option "缺测"
            - option "无效数据"
        - button "更新数据" [ref=e65] [cursor=pointer]
        - button "重播动效" [ref=e67] [cursor=pointer]
      - status [ref=e69]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - group [ref=e70]:
    - generic "调用配置、完整源码与示例数据" [ref=e71] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-examples.tsx"
    - option "chart-variants/profit-loss.tsx"
    - option "chart-variants/shared.tsx"
    - option "chart-data.ts"
    - option "chart-variants/data/README.md"
    - option "chart-variants/data/world.geojson"
    - option "chart-catalog.ts"
    - option "chart-examples.css"
    - option "chart-business/mini-examples.tsx"
    - option "chart-business/mini-data.ts"
    - option "chart-business/mini-layout.ts"
    - option "chart-business/chart-business.css"
    - option "chart-business/matrix-examples.tsx"
    - option "chart-business/matrix-data.ts"
    - option "chart-business/network-examples.tsx"
    - option "chart-business/network-data.ts"
    - option "chart-business/network-page.css"
  - region "全部图表变体" [ref=e72]:
    - navigation "变体分组" [ref=e73]:
      - button "基础结构" [ref=e74] [cursor=pointer]
    - region [ref=e76]:
      - heading "基础结构" [level=2] [ref=e77]
      - region [ref=e79]:
        - generic [ref=e80]:
          - heading "Line Chart - Profit/Loss" [level=3] [ref=e81]
          - paragraph [ref=e82]: 正负分色、零基线与图例；映射独立盈亏页
        - generic [ref=e83]:
          - paragraph [ref=e84]: 本卡使用固定涨跌或正负语义色。
          - generic [ref=e85]:
            - generic [ref=e86]:
              - generic:
                - generic:
                  - generic: "-1"
                  - generic: "-0.5"
                  - generic: "0"
                  - generic: "0.5"
                  - generic: "1"
              - generic:
                - generic: Sep 1
                - generic: Sep 2
                - generic: Sep 3
            - generic [ref=e101]:
              - button "非负值" [ref=e103] [cursor=pointer]
              - button "负值" [ref=e107] [cursor=pointer]
            - paragraph [ref=e110]: 0为基准值，零线高亮；颜色沿用原生正负分段规则。
            - group [ref=e111]:
              - generic "查看精确数据" [ref=e112] [cursor=pointer]
          - generic [ref=e113]:
            - button "更新数据" [ref=e114] [cursor=pointer]
            - button "重播动效" [ref=e116] [cursor=pointer]
            - status [ref=e118]: 示例数据 · 已更新 0 次 · 已减少动效
          - group [ref=e119]:
            - generic "查看本卡代码" [ref=e120] [cursor=pointer]
            - option "main.tsx" [selected]
            - option "index.html"
            - option "chart-variants/trend.tsx"
            - option "chart-variants/shared.tsx"
            - option "chart-variants/profit-loss.tsx"
            - option "chart-variants/data/README.md"
            - option "chart-variants/data/world.geojson"
            - option "chart-data.ts"
            - option "chart-catalog.ts"
            - option "chart-examples.css"
        - link "对应官网示例 （新标签页打开）" [ref=e121] [cursor=pointer]:
          - /url: https://bklit.com/charts/line-chart
          - generic [ref=e122]: 对应官网示例
          - generic [ref=e123]: （新标签页打开）
  - generic [ref=e124]:
    - heading "数据与使用边界" [level=2] [ref=e125]
    - paragraph [ref=e126]: 时间顺序与有限正负值；本例为相对基准的变化量。
    - paragraph [ref=e127]: 正负颜色与涨跌颜色保持各自语义，不泛化成成功或错误。
    - paragraph [ref=e128]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=e129] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - group [ref=e131]:
    - generic "接口与调用示例" [ref=e132] [cursor=pointer]
  - navigation "相关图型" [ref=e133]:
    - link "面积图" [ref=e134] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e136] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e138] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e140] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e142] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e144] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e146] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e148] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e150] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e152] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e154] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e156] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e158] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e160] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e162] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e164] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e166] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e168] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=e170] [cursor=pointer]:
      - /url: "#chart-network"
```

# Test source

```ts
  6   | import { resolve } from "node:path";
  7   | 
  8   | const run = "evidence/runtime/chart-behavior-fixes-2026-10-11";
  9   | const evidence = process.env.RAIN_CHART_PROFIT_LOSS_EVIDENCE_DIR ?? `${run}/browser/profit-loss`;
  10  | const useBaselineSplitter = process.env.RAIN_CHART_PROFIT_LOSS_BASELINE === "1";
  11  | const ownerPath = "packages/ui/src/charts/vendor/charts/profit-loss-segments.ts";
  12  | const fixtureProfiles = [
  13  |   { name: "negative-zero-positive", values: [-1, 0, 1], groups: [[0, 1], [1, 2]], positive: [false, true] },
  14  |   { name: "positive-zero-negative", values: [1, 0, -1], groups: [[0, 1], [1, 2]], positive: [true, false] },
  15  |   { name: "zero-platforms", values: [-2, 0, 0, 3, 0, 0, -2], groups: [[0, 1, 2], [2, 3, 4, 5], [5, 6]], positive: [false, true, false] },
  16  | ];
  17  | const hash = (source: string) => createHash("sha256").update(source).digest("hex");
  18  | 
  19  | async function compile(source: string, name: string) {
  20  |   const viteRequire = createRequire(realpathSync(resolve("node_modules/vite/package.json")));
  21  |   const { transformSync } = await import(viteRequire.resolve("rolldown/utils"));
  22  |   return transformSync(name, source).code as string;
  23  | }
  24  | 
  25  | async function readSegments(paths: Locator) {
  26  |   return paths.evaluateAll(nodes => nodes.map(node => {
  27  |     const path = node as SVGPathElement;
  28  |     const numbers = (path.getAttribute("d")?.match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
  29  |     return {
  30  |       stroke: path.getAttribute("stroke"),
  31  |       d: path.getAttribute("d"),
  32  |       vertices: Array.from({ length: numbers.length / 2 }, (_, index) => ({ x: numbers[index * 2]!, y: numbers[index * 2 + 1]! })),
  33  |       points: Array.from({ length: 31 }, (_, index) => {
  34  |         const point = path.getPointAtLength(path.getTotalLength() * index / 30);
  35  |         return { x: point.x, y: point.y };
  36  |       }),
  37  |       box: { width: path.getBBox().width, height: path.getBBox().height },
  38  |     };
  39  |   }));
  40  | }
  41  | 
  42  | for (const width of [1440, 390]) for (const motion of ["no-preference", "reduce"] as const) {
  43  |   test(`[ProfitLossZero] real exact-zero readings, sign geometry and tooltip at ${width}px ${motion}`, async ({ page }) => {
  44  |     await mkdir(evidence, { recursive: true });
  45  |     await page.setViewportSize({ width, height: 1000 });
  46  |     await page.emulateMedia({ reducedMotion: motion });
  47  |     const source = await readFile("apps/playground/src/docs/components/chart-data.ts", "utf8");
  48  |     const start = source.indexOf("export function makeProfitLoss(");
  49  |     const end = source.indexOf("export function makeLivePoints(", start);
  50  |     expect(start).toBeGreaterThanOrEqual(0);
  51  |     expect(end).toBeGreaterThan(start);
  52  |     const fixtureBody = `export function makeProfitLoss(revision = 0, state = "normal") {
  53  |       if (state === "empty") return [];
  54  |       const profiles = ${JSON.stringify(fixtureProfiles.map(profile => profile.values))};
  55  |       const values = state === "zero" ? Array(7).fill(0) : profiles[revision % profiles.length];
  56  |       return values.map((value, index) => ({ date: new Date(2026, 8, index + 1), value }));
  57  |     }\n\n`;
  58  |     const fixtureModule = await compile(source.slice(0, start) + fixtureBody + source.slice(end), "chart-data.ts");
  59  |     const currentOwner = await readFile(ownerPath, "utf8");
  60  |     const splitterSource = useBaselineSplitter ? await readFile(`${run}/before/${ownerPath}`, "utf8") : currentOwner;
  61  |     const requests: string[] = [];
  62  |     const errors: string[] = [];
  63  |     const snapshots: unknown[] = [];
  64  |     page.on("pageerror", error => errors.push(String(error)));
  65  |     await page.route(url => url.pathname.endsWith("/src/docs/components/chart-data.ts") && !url.searchParams.has("raw"), async route => {
  66  |       requests.push(route.request().url());
  67  |       await route.fulfill({ status: 200, contentType: "application/javascript", body: fixtureModule });
  68  |     });
  69  |     if (useBaselineSplitter) {
  70  |       const baselineModule = await compile(splitterSource, "profit-loss-segments.ts");
  71  |       await page.route(url => url.pathname.endsWith("/charts/profit-loss-segments.ts") && !url.searchParams.has("raw"), async route => {
  72  |         requests.push(route.request().url());
  73  |         await route.fulfill({ status: 200, contentType: "application/javascript", body: baselineModule });
  74  |       });
  75  |     }
  76  |     await page.goto("/#chart-profit-loss");
  77  |     const chart = page.locator('[data-rain-id="chart-profit-loss"]');
  78  |     const controls = page.locator("[data-chart-default-controls]");
  79  |     const svg = chart.locator(".rain-chart-plot svg").first();
  80  |     const paths = chart.locator('[data-slot="profit-loss-line"] path');
  81  |     try {
  82  |       await expect(svg).toBeVisible();
  83  |       await chart.getByText("查看精确数据", { exact: true }).click();
  84  |       for (const [revision, profile] of fixtureProfiles.entries()) {
  85  |         if (revision) await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  86  |         const rows = chart.locator("tbody tr");
  87  |         await expect(rows).toHaveCount(profile.values.length);
  88  |         await expect(rows.locator("td")).toHaveText(profile.values.map(String));
  89  |         await expect(rows.locator("th")).toHaveText(profile.values.map((_, index) => `9月${index + 1}日`));
  90  |         await expect(paths).toHaveCount(profile.positive.length);
  91  |         await expect.poll(async () => {
  92  |           const segments = await readSegments(paths);
  93  |           const size = await svg.evaluate(node => ({ width: Number(node.getAttribute("width")), height: Number(node.getAttribute("height")) }));
  94  |           const innerWidth = size.width - 58 - 24;
  95  |           const innerHeight = size.height - 24 - 38;
  96  |           const min = Math.min(...profile.values), max = Math.max(...profile.values);
  97  |           const padding = (max - min) * .05;
  98  |           const y = (value: number) => (max + padding - value) / (max - min + padding * 2) * innerHeight;
  99  |           return segments.length === profile.groups.length && segments.every((segment, groupIndex) => {
  100 |             const indices = profile.groups[groupIndex]!;
  101 |             return segment.vertices.length === indices.length && segment.vertices.every((vertex, index) => {
  102 |               const rowIndex = indices[index]!;
  103 |               return Math.abs(vertex.x - innerWidth * rowIndex / (profile.values.length - 1)) <= .1 && Math.abs(vertex.y - y(profile.values[rowIndex]!)) <= .1;
  104 |             });
  105 |           });
> 106 |         }, { message: `${profile.name}: actual SVG vertices must match exact table readings` }).toBe(true);
      |                                                                                                 ^ Error: negative-zero-positive: actual SVG vertices must match exact table readings
  107 |         const segments = await readSegments(paths);
  108 |         const zeroY = segments[0]!.vertices.at(-1)!.y;
  109 |         expect(segments.map(segment => segment.stroke)).toEqual(profile.positive.map(positive => positive ? "var(--chart-positive)" : "var(--chart-negative)"));
  110 |         expect(segments.every((segment, index) => segment.points.every(point => Number.isFinite(point.x) && Number.isFinite(point.y) && (profile.positive[index] ? point.y <= zeroY + .1 : point.y >= zeroY - .1)))).toBe(true);
  111 |         const tooltips = [];
  112 |         for (const [index, value] of profile.values.entries()) {
  113 |           await svg.scrollIntoViewIfNeeded();
  114 |           const box = (await svg.boundingBox())!;
  115 |           await page.mouse.move(box.x + 58 + (box.width - 58 - 24) * index / (profile.values.length - 1), box.y + box.height / 2);
  116 |           const tooltip = chart.locator(".rain-chart-tooltip");
  117 |           await expect(tooltip).toBeVisible();
  118 |           await expect(tooltip).toContainText(`9月${index + 1}日`);
  119 |           await expect(tooltip.locator(".tabular-nums")).toHaveText(value > 0 ? `+${value}` : String(value));
  120 |           const color = await tooltip.locator('span[style*="background-color"]').evaluate(node => (node as HTMLElement).style.backgroundColor);
  121 |           expect(color).toBe(value < 0 ? "var(--chart-negative)" : "var(--chart-positive)");
  122 |           tooltips.push({ index, value, text: await tooltip.innerText(), color });
  123 |         }
  124 |         await page.mouse.move(0, 0);
  125 |         snapshots.push({ revision, name: profile.name, values: profile.values, zeroY, segments, tooltips });
  126 |         await chart.screenshot({ path: `${evidence}/${width}-${motion}-${profile.name}.png` });
  127 |       }
  128 |       await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("zero");
  129 |       await expect(chart.locator("tbody tr")).toHaveCount(7);
  130 |       await expect(chart.locator("tbody td")).toHaveText(Array(7).fill("0"));
  131 |       await expect(paths).toHaveCount(1);
  132 |       await expect.poll(() => paths.first().evaluate(node => (node as SVGPathElement).getBBox().height)).toBe(0);
  133 |       await expect(paths.first()).toHaveAttribute("stroke", "var(--chart-positive)");
  134 |       snapshots.push({ allZero: true, segments: await readSegments(paths) });
  135 |       await chart.screenshot({ path: `${evidence}/${width}-${motion}-all-zero.png` });
  136 |       expect(errors).toEqual([]);
  137 |       expect(requests.filter(url => new URL(url).pathname.endsWith("/src/docs/components/chart-data.ts"))).toHaveLength(1);
  138 |       if (useBaselineSplitter) expect(requests.some(url => new URL(url).pathname.endsWith("/charts/profit-loss-segments.ts"))).toBe(true);
  139 |       expect(await readFile(ownerPath, "utf8")).toBe(currentOwner);
  140 |       expect(await readFile("apps/playground/src/docs/components/chart-data.ts", "utf8")).toBe(source);
  141 |     } finally {
  142 |       await chart.screenshot({ path: `${evidence}/${width}-${motion}-final-or-failed.png` });
  143 |       await writeFile(`${evidence}/${width}-${motion}.json`, JSON.stringify({ width, motion, baselineSplitter: useBaselineSplitter, currentOwnerSha256: hash(currentOwner), testedSplitterSha256: hash(splitterSource), appDataSha256: hash(source), testFixtureOnly: true, requests, errors, snapshots, finalSegments: await readSegments(paths) }, null, 2));
  144 |     }
  145 |   });
  146 | }
  147 | 
```