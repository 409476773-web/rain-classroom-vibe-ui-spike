// @vitest-environment node
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import * as governance from "./verification-helpers.mjs";

it("accepts only the M1 local delivery and preserves every preceding decision", () => {
  expect(typeof governance.hasRn15Authorization).toBe("function");
  const status = governance.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(() => governance.validateTokenFoundationsV1Phase(status)).not.toThrow();
  expect(governance.hasRn15Authorization(status)).toBe(true);
  expect(governance.getValidatedTailwindB2History(status)).toEqual(status.phaseHistory.tailwindB2);
  const beforeSource = readFileSync("evidence/runtime/rn15-delivery/before/status/current-phase.yaml.txt", "utf8");
  const checkpointSource = readFileSync("evidence/runtime/m2/before/status/current-phase.yaml.txt", "utf8");
  expect(createHash("sha256").update(beforeSource).digest("hex")).toBe("9de5c83cf524ea1960d67fa0fc804a011a2427211f61528f1308630386925061");
  expect(createHash("sha256").update(checkpointSource).digest("hex")).toBe("16e82c849f594587fef1c94acf4b3148f26a9266ea6101c66e096341957c4515");
  const checkpoint = governance.parseYamlSubset(checkpointSource) as any;
  const earlier = structuredClone(checkpoint); delete earlier.componentRefinements.rn15Delivery;
  expect(earlier).toEqual(governance.parseYamlSubset(beforeSource));
  expect(() => governance.validateTokenFoundationsV1Phase(checkpoint)).not.toThrow();
  const transitionSource = readFileSync("evidence/runtime/rn15-delivery/source-transitions.json", "utf8");
  expect(createHash("sha256").update(transitionSource).digest("hex")).toBe("dbc947f3c4e19dfb0570d4ff69325d9968ad68c41631c81ce02a631d91e0b7eb");
  const transitions = JSON.parse(transitionSource);
  expect(transitions).toHaveLength(16);
  const archive = "evidence/runtime/rn14-editability/starter-final.tar.gz";
  expect(createHash("sha256").update(readFileSync(archive)).digest("hex")).toBe("81ed247e9e3c57bf9edd94ace9bea30487557ab5404c26570aa8ea055c7f900e");
  const frozenRoot = mkdtempSync(join(tmpdir(), "rain-rn15-source-checkpoint-"));
  try {
    const extraction = spawnSync("tar", ["-xzf", archive, "-C", frozenRoot], { encoding: "utf8" });
    expect(extraction.status, extraction.stderr).toBe(0);
    for (const entry of transitions) {
      // These two named host files were excluded from the RN14 starter; their original transition SHA remains strict.
      const source = readFileSync(["apps/prototype/src/course-dialog.tsx", "apps/prototype/src/course-dialog.css"].includes(entry.file) ? entry.file : join(frozenRoot, entry.file), "utf8");
      expect(createHash("sha256").update(source).digest("hex"), entry.file).toBe(entry.afterSha256);
      const matches = (value: string, phase = checkpoint, records = transitions) => governance.matchesRn15ProtectedSource(entry.file, value, entry.beforeSha256, phase, records);
      expect(matches(source), entry.file).toBe(true);
      expect(matches(source + "\n/* unrecorded change */"), entry.file).toBe(false);
      expect(matches(source, earlier), entry.file).toBe(false);
      expect(matches(source, checkpoint, []), entry.file).toBe(false);
      expect(matches(source, checkpoint, [{ ...entry, authorization: "all-files" }]), entry.file).toBe(false);
    }
  } finally { rmSync(frozenRoot, { recursive: true, force: true }); }
  for (const change of [{ scope: "m2-all-benchmarks" }, { snapshotId: "unreviewed" }, { humanGate: "accepted" },
    { contrastAcceptance: "granted" }, { publication: "published" }, { businessMigration: "authorized" },
    { implementation: "completed", automatedVerification: "not-run" }, { unexpected: true }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.rn15Delivery, change);
    expect(governance.hasRn15Authorization(invalid)).toBe(false);
    expect(() => governance.getValidatedTailwindB2History(invalid)).toThrow();
  }
  const missingAcceptance = structuredClone(status);
  missingAcceptance.componentRefinements.rn14Editability.humanGate = "awaiting_human";
  delete missingAcceptance.componentRefinements.rn14Editability.humanGateDecision;
  expect(governance.hasRn15Authorization(missingAcceptance)).toBe(false);
});

it("rejects unknown RN15 successors and changes to the frozen parent history", () => {
  const status = governance.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  for (const change of ["top-level", "component", "history"]) {
    const invalid = structuredClone(status);
    if (change === "top-level") invalid.unapprovedSuccessor = { authorization: "authorized" };
    if (change === "component") invalid.componentRefinements.unapprovedSuccessor = { authorization: "authorized" };
    if (change === "history") invalid.phaseHistory.tailwindB2.blockedActions.push("unrecorded permission");
    expect(() => governance.validateTokenFoundationsV1Phase(invalid)).toThrow();
  }
});
