# Independent integration review

Read-only review by matrix_scale_encoding; renderer/CSS ownership remained with matrix_calendar_review. No vendor or dependency change.

Initial review identified five behavioral boundaries: glyph fit against target rather than painted radius; heat tone against target rather than painted fill; pointer coordinate lost on region focus; incompatible legend selection after encoding changes; fractional semester legend. It also checked tooltip anchoring after sorting and stale removed coordinates. Repairs were reviewed in the final source and separately exercised by the browser suite.

Final review found no remaining concrete blocker. The finite500ms sampler cancels previous frames on a new signature, reduced/empty state and unmount. It updates only data-fit/data-tone; ordinary hover does not restart it. Discrete legend fills use model.encode(); the new CSS contains dimensions and radius only, so no new CSS color consumer was introduced. Current selectors remain registered, including forced colors.

Review does not grant visual acceptance, complete contrast certification or real Safari/VoiceOver coverage.
