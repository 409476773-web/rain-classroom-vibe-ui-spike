import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { expect, it } from "vitest";
import { getG23DocumentationSourceBindings, getValidatedTailwindB2History, parseYamlSubset } from "./verification-helpers.mjs";
import { getG123PlaygroundDocumentationColorConsumers, validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";

const status = () => parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;

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

it("binds current documentation, its predecessor and paint roles without changing the earlier evidence", () => {
  const root = process.cwd(), phase = status();
  const bindings = getG23DocumentationSourceBindings(root, phase);
  const fixture = mkdtempSync(join(tmpdir(), "rain-g23-documentation-"));
  const recordPath = phase.componentRefinements.g23FamilyVisualRefinement.sourceBindings;
  try {
    for (const file of [recordPath, ...Object.keys(bindings.sourceFiles), ...Object.keys(bindings.retainedRecords)]) {
      mkdirSync(dirname(join(fixture, file)), { recursive: true });
      writeFileSync(join(fixture, file), readFileSync(join(root, file)));
    }
    expect(() => getG23DocumentationSourceBindings(fixture, phase)).not.toThrow();
    for (const file of [recordPath, "apps/playground/src/docs/components/component-doc.css", "evidence/runtime/g2-g3-family-refinement-2026-10-08/before/apps/playground/src/docs/components/g3-component-pages.css", "evidence/runtime/g2-g3-family-refinement-2026-10-08/doc-color-consumers.json"]) {
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
  for (const name of ["component-doc", "g3-component-pages", "toggle-group-page"]) {
    const filePath = `apps/playground/src/docs/components/${name}.css`;
    expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8"), outputs, root }), name).toEqual([]);
  }
});
