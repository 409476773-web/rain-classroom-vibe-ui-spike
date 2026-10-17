import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import { measureColorContrast, resolveColor, resolveColorSurface } from "../packages/foundations/src/color-registry";
import * as helpers from "./verification-helpers.mjs";

const proof = helpers as any;
const evidence = "evidence/runtime/date-picker-closeout-2026-10-13/";
const sha = (bytes: Buffer | string) => createHash("sha256").update(bytes).digest("hex");
const phase = () => proof.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8"));

it("keeps required helper text above 4.5 on both theme surfaces", () => {
  const rules = [
    ["packages/ui/src/date-picker/date-picker.css", ".rain-date-picker__shortcut-reason"],
    ["apps/playground/src/docs/components/g5-component-pages.css", '[data-rain-id="doc-date-picker"] :is(.component-doc__header > p'],
  ] as const;
  for (const [file, selector] of rules) {
    const block = readFileSync(file, "utf8").split("\n").find(line => line.startsWith(selector));
    expect(block, file).toBeDefined();
    const number = block!.match(/color:\s*var\(--rain-category-text-neutral-(\d)\)/)?.[1];
    expect(number, "the actual helper rule must use an existing public neutral text Token").toBeDefined();
    for (const theme of ["light", "dark"] as const) for (const surface of ["Background/Neutral/1", "Background/Neutral/2"]) {
      const actual = measureColorContrast(resolveColor(`Text/Neutral/${number}`, theme), resolveColorSurface(surface, theme, "Background/Neutral/1"));
      expect(actual, `${file}: ${theme} on ${surface}`).toBeGreaterThanOrEqual(4.5);
    }
  }
});

function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "rain-date-picker-closeout-"));
  const put = (file: string, bytes: Buffer | string) => { mkdirSync(dirname(join(directory, file)), { recursive: true }); writeFileSync(join(directory, file), bytes); };
  const copy = (file: string) => put(file, readFileSync(file));
  const baseline = JSON.parse(readFileSync(evidence + "closure-baseline.json", "utf8"));
  for (const file of [evidence + "closure-baseline.json", baseline.intake.path, evidence + "source-bindings.json", ...Object.keys(baseline.files), ...Object.keys(baseline.retainedEvidence)]) copy(file);
  copy(evidence + "effective-before/status/current-phase.yaml");
  copy(evidence + "parallel-observations/slider-source-bindings.json");
  for (const [file, before] of Object.entries(baseline.files)) if (before !== null) copy(evidence + "before/" + file);
  for (const file of Object.keys(baseline.retainedEvidence)) copy(evidence + "predecessor/" + file);
  for (const file of ["scripts/date-picker-visual-feedback-governance.test.ts", "scripts/slider-refinement-governance.test.ts"]) copy(file);
  copy("evidence/runtime/date-picker-visual-feedback-2026-10-13/color-consumers.json");
  return { directory, put, copy, record: JSON.parse(readFileSync(evidence + "source-bindings.json", "utf8")) };
}

it("validates only the finite independent DatePicker closeout", () => {
  expect(proof.getDatePickerCloseoutSourceBindings).toBeTypeOf("function");
  expect(proof.getDatePickerCloseoutSourceBindings(process.cwd(), phase()).kind).toBe("DatePickerCloseoutSourceBindings");
  const baseline = JSON.parse(readFileSync(evidence + "baseline.json", "utf8"));
  for (const file of ["packages/ui/src/date-picker/date-picker.tsx", "packages/ui/src/date-picker/date-picker-time-field.tsx", "packages/ui/src/date-picker/date-picker.utils.ts", "apps/playground/src/docs/components/date-time-examples.tsx"]) {
    expect(sha(readFileSync(file))).toBe(baseline.files[file]);
  }
});

it("keeps the unrelated S3 observation blocked in every earlier shared reader", () => {
  for (const name of ["getSelectUnificationSourceBindings", "getDatePickerVisualFeedbackSourceBindings", "getSliderRefinementSourceBindings", "getDatePickerUxRefinementSourceBindings", "getDateTimeOptimizationSourceBindings", "getG5SourceBindings"]) {
    expect(() => proof[name](process.cwd(), phase()), name).toThrow("Select unification must preserve every previous phase record and Gate");
  }
});

it("rejects unverified completion, extra authority and changed prior Gates", () => {
  expect(proof.getDatePickerCloseoutSourceBindings).toBeTypeOf("function");
  for (const [key, value] of [["scope", "all-ui"], ["humanGate", "accepted"], ["contrastAcceptance", "accepted"], ["publication", "published"], ["extra", true]]) {
    const changed = phase(); changed.componentRefinements.datePickerCloseout[key as string] = value;
    expect(() => proof.getDatePickerCloseoutSourceBindings(process.cwd(), changed)).toThrow(/authorization/);
  }
  const changed = phase();
  Object.assign(changed.componentRefinements.datePickerCloseout, { implementation: "completed", automatedVerification: "not-run" });
  expect(() => proof.getDatePickerCloseoutSourceBindings(process.cwd(), changed)).toThrow(/authorization/);
  for (const target of ["sliderRefinement", "selectUnification"]) {
    const modified = phase(); modified.componentRefinements[target].humanGate = "accepted";
    expect(() => proof.getDatePickerCloseoutSourceBindings(process.cwd(), modified)).toThrow(/previous phase/);
  }
  const unknown = phase(); unknown.componentRefinements.unknownFutureBatch = { authorization: "authorized" };
  expect(() => proof.getDatePickerCloseoutSourceBindings(process.cwd(), unknown)).toThrow(/previous phase/);
});

it("rejects extra paths, a third CSS hash, forged before and changed original proofs", () => {
  expect(proof.getDatePickerCloseoutSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try {
    f.record.sourceFiles["unrelated.tsx"] = { before: null, after: sha("x") };
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase())).toThrow(/finite source/);
    delete f.record.sourceFiles["unrelated.tsx"]; f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    const file = "packages/ui/src/date-picker/date-picker.css";
    f.put(file, readFileSync(file, "utf8") + "\n");
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase())).toThrow(/current source/);
    f.copy(file);
    f.put(evidence + "before/" + file, "forged");
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase())).toThrow(/before source/);
    f.copy(evidence + "before/" + file);
    f.put("evidence/runtime/date-picker-visual-feedback-2026-10-13/source-bindings.json", "{}");
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase())).toThrow(/original proof/);
    f.copy("evidence/runtime/date-picker-visual-feedback-2026-10-13/source-bindings.json");
    f.put(evidence + "parallel-observations/slider-source-bindings.json", "{}");
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase())).toThrow(/frozen Slider observation/);
  } finally { rmSync(f.directory, { recursive: true }); }
});

it("does not let reconciliation change an owner or widen its three-field transition", () => {
  expect(proof.getDatePickerCloseoutSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try {
    f.record.reconciliation.sourceTransitions[0].finalOwner = "selectUnification";
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase())).toThrow(/reconciliation/);
    f.record = JSON.parse(readFileSync(evidence + "source-bindings.json", "utf8"));
    f.record.reconciliation.phaseFields.humanGate = "accepted";
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase())).toThrow(/reconciliation/);
  } finally { rmSync(f.directory, { recursive: true }); }
});
