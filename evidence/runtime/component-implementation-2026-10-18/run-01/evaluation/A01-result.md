# A01 · 冻结 AI 评测协议与需求

## 基线与范围

- 输入：工作包 A01、09-AI评测协议、Starter/AI 手册、独立需求蓝图与记录模板；对应 AI-EVAL / GOAL。
- 实际工作树：`github-review-20261017`；HEAD 为 `6a2364c8b0325a243b2de8ebe12361e305aab333`，与计划提交一致。已有修改保留；A01 仅新增本批 evaluation 目录，运行日志由整合者提供的记录工具写入本批 checks/A01。
- 当前模式：System Mode 的评估资料与证据准备；不修改设计方法、组件、生成器、Registry 或已有接受状态。
- 环境：macOS arm64，Node v24.13.0，pnpm 10.28.1。未安装依赖，核验脚本仅使用 Node 标准库。
- 当前结果：`fixed-and-verified`，范围仅为 A01 协议、题目、合成数据、schema 和封存完整性。当前有效版本见 [active-version.json](active-version.json)：`rain-component-implementation-A01-v2`。

## 实际发现与改动

原模板是一份待填 JSON，尚无可执行的记录结构校验；独立题蓝图也没有合成数据、明确执行预算或快照派发绑定。新增了六维评分规则、10/12 且 0 硬失败门槛、污染与修改归因、允许输入、预算、首次选型/T0/F0/S1/R1/E1/E2 封存规则，以及 12 条校准、3 条独立 E0 和分文件 E1/E2。

三题经实际源码核对：EVAL-01 增加逐单元多资源草稿与检查定位；EVAL-02 跨筛选保留选择，与 BM-A 的筛选清选择合同不同，同时承认可见 P5 范围确认经验的重叠；EVAL-03 保存复评后明确保留当前对象，与既有连续批改保存后前进不同。均允许合法复用组件，不声称模型未见过同类场景。实际最终 Starter 的可见材料须在 A02 前再次绑定，当前字段留 null。

首次 v1 核验真实发现 EVAL-03 长答案未达到预登记 >160 字覆盖断言。v1、seal 和失败日志均保留，没有降低断言或重签旧 seal。新增 v2 合成长段落并记录 revisionReason；尚未运行消费者，故没有消费结果被覆盖或重新计分。

主要产物：

- [v2/evaluation-protocol.md](v2/evaluation-protocol.md)、protocol.json：冻结规则与预算。
- v2/calibration：12 条公开问题与分离的评估侧评分方向。
- v2/independent/EVAL-01…03：各自 E0、data、E1、E2；不得把整个目录发送给首稿消费者。
- v2/evaluator：独立评分规则、6 个必需业务流程/例、每次 3 个改造断言及新颖性源码哈希。
- v2/evaluation-record.schema.json、record-template.json、dispatch-binding-template.json：最小可验证记录及实际派发绑定模板。
- [v2/frozen-manifest.json](v2/frozen-manifest.json)：26 个文件的 SHA-256，文件清单摘要为 `ff5f98bbde01bc08c2bca00b91c34c5fe040e0274d8128d765500b8b220c0aae`。
- v2/verify-a01.mjs：完整覆盖该最小 schema 所用关键字的本地校验器；不支持的 schema 关键字拒绝，不静默忽略。

## 保留的合同

公共 API、Manifest/Registry 身份、来源锁、M1/M2、StrictMode、历史视觉接受均未改。消费评测统一预登记 M1；S01 仍须独立检查 M1/M2。消费代理必须新上下文，仅收到最终冻结 M1 与当前 E0/数据；E1/E2 逐次派发。共享包/锁/方法只能只读；必要系统修复回到责任任务。新上下文与路径白名单不能被描述为物理沙箱或统计盲测。

## 验证证据

命令 cwd 均为上述实际仓库根目录。

| 命令 | 实际结果 | 输出 | 范围 |
| --- | --- | --- | --- |
| `node scripts/run-component-check.mjs A01 frozen-protocol-integrity node evidence/runtime/component-implementation-2026-10-18/run-01/evaluation/verify-a01.mjs` | exit 1；5 组通过，长答案覆盖断言失败 | [首次日志](../checks/A01/frozen-protocol-integrity/output.log) | v1 协议与输入完整性，失败保留 |
| `node scripts/run-component-check.mjs A01 frozen-protocol-v2-integrity node evidence/runtime/component-implementation-2026-10-18/run-01/evaluation/v2/verify-a01.mjs` | exit 0；6 组通过 | [v2 日志](../checks/A01/frozen-protocol-v2-integrity/output.log) | SHA、12/3/6 数量、数据边界、模板和缺字段/伪通过/假人工接受等负例 |

浏览器与视觉范围：本任务无 UI 修改，未运行浏览器，不产生视觉接受。未执行 CAL 回答、独立生成、类型/构建/交互、A/B、设备/读屏或生产检查。A02/A03 的时间、tokens、费用与可见模型配置未采集，模板均为未执行/null。没有 Human Gate accepted。

## 回退与下一步

A01 没有修改共享实现。需要回退可从主任务索引解除本协议引用，保留整个证据目录；不能把已发现数据覆盖不足的 v1 重新标为可用。题目或评分变化须新增版本及 seal，保留原题和可比范围。

下一步：M03 可按冻结校准范围继续；A02 依赖任务完成后重新生成、导出、检查最终 Starter，建立真实派发绑定和保护文件哈希，再以全新上下文逐例执行。A01 产物不等于最终消费包已可用或评测通过。
