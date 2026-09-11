# Day 3 Core UI RED → GREEN 摘要

## 范围

- Button
- Input
- Tag / Badge
- Surface / Card
- Core UI 说明页、真实浏览器交互、截图与阶段治理

本轮没有安装新依赖，没有实现 Select、Dialog、Table、Layout、Headless 实验、七种业务标签、BadgeStatus 或 StatusIndicator。

## 首轮 RED

1. Day 3 授权测试先失败：状态仍停在 Day 2，边界程序也会拒绝未知的 Day 3 阶段。
2. Button、Input、Tag/Badge、Surface/Card 的行为测试先因公共实现不存在而失败。
3. 页面与路由测试先因 Core UI 页面不存在、Overview 仍显示 Day 2 而失败。
4. Input 的家庭 emoji 用逐键输入模拟时会被拆成多个键值；测试改为整段输入，匹配粘贴或 emoji 面板的真实输入方式后再验证字素限制。

## 首轮 GREEN

- 四个组件家族完成最小公共 API、单元测试、说明页与浏览器检查。
- Input 保持 label、帮助和报错在外部 Field；Badge 收口为 Dot / Count / Label；Surface Page 无边框圆角；Card 标题级别由页面决定。
- Button 的层级与危险意图保持两个独立维度；Loading 可聚焦但阻止重复激活。
- 旧库复用审核链和 CP3 保持完整，Human Gate、Figma、发布、迁移与 Git 未被扩大授权。

## 真实浏览器排错

1. Error Input 的焦点外框最初读到灰蓝中间色。根因是焦点颜色被设置了 140ms 动画；取消焦点颜色动画后，键盘焦点立即显示品牌蓝并通过对比度检查。
2. Playwright 会把 `aria-disabled` 识别为不可用语义；Loading 检查改为同时确认没有原生 `disabled`、仍可聚焦，并验证 Enter 不重复触发。
3. 清除按钮最初只有通用名称；改为“清除课程名称”，并验证清除后焦点返回输入框。

## 完整回归暴露的治理问题

首轮 `pnpm verify` 有 8 条旧 Day 2 测试失败。根因不是组件错误，而是旧测试把“Day 2 已完成”错误写成“当前阶段永远必须是 Day 2”，且旧证据锁在进入 Day 3 后会自动失效。

- 历史 Day 2 结果改由 Day 3 启动证据和 Day 2 运行记录共同证明。
- Visual Evidence 与 Benchmark 的历史状态在 Day 3 继续锁定，7 条防篡改测试重新通过。
- Day 3 生命周期允许实现中的 `not-run / failed / passed`，完成态只允许 `passed`，避免把实现、自动检查和 Human Gate 混成一个状态。

## 独立复核 RED → GREEN

独立只读复核发现并关闭以下问题：

1. Disabled Button 的低优先级样式会被蓝色或红色变体盖住；提高 Disabled 规则的精确度并使用专用禁用色后，浏览器计算值通过。
2. Button 浏览器证据补齐 Enter、Space、Hover、Pressed、Disabled、Danger 和 Focus。
3. 受控 Input 的清除与中文组合结束截断，统一通过真实 input 变更通知外部页面；受控单元测试和 Chromium 的 14→12 字符场景均通过。
4. 演示页删除 24px、26px 的私有 Button 高度，嵌套按钮继续使用 Foundations 的 36px Default；Compact 仍为 30px。
5. 附着式 Count Badge 的宿主名称补为“资源更新，3 条更新”，数量不再只对视觉用户可见。

二次独立复核确认上一轮所有 Critical / Important 均已关闭；Human Gate 继续保持 `not-evaluated`。

## 首次 Day 3 完成态（Button Gate 修订前）

- `pnpm verify`：exit 0；25 个 Vitest 文件共 332 项、三个 workspace typecheck/build 及 8 项 Chromium E2E 全部通过。
- `pnpm verify:reuse-audit`：exit 0；75 项旧资产、53 项公开资产和 12 个 Rain Next 目标继续通过复用审核门。
- 正式截图：`1440 × 3371`、`550881 bytes`、SHA-256 `1d1b8211f5e8f5276e6c24851e2fcc36b58910e1e16026a1990b6d80d0378829`。

本文件记录可复核的命令摘要，不替代命令原始输出，也不替代设计师 Human Gate。

## 2026-09-03 Button 实现 Gate 修订

### 新一轮 RED

1. 五档 `size`、Compact / Default 默认映射、`block` 和显式 `loadingLabel` 测试先失败；旧实现还会把未知属性误传给原生按钮。
2. Core UI 页面缺少三级层级、三级 Danger、五档尺寸、完整 Loading / Disabled / Focus、全宽和长文案分组。
3. Chromium 首轮读取到旧的 2px 实线 Focus，未出现设计师确认的 20% 蓝色柔光。

### GREEN 与排错

- `ghost` 收口为 `tertiary`；Button 新增 28 / 32 / 36 / 40 / 48 五档，Compact 默认 32、Default 默认 36。
- Secondary、Tertiary 与三级 Danger 恢复 Rain 视觉层级；普通删除使用低强调红，最终确认才使用实心红。当前柔化红仍是 Human Gate 候选。
- Primary Disabled 使用 30%，其他层级使用 40%，且悬停与按下不会改变颜色、边框或位置。
- 所有 Button 使用主题蓝 Focus；Primary 是 1px 白色分隔加外侧 3px、20% 蓝色柔光，其他层级是清晰边缘加 3px 柔光。
- 移除 Pressed 位移、Hover 阴影和 Danger filter。浏览器曾读取到动画中间态，根因是 Focus 边缘被纳入 transition；移除 Focus 相关过渡后即时呈现正确计算值。
- 复制 Rain Classic canonical 27×27 Loading PNG，SHA-256 为 `adbfc717706b3d90add735fcad30f480e86148a72d3a8d833ab3fa787d261704`；通过 `currentColor` mask 和 800ms 旋转复用，无白色蒙层。
- 全宽只由 `block` 显式开启；自然长文案不截断，严格受限示例才省略并暂以 `title` 保留全文。

### 当前自动结果

- `pnpm verify`：exit 0；25 个 Vitest 文件共 361 项、三个 workspace typecheck/build 及 8 项 Chromium E2E 全部通过。
- `pnpm verify:reuse-audit`：exit 0；75 项旧资产、53 项公开资产和 12 个 Rain Next 目标继续通过复用审核门。
- Button Human Gate 登记后的正式截图：`1440 × 3807`、`692099 bytes`、SHA-256 `6e3b80a99bb6ab78cff6e090231f315ff27b6227fc186f287d19f0e1c85280f7`。
- 2026-09-03，设计师在真实页面完成 Button 视觉与交互验收，接受 `#EF5353` Danger、20% Focus 柔光、40px 高度档位及其留白与 0.82 Loading 透明度。Button Human Gate 为 `accepted`；Input、Tag/Badge、Surface/Card 仍为 `not-evaluated`，Day 3 整体 Human Gate 尚未通过。
