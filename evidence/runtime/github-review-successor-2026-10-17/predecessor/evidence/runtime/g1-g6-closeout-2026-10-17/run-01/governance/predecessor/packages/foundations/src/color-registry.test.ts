import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  colorAlphaValues,
  colorCategoryProfiles,
  colorRegistry,
  colorTokenOutputs,
  colorToCss,
  colorDiscovery,
  searchColorTokens,
  assessColorUse,
  localColorRecipe,
  localColorRecipeOutput,
  resolveColor,
  resolveColorSurface,
  validateColorUse,
} from "./color-registry";

describe("color discovery", () => {
  it("finds stable colors by Chinese hue, inherited business name, Family and exact ID", () => {
    for (const query of ["蓝紫", "视频", "实验", "tagpurple", "  TEXT/TAGPURPLE/1  "]) {
      expect(searchColorTokens(query, "Text").map((entry) => entry.id)).toContain("Text/TagPurple/1");
    }
    expect(searchColorTokens("蓝紫", "Fill").every((entry) => entry.category === "Fill")).toBe(true);
    expect(searchColorTokens("不存在的色组")).toEqual([]);
    expect(searchColorTokens("")).toHaveLength(colorRegistry.length);
  });

  it("retains every original fact and distinguishes palette candidates from component presets", () => {
    const baseline = JSON.parse(readFileSync("evidence/runtime/tag-color-discovery/color-baseline.json", "utf8"));
    expect(colorRegistry).toEqual(baseline.records);
    expect(colorCategoryProfiles).toEqual(baseline.profiles);
    expect(colorTokenOutputs).toEqual(baseline.outputs);
    const entries = colorDiscovery.entries;
    expect(entries.filter((entry) => entry.scope === "tag-palette")).toHaveLength(100);
    expect(entries.filter((entry) => entry.scope === "tag-state")).toHaveLength(40);
    expect(entries.filter((entry) => entry.scope === "tag-special")).toHaveLength(24);
    expect(entries.find((entry) => entry.id === "Fill/TagPurple/Alpha/2")?.purpose).toContain("关闭");
    expect(entries.find((entry) => entry.id === "Text/TagPurple/1")?.utilities)
      .toEqual(colorTokenOutputs.find((output) => output.id === "Text/TagPurple/1")?.utilities);
    expect(colorDiscovery.pairings.find((pairing) => pairing.family === "TagPurple" && pairing.use.tokenId === "Text/Neutral/1")?.themes.light.status).toBe("passed");
  });

  it("keeps measurements, declared conditions and actual use distinct", () => {
    const use = { tokenId: "Text/Neutral/1", role: "text", property: "color", context: "page", content: "text", theme: "light", parentSurfaceId: "Fill/TagPurple/Alpha/1", parentBackgroundId: "Background/Neutral/1", interaction: "non-interactive", critical: true } as const;
    expect(assessColorUse(use)).toMatchObject({ status: "passed", actualUse: "not-verified" });
    expect(assessColorUse({ ...use, theme: "dark" }).status).toBe("passed");
    expect(assessColorUse({ ...use, theme: undefined }).status).toBe("needs-context");
    expect(assessColorUse({ ...use, parentBackgroundId: undefined }).status).toBe("needs-context");
    expect(assessColorUse({ ...use, tokenId: "Fill/TagPurple/Alpha/1" }).status).toBe("rejected");
    expect(assessColorUse({ ...use, tokenId: "Text/TagPurple/1", theme: "dark" }).status).toBe("rejected");
    const invalidRecipe = assessColorUse({ ...use, tokenId: "OnColor/1", onColor: true, parentSurfaceId: "Fill/TagPurple/Solid/1", theme: "dark" });
    expect(invalidRecipe.contrast).toBeGreaterThan(4.5);
    expect(invalidRecipe.status).toBe("rejected");
    expect(invalidRecipe.reason).toMatch(/Recipe/);
  });

  it("does not promote Tag state or special presets through an otherwise valid page pairing", () => {
    for (const tokenId of ["Fill/TagPurple/Alpha/2", "Fill/TagPurple/Alpha/3", "Fill/TagSolidAction/Alpha/1", "Fill/TagEnded/2"]) {
      const fillUse = { tokenId, role: "fill", property: "background-color", context: "page", content: "surface", theme: "light", parentSurfaceId: "Background/Neutral/1" } as const;
      expect(assessColorUse(fillUse)).toMatchObject({ status: "needs-context", actualUse: "not-verified" });
      expect(assessColorUse({ ...fillUse, tokenId: tokenId === "Fill/TagEnded/2" ? "Text/TagEnded/2" : "Text/Neutral/1", role: "text", property: "color", content: "text", parentSurfaceId: tokenId, parentBackgroundId: "Background/Neutral/1" }).status).toBe("needs-context");
    }
  });
});

describe("Light Category facts and generated consumption", () => {
  it("preserves all 105 stable identities independently from their display order", () => {
    const originalIds = new Set(JSON.parse(readFileSync("evidence/runtime/color-dark-theme/confirmed-input.json", "utf8")).records.map((record: {id: string}) => record.id));
    expect(colorRegistry.filter((token) => originalIds.has(token.id))).toHaveLength(105);
    expect(new Set(colorRegistry.map((token) => token.id)).size).toBe(colorRegistry.length);
    for (const profile of colorCategoryProfiles) {
      const tokens = colorRegistry.filter((token) => token.profileId === profile.id);
      expect(tokens.map((token) => token.order)).toEqual(tokens.map((_, index) => index + 1));
      for (const token of tokens) expect(token.id).toBe(`${profile.id}/${token.key}`);
      expect(profile.defaultIds.every((id) => tokens.some((token) => token.id === id))).toBe(true);
    }
    expect(colorTokenOutputs.find((output) => output.id === "Text/Neutral/3")?.variable)
      .toBe("--rain-category-text-neutral-3");
    expect(colorRegistry.every((token) => token.dark !== null)).toBe(true);
    expect(colorCategoryProfiles.every((profile) => profile.defaultParentSurfaceId === null)).toBe(true);
  });

  it("keeps the brand anchor, full Alpha presets and duplicate-category identities", () => {
    expect(colorToCss(resolveColor("Text/Brand/2"))).toBe("rgb(21 97 248)");
    expect(colorToCss(resolveColor("Fill/Neutral/Alpha/3"))).toBe("rgb(80 117 254 / 16%)");
    expect(resolveColor("Background/Neutral/5")).toEqual(resolveColor("Fill/Neutral/Solid/3"));
    expect(resolveColor("Background/Neutral/5")).not.toBe(resolveColor("Fill/Neutral/Solid/3"));
    expect(colorAlphaValues).toEqual([5, 6, 10, 12, 15, 16, 18, 20, 25, 28, 30, 35, 40, 45, 55, 65, 75, 80, 85, 90]);
  });

  it("rejects unknown IDs and unsupported themes instead of falling back", () => {
    expect(() => resolveColor("Text/Neutral/999")).toThrow(/Unknown/);
    expect(() => resolveColor("Text/Neutral/1", "invalid" as "dark")).toThrow(/theme/i);
    expect(() => colorToCss({ rgb: [Number.NaN, 0, 0], alpha: 1 })).toThrow(/color/i);
    expect(() => colorToCss({ rgb: [255, 0, 0], alpha: 2 })).toThrow(/color/i);
  });

  it("generates role-specific utility metadata and separate display-only swatches", () => {
    const text = colorTokenOutputs.find((output) => output.id === "Text/Neutral/1")!;
    expect(text.utilities).toEqual([{ className: "text-rain-category-text-neutral-1", property: "color", role: "text" }]);
    expect(text.displayOnly).toBe(true);
    expect(text.displayClassName).toBe("bg-rain-swatch-text-neutral-1");
    expect(text.displayScope).toBe('[data-rain-id="token-foundations"]');
    expect(text.themeVariable).toBe("--color-rain-category-text-neutral-1");
    expect(colorTokenOutputs.every((output) => !output.variable.includes("ref-"))).toBe(true);
  });
});

describe("confirmed color family supplement", () => {
  it("preserves distinct category values, separate Text/Icon identities and new sources", () => {
    expect(colorToCss(resolveColor("Text/Second/2"))).toBe("rgb(55 81 167)");
    expect(colorToCss(resolveColor("Fill/Second/Solid/1"))).toBe("rgb(55 82 171)");
    expect(colorToCss(resolveColor("Border/Green/1"))).toBe("rgb(20 191 130)");
    expect(colorToCss(resolveColor("Fill/Green/Solid/2"))).toBe("rgb(20 181 101)");
    expect(resolveColor("Text/Orange/1")).toEqual(resolveColor("Icon/Orange/1"));
    expect(colorRegistry.filter(t => t.source.includes("2026-09-06"))).toHaveLength(48);
    expect(colorToCss(resolveColor("Fill/Red/Alpha/1"))).toBe("rgb(243 72 72 / 18%)");
  });

  it("limits strong new Solid fills to OnColor for both text and icons even if dark contrast passes", () => {
    const use = {tokenId: "Text/Neutral/1", role: "text", property: "color", content: "text", context: "local-recipe", recipeId: "supplement-pair", parentSurfaceId: "Fill/Orange/Solid/1"} as const;
    expect(() => validateColorUse(use)).toThrow(/only OnColor/);
    expect(() => validateColorUse({...use, tokenId: "Icon/Neutral/1", role: "icon", content: "meaningful-icon"})).toThrow(/only OnColor/);
    expect(validateColorUse({...use, tokenId: "OnColor/2", onColor: true, parentSurfaceId: "Fill/Second/Solid/1"}).contrast).toBeGreaterThan(4.5);
    expect(() => validateColorUse({...use, tokenId: "OnColor/1", onColor: true})).toThrow(/contrast/i);
  });

  it("limits new subtle fills to Neutral or same-family foregrounds without applying the rule to old scales", () => {
    const use = {tokenId: "Text/Neutral/1", role: "text", property: "color", content: "text", context: "local-recipe", recipeId: "supplement-pair", parentSurfaceId: "Fill/Red/Solid/3"} as const;
    expect(validateColorUse(use).contrast).toBeGreaterThan(4.5);
    expect(validateColorUse({...use, tokenId: "Text/Red/1"}).contrast).toBeCloseTo(4.8019, 3);
    expect(() => validateColorUse({...use, tokenId: "Text/Second/1"})).toThrow(/Neutral or same-family/);
    expect(() => validateColorUse({...use, tokenId: "OnColor/1", onColor: true, content: "decorative"})).toThrow(/Neutral or same-family/);
    expect(validateColorUse({...use, tokenId: "OnColor/1", onColor: true, parentSurfaceId: "Fill/Brand/Solid/2", brandIntent: "action"}).contrast).toBeGreaterThan(4.5);
  });

  it("composites an explicit Alpha surface over its known opaque base without rounding the threshold", () => {
    const use = {tokenId: "Text/Red/1", role: "text", property: "color", content: "text", context: "local-recipe", recipeId: "supplement-pair", parentSurfaceId: "Fill/Red/Alpha/2", parentBackgroundId: "Background/Neutral/1"} as const;
    expect(validateColorUse(use).contrast).toBeCloseTo(4.8095, 3);
    expect(() => validateColorUse({...use, parentSurfaceId: "Fill/Red/Alpha/1"})).toThrow(/contrast/i);
    expect(() => validateColorUse({...use, parentBackgroundId: undefined})).toThrow(/opaque parent/);
    expect(() => validateColorUse({...use, parentBackgroundId: "Fill/Red/Alpha/1"})).toThrow(/opaque/);
    expect(() => validateColorUse({...use, parentBackgroundId: "Text/Neutral/1"})).toThrow(/surface/);
    expect(() => validateColorUse({...use, parentBackgroundId: "Background/Brand/unknown"})).toThrow(/Unknown/);
    expect(() => validateColorUse({...use, tokenId: "OnColor/1", onColor: true, content: "decorative"})).toThrow(/Neutral or same-family/);
    expect(() => validateColorUse({...use, theme: "dark"})).toThrow(/contrast/i);
  });
});

const readableText = {
  tokenId: "Text/Neutral/3", role: "text", property: "color", context: "page",
  content: "text", parentSurfaceId: "Background/Neutral/1",
} as const;

describe("color use, surface pairing and Alpha", () => {
  it("validates an actual text/surface pairing and rejects weak necessary content", () => {
    expect(validateColorUse(readableText).contrast).toBeCloseTo(6.56, 2);
    expect(() => validateColorUse({ ...readableText, tokenId: "Text/Neutral/5" })).toThrow(/contrast/i);
    expect(() => validateColorUse({ ...readableText, parentSurfaceId: undefined })).toThrow(/parent/i);
    expect(() => validateColorUse({ ...readableText, parentSurfaceId: "Fill/Neutral/Alpha/3" })).toThrow(/opaque parent/i);
  });

  it("checks actual Part role and property rather than the Rain namespace", () => {
    expect(() => validateColorUse({ ...readableText, property: "background-color" })).toThrow(/property/i);
    expect(() => validateColorUse({ ...readableText, role: "icon", content: "meaningful-icon" })).toThrow(/role/i);
    expect(() => validateColorUse({ ...readableText, content: "surface" })).toThrow(/content/i);
    expect(() => validateColorUse({ ...readableText, tokenId: "Text/Brand/1" })).toThrow(/Brand/);
    expect(validateColorUse({ ...readableText, tokenId: "Text/Brand/1", brandIntent: "action" }).contrast).toBeGreaterThan(4.5);
    expect(() => validateColorUse({ ...readableText, tokenId: "Text/Neutral/4" })).toThrow(/Weak Neutral/);
    expect(validateColorUse({ ...readableText, tokenId: "Text/Neutral/4", interaction: "non-interactive", critical: false }).contrast).toBeGreaterThan(4.5);
  });

  it("never infers OnColor from Brand, Dark naming, or a theme", () => {
    const use = { ...readableText, tokenId: "OnColor/1", context: "local-recipe", recipeId: "color-test", onColor: true, parentSurfaceId: "Fill/Brand/Solid/2", brandIntent: "action" } as const;
    expect(validateColorUse(use).contrast).toBeGreaterThan(4.5);
    expect(() => validateColorUse({ ...use, context: "page" })).toThrow(/Recipe/);
    expect(() => validateColorUse({ ...use, onColor: false })).toThrow(/OnColor/);
    expect(() => validateColorUse({ ...use, recipeId: undefined })).toThrow(/OnColor/);
    expect(() => validateColorUse({ ...use, brandIntent: undefined })).toThrow(/Brand/);
    expect(() => validateColorUse({ ...use, parentSurfaceId: "Fill/Brand/Solid/3" })).toThrow(/contrast/i);
    expect(validateColorUse({ ...use, theme: "dark" }).contrast).toBeGreaterThan(4.5);
  });

  it("does not let the strongest Neutral Border silently pass essential identification", () => {
    const border = { tokenId: "Border/Neutral/1", role: "border", property: "background-color", context: "page", content: "essential-boundary", parentSurfaceId: "Background/Neutral/1" } as const;
    expect(() => validateColorUse(border)).toThrow(/contrast/i);
    expect(validateColorUse({ ...border, content: "decorative" }).contrast).toBeCloseTo(1.90, 2);
  });

  it("replaces full-preset Alpha explicitly rather than multiplying 16% by 20%", () => {
    const result = validateColorUse(localColorRecipe);
    expect(colorToCss(result.value)).toBe("rgb(80 117 254 / 20%)");
    expect(colorToCss(resolveColor("Fill/Neutral/Alpha/3"))).toBe("rgb(80 117 254 / 16%)");
    expect(localColorRecipeOutput.value).toBe("rgb(80 117 254 / 20%)");
    expect(localColorRecipeOutput.variable).toBe("--rain-local-token-color-demo-highlight");
    expect(localColorRecipeOutput.className).toBe("bg-rain-local-token-color-demo-highlight");
    expect(() => validateColorUse({ ...localColorRecipe, alphaOperation: "apply" })).toThrow(/already contains Alpha/);
  });

  it("requires registered Recipe context and the Alpha whitelist for every new combination", () => {
    expect(() => validateColorUse({ ...localColorRecipe, context: "page" })).toThrow(/Recipe/);
    expect(() => validateColorUse({ ...localColorRecipe, recipeId: undefined })).toThrow(/Recipe/);
    expect(() => validateColorUse({ ...localColorRecipe, alpha: 17 })).toThrow(/whitelist/);
    expect(() => validateColorUse({ ...localColorRecipe, alpha: 100 })).toThrow(/whitelist/);
    expect(() => validateColorUse({ ...localColorRecipe, alpha: 0 })).toThrow(/whitelist/);
    expect(() => validateColorUse({ ...localColorRecipe, alphaOperation: undefined })).toThrow(/operation/i);
    expect(colorToCss(validateColorUse({ ...localColorRecipe, tokenId: "Fill/Neutral/Solid/5", alphaOperation: "apply" }).value)).toBe("rgb(242 244 255 / 20%)");
  });

  it("keeps overall opacity independent, declared and included in readability", () => {
    expect(() => validateColorUse({ ...readableText, componentOpacity: 0.82 })).toThrow(/Recipe/);
    expect(() => validateColorUse({ ...readableText, tokenId: "OnColor/1", onColor: true, parentSurfaceId: "Background/Dark/1", context: "component-recipe", recipeId: "dark-panel", componentOpacity: 0.5 })).toThrow(/scope/i);
    expect(validateColorUse({ ...readableText, context: "component-recipe", recipeId: "loading-copy", tokenId: "Text/Neutral/1", componentOpacity: 0.82, opacityScope: "leaf" }).contrast).toBeGreaterThan(4.5);
    expect(() => validateColorUse({ ...readableText, context: "component-recipe", recipeId: "faded-copy", componentOpacity: 0.2, opacityScope: "leaf" })).toThrow(/contrast/i);
    expect(() => validateColorUse({ ...localColorRecipe, componentOpacity: Number.NaN })).toThrow(/opacity/i);
  });

  it("keeps explicit conditional scales behind a Recipe and consumer evidence", () => {
    const conditional = { tokenId: "Fill/Neutral/Solid/1", role: "fill", property: "background-color", context: "page", content: "surface" } as const;
    expect(() => validateColorUse(conditional)).toThrow(/conditional/i);
    expect(() => validateColorUse({ ...conditional, context: "component-recipe", recipeId: "strong-fill" })).toThrow(/evidence/i);
    expect(validateColorUse({ ...conditional, context: "component-recipe", recipeId: "strong-fill", evidenceRef: "evidence/strong-fill-review" }).value).toEqual(resolveColor(conditional.tokenId));
  });
});


describe("confirmed Dark category colors", () => {
  it("matches every confirmed Excel value and preserves all existing Light facts", () => {
    const confirmed = JSON.parse(readFileSync("evidence/runtime/color-dark-theme/confirmed-input.json", "utf8"));
    const baseline = JSON.parse(readFileSync("evidence/runtime/color-dark-theme/baseline.json", "utf8"));
    expect(confirmed.records).toHaveLength(105);
    const originalIds = new Set(confirmed.records.map((row: {id: string}) => row.id));
    const original = colorRegistry.filter(token => originalIds.has(token.id));
    expect(original.map(({dark, darkSource, ...rest}) => ({...rest, dark: null}))).toEqual(baseline.lightRecords);
    expect(originalIds).toEqual(new Set(original.map(token => token.id)));
    for (const row of confirmed.records) {
      const value = resolveColor(row.id, "dark");
      const hex = `#${value.rgb.map(c => c.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
      expect({hex, alpha: value.alpha}, row.id).toEqual(row.dark);
      const output = colorTokenOutputs.find(token => token.id === row.id)!;
      expect(output.darkValue).toBe(colorToCss(value));
      expect(colorRegistry.find(token => token.id === row.id)!.darkSource).toBe("evidence/runtime/color-dark-theme/confirmed-input.json");
    }
    expect(colorToCss(resolveColor("Fill/Neutral/Solid/2", "dark"))).toBe("rgb(42 48 74)");
    expect(colorToCss(resolveColor("OnColor/3", "dark"))).toBe("rgb(255 255 255 / 80%)");
    expect(colorToCss(resolveColor("Border/Neutral/4", "dark"))).toBe("rgb(194 212 255 / 5%)");
  });

  it("composites Dark Alpha on the Dark parent, with readability checked in that theme", () => {
    const surface = resolveColorSurface("Fill/Red/Alpha/2", "dark", "Background/Neutral/1");
    surface.rgb.forEach((channel, index) => expect(channel).toBeCloseTo([51.3, 39.6, 60.3][index]!, 8));
    const darkUse = {...readableText, theme: "dark" as const};
    expect(validateColorUse(darkUse).contrast).toBeGreaterThan(8);
    expect(() => validateColorUse({...darkUse, tokenId: "Text/Second/4"})).toThrow(/contrast/i);
    expect(() => resolveColorSurface("Fill/Red/Alpha/2", "dark")).toThrow(/opaque parent/);
    expect(() => resolveColorSurface("Fill/Red/Alpha/2", "dark", "Fill/Green/Alpha/2")).toThrow(/opaque/);
  });
});
