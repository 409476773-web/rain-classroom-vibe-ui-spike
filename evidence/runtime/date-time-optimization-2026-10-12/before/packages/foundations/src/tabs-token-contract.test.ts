import { compile } from "tailwindcss";
import { expect, it } from "vitest";
import * as tabs from "./tabs-token-contract";
import { getTokenFoundationOutputs } from "../../../scripts/token-foundation-outputs.mjs";
import { getGeneratedTokenFiles } from "../../../scripts/generate-token-foundations.mjs";

it("resolves complete shared recipes and respects explicit size in either density", () => {
  expect(tabs.resolveTabsSize(undefined, "compact")).toBe(32);
  expect(tabs.resolveTabsSize(undefined, "default")).toBe(38);
  for (const appearance of ["line", "contained", "soft"] as const) for (const size of [28, 32, 38] as const) {
    for (const density of ["compact", "default"] as const) expect(tabs.resolveTabsSize(size, density)).toBe(size);
    const recipe = tabs.tabsSizeRecipes[size];
    expect(recipe.height).toBe(size);
    expect(recipe.containedPaintHeight).toBe(size - 6);
    expect(recipe.maxContentIndicator).toBe(({ 28: 24, 32: 28, 38: 32 })[size]);
    expect(recipe.countFontSize).toBe(12); expect(recipe.countLineHeight).toBe(14);
    expect(tabs.tabsAppearanceRecipes[appearance].contentGap).toBe(2);
  }
  expect(() => tabs.resolveTabsSize(30 as 28, "default")).toThrow();
});

it("keeps two-line heights in the same three complete sizes and the confirmed visual geometry", () => {
  expect(tabs.tabsTwoLineSizeTokens).toEqual({ 28: '46px', 32: '52px', 38: '60px' });
  expect(tabs.tabsGeometry).toMatchObject({ verticalNavWidth: 192, verticalPaddingInline: 16 });
  expect(tabs.tabsAppearanceRecipes.contained).toMatchObject({ inset: 3, gap: 2 });
  expect(tabs.tabsAppearanceRecipes.soft.border).toBe(0);
});

it("compiles single and two-line heights without creating width or spacing utilities", async () => {
  const output = getTokenFoundationOutputs();
  const bridge = getGeneratedTokenFiles()["packages/foundations/src/tailwind-theme.css"]!;
  const compiler = await compile(`${bridge}\n@tailwind utilities;`);
  const invalidClasses = ["h-rain-tabs-30", "w-rain-tabs-28", "gap-rain-tabs-32", "h-rain-tabs-46", "h-rain-tabs-two-line-46", "w-rain-tabs-two-line-28", "gap-rain-tabs-two-line-32"];
  const css = compiler.build(invalidClasses);
  for (const size of [28, 32, 38]) {
    expect(output.variables[`--rain-tabs-height-${size}` as keyof typeof output.variables]).toBe(`${size}px`);
    expect(css).toContain(`.h-rain-tabs-${size} {`);
    expect(css).toContain(`.h-rain-tabs-two-line-${size} {`);
    expect(output.variables[`--rain-tabs-height-two-line-${size}` as keyof typeof output.variables]).toBe(`${size + tabs.tabsSizeRecipes[size as 28 | 32 | 38].lineHeight}px`);
  }
  for (const invalid of invalidClasses) expect(css).not.toContain(`.${invalid} {`);
  expect(compiler.sources).toEqual([]);
});
