# Legacy Layout / Dialog test repair · 2026-10-06

Both owned suites pass: 7/7 tests, 7.24s; direct type check passes. The original baseline was 3/6 passed, 3 failed. Original scope, metadata, geometry, color, upstream, dependency and lockfile assertions remain, including both root-added Layout import counterexamples.

Historical phase equality now compares the genuine sealed RN06 before/after snapshots, rather than deleting a stale subset of later fields from the current phase. The full live phase validator remains mandatory, with unknown top-level/component successors and frozen history mutations rejected.

Protection checks still cover every original 1,925 Layout and 1,915 Dialog source. The actual RN15-preserved RN14 snapshot (`rn14-90fc74205a764fb1`, archive SHA `81ed247e9e3c57bf9edd94ace9bea30487557ab5404c26570aa8ea055c7f900e`) supplies 1,921/1,913 files. A fixed set of four/two pre-existing card/course consumer files was not included in this BM-A/B starter and stays under strict original live checksums; there is no failure-dependent fallback. Exact baseline and RN15 transition record hashes are preserved. Unknown source additions, missing transitions and missing RN15 authorization reject.

Only the two test files changed. The shared matcher/helper, production UI/Tokens and frozen evidence remain unchanged. No browser was run. This validates a labelled historical checkpoint; current source conformance remains a separate root verification.

Evidence: `baseline.log/results`, `check-01.log/results`, `check-02.log/results`, `typecheck-final.log`, `task-only.diff`, `protection-before.json`, and `summary.json`. Intermediate test URL/TypeScript invocation errors remain recorded.
