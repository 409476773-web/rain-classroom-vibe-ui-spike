import { readFileSync } from "node:fs";

export function copySelectUnificationFixture(copy: (file: string) => void) {
  const directory = "evidence/runtime/select-unification-2026-10-13/";
  const baseline = JSON.parse(readFileSync(directory + "closure-baseline.json", "utf8"));
  for (const file of [directory + "closure-baseline.json", baseline.intake.path, directory + "source-bindings.json", ...Object.keys(baseline.files)]) copy(file);
  for (const [file, before] of Object.entries(baseline.files)) if (before !== null) copy(directory + "before/" + file);
}
