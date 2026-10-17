# Input / Select 字段配方设计

日期：2026-09-08；最近修订：2026-09-09。状态：**示意视觉验收保持通过；公共Select四种能力及Input共享外观已实现，运行检查与技术复审通过。颜色发现与真实组件Human Gate仍未闭合。**

实施记录见[Select运行验证](../../evidence/runtime/select/verification.md)。以下同日反馈记述示意阶段；用户在API与计划交付后再次“继续推进”，已另行授权并实施第8节的精确范围。

2026-09-09 实际组件追加反馈：用户要求下拉箭头略淡、未输入或未选择时的提示再淡一点。Select箭头由Icon/Neutral/3改为/4，Input与Select占位由Text/Neutral/4改为/5；包括菜单内部搜索，禁用映射保留。更新页面后用户回复“确定。”，确认本轮箭头与空值提示的局部视觉调整；颜色资格与对比度继续独立记录，完整Select的Human Gate不由这次局部确认推导。

视觉验收记录（2026-09-09）：用户明确回复“视觉验收完成。”，验收对象为本轮最新状态与尺寸示意中的A1描边、A2浅灰填充、B下划线，以及已展示状态、图标、空值提示、四档尺寸、固定摘要和标签换行。包括24px档12px箭头、其他档14px箭头、Fill/Neutral/Alpha/4标签底色与上下各4px留白。上述实物作为后续API与实现的视觉基准；C继续保留此前外观方向确认。本次记录为示意的视觉验收，公共组件实现、独立技术审阅与系统资产验收仍分别推进；第5节已有用途／对比度问题继续作为技术核验项保留。

确认记录：本稿及其摘要给出后，用户回复“确定。”，确认状态、尺寸、多选布局、Token 补齐方向和后续验证路线。其中普通表单多选默认固定一行摘要，需要逐项查看、移除时使用标签换行。本文仍标记为候选的颜色数值、用途身份和待验证几何，不因设计确认自动视为已登记或已验收。

后续补充：用户明确“select相关的下拉菜单组件目前暂未完成建设。可以简单占位，之后会专门建设这一层组件，统一替换。”据此，下拉菜单层暂用简单占位，不作为 Select 推进的前置依赖；正式菜单层后续单独建设并统一替换。

2026-09-09 实物反馈修订：用户要求异常激活不再叠蓝色深描边、所有图标使用图库、修正清空图形、B Hover 使用现有半透明 Fill，并询问只读中性线来源、要求适当收紧左右留白。本稿据此更新讨论示意的映射与几何；其中异常焦点改为同状态色，替换此前沿用蓝色全局 Focus 的局部设计，公共全局 Focus 与现有 Input 源码均未修改。

同日追加四项反馈：展开箭头图形缩至14px，菜单打开时切换正式arrow-up、关闭时恢复arrow-down；菜单内的搜索／输入控件不继承外层选择器的校验状态；空值提示从Text/Neutral/3调浅一级为Text/Neutral/4。修订继续限定在讨论示意与本稿，不修改公共图标、Token或组件源码。

同日最新三项反馈：24px档的展开／收起箭头进一步缩至12px；多选标签底色由Fill/Neutral/Alpha/3调浅为/4；标签与外框的上下留白由2px增至4px。标签换行区域按内容自然增高，固定摘要仍保持四档高度。

设计阶段目标是把课程信息示意整理成字段合同，当时仅修改本稿、配套计划与讨论证据。后续System Mode实施已承接公共组件、专属尺寸合同、真实父背景、Manifest与验证；真实设备IME和读屏仍未实测，Git状态未推进。

## 1. 已确认的范围

| 决定 | 来源与边界 |
| --- | --- |
| 同一选择器家族包含普通选择、搜索选择；两者分别支持单选、多选 | 用户明确接受；搜索不自动意味着可创建新值 |
| 默认使用完整 Recipe，有明确需要才改变其中部分 | 用户明确接受；使用者不必自行拼清空、空状态、键盘操作和选中值 |
| A1 描边、A2 浅灰填充、B 下划线、C 内容属性四种外观方向 | 用户审阅课程信息示意后回复“这些方案看起来可以” |
| B Hover：现有半透明中性 Fill、更深的中性底线 | 用户明确要求用于加强可操作性，并于2026-09-09指定使用现有 Fill Token；当前映射见5.2 |
| B 激活／展开：半透明主题色底、主题色底线 | 用户明确要求；字段四周无描边、无外圈，键盘同样需要可见位置提示 |
| 当前继续推进完整状态、几何和 Token 映射 | 用户“继续推进下一步”；仍在讨论阶段 |
| 本稿状态、尺寸、多选布局、Token 补齐方向及验证路线 | 用户在草案给出后回复“确定。”；设计确认与实物、实现验收分开 |
| 最新状态、尺寸与多选示意的视觉验收通过 | 2026-09-09用户明确“视觉验收完成。”；以本稿最新映射与几何作为实现视觉基准 |
| 下拉菜单先简单占位，后续统一替换 | 用户明确补充；不要求本轮完成公共菜单层 |
| 实施公共Select四种能力及Input共享外观 | API与计划交付后，用户再次“继续推进”；按独立Select实施记录执行 |
| 统一为 Input、Select 两个组件家族，保留 SearchInput 快捷调用 | 2026-09-09 用户明确希望“一套 input 和一套 select”，随后确认“允许保留 `SearchInput` 作为同一 Input 家族的搜索快捷用法”；规划交付后再次“继续推进”，本批已实施 |

[课程信息示意](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/course-field-study.html)与[前一轮研究记录](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/course-field-research.md)保留已确认的外观基准。示意使用本地颜色快照和模拟保存，其原生选择面板不是公共 Select 的结构或键盘实现。

本稿记录设计确认、示意视觉验收与下拉占位边界。本次实施结果以[Select验证](../../evidence/runtime/select/verification.md)和[current-phase](../../status/current-phase.yaml)为准；Input既有编辑、计数及附加内容继续遵循[Input设计](2026-09-08-input-design.md)，本次共享外观在Select记录中单列。真实组件Human Gate独立验收。

## 2. 组织方式与默认规则

### 2.0 两个组件家族与搜索快捷用法

2026-09-09 用户确认家族归属：对使用者组织为 Input、Select 两个家族；SearchInput 保留现有公开名称与调用方式，作为 Input 家族的完整搜索快捷用法。

| 家族 | 能力归属 | 外观与复用规则 |
| --- | --- | --- |
| Input | 普通编辑、单位、前后静态文字、自定义内容、图标、尾部按钮、清空、计数与长度限制；SearchInput 增加搜索提交与加载表达 | 现有完整 Input 是唯一编辑实现；描边、填充、底线与既有附加能力组合使用，SearchInput 复用同一实现与外观 |
| Select | 普通单选、普通多选、搜索单选、搜索多选，以及摘要、标签、清空与候选状态 | 一套 Select 通过能力选项组合；与 Input 共享字段外观；菜单内 Input 负责候选过滤，不引入 SearchInput 的页面查询提交职责 |

保留 SearchInput 的导出、类型和独立登记 ID 可用于调用与追踪，不表示另建一个组件家族。FormItem 继续负责框外标签、提示及校验关联。此次归属确认不改变现有尺寸默认值或搜索事件合同。

家族收敛续批（2026-09-09 已实施）：

1. Input、Select 各保留一个完整说明入口；总览保留简短预览与链接。Input 与 Select 的并排展示明确标为外观对照；SearchInput 在 Input 页的“搜索快捷用法”中说明。
2. 将 Input 既有单位、附加文字、内部按钮、清空与计数和三种外观放入同一能力检查表；SearchInput 与 Select 的代表性组合共同检查，避免功能与外观分开验证后留下组合缺口。
3. 修复兼容审核发现的 Select 触屏清空槽样式穿透、动态权限或外部关闭后的焦点回调遗漏。触屏回归另发现清空按钮卸载导致外部点击误判，已修正原有关闭判断；菜单搜索保持32px字段和24px清空区，清空后仍展开、保留输入焦点及已选值。

家族确认当时只保存规划；随后用户再次“继续推进”，本批按[续批计划](2026-09-09-select-implementation.md#家族收敛续批执行步骤)完成页面、必要组件修复与Manifest说明同步。Light／Dark × 三外观的完整Input组合、SearchInput草稿与提交、Select触屏搜索及旧Core UI交互已验证，详见[运行记录](../../evidence/runtime/select/verification.md#家族收敛续批2026-09-09)。不据此授予颜色例外或完整组件 Human Gate。

### 2.1 三种字段外观，加一组场景配方

| 层次 | 已确认的组织方式 | 不承担的职责 |
| --- | --- | --- |
| 字段外观 | A1 outlined、A2 filled、B underlined，共用标签、值、清空、状态和尺寸规则 | 不决定单／多选、搜索或保存时机 |
| 选择能力 | 普通单选、普通多选、搜索单选、搜索多选四套完整方案 | 不因为外观不同复制选择逻辑 |
| 场景配方 | C 组合标题编辑、分类 chip、教师头像与姓名、多选摘要 | 不把头像、chip、整条属性行都塞成同一 appearance 参数 |

Input 与 Select 共用字段视觉规则，但编辑文本、搜索候选、选择值各自保留职责。这里的名称用于讨论，不是已冻结的组件名称或 Props。

### 2.2 四套完整选择能力

| 能力 | 默认触发与候选组织 | 值与关闭行为 |
| --- | --- | --- |
| 普通单选 | 字段触发器＋单选列表；可分组、禁用单项 | 确认一项后更新值并关闭；仅移动高亮不提交 |
| 普通多选 | 字段触发器＋多选列表；显示选中标记 | 切换一项即更新字段值，面板保持打开 |
| 搜索单选 | 默认在面板顶部提供搜索，再显示同一单选列表 | 搜索词与已选值分开；选中一项后关闭 |
| 搜索多选 | 默认在面板顶部提供搜索，再显示同一多选列表 | 改关键词不丢失已选项；切换选项保持打开 |

共享的完整能力包含：受控／非受控值、可选的清空、禁用单项、只读／禁用、校验信息关联、加载、无选项、搜索无结果、长名称、键盘与焦点返回。分组先支持平面分组；创建新值、树选择、级联选择有独立需求再组织。

**下拉占位边界：**先用简单的可替换下拉区域展示选项、搜索和选中状态。字段值、搜索词、已选项展示、清空和提交规则由 Select 配方保持一致；占位负责承载当前候选内容与基本操作。保留必要的可访问名称、键盘选择、关闭和焦点返回，复杂定位、嵌套菜单及完整菜单组件能力留到该层专门建设。占位集中在下拉区域，不为一次后续替换预建额外适配框架。

搜索直接嵌入触发区域可作为后续完整结构配方，适合持续输入和标签编辑；不同时强制所有搜索选择都变成可输入的框。搜索面板内的搜索只负责候选过滤，不沿用 SearchInput 的“Enter 提交页面查询”职责。

### 2.3 多选值的两套配方

| 配方 | 推荐用途与默认呈现 | 溢出与删除 |
| --- | --- | --- |
| 固定一行摘要 | 首轮标准表单默认采用；显示前两项名称＋其余数量 | 可用宽度不足时减少可见名称，保留数量和展开入口；到面板取消勾选，清空另设动作 |
| 标签换行 | 需要逐项阅读、直接移除的编辑场景；每项为可移除标签 | 标签与整体按行增长；长标签单项截断，保留完整名称的可访问文本和移除动作 |

“仅数量”适合狭窄工具栏或 C 的属性摘要，是显式场景选择。摘要中的“＋N”是剩余项数量；“已选 N 项”是总数量，两种文案不得混用。空值显示占位提示，不能显示“已选 0 项”冒充有效值。

这两套布局及固定摘要默认值已随本稿确认。标签布局不改变选择、搜索、禁用项或清空的业务语义。

## 3. 完整状态与叠加规则

### 3.1 字段表面

下表为已确认的状态设计基线；此前未展示的状态仍需实物验证。颜色身份见第 5 节。Active 指可编辑字段获得焦点，或其拥有的选择面板处于展开状态，不表示鼠标一直按下。

| 状态 | A1 描边 | A2 浅灰填充 | B 下划线 | 共同规则 |
| --- | --- | --- | --- | --- |
| Default | 普通底＋1px 中性边框 | 浅灰底，无可见边框 | 透明底＋1px 中性底线 | 值与标签可读；字段高度不随边框变化 |
| Hover | 边框加深 | 灰底加深 | 半透明灰底＋更深底线 | 仅作用于可编辑字段 |
| Active／面板展开 | 半透明主题色底＋主题色细线，保留既有 Focus | 固定浅灰底＋主题色细线，保留既有 Focus | 半透明主题色底＋主题色底线，无四周描边或外圈 | 优先于 Hover；展开后焦点转入面板，触发器仍保持展开态 |
| 失焦并收起 | 恢复普通／Hover | 恢复普通／Hover | 恢复普通／Hover | 是否仍为 Hover 取决于指针位置；不等于保存或取消 |
| 空值 | 外框不变 | 灰底不变 | 底线不变 | 保留标签，显示占位；清空不可操作 |
| ReadOnly | 普通可读表面 | 普通可读灰底 | 普通底线，无编辑染色 | 允许读取、复制；不展开选择、更改、清空或移除；可聚焦呈现仍需中性键盘位置提示 |
| Disabled | 禁用底、弱边框 | 禁用底，无可见普通边框 | 禁用底、弱底线 | 无 Hover／编辑响应，内部操作全部失效；不对整体叠 opacity |
| Warning | 警告浅底＋警告边框 | 警告浅底＋警告边框 | 警告透明底＋警告底线 | 保持正文中性色，用下方文字解释，不自动加状态图标 |
| Error | 错误浅底＋错误边框 | 错误浅底＋错误边框 | 错误透明底＋错误底线 | 与 Warning 同样不替换功能图标；可编辑时仍能清空、更正 |
| Warning／Error 获得焦点 | 保留校验表面；1px同状态色细环＋3px同状态色浅圈 | 同左 | 保留校验颜色，底线由1px加强为2px以表达位置，无外圈 | 用户2026-09-09修订：不叠蓝色深环；只读与校验组合也保持校验色，内部操作保留同状态色键盘位置提示 |
| 候选加载中 | 表面按焦点与校验状态 | 同左 | 同左 | 搜索、清空和关闭仍可用；面板显示加载反馈，保留已选值 |
| 无选项／无搜索结果／请求失败 | 字段状态不自动变为 Disabled 或 Error | 同左 | 同左 | 三种面板内容分开表达；请求失败可重试，不删除当前选择 |

A2 普通状态保留无可见边框，校验状态允许用一圈状态边框加强定位；A2 Active 固定浅灰底。两项均已随本稿确认，后续在状态对照中检查实物效果。

### 3.2 不用一个简单优先级覆盖所有状态

- **权限轴**：Disabled 阻断操作并使用禁用表面；ReadOnly 阻断改值但保留可读内容和已有校验信息。
- **反馈轴**：Error／Warning 决定校验表面与说明；Disabled 可以覆盖框体反馈，外部说明仍可保留。
- **位置轴**：可编辑字段的焦点／展开优先于普通 Hover；有校验时保留其语义，并独立表达焦点位置。
- **数据轴**：空值、加载和当前搜索结果不直接改写权限或已选值。清空只发出值变化，是否解除错误由外部校验决定。

普通按下不再增加第四套填充，只延续激活态。B 的专属焦点方向来自本轮用户要求；公共全局 Focus 仍保持既有合同。B 的高对比模式采用系统色2px底线的设计方案；内部清空、标签移除、面板操作各自保留可见键盘焦点，不因去掉字段外圈一并隐藏。

## 4. 尺寸、标签与面板几何

### 4.1 Input 实现与 Select 设计分开

高度、排版与部件尺寸来自当前 Input；**Select 沿用这些比例的设计已确认，尚未登记为 Select 或全局控件高度。** 用户2026-09-09要求适当收紧留白，本轮示意将28／32／36px档的左右留白从16px改为12px，24px档维持8px；现有公共 Input 仍为8／16／16／16px。字段标签默认放在上方；A1／A2／B 比较时保持相同标签位置与间距，不同时引入浮动标签。

| 项目（px） | 24 紧凑 | 28 常规／查询 | 32 常规 | 36 宽松 | 依据 |
| --- | --- | --- | --- | --- | --- |
| 单行外框高度 | 24 | 28 | 32 | 36 | 当前 Input 专属 Size；Select 需独立登记或明确同源引用 |
| 字号／行高／字重 | 13／18／400 | 14／22／400 | 14／22／400 | 14／22／400 | Typography/UI/Compact、UI/Default |
| 左右基础留白 | 8 | 12 | 12 | 12 | 本轮示意采用 Space/8、Space/12；公共 Input 尚未调整 |
| 相邻部件间距 | 4 | 4 | 4 | 4 | Space/4 |
| A1／A2 圆角 | 4 | 6 | 6 | 6 | Radius/4、Radius/6 |
| B 底线与转角 | 1／直角 | 1／直角 | 1／直角 | 1／直角 | Line/Thickness/1；B 不套圆角框 |
| 展开／收起箭头图形 | 12 | 14 | 14 | 14 | Icon/Size/12、/14；arrow-down／arrow-up随菜单开闭切换，布局位和操作区不随图形缩小 |
| 搜索图形 | 16 | 16 | 16 | 16 | Icon/Size/16；按真实用途选资产 |
| 清空图形／点击区 | 14／24 | 14／24 | 14／24 | 14／24 | 正式 icon/circle-close-filled，继承 Input 的清空比例；Select Part 尚待登记 |

Select 未指定尺寸时使用32px；标准查询配方28px，密集区域24px，宽松区域显式36px。遵循现有 Size／Density 职责，显式 Size 优先，不按 Density 再缩放。

高度包含边框。A2 即使无可见边框，也保留等量几何预算；B 切换状态不得顶动正文。24px 框的普通内盒仅22px，24px操作区须按外框整高排布，不裁切、不缩小点击区，也不得侵入相邻操作。所有图标、标签和清空都在宽度预算中，正文使用剩余空间，必要动作不被挤走。

### 4.2 多选布局

固定摘要覆盖四个尺寸，保持与旁边 Input 等高。已通过视觉验收的标签换行使用32／36px档，标签高度分别为24／28px，行间距4px。标签与外框的上下留白各4px，加上两侧各1px的边框预算，单行标签区域最小实际高度分别为34／38px，换行继续自然增高；不挤压标签或移除点击区以强行保持32／36px。24／28px档暂采用固定摘要，摘要高度不变。

上述24／28px已作为选中项的视觉基准确认，公共Tag适配仍须验证。2026-09-09核对时，当前Tag源码仍是常规28px、紧凑24px的旧实现；[Tag第一批](2026-09-09-tag-batch-one-implementation.md)已独立进入建设，计划提供显式24／28px、关闭动作与Local Recipe。Select实施前按届时实际代码复核；能精确承接本轮排版、Alpha/4底色和移除区就复用，否则暂用Select私有选中项部件。不修改Tag家族或并行维护两套运行分支。

### 4.3 候选面板与 C

面板相关条目作为后续菜单层的设计参考；当前可简单占位，不要求提前建成这些公共菜单能力。C 的内容几何仍按本稿进行对照。

| 部位 | 首轮几何建议 | 边界 |
| --- | --- | --- |
| 面板表面 | 不透明浮层表面；圆角8px；复用已有浮层阴影；与触发器间距4px | B 的透明填充不延伸到选项面板；4px间距来自 Classic 参考 |
| 面板宽度 | 默认至少与触发器同宽；长内容可扩展，受视口边距约束 | 不继承旧示例的固定272px宽度 |
| 选项行 | 紧凑最小32px、常规最小36px；左右8px；内部间距8px | 与触发器高度分开，不让24px字段强制生成24px选项行 |
| 长名称／描述 | 名称可换行或在明确宽度下截断；两行内容使行高自然增长 | 不缩字号；完整名称仍可访问；虚拟滚动需另验变高行 |
| 搜索、分组与底部操作 | 搜索位于列表外；组标题不可选；确认／取消位于列表外 | 面板空间不足时滚动候选区，保留必要操作 |
| C 标题 | 展示与编辑保留对应标题排版和相同宽度预算 | 不把标题切换成普通14px小输入后造成跳动 |
| C 属性触发器 | 文本、chip、头像姓名、摘要使用对应内容结构，明确至少24px的可操作区域 | 视觉无框不等于没有点击区；键盘焦点覆盖实际操作区域 |

按用户补充，Select 先通过简单下拉占位推进。正式面板的定位、遮挡回避、滚动和焦点管理随菜单层专门建设，再统一替换占位；不在各个字段外观中重复建设浮层。Spike 原有 Select／Dialog 底层方案对照留到统一基础建设时处理，不因临时占位选定新依赖，也不以菜单层未完成阻塞当前字段验证。

## 5. Token 映射与明确缺口

### 5.1 可以引用的材料与用途候选

“已有”只表示身份存在，不表示全部使用场景或对比度已验收。

| 部位／状态 | 现有身份或建议 | 结论 |
| --- | --- | --- |
| 已选值、普通输入值 | Text/Neutral/1 | 可复用；不随 Error／Warning 全部染色 |
| 空值提示／占位文字 | Text/Neutral/5 | 实际组件反馈要求再调浅一级；覆盖文本输入、空选择、空标签布局及菜单搜索输入，禁用时仍用Text/Neutral/6 |
| 普通标签、辅助说明与数量 | Text/Neutral/3 | 空值提示的变更不扩大为全部次级文字变更 |
| 装饰图标 | Icon/Neutral/3 | 按用途使用 Icon 类别，选中标记不能仅靠文字加粗 |
| 下拉展开图标 | Icon/Neutral/4 | 实际组件反馈要求略淡；展开与收起一致，禁用仍用Icon/Neutral/5 |
| 清空 Default／Hover／Pressed | Icon/Neutral/3 → /2 → /1 | 复用 Input 比例与色阶；图形和动作独立 |
| Disabled 前景 | Text/Neutral/6、Icon/Neutral/5 | 使用指定禁用色，不叠整组透明度 |
| A1 普通／Hover | Fill/Neutral/Solid/7；Border/Neutral/2 → /1 | 现有 Input 来源；必要边界配对见下表 |
| A2 普通／Hover | Fill/Neutral/Solid/6 → /5 | 已确认浅灰方向；灰底与周边的识别需另验 |
| 多选选中项底色 | Fill/Neutral/Alpha/4；正文 Text/Neutral/1；移除图标 Icon/Neutral/2 | 用户最新反馈要求略浅；由/3调至/4，Light 12%／Dark 15%，填充单独叠加，文字与图标不设整体透明度 |
| B 普通 | 透明底；Border/Neutral/2 底线 | 真实父背景须明确；底线的实现入口尚缺 |
| B Hover | Fill/Neutral/Alpha/6＋Border/Neutral/1 底线 | 用户要求使用现有半透明 Fill，替换此前临时灰色值 |
| ReadOnly 聚焦中性线 | Border/Neutral/1；与Warning／Error组合时改用对应状态Border | 原先借用Text/Neutral/4色值的做法已纠正；中性线可辨认度仍须继续审阅 |
| A1／B 普通激活 | Fill/Brand/Alpha/4＋Border/Brand/1 | 已有身份；透明填充必须按实际父面合成 |
| A2 普通激活 | Fill/Neutral/Solid/6＋Border/Brand/1；外圈沿用 Focus | 设计已确认；深色内侧边线配对待复核 |
| A1／A2 Warning、Error | Fill/Orange/Solid/3＋Border/Orange/1；Fill/Red/Solid/3＋Border/Red/1 | 现有 Input 方向；状态颜色不能直接视为通过 |
| B Warning、Error | Fill/Orange/Alpha/2、Fill/Red/Alpha/2，加对应状态底线 | 已制作示意并检查；浅色橙线、深色红线的对比度问题继续保留 |
| 校验说明 | 现有 Text/Orange、Text/Red 文字色族 | 具体档位需按说明所在父面选取；不机械继承 Input 已登记的可读性问题 |
| A1／A2 普通可编辑键盘 Focus | Border/Brand/1 的1px轮廓＋Fill/Brand/Alpha/3 的3px浅圈 | 复用既有 Focus；普通编辑不要叠成两圈相邻的深蓝线 |
| A1／A2 Warning、Error Focus | 对应 Border/Orange/1 或 Border/Red/1 的1px细环；对应 Fill/Orange/Alpha/1 或 Fill/Red/Alpha/1 的3px浅圈 | 用户2026-09-09修订；深环和浅圈均跟随校验状态，不叠品牌蓝；只读不添加编辑浅圈 |
| 面板／候选 | 普通不透明 Fill/Neutral/Solid/7；选中、悬停、键盘活动项分别定义 | 先复用已有表面与色族，再核对各角色配对，不将四种状态混成一层蓝底 |
| 菜单内搜索／输入控件 | 自身普通填充与边框；聚焦用Border/Brand/1＋Fill/Brand/Alpha/3 | 外层选择器的Warning／Error及状态色焦点变量不传入；只有内部控件自身的校验才决定其状态 |
| 排版、Space、Radius、Line、Icon Size | 当前 Foundations 合同与完整排版 Recipe | Tailwind 只做受控映射，不形成第二套裸值 |

用户在示意阶段选择Text/Neutral/4，实际组件追加反馈进一步改为Text/Neutral/5，并将箭头改为Icon/Neutral/4。两者仍属弱中性色，交互字段占位与箭头的消费者资格单独保留；不改全局资格规则，不把局部视觉要求写成通用例外。

### 5.2 B Hover 与只读中性线的映射修订

| 当前示意角色 | Light | Dark | 来源与边界 |
| --- | --- | --- | --- |
| B Hover 半透明底 | rgb(85 112 244 / 6%) | rgb(86 106 181 / 6%) | Fill/Neutral/Alpha/6 的已有明暗值，不另设透明度 |
| B Hover 底线、只读普通聚焦线 | rgb(16 63 183 / 35%) | rgb(194 212 255 / 35%) | Border/Neutral/1 的已有明暗值，保持 Border 身份 |

用户此前看到的只读灰线确实不是已有 Border Token，而是临时取用了 Text/Neutral/4 的 RGB。2026-09-09 改为以上用途正确的现有映射。此前以文字色为种子比较深色6%／8%／10%的方案已由本次要求替换，当前示意移除该对照页；不新增8%透明度或公共灰色身份。中性线在当前白／深色父面上的可辨认度仍是独立问题，不以Token身份正确代替验收。

### 5.3 本轮配对计算

使用现有 Color Registry 的合成、对比度与用途校验函数，共核对24个明暗状态组合。**统一假设父面为不透明 Fill/Neutral/Solid/7；边线数值指边线落在控件内部填充上。** 它不是实际页面截图或完整 WCAG 审核；真实描边同时邻接内外表面，仍须按最终 DOM、父面与必要的视觉提示复核。

| 配对 | Light 对比度 | Dark 对比度 | 设计含义 |
| --- | --- | --- | --- |
| A1／B 普通中性线对普通底 | 1.56 | 1.57 | 若承担必要边界，当前配对不足3:1 |
| A1 Hover 中性线对普通底 | 1.90 | 2.50 | 加深不等于已满足必要边界要求 |
| B 当前 Hover 中性线对半透明底 | 1.87 | 2.54 | 本次改用合法 Fill／Border 映射；必要边界的可辨认度仍待收敛 |
| ReadOnly 普通聚焦线对普通底 | 1.90 | 2.50 | 使用现有Border身份；不能直接宣称中性焦点提示已达到3:1 |
| A1／B 主题色线对合成后的主题透明底 | 3.41 | 3.05 | 在当前假设父面通过3:1；换父面仍需重算 |
| A2 激活线对浅灰底 | 3.58 | 2.99 | Dark 不应四舍五入成通过；外圈的外侧配对独立检查 |
| A1／A2 警告线对警告底 | 2.29 | 6.09 | Light 配对需补齐 |
| A1／A2 错误线对错误底 | 3.17 | 1.41 | Dark 配对需补齐 |
| B 警告线对警告透明底 | 2.29 | 7.00 | Light 配对需补齐 |
| B 错误线对错误透明底 | 3.17 | 1.63 | Dark 配对需补齐 |
| A2 普通灰底对父面 | 1.07 | 1.10 | 不能只靠浅填充就宣称字段边界充分可辨 |

正文 Text/Neutral/1 在这些非禁用配方上的最低计算对比度为13.52；示意阶段占位 Text/Neutral/4 在12组公共填充配方、两个主题中的最低值为4.90。此为旧映射的计算；最新Text/Neutral/5占位与Icon/Neutral/4箭头以[实际组件颜色记录](../../evidence/runtime/select/color-findings.json)为准，资格与对比度仍待核验。

3:1用于识别必要控件、状态的非文字视觉信息与相邻颜色，不要求 Hover 与 Default 两个状态彼此达到3:1，也不要求所有装饰线达到该值。哪些信息承担必要识别职责，需要结合实物判断，见 [WCAG 非文字对比度说明](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)。

### 5.4 实现前应闭合的最小清单

| 缺口 | 处理建议 | 不扩大的范围 |
| --- | --- | --- |
| B Hover 与只读中性线的可辨认度 | 现有 Fill／Border 身份已映射；结合实际父面继续核对必要边界与焦点提示 | 不回退到借用 Text 或任意透明度，不将映射正确写成视觉验收通过 |
| B 单侧线条、无外圈 Focus | 定义字段专属底线与焦点 Recipe，消费已有线宽与颜色 | 不顺带开放全部单侧、虚线或任意线条工具 |
| 普通／校验边界配对 | 核对实际内外父面；明确必要边界后选择合格的同用途映射 | 不全局改色来掩盖局部问题，不擅自授予对比度例外 |
| 占位Text/Neutral/5与箭头Icon/Neutral/4的消费者资格 | 按用户明确的调浅要求与实际内容角色收敛消费登记 | 不改变所有弱中性色的全局资格，不用数值通过替代用途判断 |
| Select 高度与清空尺寸 | 沿用已有比例，明确组件身份或同源引用 | 不把 Space 直接变成公共控件高度 |
| 标签换行与移除 | 以已验收几何接入公共实现；检查独立建设中的Tag能否通过Local Recipe承接 | 不改变已验收标签尺寸，不顺带迁移Tag或等待它完成才推进其他Select能力 |
| FormItem 接入 Select | 复用已有标签、ID、说明、必填与无效状态协议 | 当前仅声明支持一个 Input／SearchInput，不能宣称 Select 已接入 |
| 下拉占位与后续统一菜单 | 先简单承载候选内容与必要操作，保持字段值与提交规则；正式菜单层专门建设后统一替换 | 不提前补建完整菜单或定位体系；占位不计作公共菜单完成 |

## 6. 值、提交与键盘设计合同

### 6.1 值至少分清三个概念

- **字段值**是用户已经选择的单个值或值集合；**搜索词**只用于筛选候选；**暂存值**只在明确带确认／取消的面板里存在。
- 普通表单中的“更新字段值”只更新表单草稿；是否提交服务端由整表保存决定。切换外观或关闭面板不得重置草稿。
- 远程搜索、换页、选项刷新时，当前候选列表不能作为已选值的完整名册。应保留已选对象的名称来源；缺少当前选项时不静默删除值。Classic 的当前选项过滤逻辑不照搬。
- 候选请求由外部处理；旧请求不得覆盖新关键词的结果或加载状态。加载期间保留已选值，失败与无结果分别显示。
- 清空整个选择与清空搜索词分开命名、分开动作。删除一个标签等于取消该项；限制选取数量时阻止新增，但仍能取消已有项。组标题不占用选项名额。

### 6.2 C 的场景保存方式

| 属性 | 场景提交方式 | 取消与失败 |
| --- | --- | --- |
| 课程名称 | 进入编辑后显式确认；Enter确认，Escape取消；点击外部取消未确认修改 | 恢复进入编辑时的值；保存失败保留输入供重试 |
| 分类、负责教师 | 选择一项即发起该属性保存 | 未提交选择前关闭不改值；保存失败保持编辑上下文并允许重试，不显示“已保存” |
| 适用教学班 | 面板内多选暂存，显式确认后保存 | 取消、Escape、点击外部均丢弃本次暂存；失败保留暂存以重试，展示值仍以已提交值为准 |

进入立即提交的多选配方后，Escape只关闭，已经发生的字段值变化不回滚；带确认／取消的场景才恢复本次暂存。参考 [Primer Select panel 的提交与取消指南](https://primer.style/product/components/select-panel/guidelines/)，必须由配方明确两者，不能根据弹层外形猜测。上表随本稿确认为 C 示例的设计合同，不改变所有 Select 的默认提交方式，也不代表已接入业务服务。

### 6.3 键盘与语义

普通单选可采用对应 Select／单选 Combobox 语义；多选采用合适的多选 Listbox 语义，不能机械复制单选 Combobox 后仅改变返回值类型。APG 的 [Combobox 模式](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)描述单选，多个选中值需结合具体交互与 [Listbox 模式](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)处理。

| 操作 | 设计合同 |
| --- | --- |
| Tab | 进入字段或其必要动作；正常离开时不被困在候选区 |
| Enter／Space／方向键打开 | 按触发器语义执行；已选项优先作为初始活动项，否则首个可用项 |
| 方向键／Home／End | 移动列表中的活动位置；跳过禁用项；不默认等于提交选择 |
| 单选确认 | 提交当前可用项，关闭并把焦点返回触发器 |
| 多选切换 | 切换当前可用项，保留面板；搜索输入中的Space仍输入空格 |
| Escape | 关闭当前层；是否丢弃暂存由上节明确合同决定；焦点返回触发器 |
| 中文组字 Enter | 不确认选项、不提交表单、不触发搜索动作 |
| 清空／移除 | 独立、可命名的操作；完成后返回合理位置；隐藏动作不留在Tab顺序中 |

选项中的勾选图形是选中状态的视觉标记；若采用 Listbox，不再在每个 option 内嵌可独立聚焦的复选框或按钮。搜索输入、创建／重试或确认按钮放在列表外。名称、展开状态、控制关系、选中状态、无效状态和说明均需传递给辅助技术；角色组合最终随基础方案验证，不能只加 ARIA 属性宣称完成。

## 7. 验收矩阵与推进顺序

| 范围 | 最小验收内容 | 本轮状态 |
| --- | --- | --- |
| 已确认外观 | A1、A2、B、C与课程信息示意一致；B Hover、Active无四周框 | A1／A2／B已接入真实组件；C保留方向确认，未新增公共属性行 |
| 四套能力 | 普通／搜索 × 单／多选，同值不同外观可切换且不丢选择 | 公共实现及行为检查通过 |
| 状态交叉 | 空值、Hover、Focus、展开、ReadOnly、Disabled、Warning、Error、加载；校验与焦点隔离 | 单元与浏览器验证通过；设备和人工验收另列 |
| 几何 | 24／28／32／36；长中英文、清空与箭头并存、窄宽、固定摘要、标签换行 | 四档摘要、34／38px单行标签外框、箭头与触摸区域实测通过 |
| 数据与提交 | 搜索保留选择、结果乱序、失败、清空搜索／选择、暂存取消、外部更新 | 受控回归及页面异步／保存演示通过 |
| 键盘与辅助技术 | Tab、方向键、Enter、Space、Escape、IME、焦点返回、可访问名称和选中状态 | 键盘与合成IME通过；真实设备IME、读屏未实测 |
| Token 与主题 | Light／Dark、真实父面、必要边界、说明文字、图标资格、Forced Colors | 真实堆栈与内外边界已记录；颜色资格及对比度仍有pending-review发现 |
| 下拉占位 | 简单候选内容、基本键盘与关闭、焦点返回 | 私有内联候选区已实现；正式公共菜单层仍待后续建设 |
| 体系接入 | FormItem、选中项部件、受控Tailwind、Manifest | 候选Manifest与本地Registry已登记，未发布；真实组件Human Gate待确认 |

公共API方案见第8节，[实施计划](2026-09-09-select-implementation.md)列出文件、顺序和验证内容。中性线、警告／错误边线及提示文字的既有技术核验项已纳入计划；下拉区域继续简单占位。

## 8. 公共 API 与实现组织（2026-09-09）

本节承接视觉验收后的第一条“继续推进”形成API与计划；后续第二条“继续推进”已授权实现。以下API已落到公共源码，已验收的示意视觉基准保持有效。

### 8.1 一个默认入口，四套完整能力

推荐公开一个`Select`，由`multiple`与`searchable`组合普通单选、普通多选、搜索单选和搜索多选；`appearance`独立选择`outlined / filled / underlined`。不为四种组合分别维护组件，也不要求使用者先拼装触发器、列表和清空。C继续作为场景配方，保存、取消和业务对象展示由场景负责。

| 对照方案 | 本轮取舍 |
| --- | --- |
| 一个Select入口，单／多选和搜索分别配置 | 推荐。当前四种能力都是从有限候选中选值，共享相同视觉、值和清空规则 |
| Select与SearchSelect两个入口 | 当输入框本身可自由编辑、创建任意值成为独立需求时再区分；当前增加入口收益有限 |
| 公开Root／Trigger／Content等完整Compound API | 暂不采用。默认完整Recipe已经覆盖当前需求，菜单层尚在单独建设 |

API依据复核：

| 来源 | 保留或调整 |
| --- | --- |
| [Classic Select合同](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Select/select.contract.js) | 保留标量／数组、搜索词独立、上限只限制新增、单选关闭与多选保持展开；不照搬内部前缀、固定弹层宽度和旧标签默认布局 |
| [Ant Design Select](https://ant.design/components/select/) | 同一组件提供单／多选、搜索、受控展开和显示方式；其当前搜索配置已有自身版本演进，Rain不复制整份参数表或旧弃用接口 |
| [MUI Select](https://mui.com/material-ui/react-select/)与[Autocomplete](https://mui.com/material-ui/react-autocomplete/) | 两个入口体现能力边界；借鉴已选值与输入文字独立管理，Rain首轮仍是有限候选选择 |
| [shadcn Combobox的Popup方案](https://ui.shadcn.com/docs/components/base/combobox#popup) | 按钮触发、搜索置于候选区域内符合已确认方向；该参考不等于选定其底层依赖 |

### 8.2 最小公开类型

下面的类型用于`packages/ui/src/select/select.tsx`，是接口草案，不是已落地的源码。值沿用Classic的字符串／数字身份；对象展示资料与选中值分开。

```ts
// rain-select-api-draft
import type {
  AriaAttributes, FocusEventHandler, ForwardRefExoticComponent, RefAttributes,
} from "react";
import type { RainLocalRecipe } from "../recipes/local-recipe";

export type SelectValue = string | number;
export type SelectSize = 24 | 28 | 32 | 36;
export type SelectAppearance = "outlined" | "filled" | "underlined";
export type SelectStatus = "default" | "warning" | "error";
export type SelectPart =
  | "root" | "frame" | "value" | "clear-action" | "arrow"
  | "tag" | "tag-remove" | "popup" | "search" | "option";

export interface SelectOption {
  value: SelectValue;
  label: string;
  description?: string;
  group?: string;
  disabled?: boolean;
}

export interface SelectChangeDetails {
  reason: "select" | "deselect" | "remove" | "clear";
  option?: SelectOption;
  selectedOptions: readonly SelectOption[];
}

interface SelectBaseProps extends Pick<AriaAttributes,
  "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-invalid"> {
  options: readonly SelectOption[];
  selectedOptions?: readonly SelectOption[];
  appearance?: SelectAppearance;
  status?: SelectStatus;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  id?: string;
  placeholder?: string;
  clearable?: boolean;
  clearLabel?: string;
  searchable?: boolean;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchValueChange?: (query: string) => void;
  filterOption?: false | ((query: string, option: SelectOption) => boolean);
  searchPlaceholder?: string;
  loading?: boolean;
  loadError?: string;
  onRetry?: () => void;
  emptyText?: string;
  noResultsText?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  className?: string;
  localRecipe?: RainLocalRecipe<SelectPart, "ui-select">;
}

type SelectSingleProps = {
  multiple?: false;
  value?: SelectValue | null;
  defaultValue?: SelectValue | null;
  onValueChange?: (value: SelectValue | null, details: SelectChangeDetails) => void;
  size?: SelectSize;
  display?: never;
  maxCount?: never;
};

type SelectMultipleProps = {
  multiple: true;
  value?: readonly SelectValue[];
  defaultValue?: readonly SelectValue[];
  onValueChange?: (value: readonly SelectValue[], details: SelectChangeDetails) => void;
  maxCount?: number;
} & (
  | { display?: "summary" | "count"; size?: SelectSize }
  | { display: "tags"; size?: 32 | 36 }
);

export type SelectProps = SelectBaseProps & (SelectSingleProps | SelectMultipleProps);
export interface SelectHandle { focus(options?: FocusOptions): void }
export declare const Select: ForwardRefExoticComponent<SelectProps & RefAttributes<SelectHandle>>;
```

实际实现时，`SelectSize`从Foundations的组件尺寸合同导出，`SelectAppearance / SelectStatus`引用Input与Select共用的字段类型；不长期保留重复枚举。`className`只管理外层布局，局部视觉改变使用现有`RainLocalRecipe`及已登记Parts。首轮不公开任意颜色、`style`、DOM角色覆盖、自定义触发器或通用Popup适配器。

### 8.3 默认值和事件合同

| 项目 | 本轮建议 |
| --- | --- |
| 普通使用 | 默认单选、不可搜索、`appearance="outlined"`、`clearable=true`；多选默认`display="summary"` |
| Size与Density | 摘要／数量布局未指定Size时，compact为24、default为32；查询场景显式28；搜索能力本身不改变高度。标签换行是另一套完整尺寸配方，默认32，显式可选36；24／28与tags组合报错，不静默换布局 |
| 空值 | 单选`null`，多选`[]`；`undefined`仅表示非受控。`0`与空字符串均可作为真实选项值，不用真假判断判断有值 |
| 受控边界 | `value / searchValue / open`分别独立受控。各自`default*`仅初始化；同一轴不要同时传入受控值和默认值，不在运行中切换控制方式 |
| 值更新 | 用户造成实际变化时仅调用一次`onValueChange`；普通单选选中当前项只关闭，不重复通知。数组不原地修改，取消后再选排到已选顺序末尾 |
| 搜索 | 默认对`label + description`做去首尾空格、忽略大小写的包含匹配；保留原始查询文字供自定义过滤。`filterOption=false`时直接展示外部结果，不二次过滤 |
| 分组 | `group`只表示一层分组；组按首次出现顺序排列，组内保留候选顺序，未分组项归入无标题组。组标题不可选择，过滤后无候选的组不显示 |
| 查询清理 | 关闭后清空本次查询；多选切换一项保持查询，便于连续选取同组结果。清空整个字段不清空查询；菜单搜索清空只改变查询 |
| 中文输入法 | 组字中仅维护输入草稿，不筛选、不通知远程查询、不以Enter确认；组字结束后提交一次查询。保留`isComposing / keyCode=229`保护 |
| 加载与失败 | 候选区域按Loading→加载失败→空／无结果→列表呈现。Loading隐藏旧候选，保留已选值、清空和搜索；`loadError`不把字段本身变成Error，`onRetry`只发出重试意图 |
| 文案 | 默认placeholder为“请选择”，搜索提示为“搜索选项”，空列表为“暂无选项”，搜索无匹配为“没有匹配结果”；需要时分别覆盖 |
| 选取上限 | `maxCount`为有限非负整数。达到上限阻止新增，仍能取消、移除、清空；回填超过上限或运行时下调上限不截断已有值 |
| 禁用单项 | 禁止通过候选行新增或切换该项；不承担“锁定已有值”职责，标签移除与整体清空仍可清理已有值。锁定指定已选项另有需求再增加 |
| 只读／禁用 | 两者都不打开、清空或移除；只读保留值阅读、文本选择与键盘位置提示，禁用排除操作。运行时转为只读／禁用关闭已开区域，受控父级收到一次关闭请求 |
| 聚焦事件 | `onFocus / onBlur`表示进入／离开整个字段及其候选区域；从触发器移入内部搜索或选项不触发外部失焦校验 |
| 表单责任 | `FormItem`负责名称、说明、required与status关联；场景从value保存数据并运行校验。首轮不增加隐藏原生字段、FormData适配或自动原生required校验 |

选项要求有效的字符串或有限数字value、非空label，且同一候选集合内身份唯一。`1`与`"1"`是不同身份，不做字符串化比较；多选值保持唯一。非法选项、模式与值类型不匹配、非法Size／maxCount应明确报错，不悄悄删除或转换业务值。

### 8.4 远程结果与已选资料

`options`表示当前候选，`selectedOptions`补充已选值的名称与描述。显示资料按`selectedOptions`→`options`合并，当前候选中同身份的最新资料优先；只沿value顺序展示已选内容。查询换页、Loading或失败不会把value裁剪到options的交集。

`onValueChange`的`details.selectedOptions`返回本次值中已有真实资料的条目，便于调用方保存当前选择及其显示资料；缺失资料的值仍保留在value，暂显示其原始标识，不伪造业务名称。初始远程回填应一并提供`selectedOptions`。组件不保存全部搜索历史，也不请求单个缺失对象。

```tsx
// 在FormItem内使用；普通单选仅需 <Select options={courses} />。
const [value, setValue] = useState<readonly SelectValue[]>([]);
const [selected, setSelected] = useState<readonly SelectOption[]>([]);

<FormItem label="适用教学班">
  <Select
    multiple searchable options={results} selectedOptions={selected}
    value={value} searchValue={query} onSearchValueChange={setQuery}
    filterOption={false} loading={loading} loadError={loadError}
    onValueChange={(next, details) => {
      setValue(next);
      setSelected(details.selectedOptions);
    }}
  />
</FormItem>
```

请求、防抖、取消、响应顺序和保存失败留在场景。示例需覆盖“查询A后立即查询B，A晚返回”的情况；旧响应不能覆盖B的结果、Loading或Error。C的带确认多选额外持有场景draft，确认才保存；不向公共Select添加服务端提交或通用暂存模式。

### 8.5 共享外观、FormItem与简单占位

| 位置 | 实现责任 |
| --- | --- |
| 共享字段外观 | 从现有Input配方抽出`fieldFrameRecipe`，供Input和Select真实消费；完整维护三种外观、权限、状态、尺寸与焦点。两份组件不分别维护颜色矩阵 |
| Input | 增加`appearance`入口并接入已验收留白、状态色和B底线；原生编辑、字数、附加内容、单位及现有事件保持各自合同 |
| Select | 持有值、查询、展开与已选显示；三种外观共用同一选择逻辑。清空用circle-close-filled，开闭用arrow-down／arrow-up，标签移除用close |
| FormItem | 复用现有context、ID与说明协议，扩展支持一个Select；外层status权威、disabled／required叠加，Select不再生成另一套FormItem |
| 内部搜索Input | 复用普通Input，不用触发页面查询的SearchInput。仅内部导出已有FormItemContext并在搜索区域提供null，避免继承外层status、required和id；不新增公共Provider或修改全局Context规则 |
| 私有候选区域 | 在Select文件内集中为一个`SelectOptionsPanel`；先按已验收示意内联展开，用原生按钮、Input和有名称的列表。以后统一菜单层仅替换这个区域，不预建Popup服务、Portal或定位框架 |
| 选中项 | 优先检查届时Tag及其Local Recipe是否能精确承接14／22排版、24／28高度、Alpha/4、close与24px动作区；否则暂用Select私有部件。两者只选择一个运行实现 |

共享只覆盖确实相同的字段外观；Input编辑逻辑、Select选择逻辑与Tag公共家族分别保留。Focus只在Input／Select字段范围内按已验收方案落地，不全局替换其他组件的焦点规则。

占位阶段采用展开按钮＋受控显示的候选区域，不把内联内容误标为modal。列表按[Listbox模式](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)区分活动位置与已选值；搜索在列表外，option内部没有可单独聚焦的复选框或按钮。方向键／Home／End只移动活动位置，Enter／Space确认或切换；搜索框的Space仍是文字，ArrowDown转入列表。Escape关闭并回到触发器，Tab正常离开；外部点击关闭时不抢回用户点击目标的焦点。只读和空／全禁用候选也须有可理解的位置与说明。无需等待正式菜单的遮挡回避、复杂定位、嵌套或虚拟滚动完成。

首轮不加入自由创建、树／级联、全量远程缓存、万能业务对象比较器或所有C属性行组件。需要内容属性编辑时先组合已完成字段与场景状态，特定头像、chip等展示按Existing Variant→Local Recipe→Local Fork处理。

### 8.6 本节检查与下一步

计划阶段已通过独立于公共源码的TypeScript核对：四种能力、标签尺寸及四类错误组合拒绝。实施后，公共源码、FormItem、真实说明页、单元与浏览器验证及独立技术复审已落地，见[验证记录](../../evidence/runtime/select/verification.md)；读屏、真实设备IME、正式菜单替换和Human Gate仍分别保留。

本次实读Tag第一批源码后采用私有`SelectedValue`：现有Tag的文字排版、圆角、关闭动作和点击区与已验收选中项不同，直接复用需覆盖其多处几何。Select仅同源引用Tag的24／28px高度事实，保留自己的14／22排版、4px圆角及24px移除区域；没有修改Tag或保留两条运行分支。

## 状态与尺寸可视对照（2026-09-08）

本轮[状态与尺寸示意](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/field-state-size-study.html)现包含状态、尺寸与多选两个视图；状态页支持同时显示聚焦外观，设计选项支持四档尺寸及长名称。与之前的课程信息示意分开保留；最新图标、留白与状态映射以本轮示意为准，旧课程示意保留为外观方向记录。

| 视图 | 已完成的对照 | 仍待确认或验证 |
| --- | --- | --- |
| 状态 | A1／A2／B并排显示 Input 与选择字段；普通、空值、只读、禁用、警告、错误、警告＋只读、错误＋只读、错误＋禁用；可对照聚焦外观 | 示意视觉验收通过；颜色用途与对比度技术核验项继续保留 |
| 尺寸与多选 | 四档固定摘要；32／36px标签换行；各实例同步已选项，支持移除、清空、长名称和窄容器 | 几何实物视觉验收通过；选中项公共配方与正式Tag接入未完成 |

占位选择区域使用触发按钮、原生单选／复选候选组及搜索输入，不建设正式菜单层或复杂定位。搜索保留已选项，单选后收起，多选保持打开，Escape与收起返回触发器；清空选择与清空搜索分开。菜单的实际开闭统一更新可见箭头、aria-expanded与触发器展开态，鼠标、键盘、选择后收起及外部关闭采用同一更新路径。菜单内搜索输入具有独立的普通状态与焦点色，不继承选择器本身的Warning／Error。鼠标移出后默认隐藏清空图形，保留位置；Hover、字段焦点或展开时显示，有值的触屏场景直接可用。

2026-09-09 已将所有示意图形换为图库中可用的正式源资产：清空用 [circle-close-filled](../../packages/ui/src/icons/circle-close-filled.tsx)，未展开用 [arrow-down](../../packages/ui/src/icons/arrow-down.tsx)，已展开用 [arrow-up](../../packages/ui/src/icons/arrow-up.tsx)，标签移除用 [close](../../packages/ui/src/icons/close.tsx)。内联示意按图库相同的宿主色SVG mask方式嵌入原始资源，内容与源文件逐字节核对一致；没有重绘或替换为同名外部图形。颜色仍按现有登记值的本地快照显示，没有新增公共 Token、消费公共组件或改写现有 Input／Tag。选中项的24／28px高度与可移除结构仍是局部几何示意，不视为现有 Tag 已完成适配。

选中项底色修订：原示意的Fill/Neutral/Solid/5在A2 Hover时与外框同色、在聚焦底色上也过于接近，按用户要求曾改为较深的Fill/Neutral/Alpha/3。用户继续审阅后指出底色偏重、应略浅，现改用现有Fill/Neutral/Alpha/4（Light `rgb(80 117 254 / 12%)`，Dark `rgb(86 106 181 / 15%)`），用于三种外观的32／36px档标签。移除图标保持Icon/Neutral/2，文字与图标不随填充透明度改变。此调整不改写公共Token值；B Hover的映射见5.2。

最新三项反馈已通过浏览器复核：24px档展开／收起箭头均为12px，其他档14px；标签底色与Alpha/4明暗值一致；三种外观在736／360px下均保留边框内上下各4px留白，摘要高度和标签自身高度不变。原有状态、选择、键盘、窄屏、触屏及Forced Colors检查继续通过。实物依据：[标签浅底与上下留白](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/field-feedback-tag-spacing-light-736.png)、[深色窄屏](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/field-feedback-tag-spacing-dark-360.png)。检查继续仅限讨论示意。

浏览器检查通过：三种外观、9组状态与聚焦组合、Light／Dark、736／360px视口、320px最小宽度；四档摘要、32／36px标签、长名称、同步选择、筛选保留已选项、清空保留校验提示、移除、关闭和焦点返回。另检查组字标记下不误打开面板，以及系统高对比模式的A1／A2两像素轮廓和B两像素底线；触屏操作区至少44px。尺寸标签表示桌面档位，触屏示意会放大操作区。真实中文输入法与读屏仍须在正式实现时验证。

本轮根据实际事件顺序修正了下拉内部焦点切换时提前收起的问题，并修正高对比模式被外观规则覆盖的线宽。检查仅针对该讨论示意；用户已完成示意视觉验收，公共Select验证、独立技术审阅与公共组件Human Gate尚未执行。

补充计算均仍假设父面为不透明 Fill/Neutral/Solid/7：当前 B Hover 的正文对比度为 Light 14.39／Dark 16.56，底线为1.87／2.54；普通只读聚焦中性线为1.90／2.50。示意使用的 Text/Orange/1 警告说明在 Light 的对比度仅3.75，Dark为8.02；中性线、浅色警告文字及已登记的深色错误边线问题继续保留，不通过扩大字号、借用别的类别或赋予例外掩盖。

六项反馈的浏览器复核通过：Warning／Error及各自只读组合的真实聚焦颜色、清空及其他图标的源资产一致性、B Hover使用Fill/Neutral/Alpha/6、只读普通聚焦使用Border/Neutral/1、四档8／12／12／12px留白，均覆盖Light／Dark与736／360px；原有行为、窄屏及Forced Colors检查仍通过。这表示六项局部修订按指定方案呈现，不代表上述可辨认度缺口已关闭。

追加四项反馈也已复核：常规14px箭头、arrow-down／arrow-up与菜单和aria-expanded同步、Warning／Error外层选择器内搜索控件保持普通焦点色与中性填充、各类空值提示使用Text/Neutral/4。覆盖三种外观、Light／Dark、736／360px，打开、Escape、单选完成、持续多选、外部关闭和标签布局。保留一份可运行的示意检查，中文组字不会误打开面板。实物依据：[异常选择器与普通搜索框](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/field-feedback-menu-outlined-light-736.png)、[调浅后的空值提示](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/field-feedback-placeholder-light-736.png)。

截图依据：[警告聚焦与正式图标](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/field-feedback-warning-focus-light-736.png)、[错误聚焦](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/field-feedback-error-focus-dark-736.png)、[只读中性线](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/field-feedback-readonly-light-736.png)、[现有Token的Hover](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/field-feedback-hover-light-736.png)、[多选几何](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/field-review-geometry-light-736.png)、[窄屏长名称](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/field-review-long-names-dark-360.png)。

## 依据与本轮检查记录

实现事实来自 [Input 配方](../../packages/ui/src/input/input.styles.ts)、[Input 专属尺寸](../../packages/foundations/src/input-token-contract.ts)、[FormItem](../../packages/ui/src/input/form-item.tsx)、[Tag](../../packages/ui/src/tag/tag.tsx)、[Tag 当前样式](../../packages/ui/src/styles.css)、[Focus](../../packages/foundations/src/focus.css)、[Token 选择合同](../ai/token-selection.md)、[Color Registry](../../packages/foundations/src/color-registry.ts)及 [Size／Density ADR](../adr/0003-size-and-density-responsibilities.md)。Classic 参考为[选择合同](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Select/select.contract.js)、[值处理](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Select/select.utils.js)及[样式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Select/select.scss)，仅作只读依据。

本轮机器可读的[配对计算结果](/Users/wenchengkai/.codex/visualizations/2026/09/08/01a080d3-bacb-71e1-8bca-4c7871704be4/field-recipe-token-audit.json)保留精确值与假设。执行范围是资料、计算与文档核对，没有运行公共 Select 验收，也没有授予颜色例外、关闭 Input 发现、修改公共 Focus 或推进组件 Human Gate。
