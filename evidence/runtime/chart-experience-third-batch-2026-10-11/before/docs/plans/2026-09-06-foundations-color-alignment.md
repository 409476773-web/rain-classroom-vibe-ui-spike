# Foundations 已确认颜色映射 Implementation Plan

**Goal:** 将本轮用户明确指定的旧颜色角色接入现有 Category 事实源，保留缺少色系及尚未确定状态的条目。

**Architecture:** 复用 token-contract、Color Registry 与现有生成器；登记角色到 Category ID 的关系，展示值和 CSS 引用均由该关系生成。原始 B2 基线保持不变，增加本轮精确授权校验。

**Tech Stack:** TypeScript / CSS variables / Tailwind / Vitest / Playwright。

## 当前授权与边界

2026-09-06 用户在完整差异清单后明确指定：secondary/muted/placeholder/disabled 分别用 Text/Neutral/3/4/5/6；page 用 Background/Neutral/3 或 4；default/subtle border 用 3，轻强调用 2，strong 默认 2、极重要边界才用 1；action-primary 文字用 Text/Brand/1、填充用 Fill/Brand/Solid/2；action-disabled 用 Fill/Neutral/Solid/2；成功、警告、错误、信息弱背景用各自半透明色。缺少对应色系的颜色暂不改，用户后续补充 Token。

本次 System Mode 精确允许这些映射及必要的实际用途拆分，修订此前颜色冻结边界；不是全库组件重新设计或 Dark 完整迁移。默认选择 page /3、四种弱背景 Alpha/2（10%）、信息弱背景采用前轮建议的 Second；/4 页面底、/2 轻强调边界、/1 极重要边界作为明确可选规则，不机械替换全部消费者。未明确确认的其余旧颜色保持待定；紫/青及 AI 色系保留待补。

## 实施步骤

1. 修改 `packages/foundations/src/token-contract.ts`：登记 14 个已确认角色的 Category 对应及 action-primary 独立文字输出；保留 42 个旧条目身份。CSS、展示值及来源说明复用同一登记。
2. 修改既有生成器输出与精确验证：旧已迁移 CSS 改成公共 Category 引用，在根及已有主题边界重新声明引用，避免继承已求值的旧主题结果。未迁移组件不宣称 Dark 合格。跨用途的 Tag/Badge 等不再消费 Text 角色作填充。
3. 更新两页、映射盘点、AI 使用说明与 ADR，说明默认/可选层级、Alpha、缺色系待补和当前覆盖范围。
4. 先用一个真实来源对应检查证明旧实现未满足，再实现；执行生成、治理、相关单元与浏览器检查，最后完整验证和独立审阅。

## 验证范围与已知限制

- 当前用户选择的 Text/Neutral/5 在白底对比度约 3.708:1，未达到普通文字 4.5；不能放松 `validateColorUse` 或把真实占位、输入单位、可点击入口内的说明当装饰来制造通过结果。此项单独记录，映射正确不等于可读性验收通过。
- Text/Neutral/4 的弱档消费资格、半透明边界在实际底色上的必要边界资格仍须按组件核对；本次不把全局角色映射当作整库配方通过。
- 本次不改变 Category 105 项事实值、不新增色系，不覆盖完整 Dark 组件视觉验收。焦点品牌蓝和行为、图标、字号、尺寸、Git、Figma 与发布保持原边界。

## 结果

本轮映射实现完成；`pnpm verify` 退出码 0，治理、生成一致性、897 项图标身份、类型检查、35 个测试文件 / 790 tests、构建、44 Chromium tests 全部通过。完整日志见 [verify.log](../../evidence/runtime/foundations-color-alignment/verify.log)。规格与代码质量独立审阅均通过；Human Gate 仍待用户查看，可读性状态保留 `open-placeholder-and-consumer-eligibility`。

本轮检查证明：14 项显示值来自 Category 事实；主操作文字、填充分别得到 Text/Brand/1、Fill/Brand/Solid/2；Input 错误弱面使用真实 10% Alpha；变更根 Category 变量会影响实际占位样式；嵌套 Dark → Light → Dark 的语义引用，以及真实 Link 的中间引用，都会在主题边界重新求值。Tag/Badge 原实心填充、其它 28 个旧条目及 105 个 Category 颜色事实未改变。

浏览器暴露并已修复：Foundations 文件处于既有 Tailwind 扫描排除范围，故仅为新增文字样本精确登记一个静态候选；通用 action-primary 主题映射会覆盖同名文字 utility，现改为独立 text/bg 输出并以真实 Tailwind 编译检查；Link 的中间变量也纳入已有主题边界生成。检查没有放宽私有色、范围或颜色资格规则。

已在本机 `http://127.0.0.1:5173/#foundations` 查看更新后的来源标注和主操作文字/填充示例。页面底默认 /3，弱背景默认 Alpha/2，信息弱背景默认 Second；这些具体默认选择与用户明确指定的层级分开记录。缺色系等待补充，其余尚未确认的映射仍待定；本轮不代表整库只剩这一套颜色，也不代表全组件 Dark 或可读性验收完成。Git、Figma、发布与业务迁移未执行。
