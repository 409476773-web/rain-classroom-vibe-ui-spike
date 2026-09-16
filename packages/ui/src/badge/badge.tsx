import { forwardRef, type HTMLAttributes } from "react";

import { useDensity, type Density } from "@rain-next/foundations";

export type BadgeVariant =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  density?: Density;
  variant?: BadgeVariant;
}

function mergeClassName(baseClassName: string, className?: string) {
  return className ? `${baseClassName} ${className}` : baseClassName;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    className,
    density: densityOverride,
    variant = "neutral",
    ...nativeProps
  },
  ref,
) {
  const inheritedDensity = useDensity();
  const density = densityOverride ?? inheritedDensity;

  return (
    <span
      {...nativeProps}
      ref={ref}
      className={mergeClassName("rain-badge", className)}
      data-density={density}
      data-rain-id="ui-badge"
      data-slot="badge"
      data-state="static"
      data-variant={variant}
    />
  );
});
