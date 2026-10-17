import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildReuseBindings, normalizedModuleHash, reuseBindingsPath, reuseColorReport, reuseEvidence, reuseModule, sha256,
  sourceBindingSeal, verifyReuseBindings } from "./questionnaire-reuse-governance.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
if (args.some(arg => !["--seal", "--write"].includes(arg))) throw new Error("Usage: node scripts/verify-questionnaire-control-reuse.mjs [--seal] [--write]");
if (args.includes("--seal")) {
  const record = buildReuseBindings(root);
  const file = path.join(root, reuseModule);
  let source = readFileSync(file, "utf8");
  source = source.replace(/export const bindingSeal = "[^"]+";/, `export const bindingSeal = "${sourceBindingSeal(record)}";`)
    .replace(/export const moduleSeal = "[^"]+";/, `export const moduleSeal = "${normalizedModuleHash(source)}";`);
  writeFileSync(file, source);
  record.sourceFiles[reuseModule].after = sha256(source);
  writeFileSync(path.join(root, reuseBindingsPath), `${JSON.stringify(record, null, 2)}\n`);
  console.log("Questionnaire reuse source bindings sealed; run without --seal to verify independently.");
} else {
  const record = verifyReuseBindings(root);
  const sourceBindingsSha256 = sha256(readFileSync(path.join(root, reuseBindingsPath)));
  const result = { scope: record.scope, result: "passed-scoped", boundSources: Object.keys(record.sourceFiles).length,
    sourceBindingsSha256,
    baseline: record.predecessor.status, historicalFailedTests: record.predecessor.failedTests,
    humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "unpublished" };
  if (args.includes("--write")) {
    writeFileSync(path.join(root, reuseEvidence, "source-verification.json"), `${JSON.stringify(result, null, 2)}\n`);
    writeFileSync(path.join(root, reuseEvidence, "color-verification.json"), `${JSON.stringify({ ...reuseColorReport(), sourceBindingsSha256 }, null, 2)}\n`);
  }
  console.log(JSON.stringify(result, null, 2));
}
