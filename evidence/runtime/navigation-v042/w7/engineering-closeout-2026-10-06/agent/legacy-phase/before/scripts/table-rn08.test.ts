import { hasInputNumberAuthorization } from "./verification-helpers.mjs";
import { hasTokenFirstV12Authorization } from "./verification-helpers.mjs";
import { hasAvatarFamilyAuthorization } from "./verification-helpers.mjs";
import { hasGenerationQualityAuthorization, hasM2Authorization, hasBmBRn10Authorization, hasBmARn09Authorization, hasRn13Authorization, hasRn14Authorization, hasRn15Authorization, hasDialogRefinementAuthorization, matchesRn15ProtectedSource } from "./verification-helpers.mjs";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import { hasEmptyRefinementAuthorization, emptyRefinementFiles, hasInsideFieldLabelsAuthorization, insideFieldLabelFiles, hasTableVisualRefinementAuthorization, hasTablePaginationReplacementAuthorization, hasTableRn08Authorization, tableRn08Files, parseYamlSubset } from "./verification-helpers.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";
import { validateInputCssExceptions } from "./verify-tailwind-b2.mjs";

const path = (file: string) => fileURLToPath(new URL("../" + file, import.meta.url));
const read = (file: string) => readFileSync(path(file), "utf8");
const phase = () => parseYamlSubset(read("status/current-phase.yaml")) as any;

it("keeps both header states as pending critical text and rejects weakened color roles or surfaces", () => {
  const filePath = "packages/ui/src/table/table.styles.ts", source = read(filePath), outputs = getTokenFoundationOutputs();
  const pendingEligibilityFindings: any[] = [];
  expect(validateRegisteredRecipeColors({ filePath, source, outputs, root: path(""), pendingEligibilityFindings })).toEqual([]);
  expect(pendingEligibilityFindings.map(entry => [entry.recipeId, entry.theme])).toEqual([
    ["table-header", "light"], ["table-header", "dark"], ["table-header-hover", "light"], ["table-header-hover", "dark"],
  ]);
  for (const entry of pendingEligibilityFindings) {
    expect(entry).toMatchObject({ acceptedException: false, content: "text", interaction: "interactive", critical: true, minimum: 4.5 });
    expect(entry.actual).toBeGreaterThanOrEqual(4.5);
    if (entry.recipeId === "table-header-hover") expect(entry).toMatchObject({ parentSurfaceId: "Fill/Neutral/Alpha/5", parentBackgroundId: "Background/Neutral/2" });
  }
  for (const patch of [{ interaction: "non-interactive" }, { critical: false }, { content: "decorative" }, { tokenId: "Text/Neutral/5" }]) {
    const invalid = structuredClone(outputs);
    Object.assign(invalid.colorRecipeConsumers.find(entry => entry.filePath === filePath)!.recipes.find((entry: { id: string }) => entry.id === "table-header")!.foreground, patch);
    expect(validateRegisteredRecipeColors({ filePath, source, outputs: invalid, root: path("") }).length).toBeGreaterThan(0);
  }
  const invalid = structuredClone(outputs);
  invalid.colorRecipeConsumers.find(entry => entry.filePath === filePath)!.recipes.find((entry: { id: string }) => entry.id === "table-header-hover")!.parentSurfaces = ["Background/Neutral/1"];
  expect(validateRegisteredRecipeColors({ filePath, source, outputs: invalid, root: path("") }).length).toBeGreaterThan(0);
});

it("limits the visual refinement to the confirmed token, row heights and local toolbar", () => {
  const status = phase(), table = status.componentRefinements.tableRn08;
  expect(hasTableVisualRefinementAuthorization(status)).toBe(true);
  for (const patch of [{ hover: "Fill/Neutral/Alpha/1" }, { heights: { ...table.visualRefinement.heights, compactHeader: 44 } }, { toolbarHeights: { default: 36, compact: 32 } }, { humanGate: "accepted" }, { scope: "all-controls" }]) {
    expect(hasTableRn08Authorization({ ...status, componentRefinements: { ...status.componentRefinements, tableRn08: { ...table, visualRefinement: { ...table.visualRefinement, ...patch } } } })).toBe(false);
  }
});

it("authorizes only RN-08 and preserves all prior phase records and existing shared implementations", () => {
  const status = phase(), current = status.componentRefinements.tableRn08;
  expect(hasTableRn08Authorization(status)).toBe(true);
  for (const patch of [{ scope: "all-data-components" }, { dependencies: { reactTable: "9.0.0", tableCore: "9.0.0" } }, { humanGate: "accepted" }, { contrastAcceptance: "accepted" }, { packageOrRegistryPublication: "published" }, { unexpected: true }]) {
    expect(hasTableRn08Authorization({ ...status, componentRefinements: { ...status.componentRefinements, tableRn08: { ...current, ...patch } } })).toBe(false);
  }
  const { tableRn08, ...earlier } = status.componentRefinements;
  if (hasTokenFirstV12Authorization(status)) delete earlier.tokenFirstV12;
  if (hasAvatarFamilyAuthorization(status)) delete earlier.avatarFamily;
  if (hasInputNumberAuthorization(status)) delete earlier.inputNumber;
  if (hasGenerationQualityAuthorization(status)) delete earlier.generationQuality;
  if (hasM2Authorization(status)) delete earlier.m2Delivery;
  if (hasRn15Authorization(status)) delete earlier.rn15Delivery;
  if (hasDialogRefinementAuthorization(status)) delete earlier.dialogRefinement;
  if (hasRn14Authorization(status)) delete earlier.rn14Editability;
  if (hasRn13Authorization(status)) delete earlier.rn13AssetIndex;
  if (hasBmBRn10Authorization(status)) delete earlier.bmBRn10;
  if (hasBmARn09Authorization(status)) delete earlier.bmARn09;
  expect({ ...status, componentRefinements: earlier }).toEqual(parseYamlSubset(read("evidence/runtime/table-rn08/before-phase.yaml.txt")));
  const hashes = JSON.parse(read("evidence/runtime/table-rn08/before-hashes.json"));
  const transitions = JSON.parse(read("evidence/runtime/rn15-delivery/source-transitions.json"));
  for (const [file, checksum] of Object.entries(hashes)) if (file.startsWith("packages/") && file !== "packages/ui/src/index.ts") {
    expect(matchesRn15ProtectedSource(file, readFileSync(path(file)), checksum, status, transitions), file).toBe(true);
  }
});

it("keeps the three candidates and all referenced sources unpublished; the data engine stays in the local host", () => {
  for (const file of Object.values(tableRn08Files).flat() as string[]) expect(existsSync(path(file)), file).toBe(true);
  const registry = JSON.parse(read("registry/table.json"));
  expect(registry.publication).toBe("not-published"); expect(registry.humanGate).toBe("awaiting_human");
  expect(registry.localRecipe.dependencies).toEqual({ "@tanstack/react-table": "8.21.3" });
  expect(registry.localRecipe.searchable).toBe(false);
  for (const item of registry.items) {
    const manifest: any = parseYamlSubset(read(item.manifest));
    expect(manifest.maturity).toBe("registry-candidate"); expect(manifest.publication).toBe("unpublished");
    expect(manifest.verification.humanGate).toBe(item.name === "pagination" && hasTablePaginationReplacementAuthorization(phase()) ? "accepted" : item.name === "empty" && hasEmptyRefinementAuthorization(phase()) ? phase().componentRefinements.tableRn08.emptyRefinement.humanGate : "awaiting_human");
    for (const file of item.files) expect(read(file)).not.toContain("@tanstack/");
  }
  expect(JSON.parse(read("apps/prototype/package.json")).dependencies["@tanstack/react-table"]).toBe("8.21.3");
  expect(JSON.parse(read("packages/ui/package.json")).dependencies["@tanstack/react-table"]).toBeUndefined();
  expect(JSON.parse(read("apps/playground/package.json")).dependencies["@tanstack/react-table"]).toBeUndefined();
});

// The replacement reuses the confirmed source exactly; other component contracts stay frozen.
it("uses only the confirmed pagination source under the explicit replacement scope", () => {
  const status = phase();
  expect(hasTablePaginationReplacementAuthorization(status)).toBe(true);
  const replacement = status.componentRefinements.tableRn08.paginationReplacement;
  for (const patch of [{ scope: "all-components" }, { humanGate: "accepted" }, { publication: "published" }, { unexpected: true }]) {
    expect(hasTableRn08Authorization({ ...status, componentRefinements: { ...status.componentRefinements, tableRn08: { ...status.componentRefinements.tableRn08, paginationReplacement: { ...replacement, ...patch } } } })).toBe(false);
  }
  for (const [file, checksum] of Object.entries(JSON.parse(read("evidence/runtime/table-pagination-replacement/source-lock.json")).sha256)) {
    expect(createHash("sha256").update(readFileSync(path(file))).digest("hex"), file).toBe(checksum);
  }
});

// A separately authorized follow-up may modify six existing files; frozen RN-06/RN-08 bytes remain verifiable.
it("limits fixed inside labels to the agreed family and preserves the preceding phase and source bytes", () => {
  const status = phase(), entry = status.componentRefinements.tableRn08.insideFieldLabels;
  expect(hasInsideFieldLabelsAuthorization(status)).toBe(true);
  const contract = parseYamlSubset(read("manifests/contracts/tailwind-b2.yaml")), css = read("packages/ui/src/styles.css");
  expect(validateInputCssExceptions({ contract, source: css, root: path("") })).toEqual([]);
  for (const rule of [".rain-field-label:hover { max-width: 100%; }", "@media (pointer: coarse) { .rain-field-label { max-width: 100%; } }"]) {
    expect(validateInputCssExceptions({ contract, source: css + rule, root: path("") }).length).toBeGreaterThan(0);
  }
  for (const patch of [{ scope: "all-form-controls" }, { labelColor: "Text/Neutral/5" }, { labelColorDecisionSource: "assumed" }, { labelPosition: { default: "inside", optional: "top" } }, { sharedFiles: [...insideFieldLabelFiles, "packages/ui/src/button.tsx"] }, { toolbarHeights: { default: 36, compact: 32 } }, { humanGate: "unknown" }, { humanGateDecision: undefined }, { humanGateDecision: { ...entry.humanGateDecision, scope: "all-components-runtime-visual" } }, { humanGateDecision: { ...entry.humanGateDecision, userStatement: "assumed" } }, { automatedVerification: "not-run" }, { contrastAcceptance: "accepted" }, { unexpected: true }]) {
    const invalid = structuredClone(status);
    invalid.componentRefinements.tableRn08.insideFieldLabels = { ...entry, ...patch };
    expect(hasInsideFieldLabelsAuthorization(invalid)).toBe(false);
    expect(hasTableRn08Authorization(invalid)).toBe(false);
  }
  const current = structuredClone(status);
  if (hasTokenFirstV12Authorization(status)) delete current.componentRefinements.tokenFirstV12;
  if (hasAvatarFamilyAuthorization(status)) delete current.componentRefinements.avatarFamily;
  if (hasInputNumberAuthorization(status)) delete current.componentRefinements.inputNumber;
  if (hasGenerationQualityAuthorization(status)) delete current.componentRefinements.generationQuality;
  if (hasM2Authorization(status)) delete current.componentRefinements.m2Delivery;
  if (hasRn15Authorization(status)) delete current.componentRefinements.rn15Delivery;
  if (hasDialogRefinementAuthorization(status)) delete current.componentRefinements.dialogRefinement;
  if (hasRn14Authorization(status)) delete current.componentRefinements.rn14Editability;
  if (hasRn13Authorization(status)) delete current.componentRefinements.rn13AssetIndex;
  if (hasBmBRn10Authorization(status)) delete current.componentRefinements.bmBRn10;
  if (hasBmARn09Authorization(status)) delete current.componentRefinements.bmARn09;
  delete current.componentRefinements.tableRn08.insideFieldLabels;
  if (hasEmptyRefinementAuthorization(status)) delete current.componentRefinements.tableRn08.emptyRefinement;
  expect(current).toEqual(parseYamlSubset(read("evidence/runtime/inside-field-labels/before/status/current-phase.yaml.txt")));
  const lock = JSON.parse(read("evidence/runtime/inside-field-labels/before/source-lock.json"));
  expect(Object.keys(lock.sha256)).toEqual([...insideFieldLabelFiles, "status/current-phase.yaml"]);
  for (const [file, checksum] of Object.entries(lock.sha256)) {
    expect(createHash("sha256").update(readFileSync(path(`evidence/runtime/inside-field-labels/before/${file}.txt`))).digest("hex"), file).toBe(checksum);
  }
});

it("limits the Empty follow-up to its own presentations and preserves the preceding phase and original art", () => {
  const status = phase(), entry = status.componentRefinements.tableRn08.emptyRefinement;
  expect(hasEmptyRefinementAuthorization(status)).toBe(true);
  const previous = structuredClone(status);
  if (hasTokenFirstV12Authorization(status)) delete previous.componentRefinements.tokenFirstV12;
  if (hasAvatarFamilyAuthorization(status)) delete previous.componentRefinements.avatarFamily;
  if (hasInputNumberAuthorization(status)) delete previous.componentRefinements.inputNumber;
  if (hasGenerationQualityAuthorization(status)) delete previous.componentRefinements.generationQuality;
  if (hasM2Authorization(status)) delete previous.componentRefinements.m2Delivery;
  if (hasRn15Authorization(status)) delete previous.componentRefinements.rn15Delivery;
  if (hasDialogRefinementAuthorization(status)) delete previous.componentRefinements.dialogRefinement;
  if (hasRn14Authorization(status)) delete previous.componentRefinements.rn14Editability;
  if (hasRn13Authorization(status)) delete previous.componentRefinements.rn13AssetIndex;
  if (hasBmBRn10Authorization(status)) delete previous.componentRefinements.bmBRn10;
  if (hasBmARn09Authorization(status)) delete previous.componentRefinements.bmARn09;
  delete previous.componentRefinements.tableRn08.emptyRefinement;
  expect(previous).toEqual(parseYamlSubset(read("evidence/runtime/empty-refinement/before-phase.yaml.txt")));
  for (const patch of [{ scope: "all-empty-consumers" }, { humanGate: "unknown" }, { humanGateDecision: undefined }, { humanGateDecision: { ...entry.humanGateDecision, scope: "all-components-runtime-visual" } }, { humanGateDecision: { ...entry.humanGateDecision, userStatement: "assumed" } }, { automatedVerification: "not-run" }, { contrastAcceptance: "accepted" }, { publication: "published" }, { unexpected: true }]) {
    const invalid = structuredClone(status);
    invalid.componentRefinements.tableRn08.emptyRefinement = { ...entry, ...patch };
    expect(hasEmptyRefinementAuthorization(invalid)).toBe(false);
    expect(hasTableRn08Authorization(invalid)).toBe(false);
  }
  for (const file of emptyRefinementFiles.ui) expect(existsSync(path(file)), file).toBe(true);
  const lock = JSON.parse(read("evidence/runtime/empty-refinement/source-lock.json"));
  expect(lock.assets).toHaveLength(14);
  expect(new Set(lock.assets.map((entry: { illustration: string }) => entry.illustration)).size).toBe(7);
  for (const asset of lock.assets) expect(createHash("sha256").update(readFileSync(path(asset.file))).digest("hex"), asset.file).toBe(asset.sha256);
  const findings: any[] = [], eligibility: any[] = [];
  expect(validateRegisteredRecipeColors({ filePath: "packages/ui/src/empty/empty.tsx", source: read("packages/ui/src/empty/empty.tsx"), outputs: getTokenFoundationOutputs(), root: path(""), pendingContrastFindings: findings, pendingEligibilityFindings: eligibility })).toEqual([]);
  expect(findings).toEqual([]);
  expect(eligibility).toEqual([]);
});

it("checks inside labels as critical interactive text on every real shared field surface", () => {
  const filePath = "packages/ui/src/input/form-item.tsx", source = read(filePath), outputs = getTokenFoundationOutputs();
  const consumer = outputs.colorRecipeConsumers.find(entry => entry.filePath === filePath)!;
  const recipes = consumer.recipes.filter((entry: { id: string }) => entry.id.startsWith("input-inside-label-"));
  expect(recipes).toHaveLength(24);
  expect(new Set(recipes.map((entry: { appearance: string }) => entry.appearance))).toEqual(new Set(["outlined", "filled", "underlined"]));
  const pendingContrastFindings: any[] = [], pendingEligibilityFindings: any[] = [];
  expect(validateRegisteredRecipeColors({ filePath, source, outputs, root: path(""), pendingContrastFindings, pendingEligibilityFindings })).toEqual([]);
  const eligibility = pendingEligibilityFindings.filter(entry => entry.recipeId.startsWith("input-inside-label-"));
  const contrast = pendingContrastFindings.filter(entry => entry.recipeId.startsWith("input-inside-label-"));
  expect(eligibility).toHaveLength(84);
  for (const entry of eligibility) expect(entry).toMatchObject({ status: "pending-review", acceptedException: false, tokenId: "Text/Neutral/4", content: "text", critical: true, interaction: "interactive", minimum: 4.5 });
  expect(contrast).toHaveLength(1);
  expect(contrast[0]).toMatchObject({ status: "pending-review", acceptedException: false, recipeId: "input-inside-label-underlined-error", theme: "light", parentSurfaceId: "Fill/Red/Alpha/2", parentBackgroundId: "Background/Neutral/3", critical: true, interaction: "interactive", minimum: 4.5 });
  expect(contrast[0].actual).toBeCloseTo(4.4968521474338745, 12);
  expect(contrast[0].actual).toBeLessThan(4.5);
  for (const recipe of recipes) expect(recipe.foreground).toMatchObject({
    tokenId: recipe.state === "disabled" ? "Text/Neutral/6" : "Text/Neutral/4", content: recipe.state === "disabled" ? "disabled" : "text", critical: true, interaction: "interactive",
  });
  for (const patch of [{ critical: false }, { interaction: "non-interactive" }, { content: "decorative" }, { tokenId: "Text/Neutral/5" }]) {
    const invalid = structuredClone(outputs);
    Object.assign(invalid.colorRecipeConsumers.find(entry => entry.filePath === filePath)!.recipes.find((entry: { id: string }) => entry.id === "input-inside-label-outlined-default")!.foreground, patch);
    expect(validateRegisteredRecipeColors({ filePath, source, outputs: invalid, root: path("") }).length).toBeGreaterThan(0);
  }
});
