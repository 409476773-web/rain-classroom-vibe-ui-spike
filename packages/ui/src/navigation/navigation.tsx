import { useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Tabs, type TabsProps, type TabsRootProps } from "../tabs/tabs";
import { Popover } from "../popover/popover";
import { SearchInput } from "../input/search-input";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { CloseIcon } from "../icons/close";
import { CheckBoldIcon } from "@rain-next/ui/icons/check-bold";
import { rainCn } from "../utils/rain-class-names";

export interface NavigationSurfaceParts { track: ReactNode; panels: ReactNode }
export type NavigationSurfaceRenderer = (parts: NavigationSurfaceParts) => ReactNode;
export type NavigationTabsProps = Extract<TabsProps, { position?: "top" | "bottom" }> & { position?: "top"; renderSurface?: NavigationSurfaceRenderer };
export type NavigationTabsRootProps = Extract<TabsRootProps, { position?: "top" | "bottom" }> & { position?: "top" };

function NavigationTabsRoot({ visualPreset = "navigation-line", className, ...props }: NavigationTabsRootProps) {
  return <Tabs.Root {...props} overflow={props.overflow ?? (visualPreset === "navigation-browser" ? "scroll" : undefined)} visualPreset={visualPreset} className={rainCn("rain-navigation", className)} />;
}
function CompleteNavigationTabs({ renderSurface, extraStart, extraEnd, ...props }: NavigationTabsProps) {
  const parts = { track: <Tabs.Nav extraStart={extraStart} extraEnd={extraEnd} />, panels: <Tabs.Panels /> };
  return <NavigationTabsRoot {...props}>{renderSurface ? renderSurface(parts) : <>{parts.track}{parts.panels}</>}</NavigationTabsRoot>;
}
export const NavigationTabs = Object.assign(CompleteNavigationTabs, { Root: NavigationTabsRoot, Nav: Tabs.Nav, Panels: Tabs.Panels });

export interface NavigationBarItem { readonly id: string; readonly label: string; readonly href: string; readonly count?: number | string; readonly icon?: ReactNode }
export interface NavigationBarProps {
  items: readonly NavigationBarItem[];
  activeId: string | null;
  "aria-label": string;
  onNavigate?: (id: string, event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}
export function NavigationBar({ items, activeId, onNavigate, className, "aria-label": label }: NavigationBarProps) {
  if (!label.trim() || new Set(items.map(item => item.id)).size !== items.length || items.some(item => !item.id.trim() || !item.label.trim() || !item.href.trim())) throw new Error("NavigationBar requires a name and unique named destinations");
  return <nav aria-label={label} data-rain-id="ui-navigation-bar" data-visual-preset="navigation-line" className={rainCn("rain-navigation rain-navigation__bar", className)}>
    <div className="rain-tabs__list">{items.map(item => <a key={item.id} href={item.href} aria-label={item.label} aria-current={item.id === activeId ? "page" : undefined} data-selected={item.id === activeId} className="rain-tabs__tab" onClick={event => {
      if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) onNavigate?.(item.id, event);
    }}><span className="rain-tabs__item-content">
      {item.icon && <span className="rain-tabs__icon" aria-hidden="true">{item.icon}</span>}
      <span className="rain-tabs__label" data-label={item.label}><span>{item.label}</span></span>
      {item.count !== undefined && <span className="rain-tabs__count" aria-hidden="true">{item.count}</span>}
    </span></a>)}</div>
  </nav>;
}

export interface ScopeNavigationItem {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly icon?: ReactNode;
  readonly disabled?: boolean;
}
export interface ScopeNavigationProps {
  /** First item is the shared resource scope and remains the first visible item. */
  items: readonly ScopeNavigationItem[];
  value: string | null;
  onValueChange: (id: string) => void;
  visibleLimit?: 3 | 4 | 5;
  children?: ReactNode;
  renderSurface?: NavigationSurfaceRenderer;
  "aria-label"?: string;
  className?: string;
  loading?: boolean;
  error?: string;
}

export function visibleScopeItems(items: readonly ScopeNavigationItem[], value: string | null, limit: number) {
  const count = Math.max(items.length > 1 ? 2 : 1, Math.floor(limit));
  const visible = items.slice(0, count);
  const current = items.find(item => item.id === value);
  if (current && !visible.includes(current)) visible[visible.length - 1] = current;
  return visible;
}

export function ScopeNavigation({ items, value, onValueChange, visibleLimit = 4, children, renderSurface, className, loading = false, error, "aria-label": label = "课程内容范围" }: ScopeNavigationProps) {
  const ids = new Set(items.map(item => item.id));
  if (ids.size !== items.length || items.some(item => !item.id.trim() || !item.label.trim())) throw new Error("ScopeNavigation requires unique nonempty ids and labels");
  if (![3, 4, 5].includes(visibleLimit)) throw new Error("ScopeNavigation visibleLimit must be 3, 4 or 5");
  const root = useRef<HTMLDivElement>(null), search = useRef<HTMLInputElement>(null);
  const [fit, setFit] = useState<number>(visibleLimit), [open, setOpen] = useState(false), [query, setQuery] = useState("");
  const pendingFocus = useRef<string | null>(null);
  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const measure = () => {
      const width = node.clientWidth;
      // Approved vUpdateScope budget: controls/insets reserve 188px, each visible slot budgets 186px.
      if (width > 0) setFit(Math.min(visibleLimit, Math.max(2, Math.floor((width - 188) / 186))));
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(node);
    return () => observer?.disconnect();
  }, [visibleLimit]);
  const visible = visibleScopeItems(items, value, Math.min(fit, visibleLimit));
  const hiddenCount = items.slice(1).filter(item => !visible.includes(item)).length;
  const selected = items.some(item => item.id === value) ? value : null;
  const term = query.trim().toLocaleLowerCase();
  const results = items.filter(item => `${item.label} ${item.description ?? ""}`.toLocaleLowerCase().includes(term));
  const choose = (id: string) => { pendingFocus.current = id; onValueChange(id); setOpen(false); };
  const more = hiddenCount > 0 && <Popover.Root open={open} onOpenChange={next => { setOpen(next); if (next) setQuery(""); }}>
    <Popover.Trigger className="rain-scope-navigation__more" aria-label="更多班级" aria-description={`还有 ${hiddenCount} 个班级未展示`} disabled={loading}><span>更多班级</span><span className="rain-scope-navigation__count">{hiddenCount}</span><ArrowDownIcon aria-hidden="true" /></Popover.Trigger>
    <Popover.Content width={360} positionerProps={{ side: "bottom", align: "end" }} className="rain-navigation-scope-popup rain-navigation-scope-dropdown" initialFocus={search} finalFocus={() => {
      const accepted = pendingFocus.current === value;
      pendingFocus.current = null;
      return accepted ? root.current?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]') ?? true : true;
    }}>
      <div className="rain-scope-navigation__heading"><Popover.Title>选择课程内容范围</Popover.Title><Popover.Close aria-label="关闭范围选择" className="rain-scope-navigation__close"><CloseIcon aria-hidden="true" /></Popover.Close></div>
      <SearchInput ref={search} aria-label="搜索范围" placeholder="搜索班级名称或序号" value={query} onValueChange={setQuery} searchLabel="查找" />
      <div className="rain-scope-navigation__results" aria-label="范围搜索结果">
        {results.map(item => <button type="button" key={item.id} aria-pressed={item.id === value} disabled={item.disabled} className="rain-scope-navigation__result" onClick={() => choose(item.id)}>
          {item.icon && <span aria-hidden="true" className="rain-scope-navigation__result-icon">{item.icon}</span>}
          <span className="rain-scope-navigation__result-label"><strong>{item.label}</strong>{item.description && <small>{item.description}</small>}</span>
          {item.id === value && <CheckBoldIcon className="rain-scope-navigation__check" aria-hidden="true" />}
        </button>)}
        {!results.length && <p role="status">没有匹配的范围</p>}
      </div>
    </Popover.Content>
  </Popover.Root>;
  const parts = { track: <Tabs.Nav extraEnd={more} />, panels: <Tabs.Panels sharedContent={children ?? null} /> };
  return <div ref={root} className={rainCn("rain-scope-navigation", className)} data-rain-id="ui-scope-navigation" aria-busy={loading}>
    <NavigationTabs.Root items={visible.map(item => ({ value: item.id, label: item.label, description: item.description, leadingIcon: item.icon, disabled: item.disabled, content: null }))}
      value={selected} onValueChange={next => { if (typeof next === "string") onValueChange(next); }} aria-label={label} visualPreset="navigation-browser" overflow="scroll">
      {renderSurface ? renderSurface(parts) : <>{parts.track}{parts.panels}</>}
    </NavigationTabs.Root>
    {error && <p role="alert">{error}</p>}
    {!loading && !items.length && <p role="status">暂无可用范围</p>}
    {value !== null && selected === null && <p role="status">当前范围已不可用，请重新选择。</p>}
  </div>;
}
