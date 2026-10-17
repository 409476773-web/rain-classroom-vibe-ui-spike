# Final independent closeout review · 2026-10-06

**Pass for scope, provenance, result attribution and current documentation.** No additional correctness issue remains in the reviewed closeout bookkeeping or current driver corrections. The accepted runtime still has the explicitly retained R2 account-hover failure; Token and actual assistive-technology checks remain open. This review does not label the full project green.

## Independently verified results

[Coverage identity audit](coverage-identity-audit.json) independently flattens the original full browser run and each repair run by `projectId / file / full suite path / title`. Original737 identities remain; no duplicates, unknown repair identities or changed capture skips exist. All13 reported original unexpected failures have a later real passed result. The latest accepted-source result is **732 actual passed /1 unexpected account-hover failure /2 pre-existing declared expected failures /2 capture-only skips**. The two Radix expected failures remain genuinely failed and retain their original `test.fail` annotations; they are not counted as actual passes. Candidate runs are excluded from this737-case aggregate.

[Final scope audit](final-scope-audit.json) checks the raw1763-test unit result, the raw244-test final scope-guard result and all27 independent probes. It also verifies that the refreshed Token log preserves the exact earlier210-diagnostic block; it does not turn those diagnoses into a pass. Navigation authorization/acceptance SHA remains exactly `826ffd07b94f07e874fb1326a2301b3e4eecde98f54259b96f69628cce442212`.

[Candidate selector probe](candidate-selector-probe.json) passes7 static eligibility cases for the final V2 selector: enabled account matches; native-disabled, aria-disabled, disabled-fieldset descendant, nonbutton, other R2 region and other workspace do not. The selector stays within R2's global region, restores the exact existing neutral-alpha-6 declaration and adds no new Token/value or `!important`. The final scope audit independently reconstructs the one-line candidate from unchanged CSS and verifies its SHA `6c3145aa2efafcbe0f10414b9de69989d7e5aad09823b4b646c02715424d6ee1`.

The V2 raw browser report contains **14 real passed /0 failed /0 skipped**, exit0, separately from failed V1 and the accepted baseline. Main R2 CSS remains `c81cbfe619065408231f7ff039c4d235f3f0b221fb85e426f503037951eb1ae0`; the isolated CSS was restored to that same SHA. Both accepted review02 source/preview ZIPs match the explicit acceptance hashes. The97-source freeze has only the two previously documented guide differences, with0 product-source differences. Candidate adoption and new acceptance remain pending; its successful trial does not close the baseline failure.

## Driver and document checks

Current W5/W7 coordinate helpers include all ancestor scrollLeft/scrollTop, add document scrolling once and exclude `document.scrollingElement` from ancestor accumulation. The [nested-scroll probe](nested-scroll-coordinate-probe.json) preserves exact position equality after scrolling and still detects real7px/11px movement. The earlier G1 position-coverage finding is resolved by current exact compact/expanded Logo/header/toggle endpoint relationships; dimensions and bidirectional intermediate-width checks remain. Source-based E3 size38/minimum44 and region-specific R5 events32/18 versus knowledge32/14 assertions remain.

Canonical progress, task items, W7 report and designer table consistently distinguish actual pass, unexpected failure, declared expected failure and capture skip. They preserve scoped human acceptance, completed manual readability review, unproved automated color conformance, user-deferred actual Safari and VoiceOver without a valid speech result. Candidate V2's formerly stale pending-validation heading has been corrected. All40 local Markdown file links in the reviewed current documents resolve. Historical reports, failures and preparation statements remain separately labelled.

## Runnable review artifacts

From the Card V2 worktree root:

```sh
python3 evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/independent-review/coverage-identity-audit.py
node evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/independent-review/candidate-selector-probe.mjs
node evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/independent-review/final-scope-audit.mjs
```

All three final invocations exit0. The reviewer did not execute a browser/native OS run, edit application or canonical documents, adopt the candidate, change settings, or modify Tokens/accepted archives. Only independent-review evidence was written. Raw browser, native reader/restoration and global quality claims remain limited to their separately identified evidence and status.
