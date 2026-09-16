import type { ColorValue } from "./color-registry";

/** Dedicated semantic paints. Alpha is opacity; these do not alter the general Fill palette. */
export const overlayColors = {
  separation: { light: { rgb: [34, 48, 81], alpha: .06 }, dark: { rgb: [5, 9, 26], alpha: .15 } },
  focus: { light: { rgb: [34, 48, 81], alpha: .15 }, dark: { rgb: [5, 9, 26], alpha: .70 } },
  modal: { light: { rgb: [34, 48, 81], alpha: .50 }, dark: { rgb: [3, 5, 16], alpha: .90 } },
  immersive: { light: { rgb: [27, 35, 56], alpha: .80 }, dark: { rgb: [5, 9, 26], alpha: .90 } },
} as const satisfies Record<string, Record<"light" | "dark", ColorValue>>;
export type OverlayMask = "none" | keyof typeof overlayColors;
export const overlayTokenSource = "docs/plans/2026-09-15-dialog-refinement-design.md#2";
export const dialogWidths = [416, 516, 616, 716, 816, 916, 1016, 1116] as const;
export type DialogWidth = typeof dialogWidths[number] | "viewport";
export const dialogGeometryTokens = { "--rain-dialog-inset-large": "60px", "--rain-dialog-min-height": "128px" } as const;
