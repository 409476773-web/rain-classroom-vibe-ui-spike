import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { expect, it } from "vitest";
import { readG6SourceBindings } from "./g6-governance.mjs";
import { restoreSliderCloseoutPhase } from "./verification-helpers.mjs";
import * as verifier from "./verify-g6-components.mjs";

it("checks the Drawer successor before reading the original G6 proof", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-drawer-integration-"));
  try {
    const phase = { componentRefinements: { g6Components: {}, drawerRefinement: { sourceBindings: "evidence/runtime/drawer-refinement-2026-10-14/source-bindings.json" } } };
    mkdirSync(join(root, "status")); writeFileSync(join(root, "status/current-phase.yaml"), JSON.stringify(phase));
    mkdirSync(join(root, "evidence/runtime/g6-components-2026-10-14"), { recursive: true });
    expect(() => readG6SourceBindings(root, phase, JSON.parse)).toThrow(/Drawer refinement is not sealed|ENOENT.*g6-components.*source-bindings\.json/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

it("restores only an exact trusted Drawer phase without removing a changed Gate", () => {
  const accepted = { humanGate: "awaiting_human", publication: "unpublished" };
  const before = { componentRefinements: {} };
  const record = { drawerSuccessor: accepted, reconciliation: { phaseObservation: { value: {} } } };
  const current = { componentRefinements: { drawerRefinement: accepted } };
  restoreSliderCloseoutPhase(record, current, before);
  expect(current).toEqual(before);
  const changed = { componentRefinements: { drawerRefinement: { ...accepted, humanGate: "accepted" } } };
  restoreSliderCloseoutPhase(record, changed, before);
  expect(changed.componentRefinements.drawerRefinement.humanGate).toBe("accepted");
  expect(changed).not.toEqual(before);
});

it("writes Drawer verification only to its own regular output and rejects links", () => {
  expect(verifier).toHaveProperty("writeG6ScopedVerification");
  const write = (verifier as typeof verifier & { writeG6ScopedVerification: (root: string, bindings: unknown, result: unknown) => string }).writeG6ScopedVerification;
  const root = mkdtempSync(join(tmpdir(), "rain-drawer-write-"));
  const own = "evidence/runtime/drawer-refinement-2026-10-14/scoped-governance.json";
  try {
    const old = join(root, "original-proof.json"); writeFileSync(old, "original");
    mkdirSync(join(root, "evidence/runtime/drawer-refinement-2026-10-14"), { recursive: true });
    symlinkSync(old, join(root, own));
    expect(() => write(root, { drawerRefinement: {} }, { scope: "drawer" })).toThrow(/regular|symbolic|symlink/);
    expect(readFileSync(old, "utf8")).toBe("original");
    rmSync(join(root, own));
    expect(write(root, { drawerRefinement: {} }, { scope: "drawer" })).toBe(own);
    expect(JSON.parse(readFileSync(join(root, own), "utf8"))).toEqual({ scope: "drawer" });
    rmSync(join(root, "evidence/runtime/drawer-refinement-2026-10-14"), { recursive: true });
    symlinkSync(root, join(root, "evidence/runtime/drawer-refinement-2026-10-14"));
    expect(() => write(root, { drawerRefinement: {} }, {})).toThrow(/directory|symbolic|symlink/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

it("keeps an unrelated empty phase outside the Drawer successor", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-drawer-integration-"));
  try {
    const phase = { componentRefinements: {} };
    mkdirSync(join(root, "status")); writeFileSync(join(root, "status/current-phase.yaml"), JSON.stringify(phase));
    expect(readG6SourceBindings(root, phase, JSON.parse)).toBeNull();
  } finally { rmSync(root, { recursive: true, force: true }); }
});
