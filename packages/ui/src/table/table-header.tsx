import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { useDensity } from "@rain-next/foundations";
import { Button } from "../button/button";
import { IconButton, type IconButtonProps } from "../icon-button/icon-button";
import { SortAscendingIcon } from "../icons/sort-ascending";
import { SortDescendingIcon } from "../icons/sort-descending";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { Tooltip } from "../tooltip/tooltip";
import { rainCn } from "../utils/rain-class-names";
import "./table.css";

export type TableSortDirection = "none" | "ascending" | "descending";
export type TableHeaderAlign = "start" | "center" | "end";
export const tableHeaderHeights = {
  compact: { title: 32, control: 40, twoLines: 50 },
  default: { title: 44, control: 48, twoLines: 62 },
} as const;

const sortRecipe = defineRainLocalRecipe<"root" | "label", "ui-button">({
  id: "table-header-sort", scope: "feature", origin: "ui-button",
  classes: { root: "rain-table-sort-button", label: "rain-table-sort-label" },
  modifiedParts: ["root", "label"], candidateTokens: [], promotionStatus: "accepted",
});

export const tableHeaderSelectRecipe = defineRainLocalRecipe<"frame" | "arrow", "ui-select">({
  id: "table-header-select", scope: "feature", origin: "ui-select",
  classes: { frame: "rain-table-header-select-frame", arrow: "rain-table-header-select-arrow" },
  modifiedParts: ["frame", "arrow"], candidateTokens: [], promotionStatus: "accepted",
});

export const TableHeaderContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div"> & {
  align?: TableHeaderAlign; actions?: ReactNode;
}>(function TableHeaderContent({ align = "start", actions, children, className, ...props }, ref) {
  return <div {...props} ref={ref} data-rain-id="ui-table-header-content" data-align={align}
    className={rainCn("rain-table-header-content", className)}>
    {typeof children === "string" ? <span className="rain-table-header-text">{children}</span> : children}{actions}
  </div>;
});

export const TableSortButton = forwardRef<HTMLButtonElement, Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  label: string; direction: TableSortDirection; onDirectionChange: (direction: TableSortDirection) => void;
}>(function TableSortButton({ label, direction, onDirectionChange, className, onClick, ...props }, ref) {
  const next = direction === "none" ? "ascending" : direction === "ascending" ? "descending" : "none";
  const hint = `${label}：${direction === "none" ? "点击升序排列" : direction === "ascending" ? "当前升序，点击降序" : "当前降序，点击恢复默认"}`;
  return <Tooltip text={hint} portal><Button {...props} ref={ref} variant="text" size="compact" localRecipe={sortRecipe}
    className={className} aria-label={props["aria-label"] ?? `按${label}排序`} data-active={direction !== "none" || undefined}
    onClick={event => { onClick?.(event); if (!event.defaultPrevented) onDirectionChange(next); }}>
    <span className="rain-table-header-text">{label}</span><span className="rain-table-sort-mark" aria-hidden="true">
      {direction === "descending" ? <SortDescendingIcon/> : <SortAscendingIcon/>}
    </span>
  </Button></Tooltip>;
});

export const TableHeaderAction = forwardRef<HTMLButtonElement, IconButtonProps & { active?: boolean; open?: boolean }>(
  function TableHeaderAction({ active = false, open = false, className, size, ...props }, ref) {
    const density = useDensity();
    return <IconButton {...props} ref={ref} size={size ?? (density === "compact" ? "24/14" : "32/14")}
      data-active={active || undefined} data-open={open || undefined} className={rainCn("rain-table-header-action", className)}/>;
  },
);

export const TableHeaderControl = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div"> & {
  label: string; htmlFor: string; kind?: "field" | "switch"; align?: TableHeaderAlign;
}>(function TableHeaderControl({ label, htmlFor, kind = "field", align = "end", children, className, ...props }, ref) {
  return <div {...props} ref={ref} data-rain-id="ui-table-header-control" data-align={align}
    className={rainCn("rain-table-header-control", className)}>
    <label htmlFor={htmlFor}>{label}</label><span className="rain-table-header-field" data-kind={kind}>{children}</span>
  </div>;
});
