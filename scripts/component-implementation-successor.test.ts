import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterAll, beforeAll, expect, it } from "vitest";
import { componentImplementationAuthority, componentImplementationBaseline, componentImplementationBindingsPath, componentImplementationModulePath, componentImplementationPhaseKey,
  componentImplementationRegularPath, componentImplementationSafePath, validateComponentImplementationScope, validateComponentImplementationPhase } from "./component-implementation-successor.mjs";
import { readComponentImplementationBaseline, readComponentImplementationPredecessor, sealComponentImplementation } from "./seal-component-implementation.mjs";
import { deepReviewFixtureFiles, deepReviewSourcePaths, deepReviewBindingsPath } from "./deep-review-successor.mjs";
import { githubReviewFixtureFiles, githubReviewBindingsPath } from "./github-review-successor.mjs";
import { parseYamlSubset } from "./verification-helpers.mjs";

const repo = process.cwd();
const ownFiles = [componentImplementationModulePath, "scripts/component-implementation-successor.test.ts", "scripts/seal-component-implementation.mjs"];
const scope = Object.fromEntries([...ownFiles, "status/current-phase.yaml", "docs/ai/README.md"].map(file => [file, { taskIds: ["G01", "G02"], reason: "Fixture-only finite successor integration and preserved historical chain." }]));
let fixture: string;
let initialPhase: string;
const runReader = (operation: "read" | "fixtures", status?: unknown) => {
  const source = `import { pathToFileURL } from 'node:url';
    const root = process.argv[1], mode = process.argv[2];
    const api = await import(pathToFileURL(root + '/scripts/component-implementation-successor.mjs'));
    const { readComponentImplementationPredecessor } = await import(pathToFileURL(root + '/scripts/seal-component-implementation.mjs'));
    const { parseYamlSubset } = await import(pathToFileURL(root + '/scripts/verification-helpers.mjs'));
    const value = mode === 'fixtures' ? api.componentImplementationFixtureFiles(root) : api.readComponentImplementationBindings(root, JSON.parse(process.argv[3]), parseYamlSubset, readComponentImplementationPredecessor);
    process.stdout.write(JSON.stringify(value));`;
  try { return JSON.parse(execFileSync(process.execPath, ["--input-type=module", "-e", source, fixture, operation, JSON.stringify(status ?? null)], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })); }
  catch (error: any) { throw new Error(error.stderr?.toString() || error.message); }
};
let firstBinding: any;
const put = (file: string, data: string | Buffer) => { mkdirSync(dirname(join(fixture, file)), { recursive: true }); writeFileSync(join(fixture, file), data); };
const verify = () => runReader("read");

beforeAll(async () => {
  fixture = mkdtempSync(join(tmpdir(), "rain-component-successor-test-"));
  const closure = [...new Set([...githubReviewFixtureFiles(repo), ...deepReviewFixtureFiles(repo)])];
  for (const file of closure) { mkdirSync(dirname(join(fixture, file)), { recursive: true }); copyFileSync(join(repo, file), join(fixture, file)); }
  const baseline = readComponentImplementationBaseline(repo);
  const modified = execFileSync("git", ["diff", "--name-only", "-z", "HEAD"], { cwd: repo, encoding: "utf8" }).split("\0").filter(Boolean);
  for (const file of new Set([...modified, ...deepReviewSourcePaths])) if (closure.includes(file)) {
    const before = baseline(file); if (before) put(file, before);
  }
  for (const file of [...ownFiles, componentImplementationBaseline.archivePath, componentImplementationBaseline.indexPath]) {
    mkdirSync(dirname(join(fixture, file)), { recursive: true }); copyFileSync(join(repo, file), join(fixture, file));
  }
  // Git object reads only. No command changes this shared metadata or its worktree.
  put(".git", readFileSync(join(repo, ".git")));
  // This is a source-proof fixture using the repository's locked test runtime,
  // not an independent Starter or dependency-portability claim.
  symlinkSync(join(repo, "node_modules"), join(fixture, "node_modules"), "dir");
  initialPhase = readFileSync(join(fixture, "status/current-phase.yaml"), "utf8");
  put("status/current-phase.yaml", initialPhase + "\n" + componentImplementationPhaseKey + ":\n" + Object.entries(componentImplementationAuthority).map(([key, value]) => `  ${key}: ${JSON.stringify(value)}\n`).join(""));
  put("docs/ai/README.md", readFileSync(join(fixture, "docs/ai/README.md"), "utf8") + "\n<!-- component successor test fixture only -->\n");
  sealComponentImplementation(fixture, scope, { revision: "test-01" });
  firstBinding = JSON.parse(readFileSync(join(fixture, componentImplementationBindingsPath), "utf8"));
}, 120_000);
afterAll(() => { if (fixture) rmSync(fixture, { recursive: true, force: true }); });

it("provides the finite component implementation successor without replacing the old chain", async () => {
  const file = "./component-implementation-successor.mjs";
  const module = existsSync("scripts/component-implementation-successor.mjs") ? await import(/* @vite-ignore */ file) : {};
  expect(module.readComponentImplementationBindings).toBeTypeOf("function");
  expect(module.componentImplementationFixtureFiles).toBeTypeOf("function");
  expect(module.validateComponentImplementationScope).toBeTypeOf("function");
});

it("replays the real deepReview, GitHub and G6 chain from a relocatable finite candidate", () => {
  const result = verify();
  expect(result.componentImplementationSuccessor.kind).toBe("ComponentImplementationFiniteSuccessor");
  expect(result.deepReviewSuccessor.kind).toBe("DeepReviewFiniteSuccessor");
  expect(result.githubReviewSuccessor.kind).toBe("GithubReviewFiniteSuccessor");
  expect(result.phase.humanGate).toBe("awaiting_human");
  expect(result.sourceFiles["docs/ai/README.md"].after).toBe(firstBinding.sourceFiles["docs/ai/README.md"].after);
  expect(result.sourceFiles["packages/ui/src/input/input.tsx"].after).toBe(result.deepReviewSuccessor.sourceFiles["packages/ui/src/input/input.tsx"].after);
  const fixtures = runReader("fixtures");
  expect(fixtures).toContain(githubReviewBindingsPath);
  expect(fixtures).toContain(deepReviewBindingsPath);
  expect(fixtures).toContain(firstBinding.candidateSnapshots["docs/ai/README.md"]);
}, 60_000);

it("reads before bytes from the opening archive rather than losing user work to HEAD", () => {
  const file = "docs/ai/README.md";
  const opening = readComponentImplementationBaseline(fixture)(file)!;
  const head = execFileSync("git", ["show", `${componentImplementationBaseline.commit}:${file}`], { cwd: repo });
  expect(Buffer.compare(opening, head)).not.toBe(0);
  expect(readFileSync(join(fixture, firstBinding.sourceFiles[file].beforeSnapshot))).toEqual(opening);
  expect(firstBinding.sourceFiles[componentImplementationModulePath].before).toBeNull();
});

it("requires a finite task-reason scope and rejects optional tasks, methods, history and unrelated paths", () => {
  expect(validateComponentImplementationScope(scope)).toBe(scope);
  for (const file of ["../escape.ts", "/tmp/escape.ts", "scripts\\escape.ts", "scripts/../escape.ts", "scripts/x.ts\n", "AGENTS.md", ".agents/skills/rain-designer/SKILL.md", "docs/ai/skills/method.md", "docs/ai/information-design.md", "scripts/deep-review-successor.mjs", "scripts/github-review-successor.mjs", "evidence/runtime/old/acceptance.json", "packages/foundations/src/token-contract.ts", "unrelated.ts"]) {
    expect(() => validateComponentImplementationScope({ ...scope, [file]: { taskIds: ["G02"], reason: "Unrelated attempted source scope expansion." } }), file).toThrow();
  }
  expect(() => validateComponentImplementationScope({ ...scope, "docs/ai/README.md": { taskIds: ["O01"], reason: "Conditional task cannot be silently authorized." } })).toThrow();
  expect(() => validateComponentImplementationScope({ ...scope, "docs/ai/README.md": { taskIds: ["G02"], reason: "short" } })).toThrow();
  const missing = { ...scope }; delete missing[componentImplementationModulePath];
  expect(() => validateComponentImplementationScope(missing)).toThrow();
});

it("preserves every existing phase and refuses invented Human Gate acceptance", () => {
  const before = parseYamlSubset(initialPhase);
  const live = { ...before, [componentImplementationPhaseKey]: { ...componentImplementationAuthority } };
  const additions = { [componentImplementationPhaseKey]: live[componentImplementationPhaseKey] };
  expect(() => validateComponentImplementationPhase(live, before, additions)).not.toThrow();
  expect(() => validateComponentImplementationPhase({ ...live, playgroundDeliverySummary: { title: "forged" } }, before, additions)).toThrow(/preserve every previous/);
  const oldGateChanged = parseYamlSubset(initialPhase.replace('humanGate: "awaiting_human"', 'humanGate: "accepted"'));
  expect(oldGateChanged).not.toEqual(before);
  expect(() => validateComponentImplementationPhase({ ...oldGateChanged, [componentImplementationPhaseKey]: live[componentImplementationPhaseKey] }, before, additions)).toThrow(/preserve every previous/);
  const forged = { ...componentImplementationAuthority, humanGate: "accepted" };
  expect(() => validateComponentImplementationPhase({ ...before, [componentImplementationPhaseKey]: forged }, before, { [componentImplementationPhaseKey]: forged })).toThrow(/authority changed/);
  expect(() => validateComponentImplementationPhase(live, before, { ...additions, previousGate: {} })).toThrow(/only its own/);
});

it("allows only six text summary fields inside the new phase without upgrading acceptance or publication", () => {
  const before = parseYamlSubset(initialPhase);
  const summary = { updatedAt: "2026-10-18", title: "Current local implementation", scope: "25 required tasks", currentWork: "Work in progress", acceptance: "Human review remains pending", limitations: "Unpublished; device checks remain open" };
  const check = (deliverySummary: unknown, extra = {}) => {
    const own = { ...componentImplementationAuthority, deliverySummary, ...extra };
    validateComponentImplementationPhase({ ...before, [componentImplementationPhaseKey]: own }, before, { [componentImplementationPhaseKey]: own });
  };
  expect(() => check(summary)).not.toThrow();
  for (const field of Object.keys(summary)) {
    expect(() => check({ ...summary, [field]: false })).toThrow(/must contain strings/);
    const missing: Record<string, string> = { ...summary }; delete missing[field];
    expect(() => check(missing)).toThrow(/summary fields/);
  }
  for (const field of ["accepted", "publication", "humanGate"]) expect(() => check({ ...summary, [field]: "accepted" })).toThrow(/summary fields/);
  expect(() => check(summary, { humanGate: "accepted" })).toThrow(/authority changed/);
  expect(() => check(summary, { publication: "published" })).toThrow(/authority changed/);
});

it("rejects current bytes, saved before/after snapshots, predecessor proofs, source scope and phase tampering", () => {
  for (const file of ["docs/ai/README.md", componentImplementationModulePath, "status/current-phase.yaml", githubReviewBindingsPath, deepReviewBindingsPath,
    firstBinding.sourceFiles["docs/ai/README.md"].beforeSnapshot, firstBinding.candidateSnapshots["docs/ai/README.md"], firstBinding.revisionRecord]) {
    const original = readFileSync(join(fixture, file));
    try { put(file, Buffer.concat([original, Buffer.from("\n/* altered */\n")])); expect(() => verify(), file).toThrow(); }
    finally { put(file, original); }
  }
  const current = readFileSync(join(fixture, componentImplementationBindingsPath));
  try {
    const record = JSON.parse(current.toString()); record.sourceFiles["unrelated.ts"] = { before: null, after: "0".repeat(64), beforeSnapshot: null };
    put(componentImplementationBindingsPath, JSON.stringify(record));
    expect(() => verify()).toThrow(/binding changed/);
  } finally { put(componentImplementationBindingsPath, current); }
  expect(() => runReader("read", { forged: true })).toThrow(/supplied phase/);
}, 60_000);

it("rejects file and ancestor symlinks without writing through them", () => {
  const file = "docs/ai/README.md", original = readFileSync(join(fixture, file));
  try { rmSync(join(fixture, file)); symlinkSync(join(repo, file), join(fixture, file)); expect(() => verify()).toThrow(/regular file/); }
  finally { rmSync(join(fixture, file)); put(file, original); }
  const folder = mkdtempSync(join(tmpdir(), "rain-component-path-test-"));
  try {
    symlinkSync(join(repo, "docs"), join(folder, "docs"));
    expect(() => componentImplementationRegularPath(folder, "docs/ai/README.md")).toThrow(/regular file/);
    for (const path of ["../x", "a//b", "a/./b", "a/../../b", "a\\b", "C:x"]) expect(() => componentImplementationSafePath(path)).toThrow();
  } finally { rmSync(folder, { recursive: true, force: true }); }
});

it("does not relabel unchanged user files or overwrite a previous candidate", () => {
  expect(() => sealComponentImplementation(fixture, scope, { revision: "test-01" })).toThrow(/overwrite/);
  expect(() => sealComponentImplementation(fixture, { ...scope, "packages/ui/src/input/input.tsx": { taskIds: ["B03"], reason: "Unchanged user implementation must remain predecessor-owned." } }, { revision: "unchanged" })).toThrow(/unchanged opening user work/);
  expect(existsSync(join(fixture, "evidence/runtime/component-implementation-2026-10-18/run-01/governance/revisions/unchanged"))).toBe(false);
});

it("refuses a symlinked evidence output ancestor before creating a candidate", () => {
  const governance = "evidence/runtime/component-implementation-2026-10-18/run-01/governance";
  const held = join(fixture, governance + "-held"), outside = mkdtempSync(join(tmpdir(), "rain-component-output-"));
  renameSync(join(fixture, governance), held); symlinkSync(outside, join(fixture, governance));
  try {
    expect(() => sealComponentImplementation(fixture, scope, { revision: "must-not-escape" })).toThrow(/symlink|regular directory/);
    expect(existsSync(join(outside, "revisions"))).toBe(false);
  } finally { unlinkSync(join(fixture, governance)); renameSync(held, join(fixture, governance)); rmSync(outside, { recursive: true, force: true }); }
  const dangling = join(fixture, governance, "revisions/dangling-output");
  symlinkSync(join(fixture, "nonexistent-output-target"), dangling);
  try { expect(() => sealComponentImplementation(fixture, scope, { revision: "dangling-output" })).toThrow(/symlink|regular directory/); }
  finally { unlinkSync(dangling); }
});

it("retains prior candidate bytes during explicit resealing and rejects later history mutation", async () => {
  const oldModuleSnapshot = readFileSync(join(fixture, firstBinding.candidateSnapshots[componentImplementationModulePath]));
  const oldRecord = readFileSync(join(fixture, firstBinding.revisionRecord));
  put("docs/ai/README.md", readFileSync(join(fixture, "docs/ai/README.md"), "utf8") + "\n<!-- second fixture revision -->\n");
  const sealed = sealComponentImplementation(fixture, scope, { revision: "test-02" });
  expect(sealed.previousRevision).toBe("test-01");
  expect(verify().componentImplementationSuccessor.revision).toBe("test-02");
  expect(readFileSync(join(fixture, firstBinding.revisionRecord))).toEqual(oldRecord);
  expect(readFileSync(join(fixture, firstBinding.candidateSnapshots[componentImplementationModulePath]))).toEqual(oldModuleSnapshot);
  const priorSnapshot = firstBinding.candidateSnapshots["docs/ai/README.md"], original = readFileSync(join(fixture, priorSnapshot));
  try { put(priorSnapshot, "forged earlier candidate"); expect(() => verify()).toThrow(/previous revision changed/); }
  finally { put(priorSnapshot, original); }
}, 60_000);
