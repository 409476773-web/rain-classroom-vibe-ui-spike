import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import * as b2 from "./verify-tailwind-b2.mjs";
import { rainCn } from "../packages/ui/src/utils/rain-class-names";
import { validateTokenConsumerSource } from "./verify-token-foundations.mjs";

it("records formal dependency integration separately from the initial Select and Human Gate", () => {
  expect(helpers.hasSelectFormalDependenciesAuthorization).toBeTypeOf("function");
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(helpers.hasSelectFormalDependenciesAuthorization(status)).toBe(true);
  for (const key of ["scope", "headless", "humanGate", "contrastAcceptance"]) {
    const changed = structuredClone(status);
    changed.componentRefinements.select.formalDependencies[key] = "unscoped-or-accepted";
    expect(helpers.hasSelectFormalDependenciesAuthorization(changed)).toBe(false);
    expect(helpers.hasSelectRefinementAuthorization(changed)).toBe(false);
  }
});

it("allows only the two selection primitives in the authorized Select source", () => {
  expect(helpers.isSelectFormalImport).toBeTypeOf("function");
  for (const primitive of ["select", "combobox"]) expect(helpers.isSelectFormalImport("packages/ui/src/select/select.tsx", `@base-ui/react/${primitive}`)).toBe(true);
  expect(helpers.isSelectFormalImport("packages/ui/src/select/select.tsx", "@base-ui/react/menu")).toBe(false);
  expect(helpers.isSelectFormalImport("packages/ui/src/dialog/dialog.tsx", "@base-ui/react/select")).toBe(false);
});

it("requires the Select instruction independently of the Input and Tag permissions", () => {
  expect(helpers.hasSelectRefinementAuthorization).toBeTypeOf("function");
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(helpers.hasSelectRefinementAuthorization(status)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(status).componentRefinements.select).toBeUndefined();
  const missing = structuredClone(status);
  delete missing.componentRefinements.select;
  expect(helpers.hasSelectRefinementAuthorization(missing)).toBe(false);
  for (const mutate of [
    (record: any) => { record.scope = "all-fields-and-menus"; },
    (record: any) => { record.userStatement = "视觉验收完成。"; },
    (record: any) => { delete record.humanGateDecision; },
    (record: any) => { record.contrastAcceptance = "accepted"; },
    (record: any) => { record.extraPermission = "publish"; },
  ]) {
    const invalid = structuredClone(status);
    mutate(invalid.componentRefinements.select);
    expect(helpers.hasSelectRefinementAuthorization(invalid)).toBe(false);
    expect(() => helpers.getValidatedTailwindB2History(invalid)).toThrow(/history/);
  }
});

it("keeps the Select candidate, dependency set and CSS scope exact", () => {
  const manifest = helpers.parseYamlSubset(readFileSync("manifests/ui/select.yaml", "utf8")) as any;
  const registry = JSON.parse(readFileSync("registry/select.json", "utf8"));
  expect(b2.validateSelectManifest({ manifest })).toEqual([]);
  expect(b2.validateSelectRegistry(registry, { humanGate: "accepted" })).toEqual([]);
  expect(b2.validateSelectManifest({ manifest: { ...manifest, publication: "published" } }).length).toBeGreaterThan(0);
  expect(b2.validateSelectManifest({ manifest: { ...manifest, verification: { ...manifest.verification, humanGateScope: "all-components" } } }).length).toBeGreaterThan(0);
  expect(b2.validateSelectRegistry({ ...registry, registryDependencies: [] }, { humanGate: "accepted" }).length).toBeGreaterThan(0);
  const contract = helpers.parseYamlSubset(readFileSync("manifests/contracts/tailwind-b2.yaml", "utf8"));
  const source = readFileSync("packages/ui/src/styles.css", "utf8");
  expect(b2.validateInputCssExceptions({ contract, source })).toEqual([]);
  expect(b2.validateInputCssExceptions({ contract, source: source.replace('.rain-tag__remove { margin: 0; }', '.rain-tag__remove { margin: 8px; }') }).length).toBeGreaterThan(0);
  expect(b2.validateInputCssExceptions({ contract, source: source + '\n.rain-select { color: red; }' }).length).toBeGreaterThan(0);
});

it("accepts static Select sizes while rejecting dynamic utilities without confusing generated DOM ids", () => {
  const filePath = "packages/ui/src/select/select.tsx";
  expect(b2.validateProtectedTailwindSource({ filePath, source: 'const optionId = `${id}-group-${index}`; const className = "text-rain-category-text-neutral-1";' })).toEqual([]);
  for (const value of ["hover:bg-rain-${color}", "min-w-rain-${size}", "max-h-rain-${size}", "-mt-rain-${space}"]) {
    expect(b2.validateProtectedTailwindSource({ filePath, source: "const className = `" + value + "`;" }).join(" ")).toMatch(/dynamic/);
  }
  const source = 'import { selectSizeClassNames } from "@rain-next/foundations"; const size = 32; export const View = () => <div className={selectSizeClassNames[size]} />;';
  expect(validateTokenConsumerSource({ filePath: "select-consumer.tsx", source })).toEqual([]);
  expect(validateTokenConsumerSource({ filePath: "select-consumer.tsx", source: source.replace("@rain-next/foundations", "./pretend") }).length).toBeGreaterThan(0);
  expect(rainCn("h-rain-select-24", "h-rain-select-36")).toBe("h-rain-select-36");
  expect(rainCn("size-rain-select-action", "w-full")).toBe("size-rain-select-action w-full");
});

it("registers only the planned Select sources and keeps unrelated families outside its file set", () => {
  expect(helpers.selectRefinementFiles).toBeDefined();
  const files = Object.values(helpers.selectRefinementFiles).flat();
  expect(files).toContain("packages/ui/src/field/field.styles.ts");
  expect(files).toContain("packages/ui/src/select/select.tsx");
  expect(files).not.toContain("packages/ui/src/tag/tag.tsx");
  expect(files).not.toContain("packages/ui/src/dialog/dialog.tsx");
  expect(files.every((file) => !file.includes("*"))).toBe(true);
});
