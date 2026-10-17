import { forwardRef } from "react";
import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import { PopupProvider, popupSurfaceClassName, usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import { rainCn } from "../utils/rain-class-names";

export type NavigationMenuRootProps = Omit<BaseNavigationMenu.Root.Props, "className"> & { className?: string };
export type NavigationMenuTriggerProps = Omit<BaseNavigationMenu.Trigger.Props, "className"> & { className?: string };
export type NavigationMenuContentProps = Omit<BaseNavigationMenu.Content.Props, "className"> & { className?: string };
export type NavigationMenuLinkProps = Omit<BaseNavigationMenu.Link.Props, "className"> & { className?: string };

function Root({ className, onValueChange, ...props }: NavigationMenuRootProps) {
  return <PopupProvider>{setAnchor => <BaseNavigationMenu.Root {...props} onValueChange={(value, details) => {
    onValueChange?.(value, details);
    if (value != null && !details.isCanceled && details.trigger instanceof HTMLElement) setAnchor(details.trigger);
  }} data-rain-id="ui-navigation-menu" data-slot="root" className={rainCn("rain-navigation-menu relative flex min-w-0", className)} />}</PopupProvider>;
}

const List = forwardRef<HTMLUListElement, Omit<BaseNavigationMenu.List.Props, "className"> & { className?: string }>(function List({ className, ...props }, ref) {
  return <BaseNavigationMenu.List {...props} ref={ref} data-slot="list" className={rainCn("flex min-w-0 items-center gap-rain-4 list-none p-rain-0 m-rain-0", className)} />;
});

const Item = forwardRef<HTMLLIElement, Omit<BaseNavigationMenu.Item.Props, "className"> & { className?: string }>(function Item({ className, ...props }, ref) {
  return <BaseNavigationMenu.Item {...props} ref={ref} data-slot="item" className={rainCn("relative", className)} />;
});

const Trigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(function Trigger({ className, ...props }, ref) {
  return <BaseNavigationMenu.Trigger {...props} ref={usePopupTriggerRef(ref)} data-slot="trigger" data-focus="control"
    className={rainCn("rain-g3-menu-trigger inline-flex items-center gap-rain-8 rounded-rain-6 border-0 bg-transparent px-rain-12 py-rain-4 text-rain-size-14 leading-rain-22 text-rain-category-text-neutral-1 outline-none hover:bg-rain-category-fill-neutral-alpha-6 focus-visible:outline-rain-focus focus-visible:outline-offset-rain-focus data-[popup-open]:bg-rain-category-fill-neutral-alpha-6", className)} />;
});

const Content = forwardRef<HTMLDivElement, NavigationMenuContentProps>(function Content({ className, style, ...props }, ref) {
  const { theme, density, densityStyle } = usePopupScope();
  return <BaseNavigationMenu.Content {...props} ref={ref} data-slot="content" data-rain-theme={theme} data-density={density} style={state => ({ ...densityStyle, ...(typeof style === "function" ? style(state) : style) })} className={rainCn(popupSurfaceClassName, "rain-navigation-menu-content p-rain-8 text-rain-size-14", className)} />;
});

const Link = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(function Link({ className, ...props }, ref) {
  return <BaseNavigationMenu.Link {...props} ref={ref} data-slot="link" data-focus="item"
    className={rainCn("rain-navigation-menu-link flex items-center gap-rain-10 rounded-rain-6 px-rain-12 py-rain-4 text-rain-size-14 leading-rain-22 text-rain-category-text-neutral-1 no-underline outline-none hover:bg-rain-category-fill-neutral-alpha-6 focus-visible:outline-rain-focus focus-visible:outline-offset-rain-focus data-[active]:bg-rain-category-fill-brand-alpha-4 data-[active]:font-rain-semibold data-[active]:text-rain-category-text-brand-1", className)} />;
});

const Viewport = forwardRef<HTMLDivElement, Omit<BaseNavigationMenu.Viewport.Props, "className"> & { className?: string }>(function Viewport({ className, ...props }, ref) {
  return <BaseNavigationMenu.Viewport {...props} ref={ref} data-slot="viewport" className={rainCn("rain-navigation-menu-viewport", className)} />;
});

const Positioner = forwardRef<HTMLDivElement, Omit<BaseNavigationMenu.Positioner.Props, "className"> & { className?: string }>(function Positioner({ className, style, ...props }, ref) {
  const { theme, density, densityStyle } = usePopupScope();
  return <BaseNavigationMenu.Positioner {...props} ref={ref} data-rain-theme={theme} data-density={density} style={state => ({ ...densityStyle, ...(typeof style === "function" ? style(state) : style) })} className={rainCn("rain-popup-positioner", className)} />;
});

const Portal = BaseNavigationMenu.Portal;
const Popup = BaseNavigationMenu.Popup;
const Arrow = BaseNavigationMenu.Arrow;
const Backdrop = BaseNavigationMenu.Backdrop;

export const NavigationMenu = { Root, List, Item, Trigger, Content, Link, Viewport, Positioner, Portal, Popup, Arrow, Backdrop };
