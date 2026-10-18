import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readAssets } from "./asset-index.mjs";
import { parseYamlSubset } from "./verification-helpers.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const statusPath = "apps/playground/src/docs/library-status.generated.json";
export function buildPlaygroundStatus(workspace = root) {
  const phase = parseYamlSubset(readFileSync(resolve(workspace, "status/current-phase.yaml"), "utf8"));
  const summary = phase.playgroundDeliverySummary;
  if (!summary?.updatedAt || !summary?.title) throw new Error("Missing current Playground delivery summary");
  const assets = readAssets(workspace).map(asset => asset.manifest);
  return {
    generatedFrom: ["status/current-phase.yaml#playgroundDeliverySummary", "manifests", "registry"],
    ...summary,
    contracts: assets.length,
    candidates: assets.filter(asset => asset.assetIdentity === "registry-candidate").length,
    localExperiments: assets.filter(asset => asset.assetIdentity === "local-experiment").length,
    unpublished: assets.filter(asset => asset.publication === "unpublished").length,
  };
}
export function verifyPlaygroundStatus(workspace = root) {
  const actual = JSON.parse(readFileSync(resolve(workspace, statusPath), "utf8"));
  if (JSON.stringify(actual) !== JSON.stringify(buildPlaygroundStatus(workspace))) throw new Error("Playground summary is stale; run node scripts/playground-status.mjs --write");
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === "--write") writeFileSync(resolve(root, statusPath), JSON.stringify(buildPlaygroundStatus(), null, 2) + "\n");
  else if (process.argv[2] === "--check") verifyPlaygroundStatus();
  else throw new Error("Usage: node scripts/playground-status.mjs --write|--check");
}
