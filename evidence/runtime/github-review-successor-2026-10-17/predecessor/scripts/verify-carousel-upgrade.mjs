import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseYamlSubset } from "./verification-helpers.mjs";
import { readCarouselUpgradeSourceBindings } from "./carousel-upgrade-governance.mjs";
import { verifyCarouselColorConsumers } from "./carousel-color-consumers.mjs";
import { renderAssetIndex, validateAsset } from "./asset-index.mjs";

/** Verifies Carousel-owned sources without claiming that concurrently edited G6 siblings are unchanged. */
export function verifyCarouselUpgrade(root = process.cwd()) {
  const phase = parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8"));
  const bindings = readCarouselUpgradeSourceBindings(root, phase, parseYamlSubset);
  assert(bindings, "Carousel upgrade requires its explicit phase authorization");
  const registry = JSON.parse(readFileSync(join(root, "registry/g6-assets.json"), "utf8"));
  const item = registry.items.find(item => item.name === "carousel");
  const manifest = parseYamlSubset(readFileSync(join(root, item.manifest), "utf8"));
  const asset = { manifest, manifestPath: item.manifest, item, registry, registryPath: "registry/g6-assets.json" };
  validateAsset(asset, root);
  const carouselRows = source => source.split("\n").filter(line => line.startsWith("| **Carousel** |"));
  assert.deepEqual(carouselRows(readFileSync(join(root, "docs/ai/asset-index.md"), "utf8")), carouselRows(renderAssetIndex([asset])), "Carousel index row must equal its actual manifest and registry");
  for (const key of ["humanGate", "contrastAcceptance", "publication"]) assert.equal(manifest[key], bindings.phase[key], "Carousel gate differs from its phase: " + key);
  const colors = verifyCarouselColorConsumers(root, bindings);
  const controlPairs = colors.measurements.filter(row => row.measurementScope === "declared-carousel-control-recipe-pair");
  assert.equal(controlPairs.length, 6);
  assert(controlPairs.every(row => row.meetsMinimum), "Carousel enabled control pairs must meet the 3:1 icon threshold");
  return { scope: "carousel-v04-public-upgrade-only", sourcePaths: Object.keys(bindings.sourceFiles).length,
    sharedSourceCoverage: Object.fromEntries(Object.entries(bindings.sourceFiles).filter(([, binding]) => binding.mode !== "whole-file").map(([path, binding]) => [path, binding.mode])),
    originalG6CurrentState: "not-claimed-independent-concurrent-successors-required", colorPaintOccurrences: colors.paintConsumers.length,
    derivedLocalColors: Object.keys(colors.localTokenDefinitions).length, declaredControlPairs: controlPairs,
    pendingMediaOverlayContrast: true, humanGate: bindings.phase.humanGate, contrastAcceptance: bindings.phase.contrastAcceptance, publication: bindings.phase.publication };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log(JSON.stringify(verifyCarouselUpgrade(), null, 2));
