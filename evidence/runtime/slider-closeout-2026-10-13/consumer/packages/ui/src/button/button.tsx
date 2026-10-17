import {
  forwardRef,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

import { useDensity } from "@rain-next/foundations";

import {
  getRainLocalRecipePart,
  type RainLocalRecipe,
} from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import {
  buttonPartClassName,
  buttonRootRecipe,
  type ButtonStylePart,
  type ButtonStyleSize,
  type ButtonStyleState,
  type ButtonStyleTone,
  type ButtonStyleVariant,
} from "./button.styles";

export type ButtonVariant = ButtonStyleVariant;
export type ButtonTone = "default" | "danger";
export type ButtonSize = "mini" | "small" | "medium" | "large" | "xl";
export type ButtonTextTone = "default" | "brand" | "danger";
export type ButtonTextSize = "small" | "compact" | "regular";
export type ButtonPart = ButtonStylePart;

interface ButtonSharedProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Layout-only host classes. Visual changes belong in a named Local Recipe. */
  className?: string;
  leadingIcon?: ReactNode;
  localRecipe?: RainLocalRecipe<ButtonPart, "ui-button">;
  loading?: boolean;
  loadingLabel?: ReactNode;
  trailingIcon?: ReactNode;
}

export type ButtonProps = ButtonSharedProps & (
  | {
      block?: boolean;
      size?: ButtonSize;
      tone?: ButtonTone;
      variant?: Exclude<ButtonVariant, "text">;
    }
  | {
      block?: never;
      size?: ButtonTextSize;
      tone?: ButtonTextTone;
      variant: "text";
    }
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      "aria-busy": ariaBusy,
      "aria-disabled": ariaDisabled,
      block = false,
      children,
      className,
      disabled = false,
      leadingIcon,
      localRecipe,
      loading = false,
      loadingLabel,
      onClick,
      size,
      tone = "default",
      trailingIcon,
      type = "button",
      variant = "secondary",
      ...nativeProps
    },
    ref,
  ) {
    const density = useDensity();
    const resolvedSize = size ?? (
      variant === "text"
        ? density === "compact" ? "compact" : "regular"
        : density === "compact" ? "small" : "medium"
    );
    const isTextAriaDisabled = variant === "text"
      && (ariaDisabled === true || ariaDisabled === "true");
    const state = disabled || isTextAriaDisabled
      ? "disabled"
      : loading ? "loading" : "default";
    const styleOptions = {
      tone: tone as ButtonStyleTone,
      size: resolvedSize as ButtonStyleSize,
      state: state as ButtonStyleState,
      variant: variant as ButtonStyleVariant,
    };

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
      if (loading || isTextAriaDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    }

    return (
      <button
        {...nativeProps}
        ref={ref}
        aria-busy={loading ? true : ariaBusy}
        aria-disabled={loading ? true : ariaDisabled}
        className={rainCn(
          buttonRootRecipe({
            ...styleOptions,
            block,
            tone: tone as ButtonStyleTone,
          }),
          className,
          getRainLocalRecipePart(localRecipe, "root"),
        )}
        data-block={block || undefined}
        data-density={density}
        data-focus="control"
        data-local-recipe={localRecipe?.id}
        data-rain-id="ui-button"
        data-size={resolvedSize}
        data-slot="root"
        data-state={state}
        data-tone={tone}
        data-variant={variant}
        disabled={disabled}
        onClick={handleClick}
        type={type}
      >
        {loading ? (
          <span
            aria-hidden="true"
            className={rainCn(
              buttonPartClassName({
                ...styleOptions,
                part: "loading-indicator",
              }),
              getRainLocalRecipePart(localRecipe, "loading-indicator"),
            )}
            data-slot="loading-indicator"
          />
        ) : leadingIcon ? (
          <span
            aria-hidden="true"
            className={rainCn(
              buttonPartClassName({ ...styleOptions, part: "leading-icon" }),
              getRainLocalRecipePart(localRecipe, "leading-icon"),
            )}
            data-slot="leading-icon"
          >
            {leadingIcon}
          </span>
        ) : null}
        <span
          className={rainCn(
            buttonPartClassName({ ...styleOptions, part: "label" }),
            getRainLocalRecipePart(localRecipe, "label"),
          )}
          data-slot="label"
        >
          {loading && loadingLabel !== undefined ? loadingLabel : children}
        </span>
        {!loading && trailingIcon ? (
          <span
            aria-hidden="true"
            className={rainCn(
              buttonPartClassName({ ...styleOptions, part: "trailing-icon", hasLeadingIcon: Boolean(leadingIcon) }),
              getRainLocalRecipePart(localRecipe, "trailing-icon"),
            )}
            data-slot="trailing-icon"
          >
            {trailingIcon}
          </span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = "Button";
