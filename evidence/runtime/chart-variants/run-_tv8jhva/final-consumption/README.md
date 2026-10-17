# Final frozen chart variant consumption

This snapshot is superseded for complete downloaded source by [the post-replay-fix run](../final-consumption-replay/README.md). It remains phase evidence; its original build result is preserved below.

On 2026-10-08 at 15:40:49–15:41:00 Asia/Shanghai, `node scripts/verify-chart-variant-consumption.mjs evidence/runtime/chart-variants/run-_tv8jhva/final-consumption` exited 0. The final isolated host is `/private/tmp/rain-chart-variants-consumer-wN4UBw`.

All 170 downloaded card entries across 16 families passed the host's TypeScript check (1,985 ms) and one Vite batch build (2,217 ms). The build audited 3,043 absolute module paths: all resolved inside the host. The 266 dependency links also resolve inside the host. Canonical source, package manifest, exporter, and Registry hash checks passed; `canonicalChanges` is empty.

The snapshot includes 2,299 current UI/Foundation source files and 123 copied installed dependency packages. Registry provenance records its 186 source file hashes. The UI fixture changes only its Foundations dependency from `workspace:*` to the copied `0.0.0` candidate. This consumes the complete current UI/Foundation source packages; it does not claim minimum Registry item installation or a clean install. The dependency cache, versions, source hashes, source exporter hash, exact commands, and per-entry file hashes are in [facts.json](facts.json).

Six entries build with captured settings: ready Area/Line loading examples, a selected Brush ISO date range, zero and long Pie states, and a long Ring state. Every raw download retains its original `index.html`; batch entries change only the main script URL to `/samples/<id>/main.tsx`.

[typecheck.log](typecheck.log) and [build.log](build.log) retain the fresh command output. Previous consumption snapshots are phase evidence and are superseded by this run. This verification does not establish browser behavior, Safari/VoiceOver, visual Human Gate acceptance, publication, or minimum Registry installation. Browser combination checks have separate evidence.
