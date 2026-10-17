import { useState } from "react";
import { DocCode } from "./component-doc";
import type { ChartId, ChartRecipe } from "./chart-catalog";
import examples from "./chart-examples.tsx?raw";
import data from "./chart-data.ts?raw";
import catalog from "./chart-catalog.ts?raw";
import styles from "./chart-examples.css?raw";
import miniExamples from "./chart-business/mini-examples.tsx?raw";
import miniData from "./chart-business/mini-data.ts?raw";
import miniLayout from "./chart-business/mini-layout.ts?raw";
import businessStyles from "./chart-business/chart-business.css?raw";
import barExamples from "./chart-business/bar-examples.tsx?raw";
import embeddingExamples from "./chart-business/embedding-examples.tsx?raw";
import matrixExamples from "./chart-business/matrix-examples.tsx?raw";
import matrixData from "./chart-business/matrix-data.ts?raw";
import categoryExamples from "./chart-business/category-examples.tsx?raw";
import comparisonData from "./chart-business/comparison-data.ts?raw";
import categoryStyles from "./chart-business/category-page.css?raw";
import type { CategoryChartSettings } from "./chart-business/category-page";
import networkExamples from "./chart-business/network-examples.tsx?raw";
import networkData from "./chart-business/network-data.ts?raw";
import networkStyles from "./chart-business/network-page.css?raw";
import type { NetworkChartSettings } from "./chart-business/network-page";
import type { BusinessChartState } from "./chart-business/mini-data";
import type { MiniSize } from "./chart-business/mini-layout";
import type { ChartState } from "./chart-data";
import type { VariantSettings } from "./chart-variants/shared";
import type { ChartVariant } from "./chart-variants";

const variantModules = import.meta.glob("./chart-variants/*.tsx", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const variantData = import.meta.glob("./chart-variants/data/*", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const variantFamilies: Record<string, { file: string; component: string }> = {
  bar: { file: "bar", component: "BarVariant" },
  area: { file: "trend", component: "TrendVariant" }, line: { file: "trend", component: "TrendVariant" }, composed: { file: "trend", component: "TrendVariant" }, "profit-loss": { file: "trend", component: "TrendVariant" },
  pie: { file: "radial", component: "RadialVariant" }, ring: { file: "radial", component: "RadialVariant" }, radar: { file: "radial", component: "RadialVariant" },
  scatter: { file: "comparison", component: "ComparisonVariant" }, funnel: { file: "comparison", component: "ComparisonVariant" }, gauge: { file: "comparison", component: "ComparisonVariant" },
  heatmap: { file: "structure", component: "StructureVariant" }, choropleth: { file: "structure", component: "StructureVariant" }, sankey: { file: "structure", component: "StructureVariant" }, sunburst: { file: "structure", component: "StructureVariant" },
  candlestick: { file: "special", component: "SpecialVariant" }, "live-line": { file: "special", component: "SpecialVariant" },
};

export function chartVariantFiles(variant: ChartVariant, recipe: ChartRecipe, revision = 0, replay = 0, reduced = false, curveName?: string, settings: VariantSettings = {}) {
  const family = variantFamilies[variant.chartId]!;
  return {
    "main.tsx": `import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/charts/styles.css";
import "./chart-examples.css";
import { ${family.component} } from "./chart-variants/${family.file}";
import { useChartReducedMotion, type VariantSettings } from "./chart-variants/shared";

function App() {
  const [settings, setSettings] = useState<VariantSettings>(${JSON.stringify(settings)});
  const [curveName, setCurveName] = useState<string | undefined>(${JSON.stringify(curveName) ?? "undefined"});
  const userReduced = useChartReducedMotion();
  const [active, setActive] = useState(!document.hidden);
  useEffect(() => {
    const change = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", change);
    return () => document.removeEventListener("visibilitychange", change);
  }, []);
  return <MotionConfig reducedMotion="user">
    <main className="rain-chart" data-recipe="${recipe}" style={{ maxWidth: 880, margin: "auto", padding: "var(--rain-space-24)" }}>
      <${family.component} variantId="${variant.id}" recipe="${recipe}" revision={${revision}} replay={${replay}} reduced={${reduced} || userReduced} active={active} settings={settings} onSettingsChange={patch => setSettings(previous => ({ ...previous, ...patch }))} curveName={curveName} onCurveChange={setCurveName} />
    </main>
  </MotionConfig>;
}
createRoot(document.getElementById("root")!).render(<App />);`,
    "index.html": '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rain 图表变体</title></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>',
    [`chart-variants/${family.file}.tsx`]: variantModules[`./chart-variants/${family.file}.tsx`]!,
    "chart-variants/shared.tsx": variantModules["./chart-variants/shared.tsx"]!,
    ...(family.file === "trend" ? { "chart-variants/profit-loss.tsx": variantModules["./chart-variants/profit-loss.tsx"]! } : {}),
    ...Object.fromEntries(Object.entries(variantData).map(([path, source]) => [path.replace("./", ""), source])),
    "chart-data.ts": data, "chart-catalog.ts": catalog, "chart-examples.css": styles,
  } as Record<string, string>;
}

export function ChartVariantSource({ variant, recipe, revision, replay, reduced, curveName, settings }: { variant: ChartVariant; recipe: ChartRecipe; revision: number; replay: number; reduced: boolean; curveName?: string; settings?: VariantSettings }) {
  const [selected, setSelected] = useState("main.tsx");
  const files = chartVariantFiles(variant, recipe, revision, replay, reduced, curveName, settings);
  return <details className="rain-chart-source"><summary>查看本卡代码</summary>
    <p>按下列路径保存文件，在 React / Vite 宿主使用本地候选 <code>@rain-next/ui/charts</code>。源码使用公共入口，依赖为 Rain Foundations、React、Motion 和 GeoJSON 类型。</p>
    <div className="rain-chart-source__files">{Object.entries(files).map(([name, source]) => <a key={name} download={name} href={`data:text/plain;charset=utf-8,${encodeURIComponent(source)}`}>下载 {name}</a>)}</div>
    <label>查看文件 <select aria-label="本卡源码文件" value={selected} onChange={event => setSelected(event.target.value)}>{Object.keys(files).map(name => <option key={name}>{name}</option>)}</select></label>
    <DocCode code={files[selected]!} />
  </details>;
}

export function chartExampleCode(id: ChartId, recipe: ChartRecipe, state: ChartState = "normal", size: "standard"|"mini" = "standard", matrixSize:4|6|12 = 6, miniSize: MiniSize = "compact", seriesCount: 3|5 = 3, revision = 0, descending = false) {
  if (id === "network" && state !== "zero" && state !== "missing") return chartNetworkFiles({ fixtureId:"all", recipe, state, revision, relation:"all" })["main.tsx"]!;
  if (id === "matrix") return `import { createRoot } from "react-dom/client";
import { useState } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { Button } from "@rain-next/ui";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "@rain-next/ui/charts/styles.css";
import "./chart-business/chart-business.css";
import { MatrixExamples } from "./chart-business/matrix-examples";
function App() {
  const [revision,setRevision] = useState(${revision});
  const [replay,setReplay] = useState(0);
  const reduced = !!useReducedMotion();
  return <MotionConfig reducedMotion="user"><main className="rain-chart" data-recipe="${recipe}" style={{ maxWidth:880,margin:"auto",padding:"var(--rain-space-24)" }}>
    <h1>分类矩阵</h1>
    <div className="rain-business-controls"><Button size="small" variant="secondary" onClick={()=>setRevision(value=>value+1)}>更新数据</Button><Button size="small" variant="secondary" onClick={()=>setReplay(value=>value+1)}>重播动效</Button></div>
    <MatrixExamples recipe="${recipe}" state="${state}" revision={revision} reduced={reduced} replay={replay} initialSize={${matrixSize}} descending={${descending}} />
  </main></MotionConfig>;
}
createRoot(document.getElementById("root")!).render(<App />);`;
  return `import { createRoot } from "react-dom/client";
import { useState } from "react";
import { MotionConfig } from "motion/react";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import { ChartExample } from "./chart-examples";
import { useChartReducedMotion } from "./chart-variants/shared";

function App() {
  const [revision, setRevision] = useState(${revision});
  const reduced = useChartReducedMotion();
  return <MotionConfig reducedMotion="user">
    <main style={{ maxWidth: 880, margin: "auto", padding: "var(--rain-space-24)" }}>
      <button onClick={() => setRevision(value => value + 1)}>更新数据</button>
      <div className="rain-chart" data-rain-id="chart-${id}" data-recipe="${recipe}">
        <ChartExample id="${id}" recipe="${recipe}" revision={revision} reduced={reduced} state="${state}" size="${size}" miniSize="${miniSize}" seriesCount={${seriesCount}} />
      </div>
    </main>
  </MotionConfig>;
}

createRoot(document.getElementById("root")!).render(<App />);`;
}

export type BusinessDownloadSettings = { recipe: ChartRecipe; state: BusinessChartState; revision: number; descending: boolean; many: boolean; filter: boolean };
export function chartBusinessFiles(settings: BusinessDownloadSettings): Record<string,string> {
  return {
    "main.tsx": `import { useState } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig, useReducedMotion } from "motion/react";
import { Button } from "@rain-next/ui";
import type { RainChartRecipe } from "@rain-next/ui/charts";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "@rain-next/ui/charts/styles.css";
import "./chart-business/chart-business.css";
import { makeMiniRows, getComparisonMax, getTrendComparisonMax, selectMiniRows, type BusinessChartState } from "./chart-business/mini-data";
import { HorizontalBarComparison, HorizontalBarExample, RankingBars, RelativeBarExamples } from "./chart-business/bar-examples";
import { MiniGallery } from "./chart-business/mini-examples";
import { EmbeddingExamples } from "./chart-business/embedding-examples";
const settings: { recipe: RainChartRecipe; state: BusinessChartState; revision: number; descending: boolean; many: boolean; filter: boolean } = ${JSON.stringify(settings)};
function App() {
  const [revision,setRevision] = useState<number>(settings.revision);
  const reduced = !!useReducedMotion();
  const original = makeMiniRows(revision,settings.state);
  const maxValue = settings.state === "invalid" ? 0 : getComparisonMax(original);
  const trendMaxValue = settings.state === "invalid" ? 0 : getTrendComparisonMax(original);
  const rows = selectMiniRows(original,settings);
  return <MotionConfig reducedMotion="user"><main className="rain-chart rain-chart-business" data-recipe={settings.recipe} style={{ maxWidth:1080,margin:"auto",padding:24 }}>
    <h1>条形与迷你图表组合</h1><Button size="small" variant="secondary" onClick={()=>setRevision(value=>value+1)}>更新数据</Button>
    {settings.state === "invalid" ? <p role="alert">无效数据</p> : !rows.length ? <p role="status">暂无数据</p> : <>
      <section className="rain-business-section"><h2>同一量程，大小都能比较</h2><div className="rain-business-bars"><HorizontalBarExample rows={rows.slice(0,5)} maxValue={maxValue} reduced={reduced} /><RankingBars rows={rows.slice(0,5)} maxValue={maxValue} /></div></section>
      <section className="rain-business-section"><h2>分组与堆叠</h2><div className="rain-business-bars"><HorizontalBarComparison rows={rows.slice(0,5)} maxValue={maxValue} reduced={reduced} /><HorizontalBarComparison rows={rows.slice(0,5)} maxValue={maxValue} stacked reduced={reduced} /></div><RelativeBarExamples /></section>
      <section className="rain-business-section"><h2>独立小图</h2><MiniGallery row={rows[0]!} maxValue={maxValue} trendMaxValue={trendMaxValue} reduced={reduced} /></section>
      <EmbeddingExamples rows={rows} maxValue={maxValue} trendMaxValue={trendMaxValue} reduced={reduced} />
    </>}
  </main></MotionConfig>;
}
createRoot(document.getElementById("root")!).render(<App />);`,
    "index.html": '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rain 迷你图表</title></head><body style="margin:0"><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>',
    "chart-business/mini-data.ts": miniData, "chart-business/mini-layout.ts": miniLayout, "chart-business/mini-examples.tsx": miniExamples,
    "chart-business/bar-examples.tsx": barExamples,"chart-business/embedding-examples.tsx": embeddingExamples,
    "chart-business/chart-business.css": businessStyles,
  };
}

export function ChartBusinessSource({ settings }: { settings: BusinessDownloadSettings }) {
  const files = chartBusinessFiles(settings);
  const [selected,setSelected] = useState("main.tsx");
  return <details className="rain-chart-source" data-source="business"><summary>条形与嵌入组合源码</summary>
    <p>当前配色、状态、量程、排序与筛选随配置保存。源码复用本页实际图形和宿主组件；在已有 Rain React 工作区使用。</p>
    <div className="rain-chart-source__files">{Object.entries(files).map(([name,source])=><a key={name} download={name} href={`data:text/plain;charset=utf-8,${encodeURIComponent(source)}`}>下载 {name}</a>)}</div>
    <label>查看文件<select aria-label="业务图表源码文件" value={selected} onChange={event=>setSelected(event.target.value)}>{Object.keys(files).map(name=><option key={name}>{name}</option>)}</select></label>
    <DocCode code={files[selected]!} />
  </details>;
}

export type ChartExampleDownloadProps = { id: ChartId; recipe: ChartRecipe; state?: ChartState; size?: "standard"|"mini"; matrixSize?:4|6|12; miniSize?: MiniSize; seriesCount?: 3|5; revision?: number; descending?: boolean };

export function chartCategoryFiles(settings: CategoryChartSettings): Record<string, string> {
  return {
    "main.tsx": `import { useState } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig, useReducedMotion } from "motion/react";
import { Button } from "@rain-next/ui";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "@rain-next/ui/charts/styles.css";
import "./chart-business/category-page.css";
import { CategoryExamples } from "./chart-business/category-examples";
const settings = ${JSON.stringify(settings)} as const;
function App() {
  const [revision, setRevision] = useState<number>(settings.revision);
  const [replay, setReplay] = useState<number>(settings.replay);
  const reduced = !!useReducedMotion();
  return <MotionConfig reducedMotion="user"><main className="rain-chart-category" style={{ margin:"auto",padding:24 }}>
    <h1>分类趋势与业务对照</h1>
    <div className="rain-category-controls"><Button size="small" variant="secondary" onClick={()=>setRevision(value=>value+1)}>更新数据</Button><Button size="small" variant="secondary" onClick={()=>setReplay(value=>value+1)}>重播动效</Button></div>
    <CategoryExamples fixtureId={${settings.fixtureId === "all" ? "undefined" : JSON.stringify(settings.fixtureId)}} state={settings.state} revision={revision} replay={replay} descending={settings.descending} recipe={settings.recipe} reduced={reduced} />
  </main></MotionConfig>;
}
createRoot(document.getElementById("root")!).render(<App />);`,
    "index.html": '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rain 分类业务图表</title></head><body style="margin:0"><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>',
    "chart-business/category-examples.tsx": categoryExamples,
    "chart-business/comparison-data.ts": comparisonData,
    "chart-business/category-page.css": categoryStyles,
  };
}

export function ChartCategorySource({ settings }: { settings: CategoryChartSettings }) {
  const [selected, setSelected] = useState("main.tsx");
  const files = chartCategoryFiles(settings);
  return <details className="rain-chart-source"><summary>分类图表配置、完整源码与示例数据</summary>
    <p>下载保留当前场景、状态、更新次数、类别顺序与配色，包含真实分类图形和周期对齐数据；在已有 Rain React 工作区使用。</p>
    <div className="rain-chart-source__files">{Object.entries(files).map(([name, source]) => <a key={name} download={name} href={`data:text/plain;charset=utf-8,${encodeURIComponent(source)}`}>下载 {name}</a>)}</div>
    <label>查看文件<select aria-label="分类图表源码文件" value={selected} onChange={event => setSelected(event.target.value)}>{Object.keys(files).map(name => <option key={name}>{name}</option>)}</select></label>
    <DocCode code={files[selected]!} />
  </details>;
}

export function chartExampleFiles({ id, recipe, state = "normal", size = "standard", matrixSize = 6, miniSize = "compact", seriesCount = 3, revision = 0, descending = false }: ChartExampleDownloadProps): Record<string, string> {
  if (id === "network" && state !== "zero" && state !== "missing") return chartNetworkFiles({ fixtureId:"all", recipe, state, revision, relation:"all" });
  if (id === "matrix") return {
    "main.tsx": chartExampleCode(id, recipe, state, size, matrixSize, miniSize, seriesCount, revision, descending),
    "index.html": '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rain 分类矩阵</title></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>',
    "chart-business/matrix-examples.tsx": matrixExamples, "chart-business/matrix-data.ts": matrixData,
    "chart-business/chart-business.css": businessStyles, "chart-data.ts": data,
    "chart-variants/data/world.geojson": variantData["./chart-variants/data/world.geojson"]!,
  };
  return {
    "main.tsx": chartExampleCode(id, recipe, state, size, matrixSize, miniSize, seriesCount, revision),
    "index.html": '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rain 图表</title></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>',
    "chart-examples.tsx": examples, "chart-variants/profit-loss.tsx": variantModules["./chart-variants/profit-loss.tsx"]!, "chart-variants/shared.tsx": variantModules["./chart-variants/shared.tsx"]!, "chart-data.ts": data,
    ...Object.fromEntries(Object.entries(variantData).map(([path, source]) => [path.replace("./", ""), source])),
    "chart-catalog.ts": catalog, "chart-examples.css": styles,
    "chart-business/mini-examples.tsx": miniExamples, "chart-business/mini-data.ts": miniData, "chart-business/mini-layout.ts": miniLayout, "chart-business/chart-business.css": businessStyles,
    "chart-business/matrix-examples.tsx":matrixExamples,"chart-business/matrix-data.ts":matrixData,
    "chart-business/network-examples.tsx":networkExamples,"chart-business/network-data.ts":networkData,"chart-business/network-page.css":networkStyles,
  };
}

export function chartNetworkFiles(settings: NetworkChartSettings): Record<string, string> {
  return {
    "main.tsx": `import { useState } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig, useReducedMotion } from "motion/react";
import { Button } from "@rain-next/ui";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "@rain-next/ui/charts/styles.css";
import { NetworkExamples } from "./chart-business/network-examples";
const settings = ${JSON.stringify({ ...settings, variant: settings.variant ?? "glow" })} as const;
function App() {
  const [revision, setRevision] = useState<number>(settings.revision);
  const reduced = !!useReducedMotion();
  return <MotionConfig reducedMotion="user"><main className="rain-chart-network" style={{ margin:"auto",padding:24 }}>
    <h1>网络关系图</h1>
    <Button size="small" variant="secondary" onClick={()=>setRevision(value=>value+1)}>更新数据</Button>
    <NetworkExamples fixtureId={${settings.fixtureId === "all" ? "undefined" : JSON.stringify(settings.fixtureId)}} state={settings.state} revision={revision} relation={settings.relation} recipe={settings.recipe} variant={settings.variant} reduced={reduced} />
  </main></MotionConfig>;
}
createRoot(document.getElementById("root")!).render(<App />);`,
    "index.html": '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rain 网络关系图</title></head><body style="margin:0"><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>',
    "chart-business/network-examples.tsx": networkExamples,
    "chart-business/network-data.ts": networkData,
    "chart-business/network-page.css": networkStyles,
  };
}

export function ChartNetworkSource({ settings }: { settings: NetworkChartSettings }) {
  const [selected, setSelected] = useState("main.tsx");
  const files = chartNetworkFiles(settings);
  return <details className="rain-chart-source"><summary>网络图配置、完整源码与示例数据</summary>
    <p>下载保留当前业务场景、状态、关系筛选、更新次数、呈现样式与配色，图形和数据使用本页真实源码；在已有 Rain React 工作区使用。</p>
    <div className="rain-chart-source__files">{Object.entries(files).map(([name, source]) => <a key={name} download={name} href={`data:text/plain;charset=utf-8,${encodeURIComponent(source)}`}>下载 {name}</a>)}</div>
    <label>查看文件<select aria-label="网络图表源码文件" value={selected} onChange={event => setSelected(event.target.value)}>{Object.keys(files).map(name => <option key={name}>{name}</option>)}</select></label>
    <DocCode code={files[selected]!} />
  </details>;
}

/** The displayed and downloaded sources are the same files used by the preview. */
export function ChartExampleSource(props: ChartExampleDownloadProps) {
  const [selected, setSelected] = useState("main.tsx");
  const files = chartExampleFiles(props);
  return <details className="rain-chart-source" data-source="default"><summary>调用配置、完整源码与示例数据</summary>
    <p>在已有 Rain React / Vite 工作区使用；入口为本地候选 <code>@rain-next/ui/charts</code>。示例另需 <code>motion@12.27.0</code> 与 GeoJSON 类型。下列文件与预览共用同一份源码，包含{props.id === "matrix" ? "五组矩阵实例和当前状态、规模、行列顺序" : "全部数据及配方"}。</p>
    <div className="rain-chart-source__files">{Object.entries(files).map(([name, source]) => <a key={name} download={name} href={`data:text/plain;charset=utf-8,${encodeURIComponent(source)}`}>下载 {name}</a>)}</div>
    <label>查看文件 <select aria-label="示例源码文件" value={selected} onChange={event => setSelected(event.target.value)}>{Object.keys(files).map(name => <option key={name}>{name}</option>)}</select></label>
    <DocCode code={files[selected]!} />
  </details>;
}
