# G6 建设实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 沿原工作包核对并补齐 G6 的 12 项能力，形成真实可调用的资产、独立 Playground 入口、使用说明与验证证据。

**Architecture:** System Mode；沿用 `.worktrees/card-v2` / `codex/card-v2` 的已有未提交成果、Rain Foundations、UI、Layout 和文档壳。已有能力优先复用；新增能力适配固定 shadcn Base UI 源码和同版 Nova 样式，保留结构、状态、引擎、键盘、焦点与动效。数据请求、权限、上传、验证、消息流和业务状态由宿主拥有。

**Tech Stack:** React 19.2.8、Base UI 1.8.0、已有 CVA / rainCn、TanStack Table 8.21.3、Vitest、Playwright；用户已授权新增 input-otp 1.4.2、embla-carousel-react 8.5.2、@shadcn/react 0.3.1。

---

## 本轮推进状态与依据

用户 2026-10-14 先提出“G5已基本按计划完成建设。继续推进G6的计划。”随后明确“确定，授权这三项新依赖，开始按计划推进 G6 建设”，并要求“尽量使用 shadcn ui 组件的代码”“在做之前，我们先通过调研、分析 并 梳理好一个详细的制作计划”。

据此，本轮完成制作前研究与详细方案，三项精确依赖及 G6 建设授权保存于 [本次用户授权记录](../../evidence/runtime/g6-research-2026-10-14/authorization.json)。目前未安装依赖、未修改公共运行源码；不把计划就绪写成实现或验收完成。实施沿本计划继续，不重复索取同一依赖许可。

**开工前置已查明：** 旧 library governance 对整个 `status/current-phase.yaml` 作哈希冻结；只追加 G6 节点也会令 G5 只读检查失败。本轮已撤回临时阶段增量并保持旧文件原样，见 [登记探针](../../evidence/runtime/g6-research-2026-10-14/phase-registration-probe.json)。Task 1 先建立精确的 G6 后继许可：保护旧阶段和 Gate，只允许新增 G6 节点及有限文件；完成对应负例检查后再登记 `componentRefinements.g6Components` 和安装。这是已授权建设内的治理接入工作，不是再次请求依赖批准。

**详细制作规格：[G6 组件调研与制作规格](../research/2026-10-14-g6-component-research.md)**。该文档包含 12 项实际 Parts/Props、源码几何与状态、成熟参考的具体取舍、Rain Token 绑定、动效/错误流程和逐项验收场景；本计划负责把它们转换为可执行批次和文件交付。调研检查记录见 [本轮核验](../../evidence/runtime/g6-research-2026-10-14/verification.md)。

执行目录固定为 `/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`。不在主仓库实现第二份组件，不创建新工作树，不提交、推送、发布、写 Figma 或迁移业务。用户的“基本完成”作为推进背景；不改写 G5 各次视觉、对比度和辅助技术验收。

原工作包 `rain-classroom-vibe-ui-spike/docs/rain-next-v1.2-token-first/` 的 `03-COMPONENT-COVERAGE.json`、`09-DELIVERY-PLAN.json`、`01-CODEX-EXECUTION.md` 是范围来源。原顺序 53–64 为 Data Table、Aspect Ratio、Attachment、Drawer、Input OTP、Carousel、Direction、Bubble、Marker、Message、Message Scroller、Questionnaire。保持 12 项分母；能力数量与新增资产数量分别统计。

本次来源、当前代码核对、依赖候选、只读 G5 校验与 Data Table 测试见 [计划前核对](../../evidence/runtime/g6-preflight-2026-10-14/verification.md)及[固定来源](../../evidence/runtime/g6-preflight-2026-10-14/source-lock.json)。该证据只支持规划，不作为 G6 运行验收。

## 方案选择

采用“已有能力复用＋固定成熟源码差额适配”。可复用的结构、Parts、状态、引擎与动效均先保留；视觉以 shadcn 同版 Nova 的信息层次、留白和轻表面为起点，按 Rain 角色绑定字体、颜色、间距、圆角、图标与焦点。其他成熟产品只吸收有明确来源的具体体验，不再引入第二套行为引擎。

上游固定 commit 延续 G4/G5：`3ba91b1cc83e1bbe4ab35a422ff2a694849c5048`。实时官网用于确认当前语义；实施结构和样式以已保存的固定源码为准，不能混用不同版本而不记录差异。源文件和许可原文仅为证据，不导入上游全局 CSS，不分发官网示例照片或未经许可的字体。

Data Table 是组合能力，当前 `DataTableRecipe` 已拥有排序、筛选、稳定 ID 选择、分页、列显隐、加载、失败和空态。其 `registry/table.json.localRecipe` 仍为 `local-experiment` / `searchable:false`；本轮补单独能力合同和消费入口，不能因命中 Table 就宣称高级 DataGrid 已完成。固定上游 Data Table 文档已使用 TanStack v9；本轮保留本地 8.21.3 行为和 API，登记这项明确差异，不升级数据引擎。

Drawer 复用已安装 Base UI 1.8.0 的 Drawer 引擎。Sheet 也是该底座，但其已有内容结构和验收保持独立；新增 Drawer 必须实际呈现手势和吸附行为，不能用 Sheet 别名计数。

## 研究形成的制作决策

| 参考 | 吸收的具体做法 | 在 Rain 的落点 |
|---|---|---|
| shadcn 固定源码 + Nova + 配套工具 CSS | Compound Parts、状态驱动样式、轻边框、内容层次、原生能力和现成行为引擎 | 12 项逐一登记源码/样式差额，完整迁移实际使用的样式，不只抄组件名或 TSX |
| Ant Design Table / Upload、Mantine AspectRatio | 数据操作范围明确，失败与恢复可见，媒体比例与裁切分工 | Data Table 独立 Recipe；Attachment 由宿主管上传，整卡预览与移除/重试分离；比例容器保持简单 |
| Base UI、Material 官方底部面板 | 四方向、部分/完整展开、手势回弹、关闭确认、嵌套焦点 | Drawer 保留完整来源能力，课程资料底部抽屉为主例，四方向均有检查 |
| input-otp、Mantine、Embla、WAI | 单真实输入、原生粘贴/自动填充，手动轮播、可访问命名和稳定焦点 | OTP 配合 FormItem；Carousel 保留公开引擎入口并修复键盘范围、清理和事件组合 |
| Ant Design X、Vercel AI Elements | 内容、消息状态、动作区和滚动容器分工；回到底部可见 | Message/Bubble/Marker 各司其职；增量输出不抢用户上滚位置；请求完成与文字动画完成分开 |
| Typeform | 单题聚焦、可返回修改、可跳过、快捷键和条件题进度 | Questionnaire 保留 @shadcn/react 状态与原生表单，宿主负责保存/提交反馈 |

来源链接、实际读取范围与未核实部分详见调研文档。上述是设计取舍，不代表参考产品或 Rain 组件已在本轮通过完整交互测试。

## 十二项合同与最低退出条件

下表中的“完成”均指本地实现与对应技术检查完成；人工视觉、对比度、发布和生产采用另记。

| 能力 | 建设范围与复用 | 本批必须实际检查 | 保留边界 |
|---|---|---|---|
| Data Table | 复用 `apps/prototype/src/data-table-recipe.tsx`、Table、Pagination、Checkbox、筛选和菜单；独立 `#data-table` 文档与 forkable Recipe 候选合同，公开 UI 不引入 TanStack | 排序后按 ID 保留选择；当前页全选范围；查询回首页和清理选择；列显隐；刷新失败保留内容；窄屏滚动与键盘 | 客户端本地数据；服务器分页、树、透视、虚拟化不计入 |
| Aspect Ratio | 固定来源的比例容器结构和原生 CSS `aspect-ratio`；媒体、alt、裁切和错误占位由宿主提供 | 16:9、1:1、4:3；不同容器；图片 cover/contain；长标签、加载失败占位；无无效比例 | 不扩为图片加载器或播放器 |
| Attachment | 保留 Root、Media、Content、Title、Description、Actions、Action、Trigger、Group 九个 Parts；复用 Rain 按钮、图标、Dialog 和状态色 | 文件/图片；上传中、处理中、失败、完成；预览与移除/重试互不误触；长文件名；键盘；横排/竖排与窄屏 | 状态由宿主控制；上传和下载演示明确为本地模拟 |
| Drawer | 保留源码 Drawer、Trigger、Close、Content、Portal、Overlay、SwipeHandle、Header、Footer、Title、Description；Content 内组合原引擎 Viewport/Popup/Content；保留四方向、三种 modality、swipe/snap/nested | 四方向开关/回焦；拖动跟手/回弹；吸附切换；滚动竞争；取消关闭/草稿保留；嵌套菜单；窄屏和 reduced motion | 底部任务抽屉为主例，完整来源能力不裁为 bottom-only；不改变既有 Sheet |
| Input OTP | 固定 input-otp 单原生输入＋槽位显示；保留 Group、Slot、Separator、上下文、光标和原生表单；接入 FormItem 关联 | 输入、整段粘贴、方向/删除/选区、禁用/只读/错误、ref、name/form、自动填充属性；完成回调不重复；IME 不误提交 | 校验后端、短信发送、风控与倒计时由宿主提供 |
| Carousel | 保留 Carousel、Content、Item、Previous、Next、useCarousel/CarouselApi；Content 内保留裁切 Viewport；opts/plugins/orientation/setApi 入口不裁减 | 前后/边界 disabled、横纵键盘、编辑后代不被抢键、拖动、当前页提示、内容变更、RTL、清理监听与 reduced motion | 默认不自动播放，不安装 autoplay 插件；保留宿主 plugins 入口 |
| Direction | 复用 Base UI DirectionProvider/useDirection；provider 不写 DOM `dir`，示例宿主须同时设置原生方向 | ltr/rtl 嵌套覆盖；实际支持方向的 Base UI 控件和 Carousel；文字/图标顺序；不污染兄弟实例和 portal 方向 | 只声明本次测过的消费者，不宣称全库 RTL 完成 |
| Bubble | 保留 Bubble/Group/Content/Reactions、全部七个 variants、start/end 对齐及四方向 reactions；沿源码的 max-width 与 ghost 关系 | 全 variants 样板；长正文、代码/链接/附件；reaction 不遮挡正文；窄屏和 RTL 逻辑位置 | 不内置模型、请求或 Markdown 渲染引擎 |
| Marker | 会话状态/系统备注/分隔标记，保留 default/separator/border、图标、标题/描述和动作关系 | 时间分隔、系统备注、状态及可执行动作；长内容；状态不只依赖颜色 | 不将任意彩点或图表 marker 当作等效资产 |
| Message | 会话消息行，组合头像、标题/元信息、内容表面、附件和动作；固定 API 只有 `align`，发送者角色由宿主映射 | 角色可识别；长消息；复制真实文本并反馈；失败/重试按宿主状态工作；动作名称和键盘 | 不把系统 Toast 或通知条换名；不建设聊天平台 |
| Message Scroller | 保留 Provider、Root、Viewport、Content、Item、Button 和三个 hooks；保留锚点、prepend 恢复与滚动生命周期，autoScroll 原默认 false | 对话显式 autoScroll=true；用户上滚不被抢回；尺寸变化；按 ID 跳转/首尾导航；prepend 位置；稳定 ID；卸载清理 | 本地模拟流和历史追加；真实分页服务另属宿主，不改写原默认 |
| Questionnaire | 保留 Root/Progress/Item/Title/Description/Choices/Choice/ChoiceDescription/Input/Error/Actions/Previous/Skip/Next/Submit 与 primitive 输入语义；引擎维护回答，宿主持久化/提交 | 单选/多选/文本、必填/自定义校验、返回回改、可选跳过、条件题、受控步骤、恢复/SSR、FormData、快捷键和焦点；提交后的宿主摘要 | 摘要是宿主组合，不能虚构上游 Summary Part；不扩为编辑器、考试或评分系统 |

Parts 与 props 以实际固定源码及已验证引擎类型为准。上表不是新造 API 的许可；适配时建立逐项差异表，所有保留/缩减均可追溯。

## 已授权的新增依赖

| 已授权直接依赖 | 安装位置 | 原因与限制 |
|---|---|---|
| `input-otp@1.4.2` | `packages/ui` | 固定源码使用的验证码引擎；保留粘贴、选区、自动填充和原生单输入，避免自行重写 |
| `embla-carousel-react@8.5.2` | `packages/ui` | 固定轮播 React 引擎；传递 `embla-carousel@8.5.2`、`embla-carousel-reactive-utils@8.5.2` 一起锁定，保留拖动、尺寸观察、边界与清理 |
| `@shadcn/react@0.3.1` | `packages/ui` | 同一个包承载 Message Scroller 和 Questionnaire；按子路径导入；React >=19，核对 tarball、许可证和实际出口 |

三项精确版本的用户授权已于 2026-10-14 获得，来源与 npm 元数据见 source lock；安装在实施 Task 1 执行。版本/peer/static 检查不等于本仓库实际安装和浏览器兼容通过。不新增 Vaul、Radix、自动播放插件、AI SDK、Markdown 引擎或第二套表格依赖。

实施命令：`pnpm --filter @rain-next/ui add --save-exact input-otp@1.4.2 embla-carousel-react@8.5.2 @shadcn/react@0.3.1`。只接受这三项及其正常传递依赖的锁文件增量；出现无关升级先恢复本次安装引入的无关差异，不能覆盖用户已有锁文件改动。

TanStack 8.21.3 已安装于 Prototype；若新 Playground Data Table 页直接沿用原配方，则保持现有依赖边界。需要新应用直接导入时，在对应应用登记相同精确依赖并验证独立安装；不能利用工作区提升隐含可用性。G6 新运行源码及依赖统一登记阶段，旧授权不自动覆盖新资产。

## 批次和实施步骤

### Task 1：冻结本轮前态和固定来源

**Files:** 新建 `evidence/runtime/g6-components-2026-10-14/{baseline.json,before/,source-lock.json,source-bindings.json,source-differences.md}`；为 `scripts/verification-helpers.mjs`、必要的相关治理 fixture 与独立 G6 治理测试建立有限后继；追加 `status/current-phase.yaml` 的 G6 精确实施范围。

1. 保留本轮 preflight/research；另存实施前公共出口、样式、依赖、目录、阶段、治理与相关组件文件快照和 SHA-256。先处理已证实的整文件冻结：用新 G6 证据精确绑定授权、旧阶段快照与有限文件，旧节点逐项保持相同；负例必须拒绝旧 Gate 篡改、未授权新增阶段、额外依赖、无关源码变动。旧冻结证据不重签、整目录不放行。新登记与 G5 只读检查同时通过后才进入依赖安装。
2. 复用本轮已取得的 12 项源码、同版样式、依赖与许可记录，不重复下载 latest；同时纳入本轮补查的 shadcn 工具 CSS。检查实际 npm tarball 完整性与版本；按已获得授权安装三项精确版本并检查锁文件差异。
3. 逐项记录 Anatomy、Parts、props、variants、states、density、Token、Accessibility、Visual Lineage、来源及修改等级。公共 UI 为 managed / registry-candidate；Data Table Recipe 为 forkable 候选；演示数据为 local-experiment。
4. 确认旧 G4/G5 来源锁、受接受源码、截图、颜色账本和 Gate 未改变。必要新授权使用精确文件清单；不扩目录白名单、不重签旧证据以消除发现。

### Task 2：A 批——Data Table、Aspect Ratio、Attachment、Direction

**Files:** 新建 `packages/ui/src/{aspect-ratio,attachment,direction}/` 的实现、样式、README 与必要测试；新建 `apps/playground/src/docs/components/g6-media-pages.{tsx,css,test.tsx}`；新建 `manifests/recipes/data-table.yaml`、`manifests/ui/{aspect-ratio,attachment,direction}.yaml`。仅在必要时修改原 DataTableRecipe，保护其调用方和原测试。

1. 为新增非平凡逻辑先写失败测试：比例边界、附件独立动作、局部方向继承；Data Table 复用已有 5 项测试，增加确有差额的用例。纯 Parts/静态样式用浏览器夹具检查，不为每个薄封装编写镜像测试。
2. 适配固定源码，复用 Rain 合并类、render、按钮和图标；不为比例和 provider 造额外配置层，不重写已有表格引擎。
3. 建立独立 `#data-table`、`#aspect-ratio`、`#attachment`、`#direction`，沿 `ComponentDoc` 提供用途、避免、Parts/API、可复制真实代码。附件 Actions 保留高于整卡 Trigger 的层叠与独立焦点；例子有实际操作结果、默认/局改/未改兄弟；媒体使用可分发的本地占位素材。
4. 首批实际渲染并检查浅深、双密度、390px、长内容、键盘和字段关联，修复必要缺口。Attachment 实际迁移五态、三尺寸、横/竖附件布局、横向滚动 Group、shimmer/scroll-fade 及 reduced-motion；Direction 用真实 DOM dir 与 Provider，Portal 方向未桥接即作为差额处理。为新 Data Table Recipe 检索身份登记来源和未验范围；不迁入旧 Fork 的局部验收。

### Task 3：B 批——Drawer、Input OTP、Carousel

**Files:** 新建 `packages/ui/src/{drawer,input-otp,carousel}/` 的实现、样式、README 和测试；新建 `apps/playground/src/docs/components/g6-interaction-pages.{tsx,css,test.tsx}`、`manifests/ui/{drawer,input-otp,carousel}.yaml`。

1. 先写关键行为失败测试；核对 Task 1 已安装依赖的真实类型、生命周期和来源结构，再最小适配。
2. Drawer 保留四方向、三种 modality、物理手势、snap/nested、starting/ending 状态和焦点管理，复用现有浮层主题传递；明确视口、内容滚动与固定操作区所有权，不复刻 Sheet 的任务内容结构。首版保留来源的手势运动基线与释放强度关系为组件局部参数，普通 paint 接 Rain Motion；不能把所有物理回弹时长机械换成全局 220ms。
3. OTP 保留单原生输入；FormItem 关联到实际可聚焦输入，槽位为展示，补齐引擎已有 placeholderChar 展示。Carousel 卸载时解除 `select` 和 `reInit` 两项监听；键盘不能影响嵌套输入控件，纵向实例对应上下键，组合调用方事件/disabled，位置提示基于引擎真实当前位置。Drawer 内嵌轮播须验证手势竞争，必要时沿引擎提供的方向忽略属性处理。
4. 建立 `#drawer`、`#input-otp`、`#carousel`，分别演示课程资源抽屉、加入验证和课程素材浏览；对拖动回弹、边界、取消/返回、粘贴及布局变化执行真实浏览器检查。

### Task 4：C 批——Bubble、Marker、Message、Message Scroller、Questionnaire

**Files:** 新建 `packages/ui/src/{bubble,marker,message,message-scroller,questionnaire}/` 的实现、样式、README 和必要测试；新建 `apps/playground/src/docs/components/g6-conversation-pages.{tsx,css,test.tsx}`、`manifests/ui/{bubble,marker,message,message-scroller,questionnaire}.yaml`。

1. 核对实际保存源码和包的子路径类型，先验证消息滚动生命周期、问答校验/返回修改，以及动作真实结果；纯 Parts 映射复用来源并验证可访问语义，不补机械测试。
2. 三项呈现资产保留各自 Anatomy；Message 组合 Bubble/Attachment/头像与动作，Marker 支持会话分隔/状态。状态文本由宿主提供，不凭视觉 variants 定义业务生命周期。
3. Message Scroller 与 Questionnaire 由唯一成熟引擎管理行为。Provider、锚点、refs、hooks、焦点与清理不可省略；不能将普通滚动容器或 RadioGroup 另取同名就计完成。Questionnaire 保留 primitive ChoiceInput 的唯一状态与原生输入，复用被动 RadioIndicator/CheckboxIndicator 和已有选择卡外观，不能套入完整 RadioCard/CheckboxCard 产生双 input 或嵌套 label。
4. 建立五个独立文档入口；共同使用一组课程辅导本地模拟消息和一组三题反馈问答。消息演示支持新增、模拟增量、暂停/失败/重试、历史 prepend 和回到底部；对话显式 autoScroll=true，阅读存档例保留 false。问答支持回改、必填/自定义校验、可选跳过、条件题、恢复、快捷键和宿主摘要。本轮不接模型或真实收集后端。

### Task 5：出口、治理与可发现性串行整合

**Files:** `packages/ui/src/index.ts`、`packages/ui/src/styles.css`、`packages/ui/package.json`、`pnpm-lock.yaml`；`apps/playground/src/docs/components/{component-catalog.tsx,component-asset-page.tsx}`、`apps/playground/src/styles.css` 及必要路由；`registry/g6-assets.json`、`docs/ai/g6-components.md`、`docs/ai/{asset-index.md,prototype-design.md,README.md}`；现有索引生成器/边界与消费扫描的精确增量。

1. 保持目录 12 项能力分别可发现，复用项不重复安装或计数；Registry 仅指向已存在可获取源码，UI 与 Recipe 层级分开，npm 依赖声明实际安装包。
2. 同步 Manifest 与 README 的 API、Parts、variants/states/density、compositionRules、useWhen/doNotUseWhen、Token、sourceVersion、来源与未验范围。
3. 每项以真实任务查询合同并使用实际 API 生成/改一例，保留默认、局改和未改兄弟证据；检查独立源码消费、样式加载和构建产物。不以“索引生成成功”代替 AI 调用验证。
4. 来源/Token/边界扫描只新增本批精确文件；修改冻结消费者须登记有限后继与前后哈希，不能关闭旧发现或更改旧 humanGate。

### Task 6：验收准备与独立复核

**Files:** 新建 `tests/e2e/g6-components.config.ts`、`tests/e2e/g6-components.spec.ts` 及必要小型消费验证入口；本轮证据统一写 `evidence/runtime/g6-components-2026-10-14/`，旧目录只读。

1. 各批 RED/GREEN 与集成后相关回归一次；基本命令：`pnpm exec vitest run <本批组件/页面/治理测试>`、`pnpm typecheck`、`pnpm --filter @rain-next/playground build`、`pnpm --filter @rain-next/prototype build`。记录失败和范围，不降级检查来通过。
2. 使用本轮构建产物进行 E2E：桌面/390px、浅深、双密度、长内容、缺失/错误状态、Tab/Enter/Escape、真实操作反馈、嵌套 portal、正常/reduced motion、适用 forced-colors；关键项目对应十二项退出条件。
3. 查看实际截图和操作结果，比较同组控件、图文基线、媒体与正文比例、动作区和错误信息；源码数值或几何中心不冒充视觉对齐通过。保留首版、自查修订和后续反馈，人工接受独立记录。
4. 另一代理先核规格再审实现，修复有效发现并对相关用例复验。输出实施与自动检查范围、源码绑定、独立消费、来源差异、准确能力覆盖和未完清单。
5. `humanGate` 保持 `awaiting_human`；对比度不足实际记录，不从 G5 或旧例继承接受；Safari、VoiceOver、系统中文 IME、物理触屏和生产性能未测即明确未验证。

## 并行方式与停止条件

每批组件目录可分给独立代理；公共出口、索引、锁文件、阶段与治理由主代理串行整合。先 A 后 B，C 在其 Attachment/Direction 前置完成后集成；C 来源核对可提前并行。每批检查点报告真实完成、失败和下一动作，不以文件数量统计进度。

未知/无法获得许可的源码、破坏现有能力的依赖、会覆盖用户文件的改动，暂停对应项并记录；无关项继续。实际包 API 与固定源码不兼容时先说明差额与替代范围，不能无记录切换 latest 或自行重写成熟引擎。

本轮不做高级 DataGrid、真实上传/短信/模型服务、聊天平台、问卷/考试编辑系统、全库 RTL、自动轮播、全库 Token 重建或生产发布。没有需求不新增这些范围；必要的键盘、Focus、错误处理、来源与可访问性不削减。


## 2026-10-14 本地实施收口

Task 1—6 的本地制作已落地：11项公开UI与1项复用Data Table Recipe、12个独立Playground入口、完整Parts/API说明、Registry/Manifest与AI查询消费。来源沿固定shadcn TSX、Nova及shared CSS，三项新增依赖为已授权精确版本；未引入第二行为引擎。

组件/页面、独立包消费、默认/局改/未改兄弟隔离、桌面与390px交互已完成本轮范围的自动检查与独立审阅。最终命令、结果、修订及未验项统一记在 `evidence/runtime/g6-components-2026-10-14/verification.md`。实现状态为本地completed，自动与独立审阅为passed-scoped；人工视觉、对比度、发布与生产接受分别保持开放。

原141路径baseline及旧Gate/证明不改。为保留原182项B2断言，仅追加 `scripts/verify-tailwind-b2.test.ts` 一条精准测试后继，原protected bytes与before副本由 `test-fixture-supplement.json` 独立绑定；当前可编辑闭包精确142路径。两RN14源码及一份设计Skill文档的并行改动另记为只读观察，未变成G6编辑授权。旧合成夹具使用完整经过验证的G6前态，实际G6校验继续拒绝重签旧证明、放宽路径或转移人工Gate。

Safari、读屏/VoiceOver、物理触屏、系统中文IME、真实短信自动填充、完整颜色可读性及生产性能尚未验证。未提交、推送、发布、写Figma或迁移业务。
