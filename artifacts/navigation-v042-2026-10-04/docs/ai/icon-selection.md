# Rain Next 图标选择规范

<!-- Generated from packages/foundations/src/icons/semantic-rules.json; canonical JSON SHA-256 bb7907182863f790a535a428ff842ff92ac8169fc964a3353e60815da36b553f. Do not edit. -->

58 个讨论资产的语义合同（原 42 项及本次新增 16 项）；不是 897 项全库语义确认或运行时可用性清单。

本文件提供语义选择与静态引用形式；实际可导入性以生成入口及可用目录为准，不表示 Human Gate 或发布已完成。

## 使用顺序与边界

1. 先按实际行为与组件场景查规则，再查正式资产；中文关键词仅供人和 AI 检索，不参与 resolveSemanticIcon 的运行时匹配。
2. 优先级：当前明确指定 → 可追溯的已确认组件规范 → 已确认场景规则 → 默认。唯一规则直接使用，不重复确认。
3. 同一语义的线性/实心默认只覆盖本文件已登记版本；不按 SVG fill、bold、圆圈或形状猜测，不能推广到全库。
4. 是否出现图标、前后位置、事件、页面打开方式与可访问名称由宿主和实际交互决定。
5. 普通图标颜色跟随宿主，状态语义色由状态宿主提供；固有配色只有经过资产证据确认后保留。
6. more-vertical、close-bold 通常只在用户明确要求，或具体组件的已确认规范明确指定时使用；旧实现、历史说明、窄空间或 AI 偏好不是确认依据。
7. Checkbox/Radio 内部形态遵循各自组件规范。
8. 同优先级冲突先检查规则来源；实际行为不足先查页面上下文，仍无法决定时才澄清缺失部分。
9. 未知语义可继续查询完整图库并记录有依据的任务局部选择，不自动晋升全局默认。
10. 指定资产不存在或不可用时明确报告，不能偷偷换成近似 SVG、Unicode 或外部同名图标。
11. 资产身份、语义确认、渲染可用性、Human Gate 与发布分别记录；没有传入 availableAssets 时不会声明资产已可导入。
12. 已确认的状态配对由宿主按实际业务状态选择当前正式图标；可用 explicitVariant: filled 查询配对资产。选中、展开与加载不会在 resolveSemanticIcon 或 IconButton 内自动选择业务图形。
13. 收藏通过 target: star 或 heart 区分；含糊的喜欢通过 context: heart、thumbs-up 或 applause 区分。关键词重叠不代表图形可以互作唯一默认。
14. 筛选由条件是否生效选择 filter / filter-filled；面板展开独立决定 aria-expanded 与浅底反馈，关闭面板不清除筛选结果。

## 结构化选择合同

`resolveSemanticIcon(request, options?)` 接收结构化的 `intent`、`target`、`context`；匹配值见下表，不读取中文按钮文案。

明确资产使用 `explicitAssetId`，明确样式使用 `explicitVariant`。组件备选需要 `component` 与 `confirmedComponentSpec: { component, assetId, confirmed: true, source }`，其中组件名称必须一致且来源可追溯。

`options.availableAssets` 可传数组或 Set；省略时结果只代表语义选定，可用性为 `not-checked`。该列表不证明目录外资产的颜色模式。

结果为 `selected`、`ambiguous`、`unknown` 或 `unavailable`；冲突与缺少上下文不会静默选第一个候选。

## 已确认场景

| 规则 | 结构化匹配（分号表示或） | 默认资产 | 优先级 | 颜色责任 |
|---|---|---|---|---|
| 编辑 | {"intent":["edit"]} | `icon/edit-pencil` | default | control |
| 内容展开 | {"intent":["expand"]} | `icon/arrow-down` | default | control |
| 内容收起 | {"intent":["collapse"]} | `icon/arrow-up` | default | control |
| 带展开文案的文字按钮 | {"intent":["expand"],"context":["text-button-with-action-label"]} | `icon/double-arrow-down` | scene | control |
| 带收起文案的文字按钮 | {"intent":["collapse"],"context":["text-button-with-action-label"]} | `icon/double-arrow-up` | scene | control |
| 新建对象 | {"intent":["create"]}; {"intent":["add"],"target":["object"]} | `icon/add-bold` | default | control |
| 向集合添加项目 | {"intent":["add"],"target":["collection"]} | `icon/add-circle-outline` | default | control |
| 增加数值 | {"intent":["increase"]}; {"intent":["add"],"target":["value"]} | `icon/add` | default | control |
| 删除对象 | {"intent":["delete"]}; {"intent":["remove"],"target":["object"]} | `icon/delete` | default | control |
| 从集合移除项目 | {"intent":["remove"],"target":["collection"]} | `icon/minus-circle-outline` | default | control |
| 减少数值 | {"intent":["decrease"]}; {"intent":["remove"],"target":["value"]} | `icon/minus` | default | control |
| 搜索 | {"intent":["search"]} | `icon/search` | default | control |
| 筛选 | {"intent":["filter"]} | `icon/filter` | default | control |
| 设置 | {"intent":["settings"]} | `icon/settings-3` | default | control |
| 更多操作菜单 | {"intent":["more-actions"]} | `icon/more-horizontal` | default | control |
| 普通关闭 | {"intent":["close"]} | `icon/close` | default | control |
| 清空已有值 | {"intent":["clear"],"context":["input","select"]} | `icon/circle-close` | default | control |
| 失败或错误提示 | {"intent":["error","failure"]} | `icon/circle-close` | default | status / error |
| 菜单或列表选中 | {"intent":["select"],"context":["menu","list"]} | `icon/check-bold` | default | selection |
| 成功结果提示 | {"intent":["success"]} | `icon/circle-check` | default | status / success |
| 正确结果提示 | {"intent":["correct"]} | `icon/circle-check` | default | status / correct |
| 已完成结果提示 | {"intent":["completed"]} | `icon/circle-check` | default | status / completed |
| 警告提示 | {"intent":["warning"]} | `icon/alert-circle` | default | status / warning |
| 普通提示 | {"intent":["info","information"]} | `icon/info` | default | information |
| 疑问与帮助 | {"intent":["help"]} | `icon/help` | default | information |
| 刷新与重试 | {"intent":["refresh","retry","reload"]} | `icon/refresh` | default | control |
| 恢复默认或初始值 | {"intent":["restore"],"target":["defaults","initial-values"]} | `icon/refresh` | default | control |
| 发布或发送操作 | {"intent":["publish","send"]} | `icon/publish` | default | control |
| 内容已发布 | {"intent":["published"]} | `icon/published` | default | status / published |
| 按钮内页面跳转提示 | {"intent":["navigate"],"context":["button"],"target":["page"]} | `icon/share-alt` | default | control |
| 加载指示 | {"intent":["loading"]} | `icon/button-loading` | default | control |
| 加星收藏 | {"intent":["favorite"],"target":["star"]} | `icon/rating-star` | default | control |
| 爱心收藏与喜欢 | {"intent":["favorite"],"target":["heart"]}; {"intent":["like"],"context":["heart"]} | `icon/favorite` | default | control |
| 拇指点赞 | {"intent":["thumbs-up"]}; {"intent":["like"],"context":["thumbs-up"]} | `icon/like` | default | control |
| 拇指点踩 | {"intent":["thumbs-down"]} | `icon/dislike` | default | control |
| 鼓掌鼓励与恭喜 | {"intent":["applaud"]}; {"intent":["like"],"context":["applause"]} | `icon/like-alt-2` | default | control |
| 图钉固定 | {"intent":["pin"]} | `icon/pin` | default | control |
| 置顶操作 | {"intent":["pin-to-top"]} | `icon/pin-top-alt-2` | default | control |
| 侧栏与目录面板展开 | {"intent":["expand"],"context":["sidebar","directory-panel"]} | `icon/expand` | scene | control |
| 侧栏与目录面板收起 | {"intent":["collapse"],"context":["sidebar","directory-panel"]} | `icon/collapse` | scene | control |

### 编辑 · edit

需要图标的编辑操作。

查询关键词：编辑、修改。

- 不因一级按钮、悬停、按下、选中或禁用改为实心。
- 不以旧 icon/edit 自动替代默认。

- 明确 filled：`icon/edit-pencil-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { EditPencilIcon } from "@rain-next/ui/icons/edit-pencil";`

### 内容展开 · expand

一般组件或页面的内容展开。

查询关键词：展开、内容展开。

- 全屏、放大与缩放。
- 带展开文案的文字按钮优先使用双箭头。

- 明确 solid-triangle：`icon/chevron-down`。通常仅在用户明确要求实心三角时使用。

静态引用：`import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";`

### 内容收起 · collapse

一般组件或页面的内容收起。

查询关键词：收起、内容收起。

- 退出全屏或缩小。
- 带收起文案的文字按钮优先使用双箭头。

- 明确 solid-triangle：`icon/chevron-up`。通常仅在用户明确要求实心三角时使用。

静态引用：`import { ArrowUpIcon } from "@rain-next/ui/icons/arrow-up";`

### 带展开文案的文字按钮 · text-button-expand

带展开文案的文字按钮；优先于通用内容展开。

查询关键词：展开更多、展开文字按钮。

- 更多操作菜单。
- 没有展开文案的其他文字按钮。

- 明确 solid-triangle：`icon/chevron-down`。通常仅在用户明确要求实心三角时使用。

静态引用：`import { DoubleArrowDownIcon } from "@rain-next/ui/icons/double-arrow-down";`

### 带收起文案的文字按钮 · text-button-collapse

带收起文案的文字按钮；优先于通用内容收起。

查询关键词：收起文字按钮。

- 其他文字按钮。

- 明确 solid-triangle：`icon/chevron-up`。通常仅在用户明确要求实心三角时使用。

静态引用：`import { DoubleArrowUpIcon } from "@rain-next/ui/icons/double-arrow-up";`

### 新建对象 · create-object

实际创建新的对象，即使文案写作添加课程。

查询关键词：新建、创建、新建课程、新建试卷。

- 加入已有集合。
- 数值增加。
- bold 不等于实心变体。


静态引用：`import { AddBoldIcon } from "@rain-next/ui/icons/add-bold";`

### 向集合添加项目 · add-to-collection

向当前集合加入成员、题目等项目。

查询关键词：添加、加入、添加成员、添加题目。

- 实际创建对象。
- 数值增加。

- 明确 filled：`icon/add-circle-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { AddCircleOutlineIcon } from "@rain-next/ui/icons/add-circle-outline";`

### 增加数值 · increase-value

数值或数量增量操作。

查询关键词：加、增加数值、增加数量。

- 新建对象。
- 向集合添加项目。


静态引用：`import { AddIcon } from "@rain-next/ui/icons/add";`

### 删除对象 · delete-object

删除对象或记录本身。

查询关键词：删除、删除对象、删除记录。

- 仅移出集合但保留原对象。
- 清空输入值。


静态引用：`import { DeleteIcon } from "@rain-next/ui/icons/delete";`

### 从集合移除项目 · remove-from-collection

从集合移除项目，不一定删除原对象。

查询关键词：移除、减去、移出集合。

- 删除对象本身。
- 数值减少。

- 明确 filled：`icon/minus-circle-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { MinusCircleOutlineIcon } from "@rain-next/ui/icons/minus-circle-outline";`

### 减少数值 · decrease-value

数值或数量减量操作。

查询关键词：减、减少数值、减少数量。

- 删除对象。
- 从集合移除项目。


静态引用：`import { MinusIcon } from "@rain-next/ui/icons/minus";`

### 搜索 · search

搜索入口或搜索输入框。

查询关键词：搜索、查询。



静态引用：`import { SearchIcon } from "@rain-next/ui/icons/search";`

### 筛选 · filter

筛选操作。

查询关键词：筛选、过滤。


- 明确 filled：`icon/filter-filled`。宿主明确表示筛选条件已生效时使用；是否展开筛选面板不决定此配对图形。

静态引用：`import { FilterIcon } from "@rain-next/ui/icons/filter";`

### 设置 · settings

设置入口。

查询关键词：设置。


- 明确 filled：`icon/settings-3-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { Settings3Icon } from "@rain-next/ui/icons/settings-3";`

### 更多操作菜单 · more-actions

展开额外操作菜单的入口。

查询关键词：更多操作、更多菜单。

- 展开更多内容。
- 空间较窄、竖向布局不自动改用竖向三点。

- 明确 filled：`icon/more-horizontal-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { MoreHorizontalIcon } from "@rain-next/ui/icons/more-horizontal";`

### 普通关闭 · close

普通页面或弹层关闭。

查询关键词：关闭、关闭页面、关闭弹层。

- 清空输入或选择器值。
- 错误结果提示。
- 更醒目不构成使用 close-bold 的依据。


静态引用：`import { CloseIcon } from "@rain-next/ui/icons/close";`

### 清空已有值 · clear-value

输入框或选择器已有值的清空操作，颜色随控件。

查询关键词：清空、清除选择、清除输入。

- 关闭页面或弹层。
- 不因为叉号外形自动使用错误颜色。

- 明确 filled：`icon/circle-close-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { CircleCloseIcon } from "@rain-next/ui/icons/circle-close";`

### 失败或错误提示 · error-result

操作失败或错误结果提示，颜色由错误状态宿主提供。

查询关键词：错误、失败、操作失败。

- 清空输入时仍是操作色。
- 普通关闭。

- 明确 filled：`icon/circle-close-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { CircleCloseIcon } from "@rain-next/ui/icons/circle-close";`

### 菜单或列表选中 · selected-item

菜单或列表选中标记，颜色跟随选中样式。

查询关键词：选中、菜单选中、列表选中。

- Checkbox 或 Radio 内部形态。
- 成功、正确、已完成结果提示。


静态引用：`import { CheckBoldIcon } from "@rain-next/ui/icons/check-bold";`

### 成功结果提示 · success-result

成功结果提示，包括发布或发送成功反馈。

查询关键词：成功、发布成功、发送成功。

- 内容当前已发布状态。
- 菜单或列表选中。

- 明确 filled：`icon/circle-check-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { CircleCheckIcon } from "@rain-next/ui/icons/circle-check";`

### 正确结果提示 · correct-result

结果正确的提示。

查询关键词：正确、结果正确。

- 菜单或列表选中。

- 明确 filled：`icon/circle-check-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { CircleCheckIcon } from "@rain-next/ui/icons/circle-check";`

### 已完成结果提示 · completed-result

通用已完成结果提示。

查询关键词：已完成、完成结果。

- 未讨论的具体业务状态。
- 内容当前已发布应使用 published。

- 明确 filled：`icon/circle-check-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { CircleCheckIcon } from "@rain-next/ui/icons/circle-check";`

### 警告提示 · warning

风险、警告或异常提示，颜色由警告状态宿主提供。

查询关键词：警告、风险、异常提示。


- 明确 filled：`icon/alert-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { AlertCircleIcon } from "@rain-next/ui/icons/alert-circle";`

### 普通提示 · information

普通或中性的用户提示。

查询关键词：普通提示、中性提示、信息提示。

- 题型图标或题型关键词。
- Figma 原标题纠错不代表已回写源文件。

- 明确 filled：`icon/info-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { InfoIcon } from "@rain-next/ui/icons/info";`

### 疑问与帮助 · help

中性帮助、疑问或补充说明。

查询关键词：疑问、帮助、补充说明。


- 明确 filled：`icon/help-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { HelpIcon } from "@rain-next/ui/icons/help";`

### 刷新与重试 · refresh

刷新、重试或重新加载。

查询关键词：刷新、重试、重新加载。

- 重新编辑仍是编辑。
- 再次发送仍按发送规则。
- Loading 不能用静态 refresh 替代。


静态引用：`import { RefreshIcon } from "@rain-next/ui/icons/refresh";`

### 恢复默认或初始值 · restore-defaults

恢复明确指回到默认设置或初始值。

查询关键词：恢复默认设置、恢复初始值、重置为默认。

- 撤销上一步。
- 恢复已删除内容。
- 其他未确认的恢复行为。


静态引用：`import { RefreshIcon } from "@rain-next/ui/icons/refresh";`

### 发布或发送操作 · publish-action

发起发布或发送操作，颜色随控件。

查询关键词：发布、发送、再次发送。

- 成功反馈用 circle-check。
- 已发布业务状态用 published。

- 明确 filled：`icon/publish-filled`。通常仅在用户明确要求同语义实心版时使用。

静态引用：`import { PublishIcon } from "@rain-next/ui/icons/publish";`

### 内容已发布 · published-state

标记内容当前处于已发布状态。

查询关键词：已发布、当前已发布。

- 不是 publish 的实心版本。
- 不是发布成功反馈。
- 不自动用作已发送业务状态。


静态引用：`import { PublishedIcon } from "@rain-next/ui/icons/published";`

### 按钮内页面跳转提示 · button-page-navigation

在按钮内需要图标提示点击后前往另一个页面时使用。

查询关键词：跳转、前往页面、页面跳转。

- 分享或转发。
- 不决定是否展示图标、前后位置或当前页/新标签打开方式。
- 同页锚点、弹层、抽屉或内容展开。


静态引用：`import { ShareAltIcon } from "@rain-next/ui/icons/share-alt";`

### 加载指示 · loading

加载指示保留正式图形、透明渐隐及宿主颜色。

查询关键词：加载、Loading。

- 静态进度图。
- 用 refresh 替代加载资产。


静态引用：`import { ButtonLoadingIcon } from "@rain-next/ui/icons/button-loading";`

### 加星收藏 · favorite-star

采用星形标记的收藏或加星操作；宿主明确选择 star 语义。

查询关键词：收藏、加星、星标。

- 未区分星形与爱心的含糊收藏。
- 数值评分与半星评分需按其组件规范选择。

- 明确 filled：`icon/rating-star-100`。宿主明确需要已加星的配对图形时使用；不因 hover、pressed 或 disabled 自动换图。

静态引用：`import { RatingStarIcon } from "@rain-next/ui/icons/rating-star";`

### 爱心收藏与喜欢 · favorite-heart

采用爱心标记的收藏或喜欢操作；宿主明确选择 heart 语义。

查询关键词：收藏、喜欢、爱心。

- 拇指点赞或鼓掌鼓励。
- 未区分图形含义的含糊收藏或喜欢。

- 明确 filled：`icon/favorite-filled`。宿主明确需要已收藏或已喜欢的爱心配对图形时使用。

静态引用：`import { FavoriteIcon } from "@rain-next/ui/icons/favorite";`

### 拇指点赞 · thumbs-up

通过拇指向上表达点赞或赞同。

查询关键词：喜欢、点赞、赞同。

- 爱心收藏或鼓掌鼓励。

- 明确 filled：`icon/like-filled`。宿主明确需要已点赞的配对图形时使用。

静态引用：`import { LikeIcon } from "@rain-next/ui/icons/like";`

### 拇指点踩 · thumbs-down

通过拇指向下表达点踩或不赞同。

查询关键词：不喜欢、点踩、不赞同。

- 通用错误、失败或删除操作。

- 明确 filled：`icon/dislike-filled`。宿主明确需要已点踩的配对图形时使用。

静态引用：`import { DislikeIcon } from "@rain-next/ui/icons/dislike";`

### 鼓掌鼓励与恭喜 · applaud

使用双手鼓掌图形表达鼓励、喝彩或恭喜。

查询关键词：喜欢、鼓励、恭喜、鼓掌。

- 普通拇指点赞或爱心收藏。

- 明确 filled：`icon/like-alt`。用户确认的后掌填充版；前方手掌仍保留空心，不是整枚图形完全实心。

静态引用：`import { LikeAlt2Icon } from "@rain-next/ui/icons/like-alt-2";`

### 图钉固定 · pin

使用图钉标记固定对象或入口。

查询关键词：pin、图钉、固定。

- 带顶端横线和上箭头的置顶操作。

- 明确 filled：`icon/pin-top-alt`。用户确认由斜向线框图钉切换为直立实心图钉；保留正式资产的方向变化，不重画为同轮廓。

静态引用：`import { PinIcon } from "@rain-next/ui/icons/pin";`

### 置顶操作 · pin-to-top

使用顶端横线与带竖杆的上箭头表达置顶。

查询关键词：置顶。

- 图钉固定配对。
- 返回页面顶部的滚动导航。
- 未提供独立的实心版或取消置顶图形；同一图形是否表示持续状态由宿主决定。


静态引用：`import { PinTopAlt2Icon } from "@rain-next/ui/icons/pin-top-alt-2";`

### 侧栏与目录面板展开 · panel-expand

侧栏或目录面板的展开入口，图形为内容横线与朝右三角。

查询关键词：展开、侧栏展开、目录展开。

- 通用内容展开仍使用 arrow-down。
- 带展开文案的文字按钮仍使用 double-arrow-down。
- 全屏、放大与缩放。


静态引用：`import { ExpandIcon } from "@rain-next/ui/icons/expand";`

### 侧栏与目录面板收起 · panel-collapse

侧栏或目录面板的收起入口，图形为内容横线与朝左三角。

查询关键词：收起、侧栏收起、目录收起。

- 通用内容收起仍使用 arrow-up。
- 带收起文案的文字按钮仍使用 double-arrow-up。
- 退出全屏与缩小。


静态引用：`import { CollapseIcon } from "@rain-next/ui/icons/collapse";`

## 已确认备选

- `icon/more-vertical`（竖向更多操作备选）：通常仅用户明确要求，或适用组件的已确认规范明确指定；需要可追溯来源。
- `icon/close-bold`（粗线关闭备选）：通常仅用户明确要求，或适用组件的已确认规范明确指定；不是实心版本。

## 行为示例与反例

| 场景 | 结构化请求 | 预期 |
|---|---|---|
| 默认编辑 | `{"intent":"edit"}` | `{"status":"selected","assetId":"icon/edit-pencil"}` |
| 明确实心编辑 | `{"intent":"edit","explicitVariant":"filled"}` | `{"status":"selected","assetId":"icon/edit-pencil-filled"}` |
| 文字按钮展开 | `{"intent":"expand","context":"text-button-with-action-label"}` | `{"status":"selected","assetId":"icon/double-arrow-down"}` |
| 只有添加文案且行为缺失 | `{"intent":"add"}` | `{"status":"ambiguous"}` |
| 实际创建对象 | `{"intent":"add","target":"object"}` | `{"status":"selected","assetId":"icon/add-bold"}` |
| 向集合加项目 | `{"intent":"add","target":"collection"}` | `{"status":"selected","assetId":"icon/add-circle-outline"}` |
| 输入清空 | `{"intent":"clear","context":"input"}` | `{"status":"selected","assetId":"icon/circle-close","hostRole":"control"}` |
| 失败结果 | `{"intent":"error"}` | `{"status":"selected","assetId":"icon/circle-close","hostRole":"status"}` |
| 按钮内跳转 | `{"intent":"navigate","context":"button","target":"page"}` | `{"status":"selected","assetId":"icon/share-alt"}` |
| 分享无新增默认 | `{"intent":"share"}` | `{"status":"unknown"}` |
| 保留复选框规范 | `{"intent":"select","context":"checkbox"}` | `{"status":"unknown"}` |
| 恢复默认值 | `{"intent":"restore","target":"defaults"}` | `{"status":"selected","assetId":"icon/refresh"}` |
| 恢复删除内容无新增默认 | `{"intent":"restore","target":"deleted-content"}` | `{"status":"unknown"}` |
| 已发送状态无新增默认 | `{"intent":"sent"}` | `{"status":"unknown"}` |
| 普通提示 | `{"intent":"info"}` | `{"status":"selected","assetId":"icon/info"}` |
| 加星收藏 | `{"intent":"favorite","target":"star"}` | `{"status":"selected","assetId":"icon/rating-star"}` |
| 已收藏爱心配对 | `{"intent":"favorite","target":"heart","explicitVariant":"filled"}` | `{"status":"selected","assetId":"icon/favorite-filled"}` |
| 含糊收藏不强制默认 | `{"intent":"favorite"}` | `{"status":"ambiguous","code":"missing-context","missingFields":["target"]}` |
| 含糊喜欢不强制默认 | `{"intent":"like"}` | `{"status":"ambiguous","code":"missing-context","missingFields":["context"]}` |
| 点赞面性配对 | `{"intent":"thumbs-up","explicitVariant":"filled"}` | `{"status":"selected","assetId":"icon/like-filled"}` |
| 点踩面性配对 | `{"intent":"thumbs-down","explicitVariant":"filled"}` | `{"status":"selected","assetId":"icon/dislike-filled"}` |
| 鼓掌后掌填充版 | `{"intent":"applaud","explicitVariant":"filled"}` | `{"status":"selected","assetId":"icon/like-alt"}` |
| 图钉固定配对 | `{"intent":"pin","explicitVariant":"filled"}` | `{"status":"selected","assetId":"icon/pin-top-alt"}` |
| 置顶使用单个正式图形 | `{"intent":"pin-to-top"}` | `{"status":"selected","assetId":"icon/pin-top-alt-2"}` |
| 不杜撰置顶面性版本 | `{"intent":"pin-to-top","explicitVariant":"filled"}` | `{"status":"unknown","code":"unsupported-variant"}` |
| 筛选已生效配对 | `{"intent":"filter","explicitVariant":"filled"}` | `{"status":"selected","assetId":"icon/filter-filled"}` |
| 侧栏展开 | `{"intent":"expand","context":"sidebar"}` | `{"status":"selected","assetId":"icon/expand"}` |
| 目录面板收起 | `{"intent":"collapse","context":"directory-panel"}` | `{"status":"selected","assetId":"icon/collapse"}` |

## 来源与文字修正

- [首次图标语义说明](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2201-85)
- [常见且语义相对固定的 icon](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2201-707)
- 用户逐项确认及实施计划：`docs/plans/2026-09-03-icon-library-migration.md`
- 42 项图形与接入预检：`docs/audits/2026-09-03-icon-migration-preflight.md`
- [常用固定语义图标与状态配对补充](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2244-285)
- 用户确认9组语义及开始修改授权：`docs/plans/2026-09-07-icon-button-implementation.md`

- icon/info / icon/info-filled：原文“普通题型”按用户确认整理为“普通提示”；这是语义记录，Figma 写入状态为 not-performed。
- icon/share-alt：原文“分享”按用户确认整理为“按钮内页面跳转提示”；这是语义记录，Figma 写入状态为 not-performed。

## 58 项讨论资产的身份与引用

| 正式身份 | 主组件 ID | Component Key | 静态入口 | 导出名 |
|---|---|---|---|---|
| `icon/edit-pencil` | 183:574 | f704fc5409bdc8d05e7ed07bcdb98ff21a1af770 | `@rain-next/ui/icons/edit-pencil` | `EditPencilIcon` |
| `icon/edit-pencil-filled` | 183:540 | 8d3b347010ebd80bfe0c7c24d93adf66fb6187a8 | `@rain-next/ui/icons/edit-pencil-filled` | `EditPencilFilledIcon` |
| `icon/arrow-down` | 63:76 | 457881b00122d6cdfc873ab4dd68c5cbaaebd1dd | `@rain-next/ui/icons/arrow-down` | `ArrowDownIcon` |
| `icon/arrow-up` | 63:69 | 052ecb572199b2383143b8dd59b4dac04abf398c | `@rain-next/ui/icons/arrow-up` | `ArrowUpIcon` |
| `icon/double-arrow-down` | 71:35 | b717884e9b614be3ff1414d40c1a83b889cbfb0b | `@rain-next/ui/icons/double-arrow-down` | `DoubleArrowDownIcon` |
| `icon/double-arrow-up` | 71:32 | ee711c2c79a23b136ed33edd260849fd98b8a1bc | `@rain-next/ui/icons/double-arrow-up` | `DoubleArrowUpIcon` |
| `icon/chevron-down` | 8:17 | 60c169aa3c2e000171a6bab361ccc9a1bba8cc5f | `@rain-next/ui/icons/chevron-down` | `ChevronDownIcon` |
| `icon/chevron-up` | 52:33 | 202d6a21466956cca5464e70b8fcac44d3bd9505 | `@rain-next/ui/icons/chevron-up` | `ChevronUpIcon` |
| `icon/button-loading` | 207:33 | 93cf004533993728cbfc12d16bc8790469acf961 | `@rain-next/ui/icons/button-loading` | `ButtonLoadingIcon` |
| `icon/add` | 51:32 | 65ccddef5f0df45fe6dbadd684222a40d4847973 | `@rain-next/ui/icons/add` | `AddIcon` |
| `icon/add-bold` | 71:54 | ce4fac61be3c0c9537e75a2b508fd76993f493a8 | `@rain-next/ui/icons/add-bold` | `AddBoldIcon` |
| `icon/add-circle-filled` | 67:89 | db2e3a3f66d5095a420482e1b04a4080aa9c4bda | `@rain-next/ui/icons/add-circle-filled` | `AddCircleFilledIcon` |
| `icon/add-circle-outline` | 67:32 | 29f00db906409cd23fc62f40208be3fb2292888b | `@rain-next/ui/icons/add-circle-outline` | `AddCircleOutlineIcon` |
| `icon/alert-circle` | 67:64 | 81475b3d4f15b3eb8a0c43b0488fc7afde908a8c | `@rain-next/ui/icons/alert-circle` | `AlertCircleIcon` |
| `icon/alert-filled` | 68:50 | 9f1ee5b4ae6419f0061e531fe5e5db061d457857 | `@rain-next/ui/icons/alert-filled` | `AlertFilledIcon` |
| `icon/check-bold` | 71:48 | 1b0f9ddf7c24e04d4c4a31ee7dd45ec5947b0b8b | `@rain-next/ui/icons/check-bold` | `CheckBoldIcon` |
| `icon/circle-check` | 67:42 | 0f0f2df3e7b62b884dece2342be2f05bc5524da6 | `@rain-next/ui/icons/circle-check` | `CircleCheckIcon` |
| `icon/circle-check-filled` | 63:85 | 14f3852a4f9795f2939445f3e6ff3c88726bf241 | `@rain-next/ui/icons/circle-check-filled` | `CircleCheckFilledIcon` |
| `icon/circle-close` | 67:39 | 35667b841b056adf89b57b3a376a9b54876099df | `@rain-next/ui/icons/circle-close` | `CircleCloseIcon` |
| `icon/circle-close-filled` | 63:88 | 4e6fdc1ee2aa1741fee2a321926675729d9c17b2 | `@rain-next/ui/icons/circle-close-filled` | `CircleCloseFilledIcon` |
| `icon/close` | 8:2 | 191c67961efb298fdbba15974f9be943e3aa2f86 | `@rain-next/ui/icons/close` | `CloseIcon` |
| `icon/close-bold` | 71:51 | b4e171f9ce34dd00eb23c608f508c4403c31b3a1 | `@rain-next/ui/icons/close-bold` | `CloseBoldIcon` |
| `icon/delete` | 51:50 | 84b9588997bd9645fa0f5723d01b125bbcd05ff7 | `@rain-next/ui/icons/delete` | `DeleteIcon` |
| `icon/filter` | 63:56 | 19b109c81381baa1d59f5b219d98f017a5bb6ed3 | `@rain-next/ui/icons/filter` | `FilterIcon` |
| `icon/help` | 8:14 | 28a38a953f0a60202451ec332c01ed5663e6a421 | `@rain-next/ui/icons/help` | `HelpIcon` |
| `icon/help-filled` | 68:47 | 5f489b44b2d0672f66310b74603804ae03f55495 | `@rain-next/ui/icons/help-filled` | `HelpFilledIcon` |
| `icon/info` | 67:58 | fc6cf38dee253b8a7ea4791617e2a620208c9179 | `@rain-next/ui/icons/info` | `InfoIcon` |
| `icon/info-filled` | 68:44 | f00d5dc798de2d5f9b905ed3ed583e12197b317f | `@rain-next/ui/icons/info-filled` | `InfoFilledIcon` |
| `icon/minus` | 51:38 | 768cdf68883291003c35f3c8de429fd14f19dea5 | `@rain-next/ui/icons/minus` | `MinusIcon` |
| `icon/minus-circle-filled` | 67:92 | af609b522d175fd31b3d98801a58d3fc514bf532 | `@rain-next/ui/icons/minus-circle-filled` | `MinusCircleFilledIcon` |
| `icon/minus-circle-outline` | 67:36 | 9bc8be2dae2a365ff00d4412b901a91eab55875c | `@rain-next/ui/icons/minus-circle-outline` | `MinusCircleOutlineIcon` |
| `icon/more-horizontal` | 52:68 | 32703c42896327633f6d9206ece468ad5aebaa15 | `@rain-next/ui/icons/more-horizontal` | `MoreHorizontalIcon` |
| `icon/more-horizontal-filled` | 68:62 | aa81e1584b286134cea48187ef502e26edf98325 | `@rain-next/ui/icons/more-horizontal-filled` | `MoreHorizontalFilledIcon` |
| `icon/more-vertical` | 52:74 | d6f1533fb923e959672c75c96807a38f6a7890a9 | `@rain-next/ui/icons/more-vertical` | `MoreVerticalIcon` |
| `icon/publish` | 182:645 | e5a199cdd35fa5f8ff31d057d7ca030965cc6b26 | `@rain-next/ui/icons/publish` | `PublishIcon` |
| `icon/publish-filled` | 182:695 | 1deaf4063c16a6d9b80b0e44ee3f54286a49bddf | `@rain-next/ui/icons/publish-filled` | `PublishFilledIcon` |
| `icon/published` | 186:546 | b160fbedb7964e48fa929f9dc7e913db339216b0 | `@rain-next/ui/icons/published` | `PublishedIcon` |
| `icon/refresh` | 51:80 | f08c4b9ff968b5f8b8e3ec20f871c4a90764c928 | `@rain-next/ui/icons/refresh` | `RefreshIcon` |
| `icon/search` | 8:20 | e8f8a7d2b1b3a90d73e089760cc9d42a83a3f269 | `@rain-next/ui/icons/search` | `SearchIcon` |
| `icon/settings-3` | 183:581 | bb74ab1d584b7bc29efc63d3f2cee30e270d79e6 | `@rain-next/ui/icons/settings-3` | `Settings3Icon` |
| `icon/settings-3-filled` | 183:546 | 542b8550abf41a7c714ff1e2e720fb20718b7e61 | `@rain-next/ui/icons/settings-3-filled` | `Settings3FilledIcon` |
| `icon/share-alt` | 184:606 | 3ddfc9c445e18ce7c4b441c0a6a63c909f445dc6 | `@rain-next/ui/icons/share-alt` | `ShareAltIcon` |
| `icon/rating-star` | 166:84 | 4924e295e0c7a440af1c5d5b093b982c34893633 | `@rain-next/ui/icons/rating-star` | `RatingStarIcon` |
| `icon/rating-star-100` | 166:74 | e8949a5a99ba339f5afb28e104270424eba63fbd | `@rain-next/ui/icons/rating-star-100` | `RatingStar100Icon` |
| `icon/favorite` | 63:48 | 193e9bc5daf3814cfddb2ed58c8fafe02df401cc | `@rain-next/ui/icons/favorite` | `FavoriteIcon` |
| `icon/favorite-filled` | 63:51 | 09fc08c5b64413c8b512dba40905e5e47a38c581 | `@rain-next/ui/icons/favorite-filled` | `FavoriteFilledIcon` |
| `icon/like` | 182:630 | e079f31aa066beb514f0b3efd4a08a0f138bc690 | `@rain-next/ui/icons/like` | `LikeIcon` |
| `icon/like-filled` | 61:36 | 02cef3be833aa38d66ece34d38f6a258cb4711ab | `@rain-next/ui/icons/like-filled` | `LikeFilledIcon` |
| `icon/dislike` | 182:633 | afd699814798866b78fe565978c5f0d2353d74dc | `@rain-next/ui/icons/dislike` | `DislikeIcon` |
| `icon/dislike-filled` | 182:686 | f9c4863c29d747c8b8940af93f8069035ff6bdb2 | `@rain-next/ui/icons/dislike-filled` | `DislikeFilledIcon` |
| `icon/like-alt-2` | 183:623 | 3c199ca2e647b50a5383820d3bd8045b872df18a | `@rain-next/ui/icons/like-alt-2` | `LikeAlt2Icon` |
| `icon/like-alt` | 183:602 | 61d3541e87224b0feda666d26d0a8fa7fc84cee3 | `@rain-next/ui/icons/like-alt` | `LikeAltIcon` |
| `icon/pin-top-alt-2` | 184:624 | 388ab4ae629ce5a04923e662480c99b00c5a47d9 | `@rain-next/ui/icons/pin-top-alt-2` | `PinTopAlt2Icon` |
| `icon/pin` | 184:511 | 568f51fe99bfd30a177b6e4271c3c9f0735c0b6f | `@rain-next/ui/icons/pin` | `PinIcon` |
| `icon/pin-top-alt` | 184:514 | db1483b1cf566a3c8e79aa47a37ea3d1f21fdd61 | `@rain-next/ui/icons/pin-top-alt` | `PinTopAltIcon` |
| `icon/filter-filled` | 122:84 | 3f0b9e381594969a69a4ab3efb3ec585e791c1f9 | `@rain-next/ui/icons/filter-filled` | `FilterFilledIcon` |
| `icon/expand` | 70:35 | 34f02ab987613e4c815e0dd97992955cbb6bf209 | `@rain-next/ui/icons/expand` | `ExpandIcon` |
| `icon/collapse` | 70:32 | 2b64bd7fde195296c1b120707fba20f2049c4df1 | `@rain-next/ui/icons/collapse` | `CollapseIcon` |
