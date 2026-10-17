import { rainCn } from "../packages/ui/src/utils/rain-class-names";
import { validateTokenConsumerSource } from "./verify-token-foundations.mjs";
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import * as b2 from "./verify-tailwind-b2.mjs";

it("admits only the explicitly authorized Input family and preserves the frozen B2 history", () => {
  expect(helpers.hasInputRefinementAuthorization).toBeTypeOf("function");
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(helpers.hasInputRefinementAuthorization(status)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(status).componentRefinements.input).toBeUndefined();
  for (const mutate of [
    (record: any) => { record.scope = "all-inputs"; },
    (record: any) => { record.userStatement = "采用"; },
    (record: any) => { record.decisionSource = "agent-inferred"; },
    (record: any) => { delete record.humanGateDecision; },
    (record: any) => { record.extraPermission = "publish"; },
  ]) {
    const invalid = structuredClone(status);
    mutate(invalid.componentRefinements.input);
    expect(helpers.hasInputRefinementAuthorization(invalid)).toBe(false);
    expect(() => helpers.getValidatedTailwindB2History(invalid)).toThrow(/history/);
  }
});

it("keeps the visual revision separate from construction and rejects expanded or inferred authorization", () => {
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(status.componentRefinements.input.visualRevision).toEqual({
    authorization: "authorized", authorizedAt: "2026-09-08", decisionSource: "explicit-user-start-confirmed-input-visual-revision",
    userStatement: "开始调整代码", scope: "input-clear-order-spacing-focus-status-and-text-color-revision",
    contrastAcceptance: "not-granted",
  });
  for (const mutate of [
    (record: any) => { record.userStatement = "确定"; },
    (record: any) => { record.scope = "global-focus-and-colors"; },
    (record: any) => { record.contrastAcceptance = "accepted"; },
    (record: any) => { record.extraPermission = "publish"; },
  ]) {
    const invalid = structuredClone(status);
    mutate(invalid.componentRefinements.input.visualRevision);
    expect(helpers.hasInputRefinementAuthorization(invalid)).toBe(false);
  }
});

it("checks the new family manifests' publication, maturity, source and independent Human Gate", () => {
  expect(b2.validateInputFamilyManifest).toBeTypeOf("function");
  const manifest = {
    schemaVersion: "1.0", kind: "RainUiManifest", id: "ui-form-item", category: "ui",
    assetIdentity: "registry-candidate", maturity: "registry-candidate", modificationMode: "managed", publication: "unpublished",
    sourcePath: "packages/ui/src/input/form-item.tsx", styleSourcePath: "packages/ui/src/input/form-item.tsx",
    parts: ["root", "label", "required", "help", "message"], verification: { humanGate: "awaiting_human" },
    anatomy: ["Field"], props: ["label"], states: ["default"], tokens: ["Text/Neutral/1"], compositionRules: ["One control"],
    allowedModifications: ["Label"], restrictedModifications: ["Tokens"], accessibility: ["Label association"], visualLineage: {},
  };
  expect(b2.validateInputFamilyManifest({ manifest, name: "form-item" })).toEqual([]);
  for (const [key, value] of [["publication", "published"], ["maturity", "system-approved"], ["sourcePath", "packages/ui/src/input/input.tsx"], ["styleSourcePath", "packages/ui/src/styles.css"], ["verification", { humanGate: "accepted" }]] as const) {
    expect(b2.validateInputFamilyManifest({ manifest: { ...manifest, [key]: value }, name: "form-item" }).length).toBeGreaterThan(0);
  }
  const input = helpers.parseYamlSubset(readFileSync("manifests/ui/input.yaml", "utf8")) as any;
  expect(b2.validateInputFamilyManifest({ manifest: input, name: "input", humanGate: "accepted" })).toEqual([]);
  for (const change of [
    { humanGateScope: "all-components-and-colors" },
    { contrastAcceptance: "accepted" },
    { humanGate: "awaiting_human" },
  ]) {
    const invalid = { ...input, sharedFieldRefinement: { ...input.sharedFieldRefinement, ...change } };
    expect(b2.validateInputFamilyManifest({ manifest: invalid, name: "input", humanGate: "accepted" }).join("\n")).toMatch(/shared field/);
  }
});

it("keeps Input CSS restricted to the precise native-control, focus, visibility and system-color exceptions", () => {
  expect(b2.validateInputCssExceptions).toBeTypeOf("function");
  const contract = helpers.parseYamlSubset(readFileSync("manifests/contracts/tailwind-b2.yaml", "utf8"));
  const source = readFileSync("packages/ui/src/styles.css", "utf8");
  expect(b2.validateInputCssExceptions({ contract, source })).toEqual([]);
  expect(b2.validateInputCssExceptions({ contract, source: `${source}\n.rain-input { height: 24px; }` }).join("\n")).toMatch(/exact/);
  expect(b2.validateInputCssExceptions({ contract, source: source.replace("visibility: hidden", "opacity: 0") }).join("\n")).toMatch(/exact/);
});

it("keeps the approved shared status focus and readonly pointer boundary exact", () => {
  const contract = helpers.parseYamlSubset(readFileSync("manifests/contracts/tailwind-b2.yaml", "utf8"));
  const source = readFileSync("packages/ui/src/styles.css", "utf8");
  expect(b2.validateInputCssExceptions({ contract, source })).toEqual([]);
  for (const changed of [
    source.replaceAll(":not([data-pointer-focus])", ""),
    source.replace("--rain-focus-control: var(--rain-field-focus-line)", "--rain-focus-control: var(--rain-color-focus-control)"),
    source.replaceAll("outline-offset: 2px", "outline-offset: 0"),
    source.replaceAll('[data-appearance="underlined"]', '[data-appearance="outlined"]'),
  ]) expect(b2.validateInputCssExceptions({ contract, source: changed }).join("\n")).toMatch(/exact/);
});

it("protects every new Input family implementation and its documentation consumer", () => {
  const contract = helpers.parseYamlSubset(readFileSync("manifests/contracts/tailwind-b2.yaml", "utf8")) as any;
  expect(contract.protectedPaths.optional).toEqual(expect.arrayContaining([
    "packages/ui/src/input/input.styles.ts", "packages/ui/src/input/form-item.tsx",
    "packages/ui/src/input/search-input.tsx", "apps/playground/src/docs/components/input-page.tsx",
  ]));
});

it("uses the existing class merger and finite imported class table", () => {
  expect(rainCn("h-rain-input-24", "h-rain-input-36")).toBe("h-rain-input-36");
  expect(rainCn("size-rain-input-clear", "size-rain-icon-button-control-28")).toBe("size-rain-icon-button-control-28");
  const filePath = "apps/playground/src/docs/token-foundations/input-size-example.tsx";
  const source = 'import { inputSizeClassNames } from "@rain-next/foundations"; export function Demo({size}) { return <div className={inputSizeClassNames[size]} />; }';
  expect(validateTokenConsumerSource({ filePath, source })).toEqual([]);
  expect(validateTokenConsumerSource({ filePath, source: 'export function Demo() { return <div className="h-rain-input-30" />; }' }).join("\n")).toMatch(/Unregistered Rain utility/);
});
