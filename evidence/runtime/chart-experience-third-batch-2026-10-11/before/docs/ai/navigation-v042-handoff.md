# 导航 v0.4.2 · 当前交付、版本与迁移

W6六个独立消费者、W7限定回归及W8本地源码/预览包已完成技术准备。G3人工、完整无障碍/对比度与全项目质量门仍开放；共享资产保持Registry Candidate，R/S/E消费者是Local Experiment。

入口：[可编辑包说明](../../artifacts/navigation-v042-2026-10-04/README.md)、[源码ZIP](../../artifacts/navigation-v042-2026-10-04.zip)、[免依赖预览ZIP](../../artifacts/navigation-v042-2026-10-04-built-preview.zip)、[当前HTTP预览](http://127.0.0.1:5368/#E6)。源码默认 `pnpm install --frozen-lockfile`；包内typecheck/test/build通过，但本轮离线全新安装缺Playwright tarball失败，包不附依赖。免依赖预览经独立ZIP解压HTTP检查。

当前行为版本 `local-2026-10-04-navigation-v042-W7-hover-reentry`，唯一共享变化是Escape后的hover抑制清理；[版本差额](../../evidence/runtime/navigation-v042/w7/repair-source-lineage.json)保持G2历史43文件。当前交付冻结81项，[独立归档验证](../../evidence/runtime/navigation-v042/w8/archive-independent-validation.json)与2268文件包锁可核对。旧消费时来源记录不重写为新版本。

既有Tabs/Select/Card无废弃、改默认或自动迁移。按Template→Block→Pattern→Layout→UI检索；固定Recipe无法注入目标业务时明确退回公开Layout/UI。业务对象、请求、权限、保存和路由归应用adapter；共享Layout只承载空间/会话/布局偏好。复制Recipe记录原ID/来源版本/hash和局部差异，实例密度使用显式局部patch，禁止静默修改共享Foundation。

Figma映射是页级来源参考，未建立/声称组件绑定；完整历史约1.9GB不随包搬运，未附引用在provenance列出。包内“恢复默认”重建内存实例并恢复Mock草稿，不删除无关localStorage。生产持久保存、完整读屏/对比度、实际Safari、远程Registry、发布与业务迁移需独立硬化工作，当前没有新增Git/Figma/发布授权。

技术结果与失败边界见[W7汇总](../../evidence/runtime/navigation-v042/w7/verification-summary.json)及[本轮W8报告](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack/reports/W8-handoff.md)。全项目147单元失败、浏览器5失败/516未跑及对比度低值保留；不以局部通过替代这些Gate。
