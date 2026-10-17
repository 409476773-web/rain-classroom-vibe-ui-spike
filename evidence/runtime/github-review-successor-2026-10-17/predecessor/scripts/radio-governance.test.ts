import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import * as b2 from "./verify-tailwind-b2.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

it("admits only the standard Radio slice and its exact user visual acceptance without changing history", () => {
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(helpers.hasRadioSc01Authorization).toBeTypeOf("function");
  expect(helpers.hasRadioSc01Authorization(status)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(status).componentRefinements.radioSc01).toBeUndefined();
  expect(status.componentRefinements.radioSc01.humanGateDecision).toEqual({
    acceptedAt: "2026-09-10", decisionSource: "explicit-user-confirmation", userStatement: "确定。推进下一步",
    scope: "radio-radiogroup-sc01-runtime-visual-only", evidence: "../evidence/runtime/radio/verification.md",
  });
  for (const mutation of [{ scope: "all-selection-components" }, { humanGateDecision: undefined }, { contrastAcceptance: "accepted" },
    { humanGateDecision: { ...status.componentRefinements.radioSc01.humanGateDecision, scope: "all-selection-components" } },
    { implementation: "completed", automatedVerification: "not-run" }, { decisionSource: "agent-inferred" }, { publication: "authorized" }]) {
    const invalid = structuredClone(status);
    Object.assign(invalid.componentRefinements.radioSc01, mutation);
    expect(helpers.hasRadioSc01Authorization(invalid)).toBe(false);
    expect(() => helpers.getValidatedTailwindB2History(invalid)).toThrow(/history/);
  }
});

it("keeps exact native control geometry, themed paint, shared Focus and system colors", () => {
  const source = readFileSync("packages/ui/src/styles.css", "utf8");
  const contract = helpers.parseYamlSubset(readFileSync("manifests/contracts/tailwind-b2.yaml", "utf8"));
  expect(b2.validateRadioCssExceptions({ source, contract })).toEqual([]);
  for (const changed of [source + '\n.rain-radio { color: #ff0000; }',
    source.replace('inset: calc(var(--rain-space-2) / 4);', 'inset: 0;'),
    source.replace('.rain-radio:is(:has(input:enabled):hover,', '.rain-radio:is(:hover,'),
    source.replace('.rain-radio [data-slot="mark"] { background-color: currentColor; }', '.rain-radio [data-slot="mark"] { background-color: white; }')]) {
    expect(changed).not.toBe(source);
    expect(b2.validateRadioCssExceptions({ source: changed, contract }).length).toBeGreaterThan(0);
  }
  expect(b2.validateRadioCssExceptions({ source, contract, authorized: false }).length).toBeGreaterThan(0);
  expect(validateRegisteredRecipeColors({ filePath: "packages/ui/src/styles.css", source })).toEqual([]);
  const radio = readFileSync("packages/ui/src/radio/radio.tsx", "utf8");
  expect(radio).toContain('type="radio"');
  expect(radio).not.toMatch(/<svg|aria-pressed|onKeyDown=|<button/);
});

it("keeps both public identities candidate and unpublished after their scoped visual acceptance", () => {
  for (const name of ["radio", "radio-group"]) {
    expect(helpers.parseYamlSubset(readFileSync(`manifests/ui/${name}.yaml`, "utf8"))).toMatchObject({
      id: `ui-${name}`, maturity: "registry-candidate", modificationMode: "managed", publication: "unpublished",
      sourcePath: "packages/ui/src/radio/radio.tsx", verification: { humanGate: "accepted", humanGateScope: "radio-radiogroup-sc01-runtime-visual-only", contrastAcceptance: "not-granted" },
    });
  }
  const registry = JSON.parse(readFileSync("registry/radio.json", "utf8"));
  expect(registry).toMatchObject({ publication: "not-published", humanGate: "accepted", humanGateScope: "radio-radiogroup-sc01-runtime-visual-only", contrastAcceptance: "not-granted" });
  expect(registry.items.map((item: any) => item.exportName)).toEqual(["RadioGroup", "Radio"]);
  for (const name of ["radio", "checkbox"]) expect(JSON.parse(readFileSync(`registry/${name}.json`, "utf8")).shared.files).toContain("packages/ui/src/utils/use-default-reset.ts");
});
