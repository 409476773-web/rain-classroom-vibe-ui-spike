# 资料表格清空筛选验证

2026-09-14。用户要求：执行查询或选择筛选项后显示“清空筛选”文字按钮，配图库现有实心圆圈叉。Prototype Mode，仅改本地资料配方和定向测试；公共组件、图标源、Token以及以前接受的视觉状态不变。[方案](../../../docs/plans/2026-09-14-table-clear-filters.md)。

## 实际行为

- 在状态筛选右侧显示既有 Button text，显隐直接取决于生效的 columnFilters；未提交的搜索草稿不会触发显示。
- 图标使用 `CircleCloseFilledIcon`，静态入口 `@rain-next/ui/icons/circle-close-filled`；正式目录 availability=available、源节点63:88。使用用户明确指定的实心版，不重绘或改全局默认；继承按钮颜色且aria-hidden。
- 点击复用原有清空函数：清关键词草稿、全部筛选、选择与旧提示，回第一页并聚焦搜索框。排序、每页容量、显示列和表格/卡片视图保留。
- 无结果时使用同一筛选栏入口，移除重复的空态清空按钮；无资料时保留“添加示例资料”。刷新期间禁用。
- 文字按钮常规regular26px、紧凑compact24px，沿用组件完整尺寸；工具栏垂直居中。输入/选择/视图按钮仍为既有32px/28px。没有新CSS或尺寸Token。

## 本次检查

- 单元：新显示/重置行为在旧实现上预期失败（[红灯记录](red-unit.log)）；实施后资料配方4/4通过（[日志](unit.log)，3.03s），覆盖联合筛选、状态单独筛选、清空选择/页码及返回焦点。
- 三浏览器Table原15个场景全部有通过结果：初批12项通过，3项因新增测试假定图标必为独立svg URL而失败（[初批日志](browser-initial.log)）。实测Vite以内联SVG提供相同资产；保留精确assetId与可见性检查，URL断言改为真实mask URL。三个查询场景复跑3/3通过（[日志](browser-query.log)，11.3s），没有产品改动。分批结果不冒充一次15/15运行。
- 矩阵覆盖浅/深主题、两种密度及图标呈现/按钮中心对齐；[Chromium](chromium-toolbar.json)、[Firefox](firefox-toolbar.json)、[WebKit](webkit-toolbar.json)。已目视复核浅色常规和深色紧凑截图。截图在 `/tmp/rain-clear-filters-browser/{engine}/clear-{theme}-{density}.png`。
- 既有浏览器流程覆盖320px边界、无结果、加载禁用、失败重试、分页、列显示、表格/卡片切换与独立prototype入口，无pageerror/console error或开发覆盖层。
- 完整类型检查通过（[日志](typecheck.log)）；prototype生产构建通过（[日志](prototype-build.log)），保留既有大chunk提示；完整治理通过（[日志](governance.log)）；差异空白检查通过。
- 新单元使用原生label激活Select并等待选项出现；没有改变公共Select交互。未重跑无关组件全量单元，也未启动独立代理审阅。

实施完成、上述自动验证通过；新按钮视觉待用户验收。以前的视觉接受与对比度发现保留，未授予发布、迁移或Git操作。
