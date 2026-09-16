# 资料表格与卡片的一致性

2026-09-14，用户确认字段层级与操作规则后明确“开始实施”。现有 local-experiment 资料配方采用 Prototype Mode；为局部颜色补齐既有消费者登记及生成合同的部分按 System Mode 验证。沿用当前工作树；公共 Card 保持非交互内容容器。

已确认：类型使用中性描边 Tag；已发布使用绿色浅填充 Tag，草稿使用中性浅填充 Tag。标题最突出，时间独立为较小、较浅的辅助文字。表格更多操作使用主题色文字按钮；卡片左上角勾选、右上角常显灰色更多按钮。仅勾选框改变选择；空白、标题、标签和菜单不选择卡片。两种视图共享菜单、权限、筛选、排序、分页与选中记录。卡片补齐当前页全选和按资料名称排序入口。

实施范围：apps/prototype/src/data-table-recipe.tsx/.css、现有单元与 Table 浏览器测试、scripts/token-foundation-outputs.mjs 及其生成合同 manifests/contracts/token-foundations-v1.json。复用 Card、Tag、Checkbox、Button、IconButton、DropdownMenu、Grid；复用 more-actions 规则的 icon/more-horizontal 静态入口（available，来源52:68）。已发布复用 tagSystemProfiles.success 对应的绿色 classroom 配色。局部 Card Recipe 只调整表头布局及已选底色，消费现有 Fill/Brand/Alpha/4；辅助文字消费 Text/Neutral/4。不新增公共 API、Token、依赖或业务配置引擎。

局部 CSS 登记：`.data-table-recipe .material-card[data-selected="true"]` 只给当前配方的已选卡片着色，选择语义仍来自 Checkbox；`.data-table-recipe .data-table-metadata` 统一表格/卡片时间及只读说明。两个精确选择器的 Token 用途、父背景和验证由 getMaterialRecipeColorConsumers 登记，不改校验器或共享组件。布局继续使用现有 Parts/Inline/Stack；最新规则见下方“主信息连续修订”。

验证：资料配方单元；Chromium/Firefox/WebKit 中选择、全选、跨页/排序/筛选/视图切换、菜单权限与键盘焦点；浅深主题、两种密度、320px/390px和长标题截图与几何。类型、构建、治理检查。Browser plugin not available，沿用仓库 Playwright。尚待验证：实际组合的窄屏几何、文字对比度与菜单焦点。

本轮方案确认不等于运行视觉验收；新运行视觉待用户查看。独立审阅未运行；公共组件原有 Human Gate、对比度、发布等状态不由本轮推进。

## 实施与验证结果

实施完成，运行视觉待用户确认。5/5资料配方单元通过；Chromium/Firefox/WebKit共21/21场景通过（49.4秒，零重试）。包括仅勾选框选择、菜单权限和键盘关闭后焦点恢复、当前页全选/跨页保留、排序与视图切换、加载/失败/空态，以及浅深主题×两种密度、390px/320px和长标题。类型检查与 Playground/Prototype 构建通过；构建保留既有分包体积提示。完整治理及最终颜色消费者校验通过，未改变既有待评审项。

辅助文字在普通、已选、hover背景的浅深主题组合中对比度为4.950–5.622，均≥4.5。该结果只覆盖本次已登记文字，不代表全库对比度验收。普通与已选浅色桌面、深色窄屏及对应表格截图已人工检查。

初次验证发现并修正：Tag没有通用green枚举，改用现有success配色；新增截图误用了被Card固定身份覆盖的属性，改为实际局部容器；Firefox的程序化focus不等于键盘focus-visible，验证改走真实Tab/Shift+Tab（WebKit使用Option组合）。最终完整浏览器批次全部通过。

日志、测量与截图：`/tmp/rain-table-card-parity/`；最终浏览器证据在`verified-browser/`，日志`verified-browser.log`；单元、类型、构建、治理分别为`unit.log`、`typecheck.log`、`build.log`、`governance.log`；文字测量为`color-measurements.json`。本次未提交Git、发布或写入Figma。

## 主信息连续修订

2026-09-14，用户截图反馈同排卡片标题下方留白不自然，确认“主信息连续，权限说明后置”并授权“开始实施”。该决策替代上一轮标签/时间整体靠底的布局。Prototype Mode，仅修改资料配方、现有浏览器检查和本文。

移除主内容的自动顶部外距，标题→标签间隔12px，标签→时间间隔8px；权限说明移到时间之后，保持8px间距及原有Checkbox的描述关联。卡片继续按同行等高，余量留在主信息之后；长标题自然换行，不截断。复用原组件与Token，不改变选中、菜单、表格和筛选逻辑。

验证方法：复用资料单元和三浏览器卡片交互/视觉场景，测量同排等高、标题/标签/时间/权限说明间距，检查长标题及320px/390px、浅深主题和两种密度。类型及治理检查；截图存于`/tmp/rain-card-content-flow/`。本次新运行视觉仍待用户确认。

本次实施完成：资料单元5/5、三浏览器卡片场景6/6（18.5秒，零重试）、类型检查、完整治理及diff检查通过。实测标题→标签12px、标签→时间8px、时间→权限说明8px；同排等高，320px/390px长标题不挤占更多按钮。已查看浅色桌面及深色320px截图。仅复跑本次受影响场景，未重跑生产构建或完整Table浏览器套件；独立审阅未运行，视觉验收待用户确认，未改发布/Git状态。

## 复用新版Empty

2026-09-14用户要求检查并直接调用已有空状态组件。Prototype Mode，仅调整现有资料配方和对应浏览器验证。已有两个空态原本只组合Empty标题、说明、操作，缺少新版EmptyMedia。补齐无资料的empty-box和筛选无结果的empty-search；表格和卡片共用同一分支，外侧上下留白复用Space/24，空数据添加按钮使用已确认mini尺寸。保留状态标题与对应恢复说明、工具栏清空筛选；加载、失败及只读仍按原语义处理。公共Empty实现与验收状态不改。

验证：资料单元、三浏览器既有加载/失败/空数据/筛选无结果场景；在浅色表格和深色卡片检查原稿图像加载、唯一可见主题图像、恢复操作及320px无溢出。日志和截图存于`/tmp/rain-table-empty-reuse/`。

实施完成：资料单元5/5、三浏览器空状态场景3/3（18.3秒，零重试）、类型检查、完整治理和diff检查通过。已查看浅色搜索无结果、深色无资料卡片、深色320px截图；组件原稿随主题正确加载，添加按钮28px，清空/添加/失败重试流程通过。本批未重跑生产构建或完整浏览器套件；公共组件既有视觉确认保留，本次组合视觉待用户查看；未做独立审阅、Git提交或发布。


## 同步已确认的菜单自适应宽度

2026-09-14用户要求按已新建的自适应规则修复资料更多菜单。根因是本工作树仍使用旧默认280px；主目录已确认的新版实现见 主仓库 `rain-classroom-vibe-ui-spike/docs/plans/2026-09-09-dropdown-family-construction-plan.md` 第15节及同仓库的 `evidence/runtime/dropdown/width-refinement.md`。System Mode，仅同步共享DropdownMenu的TSX/CSS宽度实现及Manifest说明，不导入后续“完成设置”示例。完整条目内容决定宽度，视口允许时最小140px，自动上限320px；显式数值与Popover原有行为保留。表格/卡片共用MaterialActions，无需添加局部固定宽度。

同步源SHA256：TSX `b79118bdc3401d3aeab5cf38b794028771fbbe0c6f5d1a1e625b5c054c70f4cc`；CSS `c0b31c91a2ea6cc500324141397b0aa66a7664c8c7b3d0b098e18a5c138cea29`。RN-06/RN-08历史哈希只对这两个精确源文件回投旧宽度差异，其他改动继续失败；不重写历史快照、原验收或当前阶段状态。测试同时检查变更后的文件不能被此回投接受。

验证范围：共享DropdownMenu/Popover、资料配方与历史边界单元，三浏览器表格/卡片菜单140px及浅深主题、320px视口、只读说明和键盘焦点；既有Dropdown与Tabs More浏览器回归；类型、构建、治理。日志与截图写入 `/tmp/rain-menu-width/`。当前组合运行视觉待用户查看，不扩大源组件既有验收范围；不提交或发布。


实施与验证：同步文件与上游SHA256完全一致。三浏览器资料菜单6/6（20.0秒），共享Dropdown/Tabs回归29/29（50.2秒），类型、Playground/Prototype构建、完整治理、diff检查通过。单元267/268；唯一失败为既有RN-06历史测试仍匹配旧Empty导出行，而当前已增加EmptyMedia及类型导出（`scripts/layouts-v1.test.ts:98`），发生在UI索引检查，与本次两个菜单文件无关，未借本次修改放宽此边界。RN-08、共享Dropdown/Popover、资料配方及新增精确宽度历史回投检查均通过。

已查看浅色桌面及深色320px实景：普通菜单140px，权限说明完整显示，菜单不超视口；Escape焦点返回和操作语义通过。浏览器回归自动生成的Tabs More截图已另存本批目录并恢复仓库历史截图。构建仅保留原有体积提示。本次不表示新的独立审阅或用户视觉验收。
