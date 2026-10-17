import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";

const proof = helpers as any;
const evidence = "evidence/runtime/date-time-optimization-2026-10-12/";
const sha = (bytes: Buffer | string) => createHash("sha256").update(bytes).digest("hex");
const entry = {
  authorization: "authorized", authorizedAt: "2026-10-12", decisionSource: "explicit-user-four-batch-date-time-implementation",
  userStatement: "按这个方案开始实施，按四个批次推进，功能、视觉、交互和动效都落实，完成后给我可操作的作业、考试和跨日时间段示例进行验收。",
  scope: "calendar-date-picker-assignment-exam-time-ranges", workMode: "system-mode", assetIdentity: "registry-candidate",
  plan: "docs/plans/2026-10-12-date-time-optimization-implementation.md",
  design: "docs/plans/2026-10-12-date-time-optimization-design.md",
  evidence: evidence + "verification.md", sourceBindings: evidence + "source-bindings.json",
  implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run",
  humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "unpublished",
  figmaWrite: "not-authorized", businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
};
function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "rain-g5-date-time-"));
  const baseline = JSON.parse(readFileSync(evidence + "baseline.json", "utf8"));
  const put = (file: string, bytes: Buffer | string) => { mkdirSync(dirname(join(directory, file)), { recursive: true }); writeFileSync(join(directory, file), bytes); };
  const copy = (file: string) => {
    const before = "evidence/runtime/slider-refinement-2026-10-13/before/" + file;
    put(file, readFileSync(existsSync(before) ? before : file));
  };
  copy(evidence + "baseline.json");
  for (const [file, hash] of Object.entries(baseline.files)) if (hash !== null) { copy(file); copy(evidence + "before/" + file); }
  for (const file of Object.keys(baseline.retainedEvidence)) copy(file);
  const phase = proof.parseYamlSubset(readFileSync(evidence + "before/status/current-phase.yaml", "utf8"));
  phase.componentRefinements.dateTimeOptimization = { ...entry };
  const sourceFiles = Object.fromEntries(proof.dateTimeOptimizationSourcePaths.filter((file: string) => existsSync(file)).map((file: string) => {
    copy(file); return [file, { before: baseline.files[file] ?? null, after: sha(readFileSync(join(directory, file))) }];
  }));
  const record = { kind: "DateTimeOptimizationSourceBindings", authorizedAt: "2026-10-12", scope: entry.scope,
    baseline: { path: evidence + "baseline.json", sha256: sha(readFileSync(evidence + "baseline.json")) }, sourceFiles };
  put(evidence + "source-bindings.json", JSON.stringify(record));
  return { directory, phase, record, put };
}

it("requires the exact four-batch authorization and keeps acceptance axes separate", () => {
  expect(proof.hasDateTimeOptimizationAuthorization).toBeTypeOf("function");
  const phase = proof.parseYamlSubset(readFileSync(evidence + "before/status/current-phase.yaml", "utf8"));
  phase.componentRefinements.dateTimeOptimization = { ...entry };
  expect(proof.hasDateTimeOptimizationAuthorization(phase)).toBe(true);
  for (const [key, value] of [["scope", "all-ui"], ["humanGate", "accepted"], ["publication", "published"], ["gitOperations", "authorized"], ["extra", true]]) {
    const changed = structuredClone(phase); changed.componentRefinements.dateTimeOptimization[key as string] = value;
    expect(proof.hasDateTimeOptimizationAuthorization(changed)).toBe(false);
  }
  phase.componentRefinements.dateTimeOptimization.implementation = "completed";
  expect(proof.hasDateTimeOptimizationAuthorization(phase)).toBe(false);
});

it("accepts a finite successor while retaining previous phase records and frozen before files", () => {
  expect(proof.getDateTimeOptimizationSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try { expect(proof.getDateTimeOptimizationSourceBindings(f.directory, f.phase).scope).toBe(entry.scope); }
  finally { rmSync(f.directory, { recursive: true }); }
});

it("keeps the frozen G5 binding readable through the verified date-time successor", () => {
  const f = fixture();
  try { expect(proof.getG5SourceBindings(f.directory, f.phase).kind).toBe("G5ComponentSourceBindings"); }
  finally { rmSync(f.directory, { recursive: true }); }
});

it("rejects extra source paths, changed earlier Gates and forged before files", () => {
  expect(proof.getDateTimeOptimizationSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try {
    f.put(evidence + "source-bindings.json", JSON.stringify({ ...f.record, sourceFiles: { ...f.record.sourceFiles, "unrelated.tsx": { before: null, after: sha("unrelated") } } }));
    expect(() => proof.getDateTimeOptimizationSourceBindings(f.directory, f.phase)).toThrow(/finite/);
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    const changed = structuredClone(f.phase); changed.componentRefinements.tokenFirstV12.humanGate = "not-recorded";
    expect(() => proof.getDateTimeOptimizationSourceBindings(f.directory, changed)).toThrow(/previous phase/);
    f.put(evidence + "before/packages/ui/src/date-picker/date-picker.tsx", "forged old component");
    expect(() => proof.getDateTimeOptimizationSourceBindings(f.directory, f.phase)).toThrow(/before/);
  } finally { rmSync(f.directory, { recursive: true }); }
});

it("does not accept a changed historical report as a new source binding", () => {
  expect(proof.getDateTimeOptimizationSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try {
    f.put("evidence/runtime/g5-components-2026-10-12/verification.md", "rewritten history");
    expect(() => proof.getDateTimeOptimizationSourceBindings(f.directory, f.phase)).toThrow(/historical evidence/);
  } finally { rmSync(f.directory, { recursive: true }); }
});
