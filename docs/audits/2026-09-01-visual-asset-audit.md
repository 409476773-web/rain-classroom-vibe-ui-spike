# Rain Next Visual Evidence 现场复核与资产审计

- 审计日期：2026-09-01
- 范围：`evidence/visual-evidence.yaml` 中 14 个 Figma 节点
- 方法：逐节点读取设计上下文，再获取节点截图；不含明显身份字段的截图保存在 `evidence/screenshots/`
- 工作性质：只读来源复核与系统规划
- 未发生：Figma 写入、代码实现、运行时验证、Human Gate、发布、迁移、commit 或远程 Git

## 1. 结论先行

14 个节点均已成功现场复核。12 张不含明显身份字段的有效 PNG 已保留；VE-005 与 VE-010 的来源画面含疑似学生/教师身份字段，未脱敏截图不进入仓库。它们共同支持一条清晰的 Rain Next 视觉血缘：

- 产品工作区通常由深色平台导航、冷蓝灰页面底、白色任务表面、细蓝灰边框和低阴影构成；
- 信息密度不是单一尺寸：资源、表格、题库、树管理偏 Compact；表单、报告、阅读和复杂工作台以 Default 外壳容纳局部 Compact；
- PingFang SC 是稳定的中文 UI / Reading 基线；部分数据与关键数字已出现独立数字字体角色，可支持既定 Data Typography 规则；
- AI 不是一种全局装饰皮肤，而至少分为局部标记、上下文动作、洞察表面和全局助手入口四类语义；
- 跨节点最稳定的结构能力是筛选工具栏、Table、Tag/Badge、对象 Card、树状管理、主从 Inspector、长表单、Statistic 和多 Pane Layout。

这些证据足以形成申请 `day-1-runtime-start` 的准备材料，但不自行构成启动授权，也不足以证明交互、响应式、可访问性、字体授权、图标来源或公共 API 已经完成。页面应被理解为业务结构和视觉关系证据，不能整体像素复制为单体组件。

## 2. 现场复核登记

| ID | 现场确认名称 | Node | PNG | 主要密度 | 最强系统信号 | Benchmark |
| --- | --- | --- | --- | --- | --- | --- |
| VE-001 | 课程资源包（表格视图） | `2526:33858` | [1400×659](../../evidence/screenshots/VE-001.png) | Compact | Filter Bar、Table、状态、选中行、分页 | BM-A |
| VE-002 | 课程资源包（卡片视图） | `2526:34646` | [1350×710](../../evidence/screenshots/VE-002.png) | Compact | Resource Card Grid、视图切换、AI 标记 | 补充证据 |
| VE-003 | 教师-课堂回顾 | `2671:46854` | [1400×808](../../evidence/screenshots/VE-003.png) | Default + 局部 Compact | Task Bar、Timeline、Media Stage、Inspector | BM-C |
| VE-004 | 云盘 | `2526:39475` | [1400×800](../../evidence/screenshots/VE-004.png) | Compact | Folder Sidebar、File Table、状态、内滚动 | 补充证据 |
| VE-005 | 成果展示 | `2526:52857` | 不入库：含疑似学生身份字段 | Default | Reading Typography、Answer Card、附件、披露状态 | 补充证据 |
| VE-006 | 习题组卷 | `2526:51547` | [1400×914](../../evidence/screenshots/VE-006.png) | Compact 工作台 | Question Editor、Score Editor、Navigator | 补充证据 |
| VE-007 | 产业链图谱 | `2526:59312` | [1472×1549](../../evidence/screenshots/VE-007.png) | 高密度报告 | AI Insight、分类图谱、指标与建议 | BM-D |
| VE-008 | 岗位画像分析 | `2572:63140` | [1472×1206](../../evidence/screenshots/VE-008.png) | Default Collection | AI Insight、Job Card、筛选、Grid | 补充证据 |
| VE-009 | 题库（主从预览） | `2526:57267` | [1400×1248](../../evidence/screenshots/VE-009.png) | Compact | Bulk Table、Master–Detail、独立 Inspector | BM-A、BM-C |
| VE-010 | 培训总览（教师画像） | `2572:68083` | 不入库：含疑似教师身份字段 | Default Dashboard | Statistic、图表、档案侧栏、多滚动区 | BM-D |
| VE-011 | 错题集 | `2572:77172` | [1400×900](../../evidence/screenshots/VE-011.png) | Compact | Hierarchy Tree、Question Table、筛选、加星 | 补充证据 |
| VE-012 | 课程知识树（教学内容管理） | `2671:48125` | [1600×989](../../evidence/screenshots/VE-012.png) | Compact Tree | 双层级区、ManageTree、发布/锁定/完成 | BM-C |
| VE-013 | 资源包-班级 | `2671:50628` | [1600×1154](../../evidence/screenshots/VE-013.png) | Compact Tree | Class Switcher、同步 Banner、内容状态 | 补充证据 |
| VE-014 | 新建教材弹窗 | `2672:55669` | [916×1224](../../evidence/screenshots/VE-014.png) | Default Form | 长 Dialog、Form Section、Upload、上下文 AI | BM-B |

“补充证据”表示节点对架构推导有价值，但本次不静默改变既有 Benchmark 成员关系。

## 3. 节点级资产判断

### VE-001 — 课程资源包（表格视图）

- **结构：** 深色平台导航、资源包标题、搜索/筛选工具栏、视图切换、新建操作、紧凑表格和分页。
- **保留：** 高可扫读表格、局部状态标签、选中行、操作列、冷色工作区与白色内容面。
- **重设：** 旧蓝、行选择与批量选择区分、横纵滚动职责、Focus、响应式列收纳。
- **候选：** Input、Select、Button、Tag/Badge、Table Primitives、Filter Bar、Pagination、Compact Data Management Block。
- **尚未验证：** 搜索/筛选、排序、选择闭环、sticky、键盘与空/错/加载态。

### VE-002 — 课程资源包（卡片视图）

- **结构：** 与 VE-001 共用筛选工具栏，主体改为四列图像优先资源 Card Grid。
- **保留：** 同一资源管理语义下的表格/卡片视图切换、克制边框、局部 AI 标签。
- **重设：** 固定四列、分页遮挡、长标题/标签溢出、旧蓝值和真实滚动所有权。
- **候选：** ResourceCard、ViewSwitcher、ResourceFilterBar、Responsive Grid。
- **尚未验证：** 视图切换状态保持、响应式、分页、Focus、加载/空态。

### VE-003 — 教师-课堂回顾

- **结构：** 顶部任务栏、左侧回顾时间线、中部课件/媒体任务面、右侧知识 Inspector、底部播放器。
- **保留：** 多 Pane 任务层级、主任务面聚焦、Inspector 独立表面、Default 外壳容纳局部 Compact。
- **重设：** 固定 Pane 宽度、独立滚动、收起后焦点恢复、播放器无障碍、旧式侧向阴影。
- **候选：** Split/Sidebar、Task Bar、Review Timeline、Media Stage、Knowledge Inspector。
- **尚未验证：** 截图比设计 frame 多 8px 的外层来源；Pane 滚动/折叠/关闭和时间线定位。

### VE-004 — 云盘

- **结构：** 资源库页签、文件类型/文件夹侧栏、工具栏、面包屑、紧凑文件表格和分页。
- **保留：** 侧栏 + 主表格分区、状态可扫读、表格内滚动、操作区与内容区分离。
- **重设：** hover/current/selected 的明确语义、批量操作、行操作收纳、sticky 与图标来源。
- **候选：** Folder Nav、File Manager Toolbar、File Table、Status Badge、Breadcrumb。
- **尚未验证：** 排序、上传、新建、视图切换、表格 sticky、键盘路径。

### VE-005 — 成果展示

- **结构：** 题目概览、附件、学生作答列表、分数、展开/收起、图片或文件以及分页。
- **保留：** Reading Typography、任务与作答层级、轻边框、附件模块化、分数局部强调。
- **重设：** 固定内容宽度、披露语义、附件预览/下载、长内容与分页关系。
- **候选：** Surface/Card、Avatar、Score Badge、Attachment Item、Disclosure、Answer List。
- **尚未验证：** 展开规则、编辑、下载、页面滚动、隐私安全 fixture 与 a11y。

### VE-006 — 习题组卷

- **结构：** 考试顶栏、题目编辑主区、题型/难度标签、分值编辑、重排操作和题目导航侧栏。
- **保留：** 主编辑区 + 辅助侧栏、紧凑题目节奏、题型与分值统计、低阴影层级。
- **重设：** 固定比例、侧栏折叠、题目操作显隐、长题干、Focus 和滚动所有权。
- **候选：** Exam Composer Layout、Question Editor、Score Editor、Question Navigator。
- **尚未验证：** 拖拽/重排、sticky、主区与侧栏滚动、隐藏 AI 状态的业务含义。

### VE-007 — 产业链图谱

- **结构：** 多级导航、业务 Tab、AI 分析横幅、概览指标、上中下游图谱、价值判断和建设建议。
- **保留：** AI 摘要与业务图谱分层、三阶段分类、数字/单位拆分和紧凑标签簇。
- **重设：** 不等高卡片、文本截断、三列响应式、图谱视图切换和颜色 token。
- **候选：** AIInsightBanner、IndustryChainMap、MetricSummary、TaxonomyCard、RecommendationStrip。
- **尚未验证：** drill-down、tooltip、切换逻辑、sticky 和键盘。截图包含节点外可见溢出，不能直接作为像素基线。

### VE-008 — 岗位画像分析

- **结构：** 顶部岗位洞察、搜索/等级筛选、三列 Job Card Grid 与分页。
- **保留：** Card anatomy、薪资 Data Typography、筛选 + Grid + Pagination 组合。
- **重设：** 非标准间距、整卡点击提示、标签溢出、网格断点和低对比边界。
- **候选：** AIInsightBanner、JobCard、JobCollection Pattern、Responsive Grid。
- **尚未验证：** Card 状态、分页键盘、空/错/加载态。截图包含节点外可见溢出。

### VE-009 — 题库（主从预览）

- **结构：** 批量操作工具栏、Compact Table、选中行、分页和 400px 持久详情 Inspector。
- **保留：** 44/48px 紧凑节奏作为实验起点、主从联动、批量选择、独立 Inspector 滚动。
- **重设：** 固定 Inspector 宽度、可折叠/调宽、列宽、长文本、操作收纳和小屏退化。
- **候选：** MasterDetailLayout、DataTable、QuestionInspector、BulkActionToolbar、ReferenceList。
- **尚未验证：** 表头 sticky、主表滚动、可调宽、筛选/排序和 Focus 顺序。

### VE-010 — 培训总览（教师画像）

- **结构：** 教师档案侧栏、培训 KPI/趋势/环图/证书、师德区、教学数据、进度与评教表格。
- **保留：** 16px 分栏节奏、Data Typography、Statistic、图表 + 表格和多个独立滚动区。
- **重设：** 响应式分栏、侧栏收起、图表文本等价、轮播和表格滚动、非 AI KPI 色彩。
- **候选：** ProfileSidebar、MetricCard、ChartPanel、Timeline、ProgressList、EvaluationTable。
- **限制：** 来源含个人档案式字段；只可用于结构/视觉来源，不得转录到 fixture、文档正文或交付样例。
- **尚未验证：** 图表 tooltip/键盘、轮播、筛选、数据真实性和字体运行环境。

### VE-011 — 错题集

- **结构：** 学习目录树、练习状态切换、搜索/筛选、Question Table、加星和分页。
- **保留：** 树与表格的联动信息结构、题型/难度/来源/日期/加星语义、内滚动与分页分工。
- **重设：** 过深缩进、固定列宽、双高密度区域、小图标和窄屏退化。
- **候选：** HierarchyTree、FilterBar、QuestionTable、DifficultyBadge、FavoriteAction。
- **尚未验证：** 树表同步、筛选/排序/分页请求、虚拟化、sticky 与键盘。

### VE-012 — 课程知识树（教学内容管理）

- **结构：** 课程头部/页签、左侧结构树、右侧 ManageTree 与批量操作入口。
- **保留：** 树层级、发布/锁定/完成状态、行内操作对齐和左导航/主管理树职责区分。
- **重设：** 双树认知负担、主区空白、批量反馈、小图标发现性和可用宽度。
- **候选：** SyllabusTree、ManageTreeRow、StatusTag、BatchActionTrigger、Split/Sidebar。
- **尚未验证：** 批量选择、拖拽、发布、虚拟化、sticky、AI 入口和键盘。截图比元数据 frame 多 14px。

### VE-013 — 资源包-班级

- **结构：** 资源包侧栏、班级切换卡片、知识点工具栏、ManageTree 和固定式未同步 Banner。
- **保留：** 班级上下文、资源/班级职责提示、内容类型、完成状态和持久同步 CTA。
- **重设：** 班级卡溢出、长标题、行内信息拥挤、同步差异解释与可撤销性。
- **候选：** ClassSwitcher、ResourceSidebar、ManageTreeRow、SyncBanner。
- **尚未验证：** 添加/切换班级、隐藏逻辑、同步确认/失败、权限和键盘。

### VE-014 — 新建教材弹窗

- **结构：** 固定标题栏、基本信息、简介、目录、附件四区和底部操作栏；基本信息含封面上传与双列表单。
- **保留：** AI 动作绑定具体分区、表单分组、必填/焦点/清除/禁用、上传限制和固定头尾。
- **重设：** 固定 916×1224、视口内滚动、响应式表单 Grid、错误/帮助、AI 生成中/完成/撤销。
- **候选：** Dialog、FormSection、FormField、Input、Select、UploadDropzone、AIActionButton。
- **尚未验证：** 遮罩、Focus trap、Escape、滚动锁、验证、上传、AI 流程、保存激活和无障碍。

## 4. 跨节点视觉与架构 DNA

### 4.1 应继承

1. **空间层级：** 冷蓝灰 workspace 托起白色任务面；Panel 多用边框而非重阴影。
2. **产品导航：** 深色平台导航在业务产品页中稳定出现，但它不应自动成为 Playground 文档站外壳。
3. **密度：** Compact 用于资源、表格、题库和树；Default 用于表单、报告、阅读与工作台外壳。
4. **字体角色：** PingFang SC 承担中文 UI / Reading；关键数字可独立为 Data role，中文单位不跟随。
5. **圆角/阴影：** 4 / 6 / 8 / 10 / full 足以覆盖大多数证据；阴影主要用于 Overlay、Dialog 或少量侧向分隔。
6. **结构能力：** Filter Bar、Table、Card/Grid、Tree/ManageTree、Master–Detail Inspector、Long Form、Statistic 和 Split。
7. **状态表达：** 选中、发布、锁定、完成、审核、难度、来源和加星以克制的局部标记表达。

### 4.2 必须重新设计

- 将来源中的多套旧蓝、紫、绿、橙关系转译为 Rain Next 语义 token；只有 `#1561F8` 是锁定品牌值。
- 补齐所有交互控件的可见 Focus、键盘路径、Accessible Name、错误、空、加载和禁用状态。
- 将固定画布、绝对列宽和 Pane 宽度改为有边界的响应式规则。
- 明确页面、Table、Tree、Inspector、Dialog 内容区的滚动所有权和 sticky 责任。
- 建立正式图标来源；截图中的图标外观不能被浏览器默认符号、Unicode 或临时内联图形替代。
- 将图表、轮播、上传与 AI 动作改造成可验证的状态机，而不是只复刻静态画面。

### 4.3 明确不继承

- Figma 固定宽高、绝对坐标、被裁切/遮挡的内容和隐藏层；
- 示例课程、题目、班级、ID、日期、头像、联系方式或档案数据；
- 页面级裸色值、非语义圆角/阴影、旧品牌蓝和低对比边界；
- 将所有紫/青/蓝渐变解释为 AI；
- 将平台深色导航复制给 Playground 文档站；
- 将整页、整棵树、整张 Dashboard 或产业链图谱沉淀为“万能组件”；
- 未经运行验证的 hover、selected、sticky、scroll、tooltip、drag 或 responsive 行为。

## 5. AI 语义分类

| 类型 | 证据 | Rain Next 处理 |
| --- | --- | --- |
| 局部标记 | VE-002 的 AI 课程、VE-011 的 AI 出题、VE-013 的 AI 智能体标签 | 作为 Badge/Mark，不使用大面积 AI surface |
| 上下文动作 | VE-014 的智能识别、AI 智能填充 | 绑定具体分区，并提供生成、失败、撤销、确认状态 |
| 洞察表面 | VE-007 产业链分析、VE-008 岗位洞察、VE-010 AI 课程卡 | 可使用 intelligence token；与普通 KPI 分类色分离 |
| 全局助手入口 | VE-012 的 AI 学伴 / AI 陪练 | 属于产品能力入口，不进入 Tree、Layout 或基础 UI API |

## 6. Benchmark 复核结论

### BM-A — Compact Data Management

- VE-001 直接证明筛选、Table、状态、选中行和分页；
- VE-009 直接证明批量选择、Compact 节奏和持久 Inspector；
- VE-002、VE-004 是卡片视图和文件表格的补充证据，但不改变登记成员。

### BM-B — Default Large Form

- VE-014 完整覆盖长 Dialog、分区、单双列、上传、长文本、Focus 和禁用底栏；
- 最大风险是视口内滚动、Focus trap、验证与 AI 状态，而不是静态样式。

### BM-C — Complex Workbench

- VE-003 提供 Task Bar、左时间线、主任务面和右 Inspector；
- VE-012 提供树管理、发布/锁定/完成和双结构区；
- VE-009 提供 Compact Master–Detail 与独立右侧滚动；
- VE-006 是题目编辑工作台的补充证据，但不改变登记成员。

### BM-D — Report / Key Data

- VE-010 提供 KPI、趋势、报告模块、Data Typography 和多滚动 Dashboard；
- VE-007 提供 AI 洞察、分类图谱、摘要与建议；
- VE-008 是 Collection + AI 洞察的补充证据，不改变登记成员。

## 7. 资产就绪度

| 资产 | 就绪度 | 结论 |
| --- | --- | --- |
| Color / Surface / Border | 可进入 Day 2 | 跨节点关系稳定，但须重新映射为 30–45 个语义 token |
| Typography | 可进入实验 | PingFang 角色稳定；Data 字体的本机可用性、授权与回退尚未验证 |
| Density | 可进入实验 | Compact / Default 分工清晰，具体尺寸仍需真实浏览器校准 |
| Focus / Keyboard | 未就绪 | 静态证据不足，必须从组件合同和浏览器测试建立 |
| Icon | 未就绪 | 外观可参考，正式来源、语义 ID 与消费链尚未建立 |
| Table / Filter | 高优先级候选 | VE-001、004、009、011 提供强证据 |
| Card / Collection | 中高优先级候选 | VE-002、005、008 提供不同对象/阅读语义 |
| Tree / ManageTree | Benchmark 私有优先 | 证据强，但不在首批 8 家族；先作为 Pattern 验证 |
| Form / Dialog | 高优先级候选 | VE-014 直接支持 BM-B，行为是主要风险 |
| Statistic / Report | 高优先级候选 | VE-007、010 支持 Data role 与 AI 语义 |
| Chart / Carousel | 暂不系统化 | 静态证据不足，Spike 只做最小可访问适配 |
| 图片/头像/证书 | 来源参考 | 不视为可复用资产，不复制到 fixture 或公共 Registry |

## 8. 截图完整性与差异

现场获取的 14 张截图均验证为有效的 8-bit RGBA、非交错 PNG。隐私检查后仅保留 12 张仓库产物；VE-005 与 VE-010 的未脱敏截图已移出仓库，不记录其路径或哈希。VE-003、VE-007、VE-008、VE-012 的非隔离截图包含少量节点外可见溢出，因此只用于结构与视觉来源，不能直接作为像素基线。

| 文件 | 尺寸 | SHA-256 |
| --- | --- | --- |
| VE-001.png | 1400×659 | `7a766874d50f6079d0f15f40822f7db9f250c6200b5f7c1fa3869aa665dca539` |
| VE-002.png | 1350×710 | `c40913231abba8f07a1c90015b67b610d5766e878180fe562b9a8cd9a17f5395` |
| VE-003.png | 1400×808 | `53e0d1d37e5026b78e021fd2576b42f1913495fa98791a4cbbafdd3c6c79ec4e` |
| VE-004.png | 1400×800 | `045e0138b13886cc64f12a76cc870515660e906844b427539dbd3df4ed7ca1f3` |
| VE-006.png | 1400×914 | `be40b155c600000eee9162f0454290c0d61025ab1e7334c8964b319287b6e44c` |
| VE-007.png | 1472×1549 | `9eafcf3d2974abf39fba557160e582d289dcaf77828fe0f6f948312b331d8cd7` |
| VE-008.png | 1472×1206 | `0b50fbaf61d67e17df0fc90b78e7c5fc01b90c20a05903a64e6b117b553ea73a` |
| VE-009.png | 1400×1248 | `b7c8b25b3f5c6b400f3be30926f5633331697e992bd267d5fb0b48c760ef3c81` |
| VE-011.png | 1400×900 | `64db65855538b15251cdda9e5a104e6231f13cb68e77df1fb33ec5eb3d0e3a2e` |
| VE-012.png | 1600×989 | `f456c404f96a9c14259e7d975a74ad2b3a8f2db2adb525bce8b1613cf7cfe426` |
| VE-013.png | 1600×1154 | `e65a8b77fd74d65a54c31adce69c6aa0c0f313de6cea71088d815f3dd6587f1d` |
| VE-014.png | 916×1224 | `4ac814522982d14dccf8e865f65815cd32db73924bc470f59a3842f3c1149513` |

## 9. 下一检查点

准备阶段完成后，用户已授权 `day-1-runtime-start`。该授权只解锁依赖安装、最小运行骨架、测试基础设施、证据入口与质量门；Foundation 实现属于 Day 2，仍需单独阶段转换。该授权也不自动授权 Figma 写入、Human Gate、包/Registry 发布、业务迁移、本地 commit 或远程 Git。
