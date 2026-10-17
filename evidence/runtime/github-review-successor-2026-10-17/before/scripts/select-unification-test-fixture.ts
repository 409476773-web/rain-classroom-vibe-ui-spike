import { dirname, join, relative } from "node:path";
import { constants, cpSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { closeoutBindingsPath, closeoutEvidence } from "./g1-g6-closeout-governance.mjs";

function copyG1G6CloseoutFixture(copy: (file: string) => void, root = process.cwd()) {
  if (!existsSync(join(root, closeoutBindingsPath))) return;
  const record = JSON.parse(readFileSync(join(root, closeoutBindingsPath), "utf8"));
  const files = new Set<string>([
    closeoutBindingsPath, "scripts/g1-g6-closeout-governance.mjs",
    ...Object.keys(record.retainedFiles), ...Object.keys(record.sourceFiles),
    ...Object.keys(record.projectedFiles).map(file => closeoutEvidence + "predecessor/" + file),
    ...Object.keys(record.questionnaireFiles).map(file => closeoutEvidence + "questionnaire-predecessor/" + file),
    ...Object.values(record.sourceFiles).map((binding: any) => binding.beforeSnapshot).filter(Boolean),
  ]);
  for (const file of files) copy(file);
}

function copyG6GovernanceFixture(copy: (file: string) => void) {
  const directory = "evidence/runtime/g6-components-2026-10-14/";
  if (!existsSync(directory + "source-bindings.json")) return;
  const baseline = JSON.parse(readFileSync(directory + "baseline.json", "utf8"));
  const observationPath = directory + "concurrent-source-observation.json";
  if (existsSync(observationPath)) {
    copy(observationPath);
    for (const file of ["scripts/rn14-starter.mjs", "scripts/rn14-starter.test.ts"])
      copy(directory + "concurrent/before/" + file);
  }
  copy(directory + "test-fixture-supplement.json");
  copy(directory + "before/scripts/verify-tailwind-b2.test.ts");
  copy(directory + "concurrent-document-observation.json");
  copy(directory + "concurrent-document/before/docs/ai/rain-designer-integration.md");
  for (const file of [directory + "baseline.json", directory + "source-bindings.json", directory + "source-lock.json",
    ...Object.keys(baseline.protectedSources), ...Object.keys(baseline.retainedEvidence),
    ...Object.keys(baseline.files).filter(file => existsSync(file)),
    ...Object.entries(baseline.files).filter(([, hash]) => hash !== null).map(([file]) => directory + "before/" + file)]) copy(file);
}

function copyLibraryGovernanceCloseoutFixture(copy: (file: string) => void) {
  const directory = "evidence/runtime/library-governance-closeout-2026-10-13/";
  if (!existsSync(directory + "source-bindings.json")) return;
  const baseline = JSON.parse(readFileSync(directory + "baseline.json", "utf8"));
  const supplemental = JSON.parse(readFileSync(directory + "supplemental-intake.json", "utf8"));
  const additionalPath = directory + "additional-source-intake.json", additional = JSON.parse(readFileSync(additionalPath, "utf8"));
  copy(additionalPath);
  const regressionPath = directory + "regression-source-intake.json", regression = JSON.parse(readFileSync(regressionPath, "utf8"));
  copy(regressionPath);
  const fixturePath = directory + "fixture-source-intake.json", fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
  copy(fixturePath);
  const historicalFixturePath = directory + "historical-fixture-source-intake.json", historicalFixture = JSON.parse(readFileSync(historicalFixturePath, "utf8"));
  copy(historicalFixturePath);
  const record = JSON.parse(readFileSync(directory + "source-bindings.json", "utf8"));
  const observationPath = directory + "concurrent-document-observation.json";
  copy(observationPath);
  const observation = JSON.parse(readFileSync(observationPath, "utf8"));
  for (const file of Object.keys(observation.ownerRecords)) copy(file);
  for (const [file, binding] of Object.entries(observation.sourceFiles)) { copy(file); copy((binding as any).beforeSnapshot); }
  const documentationSuccessorPath = directory + "concurrent-document-observation-02.json";
  copy(documentationSuccessorPath);
  const documentationSuccessor = JSON.parse(readFileSync(documentationSuccessorPath, "utf8"));
  for (const file of Object.keys(documentationSuccessor.ownerRecords)) copy(file);
  for (const [file, binding] of Object.entries(documentationSuccessor.sourceFiles)) { copy(file); copy((binding as any).beforeSnapshot); }
  const paints = directory + "paint-observations.json";
  if (existsSync(paints)) {
    copy(paints);
    const observations = JSON.parse(readFileSync(paints, "utf8"));
    [...observations.localSources, ...observations.inlineSources].forEach(file => copy(file.filePath));
  }
  for (const file of [directory + "baseline.json", directory + "supplemental-intake.json", directory + "source-bindings.json", ...Object.keys(baseline.protectedSources), ...Object.keys(baseline.retainedProofs), baseline.phase.path,
    ...Object.entries(record.sourceFiles).filter(([, binding]) => (binding as any).after !== null).map(([file]) => file)]) copy(file);
  for (const file of [...Object.entries({ ...baseline.files, ...supplemental.files, ...additional.files, ...regression.files, ...fixture.files, ...historicalFixture.files }).filter(([, before]) => before !== null).map(([file]) => file), ...Object.keys(baseline.protectedSources), ...Object.keys(baseline.retainedProofs), baseline.phase.path]) copy(directory + "before/" + file);
  copyG6GovernanceFixture(copy);
}

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
  copyLibraryGovernanceCloseoutFixture(copy);
}

export function copyDatePickerCloseoutFixture(copy: (file: string) => void, currentSuccessors = true, closeoutSuccessor = true) {
  const directory = "evidence/runtime/date-picker-closeout-2026-10-13/";
  const baseline = JSON.parse(readFileSync(directory + "closure-baseline.json", "utf8"));
  for (const file of [directory + "closure-baseline.json", baseline.intake.path, directory + "source-bindings.json", ...Object.keys(baseline.files), ...Object.keys(baseline.retainedEvidence)]) copy(file);
  for (const [file, before] of Object.entries(baseline.files)) if (before !== null) copy(directory + "before/" + file);
  for (const file of Object.keys(baseline.retainedEvidence)) copy(directory + "predecessor/" + file);
  for (const file of [directory + "effective-before/status/current-phase.yaml", directory + "parallel-observations/slider-source-bindings.json", "scripts/date-picker-visual-feedback-governance.test.ts", "scripts/slider-refinement-governance.test.ts", "evidence/runtime/date-picker-visual-feedback-2026-10-13/color-consumers.json"]) copy(file);
  if (currentSuccessors) copySliderCloseoutFixture(copy);
  if (currentSuccessors && closeoutSuccessor) copyG1G6CloseoutFixture(copy);
}

export function copySelectUnificationFixture(copy: (file: string) => void, currentSuccessors = true) {
  const directory = "evidence/runtime/select-unification-2026-10-13/";
  const baseline = JSON.parse(readFileSync(directory + "closure-baseline.json", "utf8"));
  for (const file of [directory + "closure-baseline.json", baseline.intake.path, directory + "source-bindings.json", ...Object.keys(baseline.files)]) copy(file);
  for (const [file, before] of Object.entries(baseline.files)) if (before !== null) copy(directory + "before/" + file);
  if (currentSuccessors) copyDatePickerCloseoutFixture(copy);
}

const navigationFixtureInputs = [
  "evidence/runtime/navigation-rebuild-v03/final-source-lock.json",
  "evidence/runtime/navigation-v042/w7/final-source.json", "evidence/runtime/navigation-v042/w7/regression-map.json",
  ...["final-source.json", "README.md", "review-summary.json"].map(file => "evidence/runtime/navigation-v042/w6/review-02/" + file),
  "evidence/runtime/navigation-v042/contrast-human-review-2026-10-05/acceptance.json",
  "evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-05/g1-current-color-consumers.json",
  ...["navigation-color-consumers.json", "navigation-color-consumers-source.json"].map(file => "evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/" + file),
];
export function currentGovernanceFixtureSource(root: string, source: string) {
  const path = relative(root, source).replaceAll("\\", "/");
  if (path.split("/").some(part => [".vite", "coverage", "node_modules", "playwright-report", "test-results"].includes(part)) || path === "artifacts") return false;
  if (/^apps\/[^/]+\/dist(?:-|\/|$)/.test(path)) return false;
  if (/^evidence\/runtime\/(?:navigation-v042|navigation-rebuild-v03)(?:\/|$)/.test(path)) return navigationFixtureInputs.some(file => file === path || file.startsWith(path + "/"));
  const own = "evidence/runtime/library-governance-closeout-2026-10-13/";
  if (path.startsWith(own)) return path.startsWith(own + "before") || path.endsWith(".json") && !/results|summary|profile|check/.test(path.slice(own.length));
  return true;
}

export function copyCurrentGovernanceFixture(root: string, target: string, closeoutSuccessor = true) {
  cpSync(root, target, { recursive: true, mode: constants.COPYFILE_FICLONE, filter: source => {
    const file = relative(root, source).replaceAll("\\", "/");
    const currentCloseout = "evidence/runtime/g1-g6-closeout-2026-10-17/run-01";
    // The exact binding closure below supplies every required current proof.
    // Growing run logs, browser output and repair backups are not fixture inputs.
    if (file === currentCloseout || file.startsWith(currentCloseout + "/")) return false;
    if (!closeoutSuccessor && file === "scripts/g1-g6-closeout-governance.mjs") return false;
    return currentGovernanceFixtureSource(root, source);
  } });
  // The generic historical filter omits reports such as checks.json. A current
  // successor may depend on their immutable bytes; copy only its exact inventory.
  if (closeoutSuccessor) copyG1G6CloseoutFixture(file => {
    const destination = join(target, file);
    mkdirSync(dirname(destination), { recursive: true });
    cpSync(join(root, file), destination, { mode: constants.COPYFILE_FICLONE });
  }, root);
}
