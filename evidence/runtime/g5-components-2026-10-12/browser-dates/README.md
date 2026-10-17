# G5 Calendar / DatePicker browser evidence

Date: 2026-10-12. Built playground: `http://127.0.0.1:5395`, after the Calendar day-label inheritance repair. Chromium desktop 1440×1000 and narrow 390×844; 7 scenarios per viewport.

## Result

- `pnpm exec playwright test --config tests/e2e/g5-dates.config.ts`: **14 passed**, 22.5 seconds.
- `pnpm exec vitest run packages/ui/src/calendar/calendar.test.tsx packages/ui/src/date-picker/date-picker.test.tsx`: **22 passed**.
- Scoped `git diff --check`: passed.
- Each final-run browser console record is empty. `report.json` is the complete final browser report.

## Observed behavior

1. Chinese weekdays begin on Monday; selecting a day updates the standalone Calendar; ArrowRight and Enter move/choose the expected day. Weekend disabling is exposed on the real date buttons.
2. Month transition computes to 220ms. Old month snapshots are removed after completion and rapid navigation, and subsequent transitions still start. Reduced motion removes the animation machinery and date-button transitions.
3. Single-date changes commit only through Confirm. Cancel, Escape and outside click discard draft changes. Confirm/Cancel/Escape return focus to the trigger; clicking outside retains focus on the outside control.
4. Single datetime rejects hour 25, shows `--:--` for the invalid draft summary, and commits a valid 09:05 only through Confirm.
5. Range selection follows start/end/new-start phases, orders reverse day selection, accepts same-day ranges, and keeps its unfinished draft when resized from two months to one month.
6. Range datetime rejects a same-day end time earlier than its start time; a valid pair commits the expected complete range. Required fields cannot confirm an empty draft. Desktop time groups align in two columns; narrow groups stack. With limited vertical space the existing popover scrolls, and Confirm remains reachable in the viewport.
7. Escape closes the nested year Select while preserving DatePicker and returning focus to the Select trigger. Selecting another month preserves the outer popup, clears animation snapshots, keeps IDs unique, and permits a final confirmed selection.

## Visual inspection and repair

Rendered PNGs were opened and inspected, including the selected standalone calendar, desktop range datetime, narrow time groups and footer, dark single-date popup, and reduced-motion month view. The initial screenshots exposed a real local-composition defect: the formal Button's label color did not inherit the Calendar day root's selected/outside/disabled color. The repair adds a `label` part to the `calendar-day` local recipe with `color: inherit`; no shared Button or token changed. A browser assertion now checks that a selected day has white on-color text and that its number inherits the same foreground.

Useful screenshots: `calendar-desktop-selected.png`, `single-desktop-dark.png`, `single-time-narrow.png`, `range-time-desktop.png`, `range-time-narrow.png`, `range-time-narrow-footer.png`, `range-desktop-narrow.png`, and `calendar-narrow-reduced.png`.

This is local Chromium verification and agent visual inspection. Human visual acceptance, real touch devices, Safari/VoiceOver, and a full accessibility/contrast audit remain unverified.
