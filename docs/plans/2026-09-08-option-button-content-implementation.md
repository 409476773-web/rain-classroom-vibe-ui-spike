# OptionButton 32: results and content

System Mode, authorized on 2026-09-08 by “视觉没问题。推进下一步” after the first selection batch. Record its visual acceptance separately; this is the roadmap's second batch. Work in the current workspace without Git, dependencies, new Tokens, Figma writes or publication.

## Scope and contract

Reuse OptionButton and OptionGroup, their native inputs, 32 px identity, two appearances, 44 px standalone target, Local Recipes and shared Focus. Add only:

- `readOnly`: preserve readable answers, native form values and focus while blocking pointer/keyboard changes. It is separate from disabled. Readonly radio groups retain a native Tab entry; arrow keys move focus between available options without changing the answer. Readonly checkboxes remain individually reachable by Tab. Space activation cannot change either type. A readable description communicates readonly state. Existing input handlers remain composed.
- `feedback?: "none" | "correct" | "wrong"` on each option and `feedbackVisibility?: "hidden" | "visible"` on the group/item, hidden by default. Only a checked option with explicitly visible feedback shows evaluation. Never infer the correct answer or mark an unselected correct option, even when no answer was given. Feedback is not `aria-invalid` form validation.
- `symbol?: "true" | "false"`: use the explicitly user-selected `icon/check-bold` / `icon/close-bold` library assets inside the identity, retaining a meaningful label. Both are available host-colored SVG masks in the existing catalog (source nodes `71:48` / `71:51`); this component mapping does not modify global semantic rules. These glyphs mean the option's content, not its correctness. The latest user correction removes additional visible result glyphs and captions; the result is retained in an accessible description.
- `media?: { src: string; alt: string }`: a non-interactive image/chart inside the same clickable label, with required meaningful alternative text. The user clarified the hierarchy: identity on the left; text and media share the right content column and align on its left edge. This applies to media-only and mixed content; images do not span beneath the identity. Auto card arrangement when media is supplied; existing `text` supports long content. No arbitrary interactive children, zoom/playback or remote fetching helpers.
- New declared Part: `media`; existing Parts stay intact. The internal `feedback` description is screen-reader-only, not a public visual Recipe part. Card groups wrap automatically using existing Space/32 × 8 as a layout minimum and shrink to the container on narrow screens.

## Visual mapping

The accepted selection-only recipe is unchanged. The user then explicitly corrected option review only: “选项按钮，回顾时，不显示下方的小字。并且颜色应该是，对应色系的fill + 反白文字或icon”. This supersedes the earlier same-family text proposal for this option-review batch; QuestionNumber and its existing accepted visual remain unchanged.

The visible review identity retains its letter or judgment glyph, selected weight 700 and no border. Correct uses Fill/Green/Solid/2 + OnColor/1; wrong uses Fill/Red/Solid/2 + OnColor/1. There is no visible result caption, extra result icon or public feedback Part; an invisible description retains the disclosed result for assistive technology. Rows/cards retain the accepted shallow-blue fill, weak Brand/3 boundary and Text/Neutral/1. Result evaluation does not replace the selection boundary. Feedback hover cannot overwrite the identity's result color; readonly has no hover/pressed selection response. Disabled remains neutral.

Candidate check, OnColor/1 on solid fill (light/dark): Green Solid/1 = 3.682/2.845; Green Solid/2 = 2.683/6.318; Red Solid/1 = 4.331/3.601; Red Solid/2 = 3.601/6.363. Solid/2 preserves the source-design normal feedback tier consistently in both themes. The actual label uses normal-text minimum 4.5; a judgment glyph is a meaningful icon with minimum 3. The resulting light-theme green text/icon and red text limitations were initially pending findings; the user accepted these 9 exact combinations on 2026-09-08. Their measured ratios and original thresholds remain unchanged. Previous pending findings from the superseded caption/same-family-text proposal are removed; the QuestionNumber 93 combinations retain their separate acceptance record.

Results not yet public preserve blue selected identity. Empty readonly answers stay neutral, with page-level “未作答” context. Correct answers/explanations remain page-owned. Selected media cards preserve the accepted shallow-blue fill and weak Brand/3 outer border, with no border on the internal identity.

## Delivery and verification

1. Write failing behavior tests for readonly pointer/keyboard/form persistence, explicit disclosure/selection filtering, symbol identity/result separation and image click/alt semantics. Extend the shared implementation and exports.
2. Extend the current documentation page after the accepted examples: standalone and row result review, unpublished/no-answer cases, interactive and reviewed judgment, interactive media cards with long content. Show a separate pending visual review label for this batch. Use local authored illustrative images, not network placeholders or substitute icons.
3. Update exact governance authorization, sources, color pairs, Manifest and Registry; protect the first batch acceptance. New image assets are documentation examples, not library icons or public Tokens.
4. Verify browser pointer and keyboard paths, readonly versus disabled, actual token colors/contrast, image layout, narrow screens and forced colors. Save separate screenshots and evidence under `evidence/runtime/option-button-content/`.
5. Run focused checks, full governance/type/build and regression checks appropriate to shared behavior. Independently review implementation and scope, fix findings, then present for this batch's visual acceptance.

## Sources

The [family roadmap](2026-09-08-question-and-option-family-roadmap.md), original user screenshots and [selection plan](2026-09-08-option-button-implementation.md) retain Rain's visual lineage. The earlier Vue Radio/Checkbox source comparison remains applicable. Rechecked [React Aria RadioGroup](https://react-aria.adobe.com/RadioGroup) and [CheckboxGroup](https://react-aria.adobe.com/CheckboxGroup) distinguish readOnly from disabled; [WAI radio pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) informs the existing editable keyboard behavior. These are behavioral references, not new dependencies or foreign color recipes.


## Final acceptance · 2026-09-08

The user accepted the current content batch and contrast review. Implementation and independent review are closed; visual/contrast evidence and the exact accepted set are recorded in [verification](../../evidence/runtime/option-button-content/verification.md#content-and-contrast-acceptance--2026-09-08). Six-size acceptance remains separate, and no publication or Git action is implied.
