"use client";

import { useChartSpring } from "./motion-utils";
import { useMemo, useRef } from "react";
import { useChartConfig } from "./chart-config-context";
import { useChartHover, useChartStable } from "./chart-context";
import { getChartX } from "./category-scale";
import {
  computeSegmentBounds,
  INACTIVE_SEGMENT,
} from "./highlight-segment-bounds";

// Hover-highlight band for `line.tsx` and `area.tsx`. Computes the segment
// bounds and springs its x/width; `<HighlightSegment>` renders the clipped
// re-stroke. Spring tuning comes from `ChartConfigProvider.highlightSpring`.
// Stable + hover slices are read separately so callers can see the exact
// subscription surface (anything calling this hook will re-render on hover).

export interface HighlightSegmentResult {
  xSpring: ReturnType<typeof useChartSpring>;
  widthSpring: ReturnType<typeof useChartSpring>;
  isActive: boolean;
}

/**
 * @param enabled set false when there is no stroke to highlight (e.g. an area
 *   with `showLine={false}`); defaults true.
 */
export function useHighlightSegment({
  enabled = true,
}: {
  enabled?: boolean;
} = {}): HighlightSegmentResult {
  const context = useChartStable();
  const { data } = context;
  const { tooltipData, selection } = useChartHover();
  const { highlightSpring } = useChartConfig();

  const bounds = useMemo(
    () =>
      enabled
        ? computeSegmentBounds<number>(data, (x) => x, (datum) => getChartX(context, datum), tooltipData, selection)
        : INACTIVE_SEGMENT,
    [enabled, context, data, tooltipData, selection]
  );

  const xSpring = useChartSpring(bounds.x, highlightSpring);
  const widthSpring = useChartSpring(bounds.width, highlightSpring);

  // Jump on inactive→active so the band appears at the hovered point instead
  // of sliding in from x=0; ease on subsequent moves.
  const wasActive = useRef(false);
  if (bounds.isActive && !wasActive.current) {
    xSpring.jump(bounds.x);
    widthSpring.jump(bounds.width);
  } else {
    xSpring.set(bounds.x);
    widthSpring.set(bounds.width);
  }
  wasActive.current = bounds.isActive;

  return { xSpring, widthSpring, isActive: bounds.isActive };
}
