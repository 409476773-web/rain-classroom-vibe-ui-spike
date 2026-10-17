# Day 2.1 Focus 与颜色体系修正设计

## 任务声明

- 目标：减轻 Day 2 Foundations 的键盘焦点视觉重量，明确 Input 展示物的阶段身份，并补齐颜色体系的可扩展分层。
- 工作模式：System Mode；修改对象是 Foundations Token、Focus 规则与文档站验证夹具。
- 修改范围：`packages/foundations/**`、Foundations Playground 页面与样式、单元/浏览器/治理测试、Day 2 运行证据与阶段记录。
- 验证方法：先用失败测试锁定新合同，再实现；运行定向 Vitest、Chromium 交互/计算样式检查、完整 `pnpm verify`，并刷新及人工查看 canonical 页面截图。
- 尚未验证的假设：`2px + 1px` 在后续深色、品牌色和复杂组件表面上的实际视觉效果，仍需 Day 3 组件矩阵和后续 Benchmark 再验证。

## 1. Focus 决策

Foundation 的通用 Focus recipe 统一为：

```text
2px solid brand ring + 1px offset
```

- `control`、`item`、`danger` 三个已锁定的语义名称继续保留，不改变现有语义模型。
- 三个角色暂时都映射到锁定品牌蓝 `#1561F8`，使键盘焦点成为稳定的输入方式信号，而不是业务意图颜色。
- `danger` 的危险语义继续由控件本身的文字、边框或表面表达；不再使用红色 Focus ring 重复表达。
- 保留 `:focus-visible` 与 forced-colors 适配，不以 Hover 替代 Focus。

“1px 品牌边框 + 轻量外环”不作为全局单一 recipe，而是作为 Input 的组件级 Focus 候选。这一修正来自用户对常用组件品牌感的明确评审，并经 VE-014 原稿再对照：原稿的 Input 激活感主要来自浅蓝表面和细品牌边框，不是高对比的连续实色外圈。

## 2. Input 在当前阶段的处理

当前页面中的 Input 仍是原生 HTML 验证夹具，不是公共 Input 组件。本轮只做以下收口：

- 在 DOM 上明确标记 `data-asset-identity="fixture-only"`。
- 在页面上显式说明“仅验证 Density 与 Focus，不代表 Day 3 Input / Button 最终外观”。
- 夹具获得键盘焦点时，自身 1px 边框切换为品牌蓝，表面切换为浅品牌蓝，并用 14% 品牌色的 2px halo 取代实色 outline。品牌边框相对白色相邻表面继续达到 3:1 以上；forced-colors 下恢复 CanvasText 实色 outline。
- 这是将 VE-014 视觉血缘带入 Day 3 的 Input Focus 候选，不构成公共 Input API 或人工 Gate 结论。
- Placeholder 从 Disabled 语义中拆出；不再用“不可用”颜色表达“尚未输入”。

Day 3 仍需独立定义 Input 的 Anatomy、Props/Slots、Default/Error/Disabled/Read-only 等状态、Compact/Default 密度、标签/辅助文本/错误的组合和真实键盘行为。

## 3. 颜色体系决策

不把每个语义组扩成大量对外公开的“梯度色”。采用三层模型：

```text
Reference Palette (internal) → Semantic Roles (stable) → Component Tokens (on demand)
```

### Reference Palette

- 是内部的小型原子色阶，承载 neutral、blue 及功能色的可重用值。
- 不是页面或组件的公共消费入口；应用和后续 UI 只使用 Semantic / Component Token。
- 优先复用已有的 Rain 色值，只为对比度合同补充必要档位，不追求规则但无用的完整 50–950 色板。

### Semantic Roles

- 总量继续受 Spike `30–45` 个上限约束。
- 本轮从 41 个增至 42 个，唯一新角色是 `text-placeholder`。
- `text-muted` 调整为在 panel、raised、page 和 subtle 表面上都可承载有意义的辅助文字。
- `text-placeholder` 只允许用于白色输入表面；`text-disabled` 只表达不可操作。
- 不新增“更不重要”、“几乎看不见”等意义不清的文字层级。信息重要性还应由字号、字重、位置、留白和文案密度共同表达。

### Component Tokens

- Day 3 开始，只在组件矩阵证明多个组件需要稳定中间语义时建立。
- 不为想象中的未来页面提前批量创建。

## 4. 可读性合同

- `text-primary`、`text-secondary`、`text-muted`、`text-link` 在 panel、raised、page、subtle 上均要达到 `4.5:1`。
- `text-placeholder` 只在 panel / overlay 白色输入表面上验证 `4.5:1`。
- `text-inverse` 在 brand / primary action 上要达到 `4.5:1`。
- Disabled 文本不并入有意义信息层级的对比度合同，但必须保持不可操作语义和非颜色单一线索。
- Focus ring 对它所在的相邻浅色表面要达到 `3:1`。

## 5. 明确非目标与状态边界

- 不实现 Day 3 Button 或 Input 公共组件。
- 不安装依赖，不创建 Registry/Manifest 资产。
- 不写入 Figma，不发布包，不业务迁移，不创建本地 commit 或远程 Git 操作。
- 自动验证与页面截图不代替 Human Gate；本轮结束后 Human Gate 仍为 `not-evaluated`。
