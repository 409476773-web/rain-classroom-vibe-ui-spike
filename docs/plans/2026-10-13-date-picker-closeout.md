# DatePicker Remaining Checks Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Close the DatePicker helper-text contrast and finite shared-source checks that can be verified locally; give the user concrete device and VoiceOver checks.

**Architecture:** Reuse Text/Neutral/4 on the two existing helper selectors. Preserve the visual acceptance, the original before snapshots and all earlier source records. Add one independent finite successor reader for this local closeout; prior readers may use only its declared original hashes and the specifically reconciled parallel records. Keep every other Gate and lifecycle value unchanged.

**Tech Stack:** React, Rain Tokens, existing Node verification helpers, Vitest and CUA browser inspection.

---

## Authorization and scope

- 2026-10-13 user: “接下来把 DatePicker 的剩余检查收口，先说明共享检查为什么还没关闭，以及哪些需要我手动验证。”
- User chose: “将说明文字调至达标，保留当前布局和按钮外观”。This supersedes the prior very-faint Neutral 6 choice only for these two helper-text rules.
- System Mode, existing registry-candidate. Keep TSX, public APIs, preset Recipe, 28px buttons, layout, error hierarchy and touch-target rules. No dependencies, global Tokens, Git, publishing, Figma or business migration.
- Methods V04 and V05: preserve helper priority while meeting measured text contrast. D05: check light/dark and the existing narrow layout. The previous local visual acceptance remains bound to its original version.

## Task 1: Reproduce and scope

Read current shared records and run the existing readers. Record the three DatePicker completion-field differences in Select’s phase snapshot and the two interleaved final-owner test files. Preserve baseline.json and before/predecessor bytes in this evidence directory. Keep B2 history, command-set and chart reverse-dependency findings separate.

## Task 2: Helper contrast

Write a small contrast check that reads the two actual CSS rules and uses the existing color registry on light/dark Background/Neutral/1 and /2. Run it against Neutral 6 and retain the failure. Change only those two rules to Neutral 4. Recheck the real browser colors and retain source/geometry evidence that the preset buttons and layout are unchanged.

## Task 3: Finite record reconciliation

Add an exact datePickerCloseout authorization and an independent getter. Freeze original records. Validate only the named source inventory and exact prior phase. Declare the three technical completion fields and two final-owner test-source overlaps explicitly, with retained old and authoritative final-owner records. Earlier readers must reject unknown stages, third hashes, forged before snapshots, changed owner gates and undeclared drift. Do not re-sign Slider or Select records or mark Slider completed.

## Task 4: Verification and handoff

Run targeted source/negative cases, date tests, UI/Playground/test types and the standard Playground build. Inspect light/dark contrast, enabled hints/errors and narrow focus/layout through CUA; browser interaction stays in CUA. Save a human checklist for actual Safari, real touch/soft keyboard, VoiceOver and native zoom. Numeric contrast results are scoped evidence, not full accessibility or production acceptance. Independently review the changed source paths and document remaining global failures.
