import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import * as tailwind from "./verify-tailwind-b2.mjs";

it("admits exactly this Tag batch while preserving frozen history and independent runtime Gates", () => {
  expect(helpers.hasTagRefinementAuthorization).toBeTypeOf("function");
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(helpers.hasTagRefinementAuthorization(status)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(status).componentRefinements.tag).toBeUndefined();
  for (const mutate of [
    (record: any) => { record.scope = "all-tags-and-pickers"; },
    (record: any) => { record.userStatement = "确认视觉"; },
    (record: any) => { record.decisionSource = "agent-inferred"; },
    (record: any) => { delete record.humanGateDecision; },
    (record: any) => { record.humanGateDecision.scope = "all-tag-batches"; },
    (record: any) => { record.humanGateDecision.userStatement = "agent assumed"; },
    (record: any) => { record.contrastAcceptance = "accepted"; },
    (record: any) => { record.extraPermission = "publish"; },
  ]) {
    const invalid = structuredClone(status);
    mutate(invalid.componentRefinements.tag);
    expect(helpers.hasTagRefinementAuthorization(invalid)).toBe(false);
    expect(() => helpers.getValidatedTailwindB2History(invalid)).toThrow(/history/);
  }
});

it("validates the precise Tag manifests and rejects widened Parts or a claimed Gate", () => {
  expect(tailwind.validateTagFamilyManifest).toBeTypeOf("function");
  const humanGate = (helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any).componentRefinements.tagBatchTwo.humanGate;
  for (const name of ["tag", "link-tag", "checkable-tag", "checkable-tag-group", ...helpers.tagBatchTwoNames]) {
    const manifest = helpers.parseYamlSubset(readFileSync(`manifests/ui/${name}.yaml`, "utf8")) as any;
    expect(tailwind.validateTagFamilyManifest({ manifest, name, humanGate })).toEqual([]);
    expect(tailwind.validateTagFamilyManifest({ manifest: { ...manifest, parts: [...manifest.parts, "picker"] }, name, humanGate })).not.toEqual([]);
    expect(tailwind.validateTagFamilyManifest({ manifest: { ...manifest, verification: { ...manifest.verification, humanGate: humanGate === "accepted" ? "awaiting_human" : "accepted" } }, name, humanGate })).not.toEqual([]);
  }
});

it("admits only the registered Tag native CSS and detects changed composition or scope", () => {
  expect(tailwind.validateTagCssExceptions).toBeTypeOf("function");
  const contract = helpers.parseYamlSubset(readFileSync("manifests/contracts/tailwind-b2.yaml", "utf8"));
  const source = readFileSync("packages/ui/src/styles.css", "utf8");
  expect(tailwind.validateTagCssExceptions({ contract, source })).toEqual([]);
  expect(tailwind.validateTagCssExceptions({ contract, source: source.replace(".rain-checkable-tag:hover > .rain-tag__overlay { opacity: var(--rain-tag-hover-opacity); }", ".rain-checkable-tag:hover > .rain-tag__overlay { opacity: 0.4; }") })).not.toEqual([]);
  expect(tailwind.validateTagCssExceptions({ contract, source: source + "\n.rain-tag { background: red; }" })).not.toEqual([]);
  expect(tailwind.validateTagCssExceptions({ contract, source, authorized: false })).not.toEqual([]);
});

it("keeps second-batch authorization separate from the accepted first batch", () => {
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  status.componentRefinements.tagBatchTwo.humanGate = "accepted";
  status.componentRefinements.tagBatchTwo.humanGateDecision = {
    acceptedAt: "2026-09-09", decisionSource: "explicit-user-confirmation",
    userStatement: "视觉没问题。继续推进", scope: "tag-batch-two-runtime-visual-only",
    evidence: "../evidence/runtime/tag-batch-two/verification.md",
  };
  expect(helpers.hasTagBatchTwoRefinementAuthorization(status)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(status).componentRefinements.tagBatchTwo).toBeUndefined();
  for (const field of ["scope", "userStatement", "humanGate", "contrastAcceptance"]) {
    const invalid = structuredClone(status); invalid.componentRefinements.tagBatchTwo[field] = "expanded";
    expect(helpers.hasTagBatchTwoRefinementAuthorization(invalid)).toBe(false);
    expect(() => helpers.getValidatedTailwindB2History(invalid)).toThrow(/history/);
  }
  for (const mutate of [
    (record: any) => { delete record.humanGateDecision; },
    (record: any) => { record.humanGateDecision.scope = "all-tag-batches"; },
    (record: any) => { record.humanGateDecision.userStatement = "agent assumed"; },
  ]) {
    const invalid = structuredClone(status); mutate(invalid.componentRefinements.tagBatchTwo);
    expect(helpers.hasTagBatchTwoRefinementAuthorization(invalid)).toBe(false);
  }
});
