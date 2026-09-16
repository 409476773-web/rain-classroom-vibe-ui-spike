import {
  forwardRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
} from "react";

import {
  densityMetrics,
  useDensity,
  type Density,
} from "@rain-next/foundations";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  density?: Density;
  loading?: boolean;
  variant?: ButtonVariant;
}

function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      "aria-busy": ariaBusy,
      children,
      className,
      density,
      disabled = false,
      loading = false,
      style,
      type = "button",
      variant = "primary",
      ...buttonProps
    },
    ref,
  ) {
    const contextDensity = useDensity();
    const resolvedDensity = density ?? contextDensity;
    const metrics = densityMetrics[resolvedDensity];
    const densityStyle = {
      ...style,
      "--rain-density-control-height": metrics.controlHeight,
      "--rain-density-control-padding-inline": metrics.controlPaddingInline,
      "--rain-density-item-gap": metrics.itemGap,
    } as CSSProperties;
    const state = loading ? "loading" : disabled ? "disabled" : "default";

    return (
      <button
        {...buttonProps}
        ref={ref}
        aria-busy={loading ? true : ariaBusy}
        className={mergeClasses("rain-button", className)}
        data-density={resolvedDensity}
        data-focus={variant === "danger" ? "danger" : "control"}
        data-rain-id="ui-button"
        data-slot="button"
        data-state={state}
        data-variant={variant}
        disabled={disabled || loading}
        style={densityStyle}
        type={type}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
