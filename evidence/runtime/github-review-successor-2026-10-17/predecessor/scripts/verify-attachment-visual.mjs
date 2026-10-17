import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { parseYamlSubset } from "./verification-helpers.mjs";

const root = process.cwd();
const evidence = "evidence/runtime/attachment-visual-2026-10-16";
const workflow = "packages/ui/src/attachment-workflow";
const read = path => readFileSync(resolve(root, path), "utf8");
const json = path => JSON.parse(read(path));
const sha = path => createHash("sha256").update(readFileSync(resolve(root, path))).digest("hex");
const files = path => readdirSync(resolve(root, path), { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(`${path}/${entry.name}`) : [`${path}/${entry.name}`]);
const checks = [];
function check(name, run) {
  try { checks.push({ name, status: "passed", details: run() }); }
  catch (error) { checks.push({ name, status: "failed", error: error.message }); }
}

check("baseline-and-original-attachment", () => {
  const baseline = json(`${evidence}/baseline.json`);
  for (const file of baseline.files) assert.equal(sha(`${evidence}/before/${file.path}`), file.sha256, `Baseline copy changed: ${file.path}`);
  for (const path of ["packages/ui/src/attachment/attachment.tsx", "packages/ui/src/attachment/attachment.css"]) assert.equal(sha(path), baseline.files.find(file => file.path === path).sha256);
  const predecessor = json("evidence/runtime/attachment-functions-2026-10-15/source-bindings.json");
  const preserved = files(workflow).filter(path => /\.(?:ts|tsx|css)$/.test(path) && !path.includes("attachment-list."));
  for (const path of preserved) assert.equal(sha(path), predecessor.sourceFiles[path].after, `Functional source changed: ${path}`);
  return { baselineCopies: baseline.files.length, preservedFunctionalFiles: preserved.length, originalAttachment: "unchanged" };
});

check("scoped-phase-only", () => {
  const before = parseYamlSubset(read(`${evidence}/before/status/current-phase.yaml`));
  const current = parseYamlSubset(read("status/current-phase.yaml"));
  const entry = current.componentRefinements.attachmentFunctions.visualRefinement;
  assert.equal(entry.implementation, "completed-local");
  assert.equal(entry.automatedVerification, "scoped-passed");
  assert.equal(entry.humanGate, "awaiting_human");
  assert.equal(entry.contrastAcceptance, "not-granted");
  assert.equal(entry.publication, "unpublished");
  assert.equal(entry.originalG6Denominator, 12);
  delete current.componentRefinements.attachmentFunctions.visualRefinement;
  // Preserve the exact separately observed composer update in this shared checkout.
  const concurrent = json(`${evidence}/concurrent-status.json`);
  assert.equal(concurrent.path, "conversationComposer20261015");
  const digest = value => createHash("sha256").update(JSON.stringify(value)).digest("hex");
  assert.equal(digest(before.conversationComposer20261015), concurrent.beforeSha256);
  assert.equal(digest(current.conversationComposer20261015), concurrent.currentSha256);
  current.conversationComposer20261015 = before.conversationComposer20261015;
  assert(isDeepStrictEqual(current, before), "Unrelated phase fields changed");
  return { changedPath: "componentRefinements.attachmentFunctions.visualRefinement", preservedConcurrentPath: concurrent.path, otherParsedFieldsUnchanged: true };
});

check("manifest-registry-and-runtime-imports", () => {
  const registry = json("registry/attachment-workflow.json"), item = registry.items.find(value => value.name === "attachment-workflow");
  const manifest = parseYamlSubset(read(item.manifest));
  assert.equal(registry.sourceBindings, `${evidence}/source-bindings.json`);
  assert.equal(item.sourceBindings, registry.sourceBindings);
  assert.equal(manifest.verification.evidence, `${evidence}/verification.md`);
  for (const record of [registry, manifest]) { assert.equal(record.humanGate, "awaiting_human"); assert.equal(record.contrastAcceptance, "not-granted"); }
  const declared = new Set([...registry.shared.files, ...item.files]);
  for (const reference of item.registryDependencies) {
    const [path, name] = reference.split("#"), dependency = json(path);
    const target = dependency.items.find(value => value.name === name);
    assert(target, `Missing dependency: ${reference}`);
    for (const file of [...dependency.shared?.files ?? [], ...target.files]) declared.add(file);
  }
  for (const path of declared) assert(existsSync(resolve(root, path)), `Missing registry source: ${path}`);
  const runtime = files(workflow).filter(path => /\.(?:ts|tsx|css)$/.test(path) && !/\.test\.tsx?$/.test(path));
  let importCount = 0;
  for (const path of runtime) {
    assert(item.files.includes(path), `Unregistered source: ${path}`);
    for (const match of read(path).matchAll(/(?:\bfrom\s*|\bimport\s*|@import\s*)["'](\.{1,2}\/[^"']+)["']/g)) {
      const target = resolve(root, dirname(path), match[1]);
      const resolved = [target, `${target}.ts`, `${target}.tsx`, `${target}.d.ts`, `${target}/index.ts`].find(value => existsSync(value) && statSync(value).isFile());
      assert(resolved && declared.has(relative(root, resolved)), `Undeclared import: ${path} -> ${match[1]}`); importCount++;
    }
  }
  for (const path of [...item.examples, ...manifest.sourceEvidence, registry.verificationEvidence]) read(path);
  return { runtimeFiles: runtime.length, resolvedImports: importCount, registryDependencies: item.registryDependencies.length };
});

check("existing-rain-tokens", () => {
  const definitions = new Set(files("packages/foundations/src").filter(path => path.endsWith(".css")).flatMap(path => [...read(path).matchAll(/(--rain-[\w-]+)\s*:/g)].map(match => match[1])));
  const paths = [...files(workflow).filter(path => path.endsWith(".css")), "apps/playground/src/docs/components/attachment-states-demo.css"];
  const used = new Set();
  for (const path of paths) {
    assert(!/--rain-[\w-]+\s*:/.test(read(path)), `New global token in ${path}`);
    for (const match of read(path).matchAll(/var\(\s*(--rain-[\w-]+)/g)) { assert(definitions.has(match[1]), `Undefined token: ${match[1]}`); used.add(match[1]); }
  }
  return { cssFiles: paths.length, existingTokens: used.size };
});

check("current-source-bindings", () => {
  const bindings = json(`${evidence}/source-bindings.json`);
  assert.equal(sha(bindings.predecessor.path), bindings.predecessor.sha256);
  for (const [path, value] of Object.entries(bindings.sourceFiles)) assert.equal(sha(path), value.after, `Source binding changed: ${path}`);
  return { boundSources: Object.keys(bindings.sourceFiles).length, predecessorPreserved: true };
});

check("scoped-test-evidence", () => {
  assert(/Tests\s+192 passed \(192\)/.test(read(`${evidence}/unit-tests.log`)));
  const { stats, errors } = json(`${evidence}/browser/report.json`);
  assert.equal(stats.expected, 14); assert.equal(stats.unexpected, 0); assert.equal(stats.skipped, 0); assert.equal(stats.flaky, 0); assert.deepEqual(errors, []);
  assert(read(`${evidence}/final-build.log`).includes("apps/playground build: Done"));
  return { unit: 192, browser: 14, browserFailures: 0, scope: "attachment only; no whole-library acceptance" };
});

const failed = checks.filter(value => value.status === "failed");
writeFileSync(resolve(root, evidence, "scoped-governance.json"), JSON.stringify({ scope: "attachment-visual-2026-10-16", status: failed.length ? "failed" : "passed-scoped", generatedAt: new Date().toISOString(), checks, humanGate: "awaiting_human", publication: "unpublished", contrastAcceptance: "not-granted" }, null, 2) + "\n");
for (const result of checks) console.log(`${result.status === "passed" ? "PASS" : "FAIL"} ${result.name}${result.error ? `: ${result.error}` : ""}`);
process.exitCode = failed.length ? 1 : 0;
