import { describe, expect, it } from "vitest";
import { validateColorUse } from "./color-registry";

import {
  buttonColorRecipes,
  buttonColorThemeMappings,
  getButtonColorVariables,
  validateButtonColorRecipe,
} from "./button-token-contract";

describe("Button Category color recipes", () => {
  it("uses existing Category references and scoped Alpha without a second palette", () => {
    const light = getButtonColorVariables();
    const dark = getButtonColorVariables("dark");
    expect(light["--rain-button-primary-bg"]).toBe("var(--rain-category-fill-brand-solid-2)");
    expect(light["--rain-button-danger-primary-bg"]).toBe("var(--rain-category-fill-red-solid-2)");
    expect(light["--rain-button-danger-primary-hover-bg"]).toBe("var(--rain-category-fill-red-solid-1)");
    expect(dark["--rain-button-danger-primary-hover-bg"]).toBe("color-mix(in srgb, var(--rain-category-fill-red-solid-2) 85%, transparent)");
    expect(light["--rain-button-loading-primary-bg"]).toBe("color-mix(in srgb, rgb(from var(--rain-category-fill-brand-alpha-1) r g b / 90%) calc(var(--rain-button-loading-opacity) * 100%), transparent)");
    expect(dark["--rain-button-loading-primary-bg"]).toBe("color-mix(in srgb, var(--rain-category-fill-brand-alpha-2) calc(var(--rain-button-loading-opacity) * 100%), transparent)");
    expect(light).not.toHaveProperty("--rain-button-loading-opacity");
    expect(light["--rain-button-focus-outline"]).toBe("var(--rain-category-border-brand-1)");
    expect(light["--rain-button-focus-halo"]).toBe("var(--rain-category-fill-brand-alpha-3)");
    expect(dark["--rain-button-text-focus-outline"]).toBe(light["--rain-button-focus-outline"]);
    expect(dark["--rain-button-text-focus-halo"]).toBe(light["--rain-button-focus-halo"]);
    expect(JSON.stringify(light)).not.toMatch(/#[a-f\d]{6}|rgb\(\s*\d/i);
    expect(buttonColorThemeMappings["--color-rain-button-loading-primary-bg"]).toBe("var(--rain-button-loading-primary-bg)");
    expect(buttonColorThemeMappings).not.toHaveProperty("--color-rain-button-primary");
  });

  it("checks all nine appearances and five states on both supported surfaces and themes", () => {
    expect(buttonColorRecipes).toHaveLength(45);
    for (const recipe of buttonColorRecipes) {
      for (const theme of ["light", "dark"] as const) {
        for (const parent of ["Background/Neutral/1", "Background/Neutral/3"]) {
          const result = validateButtonColorRecipe(recipe, theme, parent);
          if (result.acceptedTextContrastException) {
            expect([recipe.variant, recipe.tone, theme]).toEqual(["primary", "danger", "light"]);
            expect(recipe.state).not.toBe("disabled");
            expect(result.textContrast).toBeLessThan(4.5);
            expect(result.acceptedTextContrastException).toEqual({ actual: result.textContrast, minimum: 4.5, decisionSource: "explicit-user-acceptance-danger-primary-text-contrast" });
          } else expect(result.textContrast, `${recipe.id}/${theme}/${parent}`).toBeGreaterThanOrEqual(recipe.state === "disabled" ? 0 : 4.5);
          expect(result.iconContrast, `${recipe.id}/${theme}/${parent}`).toBeGreaterThanOrEqual(recipe.state === "disabled" ? 0 : 3);
        }
      }
    }
  });

  it("declares a lighter trailing Icon only for the dual-icon non-Loading case", () => {
    const expected: Record<string, string> = {
      "primary/default": "OnColor/2", "secondary/default": "Icon/Brand/2", "tertiary/default": "Icon/Neutral/2",
      "primary/danger": "OnColor/1", "secondary/danger": "Icon/Red/2", "tertiary/danger": "Icon/Red/2",
      "text/default": "Icon/Neutral/3", "text/brand": "Icon/Brand/2", "text/danger": "Icon/Red/2",
    };
    for (const recipe of buttonColorRecipes) {
      const trailing = recipe.parts.find((entry) => entry.part === "trailing-icon");
      if (recipe.state === "loading") { expect(trailing).toBeUndefined(); continue; }
      expect(trailing?.use.tokenId).toBe(expected[`${recipe.variant}/${recipe.tone}`]);
      expect(trailing?.use.role).toBe("icon");
      expect(trailing?.use.content).toBe(recipe.state === "disabled" ? "disabled" : "meaningful-icon");
      expect(trailing?.use.alpha).toBe(recipe.variant === "primary" && recipe.tone === "danger" ? 90 : recipe.variant === "tertiary" && recipe.tone === "default" ? 80 : undefined);
      expect(trailing?.use.componentOpacity).toBe(recipe.variant === "text" && recipe.state === "disabled" ? 0.3 : undefined);
      for (const theme of ["light", "dark"] as const) {
        for (const parent of ["Background/Neutral/1", "Background/Neutral/3"]) {
          const result = validateButtonColorRecipe(recipe, theme, parent);
          expect(result.trailingIconContrast).toBeGreaterThanOrEqual(recipe.state === "disabled" ? 0 : 3);
          expect(result.iconContrast).toBeLessThanOrEqual(result.trailingIconContrast!);
        }
      }
    }
    expect(getButtonColorVariables()["--rain-button-trailing-tertiary-icon"]).toBe("color-mix(in srgb, var(--rain-category-icon-neutral-2) 80%, transparent)");
  });

  it("retains each disabled button's normal color family and original dimming", () => {
    for (const disabled of buttonColorRecipes.filter((recipe) => recipe.state === "disabled")) {
      const normal = buttonColorRecipes.find((recipe) => recipe.variant === disabled.variant && recipe.tone === disabled.tone && recipe.state === "default")!;
      expect(disabled.parts.map(({ part, alias }) => ({ part, alias }))).toEqual(normal.parts.map(({ part, alias }) => ({ part, alias })));
      expect(disabled.opacity).toBe(disabled.variant === "text" ? 1 : disabled.variant === "primary" ? 0.3 : 0.4);
      for (const entry of disabled.parts.filter((part) => part.part === "label" || part.part === "icon")) {
        expect(entry.use.componentOpacity).toBe(disabled.variant === "text" ? 0.3 : undefined);
      }
    }
    expect(Object.keys(getButtonColorVariables()).some((key) => /disabled-(text|icon|bg|border)$/.test(key))).toBe(false);
    expect(Object.keys(buttonColorThemeMappings).some((key) => /disabled-(text|icon|bg|border)$/.test(key))).toBe(false);
  });

  it("dims only Loading backgrounds and borders while retaining the original foreground family", () => {
    expect(getButtonColorVariables()).not.toHaveProperty("--rain-button-loading-text");
    for (const loading of buttonColorRecipes.filter((recipe) => recipe.state === "loading")) {
      const normal = buttonColorRecipes.find((recipe) => recipe.variant === loading.variant && recipe.tone === loading.tone && recipe.state === "default")!;
      const foregrounds = (recipe: typeof loading) => recipe.parts.filter((part) => part.part === "label" || part.part === "icon").map((part) => ({ alias: part.alias, opacity: part.use.componentOpacity }));
      expect(foregrounds(loading)).toEqual(foregrounds(normal));
      expect(loading.opacity).toBe(1);
      for (const entry of loading.parts.filter((part) => part.part === "background" || part.part === "border")) {
        expect(entry.use.componentOpacity).toBe(0.82);
        expect(entry.use.opacityScope).toBe("leaf");
      }
    }
  });

  it("measures the actual Alpha and paint opacity instead of the unmodified source", () => {
    const danger = buttonColorRecipes.find((recipe) => recipe.variant === "primary" && recipe.tone === "danger" && recipe.state === "default")!;
    expect(validateButtonColorRecipe(danger, "light", "Background/Neutral/1").textContrast).toBeCloseTo(3.601, 3);
    const loading = buttonColorRecipes.find((recipe) => recipe.variant === "secondary" && recipe.tone === "default" && recipe.state === "loading")!;
    expect(validateButtonColorRecipe(loading, "light", "Background/Neutral/1").textContrast).toBeCloseTo(5.317, 3);
    const oldLoading = { ...loading, opacity: 0.82 };
    expect(() => validateButtonColorRecipe(oldLoading, "light", "Background/Neutral/1")).toThrow(/contrast/i);
  });

  it("rejects cross-role sources and surfaces outside the tested contract", () => {
    const recipe = buttonColorRecipes[0]!;
    const invalid = { ...recipe, parts: recipe.parts.map((part) => part.part === "label"
      ? { ...part, alias: "--rain-button-primary-bg", use: { ...part.use, tokenId: "Fill/Brand/Solid/2" } }
      : part) };
    expect(() => validateButtonColorRecipe(invalid, "light", "Background/Neutral/1")).toThrow(/role/i);
    expect(() => validateButtonColorRecipe(recipe, "light", "Background/Neutral/5")).toThrow(/surface/i);
  });

  it("reports the explicit dangerous Primary text exception without weakening global or Icon validation", () => {
    const recipe = buttonColorRecipes.find((entry) => entry.variant === "primary" && entry.tone === "danger" && entry.state === "default")!;
    const label = recipe.parts.find((entry) => entry.part === "label")!;
    expect(() => validateColorUse({ ...label.use, theme: "light", parentSurfaceId: "Fill/Red/Solid/2" })).toThrow(/Insufficient contrast/);
    expect(validateButtonColorRecipe(recipe, "light", "Background/Neutral/1").acceptedTextContrastException?.actual).toBeCloseTo(3.601, 3);
    expect(() => validateButtonColorRecipe({ ...recipe, variant: "secondary" }, "light", "Background/Neutral/1")).toThrow(/contrast/i);
    const badIcon = { ...recipe, parts: recipe.parts.map((entry) => entry.part === "icon"
      ? { ...entry, alias: "--rain-button-trailing-on-color-foreground", use: { ...entry.use, tokenId: "OnColor/2" } } : entry) };
    expect(() => validateButtonColorRecipe(badIcon, "light", "Background/Neutral/1")).toThrow(/contrast/i);
    const missingOnColorContext = { ...recipe, parts: recipe.parts.map((entry) => entry.part === "label"
      ? { ...entry, use: { ...entry.use, onColor: false } } : entry) };
    expect(() => validateButtonColorRecipe(missingOnColorContext, "light", "Background/Neutral/1")).toThrow(/OnColor/);
    expect(() => validateButtonColorRecipe({ ...recipe, opacity: 0.82 }, "light", "Background/Neutral/1")).toThrow(/contrast/i);
  });
});
