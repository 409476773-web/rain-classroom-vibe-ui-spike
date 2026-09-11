import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { useDensity } from "@rain-next/foundations";

export type BadgeType = "dot" | "count" | "label";
export type BadgeTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "processing";
export type BadgeSize = "small" | "medium";
export type BadgePlacement =
  | "top-end"
  | "bottom-end"
  | "inline-end"
  | "standalone";

const placementsByType: Record<BadgeType, readonly BadgePlacement[]> = {
  dot: ["top-end", "bottom-end", "inline-end"],
  count: ["top-end", "inline-end", "standalone"],
  label: ["top-end", "inline-end", "standalone"],
};

export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: ReactNode;
  count?: number;
  label?: string;
  max?: number;
  placement?: BadgePlacement;
  showZero?: boolean;
  size?: BadgeSize;
  tone?: BadgeTone;
  type?: BadgeType;
}

function mergeClassNames(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(" ");
}

function validCount(value: number) {
  return Number.isInteger(value) && value >= 0;
}

function validMax(value: number) {
  return Number.isInteger(value) && value >= 1;
}

function validLabel(value: string) {
  return /^(?:[A-Z]{1,4}|[\u3400-\u9fff]{1,2})$/u.test(value);
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    children,
    className,
    count = 0,
    label = "NEW",
    max = 99,
    placement = "top-end",
    showZero = false,
    size = "medium",
    tone = "neutral",
    type = "dot",
    ...nativeProps
  },
  ref,
) {
  const density = useDensity();
  const resolvedPlacement = placementsByType[type].includes(placement)
    ? placement
    : "top-end";
  const countIsValid = validCount(count) && validMax(max);
  const labelIsValid = validLabel(label);
  const invalid =
    (type === "count" && !countIsValid) ||
    (type === "label" && !labelIsValid);
  const countText =
    type === "count" && countIsValid && (count > 0 || showZero)
      ? count > max
        ? `${max}+`
        : String(count)
      : null;
  const indicatorText =
    type === "count" ? countText : type === "label" && labelIsValid ? label : null;
  const showIndicator = !invalid && (type === "dot" || indicatorText !== null);
  const state = invalid ? "invalid" : showIndicator ? "visible" : "hidden";

  return (
    <span
      {...nativeProps}
      ref={ref}
      className={mergeClassNames("rain-badge", className)}
      data-density={density}
      data-placement={resolvedPlacement}
      data-rain-id="ui-badge"
      data-size={size}
      data-slot="root"
      data-state={state}
      data-tone={tone}
      data-type={type}
    >
      {children !== undefined && resolvedPlacement !== "standalone" ? (
        <span data-slot="content">{children}</span>
      ) : null}
      {showIndicator ? (
        <span
          aria-hidden={resolvedPlacement === "standalone" ? undefined : true}
          className="rain-badge__indicator"
          data-slot="indicator"
        >
          {indicatorText !== null ? (
            <span data-slot="indicator-text">{indicatorText}</span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
});

Badge.displayName = "Badge";
