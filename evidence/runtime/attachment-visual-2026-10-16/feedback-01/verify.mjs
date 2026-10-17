import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { parseYamlSubset } from "../../../../scripts/verification-helpers.mjs";

const root = process.cwd(), base = "evidence/runtime/attachment-visual-2026-10-16/feedback-01";
const read = path => readFileSync(resolve(root, path), "utf8");
const json = path => JSON.parse(read(path));
const sha = path => createHash("sha256").update(readFileSync(resolve(root, path))).digest("hex");
const baseline = json(`${base}/baseline.json`), previous = json(baseline.predecessor.path);
const walk = path => readdirSync(resolve(root, path), { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(`${path}/${entry.name}`) : [`${path}/${entry.name}`]);
const checks = [];
function check(name, action) { try { checks.push({ name, status: "passed", details: action() }); } catch (error) { checks.push({ name, status: "failed", error: error.message }); } }

check("baseline-and-preserved-functionality", () => {
  assert.equal(sha(baseline.predecessor.path), baseline.predecessor.sha256);
  for (const [path, hash] of Object.entries(baseline.sourceFiles)) assert.equal(sha(`${base}/before/${path}`), hash);
  const protectedPaths = Object.keys(previous.sourceFiles).filter(path => path.startsWith("packages/ui/src/attachment/") || path.startsWith("packages/ui/src/attachment-workflow/") && !/attachment-list\.|README/.test(path));
  for (const path of protectedPaths) assert.equal(sha(path), previous.sourceFiles[path].after, `Protected source changed: ${path}`);
  assert(read("design-qa.md").startsWith(read(`${base}/before/design-qa.md`)));
  return { predecessorPreserved: true, protectedSources: protectedPaths.length, priorQaPreserved: true };
});
check("registered-static-format-assets", () => {
  const source = read("packages/foundations/src/icons/catalog.generated.ts");
  const catalog = JSON.parse(source.slice(source.indexOf("= [") + 2, source.lastIndexOf("];" ) + 1));
  const icons = [...read("packages/ui/src/attachment-workflow/attachment-file-icon.ts").matchAll(/from "\.\.\/icons\/([^"]+)"/g)].map(match => match[1]);
  assert.equal(icons.length, 49);
  for (const slug of icons) {
    const entry = catalog.find(value => value.slug === slug);
    assert(entry && entry.availability === "available" && entry.colorMode === "intrinsic" && entry.rendering === "image", `Unusable format asset: ${slug}`);
  }
  return { staticAvailableIntrinsicAssets: icons.length, runtimeCatalogImport: false };
});
check("registry-runtime-and-current-evidence", () => {
  const registry = json("registry/attachment-workflow.json"), item = registry.items[0];
  const manifest = parseYamlSubset(read("manifests/recipes/attachment-workflow.yaml"));
  assert.equal(registry.sourceBindings, `${base}/source-bindings.json`); assert.equal(item.sourceBindings, registry.sourceBindings);
  assert.equal(manifest.verification.evidence, `${base}/verification.md`);
  for (const entry of [registry, manifest]) { assert.equal(entry.humanGate, "awaiting_human"); assert.equal(entry.contrastAcceptance, "not-granted"); }
  const declared = new Set([...registry.shared.files, ...item.files]);
  for (const reference of item.registryDependencies) {
    const [path, name] = reference.split("#"), dependency = json(path), entry = dependency.items.find(value => value.name === name);
    assert(entry, `Missing dependency ${reference}`);
    for (const path of [...dependency.shared?.files ?? [], ...entry.files]) declared.add(path);
  }
  let imports = 0;
  for (const path of walk("packages/ui/src/attachment-workflow").filter(path => /\.(?:ts|tsx|css)$/.test(path) && !/\.test\.tsx?$/.test(path))) {
    assert(item.files.includes(path), `Unregistered runtime source: ${path}`);
    for (const match of read(path).matchAll(/(?:\bfrom\s*|\bimport\s*|@import\s*)["'](\.{1,2}\/[^"']+)["']/g)) {
      const target = resolve(root, dirname(path), match[1]);
      const found = [target, `${target}.ts`, `${target}.tsx`, `${target}/index.ts`].find(path => existsSync(path) && statSync(path).isFile());
      assert(found && declared.has(relative(root, found)), `Undeclared import: ${path} -> ${match[1]}`); imports++;
    }
  }
  return { registeredLocalImports: imports, originalG6Denominator: 12 };
});
check("scoped-status-only", () => {
  const before = parseYamlSubset(read(`${base}/before/status/current-phase.yaml`)), current = parseYamlSubset(read("status/current-phase.yaml"));
  const parent = current.componentRefinements.attachmentFunctions.visualRefinement, feedback = parent.iconFeedback;
  assert.equal(feedback.sourceBindings, `${base}/source-bindings.json`); assert.equal(feedback.automatedVerification, "scoped-passed");
  assert.equal(feedback.humanGate, "awaiting_human"); assert.equal(feedback.publication, "unpublished");
  delete parent.iconFeedback;
  assert(isDeepStrictEqual(before, current), "Unrelated status fields changed");
  return { appendedPath: "attachmentFunctions.visualRefinement.iconFeedback", otherFieldsUnchanged: true };
});
check("current-sources-and-screenshots", () => {
  const bindings = json(`${base}/source-bindings.json`);
  for (const [path, value] of Object.entries(bindings.sourceFiles)) assert.equal(sha(path), value.after, `Current source changed: ${path}`);
  for (const [path, hash] of Object.entries(bindings.screenshots)) assert.equal(sha(path), hash);
  return { currentSources: Object.keys(bindings.sourceFiles).length, screenshots: Object.keys(bindings.screenshots).length };
});
check("affected-test-evidence", () => {
  assert(/Tests\s+46 passed \(46\)/.test(read(`${base}/unit-tests.log`)));
  const { stats, errors } = json(`${base}/browser/report.json`);
  assert.equal(stats.expected, 4); assert.equal(stats.unexpected, 0); assert.equal(stats.skipped, 0); assert.equal(stats.flaky, 0); assert.deepEqual(errors, []);
  assert(/built in/.test(read(`${base}/build.log`)));
  return { unitTests: 46, browserTests: 4, wholeLibraryAcceptance: false };
});
const failed = checks.filter(check => check.status === "failed");
writeFileSync(resolve(root, base, "scoped-checks.json"), JSON.stringify({ scope: "attachment-icon-feedback-01", status: failed.length ? "failed" : "passed-scoped", checks }, null, 2) + "\n");
checks.forEach(check => console.log(`${check.status === "passed" ? "PASS" : "FAIL"} ${check.name}${check.error ? `: ${check.error}` : ""}`));
process.exitCode = failed.length ? 1 : 0;
