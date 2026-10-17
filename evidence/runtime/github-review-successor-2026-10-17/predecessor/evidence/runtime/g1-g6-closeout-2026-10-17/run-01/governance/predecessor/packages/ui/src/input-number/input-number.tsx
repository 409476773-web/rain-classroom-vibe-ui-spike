import { forwardRef, useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, useState, type InputHTMLAttributes, type KeyboardEvent } from "react";
import { useDensity, type InputSize } from "@rain-next/foundations";
import { AddIcon } from "@rain-next/ui/icons/add";
import { ChevronUpIcon } from "@rain-next/ui/icons/chevron-up";
import { ChevronDownIcon } from "@rain-next/ui/icons/chevron-down";
import { MinusIcon } from "@rain-next/ui/icons/minus";
import { CircleCloseFilledIcon } from "@rain-next/ui/icons/circle-close-filled";
import { fieldFrameRecipe, type FieldAppearance, type FieldStatus } from "../field/field.styles";
import { formItemColors, InsideFieldLabel, mergeFieldIds, useFormItem } from "../input/form-item";
import { inputAffixClassName, inputControlClassName, inputSizeClassName, inputSuffixTextClassName } from "../input/input.styles";
import { rainCn } from "../utils/rain-class-names";
import { checkNumberOptions, finishNumber, inspectNumber, numberText, stepNumber, type InputNumberValidity } from "./input-number.utils";
import "./input-number.css";

export type { InputNumberValidity } from "./input-number.utils";
export interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "size" | "type" | "min" | "max" | "step" | "maxLength" | "pattern" | "prefix"> {
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number | null) => void;
  onValueCommit?: (value: number | null) => void;
  onValidityChange?: (validity: InputNumberValidity) => void;
  onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Maximum significant fractional places; no rounding or zero-padding. */
  precision?: number;
  controls?: boolean;
  /** split: left/right buttons; stacked: Classic right-side arrows for dense fields. */
  controlsLayout?: "split" | "stacked";
  /** Important numeric value: Data font and bold weight, with the field's existing size. */
  keyData?: boolean;
  /** Compact by default; fill the available field width only when requested. */
  fullWidth?: boolean;
  clearable?: boolean;
  clearLabel?: string;
  increaseLabel?: string;
  decreaseLabel?: string;
  prefixText?: string;
  suffixText?: string;
  size?: InputSize;
  appearance?: FieldAppearance;
  status?: FieldStatus;
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber({
  value, defaultValue = null, onValueChange, onValueCommit, onValidityChange, onPressEnter,
  min, max, step = 1, precision, controls = true, controlsLayout = "split", keyData = false, fullWidth = false, clearable = false, clearLabel, increaseLabel, decreaseLabel,
  prefixText, suffixText, size, appearance = "outlined", status: ownStatus = "default", className,
  disabled: ownDisabled = false, readOnly = false, required: ownRequired = false, id, name, form, placeholder,
  "aria-label": ariaLabel, "aria-labelledby": labelledBy, "aria-describedby": describedBy, "aria-invalid": ariaInvalid,
  onChange, onBlur, onFocus, onKeyDown, onInvalid, onCompositionStart, onCompositionEnd, ...nativeProps
}, forwardedRef) {
  const field = useFormItem();
  const density = useDensity();
  const generatedId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const submissionRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(forwardedRef, () => inputRef.current!, []);
  const initialValue = useRef(defaultValue);
  const controlled = value !== undefined;
  const externalValue = controlled ? value : null;
  const previousExternal = useRef(externalValue);
  const [draft, setDraft] = useState(() => numberText(controlled ? value : defaultValue));
  const [touched, setTouched] = useState(false);
  const [pointerFocused, setPointerFocused] = useState(false);
  const [composing, setComposing] = useState(false);
  const compositionDraft = useRef<string | null>(null);
  const validityCallback = useRef(onValidityChange);
  validityCallback.current = onValidityChange;
  const disabled = ownDisabled || Boolean(field?.disabled);
  const required = ownRequired || Boolean(field?.required);
  const constraints = { min, max, precision, required };
  checkNumberOptions(constraints, step);
  if ([value, defaultValue].some(item => item !== undefined && item !== null && !Number.isFinite(item))) throw new Error("InputNumber value must be a finite number or null.");
  const resolvedSize = size ?? (density === "compact" ? 24 : 32);
  if (![24, 28, 32, 36].includes(resolvedSize)) throw new Error("InputNumber size must be 24, 28, 32 or 36.");
  if (!["outlined", "filled", "underlined"].includes(appearance)) throw new Error("InputNumber appearance must be outlined, filled or underlined.");
  if (!["split", "stacked"].includes(controlsLayout)) throw new Error("InputNumber controlsLayout must be split or stacked.");
  const stacked = controlsLayout === "stacked";
  const inspected = inspectNumber(draft, constraints);
  const message = disabled || composing || (!touched && ["required", "incomplete"].includes(inspected.reason ?? "")) ? "" : inspected.message;
  const status = message ? "error" : field?.status ?? ownStatus;
  const permission = disabled ? "disabled" : readOnly ? "readonly" : "editable";
  const controlId = field?.id ?? id ?? `rain-number-${generatedId}`;
  const messageId = `${controlId}-numeric-message`;
  const unitId = `${controlId}-unit`;
  const fieldName = ariaLabel || field?.labelText || "数值";
  const decreasing = !disabled && !readOnly && !composing ? stepNumber(draft, -1, step, constraints) : null;
  const increasing = !disabled && !readOnly && !composing ? stepNumber(draft, 1, step, constraints) : null;

  function syncNative(text: string) {
    const next = inspectNumber(finishNumber(text), constraints);
    inputRef.current?.setCustomValidity(disabled || readOnly ? "" : next.message);
    if (submissionRef.current) submissionRef.current.value = next.kind === "number" && next.value !== null ? String(next.value) : "";
    return next;
  }

  useLayoutEffect(() => {
    const externalChanged = !Object.is(previousExternal.current, externalValue);
    if (!composing) previousExternal.current = externalValue;
    const numericDraft = inspected.kind === "empty" || (inspected.kind === "number" && inspected.reason !== "unsafe");
    if (controlled && !composing && ((externalChanged && !numericDraft) ||
      ((externalChanged || numericDraft) && !Object.is(inspected.value, externalValue)))) {
      const replacement = numberText(externalValue);
      setDraft(replacement);
      syncNative(replacement);
      return;
    }
    syncNative(draft);
  });

  useLayoutEffect(() => { field?.setControlMessage(message); }, [message, field?.setControlMessage]);
  useLayoutEffect(() => () => field?.setControlMessage(""), [field?.setControlMessage]);
  useEffect(() => { validityCallback.current?.({ valid: inspected.valid, reason: inspected.reason, message: inspected.message }); }, [inspected.valid, inspected.reason, inspected.message]);
  useEffect(() => {
    const owner = inputRef.current?.form;
    if (!owner || controlled) return;
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented || !inputRef.current) return;
      setDraft(numberText(initialValue.current)); setTouched(false); setComposing(false); compositionDraft.current = null;
    });
    owner.addEventListener("reset", reset);
    return () => owner.removeEventListener("reset", reset);
  }, [form, controlled]);

  // Native validation uses the finishable numeric value; submit finalizes its visible spelling first.
  useLayoutEffect(() => {
    const owner = inputRef.current?.form;
    if (!owner) return;
    const submit = () => { const text = inputRef.current?.value ?? draft; if (finishNumber(text) !== text) finish(); };
    owner.addEventListener("submit", submit, true);
    return () => owner.removeEventListener("submit", submit, true);
  });

  function commit(text: string) {
    const requested = inspectNumber(text, constraints);
    if (!requested.valid) return;
    queueMicrotask(() => {
      if (!inputRef.current) return;
      const accepted = inspectNumber(inputRef.current.value, constraints);
      if (accepted.valid && Object.is(accepted.value, requested.value) &&
        (!controlled || Object.is(previousExternal.current, requested.value))) onValueCommit?.(requested.value);
    });
  }

  function accept(text: string, before = draft) {
    const next = inspectNumber(text, constraints);
    if (next.kind === "invalid") return false;
    setDraft(text);
    syncNative(text);
    if (next.kind === "empty" || (next.kind === "number" && next.value !== null)) {
      if ((next.kind === "empty" && before !== "") || !Object.is(next.value, inspectNumber(before, constraints).value)) onValueChange?.(next.value);
    }
    return true;
  }

  function finish() {
    if (disabled || readOnly || compositionDraft.current !== null) return;
    setTouched(true);
    const nextText = finishNumber(inputRef.current?.value ?? draft);
    if (nextText !== draft) {
      accept(nextText);
      if (inputRef.current) inputRef.current.value = nextText;
    }
    syncNative(nextText);
    commit(nextText);
  }

  function adjust(direction: 1 | -1) {
    const nextText = direction === 1 ? increasing : decreasing;
    if (nextText === null) return;
    setTouched(true);
    accept(nextText);
    inputRef.current?.focus();
    commit(nextText);
  }

  function renderStep(direction: 1 | -1) {
    const increase = direction === 1;
    const StepIcon = stacked ? increase ? ChevronUpIcon : ChevronDownIcon : increase ? AddIcon : MinusIcon;
    return <button type="button" data-slot={increase ? "increase" : "decrease"} className="rain-input-number__step"
      aria-label={increase ? increaseLabel ?? `增加${fieldName}` : decreaseLabel ?? `减少${fieldName}`}
      disabled={(increase ? increasing : decreasing) === null}
      onMouseDown={event => event.preventDefault()} onClick={() => adjust(direction)}><StepIcon aria-hidden="true" /></button>;
  }

  return <span className={rainCn("rain-input-number-field inline-flex min-w-0 flex-col gap-rain-4", className)} data-rain-id="ui-input-number" data-slot="root"
    data-controls-layout={controlsLayout}
    data-full-width={fullWidth} data-size={resolvedSize} data-density={density} data-appearance={appearance} data-status={status} data-state={disabled ? "disabled" : readOnly ? "read-only" : draft ? "filled" : "empty"}>
    <span className={rainCn("rain-input-number rain-field-frame", fieldFrameRecipe({ appearance, size: resolvedSize, status, state: permission }), inputSizeClassName(resolvedSize))}
      data-slot="frame" data-size={resolvedSize} data-appearance={appearance} data-status={status} data-permission={permission} data-controls={controls} data-controls-layout={controlsLayout}
      data-pointer-focus={readOnly && pointerFocused || undefined}
      onPointerDownCapture={() => { if (readOnly) setPointerFocused(true); }} onKeyDownCapture={() => setPointerFocused(false)}>
      {controls && !stacked ? renderStep(-1) : null}
      <span className="rain-input-number__value" data-slot="value-region">
        <InsideFieldLabel disabled={disabled} />
        {prefixText ? <span className={inputAffixClassName} data-slot="prefix-text">{prefixText}</span> : null}
        <input {...nativeProps} ref={inputRef} id={controlId} form={form} type="text" role="spinbutton" inputMode={precision === 0 ? "numeric" : "decimal"}
          disabled={disabled} readOnly={readOnly} required={required} placeholder={placeholder} value={draft}
          size={5} className={inputControlClassName} data-slot="control" data-key-data={keyData}
          aria-label={ariaLabel} aria-labelledby={mergeFieldIds(labelledBy, field?.labelId)}
          aria-describedby={mergeFieldIds(describedBy, field?.descriptionIds, !field && message ? messageId : undefined, suffixText ? unitId : undefined)}
          aria-valuemin={min} aria-valuemax={max} aria-valuenow={inspected.value ?? undefined}
          aria-valuetext={suffixText && inspected.value !== null ? `${draft} ${suffixText}` : undefined}
          aria-invalid={message || status === "error" ? true : ariaInvalid}
          onChange={event => {
            if (disabled || readOnly) return;
            const text = event.currentTarget.value;
            if (compositionDraft.current !== null) { setDraft(text); syncNative(text); return; }
            if (!accept(text)) event.currentTarget.value = draft;
            else onChange?.(event);
          }}
          onBlur={event => { finish(); setPointerFocused(false); onBlur?.(event); }}
          onFocus={event => { onFocus?.(event); }}
          onInvalid={event => { setTouched(true); onInvalid?.(event); }}
          onKeyDown={event => {
            onKeyDown?.(event);
            if (event.defaultPrevented || disabled || readOnly || compositionDraft.current !== null || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return;
            if (event.key === "Enter") { finish(); onPressEnter?.(event); }
            if ((event.key === "ArrowUp" || event.key === "ArrowDown") && !event.ctrlKey && !event.metaKey && !event.altKey) {
              event.preventDefault(); adjust(event.key === "ArrowUp" ? 1 : -1);
            }
          }}
          onCompositionStart={event => { compositionDraft.current = draft; setComposing(true); onCompositionStart?.(event); }}
          onCompositionEnd={event => {
            const before = compositionDraft.current ?? draft;
            compositionDraft.current = null; setComposing(false);
            if (!accept(event.currentTarget.value, before)) { event.currentTarget.value = before; setDraft(before); syncNative(before); }
            onCompositionEnd?.(event);
          }} />
        {clearable && !disabled && !readOnly ? <span data-slot="clear-slot" className="rain-input-number__clear-slot">
          {draft ? <button type="button" className="rain-input-number__clear" data-slot="clear-action" aria-label={clearLabel ?? `清除${fieldName}`}
            onMouseDown={event => event.preventDefault()} onClick={() => { setTouched(true); accept(""); inputRef.current?.focus(); commit(""); }}><CircleCloseFilledIcon aria-hidden="true" /></button> : null}
        </span> : null}
        {suffixText ? <span className={inputSuffixTextClassName} data-slot="suffix-text" aria-hidden="true">{suffixText}</span> : null}
      </span>
      {controls ? stacked ? <span className="rain-input-number__controls" data-slot="controls">
        {renderStep(1)}{renderStep(-1)}
      </span> : renderStep(1) : null}
    </span>
    {name ? <input ref={submissionRef} type="hidden" name={name} form={form} disabled={disabled} value={inspected.kind === "number" && inspected.value !== null ? String(inspected.value) : ""} /> : null}
    {suffixText ? <span id={unitId} className="sr-only">单位：{suffixText}</span> : null}
    {!field && message ? <span id={messageId} className={rainCn("rain-type-ui-default", formItemColors.error)} data-slot="message">{message}</span> : null}
  </span>;
});
InputNumber.displayName = "InputNumber";
