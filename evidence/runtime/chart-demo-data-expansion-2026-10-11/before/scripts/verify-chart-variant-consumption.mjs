import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cpSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { basename, dirname, isAbsolute, join, posix, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { runInNewContext } from "node:vm";
import { parseSync } from "vite";

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = path => readFileSync(path, "utf8");
const json = path => JSON.parse(read(path));
const hash = content => createHash("sha256").update(content).digest("hex");
const put = (path, content) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content); };

export function assertDownloadClosure(files, id) {
  for (const [name, source] of Object.entries(files)) {
    assert.equal(typeof source, "string", `${id}: missing source ${name}`);
    assert(!isAbsolute(name) && !posix.normalize(name).startsWith("../"), `${id}: ${name} leaves its downloaded file set`);
    if (!/\.[cm]?[jt]sx?$/.test(name)) continue;
    const parsed = parseSync(name, source);
    assert.deepEqual(parsed.errors, [], `${id}: cannot parse ${name}`);
    for (const node of parsed.program.body) {
      const specifier = node.source?.value;
      if (typeof specifier !== "string" || !specifier.startsWith(".")) continue;
      const target = posix.normalize(posix.join(posix.dirname(name), specifier.split("?")[0]));
      assert(!target.startsWith("../"), `${id}: ${name} leaves its downloaded file set`);
      assert([target, `${target}.ts`, `${target}.tsx`, `${target}/index.ts`, `${target}/index.tsx`].some(path => Object.hasOwn(files, path)), `${id}: ${name} requires ${specifier}`);
    }
    const nodes = [parsed.program];
    for (const node of nodes) {
      if (!node || typeof node !== "object") continue;
      nodes.push(...(Array.isArray(node) ? node : Object.values(node)).filter(value => value && typeof value === "object"));
      const base = node.arguments?.[1];
      if (node.type !== "NewExpression" || node.callee?.name !== "URL" || base?.object?.type !== "MetaProperty" || base.object.meta.name !== "import" || base.property?.name !== "url") continue;
      const first = node.arguments[0];
      const specifier = first?.value ?? (first?.type === "TemplateLiteral" && first.expressions.length === 0 ? first.quasis[0]?.value.cooked : undefined);
      assert.equal(typeof specifier, "string", `${id}: ${name} module-relative URL must be a literal`);
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(specifier)) continue;
      assert(!specifier.startsWith("/"), `${id}: ${name} leaves its downloaded file set`);
      const target = posix.normalize(posix.join(posix.dirname(name), specifier.split(/[?#]/)[0]));
      assert(!target.startsWith("../"), `${id}: ${name} leaves its downloaded file set`);
      assert(Object.hasOwn(files, target), `${id}: ${name} requires ${specifier}`);
    }
  }
}

export async function exportedDownloads(directory, exportName = "chartVariantFiles") {
  const path = join(directory, exportName === "chartChinaFiles" ? "chart-china-source.tsx" : "chart-example-source.tsx");
  const source = read(path);
  const parsed = parseSync(path, source);
  assert.deepEqual(parsed.errors, []);
  const globals = {};
  const selected = [];
  for (const node of parsed.program.body) {
    if (node.type === "ImportDeclaration" && node.source.value.endsWith("?raw")) globals[node.specifiers[0].local.name] = read(resolve(directory, node.source.value.slice(0, -4)));
    if (node.type === "VariableDeclaration") {
      const name = node.declarations[0].id.name;
      if (name === "variantFamilies" && exportName === "chartVariantFiles") selected.push(source.slice(node.start, node.end));
      if (name === "variantModules" || name === "variantData" || name === "chinaDataFiles") {
        const pattern = node.declarations[0].init.expression?.arguments?.[0]?.value ?? node.declarations[0].init.arguments?.[0]?.value;
        assert(typeof pattern === "string", `${name} glob must be a literal`);
        const folder = posix.dirname(pattern);
        const suffix = posix.basename(pattern).slice(1);
        globals[name] = Object.fromEntries(readdirSync(resolve(directory, folder)).filter(file => file.endsWith(suffix) && lstatSync(resolve(directory, folder, file)).isFile()).map(file => [`${folder}/${file}`, read(resolve(directory, folder, file))]));
      }
    }
    if (node.type === "ExportNamedDeclaration" && (node.declaration?.id?.name === exportName || exportName === "chartExampleFiles" && ["chartExampleCode", "chartNetworkFiles"].includes(node.declaration?.id?.name))) selected.push(source.slice(node.declaration.start, node.declaration.end));
  }
  assert.equal(selected.length, exportName === "chartExampleFiles" ? 3 : exportName === "chartVariantFiles" ? 2 : 1, "Capture the owning map and exported download function");
  const require = createRequire(import.meta.resolve("vite"));
  const { transformSync } = await import(pathToFileURL(require.resolve("rolldown/utils")).href);
  const result = transformSync("download-exporter.tsx", selected.join("\n"));
  assert.deepEqual(result.errors, []);
  return { files: runInNewContext(`${result.code}\n${exportName};`, globals), exporterSha256: hash(source) };
}

function cachedPackage(name, from) {
  for (let directory = from; ; directory = dirname(directory)) {
    const path = join(directory, "node_modules", name);
    if (existsSync(join(path, "package.json"))) return realpathSync(path);
    if (dirname(directory) === directory) break;
  }
  return null;
}

export async function verifyChartVariants(evidenceDirectory) {
  const startedAt = new Date().toISOString();
  const evidence = resolve(workspace, evidenceDirectory ?? process.argv[2] ?? `evidence/runtime/chart-variants/consumption/${startedAt.replaceAll(":", "-")}`);
  const host = realpathSync(mkdtempSync("/tmp/rain-chart-variants-consumer-"));
  const facts = { startedAt, timeZone: "Asia/Shanghai", command: "node scripts/verify-chart-variant-consumption.mjs", verifierSha256: hash(readFileSync(fileURLToPath(import.meta.url))), host, publication: "unpublished", mode: "isolated host with copied installed dependency cache; not a clean install", sourceScope: "complete current UI and Foundations source packages, not minimum Registry item installation", commands: [] };
  mkdirSync(evidence, { recursive: true });
  try {
    const reference = json(join(workspace, "apps/playground/src/docs/components/chart-variants/reference.json"));
    const registry = json(join(workspace, "registry/charts.json"));
    assert.equal(reference.length, 170);
    assert.equal(new Set(reference.map(row => row.id)).size, 170);
    facts.registrySha256 = hash(read(join(workspace, "registry/charts.json")));
    facts.registrySourceVersion = registry.sourceVersion;
    const registryFiles = [...new Set([...registry.shared.files, ...registry.items.flatMap(item => item.files)])];
    facts.registrySourceFiles = registryFiles.map(path => ({ path, sha256: hash(readFileSync(join(workspace, path))) }));
    const sourceFiles = [];
    facts.packageManifests = [];
    const packageNames = new Map();
    function link(name, target, directory = join(host, "node_modules")) {
      const path = join(directory, name);
      if (existsSync(path)) return;
      mkdirSync(dirname(path), { recursive: true });
      symlinkSync(relative(dirname(path), target), path, "dir");
    }
    for (const name of ["ui", "foundations"]) {
      const target = join(host, "node_modules/@rain-next", name);
      cpSync(join(workspace, "packages", name, "src"), join(target, "src"), { recursive: true });
      const manifestPath = `packages/${name}/package.json`;
      const manifest = json(join(workspace, manifestPath));
      if (name === "ui") manifest.dependencies["@rain-next/foundations"] = "0.0.0";
      put(join(target, "package.json"), JSON.stringify(manifest, null, 2));
      facts.packageManifests.push({ path: manifestPath, canonicalSha256: hash(readFileSync(join(workspace, manifestPath))), fixtureSha256: hash(readFileSync(join(target, "package.json"))), adaptation: name === "ui" ? "Foundations workspace dependency points to the copied 0.0.0 candidate" : "none" });
      packageNames.set(`@rain-next/${name}`, target);
      for (const file of readdirSync(join(target, "src"), { recursive: true })) {
        if (lstatSync(join(target, "src", file)).isFile()) sourceFiles.push({ path: `packages/${name}/src/${file}`, sha256: hash(readFileSync(join(target, "src", file))) });
      }
    }
    facts.sourceFiles = sourceFiles;
    const copied = new Map();
    const dependencyVersions = [];
    function copyDependency(name, from, optional = false) {
      if (packageNames.has(name)) return packageNames.get(name);
      const actual = cachedPackage(name, from);
      if (!actual && optional) return null;
      assert(actual, `Installed dependency cache is missing ${name} from ${from}`);
      if (copied.has(actual)) return copied.get(actual);
      const manifest = json(join(actual, "package.json"));
      const target = join(host, "cache", `${manifest.name.replaceAll("/", "+")}-${manifest.version}-${hash(actual).slice(0, 8)}`);
      copied.set(actual, target);
      cpSync(actual, target, { recursive: true, dereference: true, filter: path => basename(path) !== "node_modules" });
      dependencyVersions.push({ name: manifest.name, version: manifest.version, originalCachePath: actual, installedPath: target });
      const dependencies = { ...manifest.peerDependencies, ...manifest.optionalDependencies, ...manifest.dependencies };
      for (const dependency of Object.keys(dependencies)) {
        const maySkip = Object.hasOwn(manifest.optionalDependencies ?? {}, dependency) || manifest.peerDependenciesMeta?.[dependency]?.optional;
        const installed = copyDependency(dependency, actual, maySkip);
        if (installed) link(dependency, installed, join(target, "node_modules"));
      }
      return target;
    }
    const direct = { ...json(join(workspace, "packages/ui/package.json")).dependencies, ...registry.devDependencies, vite: json(join(workspace, "node_modules/vite/package.json")).version, typescript: json(join(workspace, "node_modules/typescript/package.json")).version, "@tailwindcss/vite": json(join(workspace, "node_modules/@tailwindcss/vite/package.json")).version, tailwindcss: json(join(workspace, "node_modules/tailwindcss/package.json")).version };
    delete direct["@rain-next/foundations"];
    const versions = {};
    for (const name of Object.keys(direct)) {
      const from = cachedPackage(name, join(workspace, "packages/ui")) ? join(workspace, "packages/ui") : workspace;
      const target = copyDependency(name, from);
      link(name, target);
      versions[name] = json(join(target, "package.json")).version;
    }
    facts.dependencies = dependencyVersions;
    const links = [];
    function checkLinks(directory) {
      for (const entry of readdirSync(directory)) {
        const path = join(directory, entry);
        const stat = lstatSync(path);
        if (stat.isSymbolicLink()) {
          const target = realpathSync(path);
          assert(target.startsWith(`${host}/`), `External symlink: ${path}`);
          links.push({ path: relative(host, path), target: relative(host, target) });
        } else if (stat.isDirectory()) checkLinks(path);
      }
    }
    checkLinks(host);
    facts.internalDependencyLinks = links.length;
    facts.externalDependencyLinks = 0;
    facts.aliases = [];
    put(join(host, "package.json"), JSON.stringify({ name: "rain-chart-variants-isolated-consumer", private: true, type: "module", dependencies: { ...versions, "@rain-next/ui": "0.0.0", "@rain-next/foundations": "0.0.0" } }, null, 2));
    const downloads = await exportedDownloads(join(workspace, "apps/playground/src/docs/components"));
    facts.exporterSha256 = downloads.exporterSha256;
    const capturedSettings = {
      "pie-default": { state: "zero" }, "pie-custom-center": { state: "long" }, "ring-default": { state: "long" },
      "area-loading": { loading: false }, "line-loading": { loading: false },
      "line-trio-brush": { brush: [new Date(2026, 8, 7).toISOString(), new Date(2026, 8, 17).toISOString()] },
    };
    facts.variants = [];
    for (const variant of reference) {
      const settings = capturedSettings[variant.id] ?? {};
      const files = downloads.files(variant, "category-near", 0, 0, true, undefined, settings);
      assertDownloadClosure(files, variant.id);
      for (const [name, source] of Object.entries(files)) put(join(host, "samples", variant.id, name), source);
      put(join(host, `${variant.id}.html`), files["index.html"].replace('src="/main.tsx"', `src="/samples/${variant.id}/main.tsx"`));
      facts.variants.push({ id: variant.id, family: variant.family, parameters: { recipe: "category-near", revision: 0, replay: 0, reduced: true, settings }, files: Object.entries(files).map(([path, content]) => ({ path, sha256: hash(content) })) });
    }
    facts.familyCounts = reference.reduce((counts, row) => ({ ...counts, [row.family]: (counts[row.family] ?? 0) + 1 }), {});
    facts.htmlAdaptation = "Raw index.html is retained per download; batch entries only prefix the main.tsx URL with /samples/<variant-id>/";
    put(join(host, "env.d.ts"), '/// <reference types="vite/client" />\n');
    put(join(host, "tsconfig.json"), JSON.stringify({ compilerOptions: { target: "ES2022", lib: ["ES2022", "DOM", "DOM.Iterable"], module: "ESNext", moduleResolution: "Bundler", jsx: "react-jsx", strict: true, skipLibCheck: true, noEmit: true, allowImportingTsExtensions: true, allowJs: false }, include: ["samples/**/*.tsx", "samples/**/*.ts", "env.d.ts"] }, null, 2));
    put(join(host, "build-check.mjs"), `import { build } from "vite";
import assert from "node:assert/strict";
import { writeFileSync, realpathSync } from "node:fs";
import { isAbsolute } from "node:path";
const host = realpathSync(process.cwd());
await build({ root: host, configFile: false, base: "./", oxc: { jsx: { runtime: "automatic" } }, resolve: { alias: [] }, build: { outDir: "dist", minify: false, rolldownOptions: { input: ${JSON.stringify(reference.map(row => join(host, `${row.id}.html`)))} } }, plugins: [{ name: "isolated-consumption-audit", generateBundle() {
  const modules = [...this.getModuleIds()].filter(id => isAbsolute(id.split("?")[0]));
  for (const id of modules) assert(realpathSync(id.split("?")[0]).startsWith(host + "/"), "Module escaped host: " + id);
  writeFileSync("module-paths.json", JSON.stringify({ moduleCount: modules.length, externalModulePaths: 0, modules }, null, 2));
} }] });\n`);
    function run(label, args) {
      const start = Date.now();
      const result = spawnSync(process.execPath, args, { cwd: host, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, env: { ...process.env, NODE_PATH: "" } });
      put(join(evidence, `${label}.log`), `${result.stdout ?? ""}${result.stderr ?? ""}${result.error ? String(result.error) : ""}`);
      facts.commands.push({ command: process.execPath, args, cwd: host, label, exitCode: result.status, elapsedMs: Date.now() - start });
      assert.equal(result.status, 0, `${label} failed; see ${join(evidence, `${label}.log`)}`);
    }
    console.log(`Prepared isolated ${host}: ${reference.length} downloads, ${dependencyVersions.length} copied cached dependencies.`);
    const compiler = json(join(host, "node_modules/typescript/package.json"));
    run("typecheck", [join(host, "node_modules/typescript", compiler.bin.tsc), "--project", "tsconfig.json"]);
    run("build", [join(host, "build-check.mjs")]);
    const outputs = readdirSync(join(host, "dist")).filter(file => file.endsWith(".html"));
    assert.equal(outputs.length, 170);
    facts.builtEntries = outputs.length;
    facts.moduleAudit = json(join(host, "module-paths.json"));
    const downloaded = new Map(facts.variants.flatMap(row => row.files.filter(file => !["main.tsx", "index.html"].includes(file.path)).map(file => [file.path, file.sha256])));
    facts.canonicalChanges = [
      ...facts.packageManifests.filter(file => hash(readFileSync(join(workspace, file.path))) !== file.canonicalSha256).map(file => file.path),
      ...sourceFiles.filter(file => hash(readFileSync(join(workspace, file.path))) !== file.sha256).map(file => file.path),
      ...[...downloaded].filter(([path, sha256]) => hash(readFileSync(join(workspace, "apps/playground/src/docs/components", path))) !== sha256).map(([path]) => `apps/playground/src/docs/components/${path}`),
    ];
    assert.deepEqual(facts.canonicalChanges, [], "Sources changed during consumption; rerun after the final freeze");
    assert.equal(hash(read(join(workspace, "registry/charts.json"))), facts.registrySha256, "Registry changed during consumption");
    assert.equal(hash(read(join(workspace, "apps/playground/src/docs/components/chart-example-source.tsx"))), facts.exporterSha256, "Download exporter changed during consumption");
    facts.status = "passed";
    facts.limits = ["Copied installed dependency cache; no package manager installation or clean-install claim.", "Full current UI/Foundation package snapshot; minimum per-item Registry installation is verified separately.", "Build/type checking does not prove browser behavior, accessibility, visual acceptance, or publication."];
    console.log(`Passed ${outputs.length} independent card entries across ${Object.keys(facts.familyCounts).length} families; evidence ${evidence}`);
    return { host, evidence };
  } catch (error) {
    facts.status = "failed";
    facts.error = String(error);
    throw error;
  } finally {
    facts.finishedAt = new Date().toISOString();
    put(join(evidence, "facts.json"), JSON.stringify(facts, null, 2));
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) await verifyChartVariants();
