import { forwardRef, type ReactNode } from "react";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { PopupProvider, usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import { rainCn } from "../utils/rain-class-names";

export type SheetSide = "top" | "right" | "bottom" | "left";
export type SheetRootProps = BaseDrawer.Root.Props;
export type SheetTriggerProps = BaseDrawer.Trigger.Props;
export type SheetContentProps = Omit<BaseDrawer.Popup.Props, "className"> & {
  side?: SheetSide;
  className?: string;
  children?: ReactNode;
};

function Root({ onOpenChange, ...props }: SheetRootProps) {
  return <PopupProvider triggerId={props.triggerId} defaultTriggerId={props.defaultTriggerId}>{setAnchor => <BaseDrawer.Root modal={true} {...props} onOpenChange={(open, details) => {
    onOpenChange?.(open, details);
    if (open && !details.isCanceled && details.trigger instanceof HTMLElement) setAnchor(details.trigger);
  }} />}</PopupProvider>;
}

const Trigger = forwardRef<HTMLButtonElement, SheetTriggerProps>(function Trigger({ className, ...props }, ref) {
  return <BaseDrawer.Trigger {...props} ref={usePopupTriggerRef(ref)} data-rain-id="ui-sheet" data-slot="trigger"
    className={rainCn("inline-flex", typeof className === "string" && className)} />;
});

function Portal({ children }: { children?: ReactNode }) {
  return <BaseDrawer.Portal>{children}</BaseDrawer.Portal>;
}

const Backdrop = forwardRef<HTMLDivElement, Omit<BaseDrawer.Backdrop.Props, "className"> & { className?: string }>(function Backdrop({ className, style, ...props }, ref) {
  const { theme, density, densityStyle } = usePopupScope();
  return <BaseDrawer.Backdrop {...props} ref={ref} data-rain-id="ui-sheet" data-slot="backdrop" data-rain-theme={theme} data-density={density}
    style={state => ({ ...densityStyle, ...(typeof style === "function" ? style(state) : style) })}
    className={rainCn("rain-sheet-backdrop fixed inset-0 z-20", className)} />;
});

const Content = forwardRef<HTMLDivElement, SheetContentProps>(function Content({ className, side = "right", children, ...props }, ref) {
  const { theme, density, densityStyle } = usePopupScope();
  return <BaseDrawer.Viewport data-rain-theme={theme} data-density={density} style={densityStyle} className="rain-sheet-viewport fixed inset-0 z-30 overflow-hidden outline-none">
    <BaseDrawer.Popup {...props} ref={ref} data-rain-id="ui-sheet" data-slot="content" data-side={side}
      className={rainCn("rain-sheet fixed flex max-h-[100dvh] flex-col overflow-hidden bg-rain-category-background-neutral-1 text-rain-category-text-neutral-1 shadow-rain-dialog outline-none", className)}>
      <BaseDrawer.Content className="contents">{children}</BaseDrawer.Content>
    </BaseDrawer.Popup>
  </BaseDrawer.Viewport>;
});

const Title = forwardRef<HTMLHeadingElement, Omit<BaseDrawer.Title.Props, "className"> & { className?: string }>(function Title({ className, ...props }, ref) {
  return <BaseDrawer.Title {...props} ref={ref} data-slot="title" className={rainCn("m-rain-0 px-rain-24 pt-rain-24 text-rain-size-18 leading-rain-28 font-rain-semibold", className)} />;
});

const Description = forwardRef<HTMLParagraphElement, Omit<BaseDrawer.Description.Props, "className"> & { className?: string }>(function Description({ className, ...props }, ref) {
  return <BaseDrawer.Description {...props} ref={ref} data-slot="description" className={rainCn("m-rain-0 px-rain-24 pt-rain-8 text-rain-size-14 leading-rain-24 text-rain-category-text-neutral-3", className)} />;
});

const Close = forwardRef<HTMLButtonElement, BaseDrawer.Close.Props>(function Close(props, ref) {
  return <BaseDrawer.Close {...props} ref={ref} data-slot="close" />;
});

export const Sheet = { Root, Trigger, Portal, Backdrop, Content, Title, Description, Close };
