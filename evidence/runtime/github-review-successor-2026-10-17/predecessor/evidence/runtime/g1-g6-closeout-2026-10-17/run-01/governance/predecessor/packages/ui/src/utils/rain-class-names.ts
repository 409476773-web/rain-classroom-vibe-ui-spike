import { extendTailwindMerge } from "tailwind-merge";
import { typographyUtilityClassNames } from "@rain-next/foundations";

export type RainClassValue = string | false | null | undefined;

const isRainThemeValue = (value: string) => value.startsWith("rain-");
const isRainTypeSize = (value: string) =>
  /^rain-(?:ui|reading|data|button-(?:mini|small|medium|large|xl)(?:-(?:leading|trailing)-icon)?|button-text-(?:small|compact|regular)(?:-(?:leading|trailing)-icon)?|input(?:-clear)?)$/.test(
    value,
  );

const mergeRainClasses = extendTailwindMerge<"rain-focus-bridge" | "rain-typography-preset" | "rain-font-size">({
  extend: {
    classGroups: {
      "rain-typography-preset": Object.values(typographyUtilityClassNames.preset),
      // Independent sizes do not reset a previously selected line height.
      "rain-font-size": Object.values(typographyUtilityClassNames.fontSize),
      "border-w": [
        { border: ["rain-button", "rain-button-text", "rain-input", (value: string) => /^rain-line-[1-6]$/.test(value)] },
      ],
      duration: [{ duration: [isRainThemeValue] }],
      "rain-focus-bridge": [
        { "focus-rain": ["button", "button-text"] },
      ],
      opacity: [{ opacity: [isRainThemeValue] }],
      "outline-offset": [
        {
          "outline-offset": [
            "rain-focus",
            "rain-button-focus",
            "rain-button-text-focus",
          ],
        },
      ],
      "outline-w": [
        {
          outline: [
            "rain-focus",
            "rain-button-focus",
            "rain-button-text-focus",
          ],
        },
      ],
    },
    conflictingClassGroups: {
      "rain-typography-preset": ["font-family", "font-size", "rain-font-size", "font-weight", "leading", "tracking", "fvn-normal", "fvn-figure", "fvn-spacing"],
      "rain-font-size": ["font-size"],
      "font-size": ["rain-font-size"],
    },
    theme: {
      ease: [isRainThemeValue],
      "font-weight": ["rain-regular", "rain-semibold", "rain-bold", "rain-button", "rain-button-text", "rain-input", "rain-input-count-overflow"],
      radius: [isRainThemeValue],
      spacing: [isRainThemeValue],
      text: [isRainTypeSize],
    },
  },
});

export function rainCn(...values: readonly RainClassValue[]): string {
  return mergeRainClasses(values.filter(Boolean).join(" "));
}
