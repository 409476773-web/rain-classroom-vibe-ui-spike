# v1.2 G2 验证记录

2026-09-21，工作区 `.worktrees/card-v2`，分支 `codex/card-v2`。本批按新版工作包推进 G2 六项：Button Group、Toggle、Toggle Group、Spinner、Skeleton、Toast。

## 当前状态

- Implementation：完成本地适配、组合预览与本轮视觉精修。
- Automated Checks：本批定向通过；全库治理仍有既有基线失败，未将其归因于 G2。
- Human Gate：`accepted`，用户已确认本批当前运行视觉检查完成（2026-09-22）；范围仅限 G2 当前运行视觉。
- Contrast Acceptance：`not-granted`，本批未声明对比度验收。
- Registry / Publication / Figma / business migration / Git：未授权、未执行。

## 实际运行

| 检查 | 结果 |
| --- | --- |
| `pnpm --filter @rain-next/prototype typecheck` | 通过 |
| `pnpm --filter @rain-next/prototype build` | 通过；Vite 仅报告既有大 chunk 提示 |
| G2 Vitest（5 项） | 通过 |
| G2 Playwright（3 项） | 通过：桌面键盘、加载替换/Toast 关闭、窄屏深色 reduced-motion/forced-colors |
| G2 Source Lock / boundary scoped scan | G2 文件已纳入精确范围；无 G2 专属错误 |
| `node scripts/verify-boundaries.mjs` | 失败：既有 phase/history、OptionButton、QuestionNumber、Select、Tag、Input、IconButton 和 Tooltip 基线登记问题 |
| `node scripts/verify-token-foundations.mjs` | 失败：既有 B2/history 与大量未完成对比度登记；未出现 G2 文件错误 |

浏览器截图保存在 `browser/light.png`、`browser/loading.png`、`browser/toast.png`、`browser/dark.png`、`browser/narrow-dark-forced-colors.png`、`browser/single-outline-sizes.png` 与 `browser/single-selected-bold.png`。原始上游快照和校验见 `source-lock.json`；本地修改没有覆盖快照。

## 设计与检查

采用 V04（文字层级）、V05（内容/外观/行为一起改造）、D01（选择→操作→反馈）、D05（窄屏堆叠）。视觉参考了 [shadcn Toggle](https://ui.shadcn.com/docs/components/base/toggle)、[Toggle Group](https://ui.shadcn.com/docs/components/base/toggle-group)、[Toast](https://ui.shadcn.com/docs/components/base/toast)、[Base UI Toggle Group](https://base-ui.com/react/components/toggle-group) 与 [MUI Skeleton](https://mui.com/material-ui/react-skeleton/) 的公开结构和状态表达；Rain Token 负责最终颜色、圆角、密度和语义色。检查了长中文文案、禁用、键盘焦点、单选/多选真实状态、Spinner loading 语义、Skeleton 装饰性隐藏、Toast F6 聚焦和关闭；读屏软件与物理触摸仍未实测。
