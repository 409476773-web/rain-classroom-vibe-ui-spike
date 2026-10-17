import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { parseYamlSubset } from "./verification-helpers.mjs";
import { feedbackHash as hash, carouselVisualFeedbackEvidence as priorEvidence, carouselVisualFeedbackFiles, verifyCarouselVisualFeedback } from "./verify-carousel-visual-feedback.mjs";
import { carouselColorSourcePaths } from "./carousel-color-consumers.mjs";

export const carouselCloseoutEvidence = "evidence/runtime/carousel-closeout-2026-10-14/";
export const carouselCloseoutScope = "current-public-carousel-preview-visual-and-interaction-only";
export const carouselCloseoutStatement = "确定，当前 Carousel 的视觉和交互检查通过，继续完成该组件的收尾。";
const manualPath = carouselCloseoutEvidence + "manual-acceptance.json";
const baselinePath = carouselCloseoutEvidence + "baseline.json";
const bindingPath = carouselCloseoutEvidence + "source-bindings.json";
const modulePath = "scripts/verify-carousel-closeout.mjs";
const sourceSeal = "386d609b5f27b4668f7e40e509f3e078f67a82ce40ffbac53f48efdc9ee3fe4a";
const moduleHash = "cf02a71226e3b6b2facb3e77acb94ba05e1a999aa8453235352a37f8b16e60fe";
export const carouselCloseoutMetadata = Object.freeze(["manifests/ui/carousel.yaml", "registry/g6-assets.json", "docs/ai/g6-components.md", "packages/ui/src/carousel/README.md", "docs/ai/asset-index.md", "status/current-phase.yaml"]);
export const carouselCloseoutFiles = Object.freeze([...carouselCloseoutMetadata, "docs/plans/2026-10-14-carousel-closeout.md", modulePath, "scripts/carousel-closeout.test.ts"]);
export const carouselCloseoutRuntime = Object.freeze(["packages/ui/src/carousel/carousel.tsx", "packages/ui/src/carousel/carousel.css", "packages/ui/src/carousel/carousel-playback.ts", "packages/ui/src/carousel/carousel.test.tsx", "packages/ui/src/carousel/carousel.upgrade.test.tsx", "packages/ui/src/carousel/carousel.css.d.ts", "apps/playground/src/docs/components/carousel-examples.tsx", "apps/playground/src/docs/components/carousel-examples.css", "apps/playground/src/docs/components/carousel-artwork.tsx"]);
export const carouselCloseoutProofs = Object.freeze(["evidence/runtime/carousel-upgrade-2026-10-14/source-bindings.json", "evidence/runtime/carousel-upgrade-2026-10-14/color-consumers.json", "evidence/runtime/carousel-upgrade-2026-10-14/design-lineage.json", "scripts/carousel-upgrade-governance.mjs", priorEvidence + "baseline.json", priorEvidence + "source-bindings.json", priorEvidence + "color-consumers.json", "scripts/verify-carousel-visual-feedback.mjs"]);
const footer = '\n2026-10-14用户已确认当前公共Carousel预览的视觉与交互通过。接受范围仅为该预览；Safari、VoiceOver、真实触摸、媒体对比度、发布、Figma和生产接入没有新增接受。收尾证据：`evidence/runtime/carousel-closeout-2026-10-14/verification.md`。\n';
const entry = `  carouselCloseout:\n    kind: "CarouselPublicPreviewCloseout"\n    userStatement: "${carouselCloseoutStatement}"\n    scope: "${carouselCloseoutScope}"\n    acceptedAt: "2026-10-14"\n    implementation: "completed"\n    automatedVerification: "scoped-passed"\n    humanGate: "accepted"\n    contrastAcceptance: "not-granted"\n    publication: "unpublished"\n    manualAcceptance: "${manualPath}"\n    sourceBindings: "${bindingPath}"\n    evidence: "${carouselCloseoutEvidence}verification.md"\n`;
function region(source, start, end) {
  assert.equal(source.split(start).length, 2, "Closeout owned region must be unique");
  const begin = source.indexOf(start), stop = source.indexOf(end, begin + start.length);
  return source.slice(begin, stop < 0 ? source.length : stop);
}
function phase(source) {
  const matches = [...source.matchAll(/^  carouselCloseout:\n[\s\S]*?(?=^  [A-Za-z][A-Za-z0-9_-]*:|$(?![\s\S]))/gm)];
  assert.equal(matches.length, 1, "Closeout phase must be unique"); return matches[0][0];
}
export function applyCarouselCloseout(path, before) {
  if (path === "manifests/ui/carousel.yaml") {
    assert.equal((before.match(/humanGate: "awaiting_human"/g) ?? []).length, 2);
    return before.replaceAll('humanGate: "awaiting_human"', 'humanGate: "accepted"')
      .replace('  evidence: "' + priorEvidence + 'verification.md"', '  evidence: "' + carouselCloseoutEvidence + 'verification.md"')
      + `\nhumanGateDecision:\n  scope: "${carouselCloseoutScope}"\n  acceptedAt: "2026-10-14"\n  evidence: "${manualPath}"\n`;
  }
  if (path === "registry/g6-assets.json") {
    const data = JSON.parse(before), previous = data.items.find(x => x.name === "carousel");
    assert(previous); const serialize = value => JSON.stringify(value, null, 2).split("\n").map(line => "    " + line).join("\n");
    const original = serialize(previous); assert.equal(before.split(original).length, 2);
    return before.replace(original, serialize({ ...previous, humanGate: "accepted", humanGateScope: carouselCloseoutScope, closeoutEvidence: bindingPath }));
  }
  if (path === "docs/ai/g6-components.md") {
    const block = region(before, "\n## Carousel v0.4 后续升级\n", "\n## "); return before.replace(block, block + footer);
  }
  if (path === "packages/ui/src/carousel/README.md") return before + footer;
  if (path === "docs/ai/asset-index.md") {
    const rows = before.split("\n").filter(x => x.startsWith("| **Carousel** |")); assert.equal(rows.length, 1);
    assert(rows[0].includes("scoped-passed / awaiting_human / not-granted / unpublished"));
    return before.replace(rows[0], rows[0].replace("scoped-passed / awaiting_human", "scoped-passed / accepted"));
  }
  if (path === "status/current-phase.yaml") {
    assert(!/^  carouselCloseout:/m.test(before)); const anchor = "\ncomponentRefinements:\n"; assert.equal(before.split(anchor).length, 2);
    return before.replace(anchor, anchor + entry);
  }
  throw new Error("Unknown closeout metadata path: " + path);
}
export function carouselCloseoutOwnedBytes(path, current, before) {
  if (path === "registry/g6-assets.json") {
    const base = JSON.parse(before), live = JSON.parse(current); const row = live.items.filter(x => x.name === "carousel"); assert.equal(row.length, 1);
    base.items = base.items.map(x => x.name === "carousel" ? row[0] : x); return JSON.stringify(base, null, 2) + "\n";
  }
  if (path === "docs/ai/g6-components.md") return before.replace(region(before, "\n## Carousel v0.4 后续升级\n", "\n## "), region(current, "\n## Carousel v0.4 后续升级\n", "\n## "));
  if (path === "docs/ai/asset-index.md") {
    const original = before.split("\n").filter(x => x.startsWith("| **Carousel** |")), live = current.split("\n").filter(x => x.startsWith("| **Carousel** |"));
    assert.equal(original.length, 1); assert.equal(live.length, 1); return before.replace(original[0], live[0]);
  }
  if (path === "status/current-phase.yaml") {
    const readPhase = value => parseYamlSubset(value).componentRefinements;
    for (const name of ["carouselUpgrade", "carouselVisualFeedback"]) assert.deepEqual(readPhase(current)[name], readPhase(before)[name], "Closeout cannot rewrite historical Carousel phases");
    return before.replace("\ncomponentRefinements:\n", "\ncomponentRefinements:\n" + phase(current));
  }
  return current;
}
export const carouselCloseoutSeal = record => hash(JSON.stringify({ ...record, sourceFiles: Object.fromEntries(Object.entries(record.sourceFiles).map(([path, value]) => [path, path === modulePath ? { ...value, after: null } : value])) }));
export function carouselCloseoutPredecessorFiles(root) {
  const json = path => JSON.parse(readFileSync(join(root, path), "utf8"));
  const bindings = json(priorEvidence + "source-bindings.json"), baseline = json(priorEvidence + "baseline.json"), lineagePath = "evidence/runtime/carousel-upgrade-2026-10-14/design-lineage.json";
  return [...new Set([...carouselVisualFeedbackFiles, ...carouselColorSourcePaths, priorEvidence + "source-bindings.json", priorEvidence + "baseline.json", "evidence/runtime/carousel-upgrade-2026-10-14/source-bindings.json", lineagePath,
    ...Object.values(bindings.sourceFiles).map(x => x.beforeSnapshot).filter(Boolean), ...Object.keys(bindings.evidenceFiles), ...Object.keys(baseline.protectedProofs).filter(x => x.includes("carousel-upgrade-2026-10-14/") || x === "scripts/carousel-upgrade-governance.mjs"), ...Object.keys(json(lineagePath).sourceFiles)])];
}
export function verifyCarouselCloseout(root = process.cwd()) {
  const read = path => readFileSync(join(root, path), "utf8"), record = JSON.parse(read(bindingPath)), baseline = JSON.parse(read(baselinePath)), manual = JSON.parse(read(manualPath));
  assert.equal(record.kind, "CarouselPublicPreviewCloseoutSourceBindings"); assert.equal(record.scope, carouselCloseoutScope);
  assert.equal(carouselCloseoutSeal(record), sourceSeal, "Closeout source binding changed");
  assert.equal(hash(read(modulePath).replace(/const moduleHash = "[^"]*";/, 'const moduleHash = "' + "0".repeat(64) + '";')), moduleHash, "Closeout verifier changed");
  assert.deepEqual(manual, { kind: "CarouselPublicPreviewManualAcceptance", acceptedAt: "2026-10-14", decisionSource: "explicit-current-user-message", userStatement: carouselCloseoutStatement, scope: carouselCloseoutScope, preview: "http://127.0.0.1:5196/#carousel", humanGate: "accepted", contrastAcceptance: "not-granted", publication: "unpublished", excluded: ["Safari", "VoiceOver", "real-touch", "media-overlay-contrast", "whole-G6-or-library", "Figma", "publication", "production-adoption", "Git-operations"] });
  for (const [path, expected] of Object.entries(record.evidenceFiles)) assert.equal(hash(read(path)), expected, "Closeout evidence changed: " + path);
  assert.deepEqual(Object.keys(record.sourceFiles).sort(), [...carouselCloseoutFiles].sort());
  assert.deepEqual(Object.keys(baseline.protectedRuntime).sort(), [...carouselCloseoutRuntime].sort());
  for (const [path, expected] of Object.entries(baseline.protectedRuntime)) assert.equal(hash(read(path)), expected, "Accepted runtime source changed: " + path);
  assert.deepEqual(Object.keys(baseline.protectedProofs).sort(), [...carouselCloseoutProofs].sort());
  for (const [path, expected] of Object.entries(baseline.protectedProofs)) assert.equal(hash(read(path)), expected, "Historical Carousel proof changed: " + path);
  for (const path of carouselCloseoutFiles) {
    const binding = record.sourceFiles[path], before = binding.beforeSnapshot ? read(binding.beforeSnapshot) : "";
    assert.equal(binding.beforeSnapshot, carouselCloseoutMetadata.includes(path) ? carouselCloseoutEvidence + "before/" + path : null);
    assert.equal(binding.before, before ? hash(before) : null, "Closeout before source changed");
    const current = carouselCloseoutOwnedBytes(path, read(path), before);
    if (carouselCloseoutMetadata.includes(path)) assert.equal(current, carouselCloseoutOwnedBytes(path, applyCarouselCloseout(path, before), before), "Unknown closeout metadata change: " + path);
    assert.equal(hash(current), binding.after, "Closeout current source changed: " + path);
  }
  const predecessor = mkdtempSync(join(tmpdir(), "rain-carousel-closeout-"));
  try {
    for (const path of carouselCloseoutPredecessorFiles(root)) { const target = join(predecessor, path); mkdirSync(dirname(target), { recursive: true }); writeFileSync(target, carouselCloseoutMetadata.includes(path) ? read(carouselCloseoutEvidence + "before/" + path) : read(path)); }
    verifyCarouselVisualFeedback(predecessor);
  } finally { rmSync(predecessor, { recursive: true, force: true }); }
  return { scope: carouselCloseoutScope, humanGate: "accepted", contrastAcceptance: "not-granted", publication: "unpublished", acceptedRuntimeFiles: carouselCloseoutRuntime.length, predecessor: "verified-with-original-proof-unchanged", wholeG6: "not-claimed" };
}
if (process.argv[1]?.endsWith("verify-carousel-closeout.mjs")) console.log(JSON.stringify(verifyCarouselCloseout(), null, 2));
