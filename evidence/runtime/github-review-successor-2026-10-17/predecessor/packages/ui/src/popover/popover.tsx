import { forwardRef } from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { DensityProvider } from "@rain-next/foundations";
import { PopupProvider, popupSurfaceClassName, popupWidthStyle, usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import "../dropdown-menu/dropdown-menu.css";

export type PopoverPart = "content";
export type PopoverLocalRecipe = RainLocalRecipe<PopoverPart, "ui-popover">;
export type PopoverRootProps = BasePopover.Root.Props;
function Root({ onOpenChange, ...props }: PopoverRootProps) {
  return <PopupProvider triggerId={props.triggerId} defaultTriggerId={props.defaultTriggerId}>{setAnchor => <BasePopover.Root modal={false} {...props} onOpenChange={(open, details) => {
    onOpenChange?.(open, details);
    if (open && !details.isCanceled && details.trigger instanceof HTMLElement) setAnchor(details.trigger);
  }} />}</PopupProvider>;
}
const Trigger = forwardRef<HTMLElement, BasePopover.Trigger.Props>(function Trigger(props, ref) {
  const anchorRef = usePopupTriggerRef(ref);
  return <BasePopover.Trigger data-rain-id="ui-popover" data-slot="trigger" data-focus="control" {...props} ref={anchorRef} />;
});
export type PopoverContentProps = Omit<BasePopover.Popup.Props, "className" | "style"> & {
  width?: number;
  className?: string;
  localRecipe?: PopoverLocalRecipe;
  positionerProps?: Omit<BasePopover.Positioner.Props, "className" | "style"> & { className?: string };
};
const Content = forwardRef<HTMLDivElement, PopoverContentProps>(function Content({ width = 320, className, localRecipe, positionerProps, children, ...props }, ref) {
  const { theme, density, densityStyle } = usePopupScope();
  return <BasePopover.Portal><BasePopover.Positioner align="start" sideOffset={6} collisionPadding={8} {...positionerProps}
    data-rain-theme={theme} data-density={density} style={densityStyle} className={rainCn("rain-popup-positioner", positionerProps?.className)}>
    <BasePopover.Popup {...props} ref={ref} data-rain-id="ui-popover" data-slot="content" data-local-recipe={localRecipe?.id}
      style={popupWidthStyle(width)} className={rainCn(popupSurfaceClassName, "rain-popover flex flex-col p-rain-12", className, getRainLocalRecipePart(localRecipe, "content"))}>
      <DensityProvider density="compact">{children}</DensityProvider>
    </BasePopover.Popup>
  </BasePopover.Positioner></BasePopover.Portal>;
});
const Title = forwardRef<HTMLHeadingElement, Omit<BasePopover.Title.Props, "className"> & { className?: string }>(function Title({ className, ...props }, ref) {
  return <BasePopover.Title {...props} ref={ref} data-slot="title" className={rainCn("m-rain-0 text-rain-size-15 leading-rain-22 font-rain-semibold", typeof className === "string" && className)} />;
});
const Description = forwardRef<HTMLParagraphElement, Omit<BasePopover.Description.Props, "className"> & { className?: string }>(function Description({ className, ...props }, ref) {
  return <BasePopover.Description {...props} ref={ref} data-slot="description" className={rainCn("m-rain-0 mt-rain-4 text-rain-size-13 leading-rain-18 font-rain-regular", typeof className === "string" && className)} />;
});

export const Popover = { Root, Trigger, Content, Title, Description, Close: BasePopover.Close };
