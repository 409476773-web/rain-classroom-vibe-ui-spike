import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const carouselUpgradeEvidence = "evidence/runtime/carousel-upgrade-2026-10-14/";
export const carouselUpgradeScope = "carousel-v04-public-upgrade";
export const carouselUpgradeFiles = Object.freeze([
  "packages/ui/src/carousel/carousel.tsx", "packages/ui/src/carousel/carousel.css", "packages/ui/src/carousel/carousel-playback.ts",
  "packages/ui/src/carousel/carousel.test.tsx", "packages/ui/src/carousel/carousel.upgrade.test.tsx", "packages/ui/src/carousel/README.md",
  "apps/playground/src/docs/components/carousel-examples.tsx", "apps/playground/src/docs/components/carousel-examples.css", "apps/playground/src/docs/components/carousel-artwork.tsx",
  "apps/playground/src/docs/components/g6-interaction-pages.tsx",
  "manifests/ui/carousel.yaml", "registry/g6-assets.json", "docs/ai/g6-components.md", "docs/ai/asset-index.md",
  "docs/plans/2026-10-14-carousel-upgrade.md", "status/current-phase.yaml", "packages/ui/package.json", "pnpm-lock.yaml",
  "scripts/carousel-upgrade-governance.mjs", "scripts/bind-carousel-upgrade.mjs", "scripts/verify-carousel-upgrade.mjs", "scripts/carousel-upgrade-governance.test.ts", "scripts/carousel-upgrade-source.test.ts", "scripts/carousel-color-consumers.mjs", "scripts/carousel-color-consumers.test.ts",
  "scripts/g6-governance.mjs", "scripts/g6-governance.test.ts", "scripts/g6-color-consumers.mjs", "scripts/g6-color-consumers.test.ts", "scripts/verify-g6-components.mjs",
  "scripts/verification-helpers.mjs", "scripts/verify-boundaries.mjs", "scripts/verify-token-foundations.mjs",
]);
const modulePath = "scripts/carousel-upgrade-governance.mjs";
const sourceSeal = "318e18504ddd92093df592490fcf46d8e6e05569f589c3de33ad68bd9c495abe";
const moduleHash = "b89f99f7651fa5acfb6759b67a82b5104b2bc692c30606cceaab9c5109649f71";
const oldG6BindingsHash = "cbeb6d69d2fa734a43a4012575c57a96ad54b561c8d5d55137604589e8c8e0cb";
const oldG6BaselineHash = "81ec04702dbf90420a46c3f0250be1a29133ea35e6657d935dc5603050d1b552";
const oldG6ColorLedgerHash = "9974b21a397e711870f43f9c6cff4776ebd410496cf924762db418efa0852cf4";
export const carouselUpgradeAuthorization = Object.freeze({
  kind: "CarouselUpgradeUserAuthorization", authorization: "authorized", authorizedAt: "2026-10-14",
  decisionSource: "explicit-user-confirmed-v04-visual-and-interaction-public-carousel-upgrade",
  userStatement: "开始以视觉稿为基准参照，开始改造、优化升级该组件",
  previousVisualStatement: "确定。这些交互与视觉完成检验。",
  scope: carouselUpgradeScope, workMode: "system-mode", assetIdentity: "registry-candidate",
  plan: "docs/plans/2026-10-14-carousel-upgrade.md", authorizedNewDependencies: ["embla-carousel-auto-scroll@8.5.2"],
  humanGate: "awaiting_human", previousHumanGateScope: "local-carousel-study-v04-visual-and-interaction-only",
  contrastAcceptance: "not-granted", publication: "unpublished", figmaWrite: "not-authorized",
  businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
});
export const sha256 = value => createHash("sha256").update(value).digest("hex");

export const carouselSharedSource = "apps/playground/src/docs/components/g6-interaction-pages.tsx";
export const carouselRegistrySource = "registry/g6-assets.json";
export const carouselPhaseSource = "status/current-phase.yaml";
export const carouselGuideSource = "docs/ai/g6-components.md";
export const carouselSourceMode = path => path === carouselSharedSource ? "carousel-regions-only" : path === carouselRegistrySource ? "carousel-registry-only" : path === carouselPhaseSource ? "carousel-phase-only" : path === carouselGuideSource ? "carousel-guide-only" : "whole-file";
const carouselImportBefore = "  Button, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,";
const carouselImportAfter = "  Button, Carousel, CarouselContent, CarouselControls, CarouselIndicators, CarouselItem, CarouselNext, CarouselPrevious,";
const exampleImport = 'import { CarouselVisualExamples } from "./carousel-examples";\n';
const docImport = 'import { ComponentDoc, DocExample } from "./component-doc";\n';
const regionStart = "type Material = ", regionEnd = "export function G6InteractionPage(";
function carouselRegion(source) {
  assert.equal(source.split(regionStart).length, 2, "Carousel shared region start must remain unique");
  assert.equal(source.split(regionEnd).length, 2, "Carousel shared region end must remain unique");
  const start = source.indexOf(regionStart), end = source.indexOf(regionEnd);
  assert(end > start, "Carousel shared region order changed");
  return source.slice(start, end);
}
function replaceOnce(source, from, to) {
  assert.equal(source.split(from).length, 2, "Carousel shared source fragment changed");
  return source.replace(from, to);
}
// This canonical source contains the original G6 siblings plus only Carousel-owned changes.
// Its SHA is a scoped projection, never a claim that the entire live shared file was verified.
export function carouselOwnedSource(current, before) {
  assert.equal(current.split(carouselImportAfter).length, 2, "Carousel control import changed");
  assert.equal(current.split(exampleImport).length, 2, "Carousel example import changed");
  let owned = replaceOnce(before, carouselImportBefore, carouselImportAfter);
  owned = replaceOnce(owned, docImport, docImport + exampleImport);
  return replaceOnce(owned, carouselRegion(before), carouselRegion(current));
}
// Undo only the verified Carousel regions. Every sibling byte remains live, so old G6
// still rejects unsealed Drawer changes in this shared source.
export function carouselSharedPredecessor(current, before) {
  let restored = replaceOnce(current, carouselImportAfter, carouselImportBefore);
  restored = replaceOnce(restored, exampleImport, "");
  return replaceOnce(restored, carouselRegion(current), carouselRegion(before));
}
const stableJson = value => JSON.stringify(value, null, 2) + "\n";
function registrySource(source) {
  const value = JSON.parse(source);
  assert.equal(stableJson(value), source, "Carousel shared registry must retain stable source formatting");
  assert.equal(value.items.filter(item => item.name === "carousel").length, 1, "Carousel shared registry requires one unique owned item");
  return value;
}
export function carouselRegistryOwnedSource(currentSource, beforeSource) {
  const current = registrySource(currentSource), before = registrySource(beforeSource);
  return stableJson({ ...before, dependencies: { ...before.dependencies, "embla-carousel-auto-scroll": current.dependencies["embla-carousel-auto-scroll"] },
    items: before.items.map(item => item.name === "carousel" ? current.items.find(row => row.name === "carousel") : item) });
}
export function carouselRegistryPredecessor(currentSource, beforeSource) {
  const current = registrySource(currentSource), before = registrySource(beforeSource);
  delete current.dependencies["embla-carousel-auto-scroll"];
  current.items = current.items.map(item => item.name === "carousel" ? before.items.find(row => row.name === "carousel") : item);
  return stableJson(current);
}
function carouselPhaseRegion(source) {
  assert.equal(source.split("\ncomponentRefinements:\n").length, 2, "Carousel phase requires the original root componentRefinements");
  const root = source.indexOf("\ncomponentRefinements:\n") + 1;
  const nextRoot = source.slice(root + 1).search(/\n[A-Za-z][A-Za-z0-9_-]*:/);
  const end = nextRoot < 0 ? source.length : root + 2 + nextRoot;
  const refinements = source.slice(root, end);
  const matches = [...refinements.matchAll(/^  carouselUpgrade:\n[\s\S]*?(?=^  [A-Za-z][A-Za-z0-9_-]*:|$(?![\s\S]))/gm)];
  assert.equal(matches.length, 1, "Carousel phase requires one finite root-owned entry");
  return matches[0][0];
}
export function carouselPhaseOwnedSource(current, before) {
  const region = carouselPhaseRegion(current);
  assert(!/^  carouselUpgrade:/m.test(before), "Carousel phase predecessor cannot already contain its entry");
  return replaceOnce(before, "\ncomponentRefinements:\n", "\ncomponentRefinements:\n" + region);
}
export function carouselPhasePredecessor(current, before) {
  return replaceOnce(current, carouselPhaseRegion(current), "");
}
function carouselGuideParts(source, upgraded) {
  const rows = source.split("\n").filter(line => line.startsWith("| ") && line.includes("`ui-carousel`"));
  assert.equal(rows.length, 1, "Carousel guide requires one owned table row");
  const layoutSection = source.split("\n## 局改与来源差额\n")[1]?.split("\n## ")[0];
  const sentences = layoutSection?.match(/Carousel默认[^。]*。/g);
  assert.equal(sentences?.length, 1, "Carousel guide requires one owned layout sentence");
  const heading = "\n## Carousel v0.4 后续升级\n";
  let section = "";
  if (upgraded) {
    assert.equal(source.split(heading).length, 2, "Carousel guide requires one owned successor section");
    const start = source.indexOf(heading), next = source.indexOf("\n## ", start + heading.length);
    section = source.slice(start, next < 0 ? source.length : next);
  } else assert(!source.includes(heading), "Carousel guide predecessor already includes its successor");
  return { row: rows[0], sentence: sentences[0], section };
}
export function carouselGuideOwnedSource(current, before) {
  const live = carouselGuideParts(current, true), original = carouselGuideParts(before, false);
  return replaceOnce(replaceOnce(before, original.row, live.row), original.sentence, live.sentence) + live.section;
}
export function carouselGuidePredecessor(current, before) {
  const live = carouselGuideParts(current, true), original = carouselGuideParts(before, false);
  return replaceOnce(replaceOnce(replaceOnce(current, live.row, original.row), live.sentence, original.sentence), live.section, "");
}
export function carouselBindingBytes(root, path, beforeSnapshot) {
  const current = bytes(root, path);
  const project = path === carouselSharedSource ? carouselOwnedSource : path === carouselRegistrySource ? carouselRegistryOwnedSource : path === carouselPhaseSource ? carouselPhaseOwnedSource : path === carouselGuideSource ? carouselGuideOwnedSource : null;
  return project ? project(current.toString(), bytes(root, beforeSnapshot).toString()) : current;
}
export function carouselProjectedPredecessor(root, path, binding) {
  const project = path === carouselSharedSource ? carouselSharedPredecessor : path === carouselRegistrySource ? carouselRegistryPredecessor : path === carouselPhaseSource ? carouselPhasePredecessor : path === carouselGuideSource ? carouselGuidePredecessor : null;
  return project ? Buffer.from(project(bytes(root, path).toString(), bytes(root, binding.beforeSnapshot).toString())) : bytes(root, binding.beforeSnapshot ?? path);
}

function bytes(root, path) {
  const file = join(root, path);
  assert(lstatSync(file).isFile() && !lstatSync(file).isSymbolicLink(), "Carousel source must be a regular file: " + path);
  return readFileSync(file);
}
export function carouselUpgradeBindingSeal(record) {
  const clone = structuredClone(record);
  clone.sourceFiles[modulePath].after = "self";
  return sha256(JSON.stringify(clone));
}
export function validateCarouselUpgradePhase(status, previous, entry) {
  assert.deepEqual(status.componentRefinements?.carouselUpgrade, entry, "Carousel lifecycle must equal its bound owned phase entry");
  const { implementation, automatedVerification, independentReview, ...authorization } = entry;
  assert.deepEqual(authorization, { ...carouselUpgradeAuthorization,
    evidence: carouselUpgradeEvidence + "verification.md", sourceBindings: carouselUpgradeEvidence + "source-bindings.json",
    colorConsumers: carouselUpgradeEvidence + "color-consumers.json" }, "Carousel requires its exact successor authorization");
  assert(["in-progress", "completed"].includes(implementation));
  assert(["not-run", "failed", "passed-scoped"].includes(automatedVerification));
  assert(["not-run", "findings", "passed-scoped"].includes(independentReview));
  assert(implementation !== "completed" || automatedVerification === "passed-scoped" && independentReview === "passed-scoped",
    "Carousel cannot claim unchecked completion");
  const unchanged = structuredClone(status); delete unchanged.componentRefinements.carouselUpgrade;
  assert.deepEqual(unchanged, previous, "Carousel must retain all previous phase records and gates");
}
export function validateCarouselUpgradePackage(current, previous) {
  assert.deepEqual(current, { ...previous, dependencies: { ...previous.dependencies, "embla-carousel-auto-scroll": "8.5.2" } },
    "Carousel permits only embla-carousel-auto-scroll@8.5.2 as a dependency addition");
}
export function validateCarouselUpgradeLock(current, previous) {
  const additions = [
    "      embla-carousel-auto-scroll:\n        specifier: 8.5.2\n        version: 8.5.2(embla-carousel@8.5.2)\n",
    "  embla-carousel-auto-scroll@8.5.2:\n    resolution: {integrity: sha512-B0QF4vcHRLu7DJwDpgTq5q8qsX4185hOuXfpWPtOlZW+a+QG7ZIN3zTSUTI3Xt0MTWkAB5ZJ0gsFj2zUMKL3ig==}\n    peerDependencies:\n      embla-carousel: 8.5.2\n\n",
    "  embla-carousel-auto-scroll@8.5.2(embla-carousel@8.5.2):\n    dependencies:\n      embla-carousel: 8.5.2\n\n",
  ];
  for (const addition of additions) {
    assert.equal(current.split(addition).length, 2, "Carousel lock requires the exact AutoScroll 8.5.2/core 8.5.2 record once");
    current = current.replace(addition, "");
  }
  assert.equal(current, previous, "Carousel lock must preserve every unrelated dependency and resolution");
}
export function validateCarouselUpgradeRegistry(current, previous) {
  assert.equal(current.dependencies["embla-carousel-auto-scroll"], "8.5.2");
  const retained = structuredClone(current);
  delete retained.dependencies["embla-carousel-auto-scroll"];
  retained.items = retained.items.map(item => item.name === "carousel" ? previous.items.find(old => old.name === "carousel") : item);
  assert.deepEqual(retained, previous, "Carousel cannot change another G6 registry asset or gate");
  const carousel = current.items.find(item => item.name === "carousel");
  for (const name of ["Carousel", "CarouselContent", "CarouselItem", "CarouselPrevious", "CarouselNext", "useCarousel", "CarouselControls", "CarouselIndicators", "CarouselPlaybackControl"]) assert(carousel.exportNames.includes(name));
}
export function validateCarouselUpgradeIndex(current, previous) {
  const carouselRow = line => line.startsWith("| **Carousel** |");
  assert.equal(previous.split("\n").filter(carouselRow).length, 1, "Carousel index predecessor must have one exact asset row");
  assert(current.split("\n").filter(carouselRow).length <= 1, "Carousel index cannot duplicate its asset row");
  const retained = source => source.split("\n").filter(line => !carouselRow(line)).join("\n");
  assert.equal(retained(current), retained(previous), "Carousel index must preserve every sibling row and index instruction");
}
export function readCarouselUpgradeSourceBindings(root, status, parsePhase) {
  const entry = status?.componentRefinements?.carouselUpgrade;
  if (!entry) return null;
  const oldBindingsPath = "evidence/runtime/g6-components-2026-10-14/source-bindings.json";
  const oldBaselinePath = "evidence/runtime/g6-components-2026-10-14/baseline.json";
  assert.equal(sha256(bytes(root, oldBindingsPath)), oldG6BindingsHash, "Carousel cannot rewrite the original G6 bindings");
  assert.equal(sha256(bytes(root, oldBaselinePath)), oldG6BaselineHash, "Carousel cannot rewrite the original G6 baseline");
  assert.equal(sha256(bytes(root, "evidence/runtime/g6-components-2026-10-14/color-consumers.json")), oldG6ColorLedgerHash, "Carousel original G6 color proof changed");
  const old = JSON.parse(bytes(root, oldBindingsPath));
  const protectedSources = JSON.parse(bytes(root, oldBaselinePath)).protectedSources;
  const bindings = JSON.parse(bytes(root, entry.sourceBindings));
  assert.deepEqual(Object.keys(bindings).sort(), ["kind", "scope", "authorization", "sourceFiles", "evidenceFiles"].sort());
  assert.equal(bindings.kind, "CarouselUpgradeSourceBindings"); assert.equal(bindings.scope, carouselUpgradeScope);
  assert.deepEqual(bindings.authorization, carouselUpgradeAuthorization);
  assert.deepEqual(Object.keys(bindings.sourceFiles).sort(), [...carouselUpgradeFiles].sort(), "Carousel source paths must remain finite");
  assert.equal(carouselUpgradeBindingSeal(bindings), sourceSeal, "Carousel source binding seal changed");
  const normalized = bytes(root, modulePath).toString().replace(/const moduleHash = "[^"]*";/, 'const moduleHash = "' + "0".repeat(64) + '";');
  assert.equal(sha256(normalized), moduleHash, "Carousel verifier source changed");
  for (const [path, binding] of Object.entries(bindings.sourceFiles)) {
    assert.deepEqual(Object.keys(binding).sort(), ["before", "beforeSnapshot", "after", "mode"].sort());
    const before = old.sourceFiles[path]?.after ?? protectedSources[path] ?? null;
    assert.equal(binding.before, before, "Carousel predecessor must match the original G6 source: " + path);
    assert.equal(binding.beforeSnapshot, before ? carouselUpgradeEvidence + "before/" + path : null);
    if (before) assert.equal(sha256(bytes(root, binding.beforeSnapshot)), before, "Carousel before snapshot changed: " + path);
    assert.equal(binding.mode, carouselSourceMode(path), "Carousel source ownership mode changed");
    assert.equal(binding.after, existsSync(join(root, path)) ? sha256(carouselBindingBytes(root, path, binding.beforeSnapshot)) : null, "Carousel current source changed: " + path);
    assert(binding.after !== null, "Carousel public integration requires every declared source: " + path);
  }
  assert.deepEqual(Object.keys(bindings.evidenceFiles).sort(), [carouselUpgradeEvidence + "authorization.json", carouselUpgradeEvidence + "color-consumers.json", carouselUpgradeEvidence + "design-lineage.json"].sort(), "Carousel evidence inventory must remain finite");
  for (const [path, expected] of Object.entries(bindings.evidenceFiles)) assert.equal(sha256(bytes(root, path)), expected, "Carousel evidence changed: " + path);
  const lineage = JSON.parse(bytes(root, carouselUpgradeEvidence + "design-lineage.json"));
  assert.equal(lineage.kind, "CarouselAcceptedLocalV04Lineage");
  assert.equal(lineage.publicComponentAcceptance, false);
  assert.equal(lineage.acceptedLocalRecord.status, "user-accepted");
  assert.equal(lineage.acceptedLocalRecord.version, "v0.4");
  assert.deepEqual(Object.keys(lineage.sourceFiles).sort(), ["apps/prototype/carousel-study.html", "apps/prototype/vite.carousel-study.config.ts", "apps/prototype/src/carousel-study/main.tsx", "apps/prototype/src/carousel-study/study.css", "apps/prototype/src/carousel-study/Artwork.tsx"].sort());
  for (const [path, expected] of Object.entries(lineage.sourceFiles)) assert.equal(sha256(bytes(root, path)), expected, "Carousel accepted local visual source changed: " + path);
  const readBefore = path => bytes(root, bindings.sourceFiles[path].beforeSnapshot).toString();
  validateCarouselUpgradePhase(parsePhase(carouselBindingBytes(root, carouselPhaseSource, bindings.sourceFiles[carouselPhaseSource].beforeSnapshot).toString()), parsePhase(readBefore(carouselPhaseSource)), entry);
  validateCarouselUpgradePackage(JSON.parse(bytes(root, "packages/ui/package.json")), JSON.parse(readBefore("packages/ui/package.json")));
  validateCarouselUpgradeRegistry(JSON.parse(carouselBindingBytes(root, carouselRegistrySource, bindings.sourceFiles[carouselRegistrySource].beforeSnapshot).toString()), JSON.parse(readBefore(carouselRegistrySource)));
  validateCarouselUpgradeLock(bytes(root, "pnpm-lock.yaml").toString(), readBefore("pnpm-lock.yaml"));
  validateCarouselUpgradeIndex(bytes(root, "docs/ai/asset-index.md").toString(), readBefore("docs/ai/asset-index.md"));
  return { ...bindings, phase: entry };
}
