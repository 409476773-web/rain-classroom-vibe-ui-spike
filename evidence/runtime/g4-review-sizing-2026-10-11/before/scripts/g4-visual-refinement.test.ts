import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { g4VisualRefinementSourcePaths, getG4VisualRefinementSourceBindings, hasG4ComponentsAuthorization, hasG4VisualRefinementAuthorization, parseYamlSubset, validateG4PreviewTypographySuccessor } from "./verification-helpers.mjs";
import { getG4ColorConsumers, getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

const root = process.cwd(), evidence = "evidence/runtime/g4-visual-refinement-2026-10-11/";
const before = () => parseYamlSubset(readFileSync(join(root, evidence, "before/status/current-phase.yaml"), "utf8")) as any;
const feedback = () => ({
  authorization: "authorized", authorizedAt: "2026-10-11", decisionSource: "explicit-user-g4-typography-cascade-and-course-material-refinement",
  scope: "preview-typography-cascade-and-course-material-compositions", workMode: "system-mode",
  plan: "docs/plans/2026-10-11-g4-visual-refinement.md", evidence: evidence + "verification.md", sourceBindings: evidence + "source-bindings.json",
  implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run", humanGate: "awaiting_human",
  contrastAcceptance: "not-granted", publication: "unpublished", figmaWrite: "not-authorized", businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
});
const authorized = () => { const phase = before(); phase.componentRefinements.g4Components.visualRefinement = feedback(); return phase; };
const expectedSources = [
  "apps/playground/src/docs/components/component-doc.css",
  ...["tsx", "css", "test.tsx"].map(extension => `apps/playground/src/docs/components/g4-component-pages.${extension}`),
  "tests/e2e/g4-components.config.ts", "tests/e2e/g4-components.spec.ts",
  "scripts/verification-helpers.mjs", "scripts/token-foundation-outputs.mjs", "scripts/verify-token-foundations.mjs", "scripts/verify-workspace.mjs", "scripts/verify-boundaries.mjs", "scripts/g4-components-governance.test.ts", "scripts/g4-visual-refinement.test.ts",
  "docs/ai/g4-components.md", "docs/plans/2026-10-11-g4-visual-refinement.md",
  ...["typography", "item", "progress"].map(name => `manifests/ui/${name}.yaml`),
];
const sha = (bytes: string | Buffer) => createHash("sha256").update(bytes).digest("hex");

function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "rain-g4-visual-")), phase = authorized();
  const baseline = JSON.parse(readFileSync(join(root, evidence, "baseline.json"), "utf8"));
  const copy = (file: string, source: Buffer | string) => { const path = join(directory, file); mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, source); };
  copy(evidence + "baseline.json", readFileSync(join(root, evidence, "baseline.json")));
  for (const file of Object.keys(baseline.files)) {
    const source = readFileSync(join(root, evidence, "before", file));
    copy(file, source); copy(evidence + "before/" + file, source);
  }
  const sourceFiles: Record<string, { before: string | null; after: string }> = {};
  for (const file of expectedSources) {
    let source = readFileSync(join(root, file));
    if (file.startsWith("manifests/ui/")) {
      source = Buffer.from(readFileSync(join(root, evidence, "before", file), "utf8") + `  visualRefinement:\n    scope: "playground-documentation-visual-only"\n    evidence: "${evidence}verification.md"\n    automated: "not-run"\n    independentReview: "not-run"\n    humanGate: "awaiting_human"\n    contrastAcceptance: "not-granted"\n`);
    }
    copy(file, source);
    const reconstructed = ["tests/e2e/g4-components.config.ts", "tests/e2e/g4-components.spec.ts"].includes(file);
    const predecessor = reconstructed ? readFileSync(join(root, evidence, "predecessor", file)) : null;
    if (predecessor) copy(evidence + "predecessor/" + file, predecessor);
    sourceFiles[file] = { before: predecessor ? sha(predecessor) : baseline.files[file] ?? null, after: sha(source) };
  }
  const oldEvidence = Object.keys(baseline.files).filter(file => file.startsWith("evidence/runtime/g4-components-2026-10-11/") && !file.includes("/before/"));
  const record = { kind: "G4VisualRefinementSourceBindings", authorizedAt: "2026-10-11", scope: feedback().scope,
    predecessor: { path: "evidence/runtime/g4-components-2026-10-11/source-bindings.json", sha256: baseline.files["evidence/runtime/g4-components-2026-10-11/source-bindings.json"] },
    sourceFiles, retainedRecords: Object.fromEntries(oldEvidence.map(file => [file, baseline.files[file]])),
  };
  const save = () => copy(evidence + "source-bindings.json", JSON.stringify(record));
  save();
  return { directory, phase, record, save, copy };
}

describe("G4 visual feedback is a finite successor", () => {
  it("keeps the original completed candidate and all prior Gates unchanged", () => {
    const phase = authorized(), original = before();
    expect(hasG4ComponentsAuthorization(phase)).toBe(true); expect(hasG4VisualRefinementAuthorization(phase)).toBe(true);
    delete phase.componentRefinements.g4Components.visualRefinement;
    expect(phase).toEqual(original); expect(hasG4VisualRefinementAuthorization(phase)).toBe(false);
    expect(g4VisualRefinementSourcePaths).toEqual(expectedSources);
  });
  it("rejects expanded scope or transferred visual, contrast, publication and Git acceptance", () => {
    for (const [field, value] of [["scope", "all-components"], ["humanGate", "accepted"], ["contrastAcceptance", "accepted"], ["publication", "published"], ["figmaWrite", "authorized"], ["gitOperations", "authorized"], ["extraSource", "packages/ui/src/item/item.tsx"]] as const) {
      const phase = authorized(); phase.componentRefinements.g4Components.visualRefinement[field] = value;
      expect(hasG4ComponentsAuthorization(phase), field).toBe(false); expect(hasG4VisualRefinementAuthorization(phase), field).toBe(false);
    }
  });
  it("cannot claim completion before scoped checks and independent review", () => {
    const phase = authorized(), record = phase.componentRefinements.g4Components.visualRefinement;
    record.implementation = "completed"; expect(hasG4VisualRefinementAuthorization(phase)).toBe(false);
    record.automatedVerification = "passed-scoped"; expect(hasG4VisualRefinementAuthorization(phase)).toBe(false);
    record.independentReview = "passed-scoped"; expect(hasG4VisualRefinementAuthorization(phase)).toBe(true);
  });
  it("accepts only the two cascade fixes and retains paragraph margins and all other preview rules", () => {
    const file = "apps/playground/src/docs/components/component-doc.css";
    const original = readFileSync(join(root, evidence, "before", file), "utf8"), current = readFileSync(join(root, file), "utf8");
    expect(validateG4PreviewTypographySuccessor(original, current)).toEqual([]);
    for (const changed of [current.replace("margin:0;", "margin:var(--rain-space-8);"), current + "\n.component-doc__example p { line-height:24px; }\n", current.replace("--rain-line-height-24", "--rain-line-height-28")]) {
      expect(validateG4PreviewTypographySuccessor(original, changed)).not.toEqual([]);
    }
  });
  it("binds current feedback files to the immutable G4 predecessor", () => {
    const { directory, phase, record, save } = fixture();
    try {
      expect(() => getG4VisualRefinementSourceBindings(directory, phase)).not.toThrow();
      record.sourceFiles["packages/ui/src/item/item.tsx"] = { before: "fake", after: "fake" }; save();
      expect(() => getG4VisualRefinementSourceBindings(directory, phase)).toThrow("exact finite source inventory");
    } finally { rmSync(directory, { recursive: true, force: true }); }
  });
  it("cannot regenerate a binding to rewrite a prior G4 record or unchanged shared API", () => {
    for (const file of ["evidence/runtime/g4-components-2026-10-11/source-bindings.json", "packages/ui/src/item/item.tsx", "packages/foundations/src/typography.css", "evidence/runtime/g4-components-2026-10-11/verification.md"]) {
      const { directory, phase, record, save, copy } = fixture();
      try {
        const changed = readFileSync(join(directory, file), "utf8") + "\n/* unauthorized */\n";
        copy(file, changed);
        if (file.endsWith("/verification.md")) copy(evidence + "before/" + file, changed);
        if (Object.hasOwn(record.retainedRecords, file)) record.retainedRecords[file] = sha(changed);
        save();
        expect(() => getG4VisualRefinementSourceBindings(directory, phase), file).toThrow();
      } finally { rmSync(directory, { recursive: true, force: true }); }
    }
    const { directory, phase, copy } = fixture();
    try {
      const baselinePath = evidence + "baseline.json", rewritten = JSON.parse(readFileSync(join(directory, baselinePath), "utf8"));
      rewritten.basis = "recaptured-current-files";
      copy(baselinePath, JSON.stringify(rewritten));
      expect(() => getG4VisualRefinementSourceBindings(directory, phase)).toThrow("original actual baseline manifest bytes");
    } finally { rmSync(directory, { recursive: true, force: true }); }
  });
  it("permits Manifest feedback metadata only, without changing the original capability or gate", () => {
    const { directory, phase, record, save, copy } = fixture();
    try {
      const file = "manifests/ui/item.yaml", changed = readFileSync(join(directory, file), "utf8").replace('modificationMode: "managed"', 'modificationMode: "local"');
      const binding = record.sourceFiles[file];
      if (!binding) throw new Error("Fixture is missing the exact Item Manifest binding");
      copy(file, changed); binding.after = sha(changed); save();
      expect(() => getG4VisualRefinementSourceBindings(directory, phase)).toThrow("Manifest must preserve its original capability");
      const changedPhase = structuredClone(phase); changedPhase.componentRefinements.g4Components.humanGate = "accepted";
      expect(hasG4VisualRefinementAuthorization(changedPhase)).toBe(false);
    } finally { rmSync(directory, { recursive: true, force: true }); }
  });
});

describe("G4 feedback document paints", () => {
  const filePath = "apps/playground/src/docs/components/g4-component-pages.css";
  const outputs = () => {
    const value = getTokenFoundationOutputs() as any, g4 = getG4ColorConsumers();
    value.colorRecipeConsumers.push(...g4.colorRecipeConsumers); value.colorCssConsumers.push(...g4.colorCssConsumers);
    return value;
  };
  it("checks every actual document paint and only its exact native forced-color fallbacks", () => {
    expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(join(root, filePath), "utf8"), outputs: outputs(), root })).toEqual([]);
  });
  it("cannot recategorize necessary error text or broaden native system colors", () => {
    const value = outputs(), error = value.colorCssConsumers.find((row: any) => row.selector === '.g4-doc-task-feedback[data-kind="error"]');
    expect(error.use.content).toBe("text"); expect(error.use.critical).toBe(true);
    const summary = value.colorCssConsumers.find((row: any) => row.selector === ".g4-doc-example-code > summary");
    expect(summary.use).toMatchObject({ content: "text", critical: true, interaction: "interactive" });
    error.use.content = "decorative"; error.use.critical = false;
    const source = readFileSync(join(root, filePath), "utf8");
    expect(validateRegisteredRecipeColors({ filePath, source, outputs: value, root })).not.toEqual([]);
    expect(validateRegisteredRecipeColors({ filePath, source: source + "\n.g4-doc-file { color:CanvasText; }\n", outputs: outputs(), root })).not.toEqual([]);
  });
});
