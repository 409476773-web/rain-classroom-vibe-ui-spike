# Independent engineering closeout review · 2026-10-06

Current result: no remaining concrete correctness issue found in the reviewed governance/history, finite Navigation consumer registration, Tabs paint routing projection, layout import projection, or M1/M2 guide exports. This is a read-only source review plus deterministic temporary fixtures. No UI, Tokens, settings, Figma, Git or publication state was changed by this reviewer. Only this evidence directory was written under the parent task's explicit request.

## Runnable evidence

From the Card V2 worktree root:

```sh
node evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/independent-review/independent-probes.mjs
node evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/independent-review/browser-successor-provenance.mjs
```

Both final invocations exit 0. [Independent probes](independent-probes.json) records 27/27 passing assertions and the reviewed source SHA-256 values. [Browser successor provenance](browser-successor-provenance.json) records accepted-archive/source-freeze integrity, exact before/after browser-contract hashes, each historical source, and the corrected synchronization probe.

## Guard and export checks

The exact current phase passes. Mutation of frozen B2 history, accepted Navigation scope, Git permission, accepted human decision, an unknown Navigation permission key, or an unknown top-level permission rejects.

The exact finite Navigation registration passes at an independent temporary root: 18 sources, 1,295 CSS paint occurrences, 312 bindings, 810 unresolved paints and automated conformance `unproved`. The reviewer separately modified the ledger threshold text, inventory bytes, authored raw paint, CSS directive, human-review bytes and source-freeze bytes; every mutation rejects. Metadata registration retains unresolved findings and does not assert automatic color conformance.

The actual Tabs successor passes only against the requested valid phase. Wrong label paint, false measurement, duplicate projection fragment, unknown navigation wrapper and unknown requested-root permission reject. The existing Workspace import passes; duplicate import, unknown import, newly added Layout paint and changed Navigation scope reject. No actual guard bypass was reproduced.

Fresh M1 and M2 exports each retain source-lock integrity, traverse eight reachable Markdown files and check 36 local links with zero missing references. Source guides remain separate from the clearly identified export-local optional-case trace text.

## Historical browser successor provenance

- **Review08:** Review11's recorded R4–R6 implementation explicitly documents Knowledge32/14. The independently read accepted review02 ZIP contains `<RegionHead id="knowledge" iconButtonSize="32/14"/>`, while its shared RegionHead default remains32/18. The ZIP SHA and extracted r4-r6.tsx SHA both match the acceptance/source-freeze record.
- **Review09:** The recorded Review09 contract says Tooltip supports hover, focus and Escape; the shared Tooltip contract says Escape, Tab and blur dismiss. Accepted ZIP Tooltip implementation bytes match the current shared implementation. A Tab then Shift+Tab sequence creates real keyboard blur/refocus after Escape; `focus()` on the already focused trigger does not create a new focus event. No expected visual value was read from current browser output.
- **Review10:** The accepted review02 ZIP independently contains `variant={errors?'primary':'tertiary'}` with the errors practice action. Its extracted r1-r3.tsx SHA matches the accepted source freeze. The existing6px radius check stays unchanged.
- **Review11:** The earlier Review12 scope and source.diff explicitly record the user's glyph20→18 instruction and Normal splitter opacity.4. These later historical decisions justify updating the older20px/hidden-normal browser expectations; hover, drag, focus and exact existing geometry assertions are preserved.

## One synchronization issue found and corrected

The first Review11 synchronization addition polled `Math.round(width)` against64/208. A deterministic counterexample proves premature acceptance: width207.75 rounds to208 (and64.25 rounds to64), yet the unchanged strict width assertion rejects either intermediate value. The accepted R2 CSS independently includes a native width/flex-basis transition, so a rounded endpoint check does not establish transition completion.

The parent corrected tests/e2e/navigation-v042-review11-platform.spec.ts:16 to poll raw `boundingBox().width` against the existing64/208 endpoints. The provenance script verifies that exact source and rejects deleting the endpoint poll as a supposed fix. Both numerical counterexamples and the current exact-source SHA remain in browser-successor-provenance.json. The successor record retains intermediate/full-browser-started hashes separately; this reviewer does not claim that a browser run started with the rounded version tested the final exact version.

## Limits

No browser or native OS control was run by this reviewer. Full browser execution, the separate final Review11 follow-up execution, global quality, actual Safari/VoiceOver, publication and migration are owned and reported separately by the parent task. The passing27 deterministic assertions and provenance verification do not close those dimensions.
