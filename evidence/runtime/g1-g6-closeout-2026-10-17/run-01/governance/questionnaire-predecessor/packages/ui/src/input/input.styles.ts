import { cva } from "class-variance-authority";
import { rainCn } from "../utils/rain-class-names";
import { iconSizeClassNames, inputClearSizeClassName, inputSizeClassNames, type InputSize } from "@rain-next/foundations";

export { fieldFrameRecipe as inputRootRecipe } from "../field/field.styles";

export function inputSizeClassName(size: InputSize) { return inputSizeClassNames[size]; }
export const inputControlClassName = "rain-input__control min-w-0 w-full flex-1 border-none bg-transparent p-rain-0 text-inherit outline-none placeholder:text-rain-category-text-neutral-5 disabled:cursor-not-allowed disabled:placeholder:text-rain-category-text-neutral-6";
export const inputAffixClassName = "inline-flex flex-none items-center whitespace-nowrap text-rain-category-text-neutral-4 group-data-[state=disabled]/input:text-rain-category-text-neutral-6";
export const inputSuffixTextClassName = "inline-flex flex-none items-center whitespace-nowrap text-rain-category-text-neutral-5 group-data-[state=disabled]/input:text-rain-category-text-neutral-6";
export const inputIconColors = "text-rain-category-icon-neutral-3 group-data-[state=disabled]/input:text-rain-category-icon-neutral-5";
const inputIconStructure = rainCn("inline-flex flex-none items-center justify-center [&>.rain-icon]:size-full", iconSizeClassNames[16]);
export const inputIconClassName = rainCn(inputIconStructure, inputIconColors);
export const inputClearSlotClassName = rainCn("inline-flex flex-none items-center justify-center", inputClearSizeClassName);
export const inputClearClassName = "rain-input__clear inline-flex size-full items-center justify-center rounded-rain-4 border-none bg-transparent p-rain-0 cursor-pointer text-rain-category-icon-neutral-3 hover:text-rain-category-icon-neutral-2 active:text-rain-category-icon-neutral-1";
export const inputClearIconClassName = rainCn(iconSizeClassNames[14], "inline-flex items-center justify-center [&>.rain-icon]:size-full");
export const inputCountRecipe = cva("flex-none whitespace-nowrap", { variants: {
  overflow: { true: "text-rain-category-text-red-1", false: "text-rain-category-text-neutral-5" },
  disabled: { true: "text-rain-category-text-neutral-6", false: null },
} });
