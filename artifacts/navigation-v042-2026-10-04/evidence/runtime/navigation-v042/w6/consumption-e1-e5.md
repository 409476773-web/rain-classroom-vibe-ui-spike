# W6 E1–E5 独立 AI 消费记录

本次页面是 `local-experiment` / Mock，本地新业务宿主使用公共 `@rain-next/ui` 与 `@rain-next/layouts`。页面入口为 `/navigation-v042-w6-consumer.html#E1`，有 `#E1`—`#E6` 的真实链接；E6 由另一消费代理提供 `ReviewWorkbench`，本记录不替其作完成声明。宿主保留各场景挂载，以 `hidden` / `inert` 切换显示。

目标是检验课程范围、课堂对象、连续批改、回放和指定实例改造是否可以由候选资产直接组合。修改只在 `apps/playground/src/recipes/navigation-w6/` 的自有文件、独立 HTML 入口与本记录。没有修改共享 UI/Layout/CSS/Token、Manifest、Registry、Vite、阶段或 Git。

## 实际检索与资产选择

先读取 `AGENTS.md`、阶段与 Evidence/Benchmark 入口，再读取 `docs/ai/asset-index.md`、候选 `rain-navigation-composition/SKILL.md`、原型设计入口、设计方法索引及导航 UI/Workspace/业务组合指南。选择顺序为 Template → Block → Pattern → Layout → UI；实际核对了 R2/R4/R5 的 Manifest、Registry 依赖、源码 Props，以及公共导出和样式入口。

R2 配方只公开 editor/instance/layout 参数，其范围列表是内置样例。R4/R5 公开 scene/workspace，活动、学生、题目、播放位置与草稿封装在原有配方。新的 240 教学班、移除范围、稳定课堂/卷题学生身份需要宿主掌握数据，所以退回公共 Layout/UI 重新组合。**没有复制或 import R2/R4/R5 配方，不声称完成配方安装**；保留的是范围与共同表面、对象队列与详情、讲稿与知识索引等已登记组合关系。

| 消费任务 | 实际使用 | 选择原因 |
|---|---|---|
| E1 课程资源 | ScopeNavigation + ConnectedSurface + Textarea | 公共范围固定第一项，全列表搜索，当前溢出班级末槽；唯一共享轮廓由 ConnectedSurface 拥有；范围说明草稿由宿主按范围 ID 保存。 |
| E2 课堂互动 | ObjectNavigator + NavigationTabs + WorkspaceLayout | 活动和小组是对象选择；小组提交/成员是真正内容面板；目录隐藏与恢复不拥有业务身份。 |
| E3 连续批改 | ObjectNavigator + SegmentedControl + WorkspaceLayout | 学生/题目是对象，按人/按题和队列外观是条件；队列默认 hidden；评分区只允许 expanded，专注不隐藏它。 |
| E4 回放 | ObjectNavigator + RecoverableRegion + RegionRestoreTrigger | 知识索引默认隐藏，peek 临时展开；点击节点/讲稿才定位；Escape 使用同一公共控制器恢复焦点。 |
| E5 实例改造 | 两个独立 WorkspaceLayout + ObjectNavigator | A/B 拥有独立键和草稿，仅 A 的局部目录选择器改变 padding/min-height 与字体；B 保持挂载、DOM、选择和草稿。 |

实际源码版本、当前 SHA-256、Manifest SHA、Registry files/dependencies、已加载路径和自有来源锁见 [consumption-e1-e5.json](./consumption-e1-e5.json)。包版本为工作区 `0.0.0`，版本证据以当前源码 SHA 和 Manifest sourceVersion 为准。候选13属于来源血缘；本消费页面不继承其人工视觉验收。

设计记录应用 D01 主任务与状态职责、D02 关系与分区、I01 真实语义角色、D05 长内容与容器适配、V04 既有文字层级。新增页面数值是局部几何，所有颜色与字体角色消费已存在 Foundation Token。没有形成已验证的新公共设计方法，不回写方法库。

## 五项业务试验与边界

- E1：公共范围 + 240 教学班，长标题。199/200 具有相同名称、不同稳定 ID 与说明，238 disabled。搜索全部传入范围；可移除当前班级。缺失值显示共享提示且不自动选择另一范围；宿主继续保留被移除 ID 的说明草稿，外部“恢复刚移除的班级”返回同 ID 后取回草稿。
- E2：三活动、每活动三组。活动切换显式选取该活动有效的第一组；组身份、详情和成绩描述同步，反馈草稿按组 ID 隔离。教学内容、成员与得分是脱敏 Mock。
- E3：一卷、三题、三学生。草稿键为 `paper/question/student`。队列显隐、专注、按题/按人和外观变更不改变当前学生/题目，也不执行保存。分数/评语与正文共享同一身份；保存是独立本地状态按钮。没有真实评分服务与生产校验。
- E4：模拟媒体、四讲稿点。hover 不 seek；点击节点和讲稿切当前位置。临时索引不推动主区，Escape 返回恢复按钮焦点；隐藏和专注退出保留时间与笔记。媒体静态示例与 +10 秒按钮不构成真实播放能力。
- E5：实例 ID 为 `w6-E5-A` / `w6-E5-B`。紧凑 patch 明确限制到 A 和 `.w6-directory`；改动为 entry padding/min-height、label/description 字号行高，全部采用已有 Token。第二次操作恢复默认目录。Unit 核对 B innerHTML、选择和草稿原样；真实计算样式对照交给根代理浏览器验证。

## 实际测试记录

测试先写：16:54:43，七项测试对空场景失败，原因是预期业务控件不存在。首稿五项通过，两项失败分别来自错误假设（缺失范围仍有有效编辑面板）与 selector 错取拥有同一 `data-region-id` 的 splitter。记录并改正消费测试，缺失范围另加外部恢复当前 ID 的宿主行为；恢复按钮先验失败后实现。

最后消费自查把 E3 当前学生/题快捷选择从条件 Radio 改为 ObjectNavigator。测试先要求 `当前学生选择` / `当前题目选择` 对象组并确认失败，再修改宿主实现；模式与外观仍是 SegmentedControl 条件。17:03:42 最终 **1 个文件 / 7 项 Unit 全通过**，原始最终输出保存在 JSON。最后 `pnpm --filter @rain-next/playground typecheck` 退出0。

所有自有 CSS 的 Foundation custom-property 引用核对为 **0 undefined**。与根代理 W6 protection-before 中 2105 个 package 文件比较，仅两个 README 被根代理并发更新用于 W6 文档治理；没有公共运行源码、默认 CSS、Token 或导出变化。不能把这个结果写成整个 packages 字节完全未变。

浏览器由根代理统一执行，本消费代理没有启动或抢占浏览器。新页面原尺寸、1200/1440/1600 与短窗口、计算样式、键盘完整回归、读屏、完整对比度、多浏览器和人工视觉分别保持待根代理证据或未验证。自动状态测试不授予 G3。发布、业务迁移、Figma、Git 操作、真实服务接入均未执行。

## 浏览器稳定入口

每场景容器：`[data-scene="E1"]`—`[data-scene="E6"]`。Region 使用 `.rain-workspace__region[data-region-id="…"]` 查询，避免取到同 ID 的 splitter。

- E1：更多班级 / 搜索范围 / 资源说明草稿 / 移除当前班级 / 恢复刚移除的班级；根 `data-scope-id` 是真实受控 ID。
- E2：活动证据分析讨论/方案投票/课后反思；第一/第二/第三研究组；`interaction-identity` 有 `data-activity-id` / `data-group-id`。
- E3：显示/隐藏批改队列；评分区为 `complementary`；对象组当前学生选择/当前题目选择中用按钮找陈安/第2题；条件按人/按题、列表队列/卡片队列为 radio。`grading-identity` 有学生/题/草稿键；输入本题分数/评分评语，独立保存本地草稿。
- E4：临时查看知识索引 / 关闭临时知识索引 / 固定知识索引；知识控制变量 · 02:10；讲稿 02:10；`playback-time`；进入/退出专注。
- E5：region 实例 A/B；实例 A/B 草稿；仅当前实例 A 使用紧凑目录 / 恢复实例 A 默认目录；`data-directory-density`。

## 独立复核后的消费生命周期修复

独立复核实际复现 E4 临时知识索引打开后 hash 离开仍保留 temporary，会由隐藏工作区响应 document Escape；E1 More portal 也不会因祖先 `hidden` / `inert` 自动关闭。问题在新消费宿主缺少 active 生命周期。初始七项 Unit 未覆盖真实 hash 离场，不能将其通过推广为场景生命周期通过。原发现保留在 `independent-review.md/json`。

新增 `consumer-lifecycle.test.tsx` 先测试真实 hash 宿主离开 E4/E1，以及 E3 专注/E6 临时评分侧栏的 inactive 行为。17:14:38 三种工作区断言得到 temporary/focused 仍 true 的预期失败；E1 先等待 Popover 完成定位，再于17:15:21得到离场后 portal 仍在 document 的预期失败。

本地 `ActiveSessionGuard` 位于 E2—E6 的 Workspace Context 内，active=false 时以 `DISMISS_TEMP(reason=outside)` 清除暂态，避免恢复焦点到已隐藏 toolbar；同时 `EXIT_FOCUS` 恢复专注前偏好。E5 两实例分别接入。所有业务选择、草稿和播放位置继续保持挂载。E1 只按 active session key 重挂不拥有业务状态的 ScopeNavigation 子树；范围 ID、移除记录和草稿仍在 CourseResources 宿主。

为直接测试真正的 hash 行为，将原纯 App 移到 `consumer-app.tsx`，原 `consumer.tsx` 继续承担样式入口、StrictMode/createRoot 并 reexport W6Consumer。E6 只增加 active(default true) Prop、guard import 与渲染，没有修改资源、评语、保存、筛选或滚动业务。

17:17:40 合跑 **3文件 / 17项通过**：原 E1–E5 七项、原 E6 六项、新生命周期四项；2.82s。最后 Playground typecheck 退出0。两组 JSON 保留原来源锁，再登记当前9项 E1–E5源锁与 E6/helper/test闭包、真实 red→green 日志。

根代理依据真实浏览器的按钮背景缺失补入已有独立 Tailwind/Foundation loader（`source(none)`、theme 与 source扫描）；本代理没有改 CSS。当前 consumer.css 的根代理修正已纳入来源锁，不将其误记为公共默认或 Token 改动。真实浏览器与独立复核的修复后结果仍由根代理/复核代理登记。
