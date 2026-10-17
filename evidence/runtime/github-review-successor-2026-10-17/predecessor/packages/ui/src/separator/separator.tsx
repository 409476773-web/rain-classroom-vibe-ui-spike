// Adapted from shadcn/ui Base UI Separator; MIT notice: evidence/runtime/dialog-v2/upstream.
import { forwardRef } from "react";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { rainCn } from "../utils/rain-class-names";
import "./separator.css";

export type SeparatorProps = Omit<BaseSeparator.Props, "className"> & { className?: string; decorative?: boolean };
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator({ className, decorative = false, ...props }, ref) {
  return <BaseSeparator {...props} ref={ref} role={decorative ? "presentation" : "separator"} aria-hidden={decorative || undefined}
    data-rain-id="ui-separator" data-slot="root" className={rainCn("rain-separator shrink-0", className)} />;
});
