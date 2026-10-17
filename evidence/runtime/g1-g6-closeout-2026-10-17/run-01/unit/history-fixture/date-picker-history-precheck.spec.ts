// Isolated historical-only diagnostic of the owning test; not final test-suite evidence.
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import { measureColorContrast, resolveColor, resolveColorSurface } from "/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/packages/foundations/src/color-registry";
import * as helpers from "/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/scripts/verification-helpers.mjs";
import { copyDatePickerCloseoutFixture, copySelectUnificationFixture } from "/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/scripts/select-unification-test-fixture";

// A sealed Drawer predecessor may reject the exact changed input before the older owner reads it.
// Match that input path, never an arbitrary exception or an unrelated source failure.
function rejectedInput(files: string | string[], original: RegExp) {
  const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixes = ["Source outside Drawer scope changed; concurrent work remains unaccepted: ", "Drawer cannot change original G6 or older evidence: "];
  return new RegExp([original.source, ...[files].flat().flatMap(file => prefixes.map(prefix => escape(prefix + file) + "(?:\\n|$)"))].join("|"));
}

const proof = helpers as any;
const evidence = "evidence/runtime/date-picker-closeout-2026-10-13/";
const sha = (bytes: Buffer | string) => createHash("sha256").update(bytes).digest("hex");
const phase = (root = process.cwd()) => proof.parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8"));

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
}, 60_000);

function fixture(sharedHistory = false) {
  const directory = mkdtempSync(join(tmpdir(), "rain-date-picker-closeout-"));
  const put = (file: string, bytes: Buffer | string) => { mkdirSync(dirname(join(directory, file)), { recursive: true }); writeFileSync(join(directory, file), bytes); };
  const view = "evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/";
  const projected = JSON.parse(readFileSync(view + "source-bindings.json", "utf8")).projectedFiles;
  const copy = (file: string) => {
    const bytes = readFileSync(projected[file] ? view + "predecessor/" + file : file);
    if (projected[file]) expect(sha(bytes), file).toBe(projected[file]);
    put(file, bytes);
  };
  copySelectUnificationFixture(copy, false);
  copyDatePickerCloseoutFixture(copy, true, false);
  if (sharedHistory) {
    // These six readers also open immutable intake and predecessor proofs that are
    // outside the later source projection. Copy only their original manifest lists.
    for (const [name, baselineName] of [
      ["date-picker-visual-feedback-2026-10-13", "closure-baseline.json"],
      ["slider-refinement-2026-10-13", "baseline.json"],
      ["date-picker-ux-refinement-2026-10-12", "baseline.json"],
      ["date-time-optimization-2026-10-12", "baseline.json"],
    ]) {
      const previous = "evidence/runtime/" + name + "/";
      const baseline = JSON.parse(readFileSync(previous + baselineName, "utf8"));
      const bindings = JSON.parse(readFileSync(previous + "source-bindings.json", "utf8"));
      for (const file of [previous + baselineName, previous + "source-bindings.json", ...Object.keys(bindings.sourceFiles), ...Object.keys(baseline.retainedEvidence)]) copy(file);
      for (const [file, before] of Object.entries(baseline.files)) if (before !== null) { copy(file); copy(previous + "before/" + file); }
      for (const metadata of [baseline.intake, baseline.initialBaseline, baseline.priorSourceBindings]) if (metadata) copy(metadata.path);
      if (baseline.initialBaseline) {
        const initial = JSON.parse(readFileSync(baseline.initialBaseline.path, "utf8"));
        for (const file of Object.keys(initial.files)) copy(previous + "before-initial/" + file);
      }
    }
    const g5 = "evidence/runtime/g5-components-2026-10-12/";
    const bindings = JSON.parse(readFileSync(g5 + "source-bindings.json", "utf8"));
    const protectedFiles = JSON.parse(readFileSync(g5 + "protected-source-sha256.json", "utf8"));
    for (const file of [...Object.keys(bindings.sourceFiles), ...Object.keys(protectedFiles)]) copy(file);
    for (const file of ["baseline.json", "source-bindings.json", "protected-source-sha256.json", "before/current-phase.yaml",
      ...["scripts/verification-helpers.mjs", "scripts/g4-page-acceptance.test.ts", "scripts/g4-components-governance.test.ts", "apps/playground/src/styles.css", "docs/ai/asset-index.md"].map(file => "before/" + file)]) copy(g5 + file);
  }
  for (const file of Object.keys(projected)) copy(file);
  return { directory, put, copy, record: JSON.parse(readFileSync(evidence + "source-bindings.json", "utf8")) };
}

it("validates only the finite independent DatePicker closeout", () => {
  expect(proof.getDatePickerCloseoutSourceBindings).toBeTypeOf("function");
  expect(proof.getDatePickerCloseoutSourceBindings(process.cwd(), phase()).kind).toBe("DatePickerCloseoutSourceBindings");
  const baseline = JSON.parse(readFileSync(evidence + "baseline.json", "utf8"));
  for (const file of ["packages/ui/src/date-picker/date-picker.tsx", "packages/ui/src/date-picker/date-picker-time-field.tsx", "packages/ui/src/date-picker/date-picker.utils.ts", "apps/playground/src/docs/components/date-time-examples.tsx"]) {
    expect(sha(readFileSync(file))).toBe(baseline.files[file]);
  }
}, 60_000);

it("allows the current shared chain and preserves original Slider predecessor rejection rules", () => {
  // Diagnostic artifact: live assertions remain in the owning test and wait for the new seal.
  const names = ["getSelectUnificationSourceBindings", "getDatePickerVisualFeedbackSourceBindings", "getSliderRefinementSourceBindings", "getDatePickerUxRefinementSourceBindings", "getDateTimeOptimizationSourceBindings", "getG5SourceBindings"];
  const f = fixture(true);
  try {
    const original = phase(f.directory);
    for (const name of names) {
      expect(() => proof[name](f.directory, original), name + " historical positive").not.toThrow();
      const unproven = structuredClone(original); delete unproven.componentRefinements.sliderCloseout;
      expect(() => proof[name](f.directory, unproven), name).toThrow(/Select unification must preserve|DatePicker closeout must preserve|DatePicker closeout current source changed: status\/current-phase\.yaml/);
      const changed = structuredClone(original); changed.localExperiments.rainDesignerStarter.independentReview = "unproven-observation";
      expect(() => proof[name](f.directory, changed), name).toThrow(/Slider closeout.*phase/);
    }
  } finally { rmSync(f.directory, { recursive: true }); }
}, 60_000);

it("rejects unverified completion, extra authority and changed prior Gates", () => {
  expect(proof.getDatePickerCloseoutSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try {
    expect(proof.getDatePickerCloseoutSourceBindings(f.directory, phase(f.directory)).kind).toBe("DatePickerCloseoutSourceBindings");
    for (const [key, value] of [["scope", "all-ui"], ["humanGate", "accepted"], ["contrastAcceptance", "accepted"], ["publication", "published"], ["extra", true]]) {
      const changed = phase(f.directory); changed.componentRefinements.datePickerCloseout[key as string] = value;
      expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, changed)).toThrow(/authorization/);
    }
    const changed = phase(f.directory);
    Object.assign(changed.componentRefinements.datePickerCloseout, { implementation: "completed", automatedVerification: "not-run" });
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, changed)).toThrow(/authorization/);
    for (const target of ["sliderRefinement", "selectUnification"]) {
      const modified = phase(f.directory); modified.componentRefinements[target].humanGate = "accepted";
      expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, modified)).toThrow(/previous phase|Slider closeout requires its exact finite authorization/);
    }
    const unknown = phase(f.directory); unknown.componentRefinements.unknownFutureBatch = { authorization: "authorized" };
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, unknown)).toThrow(/previous phase/);
  } finally { rmSync(f.directory, { recursive: true }); }
}, 60_000);

it("rejects extra paths, a third CSS hash, forged before and changed original proofs", () => {
  expect(proof.getDatePickerCloseoutSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try {
    expect(proof.getDatePickerCloseoutSourceBindings(f.directory, phase(f.directory)).kind).toBe("DatePickerCloseoutSourceBindings");
    f.record.sourceFiles["unrelated.tsx"] = { before: null, after: sha("x") };
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase(f.directory))).toThrow(rejectedInput(evidence + "source-bindings.json", /finite source|Slider closeout original proof changed/));
    delete f.record.sourceFiles["unrelated.tsx"]; f.copy(evidence + "source-bindings.json");
    const file = "packages/ui/src/date-picker/date-picker.css";
    f.put(file, readFileSync(file, "utf8") + "\n");
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase(f.directory))).toThrow(rejectedInput(file, /current source/));
    f.copy(file);
    f.put(evidence + "before/" + file, "forged");
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase(f.directory))).toThrow(rejectedInput(evidence + "before/" + file, /before source/));
    f.copy(evidence + "before/" + file);
    f.put("evidence/runtime/date-picker-visual-feedback-2026-10-13/source-bindings.json", "{}");
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase(f.directory))).toThrow(rejectedInput("evidence/runtime/date-picker-visual-feedback-2026-10-13/source-bindings.json", /original proof/));
    f.copy("evidence/runtime/date-picker-visual-feedback-2026-10-13/source-bindings.json");
    f.put(evidence + "parallel-observations/slider-source-bindings.json", "{}");
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase(f.directory))).toThrow(rejectedInput(evidence + "parallel-observations/slider-source-bindings.json", /frozen Slider observation/));
  } finally { rmSync(f.directory, { recursive: true }); }
}, 60_000);

it("does not let reconciliation change an owner or widen its three-field transition", () => {
  expect(proof.getDatePickerCloseoutSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try {
    expect(proof.getDatePickerCloseoutSourceBindings(f.directory, phase(f.directory)).kind).toBe("DatePickerCloseoutSourceBindings");
    f.record.reconciliation.sourceTransitions[0].finalOwner = "selectUnification";
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase(f.directory))).toThrow(rejectedInput(evidence + "source-bindings.json", /reconciliation|Slider closeout original proof changed/));
    f.record = JSON.parse(readFileSync(evidence + "source-bindings.json", "utf8"));
    f.copy(evidence + "source-bindings.json");
    expect(proof.getDatePickerCloseoutSourceBindings(f.directory, phase(f.directory)).kind).toBe("DatePickerCloseoutSourceBindings");
    f.record.reconciliation.phaseFields.humanGate = "accepted";
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    expect(() => proof.getDatePickerCloseoutSourceBindings(f.directory, phase(f.directory))).toThrow(rejectedInput(evidence + "source-bindings.json", /reconciliation|Slider closeout original proof changed/));
  } finally { rmSync(f.directory, { recursive: true }); }
}, 60_000);
