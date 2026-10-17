"use client";

import {
  memo,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "../lib/utils";
import type { ChartBrushSelection } from "./chart-brush";
import { resolveBrushTrackXExtent } from "./filter-data-by-x-domain";

export interface ChartBrushLayoutState {
  xDomain: [Date, Date] | undefined;
  xDomainSlotCount: number | undefined;
  brushSelection: ChartBrushSelection | null;
  onBrushSelectionChange: (selection: ChartBrushSelection | null) => void;
}

export interface ChartBrushLayoutProps {
  /** Full dataset backing the brush strip and main chart. */
  data: Record<string, unknown>[];
  xDataKey?: string;
  /** Extends the brush track max beyond the last data row (e.g. projection horizon). */
  xExtentMax?: Date;
  /** When false, children render without brush zoom state. */
  enabled: boolean;
  /** Fixed height of the brush strip in pixels. */
  height: number;
  /** When true, the main chart area hugs content instead of growing to fill space. */
  fitMainContent?: boolean;
  className?: string;
  /** Controlled current time range. Omit to let the layout retain its own range. */
  selection?: ChartBrushSelection | null;
  /** Reports a user range change, including reset to the full data extent. */
  onSelectionChange?: (selection: ChartBrushSelection | null) => void;
  children: (layout: ChartBrushLayoutState) => ReactNode;
  /** Mini chart + brush handles rendered below the main chart when `enabled`. */
  brushStrip?: (layout: ChartBrushLayoutState) => ReactNode;
}

function createXAccessor(xDataKey: string) {
  return (d: Record<string, unknown>): Date => {
    const value = d[xDataKey];
    return value instanceof Date ? value : new Date(value as string | number);
  };
}

export const ChartBrushLayout = memo(function ChartBrushLayout({
  data,
  xDataKey = "date",
  xExtentMax,
  enabled,
  height,
  fitMainContent = false,
  className,
  selection,
  onSelectionChange,
  children,
  brushStrip,
}: ChartBrushLayoutProps) {
  const xAccessor = useMemo(() => createXAccessor(xDataKey), [xDataKey]);
  const fullExtent = useMemo(
    () => resolveBrushTrackXExtent(data, xAccessor, xExtentMax),
    [data, xAccessor, xExtentMax]
  );
  const [localSelection, setLocalSelection] =
    useState<ChartBrushSelection | null>(null);
  const brushSelection = selection === undefined ? localSelection : selection;

  useEffect(() => {
    if (!fullExtent) {
      setLocalSelection(null);
      return;
    }
    setLocalSelection({ start: fullExtent[0], end: fullExtent[1] });
  }, [fullExtent]);

  const handleBrushSelectionChange = useCallback(
    (selection: ChartBrushSelection | null) => {
      const next = selection ?? (fullExtent ? { start: fullExtent[0], end: fullExtent[1] } : null);
      setLocalSelection(next);
      onSelectionChange?.(next);
    },
    [fullExtent, onSelectionChange]
  );

  const layoutState = useMemo<ChartBrushLayoutState>(
    () => ({
      xDomain:
        enabled && brushSelection
          ? ([brushSelection.start, brushSelection.end] as [Date, Date])
          : undefined,
      xDomainSlotCount: enabled ? data.length : undefined,
      brushSelection,
      onBrushSelectionChange: handleBrushSelectionChange,
    }),
    [brushSelection, data.length, enabled, handleBrushSelectionChange]
  );

  return (
    <div
      className={cn(
        "flex size-full min-h-0 min-w-0 flex-col",
        fitMainContent ? "justify-start gap-1" : "gap-3",
        className
      )}
    >
      <div
        className={cn(
          "min-h-0 min-w-0",
          fitMainContent ? "shrink-0" : "flex-1"
        )}
      >
        {children(layoutState)}
      </div>
      {enabled && brushStrip ? (
        <div className="min-h-0 shrink-0" style={{ height }}>
          {brushStrip(layoutState)}
        </div>
      ) : null}
    </div>
  );
});
