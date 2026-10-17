import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { getTagColorConsumers, getTagDomainColorConsumers, getTokenFoundationOutputs, measureTagDomainColorRecipe, measureTagColorRecipe } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";
import { measureColorContrast } from "../packages/foundations/src/color-registry";

const filePath = "packages/ui/src/tag/tag.styles.ts", source = readFileSync(filePath, "utf8");
it("measures opaque score text against the 30 percent white overlay on the Solid body", () => {
  const recipe = getTagDomainColorConsumers()[1]!.recipes.find((entry: any) => entry.id === "tag-domain-score-badge-assignment-solid") as any;
  expect(recipe?.overlay).toMatchObject({ tokenId: "Fill/TagSolidAction/Alpha/1", alpha: 30, alphaOperation: "replace", role: "fill" });
  expect(recipe?.foreground).not.toHaveProperty("alpha");
  for (const theme of ["light", "dark"]) {
    const original = getTagDomainColorConsumers()[1]!.recipes.find((entry: any) => entry.id === "tag-domain-score-badge-assignment")!;
    expect(measureTagDomainColorRecipe(recipe, theme, "Background/Neutral/1")[0]!.actual)
      .toBeLessThan(measureTagDomainColorRecipe(original, theme, "Background/Neutral/1")[0]!.actual);
    const rgb = theme === "light" ? [152.8, 164, 245.2] as const : [135.3, 148.6, 243.8] as const;
    expect(measureTagDomainColorRecipe(recipe, theme, "Background/Neutral/1")[0]!.actual)
      .toBeCloseTo(measureColorContrast({ rgb: [255, 255, 255], alpha: 1 }, { rgb, alpha: 1 }), 10);
  }
  const outputs = getTokenFoundationOutputs() as any;
  outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "tagDomainPaints").recipes.find((entry: any) => entry.id === recipe.id).overlay.alpha = 20;
  const path = "packages/ui/src/tag/domain-tags.styles.ts";
  expect(validateRegisteredRecipeColors({ filePath: path, source: readFileSync(path, "utf8"), outputs }).join("\n")).toMatch(/Tag domain metadata/);
});
it("registers second-batch status and badge roles without accepting their contrast findings", () => {
  const filePath = "packages/ui/src/tag/domain-tags.styles.ts", source = readFileSync(filePath, "utf8"), pendingContrastFindings: any[] = [];
  expect(validateRegisteredRecipeColors({ filePath, source, pendingContrastFindings })).toEqual([]);
  expect(pendingContrastFindings.length).toBeGreaterThan(0);
  expect(pendingContrastFindings.every((finding) => !finding.acceptedException && finding.minimum >= 3)).toBe(true);
  const outputs = getTokenFoundationOutputs() as any;
  outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "tagStatusPaints").recipes[0].foreground.content = "decorative";
  expect(validateRegisteredRecipeColors({ filePath, source, outputs }).join("\n")).toMatch(/Tag domain metadata/);
  expect(validateRegisteredRecipeColors({ filePath, source: source.replace("text-rain-category-oncolor-tagongoing-1", "text-rain-category-icon-tagongoing-1") }).join("\n")).toMatch(/routing/);
  const reminder = getTagDomainColorConsumers()[1]!.recipes.find((recipe: any) => recipe.id === "tag-domain-reminder")!;
  for (const theme of ["light", "dark"]) expect(measureTagDomainColorRecipe(reminder, theme, "Background/Neutral/1")[0]).toMatchObject({ part: "reminder-dot", adjacentTokenId: "Border/TagReminder/1", minimum: 3 });
});
it("registers the exact palette and meaningful roles, retaining insufficient compound paints as unaccepted findings", () => {
  const pendingContrastFindings: any[] = [];
  expect(validateRegisteredRecipeColors({ filePath, source, pendingContrastFindings })).toEqual([]);
  expect(pendingContrastFindings.some((entry) => entry.recipeId === "tag-paper-filled" && entry.state === "hover")).toBe(true);
  expect(pendingContrastFindings.some((entry) => entry.content === "essential-boundary" && entry.minimum === 3)).toBe(true);
  expect(pendingContrastFindings.some((entry) => entry.content === "text" && entry.minimum === 4.5)).toBe(true);
  expect(pendingContrastFindings.some((entry) => entry.recipeId === "tag-classroom-outlined" && entry.theme === "dark" && entry.state === "pressed" && entry.content === "essential-boundary")).toBe(true);
  expect(pendingContrastFindings.every((entry) => entry.acceptedException === false && entry.status === "pending-review")).toBe(true);
});

it("rejects extra paint, changed routing and lowered thresholds in Tag consumer metadata", () => {
  expect(validateRegisteredRecipeColors({ filePath, source: `${source}\nconst unreviewed = "text-rain-category-text-red-1";` }).join("\n")).toMatch(/registered/);
  expect(validateRegisteredRecipeColors({ filePath, source: source.replace("text-rain-category-text-tagpaper-1", "text-rain-category-text-tagexam-1") }).join("\n")).toMatch(/routing/);
  const outputs = getTokenFoundationOutputs() as any;
  outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "tagColorPaints").recipes[0].foreground.content = "decorative";
  expect(validateRegisteredRecipeColors({ filePath, source, outputs }).join("\n")).toMatch(/Tag.*metadata/);
});

it("composes the isolated translucent layer before whole-group opacity and rejects foreign paint roles", () => {
  const recipes = getTagColorConsumers().colorRecipeConsumers[0]!.recipes as any[];
  const paper = recipes.find((recipe) => recipe.id === "tag-paper-filled");
  expect(recipes.find((recipe) => recipe.id === "tag-neutral-filled")).toMatchObject({ boundary: null, boundaryScope: "none" });
  expect(paper.selectionIcon).toMatchObject({ alpha: 90, alphaOperation: "apply" });
  const selected = measureTagColorRecipe(paper, "light", "Background/Neutral/1");
  expect(selected.selectionIcon.rgb[0]).toBeCloseTo(29.32);
  expect(selected.icon.rgb[0]).toBe(7);
  expect(selected.foreground.rgb[0]).toBe(7);
  expect(selected.selectionIconContrast).toBeLessThan(selected.iconContrast);
  const invalidAlpha = structuredClone(paper); invalidAlpha.selectionIcon.alpha = 91;
  expect(() => measureTagColorRecipe(invalidAlpha, "light", "Background/Neutral/1")).toThrow(/whitelist/);
  const disabled = measureTagColorRecipe(paper, "light", "Background/Neutral/1", "disabled");
  expect(disabled.foreground.rgb[0]).toBeCloseTo(180.6);
  expect(disabled.background.rgb[0]).toBeCloseTo(247.56);
  const outlined = measureTagColorRecipe(recipes.find((recipe) => recipe.id === "tag-neutral-outlined"), "light", "Background/Neutral/1", "hover");
  expect(outlined.background.rgb[0]).toBeCloseTo(250.2);
  const classroom = recipes.find((recipe) => recipe.id === "tag-classroom-outlined");
  expect(measureTagColorRecipe(classroom, "dark", "Background/Neutral/1", "pressed").boundary)
    .toEqual(measureTagColorRecipe(classroom, "dark", "Background/Neutral/1").boundary);
  const invalid = structuredClone(paper); invalid.foreground.role = "fill"; invalid.foreground.property = "background-color";
  expect(() => measureTagColorRecipe(invalid, "light", "Background/Neutral/1")).toThrow(/Category/);
  expect(() => measureTagColorRecipe(paper, "light", "Background/Neutral/4")).toThrow(/parent/);
});
