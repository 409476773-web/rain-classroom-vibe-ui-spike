# Day 3 Core UI Families Design

## 任务声明

- 目标：建立 Button、Input、Tag/Badge 与 Surface/Card 四个无复杂 Headless 依赖的 Rain Next 公共 UI 家族，并用状态矩阵验证品牌、密度、Focus 和可访问性合同。
- 工作模式：System Mode。`packages/ui/**`、公共样式、文档夹具和验证基础设施都属于共享系统范围。
- 修改范围：`packages/ui/**`、Core UI 文档页与路由、Task 4 单元/交互/浏览器测试、Day 3 运行证据、阶段与边界登记。
- 验证方法：先运行失败合同，再最小实现；定向 Vitest、Chromium 键盘/Focus/计算样式、边界审计、类型检查、构建和完整 `pnpm verify`。
- 尚未验证的假设：四个家族的当前外观是 `prototype-ready` 候选，仍需真实 Benchmark 和 Human Gate 检验；本阶段不建立正式图标消费链，因此不用 Unicode、临时 SVG 或自绘符号填补图标位。

## 1. 视觉方向与来源

本批次选择“精密的教育 SaaS 工具感”：冷深蓝灰文字、白色任务面、细冷色边界、克制圆角和局部品牌蓝反馈。不引入 shadcn 默认灰阶、默认大圆角或无业务语义渐变。

- VE-001：Button、Input、Tag/Badge 在 Compact 筛选与表格工具场景中的主次层级。
- VE-002：资源 Card 的克制边框、对象信息组织和局部标记。
- VE-005：Surface/Card 对阅读任务和独立对象的表面语义；来源含身份字段，只使用已审计的结构结论，不复制内容。
- VE-008：对象 Card 的 title / metadata / tags / actions anatomy。
- VE-014：Input 的标签、必填、清除、禁用、错误与 Focus 血缘。Input Focus 延续 Day 2.1 候选：1px 品牌边框、浅蓝表面、2px 轻量 halo 与 1px offset。

## 2. 组件边界

### Button

- 变体：`primary | secondary | ghost | danger`。
- 状态：Default、Hover、Pressed、Focus Visible、Disabled、Loading。
- 密度：默认从 `DensityProvider` 获取，允许显式 `density` 作为局部边界覆盖；不建立 Compact/Default 两套实现。
- Loading 保留按钮宽度，设置 `aria-busy` 并阻止重复触发；状态指示不伪装成正式图标。

### Input

- 以一个 Field 根节点输出 Label、Control、Start/End Adornment、Clear Action、Description 和 Message Parts。
- 状态：Default、Value、Error、Disabled、Read-only、Focus Visible；错误信息通过 `aria-invalid` / `aria-describedby` 关联。
- 清除动作是明确的文字操作，不用未登记的关闭图标。受控与非受控值共用一条可检查路径。
- Adornment 只承载语义内容，不把搜索、金额或业务操作写入公共 API。

### Tag / Badge

- Tag 表达可管理的分类或属性；可移除 Tag 使用真实 `button` 和明确 Accessible Name。
- Badge 表达不可交互的信息/状态，变体为 `neutral | info | success | warning | error`。
- 颜色与文字同时表达状态；不将普通类别色误标为 AI 语义。

### Surface / Card

- Surface 只提供 `page | panel | raised` 表面层级和可选语义 HTML 根节点，不接管内容布局。
- Card 只表达独立对象，提供 Header、Title、Description、Content、Footer Parts；不成为默认布局容器。
- 普通 Card 无重阴影；主要通过背景、边框、留白和对齐建立层级。

## 3. 可追踪性与成熟度

- 每个公共根节点输出稳定 `data-rain-id`。
- Parts 使用 `data-slot`；变体、状态和密度分别使用 `data-variant`、`data-state`、`data-density`。
- Headless 库状态与 Rain 追踪属性不重复事实源；本批次不引入 Headless 依赖。
- 资产身份暂为 `local-experiment`，成熟度最高为 `prototype-ready`，publication 仍为 `not-authorized`。只有 Day 9 候选 Manifest、来源、Visual Lineage 与待验证项完成登记后，才可提升为 `registry-candidate`。
- Core UI 文档页展示 Overview、useWhen / doNotUseWhen、Variants、States、Density、Anatomy、Accessibility、修改边界、Visual Lineage 和成熟度；它是扁平可达的文档夹具，不新建持久导航。

## 4. 不采用的方案

1. **直接复制 shadcn Button/Input/Card。** 速度快，但会把默认视觉和未经审核的 API 带入 Rain，与本批次的视觉血缘目标冲突。
2. **为每个状态建新的公共 Component Token。** 会在 Benchmark 之前过拟合；本批次先使用稳定 Semantic Token 和局部 recipe，只对多家族重复的中间语义后续提升。
3. **把所有 API 收进单个配置型大组件。** 会隐藏 Parts 和改造边界；本批次保持小而明确的家族 API，Card 使用显式 Parts，Input 保留可检查的 Anatomy。

## 5. 停止边界

- 不实现 Select、Dialog、Table、Statistic、Layout 或 Benchmark。
- 不安装新依赖，不批量引入 shadcn 资产。
- 不建立 Manifest/Registry 发布资产；只记录候选身份。
- 不执行 Figma 写入、Local Commit、Remote Git、包发布或业务迁移。
- 自动验证和截图不代替 Human Gate。
