import { copyCurrentGovernanceFixture } from "./select-unification-test-fixture";
// @vitest-environment node
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceInventories = [
  "evidence/runtime/navigation-v042/w7/final-source.json",
  "evidence/runtime/navigation-v042/w7/regression-map.json",
  "evidence/runtime/navigation-v042/w6/review-02/final-source.json",
  "evidence/runtime/navigation-v042/w6/review-02/README.md",
  "evidence/runtime/navigation-v042/w6/review-02/review-summary.json",
  "evidence/runtime/navigation-rebuild-v03/final-source-lock.json",
];
let fixtureRoot: string;
let runNumber = 0;

function verify(label: string) {
  const result = spawnSync(process.execPath, [join(fixtureRoot, "scripts/verify-boundaries.mjs")], {
    cwd: fixtureRoot,
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
    timeout: 20_000,
    // Git is read-only here; the copied worktree pointer retains the authorized HEAD and remote.
    env: { ...process.env, GIT_WORK_TREE: fixtureRoot },
  });
  const output = `${result.stdout}${result.stderr}`;
  if (process.env.RAIN_BOUNDARY_AUDIT_DIR) {
    mkdirSync(process.env.RAIN_BOUNDARY_AUDIT_DIR, { recursive: true });
    writeFileSync(join(process.env.RAIN_BOUNDARY_AUDIT_DIR, `${++runNumber}-${label}.log`), output);
  }
  expect(result.error).toBeUndefined();
  return { status: result.status, output };
}

function mutate(file: string, content: string, label: string) {
  const target = join(fixtureRoot, file);
  const original = existsSync(target) ? readFileSync(target) : undefined;
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
    return verify(label);
  } finally {
    if (original === undefined) rmSync(target, { force: true });
    else writeFileSync(target, original);
  }
}

describe("accepted navigation boundary inventory", () => {
  beforeAll(() => {
    fixtureRoot = mkdtempSync(join(tmpdir(), "rain-navigation-boundary-"));
    copyCurrentGovernanceFixture(workspaceRoot, fixtureRoot);
    symlinkSync(join(workspaceRoot, "node_modules"), join(fixtureRoot, "node_modules"), "dir");
  }, 60_000);

  afterAll(() => {
    if (fixtureRoot) rmSync(fixtureRoot, { recursive: true, force: true });
  }, 30_000);

  it("accepts the current finite registered sources without treating archived copies as live code", () => {
    const result = verify("registered-baseline");
    expect(result.output).toMatch(/Boundary verification passed/);
    expect(result.status).toBe(0);
  });

  it.each([
    ["unapproved-navigation.ts", "root"],
    ["apps/playground/src/recipes/navigation-v042/unapproved.tsx", "application"],
    ["packages/ui/src/navigation/unapproved.ts", "ui"],
    ["packages/layouts/src/unapproved.ts", "layouts"],
    ["tests/e2e/unapproved-navigation.spec.ts", "test"],
  ])("rejects an unknown live source: %s", (file, label) => {
    const result = mutate(file, "export const unapproved = true;\n", `unknown-${label}`);
    expect(result.status).toBe(1);
    expect(result.output).toContain(file);
    expect(result.output).toMatch(/outside|unapproved|allowlist/);
  });

  it("rejects an unapproved Headless module even inside a registered G3 wrapper", () => {
    const file = "packages/ui/src/hover-card/hover-card.tsx";
    const result = mutate(file, `${readFileSync(join(fixtureRoot, file), "utf8")}\nimport { Dialog } from '@base-ui/react/dialog';\n`, "headless");
    expect(result.status).toBe(1);
    expect(result.output).toContain(`unapproved Headless or shadcn import found in ${file}`);
  });

  it("rejects Foundations importing UI through a known source", () => {
    const file = "packages/foundations/src/token-contract.ts";
    const result = mutate(file, `${readFileSync(join(fixtureRoot, file), "utf8")}\nimport { Button } from '@rain-next/ui';\n`, "reverse-dependency");
    expect(result.status).toBe(1);
    expect(result.output).toContain(`Foundations reverses the dependency direction in ${file}`);
  });

  it("rejects an unauthorized direct package dependency", () => {
    const file = "packages/ui/package.json";
    const manifest = JSON.parse(readFileSync(join(fixtureRoot, file), "utf8"));
    manifest.dependencies.clsx = "2.1.1";
    const result = mutate(file, JSON.stringify(manifest), "dependency");
    expect(result.status).toBe(1);
    expect(result.output).toMatch(/dependency allowlist|outside the frozen Day 3 dependency set|changed an unrelated source: packages\/ui\/package.json/);
  });

  it("retains the exact historical evidence allowlist", () => {
    const file = "evidence/runtime/tailwind-b2/unapproved.yaml";
    const result = mutate(file, "kind: Unapproved\n", "historical-evidence");
    expect(result.status).toBe(1);
    expect(result.output).toContain(file);
    expect(result.output).toMatch(/runtime evidence outside the exact allowlist/);
  });

  it.each([
    ["registry/navigation-v042.json", "packages/ui/src/navigation/unauthorized-boundary.ts", "registry"],
    ["evidence/runtime/navigation-v042/w6/review-02/final-source.json", "unauthorized-boundary.ts", "freeze"],
    ["evidence/runtime/navigation-v042/w7/regression-map.json", "tests/e2e/unauthorized-boundary.spec.ts", "map"],
  ])("rejects self-registration through an altered inventory: %s", (inventory, file, label) => {
    const document = JSON.parse(readFileSync(join(fixtureRoot, inventory), "utf8"));
    if (label === "registry") document.shared.files.push(file);
    if (label === "freeze") document.filesSha256[file] = "0".repeat(64);
    if (label === "map") document.cases[0].testFiles.push(file);
    const target = join(fixtureRoot, file);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, "export const unauthorizedBoundary = true;\n");
    try {
      const result = mutate(inventory, JSON.stringify(document), `inventory-${label}`);
      expect(result.status).toBe(1);
      expect(result.output).toMatch(/recorded Registry|accepted inventory|inventory.*SHA|immutable|unapproved|outside/);
    } finally {
      rmSync(target, { force: true });
    }
  });

  it.each(["docs/ai", "evidence/runtime/navigation-v042", "artifacts"])("rejects a registered runtime importing executable code from a data domain: %s", (directory) => {
    const file = `${directory}/unauthorized-boundary.ts`;
    const dataSource = join(fixtureRoot, file);
    const runtime = "packages/ui/src/navigation/navigation-families.tsx";
    mkdirSync(dirname(dataSource), { recursive: true });
    writeFileSync(dataSource, "export const unauthorizedBoundary = true;\n");
    try {
      const result = mutate(runtime, `${readFileSync(join(fixtureRoot, runtime), "utf8")}\nimport '../../../../${file.replace(/\.ts$/, "")}';\n`, `${directory.split('/')[0]}-import`);
      expect(result.status).toBe(1);
      expect(result.output).toMatch(/unregistered.*import|import.*data domain|source import.*outside/);
    } finally {
      rmSync(dataSource, { force: true });
    }
  });

  it("does not let a mutable Manifest example authorize an unknown source", () => {
    const file = "packages/ui/src/breadcrumb/unauthorized-boundary.ts";
    const target = join(fixtureRoot, file);
    const manifest = "manifests/ui/breadcrumb.yaml";
    const source = readFileSync(join(fixtureRoot, manifest), "utf8");
    writeFileSync(target, "export const unauthorizedBoundary = true;\n");
    try {
      const result = mutate(manifest, source.replace("examples:\n", `examples:\n  - "${file}"\n`), "manifest-example");
      expect(result.status).toBe(1);
      expect(result.output).toContain(file);
      expect(result.output).toMatch(/outside.*allowlist/);
    } finally {
      rmSync(target, { force: true });
    }
  });

  it("does not switch to the data/source domain when the accepted parent phase is invalid", () => {
    const file = "status/current-phase.yaml";
    const source = readFileSync(join(fixtureRoot, file), "utf8");
    const invalid = source.replace(/(\nnavigationComponentsV042:[\s\S]*?\n  humanGate: )"accepted"/, '$1"pending"');
    expect(invalid).not.toBe(source);
    const result = mutate(file, invalid, "invalid-parent");
    expect(result.status).toBe(1);
    // An invalid parent never receives the historical Day 3 policy, so no new inventory/domain is activated.
    expect(result.output).toContain("Invalid Token Foundations V1 phase contract: recorded phase scope navigationComponentsV042");
    expect(result.output).toContain("no explicit boundary policy exists for phase token-foundations-v1");
    expect(result.output).not.toContain("Boundary verification passed");
  });
});
