# E2 课堂互动：G3 review-02 局部修订

身份：`local-experiment`，Mock 数据；本记录是 AI 自查与实际运行证据，G3 人工视觉确认仍待完成。

按照用户批注 7–11，主标题使用 Rain 16/22，摘要合并为标题/状态和类别/成员/成绩两行；实测摘要为 62px。活动保留“课堂内/课后”分组和纵向公共 ObjectNavigator 卡片，类型 Tag 与参与情况同排；小组使用 72px 紧凑行，姓名、人数、成绩与提交状态各有位置。右侧正文按“小组观点 → 观察依据 → 下一步验证 → 教师反馈”组织，用对齐和轻分隔表达阅读层级。反馈使用真实公共 Textarea `appearance="filled"`，没有私绘字段配方。

成员由固定三组的 4/5/6 人数据生成。姓名、学号、分工、人数都来自同一组；15 个稳定学生 ID 在完整集合上一次调用公开 `assignAvatarAssets`，再使用 `Avatar size={32}` 与 `avatarAssets` 真实本地 PNG。活动切换不重新分配头像；反馈仍按活动/小组 ID 存储。成员行提供 `.w6-member-list > li`、`data-member-id`、`data-student-number`，名单可访问名称为“第一研究组成员”等；头像旁已有姓名，Avatar 使用空 alt 避免重复朗读。

方法 V01/V04/V05、D01/D02/D03/D05、I01 与主任务设计记录保持一致：保留 Rain 语义色、字体与当前空间模型，以信息主次、紧凑元信息和完整内容域改善密度。本页选择没有提升为全局设计规范。

验证记录：

- 新增 3 条成员/身份/反馈测试：先红（缺失完整成员名单、反馈仍 outlined），后绿 3/3。
- Playground 类型检查 exit 0。初次合跑旧场景检查为 9/10，唯一失败来自并行 E3 修改后旧 group/button 查询；旧测试由 root 维护，本 E2 agent 未改它。
- Chromium 真实页面在 1343/1200/1600/996×747 及 1200×420 查看；10 张提交/成员截图，主标题均 16/22、摘要均 62px、小组行 72px。filled 背景实测 `rgb(245, 247, 254)`；无水平溢出、活动名未裁切、页面错误 0。
- 完整三组共 15 张公共头像全部加载/解码为 240px 源图。跨活动的成员 ID、姓名、学号、分工、图片一致，活动/小组反馈各自保留。
- 996px 成员页反馈正常滚动可达并可编辑；420px 短高的课后活动正常滚动可达并可激活，另附滚动状态截图。
- `protection-after.json` 证明 E1、E3/E4 导出与 E5 源段均逐字保持；consumer.css 原有前缀逐字保持，新增规则全在 E2 `w6-interaction-workspace` 作用域。公共资产、Token、依赖、Git/Figma 未修改。

证据：`unit-red.log`、`unit-green.log`、`types.log`、`runtime-self-check.mjs/json/log`、`summary.json`、`source-lock.json`。源预览为 `http://127.0.0.1:5204/navigation-v042-w6-consumer.html#E2`；root 另负责独立复核、导出与人工预览。
