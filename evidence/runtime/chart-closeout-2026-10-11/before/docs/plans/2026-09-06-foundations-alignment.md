# Foundations 入口与旧 Token 引用收口 Implementation Plan

> 按当前会话已确认方向实施；使用 subagent-driven-development 并行核对与独立审阅。

**Goal:** 保留 Foundations 总入口，让 Token、排版组合与规则共享来源，并将有视觉变化的旧新映射列为待确认方案。

**Architecture:** 延续现有 Foundations 包、Token 事实源与单一生成器。旧公共名字保留；同值同用途的排版、间距与组件基础引用改为已登记 Token。旧颜色按实际属性、用途及主题核对，不能按色值相同直接合并。两个现有路由保留，明确总入口与详细目录的关系。

**Tech Stack:** React / TypeScript / CSS variables / Tailwind / Vitest / Playwright。

## 授权与选择

2026-09-06 用户确认：“保留 Foundations 作为基础体系总入口……同值同用途的改成引用，值不同的确认迁移方案，两个页面同步说明当前关系。”这是对 ADR 0004 非生成旧定义冻结边界的精确增量授权：允许等值引用与文档收口，不授权修改视觉数值或整库主题迁移。原始基线不重写；校验继续约束解析后的旧值。

采用兼容别名方案，保持旧消费者与视觉值。直接删除旧名字会扩大组件改造；长期保留两份裸值会继续产生漂移，均不采用。

当前阶段仍为 token-foundations-v1；工作模式为 System Mode。Focus、Motion、Density 选择规则、Size 档位、图标、组件交互与各自 Gate 保持独立。Git、发布、Figma 与业务迁移不在范围内。

## Task 1：同值引用与验证

- 读取现有所有旧排版变量与组件几何消费者；字号只引用字号，行高只引用行高，间距只引用间距，不把高度或图标大小当成间距。
- 在既有事实源登记兼容别名，用既有生成器生成；更新 bridge 校验以接受精确授权别名，同时验证其最终值仍符合原基线。保留来源、作用域与错误拒绝能力。
- 对比 Light 同值颜色的实际属性、用途与 Dark 行为；可安全收口的才实施，其余进入映射方案。
- 先增加一个能拒绝错误别名/值漂移的最小回归检查并观察失败，再实现。运行 Token 与 B2 专项检查及相关单元测试。

## Task 2：Foundations 总入口

- 修改 `apps/playground/src/docs/foundations-page.tsx`：清晰解释包含关系，提供 Token 目录、排版方案和使用规则入口；现有示例保留，42 个旧语义色标明兼容状态。
- 修改 `apps/playground/src/docs/token-foundations/token-foundations-page.tsx`：提供返回 Foundations 的入口，说明原子值与完整预设的关系；不把单项颜色验收推导为全体系验收。
- 复用当前页面样式、路由和焦点机制；必要时调整 overview 文案及已有页面测试。页面摘要从已有合同读取，不复制数值。

## Task 3：映射方案与交付

- 逐项列出 42 个旧语义色的当前值、候选 Category、用途差异与迁移影响；无合适对应时保留独立候选，不创造近似值。
- 同步 `docs/ai/token-selection.md`、ADR 0004 增补与 `status/current-phase.yaml` 精确授权记录。
- 运行 `pnpm verify`；以真实浏览器检查两个入口、键盘焦点、旧/新排版及组件等值输出。新增检查覆盖必要的 Light / Dark 继承边界。
- 独立审阅先确认范围与方案符合，再检查代码质量；问题修复后收口。
- 实现、自动验证、独立审阅、Human Gate 和待确认颜色迁移分别记录。只向用户提交具体差值方案，不请求重复批准已授权的等值工作。

## 尚待验证

CSS 自定义属性在主题节点的求值与继承须用浏览器确认；不能因 Light 同值就声称已支持旧组件 Dark。颜色候选表中的映射在用户确认前不作为正式语义合同。

## 本轮结果（2026-09-06）

- Task 1–3 已实施：6 项旧排版尺寸和 23 项组件基础值由已有生成器输出兼容引用；Reading small/large 的 4 项属性及 Density padding/gap 也复用基础事实。组件高度、图标大小、旧颜色及交互保持原合同。
- 两页已建立 Foundations → Token 目录 → Foundations 往返入口；总入口摘要和排版说明读取现有合同。旧类仅保证本次登记的字号与行高同源，完整预设的字距与数字属性仍单独说明。
- [42 项颜色映射与 Component 候选](../audits/2026-09-06-foundations-color-mapping.md)已提交，当前不迁移颜色。其差值、跨用途、Alpha、主题和状态配对问题逐项记录。
- 最终 `pnpm verify` 退出码 0：治理、生成一致性、897 项图标检查、类型检查、35 个测试文件 / 782 tests、构建、43 Chromium tests 全部通过。专项浏览器检查包含键盘往返、同一基础字号/行高变更同时作用于旧类和新预设、原组件几何/状态及 Dark 回归。
- 规格审阅最初发现旧类与完整预设的文案范围过宽，修正为字号与行高同源后复核通过；独立代码质量审阅通过。审阅未代替 Human Gate。
- 在本机 `http://127.0.0.1:5173/#foundations` 和 `#token-foundations` 实际查看两个页面，入口、说明和排版正常。自动测试仅在页面内临时改变量检查引用关系，不改写基础数值。
- 全量类型检查同时暴露一处既有颜色验收测试对 YAML 结果缺少类型声明，已补测试类型；固定字面值测试改为核对引用及解析数值，没有放松原值、作用域或身份约束。
- 验证日志：[final-verify.log](../../evidence/runtime/foundations-alignment/final-verify.log)。本轮保留现有 registry-candidate 身份，无新增资产家族；入口视觉仍待用户查看，颜色迁移仍为 proposal-only；发布、Figma、业务接入与 Git 未执行。

下一检查点：用户查看总入口，并确认颜色映射的首个完整组件范围和相关视觉变化；不将本轮等值收口当作全库颜色迁移通过。

## 2026-09-12 基础页限定视觉确认

用户明确回复“基础页通过； 综合页通过”，接受基础页排版、线条、圆角与间距的运行视觉。决定与精确排除项见 [Token Foundations 验证记录](../../evidence/runtime/token-foundations-v1/verification.md) 及 [current-phase.yaml](../../status/current-phase.yaml) 的 `tokenRefinements.foundationsPageVisualAcceptance`。

该决定只覆盖已说明的页面视觉，不将等值 alias/入口的整个阶段、颜色映射、组件迁移、Size/Density 或其他机器与真机表现标为通过。`foundationsAlignment.humanGate` 及总 Human Gate 继续等待其余范围，历史检查日志保持原日期。Figma、发布、业务迁移与 Git 未执行。
