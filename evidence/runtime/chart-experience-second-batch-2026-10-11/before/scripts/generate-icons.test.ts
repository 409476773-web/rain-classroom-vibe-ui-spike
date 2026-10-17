import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { analyzeSvg, buildIconArtifacts, buildInventory, classifyIcon, deriveGradingIcon, iconExportName, validateInventory } from "./generate-icons.mjs";

const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><mask id="shape" style="mask-type:luminance"><rect width="24" height="24" fill="white"/></mask><g mask="url(#shape)"><path d="M2 2h20v20H2z" fill="#1D2129"/></g></svg>';
const source = { name: "icon/arrow-down", nodeId: "63:76", componentKey: "a".repeat(40), canvas: [24, 24], paints: [{ type: "SOLID", variableId: "VariableID:431:30" }] };

describe("source-faithful icon generation", () => {
  it("adds the approved non-component grading rings while preserving their foreground geometry and original source", () => {
    const inventory = buildInventory();
    const additions = inventory.icons.filter((icon: { assetId: string }) => icon.assetId.startsWith("icon/grading-"));
    expect(additions.map((icon: { assetId: string }) => icon.assetId)).toEqual(["icon/grading-pending", "icon/grading-reviewed"]);
    expect(inventory.source.count).toBe(897);
    expect(inventory.icons).toHaveLength(899);
    expect(validateInventory(inventory)).toEqual([]);
    const files = buildIconArtifacts(inventory);
    const catalog = JSON.parse(files.get("packages/foundations/src/icons/catalog.generated.ts").match(/export const iconCatalog: readonly IconCatalogEntry\[\] = ([\s\S]+);\n$/)[1]);
    const manifest = JSON.parse(files.get("manifests/icons.json"));
    expect(manifest.sourceAdditions).toMatchObject({ evidence: "evidence/icons/source-additions.json", count: 2, humanGate: "not-evaluated", canvas: [12, 12] });
    for (const icon of additions) {
      expect(icon).toMatchObject({ componentKey: null, canvas: [12, 12], viewBox: "0 0 12 12", rendering: "svg-mask", colorMode: "host", source: { fileKey: "MbWg1ft5zk1JRQiQ6dS30e", kind: "non-component" } });
      const original = readFileSync(resolve(icon.sourceExport.path), "utf8");
      const derived = files.get(icon.runtime.assetPath).toString();
      const originalPaths = [...original.matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*\bfill="([^"]+)"/g)];
      expect(originalPaths).toHaveLength(2);
      expect(originalPaths[0]![2]).toBe("white");
      const derivedPaths = [...derived.matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*\bfill="([^"]+)"/g)];
      expect(derivedPaths.map((path) => [path[1], path[2]])).toEqual([[originalPaths[1]![1], "currentColor"]]);
      expect(analyzeSvg(derived)).toMatchObject({ viewBox: "0 0 12 12", visiblePaints: ["currentcolor"], reviewReasons: [] });
      expect(catalog.find((item: { assetId: string }) => item.assetId === icon.assetId).source).toMatchObject({ fileKey: icon.source.fileKey, nodeId: icon.source.nodeId, foregroundNodeId: icon.source.foregroundNodeId, componentKey: null });
      expect(() => deriveGradingIcon(original.replace('fill="white"', 'fill="#1561F8"'))).toThrow(/backing\/foreground/);
      expect(() => deriveGradingIcon(original.replace('viewBox="0 0 12 12"', 'viewBox="0 0 24 24"'))).toThrow(/backing\/foreground/);
    }
    expect(validateInventory({ ...inventory, icons: inventory.icons.map((icon: { assetId: string }) => icon.assetId === additions[0].assetId ? { ...icon, componentKey: "a".repeat(40) } : icon) })).toContain("unapproved supplementary source: icon/grading-pending");
  });

  it("separates visible foreground from white mask data without changing SVG bytes", () => {
    const result = analyzeSvg(svg);
    expect(result.visiblePaints).toEqual(["#1d2129"]);
    expect(result.ids).toEqual(["shape"]);
    expect(classifyIcon(source, result)).toMatchObject({ colorMode: "host", rendering: "svg-mask" });
  });

  it("requires an explicit reviewed decision for a non-semantic source palette", () => {
    const analysis = analyzeSvg(svg.replace('#1D2129', '#ff0000'));
    expect(() => classifyIcon(source, analysis)).toThrow(/color decision/);
    expect(classifyIcon(source, analysis, { colorMode: "intrinsic", reason: "Source palette reviewed" })).toMatchObject({ colorMode: "intrinsic", rendering: "image" });
  });

  it("recognizes the canonical angular loading as a PNG alpha mask candidate", () => {
    const analysis = analyzeSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><foreignObject width="24" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="background:conic-gradient(transparent,white)"/></foreignObject></svg>');
    expect(classifyIcon({ ...source, name: "icon/button-loading", nodeId: "207:33" }, analysis)).toMatchObject({ colorMode: "host", rendering: "png-mask" });
  });

  it("rejects broken local references and active or remote SVG content", () => {
    expect(() => analyzeSvg(svg.replace('url(#shape)', 'url(#missing)'))).toThrow(/reference/);
    expect(() => analyzeSvg(svg.replace('</svg>', '<script>alert(1)</script></svg>'))).toThrow(/active/);
    expect(() => analyzeSvg(svg.replace('</svg>', '<image href="https://example.com/icon.png"/></svg>'))).toThrow(/external/);
  });

  it.each(["M1 1Lnan nanZ", "M1 1LInfinity 2Z", "M1 1L1e999 2Z"])("rejects non-finite source geometry before a renderer silently truncates it: %s", (path) => {
    expect(() => analyzeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${path}" fill="#1D2129"/></svg>`)).toThrow(/non-finite SVG geometry/);
  });

  it("requires review for referenced paints instead of recoloring a use element from its own fill", () => {
    const analysis = analyzeSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><g id="paint"><path fill="#ff0000" d="M0 0H12V24H0Z"/><path fill="#1d2129" d="M12 0H24V24H12Z"/></g></defs><use href="#paint" fill="#1d2129"/></svg>');
    expect(() => classifyIcon(source, analysis)).toThrow(/color decision required.*referenced-paint:use/);
    expect(analysis.reviewReasons).toContain("referenced-paint:use");
    expect(classifyIcon(source, analysis, { colorMode: "intrinsic", reason: "Referenced palette reviewed" })).toMatchObject({ colorMode: "intrinsic", rendering: "image" });
  });

  it("requires review for filter paint that can add colors outside path attributes", () => {
    const analysis = analyzeSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><filter id="red"><feFlood flood-color="red"/></filter></defs><path filter="url(#red)" fill="#1d2129" d="M0 0H24V24H0Z"/></svg>');
    expect(() => classifyIcon(source, analysis)).toThrow(/color decision required.*filter/);
  });

  it.each([
    '<style>.brand{fill:red}</style><path class="brand" fill="#1d2129"/>',
    '<style>@import url(https://example.invalid/external.css);</style>',
    '<style>@font-face{font-family:external;src:url(https://example.invalid/font.woff2)}</style>',
  ])("rejects unsupported stylesheets before palette or resource approval: %s", (content) => {
    expect(() => analyzeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${content}</svg>`)).toThrow(/unsupported SVG stylesheet/);
  });

  it.each([
    '<path style="fill:URL(https://example.invalid/paint.svg)"/>',
    '<path style="fill:u\\72l(https://example.invalid/paint.svg)"/>',
    '<path style="fill:u/**/rl(https://example.invalid/paint.svg)"/>',
    '<foreignObject><div xmlns="http://www.w3.org/1999/xhtml" style="background:image-set(\'https://example.invalid/image.png\' 1x)"/></foreignObject>',
    '<foreignObject><img xmlns="http://www.w3.org/1999/xhtml" src="https://example.invalid/image.png"/></foreignObject>',
    '<foreignObject><img xmlns="http://www.w3.org/1999/xhtml" srcset="https://example.invalid/image.png 1x"/></foreignObject>',
    '<g xml:base="https://example.invalid/"><path fill="url(#paint)"/></g><defs><pattern id="paint"/></defs>',
    '<foreignObject><div xmlns="http://www.w3.org/1999/xhtml" style="-moz-binding:url(#paint)"/></foreignObject><defs><path id="paint"/></defs>',
  ])("rejects external or unsupported resource mechanisms: %s", (content) => {
    expect(() => analyzeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${content}</svg>`)).toThrow(/external|unsupported/);
  });

  it("rejects stylesheet processing instructions and active animation elements", () => {
    expect(() => analyzeSvg(`<?xml-stylesheet type="text/css" href="https://example.invalid/external.css"?>${svg}`)).toThrow(/unsupported/);
    expect(() => analyzeSvg(svg.replace('</svg>', '<animate attributeName="fill" values="red;blue"/></svg>'))).toThrow(/active|unsupported/);
  });

  it("retains local mask references and embedded raster data without approving their colors", () => {
    const analysis = analyzeSvg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><image href="data:image/png;base64,iVBORw0KGgo="/></svg>');
    expect(analysis.embeddedImage).toBe(true);
    expect(() => classifyIcon(source, analysis)).toThrow(/color decision/);
    expect(analyzeSvg(svg.replace('url(#shape)', 'URL(\'#shape\')')).ids).toEqual(["shape"]);
  });

  it("rejects CSS priority rules that the simple inline paint reader cannot resolve", () => {
    const content = '<path style="fill:red !important;fill:#1d2129" d="M0 0H24V24H0Z"/>';
    expect(() => analyzeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${content}</svg>`)).toThrow(/unsupported SVG CSS priority/);
  });

  it("produces stable named exports, including names that begin with a number", () => {
    expect(iconExportName("edit-pencil")).toBe("EditPencilIcon");
    expect(iconExportName("3d-cube")).toBe("Icon3dCube");
  });

  it("rejects non-closed inventories rather than silently dropping assets", () => {
    expect(validateInventory({ source: { count: 2 }, icons: [] })).toContain("inventory count mismatch");
  });

  it("retains a proven source failure without inventing a usable runtime export", () => {
    const item = { ...source, assetId: source.name, slug: "arrow-down", availability: "source-unavailable", viewBox: null, runtime: null, sourceFailure: { evidencePath: "evidence/icons/source-failures.json", error: "no visible source layers" }, colorMode: "host" };
    expect(validateInventory({ source: { count: 1 }, icons: [item] })).toEqual([]);
    expect(validateInventory({ source: { count: 1 }, icons: [{ ...item, runtime: { modulePath: "packages/ui/src/icons/arrow-down.tsx", exportName: "ArrowDownIcon" } }] })).toContain("unavailable asset has runtime: icon/arrow-down");
    expect(validateInventory({ source: { count: 1 }, icons: [{ ...item, sourceFailure: null }] })).toContain("missing source failure evidence: icon/arrow-down");
  });
});
