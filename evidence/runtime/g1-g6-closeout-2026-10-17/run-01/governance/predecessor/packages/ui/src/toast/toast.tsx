// Adapted from shadcn-ui/ui@3ba91b1 Base UI Toast, MIT. Original Parts/manager/list retained; paint and icons translated to Rain.
import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { useDensity } from "@rain-next/foundations";
import { rainCn as cn } from "../utils/rain-class-names";
import { IconButton } from "../icon-button/icon-button";
import { Button, type ButtonPart } from "../button/button";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { WarningColorIcon } from "../icons/warning-color";
import { CloseIcon } from "../icons/close";
import { CheckColorIcon } from "../icons/check-color";
import { ErrorColorIcon } from "../icons/error-color";
import { HelpColorIcon } from "../icons/help-color";
import { InfoColorIcon } from "../icons/info-color";
import { Spinner } from "../loading/loading";

import "./toast.css";

const toast = ToastPrimitive.createToastManager();
const toastActionRecipe = defineRainLocalRecipe<ButtonPart, "ui-button">({
  id: "toast-text-action", scope: "feature", origin: "ui-button",
  classes: { root: "rain-g2-toast-action", label: "rain-g2-toast-action-label" },
  modifiedParts: ["root", "label"], candidateTokens: [], promotionStatus: "not-proposed",
});
function ToastProvider(props: ToastPrimitive.Provider.Props) { return <ToastPrimitive.Provider {...props} />; }
function ToastPortal(props: ToastPrimitive.Portal.Props) { return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />; }
function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return <ToastPrimitive.Viewport data-slot="toast-viewport" aria-label="通知（按 F6 聚焦）" className={state => cn("rain-g2-toast-viewport", typeof className === "function" ? className(state) : className)} {...props} />;
}
function Toast({ className, toast: toastItem, ...props }: ToastPrimitive.Root.Props) {
  return <ToastPrimitive.Root data-rain-id="ui-toast" data-slot="toast" data-focus="control" data-type={toastItem?.type} toast={toastItem} className={state => cn("rain-g2-toast", typeof className === "function" ? className(state) : className)} {...props} />;
}
function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return <ToastPrimitive.Content data-slot="toast-content" className={state => cn("rain-g2-toast-content", typeof className === "function" ? className(state) : className)} {...props} />;
}
function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return <ToastPrimitive.Title data-slot="toast-title" className={state => cn("rain-g2-toast-title", typeof className === "function" ? className(state) : className)} {...props} />;
}
function ToastDescription({ className, ...props }: ToastPrimitive.Description.Props) {
  return <ToastPrimitive.Description data-slot="toast-description" className={state => cn("rain-g2-toast-description", typeof className === "function" ? className(state) : className)} {...props} />;
}
// The render callback passes Base UI's dynamic action label through Rain's children-required Button.
function ToastAction({ className, render = buttonProps => <Button {...buttonProps} variant="text" localRecipe={toastActionRecipe}>{buttonProps.children}</Button>, ...props }: ToastPrimitive.Action.Props) {
  return <ToastPrimitive.Action data-slot="toast-action" render={render} className={state => cn("shrink-0", typeof className === "function" ? className(state) : className)} {...props} />;
}
function ToastClose({ render = <IconButton className="rain-g2-toast-close" size="28/16" aria-label="关闭通知" icon={<CloseIcon />} />, ...props }: ToastPrimitive.Close.Props) {
  return <ToastPrimitive.Close data-slot="toast-close" aria-label="关闭通知" render={render} {...props} />;
}
function ToastIcon({ type }: { type?: string }) {
  const icon = type === "success" ? <CheckColorIcon /> : type === "error" ? <ErrorColorIcon />
    : type === "warning" ? <WarningColorIcon /> : type === "info" ? <InfoColorIcon /> : type === "help" ? <HelpColorIcon /> : type === "loading" ? <Spinner aria-hidden="true" /> : null;
  return icon ? <span data-slot="toast-icon" data-type={type} className="rain-g2-toast-icon">{icon}</span> : null;
}
function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager();
  return toasts.map(item => <Toast key={item.id} toast={item}><ToastContent>
    <ToastIcon type={item.type} /><div className="min-w-0 flex-1"><ToastTitle /><ToastDescription /></div>
    <ToastAction /><ToastClose />
  </ToastContent></Toast>);
}
export type ToasterProps = ToastPrimitive.Provider.Props & { theme?: "light" | "dark" };
function Toaster({ children, toastManager = toast, theme = "light", ...props }: ToasterProps) {
  const density = useDensity();
  return <ToastProvider toastManager={toastManager} {...props}>{children}<ToastPortal data-rain-theme={theme} data-density={density}>
    <ToastViewport><ToastList /></ToastViewport>
  </ToastPortal></ToastProvider>;
}
const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;
export { Toaster, Toast, ToastAction, ToastClose, ToastContent, ToastDescription, ToastPortal, ToastProvider, ToastTitle, ToastViewport, createToastManager, toast, useToastManager };
