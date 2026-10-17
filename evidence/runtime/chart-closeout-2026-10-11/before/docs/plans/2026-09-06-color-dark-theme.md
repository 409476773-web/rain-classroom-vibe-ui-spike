# Dark 颜色接入与 Playground 检查

日期：2026-09-06。工作模式：System Mode。

用户明确要求“开始把这些 dark 模式的颜色 token 更新到组件库中，之后我要在 playground 中进行检查”。本次授权覆盖已有 105 个 Category ID 的 Dark 数值、主题输出及预览；作为 `tokenRefinements.colorDarkTheme` 单独登记，补充原阶段对 Dark 的限制。原阶段及 Light 补充的生命周期保留。

## 输入与假设

- [确认输入](../../evidence/runtime/color-dark-theme/confirmed-input.json)来自已恢复的 Excel，105 项完整。用户明确修正 `Fill/Neutral/Solid/2` 为 `#2A304A`，77 个空 Alpha 均为 100%；原 28 个明确 Alpha 保持原值。
- 输入 SHA-256：`8f5e94b7011f6bf734221cb28d2f977af0cd02ba90867860965592056721d434`。原恢复文本、恢复 JSON 和确认表继续保存在项目外层 outputs 目录。
- 4 项主题用法说明仍为空。预览暂沿用此前四个新增色系的前景方向：Solid 1/2 使用 OnColor，Solid 3 / Alpha 使用 Neutral 或同系 Text / Icon。Dark 的 Neutral 解析为用户提供的浅色文字，不能把 Light 文档中的“深色”字面移植到 Dark。
- 此次确认的是色值，不等于全部配对已经通过。实际对比度不足时保留样本并提示，不自动改色或替换前景。

## 实施与验证

1. 冻结现有 105 项 Light 数据和原组件 CSS；补充 Dark 值、来源、解析以及用户实际使用的 Alpha 档位 5 / 15 / 30 / 80。
2. 复用单源生成，公开 Category 变量支持 `data-rain-theme="light"` 和 `data-rain-theme="dark"`，默认仍为 Light。支持嵌套 Light 重置；未知主题不回退。
3. Playground 提供 Light / Dark 色板与主题选择，配对预览按当前主题解析文字、Icon、Fill 和 Alpha 的真实父背景。
4. 验证 105 项与输入逐项一致、Light 原值不变、CSS 与元数据主题相符、透明合成和消费资格、浏览器实际显示；执行现有完整质量门和独立技术审阅。

不新增颜色或自动映射既有 42 项 Semantic / 组件配方。Dark Category 可供明确声明主题的消费使用；全组件 Dark 迁移、交互状态及产品级主题切换仍需对应方案。`Background/Dark` 保留原公共身份，两主题分别有值，不等于主题开关。

## 状态

实现、完整自动验证与独立技术审阅已通过。2026-09-06 用户明确表示“这些颜色token的视觉已没问题。接下来应该做什么？”，颜色 Token 视觉 Human Gate 记为 `accepted`，范围为当前 Light / Dark 色板；原始数值与配对限制保持。完成证据及确认边界登记于[验证记录](../../evidence/runtime/color-dark-theme/verification.md)。其他基础项、组件状态与具体搭配仍分别验收。无 Figma 写入、发布、业务迁移或 Git 操作。
