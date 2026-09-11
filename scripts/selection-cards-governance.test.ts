import { existsSync, readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import * as b2 from "./verify-tailwind-b2.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

it("accepts only the user's dated SC-02 runtime visual decision", () => {
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  const decision = { acceptedAt: "2026-09-10", decisionSource: "explicit-user-confirmation", userStatement: "完成视觉验收。",
    scope: "selection-cards-sc02-runtime-visual-only", evidence: "../evidence/runtime/selection-cards/verification.md" };
  Object.assign(status.componentRefinements.selectionCardsSc02, { humanGate: "accepted", humanGateDecision: decision });
  expect(helpers.hasSelectionCardsSc02Authorization(status)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(status).componentRefinements.selectionCardsSc02).toBeUndefined();
  for (const mutation of [{ acceptedAt: "2026-09-11" }, { decisionSource: "agent-inferred" }, { userStatement: "继续" },
    { scope: "all-selection-and-contrast" }, { evidence: "other.md" }, { publication: "authorized" }]) {
    const invalid = structuredClone(status);
    Object.assign(invalid.componentRefinements.selectionCardsSc02.humanGateDecision, mutation);
    expect(helpers.hasSelectionCardsSc02Authorization(invalid)).toBe(false);
  }
  const pending = structuredClone(status);
  pending.componentRefinements.selectionCardsSc02.humanGate = "awaiting_human";
  delete pending.componentRefinements.selectionCardsSc02.humanGateDecision;
  expect(helpers.hasSelectionCardsSc02Authorization(pending)).toBe(true);
});

it("admits only SC-02 with its scoped visual Gate and preserves accepted standard controls", () => {
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(helpers.hasSelectionCardsSc02Authorization).toBeTypeOf("function");
  expect(helpers.hasSelectionCardsSc02Authorization(status)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(status).componentRefinements.selectionCardsSc02).toBeUndefined();
  expect(status.componentRefinements.radioSc01.humanGate).toBe("accepted");
  expect(status.componentRefinements.checkboxSc01.humanGate).toBe("accepted");
  expect(status.componentRefinements.selectionCardsSc02.humanGate).toBe("accepted");
  for (const mutation of [{ scope: "all-selection-patterns" }, { humanGateDecision: undefined }, { contrastAcceptance: "accepted" },
    { selectedBorder: "brand-primary" }, { decisionSource: "agent-inferred" }, { publication: "authorized" },
    { implementation: "completed", independentReview: "not-run" }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.selectionCardsSc02, mutation);
    expect(helpers.hasSelectionCardsSc02Authorization(invalid)).toBe(false);
    expect(() => helpers.getValidatedTailwindB2History(invalid)).toThrow(/history/);
  }
});

it("keeps V0.3 layout and registered themed paint scoped to the new cards", () => {
  const source = readFileSync("packages/ui/src/styles.css", "utf8");
  const contract = helpers.parseYamlSubset(readFileSync("manifests/contracts/tailwind-b2.yaml", "utf8"));
  expect(b2.validateSelectionCardCssExceptions({ source, contract })).toEqual([]);
  expect(b2.validateSelectionCardCssExceptions({ source, contract, authorized: false }).length).toBeGreaterThan(0);
  for (const changed of [source.replace("aspect-ratio: 7 / 3;", "aspect-ratio: 1 / 1;"), source + '\n.rain-selection-card { border-color: #1561f8; }']) {
    expect(b2.validateSelectionCardCssExceptions({ source: changed, contract }).length).toBeGreaterThan(0);
  }
  expect(validateRegisteredRecipeColors({ filePath: "packages/ui/src/styles.css", source })).toEqual([]);
});

it("registers two card entries and four recipes as real unpublished candidates", () => {
  const state = (helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any).componentRefinements.selectionCardsSc02;
  const registry = JSON.parse(readFileSync("registry/selection-cards.json", "utf8"));
  expect(registry).toMatchObject({ publication: "not-published", humanGate: "accepted", humanGateScope: "selection-cards-sc02-runtime-visual-only", contrastAcceptance: "not-granted" });
  expect(registry.items.map((item: any) => item.exportName)).toEqual(["CheckboxCard", "RadioCard", "RadioPreviewCard", "CheckboxObjectCard", "RadioComparisonCard", "RadioCardWithPreview"]);
  for (const item of registry.items) {
    const manifest = helpers.parseYamlSubset(readFileSync(item.manifest, "utf8")) as any;
    expect(manifest).toMatchObject({ assetIdentity: "registry-candidate", maturity: "registry-candidate", publication: "unpublished", verification: { humanGate: "accepted", humanGateScope: "selection-cards-sc02-runtime-visual-only", contrastAcceptance: "not-granted" } });
    expect(manifest.verification).toMatchObject({ automated: state.automatedVerification, independentReview: state.independentReview });
    expect(existsSync(manifest.sourcePath)).toBe(true);
    for (const file of item.files) expect(existsSync(file)).toBe(true);
  }
  for (const file of registry.shared.files) expect(existsSync(file)).toBe(true);
  expect(registry.shared.registryDependencies).toEqual(["registry/checkbox.json", "registry/radio.json", "registry/tag.json"]);
});
