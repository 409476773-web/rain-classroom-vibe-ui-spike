import { Children, createContext, forwardRef, useContext, useImperativeHandle, useLayoutEffect, useRef, useState,
  type AnchorHTMLAttributes, type HTMLAttributes, type LiHTMLAttributes, type ReactNode, type Ref } from "react";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu";
import { Tooltip } from "../tooltip/tooltip";
import { ArrowDownIcon } from "../icons/arrow-down";
import { MoreHorizontalIcon } from "../icons/more-horizontal";
import { rainCn } from "../utils/rain-class-names";
import "./breadcrumb.css";

export interface BreadcrumbDestination { id: string; label: string; href?: string; disabled?: boolean }
export interface BreadcrumbEntry extends BreadcrumbDestination { siblings?: readonly BreadcrumbDestination[] }
export type BreadcrumbProps = HTMLAttributes<HTMLElement> & { items?: readonly BreadcrumbEntry[] };
export type BreadcrumbLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean };
const ItemContext = createContext<{ open: boolean; setOpen: (open: boolean) => void } | null>(null);
const controlClass = "rain-breadcrumb-control relative min-w-0 rounded-rain-6 px-rain-4 font-rain-ui font-rain-regular no-underline outline-none";

const Root = forwardRef<HTMLElement, BreadcrumbProps>(function Root({ className, items, children, "aria-label": ariaLabel = "面包屑", ...props }, ref) {
  if (items && children != null) throw new Error("Breadcrumb accepts either items or compound children, not both.");
  return <nav {...props} ref={ref} aria-label={ariaLabel} data-rain-id="ui-breadcrumb" data-slot="root" data-size="13"
    className={rainCn("rain-breadcrumb relative min-w-0 font-rain-ui text-rain-size-13 leading-rain-18 text-rain-category-text-neutral-4", className)}>
    {items ? <Trail items={items} /> : children}
  </nav>;
});
const List = forwardRef<HTMLOListElement, HTMLAttributes<HTMLOListElement>>(function List({ className, ...props }, ref) {
  return <ol {...props} ref={ref} data-slot="list" className={rainCn("rain-breadcrumb-list flex min-w-0 items-center p-rain-0 m-rain-0 list-none", className)} />;
});
const Item = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(function Item({ className, ...props }, ref) {
  const [open, setOpen] = useState(false);
  return <ItemContext.Provider value={{ open, setOpen }}><li {...props} ref={ref} data-slot="item" data-open={open || undefined}
    className={rainCn("rain-breadcrumb-item inline-flex min-w-0 items-center", className)} /></ItemContext.Provider>;
});

function useFullLabel<T extends HTMLElement>(forwardedRef: Ref<T>, children: ReactNode) {
  const nodeRef = useRef<T>(null), [label, setLabel] = useState({ text: "", clipped: false });
  useImperativeHandle(forwardedRef, () => nodeRef.current!, []);
  useLayoutEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const text = node.textContent ?? "", clipped = node.scrollWidth > node.clientWidth;
      setLabel(previous => previous.text === text && previous.clipped === clipped ? previous : { text, clipped });
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(node);
    document.fonts?.ready.then(measure); document.fonts?.addEventListener("loadingdone", measure);
    return () => { active = false; observer?.disconnect(); document.fonts?.removeEventListener("loadingdone", measure); };
  }, [children]);
  return { nodeRef, ...label, menuOpen: useContext(ItemContext)?.open ?? false };
}

const Link = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(function Link({ className, disabled = false, children, onClick, href, tabIndex, ...props }, ref) {
  const label = useFullLabel(ref, children);
  const unavailable = disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
  return <Tooltip text={label.text} disabled={!label.clipped || label.menuOpen || unavailable} placement="top" portal>
    <a {...props} ref={label.nodeRef} href={unavailable ? undefined : href} tabIndex={unavailable ? -1 : tabIndex}
      aria-disabled={unavailable || undefined} data-slot="link" data-disabled={unavailable || undefined}
      onClick={event => { if (unavailable) { event.preventDefault(); event.stopPropagation(); } else onClick?.(event); }}
      className={rainCn(controlClass, "rain-breadcrumb-link", className)}>{children}</a>
  </Tooltip>;
});
const Text = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function Text({ className, children, tabIndex, ...props }, ref) {
  const label = useFullLabel(ref, children), current = props["aria-current"] === "page";
  return <Tooltip text={label.text} disabled={!label.clipped || label.menuOpen} placement="top" portal>
    <span {...props} ref={label.nodeRef} tabIndex={tabIndex ?? (label.clipped ? 0 : undefined)}
      data-slot={current ? "page" : "text"} data-state={current ? "current" : undefined}
      className={rainCn(controlClass, "rain-breadcrumb-text", current && "text-rain-category-text-neutral-1", className)}>{children}</span>
  </Tooltip>;
});
const Page = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function Page(props, ref) {
  return <Text {...props} ref={ref} aria-current="page" />;
});
const Separator = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(function Separator({ children = "/", className, ...props }, ref) {
  return <li {...props} ref={ref} role="presentation" data-slot="separator" aria-hidden="true"
    className={rainCn("rain-breadcrumb-separator shrink-0", className)}>{children}</li>;
});
const Ellipsis = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function Ellipsis({ children, className, ...props }, ref) {
  return <span {...props} ref={ref} data-slot="ellipsis" aria-hidden="true" className={rainCn("inline-flex items-center justify-center", className)}>
    {children ?? <MoreHorizontalIcon className="size-rain-icon-14" />}
  </span>;
});

export interface BreadcrumbMenuProps { label: string; text?: string; current?: boolean; children: ReactNode; disabled?: boolean; overflow?: boolean }
function BreadcrumbMenu({ label, text = label, current = false, children, disabled, overflow = false }: BreadcrumbMenuProps) {
  const item = useContext(ItemContext), fullLabel = useFullLabel<HTMLSpanElement>(null, text);
  const [tipOpen, setTipOpen] = useState(false);
  if (!item) throw new Error("Breadcrumb.Menu must be inside Breadcrumb.Item.");
  if (!Children.toArray(children).length) return null;
  return <DropdownMenu.Root open={item.open} onOpenChange={open => item.setOpen(open)}>
    <DropdownMenu.Trigger disabled={disabled} aria-label={label} aria-current={current ? "page" : undefined}
      data-slot="menu-trigger" data-overflow={overflow || undefined}
      className={rainCn(controlClass, "rain-breadcrumb-trigger", !overflow && "rain-breadcrumb-menu-control")}
      onFocus={() => setTipOpen(true)} onBlur={() => setTipOpen(false)}
      onPointerDown={() => setTipOpen(false)} onMouseEnter={() => setTipOpen(true)} onMouseLeave={() => setTipOpen(false)}
      onClick={event => event.stopPropagation()}>
      {overflow ? <Ellipsis /> : <>
        <Tooltip text={text} open={tipOpen && fullLabel.clipped && !item.open && !disabled}
          onOpenChange={setTipOpen} disabled={!fullLabel.clipped || item.open || disabled} placement="top" portal>
          <span ref={fullLabel.nodeRef} className="rain-breadcrumb-menu-label">{text}</span>
        </Tooltip>
        <ArrowDownIcon aria-hidden="true" className="rain-breadcrumb-chevron size-rain-icon-10" />
      </>}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content className="rain-breadcrumb-menu" positionerProps={{ align: "end" }}>{children}</DropdownMenu.Content>
  </DropdownMenu.Root>;
}
function MenuLinks({ items, selectedId }: { items: readonly BreadcrumbDestination[]; selectedId?: string }) {
  return <>{items.map(item => item.href
    ? item.disabled
      ? <DropdownMenu.Item key={item.id} disabled label={item.label} selected={item.id === selectedId} />
      : <DropdownMenu.LinkItem key={item.id} href={item.href} label={item.label} selected={item.id === selectedId} />
    : <DropdownMenu.GroupLabel key={item.id}>{item.label}</DropdownMenu.GroupLabel>)}</>;
}
function hasSiblings(item: BreadcrumbEntry) { return item.siblings?.some(sibling => sibling.id !== item.id && Boolean(sibling.href) && !sibling.disabled) ?? false; }

function Trail({ items }: { items: readonly BreadcrumbEntry[] }) {
  const probe = useRef<HTMLDivElement>(null), restoreFocus = useRef<"overflow" | "ancestor" | null>(null);
  const [mode, setMode] = useState<"all" | "root" | "tail">("all");
  useLayoutEffect(() => {
    const measureNode = probe.current, root = measureNode?.parentElement;
    if (!measureNode || !root) return;
    let active = true;
    const measure = () => {
      if (!active || !root.clientWidth) return;
      const widths = [...measureNode.querySelectorAll<HTMLElement>("[data-measure-item]")].map(node => node.getBoundingClientRect().width);
      const separator = measureNode.querySelector<HTMLElement>("[data-measure-separator]")!.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(measureNode).columnGap) || 0;
      const more = measureNode.querySelector<HTMLElement>("[data-measure-overflow]")!.getBoundingClientRect().width;
      const between = separator + gap * 2, tailWidth = widths.slice(-2).reduce((sum, width) => sum + width, 0);
      const fullWidth = widths.reduce((sum, width) => sum + width, 0) + Math.max(0, widths.length - 1) * between;
      const next = widths.length <= 2 || fullWidth <= root.clientWidth ? "all"
        : widths.length > 3 && widths[0]! + more + tailWidth + between * 3 <= root.clientWidth ? "root" : "tail";
      const focused = document.activeElement?.closest<HTMLElement>("[data-breadcrumb-id]")
        ?? root.querySelector<HTMLElement>('[aria-expanded="true"]')?.closest<HTMLElement>("[data-breadcrumb-id]");
      const focusedIndex = focused && root.contains(focused) ? items.findIndex(item => item.id === focused.dataset.breadcrumbId) : -1;
      if (focusedIndex >= 0 && focusedIndex < items.length - 2 && next !== "all" && !(next === "root" && focusedIndex === 0)) restoreFocus.current = "overflow";
      const overflow = root.querySelector<HTMLElement>('[data-overflow="true"]');
      if (next === "all" && overflow && (document.activeElement === overflow || overflow.getAttribute("aria-expanded") === "true")) restoreFocus.current = "ancestor";
      setMode(next);
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(root); observer?.observe(measureNode);
    document.fonts?.ready.then(measure); document.fonts?.addEventListener("loadingdone", measure);
    return () => { active = false; observer?.disconnect(); document.fonts?.removeEventListener("loadingdone", measure); };
  }, [items]);
  useLayoutEffect(() => {
    if (!restoreFocus.current) return;
    const root = probe.current?.parentElement;
    const target = root?.querySelector<HTMLElement>(restoreFocus.current === "overflow" ? '[data-overflow="true"]' : 'ol a[href], ol button:not(:disabled), ol [tabindex="0"]');
    if (target) target.focus();
    else if (root) { root.tabIndex = -1; root.focus(); }
    restoreFocus.current = null;
  }, [mode]);

  const ids = new Set<string>();
  for (const item of items) {
    if (!item.id || ids.has(item.id) || !item.label.trim()) throw new Error("Breadcrumb items require unique IDs and non-empty labels.");
    ids.add(item.id);
  }
  const start = mode === "root" ? 1 : 0, end = Math.max(start, items.length - 2);
  const hidden = mode === "all" ? [] : items.slice(start, end);
  const visible = items.flatMap((item, index) => {
    if (hidden.length && index === start) return [null];
    if (hidden.length && index > start && index < end) return [];
    return [item];
  });
  return <>
    <List data-collapse={hidden.length ? mode : "none"}>{visible.map((entry, index) => {
      const current = entry?.id === items.at(-1)?.id;
      return <Item key={entry ? "item:" + entry.id : "overflow"} data-breadcrumb-id={entry?.id} data-priority={index >= visible.length - 2 ? "tail" : "ancestor"}>
        {index > 0 && <span className="rain-breadcrumb-separator" data-slot="separator" aria-hidden="true">/</span>}
        {entry ? hasSiblings(entry)
          ? <BreadcrumbMenu label={"切换" + entry.label + "的同级页面"} text={entry.label} current={current} disabled={entry.disabled}>
              <MenuLinks items={entry.siblings!.some(sibling => sibling.id === entry.id) ? entry.siblings! : [entry, ...entry.siblings!]} selectedId={entry.id} />
            </BreadcrumbMenu>
          : current ? <Page>{entry.label}</Page> : entry.href ? <Link href={entry.href} disabled={entry.disabled}>{entry.label}</Link> : <Text>{entry.label}</Text>
          : <BreadcrumbMenu label="查看隐藏的上级路径" overflow><MenuLinks items={hidden} /></BreadcrumbMenu>}

      </Item>;
    })}</List>
    <div ref={probe} className="rain-breadcrumb-measure" aria-hidden="true" inert>
      {items.map((item, index) => <span key={item.id} data-measure-item className="rain-breadcrumb-item" data-priority={index >= items.length - 2 ? "tail" : "ancestor"}>
        {hasSiblings(item) ? <span className={rainCn(controlClass, "rain-breadcrumb-trigger rain-breadcrumb-menu-control")}><span className="rain-breadcrumb-menu-label">{item.label}</span><span className="rain-breadcrumb-chevron" /></span> : <span className={controlClass}>{item.label}</span>}
      </span>)}
      <span data-measure-separator className="rain-breadcrumb-separator">/</span><span data-measure-overflow className="rain-breadcrumb-trigger" />
    </div>
  </>;
}
const Back = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps & { icon?: ReactNode }>(function Back({ icon, children, ...props }, ref) {
  return <Link {...props} ref={ref}>{icon}{children}</Link>;
});
export const Breadcrumb = Object.assign(Root, { List, Item, Link, Text, Page, Separator, Ellipsis, Back, Menu: BreadcrumbMenu });
