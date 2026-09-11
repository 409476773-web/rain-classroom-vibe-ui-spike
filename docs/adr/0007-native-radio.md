# ADR 0007: Standard native Radio and complete RadioGroup

Status: implementation authorized 2026-09-10; visual Human Gate pending.

Radio and RadioGroup are separate managed UI candidates. Radio is a controlled native input; RadioGroup is the default complete fieldset/legend recipe, with controlled or default single-value state. Stable non-empty string IDs preserve form semantics. A missing selected ID remains in the model without automatic fallback selection. Native same-name/form ownership handles mutual exclusion and keyboard navigation.

This keeps Rain Classic's circular indicator, native labels, descriptions and single selection while using only established Rain Tokens. Original 17.6px outer circle and 6.7px mark become Space/18 and Space/6; the circular highlight remains 23px inside Space/24. The mark is control geometry, not a replacement icon.

The existing Checkbox default-reset hook moves unchanged into one private utility used by both families. It restores current declared defaults, follows external/replaced forms and honors canceled reset. Controlled form reset remains the host's responsibility. No selection engine or new dependency is introduced.

Equal explicit names within one form share a native radio group; distinct groups must use distinct names. Omitted names are stable generated native names and are also submitted, so business forms should provide their field name. Required uses native group validity; the host owns error timing and text. Disabled selected values may be replaced by enabled alternatives.

Source comparison, full API, Token matrix and verification scope: [implementation plan](../plans/2026-09-10-radio-sc01-implementation.md). Cards, rich children, preview and conditional panels remain separate work. Automated checks and visual acceptance do not authorize publication, Figma writes, migration or Git actions.
