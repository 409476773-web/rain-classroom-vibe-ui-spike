# v1.2 G3 验证记录

工作区：`.worktrees/card-v2`。十项共享组件已在 `packages/ui` 实现、导出并由 `#token-first-g3` 消费。G3 的实现状态为「可进行视觉检查」，不是视觉或对比度验收。

## 定向检查

| 检查 | 结果 |
| --- | --- |
| UI 类型检查与构建 | 通过 |
| Prototype 类型检查与构建 | 通过；Vite 报告既有大 chunk 提示 |
| G3 Vitest | 11 个文件、12 个测试通过 |
| G3 Playwright | 3 个浏览器测试通过；1440、900、390 宽度 |
| Source Lock | shadcn 固定 commit `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048`、MIT、Base UI 1.8.0，11 个源码与许可文件的 SHA256 见 `source-lock.json` |

浏览器覆盖了两套锚点方向、真实本地导航与当前项、折叠导航、命令搜索与快捷键、Menubar 键盘入口、任务区键盘滚动、右键菜单、Hover Card、Sheet Escape 与焦点恢复。Sheet 内的菜单、Tooltip 和 Hover Card 已检查可见、可操作及视口边界；长文本、900/390 横向溢出、forced colors、reduced motion 与窄屏也纳入检查。截图在 `browser/`：`desktop-hierarchy.png`、`desktop-density.png`、`tablet-900.png`、`mobile-sheet-normal.png`、`mobile-sheet-open.png`、`mobile-forced-colors.png`。这些是运行证据，不构成用户视觉确认。

## Token 与治理边界

本批没有修改 Foundations Token。组件优先使用现有 Rain 语义 Token；临时尺寸、层级阴影与暗色导航辅助值集中在 `packages/ui/src/styles.css` 的 G3 段，以及 `apps/prototype/src/scenarios/token-first-g3/page.css` 的 `--rain-local-g3-*` 变量。待视觉确认后再审计是否进入 Token 库。

全库 `verify:boundaries`、`verify:workspace` 和 `verify:tokens` 未通过。当前工作树已有冻结 B2 历史/阶段边界、其他组件证据与 BM-D 等治理错误；Token 检查另外指出 G3 新消费者尚未注册 Token consumer metadata。按用户约定，该项属于视觉确认后的 Foundation Gate，本批不修改基础 Token 或 Token 治理清单。全库治理通过、独立复核、对比度确认、Registry、发布、Figma、业务迁移和 Git 均不随 G3 自动完成。
