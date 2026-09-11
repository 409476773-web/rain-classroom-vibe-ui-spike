# Input / SearchInput 设计讨论整理

日期：2026-09-08。来源：本轮新旧组件核对、官方组件库资料，以及用户逐项确认与修订。

目标：继承 Rain Classic Input 的视觉比例、内容层级和常用能力，用现有 Rain Design Token 表达，并修正编辑、清空、搜索和字段协同中的问题。

2026-09-09 家族归属确认：用户希望只有一套 Input 和一套 Select，并明确“允许保留 `SearchInput` 作为同一 Input 家族的搜索快捷用法”。据此，SearchInput 保留现有公开名称与调用方式，归属于 Input 家族；此前“独立组件身份”指可单独调用和登记，不再表示另一个输入框家族。完整能力、外观与展示入口见[字段配方设计](2026-09-08-input-select-field-recipes-design.md#20-两个组件家族与搜索快捷用法)。用户随后再次“继续推进”，现已完成两个家族的入口整理，完整Input示例可统一切换三种外观并保留编辑状态；验证见[本批记录](../../evidence/runtime/select/verification.md#家族收敛续批2026-09-09)。

| 记录项 | 本稿状态 |
| --- | --- |
| 交互、职责、颜色选择、尺寸档位与默认值 | 按本轮已确认决定整理 |
| 字号、留白、圆角及内嵌按钮几何 | 全档部件间距继续保持 4px；计数去掉内部额外空格，清空点击区保持 24px，见下方第 8 项 |
| 本轮文件改动 | 先保存本讨论稿；随后用户明确授权“开始建设该组件”，实施见下方记录 |
| 组件实现、Token 生成、Manifest、阶段登记 | 已按后续明确授权建设；详见 [实施计划](2026-09-08-input-implementation.md) 与 [验证记录](../../evidence/runtime/input/verification.md) |
| 首轮实现的自动验证、独立审阅、Input Human Gate | 首轮结果作为历史保留；颜色用途发现和 Human Gate 仍待确认，本次视觉修订单独验证 |
| 实物审阅后的修订 | 用户明确授权“开始调整代码”后，第 1–9 项已落实；本次检查与独立复核结果见验证记录 |
| 发布、业务迁移、Git 提交 | 本轮未执行 |

Rain Next 已接受的全局 Focus 继续有效。本文关于其他 Input 配方的讨论，不改变该项独立验收记录。当前阶段与组件成熟度分别以 [current-phase](../../status/current-phase.yaml) 和 [Input Manifest](../../manifests/ui/input.yaml) 为准。

## 实物审阅后的最新修订（2026-09-08，已授权实施）

用户根据实际检查页截图提出第 1–7 项，要求“先讨论，不懂代码”，随后回复“确定”。之后明确计数呈现 `2/3`、右侧辅助部件继续保持 4px、清空点击区保持 24px，并要求单位和普通计数使用现有文字 Token 再浅一号。用户随后明确授权“开始调整代码”。以下为本次实施基线；颜色用途与 Human Gate 仍单独审阅。

| 项目 | 最新设计决定 |
| --- | --- |
| 1. 清空图标与对齐 | 使用正式 `icon/circle-close-filled`；14px 图形在 24px 点击区内居中，按钮与外框垂直居中，不靠整体位移抵消文字行盒偏差 |
| 2. 编辑描边 | 最终可见深蓝描边只有 1px；避免实体边框与同色焦点细环相邻叠成粗边，保留浅蓝外圈 |
| 3. 清空顺序 | 清空位于输入区之后、单位之前；隐藏时的稳定预留归入输入区末端，单位、计数、尾部操作之间不插入清空空槽 |
| 4. 框内文字按钮 | 换算、查看、搜索等可操作文字优先使用既有主题色完整按钮方案；禁用使用禁用色 |
| 5. 校验状态图标 | 移除自动附加的 Warning / Error 图标；使用框体颜色和下方说明表达状态，功能图标按用途保留 |
| 6. 警告说明 | 框外 Warning 说明使用现有橙色文字 Token，Error 使用红色，普通帮助说明使用辅助文字色；具体橙色档位需验证用途与可读性 |
| 7. 只读交互 | 鼠标点击只读内容不出现编辑蓝底、蓝色编辑描边或编辑光环；保留选择、复制和独立查看动作，键盘 Tab 保留明确的位置提示，区别于编辑激活态 |
| 8. 辅助区与计数紧凑性 | 计数写成 `2/3`，去掉斜杠两侧额外空格，不增加字间距，保留字体自身留白；右侧辅助部件继续保持 4px，清空点击区保持 24px |
| 9. 单位与普通计数层级 | 当前 Text/Neutral/4 改为再弱一档的公开 Text/Neutral/5；输入正文仍为 Text/Neutral/1，超限计数仍用 Text/Red/1，Disabled 仍用禁用色。颜色用途与可读性单独复核 |

先前右侧辅助部件改为 2px 的建议已被用户明确替换为保持 4px。此次紧凑性调整来自计数组内空格、清空排列和图形居中；计数内部、按钮自身留白和相邻部件间距分别处理。单位沿用现有 `suffixText` 入口，该后静态文字 Part 与普通计数使用 /5；Placeholder、prefixText 及前后自定义附加内容继续使用原层级，不增加单位识别或新的公共接口。

第 9 项最初的默认填充核查发现：在 `Fill/Neutral/Solid/7` 上，Text/Neutral/4 → /5 的对比度为 Light 5.57 → 3.71、Dark 7.17 → 6.24。本次实施后已补齐其他状态与父背景：单位与普通计数各有 9 项低于 4.5:1 的组合；橙色 Warning 说明新增 2 项。连同原有发现，Input / FormItem 共保留 36 项对比度与 4 项色族资格发现；内嵌主题文字按钮另有 8 项色族资格发现，详见 [实际验证记录](../../evidence/runtime/input/verification.md)。这些用途均未接受例外，颜色方向确认不等于可读性验收。

## 1. 迁移与取舍

| 能力 | 处理方向 |
| --- | --- |
| 单行编辑、受控 / 非受控值、原生输入属性 | 保留新版已有能力 |
| 28 / 32 / 36px 比例、框外标签、清空图标 | 继承旧版视觉来源，以新版 Token 表达 |
| 24px 紧凑档 | 新增；28px 仍属于常规表单与标准查询尺寸 |
| 前后静态文字、装饰图标、自定义附加内容 | 保留明确语义和固定排列顺序 |
| 一个尾部动作 | 保留；统一只读、禁用、焦点及尺寸约束 |
| 中文输入法保护、按可见字符计数、hard / soft | 复用新版已有基础，补齐默认显示与回填保护 |
| Error / Warning 下清空 | 改善：仍可编辑时允许清空 |
| SearchInput | 同一 Input 家族的搜索快捷用法；保留独立调用入口，复用 Input 的编辑能力与外观 |
| FormItem | 补齐标签、说明、校验结果与辅助技术关联 |
| InputNumber、TextArea | 保持独立职责，另行梳理，不塞入普通 Input |
| Password、OTP、自动补全组件 | 尚无本轮业务需求，暂不扩展；原生 autoComplete 等属性仍属于普通输入能力 |

不要求 Vue 与 React API 一一相同。复用已经可用的编辑与焦点逻辑，避免复制两套 Input 编辑实现；本次讨论没有选择新的底层交互库或表单状态库。

## 2. 成熟组件库参考

以下为本轮参考及 Rain 的取舍，不表示引入相应依赖。

| 参考 | 功能与架构观察 | Rain 的采用方向 |
| --- | --- | --- |
| [shadcn Input Group](https://ui.shadcn.com/docs/components/base/input-group)、[Field](https://ui.shadcn.com/docs/components/radix/field) | 框内图标、文字、按钮可以组合，框外标签和说明有独立部件 | 采用清晰的部件边界，提供完整常用配方，避免页面重复拼装 |
| [Ant Design Input](https://ant.design/components/input/) | 清空、计数、状态、搜索和多种输入衍生组件覆盖广；搜索事件区分清空来源 | 学习后台场景能力与边界处理；不照单加入所有外观和衍生组件 |
| [MUI TextField](https://mui.com/material-ui/react-text-field/) | 完整字段封装与 FormControl 等部件配合，标签和辅助信息协同 | 采用完整字段的使用方式；保留 Rain 框外标签，不把浮动标签作为默认视觉 |
| [React Aria SearchField](https://react-aria.adobe.com/SearchField) | 编辑值与提交值分开，提供清空、标签和只读等语义 | 学习编辑、提交及可访问性分工，保持 Rain 自身视觉 |

24px 紧凑档曾对比 Ant Design、[Element Plus 尺寸定义](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss)与 [Fluent UI Input](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-input/library/src/components/Input/useInputStyles.styles.ts)。共同借鉴的是小尺寸采用完整配方；Rain 的 13/18px 排版是本项目的对照建议，不是这些组件库的共同标准。

## 3. 组件分工与内容顺序

| 层次 | 职责 |
| --- | --- |
| Input | 单行编辑、框内附加内容、清空、长度提示、基本状态表现 |
| SearchInput（Input 家族） | 复用 Input，增加搜索动作、Enter 提交、清空搜索及 Loading 表达 |
| FormItem / Field | 框外标签、必填标记、帮助与校验文案、关联信息 |
| 页面 / 表单 / 查询逻辑 | 业务校验与时机、请求、取消请求、过期结果、权限和提交 |

默认提供完整 Input，以及常用的 FormItem + Input 配方。特殊结构再通过受约束的组合处理；不要求每个页面从零拼清空、计数和状态。

框内视觉顺序如下，未配置的部件不生成空内容：

```text
前装饰图标 → 前自定义内容 → 前静态文字 → 输入区 → 清空
→ 后静态文字 / 单位 → 后自定义内容 → 后装饰图标 → 计数 → 尾部操作
```

所有相邻部件继续使用 `Space/4`，包含右侧辅助区。计数内部不套用部件间距，使用 `2/3`，无额外空格或字间距。清空启用后的稳定占位按第 6 节单独处理。

普通 Input 最多一个主要尾部操作，采用 TextButton 或 IconButton。文字、装饰图标与动作分别声明语义，不根据 ReactNode 内容或图标外形猜测它是不是操作。文字操作优先使用主题色系；只读动作是否改值的表达方式应明确。

## 4. Size、Density 与几何

### 4.1 已确认的尺寸与默认选择

| 场景 | 默认选择 |
| --- | --- |
| 普通 Input，未显式指定 Size | 32px |
| 标准查询区完整配方 | 28px，与相应高度的普通查询按钮配套 |
| 紧凑筛选、密集操作区域 | 24px |
| 更宽松的输入区域 | 可显式选择 36px |

28px 和 32px 都属于常规表单 / 标准查询尺寸。Density 选择区域默认的完整方案；显式 Size 优先，不二次缩放。沿用 [ADR 0003](../adr/0003-size-and-density-responsibilities.md) 的职责划分，不据此修改其他组件的全局 Density 默认。

### 4.2 几何对照基线

下表单位均为 px；高度包含实体边框。四档高度和内部间距已确认，其他数值保留为本轮提出的视觉对照基线。

| 项目 | 24 紧凑 | 28 常规 | 32 常规 | 36 宽松 | Token 来源 |
| --- | --- | --- | --- | --- | --- |
| 字号 / 行高 / 字重 | 13 / 18 / 400 | 14 / 22 / 400 | 14 / 22 / 400 | 14 / 22 / 400 | Typography/UI/Compact 或 Typography/UI/Default |
| 左右基础留白 | 8 | 16 | 16 | 16 | Space/8、Space/16 |
| 部件间距（含右侧辅助区） | 4 | 4 | 4 | 4 | Space/4；计数内部无额外间距 |
| 圆角 | 4 | 6 | 6 | 6 | Radius/4、Radius/6 |
| 实体边框 | 1 | 1 | 1 | 1 | Line/Thickness/1 |
| 装饰图标 | 16 | 16 | 16 | 16 | Icon/Size/16 |
| 清空可见图形 | 14 | 14 | 14 | 14 | Icon/Size/14；正式 icon/circle-close-filled，图形与点击区双层居中 |
| 清空点击区 | 24 × 24 | 24 × 24 | 24 × 24 | 24 × 24 | Input 的清空 Part 尺寸登记 |

排版、间距、圆角、线条和图标基础已存在，见 [Typography](../../packages/foundations/src/typography-contract.ts)、[Token 合同](../../packages/foundations/src/token-contract.ts)和 [Icon Size](../../packages/foundations/src/icon-size-contract.ts)。Input 四档尺寸已在首轮建设中独立登记；同值 Space 或字号不直接充当公共控件高度。

宽度由布局分配，旧版 272px 仅为参考实例，不作为新的全局固定宽度。窄容器需检查所有附加内容占用后的实际编辑宽度；不靠临时缩字、压缩图标或遮挡必要操作解决拥挤。

### 4.3 内嵌尾部操作候选

| Input 高度 | 文字操作 | 图标操作 |
| --- | --- | --- |
| 24px | Compact TextButton，24px | IconButton 24px 点击区 / 16px 图标 |
| 28 / 32 / 36px | Regular TextButton，26px | IconButton 24px 点击区 / 16px 图标 |

这些按钮尺寸已有实现，见 [Button 样式](../../packages/ui/src/button/button.styles.ts)和 [IconButton 配方](../../packages/ui/src/icon-button/icon-button.styles.ts)。组件之间的 4px 间距不改写按钮自身的完整配方。

24px 框体的 1px 边框使普通内盒只有 22px 高，不能直接假设 24px 操作放入后自然适配。拟采用按外框整高安排的操作区，保留点击范围；边框、按钮圆角、Focus 和相邻点击范围需一起验证。不得只裁切溢出，也不得未经确认缩小点击范围。

SearchInput 的内嵌搜索文字按钮与分隔线沿用旧版作为视觉候选，末端留白、分隔线长度及各尺寸组合仍需实物对照。外置普通实底 Button 目前最小为 28px，24px 实底查询按钮是单独的配套缺口，不由 Input 实现代替。

## 5. 颜色、状态与 Focus

### 5.1 已确认的内容颜色

| 部位 | Rain Token |
| --- | --- |
| 输入值 | Text/Neutral/1 |
| 前静态文字及前后自定义附加文字 | Text/Neutral/4 |
| 单位等后静态文字（suffixText） | Text/Neutral/5；由原 Text/Neutral/4 弱化一档 |
| Placeholder | Text/Neutral/5；2026-09-09实际组件反馈要求再淡一档，随Select同步 |
| 普通计数 | Text/Neutral/5；超限 / 禁用继续遵循相应状态颜色 |
| 普通装饰图标 | Icon/Neutral/3 |
| 清空 Default → Hover → Pressed | Icon/Neutral/3 → Icon/Neutral/2 → Icon/Neutral/1 |
| 软超限计数 | Text/Red/1；不自动把框体设为 Error |
| 框外 Warning 说明 | 现有 Text/Orange 文字色系；具体档位需验证用途与可读性 |
| 框外 Error 说明 | Text/Red/1 |
| 框内文字操作 | 现有 TextButton Brand 方案；禁用遵循按钮禁用色 |
| Disabled 文字 / 图标 | Text/Neutral/6、Icon/Neutral/5 |

Error / Warning 不自动把输入值、单位和普通装饰图标染成状态色。只读保留可读的正常前景层级。自定义内容与内部动作也必须遵守外层禁用规则。

不因 Error / Warning 自动加入状态图标；框体状态与框外说明共同表达反馈。

### 5.2 已确认的框体颜色方向

| 状态 | 填充 | 边框 |
| --- | --- | --- |
| Default | Fill/Neutral/Solid/7 | Border/Neutral/2 |
| Hover | Fill/Neutral/Solid/7 | Border/Neutral/1 |
| 编辑 | Fill/Brand/Alpha/4 | Border/Brand/1 |
| Warning | Fill/Orange/Solid/3 | Border/Orange/1 |
| Error | Fill/Red/Solid/3 | Border/Red/1 |
| Disabled | Fill/Neutral/Solid/5 | Border/Neutral/3 |

以上使用现有 [颜色登记](../../packages/foundations/src/color-registry.ts) 的主题映射，不把浅色模式的十六进制值直接写入组件。Disabled 使用对应前景与背景，不再对整个 Input 叠加一层透明度。

状态叠加规则：

- ReadOnly 保持普通可读外观；鼠标点击不触发编辑蓝底、蓝色编辑描边或编辑光环，仍可选择和复制。键盘 Tab 保留明确的位置提示，内部查看动作保留自身反馈。
- ReadOnly 与 Error / Warning 同时存在时，保留校验状态视觉。
- Disabled 与 Error / Warning 同时存在时，框体使用 Disabled 外观；外部校验文案可以保留。
- Error / Warning 获得焦点时，保留状态背景和边框，叠加全局 Focus。
- 清空只改变值。错误或警告是否解除，由外部校验结果决定。

全局 Focus 的既有验收继续有效。Input 编辑时最终可见的深蓝线限定为 1px，不将同色实体边框与贴边细环相邻叠成粗线；保留 `Fill/Brand/Alpha/3` 的浅色外圈。输入本体的焦点由父框表达，内部按钮保留各自的键盘焦点表现；只读鼠标交互与键盘位置提示按上述规则区分。Forced Colors 继续沿用已有系统色处理。

颜色选择的讨论确认不代表所有实际用途已通过对比度检查。弱边框作为必要控件边界、Orange / Red 在不同父面及 Dark 的表现仍有待验证，见第 10 节；不修改全局颜色规则来隐藏缺口。

## 6. 清空默认与行为

Input 和 SearchInput 默认开启清空。使用者可以明确关闭，关闭后释放清空的预留位置。

| 条件 | 清空表现 |
| --- | --- |
| 有值、可编辑、桌面鼠标环境 | Hover 或框内 Focus 时可见 |
| 有值、可编辑、触屏环境 | 可见，不依赖 Hover |
| Error / Warning，但仍可编辑 | 按相同规则显示并允许清空 |
| 空值 | 不显示可操作的清空按钮 |
| ReadOnly / Disabled | 隐藏且不可操作 |
| SearchInput Loading | 仍可清空，按第 8 节发起空关键词查询 |

启用清空后保持稳定位置，位于输入区之后、单位之前；隐藏时的预留归在输入区末端，单位、计数与尾部操作之间不插入空槽，避免显隐造成相邻部件横跳。不可见按钮不能留在键盘焦点顺序中；清空关闭时不占位。只读 / 禁用下仍不保留可聚焦的清空节点。

清空通过与正常编辑一致的值变化路径通知使用者，兼容受控 / 非受控值，之后焦点回到输入本体。清空不改变框体及框外校验结果，不再添加框内校验图标。

只读允许选择、复制及不改变输入值的动作，例如复制、查看、搜索当前值；会改值的尾部动作禁用。Disabled 统一禁用所有内部动作，包括自定义动作。不可用的尾部操作保留原位置并显示禁用外观，清空为隐藏的例外。

## 7. 字数、限制与回填保护

| 情况 | 已确认行为 |
| --- | --- |
| 没有长度上限 | 默认不显示计数，可以主动开启 |
| 设置长度上限 | 默认显示当前字数 / 上限，可以明确关闭 |
| hard，默认模式 | 限制超出的输入或粘贴；中文组字完成后再处理 |
| soft | 保留超限内容，计数变红，不自动触发框体 Error |
| 已有内容回填超限 | 保留原内容并提供超限反馈 |
| 加载数据或修改上限 | 不因此静默截断已有内容 |

按用户看到的字符，即字素簇计数，组合 Emoji 作为一个可见字符。复用 [当前工具函数](../../packages/ui/src/input/input.utils.ts)，使用原生 Intl.Segmenter，并检查目标浏览器支持。建设前的 Array.from 回退不能完整保证组合 Emoji 语义，首轮建设已移除该回退。

从已确认规则派生的验收要求：hard 模式下的超限回填也必须能逐步修正，不能一次退格意外删除剩余超限文本；超限反馈不只靠颜色，隐藏可见计数时仍需有可关联的说明。计数变化的读屏播报频率应避免每次键入产生干扰。

上限参数的合法性、回填后替换 / 粘贴及选区保持，需要在技术实施方案中落实为具体用例，不通过挂载时截断来规避。

## 8. SearchInput

SearchInput 保留独立身份，共享 Input 的编辑、清空、计数、尺寸与状态。默认搜索动作与页面请求分开。

| 操作或状态 | 已确认行为 |
| --- | --- |
| 输入、修改关键词 | 更新草稿，默认不立即查询 |
| 点击搜索 / Enter | 提交当前关键词，走相同搜索入口 |
| 中文组字中的 Enter | 不触发搜索 |
| 点击清空 | 清空并立即用空关键词查询，页面保留其他筛选条件 |
| Loading 时继续输入 | 允许编辑，不自动查询 |
| Loading 时搜索按钮 / Enter | 按钮在原位置显示加载状态，阻止重复提交 |
| Loading 时清空 | 仍立即发出空关键词查询，作为新的搜索意图 |
| 当前查询完成 | 更新结果，不改写用户正在编辑的关键词 |
| 旧请求晚于新请求返回 | 忽略旧结果，结果与加载状态均以最新查询为准 |
| ReadOnly | 可以搜索当前值，不能改值或清空 |
| Disabled | 输入与搜索操作均不可用 |

例如：正在查询“张三”时清空，随后“张三”的响应晚到，也不能覆盖清空后的结果或提前结束新请求的 Loading。

组件输出明确的搜索动作来源；请求编号、取消、过期判断及结果状态放在查询层。单次清空只产生一次对应查询，不因值变化通知重复提交。普通 Input 的清空本身不隐式触发页面查询，SearchInput 承担这一明确的搜索语义。

## 9. FormItem 协同

Input 管框内，FormItem 管框外，页面或表单逻辑管理业务校验。

- 常规表单提供 FormItem + Input 完整配方，统一标签、间距和提示位置。
- 查询栏允许独立 Input，但仍需可访问名称；Placeholder 不代替字段名称。
- 标签、输入、帮助与校验信息自动建立关联；保留调用方原生属性与明确声明的关联。
- 框体与框外提示共享同一份校验结果，避免正常框体与错误文案不同步。
- 必填标记属于字段表达；校验规则、何时校验、能否提交由页面或表单逻辑决定。
- 标签采用旧版框外形式。FormItem 不在本轮扩展为完整表单状态管理系统。

首轮建设已落实 Size、语义附加内容、只读动作权限及字段状态 / ID 传递接口，详见 [实施计划](2026-09-08-input-implementation.md) 和实际组件。最新视觉讨论以现有接口为基础，不因视觉修订重新扩展 API。

## 10. 建设前核对记录与验收矩阵

以下保留首轮建设前的新旧源码、设计文档与留档图核对事实，表中的“当前”指该次核对时点，不是最新实现状态。首轮实际实现、检查与截图见 [验证记录](../../evidence/runtime/input/verification.md)；其后的实物审阅修订见本文顶部，尚未实施。

| 项目 | 本轮核对结果 / 缺口 | 后续验证重点 |
| --- | --- | --- |
| 尺寸与样式 | 当前 Input 无独立四档 Size，仍以 Density 控制 30 / 36px；基础样式仍含硬编码几何 | 四档真实高度、完整排版、全档 4px gap、显式 Size 优先 |
| Token 接入 | 已有基础 Token，但 Input 完整配方未接入 | 从来源生成映射，消费公共 Token；不手改生成区、不增加第二套视觉值 |
| 清空 | 当前默认关闭，显示为“清除”文字，Error / Warning 隐藏并阻断 | 图标、默认开启、桌面 / 触屏、稳定占位、错误态、值通知和焦点恢复 |
| 附加内容 | 当前主要为通用 prefix / suffix；尾部动作目前排在清空与计数前 | 语义部件、排列顺序、只读与禁用、自定义内容、窄容器 |
| 字数 | 当前 showCount 默认 false；hard 的非受控 defaultValue 会初始化截断；超限标记只覆盖 soft | 有上限默认显示、hard 回填保留与反馈、修改上限、IME、粘贴、组合 Emoji |
| SearchInput | 当前 UI 包尚无独立 SearchInput 实现 | 编辑与提交分离、清空搜索、Loading 编辑 / 清空、重复提交及请求竞态 |
| FormItem | 当前演示层有字段组织，公共 Input 主要依靠外部属性关联 | 完整字段配方、独立 Input、统一错误来源、标签和说明关联 |
| 24px 内嵌操作 | 基础值和按钮尺寸已有，实际整高布局未验证 | 24px 点击区、1px 边框、Focus、圆角、相邻动作与编辑选区 |
| 24px 外置实底按钮 | 当前普通 Button 最小 28px | 独立补充 Button 配套方案；不混入 Input 隐式扩展 |
| G3 必要边界 | 弱边框不能仅凭 Token 有效就宣称控件识别达标 | 实际父背景、Hover、编辑、校验状态与 Focus 的可见性 |
| G4 状态前景 | Input 的 Orange / Red 组合不能沿用按钮已通过结论 | Light / Dark、嵌套 Light、真实 Alpha 合成及文字 / 图标资格 |
| 键盘与主题 | 现有全局 Focus 已独立接受 | Tab 顺序、不可见节点、动作焦点、Forced Colors、触屏及必要的浏览器差异 |

新实现后的验证应复用真实组件与真实交互，覆盖四档、普通 / Warning / Error、只读 / 禁用、空 / 有值 / 超限和代表性附加内容组合。自动检查、独立审阅和 Human Gate 分别记录，不用静态概念图或旧测试通过结论替代。

## 11. 与旧候选记录的差异

本轮用户决定优先于旧候选，但本次不批量改写历史计划。

| 历史候选或现状 | 本轮有效设计决定 |
| --- | --- |
| 将 28px 对应紧凑查询 | 28 / 32 为常规；新增 24px 紧凑 |
| 查询 Standard 默认 32 | 标准查询完整配方默认 28；普通 Input 默认 32 |
| 28 / 32 / 36 内部间距 8 | 四档统一 4，右侧辅助区也保持 4；计数内部去掉额外空格 |
| 清空默认关闭或优先有值常驻 | 默认开启；桌面按 Hover / 框内 Focus，触屏有值可见 |
| Error / Warning 不允许清空 | 可编辑时允许清空，校验结果独立 |
| 查询 Loading 禁止修改条件的旧组合候选 | 本轮 SearchInput 允许继续编辑和清空；不重写其他查询区的业务策略 |
| hard 初始化截断已有值 | 保留回填内容与超限反馈，禁止静默丢值 |

主要旧候选位于 [Size / Density 首批配方](2026-09-05-size-density-first-recipes.md)。其中 Button / TextButton 已完成部分及全局 Focus 的独立记录继续保留；本稿只修订与本轮 Input / SearchInput 有关的讨论方向。

## 12. 依据与后续入口

首轮 Input、SearchInput、FormItem 已建设并进入实物审阅，24px 外置 Button 配套独立处理。用户已授权按第 1–9 项调整代码；本次按 System Mode 修改共享组件及精确登记，使用真实组件验证四档几何、部件顺序与颜色、鼠标 / 键盘只读表现，并回归输入、搜索及共享 Focus。首轮验证结果不覆盖本次修订，最终结果见对应验证记录。

本地依据：

- [Rain Classic Input 设计说明](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Input.design.md)
- [Rain Classic Input 实现](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Input/Input.vue)与 [样式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Input/input.scss)
- [Rain Next Input 实现](../../packages/ui/src/input/input.tsx)、[样式](../../packages/ui/src/styles.css)与 [字素簇工具](../../packages/ui/src/input/input.utils.ts)
- [颜色治理与用途门槛](2026-09-05-color-token-governance-design.md)、[补充色族](2026-09-06-color-family-supplement-design.md)
- [当前阶段](../../status/current-phase.yaml)、[Input Manifest](../../manifests/ui/input.yaml)与 [Size / Density ADR](../adr/0003-size-and-density-responsibilities.md)

本稿中的来源观察、用户确认、视觉候选和实现缺口分别保留，后续从当前决定继续，不以旧候选重新覆盖本轮修订。
