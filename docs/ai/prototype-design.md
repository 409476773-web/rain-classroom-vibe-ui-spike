# Rain 原型设计：从任务到首稿

本页随本地 Starter 导出，供没有历史聊天的 AI 使用。它组织已有组件与设计经验，不新增公共组件或全库视觉默认。候选、示例和局部接受不能互相替代；新页面需独立审阅。

## 开始前的四个判断

1. 使用者主要要完成什么：查找并处理多个对象、编辑一个对象、连续处理任务，还是比较数据？写一句主任务。
2. 哪些信息帮助判断，哪些可以稍后查看？确定主要操作，区分整页条件、局部显示和执行命令。
3. 查看语义相近组合的截图、源码与状态说明。匹配时保留关系、按需求改内容；不匹配时退回 Layout 与 UI 组合，记录原因。
4. 开工前只记几行：参考什么、为什么适合、保留什么、改变什么。设计说明留在工作记录，不放入业务界面。

优先复用已有 Variant → 页面 Local Recipe → 页面 Local Fork。共享 packages 默认只读；业务数据、过滤、草稿、校验、保存留在页面。不要为一页增加全局 Token 或公共 Props。

## 按行为选择组件

| 用户行为 | 首选与判断 | 避免的误用 |
| --- | --- | --- |
| 切换完整的同级内容区域 | [Tabs](../../manifests/ui/tabs.yaml)，同时提供导航与面板 | 仅为分段外观创建空面板 |
| 少量选项中选一个条件或模式 | [RadioGroup](../../manifests/ui/radio-group.yaml)；标签型筛选比较 [CheckableTagGroup](../../manifests/ui/checkable-tag-group.yaml) | 一排普通 Button 各自管理选中状态 |
| 从较多候选值选择 | [Select](../../manifests/ui/select.yaml)，搜索、多选按任务选择 | 为少量模式切换默认增加下拉步骤 |
| 立即过滤 / 明确提交搜索 | [Input](../../manifests/ui/input.yaml) / [SearchInput](../../manifests/ui/search-input.yaml) | 因组件名含搜索就改变生效时机 |
| 执行动作 / 打开低频操作 | [Button](../../manifests/ui/button.yaml) / [DropdownMenu](../../manifests/ui/dropdown-menu.yaml) | 没有真实任务的更多菜单或重复操作 |
| 展开、关闭或纯图标操作 | [IconButton](../../manifests/ui/icon-button.yaml)，提供可访问名称和真实状态 | 近似字符或自绘图形替代已有图标 |
| 编辑字段 / 重要确认 | [FormItem](../../manifests/ui/form-item.yaml) 配合字段；[Dialog](../../manifests/ui/dialog.yaml) / [AlertDialog](../../manifests/ui/alert-dialog.yaml) | 页面另写焦点、Escape 或嵌套浮层控制器 |

合同中的 useWhen、doNotUseWhen、Props 和 Parts 是选型与 API 来源。只读命中的几项；从 [UI 出口](../../packages/ui/src/index.ts)核对真实导出，不猜 Props。Button 等本地资产不因随 Starter 附带就获得公共发布身份。

## 把组件组织成页面

| 条件 | 保持的设计关系 | 反例与检查 |
| --- | --- | --- |
| 多个控件作用于同一份结果 | 查询放在同一组，共用结果范围；显示设置和批量操作分组 | 不把全页筛选混进图表指标切换；检查改变条件影响哪些区域 |
| 多个区域服务同一连续任务 | 先判断共同表面与分隔，再选择容器 | 不因每区有标题就各套 Card；看整页主任务是否清楚 |
| 需要强调层级 | 结合字重、留白、对齐和表面，使用已有排版方案 | 不把每个标题、数字都放大；14/16px 等搭配只属于原场景 |
| 相同内容重复出现 | 保留最有用位置上的一次表达 | 总数、对象名称、操作和解释不在相邻区域重复；必要错误/状态反馈除外 |
| 窄屏或内容变长 | 先换行、堆叠、调整比例和滚动范围 | 不自动缩小所有文字和点击区；测试长标题、错误、菜单、底部操作 |
| 选择的是完整对象 | 选择控件与整对象反馈对应；查看入口独立 | 标题点击不同时改变选择，Checkbox 不贴在日期旁暗示只选日期 |

上表是有条件的组合判断，不是固定模板。表单/报告/工作台以 default 密度为起点；列表局部 compact 要连同邻近字段、按钮一起判断。Card 表达对象或明确表面，Layout 表达空间。

视觉值继续来自 [Typography](../../packages/foundations/src/typography-contract.ts)、[Token](../../packages/foundations/src/token-contract.ts)及[布局源码](../../packages/layouts/src/layout.tsx)。普通文字用 UI 字体；长正文按 Reading 角色；关键数据才考虑 Data 字体，中文单位分开。不复制 Tailwind 默认配色、任意阴影或新字体。

图标从 foundations 的 icons/catalog 公共入口核对身份及 availability，再通过 @rain-next/ui/icons/<slug> 静态导入。按真实行为选图标；某页的图标选择不自动成为全局语义。

## 第一份完整组合：多分区表单

编辑单个对象，包含短字段、长说明和统一提交时，先读 [大表单组合](form-composition.md)：两种窗口的参考图、源码、状态、可调部分和退出条件。

列表可读 [BM-A 源码](../../apps/prototype/src/scenarios/bm-a/page.tsx)及[状态合同](../../apps/prototype/src/scenarios/bm-a/state-contract.md)。本便携指南尚未交付列表、工作台、报告的成熟视觉模板；不能把可运行场景当作已验证模板。原工作区的列表校准及 BM-C/D 仍有独立视觉复审范围。

## 提交前：整页 → 区域 → 组件 → 状态

- 实际打开桌面和窄窗口：主任务与主操作是否可辨，信息和控件归属是否一致，是否有无用容器或重复内容？
- 检查真实长内容、必要的 loading/error/empty/disabled，以及键盘、焦点与关闭恢复；不用额外假操作凑齐展示。
- 修改外观时保留完整尺寸和状态关系。低对比度历史样例不能推广；引用样例颜色不等于该组合已通过对比度。
- 保留第一次可运行源码/截图与后续修正，分别记录自查、技术复核和用户反馈。未实测的耗时、token、返工成本写 not-measured。
- 第一次用户反馈前，用 design-notes.md 记录选择依据、所读文件、实际检查及未验证项。AI 自查不能替代用户视觉接受。

## 反馈进入下一次生成

每次修订提取：**触发条件 → 原问题 → 设计判断 → 使用方式 → 适用范围 → 证据与确认状态**。先更新已有指南或组件合同，避免复制同义规则。

- 通用组件缺陷或已授权默认调整：回到共享组件与合同。
- 多个组件的关系：更新组合指南和参考图，保留场景身份。
- 单页文案、像素微调或局部图标偏好：留在页面 Recipe，不上升为全局标准。

知识文件不会自动训练模型。效果依赖实际加载和使用，须用未参与调优的新需求再检查；一次成功消费不能证明稳定质量提升。

## 独立 Starter

在导出目录运行 pnpm install --frozen-lockfile --offline --ignore-scripts --package-import-method=copy、pnpm typecheck、pnpm build；pnpm dev --port 5357 --strictPort 后访问 #bm-a / #bm-b。离线安装依赖本机缓存；端口占用时另选，不停止别人的服务。

沿用 [应用入口](../../apps/prototype/src/main.tsx)及[样式入口](../../apps/prototype/src/styles.css)的完整加载关系。新场景写入 apps/prototype/src/scenarios/；Mock 和来源标记保持可见，业务数据不写入追踪属性。source-lock.json 是导出基线；改造后另记衍生文件与差异，不覆盖基线来冒充原快照。
