import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { measureColorContrast, resolveColor, resolveColorSurface } from "../packages/foundations/src/color-registry.ts";

export const g5ColorLedger = "evidence/runtime/g5-components-2026-10-12/color-consumers.json";
export function getG5ColorConsumers(root = process.cwd()) {
  const source = readFileSync(join(root, g5ColorLedger), "utf8");
  if (createHash("sha256").update(source).digest("hex") !== "56eb522eaa2df75846531b2d7c783bc1e6133de452c886626a74799652cf10eb") throw new Error("G5 colors must retain their finite declarations, reading roles and surfaces");
  return JSON.parse(source);
}
export function verifyG5ColorSources(root = process.cwd()) {
  const ledger = getG5ColorConsumers(root);
  for (const [file, expected] of Object.entries(ledger.sourceFiles)) {
    if (createHash("sha256").update(readFileSync(join(root, file))).digest("hex") !== expected) throw new Error(`G5 color source changed: ${file}`);
  }
  return ledger;
}
export function prepareG5NativePaints(filePath, source, root = process.cwd()) {
  const rows = getG5ColorConsumers(root).nativeCssConsumers.filter(row => row.filePath === filePath);
  const clean = source.replace(/\/\*[\s\S]*?\*\//g, comment => " ".repeat(comment.length));
  const found = new Set(), ranges = [];
  for (const block of clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = block[1].trim().replace(/\s+/g, " ");
    const bodyStart = block.index + block[0].indexOf("{") + 1;
    for (const declaration of block[2].matchAll(/([a-z-]+)\s*:\s*([^;{}]+);/g)) {
      const row = rows.find(row => !found.has(row) && row.selector === selector && row.property === declaration[1] && row.value === declaration[2].trim());
      if (row) { found.add(row); ranges.push([bodyStart + declaration.index, bodyStart + declaration.index + declaration[0].length]); }
    }
  }
  if (found.size !== rows.length) throw new Error(`G5 native/platform or inherited focus paint changed: ${filePath}`);
  for (const [start, end] of ranges.reverse()) source = source.slice(0, start) + " ".repeat(end - start) + source.slice(end);
  return source;
}
export function measureG5StateContrast(ledger = getG5ColorConsumers()) {
  return ledger.colorCssConsumers.filter(row => row.requiredStateContrast).flatMap(row => ["light", "dark"].flatMap(theme => row.parentSurfaces.map(parentSurfaceId => ({
    filePath: row.filePath, selector: row.selector, tokenId: row.use.tokenId, theme, parentSurfaceId,
    actual: measureColorContrast(resolveColor(row.use.tokenId, theme), resolveColorSurface(parentSurfaceId, theme, "Background/Neutral/1")),
    minimum: row.requiredStateContrast, acceptedException: false, status: "pending-review",
  }))));
}
