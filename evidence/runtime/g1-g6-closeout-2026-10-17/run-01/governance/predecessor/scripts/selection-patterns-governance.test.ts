import { existsSync, readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";

it("accepts only the user's dated SC-03 visual and interaction decision", () => {
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  const decision = { acceptedAt: "2026-09-10", decisionSource: "explicit-user-confirmation", userStatement: "没问题，完成验收",
    scope: "selection-patterns-sc03-runtime-visual-interaction-only", evidence: "../evidence/runtime/selection-patterns/verification.md" };
  Object.assign(status.componentRefinements.selectionPatternsSc03, { humanGate: "accepted", humanGateDecision: decision });
  expect(helpers.hasSelectionPatternsSc03Authorization(status)).toBe(true);
  for (const mutation of [{ acceptedAt: "2026-09-11" }, { decisionSource: "agent-inferred" }, { userStatement: "继续" },
    { scope: "all-selection-and-contrast" }, { evidence: "other.md" }, { publication: "authorized" }]) {
    const invalid = structuredClone(status);
    Object.assign(invalid.componentRefinements.selectionPatternsSc03.humanGateDecision, mutation);
    expect(helpers.hasSelectionPatternsSc03Authorization(invalid)).toBe(false);
  }
  const pending = structuredClone(status);
  pending.componentRefinements.selectionPatternsSc03.humanGate = "awaiting_human";
  delete pending.componentRefinements.selectionPatternsSc03.humanGateDecision;
  expect(helpers.hasSelectionPatternsSc03Authorization(pending)).toBe(true);
});

it("requires the exact SC-03 scope and cannot inherit the previous visual Gate", () => {
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(helpers.hasSelectionPatternsSc03Authorization).toBeTypeOf("function");
  expect(helpers.hasSelectionPatternsSc03Authorization(status)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(status).componentRefinements.selectionPatternsSc03).toBeUndefined();
  expect(status.componentRefinements.selectionCardsSc02.humanGate).toBe("accepted");
  for (const mutation of [{ scope: "all-selection-patterns" }, { humanGateDecision: undefined }, { contrastAcceptance: "accepted" },
    { decisionSource: "agent-inferred" }, { publication: "authorized" }, { implementation: "completed", independentReview: "not-run" }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.selectionPatternsSc03, mutation);
    expect(helpers.hasSelectionPatternsSc03Authorization(invalid)).toBe(false);
    expect(() => helpers.getValidatedTailwindB2History(invalid)).toThrow(/history/);
  }
});

it("registers three copyable candidates with real sources and their scoped accepted Gate", () => {
  const registry = JSON.parse(readFileSync("registry/selection-patterns.json", "utf8"));
  const state = (helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any).componentRefinements.selectionPatternsSc03;
  expect(registry).toMatchObject({ publication: "not-published", humanGate: "accepted", humanGateScope: "selection-patterns-sc03-runtime-visual-interaction-only", contrastAcceptance: "not-granted" });
  expect(registry.items.map((item: any) => item.exportName)).toEqual(["IndependentPreview", "DependentFields", "PageSelection"]);
  for (const item of registry.items) {
    const manifest = helpers.parseYamlSubset(readFileSync(item.manifest, "utf8")) as any;
    expect(manifest).toMatchObject({ category: "pattern", assetIdentity: "registry-candidate", maturity: "registry-candidate", modificationMode: "forkable", publication: "unpublished",
      verification: { humanGate: "accepted", humanGateScope: "selection-patterns-sc03-runtime-visual-interaction-only", contrastAcceptance: "not-granted", automated: state.automatedVerification, independentReview: state.independentReview } });
    expect(existsSync(manifest.sourcePath)).toBe(true);
    for (const file of item.files) expect(existsSync(file)).toBe(true);
  }
});
