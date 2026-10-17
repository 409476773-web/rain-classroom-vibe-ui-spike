# G1 review-05 · More与公共Tree消费

2026-09-30 用户浏览器两条反馈授权。System Mode导航候选 + 本地R2配方消费；保持pending-G1。

- More内部文字/数量/箭头间距4px，箭头使用现有icon-neutral-4；页签外部8px间距和hover分离规则保留。不新增断点。
- R2已消费Tree，但覆盖了公共缩进/叶子位置/行高/选中色/meta/操作区。本轮移除覆盖，使用已认可Tree Basic/default/关系线；保留课程数据、类型标记、元信息、过滤与选择展开状态，扩展为用户追加授权的课程资源管理。
- 用户追加授权：这是老师课程资源排布页，需要排序、删除、新增。改为复用现有ManageTree Pattern，沿用Tree Basic/default/关系线、标准行操作、字段缓冲和草稿保存；不改共享Tree/ManageTree。页面适配知识点/学习任务、类型筛选与本地模拟保存。
- V05、D02：将层级与交互归还已有组件，宿主只保留业务内容和状态；当前Tree已于2026-09-29获Web原型基础视觉验收，依据实时Manifest/状态/README，未借此关闭导航G1。
- 验证：More展开/收起样式，Tree实际行高/24px缩进/叶子无占位/关系线，方向键/F2/操作区/新增/删除/指针和键盘排序/本地草稿保存或放弃；1200/1440及独立消费者回归；构建与来源/保护校验。组合视觉待本轮G1复审。

已有文件保护哈希及修改前源码随附；分支codex/card-v2，HEAD 321e1a0c1b5f9284e0fcb5167fa059d6174b1752。无依赖安装、全局Token、Classic/Figma/Git/发布动作。

## 实施与证据

- 已有 Tree/ManageTree 参照：`reference/Tree.png`、`reference/ManageTree.png`；实测标准行44px、内缩8px、层级递增24px、行内gap4px。共享Tree、ManageTree实现与其验收记录未修改。
- 修改前：`before/R2.png`、`before/facts.json`。针对检查先失败于More gap8px（期望4px），随后实现并通过。
- 修改后：`after/R2.png`、`after/R2-1200.png`、`after/facts.json`；`task-editor.png`、`pointer-sort.png`、`keyboard-sort.png`、`saved.png`。回归截图按 `regression-02/03/04-after` 保存，本轮未覆盖旧review目录。
- More gap4px、icon-neutral-4开合一致；外部8px/hover8px/内容固定/圆角关系继续通过原review-04几何检查。
- 管理树使用已有Basic/default视觉与ManageTree事务，不额外重写排序、删除或草稿算法。行尾提供编辑、新增同级/子级与删除；手柄支持指针和键盘排序。字段Dialog允许修改名称/类型，已有子树禁止转为任务。删除需要确认，取消新节点或放弃修改均恢复原状态。
- 筛选使用完整树的可见投影，筛选时不排序；切回全部恢复其余内容。统计是已保存快照，保存后动态更新；新节点key映射、范围/布局切换草稿保留均经过操作验证。移除原来只弹提示的新增/更多筛选入口，避免同时存在无效操作。
- 页面仍使用原1250px容器规则，Tree沿用其自身420px行容器下元信息布局；未引入新断点。数据是同一份导航示例mock，保存只在内存，刷新重置，不等于真实课程保存/同步/发布。

## 验证结论

- `pnpm exec playwright test -c tests/e2e/navigation-v042.config.ts`：12项通过；新增管理流程包括空名称校验、F2、类型选择、新增、指针/键盘排序、过滤中不丢隐藏节点、删除取消/确认、保存统计更新、新节点取消、退出放弃、切范围/恢复导航保留草稿。
- `pnpm --filter @rain-next/playground build`：类型检查与构建通过；沿用已有大chunk提示，不为本次调整改构建策略。
- 普通Tabs与独立消费者、短窗口More、三样本两连接模式均通过本轮回归。未扩展至全浏览器、真实后端、读屏或全局对比度验收；导航G1保持pending。
- 没有新的全局设计方法结论；本轮直接应用V05/D02，待用户复核组合。来源快照、依赖与状态同步，无Git提交或发布。

保护复核：10410个已有文件中仅12个本任务文件变化，0缺失、0无关修改；另新增课程资源配方文件。共享Tree/ManageTree、既有Gate记录、旧review证据与冻结HTML均保持；五项导航资产依赖与来源哈希全部校验通过。详见 `protection.json`、`source-validation.json`、`browser-checks.log`、`build.log`。
