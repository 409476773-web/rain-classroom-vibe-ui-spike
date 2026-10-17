// @vitest-environment node
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { readAssets, renderAssetIndex } from "./asset-index.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";
import { getValidatedTailwindB2History, hasTreeAuthorization, parseYamlSubset } from "./verification-helpers.mjs";

it("recognizes the authorized Tree scope without granting publication or wider visual acceptance", () => {
  const status = parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(hasTreeAuthorization(status)).toBe(true);
  const isolated = structuredClone(status);
  for (const key of ["schemaVersion", "kind", "preparationOutputs", "preparationChecks", "componentRefinements", "componentHumanGates", "independentAuditCheckpoints", "pendingGitActions"]) isolated[key] = structuredClone(status.phaseHistory.tailwindB2[key]);
  isolated.componentRefinements.treeDesignAndImplementationRules = status.componentRefinements.treeDesignAndImplementationRules;
  expect(getValidatedTailwindB2History(isolated)).toEqual(status.phaseHistory.tailwindB2);
  for (const change of [{ scope: "all-components" }, { publication: "published" }, { contrastAcceptance: "accepted" }, { runtimeAcceptance: "all-states-accepted" }]) {
    const invalid = structuredClone(isolated);
    Object.assign(invalid.componentRefinements.treeDesignAndImplementationRules, change);
    expect(hasTreeAuthorization(invalid)).toBe(false);
    expect(() => getValidatedTailwindB2History(invalid)).toThrow();
  }
  isolated.phaseHistory.tailwindB2.unapproved = true;
  expect(() => getValidatedTailwindB2History(isolated)).toThrow();
});

it("discovers scoped Tree candidates without promoting their verification or acceptance", () => {
  const assets = readAssets();
  for (const name of ["Tree", "ManageTree"]) {
    const asset = assets.find((entry: any) => entry.manifest.name === name)!;
    const index = renderAssetIndex([asset]);
    expect(index).toContain(`**${name}**`);
    expect(index).toContain("scoped-passed /");
    expect(index).toContain("not-granted / unpublished");
    for (const automated of ["not-run", "failed"]) {
      expect(renderAssetIndex([{ ...asset, manifest: { ...asset.manifest, verification: { ...asset.manifest.verification, automated } } }])).not.toContain(`**${name}**`);
    }
  }
});

it("registers Tree example paints and leaves only the known pale-color decisions open", () => {
  for (const filePath of ["apps/playground/src/docs/components/tree-page.css", "apps/playground/src/docs/components/tree-behavior-examples.tsx", "packages/ui/src/tree/tree.css"]) {
    const failures = validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8") });
    expect(failures.filter((failure: string) => !/Weak Neutral|contrast/.test(failure))).toEqual([]);
  }
});
