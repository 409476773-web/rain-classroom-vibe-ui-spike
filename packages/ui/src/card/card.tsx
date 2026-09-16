import {
  forwardRef,
  type HTMLAttributes,
} from "react";

function mergeClassName(baseClassName: string, className?: string) {
  return className ? `${baseClassName} ${className}` : baseClassName;
}

export type CardVariant = "panel" | "raised";

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
      className={mergeClassName("rain-card", className)}
      data-rain-id="ui-card"
      data-slot="card"
      data-variant={variant}
    />
  );
});

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ className, ...nativeProps }, ref) {
    return (
      <div
        {...nativeProps}
        ref={ref}
        className={mergeClassName("rain-card-header", className)}
        data-slot="card-header"
      />
    );
  },
);

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle({ className, ...nativeProps }, ref) {
    return (
      <h3
        {...nativeProps}
        ref={ref}
        className={mergeClassName("rain-card-title", className)}
        data-slot="card-title"
      />
    );
  },
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
      className={mergeClassName("rain-card-description", className)}
      data-slot="card-description"
    />
  );
});

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ className, ...nativeProps }, ref) {
    return (
      <div
        {...nativeProps}
        ref={ref}
        className={mergeClassName("rain-card-content", className)}
        data-slot="card-content"
      />
    );
  },
);

export type CardFooterProps = HTMLAttributes<HTMLElement>;

export const CardFooter = forwardRef<HTMLElement, CardFooterProps>(
  function CardFooter({ className, ...nativeProps }, ref) {
    return (
      <footer
        {...nativeProps}
        ref={ref}
        className={mergeClassName("rain-card-footer", className)}
        data-slot="card-footer"
      />
    );
  },
);
