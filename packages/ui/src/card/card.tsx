// Adapted from shadcn-ui/ui Card + Nova; MIT notice in evidence/runtime/card-v2/upstream/LICENSE.md.
import { createContext, forwardRef, useContext, type HTMLAttributes } from "react";
import { type RainLocalRecipe, getRainLocalRecipePart } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { cardClasses, cardPaints, type CardPart } from "./card.styles";
import "./card.css";

export type CardVariant = "panel" | "raised";
export type CardSize = "default" | "sm";
export type CardLocalRecipe = RainLocalRecipe<CardPart, "ui-card">;
export type { CardPart } from "./card.styles";

const CardRecipeContext = createContext<CardLocalRecipe | undefined>(undefined);

function usePartClasses(part: CardPart, className?: string) {
  const recipe = useContext(CardRecipeContext);
  return rainCn(cardClasses[part], part in cardPaints && cardPaints[part as keyof typeof cardPaints], className, getRainLocalRecipePart(recipe, part));
}

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  /** Card insets only; child control density belongs to the outer DensityProvider. */
  size?: CardSize;
  localRecipe?: CardLocalRecipe;
}

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { className, variant = "panel", size = "default", localRecipe, ...nativeProps },
  ref,
) {
  return (
    <CardRecipeContext.Provider value={localRecipe}><article
      {...nativeProps}
      ref={ref}
      className={rainCn(cardClasses.root, cardPaints.root, variant === "raised" && cardPaints.raised, className, getRainLocalRecipePart(localRecipe, "root"))}
      data-rain-id="ui-card"
      data-slot="root"
      data-variant={variant}
      data-size={size}
      data-local-recipe={localRecipe?.id}
    /></CardRecipeContext.Provider>
  );
});

Card.displayName = "Card";

function createCardPart(slot: "header" | "action" | "content") {
  const Part = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardPart(
    { className: customClassName, ...nativeProps },
    ref,
  ) {
    return (
      <div
        {...nativeProps}
        ref={ref}
        className={usePartClasses(slot, customClassName)}
        data-slot={slot}
      />
    );
  });
  Part.displayName = `Card${slot.charAt(0).toUpperCase()}${slot.slice(1)}`;
  return Part;
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export const CardHeader = createCardPart("header");

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(function CardDescription({ className, ...nativeProps }, ref) {
  return (
    <p
      {...nativeProps}
      ref={ref}
      className={usePartClasses("description", className)}
      data-slot="description"
    />
  );
});
CardDescription.displayName = "CardDescription";

export type CardActionProps = HTMLAttributes<HTMLDivElement>;
export const CardAction = createCardPart("action");

export type CardContentProps = HTMLAttributes<HTMLDivElement>;
export const CardContent = createCardPart("content");

export type CardFooterProps = HTMLAttributes<HTMLElement>;
export const CardFooter = forwardRef<HTMLElement, CardFooterProps>(
  function CardFooter({ className, ...nativeProps }, ref) {
    return (
      <footer
        {...nativeProps}
        ref={ref}
        className={usePartClasses("footer", className)}
        data-slot="footer"
      />
    );
  },
);
CardFooter.displayName = "CardFooter";

export type CardTitleElement = "h2" | "h3" | "h4" | "h5" | "h6" | "p";
export interface CardTitleProps extends HTMLAttributes<HTMLElement> {
  as?: CardTitleElement;
}

export const CardTitle = forwardRef<HTMLElement, CardTitleProps>(
  function CardTitle(
    { as: Component = "h3", className, ...nativeProps },
    ref,
  ) {
    return (
      <Component
        {...nativeProps}
        ref={ref as never}
        className={usePartClasses("title", className)}
        data-slot="title"
      />
    );
  },
);
CardTitle.displayName = "CardTitle";
