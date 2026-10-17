# Third-batch independent real-download verification

Current result: PASS in `run-02/facts.json`; final post-review SHA comparison is in `final-verification-summary.json`. This extends the parent’s complete 170 official-variant consumer evidence, reusing its copied dependency cache and full UI/Foundations package snapshot. It does not replace the official 170 result or certify a clean/minimum Registry installation.

## Scope and provenance

Fourteen download sets: default Scatter dense/overlap with all five count series; default ProfitLoss near-zero/zero-run; default Candlestick dense/flat; default Live paused; official Scatter dual-axis overlap and small-dot dense; official Line ProfitLoss near-zero; official Candlestick pattern flat, solid dense and invalid-OHLC; official Live default paused.

`capture-live.mjs` paused each actual playground Live host and used Enter on “追加一次”. Its real data-URI downloads captured 62 default points and 61 official points, Unix-second time values and current frozenNow. `default-actual-main.tsx` and `live-line-default-actual-main.tsx` match their current exporter results byte for byte. All non-entry download files match current canonical example sources. Only the generated batch HTML prefixes the actual main URL and loads the existing isolated host’s Tailwind integration. Raw downloaded main.tsx/index.html stay unchanged.

The evidence-only build plugin transparently saves the existing createRoot return value for the two Live entries so the browser can invoke the actual root.unmount(). This insertion does not alter App inputs, renderer code or product sources; `rootCaptureInstrumentation` records its original main hashes and exact scope. It prevents confusing page/context disposal with React cleanup.

## Closed build and browser evidence

- All 19 current Registry item closures pass.
- The 14 real download closures compile and build successfully with the host’s copied dependencies.
- 2168 build modules resolve entirely inside the isolated host: zero outside paths and zero aliases.
- 32 current built-page checks pass: all 14 at 1440/reduced motion and 390/ordinary motion, plus both Live downloads at 1440/ordinary and 390/reduced motion. The served HTML SHA matches the built output for every check.
- Exact tables equal the actual downloaded data functions, including five independent Scatter count series, dual-axis percentage units, 96 distinct dense dates, ±0.001 and ±0.004 ProfitLoss values, consecutive valid zero values, Candlestick OHLC relations and flat direction. Native date selectors retain one focusable reading surface and full raw values; normal fixture restoration and default revision updates read current data. The invalid official OHLC state draws no Candlestick and returns to normal through its existing selector.
- All eight Live mode/width combinations verify the actual captured points and frozen axes/paths after a 65-second virtual-clock advance, keyboard manual append, explicit user pause across motion restoration, plot-only offscreen pause while the table remains visible, simulated background visibility pause, automatic/motion restoration, one mock producer and one owned native animation frame while running, and actual React root.unmount() cleanup. Producer/owned-frame counts are zero when paused; observers and visibility listeners are also zero after unmount.
- Zero page errors, failed requests, HTTP errors or external browser origins. Final canonical, host and evidence-script SHA changes are zero.

## Visual inspection and limits

Inspected current 390 px near-zero ProfitLoss, 1440 px pattern flat Candlestick and 390 px running default Live images: small signed values and zero axis labels remain legible; flat candle bodies are visible horizontal marks with the original pattern/green/red lineage; Live geometry and its time/value axes remain finite at narrow width. Scatter’s dedicated current verification also inspects dense five-series and dual-axis overlap views. User visual acceptance remains a separate gate.

The initial `run-01` stopped because the evidence assertion treated the prefix of −0.004 as a rounded −0.00 string; no product error or source change was involved. `run-02` corrects that assertion and retains its two already-passed identical-source checks, with the remaining 30 checked in the current run. Counts are not accumulated across runs. Its exact sources were compared again after screenshot inspection.

This is Chromium evidence with emulated width/media and Playwright clock. Background is simulated through document.hidden/visibilitychange, not an OS window-background event. Native select focus and actual selection changes are verified; the headless macOS native popup’s physical ArrowDown/End/Enter choice remains unverified. Safari, VoiceOver, physical touch hardware, 200% zoom, contrast, performance, visual Human Gate, production publication and business migration remain separate open gates. The standalone Live producer is Mock; no real connection/reconnection or arbitrary-input guarantee is claimed.


## Current peer-review supplement

After this 32-case run, independent review found the default parent page retained old Live points through notice states. The parent’s two state/revision handlers and target lifecycle test were repaired. `live-state-roundtrip/verification.md`, `facts.json`, `phase-scope-shas.json` and `verification-summary.json` provide the current supplemental evidence: four actual parent-page width/motion cases with empty/invalid/missing→zero/single and empty+revision→normal, plus actual zero/single/revision-normal download closure/type/build/browser observations within those same cases. The current count is the preserved 32 plus four new cases (36), not a sum of host observations or repeated attempts. The old 14/170 downloads, package/exporter/Registry bytes and old host inputs remain unchanged. This file and the new supplement explain current scope; old run-02 facts remain unchanged historical evidence and did not include ChartPage.
