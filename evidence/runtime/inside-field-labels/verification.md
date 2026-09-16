# Inside field labels verification

Current visual gate: accepted by explicit user confirmation “确定，没问题。” on2026-09-14, limited to [inside-label runtime visuals](visual-acceptance.md). Contrast/eligibility findings remain pending independently.

Latest: the user requested lighter inside titles after reviewing the20:18 screenshot. The current color is Text/Neutral/4; see [lighter-color verification](lighter-color/verification.md) for current measurements and pending findings. The Text/Neutral/3 measurements and clean technical review below retain the initial implementation history.

Scope: explicit user instruction “开始实施” after confirming optional fixed inside labels for Input, SearchInput and Select. This is a separate follow-up to RN-08, in System Mode with local toolbar consumers. Earlier accepted component visuals do not accept this batch.

## Implementation contract

- FormItem owns `labelPosition: top | inside`, defaulting to top, and one shared field/label identity. Input and Select consume the same internal label helper; SearchInput reuses Input.
- The title stays visible after filling, choosing or clearing. The fixed label is a label Part, not a placeholder, editable value or extra focus stop. Complete names remain accessible when visually truncated.
- The inside label and its required marker use existing Text/Neutral/3. Disabled content inherits the existing frame Text/Neutral/6. Required native/ARIA semantics remain in place. The prior top-label red required marker is unchanged.
- The sole new native geometry rule is `.rain-field-label { max-width: 50%; }`, preserving room for values. Its exact selector/declaration and independent authorization are checked, including rejection of additional state/media rules.
- Local toolbar controls use existing complete sizes: default32 and compact28. Both query and status FormItems opt into inside labels; status width grows from160px to200px to fit its title and “全部状态”. Input and Select documentation include32px examples. Existing multiple summary/count behavior supplies a single line; in-frame searching and multiline labels are outside this batch. No global size, field appearance, Token value or dependency changes are authorized.

## Governance and preserved history

`before/source-lock.json` locks the exact prior phase and six existing shared files, including the two changed component tests. Copies retain their original bytes under `before/`. RN-06 and RN-08 historical checks still compare the six old byte snapshots against their original frozen hashes; all other prior shared files are checked live as before. Historical baselines were not regenerated.

The new `tableRn08.insideFieldLabels` record has exact scope, filename inventory, label options/color, toolbar sizes and non-authorization fields. Invalid scope, changed defaults/Token/size, extra files, extra permissions or accepted visual/contrast gates are rejected. Two new E2E files are admitted only with this separate authorization. Input, SearchInput, Select and FormItem manifests keep their prior gate records and carry an independent batch record matching the phase.

## Color measurements

`color-measurements.json` covers 24 shared field recipes: outlined/filled/underlined × default, hover, editing, readonly, readonly-focus, warning, error and disabled. Each is measured in light/dark on Background/Neutral/1 and 3: 84 enabled combinations and 12 disabled combinations. Both Input and Select use these actual shared frame paints; SearchInput delegates to Input.

Enabled labels and inside required markers retain critical, interactive text roles and the full 4.5:1 threshold. The minimum measured contrast is **5.303135284188071:1**, in light underlined error on Background/Neutral/3. Disabled uses the existing disabled role. New pending contrast findings: 0; new eligibility findings: 0; new accepted exceptions: 0. Existing findings for other parts and batches remain unchanged and unaccepted.

## Runtime checks

The actual table recipe places “查找资料”, “发布状态”, search, select and view actions in one control row. Chromium, Firefox and WebKit check both themes and densities: frame tops/bottoms align at32px default and28px compact. Prior table header/body heights, Alpha5 hover and the confirmed Pagination behavior remain covered. The independent prototype consumes the same public components and recipe.

The inside-label suite covers outlined/filled/underlined,28px/32px, Input/SearchInput and Select single/multiple, searchable popup, summary/count, native label activation, clearing, required/help naming, readonly/disabled guards and keyboard focus. Existing top labels and tags remain covered. At320px, long titles truncate while preserving their full accessible names and75–99px of value area; no page overflow. Six engine/theme measurement files contain204 records. Runtime console/page errors and development overlays are checked.

Browser screenshots and measurements remain under `/tmp/rain-inside-label-browser/{chromium,firefox,webkit}/` (light/dark matrix, narrow320 and measurement files), with real Table screenshots under `/tmp/rain-inside-label-table/`. Visual inspection included the Chromium light matrix, dark320px long titles, Chromium light default Table and Firefox dark compact Table. Browser checks use development server5198 and the suite's prototype5199; production builds are verified separately. No Browser plugin was available; existing Playwright supplied evidence without new dependencies.

## Checks

- Targeted governance tests: 4 files / 23 tests passed (`governance-unit.log`), covering exact authorization, source preservation, old Input/Select contracts and new color roles.
- Full `pnpm verify:governance`: passed (`governance.log`). Lockfile, workspace, evidence, complete source boundaries, Tailwind B2 and Token consumers passed.
- New component behavior red step:6 failed /55 passed against the old implementation (`unit-red.log`); the missing inside labels triggered the expected failures.
- Final Input/Select tests:2 files,61/61 passed (`unit-green.log`), including8 new cases. The broader component families, documentation pages and local recipe passed8 files,101/101 (`family-unit.log`); this overlaps61 above and is not summed.
- Full three-engine Table suite:15/15 passed, zero retries,34.8s (`table-browser.log`), including filtering, sorting, pagination/capacity/jump/totals, selection, loading/failure/retry, empty states, keyboard, theme/density, narrow layout and the independent prototype.
- Inside-label suite: all6 engine/theme cases passed across two runs. Chromium/Firefox4 cases passed in `inside-browser-initial.log`; its two WebKit cases failed on a Tab-only expectation. After adapting traversal to native macOS Option+Tab, WebKit2/2 passed in9.1s (`inside-browser-webkit.log`). The initial log is retained and is not represented as a single6/6 green run.
- Full typecheck: passed, including tests (`typecheck.log`). Production build: passed (`build.log`), with the existing large-chunk warning.
- Independent review: passed, no unresolved P1/P2; independently verified61/61 Input/Select and10/10 Table/Layout governance tests. See [independent-review.md](independent-review.md).
- Diff whitespace check: passed.

Test corrections followed actual behavior: the isolated React fixture uses its own ID prefix; single Select does not receive a multiple-only display mode. Nonsearchable Select may focus the popup itself, while searchable Select focuses its search input asynchronously; assertions now wait for those targets. Disabled/readonly label activation bypasses Playwright's disabled-control retargeting and then checks that native activation is ignored. These corrections changed test assumptions, not product interactions.

## Separate gates

Implementation: completed. Automated verification: passed. Independent review: passed. Human Gate: awaiting_human. Contrast acceptance: not-granted. Publication, Figma writes, business migration, Git commit/push: not authorized.
