import { readFileSync, writeFileSync } from "node:fs";
import { expect, test } from "vitest";
import { hasAlertAuthorization, parseYamlSubset } from "./verification-helpers.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

test("Alert authorization keeps the precise candidate scope after visual acceptance", () => {
  const phase = parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as { componentRefinements: Record<string, Record<string, unknown>> };
  expect(hasAlertAuthorization(phase)).toBe(true);
  const accepted = { ...phase, componentRefinements: { ...phase.componentRefinements, alert: {
    ...phase.componentRefinements.alert,
    humanGate: "accepted",
    humanGateDecision: {
      acceptedAt: "2026-09-20",
      decisionSource: "explicit-user-alert-visual-confirmation",
      userStatement: "确定。完成视觉验收",
      scope: "alert-current-runtime-visual-only",
      evidence: "evidence/runtime/alert/verification.md",
    },
  } } };
  expect(hasAlertAuthorization(accepted)).toBe(true);
  expect(hasAlertAuthorization({ ...accepted, componentRefinements: { ...accepted.componentRefinements, alert: { ...accepted.componentRefinements.alert, humanGateDecision: undefined } } })).toBe(false);
  expect(hasAlertAuthorization({ ...phase, componentRefinements: { ...phase.componentRefinements, alert: { ...phase.componentRefinements.alert, scope: "all-components" } } })).toBe(false);
});

test("Alert paints keep actual contrast roles and record state-text findings without waiving them", () => {
  const outputs = getTokenFoundationOutputs(), pending: Record<string, unknown>[] = [];
  for (const filePath of ["packages/ui/src/alert/alert.css", "apps/playground/src/docs/components/alert-page.css"]) {
    const source = readFileSync(filePath, "utf8");
    expect(validateRegisteredRecipeColors({ filePath, source, outputs, pendingContrastFindings: pending })).toEqual([]);
    expect(validateRegisteredRecipeColors({ filePath, source: `${source}\n.unregistered { color: var(--rain-category-text-red-1); }`, outputs }).length).toBeGreaterThan(0);
  }
  expect(pending.length).toBeGreaterThan(0);
  expect(pending.every(finding => finding.acceptedException === false && finding.content === "text" && finding.minimum === 4.5)).toBe(true);
  writeFileSync("evidence/runtime/alert/color-findings.json", `${JSON.stringify(pending, null, 2)}\n`);
});
