# Matrix interaction refinement implementation plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. The user has authorized immediate implementation in this session; do not request another execution choice.

**Goal:** Make category matrices use equal columns, truthful area and color encodings, transparent numeric readings, compact semantic legends, and continuous Bklit-style interaction.

**Architecture:** Keep the existing native-table MatrixChart and date-aware Bklit HeatmapChart as separate unpublished entries. Reuse existing Bklit palette, TooltipBox and spatial entry timing where their types fit; preserve matrix row/column IDs, domain validation, accessible table readings and date layout boundaries.

**Tech Stack:** Existing React, TypeScript, Motion and Rain tokens; no new dependencies.

## Authorization and scope

- Decision: user confirmed the two discussion rounds and said “确定。开始实施” on 2026-10-09.
- Mode: System Mode, incremental change to an unpublished registry candidate.
- Shared dirty worktree: `.worktrees/card-v2`; preserve unrelated changes and prior evidence. No Git, publication, Figma or P3–P5 work.
- Methods: V05 coordinates content, appearance and behavior; I02 preserves precise values and distinguishes area, continuous intensity, grade, zero and missing. Calendar and category matrices share visual rules while axis meanings remain explicit.
- Scope: matrix data/renderer/CSS/tests/README, playground fixtures/examples, matrix manifest and chart consumption guidance, affected registry/style/download closure, scoped runtime evidence and status child record.
- Assumptions to verify: viewport entry happens when viewed, sorted table marks interpolate without distortion, actual glyphs fit within bubbles, white bubble readings remain readable, existing TooltipBox works outside date chart context.

## Task 1: Shared quantity and intensity encoding

Files: `packages/ui/src/charts/matrix/matrix-data.ts`, `matrix-data.test.ts`.

1. Write and run failing tests for value-dependent bubble colors, fixed-domain colors independent of row order, and quarter/half/max legend values.
2. Reuse `CHART_SCALE_VARS`; interpolate adjacent sequential stops at `fraction * 4`. Keep `radius = maxRadius * Math.sqrt(fraction)` and all validation. Explicit `heat.steps` supports the actual1–8 semester fixture, validates declared ordered values and emits a discrete strip without fractional semester labels.
3. Run `pnpm exec vitest run packages/ui/src/charts/matrix/matrix-data.test.ts`.

## Task 2: Transparent readings, equal grid and continuous interaction

Files: `packages/ui/src/charts/matrix/matrix-chart.tsx`, `matrix.css`, `matrix-chart.test.tsx`; new `matrix-interaction.test.tsx` and browser refinement spec.

1. Add failing interaction tests: pointer/focus shows exact tooltip, adjacent cells reuse it, arrow keys inspect the next coordinate, legend focus links marks, updated readings stay available with no plaque.
2. Use a fixed native-table layout with an independent row-heading column and equal data columns. Preserve minimum cell width and contained horizontal scrolling. Long column labels adapt to the grid.
3. Remove contrast plaques and blanket update-time hiding. Bubble text uses OnColor; heat chooses existing dark/light text from resolved painted fills, with no backing surface. During finite radius/fill transitions, fit and tone follow actual painted geometry/color. Preserve zero/missing/not-applicable and forced-colors readability.
4. Trigger finite spatial entry on first viewport visibility. Use Motion layout position transitions for stable coordinate marks and continuous radius/color changes. Reduced motion renders final states.
5. Keep the scroll region as the single matrix keyboard entry for arrow/Home/End inspection and Escape dismissal; retain native table headers and no per-cell Tab stops. Pointer/focus updates one persistent TooltipBox; reuse existing spring positioning and short hide grace, cleaning timers on unmount.
6. Use a thin continuous heat gradient, same-domain quantity circles with bottom alignment and grade dots. Legend hover/focus highlights the corresponding range/grade without changing numeric fills.
7. Run `pnpm exec vitest run packages/ui/src/charts/matrix` and `pnpm exec playwright test -c tests/e2e/chart-business.config.ts tests/e2e/chart-business-matrix-refinement.spec.ts`.

## Task 3: Consumer contract and delivery evidence

Files: `packages/ui/src/charts/matrix/README.md`, `manifests/ui/chart-matrix.yaml`, `docs/ai/charts.md`, playground matrix fixture description, existing style/registry outputs if required, `status/current-phase.yaml` and this round's evidence directory.

1. Replace superseded plaque/update-hiding/timing guidance; document shared grid-chart vocabulary and separate calendar axes. No extra public options or new engine.
2. Run scoped chart/consumer unit checks, UI and two-app type/build checks, style/registry verification and isolated download consumption.
3. Check actual page at desktop and narrow width, 4/6/12 matrices, hover/focus/legend, sorting, updates, viewport entry/replay, reduced motion and supplied examples. Save screenshots and measured intermediate states.
4. Review integrated changes independently. Record actual results; visual Human Gate remains awaiting user review and publication remains unpublished.

No automatic promotion of local values into Foundations or closure of unrelated phase gates.
