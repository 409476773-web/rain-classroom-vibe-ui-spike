# Rain Next Icon Library Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
>
> **执行边界（2026-09-03 更新）：** 用户已明确“进入实施”，授权本计划的本地代码、来源读取/导出、目录、规则与验证。保留原计划下文的预检历史；实际进展见 `status/current-phase.yaml` 与 `evidence/runtime/icon-migration/verification.md`。不包含 Git 分支/worktree/commit/push/PR、Figma 写入/发布、依赖安装/升级、包发布或业务迁移。

> **后续修复授权：** 用户随后明确“修复两个源图形异常”，仅授权恢复目标 Figma 的 editor-redo（84:35）与 editor-undo（84:32）准确原版几何，并重新导出接入本地。具体范围、独立验收状态与证据见 current-phase.yaml 的 iconLibrary.sourceRepair 及 evidence/icons/source-repairs.json；不包含其他 Figma 写入或发布。

**Goal:** 将 Figma「02 · Icons」完整图库接入 Rain Next，让 AI 能找到并使用真实资产，遵守已确认的默认语义、场景例外和颜色规则。

**Architecture:** Foundations 持有框架无关的图标身份、来源和语义规则；UI 提供共享渲染能力与可按需引用的单图标入口。文档、AI 索引、安装信息和检查从同一份已确认数据生成；现有 Button 通过 leadingIcon/trailingIcon 组合图标。

**Tech Stack:** 现有 React、TypeScript、Vite、Tailwind CSS、pnpm workspace、Vitest、Testing Library、Playwright。优先复用仓库工具与依赖，不将引入新依赖、新包或 MCP 服务作为实施前提。

---

## 1. 工作目录、来源与确认范围

目标仓库：

`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike`

旧 Vue 库只读参考：

`/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0`

以下实施文件路径均以目标仓库为根；“拟新建”不表示文件已经存在。

正式设计来源：

- [Figma 完整图库：02 · Icons](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=1-3)，fileKey `olqwu95QD6n4Y3IAwUdgF4`，page `1:3`。
- [用户最初整理的 icon 语义说明](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2201-85)，frame `2201:85`，保留为首次讨论的来源。
- [后续补充的常见固定语义图标](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2201-707)，section `2201:707`；用户新链接定位到其中的[跳转说明](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2201-756)，frame `2201:756`。
- 该区域的文字、实例和真实主组件已在本任务前续只读读取；语义修订依据这些读取结果及后续逐项确认。后续 42 项图形结构预检见第 2.4 节；本任务没有改写 Figma。
- 2026-09-03 本任务中用户后续明确：编辑默认线性版；文字按钮“展开／收起”默认双箭头；接受用途分层的颜色规则；资产范围以 Figma 完整图库为准。
- Figma 图中文字只说明了双箭头“常与文字按钮搭配”，其默认优先级来自上述后续用户确认，不能在新任务中丢失。

确认记录：

| 决策 | 已确认内容 |
|---|---|
| 范围 | 完整 Figma 图库，而非仅 Vue 当前已导出的文件或此次举例的图标 |
| 编辑 | 线性版默认；实心版通常仅在用户特殊明确要求时使用 |
| 通用展开／收起 | 单箭头组默认 |
| 文字按钮展开／收起 | 双箭头组为该场景默认，优先于通用规则 |
| 实心三角 | 通常仅在用户特殊明确要求时使用 |
| 本批线性／实心成对版本 | 同一语义下默认线性版；实心版通常只在用户明确要求时使用，不扩展成全库无条件规则 |
| 更多操作 | 菜单入口默认横向三点 `icon/more-horizontal` |
| 竖向更多与粗线关闭备选 | `icon/more-vertical`、`icon/close-bold` 通常只在用户明确要求，或具体组件的已确认规范明确指定时使用 |
| 新建／添加／加；删除／减去／减 | 按创建或删除对象、加入或移出集合、数值增减分别选择，不只匹配按钮文案 |
| 关闭／清空／失败 | 普通关闭用 `icon/close`；清空与失败提示用 `icon/circle-close`，颜色按各自用途提供 |
| 选中与结果提示 | 菜单/列表选中用 `icon/check-bold`；成功、正确、已完成结果提示用 `icon/circle-check`；复选框/单选框保留自身规范 |
| 发布／发送 | 操作用 `icon/publish`；成功反馈用 `icon/circle-check`；内容已发布状态用 `icon/published` |
| 刷新／重新／恢复 | `icon/refresh` 用于刷新、重试/重新加载；其中恢复明确指恢复默认设置/初始值 |
| 按钮内页面跳转提示 | 默认 `icon/share-alt`；图标是否出现和页面打开方式分别由实际场景决定 |
| 普通提示 | 用户确认原“普通题型”为“普通提示”的笔误；默认 `icon/info`，实心版遵循已确认的例外规则 |
| 操作图标颜色 | 随所在控件的前景色、状态与主题变化 |
| 状态图标颜色 | 由状态组件提供对应语义色 |
| 身份配色 | 明确具有固定配色的品牌、文件类型或多色资产保留规定配色 |
| Loading | 保留渐隐效果，颜色随所在组件变化 |

决策来源分两层：Figma 说明提供用户选定的语义与候选资产；后续明确答复确定默认版本、场景优先级和行为边界。搜索、筛选等单一对应关系沿用用户说明；设置、警告、信息、帮助等成对版本结合已确认的线性优先规则整理。未覆盖的语义仍需按已有证据检索，不猜定新的全局默认。

## 2. 本轮只读核对结果与证据边界

2026-09-03 14:19–14:26（Asia/Shanghai）完成主组件结构预检：

| 项目 | 本轮结果 |
|---|---:|
| COMPONENT 主组件 | 897 |
| 唯一图标名称 | 897 |
| 重复名称 | 0 |
| 不以 icon/ 开头的名称 | 0 |
| 24×24 主组件画布 | 897 |
| legacy-shape 命名资产 | 18 |

计数对象是图库的主组件，不把语义说明中的实例重复计入。名称唯一不代表图形没有重复；24×24 画布也不代表导出文件的可见边界和小尺寸效果已经通过检查。

本轮未完成 SVG/PNG 全量导出、逐图视觉比对、颜色模式逐项确认、发布状态逐项查询或全量来源锁定。曾尝试返回整库名称清单，但工具响应被截断；数量、尺寸和下列种子身份来自完整统计结果的未截断前部，不把被截断的名单当成已冻结清单。Task 1 必须分批获取并核对请求数与返回数。

填色数量、渐变或蒙版存在与否只能用来筛选复核对象。蒙版白色可能只是遮罩信息；Loading 的角向渐隐也不意味着固定多色。不能据此自动批准或重写颜色。

### 2.1 首批 9 个验证资产的来源

全部来源于上述 Figma 文件，主组件画布均为 24×24。

| 正式名称 | 主组件 ID | Component Key |
|---|---|---|
| `icon/edit-pencil` | `183:574` | `f704fc5409bdc8d05e7ed07bcdb98ff21a1af770` |
| `icon/edit-pencil-filled` | `183:540` | `8d3b347010ebd80bfe0c7c24d93adf66fb6187a8` |
| `icon/arrow-down` | `63:76` | `457881b00122d6cdfc873ab4dd68c5cbaaebd1dd` |
| `icon/arrow-up` | `63:69` | `052ecb572199b2383143b8dd59b4dac04abf398c` |
| `icon/double-arrow-down` | `71:35` | `b717884e9b614be3ff1414d40c1a83b889cbfb0b` |
| `icon/double-arrow-up` | `71:32` | `ee711c2c79a23b136ed33edd260849fd98b8a1bc` |
| `icon/chevron-down` | `8:17` | `60c169aa3c2e000171a6bab361ccc9a1bba8cc5f` |
| `icon/chevron-up` | `52:33` | `202d6a21466956cca5464e70b8fcac44d3bd9505` |
| `icon/button-loading` | `207:33` | `93cf004533993728cbfc12d16bc8790469acf961` |

另有两个真实资产必须保留独立身份：

- `icon/edit`：`51:44`，不同于 `icon/edit-pencil` 的主组件 `183:574`。
- `icon/chevron-right`：`52:47`，不同于新默认的上下单箭头组。

旧名称、旧资产和新默认之间不能自动建立等价别名。保留旧身份不表示它继续是全局默认，也不表示本轮决定将它废弃。

### 2.2 现有代码的接入条件

- `packages/ui/src/button/button.tsx` 已提供 `leadingIcon`、`trailingIcon`；文字按钮是 `variant="text"`。保留这一组合边界。
- Button 已管理 loading 替换、装饰图标容器、状态与尺寸。不要额外让 Button 从文案猜图标或添加业务流程。
- `packages/ui/src/link/link.tsx` 没有图标插槽；本次不自动扩展 Link。
- `apps/playground/src/docs/components/text-button-icons.tsx` 是页私有夹具，仍使用旧 edit/chevron-right；相关页面和 E2E 也保留旧选择及旋转断言。
- `evidence/rain-classic/reuse-matrix.yaml` 的 semantic-icon-registry 项已确认 Foundation 数据、独立 UI 渲染、宿主颜色归属；实现仍是 `not-started`。保留历史审核事实，同时追加本次默认规则变化和目标侧实施证据。
- `scripts/verify-boundaries.mjs` 精确限制 UI/App 文件、包 exports、Manifest/Registry 空占位；实施图标库必须同步新增精确范围及检查，不能删除或泛化这些保护。
- `scripts/verification-helpers.mjs` 当前只接受 `textButton` refinement，并在其已完成时要求旧夹具存在；新增图标 refinement 与退役夹具必须同步调整这个精确合同及其测试，保留文字按钮原有生命周期。
- 当前仓库是 main 上尚无提交、已有文件均未跟踪的工作区。不能把空的 Git diff 当成“没有改变既有文件”的证据；实施前记录相关文件摘要，保留其他任务的工作。
- 现有业务页面 Visual Evidence 和四个 Benchmark 不构成完整图标库证据；不得借用它们宣称图库已通过视觉验证。

### 2.3 补充语义区域的读取范围

此前在本任务中读取 section `2201:707` 的全部 11 个分组，核对到 41 个实例、41 个不同主组件；实例名与主组件名全部一致，没有缺失主组件引用。已查看整组截图及状态组、发布组的细节，保留了各组文字说明和主组件身份。

其中 8 项是先前讨论的编辑与展开图标，其余 33 项身份见附录 B。该区域没有 Loading；与第 2.1 节的 `icon/button-loading` 合计，讨论涉及 42 个不同资产。42 表示讨论涉及的资产范围，其中包括例外和备选版本，不表示 42 个都有全局默认，也不代表完整图库已迁移、导出或验收。

首批 9 项继续作为技术接入的验证批次；本节扩充语义覆盖，不改写 897 项全库范围或第一批实施顺序。

### 2.4 42 项图形与接入预检

2026-09-03 补充了[迁移前只读预检记录](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/docs/audits/2026-09-03-icon-migration-preflight.md)。42 个不同主组件的名称、ID、Key 和类型均匹配；通过 45 次 SVG 字符串导出读取（含 3 次重复细查），确认 41 个单色图标和 1 个角向透明渐变 Loading。字符串仅用于读取检查，尚未写入正式资产库存。

- 42 项导出均为 24×24 viewBox，均未使用 currentColor；41 个单色导出的可见前景为固定深灰色。Figma 内绑定颜色变量不等于网页内自动跟随按钮色。
- arrow-down、arrow-up、check-bold 含 alpha/luminance 双层蒙版；其白色蒙版值不能随可见前景统一改色。线性图标也可能由填充轮廓构成，不能以 fill/stroke 判断线性或实心版本。
- 42 项导出均有固定 ID，需处理重复内联时的引用隔离；本轮没有浏览器串色或裁切错误的实测结论。
- Loading 导出使用 foreignObject 中的 conic-gradient；现有 PNG alpha mask 是待比对的复用候选，不直接认定与本次源图一致。
- 现有 Button 插槽与颜色责任可继续复用；旧编辑夹具为紧裁切画布，切换标准 24×24 新资产后要比较视觉大小、留白和居中。

这是结构与接入条件检查，不代表全库冻结、规范化渲染、运行时测试或视觉验收完成。其余资产的颜色类型和复杂结构仍在未来 Task 1/5 的范围内。

## 3. 语义选择合同

### 3.1 默认与例外

以下默认用于场景已经需要图标时；是否添加图标由具体组件和交互决定。

| 意图与场景 | 默认资产 | 场景边界 |
|---|---|---|
| 编辑操作 | `icon/edit-pencil` | 同语义实心版按下表例外规则使用 |
| 一般组件或页面中的展开 | `icon/arrow-down` | 用户特殊明确要求时可用实心三角 `icon/chevron-down` |
| 一般组件或页面中的收起 | `icon/arrow-up` | 用户特殊明确要求时可用实心三角 `icon/chevron-up` |
| 带“展开”文案的文字按钮 | `icon/double-arrow-down` | 优先于通用展开规则 |
| 带“收起”文案的文字按钮 | `icon/double-arrow-up` | 优先于通用收起规则 |
| 新建对象，如课程、试卷 | `icon/add-bold` | 创建一个新对象 |
| 向当前集合添加成员、题目等项目 | `icon/add-circle-outline` | 向集合补充项目 |
| 增加数值或数量 | `icon/add` | 数值增量操作 |
| 删除对象或记录本身 | `icon/delete` | 与移出集合区分 |
| 从集合中减去或移除项目 | `icon/minus-circle-outline` | 不一定删除原对象 |
| 减少数值或数量 | `icon/minus` | 数值减量操作 |
| 搜索入口、搜索输入框 | `icon/search` | 沿用用户选定的搜索语义 |
| 筛选 | `icon/filter` | 沿用用户选定的筛选语义 |
| 设置 | `icon/settings-3` | 本组默认线性版本 |
| “更多操作”菜单入口 | `icon/more-horizontal` | 展开额外操作菜单；内容展开另按展开规则 |
| 关闭页面、弹层 | `icon/close` | 普通关闭操作 |
| 清空输入框、清除选择器已有值 | `icon/circle-close` | 操作色随所在控件 |
| 操作失败、错误提示 | `icon/circle-close` | 状态色由错误提示组件提供 |
| 菜单、列表中的选中标记 | `icon/check-bold` | 颜色跟随选中样式；复选框/单选框内部遵循自身规范 |
| 成功、正确、已完成的结果提示 | `icon/circle-check` | 使用对应状态的语义色；具体业务状态标记另按相应规则 |
| 风险、警告、异常提示 | `icon/alert-circle` | 由警告提示组件提供语义色 |
| 普通提示／中性用户提示 | `icon/info` | 用户已确认原“普通题型”为笔误；不作为题型图标或题型关键词 |
| 疑问、帮助、补充说明 | `icon/help` | 本组默认线性版本 |
| 刷新、重试/重新加载 | `icon/refresh` | 依据实际行为判断，“重新编辑”仍属于编辑 |
| 恢复默认设置、恢复初始值 | `icon/refresh` | 不自动扩展到撤销上一步、恢复已删除内容 |
| 发起发布、发送操作 | `icon/publish` | 发布/发送成功反馈使用通用结果提示 `icon/circle-check` |
| 标识内容当前已发布 | `icon/published` | 独立业务状态，不当作 publish 的填充变体 |
| 按钮内提示前往另一个页面 | `icon/share-alt` | 是否展示图标及当前页/新标签等打开方式由实际交互决定 |
| 加载指示 | `icon/button-loading` | 保留正式图形与渐隐，不用 refresh 替代加载资产 |

优先级为：当前任务中的明确指定 → 已确认的场景规则 → 全局默认。旧组件描述、英文名称和历史别名不能覆盖后续用户明确确认的规则。

同一语义下的线性／实心版本，默认采用下表左侧；右侧通常只在用户明确要求时使用。本表覆盖本次用户选定的成对版本，不根据 SVG fill、圆圈外框或 bold 后缀自动判定，也不扩展成整个 897 项图库的无条件规则。

| 默认版本 | 实心例外版本 |
|---|---|
| `icon/edit-pencil` | `icon/edit-pencil-filled` |
| `icon/add-circle-outline` | `icon/add-circle-filled` |
| `icon/minus-circle-outline` | `icon/minus-circle-filled` |
| `icon/settings-3` | `icon/settings-3-filled` |
| `icon/more-horizontal` | `icon/more-horizontal-filled` |
| `icon/circle-check` | `icon/circle-check-filled` |
| `icon/circle-close` | `icon/circle-close-filled` |
| `icon/alert-circle` | `icon/alert-filled` |
| `icon/info` | `icon/info-filled` |
| `icon/help` | `icon/help-filled` |
| `icon/publish` | `icon/publish-filled` |

其他规则：

1. 图形选择不因一级按钮、悬停、选中或禁用而自动改为实心；复选框、单选框内部形态仍按各自组件规范处理。
2. `icon/add-bold` 与 `icon/check-bold` 是已确认场景的正式默认。粗线、圆圈/无圆圈、横向/纵向及操作/完成状态是独立选择维度，不能用“线性优先”替换这些规则。
3. “是否需要出现图标”和“出现时使用哪个”分别判断；不根据编辑、更多、跳转等文字自动增加图标，也不新增全局前后位置规则。
4. 按实际行为选型，不做文案关键词替换。例如“添加课程”如果实际是在创建新课程，应命中新建；“恢复”只有重置为默认/初始值的场景命中本次确认。
5. “展开”指内容展开／收起，不扩展到全屏、放大或其他操作。双箭头默认只覆盖带展开/收起文案的文字按钮。
6. 新的上下方向引用对应正式资产。只有核对过变换等价性，才能通过旋转实现；不能沿用旧夹具的右三角旋转代替新默认。
7. `icon/share-alt` 保留原始资产身份；“分享”保留为历史来源描述。分享/转发按各自语义检索，不能仅因名称含 share 而选它，也不能据它生成新标签页行为。
8. 通用结果提示与业务状态分别处理：“发布成功”用 circle-check，“当前已发布”用 published；此次未指定“已发送”业务状态图标，不自动复制 published。
9. 规则未覆盖但名称、用途清晰的资产，可以在完整库中检索并按场景使用；未确认语义不得被生成器擅自提升为全局默认。

### 3.2 颜色与交互责任

| 层级 | 责任 |
|---|---|
| 图标资产 | 提供准确图形、画布、透明度、颜色模式、来源 |
| 语义规则 | 选择正确图形及经确认的场景例外 |
| Button 等宿主 | 提供尺寸、前景色、悬停/禁用/危险等状态，以及交互与可访问名称 |
| 状态组件 | 提供成功/警告/错误等语义色及非颜色信息 |
| 图标渲染 | 遵守宿主提供的颜色，或执行明确的固有配色模式 |

建议技术颜色模式只有两类：`host` 和 `intrinsic`。状态图标由宿主提供状态语义色，仍可以使用 host 模式；“状态图标”不需要变成每个资产固定一种红黄绿的第三种文件格式。

- 一级按钮中的普通操作图标应自然获得白色，不由页面临时写白色修补。
- 禁用透明度由宿主协调，避免宿主与图标重复叠加。
- `icon/circle-close` 用作输入框/选择器清空时跟随控件前景色，用作失败提示时跟随错误语义色；图形相同不代表颜色责任相同。
- 菜单/列表的 check-bold 跟随选中样式；circle-check 的成功、正确或完成结果提示跟随对应状态，不把所有勾号自动设为同一种颜色。
- 发布/发送操作遵守控件色，发布成功反馈遵守成功状态色；published 的“已发布”标记按对应状态规范提供颜色，不在图标资产中新增固定颜色。
- Loading 保留透明度渐隐；现有 PNG mask 可作为经比对确认后的适配方式，不为统一 SVG 格式而重画圆环。
- 对保留固有配色的资产，不用覆盖所有 fill/stroke 的规则强制改色。
- 不把普通 SVG 作为 img 后期待它继承按钮 currentColor。
- 独立信息图标必须有可读语义；与已命名控件配对的装饰图标不重复朗读。点击、键盘和焦点由控件负责。

### 3.3 已确认的备选规则与未覆盖场景

- `icon/more-vertical`、`icon/close-bold` 保留为备选，通常只在用户明确要求，或具体组件的已确认规范明确指定时使用。这条备选规则已经获得用户确认，无需重新作为待定项询问。
- 普通更多操作继续默认 more-horizontal，普通关闭继续默认 close。竖向布局、空间较窄、按钮重要性或希望更醒目等情况，本身不触发方向或线条粗细替换；close-bold 也不被当作实心版。
- “已确认规范”需要能追溯到相应组件的设计决定；旧实现、历史说明或 AI 自行推断，不自动构成使用备选的依据。
- 用户已确认 Figma 原标题“普通题型”为“普通提示”的笔误。本计划已修正语义表述，并以普通提示／中性提示检索 info；原笔误只保留为来源修正记录，不作为题型关键词。本次没有改写 Figma，不能宣称源文件标题已修正。
- 同一资产的历史宽泛用途不自动升级为额外默认；未知语义、本次未讨论的其他方向/粗细例外和业务状态继续依据新证据决定。
- 其他“重新执行”业务操作，如再次发送，尚未新增相对既有操作规则的优先级；不能只因含“重新”而扩大 refresh 的默认范围。

本批曾列出的两个备选规则与标题问题均已确认并记录。其他尚未讨论的场景不扩大本次默认范围，也不构成资产废弃或从全库迁移范围中移除的决定。

### 3.4 AI 查找规则与遇到不确定信息时的处理

以下为实施与验收约定，不新增图形默认，也不要求每次使用图标都向用户确认。

1. 从项目 AGENTS 的简短入口进入生成的图标规范，先按实际操作/状态及组件场景查规则，再核对具体资产和静态导入方式。不从全部 897 个英文名称中凭相似度直接猜默认。
2. 有唯一已确认规则时直接采用，沿用第 3.1 节的既定优先级；例如已明确为文字按钮的展开/收起，不重复询问是否使用双箭头。
3. 同优先级规则冲突应在数据校验时报告；AI 不按文件顺序、英文名称或外形相似度静默决定。先读取规则来源与当前任务上下文，仍有实质冲突才澄清冲突点。
4. “添加课程”等文案若缺少实际行为，先从已有页面上下文判断创建对象或加入集合。只有仍不能判断、且会改变选型时，才询问缺失的行为；已确定的其他部分继续推进。
5. 未覆盖的语义按第 3.1 节规则在完整库中检索，可记录有依据的任务局部选择，不自动写回全局默认。若无充分依据，应说明未确定，不把猜测包装成既有规范。
6. 用户明确指定但不存在或尚不可导入的资产，属于身份/可用性问题；准确报告，不能用近似 SVG、Unicode 或同名外部图标静默替代。诊断留在开发与验收记录，不显示为产品界面的内部说明。

## 4. 接入方式与权衡

推荐：**静态单图标入口 + 共享渲染器 + 构建时/AI 检索使用的完整目录**。

| 路线 | 能力与代价 | 本计划选择 |
|---|---|---|
| 仅搬文件并写说明 | 有资产可选，但页面仍可混用显示方式，颜色与默认规则缺少约束 | 不作为完整交付 |
| 统一入口、规则、索引与检查 | 复用现有组件，支持按需引入；需要一次建立数据与生成流程 | 推荐 |
| 为所有业务操作再封装一层按钮 | 可固定更多组合，但扩大公共 API 和业务耦合 | 暂不引入 |

拟议公共用法（接口示例，尚未实现）：

```tsx
import { Button } from "@rain-next/ui";
import { EditPencilIcon } from "@rain-next/ui/icons/edit-pencil";
import { DoubleArrowDownIcon } from "@rain-next/ui/icons/double-arrow-down";
import { DoubleArrowUpIcon } from "@rain-next/ui/icons/double-arrow-up";

<Button variant="primary" leadingIcon={<EditPencilIcon />}>
  编辑
</Button>

<Button
  variant="text"
  trailingIcon={
    expanded ? <DoubleArrowUpIcon /> : <DoubleArrowDownIcon />
  }
  onClick={toggleExpanded}
>
  {expanded ? "收起" : "展开"}
</Button>
```

图标放在前侧还是后侧仍按具体组件和场景规范决定；此例不新增全局位置规则。

约束：

- 单图标入口只引用自身资产和共享渲染器。按需打包需要用实际产物验证，不能只凭 import 写法宣称成立。
- 不把 897 个图形载入一个默认运行时字典，再让每个按钮按字符串扫描全库。
- 完整元数据可供图标目录、生成器和 AI 查询使用，不通过普通 UI 根入口自动带入页面。
- Foundations 不能反向依赖 React UI；Foundation 数据中可以有身份和导出标识，不直接引用 React 组件。
- 生成页面时由 AI 查规则并写出明确的静态引用；运行时不对中文按钮文案进行语义猜测。
- Figma 是设计来源，目标仓库存放经确认的版本化资产与规则；文档、索引和检查由目标规则生成。此流程不包含自动回写 Figma。
- 固定源码导入与目录查询已经足够支持首轮；不以建设新 MCP 服务或安装插件为前提。

## 5. 实施任务

### Task 0：登记实施范围并保留基线

**前提已满足：** 用户于 2026-09-03 明确“进入实施”，本地运行时迁移已授权。

**拟修改：**

- `status/current-phase.yaml`
- `scripts/verify-boundaries.mjs`
- `scripts/verification-helpers.mjs`
- `scripts/verification-helpers.test.ts`
- `scripts/verify-workspace.mjs`（仅确有新增必需入口时）
- `evidence/rain-classic/reuse-matrix.yaml`（目标决策补充，不改写历史审核结果）

**步骤：**

1. 重读 AGENTS、SPIKE_BRIEF、当前 phase、相关 Evidence 与 Benchmark；记录目标文件当前摘要。
2. 在已有 Day 3 下登记局部 iconLibrary refinement，明确实施、导出和测试的精确范围，不自动推进其他家族或阶段。
3. 记录本次语义确认如何调整旧的默认规则，保留旧资产身份、原始审核和来源。
4. 精确扩展文件、exports、Manifest/Registry 检查；生成文件允许集合应来自经过验证的库存，而非任意目录豁免。同步扩展 refinement 解析与测试，使 `iconLibrary` 可以按明确状态并存；仅在正式图标替换完成的相应状态下允许旧夹具退役，不改变文字按钮的既有生命周期与验收状态。
5. 验证原有未授权领域仍然被限制。沿用已有 Button Gate 作为历史基线，为新 Icon 与组合单独准备验收。

**检查：** `pnpm exec vitest run scripts/verification-helpers.test.ts`、`pnpm verify:boundaries`、`pnpm verify:reuse-audit`。这是未来检查，不是本轮已通过项。

### Task 1：分批冻结完整资产清单与原始导出

**拟新建：**

- `evidence/icons/source-lock.yaml`
- `evidence/icons/inventory.json`
- `evidence/icons/source-exports/`
- `evidence/icons/README.md`

**步骤：**

1. 以 fileKey/pageId 精确定位来源，分批读取主组件；逐批核对数量、返回完整性和节点身份。
2. 为每项记录原名、Node ID、Component Key、原始画布、读取时间、来源版本（可获得时）、原始导出文件及哈希。
3. 保存未经颜色改写的原始导出；独立记录 normalized 产物及转换版本。保留路径、比例、裁切、蒙版与渐变证据。
4. 检查同名、同形候选、旧名与用途不明项。颜色与语义分别标记，不能用“看起来是蓝色”推断其颜色模式。
5. 全量统计闭合；本轮 897 只是计划时快照，正式冻结时若变化，记录增删差异并解释范围，不静默忽略。
6. 对导出失败或暂不能保真的资产记录具体原因和待处理状态，不用近似图形补位，也不伪报全量完成。

说明：来源被标为 UNPUBLISHED 不等于已发布；不能用 Component Key 存在推导发布状态。读取、导出与目标代码使用不自动包含 Figma 发布。

### Task 2：建立身份、语义和颜色合同

**拟新建：**

- `packages/foundations/src/icons/icon-contract.ts`
- `packages/foundations/src/icons/semantic-rules.json`
- `packages/foundations/src/icons/semantic-rules.generated.ts`
- `packages/foundations/src/icons/catalog.generated.ts`
- `packages/foundations/src/icons/semantic-rules.test.ts`
- `scripts/generate-icons.mjs`
- `scripts/generate-icons.test.ts`

**拟修改：**

- `packages/foundations/package.json`
- `scripts/verify-boundaries.mjs` 的相关明确允许项

**步骤：**

1. 用第 3 节的已确认场景编写选择规则测试：编辑与展开、成对版本默认、更多操作与内容展开、三组增减行为、关闭/清空/失败、选中/结果、发布/已发布、恢复范围、页面跳转及未知语义。补充同优先级冲突、实际行为不足、已指定资产不可用的处理检查。数据规则可以先验证，不要求此时所有图标都已可导入。
2. 先运行测试确认当前缺少该能力，再实现数据合同和生成流程。
3. 以一份可机读源规则生成类型化规则、AI 文档和相关检查输入，避免人工分别维护多份默认表。
4. 字段至少覆盖：assetId、原名、来源、颜色模式、语义/场景、优先级、例外条件、关键词、非适用场景、导出标识、语义确认状态。
5. 来源、导出/渲染完成度、语义确认状态、成熟度、发布状态分开记录。
6. 未定义语义的资产仍保留真实身份与目录入口，不生成未经确认的固定默认。

**未来定向检查：**

```sh
pnpm exec vitest run packages/foundations/src/icons/semantic-rules.test.ts scripts/generate-icons.test.ts
```

预期关键断言：文字按钮展开/收起命中双箭头；primary、hover、disabled 不自动改变已确认成对版本；add-bold/check-bold 保留各自默认；“添加课程”按实际行为选型；clear/error 共享 circle-close 但保留不同颜色责任；publish/circle-check/published 分别命中动作、反馈、状态；share-alt 不按英文名称扩展为分享默认；未知名称、重复身份和无依据例外被报告。

### Task 3：共享渲染与首批 9 个单图标入口

**拟新建：**

- `packages/ui/src/icon/icon.tsx`
- `packages/ui/src/icon/icon.test.tsx`
- `packages/ui/src/icons/<asset-name>.tsx`（首批为第 2.1 节 9 项，随后由库存扩展）

**拟修改：**

- `packages/ui/package.json`
- `packages/ui/src/styles.css`
- `scripts/verify-boundaries.mjs` 中精确的文件与 exports 规则

**步骤：**

1. 先建立宿主颜色、尺寸、装饰/信息语义和重复实例 ID 的失败用例。
2. 实现共享渲染边界；生成每个静态入口，使用正式源图形，保留标准画布，不拉伸或凭视觉重画。
3. 处理 React 属性、defs、gradient、clipPath/mask 与引用 ID；同时处理 ID 及所有引用，验证同图多实例、不同颜色及不同图标共页，不互相串色或引用其他实例的裁切。
4. 普通图标仅将经过结构确认的可见前景规范化为宿主色；保留蒙版/裁切辅助值和透明度，不全局替换所有 fill。特别核对 arrow-down/up 的白色 luminance 蒙版；check-bold 在后续入口补齐时采用同一规则。固有配色资产通过明确模式保留。
5. Loading 优先比较现有 `packages/ui/src/button/assets/button-loading.png` 与来源的圆环、渐隐方向、边界、尺寸和宿主色；确认一致时再复用 alpha mask。源 SVG 的 foreignObject/conic-gradient 不按普通路径丢弃处理。旋转、整体透明度与 reduced-motion 由宿主/已确认规则控制，不由新 Icon 重复叠加。
6. 保持现有 Button 插槽接口，不引入 Button.iconName 或文案推断逻辑；不顺带实现 IconButton、Link 扩展或其他家族。
7. 对新增单图标 exports 和生成文件逐项验证，保留 UI 根入口与 Foundation 的依赖方向。

**未来定向检查：**

```sh
pnpm exec vitest run packages/ui/src/icon/icon.test.tsx packages/ui/src/button/button.test.tsx packages/ui/src/button/button-text.test.tsx
pnpm typecheck
```

首批完成只表示接入链路可验证，不代表完整图库迁移完成。

### Task 4：接入说明页与一份 AI 使用入口

**拟新建：**

- `docs/ai/icon-selection.md`
- `manifests/icons.json`
- `registry/icons.json`
- `apps/playground/src/docs/icons-page.tsx`
- `apps/playground/src/docs/icons-page.test.tsx`
- `tests/e2e/icons.spec.ts`
- `evidence/runtime/icon-migration/`

**拟修改：**

- `AGENTS.md`（简短查询入口，不塞入全库名单）
- `apps/playground/src/routes/route-registry.ts`
- `apps/playground/src/app.tsx`（路由实际需要时）
- `apps/playground/src/docs/components/text-button-page.tsx`
- `apps/playground/src/docs/components/text-button-page.css`（清理依赖旧 chevron-right 的旋转规则）
- `apps/playground/src/docs/components/text-button-page.test.tsx`
- `apps/playground/src/docs/components/text-button-icons.tsx`（正式入口替换并核对后退役）
- `tests/e2e/text-button.spec.ts`
- `scripts/verify-boundaries.mjs`

**步骤：**

1. 从同一数据生成中文/英文可查询索引、正式名称、可复制静态引用、来源链接、颜色类别、默认与反例。AGENTS 只提供短查询入口，生成规范按场景组织，具体条目再指向实际存在的资产与用法；入口不得要求新会话已知图标英文名称或本次聊天历史。
2. 图库提供浏览和搜索；用途未确认的项目明确标注，不作为默认推荐。
3. 首批运行时示例使用已生成的编辑线性版、单箭头、文字按钮双箭头；替换旧页面私有图标引用和依赖旧图形的断言。完整语义文档可以在本步骤展示；新建、状态、发布、跳转等新增运行时示例须随 Task 5 对应入口生成后补齐，再在 Task 6 验收，不能提前导入不存在的模块。
4. `text-button-icons.tsx` 在所有消费者完成切换并核对后才删除或撤销原夹具；不得直接改画它来冒充正式资产。
5. 将运行时文件与 Token/样式依赖登记到源码安装信息。Manifest/Registry 的实际格式要与仓库边界合同一起确定，不能将不存在的实现标为可安装。
6. 跨应用消费检查样式安装和单图标路径。页面内直写 SVG、普通 img 冒充宿主色图标、无效名称等绕过方式应被检查或清楚诊断。
7. AI 的“按名称可导入”和“按语义选对”分别验证；静态扫描不被描述为能理解任意业务含义。

首轮使用本地文档/索引即可，不发布 Registry，不建立额外服务。不能借此关闭文字按钮原有的 awaiting_human 状态。

### Task 5：补齐全量资产并核对复杂配色

**拟扩展：**

- Task 1 的库存、原始导出与处理记录
- `packages/ui/src/icons/<asset-name>.tsx`
- 对应生成数据、精确 exports 与目录条目
- `evidence/runtime/icon-migration/`

**步骤：**

1. 分批导出、转换、生成和核对，批次结果可重跑且保持稳定身份。首批 9 项之后优先补齐第 2.3 节讨论涉及的其余资产，并回填 Task 4 的相应运行时示例；备选版本也保留目录身份，之后继续覆盖全部冻结库存。
2. 在全库批量处理前选取明确的品牌、多色、渐变、蒙版和复杂路径样本，核对实际渲染策略；不因单色种子通过就直接全量改 fill。
3. 保留全部源资产的迁移去向。18 个 legacy-shape 项保留原名与来源，标注语义待确认；可以被明确选中使用，但不由 AI 猜成全局默认。
4. 同形候选只做记录；不同名字可能有不同业务含义，不自动合并或删除。
5. 建立全库缩略预览与按分类的放大检查，核对小尺寸、轮廓粗细、画布留白及非方形可见图形。
6. 完整资产可用与全局语义覆盖分开汇报。未经确认的语义可以保留待定，但未导出、不能渲染或颜色策略未解决的资产不能计入“完整图库可用”。

### Task 6：自动验证、Vibe Coding 验收与交接

**拟新建/补充：**

- `scripts/verify-icons.mjs`
- `scripts/verify-icons.test.ts`
- `tests/e2e/icons.spec.ts`
- `evidence/runtime/icon-migration/verification.md`
- `evidence/runtime/icon-migration/vibe-coding-cases.md`
- `package.json` 的未来图标验证入口
- 目标实现与 Human Gate 的独立状态记录

**步骤：**

1. 建立库存到导出、生成模块、exports、目录条目的一一对应检查，检测无效引用、重名、漏项与不受控的生成文件。
2. 验证按钮 default/hover/pressed/disabled/danger、现有主题、一级按钮反白及受控深色宿主夹具、Loading 渐隐与 reduced-motion；比较实际计算色和必要的像素证据。补充 forced-colors 下图标可见性，尤其核对 alpha mask 与渐变，不用现有焦点外框测试替代图标验证。本次不建设完整暗色主题；未来正式主题接入时再验证相应 Token。
3. 检查固有配色、重复实例的 SVG ID、装饰/信息语义，以及图标不会变成额外焦点目标。定向比较 arrow-down/up、check-bold 的 luminance 蒙版在不同宿主色下是否保持可见程度；比较旧紧裁切夹具切换到标准 24×24 后的视觉大小、留白与居中。
4. 构建单图标消费者，检查 bundle/module 图是否引入整库。不能仅依赖 tree-shaking 理论或源代码观察。
5. 按第 6.1 节分开验收“自行发现规范”和“读取规范后选对”：首次只提供仓库位置及普通页面需求，不提供图标名或规范路径。保留读取路径、首次结果、修正结果及场景到真实消费的证据；人工补给规范后成功，不倒推入口发现通过。
6. 核对现有 Button/文字按钮相关回归，再运行已有整体质量门和独立复用审核。
7. 向用户呈现首批场景和全图库浏览结果，准备图标专属视觉验收。自动检查不能替代该验收。
8. 用户确认后只更新被确认的图标 Gate；不自动发布、提交 Git、同步 Figma 或执行业务迁移。

## 6. 验收矩阵

| 样例 | 预期 |
|---|---|
| “给课程列表添加编辑操作”，未指定样式 | 使用 edit-pencil；不自动使用 edit 或 filled |
| “编辑使用实心图标” | 使用 edit-pencil-filled，并保留该显式选择 |
| 普通组件展开/收起 | 使用 arrow-down / arrow-up |
| “添加展开更多/收起的文字按钮” | 使用 double-arrow-down / double-arrow-up |
| 用户明确要求实心三角 | 使用指定的 chevron-down / chevron-up |
| 本批设置、添加、警告、信息、帮助等成对版本，未指定样式 | 默认第 3.1 节线性版本；明确要求实心时命中对应例外 |
| 更多操作菜单，与展开更多内容的文字按钮 | 前者 more-horizontal，后者 double-arrow-down/up |
| 同为“添加课程”文案，实际创建对象或加入当前集合 | 前者 add-bold，后者 add-circle-outline；数值增加另用 add |
| 删除对象、移出集合、减少数值 | 分别 delete、minus-circle-outline、minus |
| 普通关闭与输入框/选择器清空 | 分别 close、circle-close，均遵守所在控件颜色 |
| 同一个 circle-close 同时用于清空和失败提示 | 清空随控件前景色；失败随错误语义色，互不串色 |
| 菜单/列表选中与成功/正确/完成结果提示 | 分别 check-bold 与 circle-check；选中样式与结果状态色分别提供 |
| 页面同时存在复选框、单选框与选中标记 | 复选框/单选框内部形态保留自身规范，不被线性优先规则覆盖 |
| 发布/发送按钮、成功反馈、内容已发布标记 | 分别 publish、circle-check、published |
| 刷新、重试、恢复默认设置/初始值 | 使用 refresh；“重新编辑”仍用编辑，撤销/恢复已删除内容不自动命中 refresh |
| 需要图标的按钮内页面跳转提示 | 使用 share-alt；页面打开方式来自交互要求，不据图标生成新标签行为 |
| 分享/转发需求或“普通题型”关键词 | 不凭 share-alt 历史名称或 info 的已确认笔误产生错误默认 |
| 普通提示／中性提示 | 默认 info；明确要求实心时用 info-filled |
| 竖向布局、空间较窄或希望突出按钮，未指定备选 | 保持 more-horizontal、close 的默认，不自动改为 more-vertical、close-bold |
| 用户明确要求，或具体组件的已确认规范明确指定备选 | 可使用指定的 more-vertical、close-bold；依据可追溯，旧代码用法不能自行充当已确认规范 |
| 同一线性编辑图标放入一级按钮 | 图标白色，图形不变 |
| 危险、悬停、按下、禁用及受控深色宿主 | 随相应宿主规范变化，无双重禁用透明度；不要求新增完整暗色主题 |
| Loading 放入不同宿主 | 图形与渐隐保留，颜色随宿主；reduced-motion 保留可理解状态 |
| forced-colors 强制配色 | 图标仍可辨认；mask/渐变不会丢失必要状态信息 |
| 明确固有配色资产 | 保留经确认配色，不被全局 fill 覆盖 |
| 同页重复渐变/蒙版实例 | 不发生 ID 冲突、串色或错误裁切 |
| 非法名称/缺失文件/工具截断 | 明确诊断；不悄悄换成近似图标或计为成功 |
| 单图标消费 | 正常渲染，产物不包含完整图库图形 |
| 完整冻结库存 | 每项都有明确导出、生成、可用性与目录记录；总量闭合 |

每个生成场景至少记录一次独立新上下文结果；有失败就保留具体失败项并修复对应入口或规则。有限样例通过不等于未来所有 AI 输出必然正确。

### 6.1 新上下文验收方法

生成任务没有本会话历史；测试负责人保留预期图标答案，不把答案写进给 AI 的页面需求。

| 验收环节 | 输入及操作 | 通过依据 |
|---|---|---|
| 入口发现 | 只提供目标仓库位置及正常页面需求 | 能从项目入口查到图标规范；记录实际读取的文件/条目，不能只根据最终猜对推断读过 |
| 语义选型 | 读取规则后解释页面行为、场景和例外 | 命中已确认规则；不凭文件名扩展语义，不重复确认已有默认 |
| 正式消费 | 检查最终静态引用与实际渲染节点 | assetId、来源、入口与图形对应；无近似替代或无效导入 |
| 颜色责任 | 切换已有宿主的状态/前景色并检查图标 | host 模式随宿主变化；已确认 intrinsic 模式保留规定配色；无页面逐图硬编码补色 |
| 问题恢复 | 输入语义不足、冲突或资产不可用的有限案例 | 按第 3.4 节诊断和处理，不伪报选型或可用性成功 |

首次发现失败时，可在另一个记录步骤中提供规范路径，继续诊断选型能力。分别记录发现、选型、导入、颜色/显示问题；首次失败和修正后结果都保留，不用修正后截图覆盖首次证据。

代表性需求可组合成少量受控页面，不为验收额外实现完整业务组件：

| 给 AI 的需求要点（不含资产名称） | 评审者检查重点 |
|---|---|
| 课程列表提供带图标的编辑操作，主要操作使用一级按钮 | 默认编辑线性版；反白来自按钮；随后明确要求实心版时只切换图形版本 |
| 同页有带“展开／收起”文案的文字按钮，以及普通可展开区域 | 两个场景分别选双箭头和单箭头，不以旧三角旋转冒充 |
| 分别创建新课程、将已有课程加入当前集合、增加数量 | 按三种实际行为选择；另做缺少行为信息的“添加课程”案例，不假装已有唯一答案 |
| 同页放置清空值操作与失败提示的最小夹具 | 两者可使用同一资产，但颜色来自不同宿主；改变宿主前景后仍保持正确 |
| 发布按钮、发布成功反馈、当前已发布标记 | 动作、结果和业务状态分别选型；不靠含“发布”的关键词统一映射 |
| 按钮需要页面跳转提示，另有一个分享需求 | 跳转提示命中已确认规则；分享不凭英文 share 误用该默认，也不凭图形自动改变打开方式 |

每项消费记录至少包含：原始需求与可用上下文 → 读取入口/规则 → 实际行为与命中规则 → assetId 与静态 import → 宿主及颜色来源 → 浏览器结果 → 首次问题与修正。该记录用于工程验收，不成为产品 UI 的调试面板。

## 7. 规划时验证命令与历史状态

当前真实存在的命令：

```sh
pnpm verify:evidence
pnpm verify:boundaries
pnpm verify:reuse-audit
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
pnpm verify
```

未来新增测试后，可用：

```sh
pnpm exec vitest run packages/foundations/src/icons/semantic-rules.test.ts scripts/generate-icons.test.ts packages/ui/src/icon/icon.test.tsx scripts/verify-icons.test.ts
pnpm exec playwright test tests/e2e/icons.spec.ts tests/e2e/text-button.spec.ts
```

预期是对应项目全部通过，库存与引用数量闭合；本轮没有运行这些运行时检查，也不预填分数或通过数量。`verify:reuse-audit` 当前未包含在 `pnpm verify` 中，未来需独立执行。当前不存在 `icons:check`，不能借用旧 Vue 库的同名命令作为 Rain Next 已有能力。

以下为规划时历史状态；实施进展以本节开头引用的状态文件与验证记录为准：

- 当前 phase：foundation-spike-day-3；本轮工作为 System Mode 规划与只读核对。
- 产物：本计划、第 2.4 节的 42 项只读预检记录，以及第 8 节的成熟组件库对照；没有创建图标运行时、来源导出清单或系统资产。
- 已做：Figma 全库主组件数量/名称/尺寸预检、首批身份核对、补充语义区 11 组/41 实例核对、讨论涉及的 42 项 SVG 结构预检与目标代码静态核对；按用户确认更新语义和颜色规则，并补齐官方参考、新上下文入口发现、选型、消费及失败处理的验收设计。未执行迁移或运行时验证。
- 未做：代码迁移、完整导出、运行测试、全库视觉验收、体积验证、新图标 Human Gate。
- 未执行：Git 分支/worktree/commit/push/PR、Figma 写入/发布、包或 Registry 发布、业务迁移。
- 规划时下一步为等待实施授权；现已由用户“进入实施”满足。已确认的语义、颜色与完整图库范围无需重问。

## 8. 参考做法与可追溯入口

2026-09-03 重新核对以下官方页面。外部文档提供方法参照；Rain 的具体图形、默认语义、尺寸和颜色仍来自本任务已确认规范。本表“应用”是本计划的设计判断，不表示外部系统已验证 Rain 的实现。

| 官方来源与已核实做法 | 在 Rain 中的应用与边界 |
|---|---|
| [Carbon Button](https://carbondesignsystem.com/components/button/usage/#button-with-icon)：要求按钮图标与文字同色，并列出通用操作的固定图标表，区分 Delete 与 Remove | 把已确认的操作语义对应表作为正式规则，由 Button 供色。Carbon 的 Create/Add 共用映射、图标统一右置和具体尺寸不覆盖 Rain 已确认的三种增量语义及前后插槽 |
| [Atlassian 图标系统复盘](https://atlassian.design/whats-new/building-atlassians-new-icon-system)：区分用途固定与多用途图标，维护用途/关键词；迁移规则由人工旧新映射驱动，并进入测试 QA | 固定默认与其他可用资产分开登记；仅有明确证据的映射可成为自动替换候选。保留 icon/edit 与 edit-pencil 的独立身份，不凭相似度建立别名。本来源是 2025 年迁移复盘，不作为当前 API 参数或发布状态的证明 |
| [Lucide React](https://lucide.dev/guide/react)、[颜色](https://lucide.dev/guide/react/basics/color)及[动态图标说明](https://lucide.dev/guide/react/advanced/dynamic-icon-component)：单图标组件、默认 currentColor，静态用途推荐直接导入；通用动态入口有构建及加载代价 | 支持静态单图标入口与宿主色策略；完整检索目录留给构建/AI 使用。Rain 的实际按需打包仍需产物验证，不引入 Lucide 图形替代，也不把其描边模型套给 Rain 的填充轮廓 |
| [Ant Design Icon](https://ant.design/components/icon/)与[For Agents](https://ant.design/docs/react/for-agents/)：显式区分 Outlined/Filled/TwoTone；为 AI 提供导航文件、设计说明、单组件 Markdown 与查询能力 | 保留版本身份；默认版本由 Rain 的场景规则选择。用简短项目入口加一份生成规范帮助 AI 查阅，不依赖模型训练记忆；首轮不新增 CLI/MCP 服务或安装插件 |
| [MUI SvgIcon](https://mui.com/material-ui/api/svg-icon/)：color 默认 inherit，viewBox 默认 0 0 24 24，并单独提供尺寸及可访问说明属性 | 参考图形与宿主职责边界；保留 Rain 标准源画布，实际显示尺寸仍由 Rain 组件规范及视觉比较决定，不照搬 MUI 的默认字号 |
| [Fluent 图标规范](https://fluent2.microsoft.design/iconography)：系统图标按形状/对象命名，并分别讨论系统、产品及文件图标 | 真实资产名称与本系统使用语义分开；固有配色按身份确认。share-alt 的 Rain 默认用途不由英文名推断，产品配色也不被普通宿主色规则统一覆盖 |

本次没有安装或试运行这些外部库，未评测它们的 AI 选型准确率；上述材料不能证明“成熟组件库已自动解决所有 AI 误用”。本计划据此补齐第 3.4 节的处理边界及第 6.1 节的新上下文验收。

本地可追溯入口：

- [42 项图形与接入预检](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/docs/audits/2026-09-03-icon-migration-preflight.md)
- [现有复用决策](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/rain-classic/reuse-matrix.yaml)
- [当前阶段](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/status/current-phase.yaml)
- [现有 Button](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/packages/ui/src/button/button.tsx)
- [文字按钮正式图标消费](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/apps/playground/src/docs/components/text-button-page.tsx)（旧私有图标夹具已在正式入口切换并验证后退役）

## 附录 A：本轮观察到的 18 个语义待核对名称

以下项目仍在完整迁移范围中。列表不构成自动改名、合并、废弃或移除决定。

| 原始名称 | 主组件 ID |
|---|---|
| `icon/legacy-shape-216-20434` | `186:658` |
| `icon/legacy-shape-216-20437` | `186:563` |
| `icon/legacy-shape-216-20438` | `182:593` |
| `icon/legacy-shape-216-20439` | `182:590` |
| `icon/legacy-shape-216-20440` | `182:587` |
| `icon/legacy-shape-216-20441` | `182:584` |
| `icon/legacy-shape-216-20446` | `182:571` |
| `icon/legacy-shape-216-20457` | `182:543` |
| `icon/legacy-shape-216-20488` | `186:602` |
| `icon/legacy-shape-216-20491` | `186:576` |
| `icon/legacy-shape-216-20496` | `186:607` |
| `icon/legacy-shape-216-21266` | `186:638` |
| `icon/legacy-shape-216-21267` | `186:635` |
| `icon/legacy-shape-216-21268` | `186:628` |
| `icon/legacy-shape-216-21269` | `186:646` |
| `icon/legacy-shape-216-21280` | `186:643` |
| `icon/legacy-shape-216-21282` | `186:538` |
| `icon/legacy-shape-216-21284` | `186:631` |

## 附录 B：新增语义组的 33 个图标身份

来源均为 fileKey `olqwu95QD6n4Y3IAwUdgF4`，依据本任务前续对 section `2201:707` 实例的主组件核对。此表与第 2.1 节中已有的 8 个编辑/展开资产共同覆盖该区域 41 项；Loading 位于该区域之外。表中包含实心例外及场景备选版本，身份登记不代表运行时已迁移、每项均为全局默认或 Figma 已发布。

| 正式名称 | 主组件 ID | Component Key |
|---|---|---|
| `icon/add` | `51:32` | `65ccddef5f0df45fe6dbadd684222a40d4847973` |
| `icon/add-bold` | `71:54` | `ce4fac61be3c0c9537e75a2b508fd76993f493a8` |
| `icon/add-circle-filled` | `67:89` | `db2e3a3f66d5095a420482e1b04a4080aa9c4bda` |
| `icon/add-circle-outline` | `67:32` | `29f00db906409cd23fc62f40208be3fb2292888b` |
| `icon/alert-circle` | `67:64` | `81475b3d4f15b3eb8a0c43b0488fc7afde908a8c` |
| `icon/alert-filled` | `68:50` | `9f1ee5b4ae6419f0061e531fe5e5db061d457857` |
| `icon/check-bold` | `71:48` | `1b0f9ddf7c24e04d4c4a31ee7dd45ec5947b0b8b` |
| `icon/circle-check` | `67:42` | `0f0f2df3e7b62b884dece2342be2f05bc5524da6` |
| `icon/circle-check-filled` | `63:85` | `14f3852a4f9795f2939445f3e6ff3c88726bf241` |
| `icon/circle-close` | `67:39` | `35667b841b056adf89b57b3a376a9b54876099df` |
| `icon/circle-close-filled` | `63:88` | `4e6fdc1ee2aa1741fee2a321926675729d9c17b2` |
| `icon/close` | `8:2` | `191c67961efb298fdbba15974f9be943e3aa2f86` |
| `icon/close-bold` | `71:51` | `b4e171f9ce34dd00eb23c608f508c4403c31b3a1` |
| `icon/delete` | `51:50` | `84b9588997bd9645fa0f5723d01b125bbcd05ff7` |
| `icon/filter` | `63:56` | `19b109c81381baa1d59f5b219d98f017a5bb6ed3` |
| `icon/help` | `8:14` | `28a38a953f0a60202451ec332c01ed5663e6a421` |
| `icon/help-filled` | `68:47` | `5f489b44b2d0672f66310b74603804ae03f55495` |
| `icon/info` | `67:58` | `fc6cf38dee253b8a7ea4791617e2a620208c9179` |
| `icon/info-filled` | `68:44` | `f00d5dc798de2d5f9b905ed3ed583e12197b317f` |
| `icon/minus` | `51:38` | `768cdf68883291003c35f3c8de429fd14f19dea5` |
| `icon/minus-circle-filled` | `67:92` | `af609b522d175fd31b3d98801a58d3fc514bf532` |
| `icon/minus-circle-outline` | `67:36` | `9bc8be2dae2a365ff00d4412b901a91eab55875c` |
| `icon/more-horizontal` | `52:68` | `32703c42896327633f6d9206ece468ad5aebaa15` |
| `icon/more-horizontal-filled` | `68:62` | `aa81e1584b286134cea48187ef502e26edf98325` |
| `icon/more-vertical` | `52:74` | `d6f1533fb923e959672c75c96807a38f6a7890a9` |
| `icon/publish` | `182:645` | `e5a199cdd35fa5f8ff31d057d7ca030965cc6b26` |
| `icon/publish-filled` | `182:695` | `1deaf4063c16a6d9b80b0e44ee3f54286a49bddf` |
| `icon/published` | `186:546` | `b160fbedb7964e48fa929f9dc7e913db339216b0` |
| `icon/refresh` | `51:80` | `f08c4b9ff968b5f8b8e3ec20f871c4a90764c928` |
| `icon/search` | `8:20` | `e8f8a7d2b1b3a90d73e089760cc9d42a83a3f269` |
| `icon/settings-3` | `183:581` | `bb74ab1d584b7bc29efc63d3f2cee30e270d79e6` |
| `icon/settings-3-filled` | `183:546` | `542b8550abf41a7c714ff1e2e720fb20718b7e61` |
| `icon/share-alt` | `184:606` | `3ddfc9c445e18ce7c4b441c0a6a63c909f445dc6` |
