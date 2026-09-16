import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type ForwardedRef,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import {
  densityMetrics,
  useDensity,
  type Density,
} from "@rain-next/foundations";

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "defaultValue" | "value"
  > {
  clearable?: boolean;
  clearLabel?: string;
  defaultValue?: string;
  density?: Density;
  description?: ReactNode;
  endAdornment?: ReactNode;
  errorMessage?: ReactNode;
  label: ReactNode;
  onValueChange?: (value: string) => void;
  startAdornment?: ReactNode;
  value?: string;
}

type AdornmentSlot = "start-adornment" | "end-adornment";
type AdornmentElementProps = {
  className?: string;
  "data-slot"?: AdornmentSlot;
};

function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function setForwardedRef<T>(ref: ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  if (ref) {
    ref.current = value;
  }
}

function renderAdornment(adornment: ReactNode, slot: AdornmentSlot) {
  if (isValidElement<AdornmentElementProps>(adornment)) {
    const element = adornment as ReactElement<AdornmentElementProps>;
    return cloneElement(element, {
      className: mergeClasses("rain-input-adornment", element.props.className),
      "data-slot": slot,
    });
  }

  return (
    <span className="rain-input-adornment" data-slot={slot}>
      {adornment}
    </span>
  );
}

function dispatchNativeInputValue(input: HTMLInputElement, value: string) {
  const inputPrototype =
    input.ownerDocument.defaultView?.HTMLInputElement.prototype;
  const nativeValueSetter = inputPrototype
    ? Object.getOwnPropertyDescriptor(inputPrototype, "value")?.set
    : undefined;

  if (nativeValueSetter) {
    nativeValueSetter.call(input, value);
  } else {
    input.value = value;
  }

  const InputEvent = input.ownerDocument.defaultView?.Event ?? Event;
  input.dispatchEvent(new InputEvent("input", { bubbles: true }));
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    className,
    clearable = false,
    clearLabel,
    defaultValue = "",
    density,
    description,
    disabled = false,
    endAdornment,
    errorMessage,
    id,
    label,
    onChange,
    onValueChange,
    readOnly = false,
    startAdornment,
    value,
    ...inputProps
  },
  forwardedRef,
) {
  const contextDensity = useDensity();
  const resolvedDensity = density ?? contextDensity;
  const metrics = densityMetrics[resolvedDensity];
  const densityStyle = {
    "--rain-density-control-height": metrics.controlHeight,
    "--rain-density-control-padding-inline": metrics.controlPaddingInline,
    "--rain-density-item-gap": metrics.itemGap,
  } as CSSProperties;
  const generatedId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const controlId = id ?? `rain-input-${generatedId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const hasError = errorMessage !== undefined && errorMessage !== null;
  const messageId = hasError ? `${controlId}-message` : undefined;
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = isControlled ? value : uncontrolledValue;
  const controlRef = useRef<HTMLInputElement | null>(null);
  const fieldState = disabled
    ? "disabled"
    : readOnly
      ? "read-only"
      : hasError
        ? "error"
        : currentValue.length > 0
          ? "value"
          : "default";
  const describedBy = [ariaDescribedBy, descriptionId, messageId]
    .filter(Boolean)
    .join(" ") || undefined;
  const resolvedClearLabel =
    clearLabel ??
    (typeof label === "string" ? `清除${label}` : "清除输入内容");
  const showClearAction =
    clearable && currentValue.length > 0 && !disabled && !readOnly;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.currentTarget.value;
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
    onChange?.(event);
  }

  function handleClear() {
    if (disabled || readOnly) {
      return;
    }
    const control = controlRef.current;
    if (!control) {
      return;
    }
    dispatchNativeInputValue(control, "");
    control.focus();
  }

  return (
    <div
      className={mergeClasses("rain-input-field", className)}
      data-density={resolvedDensity}
      data-rain-id="ui-input"
      data-slot="field"
      data-state={fieldState}
      style={densityStyle}
    >
      <label
        className="rain-input-label"
        data-slot="label"
        htmlFor={controlId}
      >
        {label}
      </label>

      <div className="rain-input-control" data-slot="control-wrapper">
        {startAdornment === undefined
          ? null
          : renderAdornment(startAdornment, "start-adornment")}

        <input
          {...inputProps}
          ref={(node) => {
            controlRef.current = node;
            setForwardedRef(forwardedRef, node);
          }}
          aria-describedby={describedBy}
          aria-invalid={hasError ? true : ariaInvalid}
          className="rain-input-native"
          data-density={resolvedDensity}
          data-focus="control"
          data-slot="control"
          disabled={disabled}
          id={controlId}
          onChange={handleChange}
          readOnly={readOnly}
          value={currentValue}
        />

        {endAdornment === undefined
          ? null
          : renderAdornment(endAdornment, "end-adornment")}

        {showClearAction ? (
          <button
            aria-label={resolvedClearLabel}
            className="rain-input-clear"
            data-focus="control"
            data-slot="clear-action"
            onClick={handleClear}
            type="button"
          >
            清除
          </button>
        ) : null}
      </div>

      {description ? (
        <p
          className="rain-input-description"
          data-slot="description"
          id={descriptionId}
        >
          {description}
        </p>
      ) : null}

      {hasError ? (
        <p
          className="rain-input-message"
          data-slot="message"
          id={messageId}
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = "Input";
