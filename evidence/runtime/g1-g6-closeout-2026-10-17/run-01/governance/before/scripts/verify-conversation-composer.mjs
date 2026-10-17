import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { parseYamlSubset } from "./verification-helpers.mjs";
import { renderAssetIndex, validateAsset } from "./asset-index.mjs";

// Additive checks for this Recipe; historical G6 evidence and gates keep their meaning.
const root = process.cwd();
const recipe = "packages/ui/src/conversation-composer";
const evidence = "evidence/runtime/conversation-composer-2026-10-15/run-01";
const args = process.argv.slice(2);
function option(flag, fallback) {
  const index = args.indexOf(flag);
  if (index < 0) return fallback;
  assert(args[index + 1] && !args[index + 1].startsWith("--"), `Missing value for ${flag}`);
  return args[index + 1];
}
const bindingsPath = option("--bindings", JSON.parse(readFileSync(resolve(root, "registry/conversation-composer.json"), "utf8")).sourceBindings);
const outputPath = option("--output", undefined);
assert(args.every((value, index) => index > 0 && ["--bindings", "--output"].includes(args[index - 1]) || ["--bindings", "--output"].includes(value)), "Use --bindings <path> and/or --output <path>");
const checks = [];
function absolute(path) {
  const target = resolve(root, path);
  assert(target.startsWith(root + "/"), `Reference must stay inside the workspace: ${path}`);
  return target;
}
const read = path => { assert(statSync(absolute(path)).isFile(), `Not a file: ${path}`); return readFileSync(absolute(path), "utf8"); };
const json = path => JSON.parse(read(path));
const sha = path => createHash("sha256").update(readFileSync(absolute(path))).digest("hex");
const filesIn = path => readdirSync(absolute(path), { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? filesIn(`${path}/${entry.name}`) : [`${path}/${entry.name}`]);
function check(name, run) {
  try {
    const details = run();
    checks.push({ name, status: details?.pending ? "pending" : "passed", details });
  } catch (error) { checks.push({ name, status: "failed", error: error.message }); }
}
function modulePath(file, specifier) {
  const target = resolve(root, dirname(file), specifier);
  const match = [target, `${target}.ts`, `${target}.tsx`, `${target}.d.ts`, `${target}/index.ts`, `${target}/index.tsx`]
    .find(path => existsSync(path) && statSync(path).isFile());
  assert(match, `Unresolved local reference: ${file} -> ${specifier}`);
  return relative(root, match);
}
const localImports = source => [...source.matchAll(/(?:\bfrom\s*|\bimport\s*|@import\s*)["'](\.{1,2}\/[^"']+)["']/g)].map(match => match[1]);
function exportsOf(file, seen = new Set()) {
  if (seen.has(file)) return new Map();
  seen.add(file);
  const source = read(file), names = new Map();
  for (const match of source.matchAll(/\bexport\s+(?:async\s+)?(function|const|class|type|interface)\s+(\w+)/g)) {
    names.set(match[2], /type|interface/.test(match[1]) ? "type" : "value");
  }
  for (const match of source.matchAll(/\bexport\s+\*\s+from\s*["']([^"']+)["']/g)) {
    for (const [name, kind] of exportsOf(modulePath(file, match[1]), seen)) names.set(name, kind);
  }
  return names;
}
function dependencyFiles(reference, seen = new Set()) {
  const canonical = reference.includes("#") ? reference : `registry/icons.json#${reference}`;
  if (seen.has(canonical)) return [];
  seen.add(canonical);
  const [file, name] = canonical.split("#"), registry = json(file);
  const item = registry.items?.find(value => value.name === name);
  assert(item, `Missing registry item: ${canonical}`);
  const files = [...registry.shared?.files ?? [], ...item.files ?? []];
  files.forEach(path => assert(statSync(absolute(path)).isFile(), `Missing dependency file: ${path}`));
  for (const next of [...registry.shared?.registryDependencies ?? [], ...item.registryDependencies ?? [], ...item.typeDependencies ?? []]) {
    files.push(...dependencyFiles(next, seen));
  }
  return [...new Set(files)];
}

check("original-g6-twelve-item-registry", () => {
  const path = "registry/g6-assets.json", baseline = json(`${evidence}/baseline.json`);
  assert.equal(sha(path), baseline.files[path], "Original G6 registry changed from this run's baseline");
  assert.equal(json(path).items.length, 12, "Do not change the original G6 denominator");
  return { path, sha256: sha(path), originalItemCount: 12 };
});

check("manifest-registry-and-source-paths", () => {
  const registry = json("registry/conversation-composer.json");
  assert.equal(registry.items.length, 1, "Register one independent Conversation Composer Recipe");
  const [item] = registry.items, manifest = parseYamlSubset(read(item.manifest));
  assert.equal(item.name, "conversation-composer");
  assert.equal(item.importPath, "@rain-next/ui");
  assert.equal(manifest.id, "recipe-conversation-composer");
  assert.equal(manifest.kind, "RainRecipeManifest");
  assert.equal(manifest.sourcePath, `${recipe}/index.ts`);
  assert.equal(manifest.maturity, "registry-candidate");
  assert.equal(manifest.publication, "unpublished");
  assert.equal(registry.publication, "not-published");
  for (const record of [manifest, registry]) {
    assert.equal(record.assetIdentity, "registry-candidate");
    assert(["awaiting_human", "accepted"].includes(record.humanGate), "Human Gate must await review or reference an explicit user acceptance");
    assert.equal(record.contrastAcceptance, "not-granted");
  }
  assert.equal(item.modificationMode, manifest.modificationMode);
  assert.equal(registry.sourceBindings, item.sourceBindings);
  assert(manifest.sourceEvidence.includes(registry.sourceBindings), "Manifest must point to this run's current source bindings");
  const paths = [...new Set([
    ...registry.shared?.files ?? [], ...item.files, ...item.examples ?? [],
    manifest.sourcePath, ...manifest.styleSourcePaths ?? [], ...manifest.examples ?? [],
    ...manifest.sourceEvidence ?? [], manifest.verification?.evidence, registry.verificationEvidence,
  ].filter(Boolean))];
  paths.filter(path => path !== registry.sourceBindings).forEach(read);
  assert(item.files.every(path => !/\.test\.[cm]?[jt]sx?$|(?:^|\/)\.env(?:\.|$)|(?:credential|secret)/i.test(path)), "Do not package tests or credentials");
  for (const id of manifest.relatedComponents ?? []) read(`manifests/ui/${id.replace(/^ui-/, "")}.yaml`);
  for (const id of manifest.relatedRecipes ?? []) read(`manifests/recipes/${id.replace(/^recipe-/, "")}.yaml`);
  const packageJson = json("packages/ui/package.json");
  assert(!packageJson.exports["./conversation-composer"], "Use the existing root entry, not a new package subpath");
  for (const [name, version] of Object.entries(registry.dependencies)) {
    assert.equal(packageJson.dependencies[name], version, `Only declare an existing runtime dependency: ${name}`);
  }
  return { manifest: item.manifest, sourcePath: manifest.sourcePath, referencedFiles: paths.length, publication: manifest.publication, humanGate: manifest.humanGate };
});

check("verification-evidence-and-lifecycle-consistency", () => {
  const registry = json("registry/conversation-composer.json"), item = registry.items[0];
  const manifest = parseYamlSubset(read(item.manifest));
  assert.equal(manifest.verification?.evidence, registry.verificationEvidence, "Manifest and Registry must reference the same current verification evidence");
  for (const key of ["humanGate", "contrastAcceptance"]) {
    assert.equal(manifest.verification?.[key], manifest[key], `Manifest verification and top-level lifecycle differ: ${key}`);
    assert.equal(manifest[key], registry[key], `Manifest and Registry lifecycle differ: ${key}`);
  }
  let acceptedRuntimeFiles = 0;
  if (registry.humanGate === "accepted") {
    assert.equal(manifest.verification?.humanGateEvidence, registry.humanGateEvidence, "Accepted Manifest and Registry must share the user decision evidence");
    const decision = json(registry.humanGateEvidence);
    assert.equal(decision.humanGate, "accepted");
    assert.equal(decision.decisionSource, "explicit-user-local-component-acceptance");
    assert.equal(decision.scope, "conversation-composer-current-local-component");
    assert(typeof decision.userStatement === "string" && decision.userStatement.includes("当前本地版本整体验收通过"), "Record the explicit user acceptance statement");
    assert.equal(decision.realServices, "deferred-by-user");
    assert.equal(decision.publication, "unpublished");
    assert.equal(decision.contrastAcceptance, registry.contrastAcceptance);
    const acceptedBindings = json(decision.acceptedSourceBindings);
    for (const path of item.files.filter(path => /\.(?:ts|tsx|css)$/.test(path))) {
      assert(Object.hasOwn(decision.acceptedRuntimeSources, path), `Accepted runtime source is missing: ${path}`);
    }
    for (const [path, digest] of Object.entries(decision.acceptedRuntimeSources)) {
      assert.equal(acceptedBindings.sourceFiles[path]?.after, digest, `Acceptance must retain the inspected version: ${path}`);
      assert.equal(sha(path), digest, `Runtime changed after user acceptance: ${path}`);
      acceptedRuntimeFiles += 1;
    }
    assert(acceptedRuntimeFiles > 0, "Acceptance requires the inspected runtime sources");
    for (const [path, digest] of Object.entries(decision.preservedHistory)) {
      assert.equal(sha(path), digest, `Do not rewrite the pre-acceptance evidence: ${path}`);
    }
  }
  return { evidence: registry.verificationEvidence, humanGate: manifest.humanGate, contrastAcceptance: manifest.contrastAcceptance, acceptedRuntimeFiles };
});

check("scoped-asset-index-discoverability", () => {
  const registryPath = "registry/conversation-composer.json", registry = json(registryPath), item = registry.items[0];
  const manifestPath = item.manifest, manifest = parseYamlSubset(read(manifestPath));
  const asset = { manifest, manifestPath, item, registry, registryPath };
  validateAsset(asset, root);
  assert.equal(manifest.verification?.automated, "scoped-passed", "Conversation Composer must register scoped-passed verification to be discoverable in the asset index");
  const rows = source => source.split("\n").filter(line => line.startsWith(`| **${manifest.name}** |`));
  const expected = rows(renderAssetIndex([asset]));
  assert.equal(expected.length, 1, "The asset renderer must produce exactly one Conversation Composer row");
  const indexPath = "docs/ai/asset-index.md", actual = rows(read(indexPath));
  assert.equal(actual.length, 1, "The asset index must contain exactly one Conversation Composer row");
  assert.deepEqual(actual, expected, "Conversation Composer index row must match its current Manifest and Registry");
  const queries = ["对话", "ConversationComposer"];
  for (const query of queries) {
    assert.deepEqual(rows(renderAssetIndex([asset], query)), expected, `Conversation Composer must be discoverable by: ${query}`);
  }
  return { indexPath, validatedAssets: 1, matchingRows: actual.length, queries, wholeIndex: "not-claimed" };
});

check("public-exports-and-stylesheet", () => {
  const item = json("registry/conversation-composer.json").items[0], exported = exportsOf(`${recipe}/index.ts`);
  for (const name of item.exportNames) assert.equal(exported.get(name), "value", `Missing value export: ${name}`);
  for (const name of item.typeExports) assert.equal(exported.get(name), "type", `Missing type export: ${name}`);
  assert.deepEqual([...exported.keys()].sort(), [...item.exportNames, ...item.typeExports].sort(), "Recipe entry and Registry exports differ");
  const publicEntry = "packages/ui/src/index.ts";
  const roots = [...read(publicEntry).matchAll(/\bexport\s+\*\s+from\s*["']([^"']+)["']/g)].map(match => modulePath(publicEntry, match[1]));
  assert(roots.includes(`${recipe}/index.ts`), "Public UI entry does not export the Recipe");
  const styles = localImports(read("packages/ui/src/styles.css")).map(path => modulePath("packages/ui/src/styles.css", path));
  for (const path of item.files.filter(file => file.endsWith(".css"))) {
    assert(styles.includes(path), `CSS missing from the public stylesheet: ${path}`);
    read(`${path}.d.ts`);
    assert(localImports(read(`${recipe}/conversation-composer.tsx`)).some(specifier => modulePath(`${recipe}/conversation-composer.tsx`, specifier) === path), "Component must import its own stylesheet");
  }
  for (const reference of json("registry/conversation-composer.json").shared.styleDependencies) {
    const match = /^@rain-next\/(foundations|ui)\/(.+)$/.exec(reference);
    assert(match, `Unexpected stylesheet package: ${reference}`);
    const packageRoot = `packages/${match[1]}`, target = json(`${packageRoot}/package.json`).exports[`./${match[2]}`];
    assert.equal(typeof target, "string", `Missing stylesheet export: ${reference}`);
    read(`${packageRoot}/${target}`);
  }
  return { valueExports: item.exportNames, typeExports: item.typeExports, publicStylesheet: "packages/ui/src/styles.css" };
});

check("runtime-and-registry-dependency-closure", () => {
  const registry = json("registry/conversation-composer.json"), item = registry.items[0];
  const declared = new Set([...registry.shared.files, ...item.files]);
  for (const reference of item.registryDependencies) dependencyFiles(reference).forEach(file => declared.add(file));
  const runtime = filesIn(recipe).filter(file => /\.(?:ts|tsx|css)$/.test(file) && !/\.test\.tsx?$/.test(file));
  for (const file of runtime) assert(item.files.includes(file), `Runtime source missing from Registry: ${file}`);
  const npmDependencies = new Set([...Object.keys(registry.dependencies), ...registry.shared.peerDependencies]);
  let localCount = 0, iconCount = 0;
  // UI's aggregate stylesheet is an explicit host package dependency, not a request to copy every UI family.
  const sources = [...declared].filter(file => /\.(?:ts|tsx|css)$/.test(file) && file !== "packages/ui/src/styles.css");
  for (const file of sources) {
    const source = read(file);
    for (const specifier of localImports(source)) {
      const target = modulePath(file, specifier); localCount += 1;
      assert(declared.has(target), `Local dependency absent from Registry closure: ${file} -> ${target}`);
      if (target.endsWith(".css")) assert(declared.has(`${target}.d.ts`), `Missing CSS declaration: ${target}.d.ts`);
    }
    for (const match of source.matchAll(/new URL\(\s*["'](\.{1,2}\/[^"']+)["']\s*,\s*import\.meta\.url/g)) {
      assert(declared.has(modulePath(file, match[1])), `Static icon asset absent from Registry closure: ${file} -> ${match[1]}`); iconCount += 1;
    }
    for (const match of source.matchAll(/(?:\bfrom\s*|\bimport\s*)["']([^.'"][^'"]*)["']/g)) {
      const specifier = match[1];
      if (specifier.startsWith("@rain-next/ui/icons/")) {
        const target = `packages/ui/src/icons/${specifier.slice("@rain-next/ui/icons/".length)}.tsx`;
        assert(declared.has(target), `Public single-icon import absent from Registry closure: ${specifier}`);
      } else {
        const name = specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0];
        assert(npmDependencies.has(name), `Runtime package absent from dependencies/peers: ${file} -> ${name}`);
      }
    }
  }
  return { runtimeFiles: runtime.length, closureFiles: declared.size, localImportsChecked: localCount, staticIconAssets: iconCount, aggregateStyles: "explicit-host-dependency" };
});

check("current-source-bindings", () => {
  if (!existsSync(absolute(bindingsPath))) return { pending: true, path: bindingsPath, reason: "The final run must bind current sources before this check can pass." };
  const bindings = json(bindingsPath), records = bindings.sourceFiles ?? bindings.files;
  assert(records && typeof records === "object", "Bindings require sourceFiles or files records");
  const registry = json("registry/conversation-composer.json"), item = registry.items[0];
  const required = [...item.files, ...item.examples, item.manifest, "registry/conversation-composer.json", "scripts/verify-conversation-composer.mjs", "scripts/asset-index.mjs", "docs/ai/asset-index.md", "packages/ui/src/index.ts", "packages/ui/src/styles.css"];
  if (registry.humanGate === "accepted") required.push(registry.humanGateEvidence);
  for (const path of required) assert(Object.hasOwn(records, path), `Current source not covered by bindings: ${path}`);
  let checked = 0;
  for (const [path, record] of Object.entries(records)) {
    const digest = typeof record === "string" ? record : record?.after ?? record?.sha256;
    assert.equal(typeof digest, "string", `No current digest for ${path}`);
    assert.equal(sha(path), digest, `Current source binding is stale: ${path}`); checked += 1;
  }
  return { path: bindingsPath, checkedSourceFiles: checked, requiredSourceFiles: required.length };
});

const failed = checks.filter(result => result.status === "failed"), pending = checks.filter(result => result.status === "pending");
const report = {
  scope: relative(resolve(root, "evidence/runtime"), dirname(absolute(bindingsPath))),
  generatedAt: new Date().toISOString(),
  status: failed.length ? "failed" : pending.length ? "pending-source-bindings" : "passed-scoped",
  checks,
  exclusions: ["Historical G6 source locks and independent gates are neither rewritten nor waived.", "This check does not grant human visual, contrast, browser/device, real service, publication, Figma or production acceptance."],
};
if (outputPath) {
  mkdirSync(dirname(absolute(outputPath)), { recursive: true });
  writeFileSync(absolute(outputPath), JSON.stringify(report, null, 2) + "\n");
}
for (const result of checks) console.log(`${result.status.toUpperCase()} ${result.name}${result.error ? `: ${result.error}` : ""}`);
console.log(`Conversation Composer governance: ${checks.length - failed.length - pending.length}/${checks.length} passed; ${pending.length} pending${outputPath ? `; ${outputPath}` : ""}`);
process.exitCode = failed.length || pending.length ? 1 : 0;
