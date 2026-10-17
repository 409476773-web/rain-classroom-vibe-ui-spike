import { useId } from "react";
import { motion } from "motion/react";
import { BarChart, Bar, BarXAxis, BarYAxis, BarDepthBack, BarDepthFront, BarDepthProvider, BarSquares, BarColumnTrack, Background, ReferenceArea, Grid, YAxis, ChartTooltip, TooltipContent, useChart } from "@rain-next/ui/charts";
import { VariantTable, useVariantSetting, immediate, seriesColors, type VariantExampleProps } from "./shared";
import { makeGroupedBars } from "../chart-data";

export const BAR_VARIANT_IDS = ["bar-interactive", "bar-default", "bar-loading", "bar-3d-depth", "bar-3d-stacked", "bar-multiple-series", "bar-stacked", "bar-horizontal", "bar-dense-data", "bar-gradient", "bar-shape-gradient", "bar-shape-squircle-ring", "bar-pattern", "bar-no-gap", "bar-custom-tooltip", "bar-left-y-axis", "bar-dual-y-axis", "bar-pattern-background", "bar-dot-grid-background", "bar-reference-band", "bar-pattern-reference-band"] as const;

function BarLineIndicator({ reduced }: { reduced: boolean }) {
  const { hoveredBarIndex, data, barScale, bandWidth, barXAccessor, yScale } = useChart();
  if (hoveredBarIndex == null || !barScale || !bandWidth || !barXAccessor) return null;
  const point = data[hoveredBarIndex];
  if (!point) return null;
  const x = barScale(barXAccessor(point));
  if (x == null) return null;
  return <motion.rect data-bar-line-indicator="" x={x} width={bandWidth} height={2} fill="var(--chart-1)" initial={false} animate={{ y: yScale(Number(point.完成)) - 1 }} transition={reduced ? immediate : { duration: .16 }} pointerEvents="none" />;
}

function HorizontalTicks() {
  const { yScale, innerHeight } = useChart();
  const ticks = (yScale as unknown as { ticks?: (count: number) => number[] }).ticks?.(4) ?? [];
  return <g aria-label="人数刻度">{ticks.map(value => <text key={value} x={yScale(value)} y={innerHeight + 22} textAnchor="middle" fill="var(--chart-label)" fontSize={11}>{value}</text>)}</g>;
}

export function BarVariant(props: VariantExampleProps) {
  const { variantId, revision, replay, reduced, active } = props;
  const instance = useId().replaceAll(":", "");
  const [loading, setLoading] = useVariantSetting("loading", true, props);
  const stacked = variantId === "bar-stacked" || variantId === "bar-3d-stacked";
  const depth = variantId === "bar-3d-depth" || variantId === "bar-3d-stacked";
  const shape = variantId === "bar-shape-gradient" || variantId === "bar-shape-squircle-ring";
  const horizontal = variantId === "bar-horizontal";
  const dual = variantId === "bar-dual-y-axis";
  const dense = variantId === "bar-dense-data" || variantId === "bar-interactive";
  const currency = variantId === "bar-custom-tooltip";
  const radius = variantId === "bar-shape-squircle-ring" ? .5 : .25;
  const count = variantId === "bar-interactive" ? 90 : variantId === "bar-dense-data" ? 60 : 6;
  const data: Record<string, unknown>[] = variantId === "bar-multiple-series" ? makeGroupedBars(revision).map((point, index) => ({
    label: `${["一", "二", "三", "四", "五", "六"][index]}班`, 完成: point.completed, 进行中: point.enrolled - point.completed,
  })) : dense ? Array.from({ length: count }, (_, index) => ({
    label: dense ? new Date(Date.UTC(2026, 6, index + 1)).toISOString().slice(0, 10) : `${["一", "二", "三", "四", "五", "六"][index]}班`,
    完成: (32 + index * 7 % 54 + revision * 2) * (currency ? 100 : 1),
    [dual ? "完成率" : "进行中"]: dual ? 55 + index * 6 + revision % 3 : 18 + index * 2 + revision,
  })) : [
    [[58, 14], [31, 27], [72, 8], [44, 22], [23, 35], [64, 12]],
    [[46, 24], [38, 19], [69, 14], [57, 12], [29, 31], [61, 20]],
    [[63, 10], [24, 32], [54, 26], [49, 18], [36, 22], [73, 8]],
  ][revision % 3]!.map(([completed, inProgress], index) => ({
    label: `${["一", "二", "三", "四", "五", "六"][index]}班`,
    完成: completed! * (currency ? 100 : 1),
    [dual ? "完成率" : "进行中"]: dual ? Math.round(completed! / (completed! + inProgress!) * 100) : inProgress!,
  }));
  const multiple = stacked || shape || dual || ["bar-multiple-series", "bar-left-y-axis"].includes(variantId);
  const keys = multiple ? ["完成", dual ? "完成率" : "进行中"] : ["完成"];
  const gradient = variantId === "bar-gradient" || variantId === "bar-no-gap";
  const pattern = variantId === "bar-pattern";
  const lineIndicator = variantId === "bar-no-gap" || variantId === "bar-3d-depth";
  const background = variantId.includes("background");
  const reference = variantId.includes("reference-band");
  const gradientId = `${instance}-gradient`;
  const patternId = `${instance}-pattern`;
  const trackId = `${instance}-track`;
  const isLoading = variantId === "bar-loading" && loading;
  const chart = <BarChart data={data} xDataKey="label" className="rain-chart-plot" aspectRatio="" stacked={stacked} stackGap={stacked && !depth ? 3 : 0} orientation={horizontal ? "horizontal" : "vertical"} barGap={variantId === "bar-no-gap" ? 0 : dense ? .1 : .2} squareSnap={shape ? { squareGap: 3, groupGap: 4 } : undefined} status={isLoading && active && !reduced ? "loading" : "ready"} margin={{ top: depth ? 40 : 24, right: dual ? 56 : 24, bottom: 38, left: horizontal ? 60 : 58 }} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? immediate : undefined} revealSignature={`${instance}-${replay}`}>
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={seriesColors[0]} /><stop offset="100%" stopColor={variantId === "bar-no-gap" ? seriesColors[0] : seriesColors[4]} stopOpacity={variantId === "bar-no-gap" ? 0 : 1} /></linearGradient>
      <pattern id={patternId} width={8} height={8} patternUnits="userSpaceOnUse"><path d="M-2 2 L2-2 M0 8 L8 0 M6 10 L10 6" stroke={seriesColors[4]} strokeWidth={2} /></pattern>
      <pattern id={trackId} width={6} height={6} patternUnits="userSpaceOnUse"><path d="M0 6L6 0" stroke="var(--chart-grid)" /></pattern>
    </defs>
    {background ? <Background pattern={variantId === "bar-dot-grid-background" ? "dots" : "diagonal"} opacity={.85} /> : <Grid horizontal={!horizontal} vertical={horizontal} numTicksRows={4} numTicksColumns={4} />}
    {reference && <ReferenceArea y1={40} y2={70} pattern={variantId === "bar-pattern-reference-band" ? "diagonal" : "none"} axisLabelColor={seriesColors[0]} showMarkers fillOpacity={.85} />}
    {depth && <BarDepthBack dataKey="完成" color={seriesColors[0]} />}
    {shape ? <>
      <BarColumnTrack fill={`url(#${trackId})`} opacity={.65} squareGap={3} squareRadius={radius} groupGap={4} />
      <BarSquares dataKey="完成" fill={`url(#${patternId})`} stroke={seriesColors[4]} squareRadius={radius} groupGap={4} animate={!reduced} />
      <BarSquares dataKey="进行中" fill={seriesColors[0]} stroke={seriesColors[4]} squareRadius={radius} groupGap={4} animate={!reduced} useGradient gradientStops={seriesColors.map((color, index) => ({ offset: index * 25, color }))} />
    </> : keys.map((key, index) => <Bar key={key} dataKey={key} fill={gradient ? `url(#${gradientId})` : pattern ? `url(#${patternId})` : seriesColors[index]} stroke={seriesColors[index]} yAxisId={dual && index === 1 ? "right" : "left"} perspective={depth} lineCap={stacked || dense || variantId === "bar-no-gap" ? "butt" : 4} stackGap={stacked && !depth ? 3 : undefined} animate={!reduced} minBarHeight={0} />)}
    {depth && <BarDepthFront dataKey="完成" />}
    {horizontal ? <><BarYAxis /><HorizontalTicks /></> : <><YAxis numTicks={4} formatValue={currency ? value => `¥${value.toLocaleString("zh-CN")}` : undefined} /><BarXAxis maxLabels={dense ? 4 : 6} />{dual && <YAxis yAxisId="right" orientation="right" numTicks={4} formatValue={value => `${value}%`} />}</>}
    <ChartTooltip className="rain-chart-tooltip" showCrosshair={!lineIndicator && !shape && !background && !reference && !horizontal} showDots={!lineIndicator} dotVariant={shape ? "ring" : "dot"} dotRadiusFraction={variantId === "bar-shape-squircle-ring" ? .5 : undefined} dotScale={variantId === "bar-shape-gradient" ? 1.05 : undefined} dotStrokeWidth={shape ? 1 : undefined} dotColor={shape ? "var(--chart-indicator-color)" : undefined} content={({ point }) => <TooltipContent title={String(point.label)} rows={keys.map((key, index) => ({ label: key, value: key === "完成率" ? `${point[key]}%` : currency ? `¥${Number(point[key]).toLocaleString("zh-CN")}` : `${point[key]} 人`, color: seriesColors[index]! }))} />} />
    {lineIndicator && <BarLineIndicator reduced={reduced} />}
  </BarChart>;
  return <>
    {variantId === "bar-loading" && <div className="rain-chart-controls"><button type="button" onClick={() => setLoading(value => !value)}>{loading ? "显示数据" : "开始加载"}</button><span role="status">{loading ? reduced || !active ? "静态加载占位 · 点击显示数据" : "正在加载" : "数据已就绪"}</span></div>}
    {isLoading && (reduced || !active) ? <div className="rain-chart-static-loading" role="status">加载中…</div> : stacked && depth ? <BarDepthProvider segmentsAccessor={point => keys.map((key, index) => ({ value: Number(point[key]), color: seriesColors[index]! }))}>{chart}</BarDepthProvider> : chart}
    <p className="rain-chart-note">{stacked ? "完成与进行中互斥，堆叠为两类人数合计。" : dual ? "左轴：完成人数（人）；右轴：完成率（%），独立刻度。" : currency ? "完成补助 · 人民币（元）" : "人数 · 按日期或班级比较"}{reference && " 目标参考区间：40—70人。"}</p>
    <VariantTable data={data} />
  </>;
}
