# G6 制作前研究核验

日期：2026-10-14。范围：调研文档、详细计划、三项依赖及十二项建设授权登记；运行实现未开始。

交付：[调研与逐项规格](../../../docs/research/2026-10-14-g6-component-research.md)、[制作计划](../../../docs/plans/2026-10-14-token-first-g6.md)、[本次用户授权](authorization.json)。旧 [阶段记录](../../../status/current-phase.yaml) 保持原样。

## 研究方法

- 三组并行核对十二项固定源码、同版 Nova 样式、精确引擎 API 与成熟官方参考，主任务合并源码事实和 Rain 适配决策。
- 原始来源锁继续使用 [G6 preflight](../g6-preflight-2026-10-14/source-lock.json)。本轮补充固定 shadcn 工具 CSS 和 globals，以查清 shimmer、scroll-fade、圆角等真实来源，见 [来源补充](source-supplement.json)。不改写旧 source lock 或旧 G5 证据。
- 独立复核重点为 Parts 完整性、授权/实现状态、动效与几何的来源差额、原十二项分母、制作与验收顺序。
- 当前 shadcn 官网浏览器观察：Attachment 默认/五态；Questionnaire 未选/选中；Drawer 展开。仅用于信息层次和交互入口的研究，不是固定版本像素复刻或 Rain 运行验收。未把实时网页作为源代码版本锁。

## 自动检查范围

结果记录在本目录 `planning-check.json`；检查授权三版本、十二项与原范围一致、旧阶段文件原样、保存来源哈希、调研/计划相对链接及关键本地基线。另存恢复旧阶段后的只读 G5 检查结果 `g5-readonly-governance.json`。没有为本次文档变更运行全库测试，也不将此前类型/SSR 探针写成本轮 G6 浏览器检查。

首次试加 G6 阶段节点后，文档/范围检查通过（`phase-addition-check.json`），但 G5 只读检查在 `verification-helpers.mjs:2419` 失败：旧 library governance 要求整个阶段文件哈希不变。逐节点对照确认仅新增 G6；撤回该临时节点恢复文件原文，用户许可转存本目录，失败与处理见 [探针记录](phase-registration-probe.json)。正式制作 Task 1 必须新增有限后继以兼容 G6 登记和后续源码变动，不能更改旧基线或忽略该错误。此接入尚未实施。

## 状态边界

最终限定检查结果：原十二项和三项已授权版本一致；30 份保存来源哈希一致；23 个相对链接有效；17 个基线文件（含阶段、运行入口、依赖及旧来源锁）与本轮前态相同。G5 只读治理检查恢复通过，仍报告 4 项 contrast findings；没有将这些旧发现关闭或升级为验收。

独立文档复核已修正：AttachmentGroup 只有横向滚动而非独立 orientation；Questionnaire 圆角为主题语义值、窄屏 44px 来源明确；Scroller 的首尾命令只实际消费 behavior，按 ID 命令才消费 align/margin；Drawer 的手势时序、遮罩强度与 modality 分开。旧阶段整文件冻结的问题保留为 Task 1 的明确接入事项。

依赖许可已获得，尚未安装。组件源代码、出口和依赖清单本轮未修改；计划中的文件、示例与检查属于后续执行工作。人工视觉、对比度、Safari/VoiceOver、物理触摸、系统中文输入法和生产性能尚未验证。未提交、推送、发布、写 Figma 或迁移业务。

上一轮 [preflight verification](../g6-preflight-2026-10-14/verification.md) 是当时“依赖待授权”的历史事实；当前用户许可见本轮授权记录和制作计划，旧证据保持原样。
