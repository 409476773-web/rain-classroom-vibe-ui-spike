import { hasInputNumberAuthorization } from "./verification-helpers.mjs";
import { hasTokenFirstV12Authorization, hasTokenFirstV12G1NextAuthorization } from "./verification-helpers.mjs";
import { hasAvatarFamilyAuthorization } from "./verification-helpers.mjs";
import { hasGenerationQualityAuthorization, hasM2Authorization, hasBmBRn10Authorization, hasBmARn09Authorization, hasRn13Authorization, hasRn14Authorization, hasRn15Authorization, hasDialogRefinementAuthorization, matchesRn15ProtectedSource } from "./verification-helpers.mjs";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { hasTableRn08Authorization, hasLayoutsV1Authorization, layoutsV1Files, parseYamlSubset } from "./verification-helpers.mjs";
import { validateLayoutsRuntimeGeometry, validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

const path = (file: string) => fileURLToPath(new URL("../" + file, import.meta.url));
const read = (file: string) => readFileSync(path(file), "utf8");
const phase = () => parseYamlSubset(read("status/current-phase.yaml")) as any;

it("limits RN-06 to its exact candidate authorization and preserves every earlier phase record", () => {
  const status = phase();
  expect(hasLayoutsV1Authorization(status)).toBe(true);
  for (const patch of [{ humanGate: "accepted" }, { contrastAcceptance: "accepted" }, { scope: "all-layouts" }, { unexpected: true }]) {
    expect(hasLayoutsV1Authorization({ ...status, componentRefinements: { ...status.componentRefinements, layoutsV1: { ...status.componentRefinements.layoutsV1, ...patch } } })).toBe(false);
  }
  const { layoutsV1, ...earlier } = status.componentRefinements;
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
  if (hasTableRn08Authorization(status)) delete earlier.tableRn08;
  const before: any = parseYamlSubset(read("evidence/runtime/layouts-v1/before/status/current-phase.yaml.txt"));
  expect({ ...status, componentRefinements: earlier }).toEqual(before);
  expect(layoutsV1.scope).toBe("rn-06-stack-inline-grid-split-and-local-consumers");
  expect(layoutsV1Files.layouts).toHaveLength(7);
  for (const patch of [{ humanGateDecision: undefined }, { scope: "all-components" }, { implementation: "published" }, { automatedVerification: "failed" }, { independentReview: "not-run" }, { contrastAcceptance: "accepted" }, { unexpected: true }]) {
    expect(hasLayoutsV1Authorization({ ...status, componentRefinements: { ...status.componentRefinements,
      layoutsV1: { ...layoutsV1, spacingHierarchy: { ...layoutsV1.spacingHierarchy, ...patch } } } })).toBe(false);
  }
  const { spacingHierarchy, ...original } = layoutsV1;
  const accepts = (spacing: any) => hasLayoutsV1Authorization({ ...status, componentRefinements: { ...status.componentRefinements, layoutsV1: { ...layoutsV1, spacingHierarchy: spacing } } });
  for (const key of ["acceptedAt", "decisionSource", "userStatement", "scope", "evidence"]) {
    const incomplete = { ...spacingHierarchy.humanGateDecision }; delete incomplete[key];
    expect(accepts({ ...spacingHierarchy, humanGateDecision: incomplete })).toBe(false);
  }
  expect(accepts({ ...spacingHierarchy, humanGateDecision: { ...spacingHierarchy.humanGateDecision, scope: "all-components" } })).toBe(false);
  expect(accepts({ ...spacingHierarchy, humanGate: "awaiting_human" })).toBe(false);
  const { humanGateDecision, ...unaccepted } = spacingHierarchy;
  expect(accepts({ ...unaccepted, humanGate: "awaiting_human" })).toBe(true);
  expect(spacingHierarchy.humanGate).toBe("accepted");
  const expected = { humanGate: "accepted", humanGateScope: humanGateDecision.scope, evidence: humanGateDecision.evidence.replace(/^\.\.\//, "") };
  const registry = JSON.parse(read("registry/layouts.json"));
  expect(registry.spacingHierarchy).toEqual(expected); expect(registry.humanGate).toBe("awaiting_human");
  for (const name of ["stack", "inline", "grid", "split"]) {
    const manifest: any = parseYamlSubset(read(`manifests/layouts/${name}.yaml`));
    expect(manifest.verification.spacingHierarchy).toEqual(expected); expect(manifest.verification.humanGate).toBe("awaiting_human");
  }
  const beforeSpacing: any = parseYamlSubset(read("evidence/runtime/spacing-hierarchy/before/status/current-phase.yaml.txt"));
  expect(original).toEqual(beforeSpacing.componentRefinements.layoutsV1);
});

it("keeps Layout variables local to finite geometry and reuses the existing Space classes", () => {
  const status = phase(), filePath = "packages/layouts/src/layout.tsx", source = read(filePath);
  const verify = (source: string, file = filePath) => validateLayoutsRuntimeGeometry({ filePath: file, source, status });
  expect(verify(source)).toEqual([]);
  expect(validateLayoutsRuntimeGeometry({ filePath, source, status: {} }).length).toBeGreaterThan(0);
  expect(verify(source, "apps/prototype/src/layout-recipes.tsx").length).toBeGreaterThan(0);
  expect(verify(source.replace('"--rain-layout-gap": compositionSpaceTokens[gap]', '"--rain-layout-gap": "red"')).length).toBeGreaterThan(0);
  expect(verify(source.replace('0: "gap-rain-0"', '0: "gap-0"')).length).toBeGreaterThan(0);
  expect(verify(source.replace('"--rain-layout-columns": columns', 'backgroundColor: "red", "--rain-layout-columns": columns')).length).toBeGreaterThan(0);
  const cssPath = "packages/layouts/src/layout.css", css = read(cssPath);
  expect(verify(css, cssPath)).toEqual([]);
  expect(verify(css.replace("./workspace.css", "./unapproved.css"), cssPath).length).toBeGreaterThan(0);
  expect(verify("@import './workspace.css';\n" + css, cssPath).length).toBeGreaterThan(0);
  expect(verify(css + ".rain-grid { color: red }", cssPath).length).toBeGreaterThan(0);
  expect(verify(css.replace("width: var(--rain-layout-sidebar-width)", "color: var(--rain-layout-sidebar-width)"), cssPath).length).toBeGreaterThan(0);
  const examplePath = "apps/prototype/src/layout-recipes.css", example = read(examplePath);
  expect(validateRegisteredRecipeColors({ filePath: examplePath, source: example })).toEqual([]);
  expect(validateRegisteredRecipeColors({ filePath: examplePath, source: example + ".outside { color: red; }" }).length).toBeGreaterThan(0);
});

it("adds only workspace Layout links and leaves upstream resolutions, UI and Foundations unchanged", () => {
  for (const app of ["playground", "prototype"]) {
    const file = `apps/${app}/package.json`;
    const before = JSON.parse(read(`evidence/runtime/layouts-v1/before/${file}.txt`));
    expect(JSON.parse(read(file))).toEqual({ ...before, dependencies: { ...before.dependencies, "@rain-next/layouts": "workspace:*", ...(app === "prototype" && hasTableRn08Authorization(phase()) ? { "@tanstack/react-table": "8.21.3" } : {}), ...(app === "prototype" && hasGenerationQualityAuthorization(phase()) ? { recharts: "3.10.1", "react-is": "19.2.8" } : {}), ...(app === "prototype" && hasTokenFirstV12Authorization(phase()) ? { "@base-ui/react": "1.8.0", "class-variance-authority": "0.7.1" } : {}), ...(app === "prototype" && hasTokenFirstV12G1NextAuthorization(phase()) ? { "react-resizable-panels": "4.12.4" } : {}) } });
  }
  const pkg = JSON.parse(read("packages/layouts/package.json"));
  expect(pkg.dependencies).toEqual({ "@rain-next/foundations": "workspace:*", react: "^19.2.8" });
  expect(pkg.exports).toEqual({ ".": "./src/index.ts", "./styles.css": "./src/layout.css" });
  const beforeLock = read("evidence/runtime/layouts-v1/before/pnpm-lock.yaml.txt");
  let resolutions = read("pnpm-lock.yaml").split("\npackages:\n")[1]!;
  if (hasGenerationQualityAuthorization(phase())) {
    const source = read("evidence/runtime/generation-quality/lockfile-additions.json");
    expect(createHash("sha256").update(source).digest("hex")).toBe("d91de8b48e6b8f770a3820095a7ec66e18b91ac5336dee8be3cde5ed34b024e7");
    for (const addition of JSON.parse(source)) {
      expect(resolutions.split(addition)).toHaveLength(2);
      resolutions = resolutions.replace(addition, "");
    }
  }
  if (hasTableRn08Authorization(phase())) {
    const additions = resolutions.match(/^  '@tanstack\/(?:react-table|table-core)@8\.21\.3[^\n]*\n(?: {4}[^\n]*\n|\n)*/gm) ?? [];
    expect(additions).toHaveLength(4);
    for (const addition of additions) resolutions = resolutions.replace(addition, "");
  }
  if (hasTokenFirstV12G1NextAuthorization(phase())) {
    const additions = read("evidence/runtime/token-first-v12-g1-next/lockfile-additions.json");
    expect(createHash("sha256").update(additions).digest("hex")).toBe("25b3be71f9ec4e3c8b6fc114a6315417e16f566305636f79e07e6b15f52201bf");
    for (const addition of JSON.parse(additions)) {
      expect(resolutions.split(addition)).toHaveLength(2);
      resolutions = resolutions.replace(addition, "");
    }
  }
  expect(resolutions).toBe(beforeLock.split("\npackages:\n")[1]);
  const baseline = JSON.parse(read("evidence/runtime/layouts-v1/baseline.json"));
  const transitions = JSON.parse(read("evidence/runtime/rn15-delivery/source-transitions.json"));
  for (const [file, checksum] of Object.entries(baseline.protectedSha256)) {
    expect(matchesRn15ProtectedSource(file, readFileSync(path(file)), checksum, phase(), transitions), file).toBe(true);
  }
});
