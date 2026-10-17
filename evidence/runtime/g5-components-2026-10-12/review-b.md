# G5 Task B independent review — Combobox / Slider

Review date: 2026-10-12. Workspace: `.worktrees/card-v2`. Scope: read-only implementation/test review and local Chrome verification at `http://127.0.0.1:5395/#combobox` and `#slider`. The reviewer changes this evidence file only.

## Source and automated checks

- Read `packages/ui/src/combobox/combobox.tsx`, its CSS/tests, `packages/ui/src/slider/slider.tsx`, its CSS/tests, the shared popup density bridge, and the G5 plan.
- Independent command: `pnpm exec vitest run packages/ui/src/combobox/combobox.test.tsx packages/ui/src/slider/slider.test.tsx`.
- Initial result at 11:13:56: **2 test files, 23 tests passed**, duration 2.09 s. After the retry-focus fix, the independent rerun at 11:23:32 passed **2 test files, 24 tests**, duration 2.52 s.
- Combobox keeps the Base UI Root/InputGroup/Input/Clear/Trigger/Portal/Positioner/Popup/List/Item structure and popup lifecycle. Rain Input owns its field frame, FormItem naming, size, appearance and permissions. Query, selected value and open state are separately controlled; custom text has an explicit selectable candidate and distinct callback reason. Disabled/read-only state masks a controlled-open popup. IME composition prevents Enter selection/submission and guards duplicate finished-query emission.
- The external-input action container uses `aria-live="off"` to preserve Clear in Base UI 1.8's accessible boundary without adding announcements. Clear is an actual Base Clear button with keyboard focus, rather than an inaccessible icon.
- Slider keeps Base UI Root/Control/Track/Indicator/Thumb; explicit thumb indices and `thumbCollisionBehavior="none"` preserve lower/upper identity. Base UI owns keyboard/pointer handling and commit timing. The native range inputs receive FormItem IDs/invalid status; range endpoints have distinct names.
- Automated coverage includes rejected controlled clearing, controlled permission changes, custom-value/option-value collisions, typed numeric/string/empty-string option values, synthetic IME events, required selection/form values, query restoration, keyboard range limits, continuous pointer changes and exactly one release commit.

## Chrome checks completed

- Editing the existing course query to `数据` left the committed summary as `人工智能导论`; ArrowDown exposed only `数据分析基础`, Enter committed it and left focus on the editable input.
- With the popup open, Tab focused `清除检索课程`; its DOM had no hidden ancestor and `tabIndex=0`. Enter cleared the selection, returned focus to the input and retained the open candidate list.
- The action container's actual DOM `aria-live` was `off`.
- Entering `研究方法新主题` showed the explicit `使用此输入：研究方法新主题` candidate. Selecting it produced `已接受新主题：研究方法新主题`.
- The compact preview propagated `data-density="compact"` to both the input container and portalled positioner. The sample explicitly sets field size 36, so density switching correctly did not override that explicit height.
- Clearing a query with no selected value also cleared its visible text and returned focus to the input.
- After CSS integration and a full reload, the Combobox root/positioner/stable popup widths were all 710 px. Computed normal-motion transitions were `opacity, transform` with `0.18s, 0.18s`. The transient 0.98 opening scale settled to full width.
- Dark mode propagated `data-rain-theme="dark"` to the portal. Its actual background was `rgb(30, 36, 59)` and foreground `rgb(183, 193, 224)`.
- A sequence of open → Escape → ArrowDown → Escape left zero Combobox popups and zero positioners after closing. Reopening still inherited compact density.
- Slider's restored geometry was a 710×32 px control, 4 px track and 12×12 px thumb. End on the lower range input changed `[40, 90]` to `[90, 90]` while keeping focus/name/ID on the lower input.
- Actual Chrome pointer drag: lower endpoint 0 dragged beyond the upper endpoint stopped at 90, preserved the upper endpoint at 90 and retained lower-input focus; the visible commit summary became `已确认筛选范围：90–90 分。`.
- Actual Chrome pointer drag in the other direction: with `[40, 90]`, dragging the upper endpoint before the lower endpoint stopped at 40, preserved the lower endpoint at 40 and retained upper-input focus; the visible commit summary became `已确认筛选范围：40–40 分。`.
- The browser drag API performs a complete gesture. The no-commit-before-release/exactly-one-release-callback assertions were verified by the independent pointer unit test, while the browser verified final pointer behavior and the host's committed summary; these are distinct levels of evidence.

## Integration issue observed during review

At the first browser pass, Task B CSS had not yet been imported: Combobox's anchor was 710 px but its positioner/popup was 170.69 px, `--rain-popup-width` was empty and no overlay transition duration was applied. Slider's six native range inputs had 0×0 geometry, and the screenshot showed no track/thumb. Reported immediately. The root integrator added per-component CSS imports; a rebuilt preview and full reload resolved this issue, as verified above.

## Interaction issue found and fixed

Clicking `重试` in the failed Combobox sample removed that button and restored candidates but left `document.activeElement` as BODY while the popup remained open. Reported to the root integrator and Task B owner. The root integrator changed retry to focus the editable input and added a regression test. The independent 24-test rerun passed. Final verification after reloading the rebuilt preview also passed: retry restored the candidates with `document.activeElement` equal to the Combobox INPUT and `aria-expanded=true`; ArrowDown then Enter selected `人工智能导论`, closed the popup and retained input focus.

## Review conclusion

No unresolved deterministic defect remains within this review's checked scope. The CSS integration gap and retry focus loss found here were fixed and independently rechecked. This closes the specified Task B source/unit/Chrome interaction review, with the limitations below retained; it does not broaden G4 or prior foundation acceptance.

## Limits

- Physical Chinese IME, Safari, VoiceOver/screen-reader speech, touch input, forced-colors and reduced-motion rendering have not been exercised by this reviewer. Synthetic IME and pointer tests do not replace those checks.
- Disabled/read-only Combobox behavior and controlled API edge cases were checked in source/tests; the documentation page does not expose runtime permission toggles, so this reviewer did not claim them as manual browser scenarios.
- Screenshot capture in the integrated Chrome tab repeatedly timed out. Early screenshots established the missing-CSS problem, but the final integrated geometry, colors, focus and commits above are backed by DOM/computed-style/accessibility-state observations, not a saved final screenshot.
- No claim of complete human visual acceptance or production acceptance is made.
