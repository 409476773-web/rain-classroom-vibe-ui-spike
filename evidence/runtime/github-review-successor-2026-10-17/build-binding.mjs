import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { closeoutProofFiles, githubReviewBindingSeal, githubReviewModuleSeal, githubReviewBindingsPath, githubReviewEvidence, githubReviewPhase, githubReviewSourcePaths } from "../../../scripts/github-review-successor.mjs";
import { recordedPaintProperty } from "../../../scripts/verify-token-foundations.mjs";
import { parseTopLevelCssBlocks } from "../../../scripts/verify-tailwind-b2.mjs";
const original = process.argv[2];
if (!original) throw new Error("Pass the intact frozen source root; this build step is not part of verification");
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const oldBindingPath = "evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/source-bindings.json";
const oldRecord = JSON.parse(readFileSync(join(original, oldBindingPath), "utf8"));
const predecessorFiles = {};
for (const file of closeoutProofFiles(oldRecord)) {
  const input = readFileSync(join(original, file));
  predecessorFiles[file] = sha(input);
  const destination = githubReviewEvidence + "predecessor/" + file;
  mkdirSync(dirname(destination), { recursive: true });
  if (!existsSync(destination)) copyFileSync(join(original, file), destination);
  if (sha(readFileSync(destination)) !== predecessorFiles[file]) throw new Error("Existing predecessor snapshot differs: " + file);
}
const sourceFiles = {};
for (const file of githubReviewSourcePaths) {
  const previous = join(original, file), before = existsSync(previous) ? sha(readFileSync(previous)) : null;
  const beforeSnapshot = before === null ? null : githubReviewEvidence + "before/" + file;
  if (beforeSnapshot) {
    mkdirSync(dirname(beforeSnapshot), { recursive: true });
    if (!existsSync(beforeSnapshot)) copyFileSync(previous, beforeSnapshot);
    if (sha(readFileSync(beforeSnapshot)) !== before) throw new Error("Existing before snapshot differs: " + file);
  }
  sourceFiles[file] = { before, after: sha(readFileSync(file)), beforeSnapshot };
}
let module = readFileSync("scripts/github-review-successor.mjs", "utf8");
module = module.replace(/const moduleSeal = "[^"]*";/, `const moduleSeal = "${githubReviewModuleSeal(module)}";`);
const file = "apps/prototype/src/scenarios/resource-update/page.css", source = readFileSync(file, "utf8");
const entry = { filePath: file, sha256: sha(source), kind: "finite-css-paints", inventory: [], status: "runtime-unproved", acceptedException: false, measurementScope: "exact authored declarations only; no current DOM, content role, parent, state, contrast or eligibility acceptance" };
const counts = new Map(), failures = [];
const walk = (css, frames = []) => {
  for (const { header, body } of parseTopLevelCssBlocks(css, "Current exact P5 authored paint observations", failures)) {
    if (header.startsWith("@") && body.includes("{")) { walk(body, [...frames, header]); continue; }
    for (const line of body.split(";")) {
      const colon = line.indexOf(":"), property = line.slice(0, colon).trim(), value = line.slice(colon + 1).trim();
      if (colon < 0 || !property.startsWith("--") && !recordedPaintProperty.test(property)) continue;
      if (property.startsWith("--") && !/(?:--rain-category-|--rain-local-|--report-class-|#|rgb|hsl|oklch|color\()/i.test(value)) continue;
      const key = JSON.stringify([frames, header, property]), occurrence = (counts.get(key) ?? 0) + 1;
      counts.set(key, occurrence); entry.inventory.push({ frames, selector: header, property, value, occurrence });
    }
  }
};
walk(source);
if (failures.length) throw new Error(failures.join("\n"));
const paintObservations = { localSources: [entry], inlineSources: [] };
const record = { kind: "GithubReviewFiniteSuccessor", authorization: githubReviewPhase, sourceFiles, predecessorFiles, paintObservations };
module = module.replace(/const bindingSeal = "[^"]*";/, `const bindingSeal = "${githubReviewBindingSeal(record)}";`);
writeFileSync("scripts/github-review-successor.mjs", module);
record.sourceFiles["scripts/github-review-successor.mjs"].after = sha(module);
writeFileSync(githubReviewBindingsPath, JSON.stringify(record, null, 2) + "\n");
console.log(JSON.stringify({ bindingSeal: githubReviewBindingSeal(record), sourceFiles: Object.keys(sourceFiles).length, predecessorFiles: Object.keys(predecessorFiles).length }));
