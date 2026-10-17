# Tree implementation verification — 2026-09-28

当前阶段：用户于 2026-09-29 人工检验通过当前 Tree 视觉，确认 Web 高保真原型范围的 Tree／ManageTree 基础建设完成，进入页面使用与按需维护。交互增强已落实；真实读屏、常态对比度及全库校验保留为后续事项。详见[最终验收记录](closeout/verification.md)。以下各批次记录保留发生时的范围，历史待办不覆盖当前结论。

## Current scope and acceptance

Local candidate in .worktrees/card-v2, based on [accepted A layout](../../../docs/design-reviews/tree/accepted-layout-a.html) and [implementation rules](../../../docs/plans/2026-09-25-tree-implementation-rules.md). The user accepted the representative React runtime visual on 2026-09-26: “确定。完成视觉验收”. The accepted feedback-rich-selected.png, feedback-manage-edit.png and feedback-manage-delete.png were preserved. Continuation screenshots use separate names.

The core-interaction/data-safety batch of T2–T6 was followed by domain field editing, atomic local migration-delete and complete view-state mapping in T5. The subsequent renderer/empty batch is complete. This is not completion of the full plan: real assistive technology/zoom, contrast decisions and governance checks stay open. No global Token, dependency, publication, Figma or Git change was made by these batches. The new domain examples have runtime checks and inspected screenshots, not a new user visual acceptance.

## Executed checks

| Command / check | Current result |
| --- | --- |
| pnpm exec vitest run packages/ui/src/tree apps/playground/src/patterns/manage-tree | 9 files, 86 tests passed; previous renderer batch was 84 |
| pnpm --filter @rain-next/ui typecheck | Passed |
| pnpm --filter @rain-next/playground build | Typecheck and production build passed; existing large-chunk advisory remains |
| TREE_PREVIEW=1 pnpm exec playwright test --config tests/e2e/tree.config.ts | All 16 cases passed against production output on local port 5372: 15 in the full run, then the large-tree case after correcting its virtual-window scroll setup |
| pnpm verify:icons (previous domain batch, unchanged icons) | 899 usable icons, 0 failures |
| Direct validateAsset for both registry/tree.json items | Source exports, local dependency references and evidence passed |
| Independent state/data-safety review | Retained edit callback issue fixed; 14/14 renderer/adapter tests independently passed, no open P1/P2 in reviewed scope |
| pnpm exec tsc --noEmit --project tsconfig.tests.json | Tree test types pass; whole command still fails at unrelated command.test.tsx:20 callback parameter type |
| Tree CSS consumer checks | Consumer definitions match contract and actual selectors; no global Token value changes |

The complete current suite and production browser run include all previous geometry/interaction checks and two domain scenarios. The narrow domain case found toolbar overflow; wrapping its existing controls fixes the shared cause without changing desktop paint. Domain-batch fingerprints and environment are in [domain-facts.json](../manage-tree/domain-facts.json); [continuation-facts.json](continuation-facts.json) preserves the previous batch. The later drag-target patch is recorded separately in [drop-target-facts.json](drop-target-facts.json).

## What changed and how it was checked

- Async: initially expanded incomplete branches load; different branches run concurrently; one branch waits for host writeback instead of reloading; revisions invalidate old responses; failure/retry, loaded-empty and explicit refresh share the same request path. Unit tests cover delayed host writeback and stale responses; the browser exercises two concurrent branches, inherited checks and one failure/retry.
- Checks: independent mode ignores cascade intent. Restricted current nodes preserve their own value without blocking eligible descendants. Reparenting preserves existing checked membership and prior subtree intent; an aggregated checked parent never becomes future-child inclusion. Tests cover locked-node changes, moves into and out of inherited selection, late children and both reviewer reproductions. The browser moves one checked child into an empty directory and verifies its check remains.
- Moves: a complete empty branch without a children property now retains the inserted subtree. Incomplete destination order is rejected. Filtering/disabling drag clears active movement and timers; invalid targets receive no valid drop indicator. Browser paths cover mouse and keyboard movement, automatic hover expansion, edge scroll and filter/locate availability.
- Focus: one row participates in ordinary Tab entry; F6 enables its controls and Escape returns. Disabled/hidden checks do not turn Space into row selection. Deleted focus falls back to adjacent siblings/ancestor; external search keeps focus. Virtual scrolling keeps the offscreen focused row mounted without undoing user scroll.
- Virtualization: obsolete scroll is clamped after filter/collapse; incomplete/asynchronous/custom or variable-height content is rejected. 1,000 and 10,000 complete records plus a 15-level path have an interactive example, production browser measurement and internal horizontal scrolling at 320px.
- ManageTree: canceled new nodes restore prior view/focus; nested incomplete delete, latest-data locking, invalid key maps and revision transitions have executable checks. See [ManageTree verification](../manage-tree/verification.md).
- Domain editing: standard records retain business data in source; immutable field/child writers, one custom-editor buffer, explicit async validation and local migration-delete share the existing draft. Controlled check intents and a stable tree-viewport scroll anchor survive canonical key mapping. Chapter–knowledge and chapter–task fixtures cover task-only validation and whole-snapshot save failure/retry. A real backend transaction is not claimed.

## Visual and performance evidence

The browser rechecks 12px horizontal arms, 4px clearance before complete branch/leaf targets, 4px below the expander, Rich first-line alignment and a continuous ancestor line through nested siblings. Reviewed render screenshots: [Rich selected](continuation-rich-selected.png), [editing](continuation-manage-edit.png), [anchored delete](continuation-manage-delete.png), [async move](functional-async-move.png), [deep narrow](functional-deep-narrow.png). Expanded examples are appended below the existing reviewed examples.

[Production scale facts](functional-scale-facts.json) record browser version, DOM count, mounting 10,000 nodes, collapse, expand, reveal and search timings. The 1,000-record window mounted 14 rows; the 10,000-record window remained below 25 rows, including retained focus. Timings are one local run: button action to two animation frames; search includes browser input/assertion round trips. They are not cross-device performance guarantees.

## Acceptance matrix trace

| IDs | Evidence | Still open |
| --- | --- | --- |
| V01–V04 | Existing geometry tests plus Rich line continuity, wide/narrow screenshots | Six repeated moves to five levels and back now checked; no blanket guarantee for arbitrary combinations |
| V05–V06 | 320px internal overflow, dark selected paint, forced-colors line visibility | Real 200% browser zoom; contrast decision |
| S01–S08 | Model/selection/component tests, permission changes, reparent snapshots and async inheritance | Real screen-reader operation |
| Q01–Q02 | Filter/locate, search expansion persistence, drag availability, external-input focus | Remote unknown-path search is not supported |
| L01 | Revision/late-result, awaiting-data, retry, loaded-empty tests; browser concurrent loads | Real remote backend integration |
| D01–D04 | Move validation, empty branch, incomplete target, mouse/keyboard/hover/edge browser cases | Real assistive technology; six deep moves and last-sibling geometry now checked |
| M01–M06 | ManageTree model/component/save/adapter tests; explicit field dialog; check-intent and scroll-anchor key mapping; browser edit/save/delete | Real backend and assistive-technology operation |
| M07 | Chapter–knowledge/chapter–task fixtures; task-only taskType validation; atomic local migration-delete; simulated failure/retry | Real server atomicity and business-page integration |
| A01 | Unique IDs, row versus Checkbox semantics, F6/Escape and focus tests | Real screen-reader combination |
| P01 | Fixed Basic window, 10,000 production case, 15 levels, manual scrolling/focus, Rich rejection | Real zoom; broader device performance |

## Remaining plan and governance

### Drag-target feedback correction, 2026-09-27

The user approved a very pale blue surface with a 1px pale blue outline for the temporary inside target. It now uses existing Fill/Brand/Alpha/4 and Border/Brand/3, within the target row and below content/connectors. Before/after insertion lines and move logic retain their prior behavior. The target is absolutely positioned, so it cannot consume a flex slot or displace content. No global Token value changed.

The existing mouse-hover case first failed on the original 85% blue and then on incomplete target bounds, before both were corrected. It now checks hover expansion, 10% fill in both themes, 1px outline, unchanged title color, complete row coverage, layer order and cleanup. All 79 unit tests, 13 production-browser cases and Playground typecheck/build passed. Screenshots were inspected: [light](drop-target-light.png), [dark](drop-target-dark.png). The two inside paints match their consumer contract and pass Token-role/theme eligibility. On 2026-09-27 the user confirmed the displayed revision with “确定。tree组件还有需要建设的么？”. This accepts the revised drag-target visual only, not contrast or full-plan completion.

### Still open

- ManageTree consumes standard TreeNodeRecord with business source projection and immutable writers; it does not accept arbitrary raw domain trees directly. The planned local field editor, treeOptions, action composition, checked/intents/scroll mapping and both business fixtures are implemented. Backend atomicity and actual business integration remain host responsibilities, not verified by the simulated endpoint.
- Tree reveal only resolves known indexed keys; it returns an explicit failure for unavailable paths. Renderer callbacks now receive node plus TreeRenderContext; renderEmpty distinguishes empty data and no results.
- Real screen-reader combinations and 200% real browser zoom remain unverified. Forced-colors keyboard navigation/checking now passed. IAB zoom shortcut left width=679 and DPR=2 unchanged; native Codex menus were unavailable to the UI tool. No CSS zoom or viewport emulation is claimed as real zoom. The tool exposes accessibility state but no actual screen-reader speech, so AX snapshots are not called a screen-reader pass.
- The approved weak helper on white remains 2.28:1; the pale arrow remains 2.53:1. These are not contrast acceptance. No global Token or accepted paint was changed. A [local readable comparison](readability-comparison.md) is now available, using existing Text/Neutral/3 and Icon/Neutral/3 only in test-local screenshots. Its independent decision remains open.
- The previous whole-workspace governance refresh failed (not rerun in this renderer-only batch): verify:tokens reports the frozen Foundation history plus existing color eligibility findings, including Tree weak text/icon and brand usage; verify:boundaries reports existing unrelated imports/protected paths and phase policy; verify:tailwind-b2 rejects the accumulated inventory against historical frozen limits; verify:evidence and asset-index --check stop at missing ui-command Registry and frozen history. Their logs were inspected. The generated asset index was not rewritten around the unrelated missing asset.
- Both Tree manifests remain scoped-passed local candidates; runtime visual acceptance, contrast, full engineering completion, publication and business migration remain distinct.

## Renderer/empty completion batch

The five renderer callbacks keep their first node argument and share a read-only state context with permission-aware actions. Captured actions re-evaluate current permission and visibility; controlled state continues to require host echo. ManageTree passes the context through its action composer and allows renderEmpty without exposing a second data owner. The retained editor entry now resolves the current node and rejects pending input, denied permissions, view mode and save locks. Empty composes existing UI without inheriting node-only action hiding or weak text styling.

The new sixth expandable example covers a locked parent with an eligible child, check/selection separation, custom state labels, search-no-results and empty-data recovery. Browser checks use F6/Tab/Enter/Escape, verify half checks, forced-color arrow/Space navigation and focus return to search. Six keyboard moves reach level 5 then restore level 3, checking every visible horizontal arm, clearance, unique relation axes, continuation and focus. Screenshots inspected: [custom state](custom-state.png), [custom empty](custom-empty.png), [deep repeated move](repeated-deep-move.png). New example state is not included in the earlier human visual approval.

Current fingerprints, fresh commands and manual-tool limits: [renderer-facts.json](renderer-facts.json). Domain and drag-target fact files retain their historical scope. No new dependency, global Token value, visual default, public release or business integration was introduced.

## Example clarity revision — 2026-09-27

Only example 06, page-local layout styles, its existing browser case and documentation changed. The example now explains the relationship between actions and visible results: initial unchecked/restricted status, membership tags and action labels, independent selected-row tags, and a parent-only check restriction. Buttons are always visible only inside `.tree-state-demo`; shared Tree remains hover/focus-revealed. Existing Tag/Button palettes are reused. The empty-state instructions and controls have a separate subsection.

`pnpm --filter @rain-next/playground build` passed (includes typecheck). `TREE_PREVIEW=1 pnpm exec playwright test --config tests/e2e/tree.config.ts -g 'custom actions'` passed after the final edit. The updated case checks initial visible labels/actions, check/uncheck through the custom button, selection remaining independent, parent restriction, forced-colors keyboard navigation, empty recovery/focus and 320px page containment. Wider suites were not rerun for this page-local change. Screenshots inspected: [wide](custom-state-v2-wide.png), [320px](custom-state-v2-narrow.png), [empty](custom-empty-v2.png). The live IAB also exposes the three numbered steps, initial labels and visible actions. Current example visual is pending user review; previous acceptance and other outstanding gates retain their scope.


## Continuous ancestor guides — 2026-09-28

The user's new reference replaces the previous last-sibling cutoff. Every ancestor axis now continues through its entire visible subtree, including single-child and last-child chains. Each axis ends at its last visible descendant's first-line anchor; independent roots remain disconnected. The existing 24px indentation, 12px arms, 4px control clearance and pale Border/Neutral/3 Token are unchanged. The shared visible-row projection and line endpoints cover Tree and ManageTree without a new option or data owner.

The new model/component regressions first failed on missing ancestor axes and premature termination, then passed. All 86 unit tests passed, along with UI typecheck and the Playground build (including typecheck). In the full production-browser run, 15 cases passed; the updated large-tree case initially queried an unmounted filtered last node. After scrolling the virtual viewport to that node, the affected case passed on rerun. Together the 16 cases cover existing Basic/Rich and drag geometry plus 15-level continuation, 10,000-node virtualization, subtree endings, filtering and collapse.

Screenshots inspected: [continuous guides at the top](continuous-ancestors-top.png) and [subtree endings after scrolling](continuous-ancestors-scrolled.png). At level 10, eight ancestor axes and the parent connector are present; at the level-15 leaf, the inner axes stop while the root axis continues to its following children. With only the deepest match filtered in, the root axis also stops there. The local 5369 service was no longer listening; it was restored from this worktree and the existing IAB tab refreshed. The live page now reports eight ancestor lines at level 10 and visibly shows the continuous guides. On 2026-09-28 the user confirmed “确定。已完成视觉验收”, accepting this revised continuous-ancestor-line visual. This System Mode update records that decision in status, implementation rules and this evidence only; no runtime change or test rerun was needed. Status syntax and the recorded scope were checked. Historical acceptance and unrelated outstanding gates retain their scope.
