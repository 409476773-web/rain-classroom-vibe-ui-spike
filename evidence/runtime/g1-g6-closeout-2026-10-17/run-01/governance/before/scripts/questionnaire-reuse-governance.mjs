import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseYamlSubset } from "./verification-helpers.mjs";
import { measureColorContrast, resolveColor, resolveColorSurface } from "../packages/foundations/src/color-registry.ts";

export const reuseEvidence = "evidence/runtime/questionnaire-reuse-2026-10-16";
export const reuseModule = "scripts/questionnaire-reuse-governance.mjs";
export const reuseBindingsPath = `${reuseEvidence}/source-bindings.json`;
export const bindingSeal = "2673a4e96eb245c7ed71b043a4e261c7899908c564e17da0ff268c463400986d";
export const moduleSeal = "f92357f3fd786f831f83ad73a2c2bb12ef7b17d95298f0d7f791e0c90e996ac6";
const baselineSeal = "8a32945a283b3e1b8f363ff78812eb94495e25fe8e443bd60e4d92ed7abc6fa4";
const retainedSeal = "be9605ddbef7ce66de967ed0e48106fe2011e04e2c3a5a93d3551fd619e3d9ad";
const baselineGovernanceSeal = "a6c92f0d6bd612404f98690b3a6747667dc77a406530ae1e22c28fb1e068f56c";
const additionalBeforeFiles = {
  "scripts/checkbox-governance.test.ts": "b1fc60850f4d311eac71b517d2404197dcd50e5dff1bac410e8184cac6108a9f",
  "scripts/verify-token-foundations.mjs": "decb6b16a39f465f9991be99f65343c8ed818ed31c4593ed12bb368a13327a07",
};

// This finite successor records the observed baseline, which already had unrelated failures.
// It neither projects old checks to green nor modifies their source or evidence.
export const editableFiles = [
  "packages/ui/src/radio/radio.tsx", "packages/ui/src/checkbox/checkbox.tsx",
  "packages/ui/src/selection-card/selection-card.tsx", "packages/ui/src/styles.css",
  "packages/ui/src/questionnaire/questionnaire.tsx", "packages/ui/src/questionnaire/questionnaire.css",
  "packages/ui/src/questionnaire/README.md",
  ...["radio", "checkbox", "radio-card", "checkbox-card", "questionnaire"].map(name => `manifests/ui/${name}.yaml`),
  "manifests/contracts/tailwind-b2.yaml",
  ...["radio", "checkbox", "selection-cards", "dropdown-family", "g6-assets"].map(name => `registry/${name}.json`),
  "status/current-phase.yaml", "scripts/checkbox-governance.test.ts", "scripts/verify-token-foundations.mjs",
];
export const newFiles = [
  "packages/ui/src/selection-control/selection-control.tsx",
  "packages/ui/src/selection-control/selection-control.test.tsx",
  "packages/ui/src/selection-card/selection-card.parts.tsx",
  "packages/ui/src/questionnaire/questionnaire-choice-adapter.tsx",
  "packages/ui/src/questionnaire/questionnaire-input-adapter.tsx",
  "packages/ui/src/questionnaire/questionnaire-render.tsx",
  "packages/ui/src/questionnaire/questionnaire-reuse.test.tsx",
  "tests/e2e/questionnaire-reuse.config.ts", "tests/e2e/questionnaire-reuse.spec.ts",
  "docs/adr/0013-questionnaire-control-reuse.md",
  reuseModule, "scripts/verify-questionnaire-control-reuse.mjs", "scripts/questionnaire-reuse-governance.test.ts",
];
const surface = newFiles[0];
const cardParts = newFiles[2];
const adapterFiles = newFiles.slice(3, 6);
export const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const read = (root, file) => readFileSync(path.join(root, file), "utf8");
const json = (root, file) => JSON.parse(read(root, file));
const yaml = (root, file) => parseYamlSubset(read(root, file));

export function normalizedModuleHash(source) {
  return sha256(source.replace(/export const (bindingSeal|moduleSeal) = "[^"]+";/g, 'export const $1 = "PENDING";'));
}
export function sourceBindingSeal(record) {
  const copy = structuredClone(record);
  // The verifier's own seal literals are excluded from the recursive digest only.
  // Its complete after hash and independently normalized moduleSeal are checked below.
  delete copy.sourceFiles[reuseModule].after;
  return sha256(JSON.stringify(copy));
}

export function readReuseBaseline(root) {
  const source = read(root, `${reuseEvidence}/baseline-files.json`);
  assert.equal(sha256(source), baselineSeal, "Questionnaire baseline inventory changed");
  const baseline = JSON.parse(source);
  for (const [file, hash] of Object.entries(additionalBeforeFiles)) {
    assert.equal(sha256(readFileSync(path.join(root, reuseEvidence, "baseline", file))), hash, `Questionnaire additional before snapshot changed: ${file}`);
  }
  for (const file of baseline.files) {
    assert.equal(sha256(readFileSync(path.join(root, reuseEvidence, "baseline", file.path))), file.sha256,
      `Questionnaire before snapshot changed: ${file.path}`);
    if (!editableFiles.includes(file.path)) {
      assert.equal(sha256(readFileSync(path.join(root, file.path))), file.sha256,
        `Source outside Questionnaire reuse scope changed: ${file.path}`);
    }
  }
  const retained = read(root, `${reuseEvidence}/retained-files.json`);
  assert.equal(sha256(retained), retainedSeal, "Retained proof inventory changed");
  for (const [file, hash] of Object.entries(JSON.parse(retained).files)) {
    assert.equal(sha256(readFileSync(path.join(root, file))), hash, `Retained dependency or historical proof changed: ${file}`);
  }
  assert.equal(sha256(read(root, `${reuseEvidence}/baseline-governance.log`)), baselineGovernanceSeal,
    "Historical baseline failures must remain recorded");
  return baseline;
}

export function validateReusePhase(current, before) {
  const phase = current.componentRefinements?.questionnaireControlReuse;
  assert.ok(phase, "Missing Questionnaire reuse authorization");
  const expected = {
    authorization: "authorized-plan-implementation", authorizedAt: "2026-10-16",
    decisionSource: "current-user-explicit-instruction", userStatement: "开始按文档实施改造",
    plan: "docs/plans/2026-10-16-questionnaire-control-reuse.md", workMode: "system-mode", assetIdentity: "registry-candidate",
    scope: "Radio/Checkbox共享无状态选择呈现、选择卡片外壳、Questionnaire选择与原生单行Input适配",
    publicInterface: "仅增加QuestionnaireRecipe input-wrapper Part；保留既有控件与问答render/ref/原生约束合同",
    verification: "既有控件回归、原始Primitive对照、专项浏览器、Registry独立消费及有限治理后继",
    assumptions: "自定义render仍遵守原生节点合同；现有引擎reset行为按原始Primitive对照记录",
    evidence: `${reuseEvidence}/verification.md`, baseline: `${reuseEvidence}/baseline-files.json`, sourceBindings: reuseBindingsPath,
    humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "unpublished",
    figmaWrite: "not-authorized", businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
  };
  const lifecycle = {
    implementation: ["in-progress", "completed"], automatedVerification: ["in-progress", "passed-scoped"],
    independentReview: ["not-run", "passed-scoped"],
  };
  assert.deepEqual(Object.keys(phase).sort(), [...Object.keys(expected), ...Object.keys(lifecycle)].sort(), "Questionnaire phase keys must remain finite");
  for (const [key, value] of Object.entries(expected)) assert.equal(phase[key], value, `Questionnaire phase ${key}`);
  for (const [key, values] of Object.entries(lifecycle)) assert.ok(values.includes(phase[key]), `Questionnaire phase ${key}`);
  const predecessor = structuredClone(current);
  delete predecessor.componentRefinements.questionnaireControlReuse;
  assert.deepEqual(predecessor, before, "Historical phase fields changed outside Questionnaire reuse");
}

export function expectedSharedCss(before) {
  return before
    .replace(/^.*\.rain-field-frame[^\n]*\[data-slot="control"\][^\n]*$/gm, selector =>
      selector.replaceAll('[data-slot="control"]', ':is([data-slot="control"], input[data-slot="input"])'))
    .replace('.rain-input [data-slot="control"]::placeholder', '.rain-input :is([data-slot="control"], input[data-slot="input"])::placeholder')
    .replaceAll('.rain-selection-card:has(> .rain-selection-card__selection > input:checked)', '.rain-selection-card:has(> .rain-selection-card__selection > input:checked, > input:checked)')
    .replaceAll('.rain-selection-card:has(> .rain-selection-card__selection > input[type="checkbox"]:indeterminate)', '.rain-selection-card:has(> .rain-selection-card__selection > input[type="checkbox"]:indeterminate, > input[type="checkbox"]:indeterminate)')
    .replaceAll('.rain-selection-card:has(> .rain-selection-card__selection > input:disabled)', '.rain-selection-card:has(> .rain-selection-card__selection > input:disabled, > input:disabled)')
    .replace('.rain-selection-card__selection {', 'label.rain-selection-card[data-invalid]:is(.rain-radio, .rain-checkbox) { border-color: var(--rain-category-border-red-1); }\nlabel.rain-selection-card:has(> input:disabled) { color: var(--rain-category-text-neutral-6); cursor: not-allowed; }\n.rain-selection-card__selection {');
}

export function reuseColorReport() {
  const selected = '.rain-selection-card:has(> .rain-selection-card__selection > input:checked, > input:checked), .rain-selection-card:has(> .rain-selection-card__selection > input[type="checkbox"]:indeterminate, > input[type="checkbox"]:indeterminate)';
  const consumers = [
    { selector: selected, property: "border-color", tokenId: "Border/Brand/1", content: "essential-boundary", minimum: 3 },
    { selector: selected, property: "background-image", tokenId: "Fill/Brand/Alpha/4", content: "surface", minimum: 0 },
    { selector: "label.rain-selection-card[data-invalid]:is(.rain-radio, .rain-checkbox)", property: "border-color", tokenId: "Border/Red/1", content: "essential-boundary", minimum: 3 },
    { selector: "label.rain-selection-card:has(> input:disabled)", property: "color", tokenId: "Text/Neutral/6", content: "disabled", minimum: 0 },
  ];
  const measurements = consumers.flatMap(consumer => ["light", "dark"].flatMap(theme =>
    (consumer.content === "surface" ? ["Background/Neutral/1"] : ["Background/Neutral/1", "Fill/Brand/Alpha/4"])
      .map(parentSurfaceId => {
        const actual = measureColorContrast(resolveColor(consumer.tokenId, theme), resolveColorSurface(parentSurfaceId, theme, "Background/Neutral/1"));
        return { ...consumer, filePath: "packages/ui/src/styles.css", recipeId: "questionnaire-control-reuse", theme, parentSurfaceId,
          parentBackgroundId: "Background/Neutral/1", actual, meetsMinimum: actual >= consumer.minimum,
          status: "pending-review", acceptedException: false, humanReview: "awaiting_human",
          measurementScope: "declared-parent-stack; runtime-cascade-not-inferred" };
      })));
  return { scope: "questionnaire-control-reuse-2026-10-16", consumers, measurements,
    humanGate: "awaiting_human", contrastAcceptance: "not-granted", historicalAcceptanceInherited: false };
}

/** A valid current proof is required before adapting the old selector-based ledger. */
export function prepareQuestionnaireReuseColors(filePath, source, root, failures, pendingContrastFindings) {
  if (filePath !== "packages/ui/src/styles.css" || !existsSync(path.join(root, "status/current-phase.yaml"))) return source;
  if (!yaml(root, "status/current-phase.yaml").componentRefinements?.questionnaireControlReuse) return source;
  try {
    verifyReuseBindings(root);
    // Mutation probes must continue through the ordinary scanner without normalization.
    if (source !== read(root, filePath)) return source;
    pendingContrastFindings.push(...reuseColorReport().measurements.filter(measurement => !measurement.meetsMinimum));
    return read(root, `${reuseEvidence}/baseline/${filePath}`);
  } catch (error) {
    failures.push(`Questionnaire reuse CSS requires its exact current source proof: ${error.message}`);
    return source;
  }
}

export function validateReuseContracts(root) {
  const before = file => read(root, `${reuseEvidence}/baseline/${file}`);
  const tokenVerifier = "scripts/verify-token-foundations.mjs";
  const tokenHook = '  source = prepareQuestionnaireReuseColors(filePath, source, root, failures, pendingContrastFindings);\n';
  assert.equal(read(root, tokenVerifier),
    'import { prepareQuestionnaireReuseColors } from "./questionnaire-reuse-governance.mjs";\n' + before(tokenVerifier).replace(
      '  source = prepareDialogLayoutSource(filePath, source, existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : {});\n  const failures = [], ranges = [];',
      '  const failures = [], ranges = [];\n' + tokenHook + '  source = prepareDialogLayoutSource(filePath, source, existsSync(join(root, "status/current-phase.yaml")) ? parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) : {});'),
    "Token verifier may only add the exact sealed Questionnaire CSS successor");
  const checkboxTest = "scripts/checkbox-governance.test.ts";
  assert.equal(read(root, checkboxTest), before(checkboxTest).replace(
    '  expect(source).toContain(\'from "../icons/check-bold"\');\n  expect(source).toContain(\'from "../icons/minus-bold"\');',
    '  expect(source).toContain(\'from "../selection-control/selection-control"\');\n  const surface = readFileSync("packages/ui/src/selection-control/selection-control.tsx", "utf8");\n  expect(surface).toContain(\'from "../icons/check-bold"\');\n  expect(surface).toContain(\'from "../icons/minus-bold"\');\n  expect(surface).not.toMatch(/<svg|aria-pressed|role="button"/);'),
  "Checkbox governance may only follow the relocated glyph implementation");
  assert.equal(read(root, "packages/ui/src/styles.css"), expectedSharedCss(before("packages/ui/src/styles.css")),
    "Shared CSS must contain only approved field/selection selectors and Questionnaire label states");
  const newProtected = [surface, cardParts, ...adapterFiles];
  const contract = yaml(root, "manifests/contracts/tailwind-b2.yaml");
  const oldContract = parseYamlSubset(before("manifests/contracts/tailwind-b2.yaml"));
  const expectedContract = structuredClone(oldContract);
  expectedContract.protectedPaths.optional.push(...newProtected);
  assert.deepEqual(contract, expectedContract, "Tailwind contract must only add the five exact internal source paths");
  for (const name of ["radio", "checkbox", "radio-card", "checkbox-card", "questionnaire"]) {
    const file = `manifests/ui/${name}.yaml`;
    const manifest = yaml(root, file), previous = parseYamlSubset(before(file));
    for (const key of ["verification", "humanGate", "contrastAcceptance", "publication", "figmaMapping"]) {
      assert.deepEqual(manifest[key], previous[key], `Historical ${name} ${key} changed`);
    }
    assert.equal(manifest.controlReuse.humanGate, "awaiting_human");
    assert.equal(manifest.controlReuse.contrastAcceptance, "not-granted");
    assert.equal(manifest.controlReuse.evidence, `${reuseEvidence}/verification.md`);
    if (name === "questionnaire") {
      for (const key of ["anatomy", "parts"]) {
        assert.equal(manifest[key].filter(part => part === "input-wrapper").length, 1);
        assert.deepEqual(manifest[key].filter(part => part !== "input-wrapper"), previous[key], `Questionnaire ${key} changed beyond input-wrapper`);
      }
    }
  }
  for (const name of ["radio", "checkbox", "selection-cards", "dropdown-family", "g6-assets"]) {
    const file = `registry/${name}.json`, actual = json(root, file), expected = JSON.parse(before(file));
    if (["radio", "checkbox", "selection-cards"].includes(name)) expected.shared.files.push(surface);
    if (name === "radio") { expected.shared.files.push("packages/ui/src/icon/icon.tsx"); expected.shared.registryDependencies = ["check-bold", "minus-bold"]; }
    if (name === "selection-cards") expected.shared.files.push(cardParts);
    if (name === "dropdown-family") expected.items.find(item => item.name === "dropdown-menu").files.push(surface);
    if (name === "g6-assets") {
      const item = expected.items.find(item => item.name === "questionnaire");
      item.files.push(surface, cardParts, ...adapterFiles, "packages/ui/src/input/input.styles.ts", "packages/ui/src/field/field.styles.ts");
      item.passiveVisualDependencies = [
        ["SelectionControlSurface", surface], ["CardSurface", cardParts],
        ["fieldFrameRecipe", "packages/ui/src/field/field.styles.ts"], ["inputControlClassName", "packages/ui/src/input/input.styles.ts"],
      ].map(([exportName, sourcePath]) => ({ exportName, sourcePath, publicEntry: false }));
    }
    assert.deepEqual(actual, expected, `Registry changed outside Questionnaire reuse closure: ${file}`);
  }
}

export function registryFileClosure(root, registryPath, itemName, seen = new Set()) {
  const key = `${registryPath}#${itemName ?? "*"}`;
  if (seen.has(key)) return new Set();
  seen.add(key);
  const registry = json(root, registryPath);
  const items = itemName ? registry.items.filter(item => item.name === itemName) : registry.items;
  assert.ok(items.length, `Missing Registry item ${key}`);
  const nodes = [registry.shared ?? {}, ...items], files = new Set(nodes.flatMap(node => node.files ?? []));
  for (const dependency of nodes.flatMap(node => node.registryDependencies ?? [])) {
    const [file, name] = dependency.startsWith("registry/") ? dependency.split("#") : ["registry/icons.json", dependency];
    for (const resolved of registryFileClosure(root, file, name, seen)) files.add(resolved);
  }
  return files;
}

// Check every relative source import against only the delivered Registry files.
// The browser/consumer build separately proves compilation and runtime behavior.
export function validateRegistryClosure(root, files) {
  for (const file of files) {
    assert.ok(existsSync(path.join(root, file)), `Registry file missing: ${file}`);
    if (!/\.[cm]?[jt]sx?$/.test(file)) continue;
    const source = read(root, file);
    const imports = [...source.matchAll(/(?:from\s*|import\s*|import\s*\()(["'])(\.[^"']+)\1/g)];
    for (const [, , specifier] of imports) {
      const clean = specifier.split("?")[0], base = path.posix.normalize(path.posix.join(path.posix.dirname(file), clean));
      const candidates = [base, ...[".tsx", ".ts", ".css", "/index.tsx", "/index.ts"].map(ext => base + ext)];
      assert.ok(candidates.some(candidate => files.has(candidate)), `Registry closure missing ${specifier} imported by ${file}`);
    }
  }
}

export function buildReuseBindings(root) {
  const baseline = readReuseBaseline(root);
  validateReusePhase(yaml(root, "status/current-phase.yaml"), yaml(root, `${reuseEvidence}/baseline/status/current-phase.yaml`));
  validateReuseContracts(root);
  for (const [registry, item] of [["g6-assets", "questionnaire"], ["radio", "radio"], ["checkbox", "checkbox"], ["selection-cards", undefined], ["dropdown-family", "dropdown-menu"]]) {
    validateRegistryClosure(root, registryFileClosure(root, `registry/${registry}.json`, item));
  }
  return {
    schemaVersion: 1, kind: "QuestionnaireControlReuseSourceBindings", scope: "questionnaire-control-reuse-2026-10-16",
    predecessor: { status: "observed-baseline-with-unrelated-failures", inventory: `${reuseEvidence}/baseline-files.json`, sha256: baselineSeal,
      governanceLog: `${reuseEvidence}/baseline-governance.log`, governanceLogSha256: baselineGovernanceSeal, failedTests: 22, passedTests: 26 },
    retained: { inventory: `${reuseEvidence}/retained-files.json`, sha256: retainedSeal },
    sourceFiles: Object.fromEntries([...editableFiles, ...newFiles].sort().map(file => [file, {
      before: baseline.files.find(item => item.path === file)?.sha256 ?? additionalBeforeFiles[file] ?? null,
      after: sha256(readFileSync(path.join(root, file))),
    }])),
  };
}

export function verifyReuseBindings(root) {
  const record = json(root, reuseBindingsPath), expected = buildReuseBindings(root);
  assert.deepEqual(record, expected, "Questionnaire reuse binding paths, before hashes or current source bytes changed");
  assert.equal(sourceBindingSeal(record), bindingSeal, "Questionnaire reuse source binding seal changed");
  assert.equal(normalizedModuleHash(read(root, reuseModule)), moduleSeal, "Questionnaire reuse verifier source changed");
  return record;
}
