# Dark 颜色验证记录

日期：2026-09-06。实现、自动验证与独立技术审阅通过；用户颜色 Token 视觉检查为 accepted，确认范围见下文。

## 来源与保真

- [confirmed-input.json](confirmed-input.json) 逐字节复制已确认输入，SHA-256 为 `8f5e94b7011f6bf734221cb28d2f977af0cd02ba90867860965592056721d434`。105 项 Dark RGB / Alpha、ID 均逐项匹配。
- `Fill/Neutral/Solid/2` 按用户确认修正为 `#2A304A`；77 项空 Alpha 均取 100%，28 项原有明确 Alpha 保持。
- [baseline.json](baseline.json) 冻结的全部 105 项 Light 值、身份、排序、来源、Profile 与生命周期保持；tokens.css / tailwind-theme.css 非生成段哈希保持。
- 原始 Excel 恢复数据未修改。4 项空主题用法说明保持为空；Dark 配对按已注明的预览假设呈现，不冒充已确认组件方案。

## 自动验证

- 核心先补失败用例，[baseline-red.log](baseline-red.log) 留存未配置 Dark 导致的失败；随后 18 项核心测试通过。
- Playground 7 项单测、6 项专项 Chromium 测试通过，测试类型检查通过。初次完整检查捕获测试使用不支持的 `exact` 选项，移除后重新执行完整验证。
- 最终 `pnpm verify` 退出码 0，见 [verify.log](verify.log)：治理、897 个图标、类型、35 文件 / 779 项测试、构建、42 项 Chromium 均通过。
- 覆盖实际主题与声明一致、嵌套 Light 恢复、Dark 5 / 15 / 30 / 80% Alpha、真实父底切换、跨主题和未知主题拒绝、原 Light 样例隔离。

## 浏览器检查

- 真实 `127.0.0.1:5173/#token-foundations` 页面已打开，选择“预览主题 → Dark”。
- `Fill/Neutral/Solid/2` 页面文本为 `#2A304A`，实际绘制 `rgb(42, 48, 74)`。
- Dark Second Solid 1 实际为 `rgb(72, 83, 128)`，OnColor/1 的文字及 Icon 对比度均为 7.43:1。
- [Dark 配对截图](dark-pairing.png)：Red Alpha 10% 叠 Dark Background/Neutral/3，文字 4.84:1、Icon 3.66:1。叠 Neutral/1 时文字仅 4.26:1，正确提示不足；保留原色。
- [Neutral Solid 双主题截图](dark-neutral-solid.png)：可并排核对七档 Light / Dark。

## 独立审阅与边界

独立审阅见 [independent-review.md](independent-review.md)。现有 Semantic / 组件配方未做 Dark 映射，无颜色自动替换、Figma 写入、发布、迁移或 Git 操作。预览与运行输出可供用户检查，不代替用户视觉验收。

## 用户视觉确认 · 2026-09-06

用户原话：“这些颜色token的视觉已没问题。接下来应该做什么？”

据此确认当前 105 个公共颜色身份的 Light / Dark 色板视觉，包括四族补充与 Dark 接入；两个颜色增量的 Human Gate 均登记为 `accepted`。该确认仅针对颜色 Token 视觉，不推广到所有文字大小、父背景与交互状态的具体搭配，也不关闭 Typography / Line / Radius / Spacing 或现有组件的独立验收。已记录的对比度缺口保持，后续按首批组件的实际表面和状态选择组合。

下一步沿用[首批 Size / Density 方案](../../../docs/plans/2026-09-05-size-density-first-recipes.md)：并行准备首批组件颜色映射与 Query Standard / Compact 对照，收口后进入 Input、Button、TextButton 及查询区的完整方案建设。本轮只登记颜色视觉确认，未推进组件实施或发布阶段。

验收登记验证：`scripts/verification-helpers.test.ts` 的 207 项测试与 `pnpm verify:governance` 通过。覆盖精确用户确认、缺失或越界确认拒绝、历史待验收兼容，以及其他基础与组件 Gate 保持独立。运行颜色与组件代码未变；本次未重复整套浏览器回归。
