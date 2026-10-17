import { matchesRn15ProtectedSource, validateTokenFoundationsV1Phase } from "./verification-helpers.mjs";
import { readFileSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import { parseYamlSubset, hasDialogV2Authorization, hasDialogRefinementAuthorization, isDialogV2Import } from "./verification-helpers.mjs";
import { prepareDialogLayoutSource, validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

const path = (file: string) => fileURLToPath(new URL("../" + file, import.meta.url));
const read = (file: string) => readFileSync(path(file), "utf8");
it("limits RN-05 authorization, headless imports and candidate metadata", () => {
  const status: any = parseYamlSubset(read("status/current-phase.yaml"));
  expect(() => validateTokenFoundationsV1Phase(status)).not.toThrow();
  expect(hasDialogV2Authorization(status)).toBe(true);
  for (const patch of [{ humanGate: "accepted" }, { scope: "all-components" }, { contrastAcceptance: "accepted" }, { unexpected: true }]) {
    expect(hasDialogV2Authorization({ ...status, componentRefinements: { ...status.componentRefinements, dialogV2: { ...status.componentRefinements.dialogV2, ...patch } } })).toBe(false);
  }
  const dialog = status.componentRefinements.dialogV2;
  expect(hasDialogV2Authorization({ ...status, componentRefinements: { ...status.componentRefinements, dialogV2: { ...dialog, visualRefinement: null } } })).toBe(false);
  for (const patch of [{ scope: "all-components" }, { humanGate: "accepted" }, { unexpected: true }]) {
    expect(hasDialogV2Authorization({ ...status, componentRefinements: { ...status.componentRefinements, dialogV2: { ...dialog, visualRefinement: { ...dialog.visualRefinement, ...patch } } } })).toBe(false);
  }
  expect(isDialogV2Import("packages/ui/src/dialog/dialog.tsx", "@base-ui/react/dialog")).toBe(true);
  expect(isDialogV2Import("apps/prototype/src/course-dialog.tsx", "@base-ui/react/dialog")).toBe(false);
  expect(isDialogV2Import("packages/ui/src/dialog/dialog.tsx", "@base-ui/react/alert-dialog")).toBe(false);
  const registry = JSON.parse(read("registry/dialog.json"));
  expect(registry.publication).toBe("not-published");
  expect(registry.humanGate).toBe("awaiting_human");
  for (const item of registry.items) {
    const manifest: any = parseYamlSubset(read(item.manifest));
    expect(manifest.maturity).toBe("registry-candidate");
    const phase: any = parseYamlSubset(read("status/current-phase.yaml"));
    const accepted = item.name !== "separator" && hasDialogRefinementAuthorization(phase) && phase.componentRefinements.dialogRefinement.humanGate === "accepted";
    expect(manifest.verification.humanGate).toBe(accepted ? "accepted" : "awaiting_human");
    expect(manifest.verification.humanGateScope).toBe(accepted ? "dialog-alert-dialog-runtime-visual-only" : undefined);
    for (const path of item.files) expect(existsSync(fileURLToPath(new URL("../" + path, import.meta.url)))).toBe(true);
  }
});

it("keeps layout variable and forced-color exemptions exact and rejects extra paint", () => {
  const status = parseYamlSubset(read("status/current-phase.yaml"));
  const path = "apps/prototype/src/course-dialog.tsx", source = read(path);
  expect(prepareDialogLayoutSource(path, source, status)).not.toContain("--rain-local-course-dialog-gap");
  expect(prepareDialogLayoutSource(path, source, {})).toBe(source);
  expect(prepareDialogLayoutSource(path, source.replace("var(--rain-space-24)", "red"), status)).toContain('"--rain-local-course-dialog-gap": "red"');
  const filePath = "packages/ui/src/dialog/dialog.css", css = read(filePath);
  expect(validateRegisteredRecipeColors({ filePath, source: css })).toEqual([]);
  expect(validateRegisteredRecipeColors({ filePath, source: css.replace("(forced-colors: active)", "(max-width: 640px)") }).length).toBeGreaterThan(0);
  expect(validateRegisteredRecipeColors({ filePath, source: css + ".outside { color: red; }" }).length).toBeGreaterThan(0);
});

it("retains upstream contents and the protected pre-batch UI at the frozen RN15 checkpoint", () => {
  const source = JSON.parse(read("evidence/runtime/dialog-v2/source-lock.json"));
  for (const item of source.files) expect(createHash("sha256").update(read(item.localPath)).digest("hex")).toBe(item.sha256);
  const baseline = JSON.parse(read("evidence/runtime/dialog-v2/baseline.json"));
  expect(createHash("sha256").update(read("evidence/runtime/dialog-v2/baseline.json")).digest("hex")).toBe("2e779c585c5638be1604a8d100c0e5f1e7be0b401752a6a8737bc8ea2de91aa1");
  const status = parseYamlSubset(read("status/current-phase.yaml")) as any;
  const transitions = JSON.parse(read("evidence/runtime/rn15-delivery/source-transitions.json"));
  const archive = path("evidence/runtime/rn14-editability/starter-final.tar.gz");
  expect(createHash("sha256").update(readFileSync(archive)).digest("hex")).toBe("81ed247e9e3c57bf9edd94ace9bea30487557ab5404c26570aa8ea055c7f900e");
  expect(createHash("sha256").update(read("evidence/runtime/rn15-delivery/source-transitions.json")).digest("hex")).toBe("dbc947f3c4e19dfb0570d4ff69325d9968ad68c41631c81ce02a631d91e0b7eb");
  const historicalRoot = mkdtempSync(join(tmpdir(), "rain-dialog-rn15-frozen-"));
  // Card recipe pages were intentionally outside the BM-A/B starter; their original checksums still apply live.
  const outsideStarter = new Set(["apps/prototype/src/card-recipes.tsx", "apps/prototype/src/card-recipes.css"]);
  try {
    const extracted = spawnSync("tar", ["-xzf", archive, "-C", historicalRoot], { encoding: "utf8" });
    expect(extracted.error).toBeUndefined(); expect(extracted.status).toBe(0);
    expect(Object.keys(baseline.protectedSha256)).toHaveLength(1915);
    for (const [file, checksum] of Object.entries(baseline.protectedSha256)) {
      const frozenFile = join(historicalRoot, file);
      expect(existsSync(frozenFile) || outsideStarter.has(file), file).toBe(true);
      const source = readFileSync(outsideStarter.has(file) ? fileURLToPath(new URL("../" + file, import.meta.url)) : frozenFile);
      expect(matchesRn15ProtectedSource(file, source, checksum, status, transitions), file).toBe(true);
    }
    for (const entry of transitions.filter((entry: any) => ["packages/foundations/src/tokens.css", "packages/ui/src/styles.css"].includes(entry.file))) {
      const source = readFileSync(join(historicalRoot, entry.file));
      expect(matchesRn15ProtectedSource(entry.file, Buffer.concat([source, Buffer.from("\n/* unrecorded change */")]), entry.beforeSha256, status, transitions), entry.file).toBe(false);
      expect(matchesRn15ProtectedSource(entry.file, source, entry.beforeSha256, status, []), entry.file).toBe(false);
      expect(matchesRn15ProtectedSource(entry.file, source, entry.beforeSha256, { ...status, componentRefinements: { ...status.componentRefinements, rn15Delivery: undefined } }, transitions), entry.file).toBe(false);
    }
  } finally {
    rmSync(historicalRoot, { recursive: true, force: true });
  }
});
