# Task 7 deep-asset results

This ledger covers all 62 assets whose matrix `riskTier` is `deep`. It records only fresh work against the locked Rain Classic clone. Browser routes are relative to the local demo root.

## Runtime command keys

| Key | Actual command | Fresh result |
| --- | --- | --- |
| `FULL` | `pnpm verify` | PASS: 257 files / 1,596 tests; 187 build modules; package consumer PASS |
| `A` | Focused Input / Select / MenuItem / Tag / Badge / Button Vitest paths listed in `README.md` | PASS: 20 files / 163 tests |
| `B` | Focused Popup / Popover / Tooltip Vitest paths listed in `README.md` | PASS: 9 files / 48 tests |
| `C` | Focused DataTable / QueryTable / Pagination / Selection Vitest paths listed in `README.md` | PASS: 7 files / 76 tests |
| `D` | Focused Tree / ManageTree / Hierarchy / DragDrop Vitest paths listed in `README.md` | PASS: 16 files / 137 tests |
| `E` | Focused Layout / Pane / Scroll ownership Vitest paths listed in `README.md` | PASS: 13 files / 105 tests |

`FULL` was run once and includes the complete locked test suite, build and package-consumer check. A focused key means that the named asset or its owning behavior/consumer was also exercised by that exact focused command. None of the browser observations below are inferred from jsdom.

No screenshot was retained for any row. Therefore every screenshot path is `none retained` and every screenshot SHA-256 is `n/a`.

## Per-asset ledger

| Deep asset | Runtime command/result | Browser route or fixture and fresh observation | Browser result | Screenshot / SHA-256 | Difference or decision impact |
| --- | --- | --- | --- | --- | --- |
| `rain-classic/block/layout-list-detail-block` | `FULL` + `E` PASS | `?page=layout-list-detail-block`: selection, split scroll ownership, detail collapse/restore and focus return | passed | none retained / n/a | No conflict; rewrite direction unchanged |
| `rain-classic/configuration/table-column-schema` | `FULL` + `C` PASS | `/`, Query pages and list-detail Block: column rendering, selection, editing and reorder consumers | passed, indirect consumer evidence | none retained / n/a | No independent route; do not invent one |
| `rain-classic/domain/difficulty-tag` | `FULL` + `A` PASS | `/`: difficulty Domain-tag examples and state styling observed | passed | none retained / n/a | Supports dedicated base-library Domain group; generic Tag is not widened |
| `rain-classic/domain/group-type-tag` | `FULL` + `A` PASS | `/`: group-type Domain-tag examples observed | passed | none retained / n/a | Same Domain-group boundary |
| `rain-classic/domain/learning-unit-reminder-mark` | `FULL` + `A` PASS | `/`: learning-unit reminder mark observed | passed | none retained / n/a | Same Domain-group boundary |
| `rain-classic/domain/learning-unit-tag` | `FULL` + `A` PASS | `/`: learning-unit Domain tag observed | passed | none retained / n/a | Same Domain-group boundary |
| `rain-classic/domain/scored-task-type-mark` | `FULL` + `A` PASS | `/`: scored-task-type mark observed | passed | none retained / n/a | Same Domain-group boundary |
| `rain-classic/domain/status-tag` | `FULL` + `A` PASS | `/`: closed business status-tag profiles observed | passed | none retained / n/a | Same Domain-group boundary |
| `rain-classic/domain/system-status-tag` | `FULL` + `A` PASS | `/`: system-status examples observed | passed | none retained / n/a | Same Domain-group boundary |
| `rain-classic/foundation/layout-foundation` | `FULL` + `E` PASS | `?component=panegroup`, `?component=layout-recipes` and page consumers: geometry and scroll ownership observed | passed, indirect consumer evidence | none retained / n/a | No independent visual route; evidence remains consumer-bound |
| `rain-classic/foundation/semantic-icon-registry` | `FULL` + `A` + `C` + `D` PASS | `/` and Tree: icons observed through Button, Select, Pagination, status and Tree consumers | passed, indirect consumer evidence | none retained / n/a | Existing registry/API decision remains open |
| `rain-classic/internal/popup` | `FULL` + `B` PASS | `/`: basic Select, TagSelect, Popover and Tooltip opening, closing, Escape and observed focus return | blocked; basic consumer paths passed | none retained / n/a | Full Track A lacks edge/scroll positioning, outside dismissal, Tab order, mount mode, theme inheritance and AvatarGroup consumer coverage; not a component failure |
| `rain-classic/layout/workbench-shell` | `FULL` + `E` PASS | Grading standard/variation pages across normal, loading, empty, error, readonly and save-error | passed, consumer evidence | none retained / n/a | No runtime conflict; redesign direction unchanged |
| `rain-classic/pattern/collection-shell` | `FULL` PASS | `?page=query-management-standard`: query toolbar, results and retained-results error state | passed | none retained / n/a | No direction change |
| `rain-classic/pattern/filter-bar` | `FULL` PASS | `?page=query-management-variation`: split filter region and 11-row results observed | passed | none retained / n/a | Variation intentionally ignores demo `state`; no false state claim |
| `rain-classic/pattern/form-section` | `FULL` PASS | `?page=course-basic-info-variation`: four sections and 13 live controls | passed | none retained / n/a | No direction change |
| `rain-classic/pattern/layout-recipes` | `FULL` + `E` PASS | `?component=layout-recipes`: Supporting Navigation, List Detail and Three Pane Workbench | passed | none retained / n/a | No direction change |
| `rain-classic/pattern/manage-tree` | `FULL` + `D` PASS | `?component=manage-tree`: edit, commit, success, saving, save-error and conflict with draft retention | blocked; basic transaction paths passed | none retained / n/a | Full Track A lacks exit-edit, competing editor/menu, permission denial, validation failure, cancel and actual retry completion; not a component failure |
| `rain-classic/pattern/master-detail` | `FULL` + `E` PASS | Grading standard/variation: active item, adaptive inspector and retained save-error draft | passed, consumer evidence | none retained / n/a | No direction change |
| `rain-classic/pattern/query-table` | `FULL` + `C` PASS | Query standard states and root DataTable/Pagination consumers | passed | none retained / n/a | Existing composition/API decision remains open |
| `rain-classic/pattern/review-workbench` | `FULL` PASS | Grading standard/variation: normal plus five adverse/read-only states | passed, consumer evidence | none retained / n/a | No direction change |
| `rain-classic/template/course-basic-info-variation` | `FULL` PASS | `?page=course-basic-info-variation`: main landmark, navigation, four FormSections and actions | passed | none retained / n/a | No direction change |
| `rain-classic/template/grading-workbench-page` | `FULL` PASS | Grading standard/variation: all six fixture states; adaptive inspector opened explicitly | passed | none retained / n/a | No conflict; duplicate mode wrappers remain retire candidates |
| `rain-classic/template/query-management-standard` | `FULL` PASS | `?page=query-management-standard`: normal/loading/empty/initial-error/subsequent-error; prior 11 rows retained | passed | none retained / n/a | No direction change |
| `rain-classic/template/query-management-variation` | `FULL` PASS | `?page=query-management-variation`: FilterBar, 11-row table, selection and actions | passed | none retained / n/a | `state` query is not supported by this fixture and is not claimed |
| `rain-classic/template/tree-management-page` | `FULL` PASS | Standard page reaches save-error/conflict; variation save yields 15 required `taskType` errors (`unassigned`, `chapter-1`…`chapter-14`) before Adapter invocation | failed; downstream variation adapters blocked | none retained / n/a | Mark needs-decision; fixture/schema conflict, not evidence that either Adapter failed; no automatic migration change |
| `rain-classic/ui/activity-overlay` | `FULL` + `A` PASS | `/`: activity overlay states and accessible status text observed | passed | none retained / n/a | No direction change |
| `rain-classic/ui/avatar-group` | `FULL` PASS | `/`: six groups and their basic rendered states | blocked; basic rendered states passed | none retained / n/a | Full Track A lacks More/overflow hover/focus, click pinning, Escape and Tab-order coverage; not a component failure |
| `rain-classic/ui/badge` | `FULL` + `A` PASS | `/`: count and dot Badge states observed | passed | none retained / n/a | No direction change |
| `rain-classic/ui/badge-status` | `FULL` + `A` PASS | `/`: labelled status Badge states observed | passed | none retained / n/a | No direction change |
| `rain-classic/ui/button` | `FULL` + `A` PASS | `/`: interactive Button responded to pointer activation | blocked; basic pointer path passed | none retained / n/a | Trusted native keyboard activation and complete target visual conditions were not covered; needs-decision without changing rewrite-from-rain |
| `rain-classic/ui/checkable-tag` | `FULL` + `A` PASS | `/`: selected `作业`; checked state updated | passed | none retained / n/a | No direction change |
| `rain-classic/ui/checkable-tag-group` | `FULL` + `A` PASS | `/`: grouped checkable-tag selection truth observed | passed | none retained / n/a | No direction change |
| `rain-classic/ui/checkbox-group` | `FULL` PASS | `/`: visible label selected `课后作业`; all three fixture choices became checked | passed | none retained / n/a | No direction change |
| `rain-classic/ui/circular-checkbox` | `FULL` PASS | `/`: circular fixture changed from checked to unchecked | passed | none retained / n/a | No direction change |
| `rain-classic/ui/container` | `FULL` PASS | `?component=container`: five purposes and three padding modes | blocked; basic fixtures observed | none retained / n/a | 1200/1400/1600/1920 widths, semantic root and transparent ownership were not verified; needs-decision without changing rewrite-from-rain |
| `rain-classic/ui/data-table` | `FULL` + `C` PASS | `/`: first row selected, disabled row stayed disabled; table-owned scroll observed | passed | none retained / n/a | No direction change |
| `rain-classic/ui/editable-cell` | `FULL` + `C` PASS | `/`: scoped editor opened, value changed, Enter committed and display mode returned | passed | none retained / n/a | Broad-selector timeout was harness scoping, not component failure; existing API decision remains open |
| `rain-classic/ui/form-item` | `FULL` PASS | `?component=form-item`: connected labels/descriptions and `aria-invalid` error state | passed | none retained / n/a | No direction change |
| `rain-classic/ui/icon-button` | `FULL` PASS | `/`: explicitly focused and activated `发现 32-24`; focus stayed on button | passed | none retained / n/a | No direction change |
| `rain-classic/ui/input` | `FULL` + `A` PASS | `/`: focused `清除示例`, appended text and observed live value | passed | none retained / n/a | No direction change |
| `rain-classic/ui/input-number` | `FULL` PASS | `/`: value edited and `增加 1` changed 7.5 to 8.5 | passed | none retained / n/a | No direction change |
| `rain-classic/ui/link-tag` | `FULL` + `A` PASS | `/`: activated `描边链接`; documented hash target reached | passed | none retained / n/a | No direction change |
| `rain-classic/ui/menu-item` | `FULL` + `A` PASS | `/`: Select option consumer navigated and committed a new item | passed, indirect consumer evidence | none retained / n/a | No standalone route; evidence remains consumer-bound |
| `rain-classic/ui/pagination` | `FULL` + `C` PASS | `/`, Medium Pagination current 4→5: programmatic adapter path loses explicit focus while Next retains it; trusted pointer/key and node identity unavailable | blocked | none retained / n/a | Not a confirmed bug; keep needs-decision and defer interaction design |
| `rain-classic/ui/pane-group` | `FULL` + `E` PASS | `?component=panegroup`: separator keyboard bounds, reset, collapse/restore focus and separate scroll owners | blocked; keyboard/collapse/scroll paths passed | none retained / n/a | Pointer resize, narrow viewport and Main protection were not covered; needs-decision without changing rewrite-from-rain |
| `rain-classic/ui/popover` | `FULL` + `B` PASS | `/`: named dialog opened; Escape closed it and retained trigger focus | blocked; basic click/Escape path passed | none retained / n/a | Full applicable overlay matrix—outside, Tab, edge, scroll, mount and theme—was not covered; not a component failure |
| `rain-classic/ui/radio-group` | `FULL` PASS | `/`: visible `录播课` label changed checked value from live to recorded | passed | none retained / n/a | No direction change |
| `rain-classic/ui/row-reorder` | `FULL` + `C` PASS | `/`: Space/ArrowDown/Space changed A/B/C to B/A/C and retained handle focus | blocked; basic keyboard reorder passed | none retained / n/a | Pointer, Escape cancel, always/auto, mode/explicit and live-announcement evidence is missing; not a component failure |
| `rain-classic/ui/search-input` | `FULL` + `A` PASS | `/`: changed `搜索课程` and observed live value | passed | none retained / n/a | No direction change |
| `rain-classic/ui/segmented` | `FULL` PASS | `/`: selected `进行中`; radio truth became false/true/false | passed | none retained / n/a | No direction change |
| `rain-classic/ui/select` | `FULL` + `A` + `B` PASS | `/`: open, option navigation/commit, close and focus return to combobox | blocked; basic commit/focus-return path passed | none retained / n/a | Full applicable focus/keyboard, outside, Tab, edge, scroll, mount, theme and IME matrix was not covered; not a component failure |
| `rain-classic/ui/status-indicator` | `FULL` + `A` PASS | `/`: processing, blocked and custom status states observed | passed | none retained / n/a | No direction change |
| `rain-classic/ui/status-indicator-group` | `FULL` + `A` PASS | `/`: grouped status states and accessible names observed | passed | none retained / n/a | No direction change |
| `rain-classic/ui/tabs` | `FULL` PASS | `/`: selected `学生`; tab truth and student panel observed | passed | none retained / n/a | Existing API decision remains open |
| `rain-classic/ui/tag` | `FULL` + `A` PASS | `/`: generic Tag surfaces observed separately from Domain-tag examples | passed | none retained / n/a | Generic Tag remains business-semantic neutral |
| `rain-classic/ui/tag-select` | `FULL` + `A` + `B` PASS | `/`: chose `直播`, closed popup and returned focus to trigger | blocked; basic commit/focus-return path passed | none retained / n/a | Full applicable focus/keyboard, outside, Tab, edge, scroll, mount and theme matrix was not covered; not a component failure |
| `rain-classic/ui/text-area` | `FULL` PASS | `/`: replaced Small 80 text and observed live value | passed | none retained / n/a | No direction change |
| `rain-classic/ui/text-button` | `FULL` PASS | `/`: interactive example responded to pointer activation | blocked; basic pointer path passed | none retained / n/a | Trusted native keyboard activation and complete target visual conditions were not covered; not a component failure |
| `rain-classic/ui/tooltip` | `FULL` + `B` PASS | `/`: tooltip appeared; Escape closed it and trigger stayed focused | blocked; basic exposure/Escape path passed | none retained / n/a | Complete applicable hover/focus/click, outside, Tab, edge, scroll, mount and theme matrix was not covered; not a component failure |
| `rain-classic/ui/tree` | `FULL` + `D` PASS | `?component=tree`: roving focus, Enter selection, checks and virtualization pass; two native drag attempts did not initiate `dragstart` | blocked | none retained / n/a | Pointer drag browser evidence insufficient; keep needs-decision, do not call it broken |
| `rain-classic/ui/tree-node` | `FULL` + `D` PASS | `?component=tree`: TreeNode focus/selection/check/action anatomy observed; native drag path remains blocked at Tree consumer | blocked, indirect consumer evidence | none retained / n/a | Same drag evidence boundary; public-vs-internal decision remains open |

## Result totals

- Runtime review: 62 passed, 0 failed, 0 blocked.
- Browser review: 46 passed, 15 blocked, 1 failed.
- Blocked: Pagination ordinary-page focus; Tree and TreeNode native pointer drag; full Track A evidence for internal Popup, ManageTree, AvatarGroup, Button, TextButton, Container, PaneGroup, Popover, Select, TagSelect, Tooltip and RowReorder. Each of those 12 has a recorded basic success path, but the named untested conditions prevent a full browser pass.
- Failed: TreeManagementPage variation save-error/conflict path, due to the page fixture/schema validation conflict described in `browser-findings.md`.
- A blocked or failed browser row does not by itself change `rewrite-from-rain`, `retain-vue-only` or `retire` direction.
