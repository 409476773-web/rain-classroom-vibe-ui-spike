# Review 07 · NavigationList component and gallery audit

2026-10-03. User feedback authorizes clearer platform states and invariant icon geometry. This is a candidate component repair within the existing Rain source assets. No public Token, new dependency, API, Classic/Figma/Git/publication action is included.

The actual Rain icon renders as a mask on `span[data-rain-id="icon"]`. The old `leading > svg` rule missed it, so its `1em` default inherited 12px from compact navigation and 14px from expanded navigation. `NavigationList` now also applies existing `--rain-space-18` to the official icon part. Its appearance switches do not change icon geometry. Native SVG behavior is unchanged. R2's Sidebar already keeps 15px across modes; S5 explicitly keeps 20px across modes. These registered host choices are retained.

Disabled destination rows also no longer show an enabled hover fill. Their native destination, disabled `href` removal, `aria-disabled`, tab order and modified-click handling remain unchanged. `ObjectNavigator`, `SegmentedControl`, A1/A4 Tabs and public colors are unchanged by this source patch.

| Live gallery | Measured widths | Interaction and observed result |
| --- | --- | --- |
| A1 | 1200 / 1440 / 1600 | Destination current state and content synchronize; End then Enter activates the last tab according to the existing manual keyboard contract. |
| A2 | 1200 / 1440 / 1600 | Function links, object queue and icon navigation remain separate. Existing W3 browser case passes. Four hidden portrait Avatar overrides found and reported. |
| A3 | 1200 / 1440 / 1600 | Native radio keyboard and regular/compact geometry pass in existing W3 case. |
| A4 | 1200 / 1440 / 1600 | Tab selection, range dialog, search, Escape and trigger focus restoration work. Unmatched search leaves a blank result area; reported for local repair. |
| A5 | 1200 / 1440 / 1600 | Object identity and progress synchronize in existing W3 case. Four hidden portrait Avatar overrides found and reported. |
| Contents | 1200 / 1440 / 1600 | Five content structures, preview selection and single selected tab identity hold; existing W3 case passes. |
| White | 1200 / 1440 / 1600 | White-line/white-soft native radio and connected tabs retain ownership; existing W3 case passes. |
| Connections | 1200 / 1440 / 1600 | Scope tabs, range dialog, Escape focus and locate-current focus work. Unmatched search blank area reported for local repair. |

All 24 gallery combinations show zero nested interactive controls, exactly one selected item per tablist and zero browser page errors. This is geometry and scoped runtime inspection, not full contrast or assistive-technology certification.

Platform audit covers R1–R6 and S1–S6 in both compact and expanded modes, 24 combinations / 96 menu icons. The final shared-icon measurement shows identical icon dimensions across modes, zero page errors. A 1600px artboard is used to make expanded multi-pane layouts attainable; 1440px can legitimately adapt S3 to compact mode. The initial diagnostic timeout is preserved and is not classified as a product defect.

The 10 existing navigation-family unit checks pass. W3's initial seven browser cases show six passing; R3's direct-child file-grid selector became obsolete after its owner replaced the file grid structure. The failure is recorded and reported, without reverting the new controls. A final W3 regression and final platform Token color check must use the source freeze from the parent task.

Methods: V01 keeps platform state fills readable within the existing Rain color family; D05 checks compact/expanded geometry without changing the original responsive budget. V04 and D02 support the gallery inspection of labels, metadata and control boundaries. No new global design rule is promoted by this audit.

Evidence: `navigation-before/measurements.json`, `navigation-icons-after/measurements.json`, `gallery-audit/facts.json`, `navigation-families-unit.log`, `w3-families-browser.log`, and `navigation-component-review.json`. The platform screenshots are intermediate evidence of the icon repair; the parent task owns final color captures and review status.
