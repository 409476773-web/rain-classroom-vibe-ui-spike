# Task 7 browser findings

All routes below were loaded from the locked temporary clone in real Chromium. Screenshots were inspected ephemerally and not saved. A recorded basic success path is not treated as a full Track A browser pass when required conditions were not covered.

## Core controls, tags and status assets — `/`

- Input: focused `清除示例`, appended text, and observed the value update. The Classic demo retained its locked no-blue-halo presentation.
- SearchInput: changed `搜索课程` to a fresh value and observed the live input value.
- InputNumber: changed `数量`, then used the visible `增加 1` control; the value changed from `7.5` to `8.5`.
- TextArea: replaced `Small 80 文本域` content and observed the live value.
- IconButton: explicitly focused and activated `发现 32-24`; focus stayed on its button.
- TextButton/Button: the interactive example responded to pointer activation. Native-button keyboard activation was not used as evidence because this browser adapter did not synthesize the default click for otherwise working native buttons. Basic pointer path passed; full Track A evidence is `blocked`, not failed.
- Segmented: selected `进行中`; the radio truth became `[false, true, false]`.
- RadioGroup: selected `录播课` through its visible label; the checked value moved from `live` to `recorded`.
- CheckboxGroup: selected `课后作业` through its visible label; all three fixture choices became checked.
- CircularCheckbox: the circular fixture changed from checked to unchecked.
- Tabs: selected the `学生` tab; `aria-selected` became `true` and the student panel was present.
- Select: opened `单选课程模块`, moved to another option, committed it, closed the listbox and returned focus to the combobox. This basic path passed; full Track A evidence is `blocked` because focus/keyboard opening, outside dismissal, Tab order, edge/scroll positioning, mount mode, theme inheritance and IME were not covered.
- MenuItem: covered through the same Select option consumer; there is no separate standalone route.
- CheckableTag: selected `作业`; the checked truth updated.
- TagSelect: opened the popup, chose `直播`, closed it and returned focus to the trigger. This basic path passed; full Track A evidence is `blocked` because the applicable focus/keyboard opening, outside dismissal, Tab order, edge/scroll positioning, mount mode and theme inheritance were not covered.
- LinkTag: activated `描边链接`; the documented hash target was reached.
- Tag and seven Domain tags: actual Tag surfaces and the closed domain texts/profiles were observed, including difficulty, group type, learning-unit/reminder, scored-task, status and system-status examples. This supports a dedicated base-library Domain group, not generic Tag expansion.
- AvatarGroup: six groups and their basic rendered states were present. Full Track A evidence is `blocked` because More/overflow hover or focus, click pinning, Escape dismissal and Tab order were not exercised.
- Badge, BadgeStatus, StatusIndicator, StatusIndicatorGroup and ActivityOverlay: count, dot, label, processing, blocked, custom, grouped and activity-overlay states were present with their runtime classes and accessible status names.
- DataTable: selected the first row; its checkbox became checked and the disabled row remained disabled.
- EditableCell: opened `编辑课程名称`, changed the value, committed with Enter and observed display mode with the new value. An earlier broad selector timed out; scoping to the first editable cell showed the component path itself worked.
- RowReorder: picked up `课程 A` with Space, moved it with ArrowDown and dropped it with Space. Order changed from A/B/C to B/A/C and focus stayed on the moved handle. This basic keyboard path passed; full Track A evidence is `blocked` because pointer reorder, Escape cancellation, always/auto handles, mode/explicit fixtures and the live announcement were not covered.
- Tooltip: focus/click exposure added the described tooltip; Escape closed it while the trigger remained focused. This basic path passed; full Track A evidence is `blocked` because the complete applicable hover/focus/click, outside, Tab, edge/scroll, mount and theme conditions were not covered.
- Popover: `固定并操作` opened one named dialog; Escape closed it and the trigger retained focus. This basic path passed; full Track A evidence is `blocked` because the applicable hover/focus opening, outside dismissal, Tab order, edge/scroll, mount and theme conditions were not covered.
- Internal Popup and shared focus/overlay behavior have no independent route. Basic paths were observed through Select, TagSelect, Popover and Tooltip, but full Track A evidence is `blocked` because edge/scroll behavior, outside dismissal, Tab order, mount mode, theme inheritance and the AvatarGroup consumer path were not covered.

## Pagination evidence boundary — `/`

Fixture: `Medium 分页`, default current page 4.

Observed programmatic path:

1. With `activeElement` initially `BODY`, activate page 5; current state changes to page 5 and focus remains on `BODY`.
2. Reload and repeat three times: same result, 3/3.
3. Explicitly place focus on the page-5 button without activating it. Before activation, `activeElement` is `BUTTON`, `data-page=5`.
4. Trigger the same adapter click. At 0 ms, the next task and 80 ms, `activeElement` is `BODY`; a unique page-5 button remains and now has `aria-current=page`.
5. Run the same explicit-focus path on `下一页`. Focus remains on the next button at all three observation points.
6. Compare Popup consumers: Popover Escape closes dialog 1→0 and retains trigger focus; Select option commit closes the listbox and returns focus to the combobox.

Source/test boundary:

- `Pagination.vue` contains no explicit blur.
- Page item keys remain `page-N`; current 4→5 includes `page-5` on both sides, so source inspection alone cannot prove replacement.
- Existing ordinary page-change tests assert state/emits but do not attach to the document and assert `activeElement` after the consumer accepts the update.
- Existing focus-return assertions cover the private page-size popover, not ordinary page changes.
- The browser interface provides read-only DOM snapshots rather than ElementHandles, so the old target's `isConnected` and identity equality with the new query could not be measured.
- The interface also did not synthesize trusted native pointer/keyboard activation for this path.

Conclusion: `browserReview: blocked`, not a confirmed Pagination bug and not a pass. Rain Next interaction behavior remains a later decision.

## Tree and ManageTree

### `?component=tree`

- Ten named trees and their hierarchy/selection variants rendered.
- Roving focus: ArrowDown moved focus from the level-1 node to the level-2 node.
- Enter selection: the focused level-2 node became `aria-selected=true`; the previous node became false.
- Virtualization: the large-tree fixture changed from 9 rendered treeitems to 241 when virtualization was disabled.
- Cascade and independent checkboxes, async branches, search, rich content and disabled nodes were directly present.
- The native HTML5 drag fixture and its accepted/rejected rules rendered. Two real pointer drag attempts through the browser CUA did not initiate `dragstart`; no accepted or rejected result was emitted. Focused runtime tests cover the model, but the browser drag path remains `blocked` rather than passed.

### `?component=manage-tree`

- Entered management mode and observed edit/move/add/more actions.
- Opened the name editor, committed a fresh name and observed the save action become enabled.
- Successful save retained the committed value and returned the transaction to a clean state.
- Saving mode disabled the action and exposed live saving feedback.
- `保存失败` retained the changed draft and exposed a retry path.
- `版本冲突` retained the draft and exposed the conflict state without silently merging.
- These basic transaction paths passed. Full Track A evidence is `blocked` because exit-edit, competing editor/action-menu behavior, permission denial, validation failure, cancel and actual retry completion were not covered; this is not a ManageTree failure.

## Table, query and page states

### Query pages

- `?page=query-management-standard`: observed normal (11 rows), loading, empty, initial-error, and subsequent-error.
- Subsequent-error required a second `查询` action; the old 11 rows remained and the page exposed `更新失败，已保留上次结果`.
- `?page=query-management-variation`: the variation page rendered its FilterBar, 11-row table, selection and action regions. It intentionally does not accept the `state` prop in `demo/App.vue`; repeated state query strings do not change it and are not claimed as variation state coverage.
- CollectionShell was observed on the standard page; FilterBar on the variation page.
- Table-column-schema and selection behavior have no independent route; they were covered through DataTable, QueryTable, EditableCell and RowReorder consumers.

### Course pages

- Standard and variation pages rendered one main landmark, navigation, forms and their expected action regions.
- The variation used four FormSection consumers and 13 live form controls.

### Grading workbench pages

- Standard and variation routes both exercised normal, loading, empty, error, readonly and save-error fixtures.
- At the 1280-wide browser viewport the inspector is adaptively collapsed. The explicit `在主区域查看评分与反馈` control opened it.
- After entering a score, `仅保存` in the save-error fixture kept the same active item, retained the draft, marked it `未保存`, and exposed the save error in both modes.
- WorkbenchShell, MasterDetail and ReviewWorkbench were observed through these routes.

## Pane, layout and scroll ownership

### `?component=panegroup`

- Two accessible vertical separators exposed min/current/max values.
- Inspector separator result: initial 320; ArrowRight 312; Shift+ArrowRight 288; Home 280; End 414; double-click restored 320.
- Collapsing Inspector removed its separator and moved focus to `恢复 Inspector`; restoring it returned the separator at 320 and focus to `收起 Inspector`.
- Pane-owned navigation scroll: client height 360 / scroll height 532.
- DataTable-owned scroll: client 977×220 / content 1040×668.
- These are separate owners; no second same-axis wrapper was inferred.
- The keyboard/collapse/scroll paths passed. Full Track A evidence is `blocked` because pointer resize, narrow-viewport behavior and Main-pane protection were not covered; this is not a PaneGroup failure.

### `?component=layout-recipes`

- Supporting Navigation: 2 panes, navigation plus main.
- List Detail: 2 panes, one separator, main plus complementary detail.
- Three Pane Workbench: 3 panes and the expected navigation/main/workbench controls.
- Layout foundation and layout-recipe contracts have no independent visual route beyond these consumers.

### `?component=container` and `?component=form-item`

- Container rendered all five purposes and compact/default/comfortable padding fixtures. These basic fixtures were observed, but full Track A evidence is `blocked` because 1200/1400/1600/1920 viewport checks, semantic-root output and transparent ownership were not verified.
- FormItem rendered connected labels, descriptions and invalid state; error examples used `aria-invalid=true` and their message IDs.

### `?page=layout-list-detail-block`

- DataTable and inspector had separate vertical scroll owners.
- Row selection worked.
- `收起详情` removed the active separator and returned focus to the external `显示详情` trigger; restoring detail recreated the separator and preserved trigger focus.
- The Block is browser-passed. Its demo wrapper remains a retire candidate.

## Tree management page difference

Routes: `?page=tree-management-standard` and `?page=tree-management-variation`, with `normal`, `save-error` and `conflict`.

- Standard page: editing a name reached the save adapter. Save-error retained the draft and provided retry; conflict retained the draft and did not merge.
- Variation page: normal browsing and editing rendered, but a valid non-empty name edit could not reach either save-error or conflict adapters. Whole-tree validation stopped first with `校验未通过，请修正后重试`.
- Exact scope: in the variation / learning-task fixture, any draft change followed by whole-tree save produced 15 `taskType` required errors (`unassigned` plus `chapter-1` through `chapter-14`). The save Adapter was not invoked.
- Source boundary: the variation schema marks `taskType` required, while those chapter nodes do not have `taskType`; the full-tree validator applies every schema field to every node. Existing focused tests pass but do not exercise this exact page adapter/data combination through a full save.

Conclusion: the shared TreeManagementPage browser review is `failed` / `needs-decision` for the variation fixture/schema path. Its downstream save-error and conflict Adapter paths are browser-blocked by that validation mismatch; the Adapters themselves are not shown to have failed. This task records the conflict and does not change code or migration direction.

## Six retire candidates: unique visual-value check

| Candidate | Browser/source observation | Unique visual-value judgment | Direction impact |
| --- | --- | --- | --- |
| GradingWorkbenchStandard | 31-line wrapper selects `mode=question`; all layout and styling come from GradingWorkbenchPage | The student-list rail is valuable evidence, but the shared page already owns it | Keep `retire` |
| GradingWorkbenchVariation | 31-line wrapper selects `mode=student`; same shared page | The question-list rail is valuable evidence, but the shared page already owns it | Keep `retire` |
| LayoutListDetailBlockDemo | Mock table, header and detail data over the audited deep LayoutListDetailBlock | No independent primitive or pattern beyond the retained Block; copy/data remain evidence | Keep `retire` |
| TreeManagementRulePanel | Rule list plus `唯一所有者` information group appears in the shared tree-management page | This information grouping has reusable visual reference value, but it is already preserved inside the shared page/adapter evidence and does not justify a standalone Template | Keep `retire`; carry the section as visual evidence |
| TreeManagementStandard | 29-line wrapper selects the knowledge scenario | No wrapper-owned visual; the shared TreeManagementPage owns it | Keep `retire` |
| TreeManagementVariation | 29-line wrapper selects the learning-task scenario | No wrapper-owned visual; the shared page owns it. The save-validation conflict is functional evidence, not a reason to retain the wrapper | Keep `retire`; mark shared page needs-decision |

No standalone visual asset was found that conflicts with the six retire labels. The rule-panel grouping should be referenced during later redesign, but not retained as a duplicate Template.

## No independent browser route

The following are explicitly indirect browser evidence rather than invented routes:

- internal Popup and shared focus/overlay behavior → basic Select, TagSelect, Popover and Tooltip paths only; the full consumer/positioning/mount/theme matrix remains blocked;
- table-column-schema and selection behavior → DataTable, QueryTable, EditableCell, RowReorder;
- layout-foundation → PaneGroup, Layout Recipes and page consumers;
- semantic-icon-registry → IconButton, Select, Pagination, Tree and status consumers;
- hierarchy and drag/drop behavior → Tree/ManageTree consumers; native pointer drag remains blocked.
