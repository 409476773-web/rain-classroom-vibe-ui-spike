import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, linkSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join } from "node:path";
import { deepReviewBindingsPath, deepReviewFixtureFiles } from "./deep-review-successor.mjs";
import { githubReviewFixtureFiles } from "./github-review-successor.mjs";

export const componentImplementationEvidence = "evidence/runtime/component-implementation-2026-10-18/run-01/governance/";
export const componentImplementationBindingsPath = componentImplementationEvidence + "source-bindings.json";
export const componentImplementationModulePath = "scripts/component-implementation-successor.mjs";
export const componentImplementationPhaseKey = "componentImplementation20261018";
export const componentImplementationBaseline = Object.freeze({
  commit: "6a2364c8b0325a243b2de8ebe12361e305aab333",
  archivePath: "evidence/runtime/component-implementation-2026-10-18/run-01/baseline/existing-source-files.tar.gz",
  archiveSha256: "626c487e51a093406a69de2e1e2c312a07501e1347518e5257c947498c47563d",
  indexPath: "evidence/runtime/component-implementation-2026-10-18/run-01/baseline/existing-files.sha256.json",
  indexSha256: "2bd94f3ac96ca76a01b9a993004a6932ba515866ad9d916d78fe1e9abbc45363",
});
export const componentImplementationAuthority = Object.freeze({
  kind: "ComponentImplementationAuthorization",
  authorizedAt: "2026-10-18",
  decisionSource: "current-user-explicit-25-required-tasks",
  workMode: "system-mode-local-implementation",
  scope: "B00-B09; G01-G02; A01-A03; M01-M04; D01-D02; S01; C01-C03; four-conditional-tasks-not-started",
  humanGate: "not-granted-by-this-record",
  publication: "unpublished",
  gitFigmaBusinessMigration: "not-performed",
});
const bindingSeal = "66d271456017b1857fb3bfe56b0e66220c06264fccf32aa9ff148ca7ec186935";
const moduleSeal = "e3c20a4cb67504a6a57839a7aca619bd14d7a80847dfe03535c5d79c37fef180";
const predecessorSeal = "0bd651916418afbd2cc29a3d2fb97966598c72aa5dbd6bb0abb32f6b4978512a";
export const componentImplementationSha = bytes => createHash("sha256").update(bytes).digest("hex");
const sha = componentImplementationSha;
const tasks = new Set(["B00", "G01", "A01", ...Array.from({ length: 9 }, (_, i) => `B0${i + 1}`), "M01", "M02", "M03", "M04", "D01", "D02", "S01", "C01", "C02", "C03", "A02", "A03", "G02"]);

export function componentImplementationSafePath(file) {
  assert(typeof file === "string" && file.length > 0 && !isAbsolute(file) && !/[\\\0\r\n:]/.test(file)
    && file.split("/").every(part => part && part !== "." && part !== ".."), "Component implementation path must stay inside its root: " + file);
  return file;
}

export function componentImplementationRegularPath(root, file, checkedDirectories) {
  componentImplementationSafePath(file);
  assert(!lstatSync(root).isSymbolicLink(), "Component implementation root cannot be a symlink");
  const parts = file.split("/");
  for (let i = 1; i <= parts.length; i++) {
    const path = join(root, ...parts.slice(0, i));
    if (i < parts.length && checkedDirectories?.has(path)) continue;
    const info = lstatSync(path);
    assert(!info.isSymbolicLink() && (i < parts.length ? info.isDirectory() : info.isFile()), "Component implementation source must be a regular file: " + file);
    if (i < parts.length) checkedDirectories?.add(path);
  }
  return join(root, file);
}
const bytes = (root, file) => readFileSync(componentImplementationRegularPath(root, file));

// A reviewed, finite file list is mandatory. These bounds reject unrelated areas;
// they do not automatically authorize every changed file inside a directory.
export function validateComponentImplementationScope(scope) {
  assert(scope && typeof scope === "object" && !Array.isArray(scope), "Component implementation scope must be a file map");
  for (const required of [componentImplementationModulePath, "scripts/component-implementation-successor.test.ts", "scripts/seal-component-implementation.mjs", "status/current-phase.yaml"]) assert(Object.hasOwn(scope, required), "Component implementation scope missing protected infrastructure: " + required);
  for (const [file, item] of Object.entries(scope)) {
    componentImplementationSafePath(file);
    const explicitInfrastructure = new Set(["config/asset-discovery.yaml", "config/asset-documentation-routes.json", "scripts/evidence-output.mjs", "scripts/save-component-recovery.py"]);
    const allowed = explicitInfrastructure.has(file) || /^(?:apps\/playground\/src\/|apps\/prototype\/src\/|packages\/(?:ui|layouts)\/src\/|manifests\/|registry\/|docs\/ai\/|docs\/plans\/2026-10-18-|tests\/e2e\/)/.test(file)
      || /^(?:package\.json|playwright(?:\.[a-z0-9-]+)?\.config\.ts|status\/current-phase\.yaml|tests\/node-runtime\.d\.ts)$/.test(file)
      || /^scripts\/(?:asset-|playground-|component-|seal-component-|run-component-|implementation-inputs|verify-|g5-evidence-|closure-evidence-|rn14-starter|verification-helpers)/.test(file)
      || /^scripts\/[a-z0-9-]+\.test\.ts$/.test(file);
    assert(allowed, "Component implementation file is outside the 25-task source scope: " + file);
    assert(!/^(?:scripts\/(?:deep-review-successor|github-review-successor|g1-g6-closeout-governance|g6-governance)\.mjs|docs\/ai\/skills\/|docs\/ai\/information-design\.md)/.test(file), "Component implementation cannot rewrite previous proof modules or design methods: " + file);
    assert(item && typeof item === "object" && !Array.isArray(item), "Invalid component implementation scope entry: " + file);
    assert.deepEqual(Object.keys(item).sort(), ["reason", "taskIds"], "Scope requires only explicit taskIds and reason: " + file);
    assert(Array.isArray(item.taskIds) && item.taskIds.length && new Set(item.taskIds).size === item.taskIds.length && item.taskIds.every(id => tasks.has(id)), "Scope must name required task IDs, never an optional task: " + file);
    assert(typeof item.reason === "string" && item.reason.trim().length >= 12, "Scope needs a concrete change reason: " + file);
  }
  return scope;
}

export function componentImplementationBindingSeal(record) {
  const normalized = structuredClone(record);
  normalized.sourceFiles[componentImplementationModulePath].after = "self";
  return sha(JSON.stringify(normalized));
}
export function componentImplementationModuleSeal(source) {
  return sha(source.replace(/const (bindingSeal|moduleSeal) = "[^"]*";/g, 'const $1 = "UNSEALED";'));
}

export function validateComponentImplementationPhase(live, before, additions) {
  assert.deepEqual(Object.keys(additions), [componentImplementationPhaseKey], "Component implementation may add only its own phase record");
  assert(!Object.hasOwn(before, componentImplementationPhaseKey), "Baseline already contains the component implementation phase");
  const own = live[componentImplementationPhaseKey];
  assert.deepEqual(own, additions[componentImplementationPhaseKey], "Component implementation phase addition changed");
  assert(own && typeof own === "object", "Component implementation phase is required");
  for (const [key, value] of Object.entries(componentImplementationAuthority)) assert.deepEqual(own[key], value, "Component implementation authority changed: " + key);
  const allowed = new Set([...Object.keys(componentImplementationAuthority), "plan", "evidence", "implementation", "automatedVerification", "deliverySummary"]);
  for (const key of Object.keys(own)) assert(allowed.has(key), "Unexpected component implementation phase field: " + key);
  if (Object.hasOwn(own, "deliverySummary")) {
    const summary = own.deliverySummary;
    const fields = ["updatedAt", "title", "scope", "currentWork", "acceptance", "limitations"];
    assert(summary && typeof summary === "object" && !Array.isArray(summary), "Component implementation delivery summary must be a record");
    assert.deepEqual(Object.keys(summary).sort(), fields.sort(), "Component implementation delivery summary fields changed");
    for (const field of fields) assert(typeof summary[field] === "string", "Component implementation delivery summary must contain strings: " + field);
  }
  const restored = structuredClone(live); delete restored[componentImplementationPhaseKey];
  assert.deepEqual(restored, before, "Component implementation must preserve every previous phase record and Human Gate");
}

function readRecord(root) {
  const record = JSON.parse(bytes(root, componentImplementationBindingsPath));
  assert.notEqual(bindingSeal, "UNSEALED", "Component implementation has not been explicitly sealed");
  assert.equal(componentImplementationBindingSeal(record), bindingSeal, "Component implementation finite successor binding changed");
  return record;
}

export function componentImplementationFixtureFiles(root) {
  const prior = [...githubReviewFixtureFiles(root), ...deepReviewFixtureFiles(root)];
  if (!existsSync(join(root, componentImplementationBindingsPath))) return [...new Set(prior)];
  const record = readRecord(root);
  return [...new Set([...prior, componentImplementationBindingsPath, record.revisionRecord,
    ...Object.keys(record.sourceFiles), ...Object.values(record.sourceFiles).map(row => row.beforeSnapshot).filter(Boolean),
    ...Object.values(record.candidateSnapshots), ...Object.keys(record.retainedHistory)])];
}

export function readComponentImplementationBindings(root, status, parsePhase, verifyPrevious) {
  if (!existsSync(join(root, componentImplementationBindingsPath))) return null;
  const record = readRecord(root);
  assert.deepEqual(Object.keys(record).sort(), ["kind", "authorization", "baseline", "revision", "revisionRecord", "sealedAt", "previousRevision", "scope", "phaseAdditions", "sourceFiles", "candidateSnapshots", "retainedHistory", "predecessorBindingSeal"].sort(), "Component implementation record fields changed");
  assert.equal(record.kind, "ComponentImplementationFiniteSuccessor");
  assert.deepEqual(record.authorization, componentImplementationAuthority);
  assert.deepEqual(record.baseline, componentImplementationBaseline, "Component implementation baseline changed");
  assert.equal(record.predecessorBindingSeal, predecessorSeal, "Component implementation predecessor identity changed");
  assert.equal(componentImplementationModuleSeal(bytes(root, componentImplementationModulePath).toString()), moduleSeal, "Component implementation verifier source changed");
  const previousRecord = JSON.parse(bytes(root, deepReviewBindingsPath));
  const previousCopy = structuredClone(previousRecord); previousCopy.sourceFiles["scripts/deep-review-successor.mjs"].after = "self";
  assert.equal(sha(JSON.stringify(previousCopy)), predecessorSeal, "Component implementation original predecessor binding changed");
  validateComponentImplementationScope(record.scope);
  assert.deepEqual(Object.keys(record.sourceFiles).sort(), Object.keys(record.scope).sort(), "Component implementation finite source scope changed");
  assert.deepEqual(Object.keys(record.candidateSnapshots).sort(), Object.keys(record.scope).sort(), "Component implementation candidate snapshot scope changed");
  assert(/^[a-z][a-z0-9-]{0,63}$/.test(record.revision), "Unsafe component implementation revision");
  const revisionRoot = componentImplementationEvidence + "revisions/" + record.revision + "/";
  assert.equal(record.revisionRecord, revisionRoot + "source-bindings.json");
  assert.equal(sha(bytes(root, record.revisionRecord)), sha(bytes(root, componentImplementationBindingsPath)), "Component implementation active and revision bindings differ");
  for (const [file, binding] of Object.entries(record.sourceFiles)) {
    assert.deepEqual(Object.keys(binding).sort(), ["after", "before", "beforeSnapshot"], "Component implementation source binding fields changed: " + file);
    assert(/^[0-9a-f]{64}$/.test(binding.after), "Invalid current source hash: " + file);
    assert.equal(sha(bytes(root, file)), binding.after, "Component implementation current source changed: " + file);
    assert.equal(record.candidateSnapshots[file], revisionRoot + "after/" + file, "Component implementation candidate path changed: " + file);
    assert.equal(sha(bytes(root, record.candidateSnapshots[file])), binding.after, "Component implementation saved candidate changed: " + file);
    if (binding.before !== null) {
      assert(/^[0-9a-f]{64}$/.test(binding.before));
      assert.notEqual(binding.before, binding.after, "Component implementation cannot relabel unchanged user work: " + file);
      assert.equal(binding.beforeSnapshot, revisionRoot + "before/" + file, "Component implementation predecessor snapshot path changed: " + file);
      assert.equal(sha(bytes(root, binding.beforeSnapshot)), binding.before, "Component implementation baseline source changed: " + file);
    } else assert.equal(binding.beforeSnapshot, null, "A new component implementation file cannot invent a predecessor: " + file);
  }
  for (const [file, digest] of Object.entries(record.retainedHistory)) {
    assert(file.startsWith(componentImplementationEvidence + "revisions/") && !file.startsWith(revisionRoot), "Component implementation history path must be an earlier revision");
    assert.equal(sha(bytes(root, file)), digest, "Component implementation previous revision changed: " + file);
  }
  const live = parsePhase(bytes(root, "status/current-phase.yaml").toString());
  if (status != null) assert.deepEqual(status, live, "Component implementation supplied phase differs from bound source");
  const phaseBefore = record.sourceFiles["status/current-phase.yaml"].beforeSnapshot;
  assert(phaseBefore, "Component implementation phase must have a real predecessor");
  validateComponentImplementationPhase(live, parsePhase(bytes(root, phaseBefore).toString()), record.phaseAdditions);
  const view = mkdtempSync(join(tmpdir(), "rain-component-proof-"));
  let original;
  try {
    const checked = new Set();
    for (const file of new Set([...githubReviewFixtureFiles(root), ...deepReviewFixtureFiles(root)])) {
      const changed = record.sourceFiles[file];
      assert(!changed || changed.beforeSnapshot, "Existing proof cannot be restored from a new file: " + file);
      const source = changed?.beforeSnapshot ?? file;
      const target = join(view, file); mkdirSync(dirname(target), { recursive: true });
      linkSync(componentImplementationRegularPath(root, source, checked), target);
    }
    original = verifyPrevious(view, undefined, parsePhase);
    assert(original?.deepReviewSuccessor && original?.githubReviewSuccessor && original?.closeoutSuccessor, "Component implementation requires the complete independently sealed predecessor chain");
  } finally { rmSync(view, { recursive: true, force: true }); }
  const sourceFiles = { ...original.sourceFiles };
  for (const [file, binding] of Object.entries(record.sourceFiles)) sourceFiles[file] = sourceFiles[file] ? { ...sourceFiles[file], after: binding.after } : { ...binding };
  return { ...original, sourceFiles, componentImplementationSuccessor: record,
    closeoutSuccessor: { ...original.closeoutSuccessor, phaseAdditions: { ...original.closeoutSuccessor.phaseAdditions, ...record.phaseAdditions } } };
}
