# Rain Next：2026-09-16 完整项目审阅入口

本次按用户“将该项目全部上传到 GitHub，后续使用 GPT 网页版审阅、审核、分析”的指令制作私有审阅快照。包含工作区中尚未提交的内容；源码、测试、文档和历史证据保持原样。三份本地工作区存在不同实现，分别保存，不将它们自动合并为一个产品版本。

## 选择审阅范围

| 入口 | 内容 | 原始文件数 |
| --- | --- | ---: |
| [`main`](https://github.com/409476773-web/rain-classroom-vibe-ui-spike/tree/main)，本次固定分支 [`review/2026-09-16-card-v2`](https://github.com/409476773-web/rain-classroom-vibe-ui-spike/tree/review/2026-09-16-card-v2) | `.worktrees/card-v2` 当前工作区；最新 V2 组件、原型、M1/M2 与生成质量工作，以此作为整体审阅入口 | 8162 |
| [`review/2026-09-16-main-workspace`](https://github.com/409476773-web/rain-classroom-vibe-ui-spike/tree/review/2026-09-16-main-workspace) | `rain-classroom-vibe-ui-spike` 本地主工作区；包含该工作区独有的 Textarea、Pagination、Dropdown 后续修订和原始 V2 工作包 | 3792 |
| [`review/2026-09-16-day-3-core-ui`](https://github.com/409476773-web/rain-classroom-vibe-ui-spike/tree/review/2026-09-16-day-3-core-ui) | `.worktrees/day-3-core-ui` 早期工作区，作为历史实现和设计依据 | 102 |
| [工作区外围资料](docs/workspace-context/2026-09-16/) | 父目录的 `HANDOFF.md` 及全部 9 份 `outputs` 文件，包括颜色确认资料与上下文审阅记录 | 10 |

各分支应独立阅读和安装依赖，不要把不同分支中的同名实现混作同一版本。主工作区有 72 个文件未出现在 Card V2 工作区，早期工作区另有 1 个独有文件；已通过上述分支完整保留。外围 `HANDOFF.md` 的原始相对链接基于本地父目录，涉及 `rain-classroom-vibe-ui-spike/` 的内容请在主工作区审阅分支查找。

## 推荐阅读顺序

1. [README](README.md)、[AGENTS](AGENTS.md)、[SPIKE_BRIEF](SPIKE_BRIEF.md)：项目目标、视觉血缘与约束。
2. [当前阶段](status/current-phase.yaml)：读取后续 refinement 记录，不从早期顶层状态推导全库成熟度。
3. [资产入口](docs/ai/README.md)、[资产索引](docs/ai/asset-index.md)、[原型设计入口](docs/ai/prototype-design.md)：现有资产与使用方法。
4. [V2 原始路线图](docs/plans/2026-09-12-rain-next-v2-roadmap.json)、[生成质量改进计划](docs/plans/2026-09-15-rain-generation-quality-improvement.md)：区分原始提案和后续执行记录。
5. `apps/`、`packages/`、`manifests/`、`registry/`、`scripts/`、`tests/`，并对照 `evidence/` 中对应日期和范围的证据。

请将可复现缺陷、未完成能力、已接受设计和改进建议分开；意见应包含文件路径、具体位置、触发条件、影响和建议。实现、自动验证、独立审阅、Human Gate、颜色/可访问性、发布和业务迁移分别判断。

## 上传范围与核验边界

- 三份工作区均纳入 Git 已跟踪文件及未被忽略的新文件，包含本次上传前的未提交修改。
- 排除依赖目录、构建输出、缓存、临时测试输出、Git 内部数据、系统杂项及项目既有忽略规则指定的含身份信息截图。仓库不分发字体文件。保留 `evidence/` 下已归档的截图、日志、浏览器 trace 和源码验证包，因为它们属于项目审阅证据。
- 上传前检查文件路径、大小、符号链接、常见凭据模式，以及 ZIP/TAR 内部条目。发现的模式命中均为浏览器测试路径中的 `sk-dismissal-in-both-themes-*`，已核对为误报；未发现真实凭据。最大单文件约 10.16 MiB。
- 上传前逐文件校验原始快照与本地来源的 SHA-256；新增内容只有本说明、外围资料副本和 README 的审阅入口链接。
- 本次任务验证上传内容与远端读取，不重新运行应用测试或更新历史验证证据。已有通过/失败记录保留其原日期和范围，不表述为本次重新通过。
- 此次指令授权本次私有快照提交和推送；历史文件中的 Git 未授权状态属于对应历史阶段，不据此重写历史，也不扩大为包、Registry、Figma、生产发布或业务迁移授权。
- 本地三个开发工作区、分支和未提交修改保持原样。远端 `main` 更新到最新 Card V2 审阅快照，不代表本地开发分支已经合并或清理。

## 可交给 GPT 的审阅要求

> 请审阅私有仓库 `409476773-web/rain-classroom-vibe-ui-spike`。先读取 `main` 的 `GITHUB_REVIEW.md`，确认当前分支和文件可以实际读取；以 `review/2026-09-16-card-v2` 为本次固定审阅范围，按入口说明检查另外两份分支的独有内容。基于源码、合同、路线图和实际证据，分别分析架构、组件复用、视觉体系、原型质量、可访问性、测试与治理复杂度。每项问题给出文件位置、触发条件、影响和优先级；区分可复现缺陷、历史记录、未完成能力和建议。不要把旧计划、测试通过或局部视觉验收当作全库已经完成，也不要只读 README 就声称完成全项目审查。
