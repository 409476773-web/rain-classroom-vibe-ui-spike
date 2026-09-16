# BM-C second visual refinement · 2026-09-16

Authorization: explicit user 13 browser comments; overall composition repair following the discussed design method. Scope: local BM-C only. Shared UI/Foundation/Layout, BM-D and grading state source remain protected by before.json.

Plan: white sticky taskbar with return separator; formal library icons and smaller collapse glyphs; visible contained Tabs on white toolbar; colored SystemStatusTag with a primary save-and-advance action, secondary save and icon navigation; help Popover; remove optional-label duplication; converge typography, inner surfaces and spacing. Retain native details, original host state, drafts, save lock/error recovery, default control density and responsive Split.

Implementation completed for this local refinement; automated verification and independent technical review passed. Human Gate awaiting_human; contrast acceptance not-granted; publication/business migration not-authorized.

## Comment mapping

| User comment | Implemented result |
| --- | --- |
| 1, 10 | Native summary markers replaced by formal ArrowDown/ArrowUp assets, preserving native keyboard/details behavior. |
| 2, 3 | Collapse IconButton uses 32px target and 16px icon. |
| 4, 5, 6 | Full-width white sticky taskbar; return separator; formal ArrowLeft asset. |
| 7 | White toolbar makes the existing contained Tabs tray visible; no shared Tabs override. |
| 8 | One primary save-and-advance button; neutral secondary save; icon previous/next navigation separated from save actions. |
| 9 | Existing SystemStatusTag: neutral ungraded/no selection, warning dirty, processing saving, error failed, success saved. Color is accompanied by icon and text. |
| 11, 12 | Label is “评语”; optional behavior preserved; draft/help copy moved into a named Popover with 14px title/body. |
| 13 | Main text 14/16px, normal control sizes, closer related grading information, no nested student-answer surface; theme control moved to demo settings; tablet Split overflow repaired. |

## Verification and findings

- Targeted unit suite: 17/17; workspace typecheck and prototype build passed.
- Final three-browser M2 suite: 33/33 (40.3s), no failed/skipped/flaky tests. Covers BM-C original draft/lock/save/failure/navigation/reflow plus new icons, help, status, sticky header, actual tray contrast and 899/390px focus visibility. BM-D regression remains covered.
- Initial browser run: 32/33, Firefox heading top 141px vs pane top 143px. Local scroll margin fixed the focused heading clearance, without weakening the assertion or changing grading state. Focused Firefox rerun passed, then all 33 passed.
- Initial unit run rejected a transient exact-authorization mismatch. Final listCompositionPilot record is deep-equal to the baseline; no scope/Gate expansion. Subsequent 17 unit cases passed.
- Independent reviewer bm_d_feedback_review corrected color metadata parent surfaces: return Link and paper buttons now recorded on the actual white header/toolbar. Original text 4.5 thresholds, selected intent and Alpha composition remain unchanged. Frozen metadata routes only under exact bmCCompositionRefinement authorization; older snapshots preserved. Governance passed, existing shared contrast findings remain pending.
- Protected shared UI/Foundation/Layout, BM-D and BM-C state.ts: 1966 hashes unchanged. Original grading request/draft/selection algorithms unchanged. No dependency or shared component edits.
- Live browser inspection at 1252×800 and 899×800. At 899, inner row previously overflowed (scrollWidth 1280); restricting flex:0 to stacked direct children gives scrollWidth 899 and inspector right edge 883. Native Split determines geometry; no duplicate viewport state. Temporary viewport override reset at handoff.
- Source baseline: /tmp/rain-bm-c-composition-before-20260916. Screenshot names refined-desktop/tablet correspond to saved-status state; other captures retain their original interaction state.

This is technical and visual implementation evidence, not user visual acceptance, screen-reader/real-device acceptance, full contrast acceptance, publication or migration.



## Closure-time concurrent workspace change

After the independent review and successful 17-unit/33-browser/governance run, another active task added the avatarFamily phase and shared UI index exports. Closure retries now fail three global frozen-history authorization checks (see unit-final.log and unit-closure.log); global governance did not run after that failing prerequisite. Those concurrent files were not reverted or adapted by this BM-C task. Current shared-file differences are separately captured in concurrent-workspace-changes.json; the earlier 1966 unchanged result is a review-time snapshot, not a claim about the later concurrently changing workspace. Local BM-C and BM-D behavior tests are checked separately; no broad workspace-clean claim is made at handoff.

Live help check confirmed 14px/600 title and 14px/400 description. The live dev tab contained two earlier Vite HMR duplicate-createRoot console messages. After verifying score/comment were empty, a clean reload produced no new console errors. The three-browser built-app suite also explicitly checked console/page errors. Viewport override was reset and preview returned to the top.
