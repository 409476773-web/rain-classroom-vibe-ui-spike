import assert from "node:assert/strict";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const directory = fileURLToPath(new URL(".", import.meta.url));
const read = path => JSON.parse(readFileSync(resolve(directory, path), "utf8"));
const hash = path => createHash("sha256").update(readFileSync(resolve(directory, path))).digest("hex");
const runs = ["run-02", "run-04-network", "run-05-focus", "run-06-matrix", "run-07-brush-final"];
const accepted = [], history = [];
const baseline = hash("run-02/source-before.json");
for (const run of runs) {
  const facts = read(`${run}/run-facts.json`), report = read(`${run}/results.json`);
  assert.deepEqual(facts.sourceChanges, []);
  assert.equal(hash(`${run}/source-before.json`), hash(`${run}/source-after.json`));
  if (run !== "run-07-brush-final") assert.equal(hash(`${run}/source-before.json`), baseline);
  assert.equal(hash(`${run}/spec-executed.ts`), facts.scripts.find(item => item.file === "themes.spec.ts").sha256);
  const entry = { run, stats: report.stats, sourceCount: facts.sourceCount, sourceChanges: [], sourceBeforeAfterJsonSha256: hash(`${run}/source-before.json`), specSha256: hash(`${run}/spec-executed.ts`), acceptedObservations: 0 }; history.push(entry);
  for (const folder of readdirSync(resolve(directory, run, "test-results"))) {
    let observed;
    try { observed = read(`${run}/test-results/${folder}/facts.json`); } catch { continue; }
    if (observed.status !== "passed") continue;
    if (observed.name.startsWith("Line legend and native Brush") && run !== "run-07-brush-final") continue;
    accepted.push({ key: `${observed.mode}: ${observed.name}`, name: observed.name, mode: observed.mode, run, facts: `${run}/test-results/${folder}/facts.json`, screenshot: `${run}/test-results/${folder}/final-state.png`, specSnapshot: `${run}/spec-executed.ts`, checks: observed.checks });
    entry.acceptedObservations++;
  }
}
assert.equal(accepted.length, 36);
assert.equal(new Set(accepted.map(item => item.key)).size, 36);
for (const mode of ["1440-dark", "1440-forced", "390-dark", "390-forced"]) assert.equal(accepted.filter(item => item.mode === mode).length, 9);
assert.equal(readFileSync(resolve(directory, "typecheck-07-final.log"), "utf8"), "");
const priorSources = read("run-02/source-before.json"), latestSources = read("run-07-brush-final/source-before.json"), latestBrushSources = new Map(read("brush-next/run-02/source-before.json").map(item => [item.path, item.sha256]));
assert.deepEqual(latestSources.filter(item => item.sha256 !== latestBrushSources.get(item.path)), []);
const priorByPath = new Map(priorSources.map(item => [item.path, item.sha256]));
const summary = {
  status: "GREEN within Chromium automated theme and keyboard scope",
  uniqueRepresentativePaths: 36,
  representatives: 9,
  projects: ["1440-dark", "1440-forced", "390-dark", "390-forced"],
  acceptedRuns: history.filter(entry => entry.acceptedObservations > 0),
  runHistory: history,
  affectedScopeUpdate: { retainedObservations: 32, replacedBrushObservations: 4, newBrushRun: "run-07-brush-final", beforeSummary: "summary-before-brush.json", parentAuthorization: "Retain the other 32 scoped observations and replace only four affected Brush theme paths after current dependency and adapter freeze; do not count 40" },
  sourceFreeze: { sourceCountPerThemeRun: 242, sourceChangesWithinEachRun: [], sameSourcesAcrossAllAcceptedRuns: false, priorSourceBeforeAfterJsonSha256: baseline, latestAffectedSourceBeforeAfterJsonSha256: hash("run-07-brush-final/source-before.json"), latestThemeSourcesMatchBrush12: true, changesBetweenPriorAndLatest: latestSources.filter(item => item.sha256 !== priorByPath.get(item.path)), styleSha256: "83e41f10f6e4bed4c50978f6e4de9a9c443e9cb0916f4237aadbb740e80cdd35", retentionBoundary: "32 retained observations retain their prior-source snapshots. This is approved affected-scope evidence, not a fresh full 36-path run on the latest source. Sunburst focus-prop changes and native/public type review are separately owned by the parent/root." },
  finalPrivateSpecSha256: hash("themes.spec.ts"),
  privateTypecheck: { command: "pnpm exec tsc --noEmit --project evidence/runtime/chart-closeout-2026-10-11/quality/themes/tsconfig.json", log: "typecheck-07-final.log", exitCode: 0 },
  retainedFailures: [
    { run: "run-01", count: 27, classification: "Harness: ignored top-level media configuration, icon SVG selection, intentional Heatmap SVG focus alternative, unsettled animation / pointer interference. Not runtime defects or valid forced-color evidence." },
    { run: "run-02", count: 6, classification: "Four mistaken universal solid 2px focus assertions, two narrow Network legend-icon geometry selections. Thirty passing observations retained." },
    { run: "run-03-network", count: 2, classification: "Harness incorrectly required a visible SVG where the existing narrow Network contract deliberately shows the full relationship list." },
    { run: "run-05-focus", count: 2, classification: "Harness incorrectly required Matrix's valid visible Token-colored 1px outline to equal CanvasText. Native Brush two passing observations retained." }
  ],
  focusContract: {
    foundationAndSharedChartControls: "Their existing forced-color solid 2px CanvasText outline, 2px offset and no shadow remain asserted; no blanket weakening.",
    nativeBrushInput: "Visible native auto 1px outline, valid rgba(5,0,73,.8), alpha > 0 and composite differs from actual Canvas, no shadow; ArrowRight changes selected window and reset restores it.",
    matrixScroll: "Visible solid 1px rgba(5,0,73,.8) outline, valid color differs from actual Canvas, no shadow; Control+End reveals course-12 / course-12 with exact reading, ArrowLeft changes column, Escape retains region focus. Active cell has visible solid 1px CanvasText outline.",
    heatmap: "Focusable outer region deliberately has no outline; actual native SVG focus rectangle has nonzero geometry and a 2px visible stroke, while keyboard missing/zero readings are asserted."
  },
  limits: [
    "Chromium at 1440x1000 and 390x844, explicit data-rain-theme=dark and forced-colors=active media; nine representative paths, not every variant or arbitrary data.",
    "Keyboard modality is established with a real Tab before focusing a specific representative target; targeted key actions then run in the browser. This is not a full sequential tab-order audit.",
    "Candle uses actual End+Enter on the native date select; automated Chromium success does not prove real Safari, VoiceOver or operating-system menu behavior.",
    "Computed text foreground/fill, opacity, background chains and visible geometry are recorded. No blanket gradient, translucent graph, all graphic contrast or WCAG conformance claim.",
    "Narrow Network deliberately hides its SVG and presents complete relationship text with keyboard node selection; hidden finite SVG geometry is recorded as hidden, not rendered visual evidence.",
    "Real Safari, VoiceOver and physical touch remain untested. Reduced motion is explicit except Live intentionally exercises ordinary-time pause/manual/replay.",
    "Accepted results use per-run executed spec snapshots and before/after source hashes. Thirty-two observations retain earlier sources; four affected Brush theme paths were replaced after the dependency and adapter fix. This is not a fresh 36-path run on one latest source hash.",
    "Latest four Brush theme paths have the same current chart/foundation source hashes as the three-engine Brush12 run. Browser contexts/processes closed after both current runs."
  ],
  accepted: accepted.map(({ checks, ...item }) => ({ ...item, focusSamples: checks.filter(check => check.focus || check.matrixActiveFocus || check.heatmapFocusRect), textSampleGroups: checks.filter(check => check.plainTextSamples).length, pageErrors: [] }))
};
writeFileSync(resolve(directory, "summary.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ status: summary.status, uniqueRepresentativePaths: 36, sourceCount: 242, sourceChanges: [], summarySha256: hash("summary.json"), finalSpecSha256: summary.finalPrivateSpecSha256 }));
