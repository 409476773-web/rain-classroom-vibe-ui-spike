# B00 真实基线

- 授权落点：用户本轮选择 `.worktrees/github-review-20261017`；主目录与 card-v2 保持原状。
- 基准与实际 HEAD：`6a2364c8b0325a243b2de8ebe12361e305aab333`。分支 `codex/github-review-20261017`。未创建分支或提交。
- 开工已有 46 tracked 改动、123 untracked 文件；完整清单和 SHA256 在本目录，68 个已有源码文件另封存 tar，保留 working patch。
- 37,304 历史 evidence 文件已逐文件 SHA256 封存；新结果只能写入本批 run 目录。
- Node v24.13.0、pnpm 10.28.1，实际 node_modules 可用；锁文件无改动，具体版本与锁摘要见 environment.json。精确依赖可用性与浏览器启动继续在 G01 实测。
- 已读当前 AGENTS、SPIKE_BRIEF、有效 status 增量、Benchmark/Evidence 索引、工作包 00/01/02/04/05/06/09。旧顶层 phase 不覆盖后续明确任务与当前用户授权。
- 模式：System Mode，实施25项必做任务；独立消费在衍生 Prototype 副本。四项条件任务只核触发条件。
- 保留：公共 API、旧路由、唯一状态 owner、批改 Tabs 局部接受、来源锁、历史 Human Gate、设计方法正文。
- 未验证：本批功能回归、真实浏览器、人工设计、Safari/读屏/真实触控、发布与业务迁移。
- 原因与任务差异：基准树已有 deep-review 维护增量，不重新制造缺陷；按 task-differences.md 和新窄回归认定本批状态。
- 回退：只撤销本批差异；先对照 existing-files.sha256.json 和 existing-source-files.tar.gz，不 reset 用户工作树。失败记录保留。
- 下一任务：G01 输出隔离，A01/M01 并行。
