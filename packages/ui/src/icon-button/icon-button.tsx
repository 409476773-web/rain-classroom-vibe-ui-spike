import {
  forwardRef, isValidElement,
  type ButtonHTMLAttributes, type ReactElement, type SyntheticEvent,
} from "react";
import { useDensity } from "@rain-next/foundations";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import {
  iconButtonRootRecipe, iconButtonSizeClasses, iconButtonSizes,
  type IconButtonHighlight, type IconButtonPart, type IconButtonSize,
} from "./icon-button.styles";

export { iconButtonSizes } from "./icon-button.styles";
export type { IconButtonHighlight, IconButtonPart, IconButtonSize, IconButtonTone } from "./icon-button.styles";

type AccessibleName =
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: string; "aria-labelledby": string };

interface IconButtonSharedProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "dangerouslySetInnerHTML" | "aria-label" | "aria-labelledby"> {
  /** Exactly one current icon from the formal library; the host selects its asset. */
  icon: ReactElement;
  size?: IconButtonSize;
  loading?: boolean;
  /** Layout-only. Visual changes use a named, feature-scoped Local Recipe. */
  className?: string;
  localRecipe?: RainLocalRecipe<IconButtonPart, "ui-icon-button">;
  /** Preserve a composed Trigger's state; this component uses data-rain-state internally. */
  "data-state"?: string;
}

export type IconButtonProps = IconButtonSharedProps & AccessibleName & (
  | { tone?: "default"; highlight?: IconButtonHighlight }
  | { tone: "danger"; highlight?: "none" }
);

function stopActivation(event: SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon, size, tone = "default", highlight = "none", loading = false, disabled = false,
    localRecipe, className, type = "button",
    "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy,
    "aria-busy": ariaBusy, "aria-disabled": ariaDisabled, "data-state": composedState,
    onClick, onClickCapture, onPointerDownCapture, onPointerUpCapture, onKeyDownCapture, onKeyUpCapture,
    ...nativeProps
  }, ref,
) {
  const density = useDensity();
  const resolvedSize = size ?? (density === "compact" ? "32/18" : "36/20");
  if (!(typeof ariaLabel === "string" && ariaLabel.trim()) && !(typeof ariaLabelledBy === "string" && ariaLabelledBy.trim())) {
    throw new Error("IconButton requires a non-empty aria-label or aria-labelledby.");
  }
  if (!isValidElement(icon)) throw new Error("IconButton requires one current icon element.");
  if (!Object.hasOwn(iconButtonSizes, resolvedSize)) throw new Error("IconButton requires an approved complete size recipe.");
  if ((tone !== "default" && tone !== "danger") || !["none", "icon", "surface"].includes(highlight) || (tone === "danger" && highlight !== "none")) {
    throw new Error("IconButton danger supports highlight=none only; other tones/highlights must be approved recipes.");
  }
  const unavailable = disabled || ariaDisabled === true || ariaDisabled === "true";
  const state = unavailable ? "disabled" : loading ? "loading" : "default";
  const blocked = unavailable || loading;
  const activationKeys = nativeProps["aria-haspopup"] && nativeProps["aria-haspopup"] !== "false"
    ? ["Enter", " ", "ArrowDown", "ArrowUp"] : ["Enter", " "];
  const dimensions = iconButtonSizeClasses(resolvedSize);
  const part = loading ? "loading-indicator" : "icon";

  return (
    <button
      {...nativeProps}
      ref={ref}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-busy={loading ? true : ariaBusy}
      aria-disabled={blocked ? true : ariaDisabled}
      className={rainCn(iconButtonRootRecipe({ tone, highlight, state }), dimensions.root, className, getRainLocalRecipePart(localRecipe, "root"))}
      data-rain-id="ui-icon-button"
      data-slot="root"
      data-variant="fill"
      data-size={resolvedSize}
      data-density={density}
      data-tone={tone}
      data-highlight={highlight}
      data-state={composedState ?? state}
      data-rain-state={state}
      data-feedback={blocked ? "blocked" : "interactive"}
      data-focus="control"
      data-local-recipe={localRecipe?.id}
      onClickCapture={(event) => blocked ? stopActivation(event) : onClickCapture?.(event)}
      onPointerDownCapture={(event) => blocked ? stopActivation(event) : onPointerDownCapture?.(event)}
      onPointerUpCapture={(event) => blocked ? stopActivation(event) : onPointerUpCapture?.(event)}
      onKeyDownCapture={(event) => blocked && activationKeys.includes(event.key) ? stopActivation(event) : onKeyDownCapture?.(event)}
      onKeyUpCapture={(event) => blocked && activationKeys.includes(event.key) ? stopActivation(event) : onKeyUpCapture?.(event)}
      onClick={(event) => {
        if (blocked) return stopActivation(event);
        if (!event.defaultPrevented) onClick?.(event);
      }}
    >
      <span
        aria-hidden="true"
        data-slot={part}
        className={rainCn("inline-flex flex-none items-center justify-center [&>.rain-icon]:size-full", dimensions.icon, getRainLocalRecipePart(localRecipe, part))}
      >
        {loading ? null : icon}
      </span>
    </button>
  );
});

IconButton.displayName = "IconButton";
