# Tailwind B2 Local Fork Pilot Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Do not start until the user explicitly authorizes the new B2 checkpoint.

**Goal:** Build and objectively evaluate a Tailwind-first, Rain-Token-governed Button/Input pilot in which AI edits default to the current feature through Existing Variant → Local Recipe → Local Fork, while global Masters remain protected.

**Architecture:** Rain semantic, component, and composition tokens remain the only visual source of truth. Tailwind v4 receives an inline theme bridge with default visual namespaces disabled; CVA and tailwind-merge organize static variants and controlled local recipes. A machine-readable contract, provenance-aware Local Fork tool, baseline comparison, automated safety gates, and a separate Human Gate decide whether B2 may expand.

**Tech Stack:** React 19, TypeScript 7, Vite 8, Tailwind CSS 4.3, Vitest, Testing Library, Playwright, `class-variance-authority@0.7.1`, `tailwind-merge@3.6.0`, YAML subset governance.

---

## Execution status and hard stop

This file is a plan, not implementation authorization. On 2026-09-03 the user explicitly authorized `tailwind-b2-composition-contract`; the same turn additionally requested that the newly integrated icon library be considered. The first execution batch (Task 1 plus a pre-migration source snapshot) is complete: final `pnpm verify` passed 514 Unit/Interaction and 36 Chromium tests, and reuse-audit passed. See the entry review for exact scope. Tasks 2–13 are not complete and dependency installation has not yet occurred.

### Entry review amendments (2026-09-03)

- Preserve the existing icon ADR 0001, `manifests/icons.json`, `registry/icons.json`, all generated icon entries, and independent icon/source-repair acceptance. B2 uses ADR 0002 and must not require those directories to be empty.
- Preserve the latest Button geometry, `tertiary` and `text` variants, text-specific tone/size, Link consumer, and PNG Loading mask. Input's current clear text remains unchanged.
- Preserve Day 3 `currentPhase` and `independentLifecycle` in `phaseHistory.foundationSpikeDay3`; keep refinements, individual Human Gates, CP3 and pending Git actions in place. Historical parent authorization must be validated before it is reused by icon/text checks.
- Retain `verify:icons` and evidence lifecycle locking in the new phase. In-progress checks permit only the exact task additions; absent future outputs are not treated as completed work.
- Benchmark metrics support `not-measured` with reasons. Freeze a common starting fixture and acceptance criteria before measured trials; P3 consumes the saved local P1/P2 result rather than pretending it starts from an unchanged empty state.
- The dependency limit concerns direct packages. Audit and lock expected transitive dependencies (including CVA's `clsx`) without adding a separate direct helper. Recheck metadata at Task 3; no metadata approval is implied by this amendment.

Before Task 1, verify all of the following:

- The user explicitly authorizes entering the new `tailwind-b2-composition-contract` checkpoint.
- The authorization explicitly permits the two locked dependencies and only the Input/Button/search-operation-area pilot.
- Figma, package/Registry publication, business migration, local Git commit, remote Git, Select, Dialog, Headless and Layout remain unauthorized.
- The current Day 3 implementation and verification evidence remain historical facts; its Human Gate remains independent.

If any item is missing, stop after read-only inspection. Do not infer authorization from this plan or from the design confirmation.

Because the repository has no initial commit and Git actions are currently blocked, every task below ends with a **Git checkpoint: blocked** line. Do not run `git add`, `git commit`, create a branch or create a worktree. Record candidate commit messages only in `status/current-phase.yaml` if the newly authorized phase contract explicitly requires it.

## Task 1: Establish the fail-closed B2 phase contract

**Files:**

- Create after phase authorization: `docs/adr/0002-tailwind-b2-local-fork.md`
- Preserve: `docs/adr/0001-icon-assets-and-semantic-consumption.md` and existing icon manifests/Registry
- Modify: `AGENTS.md`
- Modify: `SPIKE_BRIEF.md`
- Modify: `status/current-phase.yaml`
- Modify: `scripts/verification-helpers.mjs`
- Modify: `scripts/verification-helpers.test.ts`
- Modify: `scripts/verify-boundaries.mjs`
- Modify: `scripts/verify-workspace.mjs`
- Modify: `scripts/verify-evidence.mjs`
- Modify: `tests/node-runtime.d.ts` only for Node APIs used by real filesystem boundary tests
- Modify: `apps/playground/src/routes/overview-page.tsx` and its shell Unit/E2E tests (phase copy only, no component redesign)
- Create: `docs/audits/2026-09-03-tailwind-b2-entry-review.md`
- Reference: `docs/plans/2026-09-03-tailwind-b2-local-fork-design.md`

### Step 1: Write the failing phase and lifecycle tests

Add tests that require:

```ts
expect(status.currentPhase).toMatchObject({
  id: "tailwind-b2-composition-contract",
  status: "authorized",
  workMode: "system-mode-tailwind-b2",
  authorizationScope: "input-button-search-operation-pilot",
  progress: "tailwind-b2-pilot-in-progress",
});

expect(status.independentLifecycle).toMatchObject({
  implementation: "in-progress",
  automatedVerification: "not-run",
  humanGate: "not-evaluated",
  figmaEditableMaterial: "not-authorized",
  packageOrRegistryPublication: "not-authorized",
  businessMigration: "not-authorized",
  localGitCommit: "not-created",
  remoteGit: "not-configured",
});
```

Also assert that Day 1–Day 3 checkpoints, Day 3 historical phase/lifecycle, accepted reuse-audit CP3, Button Gate, icon library/source-repair Gates and pending text-button Gate remain present and unchanged.

### Step 2: Run the tests and verify RED

Run:

```bash
pnpm test -- scripts/verification-helpers.test.ts
```

Expected: FAIL because the current phase is still `foundation-spike-day-3` and no B2 lifecycle helper exists.

### Step 3: Record the ADR and governance rules

The ADR must include:

- the final B2 definition;
- rejected pure-B and composition-only alternatives;
- current-page/feature default scope;
- Existing Variant → Local Recipe → Local Fork routing;
- local candidate Token policy;
- Tailwind-first, not Tailwind-only;
- reason-based CSS exceptions;
- source tracking, update notification and manual merge;
- quiet promotion suggestions;
- exact pilot and Go / No-Go criteria.

Update `AGENTS.md` so that:

- `managed` Master sources cannot be changed for a page task;
- named Local Recipes and Local Forks are valid `local-experiment` assets;
- AI routes silently and asks only for ambiguous or high-risk intent;
- promotion always requires a separate Human/System Gate;
- Tailwind default visual namespaces, arbitrary visual values and direct reference tokens are forbidden in protected B2 paths.

Add an independent checkpoint between Day 3 and Day 4 in `SPIKE_BRIEF.md`; do not renumber or silently rewrite the 10-day Spike.

### Step 4: Implement the phase helper and boundary policy

Add `getExpectedTailwindB2Lifecycle(progress, verification)` to `scripts/verification-helpers.mjs`. It must reject impossible combinations, including `completed` with `not-run` or `failed` verification.

Add an exact B2 branch in `scripts/verify-boundaries.mjs`. Its allowed actions must be limited to:

- installing the two locked dependencies;
- defining the Tailwind/Rain composition contract;
- migrating Button and Input only;
- creating the search-operation-area Local Recipe / Fork pilot;
- creating B2 manifests, tests, browser evidence and decision report;
- running existing verification.

Its blocked actions must continue to include:

- Select, Dialog, Headless, Table, Statistic and Layout;
- Tag, Badge, Surface and Card migration;
- default Tailwind visual palette consumption;
- Figma writes, package/Registry publication and business migration;
- local commit, remote Git, push, PR and merge.

The completed-phase file set must be exact and fail closed. Preserve the exact existing icon Registry/Manifest/ADR set and its inventory-derived file/entry validation; no B2 Registry additions are allowed. Only the specific B2 `manifests/**` and `docs/adr/0002-...` files in this plan become allowed. Task 1 does not install dependencies or require later task outputs; it initially opens only the phase-entry artifacts and rejects pilot-completed or pilot-verification-passed claims. Extend the exact file/dependency contract test-first at each later task, then establish the final completed file set before Task 13. Keep all 14 Visual Evidence and four original Benchmark lifecycle locks active. Update Overview's current phase copy so Day 3 completion is explicitly historical, without changing component styles or anatomy.

### Step 5: Set the current phase only after authorization

Update `status/current-phase.yaml` to the exact authorized scope and `in-progress / not-run` lifecycle. Do not mark implementation or checks complete.

### Step 6: Verify GREEN

Run:

```bash
pnpm test -- scripts/verification-helpers.test.ts
pnpm verify:boundaries
pnpm verify:workspace
```

Expected: all commands exit 0 and preserve Day 3 historical evidence and every unauthorized lifecycle axis.

**Git checkpoint: blocked. Candidate commit:** `docs: authorize tailwind b2 pilot contract`

## Task 2: Capture the current architecture baseline before migration

**Files:**

- Create: `benchmarks/tailwind-b2-ai-editability.yaml`
- Create: `evidence/runtime/tailwind-b2/baseline-results.yaml`
- Create: `evidence/runtime/tailwind-b2/README.md`
- Modify: `scripts/verify-tailwind-b2.test.ts` only after creating it in Step 1 below
- Create: `scripts/verify-tailwind-b2.test.ts`
- Create: `scripts/verify-tailwind-b2.mjs`
- Modify: `package.json`

### Step 1: Write the failing benchmark-schema test

Create a test that requires exactly three prompt IDs and the agreed metrics:

```ts
expect(benchmark.prompts.map(({ id }) => id)).toEqual([
  "B2-P1-LOCAL-INPUT",
  "B2-P2-LOCAL-BUTTON",
  "B2-P3-REUSE-AND-PARTS",
]);

for (const result of baseline.results) {
  expect(["pass", "fail", "not-measured"]).toContain(result.firstPass);
  // Each numerical/boolean metric accepts a measured value or "not-measured".
  // Every missing measure must have an explicit reason; never coerce it to 0.
}
```

The benchmark file must contain the exact prompts recorded in the design document. It must also state that elapsed time is secondary evidence.

### Step 2: Run the test and verify RED

Run:

```bash
pnpm test -- scripts/verify-tailwind-b2.test.ts
```

Expected: FAIL because neither benchmark nor baseline results exist.

### Step 3: Create an isolated temporary baseline copy

Run `mktemp -d /private/tmp/rain-next-b2-baseline.XXXXXX` and record the returned absolute path. Copy the current workspace into that exact directory with `rsync`, excluding `.git`, `node_modules`, `dist`, `playwright-report` and `test-results`. Do not modify or delete the original workspace.

Install only the already locked dependencies in the temporary copy using the existing offline lockfile. Do not add CVA or tailwind-merge to the baseline copy.

### Step 4: Execute the three prompts in the temporary copy

First freeze a common search fixture with the same formal SearchIcon, content, control versions, non-target controls, viewport and observable acceptance criteria for both arms. Resolve the meaning of “lighter” against the actual starting surface before counting success (a white Input cannot become a lighter RGB white). Record fixture preparation separately from the edit trials.

For each prompt:

1. P1 and P2 start independently from the frozen fixture. P3 starts from the recorded local P1/P2 result in the same architecture, with the preceding changes excluded from P3's measured diff. Use exactly the same prerequisite protocol for B2.
2. Apply the request with the current native-CSS architecture.
3. Record every changed file, correction prompt, raw value, shared Master edit and test result.
4. Capture a browser screenshot.
5. Do not import conclusions from memory; use the actual diff and current output.

Keep the temporary baseline copy until the final report is accepted. Do not delete it as part of an unrelated cleanup.

### Step 5: Write truthful baseline evidence

Populate `baseline-results.yaml` with measured values and screenshot paths. If a metric was not observed, use `not-measured`; never write `0` as a guess.

Add the root script:

```json
"verify:tailwind-b2": "node scripts/verify-tailwind-b2.mjs"
```

Do not yet add it to `verify:governance`; that occurs after the validator can inspect implementation files.

### Step 6: Verify GREEN

Run:

```bash
pnpm test -- scripts/verify-tailwind-b2.test.ts
pnpm verify:tailwind-b2
```

Expected: the schema and baseline evidence pass, while the report explicitly says B2 results are still `not-run`.

**Git checkpoint: blocked. Candidate commit:** `test: record tailwind b2 baseline`

## Task 3: Authorize and install only the two class-composition dependencies

**Files:**

- Modify: `packages/ui/package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `scripts/verify-boundaries.mjs`
- Modify: `scripts/verify-tailwind-b2.test.ts`

### Step 1: Write the failing dependency-contract test

Require the exact dependency set:

```ts
expect(uiPackage.dependencies).toMatchObject({
  "class-variance-authority": "0.7.1",
  "tailwind-merge": "3.6.0",
});
```

Assert that no additional direct `clsx`, `shadcn`, Radix, Base UI or other package was added. Expected audited transitive dependencies are recorded in the lockfile, not counted as extra chosen tools.

### Step 2: Verify RED

Run:

```bash
pnpm test -- scripts/verify-tailwind-b2.test.ts
```

Expected: FAIL because the two dependencies are absent.

### Step 3: Recheck registry metadata before install

Read the version, license, dependencies, dist integrity and deprecation fields for both exact versions. If either exact version is unavailable, deprecated, changes license, has unexpected install scripts or no longer supports Tailwind 4.3, stop and request a plan revision.

### Step 4: Install exact versions

Run:

```bash
pnpm --filter @rain-next/ui add --save-exact class-variance-authority@0.7.1 tailwind-merge@3.6.0
```

Do not install any shadcn CLI, icon library, Headless package or general utility bundle.

### Step 5: Verify GREEN and lockfile integrity

Run:

```bash
pnpm test -- scripts/verify-tailwind-b2.test.ts
pnpm verify:lockfile
pnpm verify:boundaries
```

Expected: exact versions and lockfile importers pass; no unrelated dependency changes exist.

**Git checkpoint: blocked. Candidate commit:** `build: add b2 class composition helpers`

## Task 4: Build the Rain Token → Tailwind v4 theme bridge

**Files:**

- Create: `packages/foundations/src/composition-contract.ts`
- Create: `packages/foundations/src/composition-contract.test.ts`
- Create: `packages/foundations/src/tailwind-theme.css`
- Modify: `packages/foundations/src/tokens.css`
- Modify: `packages/foundations/src/typography.css`
- Modify: `packages/foundations/src/index.ts`
- Modify: `packages/foundations/package.json`
- Modify: `apps/playground/src/styles.css`
- Modify: `scripts/verify-tailwind-b2.mjs`
- Modify: `scripts/verify-tailwind-b2.test.ts`

### Step 1: Write failing token-bridge tests

Define the initial composition scale exactly:

```ts
export const compositionSpaceTokens = {
  0: "0px",
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  14: "14px",
  16: "16px",
  18: "18px",
  20: "20px",
  24: "24px",
  32: "32px",
} as const;
```

Tests must require:

- every public semantic color maps to one `--color-rain-*` theme variable;
- every locked Rain radius and shadow maps to a namespaced theme variable;
- UI, Reading and Data fonts map to Rain variables;
- density control height, inline padding and item gap remain dynamic CSS variables;
- private `--rain-ref-*` values never appear in the bridge;
- default `--color-*`, `--font-*`, `--text-*`, `--radius-*`, `--shadow-*`, `--spacing-*` and `--breakpoint-*` namespaces are reset before Rain mappings;
- no Tailwind default breakpoint is reintroduced.
- existing Icon renderer and original graphics remain unchanged; Button icon dimensions (including 22px XL) map to component tokens, not a widened public scale.

### Step 2: Verify RED

Run:

```bash
pnpm test -- packages/foundations/src/composition-contract.test.ts scripts/verify-tailwind-b2.test.ts
```

Expected: FAIL because the contract and bridge do not exist.

### Step 3: Implement the minimal public Token additions

Add CSS variables for the exact composition scale. Add only the Button/Input component tokens necessary to preserve the latest accepted implementation baseline. For Button this now includes the 28 / 32 / 36 / 40 / 48 geometry, 4px regular and 6px XL gaps, per-size typography/icon slots, three hierarchy levels, Button-only Focus recipe and canonical loading mask. Do not widen the public scale to absorb component-specific values.

Keep `referenceColorTokens` private. Do not change the 42 semantic color roles, locked brand blue, radius set or shadow set.

### Step 4: Implement `tailwind-theme.css`

The file must:

1. Reset Tailwind default visual namespaces.
2. Map Rain semantic, composition, component, density, font, radius, shadow, Focus and Motion variables through `@theme inline`.
3. Use a visible Rain namespace, producing utilities such as `bg-rain-surface-panel`, `text-rain-text-primary`, `gap-rain-8`, `rounded-rain-6` and `h-rain-control`.
4. Contain no raw reference colors or duplicate visual values.

Export it from `packages/foundations/package.json` as `./tailwind-theme.css`.

### Step 5: Make source detection explicit

Update `apps/playground/src/styles.css` so Tailwind source detection is fail-closed:

```css
@import "tailwindcss" source(none);
@import "@rain-next/foundations/tailwind-theme.css";
@source "./";
@source "../../../packages/ui/src";
```

Keep imports before ordinary style rules. Do not scan the whole repository, evidence, docs, temporary baseline or Registry placeholders.

### Step 6: Verify GREEN and built CSS

Run:

```bash
pnpm test -- packages/foundations/src/composition-contract.test.ts scripts/verify-tailwind-b2.test.ts
pnpm --filter @rain-next/playground build
```

Inspect the built CSS and require:

- Rain namespaced utilities exist;
- default Tailwind colors such as `blue-500`, `gray-100` and default radius/shadow utilities do not exist;
- Button/Input source classes are detected from `packages/ui/src`;
- CSS output does not include the temporary baseline copy.

**Git checkpoint: blocked. Candidate commit:** `feat: bridge rain tokens into tailwind`

## Task 5: Add the machine-readable B2 contract and validator

**Files:**

- Create: `manifests/contracts/tailwind-b2.yaml`
- Create: `manifests/ui/button.yaml`
- Create: `manifests/ui/input.yaml`
- Preserve: `manifests/icons.json` (do not delete or regenerate icon assets)
- Modify: `scripts/verify-tailwind-b2.mjs`
- Modify: `scripts/verify-tailwind-b2.test.ts`
- Modify: `package.json`
- Modify: `scripts/verify-boundaries.mjs`

### Step 1: Write failing contract-validation fixtures

Add tests that reject each of the following in protected files:

```text
bg-blue-500
text-gray-700
rounded-lg
shadow-md
bg-[#ffffff]
p-[13px]
bg-rain-surface-panel!
var(--rain-ref-blue-500)
`bg-${tone}-500`
```

Also add passing fixtures for structural utilities and Rain namespaced utilities.

### Step 2: Verify RED

Run:

```bash
pnpm test -- scripts/verify-tailwind-b2.test.ts
```

Expected: FAIL because manifests and protected-path validation are incomplete.

### Step 3: Define the contract Manifest

`tailwind-b2.yaml` must include:

- protected paths;
- allowed structural utility families;
- allowed Rain namespaces;
- forbidden default visual namespaces and arbitrary syntax;
- Local Recipe and Local Fork required metadata;
- local candidate Token naming and scope;
- CSS exception schema;
- quiet-promotion thresholds and reminder states;
- exact pilot scope.

Button and Input manifests must include the existing anatomy, Parts, Variants, States, Density, tokens, source paths, accessibility requirements, modification mode and allowed/restricted modifications required by `AGENTS.md`.

### Step 4: Implement the validator

`verify-tailwind-b2.mjs` must:

- validate all three manifests and their source paths;
- scan only protected B2 files;
- reject dynamic class construction, default visual utilities, unregistered arbitrary visual values, raw colors, private reference tokens and important modifiers;
- verify every CSS exception ID, selector and Token against the Manifest;
- verify explicit `@source` coverage;
- verify `registry/` remains unpublished and contains only the previously authorized icon registration;
- preserve source-locked icon SVG/PNG bytes and intrinsic colors; validate new host styles without treating source artwork as forbidden page literals;
- report baseline/B2 benchmark lifecycle separately.

Add `pnpm verify:tailwind-b2` to `verify:governance` only after the validator passes its own positive and negative fixtures.

### Step 5: Verify GREEN

Run:

```bash
pnpm test -- scripts/verify-tailwind-b2.test.ts
pnpm verify:tailwind-b2
pnpm verify:governance
```

Expected: invalid fixtures fail for the intended reason, valid fixtures pass, and existing governance remains green.

**Git checkpoint: blocked. Candidate commit:** `test: enforce tailwind b2 contract`

## Task 6: Add typed class composition and Local Recipe primitives

**Files:**

- Create: `packages/ui/src/utils/rain-class-names.ts`
- Create: `packages/ui/src/utils/rain-class-names.test.ts`
- Create: `packages/ui/src/recipes/local-recipe.ts`
- Create: `packages/ui/src/recipes/local-recipe.test.ts`
- Modify: `packages/ui/src/index.ts`

### Step 1: Write failing merge tests

Cover exact Rain conflicts:

```ts
expect(rainCn("bg-rain-surface-panel", "bg-rain-surface-subtle"))
  .toBe("bg-rain-surface-subtle");
expect(rainCn("px-rain-8", "px-rain-10"))
  .toBe("px-rain-10");
expect(rainCn("flex items-center", false, undefined, "gap-rain-8"))
  .toBe("flex items-center gap-rain-8");
```

Also require that a Local Recipe has `id`, `scope: "feature"`, `origin`, `classes`, `modifiedParts`, `candidateTokens` and `promotionStatus`.

### Step 2: Verify RED

Run:

```bash
pnpm test -- packages/ui/src/utils/rain-class-names.test.ts packages/ui/src/recipes/local-recipe.test.ts
```

Expected: FAIL because helpers do not exist.

### Step 3: Implement the minimal helpers

`rainCn` accepts only strings, `false`, `null` and `undefined`, filters falsey values and calls `twMerge`. Do not add a second generic class helper.

Define a generic typed `RainLocalRecipe<PartName>` and a helper that retrieves classes for one declared Part. It must not accept inline raw style values.

If `tailwind-merge` does not recognize a Rain namespaced conflict in the RED tests, configure its supported extension API for the Rain namespace. Do not fall back to raw concatenation and do not add another package.

### Step 4: Verify GREEN

Run:

```bash
pnpm test -- packages/ui/src/utils/rain-class-names.test.ts packages/ui/src/recipes/local-recipe.test.ts
pnpm typecheck
```

Expected: conflict removal and recipe typing pass.

**Git checkpoint: blocked. Candidate commit:** `feat: add typed rain class recipes`

## Task 7: Migrate Button Master to Tailwind-first

**Files:**

- Create: `packages/ui/src/button/button.styles.ts`
- Create: `packages/ui/src/button/button.styles.test.ts`
- Modify: `packages/ui/src/button/button.tsx`
- Modify: `packages/ui/src/button/button.test.tsx`
- Modify: `packages/ui/src/styles.css`
- Modify: `manifests/ui/button.yaml`
- Modify: `tests/e2e/core-ui.spec.ts`

### Step 1: Add failing class and behavior expectations

Generate every `variant × tone × state` combination and require complete static classes. Assert that:

- the root keeps `rain-button`, `data-rain-id`, `data-slot`, Variant, Tone, Size, State, Density, Block and Focus attributes;
- a named Local Recipe can change a declared Part without changing the Master recipe object;
- an ordinary external `className` remains documented and tested as layout-only;
- no default visual or arbitrary utility appears;
- Loading and Disabled behavior stays identical.

### Step 2: Verify RED

Run:

```bash
pnpm test -- packages/ui/src/button/button.styles.test.ts packages/ui/src/button/button.test.tsx
```

Expected: FAIL because Button still receives its visual system from `packages/ui/src/styles.css`.

### Step 3: Implement the CVA recipe

Move Button base, Variant, Tone, Size, State and compound-state visuals into static CVA class maps. Preserve the post-2026-09-03 public props (`variant`, `tone`, `size`, `block`, `loading`, `loadingLabel`, icon slots), the `text` discriminated union and DOM order. Preserve Link's existing use of the shared text-button styles without redesigning Link. Add only the typed Local Recipe hook required by B2; do not add new business variants.

Keep CSS only for registered exceptions such as loading keyframes and reduced-motion handling. Every remaining Button selector in `styles.css` must carry a Manifest exception ID.

### Step 4: Verify Unit and browser parity

Run:

```bash
pnpm test -- packages/ui/src/button/button.styles.test.ts packages/ui/src/button/button.test.tsx
pnpm test:e2e -- tests/e2e/core-ui.spec.ts
```

Expected: the latest Button Gate computed colors, five heights, Focus geometry, canonical PNG-mask Loading and hierarchy-aware Disabled behavior remain unchanged on the Day 3 Core UI page. Also run existing text-button and icon-rendering browser checks; verify host icon colors, per-Part dimensions, 120% Loading mask, 800ms animation and Link parity. Do not restore the historical CSS border spinner.

### Step 5: Verify the contract

Run:

```bash
pnpm verify:tailwind-b2
```

Expected: Button is Tailwind-first, all CSS exceptions are registered, and no forbidden utility exists.

**Git checkpoint: blocked. Candidate commit:** `refactor: migrate button master to rain tailwind`

## Task 8: Migrate Input Master to Tailwind-first

**Files:**

- Create: `packages/ui/src/input/input.styles.ts`
- Create: `packages/ui/src/input/input.styles.test.ts`
- Modify: `packages/ui/src/input/input.tsx`
- Modify: `packages/ui/src/input/input.test.tsx`
- Modify: `packages/ui/src/styles.css`
- Modify: `manifests/ui/input.yaml`
- Modify: `tests/e2e/core-ui.spec.ts`

### Step 1: Add failing Root and Parts expectations

Cover Root, Control, Prefix, Suffix, Trailing Action, Clear Action and Count. Generate every Status and State needed by the existing contract. Require that a Local Recipe can target declared Parts while preserving label, ARIA, IME, grapheme, clear and focus behavior.

### Step 2: Verify RED

Run:

```bash
pnpm test -- packages/ui/src/input/input.styles.test.ts packages/ui/src/input/input.test.tsx
```

Expected: FAIL because Input visuals remain in the shared CSS file.

### Step 3: Implement Tailwind-first Input Parts

Move ordinary layout, spacing, typography, surface, border and state visuals into static Tailwind class maps. Preserve all existing props, controlled/uncontrolled paths, `data-*` contracts and DOM order.

Keep and register only reason-based CSS exceptions for:

- Root focus when the child control matches `:focus-visible`;
- forced-colors outline behavior;
- any browser-specific pseudo-element that cannot be expressed clearly without arbitrary variants.

Do not use Tailwind arbitrary variants as a loophole for unregistered selectors.

### Step 4: Verify Unit and browser parity

Run:

```bash
pnpm test -- packages/ui/src/input/input.styles.test.ts packages/ui/src/input/input.test.tsx packages/ui/src/input/input.utils.test.ts
pnpm test:e2e -- tests/e2e/core-ui.spec.ts
```

Expected: existing Default/Warning/Error, Read-only, Disabled, Focus, Compact/Default, clear, count and IME behavior remain unchanged.

### Step 5: Verify the contract

Run:

```bash
pnpm verify:tailwind-b2
```

Expected: Input is Tailwind-first and every retained CSS rule is registered and Token-bound.

**Git checkpoint: blocked. Candidate commit:** `refactor: migrate input master to rain tailwind`

## Task 9: Implement provenance-aware Local Fork creation and update detection

**Files:**

- Create: `scripts/create-local-fork.mjs`
- Create: `scripts/create-local-fork.test.ts`
- Create: `scripts/check-local-fork-updates.mjs`
- Create: `scripts/check-local-fork-updates.test.ts`
- Modify: `manifests/contracts/tailwind-b2.yaml`
- Modify: `scripts/verify-tailwind-b2.mjs`
- Modify: `package.json`

### Step 1: Write failing filesystem tests in temporary directories

Tests must require that the fork command:

- accepts only registered `ui-button` or `ui-input` origins during the pilot;
- requires an explicit target under `apps/playground/src/experiments/tailwind-b2/**`;
- refuses to overwrite an existing target;
- copies declared source files;
- creates a Local Manifest with origin paths and SHA-256 checksum;
- records `scope: feature`, `assetIdentity: local-experiment`, modified Parts and candidate Tokens;
- never edits the origin Master.
- keeps static single-icon package imports; never copies the whole icon library or source graphics into the Local Fork.

Update tests must simulate an upstream source change and expect `update-available`, not an automatic merge.

### Step 2: Verify RED

Run:

```bash
pnpm test -- scripts/create-local-fork.test.ts scripts/check-local-fork-updates.test.ts
```

Expected: FAIL because commands do not exist.

### Step 3: Implement minimal Node scripts

Use only Node built-ins. Do not add a generator framework. Add scripts:

```json
"fork:local": "node scripts/create-local-fork.mjs",
"check:local-forks": "node scripts/check-local-fork-updates.mjs"
```

The update command reports `clean`, `update-available` or `required-review`. It never writes into a Local Fork. `required-review` must be driven by registered source metadata, not guessed from a diff.

### Step 4: Verify GREEN

Run:

```bash
pnpm test -- scripts/create-local-fork.test.ts scripts/check-local-fork-updates.test.ts
pnpm check:local-forks
```

Expected: temporary fork tests pass; the real workspace reports no untracked Local Fork until Task 10.

**Git checkpoint: blocked. Candidate commit:** `feat: add local fork provenance tooling`

## Task 10: Build the Input + Button search-operation-area pilot

**Files:**

- Create: `apps/playground/src/experiments/tailwind-b2/tailwind-b2-page.tsx`
- Create: `apps/playground/src/experiments/tailwind-b2/tailwind-b2-page.test.tsx`
- Create: `apps/playground/src/experiments/tailwind-b2/search-operation-area.tsx`
- Create: `apps/playground/src/experiments/tailwind-b2/search-operation-area.test.tsx`
- Create: `apps/playground/src/experiments/tailwind-b2/search-operation-area.recipe.ts`
- Create only if needed by the fixed prompt: `apps/playground/src/experiments/tailwind-b2/search-operation-area.tokens.css`
- Create through the fork command: `apps/playground/src/experiments/tailwind-b2/forks/search-input/**`
- Create: `manifests/local-experiments/tailwind-b2-search-operation-area.yaml`
- Modify: `apps/playground/src/app.tsx`
- Modify: `apps/playground/src/routes/route-registry.ts`
- Modify: `apps/playground/src/routes/overview-page.tsx`
- Modify: `scripts/verify-boundaries.mjs`
- Modify: `scripts/verify-workspace.mjs`

### Step 1: Write failing scope and rendering tests

Require:

- the pilot page is marked `data-asset-identity="local-experiment"`;
- the search operation area has a stable `data-rain-id`;
- Existing Variant is selected before a local recipe is introduced;
- the Local Recipe ID is visible on only the target feature;
- the optional local candidate Token exists only under the feature root;
- the Local Fork uses a local import path and the rest of the Playground still imports `@rain-next/ui`;
- global Core UI Button/Input computed styles remain unchanged.

### Step 2: Verify RED

Run:

```bash
pnpm test -- apps/playground/src/experiments/tailwind-b2
```

Expected: FAIL because the pilot page and local assets do not exist.

### Step 3: Implement Prompt 1 through the smallest sufficient layer

Apply “只把当前搜索区的 Input 调得更宽松、背景更浅，不影响其他 Input。”

- Use an existing Rain Token when it matches the intent.
- Create a feature-scoped candidate Token only if no Rain Token matches.
- Prefer Local Recipe; do not create a full Fork for a Root-only presentation change.

### Step 4: Implement Prompt 2 through Existing Variant or Local Recipe

Apply “只调整当前页面搜索 Button 的视觉层级，不改变全局 Button。”

Use the existing `variant` / `tone` contract if sufficient. Create a Local Recipe only if the request cannot be met through the existing Variant. Record which branch was selected.

### Step 5: Implement Prompt 3 and exercise Local Fork

Apply “在同一功能的第二个搜索状态中复用局部样式，并仅为当前搜索功能增加一个独立的 `scope-label` Input Part；不修改全局 Input。”

This request intentionally changes the local anatomy, so it must exercise the Input Local Fork path. Run the local-fork command, add the `scope-label` Part only inside the generated Fork, keep all Input behavior tests and add tests for the new Part. Do not modify `packages/ui/src/input/**` during this local task.

### Step 6: Verify GREEN

Run:

```bash
pnpm test -- apps/playground/src/experiments/tailwind-b2
pnpm check:local-forks
pnpm verify:tailwind-b2
```

Expected: the local scene passes, provenance is current, and global Master files remain untouched by the three local prompt diffs.

**Git checkpoint: blocked. Candidate commit:** `feat: add tailwind b2 search pilot`

## Task 11: Add browser isolation and visual-regression evidence

**Files:**

- Create: `tests/e2e/tailwind-b2.spec.ts`
- Create on evidence run: `evidence/runtime/tailwind-b2/tailwind-b2-page.png`
- Create: `evidence/runtime/tailwind-b2/automated-results.md`
- Modify: `evidence/runtime/tailwind-b2/README.md`
- Modify: `scripts/verify-tailwind-b2.mjs`

### Step 1: Write failing browser tests

The test must verify:

- pilot navigation and focus transfer;
- target Input and Button computed styles reflect only the Local Recipe / Fork;
- Day 3 Core UI Input and Button retain their pre-pilot computed styles;
- Error, Disabled, Loading, Focus, keyboard and reduced-motion behavior remain valid;
- candidate Token scope does not leak outside the search operation area;
- no default Tailwind visual class appears on protected nodes;
- icon host color, size/alignment, Loading alpha/animation, reduced-motion, forced-colors and decorative/accessibility behavior are preserved; computed styles must detect unlayered Icon CSS overriding layered utilities;
- a screenshot can be saved only when `RAIN_UPDATE_TAILWIND_B2_EVIDENCE=1`.

### Step 2: Verify RED

Run:

```bash
pnpm test:e2e -- tests/e2e/tailwind-b2.spec.ts
```

Expected: FAIL until route, computed styles and evidence handling are complete.

### Step 3: Implement the minimum fixes

Fix only failures inside the B2 contract. Do not weaken selectors, remove accessibility assertions, change global expected styles or add arbitrary visual values to make the test pass.

### Step 4: Verify GREEN and save evidence

Run:

```bash
RAIN_UPDATE_TAILWIND_B2_EVIDENCE=1 pnpm test:e2e -- tests/e2e/tailwind-b2.spec.ts
```

If the local sandbox blocks the browser server port, rerun the same command with the required runtime approval; do not change the application to bypass the sandbox.

Record the screenshot byte size, dimensions and SHA-256 in `README.md`. The screenshot is runtime evidence, not Human Gate acceptance.

**Git checkpoint: blocked. Candidate commit:** `test: prove b2 local isolation in browser`

## Task 12: Run the B2 side of the AI editability benchmark

**Files:**

- Create: `evidence/runtime/tailwind-b2/b2-results.yaml`
- Create: `docs/audits/2026-09-03-tailwind-b2-pilot-report.md`
- Modify: `scripts/verify-tailwind-b2.mjs`
- Modify: `scripts/verify-tailwind-b2.test.ts`

### Step 1: Add failing decision tests

Add a pure helper that returns `pass`, `fail` or `awaiting-human`.

Require `fail` when any safety gate fails. Require `awaiting-human` when safety passes and at least three value metrics beat baseline but Human Gate is not evaluated. Never return `pass` without Human Gate acceptance.

### Step 2: Verify RED

Run:

```bash
pnpm test -- scripts/verify-tailwind-b2.test.ts
```

Expected: FAIL until B2 results and decision logic exist.

### Step 3: Record actual B2 results

For the same three prompts, record:

- first-pass result;
- correction prompts;
- changed files;
- whether a global Master changed during the local task;
- unregistered visual values;
- targeted tests;
- human-readable continuation assessment;
- elapsed time as secondary evidence only.

Use actual tool output and diffs. Do not backfill favorable values to meet the threshold.

### Step 4: Compare against baseline

The report must show all safety gates individually and score the four value metrics as `better`, `same`, `worse` or `not-measured`, with evidence links. It must explicitly state one of:

- `no-go`;
- `awaiting-human`;
- `accepted-for-next-pilot` after a later Human Gate.

It must not propose migrating the next component inside the same implementation scope.

### Step 5: Verify GREEN

Run:

```bash
pnpm test -- scripts/verify-tailwind-b2.test.ts
pnpm verify:tailwind-b2
```

Expected before Human Gate: `awaiting-human` only if all safety gates pass and at least three value metrics are better; otherwise `no-go` or `rework`.

**Git checkpoint: blocked. Candidate commit:** `docs: compare tailwind b2 pilot evidence`

## Task 13: Run complete regression and prepare the Human Gate

**Files:**

- Modify only after fresh successful checks: `status/current-phase.yaml`
- Modify: `evidence/runtime/tailwind-b2/automated-results.md`
- Modify: `docs/audits/2026-09-03-tailwind-b2-pilot-report.md`

### Step 1: Run all automated verification

Run from the repository root:

```bash
pnpm verify:tailwind-b2
pnpm verify
pnpm verify:reuse-audit
```

Expected:

- governance, lockfile, workspace, evidence and boundaries pass;
- TypeScript passes;
- all Vitest tests pass;
- Vite build passes;
- all Chromium E2E tests pass;
- reuse audit remains passed;
- no unrelated lifecycle status changes.

If any command fails, record `automatedVerification: failed`; do not mark implementation completed and do not present a Human Gate as ready.

### Step 2: Audit the final change scope

Confirm:

- only Button/Input Masters were migrated;
- Tag/Badge/Surface/Card remain unchanged;
- Select/Dialog/Headless/Layout remain absent;
- `registry/` still contains only the existing, unpublished icon registration; no B2 asset is distributed;
- icon source files, inventory, generated entries, semantic rules and accepted Gates remain unchanged; `verify:icons` still proves single-icon consumers do not import the full library;
- Figma, publication, migration and Git states remain unauthorized;
- temporary baseline paths are not imported or bundled;
- no secret, private data, font binary or generated build output is included.

### Step 3: Update lifecycle truthfully

Only after all automated checks pass:

- set Implementation to `completed` for the B2 pilot only;
- set Automated Verification to `passed` with exact commands;
- set AI Editability Benchmark to `awaiting-human` or `no-go` according to measured results;
- set Human Gate to `awaiting_human`, never `accepted`;
- leave every publication, migration and Git axis unchanged.

### Step 4: Present the Human Gate

Show the designer:

- baseline and B2 screenshots for the same three tasks;
- target and non-target Input/Button comparisons;
- Token and candidate-Token usage;
- Local Recipe / Fork source and provenance in plain language;
- safety-gate results;
- the four value comparisons;
- known costs and unresolved risks.

The Human Gate asks only whether B2 should be accepted, reworked or rejected. Acceptance does not authorize migration of another component; that requires a new plan and scope.

**Git checkpoint: blocked. Candidate commit:** `test: close tailwind b2 pilot verification`

## Stop conditions

Stop immediately and report evidence if any of the following occurs:

- the exact dependencies cannot be verified or require extra direct packages or unaudited transitive packages;
- Tailwind source detection misses UI or Local Fork classes;
- disabling default namespaces breaks required structural utilities and cannot be solved with Rain mappings;
- `tailwind-merge` cannot reliably resolve Rain namespaced conflicts;
- local changes require modifying the global Master to work;
- Input or Button behavior, Focus, IME or accessibility regresses;
- unregistered arbitrary values are necessary to reproduce the accepted visual result;
- baseline evidence was not captured before migration;
- the B2 value result does not beat baseline on at least three of four metrics.

Do not expand scope to fix a structural failure. A failed pilot is a valid outcome.

## Deferred execution handoff

The B2 checkpoint is now explicitly authorized. Continue from the batch record in `docs/audits/2026-09-03-tailwind-b2-entry-review.md` and `status/current-phase.yaml`; do not restart completed governance work or infer that baseline trials or component migration have happened. No new user-owned task, worktree, Git commit or remote action is authorized by this document.
