import { forwardRef, type HTMLAttributes } from "react";

export type CardVariant = "panel" | "raised";

function mergeClassNames(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(" ");
}

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
}

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { className, variant = "panel", ...nativeProps },
  ref,
) {
  return (
    <article
      {...nativeProps}
      ref={ref}
      className={mergeClassNames("rain-card", className)}
      data-rain-id="ui-card"
      data-slot="root"
      data-variant={variant}
    />
  );
});

Card.displayName = "Card";

function createCardPart(slot: string, className: string) {
  const Part = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardPart(
    { className: customClassName, ...nativeProps },
    ref,
  ) {
    return (
      <div
        {...nativeProps}
        ref={ref}
        className={mergeClassNames(className, customClassName)}
        data-slot={slot}
      />
    );
  });
  Part.displayName = `Card${slot.charAt(0).toUpperCase()}${slot.slice(1)}`;
  return Part;
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export const CardHeader = createCardPart(
  "header",
  "rain-card__header",
);

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(function CardDescription({ className, ...nativeProps }, ref) {
  return (
    <p
      {...nativeProps}
      ref={ref}
      className={mergeClassNames("rain-card__description", className)}
      data-slot="description"
    />
  );
});
CardDescription.displayName = "CardDescription";

export type CardActionProps = HTMLAttributes<HTMLDivElement>;
export const CardAction = createCardPart(
  "action",
  "rain-card__action",
);

export type CardContentProps = HTMLAttributes<HTMLDivElement>;
export const CardContent = createCardPart(
  "content",
  "rain-card__content",
);

export type CardFooterProps = HTMLAttributes<HTMLElement>;
export const CardFooter = forwardRef<HTMLElement, CardFooterProps>(
  function CardFooter({ className, ...nativeProps }, ref) {
    return (
      <footer
        {...nativeProps}
        ref={ref}
        className={mergeClassNames("rain-card__footer", className)}
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
        className={mergeClassNames("rain-card__title", className)}
        data-slot="title"
      />
    );
  },
);
CardTitle.displayName = "CardTitle";
