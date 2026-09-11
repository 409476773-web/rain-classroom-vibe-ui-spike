# Rain Classic → Rain Next 定向复用审计

- 审计编号：`RC2RN-REUSE-AUDIT-001`
- 报告日期：2026-09-02
- 当前状态：`accepted`，CP3 复用审计 Human Gate 已由用户明确接受
- 工作模式：System Mode 下的只读来源审计
- 机器事实源：[source-lock.yaml](../../evidence/rain-classic/source-lock.yaml)、[reuse-matrix.yaml](../../evidence/rain-classic/reuse-matrix.yaml)
- 运行证据：[runtime/README.md](../../evidence/rain-classic/runtime/README.md)、[asset-results.md](../../evidence/rain-classic/runtime/asset-results.md)、[browser-findings.md](../../evidence/rain-classic/runtime/browser-findings.md)

## 先看结论

这次审计已经完成了“旧库里有什么、哪些规则值得保留、哪些必须重做、以及原先需要用户决定什么”的全量登记。CP3 已在 2026-09-02 获得明确接受：

- 75 个范围内资产的复用方向均为 `audit.status: accepted`；
- 75 个资产的复用审计 `humanGate` 均为 `accepted`；
- 送审时的 20 个职责或方向问题已经逐项决定，真实实现依赖和交互证据缺口继续保留为后续 Gate；
- Rain Next 8+4 的 12 个来源映射均已接受；
- 没有任何资产进入实现、发布或业务迁移。

运行证据必须按下面的口径理解：

- 46 个深度资产浏览器通过；
- 15 个深度资产浏览器受阻，但“受阻”不等于组件失败，其中每项都有已通过的基础路径；
- 1 个深度资产浏览器失败，唯一失败是 TreeManagementPage 的 variation / learning-task 示例数据与校验 Schema 冲突；
- 其余 7 个 standard 资产不要求本轮逐项浏览器运行，6 个 record-only 资产不需要运行。

本报告已经记录 CP3 的实际用户决定。下文的“送审问题/推荐”用于保留当时为什么需要决策的历史依据；逐项最终结果以第 10 节和机器记录 `checkpointDecisions.cp3` 为准。

## 1. 来源 Commit、范围与排除项

| 项目 | 锁定事实 |
| --- | --- |
| 来源项目 | `409476773-web/rain-classroom-design-system` |
| 分支 | `main` |
| Commit | `f1276fe2fcbeb76caeeee4b852f1480402a3d83b` |
| Tree | `a86e6738edb558b48ac92f798155abe5ba985529` |
| Package | `@rain-classroom/design-system@0.1.0` |
| 根导出 | public 144；canonical root 105 |
| Registry | 67 个登记项 |
| 来源状态 | tracked 与 staged 均干净；原有未跟踪计划文件被排除且未读取 |

审计只读取锁定的 Rain Classic 来源。依赖安装、构建、测试与浏览器检查均在无 hardlink 的临时 clone 中完成；Rain Classic 原工作区没有被改写。

范围边界：

- 范围内资产：75；
- 公共资产：53；
- 非公共但因高层复用、共享行为或直接依赖进入范围：22；
- higher-level 资产：30。它们是 75 项中的交叉分类，不能与 public 数量相加；
- 直接共享 Internal：1，即 `_InternalPopup`；
- 明确排除：1，即非 public、非 higher-level 的 `Message`；
- Figma 写入、包发布、业务迁移、本地 Commit 与远程 Git 均不在本次授权范围。

## 2. Public、Internal、Pattern、Template、Domain 总数

### 资产身份

| Identity | 数量 |
| --- | ---: |
| component | 42 |
| template | 12 |
| pattern | 8 |
| domain | 7 |
| foundation | 2 |
| block | 1 |
| configuration | 1 |
| internal | 1 |
| layout | 1 |
| **总计** | **75** |

### 设计师最需要关注的高层资产

- Pattern：8；
- Template：12；
- Domain：7；
- Block：1；
- Layout Foundation / Layout：2；
- higher-level 合计：30。

7 个业务标签资产保留在基础库的独立 Domain 组：

1. DifficultyTag；
2. GroupTypeTag；
3. LearningUnitReminderMark；
4. LearningUnitTag；
5. ScoredTaskTypeMark；
6. StatusTag；
7. SystemStatusTag。

这项分组不会把通用 Tag 扩张成任意业务视觉变体；Domain 资产仍保持封闭业务语义。

## 3. Migration label、目标层、风险与置信度分布

### Migration label

| 方向 | 数量 | 含义 |
| --- | ---: | --- |
| `rewrite-from-rain` | 69 | 保留 Rain 的视觉、业务或行为价值，以 React 重新实现 |
| `retire` | 6 | 重复包装方向，保留证据后进入下一阶段的独特视觉价值复核 |
| **总计** | **75** | 迁移方向不是实现、发布或业务采用状态 |

69 个 `rewrite-from-rain` 的目标层分布：

| 目标层 | 数量 |
| --- | ---: |
| UI | 39 |
| Domain | 7 |
| Template | 6 |
| Layout | 4 |
| Foundation | 2 |
| Pattern | 9 |
| Primitive | 1 |
| Block | 1 |

6 个 `retire` 的落点分布：

| 落点 | 数量 |
| --- | ---: |
| Template 场景入口 | 4 |
| 已保留的共享 Block | 1 |
| Application-owned 内容 | 1 |

全部 75 项的最终目标层分布：

| UI | Template | Pattern | Domain | Layout | Foundation | Block | Application | Primitive |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 39 | 10 | 9 | 7 | 4 | 2 | 2 | 1 | 1 |

### 风险、运行和浏览器证据

| 风险层 | 数量 | Runtime | Browser |
| --- | ---: | --- | --- |
| deep | 62 | 62 passed | 46 passed / 15 blocked / 1 failed |
| standard | 7 | not-run | not-run |
| record-only | 6 | not-required | not-required |

### 置信度与审计状态

| 置信度 | 数量 | 当前审计状态 |
| --- | ---: | --- |
| high | 73 | 73 accepted |
| medium | 2 | 2 accepted |
| low | 0 | 无低置信度项 |

两个 medium 资产是 CheckboxGroup 与 RadioGroup。它们的 `rewrite-from-rain → UI` 方向已在 Gate C 接受，但置信度仍保持 medium，后续实现不能冒充高置信度证据。

## 4. 当前 Spike 8+4 映射

8 个 UI 家族与 4 个 Layout 目标全部有机器记录，并已在 Gate E 接受来源映射。这里的 `accepted` 只表示映射与方向获得 Human Gate 接受，不表示已经实现。

| Rain Next 目标 | 层级 | Rain Classic 主要来源 | 方向 | 当前状态 |
| --- | --- | --- | --- | --- |
| Button | UI | Button；TextButton 为低强调邻近证据 | `rewrite-from-rain` | accepted |
| Input | UI | Input；InputNumber、TextArea 为邻近证据 | `rewrite-from-rain` | accepted |
| Select | UI | Select；TagSelect 为邻近证据 | `rewrite-from-rain` | accepted |
| Dialog | UI | none | `react-only` | accepted |
| Tag / Badge | UI | Tag；Badge、BadgeStatus、StatusIndicator 为邻近证据 | `rewrite-from-rain` | accepted |
| Surface / Card | UI | none | `react-only` | accepted |
| Table Primitives | UI | DataTable；TableColumnSchema 为配置证据 | `rewrite-from-rain` | accepted |
| Statistic | UI | none | `react-only` | accepted |
| Stack | Layout | LayoutRecipes | `rewrite-from-rain` | accepted |
| Inline | Layout | LayoutRecipes | `rewrite-from-rain` | accepted |
| Grid | Layout | LayoutRecipes 的局部关系证据 | `rewrite-from-rain` | accepted |
| Split / Sidebar | Layout | PaneGroup；LayoutRecipes、MasterDetail 为组合证据 | `rewrite-from-rain` | accepted |

Target Gap 汇总：

- 12 个 `accepted`；
- 9 个 `rewrite-from-rain`；
- 3 个 `react-only`：Dialog、Surface/Card、Statistic。

已获得的方向授权允许 Dialog、Surface/Card、Statistic 在 Rain Next 重设计。Select 与 Dialog 的来源方向已经接受，但具体 Headless 底座仍需后续共享 ADR；这里不等于已经开始实现。

## 5. 跨资产继承边界

### 可以继承

- 固定品牌主蓝 `#1561F8`、冷蓝灰文字、白色任务表面、克制阴影和信息优先的 Rain 视觉血缘；
- PingFang SC 的中文 UI 与阅读规则，以及关键数据值与中文单位必须拆开的字体职责；
- focus、selected、active、checked、expanded、disabled 不混为一个“全蓝状态”的语义区分；
- 图标按语义选择、保留精确几何与来源、不用 Unicode 或相似第三方图形替代；
- Container 只管内容宽度与内边距，PaneGroup 只管外部区域几何，DataTable、Tree、Popup 内容各自保留滚动和语义所有权；
- 原生语义、可访问名称、键盘路径、Escape 关闭或取消、焦点恢复、live announcement 等可观察结果；
- Pagination 的纯计算、HierarchyModel 的只读层级关系、DragDropModel 的结构移动验证；
- ManageTree 的本地草稿与原子保存：全部成功或全部失败，不继承部分成功。

### 必须重设

- Vue 2 API、watcher、provide/inject、slot 与事件协议要重写为 React + TypeScript 合同；
- Classic 的局部 size、height、richDensity 必须显式映射到 Rain Next 的 compact / default 上下文；
- Overlay 只保留可观察行为，底层实现等统一 Headless ADR，不在审计中选择 Radix 或 Base UI；
- 所有公共资产重新接入 Rain Next token、`data-rain-id`、`data-slot` 与可验证的 Parts；
- 请求、保存确认、失败、重试、并发与权限要重新划分到 UI、Pattern、Domain Adapter 或应用层；
- Drag、Resize 与 Popup 的 React 输入实现要重做，同时保留键盘、校验、回滚和职责边界。

### 明确不继承

- 不继承 Vue 实例 API、私有 helper、SCSS 层级、深选择器、裸像素和历史覆盖；
- 不继承 Classic 的全库“无蓝色外围 halo”规则。Rain Next 已锁定一般键盘焦点为 2px 品牌蓝 ring + 1px offset；每个资产仍需检查裁切、相邻 3:1 对比、forced-colors 与焦点/选中区分；
- 不把 Classic 的 Figma、Gate、测试、包或业务状态当作 Rain Next 的实现或发布证据；
- 不把表格行排序与树的层级拖拽合并成一个模型；
- 不把 Tree 的视觉交互、ManageTree 的事务/权限或业务删除迁移塞进共享 HierarchyModel / DragDropModel；
- 不把页面 mock、请求、权限、路由或业务并发搬进通用 Layout / UI；
- 不机械复制重复 Template 包装，也不把 Vue 页面整体变成“万能组件”。

## 6. 冲突、证据缺口、置信度与 Target Gap

### 6.1 送审时的 20 个 `needs-decision`（现已逐项确认）

下面保留送审时的问题与建议，便于追溯决策原因。已经解决的选择已改写为实施约束；真实依赖与证据缺口继续保留在机器 blocker 中。

#### A. 可证伪的真实冲突（2）

| 资产 | 送审时给设计师的问题 | 送审时推荐 |
| --- | --- | --- |
| Semantic Icon Registry | 同一个 chevron 图标到底应该固定自身颜色，还是跟随所在按钮/文字的状态颜色？ | 默认让受治理图标跟随宿主颜色；只有颜色本身属于图标身份时才登记命名例外，同时不改变几何。 |
| TreeManagementPage | 学习任务树中，所有章节都必须有“任务类型”，还是只有特定节点需要？当前示例缺失这一必填信息，任何编辑后保存都会被 15 条校验拦住。 | 先由产品确认哪些节点真正需要 taskType，再统一示例数据与校验范围；在此之前不把 variation 保存链路当作可迁移范本。 |

#### B. 方向基本成立，但浏览器证据不足（3）

| 资产 | 送审时给设计师的问题 | 送审时推荐 |
| --- | --- | --- |
| Button | 鼠标点击已通过，但真实键盘激活和完整焦点/状态视觉没有测全；是否接受“保留迁移方向、行为验收延后”？ | 接受 `rewrite-from-rain` 方向，但把键盘和全状态视觉放进 Rain Next 实现 Gate，不把本轮 blocked 写成通过。 |
| Container | 五种用途和三种内边距已看到，但 1200/1400/1600/1920 宽度、语义根节点和透明职责没测全；是否接受延后？ | 保留“只管宽度与 inset、不拥有 Surface/Scroll”的方向，完整响应式证据进入后续 Layout Gate。 |
| PaneGroup | 键盘调整、收起恢复和滚动职责通过，但鼠标拖拽、窄屏与 Main 保护未测全；是否接受延后？ | 保留 PaneGroup 几何所有权，Split/Sidebar 仍为独立组合；后续用真实指针和窄屏补齐 Gate。 |

#### C. 送审时架构职责尚未定（3，现已确认）

| 资产 | 送审时给设计师的问题 | 送审时推荐 |
| --- | --- | --- |
| QueryTable | 查询请求应该由业务页面发起，还是由表格组合自己发起？ | 业务请求留在应用或显式 Domain Adapter；QueryTable 只拥有筛选/分页/表格的可组合状态与动作，并通过注入端口连接请求。 |
| EditableCell | 它是普通 UI，还是表格中的编辑能力？错误提示、保存确认与失败重试由谁负责？ | 归为 Pattern 能力；公开反馈插槽，不依赖被排除的 Message；业务层负责保存确认与持久化结果。 |
| Tabs | “更多”菜单是否共用统一 Popup？旧四档尺寸如何对齐新两档 density？ | 溢出机制复用同一内部 Popup；先以 compact/default 为主，只有真实场景证明必要时才增加独立 size 轴。 |

#### D. 同时包含职责选择与证据缺口（12）

| 资产 | 送审时给设计师的问题 | 送审时推荐 |
| --- | --- | --- |
| `_InternalPopup` | 所有下拉、提示、更多菜单是否共用一套底层？浮层何时留在局部、何时挂到页面根？ | 先建立一个不公开的共享 Primitive；挂载与焦点规则显式配置，Select/Tooltip/Popover 等消费者继续拥有各自语义。Headless 库仍延后决定。 |
| ManageTree | 编辑器与操作菜单共用什么弹出机制？退出编辑、权限拒绝、取消和重试的产品规则是什么？ | 复用统一 Popup；ManageTree 继续拥有草稿、校验和原子事务。未覆盖场景进入后续交互 Gate。 |
| AvatarGroup | “更多成员”弹层是否共用 Popup？hover、focus、点击固定、Escape 与 Tab 顺序如何组合？ | 共用 Popup 机械能力，成员列表角色、名称和键盘语义留在 AvatarGroup；下一阶段补完整交互矩阵。 |
| Pagination | 每页条数选择器依赖哪套 Popup？切换普通页码后焦点应该留在哪里？ | Size changer 复用统一 Popup；推荐焦点保留在用户刚激活且仍存在的分页控件上，再用可信真实输入验证。 |
| Popover | Popup 负责到哪里，具名非模态 dialog 的名称和焦点由谁负责？ | Popup 只管打开、关闭、定位和挂载；Popover 自己拥有 dialog 角色、可访问名称与焦点规则，并补外部关闭/Tab/边缘定位。 |
| RowReorder | 临时排序、确认保存和保存失败分别由谁负责？ | Pattern 只拥有临时顺序、键盘/指针操作、取消和回滚提案；业务层确认持久化。下一阶段补指针、Escape 与播报。 |
| Select | Select 与 Dialog 是否共用同一个 Headless 基础？Popup 依赖如何统一？ | 先完成一份共享 ADR 和一个 canonical Popup identity；Select 保留 listbox/option/IME 语义，不建立私有弹层。 |
| TagSelect | 它与 Select 共用哪些弹出和焦点能力，哪些状态仍属于 Tag 选择？ | 共用 Popup；TagSelect 自己区分 pointer-open、keyboard focus、active option 与 selected value，再补全定位和关闭证据。 |
| TextButton | 它应保留独立公共组件，还是成为 Button 的低强调变体加 Link 语义 recipe？ | 倾向后者，避免两套重叠 API；但需要 Human Gate 明确确认公共身份。 |
| Tooltip | Tooltip 能否替触发器补“名字”？它与 Popup 如何分工？ | Tooltip 只提供补充描述，不能掩盖无名称控件；Popup 提供机械能力，Tooltip 负责描述关联，并补全触发/关闭/定位证据。 |
| Tree | Tree、纯层级模型和拖拽模型分别拥有到哪里？spacious 是否成为第三档 density？ | Tree 保留视觉、焦点、选择和视口；模型只做纯数据/校验；spacious 不自动进入 Rain Next，真实鼠标拖拽进入后续 Gate。 |
| TreeNode | 节点是否要作为独立公开资产？它的拖拽证据能否脱离 Tree 单独成立？ | 默认作为 Tree 的 compound 子部件；只有出现独立消费者时再公开。当前不能声称有独立拖拽通过。 |

分类闭合：2 + 3 + 3 + 12 = 20。

### 6.2 置信度

- low：0；
- medium：2，CheckboxGroup、RadioGroup；
- high：73。

CheckboxGroup 与 RadioGroup 已在 Gate C 单独接受 `rewrite-from-rain → UI`，同时继续保持 medium 置信度；后续实现 Gate 仍需补足组合 API 与真实交互证据。

### 6.3 Target Gap

两个目标的来源映射与迁移方向已经接受，但共用的技术底座仍待后续 ADR 决定：

1. Select：已确认复用 canonical Popup，具体 Headless 方案等待与 Dialog 共用的 ADR；
2. Dialog：已确认 Classic 没有直接公共来源且方向为 `react-only`，具体 Headless 方案同样等待共享 ADR。

Surface/Card 与 Statistic 也没有直接 Classic 公共来源，但其 `react-only` 映射已形成，可以在后续方案阶段重设计。当前审计不选择具体交互方案或外部库。

## 7. 运行与浏览器证据

### 运行

- 锁定临时 clone 的 `pnpm verify`：257 个测试文件、1,596 个测试通过，187 个构建模块，Vue 2.7.16 consumer build 通过；
- 五组高风险 focused test：65 个文件、529 个测试通过；
- 62 个 deep 资产全部 `runtimeReview: passed`；
- 7 个 standard 资产为 `not-run`，不伪装成运行通过；
- 6 个 record-only 资产为 `not-required`。

### 真实 Chromium

| 结果 | 数量 | 解释 |
| --- | ---: | --- |
| passed | 46 | 已直接操作或通过命名消费者观察 |
| blocked | 15 | 基础路径可通过，但 Track A 的部分条件没有可信证据；不等于组件失败 |
| failed | 1 | 实际到达路径后暴露可证伪的 fixture/schema 冲突 |

15 个 blocked：

- `_InternalPopup`、ManageTree、AvatarGroup；
- Button、TextButton、Container、PaneGroup、Pagination；
- Popover、Select、TagSelect、Tooltip；
- RowReorder、Tree、TreeNode。

唯一 failed：

- TreeManagementPage 的 variation / learning-task 保存路径；
- 任何草稿变化都会先产生 15 个必填 `taskType` 错误；
- save-error / conflict Adapter 因此没有被调用，它们是被上游冲突阻塞，不是已经证明失败。

本轮没有保留截图。浏览器帧只在临时环境中查看，因此没有截图路径或 SHA-256 可声称。

## 8. 推荐的 Rain Next 实施顺序

这只是审计后的推荐次序，不是实现授权。

1. **先落实已确认的基础规则，再完成技术选择**：普通图标跟随宿主颜色，弹层统一使用一个 canonical `_InternalPopup`；随后完成 Select/Dialog 共用的 Headless ADR，并在实现 Gate 验证 local/portal 与焦点职责。
2. **建立首批 Foundations 与 Layout**：继续沿用已锁定 token、字体、density、focus；实现 Stack、Inline、Grid，并把 PaneGroup 与 Split/Sidebar 保持为不同身份。
3. **完成低耦合 UI 家族**：Button、Input、Tag/Badge、Avatar、Empty、状态组件和 choice controls；7 个业务标签进入独立 Domain 组。
4. **完成 Overlay 消费者**：Select、Dialog、Popover、Tooltip、TagSelect、AvatarGroup、Pagination size changer，全都复用同一 Primitive，不各造一套弹层。
5. **完成数据与集合能力**：TableColumnSchema、DataTable、EditableCell、RowReorder、QueryTable；业务请求和持久化留在应用或 Domain Adapter。
6. **完成 Tree / ManageTree**：先固定纯 Hierarchy/DragDrop ports，再完成 Tree 视觉与交互，最后接入 ManageTree 原子事务。
7. **组合 Pattern、Block、Template**：FilterBar、FormSection、CollectionShell、MasterDetail、ReviewWorkbench、WorkbenchShell 和页面 Template。
8. **每批分别过 Gate**：自动检查、真实浏览器、人工设计/架构确认、Figma、包发布与业务采用分别记录，不串联推导。

## 9. 独立生命周期边界

| 状态轴 | 当前事实 |
| --- | --- |
| Static review | 75 / 75 reviewed |
| Audit status | 75 accepted |
| Human Gate | 75 accepted |
| Runtime review | 62 passed；7 not-run；6 not-required |
| Browser review | 46 passed；15 blocked；1 failed；7 not-run；6 not-required |
| Implementation | 75 not-started |
| Figma editable material | not-authorized |
| Figma Component / Variant | not-authorized |
| Package / Registry publication | not-authorized |
| Business migration | not-authorized |
| Local Git Commit | not-created |
| Remote Git | not-configured |

必须保持：

`审计方向 ≠ 实现完成 ≠ 自动检查通过 ≠ Human Gate ≠ Figma 发布 ≠ 包发布 ≠ 业务采用 ≠ Git 操作`

`verify:reuse-audit` 已作为独立命令登记，并受工作区脚本清单治理；默认 `pnpm verify` 仍不自动包含它。因此关闭本次审计时必须分别运行严格实时来源检查与 `pnpm verify`，两者不能互相代替。

## 10. Human Gate 批量确认包

### 同意意味着什么

对某个批次选择“同意”，只意味着：

- 接受该批资产的 Classic → Next 来源关系、保留/重设/不继承边界；
- 接受当前 migration label 与目标层作为后续方案输入；
- 允许审计 Gate 在用户明确回复后单独记录结果。

### 同意不意味着什么

它不意味着：

- 已实现任何 Rain Next 组件；
- 已选择 Radix、Base UI 或其他 Headless 库；
- 送审时 20 项中保留下来的实现依赖和交互证据缺口已经自动通过；
- 15 个 blocked 自动变成 passed，或唯一 failed 已修复；
- Figma 已写入或发布；
- Package/Registry 已发布；
- 业务页面已迁移；
- 已创建 Local Commit、Remote、Push、PR 或 Merge。

### Gate A — 已接受：高置信度、`rewrite-from-rain`、无 blocker（47）

建议按族批量确认：

1. **UI 目标层（26）**：TableColumnSchema、ActivityOverlay、Avatar、AvatarGrid、Badge、BadgeStatus、CheckableTag、CheckableTagGroup、Checkbox、CircularCheckbox、DataTable、Empty、FormItem、IconButton、Input、InputNumber、LinkTag、MenuItem、Radio、SearchInput、Segmented、StatusIndicator、StatusIndicatorGroup、Switch、Tag、TextArea。
2. **Domain 标签（7）**：DifficultyTag、GroupTypeTag、LearningUnitReminderMark、LearningUnitTag、ScoredTaskTypeMark、StatusTag、SystemStatusTag。
3. **Foundation / Layout / Block（4）**：LayoutFoundation、WorkbenchShell、LayoutRecipes、LayoutListDetailBlock。
4. **Pattern（5）**：CollectionShell、FilterBar、FormSection、MasterDetail、ReviewWorkbench。
5. **保留方向 Template（5）**：CourseBasicInfoStandard、CourseBasicInfoVariation、GradingWorkbenchPage、QueryManagementStandard、QueryManagementVariation。

确认结果：整体接受这 47 项的来源和方向；后续实现仍逐批过独立 Gate。

### Gate B — 已接受：高置信度 `retire` 方向（6）

1. GradingWorkbenchStandard；
2. GradingWorkbenchVariation；
3. LayoutListDetailBlockDemo；
4. TreeManagementRulePanel；
5. TreeManagementStandard；
6. TreeManagementVariation。

确认结果：接受“消除重复包装”的方向，但在下一阶段实际停用前再做一次独特视觉价值复核。TreeManagementRulePanel 的“唯一所有者”信息分组继续作为共享页面的视觉证据保留；确认 retire 不表示删除文件。

### Gate C — 已接受：中置信度、无 blocker（2）

1. CheckboxGroup；
2. RadioGroup。

确认结果：接受当前 `rewrite-from-rain → UI` 方向。两项继续保持 medium 置信度，不能与 high 批次混写。

### Gate D — 已接受方向并路由后续 Gate（20/20）

送审时允许逐项选择接受、退回或继续延后。最终 20 项均已获得明确决定；Headless 选择、真实交互和实现证据按各条记录继续延后，不得静默越过。

#### Gate D 逐项确认进度（2026-09-02）

- **1/20 · Semantic Icon Registry：已确认推荐。** 普通功能图标跟随所在文字或控件的颜色；只有颜色本身属于图标身份时，才登记为固定色命名例外；图标几何不变。
- **2/20 · TreeManagementPage：已确认推荐。** 只有真正的学习任务节点必须选择“任务类型”；章节和整理用节点不需要。后续实现阶段需统一示例数据与校验范围，并重新检查保存失败与冲突场景。
- **3/20 · QueryTable：已确认推荐。** QueryTable 统一管理筛选、查询、重置、翻页、排序、加载中与空结果体验；业务页面负责连接真实数据、权限和业务规则。
- **4/20 · EditableCell：已确认推荐。** EditableCell 作为可复用的表格编辑能力，负责一致的进入编辑、检查、取消、保存中与失败后保留输入等体验；业务页面负责权限、真实保存和最终结果，反馈通过公开组合位置接入。
- **5/20 · Tabs：已确认推荐。** “更多”菜单共用统一内部弹出能力，Tabs 保留自己的标签、选中与溢出列表语义；Rain Next 先提供紧凑和默认两档，只有真实场景证明不足时再增加尺寸。
- **6/20 · Button：已确认方向，完整验收延后。** 保留 `rewrite-from-rain → UI`，但本轮不写成完整通过；可信键盘操作和悬停、按下、焦点、不可用、加载中等完整状态必须进入 Rain Next 实现 Gate。
- **7/20 · Container：已确认方向，响应式验收延后。** Container 只负责内容宽度和左右留白；卡片外观与滚动由其他组件负责。完整多宽度、透明职责与单一滚动检查进入后续 Layout Gate。
- **8/20 · PaneGroup：已确认方向，鼠标与窄屏验收延后。** PaneGroup 保留多栏几何、调整宽度和收起职责；Split/Sidebar 继续作为独立组合。shadcn/ui 的 Resizable / Sidebar 与 Ant Design 的 Splitter / Layout.Sider 也采用类似的分层方式。真实鼠标拖动、窄屏、中间主区保护、恢复与滚动边界进入后续 Layout Gate。
  - 学习成熟库：可组合的栏与拖动条、键盘调整、明确的初始/最小/最大尺寸、受控调整与收起，以及导航 Sidebar 自己的桌面/窄屏方案。
  - 保留 Rain 教育后台规则：中间主区不能被挤没；Navigation/Inspector 有明确收起顺序；收起后焦点可恢复；同一方向只保留一个正确滚动区域；表格、树和弹出内容仍由各自组件负责。
- **9/20 · `_InternalPopup`：已确认推荐，具体底层库延后选择。** 建立一套不公开的共享弹出底座，只统一打开、关闭、定位、挂载、点击外部或按 Escape 关闭和焦点返回等幕后能力。Select、Tooltip、Popover、更多菜单等继续各自负责用途、内容、名称与键盘规则；业务页面不直接使用万能 Popup。
  - 学习成熟库：shadcn/ui 和 Ant Design 都把 Select、Tooltip、Popover、菜单保留为不同的公开组件，同时在底层统一位置、页面边缘调整、挂载和主题等公共能力。
  - 保留 Rain 教育后台规则：弹出内容进入表格、树、多栏页面时不能制造错误滚动或被裁切；无论留在局部还是挂到页面根部都必须保持 Rain 主题和可读密度；只保留一个内部 Popup 身份，避免各组件重复造轮子。
  - 延后验收：具体采用哪套 Headless 底层另做 Select/Dialog 对照决定；外部关闭、Escape、Tab 顺序、焦点返回、边缘定位、滚动容器和主题传递仍进入后续交互 Gate。
- **10/20 · ManageTree：已确认推荐，完整交互验收延后。** ManageTree 负责完整的编辑草稿、内容检查、统一保存、取消和失败恢复；普通 Tree 只负责目录显示、展开、选中、键盘浏览和提出拖动结果，不能吸收编辑事务。业务页面或 Domain Adapter 负责真实权限、后台连接、版本真相和具体课程规则。
  - 学习成熟库：shadcn/ui 当前没有官方 Tree/ManageTree，采用表单、菜单、弹窗等能力组合；Ant Design 的 Tree 负责层级、选择、搜索和拖动，Form、Dropdown 仍是独立能力，两者都不替产品决定保存事务和权限规则。
  - 保留 Rain 教育后台规则：只有真实学习任务必须选择任务类型；同一时间只保留一个活动编辑器；保存必须全部成功或全部失败；失败后保留教师草稿、展开路径和选中节点；取消恢复最近一次成功保存的课程结构。
  - 延后验收：退出编辑、切换另一个编辑器、操作菜单竞争、权限拒绝、内容不合规、取消、失败后重试完成和版本冲突恢复进入后续交互 Gate。
- **11/20 · AvatarGroup：已确认推荐，完整交互验收延后。** AvatarGroup 管理成员数量、可见成员与剩余人数、成员名称、溢出列表结构和键盘规则，并共用内部 Popup；业务页面负责成员角色、权限、详情入口和具体动作。
  - 学习成熟库：借鉴 shadcn/ui 的 AvatarGroup / Count 清晰组合，以及 Ant Design Avatar.Group 的人数上限和 Popover 完整度，但不把通用 Popup 变成 AvatarGroup 私有能力。
  - 保留 Rain 教育后台规则：无溢出不显示“+N”；溢出时最后一个位置留给有明确名称的剩余人数按钮；hover 只是便利方式，点击和键盘仍可使用；Escape 返回剩余人数按钮；纯展示姓名不制造无意义的 Tab 停留点；成员真实可操作时才使用链接或按钮。
  - 延后验收：hover 延迟、focus 打开、点击固定、交互成员列表内的 Tab 顺序、触屏行为、边缘定位和长名单滚动进入后续真实交互 Gate。
- **12/20 · Pagination：已确认 B，完整覆盖 Ant Design 式功能。** Rain Next Pagination 不限于最小页码导航，完整覆盖上一页/下一页、页码与省略号、总数与范围、每页条数、快速跳页、简洁模式、响应式精简、受控状态和必要的自定义能力。
  - Rain 边界：这里的“完整覆盖”指产品功能与状态覆盖，不复制 Ant Design 默认外观、蓝色风格、代码依赖或接口命名；仍以 Rain Token、中文表达和教育后台密度重新设计。每页条数仍共用内部 Popup。
  - 职责边界：Pagination 只提出页码与每页条数变化；QueryTable 或业务页面继续负责真实数据请求、筛选、排序、权限、加载和业务错误。
  - 保留规则与延后验收：改变每页条数时尽量保留当前首条数据并进入有效页；普通翻页后尽量保留在刚操作的控件；可信鼠标、键盘、焦点回落、快速跳页中文输入、响应式及全功能组合继续进入后续交互 Gate。
- **13/20 · Popover：已确认 A，完整交互验收延后。** Popover 是有明确名称、不会锁住整个页面的轻量内容与操作面板；内部 Popup 只负责打开、关闭、定位、挂载与外部关闭，Popover 自己负责标题、说明、内容含义、Tab 顺序和焦点规则。
  - 学习成熟库：采用 shadcn/ui 的 Trigger、Content、Title、Description 清晰组合，并学习 Ant Design 对触发、位置和边缘避让的完整覆盖；不把 Popover 做成万能浮层。
  - Rain 用途边界：简短说明用 Tooltip；少量补充信息或快捷操作用 Popover；复杂表单、长流程和重要确认用 Dialog、Sheet 或页面区域。Popover 可承载文字、图片、小表格和少量操作，不承载音视频或复杂工作流。
  - 延后验收：有操作时必须支持点击和键盘，hover 只能作为额外便利；外部关闭、Escape、Tab 顺序、焦点返回、边缘定位、滚动容器和局部/页面根部挂载进入后续真实交互 Gate。
- **14/20 · RowReorder：已确认 A，完整交互验收延后。** RowReorder 负责临时顺序、鼠标与键盘操作、取消和恢复建议；业务页面负责权限、真实保存、成功失败、最终顺序和版本冲突。
  - 学习成熟库：shadcn/ui 没有内置行排序事务；Ant Design 通过 dnd-kit 组合拖动示例，两者都不替业务处理保存和失败恢复。因此 RowReorder 保持为 DataTable 之外的独立 Pattern。
  - Rain 教育后台规则：使用专用拖动手柄；默认调整后统一保存；失败后保留临时顺序并提供重试或取消；明确调整当前视图还是全部数据；字段排序与手动排序不能静默并存；平级行排序不能扩展为 Tree 父子移动。
  - 延后验收：真实鼠标拖动、键盘移动、Escape 取消、焦点保留、位置播报、自动/明确保存模式和失败恢复进入后续交互 Gate。
- **15/20 · Select：已确认 A，具体底层选择与完整交互验收延后。** Rain Next Select 学习 shadcn/ui 清晰的组合方式与键盘体验，并学习 Ant Design 对后台复杂状态的完整覆盖；同时保留 Rain 自己的视觉、中文输入保护、单选、多选、搜索及不同状态表达。
  - 职责边界：Select 负责选择值、选项浏览、搜索文字、键盘操作、中文输入过程、清除、加载中和空结果；每条选项继续由 MenuItem 表达；内部 Popup 只负责打开、关闭、定位、挂载、外部或 Escape 关闭与焦点返回。
  - 业务边界：真实数据请求、权限、远程结果规则和具体业务限制由业务页面或 Domain Adapter 负责，不能写进通用 Select。
  - 组件边界：TagSelect 继续保留独立身份，不把它简单塞进 Select 的 tags 模式。极少且固定的选择优先考虑 Radio；允许自由输入建议时使用专门的 AutoComplete/Combobox；超大列表只有真实数据证明需要时才启用虚拟滚动。
  - 延后决定与验收：具体采用 Base UI、Radix UI、React Aria 或其他无样式交互底座，留给后续 Select + Dialog 对照实验和共享 ADR；真实键盘、中文输入、多选、外部关闭、Tab、焦点返回、页面边缘、滚动区域、挂载位置和主题传递进入后续交互 Gate。
- **16/20 · TagSelect：已确认 A，保留独立身份并严格收窄。** TagSelect 只服务紧凑区域内切换一个当前标签值：候选来自有限本地列表、始终单选、始终有有效值；它不允许自由创建标签、不承担多选或远程请求，也不扩展为另一个复杂 Select。
  - 职责边界：TagSelect 负责当前标签外观、触发含义、选项浏览，以及鼠标打开、键盘焦点、当前浏览选项和真正已选值之间的区别；内部 Popup 只负责打开、关闭、定位、挂载与焦点返回，MenuItem 继续负责每条选项。
  - 使用分流：极少选项需要同时可见时用 CheckableTagGroup 或 Radio；普通表单、较大或远程数据、多选、加载和复杂搜索使用 Select；只有需要在紧凑教育后台区域原位切换当前类别时使用 TagSelect。
  - Rain 规则：已登记的业务标签可以保留受治理的语义色，但不能让使用方自由上色；重复选择当前值只关闭菜单，不重复制造值变化；短列表默认不搜索，只有真实数量证据出现时才开放本地搜索。
  - 延后验收：TagSelect 共用未来 Select 的底层技术家族，但保持独立公共身份；鼠标、键盘、当前浏览与已选区别、外部和 Escape 关闭、Tab、焦点返回、页面边缘、滚动区域、挂载位置、主题与触屏进入后续真实交互 Gate。
- **17/20 · TextButton：已确认 A，不再作为 Rain Next 独立公共组件。** 执行编辑、重试、打开弹窗等即时操作时使用 Button 的最低强调文字样式；前往页面、文档或其他位置时使用 Link，并在需要时共用同一套 Rain 文字操作外观。
  - 学习成熟库：shadcn/ui 允许链接共用 Button 的视觉配方，但明确要求真实跳转保持原生链接含义；Ant Design 把 Text 与 Link 放在 Button 类型里。Rain 吸收两者的状态完整度，同时更明确地区分“执行操作”和“前往位置”。
  - 保留设计价值：现有 TextButton 的颜色、间距、图标顺序、加载中、不可用、危险与焦点证据全部进入 Button/Link 的共享视觉规则；本轮不删除 Classic 文件，后续提供旧名称到新用法的迁移说明。
  - Rain 规则：表格“编辑”是低强调 Button，“查看详情”是 Link；一个文字控件仍只有一个点击目标；危险色只用于真实风险动作；最低强调动作不能替代区域内唯一的主要提交。
  - 延后验收：在旧公共身份真正停用前，Rain Next Button 与 Link 实现 Gate 必须验证真实键盘、可见焦点、点击区域、操作/跳转含义、前后图标、加载中、不可用与危险状态。
- **18/20 · Tooltip：已确认 A，只提供简短补充说明。** Tooltip 不能替代真实控件自己的名称、用途或点击行为；即使 Tooltip 没有打开，图标按钮等触发控件仍必须能够被正确理解。
  - 职责边界：Tooltip 负责短纯文字、与一个真实触发控件的补充说明关系、鼠标延迟打开、键盘聚焦立即打开，以及 Escape、离开或失焦关闭；内部 Popup 只负责定位、挂载、页面边缘调整和清理。
  - 内容边界：Tooltip 自己不获得焦点，不放按钮、链接、图片、表格或其他复杂内容，也不允许点击固定；丰富信息或操作使用 Popover。必须阅读的课程说明、校验、错误和持续反馈留在页面或专用组件中。
  - 学习成熟库：采用 shadcn/ui 的 Trigger/Content 清晰组合和鼠标/键盘路径；学习 Ant Design 的延迟、12 方位和边缘调整，但 Rain 把键盘聚焦支持设为默认要求；遵循 W3C 的焦点留在触发控件、Escape 关闭和“补充描述”关系。
  - Rain 规则与延后验收：保留受治理的深色提示外观、文字、间距和箭头，不开放任意实例颜色；触屏或从不 hover 的用户不能失去必需信息。鼠标、键盘、触屏替代路径、延迟、关闭、焦点、边缘、滚动区域、挂载位置、清理和主题传递进入后续真实交互 Gate。
- **19/20 · Tree：已确认 B，对齐 Ant Design 式完整功能覆盖，但保持 Rain 重写。** 覆盖受控/非受控展开、单选/多选、级联/独立勾选、半选、禁用、异步加载与失败重试、外部搜索路径、图标和关系线、富内容、大数据滚动优化，以及专用手柄的鼠标/键盘拖动建议。
  - Rain 边界：完整覆盖不表示复制 Ant Design 的外观、代码、依赖、接口命名或默认产品规则。TreeSelect、目录选择器、TreeTable、批量业务动作和 ManageTree 保存事务仍是独立组件或组合。
  - 职责边界：Tree 负责画面、滚动区域、展开、焦点、选择、勾选、加载和拖动反馈；层级数据模型只整理父子关系和检查结构；拖动模型只返回可接受或拒绝的移动建议；ManageTree/业务页面负责草稿、权限、真实保存、失败恢复和课程规则。
  - 密度口径：Basic Tree 保留 Compact/Default；Rich Tree 继续允许 Compact/Default/Spacious 内容间距，但 Spacious 不扩展成所有 Basic Tree 的第三种行高。
  - Rain 规则与延后验收：展开箭头、行选择、Checkbox 和节点操作各自独立；筛选和异步加载不能静默丢掉隐藏选中真相；拖动只能从专用手柄开始，保存前仍只是建议。完整功能矩阵、W3C 键盘、状态区分、异步、虚拟滚动、Rich 自然高度及真实鼠标/键盘拖动进入 Tree 实现 Gate；当前鼠标拖动仍是未取得可信证据，不是通过。
- **20/20 · TreeNode：已确认 A，作为 Tree 的正式可配置子部件，不独立公开使用。** TreeNode 负责正确显示一行中的展开箭头、拖动手柄、Checkbox、图标、名称、补充说明、数量、操作和视觉状态；整棵 Tree 继续负责层级、展开、焦点、选择、勾选、大数据滚动与拖动交互。
  - 设计师边界：Figma 和 Tree 文档可以把 TreeNode 展示为嵌套构成部件，供普通、勾选、富内容和可拖动节点配置；业务页面不能脱离 Tree，把单个 TreeNode 当成普通列表项使用。
  - 学习成熟库：Ant Design 把 TreeNode 设置放在 Tree API 内并由整棵树的数据与状态管理；W3C 的 treeitem 也必须处于 tree 或 group 关系中。
  - 证据边界：当前节点的焦点、选择、勾选和操作证据都通过 Tree 获得；鼠标拖动仍随 Tree 一起进入后续真实交互 Gate，不能单独声称 TreeNode 拖动已经通过。只有未来出现真实独立消费者，才重新讨论独立公共身份。

Gate D 的 20 项已经逐项确认完成。CP3 接受只关闭 Classic → Next 复用关系、职责边界、迁移方向与后续 Gate 路由；已解决的设计选择不再作为待决问题，真实实现依赖和交互证据缺口继续保留。机器决定记录在 `checkpointDecisions.cp3`。

### Gate E — 已接受：Rain Next 8+4 目标图

- 12 个目标的来源映射均已接受；
- Select 保留 Rain 来源并共用内部 Popup，Dialog 保持 `react-only`；
- 明确允许 Dialog、Surface/Card、Statistic 重设计；
- Select/Dialog 的共享 Headless ADR、交互方案和真实证据继续延后。

### CP3 确认汇总

| Gate | 最终结果 |
| --- | --- |
| A | 47 项来源与方向接受 |
| B | 6 项 retire 方向接受；实际停用前复核独特视觉价值 |
| C | CheckboxGroup、RadioGroup 接受 `rewrite-from-rain → UI`，保持 medium 置信度 |
| D | 20/20 已逐项决定；实现依赖和交互证据进入后续独立 Gate |
| E | Rain Next 8+4 的 12 个来源映射接受 |

## CP3 接受结果

CP3 复用审计 Human Gate 已由用户明确接受，`audit.status` 与 `humanGate` 已在复用矩阵中记录为 `accepted`。这次接受没有授权修改 `status/current-phase.yaml`，也没有授权组件实现、Figma、发布、业务迁移、Local Commit 或 Remote Git；这些状态继续保持原值，后续必须分别获得授权。
