import { forwardRef, type ReactNode } from "react";
import { useDensity } from "@rain-next/foundations";
import { CheckboxControl, type CheckboxProps } from "../checkbox/checkbox";
import { RadioControl, type RadioProps } from "../radio/radio";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";

export type SelectionCardPart = "root" | "selection" | "content" | "summary" | "label" | "description" | "supplementary" | "actions";
export type SelectionCardRecipe = RainLocalRecipe<SelectionCardPart, "ui-checkbox-card" | "ui-radio-card">;
interface CardContentProps {
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
type CardProps<Base> = Base extends unknown ? Omit<Base, "label" | "className" | "localRecipe"> & CardContentProps : never;
export type CheckboxCardProps = CardProps<CheckboxProps>;
export type RadioCardProps = CardProps<RadioProps>;

function CardContent({ label, description, labelId, descriptionId, leadingVisual, trailingVisual, labelEnd, children, localRecipe }: CardContentProps & { labelId: string; descriptionId: string }) {
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

export const CheckboxCard = forwardRef<HTMLInputElement, CheckboxCardProps>(function CheckboxCard({
  children, leadingVisual, trailingVisual, labelEnd, actions, className, localRecipe, ...props
}, ref) {
  const density = useDensity();
  return <div data-rain-id="ui-checkbox-card" data-slot="root" data-density={density} data-local-recipe={localRecipe?.id}
    className={rainCn("rain-selection-card", className, getRainLocalRecipePart(localRecipe, "root"))}>
    <CheckboxControl {...props} ref={ref} className={rainCn("rain-selection-card__selection w-full", getRainLocalRecipePart(localRecipe, "selection"))}
      renderContent={(ids) => <CardContent {...props} {...ids} {...{ children, leadingVisual, trailingVisual, labelEnd, localRecipe }} />} />
    {actions && <div data-slot="actions" className={rainCn("rain-selection-card__actions", getRainLocalRecipePart(localRecipe, "actions"))}>{actions}</div>}
  </div>;
});
CheckboxCard.displayName = "CheckboxCard";

export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(function RadioCard({
  children, leadingVisual, trailingVisual, labelEnd, actions, className, localRecipe, ...props
}, ref) {
  const density = useDensity();
  return <div data-rain-id="ui-radio-card" data-slot="root" data-density={density} data-local-recipe={localRecipe?.id}
    className={rainCn("rain-selection-card", className, getRainLocalRecipePart(localRecipe, "root"))}>
    <RadioControl {...props} ref={ref} className={rainCn("rain-selection-card__selection w-full", getRainLocalRecipePart(localRecipe, "selection"))}
      renderContent={(ids) => <CardContent {...props} {...ids} {...{ children, leadingVisual, trailingVisual, labelEnd, localRecipe }} />} />
    {actions && <div data-slot="actions" className={rainCn("rain-selection-card__actions", getRainLocalRecipePart(localRecipe, "actions"))}>{actions}</div>}
  </div>;
});
RadioCard.displayName = "RadioCard";
