// Adapted from shadcn/ui's Base UI anatomy; source and MIT notice: evidence/runtime/dialog-v2/upstream.
import { createContext, forwardRef, useContext, type CSSProperties, type HTMLAttributes } from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { DensityProvider, dialogWidths, type DialogWidth, type OverlayMask } from "@rain-next/foundations";
import { PopupProvider, popupWidthStyle, usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import "./dialog.css";

export type DialogPart = "content" | "header" | "body" | "footer" | "title" | "description";
export type DialogLocalRecipe = RainLocalRecipe<DialogPart, "ui-dialog">;
export type DialogRootProps = BaseDialog.Root.Props;
export type AlertDialogRootProps = BaseAlertDialog.Root.Props;
const DialogThemeContext = createContext<"light" | "dark" | undefined>(undefined);
const KindContext = createContext({ alert: false, modal: true });
const RecipeContext = createContext<DialogLocalRecipe | undefined>(undefined);

/** Only viewport geometry; the native visual viewport also accounts for keyboards and pinch zoom. */
function trackViewport(node: HTMLDivElement | null) {
  const viewport = node?.ownerDocument.defaultView?.visualViewport;
  if (!node || !viewport) return;
  const sync = () => {
    for (const [key, value] of Object.entries({ width: viewport.width, height: viewport.height, left: viewport.offsetLeft, top: viewport.offsetTop }))
      node.style.setProperty(`--rain-dialog-viewport-${key}`, `${value}px`);
    node.toggleAttribute("data-narrow", viewport.width <= 640);
    node.toggleAttribute("data-short", viewport.height <= 360);
  };
  sync(); viewport.addEventListener("resize", sync); viewport.addEventListener("scroll", sync);
  return () => { viewport.removeEventListener("resize", sync); viewport.removeEventListener("scroll", sync); };
}

function Root({ onOpenChange, disablePointerDismissal = true, ...props }: DialogRootProps) {
  return <KindContext.Provider value={{ alert: false, modal: props.modal !== false }}><RecipeContext.Provider value={undefined}><PopupProvider triggerId={props.triggerId} defaultTriggerId={props.defaultTriggerId}>
    {setAnchor => <BaseDialog.Root {...props} disablePointerDismissal={disablePointerDismissal} onOpenChange={(open, details) => {
      onOpenChange?.(open, details);
      if (open && !details.isCanceled && details.trigger instanceof HTMLElement) setAnchor(details.trigger);
    }} />}
  </PopupProvider></RecipeContext.Provider></KindContext.Provider>;
}
function AlertRoot({ onOpenChange, ...props }: AlertDialogRootProps) {
  return <KindContext.Provider value={{ alert: true, modal: true }}><RecipeContext.Provider value={undefined}><PopupProvider triggerId={props.triggerId} defaultTriggerId={props.defaultTriggerId}>
    {setAnchor => <BaseAlertDialog.Root {...props} onOpenChange={(open, details) => {
      onOpenChange?.(open, details);
      if (open && !details.isCanceled && details.trigger instanceof HTMLElement) setAnchor(details.trigger);
    }} />}
  </PopupProvider></RecipeContext.Provider></KindContext.Provider>;
}
const AlertTrigger = forwardRef<HTMLElement, BaseAlertDialog.Trigger.Props>(function AlertTrigger(props, ref) {
  return <BaseAlertDialog.Trigger {...props} ref={usePopupTriggerRef(ref)} data-rain-id="ui-alert-dialog" data-slot="trigger" data-focus="control" />;
});

const Trigger = forwardRef<HTMLElement, BaseDialog.Trigger.Props>(function Trigger(props, ref) {
  return <BaseDialog.Trigger {...props} ref={usePopupTriggerRef(ref)} data-rain-id="ui-dialog" data-slot="trigger" data-focus="control" />;
});

export type DialogContentProps = Omit<BaseDialog.Popup.Props, "className" | "style"> & {
  width?: DialogWidth;
  viewportInset?: 40 | 60;
  /** Paint only. Modality and pointer dismissal remain Root concerns. */
  mask?: OverlayMask;
  /** Explicit theme for triggerless dialogs; otherwise follows the active trigger. */
  theme?: "light" | "dark";
  className?: string;
  /** Explicit portal-local layout variables; visual values must use registered Rain Tokens. */
  style?: CSSProperties;
  localRecipe?: DialogLocalRecipe;
};
const Content = forwardRef<HTMLDivElement, DialogContentProps>(function Content({ width: requestedWidth, viewportInset = 40, mask = "modal", theme: explicitTheme, className, localRecipe, style, children, ...props }, ref) {
  const { alert, modal } = useContext(KindContext);
  const width = requestedWidth ?? (alert ? 416 : 616);
  if (width !== "viewport" && !dialogWidths.includes(width)) throw new Error("Dialog width must use a standard size or viewport");
  const { theme: inheritedTheme, density, densityStyle, anchor } = usePopupScope();
  const parentTheme = useContext(DialogThemeContext);
  const theme = explicitTheme ?? (anchor ? inheritedTheme : parentTheme ?? inheritedTheme);
  return <BaseDialog.Portal ref={trackViewport} className="rain-dialog-portal" data-modal={modal}>
    {mask !== "none" && <BaseDialog.Backdrop forceRender data-rain-theme={theme} data-rain-id="ui-dialog" data-slot="backdrop" data-mask={mask} className="rain-dialog-backdrop" />}
    <BaseDialog.Popup {...props} ref={ref} data-rain-id={alert ? "ui-alert-dialog" : "ui-dialog"} data-slot="content" data-width={width} data-inset={viewportInset} data-rain-theme={theme} data-density={density}
      data-local-recipe={localRecipe?.id} style={{ ...densityStyle, ...(width === "viewport" ? {} : popupWidthStyle(width)), ...style }}
      className={rainCn("rain-dialog box-border flex flex-col min-w-rain-0 rounded-rain-10 border-solid border-rain-line-1 shadow-rain-dialog font-rain-ui text-rain-size-14 leading-rain-24 font-rain-regular", className, getRainLocalRecipePart(localRecipe, "content"))}>
      <DensityProvider density={density} className="contents"><DialogThemeContext.Provider value={theme}><RecipeContext.Provider value={localRecipe}>{children}</RecipeContext.Provider></DialogThemeContext.Provider></DensityProvider>
    </BaseDialog.Popup>
  </BaseDialog.Portal>;
});

function partClasses(part: DialogPart, base: string, className?: string) {
  return rainCn(base, className, getRainLocalRecipePart(useContext(RecipeContext), part));
}
function createPart(part: "header" | "body", base: string) {
  return forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function DialogPart({ className, ...props }, ref) {
    return <div {...props} ref={ref} data-slot={part} className={partClasses(part, base, className)} />;
  });
}
const Header = createPart("header", "rain-dialog-header flex shrink-0 flex-col gap-rain-8 p-rain-24");
const Body = createPart("body", "rain-dialog-body min-h-0 overflow-y-auto px-rain-24 pb-rain-24 first:pt-rain-24");
export type DialogFooterProps = HTMLAttributes<HTMLDivElement> & { divider?: boolean };
const Footer = forwardRef<HTMLDivElement, DialogFooterProps>(function Footer({ divider = false, className, ...props }, ref) {
  return <div {...props} ref={ref} data-slot="footer" data-divider={divider || undefined}
    className={partClasses("footer", "rain-dialog-footer flex shrink-0 flex-wrap items-center justify-end gap-rain-8 px-rain-24 py-rain-16", className)} />;
});
const Title = forwardRef<HTMLHeadingElement, Omit<BaseDialog.Title.Props, "className"> & { className?: string }>(function Title({ className, ...props }, ref) {
  return <BaseDialog.Title {...props} ref={ref} data-slot="title" className={partClasses("title", "rain-dialog-title m-rain-0 text-rain-size-18 leading-rain-28 font-rain-semibold", className)} />;
});
const Description = forwardRef<HTMLParagraphElement, Omit<BaseDialog.Description.Props, "className"> & { className?: string }>(function Description({ className, ...props }, ref) {
  return <BaseDialog.Description {...props} ref={ref} data-slot="description" className={partClasses("description", "rain-dialog-description m-rain-0 text-rain-size-14 leading-rain-24", className)} />;
});
const Close = forwardRef<HTMLButtonElement, BaseDialog.Close.Props>(function Close(props, ref) {
  return <BaseDialog.Close {...props} ref={ref} data-slot="close" data-focus="control" />;
});

export const Dialog = { Root, Trigger, Content, Header, Body, Footer, Title, Description, Close };

export const AlertDialog = { ...Dialog, Root: AlertRoot, Trigger: AlertTrigger };
