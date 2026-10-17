# W6 E6 · 学术资源评审工作台

2026-10-04，Prototype Mode，`local-experiment`。本页是未参与既有 R/S 配方调优的新业务组合。只消费现有公开候选 API，不继承候选 13 的人工视觉验收。

## 独立消费任务

主任务是连续处理学术资料：定位资源 → 阅读当前文档 → 写评审意见 → 明确保存 → 继续处理。左侧资源队列、中间文字预览、右侧评审面板分别承担定位、证据与判断。8 份资源均使用稳定 ID、较长名称和脱敏 Mock 内容；没有课程或学生身份，没有为每份资源建立页签。

公开导出和当前 Manifest 是 API 来源。已读 `AGENTS.md`、Brief、phase、Evidence/Benchmark 入口、asset-index、prototype-design、information-design、导航组合 Skill、W3/W5 和 Workspace 指南及命中 Manifest/源码。精确读取文件及 SHA-256、7 个源资产的版本与源码/Manifest/Registry 哈希全部登记于 [consumption-e6.json](consumption-e6.json)。

现有 R4 批改组合依赖课程、试卷、题目、学生身份；R6 面向页面、视图与协作编辑。它们与学术资源评审不匹配，因此按 Template → Block → Pattern → Layout → UI 检索后，退回公开 Workspace 与 ObjectNavigator 重新组合。不是改名复制既有业务配方。比较过宽阅读区搭配抽屉的组织方式，本任务采用指定三栏结构，提供双侧隐藏和阅读专注。

## 使用的资产与边界

| 资产 | 公开入口与用途 | 本地修改 |
| --- | --- | --- |
| WorkspaceLayout / RecoverableRegion / RegionRestoreTrigger / PaneSplitter | `@rain-next/layouts`；一套布局控制、外部恢复 owner、同一 mounted body | 仅调用既有 API；本地 spec 和 scoped splitter 常态 paint |
| createWorkspaceKey / WorkspaceSpec / WorkspaceStorage | `@rain-next/layouts`；稳定实例 key 与注入偏好存储 | `mock-reviewer / academic-resource-review / document-workbench / instanceId` |
| ObjectNavigator | `@rain-next/ui`；资源对象队列、原生按钮与 aria-pressed | 已有 queue/identity 变体；局部名称两行及现有变量映射 |
| Input | `@rain-next/ui`；逐字筛选队列 | 原公开 size36；筛选状态在队列宿主，不改变当前资源 |
| Textarea + FormItem | `@rain-next/ui`；具名审核意见、Reading 排版与字段关联 | rows8、受控值和唯一字段 ID |
| Button | `@rain-next/ui`；上一份/下一份、阅读专注、明确保存 | 现有 text/tertiary/primary 与 medium36；无公共样式变化 |
| DensityProvider | `@rain-next/foundations`；default 工作台密度 | 仅当前实例 context |

组件自身导入 `review-workbench.css`。消费入口需要加载 Foundations tokens/typography/focus、UI styles 与 Layout styles；由主任务维护独立 W6 consumer 入口。源码没有导入 Gallery、评审台 DOM、原稿 globals 或既有课程/学生配方。

## 设计方法选择

| 编号 | 适用原因与本次处理 | 检查范围 |
| --- | --- | --- |
| D01 / D03 | 连续阅读处理；队列、证据、意见与明确保存形成顺序 | 稳定对象 ID、无资源 tab、独立草稿测试 |
| D02 | 一个连续任务，不按标题重复套 Card | 一个 Workspace flow，每条边一个 PaneSplitter；浏览器边界待复核 |
| D05 | 多个长名称与窄阅读容器 | 队列两行并保留完整 accessible label/title；预览标题完整换行；900px temporary 测试 |
| V04 | 当前身份、正文和元信息角色不同 | 16/24 区域标题、20/32 文档长标题、15/26 阅读、12/20 元信息；实际字体待浏览器检查 |
| V05 | ObjectNavigator 行为匹配，内容需要局部变化 | Existing Variant → scoped caller recipe；不改共享默认 |
| I01 / I03 | 身份、证据位置、评审状态和动作需要分别识别 | Mock 标记、证据索引、意见提示、明确本页保存状态 |

38 个 CSS Token 引用均有现有声明。颜色使用现有 Category background/fill/text/border，字体使用 UI/Reading；不新增 Foundation Token。几何数值仅属本地工作台，完整数值与改造 Parts 见 JSON。本轮尚未获用户视觉确认，没有向方法库追加“已确认”经验。

## 状态所有权与本地差异

- 应用持有当前资源 ID、每份资源的草稿与已保存文本，使用 `resource-*` ID 作键。
- Workspace 仅持有 mode、宽度、effective 和 session。两侧共有始终可达的顶部恢复控制区，隐藏不会重挂载业务输入或队列。
- 搜索只改变队列候选；当前预览不在结果里时明确说明，仍保持当前身份及草稿。
- 上一份/下一份沿完整资源序列切换，保存只由“保存本地评审”触发。布局操作不保存意见。
- 注入存储只保存 version2 的 queue/comments mode 与 expandedWidth。评审内容、资源身份不写入布局 payload。
- “本页已保存”是当前 mounted 页面内的 Mock 记录，刷新后清空；没有连接真实审核、发布、上传或身份服务。

新增 Parts：E6 root、稳定工具区、资源队列及筛选、文档预览工具条、阅读卷面、Mock 证据表、核查说明、审核意见字段、保存反馈和当前资源本地记录。新建 4 个页面源文件和本对证据文件；共享 packages、旧 R/S 页面、Tokens、Manifest/Registry 与历史证据无本任务编辑。

## 已运行的验证

测试命令：`pnpm test apps/playground/src/recipes/navigation-w6/review-workbench.test.tsx --reporter=dot`。

1. 先运行 null 基线，6 项预期缺失功能断言失败，exit1，16:55:19。
2. 实现后 5 项通过，第 6 项因 textarea 与保存段落含相同文字导致测试查询歧义。改为段落查询，不改变保存行为。
3. 最终 1 文件、6 测试通过，exit0，17:00:43，2.39 秒。

验证覆盖：资源身份与独立草稿；双侧隐藏/恢复保持同一 DOM、草稿和非零滚动；专注精确退出；900px 受限布局临时查看不改变队列占位；过滤范围；明确本地保存及布局存储隔离。

已运行本地 4 文件定向 `git diff --check`，无空白错误。新增文件为 untracked，另以文件内容和精确 SHA-256 登记。对 38 个 CSS Token 引用的声明核查没有缺失项。未测耗时/Token/返工收益，不作效能提升结论。

## 尚未验证与下一检查点

实际整页、1200/1440/1600、短高窗口、键盘/拖动、最终字体和边界几何由主任务导入 `#E6` 后进行浏览器复核。typecheck/build、整批 protected source 校验、W7/W8 汇总亦由主任务负责。完整对比度、VoiceOver、多浏览器尚未运行；本页没有获得 Human Gate、发布、Git 或 Figma 授权。

## W6 独立复核后生命周期补充

根代理授权修复隐藏场景仍保留暂态的消费缺陷。本页只增加可选 active(default true) Prop，在 Workspace Context 内消费本地 `ActiveSessionGuard`：离场时 DISMISS_TEMP(reason outside，不恢复焦点到隐藏控制区)并退出专注；资源、评语、保存、筛选和滚动业务源码保持原行为。

新增 meaningful 生命周期测试先得到 E6 inactive 时 comments temporary 仍 true 的失败，修复后确认关闭并再次打开仍是同一 mounted 评语字段/原草稿。17:17:40 三文件合跑17/17通过，其中本页原6项和新增E6生命周期1项；最后 Playground typecheck 退出0。完整四项生命周期还覆盖真实 hash E4离场、E1 portal离场和E3专注离场。

`consumption-e6.json` 保留原来源锁并刷新本页/helper/test闭包；宿主根代理已补既有独立 Tailwind/Foundation loader，当前 consumer.css SHA及修正来源也在该记录。本代理没有修改任何 CSS。浏览器/完整无障碍/G3人工状态继续由主任务独立登记。

本记录不宣布 W6/W7/W8 或系统资产完成。下一检查点是主任务的独立入口运行证据与技术审阅。
