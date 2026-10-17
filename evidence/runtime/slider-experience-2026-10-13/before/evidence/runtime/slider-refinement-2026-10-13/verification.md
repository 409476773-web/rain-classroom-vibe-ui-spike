# Slider refinement — 2026-10-13

用户已授权按讨论方案改造，补充要求静止滑钮边缘与已选轨道使用统一的主题 Fill 浅色，明确去掉中心蓝点，最新要求 normal 更浅且更蓝。当前工作区 `.worktrees/card-v2`，HEAD `321e1a0`；本轮沿用共享候选，不提交、不发布。

## 当前交付

4px 轨道、default 16px / compact 12px 滑钮、2px 环与表面色内芯保留。静止已选轨道和滑钮外圈统一使用 `Fill/Brand/Solid/2` 的蓝色通道，在这两个独立填充层明确替换为白名单内 55% Alpha；hover、键盘聚焦或 dragging 时同步使用该 Token 的不透明色。相较上一版 Alpha/2 更浅且更蓝，没有新增全局 Token 或整体 opacity。沿现有 140ms 反馈过渡；减少动态效果时关闭过渡。中心节点及相关样式保持删除，保留完整表面色内芯。尺寸、命中区、键盘焦点、Tooltip 和强制颜色保持。静止外圈承担位置识别；颜色账本保留 3:1 门槛和未达到的真实结果，不声称对比度验收通过。

区域密度、独立焦点、扩大命中区、edge 内缩关键刻度、纯文本格式化读数、单活动端 Tooltip、Escape 关闭及提示内容悬停、范围动态 ARIA 边界均保留。页面提供单值阈值、双端成绩范围、音量即时反馈、小数步长四种可操作组合及公开入口代码。

输入保留 number/null 草稿，滑块保留最后有效值；业务保存或筛选在有效确认后执行。跨端冲突修复后输入、滑钮和业务结果同步。另一端未完成的 `-` 阻止确认；当前端由滑钮修复后正常提交；预设清除旧原始文本。相等范围保留真实零区间和两端身份；继承 Base UI `none` 的指针选择限制，重合时直接向左拖开下限可能受限，可用独立输入、键盘或先右移上限展开。

## 当前验证结果

组件逻辑的前次 62 项单元检查通过，覆盖 Slider、四类组合、G5 页面及复用的 InputNumber / Tooltip；本轮未重复该逻辑套件。新增的有限 Alpha 允许规则通过一项独立回归，验证仅两个精确 Slider 选择器、背景属性、表达式、Token 和 55% replacement 合法；其他文件、选择器、65% Alpha、apply 操作或 Alpha/2 Token 均拒绝，该次筛选执行未运行另外四项整链测试。颜色合同自检验证实际账本的 88 个已知父表面用法与 CSS 原始哈希，输出 `bluer-recipe.log`、`bluer-color-contract.log`。当前 normal 配色的 desktop / 390px touch 仿真共 24 项浏览器检查通过，无跳过、失败或重试；覆盖两种主题与密度、键盘与拖动、草稿与确认、精确刻度几何、浮层边界、禁用、减少动态效果与强制颜色。浏览器直接比较静止与操作状态的外圈、轨道颜色，确认两者同色、静止沿 Solid/2 通道使用 55% Alpha，操作状态使用不透明 Token。输出为 `component-unit-report.json`、`browser/report.json` 和 `browser/*-track-states.json`。

前次 UI 与 Playground 类型检查通过；本轮 Playground 构建通过；Registry 独立源消费通过，87 个 UI 文件、1857 个打包模块，ZIP 完整性检查通过。输出为 `types-current.log`、`build.log`、`consumption-current.log` 和 `g5-source-consumer.zip`。原有 Playground 大文件构建提示保留，未扩展为本轮优化任务。

独立组件复核保留上一轮无中心点版本的结构与交互结果；本轮配色重新通过浏览器状态回归。移除中心点后的浏览器回归覆盖表面色内芯拖动；这仍是浏览器事件检查，不能替代物理设备触摸。强制颜色下全部七个滑钮与键盘焦点可辨认。

最新 `state-contrast.json` 保留 22 个要求达到 3:1 的状态组合。操作中及私有实心对照的 16 项达到门槛，最小值 3.064602；静止边缘在两种主题的 6 项均未达到，浅色 2.2430–2.3609，深色 1.8348–1.9736。账本将其保持为必要边界、critical:true、minimum:3、acceptedException:false；颜色合同自检明确要求这些未接受发现被如实保留，没有降低门槛或转成装饰豁免。组件与浏览器功能检查通过不等于对比度接受；原 G5 其他资产的历史颜色问题未由本轮接受。

共享来源核验尚未闭合。Slider 当前来源记录采用并行 DatePicker visual / Select 已登记的有限 before/after 路径桥，保持原始快照与旧证据；当前全链验证仍拒绝冻结的 Select 前态与并行阶段当前状态不一致，详细结果见 `source-closure.json`；后续共享回归修改还需衔接有限原始字节后继证明。此外，两个并行阶段的 phase 快照冻结了 Slider 的 in-progress/not-run 状态，Slider 单独推进完成字段会被其严格前态比较拒绝。未重写并行任务的证据或快照，也未忽略未知槽位。组件检查通过与共享来源检查待衔接分开记录；`unit-report.json` 保留先前组合 90 项中 78 通过、12 来源检查失败的真实结果，不能当作最新整链通过。

最终实时页面截图为 `browser/final-page.png`，预览 `http://127.0.0.1:5397/#slider`；截图保留当前页面交互数据。

## 来源保留与生命周期

Slider 初始 `baseline.json` 及全部原始 before 文件保留在 `before-initial/`。先行 DatePicker UX 任务在本轮完成登记，其最终来源记录捕获了七个共享文件的 Slider 中间版本；有效 `before/` 仅对这些文件绑定当时现场字节并逐项与父记录 after 校验。新 baseline 冻结父证据，保留原始 baseline 哈希、原始观察、精确文件列表及衔接原因；原始 intake 与有效父快照同时受保护。旧 G5、日期优化、DatePicker UX 的账本、源锁和证据没有由本轮重写。

组件实现和独立复核已完成；全链来源及阶段完成登记仍待并行衔接，当前 phase 保留 in-progress/not-run，Manifest 独立组件复核为 passed-scoped。资产保持 registry-candidate、awaiting_human、contrastAcceptance: not-granted、unpublished。Figma 写入与业务迁移未授权；本轮无 Git 操作。仅两项遍历完整证据链的旧 G4 / G5 回归将超时上限提高至 20 秒；原断言、有限路径、哈希、对比度门槛与防篡改要求保持。

未跑全仓库全部检查、清洁联网安装、物理触控、Safari / VoiceOver 或其他真实读屏；未授予人工视觉、对比度或生产验收。
