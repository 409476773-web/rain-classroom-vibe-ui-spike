# Input 家族 Implementation Plan

> **For Codex:** 使用 writing-plans、test-driven-development、subagent-driven-development 与 verification-before-completion；每个实现单元先验证新用例失败，再实现并检查，最终独立审阅。

**Goal:** 按已确认设计建设 Input、SearchInput 和轻量 FormItem，提供真实可交互的四档尺寸与状态对照。

**Architecture:** 复用原生 input、现有值变化路径、Rain Token、Button / IconButton；SearchInput 组合 Input，FormItem 用轻量字段 context 提供关联，不管理业务校验或网络请求。Tailwind 负责完整配方，复杂父子状态和浏览器适配使用精确登记的 CSS 例外。

**Tech Stack:** 当前 React / TypeScript / Vite / Tailwind / CVA / Vitest / Playwright；不增加依赖。

## 授权与边界

- 最新修订授权：用户在确认第 1–9 项后明确要求“开始调整代码”，授权按本稿与设计稿调整 Input / SearchInput / FormItem、示例、精确颜色与 Focus 登记及相关验证。此前只讨论的边界在本次限定范围内由新授权覆盖，首轮授权记录继续保留。
- 用户本轮明确指令：`开始建设该组件`，授权来源日期 2026-09-08。
- 设计依据：[Input 设计稿](2026-09-08-input-design.md)。此前 discussion-only 状态在本批范围内被新的实现授权覆盖，历史讨论记录保留。
- 工作模式：System Mode。范围为 Input、SearchInput、轻量 FormItem、配套 Token 登记与生成、治理、说明页和验证。
- 24px 外置实底 Button、InputNumber、TextArea、Password / OTP、表单状态库、网络请求库另行处理。
- 不修改 Classic、不增加颜色或依赖、不变更已通过的其他组件 Gate；发布、业务迁移和 Git 操作不在本批范围。
- 当前仓库没有可用 HEAD，阶段也未授权 branch / worktree / commit。直接在现有工作目录做限定范围修改，已在 `/private/tmp/rain-input-before-20260908-175442` 保存 152 个相关源文件的副本和哈希供差异核对，不创建初始提交。
- 自动验证、独立审阅、颜色用途发现和 Human Gate 分开登记。已知颜色缺口保留实际结果，不降低全局门槛。

## 本批接口与实现默认

| 项目 | 实施选择 |
| --- | --- |
| Input Size | `24 / 28 / 32 / 36` 数值联合类型，每项选择完整配方；普通默认 32，compact Density 默认 24，显式值优先 |
| SearchInput Size | 查询配方默认 28，compact Density 默认 24；显式 Size 优先 |
| 前后内容 | 保留 prefix / suffix，增加 leadingIcon / prefixText / suffixText / trailingIcon；按设计顺序排列 |
| 尾部操作 | 保留 trailingAction；增加 trailingActionChangesValue，默认 true，只读复制 / 查看 / 搜索明确为 false |
| 清空 | 默认 true；桌面 hover / focus，触屏有值即显；稳定 24px 位置。本次已将首轮误用的线性图标修正为正式 circle-close-filled，并验证双层居中 |
| 字数 | showCount 未指定时跟随有效 maxLength；上限只接受有限非负整数，0 有效；使用原生 Intl.Segmenter，不能以 code point 冒充字素簇 |
| FormItem | label、help、message、status、required、disabled 及字段 ID 的轻量关联；不保存字段值或执行校验 |
| SearchInput | onSearch(value, { source: button / enter / clear })；复用 Input 值与 ref，不创建第二套编辑状态 |

FormItem 上下文提供统一字段状态；有 FormItem 时由其控制框体与文案状态，独立 Input 使用自身状态。原生 id 与关联属性保留，并合并描述 ID。实际接口与冲突检查通过用例验证后写入组件说明。

hard 编辑策略：编辑预算为 `max(maxLength, 编辑前已提交字数)`；只截断此次插入片段，保留未编辑的前后缀。回填超限允许逐步删除和不增加字数的替换。IME 开始时捕获基线，结束后按该基线限制，避免把组字中间值当回填值放过。

## Task 1：授权登记与 Token 接入

**Files:**

- Create: `packages/foundations/src/input-token-contract.ts`、`packages/foundations/src/input-token-contract.test.ts`
- Modify: `packages/foundations/src/index.ts`、`scripts/token-foundation-outputs.mjs`、`scripts/generate-token-foundations.mjs`
- Modify: `scripts/verification-helpers.mjs`、`scripts/verify-boundaries.mjs`、`scripts/verify-tailwind-b2.mjs`、`scripts/verify-token-foundations.mjs` 及对应精确回归测试
- Modify: `status/current-phase.yaml` 的独立 `componentRefinements.input`、`manifests/contracts/tailwind-b2.yaml`
- Generated: 现有生成器管理的 Token、theme、静态类清单、生成来源合同

1. 先添加四档高度、24px clear 目标、静态类及未授权增量拒绝用例，观察缺失功能导致失败。
2. 只新增 Input 组件专属高度与 clear 目标，其他几何直接使用现有 Typography / Space / Radius / Line / Icon Size。
3. 保留旧 Input bridge 的兼容条目，新 Input 不再消费旧密度高度、旧 gap8 等引用。
4. 按最新 IconButton 增量方式登记精确授权和文件清单，不改变冻结 B2 历史。
5. 运行 `pnpm generate:tokens`，再运行对应单测和 `pnpm verify:tokens` / `pnpm verify:tailwind-b2`；检查失败是否仍依赖尚未落地的 UI 文件。

## Task 2：Input 编辑与语义部件

**Files:**

- Modify: `packages/ui/src/input/input.tsx`、`input.utils.ts`、`input.test.tsx`、`input.utils.test.ts`
- Create: `packages/ui/src/input/input.styles.ts`
- Modify: `packages/ui/src/styles.css`、`packages/ui/src/index.ts`

1. 添加默认清空、四档 Size、语义顺序、Error / Warning 清空、readonly 动作权限、disabled 自定义动作阻断的失败用例。
2. 添加 hard 回填 6 字 / 上限 4、退格只删一字、中间插入不删尾部、选区替换、max 运行时下调与 IME 基线用例。
3. 保留受控 onChange、受控 onValueChange、非受控三种路径；清空通知一次并恢复焦点。
4. 默认计数与无障碍超限说明分开，计数不逐字 live 播报；不可见清空不进入 Tab。
5. 用固定静态样式映射接入已定 Token。自定义附加区 / 尾部动作的外层防护覆盖指针与键盘激活，禁用时排除内部焦点，保留已知 Button / IconButton 禁用外观。
6. 运行 `pnpm exec vitest run packages/ui/src/input --maxWorkers=2`，逐项修复并保留既有事件回归。

## Task 3：FormItem 与 SearchInput

**Files:**

- Create: `packages/ui/src/input/form-item.tsx`、共享 `input-field.test.tsx`
- Create: `packages/ui/src/input/search-input.tsx`、共享 `input-field.test.tsx`
- Modify: `packages/ui/src/input/input.tsx`、`packages/ui/src/index.ts`
- Create / Modify: 对应 `manifests/ui/input.yaml`、`search-input.yaml`、`form-item.yaml`

1. 先写 FormItem 标签点击、自动 / 显式 ID、合并说明 ID、统一 status、required / disabled 与 ref 的用例。
2. 实现最小字段 context，保持值管理在 Input / 页面；可访问名称不依靠 Placeholder。
3. 先写 SearchInput button / Enter / clear、IME / keyCode229、Loading 可编辑与可清空、readonly 可搜、disabled 不搜、受控清空父级未即时回填的用例。
4. 使用现有 TextButton，内嵌动作声明不改值；不在组件中管理请求序号和结果。
5. 运行本批三个组件的专项单测，再做规格与代码审阅。

## Task 4：真实说明页与兼容更新

**Files:**

- Create: `apps/playground/src/docs/components/input-page.tsx`、`input-page.css`、`input-page.test.tsx`
- Modify: `apps/playground/src/App.tsx`、`apps/playground/src/routes/route-registry.ts`
- Modify: `apps/playground/src/docs/components/core-ui-page.tsx` 与必要的既有 Input 示例
- Create: `tests/e2e/input.spec.ts`
- Modify: `tests/e2e/core-ui.spec.ts`、`tests/e2e/foundations.spec.ts` 中被明确修订的旧 Input 预期

1. 先写入口、四档和关键交互的页面检查，再添加 `#input` 独立说明页。
2. 展示真实 Input / SearchInput / FormItem，包含四档、状态、附加内容、字数、受控编辑和查询 Loading；示例不复制组件外观。
3. 查询演示由页面保存草稿之外的结果与请求状态，使用可控的模拟延迟验证乱序响应，不引入通用请求框架。
4. 页面同时提供 Light / Dark / 嵌套 Light 与两类父面检查；仅登记真实新增消费者。
5. 更新已被设计修订的旧几何 / 状态断言，保留其他组件、旧 bridge 和全局 Focus 检查。

## Task 5：验证、独立审阅与交付

**Files:**

- Create: `evidence/runtime/input/verification.md`、必要的真实截图 / 测量结果
- Update: 以上计划、Input 设计稿的实施指向、当前独立状态与组件 Manifest

1. 运行专项单测、Token 生成一致性、治理、类型和构建。
2. 运行 `pnpm exec playwright test tests/e2e/input.spec.ts`；验证四档真实几何、24px 操作范围、鼠标 / 触屏、Tab / Focus、IME、输入选区与搜索竞态。
3. 运行完整既有验证批次。已有并行任务导致的无关失败单独归属，不通过修改无关组件来伪造本批通过。
4. 独立规格审阅通过后再做代码质量审阅；修复本批可操作问题并复验。
5. 分别记录实现、自动验证、颜色发现、独立审阅和 Human Gate。打开真实说明页交付人工视觉检查，不自行将 Human Gate 标为 accepted。

### 颜色发现的处理要求

G3 必要边框、G4 红计数在部分编辑背景的对比度，以及 Warning 背景上红计数的跨色族资格，必须保留各自实际角色和失败原因。允许借用现有精确候选报告通道记录 Input 指定用途，但不把它们改成 decorative、不扩大其他组件例外、不修改全局 validateColorUse。报告中的未解决项均为 `acceptedException: false`；技术测试通过不表示颜色资格或视觉 Gate 通过。


## 首轮实施检查点（历史）

Input、SearchInput、FormItem 共用输入目录；组件与检查页已实现；相关 UI/页面 67 项、共享回归 441 项及完整浏览器 81 项通过，最终 Input 浏览器补验 5 项通过；两个独立审阅已复核关闭代码发现。完整运行记录及尚未通过的颜色用途见 [验证记录](../../evidence/runtime/input/verification.md)。阶段不将这些颜色发现默认为例外或 Human Gate 通过。

## 实物审阅修订检查点（已实现，Human Gate 待确认）

以 [设计稿顶部的最新修订](2026-09-08-input-design.md) 为准。第 1–7 项由用户“确定”确认：filled 清空图标双层居中、可见编辑描边 1px、清空前移至单位之前、框内文字动作优先主题色、移除自动校验图标、警告说明橙色、只读鼠标不呈现编辑态且保留键盘位置提示。

第 8 项已由用户进一步明确：计数呈现 `2/3`，去掉斜杠两侧空格、不加字间距；右侧辅助部件仍保持 4px，替换此前 2px 建议；清空点击区保持 24px。

第 9 项将单位和普通计数从原 Text/Neutral/4 改为公开 Text/Neutral/5，以加强与 Text/Neutral/1 正文的层级差。单位继续使用现有 suffixText 入口，并由单独的后静态文字样式提供 /5；Placeholder、prefixText 和前后自定义附加内容保持原色，不增加新的公共接口或按文字内容猜测单位。超限计数保持红色，Disabled 保持禁用色。同步实际颜色消费者并复核用途、主题和对比度，不将用户的色阶方向确认当作对比度例外接受。

已补齐两主题、两类父背景和实际状态测量：Text/Neutral/5 的单位与普通计数各有 9 项低于 4.5:1；橙色 Warning 说明有 2 项。连同原有发现，核心配方保留 36 项对比度与 4 项色族资格发现。内嵌 Brand TextButton 的 48 个标签组合均达到 4.5:1（最低 4.570389581595），但其中 8 项色族资格仍待审阅。完整数据保存在验证记录所链接的两份 JSON 中，没有接受例外或调整全局门槛。

本次已复核四档尺寸中的图形中心与实际可见间距、带单位的清空显隐、计数整体性、主题文字动作、Warning / Error 下无多余状态图标、橙色说明，以及只读的鼠标 / Tab / 内部动作。独立代码复核发现的“点击只读框空白后 Tab 焦点提示丢失”已修复，并增加真实浏览器回归。实际 Parts、颜色消费者、Focus 例外与两份测量证据均作精确登记。当前验证序列见 [验证记录](../../evidence/runtime/input/verification.md)，以上首轮数量只作历史；Human Gate 和其他组件验收均不由本批自动通过。
