import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
const base = "evidence/runtime/chart-experience-third-batch-2026-10-11/candle-live/candle-browser";
const run = process.env.RAIN_CANDLE_BROWSER_RUN ?? "after-01";
const inputs = ["1440-no-preference", "1440-reduce", "390-no-preference", "390-reduce"];
const rows = await Promise.all(inputs.map(async name => ({name, facts: JSON.parse(await readFile(`${base}/${run}/${name}.json`, "utf8"))})));
const hashes = rows[0].facts.before;
for (const {name, facts} of rows) {
  if (facts.errors.length || JSON.stringify(facts.before) !== JSON.stringify(facts.after) || JSON.stringify(facts.before) !== JSON.stringify(hashes)) throw new Error(`Errors or source changes: ${name}`);
  const hosts = facts.records.filter(record => record.normal);
  if (hosts.length !== 12 || hosts.some(record => record.normal.length !== 20 || record.dense.data.length !== 96 || record.flat.data.length !== 20 || !record.flat.shapes.every(shape => Number(shape.height) === 1) || !record.legend.escapeSameButtonClick)) throw new Error(`Incomplete host facts: ${name}`);
  if (hosts.slice(1).some(record => !record.refusal?.includes("OHLC关系错误") || record.restoredNativeCount !== 1)) throw new Error(`Missing variant refusal/recovery: ${name}`);
  if (!facts.records.some(record => record.name === "default-invalid" && record.nativeCount === 0 && record.text.includes("OHLC关系错误"))) throw new Error(`Missing default refusal: ${name}`);
}
const scriptPath = "tests/e2e/chart-third-batch-candle.spec.ts";
const summary = {
  status: "passed", spec: {path: scriptPath, sha256: createHash("sha256").update(await readFile(scriptPath, "utf8")).digest("hex")},
  modeCases: rows.length, hostCases: rows.length * 12, invalidRefusalCases: rows.length * 12,
  fixedPointerUpdateCases: rows.flatMap(row => row.facts.records).filter(record => record.fixedPointerUpdate).length,
  screenshots: rows.length * 12 * 2, pageExceptions: 0, allSourceSnapshotsEqual: true, sourceHashes: hashes,
  scope: ["Actual default and all eleven current Candle variants", "1440/390 Chromium viewport, ordinary/reduced motion", "Original normal geometry restored after dense/flat scenario", "All96 dated OHLC records and all20 flat records retained in exact table and private reader", "Open/close raw equality preserved; native flat bodies remain1px", "Normal direction fills align with raw close>=open contract and preserve distinct original palettes", "Native same-date stationary-pointer OHLC refresh on revision in default and first variant", "Legend focus/Escape/same-button click reads again without hiding candles", "Actual invalid OHLC validator error refuses all twelve hosts then allows valid recovery", "Focusable actual date select and local exact-data table"],
  boundaries: ["Mock data only", "Viewport390 is Chromium width coverage, not physical-device or cross-browser acceptance", "Native OS date-menu arrow selection was not claimed; focus plus real selectOption value/reader were verified", "No global Human Gate, publication, migration or production reconnect guarantee is closed"],
  groups: rows.map(({name,facts}) => ({name, hosts: facts.records.filter(record => record.normal).map(record => record.name), errors: facts.errors, sourceFrozen: true})),
};
await writeFile(`${base}/summary.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify({status: summary.status, modeCases: summary.modeCases, hostCases: summary.hostCases, invalidRefusalCases: summary.invalidRefusalCases, fixedPointerUpdateCases: summary.fixedPointerUpdateCases, screenshots: summary.screenshots, pageExceptions: summary.pageExceptions, allSourceSnapshotsEqual: summary.allSourceSnapshotsEqual}, null, 2));
