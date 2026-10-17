import { Fragment, forwardRef, useId, useImperativeHandle, useLayoutEffect, useRef, useState, type ReactNode, type FieldsetHTMLAttributes, type InputHTMLAttributes } from "react";
import { useDensity } from "@rain-next/foundations";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { useDefaultReset } from "../utils/use-default-reset";
import { rainCn } from "../utils/rain-class-names";
import { SelectionControlContent, SelectionControlSurface } from "../selection-control/selection-control";

export { CheckboxIndicator } from "../selection-control/selection-control";

export type CheckboxPart = "root" | "input" | "control" | "label" | "description";
type CheckboxRecipe = RainLocalRecipe<CheckboxPart, "ui-checkbox">;
interface CheckboxBase extends Omit<InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "style" | "children" | "className" | "defaultChecked" | "checked" | "onChange" | "value" | "role" | "aria-checked" | "readOnly" | "dangerouslySetInnerHTML"> {
  label?: string;
  description?: string;
  value?: string;
  indeterminate?: boolean;
  /** Layout only. Use a named Local Recipe to change declared visual parts. */
  className?: string;
  localRecipe?: CheckboxRecipe;
}
export type CheckboxProps = CheckboxBase & (
  | { checked: boolean; defaultChecked?: never; onCheckedChange: (checked: boolean) => void }
  | { checked?: never; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void }
);

const nonEmpty = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const ids = (...values: (string | false | undefined)[]) => values.filter(Boolean).join(" ") || undefined;
function assertValues(value: unknown): asserts value is readonly string[] {
  if (!Array.isArray(value) || value.some((item) => !nonEmpty(item)) || new Set(value).size !== value.length) {
    throw new Error("CheckboxGroup value IDs must be non-empty, unique strings.");
  }
}


/** Internal card composition seam; not exported by the public UI entry. */
export const CheckboxControl = forwardRef<HTMLInputElement, CheckboxProps & { renderContent?: (ids: { labelId: string; descriptionId: string }) => ReactNode }>(function CheckboxControl({
  checked, defaultChecked, onCheckedChange, label, description, indeterminate = false, value = "on",
  disabled = false, className, localRecipe, renderContent, "aria-disabled": ariaDisabled, ...inputProps
}, forwardedRef) {
  const density = useDensity(), generated = useId(), ref = useRef<HTMLInputElement>(null);
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const controlled = checked !== undefined, selected = controlled ? checked : internalChecked;
  const present = useRef({ selected, indeterminate });
  const unavailable = disabled || ariaDisabled === true || ariaDisabled === "true";
  useImperativeHandle(forwardedRef, () => ref.current!, []);
  useLayoutEffect(() => {
    present.current = { selected, indeterminate };
    if (ref.current) ref.current.indeterminate = indeterminate;
  });
  useDefaultReset(ref, !controlled, () => [[ref.current!, defaultChecked ?? false]], () => setInternalChecked(defaultChecked ?? false));

  if ((inputProps as InputHTMLAttributes<HTMLInputElement>).readOnly !== undefined) throw new Error("Checkbox does not support readOnly; use disabled or a read-only summary.");
  if (!nonEmpty(label) && !nonEmpty(inputProps["aria-label"]) && !nonEmpty(inputProps["aria-labelledby"])) throw new Error("Checkbox requires a label or accessible name.");
  if ((label !== undefined && !nonEmpty(label)) || (description !== undefined && !nonEmpty(description)) || !nonEmpty(value)
    || (defaultChecked !== undefined && typeof defaultChecked !== "boolean") || typeof indeterminate !== "boolean"
    || (controlled && (typeof checked !== "boolean" || typeof onCheckedChange !== "function"))) throw new Error("Checkbox requires valid labels, value and checked state.");
  if (controlled && defaultChecked !== undefined) throw new Error("Checkbox cannot combine checked and defaultChecked.");
  return <SelectionControlSurface state={{ kind: "checkbox", checked: selected, disabled: unavailable, indeterminate }}
    labelProps={{ "data-density": density, "data-local-recipe": localRecipe?.id, className: rainCn(className, getRainLocalRecipePart(localRecipe, "root")) }}
    indicatorClassName={getRainLocalRecipePart(localRecipe, "control")}
    input={<input {...inputProps} ref={ref} type="checkbox" value={value} checked={selected} disabled={unavailable}
      aria-disabled={unavailable || undefined} aria-checked={indeterminate ? "mixed" : selected}
      aria-labelledby={inputProps["aria-labelledby"] ?? (inputProps["aria-label"] ? undefined : `${generated}-label`)}
      aria-describedby={ids(inputProps["aria-describedby"], description && `${generated}-description`)}
      data-slot="input" data-focus="control"
      className={rainCn("sr-only", getRainLocalRecipePart(localRecipe, "input"))}
      onChange={(event) => {
        const input = event.currentTarget;
        input.indeterminate = indeterminate;
        if (input.matches(":disabled")) return;
        if (event.nativeEvent.defaultPrevented) {
          // React restores controlled inputs before the browser rolls back canceled activation.
          queueMicrotask(() => { input.checked = present.current.selected; input.indeterminate = present.current.indeterminate; });
          return;
        }
        if (!controlled) setInternalChecked(input.checked);
        onCheckedChange?.(input.checked);
      }} />}>
    {renderContent ? renderContent({ labelId: `${generated}-label`, descriptionId: `${generated}-description` }) :
      <SelectionControlContent label={label} description={description} labelId={`${generated}-label`} descriptionId={`${generated}-description`}
        labelClassName={getRainLocalRecipePart(localRecipe, "label")} descriptionClassName={getRainLocalRecipePart(localRecipe, "description")} />}
  </SelectionControlSurface>;
});
CheckboxControl.displayName = "CheckboxControl";
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => <CheckboxControl {...props} ref={ref} />);
Checkbox.displayName = "Checkbox";

export interface CheckboxOption { value: string; label: string; description?: string; disabled?: boolean }
interface CheckboxGroupBase extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "children" | "style" | "onChange" | "defaultValue" | "value" | "role" | "dangerouslySetInnerHTML"> {
  options: readonly CheckboxOption[];
  /** Compose group-owned input props; preserve checked/name/form/callback. */
  renderOption?: (props: Omit<Extract<CheckboxProps, { checked: boolean }>, "localRecipe">) => ReactNode;
  legend: string;
  legendHidden?: boolean;
  orientation?: "vertical" | "horizontal";
  help?: string;
  message?: string;
  invalid?: boolean;
  /** A group hint; the host validates at least one selection. */
  required?: boolean;
  localRecipe?: CheckboxRecipe;
}
export type CheckboxGroupProps = CheckboxGroupBase & (
  | { value: readonly string[]; defaultValue?: never; onValueChange: (value: string[]) => void }
  | { value?: never; defaultValue?: readonly string[]; onValueChange?: (value: string[]) => void }
);

export const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(function CheckboxGroup({
  options, renderOption, legend, legendHidden = false, orientation = "vertical", value, defaultValue: defaultValueProp, onValueChange,
  help, message, invalid = false, required = false, disabled = false, name, form, localRecipe, className,
  "aria-disabled": ariaDisabled, ...fieldsetProps
}, forwardedRef) {
  const generated = useId(), density = useDensity(), ref = useRef<HTMLFieldSetElement>(null);
  const defaultValue = defaultValueProp ?? [];
  const [internalValue, setInternalValue] = useState<readonly string[]>(defaultValue);
  const controlled = value !== undefined, selected = controlled ? value : internalValue;
  const current = useRef(selected);
  useLayoutEffect(() => { current.current = selected; });
  const unavailable = disabled || ariaDisabled === true || ariaDisabled === "true";
  const descriptionIds = ids(fieldsetProps["aria-describedby"], help && `${generated}-help`, message && `${generated}-message`);
  useImperativeHandle(forwardedRef, () => ref.current!, []);
  useDefaultReset(ref, !controlled,
    () => Array.from(ref.current!.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')).map((input) => [input, defaultValue.includes(input.value)]),
    () => { current.current = defaultValue; setInternalValue(defaultValue); });

  if (!nonEmpty(legend) || !Array.isArray(options) || !["vertical", "horizontal"].includes(orientation)
    || (name !== undefined && !nonEmpty(name)) || options.some((option) => !option || !nonEmpty(option.label))) throw new Error("CheckboxGroup requires a legend and valid options, orientation and name.");
  assertValues(options.map((option) => option.value));
  assertValues(selected); assertValues(defaultValue);
  if (controlled && (defaultValueProp !== undefined || typeof onValueChange !== "function")) throw new Error("CheckboxGroup cannot combine value and defaultValue; controlled value requires onValueChange.");
  if ((fieldsetProps as { readOnly?: unknown }).readOnly !== undefined) throw new Error("CheckboxGroup does not support readOnly.");

  return <fieldset {...fieldsetProps} ref={ref} form={form} disabled={unavailable}
    aria-labelledby={fieldsetProps["aria-labelledby"] ?? (fieldsetProps["aria-label"] ? undefined : `${generated}-legend`)}
    aria-describedby={descriptionIds} aria-invalid={invalid || fieldsetProps["aria-invalid"] || undefined}
    aria-disabled={unavailable || undefined} data-rain-id="ui-checkbox-group" data-slot="root" data-density={density}
    data-invalid={invalid} data-orientation={orientation}
    className={rainCn("rain-checkbox-group min-w-rain-0 m-rain-0 p-rain-0 border-none font-rain-ui text-rain-size-15 leading-rain-24", className)}>
    <legend id={`${generated}-legend`} data-slot="legend" className={legendHidden ? "sr-only" : "p-rain-0 mb-rain-8 font-rain-semibold"}>
      {legend}{required && <span className="sr-only">（至少选择一项）</span>}
    </legend>
    {help && <p id={`${generated}-help`} data-slot="help" className="m-rain-0 mb-rain-12 text-rain-size-13 leading-rain-22">{help}</p>}
    <div data-slot="items" className={rainCn("flex min-w-rain-0 items-start gap-rain-12", orientation === "vertical" ? "flex-col" : "flex-wrap")}>
      {options.map((option) => {
        const props: Omit<Extract<CheckboxProps, { checked: boolean }>, "localRecipe"> = { ...option, name, form,
          disabled: unavailable || option.disabled, checked: selected.includes(option.value),
          "aria-describedby": descriptionIds, "aria-invalid": invalid || undefined,
          onCheckedChange: (next) => {
          const values = controlled ? selected : current.current;
          if (unavailable || option.disabled || values.includes(option.value) === next) return;
          const updated = next ? [...values, option.value] : values.filter((key) => key !== option.value);
          if (!controlled) { current.current = updated; setInternalValue(updated); }
          onValueChange?.(updated);
        },
        };
        return renderOption ? <Fragment key={option.value}>{renderOption(props)}</Fragment> : <Checkbox key={option.value} {...props} localRecipe={localRecipe} />;
      })}
    </div>
    {message && <p id={`${generated}-message`} data-slot="message" className="m-rain-0 mt-rain-8 text-rain-size-13 leading-rain-22">{message}</p>}
  </fieldset>;
});
CheckboxGroup.displayName = "CheckboxGroup";
