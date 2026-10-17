// Adapted from the local shadcn-ui/ui@3ba91b1 Alert (MIT); see registry/alert.json.
import { Children, forwardRef, type ComponentPropsWithoutRef, type MouseEventHandler, type ReactElement } from "react";
import { useDensity } from "@rain-next/foundations";
import { InfoFilledIcon } from "../icons/info-filled";
import { CircleCheckFilledIcon } from "../icons/circle-check-filled";
import { AlertFilledIcon } from "../icons/alert-filled";
import { CircleCloseFilledIcon } from "../icons/circle-close-filled";
import { CloseIcon } from "../icons/close";
import { IconButton } from "../icon-button/icon-button";
import { defineRainLocalRecipe, getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import "./alert.css";

export type AlertTone = "info" | "success" | "warning" | "error";
export type AlertPart = "root";
export type AlertLocalRecipe = RainLocalRecipe<AlertPart, "ui-alert">;
export interface AlertProps extends ComponentPropsWithoutRef<"div"> {
  tone?: AlertTone;
  presentation?: "page" | "banner";
  icon?: ReactElement | false;
  /** Request only: the host owns visibility, cancellation and focus after removal. */
  onClose?: MouseEventHandler<HTMLButtonElement>;
  closeLabel?: string;
  localRecipe?: AlertLocalRecipe;
}
const toneIcons = { info: InfoFilledIcon, success: CircleCheckFilledIcon, warning: AlertFilledIcon, error: CircleCloseFilledIcon };

/** Explicit short-message A recipe; pair with icon={false}. Density never selects it. */
export const alertClassicShortRecipe = defineRainLocalRecipe<AlertPart, "ui-alert">({
  id: "alert-classic-short", scope: "feature", origin: "ui-alert", classes: { root: "rain-alert--classic-short" },
  modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
});

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert({
  tone = "info", presentation = "page", icon, onClose, closeLabel = "关闭提示", localRecipe, className, children, ...props
}, ref) {
  const density = useDensity();
  if (!Object.hasOwn(toneIcons, tone) || !["page", "banner"].includes(presentation)) throw new Error("Alert requires a valid tone and presentation.");
  const StatusIcon = toneIcons[tone];
  const hasStructuredContent = Children.toArray(children).some(child => typeof child !== "string" && typeof child !== "number");
  const showIcon = icon !== false && (icon !== undefined || hasStructuredContent);
  return <div {...props} ref={ref} data-rain-id="ui-alert" data-slot="root" data-tone={tone}
    data-presentation={presentation} data-density={density} data-local-recipe={localRecipe?.id}
    data-has-icon={showIcon} data-closable={Boolean(onClose)}
    className={rainCn("rain-alert relative flex w-full min-w-0 items-start gap-rain-8 font-rain-ui text-rain-size-14 leading-rain-22 font-rain-regular", className, getRainLocalRecipePart(localRecipe, "root"))}>
    {showIcon && <span data-slot="icon" data-icon-variant="filled" className="rain-alert__icon flex-none" aria-hidden="true">{icon ?? <StatusIcon size={16} />}</span>}
    <div data-slot="content" className="rain-alert__content min-w-0 flex-1">{children}</div>
    {onClose && <IconButton className="rain-alert__close" size="24/14" icon={<CloseIcon />} aria-label={closeLabel} onClick={onClose} />}
  </div>;
});

export const AlertTitle = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(function AlertTitle({ className, ...props }, ref) {
  return <div {...props} ref={ref} data-slot="title" className={rainCn("rain-alert__title m-rain-0 min-w-0 font-rain-semibold", className)} />;
});
export const AlertDescription = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(function AlertDescription({ className, ...props }, ref) {
  return <div {...props} ref={ref} data-slot="description" className={rainCn("rain-alert__description min-w-0 leading-rain-24", className)} />;
});
export const AlertActions = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(function AlertActions({ className, ...props }, ref) {
  return <div {...props} ref={ref} data-slot="actions" className={rainCn("rain-alert__actions flex min-w-0 flex-wrap items-center gap-rain-8", className)} />;
});
