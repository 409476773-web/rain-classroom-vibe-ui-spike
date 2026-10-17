"use client";

import type { Transition } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";
import { chartCssVars, useChart, useYScale } from "./chart-context";
import { getChartX, getChartXKey } from "./category-scale";
import { useChartLegendHover } from "./chart-legend-hover";
import { transitionWithDelay } from "./motion-utils";
import { computeSeriesBarLayout, computeSeriesBarWidth } from "./series-bar-layout";

export interface SeriesBarProps {
  /** Key in data for bar height (y value) */
  dataKey: string;
  /** Y-scale group id. Default: "left". */
  yAxisId?: string | number;
  /** Fill color. Default: var(--chart-line-primary) */
  fill?: string;
  /** Tooltip dot color when fill is gradient/pattern. Default: fill */
  stroke?: string;
  /** Corner radius for bar top corners. Default: 0 (square tops, similar to Bar lineCap="butt") */
  radius?: number;
  /** Animate grow from baseline. Default: true */
  animate?: boolean;
  /** Opacity for non-hovered bars when another point is hovered (matches BarChart). Default: 0.3 */
  fadedOpacity?: number;
}

export function SeriesBar({
  dataKey,
  yAxisId,
  fill = chartCssVars.linePrimary,
  radius = 0,
  animate = true,
  fadedOpacity = 0.3,
}: SeriesBarProps) {
  const context = useChart();
  const reducedMotion = useReducedMotion();
  const animateGeometry = animate && !reducedMotion;
  const {
    data,
    innerHeight,
    innerWidth,
    columnWidth,
    isLoaded,
    animationDuration,
    enterTransition,
    revealEpoch = 0,
    barScale,
    composedBarDataKeys,
    composedBarSize,
    composedMaxBarSize,
    composedBarGap,
    composedStacked,
    composedStackOffsets,
    composedStackGap,
    tooltipData,
  } = context;
  const yScale = useYScale(yAxisId);

  const barKeys = useMemo(() => {
    if (composedBarDataKeys && composedBarDataKeys.length > 0) {
      return composedBarDataKeys;
    }
    return [dataKey];
  }, [composedBarDataKeys, dataKey]);

  const seriesIndex = useMemo(() => {
    const idx = barKeys.indexOf(dataKey);
    return idx >= 0 ? idx : 0;
  }, [barKeys, dataKey]);

  const n = barKeys.length;
  const gap = composedBarGap ?? 4;
  const stackGap = composedStackGap ?? 0;

  const stacked =
    Boolean(composedStacked) &&
    composedStackOffsets != null &&
    composedBarDataKeys != null &&
    composedBarDataKeys.length > 0;

  const isLastSeries = seriesIndex === n - 1;

  const barWidth = useMemo(
    () =>
      computeSeriesBarWidth({
        innerWidth,
        dataLength: data.length,
        columnWidth,
        seriesCount: n,
        composedBarSize,
        composedMaxBarSize,
        composedBarGap: gap,
        stacked,
      }),
    [
      columnWidth,
      composedBarSize,
      composedMaxBarSize,
      data.length,
      gap,
      innerWidth,
      n,
      stacked,
    ]
  );

  const totalAnimDuration = animationDuration || 1100;
  const staggerSpread = totalAnimDuration * 0.4;
  const calculatedStaggerDelay =
    data.length > 1 ? staggerSpread / 1000 / data.length : 0;
  const { hoveredIndex: legendHoveredIndex } = useChartLegendHover();
  const isLegendDimmed =
    legendHoveredIndex !== null && legendHoveredIndex !== seriesIndex;
  const hoveredIndex = tooltipData?.index ?? null;

  if (barScale) {
    console.warn(
      "SeriesBar belongs to ComposedChart / LineChart. Use Bar inside BarChart."
    );
    return null;
  }

  return (
    <g className="series-bar">
      {data.map((d, i) => {
        const value = d[dataKey];
        if (typeof value !== "number" || !Number.isFinite(value)) {
          return null;
        }
        if (value < 0) {
          throw new Error(`SeriesBar ${dataKey} must contain non-negative quantities.`);
        }

        const xCenter = getChartX(context, d);

        const { barLeft, valueY, barHeight, effectiveRadius } =
          computeSeriesBarLayout({
            stacked,
            composedStackOffsets,
            rowIndex: i,
            dataKey,
            value,
            yScale,
            innerHeight,
            xCenter,
            barWidth,
            seriesCount: n,
            gap,
            seriesIndex,
            stackGap,
            isLastSeries,
            radius,
          });

        const categoryLabel = getChartXKey(context, d);
        const isFaded =
          (hoveredIndex !== null && hoveredIndex !== i) || isLegendDimmed;

        const geometryTransition: Transition = animateGeometry
          ? transitionWithDelay(enterTransition, isLoaded ? 0 : i * calculatedStaggerDelay)
          : { type: "tween", duration: 0 };

        return (
          <motion.rect
            animate={{
              attrX: barLeft,
              attrY: valueY,
              width: barWidth,
              height: barHeight,
              opacity: isFaded ? fadedOpacity : 1,
            }}
            fill={fill}
            initial={animateGeometry && !isLoaded
              ? { attrX: barLeft, attrY: innerHeight, width: barWidth, height: 0, opacity: 1 }
              : false}
            key={`${dataKey}-${categoryLabel}-${revealEpoch}`}
            rx={effectiveRadius}
            ry={effectiveRadius}
            transition={{ ...geometryTransition, opacity: { duration: 0.12 } }}
          />
        );
      })}
    </g>
  );
}

SeriesBar.displayName = "SeriesBar";

export default SeriesBar;
