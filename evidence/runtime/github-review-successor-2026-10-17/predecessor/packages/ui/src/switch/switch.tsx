import { forwardRef, useRef, useState, type ButtonHTMLAttributes, type HTMLAttributes, type MouseEvent as ReactMouseEvent, type MouseEventHandler, type Ref } from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import type { SwitchRootProps, SwitchRootState } from "@base-ui/react/switch";
import { useDensity } from "@rain-next/foundations";
import { ButtonLoadingIcon } from "../icons/button-loading";
import { useDefaultReset } from "../utils/use-default-reset";
import { rainCn } from "../utils/rain-class-names";

export type SwitchSize = "small" | "medium" | "large";

type SwitchBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>,
  | "children" | "type" | "disabled" | "defaultChecked" | "value" | "name" | "form"
  | "onChange" | "onClick" | "role" | "aria-checked" | "aria-pressed" | "aria-disabled" | "aria-busy" | "aria-readonly" | "aria-required"
> & {
  size?: SwitchSize;
  disabled?: boolean;
  loading?: boolean;
  name?: string;
  value?: string;
  form?: string;
  required?: boolean;
  "aria-disabled"?: boolean | "true" | "false";
  "aria-busy"?: boolean | "true" | "false";
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type SwitchProps = SwitchBaseProps & (
  | { checked: boolean; defaultChecked?: never; onCheckedChange: (checked: boolean) => void }
  | { checked?: never; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void }
);

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked,
    onCheckedChange,
    size = "medium",
    disabled = false,
    loading = false,
    className,
    name,
    value,
    form,
    required = false,
    onClick,
    onClickCapture,
    "aria-disabled": ariaDisabled,
    "aria-busy": ariaBusy,
    ...nativeProps
  },
  ref,
) {
  const density = useDensity();
  const controlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const selected = controlled ? checked : internalChecked;
  const inputRef = useRef<HTMLInputElement>(null);
  useDefaultReset(inputRef, !controlled, () => [[inputRef.current!, defaultChecked ?? false]], () => setInternalChecked(defaultChecked ?? false));
  const { role: _role, ["aria-pressed"]: _ariaPressed, ...safeNativeProps } = nativeProps as typeof nativeProps & { role?: string; "aria-pressed"?: unknown };

  if (checked !== undefined && typeof checked !== "boolean") throw new Error("Switch checked must be a boolean.");
  if (defaultChecked !== undefined && typeof defaultChecked !== "boolean") throw new Error("Switch defaultChecked must be a boolean.");
  if (checked !== undefined && defaultChecked !== undefined) throw new Error("Switch cannot combine checked and defaultChecked.");
  if (!["small", "medium", "large"].includes(size)) throw new Error("Switch requires an approved size.");
  if (value !== undefined && (typeof value !== "string" || value.length === 0)) throw new Error("Switch value must be a non-empty string.");

  const renderButton = (props: HTMLAttributes<HTMLButtonElement> & { ref?: Ref<HTMLButtonElement> }, state: SwitchRootState) => (
    <button
      {...props}
      type="button"
      ref={props.ref}
      data-rain-id="ui-switch"
      data-slot="root"
      data-density={density}
      data-size={size}
      data-state={state.disabled ? "disabled" : state.checked ? "checked" : "unchecked"}
      data-rain-state={state.disabled ? "disabled" : state.checked ? "checked" : "unchecked"}
      data-disabled={state.disabled || undefined}
      data-loading={loading || undefined}
      data-focus="control"
    />
  );

  return (
    <SwitchPrimitive.Root
      {...(safeNativeProps as unknown as SwitchRootProps)}
      ref={ref}
      checked={selected}
      disabled={disabled}
      readOnly={loading}
      inputRef={inputRef}
      name={name}
      value={value}
      form={form}
      required={required}
      nativeButton
      aria-disabled={disabled || loading ? true : ariaDisabled}
      aria-busy={loading ? true : ariaBusy}
      className={rainCn("rain-switch", className)}
      onCheckedChange={(next) => {
        if (loading) return;
        if (!controlled) setInternalChecked(next);
        onCheckedChange?.(next);
      }}
      onClick={loading ? undefined : (event) => {
        onClick?.(event as unknown as ReactMouseEvent<HTMLButtonElement>);
        const baseEvent = event as unknown as { defaultPrevented: boolean; preventBaseUIHandler?: () => void };
        if (baseEvent.defaultPrevented) baseEvent.preventBaseUIHandler?.();
      }}
      onClickCapture={loading ? (event) => { event.preventDefault(); event.stopPropagation(); } : onClickCapture as SwitchRootProps["onClick"]}
      render={renderButton}
    >
      <span data-slot="track" aria-hidden="true">
        <SwitchPrimitive.Thumb data-slot="indicator" aria-hidden="true">
          {loading && <ButtonLoadingIcon data-slot="loading-indicator" aria-hidden="true" />}
        </SwitchPrimitive.Thumb>
      </span>
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = "Switch";
