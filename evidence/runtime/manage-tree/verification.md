# ManageTree local Pattern verification — 2026-09-27

当前阶段：用户于 2026-09-29 人工检验通过当前 Tree 视觉，确认 Web 高保真原型范围的 Tree／ManageTree 基础建设完成，进入页面使用与按需维护。交互增强已落实；真实读屏、常态对比度及全库校验保留为后续事项。详见[最终验收记录](../tree/closeout/verification.md)。以下各批次记录保留发生时的范围，历史待办不覆盖当前结论。

The candidate remains in apps/playground/src/patterns/manage-tree and uses simulated persistence at [#manage-tree](http://127.0.0.1:5369/#manage-tree). The user accepted the representative runtime visual on 2026-09-26. Deletion uses an icon-anchored Popover; discard/conflict use AlertDialog. The original accepted screenshots are retained separately. Domain Dialog/examples added on 2026-09-27 have inspected runtime screenshots but have not received a new user visual acceptance.

## Current checks

The combined Tree/ManageTree suite passed **84 tests across 9 files**. Playground typecheck/production build, UI typecheck, 899-icon integrity and **16 production-browser cases** passed. Source exports/dependency/evidence references are checked directly for both local Tree Registry items. Commands and wider coverage are in [Tree verification](../tree/verification.md); domain-batch fingerprints are in [domain-facts.json](domain-facts.json); the later renderer batch is in [renderer-facts.json](../tree/renderer-facts.json).

The previous batch covered immutable drafts, insertion, explicit title confirmation, dirty exit, save failure/retry/conflict, incomplete-subtree guards, canonical response validation, revision ownership and stale async results. Those regressions remain in the complete current suite.

## Domain fields and editor

- A host projects its business record into TreeNodeRecord and retains it in source. withTitle/withChildren write title and structure back immutably; supplying either requires isSameNode for editable-field equality. Rebuilding parent source objects therefore does not create false changes after canceling a fresh child.
- renderEditor shares one field buffer with inline editing. Confirm invokes title and field validation; cancel does not change the draft. A field update cannot change identity or children. Structural actions wait for validation; late results cannot restore old structure or apply after permission is revoked. Errors are available inside the Dialog as well as through onFeedback.
- A simultaneous title and business-field edit emits both rename and update. The full submitted node in draft supplies update values. treeOptions is a runtime whitelist and cannot replace data or controlled view ownership; renderActions composes the default actions with an edit entry.

The independent reviewer reproduced four data-safety issues: structure restored after a pending unchanged edit, false dirty state after canceled insertion, missing update beside rename, and permission revoked during validation. All were fixed with failing-then-passing regressions; the reviewer reran 13 adapter/model tests and found no remaining P1/P2 in that scope. This does not imply full-plan or accessibility review.

## Migration, save and view recovery

- planDelete accepts a sequence of validated moves followed by deletion. Each step applies to a private local result; the draft changes only after the whole plan succeeds. A failed step leaves the original tree intact. The anchored confirmation identifies migration when applicable; incomplete subtree migration is rejected.
- Save maps expansion, row selection, focus, direct checks, include/exclude intents and scroll-anchor key together. Keys absent from canonical data are removed. The anchor restores the same row's relative vertical offset and horizontal scroll inside the Tree viewport, not document-page scroll.
- The chapter–knowledge fixture checks dialog cancel/confirm, a new chapter without a task type, temporary-key mapping, checks and exact relative scroll recovery. The chapter–task fixture requires taskType only on tasks, migrates children before removing their chapter, preserves the complete draft and original server snapshot on simulated save failure, and retries successfully.
- The 320px browser assertion found toolbar overflow. Wrapping existing buttons at the shared toolbar fixes it; desktop styling, connector geometry and global Tokens stay unchanged.

Inspected screenshots: [field Dialog](domain-editor.png), [saved view with scroll retained](domain-saved.png), [failed save with draft retained](domain-save-failure.png). All previous connector, compact-edit-control and anchored-delete browser checks also passed.

## Remaining acceptance

- Local fixtures do not establish real backend conflicts, atomic transactions or production integration.
- Real screen-reader operation, 200% browser zoom, forced-color interaction and contrast acceptance remain open. Existing accepted visual scope is unchanged; it does not cover every new domain form.
- The Tree renderer-context/empty-state API and further deep repeated-move cases remain in the plan. Refreshed whole-workspace governance checks still fail on documented frozen history, Token eligibility and missing ui-command Registry; targeted passes do not constitute a repository-wide pass.

The local candidate remains unpublished and has not been migrated into a real business page.

## Renderer handoff follow-up

`renderActions` now includes `tree: TreeRenderContext`; `treeOptions.renderEmpty` composes the shared empty UI. A retained `edit` callback must resolve the current key through the latest entry: regression tests first reproduced bypassed permission, and now preserve pending input, honor permission withdrawal and refuse view-mode editing. The independent reviewer reran all 14 renderer/adapter tests and found no open P1/P2 in this limited scope. Node-only CSS no longer hides the composed Empty action. No field-buffer, save transaction, visual-default or ownership model was replaced.
