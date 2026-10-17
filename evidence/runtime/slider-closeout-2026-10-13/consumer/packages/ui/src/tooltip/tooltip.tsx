import { Children, cloneElement, Fragment, forwardRef, useId, useState, type ReactElement, type Ref } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { PopupProvider, usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import "../dropdown-menu/dropdown-menu.css";
import "./tooltip.css";

export type TooltipPlacement = "top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end";
export interface TooltipProps {
  text: string;
  children: ReactElement<{ "aria-describedby"?: string }>;
  placement?: TooltipPlacement;
  showArrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  openDelay?: number;
  closeDelay?: number;
  portal?: boolean;
  portalTarget?: HTMLElement | null | (() => HTMLElement | null);
  onOpenChange?: BaseTooltip.Root.Props["onOpenChange"];
}

// Retains the existing Base UI behavior; the Classic contract owns text and visual defaults.
function TooltipBody({ text, children, placement = "bottom", showArrow = true, open, defaultOpen = false,
  disabled = false, openDelay = 100, closeDelay = 100, portal = false, portalTarget, onOpenChange,
  triggerRef,
}: TooltipProps & { triggerRef: Ref<HTMLElement> }) {
  const id = useId(), anchorRef = usePopupTriggerRef(triggerRef);
  const [localContainer, setLocalContainer] = useState<HTMLSpanElement | null>(null);
  const { theme, density, densityStyle } = usePopupScope();
  const trigger = Children.only(children);
  if (trigger.type === Fragment) throw new Error("Tooltip requires one real, focusable trigger element.");
  if (typeof text !== "string") throw new Error("Tooltip text must be a plain string; use Popover for rich content.");
  if (![openDelay, closeDelay].every(value => Number.isFinite(value) && value >= 0)) throw new Error("Tooltip delays must be finite non-negative numbers.");
  const unavailable = disabled || !text.trim();
  const describedBy = [trigger.props["aria-describedby"], !unavailable && id].filter(Boolean).join(" ") || undefined;
  const [side, align = "center"] = placement.split("-") as ["top" | "right" | "bottom" | "left", "start" | "center" | "end"];
  const content = <BaseTooltip.Positioner side={side} align={align} sideOffset={4 + (showArrow ? 6 : 0)} collisionPadding={8}
    data-rain-theme={theme} data-density={density} style={densityStyle} className="rain-popup-positioner">
    <BaseTooltip.Popup id={id} role="tooltip" data-rain-id="ui-tooltip" data-slot="content" className="rain-tooltip">
      {text}
      {showArrow && <BaseTooltip.Arrow className="rain-tooltip-arrow" data-slot="arrow" aria-hidden="true"
        style={({ side, align }) => align === "center" ? undefined :
          side === "top" || side === "bottom"
            ? { left: align === "start" ? "var(--rain-space-16)" : "auto", right: align === "end" ? "var(--rain-space-16)" : "auto" }
            : { top: align === "start" ? "var(--rain-tooltip-padding-block)" : "auto", bottom: align === "end" ? "var(--rain-tooltip-padding-block)" : "auto" }} />}
    </BaseTooltip.Popup>
  </BaseTooltip.Positioner>;
  return <BaseTooltip.Root open={open} defaultOpen={defaultOpen && !unavailable}
    disabled={unavailable} onOpenChange={onOpenChange}>
    <BaseTooltip.Trigger render={cloneElement(trigger, { "aria-describedby": describedBy })}
      ref={anchorRef} delay={openDelay} closeDelay={closeDelay} aria-describedby={describedBy} />
    {!portal && <span ref={setLocalContainer} className="rain-tooltip-mount" />}
    {!unavailable && (portal || localContainer) && <BaseTooltip.Portal
      className={!portal ? "rain-tooltip-mount" : undefined}
      container={portal ? (typeof portalTarget === "function" ? portalTarget() : portalTarget) ?? undefined : localContainer}>{content}</BaseTooltip.Portal>}
  </BaseTooltip.Root>;
}

export const Tooltip = forwardRef<HTMLElement, TooltipProps>(function Tooltip(props, ref) {
  return <PopupProvider><TooltipBody {...props} triggerRef={ref} /></PopupProvider>;
});
