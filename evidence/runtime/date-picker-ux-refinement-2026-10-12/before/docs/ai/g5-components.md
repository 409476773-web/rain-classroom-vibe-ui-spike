# G5：字段、输入选择与日期

当前本地候选按用途使用以下入口。Label、Field 与 Input Group 是已有能力的收口；独立新增资产为 NativeSelect、Combobox、Slider、Calendar、DatePicker 共五项。公共入口 `@rain-next/ui`，区域布局沿 `@rain-next/layouts`。

| 任务 | 使用能力与页面 | 合同 |
| --- | --- | --- |
| 标签关联、必填说明 | `FormItem` 与勾选控件自有标签；`#label` | [FormItem](../../manifests/ui/form-item.yaml) |
| 单字段标签、帮助、校验反馈 | `FormItem`，用 Stack/Inline/Grid 组织；`#field` | [FormItem](../../manifests/ui/form-item.yaml) |
| 行内附加信息、多行上下操作 | Input/SearchInput/InputNumber；Textarea `blockStart` / `blockEnd`；`#input-group` | [Input Group 组合合同](../../manifests/recipes/input-group.yaml)、[Textarea](../../manifests/ui/textarea.yaml) |
| 简单原生单选与表单 | `NativeSelect`；`#native-select` | [NativeSelect](../../manifests/ui/native-select.yaml) |
| 输入候选并明确选择 | `Combobox`；`#combobox` | [Combobox](../../manifests/ui/combobox.yaml) |
| 连续数值或范围调整 | `Slider`；`#slider` | [Slider](../../manifests/ui/slider.yaml) |
| 页面内单日或区间选择 | `Calendar`；`#calendar` | [Calendar](../../manifests/ui/calendar.yaml) |
| 确认日期或日期区间，可带时分 | `DatePicker`；`#date-picker` | [DatePicker](../../manifests/ui/date-picker.yaml) |

首先使用完整组件，再选择已有 appearance/size，确需调整时用局部 Recipe。每个 FormItem 表示一个逻辑字段，宿主持有数据、校验和保存；不给多个独立字段共用一个标签身份。内部日期年月与时分输入自行关联独立标签，不继承外层字段 id。

FormItem 原合同保留其建设批次的来源和验收范围。InputNumber 与 G5 新控件的接入分别见各自合同和本轮验证；新增记录不扩展旧验收。Slider 使用顶部标签，Calendar 内部隔离字段身份。

Textarea 上下附加区共享现有外框与原生 textarea，保留 ref、rows、maxlength、name/form、readonly、resize。附加区按钮默认视为修改值；纯查看/复制动作显式设 `blockStartChangesValue={false}` 或 `blockEndChangesValue={false}` 后可在只读中操作，disabled 阻止所有动作。此版本不提供多个独立输入共框。

Input Group 是[现有控件的组合 Recipe](../../manifests/recipes/input-group.yaml)，按本地组合登记，不是第六个 G5 独立组件，也没有 `InputGroup` 公开导出。通过 `node scripts/asset-index.mjs --find Textarea`、`--find Input`、`--find SearchInput` 或 `--find InputNumber` 查询实际依赖，再按此使用地图选择插槽；组合 Recipe 不作为可安装资产出现在生成索引中。

NativeSelect 收起态沿已有 Field Recipe，展开态由设备系统提供。首版验证单选；原生 option/optgroup、value/defaultValue、onChange、required、name/form 保留。`onValueChange` 返回字符串。需要候选搜索或丰富说明时选 Select 或 Combobox。

Combobox 为单值，`options` 使用 SelectOption 的 value/label/group/description/disabled；值类型 `string | number | null`。值、查询、开关分别通过 `value`、`searchValue`、`open` 受控，另有对应 default 与 callback。`selectedOption` 可提供远端已选项元信息。默认只选择已有候选；启用 `allowCustomValue` 后点击“使用此输入”才接受新文本，回调 `details.reason` 区分 `select | custom | clear`。查询未选择、失焦和 IME Enter 不自动创建。宿主负责异步请求、保存新文本和回填标识；列表接收 loading/loadError/onRetry/emptyText。Base UI 持有唯一焦点与浮层生命周期，现有 Input、菜单和 PopupProvider 提供 Rain 部件。Base UI 1.8 外置输入会隐藏相邻动作，局部 InputGroup 的 `aria-live="off"` 保留可访问清空/展开按钮；实体辅助技术验证仍单独记录。

Slider 单值用 number，`range` 用只读 `[number, number]`，默认 0–100、step 1。`onValueChange` 连续变化，`onValueCommitted` 在操作结束回调；宿主的业务保存另行控制。两个端点碰撞不交换身份，提供 `thumbLabels`。旁边使用 InputNumber 精确输入。水平版本保持即时跟手，颜色与阴影使用现有 140ms 反馈，触控扩大命中区。

Calendar 基于 DayPicker 9.13.2：中文、周一、单日/区间、网格键盘与禁用状态；年月使用 Rain Select，翻月用 IconButton 与图标库 arrow-left / arrow-right 线性图标。版本匹配的标题与网格动画类和清理链保留，月份过渡采用现有 220ms Region 动效；减少动态效果关闭 animate。

DatePicker 保留展示式入口和按钮ref，在面板里支持严格 `YYYY-MM-DD` 日期输入。单日值为 `Date | null`；区间值为完整 `DateRange { from: Date; to: Date } | null`；`mode="range"` 与 `showTime` 可组合。打开复制公开值到唯一文本草稿，日历选区与候选值均由它派生；选择、时分、快捷项、时长和清空只改变草稿，全部点击“确定”后提交。取消、Escape、外点丢弃草稿；取消/确定/Escape恢复入口焦点，外点保留外部焦点；未变化不重复回调。外部受控值权威，转只读或禁用关闭并放弃草稿。

区间第一点开始、第二点结束，完整后重新开始；初次日期逆选按日归正。点击／聚焦开始或结束字段后，日历只改这一端并保留另一端及已有时分；冲突保留输入，不交换或自动平移。打开、整段清空、外部值重建时重置编辑意图；端点编辑后需要重新选整段，先清空。合法日期输入完成后定位月份；非法／未完成输入保留，手动翻月不被未变化的文本拉回。

私有 TimeField 使用两个 Input 文本草稿与现有 Select，小时0–23、分钟0–59；新选择默认00:00，既有值保留时分，合法失焦后补零。完整HH:mm粘贴分配两段，非法／空文本不钳制成合法数字；上下键调整当前有效段1，边界停止；输入Enter不提交面板或外层表单。IME组合期间保留文本，暂停解析、跳月与确认，结束后恢复。`timeStep` 默认15，可用5／30，仅影响常用时间列表；23:59与非步长合法值仍可输入。InputNumber的number/null及不补零合同保持原状，仍用于样板答题时长。

`presets` 按single/range分别使用 `DatePickerPreset<Date>`／`DatePickerPreset<DateRange>`，`getValue(now)`点击时重新计算，缺省不显示快捷区。`durationPresets` 仅range+showTime，宿主可提供30／60／90／120；空数组只保留自定义正整数分钟，未提供则隐藏整区。应用时以有效起点计算一次完整结束；之后改起点不暗移结束。`minDurationMinutes` 默认0保留旧通用同刻行为，教学窗口显式设置1；`maxDurationMinutes` 缺省不限。新数字配置须有限且合法，min不可大于max。只接受该模式适用配置。

同日时间段始终显示所属日期及长度；跨午夜显示完整结束日期与次日标识，跨多日显示真实日期。同日结束早于开始不会自动跨日，提供“结束日期改为次日”，以开始的下一个日历日计算，重复应用不累加天数。时段长度是实际时间差；不以固定24小时推进下一日历日，也不把日期型包含天数与分钟时长混用。

无时间 minDate/maxDate 按本地日比较；带时间保留现有分钟比较。默认 `excludeDisabled=true` 整段不能跨禁用日；false只限制端点。未完成、无效／不存在的本地日期时间、越界、逆序、超时长均阻止确认；正常步骤用中性提示，错误关联具体输入。当前时间限制由宿主刷新props，本地新建样板使用最新now之后首个完整分钟，并在保存时再精确校验；不能把静态minDate当实时钟。截止>保存当刻，定时开放≥保存当刻且截止>开放；进行中／已发布任务另定规则。秒、复杂时区、排班和独立disabledTimes未纳入本轮。

桌面范围560px／单日320px基线，窄屏单月，受视口约束；内容可滚动，操作持续可达。主要指针为粗指针时打开bottom Sheet，打开期间固定外壳，内部重排保留草稿；首轮触屏单月，主要目标至少44px，沿已有Sheet安全区。只挂一份面板，不把日期局部高度或命中区升级为全库默认。键盘打开优先可用已选日，无可选日聚焦标题；当前值通过触发器描述获得；年月／时间子Select先处理自己的Esc。反馈140ms、浮层180ms、翻月220ms；Sheet局部缺项220ms，减少动态效果即时呈现。

组件的默认尺寸继续跟随区域 Density；页面代表例明确使用 36px 单行字段，长文本保持 Reading/Small。单个局部外观调整与未修改兄弟实例并列显示。新浮层局部 opacity/scale 过渡采用 180ms Overlay，减少动态效果关闭；既有共享 Popover/Select/Button 不因本轮全局改变。

按本轮六条浏览器反馈：DatePicker 取消使用三级按钮，正常草稿移除常驻确认提示，校验信息按需显示；Dialog / Sheet 示例的完成按钮使用一级按钮。Combobox 的重试文字按钮带 refresh 前置图标，操作后恢复输入焦点。这些调整不授予整组 G5 视觉接受。

作业发布设置在 `#field` 和 `#date-picker` 的 `date-time-homework`；后者另有 `date-time-exam`、`date-time-cross-day`，提供考试窗口／独立答题分钟／入场模拟以及同日／跨午夜／跨月的可操作样板。保存结果仅表示当前页面内存更新，刷新后不保留。样板如实显示本机时区，只有真实Asia/Shanghai才标北京时间；不冒充固定学校时区转换。考试“关闭时统一结束”是明确本地演示策略，生产关闭、入场、宽限和已发布修改规则须另定。教学数据筛选仍在 `#date-picker`，保持确认合同。每页有API、使用说明、来源和可复制代码。检索可运行 `node scripts/asset-index.mjs --find 截止`、`--find 跨日` 或 `--find Combobox`，只读取命中合同和源码闭包。

日期后继改造的设计方法为V05、D01、D02、D05、I01：围绕一次设置任务组织端点、网格、摘要与确认；明确窗口、时刻与答题时长的不同语义；窄屏及触屏按实际空间重排。检查真实整页、非法输入、范围预览、主题／密度、滚动与连续操作。方法应用范围为本轮日期候选，视觉与辅助技术接受不由自动结果推导。

固定来源、MIT、引擎版本与差异见[来源锁](../../evidence/runtime/g5-components-2026-10-12/source-lock.json)。[Registry](../../registry/g5-assets.json) 登记五个新增资产及依赖；Textarea 扩展沿[原登记](../../registry/textarea.json)，不复制 Label/Field 为同义资产。[本轮验证](../../evidence/runtime/g5-components-2026-10-12/verification.md) 区分自动验证、独立审阅、人工视觉、对比度、发布和生产采用。

日期后继的本地实现、私有解析逻辑及新状态不重新冒称上游来源；[新验证记录](../../evidence/runtime/date-time-optimization-2026-10-12/verification.md)与新source-bindings衔接旧前态。旧G5的截图、来源锁、颜色账本和HumanGate冻结；本轮人工视觉验收待用户实际操作后按精确范围记录。
