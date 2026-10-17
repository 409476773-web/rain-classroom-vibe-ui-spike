# Review10 R2 visual hierarchy

Implemented locally; G2 visual acceptance remains pending. Production source is frozen: only r2.tsx and r2.css changed. course-resources.tsx remains unchanged.

- Focus now uses existing tertiary Button paint; student preview uses existing text Button paint. Removed private root/leaf/hover overrides. Existing 32px targets, 12px labels, 16px leading icons, and 93/103px widths remain.
- Auxiliary pins/close/chevrons/help consume IconNeutral4 by default and IconNeutral2 on hover/focus. Pin/close retain28px targets and14px icons; their radius follows existing6px contract.
- Useful scope explanation uses TextNeutral4. Pure mock corner, sidebar counts, and account role use TextNeutral6. Existing page explanation, edit hints, current navigation, semantic tags, danger/error controls, and primary Save/secondary Add root are preserved.
- R2 has no table/th. Tree titles are already400, selected600, with existing Tree metadata/connector Tokens. No fabricated table-style changes or new breakpoints/Token/dependency were added.

Measured and viewed before/after compact and expanded screenshots at1200/1440/1600: 6+6 screenshots and0 final page errors. 10 focused unit tests, Playground typecheck, and10 unique R2 browser contracts passed (7 existing radio/Tooltip/dialog-focus;3 hierarchy/geometry/focus-preview/navigation restore/menu-focus). Initial validation/driver failures are recorded in report.json and retained logs/traces; production was corrected only for candidateTokens before freeze, while later retries changed drivers only.

No claims are made for full contrast, assistive technology, multiple browsers, publication, or new human approval.

Final source hashes:

- r2.tsx: ee065dcf63cc1748bd5e276b05f95f17906b1989a90771f40271439c5ffe7c32
- r2.css: 2a3601c15121f2930a84d9ccb536e14c22d0f37bedebd927d84602fcbcfb71b1
- course-resources.tsx (unchanged): 3fa367fe82d7d0c9fecc099aac0e3815445e781833450f73461c7bd9991c06b2
