import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";
import * as b2 from "./verify-tailwind-b2.mjs";

it("admits only the requested interaction refinement while keeping its visual review separate", () => {
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  const refinement = {
    authorization: "authorized", authorizedAt: "2026-09-09", decisionSource: "explicit-user-checkbox-interaction-request",
        designReference: "https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e?node-id=1-7814",
    userStatement: "补全选择框 normal、hover、选中、选中以后 hover 等交互状态样式",
    scope: "checkbox-checkboxgroup-interaction-paints-only", implementation: "in-progress", automatedVerification: "not-run",
    independentReview: "not-run", humanGate: "awaiting_human", contrastAcceptance: "not-granted",
  };
  status.componentRefinements.checkboxSc01.interactionRefinement = refinement;
  expect(helpers.hasCheckboxSc01Authorization(status)).toBe(true);
  for (const mutation of [{ scope: "all-selection-components" }, { humanGate: "accepted" }, { contrastAcceptance: "accepted" },
    { implementation: "completed" }, { publication: "authorized" }, { decisionSource: "agent-inferred" }]) {
    const invalid = structuredClone(status);
    Object.assign(invalid.componentRefinements.checkboxSc01.interactionRefinement, mutation);
    expect(helpers.hasCheckboxSc01Authorization(invalid)).toBe(false);
  }
  expect(status.componentRefinements.checkboxSc01.humanGate).toBe("accepted");
});

it("admits this Checkbox slice without changing frozen history or accepting visual contrast", () => {
  expect(helpers.hasCheckboxSc01Authorization).toBeTypeOf("function");
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(helpers.hasCheckboxSc01Authorization(status)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(status).componentRefinements.checkboxSc01).toBeUndefined();
  for (const mutation of [
    { scope: "all-selection-components" }, { humanGate: "system-approved" }, { contrastAcceptance: "accepted" },
    { decisionSource: "agent-inferred" }, { extraPermission: "publish" },
  ]) {
    const invalid = structuredClone(status);
    Object.assign(invalid.componentRefinements.checkboxSc01, mutation);
    expect(helpers.hasCheckboxSc01Authorization(invalid)).toBe(false);
    expect(() => helpers.getValidatedTailwindB2History(invalid)).toThrow(/history/);
  }
});

it("accepts only the recorded interaction visual decision after completed verification", () => {
  const pending = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  const refinement = pending.componentRefinements.checkboxSc01.interactionRefinement;
  refinement.humanGate = "awaiting_human";
  delete refinement.humanGateDecision;
  expect(helpers.hasCheckboxSc01Authorization(pending)).toBe(true);
  const accepted = structuredClone(pending);
  const decision = {
    acceptedAt: "2026-09-10", decisionSource: "explicit-user-confirmation", userStatement: "确认",
    scope: "checkbox-checkboxgroup-interaction-runtime-visual-only", evidence: "../evidence/runtime/checkbox/verification.md",
  };
  Object.assign(accepted.componentRefinements.checkboxSc01.interactionRefinement, { humanGate: "accepted", humanGateDecision: decision });
  expect(helpers.hasCheckboxSc01Authorization(accepted)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(accepted)).toEqual(helpers.getValidatedTailwindB2History(pending));
  for (const mutation of [
    { humanGateDecision: undefined },
    { humanGateDecision: { ...decision, acceptedAt: "2026-09-09" } },
    { humanGateDecision: { ...decision, decisionSource: "agent-inferred" } },
    { humanGateDecision: { ...decision, userStatement: "" } },
    { humanGateDecision: { ...decision, scope: "all-selection-components" } },
    { humanGateDecision: { ...decision, evidence: "unverified.md" } },
    { humanGateDecision: { ...decision, publication: "authorized" } },
    { implementation: "in-progress" }, { automatedVerification: "not-run" }, { independentReview: "findings" },
    { contrastAcceptance: "accepted" },
  ]) {
    const invalid = structuredClone(accepted);
    Object.assign(invalid.componentRefinements.checkboxSc01.interactionRefinement, mutation);
    expect(helpers.hasCheckboxSc01Authorization(invalid)).toBe(false);
  }
  refinement.humanGateDecision = decision;
  expect(helpers.hasCheckboxSc01Authorization(pending)).toBe(false);
});

it("accepts the recorded Checkbox visual decision without broadening its scope or contrast status", () => {
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  const pending = structuredClone(status);
  pending.componentRefinements.checkboxSc01.humanGate = "awaiting_human";
  delete pending.componentRefinements.checkboxSc01.humanGateDecision;
  expect(helpers.hasCheckboxSc01Authorization(pending)).toBe(true);
  const accepted = structuredClone(pending);
  const decision = {
    acceptedAt: "2026-09-09", decisionSource: "explicit-user-confirmation", userStatement: "确定",
    scope: "checkbox-checkboxgroup-sc01-runtime-visual-only", evidence: "../evidence/runtime/checkbox/verification.md",
  };
  Object.assign(accepted.componentRefinements.checkboxSc01, { humanGate: "accepted", humanGateDecision: decision });
  expect(helpers.hasCheckboxSc01Authorization(accepted)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(accepted)).toEqual(helpers.getValidatedTailwindB2History(pending));
  for (const mutation of [
    { humanGateDecision: undefined },
    { humanGateDecision: { ...decision, decisionSource: "agent-inferred" } },
    { humanGateDecision: { ...decision, userStatement: "" } },
    { humanGateDecision: { ...decision, scope: "all-selection-components" } },
    { humanGateDecision: { ...decision, evidence: "unverified.md" } },
    { humanGateDecision: { ...decision, publication: "authorized" } },
    { implementation: "in-progress" }, { automatedVerification: "not-run" }, { independentReview: "findings" },
    { contrastAcceptance: "accepted" },
  ]) {
    const invalid = structuredClone(accepted);
    Object.assign(invalid.componentRefinements.checkboxSc01, mutation);
    expect(helpers.hasCheckboxSc01Authorization(invalid)).toBe(false);
    expect(() => helpers.getValidatedTailwindB2History(invalid)).toThrow(/history/);
  }
  pending.componentRefinements.checkboxSc01.humanGateDecision = decision;
  expect(helpers.hasCheckboxSc01Authorization(pending)).toBe(false);
});

it("binds the local border Alpha to its actual themed Category source and scoped paint", () => {
  const filePath = "packages/ui/src/styles.css", source = readFileSync(filePath, "utf8"), outputs = getTokenFoundationOutputs();
  const check = (text: string, data = outputs) => validateRegisteredRecipeColors({ filePath, source: text, outputs: data });
  expect(check(source)).toEqual([]);
  for (const invalid of [
    source.replace("r g b / 65%", "r g b / 35%"),
    source.replace("rgb(from var(--rain-category-border-neutral-1)", "rgb(from var(--rain-category-fill-brand-solid-2)"),
    source.replace("border-color: var(--rain-local-checkbox-boundary)", "border-color: var(--rain-category-border-neutral-1)"),
    source.replace("--rain-local-checkbox-boundary: rgb(from var(--rain-category-border-neutral-1) r g b / 65%);", ""),
  ]) expect(check(invalid).length).toBeGreaterThan(0);
  const changed = structuredClone(outputs);
  const alias = changed.colorCssConsumers.find((entry: any) => entry.sourceAlias);
  expect(alias).toBeDefined();
  Object.assign(alias!, { sourceAlias: { selector: ".unrelated", property: "--rain-local-checkbox-boundary" } });
  expect(check(source, changed).join(" ")).toMatch(/alias/);
});

it("keeps native Focus, system colors and library glyphs in the declared control", () => {
  const css = readFileSync("packages/ui/src/styles.css", "utf8"), source = readFileSync("packages/ui/src/checkbox/checkbox.tsx", "utf8");
  expect(css).toContain(".rain-checkbox:has(input:focus-visible)");
  expect(css).toContain("outline: var(--rain-focus-width) solid var(--rain-focus-control)");
  expect(css).toContain("/* @rain-css-exception checkbox-forced-colors:");
  expect(source).toContain('from "../icons/check-bold"');
  expect(source).toContain('from "../icons/minus-bold"');
  expect(source).not.toMatch(/<svg|aria-pressed|role="button"/);
});

it("rejects extra Checkbox CSS and keeps both public identities aligned with the recorded visual decision", () => {
  expect(b2.validateCheckboxCssExceptions).toBeTypeOf("function");
  const source = readFileSync("packages/ui/src/styles.css", "utf8");
  const contract = helpers.parseYamlSubset(readFileSync("manifests/contracts/tailwind-b2.yaml", "utf8"));
  expect(b2.validateCheckboxCssExceptions({ contract, source })).toEqual([]);
  for (const changed of [source + '\n.rain-checkbox { color: #ff0000; }', source.replace('background-clip: padding-box;', 'background-clip: border-box;'),
    source.replace('inset: calc(var(--rain-space-6) / 4);', 'inset: 0;'),
    source.replace('(hover: hover) and (forced-colors: none)', '(forced-colors: none)'),
    source.replace(':has(input:enabled):hover', ':hover'),
    source.replace('r g b / 85%', 'r g b / 35%'),
    source.replace('outline: var(--rain-focus-width) solid var(--rain-focus-control);', 'outline: none;')]) {
    expect(b2.validateCheckboxCssExceptions({ contract, source: changed }).length).toBeGreaterThan(0);
  }
  expect(b2.validateCheckboxCssExceptions({ contract, source, interactionAuthorized: false }).length).toBeGreaterThan(0);
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  const { humanGate, humanGateDecision } = status.componentRefinements.checkboxSc01;
  const humanGateScope = humanGateDecision?.scope;
  for (const name of ["checkbox", "checkbox-group"]) {
    const manifest = helpers.parseYamlSubset(readFileSync(`manifests/ui/${name}.yaml`, "utf8")) as any;
    expect(manifest).toMatchObject({ id: `ui-${name}`, maturity: "registry-candidate", modificationMode: "managed", publication: "unpublished",
      sourcePath: "packages/ui/src/checkbox/checkbox.tsx", verification: { humanGate, humanGateScope, contrastAcceptance: "not-granted" } });
  }
  const registry = JSON.parse(readFileSync("registry/checkbox.json", "utf8"));
  expect(registry).toMatchObject({ publication: "not-published", humanGate, humanGateScope, contrastAcceptance: "not-granted", shared: { registryDependencies: ["check-bold", "minus-bold"] } });
  expect(registry.items.map((item: any) => item.exportName)).toEqual(["CheckboxGroup", "Checkbox"]);
});
