import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { chromium, expect } from "@playwright/test";

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const host = realpathSync(process.argv[2]);
const evidenceRoot = resolve(process.argv[3] ?? join(workspace, "evidence/runtime/chart-variants/consumer-combinations"));
const evidence = join(evidenceRoot, `run-${new Date().toISOString().replaceAll(":", "-")}`);
const port = Number(process.argv[4] ?? 5185);
const put = (path, value) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, value); };
const hash = path => createHash("sha256").update(readFileSync(path)).digest("hex");
const facts = { startedAt: new Date().toISOString(), command: "node scripts/verify-chart-consumer-combinations.mjs", arguments: process.argv.slice(2), host, port, timeZone: "Asia/Shanghai", publication: "unpublished", sourceMode: "final isolated consumer snapshot with copied installed dependency cache; no clean-install claim", commands: [], checks: [], interactions: [], errors: [] };
const sourcePairs = [
  ["samples/bar-3d-stacked/chart-variants/bar.tsx", "apps/playground/src/docs/components/chart-variants/bar.tsx"],
  ["samples/line-trio-brush/chart-variants/trend.tsx", "apps/playground/src/docs/components/chart-variants/trend.tsx"],
  ["samples/heatmap-pattern-levels/chart-variants/structure.tsx", "apps/playground/src/docs/components/chart-variants/structure.tsx"],
  ["samples/heatmap-pattern-levels/chart-variants/shared.tsx", "apps/playground/src/docs/components/chart-variants/shared.tsx"],
  ["samples/heatmap-pattern-levels/chart-variants/data/world.geojson", "apps/playground/src/docs/components/chart-variants/data/world.geojson"],
  ...["bar-depth.tsx", "chart-brush.tsx", "heatmap/heatmap-chart.tsx", "heatmap/heatmap-colors.ts", "heatmap/heatmap-pattern-defs.tsx", "heatmap/heatmap-legend-swatch.tsx", "heatmap/heatmap-utils.ts"].map(path => [`node_modules/@rain-next/ui/src/charts/vendor/charts/${path}`, `packages/ui/src/charts/vendor/charts/${path}`]),
];
let server;
let browser;

const main = `import { useState } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/charts/styles.css";
import "../samples/heatmap-pattern-levels/chart-examples.css";
import { BarChart, Bar, BarXAxis, BarDepthBack, BarDepthFront, BarDepthProvider, Grid, ReferenceArea, YAxis, ChartTooltip, TooltipContent, buildArcs } from "@rain-next/ui/charts";
import { BarVariant } from "../samples/bar-3d-stacked/chart-variants/bar";
import { TrendVariant } from "../samples/line-trio-brush/chart-variants/trend";
import { StructureVariant } from "../samples/heatmap-pattern-levels/chart-variants/structure";
import { VariantTable, immediate, type VariantSettings } from "../samples/heatmap-pattern-levels/chart-variants/shared";
import { makeHierarchy } from "../samples/heatmap-pattern-levels/chart-data";
import type { ChartRecipe } from "../samples/heatmap-pattern-levels/chart-catalog";

function CombinedBar({ revision, dense, zero }: { revision: number; dense: boolean; zero: boolean }) {
  const data = Array.from({ length: dense ? 60 : 6 }, (_, index) => ({ label: dense ? String(index + 1) : ["一班", "二班", "三班", "四班", "五班", "六班"][index]!, 完成: zero ? 0 : 32 + index * 7 % 54 + revision * 4, 进行中: zero ? 0 : 18 + index * 2 + revision * 2 }));
  const plot = <BarChart data={data} xDataKey="label" stacked={!dense} stackGap={0} barGap={dense ? .1 : .2} className="rain-chart-plot" aspectRatio="" margin={{ top: 40, left: 48, right: 20, bottom: 36 }} animationDuration={0} enterTransition={immediate}>
    <Grid horizontal />
    <ReferenceArea className="consumer-reference" y1={40} y2={70} ifOverflow="visible" pattern="diagonal" patternColor="var(--chart-3)" axisLabelColor="var(--chart-3)" showMarkers />
    {!dense && <BarDepthBack dataKey="完成" color="var(--chart-1)" />}
    <Bar dataKey="完成" fill="var(--chart-1)" animate={false} perspective={!dense} lineCap="butt" minBarHeight={0} />
    {!dense && <Bar dataKey="进行中" fill="var(--chart-2)" animate={false} perspective lineCap="butt" minBarHeight={0} />}
    {!dense && <BarDepthFront dataKey="完成" />}
    <YAxis numTicks={4} /><BarXAxis maxLabels={4} />
    <ChartTooltip className="rain-chart-tooltip" content={({ point }) => <TooltipContent title={String(point.label)} rows={[{ label: "完成", value: String(point.完成) + " 人", color: "var(--chart-1)" }, ...(!dense ? [{ label: "进行中", value: String(point.进行中) + " 人", color: "var(--chart-2)" }] : [])]} />} />
  </BarChart>;
  return <>{dense ? plot : <BarDepthProvider segmentsAccessor={point => [{ value: Number(point.完成), color: "var(--chart-1)" }, { value: Number(point.进行中), color: "var(--chart-2)" }]}>{plot}</BarDepthProvider>}<p>参考区间40—70人；完成与进行中互斥。</p><VariantTable data={data} /></>;
}

function App() {
  const [revision, setRevision] = useState(0);
  const [recipe, setRecipe] = useState<ChartRecipe>("category-wide");
  const [zero, setZero] = useState(false);
  const [active, setActive] = useState(true);
  const [settings, setSettings] = useState<VariantSettings>(() => ({ loading: false, focusId: buildArcs(makeHierarchy(0)).arcs.find(arc => arc.name === "基础课程")!.id }));
  const props = { recipe, revision, replay: 0, active, reduced: true };
  const restored = { ...props, settings, onSettingsChange: (patch: VariantSettings) => setSettings(previous => ({ ...previous, ...patch })) };
  const bars = location.pathname.includes("bars");
  return <MotionConfig reducedMotion="always"><main className="rain-chart" data-recipe={recipe}>
    <h1>{bars ? "独立消费：柱图与参考区间" : "独立消费：Brush、日历与层级"}</h1>
    <div className="controls"><button onClick={() => setRevision(value => value + 1)}>替换数据</button><select aria-label="组合配色" value={recipe} onChange={event => setRecipe(event.target.value as ChartRecipe)}><option value="category-wide">分类</option><option value="monochrome-blue">蓝灰</option></select><button aria-pressed={zero} onClick={() => setZero(value => !value)}>切换零值</button><button aria-pressed={!active} onClick={() => setActive(value => !value)}>切换暂停</button><output aria-label="组合版本">{revision}</output></div>
    {bars ? <div className="grid"><section data-combination="stack"><h2>3D堆叠 + 参考区间</h2><CombinedBar revision={revision} dense={false} zero={zero} /></section><section data-combination="dense"><h2>60点密集柱 + 参考区间</h2><CombinedBar revision={revision} dense zero={zero} /></section><section data-combination="downloaded-bar"><h2>已下载3D堆叠源码</h2><BarVariant {...props} variantId="bar-3d-stacked" /></section></div> : <div className="grid"><section data-combination="brush-a"><h2>Brush A</h2><TrendVariant {...props} variantId="line-trio-brush" /></section><section data-combination="brush-b"><h2>Brush B</h2><TrendVariant {...props} variantId="line-trio-brush" /></section><section data-combination="calendar-a"><h2>日历纹理 A</h2><StructureVariant {...props} variantId="heatmap-pattern-levels" /></section><section data-combination="calendar-b"><h2>日历纹理 B</h2><StructureVariant {...props} variantId="heatmap-pattern-levels" /></section><section data-combination="calendar-scroll"><h2>全年横滚日历</h2><StructureVariant {...props} variantId="heatmap-horizontal-scroll" /></section><section data-combination="hierarchy"><h2>层级分析 · 恢复基础课程</h2><StructureVariant {...restored} variantId="sunburst-legend" /></section><section data-combination="loading-restored"><h2>恢复loading:false</h2><StructureVariant {...restored} variantId="heatmap-loading" /></section></div>}
  </main></MotionConfig>;
}
createRoot(document.getElementById("root")!).render(<App />);
`;

const css = `body{margin:0;font-family:var(--rain-font-ui);color:var(--rain-category-text-neutral-2);background:var(--rain-category-background-neutral-2)}main{max-width:1200px;margin:auto;padding:16px;box-sizing:border-box}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.grid>section{padding:16px;min-width:0;background:var(--rain-category-background-neutral-1);border:1px solid var(--rain-category-border-neutral-3);border-radius:12px}h1{font-size:22px}h2{font-size:16px}.controls{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}.rain-chart-data table{max-width:100%}@media(max-width:600px){.grid{grid-template-columns:minmax(0,1fr)}main{padding:8px}.grid>section{padding:12px}}`;

async function audit(page, name) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), { message: `${name}: responsive geometry settles within the viewport` }).toBe(true);
  const result = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("svg [id]")].map(node => node.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    const missing = [];
    for (const node of document.querySelectorAll("svg *")) for (const attr of ["fill", "stroke", "clip-path", "mask", "filter"]) {
      const id = /url\(["']?#([^)'" ]+)["']?\)/.exec(node.getAttribute(attr) ?? "")?.[1];
      if (id && !document.getElementById(id)) missing.push({ attr, id });
    }
    return { scrollWidth: document.documentElement.scrollWidth, width: innerWidth, svgs: document.querySelectorAll("svg").length, duplicateSvgIds: [...new Set(duplicates)], missingReferences: missing };
  });
  assert.deepEqual(result.duplicateSvgIds, [], `${name}: duplicate SVG IDs`);
  assert.deepEqual(result.missingReferences, [], `${name}: missing SVG reference`);
  assert(result.scrollWidth <= result.width, `${name}: page overflows ${result.scrollWidth}/${result.width}`);
  facts.checks.push({ name, ...result });
}

try {
  facts.sourceSnapshot = sourcePairs.map(([snapshot, canonical]) => {
    const sha256 = hash(join(host, snapshot));
    assert.equal(sha256, hash(join(workspace, canonical)), `Final host is stale: ${canonical}`);
    return { canonical, snapshot, sha256 };
  });
  put(join(host, "consumer-combinations/main.tsx"), main);
  for (const kind of ["bars", "analysis"]) put(join(host, `consumer-combinations-${kind}.html`), `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,"><style>${css}</style><title>Rain组合消费</title></head><body><div id="root"></div><script type="module" src="/consumer-combinations/main.tsx"></script></body></html>`);
  put(join(host, "consumer-combinations/tsconfig.json"), JSON.stringify({ extends: "../tsconfig.json", include: ["./main.tsx", "../env.d.ts"] }, null, 2));
  put(join(host, "consumer-combinations/build.mjs"), `import { build } from "vite";import assert from "node:assert/strict";import { realpathSync,writeFileSync } from "node:fs";import { isAbsolute } from "node:path";const host=realpathSync(process.cwd());await build({root:host,configFile:false,oxc:{jsx:{runtime:"automatic"}},resolve:{alias:[]},build:{outDir:"consumer-combinations/dist",minify:false,rolldownOptions:{input:[host+"/consumer-combinations-bars.html",host+"/consumer-combinations-analysis.html"]}},plugins:[{name:"isolation-audit",generateBundle(){const modules=[...this.getModuleIds()].filter(id=>isAbsolute(id.split("?")[0]));for(const id of modules)assert(realpathSync(id.split("?")[0]).startsWith(host+"/"),"External module "+id);writeFileSync("consumer-combinations/module-paths.json",JSON.stringify({moduleCount:modules.length,externalModulePaths:0,modules},null,2));}}]});`);
  for (const [label, args] of [["typecheck", [join(host, "node_modules/typescript/bin/tsc"), "--project", "consumer-combinations/tsconfig.json"]], ["build", [join(host, "consumer-combinations/build.mjs")]]]) {
    const result = spawnSync(process.execPath, args, { cwd: host, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, env: { ...process.env, NODE_PATH: "" } });
    put(join(evidence, `${label}.log`), `${result.stdout ?? ""}${result.stderr ?? ""}`);
    facts.commands.push({ label, args, exitCode: result.status, cwd: host });
    assert.equal(result.status, 0, `${label} failed`);
  }
  facts.moduleAudit = JSON.parse(readFileSync(join(host, "consumer-combinations/module-paths.json"), "utf8"));
  server = spawn(process.execPath, [join(host, "node_modules/vite/bin/vite.js"), "preview", "--outDir", "consumer-combinations/dist", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], { cwd: host, env: { ...process.env, NODE_PATH: "" } });
  let serverLog = "";
  server.stdout.on("data", data => { serverLog += String(data); });
  server.stderr.on("data", data => { serverLog += String(data); });
  const url = `http://127.0.0.1:${port}`;
  for (let attempt = 0; ; attempt++) {
    try { const response = await fetch(`${url}/consumer-combinations-bars.html`); if (response.ok) break; } catch {}
    assert(attempt < 100 && server.exitCode == null, `Host did not start: ${serverLog}`);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, timezoneId: "Asia/Shanghai", reducedMotion: "reduce" });
  const page = await context.newPage();
  page.on("pageerror", error => facts.errors.push(String(error)));
  page.on("console", message => { if (message.type() === "error") facts.errors.push(message.text()); });
  await page.goto(`${url}/consumer-combinations-bars.html`);
  const stack = page.locator('[data-combination="stack"]');
  const dense = page.locator('[data-combination="dense"]');
  const rects = stack.locator('g[class^="bar-series-"] rect');
  await expect(rects).toHaveCount(12);
  await expect(dense.locator('g[class^="bar-series-"] rect')).toHaveCount(60);
  await expect(stack.locator(".consumer-reference")).toBeVisible();
  await expect(dense.locator(".consumer-reference")).toBeVisible();
  const before = await rects.first().getAttribute("height");
  const color = await rects.first().evaluate(node => getComputedStyle(node).fill);
  await page.getByRole("button", { name: "替换数据", exact: true }).click();
  await expect(rects.first()).not.toHaveAttribute("height", before);
  await page.getByRole("combobox", { name: "组合配色" }).selectOption("monochrome-blue");
  await expect.poll(() => rects.first().evaluate(node => getComputedStyle(node).fill)).not.toBe(color);
  await stack.getByText("查看精确数据", { exact: true }).click();
  await expect(stack.locator("tbody tr").first()).toContainText("36");
  await rects.first().hover();
  await expect(stack.locator(".rain-chart-tooltip")).toContainText("36 人");
  await expect.poll(() => stack.locator(".rain-chart-tooltip").evaluate(node => Number(getComputedStyle(node).opacity) * Number(getComputedStyle(node.firstElementChild).opacity))).toBeGreaterThan(.98);
  facts.interactions.push({ name: "bar-data-and-palette-replacement", originalHeight: before, replacedHeight: await rects.first().getAttribute("height"), originalFill: color, replacedFill: await rects.first().evaluate(node => getComputedStyle(node).fill), stackedBars: 12, denseBars: 60, reference: [40, 70], firstCompletedPeople: 36 });
  await audit(page, "bars-1440-replaced-palette");
  await page.screenshot({ path: join(evidence, "bars-1440-replaced-palette.png"), fullPage: true });
  await page.getByRole("button", { name: "切换零值", exact: true }).click();
  await expect(rects).toHaveCount(12);
  await expect.poll(async () => (await rects.evaluateAll(nodes => nodes.map(node => Number(node.getAttribute("height"))))).every(value => value === 0)).toBe(true);
  await expect(stack.locator(".consumer-reference")).toBeVisible();
  await page.setViewportSize({ width: 390, height: 1000 });
  await audit(page, "bars-390-zero-reference");
  await page.screenshot({ path: join(evidence, "bars-390-zero-reference.png"), fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${url}/consumer-combinations-analysis.html`);
  const brush = page.locator('[data-combination="brush-a"]');
  const otherBrush = page.locator('[data-combination="brush-b"]');
  await expect(brush.locator(".visx-brush-handle-left")).toBeVisible();
  await brush.scrollIntoViewIfNeeded();
  const start = brush.getByRole("slider", { name: "范围开始日期" });
  await start.focus(); await page.keyboard.press("ArrowRight");
  await expect(start).toHaveValue("1");
  await expect(otherBrush.getByRole("slider", { name: "范围开始日期" })).toHaveValue("0");
  await brush.getByText("查看精确数据", { exact: true }).click();
  await expect(brush.locator("tbody tr")).toHaveCount(29);
  const right = brush.locator(".visx-brush-handle-right");
  await right.scrollIntoViewIfNeeded(); const box = await right.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down(); await page.mouse.move(box.x - 100, box.y + box.height / 2, { steps: 8 }); await page.mouse.up();
  await expect(brush.getByRole("slider", { name: "范围结束日期" })).not.toHaveValue("29");
  const chosenStart = await start.inputValue();
  const chosenEnd = await brush.getByRole("slider", { name: "范围结束日期" }).inputValue();
  await page.getByRole("button", { name: "替换数据", exact: true }).click();
  await expect(start).toHaveValue(chosenStart);
  await page.getByRole("combobox", { name: "组合配色" }).selectOption("monochrome-blue");
  const calendar = page.locator('[data-combination="calendar-scroll"]');
  const viewport = calendar.getByRole("region", { name: "全年活动日历，可横向滚动" });
  await calendar.scrollIntoViewIfNeeded();
  await viewport.evaluate(node => { node.scrollLeft = node.scrollWidth - node.clientWidth; });
  const scroll = await viewport.evaluate(node => node.scrollLeft);
  assert(scroll > 0);
  await viewport.locator('rect.visx-heatmap-rect:not([pointer-events="none"])').last().hover();
  await expect(calendar.locator(".rain-chart-tooltip")).toContainText("September 26th 2026");
  await expect(calendar.locator(".rain-chart-tooltip")).toContainText("活跃等级 1 / 4");
  const hierarchy = page.locator('[data-combination="hierarchy"]');
  const legend = hierarchy.getByRole("group", { name: "当前层级图例" });
  await hierarchy.scrollIntoViewIfNeeded();
  await expect(legend.getByRole("button", { name: /视频/ })).toBeVisible();
  await hierarchy.getByRole("button", { name: "返回学习内容", exact: true }).click();
  await expect(legend.getByRole("button", { name: /基础课程/ })).toBeVisible();
  await legend.getByRole("button", { name: /基础课程/ }).click();
  await expect(legend.getByRole("button", { name: /视频/ })).toBeVisible();
  const loading = page.locator('[data-combination="loading-restored"]');
  await loading.scrollIntoViewIfNeeded();
  await loading.getByRole("button", { name: "开始加载", exact: true }).click();
  await expect(loading.getByRole("status")).toContainText("静态占位");
  await loading.getByRole("button", { name: "显示数据", exact: true }).click();
  await expect(loading.getByRole("button", { name: "开始加载", exact: true })).toBeVisible();
  await expect(legend.getByRole("button", { name: /视频/ })).toBeVisible();
  facts.interactions.push({ name: "independent-brush-and-restored-settings", chosenStart, chosenEnd, otherBrushStart: await otherBrush.getByRole("slider", { name: "范围开始日期" }).inputValue(), calendarLastDate: "2026-09-26", calendarLastValueAfterRevision: 1, scrollLeft: scroll, restoredFocusCanReturnAndDrill: true, restoredLoadingCanToggleReadyLoadingReady: true });
  await page.getByRole("button", { name: "切换暂停", exact: true }).click();
  await expect(legend.getByRole("button", { name: /视频/ })).toBeVisible();
  expect(await viewport.evaluate(node => node.scrollLeft)).toBeCloseTo(scroll, 0);
  await audit(page, "analysis-1440-two-brush-two-pattern-calendars-paused");
  await page.screenshot({ path: join(evidence, "analysis-1440-two-instances.png"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 1000 });
  await hierarchy.scrollIntoViewIfNeeded();
  await hierarchy.getByRole("button", { name: "返回学习内容", exact: true }).click();
  await expect(legend.getByRole("button", { name: /进阶课程/ })).toBeVisible();
  await brush.scrollIntoViewIfNeeded(); await brush.getByRole("button", { name: "重置范围", exact: true }).click();
  await expect(brush.locator("tbody tr")).toHaveCount(30);
  await audit(page, "analysis-390-reset-retained-state");
  await page.screenshot({ path: join(evidence, "analysis-390-reset.png"), fullPage: true });
  assert.deepEqual(facts.errors, [], "Consumer browser errors");
  facts.canonicalChanges = facts.sourceSnapshot.filter(file => hash(join(workspace, file.canonical)) !== file.sha256 || hash(join(host, file.snapshot)) !== file.sha256).map(file => file.canonical);
  assert.deepEqual(facts.canonicalChanges, [], "Consumer sources changed during validation");
  facts.sourceStable = true;
  facts.status = "passed";
  facts.finishedAt = new Date().toISOString();
  facts.serverLog = serverLog;
  console.log(`Consumer combinations passed: ${facts.checks.length} audits, 2 isolated entries, 1440/390, no SVG collisions or browser errors. Report: ${join(evidence, "report.json")}`);
} catch (error) {
  facts.status = "failed";
  facts.failure = String(error.stack ?? error);
  console.error(facts.failure);
  process.exitCode = 1;
} finally {
  await browser?.close();
  server?.kill("SIGTERM");
  put(join(evidence, "report.json"), JSON.stringify(facts, null, 2));
  put(join(evidence, "main.tsx"), main);
}
