import { readFileSync } from "node:fs";

function copySliderCloseoutFixture(copy: (file: string) => void) {
  const directory = "evidence/runtime/slider-closeout-2026-10-13/";
  const baseline = JSON.parse(readFileSync(directory + "baseline.json", "utf8"));
  const supplemental = JSON.parse(readFileSync(directory + "supplemental-intake.json", "utf8"));
  const observationPath = directory + "retained-source-observation.json";
  const observation = JSON.parse(readFileSync(observationPath, "utf8"));
  const bindings = JSON.parse(readFileSync(directory + "source-bindings.json", "utf8"));
  const files = { ...baseline.files, ...supplemental.files, ...Object.fromEntries(Object.entries(bindings.sourceFiles).map(([file, binding]) => [file, (binding as any).before])) };
  const retained = { ...baseline.retainedEvidence, ...supplemental.retainedEvidence, ...observation.retainedEvidence };
  for (const file of new Set([directory + "baseline.json", directory + "supplemental-intake.json", directory + "source-bindings.json", ...Object.keys(files), ...Object.keys(baseline.protectedRuntime), ...Object.keys(retained)])) copy(file);
  for (const [file, before] of Object.entries({ ...files, ...baseline.protectedRuntime })) if (before !== null) copy(directory + "before/" + file);
  for (const file of Object.keys(retained)) copy(directory + "predecessor/" + file);
  for (const file of [observationPath, observation.file, observation.beforeSnapshot, observation.currentSnapshot, ...Object.values(observation.sourceLocks).map((lock: any) => lock.path)]) copy(file);
}

export function copyDatePickerCloseoutFixture(copy: (file: string) => void, currentSuccessors = true) {
  const directory = "evidence/runtime/date-picker-closeout-2026-10-13/";
  const baseline = JSON.parse(readFileSync(directory + "closure-baseline.json", "utf8"));
  for (const file of [directory + "closure-baseline.json", baseline.intake.path, directory + "source-bindings.json", ...Object.keys(baseline.files), ...Object.keys(baseline.retainedEvidence)]) copy(file);
  for (const [file, before] of Object.entries(baseline.files)) if (before !== null) copy(directory + "before/" + file);
  for (const file of Object.keys(baseline.retainedEvidence)) copy(directory + "predecessor/" + file);
  for (const file of [directory + "effective-before/status/current-phase.yaml", directory + "parallel-observations/slider-source-bindings.json", "scripts/date-picker-visual-feedback-governance.test.ts", "scripts/slider-refinement-governance.test.ts", "evidence/runtime/date-picker-visual-feedback-2026-10-13/color-consumers.json"]) copy(file);
  if (currentSuccessors) copySliderCloseoutFixture(copy);
}

export function copySelectUnificationFixture(copy: (file: string) => void, currentSuccessors = true) {
  const directory = "evidence/runtime/select-unification-2026-10-13/";
  const baseline = JSON.parse(readFileSync(directory + "closure-baseline.json", "utf8"));
  for (const file of [directory + "closure-baseline.json", baseline.intake.path, directory + "source-bindings.json", ...Object.keys(baseline.files)]) copy(file);
  for (const [file, before] of Object.entries(baseline.files)) if (before !== null) copy(directory + "before/" + file);
  if (currentSuccessors) copyDatePickerCloseoutFixture(copy);
}
