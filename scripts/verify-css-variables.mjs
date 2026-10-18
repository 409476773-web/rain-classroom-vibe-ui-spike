import { readFileSync, readdirSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { parseSync } from "vite";
import { pathToFileURL } from "node:url";

const sourceRoots = ["packages/foundations/src", "packages/ui/src", "packages/layouts/src", "apps/playground/src", "apps/prototype/src"];

// These four names are written by trackViewport, not by a CSS declaration.
// The exact producer is checked below; no prefix-wide runtime exemption is used.
const viewportProducer = "packages/ui/src/dialog/dialog.tsx";
const viewportVariables = ["width", "height", "left", "top"].map(key => `--rain-dialog-viewport-${key}`);

// Only these existing, finite token-contract consumers construct Rain names.
// verify:tokens checks their generated definitions; contract tests check size/type domains.
const templateConsumers = new Map([
  ["packages/foundations/src/button-token-contract.ts", ["--rain-button-${name}"]],
  ["packages/foundations/src/select-token-contract.ts", ["--rain-input-height-${size}"]],
  ["packages/foundations/src/typography-contract.ts", ["--rain-font-${value.fontRole}", "--rain-font-size-${value.fontSize}", "--rain-line-height-${value.lineHeight}", '--rain-font-numeric-${value.numeric === "normal" ? "normal" : "data"}', "--rain-font-size-${key}", "--rain-line-height-${key}"]],
  ["packages/ui/src/tabs/tabs.tsx", ["--rain-tabs-height-two-line-${size}", "--rain-tabs-height-${size}", "--rain-font-size-${geometry.fontSize}", "--rain-line-height-${geometry.lineHeight}", "--rain-font-size-${geometry.countFontSize}", "--rain-line-height-${geometry.countLineHeight}"]],
]);

// Finite optional host overrides already implemented with literal fallbacks. The producer
// may be absent when that composition is not mounted; this is recorded, not proof of scope.
const optionalHostOverrides = new Map([
  ["packages/ui/src/tree/tree.tsx", new Map([
    ["--rain-tree-row-inset, 8px", "apps/playground/src/recipes/navigation-v042/r1-r3.css"],
    ["--rain-tree-row-indent, 24px", "apps/playground/src/recipes/navigation-v042/r1-r3.css"],
  ])],
  ["packages/ui/src/navigation/navigation.css", new Map([
    ["--rain-local-cs-safe-inset, 24px", "packages/layouts/src/connected-surface.tsx"],
    ["--rain-local-cs-tab-radius, 10px", "packages/layouts/src/connected-surface.tsx"],
  ])],
]);

const componentScopeProducers = new Map([
  ["packages/ui/src/tree/tree.css", new Map([
    ["--rain-tree-rich-spacing", { file: "packages/ui/src/tree/tree.tsx", scope: ".rain-tree[data-variant=rich]" }],
    ["--rain-tree-anchor", { file: "packages/ui/src/tree/tree.tsx", scope: ".rain-tree-node" }],
  ])],
]);

function readSources(root) {
  const sources = new Map();
  function walk(directory) {
    for (const entry of readdirSync(join(root, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (/\.(?:css|[cm]?[jt]sx?)$/.test(path) && !/\.(?:test|spec)\.|\.d\.ts$/.test(path)) sources.set(path, readFileSync(join(root, path), "utf8"));
    }
  }
  for (const directory of sourceRoots) walk(directory);
  return sources;
}

function withoutComments(file, source) {
  if (file.endsWith(".css")) return source.replace(/\/\*[\s\S]*?\*\//g, match => match.replace(/[^\n]/g, " "));
  const parsed = parseSync(file, source);
  if (parsed.errors.length) throw new Error(`${file}: cannot parse CSS consumption source: ${parsed.errors.map(error => error.message).join("; ")}`);
  const ranges = parsed.comments.map(comment => [comment.start, comment.end]);
  for (const [start, end] of ranges.reverse()) source = source.slice(0, start) + source.slice(start, end).replace(/[^\n]/g, " ") + source.slice(end);
  return source;
}

function imports(file, source) {
  if (file.endsWith(".css")) return [...source.matchAll(/@import\s+(?:url\(\s*)?["']([^"']+)["']/g)].map(match => ({ specifier: match[1], lazy: false }));
  const found = [], tree = parseSync(file, source).program;
  function visit(node) {
    if (!node || typeof node !== "object") return;
    if (["ImportDeclaration", "ExportNamedDeclaration", "ExportAllDeclaration"].includes(node.type) && node.importKind !== "type" && node.exportKind !== "type" && node.source?.value) found.push({ specifier: node.source.value, lazy: false });
    if (node.type === "ImportExpression") found.push({ specifier: node.source?.type === "Literal" && typeof node.source.value === "string" ? node.source.value : null, lazy: true });
    for (const [key, child] of Object.entries(node)) if (key !== "parent") {
      if (Array.isArray(child)) child.forEach(visit);
      else if (child && typeof child === "object") visit(child);
    }
  }
  visit(tree); return found;
}

function dependencyGraph(sources, packageExports) {
  const graph = new Map();
  for (const [file, source] of sources) graph.set(file, imports(file, source).map(dependency => {
    const { specifier } = dependency;
    if (!specifier) return { ...dependency, target: null, kind: "dynamic" };
    const local = specifier.startsWith("."), internal = specifier.startsWith("@rain-next/");
    const base = local ? posix.normalize(posix.join(posix.dirname(file), specifier)) : packageExports.get(specifier);
    const target = base && [base, ...[".ts", ".tsx", ".js", ".jsx", ".css", "/index.ts", "/index.tsx"].map(extension => base + extension)].find(path => sources.has(path));
    const asset = /\.(?:json|geojson|svg|png|jpe?g|webp|woff2?)(?:\?.*)?$/.test(specifier) || /\?(?:raw|url)(?:&|$)/.test(specifier);
    return { ...dependency, target: target || null, kind: target ? "source" : asset ? "asset" : local || internal ? "unresolved" : "external" };
  }));
  return graph;
}

function reachable(graph, roots, includeLazy) {
  const visited = new Set();
  function visit(file) {
    if (visited.has(file)) return;
    visited.add(file);
    for (const dependency of graph.get(file) ?? []) if (dependency.target && (includeLazy || !dependency.lazy)) visit(dependency.target);
  }
  roots.forEach(visit); return visited;
}

/** Checks name existence and potential entry dependency reachability, never rendered scope/cascade.
 * @param {Map<string, string>} sources
 * @param {{entrypoints?: Array<{name: string, files: string[]}>, packageExports?: Map<string, string>}} [options]
 */
export function checkCssVariables(sources, { entrypoints = [], packageExports = new Map() } = {}) {
  const definitions = new Map(), failures = [], dynamicSources = [], pendingReview = [], externalReferences = [];
  const cleaned = new Map([...sources].map(([file, source]) => [file, withoutComments(file, source)]));
  function define(variable, file) {
    if (!definitions.has(variable)) definitions.set(variable, new Set());
    definitions.get(variable).add(file);
  }
  for (const [file, source] of cleaned) {
    for (const match of source.matchAll(/(--[\w-]+)["'`]?\s*:/g)) define(match[1], file);
    for (const match of source.matchAll(/\.setProperty\(\s*["'](--[\w-]+)["']/g)) define(match[1], file);
  }
  const producer = cleaned.get(viewportProducer) ?? "";
  if (/\.setProperty\(`--rain-dialog-viewport-\$\{key\}`/.test(producer)
    && /Object\.entries\(\{ width: viewport\.width, height: viewport\.height, left: viewport\.offsetLeft, top: viewport\.offsetTop \}\)/.test(producer)) {
    viewportVariables.forEach(name => define(name, viewportProducer));
    dynamicSources.push({ file: viewportProducer, variables: viewportVariables, reason: "trackViewport writes native visualViewport geometry with CSS fallbacks; actual execution/element scope needs runtime checks." });
  }
  const referencesByFile = new Map(); let references = 0;
  for (const [file, source] of cleaned) {
    const rainReferences = []; referencesByFile.set(file, rainReferences);
    for (const match of source.matchAll(/(?=var\(\s*(--[^)]*)\))/g)) {
      const expression = match[1].trim(), line = source.slice(0, match.index).split("\n").length;
      const variable = expression.split(",", 1)[0].trim(), fallback = expression.includes(",");
      if (!variable.startsWith("--rain-")) {
        const external = { file, line, variable, fallback, definitions: [...(definitions.get(variable) ?? [])] };
        externalReferences.push(external);
        if (!definitions.has(variable)) pendingReview.push({ ...external, reason: fallback ? "external producer unverified; fallback permits calculation but does not prove the intended value" : "external producer and element scope require review" });
        continue;
      }
      references++;
      if (expression.includes("${")) {
        if (templateConsumers.get(file)?.includes(expression)) dynamicSources.push({ file, line, expression, reason: "Finite contract-derived name; generated definitions checked by verify:tokens and token-contract tests." });
        else failures.push(`${file}:${line}: unregistered dynamic Rain variable ${expression}`);
      } else {
        rainReferences.push({ file, line, variable, expression, fallback });
        if (!definitions.has(variable)) failures.push(`${file}:${line}: undefined ${variable}`);
      }
    }
  }
  const graph = dependencyGraph(cleaned, packageExports), entryResults = [], reachedSources = new Set();
  for (const entry of entrypoints) {
    const all = reachable(graph, entry.files, true), eager = reachable(graph, entry.files, false);
    let checkedReferences = 0;
    for (const file of all) {
      reachedSources.add(file);
      if (!sources.has(file)) { failures.push(`${entry.name}: missing entry ${file}`); continue; }
      for (const dependency of graph.get(file)) {
        if (dependency.kind === "unresolved") failures.push(`${file}: unresolved local dependency ${dependency.specifier} in entry ${entry.name}`);
        if (dependency.kind === "dynamic") pendingReview.push({ file, entry: entry.name, reason: "nonliteral dynamic import cannot be resolved statically" });
      }
      for (const reference of referencesByFile.get(file) ?? []) {
        checkedReferences++;
        const producers = definitions.get(reference.variable);
        if (!producers) continue; // Already a name-existence failure above.
        const scopedProducer = componentScopeProducers.get(file)?.get(reference.variable);
        const optionalProducer = optionalHostOverrides.get(file)?.get(reference.expression);
        if (scopedProducer && producers.has(scopedProducer.file)) {
          pendingReview.push({ ...reference, entry: entry.name, producer: scopedProducer.file, scope: scopedProducer.scope, reason: "registered component-local inline producer; stylesheet may load before the component, mounted scope requires runtime verification" });
        } else if (optionalProducer && producers.has(optionalProducer)) {
          pendingReview.push({ ...reference, entry: entry.name, producer: optionalProducer, reason: "registered optional host override with exact literal fallback; mounted scope/host value requires runtime verification" });
        } else if (![...producers].some(path => all.has(path))) failures.push(`${file}:${reference.line}: not reachable from entry ${entry.name}: ${reference.variable}; definitions: ${[...producers].join(", ")}`);
        else if (![...producers].some(path => eager.has(path) || reachable(graph, [file], false).has(path))) pendingReview.push({ ...reference, entry: entry.name, reason: "definition is only in a sibling lazy dependency; loading/order is not proven" });
      }
    }
    entryResults.push({ name: entry.name, roots: entry.files, files: all.size, eagerFiles: eager.size, references: checkedReferences });
  }
  return { files: sources.size, references, definitions: [...definitions.keys()].filter(name => name.startsWith("--rain-")).length, dynamicSources, failures: [...new Set(failures)], entrypoints: entryResults, unreachedSources: [...referencesByFile].filter(([file, references]) => references.length && !reachedSources.has(file)).map(([file]) => file), externalReferences, pendingReview, limitations: [
    "Static entry reachability does not prove rendered element scope, CSS cascade, theme, runtime writer execution or color contrast.",
    "Literal lazy imports are potential dependencies only; dynamic names and nonliteral imports require their recorded contract/runtime checks.",
    "Non-Rain custom properties are inventoried separately, not silently accepted as verified third-party behavior; external packages are not scanned.",
  ] };
}

export function verifyCssVariables({ root = process.cwd() } = {}) {
  const sources = readSources(root), packageExports = new Map(), entrypoints = [];
  for (const name of ["foundations", "ui", "layouts"]) {
    const folder = `packages/${name}`, manifest = JSON.parse(readFileSync(join(root, folder, "package.json"), "utf8"));
    for (const [specifier, target] of Object.entries(manifest.exports)) if (typeof target === "string") packageExports.set(manifest.name + (specifier === "." ? "" : specifier.slice(1)), posix.normalize(`${folder}/${target}`));
  }
  // Explicit documented public consumption bundle. These files must be imported by a host;
  // this is a declared bundle check, not proof that an arbitrary consuming app imports it.
  const foundationStyles = ["tokens.css", "typography.css", "motion.css", "focus.css"].map(name => packageExports.get(`@rain-next/foundations/${name}`));
  for (const name of ["foundations", "ui", "layouts"]) entrypoints.push({ name: `public-${name}-declared-bundle`, files: [packageExports.get(`@rain-next/${name}`), ...foundationStyles, ...(name === "foundations" ? [] : [packageExports.get(`@rain-next/${name}/styles.css`), ...(name === "layouts" ? [packageExports.get("@rain-next/ui/styles.css")] : [])])] });
  for (const app of ["apps/playground", "apps/prototype"]) for (const filename of readdirSync(join(root, app)).filter(name => name.endsWith(".html"))) {
    const html = readFileSync(join(root, app, filename), "utf8");
    const files = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/g)].map(match => posix.normalize(`${app}/${match[1].replace(/^\//, "")}`)).filter(file => sources.has(file));
    if (files.length) entrypoints.push({ name: `${app}/${filename}`, files });
  }
  return checkCssVariables(sources, { entrypoints, packageExports });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = verifyCssVariables();
  if (process.argv.includes("--json")) console.log(JSON.stringify(result, null, 2));
  else if (result.failures.length) console.error(result.failures.join("\n"));
  else console.log(`CSS variable name/reachability checks passed: ${result.references} Rain references in ${result.files} files across ${result.entrypoints.length} declared entries. ${result.pendingReview.length} scope/loading/external items require review; cascade, runtime loading and contrast are not verified.`);
  if (result.failures.length) process.exitCode = 1;
}
