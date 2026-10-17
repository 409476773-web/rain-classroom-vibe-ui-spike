import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { tooltipTokens } from "../packages/foundations/src/tooltip-token-contract";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { hasTooltipAuthorization, getValidatedTailwindB2History, parseYamlSubset } from "./verification-helpers.mjs";
import { validateTooltipCss } from "./verify-token-foundations.mjs";

const read = (file: string) => readFileSync(file, "utf8");
it("adds only the authorized fixed Tooltip Tokens and preserves all prior generated values", () => {
  const outputs = getTokenFoundationOutputs();
  expect(tooltipTokens["--rain-tooltip-background"]).toBe("#2F3545");
  for (const [name, value] of Object.entries(tooltipTokens)) {
    expect(outputs.variables).toHaveProperty(name, value);
    expect(read("packages/foundations/src/tokens.css")).toContain(`${name}: ${value};`);
  }
  const previousValues = (source: string) => [...source.matchAll(/(--rain-[\w-]+):\s*([^;]+);/g)].filter(match => !match[1]!.startsWith("--rain-tooltip-")).map(match => [match[1], match[2]]);
  expect(previousValues(read("packages/foundations/src/tokens.css"))).toEqual(previousValues(read("evidence/runtime/tooltip-classic/before/packages/foundations/src/tokens.css.txt")));
});
it("keeps authorization, fixed paints and forced-colors limited to the Tooltip contract", () => {
  const status: any = parseYamlSubset(read("status/current-phase.yaml"));
  const source = read("packages/ui/src/tooltip/tooltip.css");
  expect(hasTooltipAuthorization(status)).toBe(true);
  expect(status.componentRefinements.tooltip.humanGate).toBe("accepted");
  const pending = structuredClone(status);
  pending.componentRefinements.tooltip.humanGate = "awaiting_human";
  delete pending.componentRefinements.tooltip.humanGateDecision;
  expect(hasTooltipAuthorization(pending)).toBe(true);
  for (const patch of [{ scope: "all-components" }, { evidence: "unreviewed.md" }, { userStatement: "agent-approved" }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.tooltip.humanGateDecision, patch);
    expect(hasTooltipAuthorization(invalid)).toBe(false);
  }
  expect(() => getValidatedTailwindB2History(status)).not.toThrow();
  expect(validateTooltipCss(source, status)).toEqual([]);
  for (const patch of [{ scope: "all-components" }, { tokenAddition: "all-colors" }, { humanGate: "accepted", humanGateDecision: undefined }, { contrastAcceptance: "granted" }, { publication: "published" }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.tooltip, patch);
    expect(hasTooltipAuthorization(invalid)).toBe(false);
    expect(validateTooltipCss(source, invalid)).not.toEqual([]);
  }
  for (const invalid of [source.replace("var(--rain-tooltip-background)", "#2F3545"), source.replace("(forced-colors: active)", "(min-width: 1px)"), source + ".unregistered { color: var(--rain-tooltip-foreground); }"])
    expect(validateTooltipCss(invalid, status)).not.toEqual([]);
});
