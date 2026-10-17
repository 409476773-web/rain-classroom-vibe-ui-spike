# 雨课堂基础 Token 审阅与前置建设清单

审阅日期：2026-09-18。性质：只读审阅与建设建议，不是实施记录、视觉验收或发布证明。

## 0. 结论

建议在原两周计划的 G0/G1 内增加一次限时基础准备，而不是暂停组件扩充、先全面重做 Token。优先解决 shadcn 源码的样式兼容、生成页面的默认排版与尺寸、常用前景／背景搭配。48／64 大间距、图表角色、轻阴影、响应式和叠放层级按首批真实需求补齐。

不推荐先增加整套色系、将每种颜色补到统一 10／12 档、增加更多超小尺寸，或重建 Token 平台。现有定义并不少；可选值、推荐默认值、搭配规则、消费者是否实际生效需要分开检查。

## 1. 审阅范围与证据边界

- 仓库：409476773-web/rain-classroom-vibe-ui-spike。
- 本次实时核对 main 与 review/2026-09-16-card-v2，均指向 cf911c86078783df1fcd4228707873cfd6df2066。
- 另发现 prototype/teacher-homework-summary 指向 9d87bc85d63f6e5a2ea9d9c3815d7fdb3ef94587；其 packages、scripts、manifests、docs 子树与主审快照相同。本次没有将该原型分支误作本地 5326 页面。
- 阅读了基础源定义、生成器、生成输出关键区段、颜色消费规则、相关测试与组件消费者；不是逐行重读全部生成 CSS，也不是全部颜色配对的浏览器复测。
- 本轮未安装或重跑项目测试，未操作 Figma Variables，未验证用户电脑中未推送代码。
- 表中的“未见统一登记”表示本次基础定义与相关消费者范围内未见，不等于整个工作区绝无局部实现。

## 2. 全类别审阅表

“先做”均为建议优先级，不自动改变现有授权或人工验收状态。

| 编号 | 类型 | 当前证据 | 判断与建议 | 时机 |
|---|---|---|---|---|
| T01 | 基础颜色与主题 | Color Registry 有 269 个稳定身份，每个都有 Light/Dark 值；包含 Text、Icon、Border、Background、Fill、OnColor。另有独立蒙层色，不包含在此计数内。 | 不是只有品牌蓝；269 不是 269 个色系，也不等于所有搭配已合格。先复用现有颜色，不做大规模加色。 | 保留；按真实缺口增补 |
| T02 | 分类与业务颜色 | 20 组 Tag profile，包含蓝紫、青绿、金黄、洋红、棕色及五档难度等；题型映射已存在。 | 不是缺少难度色。应让 AI 优先发现并使用已有标签／配方；不能把 Tag 状态专用色直接升级为通用图表色。 | 随组件使用入口完善 |
| T03 | 语义颜色与搭配 | 新 Category 与旧 semantic 并存；token-contract.ts 的 semanticColorCategoryIds 实际有 17 项，指南开头仍称 14 项。 | 保留已接受值，修正现行说明；为新资产选择明确、可追溯的主题来源。成套提供文字、图标、底色、边界和状态，减少逐节点猜色。 | 接入前先做常用配对；全量旧别名迁移后置 |
| T04 | 字体家族与字形 | UI、Reading、Data 三类；UI/Reading 为 PingFang SC 等回退，Data 为 LINE Seed JP App_OTF 等回退。没有独立代码字体角色定义。 | 无需增加装饰字体；跨机器核对真实回退。代码片段／快捷键确有需要时增加 Code 字体角色，不阻塞普通组件。不要分发字体文件。 | 回退核对先做；Code 按需 |
| T05 | 字号、行高、字重、字距 | 19 档字号 9–40；15 档固定行高加 Equal=1；400/600/700；公共字距 0em；10 个完整预设。 | 数值足够。heading-page=24，data-default=36/42/700，与最新普通业务页偏好不完全一致。新增或调整新原型的优先推荐，不静默重写旧组件已接受样式。指南“14 档固定行高”应按当前定义更新。 | 接入前明确默认推荐 |
| T06 | 数据字体规则 | validateDataFontUsage 允许数字及 % . , : / K 与空白，未允许正负号。 | 对“+12%”“-12.5%”会拒绝数据字体资格；不等于页面无法显示负数。按报告需求评估符号、字体支持与测试；中文单位仍分开。 | 报告批次前 |
| T07 | 间距 | 16 档：0/2/4/6/8/10/12/14/16/18/20/24/28/32/36/40。 | 常用细间距丰富；公共表没有 48/64。建议按大分组样本少量补充，而不是每隔 2px 铺满。扩值需同步源码类型、Layouts 映射、生成输出与校验。 | 首批样本需要时前置 |
| T08 | 控件尺寸与密度 | Density 有 compact/default；Button 28/32/36/40/48，Input/Select 24/28/32/36，Tabs 28/32/38，Tag 20/24/28；各家族有自己的配方。 | 不缺尺寸。需要一组可共同使用的工具栏／表单推荐：常规优先，小尺寸显式选择。整齐不代表所有组件必须同高；静态标签与输入框可以有不同视觉尺寸。 | 接入前先做 |
| T09 | 图标与命中范围 | 图标盒 15 档 4–36；IconButton 控件盒 18/20/24/28/32/36；Select 有独立 44px 触屏目标。 | 图标、控件盒、点击范围不同。不要把 4/6px 的微图形或 16px 图标直接当可点击区域。已有规模足够。 | 保留；接入时核对 |
| T10 | 线条、圆角、微标记 | 线宽 1–6；圆角 4/6/8/10/12/16/full；Tag 内已有状态点、提醒环等局部参数，线型使用平台能力。 | 足够支撑首轮。加强分隔线／控件边界／焦点的用途区分，不必先建庞大“线与点”平台；若官方资产需要 0/2 等，先判断能否映射已有形态。 | 随资产适配 |
| T11 | 阴影与层次 | 公共 shadowTokens 为 none、overlay、dialog。 | 大浮层够用，轻按钮／选中块等缺少明确的轻阴影预设。首批需要时补 1–2 档并核对深色；不用复制其他库的整套阴影。保持 Card 默认不靠重阴影。 | 相关首批组件前 |
| T12 | 动效 | 通用 140/180/220ms，一个 ease-out；有 reduced-motion；按钮另有既有时长。 | 不缺基础动效框架。新源码的动画接到现有角色，按折叠、提示、浮层实际需要补充，不追求更多弹性效果。 | 随组件适配 |
| T13 | Alpha、整体透明度、渐变 | 有 20 档可覆盖 Alpha 白名单；另有组件 disabled/loading 透明度；AI 渐变已有独立语义。 | 颜色 Alpha 与整个组件 opacity 不同，不能层层相乘调淡。现阶段不扩完整透明度表或花哨渐变；处理必要内容和背景的实际配对。 | 保留；配对验证 |
| T14 | 蒙层、弹窗尺寸 | separation/focus/modal/immersive 四种蒙层，各有 Light/Dark；none 不绘制；Dialog 416–1116 共 8 档及 viewport。 | 不是蒙层或弹窗尺寸空白。沿用，重点验证主题、嵌套、窄视口和实际组件联动。 | 保留；浮层组验收 |
| T15 | 响应式与空间尺度 | Layout 有内容宽度自适应；Dialog 等用局部 640/360 条件；报告有 1100/640；未见统一公共断点表。 | 不是没有响应式。为引入源码的屏幕／容器条件建立可用映射；别把所有局部容器阈值强制统一成视口断点，也别把所有宽度都当 spacing。 | 导航／分栏接入前 |
| T16 | 叠放层级 | Dialog 样式包含 30/31/50，Dropdown positioner 为 40；层级分散在组件。 | 这是治理缺口而非本次复现的遮挡错误。整理最小角色表，并测试菜单位于弹窗之内等嵌套；不能只提高数字，需保留叠放上下文。 | 浮层批次前 |
| T17 | 图表视觉角色 | BM-D 本地系列复用 Icon/Second/1、Icon/Green/1，含图例与线型规则；未见独立通用图表 Token 合同。 | 优先补分类系列、数值顺序、正负变化、中性背景、网格、轴和提示的职责。初版可复用现有值；不把系列一永久等同品牌／成功，不只依赖颜色。 | 报告批次同步，勿阻塞其余组件 |
| T18 | 生成、检索与外部源码兼容 | 有源定义、生成 CSS/清单、颜色搜索与评估函数。Tailwind 先执行 --*: initial，主要注册 Rain 命名。 | 不是没有生成和检索体系。最重要的是让 shadcn 的样式真正得到对应：颜色之外还包括字体、间距、尺寸、阴影、断点、主题和动画。不要复制官方整段全局 CSS 覆盖现有项目。 | 接入前最高优先 |
| T19 | 焦点可见性 | focus.css 分 control/item/danger 角色，现有 1px 轮廓、0px 偏移、3px 光晕与强制颜色模式规则；并非没有键盘焦点基础。 | 新来源接到已有 Focus 机制，不重复叠加外来 ring；在实际背景、嵌套浮层、禁用和键盘操作下检查。既有对比度待办不因规则存在而关闭。 | 首批交互样板先验证，后续逐组回归 |

## 3. 四项关键发现

### F1：直接接入源码的样式兼容是前置项，不只是换色

定位：packages/foundations/src/tailwind-theme.css 的首个 @theme、@theme inline；apps/prototype/src/styles.css 的加载与源码扫描。

当前主题清空 Tailwind 默认主题变量，重新暴露 Rain 命名。若新源码仍使用未提供对应值的主题相关类，就不能假定这些类会生成并生效。flex/grid 等结构类与 theme 驱动类需要区分。此结论来自源码和 Tailwind 官方规则，未伪称本轮运行了全部 shadcn 导入测试。

建议：建立单一、受控、可生成的兼容对应表。优先引用现有 Rain 变量；只有具体来源资产所需而且无法适配的缺口才增补。对固定上游源码预览变更，不进行全局盲目替换；保持完整 Variant、Parts、状态和局部覆盖能力。

### F2：字号值充足，但默认推荐会影响新页面

定位：packages/foundations/src/typography-contract.ts 的 typographyPresets；typography.css 的 --rain-type-data-size。

当前 heading-section 是 16/24，heading-page 是 24/32，data-default 是 36/42/700。原注释已写“大字号极少使用”，也允许覆盖；所以不是不存在克制用法。但无额外覆盖时，默认值确实大于用户本轮确定的常规页面偏好。

建议：新原型入口优先推荐普通页面标题 16、常规正文 14 和按既有规则选择的补充文字；突出数据默认从 18/20/22/24 的组合中按任务选择。保留大屏／特殊场景的大字号，普通页面不默认推荐。变更范围属于新消费配方／推荐，不把旧的局部验收回填或全库批量缩字。

### F3：颜色很多，但“颜色存在”不是“任何搭配都合适”

定位：color-registry.ts 的 colorRegistry、validateColorUse、assessColorUse、colorDiscovery；tag-token-contract.ts。

已有色组、关键词查询和固定配对示例，并非全缺。部分组合因对比度或用途资格未通过；颜色身份证数不能用作全库合格数。Tag 的悬停／动作专用色也不能当通用色随意推荐。

建议：先形成少量常用组合（普通任务面、辅助区、品牌选中、必要提示、危险操作、分类标签），记录前景／底色／边界／实际状态与主题。让 AI 默认选已检查的完整组合；其他组合保留明确探索入口。可读性不应被简单理解成“所有信息一律加深”，但辅助正文也不能假装成装饰来绕过要求。

### F4：资料与源码有轻微登记漂移

定位：docs/ai/token-selection.md 开头与“排版”；token-contract.ts 的 semanticColorCategoryIds；typography-contract.ts 的 fixedLineHeights。

指南写 14 个语义映射／14 个固定行高；当前源码分别是 17 项／15 档。属于现行说明同步问题，不是宣称组件运行失败。建议数字清单改为引用或自动生成，不再手工重写一套状态表。

## 4. 与成熟体系对照：借鉴什么，不照搬什么

- shadcn/ui：借鉴背景／前景成对语义、组件常用角色、chart 与 sidebar 入口；不复制一整套全局颜色与排版覆盖 Rain。
- Ant Design：借鉴基础值→派生值→用途别名，以及统一控件尺寸和状态角色；不为了颜色算法而先改框架、引入整套 Ant 运行时。
- Material UI：借鉴 spacing、breakpoints、zIndex、transitions 等基础职责完整分工；不以更多阴影档位或默认 Roboto/字号作为雨课堂目标。
- Radix Colors：借鉴“每档颜色对应具体用途”的清晰性；不要求雨课堂所有色组机械变成 12 档，也不把某个色阶的用途名称当作在任何背景下都达标。

## 5. 放入原计划的最小前置任务

建议投入目标约 1 个工作日，必要时最多占前 2 天；是 W0/W1 或 G0/G1 的准备部分，不另起一轮两周计划。实际工作量由试接判断，不是已验证工期。

| 顺序 | 任务 | 看什么算可以继续 |
|---|---|---|
| P1 | 固定首批 shadcn 来源并建立样式对应 | 首批真实源码的字体、字号、间距、尺寸、圆角、阴影、断点／动画等所用样式没有静默失效；不覆盖旧全局样式。 |
| P2 | 新原型默认排版与同组尺寸推荐 | 标题不默认大字；同一工具栏不自动混入紧凑控件；例外有业务理由；旧组件变化范围可查。 |
| P3 | 复用并验证首批常用颜色配对 | 正常、选中、必要提示、不可用及焦点可区分，辅助信息不抢眼；事实与未关闭项清楚。 |
| P4 | 只补样板确实缺少的数值或角色 | 48/64、轻阴影或断点等没有需求不加；新增有来源、有消费者、有实际示例。 |

建议使用两个组合样板验证：
1. 工作台工具栏：输入＋选择＋按钮／切换＋辅助文字；检查同组尺寸、普通字号、局部改变与焦点。
2. 内容卡与浮层：标签＋关键数值＋局部网格＋菜单／弹窗；检查间距、搭配、主题与叠放。

对应受影响检查通过、设计师确认限定默认方向后继续批量。图表基础随报告组补，复杂 Code 字体／全主题旧别名迁移等另列后续；不能继续停留在无限色板和间距推敲中。

## 6. 边界

- 不改主品牌锚点，不引入新的通用字体风格，不把低对比度结果写为达标。
- 用户本轮是要求审阅，不据此执行共享源码、Figma、发布或远端修改。
- “前置必须做”针对即将接入组件实际会使用的基础，不要求全部历史颜色问题、全部旧别名和所有外部能力一次关闭。
- 新数值／用途推荐先作为建议或候选；用户确认方向后仍需本地实施和证据。

## 7. 主要源码位置

固定提交下的相对路径；基础定义为主要事实来源，文档／历史测试作为补充。

### 基础定义
- packages/foundations/src/token-contract.ts
- packages/foundations/src/color-registry.ts
- packages/foundations/src/tag-token-contract.ts
- packages/foundations/src/button-token-contract.ts
- packages/foundations/src/typography-contract.ts
- packages/foundations/src/typography.css
- packages/foundations/src/composition-contract.ts
- packages/foundations/src/density.tsx
- packages/foundations/src/icon-size-contract.ts
- packages/foundations/src/input-token-contract.ts
- packages/foundations/src/select-token-contract.ts
- packages/foundations/src/tabs-token-contract.ts
- packages/foundations/src/overlay-token-contract.ts
- packages/foundations/src/focus.css
- packages/foundations/src/motion.css
- packages/foundations/src/index.ts

### 生成／使用／交叉核对
- packages/foundations/src/tokens.css（生成输出与既有兼容区）
- packages/foundations/src/tailwind-theme.css（主题清空、重新映射与生成 utility 关键区）
- scripts/generate-token-foundations.mjs
- scripts/token-foundation-outputs.mjs（生成入口与基础映射段）
- packages/foundations/src/color-registry.test.ts（检索、配对及资格范围）
- docs/ai/token-selection.md
- packages/layouts/src/layout.tsx
- packages/ui/src/dialog/dialog.css
- packages/ui/src/dropdown-menu/dropdown-menu.css
- apps/prototype/src/styles.css
- apps/prototype/src/scenarios/bm-d/page.css
- docs/audits/2026-09-12-color-closure-review.md（历史测量，未在本轮复跑）

## 8. 外部官方依据

以下为本次查阅时的官方资料，作为对照与兼容规则，不替代雨课堂源码事实：

- shadcn/ui — Theming：https://ui.shadcn.com/docs/theming
- Tailwind CSS — Theme variables：https://tailwindcss.com/docs/theme
- Ant Design — Customize Theme：https://ant.design/docs/react/customize-theme/
- Material UI — Theming：https://mui.com/material-ui/customization/theming/
- Material UI — Spacing：https://mui.com/material-ui/customization/spacing/
- Material UI — Breakpoints：https://mui.com/material-ui/customization/breakpoints/
- Material UI — z-index：https://mui.com/material-ui/customization/z-index/
- Material UI — Transitions：https://mui.com/material-ui/customization/transitions/
- Radix Colors — Understanding the scale：https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- W3C — Contrast (Minimum)：https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- W3C — Non-text Contrast：https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
