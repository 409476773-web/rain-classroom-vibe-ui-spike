# G5 建设实施计划

用户 2026-10-12 明确授权：开始执行已讨论确认的计划。工作模式 System Mode；工作区 `.worktrees/card-v2` / `codex/card-v2`；已有未提交成果保留。基线与固定来源在 `evidence/runtime/g5-components-2026-10-12/`。

## 目标和来源

完成 Label、Field、Input Group、Native Select、Combobox、Slider、Calendar、Date Picker 八项能力的核对、补齐、独立文档入口与可操作样板。8项不等于8个新组件。

采用完整成熟源码的结构、配套样式、状态表达、键盘/焦点、操作反馈、过渡与进出场。保留已有Rain部件和Token绑定，只为明确差额适配。shadcn Base UI固定commit `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048`与同版Nova CSS；Base UI1.8.0；DayPicker9.13.2补直接依赖与Registry。Ant Design needConfirm作为确认交互参考，Mantine作为日期/时分/摘要布局参考。

## 八项及建设顺序

A：Label → Field → Input Group → Native Select。
- Label沿FormItem及Checkbox/Radio标签能力，整理入口/关联示例，不加同义包装。
- Field沿FormItem单字段合同与Stack/Inline/Grid，接入新控件，不建第二字段状态/排版体系。
- Input Group行内沿Input/SearchInput/InputNumber；Textarea增加blockStart/blockEnd上下附加区，共用外框，保留ref、原生rows、maxlength、form、resize与字段关联。装饰空白可聚焦，按钮动作遵disabled/readOnly；纯查看动作可显式声明不修改值。首版不含多个独立字段共框。
- NativeSelect沿固定来源原生select＋箭头结构，复用Rain field样式/标签/尺寸；children option/optgroup、value/defaultValue、name/form/required、onChange/onValueChange保留原生语义。

B：Combobox → Slider。
- Combobox单值，选项/过滤/分组/状态/菜单行与现有Select共享，实际输入复用Input，浮层视觉桥已有；BaseUI Combobox控制唯一交互生命周期，不再套第二Popover。
- value/query/open各自受控或非受控；查询API沿Select的searchValue/defaultSearchValue/onSearchValueChange。默认已有项；allowCustomValue显示‘使用此输入’，明确选择才提交，自定义回调reason可区分；宿主保存回填。失焦不创建，未选查询丢弃，IME Enter不误触发。清空、loading/error/retry/empty/disabled/readonly/远端元信息均有明确行为。
- Slider采用shadcn+BaseUI结构，水平单值number与双端readonly[number,number]，默认0–100、step1，碰撞none，不交换边界身份。连续变化/结束回调沿BaseUI；命中区足够，位置即时跟手；示例InputNumber精确输入。

C：Calendar → Date Picker。
- Calendar：DayPicker中文/周一，single/range；保留日期网格、键盘、禁用、年月导航、区间端点与连续中间色带；年月用既有Select、导航IconButton/图标。
- DatePicker：mode single|range、showTime，受控/非受控；value Date|null 或完整{from,to}|null。主入口展示式触发，不做自由日期解析。
- 区间宽屏连续双月，窄屏单月，切换保留草稿；起止时分宽屏并排/窄屏堆叠。
- 时分InputNumber0–23/0–59、precision0、step1；新时间00:00，既有保留，摘要补零09:05。
- 打开复制公开值到草稿；日期/时分/清空只改草稿。全部点击确定才提交，未变不重复；cancel/Escape/outside丢草稿。取消/确定/Escape返回入口focus，外点保留外部focus。
- 区间第一点开始/第二点结束/完整后重新开始；逆序归正，同日允许；不以min1冒充阶段。空必填、未完整区间、invalid date/time、边界、跨disabled day、完整datetime逆序阻止确认，就近提示。
- minDate/maxDate本地日期模式比较日；showTime比较分钟；disabledDates只定义日期禁用，无额外复杂disabledTimesAPI。
- 外层FormItem只关联入口，内部年月时分隔离context并独立标签/id。嵌套下拉关闭不误取消整Picker。

## 视觉与动效

输入沿已有Rain外观和尺寸；代表例以36px控件、14px正文、16px分区标题为主，不改变旧默认。每组都有default/局改/未改兄弟例；来源结构状态视觉与Rain对照记录。
- 已有按钮/图标按钮保留其现有动效时长。
- 新输入组/Slider状态颜色、border/focus采用既有相关Token约140ms；Slider位置立即更新。
- Combobox/DatePicker局部开闭opacity＋scale0.98→1，Rain overlay180ms/ease，使用BaseUIstarting/ending支持中断。现有共享Popover/Select无该效果，不全局补。
- Calendar显式采用DayPicker animate及匹配版本标题/网格CSS，Rainregion220ms；保留动画类、ref、清理链及引擎键盘skip。reduce关闭animate和不必要transition。

## 交付和验证

每批固定来源→适配→例子→交互/动效检查→自查后进入依赖项；全部完成仍需用户人审。
- 公共exports、styles、Manifest、Registry、AI入口、source locks、文档八入口同步；能力条目与独立资产数去重。
- 作业/考试设置表单与教学数据筛选区两组可操作样板；所有代码例可复制，操作有可见结果。
- 测试优先关键新行为RED/GREEN，不为文案和纯映射写无效测试；相关旧字段回归。
- unit/type/build，浏览器浅深/双密度/长文窄屏，标签/id/focus/nativeform/IME/specialvalue/custom/retry，Slider键盘/拖动，日期leap/crossmonth/year/reverse/sameday/disabled/time/clear/cancel/reopen/confirmonly；正常和reducedmotion及连续中断。
- 确认真实构建产物与独立源码消费，AI查询调用/局改实例；自动检查、人审、对比度、发布各记。
- 本轮不做秒、复杂时区、排班、多字段共框、完整表单系统、生产迁移、发布、Figma写入或Git提交。
