import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { parseYamlSubset } from "./verification-helpers.mjs";

// This round's additive checks; historical G6/Drawer gates remain untouched.
const root = process.cwd();
const evidence = "evidence/runtime/attachment-functions-2026-10-15";
const workflow = "packages/ui/src/attachment-workflow";
const checks = [];
const read = path => {
  const absolute = resolve(root, path);
  assert(absolute.startsWith(root + "/"), `Reference must stay in the workspace: ${path}`);
  assert(statSync(absolute).isFile(), `Not a readable file: ${path}`);
  return readFileSync(absolute, "utf8");
};
const json = path => JSON.parse(read(path));
const sha = path => createHash("sha256").update(readFileSync(resolve(root, path))).digest("hex");
const filesIn = path => readdirSync(resolve(root, path), { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? filesIn(`${path}/${entry.name}`) : [`${path}/${entry.name}`]);
function check(name, run) {
  try { checks.push({ name, status: "passed", details: run() }); }
  catch (error) { checks.push({ name, status: "failed", error: error.message }); }
}
function modulePath(file, specifier) {
  const target = resolve(root, dirname(file), specifier);
  const match = [target, `${target}.ts`, `${target}.tsx`, `${target}.d.ts`, `${target}/index.ts`, `${target}/index.tsx`]
    .find(path => existsSync(path) && statSync(path).isFile());
  assert(match, `Unresolved local import: ${file} -> ${specifier}`);
  return relative(root, match);
}
const localImports = source => [...source.matchAll(/(?:\bfrom\s*|\bimport\s*|@import\s*)["'](\.{1,2}\/[^"']+)["']/g)].map(match => match[1]);
function exportsOf(file, seen = new Set()) {
  if (seen.has(file)) return new Map();
  seen.add(file);
  const source = read(file), names = new Map();
  for (const match of source.matchAll(/\bexport\s+(?:async\s+)?(function|const|class|type|interface)\s+(\w+)/g)) names.set(match[2], /type|interface/.test(match[1]) ? "type" : "value");
  for (const match of source.matchAll(/\bexport\s+\*\s+from\s*["']([^"']+)["']/g)) {
    for (const [name, kind] of exportsOf(modulePath(file, match[1]), seen)) names.set(name, kind);
  }
  return names;
}
function registryReference(reference) {
  const [file, name] = reference.split("#");
  const registry = json(file);
  const item = registry.items?.find(entry => entry.name === name);
  assert(item, `Missing registry item: ${reference}`);
  const files = [...registry.shared?.files ?? [], ...item.files ?? []];
  files.forEach(read);
  return files;
}
function styleReference(reference) {
  const match = /^@rain-next\/(foundations|ui)\/(.+)$/.exec(reference);
  assert(match, `Unexpected style dependency: ${reference}`);
  const packageRoot = `packages/${match[1]}`, target = json(`${packageRoot}/package.json`).exports[`./${match[2]}`];
  assert.equal(typeof target, "string", `Missing style package export: ${reference}`);
  read(`${packageRoot}/${target}`);
  return `${packageRoot}/${target}`;
}

check("attachment-display-baseline", () => {
  const baseline = json(`${evidence}/baseline.json`);
  const paths = ["packages/ui/src/attachment/attachment.tsx", "packages/ui/src/attachment/attachment.css"];
  for (const file of paths) {
    assert.equal(sha(file), baseline.sourceFiles[file], `Original display source changed: ${file}`);
    assert.equal(sha(`${evidence}/before/${file}`), baseline.sourceFiles[file], `Baseline copy changed: ${file}`);
  }
  return Object.fromEntries(paths.map(file => [file, sha(file)]));
});

check("status-addition-only", () => {
  const path = "status/current-phase.yaml", beforePath = `${evidence}/before/${path}`;
  assert.equal(sha(beforePath), json(`${evidence}/baseline.json`).sourceFiles[path], "Status baseline copy changed");
  const before = parseYamlSubset(read(beforePath)), current = parseYamlSubset(read(path));
  const top = Object.hasOwn(current, "attachmentFunctions");
  const nested = Object.hasOwn(current.componentRefinements ?? {}, "attachmentFunctions");
  assert(top !== nested, "Add exactly one attachmentFunctions entry at top level or componentRefinements");
  assert(!Object.hasOwn(before, "attachmentFunctions") && !Object.hasOwn(before.componentRefinements ?? {}, "attachmentFunctions"), "Expected a new phase entry");
  const entry = top ? current.attachmentFunctions : current.componentRefinements.attachmentFunctions;
  assert.equal(entry.humanGate, "awaiting_human", "Functional checks do not grant human acceptance");
  assert.equal(entry.publication, "unpublished", "This round is not published");
  assert.equal(entry.contrastAcceptance, "not-granted", "This round does not grant contrast acceptance");
  if (top) delete current.attachmentFunctions; else delete current.componentRefinements.attachmentFunctions;
  assert(isDeepStrictEqual(current, before), "Unrelated parsed status fields changed");
  return { addedPath: top ? "attachmentFunctions" : "componentRefinements.attachmentFunctions", otherParsedFieldsUnchanged: true };
});

check("manifest-and-registry-references", () => {
  const registry = json("registry/attachment-workflow.json");
  const item = registry.items?.find(value => value.name === "attachment-workflow");
  assert(item, "Missing attachment-workflow registry item");
  const manifest = parseYamlSubset(read(item.manifest));
  assert.equal(manifest.id, "recipe-attachment-workflow");
  assert.equal(manifest.sourcePath, `${workflow}/index.ts`);
  assert.equal(manifest.publication, "unpublished");
  assert.equal(registry.publication, "not-published");
  for (const record of [manifest, registry]) {
    assert.equal(record.humanGate, "awaiting_human");
    assert.equal(record.contrastAcceptance, "not-granted");
  }
  const paths = [...new Set([
    ...registry.shared?.files ?? [], ...item.files ?? [], ...item.examples ?? [],
    manifest.sourcePath, ...manifest.styleSourcePaths ?? [], ...manifest.examples ?? [], ...manifest.sourceEvidence ?? [],
    manifest.verification?.evidence, registry.sourceBindings, registry.verificationEvidence, item.sourceBindings,
  ].filter(Boolean))];
  // The parent generates final source bindings after this report. Check them on the next run.
  const deferredReferences = paths.filter(path => path === `${evidence}/source-bindings.json` && !existsSync(resolve(root, path)));
  paths.filter(path => !deferredReferences.includes(path)).forEach(read);
  const dependencies = [...registry.shared?.registryDependencies ?? [], ...item.registryDependencies ?? []];
  dependencies.forEach(registryReference);
  (registry.shared?.styleDependencies ?? []).forEach(styleReference);
  for (const id of manifest.relatedComponents ?? []) read(`manifests/ui/${id.replace(/^ui-/, "")}.yaml`);
  const display = parseYamlSubset(read("manifests/ui/attachment.yaml"));
  read(display.sourcePath); read(display.styleSourcePath);
  assert.equal(display.sourcePath, "packages/ui/src/attachment/attachment.tsx");
  return { checkedFiles: paths.length - deferredReferences.length, checkedRegistryReferences: dependencies.length, manifest: item.manifest, deferredReferences };
});

check("runtime-exports-imports-and-css", () => {
  const registry = json("registry/attachment-workflow.json"), item = registry.items.find(value => value.name === "attachment-workflow");
  const runtime = filesIn(workflow).filter(file => /\.(?:ts|tsx|css)$/.test(file) && !/\.test\.tsx?$/.test(file));
  const declared = new Set([...registry.shared?.files ?? [], ...item.files]);
  for (const reference of [...registry.shared?.registryDependencies ?? [], ...item.registryDependencies ?? []]) {
    registryReference(reference).forEach(file => declared.add(file));
  }
  const imports = [];
  for (const file of runtime) {
    assert(item.files.includes(file), `Runtime file missing from registry: ${file}`);
    for (const specifier of localImports(read(file))) {
      const target = modulePath(file, specifier); imports.push({ from: file, target });
      assert(declared.has(target), `Local import missing from registry files/dependencies: ${file} -> ${target}`);
      if (target.endsWith(".css")) read(`${target}.d.ts`);
    }
  }
  const exported = exportsOf(`${workflow}/index.ts`);
  for (const name of item.exportNames ?? []) assert.equal(exported.get(name), "value", `Missing runtime export: ${name}`);
  for (const name of item.typeExports ?? []) assert.equal(exported.get(name), "type", `Missing type export: ${name}`);
  assert.deepEqual([...exported.keys()].sort(), [...item.exportNames ?? [], ...item.typeExports ?? []].sort(), "Registry exports differ from the workflow entry");
  const publicReexports = [...read("packages/ui/src/index.ts").matchAll(/\bexport\s+\*\s+from\s*["']([^"']+)["']/g)];
  assert(publicReexports.some(match => modulePath("packages/ui/src/index.ts", match[1]) === `${workflow}/index.ts`), "Public UI entry does not export workflow");
  const bundledStyles = localImports(read("packages/ui/src/styles.css")).map(path => modulePath("packages/ui/src/styles.css", path));
  for (const file of runtime.filter(path => path.endsWith(".css"))) assert(bundledStyles.includes(file), `CSS missing from public stylesheet: ${file}`);
  return { runtimeFiles: runtime.length, resolvedLocalImports: imports.length, valueExports: item.exportNames.length, typeExports: item.typeExports.length };
});

check("existing-foundation-token-references", () => {
  const definitions = new Set(filesIn("packages/foundations/src").filter(file => file.endsWith(".css")).flatMap(file =>
    [...read(file).matchAll(/(--rain-[\w-]+)\s*:/g)].map(match => match[1])));
  const cssFiles = [...filesIn(workflow).filter(file => file.endsWith(".css")), "apps/playground/src/docs/components/attachment-workflow-demo.css"];
  const used = new Set();
  for (const file of cssFiles) {
    const source = read(file);
    assert(!/--rain-[\w-]+\s*:/.test(source), `Scoped CSS declares a new/overridden Foundation token: ${file}`);
    for (const match of source.matchAll(/var\(\s*(--rain-[\w-]+)/g)) {
      used.add(match[1]); assert(definitions.has(match[1]), `Undefined Foundation token in ${file}: ${match[1]}`);
    }
  }
  return { cssFiles, existingTokensUsed: [...used].sort(), scope: "Scoped CSS references existing Foundation declarations; no claim about pre-existing Foundation workspace edits." };
});

check("display-semantics-and-host-owned-service", () => {
  const display = read("packages/ui/src/attachment/attachment.tsx");
  assert(/export function Attachment\([^]*?return <div\b/.test(display), "Attachment root must remain a div");
  const sourceFiles = filesIn(workflow).filter(file => /\.tsx?$/.test(file) && !/\.test\.tsx?$/.test(file));
  // Deliberately modest static guard; runtime/browser tests own computed JSX and interaction semantics.
  const nested = /<(button|Button|AttachmentAction|AttachmentTrigger|IconButton)\b[^>]*>\s*<(button|Button|AttachmentAction|AttachmentTrigger|IconButton)\b/;
  for (const file of sourceFiles) {
    const source = read(file);
    assert(!nested.test(source), `Direct nested button markup: ${file}`);
    assert(!/\.open\(\s*["']POST["']\s*,\s*["']/.test(source), `Hard-coded upload endpoint: ${file}`);
    assert(!/\bfetch\(\s*["'](?:https?:\/\/|\/api\/)/.test(source), `Hard-coded business request: ${file}`);
  }
  const uploader = read(`${workflow}/attachment-xhr-uploader.ts`);
  assert(/\burl:\s*string/.test(uploader) && !/\burl\?:/.test(uploader), "Uploader must require a host-supplied URL");
  const demo = read("apps/playground/src/docs/components/attachment-workflow-demo.tsx");
  assert(demo.includes("仅在本页模拟") && demo.includes("不向服务器传输"), "Playground must identify local mock upload/save");
  return { originalRoot: "div", staticDirectButtonNesting: "not-found", uploadEndpoint: "host-required", demo: "explicit-local-mock", limits: "Static source guard only; does not replace typecheck, DOM, security or real service verification." };
});

const failed = checks.filter(result => result.status === "failed");
const report = {
  scope: "attachment-functions-2026-10-15",
  generatedAt: new Date().toISOString(),
  status: failed.length ? "failed" : "passed-scoped",
  checks,
  exclusions: ["Existing whole-repository verify-boundaries Drawer gate/evidence failures are not changed or waived here.", "No human, contrast, production, release, Figma or business-migration acceptance is granted."],
};
mkdirSync(resolve(root, evidence), { recursive: true });
writeFileSync(resolve(root, evidence, "scoped-governance.json"), JSON.stringify(report, null, 2) + "\n");
for (const result of checks) console.log(`${result.status === "passed" ? "PASS" : "FAIL"} ${result.name}${result.error ? `: ${result.error}` : ""}`);
console.log(`Attachment governance: ${checks.length - failed.length}/${checks.length} passed; ${evidence}/scoped-governance.json`);
process.exitCode = failed.length ? 1 : 0;
