# G6 组件与消费指南

本地共享候选，尚未发布。使用固定 shadcn Base UI TSX、同版 Nova 与配套工具 CSS，绑定 Rain Token；依赖与源码见 `registry/g6-assets.json`。人工视觉、对比度、Safari/辅助技术/真实触摸和生产采用不由自动检查代替。

| 任务查询 | 资产与公开入口 | 组合与状态所有权 |
|---|---|---|
| 管理课程资料，排序筛选并选择当前页 | `recipe-data-table` / `DataTableRecipe`，复制 `apps/prototype/src/data-table-recipe.tsx` 及 CSS | TanStack 8.21.3 留在应用；稳定ID、本地分页；不宣称服务器全集全选/虚拟化 |
| 为课程封面预留16:9、方形或课件4:3 | `ui-aspect-ratio` / `AspectRatio ratio={16/9}` | 宿主提供img/alt/object-fit/错误占位；有限正比例 |
| 附件上传中、处理、失败和重试 | `ui-attachment` / 九个Attachment Parts | 宿主管请求；Trigger整卡与Actions分离；Group宿主给宽度和键盘入口 |
| 可拖动课前任务抽屉 | `ui-drawer` / Drawer和全部Compound Parts，含DrawerBody | Base UI 1.8四方向/三模态/snap/nested；Body独立滚动，首尾对齐；同层编辑/预览及退出确认、模拟保存留在宿主 |
| 课堂验证码六位输入和粘贴 | `ui-input-otp` / InputOTP、Group、Slot、Separator | 单真实input；FormItem关联实际input；onComplete只是长度完成；显式提交校验 |
| 浏览课程精选、多卡、定时或连续内容 | `ui-carousel` / Carousel、Content、Item、Previous、Next、Controls、Indicators、PlaybackControl、useCarousel | Embla8.5.2独占位置；停靠点指示；显式playback正反播放，交互接管持续停止；仅AutoScroll8.5.2新增依赖 |
| 阿拉伯文课程局部RTL | `ui-direction` / DirectionProvider、useDirection | Provider与DOM dir同时给出；只声明本批实查消费者 |
| 对话内容表面和反应 | `ui-bubble` / Bubble、Group、Content、Reactions | 七variant，start/end，reactions预留宿主空间；不内置Markdown引擎 |
| 时间分隔、系统状态或轻操作 | `ui-marker` / Marker、Icon、Content | 三variant，文字/图标/动作共同表达状态；shimmer减弱动效可读 |
| 可识别角色、复制与失败重试 | `ui-message` / Message和五个布局Parts | 发送者映射由宿主；Avatar→Content同DOM顺序由align反转；真实文本复制及状态反馈 |
| 增量回答和历史消息阅读 | `ui-message-scroller` / 六Parts＋三个hooks | @shadcn/react0.3.1，autoScroll原默认false；对话显式true；稳定ID/锚点/prepend保位 |
| 课堂逐题反馈、回改与跳过 | `ui-questionnaire` / 15 styled Parts | 同唯一引擎；原生form/fieldset/input/FormData；items支持SSR，宿主拥有条件题/保存/提交/摘要 |

公共 UI 从 `@rain-next/ui` 导入。加载 Foundations 的 tokens、typography、focus、motion、tailwind-theme 和 UI styles；Tailwind消费需扫描 UI 源码与实际调用文件。Registry每项列出真实来源、Parts、依赖与可获取文件，Manifest不得省略；DataTable是forkable Recipe，其余是managed UI。

## 可复制的真实调用

```tsx
import { AspectRatio, Attachment, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentTrigger, AttachmentActions, AttachmentAction, DirectionProvider } from "@rain-next/ui";
import { FileIcon } from "@rain-next/ui/icons/file";
<AspectRatio ratio={16/9}><img src={cover} alt="课程封面" className="w-full h-full object-cover" /></AspectRatio>
<Attachment state="done">
 <AttachmentMedia><FileIcon /></AttachmentMedia>
 <AttachmentContent><AttachmentTitle>课程导读.pdf</AttachmentTitle><AttachmentDescription>PDF · 1.8 MB</AttachmentDescription></AttachmentContent>
 <AttachmentTrigger aria-label="预览课程导读.pdf" onClick={preview} />
 <AttachmentActions><AttachmentAction aria-label="移除课程导读.pdf" onClick={remove}>移除</AttachmentAction></AttachmentActions>
</Attachment>
<div dir="rtl"><DirectionProvider direction="rtl">{controls}</DirectionProvider></div>
```

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerBody, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, Button, FormItem, InputOTP, InputOTPGroup, InputOTPSlot, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@rain-next/ui";
<Drawer snapPoints={[0.5,0.85]} showSwipeHandle>
 <DrawerTrigger render={<Button>编辑</Button>} />
 <DrawerContent><DrawerHeader><DrawerTitle>课前任务</DrawerTitle><DrawerDescription>保存或取消本次草稿。</DrawerDescription></DrawerHeader>
 <DrawerBody>{body}</DrawerBody><DrawerFooter><DrawerClose render={<Button>取消</Button>} /></DrawerFooter></DrawerContent>
</Drawer>
<FormItem label="课堂验证码" required><InputOTP name="code" maxLength={6} onComplete={notifyLength}>
 <InputOTPGroup>{Array.from({length:6},(_,index)=><InputOTPSlot key={index} index={index} />)}</InputOTPGroup>
</InputOTP></FormItem>
<Carousel aria-label="课程素材" tabIndex={0}><CarouselContent>{slides.map(slide=><CarouselItem key={slide.id}>{slide.content}</CarouselItem>)}</CarouselContent><CarouselPrevious /><CarouselNext /></Carousel>
```

Message、Scroller和Questionnaire完整可运行组合见三组独立Playground页面和本轮独立消费夹具。使用来源Button/render时让引擎拥有真实ref与事件；不要套第二input、嵌套button/label或另造selectedIndex。Questionnaire宿主校验用Item.invalid对接原引擎，final Skip依来源会提交；宿主应给明确文案与结果。Scroller按ID跳转失败会返回false，保留调用方取消优先和reduced-motion。

## 局改与来源差额

优先使用公开原生Props、className/style/render、组件具名LocalRecipe；固定来源尺寸/手势参数和普通Rain paint分开记录。方向不新造包装DOM。AspectRatio的ratio优先于冲突style。Carousel默认浅灰36px导航；Controls支持inline/overlay及top/bottom/start/end指示器，宿主可用className/style安排媒体安全区，不再预留旧默认外置48px通道。Drawer嵌入Carousel用BaseUI1.8的`data-base-ui-swipe-ignore`区域仲裁；该版本不解析轴值。消息头像/反应/长文本留白由宿主布局负责。

Default、局改和未改兄弟需要在实际任务中检查；来源、逐项差额与验证范围见本轮 `source-differences.md`、各组件README、`verification.md`。不要将人工Gate或旧表格局部验收迁入这些新资产。

源码包消费的TypeScript采用Bundler模块解析、react-jsx、allowImportingTsExtensions及noEmit；本地未发布的Rain包通过tarball与精确override统一为单一Foundations实例，不能向npm请求私有0.0.0包。独立消费夹具记录安装及构建日志。

## Carousel v0.4 后续升级

用户接受的是本地v0.4视觉与交互稿，公共实现另行验证。共享Carousel默认手动，显式playback选择autoplay(delay毫秒)或continuous(speed为px/s，按Embla60Hz固定步长换算AutoScroll参数)，支持forward/reverse。Controls负责组合，Indicators按真实scrollSnaps生成，不按内容张数假设。边缘aria-disabled保持焦点；用户暂停、聚焦、拖动、箭头和短条接管持续停止，悬停/后台/离屏仅临时暂停。减弱动效默认停止自动播放。

根内`--rain-local-carousel-*`记录Neutral绿色通道去色及主题Surface配方（control-white历史名在Dark采用中性深底），保留全局色板；派生后实际颜色单独测量。README、Manifest及`evidence/runtime/carousel-upgrade-2026-10-14/`提供API、来源和验证范围，原G6封存保持不变。

2026-10-14公共视觉反馈：独立布局的箭头按确认稿放标题右侧，连续展示放页脚；短条独立在四向环绕轨道。播放控件默认36px文字按钮/16px图标，showLabel=false为36/20紧凑形式。覆盖箭头恢复8%轻阴影；纵向下箭头/底部胶囊偏移为32/28px。有限来源和验证见 `evidence/runtime/carousel-upgrade-2026-10-14/feedback-01/verification.md`，原封存记录保留。

2026-10-14用户已确认当前公共Carousel预览的视觉与交互通过。接受范围仅为该预览；Safari、VoiceOver、真实触摸、媒体对比度、发布、Figma和生产接入没有新增接受。收尾证据：`evidence/runtime/carousel-closeout-2026-10-14/verification.md`。

## Attachment 后续功能组合

2026-10-15的 `recipe-attachment-workflow` 单独登记于 `registry/attachment-workflow.json` 和 `manifests/recipes/attachment-workflow.yaml`，不改原G6十二项清单或Attachment九Parts。需要选择/拖放、文件约束、上传取消重试、原位替换、异步移除、详情和有限预览时，组合 `AttachmentPicker` + `useAttachmentUpload` + `AttachmentList`；需要自定义预览入口时单用 `AttachmentPreview`。均从 `@rain-next/ui` 导入，沿已有样式入口，当前仍为managed、本地未发布候选。

Hook拥有内存草稿，宿主通过真实 `upload`/`onRemove`/`onDownload` 适配器连接服务；可选 `createAttachmentXhrUploader` 提供真实POST与进度，不预置服务器成功。`initialItems` 只初始化，换记录或刷新快照用明确的 `reset`；`onChange` 是草稿通知，不代表保存。`summary.canSubmit` 只检查上传/替换/移除是否未完成；业务提交还需判断文件可用性、权限、必传数量和表单规则。

栅格图使用img，PDF默认最多读取20 MiB并检查文件头、固定MIME后交给浏览器；SVG/HTML/Office等回退。原始本地File或调用方Blob不直接新窗口打开；只有已校验PDF Blob和允许的正式服务URL可打开。前端动作权限不等于文件服务鉴权，下载受限PDF不嵌原生查看器，服务URL打开权限仍独立。完整调用与安全/生命周期边界见 `packages/ui/src/attachment-workflow/README.md`。功能验证记于 `evidence/runtime/attachment-functions-2026-10-15/verification.md`；样式/交互接受、真实服务、Safari/VoiceOver/触摸、对比度、发布与业务迁移仍分别判断。

2026-10-16 附件整合视觉方案已完成本地有限实现：公共 `AttachmentList` 增加 `surface="outlined" | "filled"`（默认 outlined），使用既有彩色文件图标、保留扩展名的标题、大小与必要状态、小状态位，以及独立下载图标按钮和更多菜单。文件信息、打开、替换和移除由菜单承载，各权限及原位替换合同继续独立。Playground 的 `AttachmentStatesDemo` 为页面私有七状态白灰双列示例，不新增公共上传状态或 G6 资产。本轮 192 项单元测试、14 项桌面/窄栏浏览器回归通过，独立技术审查发现的错列问题已修复，当前无遗留 P1/P2；类型检查与构建以最终验证记录为准。计划见 `docs/plans/2026-10-16-attachment-visual.md`；来源与验证另记于 `evidence/runtime/attachment-visual-2026-10-16/source-bindings.json`、`verification.md`，原功能轮与 G6 封存记录保留。该轮待审状态保留为历史时点；2026-10-16用户确认当前 `/#attachment` 预览视觉通过，范围为 `current-attachment-preview-visual-only`，见 `evidence/runtime/attachment-visual-acceptance-2026-10-16/manual-acceptance.json`。对比度仍为 `not-granted`、发布 `unpublished`。页面私有列表/弹窗、媒体网格和输入区入口不自动成为公共组件API。


## ConversationComposer 共享对话输入组合（2026-10-15）

课程答疑和课堂讨论已接入独立候选 `ConversationComposer`，从 `@rain-next/ui` 导入；入口为 `#conversation-composer`，组合源码在 `packages/ui/src/conversation-composer/index.ts`。它不增加原 G6 十二项的分母。

- 两种表面和紧凑/展开布局独立，Enter 换行；上下文和草稿在切换布局后保留。
- 附件通过唯一 `useAttachmentUpload({autoUpload:true})` 适配；资料选择、拖放、图片粘贴共用入口。`done` 与资源可用性分开校验。
- AI 引用和范围分别选择；讨论回复独立保留。提交确认前保稿，失败原按钮重试，用户修改后清旧错误，回答与下一稿分开。
- 浏览器录音与宿主转写服务分离；转写失败/取消保留录音，可重试或明确丢弃。没有服务能力时不显示假入口。
- 受控数据、消息幂等、权限、上传/转写/检索服务及草稿持久化由宿主负责。本页服务均为本地模拟。

API 与接入示例见 [组合 README](../../packages/ui/src/conversation-composer/README.md)、[Recipe Manifest](../../manifests/recipes/conversation-composer.yaml)及[当前整体验收与登记收口](../../evidence/runtime/conversation-composer-2026-10-15/run-10/verification.md)。当前本地版本整体已于2026-10-16获用户明确验收，Human Gate 为 accepted，资产保持 registry-candidate、unpublished。真实设备、Safari/VoiceOver 独立验证，真实业务接口按用户要求后续接入。
