# Day 3 Core UI 设计说明

## 任务边界

- 目标：实现 Button、Input、Tag/Badge、Surface/Card 四个 Rain Next 基础家族。
- 模式：System Mode；这些组件会被多个页面复用。
- 依据：已接受的 Rain Classic → Rain Next 复用审核、Day 2 Foundations，以及用户对 Task 4 的实施授权。
- 成熟度：实现完成后最高为 `prototype-ready`；自动测试不能代替 Human Gate。
- 不在本轮：Select、Dialog、Layout、Benchmark、七种业务标签包装、Figma、发布、业务迁移和 Git 提交。

## 共同设计原则

1. 保留 Rain 的冷蓝灰、白色任务面、细边框、克制圆角和信息优先气质，不复制任何成熟组件库的默认皮肤。
2. 学习 shadcn/ui 的小组件组合方式，以及 Ant Design 的后台状态完整度；只吸收结构和行为优点。
3. 公共根节点提供 `data-rain-id`，内部部件提供 `data-slot`，状态和密度使用可检查的数据属性。
4. Compact / Default 继续由 `DensityProvider` 统一管理。Button 根据 2026-09-03 的实现 Gate 额外保留五档正式尺寸；其他组件不能据此自行增加尺寸轴。
5. 普通图标未来跟随宿主颜色；本轮没有 Semantic Icon 实现，因此不使用 Unicode 叉号、临时 SVG 或自绘图标顶位。

参考：

- shadcn/ui Button、Input、Input Group、Badge、Card：<https://ui.shadcn.com/docs/components>
- Ant Design Button、Input、Tag、Badge、Card：<https://ant.design/components/overview/>

## Button

- 2026-09-03 决策来源：设计师逐项确认 Button 实现 Gate；以下规则覆盖本文件早期的 `ghost` 命名和“只有两档密度”的 Button 旧假设，不改变其他组件。
- `variant`: `primary | secondary | tertiary`，表达一级、二级、三级操作层级。
- `tone`: `default | danger`，表达普通或危险意图；它与层级正交。
- `size`: `mini | small | medium | large | xl`，对应 28 / 32 / 36 / 40 / 48px。未显式指定时，Compact 映射 32，Default 映射 36。
- 36 是页面最大常用尺寸；40 仅用于按钮很多、普通尺寸和样式仍不足以区分主次的页面级操作组；48 只用于极少数大型重要操作。
- 28 / 32 / 36 / 40 使用 6px 圆角，48 使用 8px；字号依次为 13 / 14 / 14 / 14 / 16px，统一 600 字重。
- Secondary 沿用浅蓝灰底、蓝色描边和蓝色文字；Tertiary 使用透明底、轻蓝灰边和深灰蓝文字。普通页面的删除使用低强调 Danger，实心红只用于最终确认中的关键危险动作。
- Danger 颜色以 Rain Classic `#F34848` 为来源，较柔的 `#EF5353` 以及派生状态已在 2026-09-03 的 Button 真实页面视觉验收中确认。
- Hover 和 Pressed 只改变颜色或边框，不位移、不增加阴影。Disabled 保留各层外观：Primary 约 30%，其余约 40%，且不响应 Hover / Pressed。
- 所有层级和 Danger 共用主题蓝键盘焦点。Primary 使用 1px 白色分隔加外侧 3px 蓝色柔光；其他层级保留清晰边缘并使用 3px 柔光。蓝色柔光 20% 已通过本次 Button 真实页面视觉验收。
- 使用原生 `button`，默认 `type="button"`，保留 ref 和原生属性。
- Loading 保持按钮可聚焦，以 `aria-busy`、`aria-disabled` 和激活拦截防止重复操作；默认保留原文案，调用方可通过 `loadingLabel` 明确提供进度文案。加载图形复用 Rain Classic 27×27 PNG，以 `currentColor` mask 和 800ms 旋转统一呈现；不再使用白色蒙层。0.82 整体透明度已通过本次 Button 真实页面视觉验收。Disabled 继续使用原生禁用。
- `block` 只在窄栏、移动端或明确单一主要操作中显式开启；尺寸不会自动触发全宽。
- 长文案默认自然宽并保持一行；只有严格受限的布局才省略。当前说明页用 `title` 暂存完整文案，键盘和触屏下更完整的查看方式留到 Tooltip / 真实页面 Gate。
- 不提供 `href` 或动态根节点。动作使用 Button，导航留给未来 Link recipe。
- 普通 Button 必须有可见文案；纯图标动作留给独立 IconButton。本轮可组合 leading/trailing 内容，但不宣称已经完成 Semantic Icon Registry。
- 前置/加载图形尺寸为 14 / 16 / 16 / 16 / 22px，后置图形为 10 / 12 / 12 / 12 / 16px；普通图形颜色跟随按钮文字。

## Input

- Input 只拥有单行文字编辑、prefix/suffix、一个 trailing action、清除、字数限制与 IME 安全输入。
- Label、帮助文字、报错文字和业务校验由未来 FormItem 或页面负责；Input 只转发 `id`、`aria-*` 等关联属性。
- `status`: `default | warning | error`；支持 disabled、readOnly、controlled/uncontrolled。
- 字数按用户看到的字符而不是 UTF-16 长度计算；Hard 会截断，Soft 只提示超限。
- 清除后焦点回到原输入框；中文输入组合期间按 Enter 不触发 `onPressEnter`。
- 不包含搜索提交、数据请求、权限或业务规则。

## Tag / Badge

- Tag 是静态语义标签；可选移除按钮是独立动作。根节点不点击、不选择、不导航。
- Tag 只有受限 appearance/tone；七种教育业务标签后续用单独 Domain wrapper 组合，不能挤进通用 Tag 的任意颜色表。
- Badge 只实现 `dot | count | label` 三种补充信息，严格限制九种位置组合。
- Count 0 默认隐藏，超过上限显示 `max+`；Label 只接受 1–4 个大写英文字母或 1–2 个汉字。
- Badge 不可点击、不聚焦、不拥有 Tooltip，也不代表“成功、警告、失败”等命名系统状态；BadgeStatus 和 StatusIndicator 留在后续独立实现。

## Surface / Card

- Surface 只提供 `page | panel | raised` 表面层级，不拥有宽度、滚动或内容布局。
- Page 没有卡片边框和圆角；Panel 使用白底细边框；Raised 使用抬高表面色，但本阶段不默认添加重阴影。
- Card 只表达可独立识别的对象，不是通用间距容器，也不伪装成按钮。
- Card 使用 Header / Title / Description / Action / Content / Footer 组合；标题级别由使用者选择。

## 验收边界

- 自动检查：单元、交互、类型、构建、治理、Chromium 实测和截图。
- 人工检查：视觉层级、状态辨识、中文输入手感、Compact/Default 舒适度。
- Button 已于 2026-09-03 完成真实页面视觉与交互验收；Input、Tag/Badge、Surface/Card 仍为 `Human Gate: not-evaluated`，因此 Day 3 整体 Human Gate 尚未通过。
