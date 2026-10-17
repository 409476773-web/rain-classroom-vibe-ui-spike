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
function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "rain-date-picker-visual-"));
  const put = (file: string, bytes: Buffer | string) => { mkdirSync(dirname(join(directory, file)), { recursive: true }); writeFileSync(join(directory, file), bytes); };
  const copy = (file: string) => put(file, readFileSync(file));
  const baseline = JSON.parse(readFileSync(evidence + "closure-baseline.json", "utf8"));
  for (const file of [evidence + "closure-baseline.json", baseline.intake.path, evidence + "source-bindings.json", ...Object.keys(baseline.retainedEvidence)]) copy(file);
  for (const [file, before] of Object.entries(baseline.files)) {
    if (existsSync(file)) copy(file);
    if (before !== null) copy(evidence + "before/" + file);
  }
  return { directory, put, record: JSON.parse(readFileSync(evidence + "source-bindings.json", "utf8")) };
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

it("validates the finite successor through Slider, UX, date-time and G5 without changing their proofs", () => {
  expect(proof.getDatePickerVisualFeedbackSourceBindings).toBeTypeOf("function");
  for (const reader of [proof.getDatePickerVisualFeedbackSourceBindings, proof.getSliderRefinementSourceBindings, proof.getDatePickerUxRefinementSourceBindings, proof.getDateTimeOptimizationSourceBindings, proof.getG5SourceBindings]) {
    expect(() => reader(process.cwd(), phase())).not.toThrow();
  }
});

it("rejects extra paths, forged before bytes and changed original intake", () => {
  const f = fixture();
  try {
    f.record.sourceFiles["unrelated.tsx"] = { before: null, after: sha("x") };
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    expect(() => proof.getDatePickerVisualFeedbackSourceBindings(f.directory, phase())).toThrow(/finite/);
    delete f.record.sourceFiles["unrelated.tsx"]; f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    const file = "packages/ui/src/date-picker/date-picker.tsx";
    f.put(evidence + "before/" + file, "forged");
    expect(() => proof.getDatePickerVisualFeedbackSourceBindings(f.directory, phase())).toThrow(/before source|intake/);
    f.put(evidence + "before/" + file, readFileSync(evidence + "before/" + file));
    f.put(evidence + "baseline.json", "{}");
    expect(() => proof.getDatePickerVisualFeedbackSourceBindings(f.directory, phase())).toThrow(/intake/);
  } finally { rmSync(f.directory, { recursive: true }); }
});

it("rejects latest source tampering at every earlier proof entry point", () => {
  const f = fixture();
  try {
    f.put("packages/ui/src/date-picker/date-picker.tsx", "changed");
    for (const reader of [proof.getDatePickerVisualFeedbackSourceBindings, proof.getSliderRefinementSourceBindings, proof.getDatePickerUxRefinementSourceBindings, proof.getDateTimeOptimizationSourceBindings, proof.getG5SourceBindings]) {
      expect(() => reader(f.directory, phase())).toThrow(/DatePicker visual.*source/);
    }
  } finally { rmSync(f.directory, { recursive: true }); }
});

it("preserves the entire prior phase and rejects unknown slots or changed Slider gates", () => {
  for (const key of ["humanGate", "scope"]) {
    const changed = phase(); changed.componentRefinements.sliderRefinement[key] = "changed";
    expect(() => proof.getDatePickerVisualFeedbackSourceBindings(process.cwd(), changed)).toThrow(/previous phase/);
  }
  const changed = phase(); changed.componentRefinements.unknownFutureBatch = { authorization: "authorized" };
  expect(() => proof.getDatePickerVisualFeedbackSourceBindings(process.cwd(), changed)).toThrow(/previous phase/);
  expect(() => proof.getValidatedTailwindB2History(changed)).toThrow(/Invalid Token/);
});

it("updates only the two CSS ledgers while retaining Slider, Calendar and pending acceptance", () => {
  const ledger = verifyG5ColorSources();
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
