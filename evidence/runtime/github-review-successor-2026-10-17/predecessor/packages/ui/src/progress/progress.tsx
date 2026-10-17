"use client";

// Adapted from shadcn/ui@3ba91b1 (MIT); pristine source and license: evidence/runtime/g4-components-2026-10-11/upstream.
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { useDensity } from "@rain-next/foundations";
import { rainCn } from "../utils/rain-class-names";
import "./progress.css";

export const progressPaints = {
  root: "text-rain-category-text-neutral-1",
  value: "text-rain-category-text-neutral-2",
  track: "bg-rain-category-fill-neutral-solid-4",
  indicator: "bg-rain-category-fill-brand-solid-2",
} as const;

export type ProgressProps = ProgressPrimitive.Root.Props;
export type ProgressTrackProps = ProgressPrimitive.Track.Props;
export type ProgressIndicatorProps = ProgressPrimitive.Indicator.Props;
export type ProgressLabelProps = ProgressPrimitive.Label.Props;
export type ProgressValueProps = ProgressPrimitive.Value.Props;

export function Progress({ className, children, value, min = 0, max = 100, ...props }: ProgressProps) {
  const density = useDensity();
  if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) {
    throw new RangeError("Progress requires finite min and max with min < max.");
  }
  const state = value === null || !Number.isFinite(value) ? "indeterminate" : value >= max ? "complete" : "progressing";
  return <ProgressPrimitive.Root {...props} value={value} min={min} max={max}
    data-rain-id="ui-progress" data-slot="root" data-density={density} data-state={state}
    className={(status) => rainCn("rain-progress flex w-full min-w-0 flex-wrap items-center gap-rain-8 font-rain-ui text-rain-size-14 leading-rain-22 font-rain-regular", progressPaints.root,
      typeof className === "function" ? className(status) : className)}>
    {children}<ProgressTrack><ProgressIndicator /></ProgressTrack>
  </ProgressPrimitive.Root>;
}

export function ProgressTrack({ className, ...props }: ProgressTrackProps) {
  return <ProgressPrimitive.Track {...props} data-slot="progress-track"
    className={(state) => rainCn("rain-progress-track relative w-full basis-full shrink-0 overflow-hidden rounded-rain-full", progressPaints.track,
      typeof className === "function" ? className(state) : className)} />;
}

export function ProgressIndicator({ className, ...props }: ProgressIndicatorProps) {
  return <ProgressPrimitive.Indicator {...props} data-slot="progress-indicator"
    className={(state) => rainCn("rain-progress-indicator h-full rounded-rain-full", progressPaints.indicator,
      typeof className === "function" ? className(state) : className)} />;
}

export function ProgressLabel({ className, ...props }: ProgressLabelProps) {
  return <ProgressPrimitive.Label {...props} data-slot="progress-label"
    className={(state) => rainCn("rain-progress-label min-w-0 flex-1 wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}

export function ProgressValue({ className, ...props }: ProgressValueProps) {
  return <ProgressPrimitive.Value {...props} data-slot="progress-value"
    className={(state) => rainCn("rain-progress-value ms-auto shrink-0 tabular-nums", progressPaints.value,
      typeof className === "function" ? className(state) : className)} />;
}
