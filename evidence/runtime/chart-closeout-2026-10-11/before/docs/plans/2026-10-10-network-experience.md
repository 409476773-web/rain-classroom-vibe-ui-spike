# Network experience implementation plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make NetworkChart preview, selection, entrance, filtering, updates and style changes continuous while preserving the accepted Rain geometry and arrows.

**Architecture:** Extend the existing unpublished SVG/Motion component, retaining stable IDs and validated input. Reuse Bklit's TooltipBox, keep business filtering in the host, retain routes for unchanged subsets, and fade affected edges before moving nodes and reconnecting. Cancel pending transition work on newer input or reduced motion; add no dependency or public option.

**Tech Stack:** React 19, existing Motion 12, Rain Button/Table, Vitest and the established chart-business Playwright suite.

---

- Authorization: user “开始实现”, after discussion and confirmation; System Mode, local unpublished candidate only.
- Preserve: accepted glow material/layout, structured category columns, exact arrow geometry, input validation, original-node callback, palettes, full relation readings and narrow layout. No Figma, publishing, migration, commit or push.
- Design methods: V05 (body/label hit area, preview versus fixed selection, rapid reversal), I02 (edge direction/type/value in a nearby reading with exact data retained), D02 (stable nearby detail slot). Local timings are not global motion defaults.
- Assumptions to verify: bounded small-network routing remains suitable for four fixtures; staged reconnection is preferable to unsafe path interpolation. Real hardware frame rate and live hand review are not yet measured. Prior native browser retrieval was denied by URL policy; do not bypass it. Run normal repository tests as development verification.

### Task 1: Behavior regressions

- Modify `packages/ui/src/charts/network/network-chart.test.tsx`: prove node/edge preview, pinned selection independence, zero/missing readings, Escape/background clearing, stable full-graph routes after filtering, latest-input transition and reduced-motion completion.
- Update the existing `apps/playground/src/docs/components/chart-business/network-examples.test.tsx` terminal-state assertion to await item exit completion; keep its selection and position checks.
- Run the focused test file and confirm new assertions fail before implementation.

### Task 2: Component and host

- Modify `packages/ui/src/charts/network/network-chart.tsx` and the network portion of `packages/ui/src/charts/styles.css`: TooltipBox, continuous hit areas, hover/selected visuals, fixed detail slot, visible entrance, item exit, and safe cancellable route transitions.
- Modify `apps/playground/src/docs/components/chart-business/network-examples.tsx` only for scene exit/entrance continuity. Preserve `filterNetwork`, fixtures and accepted coordinate preparation.
- Keep API and registry/export file closures unchanged; existing shared vendor files already include TooltipBox.
- Run focused unit tests and UI typecheck, repair failures within scope.

### Task 3: Verification and delivery

- Extend `tests/e2e/chart-business-network.spec.ts` for actual hit areas, tooltip bounds, safe transition frames, stable subset routes, rapid reversal, viewport entrance and reduced motion; keep existing geometry and narrow checks.
- Run scoped chart/export/color tests, both host builds, Network browser suite and registry/business consumption verification. Record failures outside this scope separately.
- Update Network README, `manifests/ui/chart-network.yaml`, and the Network section of `status/current-phase.yaml` with actual evidence and remaining gates. Preserve independent publication, human review and hardware accessibility states.
- Evidence: `evidence/runtime/chart-network-experience-2026-10-10/`; compare task-start hashes to protect unrelated shared-worktree changes. No new global method rule until user accepts the revised interaction.

Implementation note: the first fixed-delay transition reproduced card crossings during rapid reversal/busy frames. It was replaced with the installed Motion controls' actual fade completion and per-node completion callbacks; no timer-based geometry choreography remains. Source previews use the existing TooltipBox without modifying vendor files. No Git integration step is in the authorized scope.
