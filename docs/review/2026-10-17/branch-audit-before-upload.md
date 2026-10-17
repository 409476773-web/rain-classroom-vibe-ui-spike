# 上传前分支与未合并原因审计

审计时间：2026-10-17T14:22:05+08:00。仅只读；root 已在本轮完成远端刷新。基准 `origin/main`：`cf911c86078783df1fcd4228707873cfd6df2066`。下表为当前推送新快照之前的时点。

现有远端共有 **3 条带未合并提交的分支**，本地有效分支没有相对远端 main 的独有提交。新送审工作树尚未提交；大量当前建设仍属于工作树文件，不能只用分支提交数判断是否缺失。

| 分支 | ahead / behind | 最新提交（北京时间） | 工作树/结论 |
|---|---:|---|---|
| `origin/prototype/teacher-homework-summary` | 6 / 0 | 2026-09-18T22:18:58+08:00 · `9d87bc85` · fix(prototype): correct homework summary route newlines | 无绑定本地工作树；开放草稿 PR #1 |
| `origin/review/2026-09-16-main-workspace` | 1 / 1 | 2026-09-16T23:52:16+08:00 · `f5ffe508` · chore: preserve main-workspace workspace for private review on 2026-09-16 | 无绑定本地工作树；历史主工作区送审快照 |
| `origin/review/2026-09-16-day-3-core-ui` | 1 / 1 | 2026-09-16T23:52:16+08:00 · `055e47bb` · chore: preserve day-3-core-ui workspace for private review on 2026-09-16 | 无绑定本地工作树；早期 102 文件快照 |
| `origin/review/2026-09-16-card-v2` | 0 / 0 | 2026-09-16T23:52:26+08:00 · `cf911c86` · chore: preserve card-v2 workspace for private review on 2026-09-16 | 与 origin/main 同一提交/文件树，无需合并 |
| `codex/github-review-20261017` | 0 / 0 | 2026-09-16T23:52:26+08:00 · `cf911c86` · chore: preserve card-v2 workspace for private review on 2026-09-16 | .worktrees/github-review-20261017；HEAD 与 main 相同，暂存内容未提交 |
| `codex/card-v2` | 0 / 1 | 2026-09-12T05:59:54+08:00 · `321e1a0c` · chore: prepare Rain Next component library for private review | .worktrees/card-v2；提交已被 main 包含，现有增量未提交 |
| `codex/switch-component` | 0 / 1 | 2026-09-12T05:59:54+08:00 · `321e1a0c` · chore: prepare Rain Next component library for private review | .worktrees/switch-component；提交已被 main 包含 |
| `main` | 0 / 1 | 2026-09-12T05:59:54+08:00 · `321e1a0c` · chore: prepare Rain Next component library for private review | rain-classroom-vibe-ui-spike；本地 main 落后远端 1 提交 |

ahead=分支独有提交数，behind=远端 main 独有提交数。全量 SHA/上游/工作树绝对路径见 JSON。

## 为什么还未合并

1. **教师作业小结**：[#1](https://github.com/409476773-web/rain-classroom-vibe-ui-spike/pull/1) 仍为开放草稿，6 个提交只改原型入口和新增页面/样式/设计说明（4 个文件）。PR 正文要求合并前补本地浏览器视觉与完整构建；设计说明也记录未做本次远程修改的本地视觉验收。当前没有检查或评审记录。GitHub 此刻为 `MERGEABLE / CLEAN`，不能将合并冲突说成原因；正文记录的是当时未验证，不能据此断言今天本地测试失败。

2. **main-workspace**：提交明确是保留当时未提交源码、文档和证据的送审快照，不代表新的生命周期验收；未发现 PR。相对当前 main 的直接文件树比较为新增 72、改动 93、缺少 4453 个路径。旧 Textarea/Pagination 展示页、部分证据/工作包独有，而 Input、FormItem、Textarea、路由和阶段记录也与 main 分叉。适合逐项确认有价值增量；仅从 Git/PR 不能确定当时未合并的全部人工原因。当前未做合并模拟，不宣称当前冲突数。

3. **day-3-core-ui**：同类历史保存快照，只有 102 个文件；相对 main 的直接树比较缺少 8072 个路径。它保留早期基础组件状态，不是待整支补进当前库的普通增量；无 PR。直接文件树的缺少路径不等于本次真实合并将删除的数量。

现行 [私有送审授权说明](../../plans/2026-09-12-existing-assets-closure.md#github-私有送审续步) 明确把当时的首次提交/私有上传与 PR、合并分开；RN-07、RN-08 和 Switch 计划也把建设/局部验收与 Git 操作分开。当前用户已重新授权私有上传，由 root 执行；这不构成本次分支审计的合并授权。

## 工作树中的未提交建设

| 实际工作树 | normal status 项数 | 状态说明 |
|---|---:|---|
| `rain-classroom-vibe-ui-spike` | 85 | 已暂存 0；已跟踪但未暂存 28；未跟踪 57 项 |
| `.worktrees/card-v2` | 1022 | 已暂存 0；已跟踪但未暂存 124；未跟踪 898 项 |
| `.worktrees/day-3-core-ui` | 20 | 无有效 HEAD/尚无本地提交；102 个未跟踪文件（normal 折叠为 20 项） |
| `.worktrees/github-review-20261017` | 37251 | 已暂存 37242；已跟踪但未暂存 3；未跟踪 9 项 |
| `.worktrees/switch-component` | 20 | 已暂存 0；已跟踪但未暂存 13；未跟踪 7 项 |

normal status 会把未跟踪目录折叠为一项；JSON 同时记录逐文件计数。以上为动态时点，root 继续整理、暂存/提交后会变化。`codex/day-3-core-ui` 仅是尚未形成有效提交的工作树分支名，不在有效本地 refs 中。

Switch 抽核：旧工作树的组件实现、测试、Manifest、Registry、ADR、实施计划与当前 card-v2/送审版逐字相同；旧展示页有后续差异。因此旧工作树 dirty 不等于 Switch 尚未进入当前建设。当前 Pagination/Textarea 源码及 Manifest 也已存在，不能把历史独有展示页路径解释为组件缺失。新送审版尚未提交，`HEAD=main` 仅说明提交图，不能说明送审内容为空。

## 证据与边界

- 实时 Git：`for-each-ref`、`rev-list`、`worktree list`、`status`、`log/show`、`diff --no-renames`、SHA-256 抽核；未运行合并、变基、提交、推送或全库测试。
- 实时 GitHub：全部 PR 列表只有 #1；其 `reviews/comments/reviewRequests/statusCheckRollup` 均为空。PR 的草稿状态不等于存在失败检查。
- 当前文档：card-v2 的 `AGENTS.md`、`SPIKE_BRIEF.md`、`status/current-phase.yaml`、9/12 私有送审续步；远端 RN-07/RN-08 快照计划；Switch 计划 Task 5 明确当时未授权 Git 发布而不提交。
- 原审计只读且仅写父目录outputs；此副本纳入送审资料。表中的暂存数和分支关系为上传前时点，不能当作上传后的状态。

