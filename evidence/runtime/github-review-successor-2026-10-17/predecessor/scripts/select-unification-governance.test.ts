import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import { copyDatePickerCloseoutFixture, copySelectUnificationFixture } from "./select-unification-test-fixture";

// The sealed predecessor can reject the exact changed input before Select reads it.
function rejectedInput(file: string, original: RegExp) {
  const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixes = ["Source outside Drawer scope changed; concurrent work remains unaccepted: ", "Drawer cannot change original G6 or older evidence: "];
  return new RegExp([original.source, ...prefixes.map(prefix => escape(prefix + file) + "(?:\\n|$)")].join("|"));
}

const proof = helpers as any, evidence = "evidence/runtime/select-unification-2026-10-13/";
const phase = (root = process.cwd()) => proof.parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8"));

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
}, 60_000);

it("rejects additional paths, edited sources and forged before snapshots", () => {
  const directory = mkdtempSync(join(tmpdir(), "rain-select-unification-"));
  const put = (file: string, bytes: Buffer | string) => { mkdirSync(dirname(join(directory, file)), { recursive: true }); writeFileSync(join(directory, file), bytes); };
  const view = "evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/";
  const projected = JSON.parse(readFileSync(view + "source-bindings.json", "utf8")).projectedFiles;
  const copy = (file: string) => {
    const bytes = readFileSync(projected[file] ? view + "predecessor/" + file : file);
    if (projected[file]) expect(createHash("sha256").update(bytes).digest("hex"), file).toBe(projected[file]);
    put(file, bytes);
  };
  try {
    copySelectUnificationFixture(copy, false);
    copyDatePickerCloseoutFixture(copy, true, false);
    for (const file of Object.keys(projected)) copy(file);
    const originalPhase = phase(directory);
    expect(proof.getSelectUnificationSourceBindings(directory, originalPhase).kind).toBe("SelectUnificationSourceBindings");
    const record = JSON.parse(readFileSync(join(directory, evidence + "source-bindings.json"), "utf8"));
    record.sourceFiles["unrelated.tsx"] = { before: null, after: "unrelated" };
    put(evidence + "source-bindings.json", JSON.stringify(record));
    expect(() => proof.getSelectUnificationSourceBindings(directory, originalPhase)).toThrow(/finite source paths|Slider closeout original proof changed/);
    copy(evidence + "source-bindings.json");
    const file = "packages/ui/src/select/select.tsx";
    put(file, readFileSync(join(directory, file), "utf8") + "\n");
    expect(() => proof.getSelectUnificationSourceBindings(directory, originalPhase)).toThrow(rejectedInput(file, /current source changed/));
    copy(file);
    put(evidence + "before/" + file, "changed");
    expect(() => proof.getSelectUnificationSourceBindings(directory, originalPhase)).toThrow(rejectedInput(evidence + "before/" + file, /before source changed/));
  } finally { rmSync(directory, { recursive: true }); }
}, 60_000);
