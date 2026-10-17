# W6 · 独立消费验证

E1–E6 已实现为六个独立业务宿主，入口 `/navigation-v042-w6-consumer.html#E1` 至 `#E6`。共享候选 UI/Layout 保留 Rain 来源，实例改造均为 local-experiment；新组合没有继承 G1/G2 人工视觉接受。

- E1：公共资源包与240教学班、全范围检索、同名稳定ID、移除/恢复当前范围及草稿。
- E2：活动/小组/详情身份一致；E3：学生/题目归属、常驻评分、布局操作不自动保存。
- E4：临时知识索引不挤正文，焦点、讲稿与播放位置恢复；E5：只改A实例，B值/尺寸保持。
- E6：新资料队列→预览→审核意见，无课程/学生身份，双侧恢复、逐对象意见归属。

首次问题与失败记录保留：控件样式编译入口缺失、隐藏工作区暂态/Escape残留、范围检索portal残留。修复只落新消费宿主。初轮7+6单元及后续生命周期4单元合计17通过；浏览器最终13/13通过，W7行为修复后再次13/13通过。独立复核无剩余P0/P1/P2。

读取 consumption-e1-e5.md/json、consumption-e6.md/json 了解真实选型/版本/来源及局部patch。固定R2/R4/R5的业务Mock无法注入时，已明确退回public Layout/UI，而非声称复制了高层Recipe。CSS入口补齐与生命周期red/green均留存。

W6来源记录保留实际建设时的W4候选版本。W7随后修复共享hover Escape重入行为，当前运行版本/源哈希见 ../w7/repair-source-lineage.json 和 ../w7/final-source.json；旧来源记录不覆盖。Human G3、完整对比度/VoiceOver、发布与迁移未授予。
