# Empty：图像、展示配方与文字层级

2026-09-14。用户已确认保留 Classic 插画并补充轻量图形/纯文字，初版确认标准标题 16/24/600、说明和轻量提示 14/22/400；随后用户明确要求空状态不要显得太重要，文字统一调整为 14/22/400，同时缩小按钮；轻量不得自动隐藏说明或操作。随后明确“开始实现”，本批不新增页面、表格/列表、侧栏三个真实业务场景。

System Mode；沿用已有 card-v2 工作目录、Empty 和公开 Parts。仅完善组件、公共导出、使用合同、来源登记与必要验证/精确授权。无新依赖，不修改 Classic，不改现有业务场景、其他公共组件或 Foundation 数值；不提交、发布、迁移或写入 Figma。

## 组件合同

- 保留 Empty / EmptyTitle / EmptyDescription / EmptyActions，增加 EmptyMedia。原有 children 组合保持有效；无 children 时提供空盒插画与“暂无内容”。
- presentation 为 illustration / simple / text，默认 illustration；这是展示配方，不是全局 Density 或四档尺寸轴。simple 默认使用原稿 Simple；text 不渲染图像。说明与操作均由显式 children 决定，不因形态变化而隐藏。
- align 默认为 center，可选 start。标题支持 h2–h6 / p，默认 h3。根节点无默认交互或 live region，状态播报及业务动作留在宿主。
- 七组 Light/Dark 插画原样复用 Classic SVG，并登记哈希及原稿节点。不重绘、不简单反色；图像装饰语义、不可拖动。自定义 Media 内容同样仅用于非交互装饰。
- 三种展示的标题和说明统一 14/22/400；插画不触发放大或加重。标题与说明统一使用 Text/Neutral/3，检查真实浅深内容面；不接受对比度例外。
- 候选间距：图像到文字标准16/轻量8，标题到说明4，文字到操作标准16/轻量12，操作之间8，全部消费现有 Rain Space。
- 根背景透明、无内置卡片/边框/外侧 padding/页面占位高度。图像标准最大宽280、Simple最大宽56，均以旧版资源为依据，随容器收缩且保持比例；这两项为局部图像规格，不新增公共 Token。

## 执行与验证

1. 已有 Table/Empty/资料消费者与治理定向基线：3 files / 13 tests 通过。
2. 先写可运行回归：默认展示、切换轻量仍保留说明/操作、标题语义/ref、装饰资源及自定义图像；再最小实现。
3. 使用现有测试和构建环境。Browser plugin not available，采用已安装 Playwright；只在临时目录提供组件夹具，不新增业务页或文档站页面。
4. 验证两主题、三展示配方、窄容器、长文案、图像加载、按钮键盘操作、嵌套主题，以及既有消费者回归。类型、构建和治理分别记录。
5. 原始资源、旧阶段和其他组件通过前后字节核对保护。自动验证、独立审阅、视觉 Human Gate、对比度接受、发布和迁移独立记录；本批人工视觉已按后续用户确认登记，见 evidence/runtime/empty-refinement/visual-acceptance.md。

## 来源

- Classic：`src/components/Empty/Empty.vue`、`empty.scss`、`empty-illustrations.js`、`docs/components/Empty.design.md`、2026-08-09 明暗运行归档截图。原稿 file key `MbWg1ft5zk1JRQiQ6dS30e`；精确节点与复制后哈希见本批 source-lock。
- 当前 Rain Next：`packages/ui/src/empty/empty.tsx`、`manifests/ui/empty.yaml`、RN-08 配方和现有继承审计；审计的 not-started 为旧快照。
- shadcn Empty：<https://ui.shadcn.com/docs/components/base/empty>，借鉴开放 Media/Title/Description/Content 组合，无源码复制。
- Ant Empty：<https://ant.design/components/empty/>，借鉴标准/简洁与内容定制。
- Carbon：<https://carbondesignsystem.com/patterns/empty-states-pattern/>，借鉴小空间纯文字与减少重复装饰；不扩大本项目 Empty 的状态语义。

证据：`evidence/runtime/empty-refinement/verification.md`。

## 组件使用

```tsx
// 默认：原稿空盒 + 暂无内容，无说明或操作。
<Empty />

// 常用配方仅保留一句提示；需要标题时再显式添加 EmptyTitle。
<Empty presentation="simple" align="start">
  <EmptyMedia />
  <EmptyDescription>添加后会显示在这里。</EmptyDescription>
  <EmptyActions><Button size="mini" onClick={onAdd}>添加内容</Button></EmptyActions>
</Empty>
```

`EmptyMedia illustration="empty-search"` 可切换原稿；通过 children 放置自定义非交互图形。部件作为 Empty 直接子节点，根的 className 控制宿主内布局，原生 style 可按局部配方调整图像尺寸；控件本身继续使用其已登记的样式与 Focus。

## 本轮视觉反馈修订

决策来源：用户“现在空状态里的按钮太大了”及“绝大多数场景，不需要加粗加重的大号文字，只需要小号文字即可”。System Mode，范围仅 Empty 默认文字、展示配方和对应合同/证据。统一 14px / 22px / 400；操作配方显式选择现有 Button mini（28px 高、13px 字）与 text compact（24px 高、13px 字）。EmptyActions 保留开放组合；使用默认尺寸的其他控件和宿主配方不被强制覆盖。沿用 Chromium 明暗主题、窄空间、长文案、键盘与已有消费者回归验证；视觉效果仍待用户查看。

### 减少文案层级

决策来源：用户明确“暂无内容”的文字可以与下方小字一样，且大多数场景不需要这一行。标题可选，与说明统一 14/22/400 和 Text/Neutral/3；常用组合仅放一段说明，不自动补标题。无 children 的极简默认仍保留一句“暂无内容”，避免仅有装饰图像。预览默认省略标题，可切换显示标题检查同级文字。原有 CSS 相邻规则仅在确有标题时添加4px间距；本轮不新增隐藏属性或修改布局规则。

## 已确认的使用规范

默认采用一句具体提示；仅在标题提供额外信息时组合 EmptyTitle，标题与说明保持同级。有足够空间且需要引导时使用 illustration，空间有限或多个模块重复出现时使用 simple，紧凑区域使用 text。操作只在有明确下一步时提供，主操作优先一个；不强制每个 Empty 都带按钮。宿主继续决定宽度、对齐和外侧留白。以上为现有三种配方的使用规范，不新增业务页面或公共 API。
