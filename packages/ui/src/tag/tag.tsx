import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { useDensity, type Density } from "@rain-next/foundations";

export type TagVariant = "neutral" | "info";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  density?: Density;
  disabled?: boolean;
  onRemove?: () => void;
  variant?: TagVariant;
}

function mergeClassName(baseClassName: string, className?: string) {
  return className ? `${baseClassName} ${className}` : baseClassName;
}

function getRemoveAccessibleName(children: ReactNode) {
  const label =
    typeof children === "string" || typeof children === "number"
      ? String(children)
      : "";

  return label ? `移除标签 ${label}` : "移除标签";
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    children,
    className,
    density: densityOverride,
    disabled = false,
    onRemove,
    variant = "neutral",
    ...nativeProps
  },
  ref,
) {
  const inheritedDensity = useDensity();
  const density = densityOverride ?? inheritedDensity;
  const state = disabled ? "disabled" : onRemove ? "removable" : "static";

  return (
    <span
      {...nativeProps}
      ref={ref}
      aria-disabled={disabled || undefined}
      className={mergeClassName("rain-tag", className)}
      data-density={density}
      data-rain-id="ui-tag"
      data-slot="tag"
      data-state={state}
      data-variant={variant}
    >
      <span className="rain-tag-label" data-slot="tag-label">
        {children}
      </span>
      {onRemove ? (
        <button
          aria-label={getRemoveAccessibleName(children)}
          className="rain-tag-remove"
          data-focus="control"
          data-slot="remove-action"
          disabled={disabled}
          onClick={() => onRemove()}
          type="button"
        >
          移除
        </button>
      ) : null}
    </span>
  );
});
