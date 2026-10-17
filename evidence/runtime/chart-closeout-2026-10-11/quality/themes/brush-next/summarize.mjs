import assert from "node:assert/strict";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
const directory = fileURLToPath(new URL(".", import.meta.url));
const read = path => JSON.parse(readFileSync(resolve(directory, path), "utf8"));
const hash = path => createHash("sha256").update(readFileSync(resolve(directory, path))).digest("hex");
const current = read("run-02/run-facts.json"), report = read("run-02/results.json"), dependencies = read("run-02/dependencies-before.json");
assert.equal(current.status, "passed"); assert.deepEqual(current.sourceChanges, []); assert.equal(current.dependenciesUnchanged, true); assert.equal(report.stats.expected, 12); assert.equal(report.stats.unexpected, 0);
assert.equal(hash("run-02/source-before.json"), hash("run-02/source-after.json")); assert.equal(hash("run-02/dependencies-before.json"), hash("run-02/dependencies-after.json"));
assert.equal(hash("brush.spec.ts"), hash("run-02/spec-executed.ts")); assert.equal(hash("run-01/spec-executed.ts"), hash("run-02/spec-executed.ts"));
assert.equal(readFileSync(resolve(directory, "typecheck-final.log"), "utf8"), "");
const cases = [];
for (const folder of readdirSync(resolve(directory, "run-02/test-results"))) {
  let observed; try { observed = read(`run-02/test-results/${folder}/facts.json`); } catch { continue; }
  assert.equal(observed.status, "passed"); assert.deepEqual(observed.errors, []);
  const module = observed.checks.find(check => check.servedBrushModule).servedBrushModule;
  assert.ok(module.moduleMarkers.some(marker => marker.startsWith("@visx+brush@4.0.1-alpha.0")));
  const before = observed.checks.find(check => check.action === "interior keyboard window before pan"), after = observed.checks.find(check => check.action === "real pointer selection pan");
  const captured = observed.checks.filter(check => check.source === "continuous pointer time range; displayed rows are its inclusive date subset").at(-1)?.capturedBrush;
  cases.push({ name: observed.name, project: observed.project, facts: `run-02/test-results/${folder}/facts.json`, screenshot: `run-02/test-results/${folder}/final-state.png`, fullCardScreenshot: `run-02/test-results/${folder}/${before ? "pointer" : "keyboard"}-reset-card.png`, servedModule: module, actions: observed.checks.filter(check => check.action).map(({ action, from, to, rows, extent }) => ({ action, from, to, rows, nativeX0: extent.x, nativeX1: extent.x + extent.width, nativeWidth: extent.width })), nativeRetained: observed.checks.some(check => check.nativeRetained === true), pan: before ? { beforeWidth: before.extent.width, afterWidth: after.extent.width, widthDriftPixels: after.extent.width - before.extent.width, savedIso: captured, durationDeltaMilliseconds: new Date(captured[1]).getTime() - new Date(captured[0]).getTime() - 15 * 86400000 } : null });
}
assert.equal(cases.length, 12); assert.equal(new Set(cases.map(item => `${item.project}:${item.name}`)).size, 12);
const previousSource = read("run-01/source-before.json"), currentSource = read("run-02/source-before.json");
const previousByPath = new Map(previousSource.map(item => [item.path, item.sha256]));
const sourceDifferencesFromRed = currentSource.filter(item => item.sha256 !== previousByPath.get(item.path));
const result = {
  status: "GREEN within current Brush caller and automated three-engine scope",
  tests: 12, engines: ["chromium", "firefox", "webkit"], widths: [1440, 390], activeCaller: "line-trio-brush",
  currentRun: "run-02", stats: report.stats,
  retainedRed: { run: "run-01", stats: read("run-01/results.json").stats, classification: "Six real controlled selection-pan width expansions; not a harness defect", diagnostic: "pan-domain-diagnostic.json", oldBrush3BrowserRun: false, attribution: "Cached Brush3 and installed Brush4 source have the same SAFE_PIXEL callback padding; old-version browser execution was not performed" },
  sourceFreeze: { sourceCount: current.sourceCount, sourceChanges: [], sourceBeforeAfterJsonSha256: hash("run-02/source-before.json"), differencesFromRedRun: sourceDifferencesFromRed },
  dependencyFreeze: { dependenciesUnchanged: true, identityBeforeAfterJsonSha256: hash("run-02/dependencies-before.json"), brush: { version: dependencies.brush.version, manifestSha256: dependencies.brush.manifestSha256, peers: dependencies.brush.peerDependencies }, react: { version: dependencies.react.version, manifestSha256: dependencies.react.manifestSha256 }, lockSha256: dependencies.lockSha256, installedBrushFiles: dependencies.brushInstalledFiles.length, actualServedModuleSha256: [...new Set(cases.map(item => item.servedModule.sha256))], boundary: "Existing workspace installation; independent clean installation is separate" },
  spec: { sha256: hash("brush.spec.ts"), identicalStrictAssertionsInRedAndGreenRuns: true, executedSnapshot: "run-02/spec-executed.ts" },
  privateTypecheck: { exitCode: 0, log: "typecheck-final.log" },
  limits: ["Two tests per engine/width cover actual keyboard endpoints, multi-move pointer previews/commit, selection pan and reset/captured data", "Actual Line Brush caller only; Area temporary Segment selection and Composed are not claimed as Brush callers", "Light theme and reduced motion; separate four theme checks replace the earlier Brush observations", "Playwright WebKit is not real Safari; VoiceOver and physical touch untested", "All browser contexts/processes closed after run-02; no runtime or public test file written by this private evidence task"],
  cases
};
writeFileSync(resolve(directory, "summary.json"), JSON.stringify(result, null, 2));
console.log(JSON.stringify({ status: result.status, tests: 12, sourceCount: current.sourceCount, sourceChanges: [], dependenciesUnchanged: true, maxAbsolutePanWidthDriftPixels: Math.max(...cases.filter(item => item.pan).map(item => Math.abs(item.pan.widthDriftPixels))), summarySha256: hash("summary.json"), specSha256: hash("brush.spec.ts") }));
