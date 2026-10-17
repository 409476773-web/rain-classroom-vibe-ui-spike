import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, expect, it } from "vitest";
import { copyDatePickerCloseoutFixture } from "./select-unification-test-fixture";
import { getSliderCloseoutSourceBindings, parseYamlSubset, restoreSliderCloseoutPhase, sliderCloseoutEvidence } from "./verification-helpers.mjs";

const roots: string[] = [];
const phase = (root: string) => parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) as any;
const read = (root: string, file: string) => JSON.parse(readFileSync(join(root, file), "utf8"));
const write = (root: string, file: string, value: unknown) => writeFileSync(join(root, file), JSON.stringify(value, null, 2) + "\n");
const bindings = sliderCloseoutEvidence + "source-bindings.json";
function fixture() {
  const root = mkdtempSync(join(tmpdir(), "rain-slider-closeout-")); roots.push(root);
  copyDatePickerCloseoutFixture(file => {
    mkdirSync(dirname(join(root, file)), { recursive: true }); writeFileSync(join(root, file), readFileSync(file));
  });
  expect(getSliderCloseoutSourceBindings(root, phase(root))?.kind).toBe("SliderCloseoutSourceBindings");
  return root;
}
afterEach(() => { for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });

it("validates the exact Slider governance closeout before earlier readers use it", () => { fixture(); });

it("rejects an expanded authorization and an unapproved old Gate", () => {
  const root = fixture(), status = phase(root);
  status.componentRefinements.sliderCloseout.scope += "-extra";
  expect(() => getSliderCloseoutSourceBindings(root, status)).toThrow(/exact finite authorization/);
  const gate = phase(root); gate.componentRefinements.g5Components.contrastAcceptance = "accepted";
  expect(() => getSliderCloseoutSourceBindings(root, gate)).toThrow(/exact finite authorization/);
});

it("rejects an unknown phase even if all owned sources remain unchanged", () => {
  const root = fixture(), status = phase(root);
  status.componentRefinements.unapprovedExperiment = { authorization: "authorized" };
  expect(() => getSliderCloseoutSourceBindings(root, status)).toThrow(/preserve every previous phase record and Gate/);
});

it("rejects an extra source path and an unrecorded third source hash", () => {
  const root = fixture(), record = read(root, bindings);
  record.sourceFiles["packages/ui/src/index.ts"] = { before: null, after: "0".repeat(64) }; write(root, bindings, record);
  expect(() => getSliderCloseoutSourceBindings(root, phase(root))).toThrow(/only its finite source paths|original proof changed/);
  delete record.sourceFiles["packages/ui/src/index.ts"]; write(root, bindings, record);
  writeFileSync(join(root, "docs/ai/g5-components.md"), "unknown third source\n");
  expect(() => getSliderCloseoutSourceBindings(root, phase(root))).toThrow(/current source changed: docs\/ai\/g5-components.md/);
});

it("rejects forged before bytes and a re-signed original baseline", () => {
  const root = fixture(), before = sliderCloseoutEvidence + "before/docs/ai/g5-components.md";
  writeFileSync(join(root, before), "forged before\n");
  expect(() => getSliderCloseoutSourceBindings(root, phase(root))).toThrow(/before source changed/);
  const other = fixture(), path = sliderCloseoutEvidence + "baseline.json", baseline = read(other, path), record = read(other, bindings);
  baseline.scope += "-forged"; write(other, path, baseline);
  record.baseline.sha256 = createHash("sha256").update(readFileSync(join(other, path))).digest("hex"); write(other, bindings, record);
  expect(() => getSliderCloseoutSourceBindings(other, phase(other))).toThrow(/original baseline changed|original proof changed/);
});

it("rejects unknown changes and re-signing of the scoped color verifier", () => {
  const root = fixture(), file = "scripts/g5-color-consumers.mjs", record = read(root, bindings);
  writeFileSync(join(root, file), readFileSync(join(root, file), "utf8") + "\n/* unapproved verifier change */\n");
  record.sourceFiles[file].after = createHash("sha256").update(readFileSync(join(root, file))).digest("hex"); write(root, bindings, record);
  expect(() => getSliderCloseoutSourceBindings(root, phase(root))).toThrow(/must keep its exact scoped color verifier|original proof changed/);
});

it("rejects a wrong transition owner, hash and unproved S3 field", () => {
  const root = fixture(), original = read(root, bindings);
  for (const mutate of [
    (record: any) => { record.reconciliation.sourceTransitions[0].priorOwner = "unapprovedOwner"; },
    (record: any) => { record.reconciliation.sourceTransitions[0].expectedAfter = "0".repeat(64); },
    (record: any) => { record.reconciliation.phaseObservation.value.humanGate = "accepted"; },
  ]) {
    const record = structuredClone(original); mutate(record); write(root, bindings, record);
    expect(() => getSliderCloseoutSourceBindings(root, phase(root))).toThrow(/cannot change owners, hashes or observed fields|original proof changed/);
  }
});

it("rejects modification and re-signing of an accepted visual source", () => {
  const root = fixture(), file = "packages/ui/src/slider/slider.css";
  writeFileSync(join(root, file), readFileSync(join(root, file), "utf8") + "\n/* altered visual */\n");
  expect(() => getSliderCloseoutSourceBindings(root, phase(root))).toThrow(/accepted visual source changed/);
  const oldProof = "evidence/runtime/slider-refinement-2026-10-13/source-bindings.json", record = read(root, oldProof);
  record.sourceFiles[file].after = createHash("sha256").update(readFileSync(join(root, file))).digest("hex"); write(root, oldProof, record);
  expect(() => getSliderCloseoutSourceBindings(root, phase(root))).toThrow(/original proof changed/);
});

it("rejects changing S3 proof while leaving its observation unchanged", () => {
  const root = fixture(), file = "evidence/runtime/rain-designer-starter-2026-10-13/exports.json", record = read(root, file);
  record.M1.snapshotId = "unproved-snapshot"; write(root, file, record);
  expect(() => getSliderCloseoutSourceBindings(root, phase(root))).toThrow(/original proof changed/);
});

it("rejects a third prototype-guide source and re-signing its retained observation", () => {
  const root = fixture(), file = "docs/ai/prototype-design.md";
  writeFileSync(join(root, file), "unproved prototype guide\n");
  expect(() => getSliderCloseoutSourceBindings(root, phase(root))).toThrow(/only the proven unchanged S3 prototype guide/);
  const other = fixture(), path = sliderCloseoutEvidence + "retained-source-observation.json", observation = read(other, path), record = read(other, bindings);
  observation.before = "0".repeat(64); write(other, path, observation);
  record.reconciliation.retainedSourceObservation.evidence.sha256 = createHash("sha256").update(readFileSync(join(other, path))).digest("hex"); write(other, bindings, record);
  expect(() => getSliderCloseoutSourceBindings(other, phase(other))).toThrow(/retained-source observation changed|original proof changed/);
});

it("restores only the observed phase in a comparison copy without mutating its caller", () => {
  const root = fixture(), status = phase(root), record = getSliderCloseoutSourceBindings(root, status)!;
  const original = structuredClone(status), before = structuredClone(status), current = { ...status, componentRefinements: structuredClone(status.componentRefinements) };
  delete before.componentRefinements.sliderCloseout; delete before.localExperiments.rainDesignerStarter;
  restoreSliderCloseoutPhase(record, current, before);
  expect(current).toEqual(before); expect(status).toEqual(original);
});
