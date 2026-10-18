// @vitest-environment node
import { existsSync } from "node:fs";
import { beforeAll, expect, it } from "vitest";
import { readAssets, exportsOf, packageEntry } from "./asset-index.mjs";
import { buildAssetCatalog } from "./asset-catalog.mjs";
import { buildStarterProfile, starterManifestReferences, validateStarterRequiredFiles, renderStarterGuide } from "./asset-starter-guide.mjs";

let assets: any[], catalog: any, profile: any;
beforeAll(() => {
  assets = readAssets(); catalog = buildAssetCatalog(assets, { apiTools: { exportsOf, packageEntry } });
  profile = buildStarterProfile(assets, catalog);
}, 30_000);

it("provides a model-derived portable profile without a second asset allowlist", async () => {
  const path = "./asset-starter-guide.mjs";
  const api = existsSync("scripts/asset-starter-guide.mjs") ? await import(/* @vite-ignore */ path) : {};
  expect(api.createStarterProfile).toBeTypeOf("function");
  expect(api.writeStarterGuides).toBeTypeOf("function");
  expect(api.verifyStarterGuides).toBeTypeOf("function");
});

it("preserves distinct identity, entry, Parts and styles without promoting local assets", () => {
  expect(profile.recommendedAssets.find((asset: any) => asset.id === "ui-button")).toMatchObject({ assetIdentity: "local-experiment", candidateEligible: false, entry: { kind: "public-import", importPath: "@rain-next/ui" } });
  expect(profile.recommendedAssets.find((asset: any) => asset.id === "recipe-input-group").entry).toMatchObject({ kind: "usage-reference", exportNames: [] });
  const tabs = profile.recommendedAssets.find((asset: any) => asset.id === "ui-tabs");
  expect(tabs.api.members.map((member: any) => member.reference)).toContain("Tabs.Nav");
  expect(tabs.api.styleParts).toContain("nav");
  expect(tabs.styleImports).toContain("@rain-next/ui/styles.css");
  expect(profile.excludedAssets.some((asset: any) => asset.id === "recipe-navigation-r1")).toBe(true);
  expect(renderStarterGuide(profile)).toContain("原 Playground # 路由仅为来源路由");
  expect(buildStarterProfile(assets, catalog)).toEqual(profile);
});

it("keeps M1/M2 scenes separate while both derive the same asset identities", () => {
  const m2 = buildStarterProfile(assets, catalog, { milestone: "M2" });
  expect(profile.sceneIds).toEqual(["bm-a", "bm-b"]);
  expect(m2.sceneIds).toEqual(["bm-a", "bm-b", "bm-c", "bm-d"]);
  expect(m2.recommendedAssetIds).toEqual(profile.recommendedAssetIds);
  expect(() => buildStarterProfile(assets, catalog, { milestone: "M3" })).toThrow(/milestone/);
});

it("rejects missing required Manifest and styles with an originating guide or asset", () => {
  for (const text of ["读取 `manifests/ui/resizable.yaml`", "读取[合同](../../manifests/ui/resizable.yaml)"]) expect(starterManifestReferences("docs/ai/prototype-design.md", text)).toContain("manifests/ui/resizable.yaml");
  for (const missing of ["manifests/ui/resizable.yaml", "packages/ui/src/styles.css"]) expect(() => validateStarterRequiredFiles(profile, profile.files.filter((file: string) => file !== missing))).toThrow(new RegExp(missing.replaceAll("/", "\\/")));
  expect(() => validateStarterRequiredFiles(profile, profile.files)).not.toThrow();
  const trace = { references: [{ from: "fixture", target: "evidence/runtime/missing-old.png", role: "trace", resolution: "external-trace" }] };
  expect(() => validateStarterRequiredFiles(trace, [])).not.toThrow();
});

it("rejects fake exports, type-only exports and unexported package subpaths", () => {
  for (const name of ["InventedInput", "InputProps"]) {
    const invalid = structuredClone(catalog); invalid.assets.find((asset: any) => asset.id === "ui-input").entry.exportNames = [name];
    expect(() => buildStarterProfile(assets, invalid)).toThrow(/missing or type-only export/);
  }
  const invalid = structuredClone(catalog); invalid.assets.find((asset: any) => asset.id === "ui-input").entry.importPath = "@rain-next/ui/imaginary";
  expect(() => buildStarterProfile(assets, invalid)).toThrow(/Unexported package entry/);
});

it("terminates required-context cycles and does not promote alternative source-copy scenes", () => {
  const changed = structuredClone(catalog);
  const input = changed.assets.find((asset: any) => asset.id === "ui-input"), form = changed.assets.find((asset: any) => asset.id === "ui-form-item");
  input.relationships.push({ type: "requiresContext", targetId: form.id, condition: "fixture input context" }, { type: "alternativeWhen", targetId: "recipe-navigation-r1", condition: "dedicated scene" });
  form.relationships.push({ type: "requiresContext", targetId: input.id, condition: "fixture reverse context" });
  const result = buildStarterProfile(assets, changed);
  expect(new Set(result.files).size).toBe(result.files.length);
  expect(result.references.some((ref: any) => ref.from === "ui-input" && ref.assetId === "ui-form-item" && ref.role === "required")).toBe(true);
  expect(result.recommendedAssetIds).not.toContain("recipe-navigation-r1");
  input.relationships.push({ type: "requiresContext", targetId: "recipe-navigation-r1", condition: "unavailable scene required" });
  expect(() => buildStarterProfile(assets, changed)).toThrow(/required context is unavailable/);
});
