import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { isDeepStrictEqual } from "node:util";
import { parseYamlSubset } from "../../../scripts/verification-helpers.mjs";
import { verifyAssetIndex } from "../../../scripts/asset-index.mjs";

const base = "evidence/runtime/attachment-visual-acceptance-2026-10-16";
const scope = "current-attachment-preview-visual-only";
const read = path => readFileSync(path, "utf8"), json = path => JSON.parse(read(path));
const sha = path => createHash("sha256").update(readFileSync(path)).digest("hex");
const baseline = json(`${base}/baseline.json`), bindings = json(`${base}/source-bindings.json`);
const checks = [];
function check(name, run) { try { checks.push({ name, status: "passed", details: run() }); } catch (error) { checks.push({ name, status: "failed", error: error.message }); } }

check("accepted-source-and-predecessor-preservation", () => {
  for (const [path, hash] of Object.entries(baseline.runtime)) assert.equal(sha(path), hash, path);
  for (const [path, hash] of Object.entries(baseline.predecessors)) assert.equal(sha(path), hash, path);
  for (const [path, hashes] of Object.entries(bindings.sourceFiles)) assert.equal(sha(path), hashes.after, path);
  for (const [path, hash] of Object.entries(bindings.evidence)) assert.equal(sha(path), hash, path);
  return { acceptedSources: Object.keys(baseline.runtime).length, predecessorSeals: Object.keys(baseline.predecessors).length };
});
check("explicit-user-visual-only-decision", () => {
  const decision = json(`${base}/manual-acceptance.json`);
  assert.equal(decision.userStatement, "确定。完成视觉检验");
  assert.equal(decision.decisionSource, "explicit-current-user-message");
  assert.equal(decision.scope, scope); assert.equal(decision.humanGate, "accepted");
  assert.equal(decision.contrastAcceptance, "not-granted"); assert.equal(decision.publication, "unpublished");
  for (const excluded of ["whole-G6-or-library", "functional-and-production-service-acceptance", "Git-operations"]) assert(decision.excluded.includes(excluded));
  return { scope, humanGate: decision.humanGate };
});
check("phase-only-current-leaf-and-acceptance-record", () => {
  const before = parseYamlSubset(read(`${base}/before/status/current-phase.yaml`));
  const after = parseYamlSubset(read("status/current-phase.yaml"));
  const current = after.componentRefinements.attachmentPreviewVisualAcceptance;
  assert.equal(current.scope, scope); assert.equal(current.humanGate, "accepted");
  assert.equal(current.contrastAcceptance, "not-granted"); assert.equal(current.publication, "unpublished");
  delete after.componentRefinements.attachmentPreviewVisualAcceptance;
  const leaf = after.componentRefinements.attachmentFunctions.visualRefinement.scenarioImplementation.intakeRefinement;
  assert.equal(leaf.humanGate, "accepted"); assert.equal(leaf.humanGateScope, scope);
  leaf.humanGate = "awaiting_human"; delete leaf.humanGateScope; delete leaf.acceptanceEvidence;
  assert.equal(leaf.iconFeedback.humanGate, "accepted"); assert.equal(leaf.iconFeedback.humanGateScope, scope);
  delete leaf.iconFeedback.humanGate; delete leaf.iconFeedback.humanGateScope; delete leaf.iconFeedback.acceptanceEvidence;
  assert(isDeepStrictEqual(before, after), "Unrelated phase or historical Gate changed");
  return { historicalGatesPreserved: true };
});
check("current-contract-item-and-index", () => {
  const manifest = parseYamlSubset(read("manifests/recipes/attachment-workflow.yaml"));
  assert.equal(manifest.humanGate, "accepted"); assert.equal(manifest.humanGateScope, scope);
  assert.equal(manifest.verification.humanGate, "accepted"); assert.equal(manifest.verification.humanGateScope, scope);
  assert.equal(manifest.humanGateDecision.userStatement, "确定。完成视觉检验");
  assert.equal(manifest.humanGateDecision.scope, scope); assert.equal(manifest.contrastAcceptance, "not-granted"); assert.equal(manifest.publication, "unpublished");
  const before = json(`${base}/before/registry/attachment-workflow.json`), registry = json("registry/attachment-workflow.json"), item = registry.items.find(item => item.name === "attachment-workflow");
  assert.equal(registry.humanGate, before.humanGate); assert.equal(item.humanGate, "accepted"); assert.equal(item.humanGateScope, scope);
  registry.sourceBindings = before.sourceBindings; registry.verificationEvidence = before.verificationEvidence;
  item.sourceBindings = before.items[0].sourceBindings; delete item.humanGate; delete item.humanGateScope; delete item.humanGateEvidence;
  assert(isDeepStrictEqual(before, registry), "Unrelated Registry change");
  verifyAssetIndex(process.cwd());
  const omitAttachment = text => text.split("\n").filter(line => !line.startsWith("| **Attachment Workflow** |"));
  assert.deepEqual(omitAttachment(read("docs/ai/asset-index.md")), omitAttachment(read(`${base}/before/docs/ai/asset-index.md`)));
  return { currentItemAcceptedOnly: true, generatedIndexCurrent: true };
});
const result = { scope, checks, result: checks.every(check => check.status === "passed") ? "passed-scoped" : "failed" };
writeFileSync(`${base}/verification.json`, JSON.stringify(result, null, 2) + "\n");
checks.forEach(check => console.log(`${check.status.toUpperCase()} ${check.name}${check.error ? `: ${check.error}` : ""}`));
if (result.result === "failed") process.exitCode = 1;
