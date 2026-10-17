import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { verifyReuseBindings } from "./questionnaire-reuse-governance.mjs";

export const closeoutEvidence = "evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/";
export const closeoutBindingsPath = closeoutEvidence + "source-bindings.json";
const bindingSeal = "db36f041dc9326c15ad0d6d4c9858e3db9e0db0b0a11191621ca956c267525d0";
const moduleSeal = "97abfc306fc5f8643e2552db1c54213635e51f412406855641d52d0e70425516";
const modulePath = "scripts/g1-g6-closeout-governance.mjs";
const sha = source => createHash("sha256").update(source).digest("hex");

function bytes(root, file) {
  assert(typeof file === "string" && !isAbsolute(file) && file.split("/").every(part => part && part !== "." && part !== ".."), "Closeout source must stay inside its root");
  const parts = file.split("/");
  for (let i = 1; i <= parts.length; i++) {
    const info = lstatSync(join(root, ...parts.slice(0, i)));
    assert(!info.isSymbolicLink() && (i < parts.length ? info.isDirectory() : info.isFile()), "Closeout source must be a regular file: " + file);
  }
  return readFileSync(join(root, file));
}

// These nodes are exact additions from separately recorded user-authorized work.
// Matching an old Gate or an arbitrary future record never grants deletion authority.
export function restoreG1G6CloseoutPhase(record, current) {
  if (!record) return;
  for (const [file, value] of Object.entries(record.phaseAdditions)) {
    const keys = file.split("."), name = keys.pop();
    const parent = keys.reduce((value, key) => value?.[key], current);
    if (parent && JSON.stringify(parent[name]) === JSON.stringify(value)) delete parent[name];
  }
}

export function readG1G6CloseoutBindings(root, status, parsePhase, verifyOriginal) {
  if (!existsSync(join(root, closeoutBindingsPath))) return null;
  const encoded = bytes(root, closeoutBindingsPath);
  assert.equal(sha(encoded), bindingSeal, "Closeout finite successor binding changed");
  const record = JSON.parse(encoded);
  assert.equal(record.kind, "G1G6FiniteCloseoutSuccessor");
  assert.equal(record.scope, "g1-g6-existing-assets-closeout-and-v12-p5-p6-local-transfer");
  const normalizedModule = bytes(root, modulePath).toString().replace(/const (bindingSeal|moduleSeal) = "[^"]*";/g, 'const $1 = "PENDING";');
  assert.equal(sha(normalizedModule), moduleSeal, "Closeout verifier source changed");
  for (const [file, expected] of Object.entries(record.retainedFiles)) assert.equal(sha(bytes(root, file)), expected, "Closeout retained source or original proof changed: " + file);
  for (const [file, binding] of Object.entries(record.sourceFiles)) {
    assert.equal(sha(bytes(root, file)), binding.after, "Closeout authorized successor source changed: " + file);
    if (binding.before !== null) assert.equal(sha(bytes(root, binding.beforeSnapshot)), binding.before, "Closeout predecessor snapshot changed: " + file);
  }
  const view = join(root, closeoutEvidence + "predecessor");
  for (const [file, expected] of Object.entries(record.projectedFiles)) assert.equal(sha(bytes(view, file)), expected, "Closeout original verifier view changed: " + file);
  for (const [file, expected] of Object.entries(record.questionnaireFiles)) assert.equal(sha(bytes(root, closeoutEvidence + "questionnaire-predecessor/" + file)), expected, "Closeout original Questionnaire verifier view changed: " + file);
  const live = parsePhase(bytes(root, "status/current-phase.yaml").toString());
  if (status != null) assert.deepEqual(status, live, "G6 supplied lifecycle and phase must match the bound disk record");
  const restored = structuredClone(live);
  restoreG1G6CloseoutPhase(record, restored);
  assert.deepEqual(restored, parsePhase(bytes(view, "status/current-phase.yaml").toString()), "Closeout must preserve every previous phase record and Gate");
  // The original sealed verifiers, not this record, establish predecessor validity.
  const original = verifyOriginal(view, undefined, parsePhase);
  assert(original, "Closeout requires the independently sealed original G6 chain");
  verifyReuseBindings(join(root, closeoutEvidence + "questionnaire-predecessor"));
  const sourceFiles = { ...original.sourceFiles };
  for (const [file, binding] of Object.entries(record.sourceFiles)) sourceFiles[file] = {
    before: Object.hasOwn(sourceFiles, file) ? sourceFiles[file].before : binding.before,
    after: binding.after,
    ...(Object.hasOwn(sourceFiles, file) ? {} : { beforeSnapshot: binding.beforeSnapshot }),
  };
  return { ...original, sourceFiles, closeoutSuccessor: record };
}
