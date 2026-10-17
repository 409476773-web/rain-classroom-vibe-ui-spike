import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import { tooltipTokens } from "../packages/foundations/src/tooltip-token-contract";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { hasTooltipAuthorization, hasSwitchSc01Authorization, getValidatedTailwindB2History, parseYamlSubset, validateTokenFoundationsV1Phase } from "./verification-helpers.mjs";
import { validateTooltipCss } from "./verify-token-foundations.mjs";
import { parseTopLevelCssBlocks } from "./verify-tailwind-b2.mjs";

const read = (file: string) => readFileSync(file, "utf8");
const values = (source: string) => [...source.matchAll(/(--rain-[\w-]+):\s*([^;]+);/g)].map(match => [match[1]!, match[2]!] as const);
const switchSuccessor = [
  ["--rain-color-switch-track-unchecked", "var(--rain-category-icon-neutral-4)"],
  ["--rain-color-switch-track-hover", "var(--rain-category-icon-neutral-3)"],
  ["--rain-color-switch-track-pressed", "var(--rain-category-text-neutral-2)"],
  ["--rain-color-switch-track-checked-hover", "var(--rain-category-fill-brand-solid-1)"],
  ["--rain-color-switch-track-checked-pressed", "var(--rain-category-fill-brand-alpha-1)"],
  ["--rain-color-switch-indicator", "var(--rain-category-oncolor-1)"],
];
const preservedPreTooltipValues = (source: string, status: any) => {
  validateTokenFoundationsV1Phase(status);
  expect(hasSwitchSc01Authorization(status)).toBe(true);
  const actual = values(source);
  // Exactly six authorized Switch aliases occur in the default, light and dark token blocks.
  expect(actual.filter(([name]) => name.startsWith("--rain-color-switch-"))).toEqual([...switchSuccessor, ...switchSuccessor, ...switchSuccessor]);
  const failures: string[] = [];
  const blocks = parseTopLevelCssBlocks(source, "Tooltip token conservation", failures);
  expect(failures).toEqual([]);
  expect(blocks.filter((block: any) => block.body.includes("--rain-color-switch-")).map((block: any) => [block.header, values(block.body).filter(([name]) => name.startsWith("--rain-color-switch-"))])).toEqual([
    [":root", switchSuccessor], ['[data-rain-theme="light"]', switchSuccessor], ['[data-rain-theme="dark"]', switchSuccessor],
  ]);
  return actual.filter(([name]) => !name.startsWith("--rain-tooltip-") && !name.startsWith("--rain-color-switch-"));
};
it("adds only the authorized fixed Tooltip Tokens and preserves all prior generated values", () => {
  const outputs = getTokenFoundationOutputs();
  expect(tooltipTokens).toEqual({
    "--rain-tooltip-background": "#2F3545", "--rain-tooltip-foreground": "var(--rain-color-text-inverse)",
    "--rain-tooltip-padding-block": "7px", "--rain-tooltip-arrow-width": "14px", "--rain-tooltip-arrow-height": "6px", "--rain-tooltip-max-width": "250px",
  });
  expect(tooltipTokens["--rain-tooltip-background"]).toBe("#2F3545");
  for (const [name, value] of Object.entries(tooltipTokens)) {
    expect(outputs.variables).toHaveProperty(name, value);
    expect(read("packages/foundations/src/tokens.css")).toContain(`${name}: ${value};`);
  }
  const before = read("evidence/runtime/tooltip-classic/before/packages/foundations/src/tokens.css.txt");
  expect(createHash("sha256").update(before).digest("hex")).toBe("8e9877bfdb73ea367670486105765ffd021f548443cc927aafb233cc6c14067f");
  const oldValues = values(before).filter(([name]) => !name.startsWith("--rain-tooltip-"));
  expect(oldValues).toHaveLength(1348);
  const current = read("packages/foundations/src/tokens.css"), status = parseYamlSubset(read("status/current-phase.yaml"));
  expect(values(current).filter(([name]) => name.startsWith("--rain-tooltip-"))).toEqual(Object.entries(tooltipTokens));
  expect(preservedPreTooltipValues(current, status)).toEqual(oldValues);
  for (const changed of [
    current.replace("--rain-color-switch-track-hover: var(--rain-category-icon-neutral-3);", "--rain-color-switch-track-hover: var(--rain-category-icon-neutral-4);"),
    current + "\n:root { --rain-color-switch-unapproved: var(--rain-category-oncolor-1); }",
    current.replace("--rain-color-switch-indicator: var(--rain-category-oncolor-1);", ""),
    current.replace('[data-rain-theme="dark"]', ".unapproved-token-scope"),
  ]) expect(() => preservedPreTooltipValues(changed, status)).toThrow();
  const oldValueMutation = current.replace(`${oldValues[0]![0]}: ${oldValues[0]![1]};`, `${oldValues[0]![0]}: unrecorded;`);
  expect(oldValueMutation).not.toBe(current);
  expect(preservedPreTooltipValues(oldValueMutation, status)).not.toEqual(oldValues);
  const unauthorized = structuredClone(status) as any; delete unauthorized.componentRefinements.switchSc01;
  expect(() => preservedPreTooltipValues(current, unauthorized)).toThrow();
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
