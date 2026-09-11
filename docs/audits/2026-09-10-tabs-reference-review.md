# Rain Next Tabs：旧版基线与成熟组件库对照

日期：2026-09-10；执行更新：2026-09-11。状态：来源审阅与设计决定已记录，用户随后授权“开始实施”，TB-00～TB-09 技术实现、自动验证与独立审阅已完成，见[实施计划](../plans/2026-09-10-tabs-implementation.md)。总阶段仍为 Token Foundations V1；本报告保留各轮来源、提案和确认顺序，历史讨论不能替代实际运行结果或 Human Gate。

建议以旧版 Line Tabs 为新版视觉和功能基线，补齐组合、面板生命周期、可靠溢出和无障碍关联。颜色、字体、Focus 与几何使用 Rain Next Token。

## 1. 当前约定

- [复用审计 Gate D](2026-09-01-rain-classic-reuse-audit.md)：Tabs 采用 rewrite-from-rain，先提供 compact/default 两档；更多菜单复用统一内部弹出能力，Tabs 保留标签、选择和溢出语义。
- [Size / Density ADR](../adr/0003-size-and-density-responsibilities.md)：完整尺寸方案以 Classic 为主要来源；Density 选择默认方案及间距，不对显式 Size 再次缩放。
- [Headless ADR](../adr/0005-headless-base.md) 的已决定范围为 DropdownMenu / Popover / Select / Dialog 浮层。它不等于 Tabs 已完成底座选择。
- 本轮确认公共 UI 已直接安装 Base UI 1.8.0，且导出 DropdownMenu / Popover。可优先验证现有能力，无需为 Tabs 调研新增依赖。
- 初次来源审阅时 Tabs 尚无公共实现、Manifest 或 Registry 项；2026-09-11 已完成候选实现与登记。复用方向的接受不等于新版组件运行视觉验收。

## 2. 旧版视觉基线

来源：[Tabs.vue](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/Tabs.vue)、[tabs.scss](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.scss)、[Token](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1269)、[设计说明](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Tabs.design.md)。本轮在原 Vue Demo 运行页面核对了下表的高度、Label 字号/行高、间距和线厚。

| 旧版尺寸 | 高度 | Label 字号 / 行高 | 标签间距 | 内部内容间距 | 指示线厚度 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Small | 32px | 14 / 20px | 8px | 2px | 2px |
| Medium（默认） | 38px | 15 / 22px | 8px | 2px | 3px |
| Large | 38px | 16 / 22px | 24px | 4px | 3px |
| XL | 42px | 17 / 26px | 24px | 4px | 3px |

应保留的主要特征：

- PingFang SC；普通 Label 400，选中 Label 600，Count 仍为 400。
- 中性文字、透明背景、品牌蓝指示线。浅色实测未选文字为 #56688F、选中文字为 #142346；蓝线为 #1561F8。新组件需重新映射 Next 的公共 Token，不复制旧变量树。
- Top / Bottom / Start / End 四向位置；纵向内容 center / left / right，默认居中；纵向内容两侧各 24px。
- 指示线支持 stretch / content；默认 stretch。水平 content 指示线有 104px 上限，纵向 stretch 覆盖整项高度。
- 分隔线默认关闭，开启后仅一条 1px 浅线，位于导航靠近内容面板的一侧。
- 图标、标签、计数、导航两端附加内容及独立 Panel。Demo 的“课 / 人 / 记”为文字占位，不作为正式图标来源。

2026-09-10 尺寸方案确认：用户在尺寸选择中明确选择“Small + Medium，方案 A（推荐）”。**compact 对应 Small 32px、default 对应 Medium 38px**，采用完整几何配方：上表对应的高度、Label 字号/行高、标签间距、内容间距与指示线厚度一起映射；Small / Medium 图标分别为 14 / 16px，Count 均为 12px / 14px 且保持 400 字重。此次确认只覆盖 Tabs 尺寸设计，不改变全局 Density 或其他组件映射；新版实际运行视觉验收及实施启动仍独立。Large / XL 保留为旧版参考，不进入首版两档；Large 和 Medium 虽同高，字号与间距不同，不能只按高度合并含义。

旧版的中性 Focus 方式不继承，新版使用已经确认的全局双层 Focus。旧版 Dark Token 也不自动成为新版主题事实源。

## 3. 旧版已实现能力与真实限制

已有受控 / 默认值、动态 items、禁用跳过、首个可用项与动态回退、横纵方向键、Home / End、循环焦点、自动 / 手动激活、图标和计数插槽、额外操作区、More / Scroll 入口以及隐藏时销毁面板选项。

本轮浏览器抽查通过：点击“学生”切换面板；ArrowRight 切到“课堂记录”；打开 More 并选中“作业”后，该项进入可见区且获得焦点；再次打开菜单后 Escape 返回 More。以上是具体路径抽查，不是全矩阵或读屏验收。

| 发现 | 证据与影响 | 新版处理建议 |
| --- | --- | --- |
| 多实例 ID 冲突，已实测 | [Tabs.vue:368](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/Tabs.vue:368) 读取不存在的 instance.uid，回退 rain-tabs-root。作业 Panel 的 labelledby 在同页有 4 个同名 ID，浏览器名称解析为另一组“作业提交情况 (24)” | 每实例稳定唯一 ID；验证多组同名 value、嵌套与 Panel 关联 |
| 面板缺少“首次访问挂载，访问后保留” | [Tabs.vue:363](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/Tabs.vue:363)：默认所有 Panel 立即挂载；destroyOnHidden 则切换即销毁 | 独立规定首次挂载和隐藏后的保留策略 |
| More 宽度分配有缺口 | [tabs.utils.js:55](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.utils.js:55)：遗漏最后 Tab→More 的间距，宽活动项换入后不重算。只读函数复现中，168px 容器分配结果需 176px；170px 容器宽项换入结果需 226px | 用实际内容测量，完整预留 More 和间距，活动项换入后再次满足宽度约束 |
| 测量未覆盖真实插槽 | [Tabs.vue:199](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/Tabs.vue:199) 使用简化内容及占位图标，未反映所有自定义内容和加粗变化 | 验证真实图标、计数变化、长标签与字体加载后的几何 |
| 纵向 More 未实现 | [Tabs.vue:433](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/Tabs.vue:433) 在纵向直接恢复全量，不计算高度溢出 | 首版明确横向 More / Scroll、纵向 Scroll；不声称四方向 More |
| More 浮层为手写菜单 | [Tabs.vue:141](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/Tabs.vue:141)：未接共享 Popup，缺外部点击 / Tab 离开关闭及视口避让 | 复用公共菜单及其底层定位、关闭和焦点行为 |
| 手动激活与活动项可见性需补齐 | [Tabs.vue:482](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/Tabs.vue:482)：单一可见位置移动焦点可能替换活动项；Scroll 无程序值变化后的主动显露逻辑 | 分清 focused / selected，明确极窄容器降级与值变化后的可见性 |

关闭、新增、卡片与拖拽是旧版明确排除的范围，不应当作旧版漏做。调用检索未找到成熟业务页面消费证据，主要为 TabsDemo 的模板与循环矩阵。

2026-09-10 内容组合补充核对（源码检查，未新增浏览器验收）：

- [Tabs.vue:395](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/Tabs.vue:395) 显示 0，隐藏 null / undefined / 空字符串；纯数字格式加括号，`99+` 等文本原样显示，未内置上限转换。新版建议继续区分 0 与未知数量，缺省内容不占位。
- [tabs.scss:193](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.scss:193) 可见 Tab 的 Count 有独立颜色，并在 Hover / Pressed / Focus / Selected 时加深；Disabled 只改变宿主颜色，未覆盖 Count 的独立颜色。[More 状态:537](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.scss:537) 又未统一 Count 的 Hover / Pressed / Focus。新版建议保留辅助层级与 400 字重，并补齐列表和菜单的内容状态。
- [Label:287](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.scss:287) 单行省略，Icon / Count 不收缩；旧实现没有可见全文入口。新版建议补充可通过鼠标和键盘发现的全文呈现，并核对窄纵向组合。
- [items 监听:684](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/Tabs.vue:684) 在数量变化后重新测量。新版明确建议：数量更新不改变选择、不重建面板、不抢焦点；不能将重测误作一次分区访问。

2026-09-10 布局补充核对（源码检查）：

- [水平居中:133](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.scss:133) 的基准为两端 Extra 之外的 nav-main，包含 More；[纵向内容:247](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.scss:247) 的 contentAlign 只改变每项内部对齐。二者都不表示均分标签宽度。
- [Nav 与分隔线:78](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.scss:78) 使浅线跨越整个 Nav，四向对应下/上/右/左沿，包含 Extra。较高 Extra 会撑高 Nav，而旧版 Tab 居中、蓝线仍贴 Tab 边缘，存在两条线错位的条件；新版提案保留 Tab 尺寸并对齐靠 Panel 边缘。
- [Extra 布局:122](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.scss:122) 水平在前后、纵向变为上下，不会因 Bottom / End 反转；Extra 不收缩，也不自动收纳。新版提案由组合布局处理窄容器操作区，不将独立动作混入 More 标签菜单；纵向转 Top 是页面显式布局决策。

2026-09-10 外观状态继续梳理：在设计草案第 3.6 节新增 A/B/C 水平间距、圆角、预留边框及复合状态候选。复查现有 `radiusTokens` 和 `focus.css`，复用 4 / 6px 圆角及全局 1px 轮廓 + 3px 外环。独立只读审阅强调：未选 Hover 不冒充 Selected、Selected + Disabled 保留当前项标记、C 普通态 Neutral/4 资格仍未通过、底板/滚动裁切不得遮挡 Focus。本次“继续”未确认新数值或开启实现，未新增颜色、Token 合同或运行验收。

2026-09-10 外观几何与状态确认：用户在查看上述状态对照及几何建议后回复“确定”。确认本轮 A/B/C 水平间距、圆角、预留描边和状态方案，包括 B 底板 6px / 内部 4px 圆角及 2px 内缩、C 6px 圆角及 1px 预留边框、独立 Focus、Selected + Disabled 保留当前项标记。新增 28px 与最终档位集合仍沿用上一轮明确的待定边界；C 展示了两档灰度，本次未指定其取舍，也未改变 Neutral/4 交互用途资格结论。草案第 1、3.5、3.6 节已同步；本次确认属于设计讨论，不启动公共组件实现或提升验收状态。

## 4. 成熟组件库对照

以下来自本轮读取的当前官方页面；采用什么外观和默认策略仍由 Rain 决定。

| 来源 | 值得参考的建设方式 | 对 Rain Next 的用途 |
| --- | --- | --- |
| [shadcn/ui Tabs](https://ui.shadcn.com/docs/components/base/tabs) | Root / List / Trigger / Content 组合；线形、纵向、禁用、图标示例；当前提供多个行为底层入口 | 开放组合、完整默认用法与清晰 Parts；视觉由 Rain 配方管理 |
| [Ant Design Tabs](https://ant.design/components/tabs/) | 溢出、额外操作、四向、图标；面板懒渲染 / 强制渲染 / 隐藏销毁；可编辑卡片作为单独使用形态 | 参考业务能力与面板策略；编辑工作区有真实需求后再扩展 |
| [Material UI Tabs](https://mui.com/material-ui/react-tabs/) | 可滚动标签、滚动按钮、等宽、纵向；默认焦点与选中分离，可开启跟随焦点选中 | 参考窄容器操作及清晰的激活策略 |
| [Base UI Tabs](https://base-ui.com/react/components/tabs) | Root / List / Tab / Indicator / Panel；受控 / 默认值、方向、激活及面板挂载控制 | 现有依赖中的优先验证候选；不另外实现重复键盘与关联机制 |
| [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) | 正确的 tablist / tab / tabpanel 关联、焦点顺序、方向键与手动激活；无明显加载延迟时才适合自动激活 | 用于无障碍合同和验证场景 |

本地 Base UI 1.8.0 源码已核对：List 默认 activateOnFocus=false、loopFocus=true；Panel 默认 keepMounted=false。Root 仅为非受控模式自动回退，受控模式保留父级精确值。**不能直接照搬其面板卸载默认值，也不能把 keepMounted 等同于首次访问后保留。**此处为源码核对，尚无 Rain Tabs 适配实验。

## 5. 建议首版范围

1. 完整 Line Tabs：四向位置、纵向对齐、可选分隔线、两种指示线长度、紧凑 / 默认配方。
2. 默认提供完整的标签与面板组合；保留图标、Label、Count、导航操作区及 Panel 的局部定制。避免用 withSearch / withExport 等业务开关扩展公共 API。
3. 受控 / 非受控、稳定值、唯一关联、禁用、方向键与自动 / 手动激活；明确空列表、全禁用及当前项移除时的结果。受控值的修正由宿主响应明确事件完成，避免双重选中真值。
4. 已确认常规面板首次访问时挂载、访问后保留；显式预挂载与离开后销毁保留为可选能力建议。数据获取、Loading / Empty / Error 内容归宿主，不使 Tabs 内置请求框架。
5. 水平 More 与 Scroll、纵向 Scroll；外部切换选中项时显露该项，键盘导航时显露焦点项，手动激活保持原面板直到确认。空间允许时同时保留选中项与焦点项可见，极窄情况需明确降级。More 复用既有 DropdownMenu，独立验证菜单到 Tab 的焦点交接和溢出项 Panel 关联。
6. 复用 Rain 图标与已有标记能力；默认保留旧版轻量括号计数，不自动把所有计数改成醒目 Badge。

同一界面的关联内容面板切换可以使用 Tabs，也可以由页面同步 URL、支持深链接和前进后退；URL 变化本身不改变其语义。跳转独立页面通常使用链接导航；同一数据集合的筛选优先评估 Segmented / 选择类组件。参考 [Base UI 链接组合](https://base-ui.com/react/components/tabs#links)与 [MUI 导航示例](https://mui.com/material-ui/react-tabs/#nav-tabs)。

2026-09-10 范围确认：用户在“首版是否需要主动新增、关闭标签页”的问题中明确选择“先做内容分区切换（推荐）”。首版建设内容分区切换，用户主动新增、关闭的工作区能力随后单独建设；这不限制页面数据驱动的分区增减。拖拽与编辑工作区仍在首版建议范围之外。本次确认仅针对该范围，不自动确认本报告的尺寸、溢出默认、面板生命周期或实施启动。

2026-09-10 溢出默认确认：用户在“横向标签超出容器时，默认采用哪种方式”的问题中明确选择“默认‘更多’收纳（推荐）”。横向默认使用 More，横向滚动保留为可选方式。纵向滚动、极窄时降为滚动、可见集合变化及焦点规则仍为设计建议，待整体设计收口；此次确认不自动扩展为这些细节的验收，也不启动实现。

2026-09-10 面板默认确认：用户在“内容面板默认采用哪种方式”的问题中明确选择“首次进入时创建，之后保留（推荐）”。默认首次访问时创建，切走不卸载已访问面板；标识稳定且宿主未重置时，保留其内部状态。保留范围为本次页面使用过程，不保证刷新或离开页面后的恢复。该确认不包含数据缓存、自动保存、后台活动控制或实施启动。

2026-09-10 键盘默认确认：用户明确选择“方向键定位，Enter／Space 切换（推荐）”。默认 manual，auto 保留为可选；鼠标点击直接切换。该设计决定明确更新旧 Vue 默认 auto，不将方向键聚焦或 More 菜单浏览视为首次面板访问，实施与验证仍未开始。

2026-09-10 More 显露方式确认：用户明确选择“显示相邻的一段，随当前项移动（推荐）”。选中 More 中的分区后，可见标签为原始顺序中包含该项的连续区间，区间外项目按原序收入 More；不固定开头几项，也不改业务数组顺序。讨论示例为“概览、学生、课堂、作业、讨论、设置”，容纳三项并选中“讨论”后显示“课堂、作业、讨论”。该决定更新旧版优先保留前部、将活动项塞回末尾的分配方式；只确认呈现策略，具体测量与焦点交接待验证。

2026-09-10 内容组合与状态确认：用户对上一轮五条建议回复“确定。继续”。确认范围是文字保留、图标和数量按需添加且缺省不留位；数量保持辅助层级，显示 `(0)`、未知不显示、选中不加粗且不自动转换徽标/`99+`；禁用时文字/图标/数量整体弱化，列表和 More 遵循相同规则；长名称优先省略文字并提供鼠标/键盘可发现的全文入口；数量变化或容器缩放不切换内容、不清空面板、不抢焦点。四向、对齐、分隔线与操作区是下一轮提案，未由本次回复整体确认。

2026-09-10 纵向内容对齐确认：用户明确选择“默认居中，保留左／右对齐（推荐）”。左右两侧的纵向 Tabs 均默认将每项内容居中，长短差异较大的名称可显式左对齐。它不等于横向整组居中，也不整体确认四向、分隔线或操作区的其他提案。

面板保留仅管理组件挂载与本地状态，仍可能保留运行中的副作用；它不等于数据缓存、自动保存或未保存保护。请求缓存、是否允许离开和保存确认分别由页面的数据层与业务规则拥有。Tabs 通过受控选中状态配合，不内置业务保存流程。

相较于完整照搬旧版，增强 Line Tabs 能覆盖已发现的真实问题；一次性加入编辑工作区家族则会引入关闭后的焦点、未保存内容和排序等独立规则。推荐增强 Line Tabs 路径。

2026-09-10 视觉探索扩充：用户询问是否可参考 shadcn/ui 增加下划线以外的样式。当前转入外观候选比较，未将 Line 锁为唯一外观。重新核对官方 [Base](https://ui.shadcn.com/docs/components/base/tabs)、[Radix](https://ui.shadcn.com/docs/components/radix/tabs) 页面与对应 [Base 源码](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/bases/base/ui/tabs.tsx) / [Radix 源码](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/bases/radix/ui/tabs.tsx)：明确 variant 为 default / line，设于 TabsList；浏览器观察 Base 默认示例为浅底板加选中背景块，Line 为透明背景加选中线。Card 内容、方向与图标不作为额外官方 variant。Rain 候选与原有设计决定的共享/专用边界见草案第 3.5 节；Contained 与 Soft 尚未被用户选定，原 Line 尺寸也不自动确认新增外观的容器留白。

2026-09-10 外观反馈：用户明确“方案 A 肯定是没有问题的”；B 适合内容少的小面板、弹窗、卡片和局部区域，应考虑更紧凑的使用；C 可以保留，探索未选浅灰字 + 极浅半透明中性 Fill、无描边，已选深主题字 + 浅主题 Fill + 浅主题描边。本轮按 Brand 蓝绘制 C，精确 Token 与状态识别仍是候选。

2026-09-10 尺寸原则补充：用户明确 A/B/C 尺寸应共通，所有外观都要包含从小到大的完整尺寸，场景仅影响偏好的档位；禁止 A 仅提供大尺寸、B 仅提供小尺寸。该补充修正助手此前为 B 单列较小范围的提案。当前以 28/32/38 整体高度作共同矩阵示意，新增 28 与最终档位集合尚未被选定；原有 32/38 Line 几何保留。完整矩阵将按最终全部尺寸 × 三种外观验证。

C 配色候选只读校验：使用 `packages/foundations/src/color-registry.ts` 现行函数，在 `Background/Neutral/1` 上合成 Fill/Neutral/Alpha/6 或 Fill/Brand/Alpha/4。未选 Text/Neutral/4 为 Light/Dark 5.181/5.309，数值过 4.5，但现行 Weak Neutral 不允许有意义的交互文字，故只能保留为讨论图候选；可用 Text/Neutral/3 为 6.110/8.073。选中 Text/Brand/1 为 5.516/5.813；Border/Brand/3 对选中填充 1.436/1.296、对外底 1.614/1.412，均不到必要边界 3.0，不能独自承担选中识别。未修改 Token、校验器或当前验收记录；不将浅边框或完整组件标成对比度/无障碍通过。

## 6. 后续验证重点与本轮状态

后续使用实际课程工作区、带操作区的窄容器、纵向详情页、带未保存输入的面板四类样本，验证两档 × 四方向 × 交互状态；额外覆盖多实例同名值、动态增删、长标题、图标计数变化、More 关闭与定位、程序选中显露、200% 缩放和全局 Focus。

本任务的仓库写入仅涉及本报告与设计草案。未修改 Classic / Next 运行源码、依赖、全局 Token、阶段、Manifest 或 Registry；未操作 Figma、Git 或发布。浏览器抽查与纯函数复现不替代新版实施验证、完整旧库回归、真实读屏或视觉 Human Gate。

2026-09-10 实施计划编写期间的三项确认：用户选择“28 / 32 / 38px 三档（推荐）”；“保留当前浅灰视觉，单独解决用色规则”；“A/B/C 都支持上、下、左、右四向（推荐）”。三种外观完整覆盖三档，横向默认 More / Scroll 可选，纵向 Scroll。C `/4` 保留，其 Weak Neutral 交互用途限制必须通过独立、精确的 Tabs Soft 治理任务解决，现行校验结果不因设计选择被改写。本次指令为“开始写计划”，不启动组件实现。

讨论收拢后的入口为 [Tabs 首版设计草案](../plans/2026-09-10-tabs-design.md)，开发任务见 [Tabs 实施计划](../plans/2026-09-10-tabs-implementation.md)。本报告保留来源与问题证据；草案集中列出已确认决定、建议默认和技术待验证项。

2026-09-10 计划交付：已编排 TB-00～TB-09 共十个实施任务，补齐接口、完整配方、连续 More、面板保留、无 More/纵向禁用全文入口、C 精确用色资格与运行验证矩阵。三路独立只读复核及文档检查已完成，发现的任务依赖和行为缺口已修订。状态示意的静态来源与 hash 已固定在计划中；未展示的 Icon、Next 指示线/分隔线映射明确列为工程默认，不能扩大此前设计确认范围。实际修改仅三份文档，组件与治理实现、技术小样、运行测试及 Human Gate 均未开始。
