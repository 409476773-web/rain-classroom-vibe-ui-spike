import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, linkSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join } from "node:path";
import { githubReviewBindingsPath, githubReviewFixtureFiles } from "./github-review-successor.mjs";

export const deepReviewEvidence = "evidence/runtime/deep-review-fixes-2026-10-17/governance/";
export const deepReviewBindingsPath = deepReviewEvidence + "source-bindings.json";
const modulePath = "scripts/deep-review-successor.mjs";
const bindingSeal = "0bd651916418afbd2cc29a3d2fb97966598c72aa5dbd6bb0abb32f6b4978512a";
const moduleSeal = "c3d9fcb6e12ace522fb4e51c1259e9a29e6f769aec0c77081956ac8eea3b8edd";
const predecessorSeal = "67279f58081cbaedc9b36cf8fc223852febbc7c98d5f56b9e7197e0cbaf596ac";
const sha = bytes => createHash("sha256").update(bytes).digest("hex");

// This is a finite maintenance authorization, not permission to mutate previous evidence or Gates.
export const deepReviewAuthority = Object.freeze({
  authorizedAt: "2026-10-17",
  decisionSource: "current-user-explicit-instruction",
  userStatement: "先处理五项优先问题；修正 Playground 的当前状态与可复制示例；补少量高价值组合指引。",
  workMode: "system-mode-local-maintenance",
  scope: "R01-R07; delayed-document-focus; three-composition-guides",
  publication: "unpublished",
  gitFigmaBusinessMigration: "not-performed",
});

export const deepReviewSourcePaths = Object.freeze([
  "apps/playground/src/docs/components/component-asset-page.tsx",
  "apps/playground/src/docs/components/component-doc.css",
  "apps/playground/src/docs/components/g3-component-pages.css",
  "apps/playground/src/docs/components/g5-component-pages.test.tsx",
  "apps/playground/src/docs/components/g5-component-pages.tsx",
  "apps/playground/src/docs/components/g6-task-details-drawer.css",
  "apps/playground/src/docs/components/slider-examples.css",
  "apps/playground/src/docs/examples/filter-toolbar.tsx",
  "apps/playground/src/docs/examples/grading-actions.tsx",
  "apps/playground/src/docs/examples/sectioned-form.tsx",
  "apps/playground/src/docs/library-status.generated.json",
  "apps/playground/src/routes/overview-page.css",
  "apps/playground/src/routes/overview-page.css.d.ts",
  "apps/playground/src/routes/overview-page.tsx",
  "apps/playground/src/routes/playground-shell.test.tsx",
  "apps/playground/src/routes/route-registry.ts",
  "apps/prototype/src/scenarios/bklit-validation/chart-theme.css",
  "apps/prototype/src/scenarios/bklit-validation/page.css",
  "apps/prototype/src/scenarios/exam-editor/page.css",
  "docs/ai/README.md",
  "docs/ai/composition-recipes.md",
  "docs/ai/prototype-design.md",
  "docs/plans/2026-10-17-deep-review-fixes.md",
  "manifests/layouts/workspace-state.yaml",
  "manifests/layouts/workspace.yaml",
  "manifests/ui/input.yaml",
  "manifests/ui/tree.yaml",
  "package.json",
  "packages/layouts/src/README-workspace-adapter.md",
  "packages/layouts/src/README-workspace.md",
  "packages/layouts/src/workspace-state.test.ts",
  "packages/layouts/src/workspace-state.ts",
  "packages/layouts/src/workspace.test.tsx",
  "packages/layouts/src/workspace.tsx",
  "packages/ui/src/input/input.test.tsx",
  "packages/ui/src/input/input.tsx",
  "packages/ui/src/styles.css",
  "packages/ui/src/tree/tree.test.tsx",
  "packages/ui/src/tree/tree.tsx",
  "registry/navigation-v042-workspaces.json",
  "scripts/deep-review-successor.mjs",
  "scripts/deep-review-successor.test.ts",
  "scripts/g1-g6-closeout-governance.test.ts",
  "scripts/g5-color-consumers.mjs",
  "scripts/github-review-successor.test.ts",
  "scripts/playground-status.mjs",
  "scripts/playground-status.test.ts",
  "scripts/rn14-starter.mjs",
  "scripts/rn14-starter.test.ts",
  "scripts/select-unification-test-fixture.ts",
  "scripts/tabs-governance.test.ts",
  "scripts/verification-helpers.mjs",
  "scripts/verify-boundaries.mjs",
  "scripts/verify-css-variables.mjs",
  "scripts/verify-css-variables.test.ts",
  "scripts/verify-tailwind-b2.mjs",
  "scripts/verify-token-foundations.mjs",
  "scripts/verify-workspace.mjs",
  "status/current-phase.yaml",
  "tests/e2e/composition-recipes.spec.ts",
  "tests/e2e/css-composition.fixture.tsx",
  "tests/e2e/css-variables-tabs.spec.ts",
  "tests/e2e/deep-review-focus.spec.ts",
  "tests/e2e/deep-review-input-tree.config.ts",
  "tests/e2e/deep-review-input-tree.fixture.tsx",
  "tests/e2e/deep-review-input-tree.spec.ts",
  "tests/e2e/deep-review.config.ts",
  "tests/e2e/playground-shell.spec.ts"
]);

function regularPath(root, file, checkedDirectories) {
  assert(typeof file === "string" && !isAbsolute(file) && file.split("/").every(part => part && part !== "." && part !== ".."), "Deep review source must stay inside its root");
  const parts = file.split("/");
  for (let index = 1; index <= parts.length; index++) {
    const current = join(root, ...parts.slice(0, index));
    if (index < parts.length && checkedDirectories?.has(current)) continue;
    const info = lstatSync(current);
    assert(!info.isSymbolicLink() && (index < parts.length ? info.isDirectory() : info.isFile()), "Deep review source must be a regular file: " + file);
    if (index < parts.length) checkedDirectories?.add(current);
  }
  return join(root, file);
}

const bytes = (root, file) => readFileSync(regularPath(root, file));

export function deepReviewBindingSeal(record) {
  const normalized = structuredClone(record);
  normalized.sourceFiles[modulePath].after = "self";
  return sha(JSON.stringify(normalized));
}

export function deepReviewModuleSeal(source) {
  return sha(source.replace(/const (bindingSeal|moduleSeal) = "[^"]*";/g, 'const $1 = "PENDING";'));
}

export function deepReviewFixtureFiles(root) {
  if (!existsSync(join(root, deepReviewBindingsPath))) return [];
  const record = JSON.parse(bytes(root, deepReviewBindingsPath));
  assert.equal(deepReviewBindingSeal(record), bindingSeal, "Deep review finite successor binding changed");
  return [deepReviewBindingsPath, ...Object.keys(record.sourceFiles), ...Object.values(record.sourceFiles).map(binding => binding.beforeSnapshot).filter(Boolean)];
}

export function readDeepReviewBindings(root, status, parsePhase, verifyPrevious) {
  if (!existsSync(join(root, deepReviewBindingsPath))) return null;
  const record = JSON.parse(bytes(root, deepReviewBindingsPath));
  assert.equal(deepReviewBindingSeal(record), bindingSeal, "Deep review finite successor binding changed");
  assert.equal(record.kind, "DeepReviewFiniteSuccessor");
  assert.deepEqual(record.authorization, deepReviewAuthority, "Deep review authorization changed");
  assert.equal(deepReviewModuleSeal(bytes(root, modulePath).toString()), moduleSeal, "Deep review verifier source changed");
  assert.deepEqual(Object.keys(record.sourceFiles).sort(), [...deepReviewSourcePaths].sort(), "Deep review source scope changed");
  assert.equal(sha(bytes(root, githubReviewBindingsPath)), predecessorSeal, "Deep review predecessor binding changed");
  for (const [file, binding] of Object.entries(record.sourceFiles)) {
    assert.deepEqual(Object.keys(binding).sort(), ["before", "after", "beforeSnapshot"].sort(), "Deep review binding fields changed: " + file);
    assert.equal(sha(bytes(root, file)), binding.after, "Deep review current source changed: " + file);
    if (binding.before !== null) {
      assert.equal(binding.beforeSnapshot, deepReviewEvidence + "before/" + file, "Deep review before snapshot path changed: " + file);
      assert.equal(sha(bytes(root, binding.beforeSnapshot)), binding.before, "Deep review predecessor source changed: " + file);
    } else assert.equal(binding.beforeSnapshot, null, "Deep review new source cannot invent a predecessor: " + file);
  }
  const live = parsePhase(bytes(root, "status/current-phase.yaml").toString());
  if (status != null) assert.deepEqual(status, live, "Deep review supplied phase must match current bound source");
  assert.deepEqual(Object.keys(record.phaseAdditions).sort(), ["deepReviewMaintenance20261017", "playgroundDeliverySummary"].sort(), "Deep review may add only its maintenance and delivery summary records");
  const restored = structuredClone(live);
  for (const [key, value] of Object.entries(record.phaseAdditions)) {
    assert.deepEqual(restored[key], value, "Deep review phase addition changed: " + key);
    delete restored[key];
  }
  for (const [key, value] of Object.entries(deepReviewAuthority)) assert.deepEqual(live.deepReviewMaintenance20261017[key], value, "Deep review maintenance authority changed: " + key);
  assert.deepEqual(restored, parsePhase(bytes(root, record.sourceFiles["status/current-phase.yaml"].beforeSnapshot).toString()), "Deep review must preserve every previous phase record and Gate");

  // The existing proof closure is reused as regular-file hard links in a short-lived,
  // read-only view. Changed files link directly to their verified before snapshot;
  // nothing is written through a link, and no second historical tree is retained.
  const view = mkdtempSync(join(tmpdir(), "rain-deep-review-proof-"));
  let original;
  try {
    // Only this synchronous projection shares directory checks; every source leaf
    // is still checked, and the next verification starts with fresh sets.
    const checkedDirectories = new Set(), createdDirectories = new Set();
    for (const file of githubReviewFixtureFiles(root)) {
      const source = record.sourceFiles[file]?.beforeSnapshot ?? file;
      const target = join(view, file);
      const directory = dirname(target);
      if (!createdDirectories.has(directory)) { mkdirSync(directory, { recursive: true }); createdDirectories.add(directory); }
      linkSync(regularPath(root, source, checkedDirectories), target);
    }
    original = verifyPrevious(view, undefined, parsePhase);
    assert(original?.githubReviewSuccessor, "Deep review requires the independently sealed GitHub review chain");
  } finally { rmSync(view, { recursive: true, force: true }); }
  const sourceFiles = { ...original.sourceFiles };
  for (const [file, binding] of Object.entries(record.sourceFiles)) {
    const previous = sourceFiles[file];
    sourceFiles[file] = previous ? { ...previous, after: binding.after } : { ...binding };
  }
  return {
    ...original, sourceFiles, deepReviewSuccessor: record,
    closeoutSuccessor: {
      ...original.closeoutSuccessor,
      phaseAdditions: { ...original.closeoutSuccessor.phaseAdditions, ...record.phaseAdditions },
    },
  };
}
