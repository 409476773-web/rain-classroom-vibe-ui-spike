import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join, normalize } from "node:path";

import { parseYamlSubset } from "./verification-helpers.mjs";

const auditRoot = process.cwd();
const strictCompletion = process.env.RAIN_REUSE_AUDIT_REQUIRE_COMPLETE === "1";
const liveSourceRoot = process.env.RAIN_CLASSIC_AUDIT_ROOT;
const failures = [];

const sourceLockPath = "evidence/rain-classic/source-lock.yaml";
const reuseMatrixPath = "evidence/rain-classic/reuse-matrix.yaml";
const reportPath = "docs/audits/2026-09-01-rain-classic-reuse-audit.md";
const requiredFactPaths = [
  "src/index.js",
  "src/component-lifecycle.js",
  "src/registry/component-registry.generated.js",
];
const requiredTargetIds = [
  "button",
  "input",
  "select",
  "dialog",
  "tag-badge",
  "surface-card",
  "table-primitives",
  "statistic",
  "stack",
  "inline",
  "grid",
  "split-sidebar",
];
const migrationLabels = new Set([
  "adopt-shadcn",
  "adapt-shadcn",
  "rewrite-from-rain",
  "retain-vue-only",
  "react-only",
  "retire",
]);
const auditStatuses = new Set([
  "unreviewed",
  "reviewed",
  "needs-decision",
  "awaiting-human",
  "accepted",
]);
const riskTiers = new Set(["deep", "standard", "record-only"]);
const confidenceValues = new Set(["high", "medium", "low"]);
const reviewValues = new Set([
  "unreviewed",
  "not-run",
  "not-required",
  "reviewed",
  "passed",
  "failed",
  "blocked",
]);

function absolute(filePath) {
  return join(auditRoot, filePath);
}

function addFailure(message) {
  failures.push(message);
}

function loadYaml(filePath, label) {
  if (!existsSync(absolute(filePath))) {
    addFailure(`missing ${label}: ${filePath}`);
    return null;
  }
  try {
    return parseYamlSubset(readFileSync(absolute(filePath), "utf8"));
  } catch (error) {
    addFailure(`${label} cannot be parsed: ${error.message}`);
    return null;
  }
}

function asArray(value, label) {
  if (!Array.isArray(value)) {
    addFailure(`${label} must be an array`);
    return [];
  }
  return value;
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    addFailure(`${label} must be a non-empty string`);
    return false;
  }
  return true;
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

function sha256(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function git(sourceRoot, args) {
  return execFileSync("git", args, {
    cwd: sourceRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function inspectStoredStrings(value, pointer = "root") {
  if (typeof value === "string") {
    if (
      value.startsWith("/Users/") ||
      value.startsWith("/home/") ||
      /^[A-Za-z]:[\\/]/.test(value)
    ) {
      addFailure(`${pointer} must not store an absolute local path`);
    }
    if (/^https?:\/\//i.test(value)) {
      addFailure(`${pointer} must not store a full URL`);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((child, index) => inspectStoredStrings(child, `${pointer}[${index}]`));
    return;
  }
  if (isObject(value)) {
    for (const [key, child] of Object.entries(value)) {
      inspectStoredStrings(child, `${pointer}.${key}`);
    }
  }
}

function validateSourceLock(sourceLock) {
  if (!sourceLock) return;
  if (sourceLock.schemaVersion !== "1.0") {
    addFailure("source lock schemaVersion must be 1.0");
  }
  if (sourceLock.kind !== "RainClassicSourceLock") {
    addFailure("source lock kind must be RainClassicSourceLock");
  }
  requireNonEmptyString(sourceLock.auditId, "source lock auditId");
  if (!isObject(sourceLock.source)) {
    addFailure("source lock source must be a mapping");
    return;
  }
  if (!/^[a-f0-9]{40}$/.test(sourceLock.source.commit ?? "")) {
    addFailure("source.commit must be a 40-character Git object ID");
  }
  if (!/^[a-f0-9]{40}$/.test(sourceLock.source.tree ?? "")) {
    addFailure("source.tree must be a 40-character Git object ID");
  }
  for (const key of ["repository", "branch", "packageName", "packageVersion"]) {
    requireNonEmptyString(sourceLock.source[key], `source.${key}`);
  }
  if (sourceLock.source.trackedWorktreeClean !== true) {
    addFailure("source.trackedWorktreeClean must be true");
  }
  if (sourceLock.source.untrackedFilesExcluded !== true) {
    addFailure("source.untrackedFilesExcluded must be true");
  }
  if (sourceLock.source.localPathStored !== false) {
    addFailure("source.localPathStored must be false");
  }

  const facts = asArray(sourceLock.facts, "source lock facts");
  const factPaths = facts.map((fact) => fact?.path);
  for (const duplicate of findDuplicates(factPaths)) {
    addFailure(`duplicate source fact path ${duplicate}`);
  }
  for (const factPath of requiredFactPaths) {
    if (!factPaths.includes(factPath)) {
      addFailure(`missing required source fact ${factPath}`);
    }
  }
  for (const fact of facts) {
    if (!isObject(fact)) {
      addFailure("source fact must be a mapping");
      continue;
    }
    if (
      !requireNonEmptyString(fact.path, "source fact path") ||
      isAbsolute(fact.path) ||
      normalize(fact.path).startsWith("..")
    ) {
      addFailure(`source fact path must be repository-relative: ${String(fact.path)}`);
    }
    if (!/^[a-f0-9]{64}$/.test(fact.sha256 ?? "")) {
      addFailure(`source fact ${String(fact.path)} must have a 64-character SHA-256`);
    }
  }

  if (sourceLock.target?.project !== "rain-classroom-vibe-ui-spike") {
    addFailure("source lock target.project must be rain-classroom-vibe-ui-spike");
  }
  if (sourceLock.target?.phaseAtStart !== "foundation-spike-day-2") {
    addFailure("source lock target.phaseAtStart must be foundation-spike-day-2");
  }
  if (sourceLock.boundaries?.sourceReadOnly !== true) {
    addFailure("source lock boundaries.sourceReadOnly must be true");
  }
  for (const key of ["figmaWrite", "publication", "businessMigration"]) {
    if (sourceLock.boundaries?.[key] !== "not-authorized") {
      addFailure(`source lock boundaries.${key} must remain not-authorized`);
    }
  }
  inspectStoredStrings(sourceLock, "sourceLock");
}

function validateAsset(asset, index) {
  const label = asset?.id ?? `assets[${index}]`;
  if (!isObject(asset)) {
    addFailure(`asset ${index} must be a mapping`);
    return;
  }
  requireNonEmptyString(asset.id, `asset ${index} id`);
  requireNonEmptyString(asset.stableName, `${label} stableName`);
  requireNonEmptyString(asset.identity, `${label} identity`);
  if (!isObject(asset.source)) {
    addFailure(`${label} source must be a mapping`);
  } else {
    requireNonEmptyString(asset.source.owner, `${label} source.owner`);
    if (asset.source.public !== true && asset.source.public !== false) {
      addFailure(`${label} source.public must be boolean`);
    }
    if (
      asset.source.directInternal !== true &&
      asset.source.directInternal !== false
    ) {
      addFailure(`${label} source.directInternal must be boolean`);
    }
  }

  const audit = asset.audit;
  if (!isObject(audit)) {
    addFailure(`${label} audit must be a mapping`);
  } else {
    if (!reviewValues.has(audit.staticReview)) {
      addFailure(`${label} has illegal staticReview ${String(audit.staticReview)}`);
    }
    if (!riskTiers.has(audit.riskTier)) {
      addFailure(`${label} has illegal risk tier ${String(audit.riskTier)}`);
    }
    if (!reviewValues.has(audit.runtimeReview)) {
      addFailure(`${label} has illegal runtimeReview ${String(audit.runtimeReview)}`);
    }
    if (!reviewValues.has(audit.browserReview)) {
      addFailure(`${label} has illegal browserReview ${String(audit.browserReview)}`);
    }
    if (!confidenceValues.has(audit.confidence)) {
      addFailure(`${label} has illegal confidence ${String(audit.confidence)}`);
    }
    if (!auditStatuses.has(audit.status)) {
      addFailure(`${label} has illegal audit status ${String(audit.status)}`);
    }
  }

  const inheritance = asset.inheritance;
  if (!isObject(inheritance)) {
    addFailure(`${label} inheritance must be a mapping`);
  } else {
    for (const key of [
      "retainedTraits",
      "redesignedTraits",
      "intentionallyNotInherited",
    ]) {
      asArray(inheritance[key], `${label} inheritance.${key}`);
    }
  }

  const decision = asset.decision;
  if (!isObject(decision)) {
    addFailure(`${label} decision must be a mapping`);
  } else {
    const allowsPendingDecision =
      !strictCompletion &&
      audit?.status === "unreviewed" &&
      audit?.staticReview === "unreviewed";
    if (
      !migrationLabels.has(decision.migrationLabel) &&
      !(allowsPendingDecision && decision.migrationLabel === null)
    ) {
      addFailure(`illegal migration label ${String(decision.migrationLabel)} on ${label}`);
    }
    if (!(allowsPendingDecision && decision.targetLayer === null)) {
      requireNonEmptyString(decision.targetLayer, `${label} decision.targetLayer`);
    }
    asArray(decision.blockers, `${label} decision.blockers`);
  }

  if (asset.implementation !== "not-started") {
    addFailure(`${label} implementation must remain not-started`);
  }
  if (!["not-evaluated", "awaiting-human", "accepted"].includes(asset.humanGate)) {
    addFailure(`${label} has illegal humanGate ${String(asset.humanGate)}`);
  }
  for (const key of ["figmaMaterial", "figmaComponent", "packageRegistry"]) {
    if (asset.publication?.[key] !== "not-authorized") {
      addFailure(`${label} publication.${key} must remain not-authorized`);
    }
  }
  if (asset.businessMigration !== "not-authorized") {
    addFailure(`${label} businessMigration must remain not-authorized`);
  }

  if (strictCompletion) {
    if (audit?.status === "unreviewed" || audit?.staticReview === "unreviewed") {
      addFailure(`strict completion forbids unreviewed asset ${label}`);
    }
    requireNonEmptyString(decision?.rationale, `${label} decision.rationale`);
    if (
      audit?.status === "needs-decision" &&
      asArray(decision?.blockers, `${label} decision.blockers`).length === 0
    ) {
      addFailure(`strict completion requires blockers for needs-decision asset ${label}`);
    }
  }
}

function validateMatrix(matrix, sourceLock) {
  if (!matrix) {
    return {
      assets: [],
      publicIds: [],
      higherLevelIds: [],
      internalIds: [],
      excludedIds: [],
    };
  }
  if (matrix.schemaVersion !== "1.0") {
    addFailure("reuse matrix schemaVersion must be 1.0");
  }
  if (matrix.kind !== "RainClassicReuseMatrix") {
    addFailure("reuse matrix kind must be RainClassicReuseMatrix");
  }
  if (sourceLock && matrix.auditId !== sourceLock.auditId) {
    addFailure("reuse matrix auditId must match source lock auditId");
  }
  if (matrix.sourceLockRef !== sourceLockPath) {
    addFailure(`reuse matrix sourceLockRef must be ${sourceLockPath}`);
  }

  const publicIds = asArray(
    matrix.inventory?.publicAssetIds,
    "inventory.publicAssetIds",
  );
  const higherLevelIds = asArray(
    matrix.inventory?.higherLevelAssetIds,
    "inventory.higherLevelAssetIds",
  );
  const internalIds = asArray(
    matrix.inventory?.directInternalAssetIds,
    "inventory.directInternalAssetIds",
  );
  const excludedIds = asArray(
    matrix.inventory?.excludedAssetIds,
    "inventory.excludedAssetIds",
  );
  for (const [label, values] of [
    ["public asset", publicIds],
    ["higher-level asset", higherLevelIds],
    ["direct Internal", internalIds],
    ["excluded asset", excludedIds],
  ]) {
    for (const duplicate of findDuplicates(values)) {
      addFailure(`duplicate ${label} inventory ID ${duplicate}`);
    }
  }

  const assets = asArray(matrix.assets, "reuse matrix assets");
  assets.forEach(validateAsset);
  const assetIds = assets.map((asset) => asset?.id);
  for (const duplicate of findDuplicates(assetIds)) {
    addFailure(`duplicate asset ID ${duplicate}`);
  }
  const assetIdSet = new Set(assetIds);
  for (const id of publicIds) {
    if (!assetIdSet.has(id)) addFailure(`public asset missing from matrix: ${id}`);
  }
  for (const id of higherLevelIds) {
    if (!assetIdSet.has(id)) {
      addFailure(`higher-level asset missing from matrix: ${id}`);
    }
  }
  for (const id of internalIds) {
    if (!assetIdSet.has(id)) addFailure(`direct Internal missing from matrix: ${id}`);
  }

  const exclusions = asArray(matrix.exclusions, "reuse matrix exclusions");
  const exclusionIds = exclusions.map((entry) => entry?.id);
  for (const duplicate of findDuplicates(exclusionIds)) {
    addFailure(`duplicate exclusion ID ${duplicate}`);
  }
  for (const id of excludedIds) {
    if (!exclusionIds.includes(id)) {
      addFailure(`excluded asset missing exclusion record: ${id}`);
    }
  }
  for (const exclusion of exclusions) {
    requireNonEmptyString(exclusion?.stableName, `${exclusion?.id} exclusion.stableName`);
    if (exclusion?.riskTier !== "record-only") {
      addFailure(`${exclusion?.id} exclusion.riskTier must be record-only`);
    }
    requireNonEmptyString(exclusion?.reason, `${exclusion?.id} exclusion.reason`);
    requireNonEmptyString(exclusion?.replacement, `${exclusion?.id} exclusion.replacement`);
    asArray(exclusion?.evidence, `${exclusion?.id} exclusion.evidence`);
  }

  const countExpectations = {
    scopeAssetCount: assets.length,
    publicAssetCount: publicIds.length,
    higherLevelAssetCount: higherLevelIds.length,
    directInternalAssetCount: internalIds.length,
    excludedAssetCount: excludedIds.length,
  };
  for (const [key, expected] of Object.entries(countExpectations)) {
    if (
      Object.hasOwn(matrix.inventory ?? {}, key) &&
      matrix.inventory[key] !== expected
    ) {
      addFailure(
        `inventory.${key} must equal ${expected}, received ${String(matrix.inventory[key])}`,
      );
    }
  }

  const targetGaps = asArray(matrix.targetGaps, "reuse matrix targetGaps");
  const targetIds = targetGaps.map((entry) => entry?.target);
  for (const duplicate of findDuplicates(targetIds)) {
    addFailure(`duplicate Rain Next target ${duplicate}`);
  }
  for (const targetId of requiredTargetIds) {
    if (!targetIds.includes(targetId)) {
      addFailure(`Rain Next target missing: ${targetId}`);
    }
  }
  for (const target of targetGaps) {
    if (!auditStatuses.has(target?.status)) {
      addFailure(
        `${String(target?.target)} has illegal target status ${String(target?.status)}`,
      );
    }
    const allowsPendingTarget =
      !strictCompletion && target?.status === "unreviewed";
    if (
      !migrationLabels.has(target?.migrationLabel) &&
      !(allowsPendingTarget && target?.migrationLabel === null)
    ) {
      addFailure(
        `illegal migration label ${String(target?.migrationLabel)} on target ${String(target?.target)}`,
      );
    }
    if (!(allowsPendingTarget && target?.classicSource === null)) {
      requireNonEmptyString(target?.classicSource, `${target?.target} classicSource`);
    }
    requireNonEmptyString(target?.targetLayer, `${target?.target} targetLayer`);
    if (!(allowsPendingTarget && target?.rationale === null)) {
      requireNonEmptyString(target?.rationale, `${target?.target} rationale`);
    }
    if (strictCompletion && target?.status === "unreviewed") {
      addFailure(`strict completion forbids unreviewed Rain Next target ${target.target}`);
    }
  }

  const hasAccepted = assets.some(
    (asset) => asset?.audit?.status === "accepted" || asset?.humanGate === "accepted",
  );
  const hasNeedsDecision = assets.some(
    (asset) => asset?.audit?.status === "needs-decision",
  );
  if (hasAccepted && hasNeedsDecision) {
    addFailure("accepted audit cannot coexist with needs-decision assets");
  }

  const expectedLifecycle = {
    implementation: "not-started",
    humanGate: ["not-evaluated", "awaiting-human", "accepted"],
    figmaMaterialWrite: "not-authorized",
    figmaComponentPublication: "not-authorized",
    packageRegistryPublication: "not-authorized",
    businessMigration: "not-authorized",
    localGitCommit: "not-created",
    remoteGit: "not-configured",
  };
  for (const [key, expected] of Object.entries(expectedLifecycle)) {
    const actual = matrix.lifecycle?.[key];
    if (Array.isArray(expected) ? !expected.includes(actual) : actual !== expected) {
      addFailure(`reuse matrix lifecycle.${key} has unauthorized value ${String(actual)}`);
    }
  }
  inspectStoredStrings(matrix, "reuseMatrix");
  return { assets, publicIds, higherLevelIds, internalIds, excludedIds };
}

function validateReport(sourceLock) {
  if (!existsSync(absolute(reportPath))) {
    if (strictCompletion) addFailure(`strict completion requires report: ${reportPath}`);
    return;
  }
  const report = readFileSync(absolute(reportPath), "utf8");
  if (sourceLock?.auditId && !report.includes(sourceLock.auditId)) {
    addFailure("audit report must contain the source lock auditId");
  }
  if (sourceLock?.source?.commit && !report.includes(sourceLock.source.commit)) {
    addFailure("audit report source commit must match source lock");
  }
  if (/\/Users\/|\/home\/|https?:\/\//i.test(report)) {
    addFailure("audit report must not store absolute local paths or full URLs");
  }
}

function validateLiveSource(sourceLock) {
  if (!liveSourceRoot || !sourceLock) return;
  try {
    const liveCommit = git(liveSourceRoot, ["rev-parse", "HEAD"]);
    const liveTree = git(liveSourceRoot, ["rev-parse", "HEAD^{tree}"]);
    const liveBranch = git(liveSourceRoot, ["branch", "--show-current"]);
    if (liveCommit !== sourceLock.source?.commit) {
      addFailure(
        `source commit mismatch: locked ${String(sourceLock.source?.commit)}, live ${liveCommit}`,
      );
    }
    if (liveTree !== sourceLock.source?.tree) {
      addFailure(
        `source tree mismatch: locked ${String(sourceLock.source?.tree)}, live ${liveTree}`,
      );
    }
    if (liveBranch !== sourceLock.source?.branch) {
      addFailure(
        `source branch mismatch: locked ${String(sourceLock.source?.branch)}, live ${liveBranch}`,
      );
    }
    execFileSync("git", ["diff", "--quiet"], { cwd: liveSourceRoot });
    execFileSync("git", ["diff", "--cached", "--quiet"], { cwd: liveSourceRoot });
  } catch (error) {
    if (error.status === 1 && error.spawnargs?.includes("--quiet")) {
      addFailure("live Rain Classic tracked worktree is not clean");
    } else if (!failures.some((failure) => failure.startsWith("source "))) {
      addFailure(`live Rain Classic Git state cannot be verified: ${error.message}`);
    }
  }

  try {
    const packageDocument = JSON.parse(
      readFileSync(join(liveSourceRoot, "package.json"), "utf8"),
    );
    if (packageDocument.name !== sourceLock.source?.packageName) {
      addFailure("live source package name does not match source lock");
    }
    if (packageDocument.version !== sourceLock.source?.packageVersion) {
      addFailure("live source package version does not match source lock");
    }
  } catch (error) {
    addFailure(`live source package.json cannot be verified: ${error.message}`);
  }

  for (const fact of asArray(sourceLock.facts, "source lock facts")) {
    const filePath = join(liveSourceRoot, fact.path ?? "");
    if (!existsSync(filePath)) {
      addFailure(`live source fact is missing: ${String(fact.path)}`);
      continue;
    }
    const actualHash = sha256(filePath);
    if (actualHash !== fact.sha256) {
      addFailure(
        `source fact SHA-256 mismatch for ${fact.path}: locked ${fact.sha256}, live ${actualHash}`,
      );
    }
  }
}

const sourceLock = loadYaml(sourceLockPath, "source lock");
const matrix = loadYaml(reuseMatrixPath, "reuse matrix");
validateSourceLock(sourceLock);
const counts = validateMatrix(matrix, sourceLock);
validateReport(sourceLock);
validateLiveSource(sourceLock);

if (failures.length > 0) {
  console.error("Rain Classic reuse audit verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Rain Classic reuse audit verification passed: assets=${counts.assets.length} public=${counts.publicIds.length} higher-level=${counts.higherLevelIds.length} direct-internal=${counts.internalIds.length} excluded=${counts.excludedIds.length} targets=${requiredTargetIds.length} mode=${liveSourceRoot ? "live" : "snapshot"} strict=${strictCompletion}`,
  );
}
