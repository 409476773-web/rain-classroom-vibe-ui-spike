# 附件验收记录与全库索引阻断收口

2026-10-16 · card-v2 · System Mode。

用户要求继续检查此前附件验收记录缺失与全库索引阻断，发现问题直接修复并完成相关登记收口。

## 当前事实与处理

1. 原缺失的 `evidence/runtime/attachment-visual-2026-10-16/verification.md` 现已由附件任务补齐，且进入该轮来源绑定。当前附件视觉接受记录在 `evidence/runtime/attachment-visual-acceptance-2026-10-16/`。本轮先核对当前事实，没有补造历史测试或重复授予验收。
2. 当前 Manifest、Registry item、阶段中的独立接受块一致，人工接受范围为 `current-attachment-preview-visual-only`，用户原话是“确定。完成视觉检验”。Registry 容器和历史功能/视觉叶节点保留原阶段状态。这些不是当前缺失项，不能统一改为已通过。
3. 全库资产索引引用、导出和生成内容检查已恢复通过。当前附件验收链4项检查通过；92项源码/元数据、7项证据、3项前驱摘要共102项绑定全部匹配，84项接受版本源码与基线相符。
4. 附件任务更新了共享索引、G6指南和阶段记录，导致 Composer run-10 的三项全文件摘要过期。本轮新增 [Composer run-11 后继绑定](../conversation-composer-2026-10-15/run-11/verification.md)，同步其 Registry/Manifest 的当前技术证据；20项已接受运行源码、原接受决定和历史报告保持。当前专项核查恢复7/7通过。共享三文件没有再被改写，附件接受绑定保持有效。
5. 索引测试暴露了两个检查方式问题：权限变更测试直接依赖不断演进的全局阶段；两次完整扫描又触发默认5秒超时。本轮仅修改 `scripts/asset-index.test.ts`：权限测试使用已有且SHA固定的历史检查点，加上当前被测的单条授权，保留全部原有正向/拒绝断言；真实资产仍从当前工作区完整读取，只在初始化读取一次，初始化预算30秒。当前生成索引的逐字比对继续执行，没有放宽权限校验器、修改生成器或修改批准状态。

## 实际验证证据

- `current-acceptance.log`：当前附件接受检查4/4通过，涵盖接受版本、用户决定、限定阶段差额与当前索引。
- `asset-index.log`：`node scripts/asset-index.mjs --check` 全库通过。
- `index-tests.log`：修复前3失败/1通过，保留原始超时与阶段耦合错误。
- `index-tests-fixed.log`、`index-tests-confirmed.log`：修复后原4项测试全部通过；后者为主代理复跑。修改前的精确版本位于 `before/scripts/asset-index.test.ts`。
- `typecheck-tests.log`：测试源码类型检查通过（exit 0，成功时无输出）。
- 原 `composer-governance.json` / `.log` 保留本轮发现的6/7失败基线；最终7/7证据位于 Composer run-11 的 `scoped-governance.json` / `.log`。
- 本轮当前摘要、登记结果与未改范围见 `source-bindings.json`、`verification.json`。

## 旧轮次脚本的适用范围

本轮最初直接重跑旧功能和旧视觉脚本。它们硬编码旧阶段的路径、完整阶段快照及 awaiting_human 假设，会覆盖各自固定的 `scoped-governance.json` 输出；当前多轮迭代后不满足这些旧前提，因此分别产生4/6和2/6失败。实际输出另存为 `legacy-functional-check.json`、`legacy-visual-check.json`，原样保留，不推测恢复为历史通过结果。

上述两份可重跑检查输出不在当前源码绑定、基线或前驱封印中，当前附件接受链未受影响；原单元、浏览器、类型和构建日志未修改。当前复验入口为附件视觉接受目录的 `verify.mjs` 及全库 `asset-index.mjs --check`，本轮实际结果如上。旧报告的历史运行范围继续有效，不把旧阶段脚本的当前复跑当成当前实现回归失败。

## 收口状态

此前附件报告缺失与全库索引阻断已消除，相关登记一致性和关联摘要问题已处理。附件沿用既有当前预览视觉接受，Composer 沿用当前本地版本整体接受。真实业务接口后续接入；真实设备、广泛对比度、生产与发布状态仍按各自原记录执行。

本轮没有修改已验收的运行实现，没有新增人工批准，没有发布、Figma写入、业务迁移或Git提交。本次新增独立复核记录，当前已有的正确附件登记保持原样。
