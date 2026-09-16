# RN-06 Minimal Layouts Implementation Plan

> 执行方式：writing-plans / executing-plans；继续现有 `.worktrees/card-v2`，不提交或推送。

**Goal:** 根据 V2 工作包，在 Dialog 精修后的继续指令下交付 Stack、Inline、Grid、Split 四类最小布局及真实组合样例。

**Architecture:** System Mode，建立唯一 `@rain-next/layouts` 源码包，依赖现有 React / Foundations。只管理空间、区域和受控收起；UI、业务草稿、表面样式及控件密度仍由现有组件与宿主持有。未获得用户视觉接受的 Card / Dialog Gate 保持独立。

**Tech Stack:** 已安装 React19、TypeScript、Tailwind4、原生CSS / ResizeObserver、Vitest、Playwright；无新第三方依赖。

## 依据与限定授权

用户最初要求按 `Rain-Next-Codex-工作包V2` 继续建设，随后要求 Dialog 精修与可沿用的组合排版规则；该轮完成后用户明确“继续”。本批按 RN-06 顺序实施，不将继续解释成人工视觉接受。台账要求四类布局、有限列数、换行收缩、收起保留与焦点可达；拖动调宽、持久化、导航Sidebar、后续RN-07与完整Benchmark均不进入本批。

视觉/结构来源：VE-009 主从预览与独立Inspector、VE-012 侧栏职责、VE-014 单双列表单。仅沿用已复核的工作流和空间关系，不照搬Classic Template样式。现有[组合规则](../audits/2026-09-13-composition-layout-rules.md)为本批输入。架构决定见[ADR0009](../adr/0009-minimal-layouts.md)。

## 最小合同

- Stack / Inline：原生div属性和ref，gap来自CompositionSpaceTokenName静态映射，默认0；有限align/justify。Inline默认wrap，可由宿主嵌套wrap=false保持动作组完整。
- Grid：最大列数1/2/3/4、gap；显式minColumnWidth开启容器内自适应。列宽为有限正数，间距复用Foundation；不提供任意模板字符串或全局断点表。
- Split.Root / Main / Sidebar：两个按DOM顺序的主从区域；受控collapsed，侧宽/主区最小宽为有限正数，窄容器自然堆叠。侧区默认保留挂载并退出可见/焦点序列，隐藏聚焦侧区时返回外部可见按钮。Main/Sidebar显式选择scroll，默认不抢滚动；区域独立滚动需要宿主提供确定高度。
- Layout没有背景、边框、圆角、文字、表面、密度或业务状态。侧栏内Portal由宿主先关闭其受控浮层，再收起；测试包括该协作边界。
- Foundation与既有UI源码全部保护；布局CSS变量只作本包运行时几何，来源及消费者精确登记，不成为新公共Token。保留默认Tailwind视觉/断点封闭。

## 执行步骤

1. 记录基线，增加精确RN-06阶段授权与文件合同；新增包配置只复用现有依赖版本，接入两应用的显式扫描与样式。
2. 实现 `packages/layouts/src/layout.tsx`、`layout.css`、入口和定向测试，覆盖合法参数、受控收起、保留状态和焦点。
3. 新增 `apps/prototype/src/layout-recipes.tsx/css` 与 Playground `#layouts`：设置表单、查询/动作组、资料主从预览。仅使用虚构数据及现有Card/Input/Select/Button/FormItem，不迁移旧示例。
4. 同步最小Manifest/Registry/组合规则、用法与来源。完善 `tests/e2e/layouts.spec.ts`：容器自适应、长中文、密度继承、320/375窄屏、收起草稿/焦点、打开Select后收起、独立滚动。保留Card/Dialog回归。
5. 类型、治理、构建、定向单元及生产浏览器验证；独立复核，写 `evidence/runtime/layouts-v1/verification.md`。当前数值只在记录样本范围内验证，不当作完整Benchmark。

## 退出条件

源码候选和示例可运行；精确文件/依赖/颜色/几何合同通过；原UI/Foundation保护哈希不变；用户可查看组合与窄屏退化。记录 implementation、automatedVerification、independentReview 分别的实际结果；humanGate=awaiting_human，contrastAcceptance=not-granted，publication=unpublished。

## 本批执行结果

五项实施步骤已完成。生产回归22/22（Layout7、Dialog9、Card6），类型与构建通过；治理及定向单元结果、独立复核21项边界/6组页面及修复过程见[验证记录](../../evidence/runtime/layouts-v1/verification.md)。1925个保护文件保持原哈希。独立复核在所列范围内无未修复的新增P1/P2；人工视觉接受、对比度接受、完整Benchmark与后续批次均未因此关闭。
