import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, linkSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { githubReviewFixtureFiles } from "./github-review-successor.mjs";

const evidence = "evidence/runtime/review-integration-2026-11-17/";
const modulePath = "scripts/review-integration.mjs";
const baseline = "6a2364c8b0325a243b2de8ebe12361e305aab333";
const bindingDigest = "11e70bf159ab52afa048be1028b37e673d4b65030ca7dfadf2cda18763b007e8";
const sha = bytes => createHash("sha256").update(bytes).digest("hex");

function regularFile(root, path, checked = new Set()) {
  const parts = path.split("/");
  assert(parts.every(part => part && part !== "." && part !== ".." && !part.includes("\\")), "Invalid integration path: " + path);
  for (let length = 1; length <= parts.length; length++) {
    const file = join(root, ...parts.slice(0, length));
    if (length < parts.length && checked.has(file)) continue;
    const info = lstatSync(file);
    assert(length === parts.length ? info.isFile() : info.isDirectory(), "Integration source must be a regular path: " + path);
    if (length < parts.length) checked.add(file);
  }
  return join(root, path);
}

export function readReviewIntegrationBindings(root, status, parsePhase, verifyPrevious) {
  const path = evidence + "source-bindings.json";
  if (!existsSync(join(root, path))) return null;
  const record = JSON.parse(readFileSync(regularFile(root, path), "utf8"));
  const normalized = structuredClone(record);
  normalized.sourceFiles[modulePath].after = "self";
  assert.equal(sha(JSON.stringify(normalized)), bindingDigest, "Reviewed integration binding changed");
  assert.equal(record.baseline, baseline);

  const checked = new Set();
  const bytes = file => readFileSync(regularFile(root, file, checked));
  for (const [file, binding] of Object.entries(record.sourceFiles)) {
    assert.equal(sha(bytes(file)), binding.after, "Integrated source changed: " + file);
    if (binding.before === null) {
      assert.equal(binding.beforeSnapshot, null);
    } else {
      assert.equal(binding.beforeSnapshot, evidence + "baseline/" + file);
      assert.equal(sha(bytes(binding.beforeSnapshot)), binding.before, "Integration baseline changed: " + file);
    }
  }
  const live = parsePhase(bytes("status/current-phase.yaml").toString());
  if (status != null) assert.deepEqual(status, live, "Integration phase differs from the workspace");
  assert.deepEqual(live.reviewIntegration20261117, record.phase, "Integration authorization changed");
  const { reviewIntegration20261117, ...priorPhase } = live;
  assert.deepEqual(priorPhase, parsePhase(bytes(record.sourceFiles["status/current-phase.yaml"].beforeSnapshot).toString()), "Integration changed previous phase records");

  const view = mkdtempSync(join(tmpdir(), "rain-review-base-"));
  const created = new Set();
  let previous;
  try {
    // Re-run the existing checks with the original bytes for only the files replaced here.
    for (const file of githubReviewFixtureFiles(root)) {
      const original = record.sourceFiles[file]?.beforeSnapshot ?? file;
      const source = regularFile(root, original, checked);
      const target = join(view, file);
      const directory = dirname(target);
      if (!created.has(directory)) {
        mkdirSync(directory, { recursive: true });
        created.add(directory);
      }
      try { linkSync(source, target); }
      catch (error) {
        if (error.code !== "EXDEV") throw error;
        copyFileSync(source, target);
      }
    }
    previous = verifyPrevious(view);
    assert(previous?.githubReviewSuccessor, "Integration requires the verified GitHub review baseline");
  } finally {
    rmSync(view, { recursive: true, force: true });
  }

  const sourceFiles = { ...previous.sourceFiles };
  for (const [file, binding] of Object.entries(record.sourceFiles)) {
    sourceFiles[file] = sourceFiles[file] ? { ...sourceFiles[file], after: binding.after } : binding;
  }
  return {
    ...previous, sourceFiles, reviewIntegration: record,
    closeoutSuccessor: {
      ...previous.closeoutSuccessor,
      phaseAdditions: { ...previous.closeoutSuccessor.phaseAdditions, reviewIntegration20261117 },
      paintObservations: {
        ...previous.closeoutSuccessor.paintObservations,
        localSources: [...previous.closeoutSuccessor.paintObservations.localSources, ...record.tablePaintSources],
      },
    },
  };
}
