# Chart closeout: limited theme and keyboard evidence

36 unique representative paths passed in Chromium: nine behavior paths × widths 1440 and 390 × explicit Rain dark theme or active forced colors. This is automated keyboard and rendered-semantic evidence; real Safari, VoiceOver, physical touch and user visual acceptance remain separate.

Accepted evidence is **32 retained observations + four replacement Brush paths from run-07-brush-final**: 28 non-Brush observations from run-02, Network narrow two from run-04-network, Matrix forced-color two from run-06-matrix, and new Brush dark/forced-color paths at both widths. The former Brush observations and run-05 Matrix failures remain history. The total is 36, not 40. `summary.json` identifies the exact facts, screenshot and executed spec snapshot for each accepted path. The prior summary and README are preserved as `summary-before-brush.json` and `README-before-brush.md`.

Each run captured 242 runtime/source-support files and has no before/after changes. The 32 retained observations keep the earlier source JSON SHA256 `a788bb487571235988836ccf15f66e665c80a2096fb7e0d3c096cecc5e67dc73`. The four replacement Brush paths use current source JSON SHA256 `57532a1de1968c02b95d8acff6d55590ae93be2704acddafdf6f0a69620d9ace`. All 242 current hashes match the corresponding source subset of [the three-engine Brush12 run](brush-next/README.md). Styles remain SHA256 `83e41f10f6e4bed4c50978f6e4de9a9c443e9cb0916f4237aadbb740e80cdd35`.

This is the root-authorized affected-scope replacement, **not a fresh full 36-path run on one latest source hash**. The summary records the five prior/current source differences, including Sunburst focus props, Brush/public type changes and source-lock metadata. The parent/root separately reviews and verifies the native/Sunburst changes; this directory does not upgrade those observations to a new full theme run. No runtime file was changed by this private verification task. All current browser resources are closed.

Each run's `spec-executed.ts` matches its recorded spec SHA. Retained results describe their actual snapshot; they are not claimed to have executed the later full private script. Final private script SHA256 is `cae8bb3b9124c2f8694fe09637081ad0af72eaf858474d6e3aeef65aef8f1b96`. The four replacement paths run that same final script without weakened assertions. Final private TypeScript check passed with exit 0 (`typecheck-07-final.log`).

Representative actions and assertions:

- Line legend Enter preserves the raw table; Brush ArrowRight selects 29 rows, and keyboard reset restores 30 rows.
- Ring legend reads the exact selected value and percentage; Escape clears transient feedback and Space restores the same reading with focus retained.
- Heatmap daily keyboard navigation distinguishes missing and zero data; the alternative native SVG focus rectangle has nonzero geometry and 2px stroke. Grade actions retain focus.
- Matrix Control+End reveals course-12 × course-12 inside its own horizontal region, the status matches that cell's exact value, ArrowLeft changes to course-11, and Escape clears the active cell while retaining region focus. The forced-color active cell's outline is visible.
- Sunburst Enter and Space drill into the current course; returning restores the original focus target.
- Network node-list Enter selects the matching node and details. At 390px the existing responsive contract deliberately hides the SVG and shows all relationship text; list count matches the edges and each reading retains its direction and relation. Wide paths use the actual diagram SVG.
- China picker Enter drills to Zhejiang and selects Hangzhou; Escape restores picker focus while retaining the selected detail. Exact-data horizontal scrolling remains local.
- Live keyboard pause freezes the exact table and line path, manual append increases the count by one, and replay preserves points and paused state.
- Candle uses actual browser End+Enter on the native date selector and retains the flat sample's OHLC/direction reading. No programmatic date-value shortcut is used.

Focus assertions retain the existing contracts. The shared chart/Foundation controls checked with their rule use solid 2px CanvasText and no shadow in forced colors. Native range inputs have a visible native auto 1px outline; Matrix's scroll entry has its existing solid 1px outline. These two use valid, nontransparent colors whose composited values differ from the actual system Canvas and preserve keyboard operation. Matrix's measured outline composite contrast against system Canvas is 11.2993; this calculation covers that plain outline only. The existing Heatmap SVG rectangle provides its focus alternative. No CSS was added to force every control into the same outline rule.

Historical RED evidence is preserved:

- run-01: ignored top-level Playwright media settings, icon SVG selection, intentional Heatmap focus alternative and animation/pointer interference were harness errors; this run is excluded from coverage.
- run-02: four incorrect universal solid-2px assertions and two narrow Network icon selections. Its 28 non-Brush passing observations remain accepted; its two older passing Brush observations are replaced by run-07-brush-final.
- run-03-network: the precise SVG locator exposed the existing narrow layout; requiring that hidden SVG to be visible was incorrect.
- run-05-focus: requiring Matrix's valid Token-colored outline to equal CanvasText was incorrect. Its two older passing Brush observations are retained history and replaced by run-07-brush-final.

Computed axis/legend/permanent-reading foreground or SVG fill, opacity and ancestor background chains are saved in facts. They are measurements, not blanket graphic, gradient, translucent background, all-text contrast or WCAG certification. Native control screenshots were inspected for the narrow Matrix and Network forced-color outcomes. Keyboard modality uses a real Tab before focusing the specific representative target; this does not prove a complete sequential tab order. Reduced motion is explicit for stable geometry, except Live intentionally exercises ordinary time.

Private reproduction (write to a fresh run directory; do not overwrite history):

```sh
RAIN_EXPECT_STYLE_SHA=83e41f10f6e4bed4c50978f6e4de9a9c443e9cb0916f4237aadbb740e80cdd35 node evidence/runtime/chart-closeout-2026-10-11/quality/themes/run.mjs evidence/runtime/chart-closeout-2026-10-11/quality/themes/FRESH-RUN
pnpm exec tsc --noEmit --project evidence/runtime/chart-closeout-2026-10-11/quality/themes/tsconfig.json
node evidence/runtime/chart-closeout-2026-10-11/quality/themes/summarize.mjs
```

`config.ts` contains the four media/width projects, and `themes.spec.ts` explicitly verifies actual forced-color media and the Rain theme. This directory owns only private evidence and verification scripts.
