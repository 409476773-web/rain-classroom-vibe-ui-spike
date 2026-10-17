# G3 导航重建 v0.3 · local-experiment

授权：2026-09-23 用户要求直接执行 v0.3；设计 pending-review。真实树 card-v2 / codex/card-v2，非假定 cand-v2 分支。canonical 工作包在主工作区 docs/rain_navigation_rebuild_v0.3，原 v0.2 保留。

方法：V02 共同结构和有限差异；V04 固定标题/链接/元信息文字层级；V05 同时改造导航内容部位与行为；D02 顶部/导航/主内容各有明确范围且不套多层卡片；D05 四视口、低高度和长名称；I01 链接、展开、范围切换、应用命令分开。

已有依据：AGENTS、SPIKE_BRIEF、current-phase、prototype-design、icon-selection、information-design、BM-A / VE-001 资源列表关系；本次未重新读取 Figma，不声称视觉映射通过。研究图只作方向，没有复制原 HTML/CSS 或示意 Logo。

保留 Sidebar 的受控折叠根与头/内容/尾布局，单独局部 NavRow 因旧 SidebarItem 仅一个截断 label，无法提供独立尾部徽标/展开按钮。NavRow 使用 native link/button；子项浮层复用已装 Popover Base UI 1.8.0。不是新建一套 Headless。侧栏256/64沿用已存在局部几何；短文字轨80只是空间组合，非新 Token；主区最小宽度由实际表格测量记录。DensityProvider原 default/compact，上下文密度不单独改每行。

初始完整画面：30场模拟考试，过滤、详情侧板、8模块入口、独立课程父链接与子入口；S01/S02共享数据和DOM结构，S04保留子入口。中部唯一导航scroll owner，主区独立滚动。旧G3保留独立入口且源码未改。

测试：model-red.log记录模型未实现失败；模型实现后2测试通过。独立Playwright先缺候选根节点红；后15检查通过见专属运行结果。设计仍待用户审核，不改共享Token/组件/API/公共默认，不提交发布。

最终推进：T04 顶部共同链接和面板之后，接入 T03 完整课程范围与学习单元路径；T05 两种外观使用同一 Menubar 命令模型；T06 由另一个代理按 S05/S08 再组合设备预约。E12 发现 Sidebar 固定宽度侵入局部网格，修正本地 width 后四视口 overlap=0，没有改公共 Sidebar。目录、状态板、页面和 A/B 实例可以分别打开。

位置恢复留在 CourseWorkspace；面层和密度通过既有 provider/Popup 桥传入 Portal。课程主区 minMainWidth=560 是本地 Split 输入和实际页面约束，不能外推为所有业务的最小宽度。短文字轨80、实验室范围栏224和详情288是局部几何，不新增共享Token。当前真实 Token 绑定与计算结果以工作包 execution/token-map.json 为准，不能从本页文字推断批准。

交付入口、消费合同、差异和限制见 README.md；最终检查见 evidence/runtime/navigation-rebuild-v03/verification.md。旧G3没有同数据的完整课程和设备页，旧截图仅作结构基线。独立代理对未参与的页面进行只读审阅；其自己实现的 E12 标为作者复核。最终视觉和全局无障碍批准均未获得。

2026-09-23 组件复用修正：完整页中的搜索、筛选、操作、表格、状态、分页、草稿和反馈已分别接入现有 Input、Select、Button、Table、StatusTag/Tag、Pagination、Textarea/FormItem、Alert/Empty/SystemStatusTag。保留导航行、课程单元行、设备选取行的业务组合结构；它们承担独立链接/展开、单元范围与设备选择语义，不能机械换成通用卡片。局部 CSS 只负责布局和必要的组合差异，已去掉导致双焦点的原生控件样式。70项浏览器、12项候选单测及prototype构建/类型检查通过，证据在 `evidence/runtime/navigation-rebuild-v03/component-reuse-*`；全仓类型检查有未改动公共测试文件的TS2322。设计仍 `pending-review`。

2026-09-23 八条视觉批注：Prototype Mode，范围仅 `parts.tsx`、`rebuild.css` 与候选浏览器检查。V03 用已有图库中八个彼此不同的线性图标承载工作台/课程/资源/考试/分析/团队/消息/设置，原有面性和重复图标移除；品牌位换成图库现有 `RainClassroomIcon`，不以研究图或自绘SVG定义新品牌。V04 将品牌名和候选页最高级标题设为16px，侧栏入口文字15px、图标及展开/收起图标16px；分组提示用本地语义中性色混合降权，浅色实测4.52:1、深色5.56:1。展开按钮按状态换用线性 ArrowUp/ArrowDown，非当前图标和箭头用较浅的 icon-neutral-3；链接与展开仍分开。D05 没有为批注截图的1130/1281/1357宽度设新断点，沿用既有900/600响应逻辑，整页与S04图标轨均截图复核。各尺寸、面层、Token和图标选择只属于该G3候选，最终视觉 `pending-review`。本批证据见 `evidence/runtime/navigation-rebuild-v03/visual-feedback-*`。

2026-09-23 后续13条批注：仅实施1—12；13明确要求班级范围栏先不动，记为 `pending-discussion`。课程侧栏展开按钮命中宽度28→36，ArrowUp/Down图形缩到12；全局/课程数字徽标使用full圆角，选中数字跟随品牌文字色。课程上下文五入口改用五个互异的现有图库轮廓图标；N03工具入口的课程提纲去掉实心book图标。N02顶部字号15，N01/N02选中线采用既有Tabs 38规格的3px高度、32px宽度、full圆角与 `fill-brand-solid-2`，N02保留原柔和选中底色。深色侧栏组名改neutral-4，实测6.39:1；浅色组名继续4.52:1以维持正文4.5:1。M01/M02快捷键仅在候选命令行局部降为11px、16px最小键高、无边框与透明底，名称与键位加12px距离；用现有neutral-4/5混合色使浅色菜单实测4.52:1，仍弱于主选项文字；子菜单改线性ArrowRight。边缘指示条两端全圆角。没有新断点、公共Token、组件默认值或品牌资产改动；最终视觉 `pending-review`，班级范围栏等后续讨论。
