# 列表组合校准与迁移自测

当前为第二轮校准，等待用户重新视觉审阅。首轮用户明确反馈“还远没有达到70–80%”；首轮技术通过不改变这个结论。

2026-09-16。实施范围：局部列表 Fork、教学案例迁移、AI 使用入口及精确授权接入。新增样本为 `local-experiment`，未进入公共资产索引。原 BM-A/B 的视觉接受不复制到本样本。

## 可查看结果

- [列表校准](http://127.0.0.1:5341/#list-composition) · [案例迁移](http://127.0.0.1:5341/?sample=cases#list-composition) · [组合说明](../../../docs/ai/list-composition.md)。
- [原 BM-A 基线](baseline.png) · [校准画面](chromium/calibration.png) · [迁移首次画面](transfer-first.png) · [迁移自查后](chromium/transfer.png) · [窄屏表格](chromium/narrow.png) · [窄屏卡片](chromium/narrow-cards.png)。
- 来源：只读现场获取 Figma `2526:33858` 的结构与截图。保留查询/结果关系、列宽主次与一致行结构；沿用现有资料业务与 Rain Next 组件。不复制原设计人员数据、全站导航、AI 图谱或固定操作列。因此这是关系校准，不是全图像素还原。

## 实际变化及判断

| 原组合/首次画面 | 本轮处理 | 尚不能推出的结论 |
| --- | --- | --- |
| 外层页面标题与卡片标题重复，说明占据纵向空间 | 一个 16px 页面标题；14px 上下文；查询直接接结果 | 不代表所有页面都不需要介绍文字 |
| 查询、视图、显示工具与批量动作需要重新梳理归属 | 查询与显示分组；结果行承接已选数量、发布和显示列 | 不规定所有管理页采用相同排数 |
| 名称与常规属性没有明确的宽度策略 | 名称主要宽度；普通字段 14px；列按字段 ID 分配宽度，隐藏列不串位 | 不把本例列宽作为全局规则 |
| 案例迁移增加课程归属、类型和长名称 | 增加类型过滤；课程归属跟随名称；只读标记与课程共行 | 仅为同类列表变化，不证明跨页面家族迁移 |
| 首次校准把批量发布放在页头；窄屏卡片仍出现表格滚动说明 | 发布归回结果操作行；提示只在窄屏表格出现 | 自查修正不算用户返工或模型稳定进步 |

原完整 UI 尺寸方案保留，查询控件使用 36px，未缩小点击区域。单个对象在卡片视图才使用 Card。数字、日期没有套用 KPI 字体。源码结构和状态由页面私有 Fork 管理，不修改公共 API。

## 首轮验证

- 原组件及场景源文件哈希核对 1,996 项：只有原型入口增加两条 import/route 语句；去除这两条后全部匹配。共享包、原 DataTableRecipe、BM-A/B/C/D 均保持原字节。见 [可重跑核对](verify-source.mjs) 与 scope-proof.json。
- 列表新筛选测试先失败于缺少类型过滤，后通过；原 BM-A/资料表/资产索引回归一并执行。4 个测试文件共 17 项通过，见 [测试日志](tests.log)。新状态测试与三浏览器检查分别保留日志，不把技术检查写成人工视觉认可。
- 构建版 Chromium、Firefox、WebKit 各 7 组检查，通过情况见 [实际结果](browser-results.json)：跨页选择/只读排除/发布、失败保留/重试/加载锁、视图切换/隐藏列、搜索提交/组合筛选、无结果恢复/详情焦点、窄屏横向滚动、控制台与运行错误。
- 首次浏览器脚本错误点击隐藏 checkbox input，改为点击其实际关联 label；没有 force。随后 WebKit 暴露弹窗关闭焦点未回到资料入口，已由宿主提供稳定 finalFocus ref，保持原断言后三浏览器通过。历史失败见 browser-before-focus-fix.json/log。
- 1400×900、390×844 的 Light 画面完成视觉自查。CSS 字号/字重/行高/字体链见各浏览器 typography.json；真实字体命中单独见 fonts.json。颜色资格及未接受的共享对比度问题仍保持原记录，未宣称全页可访问性通过。
- 局部语义 Token 解析、精确授权的负例、[类型检查](typecheck.log)、[构建](build.log)、[治理检查](governance.log)与资产索引均通过；已有构建包体积警告保留，没有为本轮引入依赖或做无关拆包。

复跑：仓库根目录运行 `node evidence/runtime/list-composition/verify-source.mjs`；构建并启动 prototype preview 到 5345 后运行 `node evidence/runtime/list-composition/check-browser.mjs`。可通过 LIST_BASE_URL 指定同一构建的其他端口。

## 状态与局限

本地实施完成，自动验证结果以所附日志为准；独立审阅未运行，人工视觉审阅待确认。父级 generationQuality 旧 independentReview=passed 不覆盖本轮；本轮单独记 not-run。

迁移需求在实现前写于 [transfer-task.md](transfer-task.md)。执行者已读本轮讨论、Figma 与原源码，因此这是有指导自测；没有实施独立生成的双输入 A/B 对照，不能归因知识入口带来了多少质量提升，也不能据此声称稳定达到 70–80%。后续先由用户查看此候选的视觉水平，再决定是否扩为另一类任务。

未验收真实文件服务、持久化、真实辅助技术、物理触屏、Dark 或跨机器字体。未发布公共资产、迁移业务、写入 Figma 或进行 Git 提交/推送。

## 第二轮：页面组织与真实窗口校准

授权：用户在具体复查后要求“继续”。保持同一局部页面；现场重读 VE-001 表格及 VE-002 卡片，不扩展新任务。

- 白色页头归拢标题、数量和上下文；查询、显示、选择后操作明确分区。899px下三个查询控件同排，工具整排右对齐，避免自动换行把控件悬在中间。
- 表格名称单行省略，完整标题保留在可访问名称、悬停和详情中；课程归属固定次行。两种列宽策略：宽屏按比例，中等窗口按必要属性宽度分配。
- 卡片类型、课程、只读共行；标题最多两行；日期与状态固定底部。只读卡片不再额外撑高。没有为了仿照课程封面而添加无数据依据的图片。
- 批量发布只随选择出现；发布和取消操作后焦点返回本页全选。原跨页选择、只读限制、刷新失败恢复沿用。

[1400px 表格](round-2/table-1400.png) · [899px 表格](round-2/table-899.png) · [899px 卡片](round-2/cards-899.png) · [390px 表格](round-2/table-390.png) · [390px 卡片](round-2/cards-390.png)。

在构建版 Codex 内置浏览器中完成8组检查，见 [实际结果](round-2/browser-results.json)：条件批量操作/跨页选择/发布焦点、搜索与组合筛选、完整详情与焦点、隐藏列、三种窗口布局、窄屏键盘滚动、空态恢复、切换视图及失败重试保留选择。控制台错误为空。899px表格起点从本轮前审阅时的239px移到178px，行高由72/94px收敛至约65px；卡片均为156px。几何数字只证明对应变化，不是设计评分。

本轮[18项定向及回归测试](round-2/tests.log)、[类型](round-2/typecheck.log)、[构建](round-2/build.log)、[全仓治理](round-2/governance.log)最终通过，局部Token解析通过。原完整三引擎21组是首轮证据，本轮没有重新运行三引擎或独立审阅；不复用它们作为本轮通过声明。全页对比度、真实辅助技术与视觉成熟度仍未获得新验收。

截图工具的fullPage输出出现画面缩在白色画布角落的问题，已废弃该截图，证据使用正常viewport截图。检查脚本曾在菜单已自动关闭后发送Escape、以及读取滚动值时超时；均重读实际界面后核对结果，没有更改产品行为来迎合脚本。

收尾期间工作区阶段与校验文件发生并行更新，列表子任务状态被置为in-progress/not-run，与精确校验要求不同步，曾导致全仓检查及2项资产索引测试失败。本轮只把已完成验证的listCompositionPilot子任务恢复为completed/passed，保留BM-C进行中的状态；重新执行后治理与18项测试通过，没有放宽校验。

原始1,996项源码快照最终直接比对有3项BM-C文件变化（本轮未写入），其余1,993项一致；见[范围核对](round-2/scope-results.json)。因此原verify-source.mjs的全快照断言不再代表当前并行工作区可通过，本轮没有更新快照或排除差异来让它变绿。共享包、原资料表与BM-A/B/D保持原哈希。

## 第三轮：弹层与整卡选择（2026-09-16）

用户指出关闭入口与卡片信息关系错乱，明确确认选择控件控制整张卡片后要求“开始实施”。本轮为 Prototype Mode 局部组合修复，说明与证据随页更新；未改共享组件、Token、Registry、原 Benchmark 或阶段授权。

### 实际修改

- list.tsx / list.css：卡片选择控件独立于内容列，整卡背景与品牌边框表达选中；名称打开资料信息，不更改选择；去掉强制标题两行占位。
- 弹层为 516 标准宽度，标题“资料信息”与 CloseBold 28/20 同排，正文用名称及属性列表；删除重复 Footer 关闭和正文开发说明。页面虚构数据说明保留。
- 删除无实际任务的稍后处理和重复更多菜单，表格/卡片共用名称入口。
- list.test.tsx 增加整卡选中、视图状态保留、查看与选择独立、唯一关闭入口和焦点返回回归覆盖；计划与使用说明同步。

### 本次验证

- 定向 Vitest：3/3 通过，见 [tests.log](round-3/tests.log)。
- prototype build（含 TypeScript noEmit）：通过；Vite 有 bundle 大小提示，见 [build.log](round-3/build.log)。
- Codex 内置浏览器：1400/899/390 视口；整卡选中背景/边框与取消恢复、卡片与表格选择一致、跨页保留、批量发布清除选择及全选焦点、关闭/Escape/Tab/标题焦点返回通过。控制台 error 为空。具体观测见 [browser-results.json](round-3/browser-results.json)。
- [桌面整卡选中](round-3/cards-1400.png) · [899px卡片](round-3/cards-899.png) · [390px卡片](round-3/cards-390.png) · [桌面弹层](round-3/dialog-1400.png) · [390px弹层](round-3/dialog-390.png)。实图检查：关闭按钮与标题顶端对齐、只有一个关闭入口；日期没有紧邻复选框；窄屏属性无横向溢出。
- 依赖/源码边界检查 verify-boundaries：通过，见 [import-boundaries.log](round-3/import-boundaries.log)。
- 运行 Tailwind B2 仓库检查未通过：阶段历史、共享 Token/Checkbox/Radio/Selection Card CSS 与 Manifest/Registry inventory 报错，见 [boundaries.log](round-3/boundaries.log)。这些文件未在本轮修改；未绕过检查或扩展修复范围。不宣称全仓治理通过。

### 验证过程与边界

首次在用户页验证时视图已切回表格，改用独立临时页检查。首个关闭按钮几何查询使用了不存在的 data-slot，改读实际 button；首次 Escape 读数发生在退出动画期间，随后等待 dialog 隐藏，再确认焦点与重做取消选择；保留原观测，不把中间态当作通过。临时页已关闭，viewport override 已恢复。

本轮没有独立审阅、三浏览器重跑、真实读屏/触摸或正式对比度验收。实施完成，局部自动检查通过，人工视觉验收仍为 awaiting_human；不声称达到70–80%。无 Figma 写入、发布、迁移、Git 提交/推送。修改前源码见 round-3/*.before.txt。

## 第四轮：三条浏览器反馈（2026-09-16）

Prototype Mode。修改本地 list.tsx，复用 Pagination.showTotal=false / align=end；总数只保留顶部，并继续随筛选更新。刷新改为常规带图标文字按钮；默认/升序/降序分别使用正式有序列表/排序资产，入口和菜单图标一致。没有新增共享 API、CSS、Token 或依赖。计划与使用说明同步。

- 现有定向测试 3/3 通过：[tests.log](round-4/tests.log)。构建含类型检查通过：[build.log](round-4/build.log)；仍有 Vite bundle 大小提示。
- 浏览器：默认/升序/降序切换及实际名称顺序、刷新加载及恢复、筛选后顶部“找到1份资料”、翻页后总数保持12、底部无重复总数通过；控制台 error 为空。见 [browser-results.json](round-4/browser-results.json)。
- [952px排序菜单](round-4/sorting-952.png) · [952px底部分页](round-4/pagination-952.png) · [390px工具栏](round-4/toolbar-390.png)。窄屏工具组自然换行，没有水平溢出；使用原控件完整尺寸。临时标签已关闭，视口已恢复。
- 图标 availability 已从 catalog 核对，sort-left / sort-drag 形态不符本任务而未选用；所选三项仅是页面局部语义映射。
- 本轮没有重跑全仓治理、正式对比度、独立审阅或跨浏览器检查；不改变上一轮仓库级检查未通过的记录。页面视觉仍待用户复核，未提交/发布。

### 第四轮追加：默认顺序图标

用户指出编号列表不具有默认感。本地入口与菜单的默认顺序图标统一替换为 RefreshIcon，依据现有 icon-selection.md 的“恢复默认或初始值”明确规则；升序、降序保持原资产。同步更新使用说明，未改共享组件。prototype typecheck 通过；浏览器确认入口/菜单图标显示，并实际从升序切回默认恢复原排列。[当前截图](round-4/default-icon-revision.png)。仅视觉资产替换，无新增测试或全仓重复验证；用户视觉确认仍待定。

### 默认顺序图标：用户明确指定 list-view

以用户最新附图 list-view 为准，覆盖此前恢复箭头的局部选择（前一条 card-view 附图由最新指令取代）。入口与菜单均使用已有 ListViewIcon，保留刷新按钮自己的 RefreshIcon；升降序行为不变。Prototype Mode，本次仅 list.tsx 与对应说明/证据调整；不更改全局图标语义默认。类型检查通过，浏览器 DOM 与实图均确认两处 icon/list-view。[截图](round-4/default-list-view.png)。
