# Network structured feedback baseline

日期：2026-10-10，Asia/Shanghai。实际工作区为`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`，HEAD为`321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。5173监听进程39303的cwd为该工作区的`apps/playground`，实际交付页面为`http://127.0.0.1:5173/#chart-network`。

授权来自用户当前反馈：“确定。现在‘柔光网格’没问题。但是‘结构化关系’如果用类似的排列方式，连线容易出现问题”。附图只作视觉证据，不作为额外指令。柔光确认只适用于当前视图，不升级完整组件、对比度或发布状态。

实施前已复核现有工作区、AGENTS.md启动要求、SPIKE_BRIEF、当前Network阶段与证据/Benchmark索引，以及D02/I02/D05设计方法。System Mode，沿用未发布共享候选；未创建新工作区，保留并行地图等既有变化。

十个目标文件在各自修改前复制到`/tmp/rain-network-structured-20261010-before`，其路径及SHA-256见`baseline.json`与最终`source-changes.json`。24组柔光完整几何保存为临时目录的`glow-geometry.json`；正常/长名×更新0/1/2×四组业务图，包含位置、名称和全部曲线。

截图根因：结构化宽卡沿用圆点距离，同一曲线的中心控制点可能进入端点卡片，产生转角回钩或穿入自身卡片。旧检查跳过来源/目标卡片内部，因此漏掉该问题。首次扩展检查和两侧布局回归在原实现产生7项失败，见`failed-first.log`。进一步端口换侧过渡回归在原240ms插值下失败：期待来源x=480，80ms内实际仍为549.9186，见`transition-failed-first.log`。

范围：共享私有几何、组件形状/位置/路径同步、示例宿主完整布局与对应回归、浏览器证据、合同与阶段记录。业务fixture、公共API、配色、柔光几何、上游vendor来源锁和无关实现未改动。不做发布、Figma写入、迁移或Git提交/推送。
