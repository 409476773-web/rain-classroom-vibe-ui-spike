# ManageTree (Pattern candidate)

`ManageTree` composes public `Tree`, `Input`, `Button` and `IconButton`. It holds committed data, a structural draft, and one unconfirmed node-field buffer. Its source is in Playground while the Pattern contract is being verified; it is not a public UI export.

```tsx
<ManageTree
  data={committedTree}
  revision={revision}
  onSave={async ({ draft, changeset, baseRevision, idempotencyKey, signal }) => saveAtomically({ draft, changeset, baseRevision, idempotencyKey, signal })}
  onFeedback={({ intent, message }) => showMessage(intent, message)}
/>
```

`onSave` returns `{ status: "success", treeData, revision, keyMap? }` or `{ status: "conflict" }`. A success must contain a complete valid canonical tree and a mapping for every temporary key. Failure and conflict keep the draft. Loading a newer version requires a separate user confirmation. A retry of the same snapshot reuses its idempotency key. `loadLatest` is only called after confirmation.

Mappings cannot reuse an existing submitted key or collapse multiple nodes. An accepted response becomes the base revision of the next local save even before the host echoes it. Confirmed latest-data loading locks editing and duplicate requests; stale or unmounted responses are ignored. If authoritative props have changed while editing, clean exit or confirmed discard accepts those already-received props.

The default editor commits a title to the draft only on Enter or its confirm button. Blur leaves the input open; Escape cancels its buffer. F2 opens the focused title. Sibling insertion is after the current node, child insertion is last, and delete removes from draft after confirmation. Save with a changed title buffer asks for explicit confirmation first. Exiting a clean draft is direct; exiting a dirty draft asks to discard.

`adapter` can create domain nodes, restrict edit/add/delete/move, and validate titles asynchronously. Incomplete remote subtrees are blocked from deletion unless `adapter.planDelete(node, draft)` explicitly returns `true`; this authorizes the UI action only. `onSave` must execute that subtree deletion atomically against `baseRevision` and return a complete canonical tree. The changeset records one delete for the removed subtree root. Feedback is delegated to the host; there is no global notification queue.

The incomplete-subtree guard checks all loaded descendants, not only the clicked node. Deletion rechecks permission at confirmation. Adding inside an incomplete parent is blocked until its ordering is known. Canceling a new node removes it immediately and restores its previous selection/expansion and originating focus. A fresh default title still needs explicit confirmation or cancellation before another structural action.

`viewState` and `onViewStateChange` let a host control expanded, selected, focused, optional `checkState` and `scrollAnchor` as one snapshot. Successful save maps direct checked keys, include/exclude intents and the stable scroll key along with the other view keys; keys absent from the canonical tree are removed, missing focus falls back to its first root. The anchor stores key, relative vertical offset and horizontal scroll, not a row index. A controlled host must accept the whole snapshot. `mode` also requires `onModeChange` when controlled. `defaultMode`, `defaultExpandedKeys` and `className` configure the initial local state and wrapper. Deletion uses an icon-anchored `Popover`; discard/conflict reuse `AlertDialog`.

`adapter.validateTree(draft, baseRevision, signal)` may validate the locked submission snapshot before the backend request; if the authoritative revision changes during validation, save is canceled and the draft stays available for conflict handling. A success response missing any submitted node is rejected.

Preview: `http://127.0.0.1:5369/#manage-tree`, using simulated local persistence. The representative runtime visual was accepted on 2026-09-26. Current verification is recorded in `evidence/runtime/manage-tree/verification.md`; it does not imply production, backend, contrast, or screen-reader acceptance.

Domain records use the existing `TreeNodeRecord.source` boundary. The host projects its id/name/children into the standard node once and retains the business object in `source`. `adapter.withTitle(node, title)` and `withChildren(node, children)` return new nodes and write those changes back into the business fields. They must preserve identity; `withChildren` must retain the supplied children array. With either writer, `isSameNode(a, b)` is required: compare editable business fields while excluding descendant arrays and other derived structure. This prevents parent object reconstruction from becoming false edits. No additional tree index or generic schema engine is created.

`renderEditor({ node, value, onChange, confirm, cancel, validating, error })` replaces the default inline editor with a field form or Dialog. `value` is the single unconfirmed node buffer; use immutable `onChange(nextNode)` updates. Key and children cannot be edited through this field channel. Confirm trims/checks the title, invokes `validateTitle` and `validateField`, then updates the draft. Error remains available inside a modal and is also sent to `onFeedback`. Structural operations wait during validation; changed input/cancel invalidates late results, and permission is checked again before applying them. Dialog close should call `cancel`; return focus is handled by ManageTree, so the example sets Dialog `finalFocus={false}`.

`renderActions(node, { defaultActions, edit, tree })` composes additional business actions around the normal action set. `tree` is the public TreeRenderContext, using the managed view state. A retained `edit` callback rechecks the current node, editing mode, lock, permission and pending buffer before opening an editor. `treeOptions` admits appearance, density, lines, row-selection mode, check configuration, search, leading/description/meta renderers, `renderEmpty` and `moveOptions` (constraints and automatic behavior). It rejects data, callbacks and view-state ownership overrides. Managed editing does not expose fixed-height virtualization or a second loading owner.

`planDelete` may return `true`, a rejection string/false, or an ordered array of `{ sourceKey, targetKey, placement }`. Each migration is validated against the preceding local result, followed by deletion; only the complete valid result becomes the draft. A rejected step leaves the original draft unchanged. Incomplete subtrees cannot use migration steps until loaded. Confirmation identifies a migration when present. This local atomicity does not replace server atomicity: `onSave` must accept the full draft/changeset atomically. A `rename` and an `update` may both refer to one key when title and other fields change together; `update` refers to that node's complete editable fields in the submitted draft.

The page contains chapter–knowledge and chapter–task examples with real field dialogs, task-only type validation, controlled checks, temporary-key mapping, migration-delete and simulated save failure/retry. They are local fixtures, not proof of a real business backend or general Pattern promotion. Real screen-reader/200% zoom and contrast acceptance remain open.

### G1 review-07 · 课程资源树与工具栏

2026-09-30六处浏览器批注：R2复用标准Tag（20px及既有类别色），知识点取消装饰图标；短提醒与右侧工具栏同排，完整说明收入邻近Tooltip；各行保留等宽操作区、右侧元信息跨层级对齐。ManageTree的保存/退出使用primary/tertiary，添加保留secondary，草稿事务与Tree Core不变。Scope下拉图标使用icon-neutral-5及fill-neutral-alpha-6浅底。5项浏览器检查、29项ManageTree检查及类型检查/构建通过，见 `evidence/runtime/navigation-v042/review-07/README.md`；本轮外观继续待用户复审。
