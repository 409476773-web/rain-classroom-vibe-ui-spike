import { forwardRef } from "react";
import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import { PopupProvider, popupSurfaceClassName, usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import { rainCn } from "../utils/rain-class-names";

function Root<Payload = unknown>({ onOpenChange, ...props }: BasePreviewCard.Root.Props<Payload>) {
  return <PopupProvider triggerId={props.triggerId} defaultTriggerId={props.defaultTriggerId}>{setAnchor => <BasePreviewCard.Root<Payload> {...props} onOpenChange={(open, details) => {
    onOpenChange?.(open, details);
    if (open && !details.isCanceled && details.trigger instanceof HTMLElement) setAnchor(details.trigger);
  }} />}</PopupProvider>;
}
const Portal = BasePreviewCard.Portal;
export type HoverCardRootProps = BasePreviewCard.Root.Props;
export type HoverCardTriggerProps = Omit<BasePreviewCard.Trigger.Props, "className"> & { className?: string };
export type HoverCardPopupProps = Omit<BasePreviewCard.Popup.Props, "className"> & { className?: string };

const Trigger = forwardRef<HTMLAnchorElement, HoverCardTriggerProps>(function Trigger({ className, ...props }, ref) {
  return <BasePreviewCard.Trigger {...props} ref={usePopupTriggerRef(ref)} data-rain-id="ui-hover-card" data-slot="trigger" data-focus="control"
    className={rainCn("text-rain-category-text-brand-1 underline-offset-2 hover:underline focus-visible:outline-rain-focus focus-visible:outline-offset-rain-focus", className)} />;
});

const Positioner = forwardRef<HTMLDivElement, Omit<BasePreviewCard.Positioner.Props, "className"> & { className?: string }>(function Positioner({ className, style, ...props }, ref) {
  const { theme, density, densityStyle } = usePopupScope();
  return <BasePreviewCard.Positioner {...props} ref={ref} sideOffset={8} collisionPadding={8} data-rain-theme={theme} data-density={density} style={state => ({ ...densityStyle, ...(typeof style === "function" ? style(state) : style) })} className={rainCn("rain-popup-positioner", className)} />;
});

const Popup = forwardRef<HTMLDivElement, HoverCardPopupProps>(function Popup({ className, ...props }, ref) {
  return <BasePreviewCard.Popup {...props} ref={ref} data-rain-id="ui-hover-card" data-slot="popup" className={rainCn(popupSurfaceClassName, "rain-hover-card p-rain-16 text-rain-size-14 text-rain-category-text-neutral-1", className)} />;
});

export const HoverCard = { Root, Trigger, Portal, Positioner, Popup, Arrow: BasePreviewCard.Arrow };
