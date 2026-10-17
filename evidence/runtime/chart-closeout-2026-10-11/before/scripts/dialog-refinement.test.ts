import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { overlayColors, dialogWidths } from "../packages/foundations/src/overlay-token-contract";
import { colorAlphaValues, colorToCss, resolveColor } from "../packages/foundations/src/color-registry";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { hasDialogRefinementAuthorization, hasBmBRn10Authorization, getValidatedTailwindB2History, parseYamlSubset } from "./verification-helpers.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

it("generates the eight confirmed mask paints without changing the generic Fill or alpha whitelist", () => {
  const output = getTokenFoundationOutputs();
  expect(colorAlphaValues).not.toContain(50); expect(colorAlphaValues).not.toContain(70);
  expect(dialogWidths).toEqual([416, 516, 616, 716, 816, 916, 1016, 1116]);
  expect(Object.values(overlayColors).map(colors => [colorToCss(colors.light), colorToCss(colors.dark)])).toEqual([
    ["rgb(34 48 81 / 6%)", "rgb(5 9 26 / 15%)"], ["rgb(34 48 81 / 15%)", "rgb(5 9 26 / 70%)"],
    ["rgb(34 48 81 / 50%)", "rgb(3 5 16 / 90%)"], ["rgb(27 35 56 / 80%)", "rgb(5 9 26 / 90%)"],
  ]);
  for (const [name, colors] of Object.entries(overlayColors)) for (const theme of ["light", "dark"] as const)
    expect(output.colorThemes[theme]).toHaveProperty(`--rain-overlay-${name}`, colorToCss(colors[theme]));
  expect(colorToCss(resolveColor("Fill/Neutral/Alpha/1"))).toBe("rgb(84 108 198 / 28%)");
});

it("keeps implementation authorization and mask consumption exact", () => {
  const phase: any = parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8"));
  expect(hasDialogRefinementAuthorization(phase)).toBe(true);
  for (const patch of [{ scope: "all-components" }, { humanGate: "accepted", humanGateDecision: undefined }, { contrastAcceptance: "accepted" }, { unexpected: true }])
    expect(hasDialogRefinementAuthorization({ ...phase, componentRefinements: { ...phase.componentRefinements, dialogRefinement: { ...phase.componentRefinements.dialogRefinement, ...patch } } })).toBe(false);
  const filePath = "packages/ui/src/dialog/dialog.css", source = readFileSync(filePath, "utf8");
  expect(validateRegisteredRecipeColors({ filePath, source })).toEqual([]);
  expect(validateRegisteredRecipeColors({ filePath, source: source.replace("var(--rain-overlay-modal)", "var(--rain-overlay-focus)") }).length).toBeGreaterThan(0);
  expect(validateRegisteredRecipeColors({ filePath, source: source + ".unregistered { background-color: var(--rain-overlay-modal); }" }).length).toBeGreaterThan(0);
});

it("accepts only the user-requested Dialog and BM-B runtime visual scope after verification", () => {
  const phase: any = parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8"));
  const cases = [
    ["dialogRefinement", "dialog-alert-dialog-runtime-visual-only", hasDialogRefinementAuthorization],
    ["bmBRn10", "bm-b-dialog-form-runtime-visual-only", hasBmBRn10Authorization],
  ] as const;
  for (const [key, scope, check] of cases) {
    const accepted = structuredClone(phase);
    Object.assign(accepted.componentRefinements[key], {
      implementation: "completed", automatedVerification: "passed", independentReview: "passed", humanGate: "accepted",
      humanGateDecision: {
        acceptedAt: "2026-09-15", decisionSource: "explicit-user-request-rule-based-visual-acceptance",
        userStatement: "根据已经建设的dialog设计规则，完成 Dialog 和 BM-B 大表单的整体视觉验收",
        scope, evidence: "../evidence/runtime/dialog-bm-b-visual-2026-09-15/verification.md",
      },
    });
    expect(check(accepted)).toBe(true);
    expect(() => getValidatedTailwindB2History(accepted)).not.toThrow();
    expect(accepted.phaseHistory).toEqual(phase.phaseHistory);
    for (const patch of [{ humanGateDecision: undefined }, { implementation: "in-progress" }, { automatedVerification: "not-run" }, { independentReview: "findings" }, { contrastAcceptance: "accepted" }, { publication: "published" }]) {
      const invalid = structuredClone(accepted); Object.assign(invalid.componentRefinements[key], patch);
      expect(check(invalid)).toBe(false);
    }
    for (const patch of [{ scope: "all-components" }, { decisionSource: "automated-test" }, { userStatement: "确定" }, { evidence: "missing.md" }, { publication: "authorized" }]) {
      const invalid = structuredClone(accepted); Object.assign(invalid.componentRefinements[key].humanGateDecision, patch);
      expect(check(invalid)).toBe(false);
    }
    const pending = structuredClone(accepted); pending.componentRefinements[key].humanGate = "awaiting_human"; delete pending.componentRefinements[key].humanGateDecision;
    expect(check(pending)).toBe(true);
  }
});

it("records the idle hint contrast deficit without exempting other content or accepting contrast", () => {
  const filePath = "apps/prototype/src/scenarios/bm-b/page.css";
  const source = readFileSync(filePath, "utf8");
  const outputs = getTokenFoundationOutputs() as any;
  const pendingContrastFindings: any[] = [];
  expect(validateRegisteredRecipeColors({ filePath, source, outputs, root: process.cwd(), pendingContrastFindings })).toEqual([]);
  expect(pendingContrastFindings).toContainEqual(expect.objectContaining({ tokenId: "Text/Neutral/5", theme: "light", actual: 3.71, minimum: 4.5, acceptedException: false }));
  for (const patch of [{ interaction: "interactive" }, { critical: true }, { content: "decorative" }]) {
    const changed = structuredClone(outputs);
    Object.assign(changed.colorCssConsumers.find((item: any) => item.selector === ".bm-b-hint").use, patch);
    expect(validateRegisteredRecipeColors({ filePath, source, outputs: changed, root: process.cwd() }).length).toBeGreaterThan(0);
  }
  expect(validateRegisteredRecipeColors({ filePath, source: source.replace(".bm-b-feedback { flex: 1 1 240px; color: var(--rain-category-text-neutral-3)", ".bm-b-feedback { flex: 1 1 240px; color: var(--rain-category-text-neutral-5)"), outputs, root: process.cwd() }).length).toBeGreaterThan(0);
});
