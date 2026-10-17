import { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";
import { Button, Link } from "@rain-next/ui";
import "../component-doc.css";
import "@rain-next/ui/charts/styles.css";
import { useChartReducedMotion } from "../chart-variants/shared";
import { ChartBusinessSource } from "../chart-example-source";
import "../chart-page.css";
import { HorizontalBarComparison, HorizontalBarExample, RankingBars, RelativeBarExamples } from "./bar-examples";
import { EmbeddingExamples } from "./embedding-examples";
import { MiniGallery } from "./mini-examples";
import type { ChartRecipe } from "../chart-catalog";
import { getComparisonMax, getTrendComparisonMax, makeMiniRows, selectMiniRows, type BusinessChartState } from "./mini-data";
import "./chart-business.css";

export function ChartBusinessPage({ navigationCount = 0 }: { navigationCount?: number }) {
  const [revision,setRevision] = useState(0), [replay,setReplay] = useState(0);
  const [state,setState] = useState<BusinessChartState>("normal"), [descending,setDescending] = useState(false), [many,setMany] = useState(false), [filter,setFilter] = useState(false);
  const [recipe,setRecipe] = useState<ChartRecipe>("monochrome-blue");
  const reduced = useChartReducedMotion();
  const original = useMemo(() => makeMiniRows(revision,state),[revision,state]);
  const maxValue = state === "invalid" ? 0 : getComparisonMax(original);
  const trendMaxValue = state === "invalid" ? 0 : getTrendComparisonMax(original);
  const rows = useMemo(() => selectMiniRows(original,{filter,descending,many}),[original,filter,descending,many]);
  useEffect(() => { if (navigationCount) document.getElementById("chart-business-title")?.focus(); },[navigationCount]);
  const first = rows[0];
  return <MotionConfig reducedMotion={reduced ? "always" : "never"}><main className="component-doc rain-chart-business" data-rain-id="doc-chart-business" data-asset-identity="registry-candidate">
    <header className="component-doc__header"><Link href="#components">返回组件目录</Link><div className="component-doc__title"><h1 id="chart-business-title" tabIndex={-1}>迷你图表与业务组合</h1><span>共享候选 · 未发布 · 待视觉审阅</span></div><p>大小条形、轻量趋势、构成与进度，组合进日常阅读数据的地方。</p></header>
    <div className="rain-business-controls">
      <label>配色<select aria-label="业务图表配色" value={recipe} onChange={event => setRecipe(event.target.value as ChartRecipe)}><option value="monochrome-blue">蓝灰单色</option><option value="category-near">蓝紫近邻</option><option value="category-wide">多色类别</option></select></label>
      <label>数据状态<select aria-label="业务数据状态" value={state} onChange={event => setState(event.target.value as BusinessChartState)}>{Object.entries({normal:"正常",zero:"全零",missing:"缺测",invalid:"无效数据",empty:"无数据",single:"单项",long:"长名称"}).map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <Button size="small" variant="secondary" onClick={() => setRevision(value => value+1)}>更新数据</Button><Button size="small" variant="secondary" onClick={() => setReplay(value => value+1)}>重播动效</Button>
      <Button size="small" variant="secondary" aria-pressed={descending} onClick={() => setDescending(value => !value)}>按数量排序</Button>
      <Button size="small" variant="secondary" aria-pressed={filter} onClick={() => setFilter(value => !value)}>只看50人以上</Button>
      <Button size="small" variant="secondary" aria-pressed={many} onClick={() => setMany(value => !value)}>40行场景</Button>
    </div>
    <p className="rain-business-note" role="status">示例数据 · 更新 {revision} 次{reduced ? " · 已按系统设置减少动效" : ""}</p>
    <div className="rain-chart" data-recipe={recipe}>
      {state === "invalid" ? <div className="rain-business-detail" role="alert">无效数据：数量必须是有限非负值。保留错误说明，等待正确数据。</div> : !first ? <p role="status">暂无数据</p> : <>
        <section className="rain-business-section" aria-labelledby="business-bars-title"><h2 id="business-bars-title">同一量程，大小都能比较</h2><div className="rain-business-bars">
          <HorizontalBarExample rows={rows.slice(0,5)} maxValue={maxValue} reduced={reduced} replay={replay} /><RankingBars rows={rows.slice(0,5)} maxValue={maxValue} />
        </div></section>
        <section className="rain-business-section"><h2>分组比较与互斥堆叠</h2><div className="rain-business-bars">
          <HorizontalBarComparison rows={rows.slice(0,5)} maxValue={maxValue} reduced={reduced} replay={replay} />
          <HorizontalBarComparison rows={rows.slice(0,5)} maxValue={maxValue} stacked reduced={reduced} replay={replay} />
        </div><RelativeBarExamples /></section>
        <section className="rain-business-section" aria-labelledby="business-mini-title"><h2 id="business-mini-title">同一图形，两种阅读密度</h2><MiniGallery key={replay} row={first} maxValue={maxValue} trendMaxValue={trendMaxValue} reduced={reduced} /></section>
        <EmbeddingExamples rows={rows} maxValue={maxValue} trendMaxValue={trendMaxValue} reduced={reduced} />
      </>}
    </div>
    <ChartBusinessSource settings={{recipe,state,revision,descending,many,filter}} />
  </main></MotionConfig>;
}
