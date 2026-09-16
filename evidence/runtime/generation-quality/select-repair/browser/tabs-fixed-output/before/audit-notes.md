# Tabs 视觉与交互审查（仅检查与讨论）

日期：2026-09-11。对象：当前 `http://127.0.0.1:5181/#tabs`，用户提供的七张截图，以及现行组件、Token、设计与测试。此次没有修改组件、Token、测试、治理登记或既有证据，没有重跑或改写此前 864 态验证。以下建议均未成为新设计合同。

本轮在 Codex 内置浏览器检查：默认 741×739 视口、360×800 窄屏；三外观 × 三尺寸 × 四向的 36 组实际 DOM 几何，在 Light/Dark 各检查一次；另实际操作长名称选择、键盘焦点、Contained 首尾选择、Soft 当前项与焦点、More 选择与草稿恢复。两位只读审阅者分别检查几何/测试缺口和设计/Token 合同。只使用本轮现场结果及用户提供截图作为视觉证据。

## 1. 用户问题的理解

| 用户问题 | 理解与当前判断 |
| --- | --- |
| Line 指示线两端方头 | 需要指示线自身的圆头；当前圆角确实为 0。已有触发项轮廓圆角不能代表指示线圆角。 |
| 三种外观的纵向宽度不统一 | 同一列中的点击区域、hover/selected 绘制区域应具有共同边界；不能让较长内容撑破列宽。内容对齐是之后的独立决定。 |
| 纵向长名称只能横向滚动 | 希望固定合理列宽、允许最多两行、超出用省略号，并保留完整名称入口；纵向列表不应依赖横向拖动来辨认项目。 |
| 左右两侧的内容对齐 | 左侧长名称左对齐是明确可讨论方向；右侧右对齐是提案，还需比较多行、图标、数量和混合文字的阅读效果。 |
| Contained 四周留白不等 | 应检查底板外沿到实际选中背景的距离；首项、末项、横向、纵向和各尺寸要共用清楚的边距规则。 |
| Soft 选中像二级按钮 | 需要拉开“当前位置”和“执行动作”的视觉区别；不能仅凭两者颜色值不同就认为角色已清楚。 |

## 2. 实际复现结果

| 步骤 | 检查内容 | 健康状况与证据 |
| --- | --- | --- |
| 1 | Line 水平与纵向长名称、选择和键盘 | 需要修正。指示线无圆头；长项撑宽；左侧长项选中线和焦点轮廓被裁。见 01–03。 |
| 2 | Contained 首项、末项和纵向内容组合 | 需要修正。水平外缘留白左右 4px、上下 2px；纵向绘制层超出底板。见 04–06。 |
| 3 | Soft 当前项、未选中焦点、左右侧 | 需要设计调整并修正布局。当前位置与按钮有相同的蓝字/浅蓝填充/完整描边语义，Focus 又增加一个显著蓝框。见 07、08、12。 |
| 4 | Light/Dark 完整几何与窄屏 | 两主题的 18 组纵向组合全部存在内容撑宽。360px 页面未产生整页横向滚动，当前面板剩余 168px；加宽导航列时必须重新安排小屏空间。见 09、11 及两个 matrix JSON。 |
| 5 | More 选择和回到已访问面板 | 本轮抽查正常。菜单显示图标、名称和数量128；选择后显露连续区间，回到课程概览仍保留临时草稿。检查后已清除临时文字。见 10。 |

### 确定的几何与交互问题

1. **纵向使用了相互冲突的宽度规则。** 导航宽 120px，但按钮保留 `min-width:min-content`；长内容会突破 `width:100%`。当前纵向左右内边距各 24px，使可用内容宽度进一步减少。课程设置中的三个实际宽度为 120、138、192px；完整示例中最长项达到 188.8–212px。
2. **横向滚动是内容越界的结果。** 纵向视口用了双轴滚动；长文字的省略号可能落在视口之外，所以用户看到硬裁切。不能仅用 `overflow:hidden` 把越界藏起来。
3. **左侧 Line 的当前位置标记会消失。** 点击“学生与教学班”后，指示线位于 x179–182，而视口右边界为 x172，整条线在可见区域外。它跟随实际按钮右缘，而非固定列的右缘。
4. **键盘焦点边框会被裁断。** 方向键聚焦“课程资源与在线教学设置”时，按钮为 192px、视口为 128px（含滚动留白），焦点轮廓右边在视口外。全文 Tooltip 能出现，但不能补救缺失的焦点边界。
5. **较短名称也可能越界。** Contained 38 的底板宽120、内部列表宽116；“待评作业(0)”“课程资料”“学生(128)”的实际按钮分别约125.20、126、125.21px。名称、图标、数量都必须进入宽度预算，不能只看中文字符数。
6. **Contained 左右内缩被计了两次。** 底板左右先留2px，选中绘制层四边再退2px；首项左侧与末项右侧的净留白均为4px，上下为2px。首末彼此对称，问题是横纵边距不等。

### Soft 的视觉判断

Soft Selected 与二级按钮都使用 Text/Brand/1、600字重、6px圆角、浅蓝填充及完整蓝描边。Tab 的填充/描边分别为 Fill/Brand/Alpha/4、Border/Brand/3；按钮为 Fill/Brand/Solid/4、Border/Brand/2。数值不同，但同屏仍传递相近的形状信号。

手动键盘模式下，当前项与焦点项可以不同：本轮当前内容为“课程概览”，方向键把焦点移到“待评作业”。这种行为有意保留，不能为简化视觉而取消焦点。需要设计同时呈现的两个状态，参见 [W3C Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)。

## 3. 建议的讨论框架

首先分别定义四层：**整条导航占据的空间 → 每个 Tab 的点击区域 → hover/selected 背景 → 内部图标、名称和数量**。统一列宽解决前两层，背景内缩解决第三层，内容对齐解决第四层。仅修改文字对齐无法解决前面的越界。

### 宽度差异对应的策略（建议，未确认）

这里的“内容宽度”包含图标、名称和数量；还要结合项目数量及可用空间。

| 内容宽度差异 | 横向 | 纵向 |
| --- | --- | --- |
| 几乎相同 | 自然宽度已接近一致；少量固定分区可以同宽，不必铺满整页。 | 整列同宽；短、纯文字可以居中。 |
| 有差异但不大 | 少量底板分区适合同宽；项目较多时自然宽度更节省空间。 | 整列同宽，统一内容起点或中心，明确对齐整组内容还是文字。 |
| 差异很大 | 自然宽度并限制超长项，避免最宽的一项迫使所有项变宽；保留 More/Scroll。 | 合理固定列宽，名称最多两行，超出省略，列表只纵向滚动。 |

不建议让组件根据实时文字长度自动在这些模式间切换；数量更新、字体加载和容器变化不应让整组突然重排。

### 两行高度

28/32/38 目前是单行整体高度，其行高为18/20/22。两行文字本身就需36/40/44px。两行方案需要完整的新高度规则，不能缩字或塞回旧高度。

推荐先比较“整组统一两行容量、短名称垂直居中”和“每项按一/两行自适应”两种方式。前者列表节奏与选择背景更稳定，后者更省空间但每项高度不同。若延续当前上下留白，两行高度推导约46/52/60px，仅是讨论起点，需视觉对照后决定。

### 左右对齐

左侧长名称建议左对齐。右侧短名称可右对齐；长名称尤其两行时，我倾向仍保留共同左侧阅读起点，右对齐作为明确选项。位置与文本对齐不必自动绑定，也不应镜像图标/名称/数量的阅读顺序。

图标与数量还需决定：对齐整个内容组，还是对齐名称列？此前缺少图标时不留空位的规则与“名称始终在同一竖线”可能冲突，应明确取舍。数量仍须保持独立、不被截掉或无意掉到下一行。

### Soft 的三个方向

1. **建议先看最小调整：** 保留浅底、蓝色选中文字和字重，去掉选中态常驻完整描边；Hover/Pressed不重新画出按钮式完整边框。Focus继续使用已有独立轮廓。
2. 若仍难表达当前位置，可对照“浅底＋靠面板侧的短标记”，但它会更接近Line，属于更明显的外观改动。
3. 保留当前完整描边、只调整颜色深浅，成本较低，但预计较难解决与二级按钮相似的问题。

这些方向尚未生成新视觉稿，也没有获得确认。

## 4. 尚待验证或设计决定

- Tooltip 当前只检测文字自身是否横向溢出，不能识别全部祖先裁切；中等长度或两行截断后的触发条件需要专门验证。本轮确认长名称 Tooltip 可出现，未伪称所有标题提示都失败。
- 横向外盒已经预留普通/600字重的最大宽度，本轮首末选择时底板总宽保持366.390625px；未把“加粗一定导致宽度跳变”列为确定缺陷。很长的英文、中英混排和临界 More 预算需单独样本。
- 360px当前页面不产生整页横向滚动；若加宽纵向列，需决定是否转横向、改紧凑入口或由宿主安排响应式布局。
- “分区说明”当前列的是禁用项目，可讨论是否改为更明确的入口名称。
- 演示中的“保存备注”只改变保存提示，源码没有在再次编辑后清除提示；这是演示文案/反馈问题，未计作Tabs核心缺陷，也未在本轮实际触发保存。
- 当前检查不覆盖真实触屏、原生浏览器缩放、Safari/Firefox或真实读屏；没有新的颜色或WCAG通过结论。

## 5. 为什么此前测试没有发现

此前72×12矩阵主要对固定短名称“学生”的高度、字体、颜色及指示线相对Tab的位置作断言；保存的18张外观截图都为顶部。它没有断言“纵向每项与背景被列宽包含”“必要选择标记与Focus留在视口内”“纵向没有意外横向滚动”“首尾外沿内缩相同”。这部分属于此前审查遗漏。历史通过结果不能用来否定本次截图和现场复现。

只读源码定位：

- `packages/ui/src/styles.css:993` 双轴滚动；996 底板左右内缩；1007 绘制层内缩；1014 指示线无圆角；1024–1032 纵向列宽、最小宽度与指示线边缘。
- `packages/ui/src/tabs/tabs.tsx:217` 横向普通/选中宽度预留；307 纵向与水平的测量宽度分支。
- `packages/ui/src/tabs/tabs-full-label.tsx:32` 文字自身溢出判定。
- `tests/e2e/tabs.spec.ts:416` 固定短项目状态采样；445 指示线相对按钮几何。

下一轮优先讨论：统一纵向占位与两行行高 → 内部对齐与图标/数量 → 底板绘制边距 → Soft 的当前位置语义 → 各方向/尺寸和边界场景对照。继续保持只讨论，直到用户另行授权修改。

## 6. 本轮截图

### 步骤1：Line 与纵向选择/焦点

![初始页面，水平指示线为方头](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/runtime/tabs-visual-refinement/before/01-initial.jpg)

![长项选中，蓝色指示线落在视口外](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/runtime/tabs-visual-refinement/before/02-vertical-selected-edge.jpg)

![键盘聚焦长名称，全文提示出现但焦点右边被裁](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/runtime/tabs-visual-refinement/before/03-vertical-keyboard.jpg)

### 步骤2：Contained 首尾和纵向

![首项选中，外缘左右4px上下2px](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/runtime/tabs-visual-refinement/before/04-contained-first.jpg)

![末项选中，外缘同样左右4px上下2px](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/runtime/tabs-visual-refinement/before/05-contained-last.jpg)

![纵向实际内容组合撑出底板](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/runtime/tabs-visual-refinement/before/06-contained-vertical.jpg)

### 步骤3：Soft 的选中、焦点及右侧

![Soft当前项与二级按钮](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/runtime/tabs-visual-refinement/before/07-soft-selected.jpg)

![当前项为课程概览，焦点为待评作业](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/runtime/tabs-visual-refinement/before/08-soft-focus-selected.jpg)

![右侧纵向排列](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/runtime/tabs-visual-refinement/before/12-right-vertical.jpg)

### 步骤4：窄屏与深色

![360px下内容面板剩余168px](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/runtime/tabs-visual-refinement/before/09-mobile-vertical.jpg)

![深色Soft及相邻二级按钮](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/runtime/tabs-visual-refinement/before/11-dark-soft.jpg)

### 步骤5：More

![窄屏菜单保留名称、图标与数量](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/evidence/runtime/tabs-visual-refinement/before/10-more-menu.jpg)


归档说明：原截图工具返回 JPEG 字节，本次归档仅将误标的 .png 扩展名更正为 .jpg，字节与原图一致，没有重绘或压缩。
