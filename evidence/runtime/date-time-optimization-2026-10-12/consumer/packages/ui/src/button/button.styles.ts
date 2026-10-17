import { cva } from "class-variance-authority";

import { rainCn } from "../utils/rain-class-names";

export type ButtonStyleVariant = "primary" | "secondary" | "tertiary" | "text";
export type ButtonStyleTone = "default" | "brand" | "danger";
export type ButtonStyleSize =
  | "mini"
  | "small"
  | "medium"
  | "large"
  | "xl"
  | "compact"
  | "regular";
export type ButtonStyleState = "default" | "loading" | "disabled";
export type ButtonStylePart =
  | "root"
  | "leading-icon"
  | "label"
  | "trailing-icon"
  | "loading-indicator";

export interface ButtonRootStyleOptions {
  readonly block: boolean;
  readonly size: ButtonStyleSize;
  readonly state: ButtonStyleState;
  readonly tone: ButtonStyleTone;
  readonly variant: ButtonStyleVariant;
}

export interface ButtonPartStyleOptions {
  readonly hasLeadingIcon?: boolean;
  readonly part: Exclude<ButtonStylePart, "root">;
  readonly size: ButtonStyleSize;
  readonly state: ButtonStyleState;
  readonly variant: ButtonStyleVariant;
  readonly tone?: ButtonStyleTone;
}

const ordinaryVariants: Array<"primary" | "secondary" | "tertiary"> = [
  "primary",
  "secondary",
  "tertiary",
];

const rootVariants = cva(
  [
    "rain-button box-border relative inline-flex flex-none items-center justify-center py-rain-0",
    "overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate",
    "border-solid border-rain-button border-rain-action-ghost bg-rain-action-ghost",
    "text-rain-button-tertiary-text font-rain-button no-underline",
    "transition-rain-button duration-rain-button ease-rain-button motion-reduce:transition-none",
    "focus-rain-button",
    "focus-visible:outline-solid focus-visible:outline-rain-button-focus",
    "focus-visible:outline-rain-button-focus-outline focus-visible:outline-offset-rain-button-focus",
  ].join(" "),
  {
    variants: {
      block: {
        false: null,
        true: "flex w-full",
      },
      size: {
        mini: null,
        small: null,
        medium: null,
        large: null,
        xl: null,
        compact: null,
        regular: null,
      },
      state: {
        default: "cursor-pointer",
        loading: "cursor-progress",
        disabled: "cursor-not-allowed",
      },
      tone: {
        default: null,
        brand: null,
        danger: null,
      },
      variant: {
        primary: "focus-visible:shadow-rain-button-focus-primary",
        secondary:
          "focus-visible:border-rain-button-strong-brand-border focus-visible:shadow-rain-button-focus-rest",
        tertiary:
          "focus-visible:border-rain-button-strong-brand-border focus-visible:shadow-rain-button-focus-rest",
        text: [
          "min-w-rain-button-text-min-width px-rain-button-text-padding-inline",
          "py-rain-button-text-padding-block gap-rain-button-text-gap rounded-rain-button-text",
          "border-rain-button-text font-rain-button-text opacity-rain-button-text-loading",
          "focus-rain-button-text",
          "focus-visible:outline-rain-button-text-focus",
          "focus-visible:outline-rain-button-text-focus-outline",
          "focus-visible:outline-offset-rain-button-text-focus",
          "focus-visible:shadow-rain-button-text-focus",
        ].join(" "),
      },
    },
    compoundVariants: [
      {
        variant: ordinaryVariants,
        size: "mini",
        class: "h-rain-button-mini-height min-w-rain-button-mini-min-width px-rain-button-mini-padding-inline gap-rain-button-gap rounded-rain-button-mini text-rain-button-mini",
      },
      {
        variant: ordinaryVariants,
        size: "small",
        class: "h-rain-button-small-height min-w-rain-button-small-min-width px-rain-button-small-padding-inline gap-rain-button-gap rounded-rain-button-small text-rain-button-small",
      },
      {
        variant: ordinaryVariants,
        size: "medium",
        class: "h-rain-button-medium-height min-w-rain-button-medium-min-width px-rain-button-medium-padding-inline gap-rain-button-gap rounded-rain-button-medium text-rain-button-medium",
      },
      {
        variant: ordinaryVariants,
        size: "large",
        class: "h-rain-button-large-height min-w-rain-button-large-min-width px-rain-button-large-padding-inline gap-rain-button-gap rounded-rain-button-large text-rain-button-large",
      },
      {
        variant: ordinaryVariants,
        size: "xl",
        class: "h-rain-button-xl-height min-w-rain-button-xl-min-width px-rain-button-xl-padding-inline gap-rain-button-gap-xl rounded-rain-button-xl text-rain-button-xl",
      },
      {
        variant: "text",
        size: "small",
        class: "h-rain-button-text-small-height text-rain-button-text-small",
      },
      {
        variant: "text",
        size: "compact",
        class: "h-rain-button-text-compact-height text-rain-button-text-compact",
      },
      {
        variant: "text",
        size: "regular",
        class: "h-rain-button-text-regular-height text-rain-button-text-regular",
      },
      {
        variant: "primary",
        tone: "default",
        class: "text-rain-button-on-color-foreground bg-rain-button-primary border-rain-action-ghost",
      },
      {
        variant: "primary",
        tone: "default",
        state: "default",
        class: "hover:bg-rain-button-primary-hover active:bg-rain-button-primary-pressed active:border-rain-button-strong-brand-border",
      },
      {
        variant: "primary",
        tone: "danger",
        class: "text-rain-button-on-color-foreground bg-rain-button-danger-primary border-rain-action-ghost",
      },
      {
        variant: "primary",
        tone: "danger",
        state: "default",
        class: "hover:bg-rain-button-danger-primary-hover active:bg-rain-button-danger-primary-pressed active:border-rain-button-strong-danger-border",
      },
      {
        variant: "secondary",
        tone: "default",
        class: "text-rain-button-secondary-text bg-rain-button-secondary border-rain-button-secondary-border",
      },
      {
        variant: "secondary",
        tone: "default",
        state: "default",
        class: "hover:bg-rain-button-secondary-hover active:bg-rain-button-secondary-pressed active:border-rain-button-strong-brand-border",
      },
      {
        variant: "secondary",
        tone: "danger",
        class: "text-rain-button-danger-text bg-rain-button-danger-subtle border-rain-button-danger-border",
      },
      {
        variant: "secondary",
        tone: "danger",
        state: "default",
        class: "hover:bg-rain-button-danger-subtle-hover active:bg-rain-button-danger-subtle-pressed",
      },
      {
        variant: "tertiary",
        tone: "default",
        class: "text-rain-button-tertiary-text bg-rain-action-ghost border-rain-button-tertiary-border",
      },
      {
        variant: "tertiary",
        tone: "default",
        state: "default",
        class: "hover:bg-rain-button-tertiary-hover active:bg-rain-button-tertiary-pressed",
      },
      {
        variant: "tertiary",
        tone: "danger",
        class: "text-rain-button-danger-text bg-rain-action-ghost border-rain-button-danger-border",
      },
      {
        variant: "tertiary",
        tone: "danger",
        state: "default",
        class: "hover:bg-rain-button-danger-subtle-hover active:bg-rain-button-danger-subtle-pressed",
      },
      {
        variant: "text",
        tone: "default",
        class: "text-rain-button-text-default bg-rain-action-ghost",
      },
      {
        variant: "text",
        tone: "brand",
        class: "text-rain-button-text-brand bg-rain-action-ghost",
      },
      {
        variant: "text",
        tone: "danger",
        class: "text-rain-button-text-danger bg-rain-action-ghost",
      },
      {
        variant: "text",
        tone: ["default", "brand"],
        state: "default",
        class: "hover:bg-rain-button-text-hover active:bg-rain-button-text-pressed",
      },
      {
        variant: "text",
        tone: "danger",
        state: "default",
        class: "hover:bg-rain-button-text-danger-hover active:bg-rain-button-text-danger-pressed",
      },
      {
        variant: "primary",
        state: "disabled",
        class: "opacity-rain-button-disabled-primary",
      },
      {
        variant: ["secondary", "tertiary"],
        state: "disabled",
        class: "opacity-rain-button-disabled-rest",
      },
      {
        variant: "primary",
        tone: "default",
        state: "loading",
        class: "bg-rain-button-loading-primary-bg",
      },
      {
        variant: "secondary",
        tone: "default",
        state: "loading",
        class: "bg-rain-button-loading-secondary-bg border-rain-button-loading-secondary-border",
      },
      {
        variant: "tertiary",
        tone: "default",
        state: "loading",
        class: "border-rain-button-loading-tertiary-border",
      },
      {
        variant: ["secondary", "tertiary"],
        tone: "danger",
        state: "loading",
        class: "border-rain-button-loading-danger-border",
      },
      {
        variant: "primary",
        tone: "danger",
        state: "loading",
        class: "bg-rain-button-loading-danger-primary-bg",
      },
      {
        variant: "secondary",
        tone: "danger",
        state: "loading",
        class: "bg-rain-button-loading-danger-subtle-bg",
      },
    ],
  },
);

const ordinaryPartSizes = {
  mini: {
    leading: "size-rain-button-mini-leading-icon text-rain-button-mini-leading-icon",
    trailing: "size-rain-button-mini-trailing-icon text-rain-button-mini-trailing-icon",
  },
  small: {
    leading: "size-rain-button-small-leading-icon text-rain-button-small-leading-icon",
    trailing: "size-rain-button-small-trailing-icon text-rain-button-small-trailing-icon",
  },
  medium: {
    leading: "size-rain-button-medium-leading-icon text-rain-button-medium-leading-icon",
    trailing: "size-rain-button-medium-trailing-icon text-rain-button-medium-trailing-icon",
  },
  large: {
    leading: "size-rain-button-large-leading-icon text-rain-button-large-leading-icon",
    trailing: "size-rain-button-large-trailing-icon text-rain-button-large-trailing-icon",
  },
  xl: {
    leading: "size-rain-button-xl-leading-icon text-rain-button-xl-leading-icon",
    trailing: "size-rain-button-xl-trailing-icon text-rain-button-xl-trailing-icon",
  },
} as const;

const textPartSizes = {
  small: {
    leading: "size-rain-button-text-small-leading-icon text-rain-button-text-small-leading-icon",
    trailing: "size-rain-button-text-small-trailing-icon text-rain-button-text-small-trailing-icon",
  },
  compact: {
    leading: "size-rain-button-text-compact-leading-icon text-rain-button-text-compact-leading-icon",
    trailing: "size-rain-button-text-compact-trailing-icon text-rain-button-text-compact-trailing-icon",
  },
  regular: {
    leading: "size-rain-button-text-regular-leading-icon text-rain-button-text-regular-leading-icon",
    trailing: "size-rain-button-text-regular-trailing-icon text-rain-button-text-regular-trailing-icon",
  },
} as const;

function partSizeClasses(
  variant: ButtonStyleVariant,
  size: ButtonStyleSize,
): { readonly leading: string; readonly trailing: string } {
  if (variant === "text") {
    if (size === "small" || size === "compact" || size === "regular") {
      return textPartSizes[size];
    }
  } else if (
    size === "mini" ||
    size === "small" ||
    size === "medium" ||
    size === "large" ||
    size === "xl"
  ) {
    return ordinaryPartSizes[size];
  }

  throw new Error(`Invalid Button variant/size style pair: ${variant}/${size}`);
}

export function buttonRootRecipe(options: ButtonRootStyleOptions): string {
  return rainCn(rootVariants(options));
}

export function buttonPartClassName(options: ButtonPartStyleOptions): string {
  const textDisabled =
    options.variant === "text" && options.state === "disabled"
      ? "opacity-rain-button-text-disabled"
      : undefined;
  const isLabel = options.part === "label";
  const tone = options.tone ?? "default";
  const foreground = options.part === "trailing-icon" && options.hasLeadingIcon
    ? options.variant === "primary" ? tone === "danger" ? "text-rain-button-trailing-danger-on-color-foreground" : "text-rain-button-trailing-on-color-foreground"
      : tone === "danger" ? "text-rain-button-trailing-danger-icon"
        : tone === "brand" || options.variant === "secondary" ? "text-rain-button-trailing-brand-icon"
          : options.variant === "tertiary" ? "text-rain-button-trailing-tertiary-icon" : "text-rain-button-trailing-neutral-icon"
    : options.variant === "primary"
      ? "text-rain-button-on-color-foreground"
      : isLabel && options.variant === "text"
          ? tone === "danger" ? "text-rain-button-text-danger"
            : tone === "brand" ? "text-rain-button-text-brand" : "text-rain-button-text-default"
        : tone === "danger"
          ? isLabel ? "text-rain-button-danger-text" : "text-rain-button-danger-icon"
          : tone === "brand" || options.variant === "secondary"
            ? isLabel ? "text-rain-button-secondary-text" : "text-rain-button-brand-icon"
            : isLabel ? "text-rain-button-tertiary-text" : "text-rain-button-neutral-icon";

  if (options.part === "label") {
    return rainCn(
      "flex-initial min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
      options.variant === "text" &&
        "flex-none overflow-visible text-clip whitespace-nowrap",
      textDisabled,
      foreground,
    );
  }

  const sizes = partSizeClasses(options.variant, options.size);
  return rainCn(
    "inline-flex flex-none items-center justify-center *:w-full *:h-full",
    options.part === "trailing-icon" ? sizes.trailing : sizes.leading,
    textDisabled,
    foreground,
  );
}
