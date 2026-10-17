# 试卷习题移动原型

**目标**：按用户附件在 1440px Web 页面验证单题和批量跨题移动。
**模式**：Prototype Mode / local-experiment；当前总阶段不变。仅新增 apps/prototype/src/scenarios/exam-editor 与 main.tsx 的独立入口，共享 packages 只读，无新依赖。
**方案**：共用 816px Dialog，以试卷实际顺序呈现最多四行题干；选择目标题，再选择之前/之后。与行内两个操作按钮相比，固定位置选择减少重复；拖拽不适合长距离定位，首版不加入。
**来源**：用户本次截图为布局主来源；evidence/screenshots/VE-006.png 作为雨课堂组卷血缘补充；已读 AGENTS、SPIKE_BRIEF、current-phase、V2 Roadmap、prototype-design、图标规范与 Dialog/Radio/Checkbox 合同。公共对话框消费最新宽度、关闭、焦点规则。
**保持**：顶栏名称与保存，左侧题干/选项/解析/分值，右侧按题型分组、批量分值、快速定位。
**变化**：题目 Hover/键盘焦点显示移动到；选择后导入左侧出现批量移动；统一题号按整卷顺序，避免分组题号歧义。
**假设**：允许跨题型移动；材料题及其子题作为完整对象移动；本页示例数据仅用于交互演示，不接入真实题库与保存服务。

1. 在 state.test.ts 写排序检查，先验证缺失实现失败。state.ts 中实现稳定 ID 的剪切/插入，保持原顺序、分值与对象引用，忽略非法目标和无变化结果。
2. page.tsx/page.css 消费已有 Rain Button、IconButton、Checkbox、Input、InputNumber、RadioGroup、Dialog、Tag、QuestionNumber。页面局部 CSS 只用公共视觉 Token；固定桌面布局，不增加响应式工作。
3. main.tsx 注册 #exam-editor。弹窗先选目标、可搜索、标注待移动行、固定底部插入位置及确认；确认后同步排序与侧栏、清空选择、定位并允许撤销。
4. 定向 Vitest、原型 typecheck/build，1440×900 与截图原尺寸 1440×806 浏览器观察。验证单题、非连续多题、前后插入、取消、无变化、全部选择、搜索空、四行截断、焦点恢复、分值及题数不变。
5. 场景 design-notes.md 记录真实结果。实现与用户视觉确认分开；不改全库阶段，不写 Figma，不提交 Git，不发布。
