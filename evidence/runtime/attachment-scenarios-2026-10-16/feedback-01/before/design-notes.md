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
