# v1.2 G1 续批：Tooltip / Resizable

2026-09-20。工作区 `.worktrees/card-v2`，分支 `codex/card-v2`，HEAD `321e1a0`。用户明确确认继续新版工作包，本轮实现剩余两项，不重启 G0/G1，不把继续授权当成本批新视觉验收。

[构建产物预览](http://127.0.0.1:5372/#token-first-g1-next) · [使用说明与可调用入口](../../../apps/prototype/src/scenarios/token-first-g1/README.md) · [实施范围](../../../docs/plans/2026-09-20-token-first-g1-next.md)

> 后续替换：本报告记录初始局部适配。2026-09-20 用户另行授权 Tooltip 继承旧 Vue 并建设共享候选；当前入口、视觉、Token 与验证以 [Tooltip Classic 记录](../tooltip-classic/verification.md) 为准。原 Tooltip 本地源码已移除，历史来源哈希保留用于审计。Resizable 以本文件末尾 2px 反馈为准。

## 已交付

- Tooltip：Provider / Root / Trigger / Content，保留 Base UI hover、focus、Escape、可悬停提示与碰撞处理，复用现有主题/密度桥。补充 tooltip role、稳定描述 ID 及已有描述合并；触发控件保留自身名称。
- Resizable：Group / Panel / Handle，固定官方引擎 4.12.4，横向/纵向、拖动/键盘、25–75% 样例边界、恢复比例和实例隔离。引擎管理分区状态，样例只调用其 API。
- 默认、局改、未改兄弟例；Dialog 内提示；1440 / 900 / 390px、深色和 forced-colors 检查。新能力仅为 local-experiment，没有公共导出或 Registry 晋升。
- 主工作包 64 项不扩容。增量写回现有覆盖记录与 current-phase；独立 Starter 的指南指出这两项仍仅存在于原工作区，没有导入不可达文件。

## 来源与映射

[固定来源](source-lock.json)保存 shadcn-ui/ui `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` 的 Base UI 作者源码、Nova 样式及 MIT；无 CLI。Resizable 4.12.4 仅新增原型应用依赖，React/DOM 保持 19.2.8，无新增传递运行依赖。其 MIT 原文、包 integrity、gitHead 和[精确锁文件新增](lockfile-additions.json)均保留。原有依赖解析通过历史 Layout 检查确认未变。

| 上游内容 | 本地适配 |
|---|---|
| Tooltip Provider/Root/Trigger/Portal/Positioner/Popup/Arrow | 保留开放 Parts 与行为；复用 Rain Popup bridge；补充明确描述语义 |
| 前景/背景与 12px 提示 | Rain 双主题 Background/Neutral/1 + Text/Neutral/1，13/20 提示文字 |
| Nova 12×6 内边距、默认圆角、动画 | Rain 12×8、6px；即时显示/关闭，未引入外部动画主题 |
| `z-50` | 复用现有 `rain-popup-positioner` 层级，并测试 Dialog 内显示及 Escape |
| Resizable Primitive 和 grip | 原引擎与 CSS 握柄结构；12px 分隔区，2×24 必要操作标记，现有 Icon 颜色经 currentColor 绘制 |
| 默认 flex 高度、方向与比例 | 100% Group 保留，固定高度放外层；百分比显式带 `%`；内部内容独立滚动 |

局部宽度、高度和初始比例不进入全局 Token。未新增共享字体、品牌色、断点、阴影或主题体系。

## 实际验证

| 检查 | 结果 | 证据 |
|---|---|---|
| 全工作区与测试类型 | 通过 | [typecheck.log](typecheck.log) |
| 原型构建 | 通过；仍有原应用大分块提示 | [build.log](build.log) |
| 新构建产物浏览器 | 3 项通过；覆盖主题、描述、层叠、调宽、比例边界和实际区域高度 | [browser-production.log](browser-production.log) |
| 原 G1 样板浏览器回归 | 4 项通过 | [browser-regression.log](browser-regression.log) |
| 相关原适配/Tabs/Popover 单元 | 3 文件、18 项通过 | [unit-regression.log](unit-regression.log) |
| 本批授权/颜色/旧解析保留 | 3 项通过，242 项未运行 | [scoped-governance.log](scoped-governance.log) |
| Starter 导出 | 3 项通过 | [starter.log](starter.log) |
| Tailwind B2 | 通过 | [tailwind.log](tailwind.log) |
| 全库 Tokens / Boundaries | 未通过；没有本批专属剩余 finding，旧报告/原型及历史清单问题保留 | [tokens.log](tokens.log)、[boundaries.log](boundaries.log) |

本批 9 条 Category 声明按原有角色与门槛精确登记，静态检查通过；8 组实际配对中正文最低 13.55:1、辅助文字最低 9.15:1、默认拖动标记最低 3.52:1。见 [contrast.json](browser/contrast.json)。这些数字只覆盖本批指定配对，未扩大为全库对比度验收。

已实际查看[桌面](browser/layout-1440.png)、[窄屏](browser/layout-390.png)与[深色提示](browser/tooltip-dark.png)整页截图。首次运行发现并修复：非法 Dialog 宽度、Base UI Popup 缺 role/描述、引擎 inline 100% 高度与外层关系、旧冻结 Semantic 表面在 Dark 下保持白色。保留[test-red](test-red.log)、[首轮交互失败](browser-second.log)、[颜色检查失败](color-test-red.log)，不把首次失败改写为一次全绿。焦点验证使用实际 Tab 导航，避免将 Dialog 的自动聚焦抑制提示误判为键盘不可达。

## 独立状态与接续

实现：完成局部适配。自动验证：上述限域检查通过。独立审阅：通过限定范围的只读复核，无剩余可复现 P1/P2；审阅者 `/root/review_g1_next` 核对了 Tooltip 描述关系与 Popup 桥、Resizable 高度/边界/恢复逻辑、窄屏截图、精确文件/版本授权及颜色登记，4 份上游来源校验值均匹配。2026-09-21 用户已确认当前新样例 Human Gate、人工对比度验收及限定范围独立复核；Switch 视觉仍按自身独立生命周期记录。无 Figma 写入、公共发布、业务迁移或 Git 提交/推送/合并。

共享 UI、Foundations、现有报告与批改页面的保护散列全部未变，见 [protected-comparison.json](protected-comparison.json)；只追加本批受控依赖/路径/颜色登记，不放宽无关检查。未完成真实屏幕阅读器、物理触摸、多浏览器/多设备测试；没有宣称六项整体系统验收或 64 项完成。

## 2026-09-21：当前 G1 续批 Gate 确认

用户确认当前 Tooltip/Resizable 样例的视觉 Human Gate、人工对比度验收及限定范围独立复核；当前 G1 的 F05 限定方向也同步确认。自动测量与未覆盖的真实屏幕阅读器、物理触摸、多浏览器/多设备范围保持原记录。后续进入 G2，Switch 共享组件的独立生命周期仍按其自身记录管理。

本批新样例的限定视觉判断已完成，随后按工作包进入 G2：Button Group、Toggle、Toggle Group、Spinner、Skeleton、Toast。设计方法 V04/V05/D01 已用于本轮；没有新的跨场景结论，不向方法库追加未确认规则。

## 2026-09-20 分割线视觉反馈

用户要求中间握柄更浅、整根分割线 hover 变色。默认 Icon/Neutral/2 改为 Icon/Neutral/3；完整分割区在 hover、focus-visible 和引擎 active 时使用 Background/Neutral/4，握柄沿用品牌反馈。没有新状态控制器。原先 flex-basis 被引擎内联 auto 覆盖，实测只剩 2px；现改用方向对应的 width/height，恢复约定的 12px 全长命中区。用户反馈属于本地修订授权，新视觉仍待确认。

[构建](feedback-build.log)、[精确颜色检查](feedback-governance.log)和[浏览器 3 项检查](feedback-browser.log)通过；测试类型检查通过。检查实际 12px 尺寸、远离中央握柄的端部 hover、拖出区域后保持 active 反馈、释放复原、键盘聚焦，以及横向/纵向与双主题；原描述、比例边界、实例隔离、窄屏、forced-colors 检查保留。已查看[浅色整条悬停](browser/separator-light-vertical-hover.png)与[深色横向悬停](browser/separator-dark-horizontal-hover.png)截图。默认握柄实测浅色 3.52:1、深色 5.20:1；悬停握柄配对也通过原 3:1 检查。未新增全库视觉或对比度验收。此前独立审阅记录针对修订前版本，本次小范围 CSS 修订未另行独立审阅。

### 最新修订：恢复细线

用户明确要求“保持之前的粗细”。此要求覆盖上段 12px 视觉处理：横向、纵向均恢复 2px 可见细线，保留较浅中央握柄和整条 hover/focus/active 变色，不改引擎拖动逻辑。[重新构建](thin-separator-build.log)和[浏览器 3 项复测](thin-separator-browser.log)通过；实际测量细度 2px，验证端部悬停、持续拖动、释放复原、键盘、双主题及窄屏。已刷新并查看预览；2026-09-21 用户已完成人工视觉确认。
