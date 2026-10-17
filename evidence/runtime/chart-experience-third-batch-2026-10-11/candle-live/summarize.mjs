import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const base = "evidence/runtime/chart-experience-third-batch-2026-10-11/candle-live";
const json = async path => JSON.parse(await readFile(path, "utf8"));
const hash = async path => createHash("sha256").update(await readFile(path, "utf8")).digest("hex");
const candle = await json(`${base}/candle-browser/summary.json`);
const live = await json(`${base}/live-browser/summary.json`);
const normal = await json(`${base}/normal-source-preservation.json`);
const unit = await readFile(`${base}/targets-green-06.log`, "utf8");
const liveSpec = "tests/e2e/chart-third-batch-live.spec.ts";
if (candle.status !== "passed" || candle.hostCases !== 48 || candle.pageExceptions !== 0 || !candle.allSourceSnapshotsEqual) throw new Error("Candle scope incomplete");
if (live.allHostObservations !== 40 || live.currentDeepHostObservations !== 4 || live.resourceDisposals !== 4 || live.pageErrors.length || live.sourceChanges.length) throw new Error("Live scope incomplete");
if (live.typecheck.exitCode !== 0 || live.typecheck.checkedSpecSha256 !== await hash(liveSpec)) throw new Error("Final Live spec types not verified");
if (!/Test Files\s+3 passed \(3\)/.test(unit) || !/Tests\s+17 passed \(17\)/.test(unit)) throw new Error("Current owned unit results missing");
if (!normal.results.every(result => result.bytesEqual)) throw new Error("Normal Mock declarations changed");
const liveSources = await json(`${base}/live-browser/run-03-affected/source-after.json`);
const sources = new Map();
for (const item of [...candle.sourceHashes, ...liveSources]) {
  if (sources.has(item.path) && sources.get(item.path) !== item.sha256) throw new Error(`Mixed source versions: ${item.path}`);
  sources.set(item.path, item.sha256);
}
const sourceHashes = [];
for (const [path, sha256] of sources) {
  if (await hash(path) !== sha256) throw new Error(`Source changed after browsers: ${path}`);
  sourceHashes.push({path, sha256});
}
const history = [
  {kind: "real regression", logs: ["special-red-01.log", "special-red-02.log"], result: "Dense96/flat/raw reader/invalid refusal were absent before owned Candle patch"},
  {kind: "real regression", logs: ["candle-tooltip-red-01.log"], result: "Fixed date/x/index retained old open12/close17 after current data became open16/close8; root shared hook fixed"},
  {kind: "real regression", logs: ["default-live-red-02.log"], result: "Snapshot2 restored as60 before root default Live patch; other two initial geometry/clock failures were harness-only"},
  {kind: "real regression", logs: ["variant-plot-red-01.log"], result: "No plot-only observer while expanded table kept card active; owned Live local plot IO fixed"},
  {kind: "harness limitation, preserved", logs: ["default-live-red-01.log", "default-live-baseline-red-03.log", "special-green-01.log", "targets-green-02.log", "targets-green-03.log"], result: "Missing size/RAF setup, alias load before tests, or Motion global dispatcher mistaken for owned producer; corrected without runtime widening"},
  {kind: "harness limitation, preserved", logs: ["normal-source-harness-01.log"], result: "Installed TypeScript7 package has no AST runtime API; direct actual declaration byte comparison uses no new dependency"},
  {kind: "harness limitation, preserved", logs: ["live-browser/run-01.log", "live-browser/test-types-01.log", "live-browser/test-types-02.log"], result: "JSON import entry failure before browser and test-only type annotations; no production failure"},
  {kind: "harness limitation, preserved", logs: ["live-browser/run-02/disposal-audit-limitation.json"], result: "Whole-document navigation rebuilt resource probe; old48 zero counts and historical8 deep observations excluded from SPA claims; same-document proof rerun in4 independent paths"},
];
const summary = {
  status: "passed within approved Mock scope", ownedRuntime: sourceHashes.find(item => item.path.endsWith("/chart-variants/special.tsx")),
  units: {files: 3, tests: 17, log: `${base}/targets-green-06.log`, includesNoIntersectionObserverDegradation: true},
  candle: {currentTests: 4, hostObservations: 48, invalidRefusals: 48, fixedPointerRefreshes: 8, screenshots: 96, summary: `${base}/candle-browser/summary.json`, summarySha256: await hash(`${base}/candle-browser/summary.json`)},
  live: {currentTests: 8, retainedSmokeTests: 4, retainedHostObservations: 40, retainedSource: "live-browser/run-02", sameDocumentDeepTests: 4, independentDeepPaths: "1440/390 × default/live-line-default; ordinary production then reduced transition", deepSource: "live-browser/run-03-affected", currentSpaDisposals: 4, currentScreenshots: 88, summary: `${base}/live-browser/summary.json`, summarySha256: await hash(`${base}/live-browser/summary.json`), finalTypes: live.typecheck},
  normalMockDeclarations: normal.results, pageExceptions: 0, sourceFiles: sourceHashes.length, sourceChangesSinceBrowserFreeze: [], sourceHashes,
  testsAndScripts: await Promise.all(["apps/playground/src/docs/components/chart-variants/special.test.tsx", "apps/playground/src/docs/components/chart-live-lifecycle.test.tsx", "packages/ui/src/charts/candlestick-reading.test.tsx", "tests/e2e/chart-third-batch-candle.spec.ts", liveSpec, `${base}/verify-normal-source.mjs`, `${base}/candle-browser/summarize.mjs`].map(async path => ({path, sha256: await hash(path)}))),
  history,
  boundaries: ["Current Mock examples only; no real data source or reconnect/production API was introduced", "Chromium1440/390 and emulated reduced motion, not physical device/Safari/VoiceOver acceptance", "Background is document.hidden/visibilitychange simulation;65s pause uses Playwright virtual clock", "Native date-menu arrow commit is not verified; actual focus/selectOption/date identity/exact raw readings are", "Only owned Live mock producer/native clock/host IO/visibility listeners are counted; Motion global dispatcher excluded", "Browser Live never reached120points; bounded120 coverage comes from existing owned unit tests", "Global device/Human Gates, first-batch/map/Radar acceptance, publication and migration remain separate"],
};
await writeFile(`${base}/verification-summary.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify({status: summary.status, units: 17, candleHostObservations: 48, liveHostSmoke: 40, liveIndependentSpaPaths: 4, sourceFiles: summary.sourceFiles, sourceChanges: [], pageExceptions: 0}, null, 2));
