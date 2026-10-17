import { useId, useMemo, useState } from "react";
import {
  Background, ChartLegend, ChartLegendHoverProvider, ChartTooltip, FunnelChart, Gauge,
  Grid, PatternLines, ReferenceArea, Scatter, ScatterChart, TooltipContent, XAxis, YAxis,
  type GaugeProps, type ScatterProps,
} from "@rain-next/ui/charts";
import { dateLabel, makeFunnel, makeTimeline } from "../chart-data";
import { immediate, seriesColors, useVariantSetting, VariantTable, type VariantExampleProps } from "./shared";

export const COMPARISON_VARIANT_IDS = [
  "scatter-default", "scatter-no-rings", "scatter-small-dots", "scatter-wide-ring-gap", "scatter-left-y-axis", "scatter-dual-y-axis", "scatter-pattern-background", "scatter-dot-grid-background", "scatter-reference-band", "scatter-pattern-reference-band",
  "funnel-default", "funnel-vertical", "funnel-vertical-straight-grid", "funnel-straight-edges", "funnel-segment-colors", "funnel-gradient-segments", "funnel-pattern-fill", "funnel-grouped-labels", "funnel-grid-background",
  "gauge-default", "gauge-tight-arc-fillets", "gauge-dual-arc-gradients", "gauge-pattern-dim-track", "gauge-sparse-quarter-sweep", "gauge-bottom-half-sweep", "gauge-flipped-sweep", "gauge-soft-fillets-full-depth", "gauge-short-bold-notches", "gauge-near-circular-notches", "gauge-linear-track", "gauge-linear-label-below", "gauge-linear-dual-gradients",
] as const;

function ScatterVariant({ variantId, revision, replay, reduced, active }: VariantExampleProps) {
  const data = useMemo(() => makeTimeline(revision), [revision]);
  const dual = variantId === "scatter-dual-y-axis";
  const leftAxis = dual || variantId === "scatter-left-y-axis";
  const readingOnly = variantId.includes("-background") || variantId.includes("-reference-band");
  const [hovered, setHovered] = useState<number | null>(null);
  const series = [
    { key: "enrolled", label: "参与人数", unit: "人", color: seriesColors[0]! },
    { key: dual ? "rate" : "completed", label: dual ? "完成率" : "完成人数", unit: dual ? "%" : "人", color: seriesColors[1]! },
  ].slice(0, readingOnly ? 1 : 2);
  const marker: Partial<ScatterProps> = variantId === "scatter-no-rings" ? { strokeWidth: 0 }
    : variantId === "scatter-small-dots" ? { radius: 2, ringGap: 1, strokeWidth: 1 }
    : variantId === "scatter-wide-ring-gap" ? { radius: 3, ringGap: 5, strokeWidth: 1, outlineWidth: 0 } : {};
  const still = reduced || !active;
  return <>
    <ChartLegendHoverProvider hoveredIndex={hovered} onHoverChange={setHovered}>
      <ScatterChart data={data} className="rain-chart-scatter-variant" aspectRatio="2 / 1" animationDuration={still ? 0 : 1100}
        enterTransition={still ? immediate : undefined} revealSignature={`${variantId}-${replay}`}
        margin={{ top: 24, right: dual ? 56 : 16, bottom: 38, left: leftAxis ? 56 : 16 }}>
        {variantId === "scatter-pattern-background" ? <Background />
          : variantId === "scatter-dot-grid-background" ? <Background pattern="dots" opacity={.85} />
          : variantId === "scatter-reference-band" ? <ReferenceArea y1={160} y2={220} strokeStyle="dashed" showMarkers />
          : variantId === "scatter-pattern-reference-band" ? <ReferenceArea y1={160} y2={220} pattern="diagonal" patternColor="var(--chart-foreground-muted)" axisLabelColor={seriesColors[0]} fillOpacity={.85} />
          : <Grid horizontal />}
        {series.map((item, index) => <Scatter key={item.key} dataKey={item.key} fill={item.color} stroke={item.color}
          yAxisId={dual && index === 1 ? "right" : "left"} animate={!still} {...marker} />)}
        {leftAxis && <YAxis yAxisId="left" numTicks={4} formatValue={value => `${value}`} />}
        {dual && <YAxis yAxisId="right" orientation="right" numTicks={4} formatValue={value => `${value}%`} />}
        <XAxis numTicks={4} />
        <ChartTooltip className="rain-chart-tooltip" damping={still ? 0 : undefined}
          content={({ point }) => <TooltipContent title={dateLabel(point.date as Date)} rows={series.map(item => ({ label: item.label, value: `${point[item.key]} ${item.unit}`, color: item.color }))} />} />
      </ScatterChart>
      <ChartLegend className="rain-chart-legend" showValue={false} hoveredIndex={hovered} onHover={setHovered}
        items={series.map(item => ({ label: `${item.label} · ${item.unit}`, color: item.color, value: Number(data.at(-1)?.[item.key] ?? 0) }))}
        renderItem={({ item, index, isHovered, isFaded }) => <button type="button" className="rain-chart-legend-button"
          onFocus={() => setHovered(index)} onBlur={() => setHovered(null)} onClick={() => setHovered(hovered === index ? null : index)} aria-pressed={isHovered}
          style={{ opacity: isFaded ? .4 : 1 }}><span aria-hidden="true" style={{ background: item.color }} />{item.label}</button>} />
    </ChartLegendHoverProvider>
    <p className="rain-chart-note">横轴为日期，纵轴从 0 起表示非负数值。{dual && "左轴：参与人数 · 人；右轴：完成率 · %。"}</p>
    <VariantTable data={data.map(point => Object.fromEntries([["日期", dateLabel(point.date)], ...series.map(item => [`${item.label} · ${item.unit}`, point[item.key]])]))} />
  </>;
}

function FunnelVariant({ variantId, revision, replay, reduced, active }: VariantExampleProps) {
  const colored = variantId === "funnel-segment-colors";
  const gradient = variantId === "funnel-gradient-segments";
  const data = useMemo(() => makeFunnel(revision).map((stage, index) => ({
    ...stage,
    ...(colored ? { color: seriesColors[index]! } : {}),
    ...(gradient ? { gradient: [{ offset: "0%", color: seriesColors[index]! }, { offset: "100%", color: seriesColors[index + 1]! }] } : {}),
  })), [revision, colored, gradient]);
  const [hovered, setHovered] = useState<number | null>(null);
  const vertical = variantId.startsWith("funnel-vertical");
  const straight = variantId === "funnel-straight-edges" || variantId === "funnel-vertical-straight-grid";
  const grouped = variantId === "funnel-grouped-labels";
  const pattern = variantId === "funnel-pattern-fill";
  const firstValue = data[0]!.value;
  const still = reduced || !active;
  const items = data.map((stage, index) => ({ label: stage.label, value: stage.value, color: colored || gradient ? seriesColors[index]! : pattern ? seriesColors[2]! : seriesColors[0]! }));
  return <>
    <div className={`rain-chart-funnel-variant${vertical ? " rain-chart-funnel-variant--vertical" : ""}`}>
      <FunnelChart key={`${variantId}-${replay}`} data={data} color={pattern ? seriesColors[2] : seriesColors[0]}
        orientation={vertical ? "vertical" : "horizontal"} edges={straight ? "straight" : "curved"} layers={3}
        hoveredIndex={hovered} onHoverChange={setHovered} enterTransition={still ? immediate : undefined} staggerDelay={still ? 0 : .12}
        labelLayout={grouped ? "grouped" : "spread"} labelOrientation={grouped ? "vertical" : undefined} labelAlign="center"
        grid={variantId === "funnel-grid-background" ? true : variantId === "funnel-vertical-straight-grid" ? { bands: false, lines: true } : false}
        renderPattern={pattern ? (id, color) => <PatternLines id={id} width={8} height={8} background={color} orientation={["diagonal"]} stroke="var(--chart-background)" strokeWidth={2} /> : undefined} />
    </div>
    <ChartLegend className="rain-chart-legend" items={items} hoveredIndex={hovered} onHover={setHovered} showValue={false}
      renderItem={({ item, index, isHovered, isFaded }) => <button type="button" className="rain-chart-legend-button"
        onFocus={() => setHovered(index)} onBlur={() => setHovered(null)} onClick={() => setHovered(hovered === index ? null : index)} aria-pressed={isHovered}
        style={{ opacity: isFaded ? .4 : 1 }}><span aria-hidden="true" style={{ background: item.color }} />{item.label}</button>} />
    <p className="rain-chart-note">各阶段比例均以首阶段 {firstValue.toLocaleString()} 人为分母。</p>
    <VariantTable data={data.map(stage => ({ "阶段": stage.label, "人数 · 人": stage.value, "首阶段人数 · 人": firstValue, "占首阶段比例": `${Math.round(stage.value / firstValue * 100)}%` }))} />
  </>;
}

// Gauge collects named gradient parts into its SVG defs.
function GaugeGradient({ id, from, to }: { id: string; from: string; to: string }) {
  return <linearGradient id={id} x1="0%" x2="100%"><stop offset="0%" stopColor={from} /><stop offset="100%" stopColor={to} /></linearGradient>;
}

function GaugeVariant(props: VariantExampleProps) {
  const { variantId, revision, replay, reduced, active } = props;
  const linear = variantId.startsWith("gauge-linear-");
  const dualGradient = variantId === "gauge-dual-arc-gradients" || variantId === "gauge-linear-dual-gradients";
  const pattern = variantId === "gauge-pattern-dim-track";
  const sparse = ["gauge-sparse-quarter-sweep", "gauge-bottom-half-sweep", "gauge-flipped-sweep"].includes(variantId);
  const tight = ["gauge-tight-arc-fillets", "gauge-dual-arc-gradients", "gauge-pattern-dim-track", "gauge-near-circular-notches"].includes(variantId);
  const [chosenValue, setChosenValue] = useVariantSetting("value", null, props);
  const value = chosenValue ?? Math.min(100, (linear ? 72 : 66) + revision * 4);
  const unique = useId().replaceAll(":", "");
  const gradientId = `rain-gauge-active-${unique}`;
  const inactiveId = `rain-gauge-inactive-${unique}`;
  const patternId = `rain-gauge-pattern-${unique}`;
  const geometry: Partial<GaugeProps> = linear
    ? { orientation: "linear", totalNotches: 72, spacing: 0, notchCornerRadius: 3,
      ...(variantId !== "gauge-linear-label-below" ? { notchLengthPercent: 38 } : { labelPlacement: "bottom", labelAlign: "center" }) }
    : sparse ? { totalNotches: 33, spacing: 60,
      startAngle: variantId === "gauge-sparse-quarter-sweep" ? 90 : variantId === "gauge-bottom-half-sweep" ? 180 : 270,
      endAngle: variantId === "gauge-sparse-quarter-sweep" ? 270 : variantId === "gauge-bottom-half-sweep" ? 360 : 450 }
    : tight ? { startAngle: 140, endAngle: 400, spacing: 0, notchCornerRadius: variantId === "gauge-near-circular-notches" ? 22 : 7,
      ...(variantId === "gauge-near-circular-notches" ? { notchLengthPercent: 100 } : {}) }
    : { spacing: 25,
      ...(variantId === "gauge-soft-fillets-full-depth" ? { notchCornerRadius: 8, notchLengthPercent: 100 } : {}),
      ...(variantId === "gauge-short-bold-notches" ? { notchCornerRadius: 12, notchLengthPercent: 38 } : {}) };
  const showCenter = !linear || variantId === "gauge-linear-label-below";
  const still = reduced || !active;
  return <>
    <div className={linear ? "rain-chart-gauge-variant rain-chart-gauge-variant--linear" : "rain-chart-gauge-variant"}>
      <Gauge key={replay} {...geometry} value={value} minWidth={0} centerValue={showCenter ? value : undefined}
        defaultLabel="完成进度" suffix="%" formatOptions={{ maximumFractionDigits: 0 }} inactiveFillOpacity={.4}
        enterTransition={still ? immediate : undefined} enterStaggerScale={still ? 0 : 1}
        useGradient={linear && !dualGradient} activeFill={pattern ? `url(#${patternId})` : dualGradient ? `url(#${gradientId})` : undefined}
        inactiveFill={dualGradient ? `url(#${inactiveId})` : pattern ? seriesColors[0] : undefined}>
        {dualGradient && <>
          <GaugeGradient id={gradientId} from={seriesColors[0]!} to={seriesColors[2]!} />
          <GaugeGradient id={inactiveId} from={seriesColors[3]!} to={seriesColors[4]!} />
        </>}
        {pattern && <PatternLines id={patternId} width={6} height={6} orientation={["diagonal"]} stroke={seriesColors[0]} strokeWidth={1} />}
      </Gauge>
    </div>
    <div className="rain-chart-variant-controls" role="group" aria-label="预设进度">
      {[0, 50, 100].map(preset => <button key={preset} type="button" className="rain-chart-variant-button" aria-pressed={value === preset} onClick={() => setChosenValue(preset)}>{preset}%</button>)}
      <span role="status" aria-label="当前进度" aria-live="polite">{value}%</span>
    </div>
    {variantId === "gauge-sparse-quarter-sweep" && <p className="rain-chart-note">源例角度 90° → 270°，实际弧长 180°。</p>}
    <VariantTable data={[{ "完成进度 · %": value, "最大进度 · %": 100, "刻度数": geometry.totalNotches ?? 40,
      "形态": linear ? "线形" : "弧形", ...(!linear ? { "起始角度 · °": geometry.startAngle ?? 135, "结束角度 · °": geometry.endAngle ?? 405 } : {}) }]} />
  </>;
}

export function ComparisonVariant(props: VariantExampleProps) {
  if (props.variantId.startsWith("scatter-")) return <ScatterVariant {...props} />;
  if (props.variantId.startsWith("funnel-")) return <FunnelVariant {...props} />;
  return <GaugeVariant {...props} />;
}
