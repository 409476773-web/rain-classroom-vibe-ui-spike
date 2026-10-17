# Follow-up: brand geometry and the remaining account hover failure

Root's unified isolated targeted run reported 146 passed / 1 capture-only skip / 1 failed, exit 1. The remaining failure is `G1 review-02 interactive controls expose hover without changing disabled controls`, specifically `.nv42-account`; the exact parent JSON is retained as `followup-failures.json`. This agent did not start a server or browser run.

## Account root cause

The previous test sampled only the account button root and its nonexistent `[data-slot="label"]`. The follow-up also samples the standard Avatar root, picture frame, actual image opacity/clip-path/outline and account `strong`/`small` copy. It asserts that the element receives real `:hover`, keeps disabled paint completely unchanged, and retains the enabled-control paint-change assertion. Paint facts are written before each assertion so a failure preserves all preceding and current observations.

This broader measurement does **not** manufacture passing feedback. All four relevant files match the accepted review02 source ZIP byte-for-byte; see `followup-source-lineage.json`:

- R2 renders `button.nv42-account > span.rain-avatar` (`r2.tsx:68`, `avatar.tsx:37`).
- Shared `avatar.css:71–74` only paints `.rain-avatar:is(button,a)` and interactive collection strips. A parent button around an Avatar span matches neither rule.
- `platform-navigation.css:107–113` defines the account's geometry and normal copy paint; it has no account `:hover` rule. Its utility-hover rule at 120 expressly omits account.
- The exact lost rule exists in `w5/review-11-annotations-navigation/source-before/apps/playground/src/recipes/navigation-v042/r2.css:46`: `.nv42-account:hover,.nv42-history:hover {background:var(--rain-category-fill-neutral-alpha-6);}`. Current R2 CSS retains only course-link/history hover. Review11's platform extraction removed the account rule without replacing it.
- `review-02/README.md:25` explicitly reports account hover feedback. Review11's platform final report records native-button focus/Enter feedback and geometry, without an explicit decision to retire account hover feedback.

Conclusion: the remaining failure is a real hover-feedback gap in the accepted frozen runtime, not a sample-timing or descendant-owner mistake. Product changes are outside this agent's scope. The assertion remains in place; root must retain the open failure or separately authorize a minimal product repair and new runtime lineage.

## Accepted brand endpoint geometry

Review11 CSS at `platform-navigation.css:39–65` changed the header to a row in expanded mode and a reverse column in compact mode. Alongside retained 208/64 region width, mounted brand/Avatar, per-frame 23px glyph, opacity/display endpoints and bidirectional motion, the test now measures explicit endpoint relationships:

- Expanded logo aligns with header start; toggle aligns with header end; their vertical centers coincide.
- Compact logo and toggle have the same horizontal center; brand follows the toggle with the exact accepted 10px gap.

These use real rectangles and exact layout relationships. The old frame-Y movement threshold is not restored. Root's rerun must validate the added endpoint assertions.

Local verification is discovery/parse only; current command/output and final hashes are in `after.json` and `test-list.log`. The 14 test titles remain unchanged.
