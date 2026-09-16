import { Children, createContext, useContext, useId, useState, type MouseEventHandler, type ReactElement, type ReactNode } from "react";
import { rainCn } from "../utils/rain-class-names";
import type { InputStatus } from "./input";

interface FieldContext {
  id: string;
  labelId: string;
  labelText?: string;
  label: ReactNode;
  labelPosition: "top" | "inside";
  descriptionIds: string;
  status: InputStatus;
  disabled: boolean;
  required: boolean;
  /** Child-owned numeric validation is presentation-only here; the child owns its value. */
  setControlMessage: (message: string) => void;
}

export const FormItemContext = createContext<FieldContext | null>(null);
export function useFormItem() { return useContext(FormItemContext); }

export function mergeFieldIds(...ids: Array<string | undefined>) {
  return [...new Set(ids.filter(Boolean).join(" ").split(/\s+/).filter(Boolean))].join(" ") || undefined;
}

export const formItemColors = {
  root: "text-rain-category-text-neutral-1", required: "text-rain-category-text-red-1",
  inside: "text-rain-category-text-neutral-4",
  help: "text-rain-category-text-neutral-3", error: "text-rain-category-text-red-1", warning: "text-rain-category-text-orange-1", message: "text-rain-category-text-neutral-3",
};

export interface FormItemProps {
  /** One Input, InputNumber, SearchInput, Select or Textarea (top label); owns label and validation presentation. */
  children: ReactElement<{ id?: string }>;
  label: ReactNode;
  /** Fixed inside label for Input, InputNumber, SearchInput and single-line Select compositions. */
  labelPosition?: "top" | "inside";
  id?: string;
  help?: ReactNode;
  message?: ReactNode;
  status?: InputStatus;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function InsideFieldLabel({ disabled, onClick }: { disabled: boolean; onClick?: MouseEventHandler<HTMLLabelElement> }) {
  const field = useFormItem();
  if (field?.labelPosition !== "inside") return null;
  return <label id={field.labelId} htmlFor={field.id} title={field.labelText} data-slot="label" data-label-position="inside"
    className={rainCn("rain-field-label inline-flex min-w-0 flex-none items-center gap-rain-4 mr-rain-4", disabled ? "text-inherit" : formItemColors.inside)} onClick={onClick}>
    <span className="truncate">{field.label}</span>
    {field.required ? <span aria-hidden="true" data-slot="required">*</span> : null}
  </label>;
}

export function FormItem({ children, label, labelPosition = "top", id, help, message, status = "default", required = false, disabled = false, className }: FormItemProps) {
  const generatedId = useId();
  const [controlMessage, setControlMessage] = useState("");
  const child = Children.only(children);
  const controlId = id ?? child.props.id ?? `rain-field-${generatedId}`;
  const labelId = `${controlId}-label`;
  const hasHelp = help !== undefined && help !== null;
  const hasMessage = message !== undefined && message !== null;
  const displayedStatus = controlMessage && !disabled ? "error" : status;
  if (!["top", "inside"].includes(labelPosition)) throw new Error("FormItem labelPosition must be top or inside.");
  return <FormItemContext.Provider value={{ id: controlId, labelId, label, labelPosition, labelText: typeof label === "string" ? label : undefined,
    descriptionIds: [hasHelp && `${controlId}-help`, hasMessage && `${controlId}-message`, controlMessage && !disabled && `${controlId}-control-message`].filter(Boolean).join(" "),
    status: displayedStatus, disabled, required, setControlMessage }}>
    <div className={rainCn("rain-form-item flex flex-col min-w-0 gap-rain-4 rain-type-ui-default", formItemColors.root, className)} data-rain-id="ui-form-item" data-slot="root" data-status={displayedStatus} data-label-position={labelPosition}>
      {labelPosition === "top" ? <label className="inline-flex items-center gap-rain-4 mb-rain-4 text-rain-size-14 font-rain-semibold" id={labelId} htmlFor={controlId} data-slot="label">
        {label}{required ? <span aria-hidden="true" className={formItemColors.required} data-slot="required">*</span> : null}
      </label> : null}
      {child}
      {hasHelp ? <span id={`${controlId}-help`} data-slot="help" className={formItemColors.help}>{help}</span> : null}
      {hasMessage ? <span id={`${controlId}-message`} data-slot="message" className={status === "default" ? formItemColors.message : formItemColors[status]}>{message}</span> : null}
      {controlMessage && !disabled ? <span id={`${controlId}-control-message`} data-slot="control-message" className={formItemColors.error}>{controlMessage}</span> : null}
    </div>
  </FormItemContext.Provider>;
}
