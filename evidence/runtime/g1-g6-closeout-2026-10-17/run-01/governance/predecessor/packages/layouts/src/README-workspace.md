# Recoverable workspace 状态核心（W4 candidate）

`workspace-state.ts` 是纯 TypeScript 的候选 Layout 核心，来源为 navigation v0.4.2 工作包 `docs/06-VISIBILITY-AND-STATE.md`、`contracts/public-api.contracts.ts` 及原稿 visibility resolver。它不导入 React、浏览器全局、UI、Token 或业务数据；不更改已有 `Split` / `Sidebar` 行为。当前公开入口为 `@rain-next/layouts`，候选合同为 `manifests/layouts/workspace-state.yaml` 与 `workspace.yaml`，依赖/源码登记为 `registry/navigation-v042-workspaces.json`。

## 三层状态与身份

- `preferences` 只包含稳定 region ID 对应的 `mode`、`expandedWidth`。侧栏支持 `expanded / compact / hidden`；top region 使用同一个配置/偏好记录支持 `full / icons / tabs / hidden`。
- `resolveWorkspace` 派生 `regions`、`mainWidth`、`budgetOverflow`；不写回 preferences。宽度预算包括 recipe 的 `reservedWidth`、展开区域的 `boundaryWidth` 和侧栏宽度。按 `adaptationPriority` 从小到大降级，先保留允许的 compact，再尝试 hidden；不足最低主区宽度时明确返回受限结果。
- `session` 保存唯一侧栏暂态、工具暂态、专注快照/临时覆盖、pin 的原基态、非零滚动位置和 Esc 后的 hover 抑制。它不进入存储，`SWITCH_CONTEXT` 清空它。

`createWorkspaceKey({ userScope, workspaceId, subsceneId, instanceId })` 对每段 ID 编码后组合。scope 未接身份服务时由应用注入 mock ID；不要使用 label、数组下标或 theme/density/width 构成身份。

## API

```ts
createWorkspaceState(spec: WorkspaceSpec, preferences?: Partial<WorkspacePreferences>): WorkspaceState
validateWorkspaceSpec(spec: WorkspaceSpec): void
workspaceReducer(spec: WorkspaceSpec, state: WorkspaceState, action: WorkspaceAction): WorkspaceState
resolveWorkspace(spec: WorkspaceSpec, state: WorkspaceState, viewportWidth: number): ResolvedWorkspace
loadWorkspacePreferences(storage: WorkspaceStorage | undefined, key: string, spec: WorkspaceSpec): WorkspacePreferences
saveWorkspacePreferences(storage: WorkspaceStorage | undefined, key: string, spec: WorkspaceSpec, preferences: WorkspacePreferences): boolean
```

`WorkspaceSpec` 明确列出 workspaceKey、regions、stableRestoreOwnerIds、minMainWidth 和可选 reservedWidth；每个 region 声明 allowedModes、min/default/maxWidth、adaptationPriority、restoreOwnerId，compact 还必须声明 compactWidth。top region 不占侧栏宽度；其高度由消费层按 effective mode 呈现。

`validateWorkspaceSpec` 拒绝重复 ID、非法宽度/模式、自恢复、循环恢复、缺失负责人和恢复入口随其他区域一同隐藏的配置。stable restore owner 必须在 region 树外；经始终可见的 region 引用时也必须最终通向稳定外部 owner。真实 DOM 中 owner 是否可见、键盘可达，仍须消费层验证。

事件包括 `SET_MODE`、`TOGGLE_GLOBAL`、`HIDE_REGION`、`SHOW_REGION`、`PEEK_REGION`、`DISMISS_TEMP`、`PIN_TEMP`、`UNPIN`、`RESIZE_REGION`、`RESIZE_REGION_KEY`、`ENTER_FOCUS`、`EXIT_FOCUS`、`SWITCH_CONTEXT`、`SET_RIBBON`、`OPEN_RIBBON_TEMP`、`RECORD_SCROLL`、`CLEAR_HOVER_SUPPRESSION`。准确 payload 见源码 `WorkspaceAction`。

每次 hide/show/mode/pin 意图同时关闭旧暂态并完成新的操作；不需要先 dismiss 再等第二次点击。`SHOW_REGION` / `PIN_TEMP` 传入 viewportWidth 后，如果不能常驻，保留展开请求并临时显示。peek 不改变主区占位；unpin 恢复进入暂态时的基态，无该 session 记录时退回 hidden（top 优先 tabs）。进入专注只建立一次偏好快照，专注期间 mode/width 改动进入 focusOverrides；退出还原进入前的隐藏状态和宽度、清空暂态，专注内的 pin 不污染原 pin 基态。

Resize 在 recipe 和当前主区预算内 clamp；hidden/compact只加实际占位和剩余空间并扣展开边界，不把保存的展开宽度再算一遍；有限负值按 minWidth clamp，非有限值拒绝。键盘 ArrowLeft/Right 分别调宽 -/+10，Shift 为32，Home 为 min，End 为当前可用 max，Enter 显式隐藏并保留展开宽度。物理拖动方向和 end 边界的键盘方向映射由 Splitter 消费层决定。

## 存储边界

Storage 是注入的 `{ getItem, setItem }` adapter；无 window 的 SSR、拒绝存取、损坏 JSON 都安全回退。当前 payload 为 `{ version: 2, regions: { [id]: { mode, expandedWidth } } }`。只接受明确的 v1 `width` 字段迁移；未知版本退回默认，未知 region 和额外字段丢弃，合法宽度按当前 recipe clamp。保存失败返回 false；不输出原始 payload。

不要把 scope/student/question/file/view 选择、正文、姓名学号、评分、草稿、提交回调、hover timer、focus 或 scroll 存进偏好。保存/恢复业务状态的稳定 owner 是应用或 Domain Adapter；本核心没有业务提交接口。

## 本次验证与待验收

2026-10-01 本文件配套 `workspace-state.test.ts` 21 个纯状态用例通过；先运行了预期失败的关键回归，随后实现并观察通过。覆盖恢复图、ID 隔离、N02/N03 首击意图、N04 占位、N05 pin/unpin、N06 hover Esc 抑制、N08 专注精确恢复、N07/N09/N10 session 清理、N11 scroll、N24 resize、N25 Ribbon、N30 存储和 N32 空间派生。Layout 包 typecheck 通过。全库测试类型检查仍有其他文件的既有/并行范围错误，不能据此称全库通过。

本核心没有 DOM 或定时器，尚未在本文件范围验证鼠标拖动、separator ARIA、实际焦点移动、可见恢复条、嵌套 popup 的逻辑事件归属与 Esc 顺序、240/360ms hover 计时、StrictMode observer 清理、保留业务草稿的消费实例、实际 Ribbon 高度/主题继承、ConnectedSurface 重测和1200/1440/1600截图。它们由 React adapter 与 S1–S6/R 消费样本验证。G2/G3 人工验收仍 pending；纯状态测试通过不代表视觉验收、生产硬化、发布或业务接入。
