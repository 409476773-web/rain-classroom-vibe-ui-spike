# 图表视觉层级修订实施计划

**Goal:** 按用户“确定，开始修改”的授权，修正讨论中确认的展示比例、信息层级和旭日入口问题。
**Architecture:** 在现有文档宿主与业务组合中调整，复用图形、数据、动效与 Rain 组件；不建立新图表引擎或公共 API。按 System Mode 的未发布候选增量记录，视觉接受独立待审。
**Tech Stack:** React、现有 CSS / Rain Tokens、Vitest、Playwright。

## 范围与设计依据

- 已确认基础：Bklit 图形与运动、Rain 配色与渐变、普通读数 13px、蓝灰配方。保留缺测/零值语义、精确读数、键盘路径与下载能力。
- V04 / I01：区分关键指标、普通读数和辅助说明，重新组织指标卡主次。
- D02 / I02：九种迷你表达按图型就近比较两种尺寸，减轻重复边框与说明；保留全部样本。
- I03：默认图和变体优先展示，使用边界、接口与源码渐进展开；低频示例操作靠近对应图形。
- 明确缺陷：旭日文字入口受通用 button 样式覆盖。修复样式来源冲突，并保留多级下钻、焦点与长标签。
- 尚未验证：紧凑后的窄屏阅读、控件发现性、指标卡层级与动态观感，须真实浏览器观察，不以检查通过代替用户接受。

## 执行与影响面

1. 保留当前源文件和 Git 状态，并截图正常态趋势图、分类条、旭日与指标卡。同一视口、数据、配方对照；单独记录恢复页面边距前后的绘图区尺寸。
2. 调整 `chart-business/mini-examples.tsx`、`embedding-examples.tsx`、`chart-business.css` 及直接调用/测试：配对展示尺寸，整理主指标。下载通过 `chart-example-source.tsx` 原始源码导入继承，核查独立消费。
3. 调整 `chart-page.tsx`、`chart-variant-gallery.tsx`、`chart-page.css`，让图形展示先于详细技术参考；保留所有变体、工具与源码。
4. 调整 `chart-examples.tsx` / `.css` 的旭日入口组织；优先恢复已有 Button 样式，必要浏览器回归覆盖原缺陷。
5. 核查颜色消费者登记与导出闭包，仅同步实际变化的选择器。保护 shared chart runtime、Token 值、依赖、Registry 资产与 Manifest 公开接口，以及其他工作区改动。
6. 运行相关单元、浏览器、类型和构建检查；记录桌面、390px、长标签、键盘和正常/减少动效。复查下载后的改动样本，不无条件重复所有历史批次。
7. 更新本记录与运行证据，提供可运行页面和同条件前后图；Human Gate、发布、Figma、迁移与 Git 保持各自未授权/待审状态。

## 验证与记录

运行目录：`evidence/runtime/chart-visual-rebalance-2026-10-10/`。已有源文件快照与哈希保留于 `before/`、`baseline-hashes.json`。测试应验证功能保持、可访问入口与样式覆盖缺陷；纯布局微调使用实际画面检查，不增加镜像实现的测试。

当前状态：本地实施与定向技术验证完成，视觉接受待用户确认。默认宿主和新增浏览器回归19项、变体检查5项、业务浏览器25项通过；5份实际下载的独立类型、构建、浏览器检查及19项 Registry 闭包通过。Playground 类型与构建通过。两项实施中发现的样式回归均已修复并重验。

历史例外已重新核对：测试项目4处类型诊断与前轮 T22 日志逐字一致；生成一致性检查仍有本轮前存在的3条 China 颜色消费者陈旧登记。两者未改动，不表述为全仓检查通过。

查看 [前后对照与实时入口](../../evidence/runtime/chart-visual-rebalance-2026-10-10/human-review.md)、[验证记录](../../evidence/runtime/chart-visual-rebalance-2026-10-10/verification.md) 和 [独立复核](../../evidence/runtime/chart-visual-rebalance-2026-10-10/independent-review.md)。未发布、未同步 Figma、未迁移业务、未提交或推送 Git。
