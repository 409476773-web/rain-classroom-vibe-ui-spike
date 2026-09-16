import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { hasInputNumberAuthorization, parseYamlSubset } from "./verification-helpers.mjs";
import { getInputNumberColorConsumers } from "./input-number.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

it("keeps implementation authorization separate from visual acceptance and publication", () => {
  const phase = parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(hasInputNumberAuthorization(phase)).toBe(true);
  const awaiting = structuredClone(phase);
  awaiting.componentRefinements.inputNumber.humanGate = "awaiting_human";
  delete awaiting.componentRefinements.inputNumber.humanGateDecision;
  expect(hasInputNumberAuthorization(awaiting)).toBe(true);
  awaiting.componentRefinements.inputNumber.humanGate = "accepted";
  expect(hasInputNumberAuthorization(awaiting)).toBe(false);
  for (const patch of [{ humanGate: "unknown" },
    { humanGateDecision: { ...phase.componentRefinements.inputNumber.humanGateDecision, scope: "all-inputs" } }, { publication: "authorized" }, { scope: "all-inputs" }, { contrastAcceptance: "accepted" },
    { compactControls: { ...phase.componentRefinements.inputNumber.compactControls, scope: "all-inputs" } },
    { keyDataTypography: { ...phase.componentRefinements.inputNumber.keyDataTypography, scope: "all-typography" } },
    { compactSizing: { ...phase.componentRefinements.inputNumber.compactSizing, scope: "all-components" } }]) {
    const altered = structuredClone(phase);
    Object.assign(altered.componentRefinements.inputNumber, patch);
    expect(hasInputNumberAuthorization(altered)).toBe(false);
  }
});

it("audits InputNumber paint roles and rejects unregistered paints or role changes", () => {
  const outputs = getTokenFoundationOutputs();
  outputs.colorCssConsumers.push(...getInputNumberColorConsumers());
  for (const filePath of new Set(getInputNumberColorConsumers().map(entry => entry.filePath))) {
    const source = readFileSync(filePath, "utf8");
    expect(validateRegisteredRecipeColors({ filePath, source, outputs })).toEqual([]);
    expect(validateRegisteredRecipeColors({ filePath, source: source + "\n.rain-input-number { color: #fff; }", outputs }).length).toBeGreaterThan(0);
    const altered = structuredClone(outputs);
    altered.colorCssConsumers.find(entry => entry.filePath === filePath)!.use.content = "decorative";
    expect(validateRegisteredRecipeColors({ filePath, source, outputs: altered })).toContain("InputNumber colors must retain exact roles and surfaces");
  }
});
