# Tailwind B2 AI 可编辑性基线证据

三个原生 CSS baseline trial 已按合同回填为 `completed`，当前生命周期是 `trials-recorded-awaiting-review`。P2 的视觉层级 Human Gate 仍为 `not-measured`，Tailwind B2 对照 trial 仍为 `not-run`；因此这不表示 Task 2 完成，也不支持“B2 已改善 AI 编辑效率”的结论。

## 事实源

- 任务合同：`benchmarks/tailwind-b2-ai-editability.yaml`。
- 基线结果：`baseline-results.yaml`。
- 校验入口：`pnpm verify:tailwind-b2`。
- 校验入口在 Task 2 仍是独立脚本，不并入 `verify:governance`；那是 Task 5 在完整合同校验器成立后的独立动作。
- 迁移前技术快照只在入场记录中留存；快照不是三次编辑实测。本文档不修改或删除 `/private/tmp` 中的快照。

## 共同夹具冻结规则

`prepared` 共同夹具必须以 `stateManifest: { path, byteSize, sha256 }` 指向 `evidence/runtime/tailwind-b2/trials/` 下真实存在的 JSON `.log`。校验器会自行读取文件、核对字节数并重算 SHA-256，不信任记录中单独填入的 hash。manifest 内必须冻结 Input/Button 的 `@rain-next/ui` 包版本、路由 `/#tailwind-b2-native-baseline`、`1280×720` 视口、target / non-target / formal SearchIcon selectors 及“更浅”解析。当前主记录已由 `native-css-common-fixture.state.log` 指向这份受治理的 durable manifest。

夹具页上“P1/P2/P3 尚未执行”徽标是为了让后续两种架构保持完全相同页面内容而冻结的夹具文案，不是 `baseline-results.yaml` 的 evidence lifecycle 状态。

每个 fixture / start / end / assembled state manifest 还必须携带 `capture` 与 `functionalState`。`capture` 固定为 `raw-byte-content-addressing`，只声明选定的 functional-state 文件，并把当时的临时 source root 作为 `ephemeral` provenance；临时目录可以被系统清理，验证不得依赖它继续存在。`functionalState.files` 是按规范化仓库相对 POSIX 路径的 UTF-8 原始字节升序排列、路径唯一的 `{ path, byteSize, sha256, objectPath }` 清单。逻辑路径必须是完整的 Unicode 并已规范化为 NFC，同时禁止绝对路径、反斜杠、控制字符、空段和 dot segments；`objectPath` 必须精确由 SHA-256 推导为 `evidence/runtime/tailwind-b2/trials/state-objects/sha256/<sha256>.blob`。

当前三轮 native CSS 基线还作为一份 `sealed audit snapshot`受验证器内的固定投影摘要保护。封存范围包含夹具、P1/P2/P3 运行身份与 state manifest 引用、P3 组装记录、diff/PNG/定向测试日志的路径与内容摘要、自动化验收、受保护对比、观察值与已测量指标。日后补录的 P2 Human Gate 和当前 `not-measured` 的人工指标不在此封存投影内。这能防止替换代码状态或视觉证据后继续复用旧结论；它不是对历史命令确实执行过的密码学证明。若要改动封存范围，必须显式重做对应审计并重新封存，不得靠自报字段静默绕过。

校验器会读取每个 durable blob，确认它是普通非软链接文件，字节数、内容 SHA 与文件名全部一致。`fileCount` 必须等于清单长度；`sha256-u32be-path-bytes-plus-file-sha256-bytes-v1` tree 算法按每项的 4 字节大端路径长度、UTF-8 路径字节、32 字节 raw file SHA 串接后重算 `treeSha256`，避免空格或换行分隔歧义。对象库必须精确等于所有合法 state manifest 的引用闭包；相同内容可复用同一对象，缺失、篡改和孤儿对象均失败。

`functionalState` 最小覆盖由 benchmark 锁定：共同夹具的 app 路由、page TSX/CSS、单元/浏览器验收文件与 playground 样式；Input/Button Master 及 UI styles；Foundation tokens/density；正式 SearchIcon 组件、SVG、Icon 容器、Manifest/Registry；以及 package manifests 与 lockfile。可增加 P3 局部分叉等新文件，但不得省略必需覆盖。

app 入口、路由表和 playground 全局样式也是受保护的夹具基础设施，不得被“当前搜索功能”任务顺带修改。P1、P2、P3 各自有固定的页面私有变更路径白名单；真实 state diff 和 `changedFiles` 只能是对应白名单的子集，不能靠自报 `scopeAccuracy: pass` 放行其他文件。所有 manifest、artifact、conflict 和 `changedFiles` 路径均采用同一套 canonical POSIX 规则：允许普通空格，禁止绝对路径、反斜杠、控制字符、空段和 dot segments。

“更浅”的初始值固定为 `--rain-color-surface-subtle` / `rgb(237, 243, 250)`；自动技术验收只判定结果是允许的 Rain semantic 或 local candidate surface，且亮度更高。视觉层级是否恰当仍路由 Human Gate，不由这个技术条件代替。夹具继续使用 `icon/search` 的单图标静态入口 `@rain-next/ui/icons/search`，不复制、重绘或改写图标源文件。

P1/P2 各自从未改动的共同夹具独立开始，两次 `run.startStateManifest` 必须与顶层 `fixture.stateManifest` 逐字段相同。P3 必须从同一架构中已保存的 P1/P2 结果开始，不得跨架构复用状态，也不得把 P1/P2 的前置成本计入 P3。

## 逐 trial 记录协议

每次只更新当前 `results[]` 项，并保留其他 trial 的真实状态：

1. 将该项 `trialStatus` 从 `not-run` 改为 `in-progress`；顶层 `metadata.trials` 同步为 `in-progress`。
2. 已观测指标写入真实 `value` 和可追溯 `evidence`。未观测指标保留 `value: not-measured` 与非空 `reason`；数值未测不得写成 `0`。`userCorrectionPrompts` 只在真实用户评价发生时才能写整数，并必须带 `evaluationSource: real-user-evaluation`；代理自己的迭代另记 `autonomousRepairCycles`，不能相互代替。
3. `changedFiles` 保存精确的仓库相对路径；`globalMasterChanged` 和 `unregisteredVisualValues` 保存布尔值与证据。
4. 只有当 diff、浏览器 PNG 和定向测试日志都已保存，且 `run` 同时引用受治理的 `runManifest / startStateManifest / endStateManifest` 真实 `.log`、记录 `run/protocol/prompt/start/end` 五个 SHA-256、run ID、模型、reasoning effort、source provenance、上下文、路由、视口、浏览器与 target/non-target/SearchIcon selector 时，才能把该 trial 标记为 `completed`。三个 manifest 的 path / byteSize / SHA-256 均由校验器对真实文件复核；单独写一个自声明 hash 无效。`protocolSha256` 是 benchmark 解析结果的 canonical JSON SHA-256，`promptSha256` 是精确 prompt UTF-8 文本 SHA-256。artifact 必须包含相对路径、字节数和 SHA-256；PNG 另记宽高，测试另记命令与退出码。每个 completed trial 的 patch 还必须在由 start objects 安全物化的新临时目录中通过 `git apply --check --whitespace=error-all`，patch 路径集合精确等于 `changedFiles`；回放后的每个路径必须是普通非软链接文件，且内容逐字节等于 end objects。
5. `run.model` 和 `run.reasoningEffort` 必须为结构化来源记录。若协作运行时未暴露该信息，如实写 `{ value: unexposed, provenance: runtime-not-exposed, reason: ... }`，不得猜测模型或伪填 `medium`。
6. 每项 `acceptanceEvidence` 必须逐一对应 benchmark 中同 prompt 的 criterion。自动项完成时必须写 `pass/fail` 与固定证据引用；P2 的“视觉层级是否恰当”不得由脚本判定，保持 `not-measured + reason` 并路由到独立 Human Gate。因此 P2 在 Human Gate 前的 `firstPass` 也保持 `not-measured`，trial 的 `completed` 只表示运行与证据采集完整，不等于验收全部通过。任一自动 criterion 或定向测试失败时，`firstPass` 不得仍写 `pass`。
7. 每个 completed trial 必须记录 `protectedComparisons.globalMaster/nonTarget/formalSearchIcon` 的 before/after SHA-256、相符的 `unchanged/changed` verdict 和证据引用；单一布尔值不能替代前后证据。受保护的 Master、非目标控件或正式 SearchIcon 若判为 `changed`，对应 acceptance 不得写 `pass`；Master 或 non-target 变更时，`scopeAccuracy` 必须写 `fail`。
8. 每次 run 的 end `functionalState` 必须与 start 逐路径比较：差集必须与 `observations.changedFiles` 相符，受保护的 Master/Foundation/Icon/Registry/依赖文件 hash 必须不变；当目标自动验收写 `pass` 时，至少一个夹具功能路径必须有真实状态差异。
9. P3 进入 `completed` 前，`savedState` 必须固定为同一 `baseline-results.yaml` 的 `/results/0` 与 `/results/1` 指针，且 `sourcePromptIds` 精确为 P1、P2。`prerequisiteAssembly` 必须按 P1→P2 顺序绑定两份已自行验 hash 的 diff，并通过 `assembledStateManifest` 指向受治理、真实存在、由校验器重算 hash 的组装状态 `.log`，同时记录冲突。组装以 P1 end objects 为输入，严格应用一个受 hash 管理的 P2-after-P1 resolution patch；该 patch 的路径集合必须精确等于 P2 `changedFiles`，输出逐字节等于 assembled objects。非冲突路径必须与 P1/P2 来源字节完全一致，任何 `assembly-normalization` 例外都失败；双边异值只允许结构化 `both-sources-changed` ledger，且必须绑定 P1 patch 输入 hash 与 assembled hash。该组装成本固定排除在 P3 `elapsedMs` 之外，P3 `run.startStateManifest` 与 start hash 必须精确等于该 assembled manifest 引用与 hash。
10. 三项都完成后，顶层仅改为 `trials-recorded-awaiting-review`，不得写 `Task 2 completed`。B2 对照、完整试点验证和 Human Gate 仍然独立。

## 本次原生基线证据注记

- P1/P2 的受治理 PNG 分别原样复制自它们各自的独立 trial 目录。P3 clone 在全量 spec 中产生的同名 P1/P2 PNG 不是 canonical 来源，已明确排除。
- 原始选定文件的 provenance 分别记录为 common `/private/tmp/rain-next-b2-native-trial.H4i2yN`、P1 `/private/tmp/rain-next-b2-native-p1.cNzY4X`、P2 `/private/tmp/rain-next-b2-native-p2.i95grx`、P3 actual assembly `/private/tmp/rain-next-b2-p3-actual-assembly.ddKXzS`、P3 end `/private/tmp/rain-next-b2-native-p3.bjo13u`。这些路径只说明证据来源，不是持续验证依赖，也不声称整个临时目录都是 functional snapshot。
- 早期用 reverse patch 重建的 P3 start 把 P3 测试编辑误留在 base 中，已从 canonical evidence 排除。当前 P3 patch 从 actual assembly 重新生成；`page.test.tsx` 与 P2 end 字节完全相同，E2E 双边冲突则由 deterministic resolution patch 复现。
- P3 原日志没有暴露 run ID；`native-css-p3-20260904T030353Z` 是 coordinator 按日志中已记录的 UTC start 回填的稳定标识，不是 runtime 暴露值。model 与 reasoning effort 同样如实记为 `unexposed`。
- P3 的 `scope-label` 实现是临时原生基线中的页面私有分叉。审查发现的 Local Fork provenance/继承行为测试缺口只记为该基线的 `minor-friction`，不冒充 B2 production fork，也没有写入主组件。

## 指标边界

四项价值指标固定为首次完成、真实用户纠正次数、修改范围正确性、后续编辑易理解/易操作性。`autonomousRepairCycles` 是诊断性过程数据，不是第五项价值指标；`elapsedMs` 也只是次要证据。`continuationAssessment` 只由 P3 从组装后状态计量，P1/P2 必须保持 `not-measured`；P3 只接受 benchmark `1.0` rubric 的 `clear / minor-friction / major-friction / blocked`，不得写自由文本。截图、diff 和自动测试不得冒充用户纠正或 Human Gate。
