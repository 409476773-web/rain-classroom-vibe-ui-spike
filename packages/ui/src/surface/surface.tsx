import { forwardRef, type HTMLAttributes } from "react";

export type SurfaceVariant = "page" | "panel" | "raised";
export type SurfaceElement = "div" | "main" | "section" | "article" | "aside";

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: SurfaceElement;
  variant?: SurfaceVariant;
}

function mergeClassNames(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(" ");
}

export const Surface = forwardRef<HTMLElement, SurfaceProps>(function Surface(
  { as: Component = "div", className, variant = "panel", ...nativeProps },
  ref,
) {
  return (
    <Component
      {...nativeProps}
      ref={ref as never}
      className={mergeClassNames("rain-surface", className)}
      data-rain-id="ui-surface"
      data-slot="root"
      data-variant={variant}
    />
  );
});

Surface.displayName = "Surface";
