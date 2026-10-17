# G6 Task 1：有限治理后继

2026-10-14；本记录只证明制作前态与治理接入，不表示12项组件完成。

- 保留旧 Library/G4/G5 的原始 source locks、before 快照、source-bindings 与 Gate；这些历史记录未重签。
- 新 baseline 绑定精确文件路径、旧存在文件的 before、其余现有源码哈希及调研/历史证据哈希。新授权来自 g6-research 的 authorization.json。
- 新 G6 记录以自身 seal 绑定当前文件；helper 和 G6 校验模块另验证当前源字节。旧 Library 读数只对已通过 G6 校验的精确前态回溯；旧阶段比较仅移除匹配该有效后继的 G6 节点。
- 新独立组件在 in-progress、before=null/after=null 时可保留 reserved/unbound，方便先写测试与实现；公共出口引用或完成阶段时必须绑定真实源码。该状态不计入已完成/已验证数量。
- packages/ui/package.json 仅允许原记录加三项已授权精确依赖；其余字段、版本和旧依赖保持。锁文件当前字节须绑定，锁文件安装验证由主代理执行。
- 原 G5 只读验证新增有限前态视图，继续检查 G5 原出口、样式、来源、颜色和旧验收，不将 G6 扩展误计为 G5 改动。
- related fixture 复制新后继的精确闭包，原来拒绝路径扩张、重签旧证据、修改旧源码与 Gate 的负例保持。

扫描器/Registry/Token消费者的 G6 集成由主代理在 baseline 的精确路径内完成。旧目录没有通用白名单，未绑定的新路径不会因为目录前缀自动获得许可。

## G6 12 项运行来源与制作差额

以下为当前源码的差额说明，补充上面的 Task 1 历史记录。它记录保留的 API、样式来源、Rain 桥接与必要修正，不代替本轮终验，不声明人工视觉、对比度、发布或生产接受。12 条 Manifest 的自动与独立验证仍为 `not-run`，等待主代理按最终封印时的验证事实登记。

共同制作来源为 shadcn-ui/ui 固定 commit `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048`（MIT）。组件 TSX 位于 `evidence/runtime/g6-preflight-2026-10-14/upstream/apps/v4/registry/bases/base/ui/<name>.tsx.txt`；Nova 为同目录树的 `styles/style-nova.css.txt`。实际搬运的 shared CSS 位于 `evidence/runtime/g6-research-2026-10-14/upstream/packages/shadcn/src/tailwind.css.txt`，涉及 shimmer、scroll-fade-x、scroll-fade-b 与 scrollbar 的规则含义。Nova 的字号、圆角、颜色名依赖源主题；下列 Rain 数值是明确映射，不倒推为上游固定像素值。

运行复用 Base UI `1.8.0`、CVA `0.7.1` 与既有 `rainCn`/tailwind-merge `3.6.0`，只增加获授权的 `@shadcn/react@0.3.1`、`embla-carousel-react@8.5.2`、`input-otp@1.4.2`。UI 保持 managed `@rain-next/ui` 入口，Data Table 保持复制源码的 forkable 应用层配方。颜色、Focus、字阶和间距使用既有 Foundation 注册；来源手势公式、滚动阈值、光标周期与 shimmer 周期局部保留，没有增加全局 Token。具名 `localRecipe` 只出现在实际提供该属性的 Bubble、Marker、Message、Scroller、Questionnaire；其他项通过其真实 className/style 等组合接缝改样式。

### 1. Data Table

- 运行来源仍是已有 `apps/prototype/src/data-table-recipe.{tsx,css}`（Rain RN-08）及应用层 TanStack `8.21.3`。固定 shadcn Data Table 文档和 dashboard 实例用于研究组合，不把 dashboard 的 DnD、Zod、图表或详情编辑移入运行组件；本轮未改这个旧配方源码。
- 保留 `DataTableRecipe({ loadRecords? })` 和导出 Material 类型；模型、列、排序、筛选、选择、分页和列显隐在复制的文件内。没有新增通用 data/columns API。稳定 ID、只选当前页可操作资料、请求 AbortSignal、失败保留资料及 Table/cards 共用模型保持。
- 使用已有 Table/Card/Checkbox/Tag/Select/Popover/Pagination/Empty、FormItem/SearchInput/Button、Layouts Stack/Inline/Grid 和实际十个图标。Registry 明确记录 layouts 包及其样式；公共 Table 不依赖 TanStack。保留旧本地实验 DOM 标识，与本轮候选登记的身份区别明确。
- Nova Table 的布局、层级只作对照；已有 Rain Table 的 default/compact 行高、字阶、横滚与独立分页合同继续适用。新增 Playground 入口、Manifest 和 Registry 说明；不声称远程全集选择、服务端分页、树、透视或虚拟化已实现。

### 2. Aspect Ratio

- 保留上游单个原生 div、必填 ratio、原生属性/ref、children/className/style；没有 render、variant、size、媒体加载或错误状态 API。
- 上游 `--ratio`/Tailwind 表达改为原生 `style.aspectRatio`，style 的其他字段合并保留，ratio 最后绑定；增加有限正数检查。没有独立 Nova paint、CSS、动画、Card 表面或视觉 Token。
- 示例媒体的比例、cover/contain、alt、宽度和加载占位由宿主拥有。不同 flex 宿主和真实媒体尺寸仍需浏览器验收。

### 3. Attachment

- 固定 TSX 的九 Parts、五状态 idle/uploading/processing/error/done、三尺寸 default/sm/xs、两方向与 Media icon/image 保留；Root 默认 done。Trigger 保留 Base UI useRender 元素/函数、ref 和合并事件，其他展示 Parts 为原生 div/span。
- Nova 的媒体 40/32/28、密度关系、名称单行省略、全卡 Trigger 与独立 Actions 分层保留。颜色映射既有中性/红色角色，Root 圆角 12/8、Media 8/6；非法 house `ghost`/`icon-xs` 不透传。Action 默认合法 text/regular，显式 Button 方案沿原合同；图标操作由宿主组合既有 IconButton。
- shared shimmer 用于 uploading/processing，scroll-fade-x 与横滚/snap 为局部转译。无 scroll timeline 时保留末端淡化留白，focus-within 去 mask，reduce/forced-colors 恢复普通文字，实际 scrollbar 显式定义；physical actions/corners 改 logical。
- 补 `min(160px,100%)` 宽度约束及示例 min-width，避免窄屏整页溢出。宿主为纯展示 Group 提供键盘入口和名称；预览使用真实 Dialog.Trigger，Upload/Retry/Remove 含文件名，不嵌套按钮。上传请求、Blob 生命周期、权限和移除后焦点都由示例/业务拥有。

### 4. Drawer

- 复用固定 TSX 的 Root/Trigger/Portal/Overlay/SwipeHandle/Content/Header/Footer/Title/Description/Close，Base UI 真实四方向、snap points、嵌套、释放强度、焦点和生命周期。`showSwipeHandle=false` 为已有来源包装 API；未增加 dirty/保存 API。
- 保留可达 Base UI movement/snap/stack CSS：纵向视口限制、侧向 75%/24rem、nested peek 16/bleed 48/scale-step .05、96×4 handle及450/400/200/300ms的关系。Nova 中旧 Vaul 选择器不适用于该引擎，未搬运；不是换成 Sheet 别名或另建手势引擎。
- 通过已有 PopupProvider/DensityProvider、useDirection 把 Trigger 的主题/密度和行为方向带过 Portal。Rain 中性表面、Focus overlay、Radius12、Header/Footer16及 safe-area 桥接；z30/31接既有浮层体系，保留来源模态模式区别。
- 明确 Popup `pointer-events:auto`，修复非模态 Viewport 的 pointer-events 继承风险。reduce关闭非必要过渡，保留即时手势。真实拖动、嵌套/多 snap、键盘遮挡、短屏/缩放及移动设备仍另验。

### 5. Input OTP

- 固定四 Parts 保留，唯一行为引擎为 input-otp `1.4.2` 的一个真实 input；完整 value/defaultValue/onChange/onComplete、pattern、pasteTransformer、自动填充、选区、render/children互斥类型、密码管理器和 no-JS 降级未重写。
- Nova 槽位/分组、active/caret关系转译为既有 Field 中性、品牌、橙/红与 Focus Token；默认32、compact24、圆角6，局部1×16 caret/1秒周期保留。reduce稳定显示caret，forced-colors保留边界与Focus。
- 补源引擎已有 placeholderChar 的展示、正 maxLength 和有效 slot index 检查，以及 FormItem 的真实 input ID/标签/说明/required/disabled/error关联。className作用真实 input，containerClassName作用可视容器；无 localRecipe 或公共尺寸枚举。
- onComplete只表示长度满足，不代表验证成功；验证/重发/有效期由宿主。物理 IME、短信填充、密码管理器、读屏和真移动键盘不能由 jsdom测试推定通过。

### 6. Carousel

- 保留固定五 Parts、useCarousel、opts/plugins/setApi/orientation与唯一 Embla `8.5.2` API；没有第二 selectedIndex、transform 或 autoplay定时器。Content ref/className/style沿来源作用内部 flex轨道。
- 来源 horizontal/vertical、16间隔、48外置导航空间保留；物理位置转 logical。实际方向按 opts.direction、明确 dir、Base UI context 依次确定，并同步 Embla；图标按实际轴/方向使用已有四个 Arrow。
- 默认导航以真实 IconButton32/16、具名 Radius/full recipe替换不可直接使用的 ghost/icon-sm；显式合法 variant/size/children走 Rain Button。默认 absolute放入 rainCn合并，修复 house relative工具覆盖来源 CSS定位，调用方className/style仍可覆盖。
- 精确修正上游对后代输入捕获箭头、纵向仍使用左右键、select/reInit清理不对称、后置props覆盖onClick/disabled问题；调用方事件先执行且preventDefault有效，aria-disabled/loading与引擎边缘状态不能重新启用。reduce用 Embla duration0，不误把物理duration当毫秒。
- 真拖动惯性、watchFocus/Resize/Slides、loop不足项、Drawer轴仲裁和真实触摸未由单元引擎测试证明；宿主需保留外置空间或用窄屏静态导航布局。

### 7. Bubble

- 保留固定四 Parts与七表面 default/secondary/muted/tinted/outline/ghost/destructive、align start/end、Reactions top/bottom与start/end；Content完整useRender/ref/事件接缝保留。Group和其余布局Parts使用原生属性。
- Nova w-fit/80%（ghost全宽）、外叠75% reaction几何保留；正文映射 Rain Reading14/24、Radius12和横12/竖8，compact竖6。七表面映射既有品牌/中性/红色，不缩成两套蓝白表面；reaction位置改logical。
- 具名 root/group/content/reactions局改与相邻/嵌套默认实例隔离。reduce/forced-colors及真实button/link Focus保留。吸收成熟会话的长回复/动作/失败分工，以已有Collapsible/Message/Marker组合，不增加 Ant typing SDK、请求或状态引擎。

### 8. Marker

- 保留固定 Root/Icon/Content与default/border/separator三种variants及markerVariants；只有Root为useRender，Icon/Content为原生span。默认装饰Icon隐藏，不强加空separator角色或系统事件注册器。
- Nova线段/弱文本/图标关系映射 UI14/22、compact13/18、glyph16、既有中性边界和品牌链接；text-left与线段间隔改logical。
- shared shimmer按currentColor、2s和spread几何局部移植为具名content recipe；reduce/forced-colors恢复普通文本。进行中角色/Spinner/完成状态由宿主内容表达，动画完成不等于业务完成；nested theme/方向岛及光带像素对比度仍待验。

### 9. Message

- 保留固定六布局Parts、align start/end、row-reverse、32px头像占位/有Footer时上移32、Content10与metadata12的关系；没有sender、messages、onSend、角色推断或新的Avatar引擎。
- 根UI14/22、metadata12/20/600、既有中性颜色映射；compact根gap8→6、内容10→8；ghost正文解除metadata padding。Avatar位内组合已有Rain Avatar真实API，不添加children/颜色头像替代品。
- 各Part实际localRecipe保持实例隔离；姓名、时间、复制/重试与等待/流式/失败是宿主内容和既有Button/Bubble/Attachment/Marker组合。来源固定上移32未新增observer；多行Footer、长文本与窄屏仍需实际布局验证。

### 10. Direction

- 固定来源两入口直接重导出 Base UI `1.8.0` DirectionProvider/useDirection，另导出其真实Props类型，文件为 `.ts`；direction可选ltr/rtl，默认ltr，Provider没有DOM/ref/className/render/localRecipe/视觉尺寸。
- Nova/shared CSS无独立规则可移植，也不消费视觉Token。宿主配对Provider与DOM dir，局部LTR岛同样配对；新Drawer Portal明确带出dir，Carousel同步引擎和logical位置。
- 未修改旧Select/Tooltip/Table等方向合同，也不把局部方向复用写成全库RTL接受；不是反转业务顺序或镜像所有图标。

### 11. Message Scroller

- 保留固定六 Parts与三 hooks，唯一 `@shadcn/react@0.3.1/message-scroller` controller拥有锚点、自动跟随/自由阅读、前插保位、Resize/Mutation/rAF与按需visibility。没有另写scrollIntoView、平行observer或虚拟化。Provider只接受原引擎属性；Button支持render，其他DOM Parts保留原生div/ref。
- 真实Provider默认autoScroll=false、defaultScrollPosition=end、scrollEdgeThreshold8、scrollPreviousItemPeek64、scrollMargin0，Viewport preserveScrollOnPrepend=true；Item messageId在类型中可选，未给时不注册ID，跳转/visibility/历史保位需显式给稳定ID。命令均返回boolean，Start/End在0.3.1只消费behavior；未挂载任何Item时Message命令可排队，已挂载后缺失ID返回false。
- Nova gap24、薄scrollbar/gutter、Item content-visibility/intrinsic auto10rem与shared scroll-fade-b保留；fade min(12%,40)/尾96、按钮200/400ms属于局部来源。导航用既有Button样式和颜色/Focus，仍保留inactive inert/tabIndex−1/位置状态。
- 中文region/log/按钮名称、真实aria-disabled守卫和reduce smooth→auto桥接加入；caller.preventDefault取消且不blur，默认激活仅一次blur。0.3.1 Root原生外部ref覆盖内部镜像ref的行为如实登记，状态通过公开hook/Viewport ref读取，未私改引擎。
- 内容增长、前插几何、三初始位置、图片高度变化、scrollmask末行、真实触摸、原生搜索复制与长列表性能仍按独立浏览器事实验收。

### 12. Questionnaire

- 固定十五 styled Parts和唯一 `@shadcn/react@0.3.1/questionnaire`引擎保留：原生form/fieldset/legend、items/item/defaultItem/onItemChange/shortcuts、required/disabled/invalid、答案/校验/focus/FormData/skip/back生命周期。只有源UseRender Parts提供render；Root/Item/Actions/ChoiceDescription没有render属性。
- 保留ChoiceInput/Label/Shortcut单套原生答案结构；视觉直接复用已有内部RadioIndicator/CheckboxIndicator，Registry明确真实源码及publicEntry=false，未嵌套RadioCard/CheckboxCard或创建双input/label。导航只用house Button外观函数/合法variant/size，不发明loading公共Props。
- Nova16/8/10/12间距、Radius10、所有断点Choice44、窄屏Input/动作44与≥640px Input32、三列动作固定位置保留。shortcut的源10px mono改为Rain UI12/20；文字/表面/selected/error/Focus映射既有角色，compact Item16→12但不压小可点击区。
- Progress保留children、ARIA、render(state)/ref并加默认中文可见文本与aria-valuetext；四导航aria-disabled阻止激活、caller.preventDefault仍有效。hidden规则保证原引擎非活动内容不被display工具覆盖，没有默认进出场动画或自动前进新API。
- 0.3.1末题Skip会requestSubmit，示例改为一致处理完成；不修改引擎，也不让用户跳过后再点第二次提交。评分、考试编辑、持久化、网络重试、Dialog取消与主动skip差别由宿主拥有。受控/reset/SSR/条件题、物理IME与读屏另验。

## 颜色与未覆盖范围

本轮颜色消费者只登记九个组件CSS、三个新文档页CSS及十一个运行TS/TSX的精确声明/工具类出现次数。Category角色验证和浅/深声明表面对比度均独立保留结果；不足阈值不会写成passed。Focus/native-system、渐变、mask、opacity及媒体实际合成另列runtime-unproved，既有Foundation与旧G5颜色证据未改。

会话页未使用的 `.g6-conversation-avatar` 品牌浅底/品牌文字规则已删除，只关闭该已移除声明的发现，实际头像复用旧Avatar。新空态、偏好区边界、反馈标题/强调线仍登记真实绘制。courseImage里的三个SVG gray属于本地媒体示例内容，不新增界面palette或全局颜色Token。

针对性真实引擎测试只能证明其断言范围；几何/observer的平台替身不证明浏览器像素、手势或滚动正确。Safari、VoiceOver/其他读屏、物理触摸/中文IME、完整forced-colors、跨浏览器/生产性能、完整人工作品目录和发布接受继续开放，以主代理最终verification.md与source-bindings为准。


## 2026-10-14 当前技术收口

前述not-run为当时状态。当前12条Manifest的automated=scoped-passed、independentReview=passed-scoped；本地实现completed，最终范围见verification.md。原141基线保留；唯一旧B2测试适配另以test-fixture-supplement.json绑定，使当前有限闭包为142。并行RN14与文档只读观察保持独立，未成为编辑授权。全部旧证明与人工/对比度/发布Gate继续原值。
