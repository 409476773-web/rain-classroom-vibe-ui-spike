"use client";

import { curveMonotoneX } from "@visx/curve";
import { AreaClosed } from "@visx/shape";
import { useChartStable } from "./chart-context";
import { getChartX } from "./category-scale";
import { getSeriesValue } from "./series-path-utils";

// biome-ignore lint/suspicious/noExplicitAny: d3 curve factory type
type CurveFactory = any;

export interface PatternAreaProps {
  /** Key in data to use for y values */
  dataKey: string;
  /** Fill color or pattern URL (e.g. `url(#pattern-id)`) */
  fill: string;
  /** Curve function. Default: curveMonotoneX */
  curve?: CurveFactory;
  /** @deprecated Pattern fill is not clip-revealed; only the stroke `Area` animates. */
  animate?: boolean;
}

/**
 * Filled area using an SVG pattern (`url(#id)`).
 * Pair with `PatternLines` in `AreaChart` children and an `Area` with `fillOpacity={0}` for the stroke line.
 */
export function PatternArea({
  dataKey,
  fill,
  curve = curveMonotoneX,
}: PatternAreaProps) {
  const context = useChartStable();
  const { renderData, yScale } = context;

  return (
    <AreaClosed
      curve={curve}
      data={renderData}
      defined={(datum) => getSeriesValue(datum, dataKey) !== null}
      fill={fill}
      x={(datum) => getChartX(context, datum)}
      y={(d) => {
        const value = getSeriesValue(d, dataKey);
        return value === null ? 0 : (yScale(value) ?? 0);
      }}
      yScale={yScale}
    />
  );
}

PatternArea.displayName = "PatternArea";

export default PatternArea;
