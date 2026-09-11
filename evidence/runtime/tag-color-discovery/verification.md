# Tag 颜色检索与复用入口验证

- 日期：2026-09-09。
- 授权：用户在第一阶段范围问题后回复“确认范围”。
- 工作模式：System Mode。
- 范围：20 组既有 Tag 配色的检索信息、同源 AI 索引、颜色目录与用途校验、两个最小页面使用样例。
- 实施：完成；自动验证：通过；[独立审阅](independent-review.md)：通过；目录 Human Gate：已接受，范围见下方确认记录。
- 颜色基线：[color-baseline.json](color-baseline.json)。269 个稳定 ID、164 个 Tag 角色及 13 个颜色输出/Tag 源码文件的原始指纹，仅作比较证据。
- 基线不是运行时颜色源；本批不调整既有色值、ID、utility、组件视觉、对比度门槛或例外接受状态。
- 当前 Git 无已跟踪变更输出，仓库仍有原有未跟踪内容；不能据此称工作区干净。本批使用精确文件与基线比较，不执行 Git 操作。

## 验证范围

检索覆盖中文、业务别名、Family、准确 Token ID 和角色筛选；用途校验覆盖通过、缺少上下文、角色错误、OnColor 资格与对比度不足。目录检查键盘、搜索清空、空结果、主题切换、窄屏和真实父表面。新页面样例的声明与实际 DOM 应一致，自动检查不代替新场景 Human Gate。

## 改动入口

| 文件 | 本批内容 |
| --- | --- |
| [tag-token-contract.ts](../../../packages/foundations/src/tag-token-contract.ts)、[color-registry.ts](../../../packages/foundations/src/color-registry.ts) | 中文检索信息、同源查询与声明条件评估 |
| [generate-token-foundations.mjs](../../../scripts/generate-token-foundations.mjs) | 向现有 Manifest 生成 color.discovery |
| [color-panel.tsx](../../../apps/playground/src/docs/token-foundations/color-panel.tsx)、[color-pairing-preview.tsx](../../../apps/playground/src/docs/token-foundations/color-pairing-preview.tsx) | 搜索、用途筛选、配对条件、类名与页面使用样例 |
| [token-foundations.css](../../../apps/playground/src/docs/token-foundations/token-foundations.css)、[token-foundations-page.tsx](../../../apps/playground/src/docs/token-foundations/token-foundations-page.tsx) | 复用搜索控件样式，更新颜色入口说明 |
| [token-selection.md](../../../docs/ai/token-selection.md) | AI 查询、消费登记与适用范围指引 |
| [token-foundation-outputs.mjs](../../../scripts/token-foundation-outputs.mjs)、[verification-helpers.mjs](../../../scripts/verification-helpers.mjs) | 登记 8 个实际样例节点，约束本批阶段授权 |

对应检查在现有 Registry、目录、生成器与阶段测试中扩展；浏览器检查复用 [token-foundations.spec.ts](../../../tests/e2e/token-foundations.spec.ts) 与 [color-contrast.ts](../../../tests/e2e/color-contrast.ts)。阶段与检查点见[实施计划](../../../docs/plans/2026-09-09-tag-color-discovery-implementation.md)。生成结果继续由原生成器维护。

## 当前结果

| 检查 | 最终结果 |
| --- | --- |
| 颜色事实基线 | 269 条记录、Profile、变量与 utility 的 JSON 内容逐项一致；20 组配色、164 个 Tag 角色未增加或改名 |
| 受保护文件 | 基线中的 13 个 CSS / Token / Tag 源码文件 SHA-256 全部一致 |
| 同源输出 | 生成 Manifest 的 color.discovery 与 Registry 对象一致，目录和 AI 入口共用 |
| 相关测试 | 6 个文件，290 / 290 通过，包含阶段权限、历史冻结、配对、登记及目录回归 |
| 完整治理 | pnpm verify:governance 通过；实际颜色消费者与原合同继续校验 |
| 类型 / 构建 | pnpm typecheck、pnpm build 均通过；构建仍提示既有大文件体积，不属于本批新增依赖 |
| 浏览器 | Chromium，Token Foundations 全部 9 / 9 通过，含新增的搜索和实际使用两项 |
| 独立审阅 | 首轮 3 项 P2 修复后通过，无剩余 P1 / P2 |

功能回归包含中文色名、继承的业务名、Family 与完整 ID 检索，角色筛选、空结果与清空，Light / Dark 选择，同色组重复预览复位与标题焦点。实际页面采用现有 Category 类名，8 条消费者登记覆盖两主题的表面、Alpha 填充、正文及图标；错配 Alpha 父底会被拒绝。

用途结果分别保留数值、声明条件以及 actualUse 状态。OnColor 数值达到阈值仍不能绕过具名 Recipe 条件；Tag 关闭反馈、动作或业务专用色在通用页面检索中返回 needs-context，原 validateColorUse 未放宽。固定的 60 项配对仅覆盖三种非交互用途及明确父背景，不包含状态叠层、整体透明度或必要边界。

## 浏览器证据

浏览器测试使用独立的 127.0.0.1:4275 服务，原 4173 预览服务保留。通过 RAIN_TOKEN_EVIDENCE_DIR 将本次重跑的旧目录截图也写入本批 browser 目录，没有覆盖旧 Human Gate 图片。

- [配对预览与完整类名](browser/discovery-pairing.png)：Dark 紫色 Alpha/1、Neutral 正文及同色图标，明确真实父底与用途条件。
- [390px 检索界面](browser/discovery-mobile.png)：键盘 Focus、控件无重叠且页面无横向溢出。初次截图发现输入框重叠，新增断言先失败，使用已有宽度 utility 修复后通过。
- [两主题实际页面内容](browser/discovery-page-examples.png)：真实页面节点使用 Category utility，没有使用展示专用 swatch。
- [计算样式与对比度记录](browser/discovery-measurements.json)：读取浏览器实际前景、Alpha 填充和不透明父底再计算，pageerror 为 0。

| 实际页面样例 | Light | Dark | 原阈值 |
| --- | ---: | ---: | ---: |
| Neutral 正文 / Purple Alpha/1 / Background/Neutral/1 | 13.3495 | 10.8738 | 4.5 |
| Purple 提示图标 / 相同父表面 | 5.0341 | 3.8137 | 3.0 |

上述结论仅适用于这两个实际用途。目录中的其他候选仍需匹配其实际主题、父表面、内容与交互条件，不能由这两个样例取得验收。

## 生成与范围

搜索索引复用现有数组与生成器，不增加依赖、搜索服务或第二套颜色表。当前 color.discovery 紧凑 JSON 为 193861 字节，包含 269 条检索记录与 60 项限定配对；AI 指南要求只读取命中色组和必要字段。Node 本机连续 1000 次“蓝紫 + Fill”检索平均约 0.09ms，仅为该查询的本机测量，不代替浏览器性能或人工易用性验收。

回归期间并行 Checkbox 任务新增阶段字段曾使完整治理失败；其精确合同接入后已恢复通过。历史 B2 测试再补用现有 Checkbox 文件登记清单，只从临时历史副本排除新增文件；冻结归档与真实工作区校验未放宽，最终相关测试全部通过。

本批未进行旧 Tag 对比度例外接受；原 2535 条 Tag 对比度发现仍未接受，已有视觉确认范围保持独立。Figma、跨项目分发、发布、业务迁移与 Git 未包含在本批授权中。

## 目录体验确认

2026-09-09，用户在收到“当前待确认的是目录的搜索与配对预览体验”的交付后回复“确定。”。据此接受本次颜色目录、搜索与配对预览的体验，精确范围为 `tag-color-directory-search-and-pairing-experience-only`；确认原话与证据登记在 [current-phase.yaml](../../../status/current-phase.yaml)。

本次收口只更新验收记录、阶段检查点及对应的精确校验。颜色事实、Tag 实现和页面体验沿用已经检查的版本；对其他组合的实际使用资格仍逐项验证，旧 Tag 对比度例外状态仍为未授予。

收口复验：阶段测试 232 / 232、完整治理与类型检查均通过。新增确认分支先失败后通过；19 种越界范围、不完整检查或错误确认记录均被拒绝。未修改界面，因此沿用上述浏览器与构建证据。
