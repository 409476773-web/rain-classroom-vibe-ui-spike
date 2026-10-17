import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import { copySelectUnificationFixture } from "./select-unification-test-fixture";

const proof = helpers as any, evidence = "evidence/runtime/select-unification-2026-10-13/";
const phase = () => proof.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8"));

it("keeps the exact Select scope and user acceptance separate", () => {
  expect(proof.hasSelectUnificationAuthorization).toBeTypeOf("function");
  expect(proof.hasSelectUnificationAuthorization(phase())).toBe(true);
  for (const [key, value] of [["scope", "all-ui"], ["humanGate", "accepted"], ["publication", "published"], ["extra", true]]) {
    const changed = phase(); changed.componentRefinements.selectUnification[key as string] = value;
    expect(proof.hasSelectUnificationAuthorization(changed)).toBe(false);
  }
  const changed = phase();
  Object.assign(changed.componentRefinements.selectUnification, { implementation: "completed", automatedVerification: "not-run" });
  expect(proof.hasSelectUnificationAuthorization(changed)).toBe(false);
});

it("validates Select sources while retaining all previous phase records", () => {
  expect(proof.getSelectUnificationSourceBindings).toBeTypeOf("function");
  expect(proof.getSelectUnificationSourceBindings(process.cwd(), phase()).kind).toBe("SelectUnificationSourceBindings");
  const changed = phase(); changed.componentRefinements.sliderRefinement.humanGate = "accepted";
  expect(() => proof.getSelectUnificationSourceBindings(process.cwd(), changed)).toThrow(/previous phase|Slider closeout requires its exact finite authorization/);
});

it("rejects additional paths, edited sources and forged before snapshots", () => {
  const directory = mkdtempSync(join(tmpdir(), "rain-select-unification-"));
  const put = (file: string, bytes: Buffer | string) => { mkdirSync(dirname(join(directory, file)), { recursive: true }); writeFileSync(join(directory, file), bytes); };
  try {
    copySelectUnificationFixture(file => put(file, readFileSync(file)));
    expect(proof.getSelectUnificationSourceBindings(directory, phase()).kind).toBe("SelectUnificationSourceBindings");
    const record = JSON.parse(readFileSync(evidence + "source-bindings.json", "utf8"));
    record.sourceFiles["unrelated.tsx"] = { before: null, after: "unrelated" };
    put(evidence + "source-bindings.json", JSON.stringify(record));
    expect(() => proof.getSelectUnificationSourceBindings(directory, phase())).toThrow(/finite source paths|Slider closeout original proof changed/);
    put(evidence + "source-bindings.json", readFileSync(evidence + "source-bindings.json"));
    const file = "packages/ui/src/select/select.tsx";
    put(file, readFileSync(file, "utf8") + "\n");
    expect(() => proof.getSelectUnificationSourceBindings(directory, phase())).toThrow(/current source changed/);
    put(file, readFileSync(file));
    put(evidence + "before/" + file, "changed");
    expect(() => proof.getSelectUnificationSourceBindings(directory, phase())).toThrow(/before source changed/);
  } finally { rmSync(directory, { recursive: true }); }
});
