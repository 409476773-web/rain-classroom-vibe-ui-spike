# ADR 0009: Native Switch with Rain loading control

Status: implementation authorized 2026-09-20; independent review passed; visual Human Gate accepted 2026-09-20 for runtime visual scope.

Switch is a pure native control. Base UI owns the native button, hidden form input, checked state and reset integration; Rain owns the public API, three legacy size recipes, semantic paint, focus treatment and loading gate. Loading remains focusable, exposes `aria-disabled` and `aria-busy`, blocks activation callbacks, and reuses the existing `ButtonLoadingIcon`. Native disabled wins focusability when both flags are present while the loading icon remains visible.

Labels, descriptions and row/card composition stay with the host. The candidate remains unpublished and does not authorize contrast acceptance, Figma writes, business migration or Git operations. See the [implementation plan](../plans/2026-09-20-switch-implementation.md) for the contract and verification scope.
