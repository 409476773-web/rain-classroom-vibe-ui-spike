# Attachment 整合视觉实施记录

本记录仅对应 2026-10-16 附件切片；其他组件的视觉历史见 `design-qa.md`。

用户选定白底浅描边与浅灰底两种外观并确认整合稿后，本轮更新既有附件工作流 Recipe。Ant Design X FileCard、TDesign 上传、assistant-ui 附件提供结构与交互参考；字体、颜色、正式图标及行为组件使用 Rain 现有资产。

文件身份保留格式图标、扩展名和真实大小；正常态不重复状态文字。上传/失败/受限使用独立小状态位，操作按权限呈现，文件信息、打开、替换和移除进入更多菜单。七状态业务示例保持页面私有，字幕等派生结果的失败只影响相应区域。

实现沿用真实选择、校验、预览、下载、取消、重试、原位替换和焦点恢复。报告、媒体、字幕及审核示例明确说明模拟范围，不新增共享业务状态机。

确认稿、实页截图、已修正差异与验证结果见 `evidence/runtime/attachment-visual-2026-10-16/verification.md`。实际运行效果仍待用户审核；本地自动检查与正式发布保持独立。

2026-10-16 图标反馈：按具体后缀复用49个正式彩色格式资产；24px图形置于32px底托，真实图片缩略图保持40px。相关字幕文字维持同列，格式展示不扩大预览或上传允许范围。验证见 `evidence/runtime/attachment-visual-2026-10-16/feedback-01/verification.md`。


## Attachment confirmed scenes — 2026-10-16

User explicitly authorized implementation after confirming the original Figma node `MbWg1ft5zk1JRQiQ6dS30e / 1:15618`, short inline progress, ordinary/composer/modal layouts, narrow densities and media without corner format badges. System Mode extends only the unpublished attachment workflow candidate; the four scenario containers stay page-private.

The recipe now separates card size, card orientation and collection layout. Documents use existing intrinsic format icons; images/video use real content thumbnails, with a formal file fallback. Known progress is a 64px/4px inline bar plus percentage below the name, replacing normal size; processing remains indeterminate. Drafts foreground direct removal, keep size inline in wide containers and omit it in narrow ones. Compact picker is the same intake chain presented as a text button.

The original nine Attachment parts, transport controller, XHR adapter, resource helpers, Tokens and dependencies are preserved. Video uses bounded native controls with conservative MIME/name/source/permission guards and explicit error fallback; there is no new media engine. Ordinary/composer/dialog/media controllers remain independent; folded/closed views retain state, failures remain reachable at 3/4-file narrow boundaries, and retries target failed uploads only.

The 24/12 counts are examples, not new upload caps or business rules. Draft sending is local echo only. Eight independent generated photos and the derived real four-second H.264 clip are illustrative, not classroom records. Sources, QA comparisons, checks and independent review are in `evidence/runtime/attachment-scenarios-2026-10-16`. Runtime acceptance remains awaiting_human; no publication, Figma writeback, migration or Git mutation was performed.


## Attachment action feedback — 2026-10-16

The user's four screenshots authorize this finite correction: download/more/draft-remove IconButtons use the neutral palette, and additional status feedback stays within the existing two-line information area without increasing attachment height. The recipe and equivalent legacy examples now use IconButton highlight=none; its existing states supply the appearance.

Filename plus one metadata line carries operation feedback and error/resource/permission context. Long content ellipsizes; native title and file information retain the full size, simultaneous reasons and replacement candidate. Existing status/alert announcements remain. Normal rows stay56px and compact rows40px through the checked state transitions. This supersedes the preceding scene QA allowance for taller error rows. Engines, original Attachment parts, Tokens and generated media are preserved.

Current source/evidence: `evidence/runtime/attachment-scenarios-2026-10-16/feedback-01/source-bindings.json` and `verification.md`. The predecessor seal remains unchanged. This local repair has scoped automated and independent review evidence; visual Human Gate, contrast, publication, Figma and production-service acceptance remain separate.


## Attachment intake — 2026-10-16

用户确认上一轮列表、媒体网格和输入区三种入口设计，并明确要求落到当前预览。本轮为 Prototype Mode 的页面私有 local-experiment。资料列表与弹窗使用标题栏中性添加按钮和首次添加空态；媒体在集合最后放入等列宽添加位；消息输入始终保留回形针入口。下方详细工作流沿用同一列表入口及既有约束。

局部 intake 衍生自现有 Picker 的原生 input/receive 防重入机制，只负责选择、所属范围内的文件拖放和入口反馈。文件校验、控制器、附件卡、预览与传输仍复用现有 Rain 能力。媒体添加位使用 ui-button 的具名本地配方，图标来自 add-circle-outline、attachment、upload、image 单图标入口；颜色、字体和几何使用现有 Rain Token。

当前实际源绑定、已选稿及验证：evidence/runtime/attachment-intake-2026-10-16/verification.md。公共 Attachment、工作流和 Foundations 的67个相关源文件校验和保持；本轮不新增公共 Props、Tokens 或组件。用户确认的是设计方向，实际实现仍待本次预览审核。


2026-10-16 添加图标反馈：用户明确指定当前附件预览的“添加文件”与媒体添加位统一使用图1的 `icon/add-bold`。此处为当前入口的用户指定选型，替换列表、弹窗、详细工作流及媒体的两处复用实例；不修改全库图标选择规则。记录见 `evidence/runtime/attachment-intake-2026-10-16/icon-feedback-01/verification.md`。
