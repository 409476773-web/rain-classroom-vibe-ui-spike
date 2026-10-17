# 导航 v0.4.2 · R4–R6 与独立实例消费

本批次为复制源码的 local-experiment，G2 人工验收 pending，尚未发布。三项配方复用公共 UI/Layout，不依赖原稿全局、iframe 或评审台 DOM。

| 场景 | 调用 | 宿主拥有的业务状态 |
|---|---|---|
| 课堂互动/教师批改 | `R4Recipe({ scene, workspace? })` | 活动/小组；卷/题/学生；按身份隔离的评分与评语草稿 |
| 课堂回放 | `R5Recipe({ workspace? })` | 当前事件、模拟播放位置、播放/暂停、跟随定位、脑图/讲稿 |
| 协作空间 | `R6Recipe({ workspace? })` | 当前页面与命名视图、编辑/预览、反馈草稿、局部新增字段 |

[源码](../../apps/playground/src/recipes/navigation-v042/r4-r6.tsx)、[局部样式](../../apps/playground/src/recipes/navigation-v042/r4-r6.css)、[Registry](../../registry/navigation-v042-recipes.json)。复制时携带样式声明、WorkspaceRecipeOverrides 类型来源与 Registry 列明的共享依赖；不能从 `@rain-next/ui` 导入这些应用配方。

`workspace` 与 R1/R3 一样接受现有 WorkspaceSpec、toolbar、inverse、hoverPreview 和 storage；S1–S6 通过这条组合缝复用业务正文。默认 hover 临时展开关闭。偏好存储注入只记录 mode/expandedWidth，R4 评语、R5 时间、R6 正文从不进入布局偏好。

R4 interaction 的活动和小组分别使用稳定 ID，标题、得分与正文同步。grading 草稿键为 `paper/question/student`；下一位/下一题只切对象，本地保存是明确独立按钮。修改显隐、宽度、字体或专注不会保存成绩。智能批改、PDF 和导出是可见 Mock，未连接真实服务。

R5 明确点击事件或知识索引才 seek，不因悬停跳播或自动播放。播放按钮推进本地模拟秒数，结束/离开时清理计时器；隐藏知识面板和退出专注保留当前位置。幻灯片与脑图是脱敏视觉示例。

R6 原稿默认是“学习反馈 / 反馈表单”，课程任务表是另一个页面。各页面保留自己的视图选择；输入与新增字段由宿主保留，页面/布局变化不会发送反馈。新增类型仅验证实例扩展，实际上传、题型验证及后台保存不在此批次。

[独立入口](../../apps/playground/navigation-v042-w3-consumer.html) 同时包含课程诊断、产业图谱、云盘、错题、互动、批改、回放、协作、文档工具和实例隔离。实例隔离只改变 B 的名称、条件密度、连接方式；A 的 DOM、计算样式、选择与草稿保持。它是独立源码消费证明，尚未表示 W6 E1–E6 全部通过。

实施与消费分开：仓库内 [实施 Skill](skills/rain-navigation-implementation/SKILL.md) 和 [组合 Skill](skills/rain-navigation-composition/SKILL.md) 均为候选源文件，不改变全局技能配置。W6 六项 AI 任务、W7 全量回归/读屏、G3 与最终发布仍分别登记。
## 最终局部样式合同补充

`workspace.toolbar` 接受 ReactNode，或 `(identity: { title: string; subtitle: string }) => ReactNode`。需要当前页、视图、学生或题目实时身份时，使用后者；业务身份仍由 Recipe 原有状态生成。S3/S4 使用该回调，恢复入口与布局控制依然由 Workspace 拥有，不在 S 层复制业务状态。

R6 的状态标签消费既有 `Tag` 与 `TagPart`，局部 Recipe `navigation-v042-r6-status-tag` 只映射 root/content/label 为本配方类，保留公共默认。表格、状态分组、画册均由原稿运行结果校准；画册三个预览变体使用稳定的 `data-variant`。复制时保留本配方 CSS 与既有 Tag 依赖，不将该样式推广到全局 Token。R4 批改顺序仍是具名条件单选，自然144×34px控件及文字层24×2px短线沿candidate05冻结合同保留，与真正内容 Tabs 分开。


## R4互动反馈消费合同 · 候选06

R4互动消费既有Foundation的category/semantic颜色、字体、字级、行高、space、radius、focus、shadow与line Token；私有导航别名在实例根映射，不向公共Token写入新值。56/44px等用户指定的功能高度是局部几何，不假冒通用高度Token。颜色与密度覆盖限定 `data-scene="interaction"`，尺寸由现有Workspace预算/容器适配决定，批注1176px不作为断点。

人物复用官方Avatar和稳定 `assignAvatarAssets` 分配；四成员小组使用AvatarGroup(size24,max4)，详情小组身份用AvatarGrid。不隐藏真实图片、放大组件内部单元或叠字母。四成员组不产生More按钮，适用于当前对象按钮的只读成员信息；若业务增加可展开成员，应将交互入口移到对象按钮外。工具按钮复用IconButton32/18与原具名处理器。

共享helper会影响R4批改与R5/R6的头像和区域控制按钮，仅R4互动有本轮密度/Token覆盖。独立复制需携带新声明的Avatar/Group/Grid/IconButton Registry依赖和对应官方图像。本地账户/通知/帮助仍为演示入口，不连接真实服务。[反馈证据](../../evidence/runtime/navigation-v042/w5/review-06-r4-feedback/README.md)。G2人工待验收；完整对比度、读屏、G3及发布状态独立。


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


## 2026-10-04 review11 · 批注与统一平台

46条批注具体caller与最终几何以`evidence/runtime/navigation-v042/w5/review-11-annotations-navigation/annotation-index.json`和当前Registry/Manifest为准。全部R/S保留64/208预算，平台外观恢复原稿既有本地表面#e8edf8/#252d43，选中／hover消费OnColor角色；品牌墨色继续消费既有Rain Tokens。所有外框可切轻／深色；内容Light。splitter只改变常态paint，hit area/focus/键盘调宽保持。

消费者按实际有效mode派发SHOW_REGION并携带实时viewportWidth，temporary用DISMISS_TEMP，修复重复展开与顶部恢复入口。整账户native按钮、展开视觉与Tab顺序、40/44px自然账户尺寸已独立复核；R1/R3复用现有Popover说明本地账户入口。复制仍14/9/4/4，43唯一最终源锁包含Gallery宿主TSX/CSS补充；共享默认／Foundation／历史G1与早期Review保持。105组件检查、137唯一浏览器合同最终通过（2 capture-only跳过），144稳定R/S运行画面／3606断言通过；完整tests类型保留7原诊断／0新。G2/G3、完整对比度与AT等独立。证据`evidence/runtime/navigation-v042/w5/review-11-annotations-navigation/review-evidence-index.json`。

## 2026-10-04 · Review12 当前视觉反馈

Normal splitter: 1px BorderNeutral4 × opacity .4 (Light effective4%),handle hidden;hover/drag/focus remain clear. R4/S4 discussion heading600/count400;all12 R/S platform unit glyphs20→18 with20px centered slots and40px rows;Logo23/utilities16,text/gap unchanged. PriorReview11/G1 preserved;shared defaults/Foundation unchanged.

2026-10-04 Review12: 28 Normal cases/48 visible splitters,48 platform theme-mode cases/192 unit glyphs and6 pointer-keyboard resize contracts passed;1702 assertions,0 errors/failures,source stable;R4/S4 heading600 and count400;Playground typechecked build passed;4 Registry/7 Recipe manifests/67 current hash entries/43 unique sources validated;3 local production files changed. Earlier 32 R2 inline20px failures retained and fixed via existing Icon size18 API. 仅3个本地源改动，无共享默认或Token新增。Review11和所有更早证据/认可字段保留；本轮实际定向证据：evidence/runtime/navigation-v042/w5/review-12-pale-splitters/review-evidence-index.json。

## 2026-10-04 · G2视觉接受与R3局部补充

用户明确确认“确定。完成截至目前建设内容的视觉验收。”截至候选12的当前运行视觉/组合已accepted，43源原样锁定，历史G1保持。R3随后三条批注形成候选13：开始练习消费标准无图标Primary Button，已加星rating-star-100，未加星rating-star；S2共享正文同步，云盘上传保留三级按钮。9实际浏览器案例/155断言/0错误及Playground类型检查构建通过。候选13新增视觉差额未自动接受。当前记录与锁：evidence/runtime/navigation-v042/w5/review-13-r3-actions/review-evidence-index.json，接受记录：evidence/runtime/navigation-v042/w5/review-13-r3-actions/visual-acceptance-record.json。公共默认、Foundation、复制闭包和历史证据保持。

## 2026-10-04 · 当前候选13视觉接受

用户在R3/S2补充修正后再次确认“确定。完成截至目前建设内容的视觉验收。”截至候选13的当前运行视觉与组合已accepted，含无图标Primary练习按钮、已加星rating-star-100/未加星rating-star。本次仅登记并同步评审状态，业务源码/样式不变；旧G1、候选12接受与所有自动证据原样保存。43源及元数据接受一致性证据：evidence/runtime/navigation-v042/g2-acceptance-13/record-checks.json。后续第一个未完成批次为W6的六项独立AI消费验证，然后W7/W8；本次未启动新批次。
