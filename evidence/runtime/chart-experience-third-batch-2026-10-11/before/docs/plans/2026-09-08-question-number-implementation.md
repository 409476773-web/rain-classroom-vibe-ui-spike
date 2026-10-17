# QuestionNumber 32 Implementation Plan

> **For Claude:** Use the executing-plans workflow to implement these bounded tasks in the current authorized workspace. No Git actions.

**Goal:** Build the approved 32 px question navigation button and bottom result marker as an unpublished Rain Next component candidate.

**Architecture:** Native controlled button; current location and feedback are independent. Reuse public Rain Tailwind tokens, the existing Icon renderer and named Local Recipe parts. Business progress and appeals belong to host compositions.

**Tech Stack:** React, TypeScript, existing Tailwind bridge, Vitest/Testing Library and Playwright. No dependencies added.

## Authorization and scope

- System Mode. User accepted the Figma-derived 32 px preview and then authorized formal construction with “继续” on 2026-09-08.
- Figma source: MbWg1ft5zk1JRQiQ6dS30e / 2761:19654. Reference geometry: body 32, square radius 6, line 1, label 15/22, feedback 12 at bottom center protruding 6; solid inner glyph 8. Circle means child question.
- Default label weight 600; current label 700 implements the user's selected-weight increase using the existing public bold token. This is a scoped exception to older 400/600-only text guidance.
- Current body uses solid brand fill, on-color label, no border. Feedback remains visible. Other states use corresponding weak borders and same-family text, including green and orange. Grading rings retain source path thickness, separate from UI border tokens.
- Only this complete size is implemented. Other sizes, top-right markers, OptionButton, tooltip, publication, Figma changes and other components are outside this batch.
- Source visual acceptance does not close the formal component Human Gate.

## Contract

`QuestionNumber` accepts `number: string | number`, `shape?: "square" | "circle"`, `current?: boolean`, `feedback?: "none" | "answered" | "correct" | "wrong" | "unanswered" | "pending" | "reviewed"`, native button attributes/events/ref and a named `localRecipe` for `root`, `control`, `label`, `feedback`.

- Defaults: square, not current, no feedback. None is not inferred as unanswered.
- Native button defaults to type button. Host controls current; repeated activation does not toggle off internally. `aria-current="step"` describes navigation, never radio/pressed selection.
- Visible identity must be non-empty; default accessible name includes question identity and feedback. Hosts can provide contextual names and descriptions for child questions and business details.
- 32 px visible control has 6 px outer hit padding, giving 44 px native target; bottom marker sits within this footprint. Wrapping root is transparent. Do not clip markers or nest secondary interactive actions.
- Disabled remains a native disabled button, prevents activation, and uses existing disabled tokens without changing the supplied feedback meaning. Keyboard focus uses the shared Focus contract; it is not a persistent selected border.

## Implementation tasks

1. **Icons:** Preserve the original 897 sources. Register two explicit additions, `icon/grading-pending` and `icon/grading-reviewed`, with actual source-frame provenance (not fictitious Figma component keys). Regenerate all generated outputs and verify passive SVG and independent imports.
2. **Component:** First add failing interaction/semantics tests in `packages/ui/src/question-number/question-number.test.tsx`; then implement the native component and static token recipe in that directory and export from `packages/ui/src/index.ts`. Use library close-bold, check-bold, warning-bold and the paired new rings.
3. **Docs:** Add the real `#question-number` page, fixed-size matrix, current/result independence, parent/child navigation and disabled controls. Do not prescribe business-specific progress/appeal layouts. Keep technical details in component documentation, outside the product example flows.
4. **Governance:** Register the UI manifest and workspace-only registry item, narrow Tailwind scope and scoped phase authorization. Preserve unrelated frozen baselines. Record automated, independent and Human Gate status separately.
5. **Verification:** Run targeted tests first, then required workspace/icon/token/governance/type/build suites. Use real Chromium to verify dimensions, token colors in light/dark, border-free current, label weights, ring geometry, native keyboard behavior, disabled and forced colors. Review source fidelity and maintainability independently and address findings.

## Remaining assumptions to verify

- Source geometry remains legible at actual 32 px with the product font and three-digit labels.
- Existing public color tokens render correctly in theme scopes; no second palette is introduced.
- Circular child markers do not clip, and the full hit area fits dense navigation layouts.

Implementation and acceptance are recorded separately in the component manifest and `status/current-phase.yaml`. The user accepted the first 32 px component visual on 2026-09-08; known contrast findings remain unresolved.

## 2026-09-08 business-example correction

The user clarified that real progress indicators are often visually integrated inside the question button and that business combinations vary. Remove the teacher progress/appeal example to avoid presenting one layout as a library recommendation. Business ownership of extra information does not prescribe its visual location. Preserve the native no-nested-interactive-controls rule without requiring progress or exception cues to be outside the visible button. This correction changes documentation and its demo only; it does not add a Progress component or business-specific button props.

## 2026-09-08 first-size visual acceptance

User statement: “首版32px的题号按钮，已可以视觉验收”. Record `question-number-32-visual-only` as accepted, covering this size's square/circular bodies and bottom feedback. Keep implementation `in-progress` and independent review `findings` because contrast decisions remain pending. This does not accept contrast exceptions, other sizes, top-right markers, OptionButton, the new icons outside this component, or publication.

Follow-on family scope is proposed in [题号与选项按钮建设规划](2026-09-08-question-and-option-family-roadmap.md); that planning document does not widen this implementation authorization.
