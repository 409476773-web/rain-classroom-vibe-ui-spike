import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = "packages/foundations/src/icons/semantic-rules.json";
const outputPaths = {
  typescript: "packages/foundations/src/icons/semantic-rules.generated.ts",
  markdown: "docs/ai/icon-selection.md",
};
const selectorFields = ["intent", "target", "context"];

function overlaps(left, right) {
  return selectorFields.every((field) =>
    !left[field] || !right[field] || left[field].some((value) => right[field].includes(value)),
  );
}

/** Validate source decisions before either generated consumer can receive them. */
export function validateIconSemantics(data) {
  const errors = [];
  if (data?.schemaVersion !== 1 || !Array.isArray(data.assets) || !Array.isArray(data.rules)) {
    return ["invalid semantic source schema"];
  }
  const assetIds = new Set();
  const nodeIds = new Set();
  const componentKeys = new Set();
  for (const asset of data.assets) {
    if (assetIds.has(asset.assetId)) errors.push(`duplicate asset: ${asset.assetId}`);
    assetIds.add(asset.assetId);
    if (!/^icon\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(asset.assetId)) errors.push(`invalid asset name: ${asset.assetId}`);
    if (asset.name !== asset.assetId || asset.slug !== asset.assetId.slice(5)) errors.push(`asset identity mismatch: ${asset.assetId}`);
    const pascalCase = asset.slug.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join("");
    const expectedExport = /^[0-9]/.test(pascalCase) ? `Icon${pascalCase}` : `${pascalCase}Icon`;
    if (asset.exportName !== expectedExport || asset.importPath !== `@rain-next/ui/icons/${asset.slug}`) errors.push(`invalid import metadata: ${asset.assetId}`);
    if (!["host", "intrinsic"].includes(asset.colorMode)) errors.push(`unknown color mode: ${asset.assetId}`);
    if (asset.source?.fileKey !== data.metadata.figmaFileKey || !/^\d+:\d+$/.test(asset.source?.nodeId) || !/^[a-f0-9]{40}$/.test(asset.source?.componentKey)) errors.push(`invalid source identity: ${asset.assetId}`);
    if (nodeIds.has(asset.source?.nodeId) || componentKeys.has(asset.source?.componentKey)) errors.push(`duplicate source identity: ${asset.assetId}`);
    nodeIds.add(asset.source?.nodeId);
    componentKeys.add(asset.source?.componentKey);
  }
  const ruleIds = new Set();
  const checkAsset = (id, owner) => { if (!assetIds.has(id)) errors.push(`unknown asset ${id} in ${owner}`); };
  for (const rule of data.rules) {
    if (ruleIds.has(rule.id)) errors.push(`duplicate rule: ${rule.id}`);
    ruleIds.add(rule.id);
    checkAsset(rule.assetId, rule.id);
    if (rule.confirmation !== "user-confirmed") errors.push(`unconfirmed rule: ${rule.id}`);
    if (!["default", "scene"].includes(rule.priority)) errors.push(`invalid priority: ${rule.id}`);
    if (!["control", "selection", "status", "information"].includes(rule.hostRole)) errors.push(`invalid host role: ${rule.id}`);
    if ((rule.hostRole === "status") !== (rule.statusRole !== null)) errors.push(`status responsibility mismatch: ${rule.id}`);
    if (!rule.label || !rule.useWhen || !Array.isArray(rule.keywords) || !Array.isArray(rule.doNotUseWhen)) errors.push(`incomplete usage metadata: ${rule.id}`);
    if (!rule.sourceIds?.length || rule.sourceIds.some((id) => !data.metadata.sources[id])) errors.push(`missing decision source: ${rule.id}`);
    if (!Array.isArray(rule.match) || !rule.match.length) errors.push(`missing match: ${rule.id}`);
    for (const pattern of rule.match ?? []) {
      if (!pattern.intent?.length || Object.entries(pattern).some(([key, values]) => !selectorFields.includes(key) || !Array.isArray(values) || !values.length || values.some((value) => typeof value !== "string" || !value))) errors.push(`invalid structured match: ${rule.id}`);
    }
    const variants = new Set();
    for (const variant of rule.variants ?? []) {
      checkAsset(variant.assetId, rule.id);
      if (!["filled", "solid-triangle"].includes(variant.variant) || variants.has(variant.variant) || !variant.condition) errors.push(`invalid variant: ${rule.id}`);
      variants.add(variant.variant);
    }
    for (const correction of data.sourceCorrections ?? []) {
      if (correction.assetIds.includes(rule.assetId) && rule.keywords.includes(correction.originalText)) errors.push(`corrected source text cannot become lookup keyword: ${rule.id}`);
    }
  }
  for (let left = 0; left < data.rules.length; left += 1) {
    for (let right = left + 1; right < data.rules.length; right += 1) {
      const a = data.rules[left];
      const b = data.rules[right];
      if (a.priority === b.priority && a.match?.some((first) => b.match?.some((second) => overlaps(first, second)))) errors.push(`same-priority conflict: ${a.id} / ${b.id}`);
    }
  }
  for (const alternative of data.alternatives ?? []) {
    checkAsset(alternative.assetId, "alternative");
    if (!alternative.condition || !alternative.ruleIds?.length || !alternative.allowedBy?.includes("explicit") || !alternative.allowedBy?.includes("component-spec")) errors.push(`invalid alternative condition: ${alternative.assetId}`);
    for (const id of alternative.ruleIds ?? []) if (!ruleIds.has(id)) errors.push(`unknown alternative rule: ${id}`);
  }
  return errors;
}

function cell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

export function buildSemanticArtifacts(data) {
  const errors = validateIconSemantics(data);
  if (errors.length) throw new Error(errors.join("\n"));
  const json = JSON.stringify(data, null, 2);
  const hash = createHash("sha256").update(`${json}\n`).digest("hex");
  const typescript = `// Generated by scripts/generate-icon-semantics.mjs. Do not edit.\n// Source: ${sourcePath}\n// Canonical JSON SHA-256: ${hash}\nimport type { IconSemanticRuleSet } from "./icon-contract";\n\nexport const semanticRuleSet = ${json} as const satisfies IconSemanticRuleSet;\n\nexport const semanticRules = semanticRuleSet.rules;\nexport const semanticAssets = semanticRuleSet.assets;\n`;
  const assets = new Map(data.assets.map((asset) => [asset.assetId, asset]));
  const lines = [
    `# ${data.metadata.title}`, "",
    `<!-- Generated from ${sourcePath}; canonical JSON SHA-256 ${hash}. Do not edit. -->`, "",
    data.metadata.scope, "",
    "本文件提供语义选择与静态引用形式；实际可导入性以生成入口及可用目录为准，不表示 Human Gate 或发布已完成。", "",
    "## 使用顺序与边界", "",
    ...data.guidance.map((item, index) => `${index + 1}. ${item}`), "",
    "## 结构化选择合同", "",
    "`resolveSemanticIcon(request, options?)` 接收结构化的 `intent`、`target`、`context`；匹配值见下表，不读取中文按钮文案。", "",
    "明确资产使用 `explicitAssetId`，明确样式使用 `explicitVariant`。组件备选需要 `component` 与 `confirmedComponentSpec: { component, assetId, confirmed: true, source }`，其中组件名称必须一致且来源可追溯。", "",
    "`options.availableAssets` 可传数组或 Set；省略时结果只代表语义选定，可用性为 `not-checked`。该列表不证明目录外资产的颜色模式。", "",
    "结果为 `selected`、`ambiguous`、`unknown` 或 `unavailable`；冲突与缺少上下文不会静默选第一个候选。", "",
    "## 已确认场景", "",
    "| 规则 | 结构化匹配（分号表示或） | 默认资产 | 优先级 | 颜色责任 |", "|---|---|---|---|---|",
    ...data.rules.map((rule) => `| ${cell(rule.label)} | ${cell(rule.match.map((pattern) => JSON.stringify(pattern)).join("; "))} | \`${rule.assetId}\` | ${rule.priority} | ${rule.hostRole}${rule.statusRole ? ` / ${rule.statusRole}` : ""} |`), "",
    ...data.rules.flatMap((rule) => {
      const asset = assets.get(rule.assetId);
      return [`### ${rule.label} · ${rule.id}`, "", rule.useWhen, "", `查询关键词：${rule.keywords.join("、")}。`, "",
        ...rule.doNotUseWhen.map((item) => `- ${item}`), "",
        ...rule.variants.map((variant) => `- 明确 ${variant.variant}：\`${variant.assetId}\`。${variant.condition}`), "",
        `静态引用：\`import { ${asset.exportName} } from "${asset.importPath}";\``, ""];
    }),
    "## 已确认备选", "",
    ...data.alternatives.map((alternative) => `- \`${alternative.assetId}\`（${alternative.label}）：${alternative.condition}`), "",
    "## 行为示例与反例", "",
    "| 场景 | 结构化请求 | 预期 |", "|---|---|---|",
    ...data.examples.map((example) => `| ${cell(example.label)} | \`${cell(JSON.stringify(example.request))}\` | \`${cell(JSON.stringify(example.expected))}\` |`), "",
    "## 来源与文字修正", "",
    ...Object.values(data.metadata.sources).map((source) => source.url ? `- [${source.label}](${source.url})` : `- ${source.label}：\`${source.path}\``), "",
    ...data.sourceCorrections.map((correction) => `- ${correction.assetIds.join(" / ")}：原文“${correction.originalText}”按用户确认整理为“${correction.confirmedText}”；这是语义记录，Figma 写入状态为 ${correction.figmaWrite}。`), "",
    `## ${data.assets.length} 项讨论资产的身份与引用`, "",
    "| 正式身份 | 主组件 ID | Component Key | 静态入口 | 导出名 |", "|---|---|---|---|---|",
    ...data.assets.map((asset) => `| \`${asset.assetId}\` | ${asset.source.nodeId} | ${asset.source.componentKey} | \`${asset.importPath}\` | \`${asset.exportName}\` |`), "",
  ];
  return { typescript, markdown: lines.join("\n") };
}

export function generateIconSemantics({ root = rootDirectory, check = false } = {}) {
  const source = JSON.parse(readFileSync(resolve(root, sourcePath), "utf8"));
  const artifacts = buildSemanticArtifacts(source);
  const stale = [];
  for (const [kind, relativePath] of Object.entries(outputPaths)) {
    const destination = resolve(root, relativePath);
    if (check) {
      let current;
      try { current = readFileSync(destination, "utf8"); } catch { current = undefined; }
      if (current !== artifacts[kind]) stale.push(relativePath);
    } else {
      mkdirSync(dirname(destination), { recursive: true });
      writeFileSync(destination, artifacts[kind]);
    }
  }
  if (stale.length) throw new Error(`Stale semantic artifacts:\n${stale.join("\n")}`);
  return { assetCount: source.assets.length, ruleCount: source.rules.length, outputs: Object.values(outputPaths) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = generateIconSemantics({ check: process.argv.includes("--check") });
    process.stdout.write(`Icon semantics: ${result.ruleCount} rules, ${result.assetCount} discussion assets; ${process.argv.includes("--check") ? "generated files current" : "generated files written"}.\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
