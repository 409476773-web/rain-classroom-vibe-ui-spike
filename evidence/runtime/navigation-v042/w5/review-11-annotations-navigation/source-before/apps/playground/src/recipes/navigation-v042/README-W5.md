# W5 · R4–R6 工作区配方候选

本目录新增 `r4-r6.tsx`、局部 CSS 与九个业务／边界回归，供当前导航 v0.4.2 消费页面复用。依据人工已批准的 `approved-v0.4.2.html` 做组件化，不重新设计；G2/G3 人工验收仍待评审。未安装依赖，未调整全局 Token、Classic、冻结原稿、Figma 或 Git。

导出：`R4Recipe({scene:'interaction'|'grading',workspace?})`、`R5Recipe({workspace?})`、`R6Recipe({workspace?})`。可选 `workspace` 沿用 R1/R3 的 `WorkspaceRecipeOverrides`：spec、toolbar、inverse、hoverPreview、storage。覆盖 spec 会与当前业务子场景的实际区域取交集，并加入消费实例／业务上下文 key；不存在的表单工具不会占宽或出现在恢复条。

## 复用与身份

- 功能入口消费 `NavigationList` 原生链接，对象／事件／题目／学生消费 `ObjectNavigator` 稳定 ID；页签消费 `NavigationTabs`，条件与模式消费 `SegmentedControl`；所有原生 radio name 使用稳定实例 namespace。批改顺序采用 white-line 单选模式，PDF／批改方式仍为真正内容 Tabs。材料与页面视图真正使用 `ConnectedSurface`。图标来自现有官方静态路径，头像消费现有 Avatar、AvatarGroup 与 AvatarGrid 及其官方资产；不覆盖图片或显示字母替身。区域与平台工具按钮消费 IconButton 的32/18配方。
- 各区域消费 `WorkspaceLayout / RecoverableRegion / RegionRestoreTrigger / PaneSplitter`。所有可隐藏区域都有外部具名恢复入口；临时显示、pin/unpin、专注、空间适配与可操作分隔线均由 W4 核心负责。布局偏好只存 mode 与 width，纯偏好 adapter 不包含正文。
- R4 的活动、小组与课堂内容页签独立于布局。批改草稿由 R4 外层业务状态拥有，key 为试卷／题目／学生；学生／题目／试卷切换不串草稿。评分区隐藏与恢复保持原 textarea DOM。两个 R4 子场景切换保留该实例草稿。分数、AI 建议、PDF 内容、保存与下一位／下一题均为本地 Mock，未写入真实成绩；PDF 批注仅说明关联，未实现真实文件标注。
- R5 两侧事件 seek 同步当前事件、时间与幻灯片，显式事件点击不自动播放。播放为可启动／暂停的真实本地计时器，卸载清理；启用“跟随播放定位”才随播放更新对象。左侧筛选不改变当前播放对象，隐藏参考区不复位时间。没有真实视频资源。
- R6 默认为“学习反馈 / 反馈表单”，课程初值为“高等数学 A”，第二个理解程度已选。页面和命名视图分别使用稳定 ID，每个页面保留其当前视图；表单草稿、新增字段和示例记录在业务实例状态中，切换页／视图保留。当前页的内部目录、反馈表单的编辑工具位于不同嵌套层，字段工具仅在编辑表单中适用。新增题目按原稿为可编辑的视觉占位，并不实现真实问卷发布。

业务状态目前只保留在已挂载配方实例；“本地保存”不承诺跨页面刷新或跨设备恢复。默认内存 adapter 按 workspace／subscene／instance 隔离布局偏好，调用方可注入版本化 storage。切换页面／视图是业务切换，允许相应内容面板变化；visibility、temporary、focus、resize 操作不会以布局模式为 React key 重建区域正文。

## 原稿实测与证据

实际打开并操作了 `http://127.0.0.1:5199/reference/approved-v0.4.2.html`：原尺寸 100%、R4 探索者小组与教师批改学生、R5 16:24 随堂练习 seek、R6 表格与反馈表单。已查看原稿截图与实际 DOM；冻结 SHA 保持 `d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`。

权威持久证据由独立 reference 捕获：

- `evidence/runtime/navigation-v042/w5/reference/2026-10-01T11-21-22-887Z/`：19 个原尺寸／inverse／view 状态双遍截图、computed geometry、fragment 与简明规格。
- `…/2026-10-01T11-23-03-349Z/`：R6 课程任务表格补充证据。
- `…/2026-10-01T11-25-05-492Z/`：活动／小组、题目／学生、回放事件变化的双遍 source 断言。

已依现有原型治理 D02 / I01 / V04 核对布局、导航语义与反馈。认可原稿已有定稿，故本批没有另拟视觉方案。局部实现保留 1440×800 外框、global compact64、R4 interaction context164/queue240、grading queue240/review304、R5 events228/knowledge296、R6 context216/directory190/fields188/form680；正文布局根据真实容器剩余预算适配。各种 geometry 使用已安装 ConnectedSurface 允许的 key，原稿 PDF 轨道 inset0、gap2、tab42px 与10px页签圆角通过局部配方保留，frame 使用 merged 边界所有权。

2026-10-01 R6 局部校准：实际以冻结原稿原生 1440×800 打开并读取 computed，与 `w5/compare/2026-10-01T12-51-14-907Z/` 原尺寸并排逐项核对。工具区恢复原稿的 block 流和相邻 margin 折叠，三项内容 y=286/325/364、“新增题目”标题 y=435、四个按钮 y=463/507/551/595，均与原稿一致；按钮 160×38、6px 纵向 margin、透明 1px border、`#f5f6f8`，工具图标 15px，分隔线 16px margin，说明保留 10px 垂直 padding。只在 R6 作用域调整 context/目录的 12px 分组、14px 功能入口、3px 列表 gap、白色内部目录，以及 15px/22.5px 工作区标题与 12px/18px 副标题；云文档的 30px 局部图标底和 18px 官方图标沿原稿排列。纸面 x=716.5、y=224、宽 680 与本次修改前一致，未改表单或纸面样式。实际隐藏／恢复编辑工具后上述几何保持不变，新增文本题仍正常且无 page error。本次为作者校准与运行验证，最终双遍截图与人工视觉 Gate 由独立 reference／root 登记，不作为本次修订的独立审查。

## 验证状态

2026-10-01 最终局部校准：R4 批改顺序沿原稿为34px高、14px字、24px选项间距且不绘制下划线；题目栏上方控制行34px加8px下间距，学生队列每行80px（79px按钮加单一1px行边界）。临时平台区定位到工作区左缘，内部目录临时层不变。R6 表格采用四个等宽列；分组恢复13px正文、12px元信息与自然卡片高度；画册保留三个预览变体和95px预览区。状态 Tag 通过 `navigation-v042-r6-status-tag` 局部 Recipe 调整 root/content/label，仅在本配方使用；未改变公共 Tag 默认样式。上述调整以独立捕获的原稿 computed style 为依据，业务草稿与状态归属未变。

此前复跑记录为 `w5/final-09-focused-unit.log`（83项）、`w5/targeted-final-09-browser.log`（9项，已包含在当时57个独立用例中）与 `w5/final-09-build.log`；后续独立复核与最终证据见下方，人工G2仍待验收。

八个关键测试先写；缺失模块及初始接入错误、复制回放实例的原生 name 冲突、批改顺序缺少模式 Radio 都实际为红，修正后 8/8 通过，Playground typecheck 通过。测试覆盖身份同步、草稿隔离、相同 textarea DOM、播放暂停、双实例选择组隔离、批改模式与下一题身份、R6 默认／视图／页面草稿与字段恢复。实际 Chrome 方向键切换到按人批改后，下一题保持李梦身份；这项原生键盘默认行为不能由 jsdom 的 keydown 单独验证。

已实际打开候选 R4/R5/R6 并核对默认内容。R4 按工作区归一化实测：整体 inset12、活动轨道115、卡片390×87、queue 起点277、头138、行102、底排61、splitter5，均对照原稿。R5 主幻灯片保持垂直居中，知识索引使用原稿的填充卡片与时间线；R6 纸面680、默认课程与理解程度、字段标题／radio／textarea／按钮及纸面高度按原稿测量。focus 沿原稿隐藏业务模块头部并保留外部身份／恢复条。浏览器候选操作、1200/1440/1600 实测与截图对照由本批 root／独立 reference 汇总到新的 evidence；本 README 不将原稿捕获、单元测试或编译视为人工视觉通过。N01–N32 完整回归、VoiceOver、宽屏与窄屏视觉、人审、Registry／migration／发布均应依总体工作包分别登记，未在此自行声明完成。

2026-10-01 最终状态增量：R6正文最小620、所有R4–R6 source预算reserve44及global展开保守5px已按冻结合同校正。受限global展开与小数宽度输入边界的核心回归、1280px R6预算均已补测。最终验证及当前源码SHA以 `evidence/runtime/navigation-v042/w5/README.md`、新时间戳对照与 Registry current snapshot 为准；前述早期作者记录与失败轮保留。

最终独立复核增量：现有 `workspace.toolbar` 支持具名业务identity回调，S3/S4外部恢复条随页/视图/学生/题目同步；S5当前标签可临时展开、专注隐藏模块头部，关闭hover增强时清旧timer。Restore只隐藏自有文字、保留RainIcon，temporary具名关闭按钮自然宽；textarea block关闭inline基线空隙。S4grading两条分隔区实际原稿均10px，先前5px理解已被新computed/DOM证据纠正，学生列表/批改面板名称保真。最终87专项、100兼容unit与58独立browser检查分开记录，真实截图/人工Gate见W5证据索引。

S配方最终局部校准：外部 focus 用 Button 已有 leadingIcon 插槽，具名 toolbar Recipe 的 label/leading-icon/trailing-icon 继承宿主；普通/专注态颜色、88×32和S4白色40px面板头按冻结原稿实际 computed 保留。祖先分别为S5的nv44-workspace与其它场景的nv44-shared，S4头进一步限定data-scene；不覆盖共享Button默认或PDF内focus按钮。早期蓝色focus规则被基线v042最后规则覆盖，未据早期CSS改变设计。

2026-10-03 指示线收口更正：前述10-01“批改顺序不绘制下划线”结论只检查了原稿按钮::after，遗漏其文字.tab-label::after；后者实际24×2、#1561f8、bottom -1px、居中、2px圆角。R4/S4批改模式通过本页checked option::after保留该短线，公共SegmentedControl默认不变；其它配方不受影响。原10-01记录与截图保留，当前校验和五例对照由G2最新索引登记。

2026-10-03候选05：进一步按原尺寸渲染将批改顺序从强制280px改为自然144×34px，并仅对其items设置overflow:visible，避免bottom:-1px短线被共享滚动容器裁掉。批量智能批改按钮复用已导入AiSparklesIcon及leadingIcon插槽；此控制行的leading/trailing插槽恢复原稿18×18px。5例指示线几何差0；S4/1600px R4截图仍有1行量化差，证据保留。业务处理器与数据未变，公共分段滚动及Button默认不变；源码最小差异经独立复核，最终5项浏览器及Playground类型检查/构建通过，G2人工待验收。


## 2026-10-03 · 候选06 · R4互动23条批注

本轮用户批注明确更新R4互动的局部外观合同。新样式仅命中 `.nv5-r4[data-scene="interaction"]`，现有1200/1440/1600容器适配继续使用；1176×771是浏览器批注视口，不新增断点。恢复条56、模块头44、小组栏头36、条件控件32为局部几何；14/15/16字级、4px进度、间距、圆角、焦点、阴影与所有本轮颜色直接消费现有Foundation Token。NavigationTabs、NavigationList、ObjectNavigator与白底条件单选在实例根映射既有私有别名，不重设公共默认。

活动轨道115→92、卡片按钮85→66、条件区138→91、小组列表可见高度272→350px。选中平台项消费BrandSolid3，活动区BackgroundNeutral2，进度底NeutralSolid3/填色BrandSolid3或NeutralSolid1；未评分用TextNeutral3。局部inverse通过平台及自有恢复条的 `data-rain-theme="dark"`消费同一语义Token；明确覆盖历史inverse特异性，临时平台沿用自己的背景，其它临时区域消费BackgroundNeutral1。

共享PersonAvatar、RegionHead与PlatformFooter也作用于R4批改、R5/R6：移除隐藏图片/字母覆盖，改为官方人物照片及默认图；小组用四成员AvatarGroup(size24,max4)及AvatarGrid，账户为具名32pxAvatar按钮；通知/帮助与固定/隐藏复用32/18 IconButton。删除旧30×30页面覆盖，不改变这些公共资产。原处理器、业务ID与草稿归属保留。复制闭包补齐Avatar/Group/Grid/IconButton Registry依赖及其官方资产，不安装新依赖。

[本轮证据](../../../../../evidence/runtime/navigation-v042/w5/review-06-r4-feedback/README.md)记录原尺寸前后测量、失败诊断、最终QA与独立复核；前文87/100/58及candidate05全矩阵为其各自日期的历史证据。本轮不把9张R4反馈截图视为对所有R/S组合重新视觉验收。G1已认可范围保留，G2人工及W6–W8仍单列。


## 2026-10-03 review07反馈修订

实际最左平台消费platform-navigation.css，复制Recipe需保留该CSS依赖：W3–W5独立样本14文件、R2为9文件，Gallery可选fixture另列；不反向引入公共family库。Hover/current使用既有Category Token，导航图标按同页展开/收起一致；文件图标15px独立于平台图标。新增恢复默认宽度、网格多选、筛选数量、空搜索、头像与播放条修复见 evidence/runtime/navigation-v042/w5/review-07-cross-page/README.md。G2仍待人工评审，旧验证记录保留。


## 2026-10-03 review08 · R4/S4互动细节

ClassInteraction的课堂功能、小组列表RegionHead显式消费IconButton32/14，保留32px点击区域；共享helper默认32/18供批改、回放和文档使用。课堂数据消费font-weight-regular400与TextNeutral6；group queue的current和已选hover消费FillBrandAlpha3（Light20%），不使用整行opacity。S4直接复用该Recipe；无批注视口专属断点、公共默认或新Token。证据evidence/runtime/navigation-v042/w5/review-08-r4-details/review-evidence-index.json，23 focused/11 targeted browser/build通过；历史验证及G2人工待评审保持独立。


## 2026-10-03 review09 · 全部R/S页面自查

R1–R6/S1–S6按三宽度、主要子场景及短窗口逐一检查。compact平台图标居中保持原尺寸；NavigationList和R2 Sidebar复用既有Tooltip；R2过滤消费SegmentedControl；R3列表整行选择反馈；R4匹配计数与情境空态；R6搜索复用Empty；S1/S2/S6实际identity同步；S5本地入口反馈。R1/R3、R5/R6、S5主要颜色映射既有Token而保留几何。NavigationList共享物理源以及R2/R4–R6复制payload显式登记Tooltip/SegmentedControl/Empty依赖，复制时以当前Registry和Manifest锁为准。现有1176px批注不产生专属断点；G1/Review08历史与G2待人工边界保持。证据：evidence/runtime/navigation-v042/w5/review-09-all-scenes/review-evidence-index.json。

S1–S6恢复默认同时关闭悬停临时预览；保留局部草稿，不修改共享controller合同。该差额经原稿与候选实际操作确认，before/after各42断言见states/hover证据。


## 2026-10-03 review10 · 局部视觉角色

普通中性描边先消费现有Button tertiary，再用feature Local Recipe只调整已有密度；不要以中性root边框覆盖secondary而让内部label/icon保持主题色。保留有意强调的primary/secondary业务操作。辅助IconButton角色默认IconNeutral4，hover/focus2，明确active仍Brand1；公共默认保持。R1/R3固定/关闭24/14、空间切换32/14；R4/S4互动原32/14与其他32/18保持。字号/圆角/点击区域由原有完整组件合同管理。

表头regular400/TextNeutral5与行分隔BorderNeutral4；解释、辅助分组标题用Text5，纯提示用Text6。正文/文件15pxText1/评分/状态/选中导航不弱化，不用整行opacity。页面button重设对原生组件做零specificity排除，避免覆盖内部parts与文件15px。加星选中复用已定义semantic-warning，不引用不存在的warning category。Local Recipe candidateTokens只登记rain-local候选名；消费已存在Category Token时为[]。

42最终源锁、具体caller/别名与复制依赖以本轮Registry及Manifest为准；14/9/4/4闭包保持。无1176px专用断点、Foundation修改或公共默认变更。S1/S2专注按钮原生字体恢复带来8px宽度差额已记录，S5主要几何保持。浅色辅助值按用户视觉要求局部消费，部分实测对比度低于标准阈值，不授予完整对比度、读屏或G2/G3人工验收。证据evidence/runtime/navigation-v042/w5/review-10-visual-hierarchy/review-evidence-index.json。
