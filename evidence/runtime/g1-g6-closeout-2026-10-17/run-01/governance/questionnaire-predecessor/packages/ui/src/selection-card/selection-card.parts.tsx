import type { ComponentPropsWithRef, ReactNode } from "react";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";

export type SelectionCardPart = "root" | "selection" | "content" | "summary" | "label" | "description" | "supplementary" | "actions";
export type SelectionCardRecipe = RainLocalRecipe<SelectionCardPart, "ui-checkbox-card" | "ui-radio-card">;
export interface CardContentProps {
  label: string;
  description?: string;
  /** Non-interactive phrasing content only; place buttons/links in actions. */
  children?: ReactNode;
  leadingVisual?: ReactNode;
  trailingVisual?: ReactNode;
  labelEnd?: ReactNode;
  /** Independent actions outside the native selection label. */
  actions?: ReactNode;
  className?: string;
  localRecipe?: SelectionCardRecipe;
}

export type CardSurfaceProps =
  | ({ as?: "div"; actions?: ReactNode; actionsClassName?: string } & ComponentPropsWithRef<"div">)
  | ({ as: "label"; actions?: never; actionsClassName?: never } & ComponentPropsWithRef<"label">);

/** A label surface cannot contain the separate interactive action area. */
export function CardSurface(props: CardSurfaceProps) {
  if (props.as === "label") {
    const { as: _as, actions: _actions, actionsClassName: _actionsClassName, className, ...labelProps } = props;
    return <label {...labelProps} className={rainCn("rain-selection-card", className)} />;
  }
  const { as: _as, actions, actionsClassName, className, children, ...divProps } = props;
  return <div {...divProps} className={rainCn("rain-selection-card", className)}>
    {children}
    {actions && <div data-slot="actions" className={rainCn("rain-selection-card__actions", actionsClassName)}>{actions}</div>}
  </div>;
}

export function CardContent({ label, description, labelId, descriptionId, leadingVisual, trailingVisual, labelEnd, children, localRecipe }: CardContentProps & { labelId: string; descriptionId: string }) {
  if (typeof label !== "string" || !label.trim()) throw new Error("Selection card requires a visible non-empty label.");
  return <>
    <span data-slot="content" className={rainCn("rain-selection-card__content flex min-w-rain-0 flex-1 items-start gap-rain-12", getRainLocalRecipePart(localRecipe, "content"))}>
      {leadingVisual && <span data-slot="leading-visual" className="rain-selection-card__identity" aria-hidden="true">{leadingVisual}</span>}
      <span className="rain-selection-card__body flex min-w-rain-0 flex-1 flex-col gap-rain-4">
        <span data-slot="summary" className={rainCn("flex min-w-rain-0 flex-col gap-rain-4", getRainLocalRecipePart(localRecipe, "summary"))}>
          <span className="flex min-w-rain-0 items-start gap-rain-8">
            <span id={labelId} data-slot="label" className={rainCn("min-w-rain-0 flex-1 text-rain-size-15 leading-rain-24 font-rain-semibold", getRainLocalRecipePart(localRecipe, "label"))}>{label}</span>
            {labelEnd && <span data-slot="label-end" className="inline-flex flex-none items-start">{labelEnd}</span>}
          </span>
          {description && <span id={descriptionId} data-slot="description" className={rainCn("text-rain-size-13 leading-rain-22 font-rain-regular", getRainLocalRecipePart(localRecipe, "description"))}>{description}</span>}
        </span>
        {children && <span data-slot="supplementary" className={rainCn("flex min-w-rain-0 flex-col gap-rain-4", getRainLocalRecipePart(localRecipe, "supplementary"))}>{children}</span>}
      </span>
    </span>
    {trailingVisual && <span data-slot="trailing-visual" className="rain-selection-card__identity" aria-hidden="true">{trailingVisual}</span>}
  </>;
}
