import {
  cloneElement, forwardRef, isValidElement, useId, useImperativeHandle, useRef, useState,
  type ChangeEvent, type CompositionEvent, type InputHTMLAttributes,
  type KeyboardEvent, type MouseEvent, type ReactNode, type SyntheticEvent,
} from "react";
import { useDensity, type InputSize } from "@rain-next/foundations";
import { CircleCloseFilledIcon } from "@rain-next/ui/icons/circle-close-filled";
import { Button, type ButtonProps } from "../button/button";
import { IconButton } from "../icon-button/icon-button";
import { rainCn } from "../utils/rain-class-names";
import { InsideFieldLabel, mergeFieldIds as mergeIds, useFormItem } from "./form-item";
import type { FieldAppearance, FieldStatus } from "../field/field.styles";
import { countGraphemes, limitGraphemeEdit } from "./input.utils";
import {
  inputAffixClassName, inputClearClassName, inputClearIconClassName, inputClearSlotClassName,
  inputControlClassName, inputCountRecipe, inputIconClassName, inputRootRecipe, inputSizeClassName, inputSuffixTextClassName,
} from "./input.styles";

export type { InputSize } from "@rain-next/foundations";
export type InputStatus = FieldStatus;
export type InputAppearance = FieldAppearance;
export type InputCountMode = "hard" | "soft";
export type InputType = "text" | "email" | "url" | "tel";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "maxLength" | "prefix" | "size" | "type" | "value"> {
  appearance?: InputAppearance;
  clearLabel?: string;
  clearable?: boolean;
  countMode?: InputCountMode;
  defaultValue?: string;
  maxLength?: number;
  onClear?: (event: MouseEvent<HTMLButtonElement>) => void;
  onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  leadingIcon?: ReactNode;
  prefix?: ReactNode;
  prefixText?: string | number;
  showCount?: boolean;
  size?: InputSize;
  status?: InputStatus;
  suffixText?: string | number;
  suffix?: ReactNode;
  trailingIcon?: ReactNode;
  trailingAction?: ReactNode;
  /** False for actions that only read the value, such as copy, view and search. */
  trailingActionChangesValue?: boolean;
  type?: InputType;
  value?: string;
}

function dispatchNativeValueChange(control: HTMLInputElement, nextValue: string) {
  const view = control.ownerDocument.defaultView!;
  Object.getOwnPropertyDescriptor(view.HTMLInputElement.prototype, "value")!.set!.call(control, nextValue);
  control.dispatchEvent(new view.Event("input", { bubbles: true, composed: true }));
}

function stopActivation(event: SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
}

function Addon({ children, slot, blocked, decorative = false }: { children: ReactNode; slot: string; blocked: boolean; decorative?: boolean }) {
  let content = children;
  if (isValidElement<ButtonProps>(content) && content.type === Button && content.props.variant === "text" && content.props.tone === undefined) {
    content = cloneElement(content, { tone: "brand" });
  }
  if (blocked && isValidElement<{ disabled?: boolean }>(content)
    && (content.type === "button" || content.type === Button || content.type === IconButton)) {
    content = cloneElement(content, { disabled: true });
  }
  return <span className={decorative ? inputIconClassName : inputAffixClassName} data-slot={slot} data-blocked={blocked || undefined} aria-hidden={decorative || undefined}
    inert={blocked || undefined} aria-disabled={blocked || undefined}
    onClickCapture={blocked ? stopActivation : undefined}
    onPointerDownCapture={blocked ? stopActivation : undefined}
    onPointerUpCapture={blocked ? stopActivation : undefined}
    onKeyDownCapture={(event) => { if (blocked && ["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) stopActivation(event); }}
    onKeyUpCapture={(event) => { if (blocked && ["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) stopActivation(event); }}>
    {content}
  </span>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
  "aria-invalid": ariaInvalid, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy,
  appearance = "outlined", className, clearLabel, clearable = true, countMode = "hard", defaultValue = "", disabled: inputDisabled = false,
  id, maxLength, onChange, onClear, onCompositionEnd, onCompositionStart, onKeyDown, onPressEnter, onValueChange,
  leadingIcon, prefix, prefixText, readOnly = false, required, showCount, size, status: inputStatus = "default",
  suffixText, suffix, trailingIcon, trailingAction, trailingActionChangesValue = true, type = "text", value, ...nativeProps
}, forwardedRef) {
  const density = useDensity();
  const field = useFormItem();
  const generatedId = useId();
  const controlRef = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(forwardedRef, () => controlRef.current!, []);
  const composingRef = useRef(false);
  const compositionBaseline = useRef<string | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [pointerFocused, setPointerFocused] = useState(false);
  const isControlled = value !== undefined;
  const currentValue = value ?? uncontrolledValue;
  const disabled = inputDisabled || Boolean(field?.disabled);
  const status = field?.status ?? inputStatus;
  const resolvedSize = size ?? (density === "compact" ? 24 : 32);
  if (!["outlined", "filled", "underlined"].includes(appearance)) throw new Error("Input appearance must be outlined, filled or underlined.");
  if (![24, 28, 32, 36].includes(resolvedSize)) throw new Error("Input size must be 24, 28, 32 or 36.");
  if (maxLength !== undefined && (!Number.isInteger(maxLength) || maxLength < 0)) throw new Error("Input maxLength must be a finite non-negative integer.");
  for (const text of [prefixText, suffixText]) {
    if (text != null && typeof text !== "string" && typeof text !== "number") throw new Error("Input prefixText and suffixText accept plain text; custom content belongs in prefix or suffix.");
  }
  const count = countGraphemes(currentValue);
  const overLimit = maxLength !== undefined && count > maxLength;
  const overflowId = `rain-input-${generatedId}-overflow`;
  const state = disabled ? "disabled" : readOnly ? "read-only" : currentValue ? "filled" : "empty";
  const clearSlot = clearable && !disabled && !readOnly;
  const resolvedClearLabel = clearLabel ?? `清除${ariaLabel || field?.labelText || "输入内容"}`;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (disabled || readOnly) return;
    const control = event.currentTarget;
    const raw = control.value;
    const selection = control.selectionStart;
    const accepted = countMode === "hard" && maxLength !== undefined && !composingRef.current
      ? limitGraphemeEdit(compositionBaseline.current ?? currentValue, raw, maxLength) : raw;
    if (raw !== accepted) {
      control.value = accepted;
      if (selection !== null) {
        const cursor = Math.max(0, selection - (raw.length - accepted.length));
        control.setSelectionRange(cursor, cursor);
      }
    }
    if (accepted === currentValue) return;
    if (!isControlled) setUncontrolledValue(accepted);
    onValueChange?.(accepted);
    onChange?.(event);
  }

  function handleCompositionStart(event: CompositionEvent<HTMLInputElement>) {
    compositionBaseline.current = currentValue;
    composingRef.current = true;
    onCompositionStart?.(event);
  }

  function handleCompositionEnd(event: CompositionEvent<HTMLInputElement>) {
    composingRef.current = false;
    const control = event.currentTarget;
    const raw = control.value;
    const selection = control.selectionStart;
    const accepted = countMode === "hard" && maxLength !== undefined
      ? limitGraphemeEdit(compositionBaseline.current ?? currentValue, control.value, maxLength) : control.value;
    if (accepted !== currentValue || accepted !== control.value) dispatchNativeValueChange(control, accepted);
    if (selection !== null && raw !== accepted) {
      const cursor = Math.max(0, selection - (raw.length - accepted.length));
      control.setSelectionRange(cursor, cursor);
    }
    compositionBaseline.current = null;
    onCompositionEnd?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (!disabled && !event.defaultPrevented && event.key === "Enter" && !composingRef.current
      && !event.nativeEvent.isComposing && event.nativeEvent.keyCode !== 229) onPressEnter?.(event);
  }

  function handleClear(event: MouseEvent<HTMLButtonElement>) {
    if (disabled || readOnly) return;
    const control = controlRef.current;
    if (control) dispatchNativeValueChange(control, "");
    onClear?.(event);
    control?.focus();
  }

  return <span className={rainCn("rain-input group/input", inputRootRecipe({ appearance, size: resolvedSize, status, state: disabled ? "disabled" : readOnly ? "readonly" : "editable" }), inputSizeClassName(resolvedSize), className)}
    data-density={density} data-rain-id="ui-input" data-slot="root" data-state={state} data-status={status} data-size={resolvedSize}
    data-appearance={appearance} data-permission={disabled ? "disabled" : readOnly ? "readonly" : "editable"}
    data-pointer-focus={readOnly && pointerFocused || undefined}
    onPointerDownCapture={(event) => { if (readOnly && event.target === controlRef.current) setPointerFocused(true); }}
    onFocusCapture={(event) => { if (readOnly && event.target === controlRef.current) setPointerFocused(controlRef.current.matches(":active")); }}
    onClickCapture={(event) => { if (readOnly && event.detail > 0 && event.target === controlRef.current) setPointerFocused(event.currentTarget.ownerDocument.activeElement === controlRef.current); }}
    onKeyDownCapture={() => { if (readOnly) setPointerFocused(false); }}
    onBlurCapture={() => setPointerFocused(false)}>
    <InsideFieldLabel disabled={disabled} />
    {leadingIcon != null ? <Addon slot="leading-icon" blocked decorative>{leadingIcon}</Addon> : null}
    {prefix != null ? <Addon slot="prefix" blocked={disabled || readOnly}>{prefix}</Addon> : null}
    {prefixText != null ? <span className={inputAffixClassName} data-slot="prefix-text">{prefixText}</span> : null}
    <input {...nativeProps} ref={controlRef}
      id={field?.id ?? id} aria-invalid={status === "error" ? true : ariaInvalid} aria-label={ariaLabel}
      aria-labelledby={mergeIds(ariaLabelledBy, field?.labelId)} aria-describedby={mergeIds(ariaDescribedBy, field?.descriptionIds, overLimit ? overflowId : undefined)}
      required={required || field?.required} className={inputControlClassName} data-slot="control" disabled={disabled}
      onChange={handleChange} onCompositionEnd={handleCompositionEnd} onCompositionStart={handleCompositionStart}
      onKeyDown={handleKeyDown} readOnly={readOnly} type={type} value={currentValue} />
    {clearSlot ? <span className={inputClearSlotClassName} data-slot="clear-slot">
      {currentValue ? <button aria-label={resolvedClearLabel} className={inputClearClassName} data-focus="control" data-slot="clear-action"
        onClick={handleClear} onPointerDown={(event) => event.preventDefault()} type="button">
        <span aria-hidden="true" className={inputClearIconClassName}><CircleCloseFilledIcon /></span>
      </button> : null}
    </span> : null}
    {suffixText != null ? <span className={inputSuffixTextClassName} data-slot="suffix-text">{suffixText}</span> : null}
    {suffix != null ? <Addon slot="suffix" blocked={disabled || readOnly}>{suffix}</Addon> : null}
    {trailingIcon != null ? <Addon slot="trailing-icon" blocked decorative>{trailingIcon}</Addon> : null}
    {(showCount ?? maxLength !== undefined) ? <span className={rainCn(inputCountRecipe({ overflow: overLimit, disabled }))} data-overflow={overLimit || undefined} data-slot="count">
      {maxLength !== undefined ? `${count}/${maxLength}` : count}
    </span> : null}
    {trailingAction != null ? <Addon slot="trailing-action" blocked={disabled || (readOnly && trailingActionChangesValue)}>{trailingAction}</Addon> : null}
    {overLimit ? <span id={overflowId} className="sr-only">已超过 {maxLength} 字上限</span> : null}
  </span>;
});
Input.displayName = "Input";
