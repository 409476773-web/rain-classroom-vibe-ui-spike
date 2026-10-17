import { cloneElement, forwardRef, isValidElement, type ReactNode, type SyntheticEvent, type TextareaHTMLAttributes } from "react";
import { useDensity } from "@rain-next/foundations";
import { fieldFrameRecipe, type FieldAppearance, type FieldStatus } from "../field/field.styles";
import { mergeFieldIds, useFormItem } from "../input/form-item";
import { inputControlClassName } from "../input/input.styles";
import { rainCn } from "../utils/rain-class-names";
import { Button } from "../button/button";
import { IconButton } from "../icon-button/icon-button";
import "./textarea.css";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "defaultValue"> {
  appearance?: FieldAppearance;
  status?: FieldStatus;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Content above or below the native textarea, within its existing field frame. */
  blockStart?: ReactNode;
  blockEnd?: ReactNode;
  /** Set false for view/copy actions that remain usable in read-only fields. */
  blockStartChangesValue?: boolean;
  blockEndChangesValue?: boolean;
}

function stopActivation(event: SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
}

/** Retains the upstream Input Group's block additions and decorative-click focus. */
function BlockAddon({ children, align, blocked }: { children: ReactNode; align: "block-start" | "block-end"; blocked: boolean }) {
  if (children === undefined || children === null || children === false) return null;
  let content = children;
  if (blocked && isValidElement<{ disabled?: boolean }>(content)
    && (content.type === "button" || content.type === Button || content.type === IconButton)) {
    content = cloneElement(content, { disabled: true });
  }
  return <span className="rain-textarea__addon" data-slot="input-group-addon" data-align={align}
    inert={blocked || undefined} aria-disabled={blocked || undefined} data-blocked={blocked || undefined}
    onClickCapture={blocked ? stopActivation : undefined}
    onPointerDownCapture={blocked ? stopActivation : undefined}
    onPointerUpCapture={blocked ? stopActivation : undefined}
    onKeyDownCapture={(event) => { if (blocked && ["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) stopActivation(event); }}
    onKeyUpCapture={(event) => { if (blocked && ["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) stopActivation(event); }}
    onClick={(event) => {
      if (event.defaultPrevented || (event.target as Element).closest("button, a, input, select, textarea, label, summary, [role=button], [contenteditable=true], [tabindex]")) return;
      event.currentTarget.parentElement?.querySelector("textarea")?.focus();
    }}>{content}</span>;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({
  "aria-labelledby": labelledBy, "aria-describedby": describedBy, "aria-invalid": invalid,
  appearance = "outlined", status: controlStatus = "default", className, id,
  disabled: controlDisabled = false, required, readOnly = false, rows = 4,
  onChange, onValueChange, blockStart, blockEnd, blockStartChangesValue = true, blockEndChangesValue = true, ...nativeProps
}, ref) {
  const field = useFormItem();
  const density = useDensity();
  const disabled = controlDisabled || Boolean(field?.disabled);
  const status = field?.status ?? controlStatus;
  const permission = disabled ? "disabled" : readOnly ? "readonly" : "editable";
  const hasBlockAddons = [blockStart, blockEnd].some(content => content !== undefined && content !== null && content !== false);

  return <span className={rainCn("rain-textarea rain-input", fieldFrameRecipe({ appearance, status, state: permission, size: 32 }), "w-full min-h-rain-40 flex-auto items-stretch overflow-auto px-rain-0 rain-type-reading-small", hasBlockAddons && "flex-col gap-rain-0", disabled ? "resize-none" : "resize-y", className)}
    data-rain-id="ui-textarea" data-slot="root" data-density={density} data-state={disabled ? "disabled" : readOnly ? "read-only" : "editable"}
    data-appearance={appearance} data-status={status} data-permission={permission} data-has-block-addons={hasBlockAddons || undefined}>
    <BlockAddon align="block-start" blocked={disabled || (readOnly && blockStartChangesValue)}>{blockStart}</BlockAddon>
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
    <BlockAddon align="block-end" blocked={disabled || (readOnly && blockEndChangesValue)}>{blockEnd}</BlockAddon>
  </span>;
});
