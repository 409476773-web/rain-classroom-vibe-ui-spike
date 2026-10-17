# 学习报告 V2 实施计划

**目标：** 按用户确认的第二版留白修订稿实现现有 `#learning-report`。

**架构：** Prototype Mode / local-experiment。保留 BM-D 宿主的筛选、加载、统计状态与原 `#bm-d`，以页面私有组合承载概览、双指标比较、蓝色缺口柱图、完整明细。复用 Rain UI、现有图标、Token 与 Recharts，不增加依赖。

**技术：** React、TypeScript、Rain UI/Layouts、Recharts、Vitest、Playwright。

依据：[已确认视觉稿](../design-reviews/learning-report-v2/visual-proposal-refined.png)、[设计方案](../design-reviews/learning-report-v2/design-proposal.md)、原型设计入口、BM-D 状态合同及当前阶段。用户本轮明确授权开始实施；局部蓝紫配色和浅渐变遵从已确认稿，不赋予 AI 身份或改变共享颜色规则。

1. 更新 BM-D 定向交互检查：趋势开关只影响趋势，双指标比较与缺口保持；全局筛选同步全部章节；单班去掉比较结论；缺口零值与缺测不混淆。先运行确认新行为尚不存在。
2. 修改 `apps/prototype/src/scenarios/bm-d/{page.tsx,report-sections.tsx,trend-chart.tsx,report-a.css}`：统一三个章节表面，概览与趋势合章，比较两指标并列、缺口图与就近解读 7:3，明细合并份数并加入缺口列。保留图表键盘读数，撤下重复常驻读数。
3. 使用已有字号、间距和表面 Token，章节间 24px、内边距 24–32px；按内容容纳能力在窄屏堆叠，表格局部横滚。尚待验证：实际字体/控件渲染后的疏密及小屏交互。
4. 定向测试、原型构建；浏览器实看桌面及手机、键盘/筛选/失败恢复，保存整页截图。更新状态合同与本计划结果，页面视觉验收保持待用户评审，不运行发布或 Git 写操作。

## 实施结果

以上四步已执行。构建通过，状态测试 8 / 8、浏览器检查 2 / 2 通过；完成 1440、1115、900、390px 整页查看与深色检查。最终图表、间距和筛选行为见 [验证记录](../../evidence/runtime/learning-report-a/v2/verification.md)。

全库 Token 消费登记和 Day 3 边界检查尚未通过，浅色辅助文字存在低于 4.5:1 的组合；未修改共享检查器或擅自赋予对比度验收。页面本地实现完成，整页视觉评审与系统治理验收分别保持待处理。
