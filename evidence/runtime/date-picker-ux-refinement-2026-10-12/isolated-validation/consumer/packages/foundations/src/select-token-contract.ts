import { inputSizeTokens, type InputSize } from "./input-token-contract.ts";

export type SelectSize = InputSize;
export const selectSizeTokens = Object.fromEntries(
  Object.keys(inputSizeTokens).map((size) => [size, `var(--rain-input-height-${size})`]),
) as Record<SelectSize, string>;
export const selectSizeClassNames = { 24: "h-rain-select-24", 28: "h-rain-select-28", 32: "h-rain-select-32", 36: "h-rain-select-36" } as const;
// Select Parts retain their own purpose; the value chips reuse established Tag heights.
export const selectValueHeightTokens = { 24: "var(--rain-tag-height-24)", 28: "var(--rain-tag-height-28)" } as const;
export const selectValueHeightClassNames = { 24: "h-rain-select-value-24", 28: "h-rain-select-value-28" } as const;
export const selectActionSizeToken = 24;
export const selectTouchTargetSizeToken = 44;
export const selectActionSizeClassName = "size-rain-select-action";
