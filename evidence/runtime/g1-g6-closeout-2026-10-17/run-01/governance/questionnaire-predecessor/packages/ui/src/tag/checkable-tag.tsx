import { forwardRef, useId, useRef, type FieldsetHTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react";
import { useDensity, type TagSize } from "@rain-next/foundations";
import { Button } from "../button/button";
import { getRainLocalRecipePart } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { TagContent, type TagVisualProps, type TagLocalRecipe, type TagColor, type TagAppearance } from "./tag";
import { getTagRecipe } from "./tag.styles";

export interface CheckableTagProps extends Omit<InputHTMLAttributes<HTMLInputElement>,
  "children" | "type" | "size" | "color" | "style" | "checked" | "defaultChecked" | "value" | "defaultValue" | "onChange" | "readOnly" | "role" | "aria-checked" | "dangerouslySetInnerHTML">, TagVisualProps {
  type?: "checkbox" | "radio";
  value: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}
function nonEmpty(value: unknown): value is string { return typeof value === "string" && value.trim().length > 0; }

export const CheckableTag = forwardRef<HTMLInputElement, CheckableTagProps>(function CheckableTag({
  type = "checkbox", value, label, checked, onCheckedChange, name, color, tone, appearance = "filled", size = 24,
  leadingIcon, className, localRecipe, disabled: nativeDisabled = false, "aria-disabled": ariaDisabled, onKeyDown, ...inputProps
}, ref) {
  const density = useDensity(), resolvedColor = color ?? tone ?? "neutral";
  const disabled = nativeDisabled || ariaDisabled === true || ariaDisabled === "true";
  if (!["checkbox", "radio"].includes(type) || !nonEmpty(value) || !nonEmpty(label) || typeof checked !== "boolean" || typeof onCheckedChange !== "function")
    throw new Error("CheckableTag requires a valid type, value, label, controlled checked and onCheckedChange.");
  if (type === "radio" && !nonEmpty(name)) throw new Error("A radio CheckableTag requires a non-empty group name.");
  const recipe = getTagRecipe(resolvedColor, appearance, size, checked);
  return <label data-rain-id="ui-checkable-tag" data-slot="root" data-density={density} data-color={resolvedColor}
    data-size={size} data-appearance={appearance} data-checked={checked} data-state={disabled ? "disabled" : checked ? "checked" : "default"}
    data-local-recipe={localRecipe?.id} className={rainCn(recipe.root, "rain-checkable-tag cursor-pointer select-none",
      disabled && "cursor-not-allowed opacity-rain-tag-disabled", className, getRainLocalRecipePart(localRecipe, "root"))}>
    <input {...inputProps} ref={ref} type={type} value={value} checked={checked} name={name} disabled={disabled} aria-disabled={disabled || undefined}
      data-slot="input" className={rainCn("sr-only", getRainLocalRecipePart(localRecipe, "input"))}
      onChange={(event) => { if (!disabled) onCheckedChange(event.currentTarget.checked); }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || event.key !== "Enter") return;
        event.preventDefault();
        if (!disabled && !event.repeat && !event.nativeEvent.isComposing && event.nativeEvent.keyCode !== 229) event.currentTarget.click();
      }} />
    {!disabled && <span aria-hidden="true" data-slot="interaction-overlay" className={recipe.overlay} />}
    <TagContent recipe={recipe} leadingIcon={leadingIcon} selected={checked} localRecipe={localRecipe}>{label}</TagContent>
  </label>;
});
CheckableTag.displayName = "CheckableTag";

export interface TagOption { value: string; label: string; color?: TagColor; leadingIcon?: ReactNode; disabled?: boolean }
interface CheckableTagGroupBase extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "children" | "style" | "onChange" | "defaultValue" | "value" | "role"> {
  options: readonly TagOption[];
  legend: string;
  legendHidden?: boolean;
  appearance?: TagAppearance;
  size?: TagSize;
  clearable?: boolean;
  localRecipe?: TagLocalRecipe;
}
export type CheckableTagGroupProps = CheckableTagGroupBase & (
  | { mode?: "single"; value: string | null; onValueChange: (value: string | null) => void }
  | { mode: "multiple"; value: readonly string[]; onValueChange: (value: string[]) => void }
);

export function CheckableTagGroup(props: CheckableTagGroupProps) {
  const generated = useId(), density = useDensity(), groupRef = useRef<HTMLFieldSetElement>(null);
  const { options, legend, legendHidden = false, name, disabled: nativeDisabled = false, appearance = "filled", size = 24, localRecipe, className,
    mode = "single", value, clearable = false, onValueChange: _onValueChange, "aria-disabled": ariaDisabled, ...fieldsetProps } = props;
  const disabled = nativeDisabled || ariaDisabled === true || ariaDisabled === "true";
  if (!nonEmpty(legend) || !Array.isArray(options) || !["single", "multiple"].includes(mode) || (name !== undefined && !nonEmpty(name)))
    throw new Error("CheckableTagGroup requires a legend, options, valid mode and optional non-empty name.");
  const keys = options.map((option) => option.value);
  if (keys.some((key) => !nonEmpty(key)) || new Set(keys).size !== keys.length) throw new Error("CheckableTagGroup option values must be non-empty and unique.");
  if (mode === "single" ? value !== null && (typeof value !== "string" || !keys.includes(value))
    : !Array.isArray(value) || new Set(value).size !== value.length || value.some((key) => !keys.includes(key)))
    throw new Error("CheckableTagGroup controlled value must match its mode and unique option values.");
  const groupName = name ?? `rain-tag-${generated}`, empty = value === null || Array.isArray(value) && value.length === 0;
  return <fieldset {...fieldsetProps} ref={groupRef} name={groupName} disabled={disabled} role={mode === "single" ? "radiogroup" : undefined}
    aria-labelledby={nonEmpty(fieldsetProps["aria-labelledby"]) ? fieldsetProps["aria-labelledby"] : nonEmpty(fieldsetProps["aria-label"]) ? undefined : `${generated}-legend`}
    aria-disabled={disabled || undefined} data-rain-id="ui-checkable-tag-group" data-slot="root" data-mode={mode} data-size={size} data-density={density}
    className={rainCn("min-w-rain-0 m-rain-0 p-rain-0 border-none rain-type-ui-compact", className)}>
    <legend id={`${generated}-legend`} data-slot="legend" className={legendHidden ? "sr-only" : "p-rain-0 mb-rain-8 font-rain-semibold"}>{legend}</legend>
    <div data-slot="items" className="flex flex-wrap items-center gap-rain-8">
      {options.map((option) => <CheckableTag key={option.value} {...option} type={mode === "single" ? "radio" : "checkbox"}
        name={groupName} form={fieldsetProps.form} checked={mode === "single" ? value === option.value : (value as readonly string[]).includes(option.value)}
        appearance={appearance} size={size} disabled={disabled || option.disabled} localRecipe={localRecipe}
        onCheckedChange={(checked) => {
          if (props.mode === "multiple") props.onValueChange(checked ? [...props.value, option.value] : props.value.filter((key) => key !== option.value));
          else if (checked) props.onValueChange(option.value);
        }} />)}
      {clearable && <Button variant="text" size="small" tone="brand" aria-label={`清空${legend}`} disabled={disabled || empty}
        onClick={() => {
          if (props.mode === "multiple") props.onValueChange([]); else props.onValueChange(null);
          groupRef.current?.querySelector<HTMLInputElement>('input:not(:disabled)')?.focus();
        }}>清空</Button>}
    </div>
  </fieldset>;
}
