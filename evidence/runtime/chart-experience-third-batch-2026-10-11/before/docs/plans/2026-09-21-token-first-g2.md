# v1.2 G2：操作分组与反馈

2026-09-21。用户确认 G1 已完成并授权后续工作，补充允许直接使用 shadcn 组件代码与样式适配 Rain。当前 G1/G1-next 的视觉、人工对比度与独立复核已在 current-phase 登记；本批不重开旧 Gate。

目标：按新版工作包登记的 G2 顺序交付 Button Group、Toggle、Toggle Group、Spinner、Skeleton、Toast。六项无现成 Rain 公共入口；优先改造同一固定 shadcn 提交的 Base UI 作者源码及 Nova 样式，沿用已有 Base UI 1.8.0，无新依赖。

模式：Prototype Mode / local-experiment；验证脚本只登记本批精确文件、来源和颜色消费者。修改范围为 `apps/prototype/src/scenarios/token-first-g2/`、原型路由、本批验证/证据和阶段记录。保留共享 Button、IconButton、Separator、Tokens 与已确认 G1 页面；公共导出、Registry、Figma、发布、Git 均不由本批推导。

1. 锁定原始源码、样式、MIT、SHA256；先写本批关键行为检查并确认缺少实现时失败。
2. 适配六项，保留上游 Parts、Base UI 状态/键盘/队列/计时；用 Rain 语义 Token、焦点、官方图标替换上游视觉值。默认尺寸 36、compact 32，与现有 Button 一致；不扩展外观矩阵。
3. 独立 `#token-first-g2` 页面展示同一教学操作的默认、局部修改、未改兄弟例，覆盖单/多选、禁用、加载完成、失败与 Toast 关闭。局改通过局部 className，保持共享隔离。
4. 类型/构建、局部交互与来源检查；浏览器验证键盘、Toast 生命周期/主题、1440/900/390 容器、forced-colors、reduced-motion、布局稳定性与整页截图。记录实际颜色对比度及既有治理阻塞。

设计方法：V04 用字号/字重/留白区分说明与操作；V05 保持内容、行为与几何一致，直接适配成熟源码；D01 用“选择显示内容 → 执行操作 → 获得反馈”组织样例；D05 窄屏堆叠样例，完整按钮组可局部滚动，不能截断按键。沿用 Rain Classic 已确认 Button 的控件比例、品牌状态与官方图标；shadcn 提供分组结构、Toggle 行为及 Toast 队列，非最终视觉来源。

视觉回看（2026-09-21）：对照 shadcn/Base UI Toggle、Toggle Group、Toast，以及 MUI Toggle Button、Skeleton 的公开示例后，G2 收敛为“Rain review-console”：独立开关使用独立控制块，单选/多选组使用有边界的分段容器，pressed 状态用 Rain selection surface + 底部品牌线建立层级；反馈卡片不再被网格拉伸，Spinner 只表达当前进行中，Skeleton 以同一条记录几何做轻量 shimmer，Toast 依据类型使用语义左边线与语义 surface。结构和键盘语义继续沿用 Base UI，颜色、圆角、间距和状态表达仍由 Rain Token 负责。

验证假设：现有 Base UI Toast 满足队列、计时暂停与键盘入口；Skeleton 与完成内容使用相同宿主几何；Token 在实际双主题组合中满足关键文字/焦点对比度。读屏软件和物理触摸未实测；自动化不替代视觉/对比度 Human Gate。新经验待用户确认后回看设计方法库，不自动升级为全局规则。

2026-09-22 外层描边反馈修正：单选组的 inset box-shadow 被子按钮背景覆盖，前两轮只改变颜色与圆角未解决实际可见性。改用 Rain border-strong 的 1px outline，向内偏移 1px，覆盖整组边界且保持 Small / Medium / Large 的 28 / 32 / 36px 高度。范围仅页面规格样式和既有回归检查，沿用 V05 的几何一致性要求；本轮 G2 三项 E2E 通过，实际截图 `evidence/runtime/token-first-v12-g2/browser/single-outline-sizes.png` 确认可见外框。视觉确认仍待用户，未晋升公共资产。

2026-09-22 选中态文字反馈修正：原稿选中项除品牌蓝色与描边外使用 600 半粗字重；页面局部的常规字重规则覆盖了共享 Toggle 的 pressed 字重。为选中项恢复 `--rain-font-weight-semibold`，未选中项保持 400；截图 `evidence/runtime/token-first-v12-g2/browser/single-selected-bold.png` 与回归检查确认状态差异。
