# Rain Designer Starter Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在用户明确指定的既有 card-v2 中接入 Rain Designer，并由现有 RN14 导出器分发完整、可独立读取的 M1/M2 快照。

**Architecture:** 沿用 `exportStarter` 的 entries、普通文件复制、source-lock 与 verifyStarter。只补充 Skill、当前接入资料和生成 AGENTS 的设计入口；按既有做法将未随包提供的历史追溯链接明确标为原工作区材料，不复制整库证据。

**Tech Stack:** 现有 Node、pnpm、Vitest、Vite、Playwright 与 Codex app-server。

用户要求优先：不新建分支/worktree、不提交、不安装依赖、不改锁文件、不发布、不改公共组件。当前计划直接在已授权工作树执行，按实际检查收尾，不另开实施会话。

## 范围与基线

- 工作树：现有 `.worktrees/card-v2`，`codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。
- 修改：`AGENTS.md`、`docs/ai/prototype-design.md`、`scripts/rn14-starter.mjs`、`scripts/rn14-starter.test.ts`、`status/current-phase.yaml` 的本任务增量。
- 新增：`.agents/skills/rain-designer/` 六份原样文件；本计划、`docs/ai/rain-designer-integration.md`、`docs/ai/rain-designer-integration/PROGRESS.md`、本任务 `evidence/runtime/rain-designer-starter-2026-10-13/`。
- 外部新增：全新 M1/M2 导出及一个普通文件衍生试用副本。证据放源树或副本外，不改干净快照。
- 只读：所有共享 packages、Manifest、依赖/锁、Benchmark、旧 RN14/RN15 Gate、历史快照、其他任务现有修改。
- 当前 RN14 三项测试：M2 区分通过；资料递归失败于 G4 漏导出；旧 B2 历史校验失败。保留原日志与断言，后者不在本次修复范围。

## 1. 先证明新能力缺失

在既有 `scripts/rn14-starter.test.ts` 加入 M1/M2 的完整六文件、版本/字节、sourceFiles/files 哈希、生成入口、相对闭包和逐文件篡改/删除拒绝断言。扩展旧递归测试到 M2 指南；原安全与阶段断言不删。

运行 `pnpm exec vitest run scripts/rn14-starter.test.ts --maxWorkers=2`，保存 RED；确认失败来自缺少分发能力。

## 2. 接入并最小扩展

原样安装六文件，原位合并根入口与项目指南：先理解任务再复用能力，历史方法与整页按需，不强制多稿。保留项目专属数字、来源、API、品牌与授权。

entries 递归加入 Skill，加入 G4 使用说明、实际合同及其必要资料。生成短 AGENTS 指向 Skill/指南，保留消费端边界。仅在导出副本处理已知的可选历史追溯链接；sourceFiles 记录原文，files 记录导出字节。

运行原包 `verify-bundle.mjs --installed`、RN14 专项测试。旧 B2 失败应与基线一致；不得放宽验证器。

## 3. 独立消费者验证

创建两个全新源树之外的目标，运行现有 `--export`、`--export-m2` 与 `--check`。记录 snapshotId/inputCommit、清单、无源绝对路径/软链、相对资料和方法版本。

由短命只读 app-server 从独立根验证原生发现、显式调用和实际正文读取；原始事件留临时目录，源树仅保存过滤的本包证据。不是当前桌面会话热加载证明。

复制既有已安装依赖到独立消费者的 `node_modules`，不执行安装、不改锁。实际运行构建/类型检查；条件不足或失败如实记录。

创建一个衍生副本，先评审既有私有区域并实际渲染/操作，不改冻结场景。确认无需调整时保留页面原样；在副本中新增设计试用记录，原 source-lock 保留并要求原验证器拒绝额外文件。记录变更与哈希，不把衍生副本冒充干净快照。

## 4. 收尾

比较任务开始时全部已有文件哈希，旧阶段记录剔除新增条目后须逐字一致；报告并行任务变化而不覆盖。更新接入记录与进度，保留失败和未验证项，用户 Gate 为 `awaiting_human`。
