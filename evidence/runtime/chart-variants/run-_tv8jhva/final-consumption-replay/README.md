# Final isolated consumption after the Live replay fix

On 2026-10-08 at 15:54:36–15:54:52 Asia/Shanghai, `node scripts/verify-chart-variant-consumption.mjs evidence/runtime/chart-variants/run-_tv8jhva/final-consumption-replay` exited 0. The isolated host is `/private/tmp/rain-chart-variants-consumer-vo6aKc`.

All 170 downloaded entries passed the host's TypeScript check (5,226 ms) and Vite batch build (2,340 ms). The 3,043 absolute module paths and 266 dependency links resolve entirely inside the host. Canonical source/package configuration, Registry, and exporter consistency checks passed with `canonicalChanges: []`. Six entries use captured ready/zero/long/Brush settings; per-entry parameters and hashes are in [facts.json](facts.json). Fresh outputs are in [typecheck.log](typecheck.log) and [build.log](build.log).

This run supersedes `../final-consumption` for the complete downloaded source snapshot: the later Live fix preserves data and its clock when replaying. The earlier snapshot remains readable phase evidence. Native chart source hashes did not change for this fix.

The fixture copies complete current UI/Foundation source packages and the existing installed dependency cache. It is not a clean install or minimum Registry item installation. Type checking and builds do not establish browser behavior, Safari/VoiceOver, visual Human Gate acceptance, or publication. [Per-card browser operations](../final-operations/README.md) and combination checks have separate evidence.
