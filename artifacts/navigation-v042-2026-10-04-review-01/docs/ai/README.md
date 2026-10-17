# Rain 按需使用入口

导航 v0.4.2 候选：按需读 [UI 选择](navigation-v042-w3.md)、[可恢复工作区](navigation-workspaces-v042.md)、[R4–R6 与独立消费](navigation-v042-w5.md)。仓库内 [实施](skills/rain-navigation-implementation/SKILL.md) / [组合](skills/rain-navigation-composition/SKILL.md) Skill 未全局安装；G2/G3 与发布分别登记。

适用范围：当前本地工作区的原型与候选源码。先遵守根 [AGENTS](../../AGENTS.md)；本页用于减少重复加载，不能替代当前任务的阶段、来源与验证边界。

## 找到需要的资产

设计或改造组件、模块、页面，先查[设计方法库](information-design.md)的方法索引：视觉表现（配色、样式组合、材质、组件改造）、设计手法（版式、层级、功能与装饰）、信息表达（逻辑关系与组件形态）。按需读取条目，记录采用的方法与调整；有新的实际经验时按模板回写，持续补充案例和适用边界。当前学习报告 V2 是首批已确认的局部案例，具体范围见[用户确认](../../evidence/runtime/learning-report-a/v2-feedback/verification.md)，与下方历史 BM-D 原入口区分。

生成或改造页面，先读 [原型设计入口](prototype-design.md)。该短入口、[设计方法库](information-design.md)及[大表单组合](form-composition.md)随当前 Starter 导出；相关组件合同、表单参考图片与最小来源记录一并保留。方法库的全部原始案例不随附，缺失材料不能当成已读取证据。使用者无需本次聊天即可读取方法，仍须按条件判断并检查实际页面。

### 先按页面任务找到组合

| 页面任务 | 先看的组合与边界 |
| --- | --- |
| A1 页面/内容导航、A4 连体页签、公共资源与 200 班级、R2 编辑工作区 | [导航 v0.4.2 候选指南](navigation-v042.md)及[本地源码登记](../../registry/navigation-v042.json)：W0–W2 首片，G1限定视觉accepted、未发布；公共候选与可复制 R2 的状态分别记录。索引当前可生成并校验；早期 ui-command 缺 Registry 的阻断属于历史状态 |
| 跨模块导航、课程范围、命令与陌生业务再组合 | [G3 v0.3 本地候选](../../apps/prototype/src/scenarios/token-first-g3/rebuild/README.md)：12 组合、可运行完整页、隔离与运行证据；视觉 pending-review，未进入公共资产索引 |
| 查找、比较、选择并批量处理同类资料 | [BM-A 现有组合](../../apps/prototype/src/scenarios/bm-a/page.tsx)及[列表校准说明](list-composition.md)：截图、源码、保持关系、可调部分和状态集中阅读。新校准版仍待视觉审阅，不继承原 BM-A 的确认 |
| 编辑包含多个分区的长表单 | 先读[大表单组合](form-composition.md)，再读命中的 BM-B 源码和状态合同：参考内容分组、固定操作区和草稿处理，不机械复制全部分区 |

先核对主任务、对象数量、内容长度及必要状态。匹配时沿用完整组合，说明需改变的关系；不匹配时按下面的组件用途继续查找。此表是本地场景入口，不改变公共资产索引的身份门槛。BM-C/D 的行为与视觉限制仍见后文。

列表组合已完成第四轮局部修订，视觉仍待重新审阅；该候选仅供比较，不作为成熟生成样板。

### 再查所需组件

1. 先将任务理解为用途（如“内容分区”“单选”“筛选”“搜索”“图标操作”），再查 [生成资产索引](asset-index.md)，或执行 `node scripts/asset-index.mjs --find 筛选`。已知组件名时可直接查询 Textarea 等名称；只读取命中的合同、源码与依赖。当前是用途关键词的字面检索，不保证任意自然语言句子直接命中。
2. 顺序为 Template → Block → Pattern → Layout → UI → Primitive；不匹配时退回下一层。当前没有已交付的公共 Template/Block，BM-A/B/C/D 都是本地场景；C/D 有待修正的设计问题，不作为推荐视觉模板。
3. 默认复用完整组件；需要改变时依次选择已有 Variant → 具名 Local Recipe → Local Fork。布局与业务状态留在宿主，公共组件修改须按 System Mode 范围登记。
4. 需要视觉调整时再查 [Token 选择](token-selection.md)，需要图标时再查 [图标选择](icon-selection.md)。不默认加载完整 Token JSON、全部图标或历史日志。
5. 读取 [phase](../../status/current-phase.yaml) 对应增量，核对当前证据；整体 Gate、局部视觉接受、对比度和发布分别判断。

索引从实际 Manifest 与本地 Registry 生成，不手工维护第二份资产状态。更新登记后运行 `node scripts/asset-index.mjs --write`；`node scripts/asset-index.mjs --check` 检查引用、导出与过期内容，同一检查已接入 `pnpm verify:evidence`。

## 当前入口与选择

| 任务 | 先读 |
| --- | --- |
| 同级内容分区 | [Tabs](../../manifests/ui/tabs.yaml)；完整使用导航与内容面板。仅改变筛选条件或图表指标时，先比较单选组 |
| 少量互斥条件或模式 | [RadioGroup](../../manifests/ui/radio-group.yaml)、[CheckableTagGroup](../../manifests/ui/checkable-tag-group.yaml)；依据区域任务、标签长度和视觉重量选择，宿主决定是否必选及影响范围 |
| 较多候选值或候选搜索 | [Select](../../manifests/ui/select.yaml)；单/多选与搜索分别选择，数据及请求留在宿主 |
| 操作与显示设置 | 显式操作使用[本地 Button](../../manifests/ui/button.yaml)；低频操作比较[DropdownMenu](../../manifests/ui/dropdown-menu.yaml)，含独立字段的浮层用[Popover](../../manifests/ui/popover.yaml) |
| 即时过滤或提交搜索 | 即时过滤使用[Input](../../manifests/ui/input.yaml)；按钮/Enter 明确提交使用[SearchInput](../../manifests/ui/search-input.yaml)，不因名字包含搜索就改变生效方式 |
| 展开、收起与图标操作 | [IconButton](../../manifests/ui/icon-button.yaml)与[图标选择](icon-selection.md)；宿主提供可访问名称和真实展开状态，需要显式文案时保留文字 |
| 分组、间距、主从区域 | [Layout 用法](../audits/2026-09-13-layouts-usage.md)，再查命中的 Stack / Inline / Grid / Split 合同 |
| 独立内容对象 | [Card](../../manifests/ui/card.yaml)；默认20px内边距与既有Parts/Recipe，不把Card当作所有布局的容器 |
| 输入与校验展示 | [FormItem](../../manifests/ui/form-item.yaml)、[Input](../../manifests/ui/input.yaml)；长文本用[Textarea](../../manifests/ui/textarea.yaml)，由宿主拥有草稿、校验和提交 |
| 对话框与确认 | [Dialog](../../manifests/ui/dialog.yaml)、[AlertDialog](../../manifests/ui/alert-dialog.yaml)；复用既有焦点、关闭与嵌套浮层行为 |
| 数据表 | [Table](../../manifests/ui/table.yaml)、[Pagination](../../manifests/ui/pagination.yaml)、[Empty](../../manifests/ui/empty.yaml)；业务处理见BM-A |

## 先组织任务，再组合页面

先明确主要使用者、要完成的判断或操作、信息优先级、必要状态和容器。复杂页面比较有实质差异的组织方式后，形成一版主方案；只记录影响结构的少量选择，不把设计解释放入业务界面。

- 区分整页范围、局部展示与执行操作。例如，班级筛选影响整份报告，指标切换只影响一张图，保存是命令。选择组件时保留这些区别，不设组件种类或图标数量配额。
- 使用已有[排版与密度规则](token-selection.md)和[布局用法](../audits/2026-09-13-layouts-usage.md)。default 是表单、报告和复杂工作台的起点；局部 compact 需要结合邻近字段、按钮和列表节奏判断。窄容器不自动使用最小尺寸，Data 预设不要求所有指标采用 36px。
- Prototype Mode 允许局部结构、比例和组合探索，仍按已有 Variant → Local Recipe → Local Fork 使用；公共组件和基础值的调整另评估。现有组件不适合时说明具体缺口，不用一排相同 Button 临时代替所有行为。
- 提交前查看实际整页、主要交互和窄屏：任务是否清楚，控件是否合适，字号/粗细/留白是否协调，是否有重复操作。演示开关归入预览工具，假数据保留必要说明。技术检查与设计判断分别记录。

公共入口为 `@rain-next/ui`、`@rain-next/layouts`；图标使用静态 `@rain-next/ui/icons/<slug>`。`defineRainLocalRecipe`、`rainCn`、`iconButtonSizes`、`defineLayoutSpacing` 是现有组合工具，保留各包出口，不另建同义组件。源码级 Pattern 记录标为“复制源码”，不能误写成 UI 包导入。

首次接入先沿用 [prototype入口](../../apps/prototype/src/main.tsx) 与 [应用样式](../../apps/prototype/src/styles.css) 的加载关系；Foundations、Focus、Motion、UI和Tailwind受约束扫描缺一不可。不要只复制一个TSX文件后声称已完成安装。

## 复制和改造 BM-A/B

| 场景 | 当前本地实现 | 改造边界 |
| --- | --- | --- |
| BM-A 数据管理 | [入口](../../apps/prototype/src/scenarios/bm-a/page.tsx) · [状态合同](../../apps/prototype/src/scenarios/bm-a/state-contract.md) · [验证](../../evidence/runtime/bm-a-rn09/verification.md) | 复用[资料表配方](../../apps/prototype/src/data-table-recipe.tsx)；宿主拥有筛选、分页、刷新和选择，保留过期请求保护与查询范围内选择协调 |
| BM-B 教材大表单 | [入口](../../apps/prototype/src/scenarios/bm-b/page.tsx) · [状态合同](../../apps/prototype/src/scenarios/bm-b/state-contract.md) · [验证](../../evidence/runtime/bm-b-rn10/verification.md) | 复用Dialog、FormItem与字段；宿主拥有草稿、取消、校验、保存、模拟上传与重试，保留固定操作区和窄屏退化 |

两者均为 `local-experiment`。复制到新的本地场景时保留来源、稳定追踪属性和状态合同，记录自己的范围/修改点/尚未验证项；需要新增扫描或消费者登记时精确添加对应路径。先更改内容与结构，再检查保存失败、取消、焦点恢复和窄屏，不能把原场景验收复制给新场景。

本地体验：运行 `pnpm --filter @rain-next/prototype dev --port 5201 --strictPort`，打开 [BM-A](http://127.0.0.1:5201/#bm-a) 或 [BM-B](http://127.0.0.1:5201/#bm-b)。端口占用时选择空闲端口，不结束其他任务的服务。组件文档站另用根 README 中的启动方式。

## BM-C/D 的当前用途

BM-C 批改工作台与 BM-D 教学报告已完成 M2 的限定技术实现、运行检查和独立代码审阅，入口和固定样本见[M2 体验说明](m2-trial-guide.md)。用户已指出图表、组件选型、图标、布局、密度与排版问题；当前画面不作为推荐视觉起点。

- [BM-C](../../apps/prototype/src/scenarios/bm-c/page.tsx)的[状态合同](../../apps/prototype/src/scenarios/bm-c/state-contract.md)可参考卷别、遍历、草稿与保存失败保护。
- [BM-D](../../apps/prototype/src/scenarios/bm-d/page.tsx)的[状态合同](../../apps/prototype/src/scenarios/bm-d/state-contract.md)可参考全范围聚合、筛选、分页和图表状态隔离；图表采用页面局部 Recharts，尚非公共组件。[本轮浏览器反馈](../../evidence/runtime/generation-quality/bm-d-feedback/review.md)将整页筛选改为框内标题 Select、局部指标改为按钮外观的单选组，视觉仍待复审。
- 设计改进依据[实施计划](../plans/2026-09-15-rain-generation-quality-improvement.md)，进展见[本轮记录](../../evidence/runtime/generation-quality/review.md)。改造须保留业务含义，旧控件形态可以有依据地调整；新的画面需独立审阅。

## 固定本地样本（RN-14）

RN-14已完成BM-A/B各一次复用生成和两次连续结构修改；固定最终样本的独立安装、类型、构建及三浏览器交互检查通过，独立复核与详细边界见[本轮记录](../../evidence/runtime/rn14-editability/verification.md)。本地体验：[资料管理](http://127.0.0.1:5324/#bm-a) · [教材表单](http://127.0.0.1:5324/#bm-b)。服务停止后按样本README重新启动。

本轮固定结果为[最终样本归档](../../evidence/runtime/rn14-editability/starter-final.tar.gz)，身份 `rn14-90fc74205a764fb1`，完整哈希见[来源锁](../../evidence/runtime/rn14-editability/final-source-lock.json)。展开到一个新目录后，按归档内README运行。新样本仍为 `local-experiment`，最终BM-A/B运行视觉已获[用户确认](../../evidence/runtime/rn14-editability/human-gate.md)。归档内待确认标记为生成时状态，当前确认以该记录和phase为准。

需要从当前工作区重新取得未经这六轮改造的起点时：

```sh
node scripts/rn14-starter.mjs --export /tmp/rain-next-local-trial
```

目标必须是仓库之外、尚不存在的目录。在该目录运行 `pnpm install --frozen-lockfile --offline --ignore-scripts --package-import-method=copy`、`pnpm build`，再运行 `pnpm dev --port 5315 --strictPort`，访问 `#bm-a` 或 `#bm-b`。离线安装依赖本机缓存；另一台机器尚未验证，不把缓存缺失当成版本可以漂移的理由。

导出保留三个源码包、BM-A/B和锁文件，提供单独的应用入口；`source-lock.json`记录来源HEAD与实际文件哈希。复核固定快照使用 `node scripts/rn14-starter.mjs --check /tmp/rain-next-local-trial`（在原仓库运行）。主动改造后的文件应记录自己的新快照，不回填旧哈希。当前阶段只支持本地试用，无在线Registry或发布包。

## 已知限制

RN-15的M1 BM-A/B限定本地试用入口见[一页体验说明](trial-guide.md)，范围、最新检查、未决项与固定归档恢复方法见[交付记录](../../evidence/runtime/rn15-delivery/verification.md)。原工作区关键浏览器49个唯一用例及固定样本三浏览器复查通过；完整单测1373/1373、类型和构建通过。BM-B后续已接受的分区布局采用12px外留白、20px分区内留白及24px底栏边距，分别测量；不再沿用早期无分区的字段/主操作共线描述。

- 本地 Registry 为 `RainLocalSourceRegistry / current-workspace`，未发布，也不是标准在线 shadcn Registry。`registry/文件.json#条目` 是本地源码关系；历史裸图标名仅在 Rain 图标登记内解析。将来生成在线标准输出时应使用完整 Rain 地址，不把裸 `button` 当成内置安装项。
- Button、Badge、Surface、Link 保持 `local-experiment / prototype-ready`，只补[本地源码记录](../../registry/core-ui.json)，排除默认候选检索。现有工作区维护可按各自合同使用；Badge/Surface/Link的旧数值与独立验收债务仍见[早期合同审计](../audits/2026-09-12-core-ui-contracts.md)。TextButton继续使用Button的text变体。
- 索引的自动验证是原Manifest的记录，时间和范围须查原证据。Card、Layout、Table、Textarea等整体Gate与后续局部接受分别保留；BM-B视觉接受不等于Textarea所有用法已接受。
- [颜色待决清单](../audits/2026-09-12-color-closure-review.md)及组件后续记录仍有效；BM-B浅色静态提示3.71:1仍待审查。不因可检索而推广未解决的颜色配方。
- 真实系统IME、屏幕阅读器、物理触屏与另一台机器的字体命中均按实际证据保留；RN-15复查当前运行状态，不新增或扩大视觉接受。
- RN-14限定的六轮改造与独立消费检查已通过；没有对照实验，效率、token及真实用户修正成本仍为 `not-measured`。RN-15修复了完整基线新核出的16项测试失败及3处测试类型声明错误，旧批次失败日志仍保留。C/D 的后续技术与设计状态见上方独立入口；没有包/Registry发布、Figma写入或业务迁移。

本批范围与验证见 [RN-13计划](../plans/2026-09-15-rn13-asset-index.md)和[验证记录](../../evidence/runtime/rn13-asset-index/verification.md)。

- [导航 v0.4.2 W3 消费合同](navigation-v042-w3.md)：NavigationList/ObjectNavigator/SegmentedControl、C/W样本及R1/R3；G1保留，W3–W5 candidate13运行视觉/组合accepted，G3独立。

- [W6 独立消费](navigation-v042-w6.md)：E1–E6 新业务宿主、来源/实例 patch 与候选边界；新组合视觉待人工审阅。


导航W6–W8当前交付、版本及迁移边界见[导航v0.4.2交付说明](navigation-v042-handoff.md)；G3与全项目质量门仍按独立证据开放。
