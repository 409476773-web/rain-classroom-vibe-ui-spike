import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import { getG5ColorConsumers } from "./g5-color-consumers.mjs";

const proof = helpers as any;
const evidence = "evidence/runtime/date-picker-ux-refinement-2026-10-12/";
const previous = "evidence/runtime/date-time-optimization-2026-10-12/";
const sha = (bytes: Buffer | string) => createHash("sha256").update(bytes).digest("hex");
const entry = {
  authorization: "authorized", authorizedAt: "2026-10-12", decisionSource: "explicit-user-date-picker-ux-refinement",
  userStatement: "可以，按这版方案落地到组件库，复用现有组件和样式，把前面发现的交互问题一起修掉，再检查窄屏和键盘操作。",
  scope: "date-picker-panel-time-input-endpoints-validation-narrow-keyboard", workMode: "system-mode", assetIdentity: "registry-candidate",
  plan: "docs/plans/2026-10-12-date-picker-ux-refinement.md", evidence: evidence + "verification.md", sourceBindings: evidence + "source-bindings.json",
  implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run",
  humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "unpublished",
  figmaWrite: "not-authorized", businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
};
function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "rain-date-picker-ux-"));
  const put = (file: string, bytes: Buffer | string) => { mkdirSync(dirname(join(directory, file)), { recursive: true }); writeFileSync(join(directory, file), bytes); };
  const copy = (file: string) => {
    const before = "evidence/runtime/slider-refinement-2026-10-13/before-initial/" + file;
    const selectBefore = "evidence/runtime/select-unification-2026-10-13/before/" + file;
    put(file, readFileSync(existsSync(before) ? before : existsSync(selectBefore) ? selectBefore : file));
  };
  const baseline = JSON.parse(readFileSync(evidence + "baseline.json", "utf8"));
  copy(evidence + "baseline.json");
  for (const [file, hash] of Object.entries(baseline.files)) if (hash !== null) { copy(file); copy(evidence + "before/" + file); }
  for (const file of Object.keys(baseline.retainedEvidence)) copy(file);
  const priorBaseline = JSON.parse(readFileSync(previous + "baseline.json", "utf8"));
  for (const [file, hash] of Object.entries(priorBaseline.files)) if (hash !== null) {
    if (proof.dateTimeOptimizationSourcePaths.includes(file)) copy(file);
    else put(file, readFileSync(previous + "before/" + file));
  }
  for (const file of Object.keys(priorBaseline.retainedEvidence)) copy(file);
  const phase = proof.parseYamlSubset(readFileSync(evidence + "before/status/current-phase.yaml", "utf8"));
  phase.componentRefinements.dateTimeOptimization.uxRefinement = { ...entry };
  const sourceFiles = Object.fromEntries(proof.datePickerUxRefinementSourcePaths.filter((file: string) => existsSync(file)).map((file: string) => {
    copy(file); const bytes = readFileSync(join(directory, file)); return [file, { before: baseline.files[file] ?? null, after: sha(bytes) }];
  }));
  const record = { kind: "DatePickerUxRefinementSourceBindings", authorizedAt: "2026-10-12", scope: entry.scope,
    baseline: { path: evidence + "baseline.json", sha256: sha(readFileSync(evidence + "baseline.json")) }, sourceFiles };
  put(evidence + "source-bindings.json", JSON.stringify(record));
  return { directory, phase, record, put };
}

it("requires the exact UX authorization without reopening its completed parent or acceptance gates", () => {
  expect(proof.hasDatePickerUxRefinementAuthorization).toBeTypeOf("function");
  const phase = proof.parseYamlSubset(readFileSync(evidence + "before/status/current-phase.yaml", "utf8"));
  phase.componentRefinements.dateTimeOptimization.uxRefinement = { ...entry };
  expect(proof.hasDatePickerUxRefinementAuthorization(phase)).toBe(true);
  expect(proof.hasDateTimeOptimizationAuthorization(phase)).toBe(true);
  for (const [key, value] of [["scope", "all-ui"], ["humanGate", "accepted"], ["publication", "published"], ["extra", true], ["implementation", "completed"]]) {
    const changed = structuredClone(phase); changed.componentRefinements.dateTimeOptimization.uxRefinement[key as string] = value;
    expect(proof.hasDatePickerUxRefinementAuthorization(changed)).toBe(false);
    expect(proof.hasDateTimeOptimizationAuthorization(changed)).toBe(false);
  }
});

it("bridges the finite UX successor through the frozen date-time and G5 proofs", () => {
  expect(proof.getDatePickerUxRefinementSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try {
    expect(proof.getDatePickerUxRefinementSourceBindings(f.directory, f.phase).scope).toBe(entry.scope);
    expect(proof.getDateTimeOptimizationSourceBindings(f.directory, f.phase).kind).toBe("DateTimeOptimizationSourceBindings");
    expect(proof.getG5SourceBindings(f.directory, f.phase).kind).toBe("G5ComponentSourceBindings");
  } finally { rmSync(f.directory, { recursive: true }); }
});

it("rejects extra paths, changed source bytes and forged before snapshots", () => {
  expect(proof.getDatePickerUxRefinementSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try {
    f.put(evidence + "source-bindings.json", JSON.stringify({ ...f.record, sourceFiles: { ...f.record.sourceFiles, "unrelated.tsx": { before: null, after: sha("x") } } }));
    expect(() => proof.getDatePickerUxRefinementSourceBindings(f.directory, f.phase)).toThrow(/finite/);
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    const file = "packages/ui/src/date-picker/date-picker.tsx";
    f.put(file, "changed");
    expect(() => proof.getDatePickerUxRefinementSourceBindings(f.directory, f.phase)).toThrow(/source successor/);
    f.put(file, readFileSync(file));
    f.put(evidence + "before/" + file, "forged");
    expect(() => proof.getDatePickerUxRefinementSourceBindings(f.directory, f.phase)).toThrow(/before source/);
  } finally { rmSync(f.directory, { recursive: true }); }
});

it("preserves parent gates, out-of-scope Calendar sources and all prior evidence", () => {
  expect(proof.getDatePickerUxRefinementSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try {
    const changed = structuredClone(f.phase); changed.componentRefinements.dateTimeOptimization.humanGate = "accepted";
    expect(() => proof.getDatePickerUxRefinementSourceBindings(f.directory, changed)).toThrow(/previous phase/);
    const file = "packages/ui/src/calendar/calendar.css";
    f.put(file, "changed");
    expect(() => proof.getDatePickerUxRefinementSourceBindings(f.directory, f.phase)).toThrow(/unrelated source/);
    f.put(file, readFileSync(file));
    f.put(previous + "source-bindings.json", "{}");
    expect(() => proof.getDatePickerUxRefinementSourceBindings(f.directory, f.phase)).toThrow(/previous source proof|historical evidence/);
  } finally { rmSync(f.directory, { recursive: true }); }
});

it("replaces only DatePicker colors while retaining pending acceptance and the frozen Calendar ledger", () => {
  const f = fixture();
  try {
    const parent = JSON.parse(readFileSync(previous + "color-consumers.json", "utf8"));
    const file = "packages/ui/src/date-picker/date-picker.css", ledgerPath = evidence + "color-consumers.json";
    const ledger = { kind: "DatePickerUxRefinementFiniteColorConsumers", scope: entry.scope, humanGate: "awaiting_human", contrastAcceptance: "not-granted",
      sourceFiles: { [file]: sha(readFileSync(file)) }, colorRecipeConsumers: [],
      colorCssConsumers: parent.colorCssConsumers.filter((row: any) => row.filePath === file).map((row: any) => ({ ...row, use: { ...row.use, evidenceRef: entry.plan } })),
      nativeCssConsumers: parent.nativeCssConsumers.filter((row: any) => row.filePath === file) };
    const bind = () => { const bytes = JSON.stringify(ledger); f.put(ledgerPath, bytes); f.record.sourceFiles[ledgerPath] = { before: null, after: sha(bytes) }; f.put(evidence + "source-bindings.json", JSON.stringify(f.record)); };
    bind();
    expect(getG5ColorConsumers(f.directory).colorCssConsumers.filter((row: any) => row.filePath === file)).toEqual(ledger.colorCssConsumers);
    expect(getG5ColorConsumers(f.directory).colorCssConsumers.filter((row: any) => row.filePath.includes("calendar.css"))).toEqual(parent.colorCssConsumers.filter((row: any) => row.filePath.includes("calendar.css")));
    ledger.colorCssConsumers[0].use.alpha = 0.5; bind();
    expect(() => getG5ColorConsumers(f.directory)).toThrow(/DatePicker UX colors/);
  } finally { rmSync(f.directory, { recursive: true }); }
});
