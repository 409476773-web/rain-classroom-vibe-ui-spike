import { forwardRef } from "react";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { PopupProvider, popupSurfaceClassName, usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import { menuItemClassName } from "../dropdown-menu/dropdown-menu.styles";
import { rainCn } from "../utils/rain-class-names";

export type ContextMenuRootProps = BaseContextMenu.Root.Props;
export type ContextMenuTriggerProps = Omit<BaseContextMenu.Trigger.Props, "className"> & { className?: string };
export type ContextMenuItemProps = Omit<BaseContextMenu.Item.Props, "className"> & { className?: string };
function Root({ onOpenChange, ...props }: ContextMenuRootProps) {
  return <PopupProvider>{setAnchor => <BaseContextMenu.Root {...props} onOpenChange={(open, details) => {
    onOpenChange?.(open, details);
    if (open && !details.isCanceled && details.trigger instanceof HTMLElement) setAnchor(details.trigger);
  }} />}</PopupProvider>;
}
const Portal = BaseContextMenu.Portal;

const Trigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(function Trigger({ className, onKeyDown, ...props }, ref) {
  return <BaseContextMenu.Trigger {...props} ref={usePopupTriggerRef(ref)} data-rain-id="ui-context-menu" data-slot="trigger" onKeyDown={event => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.target !== event.currentTarget || (event.key !== "ContextMenu" && !(event.shiftKey && event.key === "F10"))) return;
    const target = event.currentTarget, view = target.ownerDocument.defaultView, rect = target.getBoundingClientRect();
    // Base UI 1.8 handles contextmenu but does not synthesize it from these keys on macOS.
    if (view && !target.dispatchEvent(new view.MouseEvent("contextmenu", { bubbles: true, cancelable: true, button: 2, clientX: rect.left, clientY: rect.bottom }))) event.preventDefault();
  }}
    className={rainCn("outline-none focus-visible:outline-rain-focus focus-visible:outline-offset-rain-focus", className)} />;
});

const Positioner = forwardRef<HTMLDivElement, Omit<BaseContextMenu.Positioner.Props, "className"> & { className?: string }>(function Positioner({ className, style, ...props }, ref) {
  const { theme, density, densityStyle } = usePopupScope();
  return <BaseContextMenu.Positioner {...props} ref={ref} data-rain-theme={theme} data-density={density} style={state => ({ ...densityStyle, ...(typeof style === "function" ? style(state) : style) })} className={rainCn("rain-popup-positioner", className)} />;
});

const Popup = forwardRef<HTMLDivElement, Omit<BaseContextMenu.Popup.Props, "className"> & { className?: string }>(function Popup({ className, ...props }, ref) {
  return <BaseContextMenu.Popup {...props} ref={ref} data-rain-id="ui-context-menu" data-slot="popup" className={rainCn(popupSurfaceClassName, "rain-menu rain-g3-menu-popup p-rain-6", className)} />;
});

const Item = forwardRef<HTMLElement, ContextMenuItemProps>(function Item({ className, ...props }, ref) {
  return <BaseContextMenu.Item {...props} ref={ref} data-slot="item" data-focus="item" className={rainCn(menuItemClassName, "rain-g3-menu-item py-rain-4 text-rain-size-14", className)} />;
});

const LinkItem = forwardRef<Element, Omit<BaseContextMenu.LinkItem.Props, "className"> & { className?: string }>(function LinkItem({ className, ...props }, ref) {
  return <BaseContextMenu.LinkItem {...props} ref={ref} data-slot="link-item" data-focus="item" className={rainCn(menuItemClassName, "rain-g3-menu-item py-rain-4 text-rain-size-14", className)} />;
});

const Separator = forwardRef<HTMLDivElement, Omit<BaseContextMenu.Separator.Props, "className"> & { className?: string }>(function Separator({ className, ...props }, ref) {
  return <BaseContextMenu.Separator {...props} ref={ref} data-slot="separator" className={rainCn("rain-g3-menu-separator", className)} />;
});

export const ContextMenu = { Root, Trigger, Portal, Positioner, Popup, Item, LinkItem, Separator, Group: BaseContextMenu.Group, GroupLabel: BaseContextMenu.GroupLabel, CheckboxItem: BaseContextMenu.CheckboxItem, RadioItem: BaseContextMenu.RadioItem, RadioGroup: BaseContextMenu.RadioGroup, SubmenuRoot: BaseContextMenu.SubmenuRoot, SubmenuTrigger: BaseContextMenu.SubmenuTrigger };
