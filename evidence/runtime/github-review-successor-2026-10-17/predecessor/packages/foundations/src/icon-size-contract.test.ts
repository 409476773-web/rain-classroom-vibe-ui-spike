import { describe, expect, it } from "vitest";
import * as foundations from "./index";

const sizes = [4, 6, 8, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36];
const controls = [18, 20, 24, 28, 32, 36];

describe("Icon Size Foundation", () => {
  it("publishes fixed icon identities and separate component control sizes", () => {
    expect(foundations).toHaveProperty("iconSizeTokens", Object.fromEntries(sizes.map((value) => [value, {
      id: `Icon/Size/${value}`, type: "dimension", value, unit: "px", range: value <= 6 ? "micro" : "main",
    }])));
    expect(foundations).toHaveProperty("iconSizeTokenEntries", sizes.map((value) => [value, {
      id: `Icon/Size/${value}`, type: "dimension", value, unit: "px", range: value <= 6 ? "micro" : "main",
    }]));
    expect(foundations).toHaveProperty("iconSizeClassNames", Object.fromEntries(sizes.map((value) => [value, `size-rain-icon-${value}`])));
    expect(foundations).toHaveProperty("iconButtonControlSizeTokens", Object.fromEntries(controls.map((value) => [value, `${value}px`])));
    expect(foundations).toHaveProperty("iconButtonControlSizeClassNames", Object.fromEntries(controls.map((value) => [value, `size-rain-icon-button-control-${value}`])));
  });

});
