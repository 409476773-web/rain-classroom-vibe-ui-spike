import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const run = "evidence/runtime/component-implementation-2026-10-18/run-01";
const expected = JSON.parse(readFileSync(`${run}/baseline/historical-evidence.sha256.json`, "utf8"));
const failures = [];
for (const [file, hash] of Object.entries(expected)) {
  try {
    if (createHash("sha256").update(readFileSync(file)).digest("hex") !== hash) failures.push(`changed: ${file}`);
  } catch { failures.push(`missing: ${file}`); }
}
function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = join(directory, entry.name);
    if (file === "evidence/runtime/component-implementation-2026-10-18") return [];
    return entry.isDirectory() ? walk(file) : [file];
  });
}
const addedOutsideRun = walk("evidence").filter(file => !Object.hasOwn(expected, file));
console.log(JSON.stringify({ checkedHistoricalFiles: Object.keys(expected).length, failures, addedOutsideRun }, null, 2));
assert.equal(failures.length, 0, "Historical evidence changed");
assert.equal(addedOutsideRun.length, 0, "New evidence was written outside this batch");
