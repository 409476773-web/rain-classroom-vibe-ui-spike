# Slider Experience Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 完成用户审查后授权的 Slider 整组数值调节体验，修复读数、刻度、重合端点和生效反馈，并整理可直接参考的组合。

**Architecture:** 延续现有 Slider / Base UI、Tooltip、FormItem、InputNumber 与 Rain Tokens；只修正共享刻度几何和必要的端点选择，再在页面私有组合中组织草稿、有效值和业务结果。保留既有公开数值类型、回调、端点身份和依赖闭包。

**Tech Stack:** React 19、TypeScript、Base UI 1.8.0、Rain Tokens、Vitest、Playwright。

---

## 授权与边界

2026-10-13，用户在 Slider 四步审查与实施顺序说明后明确指示“开始实施”。本轮沿用 `status/current-phase.yaml` 中 `sliderRefinement` 的精确授权和 System Mode；新记录补充已登记的 [Slider 改造计划](2026-10-13-slider-refinement.md)，不新增阶段或推进 Gate。

保留当前已经认可的颜色：静止外圈与已选轨道使用 `Fill/Brand/Solid/2` 的已登记 55% Alpha，操作中使用同一 Token 的不透明色，表面色内芯无中心点。保留 default 16px / compact 12px 滑钮、4px 轨道、区域 Density、扩大命中区、独立键盘焦点和减少动态效果。候选未发布，人工运行与对比度接受仍待验收。

## Task 1：读数、端点与提交反馈

**Files:** `packages/ui/src/slider/slider.tsx`、`slider.test.tsx`；`apps/playground/src/docs/components/slider-examples.tsx`、`slider-examples.test.tsx`。

1. 先补重合端点双向展开、固定端点身份与回调的回归测试，运行 `pnpm exec vitest run packages/ui/src/slider/slider.test.tsx`，确认现有缺口。
2. 共享实现只处理从重合滑钮开始的必要指针端点选择：向左展开下限、向右展开上限，首次接受的不相等变化后固定本次端点。按 Base UI 原有拖动、步长、边界和结束链执行，取消的变更保留选择机会；通过回归与实际交互确认后替换旧限制记录。
3. 窄容器常驻读数由当前值派生；固定 60 刻度写“默认 60”；范围可见提示只使用“下限 / 上限”，独立辅助名称仍由 `thumbLabels` 提供。
4. 及格线区分本次待保存与已保存值；范围区分拖动预览与操作结束后已应用值。无效草稿保留，并明确当前输入未应用及仍在使用的有效范围；不静默归零、钳制或顺带提交另一端草稿。
5. 运行两个专项测试文件；确认新反馈没有改变 InputNumber 的全库编辑与步长合同。

## Task 2：刻度与三类组合

**Files:** `packages/ui/src/slider/slider.css`；`apps/playground/src/docs/components/slider-examples.tsx`、`slider-examples.css`；`g5-component-pages.tsx`。

1. 刻度贴近可见轨道，坐标仍按 edge 滑钮的可达范围对齐；视觉间距不再由扩大命中区的高度决定。检查 default / compact 与窄容器。
2. 及格线使用标准表单字段；范围使用紧凑、明确的下限—上限输入组；音量与倍速放入同一参数面板，以紧凑参数行组织当前读数、精确输入与恢复操作。
3. 错误与结果在稳定位置反馈，避免轨道随错误出现跳动。输入精度、范围校验和业务提交仍属于页面宿主。
4. 主组合提前展示，外观对照放在后面；预设、相等与禁用等验证入口收进“状态与边界”，仍可独立操作和检查。对照继续是页面局部实验，不增加公共 Variant。
5. 同步可复制代码、API 与组合说明；浏览器确认阅读顺序、活动端、提示位置、窄屏和键盘路径。

## Task 3：合同与来源记录

**Files:** `manifests/ui/slider.yaml`、`docs/ai/g5-components.md`、本计划、`evidence/runtime/slider-experience-2026-10-13/design-notes.md`；根任务同步已登记计划、当前来源绑定与验证记录。

1. Manifest 与使用指南反映最终共享行为和页面组合，不增加新资产身份或发布状态。
2. 保留原 G5、日期和 Slider 的冻结前置快照与来源锁；新计划、设计说明通过已登记计划链接，不扩展既有有限来源绑定清单。
3. 当前改动完成后刷新已有 `source-bindings.json` 的后继哈希和颜色账本；保留 `sourceVersion: local-2026-10-13-slider-refinement`，本轮属于其已授权后继。
4. 未亲自运行的检查不标为通过；根任务记录自动、浏览器、独立审查和 Human Gate 的各自结果。

## Task 4：验证与交付

1. 运行 `pnpm exec vitest run packages/ui/src/slider/slider.test.tsx apps/playground/src/docs/components/slider-examples.test.tsx`，验证数值、草稿、端点与反馈。
2. 运行 `pnpm exec vitest run scripts/slider-refinement-governance.test.ts scripts/g5-components-governance.test.ts scripts/g5-color-consumers.test.ts`，验证授权、来源、依赖和颜色边界。
3. 运行 `pnpm typecheck`、Playground build、`RAIN_G5_EVIDENCE_DIR=evidence/runtime/slider-experience-2026-10-13 node scripts/verify-g5-components.mjs` 与同目录环境下的 `node scripts/verify-g5-consumption.mjs`；消费证据按当前任务目录记录，避免覆盖旧结果。
4. 确认 5397 服务来自当前 card-v2，执行当前 Slider 浏览器专项：双向展开、输入冲突、待保存/应用反馈、刻度几何、密度、深浅主题、窄屏、减少动态效果和强制颜色。人工查看实际页面后保留本轮截图。
5. 运行必要治理入口：`verify:workspace`、`verify:evidence`、`verify:boundaries`、`verify:tailwind-b2`、`verify:tokens`；历史全局问题与本轮结果分别记录。
6. 完成后向用户展示实际 `#slider` 页面和当前检查边界。物理触控、真实读屏、人工对比度、Figma、发布、业务迁移和 Git 操作不由自动检查推导。

