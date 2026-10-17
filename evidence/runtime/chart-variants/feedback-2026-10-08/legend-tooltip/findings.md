# Chart legend and tooltip feedback, 2026-10-08

Read-only reproduction used the served card-v2 Playground at `http://127.0.0.1:5173`, Chromium viewports 1280×796, 1311×796, and 390×796, with reduced motion. Screenshots captured live rendered DOM, without modifying source CSS or page styles. The first probe preserved 12 before screenshots and computed bounds in `before-facts.json`.

## Confirmed causes

- The chart example CSS applied `width:10px;height:10px` to every direct span inside `.rain-chart-legend-button`, including labels. Default bar labels were 10×10 within a 44×22 button, and the actual text occupied six lines.
- The ring progress legend put label, reading, and native `<progress width=100%>` in one flex row. The first label measured 29×96, its reading 51×72, and its button 229×114. Native progress had `appearance:auto` and a 16px height, producing the screenshot's browser-specific green/gray bars.
- The map tooltip's custom `<strong> + <p>` content bypassed the existing native `TooltipContent` layout. The panel was 140×44 with zero content padding and a 16px title. The native panel radius and containment worked; changing panel positioning was unnecessary.
- Inline legend dots in the radar variant had zero rendered width despite a CSS width declaration. Inline-block/flex marker treatment belongs to the shared CSS fix.

## Reference and smallest fixes

The frozen upstream Bklit RingLegend example uses the installed `Legend`, `LegendItemComponent`, `LegendMarker`, `LegendLabel`, `LegendValue`, and `LegendProgress`: label/reading form the first row, and the small rounded progress track occupies a separate full-width row. A keyboard-focusable button remains useful for the Rain interaction contract.

Only decorative dot spans should receive dot dimensions. Complete legend labels should wrap as whole items while their own text stays horizontal. The root task owns this shared CSS patch; the radial task owns the ring parts.

The map renderer now uses the existing `TooltipContent` title and rows. It preserves each map's fill meaning, simulated count, zero, missing value, and unit. A search of default and gallery renderers found this as the sole custom map strong/paragraph tooltip; other data tooltip renderers already use the native content component. No TooltipBox behavior was changed.

## Checks

The new independent `chart-feedback-legend-tooltip.spec.ts` had 9/9 genuine RED failures before fixes: three viewports times default legend text, ring progress geometry, and map tooltip typography/insets/containment. RED logs and traces are preserved in `red.log` and `red-results`.

After the map content fix, all three map cases passed in `map-green.log` and `map-green-results`. The 390px after screenshot was visually inspected: 12px title, 13px value row, 12×10 content padding, 8px panel radius, and no plot overflow.

The final test suite adds equal progress track widths and three Sunburst cases covering both root and drilled child legend rows. All 12 cases pass in `final-poll.log` and `final-poll-results` (47.3s). In addition to waiting for initial measurement, the suite polls actual ring path bounds (at least six paths wider/taller than 80px) and visible default bar heights (over 100px) before capture. The final 1280px and 390px RingLegend screenshots, the 390px default bar screenshot, and the 390px root/child Sunburst screenshots were visually inspected. All rings and bars are rendered, progress tracks have equal width, labels remain horizontal, and Sunburst rows have no boxed pill overflow.

The original nine cases have genuine before-fix RED evidence. The three added Sunburst cases were authored after the root had applied its fix; they provide new GREEN coverage without claiming a fabricated historical RED run.

A subsequent generator change temporarily removed native Tailwind defaults because the appended Rain theme reset `--*: initial`. The suite caught six failures in `green-settled.log`: zero-height progress tracks and 16px unpadded tooltip text. The root repaired theme ordering, restored native utilities, and the final twelve-case run above passed. Those failure logs remain preserved.

Six live palette samples and computed colors are in `palette-*-1280.png` and `palette-facts.json`. The bar gradients now use blue/cyan neighboring colors, the stepped shape gradient stays within blue/purple/cyan, and each Pie gradient uses the same slice color at both stops with opacity variation. Pattern Pie glow is absent. The gray reference band (.2 stroke opacity) is visibly lighter; semantic white hatching at .8 in Funnel and Candlestick stays legible. Pattern CSS does not change data line strokes or dot geometry. Default and example palettes cover the marked default views; the existing explicitly selectable category-wide option can still produce its old warm colors.

Browser checks do not confirm Safari, VoiceOver, or user visual acceptance.
