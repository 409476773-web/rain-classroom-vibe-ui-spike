import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as foundations from "./index";
import { getTokenFoundationOutputs } from "../../../scripts/token-foundation-outputs.mjs";

const source = JSON.parse(readFileSync("evidence/runtime/tag-batch-one/source-colors.json", "utf8"));
const families: Record<string, string> = { "self-test": "TagSelfTest" };
const family = (profile: string) => families[profile] ?? `Tag${profile[0]!.toUpperCase()}${profile.slice(1)}`;

describe("Tag confirmed source and complete recipes", () => {
  it("preserves every original profile, theme and paint rather than substituting a nearby public color", () => {
    const roles = { text: "Text", bg: "Fill", border: "Border", solid: "Fill" };
    expect(Object.keys(source.profiles)).toHaveLength(20);
    for (const [profile, themes] of Object.entries(source.profiles) as [string, Record<"light" | "dark", Record<string, foundations.ColorValue>>][]) {
      for (const theme of ["light", "dark"] as const) for (const [part, category] of Object.entries(roles)) {
        const mode = part === "bg" ? "/Alpha" : part === "solid" ? "/Solid" : "";
        expect(foundations.resolveColor(`${category}/${family(profile)}${mode}/1`, theme)).toEqual(themes[theme][part]);
      }
      expect(foundations.resolveColor(`Icon/${family(profile)}/1`, "dark")).toEqual(themes.dark.text);
    }
  });

  it("retains the distinct business-status paints, including the transparent Dark ended Solid", () => {
    expect(foundations.colorToCss(foundations.resolveColor("Fill/TagEnded/2", "dark"))).toBe("rgb(80 117 254 / 24%)");
    expect(foundations.resolveColor("Fill/TagUnsubmitted/Solid/1", "light")).toEqual(source.confirmedAddition.unsubmittedSolid.light);
    expect(foundations.resolveColor("Fill/TagUnsubmitted/Solid/1", "dark")).toEqual(source.confirmedAddition.unsubmittedSolid.dark);
    expect(foundations.resolveColor("OnColor/TagOngoing/1", "light").alpha).toBe(0.9);
    expect(foundations.colorToCss(foundations.resolveColor("Fill/TagBatch/Solid/1"))).toBe("rgb(114 140 203)");
    expect(foundations.resolveColor("Border/TagReminder/1", "dark")).toEqual(foundations.resolveColor("OnColor/1", "dark"));
  });

  it("generates the complete three sizes without a fixed action target or relying on application scanning", () => {
    const outputs = getTokenFoundationOutputs();
    const variables = outputs.variables as Record<string, string>;
    for (const size of [20, 24, 28]) {
      expect(outputs.utilities.find((entry: {className: string}) => entry.className === `h-rain-tag-${size}`)?.declarations)
        .toEqual({ height: `var(--rain-tag-height-${size})` });
      expect(variables[`--rain-tag-height-${size}`]).toBe(`${size}px`);
      expect(outputs.tagSourceDirective).toContain(`h-rain-tag-${size}`);
    }
    expect(variables).not.toHaveProperty("--rain-tag-action-size");
    expect(outputs.tagSourceDirective).not.toContain("size-rain-tag-action");
  });

  it("keeps exact source Alpha separate from consumer overrides and preserves paint roles", () => {
    const use = { tokenId: "Text/TagDifficulty5/1", role: "text", property: "color", content: "text", context: "component-recipe", recipeId: "tag-test", parentSurfaceId: "Fill/TagDifficulty5/Alpha/1", parentBackgroundId: "Background/Neutral/1" } as const;
    expect(() => foundations.validateColorUse({ ...use, alpha: 24, alphaOperation: "replace" })).toThrow(/whitelist/);
    expect(() => foundations.validateColorUse({ ...use, role: "fill", property: "background-color", content: "surface" })).toThrow(/Category/);
    expect(() => foundations.validateColorUse({ ...use, parentSurfaceId: "Fill/TagDifficulty5/Solid/1" })).toThrow(/OnColor/);
    expect(foundations.colorAlphaValues).not.toContain(24);
    expect(foundations.colorAlphaValues).not.toContain(66);
  });

  it("requires the exact foreground paired with each ended surface", () => {
    const use = { tokenId: "Text/TagPurple/1", role: "text", property: "color", content: "text", context: "component-recipe", recipeId: "tag-ended", parentSurfaceId: "Fill/TagEnded/1", parentBackgroundId: "Background/Neutral/1" } as const;
    expect(() => foundations.validateColorUse(use)).toThrow(/paired foreground/);
    for (const key of [1, 2]) expect(() => foundations.validateColorUse({ ...use, tokenId: `Text/TagEnded/${key}`, parentSurfaceId: `Fill/TagEnded/${key}` })).not.toThrow();
  });

  it("preserves external reminder provenance and derives Neutral Solid icon and feedback from existing text", () => {
    for (const theme of ["light", "dark"] as const) {
      for (const [id, origin] of Object.entries(source.externalColorSources) as [string, { variable: string; consumer: string; light: foundations.ColorValue; dark: foundations.ColorValue }][]) {
        expect(origin.variable).toMatch(/^--rain-/);
        expect(origin.consumer).toContain("Tag/tag.scss");
        expect(foundations.resolveColor(id, theme)).toEqual(origin[theme]);
      }
      expect(foundations.resolveColor("Icon/TagNeutralSolid/1", theme)).toEqual(foundations.resolveColor("Text/Neutral/1", theme));
      expect(foundations.resolveColor("Fill/TagNeutralSolidAction/Alpha/1", theme).rgb).toEqual(foundations.resolveColor("Text/Neutral/1", theme).rgb);
    }
  });
});
