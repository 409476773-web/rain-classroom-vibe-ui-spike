import { createContext, useCallback, useContext, useLayoutEffect, useState, type CSSProperties, type ForwardedRef, type ReactNode } from "react";
import { densityMetrics, useDensity, type Density } from "@rain-next/foundations";

const PopupContext = createContext<{
  anchor: HTMLElement | null;
  registerAnchor: (element: HTMLElement | null) => void;
  theme: "light" | "dark";
  density: Density;
} | null>(null);

/** Only bridges inherited visual context across a portal. Base UI owns all overlay behavior. */
export function PopupProvider({ children, triggerId, defaultTriggerId }: { children: ReactNode | ((setAnchor: (element: HTMLElement) => void) => ReactNode); triggerId?: string | null; defaultTriggerId?: string | null }) {
  const inheritedDensity = useDensity();
  const [initialTriggerId] = useState(defaultTriggerId);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [density, setDensity] = useState<Density>(inheritedDensity);
  const registerAnchor = useCallback((element: HTMLElement | null) => {
    if (!element) return;
    setAnchor(current => triggerId !== undefined ? (element.id === triggerId ? element : current)
      : current?.isConnected ? current : (!initialTriggerId || element.id === initialTriggerId || current) ? element : current);
  }, [triggerId, initialTriggerId]);
  const activateAnchor = useCallback((element: HTMLElement) => {
    setAnchor(triggerId === undefined ? element : triggerId ? document.getElementById(triggerId) : null);
  }, [triggerId]);
  useLayoutEffect(() => {
    const id = triggerId === undefined ? initialTriggerId : triggerId;
    if (id) setAnchor(document.getElementById(id));
    else if (triggerId === null) setAnchor(null);
  }, [triggerId, initialTriggerId]);
  useLayoutEffect(() => {
    if (!anchor) return;
    const ancestors: HTMLElement[] = [];
    for (let element: HTMLElement | null = anchor; element; element = element.parentElement) ancestors.push(element);
    const sync = () => {
      setTheme(ancestors.find(element => element.hasAttribute("data-rain-theme"))?.getAttribute("data-rain-theme") === "dark" ? "dark" : "light");
      const densityValue = ancestors.slice(1).find(element => element.hasAttribute("data-density"))?.getAttribute("data-density");
      setDensity(densityValue === "compact" || densityValue === "default" ? densityValue : inheritedDensity);
    };
    sync();
    const observer = new MutationObserver(sync);
    for (const element of ancestors) observer.observe(element, { attributes: true, attributeFilter: ["data-rain-theme", "data-density"] });
    return () => observer.disconnect();
  }, [anchor, inheritedDensity]);
  return <PopupContext.Provider value={{ anchor, registerAnchor, theme, density }}>{typeof children === "function" ? children(activateAnchor) : children}</PopupContext.Provider>;
}

export function usePopupTriggerRef<T extends HTMLElement>(ref: ForwardedRef<T>) {
  const { registerAnchor } = usePopupScope();
  return useCallback((element: T | null) => {
    registerAnchor(element);
    if (typeof ref === "function") return ref(element);
    if (ref) ref.current = element;
  }, [registerAnchor, ref]);
}

export function usePopupScope() {
  const context = useContext(PopupContext);
  if (!context) throw new Error("Popup parts require their Root.");
  const metrics = densityMetrics[context.density];
  return { ...context, densityStyle: { "--rain-density-control-height": metrics.controlHeight,
    "--rain-density-control-padding-inline": metrics.controlPaddingInline, "--rain-density-item-gap": metrics.itemGap } as CSSProperties };
}

export function popupWidthStyle(width: number): CSSProperties {
  if (!Number.isFinite(width) || width <= 0) throw new Error("Popup width must be a finite positive number.");
  return { "--rain-popup-width": `${width}px` } as CSSProperties;
}

export const popupSurfaceClassName = "rain-popup box-border min-w-rain-0 rounded-rain-10 border-solid border-rain-line-1 shadow-rain-overlay font-rain-ui text-rain-size-15 leading-rain-22 tracking-rain-default font-rain-regular";
