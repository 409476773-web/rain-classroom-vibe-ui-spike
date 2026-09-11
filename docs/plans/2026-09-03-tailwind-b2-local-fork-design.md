# Tailwind B2 与 Local Fork 设计说明

## 文档状态

- 决策状态：设计方向已由用户逐项确认。
- 当前动作：用户已明确授权进入 `tailwind-b2-composition-contract`；首批建立阶段边界并冻结最新基线，不表示组件迁移完成。
- 入场基线：Day 3 Core UI、Button 后续调整、文字按钮及完整图标库。Button 和图标库的独立 Human Gate 已接受；文字按钮仍待确认，Input 等其余家族未评估。各状态以 `status/current-phase.yaml` 为准。
- 实施授权：仅已批准的 Input / Button / 搜索操作区试点及两项锁定直接依赖。不包含图标源重绘、全库迁移、Git、Figma 写入、发布或业务迁移。
- 推荐路由：在 Day 3 与 Day 4 Headless 对比之间增加独立的 `Tailwind B2 Composition Contract` 检查点，避免把 Tailwind 架构变化与 Headless 方案变化混在一次实验中。

## 正式决策

Rain Next 采用以下 B2 定义：

> 全局 Master Component 采用 Tailwind-first，但默认只读；AI 默认在当前页面或功能内进行修改，必要时创建 Local Recipe 或 Local Fork。Tailwind 不追求 Tailwind-only，允许部分有理由、受 Token 约束的 CSS 例外。局部方案只有经过人工确认后，才能晋升为全局 Variant、Recipe、Token 或 Master 变更。

这不是“所有业务都直接修改公共组件”的纯方案 B。它是带来源追踪、作用域隔离、Token 约束和人工晋升 Gate 的 B2。

## 目标

1. 让 AI 能快速、直接地理解并修改组件内部 Parts 与 Tailwind 样式。
2. 默认把改动限制在当前页面或功能，不影响全局 Master 和其他页面。
3. 继续让 Rain Token 决定正式资产允许使用的颜色、字体、间距、圆角、阴影、密度和状态语义。
4. 允许设计探索产生局部候选 Token，但不允许未登记任意值悄悄进入正式 Local Fork。
5. 用可重复的对照任务证明 B2 是否真的提升 vibe coding / vibe design，而不是因为采用了 Tailwind 就预设结论。

## 非目标

- 不在本检查点实现 Select、Dialog、Headless、Layout 或既有四类 Benchmark。
- 不一次迁移 Tag、Badge、Surface、Card 或全部 Playground CSS。
- 不建设完整 Registry 服务、MCP 或自动发布链路。
- 不让 AI 自动修改或晋升全局 Master。
- 不把自动检查等同于视觉 Human Gate。
- 不授权 Figma 写入、包或 Registry 发布、业务迁移、本地 Git commit 或远端 Git。

## 架构与数据流

```text
Rain reference tokens（Foundations 私有）
            ↓
Rain semantic / component / composition tokens（唯一公共事实源）
            ↓
Tailwind v4 @theme inline bridge（只做映射，不复制值）
            ↓
受约束 Tailwind utilities + 有理由的 CSS exceptions
            ↓
全局 Master Component（Tailwind-first，managed，只读）
            ↓
现有 Variant → Local Recipe → Local Fork
            ↓
当前页面 / 功能中的高保真原型
            ↓
静默记录候选 → 阶段节点集中提示 → 人工晋升 Gate
```

Tailwind theme bridge 只能引用 Rain 的公共语义、组件和组合 Token。`--rain-ref-*` 私有参考色不得映射为可消费 utility，Tailwind 默认颜色、字体、字号、圆角、阴影和间距体系也不得在正式 Master 或 Local Fork 中开放。

## 四种资产身份

| 对象 | 作用 | 默认权限 | 是否影响全局 |
| --- | --- | --- | --- |
| Global Master | 共享组件事实源 | `managed`、只读 | 是，因此只能走 System Gate |
| Existing Variant | Master 已声明的稳定变化 | 可直接选择 | 不改变 Master |
| Local Recipe | 当前页面或功能的一组命名样式搭配 | AI 可编辑 | 否 |
| Local Fork | 当前页面或功能拥有的完整源码副本 | AI 可编辑内部 Parts | 否 |

Local Recipe 不是一串散落在 JSX 中的临时 class。它必须是具名、可追踪的局部资产，声明来源组件、作用域、使用的 Token、修改 Parts 和候选 Token。

Local Fork 必须记录：

- 来源组件 ID；
- 来源文件与来源版本或 checksum；
- 创建时的 Master 版本；
- 当前页面或功能作用域；
- 已修改 Parts；
- 局部候选 Token；
- 同步状态；
- 晋升状态。

## AI 默认路由

AI 在后台静默执行以下顺序，不把它变成每次都需要用户确认的流程：

1. 先检索现有 Variant；
2. 只涉及当前页面视觉搭配时，创建或复用 Local Recipe；
3. 涉及内部 Parts、DOM 结构、行为或 Recipe 已明显别扭时，创建 Local Fork；
4. 只有用户明确提出全局修改，才进入晋升评估；
5. 只有意图不明确、高风险、需要突破 Token 或涉及无障碍与核心行为时，才询问用户。

完成局部修改后，AI 只需简短报告采用了哪一层，例如：“已创建当前搜索区的 Local Recipe，全局 Input 未变化。”

## Tailwind 能力边界

### 自由使用

- `flex`、`grid`、排列、对齐、换行、定位；
- `min-w-0`、`w-full`、`flex-1` 等不引入品牌视觉的结构关系；
- 经 Rain 明确登记的组合间距和未来 Layout 断点。

### 只能通过 Rain 映射使用

- 颜色与表面；
- 字体、字号、行高和字重；
- 间距和控件尺寸；
- 圆角和阴影；
- 边框、Focus、Motion 与 Density；
- Input、Button 等组件专属尺寸。

### 正式资产中禁止

- Tailwind 默认色板与默认字体、圆角、阴影体系；
- 未登记的方括号任意值；
- 原始十六进制、RGB/HSL/OKLCH 颜色；
- `!important` utility 或全局 important 模式；
- 运行时拼接出的动态 utility 名；
- 对 `--rain-ref-*` 私有参考 Token 的直接消费；
- 为单一页面修改全局 Master 或全局 Token。

初始 Rain 组合间距只建立受约束的偶数刻度：`0 / 2 / 4 / 6 / 8 / 10 / 12 / 14 / 16 / 18 / 20 / 24 / 32px`。无法落入该刻度的既有组件细节，使用组件专属 Token 保持视觉回归；新探索值则进入局部候选 Token，不扩大公共刻度。

Tailwind 断点不在本试点中定义。正式响应式断点留给 Layout 阶段；搜索操作区优先用自然换行验证组合，不复制 Tailwind 默认断点。

## Tailwind-first 与 CSS 例外

CSS 例外按理由判断，不按 Tailwind 占比判断。至少满足以下一种情况才允许使用：

- Tailwind 无法稳定表达浏览器自动填充、特殊伪元素或强制颜色模式；
- Tailwind 表达会造成明显重复或难以理解的复合 Variant；
- 涉及关键帧、复杂动画或多个 Parts 的联动状态；
- 需要适配 Headless 或第三方组件的特殊 DOM，但该项不在当前试点实施。

每个例外必须：

- 在 Manifest 中登记 ID、选择器、理由和所有 Token；
- 限制在组件或 Local Fork 范围；
- 不包含裸颜色、未登记视觉值或全局覆盖；
- 有对应自动测试；
- 能在后续 Tailwind 能力改善时被重新评估。

Input 的父级 `:has(...:focus-visible)`、强制颜色模式和 Button loading keyframes 是本试点优先保留并登记的 CSS 例外候选。

## Variant 与类名冲突工具

新的 B2 检查点可以在明确授权后安装：

- `class-variance-authority@0.7.1`：把 Variant、Tone、State、Density 映射为静态且可检测的完整 Tailwind 类名；
- `tailwind-merge@3.6.0`：合并基础类、Variant 和 Local Recipe 时移除冲突类。

两个版本在计划日期分别为 npm 的稳定版本；`tailwind-merge@3.6.0` 声明支持 Tailwind 4.0–4.3。实施前必须重新读取 npm 元数据、license、依赖和 integrity；若版本撤回、兼容范围改变或需要换版本，应停止并重新确认，不得静默升级。

“两项”限制指直接依赖。正常的传递依赖也必须审计并锁定，但不把 CVA 自带的 `clsx` 误认为额外选装工具；Rain 不新增 `clsx` 直接依赖或直接消费它。

工具只解决类名组织和冲突，不负责作用域隔离、Token 合规、来源追踪或全局晋升。Rain 仍需自己的 Manifest 和验证器。

## 与已接入图标库的组合边界

图标库是独立、已完成的资产轨道，不是本次 Tailwind 迁移对象。保留 [图标 ADR](../adr/0001-icon-assets-and-semantic-consumption.md)、`manifests/icons.json`、`registry/icons.json`、来源锁、生成入口及独立验收状态。B2 使用 ADR 0002；Registry 不再要求空目录，而是只保留既有图标登记、不新增 B2 分发资产。

- 先按 [图标选择规范](../ai/icon-selection.md) 和 Foundations catalog 核对用途与可用性，静态引用 `@rain-next/ui/icons/<slug>`。Local Fork 继续引用，不复制图标实现或整个图库。
- 普通图标保留 alpha mask 与宿主 `currentColor`；固有配色图标保留经来源登记的原始图像。原始 SVG 的来源色值不属于页面新增裸色，不为通过 Token 检查而改写。
- 图标大小、间距和颜色由宿主 Part 与 Rain 组件 Token 管理；不新建全局 Icon 尺寸刻度。现有未分层 `.rain-icon` CSS 与 inline `size` 可能覆盖 Tailwind utility，必须用浏览器计算样式验证，禁止用 `!important` 补救。
- Button 保留当前 `primary / secondary / tertiary / text`、文字按钮独立尺寸与 tone、五档普通尺寸，以及正式 PNG Loading mask 的渐隐、120% 裁剪和 800ms 动画。不得恢复旧 CSS spinner。
- Input 保留 prefix / suffix / trailing-action 和当前“清除”按钮；有图标选型规则不等于授权自动改变清空按钮的呈现。
- 已通过的图标 Human Gate 不重开；B2 新增的是宿主组合兼容性检查，而不是图标重设计。

## 局部候选 Token

AI 必须优先复用 Rain Token。确实缺少合适值时，可以为当前页面或功能创建局部候选 Token：

- 使用 `--rain-local-<feature>-<role>` 命名；
- 只能在 Local Recipe 或 Local Fork 的作用域根节点下生效；
- 在 Local Manifest 中记录值、原因、消费者和创建时间；
- 不写入全局 `:root`；
- 不自动进入 Foundations；
- Local 资产删除时一并删除；
- 晋升时先判断它是否具有稳定语义，而不是因为数值被复用就直接增加全局 Token。

## 来源更新与同步

Global Master 更新后，Local Fork 不自动覆盖：

1. 系统根据来源 checksum 标记 `update-available`；
2. 展示来源版本与本地版本之间的差异；
3. 普通视觉变化由人工选择是否合并；
4. 无障碍、核心交互或严重缺陷修复标记为 `required-review`，在发布前必须处理；
5. Local Fork 不因完成同步而自动晋升。

这相当于“组件库有更新”的可比较提示，而不是静默替换本地设计。

## 晋升与低打扰建议

AI 可以发现重复模式，但没有晋升权：

- 平时静默记录，不在 vibe coding 过程中打断；
- 同一变化至少出现在三个独立页面或业务场景，才具备主动提示资格；
- 只在阶段收尾、发布前检查或用户主动询问时集中提示；
- 同一候选只提示一次，选择“暂不处理”后不重复提醒，除非出现新的重要证据；
- 无障碍或严重缺陷不受静默规则限制。

晋升评审优先判断是否应成为新的 Variant 或 Recipe；只有明确的产品级决策才能替换全局默认值。

## 试点范围

只验证：

- Global Master：Button、Input；
- Local 场景：一个搜索操作区；
- 路由层级：Existing Variant、Local Recipe、Local Fork；
- Token 层级：Rain Token、一个必要时才创建的局部候选 Token；
- 同步层级：来源版本、差异提醒，不自动覆盖；
- AI 层级：固定自然语言任务的基线与 B2 对照。

不迁移 Tag、Badge、Surface、Card。Select 不在当前 Rain Next 中实现，且会受 Day 4 Headless 决策影响，因此不得加入本试点。

## 对照任务

现有原生 CSS + Rain Token 作为基线，B2 作为实验版本。两边使用完全相同的任务：

1. “只把当前搜索区的 Input 调得更宽松、背景更浅，不影响其他 Input。”
2. “只调整当前页面搜索 Button 的视觉层级，不改变全局 Button。”
3. “在同一功能的第二个搜索状态中复用局部样式，并仅为当前搜索功能增加一个独立的 `scope-label` Input Part；不修改全局 Input。”

基线必须在迁移源码前，用隔离副本完成并记录。不能在 B2 完成后凭记忆补写基线。

正式计量前，两边先冻结同一搜索夹具、非目标对照区、可观察的验收条件与前置状态。P1 / P2 从各自相同的未修改夹具开始；P3 从各自已保存的 P1 / P2 结果开始，前置成本不混入 P3。同一组只比较架构，不同时换图标、文案或控件版本。若初始 Input 已为纯白，“更浅”必须先明确为相对于哪个初始表面，不能编造变浅的结果。

快照冻结不等于完成三项基线实测。首次成功和用户纠正只能来自真实任务观察；未发生的用户评价记为 `not-measured` 并写明原因，自动检查不得冒充用户意见。

## 验证策略

### 即时检查

- 只运行当前组件、Local Recipe / Fork 和 Tailwind contract 的定向测试；
- 检查修改文件范围；
- 检查未登记 utility、裸值和来源状态；
- 不在每次微调后运行完整 `pnpm verify`。

### 集中验证

- 一个提示任务完成后运行相关 Unit / Interaction / Browser 检查；
- 三个任务完成后运行完整 `pnpm verify` 与 `pnpm verify:reuse-audit`；
- 生成真实浏览器截图和计算样式证据；
- 再进入独立 Human Gate。

## Go / No-Go 标准

### 安全门槛：必须全部通过

- 局部修改没有改变 Global Master；
- 非目标页面没有产生视觉变化；
- 没有 Tailwind 默认视觉值或未登记任意值；
- Input、Button 的 Focus、Error、Disabled、Loading、IME 和键盘行为保持正常；
- Local Fork 能追踪来源、版本和差异；
- 当前已有自动验证全部继续通过。
- 图标来源、语义、单图标入口与既有可访问性不变；宿主供色、尺寸、Loading、强制颜色模式及按需打包回归通过。

### 价值门槛：至少三项优于基线

- 首次完成需求的成功率；
- 用户补充或纠正次数；
- 修改是否集中在正确范围；
- 后续继续调整是否更容易理解和操作。

耗时只作为辅助指标，因为模型响应和运行环境会波动。

只有安全门槛全部通过、四项价值指标至少三项优于基线，并且 Human Gate 接受，才可以提出下一批组件的迁移计划。任何一项安全门槛失败，或 B2 没有明显提升 AI 编辑体验，都应停止扩大；不能因为已经投入迁移成本而继续。

## 生命周期边界

本试点必须分别报告：

- Implementation；
- Automated Verification；
- AI Editability Benchmark；
- Human Gate；
- Figma Editable Material；
- Figma Component / Variant Publication；
- Package / Registry Publication；
- Business Migration；
- Local Git Commit；
- Remote Git。

前四项中的任意一项完成都不授权后续状态。规划完成也不代表试点已经实施。

## 实施前必须满足

1. 用户明确授权进入新的 `Tailwind B2 Composition Contract` 检查点；
2. `status/current-phase.yaml` 与 `scripts/verify-boundaries.mjs` 先建立该阶段的 fail-closed 合同；
3. 基线对照副本和指标格式先建立，再修改 Button / Input；
   - Button 基线必须取自 2026-09-03 实现 Gate 之后的当前页面；若后续 Human Gate 调整红色、20% 焦点柔光、40px 留白或 Loading 透明度，Task 7 前必须刷新基线。
4. 新依赖只允许上述两个锁定版本；
5. Git、Figma、发布和迁移继续保持独立未授权。

## 参考

- Tailwind theme variables：<https://tailwindcss.com/docs/theme>
- Tailwind source detection：<https://tailwindcss.com/docs/detecting-classes-in-source-files>
- Tailwind utility conflicts：<https://tailwindcss.com/docs/styling-with-utility-classes>
- Class Variance Authority：<https://cva.style/getting-started/variants/>
- tailwind-merge：<https://www.npmjs.com/package/tailwind-merge>
