# G3 与导航独立页：本轮来源差额

日期：2026-10-07。范围：补齐已有成果的组件沉淀与 Playground 展示，以及独立审阅发现的必要缺口。

## 共享实现差额

- `packages/ui/src/{sheet/sheet,context-menu/context-menu,hover-card/hover-card,menubar/menubar,navigation-menu/navigation-menu}.tsx`：接入已有 `PopupProvider`、`usePopupTriggerRef`、`usePopupScope`。Portal 表面继承活动触发器的局部主题与密度；保持原 Base UI 开关、取消、定位与焦点协议；不修改共享颜色或新增 Props。位置/遮罩原有 style 回调仍保留。HoverCard Root 仍支持原有 Payload 泛型。
- `packages/ui/src/_internal/popup.tsx`：仅将触发器 ref 桥签名泛型化，保留各组件原有精确 DOM ref 类型；运行行为不变。
- `ContextMenu.Trigger`：在宿主 `onKeyDown` 未取消且焦点位于 Trigger 本人时，将 Shift+F10 / ContextMenu 键接入同一个原生 `contextmenu` 事件入口。只有 Base UI 接纳该事件后才阻止键盘默认行为，避免双触发；禁用、关闭和焦点仍归 Base UI。没有另建菜单状态机。

## 文档消费差额

- `g3-component-pages.tsx` 与 `navigation-component-pages.tsx`：原生示例链接保留 href 与修饰键行为；新标签打开时读取明确的 `view` / `member` / `chapter` 查询初态。无效身份回退到该示例默认值。读取逻辑为 `g3-demo-location.ts`，应用层负责查询片段的文档路由解析。
- 两份专属 CSS：原生 input/textarea/select 的必需边界沿用已有 G1 配方 `rgb(from var(--rain-category-border-neutral-1) r g b / 65%)`；不新增 Token。直接 Neutral1 的 alpha35 实测仍只有浅色 1.90 / 深色 2.52，故沿用已有 65% replacement。答案缩略图的装饰性 Brand 改用 Neutral。共享默认与本轮颜色合同的 role、critical、最低要求均不变，实测结果由同批颜色台账记录。

## 验证

- `packages/ui/src/_internal/g3-popup-context.test.tsx`：五类 Portal 主题与密度继承；修复前五项均因缺少主题祖先失败，修复后通过。覆盖打开时以及宿主上下文变化。
- `packages/ui/src/context-menu/context-menu.test.tsx`：Shift+F10 / ContextMenu 键、Escape 返回焦点、宿主取消与 Root 禁用；键盘用例修复前无法找到菜单项，修复后通过。
- `apps/playground/src/docs/components/g3-component-pages.test.tsx`：17 个独立文档入口、页签草稿、对象操作隔离、工作区恢复和原生目标查询初态。
- 本轮最终定向运行：上述三份测试与 Sheet/HoverCard/Menubar/NavigationMenu 既有测试共 7 文件、17 项通过，退出码 0。Playground 类型检查退出码 0。
- 两份专属 CSS 绑定当前源码 hash 后，通过 `getG123PlaygroundDocumentationColorConsumers` + `validateRegisteredRecipeColors` 独立复核，均为 0 错误，退出码 0；必需边界保留 interactive/critical/essential-boundary 与 3:1。全库仍有此前 210 项诊断，本轮文档新增 0，见 `token-current-result.json`。
- 独立 Chromium 实测：四类深色浮层实际背景与宿主一致，见 `read-only-g3-runtime-review-after.json`。ContextMenu 真实键盘执行与 Escape 焦点恢复通过，见 `read-only-keyboard-route-review-after.json`。这些文件为本轮新增证据，没有覆盖历史截图。

成熟度仍为共享候选；既有 Human Gate 的原限定范围保留。文档页、源差额与定向自动/浏览器检查不代表完整无障碍验收、System Approved、发布或生产接入。
