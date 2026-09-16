import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

const filePath = "packages/ui/src/input/input.styles.ts";

it("registers only the confirmed lighter units and compact-count paints, with orange warning messages", () => {
  const outputs = getTokenFoundationOutputs() as any;
  const bySymbol = (symbol: string) => outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === symbol);
  expect(bySymbol("inputFeedbackRecipe")).toBeUndefined();
  expect(bySymbol("inputSuffixTextClassName")?.definition).toBe("inline-flex flex-none items-center whitespace-nowrap text-rain-category-text-neutral-5 group-data-[state=disabled]/input:text-rain-category-text-neutral-6");
  expect(bySymbol("inputAffixClassName").definition).toContain("text-rain-category-text-neutral-4");
  expect(bySymbol("inputCountRecipe").definition.variants.overflow).toEqual({ true: "text-rain-category-text-red-1", false: "text-rain-category-text-neutral-5" });
  expect(bySymbol("formItemColors").definition.warning).toBe("text-rain-category-text-orange-1");
  for (const symbol of ["inputSuffixTextClassName", "inputCountRecipe"]) {
    expect(bySymbol(symbol).recipes.some((recipe: any) => recipe.foreground.tokenId === "Text/Neutral/5" && recipe.foreground.content === "text")).toBe(true);
    expect(bySymbol(symbol).recipes.find((recipe: any) => recipe.state === "disabled").foreground).toMatchObject({ tokenId: "Text/Neutral/6", content: "disabled" });
  }
});

it("records necessary Input boundaries and red text without treating pending eligibility as a contrast pass", () => {
  const outputs = getTokenFoundationOutputs() as any;
  const input = outputs.colorRecipeConsumers.filter((entry: any) => entry.filePath === filePath);
  expect(input.length).toBeGreaterThan(0);
  const roots = outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "fieldFrameRecipe");
  expect(roots.recipes.some((recipe: any) => recipe.boundary?.content === "essential-boundary")).toBe(true);
  const pendingContrastFindings: any[] = [], pendingEligibilityFindings: any[] = [];
  expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8"), outputs, pendingContrastFindings, pendingEligibilityFindings })).toEqual([]);
  const fieldPath = "packages/ui/src/field/field.styles.ts";
  expect(validateRegisteredRecipeColors({ filePath: fieldPath, source: readFileSync(fieldPath, "utf8"), outputs, pendingContrastFindings, pendingEligibilityFindings })).toEqual([]);
  expect(pendingContrastFindings.some((entry) => entry.content === "essential-boundary" && entry.minimum === 3)).toBe(true);
  expect(pendingContrastFindings.some((entry) => entry.content === "text" && entry.minimum === 4.5)).toBe(true);
  expect(pendingContrastFindings.some((entry) => entry.recipeId === "input-suffix-text-default" && entry.tokenId === "Text/Neutral/5" && entry.actual === 3.71)).toBe(true);
  expect(pendingContrastFindings.some((entry) => entry.recipeId === "input-count-default" && entry.tokenId === "Text/Neutral/5" && entry.actual === 3.71)).toBe(true);
  expect(pendingEligibilityFindings.some((entry) => entry.tokenId === "Text/Red/1" && entry.parentSurfaceId === "Fill/Orange/Solid/3")).toBe(true);
  expect([...pendingContrastFindings, ...pendingEligibilityFindings].every((entry) => entry.status === "pending-review" && entry.acceptedException === false)).toBe(true);
});

it("registers the actual Input page paints and rejects moved or extra declarations", () => {
  const page = "apps/playground/src/docs/components/input-page.css";
  const outputs = getTokenFoundationOutputs() as any;
  expect(outputs.colorCssConsumers.filter((entry: any) => entry.filePath === page)).toHaveLength(4);
  const source = readFileSync(page, "utf8");
  expect(validateRegisteredRecipeColors({ filePath: page, source })).toEqual([]);
  expect(validateRegisteredRecipeColors({ filePath: page, source: `${source}\n.other { color: var(--rain-category-text-neutral-1); }` }).length).toBeGreaterThan(0);
});

it("rejects unregistered paints and downgrading essential boundaries or count text", () => {
  const outputs = getTokenFoundationOutputs() as any;
  expect(outputs.colorRecipeConsumers.some((entry: any) => entry.filePath === filePath)).toBe(true);
  const source = readFileSync(filePath, "utf8");
  expect(validateRegisteredRecipeColors({ filePath, source: `${source}\nconst escaped = "text-rain-category-text-red-1";` }).length).toBeGreaterThan(0);
  const root = outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "fieldFrameRecipe");
  root.recipes.forEach((recipe: any) => { if (recipe.boundary && recipe.state !== "disabled") recipe.boundary.content = "decorative"; });
  const fieldPath = "packages/ui/src/field/field.styles.ts";
  expect(validateRegisteredRecipeColors({ filePath: fieldPath, source: readFileSync(fieldPath, "utf8"), outputs }).join("\n")).toMatch(/metadata|essential.boundary/);
  const count = outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "inputCountRecipe");
  count.recipes[0].foreground.content = "decorative";
  expect(validateRegisteredRecipeColors({ filePath, source, outputs }).join("\n")).toMatch(/real content contrast/);
});

it("keeps warning text measurable and limits new pending contrast to the exact authorized part and token", () => {
  const outputs = getTokenFoundationOutputs() as any;
  const formPath = "packages/ui/src/input/form-item.tsx";
  const source = readFileSync(formPath, "utf8");
  const pendingContrastFindings: any[] = [];
  expect(validateRegisteredRecipeColors({ filePath: formPath, source, outputs, pendingContrastFindings })).toEqual([]);
  expect(pendingContrastFindings).toHaveLength(2);
  expect(pendingContrastFindings.every((entry) => entry.recipeId === "input-form-item-warning" && entry.content === "text" && entry.minimum === 4.5 && entry.acceptedException === false)).toBe(true);
  const warning = outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "formItemColors").recipes.find((recipe: any) => recipe.state === "warning");
  warning.foreground.recipeId = "input-form-item-help";
  expect(validateRegisteredRecipeColors({ filePath: formPath, source, outputs }).join("\n")).toMatch(/Insufficient contrast/);
  const suffix = outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "inputSuffixTextClassName");
  suffix.recipes[0].foreground.recipeId = "input-placeholder-default";
  expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8"), outputs }).join("\n")).toMatch(/exact declared content roles and eligibility/);
});
