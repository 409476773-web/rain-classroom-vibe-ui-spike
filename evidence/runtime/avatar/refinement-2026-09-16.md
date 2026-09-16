# Avatar 家族视觉细节修订验证

日期：2026-09-16。依据用户 14:53–16:18 截图反馈：对照旧 Vue 精查描边、圆角、角标；优先 Fill 图标；九宫格成员留白；资料使用气泡；纯关闭动作统一右上角 IconButton。本记录取代首轮报告中的对应样式和配色结论。

## 源码核对与修复

旧 Vue 只读参考：`src/components/Avatar/avatar.scss`、`AvatarGrid.vue`、`AvatarGroup.vue`、`src/components/Badge/badge.scss`、`ActivityOverlay.vue`、`src/styles/tokens.scss`。

| 细节 | 当前修复 |
| --- | --- |
| 单头像 | 24/32/40；方形圆角 4/6/6；描边独立于全尺寸图片，hover 不再把 40px 人物压缩至 36px |
| 交互描边 | 默认 1px 分隔；hover 中性边＋照片透明度；active 品牌边＋1px 内分隔，离线灰度不影响描边 |
| 横向组 | 首成员最高、向右递减；More 在成员层下方；24px More 使用 14px 图标，其他尺寸 16px |
| 九宫格 | 外框 40px/radius5；内容 38px/radius4/overflow hidden；外留白和横纵间距均 1px |
| 九宫格单元 | 1 / 2–4 / 5–9 人分别 38/18.5/12px，圆角 4/2/1px；独立内容裁切让四角服从整体圆角 |
| 状态角标 | 实色底＋白色图标；16/20/24px 角标对应 12/14/16px 图标；重叠 4/6/8px，首枚在上，外露 4px |
| 活动覆盖 | 完整 overlay-focus Token（浅色 15%、深色 70%）＋2px 模糊；环外扩 4px、线宽 2px、方形环圆角 8px；只旋转图标 0.8s 或脉冲环 1.6s |
| 图标 | computer-filled、mobile-filled、volume-filled；保留本来就是实心资产的 video-off、专用 loading/prohibited |
| 资料查看 | 单人、整组和小组资料复用非模态 Popover；无背景遮罩；More 与整组详情各自开关，关闭后焦点返回原入口 |
| 纯关闭 | 头像详情、More、标签管理气泡、独立选择预览、Dialog 尺寸预览统一右上角 IconButton；确认/取消保留原本动作含义 |

两处根因已移除：不存在的 `--rain-space-1` 造成间距归零；对图片容器直接加边框导致人物尺寸随交互缩小。未新增依赖和全局 Token。颜色和键盘 Focus 继续消费 Rain Next 当前规则；活动遮罩按用户后续要求直接引用完整 overlay-focus Token，不再单独修改 Alpha；深色会使用该 Token 已有的 70% 透明度，不声称深色配色逐字节复制旧 Vue。

## 当前验证

- [定向检查](refinement-scoped.log)：7 文件 / 22 用例通过。
- [浏览器检查](refinement-browser.log)：10 用例通过（Avatar 8、独立预览 2）。包括 0–9 人的实际圆角/裁切、1px 间距、图片交互尺寸稳定、遮挡顺序、Fill 图标、非模态和焦点返回。
- 圆角与图片尺寸回归先复现两项失败，再修复通过，见 [修复前](refinement-corners-before.log)。
- [类型检查](refinement-typecheck.log)和[构建](refinement-build.log)通过；构建仍有既有大文件提示。
- [整库治理](refinement-governance.log)：Lockfile、Workspace、Evidence、Boundary、Tailwind 通过；Token 阶段被并行列表任务 `apps/prototype/src/scenarios/list-composition/list.css` 的未登记消费者阻挡。未扩大豁免或修改其文件。
- 独立审阅 **passed**，所有已报告 P2 已关闭，见 [审阅记录](independent-review.md)。
- 真人图片就绪后隐藏 fallback，避免 hover 混入默认图；换图/失败恢复。最后 [2 项相关浏览器复测](refinement-fallback.log)通过。
- 资产索引 `--write` / `--check` 通过；[登记与索引 5 用例](refinement-metadata.log)通过；[真实源码扫描 1 用例](refinement-scanner.log)通过（177 项无关检查未运行）；修改空白检查通过。

## 视觉证据

[九宫格](grid-corners.png) / [实际圆角数据](grid-corners.json) / [角标](status.png) / [成员详情气泡](member-details.png) / [浅色](light.png) / [深色紧凑](dark-compact.png) / [390px 窄屏](narrow.png)。实现者已逐一查看关键截图；浏览器通过不代表用户已完成视觉验收。

## 对比度与验收边界

[颜色测量](color-measurements.json)已按当前真实消费者重新生成。浅色 neutral 白色图标为约 2.89:1，warning 为约 2.55:1，低于必要图标 3:1 要求；两项保留为 pending-review，acceptedException=false，不降低阈值、不改记为装饰图标、不声称可读性通过。

实现修订完成；用户随后回复“确定。”，当前头像运行视觉 Human Gate 于 2026-09-16 登记为 accepted（avatar-current-runtime-visual-only），对比度接受仍为 not-granted。无发布、业务迁移、Figma 写入、Git 提交/推送。

## 用户确认登记

本次“确定。”承接当前头像修订结果，只关闭头像家族当前运行视觉的 Human Gate；不扩大其他组件验收及对比度/辅助技术验收，组件仍为 registry-candidate / unpublished。确认记录、精确授权校验、Manifest、Registry 和展示页说明同步。此次只更新验收状态与说明，不改组件样式或行为。

确认登记后的定向回归：5 文件、14 用例通过，见 [visual-acceptance.log](visual-acceptance.log)。本轮不重复声称或重跑整库 Token、浏览器及构建；既有修订证据继续保留。

## 现有 Token 直接引用修订

用户后续要求“最好都是用现有token”，已移除局部颜色派生，直接使用完整 `--rain-overlay-focus`，并保留原有 Token 值不变。该修订随后获得用户“确定。完成视觉检验”的明确确认，当前视觉验收包含直接引用完整 Token 后的浅深主题效果。现有颜色登记 [2 用例](direct-token.log)和浅深主题/强制颜色 [2 个浏览器用例](direct-token-browser.log)通过，明确验证实际遮罩为浅色 rgba(34,48,81,0.15)、深色 rgba(5,9,26,0.7)。头像源样式不再包含 rgb(from)、color-mix 或硬编码 HEX 色号；图片透明度动效、原始图片资产和系统强制色彩按原用途保留。

Token 直接引用后的 [真实源码扫描](direct-token-scanner.log)通过；资产索引一致性与修改空白检查通过。

## Token 修订后的最终视觉确认

2026-09-16 用户明确回复“确定。完成视觉检验”。当前 Avatar 家族运行视觉 Human Gate 为 accepted，范围包含完整使用现有 Token 后的效果。当前阶段与精确校验中的确认原文已更新；六份 Manifest、两份 Registry 的 accepted / avatar-current-runtime-visual-only 状态经核对一致。对比度接受、其他组件验收、发布与迁移等边界不变。此次只登记确认，不修改组件实现。

本次登记复核：[2 文件 / 5 用例通过](final-visual-acceptance.log)，资产索引、Tailwind 合同与修改空白检查通过。
