# 三种组合配方的颜色与焦点消费记录

范围限定为 `#compositions` 的资源筛选、分区作业设置、连续批改三个真实源码预览。状态：必要文字已有具体局部修正；焦点复合效果仍待设计决定。这里不授予 Human Gate、跨浏览器、完整可访问性或发布资格。

## 证据与测量边界

2026-10-18 本批目录：`evidence/runtime/component-implementation-2026-10-18/run-01/checks/C02/`。`computed-matrix-02` 和 `candidate-matrix-03` 各 4/4 自动流程通过，仅表示采样、状态切换、焦点呈现和无页面错误检查成功；不是所有颜色都通过。期间其他代理改动目录索引等文件，命令记录明确 `stableDuringCheck:false`，不得称为冻结交付快照。

矩阵：Light / Dark × Background/Neutral/1 / 3。Background1 是真实文档默认；Background3 是在原预览容器替换背景的测试宿主，不改变三个配方、字段底色或 Token。不是声称产品已经新增背景切换入口。每个配方实测默认、校验错误、700ms loading、请求失败、禁用状态。原始 `computed-consumption.json` 对每项保留文字、节点、类名、字号、字重、主题、computed 前景/Alpha、全部背景祖先、合成底、原始比值与分类。

普通必要文字、单位、placeholder 和错误说明采用 4.5:1；大字阈值按字号/字重计算，当前主要内容仍按普通文字。禁用控件单列 `explicit-inactive-exception`，只使用非活动控件的标准适用范围，不表示颜色通过，也不是用户批准的视觉例外。祖先整体 opacity 与背景图不冒充单层 Alpha 证明；此类必要内容会单列待合成审阅。辅助技术专用 `.sr-only` 不当作可见像素配对。

## 必要文字与单位

| 实际消费 | 修改前 | 局部候选 / 当前修正 | 结论 |
| --- | --- | --- | --- |
| 筛选 Input「输入资源名称」，Light，字段自身不透明白底 | Text/Neutral/5，rgb(116,133,168)，3.708:1 | Text/Neutral/3，rgb(73,93,135)，6.565:1 | 候选真实测量通过；只修这个消费的 placeholder |
| 分区 Select「请选择课程」，Light，普通白底 | 同上，3.708:1 | 同上，6.565:1 | 候选真实测量通过 |
| 同一 Select，Light 错误底 rgb(252,237,237) | 3.262:1 | Text/Neutral/3，5.776:1 | 候选真实测量通过；错误底不视为普通白底 |
| 同两处，Dark | 本批默认必要文字样本已满足阈值 | 中性3候选在字段底 rgb(7,11,29) 为10.904:1、错误底 rgb(48,31,31) 为8.735:1 | 保持两主题同角色，独立核对 Dark |
| 三配方的标题、正文、标签、分单位、帮助、已输入值、错误说明、请求失败与状态文字 | 本次采样达到对应阈值 | 不改 | 仅这些真实节点与状态的配对通过 |
| 禁用字段、按钮、禁用 placeholder | 原始颜色与节点仍收录 | 保持禁用规则 | 非活动控件适用范围例外；没有新增 Human 接受 |

修正由整合者加入两个完整示例内部，复制源码时一并携带规则：

- `filter-toolbar.tsx`：公开 `Input.className` 落在根 span，局部类 `rain-filter-readable-field` 只限定其直接 control 的 `:not(:disabled)::placeholder`。Input 没有被虚构为支持 `localRecipe`。
- `sectioned-form.tsx`：公开 `Select.className` 限定 `rain-settings-readable-select:not([data-permission="disabled"]) [data-slot="control"][data-placeholder] [data-slot="value"] > span`，只改变 placeholder，不改变已选值或禁用状态。没有改共享 UI 或全局 Token。

`candidate-matrix-03` 的 `candidate-placeholder-pairs.json` 和 `placeholder-before-*` / `placeholder-candidate-*` 是明确测试注入候选。当前源码已有整合修正，最终无候选注入的复测须独立记录；不能把候选截图当成最终源码验收。

## Focus：有呈现，但不能宣布整套对比度合格

四种真实控件逐一保留未聚焦与键盘进入后的完整祖先样式、outline 色/宽/offset、halo、border、背景、几何与 overflow：筛选 Input、分区 Select、批改 InputNumber、主按钮。键盘路径记录包含 Input 动态出现的清除按钮；不存在用移除键盘站点换取测试通过。另测 Chromium `forced-colors:active`，系统轮廓仍出现并能取得焦点。真实 Windows 高对比度、Safari 和辅助技术仍未测。

以下是普通模式的实测复合颜色拆分，不能将其中单个数字等同完整 Focus Gate：

| 主题/宿主底 | 品牌 ring 对宿主底 | halo 合成后对宿主底 | ring 对 halo 合成色 | 结论 |
| --- | --- | --- | --- | --- |
| Light / Background1 | 3.835 | 1.270 | 3.019 | ring 明显；仍需核对整体变化面积与相邻色 |
| Light / Background3 | 3.499 | 1.254 | 2.790 | halo 邻接不能沿用白底结论 |
| Dark / Background1 | 2.573 | 1.364 | 1.886 | 当前复合颜色不足以据此通过3:1检查 |
| Dark / Background3 | 2.925 | 1.382 | 2.117 | 同上 |

批改数字框本次焦点图进入错误状态，保留错误 ring 和错误底，不改标普通状态：Light ring/宿主底为3.601（B1）/3.286（B3），ring/halo为2.860/2.634；Dark ring/宿主底为1.378/1.566，ring/halo为1.142/1.290。原始 JSON 的 before/after 也保留背景变化，不能仅比较 `--rain-color-focus-control`。

当前公共规则通常为1px轮廓 + 3px光晕；主按钮另有表面隔离线。未聚焦边界与 ring 的同位置对照、弧角覆盖面积、真实相邻像素仍影响最终结论。对 Light 也不把一条 ring ≥3 写成完整焦点通过。截图与完整几何已足以交给设计方判断，不隐去 Dark 缺口。

下一步候选：保持文字修正；Focus 可以比较现有品牌形态与局部中性边界加强方案，例如复用现有 Border/Neutral/1 的合法 Alpha replace 配方并增加可见轮廓面积。它改变既有品牌焦点与错误状态识别，需先做实际候选对照、限定消费和颜色/几何核验，再由集中 Human Gate 决定。尚未实施或测量这个焦点候选，不把假设写成通过。未经决定不修改公共 `focus.css`、Token 或既有接受。

## 使用与回退

这些记录补充 `token-selection.md` 的消费边界，保留原 ledger 的 pending 项，不把历史 Light 接受扩展为本批 Dark 或局部例外。`verify:tokens` / `verify:tailwind-b2` 检查来源、用途和生成一致性；它们通过仍不能替代这些实际配对与焦点检查。

局部文字修正回退只撤销两个示例的局部类与内嵌规则，保留原组件和业务状态逻辑；所有本批修改前/候选/失败材料保留。Focus 当前没有生产修改。最终 Starter 导出前，应把实际源码复测结果和仍需 Human 判断的 Focus 项共同记录，禁止用“全库对比度 passed”覆盖剩余项。
