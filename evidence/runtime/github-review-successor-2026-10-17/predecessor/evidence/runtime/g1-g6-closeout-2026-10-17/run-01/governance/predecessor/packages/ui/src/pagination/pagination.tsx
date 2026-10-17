import { forwardRef, useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, useState, type ComponentPropsWithoutRef, type MouseEvent, type ReactNode } from "react";
import { iconSizeClassNames, useDensity } from "@rain-next/foundations";
import { ArrowLeftIcon } from "@rain-next/ui/icons/arrow-left";
import { ArrowRightIcon } from "@rain-next/ui/icons/arrow-right";
import { MoreHorizontalIcon } from "@rain-next/ui/icons/more-horizontal";
import { MoreVerticalIcon } from "@rain-next/ui/icons/more-vertical";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { IconButton } from "../icon-button/icon-button";
import { Button } from "../button/button";
import { Input } from "../input/input";
import { FormItemContext } from "../input/form-item";
import { Popover } from "../popover/popover";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { assertPaginationInteger, buildPaginationItems, pageAfterSizeChange, parseJumpPage, totalPageCount, type PaginationItem } from "./pagination.utils";
import { paginationGroupClassName, paginationIconButtonRecipe, paginationIconClassName, paginationLinkClassName, paginationListClassName, paginationPageClassName, paginationRootClassName, paginationSizeTypography } from "./pagination.styles";
import "./pagination.css";

export type PaginationSize = 24 | 28 | 32;
export type PaginationVariant = "basic" | "data" | "simple";
export type PaginationPart = "root" | "summary" | "total" | "page-size" | "page-size-value" | "page-size-unit" | "settings-trigger" | "settings" | "actions" | "navigation" | "page" | "ellipsis" | "previous" | "next" | "current-status" | "jumper" | "jump-input" | "jump-submit" | "jump-error";
export interface PaginationChangeDetails { page: number; pageSize: number; reason: "page" | "page-size" | "jump" | "ellipsis" }
interface PaginationBaseProps extends Omit<ComponentPropsWithoutRef<"nav">, "children" | "onChange" | "style" | "defaultValue"> {
  page?: number;
  defaultPage?: number;
  pageSize?: number;
  defaultPageSize?: number;
  onChange?: (details: PaginationChangeDetails) => void;
  variant?: PaginationVariant;
  size?: PaginationSize;
  showTotal?: boolean | "range";
  showPageSize?: boolean;
  pageSizeOptions?: readonly number[];
  pageSizePlacement?: "settings" | "inline";
  showJumper?: boolean;
  hideOnSinglePage?: boolean;
  align?: "start" | "center" | "end";
  responsive?: boolean;
  showLessItems?: boolean;
  disabled?: boolean;
  loading?: boolean;
  getPageHref?: (page: number) => string;
  renderPage?: (page: number) => ReactNode;
  localRecipe?: RainLocalRecipe<PaginationPart, "ui-pagination">;
}
export type PaginationProps = PaginationBaseProps & (
  | { total: number; hasNextPage?: never }
  | { total?: undefined; hasNextPage: boolean }
);
type PageState = { page: number; pageSize: number };
type Proposal = { from: PageState; next: PageState; pageControlled: boolean; sizeControlled: boolean };
type Activation = { origin: HTMLElement; next: PageState; from: PageState; reason: PaginationChangeDetails["reason"] };
const defaultOptions = [10, 20, 50, 100] as const;
const sameState = (left: PageState, right: PageState) => left.page === right.page && left.pageSize === right.pageSize;

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination({
  total, hasNextPage, page: controlledPage, defaultPage = 1, pageSize: controlledPageSize, defaultPageSize = 20,
  onChange, variant = "basic", size, showTotal = variant === "data", showPageSize = variant === "data",
  pageSizeOptions = defaultOptions, pageSizePlacement = "settings", showJumper = true, hideOnSinglePage = false, align, responsive = true,
  showLessItems = false, disabled = false, loading = false, getPageHref, renderPage, localRecipe, className,
  "aria-label": ariaLabel = "分页", ...nativeProps
}, forwardedRef) {
  const density = useDensity(), generatedId = useId();
  const resolvedSize = size ?? (density === "compact" ? 24 : 32);
  const resolvedAlign = align ?? (variant === "data" ? "between" : "start");
  for (const [name, value] of [["page", controlledPage], ["defaultPage", defaultPage], ["pageSize", controlledPageSize], ["defaultPageSize", defaultPageSize]] as const) {
    if (value !== undefined) assertPaginationInteger(name, value);
  }
  if (total !== undefined) assertPaginationInteger("total", total, 0);
  else if (typeof hasNextPage !== "boolean") throw new Error("Pagination requires total or an explicit hasNextPage boolean.");
  if (![24, 28, 32].includes(resolvedSize)) throw new Error("Pagination size must be 24, 28 or 32.");
  if (!["basic", "data", "simple"].includes(variant)) throw new Error("Pagination variant must be basic, data or simple.");
  if (align !== undefined && !["start", "center", "end"].includes(align)) throw new Error("Pagination align must be start, center or end.");
  if (![true, false, "range"].includes(showTotal)) throw new Error("Pagination showTotal must be boolean or range.");
  if (!["settings", "inline"].includes(pageSizePlacement)) throw new Error("Pagination pageSizePlacement must be settings or inline.");
  if (!Array.isArray(pageSizeOptions) || !pageSizeOptions.length || new Set(pageSizeOptions).size !== pageSizeOptions.length) {
    throw new Error("Pagination pageSizeOptions must contain unique positive safe integers.");
  }
  pageSizeOptions.forEach((option) => assertPaginationInteger("pageSizeOptions", option));

  const [own, setOwn] = useState<PageState>({ page: defaultPage, pageSize: defaultPageSize });
  const pageSize = controlledPageSize ?? own.pageSize;
  const totalPages = total === undefined ? undefined : totalPageCount(total, pageSize);
  const page = Math.min(controlledPage ?? own.page, totalPages ?? Number.MAX_SAFE_INTEGER);
  const current = { page, pageSize };
  const blocked = disabled || loading;
  const [jumpValue, setJumpValue] = useState("");
  const [jumpError, setJumpError] = useState<string>();
  const [fit, setFit] = useState<"full" | "less" | "simple">("full");
  const [hideSummary, setHideSummary] = useState(false), [collapseSize, setCollapseSize] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null), fullMeasureRef = useRef<HTMLDivElement>(null), lessMeasureRef = useRef<HTMLDivElement>(null);
  const simpleMeasureRef = useRef<HTMLDivElement>(null), totalMeasureRef = useRef<HTMLSpanElement>(null), sizeMeasureRef = useRef<HTMLSpanElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null), jumpRef = useRef<HTMLInputElement>(null);
  const pending = useRef<Proposal | null>(null), activation = useRef<Activation | null>(null);
  const resizeFocus = useRef<{ origin: HTMLElement; presentation: string } | null>(null);
  const composing = useRef(false);
  useImperativeHandle(forwardedRef, () => rootRef.current!, []);
  const part = (name: PaginationPart) => getRainLocalRecipePart(localRecipe, name);
  const fullItems = totalPages === undefined ? [] : buildPaginationItems(page, totalPages);
  const lessItems = totalPages === undefined ? [] : buildPaginationItems(page, totalPages, true);
  const presentation = total === undefined || variant === "simple" ? "simple" : responsive && fit === "simple" ? "simple" : showLessItems || responsive && fit === "less" ? "less" : "full";
  const items = presentation === "less" ? lessItems : fullItems;
  const showNavigation = !(hideOnSinglePage && totalPages === 1);
  const errorId = `rain-pagination-${generatedId}-error`;
  const inputId = `rain-pagination-${generatedId}-jump`;
  const iconSize = resolvedSize === 24 ? 12 : resolvedSize === 28 ? 14 : 16;
  const iconButtonSize = resolvedSize === 24 ? "24/12" : resolvedSize === 28 ? "28/14" : "32/16";
  const options = [...new Set([...pageSizeOptions, pageSize])].sort((a, b) => a - b);
  const totalText = showTotal && total !== undefined ? showTotal === "range" && total > 0
    ? `第 ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} 条，共 ${total} 条` : `共 ${total} 条` : "";
  const statusText = totalPages === undefined ? `第 ${page} 页` : `${page} / ${totalPages}`;
  const canJump = showJumper && totalPages !== undefined;
  const hasSettings = showPageSize || canJump || hideSummary && !!totalText;
  const inlineSize = showPageSize && pageSizePlacement === "inline" && !collapseSize;

  useLayoutEffect(() => {
    const proposal = pending.current;
    if (proposal) {
      const pageAccepted = !proposal.pageControlled || controlledPage === proposal.next.page;
      const sizeAccepted = !proposal.sizeControlled || controlledPageSize === proposal.next.pageSize;
      if (pageAccepted && sizeAccepted) {
        pending.current = null;
        setOwn((previous) => ({ page: controlledPage === undefined ? proposal.next.page : previous.page, pageSize: controlledPageSize === undefined ? proposal.next.pageSize : previous.pageSize }));
      } else if (proposal.pageControlled !== (controlledPage !== undefined) || proposal.sizeControlled !== (controlledPageSize !== undefined)
        || !pageAccepted && page !== proposal.from.page || !sizeAccepted && pageSize !== proposal.from.pageSize
        || !proposal.pageControlled && page !== proposal.from.page
        || total !== undefined && proposal.next.page > totalPageCount(total, proposal.next.pageSize)) {
        pending.current = null;
        activation.current = null;
      }
    }
    if (!pending.current && controlledPage === undefined && own.page !== page) setOwn((previous) => ({ ...previous, page }));
  }, [controlledPage, controlledPageSize, page, pageSize, own.page, total]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !responsive) { setHideSummary(false); setCollapseSize(false); return; }
    const measure = () => {
      if (!root.clientWidth) return;
      const style = getComputedStyle(root);
      const available = root.clientWidth - (parseFloat(style.paddingInlineStart || style.paddingLeft) || 0)
        - (parseFloat(style.paddingInlineEnd || style.paddingRight) || 0);
      const full = fullMeasureRef.current?.scrollWidth ?? 0, less = lessMeasureRef.current?.scrollWidth ?? 0;
      const simple = simpleMeasureRef.current?.scrollWidth ?? 0;
      const totalWidth = totalMeasureRef.current?.scrollWidth ?? 0;
      const rootGap = parseFloat(style.columnGap) || 0;
      const actions = root.querySelector<HTMLElement>('[data-slot="actions"]');
      const actionGap = actions ? parseFloat(getComputedStyle(actions).columnGap) || 0 : 0;
      const inlineWidth = sizeMeasureRef.current?.scrollWidth || resolvedSize;
      const shouldCollapseSize = showPageSize && pageSizePlacement === "inline" && simple + inlineWidth + (showNavigation ? actionGap : 0) > available;
      const triggerWidth = showPageSize || canJump ? (pageSizePlacement === "inline" && showPageSize && !shouldCollapseSize ? inlineWidth : resolvedSize) : 0;
      const extras = triggerWidth + (showNavigation && triggerWidth ? actionGap : 0) + totalWidth + (totalWidth && (showNavigation || triggerWidth) ? rootGap : 0);
      const nextFit = available >= full + extras ? "full" : available >= less + extras ? "less" : "simple";
      const nextPresentation = total === undefined || variant === "simple" ? "simple" : showLessItems && nextFit === "full" ? "less" : nextFit;
      const focused = root.ownerDocument.activeElement;
      if (focused instanceof HTMLElement && (nextPresentation !== root.dataset.presentation && root.querySelector('[data-slot="navigation"]')?.contains(focused)
        || (showPageSize && pageSizePlacement === "inline" && !shouldCollapseSize) !== (root.dataset.inlineSize === "true") && focused.hasAttribute("data-pagination-settings-trigger"))) {
        resizeFocus.current = { origin: focused, presentation: nextPresentation };
      }
      setFit(nextFit);
      setHideSummary(simple + extras > available);
      setCollapseSize(shouldCollapseSize);
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    [root, fullMeasureRef.current, lessMeasureRef.current, simpleMeasureRef.current, totalMeasureRef.current, sizeMeasureRef.current].forEach((element) => { if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, [responsive, total, variant, page, pageSize, resolvedSize, renderPage, showLessItems, showNavigation, showPageSize, canJump, totalText, pageSizePlacement]);

  useEffect(() => { if (disabled) setSettingsOpen(false); }, [disabled]);
  useEffect(() => {
    if (!settingsOpen || !canJump) composing.current = false;
  }, [settingsOpen, canJump]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cancelExternalFocus = (event: FocusEvent) => {
      if (!root.contains(event.target as Node) && !settingsRef.current?.contains(event.target as Node)) { activation.current = null; resizeFocus.current = null; }
    };
    root.ownerDocument.addEventListener("focusin", cancelExternalFocus);
    return () => root.ownerDocument.removeEventListener("focusin", cancelExternalFocus);
  }, []);

  useLayoutEffect(() => {
    const resized = resizeFocus.current;
    if (resized && presentation === resized.presentation) {
      resizeFocus.current = null;
      const root = rootRef.current!;
      if (!resized.origin.isConnected && root.ownerDocument.activeElement === root.ownerDocument.body) {
        (resized.origin.hasAttribute("data-pagination-settings-trigger") ? root.querySelector<HTMLElement>('[data-pagination-settings-trigger]')
          : root.querySelector<HTMLElement>('[aria-current="page"]') ?? statusRef.current)?.focus({ preventScroll: true });
      }
    }
    const intent = activation.current;
    if (!intent || !sameState(current, intent.next)) return;
    activation.current = null;
    if (intent.reason === "jump") { setJumpValue(""); setJumpError(undefined); }
    if (settingsRef.current?.contains(intent.origin)) { setSettingsOpen(false); return; }
    const root = rootRef.current!, document = root.ownerDocument, focused = document.activeElement;
    if (focused !== intent.origin && !(focused === document.body && !intent.origin.isConnected)) return;
    if (intent.origin.isConnected && !intent.origin.matches(":disabled,[aria-disabled=true]")) return;
    const destination = root.querySelector<HTMLElement>('[aria-current="page"]') ?? statusRef.current;
    destination?.focus({ preventScroll: true });
  });

  function propose(next: PageState, reason: PaginationChangeDetails["reason"], origin?: HTMLElement) {
    if (blocked || sameState(current, next)) return;
    pending.current = null;
    activation.current = origin ? { origin, from: current, next, reason } : null;
    const pageControlled = controlledPage !== undefined, sizeControlled = controlledPageSize !== undefined;
    if (pageControlled && next.page !== page || sizeControlled && next.pageSize !== pageSize) {
      pending.current = { from: current, next, pageControlled, sizeControlled };
    } else {
      setOwn((previous) => ({ page: pageControlled ? previous.page : next.page, pageSize: sizeControlled ? previous.pageSize : next.pageSize }));
    }
    onChange?.({ ...next, reason });
  }

  function submitJump(origin: HTMLElement) {
    if (blocked || composing.current || totalPages === undefined) return;
    const parsed = parseJumpPage(jumpValue, totalPages);
    setJumpError(parsed.error);
    if (parsed.error) { jumpRef.current?.focus(); return; }
    if (parsed.page !== null) {
      if (getPageHref && !onChange) rootRef.current?.ownerDocument.defaultView?.location.assign(pageHref(parsed.page));
      else if (parsed.page === page) { setJumpValue(""); setSettingsOpen(false); }
      else propose({ page: parsed.page, pageSize }, "jump", origin);
    }
  }

  function pageHref(target: number) {
    const href = getPageHref!(target);
    if (typeof href !== "string" || !href.trim() || !["http:", "https:"].includes(new URL(href, "https://rain.invalid").protocol)) {
      throw new Error("Pagination getPageHref must return a relative URL or an HTTP(S) URL.");
    }
    return href;
  }

  function navigationControl(target: number, slot: "previous" | "next" | "page" | "ellipsis", label: string, content: ReactNode, unavailable = false) {
    const isCurrent = slot === "page" && target === page;
    const reason = slot === "ellipsis" ? "ellipsis" : "page";
    const unavailableNow = disabled || unavailable;
    const classNames = rainCn(paginationPageClassName, slot !== "page" && paginationIconClassName, part(slot));
    if (getPageHref) {
      const disabledLink = unavailableNow || loading;
      return <a href={disabledLink ? undefined : pageHref(target)} role="link" className={rainCn(classNames, paginationLinkClassName)}
        aria-label={label} aria-current={isCurrent ? "page" : undefined} aria-disabled={disabledLink || undefined} tabIndex={disabledLink ? -1 : undefined}
        data-slot={slot} data-current={isCurrent || undefined} data-focus="item" onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          if (disabledLink) { event.preventDefault(); return; }
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          if (onChange) { event.preventDefault(); propose({ page: target, pageSize }, reason, event.currentTarget); }
        }}>{content}</a>;
    }
    if (slot !== "page") {
      const icon = slot === "previous" ? <ArrowLeftIcon /> : slot === "next" ? <ArrowRightIcon /> : <MoreHorizontalIcon />;
      return <IconButton icon={icon} size={iconButtonSize} aria-label={label} disabled={unavailableNow} aria-disabled={loading || undefined}
        localRecipe={paginationIconButtonRecipe} className={part(slot)} onClick={(event) => propose({ page: target, pageSize }, reason, event.currentTarget)} />;
    }
    return <button type="button" className={classNames} aria-label={label} aria-current={isCurrent ? "page" : undefined}
      data-slot={slot} data-current={isCurrent || undefined} data-focus="item" disabled={unavailableNow} aria-disabled={loading || undefined}
      onClick={(event) => propose({ page: target, pageSize }, reason, event.currentTarget)}>{content}</button>;
  }

  const arrow = (direction: "previous" | "next") => <span aria-hidden="true" className={rainCn("inline-flex [&>.rain-icon]:size-full", iconSizeClassNames[iconSize])}>
    {direction === "previous" ? <ArrowLeftIcon /> : <ArrowRightIcon />}</span>;
  const pageContent = (value: number) => renderPage?.(value) ?? value;
  const renderItem = (item: PaginationItem) => <li key={`${item.type}-${item.page}`} data-slot="item">
    {item.type === "page" ? navigationControl(item.page, "page", `第 ${item.page} 页`, pageContent(item.page))
      : navigationControl(item.page, "ellipsis", `向${item.type === "previous-ellipsis" ? "前" : "后"}跳转至第 ${item.page} 页`,
        <span aria-hidden="true" className={rainCn("inline-flex [&>.rain-icon]:size-full", iconSizeClassNames[iconSize])}><MoreHorizontalIcon /></span>)}
  </li>;
  const renderMeasure = (list: PaginationItem[], kind: "full" | "less") => <div ref={kind === "full" ? fullMeasureRef : lessMeasureRef}
    data-measure={kind} className={rainCn(paginationListClassName, "rain-pagination__measure")} aria-hidden="true" inert>
    <span className={paginationPageClassName} />{list.map((item) => <span key={`${item.type}-${item.page}`} className={paginationPageClassName}>
      {item.type === "page" ? pageContent(item.page) : null}</span>)}<span className={paginationPageClassName} />
  </div>;

  const sizeLabel = <><span data-slot="page-size-value" className={rainCn("text-rain-category-text-neutral-1", part("page-size-value"))}>{pageSize}</span>
    <span data-slot="page-size-unit" className={rainCn("rain-type-ui-compact text-rain-category-text-neutral-3", part("page-size-unit"))}>条/页</span>
    <span aria-hidden="true" aria-disabled={blocked || undefined} className={rainCn("inline-flex [&>.rain-icon]:size-full", paginationIconClassName, iconSizeClassNames[12])}><ArrowDownIcon /></span></>;

  return <FormItemContext.Provider value={null}><nav {...nativeProps} ref={rootRef} aria-label={ariaLabel} aria-busy={loading || undefined}
    className={rainCn(paginationRootClassName, paginationSizeTypography[resolvedSize], className, part("root"))}
    data-rain-id="ui-pagination" data-slot="root" data-variant={variant} data-size={resolvedSize} data-density={density}
    data-state={disabled ? "disabled" : loading ? "loading" : "default"} data-align={resolvedAlign} data-presentation={presentation} data-inline-size={inlineSize || undefined} data-local-recipe={localRecipe?.id}>
    {totalText && !hideSummary && <div data-slot="summary" className={rainCn(paginationGroupClassName, part("summary"))}>
      <span data-slot="total" className={part("total")}>{totalText}</span>
    </div>}
    {(showNavigation || hasSettings) && <div data-slot="actions" className={rainCn(paginationGroupClassName, part("actions"))}>
      {showNavigation && <div data-slot="navigation" className={part("navigation")}>
        <ul className={rainCn(paginationListClassName, presentation === "simple" && "rain-pagination__simple")}>
          <li data-slot="previous">{navigationControl(Math.max(1, page - 1), "previous", "上一页", arrow("previous"), page === 1)}</li>
          {presentation === "simple" ? <li className="min-w-0"><span ref={statusRef} tabIndex={-1} aria-current="page" aria-label={totalPages === undefined ? statusText : `第 ${page} 页，共 ${totalPages} 页`} data-focus="item" data-slot="current-status" className={part("current-status")}>
            {statusText}
          </span></li> : items.map(renderItem)}
          <li data-slot="next">{navigationControl(Math.min(Number.MAX_SAFE_INTEGER, page + 1), "next", "下一页", arrow("next"), totalPages === undefined ? !hasNextPage || page === Number.MAX_SAFE_INTEGER : page >= totalPages)}</li>
        </ul>
      </div>}
      {hasSettings && <Popover.Root open={settingsOpen} onOpenChange={(open, details) => {
        if (open && blocked) { details.cancel(); return; }
        setSettingsOpen(open);
        if (!open) { setJumpValue(""); setJumpError(undefined); activation.current = null; }
      }}>
        <Popover.Trigger aria-label="分页设置" title={showPageSize ? `每页 ${pageSize} 条；分页设置` : "分页设置"}
          data-pagination-settings-trigger="" disabled={disabled} aria-disabled={loading || undefined}
          render={inlineSize
            ? <button type="button" className={rainCn(paginationPageClassName, "rain-pagination__size-trigger", part("settings-trigger"))}>{sizeLabel}</button>
            : <IconButton icon={<MoreVerticalIcon />} size={iconButtonSize} aria-label="分页设置" localRecipe={paginationIconButtonRecipe} className={part("settings-trigger")} />} />
        <Popover.Content ref={settingsRef} aria-label="分页设置" width={180} positionerProps={{ align: "end" }}>
          <div data-slot="settings" data-size={resolvedSize} className={rainCn("rain-pagination__settings flex flex-col gap-rain-12 text-rain-category-text-neutral-3", paginationSizeTypography[resolvedSize], part("settings"))}>
            {hideSummary && totalText && <span data-slot="total" className={part("total")}>{totalText}</span>}
            {showPageSize && <div data-slot="page-size" className={rainCn("flex flex-col gap-rain-4", part("page-size"))}>
              <span>每页条数</span>
              <div role="group" aria-label="每页显示数量" className="rain-pagination__size-options flex gap-rain-4">
                {options.map(value => <button key={value} type="button" className={paginationPageClassName} aria-label={`每页 ${value} 条`}
                  aria-pressed={value === pageSize} data-current={value === pageSize || undefined} disabled={disabled} aria-disabled={loading || undefined}
                  onClick={event => {
                    if (blocked) return;
                    if (value === pageSize) setSettingsOpen(false);
                    else propose({ page: pageAfterSizeChange(page, pageSize, value, total), pageSize: value }, "page-size", event.currentTarget);
                  }}>{value}</button>)}
              </div>
            </div>}
      {canJump && <div data-slot="jumper" className={rainCn("flex min-w-0 flex-col gap-rain-4", part("jumper"))}>
        <label htmlFor={inputId}>跳至页码</label>
        <Input ref={jumpRef} id={inputId} aria-label="跳转到页码" className={rainCn("rain-pagination__jumper-input", part("jump-input"))}
          size={resolvedSize} value={jumpValue} onValueChange={(value) => {
            activation.current = null;
            setJumpValue(value); setJumpError(undefined);
          }}
          inputMode="numeric" clearable={false} disabled={disabled} readOnly={loading} status={jumpError ? "error" : "default"}
          trailingAction={<Button variant="text" tone="brand" size={resolvedSize === 24 ? "compact" : "regular"} tabIndex={0}
            className={part("jump-submit")} onClick={(event) => submitJump(event.currentTarget)}>跳转</Button>}
          aria-describedby={jumpError ? errorId : undefined} onCompositionStart={() => { composing.current = true; }} onCompositionEnd={() => { composing.current = false; }}
          onPressEnter={(event) => { event.preventDefault(); submitJump(event.currentTarget); }} />
        {jumpError && <span id={errorId} data-slot="jump-error" role="alert" className={rainCn("w-full text-rain-category-text-red-1", part("jump-error"))}>{jumpError}</span>}
      </div>}
          </div>
        </Popover.Content>
      </Popover.Root>}
    </div>}
    {responsive && <div className="rain-pagination__measure-clip" aria-hidden="true" inert>
      {showNavigation && <>{renderMeasure(fullItems, "full")}{renderMeasure(lessItems, "less")}</>}
      <div ref={simpleMeasureRef} data-measure="simple" className={rainCn(paginationListClassName, "rain-pagination__measure")}>
        {showNavigation && <><span className={paginationPageClassName} /><span>{statusText}</span><span className={paginationPageClassName} /></>}
      </div>
      <span ref={totalMeasureRef} data-measure="total" className="rain-pagination__measure">{totalText}</span>
      <span ref={sizeMeasureRef} data-measure="size" className={rainCn(paginationPageClassName, "rain-pagination__size-trigger rain-pagination__measure")}>{sizeLabel}</span>
    </div>}
  </nav></FormItemContext.Provider>;
});
