# Rain Classic Task 7 runtime evidence

## Scope and locked source

- Audit window closed at `2026-09-02T00:59:17Z` / `2026-09-02T08:59:17+0800` (`Asia/Shanghai`).
- Locked commit: `f1276fe2fcbeb76caeeee4b852f1480402a3d83b`.
- Locked tree: `a86e6738edb558b48ac92f798155abe5ba985529`.
- The original Rain Classic checkout was treated as read-only. All install, build, test and demo work ran in a local no-hardlink temporary clone.
- Local paths are intentionally abstracted as `<rain-classic-original>`, `<temporary-directory>` and `<temporary-clone>`.
- No screenshot was retained. The reviewer inspected ephemeral browser frames only, so there is no screenshot path or SHA-256 to claim.
- This task did not implement Rain Next assets, choose a Headless library, publish to Figma or a package registry, migrate a business page, or create a Git commit.

## CP2 decisions applied before runtime work

1. The current Classic-to-Next relationship map is accepted.
2. The seven business tag assets belong in the base library as a dedicated Domain tag group. They remain `identity: domain`; generic Tag is not widened into arbitrary business-looking variants.
3. The six duplicate templates keep the `retire` direction, subject to the visual-value check documented in `browser-findings.md`.
4. Dialog, Surface/Card and Statistic may be redesigned for Rain Next.
5. Task 7 runtime review is authorized. Interaction design and the Headless library choice remain undecided.

## Isolation and source-lock checks

The following commands were run before installing dependencies:

```text
git -C <rain-classic-original> status --short --branch
git -C <rain-classic-original> rev-parse HEAD
git -C <rain-classic-original> rev-parse HEAD^{tree}
git -C <rain-classic-original> diff --quiet
git -C <rain-classic-original> diff --cached --quiet
mktemp -d
git clone --local --no-hardlinks <rain-classic-original> <temporary-directory>/rain-classic
git -C <temporary-clone> rev-parse HEAD
git -C <temporary-clone> rev-parse HEAD^{tree}
```

Observed result:

- Original branch line: `## main...origin/main`.
- The pre-existing untracked plan file remained present and out of scope.
- Original tracked and staged diffs were empty.
- Temporary clone HEAD and tree exactly matched the lock above.

## Dependency installation

Command, run from `<temporary-clone>`:

```text
pnpm install --frozen-lockfile --offline --ignore-scripts
```

Result: PASS, exit 0; 162 packages reused and 0 downloaded. The lockfile was not bypassed and lifecycle scripts were not run.

## Full verification

Command:

```text
pnpm verify
```

Result: PASS, exit 0.

| Check | Fresh result |
| --- | --- |
| Icon asset check | 81 SVG assets |
| Typography policy | 1 test file, 6 tests passed |
| Interaction-halo policy | 5 locked legacy families / 5 occurrences, 0 new occurrences |
| Documentation generation | 67 registered assets, 51 public components, 5 recipes, 2 icons |
| Release governance | PASS; source package remains private |
| Build | 187 modules transformed |
| Full Vitest run | 257 test files, 1,596 tests passed |
| Public / ESM / CJS export counts | 144 / 144 / 144 |
| Contract surface | 50 exports |
| Other package surfaces | stable 0, experimental 0, layout 1, source-registry items 1 |
| Packed artifact | 84 tarball entries |
| Consumer check | Vue 2.7.16 consumer build passed |
| Failures | none |

The full test run uses jsdom. It is runtime evidence, but it is not presented as browser evidence.

## Focused high-risk commands

All paths were confirmed as tracked files in the locked clone before execution. Every command used the locked Vitest configuration.

### A — Input, Select, MenuItem, Tag, Badge and Button

```text
pnpm exec vitest run --config vitest.config.js \
  src/components/Input/__tests__/Input.spec.js \
  src/components/Input/__tests__/SearchInput.spec.js \
  src/components/Input/__tests__/input.contract.spec.js \
  src/components/Select/__tests__/Select.spec.js \
  src/components/Select/__tests__/select.utils.spec.js \
  src/components/MenuItem/__tests__/MenuItem.spec.js \
  src/components/Tag/__tests__/Tag.spec.js \
  src/components/Tag/__tests__/CheckableTag.spec.js \
  src/components/Tag/__tests__/CheckableTagGroup.spec.js \
  src/components/Tag/__tests__/TagSelect.spec.js \
  src/components/Tag/__tests__/LinkTag.spec.js \
  src/components/Tag/__tests__/BusinessTags.spec.js \
  src/components/Tag/__tests__/SystemStatusTag.spec.js \
  src/components/Badge/__tests__/Badge.spec.js \
  src/components/Badge/__tests__/BadgeStatus.spec.js \
  src/components/Badge/__tests__/StatusIndicator.spec.js \
  src/components/Badge/__tests__/StatusIndicatorGroup.spec.js \
  src/components/Badge/__tests__/ActivityOverlay.spec.js \
  src/components/Button/__tests__/Button.spec.js \
  src/components/Button/__tests__/button.focus-halo.spec.js
```

Result: PASS, 20 files / 163 tests.

### B — Popup, Popover, Tooltip and focus return

```text
pnpm exec vitest run --config vitest.config.js \
  src/components/Popup/__tests__/PopupLayer.spec.js \
  src/components/Popup/__tests__/PopupTrigger.spec.js \
  src/components/Popup/__tests__/popup-interactions.spec.js \
  src/components/Popup/__tests__/use-popup-controller.spec.js \
  src/components/Popup/__tests__/popup-position.spec.js \
  src/components/Popover/__tests__/Popover.spec.js \
  src/components/Popover/__tests__/popover.accessibility.spec.js \
  src/components/Tooltip/__tests__/Tooltip.spec.js \
  src/components/Tooltip/__tests__/tooltip.accessibility.spec.js
```

Result: PASS, 9 files / 48 tests.

### C — Table, Pagination and selection

```text
pnpm exec vitest run --config vitest.config.js \
  src/components/Table/__tests__/DataTable.spec.js \
  src/components/Table/__tests__/QueryTable.spec.js \
  src/components/Table/__tests__/RowReorder.spec.js \
  src/components/Table/__tests__/EditableCell.spec.js \
  src/components/Table/__tests__/datatable.utils.spec.js \
  src/components/Pagination/__tests__/Pagination.spec.js \
  src/behaviors/pagination/__tests__/usePaginationState.spec.js
```

Result: PASS, 7 files / 76 tests.

### D — Tree, ManageTree, hierarchy and drag/drop

```text
pnpm exec vitest run --config vitest.config.js \
  src/components/Tree/__tests__/Tree.spec.js \
  src/components/Tree/__tests__/tree.accessibility.spec.js \
  src/components/Tree/__tests__/tree.selection.spec.js \
  src/components/Tree/__tests__/tree.dnd.spec.js \
  src/components/Tree/__tests__/tree.virtual.spec.js \
  src/components/Tree/__tests__/ManageTree.spec.js \
  src/components/Tree/__tests__/manage-tree.accessibility.spec.js \
  src/components/Tree/__tests__/manage-tree.node-actions.spec.js \
  src/components/Tree/__tests__/manage-tree.editors.spec.js \
  src/components/Tree/__tests__/manage-tree.structure.spec.js \
  src/components/Tree/__tests__/manage-tree.save.spec.js \
  src/components/Tree/__tests__/manage-tree.draft.spec.js \
  src/components/Tree/__tests__/manage-tree.validation.spec.js \
  src/components/Tree/__tests__/shared-behavior-consumption.spec.js \
  src/behaviors/hierarchy/__tests__/hierarchyModel.spec.js \
  src/behaviors/drag-drop/__tests__/dragDropModel.spec.js
```

Result: PASS, 16 files / 137 tests.

### E — Layout, Pane and scroll ownership

```text
pnpm exec vitest run --config vitest.config.js \
  src/components/PaneGroup/__tests__/PaneGroup.spec.js \
  src/components/PaneGroup/__tests__/pane-group.collapse.spec.js \
  src/components/PaneGroup/__tests__/pane-group.resize.spec.js \
  src/components/PaneGroup/__tests__/pane-group.scroll-contract.spec.js \
  src/components/PaneGroup/__tests__/pane-group.demo.spec.js \
  src/layout/__tests__/layout-recipe-host.spec.js \
  src/layout/__tests__/layout-recipe-resolver.spec.js \
  src/layout/__tests__/layout-recipes.contract.spec.js \
  src/layout/__tests__/layout-recipes.demo.spec.js \
  src/__tests__/layout-list-detail-block.spec.js \
  src/__tests__/master-detail.spec.js \
  src/__tests__/semantic-layout.spec.js \
  src/__tests__/workbench-shell.spec.js
```

Result: PASS, 13 files / 105 tests.

## Demo server

The plan command was run first:

```text
pnpm run dev -- --host 127.0.0.1 --port 4175
```

Observed result: Vite started on its default port because the extra separator was forwarded in a form that did not apply the requested host/port arguments. That process was stopped. The equivalent direct Vite command was then run from the same locked clone:

```text
pnpm exec vite demo --config vite.config.js --host 127.0.0.1 --port 4175
```

Observed result: the demo became reachable on the requested loopback port and was used for the fresh browser checks.

## Browser evidence index

- Per-deep-asset command, route/fixture and result: `asset-results.md`.
- Interaction observations, blocked paths, fresh differences and retire-candidate visual review: `browser-findings.md`.
- Browser engine: real Chromium controlled through the local in-app browser.
- The browser review did not use jsdom assertions as a substitute.

## Interpretation rules used

- `passed`: the asset was actually exercised or directly observed in Chromium, or a non-route contract was observed through named real consumers.
- `blocked`: a basic browser path may have passed, but one or more required Track A conditions were not observed, or the available interface could not provide the needed trusted-input or node-identity evidence. This does not mean the component is confirmed broken.
- `failed`: Chromium reached the path and exposed a source/fixture incompatibility that prevented the intended state from being reached.
- A runtime or browser failure does not change an asset to `retain-vue-only` or `retire` automatically.
- Existing Headless and interaction decisions remain open even where Classic runtime/browser evidence passed.

## Task 7 result summary

- All 62 deep assets have fresh runtime evidence and `runtimeReview: passed`.
- Browser review is 46 passed, 15 blocked and 1 failed.
- Pagination is browser-blocked for ordinary-page focus because the available interface could not provide trusted pointer/native-key activation or old/new DOM-node identity. The programmatic pre-focus path ended on `BODY`, while the Next button retained focus. This is not recorded as a confirmed component bug.
- Tree and TreeNode are browser-blocked only for native pointer drag. Keyboard focus, selection, checks and virtualization were exercised; two pointer-drag attempts did not initiate `dragstart` through the available interface.
- Internal Popup, Popover, Select, TagSelect and Tooltip have basic open/commit-or-close/focus-return paths that passed, but full Track A evidence remains blocked: the applicable hover/focus/click combinations, outside dismissal, Tab order, viewport-edge and scroll-container behavior, mount mode and theme inheritance were not covered. The Popup review also lacks its AvatarGroup consumer path; Select additionally lacks IME coverage.
- ManageTree's basic edit/save/saving/save-error/conflict paths passed, but exit-edit, competing editor/menu, permission denial, validation failure, cancel and actual retry completion were not covered. AvatarGroup's rendered states were observed, but More/overflow hover/focus, click pinning, Escape and Tab order were not exercised. Both remain browser-blocked rather than failed.
- Button and TextButton basic pointer activation passed, but trusted native keyboard activation and the complete target visual conditions were not covered. Container's five purposes and three padding modes were observed, but its four required viewport widths, semantic root and transparent ownership were not verified. PaneGroup keyboard resizing, collapse/focus restoration and scroll ownership passed, but pointer resize, narrow viewport and Main protection were not covered. These four assets are `needs-decision`; their `rewrite-from-rain` direction is unchanged.
- RowReorder's basic keyboard reorder and focus retention passed, but pointer reorder, Escape cancel, always/auto handles, mode/explicit fixtures and live-announcement evidence were not covered. It remains browser-blocked rather than failed.
- Task 7 did not verify Rain Next target focus-ring dimensions, clipping, adjacent contrast, forced-colors behavior or the complete focused-versus-state distinctions. Those checks belong to Rain Next implementation or a later Human Gate; none is claimed as Task 7 browser evidence.
- TreeManagementPage is browser-failed / needs-decision only for the variation / learning-task fixture-schema path. Any draft change followed by whole-tree save produced 15 required `taskType` errors (`unassigned` and `chapter-1` through `chapter-14`) before the Adapter was invoked. The downstream save-error and conflict Adapters are blocked by that mismatch, not shown to have failed.
- The six duplicate Template candidates remain `retire`. The rule-panel information grouping has visual-reference value, but it is already preserved in the shared TreeManagementPage evidence and does not justify a standalone duplicate Template.

## Evidence verification

Commands run from the Rain Next audit workspace after updating the matrix and runtime evidence:

```text
pnpm verify:reuse-audit
RAIN_CLASSIC_AUDIT_ROOT=<rain-classic-original> pnpm verify:reuse-audit
```

Both passed with the same inventory: 75 scoped assets, 53 public assets, 30 higher-level assets, 1 direct internal asset, 1 excluded asset and 12 targets. The first run used snapshot mode; the second used live mode against the unchanged locked source.

## Original source preservation

The following read-only checks were repeated after the demo server was stopped and the browser tab was closed:

```text
git -C <rain-classic-original> status --short --branch
git -C <rain-classic-original> rev-parse HEAD
git -C <rain-classic-original> rev-parse HEAD^{tree}
git -C <rain-classic-original> diff --quiet
git -C <rain-classic-original> diff --cached --quiet
```

The result exactly matched the pre-run state:

```text
## main...origin/main
?? docs/plans/2026-08-31-layout-1-1-composition-primitives-implementation.md
```

- HEAD remained `f1276fe2fcbeb76caeeee4b852f1480402a3d83b`.
- Tree remained `a86e6738edb558b48ac92f798155abe5ba985529`.
- Tracked and staged diffs remained empty.
- The pre-existing untracked plan file is user-owned and was not changed or removed.
