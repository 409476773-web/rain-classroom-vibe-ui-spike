import { useId, useMemo, useState, type ReactNode } from "react";
import {
  AreaChart, Area, LineChart, Line,
  ComposedChart, SeriesBar, Grid, XAxis, YAxis, ChartTooltip, TooltipContent,
  ChartLegend, ChartLegendHoverProvider, Background, ReferenceArea,
  PatternLines, PatternArea, SegmentBackground, SegmentLineFrom, SegmentLineTo,
  ChartBrush, ChartBrushLayout, ChartMarkers, LineSeriesTerminalMarker, ProjectionLine, ProjectionLineEndMarker,
  buildProjectionPath, curveBasis, curveCatmullRom, curveLinear, curveMonotoneX, curveNatural, curveStep,
  type ChartBrushLayoutState, type ChartMarker,
} from "@rain-next/ui/charts";
import { PublishIcon } from "@rain-next/ui/icons/publish";
import { NotificationIcon } from "@rain-next/ui/icons/notification";
import { makeTimeline, dateLabel } from "../chart-data";
import { immediate, seriesColors, useVariantSetting, VariantTable, type VariantExampleProps } from "./shared";
import { ProfitLossExample } from "./profit-loss";

export const TREND_VARIANT_IDS = [
  "area-interactive", "area-default", "area-step", "area-stacked", "area-gradient", "area-no-stroke", "area-fade-edges", "area-loading", "area-loading-sweep", "area-segment-selection", "area-pattern", "area-series-markers", "area-dashed-tail", "area-left-y-axis", "area-dual-y-axis", "area-pattern-background", "area-dot-grid-background", "area-reference-band", "area-pattern-reference-band",
  "line-trio-brush", "line-projection", "line-linear", "line-event-markers", "line-segment-selection", "line-multiple-lines", "line-x-axis", "line-x-y-axis", "line-series-markers", "line-loading", "line-loading-sweep", "line-dashed-tail", "line-left-y-axis", "line-dual-y-axis", "line-profit-loss", "line-pattern-background", "line-dot-grid-background", "line-reference-band", "line-pattern-reference-band",
  "composed-default", "composed-bar-line", "composed-lime-amber-red", "composed-stacked-bar-line", "composed-grouped-no-gap", "composed-pattern-fills", "composed-bar-two-lines", "composed-markers-dashed-tail", "composed-left-y-axis", "composed-dual-y-axis", "composed-pattern-background", "composed-dot-grid-background", "composed-reference-band", "composed-pattern-reference-band",
] as const;

const curveOptions = [
  { value: "natural", label: "Natural", curve: curveNatural },
  { value: "monotoneX", label: "Monotone X", curve: curveMonotoneX },
  { value: "linear", label: "Linear", curve: curveLinear },
  { value: "step", label: "Step", curve: curveStep },
  { value: "basis", label: "Basis", curve: curveBasis },
  { value: "catmullRom", label: "Catmull–Rom", curve: curveCatmullRom.alpha(.42) },
] as const;
type Series = { key: string; label: string; color: string; unit: string };
const people: Series[] = [
  { key: "enrolled", label: "参与人数", color: seriesColors[0]!, unit: "人" },
  { key: "completed", label: "完成人数", color: seriesColors[1]!, unit: "人" },
  { key: "returned", label: "复习人数", color: seriesColors[2]!, unit: "人" },
];
const rate: Series = { key: "rate", label: "完成率", color: seriesColors[1]!, unit: "%" };
const baseMargin = { top: 24, right: 16, bottom: 38, left: 16 };

function exactRows(data: Record<string, unknown>[], series: Series[]) {
  return data.map(point => Object.fromEntries([
    ["日期", dateLabel(point.date as Date)],
    ...series.map(item => [`${item.label} · ${item.unit}`, point[item.key]]),
  ]));
}

function TrendLegend({ series, data, hovered, onHover }: { series: Series[]; data: Record<string, unknown>[]; hovered: number | null; onHover: (index: number | null) => void }) {
  const last = data.at(-1);
  return <ChartLegend className="rain-chart-legend" showValue={false} hoveredIndex={hovered} onHover={onHover} items={series.map(item => ({ label: `${item.label} · ${item.unit}`, color: item.color, value: Number(last?.[item.key] ?? 0) }))}
    renderItem={({ item, index, isHovered, isFaded }) => <button type="button" className="rain-chart-legend-button" onFocus={() => onHover(index)} onBlur={() => onHover(null)} onClick={() => onHover(hovered === index ? null : index)} aria-pressed={isHovered} style={{ display: "flex", alignItems: "center", gap: "var(--rain-space-8)", opacity: isFaded ? .4 : 1 }}><span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: "50%", background: item.color }} />{item.label}</button>} />;
}

function tooltip(series: Series[], reduced: boolean, extra?: (point: Record<string, unknown>) => ReactNode) {
  return <ChartTooltip className="rain-chart-tooltip" damping={reduced ? 0 : undefined} content={({ point }) => <>
    <TooltipContent title={dateLabel(point.date as Date)} rows={series.map(item => ({ label: item.label, value: point[item.key] == null ? "不适用" : `${point[item.key]} ${item.unit}`, color: item.color }))} />
    {extra?.(point)}
  </>} />;
}

/** Shared reading layers stay real native chart parts and allocate their own SVG IDs. */
function readingLayer(variantId: string, low = 160, high = 220): ReactNode {
  if (variantId.endsWith("-dot-grid-background")) return <Background pattern="dots" opacity={.85} />;
  if (variantId.endsWith("-pattern-background")) return <Background />;
  if (variantId.endsWith("-pattern-reference-band")) return <ReferenceArea y1={low} y2={high} pattern="diagonal" patternColor="var(--chart-foreground-muted)" axisLabelColor={seriesColors[0]} fillOpacity={.85} />;
  if (variantId.endsWith("-reference-band")) return <ReferenceArea y1={low} y2={high} strokeStyle="dashed" showMarkers />;
  return <Grid horizontal vertical={variantId === "line-x-y-axis"} numTicksRows={4} />;
}

function AreaOrLineVariant(props: VariantExampleProps) {
  const { variantId, revision, replay, reduced, active, curveName, onCurveChange } = props;
  const area = variantId.startsWith("area-");
  const interactive = variantId === "area-interactive";
  const loadingExample = variantId.includes("-loading");
  const [showLoading, setShowLoading] = useVariantSetting("loading", true, props);
  const [selectedCurve, setSelectedCurve] = useState("monotoneX");
  const [hovered, setHovered] = useState<number | null>(null);
  const curveId = curveName ?? selectedCurve;
  const curve = variantId === "area-step" ? curveStep : variantId === "line-linear" ? curveLinear : interactive ? curveOptions.find(option => option.value === curveId)?.curve ?? curveMonotoneX : area ? curveMonotoneX : curveNatural;
  const patternId = `rain-trend-pattern-${useId().replaceAll(":", "")}`;
  const data = useMemo(() => {
    const rows = makeTimeline(revision);
    return variantId.includes("-series-markers") || variantId.includes("-dashed-tail") ? rows.slice(0, 7) : rows;
  }, [revision, variantId]);
  const dual = variantId.endsWith("-dual-y-axis");
  const reference = variantId.includes("-reference-band");
  const left = variantId.endsWith("-left-y-axis") || reference;
  const multi = interactive || variantId === "area-stacked" || variantId === "line-multiple-lines" || left;
  const series = dual ? [people[0]!, rate] : people.slice(0, multi ? 2 : 1);
  const selectSegment = interactive || variantId.includes("-segment-selection");
  const pattern = variantId === "area-pattern";
  const noStroke = variantId === "area-no-stroke";
  const gradient = variantId === "area-gradient";
  const showXAxis = area && !gradient || !["line-linear", "line-event-markers", "line-segment-selection", "line-multiple-lines", "line-loading", "line-loading-sweep"].includes(variantId);
  const reducedNow = reduced || !active;
  const motion = { animationDuration: reducedNow ? 0 : undefined, enterTransition: reducedNow ? immediate : undefined, revealSignature: `${replay}`, yDomainTween: !reducedNow };
  const margin = { ...baseMargin, left: left || dual ? 58 : baseMargin.left, right: dual ? 58 : baseMargin.right, top: variantId === "line-event-markers" ? 60 : baseMargin.top };
  const events: ChartMarker[] = variantId === "line-event-markers" ? [
    { date: data[6]!.date, icon: <PublishIcon size="small" />, title: "课程发布", description: "开放新的课程内容。" },
    { date: data[16]!.date, icon: <NotificationIcon size="small" />, title: "学习提醒", description: "向参与者发送学习提醒。" },
  ] : [];
  const showLoop = loadingExample && showLoading && active && !reduced;
  const loadingStyle = variantId.endsWith("-sweep") ? "sweep" : "pulse";
  const loadingGrid = <Grid horizontal shimmer={loadingStyle === "pulse"} shimmerSync stroke="var(--chart-grid)" shimmerStroke="var(--chart-foreground)" />;
  const loading = showLoop ? area ? <AreaChart key="loading" data={[]} status="loading" loadingLabel="加载中" animationDuration={0} className="rain-chart-plot" aspectRatio="" margin={margin}>
    {loadingGrid}<Area dataKey="value" curve={curveNatural} fill="transparent" fillOpacity={0} stroke="transparent" fadeEdges={false} loading loadingStyle={loadingStyle} showHighlight={false} />
  </AreaChart> : <LineChart key="loading" data={[]} status="loading" loadingLabel="加载中" animationDuration={0} className="rain-chart-plot" aspectRatio="" margin={margin}>
    {loadingGrid}<Line dataKey="value" curve={curveNatural} stroke="transparent" fadeEdges={false} loading loadingStyle={loadingStyle} showHighlight={false} />
  </LineChart> : null;
  const common = <>
    {readingLayer(variantId)}
    {selectSegment && <SegmentBackground />}
    {pattern && <PatternLines id={patternId} width={6} height={6} orientation={["diagonal"]} stroke={seriesColors[0]!} strokeWidth={1} />}
    {pattern && <PatternArea dataKey="enrolled" fill={`url(#${patternId})`} />}
  </>;
  const commonAfter = <>
    {selectSegment && <SegmentLineFrom />}{selectSegment && <SegmentLineTo />}
    {(left || dual) && <YAxis numTicks={4} formatValue={value => `${value}人`} />}
    {dual && <YAxis orientation="right" yAxisId="right" numTicks={4} formatValue={value => `${value}%`} />}
    {showXAxis && <XAxis numTicks={4} tickMode={data.length === 7 ? "data" : undefined} />}
    {tooltip(series, reducedNow, variantId === "line-event-markers" ? point => <div className="rain-chart-note">{events.filter(event => event.date.getTime() === (point.date as Date).getTime()).map(event => <p key={event.title}>{event.title}：{event.description}</p>)}</div> : undefined)}
  </>;
  const plot = area ? <AreaChart data={data} className="rain-chart-plot" aspectRatio="" margin={margin} {...motion}>
    {common.props.children}
    {series.map((item, index) => <Area key={item.key} dataKey={item.key} yAxisId={dual && index === 1 ? "right" : "left"} curve={curve} fill={item.color} stroke={item.color} fillOpacity={pattern ? 0 : gradient || noStroke ? .5 : interactive && index === 1 ? .2 : .3} gradientToOpacity={gradient ? .05 : 0} strokeWidth={interactive && index === 1 ? 1.5 : 2} showLine={!noStroke} fadeEdges={variantId === "area-fade-edges"} animate={!reducedNow} showMarkers={variantId === "area-series-markers"} dashFromIndex={variantId === "area-dashed-tail" ? 5 : undefined} dashArray="6,4" />)}
    {commonAfter.props.children}
  </AreaChart> : <LineChart data={data} className="rain-chart-plot" aspectRatio="" margin={margin} {...motion}>
    {common.props.children}
    {series.map((item, index) => <Line key={item.key} dataKey={item.key} yAxisId={dual && index === 1 ? "right" : "left"} curve={curve} stroke={item.color} strokeWidth={variantId === "line-series-markers" || variantId === "line-dashed-tail" ? 2.5 : 2} fadeEdges={variantId !== "line-series-markers"} animate={!reducedNow} showMarkers={variantId === "line-series-markers"} dashFromIndex={variantId === "line-dashed-tail" ? 5 : undefined} dashArray="6,4" />)}
    {variantId === "line-event-markers" && <ChartMarkers items={events} animate={!reducedNow} />}
    {commonAfter.props.children}
  </LineChart>;
  return <>
    {interactive && <label className="rain-chart-example-control">曲线 <select aria-label="图表曲线" value={curveId} onChange={event => { setSelectedCurve(event.target.value); onCurveChange?.(event.target.value); }}>{curveOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>}
    {loadingExample && <div className="rain-chart-live-controls"><button type="button" aria-pressed={showLoading} onClick={() => setShowLoading(value => !value)}>{showLoading ? "显示数据" : "显示加载"}</button><span role="status">{showLoop ? "加载动画运行中" : showLoading ? "加载动画已暂停，显示静态数据" : "数据已就绪"}</span></div>}
    <ChartLegendHoverProvider hoveredIndex={hovered} onHoverChange={setHovered}>{loading ?? plot}{series.length > 1 && <TrendLegend series={series} data={data} hovered={hovered} onHover={setHovered} />}</ChartLegendHoverProvider>
    {dual && <p className="rain-chart-note">左轴：参与人数 · 人；右轴：完成率 · %。两轴独立读取。</p>}
    {variantId === "area-stacked" && <p className="rain-chart-note">两个面积从同一基线叠层显示，各自读数；数值没有累加。</p>}
    {selectSegment && <p className="rain-chart-note">按下并拖动显示临时范围，松开后恢复全量；精确数值见数据表。</p>}
    {variantId.endsWith("-dashed-tail") && <p className="rain-chart-note">第6个数据点起为尚未结束的时段，用虚线尾段区分。</p>}
    {variantId === "line-event-markers" && <ul className="rain-chart-note">{events.map(event => <li key={event.title}>{dateLabel(event.date)} · {event.title}：{event.description}</li>)}</ul>}
    <VariantTable data={exactRows(data, series)} />
  </>;
}

function ComposedVariant({ variantId, revision, replay, reduced, active, curveName, onCurveChange }: VariantExampleProps) {
  const [selectedCurve, setSelectedCurve] = useState("catmullRom");
  const [hovered, setHovered] = useState<number | null>(null);
  const curveId = curveName ?? selectedCurve;
  const curve = curveOptions.find(option => option.value === curveId)?.curve ?? curveCatmullRom.alpha(.42);
  const hero = variantId === "composed-default";
  const dual = variantId === "composed-dual-y-axis";
  const left = variantId === "composed-left-y-axis" || variantId.includes("-reference-band");
  const stacked = variantId === "composed-stacked-bar-line";
  const grouped = variantId === "composed-grouped-no-gap" || variantId === "composed-pattern-fills";
  const pattern = variantId === "composed-pattern-fills";
  const twoLines = variantId === "composed-bar-two-lines";
  const markers = variantId === "composed-markers-dashed-tail";
  const accents = variantId === "composed-lime-amber-red";
  const area = hero || accents || markers;
  const patternId = `rain-composed-pattern-${useId().replaceAll(":", "")}`;
  const reducedNow = reduced || !active;
  const data = useMemo(() => {
    const timeline = makeTimeline(revision);
    const rows = markers ? timeline.slice(0, 7) : timeline;
    return rows.map(point => ({ ...point, unfinished: point.enrolled - point.completed }));
  }, [revision, markers]);
  const column: Series = markers ? people[0]! : stacked ? { key: "completed", label: "已完成", color: seriesColors[2]!, unit: "人" } : { ...people[1]!, color: seriesColors[2]! };
  const secondColumn: Series = stacked ? { key: "unfinished", label: "未完成", color: seriesColors[4]!, unit: "人" } : { ...people[2]!, color: seriesColors[4]! };
  const lineSeries = markers ? { ...people[2]!, color: seriesColors[1]! } : dual ? { ...rate, color: seriesColors[0]! } : people[0]!;
  const areaSeries = { ...people[2]!, color: seriesColors[3]! };
  const secondLine = { ...people[2]!, color: seriesColors[1]! };
  const series = [column, ...(stacked || grouped ? [secondColumn] : []), lineSeries, ...(twoLines ? [secondLine] : area && !markers ? [areaSeries] : [])];
  return <>
    {hero && <label className="rain-chart-example-control">曲线 <select aria-label="图表曲线" value={curveId} onChange={event => { setSelectedCurve(event.target.value); onCurveChange?.(event.target.value); }}>{curveOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>}
    <ChartLegendHoverProvider hoveredIndex={hovered} onHoverChange={setHovered}>
      <ComposedChart data={data} className="rain-chart-plot" aspectRatio="" margin={{ ...baseMargin, left: left || dual ? 58 : 16, right: dual ? 58 : 16 }} barGap={0} maxBarSize={twoLines ? 20 : pattern ? 22 : grouped ? 26 : stacked ? 28 : 32} stacked={stacked} stackGap={0} animationDuration={reducedNow ? 0 : undefined} enterTransition={reducedNow ? immediate : undefined} revealSignature={String(replay)}>
        {readingLayer(variantId)}
        {pattern && <PatternLines id={patternId} width={6} height={6} orientation={["diagonal"]} stroke={seriesColors[2]!} strokeWidth={1} />}
        {area && <Area dataKey={areaSeries.key} curve={hero ? curve : curveMonotoneX} fill={areaSeries.color} stroke={areaSeries.color} fillOpacity={accents ? .22 : .32} strokeWidth={accents ? 1.5 : 2} showMarkers={markers} dashFromIndex={markers ? 4 : undefined} dashArray="6,4" animate={!reducedNow} />}
        <SeriesBar dataKey={column.key} fill={pattern ? `url(#${patternId})` : column.color} stroke={column.color} radius={stacked ? 0 : accents ? 6 : grouped ? 4 : 5} animate={!reducedNow} />
        {(stacked || grouped) && <SeriesBar dataKey={secondColumn.key} fill={secondColumn.color} radius={stacked ? 0 : 4} animate={!reducedNow} />}
        <Line dataKey={lineSeries.key} yAxisId={dual ? "right" : "left"} curve={hero ? curve : markers ? curveMonotoneX : curveNatural} stroke={lineSeries.color} strokeWidth={hero || accents ? 2.5 : 2} fadeEdges={false} animate={!reducedNow} showMarkers={markers} dashFromIndex={markers ? 4 : undefined} dashArray="6,4" />
        {twoLines && <Line dataKey={secondLine.key} stroke={secondLine.color} curve={curveNatural} fadeEdges={false} animate={!reducedNow} />}
        {(left || dual) && <YAxis numTicks={4} formatValue={value => `${value}人`} />}
        {dual && <YAxis orientation="right" yAxisId="right" numTicks={4} formatValue={value => `${value}%`} />}
        <XAxis numTicks={4} tickMode={markers ? "data" : undefined} />
        {tooltip(series, reducedNow)}
      </ComposedChart>
      <TrendLegend series={series} data={data} hovered={hovered} onHover={setHovered} />
    </ChartLegendHoverProvider>
    {dual && <p className="rain-chart-note">左轴：完成人数 · 人；右轴：完成率 · %。完成率=完成人数/参与人数。</p>}
    {stacked && <p className="rain-chart-note">已完成与未完成为互斥分段，其和等于参与人数；折线显示同一参与总人数。</p>}
    {markers && <p className="rain-chart-note">面积和线共同表示复习人数，第5个数据点起使用虚线标出尚未结束的时段。</p>}
    <VariantTable data={exactRows(data, series)} />
  </>;
}

const trioSeries: Series[] = [
  { key: "desktop", label: "桌面访问", color: seriesColors[0]!, unit: "次" },
  { key: "mobile", label: "移动访问", color: seriesColors[1]!, unit: "次" },
  { key: "tablet", label: "平板访问", color: seriesColors[2]!, unit: "次" },
];

function BrushControls({ layout, data }: { layout: ChartBrushLayoutState; data: { date: Date }[] }) {
  const last = data.length - 1;
  const from = layout.xDomain ? Math.max(0, data.findIndex(point => point.date >= layout.xDomain![0])) : 0;
  const firstAfter = layout.xDomain ? data.findIndex(point => point.date > layout.xDomain![1]) : -1;
  const to = Math.max(from + 1, firstAfter < 0 ? last : firstAfter - 1);
  const setRange = (start: number, end: number) => layout.onBrushSelectionChange({ start: data[start]!.date, end: data[end]!.date });
  return <div className="rain-chart-live-controls">
    <label>开始 <input type="range" aria-label="范围开始日期" min={0} max={Math.max(0, to - 1)} step={1} value={from} onChange={event => setRange(Math.min(Number(event.target.value), to - 1), to)} aria-valuetext={dateLabel(data[from]!.date)} /></label>
    <label>结束 <input type="range" aria-label="范围结束日期" min={from + 1} max={last} step={1} value={to} onChange={event => setRange(from, Math.max(Number(event.target.value), from + 1))} aria-valuetext={dateLabel(data[to]!.date)} /></label>
    <button type="button" onClick={() => setRange(0, last)}>重置范围</button>
    <span role="status" aria-label="当前查看范围">{dateLabel(data[from]!.date)}—{dateLabel(data[to]!.date)}</span>
  </div>;
}

function TrioBrushVariant(props: VariantExampleProps) {
  const { revision, replay, reduced, active } = props;
  const [hovered, setHovered] = useState<number | null>(null);
  const [brush, setBrush] = useVariantSetting("brush", null, props);
  const selection = useMemo(() => brush ? { start: new Date(brush[0]), end: new Date(brush[1]) } : undefined, [brush]);
  const data = useMemo(() => Array.from({ length: 30 }, (_, index) => ({
    date: new Date(2026, 8, index + 1),
    desktop: Math.round(180 + Math.sin(index / 4.2) * 70 + ((index * 9) % 31)) + revision * 12,
    mobile: Math.round(120 + Math.cos(index / 3.8) * 55 + ((index * 5) % 23)) + revision * 8,
    tablet: Math.round(150 + Math.sin(index / 5.1 + 1) * 48 + ((index * 7) % 19)) + revision * 10,
  })), [revision]);
  const reducedNow = reduced || !active;
  return <ChartLegendHoverProvider hoveredIndex={hovered} onHoverChange={setHovered}>
    <TrendLegend series={trioSeries} data={data} hovered={hovered} onHover={setHovered} />
    <ChartBrushLayout data={data} enabled height={72} fitMainContent selection={selection}
      onSelectionChange={next => setBrush(next ? [next.start.toISOString(), next.end.toISOString()] : null)}
      brushStrip={layout => <LineChart data={data} animationDuration={0} className="rain-chart-brush-plot" margin={{ top: 4, right: 16, bottom: 4, left: 16 }} style={{ aspectRatio: "unset", height: "100%" }} enterTransition={immediate} yDomainTween={false}>
      {trioSeries.map(item => <Line key={item.key} dataKey={item.key} curve={curveCatmullRom} fadeEdges animate={false} showHighlight={false} stroke={item.color} strokeWidth={2} />)}
      <ChartBrush initialSelection={layout.brushSelection ?? undefined} selection={layout.brushSelection} onSelectionChange={layout.onBrushSelectionChange} />
    </LineChart>}>
      {layout => {
        const visible = layout.xDomain ? data.filter(point => point.date >= layout.xDomain![0] && point.date <= layout.xDomain![1]) : data;
        return <>
          <LineChart data={data} className="rain-chart-plot" aspectRatio="" margin={baseMargin} xDomain={layout.xDomain} xDomainSlotCount={layout.xDomainSlotCount} tweenYDomainOnXDomainChange={!reducedNow} yDomainTween={!reducedNow} animationDuration={reducedNow ? 0 : undefined} enterTransition={reducedNow ? immediate : undefined} revealSignature={String(replay)}>
            <Background pattern="dots" opacity={.85} />
            {trioSeries.map(item => <Line key={item.key} dataKey={item.key} curve={curveCatmullRom} stroke={item.color} strokeWidth={2} fadeEdges showHighlight animate={!reducedNow} />)}
            <XAxis numTicks={4} />{tooltip(trioSeries, reducedNow)}
          </LineChart>
          <BrushControls layout={layout} data={data} />
          <VariantTable caption="当前查看范围的精确数据" data={exactRows(visible, trioSeries)} />
        </>;
      }}
    </ChartBrushLayout>
    <p className="rain-chart-note">拖动下方窗口缩放时间范围；键盘可用两个范围滑块，重置后显示全量。</p>
  </ChartLegendHoverProvider>;
}

function ProjectionVariant({ revision, replay, reduced, active }: VariantExampleProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = useMemo(() => makeTimeline(revision).map(point => ({ date: point.date, value: point.enrolled })), [revision]);
  const target = useMemo(() => buildProjectionPath({ sourceData: data, seriesKey: "value", mode: "target", pathDensity: "endpoints", horizonPoints: 6, endValue: 420 + revision * 12 }), [data, revision]);
  const auto = useMemo(() => buildProjectionPath({ sourceData: data, seriesKey: "value", mode: "auto", autoMethod: "lastSegment", pathDensity: "endpoints", horizonPoints: 6 }), [data]);
  const reducedNow = reduced || !active;
  const observed: Series = { key: "value", label: "已观测参与人数", color: seriesColors[0]!, unit: "人" };
  const series: Series[] = [observed, { key: "target", label: "目标预测", color: seriesColors[2]!, unit: "人" }, { key: "auto", label: "自动预测", color: seriesColors[4]!, unit: "人" }];
  const forecastRows = [
    ...data.map(point => ({ 日期: dateLabel(point.date), 类型: "已观测", "参与人数 · 人": point.value })),
    ...target.slice(1).map(point => ({ 日期: dateLabel(point.date), 类型: "目标预测", "参与人数 · 人": point.value })),
    ...auto.slice(1).map(point => ({ 日期: dateLabel(point.date), 类型: "自动预测", "参与人数 · 人": point.value })),
  ];
  return <>
    <ChartLegendHoverProvider hoveredIndex={hovered} onHoverChange={setHovered}>
      <LineChart data={data} className="rain-chart-plot" aspectRatio="" margin={baseMargin} animationDuration={reducedNow ? 0 : undefined} enterTransition={reducedNow ? immediate : undefined} yDomainTween={!reducedNow} revealSignature={String(replay)}>
        <Grid horizontal numTicksRows={4} />
        <Line dataKey="value" stroke={observed.color} strokeWidth={2} animate={!reducedNow} />
        <LineSeriesTerminalMarker dataKey="value" stroke={observed.color} ringGap={6} />
        <ProjectionLine data={target} curveKind="bezier" strokeStyle="gradient" stroke={series[1]!.color} gradientStart={seriesColors[1]} gradientEnd={series[1]!.color} strokeDasharray="1,4" showEndMarker />
        <ProjectionLine data={auto} curveKind="bezier" strokeStyle="gradient" stroke={series[2]!.color} gradientStart={seriesColors[3]} gradientEnd={series[2]!.color} strokeDasharray="1,4" showEndMarker />
        <ProjectionLineEndMarker data={target} stroke={series[1]!.color} />
        <ProjectionLineEndMarker data={auto} stroke={series[2]!.color} />
        <XAxis numTicks={4} />{tooltip([observed], reducedNow)}
      </LineChart>
      <TrendLegend series={series} data={[{ value: data.at(-1)?.value, target: target.at(-1)?.value, auto: auto.at(-1)?.value }]} hovered={hovered} onHover={setHovered} />
    </ChartLegendHoverProvider>
    <p className="rain-chart-note">末次已观测值为空心锚点；两条虚线分别表示6日目标与末段斜率外推，远端圆点是预测端点。预测值不是实际观测。</p>
    <VariantTable data={forecastRows} />
  </>;
}

export function TrendVariant(props: VariantExampleProps) {
  if (props.variantId === "line-profit-loss") return <ProfitLossExample revision={props.revision} replay={props.replay} reduced={props.reduced || !props.active} />;
  if (props.variantId === "line-trio-brush") return <TrioBrushVariant {...props} />;
  if (props.variantId === "line-projection") return <ProjectionVariant {...props} />;
  if (props.variantId.startsWith("composed-")) return <ComposedVariant {...props} />;
  if (props.variantId.startsWith("area-") || props.variantId.startsWith("line-")) return <AreaOrLineVariant {...props} />;
  return null;
}
