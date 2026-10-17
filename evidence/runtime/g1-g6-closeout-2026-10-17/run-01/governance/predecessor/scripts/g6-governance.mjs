import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { readCarouselUpgradeSourceBindings, carouselProjectedPredecessor } from "./carousel-upgrade-governance.mjs";
import { readDrawerRefinementSourceBindings } from "./drawer-refinement-governance.mjs";

export const g6Evidence = "evidence/runtime/g6-components-2026-10-14/";
const g6BaselineHash = "81ec04702dbf90420a46c3f0250be1a29133ea35e6657d935dc5603050d1b552";
const g6SourceSeal = "3e49dde386ef763bcac06982a17174ae88202b7ecaa50332f291a6033c90bd7a";
const g6HelperHash = "9a3ef742fe9a9c30719cb858394e358631bdd41cb3bb65def31a13f11dd81ac9";
const g6ModuleHash = "5666629030aa37fda01023357c4b74ae8381d47c2c1e563a740abd9ddd9aa497";
const g6ConcurrentObservationHash = "569c0f267fa6157c9046ac09c24e0d5d3acf8dfa2ead3a5014fe085960ecd881";
const g6ConcurrentDocumentObservationHash = "7a5e3c867011452b4c8265b8cc1deeb45b7205849c57be89a3a33d1f3e772d04";
const g6TestFixtureSupplementHash = "4dc21ae391ff0be354278a7ed208937188f8b825a4424070cfcaff3b77aabab5";
const helperPath = "scripts/verification-helpers.mjs";
const modulePath = "scripts/g6-governance.mjs";
const dependencyAdditions = { "input-otp": "1.4.2", "embla-carousel-react": "8.5.2", "@shadcn/react": "0.3.1" };

function diskSource(root, path) {
  const file = join(root, path), info = lstatSync(file);
  assert(info.isFile() && !info.isSymbolicLink(), "G6 source must be a regular file: " + path);
  return readFileSync(file);
}
const sha = bytes => createHash("sha256").update(bytes).digest("hex");

export function g6BindingSeal(bindings) {
  const files = structuredClone(bindings.sourceFiles);
  for (const path of [helperPath, modulePath]) files[path].after = "self";
  return sha(JSON.stringify({ ...bindings, sourceFiles: files }));
}

export function readG6SourceBindings(root, status, parsePhase) {
  const liveStatus = parsePhase(diskSource(root, "status/current-phase.yaml").toString());
  if (status !== undefined && status !== null) assert.deepEqual(status, liveStatus, "G6 supplied lifecycle and phase must match the bound disk record");
  const drawerRefinement = readDrawerRefinementSourceBindings(root, liveStatus, parsePhase);
  const carouselUpgrade = drawerRefinement ? drawerRefinement.carouselUpgrade : readCarouselUpgradeSourceBindings(root, liveStatus, parsePhase);
  // Each fully verified successor supplies only its recorded predecessor; unrelated sources remain live.
  const source = (base, path) => {
    if (carouselUpgrade?.sourceFiles[path]) return carouselProjectedPredecessor(drawerRefinement?.predecessorRoot ?? base, path, carouselUpgrade.sourceFiles[path]);
    if (drawerRefinement?.sourceFiles[path]) {
      assert(drawerRefinement.sourceFiles[path].beforeSnapshot, "G6 predecessor cannot be invented for a new Drawer file: " + path);
      return diskSource(base, drawerRefinement.sourceFiles[path].beforeSnapshot);
    }
    return diskSource(base, path);
  };
  const hash = (base, path) => {
    const carousel = carouselUpgrade?.sourceFiles[path], drawer = drawerRefinement?.sourceFiles[path];
    const predecessorPath = carousel?.beforeSnapshot ?? drawer?.beforeSnapshot ?? path;
    const predecessorRoot = carousel ? drawerRefinement?.predecessorRoot ?? base : base;
    return existsSync(join(predecessorRoot, predecessorPath)) ? sha(source(base, path)) : null;
  };
  const json = (base, path) => JSON.parse(source(base, path).toString());
  if (carouselUpgrade || drawerRefinement) status = parsePhase(source(root, "status/current-phase.yaml").toString());
  const actualPhase = parsePhase(source(root, "status/current-phase.yaml").toString());
  if (status !== undefined && status !== null) assert.deepEqual(status, actualPhase, "G6 supplied lifecycle and phase must match the bound disk record");
  status ??= actualPhase;
  const entry = status?.componentRefinements?.g6Components;
  if (!entry) return null;
  const baselinePath = g6Evidence + "baseline.json";
  assert.equal(hash(root, baselinePath), g6BaselineHash, "G6 original baseline changed");
  const baseline = json(root, baselinePath);
  assert.equal(hash(root, baseline.authorization.path), baseline.authorization.sha256, "G6 user authorization changed");
  const { phaseRegistration, phaseRegistrationReason, ...authorization } = json(root, baseline.authorization.path);
  const expected = { ...authorization, evidence: g6Evidence + "verification.md", sourceLock: g6Evidence + "source-lock.json",
    sourceBindings: g6Evidence + "source-bindings.json", dependencyInstallation: entry.dependencyInstallation,
    implementation: entry.implementation, automatedVerification: entry.automatedVerification,
    independentReview: entry.independentReview };
  assert.deepEqual(entry, expected, "G6 requires its exact twelve-capability authorization");
  assert(["not-started", "completed"].includes(entry.dependencyInstallation), "G6 dependency lifecycle changed");
  assert(["in-progress", "completed"].includes(entry.implementation), "G6 implementation lifecycle changed");
  assert(["not-run", "failed", "passed-scoped"].includes(entry.automatedVerification), "G6 verification lifecycle changed");
  assert(["not-run", "findings", "passed-scoped"].includes(entry.independentReview), "G6 review lifecycle changed");
  assert(entry.implementation !== "completed" || entry.dependencyInstallation === "completed"
    && entry.automatedVerification === "passed-scoped" && entry.independentReview === "passed-scoped", "G6 cannot claim unchecked completion");
  const supplementPath = g6Evidence + "test-fixture-supplement.json";
  assert.equal(hash(root, supplementPath), g6TestFixtureSupplementHash, "G6 test fixture supplement changed");
  const supplement = json(root, supplementPath);
  assert.deepEqual(Object.keys(supplement).sort(), ["kind", "scope", "authorizationReference", "reason", "sourceFiles"].sort());
  assert.equal(supplement.kind, "G6FiniteExistingTestFixtureSupplement");
  assert.equal(supplement.scope, "one-existing-b2-test-g6-successor-and-historical-fixture-compatibility");
  assert.deepEqual(supplement.authorizationReference, baseline.authorization);
  assert.deepEqual(Object.keys(supplement.sourceFiles), ["scripts/verify-tailwind-b2.test.ts"]);
  const supplementedFiles = {};
  for (const [path, supplied] of Object.entries(supplement.sourceFiles)) {
    assert.deepEqual(Object.keys(supplied).sort(), ["before", "beforeSnapshot"].sort());
    assert.equal(supplied.before, baseline.protectedSources[path], "G6 supplementary test must retain the original protected bytes");
    assert.equal(supplied.beforeSnapshot, g6Evidence + "before/" + path);
    assert.equal(hash(root, supplied.beforeSnapshot), supplied.before, "G6 supplementary test before snapshot changed");
    assert(!Object.hasOwn(baseline.files, path), "G6 supplement cannot rewrite original editable scope");
    supplementedFiles[path] = supplied.before;
  }
  const finiteEditableFiles = { ...baseline.files, ...supplementedFiles };
  const bindings = json(root, entry.sourceBindings);
  assert.deepEqual(Object.keys(bindings).sort(), ["kind", "authorizedAt", "scope", "baseline", "sourceFiles"].sort(), "G6 binding fields must remain finite");
  assert.equal(bindings.kind, "G6ComponentSourceBindings");
  assert.equal(bindings.authorizedAt, "2026-10-14");
  assert.equal(bindings.scope, authorization.scope);
  assert.deepEqual(bindings.baseline, { path: baselinePath, sha256: g6BaselineHash });
  assert.deepEqual(Object.keys(bindings.sourceFiles).sort(), Object.keys(finiteEditableFiles).sort(), "G6 binding paths must remain finite");
  assert.equal(g6BindingSeal(bindings), g6SourceSeal, "G6 source binding seal changed");
  assert.equal(hash(root, helperPath), g6HelperHash, "G6 current source changed: " + helperPath);
  const moduleSource = source(root, modulePath).toString().replace(/const g6ModuleHash = "[a-f0-9]{64}";/, 'const g6ModuleHash = "' + "0".repeat(64) + '";');
  assert.equal(sha(moduleSource), g6ModuleHash, "G6 governance module source changed");
  for (const [path, before] of Object.entries(finiteEditableFiles)) {
    if (before !== null) assert.equal(hash(root, g6Evidence + "before/" + path), before, "G6 before snapshot changed: " + path);
    const binding = bindings.sourceFiles[path];
    if (path === "status/current-phase.yaml") continue;
    // New reserved sources may evolve before export; public integration and completion require bound bytes.
    if (before === null && binding.after === null && entry.implementation === "in-progress") continue;
    assert.deepEqual(binding, { before, after: hash(root, path) }, "G6 current source changed: " + path + (path === "docs/ai/prototype-design.md" ? "; Slider closeout permits only the proven unchanged S3 prototype guide or a byte-bound G6 successor" : ""));
  }
  const observationPath = g6Evidence + "concurrent-source-observation.json";
  assert.equal(hash(root, observationPath), g6ConcurrentObservationHash, "G6 parallel observation changed");
  const observation = json(root, observationPath);
  assert.deepEqual(Object.keys(observation).sort(), ["kind", "observedAt", "scope", "mode", "origin", "sourceFiles"].sort());
  assert.equal(observation.kind, "G6ReadOnlyConcurrentSourceObservation");
  assert.equal(observation.observedAt, "2026-10-14");
  assert.equal(observation.scope, "two-rn14-starter-files-parallel-rain-designer-consumption");
  assert.equal(observation.mode, "read-only-observation-not-g6-edit-authorization");
  const concurrentSourceObservations = observation.sourceFiles;
  assert.deepEqual(Object.keys(concurrentSourceObservations).sort(), ["scripts/rn14-starter.mjs", "scripts/rn14-starter.test.ts"].sort());
  const previousG5Sources = json(root, "evidence/runtime/g5-components-2026-10-12/source-bindings.json").sourceFiles;
  const acceptedSliderSources = json(root, "evidence/runtime/slider-closeout-2026-10-13/baseline.json").protectedRuntime;
  for (const [path, expectedHash] of Object.entries(baseline.protectedSources)) {
    if (Object.hasOwn(supplementedFiles, path)) {
      assert.equal(supplementedFiles[path], expectedHash);
      continue; // Its exact current bytes were checked in the editable loop above.
    }
    const observed = concurrentSourceObservations[path];
    if (observed) {
      assert.deepEqual(Object.keys(observed).sort(), ["before", "after", "beforeSnapshot"].sort());
      assert.equal(observed.before, expectedHash, "G6 parallel original source must retain its baseline hash");
      assert.equal(observed.beforeSnapshot, g6Evidence + "concurrent/before/" + path);
      assert.equal(hash(root, observed.beforeSnapshot), expectedHash, "G6 parallel original snapshot changed");
      assert.equal(hash(root, path), observed.after, "G6 parallel observed source changed: " + path);
      assert(!Object.hasOwn(bindings.sourceFiles, path), "Parallel observation cannot become G6 editable scope");
    } else {
      const ownerContext = Object.hasOwn(acceptedSliderSources, path) ? "; Slider closeout accepted visual source changed" : Object.hasOwn(previousG5Sources, path) ? "; G5 current source changed" : "";
      assert.equal(hash(root, path), expectedHash, "G6 protected current source changed: " + path + ownerContext);
    }
  }
  const documentObservationPath = g6Evidence + "concurrent-document-observation.json";
  assert.equal(hash(root, documentObservationPath), g6ConcurrentDocumentObservationHash, "G6 parallel observed documentation record changed");
  const documentObservation = json(root, documentObservationPath);
  assert.deepEqual(Object.keys(documentObservation).sort(), ["kind", "observedAt", "scope", "mode", "previousObservation", "origin", "sourceFiles"].sort());
  assert.equal(documentObservation.kind, "G6ReadOnlyConcurrentDocumentObservation");
  assert.equal(documentObservation.observedAt, "2026-10-14");
  assert.equal(documentObservation.scope, "one-parallel-rain-designer-integration-document");
  assert.equal(documentObservation.mode, "read-only-observation-not-g6-edit-authorization");
  const priorDocumentObservationPath = "evidence/runtime/library-governance-closeout-2026-10-13/concurrent-document-observation-02.json";
  assert.deepEqual(documentObservation.previousObservation, { path: priorDocumentObservationPath, sha256: baseline.retainedEvidence[priorDocumentObservationPath] });
  assert.equal(hash(root, priorDocumentObservationPath), documentObservation.previousObservation.sha256, "G6 observed documentation predecessor changed");
  const concurrentDocumentObservations = documentObservation.sourceFiles;
  const documentPath = "docs/ai/rain-designer-integration.md";
  assert.deepEqual(Object.keys(concurrentDocumentObservations), [documentPath]);
  const observedDocument = concurrentDocumentObservations[documentPath];
  assert.deepEqual(Object.keys(observedDocument).sort(), ["before", "after", "beforeSnapshot"].sort());
  assert.equal(observedDocument.before, json(root, priorDocumentObservationPath).sourceFiles[documentPath].after, "G6 parallel document original must match the previous observation");
  assert.equal(observedDocument.beforeSnapshot, g6Evidence + "concurrent-document/before/" + documentPath);
  assert.equal(hash(root, observedDocument.beforeSnapshot), observedDocument.before, "G6 parallel observed documentation original snapshot changed");
  assert.equal(hash(root, documentPath), observedDocument.after, "G6 parallel observed documentation source changed");
  assert(!Object.hasOwn(bindings.sourceFiles, documentPath) && !Object.hasOwn(baseline.protectedSources, documentPath), "Parallel document cannot become G6 editable scope");
  for (const [path, expectedHash] of Object.entries(baseline.retainedEvidence)) assert.equal(hash(root, path), expectedHash,
    path.includes("concurrent-document-observation") ? "G6 observed documentation changed: " + path : "G6 original proof changed: " + path);
  const predecessorPhase = parsePhase(source(root, g6Evidence + "before/status/current-phase.yaml").toString());
  const current = structuredClone(status); delete current.componentRefinements.g6Components;
  assert.deepEqual(current, predecessorPhase, "G6 must preserve every previous phase record and Gate");
  assert.deepEqual(bindings.sourceFiles["status/current-phase.yaml"], { before: baseline.files["status/current-phase.yaml"],
    after: hash(root, "status/current-phase.yaml") }, "G6 current phase source changed");
  const exports = source(root, "packages/ui/src/index.ts").toString();
  for (const match of exports.matchAll(/from "\.\/(aspect-ratio|attachment|direction|drawer|input-otp|carousel|bubble|marker|message|message-scroller|questionnaire)\/([^"]+)"/g)) {
    const base = "packages/ui/src/" + match[1] + "/" + match[2];
    const path = [base + ".tsx", base + ".ts"].find(path => existsSync(join(root, path)));
    assert(path && bindings.sourceFiles[path]?.after !== null, "G6 exported source requires bound bytes: " + base);
  }
  const beforePackage = json(root, g6Evidence + "before/packages/ui/package.json");
  const packageExpected = entry.dependencyInstallation === "completed"
    ? { ...beforePackage, dependencies: { ...beforePackage.dependencies, ...dependencyAdditions } } : beforePackage;
  assert.deepEqual(json(root, "packages/ui/package.json"), packageExpected, "G6 permits only the three exact dependency additions");
  assert.equal(hash(root, entry.sourceLock), baseline.retainedEvidence["evidence/runtime/g6-preflight-2026-10-14/source-lock.json"], "G6 fixed source lock changed");
  const sourceFiles = { ...bindings.sourceFiles };
  if (carouselUpgrade) for (const [path, binding] of Object.entries(carouselUpgrade.sourceFiles)) {
    sourceFiles[path] = { before: sourceFiles[path]?.before ?? null, after: binding.mode !== "whole-file" ? sha(diskSource(root, path)) : binding.after };
  }
  if (drawerRefinement) for (const [path, binding] of Object.entries(drawerRefinement.sourceFiles)) {
    sourceFiles[path] = { before: sourceFiles[path]?.before ?? null, after: binding.after };
  }
  return { ...bindings, sourceFiles, concurrentSourceObservations, concurrentDocumentObservations, phase: entry, carouselUpgrade, drawerRefinement };
}
