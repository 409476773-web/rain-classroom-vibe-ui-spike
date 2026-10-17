import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { readAssets, renderAssetIndex, verifyAssetIndex } from "../../../../scripts/asset-index.mjs";
import { parseYamlSubset } from "../../../../scripts/verification-helpers.mjs";

const current = fileURLToPath(new URL("../../../../", import.meta.url));
const predecessor = fileURLToPath(new URL("before/", import.meta.url));
const cases = [
  ["可移除标签", "Tag", "tag"],
  ["可选标签", "CheckableTag", "checkable-tag"],
  ["链接标签", "LinkTag", "link-tag"],
  ["难度等级", "DifficultyTag", "difficulty-tag"],
  ["分组方式", "GroupTypeTag", "group-type-tag"],
  ["学习单元提醒", "LearningUnitReminderMark", "learning-unit-reminder-mark"],
  ["学习单元类型", "LearningUnitTag", "learning-unit-tag"],
  ["计分任务", "ScoredTaskTypeMark", "scored-task-type-mark"],
  ["教学任务状态", "StatusTag", "status-tag"],
  ["系统处理状态", "SystemStatusTag", "system-status-tag"],
];
const after = readAssets(current);
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const queries = cases.map(([query, name, slug]) => {
  const asset = after.find(asset => asset.manifest.id === `ui-${slug}`);
  const path = `manifests/ui/${slug}.yaml`;
  const previous = parseYamlSubset(readFileSync(join(predecessor, path), "utf8"));
  const next = asset.manifest;
  const originalFields = { ...next };
  delete originalFields.useWhen;
  delete originalFields.doNotUseWhen;
  if (!Object.hasOwn(previous, "description")) delete originalFields.description;
  assert.deepEqual(originalFields, previous, `${slug}: an existing contract field changed`);
  const beforeFound = renderAssetIndex([{ ...asset, manifest: previous }], query).includes(`**${name}**`);
  const afterFound = renderAssetIndex([asset], query).includes(`**${name}**`);
  assert.equal(beforeFound, false, `${slug}: preceding missing query was not reproduced`);
  assert.equal(afterFound, true, `${slug}: purpose query still does not find the asset`);
  return { query, asset: name, beforeFound, afterFound, path,
    beforeSha256: sha(readFileSync(join(predecessor, path))),
    afterSha256: sha(readFileSync(join(current, path))),
    existingFieldsUnchanged: true };
});
verifyAssetIndex(current);
const result = {
  kind: "TagPurposeMetadataVerification",
  date: "2026-10-17", timezone: "Asia/Shanghai",
  scope: "3 added descriptions and 10 useWhen/doNotUseWhen entries; no runtime/API or existing lifecycle field changes",
  predecessor: "before/manifests/ui (10 exact read-only card-v2 contract copies)",
  queriesScope: "each target asset independently, using its exact before and after Manifest and existing Registry entry",
  currentAssetsValidated: after.length,
  queries,
  generatedIndex: { path: "docs/ai/asset-index.md", sha256: sha(readFileSync(join(current, "docs/ai/asset-index.md"))), check: "passed" },
  result: "passed",
};
writeFileSync(new URL("query-results.json", import.meta.url), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
