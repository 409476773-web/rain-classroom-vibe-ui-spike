# TextButton 本地实现与体验页检查记录

日期：2026-09-03。依据：[已确认设计](../plans/2026-09-03-text-button-design.md)、[实施计划](../plans/2026-09-03-text-button-implementation.md)。

## 1. 交付状态

本轮本地实现、自动检查及独立复核已完成。2026-09-08 用户明确“TextButton：最新配方的视觉验收确认”，最新配方的视觉验收已记录。状态登记位于 [阶段记录](../../status/current-phase.yaml) 的 `componentRefinements.textButton`：`implementation=completed`、`automatedVerification=passed`、`humanGate=accepted`。

体验入口：[TextButton 可点击验收页](http://127.0.0.1:5173/#text-button)。交接时本机服务正在运行，内置浏览器已打开该页面；关闭本机服务后，此地址将不可用。

- 初始实现阶段为 Foundation Spike Day 3；本次验收登记在当前 Token Foundations V1，旧阶段快照保持原记录。
- 用户已授权本轮文字按钮实现及可点击验收页。
- 设计规则及当前 Token 配方视觉已确认；旧的待验收记录由本次明确确认更新。
- 已验收的普通 Button 保持 accepted；Input、Tag / Badge、Surface / Card 的独立验收不因此改变。
- 新页面是本地演示，不是业务 Template、正式 Registry 资产或生产接入。
- 不新增依赖，不选择 Headless，不写 Figma，不发布、不迁移业务、不操作 Git。

## 2. 本轮实现范围

| 部分 | 实现方式与边界 |
| --- | --- |
| 文字操作 | 扩展现有 `Button variant="text"`，不新建独立 TextButton 公共身份 |
| 尺寸与颜色 | small / compact / regular；default / brand / danger；不提供警告橙 |
| 真正跳转 | 原生 `<a>` 的 Link recipe；standalone / inline；保留新标签提示及浏览器原生行为 |
| 输入框组合 | 消费现有 Input 的 trailingAction、密度与 Enter / IME 防护；不改 Input 自身实现或激活外观 |
| 本地页面 | `#text-button`；帮助目的页 `#text-button-help`；旧组件页只增加入口 |
| 数据与状态 | 演示计时、输入快照和结果留在页面，不接真实权限或后台 |

代码位置：

- `packages/ui/src/button/button.tsx`、`button/button-text.test.tsx`
- `packages/ui/src/link/link.tsx`、`link/link.test.tsx`
- `packages/ui/src/styles.css`、`index.ts`
- `apps/playground/src/docs/components/text-button-page.tsx`、`.css`、`.test.tsx`、`text-button-icons.tsx`
- `apps/playground/src/app.tsx`、`docs/components/core-ui-page.tsx`（仅入口）
- `tests/e2e/text-button.spec.ts`
- 精确授权检查：`scripts/verification-helpers.mjs`、其测试、`verify-boundaries.mjs`、`status/current-phase.yaml`

## 3. 来源和保护证据

- Rain Classic 只读基线：`f1276fe2fcbeb76caeeee4b852f1480402a3d83b`。
- 图标只读来源：Classic `src/icons/edit.svg`、`src/icons/chevron-right.svg`，登记依据为 `src/icons/semantic-icon.contract.js`。只允许固定前景色转 currentColor；viewBox 与路径几何不得改写。
- 加载仍是同一张 `button-loading.png`，800ms 一圈；Classic 与 Next 的 SHA-256 均为 `adbfc717706b3d90add735fcad30f480e86148a72d3a8d833ab3fa787d261704`。
- 旧 `styles.css` 的完整内容保留为当前文件前 18716 字符，SHA-256 仍为 `fc2f05545a2d53ac5ec92b91c315d69ae93a9d5d23c3ee1df84ae1324608a24e`；新增规则限定 text / Link。
- 普通 Button 原测试 SHA-256 未变：`dbe3908947523a03715773a7d8cb1b6dbb1258eeadc5a435a92639df0dd973b1`。
- Input 实现 SHA-256 未变：`432c078b2d512245704f3d37ceafe6d5477c14904ba4f5fdf29cc731388cda40`。
- `package.json`、锁文件、Classic 来源锁/关系表、原复用审核、Visual Evidence 与 Benchmark 索引均与本轮开工前保留的哈希一致。本轮不改原来源证据或原 Core UI 截图。
- 没有开工前 Foundations 整目录快照；不能把未发生 Git diff 当作整目录历史字节一致的证明。当前仓库全为未跟踪文件，没有用于比较的 Git 提交。

成熟库的取舍沿用设计稿第 5 节：参考组合方式与状态完整度，未安装外部组件，也未改用其默认视觉。

## 4. 红绿检查和独立复核

- 开工前：361 项单元测试、类型检查、8 项原浏览器检查通过。
- 核心：文字尺寸/样式、缺失 Link、大小写 `_BLANK` 和 text 的 `aria-disabled` 行为均先观察失败，再实现并通过。
- Link 质量复核发现覆盖可访问名称时丢失新标签提示；新增 3 项真实失败后，通过稳定提示 ID 和合并描述关联修复。默认名称不重复描述，调用方已有说明保留。
- 核心规格、独立质量及修复复核通过；最新核心测试 67 项通过，类型检查通过。
- 治理测试先观察缺失授权助手造成失败；完成态复核又发现缺 E2E / 报告和父阶段回退可绕过检查，补充失败测试后修复。
- 最新治理助手 54 项通过；缺 E2E、缺报告、父阶段回退、空文件和符号链接的只读模拟均被拒绝。不存在从自动通过推导人工 accepted 的路径。
- 当前完整治理检查、原 8 项浏览器回归、复用审核与既有证据检查通过。
- 页面先观察到新路由和行为缺失的失败，再完成实现。规格复核补出长文案窄空间示例缺口：增加第 7 区及两项先失败后通过的测试，原有 6 区保持。最终页面专项 26 项通过。
- 页面规格复核通过；独立最终质量复核未发现 Critical / Important 问题，并亲自重跑页面/治理 80 项、旧路由/Core UI 18 项、类型和边界检查。该复核没有代替主线程浏览器检查或人工视觉结论。

最终全量命令 `pnpm verify && pnpm verify:reuse-audit` 于 2026-09-03 通过：

| 检查 | 最终结果 |
| --- | --- |
| 工作区、依赖锁、既有证据、精确授权边界 | 全部通过 |
| 类型检查与生产构建 | 全部通过 |
| 单元/组件测试 | Vitest 报告 30 个测试文件、488 项执行通过 |
| Chromium 浏览器检查 | 18 项通过：原有 8 项 + 本轮 10 项 |
| Classic 复用审核一致性 | 通过；未改来源锁与原审核结论 |

以上是本地检查结果，不代表生产发布、全浏览器兼容认证或设计师视觉验收。

## 5. 浏览器证据

### 5.1 实测覆盖

- 三色正常/悬停/按下文字对比均不低于 4.5:1；禁用前景约 30%、加载根节点不淡化。此处未把禁用文本写成同一对比标准的通过项。
- 三档尺寸、四种图文结构、经典图标几何、完整标签与同一张 800ms 加载图片。
- 真实鼠标与 Tab / Enter / Space；加载期间保留焦点、防止重复执行；高对比度焦点及减少动效模式。
- 两种输入框密度：操作常驻、空值/模拟不可用保位、输入与操作分别保留焦点，结果对应触发时的输入快照。
- 原生同页链接、正文下划线、悬停无底、新标签提示、浏览器返回及标题焦点。
- 1440px 桌面、375px 与 320px 窄屏；长操作名称完整且能点击，240px 示例内的长正文链接实际换行，无横向页面溢出。
- 放大采用 **根元素 CSS zoom 2x 模拟**：1440px 视口内，body 布局宽度为 720px、26px 按钮实际显示为 52px，页面和标签不溢出。这不等同浏览器菜单的 200% 缩放，也不是所有设备放大模式的验收。曾出现测试将布局宽度与渲染宽度混比造成的失败；通过实测定位后修正同单位断言，没有为通过测试改变页面布局。

四种 regular 图文组成在加载时的实测宽度变化依次为：纯文字 **+20px**、仅左图标 **0px**、仅右图标 **+4px**、双侧图标 **−16px**。这是已确认的“左侧加载、右侧隐藏”规则产生的自然布局，不擅自增加固定宽度。页面提供“对比加载前后”开关，供设计师判断是否接受实际视觉效果。

主线程另在内置浏览器亲自完成：点击“导出演示数据”并观察结束；输入“课堂演示”后点击“检查”并观察快照结果；进入本地帮助页再返回，确认标题焦点和页面可用。发现原 5173 服务已停止后重新启动，并在新可用标签页打开交付地址；不是交付缓存页面。

### 5.2 截图

由当前浏览器测试重新采集并逐张目视检查。全部为虚构演示内容，不新增或替换原 Visual Evidence 索引。

| 文件 | 尺寸 | 字节数 | SHA-256 |
| --- | --- | --- | --- |
| [桌面完整页](../../evidence/runtime/day-3/text-button-desktop.png) | 1440 × 2707 | 351078 | `998b80b47753644d7151dc1e0c2dc5e77129235e4199ebc0f3d177a412c95a7e` |
| [窄屏完整页](../../evidence/runtime/day-3/text-button-mobile.png) | 375 × 4088 | 345257 | `100d7ccf54383aaa345d16874cb48cba74133fc3e9c79c5b4ad99e70e8e432a1` |

复现截图：`RAIN_CAPTURE_TEXT_BUTTON=1 pnpm test:e2e tests/e2e/text-button.spec.ts`，本轮 10 项通过。静态截图不能代替加载、键盘和链接的真实体验。

## 6. 仍由设计师确认的内容

- 三档 20 / 24 / 26px 高度是否好点、紧凑且协调。
- 灰蓝、主题蓝、危险红及 hover / pressed 的浅底深浅。
- 禁用前景 30% 是否清楚；加载不套禁用淡化。
- 键盘细蓝轮廓与 20% 浅蓝外圈，尤其在输入框内是否拥挤。
- 四种图文组合的加载宽度变化。本轮不擅自增加固定宽度；实际变化需要在页面检查。
- 长操作完整显示和正文链接换行是否自然；窄空间布局与字号放大是否符合实际使用需要。
- 输入框组合及中文输入候选窗的真实体验。合成 IME 测试不能替代操作系统输入法或真实读屏工具验收。

设计稿中的 11 项人工清单保持未勾选。真实业务请求、失败恢复、权限、生产浏览器矩阵、发布与迁移不在本轮范围。


## 当前配方视觉确认 · 2026-09-08

确认范围为 `text-button-current-token-recipe-visual-only`，来源为用户原话“TextButton：最新配方的视觉验收确认”。当前状态及体验页提示已同步；普通 Button / TextButton 共用 Token 配方确认另见[配方记录 12.9](../plans/2026-09-05-size-density-first-recipes.md#129-最新-button--textbutton-配方视觉验收2026-09-08)。本次不改组件尺寸、颜色、交互或发布状态；以上历史自动检查不冒充本轮重新执行。
