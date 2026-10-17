// Adapted from shadcn-ui/ui@3ba91b1 Base UI Drawer; MIT and source lock: evidence/runtime/g6-preflight-2026-10-14.
import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDirection } from "@base-ui/react/direction-provider";
import { DensityProvider } from "@rain-next/foundations";
import { PopupProvider, usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import { rainCn } from "../utils/rain-class-names";
import "./drawer.css";

export type DrawerRootProps = DrawerPrimitive.Root.Props & { showSwipeHandle?: boolean };
export type DrawerContentProps = DrawerPrimitive.Popup.Props;
type DrawerContextProps = {
  hasSnapPoints: boolean;
  modal: DrawerPrimitive.Root.Props["modal"];
  showSwipeHandle: boolean;
  swipeDirection: NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>;
};
const DrawerContext = React.createContext<DrawerContextProps | null>(null);
const DrawerThemeContext = React.createContext<"light" | "dark" | undefined>(undefined);
function useDrawer() {
  const context = React.useContext(DrawerContext);
  if (!context) throw new Error("Drawer parts require their Drawer root.");
  return context;
}

export function Drawer({ modal = true, showSwipeHandle = false, snapPoints, swipeDirection = "down", onOpenChange, ...props }: DrawerRootProps) {
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0;
  const value = React.useMemo(() => ({ hasSnapPoints, modal, showSwipeHandle, swipeDirection }), [hasSnapPoints, modal, showSwipeHandle, swipeDirection]);
  return <DrawerContext.Provider value={value}><PopupProvider triggerId={props.triggerId} defaultTriggerId={props.defaultTriggerId}>
    {setAnchor => <DrawerPrimitive.Root {...props} modal={modal} snapPoints={snapPoints} swipeDirection={swipeDirection}
      onOpenChange={(open, details) => {
        onOpenChange?.(open, details);
        if (open && !details.isCanceled && details.trigger instanceof HTMLElement) setAnchor(details.trigger);
      }} />}
  </PopupProvider></DrawerContext.Provider>;
}
export const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerPrimitive.Trigger.Props>(function DrawerTrigger(props, ref) {
  return <DrawerPrimitive.Trigger {...props} ref={usePopupTriggerRef(ref)} data-rain-id="ui-drawer" data-slot="drawer-trigger" data-focus="control" />;
});
export function DrawerPortal(props: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}
export const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerPrimitive.Close.Props>(function DrawerClose(props, ref) {
  return <DrawerPrimitive.Close {...props} ref={ref} data-slot="drawer-close" data-focus="control" />;
});
export const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerPrimitive.Backdrop.Props>(function DrawerOverlay({ className, style, ...props }, ref) {
  const { theme, density, densityStyle, anchor } = usePopupScope();
  const parentTheme = React.useContext(DrawerThemeContext), direction = useDirection();
  const resolvedTheme = anchor ? theme : parentTheme ?? theme;
  return <DrawerPrimitive.Backdrop {...props} ref={ref} data-rain-id="ui-drawer" data-slot="drawer-overlay" data-rain-theme={resolvedTheme} data-density={density} dir={direction}
    className={state => rainCn("rain-drawer__overlay", typeof className === "function" ? className(state) : className)}
    style={state => ({ ...densityStyle, ...(typeof style === "function" ? style(state) : style) })} />;
});
export function DrawerSwipeHandle({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} data-slot="drawer-swipe-handle" aria-hidden="true" className={rainCn("rain-drawer__swipe-handle", className)} />;
}
export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(function DrawerContent({ className, children, style, ...props }, ref) {
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer();
  const { theme, density, densityStyle, anchor } = usePopupScope();
  const parentTheme = React.useContext(DrawerThemeContext), direction = useDirection();
  const resolvedTheme = anchor ? theme : parentTheme ?? theme;
  const swipeAxis = swipeDirection === "down" || swipeDirection === "up" ? "y" : "x";
  return <DrawerPortal>
    {/* Switching snap mode resets the engine-owned backdrop progress without replacing the Popup. */}
    {modal === true && <DrawerOverlay key={hasSnapPoints ? "snap" : "content"} data-snap-points={hasSnapPoints ? "" : undefined} />}
    <DrawerPrimitive.Viewport data-slot="drawer-viewport" data-modal={modal} className="rain-drawer__viewport" dir={direction}>
      <DrawerPrimitive.Popup {...props} ref={ref} data-rain-id="ui-drawer" data-slot="drawer-popup" data-swipe-axis={swipeAxis} data-snap-points={hasSnapPoints ? "" : undefined}
        data-rain-theme={resolvedTheme} data-density={density} dir={direction}
        className={state => rainCn("rain-drawer__popup", typeof className === "function" ? className(state) : className)}
        style={state => ({ ...densityStyle, ...(typeof style === "function" ? style(state) : style) })}>
        {showSwipeHandle && <DrawerSwipeHandle />}
        <DrawerPrimitive.Content data-slot="drawer-content" className="rain-drawer__content">
          <DensityProvider density={density} className="contents"><DrawerThemeContext.Provider value={resolvedTheme}>{children}</DrawerThemeContext.Provider></DensityProvider>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Popup>
    </DrawerPrimitive.Viewport>
  </DrawerPortal>;
});
export function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} data-slot="drawer-header" className={rainCn("rain-drawer__header", className)} />;
}
export const DrawerBody = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(function DrawerBody({ className, ...props }, ref) {
  return <div {...props} ref={ref} data-slot="drawer-body" className={rainCn("rain-drawer__body", className)} />;
});
export function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} data-slot="drawer-footer" className={rainCn("rain-drawer__footer", className)} />;
}
export const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerPrimitive.Title.Props>(function DrawerTitle({ className, ...props }, ref) {
  return <DrawerPrimitive.Title {...props} ref={ref} data-slot="drawer-title" className={state => rainCn("rain-drawer__title", typeof className === "function" ? className(state) : className)} />;
});
export const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerPrimitive.Description.Props>(function DrawerDescription({ className, ...props }, ref) {
  return <DrawerPrimitive.Description {...props} ref={ref} data-slot="drawer-description" className={state => rainCn("rain-drawer__description", typeof className === "function" ? className(state) : className)} />;
});
