# Input / Tree 深度审阅问题修复

日期：2026-10-17。工作模式：System Mode，本地行为维护。起点为审阅报告对应的 `6a2364c8b0325a243b2de8ebe12361e305aab333`。范围限于 R03 Input 原生 reset、R04 Tree 初始异步展开 effect 重放；保持既有视觉、状态所有权与独立验收边界。

依据：根 AGENTS、SPIKE_BRIEF、当前阶段、Visual Evidence / Benchmark 索引、Input 与 Tree Manifest、ADR 0011、Tree 实施规则第 8 节、现有 Input/Tree 运行记录。测试前假设是报告描述能在已安装的锁定依赖中复现；现已实际复现。

## 精确运行环境

- Node 24.13.0；pnpm 10.28.1。
- React / React DOM 19.2.8；Vitest 4.1.11；JSDOM 29.1.1。
- Testing Library React 16.3.3；user-event 14.6.6。
- Playwright 1.62.1；Vite 8.2.2。
- 版本从实际安装包读取，并对照当前 pnpm-lock；没有安装或升级依赖。

## R03

Input 的内部状态始终作为原生 `value`，React 在编辑事件后还会把原生 `defaultValue` 更新为当前值，导致 reset 留下编辑值。修复在所属表单 reset 捕获阶段恢复挂载时的 defaultValue，让原生显示值和同步 FormData 正确恢复；事件结束后的任务恢复计数、清空按钮和组合输入状态。`preventDefault()` 的 reset 保留编辑值，受控值由宿主拥有，不额外触发 change / clear / search 回调。

实际浏览器额外发现：捕获监听中的 microtask 可以早于 React 的取消 reset 处理。首次 Chromium 用例出现取消重置后回退原值；因此恢复内部状态改为下一任务执行。此差异在 JSDOM 的同步事件分发中没有复现。外部 form 关联、Input 和 SearchInput、重复 reset、取消 reset、受控字段均已在真实 Chromium 中验证。

## R04

根 StrictMode 初次 cleanup 只取消请求，仍保留请求票据与 loading 状态；默认展开和受控展开均只发出已经被取消的第一次请求。修复同时释放票据和对应 pending 状态，让 setup 重放启动有效请求。既有 requestId 检查已保护 finally，因此没有替换或放宽该逻辑；增加旧请求完成不能删除替代请求的回归。

覆盖默认/受控初始展开、旧响应忽略、revision 替换、重复展开去重、未完成时卸载以及宿主结果回写。Tree 仍只拥有请求状态，children 通过宿主 data 写回。

## 实际 red / green

| 执行 | 结果 |
| --- | --- |
| 修改实现前 `pnpm exec vitest run packages/ui/src/input/input.test.tsx packages/ui/src/tree/tree.test.tsx` | 5 失败 / 48 通过：Input 两种默认值与外部 form 共 3 失败；Tree 默认/受控 StrictMode 共 2 失败 |
| 首轮修复后同命令 | 53 / 53 通过 |
| `pnpm exec playwright test --config tests/e2e/deep-review-input-tree.config.ts` 首轮 | 取消 reset 真实失败；Tree 临时动态导入夹具触发双 React 实例，属于夹具问题 |
| 改用 Vite 编译的独立夹具、事件分发后恢复，再运行该 Chromium 命令 | 3 / 3 通过 |
| 最终 `pnpm exec vitest run packages/ui/src/input packages/ui/src/tree packages/ui/src/checkbox packages/ui/src/radio packages/ui/src/input-number/input-number.test.tsx` | 12 文件，157 / 157 通过 |
| `pnpm --filter @rain-next/ui typecheck` | 通过 |
| `pnpm exec tsc --noEmit --project tsconfig.tests.json` | 通过 |

浏览器使用正常 Vite 编译的测试夹具，挂载真实公共组件；未改 Playground 产品路由或依赖。终端有既存的 NO_COLOR/FORCE_COLOR 提示，不影响结果。

本记录仅证明上述本地行为回归。不新增视觉、人工作业、Safari/Firefox、VoiceOver、实际设备、发布或业务迁移验收；没有 commit/push。
