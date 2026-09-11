import { describe, expect, it } from "vitest";

import {
  fontSizeTokens,
  getTypographyCssVariables,
  getTypographyPresetDeclarations,
  getTypographyThemeVariables,
  lineHeightTokens,
  resolveTypographyPreset,
  typographyPresets,
  typographyUtilityClassNames,
  validateDataFontUsage,
  validateTypographyComposition,
} from "./typography-contract";

describe("public typography contract", () => {
  it("permits TagSelect Solid labels only at the inherited 20/24/28 geometry", () => {
    const context = { recipeId: "tag-solid", componentId: "ui-tag-select", part: "label", appearance: "solid" };
    const value = { ...typographyPresets["ui-compact"], fontWeight: 700 };
    for (const [fontSize, lineHeight] of [[12, 14], [13, 18]]) expect(validateTypographyComposition({ ...value, fontSize, lineHeight }, context).valid).toBe(true);
    expect(validateTypographyComposition({ ...value, fontSize: 13, lineHeight: 15 }, context).valid).toBe(false);
    expect(validateTypographyComposition(value, { ...context, appearance: "filled" }).valid).toBe(false);
  });
  it("permits UI700 only for an explicitly identified Solid Tag label with its complete geometry", () => {
    const value = { ...typographyPresets["ui-compact"], fontWeight: 700 };
    const context = { recipeId: "tag-solid", componentId: "ui-tag", part: "label", appearance: "solid" } as const;
    expect(validateTypographyComposition(value, context).valid).toBe(true);
    expect(validateTypographyComposition(value).valid).toBe(false);
    for (const change of [{ part: "root" }, { componentId: "ui-button" }, { appearance: "filled" }]) {
      expect(validateTypographyComposition(value, { ...context, ...change }).valid).toBe(false);
    }
    expect(validateTypographyComposition({ ...value, fontSize: 14, lineHeight: 22 }, context).valid).toBe(false);
    expect(validateTypographyComposition({ ...value, fontRole: "reading" }, context).valid).toBe(false);
  });

  it("derives legacy role dimensions from the complete default presets", () => {
    const css = getTypographyCssVariables();
    const presets = getTypographyPresetDeclarations();
    for (const role of ["ui", "reading", "data"] as const) {
      expect(css[`--rain-type-${role}-size`]).toBe(presets[`${role}-default`]["font-size"]);
      expect(css[`--rain-type-${role}-line`]).toBe(presets[`${role}-default`]["line-height"]);
    }
  });

  it("preserves the confirmed numeric identities and typed Equal value", () => {
    expect(Object.keys(fontSizeTokens).map(Number)).toEqual([
      9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 32, 36, 40,
    ]);
    expect(Object.keys(lineHeightTokens).filter((key) => key !== "equal").map(Number)).toEqual([
      12, 14, 15, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 42, 48,
    ]);
    expect(lineHeightTokens.equal).toEqual({ type: "number", value: 1 });
    expect(lineHeightTokens[14]).toEqual({ type: "dimension", value: 14, unit: "px" });
  });

  it("allows only the named second-batch Solid geometry, keeping the small badge at UI600", () => {
    for (const [componentId, fontSize, lineHeight] of [["ui-tag", 13, 15], ["ui-system-status-tag", 14, 20], ["ui-status-tag", 14, 20], ["ui-scored-task-type-mark", 13, 16]] as const) {
      const value = { ...typographyPresets["ui-compact"], fontWeight: 700, fontSize, lineHeight };
      const context = { recipeId: "tag-solid", componentId, part: "label", appearance: "solid" };
      expect(validateTypographyComposition(value, context).valid).toBe(true);
      expect(validateTypographyComposition(value, { ...context, componentId: "ui-button" }).valid).toBe(false);
      expect(validateTypographyComposition(value, { ...context, appearance: "filled" }).valid).toBe(false);
    }
    expect(validateTypographyComposition({ ...typographyPresets["ui-compact"], fontSize: 10, lineHeight: 12, fontWeight: 600 }).valid).toBe(true);
  });

  it("resolves every complete preset while retaining the three Reading defaults", () => {
    expect(Object.keys(typographyPresets)).toHaveLength(10);
    for (const preset of Object.keys(typographyPresets)) {
      const result = resolveTypographyPreset(preset);
      expect(result.validation.valid, preset).toBe(true);
      expect(result.style?.fontFamily).toMatch(/^var\(--rain-font-/);
      expect(result.style?.letterSpacing).toBe("var(--rain-letter-spacing-default)");
    }
    expect(resolveTypographyPreset("reading-small").composition).toMatchObject({ fontSize: 14, lineHeight: 24 });
    expect(resolveTypographyPreset("reading-default").composition).toMatchObject({ fontSize: 15, lineHeight: 26 });
    expect(resolveTypographyPreset("reading-large").composition).toMatchObject({ fontSize: 16, lineHeight: 26 });
  });

  it("checks inclusive bounds after local changes instead of clamping them", () => {
    for (const [fontSize, lineHeight] of [[16, 16], [16, 32], [12, 24], [36, 42], [40, 48]]) {
      expect(resolveTypographyPreset("ui-default", { fontSize, lineHeight }).validation.valid).toBe(true);
    }
    for (const [fontSize, lineHeight] of [[16, 14], [16, 36], [12, 26], [14, 30]]) {
      const result = resolveTypographyPreset("ui-default", { fontSize, lineHeight });
      expect(result.validation.valid).toBe(false);
      expect(result.style).toBeUndefined();
      expect(result.composition).toMatchObject({ fontSize, lineHeight });
    }
    expect(resolveTypographyPreset("ui-compact", { fontSize: 20 }).validation.valid).toBe(false);
    expect(resolveTypographyPreset("reading-default", { fontSize: 12 }).validation.valid).toBe(false);
    const equal = resolveTypographyPreset("ui-default", { fontSize: 17, lineHeight: "equal" });
    expect(equal.validation.resolvedLineHeight).toBe(17);
    expect(equal.style?.lineHeight).toBe("var(--rain-line-height-equal)");
  });

  it("rejects unregistered, inherited and malformed values without inventing defaults", () => {
    expect(resolveTypographyPreset("ui-default", { fontSize: 16, lineHeight: 30 }).validation.issues).toContain("line-height-unregistered");
    expect(resolveTypographyPreset("missing").validation.issues).toContain("preset-unregistered");
    for (const value of [null, [], {}, { fontSize: NaN }, { fontSize: Infinity }, { fontSize: "inherit" }]) {
      expect(validateTypographyComposition(value).valid).toBe(false);
    }
    expect(validateTypographyComposition({
      ...typographyPresets["ui-default"], lineHeight: "inherit",
    }).issues).toContain("line-height-unregistered");
    expect(validateTypographyComposition({ ...typographyPresets["ui-default"], fontRole: ["ui"] }).valid).toBe(false);
  });

  it("keeps component exceptions outside the public role and letter-spacing contract", () => {
    expect(resolveTypographyPreset("ui-default", { fontWeight: 700 }).validation.issues).toContain("font-weight-invalid");
    expect(resolveTypographyPreset("ui-default", { fontWeight: 500 }).validation.valid).toBe(false);
    expect(resolveTypographyPreset("data-default", { fontWeight: 600 }).validation.valid).toBe(false);
    expect(validateTypographyComposition({ ...typographyPresets["ui-default"], letterSpacing: "0.02em" }).valid).toBe(false);
    const before = resolveTypographyPreset("heading-section");
    const changed = resolveTypographyPreset("heading-section", { fontSize: 20, lineHeight: 28 });
    expect(changed.validation.valid).toBe(true);
    expect(changed.composition).toMatchObject({ fontRole: "ui", fontWeight: 600, letterSpacing: "default" });
    expect(resolveTypographyPreset("heading-section")).toEqual(before);
  });

  it("limits Data to explicit key-value parts and the approved glyph set", () => {
    expect(validateDataFontUsage({ keyData: true, part: "value", text: "98.6% / 1,234:2K" })).toBe(true);
    for (const usage of [
      { keyData: false, part: "value", text: "98" },
      { keyData: true, part: "unit", text: "K" },
      { keyData: true, part: "label", text: "1" },
      { keyData: true, part: "value", text: "98分" },
      { keyData: true, part: "value", text: "10kg" },
      { keyData: true, part: "value", text: "--" },
      { keyData: true, part: "value", text: "" },
    ]) expect(validateDataFontUsage(usage)).toBe(false);
    expect(validateDataFontUsage(null)).toBe(false);
    expect(validateDataFontUsage({ keyData: true, part: "value", text: 98 })).toBe(false);
  });

  it("derives CSS dimensions, multipliers and bridge aliases from the same facts", () => {
    const css = getTypographyCssVariables();
    expect(css["--rain-font-size-17"]).toBe("17px");
    expect(css["--rain-line-height-14"]).toBe("14px");
    expect(css["--rain-line-height-equal"]).toBe("1");
    expect(css["--rain-letter-spacing-default"]).toBe("0em");
    const theme = getTypographyThemeVariables();
    expect(theme["--text-rain-size-17"]).toBe("var(--rain-font-size-17)");
    expect(theme["--leading-rain-equal"]).toBe("var(--rain-line-height-equal)");
    expect(theme["--tracking-rain-default"]).toBe("var(--rain-letter-spacing-default)");
    expect(Object.values(theme).every((value) => /^var\(--rain-/.test(value))).toBe(true);
    expect(getTypographyPresetDeclarations()["heading-section"]).toMatchObject({
      "font-size": "var(--rain-font-size-16)",
      "line-height": "var(--rain-line-height-24)",
      "font-weight": "var(--rain-font-weight-semibold)",
    });
    expect(Object.keys(getTypographyPresetDeclarations())).toEqual(Object.keys(typographyPresets));
    expect(typographyUtilityClassNames.preset["reading-default"]).toBe("rain-type-reading-default");
    expect(typographyUtilityClassNames.fontSize[17]).toBe("text-rain-size-17");
  });
});
