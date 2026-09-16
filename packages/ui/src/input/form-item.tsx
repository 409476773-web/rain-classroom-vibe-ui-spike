import { Children, createContext, useContext, useId, type ReactElement, type ReactNode } from "react";
import { rainCn } from "../utils/rain-class-names";
import type { InputStatus } from "./input";

interface FieldContext {
  id: string;
  labelId: string;
  labelText?: string;
  descriptionIds: string;
  status: InputStatus;
  disabled: boolean;
  required: boolean;
}

export const FormItemContext = createContext<FieldContext | null>(null);
export function useFormItem() { return useContext(FormItemContext); }

export function mergeFieldIds(...ids: Array<string | undefined>) {
  return [...new Set(ids.filter(Boolean).join(" ").split(/\s+/).filter(Boolean))].join(" ") || undefined;
}

export const formItemColors = {
  root: "text-rain-category-text-neutral-1", required: "text-rain-category-text-red-1",
  help: "text-rain-category-text-neutral-3", error: "text-rain-category-text-red-1", warning: "text-rain-category-text-orange-1", message: "text-rain-category-text-neutral-3",
};

export interface FormItemProps {
  /** One Input, SearchInput, Textarea or Select; this recipe owns label and validation presentation. */
  children: ReactElement<{ id?: string }>;
  label: ReactNode;
  id?: string;
  help?: ReactNode;
  message?: ReactNode;
  status?: InputStatus;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormItem({ children, label, id, help, message, status = "default", required = false, disabled = false, className }: FormItemProps) {
  const generatedId = useId();
  const child = Children.only(children);
  const controlId = id ?? child.props.id ?? `rain-field-${generatedId}`;
  const labelId = `${controlId}-label`;
  const hasHelp = help !== undefined && help !== null;
  const hasMessage = message !== undefined && message !== null;
  return <FormItemContext.Provider value={{ id: controlId, labelId, labelText: typeof label === "string" ? label : undefined,
    descriptionIds: [hasHelp && `${controlId}-help`, hasMessage && `${controlId}-message`].filter(Boolean).join(" "),
    status, disabled, required }}>
    <div className={rainCn("rain-form-item grid min-w-0 gap-rain-4 rain-type-ui-default", formItemColors.root, className)} data-rain-id="ui-form-item" data-slot="root" data-status={status}>
      <label className="inline-flex items-center gap-rain-4" id={labelId} htmlFor={controlId} data-slot="label">
        {label}{required ? <span aria-hidden="true" className={formItemColors.required} data-slot="required">*</span> : null}
      </label>
      {child}
      {hasHelp ? <span id={`${controlId}-help`} data-slot="help" className={formItemColors.help}>{help}</span> : null}
      {hasMessage ? <span id={`${controlId}-message`} data-slot="message" className={status === "default" ? formItemColors.message : formItemColors[status]}>{message}</span> : null}
    </div>
  </FormItemContext.Provider>;
}
