import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  getExpectedDayThreeLifecycle,
  isDayOneForbiddenDependency,
  parseStaticArrayExport,
  parseYamlSubset,
} from "./verification-helpers.mjs";
import * as verificationHelpers from "./verification-helpers.mjs";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
it("keeps Card V2 authorization separate from frozen history and rejects scope or Git escalation", () => {
  const status = parseYamlSubset(readFileSync(join(workspaceRoot, "status/current-phase.yaml"), "utf8")) as any;
  expect(verificationHelpers.hasCardV2Authorization(status)).toBe(true);
  expect(verificationHelpers.getValidatedTailwindB2History(status)).toEqual(status.phaseHistory.tailwindB2);
  for (const change of [
    { authorization: "missing" }, { scope: "all-components" }, { humanGate: "accepted" },
    { contrastAcceptance: "accepted" }, { dependency: "new-framework" },
    { userStatement: "开始详细计划" }, { implementation: "published" },
  ]) {
    const invalid = structuredClone(status);
    Object.assign(invalid.componentRefinements.cardV2.visualRefinement, change);
    expect(verificationHelpers.hasCardV2Authorization(invalid)).toBe(false);
  }
  const originalBatch = structuredClone(status);
  delete originalBatch.componentRefinements.cardV2.visualRefinement;
  expect(verificationHelpers.hasCardV2Authorization(originalBatch)).toBe(true);
  for (const change of [
    { scope: "all-components" }, { humanGate: "accepted" }, { contrastAcceptance: "accepted" },
    { doesNotAuthorize: [] }, { sourceControl: { ...status.componentRefinements.cardV2.sourceControl, remoteWrite: "authorized" } },
    { sourceControl: { ...status.componentRefinements.cardV2.sourceControl, baselineCommit: "unexpected" } },
  ]) {
    const invalid = structuredClone(status);
    Object.assign(invalid.componentRefinements.cardV2, change);
    expect(verificationHelpers.hasCardV2Authorization(invalid)).toBe(false);
    expect(() => verificationHelpers.getValidatedTailwindB2History(invalid)).toThrow();
  }
});

it("records the five current visual acceptances without granting colors, devices or publication", () => {
  const original = parseYamlSubset(readFileSync(join(workspaceRoot, "status/current-phase.yaml"), "utf8")) as any;
  const cases = [
    [["input"], verificationHelpers.hasInputRefinementAuthorization, "input-search-input-form-item-runtime-visual-only"],
    [["select"], verificationHelpers.hasSelectRefinementAuthorization, "select-runtime-visual-only"],
    [["select", "formalDependencies"], verificationHelpers.hasSelectFormalDependenciesAuthorization, "select-formal-dependencies-runtime-visual-only"],
    [["dropdownFamily"], verificationHelpers.hasDropdownFamilyAuthorization, "dropdown-menu-popover-runtime-visual-only"],
    [["dropdownFamily", "selectionVisualReuse"], verificationHelpers.hasDropdownSelectionVisualReuseAuthorization, "menu-passive-selection-indicators-runtime-visual-only"],
  ] as const;
  for (const [path, validate, scope] of cases) {
    const status = structuredClone(original);
    const record = path.reduce((entry: any, key) => entry[key], status.componentRefinements);
    record.humanGate = "accepted";
    record.humanGateDecision = {
      acceptedAt: "2026-09-12", decisionSource: "explicit-user-confirmation", userStatement: "视觉已完成人工和检验。",
      scope, evidence: "../docs/plans/2026-09-12-existing-assets-closure.md",
      doesNotAuthorize: ["contrast-or-color-eligibility-acceptance", "manual-keyboard-ime-screen-reader-or-physical-touch", "new-components-global-token-changes-publication-migration-or-git"],
    };
    expect(validate(status), path.join(".")).toBe(true);
    expect(status.independentLifecycle).toEqual(original.independentLifecycle);
    expect(status.phaseHistory).toEqual(original.phaseHistory);
    for (const change of [{ scope: "all-components" }, { decisionSource: "automated-test" }, { userStatement: "继续" }, { doesNotAuthorize: [] }, { publication: "authorized" }]) {
      const invalid = structuredClone(status);
      Object.assign(path.reduce((entry: any, key) => entry[key], invalid.componentRefinements).humanGateDecision, change);
      expect(validate(invalid)).toBe(false);
      expect(() => verificationHelpers.getValidatedTailwindB2History(invalid)).toThrow();
    }
    delete record.humanGateDecision;
    expect(validate(status)).toBe(false);
    record.humanGate = "awaiting_human";
    expect(validate(status)).toBe(true);
  }
});

it("validates scoped page visual acceptance without promoting the overall Foundations gate", () => {
  const status = parseYamlSubset(readFileSync(join(workspaceRoot, "status/current-phase.yaml"), "utf8")) as any;
  status.tokenRefinements.foundationsPageVisualAcceptance = {
    humanGate: "accepted",
    humanGateDecision: {
      acceptedAt: "2026-09-12", decisionSource: "explicit-user-confirmation", userStatement: "基础页通过； 综合页通过",
      scope: "foundations-entry-typography-line-radius-spacing-runtime-visual-only",
      evidence: "../evidence/runtime/token-foundations-v1/verification.md",
    },
    doesNotAuthorize: ["color-or-contrast-acceptance", "component-token-mappings-or-global-size-density", "other-machine-font-or-real-device-checks", "other-human-gates", "figma-publication-business-migration-or-git"],
  };
  expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
  expect(status.independentLifecycle.humanGate).toBe("awaiting_human");
  expect(status.tokenRefinements.foundationsAlignment.humanGate).toBe("awaiting_human");
  for (const mutation of [
    { acceptedAt: "2026-09-11" }, { decisionSource: "agent-inferred" }, { userStatement: "通过" },
    { scope: "all-foundations-and-colors" }, { evidence: "missing.md" }, { extra: "accepted" },
  ]) {
    const changed = structuredClone(status);
    Object.assign(changed.tokenRefinements.foundationsPageVisualAcceptance.humanGateDecision, mutation);
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(changed)).toThrow(/Foundations page visual acceptance/);
  }
  for (const mutation of [{ humanGate: "awaiting_human" }, { doesNotAuthorize: [] }, { extra: "accepted" }]) {
    const changed = structuredClone(status);
    Object.assign(changed.tokenRefinements.foundationsPageVisualAcceptance, mutation);
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(changed)).toThrow(/Foundations page visual acceptance/);
  }
  const unverified = structuredClone(status);
  unverified.tokenRefinements.foundationsAlignment.implementation = "in-progress";
  expect(() => verificationHelpers.validateTokenFoundationsV1Phase(unverified)).toThrow(/Foundations page visual acceptance/);
  const overaccepted = structuredClone(status);
  overaccepted.independentLifecycle.humanGate = "accepted";
  expect(() => verificationHelpers.validateTokenFoundationsV1Phase(overaccepted)).toThrow(/lifecycle/);
  delete status.tokenRefinements.foundationsPageVisualAcceptance;
  expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
});

it("keeps Tag color discovery within its confirmed scope and independent verification gates", () => {
  const status = parseYamlSubset(readFileSync(join(workspaceRoot, "status/current-phase.yaml"), "utf8")) as any;
  expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
  status.tokenRefinements.tagColorDiscovery.humanGate = "awaiting_human";
  delete status.tokenRefinements.tagColorDiscovery.humanGateDecision;
  for (const patch of [
    { scope: "all-colors-and-components" }, { userStatement: "继续" },
    { contrastAcceptance: "accepted" }, { doesNotAuthorize: [] },
    { implementation: "completed", automatedVerification: "not-run" },
    { implementation: "completed", independentReview: "findings" },
    { humanGate: "accepted" }, { authorization: "proposal-only" },
  ]) {
    const invalid = structuredClone(status);
    Object.assign(invalid.tokenRefinements.tagColorDiscovery, patch);
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(invalid)).toThrow(/Tag color discovery/);
  }
  Object.assign(status.tokenRefinements.tagColorDiscovery, {
    implementation: "completed", automatedVerification: "passed", independentReview: "passed", humanGate: "awaiting_human",
  });
  expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
  const decision = {
    acceptedAt: "2026-09-09", decisionSource: "explicit-user-confirmation", userStatement: "确定。",
    scope: "tag-color-directory-search-and-pairing-experience-only",
    evidence: "../evidence/runtime/tag-color-discovery/verification.md",
  };
  Object.assign(status.tokenRefinements.tagColorDiscovery, { humanGate: "accepted", humanGateDecision: decision });
  expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
  for (const patch of [
    { implementation: "in-progress" }, { automatedVerification: "not-run" }, { independentReview: "findings" },
    { contrastAcceptance: "accepted" }, { humanGateDecision: undefined },
    ...[
      { acceptedAt: "2026-09-08" }, { decisionSource: "agent-inferred" }, { userStatement: "继续" },
      { scope: "all-tag-colors-and-components" }, { evidence: "unrelated.md" }, { extraPermission: "publish" },
    ].map((change) => ({ humanGateDecision: { ...decision, ...change } })),
  ]) {
    const invalid = structuredClone(status);
    Object.assign(invalid.tokenRefinements.tagColorDiscovery, patch);
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(invalid)).toThrow(/Tag color discovery/);
  }
});
it("admits the public size rollout only with its exact scope and preserves independent Gates", () => {
  const status = parseYamlSubset(readFileSync(join(workspaceRoot, "status/current-phase.yaml"), "utf8")) as { componentRefinements: { questionOptionSizes?: { scope: string; humanGate: string; humanGateDecision?: unknown } } };
  expect(verificationHelpers.hasQuestionOptionSizeRefinementAuthorization(status)).toBe(true);
  expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
  status.componentRefinements.questionOptionSizes!.humanGate = "accepted";
  delete status.componentRefinements.questionOptionSizes!.humanGateDecision;
  expect(verificationHelpers.hasQuestionOptionSizeRefinementAuthorization(status)).toBe(false);
  status.componentRefinements.questionOptionSizes!.humanGate = "awaiting_human";
  status.componentRefinements.questionOptionSizes!.scope = "all-component-sizes";
  expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).toThrow("frozen B2 state");
  delete status.componentRefinements.questionOptionSizes;
  expect(verificationHelpers.hasQuestionOptionSizeRefinementAuthorization(status)).toBe(false);
});
it("accepts only the explicit public size visual confirmation after completed checks", () => {
  const status = parseYamlSubset(readFileSync(join(workspaceRoot, "status/current-phase.yaml"), "utf8")) as any;
  Object.assign(status.componentRefinements.questionOptionSizes, {
    implementation: "completed", automatedVerification: "passed", independentReview: "passed", humanGate: "accepted",
    humanGateDecision: {
      acceptedAt: "2026-09-08", decisionSource: "explicit-user-confirmation",
      userStatement: "视觉确认，", scope: "question-option-six-public-sizes-visual-only",
      evidence: "../docs/plans/2026-09-08-question-option-size-implementation.md",
    },
  });
  expect(verificationHelpers.hasQuestionOptionSizeRefinementAuthorization(status)).toBe(true);
  expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
  for (const patch of [
    { implementation: "in-progress" }, { automatedVerification: "failed" }, { independentReview: "findings" },
    { humanGateDecision: { ...status.componentRefinements.questionOptionSizes.humanGateDecision, scope: "all-question-option-components" } },
    { humanGateDecision: { ...status.componentRefinements.questionOptionSizes.humanGateDecision, userStatement: "继续推进" } },
    { humanGateDecision: { ...status.componentRefinements.questionOptionSizes.humanGateDecision, evidence: "../unverified.md" } },
  ]) {
    const candidate = structuredClone(status);
    Object.assign(candidate.componentRefinements.questionOptionSizes, patch);
    expect(verificationHelpers.hasQuestionOptionSizeRefinementAuthorization(candidate)).toBe(false);
  }
});
it("admits only the explicitly scoped local size review without widening the frozen component phase", () => {
  const status = parseYamlSubset(readFileSync(join(workspaceRoot, "status/current-phase.yaml"), "utf8")) as { localExperiments?: { questionOptionSizeReview: { scope: string } } };
  expect(verificationHelpers.hasQuestionOptionSizeReviewAuthorization(status)).toBe(true);
  expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
  status.localExperiments!.questionOptionSizeReview.scope = "public-component-size-rollout";
  expect(verificationHelpers.hasQuestionOptionSizeReviewAuthorization(status)).toBe(false);
  expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).toThrow("unapproved local experiment");
  delete status.localExperiments;
  expect(verificationHelpers.hasQuestionOptionSizeReviewAuthorization(status)).toBe(false);
});
const globalFocusMigration = {
  authorization: "authorized", authorizedAt: "2026-09-07",
  decisionSource: "explicit-user-request-global-two-layer-focus",
  scope: "all-keyboard-focusable-library-components",
  outline: "Border/Brand/1", halo: "Fill/Brand/Alpha/3",
  outlineWidth: "1px", outlineOffset: "0px", haloWidth: "3px",
  buttonOuterShadowWidths: { primary: "4px", secondaryAndTertiary: "3px", text: "3px" },
  forcedColors: { outline: "2px solid CanvasText", outlineOffset: "2px", boxShadow: "none" },
  doesNotAuthorize: ["non-focus-component-states", "new-public-color-values", "figma-publication-business-migration-or-git"],
};
const buttonTextContrastException = {
  id: "danger-primary-label",
  decisionSource: "explicit-user-acceptance-danger-primary-text-contrast",
  userStatement: "不满足文字对比度也没事。我认为能看清。normal使用fill-red-solid-2，hover时底色加深",
  variant: "primary", tone: "danger", part: "label", foreground: "OnColor/1",
  defaultFill: "Fill/Red/Solid/2",
  feedbackFills: { light: "Fill/Red/Solid/1", dark: "Fill/Red/Solid/2" },
  darkFeedbackAlpha: 85,
  loadingFills: { light: "Fill/Red/Solid/1", dark: "Fill/Red/Solid/2" },
  loadingSurfaceOpacity: 0.82,
  states: ["default", "hover", "pressed", "loading"],
  themes: ["light", "dark"],
  parentSurfaces: ["Background/Neutral/1", "Background/Neutral/3"],
  minimumContrast: 4.5,
  outcome: "report-actual-contrast-user-accepted",
};

function readWorkspaceFile(filePath: string) {
  return readFileSync(join(workspaceRoot, filePath), "utf8");
}

function readFrozenB2File(filePath: string) {
  const archive = join(workspaceRoot, "evidence/runtime/token-foundations-v1/pre-token-runtime.tar.gz");
  expect(createHash("sha256").update(readFileSync(archive)).digest("hex"))
    .toBe("39b6253185367626ddf8f66e6b1cd99ed2e8addd4937e7c93f3c12ad48289280");
  const result = spawnSync("tar", ["-xOf", archive, filePath], { encoding: "utf8" });
  expect(result.status, result.stderr).toBe(0);
  return result.stdout;
}

function createEvidenceFixture() {
  const fixtureRoot = mkdtempSync(join(tmpdir(), "rain-day2-evidence-lock-"));
  for (const filePath of [
    "evidence",
    "benchmarks/benchmark-registry.yaml",
    "status/current-phase.yaml",
    "apps/playground/src/docs/evidence-index.ts",
    "apps/playground/src/docs/benchmark-index.ts",
    "docs/audits/2026-09-01-visual-asset-audit.md",
  ]) {
    const sourcePath = join(workspaceRoot, filePath);
    const targetPath = join(fixtureRoot, filePath);
    mkdirSync(dirname(targetPath), { recursive: true });
    cpSync(sourcePath, targetPath, { recursive: true });
  }
  writeFileSync(join(fixtureRoot, "status/current-phase.yaml"), readFrozenB2File("status/current-phase.yaml"));
  for (const [filePath, checksum] of [
    ["benchmarks/benchmark-registry.yaml", "06da78a15c264a6985e1b129ffafb87f5d86d901875cb904ac6f43a1664f18d3"],
    ["apps/playground/src/docs/benchmark-index.ts", "a01201fe5ca6cdcfbd6345bdaf02ab4f7926526f0b28bc9b00b7a9cf489f7f02"],
  ] as const) {
    const source = readWorkspaceFile(`evidence/runtime/bm-a-rn09/before/${filePath}.txt`);
    expect(createHash("sha256").update(source).digest("hex")).toBe(checksum);
    writeFileSync(join(fixtureRoot, filePath), source);
  }
  return fixtureRoot;
}

function replaceAfter(
  source: string,
  marker: string,
  before: string,
  after: string,
) {
  const markerIndex = source.indexOf(marker);
  const valueIndex = source.indexOf(before, markerIndex);
  if (markerIndex < 0 || valueIndex < 0) {
    throw new Error(`Unable to mutate ${before} after ${marker}`);
  }
  return `${source.slice(0, valueIndex)}${after}${source.slice(
    valueIndex + before.length,
  )}`;
}

function writeFixtureMutation(
  fixtureRoot: string,
  filePath: string,
  marker: string,
  before: string,
  after: string,
) {
  const absolutePath = join(fixtureRoot, filePath);
  writeFileSync(
    absolutePath,
    replaceAfter(readFileSync(absolutePath, "utf8"), marker, before, after),
  );
}

function runEvidenceVerification(fixtureRoot: string) {
  return spawnSync(
    process.execPath,
    [join(workspaceRoot, "scripts/verify-evidence.mjs")],
    {
      cwd: fixtureRoot,
      encoding: "utf8",
    },
  );
}

describe("Token Foundations V1 phase authorization", () => {
  const readStatus = () => parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as any;

  it("accepts the current Button and TextButton visual decisions without rewriting B2 history", () => {
    const status = readStatus();
    const history = JSON.stringify(status.phaseHistory);
    Object.assign(status.tokenRefinements.buttonTokenMigration, {
      humanGate: "accepted",
      humanGateDecision: {
        acceptedAt: "2026-09-08", decisionSource: "explicit-user-confirmation",
        userStatement: "普通 Button：最新 Token 配方的整体验确认\nTextButton：最新配方的视觉验收确认",
        scope: "button-and-text-button-current-token-recipes-visual-only",
        evidence: "../docs/plans/2026-09-05-size-density-first-recipes.md",
      },
    });
    Object.assign(status.componentRefinements.textButton, {
      humanGate: "accepted",
      humanGateDecision: {
        acceptedAt: "2026-09-08", decisionSource: "explicit-user-confirmation",
        userStatement: "TextButton：最新配方的视觉验收确认", scope: "text-button-current-token-recipe-visual-only",
        evidence: "../docs/verification/2026-09-03-text-button-implementation.md",
      },
    });
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
    expect(JSON.stringify(status.phaseHistory)).toBe(history);
    expect(verificationHelpers.getValidatedTailwindB2History(status).componentRefinements.textButton.humanGate).toBe("awaiting_human");
    for (const mutate of [
      (value: any) => { delete value.tokenRefinements.buttonTokenMigration.humanGateDecision; },
      (value: any) => { value.tokenRefinements.buttonTokenMigration.humanGateDecision.scope = "all-components"; },
      (value: any) => { value.tokenRefinements.buttonTokenMigration.independentReview = "findings"; },
      (value: any) => { delete value.componentRefinements.textButton.humanGateDecision; },
      (value: any) => { value.componentRefinements.textButton.humanGateDecision.scope = "all-text-button-variants"; },
      (value: any) => { value.componentRefinements.textButton.automatedVerification = "not-run"; },
    ]) {
      const candidate = structuredClone(status); mutate(candidate);
      expect(() => verificationHelpers.validateTokenFoundationsV1Phase(candidate)).toThrow();
    }
  });

  it("opens only batches zero and one while preserving the complete B2 snapshot", () => {
    const status = readStatus();
    expect(status.currentPhase.id).toBe("token-foundations-v1");
    expect(verificationHelpers.validateTokenFoundationsV1Phase).toBeTypeOf("function");
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
    const b2 = verificationHelpers.getValidatedTailwindB2History(status);
    expect(b2.currentPhase.id).toBe("tailwind-b2-composition-contract");
    expect(b2.independentLifecycle).toMatchObject({ implementation: "in-progress", automatedVerification: "not-run", humanGate: "not-evaluated" });
    expect(b2.componentHumanGates.button.status).toBe("accepted");
    expect(b2.componentRefinements.iconLibrary.humanGate).toBe("accepted");
    expect(b2.componentRefinements.textButton.humanGate).toBe("awaiting_human");
    expect(verificationHelpers.getCurrentB2Status(status)).toEqual(b2);
    expect(verificationHelpers.getCurrentB2Status(b2)).toEqual(b2);
  });

  it("limits component contrast acceptance to the recorded decisions and measured sets", () => {
    for (const [key, count, authorized] of [
      ["questionNumber", 93, verificationHelpers.hasQuestionNumberRefinementAuthorization],
      ["optionButton", 9, verificationHelpers.hasOptionButtonContentRefinementAuthorization],
    ] as const) {
      const status = readStatus();
      const review = key === "questionNumber" ? status.componentRefinements[key] : status.componentRefinements[key].contentRefinement;
      expect(authorized(status)).toBe(true);
      expect(review.contrastAcceptance.findingCount).toBe(count);
      expect(review.contrastAcceptance.outcome).toBe("report-actual-contrast-user-accepted");
      for (const patch of [
        { scope: "all-component-colors" }, { findingCount: count + 1 }, { findingsSha256: "0".repeat(64) },
        { userStatement: "继续" }, { evidence: "../unverified.md" }, { outcome: "wcag-passed" },
      ]) {
        const candidate = structuredClone(status);
        const target = key === "questionNumber" ? candidate.componentRefinements[key] : candidate.componentRefinements[key].contentRefinement;
        Object.assign(target.contrastAcceptance, patch);
        expect(authorized(candidate)).toBe(false);
      }
    }
  });

  it("rejects rewritten B2 history and current Gate copies", () => {
    expect(verificationHelpers.getValidatedTailwindB2History).toBeTypeOf("function");
    const status = readStatus();
    for (const mutate of [
      (value: any) => { value.phaseHistory.tailwindB2.independentLifecycle.humanGate = "accepted"; },
      (value: any) => { value.phaseHistory.tailwindB2.componentRefinements.textButton.humanGate = "accepted"; },
      (value: any) => { value.phaseHistory.tailwindB2.allowedActions.push("publish"); },
      (value: any) => { value.componentHumanGates.button.status = "not-evaluated"; },
      (value: any) => { value.phaseHistory.foundationSpikeDay3.independentLifecycle.humanGate = "accepted"; },
      (value: any) => { value.phaseHistory.unapproved = {}; },
    ]) {
      const invalid = structuredClone(status);
      mutate(invalid);
      expect(() => verificationHelpers.getValidatedTailwindB2History(invalid)).toThrow(/Token Foundations V1 history/);
    }
  });

  it("allows only the explicit IconButton refinement without changing frozen B2 refinements", () => {
    const status = readStatus();
    expect(verificationHelpers.hasIconButtonRefinementAuthorization(status)).toBe(true);
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
    expect(verificationHelpers.getValidatedTailwindB2History(status).componentRefinements.iconButton).toBeUndefined();
    for (const mutate of [
      (value: any) => { value.componentRefinements.iconButton.scope = "all-components"; },
      (value: any) => { value.componentRefinements.iconButton.decisionSource = "agent-inferred"; },
      (value: any) => { value.componentRefinements.iconButton.humanGate = "accepted"; delete value.componentRefinements.iconButton.humanGateDecision; },
      (value: any) => { value.componentRefinements.iconButton.implementation = "completed"; value.componentRefinements.iconButton.automatedVerification = "not-run"; },
      (value: any) => { value.componentRefinements.iconButton.extraPermission = "publish"; },
      (value: any) => { value.componentRefinements.unapproved = {}; },
      (value: any) => { value.componentRefinements.textButton.humanGate = "accepted"; delete value.componentRefinements.textButton.humanGateDecision; },
    ]) {
      const invalid = structuredClone(status);
      mutate(invalid);
      expect(() => verificationHelpers.getValidatedTailwindB2History(invalid)).toThrow(/Token Foundations V1 history/);
    }
  });

  it("accepts the IconButton visual Human Gate only with the exact decision and completed checks", () => {
    const status = readStatus();
    const refinement = status.componentRefinements.iconButton;
    Object.assign(refinement, { implementation: "completed", automatedVerification: "passed", independentReview: "passed", humanGate: "awaiting_human" });
    delete refinement.humanGateDecision;
    expect(verificationHelpers.hasIconButtonRefinementAuthorization(status)).toBe(true);
    refinement.humanGate = "accepted";
    refinement.humanGateDecision = {
      acceptedAt: "2026-09-07", decisionSource: "explicit-user-confirmation", userStatement: "确认视觉验收",
      scope: "icon-button-visual-only", evidence: "../evidence/runtime/icon-button/verification.md",
    };
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
    for (const mutate of [
      (value: any) => { delete value.humanGateDecision; },
      (value: any) => { value.humanGateDecision.scope = "all-components"; },
      (value: any) => { value.humanGateDecision.decisionSource = "agent-inferred"; },
      (value: any) => { value.humanGateDecision.userStatement = "tests-passed"; },
      (value: any) => { value.humanGateDecision.evidence = "../evidence/runtime/day-3/README.md"; },
      (value: any) => { value.implementation = "in-progress"; },
      (value: any) => { value.automatedVerification = "not-run"; },
      (value: any) => { value.independentReview = "not-run"; },
      (value: any) => { value.humanGate = "awaiting_human"; },
    ]) {
      const invalid = structuredClone(status);
      mutate(invalid.componentRefinements.iconButton);
      expect(verificationHelpers.hasIconButtonRefinementAuthorization(invalid)).toBe(false);
      expect(() => verificationHelpers.validateTokenFoundationsV1Phase(invalid)).toThrow(/Token Foundations V1 history/);
    }
  });

  it("rejects scope expansion, unapproved checkpoints, and claimed Human Gate completion", () => {
    expect(verificationHelpers.validateTokenFoundationsV1Phase).toBeTypeOf("function");
    const status = readStatus();
    for (const mutate of [
      (value: any) => { value.allowedActions.push("migrate-components"); },
      (value: any) => { value.blockedActions.pop(); },
      (value: any) => { value.currentPhase.authorizationScope = "all-token-batches"; },
      (value: any) => { value.checkpoints.pop(); },
      (value: any) => { value.independentLifecycle.humanGate = "accepted"; },
      (value: any) => { value.currentPhase.progress = "completed"; },
      (value: any) => { value.unapprovedAuthority = "publish"; },
    ]) {
      const invalid = structuredClone(status);
      mutate(invalid);
      expect(() => verificationHelpers.validateTokenFoundationsV1Phase(invalid)).toThrow(/Token Foundations V1 phase/);
    }
  });
});

describe("Tailwind B2 phase authorization", () => {
  const readStatus = () => verificationHelpers.getCurrentB2Status(parseYamlSubset(readWorkspaceFile("status/current-phase.yaml"))) as any;

  it("records the explicitly authorized pilot without resetting independent icon or Button gates", () => {
    const status = readStatus();
    expect(status.currentPhase).toMatchObject({
      id: "tailwind-b2-composition-contract",
      status: "authorized",
      workMode: "system-mode-tailwind-b2",
      authorizationScope: "input-button-search-operation-pilot",
      progress: "tailwind-b2-pilot-in-progress",
    });
    expect(status.metadata.decisionSource).toBe("explicit-user-authorization-tailwind-b2-composition-contract");
    expect(status.independentLifecycle).toMatchObject({
      implementation: "in-progress", automatedVerification: "not-run", humanGate: "not-evaluated",
      figmaEditableMaterial: "not-authorized", packageOrRegistryPublication: "not-authorized",
      businessMigration: "not-authorized", localGitCommit: "not-created", remoteGit: "not-configured",
    });
    expect(status.checkpoints.map((checkpoint: any) => checkpoint.id)).toEqual([
      "day-1-runtime-start", "day-2-foundations-start", "day-3-core-ui-start", "tailwind-b2-composition-contract",
    ]);
    expect(status.componentRefinements.iconLibrary.humanGate).toBe("accepted");
    expect(status.componentRefinements.iconLibrary.sourceRepair.humanGate).toBe("accepted");
    expect(status.componentRefinements.textButton.humanGate).toBe("awaiting_human");
    expect(status.componentHumanGates.button.status).toBe("accepted");
    expect(status.independentAuditCheckpoints.rainClassicToRainNextReuseAuditCp3.status).toBe("accepted");
  });

  it.each([
    ["tailwind-b2-pilot-in-progress", "not-run", "in-progress", "not-evaluated"],
    ["tailwind-b2-pilot-in-progress", "failed", "in-progress", "not-evaluated"],
    ["tailwind-b2-pilot-in-progress", "passed", "in-progress", "not-evaluated"],
    ["tailwind-b2-pilot-completed", "passed", "completed", "awaiting_human"],
  ])("keeps implementation and verification separate for %s / %s", (progress, verification, implementation, gate) => {
    expect(verificationHelpers.getExpectedTailwindB2Lifecycle).toBeTypeOf("function");
    expect(verificationHelpers.getExpectedTailwindB2Lifecycle(progress, verification)).toMatchObject({
      implementation, automatedVerification: verification, humanGate: gate,
      implementationScope: "input-button-search-operation-pilot",
      packageOrRegistryPublication: "not-authorized", remoteGit: "not-configured",
    });
  });

  it.each([
    ["tailwind-b2-pilot-completed", "not-run"], ["tailwind-b2-pilot-completed", "failed"],
    ["unknown", "passed"], ["tailwind-b2-pilot-in-progress", "unknown"],
    ["toString", "passed"], ["constructor", "passed"],
    ["tailwind-b2-pilot-in-progress", "toString"], ["tailwind-b2-pilot-in-progress", "__proto__"],
  ])("rejects impossible B2 outcomes %s / %s", (progress, verification) => {
    expect(verificationHelpers.getExpectedTailwindB2Lifecycle).toBeTypeOf("function");
    expect(() => verificationHelpers.getExpectedTailwindB2Lifecycle(progress, verification)).toThrow(/B2 lifecycle/);
  });

  it("requires an exact completed and verified historical parent before consuming icon refinements", () => {
    expect(verificationHelpers.getValidatedDayThreeHistory).toBeTypeOf("function");
    const status = readStatus();
    const history = verificationHelpers.getValidatedDayThreeHistory(status);
    expect(history.currentPhase.progress).toBe("task-4-core-ui-completed");
    expect(history.independentLifecycle).toEqual(getExpectedDayThreeLifecycle("task-4-core-ui-completed", "passed"));
    expect(verificationHelpers.getIconLibraryRefinementFiles(status.componentRefinements, history.currentPhase.progress).requireComplete).toBe(true);
    expect(verificationHelpers.getTextButtonRefinementFiles(status.componentRefinements, history.currentPhase.progress).requireComplete).toBe(true);
    for (const mutation of [
      (value: any) => { delete value.phaseHistory; },
      (value: any) => { value.phaseHistory.foundationSpikeDay3.currentPhase.progress = "task-4-core-ui-in-progress"; },
      (value: any) => { value.phaseHistory.foundationSpikeDay3.independentLifecycle.automatedVerification = "not-run"; },
      (value: any) => { value.phaseHistory.foundationSpikeDay3.independentLifecycle.humanGate = "accepted"; },
      (value: any) => { value.phaseHistory.foundationSpikeDay3.extra = "unapproved"; },
    ]) {
      const invalid = structuredClone(status);
      mutation(invalid);
      expect(() => verificationHelpers.getValidatedDayThreeHistory(invalid)).toThrow(/Day 3 history/);
    }
  });

  it("fails closed on widened B2 actions, checkpoints, lifecycle or scope", () => {
    expect(verificationHelpers.validateTailwindB2Phase).toBeTypeOf("function");
    const status = readStatus();
    expect(() => verificationHelpers.validateTailwindB2Phase(status)).not.toThrow();
    for (const mutation of [
      (value: any) => { value.allowedActions.push("发布组件库"); },
      (value: any) => { value.blockedActions.pop(); },
      (value: any) => { value.currentPhase.authorizationScope = "all-components"; },
      (value: any) => { value.independentLifecycle.packageOrRegistryPublication = "authorized"; },
      (value: any) => { value.checkpoints.pop(); },
      (value: any) => { value.checkpoints[0].unlocks.push("publication"); },
      (value: any) => { value.checkpoints[1].status = "accepted"; },
      (value: any) => { value.checkpoints[3].unlocks.push("Select"); },
      (value: any) => { value.currentPhase.progress = "tailwind-b2-pilot-completed"; },
      (value: any) => { value.componentRefinements.iconLibrary.sourceRepair.humanGate = "awaiting_human"; },
      (value: any) => { delete value.componentRefinements.iconLibrary.sourceRepair; },
      (value: any) => { value.componentRefinements.iconLibrary.implementation = "in-progress"; },
      (value: any) => { value.componentRefinements.textButton.implementation = "in-progress"; },
    ]) {
      const invalid = structuredClone(status);
      mutation(invalid);
      expect(() => verificationHelpers.validateTailwindB2Phase(invalid)).toThrow(/B2/);
    }
  });
});

describe("color supplement phase scope", () => {
  it("authorizes only the Button Token recipes while preserving separate visual and historical gates", () => {
    const status = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as any;
    status.tokenRefinements.buttonTokenMigration = {
      authorization: "authorized", authorizedAt: "2026-09-06",
      decisionSource: "explicit-user-request-continue-button-token-migration",
      scope: "button-and-text-button-token-recipes",
      design: "../docs/plans/2026-09-05-size-density-first-recipes.md",
      implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run",
      humanGate: "awaiting_human",
      unresolved: [],
      focusMigration: structuredClone(globalFocusMigration),
      contrastException: structuredClone(buttonTextContrastException),
      doesNotAuthorize: ["new-public-color-values", "global-size-density-remapping", "figma-publication-business-migration-or-git"],
    };
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
    for (const mutate of [
      (record: any) => { record.authorization = "pending"; },
      (record: any) => { record.scope = "all-component-token-recipes"; },
      (record: any) => { record.humanGate = "accepted"; },
      (record: any) => { record.implementation = "completed"; },
      (record: any) => { record.unresolved.push("focus-color-source"); },
      (record: any) => { record.doesNotAuthorize.pop(); },
      (record: any) => { record.newColors = "authorized"; },
    ]) {
      const invalid = structuredClone(status);
      mutate(invalid.tokenRefinements.buttonTokenMigration);
      expect(() => verificationHelpers.validateTokenFoundationsV1Phase(invalid)).toThrow(/Button Token migration/i);
    }
    const verified = structuredClone(status);
    Object.assign(verified.tokenRefinements.buttonTokenMigration, {
      implementation: "completed", automatedVerification: "passed", independentReview: "passed",
    });
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(verified)).not.toThrow();
    verified.componentHumanGates.button.status = "awaiting_human";
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(verified)).toThrow(/history/i);
  });

  it("limits the global two-layer Focus authorization to its exact colors, geometry and Forced Colors fallback", () => {
    const status = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as any;
    Object.assign(status.tokenRefinements.buttonTokenMigration, {
      unresolved: [], focusMigration: structuredClone(globalFocusMigration),
    });
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
    for (const mutate of [
      (r: any) => { r.authorization = "pending"; },
      (r: any) => { r.authorizedAt = "2026-09-06"; },
      (r: any) => { r.decisionSource = "inferred"; },
      (r: any) => { r.scope = "all-component-states"; },
      (r: any) => { r.outline = "Border/Brand/2"; },
      (r: any) => { r.halo = "Fill/Brand/Alpha/4"; },
      (r: any) => { r.outlineWidth = "2px"; },
      (r: any) => { r.outlineOffset = "2px"; },
      (r: any) => { r.haloWidth = "4px"; },
      (r: any) => { r.buttonOuterShadowWidths.primary = "3px"; },
      (r: any) => { r.buttonOuterShadowWidths.secondaryAndTertiary = "4px"; },
      (r: any) => { r.buttonOuterShadowWidths.text = "4px"; },
      (r: any) => { r.forcedColors.outline = "1px solid CanvasText"; },
      (r: any) => { r.forcedColors.outlineOffset = "0px"; },
      (r: any) => { r.forcedColors.boxShadow = "0 0 0 3px blue"; },
      (r: any) => { r.doesNotAuthorize.pop(); },
      (r: any) => { r.inputNonFocusStyles = "authorized"; },
    ]) {
      const invalid = structuredClone(status);
      mutate(invalid.tokenRefinements.buttonTokenMigration.focusMigration);
      expect(() => verificationHelpers.validateTokenFoundationsV1Phase(invalid)).toThrow(/Button Token migration/i);
    }
    delete status.tokenRefinements.buttonTokenMigration.focusMigration;
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).toThrow(/Button Token migration/i);
  });

  it("records the user's Focus acceptance without accepting other Button appearances", () => {
    const status = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as any;
    const migration = status.tokenRefinements.buttonTokenMigration;
    migration.humanGate = "awaiting_human";
    delete migration.humanGateDecision;
    expect(migration.humanGate).toBe("awaiting_human");
    expect(migration.focusMigration.humanGate).toBe("accepted");
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
    migration.focusMigration.humanGateDecision.scope = "all-component-states";
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).toThrow(/Button Token migration/i);
  });

  it("limits user-accepted text contrast to the exact dangerous Primary label recipe", () => {
    const status = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as any;
    status.tokenRefinements.buttonTokenMigration.contrastException = structuredClone(buttonTextContrastException);
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
    for (const mutate of [
      (r: any) => { r.variant = "secondary"; },
      (r: any) => { r.tone = "default"; },
      (r: any) => { r.part = "icon"; },
      (r: any) => { r.foreground = "Text/Red/1"; },
      (r: any) => { r.defaultFill = "Fill/Red/Solid/1"; },
      (r: any) => { r.feedbackFills.dark = "Fill/Red/Solid/1"; },
      (r: any) => { r.darkFeedbackAlpha = 80; },
      (r: any) => { r.loadingFills.light = "Fill/Red/Solid/2"; },
      (r: any) => { r.loadingSurfaceOpacity = 0.8; },
      (r: any) => { r.states.push("disabled"); },
      (r: any) => { r.themes.push("custom"); },
      (r: any) => { r.parentSurfaces.push("Background/Neutral/2"); },
      (r: any) => { r.minimumContrast = 3; },
      (r: any) => { r.outcome = "contrast-passed"; },
      (r: any) => { r.decisionSource = "inferred"; },
      (r: any) => { r.userStatement = "looks good"; },
      (r: any) => { r.newPublicColor = "#AE313A"; },
    ]) {
      const invalid = structuredClone(status);
      mutate(invalid.tokenRefinements.buttonTokenMigration.contrastException);
      expect(() => verificationHelpers.validateTokenFoundationsV1Phase(invalid)).toThrow(/Button Token migration/i);
    }
    delete status.tokenRefinements.buttonTokenMigration.contrastException;
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).toThrow(/Button Token migration/i);
  });

  it("accepts only the confirmed semantic color alignment scope with its open accessibility gate", () => {
    const status = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as any;
    status.tokenRefinements.foundationsColorAlignment = {
      authorization: "authorized", authorizedAt: "2026-09-06",
      decisionSource: "explicit-user-correction-foundations-color-mapping",
      scope: "confirmed-semantic-color-aliases-and-role-splits",
      design: "../docs/plans/2026-09-06-foundations-color-alignment.md",
      implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run",
      humanGate: "awaiting_human", accessibility: "open-placeholder-and-consumer-eligibility",
      doesNotAuthorize: ["unconfirmed-color-mappings-or-new-color-values", "full-component-dark-migration", "figma-publication-business-migration-or-git"],
    };
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
    for (const mutate of [
      (record: any) => { record.authorization = "pending"; },
      (record: any) => { record.scope = "all-semantic-colors"; },
      (record: any) => { record.accessibility = "passed"; },
      (record: any) => { record.humanGate = "accepted"; },
      (record: any) => { record.implementation = "completed"; },
      (record: any) => { record.doesNotAuthorize.pop(); },
    ]) {
      const invalid = structuredClone(status);
      mutate(invalid.tokenRefinements.foundationsColorAlignment);
      expect(() => verificationHelpers.validateTokenFoundationsV1Phase(invalid)).toThrow(/color alignment/i);
    }
  });

  it("records explicit color-only visual acceptance without advancing other gates", () => {
    const status = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as { tokenRefinements: Record<string, any> };
    for (const key of ["colorFamilySupplement", "colorDarkTheme"]) {
      const record = status.tokenRefinements[key];
      record.humanGate = "accepted";
      record.humanGateDecision = {
        acceptedAt: "2026-09-06",
        decisionSource: "explicit-user-confirmation",
        userStatement: "这些颜色token的视觉已没问题。接下来应该做什么？",
        scope: "color-token-visual-only",
        evidence: "../evidence/runtime/color-dark-theme/verification.md",
      };
      expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
      for (const mutate of [
        (r: any) => { r.humanGateDecision.scope = "all-components"; },
        (r: any) => { r.humanGate = "not-evaluated"; },
        (r: any) => { r.implementation = "in-progress"; },
      ]) {
        const invalid = structuredClone(status); mutate(invalid.tokenRefinements[key]);
        expect(() => verificationHelpers.validateTokenFoundationsV1Phase(invalid)).toThrow();
      }
      record.humanGate = "awaiting_human";
      delete record.humanGateDecision;
      expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
    }
  });

  it("accepts the independent color refinement while preserving old phase gates and exact new scope", () => {
    const status = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml"));
    expect(() => verificationHelpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
    for (const mutate of [
      (s: any) => { s.tokenRefinements.colorFamilySupplement.scope = "all-components"; },
      (s: any) => { s.tokenRefinements.colorFamilySupplement.humanGate = "accepted"; delete s.tokenRefinements.colorFamilySupplement.humanGateDecision; },
      (s: any) => { s.tokenRefinements.colorFamilySupplement.implementation = "completed"; s.tokenRefinements.colorFamilySupplement.automatedVerification = "not-run"; },
      (s: any) => { s.tokenRefinements.colorDarkTheme.scope = "all-components"; },
      (s: any) => { s.tokenRefinements.colorDarkTheme.humanGate = "accepted"; delete s.tokenRefinements.colorDarkTheme.humanGateDecision; },
      (s: any) => { s.tokenRefinements.colorDarkTheme.implementation = "completed"; s.tokenRefinements.colorDarkTheme.automatedVerification = "not-run"; },
      (s: any) => { s.tokenRefinements.colorDarkTheme.doesNotAuthorize.pop(); },
      (s: any) => { s.tokenRefinements.other = {}; },
      (s: any) => { s.independentLifecycle.humanGate = "accepted"; },
    ]) {
      const invalid = structuredClone(status); mutate(invalid);
      expect(() => verificationHelpers.validateTokenFoundationsV1Phase(invalid)).toThrow();
    }
  });
});

describe("Tailwind B2 real CLI boundaries", () => {
  let fixtureRoot: string;
  beforeAll(() => {
    fixtureRoot = mkdtempSync(join(tmpdir(), "rain-b2-cli-gate-"));
    const tokenFiles = new Set([
      ...Object.values(verificationHelpers.avatarFamilyFiles).flat(), "evidence/runtime/avatar",
      ...Object.values(verificationHelpers.m2DeliveryFiles).flat(), "evidence/runtime/m2",
      ...Object.values(verificationHelpers.rn15DeliveryFiles).flat(), "evidence/runtime/rn15-delivery",
      "manifests/ui/alert-dialog.yaml", "packages/foundations/src/overlay-token-contract.ts", "scripts/dialog-refinement.test.ts", "tests/e2e/dialog-refinement.spec.ts", "evidence/runtime/dialog-refinement-2026-09-15",
      ...Object.values(verificationHelpers.rn14EditabilityFiles).flat(), "evidence/runtime/rn14-editability",
      ...Object.values(verificationHelpers.rn13AssetIndexFiles).flat(), "evidence/runtime/rn13-asset-index",
      ...Object.values(verificationHelpers.tableRn08Files).flat(), ...Object.values(verificationHelpers.tablePaginationFiles).flat(), "evidence/runtime/table-rn08", "evidence/runtime/table-pagination-replacement",
      ...Object.values(verificationHelpers.emptyRefinementFiles).flat(), "evidence/runtime/empty-refinement",
      ...verificationHelpers.insideFieldLabelBrowserFiles,
      ...Object.values(verificationHelpers.layoutsV1Files).flat(), "evidence/runtime/layouts-v1",
      ...Object.values(verificationHelpers.dialogV2Files).flat(), "evidence/runtime/dialog-v2",
      ...Object.values(verificationHelpers.cardV2Files).flat(), "apps/prototype", "evidence/runtime/card-v2",
      ...Object.values(verificationHelpers.tokenFoundationsV1Files).flat(),
      ...Object.values(verificationHelpers.tabsPreflightFiles).flat(), ...Object.values(verificationHelpers.tabsTokenFiles).flat(), ...Object.values(verificationHelpers.tabsColorFiles).flat(), ...Object.values(verificationHelpers.tabsComponentFiles).flat(),
      ...Object.values(verificationHelpers.tabsVisualRefinementFiles).flat(),
      ...Object.values(verificationHelpers.iconButtonRefinementFiles).flat(),
      ...Object.values(verificationHelpers.inputRefinementFiles).flat(),
      ...Object.values(verificationHelpers.selectRefinementFiles).flat(),
      ...Object.values(verificationHelpers.dropdownBatchOneFiles).flat(),
      ...Object.values(verificationHelpers.dropdownFamilyFiles).flat(),
      ...Object.values(verificationHelpers.checkboxSc01Files).flat(),
      ...Object.values(verificationHelpers.bmARn09Files).flat(),
      ...Object.values(verificationHelpers.bmBRn10Files).flat(),
      ...Object.values(verificationHelpers.radioSc01Files).flat(),
      ...Object.values(verificationHelpers.selectionCardsSc02Files).flat(),
      ...Object.values(verificationHelpers.selectionPatternsSc03Files).flat(),
      ...Object.values(verificationHelpers.selectionPlaygroundSc04Files).flat(),
      "evidence/runtime/select",
      "evidence/runtime/dropdown-batch-one",
      ...Object.values(verificationHelpers.tagRefinementFiles).flat(),
      ...Object.values(verificationHelpers.tagBatchTwoRefinementFiles).flat(),
      ...Object.values(verificationHelpers.tagBatchThreeFiles).flat(),
      ...Object.values(verificationHelpers.questionNumberRefinementFiles).flat(),
      ...Object.values(verificationHelpers.optionButtonRefinementFiles).flat(),
      ...Object.values(verificationHelpers.optionButtonContentRefinementFiles).flat(),
      ...Object.values(verificationHelpers.questionOptionSizeReviewFiles).flat(),
      ...Object.values(verificationHelpers.questionOptionSizeRefinementFiles).flat(),
      "evidence/icons/source-additions.json",
      ...["grading-pending", "grading-reviewed"].flatMap((slug) => [
        `evidence/icons/source-additions/${slug}.source.svg`,
        `packages/ui/src/icons/${slug}.tsx`, `packages/ui/src/icons/assets/${slug}.svg`,
      ]),
      "packages/foundations/src/button-token-contract.ts",
      "packages/foundations/src/button-token-contract.test.ts",
      "apps/playground/src/docs/components/button-token-review.tsx",
      "apps/playground/src/docs/components/button-token-review.css",
      "apps/playground/src/docs/components/button-token-review.test.tsx",
    ]);
    cpSync(workspaceRoot, fixtureRoot, {
      recursive: true,
      filter: (source) => !tokenFiles.has(relative(workspaceRoot, source))
        && !relative(workspaceRoot, source).split(/[\\/]/).some((part) => [
          ".git", "node_modules", "dist", "playwright-report", "test-results", "coverage", ".vite", "token-foundations-v1", "token-foundations",
        ].includes(part)),
    });
    expect(spawnSync("git", ["init", "--quiet"], { cwd: fixtureRoot }).status).toBe(0);
    // Run the current verifier against the complete frozen B2 input, so new
    // Token files and values cannot silently redefine the historical fixture.
    const archive = join(workspaceRoot, "evidence/runtime/token-foundations-v1/pre-token-runtime.tar.gz");
    expect(createHash("sha256").update(readFileSync(archive)).digest("hex"))
      .toBe("39b6253185367626ddf8f66e6b1cd99ed2e8addd4937e7c93f3c12ad48289280");
    const extracted = spawnSync("tar", ["-xzf", archive, "-C", fixtureRoot], { encoding: "utf8" });
    expect(extracted.status, `${extracted.stdout}${extracted.stderr}`).toBe(0);
    // BM-A is a later scenario; the historical B2 fixture retains its pre-RN-09 registry.
    writeFileSync(join(fixtureRoot, "benchmarks/benchmark-registry.yaml"), readFileSync(join(workspaceRoot, "evidence/runtime/bm-a-rn09/before/benchmarks/benchmark-registry.yaml.txt")));
    const inventoryPath = join(fixtureRoot, "evidence/icons/inventory.json");
    const inventory = JSON.parse(readFileSync(inventoryPath, "utf8"));
    inventory.icons = inventory.icons.filter((icon: any) => !["icon/grading-pending", "icon/grading-reviewed"].includes(icon.assetId));
    inventory.availableCount -= 2;
    delete inventory.sourceAdditions;
    writeFileSync(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`);
    const registryPath = join(fixtureRoot, "registry/icons.json");
    const registry = JSON.parse(readFileSync(registryPath, "utf8"));
    registry.items = registry.items.filter((item: any) => !["grading-pending", "grading-reviewed"].includes(item.name));
    writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);

  }, 30_000);
  afterAll(() => {
    if (fixtureRoot) rmSync(fixtureRoot, { recursive: true, force: true });
  });

  function run(script: string) {
    return spawnSync(process.execPath, [join(workspaceRoot, "scripts", script)], {
      cwd: fixtureRoot, encoding: "utf8", maxBuffer: 4 * 1024 * 1024,
    });
  }
  function mutate(filePath: string, change: (source: string) => string | null, script = "verify-boundaries.mjs") {
    const target = join(fixtureRoot, filePath);
    const original = existsSync(target) ? readFileSync(target, "utf8") : undefined;
    try {
      const changed = change(original ?? "");
      if (changed === null) rmSync(target);
      else {
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, changed);
      }
      return run(script);
    } finally {
      if (original === undefined) rmSync(target, { force: true });
      else writeFileSync(target, original);
    }
  }
  function expectRejected(result: ReturnType<typeof run>, reason: RegExp) {
    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    const output = `${result.stdout}${result.stderr}`;
    expect(reason.test(output), output.slice(0, 800)).toBe(true);
  }

  it("passes the complete unmodified fixture before testing any mutation", () => {
    for (const script of ["verify-boundaries.mjs", "verify-workspace.mjs", "verify-evidence.mjs"]) {
      const result = run(script);
      expect(result.error).toBeUndefined();
      expect(`${result.stdout}${result.stderr}`).toMatch(/verification passed/);
      expect(result.status).toBe(0);
    }
  });

  it.each([
    ["unknown phase", "currentPhase:", 'id: "tailwind-b2-composition-contract"', 'id: "unapproved-phase"', /no explicit boundary policy/],
    ["widened scope", "currentPhase:", 'authorizationScope: "input-button-search-operation-pilot"', 'authorizationScope: "all-components"', /B2 phase contract: authorization/],
    ["extra action", "allowedActions:", "allowedActions:\n", 'allowedActions:\n  - "发布组件库"\n', /B2 phase contract: action allowlist/],
    ["unverified historical parent", "phaseHistory:", 'automatedVerification: "passed"', 'automatedVerification: "not-run"', /B2 Day 3 history/],
  ])("rejects %s through the real boundary CLI", (_name, marker, before, after, reason) => {
    const result = mutate("status/current-phase.yaml", (source) => replaceAfter(source, String(marker), String(before), String(after)));
    expectRejected(result, reason as RegExp);
  });

  it("rejects deletion of the accepted icon Registry", () => {
    expectRejected(mutate("registry/icons.json", () => null), /Completed refinement artifact is missing: registry\/icons\.json/);
  });

  it("rejects a new Token artifact redirected through a symbolic link", () => {
    const target = join(fixtureRoot, "apps/playground/src/docs/token-foundations/geometry-panel.tsx");
    mkdirSync(dirname(target), { recursive: true });
    symlinkSync(join(fixtureRoot, "apps/playground/src/routes/overview-page.tsx"), target);
    try {
      expectRejected(mutate("status/current-phase.yaml", () => readWorkspaceFile("status/current-phase.yaml")), /Token Foundations V1 artifact must be a non-empty regular non-symbolic file/);
    } finally {
      rmSync(target);
    }
  });

  it("rejects a new B2 Registry publication entry", () => {
    expectRejected(mutate("registry/tailwind-b2.json", () => "{}\n"), /document outside the Icon library authorization: registry\/tailwind-b2\.json/);
  });

  it("rejects an extra direct dependency while the Task 1 dependency set is frozen", () => {
    expectRejected(mutate("packages/ui/package.json", (source) => {
      const document = JSON.parse(source);
      document.dependencies.clsx = "2.1.1";
      return JSON.stringify(document);
    }), /dependency allowlist|outside the frozen Day 3 dependency set/);
  });

  it.each([
    ["evidence/visual-evidence.yaml", "VE-001", /VE-001 lifecycle mismatch/],
    ["benchmarks/benchmark-registry.yaml", "BM-A", /BM-A lifecycle mismatch/],
  ])("preserves the evidence lifecycle lock in B2 for %s", (filePath, id, reason) => {
    expectRejected(mutate(filePath as string, (source) => replaceAfter(source, `id: "${id}"`, 'implementation: "not-started"', 'implementation: "completed"'), "verify-evidence.mjs"), reason as RegExp);
  });

  it("rejects replacing the full verification chain with icon-only checks", () => {
    expectRejected(mutate("package.json", (source) => {
      const document = JSON.parse(source);
      document.scripts.verify = "pnpm verify:icons";
      return JSON.stringify(document);
    }, "verify-workspace.mjs"), /script verify must be exactly|exact workspace command set/);
  });

  it("rejects reporting the not-yet-implemented B2 full verification as passed at phase entry", () => {
    const result = mutate("status/current-phase.yaml", (source) => {
      const verification = replaceAfter(source, "\nindependentLifecycle:", 'automatedVerification: "not-run"', 'automatedVerification: "passed"');
      return replaceAfter(verification, "\nindependentLifecycle:", 'automatedVerificationEvidence: "not-run"', 'automatedVerificationEvidence: "pnpm-verify-tailwind-b2-and-verify-and-reuse-audit-passed"');
    });
    expectRejected(result, /B2 full verification cannot be passed at phase entry/);
  });

  it("rejects reopening the accepted source-repair Gate even when the legacy icon contract allows awaiting review", () => {
    expectRejected(mutate("status/current-phase.yaml", (source) => {
      const changed = replaceAfter(source, "    sourceRepair:", 'humanGate: "accepted"', 'humanGate: "awaiting_human"');
      const start = changed.indexOf("      humanGateDecision:", changed.indexOf("    sourceRepair:"));
      const end = changed.indexOf("      doesNotAuthorize:", start);
      if (start < 0 || end < 0) throw new Error("Missing source-repair Gate fixture");
      return `${changed.slice(0, start)}${changed.slice(end)}`;
    }), /B2 phase contract: preserved component refinements/);
  });

  it("rejects deleting the historical icon source-repair record", () => {
    expectRejected(mutate("status/current-phase.yaml", (source) => {
      const start = source.indexOf("    sourceRepair:");
      const end = source.indexOf("\n    doesNotAuthorize:", start);
      if (start < 0 || end < 0) throw new Error("Missing source-repair fixture");
      return `${source.slice(0, start)}${source.slice(end + 1)}`;
    }), /B2 phase contract: preserved component refinements/);
  });

  it.each(["  iconLibrary:", "  textButton:"])("rejects implementation rollback of preserved refinement %s", (marker) => {
    expectRejected(mutate("status/current-phase.yaml", (source) => replaceAfter(source, marker, 'implementation: "completed"', 'implementation: "in-progress"')), /B2 phase contract: preserved component refinements/);
  });

  it("leaves the fixture valid after all mutation checks", () => {
    expect(run("verify-boundaries.mjs").status).toBe(0);
    expect(run("verify-workspace.mjs").status).toBe(0);
    expect(run("verify-evidence.mjs").status).toBe(0);
  });
});

describe("parseYamlSubset", () => {
  it("parses the registry subset without losing nested arrays or booleans", () => {
    expect(
      parseYamlSubset(`schemaVersion: "1.0"
metadata:
  retainedScreenshotCount: 1
evidence:
  - id: "VE-001"
    benchmarkRefs:
      - "BM-A"
    inspection:
      repositoryArtifact: false
`),
    ).toEqual({
      schemaVersion: "1.0",
      metadata: { retainedScreenshotCount: 1 },
      evidence: [
        {
          id: "VE-001",
          benchmarkRefs: ["BM-A"],
          inspection: { repositoryArtifact: false },
        },
      ],
    });
  });

  it("rejects duplicate keys and malformed indentation", () => {
    expect(() => parseYamlSubset('kind: "A"\nkind: "B"\n')).toThrow(
      /duplicate key/i,
    );
    expect(() =>
      parseYamlSubset('metadata:\n   project: "rain-next"\n'),
    ).toThrow(/indentation/i);
  });
});

describe("parseStaticArrayExport", () => {
  it("reads only static object and array literals from a TypeScript export", () => {
    const source = `
      export const evidenceIndex: readonly unknown[] = [
        { id: "VE-001", refs: ["BM-A"], artifact: { retained: true } },
      ];
    `;

    expect(parseStaticArrayExport(source, "evidenceIndex")).toEqual([
      {
        id: "VE-001",
        refs: ["BM-A"],
        artifact: { retained: true },
      },
    ]);
  });

  it("rejects executable expressions", () => {
    expect(() =>
      parseStaticArrayExport(
        'export const evidenceIndex = [makeEntry("VE-001")];',
        "evidenceIndex",
      ),
    ).toThrow(/static literal/i);
  });

  it("ignores fake exports inside comments", () => {
    const source = `
      // export const evidenceIndex = [{ id: "VE-001" }];
      export const evidenceIndex = [{ id: "VE-999" }];
    `;

    expect(parseStaticArrayExport(source, "evidenceIndex")).toEqual([
      { id: "VE-999" },
    ]);
  });
});

describe("isDayOneForbiddenDependency", () => {
  it.each([
    "radix-ui",
    "@radix-ui/react-dialog",
    "@base-ui/react",
    "@base-ui-components/react",
    "shadcn",
    "shadcn-ui",
    "@shadcn/ui",
  ])("blocks %s during Day 1", (dependency) => {
    expect(isDayOneForbiddenDependency(dependency)).toBe(true);
  });

  it.each(["react", "react-dom", "@playwright/test"])(
    "allows the Day 1 dependency %s",
    (dependency) => {
      expect(isDayOneForbiddenDependency(dependency)).toBe(false);
    },
  );
});

describe("Day 3 independent lifecycle outcomes", () => {
  it("exposes a lifecycle helper before the boundary consumes it", () => {
    expect(getExpectedDayThreeLifecycle).toBeTypeOf("function");
  });

  it.each([
    ["task-4-core-ui-in-progress", "not-run", "in-progress", "not-run"],
    ["task-4-core-ui-in-progress", "failed", "in-progress", "pnpm-verify-failed"],
    [
      "task-4-core-ui-in-progress",
      "passed",
      "in-progress",
      "pnpm-verify-and-reuse-audit-passed",
    ],
    [
      "task-4-core-ui-completed",
      "passed",
      "completed",
      "pnpm-verify-and-reuse-audit-passed",
    ],
  ] as const)(
    "maps %s with %s verification without collapsing independent states",
    (progress, automatedVerification, implementation, evidence) => {
      expect(getExpectedDayThreeLifecycle).toBeTypeOf("function");
      expect(
        getExpectedDayThreeLifecycle(progress, automatedVerification),
      ).toMatchObject({
        implementation,
        automatedVerification,
        automatedVerificationEvidence: evidence,
        humanGate: "not-evaluated",
      });
    },
  );

  it.each([
    ["task-4-core-ui-completed", "not-run"],
    ["task-4-core-ui-completed", "failed"],
    ["unknown-progress", "passed"],
    ["task-4-core-ui-in-progress", "unknown-verification"],
  ])("rejects the impossible %s / %s pairing", (progress, verification) => {
    expect(getExpectedDayThreeLifecycle).toBeTypeOf("function");
    expect(() =>
      getExpectedDayThreeLifecycle(progress, verification),
    ).toThrow(/Day 3 lifecycle/i);
  });
});

describe("TextButton refinement authorization", () => {
  const getFiles = (value: unknown, progress = "task-4-core-ui-completed") => {
    const helper = (verificationHelpers as unknown as {
      getTextButtonRefinementFiles?: (refinements: unknown, progress: string) => {
        application: string[];
        ui: string[];
        workspace: string[];
        evidence: string[];
        required: string[];
        requireComplete: boolean;
      };
    }).getTextButtonRefinementFiles;
    expect(helper).toBeTypeOf("function");
    if (!helper) throw new Error("TextButton authorization helper is missing");
    return helper(value, progress);
  };

  function authorizedRecord() {
    const status = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as {
      phaseHistory: { tailwindB2: { componentRefinements: { textButton: Record<string, unknown> } } };
    };
    return {
      ...status.phaseHistory.tailwindB2.componentRefinements.textButton,
      implementation: "in-progress",
      automatedVerification: "not-run",
      humanGate: "not-evaluated",
    };
  }

  it("does not unlock any files without explicit refinement authorization", () => {
    expect(getFiles(undefined)).toEqual({
      application: [], ui: [], workspace: [], evidence: [], required: [], requireComplete: false,
    });
  });

  it("unlocks only the exact text-action files, not another UI family", () => {
    const files = getFiles({ textButton: authorizedRecord() });
    expect(files.application).toEqual([
      "apps/playground/src/docs/components/text-button-page.tsx",
      "apps/playground/src/docs/components/text-button-page.css",
      "apps/playground/src/docs/components/text-button-page.test.tsx",
      "apps/playground/src/docs/components/text-button-icons.tsx",
    ]);
    expect(files.ui).toEqual([
      "packages/ui/src/button/button-text.test.tsx",
      "packages/ui/src/link/link.tsx",
      "packages/ui/src/link/link.test.tsx",
    ]);
    expect(files.workspace).toEqual(["tests/e2e/text-button.spec.ts"]);
    expect(files.evidence).toEqual([
      "evidence/runtime/day-3/text-button-desktop.png",
      "evidence/runtime/day-3/text-button-mobile.png",
    ]);
    expect(files.requireComplete).toBe(false);
    expect(files.required).toEqual([]);
  });

  it.each(["not-run", "failed", "passed"])("preserves the in-progress %s check outcome", (outcome) => {
    expect(getFiles({ textButton: {
      ...authorizedRecord(), automatedVerification: outcome,
    } }).requireComplete).toBe(false);
  });

  it("completed automated work still waits for human review", () => {
    const files = getFiles({ textButton: {
      ...authorizedRecord(), implementation: "completed", automatedVerification: "passed", humanGate: "awaiting_human",
    } });
    expect(files.requireComplete).toBe(true);
    expect(files.required).toEqual([
      ...files.application, ...files.ui, ...files.workspace, ...files.evidence,
      "docs/verification/2026-09-03-text-button-implementation.md",
    ]);
  });

  it("does not permit retreating the original Day 3 phase to bypass required evidence", () => {
    expect(() => getFiles({ textButton: authorizedRecord() }, "task-4-core-ui-in-progress")).toThrow(/TextButton refinement/);
  });

  it.each([
    { authorization: "pending" },
    { scope: "all-components" },
    { designConfirmation: "not-evaluated" },
    { humanGate: "accepted" },
    { implementation: "completed", automatedVerification: "not-run", humanGate: "awaiting_human" },
    { implementation: "completed", automatedVerification: "failed", humanGate: "awaiting_human" },
    { implementation: "in-progress", automatedVerification: "unknown" },
    { doesNotAuthorize: [] },
    { extraAuthority: "publication" },
  ])("rejects wider or impossible authorization %j", (mutation) => {
    expect(() => getFiles({ textButton: { ...authorizedRecord(), ...mutation } })).toThrow(/TextButton refinement/);
  });

  it("rejects unknown parallel refinements", () => {
    expect(() => getFiles({ textButton: authorizedRecord(), card: {} })).toThrow(/TextButton refinement/);
  });
});

function iconLibraryAuthorization() {
  return {
    authorization: "authorized",
    authorizedAt: "2026-09-03",
    decisionSource: "explicit-user-request-to-enter-icon-library-implementation",
    scope: "full-figma-icon-library-runtime-and-ai-consumption",
    plan: "../docs/plans/2026-09-03-icon-library-migration.md",
    preflight: "../docs/audits/2026-09-03-icon-migration-preflight.md",
    baseline: "../evidence/runtime/icon-migration/baseline.json",
    source: { fileKey: "olqwu95QD6n4Y3IAwUdgF4", pageId: "1:3" },
    implementation: "in-progress",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
    doesNotAuthorize: [
      "other-component-redesigns", "current-phase-advance",
      "new-dependencies-or-headless-selection", "figma-write-or-publication",
      "package-or-registry-publication", "business-migration", "local-or-remote-git",
    ],
  };
}

describe("Icon library refinement authorization", () => {
  function getFiles(refinements: unknown, progress = "task-4-core-ui-completed", inventory?: unknown) {
    const helper = (verificationHelpers as unknown as {
      getIconLibraryRefinementFiles?: (refinements: unknown, progress: string, inventory?: unknown) => {
        authorized: boolean; application: string[]; ui: string[]; foundations: string[];
        workspace: string[]; evidence: string[]; required: string[]; requireComplete: boolean;
        sourceExports: string[]; referencedEvidence: string[]; uiExports: Record<string, string>;
      };
    }).getIconLibraryRefinementFiles;
    expect(helper).toBeTypeOf("function");
    if (!helper) throw new Error("Icon library authorization helper is missing");
    return helper(refinements, progress, inventory);
  }

  it("does not unlock icon files without explicit authorization", () => {
    expect(getFiles(undefined).authorized).toBe(false);
    expect(getFiles(undefined).ui).toEqual([]);
  });

  it("unlocks planned static files without granting a directory-wide exemption", () => {
    const files = getFiles({ iconLibrary: iconLibraryAuthorization() });
    expect(files.authorized).toBe(true);
    expect(files.ui).toContain("packages/ui/src/icon/icon.tsx");
    expect(files.foundations).toContain("packages/foundations/src/icons/icon-contract.ts");
    expect(files.workspace).toContain("scripts/verify-icons.mjs");
    expect(files.application).toContain("apps/playground/src/docs/icons-page.tsx");
    expect(files.evidence).toEqual(expect.arrayContaining([
      "evidence/icons/source-nodes.json", "evidence/icons/color-decisions.json", "evidence/icons/source-failures.json",
    ]));
    expect(files.ui).not.toContain("packages/ui/src/icons/edit-pencil.tsx");
    expect([...files.ui, ...files.workspace, ...files.application].some((file) => file.includes("*"))).toBe(false);
    expect(files.required).toEqual([]);
  });

  it("allows authorized icon work beside the unchanged completed text-button refinement", () => {
    const phase = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as {
      componentRefinements: { textButton: Record<string, unknown> };
    };
    const refinements = { textButton: phase.componentRefinements.textButton, iconLibrary: iconLibraryAuthorization() };
    expect(() => verificationHelpers.getTextButtonRefinementFiles(refinements, "task-4-core-ui-completed")).not.toThrow();
    expect(verificationHelpers.getTextButtonRefinementFiles(refinements, "task-4-core-ui-completed").required)
      .toContain("apps/playground/src/docs/components/text-button-icons.tsx");
    expect(getFiles(refinements).requireComplete).toBe(false);
  });

  it("retires only the superseded private fixture after completed icon replacement", () => {
    const phase = (parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as any).phaseHistory.tailwindB2;
    const textRecord = { ...phase.componentRefinements.textButton };
    const files = verificationHelpers.getTextButtonRefinementFiles({
      textButton: textRecord,
      iconLibrary: { ...iconLibraryAuthorization(), implementation: "completed", automatedVerification: "passed", humanGate: "awaiting_human" },
    }, "task-4-core-ui-completed");
    expect(files.application).not.toContain("apps/playground/src/docs/components/text-button-icons.tsx");
    expect(files.required).toContain("apps/playground/src/docs/components/text-button-page.test.tsx");
    expect(files.required).toContain("docs/verification/2026-09-03-text-button-implementation.md");
    expect(textRecord.humanGate).toBe("awaiting_human");
  });

  function acceptedIconRecord() {
    return {
      ...iconLibraryAuthorization(),
      implementation: "completed",
      automatedVerification: "passed",
      humanGate: "accepted",
      humanGateDecision: {
        acceptedAt: "2026-09-03",
        decisionSource: "explicit-user-confirmation",
        userStatement: "视觉验收完成",
        scope: "icon-library-visual-only",
        evidence: "../evidence/runtime/icon-migration/verification.md",
      },
    };
  }

  it("records explicit visual acceptance without granting more files or closing text-button review", () => {
    const accepted = acceptedIconRecord();
    const phase = (parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as any).phaseHistory.tailwindB2;
    const pending = { ...iconLibraryAuthorization(), implementation: "completed", automatedVerification: "passed", humanGate: "awaiting_human" };
    expect(getFiles({ iconLibrary: accepted })).toEqual(getFiles({ iconLibrary: pending }));
    expect(() => verificationHelpers.getTextButtonRefinementFiles({
      iconLibrary: accepted, textButton: phase.componentRefinements.textButton,
    }, "task-4-core-ui-completed")).not.toThrow();
    expect(phase.componentRefinements.textButton.humanGate).toBe("awaiting_human");
  });

  function sourceRepairAuthorization() {
    return {
      authorization: "authorized",
      authorizedAt: "2026-09-03",
      decisionSource: "explicit-user-request-to-repair-two-source-icon-anomalies",
      userStatement: "修复两个源图形异常",
      scope: "two-source-icons-original-geometry-repair-and-local-reexport",
      source: {
        fileKey: "olqwu95QD6n4Y3IAwUdgF4",
        nodes: [
          { assetId: "icon/editor-redo", nodeId: "84:35" },
          { assetId: "icon/editor-undo", nodeId: "84:32" },
        ],
      },
      allowedActions: [
        "restore-original-geometry-only-at-listed-source-nodes",
        "reexport-two-icons-and-update-local-runtime-and-evidence",
      ],
      evidence: "../evidence/icons/source-repairs.json",
      visualEvidence: "../evidence/runtime/icon-migration/source-repair.png",
      implementation: "in-progress",
      automatedVerification: "not-run",
      humanGate: "awaiting_human",
      doesNotAuthorize: [
        "other-figma-node-writes", "figma-component-or-variant-publication",
        "other-component-redesigns", "current-phase-advance",
        "new-dependencies-or-headless-selection", "package-or-registry-publication",
        "business-migration", "local-or-remote-git",
      ],
    };
  }

  const sourceRepairFiles = [
    "evidence/icons/source-repairs.json",
    "evidence/runtime/icon-migration/source-repair.png",
    "tests/e2e/icon-source-repair.spec.ts",
  ];

  it("unlocks only the separate source repair evidence while preserving the accepted library", () => {
    const original = acceptedIconRecord();
    const record = { ...original, sourceRepair: sourceRepairAuthorization() };
    const files = getFiles({ iconLibrary: record });
    const before = getFiles({ iconLibrary: original });
    expect(files.evidence.filter((file) => !before.evidence.includes(file))).toEqual(sourceRepairFiles.slice(0, 2));
    expect(files.workspace.filter((file) => !before.workspace.includes(file))).toEqual(sourceRepairFiles.slice(2));
    expect(files.required).toEqual(before.required);
    expect(files.ui).toEqual(before.ui);
    expect(files.requireComplete).toBe(true);
    expect(record.humanGate).toBe("accepted");
    expect(record.humanGateDecision).toEqual(original.humanGateDecision);
    expect(record.sourceRepair.humanGate).toBe("awaiting_human");
    expect(record.doesNotAuthorize).toEqual(original.doesNotAuthorize);
  });

  it("requires completed source repair evidence without closing its independent human gate", () => {
    const files = getFiles({ iconLibrary: {
      ...acceptedIconRecord(),
      sourceRepair: { ...sourceRepairAuthorization(), implementation: "completed", automatedVerification: "passed" },
    } });
    expect(files.required).toEqual(expect.arrayContaining(sourceRepairFiles));
  });

  function acceptedSourceRepair() {
    return {
      ...sourceRepairAuthorization(),
      implementation: "completed",
      automatedVerification: "passed",
      humanGate: "accepted",
      humanGateDecision: {
        acceptedAt: "2026-09-03",
        decisionSource: "explicit-user-confirmation",
        userStatement: "确定",
        scope: "two-source-icons-visual-only",
        evidence: "../evidence/runtime/icon-migration/verification.md",
      },
    };
  }

  it("accepts the explicit two-icon repair visual confirmation without expanding authorized files", () => {
    const pending = {
      ...acceptedIconRecord(),
      sourceRepair: { ...sourceRepairAuthorization(), implementation: "completed", automatedVerification: "passed" },
    };
    const accepted = { ...acceptedIconRecord(), sourceRepair: acceptedSourceRepair() };
    expect(getFiles({ iconLibrary: accepted })).toEqual(getFiles({ iconLibrary: pending }));
    expect(accepted.humanGateDecision).toEqual(pending.humanGateDecision);
    expect(accepted.doesNotAuthorize).toEqual(pending.doesNotAuthorize);
  });

  it("rejects completed source repair acceptance without a human decision", () => {
    expect(() => getFiles({ iconLibrary: {
      ...acceptedIconRecord(),
      sourceRepair: {
        ...sourceRepairAuthorization(), implementation: "completed", automatedVerification: "passed", humanGate: "accepted",
      },
    } })).toThrow(/Icon library refinement/);
  });

  it.each([
    { humanGateDecision: undefined },
    { humanGateDecision: { ...acceptedSourceRepair().humanGateDecision, acceptedAt: "2026-09-04" } },
    { humanGateDecision: { ...acceptedSourceRepair().humanGateDecision, decisionSource: "automated-test" } },
    { humanGateDecision: { ...acceptedSourceRepair().humanGateDecision, userStatement: "" } },
    { humanGateDecision: { ...acceptedSourceRepair().humanGateDecision, scope: "icon-library-visual-only" } },
    { humanGateDecision: { ...acceptedSourceRepair().humanGateDecision, evidence: "../evidence/icons/another-repair.json" } },
    { humanGateDecision: { ...acceptedSourceRepair().humanGateDecision, publication: "authorized" } },
    { implementation: "in-progress" },
    { automatedVerification: "not-run" },
    { automatedVerification: "failed" },
    { humanGate: "awaiting_human" },
    { humanGate: "not-evaluated" },
    { doesNotAuthorize: [] },
  ])("rejects unsupported source repair acceptance or expanded authority %j", (mutation) => {
    expect(() => getFiles({ iconLibrary: {
      ...acceptedIconRecord(), sourceRepair: { ...acceptedSourceRepair(), ...mutation },
    } })).toThrow(/Icon library refinement/);
  });

  it.each([
    undefined, null, [], {},
    { ...sourceRepairAuthorization(), authorization: "pending" },
    { ...sourceRepairAuthorization(), authorizedAt: "2026-09-04" },
    { ...sourceRepairAuthorization(), decisionSource: "automated-test" },
    { ...sourceRepairAuthorization(), userStatement: "" },
    { ...sourceRepairAuthorization(), scope: "all-figma-icons" },
    { ...sourceRepairAuthorization(), source: { ...sourceRepairAuthorization().source, fileKey: "another-file" } },
    { ...sourceRepairAuthorization(), source: { ...sourceRepairAuthorization().source, nodes: [{ assetId: "icon/editor-redo", nodeId: "84:35" }] } },
    { ...sourceRepairAuthorization(), source: { ...sourceRepairAuthorization().source, nodes: [...sourceRepairAuthorization().source.nodes, { assetId: "icon/close", nodeId: "8:2" }] } },
    { ...sourceRepairAuthorization(), source: { ...sourceRepairAuthorization().source, extraAuthority: "publication" } },
    { ...sourceRepairAuthorization(), allowedActions: ["figma-write"] },
    { ...sourceRepairAuthorization(), evidence: "../evidence/icons/another-repair.json" },
    { ...sourceRepairAuthorization(), visualEvidence: "../evidence/runtime/icon-migration/another-repair.png" },
    { ...sourceRepairAuthorization(), implementation: "unknown" },
    { ...sourceRepairAuthorization(), automatedVerification: "unknown" },
    { ...sourceRepairAuthorization(), humanGate: "accepted" },
    { ...sourceRepairAuthorization(), humanGate: "not-evaluated" },
    { ...sourceRepairAuthorization(), implementation: "completed", automatedVerification: "not-run" },
    { ...sourceRepairAuthorization(), implementation: "completed", automatedVerification: "failed" },
    { ...sourceRepairAuthorization(), doesNotAuthorize: [] },
    { ...sourceRepairAuthorization(), extraAuthority: "publication" },
  ])("fails closed for malformed or expanded source repair authorization %j", (sourceRepair) => {
    expect(() => getFiles({ iconLibrary: { ...acceptedIconRecord(), sourceRepair } })).toThrow(/Icon library refinement/);
  });

  it("does not attach the source repair exception to an unaccepted icon library", () => {
    expect(() => getFiles({ iconLibrary: {
      ...iconLibraryAuthorization(), sourceRepair: sourceRepairAuthorization(),
    } })).toThrow(/Icon library refinement/);
  });

  it.each([
    { humanGateDecision: undefined },
    { humanGateDecision: { ...acceptedIconRecord().humanGateDecision, decisionSource: "automated-test" } },
    { humanGateDecision: { ...acceptedIconRecord().humanGateDecision, scope: "all-components" } },
    { humanGateDecision: { ...acceptedIconRecord().humanGateDecision, userStatement: "" } },
    { humanGateDecision: { ...acceptedIconRecord().humanGateDecision, publication: "authorized" } },
    { implementation: "in-progress" },
    { automatedVerification: "failed" },
    { humanGate: "awaiting_human" },
    { doesNotAuthorize: [] },
  ])("rejects unsupported visual acceptance or expanded authority %j", (mutation) => {
    expect(() => getFiles({ iconLibrary: { ...acceptedIconRecord(), ...mutation } })).toThrow(/Icon library refinement/);
  });

  it.each([
    { authorization: "pending" }, { scope: "all-components" },
    { source: { fileKey: "another-file", pageId: "1:3" } },
    { automatedVerification: "unknown" }, { humanGate: "accepted" },
    { implementation: "completed", automatedVerification: "not-run", humanGate: "awaiting_human" },
    { doesNotAuthorize: [] }, { extraAuthority: "publication" },
  ])("rejects widened or impossible icon authorization %j", (mutation) => {
    expect(() => getFiles({ iconLibrary: { ...iconLibraryAuthorization(), ...mutation } })).toThrow(/Icon library refinement/);
  });

  it("does not allow an unknown parallel refinement or an earlier parent phase", () => {
    expect(() => getFiles({ iconLibrary: iconLibraryAuthorization(), dialog: {} })).toThrow(/Icon library refinement/);
    expect(() => getFiles({ iconLibrary: iconLibraryAuthorization() }, "task-4-core-ui-in-progress")).toThrow(/Icon library refinement/);
  });

  function inventory() {
    return {
      schemaVersion: "1.0",
      source: { fileKey: "olqwu95QD6n4Y3IAwUdgF4", pageId: "1:3", pageName: "02 · Icons", readAt: "2026-09-03", count: 1 },
      availableCount: 1, unavailableCount: 0,
      icons: [{
        assetId: "icon/arrow-down", name: "icon/arrow-down", slug: "arrow-down", nodeId: "63:76",
        componentKey: "457881b00122d6cdfc873ab4dd68c5cbaaebd1dd", canvas: [24, 24],
        availability: "available", viewBox: "0 0 24 24",
        sourceExport: { path: "evidence/icons/source-exports/arrow-down.svg", sha256: "a".repeat(64) },
        runtime: { modulePath: "packages/ui/src/icons/arrow-down.tsx", assetPath: "packages/ui/src/icons/assets/arrow-down.svg", exportName: "ArrowDownIcon", sourcePath: "evidence/icons/source-exports/arrow-down.svg" },
        colorMode: "host", rendering: "svg-mask",
      }],
    };
  }

  it("derives generated files and exports only from validated inventory identities", () => {
    const files = getFiles({ iconLibrary: iconLibraryAuthorization() }, undefined, inventory());
    expect(files.ui).toContain("packages/ui/src/icons/arrow-down.tsx");
    expect(files.ui).toContain("packages/ui/src/icons/assets/arrow-down.svg");
    expect(files.ui).not.toContain("packages/ui/src/icons/edit-pencil.tsx");
    expect(files.sourceExports).toEqual(["evidence/icons/source-exports/arrow-down.svg"]);
    expect(files.uiExports["./icons/arrow-down"]).toBe("./src/icons/arrow-down.tsx");
  });

  it("allows an exact supplemental source PNG only when inventory registers its hash and runtime relationship", () => {
    const value = inventory();
    Object.assign(value.icons[0]!, {
      rendering: "png-mask",
      rasterExport: { path: "evidence/icons/source-exports/arrow-down.png", sha256: "b".repeat(64) },
      runtime: { ...value.icons[0]!.runtime, assetPath: "packages/ui/src/icons/assets/arrow-down.png", sourcePath: "evidence/icons/source-exports/arrow-down.png" },
    });
    const files = getFiles({ iconLibrary: iconLibraryAuthorization() }, undefined, value);
    expect(files.sourceExports).toEqual([
      "evidence/icons/source-exports/arrow-down.svg", "evidence/icons/source-exports/arrow-down.png",
    ]);
    expect(files.ui).toContain("packages/ui/src/icons/assets/arrow-down.png");
  });

  it("matches the generator's exact export for names beginning with a number", () => {
    const value = inventory();
    Object.assign(value.icons[0]!, {
      assetId: "icon/3d-cube", name: "icon/3d-cube", slug: "3d-cube",
      sourceExport: { path: "evidence/icons/source-exports/3d-cube.svg", sha256: "a".repeat(64) },
      runtime: { modulePath: "packages/ui/src/icons/3d-cube.tsx", assetPath: "packages/ui/src/icons/assets/3d-cube.svg", exportName: "Icon3dCube", sourcePath: "evidence/icons/source-exports/3d-cube.svg" },
    });
    expect(getFiles({ iconLibrary: iconLibraryAuthorization() }, undefined, value).uiExports["./icons/3d-cube"])
      .toBe("./src/icons/3d-cube.tsx");
  });

  function unavailableInventory() {
    const value = inventory();
    const { runtime: _runtime, sourceExport: _sourceExport, rendering: _rendering, ...identity } = value.icons[0]!;
    return { ...value, availableCount: 0, unavailableCount: 1, icons: [{ ...identity, availability: "source-unavailable", viewBox: null, runtime: null,
      sourceFailure: { evidencePath: "evidence/icons/source-failures.json", error: "no visible source layers" },
    }] };
  }

  it("retains source-unavailable identities without granting runtime files or exports", () => {
    const value = unavailableInventory();
    value.icons.push({ ...value.icons[0]!, assetId: "icon/arrow-up", name: "icon/arrow-up", slug: "arrow-up", nodeId: "63:77", componentKey: "b".repeat(40) });
    value.source.count = 2;
    value.unavailableCount = 2;
    const files = getFiles({ iconLibrary: iconLibraryAuthorization() }, undefined, value);
    expect(files.ui).not.toContain("packages/ui/src/icons/arrow-down.tsx");
    expect(files.uiExports).not.toHaveProperty("./icons/arrow-down");
    expect(files.sourceExports).toEqual([]);
    expect(files.referencedEvidence).toEqual(["evidence/icons/source-failures.json"]);
    expect(files.requireComplete).toBe(false);
  });

  it("can retain a transparent failure PNG as evidence without creating a usable image", () => {
    const value = unavailableInventory();
    Object.assign(value.icons[0]!, { rasterExport: { path: "evidence/icons/source-exports/arrow-down.png", sha256: "b".repeat(64) } });
    const files = getFiles({ iconLibrary: iconLibraryAuthorization() }, undefined, value);
    expect(files.sourceExports).toEqual(["evidence/icons/source-exports/arrow-down.png"]);
    expect(files.ui).not.toContain("packages/ui/src/icons/assets/arrow-down.png");
  });

  it.each([
    { sourceFailure: null },
    { sourceFailure: { evidencePath: "evidence/icons/source-failures.json", error: " " } },
    { sourceFailure: { evidencePath: "evidence/icons/unreviewed-failures.json", error: "no visible layers" } },
    { runtime: { modulePath: "packages/ui/src/icons/arrow-down.tsx" } },
    { rendering: "svg-mask" }, { viewBox: "0 0 24 24" },
    { sourceExport: { path: "evidence/icons/source-exports/arrow-down.svg", sha256: "a".repeat(64) } },
  ])("rejects unproven source failures or fabricated usable output %j", (mutation) => {
    const value = unavailableInventory();
    Object.assign(value.icons[0]!, mutation);
    expect(() => getFiles({ iconLibrary: iconLibraryAuthorization() }, undefined, value)).toThrow(/Icon inventory/);
  });

  it.each([
    { slug: "../dialog" },
    { assetId: "icon/arrow-up", name: "icon/arrow-up" },
    { availability: undefined }, { availability: "skipped" },
    { sourceExport: { path: "evidence/icons/source-exports/../../private.svg", sha256: "a".repeat(64) } },
    { sourceExport: { path: "evidence/icons/source-exports/arrow-down.svg", sha256: "not-a-hash" } },
    { sourceExport: { path: "evidence/icons/source-exports/arrow-down.png", sha256: "a".repeat(64) } },
    { rasterExport: { path: "evidence/icons/source-exports/other.png", sha256: "a".repeat(64) } },
    { rasterExport: { path: "evidence/icons/source-exports/arrow-down.png", sha256: "not-a-hash" } },
    { sourceFailure: { evidencePath: "evidence/icons/source-failures.json", error: "no visible source layers" } },
    { runtime: { modulePath: "packages/ui/src/icons/arrow-down.tsx", assetPath: "packages/ui/src/icons/assets/arrow-down.svg", exportName: "ArrowDownIcon", sourcePath: "evidence/icons/source-exports/other.svg" } },
    { runtime: { modulePath: "packages/ui/src/icons/arrow-down.tsx", assetPath: "packages/ui/src/icons/assets/arrow-down.png", exportName: "ArrowDownIcon", sourcePath: "evidence/icons/source-exports/arrow-down.png" }, rendering: "png-mask" },
    { runtime: { modulePath: "packages/ui/src/icons/arrow-down.tsx", assetPath: "packages/ui/src/icons/assets/arrow-down.svg", exportName: "UnrelatedIcon", sourcePath: "evidence/icons/source-exports/arrow-down.svg" } },
    { runtime: { modulePath: "packages/ui/src/dialog/dialog.tsx", assetPath: "packages/ui/src/icons/assets/arrow-down.svg", exportName: "ArrowDownIcon" } },
    { runtime: { modulePath: "packages/ui/src/icons/arrow-down.tsx", assetPath: "packages/ui/src/icons/assets/other.svg", exportName: "ArrowDownIcon" } },
    { colorMode: "guessed" }, { rendering: "script" },
  ])("rejects inventory data that widens the allowed files %j", (mutation) => {
    const value = inventory();
    Object.assign(value.icons[0]!, mutation);
    expect(() => getFiles({ iconLibrary: iconLibraryAuthorization() }, undefined, value)).toThrow(/Icon inventory/);
  });

  it("rejects duplicate identities and count mismatches", () => {
    const duplicate = inventory();
    duplicate.icons.push({ ...duplicate.icons[0]! });
    duplicate.source.count = 2;
    expect(() => getFiles({ iconLibrary: iconLibraryAuthorization() }, undefined, duplicate)).toThrow(/Icon inventory/);
    const mismatch = inventory();
    mismatch.source.count = 897;
    expect(() => getFiles({ iconLibrary: iconLibraryAuthorization() }, undefined, mismatch)).toThrow(/Icon inventory/);
  });

  it.each([
    { availableCount: 0, unavailableCount: 1 },
    { availableCount: 1, unavailableCount: 1 },
    { availableCount: undefined },
  ])("rejects summary counts that misrepresent runtime availability %j", (mutation) => {
    const value = inventory();
    Object.assign(value, mutation);
    expect(() => getFiles({ iconLibrary: iconLibraryAuthorization() }, undefined, value)).toThrow(/Icon inventory/);
  });
});

describe("Icon library workspace command boundary", () => {
  function checkCommands(mutation?: Record<string, string | undefined>, extraFile?: string, script = "verify-workspace.mjs", fixtureFiles: Record<string, string> = {}) {
    const fixtureRoot = mkdtempSync(join(tmpdir(), "rain-icon-workspace-gate-"));
    try {
      const baseline = JSON.parse(readWorkspaceFile("evidence/runtime/icon-migration/baseline.json")) as {
        files: Array<{ path: string }>;
      };
      for (const { path: filePath } of baseline.files) {
        const source = join(workspaceRoot, filePath);
        if (!existsSync(source)) continue;
        const target = join(fixtureRoot, filePath);
        mkdirSync(dirname(target), { recursive: true });
        cpSync(source, target);
      }
      const packagePath = join(fixtureRoot, "package.json");
      writeFileSync(join(fixtureRoot, "status/current-phase.yaml"), readFrozenB2File("status/current-phase.yaml"));
      writeFileSync(join(fixtureRoot, "pnpm-lock.yaml"), readFrozenB2File("pnpm-lock.yaml"));
      const rootPackage = JSON.parse(readFrozenB2File("package.json"));
      rootPackage.scripts["generate:icons"] = "node scripts/generate-icons.mjs";
      rootPackage.scripts["verify:icons"] = "node scripts/verify-icons.mjs";
      rootPackage.scripts.verify = "pnpm verify:governance && pnpm verify:icons && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e";
      Object.assign(rootPackage.scripts, mutation);
      writeFileSync(packagePath, JSON.stringify(rootPackage));
      if (extraFile) {
        const target = join(fixtureRoot, extraFile);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, "{}");
      }
      for (const [filePath, content] of Object.entries(fixtureFiles)) {
        const target = join(fixtureRoot, filePath);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, content);
      }
      return spawnSync(process.execPath, [join(workspaceRoot, "scripts", script)], {
        cwd: fixtureRoot, encoding: "utf8",
      });
    } finally {
      rmSync(fixtureRoot, { force: true, recursive: true });
    }
  }

  it("accepts only the two authorized icon commands and preserves the original quality chain", () => {
    const result = checkCommands();
    expect(`${result.stdout}${result.stderr}`).toContain("Workspace verification passed");
    expect(result.status).toBe(0);
  });

  it.each([
    { "verify:icons": "node scripts/unreviewed-icons.mjs" },
    { verify: "pnpm verify:icons" },
    { postinstall: "node scripts/generate-icons.mjs" },
  ])("rejects a replaced or expanded command chain %j", (mutation) => {
    const result = checkCommands(mutation);
    expect(result.status).toBe(1);
    expect(`${result.stdout}${result.stderr}`).toMatch(/scripts? .*must|command set/);
  });

  it.each([
    "packages/foundations/src/icons/unregistered.json",
    "evidence/icons/source-exports/unregistered.png",
    "evidence/runtime/icon-migration/gallery-unreviewed.png",
    "evidence/runtime/icon-migration/vibe-consumer-extra.tsx",
  ])("rejects an unregistered icon file even when it is not a source-code extension: %s", (filePath) => {
    const result = checkCommands(undefined, filePath, "verify-boundaries.mjs");
    expect(`${result.stdout}${result.stderr}`).toContain(`Icon library file outside the exact plan/inventory: ${filePath}`);
  });

  it("accepts the individually authorized browser, bundle, and independent-consumer evidence paths", () => {
    const paths = [
      "tests/e2e/icon-rendering.spec.ts",
      "evidence/runtime/icon-migration/visual-references.json",
      "evidence/runtime/icon-migration/consumer-bundle.json",
      "evidence/runtime/icon-migration/gallery.png",
      "evidence/runtime/icon-migration/semantic-examples.png",
      "evidence/runtime/icon-migration/source-failures.png",
      "evidence/runtime/icon-migration/color-review.png",
      "evidence/runtime/icon-migration/vibe-consumer.tsx",
      "evidence/runtime/icon-migration/vibe-consumer.png",
      "evidence/runtime/icon-migration/baseline-comparison.json",
    ];
    const result = checkCommands(undefined, undefined, "verify-boundaries.mjs", Object.fromEntries(paths.map((path) => [path, "{}"])));
    const output = `${result.stdout}${result.stderr}`;
    expect(output).not.toContain("Icon library file outside the exact plan/inventory:");
    expect(output).not.toContain("source file outside the complete Day 3 allowlist:");
  });

  it("requires referenced source-failure evidence even while implementation is still in progress", () => {
    const inventory = {
      schemaVersion: "1.0", source: { fileKey: "olqwu95QD6n4Y3IAwUdgF4", pageId: "1:3", count: 1 },
      availableCount: 0, unavailableCount: 1,
      icons: [{ assetId: "icon/editor-redo", name: "icon/editor-redo", slug: "editor-redo", nodeId: "84:35",
        componentKey: "a".repeat(40), canvas: [24, 24], availability: "source-unavailable", runtime: null,
        sourceFailure: { evidencePath: "evidence/icons/source-failures.json", error: "no visible source layers" },
      }],
    };
    const fixtureFiles = { "evidence/icons/inventory.json": JSON.stringify(inventory) };
    const missing = checkCommands(undefined, undefined, "verify-boundaries.mjs", fixtureFiles);
    expect(`${missing.stdout}${missing.stderr}`).toContain("Referenced icon evidence is missing: evidence/icons/source-failures.json");
    const empty = checkCommands(undefined, undefined, "verify-boundaries.mjs", { ...fixtureFiles, "evidence/icons/source-failures.json": "" });
    expect(`${empty.stdout}${empty.stderr}`).toContain("Referenced icon evidence must be a non-empty regular file: evidence/icons/source-failures.json");
  });
});

describe("private reference color detection", () => {
  it("detects direct runtime consumption while ignoring comments", () => {
    const usesPrivateReferenceColor = (
      verificationHelpers as unknown as {
        usesPrivateReferenceColor?: (source: string) => boolean;
      }
    ).usesPrivateReferenceColor;
    expect(usesPrivateReferenceColor).toBeTypeOf("function");
    if (!usesPrivateReferenceColor) return;

    expect(
      usesPrivateReferenceColor(
        ".consumer { color: var(--rain-ref-blue-500); }",
      ),
    ).toBe(true);
    expect(
      usesPrivateReferenceColor(
        ".consumer { color: var(--rain-color-text-link); }",
      ),
    ).toBe(false);
    expect(
      usesPrivateReferenceColor(
        "/* never consume var(--rain-ref-blue-500) here */",
      ),
    ).toBe(false);
  });
});

describe("Foundation module dependency detection", () => {
  function hasUiDependency(source: string) {
    const detect = (verificationHelpers as unknown as {
      hasRainUiModuleDependency?: (source: string) => boolean;
    }).hasRainUiModuleDependency;
    expect(detect).toBeTypeOf("function");
    if (!detect) throw new Error("Module dependency detection is missing");
    return detect(source);
  }

  it("allows metadata import paths and copyable example strings without creating a reverse dependency", () => {
    expect(hasUiDependency(`
      // UI consumers import from "@rain-next/ui".
      export const item = { importPath: "@rain-next/ui/icons/edit-pencil", example: 'import { Icon } from "@rain-next/ui/icon";' };
    `)).toBe(false);
  });

  it.each([
    'import { Icon } from "@rain-next/ui/icon";',
    'export { Button } from "@rain-next/ui";',
    'import "@rain-next/ui/styles.css";',
    'const ui = import("@rain-next/ui");',
    'const ui = require("@rain-next/ui");',
    'type Props = import("@rain-next/ui").ButtonProps;',
  ])("still rejects a real reverse dependency: %s", (source) => {
    expect(hasUiDependency(source)).toBe(true);
  });
});

describe("Day 2 binary and lockfile evidence helpers", () => {
  it("reads PNG signature and IHDR dimensions while rejecting corrupt input", () => {
    const inspectPngMetadata = (
      verificationHelpers as unknown as {
        inspectPngMetadata?: (source: Buffer) => {
          height: number;
          width: number;
        };
      }
    ).inspectPngMetadata;
    expect(inspectPngMetadata).toBeTypeOf("function");
    if (!inspectPngMetadata) return;

    const pngHeader = Buffer.alloc(33);
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(
      pngHeader,
    );
    pngHeader.writeUInt32BE(13, 8);
    pngHeader.write("IHDR", 12, "ascii");
    pngHeader.writeUInt32BE(1440, 16);
    pngHeader.writeUInt32BE(4368, 20);

    expect(inspectPngMetadata(pngHeader)).toEqual({
      height: 4368,
      width: 1440,
    });
    expect(() => inspectPngMetadata(Buffer.from("x"))).toThrow(/PNG/i);

    const invalidSignature = Buffer.from(pngHeader);
    invalidSignature[0] = 0;
    expect(() => inspectPngMetadata(invalidSignature)).toThrow(/signature/i);

    const invalidIhdr = Buffer.from(pngHeader);
    invalidIhdr.write("IDAT", 12, "ascii");
    expect(() => inspectPngMetadata(invalidIhdr)).toThrow(/IHDR/i);
  });

  it("extracts every top-level pnpm importer, including phantom entries", () => {
    const parsePnpmLockfileImporters = (
      verificationHelpers as unknown as {
        parsePnpmLockfileImporters?: (source: string) => string[];
      }
    ).parsePnpmLockfileImporters;
    expect(parsePnpmLockfileImporters).toBeTypeOf("function");
    if (!parsePnpmLockfileImporters) return;

    const importers = parsePnpmLockfileImporters(`lockfileVersion: '9.0'

importers:

  .:
    devDependencies: {}

  apps/playground:
    dependencies: {}

  packages/foundations:
    dependencies: {}

  packages/ui:
    dependencies: {}

packages: {}
`);

    expect(importers).toEqual([
      ".",
      "apps/playground",
      "packages/foundations",
      "packages/ui",
    ]);

    expect(() =>
      parsePnpmLockfileImporters(`lockfileVersion: '9.0'\n\npackages: {}\n`),
    ).toThrow(/importers/i);
  });
});

describe("historical lifecycle and typecheck governance", () => {
  it("keeps the Day 2.1 result as historical evidence after Day 3 starts", () => {
    const status = parseYamlSubset(
      readWorkspaceFile("status/current-phase.yaml"),
    ) as {
      currentPhase?: { id?: string; progress?: string };
      checkpoints?: Array<{
        id?: string;
        status?: string;
        requiredEvidence?: string[];
      }>;
      independentLifecycle?: Record<string, unknown>;
    };
    const dayThreeCheckpoint = status.checkpoints?.find(
      ({ id }) => id === "day-3-core-ui-start",
    );
    const dayTwoEvidenceReadme = readWorkspaceFile(
      "evidence/runtime/day-2/README.md",
    );
    const dayThree = ["tailwind-b2-composition-contract", "token-foundations-v1"].includes(String(status.currentPhase?.id))
      ? verificationHelpers.getValidatedDayThreeHistory(verificationHelpers.getCurrentB2Status(status)) : status;

    expect(dayThree.currentPhase?.id).toBe("foundation-spike-day-3");
    expect([
      "task-4-core-ui-in-progress",
      "task-4-core-ui-completed",
    ]).toContain(dayThree.currentPhase?.progress);
    expect(dayThreeCheckpoint).toMatchObject({
      status: "authorized",
    });
    expect(dayThreeCheckpoint?.requiredEvidence).toContain(
      "Day 2 Foundations 与 Day 2.1 Focus/颜色修正已完成自动验证",
    );
    expect(dayTwoEvidenceReadme).toContain("不表示 Human Gate");
    expect(dayThree.independentLifecycle?.humanGate).toBe("not-evaluated");
  });

  it("makes the root typecheck cover Day 2 tests and test configs", () => {
    const rootPackage = JSON.parse(readWorkspaceFile("package.json"));
    const configPath = join(workspaceRoot, "tsconfig.tests.json");

    expect(rootPackage.scripts.typecheck).toBe(
      "pnpm -r typecheck && tsc --noEmit --project tsconfig.tests.json",
    );
    expect(existsSync(configPath)).toBe(true);
    if (!existsSync(configPath)) return;

    const testsConfig = JSON.parse(readFileSync(configPath, "utf8"));
    expect(testsConfig.compilerOptions?.noEmit).toBe(true);
    expect(testsConfig.include).toEqual([
      "apps/**/*.test.ts",
      "apps/**/*.test.tsx",
      "packages/**/*.test.ts",
      "packages/**/*.test.tsx",
      "tests/**/*.ts",
      "scripts/**/*.test.ts",
      "playwright.config.ts",
      "vitest.config.ts",
    ]);
  });

  it("rejects a coordinated Day 2 project lifecycle drift", () => {
    const fixtureRoot = createEvidenceFixture();
    try {
      for (const registryPath of [
        "evidence/visual-evidence.yaml",
        "benchmarks/benchmark-registry.yaml",
      ]) {
        writeFixtureMutation(
          fixtureRoot,
          registryPath,
          "projectLifecycle:",
          'figmaMaterialWrite: "not-authorized"',
          'figmaMaterialWrite: "authorized"',
        );
      }
      writeFixtureMutation(
        fixtureRoot,
        "status/current-phase.yaml",
        "independentLifecycle:",
        'figmaEditableMaterial: "not-authorized"',
        'figmaEditableMaterial: "authorized"',
      );

      const result = runEvidenceVerification(fixtureRoot);
      expect(result.status).toBe(1);
      expect(`${result.stdout}${result.stderr}`).toMatch(
        /project lifecycle mismatch/i,
      );
    } finally {
      rmSync(fixtureRoot, { force: true, recursive: true });
    }
  });

  it.each([
    ["implementation", "not-started", "in-progress"],
    ["automatedVerification", "not-run", "passed"],
    ["humanGate", "not-evaluated", "passed"],
  ] as const)(
    "rejects a coordinated Day 2 Visual Evidence %s drift",
    (field, before, after) => {
      const fixtureRoot = createEvidenceFixture();
      try {
        writeFixtureMutation(
          fixtureRoot,
          "evidence/visual-evidence.yaml",
          '  - id: "VE-001"',
          `${field}: "${before}"`,
          `${field}: "${after}"`,
        );
        writeFixtureMutation(
          fixtureRoot,
          "apps/playground/src/docs/evidence-index.ts",
          'id: "VE-001"',
          `${field}: "${before}"`,
          `${field}: "${after}"`,
        );

        const result = runEvidenceVerification(fixtureRoot);
        expect(result.status).toBe(1);
        expect(`${result.stdout}${result.stderr}`).toMatch(
          /VE-001 lifecycle mismatch/i,
        );
      } finally {
        rmSync(fixtureRoot, { force: true, recursive: true });
      }
    },
  );

  it.each([
    ["implementation", "not-started", "in-progress"],
    ["automatedVerification", "not-run", "passed"],
    ["humanGate", "not-evaluated", "passed"],
  ] as const)(
    "rejects a coordinated Day 2 Benchmark %s drift",
    (field, before, after) => {
      const fixtureRoot = createEvidenceFixture();
      try {
        writeFixtureMutation(
          fixtureRoot,
          "benchmarks/benchmark-registry.yaml",
          '  - id: "BM-A"',
          `${field}: "${before}"`,
          `${field}: "${after}"`,
        );
        writeFixtureMutation(
          fixtureRoot,
          "apps/playground/src/docs/benchmark-index.ts",
          'id: "BM-A"',
          `${field}: "${before}"`,
          `${field}: "${after}"`,
        );

        const result = runEvidenceVerification(fixtureRoot);
        expect(result.status).toBe(1);
        expect(`${result.stdout}${result.stderr}`).toMatch(
          /BM-A lifecycle mismatch/i,
        );
      } finally {
        rmSync(fixtureRoot, { force: true, recursive: true });
      }
    },
  );
});

describe("Day 3 Core UI authorization", () => {
  it("records a valid independent outcome without widening publication or Git authority", () => {
    const status = parseYamlSubset(
      readWorkspaceFile("status/current-phase.yaml"),
    ) as {
      currentPhase?: Record<string, unknown>;
      componentHumanGates?: {
        button?: Record<string, unknown>;
        remainingCoreUiFamilies?: Record<string, unknown>;
      };
      independentAuditCheckpoints?: {
        rainClassicToRainNextReuseAuditCp3?: Record<string, unknown>;
      };
      independentLifecycle?: Record<string, unknown>;
    };

    const dayThree = ["tailwind-b2-composition-contract", "token-foundations-v1"].includes(String(status.currentPhase?.id))
      ? verificationHelpers.getValidatedDayThreeHistory(verificationHelpers.getCurrentB2Status(status)) : status;
    expect(dayThree.currentPhase).toMatchObject({
      id: "foundation-spike-day-3",
      status: "authorized",
      workMode: "system-mode-ui",
      authorizationScope: "day-3-task-4-core-ui-families",
    });
    expect(dayThree.independentLifecycle).toEqual(
      getExpectedDayThreeLifecycle(
        String(dayThree.currentPhase?.progress),
        String(dayThree.independentLifecycle?.automatedVerification),
      ),
    );
    expect(status.componentHumanGates?.button).toEqual({
      gateId: "day-3-button-human-gate",
      status: "accepted",
      acceptedAt: "2026-09-03",
      decisionSource: "explicit-user-confirmation-after-live-browser-review",
      scope: "button-visual-and-interaction-only",
      acceptedCandidateValues: {
        dangerColor: "#EF5353",
        focusHaloOpacity: "20%",
        largeButtonHeight: "40px",
        loadingOpacity: "0.82",
      },
      doesNotAuthorize: [
        "other-core-ui-human-gates",
        "figma-write-or-publication",
        "package-or-registry-publication",
        "business-migration",
        "local-or-remote-git",
      ],
    });
    expect(status.componentHumanGates?.remainingCoreUiFamilies).toEqual({
      status: "not-evaluated",
      families: ["Input", "Tag/Badge", "Surface/Card"],
    });
    expect(
      status.independentAuditCheckpoints?.rainClassicToRainNextReuseAuditCp3,
    ).toMatchObject({
      checkpointId: "CP3",
      status: "accepted",
      scope: "reuse-audit-human-gate-only",
    });
  });
});

describe("OptionButton 32 refinement authorization", () => {
  const authorization = {
    authorization: "authorized", authorizedAt: "2026-09-08",
    decisionSource: "explicit-user-continue-next-question-option-batch", userStatement: "继续推进下一批",
    scope: "option-button-32-single-multiple-standalone-and-text-row",
    plan: "../docs/plans/2026-09-08-option-button-implementation.md", designConfirmation: "accepted",
    implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run", humanGate: "not-evaluated",
    doesNotAuthorize: [
      "other-sizes-result-feedback-readonly-judgment-or-rich-media", "existing-component-migration-or-visual-changes",
      "new-dependencies-or-business-progress", "figma-publication-business-migration-or-git",
    ],
  };
  const status = () => ({ currentPhase: { id: "token-foundations-v1" }, componentRefinements: { optionButton: structuredClone(authorization) } });
  const authorized = (value: unknown) => (verificationHelpers as any).hasOptionButtonRefinementAuthorization(value);

  it("allows only the explicit standalone and text-row single/multiple scope", () => {
    expect(authorized(status())).toBe(true);
    expect(authorized({ currentPhase: { id: "token-foundations-v1" }, componentRefinements: {} })).toBe(false);
    const current = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as any;
    current.componentRefinements.optionButton = structuredClone(authorization);
    delete current.componentRefinements.questionOptionSizes;
    expect(() => verificationHelpers.getValidatedTailwindB2History(current)).not.toThrow();
  });

  it.each([
    { authorization: "not-authorized" }, { scope: "all-option-components" }, { humanGate: "accepted" },
    { implementation: "completed" }, { independentReview: "approved" }, { doesNotAuthorize: [] },
    { userStatement: "继续" }, { plan: "../docs/plans/unapproved.md" }, { publication: "authorized" },
  ])("rejects unauthorized scope or lifecycle expansion %j", (patch) => {
    const candidate = status();
    Object.assign(candidate.componentRefinements.optionButton, patch);
    expect(authorized(candidate)).toBe(false);
  });
});

describe("OptionButton visual acceptance and next content batch", () => {
  const decision = {
    acceptedAt: "2026-09-08", decisionSource: "explicit-user-confirmation",
    userStatement: "视觉没问题。推进下一步", scope: "option-button-32-selection-visual-only",
    evidence: "../evidence/runtime/option-button/verification.md",
  };
  const content = {
    authorization: "authorized", authorizedAt: "2026-09-08",
    decisionSource: "explicit-user-continue-after-option-selection-visual-confirmation",
    userStatement: "视觉没问题。推进下一步", scope: "option-button-32-results-readonly-judgment-media",
    plan: "../docs/plans/2026-09-08-option-button-content-implementation.md", designConfirmation: "accepted",
    implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run", humanGate: "not-evaluated",
    doesNotAuthorize: ["other-sizes-new-tokens-or-new-dependencies", "existing-component-migration-or-question-number-contrast-exceptions", "business-progress-appeals-or-grading-workflows", "figma-publication-business-migration-or-git"],
  };
  const current = () => {
    const value = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as any;
    const base = value.componentRefinements.optionButton;
    delete value.componentRefinements.questionOptionSizes;
    Object.assign(base, { implementation: "completed", automatedVerification: "passed", independentReview: "passed", humanGate: "accepted", humanGateDecision: structuredClone(decision) });
    delete base.contentRefinement;
    return value;
  };

  it("accepts only explicit 32 px selection visual confirmation while preserving completed verification", () => {
    const status = current();
    expect(verificationHelpers.hasOptionButtonRefinementAuthorization(status)).toBe(true);
    expect(() => verificationHelpers.getValidatedTailwindB2History(status)).not.toThrow();
    for (const mutate of [
      (base: any) => { delete base.humanGateDecision; },
      (base: any) => { base.humanGateDecision.scope = "all-options"; },
      (base: any) => { base.humanGateDecision.userStatement = "继续"; },
      (base: any) => { base.humanGateDecision.evidence = "../unverified.md"; },
      (base: any) => { base.humanGate = "awaiting_human"; },
      (base: any) => { base.automatedVerification = "not-run"; },
    ]) {
      const candidate = structuredClone(status); mutate(candidate.componentRefinements.optionButton);
      expect(verificationHelpers.hasOptionButtonRefinementAuthorization(candidate)).toBe(false);
    }
  });

  it("requires a separate exact content batch without reusing selection acceptance", () => {
    const status = current();
    expect((verificationHelpers as any).hasOptionButtonContentRefinementAuthorization(status)).toBe(false);
    status.componentRefinements.optionButton.contentRefinement = structuredClone(content);
    expect((verificationHelpers as any).hasOptionButtonContentRefinementAuthorization(status)).toBe(true);
    expect(() => verificationHelpers.getValidatedTailwindB2History(status)).not.toThrow();
    for (const mutate of [
      (base: any) => { delete base.humanGateDecision; base.humanGate = "awaiting_human"; },
      (base: any) => { base.contentRefinement.scope = "all-content-components"; },
      (base: any) => { base.contentRefinement.humanGate = "accepted"; },
      (base: any) => { base.contentRefinement.userStatement = "继续推进下一批"; },
      (base: any) => { base.contentRefinement.doesNotAuthorize.pop(); },
      (base: any) => { base.contentRefinement.implementation = "completed"; },
      (base: any) => { base.contentRefinement.publication = "authorized"; },
    ]) {
      const candidate = structuredClone(status); mutate(candidate.componentRefinements.optionButton);
      expect((verificationHelpers as any).hasOptionButtonContentRefinementAuthorization(candidate)).toBe(false);
      expect(verificationHelpers.hasOptionButtonRefinementAuthorization(candidate)).toBe(false);
    }
  });
});


it("normalizes only the exact approved dropdown width source for frozen history", () => {
  const hashes = JSON.parse(readFileSync(join(workspaceRoot, "evidence/runtime/table-rn08/before-hashes.json"), "utf8"));
  for (const file of ["packages/ui/src/dropdown-menu/dropdown-menu.tsx", "packages/ui/src/dropdown-menu/dropdown-menu.css"]) {
    const source = readFileSync(join(workspaceRoot, file));
    const restored = verificationHelpers.restoreDropdownWidthBaseline(file, source);
    expect(createHash("sha256").update(restored).digest("hex")).toBe(hashes[file]);
    const changed = Buffer.concat([source, Buffer.from("/* unapproved change */")]);
    expect(verificationHelpers.restoreDropdownWidthBaseline(file, changed)).toBe(changed);
    expect(verificationHelpers.restoreDropdownWidthBaseline("unrelated.css", source)).toBe(source);
  }
});


it("admits only RN-10 form scope while rejecting fabricated acceptance or publication", () => {
  const status = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as any;
  expect(verificationHelpers.hasBmBRn10Authorization(status)).toBe(true);
  for (const change of [{ scope: "all-benchmarks" }, { humanGate: "accepted", humanGateDecision: undefined }, { publication: "published" }, { businessMigration: "authorized" }, { userStatement: "assumed" }, { unexpected: true }, { implementation: "completed", automatedVerification: "not-run" }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.bmBRn10, change);
    expect(verificationHelpers.hasBmBRn10Authorization(invalid)).toBe(false);
    expect(() => verificationHelpers.getValidatedTailwindB2History(invalid)).toThrow();
  }
  const sources = JSON.parse(readWorkspaceFile("evidence/runtime/bm-b-rn10/textarea-source.json"));
  const transitions = JSON.parse(readWorkspaceFile("evidence/runtime/rn15-delivery/source-transitions.json"));
  for (const file of sources.files.filter((file: any) => file.target.startsWith("packages/"))) {
    expect(verificationHelpers.matchesRn15ProtectedSource(file.target, readWorkspaceFile(file.target), file.sha256, status, transitions), file.target).toBe(true);
  }
  const registry = JSON.parse(readWorkspaceFile("registry/textarea.json"));
  expect(registry.publication).toBe("not-published"); expect(registry.humanGate).toBe("awaiting_human");
});

it("admits only RN-09 local BM-A without widening any prior phase", () => {
  const status = parseYamlSubset(readFileSync(join(workspaceRoot, "status/current-phase.yaml"), "utf8")) as any;
  expect(verificationHelpers.hasBmARn09Authorization(status)).toBe(true);
  for (const change of [{ scope: "all-benchmarks" }, { humanGate: "system-approved" }, { publication: "published" }, { businessMigration: "authorized" }, { userStatement: "assumed" }, { unexpected: true }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.bmARn09, change);
    expect(verificationHelpers.hasBmARn09Authorization(invalid)).toBe(false);
    expect(() => verificationHelpers.getValidatedTailwindB2History(invalid)).toThrow();
  }
  const { bmARn09, ...earlier } = status.componentRefinements;
  if (verificationHelpers.hasBmBRn10Authorization(status)) delete earlier.bmBRn10;
  if (verificationHelpers.hasAvatarFamilyAuthorization(status)) delete earlier.avatarFamily;
  if (verificationHelpers.hasInputNumberAuthorization(status)) delete earlier.inputNumber;
  if (verificationHelpers.hasGenerationQualityAuthorization(status)) delete earlier.generationQuality;
  if (verificationHelpers.hasM2Authorization(status)) delete earlier.m2Delivery;
  if (verificationHelpers.hasRn15Authorization(status)) delete earlier.rn15Delivery;
  if (verificationHelpers.hasDialogRefinementAuthorization(status)) delete earlier.dialogRefinement;
  if (verificationHelpers.hasRn14Authorization(status)) delete earlier.rn14Editability;
  if (verificationHelpers.hasRn13Authorization(status)) delete earlier.rn13AssetIndex;
  expect({ ...status, componentRefinements: earlier }).toEqual(parseYamlSubset(readFileSync(join(workspaceRoot, "evidence/runtime/bm-a-rn09/before/status/current-phase.yaml.txt"), "utf8")));
});

it("closes BM-A only with scoped human confirmation and completed technical verification", () => {
  const status = parseYamlSubset(readWorkspaceFile("status/current-phase.yaml")) as any;
  Object.assign(status.componentRefinements.bmARn09, {
    implementation: "completed", automatedVerification: "passed", independentReview: "passed", humanGate: "accepted",
    humanGateDecision: {
      acceptedAt: "2026-09-15", decisionSource: "explicit-user-confirmation-after-density-repair",
      userStatement: "确认。", scope: "bm-a-page-and-density-switching-only",
      evidence: "../evidence/runtime/bm-a-rn09/verification.md",
    },
  });
  expect(verificationHelpers.hasBmARn09Authorization(status)).toBe(true);
  expect(() => verificationHelpers.getValidatedTailwindB2History(status)).not.toThrow();
  for (const change of [{ independentReview: "not-run" }, { independentReview: "findings" }, { automatedVerification: "not-run" }, { implementation: "in-progress" }, { humanGateDecision: undefined }, { humanGate: "awaiting_human" }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.bmARn09, change);
    expect(verificationHelpers.hasBmARn09Authorization(invalid)).toBe(false);
  }
  for (const change of [{ scope: "all-benchmarks" }, { userStatement: "assumed" }, { evidence: "missing.md" }, { publication: "authorized" }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.bmARn09.humanGateDecision, change);
    expect(verificationHelpers.hasBmARn09Authorization(invalid)).toBe(false);
  }
});
