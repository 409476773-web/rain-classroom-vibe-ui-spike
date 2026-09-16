import { forwardRef, type TextareaHTMLAttributes } from "react";
import { useDensity } from "@rain-next/foundations";
import { fieldFrameRecipe, type FieldAppearance, type FieldStatus } from "../field/field.styles";
import { mergeFieldIds, useFormItem } from "../input/form-item";
import { inputControlClassName } from "../input/input.styles";
import { rainCn } from "../utils/rain-class-names";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "defaultValue"> {
  appearance?: FieldAppearance;
  status?: FieldStatus;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({
  "aria-labelledby": labelledBy, "aria-describedby": describedBy, "aria-invalid": invalid,
  appearance = "outlined", status: controlStatus = "default", className, id,
  disabled: controlDisabled = false, required, readOnly = false, rows = 4,
  onChange, onValueChange, ...nativeProps
}, ref) {
  const field = useFormItem();
  const density = useDensity();
  const disabled = controlDisabled || Boolean(field?.disabled);
  const status = field?.status ?? controlStatus;
  const permission = disabled ? "disabled" : readOnly ? "readonly" : "editable";

  return <span className={rainCn("rain-textarea rain-input", fieldFrameRecipe({ appearance, status, state: permission, size: 32 }), "w-full min-h-rain-40 flex-auto items-stretch overflow-auto px-rain-0 rain-type-reading-small", disabled ? "resize-none" : "resize-y", className)}
    data-rain-id="ui-textarea" data-slot="root" data-density={density} data-state={disabled ? "disabled" : readOnly ? "read-only" : "editable"}
    data-appearance={appearance} data-status={status} data-permission={permission}>
    <textarea {...nativeProps} ref={ref} id={field?.id ?? id} rows={rows}
      className={rainCn(inputControlClassName, "block min-h-0 resize-none px-rain-12 py-rain-8")}
      data-slot="control" disabled={disabled} required={required || field?.required} readOnly={readOnly}
      aria-labelledby={mergeFieldIds(labelledBy, field?.labelId)} aria-describedby={mergeFieldIds(describedBy, field?.descriptionIds)}
      aria-invalid={status === "error" ? true : invalid}
      onChange={(event) => {
        if (disabled || readOnly) return;
        onValueChange?.(event.currentTarget.value);
        onChange?.(event);
      }} />
  </span>;
});
