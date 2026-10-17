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
