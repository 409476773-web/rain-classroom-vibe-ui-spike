import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { hasGenerationQualityAuthorization, parseYamlSubset } from "../../../scripts/verification-helpers.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const read = path => readFileSync(`${root}${path}`, "utf8");
const phase = parseYamlSubset(read("status/current-phase.yaml"));
assert(hasGenerationQualityAuthorization(phase));
for (const mutation of [
  pilot => { pilot.scope = "all-public-components"; },
  pilot => { pilot.humanGate = "accepted"; },
  pilot => { pilot.independentReview = "passed"; },
]) {
  const invalid = structuredClone(phase);
  mutation(invalid.componentRefinements.generationQuality.listCompositionPilot);
  assert.equal(hasGenerationQualityAuthorization(invalid), false);
}
const before = JSON.parse(read("evidence/runtime/list-composition/before.json"));
for (const [path, hash] of Object.entries(before)) {
  let source = read(path);
  if (path === "apps/prototype/src/main.tsx") for (const addition of [
    'import { ListCompositionPreview } from "./scenarios/list-composition/page";\n',
    '  if (route === "#list-composition") return <DensityProvider density="default"><ListCompositionPreview /></DensityProvider>;\n',
  ]) {
    assert.equal(source.split(addition).length, 2);
    source = source.replace(addition, "");
  }
  // Hash binary files from bytes, preserving all existing assets.
  const bytes = path === "apps/prototype/src/main.tsx" ? Buffer.from(source) : readFileSync(`${root}${path}`);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), hash, path);
}
const tokens = read("packages/foundations/src/tokens.css") + read("packages/foundations/src/typography.css");
for (const [, variable] of read("apps/prototype/src/scenarios/list-composition/list.css").matchAll(/var\((--rain-[a-z0-9-]+)\)/g)) {
  assert(tokens.includes(`${variable}:`), `Undefined CSS token ${variable}`);
}
console.log(`Authorization negative checks and ${Object.keys(before).length} source comparisons passed; local CSS tokens resolve.`);
