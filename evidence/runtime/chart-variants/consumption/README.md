# Chart variant isolated consumption

Run `node scripts/verify-chart-variant-consumption.mjs` from this worktree. An optional first argument chooses the evidence directory. Each run leaves its independent host under `/private/tmp/rain-chart-variants-consumer-*` and writes timestamped facts, type-check output, and build output here.

The verifier evaluates the actual `chartVariantFiles` exporter and saves all 170 downloaded file sets. It copies the complete current UI and Foundations source packages, including the public Button and icon dependencies, plus the already installed dependency cache into the host. It preserves actual resolved versions and peer dependency paths with host-internal links. This is a full candidate package consumption check; it is not a minimum Registry item installation and not a clean install. The Registry candidate manifest and its source file hashes are recorded for provenance.

The host has no workspace aliases or external dependency links. Its own TypeScript checks every downloaded entry. Its own Vite builds the 170 HTML entries in one batch; the module audit rejects any resolved absolute module path outside the host. Raw per-card `index.html` files are retained; batch HTML changes only the main entry URL to `/samples/<id>/main.tsx`. The verifier also rejects any canonical source, Registry manifest, or exporter change during the run.

The final verifier records each entry's parameters. It exercises captured zero/long Pie states, a long Ring state, ready Area/Line loading examples, and a selected Brush date range; all remaining entries use the default settings. UI/Foundation canonical and copied package manifests are hashed as well as their source files, and canonical package configuration changes also fail the frozen-source check.

The `2026-10-08T07-03-29.284Z` preparation run failed because the host compiler did not allow the existing Foundation `.ts` imports. The host configuration now permits those imports. The `2026-10-08T07-05-01.309Z` phase snapshot then passed type checking and built all 170 entries in 16 families, with 3,043 audited modules and zero outside paths. Its later `canonical-current.json` records subsequent canonical edits, so this snapshot is phase evidence only.

The [final frozen-source run](../run-_tv8jhva/final-consumption/README.md) on 2026-10-08 at 15:40:49–15:41:00 Asia/Shanghai passed all 170 entries and all package/source/Registry/exporter consistency checks. It supersedes the earlier phase snapshots.

After browser operations exposed and corrected Live replay timestamp reseeding, the [post-replay-fix run](../run-_tv8jhva/final-consumption-replay/README.md) passed all 170 entries again at 15:54:36–15:54:52. This is the latest complete downloaded source snapshot; prior runs remain phase evidence.

These checks do not establish browser behavior, visual or accessibility acceptance, publication, or minimum Registry installation. Those have separate evidence.
