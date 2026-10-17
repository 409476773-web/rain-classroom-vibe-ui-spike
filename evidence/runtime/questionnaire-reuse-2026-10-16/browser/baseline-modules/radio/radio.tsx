import { Fragment, forwardRef, useId, useImperativeHandle, useLayoutEffect, useRef, useState, type ReactNode, type FieldsetHTMLAttributes, type InputHTMLAttributes } from "react";
import { useDensity } from "@rain-next/foundations";
import { getRainLocalRecipePart, type RainLocalRecipe } from "/@fs/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/packages/ui/src/recipes/local-recipe.ts";
import { rainCn } from "/@fs/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/packages/ui/src/utils/rain-class-names.ts";
import { useDefaultReset } from "/@fs/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/packages/ui/src/utils/use-default-reset.ts";

export type RadioPart = "root" | "input" | "control" | "label" | "description";
type RadioRecipe = RainLocalRecipe<RadioPart, "ui-radio">;
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "style" | "children" | "className" | "defaultChecked" | "checked" | "onChange" | "value" | "name" | "role" | "aria-checked" | "readOnly" | "dangerouslySetInnerHTML"> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  name: string;
  value: string;
  label?: string;
  description?: string;
  /** Layout only. Use a named Local Recipe to change declared visual parts. */
  className?: string;
  localRecipe?: RadioRecipe;
}
const nonEmpty = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const ids = (...values: (string | false | undefined)[]) => values.filter(Boolean).join(" ") || undefined;
const validValue = (value: unknown) => value === null || nonEmpty(value);

/** Internal passive visual shared by native controls and menus; no input or interaction state. */
export function RadioIndicator({ checked, className }: { checked: boolean; className?: string }) {
  return <span data-slot="canvas" className="flex h-rain-24 w-rain-24 flex-none items-center justify-center" aria-hidden="true">
      <span data-slot="control" className={rainCn("inline-flex h-rain-18 w-rain-18 flex-none box-border items-center justify-center rounded-rain-full border-solid border-rain-line-1", className)}>
        {checked && <span data-slot="mark" className="h-rain-6 w-rain-6 rounded-rain-full" />}
      </span>
    </span>;
}

/** Internal card composition seam; not exported by the public UI entry. */
export const RadioControl = forwardRef<HTMLInputElement, RadioProps & { renderContent?: (ids: { labelId: string; descriptionId: string }) => ReactNode }>(function RadioControl({
  checked, onCheckedChange, name, value, label, description, disabled = false, className, localRecipe, renderContent,
  "aria-disabled": ariaDisabled, ...inputProps
}, forwardedRef) {
  const generated = useId(), density = useDensity(), ref = useRef<HTMLInputElement>(null), present = useRef(checked);
  const unavailable = disabled || ariaDisabled === true || ariaDisabled === "true";
  useImperativeHandle(forwardedRef, () => ref.current!, []);
  useLayoutEffect(() => { present.current = checked; });
  const nativeProps = inputProps as InputHTMLAttributes<HTMLInputElement>;
  if (nativeProps.readOnly !== undefined || nativeProps.defaultChecked !== undefined) throw new Error("Radio is controlled; use RadioGroup for defaults. readOnly is unsupported.");
  if (!nonEmpty(name) || !nonEmpty(value) || typeof checked !== "boolean" || typeof onCheckedChange !== "function") throw new Error("Radio requires name, value, checked and onCheckedChange.");
  if ((!nonEmpty(label) && !nonEmpty(inputProps["aria-label"]) && !nonEmpty(inputProps["aria-labelledby"]))
    || (label !== undefined && !nonEmpty(label)) || (description !== undefined && !nonEmpty(description))) throw new Error("Radio requires a label or accessible name and valid description.");
  return <label data-rain-id="ui-radio" data-slot="root" data-density={density} data-state={checked ? "checked" : "unchecked"}
    data-disabled={unavailable} data-rain-state={unavailable ? "disabled" : checked ? "checked" : "unchecked"} data-local-recipe={localRecipe?.id}
    className={rainCn("rain-radio relative inline-flex min-w-rain-0 max-w-full items-start gap-rain-8 align-middle font-rain-ui cursor-pointer has-[:disabled]:cursor-not-allowed", className, getRainLocalRecipePart(localRecipe, "root"))}>
    <input {...inputProps} ref={ref} type="radio" name={name} value={value} checked={checked} disabled={unavailable}
      aria-disabled={unavailable || undefined}
      aria-labelledby={inputProps["aria-labelledby"] ?? (inputProps["aria-label"] ? undefined : `${generated}-label`)}
      aria-describedby={ids(inputProps["aria-describedby"], description && `${generated}-description`)}
      data-slot="input" data-focus="control" className={rainCn("sr-only", getRainLocalRecipePart(localRecipe, "input"))}
      onChange={(event) => {
        const input = event.currentTarget;
        if (input.matches(":disabled")) return;
        if (event.nativeEvent.defaultPrevented) {
          // React restores controlled inputs before canceled native activation rolls back.
          queueMicrotask(() => { input.checked = present.current; });
          return;
        }
        if (input.checked && !checked) onCheckedChange(true);
      }} />
    <RadioIndicator checked={checked} className={getRainLocalRecipePart(localRecipe, "control")} />
    {renderContent ? renderContent({ labelId: `${generated}-label`, descriptionId: `${generated}-description` }) : (label || description) && <span data-slot="content" className="flex min-w-rain-0 flex-col gap-rain-4 break-words">
      {label && <span id={`${generated}-label`} data-slot="label" className={rainCn("text-rain-size-15 leading-rain-24 font-rain-semibold", getRainLocalRecipePart(localRecipe, "label"))}>{label}</span>}
      {description && <span id={`${generated}-description`} data-slot="description" className={rainCn("text-rain-size-13 leading-rain-22 font-rain-regular", getRainLocalRecipePart(localRecipe, "description"))}>{description}</span>}
    </span>}
  </label>;
});
RadioControl.displayName = "RadioControl";
export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => <RadioControl {...props} ref={ref} />);
Radio.displayName = "Radio";

export interface RadioOption { value: string; label: string; description?: string; disabled?: boolean }
interface RadioGroupBase extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "children" | "style" | "onChange" | "defaultValue" | "value" | "role" | "dangerouslySetInnerHTML"> {
  options: readonly RadioOption[];
  /** Compose group-owned input props; preserve checked/name/form/callback. */
  renderOption?: (props: Omit<RadioProps, "localRecipe">) => ReactNode;
  legend: string;
  legendHidden?: boolean;
  orientation?: "vertical" | "horizontal";
  help?: string;
  message?: string;
  invalid?: boolean;
  required?: boolean;
  localRecipe?: RadioRecipe;
}
export type RadioGroupProps = RadioGroupBase & (
  | { value: string | null; defaultValue?: never; onValueChange: (value: string) => void }
  | { value?: never; defaultValue?: string | null; onValueChange?: (value: string) => void }
);
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup({
  options, renderOption, legend, legendHidden = false, orientation = "vertical", value, defaultValue: defaultValueProp, onValueChange,
  help, message, invalid = false, required = false, disabled = false, name, form, localRecipe, className,
  "aria-disabled": ariaDisabled, ...fieldsetProps
}, forwardedRef) {
  const generated = useId(), density = useDensity(), ref = useRef<HTMLFieldSetElement>(null);
  const defaultValue = defaultValueProp ?? null;
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
  const controlled = value !== undefined, selected = controlled ? value : internalValue;
  const current = useRef(selected);
  useLayoutEffect(() => { current.current = selected; });
  useImperativeHandle(forwardedRef, () => ref.current!, []);
  useDefaultReset(ref, !controlled,
    () => Array.from(ref.current!.querySelectorAll<HTMLInputElement>('input[type="radio"]')).map((input) => [input, input.value === defaultValue]),
    () => { current.current = defaultValue; setInternalValue(defaultValue); });
  const unavailable = disabled || ariaDisabled === true || ariaDisabled === "true";
  const descriptionIds = ids(fieldsetProps["aria-describedby"], help && `${generated}-help`, message && `${generated}-message`);
  if (!nonEmpty(legend) || !Array.isArray(options) || !["vertical", "horizontal"].includes(orientation)
    || (name !== undefined && !nonEmpty(name)) || options.some((option) => !option || !nonEmpty(option.label) || !nonEmpty(option.value))
    || new Set(options.map((option) => option.value)).size !== options.length) throw new Error("RadioGroup requires a legend, unique non-empty string option IDs, valid labels, orientation and name.");
  if (!validValue(selected) || !validValue(defaultValue)) throw new Error("RadioGroup value must be a non-empty string or null.");
  if (controlled && (defaultValueProp !== undefined || typeof onValueChange !== "function")) throw new Error("RadioGroup cannot combine value and defaultValue; controlled value requires onValueChange.");
  if ((fieldsetProps as { readOnly?: unknown }).readOnly !== undefined) throw new Error("RadioGroup does not support readOnly.");
  return <fieldset {...fieldsetProps} ref={ref} form={form} disabled={unavailable} role="radiogroup" aria-orientation={orientation}
    aria-labelledby={fieldsetProps["aria-labelledby"] ?? (fieldsetProps["aria-label"] ? undefined : `${generated}-legend`)}
    aria-describedby={descriptionIds} aria-invalid={invalid || fieldsetProps["aria-invalid"] || undefined}
    aria-required={required || undefined} aria-disabled={unavailable || undefined}
    data-rain-id="ui-radio-group" data-slot="root" data-density={density} data-invalid={invalid} data-orientation={orientation}
    className={rainCn("rain-radio-group min-w-rain-0 m-rain-0 p-rain-0 border-none font-rain-ui text-rain-size-15 leading-rain-24", className)}>
    <legend id={`${generated}-legend`} data-slot="legend" className={legendHidden ? "sr-only" : "p-rain-0 mb-rain-8 font-rain-semibold"}>
      {legend}{required && <span className="sr-only">（必选）</span>}
    </legend>
    {help && <p id={`${generated}-help`} data-slot="help" className="m-rain-0 mb-rain-12 text-rain-size-13 leading-rain-22">{help}</p>}
    <div data-slot="items" className={rainCn("flex min-w-rain-0 items-start gap-rain-12", orientation === "vertical" ? "flex-col" : "flex-wrap")}>
      {options.map((option) => {
        const props: Omit<RadioProps, "localRecipe"> = { ...option, name: name ?? generated, form, required,
          disabled: unavailable || option.disabled, checked: selected === option.value,
          "aria-describedby": descriptionIds, "aria-invalid": invalid || undefined,
          onCheckedChange: () => {
          if (unavailable || option.disabled || (controlled ? selected : current.current) === option.value) return;
          if (!controlled) { current.current = option.value; setInternalValue(option.value); }
          onValueChange?.(option.value);
        },
        };
        return renderOption ? <Fragment key={option.value}>{renderOption(props)}</Fragment> : <Radio key={option.value} {...props} localRecipe={localRecipe} />;
      })}
    </div>
    {message && <p id={`${generated}-message`} data-slot="message" className="m-rain-0 mt-rain-8 text-rain-size-13 leading-rain-22">{message}</p>}
  </fieldset>;
});
RadioGroup.displayName = "RadioGroup";
