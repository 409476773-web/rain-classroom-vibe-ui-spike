import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getNavigationColorConsumerRegistration, projectNavigationAccountHoverSource } from "../../../../../../scripts/verify-token-foundations.mjs";
import { parseYamlSubset } from "../../../../../../scripts/verification-helpers.mjs";

const root = process.cwd(), directory = "evidence/runtime/navigation-v042/w7/closure-2026-10-06/governance-other";
const read = path => readFileSync(join(root, path), "utf8");
const hash = value => createHash("sha256").update(value).digest("hex");
const sha = path => hash(read(path));
const json = path => JSON.parse(read(path));
const currentPath = "evidence/runtime/navigation-v042/w7/closure-2026-10-06/current-source.json";
const current = json(currentPath), baseline = json(current.baseline);
assert.equal(sha(current.baseline), current.baselineSHA);
assert.deepEqual(Object.keys(current.filesSha256).sort(), Object.keys(baseline.filesSha256).sort());
assert.equal(Object.keys(current.filesSha256).length, 97);
for (const [path, expected] of Object.entries(current.filesSha256)) assert.equal(sha(path), expected, path);
const differences = Object.entries(current.filesSha256).filter(([path, value]) => baseline.filesSha256[path] !== value).map(([path]) => path).sort();
assert.deepEqual(differences, current.diffFromAcceptedFreeze.map(row => row.path).sort());
assert.deepEqual(differences, ["apps/playground/src/recipes/navigation-v042/r2.css", "docs/ai/navigation-v042-w6.md", "docs/ai/skills/rain-navigation-composition/SKILL.md", "manifests/recipes/navigation-r2.yaml", "registry/navigation-v042.json"].sort());
const path = "apps/playground/src/recipes/navigation-v042/r2.css", source = read(path);
const projected = projectNavigationAccountHoverSource(path, source);
assert.equal(hash(projected), baseline.filesSha256[path]);
assert.equal(hash(source), current.filesSha256[path]);
const line = '.rain-workspace.nv42-r2 .rain-workspace__region[data-region-id="global"] .nv42-account:enabled:not([aria-disabled="true"]):hover,\n';
assert.equal(source, projected.replace(".nv42-history:hover {", line + ".nv42-history:hover {"));
const negatives = [
  ["extra-raw-paint", source + "\n.unreviewed { color: #fff; }"],
  ["extra-Category-paint", source + "\n.unreviewed { color: var(--rain-category-text-neutral-1); }"],
  ["changed-region", source.replace(line, line.replace('"global"', '"context"'))],
  ["enables-disabled-account", source.replace(":enabled:not([aria-disabled=\"true\"]):hover", ":hover")],
  ["duplicate-selector", source + line],
  ["different-token", source.replaceAll("--rain-category-fill-neutral-alpha-6", "--rain-category-fill-neutral-alpha-5")],
  ["other-geometry", source + "\n.nv42-rail { width: 209px; }"],
];
for (const [name, changed] of negatives) assert.throws(() => projectNavigationAccountHoverSource(path, changed), undefined, name);
assert.equal(projectNavigationAccountHoverSource("outside.css", source), source);
const registration = getNavigationColorConsumerRegistration(root);
assert.deepEqual(registration.sourceFreezeBinding, { baselineMatched: 17, currentExact: 16, unlisted: ["apps/playground/src/recipes/navigation-v042/samples.css"], evidence: "evidence/runtime/navigation-v042/w6/review-02/final-source.json", unlistedScope: "Separate earlier G1 gallery scope; not review02 runtime scope" });
assert.equal(registration.automatedConformance, "unproved");
assert.equal(registration.pendingPaints, 810);
assert.equal(registration.totalPendingPaintUses, 811);
assert.equal(registration.sourceSuccessors.length, 1);
assert.equal(registration.sourceSuccessors[0].status, "pending-parent-and-state-evidence");
assert.equal(registration.sourceSuccessors[0].humanReview, "not-inherited-from-baseline");
assert.equal(registration.registeredSourcePaths.length, 18);
const verifier = read("scripts/verify-token-foundations.mjs");
assert(verifier.includes('else if (categorySource.test(source)) failures.push(navigationConsumerRegistration?.registeredSourcePaths.includes(filePath)'));
assert(verifier.includes('`Navigation registered colors require parent/role/state conformance evidence: ${filePath}`'));
assert(verifier.includes('if (result.failures.length) { console.error(result.failures.join("\\n")); process.exitCode = 1; }'));
const manifest = parseYamlSubset(read("manifests/recipes/navigation-r2.yaml"));
assert.equal(manifest.currentFeedbackSourceSnapshot.styleSourceSha256, hash(source));
assert.equal(manifest.currentW7Repair.previousSourceSha256, hash(projected));
assert.equal(manifest.currentW7Repair.humanGate, "not-inherited-for-successor");
const registry = json("registry/navigation-v042.json");
assert.equal(registry.currentSourceSnapshot.filesSha256[path], hash(source));
assert.equal(registry.priorW7AccountHoverSourceSnapshot.filesSha256[path], hash(projected));
assert.equal(registry.currentW7Repair.humanGate, "not-inherited-for-successor");
assert.equal(registry.publication, "not-published");
assert.equal(registry.currentW7Repair.publication, "unpublished");
const acceptedRoot = "artifacts/navigation-v042-2026-10-05-review-02/";
const oldRegistry = json(acceptedRoot + "registry/navigation-v042.json");
assert.equal(sha(acceptedRoot + "registry/navigation-v042.json"), baseline.filesSha256["registry/navigation-v042.json"]);
for (const [key, value] of Object.entries(oldRegistry)) if (key !== "currentSourceSnapshot") assert.deepEqual(registry[key], value, `Registry historical lineage: ${key}`);
assert.equal(registry.currentW7Repair.sha256, hash(source));
const result = { status: "independent-successor-source-review-passed", date: "2026-10-06", currentSourcesVerified: 97, acceptedFreezeDifferences: differences, exactAccountSelectorOnly: true, counterexamplesRejected: negatives.map(([name]) => name), metadataBinding: registration.sourceFreezeBinding, baselinePendingPaints: 810, currentTotalPendingPaintUses: 811, pendingDiagnosticRemainsExitFailure: "verified by existing failures.push branch and CLI exitCode1 branch; full Token gate was not rerun by this probe", humanReviewInheritedForSuccessor: false, registryBaselineLineageUnchanged: true, sourceSha256: hash(source), verifierSha256: sha("scripts/verify-token-foundations.mjs"), testSha256: sha("scripts/verification-helpers.test.ts"), currentSourceRecordSha256: sha(currentPath), automaticConformance: "unproved" };
writeFileSync(join(root, directory, "successor-review-result.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ status: result.status, sources: 97, differences: differences.length, negativeChecks: negatives.length, currentExact: 16, baselineMatched: 17, pending: 811 }));
