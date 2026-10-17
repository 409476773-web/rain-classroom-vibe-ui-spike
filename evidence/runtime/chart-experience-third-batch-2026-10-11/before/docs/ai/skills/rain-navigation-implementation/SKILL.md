---
name: rain-navigation-implementation
description: 将已认可的 Rain 导航基线增量组件化，检查 Tabs、ConnectedSurface、可恢复工作区及 R/S 配方的视觉与交互。用于库内实施与回归，不用于重新视觉设计。
---

先读实际 [AGENTS](../../../../AGENTS.md)、[阶段](../../../../status/current-phase.yaml) 与任务指定工作包。此文件是仓库内候选 Skill 源文件，尚未安装到全局技能目录。

1. 核对实际 checkout、已有修改、当前批次与权限。保护既有阶段记录和人工验收。
2. 从 [导航基线](../../navigation-v042.md) 定位冻结 HTML 与哈希；实际打开、操作、测量并截图。改候选实现，不改基线降低验收要求。
3. 视觉家族读 [UI 消费合同](../../navigation-v042-w3.md)；区域状态读 [工作区合同](../../navigation-workspaces-v042.md)。复用实际公共导出与原有 Rain 图标，保持默认消费者兼容。
4. 业务配方读 [R4–R6 合同](../../navigation-v042-w5.md)。当前对象、范围、评分、草稿与播放由宿主拥有；显隐、调宽、专注与主题变化不得保存或提交业务。
5. 用同尺寸、同子场景、同状态的原稿/实现对照验证；R1/R3/R4 都有两个子场景。检查恢复、首击、嵌套 popup、短高菜单与实例隔离。
6. 更新当前源码哈希、Manifest、Registry、批次报告与差异。只登记真实执行过的检查；G2/G3 由用户确认，发布与 Git 操作另需明确授权。

本地视觉别名不能倒流重置 Foundation。不要将原稿 debug 全局、DOM 重写脚本、评审台或业务 Mock 搬进共享 UI/Layout。没有已认可外形的新增结构先登记 local-experiment。
