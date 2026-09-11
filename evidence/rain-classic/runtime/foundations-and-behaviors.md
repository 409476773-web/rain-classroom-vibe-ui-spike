# Rain Classic foundations and shared-behavior static audit

## Audit boundary

This checkpoint records static inheritance decisions for the locked Rain Classic source described by `evidence/rain-classic/source-lock.yaml`. It covers the nine matrix assets listed below and their shared foundations. It is not a runtime review, browser review, implementation authorization, human Gate, publication decision, or business-migration decision.

The source was read only. No Rain Classic test suite was run for this checkpoint. Historical verification named by `docs/roadmap/REFACTOR_ROADMAP.yaml` is provenance, not a test result from this audit.

Reviewed source groups:

- `src/styles/tokens.scss`, `config/interaction-halo-policy.json`, `src/__tests__/interaction-halo-policy.spec.js`, and `src/__tests__/typography-font-policy.spec.js`
- `src/icons/semantic-icon.contract.js`, the two registered SVG assets, `src/__tests__/semantic-icon-registry.spec.js`, `docs/icons.md`, `docs/ai/icon-selection.md`, and `src/registry/component-registry.generated.js`
- `src/layout/**`, `src/components/Container/**`, and `src/components/PaneGroup/**`, excluding execution-plan documents
- `src/components/Popup/**`, including its contract, controller, positioning, trigger, visual contract, and consumer-baseline tests
- `src/behaviors/pagination/**` and `src/components/Pagination/**`
- `src/behaviors/hierarchy/**`, `src/behaviors/drag-drop/**`, and `src/components/Tree/**`
- `src/components/Table/RowReorder.vue`, `src/components/Table/table-row-reorder.contract.js`, its styles, and its focused tests
- Current Roadmap records `DS-ICON-001`, `S2-001`, `S2-002`, `S4-001`, `S4-002`, `DS-LAYOUT-001`, and `DS-LAYOUT-002`

Rain Next was checked against `packages/foundations/src/tokens.css`, `token-contract.ts`, `focus.css`, `typography.css`, `density.tsx`, `motion.css`, their focused tests, and current package exports.

## Cross-generation foundation rules

### Retain

- Keep brand blue exactly `#1561F8`, the cool blue-gray visual lineage, white task surfaces, restrained elevation, and explicit semantic color roles.
- Keep PingFang SC as the UI and Chinese reading font. Preserve the Classic distinction between interaction state and semantic state: focus, selected, active, checked, expanded, and disabled must not collapse into one blue treatment.
- Keep semantic icon names and provenance. Icons are selected by meaning, use the exact governed asset, inherit host size/color/state, and must not be replaced by Unicode glyphs, native disclosure markers, or approximate third-party shapes.
- Keep layout ownership narrow: Container centers content without becoming a surface; PaneGroup owns external multi-pane geometry; Tree and ManageTree own their own semantic viewport and interactions; popup content owns its internal scrolling; DataTable owns table scrolling.
- Keep deterministic pagination calculations and observable outcomes: normalization, clamping, controlled proposals, unknown-total handling, and first-visible-item preservation. The Vue pagination composable itself is not inherited.
- Keep HierarchyModel and DragDropModel framework-independent and fail closed for invalid hierarchy or move input.
- Keep accessibility outcomes: named landmarks, native buttons where applicable, roving tree focus, keyboard reorder/resizing, Escape dismissal/cancellation, focus restoration, and live announcements.

### Redesign for Rain Next

- Re-express the retained rules as React contracts, typed state, Tailwind/CSS-variable recipes, and Rain Next tracking attributes such as `data-rain-id` and `data-slot`. Vue component instances, watchers, provide/inject, slots, and emitted update events are not an implementation base.
- Map component density explicitly to the Rain Next `compact` and `default` contexts. Classic `small/default/large`, component-local heights, and the Next density context are not equivalent vocabularies.
- Keep LINE Seed only for an explicitly scoped data value role. Chinese units, labels, prose, and ordinary tabular text remain PingFang SC; value/unit/label segmentation requires focused guards.
- Use Rain Next motion durations and reduced-motion behavior only after verifying the observable state transition. Classic component-local timing is evidence, not a value to copy.
- Rebuild overlays around the eventual Headless ADR outcome while preserving observable popup behavior and consumer ownership. This audit does not choose Radix or Base UI.
- Rebuild drag and resize input handling for React and the chosen interaction utilities while preserving the keyboard model, validation reasons, rollback, and ownership boundaries.

### Intentionally do not inherit

- Do not inherit the Vue 2 public API shape or private runtime helpers as React APIs.
- Do not port the monolithic SCSS token tree, component-specific alias proliferation, deep selectors, raw pixel recipes, or historical style overrides into Rain Next Foundations.
- Do not inherit Classic's blanket `RC-INTERACTION-HALO-001` no-blue-halo rule. Rain Next's general keyboard-focus recipe is an explicit, locked user decision: a 2px brand-blue `focus-visible` ring with a 1px offset. Each asset still requires clipping, 3:1 adjacent-color contrast, forced-colors, and focused-versus-selected/checked verification; only an observed failure may open a component-level exception decision.
- Do not treat Classic Figma, package, or business lifecycle evidence as Rain Next publication authorization.
- Do not generalize table row reorder and hierarchical tree reparenting into one drag model. They have different scopes, validation, and ownership.
- Do not move Tree visual interaction, ManageTree draft/transaction/permission logic, or business deletion/migration/concurrency rules into the shared HierarchyModel or DragDropModel.
- Do not inherit partial-success saves for ManageTree; its transaction remains atomic all-success or all-failure.

## Confirmed conflicts and asset decisions

All nine assets have `audit.staticReview: reviewed` (9/9). That field records completion of this static evidence pass; it is separate from `audit.status`, which is `reviewed` for Container and `needs-decision` for the other eight assets (1 reviewed + 8 needs-decision).

`evidence/rain-classic/reuse-matrix.yaml` under each asset's `decision.blockers` is the sole machine-readable blocker source. The final column below is a deliberately non-exhaustive human summary and must not be parsed as a duplicate blocker ledger.

| Matrix asset | `audit.staticReview` | `audit.status` | Retained boundary | Rain Next reset | Open-decision summary |
| --- | --- | --- | --- | --- | --- |
| `rain-classic/foundation/semantic-icon-registry` | `reviewed` | `needs-decision` | Stable semantic names, exact geometry/provenance, host-owned state, unpublished lifecycle | Foundation owns the typed semantic/provenance data contract; a separate UI renderer or icon slot consumes it | Foundation ownership is selected. The remaining source conflict is chevron fixed fill versus host coloring without geometry change. |
| `rain-classic/internal/popup` | `reviewed` | `needs-decision` | Controlled/uncontrolled open state, click/hover/focus triggers, Escape/outside dismissal, focus return, Tab order, placement/flip/shift/size, consumer-owned semantics | React composition and the selected Headless primitive | Headless ownership, aliases, missing Registry consumer edges, local/portal behavior, and focus management remain open. |
| `rain-classic/ui/container` | `reviewed` | `reviewed` | Transparent centered content width, explicit purpose/padding, landmark constraints, no surface or scroll ownership | React polymorphic API and explicit density mapping | No asset blocker; Container is not Surface/Card/Stack/Inline/Grid. |
| `rain-classic/ui/pane-group` | `reviewed` | `needs-decision` | Two/three-pane geometry, protected Main pane, collapse/resize constraints, keyboard separator, focus return, single-scroll-owner matrix | React `pane-group`; `split-sidebar` remains a separate target gap | Task 6 audits their composition relationship without merging identities; internal identities and the three-value background conflict remain open. |
| `rain-classic/ui/pagination` | `reviewed` | `needs-decision` | Pure calculations and observable state outcomes, unknown total, first-visible-item preservation, accessible page navigation | React state API, density mapping, and size-changer overlay composition | Size-changer ownership depends on the final shared popup/headless decision. |
| `rain-classic/ui/row-reorder` | `reviewed` | `needs-decision` | Temporary versus committed order, pointer/keyboard parity, cancel/rollback, scoped reorder, live announcements | React drag input and table pattern | Internal behavior ownership and proposal acknowledgement/persistence failure semantics remain open. |
| `rain-classic/ui/tree` | `reviewed` | `needs-decision` | Independent focus/selection/check/expand state, keyboard model, async/search invariants, Tree-owned visuals; `density` compact/default and `richDensity` compact/default/spacious | React compound UI, typed behavior ports, adapters, and explicit mapping into Next compact/default | Adapter ownership, behavior ports, and richDensity mapping remain open; spacious is not an automatic third Next density. |
| `rain-classic/ui/tree-node` | `reviewed` | `needs-decision` | Semantic/visual row shell under Tree state, independent node states, accessibility relationships | React `tree-item` compound subcomponent | Public documented compound export versus internal implementation remains open. |
| `rain-classic/pattern/manage-tree` | `reviewed` | `needs-decision` | View/Edit modes, one active editor/overlay, local draft, atomic all-success/all-failure save, permission/validation/recovery, adapter boundaries | React pattern over Tree and the final popup primitive | Popup/headless ownership and revision, abort, retry, and acknowledgement semantics remain open; partial success is unsupported. |

The source contracts `src/components/Avatar/avatar.contract.js` and `src/components/Tree/manage-tree.contract.js` name `AvatarGroup` and `ManageTree` as `_InternalPopup` consumers. Their generated Registry entries omit those dependencies, while Select still points at unresolved `_Popup/MenuSurface`; this is Registry drift and a blocking gap in the canonical consumer graph. This checkpoint records the alias and ownership blocker but does not rewrite Registry identities.

The Classic layout foundation already records `colorBgLayout` as an unresolved Figma/runtime difference (`#F7F8FA` versus `#F5F7FA`); Rain Next currently introduces `#F3F7FC`. No value is treated as inherited by this checkpoint. Classic globally forbids active LINE Seed use, while Rain Next adds a narrow data role; that is an intentional redesign with value/unit/label safeguards, not permission to apply the font to Chinese units or general UI text.

## Shared-behavior ownership lock

- Pagination behavior may retain pure normalization and proposal calculations for `current`, `pageSize`, and `total`. The Vue composable is not inherited, and the target behavior must not own DOM, requests, sorting, filtering, selection, query synchronization, or the public component API.
- HierarchyModel may index keys, parents, depth, paths, ancestors, children, and capability flags, and must fail closed with stable reasons. It owns no rendering, focus, permission, or persistence.
- DragDropModel may validate and immutably apply structural `before`/`inside`/`after` moves. It owns no pointer implementation, keyboard focus, drop indicator, permissions, transactions, or business concurrency.
- Tree owns tree semantics, visual relationships/connectors, viewport, roving focus, selection/check/expand interaction, and its drag affordance.
- ManageTree owns editing draft, transaction, permission, validation, save/cancel, and recovery. Business adapters retain deletion, migration, node-type, API, and concurrency decisions.
- RowReorder remains a table-scoped behavior with temporary/committed ordering and rollback. It is not an alias for hierarchical DragDropModel.

## Task 7 verification backlog — not run here

Every item below remains `not-run` in this checkpoint. Task 7 must keep the two evidence tracks separate.

### A. Locked Rain Classic clone runtime and browser review

Task 7 must run this track in a disposable temporary clone checked out at the locked Rain Classic commit and tree. It must not run tests or browser tooling in the original Rain Classic working tree. Only successful, recorded evidence from Track A may upgrade a covered matrix asset's Classic `audit.runtimeReview` or `audit.browserReview`.

Focused Rain Classic test files discovered in the locked source:

1. Foundations and semantic icons:

   - `src/__tests__/interaction-halo-policy.spec.js`
   - `src/__tests__/typography-font-policy.spec.js`
   - `src/__tests__/semantic-icon-registry.spec.js`
   - `src/__tests__/component-registry.spec.js`
   - `src/layout/__tests__/layout-foundation.contract.spec.js`
   - `src/layout/__tests__/layout-foundation.tokens.spec.js`

2. Popup:

   - `src/components/Popup/__tests__/PopupLayer.spec.js`
   - `src/components/Popup/__tests__/PopupTrigger.spec.js`
   - `src/components/Popup/__tests__/popup-interactions.spec.js`
   - `src/components/Popup/__tests__/popup-position.spec.js`
   - `src/components/Popup/__tests__/popup.consumer-baseline.spec.js`
   - `src/components/Popup/__tests__/popup.contract.spec.js`
   - `src/components/Popup/__tests__/popup.tokens.spec.js`
   - `src/components/Popup/__tests__/popup.visual-contract.spec.js`
   - `src/components/Popup/__tests__/use-popup-controller.spec.js`

3. Container:

   - `src/components/Container/__tests__/Container.spec.js`
   - `src/components/Container/__tests__/container.contract.spec.js`
   - `src/components/Container/__tests__/container.docs.spec.js`
   - `src/components/Container/__tests__/container.styles.spec.js`

4. PaneGroup:

   - `src/components/PaneGroup/__tests__/PaneGroup.spec.js`
   - `src/components/PaneGroup/__tests__/pane-group.collapse-contract.spec.js`
   - `src/components/PaneGroup/__tests__/pane-group.collapse.spec.js`
   - `src/components/PaneGroup/__tests__/pane-group.contract.spec.js`
   - `src/components/PaneGroup/__tests__/pane-group.resize-contract.spec.js`
   - `src/components/PaneGroup/__tests__/pane-group.resize.spec.js`
   - `src/components/PaneGroup/__tests__/pane-group.scroll-contract.spec.js`
   - `src/components/PaneGroup/__tests__/pane-group.styles.spec.js`

5. Pagination:

   - `src/behaviors/pagination/__tests__/usePaginationState.spec.js`
   - `src/components/Pagination/__tests__/Pagination.spec.js`
   - `src/components/Pagination/__tests__/pagination.contract.spec.js`
   - `src/components/Pagination/__tests__/pagination.docs.spec.js`
   - `src/components/Pagination/__tests__/pagination.tokens.spec.js`
   - `src/components/Pagination/__tests__/pagination.utils.spec.js`

6. Hierarchy:

   - `src/behaviors/hierarchy/__tests__/hierarchyModel.spec.js`

7. DragDrop:

   - `src/behaviors/drag-drop/__tests__/dragDropModel.spec.js`

8. Tree and TreeNode:

   - `src/components/Tree/__tests__/Tree.spec.js`
   - `src/components/Tree/__tests__/shared-behavior-consumption.spec.js`
   - `src/components/Tree/__tests__/tree.accessibility.spec.js`
   - `src/components/Tree/__tests__/tree.contract.spec.js`
   - `src/components/Tree/__tests__/tree.dnd.spec.js`
   - `src/components/Tree/__tests__/tree.selection.spec.js`
   - `src/components/Tree/__tests__/tree.utils.spec.js`
   - `src/components/Tree/__tests__/tree.virtual.spec.js`
   - `src/components/Tree/__tests__/tree.visual-contract.spec.js`

9. ManageTree:

   - `src/components/Tree/__tests__/ManageTree.spec.js`
   - `src/components/Tree/__tests__/manage-tree.accessibility.spec.js`
   - `src/components/Tree/__tests__/manage-tree.contract.spec.js`
   - `src/components/Tree/__tests__/manage-tree.docs.spec.js`
   - `src/components/Tree/__tests__/manage-tree.draft.spec.js`
   - `src/components/Tree/__tests__/manage-tree.editors.spec.js`
   - `src/components/Tree/__tests__/manage-tree.node-actions.spec.js`
   - `src/components/Tree/__tests__/manage-tree.save.spec.js`
   - `src/components/Tree/__tests__/manage-tree.structure.spec.js`
   - `src/components/Tree/__tests__/manage-tree.validation.spec.js`
   - `src/components/Tree/__tests__/manage-tree.visual-contract.spec.js`

10. RowReorder:

    - `src/components/Table/__tests__/RowReorder.spec.js`
    - `src/components/Table/__tests__/RowReorderDemo.spec.js`
    - `src/components/Table/__tests__/row-reorder.contract.spec.js`

Exact Classic browser routes and fixtures, as dispatched by `demo/App.vue`:

| Scope | Route | Exact fixture |
| --- | --- | --- |
| Container | `/?component=container` | `src/components/Container/demos/ContainerDemo.vue` |
| PaneGroup | `/?component=panegroup` | `src/components/PaneGroup/demos/PaneGroupDemo.vue` |
| Tree and TreeNode | `/?component=tree` | `src/components/Tree/demos/TreeDemo.vue` |
| ManageTree | `/?component=manage-tree` | `src/components/Tree/demos/ManageTreeDemo.vue` |
| Pagination | `/` | `src/components/Pagination/demos/PaginationDemo.vue` |
| RowReorder | `/` | `src/components/Table/demos/RowReorderDemo.vue` |
| Popup consumer — Select | `/` | `src/components/Select/demos/SelectDemo.vue` |
| Popup consumer — TagSelect | `/` | `src/components/Tag/demos/TagDemo.vue` |
| Popup consumer — AvatarGroup | `/` | `src/components/Avatar/demos/AvatarDemo.vue` |
| Popup consumer — Tooltip | `/` | `src/components/Tooltip/demos/TooltipDemo.vue` |
| Popup consumer — Popover | `/` | `src/components/Popover/demos/PopoverDemo.vue` |

Classic real-browser scenarios for Track A:

- On `/?component=container`, verify explicit purpose, semantic root, width/padding behavior, transparent ownership, and landmark output at 1200, 1400, 1600, and 1920 widths.
- On `/?component=panegroup`, resize and collapse two- and three-pane configurations by pointer and keyboard; verify Main protection, persistent reveal trigger, focus return, narrow viewport behavior, and no same-axis duplicate scroll owner.
- On `/`, exercise Select, TagSelect, AvatarGroup, Tooltip, and Popover click/hover/focus paths near viewport edges and inside scroll containers; verify local/portal behavior exposed by the fixtures, dismissal, Escape focus return, Tab order, and theme inheritance.
- On `/`, exercise Pagination first/middle/short ranges, disabled and narrow states, quick jump, IME input, and the size changer by keyboard and pointer.
- On `/`, exercise RowReorder pointer and Space/Arrow/Escape paths for the available always/auto and mode/explicit fixtures; verify temporary versus committed order and live announcements. Persistence failure and rollback are `blocked-fixture-missing`: `src/components/Table/demos/RowReorderDemo.vue` exposes only local `v-model` lists and no failing persistence adapter, so that outcome remains contract/unit-test evidence rather than a browser claim.
- On `/?component=tree`, navigate, search, expand, asynchronously load, select/check, virtualize, and structurally drag Tree; verify one roving focus owner, independent focused/selected/checked state, richDensity variants, and focus fallback after filtering or collapse.
- On `/?component=manage-tree`, enter and leave editing, open competing editors/actions, deny permissions, fail validation/save where the fixture exposes those states, cancel, retry, and recover; verify the draft remains local until an atomic all-success/all-failure save.
- Across the Classic fixtures, record the actual no-blue-halo baseline, keyboard reachability, forced-colors behavior, exact semantic icons, reduced-motion behavior, clipping, and focus restoration without treating Classic styling as the Rain Next target rule.

### B. Cross-generation Rain Next comparison

Track B compares retained Classic outcomes with current or future Rain Next foundations and components. It cannot upgrade any Classic `audit.runtimeReview` or `audit.browserReview` field; it produces separate migration evidence only.

- Treat the locked Rain Next general focus recipe — 2px brand-blue ring, 1px offset — as the selected baseline, not an open Classic-versus-Next choice. For every migrated interactive asset, verify clipping, at least 3:1 contrast against adjacent colors, forced-colors behavior, keyboard reachability, and focused-versus-selected/checked separation. Only an observed component failure may open an exception decision.
- Compare Classic layout background evidence `#F7F8FA` and `#F5F7FA` with Rain Next `#F3F7FC` beside real white task surfaces; this cross-generation comparison does not change Classic browser status.
- Compare Classic's PingFang policy with the Rain Next LINE Seed data role using `98.6%`, `98.6 分`, and Chinese labels. LINE Seed remains limited to approved value glyphs and adjacent western punctuation; Chinese units, labels, prose, and ordinary table numerals remain PingFang SC.
- Map Classic component size axes and Tree `richDensity` compact/default/spacious explicitly into Rain Next compact/default. Spacious is not an automatic third Rain Next density.
- Verify that the Foundation-owned semantic icon data contract feeds a separate UI renderer or icon slot, and resolve chevron fixed fill versus host coloring without changing governed geometry.
- Compare Rain Next overlay and region motion, including `prefers-reduced-motion: reduce`, with the retained observable Classic transitions without using the result as Classic runtime evidence.

## Lifecycle after this checkpoint

| Stage | State |
| --- | --- |
| Static review for the nine assets | `reviewed` (9/9) |
| Audit status for the nine assets | `reviewed` (1/9); `needs-decision` (8/9) |
| Runtime review | `not-run` |
| Browser review | `not-run` |
| Implementation | `not-started` |
| Human Gate | `not-evaluated` |
| Figma material write | `not-authorized` |
| Figma component publication | `not-authorized` |
| Package Registry publication | `not-authorized` |
| Business migration | `not-authorized` |
| Local Git commit | `not-created` |
| Remote Git | `not-configured` |

Tasks 5 and 6 may still perform full identity-level review of these assets. They must preserve or explicitly supersede the shared-behavior boundaries and blockers recorded here; this checkpoint does not pre-accept a Headless library, public API, publication, or migration.
