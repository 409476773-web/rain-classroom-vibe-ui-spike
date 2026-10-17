export const compositionSpaceTokens = {
  0: "0px",
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  14: "14px",
  16: "16px",
  18: "18px",
  20: "20px",
  24: "24px",
  28: "28px",
  32: "32px",
  36: "36px",
  40: "40px",
} as const;

export type CompositionSpaceTokenName = keyof typeof compositionSpaceTokens;

export const compositionSpaceTokenEntries = Object.entries(
  compositionSpaceTokens,
) as Array<[`${CompositionSpaceTokenName}`, string]>;
