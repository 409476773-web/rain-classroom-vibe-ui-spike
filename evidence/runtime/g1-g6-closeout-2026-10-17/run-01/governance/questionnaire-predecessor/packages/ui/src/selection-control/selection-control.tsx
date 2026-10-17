import type { ComponentPropsWithRef, ReactElement, ReactNode } from "react";
import { useDensity } from "@rain-next/foundations";
import { CheckBoldIcon } from "../icons/check-bold";
import { MinusBoldIcon } from "../icons/minus-bold";
import { rainCn } from "../utils/rain-class-names";

export type SelectionVisualState =
  | { kind: "radio"; checked: boolean; disabled: boolean; invalid?: boolean }
  | { kind: "checkbox"; checked: boolean; disabled: boolean; indeterminate?: boolean; invalid?: boolean };
export type SelectionControlLabelProps = Omit<ComponentPropsWithRef<"label">, "children"> & {
  [attribute: `data-${string}`]: string | number | boolean | undefined;
};
export interface SelectionControlSurfaceProps {
  state: SelectionVisualState;
  /** The owner supplies the only input, including its behavior and ref. Never cloned. */
  input: ReactElement;
  children: ReactNode;
  trailing?: ReactNode;
  labelProps?: SelectionControlLabelProps;
  indicatorClassName?: string;
  renderLabel?: (props: ComponentPropsWithRef<"label">) => ReactElement;
}

/** Internal passive visuals shared by native controls and menus. */
export function RadioIndicator({ checked, className }: { checked: boolean; className?: string }) {
  return <span data-slot="canvas" className="flex h-rain-24 w-rain-24 flex-none items-center justify-center" aria-hidden="true">
    <span data-slot="control" className={rainCn("inline-flex h-rain-18 w-rain-18 flex-none box-border items-center justify-center rounded-rain-full border-solid border-rain-line-1", className)}>
      {checked && <span data-slot="mark" className="h-rain-6 w-rain-6 rounded-rain-full" />}
    </span>
  </span>;
}
export function CheckboxIndicator({ checked, indeterminate = false, className }: { checked: boolean; indeterminate?: boolean; className?: string }) {
  return <span data-slot="canvas" className="flex h-rain-24 w-rain-24 flex-none items-center justify-center" aria-hidden="true">
    <span data-slot="control" className={rainCn("inline-flex h-rain-16 w-rain-16 flex-none box-border items-center justify-center rounded-rain-4 border-solid border-rain-line-1", className)}>
      {indeterminate ? <MinusBoldIcon className="h-rain-10 w-rain-10" /> : checked ? <CheckBoldIcon className="h-rain-10 w-rain-10" /> : null}
    </span>
  </span>;
}

/** Shared presentation only. The input remains a direct child of the sole label. */
export function SelectionControlSurface({ state, input, children, trailing, labelProps, indicatorClassName, renderLabel }: SelectionControlSurfaceProps) {
  const density = useDensity();
  const visualState = state.kind === "checkbox" && state.indeterminate ? "mixed" : state.checked ? "checked" : "unchecked";
  const props = {
    "data-rain-id": state.kind === "radio" ? "ui-radio" : "ui-checkbox",
    "data-slot": "root",
    "data-density": density,
    "data-state": visualState,
    "data-disabled": state.disabled,
    "data-rain-state": state.disabled ? "disabled" : visualState,
    "data-invalid": state.invalid || undefined,
    ...labelProps,
    className: rainCn(state.kind === "radio" ? "rain-radio" : "rain-checkbox", "relative inline-flex min-w-rain-0 max-w-full items-start gap-rain-8 align-middle font-rain-ui cursor-pointer has-[:disabled]:cursor-not-allowed", labelProps?.className),
    children: <>{input}
      {state.kind === "radio" ? <RadioIndicator checked={state.checked} className={indicatorClassName} /> : <CheckboxIndicator checked={state.checked} indeterminate={state.indeterminate} className={indicatorClassName} />}
      {children}{trailing}
    </>,
  };
  return renderLabel ? renderLabel(props) : <label {...props} />;
}

export interface SelectionControlContentProps {
  label?: string;
  description?: string;
  labelId: string;
  descriptionId: string;
  labelClassName?: string;
  descriptionClassName?: string;
}
export function SelectionControlContent({ label, description, labelId, descriptionId, labelClassName, descriptionClassName }: SelectionControlContentProps) {
  return (label || description) ? <span data-slot="content" className="flex min-w-rain-0 flex-col gap-rain-4 break-words">
    {label && <span id={labelId} data-slot="label" className={rainCn("text-rain-size-15 leading-rain-24 font-rain-semibold", labelClassName)}>{label}</span>}
    {description && <span id={descriptionId} data-slot="description" className={rainCn("text-rain-size-13 leading-rain-22 font-rain-regular", descriptionClassName)}>{description}</span>}
  </span> : null;
}
