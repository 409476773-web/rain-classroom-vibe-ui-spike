import { useMemo, useState } from "react";
import {
  LineChart, Line, Grid, XAxis, YAxis, ChartTooltip, TooltipContent,
  ChartLegend, ProfitLossLine, ProfitLossLegendHoverProvider, curveLinear,
} from "@rain-next/ui/charts";
import { makeProfitLoss, applyProfitLossBoundary, dateLabel, type ChartBoundaryScenario, type ChartState } from "../chart-data";
import { immediate, VariantTable } from "./shared";
import { ChartPointReading } from "../chart-point-reading";

type ProfitLossExampleProps = { revision?: number; replay?: number; reduced?: boolean; state?: ChartState; showData?: boolean; boundaryScenario?: ChartBoundaryScenario; onBoundaryScenarioChange?: (scenario: ChartBoundaryScenario) => void };
const positive = "var(--chart-positive)";
const negative = "var(--chart-negative)";
const finiteValue = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? value : 0;

/** Shared by the original default page and the Line gallery source row. */
export function ProfitLossExample({ revision = 0, replay = 0, reduced = false, state = "normal", showData = true, boundaryScenario = "normal", onBoundaryScenarioChange }: ProfitLossExampleProps) {
  const [localScenario, setLocalScenario] = useState<ChartBoundaryScenario>(boundaryScenario);
  const scenario = onBoundaryScenarioChange ? boundaryScenario : localScenario;
  const data = useMemo(() => applyProfitLossBoundary(makeProfitLoss(revision, state), scenario), [revision, state, scenario]);
  const [hovered, setHovered] = useState<number | null>(null);
  const color = (value: unknown) => finiteValue(value) < 0 ? negative : positive;
  return <>
    <label className="rain-chart-example-control">边界样本 <select aria-label="盈亏线边界样本" value={scenario} onChange={event => (onBoundaryScenarioChange ?? setLocalScenario)(event.target.value as ChartBoundaryScenario)}><option value="normal">正常数据</option><option value="profit-loss-near-zero">近零正负值</option><option value="profit-loss-zero-run">连续零值过零</option></select></label>
    <LineChart data={data} className="rain-chart-plot" aspectRatio="" margin={{ top: 24, right: 24, bottom: 38, left: 58 }} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? immediate : undefined} yDomainTween={!reduced} revealSignature={String(replay)}>
      <Grid horizontal numTicksRows={4} highlightRowValues={[0]} highlightRowStroke="var(--chart-label)" highlightRowStrokeOpacity={.4} />
      <Line dataKey="value" stroke="transparent" strokeWidth={0} showHighlight={false} fadeEdges={false} curve={curveLinear} animate={!reduced} />
      <ProfitLossLegendHoverProvider hoveredIndex={hovered}><ProfitLossLine dataKey="value" positiveColor={positive} negativeColor={negative} curve={curveLinear} fadeEdges={false} /></ProfitLossLegendHoverProvider>
      <YAxis numTicks={4} /><XAxis numTicks={4} />
      <ChartTooltip className="rain-chart-tooltip" indicatorColor={point => color(point.value)} dotColor={point => color(point.value)} damping={reduced ? 0 : undefined} content={({ point }) => <TooltipContent title={dateLabel(point.date as Date)} rows={[{ label: "相对基准变化", value: `${finiteValue(point.value) > 0 ? "+" : ""}${point.value}`, color: color(point.value) }]} />} />
    </LineChart>
    <ChartLegend className="rain-chart-legend" labelClassName="text-sm font-normal" valueClassName="text-sm font-normal" showValue={false} hoveredIndex={hovered} onHover={setHovered} items={[
      { label: "非负值", value: 0, color: positive }, { label: "负值", value: 0, color: negative },
    ]} renderItem={({ item, index, isHovered, isFaded }) => <button type="button" className="rain-chart-legend-button" onFocus={() => setHovered(index)} onBlur={() => setHovered(null)} onClick={() => setHovered(index)} style={{ display: "flex", alignItems: "center", gap: 8, border: 0, borderRadius: 8, padding: "6px 8px", font: "inherit", color: "var(--legend-foreground)", background: isHovered ? "var(--legend-muted)" : "transparent", opacity: isFaded ? .4 : 1, cursor: "pointer" }}>
      <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0, background: item.color }} /><span>{item.label}</span>
    </button>} />
    <p className="rain-chart-note">0为基准值，零线高亮；颜色沿用原生正负分段规则。</p>
    <ChartPointReading data={data.map(point => ({ ...point, direction: point.value < 0 ? "负值" : point.value > 0 ? "正值" : "基准值" }))} fields={[{ key: "value", label: "相对基准变化", unit: "" }, { key: "direction", label: "符号", unit: "" }]} />
    {showData && <VariantTable data={data.map(point => ({ 日期: dateLabel(point.date), 相对基准变化: point.value }))} />}
  </>;
}
