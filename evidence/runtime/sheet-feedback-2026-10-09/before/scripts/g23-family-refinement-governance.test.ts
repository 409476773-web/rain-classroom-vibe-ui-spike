import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { expect, it } from "vitest";
import { getG23DocumentationSourceBindings, getG123TailwindCandidateOrigins, getValidatedTailwindB2History, hasSheetTaskRefinementAuthorization, parseYamlSubset } from "./verification-helpers.mjs";
import { getG123PlaygroundDocumentationColorConsumers, validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";

const status = () => parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;

it("accepts the explicit presented Sheet detail review without accepting other states", () => {
  const approved = status();
  approved.componentRefinements.sheetTaskRefinement.runtimeVisualReview = "detail-accepted-other-states-pending";
  approved.componentRefinements.sheetTaskRefinement.detailVisualApproval = {
    acceptedAt: "2026-10-09", decisionSource: "explicit-user-confirmation-after-sheet-runtime-handoff", userStatement: "确定",
    scope: "presented-right-detail-visual-and-information-layout", evidence: "evidence/runtime/sheet-task-refinement-2026-10-09/visual-acceptance.json",
  };
  expect(hasSheetTaskRefinementAuthorization(approved)).toBe(true);
  approved.componentRefinements.sheetTaskRefinement.detailVisualApproval.scope = "all-sheet-states-and-accessibility";
  expect(hasSheetTaskRefinementAuthorization(approved)).toBe(false);
});

it("records the selected Sheet scope and only the user-confirmed detail review", () => {
  const current = status();
  expect(current.componentRefinements.sheetTaskRefinement).toMatchObject({
    userStatement: "确定，开始改造", scope: "sheet-task-parts-and-existing-playground-detail-edit", runtimeVisualReview: "detail-accepted-other-states-pending", publication: "not-authorized",
  });
  expect(() => getValidatedTailwindB2History(current)).not.toThrow();
  for (const change of [{ scope: "all-overlays" }, { runtimeVisualReview: "accepted" }, { publication: "authorized" }, { implementation: "completed", automatedVerification: "not-run" }]) {
    const invalid = status();
    Object.assign(invalid.componentRefinements.sheetTaskRefinement, change);
    expect(() => getValidatedTailwindB2History(invalid)).toThrow(/frozen B2/);
  }
  const missingApproval = status();
  delete missingApproval.componentRefinements.sheetTaskRefinement.detailVisualApproval;
  expect(() => getValidatedTailwindB2History(missingApproval)).toThrow(/frozen B2/);
});

it("records the exact Toast feedback correction without accepting adjacent scope or Gates", () => {
  const current = status();
  expect(current.componentRefinements.toastActionPositionRefinement).toMatchObject({
    scope: "toast-text-action-and-top-centered-feedback", runtimeVisualReview: "awaiting-user-review", publication: "not-authorized",
  });
  expect(() => getValidatedTailwindB2History(current)).not.toThrow();
  for (const change of [{ scope: "all-feedback-components" }, { runtimeVisualReview: "accepted" }, { publication: "authorized" }, { implementation: "completed", automatedVerification: "not-run" }]) {
    const invalid = status();
    Object.assign(invalid.componentRefinements.toastActionPositionRefinement, change);
    expect(() => getValidatedTailwindB2History(invalid)).toThrow(/frozen B2/);
  }
});

it("recognizes the exact confirmed first sample scope while preserving the frozen B2 history", () => {
  const current = status();
  expect(() => getValidatedTailwindB2History(current)).not.toThrow();
});

it("rejects expansion to unreviewed families and automatic runtime acceptance", () => {
  const wider = status();
  wider.componentRefinements.g23FamilyVisualRefinement.scope = "all-g2-g3-families";
  expect(() => getValidatedTailwindB2History(wider)).toThrow(/frozen B2/);
  const accepted = status();
  accepted.componentRefinements.g23FamilyVisualRefinement.runtimeVisualReview = "accepted";
  expect(() => getValidatedTailwindB2History(accepted)).toThrow(/frozen B2/);
});

it("records the follow-up style scope without granting runtime acceptance or publication", () => {
  const current = status();
  expect(current.componentRefinements.g23RemainingVisualRefinement).toMatchObject({
    userStatement: "继续优化g2、g3下，其他组件的样式", scope: "remaining-g2-g3-styles-and-existing-playground-examples",
    runtimeVisualReview: "awaiting-user-review", publication: "not-authorized",
  });
  expect(() => getValidatedTailwindB2History(current)).not.toThrow();
  for (const change of [{ scope:"all-components" }, { runtimeVisualReview:"accepted" }, { publication:"authorized" }, { implementation:"completed", automatedVerification:"not-run" }]) {
    const invalid = status();
    Object.assign(invalid.componentRefinements.g23RemainingVisualRefinement, change);
    expect(() => getValidatedTailwindB2History(invalid)).toThrow(/frozen B2/);
  }
});

it("binds current documentation, its predecessor and paint roles without changing the earlier evidence", () => {
  const root = process.cwd(), phase = status();
  const bindings = getG23DocumentationSourceBindings(root, phase);
  const lexical = getG123TailwindCandidateOrigins(root, phase), menu = "packages/ui/src/context-menu/context-menu.tsx";
  expect(lexical.sourceFiles[menu]).toBe(bindings.lexicalSourceFiles[menu].after);
  expect(lexical.unusedCandidateSources["border-t"]).not.toHaveProperty(menu);
  const fixture = mkdtempSync(join(tmpdir(), "rain-g23-documentation-"));
  const recordPath = phase.componentRefinements.g23FamilyVisualRefinement.sourceBindings;
  try {
    for (const file of [recordPath, ...Object.keys(bindings.sourceFiles), ...Object.keys(bindings.retainedRecords)]) {
      mkdirSync(dirname(join(fixture, file)), { recursive: true });
      writeFileSync(join(fixture, file), readFileSync(join(root, file)));
    }
    expect(() => getG23DocumentationSourceBindings(fixture, phase)).not.toThrow();
    for (const file of [phase.componentRefinements.sheetTaskRefinement.detailVisualApproval.evidence, "evidence/runtime/sheet-task-refinement-2026-10-09/right-detail.jpg", phase.componentRefinements.sheetTaskRefinement.sourceBindings, "packages/ui/src/sheet/sheet.tsx", phase.componentRefinements.toastActionPositionRefinement.sourceBindings, "packages/ui/src/toast/toast.tsx", "packages/ui/src/toast/toast.css"]) {
      const path = join(fixture, file), source = readFileSync(path);
      writeFileSync(path, Buffer.concat([source, Buffer.from("\n/* changed */\n")]));
      expect(() => getG23DocumentationSourceBindings(fixture, phase)).toThrow(/recorded bytes|source changed|record changed/);
      writeFileSync(path, source);
    }
    for (const file of [recordPath, phase.componentRefinements.g23RemainingVisualRefinement.sourceBindings, menu, "apps/playground/src/docs/components/component-doc.css", "evidence/runtime/g2-g3-family-refinement-2026-10-08/before/apps/playground/src/docs/components/g3-component-pages.css", "evidence/runtime/g2-g3-remaining-families-2026-10-08/before/apps/playground/src/docs/components/g3-component-pages.css", "evidence/runtime/g2-g3-family-refinement-2026-10-08/doc-color-consumers.json", "evidence/runtime/g2-g3-remaining-families-2026-10-08/doc-color-consumers.json"]) {
      const path = join(fixture, file), source = readFileSync(path);
      writeFileSync(path, Buffer.concat([source, Buffer.from("\n/* changed */\n")]));
      expect(() => getG23DocumentationSourceBindings(fixture, phase)).toThrow(/recorded bytes|source changed|record changed/);
      writeFileSync(path, source);
    }
  } finally { rmSync(fixture, { recursive: true, force: true }); }
});

it("keeps actual documentation color declarations aligned with the registered roles", () => {
  const root = process.cwd(), outputs = getTokenFoundationOutputs();
  outputs.colorCssConsumers.push(...getG123PlaygroundDocumentationColorConsumers(root));
  for (const name of ["component-doc", "g3-component-pages", "toggle-group-page", "skeleton-page", "breadcrumb-page"]) {
    const filePath = `apps/playground/src/docs/components/${name}.css`;
    expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8"), outputs, root }), name).toEqual([]);
  }
});

it("keeps menu reading roles and the existing Sheet focus mask exact", () => {
  const root = process.cwd(), source = readFileSync("packages/ui/src/styles.css", "utf8");
  const options = { filePath:"packages/ui/src/styles.css", source, outputs:getTokenFoundationOutputs(), root };
  expect(validateRegisteredRecipeColors(options)).toEqual([]);
  expect(validateRegisteredRecipeColors({ ...options, source:source.replace(".rain-sheet-backdrop { background-color:var(--rain-overlay-focus); }", ".rain-sheet-backdrop { background-color:var(--rain-overlay-modal); }") })).toContain("Sheet must retain its exact existing focus mask consumer");
  expect(validateRegisteredRecipeColors({ ...options, source:source.replace(".rain-g3-menu-item { color:var(--rain-category-text-neutral-1); }", ".rain-g3-menu-item { color:var(--rain-category-text-neutral-6); }") }).length).toBeGreaterThan(0);
});
