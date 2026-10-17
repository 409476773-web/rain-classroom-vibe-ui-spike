# G4 字号与图标反馈修正

用户明确要求：标题默认 16px，极少数层级拥挤时可使用 17/18px；关键数字最大 28px；课程资料的灰色图标底块不变，仅缩小内部图形；整行链接改用更浅的线形右箭头。

在既有 card-v2 工作树按 System Mode 完成本轮。规则修改同步源合同、生成输出、展示、使用说明和实际调用，不以局部视觉覆盖冒称合同已经改变。原始字号 Token 身份保留，不进行全库历史 hero 或业务页面迁移。新证据：`evidence/runtime/g4-review-sizing-2026-10-11/`。

## 最小实现范围

1. Typography 单一来源：`heading-page` 从 24/32 改为 16/24；`data-default` 从 36/42 改为 28/36。两种命名 Heading 预设默认均 16px，局部例外只允许显式 17/18px；Data 用途组合不允许超过 28px。保留 19 档原子字号、字体、字重、数字规则、Reading 默认和浏览器缩放。
2. 排版试用页按用途筛选字号选项，保留既有行高自适配、Equal、恢复与单位分离。通过现有生成器更新实际受影响的三项输出，不直接改生成区。
3. ComponentDoc 的 H1/H2 统一 16/24。Input、Select、InputNumber、Tag 四个直接使用 heading-page 的调用处把过时的 24/32 改为明确的 16/24 Token，避免页面未分层 H1 reset 压过预设；其他历史页面样式不在本轮迁移。
4. Item 文件图标从 24×24 改为 20×20，40×40 底块与颜色、位置不变。导航使用正式 `@rain-next/ui/icons/arrow-right` 的线形尖括号，颜色沿用 Icon/Neutral/3；forced-colors 保持可辨认。复制代码使用同一资产与组合。

## 必须到达的位置

- Foundation：typography-contract、相应单测；生成的 typography.css、tailwind-theme.css、token-foundations-v1.json。
- Playground：TypographyPanel、相应单测；G4 页面和样式；共享文档与四个标题预设调用 CSS；现有 G4 浏览器检查与受影响的 Token 浏览器用例。
- 使用与追踪：Typography Manifest、Registry 的实际修改状态、两个使用指南；现有有限后继与本轮绑定、反向检查、独立证据。

## 验证与保留边界

- 先保留新字号与图标要求的真实 RED，再检查默认、17/18 显式例外、Data 超过 28 拒绝、选项和行高关联。
- 实测 G4 三页的真实标题、数据值与单位、文件图标和底块、两主题下导航形态与颜色；保留阅读／下载同尺寸、下载内容、焦点、窄屏和进度状态检查。
- 检查四个直接标题调用页、Foundation Data 与排版试用；较小的既有业务局部尺寸继续保留。
- 本轮之前已实际保存 81 份原件与 SHA。原 G4、上一轮视觉修正、原字号身份和各阶段 Gate 保留；新反馈作为有限后继，不重写旧证据或声称完成全库验证。
- 自动检查、独立审阅、用户视觉判断、发布与业务采用分别记录。不开新依赖，不进行 Git、Figma、发布或业务迁移。
