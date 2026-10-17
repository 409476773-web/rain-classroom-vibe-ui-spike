import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import { getG5ColorConsumers, measureG5StateContrast } from "./g5-color-consumers.mjs";

const proof = helpers as any, evidence = "evidence/runtime/slider-refinement-2026-10-13/";
const phase = () => proof.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8"));
function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "rain-slider-refinement-"));
  const baseline = JSON.parse(readFileSync(evidence + "baseline.json", "utf8"));
  const put = (file: string, bytes: Buffer | string) => { mkdirSync(dirname(join(directory, file)), { recursive: true }); writeFileSync(join(directory, file), bytes); };
  const copy = (file: string) => put(file, readFileSync(file));
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
  return { directory, put, record: JSON.parse(readFileSync(evidence + "source-bindings.json", "utf8")) };
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
});

it("rejects extra paths and current or frozen source edits", () => {
  expect(proof.getSliderRefinementSourceBindings).toBeTypeOf("function");
  const f = fixture();
  try {
    f.record.sourceFiles["packages/ui/src/button/button.tsx"] = { before: null, after: "unrelated" };
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    expect(() => proof.getSliderRefinementSourceBindings(f.directory, phase())).toThrow(/exact finite source paths/);
    delete f.record.sourceFiles["packages/ui/src/button/button.tsx"];
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    const file = "packages/ui/src/slider/slider.css";
    f.put(file, readFileSync(file, "utf8") + "\n");
    expect(() => proof.getSliderRefinementSourceBindings(f.directory, phase())).toThrow(/Slider current source changed/);
    f.put(file, readFileSync(file));
    f.put(evidence + "before/" + file, "changed");
    expect(() => proof.getSliderRefinementSourceBindings(f.directory, phase())).toThrow(/Slider before source changed/);
    f.put(evidence + "before/" + file, readFileSync(evidence + "before/" + file));
    f.put(evidence + "before-initial/" + file, "changed");
    expect(() => proof.getSliderRefinementSourceBindings(f.directory, phase())).toThrow(/original intake source changed/);
  } finally { rmSync(f.directory, { recursive: true }); }
});

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
  expect(states.every((row: any) => row.actual >= row.minimum)).toBe(true);
  const f = fixture();
  try {
    current.colorCssConsumers[0].use.alpha = 0.5;
    const bytes = JSON.stringify(current);
    f.put(evidence + "color-consumers.json", bytes);
    f.record.sourceFiles[evidence + "color-consumers.json"].after = createHash("sha256").update(bytes).digest("hex");
    f.put(evidence + "source-bindings.json", JSON.stringify(f.record));
    const valid = proof.getSliderRefinementSourceBindings(f.directory, phase());
    expect(valid.kind).toBe("SliderRefinementSourceBindings");
    expect(() => getG5ColorConsumers(f.directory)).toThrow(/Slider colors/);
  } finally { rmSync(f.directory, { recursive: true }); }
});
