# Tag 中文用途检索补齐

2026-10-17 · GitHub 送审副本的最小合同补齐。

Tag、CheckableTag、LinkTag 原合同没有用途描述；十份 Tag 家族合同缺少 useWhen / doNotUseWhen。既有索引按 id、name、description、useWhen 与导出名称检索，因此十个中文用途查询均不能命中对应资产。

本轮只新增三份 description、十份 useWhen / doNotUseWhen，共 49 行合同文字，并通过既有生成器更新 `docs/ai/asset-index.md` 的三条用途描述。组件源码、API、已登记状态、成熟度、对比度与人工验收字段全部保留。

## 当前证据

- [用途查询结果](query-results.json)：十个中文用途查询由 false 变为 true；逐份核对旧合同已有字段完全相同，并记录前后 SHA-256。
- [旧合同精确副本](before/manifests/ui/tag.yaml)：其余九份位于相同目录。只读复制自封存 card-v2；未改写历史合同或证明。
- `node scripts/asset-index.mjs --write` 完成生成；`node scripts/asset-index.mjs --check` 检查通过。
- `git diff --check` 检查本轮十一份当前源文件通过。
- [后继链整合前的既有测试](before-successor-tests.log)：`scripts/asset-index.test.ts` 为 2 项通过、2 项失败；两项失败均为旧 Closeout 精确保留源检测发现 `checkable-tag.yaml` 摘要变化。保留断言及失败输出，待新的授权后继链接入后复测，不重签旧证明。
- 新有限后继接入后重跑同一既有测试：4 项全部通过，0 项失败或跳过，见[完整日志](asset-index-tests.log)与[结果 JSON](asset-index-tests.json)。随后十项用途查询与索引检查再次通过，见[执行输出](query-run.log)。历史失败日志保留。
- 最终 25 源后继的第二轮完整单测结束后，十项用途查询、已有字段保留与当前索引检查再次通过，见[最终执行输出](final-query-run.log)。受测 Tag 合同与索引摘要保持相同；完整 319 文件 / 3577 项通过见[最终单测记录](../checks/full-test-analysis.md)。

## 复现

在仓库根运行 `node evidence/runtime/github-review-2026-10-17/tag-discovery/check.mjs`。脚本读取仓库内十份旧合同副本和当前真实 Registry / Manifest，逐项使用既有 `renderAssetIndex` 查询，再核对当前索引和所有 140 份资产的真实源码/依赖/出口关系。它不依赖工作区外的旧仓库，不生成额外公共索引格式，也不增加测试套件。
