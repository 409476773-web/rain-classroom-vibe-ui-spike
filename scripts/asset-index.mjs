import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseSync } from "vite";
import { parseYamlSubset } from "./verification-helpers.mjs";

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const indexPath = "docs/ai/asset-index.md";
const json = (root, path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const names = (item) => item.exportNames ?? [item.exportName];

function requireFile(root, path) {
  if (typeof path !== "string") throw new Error("Missing asset reference");
  const local = relative(root, resolve(root, path));
  if (isAbsolute(path) || local === ".." || local.startsWith("../") || !existsSync(resolve(root, path))) {
    throw new Error(`Invalid asset reference: ${path}`);
  }
  return resolve(root, path);
}

function packageEntry(root, specifier) {
  if (typeof specifier !== "string" || !specifier.startsWith("@rain-next/")) throw new Error(`Unknown package: ${specifier}`);
  const [, name, ...subpath] = specifier.split("/");
  const pkg = json(root, `packages/${name}/package.json`);
  if (pkg.name !== `@rain-next/${name}`) throw new Error(`Unknown package: ${specifier}`);
  const entry = pkg.exports[subpath.length ? `./${subpath.join("/")}` : "."];
  if (typeof entry !== "string") throw new Error(`Unexported package entry: ${specifier}`);
  return relative(root, requireFile(root, `packages/${name}/${entry}`));
}

function exportsOf(root, path, visited = new Set()) {
  if (visited.has(path)) return new Set();
  visited.add(path);
  const source = parseSync(path, readFileSync(requireFile(root, path), "utf8"));
  if (source.errors.length) throw new Error(`Cannot parse asset exports: ${path}`);
  const result = new Set();
  for (const node of source.program.body) {
    if (node.type === "ExportAllDeclaration" && node.exportKind !== "type" && !node.exported && node.source.value.startsWith(".")) {
      const target = relative(root, resolve(root, dirname(path), node.source.value));
      const file = [target, `${target}.ts`, `${target}.tsx`].find(candidate => existsSync(resolve(root, candidate)));
      if (!file) throw new Error(`Unresolved asset export: ${path}/${node.source.value}`);
      for (const name of exportsOf(root, file, visited)) result.add(name);
      continue;
    }
    if (node.type !== "ExportNamedDeclaration" || node.exportKind === "type") continue;
    for (const item of node.specifiers) if (item.exportKind !== "type") result.add(item.exported.name);
    if (node.declaration?.type === "VariableDeclaration") {
      for (const declaration of node.declaration.declarations) if (declaration.id.type === "Identifier") result.add(declaration.id.name);
    } else if (node.declaration?.id) result.add(node.declaration.id.name);
  }
  return result;
}

export function validateAsset(asset, root = workspace) {
  const { manifest, item, registry } = asset;
  requireFile(root, manifest.sourcePath);
  if (!item) {
    if (manifest.assetIdentity !== "local-experiment") throw new Error(`Missing Registry: ${manifest.id}`);
    return;
  }
  const files = [...(registry.shared?.files ?? []), ...(item.files ?? [])];
  if (!files.includes(manifest.sourcePath)) throw new Error(`Registry omits source: ${manifest.id}`);
  for (const path of [...files, ...(registry.shared?.componentDependencies ?? [])]) requireFile(root, path);
  for (const dependency of [...(registry.shared?.registryDependencies ?? []), ...(item.registryDependencies ?? []), ...(item.typeDependencies ?? [])]) {
    if (dependency.startsWith("registry/")) {
      const [path, name] = dependency.split("#");
      requireFile(root, path);
      if (name && !json(root, path).items.some((entry) => entry.name === name)) throw new Error(`Unknown Registry dependency: ${dependency}`);
    }
    else {
      // Existing local Registries use icon slugs; resolve only against Rain's icon ledger.
      const icon = json(root, "registry/icons.json").items.find(({ name }) => name === dependency);
      if (!icon) throw new Error(`Unknown Rain icon dependency: ${dependency}`);
      for (const path of icon.files) requireFile(root, path);
      packageEntry(root, icon.importPath);
    }
  }
  for (const specifier of registry.shared?.styleDependencies ?? []) packageEntry(root, specifier);
  for (const path of [item.sourceLock, item.license, registry.sourceLock].filter(Boolean)) requireFile(root, path);
  const sourceExports = exportsOf(root, manifest.sourcePath);
  const entryExports = item.importPath ? exportsOf(root, packageEntry(root, item.importPath)) : sourceExports;
  for (const name of names(item)) {
    if (!sourceExports.has(name) || !entryExports.has(name)) throw new Error(`Unexported asset: ${manifest.id}/${name}`);
  }
  const evidence = manifest.verification?.evidence ?? manifest.verificationEvidence;
  if (evidence) requireFile(root, evidence);
}

export function readAssets(root = workspace) {
  const registered = new Map();
  for (const file of readdirSync(resolve(root, "registry")).filter((name) => name.endsWith(".json")).sort()) {
    const registryPath = `registry/${file}`;
    const registry = json(root, registryPath);
    for (const item of registry.items ?? []) {
      // Icons already have a generated catalog and a dedicated selection contract.
      if (!item.manifest) {
        if (file !== "icons.json") throw new Error(`Missing Manifest: ${registryPath}/${item.name}`);
        continue;
      }
      requireFile(root, item.manifest);
      const prior = registered.get(item.manifest);
      if (prior) {
        if (prior.registryPath !== registryPath || prior.item.importPath !== item.importPath || names(item).some((name) => names(prior.item).includes(name))) {
          throw new Error(`Duplicate Registry item: ${item.manifest}`);
        }
        prior.item = { ...prior.item, exportNames: [...names(prior.item), ...names(item)], files: [...new Set([...prior.item.files, ...item.files])] };
      } else registered.set(item.manifest, { registryPath, registry, item });
    }
  }
  const assets = [];
  const ids = new Set();
  for (const category of ["patterns", "recipes", "layouts", "ui"]) {
    for (const file of readdirSync(resolve(root, `manifests/${category}`)).filter((name) => name.endsWith(".yaml")).sort()) {
      const manifestPath = `manifests/${category}/${file}`;
      const manifest = parseYamlSubset(readFileSync(resolve(root, manifestPath), "utf8"));
      if (ids.has(manifest.id)) throw new Error(`Duplicate asset ID: ${manifest.id}`);
      ids.add(manifest.id);
      const asset = { manifestPath, manifest, ...registered.get(manifestPath) };
      validateAsset(asset, root);
      assets.push(asset);
      registered.delete(manifestPath);
    }
  }
  if (registered.size) throw new Error(`Unindexed Manifests: ${[...registered.keys()].join(", ")}`);
  const covered = new Set(assets.flatMap(({ item }) => item ? names(item) : []));
  for (const path of ["packages/ui/src/index.ts", "packages/layouts/src/index.ts"]) {
    for (const name of exportsOf(root, path)) {
      if (/^[A-Z]/.test(name) && !covered.has(name)) throw new Error(`Public component missing Registry: ${name}`);
    }
  }
  return assets;
}

export function renderAssetIndex(assets, query = "") {
  const text = (value) => String(value ?? "not-recorded").replaceAll("|", " / ").replaceAll("\n", " ");
  const link = (label, path) => `[${label}](../../${path})`;
  const rows = [];
  for (const { manifest: m, manifestPath, registryPath, item } of assets) {
    const automated = m.verification?.automated ?? m.automatedVerification;
    if (!["registry-candidate", "system-approved"].includes(m.assetIdentity) || ["local-experiment", "deprecated"].includes(m.maturity) || !["passed", "scoped-passed"].includes(automated)) continue;
    if (query && ![m.id, m.name, m.description, ...(m.useWhen ?? []), ...names(item)].join(" ").toLowerCase().includes(query.toLowerCase())) continue;
    const gate = m.verification?.humanGate ?? m.humanGate ?? "not-recorded";
    const contrast = m.verification?.contrastAcceptance ?? m.contrastAcceptance ?? "not-recorded";
    rows.push(`| **${m.name}** | ${text(m.description)} | ${names(item).join(", ")} · ${item.importPath ? `\`${item.importPath}\`` : "复制源码"} · ${link("源码", m.sourcePath)} | ${link("合同", manifestPath)} · ${link("依赖", registryPath)} | ${m.assetIdentity} / ${m.maturity} | ${automated} / ${gate} / ${contrast} / ${m.publication ?? "not-recorded"} |`);
  }
  return [
    "# Rain 资产检索索引",
    "",
    "由 `scripts/asset-index.mjs --write` 从实际 Manifest / Registry 生成；勿手改。日常入口见 [按需使用](README.md)。",
    "",
    "只收录有 passed 或 scoped-passed 自动验证登记的非本地实验资产；scoped-passed 仅表示合同所列专项检查通过，不表示全库校验通过。这是当前工作区的候选检索，不是在线安装清单。验证时间、限定范围、子项验收与已知问题须打开对应合同和证据；not-recorded 表示未登记，不能视作通过。",
    "",
    "按用途关键词（如内容分区、单选、筛选、搜索）检索候选，再查看合同；关键词命中不代表适合当前任务。基础能力按需查 [Token](token-selection.md)、[图标](icon-selection.md)。本地场景与设计限制见 [使用入口](README.md)。",
    "",
    "| 资产 | 用途 | 导出与入口 | 精确登记 | 身份 / 成熟度 | 自动验证 / Human Gate / 对比度接受 / 发布 |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows,
    ...(rows.length ? [] : ["", "未找到符合条件的资产。"]),
    "",
    "状态分别取自 Manifest，不把整体 Gate 与局部视觉接受合并。颜色不足、真实 IME/读屏/触屏和独立消费限制见 [已知限制](README.md#已知限制)。",
    "",
  ].join("\n");
}

export function verifyAssetIndex(root = workspace) {
  const expected = renderAssetIndex(readAssets(root));
  if (readFileSync(requireFile(root, indexPath), "utf8") !== expected) throw new Error("Asset index is stale; run node scripts/asset-index.mjs --write");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [command, query] = process.argv.slice(2);
  if (command === "--write") {
    writeFileSync(resolve(workspace, indexPath), renderAssetIndex(readAssets()));
    console.log(`Generated ${indexPath}`);
  } else if (command === "--check") {
    verifyAssetIndex();
    console.log("Asset index references, exports and generated content verified.");
  } else if (command === "--find" && query) {
    console.log(renderAssetIndex(readAssets(), query));
  } else {
    throw new Error("Usage: node scripts/asset-index.mjs --write | --check | --find <keyword>");
  }
}
