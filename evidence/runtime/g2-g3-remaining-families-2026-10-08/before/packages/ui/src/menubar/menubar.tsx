import { forwardRef, type ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { PopupProvider, popupSurfaceClassName, usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import { menuItemClassName } from "../dropdown-menu/dropdown-menu.styles";
import { rainCn } from "../utils/rain-class-names";

export type MenubarRootProps = Omit<BaseMenubar.Props, "className"> & { className?: string };
export type MenubarMenuProps = BaseMenu.Root.Props & { children?: ReactNode };
export type MenubarTriggerProps = Omit<BaseMenu.Trigger.Props, "className"> & { className?: string };

const Root = forwardRef<HTMLDivElement, MenubarRootProps>(function Root({ className, ...props }, ref) {
  return <BaseMenubar {...props} ref={ref} data-rain-id="ui-menubar" data-slot="root"
    className={rainCn("rain-menubar flex items-center gap-rain-4 rounded-rain-8 border border-rain-line-1 bg-rain-category-background-neutral-1 p-rain-4", className)} />;
});

function Menu({ children, onOpenChange, ...props }: MenubarMenuProps) {
  return <PopupProvider triggerId={props.triggerId} defaultTriggerId={props.defaultTriggerId}>{setAnchor => <BaseMenu.Root {...props} onOpenChange={(open, details) => {
    onOpenChange?.(open, details);
    if (open && !details.isCanceled && details.trigger instanceof HTMLElement) setAnchor(details.trigger);
  }}>{children}</BaseMenu.Root>}</PopupProvider>;
}

const Trigger = forwardRef<HTMLButtonElement, MenubarTriggerProps>(function Trigger({ className, ...props }, ref) {
  return <BaseMenu.Trigger {...props} ref={usePopupTriggerRef(ref)} data-slot="trigger" data-focus="control"
    className={rainCn("inline-flex min-h-rain-32 items-center rounded-rain-6 border-0 bg-transparent px-rain-10 py-rain-4 text-rain-size-14 leading-rain-24 text-rain-category-text-neutral-2 outline-none hover:bg-rain-category-fill-neutral-alpha-2 focus-visible:outline-rain-focus focus-visible:outline-offset-rain-focus data-[popup-open]:bg-rain-category-fill-brand-alpha-2 data-[popup-open]:text-rain-category-text-brand-1", className)} />;
});

const Positioner = forwardRef<HTMLDivElement, Omit<BaseMenu.Positioner.Props, "className"> & { className?: string }>(function Positioner({ className, children, style, ...props }, ref) {
  const { theme, density, densityStyle } = usePopupScope();
  return <BaseMenu.Portal><BaseMenu.Positioner {...props} ref={ref} sideOffset={4} data-rain-theme={theme} data-density={density} style={state => ({ ...densityStyle, ...(typeof style === "function" ? style(state) : style) })} className={rainCn("rain-popup-positioner", className)}>{children}</BaseMenu.Positioner></BaseMenu.Portal>;
});

const Popup = forwardRef<HTMLDivElement, Omit<BaseMenu.Popup.Props, "className"> & { className?: string }>(function Popup({ className, ...props }, ref) {
  return <BaseMenu.Popup {...props} ref={ref} data-slot="popup" className={rainCn(popupSurfaceClassName, "rain-menu min-w-rain-160 p-rain-8", className)} />;
});

const Item = forwardRef<HTMLElement, Omit<BaseMenu.Item.Props, "className"> & { className?: string }>(function Item({ className, ...props }, ref) {
  return <BaseMenu.Item {...props} ref={ref} data-slot="item" data-focus="item" className={rainCn(menuItemClassName, className)} />;
});

const LinkItem = forwardRef<Element, Omit<BaseMenu.LinkItem.Props, "className"> & { className?: string }>(function LinkItem({ className, ...props }, ref) {
  return <BaseMenu.LinkItem {...props} ref={ref} data-slot="link-item" data-focus="item" className={rainCn(menuItemClassName, className)} />;
});

const Separator = forwardRef<HTMLDivElement, Omit<BaseMenu.Separator.Props, "className"> & { className?: string }>(function Separator({ className, ...props }, ref) {
  return <BaseMenu.Separator {...props} ref={ref} data-slot="separator" className={rainCn("my-rain-6 border-t border-rain-line-1", className)} />;
});

const Group = BaseMenu.Group;
const GroupLabel = BaseMenu.GroupLabel;
const SubmenuRoot = BaseMenu.SubmenuRoot;
const SubmenuTrigger = BaseMenu.SubmenuTrigger;

export const Menubar = { Root, Menu, Trigger, Positioner, Popup, Item, LinkItem, Separator, Group, GroupLabel, SubmenuRoot, SubmenuTrigger };
