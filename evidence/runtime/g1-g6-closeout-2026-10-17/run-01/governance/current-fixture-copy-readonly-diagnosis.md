# Current fixture 复制只读诊断

观察期间 root full 仍在运行，源码、binding 与进程均未变更。Binding：`143a38cb306e3c988395dc65dd513331cb620d367038f35dc51fe6b4cfd78ddf`。

边界 fixture 的 beforeAll 预算原为 60 s，本轮同步执行 80.89 s 后超时，18 项未执行；子进程 20 s 预算保持不动。

当前 default true 先递归复制本轮整个 run-01，然后末尾又按精确 binding 库存补全。后者总计 5640 个必需文件；RUN 内只有 2806 个、44679018 字节（42.61 MiB），且全部在 governance/。browser、unit、日志与中间 before 不在该必需库存。观察时整个 RUN 为 4135 个普通文件、223.5 MiB，full 写日志会使此总量继续增长。

最小候选：首次复制一律排除精确 `evidence/runtime/g1-g6-closeout-2026-10-17/run-01`；default true 随后仍执行原有完整 manifest 补全，不丢 current source、proof、两份 view 或 beforeSnapshot；false 保持不补新后继的历史视图语义。module 仅 false 时排除的既有规则保持不动。不要泛化过滤其他 evidence 目录，不修改任何预算。

现有来源隔离六项用例本身仅复制同一精确闭包，已在 143a 候选通过；这证明原 G6/当前后继 reader 不依赖其余 RUN 文件。fixture 完整边界 CLI 的 fresh 正向与18项仍须在获准修复后的统一候选复验。详尽库存与计数见相邻 JSON。
