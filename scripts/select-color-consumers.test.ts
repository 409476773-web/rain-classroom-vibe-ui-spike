import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { getTokenFoundationOutputs, measureSelectColorRecipe } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

it("registers one shared frame definition and the exact Select paints while retaining technical findings", () => {
  const outputs = getTokenFoundationOutputs() as any;
  expect(outputs.colorRecipeConsumers.filter((entry: any) => entry.symbol === "fieldFrameRecipe")).toHaveLength(1);
  expect(outputs.colorRecipeConsumers.some((entry: any) => entry.symbol === "inputRootRecipe")).toBe(false);
  const pendingContrastFindings: any[] = [], pendingEligibilityFindings: any[] = [];
  for (const filePath of ["packages/ui/src/field/field.styles.ts", "packages/ui/src/select/select.styles.ts", "packages/ui/src/styles.css", "apps/playground/src/docs/components/select-page.css"]) {
    expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8"), outputs, pendingContrastFindings, pendingEligibilityFindings })).toEqual([]);
  }
  expect(pendingContrastFindings.some((entry) => entry.content === "essential-boundary" && entry.minimum === 3)).toBe(true);
  expect(pendingEligibilityFindings.some((entry) => entry.recipeId?.startsWith("select-placeholder-"))).toBe(true);
  const placeholder = outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "selectPlaceholderClassName");
  expect(new Set(placeholder.recipes.filter((entry: any) => entry.state !== "disabled").map((entry: any) => entry.foreground.tokenId))).toEqual(new Set(["Text/Neutral/5"]));
  expect(placeholder.recipes.find((entry: any) => entry.state === "disabled").foreground).toMatchObject({ tokenId: "Text/Neutral/6", content: "disabled" });
  expect(pendingEligibilityFindings.some((entry) => entry.tokenId === "Icon/Neutral/4" && entry.content === "meaningful-icon")).toBe(true);
  expect([...pendingContrastFindings, ...pendingEligibilityFindings].every((entry) => entry.status === "pending-review" && !entry.acceptedException)).toBe(true);
});

it("validates user-requested lighter Input placeholders while retaining both inner and outer field findings", () => {
  const filePath = "packages/ui/src/input/input.styles.ts", outputs = getTokenFoundationOutputs() as any;
  const pendingEligibilityFindings: any[] = [], pendingContrastFindings: any[] = [];
  expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8"), outputs, pendingEligibilityFindings, pendingContrastFindings })).toEqual([]);
  expect(pendingEligibilityFindings.some((entry) => entry.recipeId?.startsWith("input-placeholder-"))).toBe(true);
  expect(pendingContrastFindings.some((entry) => entry.recipeId?.startsWith("input-placeholder-"))).toBe(true);
  const placeholder = outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "inputControlClassName");
  expect(new Set(placeholder.recipes.filter((entry: any) => entry.state !== "disabled").map((entry: any) => entry.foreground.tokenId))).toEqual(new Set(["Text/Neutral/5"]));
  expect(placeholder.recipes.find((entry: any) => entry.state === "disabled").foreground).toMatchObject({ tokenId: "Text/Neutral/6", content: "disabled" });
  placeholder.recipes[0].foreground.critical = false;
  expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8"), outputs }).join(" ")).toMatch(/exact|metadata/);
  const fields = getTokenFoundationOutputs().colorRecipeConsumers.find((entry: any) => entry.symbol === "fieldFrameRecipe")!;
  const error = fields.recipes.find((entry: any) => entry.id === "field-underlined-error");
  const measured = measureSelectColorRecipe(error, "light", "Background/Neutral/3");
  expect(measured.boundaryInnerContrast).toBeCloseTo(2.909072, 5);
  expect(measured.boundaryOuterContrast).toBeGreaterThan(3);
  const fieldPath = "packages/ui/src/field/field.styles.ts";
  expect(validateRegisteredRecipeColors({ filePath: fieldPath, source: readFileSync(fieldPath, "utf8"), pendingContrastFindings })).toEqual([]);
  expect(pendingContrastFindings.some((entry) => entry.recipeId === "field-underlined-error" && entry.part === "boundary-inner")).toBe(true);
});

it("measures the remove action focus line against the halo over the field and selected value", () => {
  const filePath = "packages/ui/src/styles.css", pendingContrastFindings: any[] = [];
  expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8"), pendingContrastFindings })).toEqual([]);
  const finding = pendingContrastFindings.find((entry) => entry.recipeId === "field-focus-default-line" && entry.part === "tag-remove-halo" && entry.appearance === "outlined" && entry.theme === "light" && entry.parentBackgroundId === "Background/Neutral/1");
  expect(finding).toMatchObject({ minimum: 3, acceptedException: false, surfaceLayers: ["Fill/Brand/Alpha/4", "Fill/Neutral/Alpha/4", "Fill/Brand/Alpha/3"] });
  expect(finding.actual).toBeCloseTo(2.43961, 4);
  expect(getTokenFoundationOutputs().colorCssConsumers.flatMap((entry: any) => entry.focusPairs ?? []).some((entry: any) => entry.appearance === "underlined" && entry.part === "field-halo")).toBe(false);
});

it("rejects weak-placeholder relabeling, missing boundaries and paints outside declared sources", () => {
  const filePath = "packages/ui/src/select/select.styles.ts";
  const source = readFileSync(filePath, "utf8");
  const outputs = getTokenFoundationOutputs() as any;
  const placeholder = outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "selectPlaceholderClassName");
  expect(placeholder).toBeDefined();
  placeholder.recipes[0].foreground.critical = false;
  expect(validateRegisteredRecipeColors({ filePath, source, outputs }).join(" ")).toMatch(/exact|metadata/);
  expect(validateRegisteredRecipeColors({ filePath, source: source + '\nconst unrelated = "text-rain-category-text-neutral-1";' }).length).toBeGreaterThan(0);
  const fieldPath = "packages/ui/src/field/field.styles.ts", fields = getTokenFoundationOutputs() as any;
  fields.colorRecipeConsumers.find((entry: any) => entry.symbol === "fieldFrameRecipe").recipes[0].boundary.content = "decorative";
  expect(validateRegisteredRecipeColors({ filePath: fieldPath, source: readFileSync(fieldPath, "utf8"), outputs: fields }).join(" ")).toMatch(/exact|metadata|essential/);
});
