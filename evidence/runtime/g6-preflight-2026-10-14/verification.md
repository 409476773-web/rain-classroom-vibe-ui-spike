# G6 计划前核对记录

日期：2026-10-14。工作区：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`，分支 `codex/card-v2`。本次只推进范围核对、来源获取、依赖兼容预查和[实施计划](../../../docs/plans/2026-10-14-token-first-g6.md)；未改运行代码、依赖、锁文件或阶段状态。

## 已核对的范围

原工作包的 G6 为 12 项：Data Table、Aspect Ratio、Attachment、Drawer、Input OTP、Carousel、Direction、Bubble、Marker、Message、Message Scroller、Questionnaire。原始条目及工作包文件 SHA-256 保存在 [coverage-input.json](coverage-input.json)；原工作包状态不回写，12 项分母不变。

当前代码与治理定位：

- Data Table 已有 `apps/prototype/src/data-table-recipe.tsx`，被 Playground `#table` 直接使用。TanStack 8.21.3 拥有排序、筛选、按 ID 选择、分页、列显隐和加载/失败/空态；本轮拟补独立能力合同与入口。`registry/table.json.localRecipe` 的 local-experiment / searchable:false 保持原状。
- Sheet 已使用 Base UI 1.8.0 Drawer。引擎有手势/吸附能力；现有 Sheet 样式未消费完整 movement variables，不能直接别名视作 Drawer 完成。
- DirectionProvider/useDirection 已在安装的 Base UI 中；Provider 不设置 DOM `dir`。Message 固定源码只有 `align`，角色映射由宿主负责。
- 其余公共 G6 同名实现、合同和独立入口尚未建设；本次来源核对不将其计入可用或验收完成。

相关原文件哈希保存在 [local-baseline.json](local-baseline.json)。本轮不修改 G5 的旧来源锁、颜色账本、源码绑定、截图和 Gate。

## 固定来源与真实语义

12 项在原 G4/G5 固定 shadcn commit `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` 中均取得实际来源；Data Table 是文档/Recipe，其余是组件源码。共保存 28 份去重的固定原文、同版 Nova CSS、MIT、依赖锁与元数据，见 [source-lock.json](source-lock.json)。原文仅用于追踪，未导入官网全局 CSS。

[Attachment](https://ui.shadcn.com/docs/components/base/attachment) 用于文件/图片、元信息、状态与操作；[Message](https://ui.shadcn.com/docs/components/base/message) 是会话消息行，[Marker](https://ui.shadcn.com/docs/components/base/marker) 表达会话状态/备注/分隔，不能以上传器、Toast 或彩点替代。完整固定文件与 Parts/imports/差额分别见 [交互项研究](interaction-research.json)和[会话项研究](conversation-research.json)。

固定上游 [Data Table](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/content/docs/components/base/data-table.mdx) 已使用 TanStack v9。本轮选择保留本地 8.21.3，文档结构参考与运行 API 差异明确登记，不作同版实现的声明。

计划采用三项直接依赖候选：`input-otp@1.4.2`、`embla-carousel-react@8.5.2`、`@shadcn/react@0.3.1`。前两项来自固定锁文件并核对 npm MIT/React 19 peer；Embla core/reactive-utils 同版传递锁定。后一个包的固定源码版本、发布 tarball、出口、MIT 和完整性均核对；Message Scroller 和 Questionnaire 共用此包。未安装这些依赖到工作区。

## 本次亲自运行的检查

| 检查 | 结果 | 能证明的范围 |
|---|---|---|
| `verifyG5Components()` 导出函数只读调用 | 返回成功，5 资产/8 能力；4 项当前 contrastFindings；humanGate 仍 awaiting_human，contrastAcceptance not-granted | 当前 G5 治理与来源链可读；不关闭旧颜色/人审项 |
| `pnpm exec vitest run apps/prototype/src/data-table-recipe.test.tsx` | 1 文件、5 测试通过 | 现有配方的测试合同；不代表 G6 新页或完整浏览器通过 |
| 临时包严格类型检查 | 退出码 0，`skipLibCheck=false` | React 19.2.8/types 19.2.18/Base UI 1.8.0 与 @shadcn/react 0.3.1 的所需类型/API 可组合 |
| 临时 SSR smoke | 11 断言通过 | region/log、名称、tabIndex、稳定消息 ID、原生 form/fieldset/legend/radio、progressbar 与 inert 的静态输出 |
| @shadcn/react tarball 下载与 SHA-512 | 与 npm integrity 相等，16,923 bytes；原包归档保存 | 包文件完整性；没有另行证明发布 commit 映射 |

G5 返回原文见 [g5-readonly-governance.json](g5-readonly-governance.json)，Data Table 日志见 [data-table-baseline-tests.log](data-table-baseline-tests.log)，类型检查/SSR 输出见 [shadcn-react-typecheck.log](shadcn-react-typecheck.log)、[shadcn-react-ssr.log](shadcn-react-ssr.log)。临时类型与断言探针原文保存于 `compatibility/`，仅为证据，不是新公共测试基础设施。

独立代理审阅实施计划，未发现阻碍执行的遗漏；复核包括12项、复用身份、真实手势、三项依赖、原生 OTP/Questionnaire 状态、有限来源后继、独立消费与验证边界。复核未实施、未运行浏览器，不推导人审通过。

## 实施前需要集中确认的范围

`status/current-phase.yaml` 顶层 blockedActions 保留“安装新依赖、升级依赖或批量复制 shadcn 资产”；既有 G5 等精确增量不包含 G6 三项依赖。本轮规划不将此限制静默改为授权。下一次确认时一次登记三项依赖及计划的 G6 运行范围，再分 A/B/C 实施。

未运行 G6 Rain 适配、仓库安装/构建、浏览器滚动与手势、物理触屏/自动填充、中文 IME、Safari、VoiceOver 或新视觉验收。类型及 SSR 成功不能代替这些检查。G5“基本完成”不升级为全库、对比度或生产发布接受。
