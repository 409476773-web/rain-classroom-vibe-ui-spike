// @vitest-environment node
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

it("recognizes existing Foundation wildcard exports while excluding type-only exports and resolving cycles", async () => {
  const { validateAsset } = await import("./asset-index.mjs");
  const fixture = mkdtempSync(resolve(tmpdir(), "rain-g4-asset-index-"));
  try {
    mkdirSync(resolve(fixture, "packages/foundations/src"), { recursive: true });
    writeFileSync(resolve(fixture, "packages/foundations/package.json"), JSON.stringify({ name: "@rain-next/foundations", exports: { ".": "./src/index.ts" } }));
    writeFileSync(resolve(fixture, "packages/foundations/src/index.ts"), 'export * from "./typography-contract"; export type * from "./types";');
    writeFileSync(resolve(fixture, "packages/foundations/src/typography-contract.ts"), 'export const typographyPresets = {}; export * from "./index";');
    writeFileSync(resolve(fixture, "packages/foundations/src/types.ts"), "export type Typography = string;");
    const asset = {
      manifest: { id: "foundation-typography", sourcePath: "packages/foundations/src/typography-contract.ts" },
      item: { exportNames: ["typographyPresets"], importPath: "@rain-next/foundations", files: ["packages/foundations/src/typography-contract.ts"] },
      registry: {},
    };
    expect(() => validateAsset(asset, fixture)).not.toThrow();
    expect(() => validateAsset({ ...asset, item: { ...asset.item, exportNames: ["Typography"] } }, fixture)).toThrow("Unexported asset");
  } finally { rmSync(fixture, { recursive: true, force: true }); }
});

it("finds existing assets by their interaction purpose", async () => {
  const { readAssets, renderAssetIndex } = await import("./asset-index.mjs");
  const assets = readAssets(root);
  for (const [purpose, expected] of [
    ["内容分区", "Tabs"],
    ["单选", "RadioGroup"],
    ["筛选", "CheckableTagGroup"],
    ["图标操作", "IconButton"],
  ]) expect(renderAssetIndex(assets, purpose)).toContain("**" + expected + "**");
  expect(renderAssetIndex(assets, "内容分区")).not.toContain("**RadioGroup**");
  expect(renderAssetIndex(assets, "not-an-interaction-purpose")).toContain("未找到");
});

it("limits generation-quality authorization without changing previous decisions", () => {
  const phase = helpers.parseYamlSubset(readFileSync(resolve(root, "status/current-phase.yaml"), "utf8")) as any;
  expect(() => helpers.getValidatedTailwindB2History(phase)).not.toThrow();
  for (const change of [
    { scope: "all-components" }, { humanGate: "accepted" },
    { publication: "published" }, { businessMigration: "authorized" },
    { implementation: "completed", automatedVerification: "not-run" },
  ]) {
    const invalid = structuredClone(phase);
    Object.assign(invalid.componentRefinements.generationQuality, change);
    expect(() => helpers.getValidatedTailwindB2History(invalid)).toThrow();
  }
  for (const change of [{ scope: "all-benchmarks" }, { evidence: "../unreviewed.md" }, { authorizedAt: "2026-09-15" }, { humanGate: "accepted" }, { unexpected: true }]) {
    const knowledge = structuredClone(phase);
    Object.assign(knowledge.componentRefinements.generationQuality.designKnowledgeDelivery, change);
    expect(helpers.hasGenerationQualityAuthorization(knowledge)).toBe(false);
    const invalid = structuredClone(phase);
    Object.assign(invalid.componentRefinements.generationQuality.compositionRefinement, change);
    expect(helpers.hasGenerationQualityAuthorization(invalid)).toBe(false);
    const workbench = structuredClone(phase);
    Object.assign(workbench.componentRefinements.generationQuality.bmCCompositionRefinement, change);
    expect(helpers.hasGenerationQualityAuthorization(workbench)).toBe(false);
    const primary = structuredClone(phase);
    Object.assign(primary.componentRefinements.generationQuality.bmCPrimaryWorkflowRefinement, change);
    expect(helpers.hasGenerationQualityAuthorization(primary)).toBe(false);
    const directory = structuredClone(phase);
    Object.assign(directory.componentRefinements.generationQuality.bmCDirectoryRefinement, change);
    expect(helpers.hasGenerationQualityAuthorization(directory)).toBe(false);
    const questionSwitch = structuredClone(phase);
    Object.assign(questionSwitch.componentRefinements.generationQuality.bmCQuestionSwitchRefinement, change);
    expect(helpers.hasGenerationQualityAuthorization(questionSwitch)).toBe(false);
    const previous = structuredClone(phase);
    Object.assign(previous.componentRefinements.generationQuality.bmCVisualRefinement, change);
    expect(helpers.hasGenerationQualityAuthorization(previous)).toBe(false);
  }

});

it("keeps the asset index traceable, current and separate from local experiments and acceptance", async () => {
  expect(existsSync(resolve(root, "scripts/asset-index.mjs"))).toBe(true);
  const { readAssets, renderAssetIndex, validateAsset } = await import("./asset-index.mjs");
  const assets = readAssets(root);
  const markdown = renderAssetIndex(assets);
  expect(readFileSync(resolve(root, "docs/ai/asset-index.md"), "utf8")).toBe(markdown);
  for (const file of ["docs/ai/README.md", "docs/ai/asset-index.md"]) {
    for (const match of readFileSync(resolve(root, file), "utf8").matchAll(/\]\(([^)]+)\)/g)) {
      const target = match[1];
      if (!target || /^https?:/.test(target)) continue;
      expect(existsSync(resolve(root, dirname(file), target.split("#")[0] ?? "")), `${file}: ${target}`).toBe(true);
    }
  }
  for (const name of ["Input", "SearchInput", "FormItem", "Card", "Dialog", "Textarea", "Table", "Split"]) {
    expect(markdown).toContain(`**${name}**`);
  }
  for (const name of ["Button", "Badge", "Surface", "Link"]) {
    const asset = assets.find((entry: any) => entry.manifest.name === name)!;
    expect(asset.manifest.assetIdentity).toBe("local-experiment");
    expect(markdown).not.toContain(`**${name}**`);
  }
  const dialog = assets.find((entry: any) => entry.manifest.name === "Dialog")!;
  const textarea = assets.find((entry: any) => entry.manifest.name === "Textarea")!;
  expect(dialog.manifest.verification.humanGate).toBe("accepted");
  expect(textarea.manifest.verification.humanGate).toBe("awaiting_human");
  expect(markdown).toContain("not-granted");
  expect(renderAssetIndex(assets, "Textarea")).not.toContain("**Dialog**");
  expect(renderAssetIndex(assets, "not-an-asset")).toContain("未找到");
  for (const change of [
    { item: { ...dialog.item, exportName: "MissingExport" } },
    { item: { ...dialog.item, importPath: "@other/ui" } },
    { item: { ...dialog.item, typeDependencies: ["registry/core-ui.json#missing-type"] } },
    { item: { ...dialog.item, files: ["missing.tsx"] } },
    { manifest: { ...dialog.manifest, sourcePath: "../outside.tsx" } },
    { registry: { ...dialog.registry, shared: { registryDependencies: ["button"] } } },
  ]) expect(() => validateAsset({ ...dialog, ...change }, root)).toThrow();
  const failed = { ...dialog, manifest: { ...dialog.manifest, verification: { ...dialog.manifest.verification, automated: "failed" } } };
  expect(renderAssetIndex([failed])).not.toContain("**Dialog**");

  const phase = helpers.parseYamlSubset(readFileSync(resolve(root, "status/current-phase.yaml"), "utf8")) as any;
  expect(helpers.hasRn13Authorization(phase)).toBe(true);
  expect(helpers.getValidatedTailwindB2History(phase)).toEqual(phase.phaseHistory.tailwindB2);
  for (const change of [{ scope: "all-components" }, { humanGate: "accepted" }, { publication: "published" }, { businessMigration: "authorized" }]) {
    const invalid = structuredClone(phase);
    Object.assign(invalid.componentRefinements.rn13AssetIndex, change);
    expect(helpers.hasRn13Authorization(invalid)).toBe(false);
    expect(() => helpers.getValidatedTailwindB2History(invalid)).toThrow();
  }
});
