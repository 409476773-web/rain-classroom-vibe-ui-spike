import { useMemo, useState } from "react";
import {
  LineChart, Line, Grid, XAxis, YAxis, ChartTooltip, TooltipContent,
  ChartLegend, ProfitLossLine, ProfitLossLegendHoverProvider, curveLinear,
} from "@rain-next/ui/charts";
import { makeProfitLoss, dateLabel, type ChartState } from "../chart-data";
import { immediate, VariantTable } from "./shared";

type ProfitLossExampleProps = { revision?: number; replay?: number; reduced?: boolean; state?: ChartState; showData?: boolean };
const positive = "var(--chart-positive)";
const negative = "var(--chart-negative)";
const finiteValue = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? value : 0;

/** Shared by the original default page and the Line gallery source row. */
export function ProfitLossExample({ revision = 0, replay = 0, reduced = false, state = "normal", showData = true }: ProfitLossExampleProps) {
  const data = useMemo(() => makeProfitLoss(revision, state), [revision, state]);
  const [hovered, setHovered] = useState<number | null>(null);
  const color = (value: unknown) => finiteValue(value) < 0 ? negative : positive;
  return <>
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
    {showData && <VariantTable data={data.map(point => ({ 日期: dateLabel(point.date), 相对基准变化: point.value }))} />}
  </>;
}
