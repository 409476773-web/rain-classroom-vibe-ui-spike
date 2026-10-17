# 导航独立消费验证 · W6

当前共享导航 UI / Workspace / ConnectedSurface 仍为候选，业务配方仍为 local-experiment。G1 与 G2 candidate13 已接受的运行视觉范围保留；E1–E6 新宿主不继承该接受，也不获得发布、完整对比度或读屏接受。仓库内[组合 Skill](skills/rain-navigation-composition/SKILL.md)用于本轮按需加载，不表示全局安装。

先查[资产索引](asset-index.md)，命中后查实际 Manifest/Registry 和导出。固定课程/课堂 Mock 只可作为结构与行为来源；新业务若无法用高层 Recipe 的现有 slots/props 注入内容，退回公共 Layout/UI 组合，明确记录原因，不能声称复制了该 Recipe。

独立入口 `/navigation-v042-w6-consumer.html#E1` 到 `#E6`，只加载消费者宿主与公共包，不加载 Playground App、原稿 iframe 或 debug API。源码位于 `apps/playground/src/recipes/navigation-w6/`；验证结果与来源 patch 位于 `evidence/runtime/navigation-v042/w6/`。

| 任务 | 业务要求 | 必查边界 |
| --- | --- | --- |
| E1 | 公共资源包、200 班级和长名称 | 公共首位、More 检索全范围、当前末槽、双行身份、inset；稳定 ID |
| E2 | 课堂互动活动与小组详情 | 活动身份/小组选择/详情一致，不能误套学生评分 |
| E3 | 左学生队列隐藏、右评分常驻 | 学生/题目身份、未保存草稿、布局调整不提交成绩 |
| E4 | 回放、讲稿和临时知识索引 | 非模态临时层不挤正文，专注退出恢复原偏好与播放位置 |
| E5 | 只改一个实例为紧凑目录 | A/B 对照，公共 CSS/Token 无 diff，另一实例值/尺寸不变 |
| E6 | 教务资料队列、预览、审核意见 | 无课程/学生身份；稳定资源 ID；双侧恢复；逐对象意见归属 |

来源记录要包括实际读过的合同、sourceAssetId/sourceVersion/hash、instanceId、modifiedParts、理由、测试和 reviewState。不得把简单测试成功写成新外观合格。所有文本数据为脱敏 Mock，评分/保存只记录当前内存动作。

W6 同步补齐工作包 24 项 __W0_MAP__ 映射，实际 YAML 为单一运行合同；工作包 JSON 是指向它的映射示例。R2 36px 辅助行仅补登记既有 CSS 值，未改已接受源码。Asset index 已可正常生成、查询，早期 ui-command 阻断属于历史状态。


## G3 第一轮人工反馈后的本地修订

E1–E6用于验证新业务是否能直接消费导航和工作区资产。本轮用户已确认范围与草稿归属、评分常驻且布局不提交、临时面板不挤正文、实例A/B隔离等具体行为；这不等于接受全部新页面的外观。

修订只在W6页面组合：E1轨道BackgroundNeutral2、辅助TextNeutral6/竖分隔与Tag20；E2课堂内/课后活动卡片与所选活动的小组队列形成主次层级；E3左主对象队列、中间另一维选择和题干/答案/评分参考、右InputNumber与显式草稿；E4主题板书、播放进度、章节/当前讲稿、知识索引与整课笔记；E6类型/彩色评审状态Tag20、左右边缘IconButton恢复、评审标题在自身滚动区吸顶。E5不改动。

新增`workbench-parts.tsx`仅提取原页面的布局构造与工具栏，E3/E4分别在`grading-workbench.tsx`、`replay-workbench.tsx`，公共UI/Layout、Token、既有R/S示例保持。数字评分仍以稳定试卷/题目/学生键关联，回放为可操作模拟媒体，资料预览为Mock文本；点击保存只记当前页面内存，刷新清空。

本轮证据独立保存在`evidence/runtime/navigation-v042/w6/review-01/`，新的可编辑及静态预览候选以`navigation-v042-2026-10-04-review-01`命名。原W8-d8d01be911e47a2f及W7冻结/G1/G2历史不覆盖。新视觉仍待人工复核；全项目质量、完整对比度和辅助技术的既有边界不变。
# 当前审阅状态 · 2026-10-05

用户确认“确定。完成该阶段审阅。继续往下推进”。review02快照`navigation-v042-f43719b448cf6043`的E1–E6运行视觉、信息组织、本地AI消费/实例隔离及当前本地交付已接受，[决定范围](../../evidence/runtime/navigation-v042/g3-acceptance-review02/acceptance.json)。上文制作时的pending状态保留为历史；整体W7质量、完整对比度/AT仍开放，候选未发布。

本轮经验回写到[设计方法库](information-design.md)的V04、D02、D03、I01和[原型指南](prototype-design.md)。冻结97与原ZIP不改写；此后两份消费指南仅同步文档状态，具体差额在验收目录`record-checks.json`中登记。
