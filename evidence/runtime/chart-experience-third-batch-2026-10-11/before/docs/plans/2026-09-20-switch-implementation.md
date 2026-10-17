# Switch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在 Rain Next 公共 UI 包中交付一个保留旧版视觉与三尺寸几何、同时采用成熟原生表单与无障碍行为的 React Switch。

**Architecture:** 复用已安装的 Base UI Switch primitive 处理 native button、hidden input、受控/非受控状态与表单 reset；Rain Next 自己负责公开 API 收敛、Loading 交互门控、旧版尺寸几何、Rain 语义色、data hooks 和 registry 元数据。Switch 保持纯控制，不内置 label/description/card。

**Tech Stack:** React 19, TypeScript, Base UI 1.8, Tailwind v4, Vitest, Testing Library。

---

### Task 1: Lock the public contract with failing tests

**Files:**
- Create: `packages/ui/src/switch/switch.test.tsx`

**Steps:**
1. Add tests for public export, accessible name, `type=button`, `role=switch`, `aria-checked`, ref, controlled and uncontrolled changes.
2. Add tests for Space/Enter, disabled, loading, disabled+loading precedence, and callback suppression.
3. Add tests for `name`/`value` FormData, form reset, required and external label association.
4. Add tests for `small`/`medium`/`large`, state/data hooks, loading indicator, and no unsupported public `readOnly` API.
5. Run `pnpm exec vitest run packages/ui/src/switch/switch.test.tsx`; confirm failure because the public Switch does not exist yet.

### Task 2: Implement the smallest working Switch

**Files:**
- Create: `packages/ui/src/switch/switch.tsx`
- Modify: `packages/ui/src/index.ts`

**Steps:**
1. Wrap the installed Base UI Root/Thumb primitive with `nativeButton` rendering and a `button` ref.
2. Expose only the agreed API: controlled/uncontrolled checked state, three sizes, disabled, loading, name/value/form/required, native aria/id/className/ref.
3. Use `readOnly` internally while loading so uncontrolled state cannot move; add `aria-disabled` and `aria-busy`; let disabled remain native and win focusability when both flags are present.
4. Render root/track/indicator/loading data slots and Rain data hooks; use `rainCn` and `useDensity` already used by neighboring controls.
5. Keep validation focused on accessible naming, checked/defaultChecked exclusivity, and valid size/value inputs.
6. Run the switch test file and fix only failures caused by this implementation.

### Task 3: Add Rain visual recipe and token mappings

**Files:**
- Modify: `packages/ui/src/styles.css`

**Steps:**
1. Add the old small/medium/large hit area, track, inset, thumb and loading geometry through local component variables.
2. Map checked states to existing Rain semantic fill tokens first; use existing neutral, on-color, focus and disabled semantics for the remaining states.
3. Add hover/active/focus-visible, reduced-motion, dark-theme inheritance and forced-colors behavior without introducing a new dependency or a broad token family.
4. Keep the loading indicator decorative and non-interactive; preserve its visibility when disabled and loading are combined.
5. Re-run the switch tests and inspect computed classes/styles through the existing test environment.

### Task 4: Register the public component

**Files:**
- Create: `manifests/ui/switch.yaml`
- Create: `registry/switch.json`

**Steps:**
1. Record the pure-control contract, anatomy, props, states, keyboard behavior, form behavior, visual lineage, and explicit non-goals.
2. Mark it as a registry candidate with publication not-published; do not claim migration, contrast, publication, or global token governance.
3. Reference only the existing Base UI dependency and Rain semantic tokens.

### Task 5: Add a minimal runnable playground surface and verify

**Files:**
- Inspect and modify only the existing core UI playground route files needed to expose Switch.

**Steps:**
1. Add one small Switch section demonstrating all sizes, checked/unchecked, disabled, loading, and an external label/form example.
2. Run the targeted Switch test, package typecheck/build, and the nearest playground test if the route is changed.
3. Run the relevant registry/boundary checks; record the known pre-existing full-suite governance failures separately.
4. Review the final diff for unrelated files and stop without committing, since Git publication was not authorized.
