import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState, type AriaAttributes, type FocusEventHandler, type KeyboardEvent, type ReactNode } from "react";
import { Select } from "@base-ui/react/select";
import { iconSizeClassNames, useDensity, type ColorTheme, type TagSize } from "@rain-next/foundations";
import { ArrowDownIcon } from "../icons/arrow-down";
import { ArrowUpIcon } from "../icons/arrow-up";
import { CheckBoldIcon } from "../icons/check-bold";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { TagContent } from "./tag";
import { getTagRecipe, type TagAppearance, type TagColor } from "./tag.styles";
import { tagSelectPaints, tagSelectOptionClassName, tagSelectPopupClassName } from "./tag-select.styles";

export interface TagSelectOption { value: string | number; label: string; color: TagColor; disabled?: boolean }
export type TagSelectPart = "root" | "content" | "label" | "leading-icon" | "popup" | "option" | "arrow" | "indicator";
export type TagSelectLocalRecipe = RainLocalRecipe<TagSelectPart, "ui-tag-select">;
interface TagSelectBaseProps extends Pick<AriaAttributes, "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-invalid"> {
  options: readonly TagSelectOption[];
  size?: TagSize;
  appearance?: TagAppearance;
  leadingIcon?: ReactNode;
  disabled?: boolean;
  id?: string;
  title?: string;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  /** Layout only; visual changes use declared Local Recipe parts. */
  className?: string;
  localRecipe?: TagSelectLocalRecipe;
}
export type TagSelectProps = TagSelectBaseProps & (
  | { value: string | number; onValueChange: (value: string | number) => void; defaultValue?: never }
  | { defaultValue: string | number; value?: never; onValueChange?: (value: string | number) => void }
) & (
  | { open: boolean; onOpenChange: (open: boolean) => void; defaultOpen?: never }
  | { defaultOpen?: boolean; open?: never; onOpenChange?: (open: boolean) => void }
);

function guardComposingEnter(event: KeyboardEvent) {
  if (event.key === "Enter" && (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)) {
    event.preventDefault(); event.stopPropagation();
  }
}

export const TagSelect = forwardRef<HTMLButtonElement, TagSelectProps>(function TagSelect({
  options, value, defaultValue, onValueChange, open, defaultOpen, onOpenChange, size = 24, appearance = "filled",
  leadingIcon, disabled = false, className, localRecipe, ...triggerProps
}, forwardedRef) {
  const density = useDensity(), triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null), focusedOption = useRef<HTMLElement | null>(null);
  const modes = useRef({ value: value !== undefined, open: open !== undefined });
  const [localValue, setLocalValue] = useState(defaultValue), [localOpen, setLocalOpen] = useState(defaultOpen ?? false);
  const [theme, setTheme] = useState<ColorTheme>("light");
  const current = value !== undefined ? value : localValue, expanded = !disabled && (open ?? localOpen);
  useImperativeHandle(forwardedRef, () => triggerRef.current!, []);
  useLayoutEffect(() => {
    const previous = focusedOption.current, document = triggerRef.current?.ownerDocument;
    if (expanded && previous && !previous.isConnected && document && document.activeElement === document.body)
      (popupRef.current?.querySelector<HTMLElement>('[role="option"]:not([aria-disabled="true"])') ?? triggerRef.current)?.focus();
  }, [options, expanded]);
  useLayoutEffect(() => {
    const ancestors: HTMLElement[] = [];
    for (let element: HTMLElement | null = triggerRef.current; element; element = element.parentElement) ancestors.push(element);
    const sync = () => setTheme(ancestors.find((element) => element.hasAttribute("data-rain-theme"))?.getAttribute("data-rain-theme") === "dark" ? "dark" : "light");
    sync();
    if (!expanded) return;
    const observer = new MutationObserver(sync);
    for (const element of ancestors) observer.observe(element, { attributes: true, attributeFilter: ["data-rain-theme"] });
    return () => observer.disconnect();
  }, [expanded]);

  const validValue = (candidate: unknown) => typeof candidate === "string" || typeof candidate === "number" && Number.isFinite(candidate);
  if (modes.current.value !== (value !== undefined) || modes.current.open !== (open !== undefined)
    || value !== undefined && (defaultValue !== undefined || typeof onValueChange !== "function")
    || open !== undefined && (defaultOpen !== undefined || typeof onOpenChange !== "function" || typeof open !== "boolean")
    || defaultOpen !== undefined && typeof defaultOpen !== "boolean"
    || onValueChange !== undefined && typeof onValueChange !== "function" || onOpenChange !== undefined && typeof onOpenChange !== "function"
    || typeof disabled !== "boolean" || !validValue(current)
    || !triggerProps["aria-label"]?.trim() && !triggerProps["aria-labelledby"]?.trim())
    throw new Error("TagSelect requires a named control, valid current value and separate, stable controlled/default axes.");
  if (!Array.isArray(options) || !options.length || options.some((option) => !option || !validValue(option.value)
    || typeof option.label !== "string" || !option.label.trim() || option.disabled !== undefined && typeof option.disabled !== "boolean")
    || new Set(options.map((option) => option.value)).size !== options.length)
    throw new Error("TagSelect requires finite options with unique typed values, meaningful labels and registered colors.");
  for (const option of options) getTagRecipe(option.color, appearance, size);
  const selected = options.find((option) => option.value === current);
  if (!selected) throw new Error("TagSelect current value must exist in its finite options.");
  const recipe = getTagRecipe(selected.color, appearance, size);

  return <Select.Root<string | number> value={selected.value} open={expanded} disabled={disabled} modal={false} items={options}
    isItemEqualToValue={(a, b) => a === b}
    onOpenChange={(next) => {
      if (disabled || next === expanded) return;
      if (open === undefined) setLocalOpen(next);
      onOpenChange?.(next);
    }}
    onValueChange={(next) => {
      if (disabled || next === null || next === current || !options.some((option) => option.value === next && !option.disabled)) return;
      if (value === undefined) setLocalValue(next);
      onValueChange?.(next);
    }}>
    <Select.Trigger {...triggerProps} ref={triggerRef} data-rain-id="ui-tag-select" data-slot="root" data-focus="control"
      data-size={size} data-appearance={appearance} data-color={selected.color} data-density={density}
      data-state={disabled ? "disabled" : expanded ? "open" : "default"} data-local-recipe={localRecipe?.id}
      onKeyDownCapture={guardComposingEnter}
      className={rainCn(recipe.root, "rain-tag-select__trigger gap-rain-4 cursor-pointer disabled:cursor-not-allowed", disabled && "opacity-rain-tag-disabled", className, getRainLocalRecipePart(localRecipe, "root"))}>
      {!disabled && <span aria-hidden="true" data-slot="interaction-overlay" className={recipe.overlay} />}
      <TagContent recipe={recipe} leadingIcon={leadingIcon} localRecipe={localRecipe}>{selected.label}</TagContent>
      <span aria-hidden="true" data-slot="arrow" className={rainCn(recipe.icon, getRainLocalRecipePart(localRecipe, "arrow"))}>{expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}</span>
    </Select.Trigger>
    <Select.Portal>
      <Select.Positioner data-rain-theme={theme} className="rain-tag-select__positioner" sideOffset={4} align="start" alignItemWithTrigger={false} collisionPadding={8}>
        <Select.Popup ref={popupRef} data-rain-id="ui-tag-select" data-slot="popup" onKeyDownCapture={guardComposingEnter}
          onFocusCapture={(event) => { focusedOption.current = event.target; }}
          className={rainCn(tagSelectPopupClassName, tagSelectPaints.popup, getRainLocalRecipePart(localRecipe, "popup"))}>
          <Select.List>
            {options.map((option) => option.disabled
              // Base UI keeps disabled Items focusable. Static ARIA rows remain discoverable while arrow/typeahead navigation visits only enabled Items.
              ? <div key={`${typeof option.value}:${option.value}`} role="option" aria-disabled="true" aria-selected={option.value === current} data-disabled="" data-slot="option"
                className={rainCn(tagSelectOptionClassName, tagSelectPaints.option, getRainLocalRecipePart(localRecipe, "option"))}>
                <span className="min-w-0 whitespace-normal break-words">{option.label}</span>
                <span aria-hidden="true" data-slot="indicator" className={rainCn("inline-flex flex-none [&>.rain-icon]:size-full", iconSizeClassNames[14], tagSelectPaints.indicator, getRainLocalRecipePart(localRecipe, "indicator"))}>{option.value === current && <CheckBoldIcon />}</span>
              </div>
              : <Select.Item key={`${typeof option.value}:${option.value}`} value={option.value} label={option.label}
              data-slot="option" data-focus="item" className={rainCn(tagSelectOptionClassName, tagSelectPaints.option, tagSelectPaints.active, getRainLocalRecipePart(localRecipe, "option"))}>
              <Select.ItemText className="min-w-0 whitespace-normal break-words">{option.label}</Select.ItemText>
              <span aria-hidden="true" data-slot="indicator" className={rainCn("inline-flex flex-none [&>.rain-icon]:size-full", iconSizeClassNames[14], tagSelectPaints.indicator, getRainLocalRecipePart(localRecipe, "indicator"))}>
                <Select.ItemIndicator className="inline-flex size-full [&>.rain-icon]:size-full"><CheckBoldIcon /></Select.ItemIndicator>
              </span>
            </Select.Item>)}
          </Select.List>
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  </Select.Root>;
});
TagSelect.displayName = "TagSelect";
