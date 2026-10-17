// Input-specific geometry. Shared spacing, type, radius and icon sizes remain in their existing contracts.
export const inputSizeTokens = { 24: "24px", 28: "28px", 32: "32px", 36: "36px" } as const;
export type InputSize = keyof typeof inputSizeTokens;
export const inputSizeTokenEntries = Object.entries(inputSizeTokens) as [string, string][];
export const inputSizeClassNames = { 24: "h-rain-input-24", 28: "h-rain-input-28", 32: "h-rain-input-32", 36: "h-rain-input-36" } as const;
export const inputClearSizeToken = 24;
export const inputClearSizeClassName = "size-rain-input-clear";
