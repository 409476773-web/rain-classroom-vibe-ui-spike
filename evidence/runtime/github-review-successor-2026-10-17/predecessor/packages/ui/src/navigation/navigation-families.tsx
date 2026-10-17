import { useId, type MouseEvent, type ReactNode } from "react";
import { useDensity } from "@rain-next/foundations";
import { RadioControl, RadioGroup, type RadioGroupProps, type RadioOption, type RadioPart } from "../radio/radio";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { Tooltip } from "../tooltip/tooltip";

export type NavigationContent = "simple" | "info" | "identity" | "summary" | "preview";
export interface NavigationContentItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: ReactNode;
  readonly count?: number | string;
  readonly description?: string;
  /** Passive business metadata; interactive content belongs in actions. */
  readonly meta?: ReactNode;
  readonly status?: ReactNode;
  readonly preview?: ReactNode;
  readonly progress?: number;
  readonly disabled?: boolean;
  /** Independent controls, rendered beside the main entry. */
  readonly actions?: ReactNode;
}
export interface NavigationListItem extends NavigationContentItem {
  readonly href: string;
  readonly group?: string;
}
export interface NavigationListProps {
  items: readonly NavigationListItem[];
  activeId: string | null;
  "aria-label": string;
  appearance?: "inset" | "icons";
  onNavigate?: (id: string, event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  loading?: boolean;
  error?: string;
  emptyLabel?: string;
}
export interface ObjectNavigatorProps {
  items: readonly NavigationContentItem[];
  value: string | null;
  onValueChange: (id: string) => void;
  "aria-label": string;
  appearance?: "queue" | "cards" | "preview";
  content?: NavigationContent;
  className?: string;
  loading?: boolean;
  error?: string;
  emptyLabel?: string;
}

function validateItems(items: readonly NavigationContentItem[], label: string) {
  if (!label.trim() || !Array.isArray(items) || new Set(items.map(item => item.id)).size !== items.length || items.some(item => !item.id?.trim() || !item.label?.trim()
    || (item.progress !== undefined && (!Number.isFinite(item.progress) || item.progress < 0 || item.progress > 100)))) {
    throw new Error("Navigation families require an accessible name, unique nonempty string IDs, labels and progress from 0 to 100.");
  }
}

function itemDescriptionIds(item: NavigationContentItem, content: NavigationContent, prefix: string) {
  return content === "simple" ? undefined : [item.description && "description", item.meta !== undefined && "metadata", item.count !== undefined && "count", item.status !== undefined && "status", item.progress !== undefined && "progress"]
    .filter(Boolean).map(slot => `${prefix}-${slot}`).join(" ") || undefined;
}

function ItemContent({ item, content, idPrefix }: { item: NavigationContentItem; content: NavigationContent; idPrefix: string }) {
  const detail = content !== "simple";
  return <>
    {content === "preview" && item.preview !== undefined && <span data-slot="preview" className="rain-navigation-family__preview" aria-hidden="true">{item.preview}</span>}
    {item.icon && <span data-slot="leading" className="rain-navigation-family__leading" aria-hidden="true">{item.icon}</span>}
    <span data-slot="content" className="rain-navigation-family__content">
      <span data-slot="label" className="rain-navigation-family__label">{item.label}</span>
      {detail && item.description && <span id={`${idPrefix}-description`} data-slot="description" className="rain-navigation-family__description">{item.description}</span>}
      {detail && item.meta !== undefined && <span id={`${idPrefix}-metadata`} data-slot="metadata" className="rain-navigation-family__metadata">{item.meta}</span>}
      {detail && item.progress !== undefined && <span data-slot="progress" className="rain-navigation-family__progress" role="progressbar" aria-label={`${item.label}完成进度`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.progress}><span data-slot="progress-fill" aria-hidden="true" style={{ width: `${item.progress}%` }} /><span id={`${idPrefix}-progress`} className="sr-only">完成 {item.progress}%</span></span>}
    </span>
    {detail && item.count !== undefined && <span id={`${idPrefix}-count`} data-slot="count" className="rain-navigation-family__count">{item.count}</span>}
    {detail && item.status !== undefined && <span id={`${idPrefix}-status`} data-slot="status" className="rain-navigation-family__status">{item.status}</span>}
  </>;
}

function CollectionStatus({ loading, error, empty, emptyLabel }: { loading?: boolean; error?: string; empty: boolean; emptyLabel: string }) {
  return <>{error && <p role="alert" className="rain-navigation-family__message">{error}</p>}
    {loading ? <p role="status" className="rain-navigation-family__message">正在加载…</p> : !error && empty && <p role="status" className="rain-navigation-family__message">{emptyLabel}</p>}</>;
}

/** Route/function destinations use native links; host onNavigate is the route adapter. */
export function NavigationList({ items, activeId, "aria-label": label, appearance = "inset", onNavigate, className, loading, error, emptyLabel = "暂无可用导航" }: NavigationListProps) {
  const instanceId = useId();
  validateItems(items, label);
  if (items.some(item => !item.href?.trim())) throw new Error("NavigationList requires a native destination href for every item.");
  if (appearance === "icons" && items.some(item => !item.icon)) throw new Error("Icon navigation requires an identifiable icon for each destination.");
  return <nav aria-label={label} aria-busy={loading || undefined} data-rain-id="ui-navigation-list" data-slot="root" data-appearance={appearance}
    className={rainCn("rain-navigation-family rain-navigation-list", className)}>
    <ul data-slot="track" className="rain-navigation-family__track">{items.map((item, index) => {
      const entry = <a href={item.disabled ? undefined : item.href} aria-disabled={item.disabled || undefined} tabIndex={item.disabled ? -1 : undefined}
        aria-label={item.label} aria-describedby={itemDescriptionIds(item, "info", `${instanceId}-${encodeURIComponent(item.id)}`)} title={appearance === "icons" ? undefined : item.label} aria-current={item.id === activeId ? "page" : undefined} data-slot="entry" className="rain-navigation-family__entry" onClick={event => {
          if (item.disabled) { event.preventDefault(); return; }
          if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) onNavigate?.(item.id, event);
        }}><ItemContent item={item} content="info" idPrefix={`${instanceId}-${encodeURIComponent(item.id)}`} /></a>;
      return <li key={item.id} data-slot="item" data-active={item.id === activeId} data-disabled={item.disabled || undefined} className="rain-navigation-family__item">
      {item.group && item.group !== items[index - 1]?.group && <span data-slot="group-label" className="rain-navigation-list__group">{item.group}</span>}
      <div className="rain-navigation-family__row">
        {appearance === "icons" ? <Tooltip text={item.label} placement="right" portal disabled={item.disabled}>{entry}</Tooltip> : entry}
        {item.actions && <span data-slot="trailing-action" className="rain-navigation-family__actions">{item.actions}</span>}
      </div>
    </li>;})}</ul>
    <CollectionStatus loading={loading} error={error} empty={!items.length} emptyLabel={emptyLabel} />
  </nav>;
}

/** A collection of object choices and sibling actions, deliberately not a listbox. */
export function ObjectNavigator({ items, value, onValueChange, "aria-label": label, appearance = "cards", content = appearance === "preview" ? "preview" : appearance === "queue" ? "identity" : "summary", className, loading, error, emptyLabel = "暂无可用对象" }: ObjectNavigatorProps) {
  const instanceId = useId();
  validateItems(items, label);
  if (typeof onValueChange !== "function" || (value !== null && (typeof value !== "string" || !value.trim()))) throw new Error("ObjectNavigator requires a controlled string ID or null and onValueChange.");
  const unavailable = value !== null && !items.some(item => item.id === value);
  return <div role="group" aria-label={label} aria-busy={loading || undefined} data-rain-id="ui-object-navigator" data-slot="root" data-appearance={appearance} data-content={content}
    className={rainCn("rain-navigation-family rain-object-navigator", className)}>
    <ul data-slot="track" className="rain-navigation-family__track">{items.map(item => <li key={item.id} data-slot="item" data-active={item.id === value} data-disabled={item.disabled || undefined} className="rain-navigation-family__item">
      <div className="rain-navigation-family__row">
        <button type="button" aria-label={item.label} aria-describedby={itemDescriptionIds(item, content, `${instanceId}-${encodeURIComponent(item.id)}`)} title={item.label} aria-pressed={item.id === value} disabled={loading || item.disabled} data-slot="entry" className="rain-navigation-family__entry"
          onClick={() => { if (item.id !== value) onValueChange(item.id); }}><ItemContent item={item} content={content} idPrefix={`${instanceId}-${encodeURIComponent(item.id)}`} /></button>
        {item.actions && <span data-slot="trailing-action" className="rain-navigation-family__actions">{item.actions}</span>}
      </div>
    </li>)}</ul>
    <CollectionStatus loading={loading} error={error} empty={!items.length} emptyLabel={emptyLabel} />
    {unavailable && <p role="status" className="rain-navigation-family__message">当前对象已不可用，请重新选择。</p>}
  </div>;
}

const segmentedRecipe = defineRainLocalRecipe<RadioPart, "ui-radio">({
  id: "navigation-v042-segmented", scope: "feature", origin: "ui-radio",
  classes: { root: "rain-segmented-control__option", label: "rain-segmented-control__label" }, modifiedParts: ["root", "label"],
  candidateTokens: ["--rain-local-navigation-segment-track", "--rain-local-navigation-segment-current", "--rain-local-navigation-segment-height"], promotionStatus: "not-proposed",
});
export interface SegmentedControlOption extends RadioOption { readonly icon?: ReactNode; readonly count?: number | string }
type WithSegmentedOptions<Props> = Props extends unknown ? Omit<Props, "options" | "renderOption" | "localRecipe" | "orientation" | "legendHidden"> & {
  options: readonly SegmentedControlOption[];
  appearance?: "segmented" | "white-line" | "white-soft";
  tone?: "neutral" | "inverse";
  density?: "regular" | "compact";
  iconOnly?: boolean;
} : never;
export type SegmentedControlProps = WithSegmentedOptions<RadioGroupProps>;

/** Existing RadioGroup owns selection, native keyboard behavior, form submission and reset. */
export function SegmentedControl({ options, appearance = "segmented", tone = "neutral", density, iconOnly = false, className, ...props }: SegmentedControlProps) {
  const contextDensity = useDensity();
  if (iconOnly && options.some(option => !option.icon)) throw new Error("Icon segmented controls require identifiable icons for every option.");
  const visual = new Map(options.map(option => [option.value, option]));
  return <div data-rain-id="ui-segmented-control" data-slot="root" data-appearance={appearance} data-tone={tone} data-nav-density={density ?? (contextDensity === "compact" ? "compact" : "regular")} data-icon-only={iconOnly}
    className={rainCn("rain-navigation-family rain-segmented-control", className)}>
    <RadioGroup {...props} legendHidden orientation="horizontal" className="rain-segmented-control__group" data-appearance={appearance}
      options={options.map(({ value, label, description, disabled }) => ({ value, label, description, disabled }))}
      renderOption={radioProps => {
        const option = visual.get(radioProps.value)!;
        return <RadioControl {...radioProps} localRecipe={segmentedRecipe} renderContent={({ labelId, descriptionId }) => <>
          {option.icon && <span data-slot="leading" className="rain-segmented-control__icon" aria-hidden="true">{option.icon}</span>}
          <span id={labelId} data-slot="label" className={rainCn("rain-segmented-control__label", iconOnly && "sr-only")}>{option.label}</span>
          {option.count !== undefined && <span data-slot="count" className="rain-segmented-control__count" aria-hidden="true">{option.count}</span>}
          {option.description && <span id={descriptionId} className="sr-only">{option.description}</span>}
        </>} />;
      }} />
  </div>;
}
