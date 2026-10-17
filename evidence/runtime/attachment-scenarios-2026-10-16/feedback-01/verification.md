# Attachment neutral actions and two-line feedback — 2026-10-16

Applied the user's four screenshots to the current attachment workflow candidate. Download, more and draft remove IconButtons now use the existing neutral highlight=none contract, including the two equivalent legacy demo buttons. The IconButton master, Tokens, format icons and upload/resource engines are unchanged.

Download preparation, initiated-download notice, errors, permission/availability reasons and replacement context share the metadata line beneath the filename. They no longer add supplementary paragraphs or a third line. Operation feedback temporarily replaces the visible size. Long content ellipsizes; the full size, all simultaneous reasons and replacement candidate context remain available in title and More → File information. Existing alert/status roles remain in the row. Compact errors remain visible in narrow containers.

Fresh validation:

- 266 tests in 13 related test files passed. The new cases cover pending/initiated feedback, compact removal error visibility, and preservation of simultaneous resource/permission/replacement details. RED then GREEN logs are retained for both corrections.
- 6 Chromium browser cases passed at 1440×1000 and 360×900. They check download preparation/success/failure, real browser download events, upload failure, neutral button colors in light/dark and hover, filled modal/media download geometry, compact cancellation/retry, full details and menu focus restoration.
- UI, Playground and test-source type checks plus the Playground build each exited 0.
- The actual in-app browser's modal row measured 56px before and after downloading; its metadata remained 20px. Download/more icons both used highlight=none and computed rgb(73, 93, 135), the existing light neutral icon token. Compact upload/cancel/retry rows measured 40px in both browser widths. Media cards kept their existing height.

The native screenshot is `screenshots/filled-download-context.png`; `screenshots/comparison.png` pairs the user's fourth screenshot with the actual rendered first row. The user crop's scale/density is not treated as a pixel metric. Test screenshots are under browser/results. The live dialog retains the initiated-download state for inspection.

The first browser setup run failed four assertions because the color helper assumed hex while Tokens return rgb syntax; a matcher also used the unit-testing spelling. These test setup issues were corrected; the archived attempt remains in browser-setup-attempt and the current report has no unexpected, flaky or skipped cases.

Independent review found a P2 where full details lost lower-priority simultaneous reasons. The failing test, implementation correction and read-only confirmation are recorded in tests/details-red.log and independent-review.md. There are no remaining scoped P1/P2 findings.

The new source bindings refer to the sealed predecessor by its original hash and retain before copies. Registry/manifest point to this current feedback increment. The status change only appends scenarioImplementation.actionFeedback. Previous reports describe their historical snapshot and are not rerun or re-signed against changed files. The five checks in verify.mjs cover preservation, dependency/lifecycle scope, source/evidence bindings, fresh tests/dimensions and the generated asset index.

This is local implementation QA. User visual acceptance remains awaiting_human, contrast remains not-granted and publication remains unpublished. Safari, VoiceOver, physical touch and production services were not newly validated. No Figma, release or Git operation was performed.
