// @vitest-environment node
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import * as fs from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { getValidatedTailwindB2History, hasRn14Authorization, parseYamlSubset } from "./verification-helpers.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
it("delivers reachable design guidance and locks it with each standalone starter", async () => {
  const { exportStarter, verifyStarter } = await import("./rn14-starter.mjs");
  const temporary = mkdtempSync(join(tmpdir(), "rain-design-guidance-"));
  try {
    for (const milestone of ["M1", "M2"]) {
      const output = join(temporary, milestone), lock = exportStarter(output, { milestone });
      expect(existsSync(join(output, "AGENTS.md"))).toBe(true);
      const pending = ["AGENTS.md"], visited = new Set<string>();
      while (pending.length) {
        const file = pending.pop()!;
        if (visited.has(file)) continue;
        visited.add(file);
        const content = readFileSync(join(output, file), "utf8");
        for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
          const href = match[1];
          if (!href || /^(?:https?:|#)/.test(href)) continue;
          const target = resolve(output, dirname(file), href.split("#")[0] ?? "");
          expect(target.startsWith(output + "/"), `${file}: outside starter`).toBe(true);
          expect(existsSync(target), `${file}: ${match[1]}`).toBe(true);
          if (target.endsWith(".md")) pending.push(target.slice(output.length + 1));
        }
      }
      expect(visited).toContain("docs/ai/prototype-design.md");
      expect(visited).toContain("docs/ai/form-composition.md");
      const guide = "docs/ai/prototype-design.md";
      expect(readFileSync(join(output, guide), "utf8")).toBe(readFileSync(join(root, guide), "utf8"));
      expect(lock.sourceFiles[guide]).toBe(lock.files[guide]);
      expect(verifyStarter(output)).toBe(lock.snapshotId);
      writeFileSync(join(output, guide), "changed guidance");
      expect(() => verifyStarter(output)).toThrow(/changed/);
    }
  } finally { rmSync(temporary, { recursive: true, force: true }); }
});
it("exports M2 only when explicitly requested, while the default starter remains A/B", async () => {
  const { exportStarter, verifyStarter } = await import("./rn14-starter.mjs");
  const temporary = mkdtempSync(join(tmpdir(), "rain-m2-starter-check-"));
  try {
    exportStarter(join(temporary, "m1"));
    expect(existsSync(join(temporary, "m1/apps/prototype/src/scenarios/bm-c"))).toBe(false);
    const output = join(temporary, "m2"), lock = exportStarter(output, { milestone: "M2" });
    expect(existsSync(join(output, "apps/prototype/src/scenarios/bm-c/page.tsx"))).toBe(true);
    expect(existsSync(join(output, "apps/prototype/src/scenarios/bm-d/page.tsx"))).toBe(true);
    expect(existsSync(join(output, "apps/prototype/src/scenarios/bm-d/state.test.tsx"))).toBe(false);
    expect(readFileSync(join(output, "apps/prototype/src/main.tsx"), "utf8")).toContain("LearningReportScenario");
    expect(verifyStarter(output)).toBe(lock.snapshotId);
    expect(() => exportStarter(join(temporary, "invalid"), { milestone: "M3" })).toThrow(/milestone/);
  } finally { rmSync(temporary, { recursive: true, force: true }); }
});
it("exports a fixed local starter without links to the source workspace and detects changed shared files", async () => {
  expect(existsSync(join(root, "scripts/rn14-starter.mjs"))).toBe(true);
  const { exportStarter, verifyStarter } = await import("./rn14-starter.mjs");
  const temporary = mkdtempSync(join(tmpdir(), "rain-rn14-check-"));
  const output = join(temporary, "starter");
  try {
    const lock = exportStarter(output);
    expect(lock.inputCommit).toMatch(/^[a-f0-9]{40}$/);
    expect(lock.snapshotId).toMatch(/^rn14-[a-f0-9]{16}$/);
    expect(lock.workingTree).toBe("content-addressed-local-snapshot");
    expect(verifyStarter(output)).toEqual(lock.snapshotId);
    const tokens = "packages/foundations/src/tokens.css";
    expect(readFileSync(join(output, tokens), "utf8")).toBe(readFileSync(join(root, tokens), "utf8"));
    expect(existsSync(join(output, "apps/playground"))).toBe(false);
    expect(existsSync(join(output, "node_modules"))).toBe(false);
    expect(readFileSync(join(output, "apps/prototype/src/main.tsx"), "utf8")).not.toContain(root);
    expect(readFileSync(join(output, "pnpm-lock.yaml"), "utf8")).toBe(readFileSync(join(root, "pnpm-lock.yaml"), "utf8"));
    expect(() => exportStarter(output)).toThrow(/exists/);
    expect(() => exportStarter(join(root, "rn14-unsafe-output"))).toThrow(/outside/);
    const extra = join(output, "apps/prototype/src/extra.ts");
    writeFileSync(extra, "const invalid: number = 'unexpected';");
    expect(() => verifyStarter(output)).toThrow(/inventory/);
    rmSync(extra);
    const nested = join(output, "apps/prototype/src/dist");
    fs.mkdirSync(nested);
    writeFileSync(join(nested, "extra.ts"), "const invalid: number = 'unexpected';");
    expect(() => verifyStarter(output)).toThrow(/inventory/);
    rmSync(nested, { recursive: true });
    writeFileSync(join(output, tokens), "changed");
    expect(() => verifyStarter(output)).toThrow(/changed/);
    rmSync(join(output, tokens));
    (fs as any).symlinkSync(join(root, tokens), join(output, tokens));
    expect(() => verifyStarter(output)).toThrow(/Symbolic link|Invalid path/);
  } finally { rmSync(temporary, { recursive: true, force: true }); }
  const phase = parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) as any;
  expect(hasRn14Authorization(phase)).toBe(true);
  expect(getValidatedTailwindB2History(phase)).toEqual(phase.phaseHistory.tailwindB2);
  const decision = {
    acceptedAt: "2026-09-15", decisionSource: "explicit-user-rn14-final-sample-visual-confirmation", userStatement: "确认",
    scope: "rn14-bm-a-b-final-snapshot-runtime-visual-only", snapshotId: "rn14-90fc74205a764fb1",
    evidence: "../evidence/runtime/rn14-editability/human-gate.md",
  };
  const accepted = structuredClone(phase);
  Object.assign(accepted.componentRefinements.rn14Editability, { humanGate: "accepted", humanGateDecision: decision });
  expect(hasRn14Authorization(accepted)).toBe(true);
  expect(getValidatedTailwindB2History(accepted)).toEqual(phase.phaseHistory.tailwindB2);
  const pending = structuredClone(accepted);
  pending.componentRefinements.rn14Editability.humanGate = "awaiting_human";
  delete pending.componentRefinements.rn14Editability.humanGateDecision;
  expect(hasRn14Authorization(pending)).toBe(true);
  for (const mutation of [
    { humanGateDecision: undefined }, { humanGateDecision: { ...decision, scope: "all-components" } },
    { humanGateDecision: { ...decision, snapshotId: "another-snapshot" } }, { implementation: "in-progress" },
    { scope: "all-apps" }, { publication: "published" }, { businessMigration: "authorized" }, { contrastAcceptance: "granted" },
  ]) {
    const invalid = structuredClone(accepted);
    Object.assign(invalid.componentRefinements.rn14Editability, mutation);
    expect(hasRn14Authorization(invalid)).toBe(false);
    expect(() => getValidatedTailwindB2History(invalid)).toThrow();
  }
});
