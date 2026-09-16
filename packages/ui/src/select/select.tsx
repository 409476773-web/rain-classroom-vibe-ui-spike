import { forwardRef, useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { iconSizeClassNames, selectActionSizeClassName, selectSizeClassNames, useDensity, type SelectSize } from "@rain-next/foundations";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { ArrowUpIcon } from "@rain-next/ui/icons/arrow-up";
import { CircleCloseFilledIcon } from "@rain-next/ui/icons/circle-close-filled";
import { CheckBoldIcon } from "@rain-next/ui/icons/check-bold";
import { SearchIcon } from "@rain-next/ui/icons/search";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Combobox } from "@base-ui/react/combobox";
import { PopupProvider, popupSurfaceClassName, usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu";
import { menuItemClassName, menuGroupLabelClassName } from "../dropdown-menu/dropdown-menu.styles";
import { Tag, type TagLocalRecipe } from "../tag/tag";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { FormItemContext, InsideFieldLabel, useFormItem } from "../input/form-item";
import { fieldFrameRecipe } from "../field/field.styles";
import { rainCn } from "../utils/rain-class-names";
import { getRainLocalRecipePart } from "../recipes/local-recipe";
import { filterSelectOptions, groupSelectOptions, selectValues, validateSelect } from "./select.utils";
import { selectRootClassName, selectControlClassName, selectPlaceholderClassName, selectCountClassName,
  selectArrowClassName, selectClearClassName, selectActionIconClassName, selectedValueClassName,
  selectRemoveClassName, selectSecondaryClassName, selectIndicatorClassName } from "./select.styles";
import type { FieldAppearance, FieldStatus } from "../field/field.styles";
import type {
  AriaAttributes, FocusEventHandler, 
} from "react";
import type { RainLocalRecipe } from "../recipes/local-recipe";

export type SelectValue = string | number;
export type { SelectSize } from "@rain-next/foundations";
export type SelectAppearance = FieldAppearance;
export type SelectStatus = FieldStatus;
export type SelectPart =
  | "root" | "frame" | "value" | "clear-action" | "arrow"
  | "tag" | "tag-remove" | "popup" | "search" | "option";

export interface SelectOption {
  value: SelectValue;
  label: string;
  description?: string;
  group?: string;
  disabled?: boolean;
}

export interface SelectChangeDetails {
  reason: "select" | "deselect" | "remove" | "clear";
  option?: SelectOption;
  selectedOptions: readonly SelectOption[];
}

interface SelectBaseProps extends Pick<AriaAttributes,
  "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-invalid"> {
  options: readonly SelectOption[];
  selectedOptions?: readonly SelectOption[];
  appearance?: SelectAppearance;
  status?: SelectStatus;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  id?: string;
  placeholder?: string;
  clearable?: boolean;
  clearLabel?: string;
  searchable?: boolean;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchValueChange?: (query: string) => void;
  filterOption?: false | ((query: string, option: SelectOption) => boolean);
  searchPlaceholder?: string;
  loading?: boolean;
  loadError?: string;
  onRetry?: () => void;
  emptyText?: string;
  noResultsText?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  className?: string;
  localRecipe?: RainLocalRecipe<SelectPart, "ui-select">;
}

type SelectSingleProps = {
  multiple?: false;
  value?: SelectValue | null;
  defaultValue?: SelectValue | null;
  onValueChange?: (value: SelectValue | null, details: SelectChangeDetails) => void;
  size?: SelectSize;
  display?: never;
  maxCount?: never;
};

type SelectMultipleProps = {
  multiple: true;
  value?: readonly SelectValue[];
  defaultValue?: readonly SelectValue[];
  onValueChange?: (value: readonly SelectValue[], details: SelectChangeDetails) => void;
  maxCount?: number;
} & (
  | { display?: "summary" | "count"; size?: SelectSize }
  | { display: "tags"; size?: 32 | 36 }
);

export type SelectProps = SelectBaseProps & (SelectSingleProps | SelectMultipleProps);
export interface SelectHandle { focus(options?: FocusOptions): void }

function SelectionSummary({ labels, countOnly }: { labels: string[]; countOnly: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(2);
  useLayoutEffect(() => {
    const element = ref.current!;
    const fit = () => {
      if (!element.clientWidth) return;
      const candidates = [...element.querySelectorAll<HTMLElement>("[data-measure]")];
      setVisible(candidates.reduce((count, candidate, index) => candidate.offsetWidth <= element.clientWidth ? index + 1 : count, 0));
    };
    fit();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    return () => observer.disconnect();
  }, [labels.join("\u0000")]);
  const shown = countOnly ? 0 : Math.min(visible, labels.length);
  const content = (count: number) => <>{count ? <span className="truncate">{labels.slice(0, count).join("、")}</span> : null}
    {labels.length > count ? <span className={selectCountClassName}>{count ? `+${labels.length - count}` : `已选 ${labels.length} 项`}</span> : null}</>;
  return <span ref={ref} className="relative flex min-w-0 flex-1 items-center gap-rain-4 overflow-hidden" title={labels.join("、")}>
    {content(shown)}
    {[1, 2].filter((count) => count <= labels.length).map((count) => <span key={count} data-measure aria-hidden="true"
      className="pointer-events-none invisible absolute flex w-max items-center gap-rain-4 whitespace-nowrap">{content(count)}</span>)}
  </span>;
}

function SelectedValue({ value, label, size, editable, onRemove, localRecipe }: {
  value: SelectValue; label: string; size: 32 | 36; editable: boolean; onRemove: () => void; localRecipe?: SelectProps["localRecipe"];
}) {
  const recipe: TagLocalRecipe = {
    id: "select-selected-value", scope: "feature", origin: "ui-tag",
    classes: {
      root: rainCn(selectedValueClassName(size), "border-none text-rain-size-14 leading-rain-20", getRainLocalRecipePart(localRecipe, "tag")),
      content: "flex-1",
      "remove-action": rainCn(selectRemoveClassName, "self-center", getRainLocalRecipePart(localRecipe, "tag-remove")),
    },
    modifiedParts: ["root", "content", "remove-action"], candidateTokens: [], promotionStatus: "not-proposed",
  };
  return <span data-slot="tag" data-value={JSON.stringify(value)} className="inline-flex min-w-0 max-w-full flex-none">
    <Tag size={size === 32 ? 24 : 28} title={label} localRecipe={recipe}
      onRemove={editable ? onRemove : undefined} removeLabel={`移除 ${label}`}>{label}</Tag>
  </span>;
}

const SelectControl = forwardRef<SelectHandle, SelectProps>(function SelectControl(props, forwardedRef) {
  const density = useDensity(), field = useFormItem(), generatedId = useId();
  const size = props.size ?? (props.display === "tags" ? 32 : density === "compact" ? 24 : 32);
  validateSelect(props, size);
  const appearance = props.appearance ?? "outlined", status = field?.status ?? props.status ?? "default";
  const disabled = Boolean(props.disabled || field?.disabled), readOnly = Boolean(props.readOnly), editable = !disabled && !readOnly;
  const [ownValue, setOwnValue] = useState<SelectProps["value"]>(props.defaultValue ?? (props.multiple ? [] : null));
  const [ownQuery, setOwnQuery] = useState(props.defaultSearchValue ?? "");
  const [ownOpen, setOwnOpen] = useState(props.defaultOpen ?? false);
  const [draft, setDraft] = useState<string | null>(null);
  const [pointerFocused, setPointerFocused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null), controlRef = useRef<HTMLButtonElement>(null), searchRef = useRef<HTMLInputElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const anchorRef = usePopupTriggerRef(controlRef), popupScope = usePopupScope();
  const outsidePressTarget = useRef<EventTarget | null>(null);
  const closeReason = useRef<string | undefined>(undefined);
  const composing = useRef(false), wasOpen = useRef(false), permissionClose = useRef(false), withinFocus = useRef(false);
  const compositionCommit = useRef<string | null>(null);
  const removedFocus = useRef<{ value: SelectValue; index: number; from: Element | null } | null>(null);
  useImperativeHandle(forwardedRef, () => ({ focus: (options) => controlRef.current?.focus(options) }), []);
  const values = selectValues(props.value !== undefined ? props.value : ownValue);
  const query = props.searchValue ?? ownQuery, rawOpen = props.open ?? ownOpen, open = rawOpen && editable;
  const listId = `rain-select-${generatedId}-list`, summaryId = `rain-select-${generatedId}-values`;
  const metadata = new Map([...props.selectedOptions ?? [], ...props.options].map((option) => [option.value, option]));
  const labels = values.map((value) => metadata.get(value)?.label ?? (value === "" ? '""' : String(value)));
  const options = groupSelectOptions(filterSelectOptions(props.options, props.searchable ? query : "", props.filterOption)).flatMap((group) => group.items);
  const blocked = (option: SelectOption) => Boolean(option.disabled || props.multiple && props.maxCount !== undefined && values.length >= props.maxCount && !values.includes(option.value));
  const candidates = props.loading || props.loadError ? [] : options;
  const part = (name: SelectPart) => getRainLocalRecipePart(props.localRecipe, name);

  function changeOpen(next: boolean) {
    if (next && !editable || next === open) return;
    if (props.open === undefined) setOwnOpen(next);
    props.onOpenChange?.(next);
  }
  function changeQuery(next: string) {
    if (next === query) return;
    if (props.searchValue === undefined) setOwnQuery(next);
    props.onSearchValueChange?.(next);
  }
  function changeValue(next: readonly SelectValue[], reason: SelectChangeDetails["reason"], option?: SelectOption) {
    if (!editable || next.length === values.length && next.every((value, index) => value === values[index])) return;
    const details: SelectChangeDetails = { reason, option, selectedOptions: next.flatMap((value) => metadata.get(value) ?? []) };
    if (props.multiple) {
      if (props.value === undefined) setOwnValue(next);
      props.onValueChange?.(next, details);
    } else {
      const scalar = next[0] ?? null;
      if (props.value === undefined) setOwnValue(scalar);
      props.onValueChange?.(scalar, details);
    }
  }
  function acceptValue(next: SelectValue | SelectValue[] | null) {
    const nextValues = selectValues(next);
    const added = nextValues.find((value) => !values.includes(value));
    const removed = values.find((value) => !nextValues.includes(value));
    const changed = added ?? removed;
    const option = changed === undefined ? undefined : metadata.get(changed);
    if (added !== undefined && (!option || blocked(option))) return;
    changeValue(nextValues, removed !== undefined && props.multiple ? "deselect" : "select", option);
  }
  function requestOpen(next: boolean, details: BaseSelect.Root.ChangeEventDetails | Combobox.Root.ChangeEventDetails) {
    const target = details.reason === "focus-out" ? (details.event as FocusEvent).relatedTarget : details.event.target;
    if (!next && (details.reason === "outside-press" || details.reason === "focus-out")) {
      if (target instanceof Node && rootRef.current?.contains(target)) { details.cancel(); return; }
      // Base UI can report pointerdown, compatibility mousedown and focusout for one press.
      if (outsidePressTarget.current === target && (details.event.type === "mousedown" || details.reason === "focus-out")) {
        details.cancel(); return;
      }
      if (details.reason === "outside-press") outsidePressTarget.current = target;
    }
    if (next) outsidePressTarget.current = null;
    if (next && !editable) { details.cancel(); return; }
    closeReason.current = next ? undefined : details.reason;
    changeOpen(next);
  }
  const containsFocus = (node: EventTarget | null) => node instanceof Node && Boolean(rootRef.current?.contains(node) || portalRef.current?.contains(node));

  useEffect(() => {
    if (!editable && rawOpen && !permissionClose.current) {
      permissionClose.current = true;
      if (props.open === undefined) setOwnOpen(false);
      props.onOpenChange?.(false);
    }
    if (editable || !rawOpen) permissionClose.current = false;
  }, [editable, rawOpen, props.open, props.onOpenChange]);
  useEffect(() => {
    if (open && !wasOpen.current) closeReason.current = undefined;
    if (!open && wasOpen.current) {
      composing.current = false; compositionCommit.current = null; setDraft(null); changeQuery("");
    }
    wasOpen.current = open;
  });
  useLayoutEffect(() => {
    const removed = removedFocus.current;
    if (!removed || values.includes(removed.value)) return;
    const buttons = rootRef.current!.querySelectorAll<HTMLButtonElement>('[data-slot="tag"] [data-slot="remove-action"]');
    const document = rootRef.current!.ownerDocument;
    if (document.activeElement === removed.from || document.activeElement === document.body && withinFocus.current) {
      (buttons[Math.min(removed.index, buttons.length - 1)] ?? controlRef.current)?.focus();
    }
    removedFocus.current = null;
  });
  useLayoutEffect(() => {
    const owner = rootRef.current!, active = owner.ownerDocument.activeElement;
    // Removing the focused panel does not emit blur; reuse the widget's normal exit handler.
    if (wasOpen.current && !open && withinFocus.current && closeReason.current !== "escape-key" && closeReason.current !== "item-press" && !containsFocus(active)) {
      const view = owner.ownerDocument.defaultView!;
      owner.dispatchEvent(new view.FocusEvent("focusout", { bubbles: true, relatedTarget: active }));
    }
  });
  const tags = props.multiple && props.display === "tags";
  const description = [...new Set([props["aria-describedby"], field?.descriptionIds, values.length ? summaryId : ""].filter(Boolean).join(" ").split(/\s+/).filter(Boolean))].join(" ") || undefined;
  const search = props.searchable ? <FormItemContext.Provider value={null}>
    <div data-slot="search" className={part("search")}><Combobox.Input ref={searchRef} id={`rain-select-${generatedId}-search`}
      aria-label="搜索选项" render={<Input size={32} className="w-full" placeholder={props.searchPlaceholder ?? "搜索选项"} leadingIcon={<SearchIcon />}
        onValueChange={(next) => { if (composing.current) setDraft(next); }} />}
      onCompositionStart={() => { compositionCommit.current = null; composing.current = true; setDraft(query); }}
      onCompositionEnd={(event) => {
        const next = event.currentTarget.value;
        compositionCommit.current = next; composing.current = false; setDraft(null); changeQuery(next);
        setTimeout(() => { compositionCommit.current = null; }, 0);
      }} />
    </div>
  </FormItemContext.Provider> : null;
  const Primitive = props.searchable ? Combobox : BaseSelect;
  const content = <Primitive.Portal ref={portalRef}><Primitive.Positioner align="start" sideOffset={4} collisionPadding={8}
    {...(!props.searchable ? { alignItemWithTrigger: false } : {})} anchor={rootRef}
    data-rain-theme={popupScope.theme} data-density={popupScope.density} style={popupScope.densityStyle}
    className="rain-popup-positioner rain-select__positioner">
    <Primitive.Popup data-slot="popup" data-rain-id="ui-select-popup"
      finalFocus={() => closeReason.current === "escape-key" || closeReason.current === "item-press" ? controlRef.current : false}
      {...(props.searchable ? { initialFocus: searchRef } : {})}
      className={rainCn(popupSurfaceClassName, "rain-menu rain-select__popup grid gap-rain-8 p-rain-8", part("popup"))}>
      {search}
      <Primitive.List id={listId} aria-label="选项" aria-busy={props.loading || undefined}>
        {groupSelectOptions(candidates).map((group, groupIndex) => <div key={groupIndex} role={group.label ? "group" : undefined}
          aria-labelledby={group.label ? `${listId}-group-${groupIndex}` : undefined}>
          {group.label ? <div id={`${listId}-group-${groupIndex}`} className={rainCn(menuGroupLabelClassName, selectSecondaryClassName)}>{group.label}</div> : null}
          {group.items.map((option) => {
            const selected = values.includes(option.value);
            const attributes = { "data-slot": "option", "data-focus": "item", "data-selected": selected, "aria-label": option.label,
              "aria-describedby": option.description ? `${listId}-description-${options.indexOf(option)}` : undefined,
              className: rainCn(menuItemClassName, part("option")) };
            const row = <><DropdownMenu.ItemContent label={option.label} description={option.description}
              descriptionId={attributes["aria-describedby"]} />
              <span aria-hidden="true" className={rainCn("inline-flex flex-none [&>.rain-icon]:size-full", selectIndicatorClassName, iconSizeClassNames[16])}>
                {selected ? <CheckBoldIcon /> : null}</span></>;
            return blocked(option) ? <div key={JSON.stringify(option.value)} {...attributes} role="option" aria-selected={selected} aria-disabled="true" data-disabled="">{row}</div>
              : <Primitive.Item key={JSON.stringify(option.value)} {...attributes} value={option.value}
                {...(!props.searchable ? { label: option.label } : {})}>{row}</Primitive.Item>;
          })}
        </div>)}
      </Primitive.List>
      {props.loading ? <div role="status" className={selectSecondaryClassName}>加载中…</div>
        : props.loadError ? <><div role="alert" className={selectSecondaryClassName}>{props.loadError}</div>
          {props.onRetry ? <Button variant="text" size="compact" onClick={props.onRetry}>重试</Button> : null}</>
        : !options.length ? <div role="status" className={selectSecondaryClassName}>{query.trim() ? props.noResultsText ?? "没有匹配选项" : props.emptyText ?? "暂无选项"}</div> : null}
    </Primitive.Popup>
  </Primitive.Positioner></Primitive.Portal>;
  const arrow = <span data-slot="arrow" aria-hidden="true" className={rainCn(selectArrowClassName, part("arrow"))}>
    <span className={rainCn("inline-flex [&>.rain-icon]:size-full", iconSizeClassNames[size === 24 ? 12 : 14])}>{open ? <ArrowUpIcon /> : <ArrowDownIcon />}</span>
  </span>;

  const widget = <div ref={rootRef} data-rain-id="ui-select" data-slot="root" data-state={open ? "open" : values.length ? "filled" : "empty"}
    data-size={size} data-density={density} data-status={status} data-appearance={appearance} data-permission={disabled ? "disabled" : readOnly ? "readonly" : "editable"}
    data-local-recipe={props.localRecipe?.id} className={rainCn(selectRootClassName, part("root"), props.className)}
    onFocusCapture={(event) => { if (!withinFocus.current) { withinFocus.current = true; props.onFocus?.(event); } }}
    onBlurCapture={(event) => {
      const owner = event.currentTarget;
      if (containsFocus(event.relatedTarget)) return;
      const leave = () => {
        if (containsFocus(owner.ownerDocument.activeElement) || !withinFocus.current) return;
        withinFocus.current = false; setPointerFocused(false);
        props.onBlur?.(Object.assign(Object.create(event), { currentTarget: owner }));
      };
      if (event.relatedTarget) leave(); else queueMicrotask(leave);
    }}
    onKeyDownCapture={(event) => {
      setPointerFocused(false);
      if (composing.current || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) {
        if (event.key === "Enter" || event.key === "Escape") { event.preventDefault(); event.stopPropagation(); }
      }
    }}
    onKeyDown={(event) => { if (event.key === "Enter" && event.target === searchRef.current) event.preventDefault(); }}>
    <div data-slot="frame" data-open={open} data-appearance={appearance} data-status={status} data-size={size}
      data-permission={disabled ? "disabled" : readOnly ? "readonly" : "editable"} data-display={tags ? "tags" : "summary"}
      data-pointer-focus={readOnly && pointerFocused || undefined}
      className={rainCn(fieldFrameRecipe({ appearance, size, status, state: disabled ? "disabled" : readOnly ? "readonly" : "editable" }), selectSizeClassNames[size], part("frame"))}
      onPointerDownCapture={() => { if (readOnly) setPointerFocused(true); }}
      onClick={(event) => { if (!(event.target as Element).closest("button")) { controlRef.current?.focus(); changeOpen(!open); } }}>
      <InsideFieldLabel disabled={disabled} onClick={event => event.stopPropagation()} />
      {tags && values.length ? <div data-slot="value" className={rainCn("flex min-w-0 flex-1 flex-wrap gap-rain-4", part("value"))}>
        {values.map((value, index) => <SelectedValue key={JSON.stringify(value)} value={value} label={labels[index]!} size={size as 32 | 36}
          editable={editable} localRecipe={props.localRecipe} onRemove={() => {
            removedFocus.current = { value, index, from: rootRef.current!.ownerDocument.activeElement }; changeValue(values.filter((candidate) => candidate !== value), "remove", metadata.get(value));
          }} />)}
      </div> : null}
      <Primitive.Trigger ref={anchorRef} type="button" id={field?.id ?? props.id} data-slot="control" disabled={disabled}
        aria-label={props["aria-label"]} aria-labelledby={[props["aria-labelledby"], field?.labelId].filter(Boolean).join(" ") || undefined}
        aria-describedby={description} aria-invalid={status === "error" ? true : props["aria-invalid"]} aria-required={props.required || field?.required || undefined}
        aria-disabled={readOnly || undefined}
        className={rainCn(selectControlClassName, tags && values.length ? "order-2 flex-none" : undefined, readOnly && "select-text cursor-text")}
        >
        {!tags || !values.length ? <span data-slot="value" className={rainCn("flex min-w-0 flex-1", part("value"))}>
          {!values.length ? <span className={selectPlaceholderClassName}>{props.placeholder ?? "请选择"}</span>
            : props.multiple ? <SelectionSummary labels={labels} countOnly={props.display === "count"} /> : <span className="truncate" title={labels[0]}>{labels[0]}</span>}
        </span> : null}
        {tags && values.length ? arrow : null}
      </Primitive.Trigger>
      {(props.clearable ?? true) && editable ? <span data-slot="clear-slot" className={rainCn("inline-flex flex-none", selectActionSizeClassName, tags && values.length ? "order-1" : undefined)}>
        {values.length > 0 ? <button type="button" data-slot="clear-action" data-focus="control"
        aria-label={props.clearLabel ?? `清除${props["aria-label"] || field?.labelText || "选中内容"}`}
        className={rainCn(selectClearClassName, part("clear-action"))}
        onClick={() => { changeValue([], "clear"); controlRef.current?.focus(); }}>
        <span className={selectActionIconClassName} aria-hidden="true"><CircleCloseFilledIcon /></span>
      </button> : null}</span> : null}
      {!tags || !values.length ? arrow : null}
    </div>
    {values.length ? <span className="sr-only" id={summaryId}>已选：{labels.join("、")}</span> : null}
    {content}
  </div>;
  const shared = { onOpenChangeComplete: (next: boolean) => {
    if (next || closeReason.current === "escape-key" || closeReason.current === "item-press") return;
    queueMicrotask(() => {
      const owner = rootRef.current;
      if (!owner || !withinFocus.current || containsFocus(owner.ownerDocument.activeElement)) return;
      const view = owner.ownerDocument.defaultView!;
      owner.dispatchEvent(new view.FocusEvent("focusout", { bubbles: true, relatedTarget: owner.ownerDocument.activeElement }));
    });
  }, open, onOpenChange: requestOpen, value: props.multiple ? [...values] : values[0] ?? null,
    onValueChange: acceptValue, multiple: Boolean(props.multiple), disabled, readOnly };
  return props.searchable ? <Combobox.Root<SelectValue, boolean> {...shared}
    items={candidates.filter((option) => !blocked(option)).map((option) => option.value)} filter={null}
    itemToStringLabel={(value) => metadata.get(value)?.label ?? String(value)} autoHighlight loopFocus={false}
    inputValue={draft ?? query} onInputValueChange={(next, details) => {
      if (details.event.type === "base-ui" || details.isItemPress || details.reason !== "input-change" && details.reason !== "input-clear") { details.cancel(); return; }
      if (composing.current) { setDraft(next); return; }
      if (compositionCommit.current === next) return;
      compositionCommit.current = null; changeQuery(next);
    }}>{widget}</Combobox.Root>
    : <BaseSelect.Root<SelectValue, boolean> {...shared} modal={false} items={props.options}>{widget}</BaseSelect.Root>;
});
export const Select = forwardRef<SelectHandle, SelectProps>(function Select(props, ref) {
  return <PopupProvider><SelectControl {...props} ref={ref} /></PopupProvider>;
});
Select.displayName = "Select";
