import {
  createContext, forwardRef, useContext, useImperativeHandle, useLayoutEffect, useRef, useState,
  type CSSProperties, type HTMLAttributes, type RefObject,
} from "react";
import { compositionSpaceTokens, type CompositionSpaceTokenName } from "@rain-next/foundations";
import "./layout.css";

const gapClasses: Record<CompositionSpaceTokenName, string> = {
  0: "gap-rain-0", 2: "gap-rain-2", 4: "gap-rain-4", 6: "gap-rain-6", 8: "gap-rain-8", 10: "gap-rain-10",
  12: "gap-rain-12", 14: "gap-rain-14", 16: "gap-rain-16", 18: "gap-rain-18", 20: "gap-rain-20",
  24: "gap-rain-24", 28: "gap-rain-28", 32: "gap-rain-32", 36: "gap-rain-36", 40: "gap-rain-40",
};
const alignClasses = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch", baseline: "items-baseline" };
const justifyClasses = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" };
export type LayoutAlign = keyof typeof alignClasses;
export type LayoutJustify = keyof typeof justifyClasses;
export type LayoutGap = CompositionSpaceTokenName;

function gapClass(gap: LayoutGap) {
  if (!Object.hasOwn(gapClasses, gap)) throw new RangeError("Layout gap must be an existing Rain Space key.");
  return gapClasses[gap];
}

/** One semantic container and one axis; no automatic nesting or control sizing. */
export interface LayoutSpacing { readonly inset: LayoutGap; readonly section: LayoutGap; readonly item: LayoutGap; }
export function defineLayoutSpacing({ inset, section, item }: LayoutSpacing): Readonly<LayoutSpacing> {
  for (const value of [inset, section, item]) {
    if (typeof value !== "number") throw new RangeError("Layout spacing must use numeric Rain Space keys.");
    gapClass(value);
  }
  if (inset < section || section < item) throw new RangeError("Layout spacing requires inset >= section >= item.");
  return Object.freeze({ inset, section, item });
}
function positiveWidth(name: string, width: number) {
  if (!Number.isFinite(width) || width <= 0) throw new RangeError(`${name} must be a finite positive number.`);
  return `${width}px`;
}

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: LayoutGap;
  align?: Exclude<LayoutAlign, "baseline">;
  justify?: LayoutJustify;
}
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack({ gap = 0, align = "stretch", justify = "start", className, ...props }, ref) {
  return <div {...props} ref={ref} data-rain-id="layout-stack" data-slot="root"
    className={["flex min-w-0 flex-col", gapClass(gap), alignClasses[align], justifyClasses[justify], className].filter(Boolean).join(" ")} />;
});

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  gap?: LayoutGap;
  align?: LayoutAlign;
  justify?: LayoutJustify;
  wrap?: boolean;
}
export const Inline = forwardRef<HTMLDivElement, InlineProps>(function Inline({ gap = 0, align = "center", justify = "start", wrap = true, className, ...props }, ref) {
  return <div {...props} ref={ref} data-rain-id="layout-inline" data-slot="root" data-wrap={wrap}
    className={["flex min-w-0", wrap ? "flex-wrap" : "flex-nowrap", gapClass(gap), alignClasses[align], justifyClasses[justify], className].filter(Boolean).join(" ")} />;
});

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum column count when minColumnWidth enables adaptation; otherwise the constant count. */
  columns?: 1 | 2 | 3 | 4;
  gap?: LayoutGap;
  minColumnWidth?: number;
}
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid({ columns = 1, gap = 0, minColumnWidth, className, style, ...props }, ref) {
  if (![1, 2, 3, 4].includes(columns)) throw new RangeError("Grid columns must be 1, 2, 3 or 4.");
  const gapName = gapClass(gap);
  const geometry = {
    ...style,
    "--rain-layout-gap": compositionSpaceTokens[gap],
    "--rain-layout-columns": columns,
    ...(minColumnWidth !== undefined ? { "--rain-layout-column-min-width": positiveWidth("minColumnWidth", minColumnWidth) } : {}),
  } as CSSProperties;
  return <div {...props} ref={ref} data-rain-id="layout-grid" data-slot="root" data-columns={columns} data-adaptive={minColumnWidth !== undefined}
    className={["rain-grid grid min-w-0", gapName, className].filter(Boolean).join(" ")} style={geometry} />;
});

interface SplitContextValue {
  collapsed: boolean;
  sidebarId: string;
  sidebarRef: RefObject<HTMLDivElement | null>;
  focusWithinSidebar: RefObject<boolean>;
}
const SplitContext = createContext<SplitContextValue | null>(null);
function useSplit() {
  const context = useContext(SplitContext);
  if (!context) throw new Error("Split parts must be inside Split.Root.");
  return context;
}

export interface SplitRootProps extends HTMLAttributes<HTMLDivElement> {
  collapsed: boolean;
  sidebarWidth: number;
  minMainWidth: number;
  gap?: LayoutGap;
  sidebarId: string;
  /** A visible control outside Sidebar; the host also owns aria-expanded and aria-controls. */
  collapseFocusRef: RefObject<HTMLElement | null>;
}
const SplitRoot = forwardRef<HTMLDivElement, SplitRootProps>(function SplitRoot({
  collapsed, sidebarWidth, minMainWidth, gap = 0, sidebarId, collapseFocusRef, className, style, children, ...props
}, ref) {
  const gapName = gapClass(gap);
  const sidebarWidthCss = positiveWidth("sidebarWidth", sidebarWidth), mainWidthCss = positiveWidth("minMainWidth", minMainWidth);
  if (!sidebarId.trim()) throw new Error("Split sidebarId must be non-empty.");
  const rootRef = useRef<HTMLDivElement>(null), sidebarRef = useRef<HTMLDivElement>(null);
  const focusWithinSidebar = useRef(false), previousCollapsed = useRef(collapsed);
  const [stacked, setStacked] = useState(false);
  useImperativeHandle(ref, () => rootRef.current!, []);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const minimum = sidebarWidth + minMainWidth + Number.parseFloat(compositionSpaceTokens[gap]);
    const measure = (width: number) => setStacked(width < minimum);
    const initial = getComputedStyle(root);
    measure(root.getBoundingClientRect().width - (parseFloat(initial.paddingLeft) || 0) - (parseFloat(initial.paddingRight) || 0)
      - (parseFloat(initial.borderLeftWidth) || 0) - (parseFloat(initial.borderRightWidth) || 0));
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(entries => {
      const entry = entries.find(item => item.target === root);
      if (entry) measure(entry.contentRect.width);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [sidebarWidth, minMainWidth, gap]);

  useLayoutEffect(() => {
    if (collapsed && !previousCollapsed.current) {
      const sidebar = sidebarRef.current, doc = sidebar?.ownerDocument;
      const active = doc?.activeElement;
      if (sidebar?.contains(active ?? null) || (focusWithinSidebar.current && active === doc?.body)) {
        collapseFocusRef.current?.focus({ preventScroll: true });
      }
      focusWithinSidebar.current = false;
    }
    previousCollapsed.current = collapsed;
  }, [collapsed, collapseFocusRef]);

  const geometry = {
    ...style,
    "--rain-layout-gap": compositionSpaceTokens[gap],
    "--rain-layout-sidebar-width": sidebarWidthCss,
    "--rain-layout-main-min-width": mainWidthCss,
  } as CSSProperties;
  return <SplitContext.Provider value={{ collapsed, sidebarId, sidebarRef, focusWithinSidebar }}>
    <div {...props} ref={rootRef} data-rain-id="layout-split" data-slot="root" data-collapsed={collapsed} data-stacked={!collapsed && stacked}
      className={["rain-split flex min-w-0 min-h-0", gapName, className].filter(Boolean).join(" ")} style={geometry}>{children}</div>
  </SplitContext.Provider>;
});

export interface SplitPartProps extends HTMLAttributes<HTMLDivElement> { scroll?: "none" | "auto"; }
const SplitMain = forwardRef<HTMLDivElement, SplitPartProps>(function SplitMain({ scroll = "none", className, ...props }, ref) {
  useSplit();
  return <div {...props} ref={ref} data-slot="main" data-scroll={scroll}
    className={["rain-split-main min-h-0", scroll === "auto" ? "overflow-auto" : "overflow-visible", className].filter(Boolean).join(" ")} />;
});
const SplitSidebar = forwardRef<HTMLDivElement, SplitPartProps>(function SplitSidebar({ scroll = "none", className, onFocusCapture, onBlurCapture, ...props }, ref) {
  const { collapsed, sidebarId, sidebarRef, focusWithinSidebar } = useSplit();
  useImperativeHandle(ref, () => sidebarRef.current!, [sidebarRef]);
  return <div {...props} ref={sidebarRef} id={sidebarId} data-slot="sidebar" data-scroll={scroll} hidden={collapsed} inert={collapsed}
    onFocusCapture={event => { focusWithinSidebar.current = true; onFocusCapture?.(event); }}
    onBlurCapture={event => {
      // A hide can move native focus to body before the parent layout effect runs.
      if (!event.currentTarget.hidden || (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node))) {
        focusWithinSidebar.current = false;
      }
      onBlurCapture?.(event);
    }}
    className={["rain-split-sidebar min-w-0 min-h-0", scroll === "auto" ? "overflow-auto" : "overflow-visible", className].filter(Boolean).join(" ")} />;
});

export const Split = { Root: SplitRoot, Main: SplitMain, Sidebar: SplitSidebar };
