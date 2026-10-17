# RN-14 连续 AI 改造与独立消费验证

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 验证 BM-A/B 各一次生成、两次连续结构修改，以及固定源码快照在独立目录的构建、运行和嵌套浮层。

**Architecture:** 最小本地导出流程复制现有三个源码包、必要配置和 BM-A/B 起点，不创建在线 Registry 或新的组件体系。每轮在独立样本中改造，保存输入/输出哈希、源码、差异与真实运行证据；共享源码和非目标样本冻结。

**Tech Stack:** 当前锁文件中的 React、Vite、Tailwind、pnpm、Playwright，Node 内置文件与校验工具。

## 授权与边界

用户在 RN-13 交付后要求“继续下一步”，即已说明的 RN-14。沿用 `codex/card-v2` 工作树，System Mode（本地导出与验证基础设施）；生成样本均为 `local-experiment`，不进入默认检索。原组件、原 BM-A/B 和已有 Gate 保持。RN-14 新样本 Human Gate 待确认；颜色、发布、迁移、Figma 与 Git 状态独立。

已核对当前 phase、V2 RN-14/15、RN-13 证据、Benchmark/VE 索引与原型入口。VE-001/009/014继续作为结构来源；本轮不重新声称现场 Figma 检查。RN-13遗留9项历史回归失败与3处Dialog测试类型声明错误已记录，RN-14不改旧SHA或放宽旧断言。

## Task 1：固定可消费起点

- 新增 `scripts/rn14-starter.mjs` 及一个可运行的 `scripts/rn14-starter.test.ts`。先验证缺少导出能力的失败，再验证输出可独立解析、拒绝覆盖/内部目标/符号链接、共享源码字节保留及快照过期检测。
- 导出三个包的现有源码及必要应用文件、精确锁文件；根运行命令只指向独立应用。生成简短BM-A/B双入口，不引用原仓库绝对路径或文档站。保留来源Commit与脏工作区内容哈希，不能把HEAD冒称为完整输入版本。
- 新建 `evidence/runtime/rn14-editability/`：开工基线、冻结Starter归档、真实命令与输入暴露记录。安装使用已有锁定版本，优先离线安装；不改仓库依赖或软链原仓库node_modules。
- `status/current-phase.yaml`、`scripts/verification-helpers.mjs`、`scripts/verify-boundaries.mjs`只加入本批精确记录与文件范围，既有阶段不变。

## Task 2：六轮真实改造

采用 subagent-driven-development：每个场景由独立实现代理执行生成，随后给出两条独立的结构修改指令；每步通过检查后才开始下一步。在样本外记录代理实际读取信息，隐藏指标写 `not-measured`。适配来自现有源码的生成，不能宣称从零生成或盲测。

- BM-A生成：复用现有资料表配方，加入本地课程上下文区，保持紧凑列表、筛选/批量/分页与Mock状态。
- BM-A修改1：把筛选区域与结果操作区域分开，使搜索/状态筛选独立成行；保留原数据引擎与所有选择语义。
- BM-A修改2：把分页与批量反馈整理成分开的区域，窄屏堆叠；不丢失跨页选择和切换视图状态。
- BM-B生成：复用教材编辑场景，加入独立课程上下文区；保留最新脏草稿确认、校验、模拟保存与上传。
- BM-B修改1：把简介、作者简介、本书特色与目录合并成一个全宽阅读内容区，基本信息仍可双列；保留字段、数据和焦点定位。
- BM-B修改2：把附件从form内移到Dialog.Body内的独立末尾资料区，用显式form关联保留表单归属；保持单一固定Footer、附件校验与取消确认。

每轮记录prompt、模型可见身份/上下文、输入Commit+快照哈希、开始/结束时间、实际命令/退出码、变更行数、共享包及非目标样本哈希、截图与结构/交互断言。耗时仅为墙钟耗时，token、用户修正成本和效率百分比未测则 `not-measured`。

## Task 3：独立消费、复核与交付

- 在新的独立临时目录展开固定最终快照，再运行锁定安装、类型/构建与preview；核对依赖解析没有指向原仓库，运行代码和产物没有原仓库/文档站路径。
- 运行每轮目标结构与关键交互检查；最终运行 Chromium/Firefox/WebKit，覆盖BM-A筛选/选择/翻页与BM-B草稿/失败重试/固定底栏/嵌套Select和AlertDialog/焦点恢复，保留1440与390截图。
- 使用 requesting-code-review 技能完成独立需求复核及代码复核；处理本批发现，记录历史欠项。
- 更新 `docs/ai/README.md` 中 RN-14 状态和体验入口；生成 `verification.md`、每轮指标与来源记录。RN-15整体交付、BM-C/D同类测评仍为后续工作。

## 未验证假设

现有锁文件在去掉文档站应用后能否完整离线安装、各源码包是否隐藏依赖原仓库路径，以及连续改造后的窄屏与嵌套浮层是否保持，均以本轮实际运行结果判断。

## 执行结果

Task 1—3限定技术范围已完成：六轮改造逐步通过，固定最终快照为 `rn14-90fc74205a764fb1`；在新目录实际安装、类型检查、构建及三浏览器运行通过。独立需求与代码复核通过，无未解决P1/P2。原仓库2,088个运行文件与旧phase保持，未测效率指标不补值。详细命令、差异、范围证明与历史9项测试/3处类型欠项见[本批验证](../../evidence/runtime/rn14-editability/verification.md)。

用户随后回复“确认”，最终快照的BM-A/B运行视觉已按[独立确认记录](../../evidence/runtime/rn14-editability/human-gate.md)接受；计划开工时的待确认说明保留为历史。颜色、发布、迁移与Git状态保持独立；下一步为RN-15，不将本轮结果扩写成M1整体完成。
