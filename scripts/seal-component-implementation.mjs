import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, linkSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { componentImplementationAuthority as authority, componentImplementationBaseline as baseline,
  componentImplementationEvidence as evidence, componentImplementationBindingsPath as bindingPath,
  componentImplementationModulePath as modulePath, componentImplementationPhaseKey as phaseKey,
  componentImplementationSafePath as safePath, componentImplementationRegularPath as regularPath,
  componentImplementationSha as sha, componentImplementationBindingSeal as bindingDigest,
  componentImplementationModuleSeal as moduleDigest, validateComponentImplementationScope as validateScope,
  validateComponentImplementationPhase as validatePhase } from "./component-implementation-successor.mjs";
import { deepReviewBindingsPath, deepReviewBindingSeal, deepReviewFixtureFiles, readDeepReviewBindings } from "./deep-review-successor.mjs";
import { githubReviewFixtureFiles, readGithubReviewBindings } from "./github-review-successor.mjs";
import { readG1G6CloseoutBindings } from "./g1-g6-closeout-governance.mjs";
import { readG6SourceBindings } from "./g6-governance.mjs";
import { parseYamlSubset } from "./verification-helpers.mjs";

const bytes = (root, file) => readFileSync(regularPath(root, file));
function entryIfPresent(path) {
  try { return lstatSync(path); }
  catch (error) { if (error.code === "ENOENT") return null; throw error; }
}
function safeOutput(root, file) {
  safePath(file);
  assert(!lstatSync(root).isSymbolicLink(), "Sealing root cannot be a symlink");
  const parts = file.split("/");
  for (let i = 1; i < parts.length; i++) {
    const path = join(root, ...parts.slice(0, i));
    const info = entryIfPresent(path);
    if (!info) continue;
    assert(!info.isSymbolicLink() && info.isDirectory(), "Sealing output ancestor must be a regular directory, never a symlink: " + file);
  }
  const leaf = entryIfPresent(join(root, file));
  if (leaf) assert(!leaf.isSymbolicLink(), "Sealing output cannot be a symlink: " + file);
}
export function readComponentImplementationPredecessor(root, status, parsePhase = parseYamlSubset) {
  return readDeepReviewBindings(root, status, parsePhase, (view, phase, parser) =>
    readGithubReviewBindings(view, phase, parser, (old, oldPhase, oldParser) =>
      readG1G6CloseoutBindings(old, oldPhase, oldParser, readG6SourceBindings)));
}

// The archive is read without extraction, so archive paths never become writes.
export function readComponentImplementationBaseline(root) {
  assert.equal(sha(bytes(root, baseline.archivePath)), baseline.archiveSha256, "Opening source archive changed");
  assert.equal(sha(bytes(root, baseline.indexPath)), baseline.indexSha256, "Opening file hash index changed");
  const index = JSON.parse(bytes(root, baseline.indexPath));
  const raw = execFileSync("python3", ["-c", "import tarfile,base64,json,sys\nwith tarfile.open(sys.argv[1]) as a:\n m=a.getmembers(); assert all(x.isfile() for x in m); assert len({x.name for x in m})==len(m); print(json.dumps({x.name:base64.b64encode(a.extractfile(x).read()).decode() for x in m}))", join(root, baseline.archivePath)], { maxBuffer: 32 * 1024 * 1024, encoding: "utf8" });
  const archived = Object.fromEntries(Object.entries(JSON.parse(raw)).map(([file, value]) => {
    safePath(file); const data = Buffer.from(value, "base64");
    assert.equal(sha(data), index[file], "Opening archive member differs from its captured hash: " + file);
    return [file, data];
  }));
  assert.equal(Object.keys(archived).length, 68, "Opening source archive scope changed");
  return file => {
    safePath(file);
    if (Object.hasOwn(archived, file)) return archived[file];
    assert(!Object.hasOwn(index, file), "Existing user file is missing from the opening source archive: " + file);
    const exists = execFileSync("git", ["ls-tree", "-z", baseline.commit, "--", file], { cwd: root, encoding: "utf8" });
    if (!exists) return null;
    assert(/^100(?:644|755) blob /.test(exists) && exists.split("\0").filter(Boolean).length === 1, "Baseline source is not a single regular Git blob: " + file);
    return execFileSync("git", ["show", `${baseline.commit}:${file}`], { cwd: root, maxBuffer: 32 * 1024 * 1024 });
  };
}

function recordHistory(root, old) {
  const previousModule = bytes(root, old.candidateSnapshots[modulePath]).toString();
  const expected = previousModule.match(/const bindingSeal = "([0-9a-f]{64})";/)?.[1];
  const currentSeal = bytes(root, modulePath).toString().match(/const bindingSeal = "([0-9a-f]{64})";/)?.[1];
  assert.equal(currentSeal, expected, "Current verifier no longer anchors the previous component implementation revision");
  assert.equal(bindingDigest(old), expected, "Previous component implementation revision was altered");
  const history = { ...old.retainedHistory, [old.revisionRecord]: sha(bytes(root, old.revisionRecord)) };
  assert.equal(sha(bytes(root, old.revisionRecord)), sha(bytes(root, bindingPath)), "Previous active binding differs from retained revision");
  for (const [file, binding] of Object.entries(old.sourceFiles)) {
    for (const [path, digest] of [[binding.beforeSnapshot, binding.before], [old.candidateSnapshots[file], binding.after]]) {
      if (path) { assert.equal(sha(bytes(root, path)), digest, "Previous candidate snapshot changed: " + path); history[path] = digest; }
    }
  }
  for (const [file, digest] of Object.entries(history)) assert.equal(sha(bytes(root, file)), digest, "Previous revision history changed: " + file);
  return history;
}

/**
 * Explicit reviewed scope only. Does not infer an allowlist from git status.
 * @param {string} root
 * @param {Record<string, { taskIds: string[], reason: string }>} scope
 * @param {{ revision?: string, parsePhase?: (source: string) => any, verifyPrevious?: (root: string, status: any, parsePhase: (source: string) => any) => any }} [options]
 */
export function sealComponentImplementation(root, scope, { revision, parsePhase = parseYamlSubset, verifyPrevious = readComponentImplementationPredecessor } = {}) {
  validateScope(scope);
  assert(/^[a-z][a-z0-9-]{0,63}$/.test(revision), "Revision must be a new lowercase identifier");
  const revisionRoot = evidence + "revisions/" + revision + "/";
  safeOutput(root, revisionRoot + "source-bindings.json"); safeOutput(root, bindingPath);
  assert(!existsSync(join(root, revisionRoot)), "Refusing to overwrite an existing component implementation revision");
  const previous = existsSync(join(root, bindingPath)) ? JSON.parse(bytes(root, bindingPath)) : null;
  const history = previous ? recordHistory(root, previous) : {};
  const beforeSource = readComponentImplementationBaseline(root);
  const sourceFiles = {}, candidateSnapshots = {}, beforeBytes = new Map(), afterBytes = new Map();
  for (const file of Object.keys(scope).sort()) {
    const current = bytes(root, file), before = beforeSource(file);
    assert(before === null || !before.equals(current), "Refusing to relabel unchanged opening user work: " + file);
    beforeBytes.set(file, before); afterBytes.set(file, current);
    sourceFiles[file] = { before: before === null ? null : sha(before), after: sha(current), beforeSnapshot: before === null ? null : revisionRoot + "before/" + file };
    candidateSnapshots[file] = revisionRoot + "after/" + file;
  }
  const live = parsePhase(afterBytes.get("status/current-phase.yaml").toString());
  const priorPhaseBytes = beforeBytes.get("status/current-phase.yaml");
  assert(priorPhaseBytes, "Opening phase must exist");
  const additions = { [phaseKey]: live[phaseKey] };
  validatePhase(live, parsePhase(priorPhaseBytes.toString()), additions);

  // Rebuild the original finite closure using opening bytes, not HEAD alone:
  // the user already had a valid, uncommitted deep-review successor at B00.
  const view = mkdtempSync(join(tmpdir(), "rain-component-seal-proof-"));
  try {
    const checked = new Set();
    for (const file of new Set([...githubReviewFixtureFiles(root), ...deepReviewFixtureFiles(root)])) {
      const target = join(view, file); mkdirSync(dirname(target), { recursive: true });
      if (beforeBytes.has(file)) {
        assert(beforeBytes.get(file) !== null, "Existing predecessor cannot come from a new file: " + file);
        writeFileSync(target, beforeBytes.get(file));
      } else linkSync(regularPath(root, file, checked), target);
    }
    const original = verifyPrevious(view, undefined, parsePhase);
    assert(original?.deepReviewSuccessor && original?.githubReviewSuccessor && original?.closeoutSuccessor, "Sealing requires the complete previous source chain");
  } finally { rmSync(view, { recursive: true, force: true }); }
  const record = { kind: "ComponentImplementationFiniteSuccessor", authorization: { ...authority }, baseline: { ...baseline }, revision,
    revisionRecord: revisionRoot + "source-bindings.json", sealedAt: new Date().toISOString(), previousRevision: previous?.revision ?? null,
    scope: Object.fromEntries(Object.entries(scope).sort(([a], [b]) => a.localeCompare(b))), phaseAdditions: additions,
    sourceFiles, candidateSnapshots, retainedHistory: history,
    predecessorBindingSeal: deepReviewBindingSeal(JSON.parse(bytes(root, deepReviewBindingsPath))) };
  const verifier = afterBytes.get(modulePath).toString();
  const moduleHash = moduleDigest(verifier), recordHash = bindingDigest(record);
  const sealedVerifier = verifier.replace(/const bindingSeal = "[^"]*";/, `const bindingSeal = "${recordHash}";`)
    .replace(/const moduleSeal = "[^"]*";/, `const moduleSeal = "${moduleHash}";`);
  assert.notEqual(sealedVerifier, verifier, "Sealing did not update the verifier binding");
  assert.equal(moduleDigest(sealedVerifier), moduleHash);
  sourceFiles[modulePath].after = sha(sealedVerifier); afterBytes.set(modulePath, Buffer.from(sealedVerifier));
  assert.equal(bindingDigest(record), recordHash);
  // Guard the reviewed current sources against changes while the old proof ran.
  for (const file of Object.keys(scope)) assert.equal(sha(bytes(root, file)), file === modulePath ? sha(verifier) : sourceFiles[file].after, "Source changed while sealing: " + file);
  const put = (file, data) => { safeOutput(root, file); mkdirSync(dirname(join(root, file)), { recursive: true }); writeFileSync(join(root, file), data, { flag: "wx" }); };
  for (const [file, binding] of Object.entries(sourceFiles)) {
    if (binding.beforeSnapshot) put(binding.beforeSnapshot, beforeBytes.get(file));
    put(candidateSnapshots[file], afterBytes.get(file));
  }
  const encoded = JSON.stringify(record, null, 2) + "\n";
  put(record.revisionRecord, encoded);
  const pending = evidence + "active-" + revision + ".tmp";
  put(pending, encoded); renameSync(join(root, pending), join(root, bindingPath));
  writeFileSync(regularPath(root, modulePath), sealedVerifier);
  return { revision, bindingSeal: recordHash, moduleSeal: moduleHash, boundFiles: Object.keys(scope).length, previousRevision: record.previousRevision, recordPath: bindingPath };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [mode, scopePath, revisionFlag, revision] = process.argv.slice(2);
  assert(mode === "--seal" && scopePath && revisionFlag === "--revision" && revision && process.argv.length === 6,
    "Usage: node scripts/seal-component-implementation.mjs --seal /absolute/reviewed-scope.json --revision candidate-01");
  console.log(JSON.stringify(sealComponentImplementation(process.cwd(), JSON.parse(readFileSync(scopePath, "utf8")), { revision }), null, 2));
}
