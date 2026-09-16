# RN-13 最小检索、文档与登记闭合

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 从当前源码与登记生成一个按需检索入口，补齐 M1 资产的使用合同和本地依赖关系。

**Architecture:** 复用 `RainLocalSourceRegistry`、Manifest 和现有 YAML 解析器，生成一份 Markdown 索引。索引只展示已登记且有技术验证记录的候选；本地实验保留合同，排除默认检索。Human Gate、成熟度、颜色和发布各自取原登记，不合并推导。

**Tech Stack:** Node 内置文件操作、已安装 Vite 的 TSX 解析器、仓库 YAML 解析器与 Vitest。

---

## 授权与范围

2026-09-15 用户：“RN10已经完成建设了。继续推进下一步”。当前 RN-10 整体视觉收尾和 V2 M1 顺序均指向 RN-13 → RN-14 → RN-15；本轮完成 RN-13。沿用 `codex/card-v2` 工作树，按 System Mode 实施；总阶段仍为 Token Foundations V1。

已读 AGENTS、Brief、phase、V2 RN-13～15、RN-10 最新证据、Benchmark/Visual Evidence 索引、实际源码出口与相关 Manifest。RN-10 的原“awaiting_human”是历史记录，当前 BM-B 视觉已接受；不扩大到 Textarea 全组件或颜色接受。

选用生成的短文档：手工资产表会再次形成两份事实源，搜索服务/在线 Registry 超出当前需求。默认检索不收录 `local-experiment`；既有 Button、Badge、Surface、Link 的本地身份不因补合同而提升。

## Task 1：基线与可重复检查

- 新建 `evidence/runtime/rn13-asset-index/`，记录实际 HEAD、工作区摘要及源码/状态基线；不覆盖既有证据。
- 新建 `scripts/asset-index.test.ts`，检查登记引用、导出、未登记遗漏、实验排除、状态保留和生成物过期；先运行预期失败检查。
- 在 `status/current-phase.yaml` 添加本次限定登记，`scripts/verification-helpers.mjs` 按现有模式验证；冻结历史与原 Gate 保持不变。

## Task 2：最小索引与合同

- 新建 `scripts/asset-index.mjs`、生成 `docs/ai/asset-index.md`；支持 `--find`、`--write`、`--check`，不安装依赖。
- 补 `manifests/ui/{badge,surface,link}.yaml`，仅记录实际 API、来源、限制和历史证据。
- 补 `registry/core-ui.json` 的本地源码关系；必要时补现有 Registry 的遗漏导出。保持本地 Registry 身份，不生成在线安装命令。
- 新建 `docs/ai/README.md`，提供按任务加载、组件/布局选择、BM-A/B 复制改造入口和已知限制。
- 更新根 README 的入口和已过时债务描述；旧基础组件审计明确保留为历史，导向当前 Card 与新增合同。
- 在已有 `verify:evidence` 中接入索引校验，避免添加第二套治理入口或改变冻结的命令集。

## Task 3：验证与交付

- 运行 `pnpm exec vitest run scripts/asset-index.test.ts scripts/verification-helpers.test.ts --maxWorkers=2`。
- 运行 `node scripts/asset-index.mjs --check`、按关键词试检索、`pnpm typecheck`、`pnpm verify:governance` 和 `git diff --check`。
- 使用 requesting-code-review 技能安排独立只读复核，完成发现的修正。
- 仅文档、登记和检查脚本变化，无新运行视觉；原组件浏览器证据按原批次引用，本轮不宣称重新完成视觉或跨浏览器验收。
- 本轮不实施 RN-14 测评或 RN-15 整体交付，不改 V2 原规划快照；发布、Figma、迁移、提交和推送保持独立。

## 尚未验证的假设

现有 Registry 可能遗漏具名导出或依赖；先审计再修正，不以文件存在认定可独立安装。独立干净消费与连续 AI 改造测评属于 RN-14；本轮不填写效率数字。

## 2026-09-15 执行收口

Task 1–3的RN-13限定交付已完成：51份合同生成47个默认条目，4个本地实验保持原身份并排除检索。新增依赖引用、Table/Empty部件导出与FormItem类型依赖均已按源码核对。为维持既有精确治理机制，补`verify-boundaries.mjs`、`verify-tailwind-b2.mjs`中的本轮文件名单；RN-06/08/09历史比较仅剥离合法RN-13增量，原快照不改。

专项1/1、完整治理与独立复核通过；扩展回归242/251，保留9项历史夹具/快照/哈希失败；完整类型检查保留既有Dialog测试3处声明错误。公开运行时字节与旧phase均保持，详见[本轮证据](../../evidence/runtime/rn13-asset-index/verification.md)。下一步为RN-14；本轮不构成M1整体交付、视觉、对比度或发布接受。
