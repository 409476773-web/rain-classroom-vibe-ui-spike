# Checkbox / Radio · SC-00 预检

日期：2026-09-09。工作模式：System Mode，仅文档预检。结论：**SC-00 已完成，具备提出一个 SC-01 开发检查点的证据；视觉映射与 API 候选仍需在该检查点明确。**

本轮依据用户“继续下一步”，执行此前约定的 SC-00。交接包 05 明确要求“首轮只做预检和差异报告，不实现运行时”，06 的 SC 编号也明确不是现有 Roadmap。此次只新增审计文档与证据，没有修改运行时、依赖、全局 Token、Figma、Rain Classic，没有执行 Git 写入操作或替换现有阶段。

完整来源阅读见[上下文审阅](../../../outputs/checkbox-radio-context-review-2026-09-09.md)；本次环境、来源摘要、Token 测算与已有测试结果见[预检证据](../../evidence/selection/sc00-preflight.json)。

## 1. 当前工作区与授权边界

| 项目 | 实读结果 | 对下一步的影响 |
| --- | --- | --- |
| Git 根目录 | `/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike` | 必须在这个子目录执行项目命令 |
| 包身份 | `@rain-next/workspace`；UI 为 `@rain-next/ui`；Playground 为 `@rain-next/playground` | 与独立 Rain Next 项目一致 |
| 分支 / Commit | `main`；尚无首个提交，`HEAD` 无法解析 | 不填写虚构 Commit；来源以本地路径、日期和文件摘要登记 |
| Remote / 已跟踪文件 | 无 remote；已跟踪文件 0 | 不能称工作区 clean；现有文件均为 untracked，不能把它们算作本轮新增 |
| 本轮保护核对 | 阶段、依赖、Token 和复用入口共 12 个具名文件，前后 SHA-256 均一致 | 这是具名输入核对，不是整个仓库的不可变快照 |
| 现行阶段 | [current-phase.yaml](../../status/current-phase.yaml) 的 Token Foundations 主阶段及后续专项检查点；另有组件细化、下拉实验记录 | SC-00 作为补充审计，不覆盖其他任务，不把其通过状态继承给 Checkbox / Radio |
| 规则来源 | [AGENTS](../../AGENTS.md)、[SPIKE_BRIEF](../../SPIKE_BRIEF.md)、[Visual Evidence](../../evidence/visual-evidence.yaml)、[Benchmark Registry](../../benchmarks/benchmark-registry.yaml)、[Benchmark 说明](../../benchmarks/README.md) | 已按当前文件核对，不使用上传旧快照代替现状 |

环境实读为 Node 24.13.0、pnpm 10.28.1、React / React DOM 19.2.8、TypeScript 7.0.2、Vite 8.2.2、Tailwind 4.3.3、Vitest 4.1.11。版本来自安装入口及当前 package / lockfile，未安装或升级依赖。

## 2. 可复用资产与真实缺口

| 能力 | 当前源码与消费证据 | 本次判断 |
| --- | --- | --- |
| 普通 Checkbox / Radio 与组 | [UI 公共出口](../../packages/ui/src/index.ts) 中尚无这四个入口 | 需要新建对应语义资产；不能称“调整现有 Checkbox” |
| 原生选择项及组协调写法 | [OptionButton / OptionGroup](../../packages/ui/src/option-button/option-button.tsx)，已被[选项页](../../apps/playground/src/docs/components/option-button-page.tsx)消费；[现有测试](../../packages/ui/src/option-button/option-button.test.tsx)覆盖整行点击一次、单选保持、多选及禁用保留、表单控件和组名称 | 可参考原生 input、label、fieldset / legend 和受控值处理；答题选项、反馈、媒体、readonly 答案展示仍属于原资产 |
| 另一条原生选择路径 | [CheckableTag / Group](../../packages/ui/src/tag/checkable-tag.tsx)，已被[Tag 页](../../apps/playground/src/docs/components/tag-page.tsx)消费；已有 [Tag 交互测试](../../packages/ui/src/tag/tag-interactions.test.tsx) | 标签外观、清空按钮和 Tag 专属配方不属于普通选择项；本轮未重跑该测试文件，也未抽取跨家族状态引擎 |
| 单字段标签 / 说明 / 错误 | [FormItem](../../packages/ui/src/input/form-item.tsx)，由 Input、SearchInput、Select 消费；[Manifest](../../manifests/ui/form-item.yaml)限定一个控件 | 其 `<label htmlFor>` 与共享 context 是单控件合同。组需要 fieldset / legend 及组级描述、错误关联，不能把组 id 当作可标记 input 使用 |
| 独立操作按钮 | [Button](../../packages/ui/src/button/button.tsx)，默认 `type="button"`，已有 Focus 与公开样式方案 | 预览按钮可复用；放在选择宿主之外，并保留明确的非提交语义 |
| 浮层 | [BaseFixture](../../apps/playground/src/experiments/headless/base.tsx) 已组合 Base UI Menu / Popover / Select / Dialog；安装版本 1.8.0 | 已安装、局部实验消费成立；普通选择组件和公共 Dialog 包装并未因此存在 |
| Card / Surface | [Card](../../packages/ui/src/card/card.tsx)、[Surface](../../packages/ui/src/surface/surface.tsx)，已被 [Core UI 页](../../apps/playground/src/docs/components/core-ui-page.tsx)消费 | 只有表面与内容语义，没有选择状态；Card 默认是 article，不能直接增加整卡 click 就当作 CheckboxCard |
| Layout / Density | [DensityProvider](../../packages/foundations/src/density.tsx)、[Space 合同](../../packages/foundations/src/composition-contract.ts)及受控 Tailwind 已存在；未发现公共 Stack / Inline / Grid / Split 实现 | 先用现有容器、flex / grid 和已登记 Space；不为 ContentRail 创建公共 Layout 原语 |
| 局部变化与类名 | [Local Recipe](../../packages/ui/src/recipes/local-recipe.ts)、[rainCn](../../packages/ui/src/utils/rain-class-names.ts) | 使用现有入口。默认交付完整方案，有明确差异时才改已声明 Part |

**底座建议：本次基础选择切片使用原生 input。** 当前 UI 已有原生 checkbox / radio 的使用证据，AGENTS 也允许简单控件直接使用平台能力。这样不需要安装新依赖，也不需要提前制造一层选择状态引擎。

[ADR 0005](../adr/0005-headless-base.md)已经决定后续共享浮层采用 Base UI 1.8.0；其适用范围是 DropdownMenu、Popover 与 Select / Dialog 浮层。它不要求普通 checkbox 也改成 headless 封装。后续预览需要浮层时沿用这项决定，不把实验中的 Radix 同时带入公共 UI。

[Classic 复用矩阵](../../evidence/rain-classic/reuse-matrix.yaml)已分别保留 Checkbox、CheckboxGroup、Radio、RadioGroup 的公共身份，迁移方向为 `rewrite-from-rain`，实现仍为 `not-started`。矩阵及 [Source Lock](../../evidence/rain-classic/source-lock.yaml)是此前审计的锁定记录，本轮没有声称重新核验 Classic 当前 checkout。CircularCheckbox 继续留在既有登记中，不纳入本次最小切片。

## 3. Figma → Token / 排版 / 几何

来源为 [V0.3 页面](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2346-1681)及[实施交接画板](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2397-726)。本会话前序已直接读取全部 7 个画板、4 个组件集、8 个变体；本轮复用该日的实读结果，并核对交接包 `02-figma-baseline.json`。这些是可变节点的观察，未取得不可变 Figma version。

### 几何与字体

| 观察 | 当前 Foundations | 处理 |
| --- | --- | --- |
| Noto Sans SC；标题 15 / 24 / 500 | 正式 UI 为 PingFang SC；15 与 24 均已登记；普通 UI 字重仅 400 / 600 | 字号、行高无需新增。500 被现有 validator 明确拒绝；600 是候选变化，不能写成与图稿相同 |
| 描述 13 / 22 / 400；细项 key 11 / 22；value 13 / 22；另有 12 / 22 元数据 | 这些字号和行高均已登记 | 逐 Part 组合完整排版规则，不统一套成一个 14 / 22 默认标签 |
| 本机字体 | 系统清单确认 PingFangSC Regular、Medium、Semibold 为 enabled / valid | 证明本机具备字体；新选择组件的浏览器实际命中、换行和高度仍未验证。系统有 Medium 不等于项目允许 500 |
| PreviewCard 四边内距 16 / 16 / 18 / 16 | `Space/18` 及对应组合入口已经存在 | 保留底部 18，不改成 16，不新增同值局部 Token |
| 其余母版常见内距 16；控制画布 24；控制与内容 gap 8；卡片 radius 8 | Space/16、24、8 与 Radius/8 已有 | 保留结构关系；24 是画稿中的控制画布，不自动成为全局控件高度 |
| 控制画布内 Checkbox 图形 16；Radio 图形 18 | 与外部 24 画布是不同的尺寸职责 | 命中区域和可视图形分别实现、分别验证 |
| 外层内容 x=48 | 由 16 内距 + 24 控制画布 + 8 gap 得到 | 使用布局形成，不为每行手填 48px margin |
| CardWithPreview：内部图形 x=0，文字 x=52，旧名 TrailingVisual | 没有待迁移的对应组件 | 按当前坐标保留：文字相对整卡 x=100；ActionRegion 仍从外层 x=48 起。不能误把所有文本都拉到 x=48，或按旧名把图形移到右侧 |
| 296 / 612 参考宽；320 窄容器；画稿高度随内容 | 不是公共尺寸枚举或断点 | 不创建 `size=296/612`、全局 320 断点或固定卡片高度；插图保留约 7:3 比例 |

字体来源见[Typography](../../packages/foundations/src/typography-contract.ts)与[字体声明](../../packages/foundations/src/typography.css)；尺寸与颜色消费限制见[Token 选择规则](../ai/token-selection.md)。Density 继续使用现有上下文；第一份标准说明项先保留图稿几何，并记录两种 Density 下的表现，不自行推导第二套尺寸。

### 颜色：精确匹配和候选分开

以下表格是 **Light 来源与映射候选**，不是已批准配方。颜色必须按 Part、属性、状态及真实父表面登记；不能因为 RGB 相同就跨角色借用。

| 图稿 Part / 色值 | 当前登记 | 候选处理与差异 |
| --- | --- | --- |
| 选中填充主蓝 `#1561F8` | `Fill/Brand/Solid/2` 精确同值 | 用于填充具备来源；白色勾可配 OnColor/1，仍需真实状态验证 |
| 选中卡片描边 `#1561F8` | 未找到同值 Border Category；`Border/Brand/1` 为 `#3D7BFF` | 存在明确映射缺口。把 Fill/Brand/Solid/2 当 border 会被现有 validator 拒绝 |
| 选中浅底 `#EEF4FF` | 未找到同值 Fill Category | 候选 Fill/Brand/Alpha/4 是 `#3D7BFF` 的 10%，白底合成约 `#ECF2FF`，与来源不同，且依赖实际父表面 |
| 标签 `#495D87` | `Text/Neutral/3` 精确同值 | 可保留来源值；同值的 TagEnded 专属色不作为通用标签入口 |
| 描述及 key `#4E5969` | 未找到同值 Text Category | 候选 Text/Neutral/3 为 `#495D87`；如采用，需复核其与标签的字号、字重层级 |
| detail value `#1D2129` | 未找到同值 Text Category | 候选 Text/Neutral/1 为 `#142346`；属于明确的颜色变化 |

当前中性必要边界也存在实际测算问题，不能只处理选中配色。下表由现有 `resolveColorSurface`、`measureColorContrast`、`validateColorUse` 实跑获得；它只验证声明的单层表面组合，不替代浏览器、实际 DOM 或 Human Gate。

| 测算组合 | Light | Dark | 阈值与结论 |
| --- | --- | --- | --- |
| Text/Neutral/3 标签 → Background/Neutral/1 | 6.565 | 8.549 | 普通文字 4.5，数值满足 |
| Text/Neutral/3 描述 → Brand/Alpha/4 → Background/Neutral/1 | 5.838 | 7.845 | 普通文字 4.5，数值满足 |
| Border/Brand/1 必要边界 → Brand/Alpha/4 → Background/Neutral/1 | 3.410 | 2.361 | 必要边界 3；Dark 候选不足 |
| Border/Neutral/1 必要边界 → Background/Neutral/1 | 1.899 | 2.518 | 必要边界 3；两主题都不足，不能直接作为合格的未选控件边界 |
| OnColor/1 勾 → Fill/Brand/Solid/2 | 5.125 | 4.536 | 有意义图标 3，数值满足 |

这些不足没有被记作已接受例外，也没有降低阈值。SC-01 需在标准说明项的具名配方中明确边界方案，必要时提出有来源、限作用域的 Token 请求；本轮没有用裸色值或另一套私有视觉系统填补缺口。

Focus 保持当前 [focus.css](../../packages/foundations/src/focus.css)：1px outline、0 offset、3px Brand Alpha/3 halo；forced colors 使用 2px CanvasText / 2px offset。隐藏 input 的可见焦点需接到实际可见部位。Dark outline 单色在 panel 上测得 2.573，仅是颜色观察，尚不足以判断完整焦点环及其相邻表面的合格性；SEL-033 必须检查完整实际渲染，不修改现有 Focus 合同来消除发现。

## 4. 状态、字段和提交的最小合同

以下是供 SC-01 明确的候选，不是已发布 API。

| 归属 | 最小接口与行为 |
| --- | --- |
| Checkbox 单项 | `checked` / `defaultChecked`、`onCheckedChange(boolean)`、`indeterminate`、稳定字符串 `value`、`name`、disabled、input ref；label 与 description 不含独立交互元素 |
| CheckboxGroup | 独立公共组身份，集合 `value` / `defaultValue`、`onValueChange(string[])`、name、组名称与说明、disabled；组内选中状态仅由组协调，不与项自有状态双持有 |
| Radio / RadioGroup | 后续同一阶段的独立切片。项与组分别保留身份；组值为 string 或 null，同组 name；不自动选首项、重复激活已选项不清空。`RadioGroupItem` 若作为用法名称，须记录与 Radio 的关系 |
| 组字段展示 | 第一切片由 CheckboxGroup 自带 fieldset / legend、help / message 关联即可；不先建设通用 Field 引擎。沿用 FormItem 的视觉角色和关联规则，但不直接把组塞进其单控件 context |
| 业务 Pattern | 页面保存选择草稿、预览打开状态和条件字段草稿；UI 不请求接口、不保存业务、不推算权限 |

数据与表单需同时展示两个结果，不能把它们当作同一份 payload：

- **原生 FormData**：真实、有 name、已选且可提交的 input 参与；disabled 已选项不提交。聚合“本页全选”没有业务 name，不额外提交一个 all 或 mixed 值。
- **业务模型**：锁定已选项和当前范围外项仍留在集合；构造模型 payload 时明确保留规则，不能从 FormData 反推整个业务集合。
- **组 required**：规则为“至少一项”时，错误属于组；不是给所有 checkbox 设置 required。宿主决定规则与校验时机，组展示结果并关联说明；原生 radio 的 required 也只在实际表单中验证。
- **reset**：非受控 input / 组恢复声明默认值；受控示例由所有者显式恢复。reset 不伪装成一次用户选择回调，需在真实浏览器验证 DOM、组值和 FormData 一致。
- **mixed**：仅为集合已知部分选中的聚合显示，DOM indeterminate 与无障碍状态一致；未知数据不冒充 mixed。项不拥有全选算法。
- **本页全选**：令 E 为当前有资格且可改的集合、S 为已选集合。E 为空时 disabled / unchecked；未全选或 mixed 激活得到 S∪E，全选激活得到 S\E；锁定与范围外值保留。筛选或翻页后的范围策略属于 SC-03。
- **条件字段**：选择时不自动抢焦点；切走后保留草稿，inactive 字段不参与当前校验与 payload。若字段仍挂载在原生 form 中，要显式禁用其提交或在业务序列化中排除，隐藏样式本身无效。
- **readonly**：首批不提供假原生 readonly 语义；静态结果展示另行组合。现有 OptionButton 的答案只读路径不自动成为通用 Checkbox 合同。
- **操作边界**：选择宿主只触发原生选择一次；预览按钮与输入位于宿主外，Tab 可达，方向键不被组全局监听夺走。预览关闭返回触发器，不改变选择或触发保存。

字符串值是本次候选合同。不得直接对旧数字值做 `String()` 后默认安全；例如数字 1 与字符串 "1" 需要显式的迁移或拒绝规则，业务标识也不能写进公共 `data-rain-id`。

## 5. Manifest 与阶段修正

交接 `03-selection-manifests.json` 是候选能力目录，只有两个详细资产例子，不是完整安装目录。落库时应适配当前 `RainUiManifest`：

- 将 `rain.ui.checkbox`、`category: UI` 等候选身份映射到仓库的稳定 id / category 规范；不能只复制 JSON 后当作现有公共出口。
- 对齐当前允许的 assetIdentity、maturity、modificationMode，补 `visualLineage`、真实 sourcePath / sourceVersion 与已验证消费关系；无 HEAD 时保留事实，不填写 sourceCommit。
- 控件 DOM 的 root / control / indicator / label 等 `data-slot` 与 Manifest 同步。源稿的组合层级不要求一层一个公共 React 组件。
- `sourcePath: null`、Code Connect 未建立、installable=false、发布未授权继续保持真实。官方 Code Connect 与本地 Figma 映射不能混称。

候选验收排期有三处需要拆分证据。原包不改写；后续本地执行记录应明确：

| 用例 | 现有分配 | 建议执行方式 |
| --- | --- | --- |
| SEL-006，聚合控件不额外提交 | SC-01，但完整本页选择 Pattern 在 SC-03 | SC-01 验证原生序列化及无 name 控件；SC-03 补本页全选的完整集成 |
| SEL-015，批量选择保留锁定与范围外值 | SC-01，但批量范围策略在 SC-03 | SC-01 验证普通组变更不擦掉锁定值；SC-03 执行用例所述批量场景 |
| SEL-028，320 容器中的独立预览入口 | SC-02，预览 Pattern 在 SC-03 | SC-02 验布局及入口位置；SC-03 才验证完整预览行为与焦点路径 |

因此，早期合同或布局通过不能提前关闭完整集成用例。验收包初始分配为 SC-00 / 01 / 02 / 03 / 04 各 2 / 14 / 4 / 13 / 5 项，原始 38 条仍保持 `not-run`。

## 6. 推荐的唯一下一任务

**SC-01 第一个切片：Checkbox + CheckboxGroup 的标准说明项及表单合同。**

先在这一个切片内明确上述 API 与 Token 消费用途表，再实现普通单项、组值协调、标签 / 描述 / 组错误、mixed 展示、禁用和 reset。用一个最小表单样例同时显示组模型与 FormData，包含锁定已选项、长标签、至少一项错误和原生 reset。

建议将新源码放在 UI 的 checkbox 家族目录，遵循现有测试与导出结构；这是拟定位置，本轮没有创建对应源码或 Manifest。组级展示先由该组本身负责，避免在 FormItem、Select 等其他进行中的家族上扩展接口。共享代码只在两个实际调用方出现后提取。

这个切片不包含 Radio、四类卡片、预览、关联配置、本页批量选择或完整分类 Playground；它们仍按 SC-01 后续切片与 SC-02/03/04 进入。V0.3 的四类卡片视觉范围保持原约定。

### 实现前需要明确的决定

| 项目 | 当前状态 | 谁在何时决定 |
| --- | --- | --- |
| 500 标题及同值颜色缺口 | 实读明确，完整视觉方案尚未选定 | 由用户在后续开发检查点确认：采用现有 Token 候选并复核差异，或提出限范围的来源补充；不得静默替换 |
| 未选必要边界及 Dark 边界不足 | 有测算依据；不满足即不能记作可读性通过 | 实现者提出具名配方和实际表面证据；需要视觉取舍或 Token 补充时交用户确认 |
| Group 字段 / controlled 与 uncontrolled / value 身份 | 有最小候选，无已批准公开 API | SC-01 先对照 Classic 合同及前序研究，完成本切片 API 记录，然后实施 |
| 新公共组件授权 | 本轮只有 SC-00 | 下一开发检查点明确后才创建运行时组件 |

这些是后续开发或视觉收口的待定项，不阻断本次预检完成。字体安装、18px Token、实际图形位置与浮层底座已不再是事实缺口。

## 7. 验证与交接状态

本轮实跑已有测试：5 个文件、70 项通过。覆盖 Typography 10、Color Registry 18、Composition 9、Input 23、OptionButton 10。只说明所参考的合同与复用路径在当前环境下通过，不能证明新增组件完成。

| 检查 | 本轮状态 |
| --- | --- |
| 工作区、依赖、公共出口和调用路径 | 已核对，见机器证据 |
| Token 查找、角色资格、15 / 24 排版与 18px | 已实跑；500 被正确拒绝；候选边界不足保留为发现 |
| SEL-031 字体 / 18px 报告 | source-audit 已完成；该用例包含的 design-review 等待用户，浏览器重排尚未执行 |
| SEL-032 图形位置与旧层名 | source-audit 已确认；无运行时组件可检验 |
| 新 Checkbox / Radio 运行验收、屏幕阅读器与完整视觉检查 | not-run |
| 本轮独立技术审阅 | not-run；前序上下文 / Figma 阅读不作为本轮实现审阅 |
| 实现、人工视觉 Gate、发布、迁移、Git 写入 | 均未由本次预检推出 |

以下命令从当前脚本及实际测试路径得出，在仓库子目录执行。本轮只运行第一条；后两条供 SC-01 修改对应层后执行。`pnpm verify` 的真实脚本已确认，但包含 lockfile 校验、构建和 E2E，本轮没有把全套检查误记为已跑。

```sh
pnpm exec vitest run packages/ui/src/option-button/option-button.test.tsx packages/ui/src/input/input.test.tsx packages/foundations/src/color-registry.test.ts packages/foundations/src/typography-contract.test.ts packages/foundations/src/composition-contract.test.ts
pnpm typecheck
pnpm verify:tokens
```

下一切片的最小验证矩阵：

| 方法 | 关联 SEL | 预期 |
| --- | --- | --- |
| 新单项 / 组交互测试；实际文件建成后加入现有 `pnpm test` | 001、002、004、005、026 | 一次变化一次回调；父级更新不回声；稳定值、重复保护、组唯一状态、mixed 不等于 unknown |
| 最小表单的真实浏览器测试；接入现有 `pnpm test:e2e` | 003、018、019；006 / 015 的基础部分 | reset 正确；FormData 与模型差异可见；任选一项满足组规则；锁定项不被组普通修改擦除 |
| 原生键盘与读屏检查 | 016、017、034、035 | 名称与描述关联正确；禁用说明可获取；无假 readonly；无嵌套交互宿主 |
| 图稿 / Token 对照及浏览器状态检查 | 027、029、033、036；031 的换行补充 | 长标签、选中前后布局、Focus、错误、强制颜色与两种 Density 都有对应证据；不足不记 pass |

Radio 专属 007–009 及完整批量 / 预览 / 条件字段用例继续等待其实际切片；不得为了提前打勾引入整套页面 Pattern。

**停止点：本次停在 SC-00 文档预检完成；下一次从上面的 Checkbox / CheckboxGroup 开发检查点继续。**
