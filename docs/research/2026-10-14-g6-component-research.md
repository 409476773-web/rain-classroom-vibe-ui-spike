# G6 组件调研与制作规格

日期：2026-10-14。状态：制作前研究；以下 Rain 方案是待实现规格，不代表组件已实现或视觉已接受。

实施顺序、文件范围、验证与交付见 [G6 制作计划](../plans/2026-10-14-token-first-g6.md)。本报告展开视觉、功能、交互及成熟来源的取舍；实施时两份文档一起使用。

## 1. 本次决策与研究依据

用户已明确授权 `input-otp@1.4.2`、`embla-carousel-react@8.5.2`、`@shadcn/react@0.3.1` 三项依赖，并要求先研究、分析、制作详细计划。新增范围仍为原工作包的 12 项：Data Table、Aspect Ratio、Attachment、Drawer、Input OTP、Carousel、Direction、Bubble、Marker、Message、Message Scroller、Questionnaire。

本轮落实“尽量使用 shadcn ui 组件代码、视觉适当靠拢”的新指令：以同版 shadcn Base UI 源码及 Nova 样式为制作起点，完整保留合适的 Parts、组合 API、状态、键盘、焦点和引擎行为；在此之上做 Rain Token、文字、图标和业务示例适配。该方向不改变已有组件的人工验收。

研究分三层，证据不混用：

1. **制作事实源**：shadcn-ui/ui 固定 commit `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` 的组件、Nova 样式、文档与 MIT，见 [source lock](../../evidence/runtime/g6-preflight-2026-10-14/source-lock.json)。依赖版本、真实类型、SSR 探针见 [preflight](../../evidence/runtime/g6-preflight-2026-10-14/verification.md)。
2. **成熟做法参考**：各节引用 Ant Design、Base UI、Mantine、Embla、WAI、Ant Design X、Vercel AI Elements、Typeform 等官方资料，逐项写明吸收的行为。它们是设计参考，不追加整套依赖或冒充已复用其实现。
3. **现场视觉观察**：在 shadcn 当前官网查看 Attachment 默认与五态、Questionnaire 未选与选中、Drawer 展开状态。官网可能晚于固定 commit，现场观察只能支持视觉关系判断；具体 API 和数值以固定源码为准。

现场观察得到的制作要求：附件保持“缩略图/图标—文件名—说明—动作”的层次，错误同时有图标、文字、边框反馈；问答选项用明确的原生选择标志配合轻表面，标题、说明、快捷键分层；抽屉标题和说明靠近内容，主操作与取消集中在底部。采用这些信息关系，不照搬官网图片、整页样式或示例业务。

## 2. 源码复用和差额规则

每项交付一条可核对的链路：`固定源码 + 同版样式/工具类 → Rain 实现 → Parts/API/Token 差额 → 示例 → 检查证据`。源码中的行为参数与视觉 Token 分开处理。

| 处理层 | 本轮做法 | 完成检查 |
|---|---|---|
| 结构与公开 API | 保留原 Parts、props、ref、render、受控/非受控入口；业务解释写在示例 | 逐项对照源文件的 exports 与实际类型；任何缩减单独解释 |
| 行为引擎 | Base UI、input-otp、Embla、@shadcn/react 承担原有状态机 | 不另写拖拽、分格输入、滚动跟随或问答状态机；检查真实生命周期 |
| 同版样式 | 搬运样式规则的含义，包括 data-state、父子/组选择器、尺寸、动效与工具类 | 不仅复制 TSX 中的 className；核对 Nova 和 shadcn 工具 CSS 是否共同参与 |
| Rain 适配 | 使用现有 Foundations、rainCn、Typography、Button、IconButton、FormItem、PopupProvider | 保留宿主 className/style/render 能力及默认/局改/未改兄弟隔离 |
| 必要修复 | 仅修复已识别的交互、可访问性或兼容差额，并记录触发场景 | 如 Carousel 监听清理/键盘范围、Attachment reduced-motion、RTL 逻辑位置 |
| 示例与产品体验 | 用课程资料、课程辅导、课堂反馈场景验证组件 | 操作有本地可见结果；真实服务接入状态明确由宿主拥有 |

Data Table 是已有 TanStack 8.21.3 组合配方的增强与独立发现入口。上游固定文档已采用 v9，因此复用的是结构与交互模式，并不声称逐行同版本复用；本轮不升级表格引擎。

## 3. Rain 视觉与 Token 绑定总表

保留 shadcn 的层次、留白节奏、低干扰边框和内容优先的组合。Rain 的品牌蓝用于主要行动、选中和焦点；默认文件卡、会话正文和分隔信息沿中性表面，不给所有区域增加蓝底。以下为首版绑定方案，颜色组合仍需真实背景上的对比度检查。

| 视觉用途 / 上游语义 | Rain 首版绑定 | 适用点与约束 |
|---|---|---|
| background / card / popover | `Background/Neutral/1`；次层 `Background/Neutral/2`；页面承托 `Background/Neutral/3` | Attachment、Drawer、Questionnaire、Bubble 的层次由 variant 选择，不能一律同底色 |
| foreground / title | 标题 `Text/Neutral/1`，正文 `Text/Neutral/2` | 主次依靠文字等级与空间，不用多个品牌色 |
| muted-foreground | 说明和元数据先用 `Text/Neutral/3` | 必要说明必须可读；实测不足时在本组件选更强的已注册 Token，不改全库色板 |
| border / input / separator | 默认 `Border/Neutral/3`，分隔 `Border/Neutral/4`，强边界按需 `Border/Neutral/2` | 边框为 1px 线条 Token；选中使用 `Border/Brand/1` |
| primary / primary-foreground | `Fill/Brand/Solid/2` + `OnColor/1` | 优先直接组合 Rain Button；Bubble default（品牌实心）另测长正文对比度 |
| tinted / 品牌浅色 / 品牌选择反馈 | `Fill/Brand/Solid/4` 或 `Fill/Brand/Alpha/3`，前景 `Text/Brand/1` | 仅品牌浅色 variant/选择反馈使用；Bubble secondary、muted 保留中性语义 |
| destructive | `Text/Red/1`、`Icon/Red/1`、`Border/Red/2`、`Fill/Red/Solid/3` | 错误说明保留文字，不能只用红色；实际透明度逐项记录 |
| icon | `Icon/Neutral/2`，次级 `Icon/Neutral/3`；状态用已登记品牌/红色角色 | 导入现有可用图标，保留动作可访问名称 |
| ring / focus-visible | `--rain-focus-control`、`--rain-focus-control-halo`、既有 focus 几何 | 普通控件使用真实焦点；OTP 将单输入焦点正确投影到 active slot |
| backdrop / shadow | `--rain-overlay-modal` 或明确的 overlay mask；`--rain-shadow-overlay` / `--rain-shadow-dialog` | 遮罩强度与 modal 状态分别配置；Drawer 先评估 focus/separation，详见专节；默认卡片不加重阴影 |

尺寸和排版使用已有合同：

- 普通 UI 与表格正文 `ui-default` 14/22；紧凑 UI `ui-compact` 13/18；元数据 `ui-caption` 12/20；面板短说明 `ui-supporting` 13/20；小标题 16/24、600。长消息按 reading role 14/24 或 15/26 选择。字体沿 Rain 的 UI/reading 角色，普通数字不借用关键数据字体。
- 源码间距按同值映射 `--rain-space-4/6/8/10/12/14/16/20/24/32/40` 等；圆角选用已注册 `4/6/8/10/12/16/full`。保留同一组件的大小关系，避免把源码所有 rounded 值统一替换为一个值。
- Nova 的 CSS 像素值与 Tailwind 语义名必须分别解析。固定 globals 的 `--radius=.625rem`，lg 等于该值，xl 为其 1.4 倍；在根字号 16px 的默认配置中对应 10px/14px，其他主题可改变它。文中 Rain Radius/8、10、12 等是明确的映射选择，不能反称来源固定像素值。具体尺寸见后续逐项规格；缺少同值 Token 时，记录原值、目标值及视觉理由，不擅自增加全局 Token。视口比例、48/96px 等有明确来源的组件几何可保留为局部变量，单独记录，不强行凑到最近的全局间距。
- 默认密度与紧凑密度复用现有 `useDensity`；显式 size 优先。紧凑不自动缩小媒体比例、轮播拖动范围、抽屉吸附点、验证码最大长度或正文阅读字号。
- 普通 hover/颜色反馈使用 `--rain-motion-feedback-duration`（140ms）；普通浮层淡入淡出使用 overlay（180ms）；普通区域展开使用 region（220ms）。**手势速度、弹簧、滑动距离、scroll 阈值、光标周期和 shimmer 周期是引擎/组件行为参数，不机械改成 140/180/220ms。**
- 保留源码进入/退出和拖动中的 CSS 变量关系；拖动时不能叠加延迟 transition。reduced-motion 下移除装饰性动画、光标闪烁和 shimmer，滚动改为非平滑；仍需反馈状态、展示焦点与完成导航。

本地事实源：[颜色/尺寸输出](../../packages/foundations/src/tokens.css)、[Typography 合同](../../packages/foundations/src/typography-contract.ts)、[Motion](../../packages/foundations/src/motion.css)、[Focus](../../packages/foundations/src/focus.css)、[Overlay 合同](../../packages/foundations/src/overlay-token-contract.ts)。

## 4. 逐项制作规格

下列章节分别记录源码事实、成熟参考、Rain 首版决策与验收场景。数值为来源事实或计划目标时明确区分；没有浏览器证据的能力只记为待检查。


### 4.1 Data Table：保留已有数据行为，吸收 shadcn 的组合结构

**实际源码依据。** 已读 preflight 中 apps/v4/content/docs/components/base/data-table.mdx、registry/bases/base/blocks/dashboard-01/components/data-table.tsx 和 Nova Table 样式，以及本地 apps/prototype/src/data-table-recipe.{tsx,css,test.tsx}、packages/ui/src/table/table.{tsx,styles.ts,css}。Data Table 是配方，源文档没有统一万能 DataTable API。文档由 Columns、DataTable、Features、ColumnHeader、Pagination、ViewOptions 分工；Dashboard 实例 DataTable({data}) 使用排序、列显隐、列过滤、选择、分页五组受控状态和 getRowId(row.id.toString())。该Dashboard另包含DnD、Zod、图表、Tabs和详情编辑，不应整包搬入。

**实际 Parts、API、状态。** 基础是 Table / Header / Body / Footer / Row / Head / Cell / Caption；排序按钮、筛选、列菜单、选中数量和分页是组合。源文档为TanStack v9 tableFeatures/useTable；本地为v8.21.3 useReactTable/get*RowModel，DataTableRecipe目前只接受loadRecords?，数据为Material{id,name,kind,status,updated,locked}。不能照抄v9 import，也不能将旧配方写成已支持任意data/columns的公共组件。

**真实视觉与动效。** Nova为横向overflow容器、整表text-sm、40px表头、8px单元格内边距、行底线、低强度hover/selected填充和transition-colors；没有排序重排动画或统一loading引擎。本地已确认合同是表头13/18/400、正文14/22；Default表头44/正文50，Compact表头32/正文44，多行自然增高；横滚与分页分开。沿用本地完整Table方案，不因源值不同重设公共尺寸。先看新页表头、名称列、状态与动作的层级，不能以全填品牌蓝代替适配。

**直接保留 shadcn。** 保留列描述和渲染分离、稳定row ID、排序按钮、列菜单、受控选择/过滤/分页及“部件组合”设计；对应行为已有本地实现，引用完整源码，不重写引擎。新增#data-table独立ComponentDoc页，呈现契约、五组状态与可复制调用；Recipe单独登记forkable候选，公共Table继续不依赖TanStack。

**绑定 Rain。** 沿已有tablePaints：Background/Neutral/1，表头Neutral/2，Text/Neutral/2/4，Border/Neutral/3，hover Fill/Neutral/Alpha/5，selected Fill/Brand/Alpha/4。选择、筛选、菜单、分页、Empty、按钮完整复用，不复制第二份字号/高度/图标。排序即时更新；不向旧Table追加装饰性行位移或入场动画。

**从成熟参考吸收。** [Ant Design Table](https://ant.design/components/table/)区分稳定rowKey、受控选中键、不可选行和筛选结果；过滤回首页避免页码越界，表头可提示下一排序方向。本组采用“已选数＋非当前页选中数、全选仅当前页可操作资料、筛选提交后回首页并清选择、下一排序含义可理解”，优先核验已有实现；不引入Ant API/依赖。排序提示仅在含义不明确时用现有Tooltip补到排序按钮，不给每个表头新增菜单。

**差额与取舍。** 补的是可发现、可复制、可改的配方身份与独立说明，不建设DataGrid。服务器分页、全集全选、树、透视、虚拟化、拖动排序和Dashboard编辑/图表不计覆盖。若新增直接TanStack import，须同步应用精确依赖和verify-boundaries文件授权；展示原配方则保留边界。旧list-composition Fork的待视觉复审状态不转为默认。

**例子与退出。** 使用原13条虚构资料、只读项、5/10/20容量；演示无筛选/筛选无结果、选择后翻页/排序、列显隐、loading、失败重试保留原内容、空数据恢复。沿已有5项测试保护行为；键盘从查询到排序、选择、行菜单、分页完整走一轮；390px横滚可读，分页不滑走；按用途检索Recipe后复制或改一个列/动作例子成功。未接真实数据、未测大规模性能。

### 4.2 Aspect Ratio：保留极小源码，媒体由调用方表达

**实际源码。** 固定ui/aspect-ratio.tsx仅一个div，Props是React.ComponentProps<"div"> & {ratio:number}；保留children/className/原生属性/ref，写--ratio，经原生CSS aspect-ratio使用。无独立variants、loading/error、size或动画；Nova没有专属Aspect Ratio规则。

**直接保留 shadcn。** 保留比例容器源码、相对定位和有效numeric ratio，不新增Image/Video引擎或ratio枚举。16/9、1、4/3只是示例，不是唯一可用值。

**绑定 Rain。** 容器不擅加Card表面、圆角或边框。媒体例子由宿主用现有Background/Neutral、Radius/8或12、Line/1、Text/Neutral和布局宽度组合；img明确宽高100%与cover/contain；文件信息放比例区域外，长标题不能撑坏图像比例。纯容器无动效；占位不改变预留几何。

**从参考吸收。** [Mantine AspectRatio](https://mantine.dev/core/aspect-ratio/)说明flex容器内仍须指定width或flex分配。本组加入“同一16:9媒体在全宽、侧栏、flex卡片中保持比例”的例子；这是宿主布局规则，不新增width/maxWidth公共API。

**差额与取舍。** 源码将style放在后续...props中，调用方style会覆盖先写的--ratio对象；适配要合并style，并明确ratio对内部变量的优先级，让局部背景等style保留。ratio须finite且>0，沿项目边界校验模式清楚报错，避免NaN/0/负数悄悄退回内容高度。验证与合并是明确本地差额；不解析字符串比例，不替宿主管文件加载。

**例子与退出。** #aspect-ratio提供16:9课程封面、1:1缩略图、4:3课件；cover/contain、未加载/失败占位、长标题在容器外、不同父宽和flex布局。检查真实宽高比、style保留、无内容不坍塌、错误值失败；局改圆角只变该例。图片alt由宿主提供，不给容器添加第二个image角色。

### 4.3 Attachment：完整采用源九个Parts、三档和五态

**实际源码、API。** 固定ui/attachment.tsx导出9个Parts：Attachment、Group、Media、Content、Title、Description、Actions、Action、Trigger。Root为div，state=idle|uploading|processing|error|done默认done，size=default|sm|xs默认default，orientation=horizontal|vertical默认horizontal。Media variant=icon|image默认icon。Content/Actions/Group为div，Title/Description为span。Action代理源Button，Props为其Button Props，默认ghost/icon-xs；Trigger沿Base UI useRender/mergeProps，默认真实button、type=button，支持render。源没有上传函数、文件协议、percent、onPreview/onRemove专门API；这些由宿主传到具体动作，不从Upload参考新建平行公共状态机。

**真实尺寸与状态。** Nova三档：default gap8、padding横10/纵8、media40、正文14；sm gap10、横8/纵6、media32、正文12；xs gap6、横6/纵4、media28、正文12。横排图标16，小档约14；竖排图标24，media撑满。Root w-fit；横排min-width约160；竖排无文本约96、有文本约120。圆角依源theme，不能把xl/lg字面名当固定像素。idle虚线，uploading/processing title shimmer，error告警边框和media/description，image非idle/done时opacity60%，done恢复。Group横滚＋snap-x mandatory，gap12；Title/Description单行省略，Content min-width:0，没有自动多行展开。

**直接保留 shadcn。** 保留9个Parts、三档size、两方向、五态、Media两型、render、全卡Trigger和Actions z20 > Trigger z10。Root是宿主状态呈现，不顺便控制上传、不变嵌套button；动作disabled/loading由真实Button负责，Root没有伪disabled。

**绑定 Rain。** 三档保留源完整比例，8/10/6/4间距、40/32/28媒体、14/12正文、16/14/24图标均绑定已有值。常规附件Radius/12、xs Radius/8；media Radius/8、xs Radius/6。Background/Neutral/1、普通Border/Neutral、主副Text/Neutral/2/3（副文案采用比来源更清楚的首版候选，仍须实测）、危险状态与Focus沿已有角色；源destructive透明混色不能裸抄，按可消费Rain档位登记和实测。三档是显式source size，不在页面随Density重复缩放。

**动作API差额。** 源ghost/icon-xs不存在于Rain Button API。保留AttachmentAction身份时须真实映射到house Button方案并记差额，不能透传非法variant/size。图标动作优先在Actions内直接用现有IconButton 28/16或32/16完整方案和真实aria-label；文字重试沿Button。不可为源24px尺寸压小house组件。Trigger和各动作包含具体文件名；full-card hover仅在有Trigger时出现，focus明确可见。

**配套动效事实源。** title shimmer与Group scroll-fade-x不由Nova定义，而来自同commit packages/shadcn/src/tailwind.css，globals通过@import "shadcn/tailwind.css"加载。本轮已补入独立研究证据，不修改旧 source lock：

- 文件：evidence/runtime/g6-research-2026-10-14/upstream/packages/shadcn/src/tailwind.css.txt；16041 bytes；SHA256 bc7d83425702955b4cb67cb14ede9d603f9d912376d57a2d81d661094d2a782a。
- [固定utility源码](https://raw.githubusercontent.com/shadcn-ui/ui/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/packages/shadcn/src/tailwind.css)。
- globals证据：evidence/runtime/g6-research-2026-10-14/upstream/apps/v4/app/globals.css.txt；13739 bytes；SHA256 cbae6d633c38be59fc036d1e5cf60203ae7619ea6af9b4cdd8d632a211ccffa9；对应apps/v4/app/globals.css。

保留源文字光带：background-clip:text、2s linear infinite、RTL reverse；只转译相关规则到组件局部CSS，颜色由Rain文字/透明度得到，不导入整套utility或新依赖；反馈色过渡绑定既有140ms。原helper的reduce只匹配普通.shimmer类，但AttachmentTitle用group-state变体类，适配必须直接针对两态title关闭animation、恢复text-fill；forced-colors也恢复普通文字。不能仅保留className就宣布动效/reduce有效。

Group源渐隐含mask、scroll-timeline和无timeline时常驻两边fade。保留overflow/snap/overscroll和键盘到达；fade只增强，不能遮focused按钮、首末项或长名。首版保留渐隐并确保焦点不裁切；只移植x方向并记录fallback，若实际遮挡内容再记录必要差额，不复制约500行全部scroll-fade。源scrollbar-none和helper中的no-scrollbar名称也不一致，不以类名推断隐藏滚动条已生效；具体保留/缩减写差异表。

**从成熟参考吸收。** [Ant Design Upload](https://ant.design/components/upload/)将列表、状态、preview/download/remove拆开，移除可被宿主同步/异步阻止。本组吸收“同附件旁显示失败原因与重试、按单文件状态提供动作、预览与移除独立、操作失败保留对象”。只在本地样板状态及现有Dialog/Button体现，不移植Upload网络、beforeUpload、drag/drop和文件验证系统。

**例子与退出。** #attachment：课程PDF横排、图片竖排、只内容链接附件、三档完整对照、五态对照、滚动组。操作例本地模拟idle→uploading→processing→done及error→retry；预览真实Dialog；可分发本地文本/图片下载；移除确实删除该ID项并将focus移到邻项或“添加示例附件”；失败保留对象。界面明示模拟、无服务器保存。

验收：Trigger不触发移除，Action不误开Dialog，两处tab-stop有名；长名在预览读全；error有文案；不确定进度不造百分数；uploading/processing有Spinner或状态文字、操作不重入。390px横排可读，竖排Group可Tab到屏外项；纯呈现Group设置tabIndex、role=group和名称供键盘横滚。Light/Dark、三档、两向、reduce、forced-colors、RTL动作位置实际查看。动效不动几何，移除后结果与focus合理。

### 4.4 Direction：直接复用Provider/hook，配对行为与DOM方向

**实际源码。** 固定ui/direction.tsx仅重导出@base-ui/react/direction-provider的DirectionProvider/useDirection。已安装Base UI1.8.0的Provider只建context：direction?:ltr|rtl默认ltr、children；没有DOM节点、variants/states/size/动效，不依据document.dir自动设值。hook读context，无Rain外观需要重造。

**直接保留与Rain绑定。** 重导出两个源入口和实际类型，不新增方向store/config。宿主div显式dir并提供同值Provider；用既有Stack/Inline及实际Slider/新Carousel做例子，外观沿house控件。新Attachment actions/横向间距用logical inline-start/end；方向图标按行为选择翻转，文件类型、logo及非方向glyph不统一镜像。

**成熟官方规则。** [Base UI Direction Provider](https://base-ui.com/react/utils/direction-provider)明确Provider影响行为、不影响HTML/CSS；dir由宿主写，useDirection可帮助portaled视觉容器带出方向。本组采用DOM/context配对和嵌套ltr island，不把direction=rtl当作全库RTL完成。

**明确差额。** 本地_internal/popup.tsx只跨portal桥theme/density；旧Select Positioner/Popup没有dir，Base UI按context定位，但body portal不自动继承局部DOM文字方向。新G6 portaled部件须用useDirection给真实视觉容器设置dir；旧消费者若纳入验证并发现缺口，登记有限后继与源码/回归，否则标RTL未覆盖，不扩目录/全库修改。Carousel须把Provider方向映射给Embla opts.direction和logical布局，不能只让文字RTL。

**例子与退出。** #direction并排LTR/RTL同内容实例，RTL内嵌LTR段、另有默认兄弟。先验无portal Slider键盘/指示和新Carousel实际前后/拖动，再验新Drawer、Attachment Dialog/菜单的portal文字和定位。至少一个useDirection读数显示context，DOM computed direction与context配对。方向切换不改数值/选择、不污染兄弟、不逆转数据排序；两密度不形成新尺寸。只登记实测消费者/行为，不宣称旧Table/Select/Tooltip全支持RTL。


### 4.5 Drawer：完整四方向能力，底部作为主要场景

#### 结论与边界

建议保留上游已经实现的 `down/up/left/right`、三类 modality、Snap Points、Nested、受控/非受控打开与关闭、可选 Swipe Handle。只开放底部会无必要地删减成熟现成能力；底部可以是主要业务样板与验收重点，其他方向用同一实现和小样例核查。API 不另造 `bottomOnly`、gesture 选项或用户态拖拽状态机。

Drawer 对应需要真实手势、预设高度或嵌套叠层的临时任务面板。既有 Sheet 继续服务现有调用方；其底座虽然也是 Base UI Drawer，现有 CSS 没有消费 swipe movement 和 snap offset，不能用 Sheet 导出别名充当完成。复用的是 `PopupProvider/usePopupScope/usePopupTriggerRef` 和 Rain 标题、按钮、滚动组织方式，而不是复制 Sheet 当前没有手势反馈的视觉。

#### Parts / Props 合同

| 层级 | 保留和接入 |
|---|---|
| Root | 直接承接 `BaseDrawer.Root.Props`；`open/defaultOpen/onOpenChange/onOpenChangeComplete`、`modal`、`disablePointerDismissal`、`actionsRef`、`handle/triggerId/defaultTriggerId`、`swipeDirection`、`snapPoints/snapPoint/defaultSnapPoint/onSnapPointChange/snapToSequentialPoints`。上游补充 `showSwipeHandle=false` 不删。 |
| Trigger / Close | 原生按钮及 `render`；保留 ref、命名、调用方事件。Trigger 注册当前活跃锚点，Root 只在未被 `eventDetails.cancel()` 拒绝时更新该视觉上下文。 |
| Content | 对应上游 `DrawerContent`：内部组合 Portal → 可选 Overlay → Viewport → Popup → Base Content。接受 `BaseDrawer.Popup.Props`，其中 `initialFocus/finalFocus`、`className/style` 不裁掉。 |
| Portal / Overlay / SwipeHandle | 保留作者低层入口；Portal 可接受已有引擎的 `container/keepMounted`，Overlay 不误导为等于 modality；Handle 保留 `aria-hidden`，不伪装成键盘 Slider。 |
| Header / Footer / Title / Description | 使用作者 Parts；Header/Footer DOM 属性，Title/Description 由 Base UI 关联 Dialog 语义。体区仍按上游组合普通 `flex-1 min-h-0 overflow-y-auto`，不为每个视觉部分增加新的 public wrapper。 |

公共导出保留以上上游命名和 Parts；仅有现存命名冲突才记录调整，不另添一套平行别名。`data-rain-id`、Parts/slots 和 Manifest 同步登记。Base UI 1.8.0 还存在 `SwipeArea`、`VirtualKeyboardProvider`、Provider/Indent 等能力：不是固定 shadcn wrapper 全部已经暴露的 Parts，应明确登记为引擎可组合能力；键盘 provider 可在有输入的主场景按需组合，背景缩放不是默认附加效果。

#### 直接来源的视觉几何与 Rain 转译

| 作者源码/Nova 的具体值与关系 | Rain 适配方式 |
|---|---|
| 纵向内容自适应，默认最大 `calc(100dvh - 6rem)`；纵向 snap 时 content-height 为 `100dvh`；侧向默认 `75%`，较大屏幕 `24rem`。 | 保留关系和来源几何，定义组件局部 layout variables；宿主可通过 Content class/style 指定明确尺寸。不能把侧向和纵向都强制塞进 Sheet 的 420px。比例/视口量不伪装成全局 Space Token。 |
| 边缘圆角 `rounded-xl`；只在向内容侧暴露的边缘圆角/边框；字体 14px；Header `p-4 pb-0`、gap 2px，Footer `p-4 pt-0`、gap 8px。 | 圆角映射已存在 Rain Radius/12，1px 边框、Background/Neutral/1、Text/Neutral/1/3；Header/Footer Space/16、2、8。标题采用 Rain 既有 overlay 标题层级（16/24 semibold），对应现有小标题层级，实际几何按源码和 Rain 字体共同检查。 |
| Swipe Handle 横向外容器高12px、条96×4px；侧向外容器宽12px、条4×96px；条贴合开口方向，向左/上时排序翻转。 | 保留条的方向和排列；厚度/容器用 Space/4/12，96px保留有来源的局部几何（现全局 Space 最大40，不新造 Space/96）。Handle 使用中性填充与全圆角。 |
| Overlay 依 swipe progress 逐渐透明；snap 模式最低透明度系数0.5；Nova 覆盖黑10%和可支持时的小幅 blur。 | 遮罩首版采用已有 Rain `--rain-overlay-focus`，保留 progress 和 snap 下限公式；与更轻的 separation 对照，记录来源黑10%到Rain语义色的强度差额。mask与modal独立，不按modal=true直接加深到modal遮罩。blur为已有来源视觉候选，需单独样板比较，不因Token改色而静默删除或升为全局默认。 |
| nested stack：peek16px、bleed48px、stack step0.05，使用 drawer-height/frontmost-height/nested-drawers/progress。 | 保留叠层关系和现成公式；peek映射Space/16，其余是有来源局部几何/比例。nested状态的淡化/缩放局限于本组件。 |

Nova 中 `.cn-drawer-content`/`.cn-drawer-handle` 还保留 Vaul 旧选择器；固定 Base UI TSX 真正使用的是 `.cn-drawer-popup`/`.cn-drawer-swipe-handle`/`*-base`。只转译实际可达选择器，不把旧 Vaul 样式当成当前额外实现目标。

#### 动效、手势、焦点与取消流程

- 保留源码的 movement/snap/stack 合成与 `data-starting-style/data-ending-style/data-swiping/data-nested-drawer-swiping` 切换：手指拖动时0时长跟随，释放后由 `--drawer-swipe-strength` 缩放回弹/退出时长。不会给同一个 transform 再叠一个 Motion/GSAP动画。
- 来源基线 Popup/Overlay 是450ms、释放系数400ms；Handle 200ms、Content嵌套淡出300ms。Rain已有 region220ms、overlay180ms、feedback140ms：首版保留450/400/200/300ms及原easing的协调关系为有来源的组件局部参数，保留Base UI计算的释放强度；普通颜色反馈才使用Rain角色。不将450ms新增为全局Foundation，也不将整套手势时序机械压成220ms。`prefers-reduced-motion` 禁用进出场/回弹的非必要过渡，保留即时手势跟随。
- `swipeDirection` 同时决定位置和关闭方向，纵向 Snap Point 消费 `--drawer-snap-point-offset`；键盘不能依赖看得见的装饰Handle，示例提供关闭按钮及“展开/收起”等普通按钮，按钮更新已存在snapPoint，不重写手势引擎。
- Header/Footer固定，体区独立滚动；滚动与拖动归Base UI仲裁。有横向Carousel的descendant使用已存在 `data-base-ui-swipe-ignore="x"`，不要把所有内容都设成阻止手势；鼠标文本选择由Base Content保障。
- 模态打开继承触发器主题与密度并将初始焦点交Base UI，关闭回到正确触发器；`modal=false`/`'trap-focus'`分别保留独立语义。Root不把无遮罩等同于非模态。
- 未保存内容由宿主 `onOpenChange` 判断：点击遮罩、Escape、Close、swipe统一走关闭请求。宿主调用 `details.cancel()`，打开已有AlertDialog；取消确认保留Drawer和草稿、返回原控件，明确放弃才关闭。保存失败保留内容/焦点并展示具体错误；保存成功/确认放弃才更新宿主open。公共Drawer不增加“dirty/save”业务Props。
- iOS来源样式要求绝对定位backdrop时body已定位；在消费文档与独立host验证该条件，不能仅在Playground恰好可用。底部输入场景检查1.8.0已有VirtualKeyboardProvider和键盘inset fallback；safe-area通过Footer现有环境变量处理，不另写visualViewport引擎。

成熟补充：Base UI官方示例证实四方向、Snap与关闭确认；Material官方Android“partial bottom sheet”支持部分展开→完整展开→关闭的主场景组织，采用用户可控高度而不是打开就占满高屏。M3指南网页本轮只返回空壳，不能宣称已读其中视觉规格；这里借用的是可读取的官方Compose交互说明。[Base UI Drawer](https://base-ui.com/react/components/drawer) · [官方Partial bottom sheet](https://developer.android.com/develop/ui/compose/components/bottom-sheets-partial)

验收分开记录：四方向实际拖动与拒绝关闭、纵向多snap和嵌套返回、鼠标文本选择、触摸体区滚动、Carousel轴仲裁、portal主题/密度、受控父级拒绝、键盘打开/关闭/回焦点、短视口/200%缩放。物理iOS键盘/Safari与屏幕阅读器须明确保留人工检查，不由桌面模拟通过推导。

### 4.6 Input OTP：保留单一真实input与分组槽位

#### Parts、Props与状态

保留 `InputOTP / InputOTPGroup / InputOTPSlot / InputOTPSeparator`。根层继续直接使用OTPInput；Group和Slot仅镜像原生输入/选择状态，不成为6个输入或6个Tab stop。Separator装饰用途不应生成重复朗读。

| 内容 | 具体计划 |
|---|---|
| Root原生/引擎Props | `maxLength`必传；保留`value/defaultValue/onChange`（字符串回调）、`onComplete`、`pattern/pasteTransformer`、`inputMode/autoComplete/name`、`disabled/readOnly/required`、原生事件、ref、`containerClassName`、`textAlign`、`pushPasswordManagerStrategy`、`noScriptCSSFallback`。render与children沿引擎的互斥组合，不强制消费者采用唯一组合。 |
| FormItem适配 | 复用`useFormItem/mergeFieldIds`：id/labelledby/describedby/error/disabled/required进入真实input；使用与现有Input一致的优先关系（field状态优先，disabled合并）。错误必须同时反映到可见Slots/Group，不能只有隐藏input变红。 |
| 槽位/尺寸 | Slot index从引擎Context读取`char/placeholderChar/isActive/hasFakeCaret`。默认为32px，紧凑按现有Input24px；若公开size，复用现有InputSize24/28/32/36，不新增xs/lg轴。状态取Rain default/warning/error，与FormItem一致。4位、6位、3+3分组属于组成样例，不新增len4/len6 variants。 |
| 原生表单与完成 | `name`使值进入FormData；`onComplete`只通知长度完成，不等于验证成功/自动提交。验证、发送验证码、过期、重发、倒计时和请求竞态全部宿主控制。 |

精确1.4.2引擎默认 `autocomplete=one-time-code`、numeric键盘，保留单一输入的选区、复制、剪切和整段粘贴。字母数字样例须显式`inputMode=text`及对应pattern，避免只改pattern而仍弹数字键盘。保留密码管理器increase-width策略，不能因当前截图没有徽章就关掉；no-JS降级保留，若需要Rain主题只转译fallback CSS，不把它设null。

#### 视觉、动效与源码差额

来源 Nova：Root gap8px，Slot 32×32px、字14px、上下和右边框，首位补左边框/左圆角，末位右圆角；激活slot提高层级，有border/ring；错误Group和slot共同反馈；Caret 1×16px、1000ms循环；Separator图标16px。

Rain转译：连接槽位的结构与首末圆角保留，Neutral field border/background、brand active、red error、orange warning与现有Field Token一致；圆角用Radius/6，active外轮廓用已有Focus方案，不硬搬shadcn ring3px为新Focus全局值。边框/填充过渡用feedback140ms，caret是有来源局部周期值（没有全局1000ms Token），减弱动态时改稳定显示，不使焦点提示消失。禁用/只读颜色复用Input合同，不能单靠opacity掩盖错误文字。

查明必须小修：固定shadcn `InputOTPSlot`只渲染`char`，没有渲染引擎已有`placeholderChar`，因此根props声明placeholder不等于可见槽位完整支持；Rain渲染`char ?? placeholderChar`并区分placeholder paint。index超界/脱离Root若继续静默空槽会隐藏接入错误，实施时给清楚的小型合同检查，避免编写新的输入状态机。

交互错误流程：进入→输入/整段粘贴→长度完成→宿主验证；错误时保留已输入内容，显示可读的错误原因并允许原位修改，不自动清空/抖动/切走焦点。异步提交时保持输入状态由宿主决定；校验失败不得宣称已完成身份验证。错误消息以FormItem描述关联，live反馈只在宿主流程节点发一次，不每个数字都朗读一次。

成熟补充：input-otp官方说明单真实input使原生选区和OTP自动填充成立；Mantine PinInput文档提醒原生FormData/name、oneTimeCode、regex和明确aria-label。采用这些流程检查，继续使用input-otp引擎和shadcn视觉结构，不混装Mantine或照搬多input方案。[input-otp官方](https://input-otp.rodz.dev/) · [Mantine PinInput](https://mantine.dev/core/pin-input/)

验证：6位输入/清空，4位与3+3，选中中间替换、Backspace/Delete/方向键/Ctrl或Cmd+A、整段及带分隔符粘贴、pattern拒绝、不截断错误选区、placeholder/active/caret、受控父级不接受、FormData、disabled/readOnly、FormItem label/error、onComplete回调。自动填充、密码管理器、中文实际键盘和屏幕阅读器是实机/人工边界；不能用模拟粘贴代替。

### 4.7 Carousel：保留Embla完整作者入口，做好组合而不新增引擎

#### Parts、Props、状态与用法

保留源码全部 `Carousel / CarouselContent / CarouselItem / CarouselPrevious / CarouselNext / useCarousel / CarouselApi`。根Props继续是原生div属性加`opts/plugins/orientation/setApi`。opts类型从`Parameters<typeof useEmblaCarousel>`获取、API从`UseEmblaCarouselType[1]`获取；不为导入core类型额外新增direct dependency。plugins保留现成入口，本轮不引入未授权autoplay插件，默认内容不会自动轮转。

Content仍分成裁切Viewport（Embla ref）和inner flex容器；Item为flex slide；Previous/Next为Rain可复用Button/IconButton及真实button语义，API选择/重建后依据`canScrollPrev/Next`更新状态。尺寸和间距通过既有class/style组成；不新增itemsPerView响应式状态机。保留horizontal/vertical、loop、align、slidesToScroll/dragFree等引擎opts，不“为了最小”封死作者opts。

#### 来源视觉几何与动效

来源：Content横向负margin16px / Item左padding16px；纵向对应负margin-top和padding-top，flex-column；Item默认basis-full，宿主通过basis设1/2、1/3与断点。Nova只额外把Previous/Next变圆形。作者按钮默认outline/icon-sm，水平外置距离48px并垂直居中；纵向上下48px、横向居中并旋转图标90°。

Rain适配：gap仍Space/16，外置48px作为来源局部layout geometry（现有Space无48，不新造全局token）；按钮使用现有secondary/IconButton尺寸与Focus、Radius/full，图标使用正确静态Rain资产。默认完整布局保留外置控制关系，文档要求宿主保留按钮空间；窄屏样例通过现有class/布局将按钮排到下方/内侧，不全局替换作者结构或让按钮被viewport裁切。图片例组合AspectRatio，文字/资料例直接使用Card/Item，Carousel不给子内容强制统一高度或裁切文本。

拖动/吸附/循环/Resize/DOM变动监听由Embla8.5.2承担。Embla `duration`是物理模型参数而非毫秒，不能把Rain220ms塞给duration。保留引擎默认吸附和作者低延迟drag；reduced-motion通过引擎breakpoints的duration0或其jump方法避免程序性动画，箭头按钮自身paint才映射Rain feedback。不要叠Motion的transform或自行设置定时切片。

#### 有证据的源码差额与修复范围

1. 原源码 `onKeyDownCapture` 捕获所有后代左右键，输入框/OTP/Slider也会被抢；并且纵向仍只监听左右。改为调用方事件优先、已preventDefault则退出、忽略修饰键和可编辑/交互后代，只在Carousel自己的明确键盘入口或导航控件使用方向轴对应键；普通Tab保留浏览器次序，不能给所有Slide添加额外Tab stop。该修复只是键盘合同，不重写滑动。
2. 原effect订阅`select/reInit`却只off(select)。cleanup用同一callback解除两项；API变化、reInit与内容变更都重算边缘按钮，不留重复监听。`setApi`沿作者接口提供，计数/跳转用现有API，root不新增第二份selectedIndex state作为真源。
3. Previous/Next末尾props spread可覆盖作者onClick/disabled。将调用方事件正常组合，保留defaultPrevented意图；边缘与调用方禁用取合并关系。不要在调用方覆盖事件后出现“有按钮却不翻页”的样例。
4. 根命名和每个Slide命名由宿主提供；原源码有role/roledescription但无具体名称。单大图样例使用标题或“3/6”；资料多卡轨道使用Card标题。上一项/下一项按钮使用中文有意义名称，保留激活后的焦点位置；若到边缘把当前按钮设native disabled，需浏览器核查焦点是否仍可见，出现丢失时采用已有Button可访问禁用表达，不自动跳走到Slide。
5. 不给全部离屏Slide无条件`aria-hidden/inert`：资料轨道包含可Tab链接时，保留Embla watchFocus使聚焦内容进入视野。单图展示只含非交互媒体，区域外加简短polite计数即可。对不同内容类型在composition规则写清楚，不加hideOffscreen public开关。

成熟补充：WAI Carousel要求区域/slide命名、真实前后按钮、正常Tab次序且操作后不移焦点；自动播放需要停止/恢复按钮、聚焦/悬停停止。因此本轮默认手动，后续若消费plugins引入自动播放，必须随同Rotation Control和明确恢复流程。Embla v8官方资料确认watchFocus/Resize/Slides自动处理以及on/off对称；当前v8文档展示8.6.0，准确类型已用8.5.2 tarball对照。[WAI Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) · [Embla v8 Options](https://www.embla-carousel.com/docs/v8/api/options) · [Embla v8 Events](https://www.embla-carousel.com/docs/v8/api/events)

验收：横向单图、横向多卡与长标题、纵向、loop不足内容回退、空/单项边缘、drag取消点击、触摸纵向页面滚动与横向拖动、Resize/增删slides、可编辑子元素箭头、Button禁用/事件组合、聚焦离屏内容可见、Drawer轴仲裁、减少动态、卸载/StrictMode监听。功能模拟通过与真实触摸/屏幕阅读器体验分开登记。


### 4.8 Bubble

#### 保留源码

保留 `BubbleGroup`、`Bubble`、`BubbleContent`、`BubbleReactions` 全部公开 Parts。根保留 `variant`、`align`、原生 div props；Content 保留 Base UI useRender 与 mergeProps，接受元素或 render function。Reaction 保留 side=top/bottom、align=start/end。Group 只负责连续气泡的纵向编排，不增加 sender 数据或自动分组算法。

七个 variant 全部保留：default（品牌实心）、secondary（常规中性）、muted（弱强调）、tinted（品牌浅色）、outline（有边框）、ghost（无框富内容）、destructive（失败/危险语气）。七项都要有可见示例；不能仅做蓝白两项。start/end 是逻辑起止方向；Conversation 中由 Message 对齐整行，Bubble 的独立 align 仍可单独使用。

Nova 的视觉基线：气泡内容宽度由内容决定，通常最高 80%；ghost 放开到全宽；Content 为圆角边框表面，水平 12 / 竖向 8 间距、small 字号、relaxed 行距；Reaction 为外叠的圆角小行，top/bottom 各向外位移 75%，背景与外环用于把它从气泡边界中分离；Group 间隔 8。Content 的真实 button/a 有 hover 与 focus-visible 样式。默认没有开关动画或 typewriter 引擎；长文 show more/less 是已有 Collapsible 的组合能力。

#### Rain Token 适配与差额

将各 variant 的背景、正文、边框、hover、focus、reaction 外环全部映射现有 Rain 品牌/中性/危险 Token；tinted 不继续使用自由计算品牌新色。字号行高消费 Rain Typography，圆角/内外间隔消费既有 spacing/radius。保留原生 className/style/render 组合入口；本仓库视觉用法遵守既有 Token 与 Part Local Recipe 约束，不能为方便接入而删除这些来源 Props。

Reaction 的 Nova 用 left/right，Rain 转为 `inset-inline-start/end`，连同 end align 一起验证 RTL；不新增浮层定位引擎。Reaction 可由调用方传静态 emoji 或已有 Rain Button/IconButton；静态组合可给一次性描述，交互组合每个动作须有明确名字。显示“+2”只是传入内容，不凭空设计 reaction aggregation 数据模型。

#### 学习的具体体验

Ant Design X 把 waiting/loading、流式输入与动画表现分别定义。借鉴的是“等待时有明确状态，输出时内容自然增加，完成后才出现完成动作”；不要把一个视觉动画的结束回调当成网络请求完成。Rain Bubble 保持表面职责，状态由 Message/Marker 和宿主传入内容表达，既有 Scroller 负责流式布局。这里不引入 Ant 的 typing API、SDK 或重放文本计时器。[Ant Design X Bubble](https://ant-design-x.antgroup.com/components/bubble)

#### 示例与验收

示例覆盖：七 variant 栅格；start/end；同发送者连续 Group；多行中文/长 URL/富内容；上下与起止 Reaction；真正的 button/link 气泡；Collapsible 长回复；Tooltip 已读信息与 Popover 错误细节。业务示例使用学生提问、教师简短回复与 AI 学习建议。

验收：正常/紧凑密度均不裁切；80% 与 ghost 全宽差异成立；RTL reaction 随逻辑方向；focus 可见；button/link 支持键盘，避免 div click；Reaction 与下一行留出外叠空间；长内容折叠/展开后 Scroller 重新保持正确阅读位置；禁用动作由真实按钮承担；危险语气同时有错误文字。

### 4.9 Marker

#### 保留源码

保留 `Marker`、`MarkerIcon`、`MarkerContent` 及 `markerVariants` 的适配对应。根可 useRender，三 variant 全部保留：default 行内状态/说明，border 底边界行，separator 两侧线条加中心标签。Icon 是装饰 slot 且 `aria-hidden=true`；Content 允许正常换行和内联链接。它是会话标记，不是图表 marker 或彩点。

Nova 基线：全宽 flex 行、8 间隔、small 字号、弱文本、16 图标；separator 由左右可收缩线条包围文本；border 有底线与8下内边距。link 有 underline/hover。组件本体无固有动画；正在处理状态可组合 Spinner；官方 shimmer 示例依赖 shared CSS。

#### Rain Token 适配与差额

线条统一现有 Separator/Border Token，图标统一 Rain Icon 尺寸，文字按状态说明的层级消费 Typography。默认/紧凑维持 icon 与基线，不把所有标记画成状态 Badge。separator 的前后 margin 转逻辑方向；过长标签允许换行，线段不能挤掉文本。useRender 链接或按钮须与 Rain 的聚焦规则接通。

保留已核实的 shimmer 组合体验：按固定 shared CSS 转译为具名局部 recipe，不新增公共动效控制对象。源码为 currentColor 文本渐变、默认2s线性循环，RTL反向；原 helper 对普通 shimmer 类的 reduced-motion 会清除动画、背景和透明 text-fill；Rain 须针对实际组合选择器做同样恢复，不能从 helper 存在推导所有变体已生效。Rain 不必新增2s全局 Token，局部 motion recipe 登记这一视觉差额。

#### 学习的具体体验

Ant Design X 分出 System/Divider 会话行；对应 Rain 中明确使用 default/border/separator 的 Marker，与正文气泡有可辨读法，而不是每个系统事件另做 Card。具体示例：“正在整理课堂提问”“今天”“已切换到章节二”；异步状态用 role=status，让读者知道工作仍在进行。[Ant Design X Bubble](https://ant-design-x.antgroup.com/components/bubble)、[shadcn Marker](https://ui.shadcn.com/docs/components/base/marker)、[shimmer](https://ui.shadcn.com/docs/utils/shimmer)

#### 示例与验收

三种 variant、图标有无、Spinner+静态文本、shimmer 开/关、包含帮助链接、作为真实按钮的可操作标记、会话中日期与处理事件、作为 Scroller anchor 的分组切换行。校验状态文本能被宣布一次、装饰图标不重复读；shimmer 开启/关闭/reduced-motion 均有可读文本；长标签/窄屏/RTL 不遮挡线与控件；separator 不默认承担 DOM separator role，避免把有内容的标记误标为空分隔线。

### 4.10 Message

#### 保留源码

保留 `MessageGroup`、`Message`、`MessageAvatar`、`MessageContent`、`MessageHeader`、`MessageFooter`。Message `align=start/end` 控制行顺序；end 使用 row-reverse；Content 编排 Header、Bubble 或其他表面、Footer。连续同发送者分组可让前几条 Avatar slot 保持占位、最后一条显示头像。Header 保持起止读法，Footer 跟随消息侧。

源码为展示布局，没有 sender type、role=user/assistant、自带发送请求、时间格式化或消息数组。官网某段 Bubble 说明提到 role 自动对齐，但固定 Message source 实际只有 align；严格以源码为准，不创造误导性的 props。

Nova 基线：消息行 small 字号、8间隔；Avatar 最小32宽、圆角头像表面，与 Footer 存在时上移32；Content 间隔10；Header/Footer 为更小的弱字层级且水平12内边距，ghost 消息解除这段内边距；Group 间隔8。没有内置出入场动画。

#### Rain Token 适配与差额

复用已有 Avatar 真实资产与加载/回退行为，不复制头像 engine；消息行与局部 metadata 分别消费 Rain 字阶与间隔。Bubble、Marker、Attachment 与 Button/IconButton 由 caller 组合，Footer 不再另写按钮样式。头像 slot 的视觉 baseline 与现有 Avatar 尺寸要统一。

需专门复核源码固定上移32的 Avatar 处理：默认短 Footer 可先保留等价定位；多行时间/动作和紧凑密度若出现头像悬空，按同一 Parts 结构做内容表面与 Footer 的 CSS 对齐差额，不能另造测量 observer 或新的消息 wrapper 来掩盖问题。记录前后截图与适配原因，而不是默认宣称原样布局适合所有 Rain Footer。

#### 学习的具体体验

Vercel AI Elements 示例将 copy/regenerate 放在消息动作区域；学习“动作属于具体消息，执行后有即时反馈，流式未完成时重试/反馈状态有清晰限制”。Rain 中 copy 复用 clipboard 能力并给“已复制”；失败显示文字与可重试按钮；宿主决定能否重试、如何提交。Ant Design X 支持不同 role 的默认样式，学习一致的身份与表面规则；Rain 保持 caller 显式 align/variant，场景 fixture 组织角色数据即可，不加公共 role registry。[AI Elements Message](https://elements.ai-sdk.dev/components/message)

#### 示例与验收

有头像/无头像；start/end；Header姓名+时间、Footer已读/失败；同发送者 Group；ghost AI 回复；含附件与一组可操作 Footer；等待→流式→完成、发送失败→重试→完成；固定短Footer与两行Footer对照。支持Tab访问全部动作、label 明确、复制失败也有可见反馈；状态不依赖颜色；头像有适当alt/装饰定义；长文本与附件不推开整行；两个发送者实例互不改变对齐。

### 4.11 Message Scroller

#### 保留全部 Parts 与引擎 API

保留 `MessageScrollerProvider`、`MessageScroller`、`MessageScrollerViewport`、`MessageScrollerContent`、`MessageScrollerItem`、`MessageScrollerButton` 及 `useMessageScroller`、`useMessageScrollerScrollable`、`useMessageScrollerVisibility`。组合对应 @shadcn/react namespace Provider/Root/Viewport/Content/Item/Button；沿用0.3.1，不复制 controller/hooks 成 Rain 私有引擎。

| API/默认值 | 必须保留的含义 |
|---|---|
| Provider.autoScroll=false | 默认不开主动跟随；实时对话示例显式true，已存会话阅读示例false |
| defaultScrollPosition=end | 初次非空数据的 opening position；支持start/end/last-anchor，pending-scroll避免先顶后跳的可见闪动 |
| scrollEdgeThreshold=8 | 边缘判定容差，属于引擎几何默认值，不为了Token-first改造成视觉spacing |
| scrollPreviousItemPeek=64 | 新turn锚到阅读线时保留前文片段，仍允许调用方指定 |
| scrollMargin=0 | 命令/可见位置的边距，保持原有API |
| Viewport.preserveScrollOnPrepend=true | 加载早先消息时保持第一可见稳定ID行的位置 |
| Item.messageId / scrollAnchor=false | stable ID供跳转/可见性/历史保持；anchor可用于用户消息或有意义的系统事件，不绑定role |
| Button.direction=end / behavior=smooth | 双方向跳转；未活动时inert、tabIndex=-1，原生onClick可preventDefault |
| scrollToStart/End/Message | 均返回boolean，命令默认behavior=auto；Message命令实际消费align start/center/end/nearest及scrollMargin，Start/End在固定实现只消费behavior，不能因共享Options类型就声称其余选项有效；已挂载后不存在的ID不猜测重试 |
| scrollable.start/end | 表示还能向该方向滚动，不是atStart/atEnd；无滚动为二者皆false |
| visibility.currentAnchorId/visibleMessageIds | 仅有订阅时启用跟踪；稳定ID与DOM顺序，不给全部消息行增加React滚动状态 |

保留引擎四种内部策略的效果：跟随最新、自由阅读、保持turn锚定、跳转落定。用户wheel/touchMove/滚动键的主动意图释放自动跟随。保留Resize/Mutation响应、rAF协调与清理、按需可见性观察及历史 prepend 的几何处理。不要用一个 useEffect(scrollIntoView) 替换这些成熟逻辑。

#### 完整视觉、状态与动效

Root 为相对定位的flex整框，Viewport为真正的overflow-y-auto容器，min-height:0保证嵌入布局；Content为min-height:100%的纵向真实DOM；Nova默认24消息间隔。Item保留content-visibility:auto与contain-intrinsic-size:auto 10rem，远离视口的内容留在DOM支持选择/复制/页面搜索。不要首版自行虚拟化掉DOM。

保留 pending-scroll隐藏、autoscrolling 滚动条状态、稳定 gutter、薄滚动条、overscroll-contain、contain-content 与底部渐隐。scroll-fade-b 来自已固定 shared CSS：CSS scroll-driven mask，到末尾取消底部渐隐；不支持该CSS时有静态渐隐fallback。制作中检查被mask的最后一行与跳转按钮；必要的padding差额明确登记，不能无故删掉渐隐体验。

跳转按钮源码默认以secondary/icon-sm组合：位置为水平中心、上/下16；200ms入场、400ms退场；translate+scale+opacity；inactive scale=.95/opacity=0/移出边缘，active恢复。首版保留200/400ms进入/退出差异为有来源局部时序，普通按钮paint接Rain140ms；记录与全局Motion的差额，不能统一删为瞬切。reduced-motion 禁用非必要位移与缩放，并把显式smooth命令改为instant/auto；包本身不代替Rain做所有减弱动效约束。

新消息进入沿用官方组合示例：Item可在宿主可选入口示例中交给已安装motion（公共组件默认不加），只动画transform/opacity且保留messageId/scrollAnchor；不要动画height/margin/padding干扰锚定，不对历史载入的每条旧消息重复播放。流式内容按宿主实际chunk增量更新，不另造打字回放器。

#### 学习的具体体验与 host 边界

Vercel Conversation明确提供离开最新位置后出现的“回到最新”按钮；学习可发现但不阻断阅读的回归入口，用现有 Scroller Button实现，不引入 use-stick-to-bottom 第二引擎。[AI Elements Conversation](https://elements.ai-sdk.dev/components/conversation)

宿主拥有消息列表与stable ID、请求waiting/streaming/completed/error状态、何时加载history、空状态与错误重试。Provider只拥有滚动状态。保持 viewport role=region、中文aria-label、tabIndex=0，Content role=log/aria-relevant=additions，streaming期间宿主可aria-busy=true待整行完成后宣布。不要将逐token DOM变化变成逐token读屏通知。真正进入流式完成要根据宿主请求状态，而不是视觉动画结束。

#### 示例与验收

一个真实可操作会话场景内提供以下模式，另有聚焦API样板：

1. 空会话、单条短消息、长度不足一屏、中文长回复；开始发送→等待Marker→同一ID流式增长→完成动作。
2. autoScroll on/off、anchor on/off、用户消息anchor与系统Marker anchor、peek可见。
3. 阅读中往上滚→流式继续但不抢走位置→回到最新；验证wheel、滚动键与模拟touchMove各路径，实机触摸独立记录。
4. 开头prepend历史，记录同一个可见messageId前后偏移；图片/附件异步改变高度、折叠长回复/视口resize仍保持读者位置。
5. start/end/last-anchor打开存档；初始化已有消息时无先显示顶端再跳闪动。
6. 外部outline按stable ID跳转，align四种；挂载前permalink可排队，挂载后missing ID明确返回false；visible hooks更新且取消订阅清理。
7. jump button显隐、Tab不进入inactive按钮、左右主题/密度与RTL；reduced-motion无平滑位移、用户行入口动画也关闭。
8. 多百条带富内容的真实DOM样板验证滚动热路径、选择/复制、find-in-page；记录实际数据规模和浏览器，不把官网性能目标写成Rain实测承诺。

### 4.12 Questionnaire

#### 保留全部 Parts、状态与原生表单能力

保留15个styled出口：Questionnaire、Progress、Item、Title、Description、Choices、Choice、ChoiceDescription、Input、Error、Actions、Previous、Skip、Next、Submit。Choice仍内部组合primitive ChoiceInput、ChoiceLabel、ChoiceShortcut与视觉indicator，不删除shortcut或多选标记。Actions是纯layout；Root始终form，Item始终fieldset。

完整保留：单选/多选/自由输入；required与显式skip；未答/已答/跳过区分；受控/默认当前题；受控checked/defaultChecked、受控/默认输入；按当前题验证后前进、提交时验证所有启用题；disabled题跳过与不计入total；disabled选项不参与回答/快捷键；外部invalid；原生noValidate/action/onSubmit/onReset；reset恢复初始题、默认回答、skip与验证状态；SSR items定义首屏顺序、进度、动作可见性和快捷键；条件题与恢复由宿主组合已有API。

没有将文本答案归一化成另一套answer store：单值FormData.get，多值getAll，跳过在FormData中不存在；宿主需要区别“跳过”和“缺失”时使用Item.onStatusChange。单选题的固定选项与自由输入按引擎处理互斥，多选按引擎允许组合；不要另写冲突选择算法。标题为legend；替换Card/Dialog title时要显式id和fieldset aria-labelledby。

状态属性对应：Root/Progress current、total、first、last；Item active/disabled/invalid/multiple/required/status；Choice type=radio/checkbox、checked/unchecked、disabled/invalid/shortcut；Input filled/empty/disabled/invalid；Error invalid；四动作 visible/hidden/disabled/shortcut/status。Questionnaire这些boolean属性为“存在/不存在”，不同于Scroller Button data-active="true/false"；Rain CSS不得按错误的字符串态绑定。

#### 视觉与 Token 适配

Nova基线：全流程16间隔；Progress小字号弱文本且最小14ch宽；Item为无外框fieldset纵向16间隔；Title中等强调、Description弱文本。Choices grid间隔8；Choice细边框、rounded-lg（随源主题变化，固定默认约10px）、中性轻表面，padding横12/竖10，indicator16、内容分标题/说明，shortcut方形小提示。Rain 首版选已有 Radius/10 保留该关系。选中态保留独立radio实点或checkbox勾，叠加选中边框/浅表面；不能只依赖蓝色底色。禁用有真实disabled与弱化，invalid有边界+Error，focus-visible作用在原生input并传到整张choice外框。

Input有显式wrapper、表面/边框/placeholder/selection/focus/invalid/disabled；在源默认字号/spacing配置下，≥sm为32px，<sm受min-h-11约束至少44px；Choice的min-h-11在所有断点保留。Actions三列布局：Previous左、Skip中、Next/Submit右同一位置；未适用动作hidden/inert，首次没有Previous，必填没有Skip，末题Submit替代Next。四个导航动作同样在窄屏保留至少44px点击高度；紧凑样式不把点击区压没，文本长度增大时布局可换行，不能让动作占位随每步乱跳。

无通用variant或size，Questionnaire四个动作继承shadcn Button size/variant。Rain适配为现有 Rain Button的variant/size，并用render保留primitive处理与真实button/ref。其他表面使用Typography、Field/Input、Radio/Checkbox/SelectionCard现有视觉资源。不要直接在primitive Choice内嵌完整Rain RadioCard/CheckboxCard，形成双input或双label；复用被动RadioIndicator/CheckboxIndicator与同一套视觉Token，native ChoiceInput仍为唯一input与选中状态的owner。Input优先复用兼容的render接缝或现有field视觉，不能用一个带内部状态的Rain Input遮掉primitive事件与name。

#### 键盘、焦点、校验与动效

引擎保留Tab/ShiftTab、choice区域上下方向移动、radio原生选择、Space选择/切换、Enter从已选择/已填控制继续、Ctrl/Cmd+Enter校验并继续或提交。左右题间导航仅在非radio/非文本目标触发；右箭头不把未回答题直接跳走；字母A-Z或数字1-9按启用选项顺序分配，只选中不自动下一题；文本编辑时不抢字母/方向键；isComposing或keyCode229时不触发问答快捷键；event.preventDefault可停用问答键处理。成功导航聚焦新fieldset，失败留/打开invalid题并聚焦答案，Error对当前无效状态使用role=alert。

源码本体不做步骤退出动画；官方组合是当前题入口淡入+轻位移300ms，进度与底部导航固定，inactive题立刻hidden/inert。Rain可转译为已有motion/region Token入口，对应差额登记；不要为了退出动画延迟inert/hidden，造成两个题同时可Tab。Progress默认英文内容与aria-valuetext需共同中文化，不能仅替换可见children还留下英文辅助文本。

#### 学习的具体体验与 host 边界

Typeform官方帮助证实：键盘可用Enter/Tab，choice旁可显示字母；显示进度让回答者知道位置；默认required题会在未答前进时反馈错误；可回看导航与最终必填校验分开；分支长度变化会导致进度比例变化。因此Rain借鉴单题聚焦、选择提示、明确上一题/继续/跳过、可读题次与最后统一验证，复用当前primitive实现。条件题示例使用“第x题，共y题”，不宣称按实际剩余路径精确估时；不要新增自由滚过必填、评分/分支规则编辑器或自动跳题API来复制平台。

宿主拥有题定义、题目顺序/条件、外部校验消息、恢复草稿与提交网络状态；Questionnaire拥有当前题协调、原生答案控制、skip/validation/focus。宿主若要保存恢复，用defaultItem/defaultChecked/defaultValue或受控值组合；本批示例用内存mock，不在组件内部默认写localStorage。Dialog关闭为取消宿主流程，不等同于Skip记录题目未答；提交失败保留答案和当前题，成功显示宿主结果区，不能组件擅自提交后reset。

来源：[Typeform respondent keyboard](https://help.typeform.com/hc/en-us/articles/4410017947412-Keyboard-shortcuts-and-text-formatting-in-Typeform)、[进度与分支限制](https://help.typeform.com/hc/en-us/articles/360051557892-Activate-the-Progress-bar)、[必填和自由导航](https://help.typeform.com/hc/en-us/articles/14006254007572-Let-your-respondents-navigate-through-your-form-freely-before-submitting-it)、[恢复草稿是应用级选择](https://help.typeform.com/hc/en-us/articles/13064754462228-Enable-or-disable-autosave-progress-for-your-respondents)。

#### 示例与验收

主场景为“课前学习需求/课程反馈”三到四题：必填单选含其他输入；多选目标；可跳过补充；完成后在相邻结果区展示答案与skip状态。另设受控/恢复/条件题、Card/Dialog、自定义进度、animated入口API样板。不使用Questionnaire搭考试评分或题库系统。

验收矩阵：

- 单选+自由输入互斥、多选组合、disabled选项不变更、disabled题不计数；name/value稳定且FormData/getAll正确；skip不是空字符串伪回答。
- 未答Next尝试触发当前Error并聚焦；外部invalid显示业务理由；最终Submit发现之前无效题时回到该题；返回后已有回答保持。
- 可见与不可见题/动作的Tab序列；radio箭头/checkbox空格/letters和numbers；freeform真实中文IME中Enter不前进；Ctrl/Cmd+Enter、preventDefault和重复keydown按源码处理。
- SSR items与实际渲染题定义一致，首屏进度/可见动作没有挂载跳变；form.reset正确恢复默认值；受控值不与内部状态打架。
- 条件题变化后当前题仍有效，total和快捷键重排与定义一致；“保存并恢复”是宿主示例动作，未调用保存不擅自落本地。
- Card/Dialog自定义Title保留可访问名称；取消和Skip结果不同；提交mock失败保留答案并有重试；提交中由真实按钮loading/disabled避免重复提交。
- 正常/紧凑/暗色/RTL/窄屏、多行说明/快捷键/触控区；选中radio/checkbox可辨、focus/invalid不是只有颜色；非活动题不能留可聚焦子控件；reduced-motion无入口位移，进度导航保持位置。


## 5. 制作检查与未验证边界

每项按“来源规则 → Rain 规则 → 保留能力 → 差额原因 → 验证证据”登记。先核对全部 Parts 和状态，再制作课程样例，最后检查本地调用、样式、交互和可发现性。最终路径、批次和出口以 [制作计划](../plans/2026-10-14-token-first-g6.md) 为准。

本轮已经完成固定源码、同版样式与官方资料研究；此前的精确版本类型/SSR 探针仅证明其限定兼容范围。现场浏览器观察只覆盖当前 shadcn 的 Attachment、Questionnaire 与 Drawer 的上述状态，不包含 Ant、Vercel 或 Typeform 的完整产品操作。

尚未安装依赖或制作 G6 运行组件；Rain 实际视觉、交互、对比度、Safari/VoiceOver、物理触摸、系统中文 IME、生产规模性能均无本轮通过结论。所有涉及源码差额的视觉和行为决策需在本地样板中验证，人工接受独立登记。
