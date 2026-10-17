import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { colorTokenOutputs, resolveColor, resolveColorSurface, measureColorContrast } from "../packages/foundations/src/color-registry.ts";
import { carouselUpgradeEvidence, sha256 } from "./carousel-upgrade-governance.mjs";
import { collectG6CssPaints, collectG6UtilityPaints } from "./g6-color-consumers.mjs";

export const carouselColorSourcePaths = Object.freeze([
  "packages/ui/src/carousel/carousel.css", "packages/ui/src/carousel/carousel.tsx", "packages/ui/src/carousel/carousel-playback.ts",
  "apps/playground/src/docs/components/carousel-examples.css", "apps/playground/src/docs/components/carousel-examples.tsx", "apps/playground/src/docs/components/carousel-artwork.tsx",
]);
const tokenNames = Object.freeze({
  "--rain-category-icon-neutral-3": "Icon/Neutral/3", "--rain-category-icon-neutral-2": "Icon/Neutral/2",
  "--rain-category-icon-neutral-5": "Icon/Neutral/5", "--rain-category-oncolor-1": "OnColor/1", "--rain-category-background-neutral-1": "Background/Neutral/1",
});
export const carouselGrayTokenSources = Object.freeze({
  "--rain-local-carousel-control-ink": "Icon/Neutral/3",
  "--rain-local-carousel-control-strong": "Icon/Neutral/2",
  "--rain-local-carousel-control-disabled": "Icon/Neutral/5",
  "--rain-local-carousel-control-white": "Background/Neutral/1",
});
export function resolveCarouselColor(expression, theme, variables = {}, seen = []) {
  if (expression === "transparent") return { rgb: [0, 0, 0], alpha: 0 };
  const reference = expression.match(/^var\((--[a-z0-9-]+)\)$/);
  if (reference) {
    const name = reference[1];
    if (tokenNames[name]) return resolveColor(tokenNames[name], theme);
    assert(!seen.includes(name), "Carousel color variable cycle");
    assert(Object.hasOwn(variables, name), "Unregistered Carousel color variable: " + name);
    return resolveCarouselColor(variables[name], theme, variables, [...seen, name]);
  }
  const gray = expression.match(/^rgb\(from (var\(--[a-z0-9-]+\)) g g g\)$/);
  if (gray) { const source = resolveCarouselColor(gray[1], theme, variables, seen); return { rgb: [source.rgb[1], source.rgb[1], source.rgb[1]], alpha: source.alpha }; }
  const mix = expression.match(/^color-mix\(in srgb, (var\(--[a-z0-9-]+\)) ([0-9.]+)%, (transparent|var\(--[a-z0-9-]+\))\)$/);
  if (mix) {
    const weight = Number(mix[2]) / 100; assert(weight >= 0 && weight <= 1);
    const left = resolveCarouselColor(mix[1], theme, variables, seen), right = resolveCarouselColor(mix[3], theme, variables, seen);
    const alpha = left.alpha * weight + right.alpha * (1 - weight);
    return { rgb: left.rgb.map((channel, i) => alpha ? (channel * left.alpha * weight + right.rgb[i] * right.alpha * (1 - weight)) / alpha : 0), alpha };
  }
  throw new Error("Unregistered Carousel color transform: " + expression);
}
const inventory = rows => rows.map(({ range, ...row }) => row);
export function carouselPaintInventory(path, source) {
  return path.endsWith(".css") ? inventory(collectG6CssPaints(path, source)) : inventory(collectG6UtilityPaints(path, source));
}
export function validateCarouselColorLedger(ledger, sources) {
  assert.equal(ledger.kind, "CarouselUpgradeFiniteColorConsumers");
  assert.equal(ledger.scope, "carousel-v04-public-upgrade");
  assert.equal(ledger.contrastAcceptance, "not-granted");
  assert.equal(ledger.humanGate, "awaiting_human");
  assert.deepEqual(Object.keys(ledger.sourceFiles).sort(), [...carouselColorSourcePaths].sort());
  assert.deepEqual(Object.keys(sources).sort(), [...carouselColorSourcePaths].sort());
  for (const path of carouselColorSourcePaths) {
    assert.equal(sha256(sources[path]), ledger.sourceFiles[path], "Carousel color source changed: " + path);
    assert.deepEqual(carouselPaintInventory(path, sources[path]), ledger.paintConsumers.filter(row => row.filePath === path), "Carousel paint inventory changed: " + path);
  }
  assert.deepEqual(ledger.mediaFixtures, [{ filePath: "apps/playground/src/docs/components/carousel-artwork.tsx", source: "apps/prototype/src/carousel-study/Artwork.tsx", classification: "host-owned-media-fixture-not-interface-palette", uiPalette: false }]);
  const css = sources[carouselColorSourcePaths[0]];
  const definitions = {};
  for (const match of css.matchAll(/(--rain-local-carousel-[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    if (/var\(--rain-category-|rgb\(|color-mix\(/.test(match[2])) {
      assert(!Object.hasOwn(definitions, match[1]), "Carousel color token must have one finite definition"); definitions[match[1]] = match[2].trim();
    }
  }
  assert.deepEqual(definitions, ledger.localTokenDefinitions, "Carousel local token definitions changed");
  for (const [name, token] of Object.entries(carouselGrayTokenSources)) {
    const variable = token.toLowerCase().replaceAll("/", "-");
    assert.equal(definitions[name], `rgb(from var(--rain-category-${variable}) g g g)`, "Carousel gray must retain its approved channel derivation");
  }
  const actualValues = Object.fromEntries(Object.entries(definitions).map(([name, value]) => [name,
    Object.fromEntries(["light", "dark"].map(theme => [theme, resolveCarouselColor(value, theme, definitions)]))]));
  assert.deepEqual(actualValues, ledger.resolvedLocalTokens, "Carousel measurements must use derived values, not original Neutral colors");
  assert(!/:root\b/.test(css), "Carousel local candidates must not be declared globally");
  for (const row of ledger.paintConsumers.filter(row => row.filePath === carouselColorSourcePaths[0] && row.property.startsWith("--rain-local-carousel-"))) {
    assert.equal(row.selector, ".rain-carousel", "Carousel local color candidate must stay in its component root");
  }
  for (const match of css.matchAll(/var\((--rain-local-carousel-[a-z0-9-]+)/g)) assert(Object.hasOwn(definitions, match[1]), "Unregistered Carousel local color variable: " + match[1]);
  for (const source of Object.values(sources)) for (const match of source.matchAll(/var\((--rain-category-[a-z0-9-]+)/g)) {
    assert(colorTokenOutputs.some(token => token.variable === match[1]), "Unregistered Carousel Category source: " + match[1]);
  }
  const measurements = [];
  for (const [state, foreground, background] of [
    ["default", "--rain-local-carousel-control-ink", "--rain-local-carousel-control-surface"],
    ["hover", "--rain-local-carousel-control-strong", "--rain-local-carousel-control-hover"],
    ["pressed", "--rain-local-carousel-control-strong", "--rain-local-carousel-control-pressed"],
  ]) for (const theme of ["light", "dark"]) {
    const actual = measureColorContrast(actualValues[foreground][theme], actualValues[background][theme]);
    measurements.push({ token: foreground, state, theme, content: "meaningful-icon", parentSurfaceId: background, actual, minimum: 3,
      meetsMinimum: actual >= 3, acceptedException: false, measurementScope: "declared-carousel-control-recipe-pair", status: actual < 3 ? "measured-below-minimum" : "declared-pairing-runtime-unproved" });
  }
  for (const [name, values] of Object.entries(actualValues)) {
    const content = name.endsWith("-disabled") ? "disabled" : ["--rain-local-carousel-control-ink", "--rain-local-carousel-control-strong"].includes(name) ? "meaningful-icon" : "surface";
    for (const theme of ["light", "dark"]) for (const parentSurfaceId of ["Background/Neutral/1", "Background/Neutral/3"]) {
      const actual = measureColorContrast(values[theme], resolveColorSurface(parentSurfaceId, theme));
      const minimum = content === "meaningful-icon" ? 3 : 0;
      measurements.push({ token: name, theme, content, parentSurfaceId, actual, minimum, meetsMinimum: minimum ? actual >= minimum : null,
        acceptedException: false, status: minimum && actual < minimum ? "measured-below-minimum" : "declared-pairing-runtime-unproved" });
    }
  }
  return { ...ledger, measurements, pendingContrastFindings: measurements.filter(row => row.minimum && !row.meetsMinimum), pendingEligibilityFindings: [],
    pendingPaintObservations: [{ role: "media-overlay", status: "runtime-unproved", acceptedException: false,
      reason: "Overlay controls depend on the actual host media; neutral-surface measurements are not media contrast acceptance." }] };
}
export function verifyCarouselColorConsumers(root = process.cwd(), bindings) {
  assert(bindings?.scope === "carousel-v04-public-upgrade", "Carousel colors require verified successor bindings");
  const path = carouselUpgradeEvidence + "color-consumers.json", bytes = readFileSync(join(root, path));
  assert.equal(sha256(bytes), bindings.evidenceFiles[path], "Carousel color ledger changed");
  const sources = Object.fromEntries(carouselColorSourcePaths.map(path => [path, readFileSync(join(root, path), "utf8")]));
  return validateCarouselColorLedger(JSON.parse(bytes), sources);
}
