import type { Density } from "./density";

export const tabsSizeTokens = { 28: "28px", 32: "32px", 38: "38px" } as const;
export type TabsSize = keyof typeof tabsSizeTokens;
export const tabsSizeClassNames = { 28: "h-rain-tabs-28", 32: "h-rain-tabs-32", 38: "h-rain-tabs-38" } as const;
export const tabsTwoLineSizeTokens = { 28: "46px", 32: "52px", 38: "60px" } as const;
export const tabsTwoLineSizeClassNames = { 28: "h-rain-tabs-two-line-28", 32: "h-rain-tabs-two-line-32", 38: "h-rain-tabs-two-line-38" } as const;
export const tabsSizeRecipes = {
  28: { height: 28, fontSize: 13, lineHeight: 18, icon: 14, countFontSize: 12, countLineHeight: 14, indicator: 2, maxContentIndicator: 24, containedPaintHeight: 22 },
  32: { height: 32, fontSize: 14, lineHeight: 20, icon: 14, countFontSize: 12, countLineHeight: 14, indicator: 2, maxContentIndicator: 28, containedPaintHeight: 26 },
  38: { height: 38, fontSize: 15, lineHeight: 22, icon: 16, countFontSize: 12, countLineHeight: 14, indicator: 3, maxContentIndicator: 32, containedPaintHeight: 32 },
} as const;
export const tabsAppearanceRecipes = {
  line: { gap: 8, contentGap: 2, radius: 4, paintRadius: 4, inset: 0, border: 0 },
  contained: { gap: 2, contentGap: 2, radius: 6, paintRadius: 4, inset: 3, border: 0 },
  soft: { gap: 8, contentGap: 2, radius: 6, paintRadius: 6, inset: 0, border: 0 },
} as const;
export const tabsGeometry = { paddingInline: 8, verticalPaddingInline: 16, verticalNavWidth: 192, panelGap: 16, labelWeight: 400, selectedLabelWeight: 600, countWeight: 400 } as const;

export function resolveTabsSize(size: TabsSize | undefined, density: Density): TabsSize {
  if (size !== undefined && !Object.hasOwn(tabsSizeTokens, size)) throw new Error(`Unsupported Tabs size: ${size}`);
  return size ?? (density === "compact" ? 32 : 38);
}
