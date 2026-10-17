import { forwardRef } from "react";
import { useDensity } from "@rain-next/foundations";
import { CheckboxControl, type CheckboxProps } from "../checkbox/checkbox";
import { RadioControl, type RadioProps } from "../radio/radio";
import { getRainLocalRecipePart } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { CardContent, CardSurface, type CardContentProps } from "./selection-card.parts";

export type { SelectionCardPart, SelectionCardRecipe } from "./selection-card.parts";
type CardProps<Base> = Base extends unknown ? Omit<Base, "label" | "className" | "localRecipe"> & CardContentProps : never;
export type CheckboxCardProps = CardProps<CheckboxProps>;
export type RadioCardProps = CardProps<RadioProps>;

export const CheckboxCard = forwardRef<HTMLInputElement, CheckboxCardProps>(function CheckboxCard({
  children, leadingVisual, trailingVisual, labelEnd, actions, className, localRecipe, ...props
}, ref) {
  const density = useDensity();
  return <CardSurface data-rain-id="ui-checkbox-card" data-slot="root" data-density={density} data-local-recipe={localRecipe?.id}
    className={rainCn(className, getRainLocalRecipePart(localRecipe, "root"))} actions={actions} actionsClassName={getRainLocalRecipePart(localRecipe, "actions")}>
    <CheckboxControl {...props} ref={ref} className={rainCn("rain-selection-card__selection w-full", getRainLocalRecipePart(localRecipe, "selection"))}
      renderContent={(ids) => <CardContent {...props} {...ids} {...{ children, leadingVisual, trailingVisual, labelEnd, localRecipe }} />} />
  </CardSurface>;
});
CheckboxCard.displayName = "CheckboxCard";

export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(function RadioCard({
  children, leadingVisual, trailingVisual, labelEnd, actions, className, localRecipe, ...props
}, ref) {
  const density = useDensity();
  return <CardSurface data-rain-id="ui-radio-card" data-slot="root" data-density={density} data-local-recipe={localRecipe?.id}
    className={rainCn(className, getRainLocalRecipePart(localRecipe, "root"))} actions={actions} actionsClassName={getRainLocalRecipePart(localRecipe, "actions")}>
    <RadioControl {...props} ref={ref} className={rainCn("rain-selection-card__selection w-full", getRainLocalRecipePart(localRecipe, "selection"))}
      renderContent={(ids) => <CardContent {...props} {...ids} {...{ children, leadingVisual, trailingVisual, labelEnd, localRecipe }} />} />
  </CardSurface>;
});
RadioCard.displayName = "RadioCard";
