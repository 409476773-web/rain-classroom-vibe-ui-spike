import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { carouselColorSourcePaths, validateCarouselColorLedger } from "./carousel-color-consumers.mjs";

export const carouselVisualFeedbackEvidence = "evidence/runtime/carousel-upgrade-2026-10-14/feedback-01/";
export const carouselVisualFeedbackFiles = Object.freeze([
  "packages/ui/src/carousel/carousel.tsx", "packages/ui/src/carousel/carousel.css", "packages/ui/src/carousel/carousel.upgrade.test.tsx", "packages/ui/src/carousel/README.md",
  "apps/playground/src/docs/components/carousel-examples.tsx", "apps/playground/src/docs/components/carousel-examples.css", "manifests/ui/carousel.yaml",
  "apps/playground/src/docs/components/g6-interaction-pages.tsx", "docs/ai/g6-components.md", "status/current-phase.yaml",
  "docs/plans/2026-10-14-carousel-visual-feedback.md", "scripts/verify-carousel-visual-feedback.mjs",
]);
const modulePath = "scripts/verify-carousel-visual-feedback.mjs";
const sourceSeal = "54aefc7db73cefe616a3152847a07c190602c2dd1ba5060a256962424fa87a5a";
const moduleHash = "2936dc2186589ef8429529e94b575ae77a58977b944052f2e53bc40253f30210";
export const feedbackHash = value => createHash("sha256").update(value).digest("hex");
export const feedbackMode = path => path.endsWith("g6-interaction-pages.tsx") ? "carousel-page-only" : path === "docs/ai/g6-components.md" ? "carousel-section-only" : path === "status/current-phase.yaml" ? "feedback-phase-only" : "whole-file";
function section(source, start, end) {
  assert.equal(source.split(start).length, 2, "Feedback section must remain unique: " + start);
  const begin = source.indexOf(start), next = source.indexOf(end, begin + start.length);
  return source.slice(begin, next < 0 ? source.length : next);
}
function phaseEntry(source, key) {
  const pattern = new RegExp("^  " + key + ":\\n[\\s\\S]*?(?=^  [A-Za-z][A-Za-z0-9_-]*:|$(?![\\s\\S]))", "gm");
  const matches = [...source.matchAll(pattern)];
  assert.equal(matches.length, 1, "Feedback phase must remain unique");
  return matches[0][0];
}
export function feedbackBindingBytes(path, current, before) {
  if (feedbackMode(path) === "whole-file") return current;
  if (feedbackMode(path) === "feedback-phase-only") {
    const entry = phaseEntry(current, "carouselVisualFeedback");
    assert.equal(phaseEntry(current, "carouselUpgrade"), phaseEntry(before, "carouselUpgrade"), "Feedback cannot rewrite its original Carousel authorization");
    assert(!/^  carouselVisualFeedback:/m.test(before), "Feedback predecessor must not already contain this revision");
    const anchor = "\ncomponentRefinements:\n";
    assert.equal(before.split(anchor).length, 2);
    return before.replace(anchor, anchor + entry);
  }
  const start = feedbackMode(path) === "carousel-page-only" ? "function CarouselPage() {" : "\n## Carousel v0.4 后续升级\n";
  const end = feedbackMode(path) === "carousel-page-only" ? "\nexport function G6InteractionPage(" : "\n## ";
  const original = section(before, start, end);
  return before.replace(original, section(current, start, end));
}
export function feedbackBindingSeal(bindings) {
  return feedbackHash(JSON.stringify({ ...bindings, sourceFiles: Object.fromEntries(Object.entries(bindings.sourceFiles).map(([path, item]) => [path, path === modulePath ? { ...item, after: null } : item])) }));
}
export function verifyCarouselVisualFeedback(root = process.cwd()) {
  const read = path => readFileSync(join(root, path));
  const baseline = JSON.parse(read(carouselVisualFeedbackEvidence + "baseline.json"));
  const bindings = JSON.parse(read(carouselVisualFeedbackEvidence + "source-bindings.json"));
  assert.equal(bindings.kind, "CarouselVisualFeedbackSourceBindings");
  assert.equal(bindings.scope, "accepted-carousel-controls-fidelity-only");
  assert.equal(bindings.userStatement, "感觉与视觉确认稿（尤其是按钮、指示条摆放方式）有差异");
  assert.equal(bindings.humanGate, "awaiting_human"); assert.equal(bindings.contrastAcceptance, "not-granted"); assert.equal(bindings.publication, "unpublished");
  assert.deepEqual(Object.keys(bindings.sourceFiles).sort(), [...carouselVisualFeedbackFiles].sort());
  assert.equal(feedbackBindingSeal(bindings), sourceSeal, "Feedback binding record changed");
  const normalized = read(modulePath).toString().replace(/const moduleHash = "[^"]*";/, 'const moduleHash = "' + "0".repeat(64) + '";');
  assert.equal(feedbackHash(normalized), moduleHash, "Feedback verifier source changed");
  const original = JSON.parse(read("evidence/runtime/carousel-upgrade-2026-10-14/source-bindings.json"));
  for (const [path, binding] of Object.entries(bindings.sourceFiles)) {
    assert.equal(binding.mode, feedbackMode(path));
    assert.equal(binding.before, baseline.sourceFiles[path] ?? null);
    const before = binding.beforeSnapshot ? read(binding.beforeSnapshot).toString() : "";
    if (binding.before) {
      assert.equal(feedbackHash(before), binding.before, "Feedback before source changed: " + path);
      if (original.sourceFiles[path]?.mode === "whole-file") assert.equal(binding.before, original.sourceFiles[path].after, "Feedback must retain the sealed public predecessor: " + path);
    }
    assert.equal(feedbackHash(feedbackBindingBytes(path, read(path).toString(), before)), binding.after, "Feedback current source changed: " + path);
  }
  for (const [path, hash] of Object.entries(bindings.evidenceFiles)) assert.equal(feedbackHash(read(path)), hash, "Feedback evidence changed: " + path);
  for (const [path, hash] of Object.entries(baseline.protectedProofs).filter(([path]) => path.includes("carousel-upgrade-2026-10-14/") || path === "scripts/carousel-upgrade-governance.mjs")) assert.equal(feedbackHash(read(path)), hash, "Feedback cannot rewrite its original proof: " + path);
  const lineage = JSON.parse(read("evidence/runtime/carousel-upgrade-2026-10-14/design-lineage.json"));
  for (const [path, hash] of Object.entries(lineage.sourceFiles)) assert.equal(feedbackHash(read(path)), hash, "Accepted prototype source changed: " + path);
  const ledger = JSON.parse(read(carouselVisualFeedbackEvidence + "color-consumers.json"));
  const colors = validateCarouselColorLedger(ledger, Object.fromEntries(carouselColorSourcePaths.map(path => [path, read(path).toString()])));
  return { scope: bindings.scope, sourcePaths: carouselVisualFeedbackFiles.length, paintOccurrences: colors.paintConsumers.length,
    inheritedProofs: "preserved", acceptedPrototype: "unchanged", humanGate: bindings.humanGate, contrastAcceptance: bindings.contrastAcceptance,
    publication: bindings.publication, wholeG6: "not-claimed", pendingMediaOverlayContrast: true };
}
if (process.argv[1]?.endsWith("verify-carousel-visual-feedback.mjs")) console.log(JSON.stringify(verifyCarouselVisualFeedback(), null, 2));
