# ADR 0006: Native Checkbox and CheckboxGroup

Status: implemented; SC-01 runtime visual acceptance recorded (2026-09-09). Contrast findings remain open.

The SC-00 source audit found native input semantics in Rain Classic and reusable native input patterns in this repository. Checkbox requires no overlay, portal or composite arrow-key behavior. Use a native checkbox under its label and a fieldset/legend for CheckboxGroup; no dependency is added.

CheckboxGroup is the default complete recipe. It retains stable string IDs outside its rendered options; disabled choices cannot change. Native FormData independently omits disabled controls and values with no rendered input. Group required validation belongs to the host, and indeterminate is a visual/ARIA state over a boolean checked value.

Both controlled and default state are supported. Default form reset restores the latest declared default without a selection callback and honors canceled reset events; controlled reset belongs to the host. Library check-bold and minus-bold supply the marks.

See [implementation and acceptance plan](../plans/2026-09-09-checkbox-sc01-implementation.md). This decision is scoped to Checkbox; the existing headless-overlay ADR is unchanged.
