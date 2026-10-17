import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getG5SourceBindings, getG6SourceBindings, hasG5ComponentsAuthorization, parseYamlSubset, g5ComponentFiles, hasDateTimeOptimizationAuthorization, dateTimeOptimizationFiles, hasDatePickerUxRefinementAuthorization, datePickerUxRefinementFiles, hasDatePickerVisualFeedbackAuthorization, datePickerVisualFeedbackFiles, hasSliderRefinementAuthorization, sliderRefinementFiles } from "./verification-helpers.mjs";
import { readAssets, renderAssetIndex, validateAsset } from "./asset-index.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";
import { validateProtectedTailwindSource } from "./verify-tailwind-b2.mjs";
import { verifyG5ColorSources, measureG5StateContrast } from "./g5-color-consumers.mjs";
import { getG5EvidenceDirectory } from "./g5-evidence-paths.mjs";

export function verifyG5Components(root = process.cwd()) {
  const g6 = getG6SourceBindings(root);
  const read = file => readFileSync(resolve(root, g6?.sourceFiles[file]?.before
    ? "evidence/runtime/g6-components-2026-10-14/before/" + file : file), "utf8");
  const hash = file => createHash("sha256").update(read(file)).digest("hex");
  const phase = parseYamlSubset(read("status/current-phase.yaml"));
  assert(hasG5ComponentsAuthorization(phase), "G5 approved implementation scope");
  getG5SourceBindings(root, phase);
  const lock = JSON.parse(read(phase.componentRefinements.g5Components.sourceLock));
  assert.equal(lock.commit, "3ba91b1cc83e1bbe4ab35a422ff2a694849c5048");
  for (const source of lock.sources) assert.equal(hash(source.stored), source.sha256, source.stored);
  const pkg = JSON.parse(read("packages/ui/package.json"));
  assert.equal(pkg.dependencies["@base-ui/react"], "1.8.0");
  assert.equal(pkg.dependencies["react-day-picker"], "9.13.2");
  const assets = readAssets(root).filter(asset => asset.registryPath === "registry/g5-assets.json");
  assert.deepEqual(assets.map(asset => asset.item.name).sort(), ["calendar", "combobox", "date-picker", "native-select", "slider"]);
  assets.forEach(asset => validateAsset(asset, root));
  for (const asset of assets) assert(renderAssetIndex(assets, asset.manifest.name).includes(`**${asset.manifest.name}**`), `G5 asset must be discoverable: ${asset.manifest.name}`);
  const baseline = JSON.parse(read("evidence/runtime/g5-components-2026-10-12/baseline.json"));
  const previousExports = read("packages/ui/src/index.ts").replace(/^export (?:type )?\{[^\n]+\} from "\.\/(?:native-select|combobox|slider|calendar|date-picker)\/[^"]+";\n/gm, "");
  assert.equal(createHash("sha256").update(previousExports).digest("hex"), baseline.files["packages/ui/src/index.ts"], "existing public exports retained");
  assert.equal(hash("packages/ui/src/styles.css"), baseline.files["packages/ui/src/styles.css"], "existing global styles retained");
  assert.equal(read("apps/playground/src/styles.css").split('@source "./docs/components/g5-component-pages.tsx";').length, 2);
  const ledger = verifyG5ColorSources(root), outputs = getTokenFoundationOutputs();
  outputs.colorCssConsumers.push(...ledger.colorCssConsumers);
  const contrast = [], eligibility = [], failures = [];
  for (const filePath of [...new Set([...g5ComponentFiles.ui, ...g5ComponentFiles.application, ...(hasDateTimeOptimizationAuthorization(phase) ? [...dateTimeOptimizationFiles.ui, ...dateTimeOptimizationFiles.application] : []), ...(hasDatePickerUxRefinementAuthorization(phase) ? [...datePickerUxRefinementFiles.ui, ...datePickerUxRefinementFiles.application] : []), ...(hasSliderRefinementAuthorization(phase) ? [...sliderRefinementFiles.ui, ...sliderRefinementFiles.application] : []), ...(hasDatePickerVisualFeedbackAuthorization(phase) ? [...datePickerVisualFeedbackFiles.ui, ...datePickerVisualFeedbackFiles.application] : [])])].filter(file => /\.(tsx|css)$/.test(file) && !file.endsWith(".test.tsx"))) {
    const source = read(filePath);
    failures.push(...validateProtectedTailwindSource({ filePath, source }));
    failures.push(...validateRegisteredRecipeColors({ filePath, source, root, outputs, pendingContrastFindings: contrast, pendingEligibilityFindings: eligibility }));
  }
  assert.deepEqual(failures, [], "G5 source, Token registration and role checks");
  const stateContrast = measureG5StateContrast(ledger);
  return { scope: phase.componentRefinements.g5Components.scope, assets: assets.length, capabilities: 8, categoryPaints: ledger.colorCssConsumers.length,
    nativePaints: ledger.nativeCssConsumers.length, contrastFindings: contrast, eligibilityFindings: eligibility,
    stateContrast, stateContrastFindings: stateContrast.filter(row => row.actual < row.minimum),
    contrastAcceptance: "not-granted", humanGate: "awaiting_human", publication: "unpublished" };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = verifyG5Components();
  const evidence = getG5EvidenceDirectory(process.cwd());
  mkdirSync(evidence, { recursive: true });
  writeFileSync(resolve(evidence, "scoped-governance.json"), JSON.stringify(result, null, 2) + "\n");
  console.log(`G5 verified: ${result.capabilities} capabilities / ${result.assets} assets / ${result.categoryPaints} registered paints; contrast remains pending.`);
}
