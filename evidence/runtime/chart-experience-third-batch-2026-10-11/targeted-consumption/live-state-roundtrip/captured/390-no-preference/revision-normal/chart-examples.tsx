import "@rain-next/ui/charts/styles.css";
import "./chart-examples.css";
import "./chart-business/chart-business.css";
import { Fragment, useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Breadcrumb, Button } from "@rain-next/ui";
import {
  curveLinear, curveMonotoneX, AreaChart, Area, LineChart, Line, BarChart, Bar, BarXAxis,
  ComposedChart, SeriesBar, Grid, XAxis, YAxis, ChartTooltip, TooltipContent,
  ChartLegendHoverProvider,
  PieChart, PieSlice, PieCenter, RingChart, Ring, RingCenter,
  RadarChart, RadarGrid, RadarAxis, RadarArea, RadarLabels, ScatterChart, Scatter,
  FunnelChart, Gauge, SankeyChart, SankeyLink, SankeyNode, SankeyTooltip,
  SunburstChart, SunburstSegment, SunburstLabels, SunburstCenter, SunburstHint,
  SunburstBreadcrumb, useSunburstBreadcrumbItems, useSunburstStable, buildArcs,
  HeatmapChart, HeatmapCells, HeatmapXAxis, HeatmapYAxis, HeatmapLegend, HeatmapTooltip, HeatmapInteractionProvider, HeatmapInteractionBoundary,
  ChoroplethChart, ChoroplethFeatureComponent as ChoroplethFeature, ChoroplethTooltip,
  CandlestickChart, Candlestick,
  LiveLineChart, LiveLine, LiveXAxis, LiveYAxis,
} from "@rain-next/ui/charts";
import { SERIES, RADAR_METRICS, dateLabel, exampleLabel, makeTimeline, makeMissingTimeline, makeBars, makeGroupedBars, makeCategories, makeRings, makeRadar, makeFunnel, makeFlow, flowColor, makeHierarchy, hierarchyLeaves, makeHeatmap, makeRegions, intensityColor, makeCandles, makeLivePoints, assertGaugeValue, invalidExampleError, applyPieBoundary, applyRingBoundary, applyFunnelBoundary, applyFlowBoundary, applyScatterBoundary, applyCandleBoundary, type ChartBoundaryScenario, type ChartState } from "./chart-data";

import { CHART_ENTRIES, type ChartId, type ChartRecipe } from "./chart-catalog";
import { ExampleLegend as Legend, trendCurve } from "./chart-variants/shared";
import { ProfitLossExample } from "./chart-variants/profit-loss";
import { ChartPointReading } from "./chart-point-reading";
import { MiniColumns, MiniPie, MiniProgress } from "./chart-business/mini-examples";
import { MINI_LAYOUT, type MiniSize } from "./chart-business/mini-layout";
import { getProgressReading } from "./chart-business/mini-data";
import { MatrixExamples } from "./chart-business/matrix-examples";
import { NetworkExamples } from "./chart-business/network-examples";
export { CHART_ENTRIES, type ChartId, type ChartRecipe } from "./chart-catalog";
export type ChartExampleProps = {
  id: ChartId; recipe?: ChartRecipe; replay?: number; revision?: number; reduced?: boolean;
  state?: ChartState; seriesCount?: 3 | 5; size?: "standard" | "mini"; miniSize?: MiniSize; showData?: boolean;
  matrixSize?: 4|6|12; onMatrixSizeChange?: (size:4|6|12)=>void; descending?: boolean;
  boundaryScenario?: ChartBoundaryScenario; onBoundaryScenarioChange?: (scenario:ChartBoundaryScenario)=>void;
  liveSettings?: LiveExampleSettings; onLiveSettingsChange?: (settings: LiveExampleSettings) => void;
};
export type LiveExampleSettings = { points?: {time: number; value: number}[]; paused?: boolean; frozenNow?: number };
const immediate = { type: "tween" as const, duration: 0 };
const positive = "var(--chart-positive)";
const negative = "var(--chart-negative)";
const flat = "var(--chart-neutral)";
const finiteValue = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? value : 0;
const countReading = (value: unknown, unit = "") => typeof value === "number" && Number.isFinite(value) ? `${value}${unit}` : "缺测";
const rateReading = (point: Record<string, unknown>) => point.enrolled === 0 && point.completed != null ? "不适用" : point.rate == null ? "缺测" : `${Number(point.rate).toFixed(1)}%`;
const validHover = (index: number | null, length: number) => index != null && Number.isInteger(index) && index >= 0 && index < length ? index : null;

function ExactTable({ headers, rows, caption = "示例精确数据" }: { headers: string[]; rows: ReactNode[][]; caption?: string }) {
  return <details className="rain-chart-data"><summary>查看精确数据</summary><div tabIndex={0} aria-label="精确数据表，可横向滚动"><table>
    <caption>{caption}</caption><thead><tr>{headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
    <tbody>{rows.map((row, i) => <tr key={i}>{row.map((value, j) => j === 0 ? <th key={j} scope="row">{value}</th> : <td key={j}>{value}</td>)}</tr>)}</tbody>
  </table></div></details>;
}

function StateNotice({ title, children }: { title: string; children?: ReactNode }) {
  return <div className="rain-chart-empty" role="status"><strong>{title}</strong>{children && <p>{children}</p>}</div>;
}

function TimeExample({ id, recipe, revision = 0, replay = 0, reduced = false, state = "normal", seriesCount = 3, size = "standard", miniSize = "compact", showData = true, boundaryScenario = "normal", onBoundaryScenarioChange }: ChartExampleProps & { id: "area" | "line" | "scatter" | "composed" }) {
  const [localScenario, setLocalScenario] = useState<ChartBoundaryScenario>(boundaryScenario);
  const scenario = onBoundaryScenarioChange ? boundaryScenario : localScenario;
  const data = useMemo(() => {
    const rows = state === "missing" ? makeMissingTimeline(revision) : makeTimeline(revision, state);
    return id === "scatter" ? applyScatterBoundary<(typeof rows)[number]>(rows, scenario) : rows;
  }, [id, revision, state, scenario]);
  const [hovered, setHovered] = useState<number | null>(null);
  const gradientId = `rain-composed-${useId().replaceAll(":", "")}`;
  const mini = size === "mini" && (id === "area" || id === "line");
  const layout = MINI_LAYOUT[miniSize];
  const miniMargin = { top: layout.plot.padding, right: layout.plot.padding, bottom: layout.plot.padding, left: layout.plot.padding };
  const trend = recipe === "trend-soft" || mini;
  const series = SERIES.slice(0, trend ? 1 : seriesCount);
  const safeHovered = validHover(hovered, id === "composed" ? state === "zero" ? 2 : 3 : series.length);
  useEffect(() => setHovered(null), [id, state, seriesCount, trend]);
  const last = data.at(-1);
  const allMissing = data.length > 0 && data.every(point => (id === "composed" ? ["enrolled", "completed", "rate"] as const : series.map(item => item.key)).every(key => point[key] == null));
  const motion = { animationDuration: reduced ? 0 : undefined, enterTransition: reduced ? immediate : undefined, revealSignature: String(replay) };
  const tooltipRows = (point: Record<string, unknown>) => id === "composed" ? [
    { label: "参与人数", value: countReading(point.enrolled, " 人"), color: "var(--chart-1)" },
    { label: "完成人数", value: countReading(point.completed, " 人"), color: "var(--chart-2)" },
    { label: "完成率", value: rateReading(point), color: "var(--chart-3)" },
  ] : series.map(item => ({ label: exampleLabel(item.label, state), value: countReading(point[item.key], " 人"), color: item.color }));
  const tooltip = <ChartTooltip className="rain-chart-tooltip" showDatePill={!mini} damping={reduced ? 0 : undefined} content={({ point }) => <TooltipContent title={dateLabel(point.date as Date)} rows={tooltipRows(point)} />} />;
  const axes = !mini && <><Grid horizontal numTicksRows={4} /><YAxis numTicks={4} /><XAxis numTicks={4} /></>;
  const plot = id === "composed" ? <ComposedChart data={data} className="rain-chart-plot" aspectRatio="" margin={{ top: 24, right: 58, bottom: 38, left: 58 }} {...motion}>
    <defs><linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--chart-2)" /><stop offset="100%" stopColor="var(--chart-1)" stopOpacity={.65} /></linearGradient></defs>
    <Grid horizontal numTicksRows={4} /><Area dataKey="enrolled" curve={trendCurve(data, "enrolled")} fill="var(--chart-1)" fillOpacity={.2} animate={!reduced} showMarkers={state === "single"} />
    <SeriesBar dataKey="completed" fill={recipe === "category-solid" ? "var(--chart-2)" : `url(#${gradientId})`} stroke="var(--chart-2)" animate={!reduced} />
    {state !== "zero" && <Line dataKey="rate" yAxisId="right" stroke="var(--chart-3)" fadeEdges={false} curve={trendCurve(data, "rate")} animate={!reduced} showMarkers={state === "single"} />}
    <YAxis numTicks={4} />{state !== "zero" && <YAxis yAxisId="right" orientation="right" numTicks={4} formatValue={value => `${value}%`} />}<XAxis numTicks={4} />{tooltip}
  </ComposedChart> : id === "scatter" ? <ScatterChart data={data} className="rain-chart-plot" aspectRatio="" margin={{ top: 24, right: 24, bottom: 38, left: 58 }} {...motion}>
    {series.map(item => <Scatter key={item.key} dataKey={item.key} fill={item.color} radius={5} animate={!reduced} />)}{axes}{tooltip}
  </ScatterChart> : id === "line" ? <LineChart data={data} className={mini ? "rain-chart-mini-plot" : "rain-chart-plot"} aspectRatio="" margin={mini ? miniMargin : { top: 24, right: 24, bottom: 38, left: 58 }} style={mini ? { width: layout.plot.width, height: layout.plot.height } : undefined} yDomainTween={!reduced} {...motion}>
    {series.map(item => <Line key={item.key} dataKey={item.key} stroke={item.color} strokeWidth={mini ? layout.lineWidth : undefined} fadeEdges={false} curve={trendCurve(data, item.key)} animate={!reduced} showMarkers={state === "single"} />)}{axes}{tooltip}
  </LineChart> : <AreaChart data={data} className={mini ? "rain-chart-mini-plot" : "rain-chart-plot"} aspectRatio="" margin={mini ? miniMargin : { top: 24, right: 24, bottom: 38, left: 58 }} style={mini ? { width: layout.plot.width, height: layout.plot.height } : undefined} yDomainTween={!reduced} {...motion}>
    {series.map((item, i) => <Area key={item.key} dataKey={item.key} curve={trendCurve(data, item.key)} fill={item.color} fillOpacity={i === 0 ? .24 : .15} strokeWidth={mini ? layout.lineWidth : undefined} animate={!reduced} showMarkers={state === "single"} />)}{axes}{tooltip}
  </AreaChart>;
  return <>
    {id === "scatter" && <label className="rain-chart-example-control">边界样本 <select aria-label="散点边界样本" value={scenario} onChange={event => (onBoundaryScenarioChange ?? setLocalScenario)(event.target.value as ChartBoundaryScenario)}><option value="normal">正常数据</option><option value="scatter-dense">96个日期</option><option value="scatter-overlap">同日系列重叠</option></select></label>}
    <ChartLegendHoverProvider hoveredIndex={safeHovered} onHoverChange={setHovered}>
      {mini ? <div className="rain-chart-mini-row" data-size={miniSize} style={{ gap: layout.readingGap }}><div><span className="rain-chart-note">最新参与人数</span><p className="rain-chart-metric"><strong>{countReading(last?.enrolled)}</strong>{last?.enrolled != null && <span>人</span>}</p></div><div className="rain-business-mini" data-mini-kind={id} data-size={miniSize} data-mini-state={state}><div className="rain-business-mini-slot" style={{ width: layout.plot.width, height: layout.plot.height }}>{allMissing ? <span role="status">全部缺测</span> : plot}</div></div></div> : allMissing ? <StateNotice title="全部缺测">保留日期与精确数据；没有有效观测，不绘制曲线或柱形。</StateNotice> : plot}
      {!mini && <Legend hovered={safeHovered} onHover={setHovered} items={id === "composed" ? [
        { label: `参与人数 · 人${last?.enrolled == null ? " · 缺测" : ""}`, value: last?.enrolled ?? 0, color: "var(--chart-1)" },
        { label: `完成人数 · 人${last?.completed == null ? " · 缺测" : ""}`, value: last?.completed ?? 0, color: "var(--chart-2)" },
        ...(state !== "zero" ? [{ label: `完成率 · %${last?.rate == null ? ` · ${rateReading(last ?? {})}` : ""}`, value: last?.rate ?? 0, color: "var(--chart-3)" }] : []),
      ] : series.map(item => ({ label: exampleLabel(`${item.label} · 人${last?.[item.key] == null ? " · 缺测" : ""}`, state), value: finiteValue(last?.[item.key]), color: item.color }))} />}
    </ChartLegendHoverProvider>
    {id === "scatter" && <><p className="rain-chart-note">横轴为日期，纵轴为非负人数；重叠时按日期分别读取每个系列。</p><ChartPointReading data={data} fields={series.map(item => ({ key: item.key, label: item.label, unit: "人" }))} /></>}
    {state === "zero" && id === "composed" && <p className="rain-chart-note">参与人数为0，完成率不适用，未绘制比率曲线。</p>}
    {state === "missing" && !allMissing && <p className="rain-chart-note">缺测日期保留缺口；0是有效观测，分母为0时完成率不适用。更新数据可查看比率全缺测及全部缺测。</p>}
    {showData && <ExactTable headers={id === "composed" ? ["日期", "参与人数 · 人", "完成人数 · 人", "完成率"] : ["日期", ...series.map(item => `${item.label} · 人`)]} rows={data.map(point => id === "composed" ? [dateLabel(point.date), countReading(point.enrolled), countReading(point.completed), rateReading(point)] : [dateLabel(point.date), ...series.map(item => countReading(point[item.key]))])} />}
  </>;
}

function BarsExample({ revision = 0, replay = 0, reduced = false, state = "normal", seriesCount = 3, recipe, showData = true }: ChartExampleProps) {
  const [kind, setKind] = useState<"grouped" | "stacked">("grouped");
  const [hovered, setHovered] = useState<number | null>(null);
  const gradientId = `rain-bar-${useId().replaceAll(":", "")}`;
  const gradient = recipe === "bar-gradient" || recipe === "bar-fade";
  const fade = recipe === "bar-fade";
  const series = SERIES.slice(0, seriesCount);
  const safeHovered = validHover(hovered, series.length);
  useEffect(() => setHovered(null), [state, seriesCount, kind]);
  const raw = useMemo(() => kind === "grouped" ? makeGroupedBars(revision, state) : makeBars(revision, state), [revision, state, kind]);
  const gradeValues = [
    [[62, 44, 30, 16, 8], [56, 64, 38, 20, 10], [92, 54, 38, 22, 10], [58, 84, 62, 26, 14], [102, 78, 54, 26, 12], [126, 78, 56, 26, 14]],
    [[76, 46, 28, 18, 8], [64, 72, 44, 16, 8], [94, 62, 44, 22, 10], [68, 88, 64, 26, 14], [118, 76, 58, 24, 12], [112, 94, 66, 30, 14]],
    [[70, 56, 38, 18, 10], [66, 74, 44, 24, 12], [108, 64, 42, 24, 10], [82, 84, 62, 30, 18], [118, 86, 60, 26, 14], [140, 86, 62, 28, 16]],
  ] as const;
  // Stacked values are mutually exclusive groups, rather than overlapping activity metrics.
  const data = kind === "stacked" && state !== "zero" ? raw.map((point, index) => {
    const grades = gradeValues[revision % 3]![index]!;
    return { ...point, enrolled: grades[0], completed: grades[1], returned: grades[2], answered: grades[3], reviewed: grades[4] };
  }) : raw;
  const names = kind === "stacked" ? ["优秀", "良好", "合格", "待提升", "待完成"].slice(0, seriesCount) : series.map(item => item.label);
  return <>
    <label className="rain-chart-example-control">柱形 <select aria-label="柱形配方" value={kind} onChange={event => setKind(event.target.value as typeof kind)}><option value="grouped">分组柱</option><option value="stacked">互斥等级堆叠</option></select></label>
    <ChartLegendHoverProvider hoveredIndex={safeHovered} onHoverChange={setHovered}>
      <BarChart data={data} xDataKey="label" className="rain-chart-plot" aspectRatio="" stacked={kind === "stacked"} barGap={.25} margin={{ top: 24, right: 24, bottom: state === "long" ? 48 : 38, left: 58 }} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? immediate : undefined} revealSignature={`${replay}-${kind}`}>
        {gradient && <defs>{series.map(item => <linearGradient key={item.key} id={`${gradientId}-${item.key}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={item.color} stopOpacity={fade ? 1 : .95} />
          {fade && <stop offset="80%" stopColor={item.color} stopOpacity={.2} />}
          <stop offset="100%" stopColor={item.color} stopOpacity={fade ? 0 : .4} />
        </linearGradient>)}</defs>}
        <Grid horizontal numTicksRows={4} highlightRowValues={[0]} highlightRowStroke="var(--chart-grid)" highlightRowStrokeOpacity={1} />
        {series.map(item => <Bar key={item.key} dataKey={item.key} fill={gradient ? `url(#${gradientId}-${item.key})` : item.color} stroke={item.color} lineCap={fade ? "round" : 4} animate={!reduced} minBarHeight={0} />)}
        <YAxis numTicks={4} /><BarXAxis maxLabels={state === "long" ? 2 : 6} />
        <ChartTooltip className="rain-chart-tooltip" damping={reduced ? 0 : undefined} content={({ point }) => <TooltipContent title={String(point.label)} rows={series.map((item, i) => ({ label: `${names[i]} · 人`, value: finiteValue(point[item.key]), color: item.color }))} />} />
      </BarChart>
      <Legend hovered={safeHovered} onHover={setHovered} items={series.map((item, i) => ({ label: exampleLabel(`${names[i]} · 人`, state), value: 0, color: item.color }))} />
    </ChartLegendHoverProvider>
    {state === "zero" && <p className="rain-chart-note">全零量程使用参考上限1；全部观测值保持0，未绘制正值柱高。</p>}
    {kind === "stacked" && <p className="rain-chart-note">堆叠样本为互斥成绩等级；参与、完成、复习等重叠指标仅用于分组比较。</p>}
    {gradient && <p className="rain-chart-note">{fade ? "圆头渐隐柱：各系列保持本色，上端不透明，向下渐隐；0基线保留。" : "同色深浅渐变：各系列保持本色，垂直透明度从0.95过渡到0.4。"}</p>}
    {showData && <ExactTable headers={["课程", ...names.map(name => `${name} · 人`)]} rows={data.map(point => [point.label, ...series.map(item => point[item.key])])} />}
  </>;
}

function RadialExample({ id, revision = 0, replay = 0, reduced = false, state = "normal", seriesCount = 3, showData = true, size = "standard", miniSize = "compact", boundaryScenario, onBoundaryScenarioChange }: ChartExampleProps & { id: "pie" | "ring" | "radar" }) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [localScenario, setLocalScenario] = useState<ChartBoundaryScenario>("normal");
  const chosen = boundaryScenario ?? localScenario;
  const scenario = state !== "zero" && chosen.startsWith(`${id}-`) ? chosen : "normal";
  const setScenario = (next:ChartBoundaryScenario) => { setLocalScenario(next); onBoundaryScenarioChange?.(next); };
  const [donut, setDonut] = useState(true);
  const categories = useMemo(() => applyPieBoundary(makeCategories(revision, state, seriesCount),scenario), [revision, state, seriesCount,scenario]);
  const rings = useMemo(() => applyRingBoundary(makeRings(revision, state, seriesCount),scenario), [revision, state, seriesCount,scenario]);
  const radar = useMemo(() => makeRadar(revision, state, seriesCount), [revision, state, seriesCount]);
  const data = id === "ring" ? rings : categories;
  const items = id === "radar" ? radar : data;
  const hovered = items.findIndex(item => item.label === hoveredKey);
  const safeHovered = hovered < 0 ? null : hovered;
  const setHovered = (index:number|null) => setHoveredKey(index === null ? null : items[index]?.label ?? null);
  const hoveredCategory = safeHovered == null ? undefined : categories[safeHovered];
  const hoveredRing = safeHovered == null ? undefined : rings[safeHovered];
  useEffect(() => setHovered(null), [id, state, seriesCount]);
  const total = categories.reduce((sum, item) => sum + item.value, 0);
  const ringDrawable = rings.every(item => getProgressReading(item.value,item.maxValue).fraction !== null);
  const ringText = (item:typeof rings[number]) => getProgressReading(item.value,item.maxValue).state === "inapplicable" ? "不适用" : `${Math.round(item.value / item.maxValue * 100)}%`;
  const boundaryControl = id === "pie" ? <label className="rain-chart-example-control">边界样本 <select aria-label="饼图边界样本" value={scenario} disabled={state === "zero" || state === "single"} onChange={event=>setScenario(event.target.value as ChartBoundaryScenario)}><option value="normal">正常数据</option><option value="pie-small">1人小类别与长名称</option><option value="pie-remove">移除第二类别</option></select></label> : id === "ring" ? <label className="rain-chart-example-control">边界样本 <select aria-label="进度环边界样本" value={scenario} disabled={state === "zero"} onChange={event=>setScenario(event.target.value as ChartBoundaryScenario)}><option value="normal">正常数据</option><option value="ring-zero">完成0 / 目标100</option><option value="ring-full">完成100 / 目标100</option><option value="ring-zero-goal">目标为0</option><option value="ring-over">完成120 / 目标100</option></select></label> : null;
  if (size === "mini" && id !== "radar") return <>{boundaryControl}<div className="rain-business-standalone-mini">
    {id === "pie" ? <><MiniPie values={categories.map(item=>item.value)} size={miniSize} reduced={reduced} /><MiniPie values={categories.map(item=>item.value)} donut size={miniSize} reduced={reduced} /></> : rings.map(item=><div key={item.label}><MiniProgress value={item.value} maxValue={item.maxValue} size={miniSize} reduced={reduced} /><span>{item.label} {miniSize === "compact" ? getProgressReading(item.value,item.maxValue).percentText : `${item.value} / ${item.maxValue}`}</span></div>)}
    </div>{scenario === "ring-over" && <p className="rain-chart-note">超目标；保留120/100真实读数，不生成溢出弧。</p>}{showData && <ExactTable headers={id === "ring" ? scenario === "normal" ? ["目标","完成","目标总量"] : ["目标","完成","目标总量","进度"] : scenario === "normal" ? ["类别","数量"] : ["类别","数量","占比"]} rows={id === "ring" ? rings.map(item=>[item.label,item.value,item.maxValue,...(scenario === "normal" ? [] : [ringText(item)])]) : categories.map(item=>[item.label,item.value,...(scenario === "normal" ? [] : [total ? `${(item.value/total*100).toFixed(1)}%` : "不适用"])])} />}</>;
  return <>
    {boundaryControl}
    {id === "pie" && <label className="rain-chart-example-control">形态 <select aria-label="饼图形态" value={donut ? "donut" : "pie"} onChange={event => setDonut(event.target.value === "donut")}><option value="donut">环饼</option><option value="pie">饼图</option></select></label>}
    <div className="rain-chart-radial">
      {id === "pie" ? <PieChart key={`${replay}-${donut}`} data={categories} className="rain-chart-radial-plot" innerRadius={donut ? 72 : 0} padAngle={.035} cornerRadius={5} hoveredIndex={safeHovered} onHoverChange={setHovered} enterTransition={reduced ? immediate : undefined}>
        {categories.map((item, index) => <PieSlice key={item.label} index={index} color={item.color} animate={!reduced} showGlow={false} />)}
        {donut && <PieCenter defaultLabel="课程总量" suffix="" valueClassName="rain-chart-center-value" labelClassName="rain-chart-center-label" />}
      </PieChart> : id === "ring" ? !ringDrawable ? <StateNotice title={scenario === "ring-zero-goal" ? "目标为0，进度不适用" : "超目标"}>保留各目标的真实当前值和分母；此边界不生成进度环。</StateNotice> : <RingChart key={replay} data={rings} className="rain-chart-radial-plot" hoveredIndex={safeHovered} onHoverChange={setHovered} baseInnerRadius={60} strokeWidth={13} ringGap={8} enterTransition={reduced ? immediate : undefined}>
        {rings.map((item, index) => <Ring key={item.label} index={index} color={item.color} animate={!reduced} showGlow />)}
        <RingCenter valueClassName="rain-chart-center-value" labelClassName="rain-chart-center-label">
          {({ data: item }) => <div className="rain-chart-center-reading"><strong className="rain-chart-center-value">{Math.round(item.value / item.maxValue * 100)}<span>%</span></strong><span className="rain-chart-center-label">{item.label}</span></div>}
        </RingCenter>
      </RingChart> : <RadarChart key={replay} data={radar} metrics={RADAR_METRICS.map(metric => ({ key: metric.key, label: state === "long" ? `${metric.label}指标` : metric.label }))} className="rain-chart-radial-plot" margin={50} hoveredIndex={safeHovered} onHoverChange={setHovered} animate={!reduced} enterTransition={reduced ? immediate : undefined} motionReplayKey={String(replay)}>
        <RadarGrid showLabels /><RadarAxis />{radar.map((item, index) => <RadarArea key={item.label} index={index} color={item.color} showPoints showGlow />)}<RadarLabels fontSize={12} offset={17} />
      </RadarChart>}
    </div>
    <Legend hovered={safeHovered} onHover={setHovered} showValue={id === "pie"} items={(id === "radar" ? radar : data).map(item => ({ label: item.label, value: "value" in item ? item.value : 0, color: item.color }))} />
    {id === "pie" && <p className="rain-chart-note" role="status">{hoveredCategory ? `${hoveredCategory.label}：${hoveredCategory.value}，占 ${total ? (hoveredCategory.value / total * 100).toFixed(1) : "—"}%` : `合计 ${total} · 各类别互斥`}</p>}
    {id === "ring" && <p className="rain-chart-note" role="status">{hoveredRing ? `${hoveredRing.label}：${hoveredRing.value}/${hoveredRing.maxValue} · ${ringText(hoveredRing)}` : "每环使用自身目标值；悬停或聚焦图例读取进度。"}</p>}
    {showData && <ExactTable headers={id === "ring" ? ["独立目标", "当前值", "目标值", "进度"] : id === "radar" ? ["课程", ...RADAR_METRICS.map(metric => metric.label)] : ["课程", "数量", "占比"]} rows={id === "ring" ? rings.map(item => [item.label, item.value, item.maxValue, ringText(item)]) : id === "radar" ? radar.map(item => [item.label, ...RADAR_METRICS.map(metric => item.values[metric.key])]) : categories.map(item => [item.label, item.value, total ? `${(item.value / total * 100).toFixed(1)}%` : "不适用"])} />}
  </>;
}

function FunnelExample({ revision = 0, replay = 0, reduced = false, state = "normal", recipe, showData = true, boundaryScenario, onBoundaryScenarioChange }: ChartExampleProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [localScenario,setLocalScenario] = useState<ChartBoundaryScenario>("normal");
  const chosen = boundaryScenario ?? localScenario;
  const scenario = chosen.startsWith("funnel-") ? chosen : "normal";
  const setScenario = (next:ChartBoundaryScenario) => { setLocalScenario(next); onBoundaryScenarioChange?.(next); };
  const data = useMemo(() => applyFunnelBoundary(makeFunnel(revision, state),scenario), [revision, state,scenario]);
  const hovered = data.findIndex(stage=>stage.label===hoveredKey);
  const safeHovered = hovered < 0 ? null : hovered;
  const setHovered = (index:number|null) => setHoveredKey(index === null ? null : data[index]?.label ?? null);
  const hoveredStage = safeHovered == null ? undefined : data[safeHovered];
  const total = data[0]?.value ?? 0;
  const drawable = total > 0 && data.every(stage=>stage.value !== null && stage.value>=0 && stage.value<=total);
  const plotStages = data.filter((stage):stage is typeof stage & { value:number }=>stage.value !== null);
  const percentage = (value:number|null) => value === null ? "缺测" : total > 0 ? `${(value/total*100).toFixed(1)}%` : "不适用";
  useEffect(() => setHovered(null), [state]);
  const mono = recipe === "monochrome-blue";
  const shades = [2, 1, 3, 4, 5];
  const stages = plotStages.map((item, i) => ({ ...item, label:state === "long" ? item.label.split(" · ")[0]! : item.label, color: mono ? `var(--chart-${shades[i]})` : recipe === "trend-soft" ? "var(--chart-1)" : SERIES[i % 5]!.color,
    ...(recipe !== "category-solid" ? { gradient: [{ offset: "0%", color: mono ? `var(--chart-${shades[i]})` : "var(--chart-1)" }, { offset: "100%", color: mono ? `var(--chart-${shades[i + 1]})` : "var(--chart-2)" }] } : {}),
  }));
  return <>
    <label className="rain-chart-example-control">边界样本 <select aria-label="漏斗边界样本" value={scenario} onChange={event=>setScenario(event.target.value as ChartBoundaryScenario)}><option value="normal">正常数据</option><option value="funnel-missing">第三阶段缺测</option><option value="funnel-growth">后续阶段增长</option><option value="funnel-zero-entry">入口为0但后续有值</option><option value="funnel-above-entry">后续高于入口</option></select></label>
    {drawable ? <FunnelChart key={replay} data={stages} className="rain-chart-plot rain-chart-funnel" style={{ height: 280 }} orientation="horizontal" layers={3} gap={8} edges="curved" labelLayout="spread" labelOrientation="horizontal" formatValue={value => `${value} 人`} formatPercentage={value => `${Math.round(value)}%`} hoveredIndex={safeHovered} onHoverChange={setHovered} enterTransition={reduced ? immediate : undefined} staggerDelay={reduced ? 0 : undefined} /> : <StateNotice title={scenario === "funnel-missing" ? "阶段缺测" : total===0 ? "入口为0，比例不适用" : "后续人数高于入口"}>保留全部阶段和真实读数；此边界不生成完整漏斗。</StateNotice>}
    {scenario === "funnel-growth" && <p className="rain-chart-note">第三阶段人数较上一阶段增长；本样本不是单向流失，比例仍使用入口人数。</p>}
    {state === "long" && <p className="rain-chart-note">图中使用短名称；精确数据可读取完整阶段名称。</p>}
    <p className="rain-chart-note" role="status">{hoveredStage ? `${hoveredStage.label}：${hoveredStage.value === null ? "缺测" : `${hoveredStage.value} 人`}，占入口人数 ${hoveredStage.value === null ? "缺测" : total ? `${Math.round(hoveredStage.value / total * 100)}%` : "不适用"}` : "百分比以第一阶段人数为分母。"}</p>
    {showData && <ExactTable headers={["阶段", "人数", "占入口人数"]} rows={data.map(item => [item.label, item.value ?? "缺测", percentage(item.value)])} />}
  </>;
}

function GaugeExample({ revision = 0, replay = 0, reduced = false, state = "normal", showData = true }: ChartExampleProps) {
  const [orientation, setOrientation] = useState<"arc" | "linear">("arc");
  const [reading, setReading] = useState<"sample" | "50" | "100">("sample");
  useEffect(() => setReading("sample"), [state]);
  const value = state === "zero" ? 0 : reading === "sample" ? [76, 88, 64][revision % 3]! : Number(reading);
  assertGaugeValue(value);
  return <>
    <label className="rain-chart-example-control">形态 <select aria-label="仪表形态" value={orientation} onChange={event => setOrientation(event.target.value as typeof orientation)}><option value="arc">弧形刻度</option><option value="linear">线形刻度</option></select></label>
    <label className="rain-chart-example-control">读数 <select aria-label="仪表读数" value={reading} disabled={state === "zero"} onChange={event => setReading(event.target.value as typeof reading)}><option value="sample">当前数据</option><option value="50">50%</option><option value="100">100%</option></select></label>
    <div className="rain-chart-gauge"><Gauge key={`${replay}-${orientation}`} className="rain-chart-gauge-plot" orientation={orientation} value={value} centerValue={value} defaultLabel={exampleLabel("目标达成率", state)} suffix="%" useGradient inactiveFill="var(--chart-grid)" inactiveFillOpacity={.55} totalNotches={40} enterTransition={reduced ? immediate : undefined} enterStaggerScale={reduced ? 0 : undefined} /></div>
    {showData && <ExactTable headers={["指标", "当前值", "量程"]} rows={[["目标达成率", `${value}%`, "0—100%"]]} />}
  </>;
}

function FlowExample({ revision = 0, replay = 0, reduced = false, state = "normal", showData = true, boundaryScenario, onBoundaryScenarioChange }: ChartExampleProps) {
  const [localScenario,setLocalScenario] = useState<ChartBoundaryScenario>("normal");
  const chosen = boundaryScenario ?? localScenario;
  const scenario = chosen.startsWith("sankey-") ? chosen : "normal";
  const setScenario = (next:ChartBoundaryScenario) => { setLocalScenario(next); onBoundaryScenarioChange?.(next); };
  const data = useMemo(() => applyFlowBoundary(makeFlow(revision, state),scenario), [revision, state,scenario]);
  const plotData = useMemo(() => ({ ...data, links:data.links.filter(link=>link.value>0), nodes: data.nodes.map(node => ({ ...node, name: ({ "课程入口": "入口", "学习提醒": "提醒", "观看视频": "视频", "阅读资料": "资料", "完成学习": "完成", "继续学习": "继续" } as Record<string, string>)[node.key]! })) }), [data]);
  const getNodeColor = (node: { name: string; key?: string }) => flowColor(node);
  return <>
    <label className="rain-chart-example-control">边界样本 <select aria-label="桑基边界样本" value={scenario} onChange={event=>setScenario(event.target.value as ChartBoundaryScenario)}><option value="normal">正常数据</option><option value="sankey-thin">1人次细流向</option><option value="sankey-zero-link">一条流向为0</option></select></label>
    <SankeyChart data={plotData} className="rain-chart-plot rain-chart-flow" aspectRatio="" margin={{ top: 28, bottom: 28, left: 82, right: 82 }} nodePadding={32} revealSignature={String(replay)} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? immediate : undefined}>
      <SankeyLink getNodeColor={getNodeColor} /><SankeyNode getNodeColor={getNodeColor} showValueLabels={false} />
      <SankeyTooltip className="rain-chart-tooltip" nodeContent={({ node, index }) => <TooltipContent title={data.nodes[index]!.name} rows={[{ label: "流量 · 人次", value: node.value ?? 0, color: flowColor(node) }]} />} linkContent={({ link, index }) => <TooltipContent title={`${data.nodes[plotData.links[index]!.source]!.name} → ${data.nodes[plotData.links[index]!.target]!.name}`} rows={[{ label: "人次", value: link.value, color: flowColor(data.nodes[plotData.links[index]!.source]!) }]} />} />
    </SankeyChart>
    <p className="rain-chart-note">图中使用短名称；悬停节点或打开精确数据可读取完整名称。</p>
    {scenario !== "normal" && <p className="rain-chart-note">中间节点流入与流出总量保持一致；{scenario === "sankey-thin" ? "1人次细流向保留真实值，可在连接表读取。" : "0人次连接保留在精确表，不绘制正值连线。"}</p>}
    {showData && <ExactTable headers={["来源", "去向", "人次"]} rows={data.links.map(link => [data.nodes[link.source]!.name, data.nodes[link.target]!.name, link.value])} />}
  </>;
}

function DrillBreadcrumb() {
  const { items, zoomTo } = useSunburstBreadcrumbItems();
  const { arcs, focus, focusById } = useSunburstStable();
  const container = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<{ attribute: string; id: string } | null>(null);
  const focusedControl = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    const pending = pendingFocus.current;
    pendingFocus.current = null;
    if (pending) [...container.current!.querySelectorAll<HTMLElement>(`[${pending.attribute}]`)].find(node => node.getAttribute(pending.attribute) === pending.id)?.focus();
    else if (focusedControl.current && !focusedControl.current.isConnected && document.activeElement === document.body) container.current?.querySelector<HTMLElement>("[data-drill-id], [data-return-id]")?.focus();
  }, [focus.id, arcs]);
  const navigate = (event: MouseEvent<HTMLElement>, id: string, returning = false) => {
    event.preventDefault();
    if (event.detail === 0) {
      let previous = focus;
      while (previous.parentId && previous.parentId !== id) previous = focusById.get(previous.parentId)!;
      pendingFocus.current = returning ? { attribute: "data-drill-id", id: previous.id } : { attribute: "data-return-id", id: focus.id };
    }
    zoomTo(id);
  };
  const children = arcs.filter(arc => arc.parentId === focus.id);
  return <div ref={container} className="rain-chart-sunburst-navigation" onFocusCapture={event => { focusedControl.current = event.target as HTMLElement; }} onBlurCapture={event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) focusedControl.current = null; }}>
    {items.length === 1 ? <h3 className="rain-chart-sunburst-title">{items[0]!.label}</h3> : <Breadcrumb aria-label="学习内容层级"><Breadcrumb.List>{items.map((item, index) => <Fragment key={item.id}>
    {index > 0 && <Breadcrumb.Separator />}
    <Breadcrumb.Item>{item.isCurrent ? <Breadcrumb.Page>{item.label}</Breadcrumb.Page> : <Breadcrumb.Link href="#chart-sunburst" data-return-id={item.id} onClick={event => navigate(event, item.id, true)} aria-label={`返回${item.label}`}>{item.label}</Breadcrumb.Link>}</Breadcrumb.Item>
  </Fragment>)}</Breadcrumb.List></Breadcrumb>}
    <div className="rain-chart-sunburst-controls" role="group" aria-label="当前层级，可用键盘查看下级">{children.map(arc => arc.hasChildren ? <Button key={arc.id} variant="text" size="small" data-drill-id={arc.id} onClick={event => navigate(event, arc.id)} aria-label={`查看${arc.name}`}>{arc.name}</Button> : <span className="rain-chart-note" key={arc.id}>{arc.name} · {arc.value} 人次</span>)}</div>
  </div>;
}

function SunburstExample({ revision = 0, replay = 0, reduced = false, state = "normal", recipe, showData = true }: ChartExampleProps) {
  const data = useMemo(() => makeHierarchy(revision, state), [revision, state]);
  const { arcs, rootId, focusById } = useMemo(() => buildArcs(data), [data]);
  const [focusId, setFocusId] = useState(rootId);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const validFocusId = focusById.has(focusId) ? focusId : rootId;
  useEffect(() => { if (focusId !== validFocusId) setFocusId(validFocusId); }, [focusId, validFocusId]);
  useEffect(() => setHoveredIndex(null), [data]);
  return <>
    <div className="rain-chart-sunburst"><SunburstChart data={data} focusId={validFocusId} onFocusChange={setFocusId} hoveredIndex={hoveredIndex} onHoverChange={setHoveredIndex} playKey={replay} size={360} className="rain-chart-radial-plot" enterTransition={reduced ? immediate : undefined} enterStaggerScale={reduced ? 0 : undefined} hoverPop={reduced ? 0 : undefined}>
      <SunburstBreadcrumb className="rain-chart-sunburst-heading"><DrillBreadcrumb /></SunburstBreadcrumb>
      {arcs.map((arc, index) => <SunburstSegment key={arc.id} index={index} color={recipe === "monochrome-blue" ? `var(--chart-${arc.categoryIndex + 3})` : undefined} />)}<SunburstLabels fontSize={12} fill={recipe === "monochrome-blue" ? "var(--foreground)" : undefined} /><SunburstCenter />
      <SunburstHint className="rain-chart-note">{({ hoveredArc, focus }) => hoveredArc ? `${hoveredArc.id.split(" / ").join(" › ")} · ${hoveredArc.value} 人次` : focus.depth === 0 ? "悬停读取数值 · 点击扇区或上方名称下钻" : "点击中心或面包屑返回上层"}</SunburstHint>
    </SunburstChart></div>
    {showData && <ExactTable headers={["叶项路径", "人次"]} rows={hierarchyLeaves(data).map(item => [item.label, item.value])} />}
  </>;
}

function HeatmapExample({ revision = 0, replay = 0, reduced = false, state = "normal", showData = true }: ChartExampleProps) {
  const data = useMemo(() => makeHeatmap(revision, state), [revision, state]);
  return <>
    <HeatmapInteractionProvider><HeatmapInteractionBoundary>
      <HeatmapChart data={data} className="rain-chart-heatmap" layout="fluid" binSize={0} gap={4} margin={{ top: 30, left: 40, right: 12, bottom: 8 }} weekStartDay={0} colorScale={value => intensityColor(value, 4)} revealSignature={String(replay)} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? immediate : undefined} animate={!reduced}>
        <HeatmapCells cornerRadius={3} colorScale={value => intensityColor(value, 4)} /><HeatmapXAxis /><HeatmapYAxis labelFormat="initial" /><HeatmapTooltip className="rain-chart-tooltip" formatLabel={(count, date) => `${dateLabel(date)} · ${count < 0 ? "缺测" : `${count} 次学习`}`} instant={reduced} />
      </HeatmapChart>
      <HeatmapLegend className="rain-chart-heatmap-legend" lessLabel="少" moreLabel="多" labelClassName="rain-chart-note" colorScale={value => intensityColor(value, 4)} />
    </HeatmapInteractionBoundary></HeatmapInteractionProvider>
    {state === "missing" && <p className="rain-chart-note">缺测日期保留空白；0次学习使用最浅有效色。</p>}
    {showData && <ExactTable headers={["日期", "学习次数"]} rows={data.flatMap(column => column.bins.map(bin => [dateLabel(bin.date), bin.count < 0 ? "缺测" : bin.count]))} />}
  </>;
}

function MapExample({ revision = 0, replay = 0, reduced = false, state = "normal", showData = true }: ChartExampleProps) {
  const data = useMemo(() => makeRegions(revision, state), [revision, state]);
  const getValue = (feature: { properties: Record<string, unknown> | null }) => typeof feature.properties?.value === "number" ? feature.properties.value : undefined;
  return <>
    <ChoroplethChart data={data} className="rain-chart-map" aspectRatio="16 / 9" margin={{ top: 16, right: 16, bottom: 16, left: 16 }} revealSignature={String(replay)} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? immediate : undefined}>
      <ChoroplethFeature stroke="var(--chart-background)" strokeWidth={.5} getFeatureColor={feature => intensityColor(getValue(feature))} />
      <ChoroplethTooltip className="rain-chart-tooltip" content={({ feature }) => <TooltipContent title={String(feature.properties?.name ?? "未命名区域")} rows={[{ label: "学习强度", value: getValue(feature) == null ? "无数据" : `${getValue(feature)} / 100`, color: intensityColor(getValue(feature)) }]} />} />
    </ChoroplethChart>
    <div className="rain-chart-scale" aria-label="学习强度色阶，0到100，另有无数据"><span>0</span>{[0, 25, 50, 75, 100].map(value => <i key={value} style={{ background: intensityColor(value) }} aria-hidden="true" />)}<span>100</span><i style={{ background: "var(--chart-no-data)" }} aria-hidden="true" /><span>无数据</span></div>
    <p className="rain-chart-note">世界地图 · Natural Earth 1:110m 底图；学习强度为模拟数据，缺测与有效零值分开显示。</p>
    {showData && <ExactTable headers={["地区ID", "地区名称", "学习强度"]} rows={data.features.map(feature => [feature.properties.id, feature.properties.name, feature.properties.value ?? "无数据"])} />}
  </>;
}

function CandleExample({ revision = 0, replay = 0, reduced = false, state = "normal", showData = true, boundaryScenario = "normal", onBoundaryScenarioChange }: ChartExampleProps) {
  const [localScenario, setLocalScenario] = useState<ChartBoundaryScenario>(boundaryScenario);
  const scenario = onBoundaryScenarioChange ? boundaryScenario : localScenario;
  const data = useMemo(() => applyCandleBoundary(makeCandles(revision, state), scenario), [revision, state, scenario]);
  const [hovered, setHovered] = useState<number | null>(null);
  const color = (point: Record<string, unknown>) => finiteValue(point.close) < finiteValue(point.open) ? negative : positive;
  return <>
    <label className="rain-chart-example-control">边界样本 <select aria-label="K线边界样本" value={scenario} onChange={event => (onBoundaryScenarioChange ?? setLocalScenario)(event.target.value as ChartBoundaryScenario)}><option value="normal">正常数据</option><option value="candlestick-dense">96个日期</option><option value="candlestick-flat">全部平盘</option></select></label>
    <ChartLegendHoverProvider hoveredIndex={hovered} onHoverChange={setHovered}>
    <CandlestickChart data={data} className="rain-chart-plot" aspectRatio="" margin={{ top: 24, right: 24, bottom: 38, left: 58 }} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? immediate : undefined} revealSignature={String(replay)}>
      <Grid horizontal numTicksRows={4} /><Candlestick positiveFill={positive} negativeFill={negative} animate={!reduced} />
      <YAxis numTicks={4} /><XAxis numTicks={4} /><ChartTooltip className="rain-chart-tooltip" showDots={false} indicatorColor={color} damping={reduced ? 0 : undefined} content={({ point }) => <TooltipContent title={dateLabel(point.date as Date)} rows={[{ label: "开盘", value: finiteValue(point.open), color: color(point) }, { label: "最高", value: finiteValue(point.high), color: color(point) }, { label: "最低", value: finiteValue(point.low), color: color(point) }, { label: "收盘", value: finiteValue(point.close), color: color(point) }]} />} />
    </CandlestickChart>
    <Legend hovered={hovered} onHover={setHovered} items={[{ label: "上涨 / 平盘（收盘≥开盘）", value: 0, color: positive }, { label: "下跌（收盘＜开盘）", value: 0, color: negative }]} />
  </ChartLegendHoverProvider><p className="rain-chart-note">平盘为横向实体；方向颜色不代表业务好坏。</p>
    <ChartPointReading data={data.map(point => ({ ...point, direction: point.close > point.open ? "上涨" : point.close < point.open ? "下跌" : "平盘" }))} fields={[{ key: "open", label: "开盘", unit: "指数" }, { key: "high", label: "最高", unit: "指数" }, { key: "low", label: "最低", unit: "指数" }, { key: "close", label: "收盘", unit: "指数" }, { key: "direction", label: "方向", unit: "" }]} />
    {showData && <ExactTable headers={["日期", "开盘", "最高", "最低", "收盘", "方向"]} rows={data.map(point => [dateLabel(point.date), point.open, point.high, point.low, point.close, point.close > point.open ? "上涨" : point.close < point.open ? "下跌" : "平盘"])} />}
  </>;
}


function LiveExample({ revision = 0, replay = 0, reduced = false, state = "normal", recipe, showData = true, liveSettings, onLiveSettingsChange }: ChartExampleProps) {
  const [points, setPoints] = useState(() => liveSettings?.points ?? makeLivePoints(undefined, revision, state));
  const [pausedByUser, setPausedByUser] = useState(liveSettings?.paused ?? false);
  const [manualNow, setManualNow] = useState<number | undefined>(liveSettings?.frozenNow);
  const [active, setActive] = useState(() => !document.hidden);
  const plotRef = useRef<HTMLDivElement>(null);
  const initialInputs = useRef({ revision, state });
  const running = active && !reduced && !pausedByUser;
  useEffect(() => {
    let visible = true;
    const update = () => setActive(visible && !document.hidden);
    const observer = typeof IntersectionObserver === "function" ? new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; update(); }) : null;
    if (plotRef.current) observer?.observe(plotRef.current);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer?.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  useEffect(() => {
    if (initialInputs.current.revision === revision && initialInputs.current.state === state) return;
    initialInputs.current = { revision, state };
    setPoints(makeLivePoints(undefined, revision, state));
    if (!running) setManualNow(Date.now());
  }, [revision, state, running]);
  useEffect(() => {
    setManualNow(current => running ? undefined : current ?? Date.now());
  }, [running]);
  const append = useCallback((now = Date.now()) => {
    setPoints(previous => {
      const time = now / 1000;
      if (time <= (previous.at(-1)?.time ?? 0)) return previous;
      const value = state === "zero" ? 0 : makeLivePoints(time, revision, "single")[0]!.value;
      return [...previous.slice(-119), { time, value }];
    });
    if (!running) setManualNow(now);
  }, [running, revision, state]);
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(append, 1000);
    return () => window.clearInterval(timer);
  }, [running, append]);
  useEffect(() => {
    onLiveSettingsChange?.({ points, paused: pausedByUser, frozenNow: manualNow });
  }, [points, pausedByUser, manualNow, onLiveSettingsChange]);
  const latest = points.at(-1)?.value ?? 0;
  const timestamp = (value: number) => new Date(value * 1000).toLocaleTimeString("zh-CN", { hour12: false, minute: "2-digit", second: "2-digit" });
  return <>
    <div className="rain-chart-live-controls"><button type="button" onClick={() => { if (!pausedByUser) setManualNow(Date.now()); setPausedByUser(value => !value); }} disabled={reduced}>{pausedByUser ? "恢复实时" : "暂停实时"}</button><button type="button" onClick={() => append()} disabled={running}>追加一次</button><span className="rain-chart-note" role="status" data-live-paused={!running} data-live-count={points.length}>{reduced ? "减少动效 · 手动更新" : pausedByUser ? "已暂停" : active ? "每秒更新" : "离屏／后台暂停"} · {points.length}/120条</span></div>
    <div ref={plotRef}>
      <LiveLineChart data={points} value={latest} dataKey="value" className="rain-chart-plot" style={{ height: 300 }} window={60} numXTicks={4} nowOffsetUnits={.2} paused={!running} running={running} frozenNow={manualNow} margin={{ top: 24, right: 64, bottom: 38, left: 58 }}>
        <LiveLine key={replay} dataKey="value" stroke="var(--chart-1)" fill pulse={running} badge momentumColors={recipe === "sign" ? { up: positive, down: negative, flat } : undefined} />
        <LiveYAxis position="left" formatValue={value => String(Math.round(value))} allowDecimals={false} /><LiveXAxis numTicks={4} formatTime={timeMs => timestamp(timeMs / 1000)} /><ChartTooltip className="rain-chart-tooltip" damping={running ? undefined : 0} showDatePill={false} content={({ point }) => <TooltipContent title={timestamp((point.date as Date).getTime() / 1000)} rows={[{ label: "实时人数 · 插值读数", value: `${finiteValue(point.value).toFixed(1)} 人`, color: "var(--chart-1)" }]} />} />
      </LiveLineChart>
    </div>
    <p className="rain-chart-note">最新人数 <strong>{latest}</strong> 人 · 模拟数据，时间戳单位为秒。</p>
    {showData && <ExactTable headers={["Unix秒", "时分秒", "实时人数"]} rows={points.map(point => [point.time, timestamp(point.time), point.value])} />}
  </>;
}

export function ChartExample(props: ChartExampleProps) {
  const { id, state = "normal" } = props;
  if (id === "matrix") return <MatrixExamples state={state} recipe={props.recipe} revision={props.revision} reduced={props.reduced} replay={props.replay} descending={props.descending} initialSize={props.matrixSize} onSizeChange={props.onMatrixSizeChange} />;
  if (id === "network") return state === "zero" || state === "missing" ? <StateNotice title="本图不使用数值零值或缺测状态">网络以明确的节点和关系集合表达；没有关系时使用无数据或单节点状态。</StateNotice> : <NetworkExamples state={state} recipe={props.recipe} revision={props.revision} reduced={props.reduced} />;
  const mini = props.size === "mini" && ["line", "area", "bar", "pie", "ring"].includes(id);
  const miniSize = props.miniSize ?? "compact";
  if (mini && (["empty", "invalid"].includes(state) || state === "missing" && id !== "line" && id !== "area")) {
    const layout = MINI_LAYOUT[miniSize];
    const frame = id === "pie" ? layout.pie : id === "ring" ? layout.arc : layout.plot;
    const label = state === "empty" ? "暂无数据" : state === "invalid" ? "已拒绝无效数据" : "本样本含缺测";
    return <div className="rain-chart-mini-state-row" style={{ gap: layout.readingGap }}>
      {Array.from({ length: id === "pie" ? 2 : id === "ring" ? props.seriesCount ?? 3 : 1 }, (_, index) => <span key={index} aria-hidden="true" data-mini-kind={id === "bar" ? "columns" : id === "ring" ? "arc" : id === "pie" && index === 1 ? "donut" : id} data-mini-state={state} data-size={miniSize} style={{ width: frame.width, height: frame.height, flexShrink: 0 }} />)}
      <span role="status">{label}</span>
    </div>;
  }
  if (state === "empty") return <StateNotice title="暂无数据">添加符合本图型合同的数据后显示图表。</StateNotice>;
  if (state === "invalid") {
    const error = invalidExampleError(id);
    return <StateNotice title={error ? "已拒绝无效数据" : "校验失败"}>{error ?? "无效样本未被校验器拒绝，停止绘制。"}</StateNotice>;
  }
  if (state === "missing" && !["line", "area", "composed", "heatmap", "choropleth"].includes(id)) return <StateNotice title="本样本含缺测">当前原生组合未验证缺口语义，停止绘制，避免把缺测误读为0或连续观测。</StateNotice>;
  if (!mini && state === "zero" && ["pie", "funnel", "sankey", "sunburst"].includes(id)) return <><StateNotice title="总量为0">本图的占比或流量布局无有效分母，保留零值说明，不生成比例图形。</StateNotice>{props.showData !== false && <ZeroTable {...props} />}</>;
  if (props.size === "mini" && id === "bar") {
    const bars = makeBars(props.revision,state);
    const values = bars.map(row => row.enrolled);
    return <><div className="rain-business-standalone-mini">
      <MiniColumns values={values} maxValue={Math.max(...values,0)} size={miniSize} reduced={props.reduced} />
    </div>{state === "zero" && <p className="rain-chart-note">全零量程使用参考上限1；全部观测值保持0，未绘制正值柱高。</p>}{props.showData !== false && <ExactTable headers={["类别","数量"]} rows={bars.map(row => [row.label,row.enrolled])} />}</>;
  }
  if (id === "area" || id === "line" || id === "scatter" || id === "composed") return <TimeExample {...props} id={id} />;
  if (id === "bar") return <BarsExample {...props} />;
  if (id === "pie" || id === "ring" || id === "radar") return <RadialExample {...props} id={id} />;
  if (id === "funnel") return <FunnelExample {...props} />;
  if (id === "gauge") return <GaugeExample {...props} />;
  if (id === "sankey") return <FlowExample {...props} />;
  if (id === "sunburst") return <SunburstExample {...props} />;
  if (id === "heatmap") return <HeatmapExample {...props} />;
  if (id === "choropleth") return <MapExample {...props} />;
  if (id === "candlestick") return <CandleExample {...props} />;
  if (id === "profit-loss") return <ProfitLossExample {...props} />;
  return <LiveExample {...props} />;
}

function ZeroTable({ id, revision = 0, seriesCount = 3 }: ChartExampleProps) {
  if (id === "pie") return <ExactTable headers={["课程", "数量", "占比"]} rows={makeCategories(revision, "zero", seriesCount).map(item => [item.label, item.value, "不适用"])} />;
  if (id === "funnel") return <ExactTable headers={["阶段", "人数", "占入口人数"]} rows={makeFunnel(revision, "zero").map(item => [item.label, item.value, "不适用"])} />;
  if (id === "sunburst") return <ExactTable headers={["叶项路径", "人次"]} rows={hierarchyLeaves(makeHierarchy(revision, "zero")).map(item => [item.label, item.value])} />;
  const flow = makeFlow(revision, "zero");
  return <ExactTable headers={["来源", "去向", "人次"]} rows={flow.links.map(link => [flow.nodes[link.source]!.name, flow.nodes[link.target]!.name, link.value])} />;
}
