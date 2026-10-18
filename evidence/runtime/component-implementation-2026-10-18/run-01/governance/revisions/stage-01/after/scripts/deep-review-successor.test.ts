import { componentImplementationFixtureFiles } from "./component-implementation-successor.mjs";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import { getG6SourceBindings, parseYamlSubset, withSourceBindingTraversal } from "./verification-helpers.mjs";
import { deepReviewBindingsPath, deepReviewFixtureFiles } from "./deep-review-successor.mjs";
import { githubReviewBindingsPath, githubReviewFixtureFiles } from "./github-review-successor.mjs";
import { getLibraryPaintObservations, prepareDeepReviewSharedPaintSource, validateRecordedPaintSource } from "./verify-token-foundations.mjs";

it("verifies current maintenance sources while retaining every previous Gate", () => {
  const root = process.cwd(), status = parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8"));
  const record = withSourceBindingTraversal(root, () => getG6SourceBindings(root, status));
  expect(record.deepReviewSuccessor.kind).toBe("DeepReviewFiniteSuccessor");
  expect(record.githubReviewSuccessor.kind).toBe("GithubReviewFiniteSuccessor");
  expect(record.phase.humanGate).toBe("awaiting_human");
});

it("checks the current corrected paints while retaining pending contrast findings", () => {
  const { observations, originals } = withSourceBindingTraversal(process.cwd(), () => ({
    observations: getLibraryPaintObservations(process.cwd()),
    originals: [
      ...JSON.parse(readFileSync("evidence/runtime/library-governance-closeout-2026-10-13/paint-observations.json", "utf8")).localSources,
      ...getG6SourceBindings(process.cwd()).closeoutSuccessor.paintObservations.localSources,
    ],
  }));
  for (const filePath of ["apps/prototype/src/scenarios/bklit-validation/chart-theme.css", "apps/prototype/src/scenarios/bklit-validation/page.css", "apps/prototype/src/scenarios/exam-editor/page.css", "apps/playground/src/docs/components/g6-task-details-drawer.css"]) {
    const entry = observations.localSources.find((item: any) => item.filePath === filePath);
    const original = originals.find((item: any) => item.filePath === filePath);
    const source = readFileSync(filePath, "utf8");
    expect(validateRecordedPaintSource(entry, source), filePath).toEqual([]);
    const metadata = (rows: any[]) => rows.map(({ value, ...row }) => row);
    expect(metadata(entry.inventory)).toEqual(metadata(original.inventory));
    expect(validateRecordedPaintSource(entry, source + "\n.unrelated { color: #ffffff; }\n")).not.toEqual([]);
  }
});

it("restores only the three current Tabs geometry repairs for the existing Questionnaire paint proof", () => {
  withSourceBindingTraversal(process.cwd(), () => {
    const source = readFileSync("packages/ui/src/styles.css", "utf8");
    const bindings = getG6SourceBindings(process.cwd()).deepReviewSuccessor;
    const before = readFileSync(bindings.sourceFiles["packages/ui/src/styles.css"].beforeSnapshot, "utf8");
    expect(prepareDeepReviewSharedPaintSource(process.cwd(), source)).toBe(before);
    for (const candidate of [source + "\n.unrelated { color: red; }", source.replace("--rain-line-thickness-1", "--rain-space-1")]) {
      expect(prepareDeepReviewSharedPaintSource(process.cwd(), candidate)).toBe(candidate);
    }
  });
});

it("rejects changed current source, before bytes, old proof, scope, phase and symbolic files in a relocated snapshot", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-deep-review-test-"));
  const verify = () => withSourceBindingTraversal(root, () => getG6SourceBindings(root));
  const put = (file: string, source: string | Buffer) => { mkdirSync(dirname(join(root, file)), { recursive: true }); writeFileSync(join(root, file), source); };
  try {
    for (const file of new Set([...githubReviewFixtureFiles(process.cwd()), ...deepReviewFixtureFiles(process.cwd()), ...componentImplementationFixtureFiles(process.cwd())])) {
      mkdirSync(dirname(join(root, file)), { recursive: true }); copyFileSync(file, join(root, file));
    }
    const expected = verify();
    expect(expected.deepReviewSuccessor.kind).toBe("DeepReviewFiniteSuccessor");
    const binding = JSON.parse(readFileSync(deepReviewBindingsPath, "utf8"));
    for (const file of ["packages/ui/src/input/input.tsx", "packages/ui/src/tree/tree.tsx", "scripts/deep-review-successor.mjs", "status/current-phase.yaml", githubReviewBindingsPath, binding.sourceFiles["packages/ui/src/input/input.tsx"].beforeSnapshot]) {
      put(file, readFileSync(file, "utf8") + "\n/* altered */\n");
      expect(() => verify(), file).toThrow();
      put(file, readFileSync(file));
    }
    const phase = readFileSync("status/current-phase.yaml", "utf8");
    put("status/current-phase.yaml", phase.replace('humanGate: "awaiting_human"', 'humanGate: "accepted"'));
    expect(() => verify()).toThrow();
    put("status/current-phase.yaml", phase);
    binding.sourceFiles["unrelated.ts"] = { before: null, after: "0".repeat(64), beforeSnapshot: null };
    put(deepReviewBindingsPath, JSON.stringify(binding));
    expect(() => verify()).toThrow(/binding changed/);
    put(deepReviewBindingsPath, readFileSync(deepReviewBindingsPath));
    const file = "packages/ui/src/input/input.tsx";
    rmSync(join(root, file)); symlinkSync(join(process.cwd(), file), join(root, file));
    expect(() => verify()).toThrow(/regular file/);
    rmSync(join(root, file)); put(file, readFileSync(file));
    expected.deepReviewSuccessor.authorization.publication = "forged";
    expect(verify().deepReviewSuccessor.authorization.publication).toBe("unpublished");
  } finally { rmSync(root, { recursive: true, force: true }); }
}, 60_000);
