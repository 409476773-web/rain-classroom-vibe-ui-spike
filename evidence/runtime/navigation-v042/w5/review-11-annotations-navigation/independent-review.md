# Review11 independent source and evidence review

Reviewed the live AGENTS, Spike scope, current continuation state, prototype/information/icon guidance, the 46-annotation index, and the production changes against `source-before`. The existing dirty HEAD diff was not used as the change boundary. This review does not advance G2/G3, contrast, assistive-technology, publication, migration or Git status.

Final independent status: passed for the reviewed scope. The two initial findings and the follow-up account-size defect are resolved and independently verified below. No unresolved actionable finding remains in this review.

## Actionable findings

### P2 — Expanded R4-family platform footer reverses the R2 structure

Location: `apps/playground/src/recipes/navigation-v042/r4-r6.tsx:81`, with shared local footer presentation at `platform-navigation.css:102`.

The new footer renders notification, help, then account. Expanded CSS retains DOM order. The current R4 expanded rail therefore places the two tools on the left and the account on the right; R2 places the account on the left and the grouped tools on the right. The mismatch also reaches R5/R6 and their S3/S4/S6 consumers. It conflicts with the explicit cross-page R2 structure requirement. The two rendered rail screenshots in `platform/after-2026-10-03T17-09-16-312Z/R4-1440-light-expanded-rail.png` and `R2-1440-light-expanded-rail.png` were opened and visually compared. The later R4 consumer handler-only change does not alter this footer DOM or CSS.

Place the account before the grouped utility controls in the feature-local footer; retain utility-before-account compact ordering. Verify relative x positions in expanded mode and relative y positions in compact mode, across light/dark and the inherited consumers.

### P2 — New account copy does not share the R2 account interaction target

Locations: `apps/playground/src/recipes/navigation-v042/r1-r3.tsx:52` and `r4-r6.tsx:81`.

R2 and S5 expose one named account button containing the portrait, name and caption. R1/R3 add that appearance as a non-interactive div, so their S1/S2 consumers have no corresponding account keyboard entry. R4-family pages keep the named 32px portrait button but put the newly added name and caption outside it. This leaves different keyboard/click targets inside the supposedly unified platform footer. The task's requested interaction consistency can remain a local mock entry; it does not require identity-service integration. Use the existing named whole-account button structure, preserve each page's local feedback, and retain a visible focus state through existing Rain focus tokens.

## Checks without additional findings

- The annotation changes remain local: existing typography/category/color roles, existing Checkbox and Tag, public string descriptions and ReactNode metadata slots. No shared API widening is present in these source diffs.
- White-only gradient/indicator/count rules and Connections direction cues are narrowly scoped. Existing semantic selection and focus behavior remains owned by existing controls.
- R4 queue/discussion changes do not match grading business composition; the default recovery appearance change has the explicitly recorded shared consumer scope.
- R5 retains the native 16px Checkbox control and its label; the 68px footer removes only the requested helper. Knowledge actions retain 32px targets while using 14px icons.
- Consumer global restore handlers now use effective state and pass actual viewport width: temporary → dismiss, expanded → toggle, compact/hidden → show. Their prevented shared default avoids double dispatch. The S toolbar's existing peek intent remains intact.
- Quiet splitters change only pseudo-element paint. Existing width, separator semantics, tab stop, pointer capture and keyboard reducer paths remain unchanged. Four current owner browser contracts report pointer and keyboard success.
- Local surface literals are explicitly attributed to the approved reference/current user instruction. They do not introduce Foundation tokens or reset shared defaults.

The root R6 test originally closed a temporary pane through the stale accessible name `收起平台导航`. The actual name is `关闭临时平台导航`. This was reported as a test-driver issue and corrected by root; it is not a production finding.

## Evidence and limits

Inspected the 25-ID/three-width R1/R3 annotation coverage and the R4/R5/R6 computed-value evidence, current browser specs, owner source freezes, and platform owner 16-contract result. Opened the two full-height rail screenshots noted above. I did not launch the duplicated 144-state screenshot run or claim the root's still-running overall browser run as complete. Root owns final source re-freezing, metadata/protection closure and final runtime validation after any corrections.

Initial reviewed R4 TSX: `c1463184d7c69e74157a54593cb021babe689d200ddbbfd80cb63531a7a82cee`. Initial local platform CSS: `0b18dede5552daf5d7ab738ed0e09e7e48dffa03c848d7047ab4cb2ea170dc4b`. Remaining reviewed production source identity is the current owner freeze/metadata source-freeze record.

## Closure follow-up

R1/R3 now reuse the existing Popover Trigger around a whole named account button. R4-family account copy is now inside its whole named account button. The R4-family footer was also moved to account → notification → help in DOM order, so the keyboard order follows R2 rather than only using CSS visual reordering. The common CSS preserves compact utility-before-account presentation.

`independent-account-probe.json` is a separate real local Chromium spot-check at an actually measured 900px R1 host. All five checks passed with zero page errors: temporary global navigation opens; Enter opens the account popup; pointer interaction inside its portal retains the temporary region; first Escape closes only the popup and restores account focus; second Escape dismisses the region and returns focus to the persistent restore owner. The probe binds R1 `cc5e06e6633eebb27ac6a8162eed4d409c5c002fc421c642632859d8171a60e9`, R4 `d8da4b3a5866cb95ee811b5ed689cdcc0aebeb03e5312e23ac0a8237e4c10d70`, and platform CSS `c7d822251fbb4c8716b887e9504056cd61909111551773a3729f39405a564218`.

Closure additionally caught the legacy R1 footer rule `.nv43-platform footer button` (`r1-r3.css:6`) now matching the converted account button. The common account declaration did not reset the legacy 28px width/height. The new owner formal run and matrix recorded R1/R3/S1/S2 account height28 and reduced footer heights; this is a production geometry defect, not a driver failure. Root was notified to restore account auto sizing or the proper compact40/expanded44 target and keep the 32px Avatar. Final size and source proof is pending at this follow-up point.

The same matrix also reported separate 1px row inset differences in forced temporary regions. Those correspond to the existing temporary border box: they require state-specific expected geometry, not an indiscriminate relaxed tolerance or changed production layout. Initial failures remain historical evidence.

## Final independent closure

The feature-local common account rule now explicitly resets legacy width/height to auto. `independent-closure-probe.json` executed against the corrected source and passed four current contracts with zero page errors:

- R1 account is40px high when compact and44px when expanded, with the existing32px portrait; the expanded whole target includes name and caption.
- At the measured900px R1 host, the temporary account popup retains portal pointer interaction. Escape first closes the popup and restores account focus, then dismisses temporary navigation and restores the persistent platform entry.
- R4 light footer has both actual left-to-right geometry and native Tab order account → notification → help.
- R4 dark footer preserves the same actual geometry and native Tab order.

Final independent probe source binding:

| Source | SHA-256 |
| --- | --- |
| r1-r3.tsx | cc5e06e6633eebb27ac6a8162eed4d409c5c002fc421c642632859d8171a60e9 |
| r1-r3.css | 8f1862b217e2ab3167390489647a3c6fa34e393587ddd55876a6c37f4b6d9837 |
| r4-r6.tsx | d8da4b3a5866cb95ee811b5ed689cdcc0aebeb03e5312e23ac0a8237e4c10d70 |
| r4-r6.css | 49ff041a21bf049c5a35a901d95f8991867d6e0308c5e7c710f0c67f68826bc3 |
| platform-navigation.css | 770f9968418ca6c8a3d7fe959da292e521b2ac3f09b11b672e3f4dad18b004b3 |

This closes the initial footer-order and whole-account interaction findings, including the legacy28px follow-up. The shared helpers propagate those source fixes to their documented R/S consumers; root's final cross-page owner/parent validation and metadata source-freeze remain separate evidence. No additional production or metadata file was changed by this reviewer. The two probe scripts/JSON records and this report are the reviewer's only writes.
