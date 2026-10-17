import "@rain-next/ui/charts/styles.css";
import "./chart-examples.css";
import "./chart-business/chart-business.css";
import { Fragment, useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { Breadcrumb } from "@rain-next/ui";
import {
  curveLinear, curveMonotoneX, AreaChart, Area, LineChart, Line, BarChart, Bar, BarXAxis,
  ComposedChart, SeriesBar, Grid, XAxis, YAxis, ChartTooltip, TooltipContent,
  ChartLegendHoverProvider,
  PieChart, PieSlice, PieCenter, RingChart, Ring, RingCenter,
  RadarChart, RadarGrid, RadarAxis, RadarArea, RadarLabels, ScatterChart, Scatter,
  FunnelChart, Gauge, SankeyChart, SankeyLink, SankeyNode, SankeyTooltip,
  SunburstChart, SunburstSegment, SunburstLabels, SunburstCenter, SunburstHint,
  SunburstBreadcrumb, useSunburstBreadcrumbItems, buildArcs,
  HeatmapChart, HeatmapCells, HeatmapXAxis, HeatmapYAxis, HeatmapLegend, HeatmapTooltip, HeatmapInteractionProvider, HeatmapInteractionBoundary,
  ChoroplethChart, ChoroplethFeatureComponent as ChoroplethFeature, ChoroplethTooltip,
  CandlestickChart, Candlestick,
  LiveLineChart, LiveLine, LiveXAxis, LiveYAxis,
} from "@rain-next/ui/charts";
import { SERIES, RADAR_METRICS, dateLabel, exampleLabel, makeTimeline, makeBars, makeCategories, makeRings, makeRadar, makeFunnel, makeFlow, flowColor, makeHierarchy, hierarchyLeaves, makeHeatmap, makeRegions, intensityColor, makeCandles, makeLivePoints, assertGaugeValue, invalidExampleError, type ChartState } from "./chart-data";

import { CHART_ENTRIES, type ChartId, type ChartRecipe } from "./chart-catalog";
import { ExampleLegend as Legend } from "./chart-variants/shared";
import { ProfitLossExample } from "./chart-variants/profit-loss";
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
};
const immediate = { type: "tween" as const, duration: 0 };
const positive = "var(--chart-positive)";
const negative = "var(--chart-negative)";
const flat = "var(--chart-neutral)";
const finiteValue = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? value : 0;
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

function TimeExample({ id, recipe, revision = 0, replay = 0, reduced = false, state = "normal", seriesCount = 3, size = "standard", miniSize = "compact", showData = true }: ChartExampleProps & { id: "area" | "line" | "scatter" | "composed" }) {
  const data = useMemo(() => makeTimeline(revision, state), [revision, state]);
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
  const motion = { animationDuration: reduced ? 0 : undefined, enterTransition: reduced ? immediate : undefined, revealSignature: String(replay) };
  const tooltipRows = (point: Record<string, unknown>) => id === "composed" ? [
    { label: "参与人数", value: `${point.enrolled} 人`, color: "var(--chart-1)" },
    { label: "完成人数", value: `${point.completed} 人`, color: "var(--chart-2)" },
    { label: "完成率", value: point.rate == null ? "不适用" : `${point.rate}%`, color: "var(--chart-3)" },
  ] : series.map(item => ({ label: exampleLabel(item.label, state), value: `${point[item.key]} 人`, color: item.color }));
  const tooltip = <ChartTooltip className="rain-chart-tooltip" showDatePill={!mini} damping={reduced ? 0 : undefined} content={({ point }) => <TooltipContent title={dateLabel(point.date as Date)} rows={tooltipRows(point)} />} />;
  const axes = !mini && <><Grid horizontal numTicksRows={4} /><YAxis numTicks={4} /><XAxis numTicks={4} /></>;
  const plot = id === "composed" ? <ComposedChart data={data} className="rain-chart-plot" aspectRatio="" margin={{ top: 24, right: 58, bottom: 38, left: 58 }} {...motion}>
    <defs><linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--chart-2)" /><stop offset="100%" stopColor="var(--chart-1)" stopOpacity={.65} /></linearGradient></defs>
    <Grid horizontal numTicksRows={4} /><Area dataKey="enrolled" fill="var(--chart-1)" fillOpacity={.2} animate={!reduced} showMarkers={state === "single"} />
    <SeriesBar dataKey="completed" fill={recipe === "category-solid" ? "var(--chart-2)" : `url(#${gradientId})`} stroke="var(--chart-2)" animate={!reduced} />
    {state !== "zero" && <Line dataKey="rate" yAxisId="right" stroke="var(--chart-3)" fadeEdges={false} curve={curveMonotoneX} animate={!reduced} showMarkers={state === "single"} />}
    <YAxis numTicks={4} />{state !== "zero" && <YAxis yAxisId="right" orientation="right" numTicks={4} formatValue={value => `${value}%`} />}<XAxis numTicks={4} />{tooltip}
  </ComposedChart> : id === "scatter" ? <ScatterChart data={data} className="rain-chart-plot" aspectRatio="" margin={{ top: 24, right: 24, bottom: 38, left: 58 }} {...motion}>
    {series.map(item => <Scatter key={item.key} dataKey={item.key} fill={item.color} radius={5} animate={!reduced} />)}{axes}{tooltip}
  </ScatterChart> : id === "line" ? <LineChart data={data} className={mini ? "rain-chart-mini-plot" : "rain-chart-plot"} aspectRatio="" margin={mini ? miniMargin : { top: 24, right: 24, bottom: 38, left: 58 }} style={mini ? { width: layout.plot.width, height: layout.plot.height } : undefined} yDomainTween={!reduced} {...motion}>
    {series.map(item => <Line key={item.key} dataKey={item.key} stroke={item.color} strokeWidth={mini ? layout.lineWidth : undefined} fadeEdges={false} curve={curveMonotoneX} animate={!reduced} showMarkers={state === "single"} />)}{axes}{tooltip}
  </LineChart> : <AreaChart data={data} className={mini ? "rain-chart-mini-plot" : "rain-chart-plot"} aspectRatio="" margin={mini ? miniMargin : { top: 24, right: 24, bottom: 38, left: 58 }} style={mini ? { width: layout.plot.width, height: layout.plot.height } : undefined} yDomainTween={!reduced} {...motion}>
    {series.map((item, i) => <Area key={item.key} dataKey={item.key} fill={item.color} fillOpacity={i === 0 ? .24 : .15} strokeWidth={mini ? layout.lineWidth : undefined} animate={!reduced} showMarkers={state === "single"} />)}{axes}{tooltip}
  </AreaChart>;
  return <>
    <ChartLegendHoverProvider hoveredIndex={safeHovered} onHoverChange={setHovered}>
      {mini ? <div className="rain-chart-mini-row" data-size={miniSize} style={{ gap: layout.readingGap }}><div><span className="rain-chart-note">最新参与人数</span><p className="rain-chart-metric"><strong>{last?.enrolled ?? 0}</strong><span>人</span></p></div><div className="rain-business-mini" data-mini-kind={id} data-size={miniSize} data-mini-state={state}><div className="rain-business-mini-slot" style={{ width: layout.plot.width, height: layout.plot.height }}>{plot}</div></div></div> : plot}
      {!mini && <Legend hovered={safeHovered} onHover={setHovered} items={id === "composed" ? [
        { label: "参与人数 · 人", value: last?.enrolled ?? 0, color: "var(--chart-1)" },
        { label: "完成人数 · 人", value: last?.completed ?? 0, color: "var(--chart-2)" },
        ...(state !== "zero" ? [{ label: "完成率 · %", value: last?.rate ?? 0, color: "var(--chart-3)" }] : []),
      ] : series.map(item => ({ label: exampleLabel(`${item.label} · 人`, state), value: finiteValue(last?.[item.key]), color: item.color }))} />}
    </ChartLegendHoverProvider>
    {state === "zero" && id === "composed" && <p className="rain-chart-note">参与人数为0，完成率不适用，未绘制比率曲线。</p>}
    {showData && <ExactTable headers={id === "composed" ? ["日期", "参与人数 · 人", "完成人数 · 人", "完成率"] : ["日期", ...series.map(item => `${item.label} · 人`)]} rows={data.map(point => id === "composed" ? [dateLabel(point.date), point.enrolled, point.completed, point.rate == null ? "不适用" : `${point.rate}%`] : [dateLabel(point.date), ...series.map(item => finiteValue(point[item.key]))])} />}
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
  const raw = useMemo(() => makeBars(revision, state), [revision, state]);
  // Stacked values are mutually exclusive groups, rather than overlapping activity metrics.
  const data = kind === "stacked" && state !== "zero" ? raw.map(point => ({ ...point, enrolled: 42 + revision * 3, completed: 36 + revision * 2, returned: 24 + revision, answered: 18, reviewed: 12 })) : raw;
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
    {kind === "stacked" && <p className="rain-chart-note">堆叠样本为互斥成绩等级；参与、完成、复习等重叠指标仅用于分组比较。</p>}
    {gradient && <p className="rain-chart-note">{fade ? "圆头渐隐柱：各系列保持本色，上端不透明，向下渐隐；0基线保留。" : "同色深浅渐变：各系列保持本色，垂直透明度从0.95过渡到0.4。"}</p>}
    {showData && <ExactTable headers={["课程", ...names.map(name => `${name} · 人`)]} rows={data.map(point => [point.label, ...series.map(item => point[item.key])])} />}
  </>;
}

function RadialExample({ id, revision = 0, replay = 0, reduced = false, state = "normal", seriesCount = 3, showData = true }: ChartExampleProps & { id: "pie" | "ring" | "radar" }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [donut, setDonut] = useState(true);
  const categories = useMemo(() => makeCategories(revision, state, seriesCount), [revision, state, seriesCount]);
  const rings = useMemo(() => makeRings(revision, state, seriesCount), [revision, state, seriesCount]);
  const radar = useMemo(() => makeRadar(revision, state, seriesCount), [revision, state, seriesCount]);
  const data = id === "ring" ? rings : categories;
  const safeHovered = validHover(hovered, id === "radar" ? radar.length : data.length);
  const hoveredCategory = safeHovered == null ? undefined : categories[safeHovered];
  const hoveredRing = safeHovered == null ? undefined : rings[safeHovered];
  useEffect(() => setHovered(null), [id, state, seriesCount]);
  const total = categories.reduce((sum, item) => sum + item.value, 0);
  return <>
    {id === "pie" && <label className="rain-chart-example-control">形态 <select aria-label="饼图形态" value={donut ? "donut" : "pie"} onChange={event => setDonut(event.target.value === "donut")}><option value="donut">环饼</option><option value="pie">饼图</option></select></label>}
    <div className="rain-chart-radial">
      {id === "pie" ? <PieChart key={`${replay}-${donut}`} data={categories} className="rain-chart-radial-plot" innerRadius={donut ? 72 : 0} padAngle={.035} cornerRadius={5} hoveredIndex={safeHovered} onHoverChange={setHovered} enterTransition={reduced ? immediate : undefined}>
        {categories.map((item, index) => <PieSlice key={item.label} index={index} color={item.color} animate={!reduced} showGlow={false} />)}
        {donut && <PieCenter defaultLabel="课程总量" suffix="" valueClassName="rain-chart-center-value" labelClassName="rain-chart-center-label" />}
      </PieChart> : id === "ring" ? <RingChart key={replay} data={rings} className="rain-chart-radial-plot" hoveredIndex={safeHovered} onHoverChange={setHovered} baseInnerRadius={60} strokeWidth={13} ringGap={8} enterTransition={reduced ? immediate : undefined}>
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
    {id === "ring" && <p className="rain-chart-note" role="status">{hoveredRing ? `${hoveredRing.label}：${hoveredRing.value}/${hoveredRing.maxValue}` : "每环使用自身目标值；悬停或聚焦图例读取进度。"}</p>}
    {showData && <ExactTable headers={id === "ring" ? ["独立目标", "当前值", "目标值", "进度"] : id === "radar" ? ["课程", ...RADAR_METRICS.map(metric => metric.label)] : ["课程", "数量", "占比"]} rows={id === "ring" ? rings.map(item => [item.label, item.value, item.maxValue, `${Math.round(item.value / item.maxValue * 100)}%`]) : id === "radar" ? radar.map(item => [item.label, ...RADAR_METRICS.map(metric => item.values[metric.key])]) : categories.map(item => [item.label, item.value, total ? `${(item.value / total * 100).toFixed(1)}%` : "不适用"])} />}
  </>;
}

function FunnelExample({ revision = 0, replay = 0, reduced = false, state = "normal", recipe, showData = true }: ChartExampleProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = useMemo(() => makeFunnel(revision, state), [revision, state]);
  const safeHovered = validHover(hovered, data.length);
  const hoveredStage = safeHovered == null ? undefined : data[safeHovered];
  const total = data[0]?.value ?? 0;
  useEffect(() => setHovered(null), [state]);
  const mono = recipe === "monochrome-blue";
  const shades = [2, 1, 3, 4, 5];
  const stages = data.map((item, i) => ({ ...item, color: mono ? `var(--chart-${shades[i]})` : recipe === "trend-soft" ? "var(--chart-1)" : SERIES[i % 5]!.color,
    ...(recipe !== "category-solid" ? { gradient: [{ offset: "0%", color: mono ? `var(--chart-${shades[i]})` : "var(--chart-1)" }, { offset: "100%", color: mono ? `var(--chart-${shades[i + 1]})` : "var(--chart-2)" }] } : {}),
  }));
  return <>
    <FunnelChart key={replay} data={stages} className="rain-chart-plot rain-chart-funnel" style={{ height: 280 }} orientation="horizontal" layers={3} gap={8} edges="curved" labelLayout="spread" labelOrientation="horizontal" formatValue={value => `${value} 人`} formatPercentage={value => `${Math.round(value)}%`} hoveredIndex={safeHovered} onHoverChange={setHovered} enterTransition={reduced ? immediate : undefined} staggerDelay={reduced ? 0 : undefined} />
    <p className="rain-chart-note" role="status">{hoveredStage ? `${hoveredStage.label}：${hoveredStage.value} 人，占入口人数 ${total ? `${Math.round(hoveredStage.value / total * 100)}%` : "不适用"}` : "百分比以第一阶段人数为分母。"}</p>
    {showData && <ExactTable headers={["阶段", "人数", "占入口人数"]} rows={data.map(item => [item.label, item.value, total ? `${(item.value / total * 100).toFixed(1)}%` : "不适用"])} />}
  </>;
}

function GaugeExample({ revision = 0, replay = 0, reduced = false, state = "normal", showData = true }: ChartExampleProps) {
  const [orientation, setOrientation] = useState<"arc" | "linear">("arc");
  const [reading, setReading] = useState<"sample" | "50" | "100">("sample");
  useEffect(() => setReading("sample"), [state]);
  const value = state === "zero" ? 0 : reading === "sample" ? 76 + revision % 2 * 4 : Number(reading);
  assertGaugeValue(value);
  return <>
    <label className="rain-chart-example-control">形态 <select aria-label="仪表形态" value={orientation} onChange={event => setOrientation(event.target.value as typeof orientation)}><option value="arc">弧形刻度</option><option value="linear">线形刻度</option></select></label>
    <label className="rain-chart-example-control">读数 <select aria-label="仪表读数" value={reading} disabled={state === "zero"} onChange={event => setReading(event.target.value as typeof reading)}><option value="sample">当前数据</option><option value="50">50%</option><option value="100">100%</option></select></label>
    <div className="rain-chart-gauge"><Gauge key={`${replay}-${orientation}`} className="rain-chart-gauge-plot" orientation={orientation} value={value} centerValue={value} defaultLabel={exampleLabel("目标达成率", state)} suffix="%" useGradient inactiveFill="var(--chart-grid)" inactiveFillOpacity={.55} totalNotches={40} enterTransition={reduced ? immediate : undefined} enterStaggerScale={reduced ? 0 : undefined} /></div>
    {showData && <ExactTable headers={["指标", "当前值", "量程"]} rows={[["目标达成率", `${value}%`, "0—100%"]]} />}
  </>;
}

function FlowExample({ revision = 0, replay = 0, reduced = false, state = "normal", showData = true }: ChartExampleProps) {
  const data = useMemo(() => makeFlow(revision, state), [revision, state]);
  const plotData = useMemo(() => ({ ...data, nodes: data.nodes.map(node => ({ ...node, name: ({ "课程入口": "入口", "学习提醒": "提醒", "观看视频": "视频", "阅读资料": "资料", "完成学习": "完成", "继续学习": "继续" } as Record<string, string>)[node.key]! })) }), [data]);
  const getNodeColor = (node: { name: string; key?: string }) => flowColor(node);
  return <>
    <SankeyChart data={plotData} className="rain-chart-plot rain-chart-flow" aspectRatio="" margin={{ top: 28, bottom: 28, left: 82, right: 82 }} nodePadding={32} revealSignature={String(replay)} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? immediate : undefined}>
      <SankeyLink getNodeColor={getNodeColor} /><SankeyNode getNodeColor={getNodeColor} showValueLabels={false} />
      <SankeyTooltip className="rain-chart-tooltip" nodeContent={({ node, index }) => <TooltipContent title={data.nodes[index]!.name} rows={[{ label: "流量 · 人次", value: node.value ?? 0, color: flowColor(node) }]} />} linkContent={({ link, index }) => <TooltipContent title={`${data.nodes[data.links[index]!.source]!.name} → ${data.nodes[data.links[index]!.target]!.name}`} rows={[{ label: "人次", value: link.value, color: flowColor(data.nodes[data.links[index]!.source]!) }]} />} />
    </SankeyChart>
    <p className="rain-chart-note">图中使用短名称；悬停节点或打开精确数据可读取完整名称。</p>
    {showData && <ExactTable headers={["来源", "去向", "人次"]} rows={data.links.map(link => [data.nodes[link.source]!.name, data.nodes[link.target]!.name, link.value])} />}
  </>;
}

function DrillBreadcrumb() {
  const { items, zoomTo } = useSunburstBreadcrumbItems();
  if (items.length === 1) return <h3 className="rain-chart-sunburst-title">{items[0]!.label}</h3>;
  return <Breadcrumb aria-label="学习内容层级"><Breadcrumb.List>{items.map((item, index) => <Fragment key={item.id}>
    {index > 0 && <Breadcrumb.Separator />}
    <Breadcrumb.Item>{item.isCurrent ? <Breadcrumb.Page>{item.label}</Breadcrumb.Page> : <Breadcrumb.Link href="#chart-sunburst" onClick={event => { event.preventDefault(); zoomTo(item.id); }} aria-label={`返回${item.label}`}>{item.label}</Breadcrumb.Link>}</Breadcrumb.Item>
  </Fragment>)}</Breadcrumb.List></Breadcrumb>;
}

function SunburstExample({ revision = 0, replay = 0, reduced = false, state = "normal", recipe, showData = true }: ChartExampleProps) {
  const data = useMemo(() => makeHierarchy(revision, state), [revision, state]);
  const { arcs } = useMemo(() => buildArcs(data), [data]);
  return <>
    <div className="rain-chart-sunburst"><SunburstChart data={data} playKey={replay} size={360} className="rain-chart-radial-plot" enterTransition={reduced ? immediate : undefined} enterStaggerScale={reduced ? 0 : undefined} hoverPop={reduced ? 0 : undefined}>
      <SunburstBreadcrumb className="rain-chart-sunburst-heading"><DrillBreadcrumb /></SunburstBreadcrumb>
      {arcs.map((arc, index) => <SunburstSegment key={arc.id} index={index} color={recipe === "monochrome-blue" ? `var(--chart-${arc.categoryIndex + 3})` : undefined} />)}<SunburstLabels fontSize={12} fill={recipe === "monochrome-blue" ? "var(--foreground)" : undefined} /><SunburstCenter />
      <SunburstHint className="rain-chart-note">{({ hoveredArc, focus }) => hoveredArc ? `${hoveredArc.trail.join(" › ")} · ${hoveredArc.value} 人次` : focus.depth === 0 ? "悬停读取，点击扇区下钻；面包屑返回上层。" : "点击中心或面包屑返回上层。"}</SunburstHint>
    </SunburstChart></div>
    {showData && <ExactTable headers={["叶项路径", "人次"]} rows={hierarchyLeaves(data).map(item => [item.label, item.value])} />}
  </>;
}

function HeatmapExample({ revision = 0, replay = 0, reduced = false, state = "normal", showData = true }: ChartExampleProps) {
  const data = useMemo(() => makeHeatmap(revision, state), [revision, state]);
  return <>
    <HeatmapInteractionProvider><HeatmapInteractionBoundary>
      <HeatmapChart data={data} className="rain-chart-heatmap" layout="fluid" binSize={0} gap={4} margin={{ top: 30, left: 40, right: 12, bottom: 8 }} weekStartDay={0} colorScale={value => intensityColor(value, 4)} revealSignature={String(replay)} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? immediate : undefined} animate={!reduced}>
        <HeatmapCells cornerRadius={3} colorScale={value => intensityColor(value, 4)} /><HeatmapXAxis /><HeatmapYAxis labelFormat="initial" /><HeatmapTooltip className="rain-chart-tooltip" formatLabel={(count, date) => `${dateLabel(date)} · ${count} 次学习`} instant={reduced} />
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

function CandleExample({ revision = 0, replay = 0, reduced = false, state = "normal", showData = true }: ChartExampleProps) {
  const data = useMemo(() => makeCandles(revision, state), [revision, state]);
  const [hovered, setHovered] = useState<number | null>(null);
  const color = (point: Record<string, unknown>) => finiteValue(point.close) < finiteValue(point.open) ? negative : positive;
  return <><ChartLegendHoverProvider hoveredIndex={hovered} onHoverChange={setHovered}>
    <CandlestickChart data={data} className="rain-chart-plot" aspectRatio="" margin={{ top: 24, right: 24, bottom: 38, left: 58 }} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? immediate : undefined} revealSignature={String(replay)}>
      <Grid horizontal numTicksRows={4} /><Candlestick positiveFill={positive} negativeFill={negative} animate={!reduced} />
      <YAxis numTicks={4} /><XAxis numTicks={4} /><ChartTooltip className="rain-chart-tooltip" showDots={false} indicatorColor={color} damping={reduced ? 0 : undefined} content={({ point }) => <TooltipContent title={dateLabel(point.date as Date)} rows={[{ label: "开盘", value: finiteValue(point.open), color: color(point) }, { label: "最高", value: finiteValue(point.high), color: color(point) }, { label: "最低", value: finiteValue(point.low), color: color(point) }, { label: "收盘", value: finiteValue(point.close), color: color(point) }]} />} />
    </CandlestickChart>
    <Legend hovered={hovered} onHover={setHovered} items={[{ label: "上涨 / 平盘（收盘≥开盘）", value: 0, color: positive }, { label: "下跌（收盘＜开盘）", value: 0, color: negative }]} />
  </ChartLegendHoverProvider><p className="rain-chart-note">平盘为横向实体；方向颜色不代表业务好坏。</p>
    {showData && <ExactTable headers={["日期", "开盘", "最高", "最低", "收盘", "方向"]} rows={data.map(point => [dateLabel(point.date), point.open, point.high, point.low, point.close, point.close > point.open ? "上涨" : point.close < point.open ? "下跌" : "平盘"])} />}
  </>;
}


function LiveExample({ revision = 0, replay = 0, reduced = false, state = "normal", recipe, showData = true }: ChartExampleProps) {
  const [points, setPoints] = useState(() => makeLivePoints(undefined, revision, state));
  const [pausedByUser, setPausedByUser] = useState(false);
  const [manualEpoch, setManualEpoch] = useState(0);
  const paused = reduced || pausedByUser;
  useEffect(() => {
    setPoints(makeLivePoints(undefined, revision, state));
    if (paused) setManualEpoch(epoch => epoch + 1);
  }, [revision, state]);
  const append = () => {
    setPoints(previous => {
      const time = Date.now() / 1000;
      if (time <= (previous.at(-1)?.time ?? 0)) return previous;
      const value = state === "zero" ? 0 : Math.round(90 + Math.sin(time * .31) * 22 + revision * 8);
      return [...previous.slice(-119), { time, value }];
    });
    // A paused native clock is frozen. Remount only explicit manual updates so
    // the chart's virtual "now" points remain after the newest observation.
    if (paused) setManualEpoch(epoch => epoch + 1);
  };
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(append, 1000);
    return () => window.clearInterval(timer);
  }, [paused, revision, state]);
  const latest = points.at(-1)?.value ?? 0;
  const timestamp = (value: number) => new Date(value * 1000).toLocaleTimeString("zh-CN", { hour12: false, minute: "2-digit", second: "2-digit" });
  return <>
    <div className="rain-chart-live-controls"><button type="button" onClick={() => setPausedByUser(value => !value)} disabled={reduced}>{paused ? "恢复实时" : "暂停实时"}</button><button type="button" onClick={append} disabled={!paused}>追加一次</button><span className="rain-chart-note" role="status" data-live-paused={paused} data-live-count={points.length}>{paused ? reduced ? "减少动效 · 手动更新" : "已暂停" : "每秒更新"} · {points.length}/120条</span></div>
    <LiveLineChart key={`${replay}-${manualEpoch}`} data={points} value={latest} dataKey="value" className="rain-chart-plot" style={{ height: 300 }} window={60} numXTicks={4} nowOffsetUnits={.2} paused={paused} margin={{ top: 24, right: 64, bottom: 38, left: 58 }}>
      <LiveLine dataKey="value" stroke="var(--chart-1)" fill pulse={!reduced && !paused} badge momentumColors={recipe === "sign" ? { up: positive, down: negative, flat } : undefined} />
      <LiveYAxis position="left" formatValue={value => String(Math.round(value))} allowDecimals={false} /><LiveXAxis numTicks={4} formatTime={timeMs => timestamp(timeMs / 1000)} /><ChartTooltip className="rain-chart-tooltip" damping={reduced ? 0 : undefined} showDatePill={false} content={({ point }) => <TooltipContent title={timestamp((point.date as Date).getTime() / 1000)} rows={[{ label: "实时人数 · 插值读数", value: `${finiteValue(point.value).toFixed(1)} 人`, color: "var(--chart-1)" }]} />} />
    </LiveLineChart>
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
  if (mini && ["empty", "invalid", "missing"].includes(state)) {
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
  if (state === "missing" && !["heatmap", "choropleth"].includes(id)) return <StateNotice title="本样本含缺测">当前原生组合未验证缺口语义，停止绘制，避免把缺测误读为0或连续观测。</StateNotice>;
  if (!mini && state === "zero" && ["pie", "funnel", "sankey", "sunburst"].includes(id)) return <><StateNotice title="总量为0">本图的占比或流量布局无有效分母，保留零值说明，不生成比例图形。</StateNotice>{props.showData !== false && <ZeroTable {...props} />}</>;
  if (props.size === "mini" && ["bar","pie","ring"].includes(id)) {
    const bars = makeBars(props.revision,state), categories = makeCategories(props.revision,state,props.seriesCount), rings = makeRings(props.revision,state,props.seriesCount);
    const values = id === "bar" ? bars.map(row => row.enrolled) : categories.map(row => row.value);
    return <><div className="rain-business-standalone-mini">
      {id === "bar" ? <MiniColumns values={values} maxValue={Math.max(...values,0)} size={miniSize} reduced={props.reduced} /> : id === "pie" ? <><MiniPie values={values} size={miniSize} reduced={props.reduced} /><MiniPie values={values} donut size={miniSize} reduced={props.reduced} /></> : rings.map(item => <div key={item.label}><MiniProgress value={item.value} maxValue={item.maxValue} size={miniSize} reduced={props.reduced} /><span>{item.label} {miniSize === "compact" ? getProgressReading(item.value,item.maxValue).percentText : `${item.value} / ${item.maxValue}`}</span></div>)}
    </div>{props.showData !== false && <ExactTable headers={id === "ring" ? ["目标","完成","目标总量"] : ["类别","数量"]} rows={id === "ring" ? rings.map(item => [item.label,item.value,item.maxValue]) : id === "bar" ? bars.map(row => [row.label,row.enrolled]) : categories.map(row => [row.label,row.value])} />}</>;
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
