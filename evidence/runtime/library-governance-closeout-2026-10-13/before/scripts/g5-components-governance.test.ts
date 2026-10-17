import { copySelectUnificationFixture } from "./select-unification-test-fixture";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { getG4PageAcceptanceBindings, getG4SizingReviewSourceBindings, getG4SourceBindings, getG4VisualRefinementSourceBindings, hasG5ComponentsAuthorization, parseYamlSubset, validateG4SourceDirectives, dateTimeOptimizationEvidence, dateTimeOptimizationSourcePaths, datePickerUxRefinementEvidence, datePickerUxRefinementSourcePaths, sliderRefinementEvidence, sliderRefinementSourcePaths } from "./verification-helpers.mjs";
import { verifyG5Components } from "./verify-g5-components.mjs";
const phase = () => parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
const g4Readers = [getG4PageAcceptanceBindings, getG4SizingReviewSourceBindings, getG4VisualRefinementSourceBindings, getG4SourceBindings];
const g5Evidence = "evidence/runtime/g5-components-2026-10-12/";
const sha = (bytes: Buffer | string) => createHash("sha256").update(bytes).digest("hex");
function successorFixture() {
  const directory = mkdtempSync(join(tmpdir(), "rain-g5-g4-successor-"));
  const record = JSON.parse(readFileSync(g5Evidence + "source-bindings.json", "utf8"));
  const protectedFiles = JSON.parse(readFileSync(g5Evidence + "protected-source-sha256.json", "utf8"));
  const copy = (file: string, bytes = readFileSync(file)) => { const target = join(directory, file); mkdirSync(dirname(target), { recursive: true }); writeFileSync(target, bytes); };
  for (const file of new Set([...Object.keys(record.sourceFiles), ...Object.keys(protectedFiles), ...["baseline.json", "protected-source-sha256.json", "source-bindings.json", "before/current-phase.yaml", "before/scripts/verification-helpers.mjs", "before/scripts/g4-page-acceptance.test.ts"].map(file => g5Evidence + file)])) copy(file);
  for (const name of ["g4-components-2026-10-11", "g4-visual-refinement-2026-10-11", "g4-review-sizing-2026-10-11", "g4-pages-acceptance-2026-10-12"]) {
    const previous = "evidence/runtime/" + name + "/";
    const baseline = JSON.parse(readFileSync(previous + "baseline.json", "utf8"));
    const bindings = JSON.parse(readFileSync(previous + "source-bindings.json", "utf8"));
    const retained = Object.keys(bindings.retainedRecords ?? {});
    for (const file of new Set([previous + "baseline.json", previous + "source-bindings.json", ...Object.keys(baseline.files), ...Object.keys(bindings.sourceFiles), ...retained])) copy(file);
    const beforeFiles = [...Object.entries(baseline.files).filter(([, hash]) => hash !== null).map(([file]) => file),
      ...Object.entries(bindings.sourceFiles).filter(([, binding]) => (binding as any).before !== null).map(([file]) => file), ...retained];
    for (const file of new Set(beforeFiles)) copy(previous + "before/" + file);
    if (bindings.decision) copy(bindings.decision.evidence);
  }
  for (const file of ["tests/e2e/g4-components.config.ts", "tests/e2e/g4-components.spec.ts"]) copy("evidence/runtime/g4-visual-refinement-2026-10-11/predecessor/" + file);
  if (phase().componentRefinements.dateTimeOptimization) {
    const baseline = JSON.parse(readFileSync(dateTimeOptimizationEvidence + "baseline.json", "utf8"));
    for (const file of [dateTimeOptimizationEvidence + "baseline.json", dateTimeOptimizationEvidence + "source-bindings.json", ...dateTimeOptimizationSourcePaths.filter(file => existsSync(file))]) copy(file);
    for (const [file, hash] of Object.entries(baseline.files)) if (hash !== null) { copy(file); copy(dateTimeOptimizationEvidence + "before/" + file); }
    for (const file of Object.keys(baseline.retainedEvidence)) copy(file);
  }
  if (phase().componentRefinements.dateTimeOptimization?.uxRefinement) {
    const baseline = JSON.parse(readFileSync(datePickerUxRefinementEvidence + "baseline.json", "utf8"));
    for (const file of [datePickerUxRefinementEvidence + "baseline.json", datePickerUxRefinementEvidence + "source-bindings.json", ...datePickerUxRefinementSourcePaths.filter(file => existsSync(file))]) copy(file);
    for (const [file, hash] of Object.entries(baseline.files)) if (hash !== null) copy(datePickerUxRefinementEvidence + "before/" + file);
    for (const file of Object.keys(baseline.retainedEvidence)) copy(file);
  }
  if (phase().componentRefinements.sliderRefinement) {
    const baseline = JSON.parse(readFileSync(sliderRefinementEvidence + "baseline.json", "utf8"));
    copy(baseline.initialBaseline.path);
    const initial = JSON.parse(readFileSync(baseline.initialBaseline.path, "utf8"));
    for (const file of Object.keys(initial.files)) copy(sliderRefinementEvidence + "before-initial/" + file);
    for (const file of [sliderRefinementEvidence + "baseline.json", sliderRefinementEvidence + "source-bindings.json", ...sliderRefinementSourcePaths.filter(file => existsSync(file))]) copy(file);
    for (const file of Object.keys(baseline.files)) copy(sliderRefinementEvidence + "before/" + file);
    for (const file of Object.keys(baseline.retainedEvidence)) copy(file);
  }
  if (phase().componentRefinements.datePickerVisualFeedback) {
    const visual = "evidence/runtime/date-picker-visual-feedback-2026-10-13/";
    const baseline = JSON.parse(readFileSync(visual + "closure-baseline.json", "utf8"));
    for (const file of [visual + "closure-baseline.json", baseline.intake.path, visual + "source-bindings.json", ...Object.keys(baseline.retainedEvidence), ...Object.keys(baseline.files).filter(file => existsSync(file))]) copy(file);
    for (const [file, before] of Object.entries(baseline.files)) if (before !== null) copy(visual + "before/" + file);
  }
  copySelectUnificationFixture(copy);
  return { directory, record, copy };
}
describe("G5 finite authorized implementation", () => {
  it("retains the exact approved scope and does not transfer gates", () => {
    expect(hasG5ComponentsAuthorization(phase())).toBe(true);
    for (const [key, value] of [["scope", "all-ui"], ["humanGate", "accepted"], ["contrastAcceptance", "accepted"], ["publication", "published"], ["gitOperations", "authorized"], ["extraSource", "unrelated.tsx"]] as const) {
      const current = phase(); current.componentRefinements.g5Components[key] = value;
      expect(hasG5ComponentsAuthorization(current), key).toBe(false);
    }
  });
  it("requires scoped verification and independent review before completion", () => {
    const current = phase(), entry = current.componentRefinements.g5Components;
    Object.assign(entry, { implementation: "completed", automatedVerification: "not-run", independentReview: "not-run" });
    expect(hasG5ComponentsAuthorization(current)).toBe(false);
    Object.assign(entry, { automatedVerification: "passed-scoped", independentReview: "passed-scoped" });
    expect(hasG5ComponentsAuthorization(current)).toBe(true);
  });
  it("allows only the single authorized G5 page scan alongside the preserved G4 sources", () => {
    const current = phase(), source = readFileSync("apps/playground/src/styles.css", "utf8");
    const directive = '@source "./docs/components/g5-component-pages.tsx";';
    expect(validateG4SourceDirectives(source, current)).toEqual([]);
    expect(validateG4SourceDirectives(source + '\n/* @source "./docs/components"; */', current)).toEqual([]);
    const g4Only = structuredClone(current); delete g4Only.componentRefinements.g5Components;
    expect(validateG4SourceDirectives(source, g4Only)).not.toEqual([]);
    expect(validateG4SourceDirectives(source.replace(directive + "\n", ""), g4Only)).toEqual([]);
    const invalidG5 = structuredClone(current); invalidG5.componentRefinements.g5Components.scope = "all-ui";
    expect(validateG4SourceDirectives(source, invalidG5)).not.toEqual([]);
    for (const changed of [
      source + "\n" + directive,
      source + '\n@source "./docs/components/unrelated-page.tsx";',
      source.replace(directive, '@source "./docs/components";'),
      source.replace('@source not "./docs/components";', ""),
      source + '\n  @source "./docs/components";',
      source.replace(directive, `${directive} ${directive}`),
    ]) {
      expect(validateG4SourceDirectives(changed, current)).not.toEqual([]);
    }
  });
  it("verifies actual bindings, existing sources, fixed dependencies, exports and token consumers", () => {
    const result = verifyG5Components();
    expect(result.assets).toBe(5); expect(result.capabilities).toBe(8);
    expect(result.humanGate).toBe("awaiting_human"); expect(result.contrastAcceptance).toBe("not-granted");
  }, 60_000);
  it("preserves the accepted G4 proof through the verified finite G5 successor", () => {
    const current = phase();
    for (const read of g4Readers) expect(() => read(process.cwd(), current), read.name).not.toThrow();
    expect(sha(readFileSync("evidence/runtime/g4-pages-acceptance-2026-10-12/source-bindings.json"))).toBe("b53c1d91276a740cc6389a9b08319c36eec4291c0a0a1ee00fbcf28a3326ec56");
    expect(sha(readFileSync("evidence/runtime/g4-pages-acceptance-2026-10-12/acceptance.json"))).toBe("5377a2153b4a663d9883131571d9846fe10f588a1daacb35523e1b58fa5c011e");
  }, 20_000);
  it("does not strip unauthorized G5 permissions or altered earlier Gates", () => {
    const invalidG5 = phase(); invalidG5.componentRefinements.g5Components.humanGate = "accepted";
    const changedGate = phase(); changedGate.componentRefinements.tokenFirstV12.humanGate = "not-recorded";
    for (const read of g4Readers) {
      expect(() => read(process.cwd(), invalidG5), read.name).toThrow(/G5 requires/);
      expect(() => read(process.cwd(), changedGate), read.name).toThrow(/G5 must preserve|Date-time optimization must preserve|DatePicker UX must preserve|Slider must preserve|DatePicker visual must preserve|Select unification must preserve|DatePicker closeout must preserve|Slider closeout must preserve/);
    }
  });
  it("rejects changed G5 source before allowing any G4 predecessor substitution", () => {
    const { directory, copy } = successorFixture();
    try {
      for (const read of g4Readers) expect(() => read(directory, phase()), read.name).not.toThrow();
      const file = "packages/ui/src/combobox/combobox.tsx"; copy(file, Buffer.concat([readFileSync(file), Buffer.from("\n")]));
      for (const read of g4Readers) expect(() => read(directory, phase()), read.name).toThrow(/G5 current source changed|Date-time changed an unrelated source/);
    } finally { rmSync(directory, { recursive: true }); }
  }, 20_000);
  it("cannot re-sign the frozen G4 test snapshot through the G5 inventory", () => {
    const { directory, record, copy } = successorFixture();
    try {
      for (const read of g4Readers) expect(() => read(directory, phase()), read.name).not.toThrow();
      const file = g5Evidence + "before/scripts/g4-page-acceptance.test.ts", changed = Buffer.concat([readFileSync(file), Buffer.from("\n")]);
      copy(file, changed); record.sourceFiles[file] = sha(changed);
      copy(g5Evidence + "source-bindings.json", Buffer.from(JSON.stringify(record)));
      for (const read of g4Readers) expect(() => read(directory, phase()), read.name).toThrow(/G5 must retain the frozen G4 acceptance snapshot|Date-time historical evidence changed|Date-time changed an unrelated source|Slider historical evidence changed|DatePicker visual predecessor evidence changed|Slider closeout original proof changed/);
    } finally { rmSync(directory, { recursive: true }); }
  }, 20_000);
});
