import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, lstatSync, readFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { closeoutBindingsPath, closeoutEvidence } from "./g1-g6-closeout-governance.mjs";

export const githubReviewEvidence = "evidence/runtime/github-review-successor-2026-10-17/";
export const githubReviewBindingsPath = githubReviewEvidence + "source-bindings.json";
const modulePath = "scripts/github-review-successor.mjs";
const bindingSeal = "fee3e674b1696ddc15f1aaf626566e1b8eb1683d174c2a3b3a1142b9d23eb87f";
const moduleSeal = "c2f69bbc66f9d91c24a39a36fd2dd2749e6c8d81f31825accfe8b4a1e6a0e488";
const sha = bytes => createHash("sha256").update(bytes).digest("hex");

export const githubReviewPhase = Object.freeze({
  kind: "GithubReviewAuthorization",
  authorizedAt: "2026-10-17",
  decisionSource: "current-user-explicit-instruction-after-p5-p6-confirmation",
  userStatement: "检查一下现在组件库还有没有遗漏的建设事项。有的话，帮我做完，然后把这个组件库上传github，我要让gpt网页版进行审核。",
  scope: "accepted-input-group-copy; tag-retrieval-metadata; accepted-p5-prototype; portable-github-review-snapshot",
  workMode: "system-mode-independent-review-snapshot",
  predecessorBinding: "db36f041dc9326c15ad0d6d4c9858e3db9e0db0b0a11191621ca956c267525d0",
  humanConfirmation: "current-p5-three-corrections-and-p6-current-review-with-input-group-candidate-accepted",
  humanConfirmationScope: "reviewed-local-previews-only; no-unreviewed-asset-gate-transfer",
  gitOperations: "commit-and-fast-forward-push-to-existing-private-github-review-repository-authorized",
  gitRemote: "origin",
  gitRemoteUrl: "https://github.com/409476773-web/rain-classroom-vibe-ui-spike.git",
  gitBaselineCommit: "cf911c86078783df1fcd4228707873cfd6df2066",
  forcePush: false,
  publication: "private-github-source-review-only; package-and-registry-unpublished",
  figmaWrite: "not-authorized",
  businessMigration: "not-authorized",
  evidence: githubReviewEvidence + "verification.md",
});

export const githubReviewSourcePaths = Object.freeze([
  "apps/playground/src/docs/components/g5-component-pages.tsx",
  "apps/prototype/src/main.tsx",
  "apps/prototype/src/scenarios/resource-update/page.tsx",
  "apps/prototype/src/scenarios/resource-update/page.css",
  "docs/ai/asset-index.md",
  ...["tag", "checkable-tag", "link-tag", "difficulty-tag", "group-type-tag", "learning-unit-reminder-mark", "learning-unit-tag", "scored-task-type-mark", "status-tag", "system-status-tag"].map(name => `manifests/ui/${name}.yaml`),
  "scripts/verification-helpers.mjs",
  "scripts/verify-boundaries.mjs",
  "scripts/verify-g5-components.mjs",
  "scripts/verify-boundaries-navigation.test.ts",
  "scripts/g123-playground-governance.test.ts",
  "scripts/select-unification-test-fixture.ts",
  "scripts/g1-g6-closeout-governance.test.ts",
  modulePath,
  "scripts/github-review-successor.test.ts",
  "status/current-phase.yaml",
]);

function bytes(root, file, verifiedDirectories) {
  assert(typeof file === "string" && !isAbsolute(file) && file.split("/").every(part => part && part !== "." && part !== ".."), "GitHub review source must stay inside its root");
  const parts = file.split("/");
  for (let index = 1; index <= parts.length; index++) {
    const target = join(root, ...parts.slice(0, index)), directory = index < parts.length;
    if (directory && verifiedDirectories?.has(target)) continue;
    const info = lstatSync(target);
    assert(!info.isSymbolicLink() && (directory ? info.isDirectory() : info.isFile()), "GitHub review source must be a regular file: " + file);
    if (directory) verifiedDirectories?.add(target);
  }
  return readFileSync(join(root, file));
}

export function githubReviewBindingSeal(record) {
  const copy = structuredClone(record);
  copy.sourceFiles[modulePath].after = "self";
  return sha(JSON.stringify(copy));
}

export function githubReviewModuleSeal(source) {
  return sha(source.replace(/const (bindingSeal|moduleSeal) = "[^"]*";/g, 'const $1 = "PENDING";'));
}

export function closeoutProofFiles(record) {
  return [...new Set([
    closeoutBindingsPath, "scripts/g1-g6-closeout-governance.mjs",
    ...Object.keys(record.retainedFiles), ...Object.keys(record.sourceFiles),
    ...Object.keys(record.projectedFiles).map(file => closeoutEvidence + "predecessor/" + file),
    ...Object.keys(record.questionnaireFiles).map(file => closeoutEvidence + "questionnaire-predecessor/" + file),
    ...Object.values(record.sourceFiles).map(binding => binding.beforeSnapshot).filter(Boolean),
  ])].sort();
}

// Fixture copying follows the finite inventory, never growing run logs or local dependencies.
export function githubReviewFixtureFiles(root) {
  if (!existsSync(join(root, githubReviewBindingsPath))) return [];
  const record = JSON.parse(readFileSync(join(root, githubReviewBindingsPath), "utf8"));
  return [...new Set([
    githubReviewBindingsPath, ...Object.keys(record.sourceFiles),
    ...Object.keys(record.predecessorFiles),
    ...Object.keys(record.predecessorFiles).map(file => githubReviewEvidence + "predecessor/" + file),
    ...Object.values(record.sourceFiles).map(binding => binding.beforeSnapshot).filter(Boolean),
  ])];
}

export function readGithubReviewBindings(root, status, parsePhase, verifyPrevious) {
  if (!existsSync(join(root, githubReviewBindingsPath))) return null;
  const encoded = bytes(root, githubReviewBindingsPath), record = JSON.parse(encoded);
  assert.equal(githubReviewBindingSeal(record), bindingSeal, "GitHub review finite successor binding changed");
  assert.equal(record.kind, "GithubReviewFiniteSuccessor");
  assert.deepEqual(record.authorization, githubReviewPhase, "GitHub review authorization changed");
  assert.equal(githubReviewModuleSeal(bytes(root, modulePath).toString()), moduleSeal, "GitHub review verifier source changed");
  assert.deepEqual(Object.keys(record.sourceFiles).sort(), [...githubReviewSourcePaths].sort(), "GitHub review source scope changed");
  const view = join(root, githubReviewEvidence + "predecessor");
  const previousBinding = bytes(view, closeoutBindingsPath);
  assert.equal(sha(previousBinding), githubReviewPhase.predecessorBinding, "GitHub review must retain the original closeout proof seal");
  const oldRecord = JSON.parse(previousBinding);
  assert.deepEqual(Object.keys(record.predecessorFiles).sort(), closeoutProofFiles(oldRecord), "GitHub review predecessor closure changed");
  {
    // Only this synchronous closure walk shares directory checks. Every leaf is
    // still lstat/read/hashed; phase readers and callbacks never receive this Set.
    const verifiedDirectories = new Set();
    for (const [file, expected] of Object.entries(record.predecessorFiles)) {
      assert.equal(sha(bytes(view, file, verifiedDirectories)), expected, "GitHub review original proof changed: " + file);
      if (!Object.hasOwn(record.sourceFiles, file)) assert.equal(sha(bytes(root, file, verifiedDirectories)), expected, "GitHub review retained source or original proof changed: " + file);
    }
  }
  for (const [file, binding] of Object.entries(record.sourceFiles)) {
    assert.deepEqual(Object.keys(binding).sort(), ["before", "after", "beforeSnapshot"].sort(), "GitHub review source binding fields changed: " + file);
    assert.equal(sha(bytes(root, file)), binding.after, "GitHub review authorized successor source changed: " + file);
    if (binding.before !== null) {
      assert.equal(binding.beforeSnapshot, githubReviewEvidence + "before/" + file, "GitHub review before snapshot path changed: " + file);
      assert.equal(sha(bytes(root, binding.beforeSnapshot)), binding.before, "GitHub review predecessor snapshot changed: " + file);
      if (Object.hasOwn(record.predecessorFiles, file)) assert.equal(binding.before, record.predecessorFiles[file], "GitHub review predecessor transition changed: " + file);
    } else assert.equal(binding.beforeSnapshot, null, "GitHub review new source cannot invent a predecessor: " + file);
  }
  assert.deepEqual(Object.keys(record.paintObservations).sort(), ["localSources", "inlineSources"].sort(), "GitHub review paint observation scope changed");
  assert.equal(record.paintObservations.localSources.length, 1, "GitHub review may register only the imported P5 CSS paints");
  assert.deepEqual(record.paintObservations.inlineSources, [], "GitHub review cannot add unrelated JSX paint observations");
  const paint = record.paintObservations.localSources[0];
  assert.deepEqual({ filePath: paint.filePath, sha256: paint.sha256, kind: paint.kind, status: paint.status, acceptedException: paint.acceptedException, measurementScope: paint.measurementScope }, {
    filePath: "apps/prototype/src/scenarios/resource-update/page.css",
    sha256: record.sourceFiles["apps/prototype/src/scenarios/resource-update/page.css"].after,
    kind: "finite-css-paints", status: "runtime-unproved", acceptedException: false,
    measurementScope: "exact authored declarations only; no current DOM, content role, parent, state, contrast or eligibility acceptance",
  }, "GitHub review P5 paint registration cannot grant runtime or contrast acceptance");
  const live = parsePhase(bytes(root, "status/current-phase.yaml").toString());
  if (status != null) assert.deepEqual(status, live, "GitHub review supplied lifecycle and phase must match the bound disk record");
  const restored = structuredClone(live);
  assert.deepEqual(restored.githubReview20261017, githubReviewPhase, "GitHub review phase authorization changed");
  delete restored.githubReview20261017;
  assert.deepEqual(restored, parsePhase(bytes(view, "status/current-phase.yaml").toString()), "GitHub review must preserve every previous phase record and Gate");
  const original = verifyPrevious(view, undefined, parsePhase);
  assert(original?.closeoutSuccessor, "GitHub review requires the independently sealed previous closeout chain");
  const sourceFiles = { ...original.sourceFiles };
  for (const [file, binding] of Object.entries(record.sourceFiles)) sourceFiles[file] = Object.hasOwn(sourceFiles, file)
    ? { ...sourceFiles[file], after: binding.after }
    : { ...binding };
  return {
    ...original, sourceFiles, githubReviewSuccessor: record,
    // A verified derived lifecycle view; the previous sealed JSON stays byte-identical.
    closeoutSuccessor: {
      ...original.closeoutSuccessor,
      phaseAdditions: { ...original.closeoutSuccessor.phaseAdditions, githubReview20261017: githubReviewPhase },
      paintObservations: {
        localSources: [...original.closeoutSuccessor.paintObservations.localSources, ...record.paintObservations.localSources],
        inlineSources: [...original.closeoutSuccessor.paintObservations.inlineSources, ...record.paintObservations.inlineSources],
      },
    },
  };
}

// Called only after the source/authority proof above has been verified by the boundary checker.
export function verifyGithubReviewGitState(root, record) {
  assert.deepEqual(record.authorization, githubReviewPhase, "GitHub review Git authorization changed");
  const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  assert.equal(git("remote"), githubReviewPhase.gitRemote, "GitHub review requires the exact existing origin");
  for (const direction of [[], ["--push"]]) assert.equal(git("remote", "get-url", ...direction, "--all", githubReviewPhase.gitRemote), githubReviewPhase.gitRemoteUrl, "GitHub review remote changed");
  git("merge-base", "--is-ancestor", githubReviewPhase.gitBaselineCommit, "HEAD");
  return true;
}
