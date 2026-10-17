import { copySelectUnificationFixture } from "./select-unification-test-fixture";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import { getG5ColorConsumers, verifyG5ColorSources } from "./g5-color-consumers.mjs";

const proof = helpers as any, evidence = "evidence/runtime/date-picker-visual-feedback-2026-10-13/";
const sha = (bytes: Buffer | string) => createHash("sha256").update(bytes).digest("hex");
const phase = () => proof.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8"));
function fixture(coherentOwner = false) {
  const directory = mkdtempSync(join(tmpdir(), "rain-date-picker-visual-"));
  const put = (file: string, bytes: Buffer | string) => { mkdirSync(dirname(join(directory, file)), { recursive: true }); writeFileSync(join(directory, file), bytes); };
  const copy = (file: string) => put(file, readFileSync(file));
  const baseline = JSON.parse(readFileSync(evidence + "closure-baseline.json", "utf8"));
  for (const file of [evidence + "closure-baseline.json", baseline.intake.path, evidence + "source-bindings.json", ...Object.keys(baseline.retainedEvidence)]) copy(file);
  for (const [file, before] of Object.entries(baseline.files)) {
    if (existsSync(file)) copy(file);
    if (before !== null) copy(evidence + "before/" + file);
  }
  const rawPhase = readFileSync("status/current-phase.yaml", "utf8").replace(/^  selectUnification:\n(?:^    .*\n|^\s*\n)*/m, "");
  put("status/current-phase.yaml", rawPhase);
  const fixturePhase = proof.parseYamlSubset(rawPhase);
  const ownRecord = JSON.parse(readFileSync(evidence + "source-bindings.json", "utf8"));
  ownRecord.sourceFiles["status/current-phase.yaml"].after = sha(rawPhase);
  put(evidence + "source-bindings.json", JSON.stringify(ownRecord));
  if (coherentOwner) {
    // Synthetic predecessor fixture; live owners remain checked separately without refreshing their records.
    for (const name of ["slider-refinement-2026-10-13", "date-picker-ux-refinement-2026-10-12", "date-time-optimization-2026-10-12"]) {
      const previous = "evidence/runtime/" + name + "/";
      const saved = JSON.parse(readFileSync(previous + "baseline.json", "utf8"));
      const bindings = JSON.parse(readFileSync(previous + "source-bindings.json", "utf8"));
      for (const file of [previous + "baseline.json", previous + "source-bindings.json", ...Object.keys(saved.retainedEvidence), ...Object.keys(bindings.sourceFiles)]) copy(file);
      for (const [file, before] of Object.entries(saved.files)) if (before !== null) {
        if (!existsSync(join(directory, file))) copy(file);
        copy(previous + "before/" + file);
      }
      if (saved.initialBaseline) {
        copy(saved.initialBaseline.path);
        for (const file of Object.keys(JSON.parse(readFileSync(saved.initialBaseline.path, "utf8")).files)) copy(previous + "before-initial/" + file);
      }
      if (name.startsWith("slider")) {
        for (const [file, binding] of Object.entries(bindings.sourceFiles) as [string, any][]) binding.after = baseline.files[file] ?? sha(readFileSync(join(directory, file)));
        put(previous + "source-bindings.json", JSON.stringify(bindings));
      }
    }
    const g5 = "evidence/runtime/g5-components-2026-10-12/";
    const saved = JSON.parse(readFileSync(g5 + "baseline.json", "utf8"));
    const bindings = JSON.parse(readFileSync(g5 + "source-bindings.json", "utf8"));
    const protectedFiles = JSON.parse(readFileSync(g5 + "protected-source-sha256.json", "utf8"));
    for (const file of [g5 + "baseline.json", g5 + "source-bindings.json", g5 + "protected-source-sha256.json", g5 + "before/current-phase.yaml", ...Object.keys(bindings.sourceFiles), ...Object.keys(protectedFiles)]) copy(file);
    for (const file of ["scripts/verification-helpers.mjs", "scripts/g4-page-acceptance.test.ts", "scripts/g4-components-governance.test.ts", "apps/playground/src/styles.css", "docs/ai/asset-index.md", "scripts/verify-boundaries.mjs", "scripts/verify-workspace.mjs", "scripts/verify-token-foundations.mjs"]) if (existsSync(g5 + "before/" + file)) copy(g5 + "before/" + file);
    expect(saved.files["status/current-phase.yaml"]).toBe(sha(readFileSync(join(directory, g5 + "before/current-phase.yaml"))));
  }
  copySelectUnificationFixture(copy);
  const select = JSON.parse(readFileSync("evidence/runtime/select-unification-2026-10-13/source-bindings.json", "utf8"));
  for (const [file, binding] of Object.entries(select.sourceFiles) as [string, any][]) {
    if (binding.before !== null) put(file, readFileSync("evidence/runtime/select-unification-2026-10-13/before/" + file));
  }
  for (const [file, binding] of Object.entries(ownRecord.sourceFiles) as [string, any][]) {
    if (sha(readFileSync(file)) === binding.after) copy(file);
  }
  put("status/current-phase.yaml", rawPhase);
  if (coherentOwner) {
    const path = "evidence/runtime/slider-refinement-2026-10-13/source-bindings.json";
    const owner = JSON.parse(readFileSync(join(directory, path), "utf8"));
    for (const [file, binding] of Object.entries(owner.sourceFiles) as [string, any][]) binding.after = baseline.files[file] ?? sha(readFileSync(join(directory, file)));
    put(path, JSON.stringify(owner));
  }
  return { directory, put, phase: fixturePhase, record: ownRecord };
}

it("requires the precise visual feedback scope and keeps all acceptance gates separate", () => {
  expect(proof.hasDatePickerVisualFeedbackAuthorization).toBeTypeOf("function");
  expect(proof.hasDatePickerVisualFeedbackAuthorization(phase())).toBe(true);
  for (const [key, value] of [["scope", "all-ui"], ["humanGate", "accepted"], ["contrastAcceptance", "accepted"], ["publication", "published"], ["extra", true]]) {
    const changed = phase(); changed.componentRefinements.datePickerVisualFeedback[key as string] = value;
    expect(proof.hasDatePickerVisualFeedbackAuthorization(changed)).toBe(false);
  }
  const changed = phase();
  Object.assign(changed.componentRefinements.datePickerVisualFeedback, { implementation: "completed", automatedVerification: "not-run", independentReview: "not-run" });
  expect(proof.hasDatePickerVisualFeedbackAuthorization(changed)).toBe(false);
});

it("bridges coherent predecessor fixtures without changing live owner proofs", () => {
  expect(proof.getDatePickerVisualFeedbackSourceBindings).toBeTypeOf("function");
  const f = fixture(true);
  try {
    for (const reader of [proof.getDatePickerVisualFeedbackSourceBindings, proof.getSliderRefinementSourceBindings, proof.getDatePickerUxRefinementSourceBindings, proof.getDateTimeOptimizationSourceBindings, proof.getG5SourceBindings]) expect(() => reader(f.directory, f.phase)).not.toThrow();
  } finally { rmSync(f.directory, { recursive: true }); }
});

it("rejects extra paths, forged before bytes and changed original intake", () => {
  const f = fixture();
  try {
    f.record.sourceFiles["unrelated.tsx"] = { before: null, after: sha("x") };
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    expect(() => proof.getDatePickerVisualFeedbackSourceBindings(f.directory, f.phase)).toThrow(/finite/);
    delete f.record.sourceFiles["unrelated.tsx"]; f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    const file = "packages/ui/src/date-picker/date-picker.tsx";
    f.put(evidence + "before/" + file, "forged");
    expect(() => proof.getDatePickerVisualFeedbackSourceBindings(f.directory, f.phase)).toThrow(/before source|intake/);
    f.put(evidence + "before/" + file, readFileSync(evidence + "before/" + file));
    f.put(evidence + "baseline.json", "{}");
    expect(() => proof.getDatePickerVisualFeedbackSourceBindings(f.directory, f.phase)).toThrow(/intake/);
  } finally { rmSync(f.directory, { recursive: true }); }
});

it("rejects latest source tampering at every earlier proof entry point", () => {
  const f = fixture();
  try {
    f.put("packages/ui/src/date-picker/date-picker.tsx", "changed");
    for (const reader of [proof.getDatePickerVisualFeedbackSourceBindings, proof.getSliderRefinementSourceBindings, proof.getDatePickerUxRefinementSourceBindings, proof.getDateTimeOptimizationSourceBindings, proof.getG5SourceBindings]) {
      expect(() => reader(f.directory, f.phase)).toThrow(/DatePicker visual.*source/);
    }
  } finally { rmSync(f.directory, { recursive: true }); }
});

it("preserves the entire prior phase and rejects unknown slots or changed Slider gates", () => {
  const f = fixture();
  try {
  for (const key of ["humanGate", "scope"]) {
    const changed = structuredClone(f.phase); changed.componentRefinements.sliderRefinement[key] = "changed";
    expect(() => proof.getDatePickerVisualFeedbackSourceBindings(f.directory, changed)).toThrow(/previous phase/);
  }
  const changed = structuredClone(f.phase); changed.componentRefinements.unknownFutureBatch = { authorization: "authorized" };
  expect(() => proof.getDatePickerVisualFeedbackSourceBindings(f.directory, changed)).toThrow(/previous phase/);
  expect(() => proof.getValidatedTailwindB2History(changed)).toThrow(/Invalid Token/);
  } finally { rmSync(f.directory, { recursive: true }); }
});

it("updates only the two CSS ledgers while retaining Slider, Calendar and pending acceptance", () => {
  const f = fixture(true);
  let ledger: any;
  try { ledger = verifyG5ColorSources(f.directory); } finally { rmSync(f.directory, { recursive: true }); }
  const own = JSON.parse(readFileSync(evidence + "color-consumers.json", "utf8"));
  const slider = JSON.parse(readFileSync("evidence/runtime/slider-refinement-2026-10-13/color-consumers.json", "utf8"));
  const previous = JSON.parse(readFileSync("evidence/runtime/date-time-optimization-2026-10-12/color-consumers.json", "utf8"));
  expect(Object.keys(own.sourceFiles)).toEqual(["packages/ui/src/date-picker/date-picker.css", "apps/playground/src/docs/components/g5-component-pages.css"]);
  expect(ledger.colorCssConsumers.filter((row: any) => Object.keys(own.sourceFiles).includes(row.filePath))).toEqual(own.colorCssConsumers);
  expect(ledger.colorCssConsumers.filter((row: any) => Object.keys(slider.sourceFiles).includes(row.filePath))).toEqual(slider.colorCssConsumers);
  expect(ledger.colorCssConsumers.filter((row: any) => row.filePath === "packages/ui/src/calendar/calendar.css")).toEqual(previous.colorCssConsumers.filter((row: any) => row.filePath === "packages/ui/src/calendar/calendar.css"));
  expect(own.humanGate).toBe("awaiting_human"); expect(own.contrastAcceptance).toBe("not-granted");
  expect(own.colorCssConsumers.every((row: any) => row.contrastReview === "pending-review" && row.use.evidenceRef === "docs/plans/2026-10-13-date-picker-visual-feedback.md")).toBe(true);
});

it("accepts only verified before or raw after for shared Slider bindings and rejects a third hash or independent drift", () => {
  const f = fixture(true), ownerPath = "evidence/runtime/slider-refinement-2026-10-13/source-bindings.json";
  const owner = JSON.parse(readFileSync(join(f.directory, ownerPath), "utf8"));
  const own = JSON.parse(readFileSync(evidence + "source-bindings.json", "utf8"));
  const file = "scripts/verification-helpers.mjs";
  try {
    for (const expected of [own.sourceFiles[file].before, own.sourceFiles[file].after]) {
      owner.sourceFiles[file].after = expected; f.put(ownerPath, JSON.stringify(owner));
      expect(() => proof.getSliderRefinementSourceBindings(f.directory, f.phase)).not.toThrow();
    }
    owner.sourceFiles[file].after = sha("third hash"); f.put(ownerPath, JSON.stringify(owner));
    expect(() => proof.getSliderRefinementSourceBindings(f.directory, f.phase)).toThrow(/Slider current source changed/);
    owner.sourceFiles[file].after = own.sourceFiles[file].after; f.put(ownerPath, JSON.stringify(owner));
    f.put("packages/ui/src/slider/slider.css", "changed");
    expect(() => proof.getSliderRefinementSourceBindings(f.directory, f.phase)).toThrow(/Slider current source changed/);
  } finally { rmSync(f.directory, { recursive: true }); }
});
