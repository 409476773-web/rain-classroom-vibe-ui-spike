# G3 导航重建 v0.3 · 实际交付与验证

本地候选源码已交付；最终视觉 `pending-review`，无公共API/品牌变更批准。真实工程是 `.worktrees/card-v2` / `codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`，保留原有dirty/untracked修改。来源锁见 [final-source-lock.json](final-source-lock.json)。

## 运行入口

- [完整课程页 C01](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=course&recipe=C01&page=course-content&view=focus)
- [完整考试页 S01](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=platform&recipe=S01&page=exams&view=focus)
- [十二组合目录](http://127.0.0.1:4174/#token-first-g3?rebuild=1&view=catalog)、[共同状态板](http://127.0.0.1:4174/#token-first-g3?rebuild=1&view=states)、[实例隔离](http://127.0.0.1:4174/#token-first-g3?rebuild=1&view=isolation)、[旧G3](http://127.0.0.1:4174/#token-first-g3)

沿用已运行的4174服务，未停止/重启。12组合共享导航行、Popover和Menubar底座；S03为状态、S07为区域对照、C01为组合页。课程数据、范围、返回恢复留在宿主；E12实验室由其他代理独立选型S05/S08后重新组合。

## 实际改动范围

- 新增 `apps/prototype/src/scenarios/token-first-g3/rebuild/` 的源码、样式、fixture、单测、研究参考和消费README；原图明确标为研究，不嵌入运行页面充当成果。
- `apps/prototype/src/main.tsx` 只加入 `rebuild=1` 分支和从旧页进入的链接；旧页面原源码保持。
- 专属浏览器配置和8个 `navigation-rebuild*.spec.ts`；证据位于本目录及相邻 `navigation-rebuild/`。
- 既有 `docs/ai/README.md` 增加本地候选发现行，`status/current-phase.yaml` 新增独立v0.3状态，保留旧G3记录。
- Canonical工作包只回填 `execution/`、`acceptance/results.json`、`tasks.json`、`06-PROGRESS.md`；v0.2原始记录不改成approved。

## 测试结果

| 命令 | 结果 | 证据 |
| --- | --- | --- |
| `pnpm exec playwright test -c playwright.navigation-rebuild.config.ts` | **66/66 pass**，58.2秒，exit0 | [final-browser.log](final-browser.log)、[JSON](../navigation-rebuild/playwright-results.json) |
| `pnpm exec vitest run apps/prototype/src/scenarios/token-first-g3/rebuild/*.test.ts* packages/ui/src/{scroll-area,sheet,breadcrumb,command,context-menu,hover-card,kbd}/*.test.tsx apps/prototype/src/scenarios/token-first-g3/page.test.tsx` | **21/21 pass**，12文件，exit0 | [final-unit.log](final-unit.log) |
| `pnpm exec playwright test -c playwright.g3.config.ts` | **3/3 pass**，exit0 | [final-baseline-browser.log](final-baseline-browser.log) |
| `pnpm --filter @rain-next/prototype typecheck` | pass，exit0 | [final-typecheck.log](final-typecheck.log) |
| `pnpm --filter @rain-next/prototype build` | pass，exit0；既有大chunk警告 | [final-build.log](final-build.log) |
| `pnpm verify:boundaries` | **fail**，exit1 | [boundaries.log](boundaries.log) |

浏览器覆盖4视口、390px回退、文字放大、forced-colors、键盘、长标签/徽标、N03/N04 Portal、命令四列、班级0/1/4/12/200、直接进入/返回单元、范围隔离、A/B布局和预约。66包含最初61、4条验收细节补测和1条焦点回归；不将早期轮次重复累计成额外覆盖。

`boundaries` 失败是工作区既有Chart导入路径、冻结Token历史、旧组件验收证据和阶段策略，未报告本候选专属错误。本轮保留这些公共范围，没有通过修改门禁制造全仓库通过。

## 测量、修复和限制

28个角色都有实际消费映射与计算结果，详见工作包 `execution/token-map.json`。本目录保留 [Token计算值](computed-token-values.json)、[Popup/布局/状态补测](token-runtime-supplement.json)、[文字对比度与目标尺寸](contrast-and-targets.json)、[深色焦点](dark-focus-contrast.json)。课程560是Split本地响应阈值，不是新公共Token或所有页面的CSS最小宽度。实际字体抽测命中PingFangSC-Regular，不外推其他设备。

深色导航Popup初测焦点2.573:1，真实失败见 [focus-red.log](focus-red.log)。只把候选描边映射到已有 `--rain-category-text-brand-1`，深色N03/N04均到6.335:1；Foundation未改。另一次新增测试在切换N03/N04前没关闭弹层而超时，见 `focus-test-state-failure.log`，修正测试收尾后最终66通过。早期closure的名称空格断言失败亦保留，不隐藏失败历史。

[保护核验](preservation-result.json)：T00采集的2072个公共packages/旧G3文件与锁文件未改变。原G3浏览器测试会刷新它既有的运行截图，复制到本目录 `support-baseline-*`；不能将截图刷新误报成源码改动。

[有限源码和画面复核](final-independent-review.md) 未发现覆盖范围内新增P0/P1。复核者参与E12，该部分明确为作者复核。A/B独立region前后截图证明本次A面层/密度变更后B可见内容相同，Popup继承另有运行值。

尚未运行：真实屏幕阅读器、物理触屏、另一台机器字体、生产后端/保存/同步。没有最终视觉、全局对比度或辅助技术批准。旧G3缺少相同数据的完整课程/设备页，旧截图仅为结构基线，不能声称公平的旧新业务优劣实验。文档结构校验与组件运行检查分开；公共发布、迁移、Figma、Git提交推送和分支切换均未执行。

## 供评审的截图

[旧基线](baseline-1440.png) · [考试页](S01-focus-1440.png) · [课程页](C01-focus-1440.png) · [编辑页](final-review-editor.png) · [共同状态](shared-state-board.png) · [设备预约](lab-1440x900.png)。

[A修改前](final-review-a-before.png) · [A修改后](final-review-a-after.png) · [B修改前](final-review-b-before.png) · [B修改后](final-review-b-after.png)。B两张PNG SHA相同；实际范围和可见窗口限制详见复核记录。

## 工作包逐项回填

Canonical `acceptance/results.json` 保留48个V与12个E的原ID/顺序，60条运行记录pass，60条设计pending-review。每条均包含步骤、真实观察、命令/退出码、证据路径和来源锁；全部引用文件存在。

E07 / E09的附加检查见 [矩阵事实](e07-e09-supplement-facts.json) 和 [脚本](e07-e09-supplement.mjs)：4视口×3区域关系、4视口×5班级数量通过；同组相同数据、字体、图标，主区可用宽度和空间成本有实际读数。同步fixture不存在异步响应，未强造异步引擎来通过不适用条件。

`python3 scripts/validate_package.py --report execution/package-qa-run.json` 在canonical工作包目录运行，exit0。12 ID、28角色、48原检查、E01—E08原文与新增E09—E12、86项原始来源哈希及本地文档链接通过。该命令只验证交接文件，不算组件验收或设计批准。

## 2026-09-23 组件复用修正批次

针对完整页里重复实现的输入与反馈，考试搜索改用已有 Input 的前置图标，新建/编辑入口改用 Button，状态筛选和各处范围选择改用 Select；考试清单改用 Table，状态用 StatusTag/Tag，空结果用 Empty。课程分页改用 Pagination，单元与命令草稿改用 Textarea/FormItem，错误与范围提示改用 Alert；设备状态用 SystemStatusTag。业务范围、数据和导航状态仍由候选页面持有。清掉这些控件外围重复的聚焦边框，避免双焦点。没有改公共组件源码、Token、默认值或旧 G3。

可运行入口：[考试完整页](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=platform&page=exams&recipe=S02&view=page&count=4)、[课程完整页](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=course&page=course-content&recipe=S05&view=page&count=4)、[命令组合](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=commands&recipe=M01&view=page&count=4)、[设备预约](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=lab&recipe=S05&view=page&count=4)。

真实核验：候选 Playwright **70/70 pass**（含新增4项复用回归）、候选单测 **12/12 pass**、prototype 构建与类型检查均 exit0；[稳定浏览器结果](component-reuse-playwright-results.json)、[测试摘要](component-reuse-test-summary.json)、[本批来源锁](component-reuse-source-lock.json)。`pnpm typecheck` 全仓运行 exit1，错误在未改动的 `packages/ui/src/command/command.test.tsx:20`（TS2322）；不把 prototype 通过冒充全仓通过。原上方66/66及21/21是历史批次，未重写。

本批真实截图：[考试表格与控件](relation-edge.png)、[课程页](S05-1440x900.png)、[设备页](lab-1440x900.png)、[双实例](isolation-after.png)。视觉结论保持 `pending-review`；屏幕阅读器、物理触屏、生产后端为 `not-run`。下一步由小文审阅完整页面的尺寸、密度、颜色与状态，再按意见调整本地候选。

## 2026-09-23 八条浏览器视觉批注修正

S01/S02 侧栏品牌名18→16、头部上下内边距20→16，品牌位置使用图库已有 `RainClassroomIcon`。全局入口现在分别使用 home/course/resource/exam-library/learning-status/members/message/settings-3 八个不同的线性图标；入口文字15、图标16，非当前图标变浅。课程展开控件以 ArrowUp/ArrowDown 表达状态并使用较浅图标色。教学空间分组标签降权；页面最大标题为16。修改仅在候选 `parts.tsx`、`rebuild.css`，没有新公共Token或断点。浅色分组标签使用现有 neutral-4/5 各半混合以兼顾浅色外观与文字对比度，深色直接用 neutral-5；实测分别4.52:1、5.56:1。非文字箭头对比度按3:1检查，文字仍按4.5:1；没有放宽文字检查。

预览：[S02浅色工作台](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=platform&page=home&course=math&scope=package&recipe=S02&view=page&count=4)、[S01深色考试](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=platform&page=exams&course=math&scope=package&recipe=S01&view=page&count=4)、[S04图标轨](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=platform&page=exams&course=math&scope=package&recipe=S04&view=page&count=4)。截图：[S02 1357×790](visual-feedback-S02-1357x790.png)、[S02 1130×728](visual-feedback-S02-1130x728.png)、[S01 1281×728](visual-feedback-S01-1281x728.png)、[S04 1200×800](visual-feedback-S04-1200x800.png)、[S06 1357×790](visual-feedback-S06-1357x790.png)。

最终源码下完整候选浏览器 **71/71 pass**，4个候选单测文件 **12/12 pass**，prototype构建与类型检查exit0；[浏览器JSON](visual-feedback-playwright-results.json)、[测试摘要](visual-feedback-test-summary.json)、[几何和样式实测](visual-feedback-measurements.json)、[对比度](visual-feedback-contrast-and-targets.json)、[本批源码锁](visual-feedback-source-lock.json)。原始自动对比度检查将无文字箭头当正文按4.5:1评估而报错；区分非文字图形3:1和正文4.5:1后完整回归通过。保护快照2072/2072及锁文件未变。全仓类型检查本批 `not-run`（上批已有未改动公共测试TS2322），屏幕阅读器/物理触屏/其他机器字体/生产后端仍 `not-run`，最终视觉 `pending-review`。

## 2026-09-23 后续十三条浏览器批注

完成批注1—12：侧栏点击区域36px而箭头图形12px；N02文字15px、选中线对齐已有Tabs 38规格；深色分组提示变浅；数字徽标全圆角且选中数字跟文字品牌色；二级入口及课程五个导航图标改用现有互异轮廓图标；菜单快捷键缩小、降对比、去边框并与名称拉开；子菜单改线性箭头；边缘指示条两端全圆角。批注13明确要求班级范围栏暂不动，保持 `pending-discussion`。没有为截图尺寸新设断点。

预览：[课程侧栏](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=course&page=course-overview&course=math&scope=package&recipe=S02&view=page&count=200)、[N02顶部导航](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=platform&page=resources&course=math&scope=package&recipe=N02&view=page&count=200)、[N03二级入口](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=tools&page=resources&course=math&scope=package&recipe=N03&view=page&count=200)、[M01命令](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=commands&page=courses&course=math&scope=package&recipe=M01&view=page&count=200)。真实整页截图：[课程](visual-feedback-2-course.png)、[顶部](visual-feedback-2-topnav.png)、[工具面板](visual-feedback-2-panel.png)、[命令](visual-feedback-2-command.png)。

最终候选浏览器 **74/74 pass**，单测 **12/12 pass**，prototype build/typecheck exit0；[稳定浏览器结果](visual-feedback-2-playwright-results.json)、[真实测试摘要](visual-feedback-2-test-summary.json)、[本批源码锁](visual-feedback-2-source-lock.json)。新增测试首轮有颜色格式与当前状态选择器错误、次轮有菜单ARIA名称选择器错误；修正测试后聚焦3/3和全量74/74通过，未为测试修改产品逻辑。深色分组文字实测6.39:1，浅色保持4.52:1；浅色菜单快捷键实测4.52:1，低于选项文字的视觉权重。2072个既有公共/旧G3保护路径与lockfile未变。全仓类型检查、旧G3本批回归、真实屏幕阅读器、物理触屏、其他机器字体、生产后端均 `not-run`；最终视觉 `pending-review`。

## 2026-09-24 八条平台页视觉批注

按 V04、V05、I01 处理文字层级、已有部件适配和表格信息角色。只改本地 G3 候选：`apps/prototype/src/scenarios/token-first-g3/rebuild/parts.tsx`、`page.tsx`、`rebuild.css`，并更新 `tests/e2e/navigation-rebuild-visual-feedback.spec.ts`、`navigation-rebuild-visual-feedback-2.spec.ts`。品牌文字改为15；导航收起控件靠右并降权；页脚次要说明变浅；教师标识使用图库中可导入的 `teacher-student-profile`。页面删去重复说明，正文上下内边距改为16；既有900px以下规则保留左右20、上下16，不按1077px截图新建断点。表格名称改为15号深色加粗普通文字，编号与更新时间各有独立列；“查看详情”仍打开对应条目，操作列在窄容器中固定于右侧。公共Token、共享组件默认与班级范围栏未改。

预览：[N04 资源中心完整页](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=platform&page=resources&course=math&scope=package&recipe=N04&view=page&count=200)。真实截图：[1077×793](visual-feedback-3-platform-1077.png)、[390×844](visual-feedback-3-platform-390.png)。390px 下完整表格仍需横向滚动，操作列保持可见。

真实核验：完整候选浏览器 **75/75 pass**（[运行日志](visual-feedback-3-playwright.log)）；候选单测 **12/12 pass**；prototype 类型检查、构建均 exit0。新视觉用例首轮详情面板名称断言与真实可访问名称不符，修正测试并同步修复资源页详情标题映射；首次全套 **74/75** 是浅色“收起导航”文字仅3.71:1，改为现有较弱且满足4.5:1的文字角色后，单项和全套均通过。后来新增390px截图/操作可见性检查，单项 **1/1 pass**。完整浏览器回归使用最终产品源码；该新增390px检查在全套回归后单独运行。

最终视觉仍为 `pending-review`；真实屏幕阅读器、物理触屏、其他机器字体、生产后端和本批全仓门禁为 `not-run`。下一步由用户审阅完整页视觉，尤其是弱提示层级与窄屏表格的横向阅读体验。

## 2026-09-24 课程建设列表五条批注

图标轨模式把导航展开图标居中，完整模式维持靠右。页面标题与工具栏、工具栏与表格的垂直间距均为12px。考试数改为14号并放到工具栏最左；搜索、状态筛选和新建考试依次靠右。表格把更新时间移到参与人数后面并降为次要文字色，状态、人数、操作三列居中，操作改为“详情”。本地候选表格用现有12px间距Token收紧单元格左右留白，并把名称列最小宽度设为200px，使1124px完整导航下更新时间完整可读；900px以下沿用原有180px规则和横向滚动。共享表格、Token与其他页面未改。

审阅预览：[N04 课程建设完整页](http://127.0.0.1:4175/#token-first-g3?rebuild=1&scene=platform&page=courses&course=math&scope=package&recipe=N04&view=page&count=200)。截图：[完整导航1124×807](visual-feedback-4-courses-1124.png)、[图标轨1124×807](visual-feedback-4-courses-collapsed-1124.png)、[资源中心1077×793](visual-feedback-4-resources-1077.png)、[资源中心390×844](visual-feedback-4-resources-390.png)。

独立4175构建预览下，相关浏览器检查 **5/5 pass**，候选单测 **12/12 pass**，prototype构建与类型检查exit0。原4174开发服务当前对并行新增的Breadcrumb模块返回500，页面空白；未中断该服务，也未把4175的通过冒充4174通过。完整候选浏览器回归本批 `not-run`；最终视觉仍 `pending-review`。

## 2026-09-24 宽表格与图标轨续批（含 S08 hover）

继续以本地 G3 候选的 V04 信息层级、V05 组件局部适配、I01 表格信息角色处理。宽表格恢复共享 Table 原有的左右16px；仅当表格容器不超过820px时用12px，保证1124px完整侧栏布局仍能显示完整时间。这个阈值由七列表格的实际占宽决定，不以本次1495px截图作为全局断点。更新时间用现有 neutral-4/5 文字色混合，较原色更浅且浏览器实测对比度仍≥4.5:1。筛选与新建考试之间加入24px高的淡分隔线；图标轨的品牌和用户头像居中到导航图标轴线。

S08 表格的操作列为固定单元格，原白底遮住了行 hover 与选中底色；现在只在该列叠加同一状态色和不透明底层，横向滚动时也不会透出下方文字。共享 Table 和公共 Token 未修改。

审阅截图：[1495px完整导航](visual-feedback-5-courses-1495.png)、[1495px图标轨](visual-feedback-5-courses-icon-1495.png)、[1124px完整导航](visual-feedback-5-courses-1124.png)、[390px](visual-feedback-5-courses-390.png)、[S08 行悬停](visual-feedback-5-S08-hover.png)。4175构建预览下，本批定向浏览器检查 **2/2 pass**，候选单测 **12/12 pass**，prototype build/typecheck exit0；完整候选浏览器回归、人工视觉审核和真实辅助技术检查仍未执行或待审核。

## 2026-09-24 课程测试工具移出业务布局

按 V05 局部组件适配处理。删除课程工作区中贯穿整行的测试工具栏，将班级样本数量和加载模拟收进顶部预览控制区的“课程测试”Popover，默认关闭；专注预览不渲染该入口。课程导航收起／恢复改为内容标题左侧的现有 IconButton，控件始终留在可见主区，保持原有可访问名称、展开状态和键盘焦点。所有课程布局共用这一实现，不新增断点，不修改共享组件或公共 Token；班级范围栏本身未改。

4175 构建预览下，定向 Playwright **2/2 pass**：验证 C01、S08、S05 没有内部工具栏占位，课程侧栏收起释放超过200px宽度，恢复后焦点保留；验证测试弹层内班级数量切换与分页、加载模拟及恢复、专注预览隐藏测试入口、390px主区无页面横向溢出。prototype build/typecheck exit0。运行命令：`pnpm exec playwright test tests/e2e/navigation-rebuild-visual-feedback-2.spec.ts tests/e2e/navigation-rebuild-reuse.spec.ts --grep 'course preview|course fixtures' --config=/private/tmp/g3-feedback6-playwright.config.ts`（临时配置仅指定本仓tests/e2e与4175 baseURL，运行后删除）；`pnpm --filter @rain-next/prototype build`。

已检查真实截图：[S08课程页](visual-feedback-6-S08-course.png)、[C01课程页](visual-feedback-6-C01-course.png)、[S05课程页](visual-feedback-6-S05-course.png)、[测试面板](visual-feedback-6-test-panel.png)、[专注预览](visual-feedback-6-focus.png)、[390px收起侧栏](visual-feedback-6-course-390.png)。完整候选浏览器套件与真实辅助技术本批 not-run；人工设计结论仍 pending-review。

## 2026-09-24 顶部导航与课程侧栏两条批注

C01 顶部全局导航上下内边距从8px改为0，水平间距保持原有24px、600px以下保持既有12px；移除原64px最小高度，让导航本身决定行高。规则作用于使用相同顶部导航外壳的C01/N01/N02/S08，不新增截图专属断点。

课程侧栏展开时，收起IconButton放在侧栏身份区顶部，与“返回我的课程”同排；收起后恢复IconButton留在课程页面左上缘并使用既有surface强调态，使其可见且不随内容滚动消失。恢复时焦点回到侧栏按钮。保留Split受控宽度、导航语义、aria-expanded/controls及键盘操作，未修改共享组件与Token。此处仅改候选页面的局部布局配方，按V04/V05检查导航层级、位置和完整状态。

4175构建预览：prototype build/typecheck exit0；定向浏览器检查1/1通过，覆盖1236px的C01/S08/S05、顶部上下0px、按钮位于侧栏内部、收起后距离课程页面左缘8px、键盘焦点与重新展开、390px无页面横向溢出。原有长课程名称验收脚本硬编码4174，直接运行在该服务停载状态下超时；临时副本改用4175并另存截图后，该验收与定向测试合计2/2通过。临时脚本与测试配置已删除。用户当前4175课程页已刷新。

真实截图：[C01展开](visual-feedback-7-C01-course.png)、[C01收起](visual-feedback-7-C01-collapsed.png)、[S05长课程名](visual-feedback-7-course-long-name.png)、[390px侧栏收起](visual-feedback-7-course-390.png)。最终视觉仍pending-review；完整浏览器套件、真实辅助技术本批not-run。

## 2026-09-24 收起态课程导航恢复页签

按用户1024px批注将恢复按钮贴到课程页面左缘（left:0），左上/左下圆角为0、右上/右下保持现有6px；改用中性图标与白色表面，右侧与上下使用现有neutral-4淡描边，左侧不描边。用IconButton的本地Recipe限定视觉覆盖，布局定位留在页面className；聚焦描边向内收，避免贴边后被容器裁切。无需新增断点，390px沿用同一形态。附件中的Jira图仅作页签关系参考，没有复制其业务导航。

4175构建预览下，prototype build/typecheck exit0；定向浏览器1/1通过，检查C01/S08/S05收起恢复、按钮与课程页面左缘对齐、圆角/描边/中性色、键盘焦点和390px无页面横向溢出。截图：[1024px收起态](visual-feedback-8-C01-collapsed.png)、[1024px展开态](visual-feedback-8-C01-course.png)、[390px收起态](visual-feedback-8-course-390.png)。完整候选浏览器套件与人工视觉接受仍未执行。
