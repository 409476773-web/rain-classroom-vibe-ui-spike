# Rain Classic 尺寸、间距与完整方案来源审计

日期：2026-09-05。状态：**源码梳理完成；来源冲突保留待处理；公共高度表未确定。**

本次按用户“先完成旧 Vue 的尺寸、间距与完整方案梳理”进行，只修改本审计与相关规划的索引、来源纠正。工作模式为 System Mode 的文档审计；不修改 Classic / Next 运行代码、Token、组件契约、Figma 或发布状态。

## 1. 审计范围与使用口径

主要来源是 `/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0` 当前工作区；读取时 HEAD 为 `f1276fe2fcbeb76caeeee4b852f1480402a3d83b`，已跟踪文件无未提交修改。按组件实际消费链阅读设计说明、契约、Vue、SCSS、Token引用、生命周期和相关验收记录。历史来源锁与其他工作树不替代本次实读。

覆盖当前 [生命周期映射](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:330) 的 **44 项**，以及 [根入口](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/index.js:1) 另有的 **8 个公开衍生**，合计52个命名对象；其中Message在生命周期中但未从根入口导出。另梳理内部Popup，以及现有Layout、Pattern和多栏配方；覆盖映射在第7节。

“完整方案”在本审计中指**尺寸配套方案**：默认Size和变体、高度/宽度策略、padding/gap、相关字号/行高/字重、圆角/实体边框、宿主图标盒/实际图形/点击区，以及会影响几何的内容、状态和行为依赖。并非本轮重新审计全部颜色、动效、交互和无障碍实现。

- 数字默认单位为CSS px，排版写为“字号/行高/字重”；R6表示圆角6px，W×H表示宽×高。声明值、固定尺寸、最小尺寸、实际内容尺寸和视口尺寸分开；公式推导明确标注条件。
- 以已确认的Rain方案为优先来源；Candidate源码也记录，但不因此升级为视觉推荐。设计、源码冲突不静默裁决；验收与发布分开。
- 未做本轮浏览器测量、Figma重验或运行测试；不能把本审计称为全库视觉验收。历史通过记录也不掩盖后来源码差异。
- 旧库数值与API用于提供依据，不要求Next逐组件翻译。Next现值只作差异对象，不反向覆盖旧库来源；公共尺度是否晋升仍按明确用途与验证决定。

### 1.1 此次可以确定的来源结论

| 结论 | 直接证据与对后续Token的影响 |
| --- | --- |
| 不能用一张公共高度表表达所有组件 | Button固定28/32/36/48；Input固定28/32/36；TextButton20/24/26；Tabs32/38/38/42；Tree是最小36/44且Rich可增长。均保留各自用途 |
| 同名Size不保证相同高度，同高也不保证同方案 | Button Medium36、Input Medium32；Tabs Medium和Large均38，但字体与间距不同。需要显式完整映射 |
| 已有方案不是“改一个高度，其余等比缩放” | Input三档字体相同；Button部分档共用排版和圆角；SearchInput右侧结构独立；Switch点击盒、轨道、滑块分别变化 |
| 普通间距大多落在已确认Space表，仍存在来源例外 | Tooltip上下7、Switch内部2.5、FormItem对齐占位、负边距和边框补偿不能为凑尺度而改值，也不自动升级公共Space |
| 已确认公共字号、行高、圆角表尚不能覆盖全部旧专用几何 | 计分角标8/10、开放型作业首行10/12、批量标签500字重、AvatarGrid圆角5及内部1/2等，必须保留例外或另行决定迁移 |
| 单改Token不能保证所有消费者变化 | TextArea AutoSize、Tree虚拟滚动、Avatar/Group几何、PaneGroup宽度判断还有JS数值或公式来源；需跟踪完整依赖链 |
| 文档与实现有需要裁决的真实差异 | Select尾部24×24设计与当前12×24槽、16×16Clear；Tree拖拽24/16文字与28/16实现；不能直接将其中任一份抄成新标准 |

后续组合仍遵循已确认原则：**默认直接使用完整方案；有明确需求时，只拆开需要改变的字段，并核对关联几何。** 本审计不确定新的公共ControlHeight，不扩大FontSize、LineHeight、Radius或Space表。

## 2. 控件、表单与菜单的完整方案

本节以 `/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0` 当前源码、公开契约、设计源文档和生命周期登记为证据。数值单位除特殊说明外均为 px；`字号/行高/字重` 写为三元组。表中的数值是**源码声明及变量解析结果**，没有在本次启动浏览器实测；由公式得出的结果显式写为“推导”。旧库未修改。

“已实现”与“整体验收”“发布”分开：Input、SearchInput、InputNumber、TextButton、FormItem 登记为 Gate 2 已批准、等待发布；Button、IconButton、TextArea、Select、Segmented、MenuItem 仍登记为 Gate 2 Candidate。Select 有局部设计确认与修复证据，不能因此改写其组件整体登记。PopupMenuSurface 是已经被组件消费的内部视觉壳，不是有公开 Size/API 的业务组件。所有公开组件上述生命周期对象的 Figma Library、代码包、业务迁移均为 unpublished。状态依据见本节末来源索引。

### A. Button、TextButton 与 IconButton

#### A1. Button

测量 Part 为根 `button.rain-button`，显式 `box-sizing:border-box`，固定高度包含边框；宽度由内容、内边距和最小宽决定，`block=true` 改为占满父容器。无公开 Large 档；默认 Medium。

| 公开 Size | 根高度 | 最小宽 | 左右各 padding | 根 gap | 字号/行高/字重 | 圆角 | 前置及 Loading 图标盒 | 后置图标盒 |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| mini | 28 | 64 | 12 | 4 | 13/18/600 | 6 | 14×14 | 10×10 |
| small | 32 | 64 | 20 | 4 | 14/22/600 | 6 | 16×16 | 12×12 |
| medium（默认） | 36 | 64 | 20 | 4 | 14/22/600 | 6 | 16×16 | 12×12 |
| xl | 48 | 160 | 28 | 6 | 16/24/600 | 8 | 22×22 | 16×16 |

配套规则：根边框为 1px solid，部分层级只将边框色设为 transparent，不删除边框占位；纵向 padding 未在配方中显式统一，不能把当前样式表写成已锁定 `padding-block:0`。文字 nowrap，主轴居中；Loading 替换前图标、移除后图标。源码未为不同内容/Loading 锁定完全相同的固有宽度，最小宽也不能保证所有长文案状态均不变宽。点击区是根按钮，图标槽非独立点击区。来源：C01。

#### A2. TextButton

独立组件，默认 Regular。根为按钮或链接，显式 border-box，固定高度、border 0；宽度由文字及图标内容决定，没有组件级最小宽、固定宽或 block 轴。全档左右各 6、上下各 3、圆角 6、字重 400，文字 nowrap。

| 公开 Size | 根高度 | 字号/行高 | 前图标/Loading 盒 | 业务前图标到文字间距 | 后图标槽宽×高 | 后槽左 padding |
| --- | ---: | --- | --- | ---: | --- | ---: |
| small | 20 | 12/14 | 14×14 | 2 | 11×12 | 2 |
| compact | 24 | 13/18 | 16×16 | 4 | 9×12 | 0 |
| regular（默认） | 26 | 14/20 | 16×16 | 4 | 11×12 | 2 |

后槽内图标子元素仍声明 12×12，**槽位宽与图标宽不相同**；不能用后槽宽直接改图形。Loading 槽与前图标槽使用不同类，源码只给业务前图标 `margin-right`，没有给 Loading 槽同样 margin；因此“切 Loading 完全保持图文间距/固有宽度”不成立。Loading 移除后图标。点击区是根按钮/链接。来源：C02。

#### A3. IconButton

公开 Size 本来就是“控件方盒－图标盒”的 17 个合法完整组合，默认 `32-24`；不是自由笛卡尔积。根显式 border-box、padding 0、border 0、固定宽高，无内容撑高和 block 轴。

| 根宽×高 / 点击盒 | 允许图标盒边长 | 圆角 | 组合数 |
| --- | --- | ---: | ---: |
| 32×32 | 24、20、18、16、14、12 | 6 | 6 |
| 28×28 | 20、18、16、14、12 | 6 | 5 |
| 24×24 | 16、14、12 | 6 | 3 |
| 20×20 | 14、12 | 4 | 2 |
| 18×18 | 11 | 4 | 1 |

图形本身还可能在 Icon 画布中有光学留白，不能把该留白当成页面 Space。Loading 与业务图标复用同一宿主图标盒；Loading+Disabled 仍显示 Loading，Disabled 只改变交互资格与样式。文档将 <24 的小控件用于桌面高密度局部控制，触屏等更大命中需求由外部交互布局满足。来源：C03。

### B. Input、SearchInput 与 InputNumber

三个组件公开 Size 均为 Small 28、Medium 32（默认）、Large 36，根声明固定 height；三档均使用 14/22，字号和行高不随 Size 缩放。根边框 1px solid、圆角 6；根 SCSS 没有显式字重，正常文档语境为 Regular，但代码实际依赖继承，不能记作“根配方自行锁定 400”。

**盒模型口径：**这三个根是 div，组件 SCSS 未自行声明 border-box；既有 Demo 在 `demo/App.vue:583` 全局声明了 `* { box-sizing:border-box }`。因此 28/32/36 是契约及该消费环境口径；缺少等效 reset 时上下边框会参与外框尺寸，不能将这一隐式依赖直接迁入新库。

| 组件 | 根宽与限制 | 根内边距 | 内部 gap | 图标盒与操作区 | 根高度之外的关键关系 |
| --- | --- | --- | ---: | --- | --- |
| Input | 默认宽 272，max-width 100%；native flex 填剩余空间且 min-width 0 | 左右各 16；纵向未额外声明 | 8 | 普通前后图标 16×16；Clear 点击盒 24×24、图形声明 14×14；字段反馈盒 16×16 | Prefix/Suffix 静态文本不换行；后置操作允许 IconButton 或 TextButton；TextButton 操作区 stretch，额外左 padding 8 + 左边框 1 |
| SearchInput | 默认宽 272，max-width 100%；与 Input 同一公共 Size 轴 | 左 16、右 0；搜索操作外壳另有左 8、右 7 | 8 | 搜索宿主图标盒 16×16、mask 图形 13×13；额外操作宿主 24×24；Clear 复用 Input；搜索区放 TextButton Regular（根高 26） | 搜索区左边框 1，沿根内容区纵向 stretch；内置 TextButton 三档均固定 Regular，没有随外部 Size 自动映射 |
| InputNumber | 默认宽 80；有 prefixText 或 prefix Slot 切为 120；max-width 100%；native min-width 0 | 左 12、右 4 | 8 | 加减区宽 28；上下两按钮 grid 等分、gap 2；图形 11×11 | 加减区上下各 -1、右 -5 的 margin 用于贴边；这类边框几何补偿不是普通公共 Space。`controls=false` 时才显示 trailing-action Slot |

必要内容/状态规则：

- Input：满足“clearable+有值+非禁用/只读+Default Status”才创建 Clear 占位；创建后 contextual 用 opacity 控制 Hover/Focus 显隐，因此 Hover 本身不收回这 24 的槽位，但清空、状态变更等会移除槽位。Count 使用 13/18、字重继承。Clear、Count、反馈和插槽会压缩 native 可用宽度；不能承诺任意长 Prefix/Suffix 都自动容纳。根的 16/16 留白在设计源文档中明确校正，不能为了方便改成与其他控件一样的 12/12。
- SearchInput：搜索区始终存在；Loading 进入其 TextButton，不另建第二个搜索操作。它的右侧几何是独立完整方案，不能拿 Input 16/16 规则覆盖。Clear 满足有值/clearable/非Disabled/ReadOnly/Default Status 时创建；与 Input 不同，当前模板没有 contextual 类，创建后不额外等待 Hover/Focus。Count 同样为 13/18，字重继承。
- InputNumber：加减区仅在 controls 开启且非 Disabled/ReadOnly、Status 为 Default 时创建；Hover/Focus 用 opacity 显示，已创建时保留宽度。其他状态移除该区会重新分配 native 宽度；根高/根宽没有因此改档。前缀是固定宽 80→120 的明确触发，而非由文字任意撑宽。

来源：C04、C05、C06；反馈宿主几何同时见 C08。

### C. TextArea 与 FormItem

#### C1. TextArea

默认 Medium；宽 320、max-width 100%。测量 Part 为显式 border-box 的 `.rain-textarea` 根。三档在 CSS 中**同时声明 height 与 min-height**，是可拖拽/AutoSize 的基础高度，不是把内容永远限制在该固定值。

| 公开 Size | 基础 height / min-height | 四边 padding | 字号/行高 | root gap | Footer |
| --- | --- | ---: | --- | ---: | --- |
| small | 80 / 80 | 10 | 14/22 | 6 | 始终存在，高/最小高/flex-basis 20 |
| medium（默认） | 104 / 104 | 12 | 14/22 | 6 | 同上 |
| large | 120 / 120 | 12 | 16/24 | 6 | 同上 |

全档根圆角 6、实体边框 1，字重未显式设在根，依赖继承。Content Row gap 8、min-height 0；native textarea 无 padding/border、继承字体、允许内部滚动。Footer 内部 gap 8；Count 12/20；footer Slot 不能挤走 Count，正文与 Footer 是不同尺寸责任。

Clear：宿主包装 24×24，消费 IconButton `24-16`；图形类另有 14×14 声明，最终图形还需联合 IconButton 子元素尺寸规则验证，不能将 24/16/14 三个数混为一个全局 Icon 尺度。字段反馈盒 16×16。拖拽手柄点击/键盘盒 16×16、圆角 4；右下角图形 8×8，以左上各 8 的 margin 对齐，不能把图形尺寸当点击面积。

几何状态：默认 resizable=true、autoSize=false；手动仅纵向，最低为当前 Size 基线；Disabled 不允许拖拽，ReadOnly 允许；autoSize 启用后隐藏拖拽手柄，按内容/minRows/maxRows 计算高度、达到上限后内部滚动，宽度和 Footer 保留。Clear 的资格变化只影响内容区可用宽度，不删除 Footer；Hover/Focus 的 contextual 显隐在占位创建后保留宽度。

**Token 维护风险（源码事实）：**`TextArea.vue:127` 又维护一份 JS 数字 `minHeight/padding/lineHeight`，`footerHeight=20`、`contentGap=6`，未从 CSS Token 解析。修改 Token 不会自动更新 AutoSize 和手动最低高度逻辑。`chromeHeight` 仅计算 `2×padding+gap+footer`，没有 root 上下两条 1px 实体边框；在内容决定高度且超过基础最小高时，与 border-box 的内容容纳需求相差 2px 是源码推导，实际滚动/裁切表现待浏览器验证。这里不直接修复或改旧尺寸。来源：C07。

#### C2. FormItem

无公开 Size；公开布局轴为 Vertical（默认）/Horizontal。根宽 100%、高度由标签、主控件、信息区内容决定；没有固定高、全局圆角或外框边线。普通文字 14/22/400；Message/Extra 13/18/400。

| 布局 / Part | 宽度与高度策略 | padding / gap | 配套规则 |
| --- | --- | --- | --- |
| Vertical 根 | 上下排列；高度随内容 | Label Wrap 与 Content gap 8 | Content 左 padding 12，来源为 Required Slot 8 + 与 Label gap 4；不能当无意义缩进删除 |
| Horizontal 根 | 左右排列、顶部对齐；label-wrap flex-basis 120（16×7.5）；Content flex 剩余宽 | 左右区 gap 16 | Label 右对齐、允许换行；同组标签列宽一致；窄容器由上层整组切 Vertical |
| Label Wrap | min-height 32；内容可增高 | 内 gap 4；Required Slot 固定宽/flex-basis 8 | Required=false 只隐藏星号，8 占位仍在；showLabel=false 是文字视觉隐藏，并非删除整个 Label Wrap |
| Content / Control Slot | Content min-width 0；主控件自己决定高 | Control、Message、Extra 间 gap 4 | 直接子 `.rain-input`（含 SearchInput）和 `.rain-textarea` 被设 width 100%；Select、InputNumber 不在该选择器中，不能宣称所有控件自动占满 |
| Tooltip 操作 | 按钮 20×20，图形 14×14 | padding 0、border 0、圆角 4 | Tooltip 内容不是帮助信息的固定高度行 |
| Field feedback | Input/TextArea 内装饰盒 16×16 | 与宿主内容的关系由其结构 gap 管理 | 状态可添加/移除该盒并改变宿主剩余内容宽度，不是独立按钮 |

Message 与 Extra 有内容才创建，不预留固定两行高度；Validating 可自动产生“正在检查”，从而增加信息区。Label、Message、Extra 长文本可增高，不应由控件公共高度 Token 固定 FormItem 根。来源：C08。

### D. Select、Segmented、MenuItem 与 PopupMenuSurface

#### D1. Select

默认 Single、Medium、显示前缀；Small/Medium/Large 映射 28/32/36。宽度在根，边框在独立 Surface，最小高度在 Control；不能用根 width、Surface stroke、Selection 高度互相替代。

| 公开 Size | Control min-height | Control 上下各 padding | Control 左/右 padding | 正文 | Surface |
| --- | ---: | ---: | --- | --- | --- |
| small | 28 | 2 | 16 / 12 | 14/20/400 | absolute inset 0；边框 1；圆角 6 |
| medium（默认） | 32 | 4 | 16 / 12 | 同上 | 同上 |
| large | 36 | 6 | 16 / 12 | 同上 | 同上 |

Control 显式 border-box、无正常流实体边框，源码的高度配套为 Selection 最小 24 + 上下 padding，Surface stroke 绝对定位不额外挤占正常流高度。根单选宽 208、多选宽 272、min-width 0；没有根 max-width 100% 声明，业务需控制所在容器与宽度。Popup 默认宽 264，可用公开 `popupWidth` 数字/字符串覆盖；max-width 为 `100vw - 32px`，高度/滚动由 Surface 管理。

| Part | 尺寸及间距 | 内容变化规则 |
| --- | --- | --- |
| Prefix | 高 24，末端 margin 12 | prefixLabel 默认“类型”；showPrefixLabel 或 prefix Slot 存在时占位 |
| Selection | min-height 24；末端 margin 8；multiple gap 4 | flex 填余宽、min-width 0；Single 省略不换行 |
| Multiple Tag | 高 24，左 padding 8、圆角 6；删除盒 24×24、图形 8×8；+N 两侧各 padding 8 | 默认 tags/collapse；可选 count 摘要、maxTagCount 收起；wrap 显式开启时折行增加 Control 高度；Disabled 移除 tag-remove，会改变标签固有宽度 |
| Suffix 当前源码 | 槽宽 12×高 24；Arrow 12×12；Loading/Search/Clear 声明 16×16 | 模板互斥顺序 Loading→Clear→Search→类型图标；Clear 为原生 button，padding/border 0 |
| Popup 列表与反馈 | listbox 为 column flex，**未声明行 gap**；Loading/Empty 区 min-height 40、左右 padding 12 | 行内容使用 MenuItem；不能把 Popup Surface 的 gap 4 自动当成每两个选项行的 gap |

**设计/源码冲突：**`Select.design.md:19-20` 已规定尾部 24×24 可见出口和正式 IconButton 24/16，当前 `Select.vue:220`、`select.scss:284` 仍是上表 12×24 槽与 16×16 原生 Clear。全 src 中未找到修正这些几何的其他规则；因此本审计保留两份事实，不宣称当前源码已经实现该局部设计确认。该冲突不抹去 Select 已有功能，也不代替其整体 Gate。来源：C09。

#### D2. Segmented

无独立 Density 轴。Small/Medium/Large 默认 Medium；测量 Part 为 Track：固定高、border-box、边框 1；根仅负责 inline-flex，`block=true` 时根/Track 宽 100%、各项 flex 等分。默认 Track width:max-content，每项宽随内容和 padding；没有统一每项最小宽。

| 公开 Size | Track 高度 | 每项左右各 padding | Label 字号/行高 | Count 字号/行高 | 圆角 |
| --- | ---: | ---: | --- | --- | --- |
| small | 28 | 12 | 13/18 | 12/20 | Track 6；中间项角 0、首尾外侧角 6 |
| medium（默认） | 32 | 16 | 14/22 | 13/18 | 同上 |
| large | 36 | 16 | 14/22 | 13/18 | 同上 |

Track 项间 gap 0；Item 高 100% 依附 Track 内容盒，不另加一个公共行高。Content gap 2；Icon 盒全档 12×12，末端 margin=`4-2=2`，所以图标到下一项净间距 4；icon-only 去除该额外 margin。文字到 Count 间距 2。根字重 400，Selected Item 改为 600；Count 没有另行固定回 400，随选中项继承。文字 nowrap/ellipsis，内容或选中字重可能改变非 block 的固有宽度。分割线宽 1、inset=`1-1=0`，仅参与分界绘制；选中/禁用相关分割线显隐不修改 Track 高度。图标为描述性内容，点击区是整个 Item。组件内部另有 `.rain-segmented__tooltip`：absolute、top=100%+4、width:max-content、height:auto、padding 4、border 1、圆角 4、12/20/400，显示不参与 Track 高度。来源：C10，Tooltip 局部样式见 `segmented.scss:266`。

#### D3. MenuItem

没有公开 Size；根 Item width 100%、border-box、默认 min-height 32，四周不是固定高。上下 padding 6、左 16/右 12、主 Part gap 12；无根实体 border，圆角 6。普通 Label 14/20/400，Selected 600；Supporting Text 固定 13/18/400，Label 与说明 gap 2。

| 内容形式 | 高度策略与推导 | 配套几何 |
| --- | --- | --- |
| 单行主文案 | min-height 32；默认 20 行高+上下 12=32 | 描述图标盒 18×18、选中标记盒 18×18 |
| 有 Supporting Text | 自动加 multiline 类，min-height 52；20+2+18+12=52 | 两行分别 nowrap/ellipsis；“multiline”指主文案+说明两行，不等于主文案可自由换行 |
| 单行 + Tag | min-height 仍为 32，但 Tag 高 24 + 上下 12 **推导至少 36** | Tag 左右各 padding 8、圆角 6、12/20；其字重继承根，因此 Selected 时也可能是 600 |

`showSelectedMark=true` 会创建固定 18 盒，通过 opacity 控制 Selected 显隐，未选中仍占位；false 才没有该 Part。Leading Icon/Tag/Supporting 是描述性信息，无第二个行内动作，点击目标是整行。传入超出契约的 Slot 高度仍可能撑大行，不能把 token 名 `minHeight` 当实际固定高度。来源：C11。

#### D4. PopupMenuSurface（内部能力）

没有公开 Size、字体预设或业务点击区。Surface 显式 border-box、column flex、高度由内容驱动，max-height=`min(360, 当前可用高度)`，超出后 `overflow:auto`；padding 四边 8，直接子元素 gap 4，边框 1、圆角 8；阴影几何 x=0/y=4/blur=10，无显式 spread。Surface 自己不定义固定宽或最小宽，内容字体由消费者决定。

PopupLayer 负责位置与消费者给出的 width/minWidth/maxWidth；数字入参转换为 px。默认 local/absolute、bottom-start、与触发器 offset 4；可显式 portal/fixed。`matchAnchorWidth` 在当前源码实际设置的是 minWidth=anchor 实测宽，不是无条件锁定 width 相等。可用高度由定位层交给 Surface；Select 的 264、TagSelect 的其他宽度不提升为此 Surface 的统一宽度。

状态边界：源码已经存在并被 Select 消费；历史设计文档顶部仍写 `BLOCKED BY P0-06`，后续实施文档明确记录用户提前实施授权，且 Roadmap 已迁移旧任务。不能仅看旧设计文档标题断言 Popup 未实现；也没有 PopupMenuSurface 独立公开发布/Gate 生命周期项。来源：C12。

### E. 已识别的冲突与移植时必须保留的区别

| 编号 | 事实与风险 | 本审计处理 |
| --- | --- | --- |
| G01 | Input/SearchInput/InputNumber 的外框尺寸依赖消费侧 border-box reset | 记录契约高度与隐式盒模型依赖；未作独立浏览器实测或修复 |
| G02 | Select 局部设计规定 24×24 尾部/正式 IconButton，当前源码仍为 12×24 槽及 16×16 Clear | 分列设计与源码，不自行认定哪份已覆盖哪份 |
| G03 | TextArea 的尺寸、padding、lineHeight 在 JS 与 Token 各存一份；AutoSize chrome 算式缺少两条边框 | 标记 Token 维护及高度容纳风险，2px 为源码推导，待运行验证 |
| G04 | TextButton Loading 没有业务前图标 margin；后槽宽 9/11 与子图形宽 12 不同 | 不承诺状态固有宽不变，不把槽位尺寸拿去重画图形 |
| G05 | MenuItem 32 是 min-height；单行 Tag 可令实际高至少 36 | 不是先把该 36 当新公共档，而是保留“内容最高 Part+padding”的规则 |
| G06 | Popup Surface gap 4 仅作用于直接子元素；Select MenuItem 在内部 listbox 中，listbox 未声明 gap | 不从容器 Token 名误推每个列表行都隔 4 |
| G07 | 多个组件不是全字段按 Size 一起缩放：Input 字体固定，Button/Segmented 不同档字体有复用 | 完整配方采用显式映射；不用统一倍率反推旧样式 |
| G08 | Input 与 SearchInput 右侧留白不同，InputNumber 左右也不对称；FormItem 内部存在正式 12px 对齐缩进 | 保留各自结构来源，不为减少 Token 名机械统一 padding |

### F. 来源索引与数值追踪

生命周期共同来源：[状态构造与发布字段](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:1)、[组件映射](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:330)。Button / IconButton 为 :31/:34 的 Candidate；TextButton / Input 家族为 :37/:40 的 Approved；TextArea :43 Candidate；FormItem :46 Approved；Segmented :72、MenuItem :79、Select :82 Candidate。

数值共同来源：[控件高与 Space 基础值](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:875)、[padding、圆角与边框](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:929)、[字体及 Button 图标](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1059)、[TextButton/IconButton/数字输入配套](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1092)、[TextArea/MenuItem](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1159)、[Select/Popup/Segmented](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1189)。例如 `size-xs=8`、`size-sm=12`、`size-ms=16`、`size-md=20`、`size-lg=24`；`padding=16`；`margin=16`；`control-spacing-tight=2`。

| 来源号 | 主源码 / 结构与几何规则 | 公开契约 | 设计源文档 / 补充证据 |
| --- | --- | --- | --- |
| C01 Button | [配方](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Button/button.scss:1)、[Size 映射](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Button/button.scss:172)、[Loading 结构](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Button/Button.vue:16) | [Size 与默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Button/button.contract.js:33) | [组合边界](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Button.design.md:43)、[Loading](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Button.design.md:69) |
| C02 TextButton | [配方](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/TextButton/text-button.scss:1)、[后槽子图形](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/TextButton/text-button.scss:188)、[Loading 结构](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/TextButton/TextButton.vue:20) | [Size 与默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/TextButton/text-button.contract.js:27) | [设计源](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/TextButton.design.md:1)、[验收与兼容备注](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/TextButton.design.md:117) |
| C03 IconButton | [根与图标盒](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/IconButton/icon-button.scss:1)、[小档圆角](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/IconButton/icon-button.scss:221) | [17 组合](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/IconButton/icon-button.contract.js:4)、[默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/IconButton/icon-button.contract.js:48) | [宿主统一外框](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/IconButton.design.md:43)、[小命中区](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/IconButton.design.md:111) |
| C04 Input | [根与 Size](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Input/input.scss:1)、[操作及 Clear](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Input/input.scss:134)、[创建条件](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Input/Input.vue:261) | [公共三档](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Input/input.contract.js:34) | [16/16 留白和 gap 8](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Input.design.md:108)、[消费 reset](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/demo/App.vue:583) |
| C05 SearchInput | [搜索区几何](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Input/input.scss:218)、[额外操作](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Input/SearchInput.vue:81)、[内置 Regular](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Input/SearchInput.vue:113)、[Clear 条件](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Input/SearchInput.vue:209) | [共享 Size 与搜索扩展](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Input/input.contract.js:97) | [Input 家族设计源](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Input.design.md:120)；SearchInput 没有另建独立 design.md |
| C06 InputNumber | [根与 Size](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/InputNumber/input-number.scss:1)、[加减区](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/InputNumber/input-number.scss:127)、[条件及前缀宽](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/InputNumber/InputNumber.vue:162) | [Size / Controls](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/InputNumber/input-number.contract.js:39) | [独立组件设计](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/InputNumber.design.md:1)、[加减区校正](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Input.design.md:122) |
| C07 TextArea | [根与 Size](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/TextArea/text-area.scss:1)、[Footer 与操作盒](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/TextArea/text-area.scss:123)、[JS metrics](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/TextArea/TextArea.vue:127)、[AutoSize 算式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/TextArea/TextArea.vue:374) | [Size](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/TextArea/text-area.contract.js:34)、[AutoSize/Resize](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/TextArea/text-area.contract.js:80) | [完整尺寸说明](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/TextArea.design.md:7)、[Footer/AutoSize](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/TextArea.design.md:32) |
| C08 FormItem | [根与横竖布局](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/FormItem/form-item.scss:1)、[Content/直接子宽度](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/FormItem/form-item.scss:107)、[创建/占位结构](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/FormItem/FormItem.vue:10)、[反馈盒](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/FormItem/form-item.scss:160) | [Layout 与可选区域](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/FormItem/form-item.contract.js:18) | [Required 占位](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/FormItem.design.md:42)、[布局](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/FormItem.design.md:55) |
| C09 Select | [Size 与 Surface](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Select/select.scss:17)、[内容几何](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Select/select.scss:114)、[尾部现状](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Select/select.scss:284)、[尾部 DOM](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Select/Select.vue:220)、[Popup 内容](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Select/Select.vue:260) | [Size](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Select/select.contract.js:41)、[多选/宽度](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Select/select.contract.js:115) | [局部确认与24出口](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Select.design.md:19)、[共享关系](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Select.design.md:26) |
| C10 Segmented | [Size/Track/Item](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Segmented/segmented.scss:8)、[图文间距](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Segmented/segmented.scss:158)、[选中字重](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Segmented/segmented.scss:213) | [Size 与 block](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Segmented/segmented.contract.js:35) | [设计源](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Segmented.design.md:1)、[保留三档与相连轮廓](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Segmented.design.md:102) |
| C11 MenuItem | [Item/Min-height](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/MenuItem/menu-item.scss:1)、[内容/Tag](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/MenuItem/menu-item.scss:79)、[标记保留占位](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/MenuItem/MenuItem.vue:56)、[说明触发 multiline](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/MenuItem/MenuItem.vue:78) | [完整公开内容轴，无 Size](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/MenuItem/menu-item.contract.js:18) | [单一选择意图与描述性Part](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/MenuItem.design.md:5) |
| C12 PopupMenuSurface | [Surface 视觉壳](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Popup/popup-menu-surface.scss:6)、[无独立 Props](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Popup/PopupMenuSurface.vue:1)、[Layer 宽度/定位](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Popup/PopupLayer.vue:68) | [内部契约与消费者宽度归属](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Popup/popup.contract.js:30) | [视觉壳与外部4px分工](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/plans/2026-07-30-shared-popup-foundation-design.md:24)、[提前实施授权](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/plans/2026-07-30-shared-popup-foundation-implementation.md:13)、[Roadmap内部状态](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/roadmap/REFACTOR_ROADMAP.yaml:576) |

## 3. 选择、导航与附加标识的完整方案

本节为旧 Vue 组件的只读来源记录，不是 Next 新公共尺度。数字单位除特别注明外为 CSS px；`字号/行高/字重` 使用 `14/22/400` 简写。测量依据为当前契约、组件源码及其实际引用值；没有本轮浏览器/Figma测量，因此推导的总高度与可能受宿主影响的值单列。

公共字体来源为 PingFang SC，Regular400、Semibold600；Caption12/20，Label Default14/22、Compact13/18。来源：[基础字体与排版](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1069)。本节涉及资产的 Figma Library、代码包与业务迁移均未发布；组件验收状态不等于发布。

### A. Tabs

默认 Medium、Top、Content Align Center、Indicator Stretch、Overflow More；四档为既有 Rain 视觉合同，不压成其他组件的三档。生命周期：Gate2 approved-awaiting-publication（2026-08-04）。

| Size | Tab item固定高度 | Label字号/行高 | Count字号/行高 | 图标盒 | Item间距 / 内部gap | 指示线粗细 |
| --- | --- | --- | --- | --- | --- | --- |
| Small | 32 | 14/20 | 12/14 | 14 | 8 / 2 | 2 |
| Medium（默认） | 38 | 15/22 | 12/14 | 16 | 8 / 2 | 3 |
| Large | 38 | 16/22 | 14/20 | 16 | 24 / 4 | 3 |
| XL | 42 | 17/26 | 14/20 | 16 | 24 / 4 | 3 |

- Tab是border-box固定高度，padding上下0、水平左右8，border0、radius6。普通Label400，选中600；Count始终400。选中引起字重和文字占宽变化，不改变指定高度。item整体是点击区域，图标不形成独立点击目标。
- Top/Bottom宽度由Icon、Label、Count与内边距组成，内容不换行；超长Label省略，放不下的项目进More或滚动，不通过缩小字号维持数量。Nav与Panel gap16，Extra与Tablist gap12。
- Start/End导航宽120；item本体左右padding0，内容层左右24；四档高度与上述相同。普通Panel高度由内容决定。不能把38的item高度误当22的文字行高。
- Stretch指示线在竖向与item等高；Content指示线随内容，水平最长104。指示线不占新外框高度；可选Nav分隔线1，默认关闭。
- More为同档item高度、min-width32、左右8、内部gap随档位2/4，箭头盒12。菜单min-width160、padding8、radius8、border1；菜单项min-height32、左右12，内部gap消费当前档位2/4。这里源码消费的gap并不是仅查Token表会看到的固定overflowItemGap4。

来源：[默认与公开轴](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.contract.js:34)、[四档映射](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.scss:29)、[实际item盒](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.scss:171)、[More与菜单](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tabs/tabs.scss:438)、[Token值](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1269)、[原文规则](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Tabs.design.md:44)、[验收](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:62)。

### B. Pagination

默认Medium、左对齐；总数、每页数量、快速跳页、responsive默认均关闭。已实现，组件总生命周期仍Gate2 candidate，不能写成未实现，也不能提升为整体验收。

| Size | 页码/前后翻页/省略按钮 W×H | 字号/行高/字重 | 箭头盒 / 省略盒 | 独立设置入口的正式IconButton |
| --- | --- | --- | --- | --- |
| Small | 25×24 | 14/22/400 | 11 / 14 | 点击24、图标12 |
| Medium（默认） | 29×28 | 14/22/400 | 12 / 14 | 点击28、图标14 |
| Large | 31×30 | 14/22/400 | 12 / 14 | 点击28、图标16 |

- 页码按钮border-box，padding0、border1（透明边框仍预留）、radius6；Root及列表gap4。总宽由页码数量、总数文案、辅助区共同决定，Root没有独立固定高度。
- 快速跳页始终使用正式Input Small，宽48、高28，左右文字和Input gap4；所以Small页码24不代表启用跳页后整个分页器仍高24。每页设置弹层宽150、padding4、border1、radius6、与触发器gap4，内部Segmented Small。
- disabled、current不改指定尺寸；showLessItems/总数改变总宽，hideOnSinglePage移除整个区域。responsive契约声明窄宽隐藏辅助区，但当前组件仅生成该class，自己的样式没有对应响应式实现，不能将其宣传为已落实的自适应配方。

来源：[公开默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Pagination/pagination.contract.js:32)、[按钮消费](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Pagination/pagination.scss:31)、[弹层与跳页](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Pagination/pagination.scss:142)、[实际组合](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Pagination/Pagination.vue:124)、[设置尺寸映射](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Pagination/Pagination.vue:344)、[Token值](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1138)、[生命周期](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:75)。

### C. Tag 家族：共享外壳与专门形态

Tag家族已有联合Gate2验收；正式lifecycle单列Tag/SystemStatusTag/CheckableTag/CheckableTagGroup/LinkTag/TagSelect。LearningUnitTag、DifficultyTag、GroupTypeTag、StatusTag、LearningUnitReminderMark、ScoredTaskTypeMark是当前root公开导出，沿家族证据核对，未为每个业务wrapper虚构独立lifecycle条目。BusinessTag是这些wrapper共用的内部转接层。

| 共享横向外壳Size | 固定高 | 宽度 / padding | 字号/行高 | 圆角 / 边框 | 常用图标盒 |
| --- | --- | --- | --- | --- | --- |
| Small | 20 | 内容宽，max-width100%；上下0、左右6 | 12/14 | 4 / 1 | 12 |
| Medium | 24 | 内容宽，max-width100%；上下0、左右8 | 13/18 | 6 / 1 | 14 |
| Large | 28 | 内容宽，max-width100%；上下0、左右12 | 13/18 | 6 / 1 | 14 |

共用内部gap4，border-box；Outlined/Filled字重400，Solid600，边框透明时仍预留1。内容单行省略，不因长文字增长高度。Large基础Tag圆角仍6，不能因为Token表存在tag-radius-large8就误映射。SystemStatusTag Large是14/20，其他尺寸同上；Processing替换既有图标为loading图形，不增加尺寸。

| 消费者 | 默认 / 公开差异 | 几何补充 |
| --- | --- | --- |
| Tag、BusinessTag、LearningUnitTag普通分支、DifficultyTag、GroupTypeTag | 默认Small、Outlined、Horizontal；均支持S/M/L及Horizontal/Vertical | 普通分支复用上表；业务wrapper锁内容/用途，不另造一组尺寸 |
| SystemStatusTag | 默认Medium、Filled、显示状态图标；S/M/L | Large字号/行高14/20；其余沿共享外壳 |
| CheckableTag | 默认Medium、Filled、未选中；S/M/L | 整个标签是button；选中保留外框几何，不另加点击盒 |
| CheckableTagGroup | 默认Medium、Filled、Horizontal、Single | Root column、padding8、行间gap8；list可换行、gap8；Vertical改纵排；actions gap12；计数12/18（字重继承），清空13/18、padding3×6、radius6、border0（源码推导单行24高） |
| LinkTag | 默认Medium、Outlined；S/M/L | 主链接与独立关闭目标；外链图标S/M/L盒12/12/14；添加图标/关闭使内容总宽增长 |
| TagSelect | 默认Medium、Filled、显示leading；S/M/L | 触发器沿外壳，Label max108，展开箭头盒12/12/14；popup min-width=max(触发器宽,140)、max240；搜索框固定28、margin8、padding0×8、border1、radius6；空态12/20、padding8×12 |

横向Tag/LinkTag的close目标只有12/14/14盒，内图形再scale0.666667（约8/9.33/9.33），不能把图形尺寸当点击盒，也不能把它写成通用24点击区。Vertical关闭被运行逻辑明确禁用；竖向文字仅两字，内容层宽1em。

| 专用形态 | 默认 / 公开档位 | 固定W×H | 排版、内距和边界 |
| --- | --- | --- | --- |
| Tag Vertical | 各wrapper默认Horizontal，显式Vertical支持S/M/L | 18×36 / 22×40 / 26×44 | padding0；字号12/13/13，行高14/15/15；radius4/6/6、border1；Outlined/Filled400、Solid600 |
| StatusTag业务状态 | 默认Small、Solid；Small/Medium/XL（不是Large） | 宽随内容，高20/24/32 | 左右6/8/12，gap4；12/14、13/18、14/20，均400；radius4/6/6、border1；进行中带点新增6×6点，影响宽度 |
| LearningUnitTag「批量」 | 公共size默认Small，但该专门分支不消费size | 36×20 | 背/前片33×18，错位叠放，radius4；label12/14，源码字重500；无组件外边框 |
| LearningUnitTag「小组作答」 | 同上，固定分支 | 64×20 | 13/18，字重继承；radius6、border1，无显式padding |
| LearningUnitTag「开放型作业2」 | 同上，固定分支；支持appearance | 36×32 | 两行：首行10/12，末行继承12/14；字重继承；radius4、border1；不被S/M/L放大 |
| LearningUnitReminderMark | 默认Medium、showReminder=false；S/M/L | 28² / 32² / 40² | 12/14/600，radius6/6/8；无显式padding/border；提醒盒12，top/right=-4，内部点inset2，不增加布局尺寸但扩大可见范围 |
| ScoredTaskTypeMark | 默认Medium、scored=false；S/M/L | 38×36 / 42×40 / 46×44 | 12/14、未计分600/计分400；radius6/6/8；无显式padding/border；计分角标22×13，右上贴边，8/10字号行高，圆角0/6/0/6；角标不增加外框尺寸 |

来源：[共享外壳与Solid字重](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/tag.scss:25)、[公开默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/tag.contract.js:93)、[图标与关闭](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/tag.scss:140)、[竖向](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/tag.scss:277)、[业务固定分支](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/LearningUnitTag.vue:1)、[固定分支几何](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/tag.scss:308)、[StatusTag轴](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/StatusTag.vue:24)、[StatusTag几何](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/tag.scss:389)、[SystemStatus大档排版](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/tag.scss:473)、[组合与Select](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/tag.scss:504)、[Reminder/Scored几何](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/tag.scss:663)、[Reminder默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/LearningUnitReminderMark.vue:65)、[Scored默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/ScoredTaskTypeMark.vue:67)、[Token值](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1381)、[竖向不允许关闭](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tag/Tag.vue:94)、[家族验收](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/reports/2026-07-27-tag-gate-2-joint-acceptance.md:12)。

### D. Badge / StatusIndicator 与公开组合

这一组已实现，当前机器生命周期全部Gate2 candidate；不能将Figma设计确认当组件Runtime最终验收。

| 对象 | 默认与公开尺寸 | 外框/文字/图标 | 宽度、间距与几何变化 |
| --- | --- | --- | --- |
| Badge Dot | 默认type=dot，size=Medium；Dot忽略size | 固定5×5圆点，不含文字 | 无padding、radius999；装饰指示器pointer-events:none |
| Badge Count/Label | Small/Medium，默认Medium | 固定高16/20，min-width16/20；文字12/12（line-height:1），Count400、Label600 | 左右padding4/6，宽随内容增长；max默认99，溢出显示max+；Label受1–4拉丁大写或1–2中文限制；无显式border |
| BadgeStatus | 无Size，固定Dot+可见文案 | Dot5，文字12/20/400 | gap4，宽/高由内容和换行决定；不是固定20px整体高度合同 |
| StatusIndicator | 默认Medium、custom；Small/Medium/Large | 圆形16/20/24；图标盒12/14/16；无可见文字 | 无padding/border，radius50%，pointer-events:none；Large仅显式业务需要，不能为了更醒目自动选L |
| StatusIndicatorGroup | 默认Medium、bottom-end、count1；S/M/L、最多2个 | 宿主内容决定Root尺寸；标记绝对定位，底部露出4；双标重叠4/6/8 | 不增加宿主布局高度；Slot提供primary/secondary，实例需与group尺寸匹配，group不会自动给slot子组件改size；3种底部位置 |
| ActivityOverlay | 默认active、circle、Medium、showRing=true、loading；S/M/L | 宿主由slot决定；中心indicator S16/M20/L仍20；无可见文字 | Root四边padding4，故按源码其布局框较宿主每轴多8；scrim inset4与宿主同尺寸，ring2贴Root边缘；圆宿主50%，方宿主scrim半径4/6/6、ring半径8；active切换不移除Root padding |

Badge top-end/bottom-end默认把指示器中心放在宿主角上并移出半个自身尺寸，不扩大宿主布局盒；inline-end/standalone时指示器转入正常流，gap4，会影响占用宽高。StatusIndicator的图标盒不是额外点击区；其状态文字在1px隐藏可访问节点，不作为公共1px尺寸来源。

来源：[默认与约束](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Badge/badge.contract.js:41)、[Badge消费与放置](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Badge/badge.scss:1)、[StatusIndicator](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Badge/badge.scss:127)、[Group/Overlay布局](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Badge/badge.scss:208)、[Group真实重叠来源](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Badge/StatusIndicatorGroup.vue:44)、[活动中心尺寸](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Badge/ActivityOverlay.vue:75)、[Token值](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1330)、[L资格与叠放原文](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/StatusIndicator.design.md:68)、[生命周期](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:108)。

### E. Avatar / AvatarGroup / AvatarGrid

生命周期：三项均Gate2 approved-awaiting-publication（2026-08-04）。

| 对象 | 默认 / 公开选择 | 几何、边界与间距 | 排版与内容变化 |
| --- | --- | --- | --- |
| Avatar | 默认Medium、Circle、Display、Online；S/M/L=24/32/40；还支持正数px及显式响应式对象 | W=H固定；padding0、border0；Circle半径=size/2；Square尺寸≤24半径4，否则6；Interactive点击目标就是根头像盒，无额外大点击框 | 图片cover；无可见文字预设；失图转正式默认头像，不改变尺寸；在线/离线与交互边框不改变几何 |
| AvatarGroup | 默认Medium、Display、max9；S/M/L=24/32/40及具名响应式尺寸；不支持任意数字size | 成员固定圆形，重叠10/12/16；无Root padding；N个槽位宽度可按size+(N−1)×(size−overlap)推导；尺寸不随成员数缩小 | 超max时max−1个真人+More；More同头像大小，图标盒14/16/16，mask占盒宽75%；More独立button，不显示+N；整组Interactive另有整体Action |
| AvatarGrid | 没有Size轴，固定40×40；默认Display | Root radius5、padding0、border0；内容inset1形成38×38；1头像38²；2–4头像18.5²；5–9头像12²；内部间隔1，布局位置含6.5/9.75/19.5等计算几何；对应小头像圆角4/2/1 | 仅前9人，无More；空态文字12/20/400，默认“暂无”，建议≤4中文；不缩小字号容纳长文案 |

Avatar及Group交互状态由绝对定位、box-sizing:border-box的1px边界层表达；内边界inset1（单Avatar内圆角为outer−1），不增加Root外尺寸。圆角不是简单“越大越大”：Square Medium32、Large40都使用6。Group成员圆形，不能沿用单头像Square选项。

响应式对象读取视口，阈值xs0/sm576/md768/lg992/xl1200/xxl1600；只在显式给定对象时启用相应切换，取已达到的最高有效断点；尚不能测量视口时回退Medium。此处是Avatar已经实现的局部能力，不自动成为Next全局断点。

来源：[公开尺寸与默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/avatar.contract.js:129)、[Avatar真实尺寸/半径计算](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/Avatar.vue:75)、[Group真实映射](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/AvatarGroup.vue:141)、[Root及边界](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/avatar.scss:1)、[Group叠放](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/avatar.scss:156)、[More盒与glyph](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/avatar.scss:247)、[More图标值](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/AvatarOverflowTrigger.vue:36)、[Grid外框](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/avatar.scss:359)、[Grid布局](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/AvatarGrid.vue:56)、[响应式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Avatar/avatar-responsive.js:9)、[设计值](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Avatar.design.md:56)、[生命周期](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:98)。

### F. Radio / Checkbox / CircularCheckbox 与组、卡片

Radio、Checkbox、CircularCheckbox当前lifecycle均candidate，已实现；RadioGroup/CheckboxGroup是公开组合，复用各自单项及组契约，没有独立Size轴/独立lifecycle。Card是content变体，不是额外公开CardCheckbox组件。

| 主体 | 尺寸与点击关系 | 控件图形及边界 | 排版与gap |
| --- | --- | --- | --- |
| Radio | 无Size；默认content=label；根label内容自适应，图形所在hit canvas24²；整个label（含标题说明）是点击目标 | 控件18²圆，stroke1.4，中心dot8²；hover装饰层23²绝对定位；不把装饰层尺寸当控件尺寸 | 文本14/22/400，图形canvas→内容gap8 |
| Checkbox | 同上，hit canvas24²；默认未选中、非indeterminate | 控件16²、radius4、stroke1.4；check glyph10²；indeterminate替换为8×2横杠，radius2；装饰层21² | 文本14/22/400，图形canvas→内容gap8 |
| CircularCheckbox | 转接Checkbox，同一24canvas及16控件；主动过滤indeterminate | 控件及装饰层radius8（不是另一个尺寸轴）；check glyph10² | 复用Checkbox内容/间距；不是新的24px圆形可见控件 |

| content / group | 宽高与padding | 文字组合与布局 |
| --- | --- | --- |
| label（默认） | width:fit-content、无固定H、无padding；普通单行由max(24canvas,22文字行框)推导为24，但不是所有内容固定24合同 | 标签14/22/400，垂直居中 |
| description | 内容增高，无固定H | 标题14/22/600，说明14/22/400，纵向gap2；canvas顶对齐；标题说明各1行时可推导内容46高 |
| card | CSS width280、四边padding12、radius6；没有卡片外描边；实际高度由内容增高 | 同description排版；标题说明各1行时按border-box推导70高，不能登记为固定70；选中/disabled仅变背景等，不另加外框尺寸 |
| inline-help | 宽高由内容决定，无固定H/padding | 标题14/22/600，同行帮助13/18/400，内部gap8；保留整个label点击语义 |
| RadioGroup / CheckboxGroup | 默认Vertical；gap12；Horizontal时row wrap；Root没有固定高度、没有自身padding | 组内项仍复用上述完整方案；换行改变组高度，不改变单项图形盒 |

来源：[Radio公开content/组默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Radio/radio.contract.js:18)、[Checkbox公开content/组默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Checkbox/checkbox.contract.js:18)、[Radio根/卡片](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Radio/radio.scss:1)、[Radio图形](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Radio/radio.scss:60)、[Radio排版](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Radio/radio.scss:136)、[Checkbox几何](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Checkbox/checkbox.scss:14)、[Checkbox排版](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Checkbox/checkbox.scss:161)、[圆形转接](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Checkbox/CircularCheckbox.vue:1)、[Token解析值](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1227)、[整体点击目标](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Radio/Radio.vue:1)、[生命周期](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:56)。

### G. Switch

默认Medium、unchecked、非loading；S/M/L均已实现。生命周期Gate2 approved-awaiting-publication（2026-07-24）。无内部文字，外部稳定标签及所在行由宿主布局管理。

| Size | 根button固定点击盒 | 可见轨道W×H | 轨道内距 | 滑块直径 | Loading图形盒 | checked水平位移（由源码公式推导） |
| --- | --- | --- | --- | --- | --- | --- |
| Small | 28×28 | 24×14 | 2 | 10 | 9 | 10 |
| Medium（默认） | 32×32 | 28×16 | 2 | 12 | 11 | 12 |
| Large | 44×44 | 38×20 | 2.5 | 15 | 14 | 18 |

Root为border-box，padding0、margin0、border0、overflow:visible，轨道居中；轨道/滑块半径999，无额外外边框。位移=trackWidth−indicatorSize−2×inset，改轨道或滑块必须一起复核。Checked、Disabled、Loading不改变固定盒；Loading图形在既有滑块内，不额外增加宽度。不能把Large44点击盒、轨道20高或滑块15当作同一个“高度”。

来源：[默认与Size含义](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Switch/switch.contract.js:30)、[完整尺寸mixin及根](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Switch/switch.scss:1)、[位移公式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Switch/switch.scss:116)、[Token值](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1250)、[生命周期](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:59)。

### H. 来源差异与后续验证点

1. **数值表与真实消费者并非总同源。** Avatar的24/32/40和radius分支在Vue计算后写入CSS变量；AvatarGroup重叠10/12/16、StatusIndicatorGroup重叠4/6/8也由Vue本地表输出。全局Token表记录Avatar overlap为负数，而运行计算使用正数再由CSS取负，两者含义不同；不能直接替换引用或只修改Token后宣称消费者已变化。来源：Avatar.vue:75、AvatarGroup.vue:141、StatusIndicatorGroup.vue:44及tokens.scss:1327。
2. **Radio/Checkbox依赖宿主box-sizing。** 其control及card没有局部box-sizing声明，当前Demo通过全局`* { box-sizing:border-box }`使18/16控件及280卡片按外框测量。未包含该规则的独立集成中，1.4边框及12padding可能扩大外框；需在未来移植时显式处理，不能把该变化误判为字号问题。[Demo规则](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/demo/App.vue:583)。
3. **已有特殊值不是公共尺度新增授权。** Scored角标8/10、批量标签字重500、Grid内部18.5/9.75/6.5、Switch内距2.5、选择描边1.4、Tag关闭glyph约9.33都是实际来源。8号字不在当前Next已确认字号表，500也不符合当前400/600字体规则，应保留“来源特殊值/待决”记录，不能静默改值或自动增加全局档位。
4. **Tag公开size并不控制所有分支。** LearningUnitTag的批量、小组作答、开放型作业2直接走专用固定结构，不消费size；基础Large Tag仍radius6，提醒/计分Large才使用8。需要保留分支规则，不能统一按字号或高度同比放大。
5. **包围尺寸、正常流占位与溢出可见范围分开。** Badge角标、Reminder红点、StatusIndicatorGroup露出不扩大宿主占位；ActivityOverlay的四边padding4实际扩大Root占位。展示时需要用真实组合核对，不只列一个height。
6. **状态可改变文本宽度而不改变指定高度。** Tabs选中600、Tag Solid600、Scored false/true600→400；这些都可能改变内容占宽。后续跨组件等高/换行测试须用完整方案，不能只比height。
7. **候选不等于不可参考，也不等于最终推荐。** Pagination、Radio/Checkbox、Badge/StatusIndicator源码是已实现证据，须保留候选状态；已验收的Tabs/Tag/Avatar/Switch作为更优先的尺寸来源。响应式Pagination当前只有公开声明/class，缺少组件内消费规则，暂不形成可用自适应方案。
8. 本轮未重新进行浏览器、Figma、外部成熟库或自动测试验证。公式推导值已明确标注，不能以本文替代视觉验收；以上差异不授权修改旧Vue或Next运行代码。

## 4. 内容结构、反馈与浮层的完整方案

### 4.1 来源与成熟度

- Tree / TreeNode：当前生命周期 Gate 2 已通过（2026-08-13），尚未发布；有后续结构修复。依据：[生命周期](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:179)、[确认报告](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/reports/2026-08-13-tree-gate-2-approved.md:5)。当前中文说明的拖拽几何已发现与实现冲突，见后文。
- ManageTree：2026-08-22 Gate 2 已通过；2026-08-23 Runtime 最终视觉补丁已另行确认；未发布。[补丁确认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/reports/2026-08-23-manage-tree-runtime-final-visual-approved.md:7)。Roadmap 将其归为 Pattern，不能当一个普通控件尺寸使用。
- Tooltip / Popover：2026-08-05 Gate 2 已通过，未发布。[当前生命周期](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:118)。
- Empty：2026-08-09 代码 Gate 2 已通过；2026-08-10 Figma Candidate 另行确认，未发布。[最新中文说明](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Empty.design.md:49)。不能只引用 8 月 9 日报告中已被后续取代的字体阻塞。
- DataTable：2026-08-10 曾通过 Gate 2；2026-08-30 固定列阴影等 Runtime 修复后当前机器生命周期为 Gate 2 candidate，未发布。[生命周期](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:142)、[降回候选的原因](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/reports/2026-08-30-layout-recipe-visual-repair-candidate.md:39)。Roadmap 的 Layout 集成/页面审核 verified 不宜自动覆盖组件生命周期。
- EditableCell / RowReorder / QueryTable：当前 Gate 2 candidate；实现、自动证据和部分组合/设计确认已经存在，不能写成全库整体验收或发布完成。[生命周期](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:135)。
- Message：实现已存在，当前 Gate 2 candidate；Roadmap 还明确其未从根入口导出。[生命周期](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:130)、[公开分类](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/roadmap/REFACTOR_ROADMAP.yaml:576)。

### 4.2 尺寸完整方案表

| 组件/Part | 默认与高宽策略 | padding / gap 配套 | 字体配套 | 圆角/边框/图标与点击区 | 源码定位 |
|---|---|---|---|---|---|
| Tree Basic / TreeNode | 默认 density=compact；行 min-height 36，default 44；宽100%，名称单行截断；默认缩进24 | 行左 `4 + depth×24`、右8；结构控件与内容间 gap4；无上下padding | 主文字15/22/400；说明/Meta13/18/400 | 行R6、无实体边框；关系线1；Switcher盒20/图形12；Leading16；Checkbox宿主24；当前Drag IconButton28/16 | [行框](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/tree.scss:75)、[默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/tree.contract.js:116)、[部位](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/tree.scss:259)、[Drag](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/TreeNode.vue:76) |
| Tree Rich | 内容自然增高；richDensity compact/default/spacious，默认default；Basic density仍决定最小高度；右侧Meta/Actions锚定标题首行22轨道；≤520容器宽时Meta重排 | 上下8/10/12；左 `8+depth×24`、右12；强关联4、相关6、模块8；Controls→Content有效8；Content→Meta16；Meta→Actions12 | 主文字15/22/400；说明/Meta13/18/400，支持换行 | 仍使用Tree线/图标，连接线覆盖真实内容高度；无独立固定“Rich行高”表 | [Rich样式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/tree.scss:389)、[设计规则](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Tree.design.md:69)、[窄容器](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/tree.scss:590) |
| ManageTree 外层组合 | 宽100%、内容自然高度；toolbar固定61=60+1；树滚动区域固定216；≤420宽时toolbar auto/min60 | toolbar/surface上下8、左右36，gap12；窄容器左右16；树区域padding8；状态区底16 | toolbar16/24/600、说明12/20/400 | RootR6/border0；Tree区域R6/border1；自身不等价单个“Size” | [区域](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/manage-tree.scss:17)、[树区域](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/manage-tree.scss:84)、[窄容器](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/manage-tree.scss:367) |
| ManageTree 节点与编辑器 | 复用Tree，显式缩进28；局部声明Tree default行高40，但没有传density，因此默认compact最小36仍参与；Rich单行24、上下各8且控制区不高于24时可形成40；存在28px拖拽控件、更多文字或自定义内容时可能更高；活动编辑器继续自然增高 | 编辑器padding8/gap8；字段体gap4；label上下7=(36−22)/2；操作上下4=(36−28)/2；节点动作gap2 | 节点主文字沿Tree15，但局部line24；编辑器label14/22/400、错误12/20/400 | 编辑框R6、中性1内描边；提交/取消与节点操作IconButton28/16；动作默认前2个直显 | [局部几何](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/manage-tree.scss:94)、[Tree调用无density](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/ManageTree.vue:100)、[编辑器](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/manage-tree.scss:229)、[操作](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/ManageTreeNodeActionBar.vue:14) |
| DataTable | 无普通Size/Density API；表头声明height44、普通cell52、Two-line72；HTML table-cell高度并非任意内容固定上限；宽100%+fixed table-layout，列width/minWidth由schema；选择列72；状态区min240；分页区min56 | Table→toolbar/pagination gap8；表头/正文左右12；选择列padding0；工具按钮高32/paddingInline20/gap4 | 普通默认14/继承行高/400；toolbar按钮14/22；cellSlot各按内容组件；不应将EditableCell的15/22/600推广成所有表格文字 | TableSurfaceR8/border1/裁切；cell底边1；sorter槽16×24（完整sort-button为触发区）；状态图标32 | [表格几何](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Table/datatable.scss:1)、[表头/行](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Table/datatable.scss:89)、[列策略](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Table/DataTable.vue:569)、[状态/分页](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Table/datatable.scss:297) |
| EditableCell | 宽100%、min-height52；行内错误min72，错误内容可继续长高；只改变嵌入编辑控件宽度，不覆盖其原生高度 | 主行左右12、gap8；编辑器gap8；提交按钮组gap4；inline-error左右12、末尾padding2 | Root14/22/400；默认display-value15/22/600；inline-error13/18/400 | 自身无统一外框/圆角；内部复用正式Input等；保存/取消Mini Button28；编辑触发IconButton24/14 | [配套样式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Table/editable-cell.scss:1)、[动作](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Table/EditableCell.vue:60)、[已记录原生32控件](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Table.md:415) |
| RowReorder | Pattern，无通用Size；toolbar min40，header min44，row与row-content min52；外层宽100%；手柄列40+内容剩余宽 | 区块gap8；工具动作gap8；行内容左右12；handle居中 | toolbar/header14/22/400；row15/22/600 | SurfaceR8/border1；普通row底1；Drop线2绝对定位不占行高；IconButton24/14，内部拖拽实际图形10.5×5.3667 | [行框](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Table/row-reorder.scss:51)、[图形](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Table/row-reorder.scss:123)、[动作实例](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Table/RowReorder.vue:92) |
| QueryTable | Pattern；整体/查询表单由内容增长；收起默认3列、展开4列；字段宽填充网格；操作区min32；结果继承DataTable | 字段行列gap12；字段错误marginTop4；动作gap8；查询→结果margin20；刷新/错误区gap8 | 输入Select用正式Medium32；操作Button Small32、TextButton Regular；字段错误13/18，刷新/后续错误14/22 | Query无独立外框R；各控件保持自己的完整方案；refresh spinner12；≤760两列，≤520单列/操作换行 | [布局](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Table/query-table.scss:14)、[控件映射](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Table/QueryTable.vue:36)、[动作映射](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Table/QueryTable.vue:103) |
| Message | 无Size；min-height44，width=max-content，max-width=min(480, viewport−32)，内容可换行；closable默认false | 上下8、左右16；closable右8；内容gap8；多条gap8、距视口顶24 | 14/20/400 | R8、实体border1、无shadow；status盒20；close命中28/glyph14；含关闭按钮时44只是min-height声明，不是最终实高 | [样式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Message/message.scss:1)、[Token](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:942)、[设计意图](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/components/Message.design.md:68) |
| Tooltip | 内容自然高度；width=max-content、max250；无Size；默认带箭头 | 上下7、左右16；箭头外占深度6，锚点间隔4由Popup负责 | 14/20/400 | R6/border0/shadow0；箭头14×6，上下与左右方向旋转；单行surface计算34，而带top/bottom箭头layer计算40，不能混成公共高度40 | [样式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tooltip/tooltip.scss:9)、[Token](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1354)、[Popup间隔](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Popup/PopupLayer.vue:88) |
| Popover | 内容自然高度；默认auto宽，可选fixed240；默认无标题/无箭头；无Size | 上下12、左右20；标题→正文4；正文块之间16；Popup间隔4 | 标题15/22/600、正文14/20/400 | R6/border0，完整shadow；可选箭头14×6；内容图片max100%/heightauto；不可把浮层总高当控件高 | [样式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Popover/popover.scss:9)、[宽度API](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Popover/popover.contract.js:39)、[Token](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1367) |
| Empty Mini | 宽70/min高84；插画56×56；强制simple，无说明/动作 | padding0；插画→内容8 | 主文案14/20/400，单行不裁切 | border0/shadow0/无背景，不是容器或点击区域 | [尺寸值](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:955)、[渲染](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Empty/Empty.vue:70) |
| Empty Small | 宽240/min高160；插画238×136；主文案最多2行；内容能驱动增高 | 插画→内容8；内容内部gap4；动作gap8+marginTop12 | 主文案/说明14/20/400 | 同上；原生样式、无父级高度压缩、单行标题且无说明/动作时可形成136+8+20=164；不能将min160写成固定实高160 | [样式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Empty/empty.scss:39)、[内容](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Empty/empty.scss:90) |
| Empty Medium（默认）/Large | 宽280/344，min高240/256；插画280×160/344×197；主文案允许换行 | 插画→内容8；内容gap4；动作内部gap8、marginTop12（与父gap4共同产生16间距） | 主文案16/22/400；说明14/20/400 | 同上；不是新的公共Icon尺寸；完整插画图形等比contain在插画框内 | [样式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Empty/empty.scss:1)、[Token](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:955)、[字体映射](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:1053) |

### 4.3 需保留的冲突和迁移风险（未修复）

1. **Tree 拖拽尺寸：中文设计说明与当前实现冲突。** `Tree.design.md:67` 写24/16、两侧−4px补偿、实际六点约6.9×10.9；当前 `TreeNode.vue:76` 使用28/16，SCSS无该负margin，`tree.visual-contract.spec.js:214–219`还明确锁定28/16和不得负margin。应暂把当前实现28/16与旧文字24/16分别登记，不能宣称已确认单一完整方案。底层svg的实际图形不得由槽尺寸冒充。另该段写叶节点不保留Switcher空位，但当前TreeNode.vue:65在showLine=true（默认）时仍渲染20px switcher-placeholder，且TreeNode顺序为Switcher在Drag之前；不要按旧文字提取默认排列/内容起点。
2. **Tree高度不仅被CSS使用。** `Tree.vue:270`将虚拟行高写为36/44，驱动起止索引、总占位、translateY和键盘滚动。只改Token会造成错位。自动关闭虚拟化的检测是 `!hasNodeDescription`（:273），不仅要改声明还需核对所有允许的可变内容；本轮不执行修复。
3. **ManageTree的40不是简单的公用Tree default。** 它声明 `--rain-tree-row-height-default:40`（manage-tree.scss:95），但调用Tree不传density（ManageTree.vue:100），默认仍compact。Rich模式只有单行24且最高控制区不超过24时，24+上下各8才推导为40；如果启用28px Drag Handle，controls自然高可到28，行内容可到44，另有长文/自定义Slot时继续增长。Basic则仍受compact min36控制。Tree.vue:207–210按Slot存在与否判定Rich，ManageTree.vue:145的node-actions只在有对应Slot/字段或动作时提供；并非所有模式恒定Rich。不能把“ManageTree全部行固定40”当已验证事实。
4. **min-height ≠ 最终几何。** Message在原生样式、closable=true、内容单行且没有外部高度/Token覆盖时，root为横向inline-flex、box-sizing:border-box、height:auto，关闭按钮是flex:none、高28、padding0/border0，因此外框推导为max(44,28+8+8+1+1)=46；flex-shrink不会把其纵向28缩到26。多行时会继续增高。Empty Small在原生样式、没有父级强制高度压缩、无说明/动作且标题单行时，root为纵向inline-flex、高auto/min160、padding0/border0；插画flex:none高136、内容单行高20、直接子项gap8，因此推导max(160,136+8+20)=164。内容虽然默认flex-shrink:1，但上述无确定高度压缩条件下不存在负剩余空间。以上均为有条件静态推导，不是本轮浏览器测量或对所有消费场景的实高断言。
5. **RowReorder有父子下限叠加待测。** 行min52且底边1，内部row-content又min52；对有底边的自然高度行，静态结构提示可能形成53而非设计说明中的52，最后一行去掉底边。需要未来测量实际行框再定是否冲突，不能凭两个“52”字面检查宣称一致。来源：row-reorder.scss:78、118；设计意图Table.md:463。
6. **Table的Typography尚不能按完整固定行高导出。** DataTable根指定14/400但不指定line-height，table字体继承，普通Cell跟随；状态区strong使用 `--rain-font-weight-semibold`（datatable.scss:318），当前全局tokens.scss未定义该名称（只定义strong600）。本轮只登记源码缺口，不推定最终浏览器字体或静默改成600。
7. **现有尺寸语义不可归并。** 44同时是Table表头、Tree某密度下限、Message下限；40是RowReorder工具条下限、ManageTree局部行内容及组合值；52/72属于表格内容行/行内错误。相同数值不意味着共用一个“ControlHeight”决策入口。
8. **间距公共档位不足不等于旧样式应四舍五入。** Tooltip上下7属于来源几何；RowReorder glyph10.5×5.3667属于矢量形状；ManageTree工具栏61是60+border1；以上不建议直接加入公共Space，也不允许为符合新表擅自改值。Empty实际动作前间距为父gap4+margin12，需要记录结构而不是只抽取12。

## 5. 布局、容器与页面组合的尺寸方案

这些对象决定内容区域、滚动、留白与组合关系，不能把其高度、宽度或 Density 名字直接并入控件 Size。

### 5.1 来源状态

Container、PaneGroup 当前生命周期均为 Gate 2 已通过、尚未发布。PageShell / PageHeader / Section 的 S1-002、FormSection 的 S1-003 在当前 Roadmap 为 verified；因此不能只看早期合同中的 candidate 字段而写成“尚未完成”。后续 Layout 1.0 页面迁移、Source Block 消费链及整体集成也分别有 DS-LAYOUT-003 / 004 / 005 的 verified 记录，但这些不自动为每个 Pattern 补出一个独立组件 Gate。

WorkbenchShell、FilterBar、CollectionShell、MasterDetail、ReviewWorkbench 的本地合同仍保留 candidate / not-exported 记录；本节将它们作为已经实现、可追溯的组合来源，保留合同与后续集成证据的范围差别。本次不重验这些历史 Gate，也不审计另一工作树中尚在推进的 Layout 1.1。

来源：[组件状态](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/component-lifecycle.js:272)、[S1-002](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/roadmap/REFACTOR_ROADMAP.yaml:1013)、[S1-003](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/roadmap/REFACTOR_ROADMAP.yaml:1111)、[Layout 1.0 集成](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/docs/roadmap/REFACTOR_ROADMAP.yaml:2579)、[WorkbenchShell 合同](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/layout/WorkbenchShell/workbench-shell.contract.js:47)、[CollectionShell 合同](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/patterns/CollectionShell/collection-shell.contract.js:61)。

### 5.2 内容区域与留白

表中的标题排版写明字重；其他未在局部声明字重的区域按宿主继承，不假设每个区域都自行锁定 400。

| 对象 | 高宽策略 | 间距与配套 | 边界及响应式责任 | 来源 |
| --- | --- | --- | --- | --- |
| Container | 根 border-box、宽100%；高度随内容；purpose 必填无默认。内容最大宽：fluid 不限制、reading/form 960、report 1120、dashboard 1600 | 四边 padding：compact 16 / default 24（默认）/ comfortable 32；内容居中 | 自身无背景、边框、阴影，不提供卡片外观；padding 轴不是控件密度 | [样式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Container/container.scss:1)、[默认与用途](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Container/container.contract.js:20)、[数值](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:898) |
| PageShell | 根 min-height:100vh；Topbar 声明 height64；有 Topbar 时 Body min-height=100vh−64，无时100vh | 品牌、上下文、用户区各左右24；根排版14/22/400 | Topbar 底边1；64是页面结构尺寸，外框还须沿实际 reset 核对，不是 ControlHeight | [源码](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/layout/semantic-layout.scss:1)、[64来源](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:913) |
| PageHeader | 宽100%、内容自适应高度；标题24/32/600 | 文案与动作gap16；文案内部6；动作gap12且wrap | ≤560视口时标题与动作纵排；无固定高、局部外框或内边距 | [源码](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/layout/semantic-layout.scss:54) |
| Section | 内容自然增高；readable子区域max960；标题16/24/600、说明12/20 | Header / Content / Footer 之间24；Heading Copy内部16；操作及Footer内部12 | surface=container时padding32、border1、radius10；≤560视口padding16。radius10当前由8+2×1推导，不是直接引用新Radius/10 | [源码](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/layout/semantic-layout.scss:93)、[变量关系](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:922) |
| FormSection | 复用Section，无固定表单区高度 | 内容/反馈子区域gap24；Footer自身padding-top20与上边框1；动作gap12；仍受Section父级gap24影响 | 不能只抽出20当成内容到动作的全部距离；内部控件维持自己的完整方案 | [源码](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/patterns/FormSection/form-section.scss:1) |
| Stack / Inline / FormGrid / Actions / Separator | 均由内容形成高度；FormGrid默认2等分列，SpanFull跨全部列；Separator线高1 | Stack默认24、small12、medium16；Inline/Actions gap12且wrap；FormGrid gap24 | 这些是现有CSS布局配方，不是额外Vue组件；≤900视口FormGrid单列；≤560 Actions的align-items改stretch | [源码](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/layout/layout-recipes.scss:32) |
| WorkbenchShell | grid行auto / auto / minmax(0,1fr)，无固定Header高；根14/22/400 | Header/Scope上下16、左右24 | 默认container surface：border1、radius10；Header/Scope各底边1；Body保留min-height0让内部管理滚动 | [源码](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/layout/WorkbenchShell/workbench-shell.scss:1) |
| FilterBar | 控件区与动作区同排，下方已选条件；控件默认3等分列；已选/动作区min32 | 主网格和控件网格gap12；已选/动作gap8；已选文案12/20 | 声明≤760容器条件下纵排和单列；不能把这里的32理解成全部后代控件固定高度；匹配的查询容器由实际嵌套决定 | [源码](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/patterns/FilterBar/filter-bar.scss:1) |
| CollectionShell | width100%、内容自然增高；默认split、container surface | 主区域gap24；toolbar/bulk/footer内部gap12；toolbar上padding16+线1；bulk上下8左右12 | 外壳padding32/border1/radius10，声明≤560容器时padding16；bulk radius6/border1；bulk的min-height引用未定义变量，不能解析为32或36 | [源码](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/patterns/CollectionShell/collection-shell.scss:1)、[默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/patterns/CollectionShell/collection-shell.contract.js:9) |
| MasterDetail | 根及各责任区域height100%、min-height0，依赖有明确高度的祖先；列宽由所选布局配方决定 | pane-controls上下8左右12、gap12；empty-selection四边32 | pane-controls底边1；内部PaneGroup负责分栏，内容或Pane负责滚动；不是固定高卡片 | [源码](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/patterns/MasterDetail/master-detail.scss:1) |
| ReviewWorkbench | 根height100%、min-height0；inspector沿父级高度，Body可增高 | sticky底部动作区padding16、gap12 | 动作区上边框1，局部z-index1；它的留白、吸底和滚动归属是一组方案，不是给全部Footer统一16 | [源码](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/patterns/ReviewWorkbench/review-workbench.scss:1) |

### 5.3 PaneGroup 与已有多栏配方

PaneGroup 根和Track为 border-box、宽100%、min-width/min-height为0；PaneSlot自身透明、无边框/阴影、radius0、不裁切内容。它要求显式的Pane配置，没有全局默认导航宽或检查器宽。Fixed Pane消费指定宽度，Fluid Pane消费指定最小宽，收起的Pane退出布局。来源：[Pane样式](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/PaneGroup/pane-group.scss:1)、[无业务宽度默认](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/PaneGroup/pane-group.contract.js:878)。

| 关系 / 配方 | 既有几何 | 必须一同保留的规则 |
| --- | --- | --- |
| flush / divider | 正常gap0；divider视觉宽1；可拖拽resizer视觉宽1、命中带宽12 | 命中带通过绝对定位扩展，不占12的栏间宽；键盘步进8、大步24；不是把分割线Token加粗为12 |
| gutter | 显式density=dense/standard/comfortable，目标gap8/12/16；有效容器宽<1400上限8，1400–1599上限12，≥1600上限16；取目标与上限的较小者 | 此density只用于gutter；flush/divider不接受density。它与新组件区域Density不同，不能直接按同名字串连接 |
| supporting-navigation | navigation固定220，main最小680 | 两栏持续显示；默认navigation内容滚动归属与main Pane滚动分开；Table消费另有滚动Profile |
| list-detail | main最小720；inspector初始/最小320、最大480 | inspector可拖拽/收起；不能为扩大详情使main小于720；各区域Container显式fluid/compact16 |
| three-pane-workbench | navigation固定224；main最小760；inspector初始/最小320、最大480 | 收起顺序inspector→navigation；compact状态先收起inspector，恢复还需满足全部宽度约束，不仅比较一个断点 |
| LayoutRecipeHost | application-shell + viewport画布高100vh；PageShell带Topbar时为100vh−64 | 主画布横向溢出与各Pane滚动归属配套；默认验收下限与具体Recipe匹配，不由这些内宽相加直接发明新全局断点 |

来源：[分割线与命中带](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/PaneGroup/pane-group.scss:69)、[gutter计算](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/PaneGroup/pane-group.contract.js:752)、[Separation校验](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/PaneGroup/pane-group.contract.js:458)、[键盘步进值](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:909)、[supporting-navigation](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/layout/layout-recipes.contract.js:95)、[list-detail](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/layout/layout-recipes.contract.js:182)、[three-pane](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/layout/layout-recipes.contract.js:264)、[画布高度](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/layout/layout-recipes.scss:9)。

### 5.4 布局来源中的缺口与维护依赖

1. **缺失变量。** CollectionShell bulk区域使用 `--rain-control-height-md`；当前整棵 `src` 只有该引用，没有定义。不能用其后缀md猜出一个高度。记录为源码缺口，本次不修复。[定位](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/patterns/CollectionShell/collection-shell.scss:44)。
2. **派生圆角与线宽耦合。** Section radius由outer radius与两倍line-width组合；将来修改公共线宽会间接改变Section圆角，即使没有修改任何radius值。这是已有依赖，不是新体系必须继承的组织方式。[定位](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/styles/tokens.scss:927)。
3. **断点和尺寸不只有CSS来源。** PaneGroup gutter在JS与CSS各有1400/1600判断，Pane宽和最小宽还在Recipe合同；Avatar另有局部视口断点。只修改一个全局Token表无法保证实际组合随之变化。
4. **滚动和响应式属于布局上下文。** height100%需要祖先高度约束，min-height0影响收缩与滚动。容器查询应沿实际匹配祖先核对，不能把CSS里出现一个阈值当作所有独立消费都已验证；本轮没有运行新的窄屏测试。
5. **复用现有资产，避免虚构。** 旧 `src/components` 没有独立通用Card、Dialog、Drawer实现。本次用Section/Container/组合外壳记录页面模块，Popup只记录已经实现的定位与表面。Layout Demo、业务Golden Page和私有Source Block可说明组合，不另立全局Token源。

## 6. 可承接的关系与尚未裁决的内容

### 6.1 按用途整理已有重复值

下表是来源归纳，不是新公共Token注册表，也不表示可以只覆盖单个高度。上文各组件表是完整取值和例外的依据。

| 用途 | 已有代表方案 | 后续处理依据 |
| --- | --- | --- |
| 普通输入与同排操作 | Input/InputNumber的28/32/36；QueryTable实际选择Input Medium32、Button Small32 | 优先核对真实同排配套；不能默认同名Medium即等高 |
| 按钮与文本操作 | Button28/32/36/48；TextButton20/24/26；IconButton合法方盒/图标盒17组合 | 同组可以有不同几何；对齐和点击需求由组合管理 |
| 导航、数据行与选择行 | Tabs32/38/38/42；Table表头44、内容52/72；Tree最小36/44；MenuItem按内容32/52及增高 | 分开维护导航、数据、层级、菜单用途，不命名成同一ControlHeight |
| 内部紧密关系 | gap2/4/6/8；如标题说明2、图文4、Input8、TextArea正文到Footer6 | 数值可引用公共值，用途和组件默认关系保留在配方 |
| 控件组与内容区关系 | FormItem纵向8/横向16；QueryTable字段12、查询到结果20；Section模块24 | 区分控件内部、组内、区域间，避免区域Density覆盖每一层gap |
| 容器留白与布局宽度 | Container16/24/32；Section32/16；reading/form960、report1120、dashboard1600 | 留白和内容最大宽分别管理；同为960也保留reading/form用途关系 |
| 浮层和内容自适应 | Tooltip上下7、Popover上下12、PopupSurface上下8；Message最小44且含关闭可能增高 | 自然高度由内容、内距、边界和可用空间共同决定，不加一个固定浮层高度档 |
| 点击区域与可见图形 | Switch、Radio/Checkbox、IconButton、PaneGroup resizer各有独立宿主规则 | 点击盒不能被图形大小代替；已有小命中区不表示可用于所有触屏场景 |

当前已确认Space表为 `0 / 2 / 4 / 6 / 8 / 10 / 12 / 14 / 16 / 18 / 20 / 24 / 28 / 32 / 36 / 40`。它能表达上表大部分普通正向留白；Tooltip7、计算型补偿、嵌套gap叠加、头像重叠和矢量小数继续按来源用途处理。**本次没有增加Space48、Radius0/5、FontSize8或任意新的行高/字重。**

### 6.2 来源冲突的后续处理顺序

| 类型 | 本次已定位对象 | 进入后续方案前需做的事 |
| --- | --- | --- |
| 设计与当前实现不一致 | Select尾部；Tree拖拽、Switcher占位与控件排列 | 基于已确认设计、后续变更和实际组合裁决目标；将文字、契约、实现对应起来 |
| 一个值有多个维护入口 | TextArea、Tree、Avatar/AvatarGroup、StatusIndicatorGroup、PaneGroup | 决定各用途的唯一有效来源，让CSS与行为消费同一几何或明确派生；本次不新建生成器 |
| 源码声明不能等同最终外框 | Input/Radio/Checkbox的reset依赖；ManageTree；Message；Empty；RowReorder | 后续采用/改造对应组件时测量具体组合与状态，确认盒模型、内容和滚动条件 |
| 引用缺口或局部能力未落实 | CollectionShell未定义高度变量；DataTable未明确普通行高及未定义semibold引用；Pagination responsive | 先修正来源或明确目标，不靠猜测填进公共配方 |
| 旧专用值超出当前公共表 | Tag8/10与10/12、小字500、AvatarGrid内部圆角及小数、1.4描边 | 保留组件例外或提出有证据的新规则；不静默四舍五入，也不把所有旧数值全局开放 |
| 新公共高度与Density映射 | 当前仍未确定 | 以完整来源为基础挑代表组合验证，保持显式Size优先；不从Next当前高度或旧数值并集直接得出答案 |

“源码梳理完成”不等于上述差异已经修复。以上均已归档，不再作为遗漏的尺寸调查；后续进入设计裁决、改造或验证时按对象处理。

## 7. 覆盖与核验

### 7.1 组件覆盖映射

下表与当前生命周期44项逐项对照；没有将同一个对象的Rain别名、内部Part重复计算。8个额外公开衍生单列在对应家族内。

| 家族 | 生命周期中的命名对象 | 额外公开衍生 / 内部配套 | 详表 |
| --- | --- | --- | --- |
| 按钮 | Button、TextButton、IconButton | Button的链接/Loading形态 | 第2节A |
| 输入与表单 | Input、SearchInput、InputNumber、TextArea、FormItem | Clear、反馈、搜索、数字步进、AutoSize、Footer | 第2节B/C |
| 选择和菜单 | Select、Segmented、MenuItem | 内部PopupMenuSurface、PopupLayer | 第2节D |
| 单选复选与开关 | Radio、Checkbox、CircularCheckbox、Switch | 公开RadioGroup、CheckboxGroup；四种内容形态含Card | 第3节F/G |
| 导航 | Tabs、Pagination | More、设置、跳页组合 | 第3节A/B |
| 标签 | Tag、SystemStatusTag、CheckableTag、CheckableTagGroup、LinkTag、TagSelect | 公开LearningUnitTag、DifficultyTag、GroupTypeTag、StatusTag、LearningUnitReminderMark、ScoredTaskTypeMark；内部BusinessTag | 第3节C |
| 头像 | Avatar、AvatarGroup、AvatarGrid | 内部AvatarOverflowTrigger | 第3节E |
| 附加标识 | Badge、BadgeStatus、StatusIndicator、StatusIndicatorGroup、ActivityOverlay | Dot/Count/Label、角标与叠放 | 第3节D |
| 树 | Tree、TreeNode、ManageTree | Basic/Rich、节点编辑与操作 | 第4节 |
| 表格 | DataTable、EditableCell、RowReorder、QueryTable | toolbar、two-line/error、分页及查询组合 | 第4节 |
| 反馈与浮层 | Tooltip、Popover、Message、Empty | 箭头、关闭、插画、内容和动作；Message非根导出 | 第4节 |
| 基础容器 | Container、PaneGroup | PaneSlot、divider/resizer | 第5节 |

另完成PageShell、PageHeader、Section、FormSection、WorkbenchShell、FilterBar、CollectionShell、MasterDetail、ReviewWorkbench、LayoutRecipeHost，以及Stack/Inline/FormGrid/SpanFull/Actions/Separator和三套多栏Recipe的尺寸来源梳理。它们按布局/组合处理，不混入44项组件生命周期计数。

未另做全量Icon资产和插画内部矢量坐标审计；本次覆盖的是这些资产的宿主尺寸、必要光学例外和命中区。页面Demo、Golden Page、私有Source Block不作为新增通用组件或公共尺度。没有将旧库不存在的通用Card、Dialog、Drawer列为“已完成组件”。

### 7.2 本轮验证边界

本轮文档检查结果：

| 检查 | 结果 |
| --- | --- |
| 生命周期与根入口覆盖 | 44项生命周期、8个额外公开衍生，52个命名对象全部有映射；内部与布局对象另列 |
| 文档结构与来源引用 | 审计及原规划的表格、标题层级、300个本地引用路径与有效行号检查通过 |
| 已确认公共表保护 | 原规划3.4.1之外内容未改；字号、行高、圆角、Space与其他已确认规则保持不变 |
| 运行源码保护 | 2,552份已快照的Classic源码与Next运行/工具源码逐一比对，未变动 |
| 独立交叉复核 | 三组分别交叉抽查控件、标识/导航、内容结构与布局的关键事实和覆盖；未发现待修正的实质错误；并非全量运行重验 |
| 实测与验收 | 本轮未进行浏览器测量、组件测试、Figma重验或Human Gate；来源冲突与条件推导仍按正文登记 |

以上结果只证明本轮文档交付与来源核对，不代表组件问题已经修复、公共高度已经确认或可以发布。

下一步可以基于这份完整来源讨论“哪些组件方案共享哪些高度/间距，以及Density如何选择默认组合”；公共数值与实施仍需独立决定。相关规划：[Typography与布局Token设计](../plans/2026-09-05-typography-and-layout-token-design.md)。

