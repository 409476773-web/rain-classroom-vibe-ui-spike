# Slider Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将已确认的 Slider 改造方案落到共享候选、四类可操作样板、消费合同和当前验证证据。

**Architecture:** 保留 Base UI 1.8.0 的值、拖动、键盘、表单和端点碰撞引擎；Tooltip 复用现有定位与 Rain 视觉。Slider 只增加关键刻度、纯文本格式化和操作中读数。InputNumber 的编辑与数值解析保持原合同，页面独立保存 number/null 草稿、最后有效值、范围校验和业务保存。

**Tech Stack:** React 19、TypeScript、Base UI 1.8.0、Rain Tokens、Vitest、Playwright。

---

授权：2026-10-13，用户“确定。开始按照我们讨论的计划开始改造”。模式为 System Mode，沿用 card-v2 现有共享候选；本次不创建 Git 分支、worktree 或 commit。

范围：表面色内芯与品牌描边；4px 轨道；default 16px / compact 12px 滑钮；区域 Density、独立焦点、触控命中区域、双端重合与动态边界语义；单值阈值、双端成绩范围、音量参数、小数倍速。原值类型、回调和表单字段兼容。竖向、多节点、非线性和整段拖动不在本批。

视觉来源：当前 Rain Slider、InputNumber、Tooltip、FormItem 和已登记的 Rain Token。依照 V05 保持外观和行为一致，D01 按调节任务组织样板，D02 让标签/输入/反馈就近对应，D05 验证窄屏与密度，I01 区分可调值、编辑草稿、业务保存和辅助刻度。方法库无新经验时不追加条目；当前实现不自动获得人工视觉接受。

### Task 1: Slider 共享体验

**Files:** 修改 `packages/ui/src/slider/slider.tsx`、`slider.css`、`slider.test.tsx`，同步 `packages/ui/src/index.ts` 的类型出口。

1. 先增加真实键盘交互测试：范围动态 aria-valuemin/max、关键刻度、格式化读数、一个活动端提示与固定 Tab 顺序；运行 `pnpm exec vitest run packages/ui/src/slider/slider.test.tsx` 验证缺口。
2. 使用 Root 的真实 state.values/activeThumbIndex/dragging 渲染刻度和读数；不复制数值状态或浮层定位引擎。`marks` 为有限范围内唯一值和纯文本标签，`formatValue` 返回纯文本，`showValue` 控制提示。
3. 滑钮扩大命中区，悬停/拖动光晕和键盘轮廓分别处理；使用可用的共享 Focus Token。刻度坐标考虑 edge 对齐的半滑钮内缩；无多余 Tab 停靠点。
4. 复跑专项测试，随后验证真实浏览器中的拖动、位置、滚动定位与重合。

### Task 2: 四类组合和当前调用

**Files:** 新增页面私有 `apps/playground/src/docs/components/slider-examples.tsx`、`slider-examples.css`、`slider-examples.test.tsx`；仅替换 G5 页面中的 Slider 示例与可复制代码；核对其现有教学筛选调用。

1. 先验证阈值输入清空/越界时保留草稿和有效滑块值、小数步长校验、上下限冲突及输入结束才执行筛选。
2. 阈值输入靠近标签，下方轨道/关键刻度，显式保存按钮；双端提供有独立名称的输入；音量即时响应；倍速统一 0.05 提交粒度。
3. 补充边界加载、相等、禁用、窄宽度与局部实心蓝对照。对照只属于本页，不新增公共外观 Variant。
4. 各示例提供完整公开入口代码，API 和使用说明与实现一致。

### Task 3: 消费、来源和治理

**Files:** `manifests/ui/slider.yaml`、`registry/g5-assets.json`、`docs/ai/g5-components.md`、现有 G5 颜色/来源验证入口与专项测试、`status/current-phase.yaml`、`evidence/runtime/slider-refinement-2026-10-13/`。

1. 保存修改前快照，追加后继证据，不改旧 G5/日期批次的颜色账本、来源锁、验收和截图。
2. Registry 补齐 Tooltip 的真实依赖闭包；新增能力和未验证边界同步 Manifest、文档和状态。
3. 在既有严格来源链上只放行本批精确文件，不放松其他组件或冻结证据校验；新增颜色声明验证实际语义和表面。
4. 验证 Registry 独立消费、源码登记、颜色与相关既有回归；历史全局失败与本批结果分别报告。

### Task 4: 当前浏览器验收材料

**Files:** 新增 `tests/e2e/slider-refinement.config.ts`、`slider-refinement.spec.ts` 及本轮证据。

1. 确认服务监听和工作目录后启动现有 Playground；用独立端口和本批证据目录。
2. 覆盖 desktop / narrow touch，light / dark、default / compact、键盘/拖动/相等、草稿/输入/保存、刻度对齐、浮层边界、减少动态效果和 forced colors。
3. 运行 UI/Playground 类型检查、相关单元与浏览器测试、Playground build、专项治理/消费验证；检查当前 Diff 和真实整页。
4. 打开 `#slider`；Implementation、自动验证、人工视觉、对比度接受、Figma、发布、迁移与 Git 各自记录。物理触控和真实辅助技术不由仿真测试替代。

## 2026-10-13 轨道颜色反馈

用户补充：当前样式可以，但蓝色已选轨道过重，希望像 Ant Design 一样，在不点击或悬停时较浅。静止轨道改用现有 `Fill/Brand/Alpha/2`，hover / 键盘聚焦 / 拖动用 `Fill/Brand/Solid/2`，颜色沿现有 140ms 反馈；减少动态效果关闭该过渡。参考 [Ant Design Slider 的 trackBg / trackHoverBg 状态](https://ant.design/components/slider-cn/)。

可访问性按必要信息逐项核对：滑钮位置和两端身份表达数值，浅蓝轨道为辅助着色；保留滑钮外圈、独立名称、ARIA、精确输入和键盘焦点的检查，操作中轨道继续要求 3:1。该角色判断是本轮实现判断，依据 [W3C 非文本对比度说明](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) 对识别控件与必要状态信息的区分，不能据此声明整页 WCAG 合规或授予人工对比度接受。禁用不响应增强，强制颜色使用系统 Highlight / GrayText。

用户再次明确：“滑块边缘和滑块条颜色，应该是主题色系的 fill 颜色中，较浅的颜色。现在颜色不统一，且颜色不对。”最终静止已选轨道与滑钮外圈统一为现有 `Fill/Brand/Solid/3`，取代上面的 Alpha/2 轨道与 Solid/1 外圈；hover / 键盘聚焦 / 拖动时两者同步切换到 `Fill/Brand/Solid/2`。表面色内芯保留，增加 6px、不可交互且对辅助技术隐藏的 Solid/2 中心指示，承担必要位置识别并检查 3:1；外圈与浅色轨道为辅助着色，不声称静止状态达到 3:1。禁用与私有实心对照隐藏中心点，强制颜色用 ButtonText。外径、环宽、键盘、拖动与命中区不变。

用户最终指示：“滑块中间的蓝色小点去掉，保留表面色内芯和浅色 Fill 边缘；悬停、聚焦或拖动时，边缘与滑动条再一起加深。”据此删除中心节点及其样式，静止外圈和轨道仍为 Solid/3，操作中同时增强至 Solid/2；表面色内芯、尺寸、命中区、键盘焦点与强制颜色保持。移除中心指示后，静止滑钮外圈重新承担位置识别，颜色记录保留 3:1 检查门槛并报告实际未达到的组合，不授予对比度接受。

用户随后反馈：“现在 normal 时的滑块颜色有些太浅了。”本轮将静止外圈与已选轨道一起加深到现有 `Fill/Brand/Alpha/2`，保留较强的 `Fill/Brand/Solid/2` 操作状态；直接消费 Token 自带的浅色 65% / 深色 75% Alpha，不添加自定义透明度或新颜色。内芯无中心点、几何与反馈行为保持。颜色检查继续使用实际背景和原 3:1 门槛，保留深色静止边界未通过的结果。

用户最新要求 normal 更浅且更蓝。使用现有 Fill/Brand/Solid/2 的纯蓝色通道，在 normal 的两个独立填充层明确替换为白名单内 55% Alpha；操作状态仍为该 Token 的不透明色。只允许这两个精确选择器、表达式、Token 与 Alpha 组合，其他透明度修改继续拒绝。没有新全局 Token、整体 opacity、中心点或尺寸调整；3:1 门槛与未通过记录保持。
