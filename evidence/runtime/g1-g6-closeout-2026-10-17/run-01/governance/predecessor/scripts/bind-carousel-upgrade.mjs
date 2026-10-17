// Explicit recording step after review; does not widen the finite successor file list or its authorization.
import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { carouselUpgradeAuthorization, carouselUpgradeEvidence, carouselUpgradeFiles, carouselUpgradeBindingSeal, carouselBindingBytes, carouselSourceMode, validateCarouselUpgradeIndex, sha256 } from "./carousel-upgrade-governance.mjs";
import { renderAssetIndex } from "./asset-index.mjs";
import { parseYamlSubset } from "./verification-helpers.mjs";
import { carouselColorSourcePaths, carouselPaintInventory, resolveCarouselColor, validateCarouselColorLedger } from "./carousel-color-consumers.mjs";

export function bindCarouselUpgrade(root = process.cwd()) {
  const read = path => readFileSync(join(root, path));
  const write = (path, value) => writeFileSync(join(root, path), value);
  const old = JSON.parse(read("evidence/runtime/g6-components-2026-10-14/source-bindings.json"));
  const protectedSources = JSON.parse(read("evidence/runtime/g6-components-2026-10-14/baseline.json")).protectedSources;
  // Render only the validated owner's row; concurrently added sibling exports may
  // block the whole index until that owner's separate registry transition is sealed.
  const indexPath = "docs/ai/asset-index.md", indexBefore = read(carouselUpgradeEvidence + "before/" + indexPath).toString();
  validateCarouselUpgradeIndex(read(indexPath).toString(), indexBefore);
  const registryPath = "registry/g6-assets.json", registry = JSON.parse(read(registryPath));
  const item = registry.items.find(item => item.name === "carousel");
  const manifestPath = item.manifest, manifest = parseYamlSubset(read(manifestPath).toString());
  const row = renderAssetIndex([{ manifest, manifestPath, item, registry, registryPath }]).split("\n").find(line => line.startsWith("| **Carousel** |"));
  const index = indexBefore.split("\n").flatMap(line => line.startsWith("| **Carousel** |") ? row ? [row] : [] : [line]).join("\n");
  validateCarouselUpgradeIndex(index, indexBefore); write(indexPath, index);
  const sourceFiles = {};
  for (const path of carouselUpgradeFiles) {
    assert(existsSync(join(root, path)), "Carousel source is not ready to bind: " + path);
    const before = old.sourceFiles[path]?.after ?? protectedSources[path] ?? null;
    const beforeSnapshot = before ? carouselUpgradeEvidence + "before/" + path : null;
    if (before) assert.equal(sha256(read(beforeSnapshot)), before, "Do not replace the Carousel predecessor: " + path);
    sourceFiles[path] = { before, beforeSnapshot, mode: carouselSourceMode(path), after: sha256(carouselBindingBytes(root, path, beforeSnapshot)) };
  }
  const sources = Object.fromEntries(carouselColorSourcePaths.map(path => [path, read(path).toString()]));
  const localTokenDefinitions = {};
  for (const match of sources[carouselColorSourcePaths[0]].matchAll(/(--rain-local-carousel-[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    if (/var\(--rain-category-|rgb\(|color-mix\(/.test(match[2])) localTokenDefinitions[match[1]] = match[2].trim();
  }
  const ledger = { kind: "CarouselUpgradeFiniteColorConsumers", scope: "carousel-v04-public-upgrade", humanGate: "awaiting_human", contrastAcceptance: "not-granted",
    sourceFiles: Object.fromEntries(Object.entries(sources).map(([path, source]) => [path, sha256(source)])),
    localTokenDefinitions, resolvedLocalTokens: Object.fromEntries(Object.entries(localTokenDefinitions).map(([name, value]) => [name,
      Object.fromEntries(["light", "dark"].map(theme => [theme, resolveCarouselColor(value, theme, localTokenDefinitions)]))])),
    paintConsumers: Object.entries(sources).flatMap(([path, source]) => carouselPaintInventory(path, source)),
    mediaFixtures: [{ filePath: "apps/playground/src/docs/components/carousel-artwork.tsx", source: "apps/prototype/src/carousel-study/Artwork.tsx", classification: "host-owned-media-fixture-not-interface-palette", uiPalette: false }],
    scopeNotes: ["All CSS paint occurrences and runtime color utilities are bound exactly; underlying semantic colors retain their existing Foundation definitions.",
      "Gray values copy the source Neutral green channel; they are component-local candidates, not new global Category colors.",
      "Neutral-surface measurements do not establish contrast against host media or grant human contrast acceptance."],
  };
  validateCarouselColorLedger(ledger, sources);
  write(carouselUpgradeEvidence + "color-consumers.json", JSON.stringify(ledger, null, 2) + "\n");
  const evidenceFiles = Object.fromEntries(["authorization.json", "color-consumers.json", "design-lineage.json"].map(name => [carouselUpgradeEvidence + name, sha256(read(carouselUpgradeEvidence + name))]));
  const bindings = { kind: "CarouselUpgradeSourceBindings", scope: "carousel-v04-public-upgrade", authorization: carouselUpgradeAuthorization, sourceFiles, evidenceFiles };
  const modulePath = "scripts/carousel-upgrade-governance.mjs";
  let module = read(modulePath).toString().replace(/const sourceSeal = "[^"]*";/, 'const sourceSeal = "' + carouselUpgradeBindingSeal(bindings) + '";');
  module = module.replace(/const moduleHash = "[^"]*";/, 'const moduleHash = "' + "0".repeat(64) + '";');
  const moduleHash = sha256(module);
  module = module.replace('const moduleHash = "' + "0".repeat(64) + '";', 'const moduleHash = "' + moduleHash + '";');
  write(modulePath, module); bindings.sourceFiles[modulePath].after = sha256(module);
  write(carouselUpgradeEvidence + "source-bindings.json", JSON.stringify(bindings, null, 2) + "\n");
  return { scope: bindings.scope, sourcePaths: Object.keys(sourceFiles).length, paintOccurrences: ledger.paintConsumers.length, localColorCandidates: Object.keys(localTokenDefinitions).length };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  assert(process.argv.includes("--write"), "Use --write only after reviewing the current Carousel source changes.");
  console.log(JSON.stringify(bindCarouselUpgrade(), null, 2));
}
