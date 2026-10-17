import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { useDensity } from "@rain-next/foundations";
import { rainCn } from "../utils/rain-class-names";
import { tablePaints } from "./table.styles";
import "./table.css";

export const TableScrollArea = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div"> & { "aria-label": string }>(function TableScrollArea({ className, onKeyDown, ...props }, ref) {
  return <div {...props} ref={ref} role="region" tabIndex={0} data-focus="item" data-rain-id="ui-table-scroll-area" data-slot="scroll-area" className={rainCn("max-w-full min-w-0 overflow-auto", className)}
    onKeyDown={event => {
      onKeyDown?.(event);
      if (event.defaultPrevented || event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      event.currentTarget.scrollLeft += event.currentTarget.clientWidth / 2 * (event.key === "ArrowRight" ? 1 : -1);
    }} />;
});

export const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<"table">>(function Table({ className, ...props }, ref) {
  const density = useDensity();
  return <table {...props} ref={ref} data-rain-id="ui-table" data-slot="root" data-density={density}
    className={rainCn("rain-table group/table w-full border-collapse font-rain-ui text-rain-size-14 leading-rain-22 font-rain-regular", tablePaints.root, className)} />;
});
export const TableHeader = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<"thead">>(function TableHeader({ className, ...props }, ref) {
  return <thead {...props} ref={ref} data-slot="header" className={rainCn(tablePaints.header, className)} />;
});
export const TableBody = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<"tbody">>(function TableBody(props, ref) {
  return <tbody {...props} ref={ref} data-slot="body" />;
});
export const TableFooter = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<"tfoot">>(function TableFooter({ className, ...props }, ref) {
  return <tfoot {...props} ref={ref} data-slot="footer" className={rainCn(tablePaints.footer, className)} />;
});
export const TableRow = forwardRef<HTMLTableRowElement, ComponentPropsWithoutRef<"tr"> & { selected?: boolean }>(function TableRow({ className, selected = false, ...props }, ref) {
  return <tr {...props} ref={ref} data-slot="row" data-state={selected ? "selected" : "default"}
    className={rainCn("border-b-rain-line-1 border-solid", tablePaints.row, className)} />;
});
const cellClasses = "px-rain-16 py-rain-12 group-data-[density=compact]/table:py-rain-8 text-left align-middle";
export const TableHead = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<"th">>(function TableHead({ className, scope = "col", ...props }, ref) {
  return <th {...props} ref={ref} scope={scope} data-slot="head" className={rainCn("px-rain-16 py-rain-0 text-left align-middle rain-type-ui-compact whitespace-nowrap", className)} />;
});
export const TableCell = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<"td">>(function TableCell({ className, ...props }, ref) {
  return <td {...props} ref={ref} data-slot="cell" className={rainCn(cellClasses, className)} />;
});
export const TableCaption = forwardRef<HTMLTableCaptionElement, ComponentPropsWithoutRef<"caption">>(function TableCaption({ className, ...props }, ref) {
  return <caption {...props} ref={ref} data-slot="caption" className={rainCn("caption-bottom py-rain-12 text-left text-rain-size-13 leading-rain-22", tablePaints.caption, className)} />;
});
