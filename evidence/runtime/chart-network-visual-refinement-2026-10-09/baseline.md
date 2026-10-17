# Network visual refinement baseline

授权：2026-10-09，用户在选择“自然错位”、要求参照原稿并考虑复杂关系后说“开始实现”。工作模式为 System Mode，本增量只修改现有 NetworkChart 候选及其直接使用者。

实际工作区：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`。开始实施时 HEAD 为 `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。20个目标文件在修改前已复制至 `/tmp/rain-network-visual-20261009-before`，原始SHA-256记录见本目录 `source-before.json`。大部分目标源码原本就是未跟踪的本地P4工作，本次不将这些已有文件整体计为新实现。

已有合同：图结构校验、稳定ID、独立节点类别/关系类型、方向、零值与未提供读数区分、鼠标和键盘同选择、Button/Table、减少运动、真实源码下载、19个Registry入口及170个官网变体身份。全部保留。

本次视觉来源为 Figma `MbWg1ft5zk1JRQiQ6dS30e` / `2901:130074` 的 CH-065/070/083/086，以及本聊天中的复杂课程图截图。讨论原型确定的方向为原稿式径向柔光、自然错位、小节点、细曲线和小箭头；结构化关系作为独立样式保留，配色独立。讨论原型的方向确认不等于组件实施的视觉或对比度验收。

本次增量对照见 `increment.diff` 与 `source-changes.json`。共享 `status/current-phase.yaml` 同时有其他工作更新；差异文件只包含本次新增的 `visualRefinement20261009` 子记录，保留并排除其他状态更新。

边界：`registry-candidate` / `unpublished`；没有新增依赖、Figma写入、发布、业务迁移或Git提交/推送。本次不把Mock课程关系当作原稿拓扑的精确提取，也不承诺大型或任意密集输入的自动布局。
