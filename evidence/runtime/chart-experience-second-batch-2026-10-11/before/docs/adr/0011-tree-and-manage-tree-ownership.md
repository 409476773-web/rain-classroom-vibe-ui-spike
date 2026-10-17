# ADR 0011：Tree 与 ManageTree 的状态和职责边界

- 日期：2026-09-25。
- 状态：本地 Tree UI 与 ManageTree Pattern 候选已实施；2026-09-26 代表性运行态视觉通过，2026-09-27 领域编辑、迁移删除与保存上下文专项验证通过。剩余接口及完整验收仍按实施记录推进，未发布。
- 范围：Tree UI、TreeNode部件、ManageTree Pattern；不改变全局Token、公共IconButton或其他组件。
- 依据：[详细实施规则](../plans/2026-09-25-tree-implementation-rules.md)、[既有复用矩阵](../../evidence/rain-classic/reuse-matrix.yaml)。用户已确认最终 A 视觉、授权实施并验收运行态代表性视觉。

## 背景

旧库已有层级、勾选、加载、移动及编辑事务，但状态投影、输入提交和临时key恢复存在缺口。新版不能通过复制三套层级模型或给基础Tree堆业务参数解决。审核稿同时确定了专属16×24展开按钮，它不是公共IconButton已有的正方形尺寸。

## 决定

1. Tree属于UI；TreeNode只是Tree的内部呈现部件。共享实现位于 `packages/ui/src/tree/`。
2. ManageTree继续属于Pattern，先使用既有 `apps/playground/src/patterns/manage-tree/` 承载可复制源码；不为单个候选新增空Pattern包，不改成UI组件身份。
3. Tree拥有展开、可见投影、行选择、勾选、焦点及请求状态。原始结构由宿主data拥有，加载结果经明确回调写回；checked/意图通过单一快照原子控制。
4. ManageTree独立拥有committed、draft、editorBuffer、校验及原子保存；输入必须显式确认才进入draft。业务适配器拥有权限事实、字段规则、完整结构操作计划和后端版本。
5. 移动采用一个纯模型。仅把Pattern确实共用的 `validateTreeMove / applyTreeMove` 与类型通过UI公共出口暴露，内部索引不开放；Pattern不深导入UI源码路径、不复制算法。
6. 展开和拖拽手柄采用Tree专属原生button Parts，加正式图标与Rain Focus/颜色规则；不压缩公共IconButton、不扩大其全库尺寸表。末尾普通操作继续复用IconButton。
7. 提示由ManageTree宿主反馈端口连接轻量Message配方；现有G2 Toast仅作为局部来源，不允许UI反向导入Prototype，不新建全局通知系统。
8. 首期沿用原生平台和当前已安装基础。第三方Tree、拖拽或虚拟化依赖只有在具体缺口验证后才评估，不在本ADR预先选定。
9. 领域对象投影到标准 TreeNodeRecord，并保存在 source；withTitle/withChildren 不可变回写，isSameNode 比较可编辑字段。自定义弹窗共享原位编辑的同一缓冲，不另造草稿或索引；treeOptions 不能覆盖数据和视图状态所有者。
10. 迁移后删除先在本地形成完整有效草稿，再一次性应用；真实服务端仍须原子保存。保存的临时 key 映射同时覆盖勾选意图与树内滚动锚点，不承诺恢复页面级滚动。

## 结果与验证

同一个父子模型服务渲染、搜索、勾选及结构校验；同一个MoveProposal服务鼠标、键盘与草稿。UI与Pattern的依赖保持单向。固定高度Basic与自然高度Rich分开验证，不能让后者冒用固定虚拟化。

需要专项验证的成本：自有树键盘/焦点模型、虚拟化连接线、异步意图、完整按钮避让、16px宽操作目标以及浅色对比度。视觉通过不消除这些工程任务。具体用例、文件和退出条件均以实施规则为准。

## 未采用

- 不直接搬运Vue组件或把旧输入即时写草稿逻辑保留下来。
- 不把ManageTree的业务事务放进Tree。
- 不另建通用engine、插件总线、跨页面缓存或未被需要的Pattern包。
- 不因视觉通过而把资产标记为system-approved、已发布或业务已接入。
