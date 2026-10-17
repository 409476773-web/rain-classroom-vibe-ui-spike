# Review09 · all R/S pages self-audit

Source: 2026-10-03 user explicitly requests inspect and optimize R1–R6 / S1–S6, with compact R3 platform screenshot. System Mode for tracked candidate components/Recipe contracts. Preserve Review07/08 decisions and scoped historical G1; G2 remains pending human.

Audit every page at1200/1440/1600 plus meaningful subscenes and short-height interactions. Owner separation: root platform CSS/shared navigation + metadata/status; R1–R3 owner local r1-r3/r2; R4–R6 owner r4-r6; S1–S6 owner workspace-states. Capture before/after, reproduce root cause, fix confirmed defects, use existing variants and Token values. No new dependencies, global Token reset or architecture redesign.

Methods V04/V05/D05: preserve information roles and control/target sizes; adapt long/empty/narrow content; check names/focus/keyboard and actual rendering together. Existing frozen HTML is lineage reference; this explicit user audit authorizes local defects to diverge with recorded reasons. No viewport-only preview attributes.

Initial root finding: compact R1/R3 hides label but keeps flex-column normal justification, yielding leading18px offsetY0 inside40px entry instead of11px. Shared platform Recipe will center icon-only entries. Native title tooltip is inconsistent with existing Rain Tooltip and absent for keyboard-only hidden labels; use existing Tooltip in NavigationList icons presentation (right portal), keep native inset truncation title and disabled semantics. R2 uses Sidebar independently and owner will inspect its prompt behavior.

Verification: new focused regressions + existing unit/business/browser contracts redirected to this new evidence; typechecked build; independent source/metadata/closure/protection checks. Snapshot17919 repo /254 workpack files. Broad contrast/VoiceOver/Safari/Firefox/Human Gate/publication not inferred.
