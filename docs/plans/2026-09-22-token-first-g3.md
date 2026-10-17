# v1.2 G3：共享组件建设与视觉升级

2026-09-22。用户明确授权按新版工作包推进 G3，并确认允许组件视觉变动，但不修改基础 Token；视觉优先复用已有 Rain Token，缺口先留在组件 CSS 或页面 Recipe，视觉确认后再单独审计 Token。

## 目标与边界

G3 把本地候选适配推进为 `packages/ui` 的共享内部组件，导出十项组件及其公开类型，并由 `#token-first-g3` 作为真实本地消费与验收工作台。页面使用虚构任务数据和宿主状态，不连接生产接口，也不修改 BM-C、G1/G2 或 Foundations。

固定来源为 shadcn-ui/ui commit `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048`（MIT），行为基础使用既有 `@base-ui/react@1.8.0`；本批不新增依赖。

## 组件合同

| 波次 | 组件 | 本批能力重点 |
| --- | --- | --- |
| A | ScrollArea | 视口、内容、滚动条/Thumb、键盘滚动、嵌套滚动 |
| A | Sheet | 遮罩、modal、侧面定位、标题/描述、Escape、焦点恢复、窄屏 |
| A | Sidebar | 可控/非控折叠、导航分组、当前项、辅助区域 |
| B | Breadcrumb | 本地路径、当前页、长路径、真实链接语义 |
| B | NavigationMenu | 展开分支、当前链接、键盘入口与 Portal 部件 |
| B | Menubar | 菜单触发、方向键、菜单项与 Separator |
| C | Command | 本地注册表、搜索过滤、分组、方向键、Enter 执行、空结果 |
| C | ContextMenu | 右键入口、菜单项、Escape 与焦点恢复 |
| C | HoverCard | 指针入口、焦点/键盘等价入口、碰撞定位 |
| C | Kbd | 快捷键表达、可访问的快捷键分组 |

Rain 组件统一负责 API、语义追踪属性、Token 类名和视觉边界；Base UI 负责可访问的 overlay/menu/scroll 行为。Command 的命令注册表与执行结果由消费页面持有，共享组件只负责筛选与键盘行为，不引入新的命令依赖。

## 视觉探索

- **层级型工作台**：深色一级导航、浅色任务面、较轻表面层级、宽松间距；适合持续阅读与判断。
- **密度型指挥台**：更窄导航、更紧凑间距、边界和激活态更明确；适合复杂后台任务。

`TokenFirstG3Page` 通过页面内切换保留两套方向，避免在用户视觉确认前把某一方向写成全局默认。页面局部 Recipe 集中在 `apps/prototype/src/scenarios/token-first-g3/page.css`，其中的临时值带有 G3 注释，后续进入 Foundation Token Gate。

设计方法应用：V04（文字层级）、V05（组件改造同时看内容/外观/行为）、D01（从任务判断确定整页顺序）、D05（窄屏和密度随容器调整）、I01（按信息角色选择组件形态）。这些是本批应用记录，不自动升级为全局规则。

## 验证与独立状态

- 组件测试覆盖三波的结构、过滤/执行、菜单键盘、Sheet 焦点恢复、右键菜单、Hover Card 和 Kbd 语义。
- 原型页测试确认十项共享组件均由 `@rain-next/ui` 消费，并确认视觉方向切换和命令执行结果可观察。
- 浏览器验证覆盖 1440、900、390 宽度、方向切换、导航展开、Menubar 方向键、Context Menu、Hover Card、Sheet Escape/焦点恢复、reduced-motion、forced-colors 与截图。
- `packages/ui` 与 `apps/prototype` 的类型检查、Prototype 构建单独记录；全库治理、对比度、Registry、正式发布、Figma、业务迁移、独立复核和 Git 不由 G3 自动完成。

当前状态：Implementation 已完成并可供视觉检查；G3 定向自动检查通过，全库治理仍有既存问题且 G3 Token consumer 注册留待视觉确认后的 Foundation Gate；Human Gate 待用户检查两套视觉方向；Contrast Acceptance 未授予；Publication 未发布。
