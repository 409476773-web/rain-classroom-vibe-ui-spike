import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import { getG6SourceBindings, getValidatedTailwindB2History, parseYamlSubset } from "./verification-helpers.mjs";
import { closeoutBindingsPath, closeoutEvidence, restoreG1G6CloseoutPhase } from "./g1-g6-closeout-governance.mjs";

it("validates the current G1–G6 sources through the exact later successor without promoting old Gates", () => {
  const root = process.cwd();
  const phase = parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8"));
  const record = getG6SourceBindings(root, phase);
  expect(record.kind).toBe("G6ComponentSourceBindings");
  expect(record.phase.humanGate).toBe("awaiting_human");
  expect(record.closeoutSuccessor.kind).toBe("G1G6FiniteCloseoutSuccessor");
  expect(record.sourceFiles["packages/ui/src/attachment-workflow/attachment-list.tsx"].after).toMatch(/^[a-f0-9]{64}$/);
});

it("projects only the seven exact authorized additions and retains changed or unknown authority", () => {
  const record = JSON.parse(readFileSync(closeoutBindingsPath, "utf8"));
  const current = parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  const oldGate = structuredClone(current.componentRefinements.g6Components);
  current.componentRefinements.unknownFuture = { humanGate: "accepted" };
  current.componentRefinements.carouselCloseout.humanGate = "forged";
  restoreG1G6CloseoutPhase(record, current);
  expect(current.componentRefinements.g6Components).toEqual(oldGate);
  expect(current.componentRefinements.unknownFuture.humanGate).toBe("accepted");
  expect(current.componentRefinements.carouselCloseout.humanGate).toBe("forged");
  expect(current.componentRefinements.attachmentFunctions).toBeUndefined();
});

it("rejects changed old Gates, unknown phase, runtime drift, rewritten proof, forged bindings and symlinks", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-g1-g6-closeout-"));
  const record = JSON.parse(readFileSync(closeoutBindingsPath, "utf8"));
  const paths = new Set<string>([
    closeoutBindingsPath, "scripts/g1-g6-closeout-governance.mjs",
    ...Object.keys(record.retainedFiles), ...Object.keys(record.sourceFiles),
    ...Object.keys(record.projectedFiles).map(file => closeoutEvidence + "predecessor/" + file),
    ...Object.keys(record.questionnaireFiles).map(file => closeoutEvidence + "questionnaire-predecessor/" + file),
    ...Object.values(record.sourceFiles).map((binding: any) => binding.beforeSnapshot).filter(Boolean),
  ]);
  const put = (file: string, bytes: string | Buffer) => { mkdirSync(dirname(join(root, file)), { recursive: true }); writeFileSync(join(root, file), bytes); };
  try {
    for (const file of paths) { mkdirSync(dirname(join(root, file)), { recursive: true }); copyFileSync(file, join(root, file)); }
    expect(getG6SourceBindings(root)?.closeoutSuccessor.kind).toBe("G1G6FiniteCloseoutSuccessor");
    const phaseFile = "status/current-phase.yaml", original = readFileSync(phaseFile, "utf8");
    for (const phase of [original.replace('humanGate: "awaiting_human"', 'humanGate: "forged"'), original + '\nunknownFutureBatch:\n  authorization: "authorized"\n']) {
      put(phaseFile, phase);
      expect(() => getG6SourceBindings(root)).toThrow(/source changed|previous phase/);
      put(phaseFile, original);
    }
    for (const file of ["packages/ui/src/questionnaire/questionnaire.tsx", "evidence/runtime/g6-components-2026-10-14/source-bindings.json", "evidence/runtime/questionnaire-reuse-2026-10-16/source-bindings.json", closeoutEvidence + "predecessor/packages/ui/src/drawer/drawer.css", closeoutBindingsPath]) {
      put(file, readFileSync(file, "utf8") + "\n/* unproven change */\n");
      expect(() => getG6SourceBindings(root)).toThrow(/changed/);
      put(file, readFileSync(file));
    }
    const file = "packages/ui/src/attachment-workflow/attachment-list.tsx";
    rmSync(join(root, file));
    symlinkSync(join(process.cwd(), file), join(root, file));
    expect(() => getG6SourceBindings(root)).toThrow(/regular file/);
  } finally { rmSync(root, { recursive: true, force: true }); }
}, 60_000);

it("validates frozen B2 history with the verified Carousel successor while retaining its original Gate", () => {
  const current = parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(getValidatedTailwindB2History(current)).toEqual(current.phaseHistory.tailwindB2);
}, 60_000);
