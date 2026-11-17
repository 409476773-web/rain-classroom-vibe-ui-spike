import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Button } from "@rain-next/ui";
import "./table-controls.css";

export type TableSelectionBarProps = ComponentPropsWithoutRef<"div"> & { status: ReactNode; onClear: () => void; clearLabel?: ReactNode; description?: ReactNode };

export function TableSelectionBar({ status, onClear, clearLabel = "取消选择", description, children, className, ...props }: TableSelectionBarProps) {
  return <div role="toolbar" data-rain-id="pattern-table-selection-bar" data-rain-table-family="v2" {...props} className={["rt-group-batch", "rt-selection-bar", className].filter(Boolean).join(" ")}>{status}{children}<Button className="rt-selection-clear" size="regular" variant="text" onClick={onClear}>{clearLabel}</Button>{description}</div>;
}
