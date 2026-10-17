// Adapted from shadcn-ui/ui@3ba91b1 Base UI InputOTP and Nova; MIT/source lock: evidence/runtime/g6-preflight-2026-10-14.
import { useContext, type ComponentProps } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { useDensity } from "@rain-next/foundations";
import { MinusIcon } from "@rain-next/ui/icons/minus";
import { mergeFieldIds, useFormItem } from "../input/form-item";
import type { InputStatus } from "../input/input";
import { rainCn } from "../utils/rain-class-names";
import "./input-otp.css";

export type InputOTPProps = ComponentProps<typeof OTPInput> & { status?: InputStatus };

export function InputOTP({ className, containerClassName, status: inputStatus = "default", disabled: inputDisabled,
  id, required, "aria-invalid": ariaInvalid, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy,
  maxLength, spellCheck = false, ...props }: InputOTPProps) {
  const field = useFormItem(), density = useDensity();
  const status = field?.status ?? inputStatus;
  if (!Number.isSafeInteger(maxLength) || maxLength <= 0) throw new Error("InputOTP maxLength must be a positive safe integer.");
  return <OTPInput {...props} maxLength={maxLength} id={field?.id ?? id} disabled={inputDisabled || field?.disabled}
    required={required || field?.required} aria-invalid={status === "error" ? true : ariaInvalid}
    aria-labelledby={mergeFieldIds(ariaLabelledBy, field?.labelId)} aria-describedby={mergeFieldIds(ariaDescribedBy, field?.descriptionIds)}
    spellCheck={spellCheck} data-rain-id="ui-input-otp" data-slot="input-otp" data-density={density} data-status={status}
    containerClassName={rainCn("rain-input-otp", containerClassName)} className={rainCn("rain-input-otp__input", className)} />;
}

export type InputOTPGroupProps = ComponentProps<"div">;
export function InputOTPGroup({ className, ...props }: InputOTPGroupProps) {
  return <div {...props} data-slot="input-otp-group" className={rainCn("rain-input-otp__group", className)} />;
}

export type InputOTPSlotProps = ComponentProps<"div"> & { index: number };
export function InputOTPSlot({ index, className, ...props }: InputOTPSlotProps) {
  const context = useContext(OTPInputContext);
  const slot = context?.slots?.[index];
  if (!Number.isSafeInteger(index) || index < 0 || !slot) throw new Error("InputOTPSlot index must identify a slot inside InputOTP.");
  const { char, placeholderChar, hasFakeCaret, isActive } = slot;
  return <div {...props} data-slot="input-otp-slot" data-active={isActive} data-placeholder={char === null && placeholderChar !== null || undefined}
    className={rainCn("rain-input-otp__slot", className)}>
    {char ?? placeholderChar}
    {hasFakeCaret && <div className="rain-input-otp__caret" aria-hidden="true"><div className="rain-input-otp__caret-line" /></div>}
  </div>;
}

export type InputOTPSeparatorProps = ComponentProps<"div">;
export function InputOTPSeparator({ className, ...props }: InputOTPSeparatorProps) {
  return <div role="separator" aria-hidden="true" {...props} data-slot="input-otp-separator"
    className={rainCn("rain-input-otp__separator", className)}><MinusIcon size={16} /></div>;
}
