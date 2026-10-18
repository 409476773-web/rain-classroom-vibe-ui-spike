import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, it, vi } from "vitest";
import { evidenceOutputPath } from "./evidence-output.mjs";

afterEach(() => vi.unstubAllEnvs());

it("keeps a historical baseline byte-identical while routing relative, absolute and repeated output paths", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-evidence-routing-"));
  try {
    const old = join(root, "facts.json");
    writeFileSync(old, "historical-baseline");
    vi.stubEnv("RAIN_IMPLEMENTATION_EVIDENCE_DIR", "new-run");
    const output = evidenceOutputPath("facts.json", root);
    expect(output).toBe(join(root, "new-run/legacy/facts.json"));
    expect(evidenceOutputPath(old, root)).toBe(output);
    expect(evidenceOutputPath(output, root)).toBe(output);
    writeFileSync(output, "new-result");
    expect(readFileSync(old, "utf8")).toBe("historical-baseline");
    expect(readFileSync(output, "utf8")).toBe("new-result");
    expect(() => evidenceOutputPath("../outside.json", root)).toThrow(/inside the workspace/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

it("defaults to artifacts and supports an explicit run outside the checkout", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-evidence-default-"));
  const run = mkdtempSync(join(tmpdir(), "rain-evidence-explicit-"));
  try {
    vi.stubEnv("RAIN_IMPLEMENTATION_EVIDENCE_DIR", "");
    expect(evidenceOutputPath("evidence/runtime/tree/new.png", root)).toBe(join(root, "artifacts/e2e/legacy/evidence/runtime/tree/new.png"));
    expect(existsSync(join(root, "evidence"))).toBe(false);
    vi.stubEnv("RAIN_IMPLEMENTATION_EVIDENCE_DIR", run);
    expect(evidenceOutputPath("evidence/runtime/tree/new.png", root)).toBe(join(run, "legacy/evidence/runtime/tree/new.png"));
  } finally { rmSync(root, { recursive: true, force: true }); rmSync(run, { recursive: true, force: true }); }
});
