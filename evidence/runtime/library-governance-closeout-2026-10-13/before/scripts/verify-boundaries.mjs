import { hasG5ComponentsAuthorization, getG5SourceBindings, g5ComponentFiles, hasDateTimeOptimizationAuthorization, dateTimeOptimizationFiles, hasDatePickerUxRefinementAuthorization, datePickerUxRefinementFiles, hasDatePickerVisualFeedbackAuthorization, datePickerVisualFeedbackFiles } from "./verification-helpers.mjs";
import { hasButtonGroupRepairAuthorization, buttonGroupRepairFiles, hasG123PlaygroundAssetizationAuthorization, g123PlaygroundFiles, hasG4ComponentsAuthorization, hasG4VisualRefinementAuthorization, getG4SourceBindings, g4ComponentFiles, g4VisualRefinementSourcePaths, hasG4SizingReviewAuthorization, g4SizingReviewSourcePaths } from "./verification-helpers.mjs";
import { alertFiles as alertSourceFiles, hasAlertAuthorization } from "./verification-helpers.mjs";
import { tooltipFiles as tooltipSourceFiles, hasTooltipAuthorization } from "./verification-helpers.mjs";
import { inputNumberFiles, hasInputNumberAuthorization } from "./verification-helpers.mjs";
import { hasTokenFirstV12Authorization, hasTokenFirstV12G1NextAuthorization, hasTokenFirstV12G2Authorization } from "./verification-helpers.mjs";
import { avatarFamilyFiles, hasAvatarFamilyAuthorization, isAvatarFamilyImport } from "./verification-helpers.mjs";
import { hasDialogRefinementAuthorization } from "./verification-helpers.mjs";
import { hasGenerationQualityAuthorization, m2DeliveryFiles, hasM2Authorization, prepareM2NavigationSource, bmARn09Files, hasBmARn09Authorization, bmBRn10Files, hasBmBRn10Authorization, rn13AssetIndexFiles, hasRn13Authorization, rn14EditabilityFiles, hasRn14Authorization, rn15DeliveryFiles, hasRn15Authorization } from "./verification-helpers.mjs";
import { emptyRefinementFiles, hasEmptyRefinementAuthorization, insideFieldLabelBrowserFiles, hasInsideFieldLabelsAuthorization, tablePaginationFiles, hasTablePaginationReplacementAuthorization, tableRn08Files, hasTableRn08Authorization } from "./verification-helpers.mjs";
import { layoutsV1Files, hasLayoutsV1Authorization, dialogV2Files, hasDialogV2Authorization, isDialogV2Import } from "./verification-helpers.mjs";
import { cardV2Files, hasCardV2Authorization, getTabsRefinementFiles, isTabsImport, validateTabsPreflightInventory } from "./verification-helpers.mjs";
import { selectionPlaygroundSc04Files, hasSelectionPlaygroundSc04Authorization, selectionPatternsSc03Files, hasSelectionPatternsSc03Authorization, selectionCardsSc02Files, hasSelectionCardsSc02Authorization, radioSc01Files, hasRadioSc01Authorization, switchSc01Files, hasSwitchSc01Authorization, isSwitchImport, checkboxSc01Files, hasCheckboxSc01Authorization } from "./verification-helpers.mjs";
import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";

import {
  getExpectedDayThreeLifecycle,
  getCurrentB2Status,
  dropdownBatchOneDependencies,
  dropdownBatchOneFiles,
  hasDropdownBatchOneAuthorization,
  isDropdownExperimentImport,
  dropdownFamilyFiles, hasDropdownFamilyAuthorization, isDropdownFamilyImport,
  hasIconButtonRefinementAuthorization,
  hasInputRefinementAuthorization,
  inputRefinementFiles,
  hasSelectRefinementAuthorization, hasSelectFormalDependenciesAuthorization, isSelectFormalImport,
  selectRefinementFiles,
  hasTagRefinementAuthorization,
  tagRefinementFiles, tagBatchTwoRefinementFiles, hasTagBatchTwoRefinementAuthorization,
  tagBatchThreeFiles, tagBatchThreeDependencies, hasTagBatchThreeAuthorization, isTagBatchThreeImport,
  hasQuestionNumberRefinementAuthorization,
  hasQuestionOptionSizeReviewAuthorization,
  questionOptionSizeReviewFiles,
  questionOptionSizeRefinementFiles,
  hasQuestionOptionSizeRefinementAuthorization,
  hasOptionButtonRefinementAuthorization,
  optionButtonRefinementFiles,
  optionButtonContentRefinementFiles,
  hasOptionButtonContentRefinementAuthorization,
  questionNumberRefinementFiles,
  iconButtonRefinementFiles,
  tokenFoundationsV1Files,
  validateTokenFoundationsV1Phase,
  hasRecordedPostB2Refinement,
  hasTreeAuthorization,
  collectRecordedPostB2Documents,
  getValidatedDayThreeHistory,
  getIconLibraryRefinementFiles,
  getTextButtonRefinementFiles,
  hasRainUiModuleDependency,
  isDayOneForbiddenDependency,
  inspectPngMetadata,
  parsePnpmLockfileImporters,
  parseYamlSubset,
  usesPrivateReferenceColor,
  validateTailwindB2Phase,
} from "./verification-helpers.mjs";

const workspaceRoot = process.cwd();
const failures = [];

function collectFiles(directory, { ignoreNamedNodeModules = true } = {}) {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) {
    return [];
  }

  const ignoredDirectories = new Set(
    [
      ".git",
      ".vite",
      "coverage",
      "dist",
      "node_modules",
      "playwright-report",
      "test-results",
      "apps/playground/dist",
      "apps/prototype/dist",
      "apps/playground/node_modules",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);
    if (
      ((ignoreNamedNodeModules && entry.name === "node_modules") || ignoredDirectories.has(entryPath)) &&
      (entry.isDirectory() || entry.isSymbolicLink())
    ) {
      return [];
    }
    return entry.isDirectory()
      ? collectFiles(entryPath, { ignoreNamedNodeModules })
      : [entryPath];
  });
}

function requireRealDirectoryChain(relativeDirectory, label) {
  let current = workspaceRoot;
  for (const segment of relativeDirectory.split("/")) {
    current = join(current, segment);
    try {
      const stat = lstatSync(current);
      if (!stat.isDirectory() || stat.isSymbolicLink()) {
        failures.push(`${label} must use real directories without symbolic links: ${relative(workspaceRoot, current)}`);
        return false;
      }
    } catch {
      failures.push(`${label} directory is missing: ${relative(workspaceRoot, current)}`);
      return false;
    }
  }
  return true;
}

function readRegularNonSymbolicFile(filePath, label, { nonEmpty = true } = {}) {
  const stat = lstatSync(filePath);
  if (!stat.isFile() || stat.isSymbolicLink() || (nonEmpty && stat.size === 0)) {
    throw new Error(`${label} must be a ${nonEmpty ? "non-empty " : ""}regular non-symbolic file`);
  }
  return readFileSync(filePath);
}

function hasUnpairedUnicodeSurrogate(value) {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) return true;
      index += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      return true;
    }
  }
  return false;
}

function isCanonicalRepositoryRelativePath(value) {
  return typeof value === "string" &&
    value.length > 0 &&
    !isAbsolute(value) &&
    !value.includes("\\") &&
    !/[\u0000-\u001f\u007f]/u.test(value) &&
    !hasUnpairedUnicodeSurrogate(value) &&
    value.normalize("NFC") === value &&
    !value.split("/").some((segment) => segment === "" || segment === "." || segment === "..");
}

function discoverPackageFiles() {
  const packageFiles = ["package.json"];
  for (const workspaceDirectory of ["apps", "packages"]) {
    const directory = join(workspaceRoot, workspaceDirectory);
    if (!existsSync(directory)) {
      continue;
    }
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue;
      }
      const filePath = join(workspaceDirectory, entry.name, "package.json");
      if (existsSync(join(workspaceRoot, filePath))) {
        packageFiles.push(filePath);
      }
    }
  }
  return packageFiles.sort();
}

function loadPackage(filePath) {
  try {
    return JSON.parse(
      readRegularNonSymbolicFile(
        join(workspaceRoot, filePath),
        filePath,
      ).toString("utf8"),
    );
  } catch (error) {
    failures.push(`${filePath} cannot be audited: ${error.message}`);
    return null;
  }
}

function loadPhaseStatus() {
  const filePath = join(workspaceRoot, "status/current-phase.yaml");
  try {
    return parseYamlSubset(readFileSync(filePath, "utf8"));
  } catch (error) {
    failures.push(`status/current-phase.yaml cannot be audited: ${error.message}`);
    return null;
  }
}

const livePhaseStatus = loadPhaseStatus();
const alertFiles = Object.fromEntries(Object.entries(alertSourceFiles).map(([kind, files]) => [kind, hasAlertAuthorization(livePhaseStatus) ? files : []]));
const rn13Files = Object.fromEntries(Object.entries(rn13AssetIndexFiles).map(([kind, files]) => [kind, hasRn13Authorization(livePhaseStatus) ? files : []]));
const rn14Files = Object.fromEntries(Object.entries(rn14EditabilityFiles).map(([kind, files]) => [kind, hasRn14Authorization(livePhaseStatus) ? files : []]));
const m2Files = Object.fromEntries(Object.entries(m2DeliveryFiles).map(([kind, files]) => [kind, hasM2Authorization(livePhaseStatus) ? files : []]));
const qualityAuthorized = hasGenerationQualityAuthorization(livePhaseStatus);
const tokenFirstAuthorized = hasTokenFirstV12Authorization(livePhaseStatus);
const tooltipAuthorized = hasTooltipAuthorization(livePhaseStatus);
const tooltipFiles = Object.fromEntries(Object.entries(tooltipSourceFiles).map(([kind, files]) => [kind, tooltipAuthorized ? files : []]));
const tokenFirstNextAuthorized = hasTokenFirstV12G1NextAuthorization(livePhaseStatus);
const tokenFirstG2Authorized = hasTokenFirstV12G2Authorization(livePhaseStatus);
const g123PlaygroundAuthorized = hasG123PlaygroundAssetizationAuthorization(livePhaseStatus);
const g5Authorized = hasG5ComponentsAuthorization(livePhaseStatus);
const g4Authorized = hasG4ComponentsAuthorization(livePhaseStatus);
const buttonGroupRepairAuthorized = hasButtonGroupRepairAuthorization(livePhaseStatus);
const tokenFirstApplication = tokenFirstAuthorized ? ["alert.tsx", "switch.tsx", "accordion.tsx", "collapsible.tsx", "page.tsx", "page.css", "adapters.test.tsx", ...(tokenFirstNextAuthorized ? [...(!tooltipAuthorized ? ["tooltip.tsx"] : []), "resizable.tsx", "next-samples.tsx", "next.css", "README.md"] : [])].map(file => `apps/prototype/src/scenarios/token-first-g1/${file}`) : [];
const tokenFirstChecks = tokenFirstAuthorized ? ["tests/e2e/token-first-g1.spec.ts", "evidence/runtime/token-first-v12-g1/playwright.config.ts", ...(tokenFirstNextAuthorized ? ["tests/e2e/token-first-g1-next.spec.ts", "evidence/runtime/token-first-v12-g1-next/playwright.config.ts"] : [])] : [];
const tokenFirstG2Application = tokenFirstG2Authorized ? ["page.tsx", "page.css", "components.css", "button-group.tsx", "toggle.tsx", "toggle-group.tsx", "loading.tsx", "toast.tsx", "adapters.test.tsx"].map(file => `apps/prototype/src/scenarios/token-first-g2/${file}`) : [];
const tokenFirstG2Checks = tokenFirstG2Authorized ? ["tests/e2e/token-first-g2.spec.ts", "evidence/runtime/token-first-v12-g2/playwright.config.ts"] : [];
const reportA = livePhaseStatus?.componentRefinements?.tokenFirstV12?.reportRefinement;
const reportAAuthorized = tokenFirstAuthorized && reportA?.authorization === "authorized" && reportA.scope === "selected-report-a-local-presentation-and-color-evidence";
const reportAApplication = reportAAuthorized ? ["apps/prototype/src/scenarios/bm-d/report-a.css", "apps/prototype/src/scenarios/bm-d/report-sections.tsx"] : [];
const reportAChecks = reportAAuthorized ? ["tests/e2e/learning-report-a.spec.ts", "tests/e2e/learning-report.config.ts", "evidence/runtime/learning-report-a/playwright.config.ts"] : [];
const listPilotAuthorized = qualityAuthorized && Boolean(livePhaseStatus.componentRefinements.generationQuality.listCompositionPilot);
const listPilotChecks = listPilotAuthorized ? ["evidence/runtime/list-composition/check-browser.mjs", "evidence/runtime/list-composition/verify-source.mjs"] : [];
const qualityApplication = qualityAuthorized ? ["apps/prototype/src/scenarios/bm-d/trend-chart.tsx", ...(listPilotAuthorized ? ["page.tsx", "list.tsx", "list.css", "list.test.tsx"].map(file => `apps/prototype/src/scenarios/list-composition/${file}`) : [])] : [];
const rn15Files = Object.fromEntries(Object.entries(rn15DeliveryFiles).map(([kind, files]) => [kind, hasRn15Authorization(livePhaseStatus) ? files : []]));
for (const directory of ["apps", "packages"]) for (const path of collectFiles(join(workspaceRoot, directory))) {
  if (!/\.[cm]?[jt]sx?$/.test(path) || path.includes("/node_modules/") || path.includes("/dist/") || /\.test\./.test(path)) continue;
  const file = relative(workspaceRoot, path), source = readFileSync(path, "utf8");
  for (const match of source.matchAll(/["']((?:recharts|react-is)(?:\/[^"']*)?)["']/g)) if (match[1] !== "recharts" || !(qualityAuthorized && file === "apps/prototype/src/scenarios/bm-d/trend-chart.tsx" || reportAAuthorized && file === "apps/prototype/src/scenarios/bm-d/report-sections.tsx")) failures.push(`Chart import outside generation-quality report: ${file}`);
  for (const match of source.matchAll(/["'](@tanstack\/[^"']+)["']/g)) if (!hasTableRn08Authorization(livePhaseStatus) || !(file === "apps/prototype/src/data-table-recipe.tsx" || listPilotAuthorized && file === "apps/prototype/src/scenarios/list-composition/list.tsx") || match[1] !== "@tanstack/react-table") failures.push(`TanStack import outside RN-08 recipe: ${file}: ${match[1]}`);
}
const tableRn08Authorized = hasTableRn08Authorization(livePhaseStatus);
const tableFiles = Object.fromEntries(Object.entries(tableRn08Files).map(([kind, files]) => [kind, tableRn08Authorized ? [...files, ...(hasBmARn09Authorization(livePhaseStatus) ? bmARn09Files[kind] ?? [] : []), ...(hasTablePaginationReplacementAuthorization(livePhaseStatus) ? tablePaginationFiles[kind] ?? [] : []), ...(hasEmptyRefinementAuthorization(livePhaseStatus) ? emptyRefinementFiles[kind] ?? [] : []), ...(kind === "workspace" && hasInsideFieldLabelsAuthorization(livePhaseStatus) ? insideFieldLabelBrowserFiles : [])] : []]));
const formFiles = Object.fromEntries(Object.entries(bmBRn10Files).map(([kind, files]) => [kind, hasBmBRn10Authorization(livePhaseStatus) ? files : []]));
const layoutsV1Authorized = hasLayoutsV1Authorization(livePhaseStatus);
const layoutFiles = Object.fromEntries(Object.entries(layoutsV1Files).map(([kind, files]) => [kind, layoutsV1Authorized ? files : []]));
const dialogFiles = Object.fromEntries(Object.entries(dialogV2Files).map(([kind, files]) => [kind, hasDialogV2Authorization(livePhaseStatus) ? files : []]));
if (hasDialogRefinementAuthorization(livePhaseStatus)) {
  dialogFiles.documents.push("manifests/ui/alert-dialog.yaml");
  dialogFiles.workspace.push("evidence/runtime/dialog-refinement-2026-09-15/playwright.config.ts", "packages/foundations/src/overlay-token-contract.ts", "scripts/dialog-refinement.test.ts", "tests/e2e/dialog-refinement.spec.ts");
}
const numberFiles = Object.fromEntries(Object.entries(inputNumberFiles).map(([kind, files]) => [kind, hasInputNumberAuthorization(livePhaseStatus) ? files : []]));
const avatarFiles = Object.fromEntries(Object.entries(avatarFamilyFiles).map(([kind, files]) => [kind, hasAvatarFamilyAuthorization(livePhaseStatus) ? files : []]));
const cardV2Authorized = hasCardV2Authorization(livePhaseStatus);
const cardFiles = Object.fromEntries(Object.entries(cardV2Files).map(([kind, files]) => [kind, cardV2Authorized ? files : []]));
const isTokenFoundationsV1 = livePhaseStatus?.currentPhase?.id === "token-foundations-v1";
const dropdownBatchOneAuthorized = hasDropdownBatchOneAuthorization(livePhaseStatus);
const tagBatchThreeAuthorized = hasTagBatchThreeAuthorization(livePhaseStatus);
const tabsFiles = Object.fromEntries(Object.entries(getTabsRefinementFiles(livePhaseStatus)).map(([kind, files]) => [kind, files.filter(file => existsSync(join(workspaceRoot, file)))]));
if (livePhaseStatus?.componentRefinements?.tabs?.preflight === "passed") {
  const sources = new Map();
  for (const file of Object.values(getTabsRefinementFiles(livePhaseStatus)).flat()) {
    try { sources.set(file, readRegularNonSymbolicFile(join(workspaceRoot, file), file).toString("utf8")); }
    catch (error) { failures.push(`Tabs completed preflight cannot be audited: ${file}: ${error.message}`); }
  }
  let contract;
  try { contract = parseYamlSubset(readFileSync(join(workspaceRoot, "manifests/contracts/tailwind-b2.yaml"), "utf8")); }
  catch (error) { failures.push(`Tabs preflight contract cannot be audited: ${error.message}`); }
  failures.push(...validateTabsPreflightInventory({ status: livePhaseStatus, files: sources, protectedPaths: contract?.protectedPaths }));
}
const dropdownFiles = Object.fromEntries(Object.entries(dropdownBatchOneFiles).map(([kind, files]) => [kind, dropdownBatchOneAuthorized ? files : []]));
let phaseStatus = livePhaseStatus;
let inputAuthorized = false;
let selectAuthorized = false;
let iconButtonAuthorized = false;
let questionNumberAuthorized = false;
let optionButtonAuthorized = false;
let tagAuthorized = false;
let optionButtonContentAuthorized = false;
let questionOptionSizeReviewAuthorized = false;
let currentPhaseValidated = false;
if (isTokenFoundationsV1) {
  try {
    validateTokenFoundationsV1Phase(livePhaseStatus);
    currentPhaseValidated = true;
    inputAuthorized = hasInputRefinementAuthorization(livePhaseStatus);
    selectAuthorized = hasSelectRefinementAuthorization(livePhaseStatus);
    tagAuthorized = hasTagRefinementAuthorization(livePhaseStatus);
    iconButtonAuthorized = hasIconButtonRefinementAuthorization(livePhaseStatus);
    questionNumberAuthorized = hasQuestionNumberRefinementAuthorization(livePhaseStatus);
    optionButtonAuthorized = hasOptionButtonRefinementAuthorization(livePhaseStatus);
    optionButtonContentAuthorized = hasOptionButtonContentRefinementAuthorization(livePhaseStatus);
    questionOptionSizeReviewAuthorized = hasQuestionOptionSizeReviewAuthorization(livePhaseStatus);
    phaseStatus = getCurrentB2Status(livePhaseStatus);
  } catch (error) { failures.push(error.message); }
  for (const name of Object.values(tokenFoundationsV1Files).flat()) {
    const path = join(workspaceRoot, name);
    if (!existsSync(path)) continue;
    requireRealDirectoryChain(dirname(name), "Token Foundations V1 artifact parent");
    const stat = lstatSync(path);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size === 0) {
      failures.push(`Token Foundations V1 artifact must be a non-empty regular non-symbolic file: ${name}`);
    }
  }
  const evidenceRoot = "evidence/runtime/token-foundations-v1";
  requireRealDirectoryChain(evidenceRoot, "Token Foundations V1 evidence root");
  for (const path of collectFiles(join(workspaceRoot, evidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!tokenFoundationsV1Files.evidence.includes(name) || lstatSync(path).isSymbolicLink()) {
      failures.push(`Token Foundations V1 evidence outside the exact allowlist: ${name}`);
    }
  }
}
// Later local candidates extend the original Day 3 inventory only after its full parent policy validates.
const scopedFiles = { application: new Set(), ui: new Set(), layouts: new Set(), documents: new Set(), workspace: new Set() };
const tokenFirstG3Authorized = currentPhaseValidated && hasRecordedPostB2Refinement(livePhaseStatus, "tokenFirstV12G3");
const navigationAuthorized = currentPhaseValidated
  && livePhaseStatus.navigationComponentsV042?.authorization === "authorized"
  && livePhaseStatus.navigationComponentsV042?.humanGate === "accepted"
  && livePhaseStatus.navigationComponentsV042W6W8?.authorization === "authorized";
// These accepted record bytes define inventory; arbitrary edited JSON keys cannot grant source authorization.
const acceptedInventorySha256 = new Map([
  ["evidence/runtime/navigation-rebuild-v03/final-source-lock.json", "a32383a11c1a680f3f1feb178f3941acc6a0fadb71361e616ab1ff51b8fe0365"],
  ["evidence/runtime/navigation-v042/w7/final-source.json", "f5f529e45def311a61ce0b6bfb1cfc9e719e8501197b1bcec99c640ba661bb16"],
  ["evidence/runtime/navigation-v042/w6/review-02/final-source.json", "03dbe4ea246a33c8a31368e060e8a764e55854fbc85f1f25bb016cce8c0504d1"],
  ["evidence/runtime/navigation-v042/w7/regression-map.json", "1ed8a56c959e8f78c1f9bb29b7d7d3649310c7bfd20aae7be3ffcd162dee9847"],
]);
const recordedRegistries = currentPhaseValidated ? collectRecordedPostB2Documents(workspaceRoot, livePhaseStatus, failures).registries : [];
function readAcceptedInventory(file) {
  const source = readRegularNonSymbolicFile(join(workspaceRoot, file), file);
  if (createHash("sha256").update(source).digest("hex") !== acceptedInventorySha256.get(file)) throw new Error(`accepted inventory SHA-256 must match its immutable recorded bytes: ${file}`);
  return JSON.parse(source.toString("utf8"));
}
function addScopedFile(file, { required = false } = {}) {
  if (!isCanonicalRepositoryRelativePath(file)) { failures.push(`Scoped asset has a noncanonical source path: ${String(file)}`); return; }
  if (!existsSync(join(workspaceRoot, file))) { if (required) failures.push(`Scoped asset source is missing: ${file}`); return; }
  const kind = file.startsWith("apps/") ? "application" : file.startsWith("packages/ui/") ? "ui"
    : file.startsWith("packages/layouts/") ? "layouts" : /^(?:manifests|registry|docs\/adr)\//.test(file) ? "documents" : "workspace";
  scopedFiles[kind].add(file);
  scopedFiles.workspace.add(file);
  if (file.endsWith(".tsx")) addScopedFile(file.replace(/\.tsx$/, ".css"));
  if (file.endsWith(".css")) addScopedFile(`${file}.d.ts`);
}
function addRegisteredScope(registryPath) {
  try {
    if (!recordedRegistries.includes(registryPath)) throw new Error(`recorded Registry must match its immutable accepted bytes: ${registryPath}`);
    const registry = JSON.parse(readRegularNonSymbolicFile(join(workspaceRoot, registryPath), registryPath).toString("utf8"));
    if (registry.kind !== "RainLocalSourceRegistry" || registry.scope !== "current-workspace" || registry.publication !== "not-published") throw new Error("must retain current-workspace unpublished local-source identity");
    addScopedFile(registryPath, { required: true });
    const sources = new Set([...(registry.shared?.files ?? []), ...Object.keys(registry.sourceSnapshot?.filesSha256 ?? {})]);
    for (const item of registry.items ?? []) {
      for (const file of item.files ?? []) sources.add(file);
      if (!item.manifest) continue;
      addScopedFile(item.manifest, { required: true });
      const manifest = parseYamlSubset(readRegularNonSymbolicFile(join(workspaceRoot, item.manifest), item.manifest).toString("utf8"));
      if (manifest.publication !== "unpublished") throw new Error(`${item.manifest} must remain unpublished`);
      // The Registry binds source paths; mutable Manifest examples are descriptive, never an authorization input.
    }
    for (const file of sources) {
      addScopedFile(file, { required: true });
      // Companion test/declaration names are finite derivations of an explicitly registered source.
      if (/\.[jt]sx?$/.test(file) && !/\.test\./.test(file)) {
        addScopedFile(file.replace(/\.[jt]sx?$/, ".test.ts"));
        addScopedFile(file.replace(/\.[jt]sx?$/, ".test.tsx"));
      }
      if (file.endsWith(".css")) addScopedFile(`${file}.d.ts`);
      if (file.startsWith("packages/")) addScopedFile(`${dirname(file)}/README.md`);
    }
  } catch (error) { failures.push(`Scoped Registry cannot be audited: ${registryPath}: ${error.message}`); }
}
function addRecordedSourceKeys(file, field) {
  try {
    const record = readAcceptedInventory(file);
    for (const path of Object.keys(record[field] ?? {})) addScopedFile(path, { required: true });
  } catch (error) { failures.push(`Scoped source inventory cannot be audited: ${file}: ${error.message}`); }
}
if (currentPhaseValidated && g123PlaygroundAuthorized) {
  ["registry/g1-assets.json", "registry/g2-assets.json"].forEach(addRegisteredScope);
  [...g123PlaygroundFiles.application, ...g123PlaygroundFiles.ui, ...g123PlaygroundFiles.documents, ...g123PlaygroundFiles.workspace].forEach(file => addScopedFile(file, { required: true }));
}
if (g5Authorized) {
  try {
    getG5SourceBindings(workspaceRoot, livePhaseStatus);
    if (!recordedRegistries.includes("registry/g5-assets.json")) recordedRegistries.push("registry/g5-assets.json");
    addRegisteredScope("registry/g5-assets.json");
    Object.values(g5ComponentFiles).flat().forEach(file => addScopedFile(file, { required: true }));
    if (hasDateTimeOptimizationAuthorization(livePhaseStatus)) Object.values(dateTimeOptimizationFiles).flat().forEach(file => addScopedFile(file, { required: true }));
    if (hasDatePickerUxRefinementAuthorization(livePhaseStatus)) Object.values(datePickerUxRefinementFiles).flat().forEach(file => addScopedFile(file, { required: true }));
    if (hasDatePickerVisualFeedbackAuthorization(livePhaseStatus)) Object.values(datePickerVisualFeedbackFiles).flat().forEach(file => addScopedFile(file, { required: true }));
  } catch (error) { failures.push(`G5 Registry cannot be audited: ${error.message}`); }
}
if (g4Authorized) {
  try {
    getG4SourceBindings(workspaceRoot, livePhaseStatus);
    if (!recordedRegistries.includes("registry/g4-assets.json")) recordedRegistries.push("registry/g4-assets.json");
    addRegisteredScope("registry/g4-assets.json");
    [...g4ComponentFiles.application, ...g4ComponentFiles.ui, ...g4ComponentFiles.documents, ...g4ComponentFiles.workspace].forEach(file => addScopedFile(file, { required: true }));
    if (hasG4VisualRefinementAuthorization(livePhaseStatus)) g4VisualRefinementSourcePaths.forEach(file => addScopedFile(file, { required: true }));
    if (hasG4SizingReviewAuthorization(livePhaseStatus)) g4SizingReviewSourcePaths.forEach(file => addScopedFile(file, { required: true }));
  } catch (error) { failures.push(`G4 Registry cannot be audited: registry/g4-assets.json: ${error.message}`); }
}
if (currentPhaseValidated && buttonGroupRepairAuthorized) {
  [...buttonGroupRepairFiles.application, ...buttonGroupRepairFiles.ui, ...buttonGroupRepairFiles.documents, ...buttonGroupRepairFiles.workspace].forEach(file => addScopedFile(file, { required: true }));
}
if (currentPhaseValidated && hasRecordedPostB2Refinement(livePhaseStatus, "breadcrumbSingleSize")) {
  addRegisteredScope("registry/breadcrumb.json");
  ["apps/playground/src/docs/components/breadcrumb-page.tsx", "apps/playground/src/docs/components/breadcrumb-page.test.tsx", "tests/e2e/breadcrumb.spec.ts", "tests/e2e/breadcrumb.config.ts"].forEach(file => addScopedFile(file));
}
if (currentPhaseValidated && hasTreeAuthorization(livePhaseStatus)) {
  addRegisteredScope("registry/tree.json");
  ["packages/ui/src/tree/tree.renderers.test.tsx", "apps/playground/src/patterns/manage-tree/manage-tree.adapters.test.tsx", "apps/playground/src/patterns/manage-tree/README.md", "apps/playground/src/docs/components/tree-page.tsx", "apps/playground/src/docs/components/tree-page.test.tsx", "apps/playground/src/docs/components/tree-behavior-examples.tsx", "apps/playground/src/docs/components/manage-tree-page.tsx", "apps/playground/src/docs/components/manage-tree-domain-examples.tsx", "docs/adr/0011-tree-and-manage-tree-ownership.md", "scripts/tree-closeout.test.ts", "tests/e2e/tree.spec.ts", "tests/e2e/tree.config.ts"].forEach(file => addScopedFile(file));
}
if (tokenFirstG3Authorized) {
  addRegisteredScope("registry/token-first-g3.json");
  ["page.tsx", "page.css", "page.test.tsx", "README.md"].forEach(file => addScopedFile(`apps/prototype/src/scenarios/token-first-g3/${file}`));
  ["playwright.g3.config.ts", "tests/e2e/token-first-g3.spec.ts"].forEach(file => addScopedFile(file));
}
if (currentPhaseValidated && hasRecordedPostB2Refinement(livePhaseStatus, "tokenFirstG3NavigationRebuildV03")) {
  addRecordedSourceKeys("evidence/runtime/navigation-rebuild-v03/final-source-lock.json", "sourceFileSha256");
  ["README.md", "design-notes.md"].forEach(file => addScopedFile(`apps/prototype/src/scenarios/token-first-g3/rebuild/${file}`));
  ["M01", "M02", "N01", "N02", "N03", "N04", "S01", "S02", "S04", "S05", "S06", "S08"].forEach(name => addScopedFile(`apps/prototype/src/scenarios/token-first-g3/rebuild/references/${name}.png`));
  ["navigation-rebuild-reuse.spec.ts", "navigation-rebuild-select.ts", "navigation-rebuild-visual-feedback.spec.ts", "navigation-rebuild-visual-feedback-2.spec.ts"].forEach(file => addScopedFile(`tests/e2e/${file}`));
}
if (navigationAuthorized) {
  ["navigation-v042", "navigation-v042-w3", "navigation-v042-workspaces", "navigation-v042-recipes"].forEach(name => addRegisteredScope(`registry/${name}.json`));
  addRecordedSourceKeys("evidence/runtime/navigation-v042/w7/final-source.json", "filesSha256");
  addRecordedSourceKeys("evidence/runtime/navigation-v042/w6/review-02/final-source.json", "filesSha256");
  try {
    const map = readAcceptedInventory("evidence/runtime/navigation-v042/w7/regression-map.json");
    for (const test of map.cases ?? []) for (const file of test.testFiles ?? []) addScopedFile(file);
  } catch (error) { failures.push(`Navigation test inventory cannot be audited: ${error.message}`); }
  ["compare", "export", "reference", "review", "w3-compare", "w3-reference", "w4-compare", "w4-r2-regression", "w4-reference", "w5-compare", "w5-reference", "w5-stability", "w7-quality"].forEach(name => addScopedFile(`scripts/navigation-v042-${name}.mjs`));
  ["scripts/navigation-w7-colors.mjs", "scripts/navigation-w7-colors.test.ts", "scripts/navigation-w7-color-anatomy.mjs"].forEach(file => addScopedFile(file));
  ["", "-w3", "-w4", "-w5", "-w6", "-w7", "-r4-feedback", "-review07", "-review08", "-review09", "-review09-r1-r3", "-review10", "-w6-review01", "-w6-review02"].forEach(name => ["spec", "config"].forEach(kind => addScopedFile(`tests/e2e/navigation-v042${name}.${kind}.ts`)));
  ["w6-review01-compat.config", "w6-review02-compat.config", "review11-parent.config", "review11-platform.config", "review11-platform.spec", "review11-r1-r3.spec", "review11-r4-r6.spec", "review11-r4-r6-platform-footer.spec", "review11-r4-r6-platform-reopen.spec", "review11-root.spec"].forEach(name => addScopedFile(`tests/e2e/navigation-v042-${name}.ts`));
  addScopedFile("scripts/verify-boundaries-navigation.test.ts");
  ["packages/ui/src/navigation/README-W3.md", "packages/ui/src/navigation/navigation-isolation.browser.mjs", "packages/layouts/src/README-workspace.md", "packages/layouts/src/README-workspace-adapter.md", "apps/playground/src/recipes/navigation-v042/samples.tsx", "apps/playground/src/recipes/navigation-v042/README-W4.md", "apps/playground/src/recipes/navigation-v042/README-W5.md"].forEach(file => addScopedFile(file));
}
if (currentPhaseValidated && tokenFirstAuthorized) {
  // These two finite consumers are named by the original approved G1 workpack and its later workbench record.
  ["page.tsx", "page.css", "page.test.tsx", "README.md"].forEach(file => addScopedFile(`apps/prototype/src/scenarios/teacher-grading/${file}`));
  ["page.tsx", "page.css", "page.test.tsx", "state.ts", "state.test.ts", "design-notes.md"].forEach(file => addScopedFile(`apps/prototype/src/scenarios/exam-editor/${file}`));
  // Existing G1 review captures are data, but the application inventory still checks every concrete file.
  const examEditorCaptures = {
    "evidence": ["batch-dialog-1440.png", "batch-selection-1440.png", "browser-facts.json", "dialog-text-contrast.json", "page-1440.png"],
    "evidence/annotations": ["answer-expanded-1440.png", "batch-dialog-1440.png", "browser-facts.json", "page-1440.png", "question-hover-1440.png", "single-dialog-1440.png"],
    "evidence/annotations-2": ["browser-facts.json", "expanded-1669.png", "expanded-and-hover-1440.png", "move-dialog-1440.png", "page-1440.png"],
    "evidence/annotations-3": ["browser-facts.json", "move-dialog-1440.png", "page-1440.png", "page-1795.png"],
  };
  for (const [directory, files] of Object.entries(examEditorCaptures)) for (const file of files) addScopedFile(`apps/prototype/src/scenarios/exam-editor/${directory}/${file}`);
  ["apps/prototype/src/scenarios/token-first-g1/page.test.tsx", "tests/e2e/teacher-grading.spec.ts"].forEach(file => addScopedFile(file));
}
if (currentPhaseValidated && tokenFirstG2Authorized) addScopedFile("apps/prototype/src/scenarios/token-first-g2/README.md");
const tokenFirstG3Imports = new Map([
  ["command", ["autocomplete"]], ["context-menu", ["context-menu"]], ["hover-card", ["preview-card"]],
  ["menubar", ["menu", "menubar"]], ["navigation-menu", ["navigation-menu"]], ["scroll-area", ["scroll-area"]], ["sheet", ["drawer"]],
].map(([name, modules]) => [`packages/ui/src/${name}/${name}.tsx`, modules.map(module => `@base-ui/react/${module}`)]));
const g123HeadlessImports = new Map([
  ["accordion", ["accordion"]], ["collapsible", ["collapsible"]], ["button-group", ["merge-props", "use-render"]],
  ["toggle", ["toggle"]], ["toggle-group", ["toggle", "toggle-group"]], ["toast", ["toast"]],
].map(([name, modules]) => [`packages/ui/src/${name}/${name}.tsx`, modules.map(module => `@base-ui/react/${module}`)]));
const isScopedHeadlessImport = (file, specifier) => tokenFirstG3Authorized && tokenFirstG3Imports.get(file)?.includes(specifier)
  || g123PlaygroundAuthorized && g123HeadlessImports.get(file)?.includes(specifier)
  || g4Authorized && file === "packages/ui/src/item/item.tsx" && ["@base-ui/react/merge-props", "@base-ui/react/use-render"].includes(specifier)
  || g4Authorized && file === "packages/ui/src/progress/progress.tsx" && specifier === "@base-ui/react/progress"
  || g5Authorized && [["combobox", "combobox"], ["slider", "slider"]].some(([name, module]) => file === `packages/ui/src/${name}/${name}.tsx` && specifier === `@base-ui/react/${module}`);

const optionButtonFiles = Object.fromEntries(Object.entries(optionButtonRefinementFiles).map(([kind, files]) => [kind, [...(optionButtonAuthorized ? files : []), ...(optionButtonContentAuthorized ? optionButtonContentRefinementFiles[kind] ?? [] : [])]]));
const questionNumberFiles = Object.fromEntries(Object.entries(questionNumberRefinementFiles).map(([kind, files]) => [kind, [...(questionNumberAuthorized ? files : []), ...(hasQuestionOptionSizeRefinementAuthorization(livePhaseStatus) ? questionOptionSizeRefinementFiles[kind] ?? [] : [])]]));
const checkboxFiles = Object.fromEntries(Object.entries(checkboxSc01Files).map(([kind, files]) => [kind, hasCheckboxSc01Authorization(livePhaseStatus) ? files : []]));
const dropdownPublicFiles = Object.fromEntries(Object.entries(dropdownFamilyFiles).map(([kind, files]) => [kind, hasDropdownFamilyAuthorization(livePhaseStatus) ? files : []]));
const selectionPlaygroundFiles = Object.fromEntries(Object.entries(selectionPlaygroundSc04Files).map(([kind, files]) => [kind, hasSelectionPlaygroundSc04Authorization(livePhaseStatus) ? files : []]));
const selectionPatternFiles = Object.fromEntries(Object.entries(selectionPatternsSc03Files).map(([kind, files]) => [kind, hasSelectionPatternsSc03Authorization(livePhaseStatus) ? files : []]));
const selectionCardFiles = Object.fromEntries(Object.entries(selectionCardsSc02Files).map(([kind, files]) => [kind, hasSelectionCardsSc02Authorization(livePhaseStatus) ? files : []]));
const radioFiles = Object.fromEntries(Object.entries(radioSc01Files).map(([kind, files]) => [kind, hasRadioSc01Authorization(livePhaseStatus) ? files : []]));
const switchFiles = Object.fromEntries(Object.entries(switchSc01Files).map(([kind, files]) => [kind, hasSwitchSc01Authorization(livePhaseStatus) ? files : []]));
const inputFiles = Object.fromEntries(Object.entries(inputRefinementFiles).map(([kind, files]) => [kind, inputAuthorized ? files : []]));
const selectFiles = Object.fromEntries(Object.entries(selectRefinementFiles).map(([kind, files]) => [kind, selectAuthorized ? files : []]));
const tagFiles = Object.fromEntries(Object.entries(tagRefinementFiles).map(([kind, files]) => [kind, [
  ...(tagAuthorized ? files : []), ...(hasTagBatchTwoRefinementAuthorization(livePhaseStatus) ? tagBatchTwoRefinementFiles[kind] ?? [] : []),
  ...(tagBatchThreeAuthorized ? (tagBatchThreeFiles[kind] ?? []).filter((file) => livePhaseStatus.componentRefinements.tagBatchThree.implementation === "completed" || existsSync(join(workspaceRoot, file))) : []),
]]));
const iconButtonFiles = Object.fromEntries(Object.entries(iconButtonRefinementFiles).map(([kind, files]) => [kind, iconButtonAuthorized ? files : []]));
const sizeReviewFiles = Object.fromEntries(Object.entries(questionOptionSizeReviewFiles).map(([kind, files]) => [kind, questionOptionSizeReviewAuthorized ? files : []]));
for (const name of [...Object.values(tabsFiles).flat(), ...Object.values(iconButtonFiles).flat(), ...Object.values(inputFiles).flat(), ...Object.values(selectFiles).flat(), ...Object.values(tagFiles).flat(), ...Object.values(dropdownPublicFiles).flat(), ...Object.values(checkboxFiles).flat(), ...Object.values(selectionCardFiles).flat(), ...Object.values(selectionPatternFiles).flat(), ...Object.values(selectionPlaygroundFiles).flat(), ...Object.values(radioFiles).flat(), ...Object.values(switchFiles).flat()]) {
  const path = join(workspaceRoot, name);
  if (!existsSync(path)) continue;
  requireRealDirectoryChain(dirname(name), "IconButton artifact parent");
  try {
    const contents = readRegularNonSymbolicFile(path, "IconButton artifact");
    if (name.endsWith(".png")) inspectPngMetadata(contents);
  } catch (error) { failures.push(`${name}: ${error.message}`); }
}
for (const path of ["evidence/runtime/tabs", "evidence/runtime/tabs-visual-refinement"].flatMap(directory => collectFiles(join(workspaceRoot, directory)))) {
  const name = relative(workspaceRoot, path);
  if (!tabsFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`Tabs evidence outside its exact authorization: ${name}`);
}
for (const name of Object.values(questionNumberFiles).flat()) {
  const path = join(workspaceRoot, name);
  if (!existsSync(path)) continue;
  requireRealDirectoryChain(dirname(name), "QuestionNumber artifact parent");
  try {
    const contents = readRegularNonSymbolicFile(path, "QuestionNumber artifact");
    if (name.endsWith(".png")) inspectPngMetadata(contents);
  } catch (error) { failures.push(`${name}: ${error.message}`); }
}
for (const name of Object.values(optionButtonFiles).flat()) {
  const path = join(workspaceRoot, name);
  if (!existsSync(path)) continue;
  requireRealDirectoryChain(dirname(name), "OptionButton artifact parent");
  try {
    const contents = readRegularNonSymbolicFile(path, "OptionButton artifact");
    if (name.endsWith(".png")) inspectPngMetadata(contents);
  } catch (error) { failures.push(`${name}: ${error.message}`); }
}
const optionButtonEvidenceRoot = "evidence/runtime/option-button";
if (existsSync(join(workspaceRoot, optionButtonEvidenceRoot))) {
  requireRealDirectoryChain(optionButtonEvidenceRoot, "OptionButton evidence root");
  for (const path of collectFiles(join(workspaceRoot, optionButtonEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!optionButtonFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`OptionButton evidence outside the exact authorization: ${name}`);
  }
}
const optionButtonContentEvidenceRoot = "evidence/runtime/option-button-content";
if (existsSync(join(workspaceRoot, optionButtonContentEvidenceRoot))) {
  requireRealDirectoryChain(optionButtonContentEvidenceRoot, "OptionButton content evidence root");
  for (const path of collectFiles(join(workspaceRoot, optionButtonContentEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!optionButtonContentAuthorized || !optionButtonContentRefinementFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`OptionButton content evidence outside the exact authorization: ${name}`);
  }
}
const questionNumberEvidenceRoot = "evidence/runtime/question-number";
if (existsSync(join(workspaceRoot, questionNumberEvidenceRoot))) {
  requireRealDirectoryChain(questionNumberEvidenceRoot, "QuestionNumber evidence root");
  for (const path of collectFiles(join(workspaceRoot, questionNumberEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!questionNumberFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`QuestionNumber evidence outside the exact authorization: ${name}`);
  }
}
const checkboxEvidenceRoot = "evidence/runtime/checkbox";
if (existsSync(join(workspaceRoot, checkboxEvidenceRoot))) {
  requireRealDirectoryChain(checkboxEvidenceRoot, "Checkbox evidence root");
  for (const path of collectFiles(join(workspaceRoot, checkboxEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!checkboxFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`Checkbox evidence outside the exact authorization: ${name}`);
  }
}
const selectionPlaygroundEvidenceRoot = "evidence/runtime/selection-playground";
if (existsSync(join(workspaceRoot, selectionPlaygroundEvidenceRoot))) {
  requireRealDirectoryChain(selectionPlaygroundEvidenceRoot, "Selection Playground evidence root");
  for (const path of collectFiles(join(workspaceRoot, selectionPlaygroundEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!selectionPlaygroundFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`Selection Playground evidence outside the exact authorization: ${name}`);
  }
}
const selectionPatternEvidenceRoot = "evidence/runtime/selection-patterns";
if (existsSync(join(workspaceRoot, selectionPatternEvidenceRoot))) {
  requireRealDirectoryChain(selectionPatternEvidenceRoot, "Selection Pattern evidence root");
  for (const path of collectFiles(join(workspaceRoot, selectionPatternEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!selectionPatternFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`Selection Pattern evidence outside the exact authorization: ${name}`);
  }
}
const selectionCardEvidenceRoot = "evidence/runtime/selection-cards";
if (existsSync(join(workspaceRoot, selectionCardEvidenceRoot))) {
  requireRealDirectoryChain(selectionCardEvidenceRoot, "Selection card evidence root");
  for (const path of collectFiles(join(workspaceRoot, selectionCardEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!selectionCardFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`Selection card evidence outside the exact authorization: ${name}`);
  }
}
const dropdownPublicEvidenceRoot = "evidence/runtime/dropdown";
if (existsSync(join(workspaceRoot, dropdownPublicEvidenceRoot))) {
  requireRealDirectoryChain(dropdownPublicEvidenceRoot, "Dropdown evidence root");
  for (const path of collectFiles(join(workspaceRoot, dropdownPublicEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!dropdownPublicFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`Dropdown evidence outside the exact authorization: ${name}`);
  }
}
const radioEvidenceRoot = "evidence/runtime/radio";
if (existsSync(join(workspaceRoot, radioEvidenceRoot))) {
  requireRealDirectoryChain(radioEvidenceRoot, "Radio evidence root");
  for (const path of collectFiles(join(workspaceRoot, radioEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!radioFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`Radio evidence outside the exact authorization: ${name}`);
  }
}
const inputEvidenceRoot = "evidence/runtime/input";
const selectEvidenceRoot = "evidence/runtime/select";
if (existsSync(join(workspaceRoot, selectEvidenceRoot))) {
  requireRealDirectoryChain(selectEvidenceRoot, "Select evidence root");
  for (const path of collectFiles(join(workspaceRoot, selectEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!selectFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`Select evidence outside the exact authorization: ${name}`);
  }
}
const tagEvidenceRoot = "evidence/runtime/tag-batch-one";
if (existsSync(join(workspaceRoot, tagEvidenceRoot))) {
  requireRealDirectoryChain(tagEvidenceRoot, "Tag evidence root");
  for (const path of collectFiles(join(workspaceRoot, tagEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!tagFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`Tag evidence outside the exact authorization: ${name}`);
  }
}
if (existsSync(join(workspaceRoot, inputEvidenceRoot))) {
  requireRealDirectoryChain(inputEvidenceRoot, "Input evidence root");
  for (const path of collectFiles(join(workspaceRoot, inputEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!inputFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`Input evidence outside the exact authorization: ${name}`);
  }
}
const iconButtonEvidenceRoot = "evidence/runtime/icon-button";
if (existsSync(join(workspaceRoot, iconButtonEvidenceRoot))) {
  requireRealDirectoryChain(iconButtonEvidenceRoot, "IconButton evidence root");
  for (const path of collectFiles(join(workspaceRoot, iconButtonEvidenceRoot))) {
    const name = relative(workspaceRoot, path);
    if (!iconButtonFiles.evidence.includes(name) || lstatSync(path).isSymbolicLink()) failures.push(`IconButton evidence outside the exact authorization: ${name}`);
  }
}
const phaseId = phaseStatus?.currentPhase?.id;
const isDayOne = phaseId === "foundation-spike-day-1";
const isDayTwo = phaseId === "foundation-spike-day-2";
const isDayThree = phaseId === "foundation-spike-day-3";
const isTailwindB2 = phaseId === "tailwind-b2-composition-contract";
const currentPhaseStatus = phaseStatus;
let historicalDayThreeStatus;
const packageFiles = discoverPackageFiles();

function assertExact(label, actual, expected) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    failures.push(
      `${label} mismatch: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`,
    );
  }
}

if (!phaseId) {
  failures.push("status/current-phase.yaml must declare currentPhase.id");
} else if (!isDayOne && !isDayTwo && !isDayThree && !isTailwindB2) {
  failures.push(
    `no explicit boundary policy exists for phase ${phaseId}; add and test a policy before changing phases`,
  );
}

if (isTailwindB2) {
  try {
    validateTailwindB2Phase(phaseStatus);
    historicalDayThreeStatus = getValidatedDayThreeHistory(phaseStatus);
  } catch (error) {
    failures.push(error.message);
  }
  // Task 1 opens the phase contract only. Later tasks must explicitly extend the
  // source/dependency/evidence policy before pilot completion can be declared.
  if (phaseStatus.currentPhase.progress === "tailwind-b2-pilot-completed") {
    failures.push("B2 pilot completion is unavailable at the phase-entry contract; later implementation and evidence gates remain required");
  }
  if (phaseStatus.independentLifecycle?.automatedVerification === "passed") {
    failures.push("B2 full verification cannot be passed at phase entry; only targeted governance checks exist before the runtime pilot and benchmark");
  }
  for (const filePath of [
    "docs/adr/0002-tailwind-b2-local-fork.md",
    "docs/plans/2026-09-03-tailwind-b2-local-fork-design.md",
    "docs/plans/2026-09-03-tailwind-b2-local-fork-implementation.md",
  ]) {
    try {
      const stat = lstatSync(join(workspaceRoot, filePath));
      if (!stat.isFile() || stat.isSymbolicLink() || stat.size === 0) {
        failures.push(`B2 phase-entry artifact must be a non-empty regular file: ${filePath}`);
      }
    } catch {
      failures.push(`B2 phase-entry artifact is missing: ${filePath}`);
    }
  }

  const taskTwoFiles = [
    "benchmarks/tailwind-b2-ai-editability.yaml",
    "evidence/runtime/tailwind-b2/README.md",
    "evidence/runtime/tailwind-b2/baseline-results.yaml",
    "scripts/verify-tailwind-b2.mjs",
    "scripts/verify-tailwind-b2.test.ts",
  ];
  for (const filePath of taskTwoFiles) {
    try {
      const stat = lstatSync(join(workspaceRoot, filePath));
      if (!stat.isFile() || stat.isSymbolicLink() || stat.size === 0) {
        failures.push(`B2 Task 2 artifact must be a non-empty regular file: ${filePath}`);
      }
    } catch {
      failures.push(`B2 Task 2 artifact is missing: ${filePath}`);
    }
  }
  requireRealDirectoryChain("benchmarks", "Tailwind B2 benchmark root");
  requireRealDirectoryChain("evidence/runtime/tailwind-b2", "Tailwind B2 evidence root");
  requireRealDirectoryChain(
    "evidence/runtime/tailwind-b2/trials/state-objects/sha256",
    "Tailwind B2 state-object root",
  );
  const expectedBenchmarkFiles = [
    "benchmarks/README.md",
    "benchmarks/benchmark-registry.yaml",
    "benchmarks/tailwind-b2-ai-editability.yaml",
  ].sort();
  const actualBenchmarkFiles = collectFiles(
    join(workspaceRoot, "benchmarks"),
    { ignoreNamedNodeModules: false },
  )
    .map((filePath) => relative(workspaceRoot, filePath))
    .sort();
  for (const filePath of actualBenchmarkFiles) {
    if (!expectedBenchmarkFiles.includes(filePath)) {
      failures.push(`Task 2 benchmark file outside the exact allowlist: ${filePath}`);
    }
  }
  for (const filePath of expectedBenchmarkFiles) {
    if (!actualBenchmarkFiles.includes(filePath)) {
      failures.push(`Task 2 benchmark allowlist file is missing: ${filePath}`);
    }
  }
  const referencedTaskTwoEvidence = [];
  const referencedStateManifests = new Set();
  try {
    const baselinePath = join(workspaceRoot, "evidence/runtime/tailwind-b2/baseline-results.yaml");
    const baseline = parseYamlSubset(
      readRegularNonSymbolicFile(
        baselinePath,
        "Task 2 baseline-results.yaml",
      ).toString("utf8"),
    );
    const registerTaskTwoEvidence = (artifactPath, extension, label, { shared = false } = {}) => {
      if (
        !isCanonicalRepositoryRelativePath(artifactPath) ||
        !artifactPath.startsWith("evidence/runtime/tailwind-b2/trials/") ||
        !artifactPath.endsWith(extension)
      ) {
        failures.push(`Task 2 ${label} path is outside the governed trial evidence directory: ${String(artifactPath)}`);
        return;
      }
      if (referencedTaskTwoEvidence.includes(artifactPath)) {
        if (!shared) failures.push(`Task 2 runtime evidence path is referenced more than once: ${artifactPath}`);
        return;
      }
      referencedTaskTwoEvidence.push(artifactPath);
    };
    const artifactContracts = {
      diff: { statuses: ["captured"], extension: ".patch" },
      screenshot: { statuses: ["captured"], extension: ".png" },
      targetedTests: { statuses: ["passed", "failed"], extension: ".log" },
    };
    if (baseline.fixture?.status === "prepared") {
      registerTaskTwoEvidence(
        baseline.fixture.stateManifest?.path,
        ".log",
        "fixture state manifest",
        { shared: true },
      );
      referencedStateManifests.add(baseline.fixture.stateManifest?.path);
    }
    for (const trial of baseline.results ?? []) {
      for (const [artifactName, contract] of Object.entries(artifactContracts)) {
        const artifact = trial.artifacts?.[artifactName];
        if (!contract.statuses.includes(artifact?.status)) continue;
        registerTaskTwoEvidence(artifact?.path, contract.extension, `${artifactName} artifact`);
      }
      if (trial.run?.status === "recorded") {
        for (const manifestName of ["runManifest", "startStateManifest", "endStateManifest"]) {
          registerTaskTwoEvidence(
            trial.run[manifestName]?.path,
            ".log",
            `${manifestName}`,
            { shared: true },
          );
          if (manifestName !== "runManifest") {
            referencedStateManifests.add(trial.run[manifestName]?.path);
          }
        }
      }
      if (trial.start?.prerequisiteAssembly?.status === "recorded") {
        registerTaskTwoEvidence(
          trial.start.prerequisiteAssembly.assembledStateManifest?.path,
          ".log",
          "assembledStateManifest",
          { shared: true },
        );
        referencedStateManifests.add(
          trial.start.prerequisiteAssembly.assembledStateManifest?.path,
        );
        registerTaskTwoEvidence(
          trial.start.prerequisiteAssembly.resolutionPatch?.path,
          ".patch",
          "assembly resolution patch",
        );
      }
    }
    for (const manifestPath of referencedStateManifests) {
      if (typeof manifestPath !== "string") continue;
      let manifest;
      try {
        manifest = JSON.parse(
          readRegularNonSymbolicFile(
            join(workspaceRoot, manifestPath),
            `Task 2 state manifest ${manifestPath}`,
          ).toString("utf8"),
        );
      } catch (error) {
        failures.push(`Task 2 state manifest object references cannot be audited for ${manifestPath}: ${error.message}`);
        continue;
      }
      for (const [index, file] of (manifest.functionalState?.files ?? []).entries()) {
        const expectedPath = `evidence/runtime/tailwind-b2/trials/state-objects/sha256/${file.sha256}.blob`;
        if (file.objectPath !== expectedPath) {
          failures.push(`Task 2 state object path must be derived from its SHA-256 in ${manifestPath} entry ${index}`);
          continue;
        }
        registerTaskTwoEvidence(file.objectPath, ".blob", "state object", { shared: true });
        const objectPath = join(workspaceRoot, file.objectPath);
        try {
          const stat = lstatSync(objectPath);
          if (!stat.isFile() || stat.isSymbolicLink()) {
            failures.push(`Task 2 state object must be a regular non-symbolic file: ${file.objectPath}`);
            continue;
          }
          const source = readFileSync(objectPath);
          const digest = createHash("sha256").update(source).digest("hex");
          if (file.byteSize !== source.length || file.sha256 !== digest) {
            failures.push(`Task 2 state object bytes must match manifest size and SHA-256: ${file.objectPath}`);
          }
        } catch (error) {
          failures.push(`Task 2 referenced state object is missing or unreadable: ${file.objectPath} (${error.message})`);
        }
      }
    }
  } catch (error) {
    failures.push(`Task 2 runtime evidence references cannot be audited: ${error.message}`);
  }
  const expectedTaskTwoEvidenceFiles = [
    "evidence/runtime/tailwind-b2/README.md",
    "evidence/runtime/tailwind-b2/baseline-results.yaml",
    ...referencedTaskTwoEvidence,
  ].sort();
  const actualTaskTwoEvidenceFiles = collectFiles(
    join(workspaceRoot, "evidence/runtime/tailwind-b2"),
    { ignoreNamedNodeModules: false },
  )
    .map((filePath) => relative(workspaceRoot, filePath))
    .sort();
  for (const filePath of actualTaskTwoEvidenceFiles) {
    if (!expectedTaskTwoEvidenceFiles.includes(filePath)) {
      failures.push(`Task 2 runtime evidence outside the exact allowlist: ${filePath}`);
    }
  }
  for (const filePath of expectedTaskTwoEvidenceFiles) {
    if (!actualTaskTwoEvidenceFiles.includes(filePath)) {
      failures.push(`Task 2 runtime evidence allowlist file is missing: ${filePath}`);
    }
  }
}

if (isDayOne) {
  if (
    phaseStatus.currentPhase.status !== "authorized" ||
    phaseStatus.currentPhase.authorizationScope !==
      "day-1-runtime-scaffold-and-quality-gates"
  ) {
    failures.push("Day 1 phase authorization is not exact");
  }
  assertExact("Day 1 allowedActions", phaseStatus.allowedActions, [
    "只读检查已登记的 Figma 来源节点",
    "保存来源节点截图作为 Visual Evidence 复核产物",
    "更新 Visual Evidence 与 Benchmark 的现场复核状态",
    "创建或修订审计、计划、治理和状态文档",
    "执行文档、YAML、引用、截图和 Git 工作区的只读或非运行时验证",
    "安装 Day 1 实施计划明确列出的最小依赖",
    "初始化最小 React、Vite、Tailwind 运行骨架",
    "建立测试基础设施、质量门、证据入口与扁平 Overview",
  ]);
  assertExact("Day 1 blockedActions", phaseStatus.blockedActions, [
    "安装 Day 1 实施计划范围外的依赖或执行依赖升级",
    "实现公共组件、Layout 或 Benchmark 页面",
    "批量安装或复制 shadcn 资产",
    "执行 Figma 写入或发布 Figma Component/Variant",
    "创建本地 Git commit",
    "创建或配置远程仓库、push、PR 或 merge",
    "发布包、源码 Registry 或执行业务迁移",
  ]);
  const runtimeCheckpoint = phaseStatus.checkpoints?.find(
    ({ id }) => id === "day-1-runtime-start",
  );
  assertExact(
    "Day 1 checkpoint IDs",
    phaseStatus.checkpoints?.map(({ id }) => id),
    ["day-1-runtime-start"],
  );
  if (runtimeCheckpoint?.status !== "authorized") {
    failures.push("day-1-runtime-start checkpoint must remain explicitly authorized");
  }
  assertExact("Day 1 checkpoint unlocks", runtimeCheckpoint?.unlocks, [
    "依赖安装",
    "最小运行骨架",
    "测试基础设施",
  ]);

  const expectedDayOneLifecycle = {
    visualEvidence: "live-reinspected",
    benchmark: "registered",
    implementation: "in-progress",
    implementationScope: "day-1-task-1-and-task-2-completed",
    automatedVerification: "passed",
    automatedVerificationScope: "day-1-pnpm-verify",
    automatedVerificationEvidence:
      "pnpm-verify-governance-typecheck-vitest-build-chromium-e2e",
    humanGate: "not-evaluated",
    figmaEditableMaterial: "not-authorized",
    figmaComponentPublication: "not-authorized",
    packageOrRegistryPublication: "not-authorized",
    businessMigration: "not-authorized",
    localGitCommit: "not-created",
    remoteGit: "not-configured",
  };
  if (
    JSON.stringify(phaseStatus.independentLifecycle) !==
    JSON.stringify(expectedDayOneLifecycle)
  ) {
    failures.push(
      "Day 1 independentLifecycle must preserve exact implementation, verification, Human Gate, publication, and Git states",
    );
  }
  if (phaseStatus.currentPhase.progress !== "task-1-and-task-2-completed") {
    failures.push("Day 1 progress must be scoped to completed Task 1 and Task 2 only");
  }
  assertExact("Day 1 pending local commits", phaseStatus.pendingGitActions, {
    localCommits: [
      {
        message: "chore: scaffold rain next spike workspace",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
      {
        message: "test: add playground and evidence quality gates",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
    ],
  });

  const expectedDayOneContractHashes = {
    "pnpm-lock.yaml":
      "2b459950686b50935fceff05e35a2ff8c76902072d6a1c211c2dc0e6ba3e1d71",
    "tsconfig.base.json":
      "fabf20400ad19b68965b95a530a0ca6e5165a44c803c50c8fb29c91ac85fddd5",
    "apps/playground/tsconfig.json":
      "874753eacd3f357ec0943f448fabf4330917fd8593909753bdcba1224801fbff",
    "apps/playground/vite.config.ts":
      "e63f2245bf7c5a094357bf2b04ba59dc20eea282dcd406cf39aba7ed8f580690",
    "apps/playground/src/main.tsx":
      "e416bd9301caa45509d9a428f005443c0a896533e4f7fd50e2d764e2eecf4e33",
    "apps/playground/src/app.tsx":
      "72d8612e5a1a2f4bb6935394b5abdbd83f2a6d777f792425730614883177fba6",
    "apps/playground/src/styles.css":
      "e177b3c6b4c3b3cd9acabbf4168b06c79823a8f092e9648fb9183393e5716b42",
    "apps/playground/src/docs/evidence-index.ts":
      "ec1ed5eebf79b0ad0cbf93ab63aba81c1690c93189a42df7eec97d7609dafb36",
    "apps/playground/src/docs/benchmark-index.ts":
      "80e46cbfbd74205413bc558f98b1f33674fb4c349054e8964715644f6fa6579b",
    "apps/playground/src/routes/route-registry.ts":
      "c06d0ba67273980d1bc2d675b3b8ea125b3feea6bc244ba00d937b45f87c00f8",
    "apps/playground/src/routes/overview-page.tsx":
      "e3834457a5c0031a1fbd90958726dc9c156418b20c1443a0123e231e77e5d35d",
    "vitest.config.ts":
      "b35a3fb10725188d9102c6c7238f7924a45c9e311f66a5b7f56682afdf62338b",
    "playwright.config.ts":
      "75b501fae911a415e5f942cfc309b44fba58c5c37902695a65de49e50997633a",
    "tests/setup.ts":
      "027df60e5248c77994462dc39bbd1e4b762c7fb9709a081c1f0adbb8b0b6ac86",
    "tests/e2e/playground-shell.spec.ts":
      "306603c5ddc65a57b06d44686169e923a856e88ae471998cde53c3ef0784363e",
    "apps/playground/src/routes/playground-shell.test.tsx":
      "233e65f865ff553b43ea36048b2065cca088970f0eefe79e814000022411ec59",
    "scripts/verification-helpers.test.ts":
      "c08a57603f6800014cfdf3aa449248a8fb5d5df44596d0c5afe7cfda1c145aef",
  };
  for (const [filePath, expectedHash] of Object.entries(
    expectedDayOneContractHashes,
  )) {
    const actualHash = createHash("sha256")
      .update(readFileSync(join(workspaceRoot, filePath)))
      .digest("hex");
    if (actualHash !== expectedHash) {
      failures.push(
        `${filePath} changed without updating the explicit Day 1 implementation and verification contract`,
      );
    }
  }

  try {
    const gitRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    if (gitRoot !== workspaceRoot) {
      failures.push(`Git root must be the spike workspace, received ${gitRoot}`);
    }
  } catch (error) {
    failures.push(`Git workspace cannot be audited: ${error.message}`);
  }

  let hasLocalCommit = false;
  try {
    execFileSync("git", ["rev-parse", "--verify", "HEAD"], {
      cwd: workspaceRoot,
      stdio: "ignore",
    });
    hasLocalCommit = true;
  } catch {
    hasLocalCommit = false;
  }
  if (hasLocalCommit) {
    failures.push(
      "Git has a local HEAD commit while Day 1 localGitCommit is not-created",
    );
  }

  try {
    const remotes = execFileSync("git", ["remote"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
      .trim()
      .split(/\r?\n/)
      .filter(Boolean);
    if (remotes.length > 0) {
      failures.push(
        `Git has configured remotes while Day 1 remoteGit is not-configured: ${remotes.join(", ")}`,
      );
    }
  } catch (error) {
    failures.push(`Git remotes cannot be audited: ${error.message}`);
  }

  assertExact("Day 1 package manifest set", packageFiles, [
    "apps/playground/package.json",
    "package.json",
  ]);
  const expectedDependencySets = {
    "package.json": {
      dependencies: {},
      devDependencies: {
        "@playwright/test": "^1.62.1",
        "@tailwindcss/vite": "^4.3.3",
        "@testing-library/jest-dom": "^7.0.1",
        "@testing-library/react": "^16.3.3",
        "@testing-library/user-event": "^14.6.6",
        "@vitejs/plugin-react": "^6.1.1",
        jsdom: "^29.1.1",
        tailwindcss: "^4.3.3",
        typescript: "^7.0.2",
        vite: "^8.2.2",
        vitest: "^4.1.11",
      },
      peerDependencies: {},
      optionalDependencies: {},
    },
    "apps/playground/package.json": {
      dependencies: { react: "^19.2.8", "react-dom": "^19.2.8" },
      devDependencies: {
        "@types/react": "^19.2.18",
        "@types/react-dom": "^19.2.5",
      },
      peerDependencies: {},
      optionalDependencies: {},
    },
  };

  if (g5Authorized && expectedDependencySets["packages/ui/package.json"]) expectedDependencySets["packages/ui/package.json"].dependencies = Object.fromEntries(Object.entries({ ...expectedDependencySets["packages/ui/package.json"].dependencies, "react-day-picker": "9.13.2" }).sort());
  if (g123PlaygroundAuthorized && expectedDependencySets["packages/ui/package.json"]) expectedDependencySets["packages/ui/package.json"].dependencies = Object.fromEntries(Object.entries({ ...expectedDependencySets["packages/ui/package.json"].dependencies, "react-resizable-panels": "4.12.4" }).sort());
  if (tokenFirstAuthorized) expectedDependencySets["apps/prototype/package.json"].dependencies = Object.fromEntries(Object.entries({ ...expectedDependencySets["apps/prototype/package.json"].dependencies, "@base-ui/react": "1.8.0", "class-variance-authority": "0.7.1", ...(tokenFirstNextAuthorized ? { "react-resizable-panels": "4.12.4" } : {}) }).sort());
  function normalizedDependencyMap(dependencies) {
    return Object.fromEntries(Object.entries(dependencies ?? {}).sort());
  }

  for (const packageFile of packageFiles) {
    const document = loadPackage(packageFile);
    if (!document) {
      continue;
    }
    const expectedManifestKeys =
      packageFile === "package.json"
        ? [
            "devDependencies",
            "engines",
            "name",
            "packageManager",
            "private",
            "scripts",
            "type",
            "version",
          ]
        : [
            "dependencies",
            "devDependencies",
            "name",
            "private",
            "scripts",
            "type",
            "version",
          ];
    assertExact(
      `${packageFile} Day 1 manifest shape`,
      Object.keys(document).sort(),
      expectedManifestKeys,
    );
    if (packageFile === "apps/playground/package.json") {
      assertExact("Playground Day 1 scripts", document.scripts, {
        dev: "vite --host 127.0.0.1",
        build: "tsc --noEmit --project tsconfig.json && vite build",
        typecheck: "tsc --noEmit --project tsconfig.json",
      });
    } else {
      assertExact("Root Day 1 scripts", document.scripts, {
        dev: "pnpm --filter @rain-next/playground dev",
        build: "pnpm -r build",
        typecheck: "pnpm -r typecheck",
        test: "vitest run",
        "test:e2e": "playwright test",
        "verify:lockfile":
          "pnpm install --lockfile-only --frozen-lockfile --offline --ignore-scripts",
        "verify:workspace": "node scripts/verify-workspace.mjs",
        "verify:evidence": "node scripts/verify-evidence.mjs",
        "verify:boundaries": "node scripts/verify-boundaries.mjs",
        "verify:governance":
          "pnpm verify:lockfile && pnpm verify:workspace && pnpm verify:evidence && pnpm verify:boundaries",
        verify:
          "pnpm verify:governance && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e",
      });
    }
    const directDependencies = new Set([
      ...Object.keys(document.dependencies ?? {}),
      ...Object.keys(document.devDependencies ?? {}),
      ...Object.keys(document.peerDependencies ?? {}),
      ...Object.keys(document.optionalDependencies ?? {}),
    ]);
    const actualDependencySets = {
      dependencies: normalizedDependencyMap(document.dependencies),
      devDependencies: normalizedDependencyMap(document.devDependencies),
      peerDependencies: normalizedDependencyMap(document.peerDependencies),
      optionalDependencies: normalizedDependencyMap(document.optionalDependencies),
    };
    assertExact(
      `${packageFile} Day 1 dependency allowlist`,
      actualDependencySets,
      expectedDependencySets[packageFile],
    );
    for (const dependency of directDependencies) {
      if (isDayOneForbiddenDependency(dependency)) {
        failures.push(
          `${packageFile} installs Day 4/5 dependency ${dependency} during Day 1`,
        );
      }
    }

    for (const lifecycleScript of [
      "preinstall",
      "install",
      "postinstall",
      "prepare",
      "prepublish",
      "prepublishOnly",
    ]) {
      if (Object.hasOwn(document.scripts ?? {}, lifecycleScript)) {
        failures.push(
          `${packageFile} must not add lifecycle script ${lifecycleScript} during Day 1`,
        );
      }
    }
  }

  for (const forbiddenResolutionFile of [
    ".npmrc",
    ".pnpmfile.cjs",
    "pnpmfile.cjs",
    ".yarnrc",
    ".yarnrc.yml",
    "npm-shrinkwrap.json",
  ]) {
    if (existsSync(join(workspaceRoot, forbiddenResolutionFile))) {
      failures.push(
        `${forbiddenResolutionFile} is not authorized during Day 1 dependency setup`,
      );
    }
  }
}

const applicationFiles = collectFiles(join(workspaceRoot, "apps/playground/src"));
const applicationSources = applicationFiles.filter((filePath) =>
  /\.(?:[cm]?[jt]sx?|css)$/.test(filePath),
);

if (isDayOne) {
  const allowedDayOneApplicationSources = new Set(
    [
      "apps/playground/src/main.tsx",
      "apps/playground/src/app.tsx",
      "apps/playground/src/styles.css",
      "apps/playground/src/docs/evidence-index.ts",
      "apps/playground/src/docs/benchmark-index.ts",
      "apps/playground/src/routes/route-registry.ts",
      "apps/playground/src/routes/overview-page.tsx",
      "apps/playground/src/routes/playground-shell.test.tsx",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );

  for (const filePath of applicationSources) {
    if (!allowedDayOneApplicationSources.has(filePath)) {
      failures.push(
        `application implementation outside the Day 1 allowlist: ${relative(workspaceRoot, filePath)}`,
      );
    }

    const source = readFileSync(filePath, "utf8");
    if (/<(?:nav|aside)\b/i.test(source)) {
      failures.push(
        `persistent navigation or platform sidebar found in ${relative(workspaceRoot, filePath)}`,
      );
    }
    if (
      /(?:from\s+|import\s*)["'][^"']*(?:shadcn|radix-ui|@base-ui)/.test(
        source,
      )
    ) {
      failures.push(
        `unapproved external component import found in ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  for (const blockedDirectory of [
    "packages/foundations",
    "packages/ui",
    "packages/layouts",
    "apps/playground/src/benchmarks",
    "apps/playground/src/experiments/headless",
    "manifests",
    "registry",
  ]) {
    const directoryPath = join(workspaceRoot, blockedDirectory);
    const directoryFiles = collectFiles(directoryPath);
    const placeholderPath = join(directoryPath, ".gitkeep");
    if (
      directoryFiles.length !== 1 ||
      directoryFiles[0] !== placeholderPath ||
      statSync(placeholderPath).size !== 1 ||
      readFileSync(placeholderPath, "utf8") !== "\n"
    ) {
      failures.push(
        `${blockedDirectory} must contain only the canonical newline-only .gitkeep during Day 1: ${directoryFiles
          .map((filePath) => relative(workspaceRoot, filePath))
          .join(", ")}`,
      );
    }
  }

  const expectedAppDirectories = ["playground"];
  const actualAppDirectories = existsSync(join(workspaceRoot, "apps"))
    ? readdirSync(join(workspaceRoot, "apps"), { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map(({ name }) => name)
        .sort()
    : [];
  if (JSON.stringify(actualAppDirectories) !== JSON.stringify(expectedAppDirectories)) {
    failures.push(
      `Day 1 apps must contain only playground, found ${actualAppDirectories.join(", ")}`,
    );
  }

  const expectedAppFiles = [...scopedFiles.application,
    "apps/playground/index.html",
    "apps/playground/package.json",
    "apps/playground/tsconfig.json",
    "apps/playground/vite.config.ts",
    "apps/playground/src/app.tsx",
    "apps/playground/src/main.tsx",
    "apps/playground/src/styles.css",
    "apps/playground/src/benchmarks/.gitkeep",
    "apps/playground/src/docs/benchmark-index.ts",
    "apps/playground/src/docs/evidence-index.ts",
    "apps/playground/src/experiments/headless/.gitkeep",
    "apps/playground/src/routes/overview-page.tsx",
    "apps/playground/src/routes/playground-shell.test.tsx",
    "apps/playground/src/routes/route-registry.ts",
  ].sort();
  const actualAppFiles = collectFiles(join(workspaceRoot, "apps"))
    .map((filePath) => relative(workspaceRoot, filePath))
    .sort();
  assertExact("complete Day 1 app file allowlist", actualAppFiles, expectedAppFiles);

  const indexHtml = readFileSync(
    join(workspaceRoot, "apps/playground/index.html"),
    "utf8",
  );
  const expectedIndexHtml = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Rain Next Foundation Spike 的本地运行与验证入口"
    />
    <title>Rain Next Foundation Spike</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
  assertExact("canonical Day 1 index.html", indexHtml, expectedIndexHtml);

  const expectedPackageDirectories = ["foundations", "layouts", "ui"];
  const actualPackageDirectories = existsSync(join(workspaceRoot, "packages"))
    ? readdirSync(join(workspaceRoot, "packages"), { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map(({ name }) => name)
        .sort()
    : [];
  if (
    JSON.stringify(actualPackageDirectories) !==
    JSON.stringify(expectedPackageDirectories)
  ) {
    failures.push(
      `Day 1 packages must contain only foundations, layouts, and ui placeholders, found ${actualPackageDirectories.join(", ")}`,
    );
  }

  const allowedDayOneWorkspaceSources = new Set(
    [
      "apps/playground/vite.config.ts",
      "apps/playground/index.html",
      "apps/playground/src/main.tsx",
      "apps/playground/src/app.tsx",
      "apps/playground/src/styles.css",
      "apps/playground/src/docs/evidence-index.ts",
      "apps/playground/src/docs/benchmark-index.ts",
      "apps/playground/src/routes/route-registry.ts",
      "apps/playground/src/routes/overview-page.tsx",
      "apps/playground/src/routes/playground-shell.test.tsx",
      "playwright.config.ts",
      "vitest.config.ts",
      "scripts/verification-helpers.mjs",
      "scripts/verification-helpers.test.ts",
      "scripts/verify-workspace.mjs",
      "scripts/verify-evidence.mjs",
      "scripts/verify-boundaries.mjs",
      "tests/setup.ts",
      "tests/e2e/playground-shell.spec.ts",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  // Under the fully validated accepted navigation parent, these are data domains, not executable workspace inputs.
  // Their existing exact evidence/source-lock validators remain responsible; old phases retain the original scan.
  const workspaceSources = collectFiles(workspaceRoot).filter((filePath) =>
    /\.(?:[cm]?[jt]sx?|astro|css|html|mdx|svelte|svg|vue)$/.test(filePath)
      && !(navigationAuthorized && /^(?:evidence|artifacts|docs)\//.test(relative(workspaceRoot, filePath))),
  );
  for (const filePath of workspaceSources) {
    if (!allowedDayOneWorkspaceSources.has(filePath)) {
      failures.push(
        `source file outside the complete Day 1 allowlist: ${relative(workspaceRoot, filePath)}`,
      );
    }
  }
}

if (isDayTwo) {
  const privateReferenceDefinitionFiles = new Set(
    [
      "packages/foundations/src/token-contract.ts",
      "packages/foundations/src/tokens.css",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  const runtimeColorConsumers = [
    ...applicationSources,
    ...collectFiles(join(workspaceRoot, "packages/foundations/src")).filter(
      (filePath) => /\.(?:[cm]?[jt]sx?|css)$/.test(filePath),
    ),
  ].filter((filePath) => !/\.test\.[^.]+$/.test(filePath));
  for (const filePath of runtimeColorConsumers) {
    if (
      !privateReferenceDefinitionFiles.has(filePath) &&
      usesPrivateReferenceColor(readFileSync(filePath, "utf8"))
    ) {
      failures.push(
        `private reference color consumed outside Foundations definitions: ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  if (
    phaseStatus.currentPhase.status !== "authorized" ||
    phaseStatus.currentPhase.workMode !== "system-mode-foundations" ||
    phaseStatus.currentPhase.authorizationScope !==
      "day-2-foundations-contract-and-fixtures" ||
    phaseStatus.currentPhase.progress !==
      "task-3-focus-color-correction-completed"
  ) {
    failures.push("Day 2 phase authorization is not exact");
  }

  assertExact("Day 2 allowedActions", phaseStatus.allowedActions, [
    "只读检查已登记的 Figma 来源节点",
    "保存来源节点截图作为 Visual Evidence 复核产物",
    "更新 Visual Evidence 与 Benchmark 的现场复核状态",
    "创建或修订审计、计划、治理和状态文档",
    "执行文档、YAML、引用、截图和 Git 工作区的只读或非运行时验证",
    "创建 Task 3 明确列出的 Foundations 包、合同与样式文件",
    "建立 Foundations 展示夹具、单元测试与浏览器测试",
    "保存 Day 2 运行截图与字体环境说明",
    "运行现有质量门、类型检查、构建与浏览器验证",
  ]);
  assertExact("Day 2 blockedActions", phaseStatus.blockedActions, [
    "安装新依赖或执行依赖升级",
    "实现公共组件、Layout 或 Benchmark 页面",
    "批量安装或复制 shadcn 资产",
    "执行 Figma 写入或发布 Figma Component/Variant",
    "创建本地 Git commit",
    "创建或配置远程仓库、push、PR 或 merge",
    "发布包、源码 Registry 或执行业务迁移",
  ]);
  assertExact(
    "Day 2 checkpoint IDs",
    phaseStatus.checkpoints?.map(({ id }) => id),
    ["day-1-runtime-start", "day-2-foundations-start"],
  );
  const foundationsCheckpoint = phaseStatus.checkpoints?.find(
    ({ id }) => id === "day-2-foundations-start",
  );
  if (foundationsCheckpoint?.status !== "authorized") {
    failures.push(
      "day-2-foundations-start checkpoint must remain explicitly authorized",
    );
  }
  assertExact("Day 2 checkpoint unlocks", foundationsCheckpoint?.unlocks, [
    "Foundations token 合同",
    "Typography、Density、Radius、Shadow、Focus 与 Motion 最小规则",
    "Foundations 展示夹具与 Day 2 运行证据",
  ]);

  assertExact("Day 2 independentLifecycle", phaseStatus.independentLifecycle, {
    visualEvidence: "live-reinspected",
    benchmark: "registered",
    implementation: "completed",
    implementationScope: "day-2-task-3-plus-focus-color-correction",
    automatedVerification: "passed",
    automatedVerificationScope: "day-2-task-3-focus-color-correction",
    automatedVerificationEvidence:
      "pnpm-verify-governance-typecheck-vitest-build-chromium-e2e",
    humanGate: "not-evaluated",
    figmaEditableMaterial: "not-authorized",
    figmaComponentPublication: "not-authorized",
    packageOrRegistryPublication: "not-authorized",
    businessMigration: "not-authorized",
    localGitCommit: "not-created",
    remoteGit: "not-configured",
  });
  assertExact("Day 2 pending local commits", phaseStatus.pendingGitActions, {
    localCommits: [
      {
        message: "chore: scaffold rain next spike workspace",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
      {
        message: "test: add playground and evidence quality gates",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
      {
        message: "feat: establish rain next foundations",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
    ],
  });

  assertExact("Day 2 package manifest set", packageFiles, [
    "apps/playground/package.json",
    "package.json",
    "packages/foundations/package.json",
  ]);

  const expectedDependencySets = {
    "package.json": {
      dependencies: {},
      devDependencies: {
        "@playwright/test": "^1.62.1",
        "@tailwindcss/vite": "^4.3.3",
        "@testing-library/jest-dom": "^7.0.1",
        "@testing-library/react": "^16.3.3",
        "@testing-library/user-event": "^14.6.6",
        "@vitejs/plugin-react": "^6.1.1",
        jsdom: "^29.1.1",
        tailwindcss: "^4.3.3",
        typescript: "^7.0.2",
        vite: "^8.2.2",
        vitest: "^4.1.11",
      },
      peerDependencies: {},
      optionalDependencies: {},
    },
    "apps/playground/package.json": {
      dependencies: {
        "@rain-next/foundations": "workspace:*",
        react: "^19.2.8",
        "react-dom": "^19.2.8",
      },
      devDependencies: {
        "@types/react": "^19.2.18",
        "@types/react-dom": "^19.2.5",
      },
      peerDependencies: {},
      optionalDependencies: {},
    },
    "packages/foundations/package.json": {
      dependencies: { react: "^19.2.8" },
      devDependencies: { "@types/react": "^19.2.18" },
      peerDependencies: {},
      optionalDependencies: {},
    },
  };
  const expectedScripts = {
    "package.json": {
      dev: "pnpm --filter @rain-next/playground dev",
      build: "pnpm -r build",
      typecheck:
        "pnpm -r typecheck && tsc --noEmit --project tsconfig.tests.json",
      test: "vitest run",
      "test:e2e": "playwright test",
      "verify:lockfile":
        "pnpm install --lockfile-only --frozen-lockfile --offline --ignore-scripts",
      "verify:workspace": "node scripts/verify-workspace.mjs",
      "verify:evidence": "node scripts/verify-evidence.mjs",
      "verify:boundaries": "node scripts/verify-boundaries.mjs",
      "verify:reuse-audit": "node scripts/verify-rain-classic-reuse-audit.mjs",
      "verify:governance":
        "pnpm verify:lockfile && pnpm verify:workspace && pnpm verify:evidence && pnpm verify:boundaries",
      verify:
        "pnpm verify:governance && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e",
    },
    "apps/playground/package.json": {
      dev: "vite --host 127.0.0.1",
      build: "tsc --noEmit --project tsconfig.json && vite build",
      typecheck: "tsc --noEmit --project tsconfig.json",
    },
    "packages/foundations/package.json": {
      build: "tsc --noEmit --project tsconfig.json",
      typecheck: "tsc --noEmit --project tsconfig.json",
    },
  };
  const expectedManifestKeys = {
    "package.json": [
      "devDependencies",
      "engines",
      "name",
      "packageManager",
      "private",
      "scripts",
      "type",
      "version",
    ],
    "apps/playground/package.json": [
      "dependencies",
      "devDependencies",
      "name",
      "private",
      "scripts",
      "type",
      "version",
    ],
    "packages/foundations/package.json": [
      "dependencies",
      "devDependencies",
      "exports",
      "name",
      "private",
      "scripts",
      "type",
      "version",
    ],
  };
  const allowedExternalDependencies = new Set([
    "@playwright/test",
    "@tailwindcss/vite",
    "@testing-library/jest-dom",
    "@testing-library/react",
    "@testing-library/user-event",
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "jsdom",
    "react",
    "react-dom",
    "tailwindcss",
    "typescript",
    "vite",
    "vitest",
  ]);
  const internalPackageNames = new Set(
    packageFiles
      .map((packageFile) => loadPackage(packageFile)?.name)
      .filter(Boolean),
  );

  if (g5Authorized && expectedDependencySets["packages/ui/package.json"]) expectedDependencySets["packages/ui/package.json"].dependencies = Object.fromEntries(Object.entries({ ...expectedDependencySets["packages/ui/package.json"].dependencies, "react-day-picker": "9.13.2" }).sort());
  if (g123PlaygroundAuthorized && expectedDependencySets["packages/ui/package.json"]) expectedDependencySets["packages/ui/package.json"].dependencies = Object.fromEntries(Object.entries({ ...expectedDependencySets["packages/ui/package.json"].dependencies, "react-resizable-panels": "4.12.4" }).sort());
  if (tokenFirstAuthorized) expectedDependencySets["apps/prototype/package.json"].dependencies = Object.fromEntries(Object.entries({ ...expectedDependencySets["apps/prototype/package.json"].dependencies, "@base-ui/react": "1.8.0", "class-variance-authority": "0.7.1", ...(tokenFirstNextAuthorized ? { "react-resizable-panels": "4.12.4" } : {}) }).sort());
  function normalizedDependencyMap(dependencies) {
    return Object.fromEntries(Object.entries(dependencies ?? {}).sort());
  }

  for (const packageFile of packageFiles) {
    const document = loadPackage(packageFile);
    if (!document) continue;

    assertExact(
      `${packageFile} Day 2 manifest shape`,
      Object.keys(document).sort(),
      expectedManifestKeys[packageFile],
    );
    assertExact(
      `${packageFile} Day 2 scripts`,
      document.scripts,
      expectedScripts[packageFile],
    );
    assertExact(
      `${packageFile} Day 2 dependency allowlist`,
      {
        dependencies: normalizedDependencyMap(document.dependencies),
        devDependencies: normalizedDependencyMap(document.devDependencies),
        peerDependencies: normalizedDependencyMap(document.peerDependencies),
        optionalDependencies: normalizedDependencyMap(document.optionalDependencies),
      },
      expectedDependencySets[packageFile],
    );

    for (const dependencyGroup of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
      "optionalDependencies",
    ]) {
      for (const [dependency, version] of Object.entries(
        document[dependencyGroup] ?? {},
      )) {
        if (
          internalPackageNames.has(dependency) &&
          (typeof version !== "string" || !version.startsWith("workspace:"))
        ) {
          failures.push(
            `${packageFile} must reference internal package ${dependency} with workspace: during Day 2`,
          );
        }
        if (
          !internalPackageNames.has(dependency) &&
          !allowedExternalDependencies.has(dependency)
          && !(tokenFirstNextAuthorized && packageFile === "apps/prototype/package.json" && dependency === "react-resizable-panels" && version === "4.12.4")
          && !(g123PlaygroundAuthorized && packageFile === "packages/ui/package.json" && dependency === "react-resizable-panels" && version === "4.12.4")
        ) {
          failures.push(
            `${packageFile} adds dependency ${dependency} outside the Day 1 dependency set`,
          );
        }
        if (isDayOneForbiddenDependency(dependency)) {
          failures.push(
            `${packageFile} installs Day 4/5 dependency ${dependency} during Day 2`,
          );
        }
      }
    }

    for (const lifecycleScript of [
      "preinstall",
      "install",
      "postinstall",
      "prepare",
      "prepublish",
      "prepublishOnly",
    ]) {
      if (Object.hasOwn(document.scripts ?? {}, lifecycleScript)) {
        failures.push(
          `${packageFile} must not add lifecycle script ${lifecycleScript} during Day 2`,
        );
      }
    }
  }

  const foundationsPackage = loadPackage("packages/foundations/package.json");
  assertExact("Foundations source exports", foundationsPackage?.exports, {
    ".": "./src/index.ts",
    "./tokens.css": "./src/tokens.css",
    "./typography.css": "./src/typography.css",
    "./motion.css": "./src/motion.css",
    "./focus.css": "./src/focus.css",
  });

  const allowedDayTwoApplicationSources = new Set(
    [
      "apps/playground/src/main.tsx",
      "apps/playground/src/app.tsx",
      "apps/playground/src/styles.css",
      "apps/playground/src/docs/evidence-index.ts",
      "apps/playground/src/docs/benchmark-index.ts",
      "apps/playground/src/docs/foundations-page.tsx",
      "apps/playground/src/docs/foundations-page.test.tsx",
      "apps/playground/src/routes/route-registry.ts",
      "apps/playground/src/routes/overview-page.tsx",
      "apps/playground/src/routes/playground-shell.test.tsx",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  for (const filePath of applicationSources) {
    if (!allowedDayTwoApplicationSources.has(filePath)) {
      failures.push(
        `application implementation outside the Day 2 allowlist: ${relative(workspaceRoot, filePath)}`,
      );
    }
    const source = readFileSync(filePath, "utf8");
    if (/<(?:nav|aside)\b/i.test(source)) {
      failures.push(
        `persistent navigation or platform sidebar found in ${relative(workspaceRoot, filePath)}`,
      );
    }
    if (
      /(?:from\s+|import\s*)["'][^"']*(?:shadcn|radix-ui|@base-ui)/.test(
        source,
      )
    ) {
      failures.push(
        `unapproved external component import found in ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  const expectedAppFiles = [...scopedFiles.application,
    "apps/playground/index.html",
    "apps/playground/package.json",
    "apps/playground/tsconfig.json",
    "apps/playground/vite.config.ts",
    "apps/playground/src/app.tsx",
    "apps/playground/src/main.tsx",
    "apps/playground/src/styles.css",
    "apps/playground/src/benchmarks/.gitkeep",
    "apps/playground/src/docs/benchmark-index.ts",
    "apps/playground/src/docs/evidence-index.ts",
    "apps/playground/src/docs/foundations-page.test.tsx",
    "apps/playground/src/docs/foundations-page.tsx",
    "apps/playground/src/experiments/headless/.gitkeep",
    "apps/playground/src/routes/overview-page.tsx",
    "apps/playground/src/routes/playground-shell.test.tsx",
    "apps/playground/src/routes/route-registry.ts",
  ].sort();
  assertExact(
    "complete Day 2 app file allowlist",
    collectFiles(join(workspaceRoot, "apps"))
      .map((filePath) => relative(workspaceRoot, filePath))
      .sort(),
    expectedAppFiles,
  );

  const expectedFoundationsFiles = [
    ...tooltipFiles.workspace.filter(file => file.startsWith("packages/foundations/")),
    "packages/foundations/package.json",
    "packages/foundations/tsconfig.json",
    "packages/foundations/src/density.test.tsx",
    "packages/foundations/src/density.tsx",
    "packages/foundations/src/focus.css",
    "packages/foundations/src/index.ts",
    "packages/foundations/src/motion.css",
    "packages/foundations/src/token-contract.test.ts",
    "packages/foundations/src/token-contract.ts",
    "packages/foundations/src/tokens.css",
    "packages/foundations/src/typography.css",
  ].sort();
  assertExact(
    "complete Day 2 Foundations file allowlist",
    collectFiles(join(workspaceRoot, "packages/foundations"))
      .map((filePath) => relative(workspaceRoot, filePath))
      .sort(),
    expectedFoundationsFiles,
  );

  for (const blockedDirectory of [
    "packages/ui",
    "packages/layouts",
    "apps/playground/src/benchmarks",
    "apps/playground/src/experiments/headless",
    "manifests",
    "registry",
  ]) {
    const directoryPath = join(workspaceRoot, blockedDirectory);
    const directoryFiles = collectFiles(directoryPath);
    const placeholderPath = join(directoryPath, ".gitkeep");
    if (
      directoryFiles.length !== 1 ||
      directoryFiles[0] !== placeholderPath ||
      statSync(placeholderPath).size !== 1 ||
      readFileSync(placeholderPath, "utf8") !== "\n"
    ) {
      failures.push(
        `${blockedDirectory} must remain a canonical empty placeholder during Day 2`,
      );
    }
  }

  const expectedDayTwoEvidenceFiles = [
    "evidence/runtime/day-2/README.md",
    "evidence/runtime/day-2/font-environment.md",
    "evidence/runtime/day-2/foundations-page.png",
    "evidence/runtime/day-2/red-green-summary.md",
  ].sort();
  assertExact(
    "Day 2 runtime evidence allowlist",
    collectFiles(join(workspaceRoot, "evidence/runtime/day-2"))
      .map((filePath) => relative(workspaceRoot, filePath))
      .sort(),
    expectedDayTwoEvidenceFiles,
  );

  const dayTwoScreenshotPath = join(
    workspaceRoot,
    "evidence/runtime/day-2/foundations-page.png",
  );
  const dayTwoEvidenceReadmePath = join(
    workspaceRoot,
    "evidence/runtime/day-2/README.md",
  );
  try {
    const screenshotStat = lstatSync(dayTwoScreenshotPath);
    if (!screenshotStat.isFile() || screenshotStat.isSymbolicLink()) {
      failures.push(
        "Day 2 Foundations screenshot must be a regular, non-symlink file",
      );
    } else {
      const screenshotBuffer = readFileSync(dayTwoScreenshotPath);
      if (screenshotBuffer.length < 100_000) {
        failures.push(
          `Day 2 Foundations screenshot is anomalously small: ${screenshotBuffer.length} bytes`,
        );
      }

      const screenshotMetadata = inspectPngMetadata(screenshotBuffer);
      assertExact("Day 2 Foundations screenshot IHDR dimensions", screenshotMetadata, {
        height: 4636,
        width: 1440,
      });

      const actualScreenshotHash = createHash("sha256")
        .update(screenshotBuffer)
        .digest("hex");
      const evidenceReadme = readFileSync(dayTwoEvidenceReadmePath, "utf8");

      const recordedSizeMatches = [
        ...evidenceReadme.matchAll(/^  - 文件大小：`([1-9]\d*) bytes`$/gm),
      ];
      if (recordedSizeMatches.length !== 1) {
        failures.push(
          "Day 2 runtime evidence README must record exactly one Foundations screenshot byte size",
        );
      } else {
        const recordedSize = Number(recordedSizeMatches[0][1]);
        if (recordedSize !== screenshotBuffer.length) {
          failures.push(
            `Day 2 Foundations screenshot byte-size mismatch: recorded ${recordedSize}, received ${screenshotBuffer.length}`,
          );
        }
      }

      const recordedHashMatches = [
        ...evidenceReadme.matchAll(/^  - SHA-256：`([a-f0-9]{64})`$/gm),
      ];
      if (recordedHashMatches.length !== 1) {
        failures.push(
          "Day 2 runtime evidence README must record exactly one Foundations screenshot SHA-256",
        );
      } else {
        const recordedHash = recordedHashMatches[0][1];
        if (recordedHash !== actualScreenshotHash) {
          failures.push(
            `Day 2 Foundations screenshot SHA-256 mismatch: recorded ${recordedHash}, received ${actualScreenshotHash}`,
          );
        }
      }
    }
  } catch (error) {
    failures.push(`Day 2 Foundations screenshot cannot be audited: ${error.message}`);
  }

  const allowedDayTwoWorkspaceSources = new Set(
    [
      "apps/playground/vite.config.ts",
      "apps/playground/index.html",
      "apps/playground/src/main.tsx",
      "apps/playground/src/app.tsx",
      "apps/playground/src/styles.css",
      "apps/playground/src/docs/evidence-index.ts",
      "apps/playground/src/docs/benchmark-index.ts",
      "apps/playground/src/docs/foundations-page.tsx",
      "apps/playground/src/docs/foundations-page.test.tsx",
      "apps/playground/src/routes/route-registry.ts",
      "apps/playground/src/routes/overview-page.tsx",
      "apps/playground/src/routes/playground-shell.test.tsx",
      "packages/foundations/src/index.ts",
      "packages/foundations/src/tokens.css",
      "packages/foundations/src/token-contract.ts",
      "packages/foundations/src/token-contract.test.ts",
      "packages/foundations/src/typography.css",
      "packages/foundations/src/density.tsx",
      "packages/foundations/src/density.test.tsx",
      "packages/foundations/src/motion.css",
      "packages/foundations/src/focus.css",
      "playwright.config.ts",
      "vitest.config.ts",
      "scripts/verification-helpers.mjs",
      "scripts/verification-helpers.test.ts",
      "scripts/verify-workspace.mjs",
      "scripts/verify-evidence.mjs",
      "scripts/verify-boundaries.mjs",
      "scripts/verify-rain-classic-reuse-audit.mjs",
      "scripts/verify-rain-classic-reuse-audit.test.ts",
      "scripts/collect-rain-classic-inventory.mjs",
      "scripts/collect-rain-classic-inventory.test.ts",
      "tests/setup.ts",
      "tests/node-runtime.d.ts",
      "tests/color-contrast.test.ts",
      "tests/e2e/color-contrast.ts",
      "tests/e2e/playground-shell.spec.ts",
      "tests/e2e/foundations.spec.ts",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  // Under the fully validated accepted navigation parent, these are data domains, not executable workspace inputs.
  // Their existing exact evidence/source-lock validators remain responsible; old phases retain the original scan.
  const workspaceSources = collectFiles(workspaceRoot).filter((filePath) =>
    /\.(?:[cm]?[jt]sx?|astro|css|html|mdx|svelte|svg|vue)$/.test(filePath)
      && !(navigationAuthorized && /^(?:evidence|artifacts|docs)\//.test(relative(workspaceRoot, filePath))),
  );
  for (const filePath of workspaceSources) {
    if (!allowedDayTwoWorkspaceSources.has(filePath)) {
      failures.push(
        `source file outside the complete Day 2 allowlist: ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  try {
    const testsTypeConfig = JSON.parse(
      readFileSync(join(workspaceRoot, "tsconfig.tests.json"), "utf8"),
    );
    assertExact("Day 2 test typecheck config", testsTypeConfig, {
      extends: "./tsconfig.base.json",
      compilerOptions: {
        allowJs: true,
        checkJs: false,
        jsx: "react-jsx",
        lib: ["ES2022", "DOM", "DOM.Iterable"],
        noEmit: true,
        types: ["vite/client"],
      },
      include: [
        "apps/**/*.test.ts",
        "apps/**/*.test.tsx",
        "packages/**/*.test.ts",
        "packages/**/*.test.tsx",
        "tests/**/*.ts",
        "scripts/**/*.test.ts",
        "playwright.config.ts",
        "vitest.config.ts",
      ],
    });
  } catch (error) {
    failures.push(`tsconfig.tests.json cannot be audited: ${error.message}`);
  }

  const fontFiles = collectFiles(workspaceRoot).filter((filePath) =>
    /\.(?:otf|ttc|ttf|woff2?)$/i.test(filePath),
  );
  if (fontFiles.length > 0) {
    failures.push(
      `font files are not authorized in Day 2: ${fontFiles
        .map((filePath) => relative(workspaceRoot, filePath))
        .join(", ")}`,
    );
  }

  const foundationsPageSource = readFileSync(
    join(workspaceRoot, "apps/playground/src/docs/foundations-page.tsx"),
    "utf8",
  );
  for (const marker of [
    'data-rain-id="foundations-page"',
    'data-slot="semantic-colors"',
    'data-slot="typography-roles"',
    'data-slot="density-comparison"',
    'data-slot="focus-semantics"',
    'data-slot="motion-comparison"',
  ]) {
    if (!foundationsPageSource.includes(marker)) {
      failures.push(`Foundations page is missing tracking marker ${marker}`);
    }
  }

  const overviewPageSource = readFileSync(
    join(workspaceRoot, "apps/playground/src/routes/overview-page.tsx"),
    "utf8",
  );
  if (
    !overviewPageSource.includes(
      "Day 2.1 Focus / Color 修正已完成 · 自动验证通过 · Human Gate 未评估",
    )
  ) {
    failures.push(
      "Overview phase copy must reflect completed automation and an unevaluated Human Gate",
    );
  }

  try {
    const gitRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    if (gitRoot !== workspaceRoot) {
      failures.push(`Git root must be the spike workspace, received ${gitRoot}`);
    }
  } catch (error) {
    failures.push(`Git workspace cannot be audited: ${error.message}`);
  }

  let hasLocalCommit = false;
  try {
    execFileSync("git", ["rev-parse", "--verify", "HEAD"], {
      cwd: workspaceRoot,
      stdio: "ignore",
    });
    hasLocalCommit = true;
  } catch {
    hasLocalCommit = false;
  }
  if (hasLocalCommit) {
    failures.push(
      "Git has a local HEAD commit while Day 2 localGitCommit is not-created",
    );
  }

  try {
    const remotes = execFileSync("git", ["remote"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
      .trim()
      .split(/\r?\n/)
      .filter(Boolean);
    if (remotes.length > 0) {
      failures.push(
        `Git has configured remotes while Day 2 remoteGit is not-configured: ${remotes.join(", ")}`,
      );
    }
  } catch (error) {
    failures.push(`Git remotes cannot be audited: ${error.message}`);
  }
}

if (isDayThree || isTailwindB2) {
  const buttonMigrationAuthorized = isTokenFoundationsV1
    && livePhaseStatus.tokenRefinements?.buttonTokenMigration?.authorization === "authorized";
  const buttonMigrationApplicationFiles = buttonMigrationAuthorized ? [
    "apps/playground/src/docs/components/button-token-review.tsx",
    "apps/playground/src/docs/components/button-token-review.css",
    "apps/playground/src/docs/components/button-token-review.test.tsx",
  ] : [];
  const buttonMigrationFoundationFiles = buttonMigrationAuthorized ? [
    "packages/foundations/src/button-token-contract.ts",
    "packages/foundations/src/button-token-contract.test.ts",
  ] : [];
  // The historical parent is validated before reuse. Its completed status is
  // not copied into the live B2 lifecycle or used to widen icon authorization.
  const phaseStatus = isTailwindB2
    ? { ...currentPhaseStatus, ...historicalDayThreeStatus }
    : currentPhaseStatus;
  let iconFiles = getIconLibraryRefinementFiles(undefined);
  try {
    const inventoryPath = join(workspaceRoot, "evidence/icons/inventory.json");
    const inventory = existsSync(inventoryPath)
      ? JSON.parse(readFileSync(inventoryPath, "utf8")) : undefined;
    iconFiles = getIconLibraryRefinementFiles(
      phaseStatus.componentRefinements, phaseStatus.currentPhase.progress, inventory, questionNumberAuthorized,
    );
  } catch (error) {
    failures.push(error.message);
  }
  let textButtonFiles = getTextButtonRefinementFiles(undefined);
  try {
    textButtonFiles = getTextButtonRefinementFiles(
      phaseStatus.componentRefinements,
      phaseStatus.currentPhase.progress,
    );
  } catch (error) {
    failures.push(error.message);
  }
  const isCompleted =
    phaseStatus.currentPhase.progress === "task-4-core-ui-completed";
  for (const filePath of [...textButtonFiles.required, ...iconFiles.required]) {
    try {
      const stat = lstatSync(join(workspaceRoot, filePath));
      if (!stat.isFile() || stat.isSymbolicLink() || stat.size === 0) {
        failures.push(`Completed refinement artifact must be a non-empty regular file: ${filePath}`);
      }
    } catch {
      failures.push(`Completed refinement artifact is missing: ${filePath}`);
    }
  }
  if (iconFiles.authorized) {
    for (const filePath of iconFiles.referencedEvidence) {
      try {
        const stat = lstatSync(join(workspaceRoot, filePath));
        if (!stat.isFile() || stat.isSymbolicLink() || stat.size === 0) {
          failures.push(`Referenced icon evidence must be a non-empty regular file: ${filePath}`);
        }
      } catch {
        failures.push(`Referenced icon evidence is missing: ${filePath}`);
      }
    }
    const allowedIconFiles = new Set([
      ...iconFiles.foundations, ...iconFiles.evidence, ...iconFiles.sourceExports,
    ]);
    for (const directory of [
      "packages/foundations/src/icons", "evidence/icons", "evidence/runtime/icon-migration",
    ]) {
      for (const absolutePath of collectFiles(join(workspaceRoot, directory))) {
        const filePath = relative(workspaceRoot, absolutePath);
        if (!allowedIconFiles.has(filePath)) {
          failures.push(`Icon library file outside the exact plan/inventory: ${filePath}`);
        } else if (lstatSync(absolutePath).isSymbolicLink()) {
          failures.push(`Icon library files must not redirect through symbolic links: ${filePath}`);
        }
      }
    }
  }
  const allowedProgress = new Set([
    "task-4-core-ui-in-progress",
    "task-4-core-ui-completed",
  ]);

  if (
    phaseStatus.currentPhase.status !== "authorized" ||
    phaseStatus.currentPhase.workMode !== "system-mode-ui" ||
    phaseStatus.currentPhase.authorizationScope !==
      "day-3-task-4-core-ui-families" ||
    !allowedProgress.has(phaseStatus.currentPhase.progress)
  ) {
    failures.push("Day 3 phase authorization is not exact");
  }

  if (!isTailwindB2) {
    assertExact("Day 3 allowedActions", phaseStatus.allowedActions, [
      "只读检查已登记的 Figma 来源节点",
      "保存来源节点截图作为 Visual Evidence 复核产物",
      "更新 Visual Evidence 与 Benchmark 的现场复核状态",
      "创建或修订审计、计划、治理和状态文档",
      "执行文档、YAML、引用、截图和 Git 工作区的只读或非运行时验证",
      "创建 Task 4 明确列出的 UI 包、Button、Input、Tag/Badge 与 Surface/Card 家族",
      "建立 Core UI 说明页、单元测试、交互测试与浏览器测试",
      "保存 Day 3 Core UI 运行截图与验证说明",
      "运行现有质量门、类型检查、构建与浏览器验证",
    ]);
    assertExact("Day 3 blockedActions", phaseStatus.blockedActions, [
      "安装新依赖或执行依赖升级",
      "实现 Select、Dialog、Table、Statistic、Layout、Headless 实验或 Benchmark 页面",
      "实现七种业务标签包装、BadgeStatus 或 StatusIndicator",
      "批量安装或复制 shadcn 资产",
      "执行 Figma 写入或发布 Figma Component/Variant",
      "创建新的 Git branch 或 worktree",
      "创建本地 Git commit",
      "创建或配置远程仓库、push、PR 或 merge",
      "发布包、源码 Registry 或执行业务迁移",
    ]);
  }
  assertExact(
    "Day 3 checkpoint IDs",
    phaseStatus.checkpoints?.map(({ id }) => id),
    ["day-1-runtime-start", "day-2-foundations-start", "day-3-core-ui-start",
      ...(isTailwindB2 ? ["tailwind-b2-composition-contract"] : [])],
  );
  const coreUiCheckpoint = phaseStatus.checkpoints?.find(
    ({ id }) => id === "day-3-core-ui-start",
  );
  if (coreUiCheckpoint?.status !== "authorized") {
    failures.push(
      "day-3-core-ui-start checkpoint must remain explicitly authorized",
    );
  }
  assertExact("Day 3 checkpoint unlocks", coreUiCheckpoint?.unlocks, [
    "Button、Input、Tag/Badge 与 Surface/Card 基础 UI 家族",
    "Core UI 状态矩阵、说明页与修改边界",
    "Day 3 单元、交互、浏览器测试与运行证据",
  ]);

  assertExact(
    "Day 3 reuse audit checkpoint",
    phaseStatus.independentAuditCheckpoints,
    {
      rainClassicToRainNextReuseAuditCp3: {
        auditId: "RC2RN-REUSE-AUDIT-001",
        checkpointId: "CP3",
        status: "accepted",
        acceptedAt: "2026-09-02",
        decisionSource: "explicit-user-confirmation",
        scope: "reuse-audit-human-gate-only",
        evidence: {
          sourceLock: "../evidence/rain-classic/source-lock.yaml",
          reuseMatrix: "../evidence/rain-classic/reuse-matrix.yaml",
          report: "../docs/audits/2026-09-01-rain-classic-reuse-audit.md",
        },
        doesNotAuthorize: [
          "current-phase-advance",
          "day-2-foundations-human-gate",
          "implementation",
          "figma-write-or-publication",
          "package-or-registry-publication",
          "business-migration",
          "local-or-remote-git",
        ],
      },
    },
  );

  try {
    assertExact(
      "Day 3 independentLifecycle",
      phaseStatus.independentLifecycle,
      getExpectedDayThreeLifecycle(
        phaseStatus.currentPhase.progress,
        phaseStatus.independentLifecycle?.automatedVerification,
      ),
    );
  } catch (error) {
    failures.push(error.message);
  }
  assertExact("Day 3 component Human Gates", phaseStatus.componentHumanGates, {
    button: {
      gateId: "day-3-button-human-gate",
      status: "accepted",
      acceptedAt: "2026-09-03",
      decisionSource: "explicit-user-confirmation-after-live-browser-review",
      scope: "button-visual-and-interaction-only",
      acceptedCandidateValues: {
        dangerColor: "#EF5353",
        focusHaloOpacity: "20%",
        largeButtonHeight: "40px",
        loadingOpacity: "0.82",
      },
      doesNotAuthorize: [
        "other-core-ui-human-gates",
        "figma-write-or-publication",
        "package-or-registry-publication",
        "business-migration",
        "local-or-remote-git",
      ],
    },
    remainingCoreUiFamilies: {
      status: "not-evaluated",
      families: ["Input", "Tag/Badge", "Surface/Card"],
    },
  });
  assertExact("Day 3 pending local commits", phaseStatus.pendingGitActions, {
    localCommits: [
      {
        message: "chore: scaffold rain next spike workspace",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
      {
        message: "test: add playground and evidence quality gates",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
      {
        message: "feat: establish rain next foundations",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
      {
        message: "feat: add core rain ui families",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
    ],
  });

  const allowedPackageFiles = [
    "apps/playground/package.json",
    "package.json",
    "packages/foundations/package.json",
    "packages/ui/package.json",
    ...(cardV2Authorized ? ["apps/prototype/package.json"] : []),
    ...(layoutsV1Authorized ? ["packages/layouts/package.json"] : []),
  ];
  for (const packageFile of packageFiles) {
    if (!allowedPackageFiles.includes(packageFile)) {
      failures.push(`package manifest outside the Day 3 allowlist: ${packageFile}`);
    }
  }
  for (const requiredPackageFile of allowedPackageFiles.slice(0, 3)) {
    if (!packageFiles.includes(requiredPackageFile)) {
      failures.push(`required Day 3 package manifest is missing: ${requiredPackageFile}`);
    }
  }
  if (isCompleted) {
    assertExact("Day 3 package manifest set", packageFiles, [...allowedPackageFiles].sort());
  }

  const expectedDependencySets = {
    "package.json": {
      dependencies: {},
      devDependencies: {
        "@playwright/test": "^1.62.1",
        "@tailwindcss/vite": "^4.3.3",
        "@testing-library/jest-dom": "^7.0.1",
        "@testing-library/react": "^16.3.3",
        "@testing-library/user-event": "^14.6.6",
        "@vitejs/plugin-react": "^6.1.1",
        jsdom: "^29.1.1",
        tailwindcss: "^4.3.3",
        typescript: "^7.0.2",
        vite: "^8.2.2",
        vitest: "^4.1.11",
      },
      peerDependencies: {},
      optionalDependencies: {},
    },
    "apps/playground/package.json": {
      dependencies: {
        ...(dropdownBatchOneAuthorized ? dropdownBatchOneDependencies : {}),
        "@rain-next/foundations": "workspace:*",
        ...(packageFiles.includes("packages/ui/package.json")
          ? { "@rain-next/ui": "workspace:*" }
          : {}),
        react: "^19.2.8",
        "react-dom": "^19.2.8",
      },
      devDependencies: {
        "@types/react": "^19.2.18",
        "@types/react-dom": "^19.2.5",
      },
      peerDependencies: {},
      optionalDependencies: {},
    },
    "packages/foundations/package.json": {
      dependencies: { react: "^19.2.8" },
      devDependencies: { "@types/react": "^19.2.18" },
      peerDependencies: {},
      optionalDependencies: {},
    },
    "packages/ui/package.json": {
      dependencies: {
        ...(tagBatchThreeAuthorized || hasDropdownFamilyAuthorization(livePhaseStatus) ? tagBatchThreeDependencies : {}),
        "@rain-next/foundations": "workspace:*",
        ...(isTailwindB2
          ? {
              "class-variance-authority": "0.7.1",
            }
          : {}),
        react: "^19.2.8",
        ...(isTailwindB2 ? { "tailwind-merge": "3.6.0" } : {}),
      },
      devDependencies: { "@types/react": "^19.2.18" },
      peerDependencies: {},
      optionalDependencies: {},
    },
  };
  const expectedScripts = {
    "package.json": {
      dev: "pnpm --filter @rain-next/playground dev",
      build: "pnpm -r build",
      typecheck:
        "pnpm -r typecheck && tsc --noEmit --project tsconfig.tests.json",
      test: "vitest run",
      "test:e2e": "playwright test",
      "verify:lockfile":
        "pnpm install --lockfile-only --frozen-lockfile --offline --ignore-scripts",
      "verify:workspace": "node scripts/verify-workspace.mjs",
      "verify:evidence": "node scripts/verify-evidence.mjs",
      "verify:boundaries": "node scripts/verify-boundaries.mjs",
      "verify:reuse-audit": "node scripts/verify-rain-classic-reuse-audit.mjs",
      "verify:governance":
        isTailwindB2
          ? "pnpm verify:lockfile && pnpm verify:workspace && pnpm verify:evidence && pnpm verify:boundaries && pnpm verify:tailwind-b2"
          : "pnpm verify:lockfile && pnpm verify:workspace && pnpm verify:evidence && pnpm verify:boundaries",
      verify:
        "pnpm verify:governance && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e",
    },
    "apps/playground/package.json": {
      dev: "vite --host 127.0.0.1",
      build: "tsc --noEmit --project tsconfig.json && vite build",
      typecheck: "tsc --noEmit --project tsconfig.json",
    },
    "packages/foundations/package.json": {
      build: "tsc --noEmit --project tsconfig.json",
      typecheck: "tsc --noEmit --project tsconfig.json",
    },
    "packages/ui/package.json": {
      build: "tsc --noEmit --project tsconfig.json",
      typecheck: "tsc --noEmit --project tsconfig.json",
    },
  };
  if (isTailwindB2) {
    expectedScripts["package.json"]["verify:tailwind-b2"] =
      "node scripts/verify-tailwind-b2.mjs";
  }
  if (isTokenFoundationsV1) {
    expectedScripts["package.json"]["generate:tokens"] = "node scripts/generate-token-foundations.mjs";
    expectedScripts["package.json"]["verify:tokens"] = "node scripts/verify-token-foundations.mjs";
    expectedScripts["package.json"]["verify:governance"] += " && pnpm verify:tokens";
  }
  if (iconFiles.authorized) {
    const actualScripts = loadPackage("package.json")?.scripts ?? {};
    for (const [name, command] of Object.entries({
      "generate:icons": "node scripts/generate-icons.mjs",
      "verify:icons": "node scripts/verify-icons.mjs",
    })) {
      if (iconFiles.requireComplete || Object.hasOwn(actualScripts, name)) {
        expectedScripts["package.json"][name] = command;
      }
    }
    const iconVerification = "pnpm verify:governance && pnpm verify:icons && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e";
    if (iconFiles.requireComplete || actualScripts.verify === iconVerification) {
      expectedScripts["package.json"].verify = iconVerification;
    }
  }
  const expectedManifestKeys = {
    "package.json": [
      "devDependencies",
      "engines",
      "name",
      "packageManager",
      "private",
      "scripts",
      "type",
      "version",
    ],
    "apps/playground/package.json": [
      "dependencies",
      "devDependencies",
      "name",
      "private",
      "scripts",
      "type",
      "version",
    ],
    "packages/foundations/package.json": [
      "dependencies",
      "devDependencies",
      "exports",
      "name",
      "private",
      "scripts",
      "type",
      "version",
    ],
    "packages/ui/package.json": [
      "dependencies",
      "devDependencies",
      "exports",
      "name",
      "private",
      "scripts",
      "type",
      "version",
    ],
  };
  if (cardV2Authorized) {
    expectedDependencySets["apps/prototype/package.json"] = {
      ...expectedDependencySets["apps/playground/package.json"],
      dependencies: { "@rain-next/foundations": "workspace:*", "@rain-next/ui": "workspace:*", react: "^19.2.8", "react-dom": "^19.2.8" },
    };
    expectedScripts["apps/prototype/package.json"] = expectedScripts["apps/playground/package.json"];
    expectedManifestKeys["apps/prototype/package.json"] = expectedManifestKeys["apps/playground/package.json"];
  }
  if (layoutsV1Authorized) {
    expectedDependencySets["packages/layouts/package.json"] = {
      ...expectedDependencySets["packages/foundations/package.json"],
      dependencies: { "@rain-next/foundations": "workspace:*", react: "^19.2.8" },
    };
    expectedScripts["packages/layouts/package.json"] = expectedScripts["packages/foundations/package.json"];
    expectedManifestKeys["packages/layouts/package.json"] = expectedManifestKeys["packages/foundations/package.json"];
    for (const app of ["playground", "prototype"]) expectedDependencySets[`apps/${app}/package.json`].dependencies = Object.fromEntries(Object.entries({ ...expectedDependencySets[`apps/${app}/package.json`].dependencies, "@rain-next/layouts": "workspace:*" }).sort());
    assertExact("RN-06 Layout package name", loadPackage("packages/layouts/package.json")?.name, "@rain-next/layouts");
    assertExact("RN-06 Layout package exports", loadPackage("packages/layouts/package.json")?.exports, { ".": "./src/index.ts", "./styles.css": "./src/layout.css" });
  }
  if (tableRn08Authorized) expectedDependencySets["apps/prototype/package.json"].dependencies = Object.fromEntries(Object.entries({ ...expectedDependencySets["apps/prototype/package.json"].dependencies, "@tanstack/react-table": "8.21.3" }).sort());
  if (qualityAuthorized) expectedDependencySets["apps/prototype/package.json"].dependencies = Object.fromEntries(Object.entries({ ...expectedDependencySets["apps/prototype/package.json"].dependencies, recharts: "3.10.1", "react-is": "19.2.8" }).sort());
  if (g5Authorized && expectedDependencySets["packages/ui/package.json"]) expectedDependencySets["packages/ui/package.json"].dependencies = Object.fromEntries(Object.entries({ ...expectedDependencySets["packages/ui/package.json"].dependencies, "react-day-picker": "9.13.2" }).sort());
  if (g123PlaygroundAuthorized && expectedDependencySets["packages/ui/package.json"]) expectedDependencySets["packages/ui/package.json"].dependencies = Object.fromEntries(Object.entries({ ...expectedDependencySets["packages/ui/package.json"].dependencies, "react-resizable-panels": "4.12.4" }).sort());
  if (tokenFirstAuthorized) expectedDependencySets["apps/prototype/package.json"].dependencies = Object.fromEntries(Object.entries({ ...expectedDependencySets["apps/prototype/package.json"].dependencies, "@base-ui/react": "1.8.0", "class-variance-authority": "0.7.1", ...(tokenFirstNextAuthorized ? { "react-resizable-panels": "4.12.4" } : {}) }).sort());
  function normalizedDependencyMap(dependencies) {
    return Object.fromEntries(Object.entries(dependencies ?? {}).sort());
  }
  const internalPackageNames = new Set(
    packageFiles
      .map((packageFile) => loadPackage(packageFile)?.name)
      .filter(Boolean),
  );
  const allowedExternalDependencies = new Set([
    ...(tableRn08Authorized ? ["@tanstack/react-table"] : []),
    ...(qualityAuthorized ? ["recharts", "react-is"] : []),
    "@playwright/test",
    "@tailwindcss/vite",
    "@testing-library/jest-dom",
    "@testing-library/react",
    "@testing-library/user-event",
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    ...(isTailwindB2
      ? ["class-variance-authority", "tailwind-merge"]
      : []),
    ...(dropdownBatchOneAuthorized ? Object.keys(dropdownBatchOneDependencies) : []),
    ...(tagBatchThreeAuthorized ? Object.keys(tagBatchThreeDependencies) : []),
    "jsdom",
    "react",
    "react-dom",
    "tailwindcss",
    "typescript",
    "vite",
    "vitest",
  ]);

  for (const packageFile of packageFiles) {
    const document = loadPackage(packageFile);
    if (!document || !expectedDependencySets[packageFile]) continue;
    assertExact(
      `${packageFile} Day 3 manifest shape`,
      Object.keys(document).sort(),
      expectedManifestKeys[packageFile],
    );
    assertExact(
      `${packageFile} Day 3 scripts`,
      Object.fromEntries(Object.entries(document.scripts ?? {}).sort()),
      Object.fromEntries(Object.entries(expectedScripts[packageFile]).sort()),
    );
    assertExact(
      `${packageFile} Day 3 dependency allowlist`,
      {
        dependencies: normalizedDependencyMap(document.dependencies),
        devDependencies: normalizedDependencyMap(document.devDependencies),
        peerDependencies: normalizedDependencyMap(document.peerDependencies),
        optionalDependencies: normalizedDependencyMap(document.optionalDependencies),
      },
      expectedDependencySets[packageFile],
    );
    for (const dependencyGroup of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
      "optionalDependencies",
    ]) {
      for (const [dependency, version] of Object.entries(
        document[dependencyGroup] ?? {},
      )) {
        if (
          internalPackageNames.has(dependency) &&
          (typeof version !== "string" || !version.startsWith("workspace:"))
        ) {
          failures.push(
            `${packageFile} must reference internal package ${dependency} with workspace: during Day 3`,
          );
        }
        if (
          !internalPackageNames.has(dependency) &&
          !allowedExternalDependencies.has(dependency)
          && !(tokenFirstNextAuthorized && packageFile === "apps/prototype/package.json" && dependency === "react-resizable-panels" && version === "4.12.4")
          && !(g123PlaygroundAuthorized && packageFile === "packages/ui/package.json" && dependency === "react-resizable-panels" && version === "4.12.4")
        ) {
          failures.push(
            `${packageFile} adds dependency ${dependency} outside the frozen Day 3 dependency set`,
          );
        }
        if (isDayOneForbiddenDependency(dependency)
          && !(tokenFirstAuthorized && packageFile === "apps/prototype/package.json" && dependency === "@base-ui/react" && version === "1.8.0")
          && !(dropdownBatchOneAuthorized && packageFile === "apps/playground/package.json"
            && dropdownBatchOneDependencies[dependency] === version)
          && !(tagBatchThreeAuthorized && packageFile === "packages/ui/package.json"
            && tagBatchThreeDependencies[dependency] === version)) {
          failures.push(
            `${packageFile} installs a Day 4/5 dependency during Day 3`,
          );
        }
      }
    }
    for (const lifecycleScript of [
      "preinstall",
      "install",
      "postinstall",
      "prepare",
      "prepublish",
      "prepublishOnly",
    ]) {
      if (Object.hasOwn(document.scripts ?? {}, lifecycleScript)) {
        failures.push(
          `${packageFile} must not add lifecycle script ${lifecycleScript} during Day 3`,
        );
      }
    }
  }

  function assertIconSourceExports(label, actual, baseline, additions, packageDirectory) {
    const expected = { ...baseline };
    for (const [name, target] of Object.entries(additions)) {
      if (iconFiles.requireComplete || Object.hasOwn(actual ?? {}, name)) expected[name] = target;
    }
    assertExact(label,
      Object.fromEntries(Object.entries(actual ?? {}).sort()),
      Object.fromEntries(Object.entries(expected).sort()),
    );
    for (const [name, target] of Object.entries(actual ?? {})) {
      if (typeof target !== "string" || !existsSync(join(workspaceRoot, packageDirectory, target))) {
        failures.push(`${label} must point to an existing file: ${name}`);
      }
    }
  }
  const foundationsPackage = loadPackage("packages/foundations/package.json");
  assertIconSourceExports("Foundations source exports during Day 3", foundationsPackage?.exports, {
    ".": "./src/index.ts",
    "./tokens.css": "./src/tokens.css",
    "./typography.css": "./src/typography.css",
    "./motion.css": "./src/motion.css",
    "./focus.css": "./src/focus.css",
    ...(isTailwindB2
      ? { "./tailwind-theme.css": "./src/tailwind-theme.css" }
      : {}),
  }, iconFiles.foundationsExports, "packages/foundations");
  if (packageFiles.includes("packages/ui/package.json")) {
    const uiPackage = loadPackage("packages/ui/package.json");
    assertIconSourceExports("Core UI source exports", uiPackage?.exports, {
      ".": "./src/index.ts",
      "./styles.css": "./src/styles.css",
    }, iconFiles.uiExports, "packages/ui");
  }

  try {
    const expectedImporters = packageFiles
      .map((packageFile) =>
        packageFile === "package.json"
          ? "."
          : packageFile.slice(0, -"/package.json".length),
      )
      .sort();
    assertExact(
      "Day 3 pnpm lockfile importers",
      parsePnpmLockfileImporters(
        readRegularNonSymbolicFile(
          join(workspaceRoot, "pnpm-lock.yaml"),
          "pnpm-lock.yaml",
        ).toString("utf8"),
      ).sort(),
      expectedImporters,
    );
  } catch (error) {
    failures.push(`Day 3 pnpm lockfile cannot be audited: ${error.message}`);
  }

  const allowedDayThreeApplicationSources = new Set(
    [
      ...scopedFiles.application,
      ...alertFiles.application, ...reportAApplication, ...tokenFirstApplication, ...tokenFirstG2Application, ...qualityApplication, ...m2Files.application, ...numberFiles.application, ...avatarFiles.application, ...formFiles.application, ...tableFiles.application, ...layoutFiles.application, ...dialogFiles.application, ...cardFiles.application,
      ...dropdownFiles.application,
      ...sizeReviewFiles.application,
      ...optionButtonFiles.application, ...questionNumberFiles.application, ...iconButtonFiles.application, ...inputFiles.application, ...selectFiles.application, ...dropdownPublicFiles.application, ...checkboxFiles.application, ...selectionCardFiles.application, ...selectionPatternFiles.application, ...selectionPlaygroundFiles.application, ...radioFiles.application, ...switchFiles.application, ...tabsFiles.application, ...tagFiles.application,
      ...buttonMigrationApplicationFiles,
      ...(isTokenFoundationsV1 ? tokenFoundationsV1Files.application : []),
      ...textButtonFiles.application,
      ...iconFiles.application,
      "apps/playground/src/main.tsx",
      "apps/playground/src/app.tsx",
      "apps/playground/src/styles.css",
      "apps/playground/src/docs/evidence-index.ts",
      "apps/playground/src/docs/benchmark-index.ts",
      "apps/playground/src/docs/foundations-page.tsx",
      "apps/playground/src/docs/foundations-page.test.tsx",
      "apps/playground/src/docs/components/core-ui-page.tsx",
      "apps/playground/src/docs/components/core-ui-page.test.tsx",
      "apps/playground/src/routes/route-registry.ts",
      "apps/playground/src/routes/overview-page.tsx",
      "apps/playground/src/routes/playground-shell.test.tsx",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  for (const filePath of applicationSources) {
    if (!allowedDayThreeApplicationSources.has(filePath)) {
      failures.push(
        `application implementation outside the Day 3 allowlist: ${relative(workspaceRoot, filePath)}`,
      );
    }
    const source = readFileSync(filePath, "utf8");
    const navigationSource = questionNumberAuthorized && relative(workspaceRoot, filePath) === "apps/playground/src/docs/components/question-number-page.tsx"
      ? source.replace('<nav aria-label={`${title}反馈示例`}>', "").replace('<nav aria-label="第 8 题材料与小题">', "")
      : source;
    if (!scopedFiles.application.has(relative(workspaceRoot, filePath)) && !(tokenFirstAuthorized && relative(workspaceRoot, filePath) === "apps/prototype/src/scenarios/token-first-g1/page.tsx") && !(tokenFirstG2Authorized && relative(workspaceRoot, filePath) === "apps/prototype/src/scenarios/token-first-g2/page.tsx") && /<(?:nav|aside)\b/i.test(prepareM2NavigationSource(relative(workspaceRoot, filePath), navigationSource, livePhaseStatus))) {
      failures.push(
        `persistent navigation or platform sidebar found in ${relative(workspaceRoot, filePath)}`,
      );
    }
    const headlessImports = [...source.matchAll(/(?:\bfrom\s*|\bimport\s*(?:\(\s*)?|\brequire\s*\(\s*)["']([^"']+)["']/g)]
      .map((match) => match[1]).filter((specifier) => /^(?:@base-ui\/|@radix-ui\/|radix-ui|shadcn|@shadcn\/)/.test(specifier));
    if (headlessImports.some((specifier) => !(tokenFirstAuthorized && ["accordion", "collapsible", "switch", ...(tokenFirstNextAuthorized ? ["tooltip"] : [])].some(name => relative(workspaceRoot, filePath) === `apps/prototype/src/scenarios/token-first-g1/${name}.tsx` && specifier === `@base-ui/react/${name}`))
      && !(tokenFirstG2Authorized && relative(workspaceRoot, filePath).startsWith("apps/prototype/src/scenarios/token-first-g2/") && ["@base-ui/react/toggle", "@base-ui/react/toggle-group", "@base-ui/react/toast", "@base-ui/react/merge-props", "@base-ui/react/use-render"].includes(specifier))
      && !(dropdownBatchOneAuthorized && isDropdownExperimentImport(relative(workspaceRoot, filePath), specifier))
      && !isAvatarFamilyImport(livePhaseStatus, relative(workspaceRoot, filePath), specifier)
      && !(hasDialogV2Authorization(livePhaseStatus) && isDialogV2Import(relative(workspaceRoot, filePath), specifier))
      && !(hasDialogRefinementAuthorization(livePhaseStatus) && relative(workspaceRoot, filePath) === "packages/ui/src/dialog/dialog.tsx" && specifier === "@base-ui/react/alert-dialog")
      && !(hasDropdownFamilyAuthorization(livePhaseStatus) && isDropdownFamilyImport(relative(workspaceRoot, filePath), specifier))
      && !(hasSelectFormalDependenciesAuthorization(livePhaseStatus) && isSelectFormalImport(relative(workspaceRoot, filePath), specifier))
      && !(tooltipAuthorized && relative(workspaceRoot, filePath) === "packages/ui/src/tooltip/tooltip.tsx" && specifier === "@base-ui/react/tooltip")
      && !isTabsImport(livePhaseStatus, relative(workspaceRoot, filePath), specifier)
      && !(tagBatchThreeAuthorized && isTagBatchThreeImport(relative(workspaceRoot, filePath), specifier))
      && !(hasSelectionPatternsSc03Authorization(livePhaseStatus) && relative(workspaceRoot, filePath) === "apps/playground/src/patterns/selection-patterns.tsx" && specifier === "@base-ui/react/dialog")
      && !isSwitchImport(livePhaseStatus, relative(workspaceRoot, filePath), specifier)
      && !isScopedHeadlessImport(relative(workspaceRoot, filePath), specifier))) {
      failures.push(
        `unapproved external component import found in ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  const expectedAppFiles = [...scopedFiles.application,
    ...alertFiles.application, ...reportAApplication, ...tokenFirstApplication, ...tokenFirstG2Application, ...qualityApplication, ...m2Files.application, ...numberFiles.application, ...avatarFiles.application, ...formFiles.application, ...tableFiles.application, ...layoutFiles.application, ...dialogFiles.application, ...cardFiles.application,
    ...dropdownFiles.application.filter((file) => existsSync(join(workspaceRoot, file))),
    ...sizeReviewFiles.application,
    ...optionButtonFiles.application, ...questionNumberFiles.application, ...iconButtonFiles.application, ...inputFiles.application, ...selectFiles.application, ...dropdownPublicFiles.application, ...checkboxFiles.application, ...selectionCardFiles.application, ...selectionPatternFiles.application, ...selectionPlaygroundFiles.application, ...radioFiles.application, ...switchFiles.application, ...tabsFiles.application, ...tagFiles.application,
    ...buttonMigrationApplicationFiles,
    ...(isTokenFoundationsV1 ? tokenFoundationsV1Files.application : []),
    ...textButtonFiles.application,
    ...iconFiles.application,
    "apps/playground/index.html",
    "apps/playground/package.json",
    "apps/playground/tsconfig.json",
    "apps/playground/vite.config.ts",
    "apps/playground/src/app.tsx",
    "apps/playground/src/main.tsx",
    "apps/playground/src/styles.css",
    "apps/playground/src/benchmarks/.gitkeep",
    "apps/playground/src/docs/benchmark-index.ts",
    "apps/playground/src/docs/evidence-index.ts",
    "apps/playground/src/docs/foundations-page.test.tsx",
    "apps/playground/src/docs/foundations-page.tsx",
    "apps/playground/src/docs/components/core-ui-page.test.tsx",
    "apps/playground/src/docs/components/core-ui-page.tsx",
    "apps/playground/src/experiments/headless/.gitkeep",
    "apps/playground/src/routes/overview-page.tsx",
    "apps/playground/src/routes/playground-shell.test.tsx",
    "apps/playground/src/routes/route-registry.ts",
  ].sort();
  const actualAppFiles = collectFiles(join(workspaceRoot, "apps"))
    .map((filePath) => relative(workspaceRoot, filePath))
    .sort();
  if (isCompleted) {
    assertExact("complete Day 3 app file allowlist", actualAppFiles,
      [...new Set(expectedAppFiles)].filter((file) =>
        (textButtonFiles.requireComplete || !textButtonFiles.application.includes(file) || actualAppFiles.includes(file))
        && (iconFiles.requireComplete || !iconFiles.application.includes(file) || actualAppFiles.includes(file))),
    );
  } else {
    for (const filePath of actualAppFiles) {
      if (!expectedAppFiles.includes(filePath)) {
        failures.push(`app file outside the Day 3 implementation allowlist: ${filePath}`);
      }
    }
  }

  const expectedUiFiles = [...scopedFiles.ui,
    ...alertFiles.ui, ...tooltipFiles.ui, ...numberFiles.ui, ...avatarFiles.ui, ...formFiles.ui, ...tableFiles.ui, ...dialogFiles.ui, ...cardFiles.ui,
    ...selectFiles.ui, ...dropdownPublicFiles.ui, ...checkboxFiles.ui, ...selectionCardFiles.ui, ...selectionPatternFiles.ui, ...selectionPlaygroundFiles.ui, ...radioFiles.ui, ...switchFiles.ui, ...tabsFiles.ui, ...tagFiles.ui, ...optionButtonFiles.ui, ...questionNumberFiles.ui, ...iconButtonFiles.ui, ...inputFiles.ui.filter((file) => !["input.tsx", "input.test.tsx", "input.utils.ts", "input.utils.test.ts"].some((name) => file === `packages/ui/src/input/${name}`)),
    ...textButtonFiles.ui,
    ...iconFiles.ui,
    "packages/ui/package.json",
    "packages/ui/tsconfig.json",
    "packages/ui/src/index.ts",
    "packages/ui/src/styles.css",
    "packages/ui/src/button/assets/button-loading.png",
    "packages/ui/src/button/button.tsx",
    "packages/ui/src/button/button.test.tsx",
    ...(isTailwindB2
      ? [
          "packages/ui/src/button/button.styles.ts",
          "packages/ui/src/button/button.styles.test.ts",
        ]
      : []),
    "packages/ui/src/input/input.tsx",
    "packages/ui/src/input/input.test.tsx",
    "packages/ui/src/input/input.utils.ts",
    "packages/ui/src/input/input.utils.test.ts",
    "packages/ui/src/tag/tag.tsx",
    "packages/ui/src/badge/badge.tsx",
    "packages/ui/src/tag/tag-badge.test.tsx",
    "packages/ui/src/surface/surface.tsx",
    "packages/ui/src/card/card.tsx",
    "packages/ui/src/surface/surface-card.test.tsx",
    ...(isTailwindB2
      ? [
          "packages/ui/src/utils/rain-class-names.ts",
          "packages/ui/src/utils/rain-class-names.test.ts",
          "packages/ui/src/recipes/local-recipe.ts",
          "packages/ui/src/recipes/local-recipe.test.ts",
        ]
      : []),
  ].sort();
  const actualUiFiles = collectFiles(join(workspaceRoot, "packages/ui"))
    .map((filePath) => relative(workspaceRoot, filePath))
    .sort();
  if (isCompleted) {
    assertExact("complete Day 3 Core UI file allowlist", actualUiFiles,
      [...new Set(expectedUiFiles)].filter((file) =>
        (textButtonFiles.requireComplete || !textButtonFiles.ui.includes(file) || actualUiFiles.includes(file))
        && (iconFiles.requireComplete || !iconFiles.ui.includes(file) || actualUiFiles.includes(file))),
    );
  } else {
    const allowedInProgressUiFiles = [...expectedUiFiles, "packages/ui/.gitkeep"];
    for (const filePath of actualUiFiles) {
      if (!allowedInProgressUiFiles.includes(filePath)) {
        failures.push(`Core UI file outside the Day 3 implementation allowlist: ${filePath}`);
      }
    }
    if (
      actualUiFiles.includes("packages/ui/.gitkeep") &&
      actualUiFiles.length > 1
    ) {
      failures.push("packages/ui/.gitkeep must be removed when Core UI files exist");
    }
  }

  for (const blockedDirectory of [
    "packages/layouts",
    "apps/playground/src/benchmarks",
    "apps/playground/src/experiments/headless",
    "docs/adr",
    "manifests",
    "registry",
  ]) {
    const directoryPath = join(workspaceRoot, blockedDirectory);
    const directoryFiles = collectFiles(directoryPath);
    const placeholderPath = join(directoryPath, ".gitkeep");
    const authorizedDocuments = [
      ...scopedFiles.documents, ...scopedFiles.layouts,
      ...alertFiles.documents, ...tooltipFiles.documents, ...m2Files.documents, ...rn15Files.documents, ...rn14Files.documents, ...rn13Files.documents, ...numberFiles.documents, ...avatarFiles.documents, ...formFiles.documents, ...tableFiles.documents, ...layoutFiles.layouts, ...layoutFiles.documents, ...dialogFiles.documents, ...cardFiles.documents,
      ...dropdownFiles.documents, ...dropdownFiles.application,
      ...optionButtonFiles.documents, ...questionNumberFiles.documents, ...iconButtonFiles.documents, ...inputFiles.documents, ...selectFiles.documents, ...dropdownPublicFiles.documents, ...checkboxFiles.documents, ...selectionCardFiles.documents, ...selectionPatternFiles.documents, ...selectionPlaygroundFiles.documents, ...radioFiles.documents, ...switchFiles.documents, ...tabsFiles.documents, ...tagFiles.documents,
      ...(isTokenFoundationsV1 ? tokenFoundationsV1Files.documents : []),
      ...iconFiles.documents,
      ...(isTailwindB2 ? ["docs/adr/0002-tailwind-b2-local-fork.md"] : []),
      ...(isTailwindB2
        ? [
            "manifests/contracts/tailwind-b2.yaml",
            "manifests/ui/button.yaml",
            "manifests/ui/input.yaml",
          ]
        : []),
    ].filter((filePath) => filePath.startsWith(`${blockedDirectory}/`));
    if (authorizedDocuments.length > 0) {
      const allowed = new Set([placeholderPath, ...authorizedDocuments.map((filePath) => join(workspaceRoot, filePath))]);
      for (const filePath of directoryFiles) {
        if (!allowed.has(filePath)) failures.push(`document outside the Icon library authorization: ${relative(workspaceRoot, filePath)}`);
      }
      if (existsSync(placeholderPath) && readFileSync(placeholderPath, "utf8") !== "\n") {
        failures.push(`${blockedDirectory}/.gitkeep must remain a canonical placeholder`);
      }
      continue;
    }
    if (
      directoryFiles.length !== 1 ||
      directoryFiles[0] !== placeholderPath ||
      statSync(placeholderPath).size !== 1 ||
      readFileSync(placeholderPath, "utf8") !== "\n"
    ) {
      failures.push(
        `${blockedDirectory} must remain a canonical empty placeholder during Day 3`,
      );
    }
  }

  const allowedDayThreeEvidenceFiles = [
    ...textButtonFiles.evidence,
    "evidence/runtime/day-3/README.md",
    "evidence/runtime/day-3/core-ui-page.png",
    "evidence/runtime/day-3/red-green-summary.md",
  ].sort();
  const actualDayThreeEvidenceFiles = collectFiles(
    join(workspaceRoot, "evidence/runtime/day-3"),
  )
    .map((filePath) => relative(workspaceRoot, filePath))
    .sort();
  if (isCompleted) {
    assertExact(
      "Day 3 runtime evidence allowlist",
      actualDayThreeEvidenceFiles,
      allowedDayThreeEvidenceFiles.filter((file) => textButtonFiles.requireComplete || !textButtonFiles.evidence.includes(file) || actualDayThreeEvidenceFiles.includes(file)),
    );
  } else {
    for (const filePath of actualDayThreeEvidenceFiles) {
      if (!allowedDayThreeEvidenceFiles.includes(filePath)) {
        failures.push(`runtime evidence outside the Day 3 allowlist: ${filePath}`);
      }
    }
  }

  if (isCompleted) {
    const screenshotPath = join(
      workspaceRoot,
      "evidence/runtime/day-3/core-ui-page.png",
    );
    const readmePath = join(workspaceRoot, "evidence/runtime/day-3/README.md");
    try {
      const screenshotStat = lstatSync(screenshotPath);
      if (!screenshotStat.isFile() || screenshotStat.isSymbolicLink()) {
        failures.push("Day 3 Core UI screenshot must be a regular file");
      } else {
        const screenshotBuffer = readFileSync(screenshotPath);
        const screenshotMetadata = inspectPngMetadata(screenshotBuffer);
        if (
          screenshotBuffer.length < 100_000 ||
          screenshotMetadata.width < 1_200 ||
          screenshotMetadata.height < 800
        ) {
          failures.push("Day 3 Core UI screenshot is anomalously small");
        }
        const readme = readFileSync(readmePath, "utf8");
        const size = screenshotBuffer.length;
        const hash = createHash("sha256").update(screenshotBuffer).digest("hex");
        if (!readme.includes(`  - 文件大小：\`${size} bytes\``)) {
          failures.push("Day 3 screenshot byte size is not recorded exactly");
        }
        if (!readme.includes(`  - SHA-256：\`${hash}\``)) {
          failures.push("Day 3 screenshot SHA-256 is not recorded exactly");
        }
      }
    } catch (error) {
      failures.push(`Day 3 Core UI screenshot cannot be audited: ${error.message}`);
    }
  }

  const foundationsRuntimeSources = collectFiles(
    join(workspaceRoot, "packages/foundations/src"),
  ).filter((filePath) => /\.(?:[cm]?[jt]sx?|css)$/.test(filePath));
  const uiRuntimeSources = collectFiles(join(workspaceRoot, "packages/ui/src")).filter(
    (filePath) => /\.(?:[cm]?[jt]sx?|css)$/.test(filePath),
  );
  const privateReferenceDefinitionFiles = new Set(
    [
      "packages/foundations/src/token-contract.ts",
      "packages/foundations/src/tokens.css",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  for (const filePath of [
    ...applicationSources,
    ...foundationsRuntimeSources,
    ...uiRuntimeSources,
  ].filter((candidate) => !/\.test\.[^.]+$/.test(candidate))) {
    if (
      !privateReferenceDefinitionFiles.has(filePath) &&
      usesPrivateReferenceColor(readFileSync(filePath, "utf8"))
    ) {
      failures.push(
        `private reference color consumed outside Foundations definitions: ${relative(workspaceRoot, filePath)}`,
      );
    }
  }
  for (const filePath of uiRuntimeSources) {
    const source = readFileSync(filePath, "utf8");
    const headlessImports = [...source.matchAll(/(?:\bfrom\s*|\bimport\s*(?:\(\s*)?|\brequire\s*\(\s*)["']([^"']+)["']/g)]
      .map((match) => match[1]).filter((specifier) => /^(?:@base-ui\/|@radix-ui\/|radix-ui|shadcn|@shadcn\/)/.test(specifier));
    if (headlessImports.some((specifier) => !(tooltipAuthorized && relative(workspaceRoot, filePath) === "packages/ui/src/tooltip/tooltip.tsx" && specifier === "@base-ui/react/tooltip")
      && !isTabsImport(livePhaseStatus, relative(workspaceRoot, filePath), specifier)
      && !(tagBatchThreeAuthorized && isTagBatchThreeImport(relative(workspaceRoot, filePath), specifier))
      && !isAvatarFamilyImport(livePhaseStatus, relative(workspaceRoot, filePath), specifier)
      && !(hasDialogV2Authorization(livePhaseStatus) && isDialogV2Import(relative(workspaceRoot, filePath), specifier))
      && !(hasDialogRefinementAuthorization(livePhaseStatus) && relative(workspaceRoot, filePath) === "packages/ui/src/dialog/dialog.tsx" && specifier === "@base-ui/react/alert-dialog")
      && !(hasDropdownFamilyAuthorization(livePhaseStatus) && isDropdownFamilyImport(relative(workspaceRoot, filePath), specifier))
      && !(hasSelectFormalDependenciesAuthorization(livePhaseStatus) && isSelectFormalImport(relative(workspaceRoot, filePath), specifier))
      && !isSwitchImport(livePhaseStatus, relative(workspaceRoot, filePath), specifier)
      && !isScopedHeadlessImport(relative(workspaceRoot, filePath), specifier))) {
      failures.push(
        `unapproved Headless or shadcn import found in ${relative(workspaceRoot, filePath)}`,
      );
    }
  }
  for (const filePath of foundationsRuntimeSources) {
    const source = readFileSync(filePath, "utf8");
    if (hasRainUiModuleDependency(source)) {
      failures.push(
        `Foundations reverses the dependency direction in ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  const allowedDayThreeWorkspaceSources = new Set(
    [
      ...scopedFiles.workspace,
      ...alertFiles.workspace, ...alertFiles.application, ...tooltipFiles.workspace, ...reportAChecks, ...reportAApplication, ...tokenFirstChecks, ...tokenFirstG2Checks, ...listPilotChecks, ...tokenFirstApplication, ...tokenFirstG2Application, ...qualityApplication, ...m2Files.application, ...m2Files.workspace, ...rn15Files.workspace, ...rn14Files.workspace, ...rn13Files.workspace, ...numberFiles.application, ...avatarFiles.application, ...formFiles.application, ...tableFiles.application, ...layoutFiles.application, ...dialogFiles.application, ...cardFiles.application, ...alertFiles.ui, ...tooltipFiles.ui, ...numberFiles.ui, ...avatarFiles.ui, ...formFiles.ui, ...tableFiles.ui, ...dialogFiles.ui, ...cardFiles.ui, ...layoutFiles.layouts, ...numberFiles.workspace, ...avatarFiles.workspace, ...formFiles.workspace, ...tableFiles.workspace, ...layoutFiles.workspace, ...dialogFiles.workspace, ...cardFiles.workspace,
      ...dropdownFiles.application, ...dropdownFiles.workspace,
      ...sizeReviewFiles.application, ...sizeReviewFiles.workspace,
      ...optionButtonFiles.application, ...questionNumberFiles.application, ...iconButtonFiles.application, ...inputFiles.application, ...selectFiles.application, ...dropdownPublicFiles.application, ...checkboxFiles.application, ...selectionCardFiles.application, ...selectionPatternFiles.application, ...selectionPlaygroundFiles.application, ...radioFiles.application, ...switchFiles.application, ...tabsFiles.application, ...tagFiles.application, ...selectFiles.ui, ...dropdownPublicFiles.ui, ...checkboxFiles.ui, ...selectionCardFiles.ui, ...selectionPatternFiles.ui, ...selectionPlaygroundFiles.ui, ...radioFiles.ui, ...switchFiles.ui, ...tabsFiles.ui, ...tagFiles.ui, ...optionButtonFiles.ui, ...questionNumberFiles.ui, ...iconButtonFiles.ui, ...inputFiles.ui.filter((file) => !["input.tsx", "input.test.tsx", "input.utils.ts", "input.utils.test.ts"].some((name) => file === `packages/ui/src/input/${name}`)), ...optionButtonFiles.foundations, ...questionNumberFiles.foundations, ...iconButtonFiles.foundations, ...inputFiles.foundations, ...selectFiles.foundations, ...checkboxFiles.foundations, ...selectionCardFiles.foundations, ...selectionPatternFiles.foundations, ...selectionPlaygroundFiles.foundations, ...radioFiles.foundations, ...tabsFiles.foundations, ...tagFiles.foundations, ...optionButtonFiles.workspace, ...questionNumberFiles.workspace, ...iconButtonFiles.workspace, ...inputFiles.workspace, ...selectFiles.workspace, ...dropdownPublicFiles.workspace, ...checkboxFiles.workspace, ...selectionCardFiles.workspace, ...selectionPatternFiles.workspace, ...selectionPlaygroundFiles.workspace, ...radioFiles.workspace, ...switchFiles.workspace, ...tabsFiles.workspace, ...tagFiles.workspace,
      ...buttonMigrationApplicationFiles,
      ...buttonMigrationFoundationFiles,
      ...(isTokenFoundationsV1 ? [...tokenFoundationsV1Files.application, ...tokenFoundationsV1Files.foundations, ...tokenFoundationsV1Files.workspace] : []),
      ...textButtonFiles.application,
      ...textButtonFiles.ui,
      ...textButtonFiles.workspace,
      ...iconFiles.application,
      ...iconFiles.ui,
      ...iconFiles.foundations,
      ...iconFiles.workspace,
      ...iconFiles.sourceExports,
      ...iconFiles.evidence,
      "apps/playground/vite.config.ts",
      "apps/playground/index.html",
      "apps/playground/src/main.tsx",
      "apps/playground/src/app.tsx",
      "apps/playground/src/styles.css",
      "apps/playground/src/docs/evidence-index.ts",
      "apps/playground/src/docs/benchmark-index.ts",
      "apps/playground/src/docs/foundations-page.tsx",
      "apps/playground/src/docs/foundations-page.test.tsx",
      "apps/playground/src/docs/components/core-ui-page.tsx",
      "apps/playground/src/docs/components/core-ui-page.test.tsx",
      "apps/playground/src/routes/route-registry.ts",
      "apps/playground/src/routes/overview-page.tsx",
      "apps/playground/src/routes/playground-shell.test.tsx",
      "packages/foundations/src/index.ts",
      ...(isTailwindB2
        ? [
            "packages/foundations/src/composition-contract.ts",
            "packages/foundations/src/composition-contract.test.ts",
            "packages/foundations/src/tailwind-theme.css",
          ]
        : []),
      "packages/foundations/src/tokens.css",
      "packages/foundations/src/token-contract.ts",
      "packages/foundations/src/token-contract.test.ts",
      "packages/foundations/src/typography.css",
      "packages/foundations/src/density.tsx",
      "packages/foundations/src/density.test.tsx",
      "packages/foundations/src/motion.css",
      "packages/foundations/src/focus.css",
      "packages/ui/src/index.ts",
      "packages/ui/src/styles.css",
      "packages/ui/src/button/button.tsx",
      "packages/ui/src/button/button.test.tsx",
      ...(isTailwindB2
        ? [
            "packages/ui/src/button/button.styles.ts",
            "packages/ui/src/button/button.styles.test.ts",
          ]
        : []),
      "packages/ui/src/input/input.tsx",
      "packages/ui/src/input/input.test.tsx",
      "packages/ui/src/input/input.utils.ts",
      "packages/ui/src/input/input.utils.test.ts",
      "packages/ui/src/tag/tag.tsx",
      "packages/ui/src/badge/badge.tsx",
      "packages/ui/src/tag/tag-badge.test.tsx",
      "packages/ui/src/surface/surface.tsx",
      "packages/ui/src/card/card.tsx",
      "packages/ui/src/surface/surface-card.test.tsx",
      ...(isTailwindB2
        ? [
            "packages/ui/src/utils/rain-class-names.ts",
            "packages/ui/src/utils/rain-class-names.test.ts",
            "packages/ui/src/recipes/local-recipe.ts",
            "packages/ui/src/recipes/local-recipe.test.ts",
          ]
        : []),
      "playwright.config.ts",
      "vitest.config.ts",
      "scripts/verification-helpers.mjs",
      "scripts/verification-helpers.test.ts",
      "scripts/verify-workspace.mjs",
      "scripts/verify-evidence.mjs",
      "scripts/verify-boundaries.mjs",
      ...(isTailwindB2
        ? ["scripts/verify-tailwind-b2.mjs", "scripts/verify-tailwind-b2.test.ts"]
        : []),
      "scripts/verify-rain-classic-reuse-audit.mjs",
      "scripts/verify-rain-classic-reuse-audit.test.ts",
      "scripts/collect-rain-classic-inventory.mjs",
      "scripts/collect-rain-classic-inventory.test.ts",
      "tests/setup.ts",
      "tests/node-runtime.d.ts",
      "tests/color-contrast.test.ts",
      "tests/e2e/color-contrast.ts",
      "tests/e2e/playground-shell.spec.ts",
      "tests/e2e/foundations.spec.ts",
      "tests/e2e/core-ui.spec.ts",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  // Under the fully validated accepted navigation parent, these are data domains, not executable workspace inputs.
  // Their existing exact evidence/source-lock validators remain responsible; old phases retain the original scan.
  const workspaceSources = collectFiles(workspaceRoot).filter((filePath) =>
    /\.(?:[cm]?[jt]sx?|astro|css|html|mdx|svelte|svg|vue)$/.test(filePath)
      && !(navigationAuthorized && /^(?:evidence|artifacts|docs)\//.test(relative(workspaceRoot, filePath))),
  );
  for (const filePath of workspaceSources) {
    if (!allowedDayThreeWorkspaceSources.has(filePath)) {
      failures.push(
        `source file outside the complete Day 3 allowlist: ${relative(workspaceRoot, filePath)}`,
      );
    }
  }
  if (navigationAuthorized) for (const filePath of workspaceSources) {
    const owner = relative(workspaceRoot, filePath);
    if (!/^(?:apps|packages)\//.test(owner) || !/\.[cm]?[jt]sx?$/.test(filePath)) continue;
    const source = readFileSync(filePath, "utf8");
    for (const match of source.matchAll(/(?:\bfrom\s*|\bimport\s*(?:\(\s*)?|\brequire\s*\(\s*)["']([^"']+)["']/g)) {
      const specifier = match[1];
      if (!specifier.startsWith(".")) continue;
      const target = resolve(dirname(filePath), specifier.split(/[?#]/)[0]);
      if (/^(?:evidence|artifacts|docs)(?:\/|$)/.test(relative(workspaceRoot, target)) && (!/\.[^/]+$/.test(target) || /\.[cm]?[jt]sx?$/.test(target))) {
        failures.push(`source import enters a data domain instead of registered live code: ${owner} -> ${relative(workspaceRoot, target)}`);
        continue;
      }
      const candidates = [target, ...[".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".mts", ".cts"].flatMap(extension => [`${target}${extension}`, join(target, `index${extension}`)])];
      const resolvedSource = candidates.find(path => existsSync(path) && lstatSync(path).isFile());
      if (resolvedSource && /\.[cm]?[jt]sx?$/.test(resolvedSource) && !allowedDayThreeWorkspaceSources.has(resolvedSource)) {
        failures.push(`unregistered source import outside live source inventory: ${owner} -> ${relative(workspaceRoot, resolvedSource)}`);
      }
    }
  }


  try {
    const gitRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    if (gitRoot !== workspaceRoot) {
      failures.push(`Git root must be the spike workspace, received ${gitRoot}`);
    }
  } catch (error) {
    failures.push(`Git workspace cannot be audited: ${error.message}`);
  }
  if (cardV2Authorized) {
    const baseline = livePhaseStatus.componentRefinements.cardV2.sourceControl;
    try {
      const git = (...args) => execFileSync("git", args, { cwd: workspaceRoot, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
      if (git("rev-parse", "HEAD") !== baseline.baselineCommit) failures.push("Card V2 Git HEAD must retain the authorized pre-existing baseline; new commits are not authorized");
      if (git("remote") !== baseline.existingRemote || git("remote", "get-url", "--all", baseline.existingRemote) !== baseline.existingRemoteUrl
        || git("remote", "get-url", "--push", "--all", baseline.existingRemote) !== baseline.existingRemoteUrl) failures.push("Card V2 Git remote must retain the exact pre-existing origin");
      const prior = readRegularNonSymbolicFile(join(workspaceRoot, "status", baseline.priorAuthorization), "prior Git authorization").toString("utf8");
      if (!prior.includes("GitHub 私有送审续步") || !prior.includes("继续下一步")) failures.push("Card V2 pre-existing Git state requires its recorded authorization");
    } catch (error) { failures.push("Card V2 Git baseline cannot be audited: " + error.message); }
  } else {
  try {
    execFileSync("git", ["rev-parse", "--verify", "HEAD"], {
      cwd: workspaceRoot,
      stdio: "ignore",
    });
    failures.push(
      "Git has a local HEAD commit while Day 3 localGitCommit is not-created",
    );
  } catch {
    // An unborn repository is the expected state until Git authorization exists.
  }
  try {
    const remotes = execFileSync("git", ["remote"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
      .trim()
      .split(/\r?\n/)
      .filter(Boolean);
    if (remotes.length > 0) {
      failures.push(
        `Git has configured remotes while Day 3 remoteGit is not-configured: ${remotes.join(", ")}`,
      );
    }
  } catch (error) {
    failures.push(`Git remotes cannot be audited: ${error.message}`);
  }
  }
}

const sharedPackageSources = collectFiles(join(workspaceRoot, "packages")).filter(
  (filePath) => /\.(?:[cm]?[jt]sx?|json|css)$/.test(filePath),
);

for (const filePath of sharedPackageSources) {
  let source;
  try {
    source = readRegularNonSymbolicFile(
      filePath,
      relative(workspaceRoot, filePath),
      { nonEmpty: false },
    ).toString("utf8");
  } catch (error) {
    failures.push(`shared package source cannot be audited: ${error.message}`);
    continue;
  }
  if (
    source.includes("@rain-next/playground") ||
    source.includes("apps/playground") ||
    source.includes("/benchmarks/")
  ) {
    failures.push(
      `shared package reverses the dependency direction in ${relative(workspaceRoot, filePath)}`,
    );
  }
  if (isTailwindB2 && /\.(?:[cm]?[jt]sx?)$/.test(filePath)) {
    const sourcePath = relative(workspaceRoot, filePath);
    if (/["']clsx["']/.test(source)) {
      failures.push(`Direct clsx imports are forbidden in B2 sources: ${sourcePath}`);
    }
    if (
      /["']tailwind-merge["']/.test(source) &&
      sourcePath !== "packages/ui/src/utils/rain-class-names.ts"
    ) {
      failures.push(
        `tailwind-merge must remain behind rainCn in packages/ui/src/utils/rain-class-names.ts: ${sourcePath}`,
      );
    }
    if (
      /["']class-variance-authority["']/.test(source) &&
      sourcePath !== "packages/ui/src/button/button.styles.ts" &&
      !(iconButtonAuthorized && sourcePath === "packages/ui/src/icon-button/icon-button.styles.ts")
      && !(inputAuthorized && sourcePath === "packages/ui/src/input/input.styles.ts")
      && !(selectAuthorized && sourcePath === "packages/ui/src/field/field.styles.ts")
      && !(g123PlaygroundAuthorized && ["button-group", "toggle", "toggle-group"].some(name => sourcePath === `packages/ui/src/${name}/${name}.tsx`))
    ) {
      failures.push(
        `class-variance-authority is restricted to the Button Master recipe during Task 7: ${sourcePath}`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error("Boundary verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Boundary verification passed for ${phaseId}: ${packageFiles.length} package manifests, ${applicationSources.length} application sources, ${sharedPackageSources.length} shared-package sources; fail-closed dependency, lifecycle, full-source allowlist, and blocked-layer restrictions applied.`,
  );
}
