import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { parseYamlSubset } from "./verification-helpers.mjs";
import { buildReuseBindings, editableFiles, expectedSharedCss, newFiles, prepareQuestionnaireReuseColors, readReuseBaseline, registryFileClosure,
  reuseBindingsPath, reuseColorReport, reuseEvidence, validateRegistryClosure, validateReuseContracts, validateReusePhase,
  verifyReuseBindings } from "./questionnaire-reuse-governance.mjs";

const root = process.cwd();
const read = (file: string) => readFileSync(path.join(root, file), "utf8");
let fixture: string;
const currentPhase = () => parseYamlSubset(read("status/current-phase.yaml")) as any;
const previousPhase = () => parseYamlSubset(read(`${reuseEvidence}/baseline/status/current-phase.yaml`));

function withChanged(file: string, change: (value: string) => string, check: () => void) {
  const target = path.join(fixture, file), original = readFileSync(target, "utf8");
  try { writeFileSync(target, change(original)); check(); } finally { writeFileSync(target, original); }
}

beforeAll(() => {
  fixture = mkdtempSync(path.join(os.tmpdir(), "rain-questionnaire-reuse-"));
  const baseline = JSON.parse(read(`${reuseEvidence}/baseline-files.json`));
  const retained = JSON.parse(read(`${reuseEvidence}/retained-files.json`));
  const files = new Set<string>([
    ...baseline.files.map((file: { path: string }) => file.path), ...Object.keys(retained.files),
    ...editableFiles, ...newFiles, reuseBindingsPath, `${reuseEvidence}/baseline-files.json`,
    `${reuseEvidence}/retained-files.json`, `${reuseEvidence}/baseline-governance.log`,
  ]);
  for (const [registry, item] of [["g6-assets", "questionnaire"], ["radio", "radio"], ["checkbox", "checkbox"], ["selection-cards", undefined], ["dropdown-family", "dropdown-menu"]]) {
    for (const file of registryFileClosure(root, `registry/${registry}.json`, item)) files.add(file);
  }
  for (const file of files) {
    // Missing new artifacts should fail the full build/verification assertions below.
    if (!existsSync(path.join(root, file))) continue;
    mkdirSync(path.dirname(path.join(fixture, file)), { recursive: true });
    cpSync(path.join(root, file), path.join(fixture, file));
  }
  cpSync(path.join(root, reuseEvidence, "baseline"), path.join(fixture, reuseEvidence, "baseline"), { recursive: true });
});
afterAll(() => rmSync(fixture, { recursive: true, force: true }));

describe("Questionnaire control reuse finite successor", () => {
  it("retains observed failures and binds only this scope without promoting old acceptance", () => {
    const record = verifyReuseBindings(fixture);
    expect(record.predecessor).toMatchObject({ status: "observed-baseline-with-unrelated-failures", failedTests: 22, passedTests: 26 });
    expect(Object.keys(record.sourceFiles).sort()).toEqual([...editableFiles, ...newFiles].sort());
    expect(record.sourceFiles["packages/ui/src/input/input.tsx"]).toBeUndefined();
  });

  it("rejects source, binding, before-snapshot and baseline-log tampering", () => {
    for (const file of [
      "packages/ui/src/questionnaire/questionnaire.tsx",
      `${reuseEvidence}/baseline/packages/ui/src/questionnaire/questionnaire.tsx`,
      `${reuseEvidence}/baseline-governance.log`,
    ]) withChanged(file, value => `${value}\n// mutation`, () => expect(() => verifyReuseBindings(fixture)).toThrow());
    withChanged(reuseBindingsPath, value => {
      const record = JSON.parse(value);
      record.sourceFiles["packages/ui/src/unknown-control.tsx"] = { before: null, after: "0".repeat(64) };
      return JSON.stringify(record);
    }, () => expect(() => verifyReuseBindings(fixture)).toThrow(/binding paths/));
    withChanged(reuseBindingsPath, value => {
      const record = JSON.parse(value);
      record.sourceFiles["packages/ui/src/radio/radio.tsx"].before = "0".repeat(64);
      return JSON.stringify(record);
    }, () => expect(() => verifyReuseBindings(fixture)).toThrow(/before hashes/));
  });

  it("does not permit Input behavior, dependencies, public exports or old proof refreshes", () => {
    for (const file of ["packages/ui/src/input/input.tsx", "packages/ui/src/index.ts", "packages/ui/package.json", "pnpm-lock.yaml",
      "evidence/runtime/g6-components-2026-10-14/source-bindings.json", "scripts/g6-governance.mjs"]) {
      withChanged(file, value => `${value}\n`, () => expect(() => readReuseBaseline(fixture)).toThrow(/outside|Retained/));
    }
  });

  it("keeps every predecessor phase field and denies acceptance/publication escalation", () => {
    expect(() => validateReusePhase(currentPhase(), previousPhase())).not.toThrow();
    for (const mutation of [{ humanGate: "accepted" }, { contrastAcceptance: "accepted" }, { publication: "published" },
      { businessMigration: "authorized" }, { gitOperations: "commit-authorized" }, { scope: "all-components" }, { extraGate: "passed" }]) {
      const phase = currentPhase(); Object.assign(phase.componentRefinements.questionnaireControlReuse, mutation);
      expect(() => validateReusePhase(phase, previousPhase())).toThrow();
    }
    const phase = currentPhase(); phase.componentRefinements.g6Components.publication = "published";
    expect(() => validateReusePhase(phase, previousPhase())).toThrow(/Historical phase/);
  });

  it("permits only the planned shared CSS selector extension and two label states", () => {
    const before = read(`${reuseEvidence}/baseline/packages/ui/src/styles.css`);
    expect(read("packages/ui/src/styles.css")).toBe(expectedSharedCss(before));
    withChanged("packages/ui/src/styles.css", value => value.replace("box-shadow: 0 0 0 3px", "box-shadow: 0 0 0 4px"),
      () => expect(() => validateReuseContracts(fixture)).toThrow(/Shared CSS/));
    withChanged("packages/ui/src/styles.css", value => value + "\n.rain-button { color: red; }\n",
      () => expect(() => validateReuseContracts(fixture)).toThrow(/Shared CSS/));
  });

  it("rejects unrelated Registry and Manifest acceptance edits", () => {
    withChanged("registry/g6-assets.json", value => {
      const registry = JSON.parse(value); registry.items.find((item: any) => item.name !== "questionnaire").files.push("unexpected.tsx");
      return JSON.stringify(registry);
    }, () => expect(() => validateReuseContracts(fixture)).toThrow(/Registry changed/));
    withChanged("manifests/ui/questionnaire.yaml", value => value.replace('humanGate: "awaiting_human"', 'humanGate: "accepted"'),
      () => expect(() => validateReuseContracts(fixture)).toThrow(/Historical/));
    withChanged("manifests/contracts/tailwind-b2.yaml", value => value.replace('prefixes:\n', 'prefixes:\n    - "packages/ui/src/"\n'),
      () => expect(() => validateReuseContracts(fixture)).toThrow(/five exact/));
  });

  it("projects only a sealed current CSS source for the historical color ledger", () => {
    const file = "packages/ui/src/styles.css", source = read(file), failures: string[] = [], findings: any[] = [];
    expect(prepareQuestionnaireReuseColors(file, source, fixture, failures, findings)).toBe(read(`${reuseEvidence}/baseline/${file}`));
    expect(failures).toEqual([]);
    expect(findings.every(finding => finding.status === "pending-review" && !finding.acceptedException)).toBe(true);
    const mutation = source + "\n.rain-button { color: red; }";
    expect(prepareQuestionnaireReuseColors(file, mutation, fixture, [], [])).toBe(mutation);
    withChanged(reuseBindingsPath, value => value.replace('"after": "', '"after": "changed-'), () => {
      const invalid: string[] = [];
      expect(prepareQuestionnaireReuseColors(file, source, fixture, invalid, [])).toBe(source);
      expect(invalid.join(" ")).toMatch(/exact current source proof/);
    });
    const binding = path.join(fixture, reuseBindingsPath), bytes = readFileSync(binding);
    try {
      rmSync(binding); const missing: string[] = [];
      expect(prepareQuestionnaireReuseColors(file, source, fixture, missing, [])).toBe(source);
      expect(missing).toHaveLength(1);
    } finally { writeFileSync(binding, bytes); }
  });

  it("records current paint roles and unresolved contrast without inheriting visual acceptance", () => {
    const report = reuseColorReport();
    expect(report.consumers).toHaveLength(4);
    expect(report.measurements).toHaveLength(14);
    expect(report.historicalAcceptanceInherited).toBe(false);
    expect(report.measurements.filter(measurement => !measurement.meetsMinimum)).toHaveLength(4);
    expect(report.measurements.every(measurement => measurement.humanReview === "awaiting_human" && !measurement.acceptedException)).toBe(true);
  });

  it.each([ ["g6-assets", "questionnaire"], ["radio", "radio"], ["checkbox", "checkbox"], ["selection-cards", undefined], ["dropdown-family", "dropdown-menu"] ])(
    "ships the complete relative source closure for %s/%s", (registry, item) => {
      const files = registryFileClosure(fixture, `registry/${registry}.json`, item);
      expect(() => validateRegistryClosure(fixture, files)).not.toThrow();
      files.delete("packages/ui/src/selection-control/selection-control.tsx");
      expect(() => validateRegistryClosure(fixture, files)).toThrow(/closure missing/);
    });

  it("can build only the reviewed finite scope before sealing", () => {
    expect(buildReuseBindings(fixture).kind).toBe("QuestionnaireControlReuseSourceBindings");
  });
});
