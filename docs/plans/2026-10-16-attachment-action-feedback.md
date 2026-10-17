# Attachment Action Feedback

Goal: apply the user's four screenshots: neutral download/more/remove IconButtons; operation feedback remains within title + one metadata line without increasing card height.

Scope: current AttachmentList recipe, its CSS/tests and the two equivalent legacy demo buttons. Reuse IconButton highlight=none, preserving its hover/focus/disabled contract. Keep existing file icons, uploads, media engine, primitive parts and Tokens. User feedback explicitly authorizes this finite correction.

1. Preserve predecessor evidence and before files in attachment-scenarios-2026-10-16/feedback-01.
2. Observe a failing test for pending download / compact error visibility; implement feedback priority and keep role=status/alert. Single-line second-row content may ellipsize, with full text available through title/file details. Replacement retains original-resource and candidate-progress semantics in that same metadata area.
3. Verify computed neutral colors and unchanged heights for normal, filled-dialog and media downloads; verify upload failures, narrow compact visibility, menu/focus and actual downloads. Test desktop and360px, light/dark.
4. Append scoped source bindings, contract note and QA; retain predecessor seals and awaiting_human/unpublished status. No broad lifecycle, release, Figma, dependency or engine changes.
