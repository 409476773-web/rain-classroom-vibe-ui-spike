// @vitest-environment node
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { buildPlaygroundStatus, statusPath, verifyPlaygroundStatus } from "./playground-status.mjs";
import { benchmarkIndex } from "../apps/playground/src/docs/benchmark-index";
import { parseYamlSubset } from "./verification-helpers.mjs";

it("keeps the displayed delivery summary tied to current manifests and the explicit status record", () => {
  expect(() => verifyPlaygroundStatus()).not.toThrow();
  const displayed = JSON.parse(readFileSync(statusPath, "utf8"));
  expect(displayed).toEqual(buildPlaygroundStatus());
  expect(displayed.candidates + displayed.localExperiments).toBe(displayed.contracts);
});

it("keeps benchmark implementation, checks and acceptance tied to the owning registry", () => {
  const registry = parseYamlSubset(readFileSync("benchmarks/benchmark-registry.yaml", "utf8")) as any;
  for (const entry of benchmarkIndex) {
    const source = registry.benchmarks.find((item: any) => item.id === entry.id);
    expect([entry.implementation, entry.automatedVerification, entry.humanGate]).toEqual([
      source.status.implementation, source.status.automatedVerification, source.status.humanGate,
    ]);
  }
});
