# Dialog Visual Refinement Implementation Plan

> 执行方式：executing-plans；沿用现有隔离工作树，完成本批后保留可运行预览，不提交或推送。

**Goal:** 精修当前 Dialog，并从实际结果提炼可供后续组件采用的组合排版规则。

**Architecture:** System Mode 修改 Dialog 的部件间距及操作区；课程编辑 Local Recipe 选择宽度、内容分组与既有控件尺寸。保留 Base UI 行为及 Rain Token；规则文档先记录经本批验证的范围，不创建新的公共布局抽象。

**Tech Stack:** React、Base UI 1.8.0、现有 Rain Token / Tailwind、Vitest、Playwright。

## 授权与基线

用户原话：“先把当前 Dialog 精修到位，并且，以它为起点，把后续组件都能沿用的组合排版规则一起梳理清楚”。本轮覆盖现有公共 Dialog、课程编辑示例、文档展示和所需精确登记。Card、Input、Select、FormItem、Button、Foundation 数值不改；保留初版 RN-05 证据。基线与共享文件快照见 `evidence/runtime/dialog-visual-2026-09-13/`。

## 设计选择

- 连续的24px水平内容边线。Header保持24px内边距；Body无额外顶部留白，底部24px，因此Header到Body内容的有效距离为24px。无Header时Body自身补24px顶部留白。
- 短课程编辑宽480px，长内容560px，属于宿主选择；公共Content的560px默认不改。
- 标题18/28，说明14/24，间距8；既有FormItem内部4px不改。字段组间距20；字段组到说明分区24；分隔线到分区文字16；分区文字由明确的小间距组织，末段不再贡献隐形margin。
- Footer沿用内容边线，纵向16px、按钮间8px，使用Background/Neutral/2和Border/Neutral/3形成轻分区；保持焦点可见，不用根级裁切。取消选既有tertiary，保存选primary，两者显式small/32px；关闭按钮显式28/16，与标题行中心对齐。
- 保存、失败、重试、取消、嵌套浮层行为保持。长内容只有Body滚动；窄屏与保存状态的操作不得溢出；取消与保存保持为同一动作组，必要时整组移至状态说明下一行。
- 页面预览的标题、说明、设置项与样例入口使用同一内容宽度，避免文档壳干扰组件评判。

## 步骤与文件

1. 记录基线、限定授权和新证据路径；在现有Dialog浏览器测试中补有效距离/对齐与短长宽度检查。新证据放临时目录，完成后归档。
2. 修改 `packages/ui/src/dialog/dialog.tsx`、`dialog.css` 和 `apps/prototype/src/course-dialog.*`，只复用现有Token和控件配方。同步 `dialog-page.*` 的预览排布。
3. 同步Dialog Manifest、Registry、阶段记录及新增颜色消费登记；保留精确颜色检查，不增加依赖或全局样式层声明。
4. 运行Dialog/来源治理定向单元、类型、治理、构建和生产Dialog+Card回归；浏览器核对短/长、浅/深、默认/紧凑、窄屏、实际字体及新增Footer颜色对比度。
5. 独立复核；完成 `docs/audits/2026-09-13-composition-layout-rules.md` 与本批验证记录。通用规则、当前数值、待其他组件验证的建议分开。

## 完成条件与边界

实际排布不依赖不可见的margin叠加；同层内容边线一致；标题/表单/说明/操作层级清晰，滚动和状态切换仍可操作。技术检查与独立复核完成后提供当前候选供人工评审，`humanGate=awaiting_human`，`contrastAcceptance=not-granted`。已有深色共享Focus问题继续记录；本轮不把规则推广至全库并宣称已经验证。

## 完成记录

本轮精修与组合规则已完成。生产Dialog9 + Card6共15项通过；类型、构建、治理通过。单元初跑的3项颜色登记失败已修正并经定向复验，最新授权与颜色18项通过，完整过程见[新验证记录](../../evidence/runtime/dialog-visual-2026-09-13/verification.md)。独立复核无未解决的新增P1/P2，包含无Header24px及320/375px保存/失败动作分组。

预览保留5195 `#dialog`，prototype为5196；未提交或推送。当前可进入用户视觉评审，仍为 `awaiting_human`，深色共享Focus与对比度接受另行保留。后续参考[组合排版规则](../audits/2026-09-13-composition-layout-rules.md)，具体数值按新场景验证。
