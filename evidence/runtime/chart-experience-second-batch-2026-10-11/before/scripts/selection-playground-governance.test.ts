import { existsSync, readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";

it("validates scoped page visual acceptance while preserving the pending SC-04 history", () => {
  const phase = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  const entry = phase.componentRefinements.selectionPlaygroundSc04;
  entry.humanGate = "accepted";
  entry.humanGateDecision = {
    acceptedAt: "2026-09-12", decisionSource: "explicit-user-confirmation", userStatement: "基础页通过； 综合页通过",
    scope: "selection-playground-sc04-edit-classify-preview-close-runtime-visual-interaction-only",
    evidence: "../evidence/runtime/selection-playground/verification.md",
    doesNotAuthorize: ["color-or-contrast-acceptance", "remaining-manual-keyboard-at-or-real-device-checks", "source-lookup-or-registry-publication", "figma-publication-business-migration-or-git"],
  };
  expect(helpers.hasSelectionPlaygroundSc04Authorization(phase)).toBe(true);
  expect(() => helpers.getValidatedTailwindB2History(phase)).not.toThrow();
  for (const mutation of [
    { acceptedAt: "2026-09-11" }, { decisionSource: "agent-inferred" }, { userStatement: "通过" },
    { scope: "all-38-acceptance-cases" }, { evidence: "missing.md" }, { doesNotAuthorize: [] }, { extra: "accepted" },
  ]) {
    const changed = structuredClone(phase);
    Object.assign(changed.componentRefinements.selectionPlaygroundSc04.humanGateDecision, mutation);
    expect(helpers.hasSelectionPlaygroundSc04Authorization(changed)).toBe(false);
  }
  for (const mutation of [{ implementation: "in-progress" }, { automatedVerification: "failed" }, { independentReview: "findings" }]) {
    const changed = structuredClone(phase);
    Object.assign(changed.componentRefinements.selectionPlaygroundSc04, mutation);
    expect(helpers.hasSelectionPlaygroundSc04Authorization(changed)).toBe(false);
  }
  delete entry.humanGateDecision;
  expect(helpers.hasSelectionPlaygroundSc04Authorization(phase)).toBe(false);
  entry.humanGate = "awaiting_human";
  expect(helpers.hasSelectionPlaygroundSc04Authorization(phase)).toBe(true);
});

it("allows only the dated SC-04 scope and keeps prior decisions in the frozen history", () => {
  const phase = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(helpers.hasSelectionPlaygroundSc04Authorization).toBeTypeOf("function");
  expect(helpers.hasSelectionPlaygroundSc04Authorization(phase)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(phase).componentRefinements.selectionPlaygroundSc04).toBeUndefined();
  phase.componentRefinements.selectionPlaygroundSc04.humanGate = "awaiting_human";
  delete phase.componentRefinements.selectionPlaygroundSc04.humanGateDecision;
  for (const mutation of [{ scope: "publish-all" }, { decisionSource: "agent-inferred" }, { humanGate: "accepted" }, { contrastAcceptance: "accepted" }]) {
    const changed = structuredClone(phase); Object.assign(changed.componentRefinements.selectionPlaygroundSc04, mutation);
    expect(helpers.hasSelectionPlaygroundSc04Authorization(changed)).toBe(false);
    expect(() => helpers.getValidatedTailwindB2History(changed)).toThrow(/history/);
  }
});

it("keeps all 13 indexed sources and dependencies real, candidate-only and unpublished", () => {
  const names: string[] = [];
  for (const file of ["checkbox", "radio", "selection-cards", "selection-patterns"]) {
    const registry = JSON.parse(readFileSync(`registry/${file}.json`, "utf8"));
    expect(registry).toMatchObject({ publication: "not-published", contrastAcceptance: "not-granted" });
    for (const path of registry.shared.files ?? []) expect(existsSync(path), path).toBe(true);
    for (const item of registry.items) {
      names.push(item.name);
      const manifest = helpers.parseYamlSubset(readFileSync(item.manifest, "utf8")) as any;
      expect(manifest).toMatchObject({ assetIdentity: "registry-candidate", maturity: "registry-candidate", publication: "unpublished" });
      expect(manifest.verification.humanGateScope).toBe(registry.humanGateScope);
      for (const path of [...item.files, manifest.sourcePath, item.manifest]) expect(existsSync(path), path).toBe(true);
      expect(item.installable).not.toBe(true);
    }
  }
  expect(new Set(names).size).toBe(13);
});

it("accounts for all original cases without turning manual, AT or contrast blockers into passes", () => {
  const ledger = JSON.parse(readFileSync("evidence/runtime/selection-playground/acceptance.json", "utf8"));
  expect(ledger.cases.map((item: any) => item.id)).toEqual(Array.from({ length: 38 }, (_, i) => `SEL-${String(i + 1).padStart(3, "0")}`));
  expect(ledger).toMatchObject({ sc04HumanGate: "accepted", sc04HumanGateScope: "selection-playground-sc04-edit-classify-preview-close-runtime-visual-interaction-only", sc04HumanGateAcceptedAt: "2026-09-12", sc04HumanGateDecisionRef: "status/current-phase.yaml#componentRefinements.selectionPlaygroundSc04.humanGateDecision", contrastAcceptance: "not-granted", textContrastMinimum: 4.5, controlContrastMinimum: 3 });
  expect(ledger.cases.filter((item: any) => item.status === "blocked")).toHaveLength(ledger.coverageSummary.blocked);
  expect(ledger.coverageSummary).toEqual({ verifiedInRecordedScope: 30, blocked: 8, unlisted: 0 });
  expect(ledger.overallAcceptance).toBe("blocked-on-manual-keyboard-assistive-technology-and-contrast");
  expect(ledger.cases.filter((item: any) => item.status === "blocked").map((item: any) => item.id)).toEqual(["SEL-009", "SEL-012", "SEL-013", "SEL-014", "SEL-016", "SEL-020", "SEL-033", "SEL-034"]);
  for (const item of ledger.cases) {
    expect(item.methodResults.map((result: any) => result.method)).toEqual(item.requiredMethods);
    const blocked = item.methodResults.some((result: any) => result.status === "blocked");
    expect(item.status).toBe(blocked ? "blocked" : "verified-in-recorded-scope");
    if (blocked) expect(item.blocker).toBeTruthy();
    for (const path of item.evidence) expect(existsSync(path), `${item.id}: ${path}`).toBe(true);
    for (const result of item.methodResults) {
      expect(ledger.environments[result.environmentRef]).toBeDefined();
      if (result.method === "keyboard-manual") expect(result.status).toBe("blocked");
    }
  }
  expect(ledger.cases[32]).toMatchObject({ status: "blocked" });
  expect(ledger.cases[32].result).toContain("2.361:1");
  expect(ledger.cases[33]).toMatchObject({ status: "blocked" });
  const registry = JSON.parse(readFileSync("registry/selection-patterns.json", "utf8"));
  const manifest = helpers.parseYamlSubset(readFileSync("manifests/patterns/independent-preview.yaml", "utf8")) as any;
  expect(registry.items[0].pendingRefinement).toEqual(manifest.verification.sc04PreviewHeadingRepair);
  const phase = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(registry.items[0].pendingRefinement).toMatchObject({ humanGate: "accepted", humanGateScope: ledger.sc04HumanGateScope, acceptedAt: ledger.sc04HumanGateAcceptedAt });
  expect(phase.componentRefinements.selectionPlaygroundSc04.humanGateDecision.scope).toBe(ledger.sc04HumanGateScope);
});
