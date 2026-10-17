# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-profit-loss-zero.spec.ts >> [ProfitLossZero] real exact-zero readings, sign geometry and tooltip at 390px no-preference
- Location: tests/e2e/chart-profit-loss-zero.spec.ts:43:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-rain-id="chart-profit-loss"]').locator('[data-slot="profit-loss-line"] path')
Expected: 2
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('[data-rain-id="chart-profit-loss"]').locator('[data-slot="profit-loss-line"] path')
    13 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- main [ref=f1e3]:
  - generic [ref=f1e4]:
    - link "返回组件目录" [ref=f1e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=f1e7]:
      - heading "盈亏线" [level=1] [ref=f1e8]
      - generic [ref=f1e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=f1e10]: 零线两侧的正负值、连续过零与分段渐变。
  - generic [ref=f1e11]:
    - heading "图型与可选配方" [level=2] [ref=f1e12]
    - paragraph [ref=f1e13]: Rain 配色、渐变与字体，Bklit 原生几何和交互。示例均为 Mock 数据。
    - generic [ref=f1e14]:
      - generic [ref=f1e15]:
        - generic [ref=f1e16]:
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
        - generic [ref=f1e30]:
          - button "非负值" [ref=f1e32] [cursor=pointer]
          - button "负值" [ref=f1e36] [cursor=pointer]
        - paragraph [ref=f1e39]: 0为基准值，零线高亮；颜色沿用原生正负分段规则。
        - group [ref=f1e40]:
          - generic "查看精确数据" [ref=f1e41] [cursor=pointer]
      - generic [ref=f1e42]:
        - generic [ref=f1e43]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=f1e44]:
            - option "正负与涨跌" [selected]
        - generic [ref=f1e45]:
          - text: 示例状态
          - combobox "示例状态" [ref=f1e46]:
            - option "正常" [selected]
            - option "无数据"
            - option "零值"
            - option "单项／单点"
            - option "长标签"
            - option "缺测"
            - option "无效数据"
        - button "更新数据" [ref=f1e47] [cursor=pointer]
        - button "重播动效" [ref=f1e49] [cursor=pointer]
      - status [ref=f1e51]: 示例数据 · 已更新 0 次
  - group [ref=f1e52]:
    - generic "调用配置、完整源码与示例数据" [ref=f1e53] [cursor=pointer]
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
  - region "全部图表变体" [ref=f1e54]:
    - navigation "变体分组" [ref=f1e55]:
      - button "基础结构" [ref=f1e56] [cursor=pointer]
    - region [ref=f1e58]:
      - heading "基础结构" [level=2] [ref=f1e59]
      - region [ref=f1e61]:
        - generic [ref=f1e62]:
          - heading "Line Chart - Profit/Loss" [level=3] [ref=f1e63]
          - paragraph [ref=f1e64]: 正负分色、零基线与图例；映射独立盈亏页
        - generic [ref=f1e65]:
          - paragraph [ref=f1e66]: 本卡使用固定涨跌或正负语义色。
          - generic [ref=f1e67]:
            - generic [ref=f1e68]:
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
            - generic [ref=f1e82]:
              - button "非负值" [ref=f1e84] [cursor=pointer]
              - button "负值" [ref=f1e88] [cursor=pointer]
            - paragraph [ref=f1e91]: 0为基准值，零线高亮；颜色沿用原生正负分段规则。
            - group [ref=f1e92]:
              - generic "查看精确数据" [ref=f1e93] [cursor=pointer]
          - generic [ref=f1e94]:
            - button "更新数据" [ref=f1e95] [cursor=pointer]
            - button "重播动效" [ref=f1e97] [cursor=pointer]
            - status [ref=f1e99]: 示例数据 · 已更新 0 次
          - group [ref=f1e100]:
            - generic "查看本卡代码" [ref=f1e101] [cursor=pointer]
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
        - link "对应官网示例 （新标签页打开）" [ref=f1e102] [cursor=pointer]:
          - /url: https://bklit.com/charts/line-chart
          - generic [ref=f1e103]: 对应官网示例
          - generic [ref=f1e104]: （新标签页打开）
  - generic [ref=f1e105]:
    - heading "数据与使用边界" [level=2] [ref=f1e106]
    - paragraph [ref=f1e107]: 时间顺序与有限正负值；本例为相对基准的变化量。
    - paragraph [ref=f1e108]: 正负颜色与涨跌颜色保持各自语义，不泛化成成功或错误。
    - paragraph [ref=f1e109]:
      - text: 悬停与图例聚焦辅助读取，精确表提供可访问的完整数值。语义配色保持稳定；
      - link "查看条形和迷你图表在表格、卡片、列表中的组合" [ref=f1e110] [cursor=pointer]:
        - /url: "#chart-business"
      - text: 。
  - group [ref=f1e112]:
    - generic "接口与调用示例" [ref=f1e113] [cursor=pointer]
  - navigation "相关图型" [ref=f1e114]:
    - link "面积图" [ref=f1e115] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=f1e117] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=f1e119] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=f1e121] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=f1e123] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=f1e125] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=f1e127] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=f1e129] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=f1e131] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=f1e133] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=f1e135] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=f1e137] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=f1e139] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=f1e141] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=f1e143] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=f1e145] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=f1e147] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=f1e149] [cursor=pointer]:
      - /url: "#chart-matrix"
    - link "网络关系图" [ref=f1e151] [cursor=pointer]:
      - /url: "#chart-network"
```

# Test source

```ts
  1   | import { expect, test, type Locator } from "@playwright/test";
  2   | import { createHash } from "node:crypto";
  3   | import { mkdir, readFile, writeFile } from "node:fs/promises";
  4   | import { createRequire } from "node:module";
  5   | import { resolve } from "node:path";
  6   | 
  7   | const run = "evidence/runtime/chart-behavior-fixes-2026-10-11";
  8   | const evidence = process.env.RAIN_CHART_PROFIT_LOSS_EVIDENCE_DIR ?? `${run}/browser/profit-loss`;
  9   | const useBaselineSplitter = process.env.RAIN_CHART_PROFIT_LOSS_BASELINE === "1";
  10  | const ownerPath = "packages/ui/src/charts/vendor/charts/profit-loss-segments.ts";
  11  | const fixtureProfiles = [
  12  |   { name: "negative-zero-positive", values: [-1, 0, 1], groups: [[0, 1], [1, 2]], positive: [false, true] },
  13  |   { name: "positive-zero-negative", values: [1, 0, -1], groups: [[0, 1], [1, 2]], positive: [true, false] },
  14  |   { name: "zero-platforms", values: [-2, 0, 0, 3, 0, 0, -2], groups: [[0, 1, 2], [2, 3, 4, 5], [5, 6]], positive: [false, true, false] },
  15  | ];
  16  | const hash = (source: string) => createHash("sha256").update(source).digest("hex");
  17  | 
  18  | async function compile(source: string, name: string) {
  19  |   const rootRequire = createRequire(resolve("package.json"));
  20  |   const viteRequire = createRequire(rootRequire.resolve("vite"));
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
  81  |     const { scaleLinear } = await import(createRequire(resolve("packages/ui/package.json")).resolve("@visx/scale"));
  82  |     try {
  83  |       await expect(svg).toBeVisible();
  84  |       await chart.getByText("查看精确数据", { exact: true }).click();
  85  |       for (const [revision, profile] of fixtureProfiles.entries()) {
  86  |         if (revision) await controls.getByRole("button", { name: "更新数据", exact: true }).click();
  87  |         const rows = chart.locator("tbody tr");
  88  |         await expect(rows).toHaveCount(profile.values.length);
  89  |         await expect(rows.locator("td")).toHaveText(profile.values.map(String));
  90  |         await expect(rows.locator("th")).toHaveText(profile.values.map((_, index) => `9月${index + 1}日`));
> 91  |         await expect(paths).toHaveCount(profile.positive.length);
      |                             ^ Error: expect(locator).toHaveCount(expected) failed
  92  |         await expect.poll(async () => {
  93  |           const segments = await readSegments(paths);
  94  |           const size = await svg.evaluate(node => ({ width: Number(node.getAttribute("width")), height: Number(node.getAttribute("height")) }));
  95  |           const innerWidth = size.width - 58 - 24;
  96  |           const innerHeight = size.height - 24 - 38;
  97  |           const min = Math.min(...profile.values), max = Math.max(...profile.values);
  98  |           const padding = (max - min) * .05;
  99  |           const y = scaleLinear({ domain: [min - padding, max + padding], range: [innerHeight, 0], nice: true });
  100 |           return segments.length === profile.groups.length && segments.every((segment, groupIndex) => {
  101 |             const indices = profile.groups[groupIndex]!;
  102 |             return segment.vertices.length === indices.length && segment.vertices.every((vertex, index) => {
  103 |               const rowIndex = indices[index]!;
  104 |               return Math.abs(vertex.x - innerWidth * rowIndex / (profile.values.length - 1)) <= .1 && Math.abs(vertex.y - y(profile.values[rowIndex]!)) <= .1;
  105 |             });
  106 |           });
  107 |         }, { message: `${profile.name}: actual SVG vertices must match exact table readings` }).toBe(true);
  108 |         const segments = await readSegments(paths);
  109 |         const zeroY = segments[0]!.vertices.at(-1)!.y;
  110 |         expect(segments.map(segment => segment.stroke)).toEqual(profile.positive.map(positive => positive ? "var(--chart-positive)" : "var(--chart-negative)"));
  111 |         expect(segments.every((segment, index) => segment.points.every(point => Number.isFinite(point.x) && Number.isFinite(point.y) && (profile.positive[index] ? point.y <= zeroY + .1 : point.y >= zeroY - .1)))).toBe(true);
  112 |         const tooltips = [];
  113 |         for (const [index, value] of profile.values.entries()) {
  114 |           await svg.scrollIntoViewIfNeeded();
  115 |           const box = (await svg.boundingBox())!;
  116 |           const tooltip = chart.locator(".rain-chart-tooltip");
  117 |           await expect.poll(async () => {
  118 |             await page.mouse.move(0, 0);
  119 |             await page.mouse.move(box.x + 58 + (box.width - 58 - 24) * index / (profile.values.length - 1), box.y + box.height / 2);
  120 |             return tooltip.isVisible();
  121 |           }, { message: "real hover becomes interactive after the chart reveal" }).toBe(true);
  122 |           await expect(tooltip).toContainText(`9月${index + 1}日`);
  123 |           await expect(tooltip.locator(".tabular-nums")).toHaveText(value > 0 ? `+${value}` : String(value));
  124 |           const color = await tooltip.locator('span[style*="background-color"]').evaluate(node => (node as HTMLElement).style.backgroundColor);
  125 |           expect(color).toBe(value < 0 ? "var(--chart-negative)" : "var(--chart-positive)");
  126 |           tooltips.push({ index, value, text: await tooltip.innerText(), color });
  127 |         }
  128 |         await page.mouse.move(0, 0);
  129 |         snapshots.push({ revision, name: profile.name, values: profile.values, zeroY, segments, tooltips });
  130 |         await chart.screenshot({ path: `${evidence}/${width}-${motion}-${profile.name}.png` });
  131 |       }
  132 |       await controls.getByRole("combobox", { name: "示例状态", exact: true }).selectOption("zero");
  133 |       await expect(chart.locator("tbody tr")).toHaveCount(7);
  134 |       await expect(chart.locator("tbody td")).toHaveText(Array(7).fill("0"));
  135 |       await expect(paths).toHaveCount(1);
  136 |       await expect.poll(() => paths.first().evaluate(node => (node as SVGPathElement).getBBox().height)).toBe(0);
  137 |       await expect(paths.first()).toHaveAttribute("stroke", "var(--chart-positive)");
  138 |       snapshots.push({ allZero: true, segments: await readSegments(paths) });
  139 |       await chart.screenshot({ path: `${evidence}/${width}-${motion}-all-zero.png` });
  140 |       expect(errors).toEqual([]);
  141 |       expect(requests.filter(url => new URL(url).pathname.endsWith("/src/docs/components/chart-data.ts"))).toHaveLength(1);
  142 |       if (useBaselineSplitter) expect(requests.some(url => new URL(url).pathname.endsWith("/charts/profit-loss-segments.ts"))).toBe(true);
  143 |       expect(await readFile(ownerPath, "utf8")).toBe(currentOwner);
  144 |       expect(await readFile("apps/playground/src/docs/components/chart-data.ts", "utf8")).toBe(source);
  145 |     } finally {
  146 |       await chart.screenshot({ path: `${evidence}/${width}-${motion}-final-or-failed.png` });
  147 |       await writeFile(`${evidence}/${width}-${motion}.json`, JSON.stringify({ width, motion, baselineSplitter: useBaselineSplitter, currentOwnerSha256: hash(currentOwner), testedSplitterSha256: hash(splitterSource), appDataSha256: hash(source), testFixtureOnly: true, requests, errors, snapshots, finalSegments: await readSegments(paths) }, null, 2));
  148 |     }
  149 |   });
  150 | }
  151 | 
```