/** Fixed square host sizes; registration does not approve every glyph at every size. */
export const iconSizeClassNames = {
  4: "size-rain-icon-4",
  6: "size-rain-icon-6",
  8: "size-rain-icon-8",
  10: "size-rain-icon-10",
  11: "size-rain-icon-11",
  12: "size-rain-icon-12",
  14: "size-rain-icon-14",
  16: "size-rain-icon-16",
  18: "size-rain-icon-18",
  20: "size-rain-icon-20",
  22: "size-rain-icon-22",
  24: "size-rain-icon-24",
  28: "size-rain-icon-28",
  32: "size-rain-icon-32",
  36: "size-rain-icon-36",
} as const;

export type IconSizeTokenName = keyof typeof iconSizeClassNames;

export const iconSizeTokenEntries = Object.keys(iconSizeClassNames).map((name) => {
  const value = Number(name) as IconSizeTokenName;
  return [value, {
    id: `Icon/Size/${value}` as const,
    type: "dimension" as const,
    value,
    unit: "px" as const,
    range: value <= 6 ? "micro" as const : "main" as const,
  }] as const;
});

export const iconSizeTokens = Object.fromEntries(iconSizeTokenEntries) as Record<
  IconSizeTokenName, (typeof iconSizeTokenEntries)[number][1]
>;

/** IconButton geometry remains independent from public Icon Size and Space. */
export const iconButtonControlSizeTokens = {
  18: "18px",
  20: "20px",
  24: "24px",
  28: "28px",
  32: "32px",
  36: "36px",
} as const;

export type IconButtonControlSizeTokenName = keyof typeof iconButtonControlSizeTokens;

export const iconButtonControlSizeTokenEntries = Object.entries(iconButtonControlSizeTokens)
  .map(([name, value]) => [Number(name) as IconButtonControlSizeTokenName, value] as const);

export const iconButtonControlSizeClassNames = {
  18: "size-rain-icon-button-control-18",
  20: "size-rain-icon-button-control-20",
  24: "size-rain-icon-button-control-24",
  28: "size-rain-icon-button-control-28",
  32: "size-rain-icon-button-control-32",
  36: "size-rain-icon-button-control-36",
} as const satisfies Record<IconButtonControlSizeTokenName, string>;

export const iconButtonComponentTokenAliases = {
  "--rain-icon-button-transition-duration": "var(--rain-motion-feedback-duration)",
  "--rain-icon-button-transition-easing": "var(--rain-motion-ease-out)",
  "--rain-icon-button-loading-mask-size": "120%",
  "--rain-icon-button-loading-duration": "var(--rain-button-loading-duration)",
  "--rain-icon-button-loading-timing-function": "var(--rain-button-loading-timing-function)",
} as const;

export const iconButtonMotionThemeMappings = {
  "--transition-duration-rain-icon-button": "var(--rain-icon-button-transition-duration)",
  "--ease-rain-icon-button": "var(--rain-icon-button-transition-easing)",
} as const;
