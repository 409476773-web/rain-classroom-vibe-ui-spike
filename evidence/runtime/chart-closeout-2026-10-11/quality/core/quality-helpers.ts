import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Locator } from "@playwright/test";
import { contrastRatio } from "../../../../../tests/e2e/color-contrast";

export const run = resolve("evidence/runtime/chart-closeout-2026-10-11/quality/core", process.env.RAIN_QUALITY_RUN ?? "run-01");
export async function sourceHashes() {
  const baseline: { path: string; sha256: string }[] = JSON.parse(await readFile("evidence/runtime/chart-closeout-2026-10-11/baseline-files.json", "utf8"));
  const paths = baseline.map(row => row.path).filter(path => /^(packages\/ui\/src\/charts\/|apps\/playground\/src\/docs\/components\/chart)/.test(path) && /\.(tsx?|css|json)$/.test(path) && !path.includes(".test."));
  return Promise.all(paths.map(async path => ({ path, sha256: createHash("sha256").update(await readFile(path, "utf8")).digest("hex") })));
}
export async function save(name: string, value: unknown) {
  await mkdir(run, { recursive: true });
  await writeFile(resolve(run, `${name}.json`), JSON.stringify(value, null, 2));
}
export async function paintReadings(elements: Locator) {
  const readings = await elements.evaluateAll(nodes => nodes.filter(node => {
    const box = node.getBoundingClientRect(), css = getComputedStyle(node);
    return box.width > 0 && box.height > 0 && css.visibility !== "hidden" && css.display !== "none" && Number(css.opacity) > 0;
  }).map(node => {
    const css = getComputedStyle(node), svg = node.namespaceURI === "http://www.w3.org/2000/svg";
    let surface: Element | null = node.parentElement;
    const chain: { tag: string; background: string; opacity: string }[] = [];
    let background = "rgb(255, 255, 255)";
    while (surface) {
      const style = getComputedStyle(surface);
      chain.push({ tag: surface.tagName, background: style.backgroundColor, opacity: style.opacity });
      if (style.backgroundColor !== "rgba(0, 0, 0, 0)" && style.backgroundColor !== "transparent") { background = style.backgroundColor; break; }
      surface = surface.parentElement;
    }
    return { text: node.textContent, foreground: svg ? css.fill : css.color, background, fontSize: css.fontSize, fontWeight: css.fontWeight, opacity: css.opacity, chain };
  }));
  return readings.map(reading => ({ ...reading, ratio: contrastRatio(reading.foreground, reading.background) }));
}

/** Observation only: distinguish solid underlays from gradients/patterns/alpha before measuring. */
export async function renderedTextAudit(elements: Locator) {
  const readings = await elements.evaluateAll(nodes => nodes.filter(node => {
    const box = node.getBoundingClientRect(), css = getComputedStyle(node);
    return !!node.textContent?.trim() && box.width > 0 && box.height > 0 && css.visibility !== "hidden" && css.display !== "none" && Number(css.opacity) > 0;
  }).map(node => {
    const css = getComputedStyle(node), box = node.getBoundingClientRect();
    const isSvg = node.namespaceURI === "http://www.w3.org/2000/svg";
    const ancestorPaints: { tag: string; background: string; opacity: string }[] = [];
    let surface: Element | null = node, background = "rgb(255, 255, 255)", effectiveOpacity = 1;
    while (surface) {
      const style = getComputedStyle(surface);
      effectiveOpacity *= Number(style.opacity);
      ancestorPaints.push({ tag: surface.tagName, background: style.backgroundColor, opacity: style.opacity });
      if (style.backgroundColor !== "rgba(0, 0, 0, 0)" && style.backgroundColor !== "transparent") { background = style.backgroundColor; break; }
      surface = surface.parentElement;
    }
    const underlays: { tag: string; fill: string; fillOpacity: string; opacity: string }[] = [];
    const svg = isSvg ? node.closest("svg") : null;
    if (svg) for (const shape of svg.querySelectorAll("path,rect,circle,ellipse,polygon")) {
      if (shape.closest("defs,pattern,clipPath,mask") || !(shape.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
      const style = getComputedStyle(shape);
      if (style.fill === "none" || Number(style.opacity) === 0 || Number(style.fillOpacity) === 0) continue;
      const geometry = shape as SVGGeometryElement, matrix = geometry.getScreenCTM();
      if (!matrix || typeof geometry.isPointInFill !== "function") continue;
      const point = new DOMPoint(box.x + box.width / 2, box.y + box.height / 2).matrixTransform(matrix.inverse());
      if (geometry.isPointInFill(point)) underlays.push({ tag: shape.tagName, fill: style.fill, fillOpacity: style.fillOpacity, opacity: style.opacity });
    }
    const topUnderlay = underlays.at(-1);
    const solid = !topUnderlay || (/^(rgb|color\(srgb)/.test(topUnderlay.fill) && Number(topUnderlay.fillOpacity) === 1 && Number(topUnderlay.opacity) === 1);
    return { text: node.textContent!.trim(), tag: node.tagName, classes: node.getAttribute("class"), foreground: isSvg ? css.fill : css.color, domBackground: background,
      background: solid && topUnderlay ? topUnderlay.fill : background, resolution: solid && effectiveOpacity === 1 ? "opaque-solid" : "gradient-pattern-alpha-or-fade-needs-review",
      effectiveOpacity, fontSize: css.fontSize, fontWeight: css.fontWeight, underlays, ancestorPaints };
  }));
  return readings.map(reading => ({ ...reading, ratio: reading.resolution === "opaque-solid" && /^(rgb|color\(srgb)/.test(reading.foreground) ? contrastRatio(reading.foreground, reading.background) : null }));
}
