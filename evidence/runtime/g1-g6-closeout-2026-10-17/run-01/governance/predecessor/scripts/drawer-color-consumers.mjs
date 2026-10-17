import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseSync } from "vite";
import { colorTokenOutputs, measureColorContrast, resolveColor, resolveColorSurface, validateColorUse } from "../packages/foundations/src/color-registry.ts";
import { collectG6CssPaints, collectG6UtilityPaints } from "./g6-color-consumers.mjs";

const evidence = "evidence/runtime/drawer-refinement-2026-10-14/";
export const drawerColorLedger = evidence + "color-consumers.json";
export const drawerColorBaseline = Object.freeze({ path: evidence + "baseline.json", sha256: "b3877e428237f8a8619b8be708f62acb1f1ef97fbcac41c7aa9d84b1046fcca2" });
export const drawerOriginalColorLedger = Object.freeze({ path: "evidence/runtime/g6-components-2026-10-14/color-consumers.json", sha256: "9974b21a397e711870f43f9c6cff4776ebd410496cf924762db418efa0852cf4" });
export const drawerColorSourcePaths = Object.freeze([
  "packages/ui/src/drawer/drawer.css", "apps/playground/src/docs/components/g6-interaction-pages.css",
  "apps/playground/src/docs/components/g6-task-drawer.css", "packages/ui/src/drawer/drawer.tsx",
  "apps/playground/src/docs/components/g6-task-drawer.tsx",
]);
const taskCss = drawerColorSourcePaths[2];
const sha = source => createHash("sha256").update(source).digest("hex");
const key = row => JSON.stringify([row.filePath, row.selector ?? row.className, row.property, row.value ?? row.sourceFragment, row.occurrence]);
const palette = new Map(colorTokenOutputs.map(token => [token.variable, token.id]));
const tokens = "docs/plans/2026-10-14-drawer-refinement.md";
const nativeScope = "exact source registration only; no native/effect/group-opacity contrast acceptance";
const categoryUse = (selector, property, tokenId, role, content) => ({
  filePath: taskCss, selector, property, occurrence: 1,
  value: property === "color" ? "var(--rain-category-text-neutral-3)" : "var(--rain-line-thickness-1) solid var(--rain-category-border-neutral-3)",
  parentSurfaces: ["Background/Neutral/1"], contrastReview: "pending-review",
  use: { tokenId, role, property: property === "color" ? "color" : "border-color", content, context: property === "color" ? "page" : "local-recipe",
    recipeId: "drawer-task-" + (selector === ".g6-task-demo-note" ? "note" : selector === ".g6-task-header" ? "header" : "footer"),
    evidenceRef: tokens, interaction: "non-interactive", critical: false },
  reason: property === "color" ? "Auxiliary readable note on the explicit DocExample preview surface; text retains the 4.5:1 threshold."
    : "Redundant section separator, not an essential boundary or sole scroll/state cue; a future essential use requires 3:1 review.",
  measurementScope: "static declared Background/Neutral/1 pairing in each theme; ancestor opacity, nested brightness, motion, forced colors and user overrides unproved",
});
const addedConsumers = Object.freeze([
  categoryUse(".g6-task-demo-note", "color", "Text/Neutral/3", "text", "text"),
  categoryUse(".g6-task-header", "border-bottom", "Border/Neutral/3", "border", "decorative"),
  categoryUse(".g6-task-footer", "border-top", "Border/Neutral/3", "border", "decorative"),
  { filePath: taskCss, selector: ".g6-task-reading", property: "outline", value: "none", occurrence: 1, role: "nonpalette-paint",
    contrastReview: "runtime-unproved", measurementScope: nativeScope,
    reason: "Programmatically focused preview article with tabIndex=-1 and no action; not a Tab stop. This exception does not extend to controls or establish keyboard focus visibility." },
]);
const removedConsumer = { filePath: drawerColorSourcePaths[0], selector: ".rain-drawer__overlay", property: "backdrop-filter", value: "blur(4px)", occurrence: 1 };
function metadata(row) {
  const { filePath, selector, property, value, occurrence, className, sourceFragment, range, ...rest } = row;
  return { classification: row.use ? "category-token" : row.role, ...rest };
}
function paintRows(path, source) {
  if (source === null) return [];
  return (path.endsWith(".css") ? collectG6CssPaints(path, source) : collectG6UtilityPaints(path, source))
    .map(row => ({ ...row, sourceHash: sha(source), declarationHash: sha(source.slice(...row.range)) }));
}
function exactSources(sources) {
  assert.deepEqual(Object.keys(sources).sort(), [...drawerColorSourcePaths].sort(), "Drawer color sources must remain the finite three CSS and two runtime files");
}
function runtimePaintSurface(path, source) {
  if (source === null) return [];
  const parsed = parseSync(path, source), styles = [];
  assert.equal(parsed.errors.length, 0, "Drawer runtime paint source must parse");
  function visit(node) {
    if (!node || typeof node !== "object") return;
    if (node.type === "JSXAttribute" && node.name?.name === "style") styles.push(source.slice(node.start, node.end));
    const literal = node.type === "Literal" ? node.value : node.type === "TemplateElement" ? node.value.raw : null;
    if (typeof literal === "string") assert(!/(?:^|\s)(?:[a-z0-9_-]+:)*(?:bg|text|border|outline|ring|fill|stroke|shadow|opacity|backdrop|filter)-[a-z0-9\[]/i.test(literal), "Drawer finite runtime source cannot add undeclared paint utilities");
    for (const value of Object.values(node)) if (value && typeof value === "object") {
      if (Array.isArray(value)) value.forEach(visit); else visit(value);
    }
  }
  visit(parsed.program);
  return styles;
}

export function buildDrawerColorLedger(sources, beforeSources, baseline, originalLedger) {
  exactSources(sources); exactSources(beforeSources);
  const originalRows = [...originalLedger.colorCssConsumers, ...originalLedger.nativeCssConsumers, ...originalLedger.colorUtilityConsumers];
  const original = new Map(originalRows.map(row => [key(row), row])), added = new Map(addedConsumers.map(row => [key(row), row]));
  const sourceFiles = {}, paintChanges = [];
  for (const path of drawerColorSourcePaths) {
    assert.equal(typeof sources[path], "string", "Drawer current color source must exist");
    const record = baseline.sourceFiles[path];
    if (record) {
      assert.equal(record.snapshot, evidence + "before/" + path, "Drawer color snapshot must use its frozen observation");
      assert.equal(sha(beforeSources[path]), record.before, "Drawer color before source changed: " + path);
    } else assert.equal(beforeSources[path], null, "New Drawer color sources must have no invented predecessor");
    if (path.endsWith(".tsx")) assert.deepEqual(runtimePaintSurface(path, sources[path]), runtimePaintSurface(path, beforeSources[path]),
      "Drawer runtime must preserve existing style forwarding and cannot add inline paint");
    sourceFiles[path] = { before: record?.before ?? null, beforeSnapshot: record?.snapshot ?? null, after: sha(sources[path]) };
    const before = paintRows(path, beforeSources[path]), after = paintRows(path, sources[path]);
    const remaining = new Map(after.map(row => [key(row), row]));
    for (const row of before) {
      const old = original.get(key(row));
      assert(old, "Drawer before paint must retain its original G6 classification: " + key(row));
      const next = remaining.get(key(row)) ?? null;
      if (!next) assert.equal(key(row), key(removedConsumer), "Drawer cannot remove unrelated retained paint: " + key(row));
      remaining.delete(key(row));
      paintChanges.push({ id: sha(key(row)), change: next ? "retained" : "removed", before: row, after: next, ...metadata(old) });
    }
    for (const row of remaining.values()) {
      const declared = added.get(key(row));
      assert(declared, "Drawer new paint consumer is outside its finite contract: " + key(row));
      paintChanges.push({ id: sha(key(row)), change: "added", before: null, after: row, ...metadata(declared) });
      added.delete(key(row));
    }
  }
  assert.equal(added.size, 0, "Drawer must retain all four new paint declarations");
  assert.equal(paintChanges.filter(row => row.change === "removed").length, 1, "Drawer must record removal of the backdrop blur");
  const measurements = [], pendingEligibilityFindings = [], pendingPaintObservations = [];
  for (const row of paintChanges.filter(row => row.after)) {
    const paint = row.after;
    if (!row.use) {
      assert(!/--rain-category-/.test(paint.value ?? ""), "Drawer category paint cannot hide in native registration");
      pendingPaintObservations.push({ paintId: row.id, filePath: paint.filePath, selector: paint.selector, property: paint.property,
        range: paint.range, declarationHash: paint.declarationHash, role: row.role, status: "runtime-unproved", acceptedException: false,
        measurementScope: row.measurementScope, ...(row.reason ? { reason: row.reason } : {}) });
      continue;
    }
    const references = [...new Set([...paint.value.matchAll(/var\((--rain-category-[a-z0-9-]+)/g)].map(match => match[1]))];
    assert.equal(references.length, 1, "Drawer paint must declare its exact Category Token");
    assert.equal(palette.get(references[0]), row.use.tokenId, "Drawer Category source must match its declared role");
    assert.equal(row.contrastReview, "pending-review");
    assert(row.parentSurfaces.length > 0, "Drawer color use needs explicit parent surfaces");
    for (const theme of ["light", "dark"]) for (const parentSurfaceId of row.parentSurfaces) {
      const use = { ...row.use, theme, parentSurfaceId, parentBackgroundId: "Background/Neutral/1" };
      const foreground = resolveColor(use.tokenId, theme), background = resolveColorSurface(parentSurfaceId, theme, use.parentBackgroundId);
      const minimum = use.content === "text" ? 4.5 : ["large-text", "meaningful-icon", "essential-boundary"].includes(use.content) ? 3 : 0;
      const actual = measureColorContrast(foreground, background);
      const measurement = { paintId: row.id, filePath: paint.filePath, selector: paint.selector, property: paint.property,
        range: paint.range, declarationHash: paint.declarationHash, tokenId: use.tokenId, role: use.role, content: use.content,
        recipeId: use.recipeId, interaction: use.interaction, critical: use.critical, theme, parentSurfaceId,
        parentBackgroundId: use.parentBackgroundId, actual, minimum, meetsMinimum: minimum ? actual >= minimum : null,
        status: minimum && actual < minimum ? "measured-below-minimum" : "declared-pairing-runtime-unproved", acceptedException: false,
        evidenceRef: use.evidenceRef, measurementScope: row.measurementScope };
      measurements.push(measurement);
      try { validateColorUse(use); }
      catch (error) { if (!/^Insufficient contrast:/.test(error.message)) pendingEligibilityFindings.push({ ...measurement, reason: error.message }); }
    }
  }
  return { kind: "DrawerRefinementFiniteColorConsumers", scope: "drawer-three-css-two-runtime-paint-delta",
    humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "unpublished",
    baseline: drawerColorBaseline, originalColorLedger: drawerOriginalColorLedger, sourceFiles, paintChanges, measurements,
    pendingContrastFindings: measurements.filter(row => row.minimum && !row.meetsMinimum), pendingEligibilityFindings, pendingPaintObservations };
}

export function validateDrawerColorLedger(ledger, sources, beforeSources, baseline, originalLedger) {
  const expected = buildDrawerColorLedger(sources, beforeSources, baseline, originalLedger);
  assert.deepEqual(ledger, expected, "Drawer ledger must preserve exact sources, paint ranges, roles and recomputed measurements");
  return { ...ledger, registrationStatus: "verified-finite-declarations", sourceChainStatus: "not-evaluated-by-color-verifier",
    contrastStatus: ledger.pendingContrastFindings.length ? "known-measured-failures-and-unproved-runtime" : "declared-pairings-runtime-unproved" };
}

export function verifyDrawerColorConsumers(root = process.cwd(), bindings) {
  const ledgerBytes = readFileSync(join(root, drawerColorLedger));
  if (bindings) {
    assert.equal(bindings.scope, "drawer-container-and-task-examples-only", "Drawer colors require the exact successor scope");
    assert.equal(sha(ledgerBytes), bindings.evidenceFiles[drawerColorLedger], "Drawer color ledger changed from supplied successor bindings");
  }
  const readProof = ({ path, sha256 }) => {
    const bytes = readFileSync(join(root, path)); assert.equal(sha(bytes), sha256, "Drawer original color proof changed: " + path); return JSON.parse(bytes.toString());
  };
  const baseline = readProof(drawerColorBaseline), original = readProof(drawerOriginalColorLedger);
  const sources = Object.fromEntries(drawerColorSourcePaths.map(path => [path, readFileSync(join(root, path), "utf8")]));
  const before = Object.fromEntries(drawerColorSourcePaths.map(path => [path, baseline.sourceFiles[path] ? readFileSync(join(root, baseline.sourceFiles[path].snapshot), "utf8") : null]));
  const verified = validateDrawerColorLedger(JSON.parse(ledgerBytes.toString()), sources, before, baseline, original);
  if (bindings) for (const path of drawerColorSourcePaths)
    assert.equal(bindings.sourceFiles?.[path]?.after, verified.sourceFiles[path].after, "Drawer color source binding changed: " + path);
  return verified;
}
