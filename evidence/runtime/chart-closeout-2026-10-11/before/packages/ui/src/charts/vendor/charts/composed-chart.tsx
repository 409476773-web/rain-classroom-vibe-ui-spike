"use client";

import { ParentSize } from "@visx/responsive";
import type { Transition } from "motion/react";
import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useMemo,
  useRef,
} from "react";
import { cn } from "../lib/utils";
import { Area, type AreaProps } from "./area";
import type { LineConfig, Margin } from "./chart-context";
import type { ChartPhase } from "./chart-phase";
import { Line, type LineProps } from "./line";
import { SeriesBar, type SeriesBarProps } from "./series-bar";
import { TimeSeriesChartInner } from "./time-series-chart-shell";
import { normalizeYAxisId } from "./y-axis-scales";

export interface ComposedChartProps {
  /** Data array — each row typically has a date and multiple numeric series */
  data: Record<string, unknown>[];
  /** Key for time values or stable category IDs. Default: "date" */
  xDataKey?: string;
  /** X-axis mode. Default: "time" */
  xMode?: "time" | "category";
  /** Display label for a category row; identity stays in xDataKey. */
  xLabel?: (datum: Record<string, unknown>) => string;
  /** Exact zero-based domains by axis; upper endpoints must be finite and positive. */
  yDomains?: Record<string, [0, number]>;
  margin?: Partial<Margin>;
  animationDuration?: number;
  animationEasing?: string;
  enterTransition?: Transition;
  /** Signature of motion URL state — triggers reveal replay when it changes. */
  revealSignature?: string;
  aspectRatio?: string;
  className?: string;
  children: ReactNode;
  /** Target bar width in px (Recharts-style `barSize`). */
  barSize?: number;
  /** Maximum bar width in px (`maxBarSize`). */
  maxBarSize?: number;
  /** Gap between grouped `SeriesBar` series in px. Default: 4 */
  barGap?: number;
  /** Stack `SeriesBar` segments in child order at each x (line/area are not stacked). */
  stacked?: boolean;
  /** Gap in px between stacked segments. Default: 0 */
  stackGap?: number;
  onPhaseChange?: (phase: ChartPhase) => void;
}

const DEFAULT_MARGIN: Margin = { top: 40, right: 40, bottom: 40, left: 40 };

function getChildComponentName(child: ReactElement): string {
  const childType = child.type as { displayName?: string; name?: string };
  return typeof child.type === "function"
    ? childType.displayName || childType.name || ""
    : "";
}

function upsertLineConfig(lines: LineConfig[], config: LineConfig): void {
  const index = lines.findIndex((line) => line.dataKey === config.dataKey);
  if (index === -1) {
    lines.push(config);
    return;
  }
  // Area+Line pairs share a dataKey — keep the later config (Line over Area).
  lines[index] = config;
}

function tryAppendSeriesBar(
  child: ReactElement,
  lines: LineConfig[],
  barDataKeys: string[]
): boolean {
  const name = getChildComponentName(child);
  if (!(child.type === SeriesBar || name === "SeriesBar")) {
    return false;
  }
  const props = child.props as SeriesBarProps;
  if (!props.dataKey) {
    return true;
  }
  barDataKeys.push(props.dataKey);
  upsertLineConfig(lines, {
    dataKey: props.dataKey,
    stroke: props.stroke || props.fill || "var(--chart-line-primary)",
    strokeWidth: 0,
    yAxisId: props.yAxisId,
  });
  return true;
}

function tryAppendLine(child: ReactElement, lines: LineConfig[]): boolean {
  const name = getChildComponentName(child);
  if (!(child.type === Line || name === "Line")) {
    return false;
  }
  const props = child.props as LineProps;
  if (props.dataKey) {
    upsertLineConfig(lines, {
      dataKey: props.dataKey,
      stroke: props.stroke || "var(--chart-line-primary)",
      strokeWidth: props.strokeWidth ?? 2.5,
      yAxisId: props.yAxisId,
    });
  }
  return true;
}

function tryAppendArea(child: ReactElement, lines: LineConfig[]): boolean {
  const name = getChildComponentName(child);
  if (!(child.type === Area || name === "Area")) {
    return false;
  }
  const props = child.props as AreaProps;
  if (props.dataKey) {
    upsertLineConfig(lines, {
      dataKey: props.dataKey,
      stroke: props.stroke || props.fill || "var(--chart-line-primary)",
      strokeWidth: props.strokeWidth ?? 2,
      yAxisId: props.yAxisId,
    });
  }
  return true;
}

function extractComposedSeries(children: ReactNode): {
  lines: LineConfig[];
  barDataKeys: string[];
} {
  const lines: LineConfig[] = [];
  const barDataKeys: string[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }
    if (tryAppendSeriesBar(child, lines, barDataKeys)) {
      return;
    }
    if (tryAppendLine(child, lines)) {
      return;
    }
    tryAppendArea(child, lines);
  });

  return { lines, barDataKeys };
}

function computeComposedYScaleDomainMaxByAxis(
  data: Record<string, unknown>[],
  lines: LineConfig[],
  barDataKeys: string[]
): Record<string, number> {
  const barSet = new Set(barDataKeys);
  const barAxes = new Set(
    lines.filter(line => barSet.has(line.dataKey)).map(line => normalizeYAxisId(line.yAxisId))
  );
  const maxima: Record<string, number> = {};
  for (const d of data) {
    const barSums: Record<string, number> = {};
    for (const line of lines) {
      const value = d[line.dataKey];
      if (typeof value !== "number" || !Number.isFinite(value)) {
        continue;
      }
      const axisId = normalizeYAxisId(line.yAxisId);
      if (!barAxes.has(axisId)) {
        continue;
      }
      if (barSet.has(line.dataKey)) {
        barSums[axisId] = (barSums[axisId] ?? 0) + value;
      } else {
        maxima[axisId] = Math.max(maxima[axisId] ?? 0, value);
      }
    }
    for (const [axisId, total] of Object.entries(barSums)) {
      if (!Number.isFinite(total)) {
        throw new Error("ComposedChart stack totals must be finite.");
      }
      maxima[axisId] = Math.max(maxima[axisId] ?? 0, total);
    }
  }
  return maxima;
}

interface ChartInnerProps {
  width: number;
  height: number;
  data: Record<string, unknown>[];
  xDataKey: string;
  xMode: "time" | "category";
  xLabel?: (datum: Record<string, unknown>) => string;
  yDomains?: Record<string, [0, number]>;
  margin: Margin;
  animationDuration: number;
  animationEasing?: string;
  enterTransition?: Transition;
  revealSignature?: string;
  children: ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null>;
  barSize?: number;
  maxBarSize?: number;
  barGap?: number;
  stacked?: boolean;
  stackGap?: number;
  onPhaseChange?: (phase: ChartPhase) => void;
}

function ChartInner({
  width,
  height,
  data,
  xDataKey,
  xMode,
  xLabel,
  yDomains,
  margin,
  animationDuration,
  animationEasing,
  enterTransition,
  revealSignature,
  children,
  containerRef,
  barSize,
  maxBarSize,
  barGap,
  stacked = false,
  stackGap = 0,
  onPhaseChange,
}: ChartInnerProps) {
  const { lines, barDataKeys } = useMemo(
    () => extractComposedSeries(children),
    [children]
  );

  for (const datum of data) {
    for (const line of lines) {
      const value = datum[line.dataKey];
      if (typeof value === "number" && !Number.isFinite(value)) {
        throw new Error(`ComposedChart series ${line.dataKey} must contain finite values or null.`);
      }
      if (typeof value === "number" && value < 0 && barDataKeys.includes(line.dataKey)) {
        throw new Error(`ComposedChart bar ${line.dataKey} must contain non-negative quantities.`);
      }
    }
  }
  const barAxes = new Set(
    lines.filter(line => barDataKeys.includes(line.dataKey)).map(line => normalizeYAxisId(line.yAxisId))
  );
  if (stacked && barAxes.size > 1) {
    throw new Error("ComposedChart stacked bars must use the same Y axis.");
  }


  const yScaleDomainMaxByAxis = useMemo(
    () =>
      stacked && barDataKeys.length > 0
        ? computeComposedYScaleDomainMaxByAxis(data, lines, barDataKeys)
        : undefined,
    [data, lines, barDataKeys, stacked]
  );

  return (
    <TimeSeriesChartInner
      animationDuration={animationDuration}
      animationEasing={animationEasing}
      clipPathId="composed-chart-grow-clip"
      composedBarDataKeys={barDataKeys.length > 0 ? barDataKeys : undefined}
      composedBarGap={barGap}
      composedBarSize={barSize}
      composedMaxBarSize={maxBarSize}
      composedStacked={stacked}
      composedStackGap={stackGap}
      containerRef={containerRef}
      data={data}
      enterTransition={enterTransition}
      height={height}
      lines={lines}
      margin={margin}
      onPhaseChange={onPhaseChange}
      revealSignature={revealSignature}
      width={width}
      xDataKey={xDataKey}
      xMode={xMode}
      xLabel={xLabel}
      yDomains={yDomains}
      yScaleDomainMaxByAxis={yScaleDomainMaxByAxis}
    >
      {children}
    </TimeSeriesChartInner>
  );
}

export function ComposedChart({
  data,
  xDataKey = "date",
  xMode = "time",
  xLabel,
  yDomains,
  margin: marginProp,
  animationDuration = 1100,
  animationEasing,
  enterTransition,
  revealSignature,
  aspectRatio = "2 / 1",
  className = "",
  children,
  barSize,
  maxBarSize,
  barGap = 4,
  stacked = false,
  stackGap = 0,
  onPhaseChange,
}: ComposedChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const margin = { ...DEFAULT_MARGIN, ...marginProp };

  for (const domain of Object.values(yDomains ?? {})) {
    if (
      !Array.isArray(domain) || domain.length !== 2 || domain[0] !== 0 ||
      !Number.isFinite(domain[1]) || domain[1] <= 0
    ) {
      throw new Error("ComposedChart yDomains must contain [0, upper] with a finite, positive upper endpoint.");
    }
  }

  return (
    <div
      data-rain-id="ui-chart-composed"
      data-slot="chart-root"
      className={cn("relative w-full", className)}
      ref={containerRef}
      style={{ aspectRatio, touchAction: "none" }}
    >
      <ParentSize debounceTime={10}>
        {({ width, height }) => (
          <ChartInner
            animationDuration={animationDuration}
            animationEasing={animationEasing}
            barGap={barGap}
            barSize={barSize}
            containerRef={containerRef}
            data={data}
            enterTransition={enterTransition}
            height={height}
            margin={margin}
            maxBarSize={maxBarSize}
            onPhaseChange={onPhaseChange}
            revealSignature={revealSignature}
            stacked={stacked}
            stackGap={stackGap}
            width={width}
            xDataKey={xDataKey}
            xMode={xMode}
            xLabel={xLabel}
            yDomains={yDomains}
          >
            {children}
          </ChartInner>
        )}
      </ParentSize>
    </div>
  );
}

ComposedChart.displayName = "ComposedChart";

export default ComposedChart;
