# Matrix interaction refinement — 2026-10-09

Status: completed local technical delivery. This record does not grant visual review, contrast acceptance or publication.

User authorization: “确定。开始实施”, following two discussion rounds covering transparent readings, Bklit-style interaction, semantic legends, equal columns, area-plus-color bubbles and the relationship to calendar heatmaps.

Worktree: `/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`, existing dirty `codex/card-v2`; preserve unrelated work. System Mode unpublished candidate increment.

Plan: `docs/plans/2026-10-09-matrix-interaction-refinement.md`. Methods: V05 and I02. Matrix and calendar entries preserve their own axis semantics; reuse existing Bklit/Rain foundations without fake dates, a new engine or dependency.

## Baseline

See `browser-baseline.md`: normal headers yield unequal data columns, old readings use white plates, original entry finishes offscreen and sorting jumps. New interaction unit checks failed for absent tooltip, keyboard inspection and legend linkage before renderer edits. Encoding tests failed for constant bubble fill before their implementation.

## Implementation

- Equal-width native table data columns, independent 144px sticky row headings and contained horizontal scrolling. Stable row/column IDs retain data and animate positions after sorting.
- Quantity bubbles use area and five-stop Rain sequential color from the same fixed domain. Readings are white and transparent; measured glyphs are centered and shown only when their actual painted circle can contain them.
- Heat readings choose the clearer of the existing dark/light text roles against actual painted fill. Colors and radii transition for450ms. A finite500ms sample on paint-signature changes handles intermediate states; no permanent loop or per-frame React state updates.
- Existing Bklit spatial entry helper, CHART_SCALE_VARS and TooltipBox are reused. Entry begins in the viewport; adjacent-cell inspection retains the tooltip with120ms leave grace. Single scroll-region keyboard entry, arrow/Home/End/Escape controls, visible active cell and linked row/column/legend context.
- Continuous heat has an8px gradient with24px interactive hit area; quantity legends use bottom-aligned quarter/half/max samples. Level legends use equal dots and semantic names. Declared `heat.steps` validates and displays exact ordinal values; the semester example declares1–8.
- Matrix and calendar heatmap retain their distinct category/date contracts. No fake-date adapter, vendor modification or new dependency.

## Final checks

| Check | Current result | Evidence |
| --- | --- | --- |
| Scoped merged units, fixtures, exports, color consumers and shared motion contracts |194 tests /12 files passed after final source freeze |`merged-unit.log` |
| UI typecheck |passed |`ui-typecheck.log` |
| Playground and prototype type/build |both passed; existing large-chunk warnings retained |`playground-build.log`, `prototype-build.log` |
| Token outputs and generated chart utilities |consistent /1351 scanned candidates |`token-and-style-check.log`; token-generator result in tool record |
| Matrix Chromium regression |14 passed in38.9s |`browser/final-results/summary.md`, `playwright.log` |
| Registry and official variant isolation |18 registry closures checked;170 official entries type/build passed; canonicalChanges empty |`consumption/official-variants/facts.json` |
| Business/mini download isolation |21 entries type/build passed; exporter and copied source hashes unchanged |`consumption/facts.json`, `isolated-consumption-build.log` |
| Independent integration review |five boundary issues repaired; no remaining concrete blocker found |`independent-review.md` |
| Existing in-app-browser observations |five matrix fixtures rendered, six bubble columns exactly119px; visible bubble readings white/transparent; semester legend1–8; seven host states retained |`live-browser.md` |

The isolated check used the build/closure portion of the existing consumption verifier before its preview/browser phase. It copied the complete current UI/Foundations sources and installed dependency cache, rather than performing a clean installation or a minimum single-item installation.170 and21 are type/build entry counts, not additional browser acceptance counts. Matrix renderer and stylesheet bytes in the isolated host exactly matched final canonical sources; hashes are recorded in `final-source-hashes.json`.

## Browser findings

6×6 and12×12 data-column spread stayed below1px with normal/long headers;390px view contained horizontal scroll. Radius²/value ratio stayed proportional,35 distinct bubble colors had increasing depth/chroma. Entry and keyed sorting exposed intermediate geometry; reduced motion remained stable.

Additional red cases were captured before repair: pointer focus reset, offscreen first keyboard cell, fractional semester legend, growing bubble glyph overflow and heat tone switching ahead of painted fill. Final captures have zero overflowing bubble frames and zero materially incorrect heat-tone frames in both directions. First visible bubble glyph had1.997px minimum fit margin; a fitting54→57 glyph remained visible throughout. Heat updates sampled34/26 distinct painted fills. These observations verify transition behavior, not a sustained frame-rate target or global contrast ratio. The final14-case rerun records identical renderer, CSS, encoding and test hashes before/after in `browser/final-results/source-hashes.json`.

The old hover→keyboard test expected an erroneous reset to first cell. Its assertion was corrected to preserve the valid hovered coordinate; a separate fresh-focus test checks first-cell visibility. The optional CSS.supports fallback was repaired for non-browser test environments before final freeze. Earlier failing captures remain in `browser/review-baseline-results/`.

## Boundaries

Visual Human Gate: awaiting-user-review. Contrast acceptance: not-granted. Real Safari/VoiceOver/physical touch and larger-than-target matrices are not verified. No publication, Figma operation, business migration, Git commit/push/PR or P3–P5 implementation.
