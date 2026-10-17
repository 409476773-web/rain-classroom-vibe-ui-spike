# Rain Designer：card-v2 与 Starter 接入记录

日期：2026-10-13。文件接入、S3 快照及独立消费者验证已实施，用户验收 `awaiting_human`。专项测试保留一项基线已有失败。

2026-10-14执行改进补充：当前Skill第5节保留此前C2本地修订。第12轮已完成4次原生新会话对照、独立重复与新对象检查；候选C4未满足必要比较事实的交付门槛，未安装。Designer v0.5及本轮BM-A源码未改，旧快照和初次接入结果保留。见[实际差异、结果与待办](../../evidence/runtime/rain-designer-execution-2026-10-13/round12/RESULTS.md)。下文记录初次S3实施时的状态，不代表现行Skill仍与原包逐字相同。

本次用户明确选择“在现有 card-v2 实施 S3（推荐）”。这是已有工作树，未创建分支/worktree，未切换 Git 状态。此前主 checkout 的 S0—S2/加载验证保持各自范围，本记录不把那里的结果当作 card-v2 已验证。

## 当前范围与原件

实际工作树为 `.worktrees/card-v2`，分支 `codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。任务前已保存 52,260 份既有文件 SHA 与五份本次修改目标的原件，另存完整未提交状态。只合并原文，不覆盖现有脏工作。

完整来源为用户 ZIP 中 `rain-designer-codex-handoff-v1.0/payload/rain-designer` 六个文件。Skill 0.2.1、Designer v0.5、光学补充 v0.1，普通文件原样安装到 `.agents/skills/rain-designer/`。包与安装只读校验 15/15，不等于原生发现或调用。

## 本次修改

- `AGENTS.md` 原位接通 Skill/本库资料，限定 Template 检索为理解任务后的能力核对；保留安全、品牌、来源、API、无障碍和阶段规则。
- `prototype-design.md` 分清通用方法与项目事实，取消默认相似旧页/大表单必读和固定稿数。既有项目尺寸、报告探索、36px 局部配方与历史接受范围保留；旧 `information-design.md` 全文未改，按需查案例，通用方法不再并行维护。
- `rn14-starter.mjs` 沿用 entries、普通复制与既有 source-lock；新增完整 Skill、G4 用法和三份实际合同。生成短 AGENTS 指向 Skill/指南，保留共享 packages/锁只读、业务状态属宿主、Git/外部写入独立授权。
- 导出副本沿用原机制，对旧设计经验库新增的四个追溯、G4 五个追溯及 M2 六个追溯链接明确标为“原工作区追溯材料；本 Starter 未附带”；源文档不改，不复制整库历史证据。实际 API/方法引用保持可达，旧样例仍在包内但不是设计默认模板。
- `rn14-starter.test.ts` 保留原安全/阶段断言，补齐 M1/M2 六文件与逐件删除/篡改检测、源/导出 SHA、入口/版本及相对闭包。将已有 B2 阶段检查独立为一项测试，便于报告真实失败，不放宽断言。
- `current-phase.yaml` 仅新增本任务 `localExperiments.rainDesignerStarter` 授权记录，不改旧 RN14/RN15 快照、旧 Gate 或全局阶段。

## 已知冲突和真实失败

当前用户指令改变的是原设计入口与 2026-09-19 固定两稿默认；历史来源已原位保留。指南已有的项目尺寸、G4 字号更新与早期报告数字并存，继续按实际 Typography 合同和各自范围核对，本次不大范围删改历史说明。

任务前 RN14 3 项测试有 2 项失败：G4 资料漏导出、旧 B2 冻结历史不满足现验证器。最终 6 项为 5 通过、1 项相同 B2 历史失败，原安全检查已独立通过。没有删改阶段断言或 `verification-helpers.mjs`；不把局部检查当完整质量门通过。原始失败、RED 与[最终日志](../../evidence/runtime/rain-designer-starter-2026-10-13/final-separated-tests.log)均保留。

任务期间另一个 Slider 工作继续更新其源码、Manifest 与证据；这些变化在[保留检查](../../evidence/runtime/rain-designer-starter-2026-10-13/preservation.json)独立列出，本任务未写入或回退它们。两个导出的共同输入 SHA 完全一致，[导出后源检查](../../evidence/runtime/rain-designer-starter-2026-10-13/source-drift.json)无漂移。原阶段剔除本任务新增条目后与任务前原文逐字一致。

## 独立消费者

两个全新目录位于工作树之外，inputCommit 均为本记录 HEAD，实际内容身份由当前未提交源文件 SHA 定义。

| 消费者 | 独立目录 | snapshotId | 锁定文件 |
| --- | --- | --- | --- |
| M1 | `rain-designer-starter-s3-2026-10-13/M1` | `rn14-8852f7741e235e00` | 2446 |
| M2 | `rain-designer-starter-s3-2026-10-13/M2` | `rn14-88fd71655d996afd` | 2459 |

上表目录以 `/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/` 为父级。两者均通过原 `--check`，完整 Skill 与新增资料参与 `sourceFiles` / `files`，锁文件与原 source 源码字节保留，旧快照未改。各有 51 个可达本地资料引用，方法/接入链普通文件，无源仓库绝对路径；未检查锚点与远程 URL。[导出记录](../../evidence/runtime/rain-designer-starter-2026-10-13/exports.json)、[闭包与路径检查](../../evidence/runtime/rain-designer-starter-2026-10-13/standalone-checks.json)。

## 实际检查

| 检查 | 真实结果与证据 |
| --- | --- |
| 工作包安装 | `verify-bundle.mjs --installed`，exit 0，15/15；六文件逐字一致，Skill 0.2.1 / Designer v0.5 / 光学补充 v0.1 |
| 导出与安全回归 | `pnpm exec vitest run scripts/rn14-starter.test.ts --maxWorkers=2`，exit 1，5/6；唯一失败与任务前 B2 历史失败一致 |
| 方法负向检查 | M1/M2 每个六文件分别改动、删除，共 24 次预期拒绝并恢复；共享文件、额外文件、软链、重复目标/源内目标的原断言保留并通过 |
| 测试类型 | `pnpm exec tsc --noEmit --project tsconfig.tests.json`，exit 0。[日志](../../evidence/runtime/rain-designer-starter-2026-10-13/tests-typecheck.log) |
| M1 类型 | 独立根 `pnpm typecheck`，exit 0。[日志](../../evidence/runtime/rain-designer-starter-2026-10-13/m1-typecheck.log) |
| M1/M2 构建 | 各独立根 `pnpm build`，均 exit 0，各包类型检查一并执行；既有大包告警保留。[M1](../../evidence/runtime/rain-designer-starter-2026-10-13/m1-build.log)、[M2](../../evidence/runtime/rain-designer-starter-2026-10-13/m2-build.log) |
| 原生发现 | 宿主 app-server `skills/list` 对两个独立根各发现唯一 enabled/repo 的 rain-designer，路径指向本导出，无该 Skill 解析错误 |
| 显式调用与实际读取 | 两次 native structured Skill 输入均接受，`turn/completed=completed`、进程 exit 0；临时只读、无外部工具调用或文件修改。各实际读取 9 段本导出内资料：生成 AGENTS、完整 Skill（9508 字节）、Designer 第1–2章/V3.1/6.4/7.1、完整本库指南、SearchInput 合同/实现/真实出口。18 段输出 SHA 已由主代理独立重算，未回源补文件。[原生证据](../../evidence/runtime/rain-designer-starter-2026-10-13/native-consumer-validation.json)、[重算](../../evidence/runtime/rain-designer-starter-2026-10-13/native-evidence-recheck.json) |
| 独立静态审阅 | 五份任务文件对保存原件的差异已由第二代理复核，无本任务缺陷；未替代执行检查 |

运行时只复制本机已安装依赖，未执行 install/升级、未改依赖或锁。依赖链接没有指向源树；有一个未被 Starter 使用的 Playground 链接缺少目标，构建与类型检查均成功。此复制不是全新离线安装/跨机器验证。node_modules/dist 按既有验证器规则排除，所有锁定文件仍逐字通过。

当前桌面聊天的热加载/隐式触发未验证；原生证据来自独立临时消费者。源树长 AGENTS 仍需显式读取适用完整规则，本轮没有改全局容量或重写治理全文；生成消费者 AGENTS 为 934 字节且已完整读取。

## 一处受控试用

[试用入口](http://127.0.0.1:5543/#bm-a)来自 `M1-trial` 普通文件副本。评审已有 BM-A 私有搜索与对象说明，不从历史页生成新模板、不改冻结页面或公共资产。

6 组有限检查通过：输入草稿不立即提交；Enter 无匹配空结果；清空恢复 13 条与焦点；按钮搜索及规则说明打开/Escape关闭恢复焦点与查询；资料查看的本地反馈；长标题卡片与 390px 换行。pageerror/console error 0，无外部请求。[操作证据](../../evidence/runtime/rain-designer-starter-2026-10-13/consumer-trial.json)、[采集日志](../../evidence/runtime/rain-designer-starter-2026-10-13/consumer-trial.log)。既有“查看资料”只是本地反馈，没有文档内容预览器；完整内容预览与英文大小写检索未在本 S3 对象重测。

Chromium 151、1440×1000 / 390×844、DPR1、zoom1、light/compact；CDP 实际渲染字体为 PingFang SC Semibold。窄屏 document 与 viewport 均390px。主代理实际查看了[桌面](../../evidence/runtime/rain-designer-starter-2026-10-13/consumer-desktop.png)、[空结果](../../evidence/runtime/rain-designer-starter-2026-10-13/consumer-empty.png)、[说明浮层](../../evidence/runtime/rain-designer-starter-2026-10-13/consumer-explanation.png)、[长标题](../../evidence/runtime/rain-designer-starter-2026-10-13/consumer-long-title.png)与[窄屏](../../evidence/runtime/rain-designer-starter-2026-10-13/consumer-narrow.png)。搜索图标/文字、视图图标/标签、复选框/标题首行未辨认出稳定明确的光学偏差，结论为“已检查，无需调整”，页面代码零改动。没有将几何测量代替视觉判断，也没有统一偏移。

首次运行在补充字体探针处失败（CSS agent 未启用），[原日志](../../evidence/runtime/rain-designer-starter-2026-10-13/consumer-font-probe-failed.log)保留；补齐采集接口后从头重跑全部操作并通过。

衍生副本仅新增 `design-notes.md`，原 source-lock 逐字保留。原验证器检查此副本 exit 1，原因 `Starter file inventory changed`，是预期差异；两份干净导出仍 exit 0。[衍生记录](../../evidence/runtime/rain-designer-starter-2026-10-13/derivative.json)。试用记录与截图未污染 M1/M2 原清单。

未执行全库迁移/完整质量门、Safari/VoiceOver、实体触摸、完整主题/对比度与键盘/IME矩阵、隐式触发正负例矩阵、跨机器安装或稳定提效测量。用户视觉接受仍待确认。

## 回退和停止位置

只撤销本任务增量，参考本任务保存的原件；不 reset/clean 整个工作树，不修改旧 source-lock。新增快照按新身份保留，衍生记录与差异独立登记。公共资产发布、全库迁移、用户视觉接受及稳定提效均未授权或未验证。
