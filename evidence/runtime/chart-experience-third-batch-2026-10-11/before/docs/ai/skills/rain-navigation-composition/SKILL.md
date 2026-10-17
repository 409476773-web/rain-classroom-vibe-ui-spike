---
name: rain-navigation-composition
description: 使用 Rain 导航列表、对象队列、Tabs、ConnectedSurface 和可恢复工作区组合高保真原型，并只调整指定实例的内容、密度或连接方式。
---

先读 [原型规则](../../prototype-design.md)，按需读 [UI 选择](../../navigation-v042-w3.md)、[工作区组合](../../navigation-workspaces-v042.md) 与 [业务配方](../../navigation-v042-w5.md)。此文件是仓库内候选 Skill，未安装、未发布；2026-10-05当前E1–E6运行视觉与本地AI消费/实例隔离已获G3范围内确认，整体W7质量门仍开放，见[独立决定](../../../../evidence/runtime/navigation-v042/g3-acceptance-review02/acceptance.json)。

按 Template → Block → Pattern → Layout → UI 检索实际 Manifest/Registry；确认生命周期、公共导出、源码及来源版本。planned 资产不能当可 import 组件。

- 功能目的地用 NavigationList/NavigationBar；当前处理对象用 ObjectNavigator；条件用 SegmentedControl；对象内内容用 NavigationTabs。不要靠动态 role 补丁替换真实语义。
- 每条共享边一个轮廓 owner，每个隐藏区域一个稳定外部恢复 owner。用 WorkspaceLayout 协调偏好/有效布局/暂态，业务草稿与身份放在宿主。
- 优先已有 Variant，再用局部 Recipe，最后才做局部 Fork。内容、密度和 connection 改造不重挂载另一实例，不改共享默认或全局 Token。
- 查看 [独立消费源码](../../../../apps/playground/src/recipes/navigation-v042/w3-consumer.tsx) 的实例隔离示例。复制时携带 Registry 声明的源码、样式与既有依赖，记录实例 patch；不能只复制一个 TSX 后称安装完成。
- 在 100% 原尺寸验证字体、间距、肩部和边界；在 1200 宽与短高窗口操作恢复和菜单。输入草稿、隐藏/恢复/专注、切当前对象并验证一致，再保存实例 A/B 对照证据。

新业务组合使用自己的稳定 ID 与脱敏数据，不把课程/学生 Mock 当通用合同。媒体、评分、图表均明确 Mock；导航行为不调用真实评分、发布、同步或 AI 采纳。新结构先 local-experiment，人工 Gate 与发布分别记录。

W6 的六个新宿主见 [独立消费合同](../../navigation-v042-w6.md) 和 `apps/playground/src/recipes/navigation-w6/`。消费入口需加载 Foundation、UI、Layout 样式，以及与既有消费者一致的 Tailwind/theme/source 编译入口；用实际渲染确认控件外观。宿主保留业务状态时，隐藏实例必须清理临时层、专注会话和 portal，不让它响应其他页面的 Escape。

当前案例：活动→小组→提交/成员区分层级；按人/按题只改变遍历顺序，学生/题目草稿保持稳定ID；类别/状态用小Tag，共有满分用普通属性；题目browser白底Tabs承载真实面板；隐藏侧区就近恢复，独立面板标题在其滚动区吸顶。紧凑摘要、filled字段按实例选择，先删除重复说明再调整密度。案例参数不成为共享默认，新的组合不自动继承当前审阅；完整对比度/AT和生产迁移另行处理。
