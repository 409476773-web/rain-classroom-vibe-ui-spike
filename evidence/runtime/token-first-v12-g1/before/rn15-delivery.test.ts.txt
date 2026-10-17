// @vitest-environment node
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as governance from "./verification-helpers.mjs";

it("accepts only the M1 local delivery and preserves every preceding decision", () => {
  expect(typeof governance.hasRn15Authorization).toBe("function");
  const status = governance.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(governance.hasRn15Authorization(status)).toBe(true);
  expect(governance.getValidatedTailwindB2History(status)).toEqual(status.phaseHistory.tailwindB2);
  const earlier = structuredClone(status); delete earlier.componentRefinements.rn15Delivery;
  if (governance.hasGenerationQualityAuthorization(status)) delete earlier.componentRefinements.generationQuality;
  if (governance.hasM2Authorization(status)) delete earlier.componentRefinements.m2Delivery;
  if (governance.hasAvatarFamilyAuthorization(status)) delete earlier.componentRefinements.avatarFamily;
  if (governance.hasInputNumberAuthorization(status)) delete earlier.componentRefinements.inputNumber;
  expect(earlier).toEqual(governance.parseYamlSubset(readFileSync("evidence/runtime/rn15-delivery/before/status/current-phase.yaml.txt", "utf8")));
  const transitions = JSON.parse(readFileSync("evidence/runtime/rn15-delivery/source-transitions.json", "utf8"));
  for (const entry of transitions) {
    const source = readFileSync(entry.file, "utf8");
    const matches = (value: string, phase = status, records = transitions) => governance.matchesRn15ProtectedSource(entry.file, value, entry.beforeSha256, phase, records);
    expect(matches(source), entry.file).toBe(true);
    expect(matches(source + "\n/* unrecorded change */"), entry.file).toBe(false);
    expect(matches(source, earlier), entry.file).toBe(false);
    expect(matches(source, status, []), entry.file).toBe(false);
    expect(matches(source, status, [{ ...entry, authorization: "all-files" }]), entry.file).toBe(false);
  }
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
