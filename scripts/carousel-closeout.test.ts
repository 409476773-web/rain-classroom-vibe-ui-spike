import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, expect, it } from "vitest";
import { carouselCloseoutEvidence as evidence, carouselCloseoutFiles, carouselCloseoutMetadata, carouselCloseoutRuntime, carouselCloseoutProofs, carouselCloseoutPredecessorFiles, verifyCarouselCloseout } from "./verify-carousel-closeout.mjs";

const roots: string[] = [];
function fixture() {
  const root = mkdtempSync(join(tmpdir(), "rain-carousel-acceptance-test-")); roots.push(root);
  const files = new Set([...carouselCloseoutFiles, ...carouselCloseoutRuntime, ...carouselCloseoutProofs, ...carouselCloseoutPredecessorFiles(process.cwd()), ...carouselCloseoutMetadata.map(path => evidence + "before/" + path), ...["baseline.json", "manual-acceptance.json", "source-bindings.json"].map(path => evidence + path)]);
  for (const path of files) { const target = join(root, path); mkdirSync(dirname(target), { recursive: true }); writeFileSync(target, readFileSync(path)); }
  return root;
}
afterEach(() => { for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });
it("validates public preview acceptance while retaining the predecessor and publication boundaries", () => {
  expect(verifyCarouselCloseout(fixture())).toMatchObject({ humanGate: "accepted", contrastAcceptance: "not-granted", publication: "unpublished", wholeG6: "not-claimed" });
});
it("rejects a runtime source change after human acceptance", () => {
  const root = fixture(), path = join(root, "packages/ui/src/carousel/carousel.css");
  writeFileSync(path, readFileSync(path, "utf8") + "\n/* changed */\n");
  expect(() => verifyCarouselCloseout(root)).toThrow(/Accepted runtime source changed/);
});
it("rejects expanded contrast acceptance and changed user statements", () => {
  const root = fixture(), path = join(root, "status/current-phase.yaml");
  writeFileSync(path, readFileSync(path, "utf8").replace(/(  carouselCloseout:\n[\s\S]*?    contrastAcceptance: )"not-granted"/, '$1"accepted"'));
  expect(() => verifyCarouselCloseout(root)).toThrow(/Unknown closeout metadata change/);
  const other = fixture(), recordPath = join(other, evidence + "manual-acceptance.json");
  const record = JSON.parse(readFileSync(recordPath, "utf8")); record.scope = "whole-library"; writeFileSync(recordPath, JSON.stringify(record));
  expect(() => verifyCarouselCloseout(other)).toThrow();
});
it("rejects rewriting the historical feedback binding even without a semantic change", () => {
  const root = fixture(), path = join(root, "evidence/runtime/carousel-upgrade-2026-10-14/feedback-01/source-bindings.json");
  writeFileSync(path, readFileSync(path, "utf8") + "\n");
  expect(() => verifyCarouselCloseout(root)).toThrow(/Historical Carousel proof changed/);
});
