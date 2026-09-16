# RN-05 Dialog / Separator · 验证与接续记录

2026-09-13。本批根据用户“Card 初步完成后继续下一步建设”实施 V2 的 M0-O / RN-05。

实现为本地公共候选，课程编辑是共享的 Mock 消费示例。Human Gate 为 `awaiting_human`，contrastAcceptance 为 `not-granted`。本记录不关闭 Card 的整体验收、完整 BM-B、M1/M2、真实辅助技术或发布。

## 工作区与来源

- 工作树：`.worktrees/card-v2`，分支 `codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。起始未提交内容见 [baseline.json](baseline.json)，本批修改共享文件前的快照见 `before/`。
- 预览：[Dialog](http://127.0.0.1:5195/#dialog)、[独立消费页](http://127.0.0.1:5196/)。开发环境为 5193 / 5194。服务为本机临时服务，重启方式见 README，`#dialog` 可追加至实际 Playground 地址。
- 行为复用现有 Base UI 1.8.0 与 PopupProvider；作者 Dialog / Separator 结构分别锁定 shadcn-ui/ui@`3ba91b1cc83e1bbe4ab35a422ff2a694849c5048`，见 [source-lock.json](source-lock.json) 及 `upstream/`。本地产生 Rain 转译代码，不声称 CLI 生成。
- 视觉沿用 Rain Token，参考 VE-014 的固定头尾、内容分组与任务表面。没有改变既有 Foundation 数值、Card、Input、Select、Button 或锁文件，没有增加依赖。
- [preservation.json](preservation.json) 对照开批哈希验证既有 UI / Foundation 及 Card 消费样例；共享文件仅有本批所需增量。未提交、推送或发布。

## 已实现及 RO 矩阵

| 项目 | 实现与实际检查 |
| --- | --- |
| RO-01 | Rain Trigger / Close 的 render 组合、具名 modal、初始/返回焦点、Tab 约束、Escape 与外点关闭，无嵌套按钮。 |
| RO-02 | 内嵌 Select 的 Escape / 外点先关闭内层，外层 Dialog 保留；嵌套 Dialog 逐层退出并返回各自入口。 |
| RO-03 | Light / Dark × default / compact 四矩阵；Portal 的主题、动态祖先主题、密度、显式局部 Space/16 变量、选择器堆叠。单元补测多触发器、取消打开及无触发器显式主题。 |
| RO-04 | 宿主持有 draft / committed；空白拒绝提交；保存中防重复并阻止关闭；首次失败保留内容；重试才提交；取消不污染已保存值。 |
| RO-05 | Input / Select 与 FormItem 的标签、required、错误说明、禁用实际关联；Select 值走 React 状态，无未实现的 FormData 假设。 |
| RO-06 | Header / Footer 的24px留白，Body 独立滚动，操作区保持可见；560px宽与375×667窄屏限制；forced-colors / reduced-motion 仿真；真实读屏与触屏仍未验证。 |

公共 Separator 支持横纵方向、原生 separator 语义与显式 decorative 隐藏；不替代菜单内部的 Separator，也不承担拖动分栏。

## 自动检查

按现有工具分段执行，未声称 `pnpm verify` 单次完整执行：

- `pnpm test --maxWorkers=2 --reporter=dot`：88 个文件、1279 / 1279 通过，见 [unit-verified.log](logs/unit-verified.log)。包含3项 Dialog 行为与3项来源/精确治理/保护检查。
- 类型与生产构建：见 [typecheck-verified.log](logs/typecheck-verified.log)、[build-verified.log](logs/build-verified.log)。保留既有大图标分块超过500kB提示，不影响构建。
- 生产 Chromium：35 / 35 通过，覆盖本批8项、Card6项、Core UI4项及受影响 Select / Dropdown 流程，见 [browser-production-scoped.log](logs/browser-production-scoped.log) 和 `production-scoped/`。
- 旧 Select / Menu 中4项通过开发模块动态导入构建真实状态矩阵，需开发环境；5193 的4 / 4通过见 [browser-dev-fixtures.log](logs/browser-dev-fixtures.log) 和 `dev-fixtures/`。两组共39项，不把开发夹具称为生产测试。
- 治理与图标：最终结果见 `logs/governance-verified.log`、`logs/icons-verified.log`，保留原有颜色发现与用户限定例外。

临时浏览器配置副本保存在本目录的 `*.config.mjs.txt`，可复制到临时目录后执行；生产运行需设置 `RAIN_DIALOG_PROTOTYPE_URL` 和 `RAIN_CARD_PROTOTYPE_URL` 为5196。浏览器追踪临时资源先写 `/tmp`，结束后归档，避免运行中的HTML/CSS被源文件治理扫描误判。

## 视觉、字体与颜色

常规浅/深色截图见 [浅色](appearance/dialog-light.png)、[深色](appearance/dialog-dark.png)；四矩阵、长内容和窄屏截图见 `production-scoped/`。目视核对弹窗留白、标题层级、字段、分隔及底部操作。

本机 Chromium 151 的 CDP 实际字形记录见 [fonts.json](appearance/fonts.json)：标题 PingFangSC-Semibold，说明 PingFangSC-Regular，均为 PingFang SC。只覆盖本机测量节点，不推广至其他设备。

[contrast.json](appearance/contrast.json) 使用实际计算色与 sRGB 相对亮度，测量必要正文、标题、说明及键盘取消按钮描边对弹窗不透明背景。四矩阵密度不改变颜色：

| 主题 | 正文 | 标题 | 说明 | Focus描边 |
| --- | ---: | ---: | ---: | ---: |
| Light | 9.151:1 | 15.457:1 | 6.565:1 | 3.835:1 |
| Dark | 10.985:1 | 13.548:1 | 8.549:1 | **2.573:1** |

必要文字达到4.5:1。深色 Focus 为既有共享配方，低于3:1，仍未获对比度接受；未用局部颜色覆盖掩盖该项。测量时 `:focus-visible=true`，原始描边及颜色见截图配套 paints JSON。此测量不覆盖全部继承控件状态、其他背景、整库颜色或人工视觉接受。

## 失败与修正轨迹

初始导出测试以及无触发器显式主题检查均先失败后修复。独立复核发现 DensityProvider 多一层 DOM 导致 Body 不能按 flex 剩余高度滚动，已用现有 `className="contents"` 修复。

边框最初在 components 层被 preflight 清掉；尝试提前声明 utilities 又改变全局层顺序，生产回归检出 Card / 控件留白异常。最终只将 Dialog 边框颜色放在不分层的 `:where(.rain-dialog)` 中，移除该全局层声明，并新增四矩阵留白/边框断言。受影响既有组件回归通过。

旧全量测试失败还包括 YAML 子集不支持非空行内数组、冻结阶段夹具未排除新批文件、局部布局变量与 forced-colors 缺少精确登记，均已修正，未放开任意颜色或源码路径。一次执行跨用户中断产生超长计时，另一次与浏览器同目录追踪写入并行导致2项边界误判；日志保留，最终隔离浏览器临时目录后1279项全过。

`production/` 和 `production-final/` 保留修复前与环境不匹配的尝试，当前结果应读取 `production-scoped/`、`dev-fixtures/` 和最终日志。

## 接续与回滚

当前公共 Dialog / Separator 已具备 RN-05 的技术审阅条件；人工视觉决定、深色Focus与真实辅助技术各自独立保留。独立技术复核记录见 [independent-review.md](independent-review.md)。

下一建设入口为 V2 RN-06：Stack、Inline、Grid、Split / Sidebar 四类最小公共布局，先读实际布局合同与现有消费页。随后按依赖推进 RN-07 Textarea、RN-08 Table，再组装 BM-A/B；本批没有实施这些后续项。原 V2 JSON 是提案快照，不回填为已通过。

如需回滚本批，只撤销 Dialog / Separator 新文件与共享文件的本批差异，并按 `before/` 对照保护后续改动；不要用仓库级 reset/clean 删除原先未提交的 Card 成果。生命周期、登记、精确治理和Token消费清单须与组件增量一起回滚。
