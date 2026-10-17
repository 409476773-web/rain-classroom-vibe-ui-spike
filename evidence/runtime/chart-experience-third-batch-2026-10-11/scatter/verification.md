# Scatter third-batch verification

Scope: the original default Scatter page and all ten existing official variants. Normal data, IDs, palettes, axes, marker geometry and original public date/count API stay in the established scope. The private example reader gives one native date selector and complete raw values; no per-dot Tab stops are added.

## Current evidence

- `target-tests-final.log`: 28 targeted tests passed, including stable-date refresh, date removal, disabled interaction, pending RAF updates and cancellation. Prior RED logs and intermediate failures are preserved.
- `browser-after-06-final.log`: 10/10 fresh browser cases passed. Four width/motion combinations cover default five-series Scatter and all ten official variants (40 variant combinations). Dense fixtures have 96 unique consecutive dates; overlaps retain each date's raw series values and own-axis units. Returning to normal preserves the recorded native geometry.
- `browser/after-06-final`: tables, selectors, status readings, native pointer values, normal geometry comparisons and screenshots from the current preview. At narrow width, focusing the external update button may scroll the pointer outside the plot and trigger the existing mouse-leave clear; the evidence records that scroll and re-points to the same real date.
- Real CDP single-touch gesture on the actual default plot: page scroll advances from 0 to 113 px over a 96 px gesture, `touch-action: pan-y`, temporary reading cleared.
- Real CDP two-touch gestures against the public native ScatterChart and the real interaction hook in an evidence-only probe: selection expands from indices 0–1 to 0–2 horizontally, remains 0–2 through vertical movement, clears on touch end. Six pre-existing passive-listener preventDefault warnings were recorded; no page errors.
- `runtime-frozen-sha256.json`: the same four owned runtime files are frozen and unchanged across the final browser runs. UI and Playground type checks passed; the parent’s final complete workspace/tests `../typecheck-closeout.log` exited 0 after the parallel Live test fixes.

## Visual review and limits

Inspected current narrow default dense and wide dual-axis overlap screenshots: five count series remain visible with complete date readings; the dual axis keeps count and percentage labels and both readings. This is source/browser evidence, not user visual acceptance. Headless macOS native select popup keyboard choice did not change the selected option when ArrowDown/End/Enter was issued; selector focus and actual change events are verified, and physical native menu keyboard behavior remains unverified. Safari, VoiceOver, physical touch hardware, 200% zoom, contrast, performance, production publication and business migration are separate open gates.
