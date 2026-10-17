# W7 review02 对比度差额取样

快照：`navigation-v042-f43719b448cf6043`。本记录只增加审计证据，产品源码、CSS、Token 和两份 review02 ZIP 均不修改。

真实浅色消费页：12 个初始布局（E1–E6 ×1200/1440×900），另有 10 个1440关键状态；1个既有 dark Token 诊断样本单独统计，不代表 W6 提供逆色产品主题。

角色按真实任务用途分类。当前身份、队列进度、保存结果和可用动作不因字体小或颜色浅被归为可忽略辅助信息。
用户明确要求 E1 辅助小字很浅、使用竖向分隔。此偏好作用于被标明的被动范围描述/人数/学期/说明；不构成对比度阈值例外，也不推广到学生/资料身份、状态或操作。

| 角色 | 已测 | 未验证 | 低于文字阈值 | 最小比值 |
|---|---:|---:|---:|---:|
| 主任务文字 | 536 | 7 | 43 | 3.135:1 |
| 当前身份 | 218 | 4 | 49 | 2.2821:1 |
| 状态与动作 | 194 | 1 | 75 | 2.2821:1 |
| 辅助元信息 | 286 | 12 | 225 | 2.0133:1 |
| 表单提示 | 17 | 0 | 17 | 3.4642:1 |
| 禁用控件 | 9 | 3 | 不作通过判断 | 1.5579:1 |

同一文字在不同宽度与状态重复计数；不是不同缺陷数。完整选择器、字重/字号、角色理由、背景像素与阈值结果见每个 `cases/*-analysis.json`。

独立正文子集：39 个已测、1 个未验证、0 个低于阈值，已测最小 6.5648:1。主任务标签/资料类型/变量标签/满分约束仍有低值，不能将正文子集的结果推广为主任务信息整体通过。

测得透明背景样本 202；父级 opacity 可精确合成并通过实际背景像素交叉检查的样本 9；复杂背景像素取样 133。

本轮真实样本中背景图/渐变祖先为 0 个；复杂背景差额主要来自既有 SVG 连接曲面/页签及多层绘制。处理方法支持的背景图/渐变情况不能因此被表述为本轮已验证。透明 opacity 组与复杂背景可确定的 3 个样本单独标注。

方法：保留原始渲染截图，在隔离浏览器中临时隐藏文字颜色（几何保持），取得真实背景 PNG。纯色/alpha/父 opacity 用逐层 source-over 合成并与像素交叉检查；没有父 opacity 的 SVG/渐变/图像背景，以文字矩形内部所有像素的最小比值作保守记录。文字前景取 CSS 颜色，避免把抗锯齿边缘误当规定前景。

以下是仍低于阈值的代表样本，保留原样；没有据此更改已接受的视觉。

**主任务文字**

- E1-1200-initial：阅读材料 — 3.135:1（要求4.5:1）；Task heading, body, table or uncategorized visible text conservatively treated as task content.
- E1-1200-initial：资料模板 — 3.1911:1（要求4.5:1）；Task heading, body, table or uncategorized visible text conservatively treated as task content.
- E4-1200-initial：当前章节 — 3.2355:1（要求4.5:1）；Task heading, body, table or uncategorized visible text conservatively treated as task content.
- E2-1200-initial：课堂内活动 — 3.4144:1（要求4.5:1）；Task heading, body, table or uncategorized visible text conservatively treated as task content.

**当前身份**

- E2-1200-initial：仅当前小组 — 2.2821:1（要求4.5:1）；Feedback scope binds editing to current group.
- E3-1200-initial：学号 — 2.2821:1（要求4.5:1）；Student/resource/version identity used to bind current task.
- E3-1200-initial：2026001 — 2.2821:1（要求4.5:1）；Student/resource/version identity used to bind current task.
- E3-1200-initial：第1题 — 2.2821:1（要求4.5:1）；Student/resource/version identity used to bind current task.

**状态与动作**

- E2-1200-initial：当前成绩 — 2.2821:1（要求4.5:1）；Every text node of current grade belongs to grade status, including its numeric value/unit.
- E2-1200-initial：8 — 2.2821:1（要求4.5:1）；Every text node of current grade belongs to grade status, including its numeric value/unit.
- E2-1200-initial：/10 — 2.2821:1（要求4.5:1）；Every text node of current grade belongs to grade status, including its numeric value/unit.
- E2-1440-members：7 — 2.2821:1（要求4.5:1）；Every text node of current grade belongs to grade status, including its numeric value/unit.

**辅助元信息**

- E4-1440-temporary-knowledge：02:10 — 2.0133:1（要求4.5:1）；Passive descriptive or supplementary information; no automatic threshold exception.
- E3-1200-initial：模拟作答 — 2.0292:1（要求4.5:1）；Simulation/category/association descriptor supplements independently measured task heading.
- E4-1200-initial：01 — 2.0304:1（要求4.5:1）；Sequence number supplements the separately measured action/criterion label.
- E4-1440-temporary-knowledge：03 — 2.0304:1（要求4.5:1）；Sequence number supplements the separately measured action/criterion label.

**表单提示**

- E2-1200-initial：结合小组提交与分工，记录具体的反馈建议 — 3.4642:1（要求4.5:1）；Editable field placeholder instructs a task; pale-metadata preference does not exempt it.
- E3-1200-initial：分数 — 3.4642:1（要求4.5:1）；Editable field placeholder instructs a task; pale-metadata preference does not exempt it.
- E3-1200-initial：结合答案写下评价与改进建议 — 3.4642:1（要求4.5:1）；Editable field placeholder instructs a task; pale-metadata preference does not exempt it.
- E1-1200-initial：填写当前范围的本地说明 — 3.7083:1（要求4.5:1）；Editable field placeholder instructs a task; pale-metadata preference does not exempt it.

未验证项：非文本对比度（边框、图标、滑块、焦点、分隔线、头像），完整 hover/focus/error 状态、离屏/裁切内容、真实 Safari、VoiceOver、Windows、完整多浏览器无障碍审计。复杂背景同时有组透明度、遮挡、阴影/滤镜等无法精确确定的样本明确列未验证。

此次真实页面文字结果：`measured-deficits-remain-no-conformance-or-human-acceptance`。视觉人工确认和可运行检查均不替代完整对比度合规。

保护记录：`protection-before.json` 与 `protection-after.json`；两份 ZIP 实测 SHA 一致且匹配既有档案。原97项冻结中两份 AI 指南由父代理按已确认设计经验合法回流；冻结及ZIP本身保持历史状态，另列产品运行源保护。

实际执行及日志：`commands.json`、`capture.log`、`analyze.log`。`capture.mjs` 与 `analyze.py` 位于本证据目录，使用既有 Playwright/Pillow，无新增依赖或联网。
