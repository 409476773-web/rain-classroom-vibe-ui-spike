import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getM2ColorConsumers, getTokenFirstV12ColorConsumers, validateRegisteredRecipeColors } from "../../../../../../scripts/verify-token-foundations.mjs";
import { getTokenFoundationOutputs } from "../../../../../../scripts/token-foundation-outputs.mjs";

// Read-only mini-probe of the existing verifier, not a new colour policy or pass exemption.
const root = process.cwd(), directory = "evidence/runtime/navigation-v042/w7/closure-2026-10-06/governance-other";
const read = path => readFileSync(join(root, path), "utf8");
const sha = path => createHash("sha256").update(read(path)).digest("hex");
const prior = JSON.parse(read("evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/governance-attribution.json"));
const outputs = getTokenFoundationOutputs();
outputs.colorCssConsumers.push(...getM2ColorConsumers(root), ...getTokenFirstV12ColorConsumers(root));
const tracked = ["status/current-phase.yaml", "scripts/verify-token-foundations.mjs", "scripts/token-foundation-outputs.mjs",
  ...Object.entries(prior.failureOwners).filter(([owner]) => owner !== "navigation-18").flatMap(([, value]) => value.sourceFiles),
  "evidence/runtime/learning-report-a/color-consumers.json", "evidence/runtime/token-first-v12-g1/color-consumers.json",
  "evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-05/g1-current-color-consumers.json"];
const before = Object.fromEntries(tracked.map(path => [path, sha(path)]));
const cases = {}, negativeChecks = [];
const logLines = read("evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/governance-final.log").split("\n");
for (const owner of ["Report-A", "G1", "Tree"]) {
  const filePath = prior.failureOwners[owner].sourceFiles[0], source = read(filePath);
  const failures = validateRegisteredRecipeColors({ filePath, source, outputs, root });
  assert.equal(failures.length, prior.failureOwners[owner].diagnosticLines, `${owner} current diagnostic count`);
  const rows = prior.failureOwners[owner].logLines.split(",").flatMap(span => {
    const [start, end = start] = span.split("-").map(Number);
    return Array.from({ length: end - start + 1 }, (_, index) => logLines[start + index - 1]);
  });
  assert.deepEqual([...failures].sort(), [...rows].sort(), `${owner} current findings must retain the original exact messages`);
  const consumerRows = outputs.colorCssConsumers.filter(row => row.filePath === filePath);
  cases[owner] = { filePath, sha256: sha(filePath), registeredPaintRows: consumerRows.length, failureCount: failures.length, failures };
  const changed = validateRegisteredRecipeColors({ filePath, source: `${source}\n.probe-unregistered { color: var(--rain-category-text-neutral-1); }`, outputs, root });
  assert(changed.some(row => row.includes("Unregistered Category CSS paint") && row.includes(".probe-unregistered")), `${owner}: unregistered paint remains rejected`);
  negativeChecks.push({ owner, changedOnlyInMemory: true, kind: "new-unregistered-Category-paint", rejected: true });
}
const missingMetadata = Object.entries(prior.failureOwners).filter(([owner]) => !["navigation-18", "Report-A", "G1", "Tree"].includes(owner));
cases.missingMetadata = missingMetadata.map(([owner, { sourceFiles }]) => ({ owner, sources: sourceFiles.map(filePath => {
  assert(!outputs.colorCssConsumers.some(row => row.filePath === filePath) && !outputs.colorRecipeConsumers.some(row => row.filePath === filePath), `${filePath}: no consumer entry exists`);
  assert(/\b(?:bg|text|border|outline|ring)-rain-(?:category|local)-|--rain-(?:category|local)-[a-z0-9]/.test(read(filePath)), `${filePath}: source still consumes Category colour`);
  return { filePath, sha256: sha(filePath), registered: false };
}) }));
assert.equal(cases.missingMetadata.flatMap(row => row.sources).length, 21);
const treeExpander = outputs.colorCssConsumers.find(row => row.filePath === cases.Tree.filePath && row.selector === ".rain-tree-expander, .rain-tree-drag-handle");
assert.equal(treeExpander.use.content, "meaningful-icon");
assert.equal(treeExpander.use.interaction, "interactive");
assert.equal(treeExpander.use.critical, true);
const g1Icon = outputs.colorCssConsumers.find(row => row.filePath === cases.G1.filePath && row.selector === ".rain-g1-accordion-trigger-icon, .rain-g1-collapsible-trigger-icon");
assert.equal(g1Icon.use.content, "meaningful-icon");
assert.equal(g1Icon.use.interaction, "interactive");
assert.equal(g1Icon.use.critical, true);
const g1Source = read(cases.G1.filePath);
assert(g1Source.includes('.g1-card-grid .g1-support { display: block; font-size: var(--rain-font-size-12); line-height: var(--rain-line-height-20); color: var(--rain-category-text-second-4); }'));
assert(g1Source.includes('.g1[data-rain-theme="dark"] .g1-card-grid .g1-support { color: var(--rain-category-text-second-3); }'));
const unavailableThemePairs = cases.G1.failures.filter(row => row.startsWith('.g1-card-grid .g1-support color dark ')
  || row.startsWith('.g1[data-rain-theme="dark"] .g1-card-grid .g1-support color light '));
assert.equal(unavailableThemePairs.length, 5, "the existing scanner evaluates three overridden dark paints and two dark-only selectors in light mode");
const reportRendered = JSON.parse(read("evidence/runtime/learning-report-a/v2-feedback/contrast.json"));
const reportScope = reportRendered.find(row => row.selector === ".report-a-scope");
assert.equal(reportScope.minimum, 4.5);
assert.equal(reportScope.ratio, 1.9250264166550397);
assert(read(cases["Report-A"].filePath).includes('background: color-mix(in srgb, var(--rain-category-fill-taglive-solid-1) 4%, var(--rain-category-background-neutral-4));'));
const semanticObservations = {
  G1: { unavailableThemePairs, reason: "Dark root has a later, more specific override; a dark-only selector does not match a light root. These five static rows are conservative combinations, not current rendered measurements. Other states and actual parent backgrounds remain to be proved." },
  ReportA: { latestRecordedRenderedScope: reportScope, reason: "The registered old scope paint assumes white/Neutral3, while the accepted V2 workspace uses the explicitly authored 4% colour mix. Four old ratios cannot stand in for current V2 rendered contrast." },
  Tree: { expander: treeExpander.use, reason: "Interactive meaningful icon remains subject to 3:1 and weak-Neutral eligibility; navigation human review cannot extend to this independent shared component." },
};
const after = Object.fromEntries(tracked.map(path => [path, sha(path)]));
assert.deepEqual(after, before, "source, phase, verifier and historical ledgers must remain unchanged by this probe");
const result = { status: "read-only-mini-probe-passed-findings-retained", date: "2026-10-06", counts: { existingNonNavigationDiagnostics: 192, liveRegisteredOwnerDiagnostics: 171, liveUnregisteredOwnerFiles: 21, negativeChecks: 3 }, cases, semanticObservations, negativeChecks, preservedSha256: after, automaticColourConformance: "not-proved", acceptedUiChanged: false };
writeFileSync(join(root, directory, "probe-result.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ status: result.status, counts: result.counts, sourcesPreserved: true }));
