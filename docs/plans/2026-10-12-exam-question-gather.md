# Exam question gathering implementation plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 支持以本次已选题为参照保序归拢，并消除无变化结果的插入预览冲突。

**Architecture:** 沿用页面私有 `moveQuestions` 和现有 Dialog / RadioCard / Select。以原卷中的插入间隙计算移除后的落点；参照题也在移动集合中时，前后间隙合并为保序归拢，参照题的原位置保持不变。

**Tech Stack:** React、TypeScript、Rain UI、Vitest、Vite。

---

用户于 2026-10-12 确认保序归拢，随后明确要求开始修改原型。Prototype Mode / local-experiment，仅改 `apps/prototype/src/scenarios/exam-editor/{state.ts,page.tsx,page.css,state.test.ts,page.test.tsx,design-notes.md}` 与本计划。共享组件、导出、Registry、全库阶段及其他业务入口不变；无新增依赖、Git 提交或发布。

参考当前页面、用户本轮截图与 VE-006 的组卷视觉血缘。V05 用于让选择、动作与预览对应；D01 保留“选参照题 → 看结果 → 确认”的操作关系；I03 用于表达原卷参照与移动后题号。沿用当前视觉和搜索/密度设置；不重新设计完整布局。归拢表达是否直观仍待用户操作确认，真实性能未测。

### 1. 先验证排序与反馈缺口

- 扩展 `state.test.ts`：零散选择以首题、中间题、末题为参照，验证保序、参照题位置、对象身份及前后等价；保留非法输入和无变化检查。
- 更新 `page.test.tsx` 的旧禁用预期，增加选中题归拢、切换参照身份、连续选择无变化、全选、取消及撤销检查。
- 运行 `pnpm exec vitest run apps/prototype/src/scenarios/exam-editor --maxWorkers=2`，确认失败来自旧规则。

### 2. 最小实现

- `state.ts` 不再拒绝集合中的目标；插入索引等于原间隙前剩余未移动题的数量。单题上/下移调用保持原行为。
- `page.tsx` 放开所有参照题，以“本次已选”标记来源。选中目标隐藏前后 Select；其他目标保留原有前后插入。根据用户后续反馈，单题/多题共用“将 N 道习题移动到第 X 题”句式，预览与成功提示统一用“移动”，不在业务界面解释保序归拢术语。
- 无变化时只显示“已在此位置，无需移动”，不显示插入/归拢预览；确认禁用。依照用户后续浏览器标注，有效变化不显示底部“移动后位于第 A–B 题”小字。
- `page.css` 仅补充就近归拢提示的 Token 样式，并按后续浏览器标注将行内提示居中。沿用原取消、焦点、撤销、题型和分值保持逻辑。
- 浏览器复现撤销提示覆盖批量移动入口（点击命中 `.em-toast`）；将局部提示移至底部，避免阻断下一次移动，并检查入口实际可点击。

### 3. 验证与记录

- 运行上述定向测试及 `pnpm --filter @rain-next/prototype build`。
- 在实际 `http://127.0.0.1:5369/#exam-editor` 检查单题自身、零散多题归拢、连续多题无变化、外部参照前后、取消、撤销、40 题/140 分与三种展示模式。
- 查看整页及弹窗状态，留存本轮证据并更新 `design-notes.md`。记录自动验证、真实浏览器检查与待用户确认范围；不把已有规则确认算作最终视觉验收。
