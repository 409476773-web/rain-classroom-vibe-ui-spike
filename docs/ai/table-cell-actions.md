# Table：直接编辑、行首操作与轻量浮层

本合同来自2026-10-23用户逐轮审核的 `cell-action-review.html`，随后明确授权提炼并接入组件库和 Playground。适用于高频阅读、按字段直接修改的表格。当前已进入共享源码；沿用 Table 家族候选身份，未发布，整项 V2 与真实业务接入的 Gate 独立。

## 选择组合

- 独立字段点击内容直接编辑；需要一起修改的完整记录使用独立编辑入口。不要求所有表格先进入全局编辑模式。
- `Table interaction="cell"` + `TableActionCell` 启用本套单元格视觉；已有只读记录表和连续录入、范围选区等模式保持各自合同。
- 从 `@rain-next/ui` 导入单元格部件；从 `patterns/table/index.ts` 导入 `TableCellPopover`、`TablePreviewDrawer`、已有选择条与保存条。
- Playground 唯一入口为 `#table`，本套交互位于 `#table`。业务示例原生运行；交互示例嵌入现有资料表页面。

## 阅读、激活与编辑

| 状态 | 视觉与行为 |
|---|---|
| 默认 | 保持内容与表头的对齐；居中/左/右对齐由内容角色决定；垂直居中。行结构槽保留稳定阅读轴。 |
| Hover | 仅当前格使用 Fill/Neutral/Alpha/6 半透明填充；出现该格可用的动作。行首行操作组随行悬停显现。 |
| 激活 | 单元格有品牌蓝边界；为右侧按钮让位，左侧阅读起点固定；空白点击只激活。 |
| 编辑 | 单元格承接边界；`TableInlineInput` 不再画内部框和蓝色光晕。原生输入事件和中文输入过程保留。 |
| 校验错误 | 保留当前草稿、错误边界及说明；错误修正或取消前不能绕过校验切换。业务校验与聚焦由宿主处理。 |
| 只读 | `TableReadonlyMark reason` 提供统一浅色锁；归档等例外可通过 persistentActions 常显。整列统一只读可以仅hover/激活显示。 |
| 空值 | 直接留白；不加“待录入”等占位文案。可写空格通过操作按钮或键盘进入编辑。 |

宿主提供稳定记录/字段 ID 和受控编辑缓冲。通常 Enter 确认、Esc 取消、有效输入在失焦/切换前提交；组合输入期间不提交。无内框不是去除焦点：外层活动格必须持续提供可见边界，错误说明通过 `aria-describedby` 关联。标准表单 Input / Textarea 不应用这套去框样式。

## 操作与选择

首格的 `TableRowActions` 有三个有序槽：**selection → move → add**。选择框只出现于行首，不新增独立选择列，也不在其他格重复。右侧 `actions` 只作用于当前字段；多选不会将这些按钮暗中升级为批量操作。

**只有勾选框改变行选择。** 行/单元格空白、正文、展开、移动、新增和字段动作均不选行；原生聚焦Checkbox仍能用Space切换。不要给行绑定选择回调，或把通用单元格Space映射为选行。

本轮确认的业务组合：父子默认独立选择；折叠保留选择；表头全选当前页可选记录，包括折叠后未显示的子行；有隐藏选择时批量条明确数量。过滤、跨页、权限不由UI猜测；宿主传入自己的可选集合。字段归档不自动使整行不可选。选择本身不使业务数据变脏，取消选择不撤销编辑。

行首新增菜单只包含新增同级/子级；顺序调整放在移动入口，快捷键或拖动由宿主连接。已选行保留操作组，触屏显露动作；可见Tooltip使用2–4字，快捷键、对象名称与完整原因留在无障碍名称。

## 视觉度量

| 对象 | 规范 |
|---|---|
| 行首与字段按钮 | 18×18px画布、12×12px图标、4px圆角、4px间隔；Background/Neutral/3不透明底，hover Neutral/4；图标Neutral/3。 |
| 勾选 | 18px画布、14px框体、10px勾；未选Border/Neutral/2，比通用Checkbox浅；选中/半选保留原组件品牌色。 |
| 展开 | 正常无底色，hover才显浅底；展开向下，收起向右。 |
| 边线 | 表头、正文、外框同用1px Border/Neutral/3；激活边界独立。 |
| 选择 | 整行 Fill/Brand/Alpha/4；被选行hover保留选择底色，不再叠加使其变暗。 |
| 表头 | 延续13/18/400、小轻浅；不加入装饰编辑图标或“只读”标签。排序/筛选等真实列能力仍沿既有合同。 |

`TableActionCell` 的 `leadingSpace` 与 `TableActionHeader` 共用。三动作＋展开槽的评审实例为94px，`depth` 每级16px，但这是布局组合，不是全部表格的固定左内距；不自动从parentId推断视觉深度。既有分组/树/透视的父叶同轴规则仍按各自已确认组合计算。

`align="start|center|end"` 控制内容角色对齐；`actionCount` 是可见字段操作数量，按钮未显现时不侵占右侧空间；出现时为其留位。示例密度接入DensityProvider：常规表头44px/单行50px、紧凑32px/44px。大内容行高由宿主按既有密度与内容行数配置，不固化单页的高度值。

## 内容部件

| 部件 | 合同 |
|---|---|
| TablePersonValue | name/src，24px头像在姓名左侧；它只展示值，不内置人员来源。菜单选项配同一资源、24px头像；姓名和箭头可作为同一菜单的独立Trigger，禁止嵌套button。 |
| TableImageValue | images/onPreview，单图32px缩略图，多图前两张＋剩余数；数量入口定位第三张。图片列只传图片。 |
| TableFileValue | files/onPreview/onManage，16px固有格式图标、首文件＋独立22px高数量胶囊；文件名stem省略、扩展名保留；数量打开所属集合管理。 |
| TableFileName | 格式图标与可截断名称Parts，未知格式用generic；不重画或重涂格式图标。 |
| TableDataValue | value/unit/emphasized，只有关键数值显式emphasized才使用Data字体与700字重；中文单位始终UI字体、12px常规字重、Text/Neutral/6。 |

图片与附件始终分列、分集合。附件列可以包含多种文件格式。空集合不输出占位。资源地址与授权、错误/资源有效性、上传限制、服务端删除与Office预览等由宿主提供。

## 短任务气泡与右侧抽屉

`TableCellPopover` 组合已有非模态Popover，默认360px，集合管理示例420px；响应式碰撞由组件库处理。接受open/title/description/anchor/children/footer/initialFocus/finalFocus，关闭原因通过onOpenChange上交。当前说明示例外点完成、Esc取消、完成使用一级按钮；这不是所有气泡的自动保存策略。

`TablePreviewDrawer` 接受一个字段的items、selectedId、collection（images/files）、description、onSelect/onClose/finalFocus。桌面右侧560px并按剩余空间约束，无遮罩，允许背后继续操作；窄屏全宽并约束焦点。使用rain-shadow-overlay区分层级，前后导航只在当前集合内。

气泡打开预览前先关闭；移除附件前先把焦点移到相邻项或添加入口；关闭回到所属格；跨格操作时不把焦点强行拉回。图片失败和不支持格式提供下载回退。PDF借用浏览器预览；真实PDF服务与辅助技术仍需宿主验证。

## 来源与修改边界

设计来源：用户Figma `3060:21241` 草稿及本会话逐轮修订（飞书参考仅作为交互思路）。保留Rain冷色文字、浅中性色、品牌激活、标准组件菜单和焦点。未继承大面积编辑模态框、表头装饰图标、内部双蓝框或点击行空白选行。

规则、API、来源和文件清单登记于既有 `ui-table` Manifest 与 Registry。气泡和预览抽屉的组合示例位于 Playground 的 Table Pattern 源码中。本次不修改全局Token、不复制业务引擎，也不将课堂任务、模拟上传/保存作为公共默认。旧来源锁与已接受历史范围保留，最新源码哈希单独记录。
