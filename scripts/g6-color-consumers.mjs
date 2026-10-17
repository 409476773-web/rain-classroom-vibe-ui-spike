import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getG6SourceBindings } from "./verification-helpers.mjs";
import { verifyCarouselColorConsumers, carouselColorSourcePaths } from "./carousel-color-consumers.mjs";
import { verifyDrawerColorConsumers, drawerColorSourcePaths } from "./drawer-color-consumers.mjs";
import { colorTokenOutputs, measureColorContrast, resolveColor, resolveColorSurface, validateColorUse } from "../packages/foundations/src/color-registry.ts";

export const g6ColorLedger = "evidence/runtime/g6-components-2026-10-14/color-consumers.json";
export const g6ComponentCssPaths = ["attachment", "drawer", "input-otp", "carousel", "bubble", "marker", "message", "message-scroller", "questionnaire"]
  .map(name => `packages/ui/src/${name}/${name}.css`);
export const g6DocumentationCssPaths = ["media", "interaction", "conversation"].map(name => `apps/playground/src/docs/components/g6-${name}-pages.css`);
export const g6CssSourcePaths = [...g6ComponentCssPaths, ...g6DocumentationCssPaths];
export const g6RuntimeColorPaths = ["aspect-ratio", "attachment", "direction", "drawer", "input-otp", "carousel", "bubble", "marker", "message", "message-scroller", "questionnaire"]
  .map(name => `packages/ui/src/${name}/${name}.${name === "direction" ? "ts" : "tsx"}`);
export const g6ColorSourcePaths = [...g6CssSourcePaths, ...g6RuntimeColorPaths];
const ledgerHash = "9974b21a397e711870f43f9c6cff4776ebd410496cf924762db418efa0852cf4";
const sha = source => createHash("sha256").update(source).digest("hex");
const key = row => JSON.stringify([row.filePath, row.selector, row.property, row.value, row.occurrence]);
const palette = new Map(colorTokenOutputs.map(token => [token.variable, token.id]));
const paintProperty = /^(?:color|background(?:-color|-image)?|border(?:-color|-(?:block|inline)(?:-start|-end)?(?:-color)?|-(?:top|right|bottom|left)(?:-color)?)?|outline(?:-color)?|box-shadow|text-shadow|opacity|filter|backdrop-filter|mask(?:-image)?|fill|stroke|-webkit-text-fill-color|scrollbar-color)$/;

// The exact nine component and three documentation CSS sources use flat blocks; retain every occurrence.
export function collectG6CssPaints(filePath, source) {
  const clean = source.replace(/\/\*[\s\S]*?\*\//g, comment => " ".repeat(comment.length));
  const rows = [], counts = new Map();
  for (const block of clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = block[1].trim().replace(/\s+/g, " ");
    const bodyStart = block.index + block[0].indexOf("{") + 1;
    for (const declaration of block[2].matchAll(/([a-zA-Z-]+)\s*:\s*([^;{}]+)(?:;|$)/g)) {
      const property = declaration[1], value = declaration[2].trim();
      if (!paintProperty.test(property) && !(property.startsWith("--") && /rain-(?:category|focus)-|currentcolor|color-mix|oklch|rgba?\(/i.test(value))) continue;
      const identity = JSON.stringify([selector, property, value]), occurrence = (counts.get(identity) ?? 0) + 1;
      counts.set(identity, occurrence);
      rows.push({ filePath, selector, property, value, occurrence,
        range: [bodyStart + declaration.index, bodyStart + declaration.index + declaration[0].length] });
    }
  }
  return rows;
}

export function collectG6UtilityPaints(filePath, source) {
  const result = [], counts = new Map();
  for (const literal of source.matchAll(/(["'`])([^"'`]*rain-category-[^"'`]*)\1/g)) {
    for (const token of literal[2].matchAll(/(?:[a-z0-9_-]+:)*(?:bg|text|border|outline|ring)-rain-category-[a-z0-9-]+/g)) {
      const className = token[0], occurrence = (counts.get(className) ?? 0) + 1;
      counts.set(className, occurrence);
      const start = literal.index + 1 + token.index;
      result.push({ filePath, className, sourceFragment: literal[0], occurrence, range: [start, start + className.length] });
    }
  }
  return result;
}
const inventory = rows => rows.map(({ range, ...row }) => row);
const utilityKey = row => JSON.stringify([row.filePath, row.className, row.sourceFragment, row.occurrence]);

export function readG6ColorConsumers(root = process.cwd()) {
  const source = readFileSync(join(root, g6ColorLedger));
  assert.equal(sha(source), ledgerHash, "G6 color ledger changed; source roles and findings cannot be reclassified silently");
  return JSON.parse(source.toString());
}

export function validateG6ColorConsumers(ledger, sources) {
  assert.equal(ledger.kind, "G6FiniteColorConsumers");
  assert.equal(ledger.scope, "g6-twelve-css-eleven-runtime-existing-token-paints");
  assert.equal(ledger.humanGate, "awaiting_human");
  assert.equal(ledger.contrastAcceptance, "not-granted");
  assert.deepEqual(Object.keys(ledger.sourceFiles).sort(), [...g6CssSourcePaths].sort());
  assert.deepEqual(Object.keys(ledger.utilitySourceFiles).sort(), [...g6RuntimeColorPaths].sort());
  assert.deepEqual(Object.keys(sources).sort(), [...g6ColorSourcePaths].sort());
  assert.deepEqual(ledger.colorRecipeConsumers, []);
  const registered = [...ledger.colorCssConsumers, ...ledger.nativeCssConsumers];
  const actual = g6CssSourcePaths.flatMap(file => collectG6CssPaints(file, sources[file]));
  assert.deepEqual(registered.map(key).sort(), actual.map(key).sort(), "G6 paint inventory must register every declaration exactly once, without extra consumers or hard replacements");
  const utilities = g6RuntimeColorPaths.flatMap(file => collectG6UtilityPaints(file, sources[file]));
  assert.deepEqual(ledger.colorUtilityConsumers.map(utilityKey).sort(), utilities.map(utilityKey).sort(), "G6 utility paint inventory requires exact source text and occurrences");
  const measurements = [], pendingContrastFindings = [], pendingEligibilityFindings = [];
  for (const row of [...ledger.colorCssConsumers, ...ledger.colorUtilityConsumers]) {
    assert.equal(row.contrastReview, "pending-review");
    assert.equal(row.use.evidenceRef, "docs/research/2026-10-14-g6-component-research.md");
    if (row.className) {
      const baseClass = row.className.split(":").at(-1);
      assert(colorTokenOutputs.some(token => token.id === row.use.tokenId && token.utilities.some(utility => utility.className === baseClass)), "G6 utility Token is missing or differs from its source");
    } else {
      const references = [...new Set([...row.value.matchAll(/var\((--rain-category-[a-z0-9-]+)/g)].map(match => match[1]))];
      assert.equal(references.length, 1, "G6 category declaration must identify its exact registered Token");
      assert.equal(palette.get(references[0]), row.use.tokenId, "G6 category Token is missing or differs from its source");
    }
    assert(row.parentSurfaces.length > 0, "G6 requires declared parent surfaces");
    for (const theme of ["light", "dark"]) for (const parentSurfaceId of row.parentSurfaces) {
      const use = { ...row.use, theme, parentSurfaceId, parentBackgroundId: "Background/Neutral/1" };
      const foreground = resolveColor(use.tokenId, theme), parent = resolveColorSurface(parentSurfaceId, theme, use.parentBackgroundId);
      const minimum = use.content === "text" ? 4.5 : ["large-text", "meaningful-icon", "essential-boundary"].includes(use.content) ? 3 : 0;
      const actualContrast = minimum ? measureColorContrast(foreground, parent) : null;
      const measurement = { filePath: row.filePath, selector: row.selector ?? row.className, property: row.property ?? use.property, recipeId: use.recipeId,
        tokenId: use.tokenId, content: use.content, interaction: use.interaction, critical: use.critical,
        theme, parentSurfaceId, parentBackgroundId: use.parentBackgroundId,
        actual: actualContrast, minimum, meetsMinimum: actualContrast === null ? null : actualContrast >= minimum,
        status: actualContrast !== null && actualContrast < minimum ? "measured-below-minimum" : "declared-pairing-runtime-unproved",
        acceptedException: false, evidenceRef: use.evidenceRef, measurementScope: row.measurementScope };
      measurements.push(measurement);
      if (actualContrast !== null && actualContrast < minimum) pendingContrastFindings.push(measurement);
      try { validateColorUse(use); }
      catch (error) {
        if (/^Insufficient contrast:/.test(error.message)) continue;
        pendingEligibilityFindings.push({ ...measurement, reason: error.message });
      }
    }
  }
  for (const row of ledger.nativeCssConsumers) {
    assert.equal(row.contrastReview, "runtime-unproved");
    assert(["native-system", "inherited-focus", "authored-effect", "nonpalette-paint"].includes(row.role));
    assert(!/--rain-category-/.test(row.value), "G6 category paints cannot hide in native registration");
  }
  return { ...ledger, registrationStatus: "verified-finite-declarations",
    contrastStatus: pendingContrastFindings.length ? "known-measured-failures-and-unproved-runtime" : "declared-pairings-runtime-unproved",
    measurements, pendingContrastFindings, pendingEligibilityFindings,
    pendingPaintObservations: ledger.nativeCssConsumers.map(row => ({ ...row, acceptedException: false, status: "runtime-unproved" })) };
}

export function verifyG6ColorConsumers(root = process.cwd()) {
  const ledger = readG6ColorConsumers(root), sources = {};
  const bindings = getG6SourceBindings(root), carouselUpgrade = bindings?.carouselUpgrade, drawerRefinement = bindings?.drawerRefinement;
  if (bindings?.closeoutSuccessor) {
    const original = verifyG6ColorConsumers(join(root, "evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/predecessor"));
    return { ...original, historicalMeasurementsOnly: true, currentPaintReview: "exact-inventory-runtime-unproved" };
  }
  const readSource = path => {
    if (carouselUpgrade?.sourceFiles[path]) return readFileSync(join(drawerRefinement?.predecessorRoot ?? root, carouselUpgrade.sourceFiles[path].beforeSnapshot));
    return readFileSync(join(root, drawerRefinement?.sourceFiles[path]?.beforeSnapshot ?? path));
  };
  for (const path of g6ColorSourcePaths) {
    const bytes = readSource(path);
    sources[path] = bytes.toString();
    const css = g6CssSourcePaths.includes(path);
    const rows = css ? collectG6CssPaints(path, sources[path]) : collectG6UtilityPaints(path, sources[path]);
    assert.equal(sha(JSON.stringify(inventory(rows))), (css ? ledger.sourceFiles : ledger.utilitySourceFiles)[path], "G6 exact paint source changed: " + path);
  }
  for (const fixture of ledger.mediaFixtures) {
    const source = readSource(fixture.filePath).toString();
    assert.equal(source.split(fixture.sourceFragment).length, 2, "G6 owned media fixture changed: " + fixture.filePath);
    assert.equal(fixture.uiPalette, false);
    assert.equal(fixture.classification, "host-owned-media-fixture-not-interface-palette");
  }
  const original = validateG6ColorConsumers(ledger, sources);
  const carousel = carouselUpgrade ? verifyCarouselColorConsumers(root, carouselUpgrade) : null;
  const drawer = drawerRefinement ? verifyDrawerColorConsumers(root, drawerRefinement) : null;
  const successors = [carousel, drawer].filter(Boolean);
  if (!successors.length) return original;
  return { ...original, carouselUpgrade: carousel, drawerRefinement: drawer,
    currentColorSourcePaths: [...new Set([...g6ColorSourcePaths, ...(carousel ? carouselColorSourcePaths : []), ...(drawer ? drawerColorSourcePaths : [])])],
    measurements: [original, ...successors].flatMap(result => result.measurements),
    pendingContrastFindings: [original, ...successors].flatMap(result => result.pendingContrastFindings),
    pendingEligibilityFindings: [original, ...successors].flatMap(result => result.pendingEligibilityFindings),
    pendingPaintObservations: [original, ...successors].flatMap(result => result.pendingPaintObservations) };
}

export function getG6CssConsumers(root = process.cwd()) { return readG6ColorConsumers(root).colorCssConsumers; }

// Strip only already-registered native/focus/effect declarations before the generic category validator.
export function prepareG6NativePaints(filePath, source, root = process.cwd()) {
  assert(g6CssSourcePaths.includes(filePath), "G6 native preparation requires an exact source path");
  const ledger = readG6ColorConsumers(root);
  const expected = ledger.nativeCssConsumers.filter(row => row.filePath === filePath);
  const rows = collectG6CssPaints(filePath, source), wanted = new Set(expected.map(key));
  const matched = rows.filter(row => wanted.has(key(row)));
  assert.deepEqual(matched.map(key).sort(), expected.map(key).sort(), "G6 native/focus/effect paint changed: " + filePath);
  for (const [start, end] of matched.map(row => row.range).reverse()) source = source.slice(0, start) + " ".repeat(end - start) + source.slice(end);
  return source;
}

export function prepareG6UtilityPaints(filePath, source, root = process.cwd()) {
  assert(g6RuntimeColorPaths.includes(filePath), "G6 utility preparation requires an exact source path");
  const expected = readG6ColorConsumers(root).colorUtilityConsumers.filter(row => row.filePath === filePath);
  const rows = collectG6UtilityPaints(filePath, source);
  assert.deepEqual(rows.map(utilityKey), expected.map(utilityKey), "G6 utility paint changed: " + filePath);
  for (const [start, end] of rows.map(row => row.range).reverse()) source = source.slice(0, start) + " ".repeat(end - start) + source.slice(end);
  return source;
}
