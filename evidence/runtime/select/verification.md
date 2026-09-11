# Select 与共享字段运行验证

2026-09-12 人工验收：用户明确回复“视觉已完成人工和检验。”，接受本轮 Select（含正式浮层、选项与 Tag 组合） 的实际运行视觉。颜色用途与对比度、独立人工键盘/输入法/读屏/物理触屏、发布和 Git 均不由此通过。正式范围见[验收登记](../../../docs/plans/2026-09-12-existing-assets-closure.md#当前运行视觉人工验收)。

## 当前入口（2026-09-12 摘要核对）

Select 已完成 2026-09-10 [正式依赖接入](formal-dependencies.md)：复用 Base UI Select / Combobox、Portal 与正式 Tag，旧私有占位已替换。正式依赖续批的实现、自动检查和独立审阅已有完成记录；父级仍保留 `in-progress / findings`，当前运行视觉为限定 `accepted`，颜色问题与真实设备验证继续未决。详见[当前阶段登记](../../../status/current-phase.yaml)和[颜色收口审阅清单](../../../docs/audits/2026-09-12-color-closure-review.md)。

2026-09-12 最新页面反馈：Input / Select 非禁用空值提示统一为更浅的 `Text/Neutral/5`，取代本日上一轮 `/3`；SearchInput 和 Select 面板搜索随共享 Input 同步。普通未选可用 option 说明继续 `/3`，箭头、禁用、已选、计数和危险配色保留。当前运行视觉已接受；颜色发现未关闭。当前验证见[页面反馈修订](../../../docs/plans/2026-09-12-existing-assets-closure.md#0203-页面反馈修订)及[颜色清单](../../../docs/audits/2026-09-12-color-closure-review.md)。

下文为历史检查；截至正式依赖续批之前的“私有占位”“后续替换”和并行检查阻断均为当时事实，不代表当前实现仍缺这些能力。

## 2026-09-09 初版与家族收敛历史

2026-09-09，System Mode。来源为API与实施计划交付后用户再次“继续推进”；执行[六项计划](../../../docs/plans/2026-09-09-select-implementation.md)。普通／搜索×单／多选、Input三种共享外观、FormItem与真实说明页已实现。

2026-09-09 实际页面反馈微调：用户要求箭头略淡、未输入／未选择时提示再淡一点。Select箭头从Icon/Neutral/3改为/4，Input及Select占位从Text/Neutral/4改为/5，菜单搜索同步。Light实测分别为`rgb(150, 163, 193)`与`rgb(116, 133, 168)`；Dark为`rgb(132, 144, 181)`与`rgb(136, 145, 173)`。未改正文、清空、禁用映射、公共Token值或交互逻辑。

局部视觉确认（2026-09-09）：更新页面交付后，用户回复“确定。”，接受本轮箭头与Input／Select空值提示的调浅结果。范围为这两项实际组件视觉调整；不授予颜色资格／对比度例外，也不自动关闭完整Select的Human Gate。

箭头与占位微调时的复测（历史）：同一4176服务上的Input／Select共11项浏览器检查全过，覆盖三外观、四档Input占位、菜单搜索、展开／收起箭头、Light／Dark与既有交互。颜色与治理定向单测11／13通过，另外2项被同时进行的Tag批次新增`.rain-tag-batch__back`颜色登记阻断；当时全仓治理也被该批Tag尺寸与原生CSS合同阻断。Input、Select、共享字段三个源码的颜色登记单独检查通过，未屏蔽失败或修改Tag。当时未重跑全量单测和构建。家族收敛续批后曾完成全量单测、构建与治理并通过；收尾时另有新的Tag颜色发现登记阻断，见最新续批记录，不与旧Tag阻断混同。

| 状态 | 结果 |
| --- | --- |
| 候选运行实现 | 已落地；系统记录仍为in-progress，颜色发现未闭合 |
| 自动检查 | 最新续批：已执行的1087项单测、17项浏览器、类型及构建通过；最后全仓治理被并行Tag颜色发现登记阻断 |
| 独立技术复审 | 最新续批交叉审阅范围内无未关闭P1／P2；原颜色发现保留，详见[独立审阅](independent-review.md) |
| 颜色资格／对比度 | pending-review；未授予例外 |
| 示意视觉基准 | accepted-preview-visual-only，保留用户原验收 |
| 箭头与空值提示局部视觉 | accepted；2026-09-09用户“确定。”，仅本轮两项调整 |
| 真实组件Human Gate | awaiting_human |
| 菜单层 | 私有内联占位；正式菜单、碰撞定位、Portal和Headless选型待后续建设 |
| 资产与发布 | registry-candidate；Figma、包／Registry发布、业务迁移和Git均未执行 |

## 家族收敛续批（2026-09-09）

用户确认SearchInput归属后再次“继续推进”，授权[限定续批计划](../../../docs/plans/2026-09-09-select-implementation.md#家族收敛续批执行步骤)。总览中的Input、Select各保留一个简短预览和完整说明入口；Input页统一切换描边／填充／底线，所有尺寸、单位、前后内容、图标、按钮、清空、计数和搜索快捷用法共用所选外观，切换保留草稿。SearchInput导出、登记ID、默认28px和compact 24px保持现有合同；Select页并排Input明确为外观对照。总览其他组件家族继续保留。

两项兼容修复及回归发现的一项根因修复：

- Select触屏清空槽规则限定为自身frame的直接子项，避免穿透菜单内Input；实际触屏检查确认内部搜索高32px、清空区24px且位于frame内，Select自身操作仍至少44px。
- 面板因动态只读／禁用或外部受控关闭而卸载焦点元素时，复用现有blur处理补发一次离开通知；已在内部的焦点不误报，外部焦点不被抢回。
- 搜索清空使按钮卸载时，关闭判断读取点击事件的原始传播路径，避免把本次内部点击当成外部点击；鼠标与键盘回归确认菜单保持展开、输入焦点保留。

| 最新续批检查 | 结果 |
| --- | --- |
| 全量Vitest，`pnpm exec vitest run --maxWorkers=2` | 63份文件、1087／1087通过 |
| Select行为定向回归 | 39／39通过；新增6种关闭焦点组合及2种内部清空检查先失败后通过 |
| 三个说明页定向回归 | 12／12通过 |
| Input／Select／Core UI Chromium，三个现有文件 | 17／17通过；Input 9项、Select 4项、Core UI 4项 |
| `pnpm typecheck`及测试类型检查 | 通过 |
| `pnpm build` | 通过；既有图标大分块提示仍为非阻断警告 |
| `pnpm verify:governance` | 早先通过；文档收尾后复跑失败，原因见下文，未声明最新全仓通过 |
| 交叉技术复审 | 页面作者审阅Select逻辑／CSS；逻辑作者审阅页面与相关回归；各自非作者范围内无新增P1／P2 |

浏览器在同一4176服务运行，沿用临时配置，未改动4173服务或项目配置。完整Input组合检查覆盖Light／Dark × 三外观、全部Parts顺序、单位／计数、24px清空／26px换算按钮、只读动作及搜索草稿／提交；另保留两主题下默认外观的既有代表性颜色断言，不将其扩大为所有Parts的三外观颜色矩阵。原Core UI中的详细Input断言迁入Input页面测试，保留composition → compositionend → 后续原生input事件链及键盘／Forced Colors焦点检查；总览继续检查其余组件交互。迁移过程中发现的旧标签、字数上限和焦点进入方式断言已按新页面位置同步，最终三个文件一次运行全部通过。触屏搜索在320／360／736px下实测清空后仍展开，查询为空、输入仍聚焦、已选值保留。

收尾共享检查点：上述测试、类型、构建与早先治理完成后，工作区新增了并行Tag颜色发现改动。最后的`pnpm verify:governance`在workspace阶段报告`color supplement scope or lifecycle`与`package.json scripts must match the exact workspace command set`，后续子检查未运行。本批未修改这份新阶段登记或package脚本；不能把早先通过作为新共享状态的验证。后续颜色快照刷新也遇到该阶段合同失败，以及正在变化的`color-registry.ts:441`语法错误；两次刷新均在写入前退出，未伪造新的来源哈希或屏蔽检查。

颜色用途与阈值未更改；共享改动发生前，独立只读核对确认505项对比度和264项资格发现与既有JSON逐项、顺序一致。当前JSON保留箭头／占位微调时的来源快照，待共享Tag改动稳定后再刷新哈希；本批不授予颜色例外。以上结果记录实际验证时点，完整组件Human Gate仍未授予。

## 实际变更

- [Select](../../../packages/ui/src/select/select.tsx)、样式与值处理：独立控制value、query、open，支持远程已选资料保留、摘要／数量／标签、清空、上限、分组、键盘与焦点恢复。内部搜索复用Input并隔离FormItem。
- [共享外观](../../../packages/ui/src/field/field.styles.ts)由Input和Select消费；Input保留原编辑、计数、单位及附加内容。字段范围内处理状态焦点、底线和Forced Colors，未修改公共Focus。
- [专属尺寸](../../../packages/foundations/src/select-token-contract.ts)引用Input高度及Tag选中项高度事实；未新增颜色或依赖。首次实现时Tag排版、圆角和关闭区不适配已验收选中项，采用一个私有SelectedValue；当时Tag的三个关键源码哈希与[本次基线](source-baseline.json)一致。
- [Select说明页](../../../apps/playground/src/docs/components/select-page.tsx)及入口、Input外观示例、公共导出、[Manifest](../../../manifests/ui/select.yaml)和[本地Registry](../../../registry/select.json)同步。生成器、Token消费者、精确文件许可和CSS例外同步；没有手改生成文件。
- 新增Select行为、颜色、治理和浏览器回归；同步Input、Core UI、TextButton的已确认几何断言，以及原B2测试快照、来源清单和构建入口夹具。

## 首次实现执行结果

| 检查 | 实测结果 |
| --- | --- |
| `pnpm generate:tokens` | 输出一致 |
| `pnpm verify:governance`、`pnpm verify:icons` | 通过；899个图标身份可用；颜色finding仍如实输出 |
| `pnpm typecheck` | 通过，包含测试类型 |
| `pnpm test` | 62份文件、1066项通过 |
| 最终Select定向回归 | 行为、颜色与治理共39项通过，包含最后的动态类名修复 |
| `pnpm build` | 通过；既有图标目录大分块提示为非阻断警告 |
| 全量Playwright | 121项先通过118项；3处旧Input焦点断言同步后，受影响Core UI／TextButton共14项复跑全过 |
| 最终Select专项 | 4项浏览器用例全过；包括修复后的真实320／360／736px宽度断言 |
| 独立审阅专项 | 行为回归63项、颜色回归9项通过；实际问题与修复见独立记录 |

`pnpm verify`已执行：治理、图标、类型、1066项单测和构建通过，在浏览器启动阶段因原4173端口被占用退出。未终止已有服务、未修改项目测试配置。浏览器使用临时配置继承同一项目，仅将baseURL设为本次4176服务并关闭重复启动，执行`pnpm exec playwright test --config <临时配置> --workers=2`；上述全量及定向结果均来自该服务。全量运行中的Dropdown两项由该文件自己的重试策略通过，不属于本次改动。

最后补充的动态类名检查回归覆盖min/max尺寸与负间距；尺寸检查不再拿可能被浏览器放大的innerWidth作为容器宽度标准。隐藏摘要测量元素已限制在非交互摘要区内，避免撑宽移动端页面。

## 颜色与人工检查点

[完整颜色记录](color-findings.json)已按最新微调更新，保留原用途、精确来源哈希、明暗主题、Background/Neutral/1与/3、叠层及阈值。数量按配对计数，不是独立设计问题数量：Select有89项对比度、168项弱占位／箭头资格；共享字段有266项内外边界／焦点配对；Input既有及新增共享外观合计150项对比度、96项资格。相比首次实现，调浅后的实际发现已追加，未授予例外。

例：Light底线Error对Background/Neutral/3的外侧为3.28558，内侧为2.90907；选中标签移除动作的焦点与实际halo配对为2.43961。不得用四舍五入、降为装饰用途或已通过的示意视觉验收关闭这些发现。Underlined字段本体没有halo，不记录不存在的配对。

真实设备IME和屏幕阅读器未实测；目前覆盖合成IME、真实浏览器键盘、ARIA、模拟触摸、Forced Colors与reduced motion。下一检查点是本页真实组件视觉与交互Human Gate，并单独处理颜色资格／对比度；正式菜单建设仍按用户约定后续统一替换。

## 浏览器证据

- [Light 1600×2420](light.png)、[Dark 1600×2420](dark.png)：家族收敛续批17项浏览器运行中更新的真实公共组件整页截图，含三外观、四档摘要、两档标签与嵌套Light。
- [Compact 360×5354](compact.png)：360px触摸模拟；320／360／736px均以请求宽度核对无横向溢出，Select自身操作目标至少44px且不重叠；内部Input保留24px清空区。
- [可交互说明页](http://127.0.0.1:4176/#select)：本次本地服务；不是已发布站点。

## 正式依赖接入续批（2026-09-10）

占位浮层、选项呈现与已选Tag已按用户新增授权替换；原记录保留为历史证据。本批实现、完整验证、独立审阅与待人工验收范围以[正式依赖接入记录](formal-dependencies.md)为准，最新颜色测量另存，未覆盖历史发现。
