import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { measureColorContrast, resolveColor } from "../packages/foundations/src/color-registry";
import { resolveCarouselColor } from "./carousel-color-consumers.mjs";

it("measures the accepted gray channel transform independently of the original blue Neutral", () => {
  for (const theme of ["light", "dark"] as const) {
    const source = resolveColor("Icon/Neutral/3", theme);
    const gray = resolveCarouselColor("rgb(from var(--rain-category-icon-neutral-3) g g g)", theme);
    expect(gray).toEqual({ rgb: [source.rgb[1], source.rgb[1], source.rgb[1]], alpha: source.alpha });
    expect(gray.rgb[0]).toBe(gray.rgb[2]);
  }
});
it("resolves declared hover alpha without replacing the measured foreground", () => {
  const gray = "rgb(from var(--rain-category-icon-neutral-3) g g g)";
  const result = resolveCarouselColor("color-mix(in srgb, var(--rain-local-carousel-control-ink) 8%, transparent)", "light", { "--rain-local-carousel-control-ink": gray });
  expect(result.rgb).toEqual([133, 133, 133]); expect(result.alpha).toBeCloseTo(.08);
});
it("rejects raw replacements, unknown variables, unsupported transforms and cycles", () => {
  for (const expression of ["#858585", "var(--unregistered)", "rgb(from var(--rain-category-icon-neutral-3) r g b)"]) expect(() => resolveCarouselColor(expression, "light")).toThrow();
  expect(() => resolveCarouselColor("var(--cycle)", "light", { "--cycle": "var(--cycle)" })).toThrow(/cycle/);
});

it("keeps the actual default, hover and pressed icon recipes above 3:1 in both themes", () => {
  const css = readFileSync("packages/ui/src/carousel/carousel.css", "utf8"), variables: Record<string, string> = {};
  for (const match of css.matchAll(/(--rain-local-carousel-[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    const [, name, value] = match;
    if (name && value && /var\(--rain-category-|rgb\(|color-mix\(/.test(value)) variables[name] = value.trim();
  }
  for (const theme of ["light", "dark"] as const) for (const [foreground, background] of [["ink", "surface"], ["strong", "hover"], ["strong", "pressed"]]) {
    const front = resolveCarouselColor(variables["--rain-local-carousel-control-" + foreground], theme, variables);
    const back = resolveCarouselColor(variables["--rain-local-carousel-control-" + background], theme, variables);
    expect(measureColorContrast(front, back)).toBeGreaterThanOrEqual(3);
  }
});
