# R02 · Workspace allowedModes 修复

- 日期：2026-10-17（Asia/Shanghai）。工作区：`.worktrees/github-review-20261017`；修复前基线：`6a2364c8`。
- 模式：System Mode，既有候选 Layout 的功能修复；不新增公共 API、不改依赖、CSS、业务状态或历史视觉接受范围。
- 依据：当前用户请求、深度审阅报告 R02、AGENTS、SPIKE_BRIEF、当前阶段及导航增量记录、BM-C / VE-003/012/009 索引、Workspace 两份 README、两个 Manifest 和工作区消费合同。
- 方法：systematic-debugging / test-driven-development；先建立真实 React 控件交互回归并观察失败，再修源头的模式选择。

## 原因与复现

`RESIZE_REGION_KEY` 的 Enter 无条件派发 HIDE_REGION；顶部 RegionRestoreTrigger 无条件选择 tabs。WorkspaceSpec 合法接受模式子集，因此两个内置操作可向严格 reducer 提交不允许的模式。

在未修改实现时，`['expanded', 'compact']` 的真实 PaneSplitter Enter 抛出 `unsupported mode hidden`；`['full', 'hidden']` 的真实顶部恢复按钮抛出 `unsupported mode tabs`。新增测试中的原始红灯日志为本次终端执行输出；后续均由相同测试通过证明修复。

## 修复与合同

- Splitter Enter 优先 hidden，未支持时选择 compact；两者均无时不改变状态和焦点，其他调宽键仍可用。
- 恢复按钮按 allowedModes 选择目标；侧栏偏好 compact / hidden，顶部偏好 tabs / hidden，只有 full/icons 时在二者间切换。
- compact/hidden、tabs/hidden 子集只在允许模式间切换；没有可执行操作的按钮禁用。只有支持展开态才提供临时展开。
- 显式非法 SET_MODE、HIDE_REGION 等仍抛错，不吞异常。README 和 Manifest 同步说明该行为。
- 用户原有 G2 接受保持原始快照；本次功能变更不新增视觉、辅助技术或生产接受。

## 本次验证

- `pnpm exec vitest run packages/layouts/src/workspace.test.tsx packages/layouts/src/workspace-state.test.ts`：2 文件、51 用例通过（含原有 40 用例和新增 11 用例）。
- `pnpm --filter @rain-next/layouts typecheck`：通过。
- `git diff --check`：通过。
- 新增覆盖：报告两项配置的真实控件交互、恢复后焦点可继续使用与宽度保持、expanded-only 的 Enter 不可操作行为、四种单模式顶部区域、full/icons 标签和切换、两个仅紧凑模式子集、显式非法模式拒绝。
- 尚未验证：真实浏览器/屏幕阅读器/触摸设备；本次交互测试运行于精确锁文件安装的 React 19.2.8、Vitest 4.1.11 与 jsdom。

## 当前源码

| 文件 | SHA-256 |
| --- | --- |
| packages/layouts/src/workspace.tsx | baa7cd7a32732ab8e40502cf0ea6e5fcdacc6f4ecc1e6f199d6b56e93cbc333a |
| packages/layouts/src/workspace-state.ts | a49d7210d20f527bd5854df5fdfa831b80d9296cfc72eb92eed29acaa912b652 |

Registry 与整体追溯守卫由父任务统一收口；没有 commit、push、发布、Figma 写入或业务迁移。
