import { useId, useMemo, useState } from "react";
import {
  Background, ChartLegend, ChartLegendHoverProvider, ChartTooltip, FunnelChart, Gauge,
  Grid, PatternLines, ReferenceArea, Scatter, ScatterChart, TooltipContent, XAxis, YAxis,
  type GaugeProps, type ScatterProps,
} from "@rain-next/ui/charts";
import { dateLabel, makeFunnel, makeTimeline, applyScatterBoundary, applyFunnelBoundary, assertGaugeValue, type ChartBoundaryScenario } from "../chart-data";
import { ChartPointReading } from "../chart-point-reading";
import { immediate, seriesColors, useVariantSetting, VariantTable, type VariantExampleProps } from "./shared";

export const COMPARISON_VARIANT_IDS = [
  "scatter-default", "scatter-no-rings", "scatter-small-dots", "scatter-wide-ring-gap", "scatter-left-y-axis", "scatter-dual-y-axis", "scatter-pattern-background", "scatter-dot-grid-background", "scatter-reference-band", "scatter-pattern-reference-band",
  "funnel-default", "funnel-vertical", "funnel-vertical-straight-grid", "funnel-straight-edges", "funnel-segment-colors", "funnel-gradient-segments", "funnel-pattern-fill", "funnel-grouped-labels", "funnel-grid-background",
  "gauge-default", "gauge-tight-arc-fillets", "gauge-dual-arc-gradients", "gauge-pattern-dim-track", "gauge-sparse-quarter-sweep", "gauge-bottom-half-sweep", "gauge-flipped-sweep", "gauge-soft-fillets-full-depth", "gauge-short-bold-notches", "gauge-near-circular-notches", "gauge-linear-track", "gauge-linear-label-below", "gauge-linear-dual-gradients",
] as const;

function ScatterVariant(props: VariantExampleProps) {
  const { variantId, revision, replay, reduced, active } = props;
  const [chosenScenario, setScenario] = useVariantSetting("boundaryScenario", "normal", props);
  const scenario = chosenScenario === "scatter-dense" || chosenScenario === "scatter-overlap" ? chosenScenario : "normal";
  const data = useMemo(() => applyScatterBoundary(makeTimeline(revision), scenario), [revision, scenario]);
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
    <label className="rain-chart-example-control">边界样本 <select aria-label="散点边界样本" value={scenario}
      onChange={event => setScenario(event.target.value as ChartBoundaryScenario)}>
      <option value="normal">正常数据</option><option value="scatter-dense">96日期密集点</option><option value="scatter-overlap">同日同值重叠</option>
    </select></label>
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
          content={({ point }) => <TooltipContent title={dateLabel(point.date as Date)} rows={series.map(item => ({ label: item.label, value: `${item.unit === "%" ? Number(point[item.key]).toFixed(1) : point[item.key]} ${item.unit}`, color: item.color }))} />} />
      </ScatterChart>
      <ChartLegend className="rain-chart-legend" showValue={false} hoveredIndex={hovered} onHover={setHovered}
        items={series.map(item => ({ label: `${item.label} · ${item.unit}`, color: item.color, value: Number(data.at(-1)?.[item.key] ?? 0) }))}
        renderItem={({ item, isFaded }) => <button type="button" className="rain-chart-legend-button"
          style={{ opacity: isFaded ? .4 : 1 }}><span aria-hidden="true" style={{ background: item.color }} />{item.label}</button>} />
    </ChartLegendHoverProvider>
    <p className="rain-chart-note">横轴为日期，纵轴从 0 起表示非负数值。{dual && "左轴：参与人数 · 人；右轴：完成率 · %。"}</p>
    <ChartPointReading data={data} fields={series} />
    <VariantTable data={data.map(point => Object.fromEntries([["日期", dateLabel(point.date)], ...series.map(item => [`${item.label} · ${item.unit}`, item.unit === "%" ? Number(point[item.key]).toFixed(1) : point[item.key]])]))} />
  </>;
}

function FunnelVariant(props: VariantExampleProps) {
  const { variantId, revision, replay, reduced, active } = props;
  const [chosenScenario,setScenario] = useVariantSetting("boundaryScenario","normal",props);
  const scenario = chosenScenario.startsWith("funnel-") ? chosenScenario : "normal";
  const colored = variantId === "funnel-segment-colors";
  const gradient = variantId === "funnel-gradient-segments";
  const data = useMemo(() => applyFunnelBoundary(makeFunnel(revision),scenario).map((stage, index) => ({
    ...stage,
    ...(colored ? { color: seriesColors[index]! } : {}),
    ...(gradient ? { gradient: [{ offset: "0%", color: seriesColors[index]! }, { offset: "100%", color: seriesColors[index + 1]! }] } : {}),
  })), [revision, colored, gradient,scenario]);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const hoverIndex = data.findIndex(stage=>stage.label===hoveredKey);
  const hovered = hoverIndex < 0 ? null : hoverIndex;
  const setHovered = (index:number|null) => setHoveredKey(index === null ? null : data[index]?.label ?? null);
  const vertical = variantId.startsWith("funnel-vertical");
  const straight = variantId === "funnel-straight-edges" || variantId === "funnel-vertical-straight-grid";
  const grouped = variantId === "funnel-grouped-labels";
  const pattern = variantId === "funnel-pattern-fill";
  const firstValue = data[0]?.value ?? 0;
  const drawable = firstValue > 0 && data.every(stage=>stage.value !== null && stage.value>=0 && stage.value<=firstValue);
  const plotData = data.filter((stage):stage is typeof stage & {value:number}=>stage.value !== null);
  const percentage = (value:number|null) => value === null ? "缺测" : firstValue > 0 ? `${Math.round(value/firstValue*100)}%` : "不适用";
  const still = reduced || !active;
  const items = data.map((stage, index) => ({ label: stage.value === null ? `${stage.label} · 缺测` : stage.label, value: stage.value ?? 0, color: colored || gradient ? seriesColors[index]! : pattern ? seriesColors[2]! : seriesColors[0]! }));
  return <>
    <label className="rain-chart-example-control">边界样本 <select aria-label="漏斗边界样本" value={scenario} onChange={event=>setScenario(event.target.value as ChartBoundaryScenario)}><option value="normal">正常数据</option><option value="funnel-missing">第三阶段缺测</option><option value="funnel-growth">后续阶段增长</option><option value="funnel-zero-entry">入口为0但后续有值</option><option value="funnel-above-entry">后续高于入口</option></select></label>
    <div className={`rain-chart-funnel-variant${vertical ? " rain-chart-funnel-variant--vertical" : ""}`}>
      {!drawable ? <div className="rain-chart-empty">{scenario === "funnel-missing" ? "阶段缺测" : firstValue === 0 ? "入口为0，比例不适用" : "后续人数高于入口"}；保留全部阶段和真实值，不生成完整漏斗。</div> : <FunnelChart key={`${variantId}-${replay}`} data={plotData} color={pattern ? seriesColors[2] : seriesColors[0]}
        orientation={vertical ? "vertical" : "horizontal"} edges={straight ? "straight" : "curved"} layers={3}
        hoveredIndex={hovered} onHoverChange={setHovered} enterTransition={still ? immediate : undefined} staggerDelay={still ? 0 : .12}
        labelLayout={grouped ? "grouped" : "spread"} labelOrientation={grouped ? "vertical" : undefined} labelAlign="center"
        grid={variantId === "funnel-grid-background" ? true : variantId === "funnel-vertical-straight-grid" ? { bands: false, lines: true } : false}
        renderPattern={pattern ? (id, color) => <PatternLines id={id} width={8} height={8} background={color} orientation={["diagonal"]} stroke="var(--chart-background)" strokeWidth={2} /> : undefined} />}
    </div>
    <ChartLegend className="rain-chart-legend" items={items} hoveredIndex={hovered} onHover={setHovered} showValue={false}
      renderItem={({ item, index, isHovered, isFaded }) => <button type="button" className="rain-chart-legend-button"
        style={{ opacity: isFaded ? .4 : 1 }}><span aria-hidden="true" style={{ background: item.color }} />{item.label}</button>} />
    {scenario === "funnel-growth" && <p className="rain-chart-note">第三阶段人数较上一阶段增长；本样本不是单向流失，比例仍使用入口人数。</p>}
    <p className="rain-chart-note">各阶段比例均以首阶段 {firstValue.toLocaleString()} 人为分母。</p>
    <VariantTable data={data.map(stage => ({ "阶段": stage.label, "人数 · 人": stage.value, "首阶段人数 · 人": firstValue, "占首阶段比例": percentage(stage.value) }))} />
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
  const value = chosenValue ?? (linear ? [72, 56, 84] : [66, 81, 48])[revision % 3]!;
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
  let invalid: string | null = null;
  try { assertGaugeValue(value); } catch(error) { invalid = (error as Error).message; }
  if (invalid) return <><div className="rain-chart-empty" role="status"><strong>已拒绝无效读数</strong><p>{invalid}</p></div><VariantTable data={[{ "输入值":Number.isFinite(value) ? value : "非有限数", "合法量程":"0—100%" }]} /></>;
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
