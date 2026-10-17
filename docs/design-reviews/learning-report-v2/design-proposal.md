# 学习报告 · 整页设计方案 V2

日期：2026-09-20。状态：用户已确认留白与蓝色缺口图修订，并授权实施；现有 `#learning-report` 已按本稿接入页面私有实现，用户已于 2026-09-20 确认当前报告页视觉调整完成（包括 25 条批注和最后六项微调）。共享组件、全局 Token 与 Figma 文件未修改。实施及验证见[运行记录](../../../evidence/runtime/learning-report-a/v2/verification.md)，最终确认见[反馈与验收记录](../../../evidence/runtime/learning-report-a/v2-feedback/verification.md)。

视觉稿：[留白与蓝色缺口图修订版](visual-proposal-refined.png)；[保留的第二张原稿](visual-proposal.png)。这是生成式高保真视觉稿，不是已经运行的页面截图；本文件给出精确的数据、尺寸目标与行为规则。

## 设计目标与依据

教师先了解本期水平与变化，再看班级差异和提交缺口，最后核对具体记录。以现有两班、六周汇总组织内容，丰富感来自不同的问题、恰当的图形及协调的视觉层次。

参考：[培养方案对比分析](https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e/?node-id=2827-93616)、[课程交叉分析](https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e/?node-id=2827-96656)。本稿保留近邻配色、语义图标、局部柔光、统一章节入口和图形／解读组合；不导入参考业务的网络、雷达、矩阵或 AI 身份。

## 1. 整页阅读顺序

| 阶段 | 用户需要知道什么 | 主要表达 | 不重复放入的内容 |
| --- | --- | --- | --- |
| 第一屏：本期学习概览 | 本期水平怎样，期间如何变化 | 两组重点指标＋一幅总体趋势 | 重复复述首末值的观察条、常驻一整行的周次读数 |
| 第二屏：班级与提交分析 | 班级差在哪，缺口集中在哪些周 | 紧凑双指标班级对照＋未提交柱图＋就近解释 | 被强制撑高的双班卡片、以已交比例替代缺口图、孤立的通用建议卡 |
| 第三屏：周度明细 | 如何核查上层发现 | 12 条同口径记录、组合份数列、未提交列 | 只有 12 条数据仍添加分页、为每列都加装饰 |

“三屏”指阅读阶段，不是固定分页或每章强制占一屏。1440px 画布、约 1200px 内容宽度为视觉提案基准，首章结尾尽量在常见桌面首屏内。具体折叠位置需后续真实组件渲染验证。

## 2. 第一屏：本期学习概览

### 构图

- 保留白色全局页头：教学分析／大学物理 · 学习报告／统计口径，以及进入作业批改。
- 范围工具栏处于正文前：班级与周期靠左，低优先级记录数与刷新靠右。Select 使用已有 36px 尺寸。
- 第一章使用一个明确承载面，标题在卡内左上，采用统一的小型蓝色切面装饰。
- 上部两组重点指标约 1:1，各约 148–164px 高，间距 20–24px；下部总体趋势使用全宽。
- 本章高度随合理的留白自然增长，不为塞入首屏而挤压内容；辅助控制和解释不占去主图的一半空间。

### 两组重点数据

| 分组 | 主数据 | 第二层 | 必要辅助 |
| --- | --- | --- | --- |
| 成绩表现 | 本期平均分 **80.9 分** | 首末周变化 **+15.0 分** | 按已交份数加权；首末指所选范围首周至末周，不是上期比较 |
| 作业完成 | 本期提交率 **80.8%** | 已交 **252** / 312 份 | 未提交 **60** 份 |

两组共享“语义图标与标题—主值—关联值”的构图和基线。蓝／蓝紫浅染色区分主题，白色语义图标放在有轻微内高光的渐变底座中。装饰集中在这里，不蔓延到全部表格单元格。

### 总体趋势

- 默认平均分，一条总体加权折线，轻面积承托；纵轴保持 0–100，避免夸大起伏。
- 六周读数为 73.0、76.0、79.0、82.0、85.0、88.0；静态首尾直接标签，中间读数由交互呈现。
- 小尺寸指标切换置于本图标题右侧，沿用现有 32px 局部 RadioGroup 外观；只影响此图。
- 图例、量纲、刻度、数据标签分别保持稳定层级。轴刻度浅、主线与重点标签清楚。
- 周次定位保留为图内交互：悬停／键盘查看，固定周次只保留读数状态，不改变全页范围。常驻的大下拉与整行重复读数不进入静态构图；实际交互细节在实现前确认可访问方式。
- 不再加一条只重复“73.0 变为 88.0”的观察横幅。

## 3. 第二屏：班级与提交分析

### 构图与比例

一个白色章节承载面，统一标题。上半部是紧凑比较，下半部是缺口定位，两者用轻分隔连接。

| 区域 | 比例与尺度 | 表达 |
| --- | --- | --- |
| 上半部：班级对照 | 两指标区约 1:1；整体约 170–200px 高 | 左均分、右提交率；每区固定一班在上、二班在下 |
| 下半部：提交缺口 | 主图／解释约 7:3；约 260–300px 高 | 左六周未交柱图；右缺口集中度与核查建议 |

本章高度由紧凑比较、图表与解读自然决定。双班记录不再为了迁就六周记录而制造大段空白，比较区与缺口区之间保留明确呼吸空间。

### 班级对照

| 指标 | 一班 | 二班 | 差值 |
| --- | --- | --- | --- |
| 平均分 | 79.9 分 | 81.9 分 | 二班高出 2.0 分 |
| 提交率 | 78.8% | 82.7% | 二班高出 3.8 个百分点 |

- 两项指标同时出现，各自明确单位、0–100共同尺度，不设置不明口径的综合排名。
- 同类短横条、直接数值与就近差值，比较值沿用用户确认的 16px，避免重新放大为 KPI。
- 班级颜色贯穿两项对照及明细色标。固定班级顺序，不能按不同指标来回交换位置。
- 3.8 个百分点由未舍入值计算，不用屏幕上的 82.7−78.8 得到 3.9。

### 提交缺口

- 图形主体为未提交份数：第 1–6 周依次 **15、13、11、9、7、5**。
- 六根细柱统一使用明亮的蓝色系，顶部微圆、上实下浅、精确值在柱顶；遵照本轮反馈，不使用紫色。颜色不表示风险等级或不同班级。
- 纵轴从 0 起，默认示例可用 0／5／10／15／20；实际范围变化时按真实上限选刻度，不截断基线。
- 右侧浅染色解读区：本期未提交 **60 份**；第 1–2 周占 **46.7%**；辅助读数 **28 / 60 份**。
- 其下“核查建议”：先核对第 1–2 周的未提交情况，再确认是否需要跟进。它是下一步核查方向，不推断原因，不等同于催交或风险名单。
- 不出现未交学生人数、逾期结论、知识点诊断或 AI 来源标记。

未提交柱图为目标表现。公共图表尚未建设时，可在本页原型以现有图表能力验证；若本阶段仍不建设该图，使用同数据的紧凑表和未交数量条承接，视觉重点始终对准未交数。

## 4. 第三屏：周度明细

统一章节标题与弱记录数，六列为：周次／班级／已交·应交／未提交／平均分／提交率。

| 周次 | 班级 | 已交 / 应交 | 未提交 | 平均分 | 提交率 |
| --- | --- | --- | --- | --- | --- |
| 第 1 周 | 一班 | 18 / 26 | 8 | 72.0 | 69.2% |
| 第 1 周 | 二班 | 19 / 26 | 7 | 74.0 | 73.1% |
| 第 2 周 | 一班 | 19 / 26 | 7 | 75.0 | 73.1% |
| 第 2 周 | 二班 | 20 / 26 | 6 | 77.0 | 76.9% |
| 第 3 周 | 一班 | 20 / 26 | 6 | 78.0 | 76.9% |
| 第 3 周 | 二班 | 21 / 26 | 5 | 80.0 | 80.8% |
| 第 4 周 | 一班 | 21 / 26 | 5 | 81.0 | 80.8% |
| 第 4 周 | 二班 | 22 / 26 | 4 | 83.0 | 84.6% |
| 第 5 周 | 一班 | 22 / 26 | 4 | 84.0 | 84.6% |
| 第 5 周 | 二班 | 23 / 26 | 3 | 86.0 | 88.5% |
| 第 6 周 | 一班 | 23 / 26 | 3 | 87.0 | 88.5% |
| 第 6 周 | 二班 | 24 / 26 | 2 | 89.0 | 92.3% |

- 已交分子较深，应交分母较浅。未提交列可以直接核查上层发现。
- 数字列对齐，同周两行作为轻量组，以浅分隔区分周次。
- 只保留一处有意义的提交率微图，不让表格变成图形拼盘。
- 默认 12 条无需分页；记录数随筛选更新。
- 章末集中显示示例数据、作业份数而非去重人数、统计口径等必要说明。

## 5. 颜色与材质规则

| 角色 | 视觉目标 | 与现有系统的关系 |
| --- | --- | --- |
| 页面背景 | 清透的浅蓝／淡蓝紫，较白色章节深一档 | 从 Rain `background-neutral-4` 起校准 |
| 章节表面 | 近白、12px 圆角；桌面内边距约24–32px，章节间距约24–28px | 从现有间距档位组合，按实际内容校准，不把位图尺寸直接当成 CSS |
| 主文字／数据 | 深蓝灰；单位次一级 | Rain neutral 文本角色；关键值使用现有 Data 字体，普通中文使用 UI 字体 |
| 操作与选中 | 稳定品牌蓝 | 保持品牌 #1561F8 的职责，不覆盖全局主题 |
| 概览主题装饰 | 成绩蓝、完成蓝紫；相同光源与透明度关系 | 页面局部组合现有配色，不注册新全局色板 |
| 班级身份 | 一班明亮青蓝，二班柔和紫罗兰；相近视觉重量 | 映射现有分类配色与局部浅色层；在真实渲染中校准明度／饱和度 |
| 总体趋势 | 单一品牌蓝线，轻面积 | 与班级身份分开；图例明确为总体，单班时改用对应班级色与名称 |
| 未交数量 | 统一蓝色渐变；数量由长度表达，不使用紫色 | 依靠“未提交作业份数”量纲识别，不借危险色赋予业务含义 |
| 辅助文字 | 浅蓝灰但可读 | 保留必要说明；不再普遍降低所有文字对比 |

章标题统一采用卡内左上“小型切面＋标题＋弱范围”，不混用编号与不同位置的章标题。章内标题不再重复切面。高光和柔光集中在概览；比较条、图例、表格保持清楚。视觉稿颜色是组合目标，正式映射仍需在真实组件中核验，不能把位图取色当成新 Token。

2026-09-20 用户选择第二张稿的方向，并强调留白和呼吸感。修订重点：扩大章间距与标题下方留白，概览与趋势之间适度放松，缺口图与解读之间增加间隔，解读块之间及表格行内保持舒适间距。增加自然文档高度，不拉伸字体或图形，也不恢复此前班级对照中的大块无效空白。二班的紫罗兰身份色、作业完成概览的浅紫主题保持，仅缺口柱图改为蓝色。

## 6. 筛选、状态与窄屏

- 班级／周期作用于全页。概览、趋势、双指标班级对照、缺口与明细保持同一范围。
- 趋势的平均分／提交率开关仅改变该图，不收起缺口，不把第二章半宽变全宽。
- 单班时把“班级对照”改为“班级表现”，只显示所选班的两项指标，去掉两班差值和空位置。
- 第 4–6 周示例：85.1 分、86.5%、135 / 156、缺21份；解读范围应变成“第4–5周”，不能残留第1–2周。
- 零提交的均分为“—”，零应交的提交率为“—”；缺测保留缺失状态，不画零或确定连线。
- loading／失败／空集沿用现有组件和恢复行为，不能留旧结论冒充当前范围结果。
- 内容不够容纳时按语义堆叠：两概览组→主趋势→均分比较→提交率比较→缺口主图→解读→明细。手机图和解读变上下，不压小全部字体。
- 明细允许局部横滚，整页不横滚。确切换列临界点由实际标签长度和组件宽度验证，不把设计图宽度变成硬断点。

## 7. 实现边界与评审重点

可复用：Select、FormItem、RadioGroup 页面配方、Popover、Button、IconButton、Table、Empty、布局、图标和现有 Recharts。业务数据、筛选及选中状态仍由页面拥有，不建立第二套状态。

这次不建设公共图表系统、不扩充业务数据、不改共享组件、不写 Figma、不发布、不做 Git 写操作。视觉图用于审核整体构图、颜色和层级；精确数值、行为规则以本文和现有数据源为准。

评审看四件事：首屏是否迅速抓住主要结果；第二章能否直接看懂差异与缺口；各章是否既有不同表达又属于同一视觉家族；明细是否能核查前文发现。获得方向反馈后，再进入现有组件的页面实现与浏览器验证。

## 8. 视觉稿制作记录

使用内置 Image Gen。输入包括当前报告的实际首屏截图、用户提供的两份完整 Figma 截图；先生成一张整页稿，再对同一稿做一次章节层级清理。未使用外部 API／CLI，未生成多套候选。本文 2–6 节是创建稿的内容及视觉约束。

保留的第二张原稿为 1024×1536 PNG；按本轮反馈编辑后的视觉稿为 948×1659 PNG。修订增加自然页面高度，并把提交缺口柱图改为蓝色。两者用于整页构图评审，非 1:1 CSS 尺寸验收。已查看三章结构、双班指标、六周缺口与完整明细；文字说明中的 12 条记录此前逐项核对了现有数据源。没有运行应用构建或把静态图宣称为已实现交互。

第二张原稿的章节清理提示词：

> Refine this ONE full-page Chinese learning report visual proposal. Preserve the layout, Chinese content, EXACT numeric values, data geometry, margins, class colors, overview decorative assets, outer page background, all 12 table records, and the three major white section surfaces. It is the same concept, not a new variant. Render sharply at high resolution, ideally 2048×3072, maintaining the current 2:3 page aspect ratio, full page visible. Do not crop, stretch, add sections, add charts, add text or change any values.
>
> MAKE ONLY THESE TARGETED CLEANUPS:
> 1. There should be EXACTLY THREE faceted blue diamond section markers total: before '本期学习概览', '班级与提交分析', and '周度明细'. REMOVE the three extra smaller diamonds before inner subtitles '整体变化', '班级对照', and '提交缺口'. Those subtitles should be ordinary compact semibold dark text aligned with their corresponding content.
> 2. Remove the thin enclosing rounded rectangular borders around the inner '整体变化' chart and the inner '班级对照' region and inner '提交缺口' chart/interpretation region. These are content subdivisions of their white parent section, not separate nested cards. Keep the faint simple horizontal separator between class comparison and missing-assignment analysis; keep the faint vertical separator between the two class comparison metrics. Keep the small tinted right-hand interpretation inset because it has a distinct reading role. Keep both soft-tinted overview groups and all three big white chapter surfaces unchanged.
> 3. Make the active '平均分' chart toggle match a restrained 32px segmented control: very pale blue selected background, fine blue outline and blue text, not a solid saturated button. Inactive '提交率' remains white with neutral text.
> No other changes. Preserve the exact table numbers, chapter headings, chart axes, and insights. Do not inadvertently modify '二班高出 3.8 个百分点', 46.7%, or any other statistical value. This is a design review mockup; do not add that sentence inside the UI.

本轮留白与蓝色缺口图修订提示词（输入为第二张原稿）：

> Refine the attached full-page Chinese learning report mockup. This is the user's SELECTED SECOND DESIGN, so preserve its design direction, three chapter structure, hierarchy, icons, palette roles, all Chinese labels, every numeric value, chart proportions and 12 table rows. Deliver ONE revised complete page, no alternate concepts, no device/browser frame.
> 
> USER FEEDBACK TO APPLY:
> A) Improve whitespace and breathing room throughout the page.
> B) ONLY the six bars of the '提交缺口' chart must change from purple to BLUE. Use a luminous cornflower/sky blue from the page's existing blue family, softly stronger at the top and fading toward a pale blue baseline. Keep all six the same blue color, not six different colors. These bars represent missing counts 15,13,11,9,7,5. Preserve correct bar heights, baseline0, Y-axis0/5/10/15/20, numbers and week labels. Do NOT recolor the violet identity of 二班 in class comparison/table, or the lavender completion overview group. The nearby interpretation inset remains very pale cool blue with navy text and brand-blue 46.7%.
> 
> WHITESPACE DIRECTION:
> Keep approximately the same desktop content width and horizontal proportions. Compose on a somewhat taller canvas, approximately 1024×1792 (or equivalent proportional high resolution), extending the document flow rather than stretching any glyph, icon, bar or chart. Maintain natural readable font sizes. Show the entire finished page with footer. Increase the gaps between the three major white chapter surfaces from the current tight ~14px to ~24–28px. Give chapter content about 26–30px padding, and clearer 20–24px space below headings. Give the overview groups a comfortable gutter and padding without inventing empty space. Increase separation between overview cards and the '整体变化' subheading. Let the line chart breathe vertically a little, retaining the 0–100 axis, six values73.0/76.0/79.0/82.0/85.0/88.0 and endpoint labels. Add deliberate space above/below the divider between class comparison and submission gaps. Keep class comparisons compact, not enormous same-height empty cards. Separate gap chart and its interpretation panel with a clean ~28px gutter, maintaining roughly70:30 proportion. The interpretation panel's three blocks should have comfortable 16–20px breathing room, paragraphs with normal readable line height, no squeezed bottom edge. Increase table row vertical padding slightly, keeping pairs of rows grouped by week and the thin separators. Do not pad all areas uniformly or create huge vacant areas. Aim for calm, refined, airy but still information-rich editorial composition.
> 
> INVARIANTS:
> Exactly THREE small blue faceted diamond chapter markers ('本期学习概览', '班级与提交分析', '周度明细'); no markers on inner subtitles, no nested borders around charts. Overview80.9分, +15.0分,80.8%,已交252/312,未提交60; class means79.9/81.9 and rates78.8%/82.7%; differences2.0分 and3.8个百分点; gap total60份 and第1–2周占46.7%,28/60份. Retain all12 table records unchanged. Keep existing subdued outlined/pale-blue segmented chart toggle. No new features, cards, insights, mock data, decorative patterns, nav or AI badges. Do not introduce purple in the submission-gap bars. Preserve the maturity and restrained richness of the selected design.
