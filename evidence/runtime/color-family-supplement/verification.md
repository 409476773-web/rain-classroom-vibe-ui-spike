# 颜色补充验证 · 2026-09-06

本次实现范围：Second / Orange / Green / Red 的 48 个 Light 颜色记录、填充前景限制、一层 Alpha 表面链、生成输出与 Playground 配对预览。依据[确认设计](../../../docs/plans/2026-09-06-color-family-supplement-design.md)。实现及自动验证、独立审阅通过；2026-09-06 用户确认颜色 Token 视觉无问题，颜色视觉 Human Gate 为 accepted。[确认原话与边界](../color-dark-theme/verification.md)单独登记；下文配对缺口保持。

## 原值与范围

- Registry 合计 105 个公共 ID。新增 Text 10、Icon 10、Border 8、Solid Fill 12、Alpha Fill 8。
- 独立逐条比对用户原值，新 48 条无差异；原 57 条完整记录与[实施前基线](baseline.json)一致，包括身份、排序、数值、来源和生命周期。
- `tokens.css`、`tailwind-theme.css`、`typography.css` 移除生成段后，未管理内容的 SHA-256 与基线一致，空白也未忽略。
- 本次四族 Solid 1/2 仅允许 OnColor；Solid 3 / Alpha 允许普通深色或同族 Text / Icon。两者可以独立选档。原有 Neutral / Brand 和现有 Semantic 未自动迁移。

## 自动验证

- 完整 `pnpm verify` 退出 0：[完整日志](verify.log)。治理检查、897 个图标完整性、类型检查、35 个文件中的 773 项测试、生产构建、41 项 Chromium 浏览器测试通过。
- 独立审阅后的源代码校验修复，再执行 `pnpm verify:governance`、13 项消费校验回归和测试项目类型检查，全部通过：[修复后日志](post-review-checks.log)。修复只涉及消费校验器与其用例，运行时与浏览器输出未变。
- 浏览器检查覆盖新增原值的实际 CSS、Solid 1/2 两个前景选择器仅提供 OnColor、Solid 3 的独立文字与图标、Alpha 原透明度和实际承载面、切换后的选项恢复、展示样式不泄漏到页面外，以及窄屏溢出范围。
- [色阶页面截图](colors.png)与[配对预览截图](preview.png)由真实 Chromium 页面生成；原第 0/1 批颜色截图保留。

## 独立审阅与修复

审阅者：独立子代理 `geometry_audit`，只读检查和独立反例验证。

1. OnColor 的 `context: page` 可借一个任意 Recipe ID 绕过用途边界：补失败回归后修复为必须是已声明的非 page Recipe 上下文。
2. Alpha 可跳过更近的 Dark 背景，借远层白底宣称 4.81:1，而真实结果仅 2.90:1：补失败回归后改为最近已知绘制背景必须匹配。拒绝越过 Category / Local / Semantic 背景，以及同节点多个背景的歧义。

修复后独立复核确认两项已关闭，无新增实际问题。正常 Alpha 链、透明包装层、文字与背景同节点通过；插入更近 Dark / Semantic 背景及多背景被拒。展示隔离、冻结阶段和范围约束的反例验证通过。

## 当前页面与保留缺口

恢复本地开发服务后，在应用内浏览器重新打开 `http://127.0.0.1:5173/#token-foundations`，确认总数 105、新色表和 Fill 前景配对预览。实际操作验证：

- Orange Solid 1 + OnColor 1：文字 / 图标均显示 2.95:1 不足，样本仍可见。
- Red Solid 3 + Text Red 1 / Icon Red 2：分别显示 4.80:1、3.17:1。
- Red Alpha 10% 叠 Background Neutral 3：同样前景分别显示 4.41:1、2.91:1 不足。

预览保留全部原值，只展示配对方向和对比度结果，不等于组件 Recipe 验收。原值对比度缺口仍见设计第 4 节；未自动换色、补 Dark、创建全色色板或迁移现有组件。表面检查覆盖当前登记类的一层 Alpha 链，不是通用 CSS 合成引擎；更复杂的透明层、组透明度及真实组件状态另行取证。
