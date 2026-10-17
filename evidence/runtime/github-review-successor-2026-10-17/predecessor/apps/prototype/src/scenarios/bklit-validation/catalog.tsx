import { useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { CHART_ENTRIES, ChartExample, type ChartId, type ChartRecipe } from "./catalog-examples";
import { ChartExampleSource } from "../../../../playground/src/docs/components/chart-example-source";
import { rainChartRecipes } from "@rain-next/ui/charts";
import { useChartReducedMotion } from "../../../../playground/src/docs/components/chart-variants/shared";
import { ChartVariantGallery } from "../../../../playground/src/docs/components/chart-variant-gallery";
import type { MiniSize } from "../../../../playground/src/docs/components/chart-business/mini-layout";

function currentId(): ChartId {
  const id = window.location.hash.replace(/^#(?:chart-)?/, "");
  return (CHART_ENTRIES.find(item => item.id === id)?.id ?? "area") as ChartId;
}

export function ChartCatalog() {
  const [id, setId] = useState<ChartId>(currentId);
  const entry = CHART_ENTRIES.find(item => item.id === id)!;
  const comparisonRecipe = id === "funnel" ? "category-near" : entry.recipes.at(-1);
  const [recipe, setRecipe] = useState<ChartRecipe>(entry.defaultRecipe);
  const [revision, setRevision] = useState(0);
  const [replay, setReplay] = useState(0);
  const [state, setState] = useState<"normal"|"empty"|"zero"|"long"|"single"|"missing"|"invalid">("normal");
  const [size, setSize] = useState<"standard"|"mini">("standard");
  const [miniSize, setMiniSize] = useState<MiniSize>("compact");
  const [compare, setCompare] = useState(false);
  const [seriesCount, setSeriesCount] = useState<3|5>(3);
  const [matrixSize,setMatrixSize] = useState<4|6|12>(6);
  const reduced = useChartReducedMotion();
  useEffect(() => {
    const onHash = () => {
      const next = currentId(); setId(next);
      setRecipe(CHART_ENTRIES.find(item => item.id === next)!.defaultRecipe);
      setState("normal"); setSize("standard"); setMiniSize("compact"); setRevision(0); setReplay(0); setCompare(false);
      setMatrixSize(6);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return <MotionConfig reducedMotion={reduced ? "always" : "never"}>
    <main className="rain-chart-catalog">
      <header className="rain-chart-catalog__intro"><div><h1>Rain 图表库</h1><p>{CHART_ENTRIES.length}种图型，Rain 配色与字体，Bklit 原生图形与业务扩展。</p></div><a href="/bklit-validation.html">查看原生与 Rain 对照</a></header>
      <div className="rain-chart-catalog__body">
        <nav aria-label="图型目录">{CHART_ENTRIES.map(item => <a href={`#chart-${item.id}`} key={item.id} aria-current={item.id === id ? "page" : undefined}>{item.label}</a>)}</nav>
        <section className="rain-chart-catalog__panel" aria-labelledby="chart-title">
          <h2 id="chart-title">{entry.label}</h2>{id === "choropleth" && <p><a href="http://127.0.0.1:5173/#chart-china">查看全国与省市下钻业务配方</a></p>}<p className="rain-chart-catalog__description">{entry.summary}</p>
          <div className="rain-chart-catalog__toolbar" data-chart-default-controls="">
            <label>视觉配方<select aria-label="视觉配方" value={recipe} onChange={e => setRecipe(e.target.value as ChartRecipe)}>{entry.recipes.map(x => <option key={x} value={x}>{rainChartRecipes[x].label}</option>)}</select></label>
            <label>示例状态<select aria-label="示例状态" value={state} onChange={e => setState(e.target.value as typeof state)}>{Object.entries({ normal:"正常数据", empty:"无数据", zero:"零值", long:"长标签", single:"单项／单点", missing:"缺测", invalid:"无效数据" }).filter(([value]) => id !== "network" || !["zero", "missing"].includes(value)).map(([value,label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            {["area","line","bar","pie","ring"].includes(id) && <label>尺寸<select aria-label="图表尺寸" value={size} onChange={e => setSize(e.target.value as typeof size)}><option value="standard">标准</option><option value="mini">迷你 / 嵌入</option></select></label>}
            {size === "mini" && <label>迷你型号<select aria-label="迷你型号" value={miniSize} onChange={e => setMiniSize(e.target.value as MiniSize)}><option value="compact">紧凑</option><option value="comfortable">舒展</option></select></label>}
            {["area","line","bar","pie","ring","radar","scatter"].includes(id) && <label>系列数<select aria-label="系列数" value={seriesCount} onChange={e => setSeriesCount(Number(e.target.value) as 3|5)}><option value={3}>3系列</option><option value={5}>5系列</option></select></label>}
            <button onClick={() => setRevision(n => n + 1)}>更新数据</button>{id !== "network" && <button onClick={() => setReplay(n => n + 1)}>重播动效</button>}
            <button aria-pressed={compare} onClick={() => setCompare(n => !n)}>对照实例</button>
          </div>
          <div key="primary" className="rain-chart-catalog__preview rain-chart" data-rain-id={`chart-${id}`} data-recipe={recipe}>
            <ChartExample key={id} id={id} recipe={recipe} revision={revision} replay={replay} reduced={reduced} state={state} size={size} miniSize={miniSize} seriesCount={seriesCount} matrixSize={matrixSize} onMatrixSizeChange={setMatrixSize} />
          </div>
          {compare && <div key="comparison" className="rain-chart-catalog__preview rain-chart" data-rain-id={`chart-${id}`} data-recipe={comparisonRecipe} style={{ marginTop: "var(--rain-space-16)" }}>
            <ChartExample id={id} recipe={comparisonRecipe} revision={revision} replay={replay} reduced={reduced} state={state} size={size} miniSize={miniSize} seriesCount={seriesCount} matrixSize={matrixSize} showData={false} />
          </div>}
          <p role="status" className="rain-chart-catalog__status">示例数据{revision > 0 ? ` · 已更新 ${revision} 次` : ""}{reduced ? " · 已按系统设置减少动效" : ""}</p>
          <p className="rain-chart-catalog__note"><strong>数据要求：</strong>{entry.dataContract}</p>
          {entry.limitation && <p className="rain-chart-catalog__note"><strong>使用边界：</strong>{entry.limitation}</p>}
          <ChartExampleSource id={id} recipe={recipe} state={state} size={size} miniSize={miniSize} seriesCount={seriesCount} revision={revision} matrixSize={matrixSize} />
          <ChartVariantGallery key={id} id={id} recipe={recipe} reduced={reduced} />
        </section>
      </div>
    </main>
  </MotionConfig>;
}
