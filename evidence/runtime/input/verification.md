# Input family — implementation and review evidence

2026-09-12 人工验收：用户明确回复“视觉已完成人工和检验。”，接受本轮 Input / SearchInput / FormItem 的实际运行视觉。颜色用途与对比度、独立人工键盘/输入法/读屏/物理触屏、发布和 Git 均不由此通过。正式范围见[验收登记](../../../docs/plans/2026-09-12-existing-assets-closure.md#当前运行视觉人工验收)。

2026-09-12 最新页面反馈：用户要求 Input / Select 空值提示统一且明显浅于正文，Input / SearchInput 非禁用占位现为 `Text/Neutral/5`；禁用 `/6`、单位/计数 `/5`、前后缀 `/4` 及其他视觉保持。本日上一轮 `/3` 已被替代，浅色占位带来的对比度/用途资格发现仍未关闭。最新验证见[页面反馈修订](../../../docs/plans/2026-09-12-existing-assets-closure.md#0203-页面反馈修订)和[颜色清单](../../../docs/audits/2026-09-12-color-closure-review.md)。下文保留历史验证时点。

Date: 2026-09-08. Scope: local unpublished candidates. Initial authorization: “开始建设该组件”; latest visual revision authorization: “开始调整代码”, after the user confirmed nine visual changes. Design: [confirmed discussion](../../../docs/plans/2026-09-08-input-design.md). Plan: [implementation](../../../docs/plans/2026-09-08-input-implementation.md).

## Current checkpoint

Input, SearchInput and lightweight FormItem are implemented and available at `#input`. The nine confirmed visual changes are implemented. Current automated checks, specification review and code quality review passed. Color contrast and family eligibility findings remain open; Human Gate is `awaiting_human`.

2026-09-09 family consolidation: Input and Select now each have one complete documentation entry, with short previews in the overview. SearchInput remains a callable shortcut within the same Input family. The complete Input examples share an outlined / filled / underlined switch that preserves drafts and all existing Parts. Full unit tests passed 1087/1087; Input, Select and Core UI browser checks passed 17/17, including nine Input cases. Types and build passed; cross-review found no new P1/P2 in its stated scope. Governance passed earlier, but the final run was blocked by concurrent Tag color-discovery phase/script registration. These results do not certify the later shared edits. See [the latest batch record](../select/verification.md#家族收敛续批2026-09-09) for exact coverage, final blockers and review limits. Historical counts below describe earlier batches; the shared-field color findings remain in [Select's measured snapshot](../select/color-findings.json).

The phase records `automatedVerification: passed` and retains `implementation: in-progress` and `independentReview: findings` until the unresolved color review is handled. This does not mean the component source or interactive page is missing. No publication, migration, Figma or Git action was performed.

## Implemented contract

- Sizes 24 / 28 / 32 / 36 select complete public Token recipes; gap is 4px in every size. Ordinary Input defaults to 32, SearchInput to 28, compact Density to 24. Explicit size wins.
- Clear defaults on, reserves a 24px slot, uses formal `icon/circle-close-filled` at 14px centered in both its target and the field, and appears on hover/focus on desktop or nonempty touch input. Warning/Error remain clearable; disabled/read-only hide clear. Clear runs one normal value change and returns input focus.
- Ordered Parts: leading icon, custom prefix, prefix text, control, clear, suffix text, custom suffix, trailing icon, count, trailing action. Hidden clear remains before units and never separates them from later actions. Static text accepts string/number; custom content uses prefix/suffix. Decorative icons cannot become interactive. A trailing action is value-changing by default; explicitly read-only actions may remain available.
- Default editing has a single visible 1px blue line with the shared 3px halo; its outline overlaps the border. Warning/Error preserve their validation boundary. Read-only pointer interaction has no editing ring or fill; keyboard position remains visible and selection/copy/view remain available.
- Direct known text Buttons within Input default to the brand tone when no tone is supplied. Explicit tones and existing Button disabled/loading behavior remain intact.
- Validation uses the frame and associated outside text without an automatic warning/error icon. FormItem warning messages use Text/Orange/1 and errors use Text/Red/1.
- Count is compact, for example `2/3`, with no inserted spaces or letter spacing. All neighboring Parts retain 4px gap. Static suffixText (the existing unit entry) and normal count use Text/Neutral/5; body remains /1, placeholder/prefix/custom affixes /4, overflow red, disabled /6.
- Hard limits preserve backfilled content and untouched prefixes/tails, restrict only edits, and apply after IME composition. Soft limits preserve overflow. Native `Intl.Segmenter` supplies graphemes; no code-point fallback is claimed to support combined Emoji.
- A configured limit displays count unless explicitly hidden; all overflow retains an accessible non-color description. Overflow does not change field validation status.
- FormItem supplies label/help/message associations and one validation presentation. It accepts one Input/SearchInput, preserves native grammar/spelling ARIA, adds required/disabled semantics, and does not own field values or validation rules.
- SearchInput reuses Input state and the existing TextButton. Typing updates draft only; button/Enter submit; clear submits literal empty query once, including during Loading. Read-only search is allowed. Query ownership, filter preservation, latest-response selection and Loading belong to the host.
- Both components forward the actual native input ref through React's `useImperativeHandle`, preserving React 19 callback-ref cleanup. SearchInput layout className belongs to its public wrapper.
- The high-density anatomy example scrolls locally in narrow containers so its editable area remains usable; ordinary fields reflow without horizontal page overflow.

## Visual revision verification and independent review

| Current revision check | Final result |
| --- | --- |
| Entire UI plus Input documentation-page regression | 229/229 passed across 16 files |
| Input directory recheck after the final read-only focus fix | 32/32 passed across 3 files |
| Input color/governance and Token-source regression | 30/30 passed across 3 files |
| Shared authorization/boundary and B2 regression after evidence registration | 408/408 passed across 2 files |
| Final Chromium Input + Core UI + TextButton suite | 21/21 passed, including 7 Input browser scenarios |
| Typecheck and final production build | Passed |
| Generated Tokens, exact boundaries, B2, evidence, workspace and offline lockfile | Passed |
| Independent specification review | PASS: all nine requirements covered |
| Independent code quality review | PASS after one reproduced P2 was fixed |

The visual revision first produced expected failures for the old clear icon, count spaces, Part order, extra feedback icons, default action tone and read-only pointer focus. The initial full browser run passed 81/83 tests; its two failures were old default-Input outline-offset expectations. Only those expectations were corrected to the confirmed inset line. The final 21-test run rechecked all Input, Core UI and TextButton cases, including the subsequently repaired focus edge. The other 62 browser cases passed in the earlier full run; no later single full-suite or monolithic `pnpm verify` success is claimed.

The five-file script run passed 30 tests in three files but two workers failed to start. Retrying those two files exposed the two newly retained JSON records missing from the exact evidence list. Registering only those two Input paths restored their final 408/408 result. No check or contrast threshold was removed.

Independent code review reproduced a P2: clicking read-only frame padding left a pointer marker despite the native control remaining unfocused, so the next Tab entry lacked a visible ring. Pointer/click tracking now applies only to the native control, focus derives from native `:active`, and forwarded clicks check the actual focused element. A real browser regression failed before this correction and passed afterward. The independent reviewer rechecked padding → Tab, normal pointer, label forwarding, canceled pointer focus and later focus in both normal/forced-colors modes; its fresh four-file targeted suite passed 41/41. No remaining actionable code issue was reported. These code results do not accept the color findings below.

The browser checks cover actual four-size/two-theme geometry, 14px filled-icon centering within 0.1px, 24px clear targets, 4px spacing and stable unit/count/action positions; exact text colors and omitted validation icons; 1px editing line; read-only selection and Tab/view behavior; touch clear, narrow layout, forced colors, IME selection and search response ordering. The final real screenshots below were refreshed and inspected after the focus correction.

## Initial implementation review (historical)

Two separate read-only reviews used fresh source, targeted tests and independent Chromium/JSDOM experiments. Five reproduced P2 issues were corrected and rechecked:

1. IME commit caret moved to the tail: save/restore the edit selection after the native value event.
2. FormItem dropped explicit `aria-invalid`: preserve the caller's native semantics unless error presentation requires true.
3. ReactNode decoration/text could bypass disabled behavior: guard decorative content and require plain text in semantic text slots.
4. Callback-ref cleanup was lost: use stable native refs with React imperative forwarding in both components.
5. The anatomy example left less than 1px for editing at 320px: use a locally scrollable complete example with a minimum layout width.

Fresh review confirmed callback-ref setup/cleanup at 1/1, no reconnect on edits, and an approximately 193px editable area in the complex example at 320/390/768px. No remaining code P1/P2 was reported in the reviewed scope. This is separate from the open color findings and Human Gate.

## Initial implementation verification (historical)

| Check | Final result |
| --- | --- |
| Input / FormItem / SearchInput and related page regression | 67/67 passed |
| Shared phase, color and B2 regression after current acceptance synchronization | 441/441 passed across four files |
| Entire Chromium browser suite | 81/81 passed |
| Input browser recheck after the final theme-heading correction | 5/5 passed |
| Typecheck and production build | Passed |
| Generated Tokens, exact boundaries, B2, evidence, workspace, offline lockfile and icon integrity | Passed |

The full `pnpm verify` chain passed governance, icons and typecheck before exposing stale shared acceptance fixtures during unit tests. Those four files were corrected and freshly rerun (441/441); the other 47 unit-test files passed in the full run. The remaining build and browser steps were run separately and passed. This records the actual sequence rather than claiming a later monolithic `pnpm verify` invocation exited successfully. The existing full icon-directory bundle-size advisory remains; it is unrelated to Input.

A final screenshot review corrected a global heading color leaking into the Dark preview; the heading now inherits the page theme. Its computed color is included in the final Input browser check.

Browser IME dispatch checks simulate composition events; they are not evidence of manual testing with a physical operating-system input method. Chromium is the configured browser engine. No Safari/Firefox or manual screen-reader Gate is claimed.

## Open color findings

The generated [consumer contract](../../../manifests/contracts/token-foundations-v1.json) and [token verifier](../../../scripts/verify-token-foundations.mjs) record the actual declared roles under both Light/Dark and Background/Neutral/1 and /3. These are calculated Token combinations, not screenshot pixel samples. The global validator and thresholds remain unchanged.

| Use | Cases | Measured contrast | Requirement |
| --- | ---: | --- | --- |
| Default necessary boundary, Neutral/2 | 4 | 1.54–1.67 | 3:1 |
| Hover necessary boundary, Neutral/1 | 4 | 1.86–2.56 | 3:1 |
| Editing Brand/1 boundary, Dark | 2 | 2.57 / 2.92 | 3:1 |
| Warning Orange/1 boundary, Light | 2 | 2.51 / 2.29 | 3:1 |
| Error Red/1 boundary, Dark | 2 | 1.38 / 1.57 | 3:1 |
| Red count on editing fill | 2 | Light on Background/3: 4.46; Dark on Background/1: 4.30 | 4.5:1 |
| Red count on Orange warning fill | 4 | Light 4.98 / Dark 4.67 | Cross-family eligibility still rejects this pairing |

The original 16 contrast findings and 4 family-eligibility findings above remain. The visual revision adds these measured text uses:

| Revised use | Cases below threshold | Measured contrast | Requirement |
| --- | ---: | --- | --- |
| Unit / suffixText, Text/Neutral/5 | 9 | Light default 3.71, editing 3.30 / 3.03, warning 3.38, error 3.26; Dark editing on Background/1 4.49 | 4.5:1 |
| Normal count, Text/Neutral/5 | 9 | Same state/parent combinations as units | 4.5:1 |
| FormItem warning, Text/Orange/1, Light | 2 | Background/1 3.75; Background/3 3.42 | 4.5:1 |

Before shared-field appearance integration, the core total was **36 contrast findings and 4 family-eligibility findings**, retained in [that verifier snapshot](color-findings.json). The current combined Input/shared-field findings are recorded separately above. Values in this table are rounded for display; comparison uses the unrounded value. Each /5 Part has eight Light combinations (four states × two parent backgrounds), plus one Dark editing combination. All remain `pending-review` with `acceptedException: false`.

The [separate composed brand TextButton matrix](inline-text-button-colors.json) covers 48 enabled label combinations: both themes × both Input parent backgrounds × default/editing/warning/error Input fill × default/hover/pressed Button state. Nested paints are alpha-composited using the existing Token helpers. All label contrasts pass 4.5:1 (minimum 4.570389581595); eight default transparent-button label uses on Orange/Red Input fills still fail cross-family eligibility. These eight are separate from the four red-count findings above and also have `acceptedException: false`. Disabled/loading and explicit caller tones are outside this bounded label matrix.

Passing generation or contract tests means the findings are faithfully recorded, not that their visual use passed. The implemented mapping follows the user's confirmed colors; no new color or blanket exception was introduced. The precise visual-revision authorization permits only the declared Input suffix/count and FormItem warning candidate reports; absent/malformed authorization and unrelated text remain rejected.

## Human review scope

Review the four complete size recipes, 24px clear/search hit areas, palette and states in both themes, keyboard/physical IME interactions, and the explicitly open color findings. Human acceptance has not been recorded. Other component Gates, the umbrella Foundation phase, package/registry publication, business migration and Git remain outside this change.


## Retained browser captures

Refreshed from the real `#input` page during the family-consolidation batch's successful 17-test browser run. Desktop screenshots are 1600 × 2086; the narrow capture is 320 × 4608 and follows the touch clear interaction. The parent inspected both current desktop images. Human visual acceptance is still pending.

- [Light](light.png), SHA-256 `8bb486a281c2533c7bded129537c7a77025da649a21ce17b3f179a854733e125`.
- [Dark](dark.png), SHA-256 `77149e7a3d876f68cb5f3e31a99178abd41b470e151d3a359969947082952363`.
- [Narrow touch view](compact.png), SHA-256 `8734be3b081a2229088b0208a35aa3d2b27e25f99d18b440c13007ceddf1e4d6`.
