# G2–G3 首批家族样板 · Design QA

日期：2026-10-08。范围：Toggle Group、Command、Sidebar 与共享文档展示底座。

**Findings**

本轮对照未留下可执行的 P0/P1/P2 视觉问题。此结果仅是本批实现自查，实际页面的人审仍为 `awaiting-user-review`，不授予完整对比度、全库或发布验收。

对照历史：

| 优先级 | 先前发现 | 修复 | 修复后的证据 |
| --- | --- | --- | --- |
| P1 | 文档的宽泛标题与输入规则把 Sidebar 分组标题、Command 输入字号改成 16px；页面深色只改变部分局部表面 | 文档标题限于自己的标题；原生表单样式限于直接子元素；主题随文档生命周期设置并恢复 | `browser/command-iab-final.jpg`、`browser/sidebar-iab-final.jpg`、`browser/command-dark-compact-iab.jpg` |
| P2 | Command 有结果时仍留下一个带内边距的空结果容器，产生多余空白 | 空容器不显示，有空结果文案时保留状态反馈 | `browser/command-focus-iab.jpg`；浏览器检查同时验证正常与空结果 |
| P2 | Command/Sidebar 已有自身边框，文档预览又包一层边框和留白 | 这两类组合使用自身边框 | `browser/command-iab-final.jpg`、`browser/sidebar-iab-final.jpg` |
| P2 | Sidebar 当前项有浅品牌底，文字却被 Playground 的通用链接重置覆盖为普通深色 | 文档内按 Sidebar 普通/当前状态恢复其既定颜色 | `browser/sidebar-focus-iab.jpg`；当前项实测浅色 `rgb(15,85,223)`、深色 `rgb(124,165,255)` |

前三项在首次/中途浏览器审阅中阻止交付；最后一项在源图与当前 Sidebar 对照时发现。修复后重新捕获相同浅色、默认密度、默认内容状态，并在同一图像输入中打开源图与三页整页、细节证据。最后一次 Toggle 整页捕获曾不完整，已用 1440×1000 的完整捕获替换；该捕获问题不计作设计修复。

**Comparison target and evidence**

- Source visual truth：`evidence/runtime/g2-g3-family-refinement-2026-10-08/approved-visual-target.png`，1512×1032 px，浅色评审画布。
- Implementation：`http://127.0.0.1:5173/#toggle-group`、`#command`、`#sidebar`，由 `card-v2/apps/playground` 实际服务。
- 实现 CSS viewport：1440×1000；devicePixelRatio：1；整页视口截图均为 1440×1000 px，IAB 保存为 JPEG；无缩放处理。
- 窄屏：390×844 CSS px / 截图 px；默认密度与浅色。另检查深色、紧凑密度、Sidebar 收起与当前项保留。
- 默认状态：Toggle 的列表、姓名/分数、左对齐选中；Command 第一项键盘高亮且未执行，发布资料禁用；Sidebar 教学总览为当前页。
- Full-view comparison：源图与 `browser/toggle-group-iab-final.jpg`、`browser/command-iab-final.jpg`、`browser/sidebar-iab-final.jpg` 在同一次比较输入中共同打开。完整 Toggle 捕获修正后再与源图共同打开。
- Focused comparison：同一输入还包含 `browser/toggle-group-focus-iab.jpg`（1016×166）、`browser/command-focus-iab.jpg`（480×330）、`browser/sidebar-focus-iab.jpg`（800×360）。用于读取边界、选中、图标与快捷键的细节。
- 所有 `browser/` 路径均相对 `evidence/runtime/g2-g3-family-refinement-2026-10-08/`。

源图是三列评审画布，实际交付是三个现有文档页。按批准计划比较组件结构、状态与层级；使用现有 Rain 字体、14px 正文、36px 默认控件及图标合同。未把评审图的放大字体、画布间隔或像素尺寸升级为全库默认，也不宣称完整画布的逐像素复制。

**Required fidelity surfaces**

| 表面 | 结论 |
| --- | --- |
| 字体与层级 | 文档 28/36 标题、18px 节标题；控件正文 14/22，Sidebar 分组 12/18、标题 16/24。保留 Rain 字体与系统中文回退。正文、辅助内容、分组、命令与快捷键的光学层级成立；窄屏自然换行，无横向页面溢出。源图字体为生成图示意，依批准计划采用现有字体合同。 |
| 间距、布局与边界 | 连体单选只有一个外框，分离多选没有额外底板；Command 搜索、分组、执行提示对齐；Sidebar 展开 220px、收起 64px，图标居中，当前页区域清楚。所有尺寸为本地组合或已有控件轴；390px 上依内容堆叠。 |
| 颜色与 Token | 白色/中性底、浅品牌持续选择、中性色临时高亮、弱禁用态与源图方向一致；使用现有 Rain Category。共享文档的 40 条颜色声明逐条绑定角色与源码并通过校验，未降低已有字段边界的角色/阈值。完整共享组件与跨浏览器对比度验收独立保留。 |
| 图像、图标与资产质量 | 实现是可操作 DOM，未把源图当背景。图标使用 Rain catalog 中可用的正式资产：对齐、文件、文件夹、上传、撤销与工作台导航；没有新绘制 SVG 或用形状替代资产。生成图中的通用图标以现有 Rain 资产规范化，18px 清晰，无拉伸或截图放大。 |
| 文案与内容 | 三组主要内容与源图一致，辅助状态反映真实本地操作。Command 为 inline 列表，底部只说明方向键与 Enter；不显示不存在的 Escape 关闭行为。快捷键只在示例内执行；文档保留使用边界与 API。 |

**Runtime review**

- IAB：命令筛选、空结果与方向键执行实操；Sidebar 页面切换、收起与当前位置保留实操；深色/紧凑与三页窄屏实看。
- Chromium 自动化：6 个场景通过，覆盖选择、边界/字号/尺寸、命令执行与禁用、导航收起、深色与 8 个相邻文档入口的窄屏。
- 控制台：审阅页 `error` / `warn` 捕获为空，保存 `browser/iab-console.json`。
- 相邻旧导航：`#navigation-v042` 实际加载并截图，原组合仍正常呈现；未声称所有旧导航场景的像素回归通过。

**Open Questions**

- 没有阻止本批交付的视觉歧义。需要用户对真实三页做视觉验收，再决定后续家族的推广；批准示意图没有自动转移成真实实现验收。
- Safari、VoiceOver、完整状态/主题对比度以及全部 G2/G3 家族仍未在本批验收。

**Implementation Checklist**

- [x] 捕获并共同打开源图、整页与细节实现。
- [x] 修复 P1/P2 问题并再次比较。
- [x] 检查浅/深、默认/紧凑、展开/收起与窄屏。
- [x] 保留现有交互、API、来源与历史验证记录。
- [x] 专项自动化、类型检查、构建与文档颜色声明检查通过。
- [ ] 用户对实际组件的视觉验收。

**Follow-up Polish**

无本批必须修复的 P3 项；其他家族的问题留在各自批次，不追加无关能力。

final result: passed
