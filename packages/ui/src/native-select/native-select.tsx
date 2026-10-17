import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { iconSizeClassNames, useDensity, type InputSize } from "@rain-next/foundations";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { fieldFrameRecipe, type FieldAppearance, type FieldStatus } from "../field/field.styles";
import { InsideFieldLabel, mergeFieldIds, useFormItem } from "../input/form-item";
import { inputControlClassName, inputSizeClassName } from "../input/input.styles";
import { rainCn } from "../utils/rain-class-names";
import "./native-select.css";

export type NativeSelectProps = Omit<ComponentPropsWithoutRef<"select">, "size"> & {
  size?: InputSize;
  appearance?: FieldAppearance;
  status?: FieldStatus;
  onValueChange?: (value: string) => void;
};

// Adapted from the locked shadcn Native Select + Nova: native control and a decorative, noninteractive arrow.
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(function NativeSelect({
  "aria-labelledby": labelledBy, "aria-describedby": describedBy, "aria-invalid": invalid,
  appearance = "outlined", status: controlStatus = "default", className, size, id,
  disabled: controlDisabled = false, required, onChange, onValueChange, multiple, ...nativeProps
}, ref) {
  const density = useDensity();
  const field = useFormItem();
  const resolvedSize = size ?? (density === "compact" ? 24 : 32);
  const disabled = controlDisabled || Boolean(field?.disabled);
  const status = field?.status ?? controlStatus;
  return <div className={rainCn("rain-native-select rain-input", fieldFrameRecipe({ appearance, status, size: resolvedSize, state: disabled ? "disabled" : "editable" }), multiple ? "h-auto" : inputSizeClassName(resolvedSize), className)}
    data-rain-id="ui-native-select" data-slot="native-select-wrapper" data-size={resolvedSize} data-density={density}
    data-appearance={appearance} data-status={status} data-permission={disabled ? "disabled" : "editable"} data-state={disabled ? "disabled" : "editable"} data-multiple={multiple || undefined}>
    <InsideFieldLabel disabled={disabled} />
    <select {...nativeProps} ref={ref} id={field?.id ?? id} disabled={disabled} required={required || field?.required} multiple={multiple}
      data-slot="control" className={rainCn(inputControlClassName, "rain-native-select__control appearance-none h-full cursor-pointer disabled:cursor-not-allowed", multiple ? "pe-rain-0" : "pe-rain-20")}
      aria-labelledby={mergeFieldIds(labelledBy, field?.labelId)} aria-describedby={mergeFieldIds(describedBy, field?.descriptionIds)}
      aria-invalid={status === "error" ? true : invalid}
      onChange={(event) => {
        if (disabled) return;
        onValueChange?.(event.currentTarget.value);
        onChange?.(event);
      }} />
    {!multiple ? <span className={rainCn("rain-native-select__icon pointer-events-none absolute inline-flex select-none [&>.rain-icon]:size-full", iconSizeClassNames[resolvedSize === 24 ? 12 : 14])}
      data-slot="native-select-icon" aria-hidden="true"><ArrowDownIcon /></span> : null}
  </div>;
});

export function NativeSelectOption(props: ComponentPropsWithoutRef<"option">) {
  return <option data-slot="native-select-option" {...props} />;
}

export function NativeSelectOptGroup(props: ComponentPropsWithoutRef<"optgroup">) {
  return <optgroup data-slot="native-select-optgroup" {...props} />;
}
