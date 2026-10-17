import { hasTokenFirstV12Authorization, hasTokenFirstV12G1NextAuthorization } from "./verification-helpers.mjs";
import { hasGenerationQualityAuthorization, matchesRn15ProtectedSource, validateTokenFoundationsV1Phase } from "./verification-helpers.mjs";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { hasTableRn08Authorization, hasLayoutsV1Authorization, layoutsV1Files, parseYamlSubset } from "./verification-helpers.mjs";
import { validateLayoutsRuntimeGeometry, validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

const path = (file: string) => fileURLToPath(new URL("../" + file, import.meta.url));
const read = (file: string) => readFileSync(path(file), "utf8");
const phase = () => parseYamlSubset(read("status/current-phase.yaml")) as any;

it("limits RN-06 to its exact candidate authorization and preserves every earlier phase record", () => {
  const status = phase();
  expect(() => validateTokenFoundationsV1Phase(status)).not.toThrow();
  expect(hasLayoutsV1Authorization(status)).toBe(true);
  for (const patch of [{ humanGate: "accepted" }, { contrastAcceptance: "accepted" }, { scope: "all-layouts" }, { unexpected: true }]) {
    expect(hasLayoutsV1Authorization({ ...status, componentRefinements: { ...status.componentRefinements, layoutsV1: { ...status.componentRefinements.layoutsV1, ...patch } } })).toBe(false);
  }
  const beforeSource = read("evidence/runtime/layouts-v1/before/status/current-phase.yaml.txt");
  const checkpointSource = read("evidence/runtime/spacing-hierarchy/before/status/current-phase.yaml.txt");
  expect(createHash("sha256").update(beforeSource).digest("hex")).toBe("f4710b10c685873975b094b3943412ff2e288a59c5e37606231ffd622dd67fb2");
  expect(createHash("sha256").update(checkpointSource).digest("hex")).toBe("a1c904b8452adc67df92ca441c26d2a594a07460647e5f1696dcf5a3a0e46141");
  const before: any = parseYamlSubset(beforeSource), checkpoint: any = parseYamlSubset(checkpointSource);
  const { layoutsV1: recordedLayout, ...earlier } = checkpoint.componentRefinements;
  expect({ ...checkpoint, componentRefinements: earlier }).toEqual(before);
  expect(() => validateTokenFoundationsV1Phase(before)).not.toThrow();
  expect(() => validateTokenFoundationsV1Phase(checkpoint)).not.toThrow();
  const layoutsV1 = status.componentRefinements.layoutsV1;
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
  expect(original).toEqual(recordedLayout);
});

it("rejects unknown live successors and mutations to the frozen parent history", () => {
  const status = phase();
  for (const field of ["unapprovedSuccessor", "componentRefinements"]) {
    const changed = structuredClone(status);
    if (field === "componentRefinements") changed.componentRefinements.unapprovedSuccessor = { authorization: "authorized" };
    else changed[field] = { authorization: "authorized" };
    expect(() => validateTokenFoundationsV1Phase(changed)).toThrow();
  }
  const changed = structuredClone(status);
  changed.phaseHistory.tailwindB2.blockedActions.push("unrecorded permission");
  expect(() => validateTokenFoundationsV1Phase(changed)).toThrow();
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

it("adds only workspace Layout links and preserves protected UI and Foundations at the frozen RN15 checkpoint", () => {
  const status = phase();
  const spacingSource = read("evidence/runtime/spacing-hierarchy/baseline.json");
  expect(createHash("sha256").update(spacingSource).digest("hex")).toBe("183591bcf550c34e3e0658307e50829a24b6393416fa5619c0c76b3eacff4334");
  const spacing = JSON.parse(spacingSource);
  const frozen = (file: string) => {
    const bytes = read("evidence/runtime/spacing-hierarchy/before/" + file + ".txt");
    expect(createHash("sha256").update(bytes).digest("hex"), file).toBe(spacing.sourceSha256[file]);
    return bytes;
  };
  for (const app of ["playground", "prototype"]) {
    const file = `apps/${app}/package.json`, before = JSON.parse(read(`evidence/runtime/layouts-v1/before/${file}.txt`));
    expect(JSON.parse(frozen(file))).toEqual({ ...before, dependencies: { ...before.dependencies, "@rain-next/layouts": "workspace:*" } });
  }
  const pkg = JSON.parse(read("packages/layouts/package.json"));
  expect(pkg.dependencies).toEqual({ "@rain-next/foundations": "workspace:*", react: "^19.2.8" });
  expect(pkg.exports).toEqual({ ".": "./src/index.ts", "./styles.css": "./src/layout.css" });
  const beforeLock = read("evidence/runtime/layouts-v1/before/pnpm-lock.yaml.txt");
  expect(frozen("pnpm-lock.yaml").split("\npackages:\n")[1]).toBe(beforeLock.split("\npackages:\n")[1]);
  const baseline = JSON.parse(read("evidence/runtime/layouts-v1/baseline.json"));
  expect(createHash("sha256").update(read("evidence/runtime/layouts-v1/baseline.json")).digest("hex")).toBe("f1deb188e49ec1aa56d9004bd8a98bd3ecac930ecce2302753697195c40c2f03");
  const transitions = JSON.parse(read("evidence/runtime/rn15-delivery/source-transitions.json"));
  const archive = "evidence/runtime/rn14-editability/starter-final.tar.gz";
  expect(createHash("sha256").update(readFileSync(path(archive))).digest("hex")).toBe("81ed247e9e3c57bf9edd94ace9bea30487557ab5404c26570aa8ea055c7f900e");
  expect(createHash("sha256").update(read("evidence/runtime/rn15-delivery/source-transitions.json")).digest("hex")).toBe("dbc947f3c4e19dfb0570d4ff69325d9968ad68c41631c81ce02a631d91e0b7eb");
  const historicalRoot = mkdtempSync(join(tmpdir(), "rain-layouts-rn15-frozen-"));
  // These earlier consumers were intentionally outside the BM-A/B starter; their original checksums still apply live.
  const outsideStarter = new Set(["apps/prototype/src/course-dialog.tsx", "apps/prototype/src/course-dialog.css", "apps/prototype/src/card-recipes.tsx", "apps/prototype/src/card-recipes.css"]);
  try {
    const extracted = spawnSync("tar", ["-xzf", path(archive), "-C", historicalRoot], { encoding: "utf8" });
    expect(extracted.error).toBeUndefined(); expect(extracted.status).toBe(0);
    expect(Object.keys(baseline.protectedSha256)).toHaveLength(1925);
    for (const [file, checksum] of Object.entries(baseline.protectedSha256)) {
      const frozenFile = join(historicalRoot, file);
      expect(existsSync(frozenFile) || outsideStarter.has(file), file).toBe(true);
      const source = readFileSync(outsideStarter.has(file) ? path(file) : frozenFile);
      expect(matchesRn15ProtectedSource(file, source, checksum, status, transitions), file).toBe(true);
    }
    for (const entry of transitions.filter((entry: any) => ["packages/foundations/src/tokens.css", "packages/ui/src/index.ts", "packages/ui/src/styles.css"].includes(entry.file))) {
      const source = readFileSync(join(historicalRoot, entry.file));
      expect(matchesRn15ProtectedSource(entry.file, Buffer.concat([source, Buffer.from("\n/* unrecorded change */")]), entry.beforeSha256, status, transitions), entry.file).toBe(false);
      expect(matchesRn15ProtectedSource(entry.file, source, entry.beforeSha256, status, []), entry.file).toBe(false);
    }
  } finally {
    rmSync(historicalRoot, { recursive: true, force: true });
  }
});
