import { useId, useMemo, useState } from "react";
import {
  PatternLines, PieChart, PieSlice, PieCenter, RingChart, Ring, RingCenter,
  Legend, LegendItemComponent, LegendMarker, LegendLabel, LegendValue, LegendProgress, useLegend, useLegendItem,
  RadarChart, RadarGrid, RadarAxis, RadarArea, RadarLabels,
  type PieData, type RingData, type RadarData, type RadarMetric,
} from "@rain-next/ui/charts";
import { ExampleLegend, immediate, seriesColors, useVariantSetting, VariantTable, type VariantExampleProps } from "./shared";
import { exampleLabel } from "../chart-data";

export const RADIAL_VARIANT_IDS = [
  "pie-default", "pie-donut", "pie-legend", "pie-patterns", "pie-gradients",
  "pie-grow-hover", "pie-custom-center", "pie-donut-patterns", "pie-donut-grow-hover",
  "radar-default", "radar-triangle", "radar-hexagon", "radar-single-series", "radar-minimal", "radar-grid-only",
  "ring-default", "ring-flat-caps", "ring-thick-rings", "ring-three-quarter", "ring-half-circle", "ring-legend",
] as const;

type KeyItem = { label: string; value: number; color?: string; maxValue?: number };
function RingLegendItem() {
  const { setHoveredIndex } = useLegend();
  const { item, index, isHovered } = useLegendItem();
  return <LegendItemComponent className="rain-chart-progress-legend-item">
    <button type="button" className="rain-chart-progress-legend-heading" aria-pressed={isHovered}
      aria-label={`${item.label} ${item.value}/${item.maxValue} · ${(item.value / item.maxValue! * 100).toFixed(1)}%`}
      onFocus={() => setHoveredIndex(index)} onBlur={() => setHoveredIndex(null)} onClick={() => setHoveredIndex(index)}>
      <LegendMarker /><LegendLabel />
      <LegendValue showPercentage formatValue={value => `${value}/${item.maxValue} ·`} formatPercentage={value => `${value.toFixed(1)}%`} />
    </button>
    <LegendProgress />
  </LegendItemComponent>;
}
function InteractiveKey({ items, hovered, onHover, progress = false }: {
  items: KeyItem[]; hovered: number | null; onHover: (index: number | null) => void; progress?: boolean;
}) {
  if (progress) return <Legend className="rain-chart-progress-legend" items={items.map(item => ({ ...item, color: item.color ?? seriesColors[0]! }))} hoveredIndex={hovered} onHoverChange={onHover}>
    <RingLegendItem />
  </Legend>;
  return <div className="rain-chart-variant-legend" aria-label={progress ? "独立目标进度图例" : "类别图例"}>
    {items.map((item, index) => <button type="button" key={item.label}
      className="rain-chart-variant-legend-item" data-active={hovered === index || undefined}
      onPointerEnter={() => onHover(index)} onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(index)} onBlur={() => onHover(null)}
      onClick={() => onHover(index)}>
      <span className="rain-chart-legend-dot" aria-hidden="true" style={{ background: item.color }} />
      <span>{item.label}</span>
      <span>{`${item.value} 人`}</span>
    </button>)}
  </div>;
}

function PieVariant(props: VariantExampleProps) {
  const { variantId, revision, replay, reduced, active } = props;
  const instanceId = useId().replace(/:/g, "");
  const [hovered, setHovered] = useState<number | null>(null);
  const [state, setState] = useVariantSetting("state", "normal", props);
  const pattern = variantId === "pie-patterns" || variantId === "pie-donut-patterns";
  const gradient = variantId === "pie-gradients";
  const grow = variantId.endsWith("grow-hover");
  const custom = variantId === "pie-custom-center";
  const donut = variantId.includes("donut") || variantId === "pie-legend" || custom;
  const data = useMemo<PieData[]>(() => {
    const values = gradient ? [40, 30, 30] : pattern ? [35, 25, 20, 20] : [186, 142, 98, 74];
    return values.map((value, index) => ({ label: exampleLabel(["讲授课", "研讨课", "实验课", "实践课"][index]!, state), value: state === "zero" ? 0 : value + revision * (index + 1), color: seriesColors[index]! }));
  }, [gradient, pattern, revision, state]);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const percentage = (value: number) => total > 0 ? `${(value / total * 100).toFixed(1)}%` : "不适用";
  const safeHovered = hovered != null && hovered < data.length ? hovered : null;
  const selected = safeHovered == null ? undefined : data[safeHovered];
  const orientations = ["diagonal", "horizontal", "vertical", "diagonalRightToLeft"] as const;
  const fillId = (index: number) => `rain-pie-${instanceId}-${index}`;

  return <>
    {(variantId === "pie-default" || custom) && <label className="rain-chart-example-control">示例状态 <select aria-label="饼图示例状态" value={state} onChange={event => { setState(event.target.value as typeof state); setHovered(null); }}><option value="normal">正常</option><option value="zero">总量为0</option><option value="long">长中心文案</option></select></label>}
    <div className="rain-chart-radial">
      {total <= 0 ? <div className="rain-chart-empty">占比无有效分母</div> : <PieChart key={`${variantId}-${replay}`} className="rain-chart-radial-plot" data={data}
        innerRadius={custom ? 65 : donut ? variantId === "pie-donut" ? 60 : 55 : 0}
        hoveredIndex={safeHovered} onHoverChange={setHovered}
        enterTransition={reduced || !active ? immediate : undefined} enterStaggerScale={reduced || !active ? 0 : 1}>
        {pattern && data.map((item, index) => <PatternLines key={item.label} id={fillId(index)}
          width={index === 3 ? 8 : 6} height={index === 3 ? 8 : 6}
          orientation={[orientations[index]!]} stroke={item.color} strokeWidth={1} />)}
        {gradient && <defs>{data.map((item, index) => <radialGradient key={item.label} id={fillId(index)}>
          <stop offset="0%" stopColor={item.color} stopOpacity={.45} />
          <stop offset="100%" stopColor={item.color} />
        </radialGradient>)}</defs>}
        {data.map((item, index) => <PieSlice key={item.label} index={index}
          color={item.color} fill={pattern || gradient ? `url(#${fillId(index)})` : undefined}
          hoverEffect={grow ? "grow" : "translate"} showGlow={false} animate={!reduced && active} />)}
        {donut && (custom ? <PieCenter defaultLabel={state === "long" ? "综合课程学习情况总人数" : "课程人数"} suffix=" 人" valueClassName="rain-chart-center-value" labelClassName="rain-chart-center-label">
          {({ value, label, isHovered, data: item }) => <div className="rain-chart-center-reading">
            <strong className="rain-chart-center-value" style={{ color: isHovered ? item.color : undefined }}>{value}<small className="ml-0.5 text-[0.65em] font-normal">人</small></strong>
            <span className="rain-chart-center-label">{label}</span>
            <span className="rain-chart-center-label">{isHovered ? `${percentage(item.value)} · 占总人数` : "全部课程"}</span>
          </div>}
        </PieCenter> : <PieCenter defaultLabel="总人数" suffix=" 人" valueClassName="rain-chart-center-value" labelClassName="rain-chart-center-label" />)}
      </PieChart>}
    </div>
    {variantId === "pie-legend" && <InteractiveKey items={data} hovered={safeHovered} onHover={setHovered} />}
    <p className="rain-chart-note" role="status">{total <= 0 ? "总量为0；各类别占比不适用。" : selected ? <><span className="rain-chart-legend-dot" aria-hidden="true" style={{ background: selected.color }} />{`${selected.label}：${selected.value} 人，占 ${percentage(selected.value)}`}</> : `分母为全部类别合计 ${total} 人；各类别互斥。`}</p>
    <VariantTable caption="互斥课程类别与总人数占比" data={data.map(item => ({ 类别: item.label, "人数 · 人": item.value, 占全部比例: percentage(item.value) }))} />
  </>;
}

function RingVariant(props: VariantExampleProps) {
  const { variantId, revision, replay, reduced, active } = props;
  const [hovered, setHovered] = useState<number | null>(null);
  const [storedState, setState] = useVariantSetting("state", "normal", props);
  const state = storedState === "long" ? "long" : "normal";
  const thick = variantId === "ring-thick-rings";
  const half = variantId === "ring-half-circle";
  const quarter = variantId === "ring-three-quarter";
  const data = useMemo<RingData[]>(() => [
    { label: exampleLabel("阅读进度", state), value: Math.min(28 + revision, 40), maxValue: 40, color: seriesColors[0] },
    { label: exampleLabel("练习进度", state), value: Math.min(8 + revision, 12), maxValue: 12, color: seriesColors[1] },
    { label: exampleLabel("复习进度", state), value: Math.min(5 + revision, 10), maxValue: 10, color: seriesColors[2] },
  ], [revision, state]);
  const selected = hovered == null ? undefined : data[hovered];
  return <>
    {(variantId === "ring-default" || half || quarter) && <label className="rain-chart-example-control">示例状态 <select aria-label="进度环示例状态" value={state} onChange={event => { setState(event.target.value as typeof state); setHovered(null); }}><option value="normal">正常</option><option value="long">长中心文案</option></select></label>}
    <div className="rain-chart-radial">
      <RingChart key={`${variantId}-${replay}`} className="rain-chart-radial-plot" data={data}
        hoveredIndex={hovered} onHoverChange={setHovered} strokeWidth={thick ? 18 : 12} ringGap={thick ? 8 : 6}
        startAngle={half || quarter ? -Math.PI : undefined} endAngle={half ? 0 : quarter ? Math.PI / 2 : undefined}
        enterTransition={reduced || !active ? immediate : undefined} enterStaggerScale={reduced || !active ? 0 : 1}>
        {data.map((item, index) => <Ring key={item.label} index={index} color={item.color}
          animate={!reduced && active} lineCap={variantId === "ring-flat-caps" ? "butt" : "round"} />)}
        <RingCenter valueClassName="rain-chart-center-value" labelClassName="rain-chart-center-label">
          {({ data: item }) => <div className="rain-chart-center-reading">
            <strong className="rain-chart-center-value">{(item.value / item.maxValue * 100).toFixed(1)}%</strong>
            <span className="rain-chart-center-label">{item.label}</span>
          </div>}
        </RingCenter>
      </RingChart>
    </div>
    {variantId === "ring-legend" && <InteractiveKey items={data} hovered={hovered} onHover={setHovered} progress />}
    <p className="rain-chart-note" role="status">{selected ? `${selected.label}：${selected.value}/${selected.maxValue} 项，${(selected.value / selected.maxValue * 100).toFixed(1)}%` : "中心默认展示首项目标；每环使用自己的目标分母，不合计为总进度。"}</p>
    <VariantTable caption="独立目标的当前值、分母和进度" data={data.map(item => ({ 独立目标: item.label, "当前 · 项": item.value, "目标 · 项": item.maxValue, 进度: `${(item.value / item.maxValue * 100).toFixed(1)}%` }))} />
  </>;
}

const radarMetricLabels = ["理解", "分析", "应用", "表达", "协作", "创造"];
function RadarVariant({ variantId, revision, replay, reduced, active }: VariantExampleProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const triangle = variantId === "radar-triangle" || variantId === "radar-grid-only";
  const hexagon = variantId === "radar-hexagon";
  const single = variantId === "radar-single-series";
  const minimal = variantId === "radar-minimal";
  const metrics = useMemo<RadarMetric[]>(() => radarMetricLabels.slice(0, triangle ? 3 : hexagon ? 6 : 5)
    .map((label, index) => ({ key: `metric${index}`, label })), [triangle, hexagon]);
  const data = useMemo<RadarData[]>(() => (single ? ["示例课程"] : ["课程 A", "课程 B"])
    .map((label, series) => ({ label, color: seriesColors[series], values: Object.fromEntries(metrics.map((metric, index) =>
      [metric.key, Math.min(100, Math.max(0, (single ? [92, 38, 78, 45, 63, 58] : series === 0 ? [88, 65, 91, 56, 74, 68] : [62, 86, 57, 82, 69, 89])[index]! + revision * (series ? -1 : 1)))])) })), [single, metrics, revision]);
  const safeHovered = hovered != null && Number.isInteger(hovered) && hovered >= 0 && hovered < data.length ? hovered : null;
  return <>
    <div className="rain-chart-radial">
      <RadarChart key={`${variantId}-${replay}`} className="rain-chart-radial-plot" data={data} metrics={metrics}
        margin={48} levels={minimal ? 3 : 5} animate={!reduced && active} hoveredIndex={safeHovered} onHoverChange={setHovered}
        enterTransition={reduced || !active ? immediate : undefined} staggerScale={reduced || !active ? 0 : 1} enterDurationMs={reduced || !active ? 0 : undefined} motionReplayKey={String(replay)}>
        <RadarGrid showLabels={!hexagon && !minimal} />
        {!hexagon && !minimal && variantId !== "radar-grid-only" && <RadarAxis />}
        <RadarLabels fontSize={12} offset={16} />
        {data.map((item, index) => <RadarArea key={item.label} index={index} color={item.color}
          showPoints={!hexagon && !single && !minimal} showStroke={!hexagon} showGlow={!hexagon && variantId !== "radar-grid-only"} />)}
      </RadarChart>
    </div>
    <p className="rain-chart-note">{metrics.length} 个维度共用 0–100 分量程；均为示例评分，未混合不同单位。</p>
    <ExampleLegend items={data.map((item, index) => ({ label: item.label, value: 0, color: item.color ?? seriesColors[index]! }))} hovered={safeHovered} onHover={setHovered} />
    <VariantTable caption="同尺度能力评分 · 分" data={data.map(item => ({ 课程: item.label, ...Object.fromEntries(metrics.map(metric => [`${metric.label} · 分`, item.values[metric.key]])) }))} />
  </>;
}

export function RadialVariant(props: VariantExampleProps) {
  if (!RADIAL_VARIANT_IDS.includes(props.variantId as typeof RADIAL_VARIANT_IDS[number])) throw new Error(`Unknown radial variant: ${props.variantId}`);
  if (props.variantId.startsWith("pie-")) return <PieVariant {...props} />;
  if (props.variantId.startsWith("ring-")) return <RingVariant {...props} />;
  return <RadarVariant {...props} />;
}
