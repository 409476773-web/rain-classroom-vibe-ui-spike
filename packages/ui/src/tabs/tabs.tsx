import { createContext, useContext, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { resolveTabsSize, tabsSizeClassNames, tabsTwoLineSizeClassNames, tabsSizeRecipes, tabsAppearanceRecipes, tabsGeometry, useDensity, type TabsSize } from "@rain-next/foundations";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { tabsPaints } from "./tabs.styles";
import { allocateTabsOverflow, type OverflowResult } from "./tabs-overflow";
import { PopupProvider } from "../_internal/popup";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu";
import { MoreHorizontalIcon } from "../icons/more-horizontal";
import { TabsDisabledDescription, TabsFullLabel, TabsTooltipTrigger, formatTabsCount } from "./tabs-full-label";

export { formatTabsCount } from "./tabs-full-label";
export type { TabsSize } from "@rain-next/foundations";
export type TabsValue = string | number;
export type TabsAppearance = "line" | "contained" | "soft";
export type TabsPanelMount = "lazy-retain" | "eager-retain" | "unmount";
export type TabsPart = "root" | "nav" | "list" | "tab" | "icon" | "label" | "count" | "indicator" | "extra-start" | "extra-end" | "more" | "panel";
export type TabsLocalRecipe = RainLocalRecipe<TabsPart, "ui-tabs">;
export interface TabsItem {
  readonly value: TabsValue; readonly label: string; readonly leadingIcon?: ReactNode;
  readonly count?: number | string | null; readonly countAccessibleLabel?: string;
  readonly disabled?: boolean; readonly disabledReason?: string;
  readonly content: ReactNode; readonly panelMount?: TabsPanelMount;
}
export interface TabsChangeDetails { readonly reason: "tab" | "more" | "initial" | "disabled" | "missing"; readonly previousValue: TabsValue | null }
type TabsValueProps =
  | { value: TabsValue | null; defaultValue?: never; onValueChange: (value: TabsValue | null, details: TabsChangeDetails) => void }
  | { value?: never; defaultValue?: TabsValue | null; onValueChange?: (value: TabsValue | null, details: TabsChangeDetails) => void };
type TabsDirectionProps =
  | { position?: "top" | "bottom"; overflow?: "more" | "scroll"; align?: "start" | "center"; itemAlign?: never; labelLines?: 1; collapseBelow?: never }
  | ({ position: "start" | "end"; overflow?: "scroll"; align?: never; collapseBelow?: number } & (
    | { labelLines?: 1; itemAlign?: "left" | "center" | "right" }
    | { labelLines?: 1 | 2; itemAlign?: "left" }
  ));
type TabsAppearanceProps =
  | { appearance?: "line"; indicatorSize?: "stretch" | "content"; showDivider?: boolean }
  | { appearance: "contained" | "soft"; indicatorSize?: never; showDivider?: never };
type TabsNameProps = { "aria-label": string; "aria-labelledby"?: never } | { "aria-label"?: never; "aria-labelledby": string };
type TabsCommonProps = {
  items: readonly TabsItem[]; size?: TabsSize; activationMode?: "manual" | "automatic"; panelMount?: TabsPanelMount;
  extraStart?: ReactNode; extraEnd?: ReactNode; id?: string; "aria-describedby"?: string;
  className?: string; localRecipe?: TabsLocalRecipe; widthMode?: "natural" | "equal";
};
export type TabsProps = TabsValueProps & TabsDirectionProps & TabsAppearanceProps & TabsNameProps & TabsCommonProps;
export type TabsRootProps = TabsValueProps & TabsDirectionProps & TabsAppearanceProps & TabsNameProps & Omit<TabsCommonProps, "extraStart" | "extraEnd"> & { children: ReactNode };
export type TabsNavProps = Pick<TabsCommonProps, "extraStart" | "extraEnd">;
const itemKey = (value: TabsValue) => `${typeof value}:${value}`;
const validValue = (value: unknown): value is TabsValue => typeof value === "string" ? Boolean(value.trim()) : typeof value === "number" && Number.isFinite(value);
const policies = ["lazy-retain", "eager-retain", "unmount"];

function validateTabs(props: TabsRootProps) {
  const values = new Set<TabsValue>();
  for (const item of props.items) {
    if (!validValue(item.value) || values.has(item.value)) throw new Error("Tabs requires unique finite number or nonempty string values");
    if (typeof item.label !== "string" || !item.label.trim()) throw new Error("Tabs requires a nonempty label");
    if (item.panelMount !== undefined && !policies.includes(item.panelMount)) throw new Error("Invalid Tabs item panelMount");
    values.add(item.value);
  }
  if (props.value !== undefined && props.defaultValue !== undefined) throw new Error("Tabs cannot combine value and defaultValue");
  for (const value of [props.value, props.defaultValue]) if (value != null && !validValue(value)) throw new Error("Invalid Tabs value");
  if (props.value !== undefined && typeof props.onValueChange !== "function") throw new Error("Controlled Tabs requires onValueChange");
  if (Boolean(props["aria-label"]?.trim()) === Boolean(props["aria-labelledby"]?.trim())) throw new Error("Tabs requires exactly one accessible name");
  const vertical = props.position === "start" || props.position === "end";
  if (props.position !== undefined && !["top", "bottom", "start", "end"].includes(props.position)) throw new Error("Invalid Tabs position");
  if (props.appearance !== undefined && !["line", "contained", "soft"].includes(props.appearance)) throw new Error("Invalid Tabs appearance");
  if ((vertical && ((props.overflow as string) === "more" || props.align !== undefined)) || (!vertical && props.itemAlign !== undefined)) throw new Error("Invalid Tabs direction combination");
  if ((props.labelLines !== undefined && ![1, 2].includes(props.labelLines)) || (!vertical && props.labelLines === 2) || (props.labelLines === 2 && props.itemAlign !== undefined && props.itemAlign !== "left")) throw new Error("Two-line Tabs require a left-aligned vertical group");
  if (props.collapseBelow !== undefined && (!vertical || !Number.isFinite(props.collapseBelow) || props.collapseBelow <= 0)) throw new Error("Tabs collapseBelow requires a positive finite width and a vertical position");
  if (props.appearance && props.appearance !== "line" && (props.indicatorSize !== undefined || props.showDivider !== undefined)) throw new Error("Tabs indicator and divider belong to line appearance");
  for (const [value, choices] of [[props.overflow, ["more", "scroll"]], [props.widthMode, ["natural", "equal"]], [props.align, ["start", "center"]], [props.itemAlign, ["left", "center", "right"]], [props.indicatorSize, ["stretch", "content"]], [props.activationMode, ["manual", "automatic"]], [props.panelMount, policies]] as const) {
    if (value !== undefined && !(choices as readonly string[]).includes(value)) throw new Error("Invalid Tabs option");
  }
}

type Model = {
  props: TabsRootProps; value: TabsValue | null; visited: Set<TabsValue>; size: TabsSize; appearance: TabsAppearance; vertical: boolean;
  position: "top" | "bottom" | "start" | "end"; itemAlign: "left" | "center" | "right"; heightClass: string; iconColumn: boolean;
  tabs: Map<TabsValue, HTMLElement>; register: (part: "nav" | "panels") => () => void;
  request: (value: TabsValue, reason: "tab" | "more") => void;
  part: (part: TabsPart) => string | undefined;
};
const TabsContext = createContext<Model | null>(null);
function useTabs() { const context = useContext(TabsContext); if (!context) throw new Error("Tabs parts require Tabs.Root"); return context; }
function usePart(part: "nav" | "panels") { const model = useTabs(); useLayoutEffect(() => model.register(part), [model.register, part]); return model; }

function TabsRoot(props: TabsRootProps) {
  validateTabs(props);
  const density = useDensity(), size = resolveTabsSize(props.size, density), appearance = props.appearance ?? "line";
  const controlled = props.value !== undefined, initiallyControlled = useRef(controlled);
  if (initiallyControlled.current !== controlled) throw new Error("Tabs cannot switch controlled mode");
  const [internal, setInternal] = useState<TabsValue | null>(() => props.defaultValue === null ? null : props.items.find(item => item.value === props.defaultValue && !item.disabled)?.value ?? props.items.find(item => !item.disabled)?.value ?? null);
  const current = controlled ? props.value! : internal;
  const selected = props.items.find(item => item.value === current);
  const fallback = props.items.find(item => !item.disabled)?.value ?? null;
  const value = controlled ? (selected ? current : null) : current !== null && (!selected || selected.disabled) ? fallback : current;
  const initial = useRef(true), onValueChange = useRef(props.onValueChange); onValueChange.current = props.onValueChange;
  useLayoutEffect(() => {
    if (initial.current) {
      initial.current = false;
      if (!controlled && props.defaultValue !== null && props.defaultValue !== value) onValueChange.current?.(value, { reason: "initial", previousValue: props.defaultValue ?? null });
    } else if (!controlled && current !== value) {
      setInternal(value); onValueChange.current?.(value, { reason: selected ? "disabled" : "missing", previousValue: current });
    }
  }, [controlled, current, value, selected, props.defaultValue]);
  useEffect(() => {
    if (controlled && current !== null && !selected) console.warn("Controlled Tabs value has no matching item; owner must correct it.");
  }, [controlled, current, selected]);
  const keys = new Set(props.items.map(item => item.value));
  const [retention, setRetention] = useState(() => ({ known: keys, visited: new Set<TabsValue>(value === null ? [] : [value]) }));
  let visited = retention.visited;
  if (keys.size !== retention.known.size || [...keys].some(key => !retention.known.has(key)) || (value !== null && !visited.has(value))) {
    visited = new Set([...visited].filter(key => keys.has(key))); if (value !== null) visited.add(value);
    setRetention({ known: keys, visited });
  }
  const tabs = useRef(new Map<TabsValue, HTMLElement>()), parts = useRef(new Set<string>());
  const register = useRef((part: "nav" | "panels") => {
    if (parts.current.has(part)) throw new Error("Tabs.Root permits exactly one Nav and one Panels");
    parts.current.add(part); return () => { parts.current.delete(part); };
  }).current;
  useEffect(() => { if (parts.current.size !== 2) throw new Error("Tabs.Root requires one Nav and one Panels"); });
  const part = (name: TabsPart) => getRainLocalRecipePart(props.localRecipe, name);
  const rootRef = useRef<HTMLDivElement>(null), [collapsed, setCollapsed] = useState(false);
  const requestedVertical = props.position === "start" || props.position === "end";
  useLayoutEffect(() => {
    if (!requestedVertical || props.collapseBelow === undefined || !rootRef.current) { setCollapsed(false); return; }
    const root = rootRef.current, threshold = props.collapseBelow;
    const measure = () => {
      const style = getComputedStyle(root);
      const width = parseFloat(style.width) - (style.boxSizing === "border-box" ? parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth) : 0);
      if (Number.isFinite(width) && width > 0) setCollapsed(width < threshold);
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure); observer?.observe(root);
    return () => observer?.disconnect();
  }, [requestedVertical, props.collapseBelow]);
  const position = requestedVertical && props.collapseBelow !== undefined && collapsed ? "top" : props.position ?? "top";
  const vertical = position === "start" || position === "end";
  const labelLines = vertical ? props.labelLines ?? 1 : 1, itemAlign = vertical ? labelLines === 2 ? "left" : props.itemAlign ?? "center" : "center";
  const heightClass = labelLines === 2 ? tabsTwoLineSizeClassNames[size] : tabsSizeClassNames[size];
  const iconColumn = vertical && itemAlign === "left" && props.items.some(item => item.leadingIcon != null);
  const model: Model = { props, value, visited, size, appearance, vertical, position, itemAlign, heightClass, iconColumn, tabs: tabs.current, register, part,
    request: (next, reason) => {
      if (next === value || !props.items.some(item => item.value === next && !item.disabled)) return;
      if (!controlled) setInternal(next);
      onValueChange.current?.(next, { reason, previousValue: value });
    },
  };
  const geometry = tabsSizeRecipes[size], paint = tabsAppearanceRecipes[appearance];
  const style = {
    "--tabs-height": labelLines === 2 ? `var(--rain-tabs-height-two-line-${size})` : `var(--rain-tabs-height-${size})`,
    "--tabs-font": `var(--rain-font-size-${geometry.fontSize})`, "--tabs-line": `var(--rain-line-height-${geometry.lineHeight})`, "--tabs-icon": `${geometry.icon}px`,
    "--tabs-indicator": `${geometry.indicator}px`, "--tabs-gap": `${paint.gap}px`, "--tabs-radius": `${paint.radius}px`,
    "--tabs-paint-radius": `${paint.paintRadius}px`, "--tabs-inset": `${paint.inset}px`, "--tabs-border": `${paint.border}px`,
    "--tabs-padding": `${vertical ? tabsGeometry.verticalPaddingInline : tabsGeometry.paddingInline}px`,
    "--tabs-content-gap": `${paint.contentGap}px`, "--tabs-panel-gap": `${tabsGeometry.panelGap}px`, "--tabs-nav-width": `${tabsGeometry.verticalNavWidth}px`,
    "--tabs-max-indicator": `${geometry.maxContentIndicator}px`, "--tabs-count-font": `var(--rain-font-size-${geometry.countFontSize})`, "--tabs-count-line": `var(--rain-line-height-${geometry.countLineHeight})`,
  } as CSSProperties;
  return <TabsContext.Provider value={model}><PopupProvider><BaseTabs.Root ref={rootRef} id={props.id} value={value} orientation={vertical ? "vertical" : "horizontal"}
    onValueChange={next => { if (typeof next === "number" || typeof next === "string") model.request(next, "tab"); }}
    className={rainCn("rain-tabs", props.className, part("root"))} style={style} data-rain-id="ui-tabs" data-slot="root" data-variant={appearance} data-density={density} data-local-recipe={props.localRecipe?.id} data-appearance={appearance} data-size={size}
    data-position={position} data-label-lines={labelLines} data-width-mode={props.widthMode ?? "natural"} data-align={props.align ?? "start"} data-item-align={itemAlign} data-indicator-size={props.indicatorSize ?? "content"}>
    {props.children}
  </BaseTabs.Root></PopupProvider></TabsContext.Provider>;
}

function TabParts({ item, selected, measure = false, labelRef }: { item: TabsItem; selected: boolean; measure?: boolean; labelRef?: React.RefObject<HTMLSpanElement | null> }) {
  const { appearance, part, iconColumn } = useTabs();
  const state = item.disabled ? selected ? "selectedDisabled" : "disabled" : selected ? "selected" : "normal";
  const paints = tabsPaints[appearance][state], count = formatTabsCount(item);
  return <>
    <span data-part="paint" data-slot="paint" className={rainCn("rain-tabs__paint", paints.paint, paints.border)} aria-hidden="true" />
    <span data-part="content" data-slot="content" className="rain-tabs__item-content">
      {(item.leadingIcon != null || iconColumn) && <span aria-hidden="true" data-part="icon" data-slot="icon" data-placeholder={item.leadingIcon == null || undefined} className={rainCn("rain-tabs__icon", paints.icon, part("icon"))}>{measure ? null : item.leadingIcon}</span>}
      <span ref={labelRef} data-part="label" data-slot="label" className={rainCn("rain-tabs__label", paints.label, part("label"))}>{item.label}</span>
      {count && <span data-part="count" data-slot="count" aria-hidden="true" className={rainCn("rain-tabs__count", paints.count, part("count"))}>{count.display}</span>}
      {appearance === "line" && selected && <span data-part="indicator" data-slot="indicator" aria-hidden="true" className={rainCn("rain-tabs__indicator", tabsPaints.indicator, part("indicator"))} />}
    </span>
  </>;
}

function TabsTab({ item, hidden = false, width }: { item: TabsItem; hidden?: boolean; width?: number }) {
  const model = useTabs(), id = useId(), labelRef = useRef<HTMLSpanElement>(null), count = formatTabsCount(item);
  const selected = model.value === item.value;
  return <TabsFullLabel label={`${item.label}${count ? ` ${count.display}` : ""}`} labelRef={labelRef} hidden={hidden} disabled={Boolean(item.disabled)}>
    <BaseTabs.Tab value={item.value} disabled={item.disabled} hidden={hidden} aria-label={item.label}
      aria-describedby={count ? id : undefined} data-focus="item" data-slot="tab" data-position={model.position} data-item-align={model.itemAlign} data-indicator-size={model.props.indicatorSize ?? "content"} data-part="tab" data-selected={selected} data-disabled={Boolean(item.disabled)}
      className={rainCn("rain-tabs__tab group/tabs", model.heightClass, model.part("tab"))} style={width ? { width } : undefined}
      ref={node => { if (node) model.tabs.set(item.value, node); else model.tabs.delete(item.value); }}
      render={<TabsTooltipTrigger itemDisabled={Boolean(item.disabled)} />}>
      <TabParts item={item} selected={selected} labelRef={labelRef} />
      {count && <span id={id} className="sr-only">{count.description}</span>}
    </BaseTabs.Tab>
  </TabsFullLabel>;
}

function MoreParts({ measure = false }: { measure?: boolean }) {
  const model = useTabs(), paints = tabsPaints[model.appearance].normal;
  return <><span aria-hidden="true" data-part="paint" data-slot="paint" className={rainCn("rain-tabs__paint", paints.paint, paints.border)} />
    <span className="rain-tabs__item-content"><span data-part="label" data-slot="label" className={rainCn("rain-tabs__label", tabsPaints.more.label)}>更多</span>
      <span data-part="icon" data-slot="icon" aria-hidden="true" className={rainCn("rain-tabs__icon", tabsPaints.more.icon)}>{!measure && <MoreHorizontalIcon />}</span>
    </span></>;
}
function MoreItem({ item }: { item: TabsItem }) {
  const id = useId(), count = formatTabsCount(item);
  return <DropdownMenu.RadioItem value={item.value} label={item.label} aria-label={item.label} disabled={item.disabled} leading={item.leadingIcon}
    description={item.disabled ? item.disabledReason : undefined} aria-describedby={count ? id : undefined}
    meta={count ? <><span aria-hidden="true">{count.display}</span><span id={id} className="sr-only">{count.description}</span></> : undefined} />;
}
type TabsLayout = { result: OverflowResult; widths: readonly number[]; order: readonly TabsValue[] };
function TabsNav({ extraStart, extraEnd }: TabsNavProps) {
  const model = usePart("nav"), { props, value, tabs } = model;
  const restorationItem = props.items.find(item => item.value === value && !item.disabled) ?? (props.activationMode === "automatic" ? undefined : props.items.find(item => !item.disabled));
  const [layout, setLayout] = useState<TabsLayout>({ result: { mode: "scroll", reason: "insufficient-width" }, widths: [], order: [] });
  const [open, setOpen] = useState(false), menuItems = useRef<readonly TabsValue[]>([]);
  const navRef = useRef<HTMLDivElement>(null), viewport = useRef<HTMLDivElement>(null), measureLayer = useRef<HTMLDivElement>(null), moreRef = useRef<HTMLElement>(null), menuRef = useRef<HTMLDivElement>(null);
  const entryFallback = useRef<HTMLElement | null>(null), finalTarget = useRef<HTMLElement | null>(null), menuHadFocus = useRef(false);
  const focusRequest = useRef<{ value: TabsValue; kind: "keyboard" | "more" } | null>(null), expireFrame = useRef<number | null>(null);
  const measureNow = useRef<() => void>(() => {});
  const clearEntryFallback = () => { if (entryFallback.current) { entryFallback.current.tabIndex = -1; entryFallback.current = null; } };
  const useMore = !model.vertical && props.overflow !== "scroll";
  const visibleValues = new Set(useMore && layout.result.mode === "more" ? layout.order.slice(layout.result.start, layout.result.end + 1) : props.items.map(item => item.value));
  const hiddenItems = props.items.filter(item => !visibleValues.has(item.value));
  const more = useMore && layout.result.mode === "more" && (hiddenItems.length > 0 || open);
  const previousPosition = useRef(model.position);
  useLayoutEffect(() => {
    if (previousPosition.current === model.position) return;
    previousPosition.current = model.position;
    const active = document.activeElement;
    const focusInsideMenu = active === moreRef.current || Boolean(active && menuRef.current?.contains(active)) || (active === document.body && menuHadFocus.current);
    focusRequest.current = null; finalTarget.current = null;
    if (open) setOpen(false);
    if (focusInsideMenu) {
      const item = restorationItem;
      const target = item ? tabs.get(item.value) : navRef.current;
      finalTarget.current = target ?? null;
      if (item) focusRequest.current = { value: item.value, kind: "keyboard" };
      queueMicrotask(() => { if (!target?.hidden && (document.activeElement === active || document.activeElement === document.body)) target?.focus(); });
    }
    menuHadFocus.current = false;
  }, [model.position, open, restorationItem, tabs]);

  useLayoutEffect(() => {
    let cancelled = false, frame: number | null = null;
    const measure = () => {
      frame = null;
      if (focusRequest.current && !props.items.some(item => item.value === focusRequest.current?.value && !item.disabled)) focusRequest.current = null;
      if (cancelled || open || !viewport.current || !measureLayer.current) return;
      const style = getComputedStyle(viewport.current);
      // Keep layout widths in CSS pixels; viewport rects also include CSS zoom/transforms.
      const widthOf = (node: HTMLElement) => parseFloat(getComputedStyle(node).width);
      const availableWidth = widthOf(viewport.current) - (style.boxSizing === "border-box" ? parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) : 0);
      if (!Number.isFinite(availableWidth) || availableWidth <= 0) return;
      const measured = [...measureLayer.current.querySelectorAll<HTMLElement>('[data-measure-item]')];
      const moreMeasure = measureLayer.current.querySelector<HTMLElement>('[data-measure-more]');
      const moreWidth = moreMeasure ? widthOf(moreMeasure) : 0;
      const recipe = tabsAppearanceRecipes[model.appearance];
      const itemBudget = availableWidth - moreWidth - recipe.gap;
      const naturalWidths = props.items.map((_, index) => Math.max(...measured.slice(index * 2, index * 2 + 2).map(widthOf)));
      const needsMore = useMore && naturalWidths.reduce((sum, width) => sum + width, 0) + Math.max(0, props.items.length - 1) * recipe.gap > availableWidth;
      const minimums = props.items.map((_, index) => Math.max(...measured.slice(index * 2, index * 2 + 2).map(node => {
        const natural = widthOf(node), label = node.querySelector<HTMLElement>('[data-part="label"]')!;
        const nonLabelWidth = natural - widthOf(label);
        return nonLabelWidth + 2 * parseFloat(getComputedStyle(label).fontSize);
      })));
      const equal = !model.vertical && props.widthMode === "equal", minimumEqual = Math.max(0, ...minimums);
      let widths = naturalWidths.map((natural, index) => equal ? minimumEqual : needsMore ? Math.min(natural, Math.max(minimums[index]!, itemBudget)) : natural);
      if (widths.some(width => width <= 0)) return;
      const order = props.items.map(item => item.value);
      const activeValue = props.items.find(item => tabs.get(item.value) === document.activeElement)?.value;
      const requested = focusRequest.current;
      const anchor = requested && (requested.kind === "keyboard" || requested.value === value) ? requested.value : activeValue ?? value ?? props.items.find(item => !item.disabled)?.value ?? order[0];
      const priorValues = layout.result.mode === "scroll" ? [] : layout.order.slice(layout.result.start, layout.result.end + 1);
      const priorIndices = priorValues.map(item => order.indexOf(item)).filter(index => index >= 0);
      const previous: readonly [number, number] | null = priorIndices.length ? [Math.min(...priorIndices), Math.max(...priorIndices)] : null;
      const result: OverflowResult = useMore ? allocateTabsOverflow({ widths, availableWidth,
        moreWidth,
        gap: tabsAppearanceRecipes[model.appearance].gap, frameInline: 0,
        anchorIndex: Math.max(0, order.indexOf(anchor!)), previous }) : { mode: "scroll", reason: "insufficient-width" };
      if (equal && widths.length) {
        const count = result.mode === "more" ? result.end - result.start + 1 : widths.length;
        const budget = availableWidth - (result.mode === "more" ? moreWidth + recipe.gap : 0) - (count - 1) * recipe.gap;
        widths = widths.map(() => Math.max(minimumEqual, budget / count));
      }
      if (result.mode !== "more" && document.activeElement === moreRef.current) {
        if (restorationItem) focusRequest.current = { value: restorationItem.value, kind: "keyboard" };
        else navRef.current?.focus();
      }
      if (JSON.stringify(result) !== JSON.stringify(layout.result) || order.length !== layout.order.length || order.some((item, index) => item !== layout.order[index] || widths[index] !== layout.widths[index])) setLayout({ result, widths, order });
    };
    measureNow.current = measure;
    const schedule = () => { if (!cancelled && frame === null) frame = requestAnimationFrame(measure); };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    if (viewport.current) observer?.observe(viewport.current);
    if (measureLayer.current) observer?.observe(measureLayer.current);
    document.fonts?.ready.then(schedule); document.fonts?.addEventListener("loadingdone", schedule);
    return () => { cancelled = true; if (frame !== null) cancelAnimationFrame(frame); observer?.disconnect(); document.fonts?.removeEventListener("loadingdone", schedule); };
  }, [props.items, props.widthMode, value, restorationItem, model.size, model.appearance, model.vertical, useMore, layout, open, tabs]);
  useLayoutEffect(() => {
    if (!open || menuItems.current.some(key => props.items.some(item => item.value === key))) return;
    const active = document.activeElement;
    const focusInside = active === moreRef.current || Boolean(active && menuRef.current?.contains(active)) || (active === document.body && menuHadFocus.current);
    const item = restorationItem;
    const target = item ? tabs.get(item.value) ?? navRef.current : navRef.current;
    if (focusInside && item) focusRequest.current = { value: item.value, kind: "keyboard" };
    finalTarget.current = focusInside ? target : null;
    setOpen(false);
    if (focusInside) queueMicrotask(() => { if (!target?.hidden && (document.activeElement === active || document.activeElement === document.body)) target?.focus(); });
  }, [open, props.items, restorationItem, tabs]);
  useLayoutEffect(() => {
    clearEntryFallback(); let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const eligible = [...tabs.values()].filter(node => !node.hidden && !node.matches(":disabled"));
      if (!eligible.some(node => node.tabIndex === 0) && eligible[0]) { entryFallback.current = eligible[0]; eligible[0].tabIndex = 0; }
      const pending = focusRequest.current;
      if (pending && !open && (pending.kind === "keyboard" || pending.value === value)) {
        const target = tabs.get(pending.value), active = document.activeElement;
        const focusStillHere = active === document.body || (pending.kind === "keyboard" ? [...tabs.values()].some(node => node === active) : active === moreRef.current || Boolean(active && menuRef.current?.contains(active)));
        if (target && !target.hidden && !target.matches(":disabled") && focusStillHere) { finalTarget.current = target; target.focus(); focusRequest.current = null; }
      }
    });
    return () => { cancelled = true; clearEntryFallback(); };
  }, [props.items, value, tabs, layout, open]);
  useEffect(() => () => { if (expireFrame.current !== null) cancelAnimationFrame(expireFrame.current); }, []);

  const revealBoundary: NonNullable<BaseTabs.List.Props["onKeyDown"]> = event => {
    const target = event.target as HTMLElement;
    if (target.closest('[role="tablist"]') !== event.currentTarget || !target.matches('[role="tab"]') || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const keys = model.vertical ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];
    if (![...keys, "Home", "End"].includes(event.key)) return;
    const enabled = props.items.filter(item => !item.disabled), current = enabled.findIndex(item => tabs.get(item.value) === target);
    const next = event.key === "Home" ? 0 : event.key === "End" ? enabled.length - 1 : (current + (event.key === keys[1] ? 1 : -1) + enabled.length) % enabled.length;
    const item = enabled[next];
    if (!item || !tabs.get(item.value)?.hidden) return;
    event.preventDefault(); event.preventBaseUIHandler(); focusRequest.current = { value: item.value, kind: "keyboard" }; measureNow.current();
  };
  const fromMore = (next: unknown) => {
    if (typeof next !== "string" && typeof next !== "number") return;
    focusRequest.current = { value: next, kind: "more" }; model.request(next, "more"); setOpen(false);
    if (expireFrame.current !== null) cancelAnimationFrame(expireFrame.current);
    // Only this close cycle may hand off focus; an asynchronously accepted intent cannot steal it later.
    expireFrame.current = requestAnimationFrame(() => { focusRequest.current = null; expireFrame.current = null; });
  };
  return <div ref={navRef} tabIndex={-1} aria-label="分区导航" data-part="nav" data-slot="nav" data-position={model.position} data-appearance={model.appearance} data-align={props.align ?? "start"} className={rainCn("rain-tabs__nav", model.part("nav"))}>
    <div className="rain-tabs__nav-row">
      {extraStart != null && <div data-part="extra-start" data-slot="extra-start" className={model.part("extra-start")}>{extraStart}</div>}
      <div ref={viewport} className="rain-tabs__viewport" data-mode={model.vertical ? "scroll" : more ? "more" : layout.result.mode}>
        <div className={rainCn("rain-tabs__tray", model.appearance === "contained" && tabsPaints.tray)}>
          <BaseTabs.List data-part="list" data-slot="list" className={rainCn("rain-tabs__list", model.part("list"))} aria-label={props["aria-label"]} aria-labelledby={props["aria-labelledby"]}
            aria-describedby={props["aria-describedby"]} activateOnFocus={props.activationMode === "automatic"} onFocusCapture={clearEntryFallback} onKeyDown={revealBoundary}
            onBlurCapture={event => { if (focusRequest.current?.kind === "keyboard" && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) focusRequest.current = null; }}>
            {props.items.map(item => <TabsTab key={itemKey(item.value)} item={item} hidden={!visibleValues.has(item.value)}
              width={model.vertical ? undefined : layout.widths[layout.order.indexOf(item.value)]} />)}
          </BaseTabs.List>
          {more && <DropdownMenu.Root open={open} onOpenChange={(next, details) => {
            if (next) { menuHadFocus.current = false; menuItems.current = hiddenItems.map(item => item.value); finalTarget.current = null; }
            if (!next && ["outside-press", "focus-out"].includes(details.reason)) { finalTarget.current = null; focusRequest.current = null; }
            setOpen(next);
          }}>
            <DropdownMenu.Trigger ref={moreRef} aria-label="更多分区" data-part="more" data-slot="more" data-focus="item"
              onFocus={() => { menuHadFocus.current = true; }} onBlur={event => { if (event.relatedTarget && !menuRef.current?.contains(event.relatedTarget)) menuHadFocus.current = false; }}
              className={rainCn("rain-tabs__more group/tabs", tabsSizeClassNames[model.size], model.part("more"))}><MoreParts /></DropdownMenu.Trigger>
            <DropdownMenu.Content ref={menuRef} onFocusCapture={() => { menuHadFocus.current = true; }} onBlurCapture={event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) menuHadFocus.current = false; }} finalFocus={interaction => finalTarget.current ?? (interaction === "keyboard" ? moreRef.current : false)}>
              <DropdownMenu.RadioGroup value={value} onValueChange={fromMore}>
                {menuItems.current.flatMap(key => { const item = props.items.find(item => item.value === key); return item ? [<MoreItem key={itemKey(key)} item={item} />] : []; })}
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>}
        </div>
      </div>
      {extraEnd != null && <div data-part="extra-end" data-slot="extra-end" className={model.part("extra-end")}>{extraEnd}</div>}
      {model.appearance === "line" && props.showDivider && <span aria-hidden="true" data-part="divider" data-slot="divider" className={rainCn("rain-tabs__divider", tabsPaints.divider)} />}
    </div>
    <TabsDisabledDescription items={props.items} />
    <div ref={measureLayer} className="rain-tabs__measure" aria-hidden="true" inert>
      {props.items.flatMap(item => [false, true].map(selected => <span key={`${itemKey(item.value)}:${selected}`} data-measure-item data-selected={selected}
        className={rainCn("rain-tabs__measure-item", tabsSizeClassNames[model.size], model.part("tab"))}><TabParts item={item} selected={selected} measure /></span>))}
      <span data-measure-more className={rainCn("rain-tabs__measure-item", tabsSizeClassNames[model.size], model.part("more"))}><MoreParts measure /></span>
    </div>
  </div>;
}

function TabsPanels() {
  const model = usePart("panels");
  return <div className="rain-tabs__panels">{model.props.items.map(item => {
    const policy = item.panelMount ?? model.props.panelMount ?? "lazy-retain";
    const mount = model.value === item.value || policy === "eager-retain" || (policy === "lazy-retain" && model.visited.has(item.value));
    return <BaseTabs.Panel key={itemKey(item.value)} value={item.value} keepMounted data-part="panel" data-slot="panel" className={model.part("panel")}>{mount ? item.content : null}</BaseTabs.Panel>;
  })}</div>;
}
function CompleteTabs({ extraStart, extraEnd, ...props }: TabsProps) {
  return <TabsRoot {...props}><TabsNav extraStart={extraStart} extraEnd={extraEnd} /><TabsPanels /></TabsRoot>;
}
export const Tabs = Object.assign(CompleteTabs, { Root: TabsRoot, Nav: TabsNav, Panels: TabsPanels });
