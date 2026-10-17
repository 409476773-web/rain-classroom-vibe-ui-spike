import { forwardRef, useEffect, useId, useLayoutEffect, useRef, useState, type AriaAttributes } from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { iconSizeClassNames, useDensity } from "@rain-next/foundations";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { ArrowUpIcon } from "@rain-next/ui/icons/arrow-up";
import { CheckBoldIcon } from "@rain-next/ui/icons/check-bold";
import { CircleCloseFilledIcon } from "@rain-next/ui/icons/circle-close-filled";
import { RefreshIcon } from "@rain-next/ui/icons/refresh";
import { Input, type InputProps } from "../input/input";
import { useFormItem } from "../input/form-item";
import { Button } from "../button/button";
import { IconButton } from "../icon-button/icon-button";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu";
import { menuGroupLabelClassName, menuItemClassName } from "../dropdown-menu/dropdown-menu.styles";
import { PopupProvider, popupSurfaceClassName, usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import { filterSelectOptions, groupSelectOptions } from "../select/select.utils";
import type { SelectOption, SelectValue } from "../select/select";
import { rainCn } from "../utils/rain-class-names";
import "./combobox.css";

export type ComboboxOption = SelectOption;
export type ComboboxValue = SelectValue;
interface ComboboxItem { option: ComboboxOption; custom: boolean }
export interface ComboboxChangeDetails { reason: "select" | "custom" | "clear"; option?: ComboboxOption }
export interface ComboboxProps extends Pick<AriaAttributes, "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-invalid">,
  Pick<InputProps, "size" | "appearance" | "status" | "id" | "placeholder" | "clearable" | "clearLabel" | "disabled" | "readOnly" | "required" | "onFocus" | "onBlur"> {
  options: readonly ComboboxOption[];
  selectedOption?: ComboboxOption;
  value?: ComboboxValue | null;
  defaultValue?: ComboboxValue | null;
  onValueChange?: (value: ComboboxValue | null, details: ComboboxChangeDetails) => void;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchValueChange?: (query: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  allowCustomValue?: boolean;
  filterOption?: false | ((query: string, option: ComboboxOption) => boolean);
  loading?: boolean;
  loadError?: string;
  onRetry?: () => void;
  emptyText?: string;
  noResultsText?: string;
  name?: string;
  form?: string;
  className?: string;
}

/** Adapted from shadcn Base UI Combobox, commit 3ba91b1cc83e1bbe4ab35a422ff2a694849c5048 (MIT). */
const ComboboxControl = forwardRef<HTMLInputElement, ComboboxProps>(function ComboboxControl(props, ref) {
  const field = useFormItem(), density = useDensity(), generatedId = useId(), scope = usePopupScope();
  const rootRef = useRef<HTMLDivElement>(null), portalRef = useRef<HTMLDivElement>(null), inputRef = useRef<HTMLInputElement | null>(null), composing = useRef(false);
  const anchorRef = usePopupTriggerRef(inputRef);
  const compositionCommit = useRef<{ value: string; emitted: boolean } | null>(null), closedQueryRestored = useRef(false);
  const outsidePressTarget = useRef<EventTarget | null>(null);
  const [ownValue, setOwnValue] = useState<ComboboxValue | null>(props.defaultValue ?? null);
  const [ownQuery, setOwnQuery] = useState<string | null>(props.defaultSearchValue ?? null);
  const [ownOpen, setOwnOpen] = useState(props.defaultOpen ?? false);
  const [ownOption, setOwnOption] = useState<ComboboxItem | null>(null);
  const disabled = Boolean(props.disabled || field?.disabled), readOnly = Boolean(props.readOnly), editable = !disabled && !readOnly;
  const value = props.value !== undefined ? props.value : ownValue;
  const localOption = props.value === undefined && ownOption?.option.value === value ? ownOption : null;
  const selectedOption = (props.selectedOption?.value === value ? props.selectedOption : undefined)
    ?? (localOption?.custom ? localOption.option : undefined)
    ?? props.options.find(option => option.value === value) ?? localOption?.option;
  const label = selectedOption?.label ?? (value === null ? "" : String(value));
  const query = props.searchValue ?? ownQuery ?? label, rawOpen = props.open ?? ownOpen, open = rawOpen && editable;
  const listId = `rain-combobox-${generatedId}-list`;
  const filterQuery = ownQuery === null && props.searchValue === undefined ? "" : query;
  const options = groupSelectOptions(filterSelectOptions(props.options, filterQuery, props.filterOption)).flatMap(group => group.items);
  const customText = query.trim();
  const custom: ComboboxOption | null = props.allowCustomValue && customText && !props.options.some(option => option.label === customText)
    ? { value: customText, label: customText } : null;
  const candidates = props.loading || props.loadError ? [] : [...options, ...(custom ? [custom] : [])];
  const items = candidates.map(option => ({ option, custom: option === custom }));
  const selectedItem: ComboboxItem | null = value === null ? null : {
    option: selectedOption ?? { value, label },
    custom: localOption && localOption.option === selectedOption ? localOption.custom : !props.options.some(option => option.value === value && option.label === label),
  };
  const permissionClosed = useRef(false);
  const wasOpen = useRef(open);
  useLayoutEffect(() => {
    if (wasOpen.current && !open && !closedQueryRestored.current) { restoreQuery(); closedQueryRestored.current = true; }
    if (!wasOpen.current && open) closedQueryRestored.current = false;
    wasOpen.current = open;
  });
  useEffect(() => {
    if (!editable && rawOpen && !permissionClosed.current) {
      permissionClosed.current = true;
      if (props.open === undefined) setOwnOpen(false);
      setOwnQuery(null); props.onOpenChange?.(false);
    }
    if (editable || !rawOpen) permissionClosed.current = false;
  }, [editable, rawOpen, props.open, props.onOpenChange]);

  function changeQuery(next: string) {
    if (!editable || next === query) return;
    closedQueryRestored.current = false;
    if (props.searchValue === undefined) setOwnQuery(next);
    props.onSearchValueChange?.(next);
  }
  function restoreQuery(next = label) {
    setOwnQuery(null);
    if (query !== next) props.onSearchValueChange?.(next);
  }
  function changeValue(next: ComboboxValue | null, details: ComboboxChangeDetails) {
    if (!editable) return;
    if (props.value === undefined) {
      setOwnValue(next);
      setOwnOption(details.option ? { option: details.option, custom: details.reason === "custom" } : null);
    }
    if (next !== value || details.option?.label !== selectedOption?.label || (details.reason === "custom") !== (selectedItem?.custom ?? false)) props.onValueChange?.(next, details);
    restoreQuery(details.option?.label ?? (next === null ? "" : String(next)));
  }
  const required = Boolean(props.required || field?.required);
  const clearLabel = props.clearLabel ?? `清除${props["aria-label"] || field?.labelText || "输入内容"}`;
  return <ComboboxPrimitive.Root<ComboboxItem> value={selectedItem} inputValue={query} open={open} disabled={disabled} readOnly={readOnly}
    name={props.name} form={props.form} required={required && value === null} items={items} filter={null}
    isItemEqualToValue={(item, selected) => item.option.value === selected.option.value && item.custom === selected.custom}
    itemToStringLabel={item => item.option.label} itemToStringValue={item => String(item.option.value)}
    onInputValueChange={(next, details) => {
      if (details.reason !== "input-change") return;
      if (compositionCommit.current?.value === next) {
        if (compositionCommit.current.emitted) return;
        compositionCommit.current.emitted = true;
      }
      changeQuery(next);
    }}
    onValueChange={(next, details) => {
      if (details.reason === "clear-press") { changeValue(null, { reason: "clear" }); return; }
      if (next === null || details.reason !== "item-press" || composing.current) { details.cancel(); return; }
      if (!editable || next.option.disabled) { details.cancel(); return; }
      changeValue(next.option.value, { reason: next.custom ? "custom" : "select", option: next.option });
    }}
    onOpenChange={(next, details) => {
      const target = details.reason === "focus-out" ? (details.event as FocusEvent).relatedTarget : details.event.target;
      if (!next && (details.reason === "outside-press" || details.reason === "focus-out")) {
        if (target instanceof Node && rootRef.current?.contains(target)) { details.cancel(); return; }
        // One pointer press can produce pointerdown, compatibility mousedown and focusout.
        if (outsidePressTarget.current === target && (details.event.type === "mousedown" || details.reason === "focus-out")) { details.cancel(); return; }
        if (details.reason === "outside-press") outsidePressTarget.current = target;
      }
      if (next) outsidePressTarget.current = null;
      if (next && !editable) { details.cancel(); return; }
      if (!next) {
        if (details.reason !== "item-press") restoreQuery();
        closedQueryRestored.current = true;
      }
      if (next !== open) {
        if (props.open === undefined) setOwnOpen(next);
        props.onOpenChange?.(next);
      }
    }}>
    {/* Base UI 1.8 hides siblings of an outside Input. Its live-region boundary keeps
        the field actions in the accessible tree; "off" adds no live announcements. */}
    <ComboboxPrimitive.InputGroup ref={rootRef} aria-live="off" className={rainCn("rain-combobox", props.className)} data-rain-id="ui-combobox" data-slot="root"
      data-density={density} data-state={open ? "open" : value === null ? "empty" : "filled"} data-permission={disabled ? "disabled" : readOnly ? "readonly" : "editable"}
      onKeyDownCapture={event => {
        if (event.key === "Enter" && (composing.current || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)) {
          event.preventDefault(); event.stopPropagation();
        }
      }}>
      <ComboboxPrimitive.Input ref={element => { anchorRef(element); if (typeof ref === "function") ref(element); else if (ref) ref.current = element; }}
        id={field?.id ?? props.id} aria-label={props["aria-label"]} aria-labelledby={props["aria-labelledby"]}
        aria-describedby={props["aria-describedby"]} aria-invalid={props["aria-invalid"]} aria-required={required || undefined}
        onCompositionStart={() => { composing.current = true; compositionCommit.current = null; }}
        onCompositionEnd={event => {
          composing.current = false;
          compositionCommit.current = { value: event.currentTarget.value, emitted: false };
          setTimeout(() => { compositionCommit.current = null; }, 0);
        }}
        onBlur={event => { props.onBlur?.(event); if (!closedQueryRestored.current && !rootRef.current?.contains(event.relatedTarget) && !portalRef.current?.contains(event.relatedTarget)) restoreQuery(); }} onFocus={props.onFocus}
        render={<Input className="w-full" size={props.size} appearance={props.appearance} status={props.status}
          placeholder={props.placeholder ?? "输入并选择"} clearable={false}
          required={props.required} disabled={disabled} readOnly={readOnly}
          trailingAction={<span className="inline-flex items-center gap-rain-4">
            {editable && props.clearable !== false && (query || value !== null) ? <ComboboxPrimitive.Clear keepMounted tabIndex={0}
              aria-label={clearLabel} render={<IconButton size="20/14" aria-label={clearLabel} icon={<CircleCloseFilledIcon />} />} /> : null}
            <ComboboxPrimitive.Trigger className="rain-combobox__trigger" aria-label={open ? "收起选项" : "展开选项"} tabIndex={-1}
              disabled={!editable}><span aria-hidden="true" className={iconSizeClassNames[14]}>{open ? <ArrowUpIcon /> : <ArrowDownIcon />}</span></ComboboxPrimitive.Trigger>
          </span>} />} />
      <ComboboxPrimitive.Portal ref={portalRef}><ComboboxPrimitive.Positioner anchor={rootRef} align="start" sideOffset={4} collisionPadding={8}
        data-rain-theme={scope.theme} data-density={scope.density} style={scope.densityStyle} className="rain-popup-positioner rain-combobox__positioner">
        <ComboboxPrimitive.Popup data-rain-id="ui-combobox-popup" data-slot="popup" initialFocus={false} finalFocus={false}
          className={rainCn(popupSurfaceClassName, "rain-menu rain-combobox__popup p-rain-8")}>
          <ComboboxPrimitive.List id={listId} aria-label="选项" aria-busy={props.loading || undefined}>
            {groupSelectOptions(candidates).map((group, index) => <div key={group.label ?? index} role={group.label ? "group" : undefined} aria-labelledby={group.label ? `${listId}-${index}` : undefined}>
              {group.label ? <div id={`${listId}-${index}`} className={menuGroupLabelClassName}>{group.label}</div> : null}
              {group.items.map(option => <ComboboxPrimitive.Item key={`${option === custom ? "custom:" : "option:"}${JSON.stringify(option.value)}`} value={items.find(item => item.option === option)!} disabled={option.disabled}
                aria-label={option === custom ? `使用此输入：${customText}` : option.label} data-slot="option" data-focus="item" data-selected={option.value === value && (option === custom) === selectedItem?.custom}
                aria-describedby={option.description ? `${listId}-description-${candidates.indexOf(option)}` : undefined}
                className={menuItemClassName}>
                <DropdownMenu.ItemContent label={option === custom ? `使用此输入：${customText}` : option.label} description={option.description}
                  descriptionId={option.description ? `${listId}-description-${candidates.indexOf(option)}` : undefined} />
                {option.value === value && (option === custom) === selectedItem?.custom ? <span aria-hidden="true" className={rainCn("rain-combobox__selected-icon", iconSizeClassNames[16])}><CheckBoldIcon /></span> : null}
              </ComboboxPrimitive.Item>)}
            </div>)}
          </ComboboxPrimitive.List>
          {props.loading ? <div role="status" className="px-rain-12 py-rain-8">加载中…</div>
            : props.loadError ? <div className="px-rain-12 py-rain-8"><div role="alert">{props.loadError}</div>
              {props.onRetry ? <Button variant="text" size="compact" leadingIcon={<RefreshIcon />} onClick={() => { props.onRetry?.(); inputRef.current?.focus(); }}>重试</Button> : null}</div>
            : !candidates.length ? <div role="status" className="px-rain-12 py-rain-8">{filterQuery.trim() ? props.noResultsText ?? "没有匹配选项" : props.emptyText ?? "暂无选项"}</div> : null}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner></ComboboxPrimitive.Portal>
    </ComboboxPrimitive.InputGroup>
  </ComboboxPrimitive.Root>;
});

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(props, ref) {
  return <PopupProvider><ComboboxControl {...props} ref={ref} /></PopupProvider>;
});
