"use client";

import { Brush, type Bounds, type BrushProps as NativeBrushProps } from "@visx/brush";
import type React from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChartBrushHandleOverlay,
  renderChartBrushHandle,
} from "./chart-brush-handle";
import {
  ChartBrushSelectionOverlay,
  type ChartBrushSelectionPattern,
} from "./chart-brush-selection-overlay";
import {
  ChartBrushTrackOverlay,
  type ChartBrushTrackOverlayStyle,
} from "./chart-brush-track-overlay";
import { chartCssVars, useChartStable } from "./chart-context";

type BaseBrush = NonNullable<NativeBrushProps["innerRef"]>["current"];

interface BrushProps {
  xScale: unknown;
  yScale: unknown;
  width: number;
  height: number;
  innerRef?: React.RefObject<BaseBrush | null>;
  onBrushEnd?: (bounds: Bounds | null) => void;
  onChange?: (bounds: Bounds | null) => void;
  brushDirection?: "horizontal" | "vertical" | "both";
  margin?: { top: number; left: number; right: number; bottom: number };
  selectedBoxStyle?: React.SVGProps<SVGRectElement>;
  handleSize?: number;
  renderBrushHandle?: (props: {
    x: number;
    y: number;
    width: number;
    height: number;
    className: string;
    isBrushActive: boolean;
  }) => React.ReactNode;
  useWindowMoveEvents?: boolean;
  initialBrushPosition?: {
    start?: { x?: number; y?: number };
    end?: { x?: number; y?: number };
  };
}

const BrushComponent = (() =>
  Brush)() as unknown as React.ComponentType<BrushProps>;

export interface ChartBrushSelection {
  start: Date;
  end: Date;
}

export interface ChartBrushProps {
  /** Callback when brush selection ends. Domain is the selected time range. */
  onSelectionChange?: (domain: ChartBrushSelection | null) => void;
  /** Brush direction. Default: "horizontal" for time range selection. */
  brushDirection?: "horizontal" | "vertical" | "both";
  /** Fill style for the selected region. Default: chart segment style. */
  selectedBoxStyle?: React.SVGProps<SVGRectElement>;
  /** Initial selection so the brush overlay is visible on load (e.g. first 50% of range). */
  initialSelection?: ChartBrushSelection | null;
  /** Current selection (e.g. from parent state). When set, a visible selection rect is drawn. */
  selection?: ChartBrushSelection | null;
  /** Use window move events for brush (can fix coordinate offset when SVG is in transformed container). Default: true for brush-in-strip. */
  useWindowMoveEvents?: boolean;
  /** Backdrop blur on dimmed track (0–5 px). Default: 1.5 */
  blurPx?: number;
  /** Fade dimmed regions at the outer track edges. Default: true */
  fadeOuterEdges?: boolean;
  /** Optional pattern overlay inside the brush selection window. */
  selectionPattern?: ChartBrushSelectionPattern;
}

interface ChartBrushInnerProps extends ChartBrushTrackOverlayStyle {
  brushDirection?: ChartBrushProps["brushDirection"];
  selectedBoxStyle?: ChartBrushProps["selectedBoxStyle"];
  initialSelection?: ChartBrushProps["initialSelection"];
  selection?: ChartBrushProps["selection"];
  useWindowMoveEvents?: ChartBrushProps["useWindowMoveEvents"];
  xScale: ReturnType<typeof useChartStable>["xScale"];
  yScale: ReturnType<typeof useChartStable>["yScale"];
  innerWidth: number;
  innerHeight: number;
  margin: ReturnType<typeof useChartStable>["margin"];
  onBrushPreview?: (bounds: Bounds | null) => void;
  onBrushCommit: (bounds: Bounds | null) => void;
  selectionPattern?: ChartBrushSelectionPattern;
}

function toDate(value: number | Date | unknown): Date {
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === "number") {
    return new Date(value);
  }
  return new Date(Number(value));
}

function boundsToPixelExtent(
  bounds: Bounds | null,
  xScale: ReturnType<typeof useChartStable>["xScale"],
  innerWidth: number
): { x0: number; x1: number } | null {
  if (
    !bounds ||
    typeof bounds.x0 === "undefined" ||
    typeof bounds.x1 === "undefined"
  ) {
    return null;
  }

  const start = toDate(bounds.x0);
  const end = toDate(bounds.x1);
  const xScaleFn = xScale as (d: Date) => number;
  const x0 = Math.max(0, xScaleFn(start < end ? start : end) ?? 0);
  const x1 = Math.min(
    innerWidth,
    xScaleFn(end > start ? end : start) ?? innerWidth
  );

  if (!Number.isFinite(x0) || !Number.isFinite(x1) || x1 <= x0) {
    return null;
  }

  return { x0, x1 };
}

const ChartBrushInner = memo(function ChartBrushInner({
  brushDirection = "horizontal",
  selectedBoxStyle,
  initialSelection,
  selection,
  useWindowMoveEvents = true,
  xScale,
  yScale,
  innerWidth,
  innerHeight,
  margin,
  onBrushPreview,
  onBrushCommit,
  blurPx,
  fadeOuterEdges,
  selectionPattern,
}: ChartBrushInnerProps) {
  const brushRef = useRef<BaseBrush | null>(null);
  const currentSelection = selection === undefined ? initialSelection : selection;
  const initialBrushPosition = useMemo(() => {
    if (!currentSelection || innerWidth <= 0 || innerHeight <= 0) {
      return undefined;
    }
    const pixels = boundsToPixelExtent({
      x0: currentSelection.start.getTime(), x1: currentSelection.end.getTime(), y0: 0, y1: innerHeight,
    }, xScale, innerWidth);
    if (!pixels) {
      return undefined;
    }
    return {
      start: { x: pixels.x0, y: 0 },
      end: { x: pixels.x1, y: innerHeight },
    };
  }, [currentSelection, xScale, innerWidth, innerHeight]);

  const [pixelExtent, setPixelExtent] = useState(() => ({
    x0: initialBrushPosition?.start.x ?? 0,
    x1: initialBrushPosition?.end.x ?? innerWidth,
  }));

  useEffect(() => {
    const brush = brushRef.current;
    // Visx uses start/end as pointer-down anchors; preview echoes must not move them.
    if (brush?.state.isBrushing) return;
    setPixelExtent({
      x0: initialBrushPosition?.start.x ?? 0,
      x1: initialBrushPosition?.end.x ?? innerWidth,
    });
    if (!brush) return;
    if (initialBrushPosition) {
      const { start, end } = initialBrushPosition;
      const extent = brush.getExtent(start, end);
      if (Object.entries(extent).some(([axis, value]) => brush.state.extent[axis as keyof Bounds] !== value)) {
        // updateBrush also emits onChange, which would feed controlled updates back into the parent.
        brush.setState({ start, end, extent });
      }
    } else if (selection !== undefined) {
      brush.setState(brush.getIdleState());
    }
  }, [initialBrushPosition, innerWidth, selection]);

  const updatePixelExtent = useCallback(
    (bounds: Bounds | null) => {
      const extent = brushRef.current?.state.extent;
      const pixels = extent && extent.x0 >= 0 && extent.x1 > extent.x0
        ? { x0: extent.x0, x1: extent.x1 }
        : boundsToPixelExtent(bounds, xScale, innerWidth);
      if (pixels) {
        setPixelExtent(pixels);
      }
      // Visx pads callback domains for hit tolerance; keep the actual selected time extent.
      return bounds && pixels ? {
        ...bounds, x0: xScale.invert(pixels.x0).getTime(), x1: xScale.invert(pixels.x1).getTime(),
      } : bounds;
    },
    [innerWidth, xScale]
  );

  const handleBrushPreview = useCallback(
    (bounds: Bounds | null) => {
      const selectionBounds = updatePixelExtent(bounds);
      onBrushPreview?.(selectionBounds);
    },
    [onBrushPreview, updatePixelExtent]
  );

  const handleBrushCommit = useCallback(
    (bounds: Bounds | null) => {
      onBrushCommit(updatePixelExtent(bounds));
    },
    [onBrushCommit, updatePixelExtent]
  );

  const defaultStyle = {
    fill: "transparent",
    fillOpacity: 0,
    stroke: chartCssVars.brushBorder,
    strokeWidth: 1,
  };

  return (
    <g className="chart-brush">
      <ChartBrushTrackOverlay
        blurPx={blurPx}
        fadeOuterEdges={fadeOuterEdges}
        innerHeight={innerHeight}
        innerWidth={innerWidth}
        selectionX0={pixelExtent.x0}
        selectionX1={pixelExtent.x1}
      />
      {selection !== null && <ChartBrushSelectionOverlay
        innerHeight={innerHeight}
        innerWidth={innerWidth}
        pattern={selectionPattern}
        selectionX0={pixelExtent.x0}
        selectionX1={pixelExtent.x1}
      />}
      {selection !== null && <ChartBrushHandleOverlay
        innerHeight={innerHeight}
        innerWidth={innerWidth}
        selectionX0={pixelExtent.x0}
        selectionX1={pixelExtent.x1}
      />}
      <BrushComponent
        brushDirection={brushDirection}
        handleSize={8}
        height={innerHeight}
        initialBrushPosition={initialBrushPosition}
        innerRef={brushRef}
        key={`brush-${innerWidth}-${innerHeight}`}
        margin={
          useWindowMoveEvents
            ? margin
            : { top: 0, left: 0, right: 0, bottom: 0 }
        }
        onBrushEnd={handleBrushCommit}
        onChange={handleBrushPreview}
        renderBrushHandle={renderChartBrushHandle}
        selectedBoxStyle={selectedBoxStyle ?? defaultStyle}
        useWindowMoveEvents={useWindowMoveEvents}
        width={innerWidth}
        xScale={xScale}
        yScale={yScale}
      />
    </g>
  );
});

export function ChartBrush({
  onSelectionChange,
  brushDirection = "horizontal",
  selectedBoxStyle,
  initialSelection,
  selection,
  useWindowMoveEvents = true,
  blurPx,
  fadeOuterEdges,
  selectionPattern,
}: ChartBrushProps) {
  const { xScale, yScale, innerWidth, innerHeight, margin, isLoaded } =
    useChartStable();

  const boundsToSelection = useCallback(
    (bounds: Bounds | null): ChartBrushSelection | null => {
      if (
        !bounds ||
        typeof bounds.x0 === "undefined" ||
        typeof bounds.x1 === "undefined"
      ) {
        return null;
      }
      const start = toDate(bounds.x0);
      const end = toDate(bounds.x1);
      if (start.getTime() === end.getTime()) {
        return null;
      }
      return {
        start: start < end ? start : end,
        end: end > start ? end : start,
      };
    },
    []
  );

  const notifySelectionChange = useCallback(
    (bounds: Bounds | null) => {
      if (!onSelectionChange) {
        return;
      }
      onSelectionChange(boundsToSelection(bounds));
    },
    [onSelectionChange, boundsToSelection]
  );

  const handleBrushPreview = useCallback(
    (bounds: Bounds | null) => {
      notifySelectionChange(bounds);
    },
    [notifySelectionChange]
  );

  const handleBrushCommit = useCallback(
    (bounds: Bounds | null) => {
      notifySelectionChange(bounds);
    },
    [notifySelectionChange]
  );

  if (!isLoaded || innerWidth <= 0 || innerHeight <= 0) {
    return null;
  }

  return (
    <ChartBrushInner
      blurPx={blurPx}
      brushDirection={brushDirection}
      fadeOuterEdges={fadeOuterEdges}
      initialSelection={initialSelection}
      innerHeight={innerHeight}
      innerWidth={innerWidth}
      margin={margin}
      onBrushCommit={handleBrushCommit}
      onBrushPreview={handleBrushPreview}
      selectedBoxStyle={selectedBoxStyle}
      selection={selection}
      selectionPattern={selectionPattern}
      useWindowMoveEvents={useWindowMoveEvents}
      xScale={xScale}
      yScale={yScale}
    />
  );
}

ChartBrush.displayName = "ChartBrush";

export default ChartBrush;
