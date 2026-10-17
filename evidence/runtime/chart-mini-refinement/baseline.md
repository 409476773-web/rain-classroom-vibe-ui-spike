# Mini chart refinement — T00 baseline

- Captured UTC: 2026-10-08T16:46:22.917461+00:00
- Worktree: `/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`
- Branch: `codex/card-v2`
- HEAD: `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`
- SHA-256 captured for 300 relevant files; per-file Git state in `baseline-files.json`.
- Existing dirty/untracked work is preserved as the starting source; this is not a Git HEAD reconstruction.
- Mode: read-only T00 evidence; implementation authorization is owned by the parent task.

## Service provenance

### Port 5173

```text
COMMAND  PID        USER   FD   TYPE            DEVICE SIZE/OFF NODE NAME
node    7866 wenchengkai   14u  IPv4 0xac68cb71da0eab0      0t0  TCP 127.0.0.1:5173 (LISTEN)
```

```text
7866  7488 node /Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/node_modules/.bin/../.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173 --strictPort
p7866
fcwd
n/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/apps/playground
```
### Port 5387

```text
COMMAND   PID        USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    70791 wenchengkai   14u  IPv4 0xaa75af0db65678c6      0t0  TCP 127.0.0.1:5387 (LISTEN)
```

```text
70791 70420 node /Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/node_modules/.bin/../.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5387 --strictPort
p70791
fcwd
n/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/apps/prototype
```

## Planned baseline checks

Plan §7.1 existing five target test files, Playground typecheck, prototype typecheck, and `scripts/charts.test.ts` will be recorded below. The new `chart-mini-size.test.tsx` does not exist at T00 and is not run as a baseline.

## Scoped Git starting state

Only the 300 recorded paths are retained. Full repository status was sampled to derive per-file states and is deliberately omitted from this evidence.

- ` M` `apps/playground/package.json`
- `??` `apps/playground/src/docs/components/chart-business/bar-examples.tsx`
- `??` `apps/playground/src/docs/components/chart-business/chart-business-page.tsx`
- `??` `apps/playground/src/docs/components/chart-business/chart-business.css`
- `??` `apps/playground/src/docs/components/chart-business/embedding-examples.tsx`
- `??` `apps/playground/src/docs/components/chart-business/matrix-data.test.ts`
- `??` `apps/playground/src/docs/components/chart-business/matrix-data.ts`
- `??` `apps/playground/src/docs/components/chart-business/matrix-examples.test.tsx`
- `??` `apps/playground/src/docs/components/chart-business/matrix-examples.tsx`
- `??` `apps/playground/src/docs/components/chart-business/mini-data.test.ts`
- `??` `apps/playground/src/docs/components/chart-business/mini-data.ts`
- `??` `apps/playground/src/docs/components/chart-business/mini-examples.test.tsx`
- `??` `apps/playground/src/docs/components/chart-business/mini-examples.tsx`
- `??` `apps/playground/src/docs/components/chart-catalog.ts`
- `??` `apps/playground/src/docs/components/chart-data.ts`
- `??` `apps/playground/src/docs/components/chart-example-source.tsx`
- `??` `apps/playground/src/docs/components/chart-examples.css`
- `??` `apps/playground/src/docs/components/chart-examples.tsx`
- `??` `apps/playground/src/docs/components/chart-page.css`
- `??` `apps/playground/src/docs/components/chart-page.tsx`
- `??` `apps/playground/src/docs/components/chart-variant-gallery.test.tsx`
- `??` `apps/playground/src/docs/components/chart-variant-gallery.tsx`
- `??` `apps/playground/src/docs/components/chart-variants.ts`
- `??` `apps/prototype/package.json`
- `??` `apps/prototype/src/scenarios/bklit-validation/catalog.css`
- `??` `apps/prototype/src/scenarios/bklit-validation/catalog.tsx`
- `??` `apps/prototype/src/scenarios/bklit-validation/vendor/source-lock.json`
- `??` `docs/adr/0012-bklit-rain-charts.md`
- `??` `docs/ai/charts.md`
- `??` `docs/plans/2026-10-07-chart-library-validation-plan.md`
- `??` `docs/plans/2026-10-07-chart-reference-recipes-design.md`
- `??` `docs/plans/2026-10-07-chart-trend-motion-implementation.md`
- `??` `docs/plans/2026-10-08-chart-business-expansion-implementation-plan.md`
- `??` `docs/plans/2026-10-08-chart-variants-coverage.md`
- `??` `docs/plans/2026-10-08-chart-variants-implementation-plan.md`
- `??` `docs/plans/2026-10-09-mini-chart-size-refinement-implementation-plan.md`
- `??` `manifests/ui/chart-area.yaml`
- `??` `manifests/ui/chart-bar.yaml`
- `??` `manifests/ui/chart-candlestick.yaml`
- `??` `manifests/ui/chart-choropleth.yaml`
- `??` `manifests/ui/chart-composed.yaml`
- `??` `manifests/ui/chart-funnel.yaml`
- `??` `manifests/ui/chart-gauge.yaml`
- `??` `manifests/ui/chart-heatmap.yaml`
- `??` `manifests/ui/chart-line.yaml`
- `??` `manifests/ui/chart-live-line.yaml`
- `??` `manifests/ui/chart-matrix.yaml`
- `??` `manifests/ui/chart-pie.yaml`
- `??` `manifests/ui/chart-profit-loss.yaml`
- `??` `manifests/ui/chart-radar.yaml`
- `??` `manifests/ui/chart-ring.yaml`
- `??` `manifests/ui/chart-sankey.yaml`
- `??` `manifests/ui/chart-scatter.yaml`
- `??` `manifests/ui/chart-sunburst.yaml`
- ` M` `packages/ui/package.json`
- `??` `packages/ui/src/charts/README.md`
- `??` `packages/ui/src/charts/bar-chart.test.tsx`
- `??` `packages/ui/src/charts/chart-brush.test.tsx`
- `??` `packages/ui/src/charts/chart-motion.test.tsx`
- `??` `packages/ui/src/charts/chart-stat-flow.test.tsx`
- `??` `packages/ui/src/charts/data-bar.test.tsx`
- `??` `packages/ui/src/charts/data-bar.tsx`
- `??` `packages/ui/src/charts/funnel-label-motion.test.tsx`
- `??` `packages/ui/src/charts/gauge-motion.test.tsx`
- `??` `packages/ui/src/charts/heatmap-data-patterns.test.tsx`
- `??` `packages/ui/src/charts/index.ts`
- `??` `packages/ui/src/charts/live-clock.test.tsx`
- `??` `packages/ui/src/charts/live-tooltip.test.tsx`
- `??` `packages/ui/src/charts/matrix/README.md`
- `??` `packages/ui/src/charts/matrix/matrix-chart.test.tsx`
- `??` `packages/ui/src/charts/matrix/matrix-chart.tsx`
- `??` `packages/ui/src/charts/matrix/matrix-data.test.ts`
- `??` `packages/ui/src/charts/matrix/matrix-data.ts`
- `??` `packages/ui/src/charts/matrix/matrix.css`
- `??` `packages/ui/src/charts/matrix/matrix.css.d.ts`
- `??` `packages/ui/src/charts/pie-slice.test.tsx`
- `??` `packages/ui/src/charts/recipes.ts`
- `??` `packages/ui/src/charts/ring-compact.test.tsx`
- `??` `packages/ui/src/charts/styles.css`
- `??` `packages/ui/src/charts/utilities.generated.css`
- `??` `packages/ui/src/charts/vendor/LICENSE`
- `??` `packages/ui/src/charts/vendor/charts/animation.ts`
- `??` `packages/ui/src/charts/vendor/charts/area-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/area-gradient-defs.tsx`
- `??` `packages/ui/src/charts/vendor/charts/area.tsx`
- `??` `packages/ui/src/charts/vendor/charts/background.tsx`
- `??` `packages/ui/src/charts/vendor/charts/bar-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/bar-depth-geometry.ts`
- `??` `packages/ui/src/charts/vendor/charts/bar-depth.tsx`
- `??` `packages/ui/src/charts/vendor/charts/bar-squares-layout.ts`
- `??` `packages/ui/src/charts/vendor/charts/bar-squares.tsx`
- `??` `packages/ui/src/charts/vendor/charts/bar-x-axis.tsx`
- `??` `packages/ui/src/charts/vendor/charts/bar-y-axis.tsx`
- `??` `packages/ui/src/charts/vendor/charts/bar.tsx`
- `??` `packages/ui/src/charts/vendor/charts/candlestick-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/candlestick.tsx`
- `??` `packages/ui/src/charts/vendor/charts/chart-brush-handle.tsx`
- `??` `packages/ui/src/charts/vendor/charts/chart-brush-layout.tsx`
- `??` `packages/ui/src/charts/vendor/charts/chart-brush-selection-overlay.tsx`
- `??` `packages/ui/src/charts/vendor/charts/chart-brush-track-overlay.tsx`
- `??` `packages/ui/src/charts/vendor/charts/chart-brush.tsx`
- `??` `packages/ui/src/charts/vendor/charts/chart-center-typography.ts`
- `??` `packages/ui/src/charts/vendor/charts/chart-child-passthrough.ts`
- `??` `packages/ui/src/charts/vendor/charts/chart-config-context.tsx`
- `??` `packages/ui/src/charts/vendor/charts/chart-context.tsx`
- `??` `packages/ui/src/charts/vendor/charts/chart-defs.ts`
- `??` `packages/ui/src/charts/vendor/charts/chart-formatters.ts`
- `??` `packages/ui/src/charts/vendor/charts/chart-legend-hover.tsx`
- `??` `packages/ui/src/charts/vendor/charts/chart-legend.tsx`
- `??` `packages/ui/src/charts/vendor/charts/chart-loading-label.tsx`
- `??` `packages/ui/src/charts/vendor/charts/chart-phase.ts`
- `??` `packages/ui/src/charts/vendor/charts/chart-reveal-clip.tsx`
- `??` `packages/ui/src/charts/vendor/charts/chart-scale.ts`
- `??` `packages/ui/src/charts/vendor/charts/chart-stat-flow.tsx`
- `??` `packages/ui/src/charts/vendor/charts/choropleth/choropleth-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/choropleth/choropleth-context.tsx`
- `??` `packages/ui/src/charts/vendor/charts/choropleth/choropleth-feature.tsx`
- `??` `packages/ui/src/charts/vendor/charts/choropleth/choropleth-graticule.tsx`
- `??` `packages/ui/src/charts/vendor/charts/choropleth/choropleth-tooltip.tsx`
- `??` `packages/ui/src/charts/vendor/charts/choropleth/index.ts`
- `??` `packages/ui/src/charts/vendor/charts/composed-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/dash-tail-stroke.tsx`
- `??` `packages/ui/src/charts/vendor/charts/decimate-time-series.ts`
- `??` `packages/ui/src/charts/vendor/charts/fade-edges.ts`
- `??` `packages/ui/src/charts/vendor/charts/filter-data-by-x-domain.ts`
- `??` `packages/ui/src/charts/vendor/charts/funnel-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/gauge-label-layout.tsx`
- `??` `packages/ui/src/charts/vendor/charts/gauge.tsx`
- `??` `packages/ui/src/charts/vendor/charts/generate-chart-skeleton-data.ts`
- `??` `packages/ui/src/charts/vendor/charts/grid.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/generate-heatmap-skeleton-data.ts`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-animation.ts`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-cells.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-chart-loading.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-colors.ts`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-context.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-legend-gradient.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-legend-swatch.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-legend.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-pattern-defs.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-resolve-separator.ts`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-separator.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-tooltip.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-utils.ts`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-x-axis.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/heatmap-y-axis.tsx`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/index.ts`
- `??` `packages/ui/src/charts/vendor/charts/heatmap/use-delayed-tooltip-data.ts`
- `??` `packages/ui/src/charts/vendor/charts/highlight-segment-bounds.ts`
- `??` `packages/ui/src/charts/vendor/charts/highlight-segment.tsx`
- `??` `packages/ui/src/charts/vendor/charts/indicator-fade.ts`
- `??` `packages/ui/src/charts/vendor/charts/legend/index.ts`
- `??` `packages/ui/src/charts/vendor/charts/legend/legend-context.tsx`
- `??` `packages/ui/src/charts/vendor/charts/legend/legend-item.tsx`
- `??` `packages/ui/src/charts/vendor/charts/legend/legend-label.tsx`
- `??` `packages/ui/src/charts/vendor/charts/legend/legend-marker.tsx`
- `??` `packages/ui/src/charts/vendor/charts/legend/legend-progress.tsx`
- `??` `packages/ui/src/charts/vendor/charts/legend/legend-value.tsx`
- `??` `packages/ui/src/charts/vendor/charts/legend/legend.tsx`
- `??` `packages/ui/src/charts/vendor/charts/line-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/line-loading-pulse.tsx`
- `??` `packages/ui/src/charts/vendor/charts/line-loading-timing.ts`
- `??` `packages/ui/src/charts/vendor/charts/line-series-terminal-marker.tsx`
- `??` `packages/ui/src/charts/vendor/charts/line.tsx`
- `??` `packages/ui/src/charts/vendor/charts/live-line-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/live-line.tsx`
- `??` `packages/ui/src/charts/vendor/charts/live-x-axis.tsx`
- `??` `packages/ui/src/charts/vendor/charts/live-y-axis.tsx`
- `??` `packages/ui/src/charts/vendor/charts/loading-sweep.tsx`
- `??` `packages/ui/src/charts/vendor/charts/markers/chart-markers.tsx`
- `??` `packages/ui/src/charts/vendor/charts/markers/index.ts`
- `??` `packages/ui/src/charts/vendor/charts/markers/marker-group.tsx`
- `??` `packages/ui/src/charts/vendor/charts/motion-utils.ts`
- `??` `packages/ui/src/charts/vendor/charts/notch-gauge-shared.ts`
- `??` `packages/ui/src/charts/vendor/charts/path-stroke-utils.ts`
- `??` `packages/ui/src/charts/vendor/charts/pattern-area.tsx`
- `??` `packages/ui/src/charts/vendor/charts/pattern-preset.tsx`
- `??` `packages/ui/src/charts/vendor/charts/pie-center-shell.tsx`
- `??` `packages/ui/src/charts/vendor/charts/pie-center.tsx`
- `??` `packages/ui/src/charts/vendor/charts/pie-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/pie-context.tsx`
- `??` `packages/ui/src/charts/vendor/charts/pie-slice.tsx`
- `??` `packages/ui/src/charts/vendor/charts/profit-loss-legend-hover.tsx`
- `??` `packages/ui/src/charts/vendor/charts/profit-loss-legend.tsx`
- `??` `packages/ui/src/charts/vendor/charts/profit-loss-line.tsx`
- `??` `packages/ui/src/charts/vendor/charts/profit-loss-segments.ts`
- `??` `packages/ui/src/charts/vendor/charts/projection-config.ts`
- `??` `packages/ui/src/charts/vendor/charts/projection-line-end-marker.tsx`
- `??` `packages/ui/src/charts/vendor/charts/projection-line.tsx`
- `??` `packages/ui/src/charts/vendor/charts/projection-utils.ts`
- `??` `packages/ui/src/charts/vendor/charts/radar-area.tsx`
- `??` `packages/ui/src/charts/vendor/charts/radar-axis.tsx`
- `??` `packages/ui/src/charts/vendor/charts/radar-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/radar-context.tsx`
- `??` `packages/ui/src/charts/vendor/charts/radar-grid.tsx`
- `??` `packages/ui/src/charts/vendor/charts/radar-labels.tsx`
- `??` `packages/ui/src/charts/vendor/charts/reference-area-config.ts`
- `??` `packages/ui/src/charts/vendor/charts/reference-area-geometry.ts`
- `??` `packages/ui/src/charts/vendor/charts/reference-area-registration-context.tsx`
- `??` `packages/ui/src/charts/vendor/charts/reference-area.tsx`
- `??` `packages/ui/src/charts/vendor/charts/ring-center.tsx`
- `??` `packages/ui/src/charts/vendor/charts/ring-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/ring-context.tsx`
- `??` `packages/ui/src/charts/vendor/charts/ring.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sankey/index.ts`
- `??` `packages/ui/src/charts/vendor/charts/sankey/sankey-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sankey/sankey-context.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sankey/sankey-link.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sankey/sankey-node.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sankey/sankey-tooltip.tsx`
- `??` `packages/ui/src/charts/vendor/charts/scatter-chart-shell.tsx`
- `??` `packages/ui/src/charts/vendor/charts/scatter-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/scatter-svg.ts`
- `??` `packages/ui/src/charts/vendor/charts/scatter.tsx`
- `??` `packages/ui/src/charts/vendor/charts/segment.tsx`
- `??` `packages/ui/src/charts/vendor/charts/series-bar-layout.ts`
- `??` `packages/ui/src/charts/vendor/charts/series-bar.tsx`
- `??` `packages/ui/src/charts/vendor/charts/series-dash-tail-overlay.tsx`
- `??` `packages/ui/src/charts/vendor/charts/series-highlight-layer.tsx`
- `??` `packages/ui/src/charts/vendor/charts/series-hover-dim.tsx`
- `??` `packages/ui/src/charts/vendor/charts/series-markers.tsx`
- `??` `packages/ui/src/charts/vendor/charts/series-path-utils.ts`
- `??` `packages/ui/src/charts/vendor/charts/series-point-marker.tsx`
- `??` `packages/ui/src/charts/vendor/charts/static-chart-preview-context.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sunburst-breadcrumb.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sunburst-center.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sunburst-chart.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sunburst-context.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sunburst-data.ts`
- `??` `packages/ui/src/charts/vendor/charts/sunburst-hint.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sunburst-labels.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sunburst-segment.tsx`
- `??` `packages/ui/src/charts/vendor/charts/sunburst.ts`
- `??` `packages/ui/src/charts/vendor/charts/time-series-chart-shell.tsx`
- `??` `packages/ui/src/charts/vendor/charts/tooltip/chart-tooltip.tsx`
- `??` `packages/ui/src/charts/vendor/charts/tooltip/date-ticker.tsx`
- `??` `packages/ui/src/charts/vendor/charts/tooltip/index.ts`
- `??` `packages/ui/src/charts/vendor/charts/tooltip/tooltip-box.tsx`
- `??` `packages/ui/src/charts/vendor/charts/tooltip/tooltip-content.tsx`
- `??` `packages/ui/src/charts/vendor/charts/tooltip/tooltip-dot.tsx`
- `??` `packages/ui/src/charts/vendor/charts/tooltip/tooltip-indicator.tsx`
- `??` `packages/ui/src/charts/vendor/charts/use-animated-series-path.ts`
- `??` `packages/ui/src/charts/vendor/charts/use-animated-y-domains.ts`
- `??` `packages/ui/src/charts/vendor/charts/use-chart-interaction.ts`
- `??` `packages/ui/src/charts/vendor/charts/use-chart-phase-orchestrator.ts`
- `??` `packages/ui/src/charts/vendor/charts/use-enter-complete.ts`
- `??` `packages/ui/src/charts/vendor/charts/use-grid-shimmer.ts`
- `??` `packages/ui/src/charts/vendor/charts/use-highlight-segment.ts`
- `??` `packages/ui/src/charts/vendor/charts/use-mount-progress.ts`
- `??` `packages/ui/src/charts/vendor/charts/use-scatter-chart-interaction.ts`
- `??` `packages/ui/src/charts/vendor/charts/use-scheduled-tooltip.ts`
- `??` `packages/ui/src/charts/vendor/charts/visx-pattern.tsx`
- `??` `packages/ui/src/charts/vendor/charts/x-axis.tsx`
- `??` `packages/ui/src/charts/vendor/charts/y-axis-scales.ts`
- `??` `packages/ui/src/charts/vendor/charts/y-axis-ticks.ts`
- `??` `packages/ui/src/charts/vendor/charts/y-axis.tsx`
- `??` `packages/ui/src/charts/vendor/charts/y-domain-utils.ts`
- `??` `packages/ui/src/charts/vendor/components/shimmering-text.tsx`
- `??` `packages/ui/src/charts/vendor/lib/utils.ts`
- `??` `packages/ui/src/charts/vendor/source-lock.json`
- `??` `registry/charts.json`
- `??` `scripts/capture-chart-variant-review.mjs`
- `??` `scripts/chart-color-consumers.test.ts`
- `??` `scripts/chart-variant-parts.test.ts`
- `??` `scripts/charts.test.ts`
- `??` `scripts/generate-chart-styles.mjs`
- `??` `scripts/verify-chart-business-consumption.mjs`
- `??` `scripts/verify-chart-business-consumption.test.ts`
- `??` `scripts/verify-chart-consumer-combinations.mjs`
- `??` `scripts/verify-chart-variant-consumption.mjs`
- `??` `scripts/verify-chart-variant-consumption.test.ts`
- ` M` `status/current-phase.yaml`
- `??` `tests/e2e/bklit-catalog.config.ts`
- `??` `tests/e2e/bklit-catalog.spec.ts`
- `??` `tests/e2e/chart-business-embedding.spec.ts`
- `??` `tests/e2e/chart-business-motion.spec.ts`
- `??` `tests/e2e/chart-business.config.ts`
- `??` `tests/e2e/chart-feedback-legend-tooltip.config.ts`
- `??` `tests/e2e/chart-feedback-legend-tooltip.spec.ts`
- `??` `tests/e2e/chart-feedback-material.spec.ts`
- `??` `tests/e2e/chart-feedback-radial.spec.ts`
- `??` `tests/e2e/chart-feedback-refinement.spec.ts`
- `??` `tests/e2e/chart-feedback-structure.config.ts`
- `??` `tests/e2e/chart-feedback-structure.spec.ts`
- `??` `tests/e2e/chart-feedback.config.ts`
- `??` `tests/e2e/chart-library-validation.config.ts`
- `??` `tests/e2e/chart-library-validation.spec.ts`
- `??` `tests/e2e/chart-trend-motion.config.ts`
- `??` `tests/e2e/chart-trend-motion.spec.ts`
- `??` `tests/e2e/chart-variants-interactions.config.ts`
- `??` `tests/e2e/chart-variants-interactions.spec.ts`
- `??` `tests/e2e/chart-variants-structure.spec.ts`
- `??` `tests/e2e/chart-variants.config.ts`
- `??` `tests/e2e/chart-variants.spec.ts`
- `??` `tests/e2e/charts-playground.config.ts`
- `??` `tests/e2e/charts-playground.spec.ts`
- ` M` `vitest.config.ts`

## Baseline test snapshot

Snapshot: `/var/folders/2h/mp7rp10x1plgfqrm94_0dcdm0000gn/T/rain-mini-baseline-o0vn0_iv`; 2026-10-08T16:47:08.730796+00:00. Existing dependency cache is reused through symlinks; no node_modules copied. Source hash drift at snapshot: [].

## Baseline check results

All commands ran against the temporary T00 snapshot. Existing cached dependencies were reused; `@rain-next` workspace links target snapshot packages. No runtime files were changed.

| Check | Result | Evidence |
| --- | --- | --- |
| Plan §7.1 five existing target files | exit 0; 5 files / 33 cases passed | `baseline-unit.log` |
| Playground typecheck | exit 0 | `baseline-playground-typecheck.log` |
| Prototype typecheck | exit 0 | `baseline-prototype-typecheck.log` |
| Chart Registry / source / mapping contracts | exit 1; 4 passed / 1 failed | `baseline-charts-contract.log` |

Vitest logged start: 2026-10-09 00:47:39 Asia/Shanghai. Results observed UTC: 2026-10-08T16:48:39.376344+00:00. Source snapshot was captured before implementation and matched all 300 starting hashes.

## Inherited Matrix count mismatch

- `registry/charts.json` and `CHART_ENTRIES` already contain 18 entries at T00: the original 17 Bklit mappings plus Rain Matrix.
- `scripts/charts.test.ts:19` still requires 17 Registry items and fails with received 18. Line 20 separately still requires 17 catalog IDs; that assertion is not reached. This failure predates this refinement.
- The separate official mapping test passes: 170 unique official source IDs, 16 official families, 17 Rain mappings including `line-profit-loss` → `profit-loss`. Matrix is not part of the 170 official examples.
- The other four contracts pass: native source hashes/dependency closure, official mappings, chart CSS containment, and trust-boundary data checks. The first test fails before iterating per-entry asset contracts; its loop was therefore not exercised in this baseline run.

## Not run

- New `chart-mini-size.test.tsx`: did not exist at T00; planned in T06.
- Full repository tests, browser runs, build and Token governance: outside assigned T00 check scope.
- T00 browser screenshots and 40-row performance: not measured by this agent.

Baseline data is recorded separately from later verification and does not grant visual acceptance or publication.
