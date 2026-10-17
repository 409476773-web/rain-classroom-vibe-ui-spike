import { iconSizeClassNames, selectActionSizeClassName, selectValueHeightClassNames } from "@rain-next/foundations";
import { rainCn } from "../utils/rain-class-names";

export const selectRootClassName = "rain-select group/select grid min-w-0 gap-rain-4";
export const selectControlClassName = "rain-select__control flex min-w-0 flex-1 items-center gap-rain-4 border-none bg-transparent p-rain-0 text-left text-inherit outline-none cursor-pointer disabled:cursor-not-allowed";
export const selectPlaceholderClassName = "truncate text-rain-category-text-neutral-5 group-data-[permission=disabled]/select:text-rain-category-text-neutral-6";
export const selectCountClassName = "flex-none text-rain-category-text-neutral-3 group-data-[permission=disabled]/select:text-rain-category-text-neutral-6";
export const selectArrowColors = "text-rain-category-icon-neutral-4 group-data-[permission=disabled]/select:text-rain-category-icon-neutral-5";
export const selectArrowClassName = rainCn("inline-flex flex-none items-center justify-center", selectArrowColors, iconSizeClassNames[16]);
export const selectClearColors = "text-rain-category-icon-neutral-3 hover:text-rain-category-icon-neutral-2 active:text-rain-category-icon-neutral-1";
export const selectClearClassName = rainCn("rain-select__action inline-flex flex-none items-center justify-center rounded-rain-4 border-none bg-transparent p-rain-0 cursor-pointer", selectClearColors, selectActionSizeClassName);
export const selectActionIconClassName = rainCn("inline-flex items-center justify-center [&>.rain-icon]:size-full", iconSizeClassNames[14]);
export const selectValueColors = "bg-rain-category-fill-neutral-alpha-4 text-rain-category-text-neutral-1 group-data-[permission=disabled]/select:text-rain-category-text-neutral-6";
export function selectedValueClassName(size: 32 | 36) {
  return rainCn("inline-flex min-w-0 max-w-full flex-none items-center gap-rain-4 rounded-rain-4 pl-rain-6 pr-rain-2 rain-type-ui-default", selectValueColors, selectValueHeightClassNames[size === 32 ? 24 : 28]);
}
export const selectRemoveColors = "text-rain-category-icon-neutral-2 hover:text-rain-category-icon-neutral-1 hover:bg-rain-category-fill-neutral-alpha-5 active:bg-rain-category-fill-neutral-alpha-4";
export const selectRemoveClassName = rainCn("rain-select__action inline-flex flex-none items-center justify-center rounded-rain-4 border-none bg-transparent p-rain-0 cursor-pointer", selectRemoveColors, selectActionSizeClassName);
export const selectSecondaryClassName = "text-rain-category-text-neutral-3";
export const selectIndicatorClassName = "text-rain-category-icon-brand-1";
