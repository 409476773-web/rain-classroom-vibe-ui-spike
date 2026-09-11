# Tailwind B2 入场、原生基线与工具交接审计

## 授权、范围与状态

- 用户明确授权：`授权进入 tailwind-b2-composition-contract 检查点`，并追加要求一起考虑刚加入的 icon 库。
- 当前阶段：`tailwind-b2-composition-contract`；工作模式：`system-mode-tailwind-b2`。
- 本批范围：在已完成的 Task 1（阶段/治理合同）基础上，记录并加固 Task 2 的三项原生 CSS 基线试验，并完成 Task 3 两项受限工具的精确安装、依赖审计与使用边界。独立代码复核已为 Ready，无剩余 Critical / Important；这仍不直接进入组件迁移。
- B2 整体：Implementation `in-progress`；Automated Verification `not-run`；Human Gate `not-evaluated`。这里的 `not-run` 指尚未实现的完整 B2 试点，不抹除旧系统或本次入场检查结果。
- Task 2：三个 `native-css-baseline` trial 已记录，生命周期为 `trials-recorded-awaiting-review`；Tailwind B2 对照尚未运行，因此不能由这些基线推出 Tailwind 更优。
- Task 3：`@rain-next/ui` 只新增精确直接依赖 `class-variance-authority@0.7.1` 与 `tailwind-merge@3.6.0`；`clsx@2.1.1` 仅由 CVA 传递引入。工具尚未在组件代码中使用，Task 4 尚未开始。
- Token bridge、CVA recipe、Local Fork 生产工具、Tailwind 搜索试点和 B2 价值结论均未实现。
- 没有创建 System Approved 资产、Local Experiment 组件或新的 Registry 项。未做 Figma 操作、发布、迁移、commit、branch、worktree 或远端 Git。

## 发现并处理的计划漂移

1. 图标库已存在 ADR 0001、`manifests/icons.json`、`registry/icons.json`。B2 改用 ADR 0002，取消会与现有资产冲突的“空 Registry / 空 Manifest”要求，保留原登记。
2. 图标库与两项源修复均已获独立视觉接受。766 项宿主供色、131 项固有配色的 897 项可用资产不纳入重画或 Tailwind 改写。
3. Button 已有五档尺寸、`tertiary / text`、文字按钮独立 tone / size、Link 消费和正式 PNG Loading mask。旧 spinner 描述不能作为迁移目标；Input 仍为“清除”文字，不自动改图标。
4. icon / text-button 的授权校验依赖已完成 Day 3。新增受校验的 `phaseHistory.foundationSpikeDay3` 保存原阶段及生命周期；独立 refinements、Human Gates、CP3、历史 checkpoints 和 pending Git 记录不重置。
5. 基线示例测试只允许数字，与“未测必须 not-measured”矛盾；计划已修正。额外工具限制指直接依赖，正常传递依赖仍需审计锁定，不因 CVA 自带 clsx 误停。
6. 三个任务需冻结相同起始夹具、正式图标和验收条件。P3 复用各自 P1/P2 的结果，单独记录前置成本；纯白 Input 的“更浅”含义必须在计量前澄清或在明确的起始表面中定义。

## 实际变更

- [ADR 0002](../adr/0002-tailwind-b2-local-fork.md)、[设计说明](../plans/2026-09-03-tailwind-b2-local-fork-design.md)、[实施计划](../plans/2026-09-03-tailwind-b2-local-fork-implementation.md)、AGENTS 和 Spike Brief：固定局部默认作用域、图标兼容、CSS 例外、人工晋升及验收边界。
- `status/current-phase.yaml`：记录本次授权和新阶段；旧 Day 3 结果完整转为历史，保留原独立 Gate。
- `scripts/verification-helpers.mjs` 与测试：新阶段、生命周期和历史授权校验。
- `verify-boundaries.mjs`：显式识别 B2，复用经过校验的旧阶段源码、图标、依赖和登记约束；当前仅开放入场，拒绝提前声明试点完成。后续 Task 2–13 必须逐步通过测试扩展精确文件/依赖合同。
- `verify-workspace.mjs`：使用已验证的历史父阶段读取图标授权。
- `verify-evidence.mjs`：新阶段继续锁住原 14 条 Visual Evidence 和四个 Benchmark 的生命周期，不因换阶段静默放宽。
- Overview 仅更新当前阶段/历史基线文案及对应 Unit/E2E 测试，不再把 Day 3 完成显示成当前 B2 状态；组件源码、样式和图标不变。测试所需 Node API 的窄类型声明同步补齐。

### Task 2：原生 CSS 基线试验

- 三项试验使用相同内容、控件、正式 SearchIcon、`1280×720` 视口和冻结验收条件。P1 与 P2 从同一共同夹具独立开始；P3 从保存的 P1/P2 结果组装后继续。
- P1（只让当前搜索 Input 更松、更浅）：`firstPass: pass`、`scopeAccuracy: pass`；记录 1 次代理自主整理周期。Input Master、非目标控件和正式 SearchIcon 均记录为未变化。
- P2（只让当前页面搜索 Button 更突出）：自动范围检查通过，但“视觉层级是否恰当”保留给独立 Human Gate，因此 `firstPass: not-measured`；记录 1 次测试证据类型修复。Button/Input Master、非目标控件和正式 SearchIcon 均记录为未变化。
- P3（复用两项结果，并只给第二个当前功能状态增加局部范围提示）：`firstPass: fail`，因重复 `aria-describedby` 经 1 次代理自主修复后最终自动条件通过；`scopeAccuracy: pass`，继续编辑评估为 `minor-friction`。该局部分叉只存在于基线试验副本，不是生产 Local Fork，也没有写入共享组件。
- 三项 `userCorrectionPrompts` 均保持 `not-measured`，因为没有发生真实用户评价；代理自主修复次数不能冒充用户纠正次数。
- 受治理结果、diff、PNG、定向测试日志与状态 manifest 位于 `evidence/runtime/tailwind-b2/`。其顶层状态只允许是 `trials-recorded-awaiting-review`，不能写成 Task 2 已完成或 B2 已通过。
- 功能状态已绑定到按原始字节寻址的 content-addressed object store；对象路径由内容 SHA-256 唯一推导，校验器复核对象闭包、真实字节数/哈希、无孤儿对象、canonical POSIX logical path 与普通文件类型。软链接和 FIFO 等非常规对象在读取前 fail-fast；临时试验目录只保留来源说明，不是未来验证依赖。
- P1/P2/P3 补丁均从受治理起始对象严格重放到结束对象，补丁路径集合必须精确等于 `changedFiles`；P1/P2 共同修改的 E2E 文件使用受 hash 约束的确定性 resolution patch 组装，随后 P3 从该 assembled state 严格重放。旧的空行 normalization 例外已移除，状态按原始字节判定。
- sealed audit snapshot 已封存当前可验证的 fixture、P1/P2/P3 run/start/artifacts、P3 assembly、自动 acceptance、protected comparisons、observations 与已测 metrics，投影 SHA-256 为 `9051659d685daa75d9b5284a5999ed1d958e7475abb77e84001f4b0f9fcabb47`。它明确排除未来 P2 Human Gate 与当前未测的人工指标；这是受治理记录的完整性封存，不是对历史命令实际执行过程的密码学证明。

### Task 3：最小工具安装与供应链审计

| 项目 | `class-variance-authority@0.7.1` | `tailwind-merge@3.6.0` |
|---|---|---|
| 用途边界 | 组织受 Token 约束的 variant | 合并 Tailwind 类名并处理冲突 |
| 直接依赖 | 是 | 是 |
| 许可证 | Apache-2.0 | MIT |
| 运行依赖 | `clsx@2.1.1`（传递依赖） | 无 |
| 安装生命周期脚本 | 无 `preinstall` / `install` / `postinstall` | 无 `preinstall` / `install` / `postinstall` |
| lockfile integrity | `sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==` | `sha512-uxL7qAVQriqRQPAyK3pj66VqskWqoZ37PW94jwOTwNfq/z9oyu1V+eqrZqtR2+fCiXdYOZe/Modt8GtvqNzu+w==` |

- 官方元数据：[CVA 0.7.1 npm registry](https://registry.npmjs.org/class-variance-authority/0.7.1)、[CVA 0.7.1 package.json](https://github.com/joe-bell/cva/blob/v0.7.1/packages/class-variance-authority/package.json)、[tailwind-merge 3.6.0 npm registry](https://registry.npmjs.org/tailwind-merge/3.6.0)、[tailwind-merge 3.6.0 package.json](https://github.com/dcastil/tailwind-merge/blob/v3.6.0/package.json)。
- `tailwind-merge@3.6.0` 的 [README](https://github.com/dcastil/tailwind-merge/blob/v3.6.0/README.md) 与 [3.6.0 release](https://github.com/dcastil/tailwind-merge/releases/tag/v3.6.0) 声明支持 Tailwind CSS 4.0–4.3。当前工程为 `tailwindcss@4.3.3`，位于声明的 minor 范围内；官方文字没有逐一列出或保证该精确 patch，因此这里不扩大表述。
- 安装前 `packages/ui/package.json` 为 58648 bytes、SHA-256 `c0861cf09b6d23f04f67e06f375ee91873c2408fdd5f889c5e07690a7d451aa8`，`pnpm-lock.yaml` SHA-256 为 `b6e4a096f3bb8b502dd5fd72874977bceaaf01965ab15795e79b7924c9484b38`；安装后分别为 `9110ad7b2645b5db08642d6bc41c46e9c62c3dcf13bfcadf643833cd22f05aa4` 与 `81f0b76c30a2604c92c473ada635e3dec730311694a1f37d05710f9293248ae8`。
- 这一步只使两项工具可用，不代表已建立 recipe、类名合并入口、Token bridge 或 Local Fork，也不能据此宣称组件已经 Tailwind-first。
- 边界校验要求 `packages/ui/package.json` 与 `pnpm-lock.yaml` 在读取前必须是普通文件，软链接、FIFO 等非常规输入会快速拒绝；在 Task 4 获授权前，组件源码不得导入或调用 `class-variance-authority`、`tailwind-merge` 或传递依赖 `clsx`。

## 迁移前快照

入场当时的快照路径：`/private/tmp/rain-next-b2-baseline.XQL5Tj`。复制发生在当轮文件编辑前，排除了 `.git`、`node_modules`、`dist`、`playwright-report`、`test-results`、`.vite` 和 `coverage`。

- 原始文件数：2873。
- 文件树 SHA-256：`06ff4102f18df4a2bbe042d9d228c0979e0109e93b971deece51d4af6426b945`。
- 算法：每个文件按原始字节取 SHA-256；相对路径以 `localeCompare(..., "en")` 排序；连接为 `path + " " + hash + "\n"` 后再取 SHA-256。后续验证同样排除上述生成目录。
- 副本使用原 lockfile 离线安装成功：136 个包从本地 store 复用，0 下载；没有 CVA / tailwind-merge 新依赖。
- 入场完成时该快照可追溯，且临时路径未被主工程导入或打包。

后续状态（2026-09-04）：`XQL5Tj` 路径已被系统临时目录清理机制移除，本次 Task 2 合同工作没有删除或改写它。上述数据保留为入场时的历史记录，不再表示当前存在的路径。

### 入场后、迁移前的重建快照

`/private/tmp/rain-next-b2-baseline.IR9TV9` 是入场后、迁移前重建的技术快照（`recreated post-entry pre-migration`）；它不是 `XQL5Tj` 的原副本、延续或等价替代，也不能反推旧临时目录当时的全部字节。2026-09-04 只读复核时该路径存在，本次合同工作未修改其内容。

- 按上述排除目录与 `path + " " + fileSha256 + "\n"` 树记录算法独立复算：2880 个文件，canonical state SHA-256 为 `a00d86032d842438a3a2ad13c271ef128d0eabd79e093a0d97bcafc8901fad7b`。
- 重建时曾有 `32c18b537c3f95333018d41258b2575d6565fa44b05380473197b4924cd6eda4` 的 `shasum output` 口径记录；其输入序列化与上述 manifest 自哈希口径不同，不可混比，也不作为 canonical state hash。
- 后续 functional fixture 及 P1/P2/P3 的 start/end/assembled state 已写入主仓库受治理的 durable manifest，由 content-addressed object store 绑定真实源字节，并通过严格补丁重放证明 start/end 关系。早期临时状态 hash 不是该 functional state 的 canonical 证据。当前 baseline 生命周期为 `trials-recorded-awaiting-review`，不再是 `not-prepared / not-run`，但也不是 Task 2 `completed`。

关键基线哈希：

| 文件 | SHA-256 |
|---|---|
| Button 源码 | `7b73a3f2a72fef29569f72ca955d7c7a4f468e40a9dedc1d09bb2469d8723fa7` |
| Input 源码 | `432c078b2d512245704f3d37ceafe6d5477c14904ba4f5fdf29cc731388cda40` |
| UI styles.css | `813813cc6610254a29cf321ece5bf651fcf537729cb6d709c9f0a2e584bfe4f6` |
| 图标 source-lock.yaml | `af155e3e7cb2d683e9afc5ad063627dfa9b5cf160e418e339813534cff757b39` |
| pnpm-lock.yaml | `b6e4a096f3bb8b502dd5fd72874977bceaaf01965ab15795e79b7924c9484b38` |

这是技术基线快照，不是 AI 编辑价值基线。三项 prompt 已实测并分别记录首次完成和范围正确性；真实用户纠正次数仍均为 `not-measured`，继续编辑体验只在 P3 记录为 `minor-friction`。这些是原生 CSS arm 的基线事实，不能在 Tailwind B2 对照运行前形成优劣结论。

## 本次验证记录

入场前：

- `pnpm verify:governance`：通过。
- `pnpm verify` 中治理、图标完整性/按需构建、typecheck、482 项 Vitest 和 build 通过；E2E 首次受本地端口权限限制，整体命令当次退出 1，不记录为通过。
- 冻结副本内 `pnpm test:e2e` 经运行权限授权重跑：36 项 Chromium 通过，含图标渲染、全库解码、两个源修复、Button / Input / 文字按钮回归。
- 冻结副本定向 Button / Input / Icon 单元测试：76 项通过。
- 既有构建提示图库懒加载 chunk 大于 500 kB；单图标消费检查确认未带入完整 catalog。本批不通过修改阈值或改包体来消除提示。

入场后（2026-09-03，最后源码编辑早于最终完整检查）：

- `pnpm verify`：退出 0；包含治理、897/897 图标完整性与按需构建、TypeScript、514 项 Vitest、构建和 36 项 Chromium。当前完整检查通过仅证明本批入场变更及既有运行系统，不能推导尚未实现的 B2 试点验证已通过。
- `pnpm verify:reuse-audit`：退出 0；75 项资产、53 项公共组件、30 项高层记录、12 个目标的快照审计继续通过。
- 新增 32 项治理测试，helper 定向共 201 项，其中 17 项真实 CLI 正反例覆盖未知阶段、越权 scope/action、历史状态漂移、依赖、Registry、证据生命周期和虚报验证。
- Overview 状态测试先按预期失败，再修复文案后通过；完整浏览器检查也确认当前阶段与历史基线分离。
- 独立复核发现并关闭两项问题：入口允许误报 B2 验证 `passed`；旧图标规则可接受已通过的源修复 Gate 被退回。修复后原始 CLI 变异测试均退出 1，正常入口退出 0；无剩余阻塞或重要问题。
- 最终快照比较：16 个文件新增或修改，0 删除；`packages/` 1834 个文件、图标来源 905 个文件、图标运行证据 13 个文件、现有 Manifest 和 Registry 均未变化；package manifests 和 lockfile 未变化。应用端只改 Overview 状态文案及其测试。
- 原阶段 checkpoints、refinements、各 Human Gate、CP3、准备记录和 pending Git 与入场前逐对象完全一致；完整快照的树哈希仍与上表一致。

既有图库 chunk 警告及工具 `NO_COLOR / FORCE_COLOR` 提示仍存在，不影响上述退出码；未降低检查标准或调整警告阈值。

### Task 2/3 批末检查（2026-09-04）

- Tailwind B2 专项测试：39/39 通过；tests TypeScript 检查、`pnpm verify:tailwind-b2`、`pnpm verify:boundaries` 与 `pnpm verify:reuse-audit` 均退出 0。
- 主执行者最后一次 `pnpm verify` 整体退出 0：24 个测试文件、553 项 Vitest、build 与 36/36 Chromium 均通过；图标完整性检查保持 897/897。
- 独立代码复核结论为 Ready，无剩余 Critical / Important。
- Task 3 的安装边界检查确认 UI 包只有上述两项新增直接依赖，`clsx@2.1.1` 没有被提升为直接依赖；Task 4 前三项 helper 均未出现在组件源码。共享 Button/Input、UI styles、Foundation tokens/density 与 icon/Registry 源文件均未因安装而修改。
- 上述退出 0 证明本批 Task 2 证据合同/基线记录与 Task 3 安装边界通过自动检查；它不把 Task 2 lifecycle 改写成 `completed`，也不代表尚未运行的 Tailwind B2 comparison、完整 B2 Automated Verification 或 Human Gate 已通过。

## 后续精确起点

Task 2 的原生基线证据与 Task 3 的工具安装边界已完成本批自动检查和独立代码复核；精确状态仍是 `trials-recorded-awaiting-review` / B2 comparison `not-run` / Human Gate `not-evaluated`。Task 3 工具已安装但仍未进入任何组件使用。

Task 4 尚未开始，只有获得下一次继续授权后才进入。后续 Task 7 / 8 必须保留图标入口、宿主颜色、图标尺寸和 Loading 来源；每次变更后用真实计算样式检测层叠优先级，不用类名字符串代替视觉验证。

本批结束不构成 B2 Human Gate，也不要求重开图标已接受 Gate。未来只有安全项全部通过、价值至少三项更优后才进入 B2 独立 Human Gate；它仍不授权下一批组件。
