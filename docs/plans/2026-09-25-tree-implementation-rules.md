# Tree / ManageTree 详细实施规则与实施计划

> 后续进度：用户随后明确要求“开始按照计划实施建设”。本文件的“本轮只写文档／代码尚未开始”描述保留为当时的审批记录；当前实现、验证和未完成项以 `status/current-phase.yaml`、`evidence/runtime/tree/verification.md` 与 `evidence/runtime/manage-tree/verification.md` 为准。

> 执行者按 writing-plans / executing-plans 分批落实；只在进入代码实施后为有状态逻辑补充行为测试。本轮授权是编写实施规则，不是开始实现组件。

**Goal:** 以 Rain Classic 的成熟能力和已通过人工审核的 A 版视觉为基础，建设 Rain Next Tree，以及独立的 ManageTree 管理 Pattern。

**Architecture:** Tree 管层级、节点呈现与树交互，TreeNode 是其可配置部件；ManageTree 组合 Tree，管理编辑缓冲、草稿、校验和原子保存；业务适配层拥有权限、节点类型、删除策略和后端。复用现有 Rain UI、Token 和正式图标，不把旧 Vue 结构机械翻译为 React，不为本任务另建通用状态机、缓存或拖拽平台。

**Tech Stack:** 当前仓库 React 19 / TypeScript / Vite / Rain Tailwind 与组件 CSS；Vitest / Testing Library / Playwright。现有 Base UI 1.8.0 仅用于已经明确的配套行为；Tree 不预设新增 Headless 或虚拟列表依赖。

---

## 0. 文档效力、审核依据与状态

### 0.1 当前决定

- 日期：2026-09-25。
- 用户原话：**“确定。已经完成视觉审核。可以开始写详细的实施规则。”**
- 已通过范围：四组代表视觉稿（深层 Basic、勾选、Rich、管理原位编辑），包含 A 排列及浅关系线、浅箭头、弱说明文字。
- 有效视觉：[审核通过的 A 稿存档](../design-reviews/tree/accepted-layout-a.html)。原始会话文件为 `/Users/wenchengkai/.codex/visualizations/2026/09/24/01a0d399-70e3-7fe0-a39d-0391115814f9/tree-layout-a-review.html`；存档逐字节保留，不是可消费的 React 实现。
- 存档 SHA-256：`785479aed318107a8afc06bf8b6f42baa7119fbe43af278bc094631dc8cc3e2f`。
- 需求来源：[完整检阅、调研与讨论记录](../../../../research/2026-09-24-tree-review-and-research.md)，其中第 11 节为已确认产品规则。较早截图、旧库、A/B 比较稿只作为历史，不覆盖最终 A 稿。
- 当前工作目录：`.worktrees/card-v2`，分支 `codex/card-v2`；本轮只写文档与审核记录，保留既有未提交工作。

| 状态维度 | 本轮结果 |
| --- | --- |
| 产品规则与代表视觉人工审核 | 已确认、已通过 |
| 详细实施规则 | 本文交付 |
| Next Tree / ManageTree 代码 | 尚未开始；本轮不安装依赖或实现组件 |
| 正式实现的功能、键盘、读屏、性能、对比度验证 | 尚未运行；视觉稿检查不能替代这些验证 |
| 系统资产、Registry 发布、Figma、业务迁移、Git | 不因本次审核或文档交付自动推进 |

### 0.2 阅读约定

- **确定规则**：用户已选定，不在实施时反复询问，也不由技术选型改写。
- **继承要求**：旧库已有且未被新版明确替代的能力；必须迁移其语义并修复已知缺口，不要求 Vue API 原样保留。
- **工程约定**：本文为把需求做完整而规定的内部模型、默认流程和文件组织；不是冒充用户逐项确认的产品选项。实施中可用更简单的等价方式完成，但不得改变可观察行为。
- **验证项**：尚无运行证据的技术问题。先验证并记录结果；只有确实需要改变已确认视觉或范围时，才提交具体差异，不重新开放整套需求讨论。

## 1. 范围与组件职责

### 1.1 本轮实施范围

| 所有者 | 必须提供 | 不承担 |
| --- | --- | --- |
| Tree（UI） | Basic / Rich、展开、独立行选中、级联/独立勾选、搜索呈现、异步加载反馈、关系线、键盘、拖拽提案、固定高度大树 | 草稿事务、课程权限、后端保存、页面查询栏、业务删除 |
| TreeNode（Tree 部件） | 控件排列、标题/说明/Meta/Actions、状态与连接线几何 | 第二套选中或展开状态、独立事务、单独公共组件家族 |
| ManageTree（Pattern） | 显式编辑、一个活动编辑器、草稿、增删改移、校验、保存与冲突恢复 | 任务类型强制规则、服务端接口、跨组件全局 Message 服务 |
| Domain Adapter（业务） | 字段含义、权限、节点类型、子节点来源、删除/迁移方案、保存版本与响应 | 复制 Tree 的键盘、级联算法或 ManageTree 的草稿系统 |
| 页面组合 | SearchInput、筛选、批量动作、左树右详情、容器和滚动边界 | 复制一套 Tree 内部状态以驱动外观 |

架构依据：[复用矩阵](../../evidence/rain-classic/reuse-matrix.yaml) 将 ManageTree 定义为 `pattern` / `manage-tree-pattern`，Tree 为 UI，TreeNode 为 Tree 的 compound part。保持此边界。

### 1.2 本次不扩展

触屏专项、跨树拖动、Shift 范围选择、撤销/重做、自动保存、并发多个编辑器、内建远程全文搜索、通用 TreeTable、独立 TreeSelect/目录弹窗家族、动态高度虚拟化和通用分页缓存均不作为本计划新增建设。已存在的目录选择或左树右详情可用组合示例表达，不把它们升级为 Tree 的一组业务 Props。

不把“Rich 不用固定高度虚拟化”解释成删除 Rich；Rich 必须自然增高。后续真实规模确有需求时，再为可变高度窗口化立项。

## 2. 必须继承、替换及修复的内容

| 领域 | 实施要求 |
| --- | --- |
| 数据 | 保留嵌套数据、字段适配、字符串/数值 key、受控与非受控入口；全树 key 唯一，拒绝循环、缺 key、非法 children |
| 交互状态 | expanded / focused / selected / checked / loading / editing 各有明确来源；互不借用 |
| 勾选 | 继承级联、父子独立、可勾范围、半选和多种结果序列化；修复异步投影丢普通勾选、越过可勾范围的问题 |
| 异步 | 继承加载、失败、重试和状态播报；补请求去重、过期响应拒收与意图继承 |
| 管理 | 继承草稿/changeset/revision、原子保存、失败保留、冲突保留、临时 key 映射与焦点恢复 |
| 新版替换 | 24px 缩进；叶子不留展开位；折线箭头；标题原位编辑；Enter/确认才写草稿；Message 校验提示；保存成功退出编辑 |
| 必须纠正 | 空分支判断分裂、同页 DOM ID 重复、部分富内容误开固定虚拟化、声明有 API 但没有 UI、学习任务字段错用于章节、保存映射后 UI 仍使用旧 key |

旧版 `ManageTree.vue` 的输入路径会直接修改草稿，因此必须新增独立编辑缓冲。不能仅把旧编辑器挪到标题位置而保留旧提交时机。

实施时对照的原始代码：[层级模型](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/behaviors/hierarchy/hierarchyModel.js)、[勾选与意图](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/tree.selection.js)、[拖动模型](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/behaviors/drag-drop/dragDropModel.js)、[管理组件](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/ManageTree.vue)、[草稿事务](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/manage-tree.draft.js)、[保存协议](/Users/wenchengkai/CodexFile/雨课堂_ai设计系统_v3.0/src/components/Tree/manage-tree.save.js)。旧库仅作为只读语义来源。

## 3. 视觉规则与节点构成

### 3.1 结构、密度和对齐

逻辑排列：关系线 → 展开按钮（分支）→ 拖拽手柄（启用时）→ Checkbox（启用时）→ Leading（业务需要时）→ 标题/说明 → Meta → Actions。

| 项目 | 规则 |
| --- | --- |
| 层级缩进 | 每深入一级固定增加 **24px**，Basic、Rich、管理树和所有密度一致 |
| 叶子 | **不保留展开按钮占位**；分支与叶子的同级标题可以错开；不能为了文字齐平恢复旧空位 |
| 行选中 | 整行与随层级内收两种，默认整行；不是“标题文字选中” |
| Basic | 紧凑最小行高 36px、标准 44px；默认紧凑；标题 14/22、单行省略 |
| Rich | 上下留白各 8/10/12px，默认各 10px；标题 14/22 可换行，说明 13/20，内容自然增高 |
| 字体 | PingFang SC；普通 400，选中标题 600；普通序号和 Meta 不使用关键数据字体 |
| 展开按钮 | 16×24px 的完整可见按钮框；内部正式折线箭头 12px；关闭向右、展开向下 |
| 拖拽手柄 | 20×24px；有展开按钮时紧邻其后，两图标中心距 18px；手柄后恢复 4px 内容间隔 |
| Checkbox | 复用现有 24×24px 控件画布及 16×16px 标记；不要压缩公共 Checkbox |
| Actions | 复用正式 IconButton；按需在 hover / focus-within 时显示，预留位置避免标题跳动；编辑确认/取消保持可见 |
| 前置图标 | 默认不加；有明确对象类型含义才展示；正式图标静态导入 |
| Rich 对齐 | 展开、Checkbox、Leading、手柄和 Actions 对齐标题第一行，不随整行高度居中 |
| 空间不足 | Meta 移到标题与说明下方，和标题左边缘对齐；Actions 保留首行右侧；由节点内容剩余宽度判断 |
| 容器 | Tree 本身不强制外包 Card，不自带固定页面宽度；审核稿的面板标题、边框、宽度属于示例组合 |

整树没有启用的功能不占位。不参与勾选的节点隐藏 Checkbox，但保留该 Checkbox 列所需空位；这与取消叶子展开占位是两个独立规则。其横线不得为了跨过空位而变长。

A 稿容器查询的 420px 是实施起点，判断对象是 Rich 内容区域，不是整页宽度；用实际中文长标题、标签、Meta 和操作验证，再保留满足审核布局的最小规则。

### 3.2 关系线：固定几何合同

- 默认隐藏；开启后是正式能力。必须覆盖实线和点线两种已审核表现，开启时默认细实线；线型变化不改变几何。
- 描边厚度 1px；横线全部 **12px**，不区分分支与叶子，不按标签宽度补长。
- 横线末端到展开按钮完整矩形、叶子首个内容/控件区域的左边界为 **4px**。
- 父节点向下的竖线从展开按钮完整矩形底部之后 **4px** 开始，hover / pressed 背景同样不得被线穿过。
- **2026-09-28 按用户新指令更新（见第 26 节）：** 每一级父节点的竖线贯穿其全部可见后代，包括末分支的后代；在该子树最后可见节点的首行锚点收尾，不把多个根节点串成一条线。
- 末节点竖线停止于横线锚点；Rich 横线对齐标题首行中心，不对齐整行中心。
- 搜索、折叠、插入、删除、移动之后，按当前可见结构重新判断末节点。视觉几何使用可见结构，勾选语义使用完整数据，两者不能混用。
- 背景在下、连接线居中、实际控件在上。层叠顺序不能代替间距计算，不允许用不透明补丁遮住交叉线。
- 关系线是装饰性结构提示，不截获鼠标、不成为焦点；层级含义由语义树提供。

下面是规范计算，不要求照抄视觉稿的 DOM。坐标相对于 Tree 行区域，根深度 `d = 0`，起始内边距 `P = 8`：

```ts
// 单位 px；几何来自人工审核通过的 A 稿。
const nodeStart = (d: number) => 8 + 24 * d;
const expanderAxis = (d: number) => nodeStart(d) + 8;
const incomingStart = (d: number) => expanderAxis(d - 1); // 仅 d > 0
const incomingEnd = (d: number) => incomingStart(d) + 12;
// nodeStart(d) - incomingEnd(d) === 4
const basicAnchor = (rowHeight: number) => rowHeight / 2;
const richAnchor = (paddingTop: number) => paddingTop + 22 / 2;
const outgoingStart = (anchor: number) => anchor + 24 / 2 + 4;
```

Basic 36/44 的锚点分别为 18/22；Rich 8/10/12 留白对应 19/21/23。禁止把所有密度硬编码为 18 或 21。Checkbox 的 4px 距离测到 24px 画布，不能把内部 16px 标记误作整个控件边界。

### 3.3 颜色与复用方式

| 角色 | 已审核表达 / 实施映射 |
| --- | --- |
| 主文 / 次文 | `Text/Neutral/1` / `Text/Neutral/3` |
| 极浅说明、非关键 Meta | `Text/Neutral/6`，审核稿 Light `#A0ACC5`、Dark `#6F7A9E` |
| 关系线 | `Border/Neutral/3`，Light `rgb(16 63 183 / 16%)`、Dark `rgb(194 212 255 / 10%)` |
| 表面 / 轻底 | `Background/Neutral/1` / `Background/Neutral/2` |
| 行 hover / 图标按钮 hover | `Fill/Neutral/Alpha/6` / `Fill/Neutral/Alpha/3` |
| 品牌操作 / 选中文字 | 既有 Brand 与 `Text/Brand/1` 语义 |
| 行选中底 | Light 审核值 `#EAF2FF`，复用现有 selection-item；Dark 审核值 `#203065` 对应 `Fill/Brand/Solid/4`，必须做 Tree 局部主题映射，不能假定同名 Category 的 Light 值也相同 |
| 搜索命中 | `Fill/Brand/Alpha/3`，与行选中底保持区分 |
| 关键状态 | 沿用状态语义，如 `Text/Green/1`；错误、拒绝原因、保存结果不套极浅说明颜色 |

以上为角色映射，不允许在共享源码直接粘贴裸颜色。实现前按当前颜色资格合同登记 Tree 消费者；同值不代表用途已合规。

两项明确的验证任务：

1. 16×24 的展开按钮不属于现有公共 IconButton 正方形尺寸配方。用 Tree 专属 expander part、原生 button、正式图标与既有 Focus 规则实现，不改公共 IconButton 尺寸表。24px 高度不自动证明完整命中区和目标间距合格。
2. 审核稿的浅箭头与极浅说明存在对比度缺口。浅说明对白色的静态计算约 2.28:1，浅箭头也不能宣称达到必要控件对比度。视觉通过不等于无障碍通过；实施时分别记录实际颜色、表面、角色及测量结果。不得通过 `aria-hidden` 隐藏有意义文字、忽略失败或擅自改全局 Token 来“通过”。需要改变已审核颜色时，提交具体可读配方的局部对照；本次无需重新讨论整个视觉方案。

## 4. 数据与状态合同

### 4.1 一个数据模型，多个投影

工程约定：建立一次树索引，统一保存 key→node、parent、children、depth、sibling position；展开/筛选产生可见行列表；选择、权限、保存始终使用完整树索引。不要为搜索树、拖拽树和管理树各写一套父子关系算法。

最小类型意图如下，最终命名可随仓库惯例调整；这些是本计划拟议 API，当前不存在：

```ts
type TreeKey = string | number;
type LoadState = 'idle' | 'loading' | 'awaiting-data' | 'error'; // Tree 内部请求态，不放入权威节点数据
type CheckMode = 'cascade' | 'independent';
type SearchMode = 'filter' | 'locate';

interface TreeNodeRecord {
  key: TreeKey;
  title: string;
  children?: readonly TreeNodeRecord[];
  canHaveChildren: boolean;
  childrenComplete: boolean;
  selectable?: boolean;
  checkable?: boolean;
  checkDisabled?: boolean;
  draggable?: boolean;
}

interface CheckIntent {
  key: TreeKey;
  scope: 'node' | 'subtree';
  action: 'include' | 'exclude';
}

interface CheckState {
  directCheckedKeys: readonly TreeKey[]; // 显式来源，不含自动聚合父节点
  intents: readonly CheckIntent[];
}

interface MoveProposal {
  sourceKey: TreeKey;
  targetKey: TreeKey;
  placement: 'before' | 'inside' | 'after';
  nextParentKey: TreeKey | null;
  nextIndex: number; // 源节点移除后的目标兄弟序列下标
}
```

- 保留自定义字段适配入口，不把课程字段强塞进 `TreeNodeRecord`。丰富内容使用 renderer / slot，`title` 保留纯文本名称用于键盘定位和可访问名称。
- 数字 `1` 和字符串 `"1"` 必须按明确类型区分，不能简单 `String(key)` 造成碰撞；UI DOM ID 还需树实例前缀。
- 传入数据视为不可变输入。禁止原地修改消费者的 children、selectedKeys 或勾选集合。
- 结构不合法时报告精确节点/字段；不静默丢节点，不让某条交互路径单独接受非法结构。
- 权限函数出错默认拒绝该动作，反馈原因；不能因异常扩大权限。

### 4.2 分支、空分支与异步

`canHaveChildren` 表示可容纳子节点；输入的 `childrenComplete` 表示孩子数据是否完整；Tree 内部 `LoadState` 表示请求状态，数据不再同时传入另一份 loading/error。已加载空分支依然可以接收新增/拖入，但没有可展开内容时不显示空转的展开入口。未完整加载的分支显示展开入口并可发起加载。真正叶子没有展开入口，不能接收 inside。

字段适配器必须把旧 `isLeaf / hasChildren / children` 统一规范化。不得在渲染中当叶子、在拖拽中又当分支。成功返回空数组且宿主确认complete=true后显式进入loaded-empty，不重复请求；是否允许继续添加由业务能力决定。

规范化后的字段不允许含混：真正叶子 `canHaveChildren=false, childrenComplete=true`，非空 children 与 false 冲突时拒绝；声明完整的 children（包括空数组）为 complete=true；尚有未知孩子的分支为 complete=false。loaded-empty 是 `canHaveChildren=true + childrenComplete=true + children.length===0` 的派生描述，不是另一套枚举。leaf/branch 勾选范围按 `canHaveChildren` 判定，不按当前数组是否为空判定。

### 4.3 状态唯一来源

| 状态 | 所有者 / 约束 |
| --- | --- |
| expandedKeys | Tree 状态或受控宿主；搜索自动展开也写入同一来源 |
| selectedKeys | 行选择状态；不由 Checkbox、展开、搜索或焦点重置 |
| checkState | 一份包含直接勾选来源及意图的快照；checked/半选/结果列表是派生值 |
| focusedKey | 可见树的焦点定位；不等于选中 |
| query / searchMode | 宿主输入、Tree 呈现；不内置查询工具栏 |
| loading / error / request identity | 每个分支独立；不能由 children 是否为空猜测 |
| committed / draft / editorBuffer | ManageTree 三个不同层次 |
| dragging / target | 短暂交互态，提交提案前不改数据 |

受控值与 default 值互斥；有受控值必须有对应变更回调。回调发出建议新状态和动作原因；宿主未接受时不偷偷维持第二份长期状态。默认参数仅用于初始化，props 更新不重新覆盖用户操作。

勾选受控使用一个 `checkState` 快照，不把 checkedKeys 与 intents 做成可以分别回写的两条受控入口。`onCheckStateChange(nextState, result)` 一次交付完整状态；result 含当前 `checkedKeys / halfCheckedKeys / intents / incomplete`。普通直接已勾节点也保留明确来源，不把自动聚合出的父 key 重新解释成 subtree include。若兼容旧 checkedKeys 输入，必须在边界转换为完整快照，并禁止与独立 intents 混用。

建议公共入口分为六组：`data + accessors`、展开/选择/勾选状态、`search`、`loadChildren`、`dragAndDrop`、`renderers`。只为本计划真实能力提供参数，禁止暴露内部索引、像素坐标和事务实现细节。

### 4.4 拟议公开 API 与默认值

这些名字作为T0收口的工程草案；只可等价调整命名，不可在不同批次各自发明状态所有者。

| 入口 | 默认 / 合同 |
| --- | --- |
| `data`, `dataRevision` | data 必填、只读；dataRevision 标识一次数据会话/整体刷新，不因无关分支的正常合并使全部请求失效 |
| `accessors` | 标准字段免配置；适配提供 getKey/getTitle/getChildren/getCanHaveChildren/getChildrenComplete，保留原始业务对象；ManageTree 另由 adapter 提供不可变 withChildren/withTitle/createNode，禁止丢业务字段 |
| `expandedKeys / defaultExpandedKeys`, `onExpandedKeysChange` | 默认空；每次给出完整下一集合与 reason/key |
| `selectionMode` | `none / single / multiple`，工程默认 single |
| `selectedKeys / defaultSelectedKeys`, `onSelectedKeysChange` | 默认空；single最多一个；selectionMode=none不允许用户写入 |
| `checkable` | 整树开关默认 false；开启后检查每个节点的参与/可写资格 |
| `checkMode`, `nodeCheckable`, `checkedStrategy` | 工程默认 cascade / all / exact；nodeCheckable支持leaf/branch/custom；independent只允许exact |
| `checkState / defaultCheckState`, `onCheckStateChange` | 默认空来源/空意图；单一原子快照；结果投影不能回灌为新的用户意图 |
| `variant`, `density`, `richSpacing` | basic/rich；Basic默认compact36，可default44；Rich默认上下各10，可8/12；密度遵循局部Context |
| `selectionAppearance`, `showLine`, `lineStyle` | full / false / solid；selectionAppearance可inset，lineStyle可dotted |
| `search` | 可选 `{query, mode, matcher, matches}`，默认filter；无query不搜索；matches可接宿主命中key及已知祖先路径，组件验证其有效性 |
| `loadChildren`, `onChildrenLoaded` | 成对提供；首期前者成功返回完整孩子结果 `{children, complete:true}`，后者接收key/结果/requestId/dataRevision，由宿主合并；请求错误由Tree维护 |
| `dragAndDrop` | 默认不启用；启用后autoExpand/autoScroll默认true，接受canDrop/maxDepth；`onMove(proposal)`仅报告通过校验的建议 |
| `renderers` | title/description/leading/meta/actions/empty等；上下文提供node、depth、expanded、selected、checked、indeterminate、disabledReasons及明确动作，不交付可变内部索引 |
| `TreeHandle.reveal(key, options)` | Promise结果为 `{ok:true}` 或 `{ok:false, reason:'not-found'|'not-loaded'|'filtered-out'|'denied'}`；只在已知路径且选项允许时展开/加载，不搜索未知远程全树 |

`data` 始终是树结构的权威输入；“非受控”主要指展开/选择/勾选等视图状态，不另加第二份隐式结构缓存。普通页面、ManageTree草稿适配器都负责明确的数据回写。

## 5. 展开、行选中与可见节点

- 箭头只展开/收起；标题或行的非交互空白只执行行选择；不默认将行点击同时绑定展开和勾选。
- 提供 none / single / multiple 行选择；工程默认 single。多选采用逐项切换，不要求按修饰键；范围选择本期不做。
- Checkbox、拖拽、菜单、编辑器的事件不能冒泡触发行选择。支持整行选中外观，不意味着整行任意控件都执行相同动作。
- 方向键浏览只移动焦点；Enter 执行节点的明确默认行为，普通浏览为行选择；不借焦点移动偷偷改变右侧业务内容。
- 收起父节点前若焦点在后代，焦点回到父节点；隐藏的行选中和勾选保留。
- 删除或外部数据移除当前焦点节点时，依次回到同级后一个、前一个、父节点、首个可用根；没有节点则回到树容器/邻近操作入口。不能回到 document body。
- 暴露按 key 定位、展开祖先并聚焦的入口；失败返回原因，不把“未加载/不存在”视为同一种情况。

## 6. 勾选、半选与后续加载

### 6.1 可勾范围与权限

可勾范围保留 all / leaf / branch / 自定义。`checkable=false` 表示不参与此选择集合，Checkbox 隐藏；`checkDisabled=true` 表示可勾但当前不允许更改，显示禁用 Checkbox。两者不能使用同一 CSS 隐藏掩盖。

当前节点受限不截断遍历，其后代逐一按自身规则参与；整个子树受限只能由明确业务规则提供。仅禁止勾选时仍可展开、查看。外部传入的禁用已勾节点保持其状态，用户操作不能改写它。

区分两个集合：参与集合满足 `nodeCheckable` 且 `checkable`；可写集合是参与集合再去掉 `checkDisabled`。操作只修改可写集合，禁用节点的既有 checked 状态仍出现在实际已勾结果中；`checkable=false` 则退出集合。父级可操作全选/半选按可写后代汇总，避免一个无法取消的禁用项让父节点永久半选；禁用项如需展示另计已锁定选择。受限节点不截断遍历。

### 6.2 独立模式

只切换当前允许勾选的 key；父子不互相传播，后续加载不继承。结果输出为 exact；传入级联输出策略需在 API 边界拒绝或明确报错，不能只在测试中声明受限而运行时继续接受。

### 6.3 级联模式

- 勾选父节点作用于完整子树中的可操作成员，包含折叠和搜索隐藏成员；不为完成勾选强制加载整棵树。
- 不可勾/受限节点不是传播墙，也不是用户级联切换的写入目标。父节点聚合只依据定义为本轮可参与的成员；没有可参与后代时按当前节点自身状态处理，避免零分母把空分支判为全选。
- “全选/半选/未选”与“数据是否完整”分开：父节点的包含意图可以表示覆盖未来后代，数量只报告已知实际可勾数量。不能用当前已加载行数伪装全量总数。
- 用户明确排除某分支后，该分支后续加载不会继承祖先 include。
- 普通已勾叶子与子树意图合并投影，不能从空集仅按异步意图重建而丢失普通勾选。
- include/exclude 必须同时用于当前数据、后续加载和字段/权限变化；投影时仍消费真实可勾范围，不固定套用 all。

**工程约定：** 对同一目标的较新显式操作覆盖旧操作，更具体的显式后代规则优先于祖先规则。再次“勾选父节点”不自动抹掉其下显式排除；用户直接勾选被排除的分支时解除该分支本身的排除，仍保留下方其他显式排除。“取消父节点”先清除该子树内旧的可写直接include/勾选来源，再建立subtree exclude，不改其他分支或禁用既有状态。之后主动勾选一个后代，可以建立更具体的新include以恢复该范围。用规范化意图集合表达最终意图，不保留无限事件日志。

取消祖先时，还须清除覆盖可写后代的旧subtree include，即使该意图锚点后来变成禁用。禁用节点自身的既有checked单独保留，不能连同其整支继承意图一起冻结而导致可写后代重新勾上。

必须得到一致结果：勾子→取消父→加载，子不会因旧include复活；排除父→主动勾子→加载，只有重选范围继承；排除孙→重勾父，孙仍排除。当前渲染与后续加载都用同一规则，不能先全选、下次加载又恢复排除。

输出策略保留 exact / all / highest-parent / leaf 等业务视图，但它们只是序列化，不反向替换完整内部勾选真值。提供已加载 checked keys、half-checked keys、意图以及未加载覆盖标志；宿主使用最高父级结果时仍能保留后续继承语义。

### 6.4 数据变化后的稳定性

搜索与折叠不改变勾选。异步增加子节点根据既有意图继承；数据删除只清理已确定删除的 key，不把“尚未加载”当删除。权限变化重新计算可操作集合，不能扩大已被排除的范围。

拖动只移动当前节点及子树，不将勾选集合当作拖动对象列表。按 key 保留被移动节点的勾选语义；旧/新父节点的半选等派生状态可以重算。跨 include/exclude 边界移动时，不因新位置自动勾选或取消已存在节点；必要时把移动前的有效意图归一化到移动分支。此处是工程规则，必须用回归用例证明；不靠复制整个选中父分支来移动。

## 7. 搜索规则

| 事项 | 筛选型（默认） | 定位型 |
| --- | --- | --- |
| 内容 | 命中节点及祖先路径；保留原顺序 | 保持完整目录，高亮并定位命中 |
| 展开 | 查询变化时展开命中祖先路径 | 定位命中时展开其祖先 |
| 用户折叠 | 允许，立即生效；同一查询不在每次渲染时强制展开 | 允许 |
| 清空查询 | 保留搜索结束时展开状态 | 同左 |
| 拖拽 | 查询生效期间暂停 | 按原权限保持可用 |
| 选择 | 已有行选中、勾选不清空 | 同左 |

- 自动展开是在查询变化/定位命中时执行的状态更新，不是渲染阶段永久覆盖 `expandedKeys`。异步结果晚到时不得再次强开该查询下用户已手动折叠的路径。
- 查询改变可以重新计算新查询的自动路径；结束后不恢复搜索前快照。
- 空白查询按无搜索处理；匹配依据是纯文本标题或宿主 matcher，默认不擅自搜索说明、Meta 或拼音。
- 高亮以安全文本片段渲染，不拼 HTML。计数区分实际命中与附带祖先；无结果使用 Empty。
- 筛选型父节点勾选仍覆盖完整子树；页面在需要批量操作时解释“包含当前未显示的后代”，不把结果集合当作勾选范围。
- 本地搜索只匹配已拥有的数据；远程搜索结果/命中路径由业务提供。不得为了查询静默遍历加载整棵树。
- 查询输入属于宿主。现有SearchInput是按钮/Enter/清空的显式提交；需要逐字筛选时接Input的onValueChange，不暗自改变公共SearchInput行为。

## 8. 加载、错误、取消与空态

工程 API 建议 `loadChildren(key, { signal, requestId, dataRevision }) -> Promise<{children, complete:true}>`；Tree发请求，通过 `onChildrenLoaded(key, result, requestContext)` 交付结果，宿主合并回权威data及childrenComplete。Tree只持有请求状态，不把返回children私藏为第二份可见数据。宿主尚未回写时为awaiting-data，不伪称结构已加载完成，也不在每次render自动重发请求；请求错误、被替代或结果未接入均有可观察状态。首期loader成功必须返回完整孩子列表；complete=false为不满足协议的结果，保留已有数据并反馈，不隐式设计load-more分页协议。输入数据仍可以childrenComplete=false表示尚未完整的分支。

请求有效性由树实例、dataRevision和每分支requestId共同判断；整体换数据/刷新会话使旧会话失效，单分支刷新使该分支请求失效。无关分支合并不使其他有效并发加载作废。

1. 未加载分支展开后进入 loading，同一分支未完成的请求只保留一个；其他分支继续可操作。
2. 失败保留原节点、展开状态和用户选择，提供就地轻量重试入口；这是加载反馈，不是 ManageTree 校验错误汇总。
3. 重试沿用节点身份，创建新请求编号。旧请求、已删除节点、旧数据版本和已卸载实例的结果不得回写。
4. AbortSignal传给业务。工程默认收起后请求继续，结果由onChildrenLoaded写回宿主，完成后不强行展开；Tree仅维护请求/等待回写状态。删除/替换树/卸载必须取消或忽略。
5. 显式刷新使对应分支结果过期，保留仍存在的展开/选择 key；不因刷新清空全部树状态。错误时已有可用 children 继续显示。
6. 空数组是成功加载，不显示错误；整树空、搜索无结果、整树加载失败和节点加载失败分别表达。
7. “加载完成/失败”通过状态区播报，避免每个 loading 动画帧重复播报。

不新增隐式 TTL、跨页面缓存或分页协议。宿主需要分页时必须提供明确数据完整性信息；未知后代与完全加载不可混称，组件不可宣称未实现的分页能力。

## 9. 拖拽与键盘移动

### 9.1 共同约束

- 仅专用手柄启动，标题点击不启动；只移动源节点及其子树。
- before / inside / after 三种落点；inside 放在目标孩子末尾并展开目标。
- 拒绝自身、自己后代、真叶子 inside、无移动权限、禁止接收、超最大深度和业务规则拒绝。最大深度校验包含被移动子树的最深后代，不只计算根节点。
- 源子树未完整加载时，不得仅凭已加载深度允许移动。缺少可验证的完整结构或业务完整子树计划时，拒绝需要这些信息的移动并保留原数据；不把当前浏览投影视为完整子树。
- 同父移动时按先移除源节点、再计算目标下标；原位 no-op 不产生 changeset。
- Tree 仅产生合法 `MoveProposal`；ManageTree 再次检查当前草稿权限和结构并应用。落下前数据版本变化时重新校验，不能应用基于旧位置的提案。
- 插入线、内部接收背景、拒绝原因互相区分；拒绝目标不能只显示红色无文字说明。
- 操作后保留源 key 的选择、勾选和焦点；不自动删除无关状态。单个节点移动不变成批量勾选移动。

### 9.2 自动展开与滚动

两项默认开启。实施起点（工程值，可据实际体验调整）：悬停有效折叠分支 600ms 展开，离开/更换目标立即清除旧定时器；滚动边缘区 32px，按距边缘的接近程度在 0–480px/s 范围平滑滚动。按真实帧间隔计算位移，不按固定帧数假设。

只滚动树所属滚动容器；停止拖动、离开边缘、失效目标、卸载后停止定时器和 animation frame。异步分支展开走同一加载路径。reduced-motion 下不做额外过渡动画，仍保留必要滚动定位。

这些数值不是此前用户确认的视觉 Token，也不应先扩成多个公共配置轴；功能开关保留，内部参数集中定义并实测。

### 9.3 键盘等价路径

必须有可操作的键盘移动流程，不能把方向键浏览算作键盘拖拽完成。

工程方案：通过当前行操作入口进入手柄，Space/Enter 开始移动；上下选择目标行，左右在 before / inside / after 中切换合法落点；Enter 确认，Escape 取消。读屏播报源节点、目标、位置和拒绝原因；移动模式不触发普通展开、选择或文本编辑。取消不改数据并返回源节点。

菜单中的“移动”可调用同一提案模型作为补充入口，不单独实现第二套校验。触屏拖动继续留在后续范围。

## 10. ManageTree：编辑、草稿与保存

### 10.1 三层数据及状态转换

`committed` 是最近一次服务端/宿主确认的树；`draft` 是本轮管理事务；`editorBuffer` 是当前标题尚未确认的输入。三个对象不能共用可变引用。

默认管理事务基于完整管理结构。远程未完整结构只能由业务适配器提供完整范围校验及原子服务端语义；没有可靠适配器时拒绝相应结构操作，不能把浏览时的部分数据提交成“完整树”。本计划不新增通用远程编辑协议。

| 状态 | 可做事项 | 离开规则 |
| --- | --- | --- |
| view | 浏览、搜索、选择；按权限进入管理 | 进入后建立 committed 的草稿 |
| edit-clean | 编辑、新增、删除、移动 | 无修改退出直接离开 |
| edit-dirty | 同上，保存/放弃 | 有修改退出必须确认 |
| validating / saving | 保留浏览上下文，锁定会改草稿/重复提交的入口 | 成功退出；失败回到保留草稿状态 |
| save-error | 修正、重试、放弃 | 不清空草稿 |
| conflict | 继续查看/保留本地；选择加载最新版 | 确认放弃后才替换为最新版 |

dirty 包含有效 changeset 和未确认输入差异；把字段改回原值、取消临时节点、往返移动恢复原位置后允许归为 clean。没有逐步撤销/重做栈。

### 10.2 标题原位编辑

- F2 或编辑动作进入标题位置的 Input；一次只有一个活动编辑器。
- Input 输入只更新 `editorBuffer`。Enter（非 IME 组合中）或确认按钮触发校验，校验成功才将字段写入 draft；失焦不确认、不退出；Escape/取消撤回当次字段输入。
- 空值、长度、同级重名、自定义同步/异步校验复用同一管线。较早异步结果不能覆盖较新的输入。
- 校验失败使用轻量 Message，说明节点及具体原因，保留输入和焦点；不增加错误汇总、持续就地报错块或点击定位面板。
- 切换到另一个编辑目标、删除当前编辑节点或执行结构移动时，不能隐式保存当前输入。工程默认有未确认修改时提示先确认或取消，保持当前编辑器；没有修改可直接切换。
- 点击整体保存时仍有未确认字段修改，提示“请先确认或取消当前标题修改”并聚焦编辑器；不把整体保存当作默认的字段确认按钮。
- 可配置业务弹窗编辑器，但其确认只更新 draft，之后仍需整体保存；使用既有 Dialog 语义、焦点约束和返回。

### 10.3 新增、删除与 changeset

| 动作 | 规则 |
| --- | --- |
| 新增同级 | 当前节点之后；同级位置按当前完整草稿确定，不按筛选行下标 |
| 新增子级 | 当前节点孩子末尾，展开父节点 |
| 新增根节点 | 根列表末尾；沿用相同权限和编辑流程 |
| 新节点 key | 本轮唯一临时 key，不使用数组下标；取消未完成新增则移除临时节点及相应临时状态 |
| 删除 | 业务提供实际影响范围并确认后，立即从 draft 移除；整体保存前 committed 不变 |
| 子树不完整的删除 | 业务提供可验证的完整删除计划/后端语义；不足则拒绝并保留草稿，不得把已加载后代数假装实际总数 |
| 迁移后删除 | 迁移与删除属于一个草稿事务；失败全部不生效 |
| changeset | 合并重复 update、抵消恢复原值、合并移动；新增后删除抵消；删除父节点清理已删除子树内失效 add/update/move，保留已合法迁移到删除范围外的节点及有效变更 |

活动编辑字段不计入已确认 changeset，但计入退出时的 dirty 判断。临时节点取消后焦点返回新增入口或相邻有效节点。

### 10.4 保存协议

拟议宿主接口承接：`save({ draft, changeset, baseRevision, signal })`。成功必须给出完整 canonical tree、新 revision、必要的临时 key 映射，并明确原子成功；拒绝部分成功作为成功状态。

执行顺序：检查未确认输入 → 锁定并建立不可变提交快照、版本与请求身份 → 校验同一快照 → 调用宿主保存同一快照 → 校验响应身份和结构 → 原子替换committed/draft及界面key快照 → 清理事务并退出编辑 → 最终浏览态渲染完成后恢复有效节点焦点/滚动锚点 → Message提示成功。校验期间外部版本变化使此次提交失效，不能用旧校验结果保存新草稿。

- 防重复提交；保存期间不要继续接受结构/字段变更。导航离开不能仅凭 AbortSignal 就宣称服务端已回滚，结果不明时保留草稿并让宿主核对版本。
- 失败保留草稿、changeset、编辑模式与上下文；可重试。网络错误、业务拒绝、版本冲突分别表达。
- 忽略已失效请求的成功/失败，避免旧响应覆盖新会话；幂等键绑定不可变提交快照，同一快照重试复用，修改草稿后的新提交使用新键，不能把编辑会话ID直接当所有请求的幂等键。
- 服务端 key 映射同时覆盖 expanded、selected、checked/intents、focused 和滚动锚点；canonical tree 中被删除的 key 有明确回退。
- 映射必须由当前权威状态源原子接受，受控宿主也要回写映射后的视图快照；不能只改ManageTree私有模型，而子Tree继续消费旧props/default值。必要keyMap缺失或多个有效临时key映成同一正式key时拒绝响应并保留草稿；重渲染后检查真实DOM焦点。
- 成功退出后保留展开、行选中和滚动上下文；用稳定锚点 key + 相对偏移恢复，不能只恢复可能已不匹配的数组索引。

### 10.5 退出与冲突

无修改直接退出。有草稿或输入变化时，确认框只有明确的“继续编辑 / 放弃修改”等对应动作；取消关闭等价继续编辑。

冲突时保留本地 draft，不自动覆盖、不自动合并。提供可操作的“保留草稿”和“加载最新版”入口；后者先确认放弃。工程默认在最新版成功获取后才原子替换本地数据，拉取失败继续保留草稿。不能只有一段冲突文本而没有实际恢复动作。

### 10.6 Message、菜单与配套组件

当前没有公共 Message/Toast。ManageTree 通过宿主 `onFeedback({ intent, message })` 表达提示，示例适配既有 G2 Toast 的具名局部配方；按来源与样式依赖复制最小必要内容，不能从 UI 包反向导入 Prototype 页面，也不在 Tree 内新建全局通知队列。

Dialog、DropdownMenu、Input、Checkbox、Tag、Tooltip 等从已存在的正式入口复用。菜单和弹窗一次只保持一个活动层，关闭后返回有效动作入口。超过直接动作数量的操作进入更多菜单；业务渲染器不能让重要操作只剩鼠标 hover 才能访问。

### 10.7 ManageTree 拟议适配接口

| 入口 | 合同 |
| --- | --- |
| `data`, `revision` | 已提交完整结构与版本；dirty期间外部新版本不直接替换draft，进入冲突处理 |
| `mode / defaultMode`, `onModeChange` | view/edit，默认view；受控时成功退出也必须由同一宿主接受 |
| `treeOptions`, `viewState`, `onViewStateChange` | 组合Tree的呈现和视图状态；ManageTree拥有编辑期间结构data，不能被另一个treeOptions.data覆盖；保存key映射通过一次完整视图快照交付 |
| `adapter` | createNode、withTitle、withChildren、权限查询、validateField/validateTree、planDelete；保留领域字段、不扩展Tree的业务分支 |
| `onSave` | 接收不可变提交快照/changeset/baseRevision/signal；返回完整treeData/revision/keyMap或明确失败/冲突 |
| `loadLatest` | 冲突时取最新版，不在用户确认放弃前替换当前事务 |
| `onFeedback` | 必填提示接入，显示轻量Message；不让“没有宿主实现”导致校验静默失败 |
| `renderEditor`, `renderActions` | 默认原位标题Input；允许业务弹窗、其他字段或操作组合，但确认仍先写draft，沿用相同权限/校验/焦点规则 |

默认管理视图状态由ManageTree持有并传给受控Tree；高级宿主若接管，必须原子回写映射后的完整viewState。没有保存或权限适配器的示例须明确标记本地模拟，不把按钮空壳写成已完成事务。

## 11. 键盘、语义与焦点验收

树的角色、层级、展开与焦点模型参考 [WAI-ARIA Tree View](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)；虚拟或不完整 DOM 显式提供层级/兄弟位置，参考 [Declared Properties 示例](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-1b/)。以下包含 Rain 自身的交互约定，不把 APG 的可选项都变成必做需求。

| 操作 | Rain 规则 |
| --- | --- |
| Tab 进入树 | 进入记忆的可见活动节点；没有则当前已选可见节点或首节点；不把整棵树每行都加入 Tab 序列 |
| 上下 / Home / End | 在可见节点间移动焦点，不改行选中或勾选 |
| 左右 | 展开/收起、进入首个孩子、返回父节点；叶子不出现虚假 expanded 状态 |
| Enter | 普通行执行行选择/明确业务激活；Input 中确认字段；移动模式确认落点 |
| Space | 启用 Checkbox 时切换当前勾选；否则按行选择模式切换；不同时执行两种选择 |
| 字符定位 | 在可见节点名称中定位；输入框、编辑器、组合输入期间不截获 |
| 当前行操作 | 工程方案用 F6 进入当前行可用控件组，Tab 在该行真实控件间移动，组末正常离开树；Escape 返回节点；用可访问说明告知入口 |
| F2 | ManageTree 可编辑节点进入标题编辑 |
| Escape | 优先关闭当前最内层编辑/菜单/移动模式，避免一次按键同时丢掉整轮草稿 |

- 使用 tree / treeitem / group，提供树名与节点纯文本名称，说明按需关联；图标和关系线不重复朗读。
- 行选中与勾选有不同用途、不同外观、不同操作。语义采用 treeitem 的 selected 与原生 Checkbox 的 checked/mixed；不把同一个含义重复播报。需要在树上同时反映两种状态时，必须满足明确用途与独立操作，并做真实读屏验证。
- 仅限制勾选时把 disabled 放在 Checkbox，而不是把整个 treeitem 标成不可操作。
- 组件级生成实例 ID，保证两棵树复用同一批 key 时无重复 DOM ID；节点名称、children group、说明和编辑器关联有效。
- roving focus 与虚拟化共享一个 focusedKey；焦点即将进入未挂载行时先确保该行挂载，不能将焦点留在被卸载的 DOM 上。
- 输入法组合期间 Enter/Space/方向键不触发树级命令；原位 Input 文本选择和光标移动不得被树拦截。
- 使用现有 item/control/danger Focus Token，不能把变浅的 hover 当作焦点；forced-colors、缩放和 reduced-motion 独立检查。

F6 行内操作与键盘拖动为本计划的工程交互方案，需用实际浏览器和读屏验证。如果实现遇到可访问性冲突，只调整该交互路径并记录，不推翻已确认视觉。

## 12. 大树、深树与虚拟化

- 默认正常渲染；只有明确启用且提供正数视口高度、固定行高的 Basic 才启用固定虚拟化。
- Rich、换行 Meta、动态错误说明、原位编辑导致的变高，不能偷偷放进固定行高虚拟化。首期选择非虚拟渲染或明确固定布局约束，并在 API 边界给出说明。
- 固定模式按 flatten 后的可见行计算窗口和 overscan；只挂载必要窗口，保留总高度、键盘定位及滚动锚点。连接线按逻辑祖先延续，不依赖 offscreen 父节点仍在 DOM。
- 深层缩进仍为 24px，不擅自压到 16px 以塞入窄栏。普通 320px 示例必须能正常使用；极深树的内部最小内容宽度和横向滚动由容器承接，不能把页面整体撑宽。Basic 截断提供完整名称提示，不能让操作区消失。
- 以 1,000 和 10,000 个 Basic 节点、至少 15 层结构做工程规模样例，记录机器/浏览器、可见节点数、DOM 数、展开/搜索/定位耗时；这是测量档位，不是已承诺的性能成绩。
- 不做数据变化时全树多次重建、不在每行重算整棵子树。只对实际输入变化重建索引，受影响祖先重新计算聚合。没有证据时不增加通用 worker 或缓存框架。

## 13. 源码组织、复用与文档交付

以下路径相对于当前 `.worktrees/card-v2`。除明确标注的现有文件，均为实施时拟新增；本文没有创建这些实现。

| 路径 | 作用 |
| --- | --- |
| `packages/ui/src/tree/tree.tsx` | Tree 根、状态组合与公开入口 |
| `packages/ui/src/tree/tree-node.tsx` | 内部节点 Parts；不单独登记 TreeNode 家族 |
| `packages/ui/src/tree/tree.types.ts` | 最小数据、状态、回调和 renderer 类型 |
| `packages/ui/src/tree/tree.model.ts` | 索引、可见投影、分支统一判断；不另建泛化 behavior 包 |
| `packages/ui/src/tree/tree.selection.ts` | 勾选、意图、半选与结果序列化 |
| `packages/ui/src/tree/tree.move.ts` | 合法提案和完整子树深度校验，鼠标/键盘共用 |
| `packages/ui/src/tree/tree.css`、`tree.css.d.ts` | 组件作用域布局、连接线、必要主题映射 |
| `packages/ui/src/tree/tree.test.tsx`、`tree.model.test.ts`、`tree.selection.test.ts`、`tree.move.test.ts` | 按风险领域覆盖行为；不测试实现私有变量 |
| `packages/ui/src/tree/README.md` | Anatomy、API、组合限制和示例 |
| `apps/playground/src/patterns/manage-tree/manage-tree.tsx` | 独立管理 Pattern 候选，组合公共 Tree/UI |
| 同目录 `manage-tree.types.ts`、`manage-tree.model.ts`、`manage-tree.save.ts`、`manage-tree.css` | 缓冲/草稿与事务；仅在职责需要时拆文件，不逐操作建一层服务 |
| 同目录 `manage-tree.test.tsx`、`manage-tree.model.test.ts`、`manage-tree.save.test.ts`、`README.md` | 编辑/事务/恢复和消费说明 |
| `apps/playground/src/docs/components/tree-page.tsx`、`tree-page.css` | `#tree`：审核四场景及关键交互夹具 |
| `apps/playground/src/docs/components/manage-tree-page.tsx` | `#manage-tree`：真实可运行的草稿和保存模拟流程 |
| `tests/e2e/tree.spec.ts`、`manage-tree.spec.ts`、`tree.config.ts` | 浏览器与几何/焦点验收；配置复用当前专项约定 |
| `manifests/ui/tree.yaml`、`manifests/patterns/manage-tree.yaml` | 实现存在后登记 candidate，记录依赖与 Parts |
| `registry/tree.json`、`registry/manage-tree.json` | 后续本地源码交付记录；不是发布操作 |
| `evidence/runtime/tree/verification.md`、`evidence/runtime/manage-tree/verification.md` | 按批次记录实际结果、失败和未运行项目 |

ManageTree 先沿用现有 `apps/playground/src/patterns/` 存放可复制 Pattern 源码，不为了一个候选先新建空 `packages/patterns` 包。公共 UI 禁止反向依赖此目录。后续若确实需要跨应用包导入，再在 Pattern 成熟时迁移，不改变其身份。

ManageTree复用Tree的模型需有合法出口：只通过 `packages/ui/src/index.ts` 导出本期确实共用的 `validateTreeMove / applyTreeMove` 和类型，输入为规范数据/提案/能力规则，输出为校验结果或不可变新树。内部索引保持私有，Pattern禁止深导入 `packages/ui/src/tree/*`；Registry携带实际依赖源文件，不再实现一套移动算法。

现有接入文件：`packages/ui/src/index.ts`、`packages/ui/src/styles.css`、`apps/playground/src/app.tsx`、`apps/playground/src/docs/components/core-ui-page.tsx`、`core-ui-page.test.tsx`。按真实入口需要逐个修改，不顺手重构文档路由。

追踪属性至少有 `data-rain-id="ui-tree" / "pattern-manage-tree"`，以及稳定的 `data-slot`、variant/density/state。节点 key 不包含私有业务文案，不能把 CSS 类当长期测试身份。

正式图标从 `@rain-next/ui/icons/<slug>` 单入口引用，遵守 [图标规范](../ai/icon-selection.md)；不能从视觉稿复制 base64 mask、重画 SVG 或导入整个图库。Tree CSS 的复杂连接线规则按 B2 例外登记，颜色仍受 Token 合同约束。

架构记录见 [Tree/ManageTree所有权ADR](../adr/0011-tree-and-manage-tree-ownership.md)。正式实施时颜色消费者登记在 `scripts/token-foundation-outputs.mjs` 的事实源，按现有生成链路运行 `pnpm generate:tokens` / `pnpm verify:tokens`，不手改生成消费者清单或借此新增全局颜色。`docs/ai/asset-index.md` 同样由 `scripts/asset-index.mjs` 生成，禁止手改。

## 14. 实施批次与停止条件

每批独立交付最小可审阅结果；先补关键失败案例，再实现，再运行定向检查。不会每写几行要求一次用户决定，也不会把未来文件创建成空壳。

### T0 · 冻结依据并完成技术接入校准

文件：本文、`status/current-phase.yaml` 的 Tree 独立条目、`evidence/runtime/tree/verification.md`（实施开始时创建）。

1. 核对实际工作树和 dirty 快照，不处理无关修改。
2. 登记本轮实施范围、Tree UI / ManageTree Pattern 身份、A 稿来源和当前 API 草案；落实 `docs/adr/0011-tree-and-manage-tree-ownership.md` 的纯模型出口和expander边界。
3. 核对色彩角色、16×24 expander、自有行内焦点与现有原语接入；给出浅色对比度的实际测量和局部解决候选。
4. 不安装 Tree 行为依赖；只有原生和现有基础确实无法覆盖已确认需求时，才写具体选型差异与版本，再进入对应授权。

退出条件：不存在会导致重画已通过布局的未说明冲突；尚未解决的对比度等问题有明确登记，不冒称已通过。

### T1 · 数据、节点与 A 版几何

文件：Tree model/types/node/root/CSS、`tree.model.test.ts`、`tree.test.tsx`、`tree-page.tsx`。

1. 写重复 key、循环、空分支与数字/字符串 key 区分测试，运行并确认当前失败。
2. 实现统一索引和 Basic/Rich Parts；接正式图标、Checkbox、IconButton；连接线按第 3 节计算。
3. 加默认无关系线和开启实线/点线的四组审核场景，覆盖36/44与Rich三档留白。
4. 浏览器实测横线长度、完整按钮前后间距、首行锚点、深树与320px；只调整不符合规则的部分。

退出条件：A 稿几何可重复验证，不再出现按钮重叠或叶子展开空位。

### T2 · 展开、选择、搜索与可访问操作

文件：Tree root/model/测试、Tree 文档页、`tests/e2e/tree.spec.ts`。

1. 写展开/选择独立、Checkbox事件隔离、隐藏状态保留、搜索清空不恢复快照、双实例 ID 的测试。
2. 实现受控/默认状态与筛选/定位；接可见焦点和原生文本高亮。
3. 实现方向键、首尾、字符定位、行内控件入口及 IME 保护。
4. 用鼠标、键盘和至少一个真实读屏组合检查；无法执行的组合明确记未运行。

退出条件：清空搜索不丢状态，操作区可通过键盘到达，焦点不会落到被隐藏节点。

### T3 · 级联、意图与异步

文件：Tree selection/model/root及测试；文档页异步夹具。

1. 先复现普通已勾叶子 + 异步父节点后加载时丢失选择、branch-only 越界两个旧缺口。
2. 完成级联/独立、半选、权限遍历和结果输出；用统一意图合并新增数据。
3. 补部分加载父节点的未来继承、明确排除分支、请求过期、空结果、失败重试和刷新。
4. 重跑T2搜索隐藏勾选案例，验证受控宿主回写而非组件偷偷覆盖数据。

退出条件：选择意图在加载、过滤和权限变动后稳定，未加载数量不被虚报。

### T4 · 鼠标拖放与键盘移动

文件：`tree.move.ts`及测试、Tree拖动状态、浏览器用例。

1. 先写自身/后代拒绝、空分支接收、同级下标、完整子树深度、跨权限边界和 no-op 用例。
2. 接 before/inside/after、自动展开与边缘滚动；统一提案，不直接修改数据。
3. 接键盘移动与播报；检查Esc取消、加载目标、拖动中数据更新与搜索模式变化。
4. 实测源子树移动且勾选集合不作为拖动集合；清理所有定时器与滚动回路。

退出条件：鼠标和键盘均可完成相同合法移动，非法移动不会写入草稿。

### T5 · ManageTree 草稿、编辑与原子保存

文件：`apps/playground/src/patterns/manage-tree/`、管理文档页、`manage-tree.spec.ts`。

1. 写输入不改draft、blur不提交、Enter确认、Esc撤回、临时新增取消、dirty退出等测试。
2. 实现缓冲/草稿/committed及规范化changeset，接增删改移、权限和Message适配。
3. 补成功退出、失败保留、冲突恢复、迟到响应、完整canonical响应、临时key映射与滚动恢复测试。
4. 增加章节—知识点、章节—学习任务两个可操作夹具；章节不要求taskType，真正任务才校验；迁移后删除保持原子。

退出条件：用户输入不会因失焦、保存失败或冲突丢失；模拟保存全过程可实际操作，不只显示工具栏。

### T6 · 固定高度大树与组合回归

文件：Tree窗口化所需最小实现、Tree浏览器用例、规模夹具。

1. 验证固定Basic开启条件；拒绝/明确回退不符合条件的动态高度场景。
2. 连接窗口化、定位与关系线逻辑；保证离屏祖先、末兄弟线与焦点恢复正确。
3. 运行规模与深树测量，记录结果；测试缩放、窄容器和内滚动，不宣称未测性能。
4. 回归Rich普通渲染、管理编辑、异步和搜索。

退出条件：大树模式有证据，Rich不会因错误窗口高度而重叠或漏行。

### T7 · 合同、文档、独立复核与最终交付

文件：Tree README、ManageTree README、manifests、registry、本轮status记录、各自verification。

1. 文档覆盖全部已实现API、默认值、禁用范围、搜索与级联、异步意图、编辑时机及组合反例。
2. Manifest只指向真实存在文件，记录 `rewrite-from-rain`、来源、保留/重设/不继承内容；候选成熟度与 publication 独立。
   通过 `node scripts/asset-index.mjs --write` 更新生成索引，并用 `--check` 核对；只让真实完成的资产进入相应候选发现入口。
3. 运行定向质量检查，独立复核关键状态和数据丢失路径；修复本轮重要问题后只重跑相关检查。
4. 展示实现与已批准视觉的对照、功能证据及剩余问题。实现侧验收不能冒用设计稿的通过记录；已经通过的设计方向不重复提问。

退出条件：本计划验收矩阵可逐项追溯到当前证据；没有靠“待后续”隐藏本期核心功能。发布、Figma和真实业务接入保持独立。

## 15. 核心验收矩阵

| ID | 必须验证的场景 | 通过条件 |
| --- | --- | --- |
| V01 | 有线/无线，实线/点线 | 开关不挪动节点，横线全部12px |
| V02 | 分支按钮hover/pressed、叶子、Checkbox | 到完整按钮/控件区域4px；竖线下方4px；不以图标轮廓测量 |
| V03 | Basic36/44、Rich三密度与多行 | 24px统一缩进，正确首行锚点，无覆盖/断线 |
| V04 | 深层、最后兄弟、折叠、搜索后结构 | 祖先线/末节点L形正确，无孤立线 |
| V05 | 320px、常规、200%缩放、深树内滚动 | Meta下移左对齐，页面不横向溢出，重要操作可达 |
| V06 | 字体、极浅辅助、状态、Focus、两主题 | 来源与消费者可追溯，对比度真实报告，不以视觉通过替代 |
| S01 | 行选中+勾选+焦点同时存在 | 任一操作不误改另两者 |
| S02 | 不可勾/禁用当前父节点，后代允许 | 显示区别正确，后代仍可参与 |
| S03 | 普通叶子N + 已含部分孩子的异步父L | 新孩子加载后N不丢；L的未来继承有效 |
| S04 | include祖先 + exclude分支 | 后续加载不穿过显式排除；重新勾选排除分支可恢复 |
| S05 | leaf-only / branch-only / 自定义 | 普通操作和异步投影使用同一参与集合 |
| S06 | 独立勾选 + 非exact输出 | API边界明确拒绝，无父子传播 |
| S07 | 勾子→取消父→加载；排除父→重勾子；排除孙→勾父 | 当前与后续投影一致，不发生旧意图复活 |
| S08 | 已勾分支变禁用后取消祖先；受控回写 | 禁用自身保留、可写孙节点取消且不复活；原子接受checkState |
| Q01 | 筛选中勾父、清空查询 | 隐藏后代按完整子树参与；展开保持搜索结束状态 |
| Q02 | 同一查询下手动收起，异步晚到 | 不被每次render或晚到结果反复强开 |
| L01 | 加载失败→重试，旧响应晚到，空数组 | 状态明确，旧结果不覆盖新数据，空数组不循环加载 |
| D01 | 同级/跨父/inside/深子树/空分支 | 下标正确、权限和最大深度一致 |
| D02 | 拖动已勾集合中一个节点 | 只移动源子树；其余勾选不成为移动对象 |
| D03 | 筛选/定位搜索、hover展开、边缘滚动 | 暂停/允许正确；结束后无悬挂timer或继续滚动 |
| D04 | 完整键盘移动→确认/取消 | 与鼠标同一校验，播报正确，焦点返回 |
| M01 | 输入→失焦→Enter / Esc / IME | 输入不提前改draft，确认与撤回符合约定 |
| M02 | 活动字段未确认时整体保存/切换目标 | 不静默确认或丢输入，提示和焦点正确 |
| M03 | 新增同级/子级→取消，新增/修改/移动后代→删除父，整体取消 | 顺序正确；失效add/update/move清理；committed可恢复 |
| M04 | clean退出、dirty退出、改回原值 | 仅真实有修改时确认放弃 |
| M05 | 保存成功/失败/冲突/过期响应 | 原子状态更新，失败保留，冲突先确认后加载 |
| M06 | 服务端返回临时key映射，受控/非受控，缺失/冲突映射 | 状态与真实DOM同步迁移；非法响应保留草稿 |
| M07 | 章节/知识点/学习任务、迁移后删除 | taskType只约束任务，业务事务不可部分成功 |
| A01 | 双实例同key、键盘操作、读屏 | ID唯一，状态含义清楚，行内操作可达 |
| P01 | 固定大树、Rich非固定、离屏定位 | 无错误行高，焦点不卸载丢失，关系线连续 |

## 16. 实施时的验证命令与证据

下面命令在 `.worktrees/card-v2` 执行；新增测试文件和专项配置完成后才有意义。本轮仅核对命令入口，**没有运行或宣称这些未来测试通过**。

```sh
pnpm exec vitest run packages/ui/src/tree
pnpm exec vitest run apps/playground/src/patterns/manage-tree
pnpm --filter @rain-next/ui typecheck
pnpm --filter @rain-next/playground typecheck
pnpm --filter @rain-next/playground build
pnpm exec playwright test --config tests/e2e/tree.config.ts
pnpm verify:boundaries
pnpm verify:tailwind-b2
pnpm verify:tokens
pnpm verify:icons
pnpm verify:evidence
node scripts/asset-index.mjs --check
```

专项 Playwright 配置只匹配 Tree/ManageTree；使用独立空闲本地端口，未指定端口前不覆盖用户正在运行的服务器。浏览器交互优先按 role/名称定位，几何按 `data-slot` 测量。不得只截一张静态图就宣称拖动、保存或键盘完成。

受影响原语的回归根据实际改动选择 Checkbox/Input/DropdownMenu/Dialog 等；原则上不改其Master。全仓既存失败与本轮新失败分开记录，不为Tree顺手修一批无关文件。

证据记录至少包含：代码/文件指纹、执行命令、环境与宽度、实际用例数、失败、未运行项、截图/几何事实、人工读屏结果、候选对比度、审核范围。不把文档检查写成组件测试。

## 17. 设计方法与后续变更规则

本计划应用 [设计方法库](../ai/information-design.md) 中的 V04（弱说明不抢主标题）、V05（控件外观连同命中区和行为检查）、D02（关系线与节点的明确距离）、D05（长标题和窄容器重排）。本次特别检查完整按钮矩形，而不只检查箭头路径。

实施者可以调整内部文件划分、算法实现和局部响应式判断；不能自行改横线12px、缩进24px、叶子无展开位、4px避让，或回退到失焦提交/自动覆盖草稿等被明确替代的规则。确需变更时，给出精确触发条件、当前与候选效果、受影响范围，再处理该单点。

**本轮交付止于实施规则及视觉审核登记。下一步是按T0–T7执行组件建设；所有实现与验证状态按实际进度更新，不预先打勾。**

## 18. 本轮文档检查记录

- 完成新版接入与旧版核心逻辑的两条独立只读核对，并修正受控状态、禁用意图传播、不完整结构操作、请求结果回写和保存焦点恢复的衔接问题。
- 本地文档引用42处存在，Markdown围栏与空白检查通过；验收矩阵30个编号无重复；阶段YAML可由仓库既有解析器读取，Tree视觉通过与代码尚未开始分别登记。
- 审核稿存档与会话原文件逐字节一致，SHA-256与第0节一致；关系线规范公式已检查1–15层均保留4px横向空隙。
- 本轮没有运行未来组件的类型检查、构建、单测、浏览器或读屏验收；未新增React实现、依赖、公共Token或发布资产。

## 19. 运行态视觉反馈修订（2026-09-25）

应用 V04、V05、D02、D05：按 A 稿对照深层关系、主次文字、行内控件和窄容器。浏览器反馈暴露两处结构原因：祖先线投影到了当前节点轴而非父轴；Rich 的类型标签作为独立列使标题、换行和说明错位。现已修正轴投影，将标签并入标题，并由内容区容器决定 Meta 下移；示例类型标签复用正式 Tag 及既有类别 Token。

管理态将编辑确认/取消与普通行操作互斥，输入框不显示清空动作，IconButton 采用既有 24/14 配方和正式语义图标；删除确认改为绑定删除按钮的 Popover。验证覆盖 45 个专项单测、9 个浏览器场景、宽窄页面截图和 Playground 构建。截图位于 `evidence/runtime/tree/feedback-*.png`。Token 全仓校验仍因既有治理问题及 Tree 已登记的弱文字、弱图标与品牌用途问题失败；这不是对比度接受。实施画面仍待用户重新人工审核，不继承 A 稿本身的视觉通过状态。此次反馈没有产生超出 D02 已确认关系线案例的新通用方法。

## 20. 运行态视觉验收（2026-09-26）

用户确认：“确定。完成视觉验收”。本次通过范围为第 19 节修订后的 Tree／ManageTree 当前本地运行态代表性视觉，包括关系线、行内排布、原位编辑与删除气泡；证据见 `evidence/runtime/tree/feedback-rich-selected.png`、`feedback-manage-edit.png`、`feedback-manage-delete.png`。这关闭运行态视觉人工检查点，不替代对比度、辅助技术、实施计划其余功能、公共 Registry、Figma、发布或业务迁移验收。

## 21. 继续实施：核心交互与数据安全收尾（2026-09-26）

用户要求“继续推进tree组件”。本批在原 `card-v2` 工作树以 System Mode 继续 T2–T6：补齐异步请求回写、拖动中状态变化、键盘行内操作、大树焦点和 ManageTree 删除／保存边界，并添加相应可操作示例。范围限于 Tree、ManageTree、其文档页、专项测试与合同／证据；沿用已验收视觉及 V05、D02、D05，不修改全局 Token。

本批先复现失败路径，再执行定向单测、类型检查、浏览器交互／几何与构建。专项单测由基线 45 项增至 67 项，全部通过；生产构建上的 11 个浏览器场景通过。修复窗口滚动与焦点保留、异步并发与等待回写、空分支移动完整性、跨分支勾选意图、未完整子树删除、临时 key 冲突和保存版本恢复。独立复核提出的数据安全问题已修复并复查，限定范围没有未闭合 P1/P2。

Tree 页面新增两个按需展开的功能示例，覆盖异步／勾选／搜索拖拽和 1,000／10,000 节点、15 层目录。深树在 320px 容器内横向滚动到最深标题；性能记录来自生产构建的一次本机采样，不构成设备通用指标。详见 [Tree 运行证据](../../evidence/runtime/tree/verification.md)、[ManageTree 运行证据](../../evidence/runtime/manage-tree/verification.md) 和 [规模记录](../../evidence/runtime/tree/functional-scale-facts.json)。原视觉验收截图保持，续建截图另存。

本批没有把 T0–T7 整体标为完成。当时列出的后续工程项如下，其中第 1、2 项已由第 22 节完成：

1. T5：补齐 ManageTree 领域字段写入、自定义／弹窗编辑和 treeOptions；统一权限、草稿与显式确认。当前实现仅支持标准 TreeNodeRecord 和标题编辑。
2. T5：完成勾选意图／滚动锚点的保存 key 映射，以及章节—知识点、章节—学习任务和原子迁移后删除的可操作夹具；当前映射仅覆盖展开、选中、焦点。
3. T2／T6：真实读屏、200% 浏览器缩放和更多深层重复移动组合；当前仅有自动语义／焦点、强制颜色线条与生产大树案例。拟议 renderer 上下文和空态渲染入口尚未全部实现。
4. T0／T7：给出弱色的局部可读对照并处理其独立验收；全仓治理校验与资产索引仍受既存 frozen history、ui-command Registry 缺失及已登记 Token 用途／对比度问题影响，不能将专项通过写成全仓通过。

## 22. 领域编辑与保存上下文（2026-09-27，本批完成）

用户确认继续推进。本批以 System Mode 完成 T5 的领域字段读写、自定义编辑、删除迁移事务及完整视图映射，新增两个按需展开的业务示例。领域数据沿用标准节点的 source 保存原始对象，withTitle/withChildren 负责不可变回写，不增加第二套树索引。renderEditor 共享同一个编辑缓冲和显式确认路径；treeOptions 只开放呈现、搜索、勾选及拖动约束，不能覆盖草稿或视图状态所有者。保存时原子映射勾选意图和稳定滚动锚点。

修改限于 Tree 滚动接口、ManageTree、局部示例、专项测试与对应合同。沿用 V05（弹窗与键盘行为）、D02（已验收关系线）和 D05（窄容器）；不更改既有视觉或公共 Token。先以回归复现字段丢失、未确认编辑、部分迁移和临时 key 恢复问题，再运行专项单测、类型/构建和浏览器流程；真实读屏与 200% 缩放仍独立记录。

专项单测 8 文件、79 项通过，生产构建上的 13 个浏览器场景、UI 类型检查和 899 个正式图标完整性检查通过。两个示例覆盖章节—知识点、章节—学习任务的字段确认／取消、仅任务必填类型、先迁移后删除、模拟保存失败／重试、受控勾选与临时 key、树内稳定滚动恢复。窄屏用例暴露工具栏溢出，已让既有按钮换行；桌面外观保持。迁移事务只在完整有效结果生成后写入草稿，模拟保存也只提交完整快照，不把夹具当作真实后端验证。

独立复核提出的异步校验旧结构恢复、取消新增后的错误脏态、同时改标题与业务字段缺少 update、校验期间权限撤回四项问题均经先失败后通过的回归修复。复查范围内无未闭合 P1/P2。字段写入器必须配合 isSameNode 比较可编辑字段，避免领域子数组重建被误判成内容修改。保存／退出／加载最新版统一过滤无效视图 key，并映射 include/exclude 意图与滚动锚点。

本批证据见 [ManageTree 验证记录](../../evidence/runtime/manage-tree/verification.md) 和 [当前文件指纹](../../evidence/runtime/manage-tree/domain-facts.json)。原代表性视觉验收范围不扩大；新示例已做运行截图检查，未代替用户作出新的视觉验收。剩余工程为 Tree renderer 上下文／空态入口、更多深层重复移动、真实读屏／200% 缩放、局部可读对照和独立对比度验收，以及全仓既存治理与索引问题。T0–T7 整体仍未标记完成。

## 23. 拖拽接收目标的浅色提示（2026-09-27）

用户确认调整 inside 拖拽接收目标为「极浅蓝底色＋1px 浅蓝描边」，仅作用于目标行，内容保留原色。以 System Mode 修复共享 Tree；范围为接收指示层、对应 Token 消费登记、既有拖拽浏览器用例和本记录。应用 V01（小面积强调配合浅色区域）、V05（拖动反馈与内容同时可辨）。不改排序模型、同级插入线或全局 Token。

已定位当前 Fill/Brand/Alpha/1 为 85% 深蓝，且指示层在内容之上。改用现有 Fill/Brand/Alpha/4（10%）与 Border/Brand/3；指示层限制在行内，并置于文字、控件和关系线下面。通过真实鼠标拖动，检查悬停展开后的范围、浅色填充、前景保持、浅／深主题及结束后清理；再运行既有排序和几何回归。修订展示后，用户于 2026-09-27 确认“确定。tree组件还有需要建设的么？”，本项拖拽目标视觉已通过；不扩大为整体实施或对比度验收。

已完成。浏览器回归先复现原 85% 深色，再验证新颜色；截图检查另发现通用行子项规则覆盖绝对定位，已在指示层明确定位并增加完整行范围断言。79 项专项单测、13 个生产构建浏览器场景和 Playground 类型／构建通过。两项 inside 样式的 Token 身份、角色、主题资格与消费登记一致；未改全局 Token 值。浅／深主题截图已检查，分别见 [浅色目标](../../evidence/runtime/tree/drop-target-light.png)、[深色目标](../../evidence/runtime/tree/drop-target-dark.png)，当前补丁指纹见 [拖拽样式记录](../../evidence/runtime/tree/drop-target-facts.json)。全仓既存治理问题与独立对比度验收继续保留，不把本次局部样式校验扩大为全仓通过。本次属于 V01／V05 的局部应用，无需新增通用设计方法。

## 24. 自定义呈现与必要验收收尾（2026-09-27，工程已完成、独立验收保留）

用户要求「继续建设」。本批按 System Mode 补齐节点 renderer 上下文和自定义空态，保持已确认视觉。五个既有 renderer 保留首参 node，新增同一份只读状态上下文作为第二参；包括层级、展开、行选择、勾选／半选、焦点、操作限制原因，以及沿用现有状态所有者的展开／选中／勾选／聚焦动作。动作执行时复核最新权限及可见节点，受控时只发出回调，不建立第二份状态。自定义空态区分无数据与筛选无结果，可组合既有 Empty 与 Button；ManageTree 开放同一空态入口和操作区状态，草稿所有权保持。

范围为 Tree、ManageTree 对应入口、一个按需展开的演示、定向测试和合同／证据。沿用 V05（自定义动作与禁用规则）、D05（缩放和深层布局），不新增主题、Token 或新 Tree 形态。先复现缺失入口，再验证状态／权限／受控、空态切换、键盘与重复深层移动；尝试实际浏览器 200% 缩放与读屏，不能实际执行的组合明确记录。浅色可读性检查提供本地对照，不替换已确认默认色；全库治理失败与组件结果分开。

本批完成：renderer 上下文、空态、ManageTree 透传和第 06 个按需展开示例。新增入口兼容单参数回调；复核发现保留的编辑回调可能覆盖未确认输入，现统一按 key 通过最新入口检查模式／权限／缓冲。真实浏览器又发现 Tree 的通用 slot 选择器误隐藏 EmptyActions，已限定到节点样式并同步消费登记；没有改变颜色值。84 项专项单测、16 个生产浏览器场景、UI 类型与 Playground 类型／构建通过；全仓测试类型检查仍因不相关 Command 测试参数类型失败。

连续六次键盘移动覆盖 5 层子树、末节点与移回原层级；每次检查 12px 横线、4px 避让、连续且不重叠的轴和焦点。强制颜色下检查 F6、Escape、箭头与勾选。独立复核 14 项 renderer／adapter 测试通过，限定范围无未闭合 P1/P2。新增功能截图已检查，不扩大既有视觉验收。

[局部弱色对照](../../evidence/runtime/tree/readability-comparison.md) 使用现有 Text/Neutral/3 与 Icon/Neutral/3，只在测试截图中注入，不替换默认色；普通浅色底实测说明文字由 2.28:1 提升到 6.56:1，箭头由 2.53:1 提升到 3.71:1。是否采用仍由人工决定，不等于所有背景组合已通过对比度验收。

真实 200% 缩放尝试：当前 IAB 的快捷键未改变宽度与 DPR，原生 Codex 缩放菜单无法由当前工具访问，因此没有用 CSS zoom 或视口模拟冒充真实缩放。工具不能取得实际读屏播报，本批只记录可访问树和键盘行为；真实读屏仍待人工／可用环境。T0–T7 不整体关闭，全仓既存治理和资产索引问题保留。当前代码、命令和边界见 renderer-facts.json 与两份 verification.md；无需新增通用设计方法。

## 25. 状态示例的可理解性修订（2026-09-27）

用户反馈第 06 例难以理解，要求直接修改示例。以 System Mode 修改文档演示及其局部排布、已有浏览器用例与证据；共享 Tree、默认操作显隐和已审核颜色不变。复用 Tree renderer、Tag、Button、Empty，不增加新的状态所有者或业务功能。V05 用真实操作展示内容变化，I03 建立“操作—变化—含义”的对应，D05 检查窄屏。方案采用三步提示、始终可见的勾选状态标签、本例常驻操作按钮与单独的空态体验说明；避免再加一套调试面板。待验证：初始状态是否可理解，选中与勾选是否清楚区分，限制节点的后代是否仍可操作，窄屏是否完整可达。执行 Playground 类型／构建、已有示例浏览器回归及宽窄截图检查；不新增镜像单测，不扩大视觉验收范围。

已实施：第 06 例改名为「节点内容随状态变化」，初始即显示未加入／不可勾选，使用现有 Tag 表达部分加入／已加入和独立的行选中。本例按钮常驻，双向联动复选框；受限父节点旁明确说明后代权限。三步提示与空态体验分开组织。Playground 类型／构建及更新后的生产浏览器用例通过，覆盖标签和按钮双向变化、行选中不改勾选、禁用父节点、键盘／强制颜色、恢复焦点，以及 1280px／320px 页面。宽窄截图已由本轮代理查看，未见溢出或遮挡；新增示例视觉等待用户确认，不继承旧验收。证据见 verification.md 的本节记录。本次属于 V05／I03 的局部应用，未产生新的全局设计规则。

## 26. 全祖先关系线连续显示（2026-09-28）

用户要求开启关系线时，每一级父节点的竖线均沿整棵子树延续，参照本次图 2。此明确指令更新第 3 节原来“末兄弟处收尾／只保留后续兄弟祖先线”的规则：所有祖先轴均贯穿其可见后代，在各自子树最后一个可见节点的首行锚点结束；不串联独立根节点。折叠、筛选及移动后以新的可见结构确定终点，虚拟窗口沿用完整逻辑行，不以 DOM 窗口边界截断。24px 缩进、12px 横线、完整按钮 4px 避让、浅线 Token 保持。

按 System Mode 修改共享 Tree 的可见行投影和终点样式、相关测试与合同证据。应用 D02 的层级关系表达及 V05 的折叠／筛选行为检查。先用单链深层测试复现祖先轴缺失，再验证父级末分支、不同根、筛选折叠、15 层窗口滚动、Basic/Rich 与原拖拽关系线几何。新规则直接由本次用户授权；修订后的运行视觉验收记录见下文，不扩展历史验收。

已完成：可见行保留全部祖先轴，使用完整投影中的下一行层级确定各轴终点；共享 Tree 和 ManageTree 同时生效，无新增配置或 Token。86 项专项单测、16 个生产浏览器场景、UI 类型检查和 Playground 类型／构建通过。浏览器整套首次 15 项通过；大树案例的筛选断言因末节点尚未进入虚拟窗口失败，补充实际滚动后该案例复跑通过。检查了单链、独立根、筛选、折叠、深层重复移动及 10,000 节点窗口上下边界。修订截图见 [顶部层级](../../evidence/runtime/tree/continuous-ancestors-top.png) 与 [滚动后子树收尾](../../evidence/runtime/tree/continuous-ancestors-scrolled.png)。原 5369 预览服务已停止，恢复同一工作树服务并刷新现有页面后，实页第 10 层已显示全部 8 条祖先线。用户于 2026-09-28 明确确认“确定。已完成视觉验收”，本轮全祖先关系线连续显示的运行态视觉验收通过。此次仅同步验收记录，不改运行代码；本次是 D02／V05 的局部应用，无需新增通用设计方法。


## 27. 剩余验收与交付收尾（2026-09-28）

用户要求“继续完成剩下的这些事项”。按 System Mode 完成四项收尾：真实浏览器 200% 缩放与读屏；浅色可读候选的状态测量及人工决策；后加节点／领域编辑示例的集中审核；Tree 本地发现入口和必要登记校验。范围为相关验证、证据、Tree 消费登记、最小依赖登记和交付文档；默认视觉只在具体候选确认后调整，沿用全部现有 Token。V04 区分辅助内容与必要状态，V05 检查可见性与行为，D05 检查真实缩放。先复现当前失败，修复相关原因，再运行针对性测试／类型／构建／浏览器校验；保留原有通过记录与其他任务修改，不修改冻结历史以制造通过。真实读屏能否取得播报证据仍待验证；无法取得时记录实际工具限制。人工视觉 Gate 不由自动化代填。


### 27.1 收尾结果与人工决定（2026-09-29）

已完成真实 Chrome 200% 缩放检查、Tree 颜色用途登记和本地索引修复；专项回归为 89 项单测与 16 个生产浏览器场景，UI 类型及 Playground 类型／构建通过。索引保留 scoped-passed 的专项范围，既有 G3 组件补登记不代表验收或发布。冻结 B2 历史哈希未变；新增 Tree 授权识别仅排除已经明确授权的 Tree 增量，其他任务的登记／授权／类型问题另列，未放宽全库校验。

用户明确确认“两个示例都通过”，验收范围为第 06 例节点内容随状态变化，以及领域字段编辑／保存失败恢复示例。用户同时要求“保留当前浅色，候选继续调整”：默认颜色保持审核版；此前整体加深候选未采用。已形成只增强悬停、键盘聚焦、拖入目标行的第二版测试候选，常态保持原色，仍待决定。常态低对比度事实保留，不记为已接受例外。

VoiceOver 曾开启，但工具未取得可核验的字幕／播报结果；中断后核实系统旁白为关闭，正式读屏检查仍待人工完成。完整结果和最短手工核对步骤见 [收尾记录](../../evidence/runtime/tree/closeout/verification.md)，集中视觉稿见 [收尾审核](../design-reviews/tree/closeout-review.html)。本轮为已有 V04/V05/D05 方法应用，无新增通用设计规则。

## 28. 落实交互行可读性方案（2026-09-29）

用户在第二版审核页确认“确定。继续建设tree组件”，本轮将仅增强当前交互行的方案写入共享 Tree，ManageTree 复用；System Mode，仍为未发布候选。仅修改 Tree 样式、颜色消费登记及对应验证／证据。常态 Text/Neutral/6、Icon/Neutral/4 与关系线保持；当前行 hover／focus-within／有效移动目标使用 Text/Neutral/4、Icon/Neutral/3，控件 hover／focus-visible 使用 Icon/Neutral/2。应用 V04 保持信息层级、V05 验证状态反馈，不新增 Token、API 或功能。

验证：将原候选注入测试改为真实组件测试，先验证旧组件不能满足增强状态，再检查两种主题／背景、键盘／指针／拖入、其他行不受影响与状态退出恢复；保留旧候选测量，另存实际运行证据。执行专项单测、UI 类型、生产构建和完整 Tree 浏览器回归。用户确认仅覆盖该方案；常态低对比度、真实读屏与全库其他任务问题仍单独记录。

结果：3 条共享 CSS 规则完成，颜色消费登记同步；89 项单测、16 个完整生产浏览器场景、UI 类型、页面类型／构建与 Token 生成一致性通过。实际组件 112 条测量验证单行增强、其他行不变、离开与拖拽取消恢复，旧候选证据保留。已有 V04/V05 足以解释本次调整，无新增通用方法。详见收尾记录及 `interaction-readability-facts.json`。

## 29. Web 高保真原型阶段基础建设完成（2026-09-29）

用户明确确认：“如果是这样的话，现在这个Tree视觉我已经人工检验通过，可以算作tree组件基础建设已完成。”本次以 System Mode 仅同步阶段状态、Tree／ManageTree 合同与验收记录、使用说明；验证 YAML 解析、原授权边界和本地索引一致性，不修改运行代码，也不重复运行组件浏览器回归。

当前 Tree 视觉人工验收通过；本阶段范围为 Web 高保真交互原型，Tree 与配套 ManageTree 的基础建设完成，进入实际页面使用和按需维护。本阶段没有必补功能待办。真实读屏、常态低对比度与全库既有校验问题转为独立后续事项，不影响本次阶段结项，也未被记为已验证通过。资产仍为未发布的本地候选。此前各批次的“仍待验收／未整体关闭”保留为历史范围，以本节和 current-phase 的 prototypeCompletion 为当前阶段结论。本次仅记录明确人工决定，无新的设计方法。
