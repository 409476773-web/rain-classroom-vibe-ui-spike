import {
  forwardRef,
  useId,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

import { useDensity } from "@rain-next/foundations";

export type LinkAppearance = "standalone" | "inline";

export interface LinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "href" | "role"
> {
  appearance?: LinkAppearance;
  children: ReactNode;
  href: string;
  disabled?: never;
  loading?: never;
  role?: never;
  tone?: never;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      appearance = "standalone",
      children,
      className,
      href,
      rel,
      target,
      ...nativeProps
    },
    ref,
  ) {
    const density = useDensity();
    const newTabHintId = useId();
    const opensNewTab = target?.toLowerCase() === "_blank";
    const hasCustomName = Boolean(ariaLabel?.trim() || ariaLabelledBy?.trim());
    const resolvedDescription = opensNewTab && hasCustomName
      ? [ariaDescribedBy, newTabHintId].filter(Boolean).join(" ")
      : ariaDescribedBy;
    const resolvedRel = opensNewTab
      ? [...new Set([
          ...(rel?.split(/\s+/).filter(Boolean) ?? []),
          "noopener",
          "noreferrer",
        ])].join(" ")
      : rel;

    return (
      <a
        {...nativeProps}
        ref={ref}
        aria-describedby={resolvedDescription}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={["rain-link", className].filter(Boolean).join(" ")}
        data-density={density}
        data-focus="item"
        data-rain-id="ui-link"
        data-slot="root"
        data-state="default"
        data-variant={appearance}
        href={href}
        rel={resolvedRel}
        target={target}
      >
        <span data-slot="label">{children}</span>
        {opensNewTab ? (
          <span data-slot="new-tab-hint" id={newTabHintId}>（新标签页打开）</span>
        ) : null}
      </a>
    );
  },
);

Link.displayName = "Link";
