import { copyDatePickerCloseoutFixture, copySelectUnificationFixture } from "./select-unification-test-fixture";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import { getG5ColorConsumers, measureG5StateContrast } from "./g5-color-consumers.mjs";
import * as sliderColors from "./g5-color-consumers.mjs";

// The sealed predecessor can reject the exact changed input before Slider reads it.
function rejectedInput(file: string, original: RegExp) {
  const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixes = ["Source outside Drawer scope changed; concurrent work remains unaccepted: ", "Drawer cannot change original G6 or older evidence: "];
  return new RegExp([original.source, ...prefixes.map(prefix => escape(prefix + file) + "(?:\\n|$)")].join("|"));
}

const proof = helpers as any, evidence = "evidence/runtime/slider-refinement-2026-10-13/";
const phase = (root = process.cwd()) => proof.parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8"));

it("limits the bluer resting alpha recipe to its two declared Slider paints", () => {
  const check = (sliderColors as any).isSliderRestingAlpha;
  expect(check).toBeTypeOf("function");
  const ledger = JSON.parse(readFileSync(evidence + "color-consumers.json", "utf8"));
  for (const selector of [".rain-slider__range", ".rain-slider__thumb"]) {
    const row = structuredClone(ledger.colorCssConsumers.find((row: any) => row.selector === selector));
    expect(check(row)).toBe(true);
    for (const changed of [{ ...row, selector: ".rain-slider__track" }, { ...row, filePath: "other.css" },
      { ...row, value: row.value.replace("55%", "65%") }, { ...row, use: { ...row.use, alpha: 65 } },
      { ...row, use: { ...row.use, alphaOperation: "apply" } }, { ...row, use: { ...row.use, tokenId: "Fill/Brand/Alpha/2" } }]) expect(check(changed)).toBe(false);
  }
});
function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "rain-slider-refinement-"));
  const baseline = JSON.parse(readFileSync(evidence + "baseline.json", "utf8"));
  const put = (file: string, bytes: Buffer | string) => { mkdirSync(dirname(join(directory, file)), { recursive: true }); writeFileSync(join(directory, file), bytes); };
  const view = "evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/";
  const projected = JSON.parse(readFileSync(view + "source-bindings.json", "utf8")).projectedFiles;
  const copy = (file: string) => {
    const bytes = readFileSync(projected[file] ? view + "predecessor/" + file : file);
    if (projected[file]) expect(createHash("sha256").update(bytes).digest("hex"), file).toBe(projected[file]);
    put(file, bytes);
  };
  copy(baseline.initialBaseline.path);
  const initial = JSON.parse(readFileSync(baseline.initialBaseline.path, "utf8"));
  for (const file of Object.keys(initial.files)) copy(evidence + "before-initial/" + file);
  for (const file of [evidence + "baseline.json", evidence + "source-bindings.json", ...proof.sliderRefinementSourcePaths.filter((file: string) => existsSync(file))]) copy(file);
  for (const file of Object.keys(baseline.files)) copy(evidence + "before/" + file);
  for (const file of Object.keys(baseline.retainedEvidence)) copy(file);
  for (const previous of ["date-time-optimization-2026-10-12", "date-picker-ux-refinement-2026-10-12"]) {
    const directory = "evidence/runtime/" + previous + "/";
    const parent = JSON.parse(readFileSync(directory + "baseline.json", "utf8"));
    const bindings = JSON.parse(readFileSync(directory + "source-bindings.json", "utf8"));
    for (const file of Object.keys(bindings.sourceFiles)) copy(file);
    for (const [file, hash] of Object.entries(parent.files)) if (hash !== null) { copy(file); copy(directory + "before/" + file); }
    for (const file of Object.keys(parent.retainedEvidence)) copy(file);
  }
  if (phase().componentRefinements.datePickerVisualFeedback) {
    const visual = "evidence/runtime/date-picker-visual-feedback-2026-10-13/";
    const baseline = JSON.parse(readFileSync(visual + "closure-baseline.json", "utf8"));
    for (const file of [visual + "closure-baseline.json", baseline.intake.path, visual + "source-bindings.json", ...Object.keys(baseline.retainedEvidence), ...Object.keys(baseline.files).filter(file => existsSync(file))]) copy(file);
    for (const [file, before] of Object.entries(baseline.files)) if (before !== null) copy(visual + "before/" + file);
  }
  copySelectUnificationFixture(copy, false);
  copyDatePickerCloseoutFixture(copy, true, false);
  for (const file of Object.keys(projected)) copy(file);
  return { directory, put, copy, record: JSON.parse(readFileSync(join(directory, evidence + "source-bindings.json"), "utf8")) };
}

it("requires the exact slider scope and keeps implementation approval separate from acceptance", () => {
  expect(proof.hasSliderRefinementAuthorization).toBeTypeOf("function");
  expect(proof.hasSliderRefinementAuthorization(phase())).toBe(true);
  for (const [key, value] of [["scope", "all-ui"], ["humanGate", "accepted"], ["publication", "published"], ["extra", true]]) {
    const changed = phase(); changed.componentRefinements.sliderRefinement[key as string] = value;
    expect(proof.hasSliderRefinementAuthorization(changed)).toBe(false);
  }
  const changed = phase();
  Object.assign(changed.componentRefinements.sliderRefinement, { implementation: "completed", automatedVerification: "not-run", independentReview: "not-run" });
  expect(proof.hasSliderRefinementAuthorization(changed)).toBe(false);
});

it("validates the current source successor and retains both date batches", () => {
  expect(proof.getSliderRefinementSourceBindings).toBeTypeOf("function");
  expect(proof.getSliderRefinementSourceBindings(process.cwd(), phase()).scope).toBe(phase().componentRefinements.sliderRefinement.scope);
  expect(proof.getG5SourceBindings(process.cwd(), phase()).kind).toBe("G5ComponentSourceBindings");
}, 60_000);

it("rejects extra paths and current or frozen source edits", () => {
  expect(proof.getSliderRefinementSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try {
    const originalPhase = phase(f.directory);
    expect(proof.getSliderRefinementSourceBindings(f.directory, originalPhase).kind).toBe("SliderRefinementSourceBindings");
    f.record.sourceFiles["packages/ui/src/button/button.tsx"] = { before: null, after: "unrelated" };
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    expect(() => proof.getSliderRefinementSourceBindings(f.directory, originalPhase)).toThrow(/exact finite source paths|Slider closeout original proof changed/);
    delete f.record.sourceFiles["packages/ui/src/button/button.tsx"];
    f.copy(evidence + "source-bindings.json");
    const file = "packages/ui/src/slider/slider.css";
    f.put(file, readFileSync(join(f.directory, file), "utf8") + "\n");
    expect(() => proof.getSliderRefinementSourceBindings(f.directory, originalPhase)).toThrow(rejectedInput(file, /Slider current source changed|Slider closeout accepted visual source changed/));
    f.copy(file);
    f.put(evidence + "before/" + file, "changed");
    expect(() => proof.getSliderRefinementSourceBindings(f.directory, originalPhase)).toThrow(rejectedInput(evidence + "before/" + file, /Slider before source changed/));
    f.copy(evidence + "before/" + file);
    f.put(evidence + "before-initial/" + file, "changed");
    expect(() => proof.getSliderRefinementSourceBindings(f.directory, originalPhase)).toThrow(rejectedInput(evidence + "before-initial/" + file, /original intake source changed/));
  } finally { rmSync(f.directory, { recursive: true }); }
}, 60_000);

it("binds only this slider's colors and rejects acceptance or alpha mutations", () => {
  expect(proof.getSliderRefinementSourceBindings).toBeTypeOf("function");
  const ledger = getG5ColorConsumers();
  const current = JSON.parse(readFileSync(evidence + "color-consumers.json", "utf8"));
  const paths = Object.keys(current.sourceFiles);
  expect(paths).toEqual(["packages/ui/src/slider/slider.css", "apps/playground/src/docs/components/slider-examples.css"]);
  expect(ledger.colorCssConsumers.filter((row: any) => paths.includes(row.filePath))).toEqual(current.colorCssConsumers);
  expect(current.humanGate).toBe("awaiting_human");
  expect(current.contrastAcceptance).toBe("not-granted");
  expect(current.colorCssConsumers.every((row: any) => row.use.evidenceRef === "docs/plans/2026-10-13-slider-refinement.md" && row.contrastReview === "pending-review")).toBe(true);
  const states = measureG5StateContrast(ledger).filter((row: any) => paths.includes(row.filePath));
  expect(states.length).toBeGreaterThan(0);
  expect(states.filter((row: any) => row.selector !== ".rain-slider__thumb").every((row: any) => row.actual >= row.minimum)).toBe(true);
  const restingBoundary = states.filter((row: any) => row.selector === ".rain-slider__thumb");
  expect(restingBoundary).toHaveLength(6);
  expect(restingBoundary.every((row: any) => row.minimum === 3 && row.acceptedException === false)).toBe(true);
  expect(restingBoundary.some((row: any) => row.actual < row.minimum)).toBe(true);
  const f = fixture();
  try {
    const originalPhase = phase(f.directory);
    expect(proof.getSliderRefinementSourceBindings(f.directory, originalPhase).kind).toBe("SliderRefinementSourceBindings");
    current.colorCssConsumers[0].use.alpha = 0.5;
    const bytes = JSON.stringify(current);
    f.put(evidence + "color-consumers.json", bytes);
    f.record.sourceFiles[evidence + "color-consumers.json"].after = createHash("sha256").update(bytes).digest("hex");
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    expect(() => proof.getSliderRefinementSourceBindings(f.directory, originalPhase)).toThrow(/Slider closeout original proof changed/);
    expect(() => getG5ColorConsumers(f.directory)).toThrow(/Slider closeout original proof changed/);
  } finally { rmSync(f.directory, { recursive: true }); }
}, 60_000);
