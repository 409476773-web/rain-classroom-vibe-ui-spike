import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { getGeneratedTokenFiles } from "./generate-token-foundations.mjs";
import * as verification from "./verify-token-foundations.mjs";

const stylesPath = "packages/ui/src/icon-button/icon-button.styles.ts";
const pagePath = "apps/playground/src/docs/components/icon-button-page.tsx";
const cssPath = "apps/playground/src/docs/components/icon-button-page.css";
const validate = (filePath: string, source = readFileSync(filePath, "utf8")) =>
  (verification as any).validateRegisteredRecipeColors({ filePath, source });

it("retains the exact 93 and 9 measured contrast exceptions after the user's component acceptance", () => {
  const result = verification.verifyTokenFoundations() as any;
  expect(result.failures).toEqual([]);
  expect(result.acceptedComponentContrastExceptions).toHaveLength(102);
  expect(result.acceptedComponentContrastExceptions.filter((entry: any) => entry.recipeId.startsWith("question-number-"))).toHaveLength(93);
  expect(result.acceptedComponentContrastExceptions.filter((entry: any) => entry.recipeId.startsWith("option-button-content-"))).toHaveLength(9);
  expect(result.acceptedComponentContrastExceptions.every((entry: any) => entry.acceptedException === true && entry.status === "user-accepted-exception" && entry.unroundedActual < entry.minimum && entry.actual === Number(entry.unroundedActual.toFixed(2)))).toBe(true);
  expect(result.pendingContrastFindings.every((entry: any) => !entry.recipeId.startsWith("question-number-") && !entry.recipeId.startsWith("option-button-content-"))).toBe(true);
  expect(result.acceptedTextContrastExceptions).toHaveLength(8);
});

it("registers the size review page paints while rejecting new or moved Category colors", () => {
  const filePath = "apps/playground/src/experiments/question-option-sizes/review.css";
  const source = readFileSync(filePath, "utf8");
  expect(validate(filePath)).toEqual([]);
  expect(validate(filePath, `${source}\n.elsewhere { color: var(--rain-category-text-neutral-1); }`).length).toBeGreaterThan(0);
  expect(validate(filePath, source.replace(".size-review-column h3 small", ".size-review-column h3 button")).length).toBeGreaterThan(0);
});

describe("IconButton registered Category consumers", () => {
  it("registers actual state recipes as meaningful glyphs, including loading and disabled", () => {
    const outputs = getTokenFoundationOutputs() as any;
    expect(outputs.colorRecipeConsumers.filter((entry: any) => entry.filePath === stylesPath || entry.filePath === pagePath)).toHaveLength(2);
    const component = outputs.colorRecipeConsumers.find((entry: any) => entry.filePath === stylesPath);
    expect(component.recipes).toHaveLength(20);
    expect(component.recipes.every((recipe: any) => recipe.foreground.content === (recipe.state === "disabled" ? "disabled" : "meaningful-icon"))).toBe(true);
    expect(component.parentSurfaces).toEqual(["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"]);
    expect(validate(stylesPath)).toEqual([]);
    expect(validate(pagePath)).toEqual([]);
  });

  it("rejects changed state routing, cross-role colors, or colors outside the exact registered recipe", () => {
    const source = readFileSync(stylesPath, "utf8");
    for (const changed of [
      source.replace('highlight: "none", class: "hover:', 'highlight: "surface", class: "hover:'),
      source.replace("text-rain-category-icon-neutral-2", "text-rain-category-text-neutral-2"),
      `${source}\nconst escaped = "text-rain-category-icon-brand-1";`,
    ]) expect(validate(stylesPath, changed).length).toBeGreaterThan(0);
    const page = readFileSync(pagePath, "utf8");
    expect(validate(pagePath, page.replace("data-[feedback=interactive]:hover:", "hover:")).length).toBeGreaterThan(0);
  });

  it("registers exact page CSS paints and keeps new declarations or selector drift rejected", () => {
    const css = readFileSync(cssPath, "utf8");
    expect(validate(cssPath)).toEqual([]);
    expect(validate(cssPath, `${css}\n.elsewhere { color: var(--rain-category-icon-neutral-2); }`).length).toBeGreaterThan(0);
    expect(validate(cssPath, css.replace(".icon-button-page__size strong", ".icon-button-page__size button")).length).toBeGreaterThan(0);
    expect(validate(cssPath, `${css}\n.elsewhere { color: red; }`).length).toBeGreaterThan(0);
  });

  it("generates the consumer contract in the existing manifest", () => {
    const manifest = JSON.parse(getGeneratedTokenFiles()["manifests/contracts/token-foundations-v1.json"]!);
    expect(manifest.consumerPaths).toEqual(expect.arrayContaining([stylesPath, pagePath, cssPath]));
    expect(manifest.colorRecipeConsumers.filter((entry: any) => entry.filePath === stylesPath || entry.filePath === pagePath)).toHaveLength(2);
    expect(manifest.colorCssConsumers.filter((entry: any) => entry.filePath === cssPath)).toHaveLength(15);
    expect(manifest.colorCssConsumers.filter((entry: any) => entry.filePath === cssPath).some((entry: any) => entry.selector.includes("select"))).toBe(false);
  });
});


describe("QuestionNumber registered Category consumers", () => {
  const questionStyles = "packages/ui/src/question-number/question-number.styles.ts";
  const questionCss = "apps/playground/src/docs/components/question-number-page.css";

  it("checks source and roles while reporting real text and icon contrast findings separately", () => {
    const findings: any[] = [];
    const source = readFileSync(questionStyles, "utf8");
    expect((verification as any).validateRegisteredRecipeColors({ filePath: questionStyles, source, pendingContrastFindings: findings })).toEqual([]);
    expect(findings.some((entry) => entry.content === "text" && entry.minimum === 4.5)).toBe(true);
    expect(findings.some((entry) => entry.content === "meaningful-icon" && entry.minimum === 3)).toBe(true);
    expect(findings.every((entry) => entry.status === "pending-review" && entry.acceptedException === false)).toBe(true);
    const result = verification.verifyTokenFoundations();
    expect(result.acceptedComponentContrastExceptions.filter((entry: any) => entry.recipeId.startsWith("question-number-")).length).toBe(93);
    expect(result.acceptedTextContrastExceptions.every((entry: any) => !entry.recipeId.startsWith("question-number"))).toBe(true);
  });

  it("rejects unregistered colors, state routing and a downgraded text role", () => {
    const source = readFileSync(questionStyles, "utf8");
    for (const changed of [
      source.replace("text-rain-category-text-green-2", "text-rain-category-text-green-1"),
      source.replace('correct: "bg-rain-category-fill-green', 'wrong: "bg-rain-category-fill-green'),
      `${source}\nconst unregistered = "text-rain-category-text-brand-2";`,
    ]) expect(validate(questionStyles, changed).length).toBeGreaterThan(0);
    const outputs = getTokenFoundationOutputs() as any;
    const consumer = outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "questionNumberControlColors");
    consumer.foregroundContent = "decorative";
    consumer.recipes.forEach((recipe: any) => { recipe.foreground.content = "decorative"; });
    expect((verification as any).validateRegisteredRecipeColors({ filePath: questionStyles, source, outputs }).join("\n")).toMatch(/preserve.*text|real content contrast/);
  });

  it("keeps page paints exact and includes both new sources in the generated contract", () => {
    const css = readFileSync(questionCss, "utf8");
    expect(validate(questionCss)).toEqual([]);
    expect(validate(questionCss, `${css}\n.unregistered { color: var(--rain-category-text-green-2); }`).length).toBeGreaterThan(0);
    const manifest = JSON.parse(getGeneratedTokenFiles()["manifests/contracts/token-foundations-v1.json"]!);
    expect(manifest.consumerPaths).toEqual(expect.arrayContaining([questionStyles, questionCss]));
  });
});

describe("OptionButton registered Category consumers", () => {
  const optionStyles = "packages/ui/src/option-button/option-button.styles.ts";
  const optionCss = "apps/playground/src/docs/components/option-button-page.css";

  it("checks all body and row states including separate hover and active text pairings without contrast exemptions", () => {
    const outputs = getTokenFoundationOutputs() as any;
    const consumers = outputs.colorRecipeConsumers.filter((entry: any) => entry.filePath === optionStyles && entry.refinement !== "option-button-content");
    expect(consumers).toHaveLength(4);
    expect(consumers.flatMap((entry: any) => entry.recipes)).toHaveLength(19);
    expect(consumers.every((entry: any) => entry.foregroundContent === "text" && entry.contrastReview === undefined)).toBe(true);
    for (const symbol of ["optionControlInteractions", "optionRowInteractions"]) {
      const consumer = consumers.find((entry: any) => entry.symbol === symbol);
      expect(consumer.recipes.some((entry: any) => entry.state === "hover")).toBe(true);
      expect(consumer.recipes.some((entry: any) => entry.state === "active")).toBe(true);
    }
    const findings: any[] = [];
    expect((verification as any).validateRegisteredRecipeColors({ filePath: optionStyles, source: readFileSync(optionStyles, "utf8"), pendingContrastFindings: findings })).toEqual([]);
    expect(findings.every((entry: any) => entry.recipeId.startsWith("option-button-content-"))).toBe(true);
    expect(validate(optionCss)).toEqual([]);
  });

  it("rejects changed colors, unregistered paints and downgrading the option letter to an icon", () => {
    const source = readFileSync(optionStyles, "utf8");
    expect(validate(optionStyles, source.replace("fill-brand-solid-2", "fill-brand-solid-3")).length).toBeGreaterThan(0);
    expect(validate(optionStyles, `${source}\nconst unregistered = "text-rain-category-text-brand-2";`).length).toBeGreaterThan(0);
    const outputs = getTokenFoundationOutputs() as any;
    const consumer = outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "optionControlColors");
    consumer.foregroundContent = "meaningful-icon";
    consumer.recipes.forEach((recipe: any) => { recipe.foreground.content = "meaningful-icon"; });
    expect((verification as any).validateRegisteredRecipeColors({ filePath: optionStyles, source, outputs }).join("\n")).toMatch(/preserve.*text|real content contrast/);
  });

  it("cannot borrow QuestionNumber pending-review handling for failing option text", () => {
    const outputs = getTokenFoundationOutputs() as any;
    const consumer = outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "optionControlInteractions");
    consumer.contrastReview = "pending-review";
    for (const recipe of consumer.recipes.filter((entry: any) => entry.id.includes("-selected-"))) recipe.background.tokenId = "Fill/Brand/Solid/1";
    const findings: any[] = [];
    const failures = (verification as any).validateRegisteredRecipeColors({ filePath: optionStyles, source: readFileSync(optionStyles, "utf8"), outputs, pendingContrastFindings: findings });
    expect(failures.join("\n")).toMatch(/Insufficient contrast: 3.87 < 4.5/);
    expect(findings.every((entry: any) => entry.recipeId.startsWith("option-button-content-"))).toBe(true);
  });

  it("registers the exact page paints in the existing generated contract", () => {
    const manifest = JSON.parse(getGeneratedTokenFiles()["manifests/contracts/token-foundations-v1.json"]!);
    expect(manifest.consumerPaths).toEqual(expect.arrayContaining([optionStyles, optionCss]));
    expect(manifest.colorCssConsumers.filter((entry: any) => entry.filePath === optionCss)).toHaveLength(12);
    const source = readFileSync(optionCss, "utf8");
    expect(validate(optionCss, `${source}\n.unregistered { color: var(--rain-category-text-neutral-1); }`).length).toBeGreaterThan(0);
  });
});

describe("OptionButton content registered colors", () => {
  const filePath = "packages/ui/src/option-button/option-button.styles.ts";
  it("keeps the user-corrected reversed text and judgment glyph roles separate with no caption paints", () => {
    const outputs = getTokenFoundationOutputs() as any;
    const consumers = outputs.colorRecipeConsumers.filter((entry: any) => entry.refinement === "option-button-content");
    expect(consumers).toHaveLength(1);
    expect(consumers[0].foregroundContent).toBe("text-and-meaningful-icon");
    expect(consumers[0].recipes.map((entry: any) => entry.foreground.content)).toEqual(["text", "meaningful-icon", "text", "meaningful-icon"]);
    expect(outputs.colorRecipeConsumers.some((entry: any) => entry.symbol === "optionFeedbackColors")).toBe(false);
    const pending: any[] = [];
    expect((verification as any).validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8"), outputs, pendingContrastFindings: pending })).toEqual([]);
    expect(pending).toHaveLength(9);
    expect(pending.every((entry: any) => entry.recipeId.startsWith("option-button-content-review-") && entry.acceptedException === false && entry.theme === "light")).toBe(true);
    expect(pending.some((entry: any) => entry.content === "text" && entry.minimum === 4.5)).toBe(true);
    expect(pending.some((entry: any) => entry.content === "meaningful-icon" && entry.minimum === 3)).toBe(true);
  });

  it("rejects downgrading labels, omitting glyph use or borrowing content findings for base selection", () => {
    const source = readFileSync(filePath, "utf8"), outputs = getTokenFoundationOutputs() as any;
    const review = outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "optionFeedbackControlColors");
    review.recipes[0].foreground.content = "meaningful-icon";
    expect((verification as any).validateRegisteredRecipeColors({ filePath, source, outputs }).join("\n")).toMatch(/real content contrast/);
    review.recipes.pop();
    expect((verification as any).validateRegisteredRecipeColors({ filePath, source, outputs }).join("\n")).toMatch(/retain both text and meaningful-icon/);
    outputs.colorRecipeConsumers.find((entry: any) => entry.symbol === "optionControlInteractions").refinement = "option-button-content";
    expect((verification as any).validateRegisteredRecipeColors({ filePath, source, outputs }).join("\n")).toMatch(/cannot expand the accepted selection recipes/);
  });
});
