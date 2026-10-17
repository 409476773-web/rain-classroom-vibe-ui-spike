import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import { getG6PreviousSource, getG6SourceBindings, parseYamlSubset, withSourceBindingTraversal } from "./verification-helpers.mjs";
import { githubReviewBindingsPath, githubReviewEvidence, githubReviewFixtureFiles, githubReviewPhase, verifyGithubReviewGitState } from "./github-review-successor.mjs";
import { closeoutBindingsPath, readG1G6CloseoutBindings } from "./g1-g6-closeout-governance.mjs";
import { readG6SourceBindings } from "./g6-governance.mjs";
import { getLibraryPaintObservations, validateRecordedPaintSource } from "./verify-token-foundations.mjs";

const sha = (bytes: string | Buffer) => createHash("sha256").update(bytes).digest("hex");
const verify = (root = process.cwd()) => withSourceBindingTraversal(root, () => getG6SourceBindings(root));

it("accepts the separately authorized GitHub review successor without rewriting the frozen closeout", () => {
  const root = process.cwd();
  const phase = parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8"));
  const record = withSourceBindingTraversal(root, () => getG6SourceBindings(root, phase));
  expect(record.githubReviewSuccessor.kind).toBe("GithubReviewFiniteSuccessor");
  expect(record.phase.humanGate).toBe("awaiting_human");
  expect(sha(readFileSync(closeoutBindingsPath))).toBe("db36f041dc9326c15ad0d6d4c9858e3db9e0db0b0a11191621ca956c267525d0");
});

it("permits the authorized descendant Git HEAD while retaining the original Card V2 Git record", () => {
  const head = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).stdout.trim();
  expect(head).not.toBe("321e1a0c1b5f9284e0fcb5167fa059d6174b1752");
  const result = spawnSync(process.execPath, ["scripts/verify-boundaries.mjs"], { encoding: "utf8" });
  expect(result.stdout + result.stderr).not.toContain("Card V2 Git HEAD must retain the authorized pre-existing baseline");
  expect(result.status, result.stdout + result.stderr).toBe(0);
}, 60_000);

it("keeps the earlier before-source semantics and returns isolated public records", () => {
  const root = process.cwd(), view = join(root, githubReviewEvidence + "predecessor");
  const original = readG1G6CloseoutBindings(view, undefined, parseYamlSubset, readG6SourceBindings);
  withSourceBindingTraversal(root, () => {
    const first = getG6SourceBindings(root), expected = structuredClone(first);
    expect(first.sourceFiles["scripts/verification-helpers.mjs"].before).toBe(original.sourceFiles["scripts/verification-helpers.mjs"].before);
    expect(first.sourceFiles["scripts/verification-helpers.mjs"].beforeSnapshot).toBe(original.sourceFiles["scripts/verification-helpers.mjs"].beforeSnapshot);
    expect(getG6PreviousSource(root, "scripts/verification-helpers.mjs")).toBe(getG6PreviousSource(view, "scripts/verification-helpers.mjs"));
    first.githubReviewSuccessor.authorization.gitOperations = "forged";
    first.sourceFiles["scripts/verification-helpers.mjs"].after = "forged";
    first.closeoutSuccessor.phaseAdditions.githubReview20261017.kind = "forged";
    expect(getG6SourceBindings(root)).toEqual(expected);
  });
});

it("validates a relocated regular-file snapshot and rejects modified authority, proof, source and symlinks", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-github-review-relocated-"));
  const paths = githubReviewFixtureFiles(process.cwd());
  const put = (file: string, bytes: string | Buffer) => { mkdirSync(dirname(join(root, file)), { recursive: true }); writeFileSync(join(root, file), bytes); };
  try {
    for (const file of paths) { mkdirSync(dirname(join(root, file)), { recursive: true }); copyFileSync(file, join(root, file)); }
    expect(verify(root).githubReviewSuccessor.kind).toBe("GithubReviewFiniteSuccessor");
    const phaseFile = "status/current-phase.yaml", phase = readFileSync(phaseFile, "utf8");
    for (const changed of [phase.replace('humanGate: "awaiting_human"', 'humanGate: "forged"'), phase + '\nunknownFutureAuthority:\n  gitOperations: "authorized"\n', phase.replace('forcePush: false', 'forcePush: true')]) {
      put(phaseFile, changed);
      expect(() => verify(root)).toThrow(/source changed|previous phase|authorization changed/);
      put(phaseFile, phase);
    }
    for (const file of ["packages/ui/src/button/button.tsx", closeoutBindingsPath, githubReviewBindingsPath, "scripts/github-review-successor.mjs", githubReviewEvidence + "predecessor/" + closeoutBindingsPath, "apps/playground/src/docs/components/g5-component-pages.tsx"]) {
      put(file, readFileSync(file, "utf8") + "\n/* unproven change */\n");
      expect(() => verify(root), file).toThrow();
      put(file, readFileSync(file));
    }
    const binding = JSON.parse(readFileSync(githubReviewBindingsPath, "utf8"));
    binding.sourceFiles["unrelated.tsx"] = { before: null, after: sha("unrelated"), beforeSnapshot: null };
    put(githubReviewBindingsPath, JSON.stringify(binding));
    expect(() => verify(root)).toThrow(/binding changed/);
    put(githubReviewBindingsPath, readFileSync(githubReviewBindingsPath));
    const file = "apps/playground/src/docs/components/g5-component-pages.tsx";
    rmSync(join(root, file)); symlinkSync(join(process.cwd(), file), join(root, file));
    expect(() => verify(root)).toThrow(/regular file/);
    rmSync(join(root, file)); put(file, readFileSync(file));
    const directory = join(root, "apps/prototype/src/scenarios/resource-update"), saved = directory + "-saved";
    renameSync(directory, saved); symlinkSync(saved, directory);
    expect(() => verify(root)).toThrow(/regular file/);
    rmSync(directory, { recursive: true }); renameSync(saved, directory);
    rmSync(join(root, githubReviewBindingsPath));
    expect(() => verify(root)).toThrow();
    put(githubReviewBindingsPath, readFileSync(githubReviewBindingsPath));
    expect(verify(root).githubReviewSuccessor.kind).toBe("GithubReviewFiniteSuccessor");
  } finally { rmSync(root, { recursive: true, force: true }); }
}, 60_000);

it("allows only descendants of the authorized Git baseline and the exact existing origin", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-github-review-git-"));
  const record = { authorization: structuredClone(githubReviewPhase) };
  const git = (...args: string[]) => {
    const result = spawnSync("git", args, { cwd: root, encoding: "utf8" });
    if (result.error || result.status !== 0) throw result.error ?? new Error(result.stderr);
    return result.stdout.trim();
  };
  try {
    git("clone", "--quiet", "--shared", "--no-checkout", process.cwd(), root);
    git("remote", "set-url", "origin", githubReviewPhase.gitRemoteUrl);
    expect(verifyGithubReviewGitState(root, record)).toBe(true);
    const tree = git("rev-parse", githubReviewPhase.gitBaselineCommit + "^{tree}");
    const next = git("-c", "user.name=Review Test", "-c", "user.email=review-test@example.invalid", "commit-tree", tree, "-p", githubReviewPhase.gitBaselineCommit, "-m", "Review authorization descendant probe");
    git("update-ref", "HEAD", next);
    expect(verifyGithubReviewGitState(root, record)).toBe(true);
    git("update-ref", "HEAD", "321e1a0c1b5f9284e0fcb5167fa059d6174b1752");
    expect(() => verifyGithubReviewGitState(root, record)).toThrow();
    git("update-ref", "HEAD", next);
    git("remote", "set-url", "origin", "https://github.com/unrelated/repository.git");
    expect(() => verifyGithubReviewGitState(root, record)).toThrow(/remote changed/);
    git("remote", "set-url", "origin", githubReviewPhase.gitRemoteUrl);
    git("remote", "add", "unrelated", githubReviewPhase.gitRemoteUrl);
    expect(() => verifyGithubReviewGitState(root, record)).toThrow(/exact existing origin/);
    git("remote", "remove", "unrelated");
    expect(() => verifyGithubReviewGitState(root, { authorization: { ...githubReviewPhase, forcePush: true } })).toThrow(/authorization changed/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});


it("records exact imported P5 authored paints without granting runtime contrast acceptance", () => {
  const file = "apps/prototype/src/scenarios/resource-update/page.css";
  const record = withSourceBindingTraversal(process.cwd(), () => getLibraryPaintObservations(process.cwd()));
  const entry = record.localSources.find((item: any) => item.filePath === file);
  expect(entry).toMatchObject({ filePath: file, kind: "finite-css-paints", status: "runtime-unproved", acceptedException: false });
  expect(entry.inventory.length).toBeGreaterThan(0);
  expect(validateRecordedPaintSource(entry, readFileSync(file, "utf8"))).toEqual([]);
  expect(validateRecordedPaintSource(entry, readFileSync(file, "utf8") + "\n.ru-page { color: #ffffff; }\n")).not.toEqual([]);
});


it("rechecks a runtime parent directory on every API call after success and after failure", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-github-review-directory-cache-"));
  try {
    for (const file of githubReviewFixtureFiles(process.cwd())) {
      mkdirSync(dirname(join(root, file)), { recursive: true });
      copyFileSync(file, join(root, file));
    }
    expect(verify(root).githubReviewSuccessor.kind).toBe("GithubReviewFiniteSuccessor");
    const parent = join(root, "packages/ui/src/button"), saved = parent + "-saved";
    renameSync(parent, saved); symlinkSync(saved, parent);
    try { expect(() => verify(root)).toThrow(/regular file/); }
    finally { rmSync(parent, { recursive: true }); renameSync(saved, parent); }
    expect(verify(root).githubReviewSuccessor.kind).toBe("GithubReviewFiniteSuccessor");
  } finally { rmSync(root, { recursive: true, force: true }); }
}, 60_000);
