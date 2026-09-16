# BM-B头部与静态提示追加批注

2026-09-15最终视觉确认：用户明确“视觉已经没问题了”。当前BM-B弹窗整体运行视觉通过，包含本文件的头部、静态提示及4px选项间距，也包含分区表面增量。历史批次记录保留；浅色提示3.71:1仍为pending-review，不构成对比度例外接受。

后续859×760截图批注要求两个布局选项“减小间距”。仅通过bm-b-layout-option本地Recipe将Checkbox控制区与文字间距从8px减为4px，保留24px控制区、常规字重及选项之间的16px间距；公共Checkbox不变。本增量以Prototype构建、B2登记检查和实际浏览器间距验证，视觉确认独立于下述已接受批次。

间距增量验证：Prototype类型/构建与`pnpm verify:tailwind-b2`通过；859×760浏览器实测两个Checkbox的gap均4px，Header仍108px、两行。无新增逻辑或测试，截图在当前任务工具记录。

用户明确要求提示更浅、头部尽量两行。System Mode，范围仅BM-B local-experiment，公共Dialog不变。

静态提示Text/Neutral/4改为5；保留非关键、非交互文字语义和4.5阈值，通过精确消费者pending-review记录不足，未接受对比度例外。保存中与错误反馈保留原Token。头部首行合并标题、布局Checkbox与关闭IconButton，说明位于第二行，行距8px；空间不足时自然换行，不截断操作。

本批修改page.tsx/page.css、颜色登记及精确检查、scripts/dialog-refinement.test.ts内对应边界回归与计划。2026-09-15，用户在本批结果后回复“确定。”，本批视觉Human Gate接受，精确范围为静态提示文字减淡及头部两行布局（窄屏自然换行）。此确认不构成对比度例外接受，3.71:1待审查项继续保留；不扩展到其他视觉增量或组件。未发布、未迁移、未提交Git，未写Figma。

验证结果：

- Prototype构建/类型通过，保留既有包体积提示。
- `pnpm verify:governance`通过，明确输出BM-B hint有1项对比度待审查。浅色Text/Neutral/5为`#7485A8`，白底对比度3.71:1，低于4.5；并非可读性通过。日志`/tmp/rain-bm-b-header-governance.log`。
- `pnpm exec vitest run scripts/dialog-refinement.test.ts apps/prototype/src/scenarios/bm-b/state.test.tsx packages/ui/src/dialog/dialog.test.tsx`：3文件15项通过。新增检查确保不能把提示改为装饰内容、互动文字或关键文字来获得同样待遇，不能让保存中反馈借用该登记。
- 浏览器717×760：标题/两个布局选项/关闭同行，说明独占第二行；头部实际高度108px（此前148px），内容区增加40px；提示计算颜色为rgb(116,133,168)。
- 浏览器390×740：自然三行，头部144px，Header/Body均无横向溢出，选项、完整说明和底栏按钮可见。结束恢复默认717×760并保留弹窗。
- 当前浏览器错误日志为空。截图与几何数据保存在任务工具记录。本批未重跑完整三浏览器E2E、真实IME、读屏器或触屏检查。
