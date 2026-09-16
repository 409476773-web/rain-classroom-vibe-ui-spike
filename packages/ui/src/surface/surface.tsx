import { forwardRef, type HTMLAttributes } from "react";

export type SurfaceVariant = "page" | "panel" | "raised";
export type SurfaceElement = "div" | "main" | "section" | "article" | "aside";

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: SurfaceElement;
  variant?: SurfaceVariant;
}

function mergeClassName(baseClassName: string, className?: string) {
  return className ? `${baseClassName} ${className}` : baseClassName;
}

export const Surface = forwardRef<HTMLElement, SurfaceProps>(function Surface(
  {
    as: Component = "div",
    className,
    variant = "panel",
    ...nativeProps
  },
  ref,
) {
  return (
    <Component
      {...nativeProps}
      ref={ref as never}
      className={mergeClassName("rain-surface", className)}
      data-rain-id="ui-surface"
      data-slot="surface"
      data-variant={variant}
    />
  );
});
