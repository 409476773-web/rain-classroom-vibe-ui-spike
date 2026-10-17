# G4 展示页设计差距研究

2026-10-11 · Typography / Item / Progress · 研究与讨论，未改实现。

本轮检查当前本地页面、实际渲染样式和实现；对照 shadcn 官方 Item 页面、Linear 官方设计解析中的产品对比图，并阅读 Radix Themes、Atlassian、Carbon、Notion 官方资料。SaaS 参考来自公开产品资料，不是登录后的完整产品体验评测。

主要判断：基础能力已经能够支持更多表达，当前差距集中在示例组合、状态表达、展示编辑，以及文档样式对示例的干扰。上一轮实现把较多精力放在能力、接口、来源和检查上，对成品场景的构图与反复视觉对照投入不足。自动验证不能证明这些设计目标已经达到。

## 当前页面：三步检查

### 1. Typography：已有文字角色，展示与实际排版仍需修正

![Typography 当前页面](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/research/g4-design-gap-2026-10-11/01-typography.png)

优点：标题、正文、辅助说明已经区分；UI、Reading、Data 的用途有说明。问题：三个角色拆在独立大框里，缺少同一内容的字阶比较和完整版面；十种预设主要出现在 API 表中，用户需要把参数自行想象成视觉结果。说明文字中还混入字体分发、HTML 语义等实现信息。

本轮直接测得一个实际偏差：

| 文本 | 预设行高 | 实际段落行高 |
| --- | --- | --- |
| UI default | 22px | 24px |
| UI supporting | 20px | 24px |
| UI caption | 20px | 24px |
| Reading default | 26px | 24px |

Reading 的 article 容器是 26px，但文字所在的 p 是 24px。原因是 [component-doc.css:11](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/apps/playground/src/docs/components/component-doc.css:11) 对所有示例后代段落统一指定行高；此前浏览器测试只测了 Reading 容器，未测内部段落。原始测量：[typography-measurements.json](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/research/g4-design-gap-2026-10-11/typography-measurements.json)。这是文档宿主覆盖问题，不能据此认定 Foundations 的字阶本身不合适。

候选方向：以课程导读展示标题—引言—正文—引用—元信息的连续关系；另用可直接比较的字阶样本解释已有预设，保留关键数字与中文单位的字体边界。

### 2. Item：结构齐全，内容与空间的关系偏弱

![Item 当前页面](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/research/g4-design-gap-2026-10-11/02-item.png)

优点：名称、文件属性、独立动作已有稳定区域。问题：很短的内容占据很宽的条目，动作被推到远端；预览框、条目边界、图标小框连续嵌套，各层职责不够鲜明。长标题示例直接解释“自然换行”“不会截断”，使它更接近验证样本。分组中的两行使用不同表面，但没有足够业务语义解释这种差异，难以评估真实列表的持续对齐和密度。

双层边框并非通用错误：shadcn 也这样组织预览。关键区别是内层内容限制在较合适的宽度，预览区与代码区职责清楚，重复行的媒体、姓名、次级信息和动作保持同一节奏。[官方 Item](https://ui.shadcn.com/docs/components/base/item)

![shadcn Item 当前官方预览](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/research/g4-design-gap-2026-10-11/ref-shadcn-item.png)

![shadcn Item Group 当前官方预览](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/research/g4-design-gap-2026-10-11/ref-shadcn-item-group.png)

候选方向：先用三条真实形态的课程资料建立列表节奏，再展示成员或通知等不同用途。明确名称、文件属性、状态和动作各自的位置；同组对象先保持一致，再让真正有意义的状态产生差异。现有 Parts 可以承载这项探索，尚无证据需要新增公共 API。

### 3. Progress：数值语义清楚，任务感与状态辨识不足

![Progress 当前默认页面](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/research/g4-design-gap-2026-10-11/03-progress.png)

优点：已知进度有任务名、百分比、数量；未知进度没有编造百分比。问题：1280px 视口下，三个进度组件都宽 966px，短任务名称与数值相距很远。任务主体中并列放置“完成下一批”“模拟失败”“重新开始”等演示控制，业务体验与测试控制混在一起。未知状态使用静止的居中蓝色块，视觉上可能被误读为某种进度，需通过后续样稿或用户观察验证。

失败状态还存在动作优先级问题：原主按钮禁用后仍保留较大的按钮形态，“重试同步”则是较轻的文字动作；错误说明与常规反馈的视觉区分较弱。这里需要调整宿主组合中的状态与恢复动作，不应让基础 Progress 接管业务流程。

![Progress 当前失败状态](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/research/g4-design-gap-2026-10-11/03-progress-current-error.png)

候选方向：围绕一个明确任务组织名称、完成量、轨道、状态和相关动作；演示控制放到独立区域。未知、暂停、失败、完成各自有可辨识的状态表达；保留真实完成量，尊重减少动态效果偏好。

## 从成熟系统学到什么

| 来源与本轮证据 | 可核实的做法 | 对 Rain 的启发（研究判断） |
| --- | --- | --- |
| [Radix Themes Text](https://www.radix-ui.com/themes/docs/components/text)，官方文档 | 文字大小同时配合行高、字距；示例涵盖 UI、长阅读、换行。 | 展示完整的排版关系，中文内容须独立检查，不照搬英文数值。 |
| [Atlassian Typography](https://atlassian.design/foundations/typography)，官方文档 | 按 Heading、Body、Metric 的用途解释体系，并考虑段落间距。 | 从读者的任务解释预设；保留现有字体和品牌规则。 |
| [Carbon Progress bar](https://www.carbondesignsystem.com/building-blocks/core/components/progress-bar/guidelines)，官方文档 | 标签与辅助信息靠近轨道；宽度服从内容，避免为填满窗口而过度拉长；未知进度不提供精确量化。 | 进度应进入合适的任务容器；错误说明和恢复动作就近组织。Carbon 的错误态填满红条属于其自身模型，不适合直接替换 Rain 的真实完成量。 |
| [Linear 2026 界面更新](https://linear.app/now/behind-the-latest-design-refresh)，官方文字及对比图 | 为任务主体保留注意力，减弱非核心导航和多余边界的权重。 | 精致感来自有依据的主次与细节配合。无需照搬深色主题、字体或低对比度。 |
| [Notion Projects & Tasks](https://www.notion.com/help/guides/getting-started-with-projects-and-tasks)，官方文档 | 状态、负责人、截止日期和完成比例共同描述任务或项目。 | 一个好示例应让对象、属性、状态、进度与动作形成完整关系。 |

![Linear 官方 2026 侧栏对照图，非本轮登录产品截图](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/research/g4-design-gap-2026-10-11/ref-linear-2026-comparison.png)

![Linear 官方 2026 边界对照图，非本轮登录产品截图](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/research/g4-design-gap-2026-10-11/ref-linear-2026-borders.png)

## 共通原因与建议次序

1. **文档宿主干扰示例。** 通用段落选择器已经改变实际排版；相同预览框也把不同内容推成相近宽度与节奏。后续应先修正覆盖，再判断预设本身。
2. **示例按能力条目组织，缺少成品场景。** 长文案、未知比例、最大值等验证点必要，但不应承担首个代表作的职责。先提供一个可直接理解与复用的场景，再解释变体和边界。
3. **视觉重量没有充分跟随信息角色。** 文档小节标题比示例中的对象名称更强；演示按钮与恢复动作没有完全随任务状态调整。需要同时校准标题、内容、元信息、动作、边界和留白。
4. **展示与复用存在距离。** 每页先排全部示例，之后才是使用边界、API 和整页调用代码；可复制代码也不完整对应首个交互示例。已有 DocExample 支持独立代码，可以优先使用现成能力。
5. **视觉判断没有充分进入实施循环。** 当前设计方法库已经有 V04 文字层级、D02 空间关系、I01 信息角色；本轮发现更像执行与验证不足，无需为此再造一套方法库或大量 Token。

建议下一轮先处理已证实的排版覆盖，再做一个 Item“课程资料列表”代表样例；确定内容层级、容器比例和动作关系后，再将有效规则用于 Typography 和 Progress。公共默认或 Token 的变化应由实际样例暴露的缺口决定。本报告中的方向尚待讨论，未实施、未晋升为全库规范。

## 证据边界

- 本轮保存并复核了三个本地页面、一个现存失败状态、shadcn 官方 Item 的两个视图，以及 Linear 官方文章的两个对比图。主要本地视口 1280×720；现存失败状态截图为用户原标签页当时的视口。
- 页面标题周围的轮廓是路由切换后的焦点状态，未将其认定为视觉缺陷。
- 未重新进行全量交互、移动端、深色、真实 Safari 或读屏测试；截图不能证明无障碍合规。未知进度误读是设计风险判断，尚无用户实验数据。
- 只新增本目录的研究资料；未修改组件、Token、现有验证结论或发布状态。
