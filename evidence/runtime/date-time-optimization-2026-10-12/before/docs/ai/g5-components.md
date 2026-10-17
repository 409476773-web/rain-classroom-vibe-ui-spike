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

DatePicker 使用展示式入口，不解析自由输入。单日值为 `Date | null`；区间值为完整 `DateRange { from: Date; to: Date } | null`；`mode="range"` 与 `showTime` 可组合。打开复制公开值到草稿；选择、时分和清空只改变草稿，全部点击“确定”后提交。取消、Escape、外点丢弃草稿；取消/确定/Escape恢复入口焦点，外点保留外部焦点。区间第一点开始、第二点结束，完整后重新开始；逆序归正，同日允许。宽屏连续双月、窄屏单月，调整宽度保留草稿。

时分使用现有 InputNumber 与 step，小时 0–23、分钟 0–59、整数；新选择默认 00:00，既有值保留时分，摘要补零。无时间 minDate/maxDate 按本地日比较；带时间按分钟比较。未完成、无效日期或时分、越界、跨禁用日、完整日期时间逆序均阻止确认并就近说明。秒、复杂时区、排班和独立 disabledTimes 未纳入首版。

组件的默认尺寸继续跟随区域 Density；页面代表例明确使用 36px 单行字段，长文本保持 Reading/Small。单个局部外观调整与未修改兄弟实例并列显示。新浮层局部 opacity/scale 过渡采用 180ms Overlay，减少动态效果关闭；既有共享 Popover/Select/Button 不因本轮全局改变。

按本轮六条浏览器反馈：DatePicker 取消使用三级按钮，正常草稿移除常驻确认提示，校验信息按需显示；Dialog / Sheet 示例的完成按钮使用一级按钮。Combobox 的重试文字按钮带 refresh 前置图标，操作后恢复输入焦点。这些调整不授予整组 G5 视觉接受。

作业发布设置在 `#field`，教学数据筛选在 `#date-picker`。两者都是页面本地状态的可操作样板；保存结果仅表示本地演示更新。每页有 API、使用说明、来源和可复制代码。检索可运行 `node scripts/asset-index.mjs --find 日期` 或 `--find Combobox`，只读取命中合同和源码闭包。

固定来源、MIT、引擎版本与差异见[来源锁](../../evidence/runtime/g5-components-2026-10-12/source-lock.json)。[Registry](../../registry/g5-assets.json) 登记五个新增资产及依赖；Textarea 扩展沿[原登记](../../registry/textarea.json)，不复制 Label/Field 为同义资产。[本轮验证](../../evidence/runtime/g5-components-2026-10-12/verification.md) 区分自动验证、独立审阅、人工视觉、对比度、发布和生产采用。
