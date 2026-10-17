import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { g4SizingReviewSourcePaths, getG4SizingReviewSourceBindings, hasG4SizingReviewAuthorization, parseYamlSubset, validateG4SizingCssSuccessor } from "./verification-helpers.mjs";
import { getG4ColorConsumers, getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

const root = process.cwd(), evidence = "evidence/runtime/g4-review-sizing-2026-10-11/";
const sha = (bytes: Buffer | string) => createHash("sha256").update(bytes).digest("hex");
const before = () => parseYamlSubset(readFileSync(join(root, evidence, "before/status/current-phase.yaml"), "utf8")) as any;
const review = () => ({
  authorization: "authorized", authorizedAt: "2026-10-11", decisionSource: "explicit-user-g4-title-data-sizing-and-item-icon-feedback",
  scope: "title-16-exceptions-17-18-data-max-28-and-item-icons", workMode: "system-mode",
  plan: "docs/plans/2026-10-11-g4-sizing-and-icons.md", evidence: evidence + "verification.md", sourceBindings: evidence + "source-bindings.json",
  implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run", humanGate: "awaiting_human", contrastAcceptance: "not-granted",
  publication: "unpublished", figmaWrite: "not-authorized", businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
});
const authorized = () => { const phase = before(); phase.componentRefinements.g4Components.sizingReview = review(); return phase; };

function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "rain-g4-sizing-")), phase = authorized();
  const baseline = JSON.parse(readFileSync(join(root, evidence, "baseline.json"), "utf8"));
  const copy = (file: string, bytes: Buffer | string) => { const target = join(directory, file); mkdirSync(dirname(target), { recursive: true }); writeFileSync(target, bytes); };
  copy(evidence + "baseline.json", readFileSync(join(root, evidence, "baseline.json")));
  for (const file of Object.keys(baseline.files)) {
    const bytes = readFileSync(join(root, evidence, "before", file)); copy(file, bytes); copy(evidence + "before/" + file, bytes);
  }
  for (const file of g4SizingReviewSourcePaths) copy(file, readFileSync(join(root, file)));
  for (const name of ["typography", "item", "progress"]) {
    const file = `manifests/ui/${name}.yaml`;
    let text = readFileSync(join(root, evidence, "before", file), "utf8");
    if (name === "typography") text = text.replace("新增独立使用页与检索映射；现有 Foundations 源码和验收记录保持。", "独立使用页与检索映射；本轮按用户反馈修订 Heading/Data 字号合同，旧验收记录保留。").replace('sourceVersion: "existing-foundations-preserved-2026-10-11"', 'sourceVersion: "user-sizing-feedback-2026-10-11"').replace('migrationNotes: "这是 G4 使用收口登记，不重置旧 Foundations 验收；新的展示与使用例独立待审。"', 'migrationNotes: "标题默认 16px，显式例外 17/18px；关键数字最大 28px。本轮修改现有 Foundations 合同，旧验收保留，新反馈独立待审。"');
    copy(file, text + `  sizingReview:\n    scope: "${review().scope}"\n    evidence: "${review().evidence}"\n    automated: "not-run"\n    independentReview: "not-run"\n    humanGate: "awaiting_human"\n    contrastAcceptance: "not-granted"\n`);
  }
  const registry = JSON.parse(readFileSync(join(directory, "registry/g4-assets.json"), "utf8")); delete registry.pageAcceptance; registry.items[0].localStatus = "modified"; copy("registry/g4-assets.json", JSON.stringify(registry));
  const sourceFiles = Object.fromEntries(g4SizingReviewSourcePaths.map(file => [file, { before: baseline.files[file] ?? null, after: sha(readFileSync(join(directory, file))) }]));
  const retainedRecords = Object.fromEntries(Object.entries(baseline.files).filter(([file]) => !g4SizingReviewSourcePaths.includes(file) && file !== "status/current-phase.yaml"));
  const record: any = { kind: "G4SizingReviewSourceBindings", authorizedAt: "2026-10-11", scope: review().scope, baseline: { path: evidence + "baseline.json", sha256: sha(readFileSync(join(root, evidence, "baseline.json"))) }, sourceFiles, retainedRecords };
  const save = () => copy(evidence + "source-bindings.json", JSON.stringify(record)); save();
  return { directory, phase, record, save, copy };
}

describe("G4 title/data sizing and icons retain their exact predecessor", () => {
  it("adds only the independently authorized review and leaves previous Gates unchanged", () => {
    const phase = authorized(), original = before(); expect(hasG4SizingReviewAuthorization(phase)).toBe(true);
    delete phase.componentRefinements.g4Components.sizingReview; expect(phase).toEqual(original); expect(hasG4SizingReviewAuthorization(phase)).toBe(false);
    for (const [field, value] of [["scope", "all-components"], ["humanGate", "accepted"], ["contrastAcceptance", "accepted"], ["publication", "published"], ["figmaWrite", "authorized"], ["gitOperations", "authorized"], ["extraSource", "other.tsx"]]) {
      const changed = authorized(); changed.componentRefinements.g4Components.sizingReview[field!] = value; expect(hasG4SizingReviewAuthorization(changed), field).toBe(false);
    }
  });
  it("requires both scoped automated checks and independent review before completion", () => {
    const phase = authorized(), entry = phase.componentRefinements.g4Components.sizingReview; entry.implementation = "completed";
    expect(hasG4SizingReviewAuthorization(phase)).toBe(false); entry.automatedVerification = "passed-scoped"; expect(hasG4SizingReviewAuthorization(phase)).toBe(false);
    entry.independentReview = "passed-scoped"; expect(hasG4SizingReviewAuthorization(phase)).toBe(true);
  });
  it("changes only five precise title callers and cannot re-sign an unrelated CSS change", () => {
    for (const file of ["component-doc", "input-page", "select-page", "input-number-page", "tag-page"].map(name => `apps/playground/src/docs/components/${name}.css`)) {
      const original = readFileSync(join(root, evidence, "before", file), "utf8"), current = readFileSync(join(root, file), "utf8");
      expect(validateG4SizingCssSuccessor(file, original, current)).toEqual([]);
      if (!file.endsWith("component-doc.css")) expect(validateG4SizingCssSuccessor(file, original, current.replace(" font-size: var(--rain-font-size-16); line-height: var(--rain-line-height-24);", ""))).not.toEqual([]);
      expect(validateG4SizingCssSuccessor(file, original, current + "\nbody { margin:0; }\n")).not.toEqual([]);
    }
    const { directory, phase, record, save, copy } = fixture();
    try { const file = "apps/playground/src/docs/components/input-page.css", changed = readFileSync(join(directory, file), "utf8") + "\nbody { margin:0; }\n"; copy(file, changed); record.sourceFiles[file].after = sha(changed); save(); expect(() => getG4SizingReviewSourceBindings(directory, phase)).toThrow("exact title declarations"); }
    finally { rmSync(directory, { recursive: true, force: true }); }
  });
  it("checks every actual before byte and the finite current source inventory", () => {
    const { directory, phase, record, save } = fixture();
    try { expect(() => getG4SizingReviewSourceBindings(directory, phase)).not.toThrow(); record.sourceFiles["packages/ui/src/item/item.tsx"] = { before: "fake", after: "fake" }; save(); expect(() => getG4SizingReviewSourceBindings(directory, phase)).toThrow("finite source inventory"); }
    finally { rmSync(directory, { recursive: true, force: true }); }
  });
  it("cannot re-sign an old record, raw token, before snapshot or prior Gate", () => {
    for (const file of ["evidence/runtime/g4-components-2026-10-11/source-bindings.json", "evidence/runtime/g4-visual-refinement-2026-10-11/source-bindings.json", "packages/foundations/src/tokens.css", "evidence/runtime/g4-components-2026-10-11/verification.md"]) {
      const { directory, phase, record, save, copy } = fixture();
      try { const changed = readFileSync(join(directory, file), "utf8") + "\n"; copy(file, changed); record.retainedRecords[file] = sha(changed); save(); expect(() => getG4SizingReviewSourceBindings(directory, phase), file).toThrow(); }
      finally { rmSync(directory, { recursive: true, force: true }); }
    }
    const { directory, phase, copy } = fixture();
    try { copy(evidence + "before/packages/foundations/src/typography-contract.ts", "recaptured"); expect(() => getG4SizingReviewSourceBindings(directory, phase)).toThrow("before snapshot"); }
    finally { rmSync(directory, { recursive: true, force: true }); }
  });
  it("checks copied arrow source separately and never exempts an actual unregistered paint", () => {
    const filePath = "apps/playground/src/docs/components/g4-component-pages.tsx", source = readFileSync(join(root, filePath), "utf8");
    const outputs = getTokenFoundationOutputs() as any, consumers = getG4ColorConsumers(); outputs.colorRecipeConsumers.push(...consumers.colorRecipeConsumers); outputs.colorCssConsumers.push(...consumers.colorCssConsumers);
    expect(validateRegisteredRecipeColors({ filePath, source, outputs, root })).toEqual([]);
    for (const changed of [source.replace('text-rain-category-icon-neutral-3', 'text-rain-category-icon-neutral-1'), source.replace('<ItemMedia className="text-rain-category-icon-neutral-3"><ArrowRightIcon aria-hidden="true" />', '<ItemMedia><ArrowRightIcon className="text-rain-category-icon-neutral-3" aria-hidden="true" />'), source + '\nconst Bad = () => <span className="text-rain-category-icon-neutral-3">真实页面</span>;\n']) expect(validateRegisteredRecipeColors({ filePath, source: changed, outputs, root })).not.toEqual([]);
  });
  it("rejects a changed Manifest capability or republished Registry even if after SHA is updated", () => {
    for (const file of ["manifests/ui/item.yaml", "registry/g4-assets.json"]) {
      const { directory, phase, record, save, copy } = fixture();
      try { const text = readFileSync(join(directory, file), "utf8"); const changed = file.endsWith(".json") ? text.replace('"publication":"not-published"', '"publication":"published"') : text.replace('publication: "unpublished"', 'publication: "published"'); copy(file, changed); record.sourceFiles[file].after = sha(changed); save(); expect(() => getG4SizingReviewSourceBindings(directory, phase)).toThrow(); }
      finally { rmSync(directory, { recursive: true, force: true }); }
    }
  });
});
