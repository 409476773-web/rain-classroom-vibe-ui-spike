# Pie / Ring / Gauge feedback verification

Scope: browser comments 5, 6, 7, 13; shared issue 2 and Ring progress legend in shared issue 3. Unpublished chart candidate; visual Human Gate remains awaiting user review.

## Findings and changes

- Pie gradients incorrectly used the next category color as their outer stop. Each sector now retains its own hue and varies opacity.
- Patterned Pie hover inherited `PieSlice` glow. It now retains the native hover offset while disabling glow, removing the unintended shadow.
- `ChartStatFlow` included the suffix in the main numeric glyphs. The numeric value and unit now remain adjacent with a 2 px gap; the unit is 65% of the number's font size. Custom Pie center uses the same unit typography.
- Ring's default number was explicitly hidden. Custom `RingCenter` renderers now receive the first target in the default state and the hovered target in hover state. Default and variant centers show one target's reading, never an aggregate percentage.
- Ring progress legend now composes existing `Legend`, `LegendItemComponent`, `LegendMarker`, `LegendLabel`, `LegendValue`, and `LegendProgress` parts with a keyboard focusable button. Progress has a readable name and its own track row.
- Linear Gauge value and label share a baseline. Native Gauge formerly clamped `enterStaggerScale={0}` to 0.25; zero-duration / reduced-motion entries now render every notch immediately. Normal entrance animation remains.

## Checks

- `pnpm exec vitest run packages/ui/src/charts/gauge-motion.test.tsx packages/ui/src/charts/chart-stat-flow.test.tsx apps/playground/src/docs/components/chart-variants/radial.test.tsx apps/playground/src/docs/components/chart-variants/comparison.test.tsx`: 20 / 20 passed, exit 0.
- `pnpm --filter @rain-next/ui typecheck`: passed, exit 0.
- Final Chromium checks in `tests/e2e/chart-feedback-radial.spec.ts`: 4 / 4 passed, exit 0, 7.5 seconds. Both Playground 5173 and Prototype 5387 at widths 1280 and 390. Actual suffix glyph sizes/gap, SVG gradient stops, hovered pattern filters, Ring default/focus/blur readings, and Gauge row bounds / 124 fully visible paths were checked.
- Fresh screenshots and per-case measurements: `radial-final/` (20 screenshots, 4 JSON measurement files). Gauge 390, Pie gradient 1280, and hovered Pie pattern 1280 were visually inspected.

The initial Prototype run exposed that its generated chart utility CSS lacked the new unit size. Root regenerated the CSS before the final four passing cases. Original failure traces remain in `radial-results/`; those are prior failures, not current passing evidence.

Playground typecheck was briefly blocked by two concurrent structure-test `getByRole` calls using an unsupported `exact` option. The structure owner was notified; overall final verification is recorded by the parent task.

## Limits

Safari / VoiceOver and user visual approval are not covered by these Chromium checks. Publication, Figma, migration, and Git commit were not performed.
