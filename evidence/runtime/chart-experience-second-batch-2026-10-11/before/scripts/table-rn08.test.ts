import { matchesRn15ProtectedSource, validateTokenFoundationsV1Phase } from "./verification-helpers.mjs";
import { readFileSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
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
const frozenPhase = (file: string, sha256: string) => {
  const source = read(file);
  expect(createHash("sha256").update(source).digest("hex"), file).toBe(sha256);
  return parseYamlSubset(source) as any;
};

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
  expect(() => validateTokenFoundationsV1Phase(status)).not.toThrow();
  expect(hasTableRn08Authorization(status)).toBe(true);
  for (const patch of [{ scope: "all-data-components" }, { dependencies: { reactTable: "9.0.0", tableCore: "9.0.0" } }, { humanGate: "accepted" }, { contrastAcceptance: "accepted" }, { packageOrRegistryPublication: "published" }, { unexpected: true }]) {
    expect(hasTableRn08Authorization({ ...status, componentRefinements: { ...status.componentRefinements, tableRn08: { ...current, ...patch } } })).toBe(false);
  }
  const before = frozenPhase("evidence/runtime/table-rn08/before-phase.yaml.txt", "93756106f926ecadd09719fbe342d1198c0430dc44a96c19197cff8c25db5c8f");
  const checkpoint = frozenPhase("evidence/runtime/inside-field-labels/before/status/current-phase.yaml.txt", "3aa6b3052a8f2699561a060d6ce70c6a31d30b269116754d8b53ec8b40413338");
  const earlier = structuredClone(checkpoint); delete earlier.componentRefinements.tableRn08;
  expect(earlier).toEqual(before);
  expect(() => validateTokenFoundationsV1Phase(checkpoint)).not.toThrow();
  const hashSource = read("evidence/runtime/table-rn08/before-hashes.json");
  expect(createHash("sha256").update(hashSource).digest("hex")).toBe("276349f7aa47966e5524344655159cd45aacfe648e8eac4a426b88acc1c6ae2c");
  const hashes = JSON.parse(hashSource);
  const transitionSource = read("evidence/runtime/rn15-delivery/source-transitions.json");
  expect(createHash("sha256").update(transitionSource).digest("hex")).toBe("dbc947f3c4e19dfb0570d4ff69325d9968ad68c41631c81ce02a631d91e0b7eb");
  const transitions = JSON.parse(transitionSource);
  const archive = path("evidence/runtime/rn14-editability/starter-final.tar.gz");
  expect(createHash("sha256").update(readFileSync(archive)).digest("hex")).toBe("81ed247e9e3c57bf9edd94ace9bea30487557ab5404c26570aa8ea055c7f900e");
  const frozenRoot = mkdtempSync(join(tmpdir(), "rain-table-rn08-source-checkpoint-"));
  try {
    const extraction = spawnSync("tar", ["-xzf", archive, "-C", frozenRoot], { encoding: "utf8" });
    expect(extraction.status, extraction.stderr).toBe(0);
    const protectedFiles = Object.entries(hashes).filter(([file]) => file.startsWith("packages/") && file !== "packages/ui/src/index.ts");
    expect(protectedFiles).toHaveLength(1932);
    for (const [file, checksum] of protectedFiles) {
      // The original empty package marker is outside the starter payload and still uses its strict original hash.
      const source = readFileSync(file === "packages/layouts/.gitkeep" ? path(file) : join(frozenRoot, file));
      expect(matchesRn15ProtectedSource(file, source, checksum, status, transitions), file).toBe(true);
    }
    const file = "packages/foundations/src/tokens.css", source = readFileSync(join(frozenRoot, file));
    expect(matchesRn15ProtectedSource(file, Buffer.concat([source, Buffer.from("\n/* unrecorded change */")]), hashes[file], status, transitions)).toBe(false);
    expect(matchesRn15ProtectedSource(file, source, hashes[file], status, [])).toBe(false);
    expect(matchesRn15ProtectedSource(file, source, hashes[file], status, transitions.map((entry: any) => ({ ...entry, authorization: "all-files" })))).toBe(false);
  } finally { rmSync(frozenRoot, { recursive: true, force: true }); }
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
  const before = frozenPhase("evidence/runtime/inside-field-labels/before/status/current-phase.yaml.txt", "3aa6b3052a8f2699561a060d6ce70c6a31d30b269116754d8b53ec8b40413338");
  const checkpoint = frozenPhase("evidence/runtime/empty-refinement/before-phase.yaml.txt", "b785081e54aacf3367ea9d6f0e00505933d00189e130c006579870ba833d4ce8");
  const current = structuredClone(checkpoint);
  delete current.componentRefinements.tableRn08.insideFieldLabels;
  expect(current).toEqual(before);
  expect(() => validateTokenFoundationsV1Phase(checkpoint)).not.toThrow();
  const lock = JSON.parse(read("evidence/runtime/inside-field-labels/before/source-lock.json"));
  expect(Object.keys(lock.sha256)).toEqual([...insideFieldLabelFiles, "status/current-phase.yaml"]);
  for (const [file, checksum] of Object.entries(lock.sha256)) {
    expect(createHash("sha256").update(readFileSync(path(`evidence/runtime/inside-field-labels/before/${file}.txt`))).digest("hex"), file).toBe(checksum);
  }
});

it("limits the Empty follow-up to its own presentations and preserves the preceding phase and original art", () => {
  const status = phase(), entry = status.componentRefinements.tableRn08.emptyRefinement;
  expect(hasEmptyRefinementAuthorization(status)).toBe(true);
  const before = frozenPhase("evidence/runtime/empty-refinement/before-phase.yaml.txt", "b785081e54aacf3367ea9d6f0e00505933d00189e130c006579870ba833d4ce8");
  const checkpoint = frozenPhase("evidence/runtime/bm-a-rn09/before/status/current-phase.yaml.txt", "76aaeaf31a6a5f2a858fcc0cd17d2ca23e03bb2239ebede64c9d32be88c9896a");
  const previous = structuredClone(checkpoint);
  delete previous.componentRefinements.tableRn08.emptyRefinement;
  expect(previous).toEqual(before);
  expect(() => validateTokenFoundationsV1Phase(checkpoint)).not.toThrow();
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

it("rejects unknown Table successors and changes to the frozen parent history", () => {
  const status = phase();
  for (const change of ["top-level", "component", "history"]) {
    const invalid = structuredClone(status);
    if (change === "top-level") invalid.unapprovedSuccessor = { authorization: "authorized" };
    if (change === "component") invalid.componentRefinements.unapprovedSuccessor = { authorization: "authorized" };
    if (change === "history") invalid.phaseHistory.tailwindB2.blockedActions.push("unrecorded permission");
    expect(() => validateTokenFoundationsV1Phase(invalid)).toThrow();
  }
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
