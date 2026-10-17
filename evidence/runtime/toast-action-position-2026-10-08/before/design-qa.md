# G2–G3 剩余家族样式精修 · Design QA

日期：2026-10-08。用户授权：继续优化 G2、G3 下其他组件的样式。

本轮完成 Spinner、Skeleton、Toast、Context Menu、Menubar、Navigation Menu、Hover Card、Scroll Area、Sheet 的共享候选样式与现有示例；Kbd、Breadcrumb 仅协调现有展示组合。延续首批 Toggle Group、Command、Sidebar 的已确认方向。Button Group、Toggle 与 Breadcrumb 已接受的共享组件未重做。

**Findings**

已审阅范围没有遗留的可执行 P0/P1/P2 视觉问题。此结论是实现自查；真实页面的人审为 `awaiting-user-review`，不代表完整对比度、全库或发布验收。

| 优先级 | 发现 | 最终修复与证据 |
| --- | --- | --- |
| P1 | Navigation Menu 展开内容挤大工具行；无效的宽度 utility 没有约束内容 | Root 内联 Viewport 在触发器下方定位，补足实际最小宽度；320px 资料示例保持独立浮层。`navigation-menu-iab.jpg`、`navigation-menu-open.png`；浏览器断言展开前后工具行高度一致。 |
| P1 | Skeleton 浅底几乎不可见；精修中错误使用不存在的间距变量又令标题骨架高度为零 | 使用已有中性透明色阶与真实行高；课程记录和列表在加载前后保持同一结构。`skeleton-iab.jpg`、`skeleton-loaded-iab.jpg`；记录均为 480×84px，列表总高度也一致。 |
| P1 | Toast 与文档主题分别控制，切换页面深色后通知可能仍用浅色主题 | 文档主题变化传给同页 Toaster，保留真实队列、计时与撤销。`toast-light-iab.jpg`、`toast-dark-iab.jpg`、`toast-dark.png`。 |
| P2 | 菜单正文比例偏大、禁用前景接近普通文字、展开触发器品牌底过强、分隔线存在双边界 | 统一 14/22 正文、36/30px 控件轴、弱禁用和中性临时状态；分隔线只留一条细边。`context-menu-iab.jpg`、`menubar-iab.jpg`，深色紧凑窄屏回归。 |
| P2 | Hover Card 宽度 utility 无效，身份、说明、辅助信息层级不清，名字前景偏弱 | 真实 320px 上限与可用视口限制；名字使用主要前景，说明和元信息弱化，正式 Rain 资产建立身份区。`hover-card-iab.jpg`、`hover-card-dark-compact-narrow.png`。 |
| P2 | 示例使用裸输入、简单文字块或重复外框，难以看出组件与实际内容的关系 | Kbd/Sheet 复用 Input/Textarea；滚动区、菜单目标、加载记录采用结构化内容和正式图标；已有自身框架的示例移除重复预览边界。`kbd-iab.jpg`、`sheet-iab.jpg`、`scroll-area-iab.jpg`、`spinner-iab.jpg`。 |

修复过程保留红色失败日志、相应修复及最终通过日志。没有通过删除行为断言、降低边界角色或修改历史验收来掩盖问题。

**Comparison target and evidence**

- 模式：System Mode，延续已确认家族方向；没有新的独立组件设计稿。
- 共同视觉参考：首批 `evidence/runtime/g2-g3-family-refinement-2026-10-08/approved-visual-target.png`，1512×1032px；同目录 `browser/command-iab-final.jpg`、`browser/sidebar-iab-final.jpg` 为首批真实页面参照。
- 实现来源：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/apps/playground`；实际地址 `http://127.0.0.1:5173/`。
- 默认整页捕获：1440×1000 CSS px，截图同尺寸；浅色、默认密度，浮层采用展开状态。IAB 保存为 JPEG，无后期缩放。
- 窄屏：390×844 CSS px；深色/紧凑浮层与 Sheet，另检查剩余 13 页无页面横向溢出。窄屏 Sheet 实看为 `sheet-narrow-dark-iab.jpg`，同尺寸。
- 第一次同一图像输入共同打开源图和当前 `navigation-menu-iab.jpg`、`hover-card-iab.jpg`、`sheet-iab.jpg`、`skeleton-iab.jpg`、`sheet-narrow-dark-iab.jpg`。
- 第二次同一图像输入共同打开首批 Command/Sidebar 实际截图与当前 `menubar-iab.jpg`、`spinner-iab.jpg`、`breadcrumb-iab.jpg`、`kbd-iab.jpg`。
- 展开细节、滚动、加载完成和 Toast 在逐页 IAB 实看，并补充 Chromium 状态截图。细节阅读使用实际完整捕获与对应展开图，没有把生成示意图叠到页面背景。
- 最新当前导航菜单在服务恢复后重新加载并展开，截图 `navigation-menu-live-final-iab.jpg` 为默认视口 701×796px。
- 本轮所有短截图名均位于 `evidence/runtime/g2-g3-remaining-families-2026-10-08/browser/`。恢复服务后的默认视口截图 `sheet-live-final-iab.jpg` 为 1280×720px，作为最新真实运行证据，不替代 1440px 对照捕获。

源图是前三个样板的三列评审画布，不包含本轮全部组件。本轮比较共同的字号关系、光学层级、边界、图标比例和状态语义；没有宣称 Sheet、Skeleton 等与源图逐像素相同，也没有把源图放大的字体或画布空白升级为公共规范。

**Required fidelity surfaces**

| 表面 | 检查结果 |
| --- | --- |
| 字体与层级 | 保留 Rain 字体和中文系统回退。文档标题与首批对齐；G3 控件正文 14/22，分组、元信息、快捷键弱化。对象名字、资料标题、备注标签与辅助说明层次明确。 |
| 间距、布局与边界 | 浮层不推挤触发器；有效宽度取代失效 utility；菜单仅一条分隔边；Sheet 标题/内部滚动/固定底部独立，四方向和 390px 可用；加载前后主要几何一致。 |
| 颜色与 Token | 使用已有 Rain Category 与专用 focus 遮罩。持久选择浅品牌、临时展开/悬停中性、禁用弱前景。文档 81 条颜色声明与实际角色绑定，普通菜单文本保持交互文字角色，未授予对比度豁免。 |
| 图像、图标与资产质量 | 使用可交互 DOM 和正式 Rain 文件、目录、信息、关闭、固定、删除、教师/对象资产；没有新增依赖、图标库、手绘 SVG 或用文本形状冒充正式图标。 |
| 文案与内容 | 课程资料、老师身份、阅读目录和加载状态使用对应内容结构；保留真实 action、链接目的地和禁用项。Alt+K/撤销/Sheet 备注均有真实本地效果。 |

**Runtime review**

- IAB 实看 13 个剩余/保留页面及对应关键展开状态；首批方向参照再次对照。
- Chromium 专项共 16 场景通过：本批 10 个、首批 6 个。覆盖尺寸/状态、键盘、禁用、导航目的地、加载几何、主题、滚动、快捷键、Sheet 四方向/草稿/焦点和窄屏。
- 19 个相关单测文件、53 项单测通过；五个应用/包类型检查、专项测试类型检查、Playground 构建与 Asset Index 通过。
- 最新恢复的实际 Sheet 页控制台 warn/error 捕获为空，保存 `browser/iab-console-final.json`。此证据仅对应该捕获页，不代表所有浏览器或完整应用日志为空。
- 当前 Navigation Menu 页保留 6 条服务中断时期历史日志；明确重载后的 warn/error 为 0。原始捕获和分时结果保存 `browser/navigation-console-final.json`、`browser/navigation-recovery.json`。
- 整库检查仍有范围外的图表测试配置类型错误及阶段登记失败，详见本轮 `verification.md`。

**Open Questions**

- 无阻止本轮本地交付的视觉歧义；用户对真实页面的视觉验收仍待完成。
- Safari、VoiceOver、完整状态/主题对比度未验证，自动化与人工自查不替代这些验收。

**Implementation Checklist**

- [x] 继续已确认的共同视觉方向，并共同打开来源与真实实现。
- [x] 修复可执行 P1/P2 问题，再验证相应状态。
- [x] 检查浅/深、默认/紧凑、展开、加载、四方向与窄屏。
- [x] 保留行为、公开 API、现有资产、历史验收和前批证据。
- [x] 专项自动化、类型、构建、颜色角色与来源绑定通过。
- [ ] 用户对本轮真实页面的视觉验收。

**Follow-up Polish**

本轮没有必须延后修复的 P3 项。未新增额外菜单组合、公共 API、Token 或依赖；未发布、迁移、写 Figma 或提交 Git。

final result: passed
