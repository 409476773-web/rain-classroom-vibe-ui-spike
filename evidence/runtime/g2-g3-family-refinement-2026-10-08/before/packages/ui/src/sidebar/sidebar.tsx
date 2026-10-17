import { createContext, forwardRef, useContext, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { rainCn } from "../utils/rain-class-names";

type SidebarContextValue = { collapsed: boolean; setCollapsed: (value: boolean) => void };
const SidebarContext = createContext<SidebarContextValue | null>(null);

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  side?: "left" | "right";
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar({ collapsed: controlledCollapsed, defaultCollapsed = false, onCollapsedChange, side = "left", className, children, ...props }, ref) {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed);
  const collapsed = controlledCollapsed ?? uncontrolledCollapsed;
  const setCollapsed = (value: boolean) => {
    if (controlledCollapsed === undefined) setUncontrolledCollapsed(value);
    onCollapsedChange?.(value);
  };
  return <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
    <nav {...props} ref={ref} data-rain-id="ui-sidebar" data-slot="root" data-side={side} data-collapsed={collapsed}
      className={rainCn("rain-sidebar flex min-h-0 min-w-0 flex-col bg-rain-category-fill-neutral-solid-1 text-rain-category-text-neutral-1", className)}>{children}</nav>
  </SidebarContext.Provider>;
});

export const SidebarHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SidebarHeader({ className, ...props }, ref) {
  return <div {...props} ref={ref} data-slot="header" className={rainCn("flex shrink-0 items-center gap-rain-8 p-rain-12", className)} />;
});

export const SidebarContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SidebarContent({ className, ...props }, ref) {
  return <div {...props} ref={ref} data-slot="content" className={rainCn("min-h-0 flex-1 overflow-y-auto p-rain-8", className)} />;
});

export const SidebarFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function SidebarFooter({ className, ...props }, ref) {
  return <div {...props} ref={ref} data-slot="footer" className={rainCn("flex shrink-0 items-center gap-rain-8 p-rain-12", className)} />;
});

export const SidebarSection = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { label?: ReactNode }>(function SidebarSection({ label, className, children, ...props }, ref) {
  return <section {...props} ref={ref} data-slot="section" className={rainCn("mb-rain-16 last:mb-rain-0", className)}>
    {label ? <h2 className="mb-rain-6 px-rain-8 text-rain-size-12 leading-rain-18 font-rain-semibold text-rain-category-text-neutral-4">{label}</h2> : null}
    {children}
  </section>;
});

export interface SidebarItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> { active?: boolean; icon?: ReactNode; }
export const SidebarItem = forwardRef<HTMLAnchorElement, SidebarItemProps>(function SidebarItem({ active = false, icon, className, children, ...props }, ref) {
  return <a {...props} ref={ref} aria-current={active ? "page" : undefined} data-slot="item" data-active={active || undefined}
    className={rainCn("group flex min-h-rain-32 items-center gap-rain-8 rounded-rain-6 px-rain-8 py-rain-6 text-rain-size-14 leading-rain-24 text-rain-category-text-neutral-3 no-underline outline-none transition-colors focus-visible:outline-rain-focus focus-visible:outline-offset-rain-focus hover:bg-rain-category-fill-neutral-alpha-2 data-[active=true]:bg-rain-category-fill-brand-alpha-2 data-[active=true]:font-rain-semibold data-[active=true]:text-rain-category-text-brand-1", className)}>
    {icon ? <span data-slot="icon" aria-hidden="true" className="inline-flex shrink-0">{icon}</span> : null}
    <span data-slot="label" className="min-w-0 truncate">{children}</span>
  </a>;
});

export type SidebarTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;
export const SidebarTrigger = forwardRef<HTMLButtonElement, SidebarTriggerProps>(function SidebarTrigger({ className, onClick, ...props }, ref) {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("SidebarTrigger must be rendered inside Sidebar.");
  return <button {...props} ref={ref} type="button" aria-expanded={!context.collapsed} data-slot="trigger" data-collapsed={context.collapsed}
    onClick={event => { context.setCollapsed(!context.collapsed); onClick?.(event); }}
    className={rainCn("inline-flex min-h-rain-32 min-w-rain-32 items-center justify-center rounded-rain-6 border-0 bg-transparent text-rain-category-text-neutral-3 outline-none focus-visible:outline-rain-focus focus-visible:outline-offset-rain-focus hover:bg-rain-category-fill-neutral-alpha-2", className)} />;
});
