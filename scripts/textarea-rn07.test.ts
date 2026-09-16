import { existsSync, readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";

it("admits only the scoped RN-07 record while keeping previous Gates frozen", () => {
  expect(helpers).toHaveProperty("hasTextareaRn07Authorization");
  const phase = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(helpers.hasTextareaRn07Authorization(phase)).toBe(true);
  expect(() => helpers.getValidatedTailwindB2History(phase)).not.toThrow();
  for (const [key, value] of [["scope", "all-components"], ["humanGate", "system-approved"], ["contrastAcceptance", "accepted"], ["packageOrRegistryPublication", "published"], ["businessMigration", "authorized"]] as const) {
    const changed = structuredClone(phase);
    changed.componentRefinements.textareaRn07[key] = value;
    expect(helpers.hasTextareaRn07Authorization(changed)).toBe(false);
    expect(() => helpers.getValidatedTailwindB2History(changed)).toThrow();
  }
  for (const path of Object.values(helpers.textareaRn07Files).flat()) expect(existsSync(path), path).toBe(true);
  const manifest = helpers.parseYamlSubset(readFileSync("manifests/ui/textarea.yaml", "utf8")) as any;
  expect(manifest).toMatchObject({ assetIdentity: "registry-candidate", maturity: "registry-candidate", publication: "unpublished" });
  expect(manifest.verification.automated).toBe(phase.componentRefinements.textareaRn07.automatedVerification);
  expect(manifest.verification.independentReview).toBe(phase.componentRefinements.textareaRn07.independentReview);
  expect(existsSync(manifest.verification.independentReviewEvidence)).toBe(true);
  const decision = phase.componentRefinements.textareaRn07.humanGateDecision;
  expect(manifest.verification).toMatchObject({ humanGate: "accepted", humanGateScope: decision.scope, contrastAcceptance: "not-granted" });
  const registry = JSON.parse(readFileSync("registry/textarea.json", "utf8"));
  expect(registry).toMatchObject({ publication: "not-published", humanGate: "accepted", humanGateScope: decision.scope, contrastAcceptance: "not-granted" });
  for (const path of [...registry.shared.files, ...registry.shared.componentDependencies, ...registry.items.flatMap((item: { files: string[] }) => item.files)]) expect(existsSync(path), path).toBe(true);
});

it("requires evidence for independent review and links the planning snapshot to live execution", () => {
  const phase = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  const entry = phase.componentRefinements.textareaRn07;
  expect(entry.independentReview).toBe("passed");
  for (const key of Object.keys(entry.independentReviewDecision)) {
    const changed = structuredClone(phase);
    delete changed.componentRefinements.textareaRn07.independentReviewDecision[key];
    expect(helpers.hasTextareaRn07Authorization(changed)).toBe(false);
  }
  const previous = structuredClone(phase);
  previous.componentRefinements.textareaRn07.independentReview = "not-run";
  delete previous.componentRefinements.textareaRn07.independentReviewDecision;
  expect(helpers.hasTextareaRn07Authorization(previous)).toBe(true);
  const ledger = JSON.parse(readFileSync("docs/Rain-Next-Codex-工作包V2/08_计划与验收台账V2.json", "utf8"));
  const task = ledger.tasks.find((task: { id: string }) => task.id === "RN-07");
  expect(task.executionUpdate.statusSource).toBe("../../status/current-phase.yaml#componentRefinements.textareaRn07");
  expect(task.executionUpdate.updatedAt).toBe("2026-09-14");
  expect(task.executionUpdate.evidence).toContain("../../evidence/runtime/textarea/independent-review.md");
});

it("requires the exact visual decision and keeps awaiting-human history valid", () => {
  const phase = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  const decision = phase.componentRefinements.textareaRn07.humanGateDecision;
  expect(decision).toEqual({
    acceptedAt: "2026-09-13", decisionSource: "explicit-user-confirmation", userStatement: "视觉验确认",
    scope: "textarea-resize-handle-and-text-padding-runtime-visual-only",
    evidence: "../evidence/runtime/textarea/verification.md",
  });
  for (const key of Object.keys(decision)) {
    for (const invalid of [undefined, "expanded-or-unconfirmed"]) {
      const changed = structuredClone(phase);
      changed.componentRefinements.textareaRn07.humanGateDecision[key] = invalid;
      expect(helpers.hasTextareaRn07Authorization(changed)).toBe(false);
      expect(() => helpers.getValidatedTailwindB2History(changed)).toThrow();
    }
  }
  const unfinished = structuredClone(phase);
  unfinished.componentRefinements.textareaRn07.implementation = "in-progress";
  expect(helpers.hasTextareaRn07Authorization(unfinished)).toBe(false);
  const previous = structuredClone(phase);
  delete previous.componentRefinements.textareaRn07.humanGateDecision;
  expect(helpers.hasTextareaRn07Authorization(previous)).toBe(false);
  previous.componentRefinements.textareaRn07.humanGate = "awaiting_human";
  expect(helpers.hasTextareaRn07Authorization(previous)).toBe(true);
  expect(() => helpers.getValidatedTailwindB2History(previous)).not.toThrow();
});
