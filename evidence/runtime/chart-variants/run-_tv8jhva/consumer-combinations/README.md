# New isolated consumer combinations

Final result: [run-2026-10-08T07-46-56.477Z/report.json](./run-2026-10-08T07-46-56.477Z/report.json), passed. Typecheck and the two-entry production build exited 0. All 1,984 bundled module paths remain inside the isolated host. Browser checks at 1440px and 390px reported no page overflow, duplicate SVG IDs, missing SVG references, or browser errors. Copied source hashes matched the canonical files before and after execution (`sourceStable: true`).

The first combination places 3D stacked bars and a reference band in the same chart, alongside a 60-point dense bar/reference chart and the downloaded 3D-stacked renderer. Replacing data changes actual bar height and its precise table/tooltip; changing the registered recipe changes the computed fill. Zero state retains the reference band and renders zero-height bars.

The second combination uses two independent downloaded Brush renderers, two patterned calendars, a horizontally scrolled annual calendar, and hierarchy analysis. Pointer and keyboard selection change the first Brush while the second retains its own range. Replacing data preserves that selection. The calendar reads the correct final date/value after scrolling. Initial captured loading and hierarchy-focus settings remain interactive: loading toggles ready/loading/ready, and hierarchy returns to the root and drills again. Pause and narrow-screen checks retain the choices.

Reproduction from the workspace root:

```sh
node scripts/verify-chart-consumer-combinations.mjs /private/tmp/rain-chart-variants-consumer-wN4UBw evidence/runtime/chart-variants/run-_tv8jhva/consumer-combinations 5185
```

Each subsequent run creates its own timestamped directory. The preview service is stopped at the end. This validates the audited production build against a host using copied installed dependency caches and full local UI/Foundations source packages. It does not establish a clean install, a dev-optimizer pass, minimum Registry installation, publication, or user visual acceptance.

## Attempt history

[history.json](./history.json) links three real failed attempts. Their captured tool output has been restored under `attempts/`: temporary host JSX syntax, React CommonJS dev preprocessing, and a resize check taken before responsive measurements settled. The original report files were overwritten during iteration; the restored records explicitly state this provenance and do not claim unavailable original timestamps or full original reports. The first successful run remains in `captured-pass-074315/`; later successful runs remain in their individual timestamped directories.
