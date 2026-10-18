import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readAssets, exportsOf, packageEntry } from "./asset-index.mjs";
import { buildAssetCatalog } from "./asset-catalog.mjs";

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const json = value => JSON.stringify(value, null, 2) + "\n";
export const starterGuidePaths = Object.freeze({ guide: "docs/ai/starter-assets.generated.md", profiles: "docs/ai/starter-profiles.generated.json" });
export const starterSceneIds = milestone => milestone === "M2" ? ["bm-a", "bm-b", "bm-c", "bm-d"] : ["bm-a", "bm-b"];
export const starterRootGuides = milestone => ["docs/ai/prototype-design.md", "docs/ai/information-design.md", "docs/ai/form-composition.md", "docs/ai/g4-components.md", "docs/ai/g6-components.md", ...(milestone === "M2" ? ["docs/ai/m2-trial-guide.md"] : [])];

function regular(root, file) {
  if (typeof file !== "string" || isAbsolute(file) || /[\\\0\r\n:]/.test(file) || file.split("/").some(x => !x || x === "." || x === "..")) throw new Error(`Unsafe Starter reference: ${file}`);
  const parts = file.split("/");
  for (let i = 1; i <= parts.length; i++) {
    const info = lstatSync(join(root, ...parts.slice(0, i)));
    if (info.isSymbolicLink() || !(i < parts.length ? info.isDirectory() : info.isFile())) throw new Error(`Starter reference is not a regular file: ${file}`);
  }
  return join(root, file);
}
const strings = node => typeof node === "string" ? [node] : Array.isArray(node) ? node.flatMap(strings) : node && typeof node === "object" ? Object.values(node).flatMap(strings) : [];
const runtimeAvailable = (path, scenes) => /^packages\/(?:ui|layouts|foundations)\/src\//.test(path)
  || /^apps\/prototype\/src\/data-table-recipe\./.test(path)
  || scenes.some(scene => path.startsWith(`apps/prototype/src/scenarios/${scene}/`));

/** Required Manifest paths support both links and explicit inline workspace paths. */
export function starterManifestReferences(file, content) {
  const result = new Set();
  for (const match of content.matchAll(/`([^`\n]+)`|\]\(([^)\n]+)\)/g)) {
    const href = (match[1] ?? match[2]).split("#")[0];
    if (!href || /^(?:[a-z]+:|#)/i.test(href) || !/\.(?:yaml|json)$/.test(href)) continue;
    const target = href.startsWith("manifests/") ? href : relative(".", resolve(dirname(file), href));
    if (target.startsWith("manifests/")) result.add(target);
  }
  return [...result].sort();
}

/** This is a projection of readAssets + buildAssetCatalog, not a parallel API inventory. */
export function buildStarterProfile(assets, catalog, { root = workspace, milestone = "M1" } = {}) {
  if (!["M1", "M2"].includes(milestone)) throw new Error("Unsupported Starter profile milestone");
  const scenes = starterSceneIds(milestone), byId = new Map(assets.map(asset => [asset.manifest.id, asset]));
  const normalized = new Map(catalog.assets.map(asset => [asset.id, asset]));
  const selected = new Set(), references = [], referenceKeys = new Set(), exportsCache = new Map(), reasons = new Map();
  const add = (from, target, role, reason, assetId = null) => {
    if (!["required", "optional", "trace"].includes(role)) throw new Error(`Unclassified Starter reference: ${from} -> ${target}`);
    const key = JSON.stringify([from, target, role, reason, assetId]);
    if (referenceKeys.has(key)) return;
    referenceKeys.add(key);
    if (role === "required") {
      try { regular(root, target); } catch (error) { throw new Error(`Starter required reference missing or unsafe: ${from} -> ${target} (${assetId ?? "guide"}); ${error.message}`); }
      if (!reasons.has(target)) reasons.set(target, []);
      reasons.get(target).push({ from, assetId, reason });
    }
    references.push({ from, target, assetId, role, resolution: role === "required" ? "included" : "external-trace", reason });
  };
  const canRecommend = asset => asset.maturity !== "deprecated" && (
    asset.entry.kind === "public-import" || asset.entry.kind === "usage-reference" || runtimeAvailable(asset.sourcePath, scenes));
  for (const asset of catalog.assets) if (canRecommend(asset)) selected.add(asset.id);
  // Only an explicit required context is a documentation dependency. Alternative,
  // presentation and implementation relationships are informative, never recursion.
  for (const id of selected) {
    const asset = normalized.get(id);
    for (const relation of asset.relationships.filter(edge => edge.type === "requiresContext")) {
      const target = normalized.get(relation.targetId);
      if (!target || !canRecommend(target)) throw new Error(`Starter required context is unavailable: ${id} -> ${relation.targetId}`);
      selected.add(target.id);
    }
  }
  const guides = starterRootGuides(milestone);
  const legacyGuides = new Set(guides);
  const currentGuides = ["docs/ai/composition-recipes.md", "docs/ai/consumption-contrast.md", "docs/ai/teaching-reading-recipes.md", "docs/ai/config-example-contracts.md"].filter(file => existsSync(join(root, file)));
  const visitedGuides = new Set();
  for (let i = 0; i < currentGuides.length; i++) {
    const guide = currentGuides[i];
    if (visitedGuides.has(guide)) continue;
    visitedGuides.add(guide); guides.push(guide);
    for (const match of readFileSync(regular(root, guide), "utf8").matchAll(/\]\(([^)\n]+)\)/g)) {
      const href = match[1].split("#")[0];
      if (!href || /^(?:[a-z]+:|#)/i.test(href)) continue;
      const target = relative(root, resolve(root, dirname(guide), href));
      add(guide, target, "required", "Current guide explicitly links this consumption material");
      if (target.endsWith(".md") && !legacyGuides.has(target)) currentGuides.push(target);
    }
  }
  for (const guide of guides) {
    add("profile.rootDocs", guide, "required", "Current consumption or design guide");
    for (const file of starterManifestReferences(guide, readFileSync(regular(root, guide), "utf8"))) {
      const asset = catalog.assets.find(asset => asset.manifestPath === file);
      if (!asset) throw new Error(`Starter guide refers to an unregistered required contract: ${guide} -> ${file}`);
      add(guide, file, "required", "Guide explicitly requires the contract", asset.id);
    }
  }
  const recommendedAssets = [...selected].sort().map(id => {
    const asset = normalized.get(id), raw = byId.get(id);
    if (!raw) throw new Error(`Starter model has no canonical Manifest: ${id}`);
    add(id, asset.manifestPath, "required", "Canonical consumption contract", id);
    if (asset.entry.registryPath) add(id, asset.entry.registryPath, "required", "Actual Registry import and source declaration", id);
    if (asset.entry.kind !== "usage-reference") {
      add(id, asset.sourcePath, "required", "Real implementation supplied in the runtime closure", id);
      const entry = asset.entry.importPath ? packageEntry(root, asset.entry.importPath) : asset.sourcePath;
      if (!exportsCache.has(entry)) exportsCache.set(entry, exportsOf(root, entry));
      for (const name of asset.entry.exportNames) if (!exportsCache.get(entry).has(name)) throw new Error(`Starter recommends a missing or type-only export: ${id}/${name}`);
    } else add(id, asset.sourcePath, "trace", "Usage documentation is not a public component or copied scene", id);
    const styles = [...new Set(raw.registry?.shared?.styleDependencies ?? [])];
    for (const specifier of styles) add(asset.entry.registryPath, packageEntry(root, specifier), "required", `Public style import ${specifier}`);
    for (const path of [raw.manifest.styleSourcePath, raw.item?.license, raw.item?.sourceLock, ...(raw.item?.files ?? [])].filter(Boolean)) add(id, path, "required", "Asset source, style, provenance or license support", id);
    for (const path of [raw.registry?.sourceLock, ...(raw.registry?.shared?.files ?? [])].filter(Boolean)) add(asset.entry.registryPath, path, "required", "Shared Registry source, provenance or license support");
    const readmes = [];
    let folder = dirname(asset.sourcePath);
    while (folder.startsWith("packages/") && folder.includes("/src")) {
      const path = `${folder}/README.md`;
      if (existsSync(join(root, path))) { add(id, path, "required", "Implementation usage guide", id); readmes.push(path); }
      folder = dirname(folder);
    }
    for (const field of ["sourceEvidence", "examples"]) for (const path of strings(raw.manifest[field])) add(asset.manifestPath, path, field === "examples" ? "optional" : "trace", `${field} is contextual; not claimed as executed by this Starter`, id);
    for (const relation of asset.relationships) if (relation.type === "requiresContext") add(id, normalized.get(relation.targetId).manifestPath, "required", relation.condition, relation.targetId);
    return { ...asset, styleImports: styles, readmes, sourceResolution: asset.entry.kind === "usage-reference" ? "external-trace" : "included" };
  });
  const files = [...reasons.keys()].sort();
  const inputs = [...new Set([...assets.flatMap(asset => [asset.manifestPath, asset.registryPath].filter(Boolean)), "config/asset-discovery.yaml", "config/asset-documentation-routes.json", "scripts/asset-starter-guide.mjs", "scripts/asset-catalog.mjs", "scripts/asset-index.mjs"])].sort();
  const inputHashes = Object.fromEntries(inputs.map(file => [file, sha(readFileSync(regular(root, file)))]));
  return { schemaVersion: 1, profileId: `rn14-${milestone.toLowerCase()}`, milestone, sceneIds: scenes, sourceDigest: catalog.sourceDigest,
    policy: { recommended: "real-public-import-or-available-source-copy-or-usage-contract", candidateEligibility: "unchanged-from-canonical-model", localExperiment: "identity-preserved-not-publication", runtime: "complete-foundations-ui-layouts-source", relationshipClosure: "requiresContext-only", acceptance: "scope-specific-not-upgraded" },
    rootDocs: [...new Set(guides)], recommendedAssetIds: [...selected].sort(), recommendedAssets,
    excludedAssets: catalog.assets.filter(asset => !selected.has(asset.id)).map(asset => ({ id: asset.id, reason: "Source-copy scene is outside this profile; use its dedicated owning workspace", assetIdentity: asset.assetIdentity, sourcePath: asset.sourcePath })),
    references, files, reasonsByFile: Object.fromEntries(files.map(file => [file, reasons.get(file)])), inputHashes };
}

export function createStarterProfile(root = workspace, { milestone = "M1" } = {}) {
  const assets = readAssets(root), catalog = buildAssetCatalog(assets, { root, apiTools: { exportsOf, packageEntry } });
  return buildStarterProfile(assets, catalog, { root, milestone });
}
export function validateStarterRequiredFiles(profile, files) {
  const available = new Set(files);
  for (const reference of profile.references) if (reference.role === "required" && !available.has(reference.target)) throw new Error(`Starter required reference missing: ${reference.from} -> ${reference.target} (${reference.assetId ?? "guide"})`);
}
const cell = value => String(value ?? "未登记").replaceAll("|", " / ").replaceAll("\n", " ");
export function renderStarterGuide(profile) {
  return ["# Starter 当前资产与消费入口", "", "由统一 Manifest / Registry / 公共源码 / 唯一文档路由模型生成。按任务检索后，只读取命中资产的合同。此表不是候选资格或发布清单；本地实验保留原身份。完整源码随包提供不表示每项能力已通过人工接受。", "",
    "机器可读的 M1/M2 profile 见 `docs/ai/starter-profiles.generated.json`；当前包实际闭包、required / optional / trace、必要样式、Parts、上下文、状态 owner 和修改边界见 `docs/ai/starter-profile.json`（由导出器生成）。M1 默认 BM-A/B；M2 才附 BM-C/D。原 Playground # 路由仅为来源路由，不是本 Starter 的运行入口。", "",
    "使用真实 entry.kind：public-import 使用表中包入口；source-copy 按其合同使用随包本地文件；usage-reference 仅为组合使用说明，没有可虚构的同名 export。Parts 的成员与 styleParts 分开，后者不能当作 JSX 组件。requiresContext 按条件保留同一 owner；alternativeWhen、wraps 和 sharesPresentation 不表示必须嵌套。", "",
    "| 资产 / 用途 | 真实入口 | 身份 / 候选资格 | 合同 |", "| --- | --- | --- | --- |",
    ...profile.recommendedAssets.map(asset => `| ${cell(asset.name)} · ${cell(asset.description)} | ${cell(asset.entry.kind)} · ${cell(asset.entry.importPath ?? asset.sourcePath)} · ${cell(asset.entry.exportNames.join(", ") || "无独立导出")} | ${cell(asset.assetIdentity)} / ${asset.candidateEligible ? "candidate-eligible" : "not-candidate-eligible"} | [${asset.id}](../../${asset.manifestPath}) |`),
    "", "## 必须保留的消费边界", "", "- UI/Layouts/Foundations 保留真实公开 API 与样式入口；从合同读取必要 Parts 和状态 owner，禁止猜造 export。", "- 页面持有业务值、查询、答案、上传队列和保存策略。使用现有 owner；布局调整不创建第二控制器。", "- package、锁文件、设计方法在 Prototype Mode 中只读；先使用已有 Variant / Parts / Local Recipe，确需共享修复回到 System 任务。", "- 自动检查、Human Gate、对比度与发布分别记录。未附带的原工作区证据和例子标为 trace / optional，不据此声称验证。", ""].join("\n");
}
export function renderStarterGuideOutputs(root = workspace) {
  const assets = readAssets(root), catalog = buildAssetCatalog(assets, { root, apiTools: { exportsOf, packageEntry } });
  const profiles = ["M1", "M2"].map(milestone => buildStarterProfile(assets, catalog, { root, milestone }));
  return { [starterGuidePaths.guide]: renderStarterGuide(profiles[0]), [starterGuidePaths.profiles]: json({ schemaVersion: 1, sourceDigest: catalog.sourceDigest, profiles }) };
}
export function writeStarterGuides(root = workspace) {
  const outputs = renderStarterGuideOutputs(root);
  for (const [file, content] of Object.entries(outputs)) writeFileSync(join(root, file), content);
  return outputs;
}
export function verifyStarterGuides(root = workspace) {
  for (const [file, content] of Object.entries(renderStarterGuideOutputs(root))) if (readFileSync(regular(root, file), "utf8") !== content) throw new Error(`Starter guide is stale: ${file}; regenerate from the asset model`);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === "--write") { writeStarterGuides(); console.log("Generated Starter profiles and guide."); }
  else if (process.argv[2] === "--check") { verifyStarterGuides(); console.log("Starter profiles and guide match the current model."); }
  else throw new Error("Usage: node scripts/asset-starter-guide.mjs --write|--check");
}
