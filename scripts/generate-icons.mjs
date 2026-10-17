import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { generateIconSemantics, validateIconSemantics } from "./generate-icon-semantics.mjs";
import { parseYamlSubset } from "./verification-helpers.mjs";

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const Parser = new JSDOM("").window.DOMParser;
const fileKey = "olqwu95QD6n4Y3IAwUdgF4";
const foregroundVariable = "VariableID:431:30";
const gradingSources = { "icon/grading-pending": ["2761:19670", "2761:19672"], "icon/grading-reviewed": ["2761:19678", "2761:19680"] };
const additionsPath = "evidence/icons/source-additions.json";
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
export const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function paintValue(value) {
  const paint = value.trim().toLowerCase().replace(/\s+/g, "");
  if (paint === "black") return "#000000";
  if (paint === "white") return "#ffffff";
  if (/^#[a-f0-9]{3}$/.test(paint)) return `#${[...paint.slice(1)].map((c) => c + c).join("")}`;
  return paint;
}

/** Read the XML tree; mask and clip colors are never treated as foreground. */
export function analyzeSvg(svg) {
  const document = new Parser().parseFromString(svg, "image/svg+xml");
  if (document.querySelector("parsererror") || document.documentElement.localName !== "svg") throw new Error("invalid source SVG");
  if (document.doctype || document.createTreeWalker(document, 64).nextNode()) throw new Error("unsupported SVG document declaration");
  const ids = [];
  const references = [];
  const visiblePaints = new Set();
  const reviewReasons = new Set();
  // This is a passive export allowlist, not a CSS cascade or SVG renderer.
  const svgTags = new Set("svg g defs mask clippath pattern lineargradient radialgradient stop path rect circle ellipse polygon polyline line text tspan textpath use image symbol marker filter feblend fecolormatrix fecomponenttransfer fecomposite feconvolvematrix fediffuselighting fedisplacementmap fedistantlight fedropshadow feflood fefunca fefuncb fefuncg fefuncr fegaussianblur feimage femerge femergenode femorphology feoffset fepointlight fespecularlighting fespotlight fetile feturbulence foreignobject title desc metadata".split(" "));
  const htmlTags = new Set(["div", "span", "img"]);
  const cssProperties = new Set("fill fill-opacity fill-rule stroke stroke-opacity stroke-width stroke-linecap stroke-linejoin stroke-miterlimit stroke-dasharray stroke-dashoffset opacity display visibility color background background-color background-image position width height top left right bottom overflow border-radius transform transform-origin transform-box mask mask-type clip-path filter isolation mix-blend-mode flood-color flood-opacity stop-color stop-opacity".split(" "));
  const cssFunctions = new Set("url rgb rgba hsl hsla lab lch oklab oklch color color-mix linear-gradient radial-gradient conic-gradient repeating-linear-gradient repeating-radial-gradient repeating-conic-gradient matrix matrix3d translate translatex translatey translatez translate3d scale scalex scaley scalez scale3d rotate rotatex rotatey rotatez rotate3d skew skewx skewy perspective calc min max clamp".split(" "));
  const inlineStyles = new Map();
  const geometryAttributes = new Set("d points transform gradienttransform patterntransform viewbox x y x1 y1 x2 y2 cx cy r rx ry width height".split(" "));
  const embeddedRaster = /^data:image\/(?:png|jpeg|webp);base64,[a-z0-9+/]+={0,2}$/i;
  function checkUrls(value) {
    const remainder = value.replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^()"'\s]*))\s*\)/gi, (_match, doubleQuoted, singleQuoted, unquoted) => {
      const target = doubleQuoted ?? singleQuoted ?? unquoted;
      if (!/^#[^\s]+$/.test(target)) throw new Error("external SVG resource");
      references.push(target.slice(1));
      return "";
    });
    if (/url\s*\(/i.test(remainder)) throw new Error("unsupported SVG URL syntax");
  }
  function readStyle(value) {
    if (/[\\@]|\/\*|\*\//.test(value)) throw new Error("unsupported SVG CSS escape, comment or at-rule");
    if (value.includes("!")) throw new Error("unsupported SVG CSS priority");
    const declarations = {};
    for (const part of value.split(";").filter((item) => item.trim())) {
      const split = part.indexOf(":");
      const property = part.slice(0, split).trim().toLowerCase();
      if (split < 1 || !cssProperties.has(property)) throw new Error(`unsupported SVG CSS property: ${property}`);
      const content = part.slice(split + 1).trim();
      for (const match of content.matchAll(/([a-z-]+)\(/gi)) {
        if (!cssFunctions.has(match[1].toLowerCase())) throw new Error(`unsupported SVG CSS function: ${match[1]}`);
      }
      checkUrls(content);
      declarations[property] = content;
    }
    return declarations;
  }
  let foreignObject = false;
  let embeddedImage = false;
  for (const element of document.querySelectorAll("*")) {
    const tag = element.localName.toLowerCase();
    if (["script", "iframe", "object", "embed", "a"].includes(tag)) throw new Error("active SVG content");
    if (tag === "style") throw new Error("unsupported SVG stylesheet; inline passive export styles only");
    const svgNamespace = element.namespaceURI === "http://www.w3.org/2000/svg";
    if (svgNamespace ? !svgTags.has(tag) : element.namespaceURI !== "http://www.w3.org/1999/xhtml" || !htmlTags.has(tag) || !element.closest("foreignObject")) throw new Error(`unsupported SVG element: ${tag}`);
    if (tag === "foreignobject") foreignObject = true;
    if (["image", "feimage", "img"].includes(tag)) embeddedImage = true;
    if (tag === "use") reviewReasons.add("referenced-paint:use");
    if (tag === "filter") reviewReasons.add("unresolved-paint:filter");
    if (["text", "tspan", "textpath", "marker"].includes(tag)) reviewReasons.add(`unresolved-paint:${tag}`);
    const id = element.getAttribute("id");
    if (id) { if (ids.includes(id)) throw new Error(`duplicate SVG id ${id}`); ids.push(id); }
    for (const attribute of element.attributes) {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim();
      if (geometryAttributes.has(name) && (/nan|infinity/i.test(value)
        || [...value.matchAll(/[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g)].some(([number]) => !Number.isFinite(Number(number))))) {
        throw new Error(`non-finite SVG geometry: ${tag}.${name}`);
      }
      if (/^on/i.test(attribute.name) || /javascript:|@import/i.test(value)) throw new Error("active SVG attribute");
      if (name === "xml:base" || name === "srcset") throw new Error(`unsupported SVG resource attribute: ${name}`);
      if (/[\\]|\/\*|\*\//.test(value)) throw new Error("unsupported SVG attribute escape or comment");
      if (/href$/.test(name) || name === "src") {
        if (value.startsWith("#") && name !== "src") references.push(value.slice(1));
        else if (!embeddedRaster.test(value) || !["image", "feimage", "img"].includes(tag)) throw new Error("external SVG resource");
      }
      if (name === "style") inlineStyles.set(element, readStyle(value));
      else checkUrls(value);
    }
    const style = inlineStyles.get(element) ?? {};
    if ((style["mix-blend-mode"] ?? element.getAttribute("mix-blend-mode") ?? "normal") !== "normal") reviewReasons.add("unresolved-paint:mix-blend-mode");
  }
  for (const reference of references) if (!ids.includes(reference)) throw new Error(`missing SVG reference ${reference}`);
  const graphics = new Set(["path", "rect", "circle", "ellipse", "polygon", "polyline", "line", "text", "use"]);
  function walk(element, inherited = { fill: "black", stroke: "none", opacity: 1 }) {
    const tag = element.localName.toLowerCase();
    if (["defs", "mask", "clippath", "pattern", "lineargradient", "radialgradient"].includes(tag)) return;
    const style = inlineStyles.get(element) ?? {};
    if ((style.display ?? element.getAttribute("display")) === "none" || (style.visibility ?? element.getAttribute("visibility")) === "hidden") return;
    const current = {
      fill: style.fill ?? element.getAttribute("fill") ?? inherited.fill,
      stroke: style.stroke ?? element.getAttribute("stroke") ?? inherited.stroke,
      opacity: inherited.opacity * Number(style.opacity ?? element.getAttribute("opacity") ?? 1),
    };
    if (graphics.has(tag) && current.opacity > 0) {
      for (const property of ["fill", "stroke"]) {
        const paint = paintValue(current[property]);
        const opacity = Number(style[`${property}-opacity`] ?? element.getAttribute(`${property}-opacity`) ?? 1);
        if (paint !== "none" && paint !== "transparent" && opacity > 0) visiblePaints.add(paint);
      }
    }
    for (const child of element.children) walk(child, current);
  }
  walk(document.documentElement);
  return { viewBox: document.documentElement.getAttribute("viewBox"), visiblePaints: [...visiblePaints].sort(), reviewReasons: [...reviewReasons].sort(), ids, foreignObject, embeddedImage, masks: document.querySelectorAll("mask").length };
}

export function classifyIcon(source, analysis, decision) {
  if (decision) {
    if (!["host", "intrinsic"].includes(decision.colorMode) || !decision.reason) throw new Error("invalid color decision");
    return { colorMode: decision.colorMode, rendering: decision.colorMode === "intrinsic" ? "image" : analysis.foreignObject ? "png-mask" : "svg-mask", basis: decision.reason };
  }
  if (analysis.reviewReasons?.length) throw new Error(`color decision required: ${source.name} (${analysis.reviewReasons.join(", ")})`);
  if (source.name === "icon/button-loading" && source.nodeId === "207:33") return { colorMode: "host", rendering: "png-mask", basis: "confirmed-transparent-angular-loading" };
  const semanticBinding = source.paints.some((paint) => paint.variableId === foregroundVariable);
  if (semanticBinding && !analysis.foreignObject && !analysis.embeddedImage && analysis.visiblePaints.length > 0 && analysis.visiblePaints.every((paint) => paint === "#1d2129")) return { colorMode: "host", rendering: "svg-mask", basis: "source-foreground-variable-and-monochrome-paint" };
  throw new Error(`color decision required: ${source.name} (${analysis.visiblePaints.join(", ")})`);
}

export function iconExportName(slug) {
  const pascal = slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
  return /^\d/.test(pascal) ? `Icon${pascal}` : `${pascal}Icon`;
}

/** The approved 12px exports contain one white backing and one foreground path. */
export function deriveGradingIcon(svg) {
  const analysis = analyzeSvg(svg);
  const document = new Parser().parseFromString(svg, "image/svg+xml");
  const element = document.documentElement;
  const [backing, foreground] = element.children;
  if (analysis.viewBox !== "0 0 12 12" || element.getAttribute("width") !== "12" || element.getAttribute("height") !== "12"
    || element.children.length !== 2 || [...element.children].some((child) => child.localName !== "path"
      || [...child.attributes].some((attribute) => !["d", "fill"].includes(attribute.name)))
    || backing.getAttribute("fill") !== "white" || foreground.getAttribute("fill") !== "#1561F8") {
    throw new Error("grading icon source does not match the approved backing/foreground structure");
  }
  backing.remove();
  foreground.setAttribute("fill", "currentColor");
  return `${element.outerHTML}\n`;
}

export function validateInventory(inventory) {
  const errors = [];
  if (!Array.isArray(inventory?.icons) || inventory.icons.length !== inventory.source?.count + (inventory.sourceAdditions?.count ?? 0)) errors.push("inventory count mismatch");
  const seen = { name: new Set(), nodeId: new Set(), componentKey: new Set(), exportName: new Set() };
  for (const icon of inventory.icons ?? []) {
    const additional = icon.source?.kind === "non-component";
    if (!/^icon\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(icon.assetId) || icon.assetId !== icon.name || icon.slug !== icon.name.slice(5)) errors.push(`invalid identity: ${icon.name}`);
    for (const key of Object.keys(seen)) {
      if (key === "componentKey" && additional) continue;
      if (key === "exportName" && icon.availability === "source-unavailable") continue;
      const value = key === "exportName" ? icon.runtime?.exportName : icon[key];
      if (!value || seen[key].has(value)) errors.push(`duplicate or missing ${key}: ${icon.name}`);
      seen[key].add(value);
    }
    const canvas = additional ? "12 12" : "24 24";
    if (icon.canvas?.join(" ") !== canvas) errors.push(`invalid canvas: ${icon.name}`);
    if (additional) {
      const nodes = gradingSources[icon.assetId];
      if (!nodes || icon.source.fileKey !== "MbWg1ft5zk1JRQiQ6dS30e" || icon.nodeId !== nodes[0]
        || icon.source.nodeId !== nodes[0] || icon.source.foregroundNodeId !== nodes[1] || icon.componentKey !== null
        || inventory.sourceAdditions?.path !== additionsPath || inventory.sourceAdditions.count !== 2
        || icon.derivation?.kind !== "remove-white-backing-and-host-color" || !/^[a-f0-9]{64}$/.test(icon.derivation?.sha256)) errors.push(`unapproved supplementary source: ${icon.name}`);
    } else if (!/^[a-f0-9]{40}$/.test(icon.componentKey)) errors.push(`invalid component key: ${icon.name}`);
    if (icon.availability === "source-unavailable") {
      if (icon.runtime || icon.sourceExport) errors.push(`unavailable asset has runtime: ${icon.name}`);
      if (icon.sourceFailure?.evidencePath !== "evidence/icons/source-failures.json" || !icon.sourceFailure?.error) errors.push(`missing source failure evidence: ${icon.name}`);
      continue;
    }
    if (icon.availability !== "available") errors.push(`missing availability: ${icon.name}`);
    if (icon.viewBox !== `0 0 ${canvas}`) errors.push(`invalid canvas: ${icon.name}`);
    if (!/^[a-f0-9]{64}$/.test(icon.sourceExport?.sha256)) errors.push(`missing source hash: ${icon.name}`);
    if (icon.runtime?.modulePath !== `packages/ui/src/icons/${icon.slug}.tsx`) errors.push(`invalid module path: ${icon.name}`);
    if (icon.runtime?.exportName !== iconExportName(icon.slug)) errors.push(`invalid export name: ${icon.name}`);
    if (!["host", "intrinsic"].includes(icon.colorMode)) errors.push(`unresolved color: ${icon.name}`);
  }
  return errors;
}

export function buildInventory(root = rootDirectory) {
  const capture = JSON.parse(readFileSync(resolve(root, "evidence/icons/source-nodes.json"), "utf8"));
  const decisions = JSON.parse(readFileSync(resolve(root, "evidence/icons/color-decisions.json"), "utf8"));
  const failures = JSON.parse(readFileSync(resolve(root, "evidence/icons/source-failures.json"), "utf8"));
  const semantics = JSON.parse(readFileSync(resolve(root, "packages/foundations/src/icons/semantic-rules.json"), "utf8"));
  const semanticErrors = validateIconSemantics(semantics);
  if (semanticErrors.length) throw new Error(semanticErrors.join("\n"));
  const issues = [];
  const icons = capture.nodes.map((node) => {
    const slug = node.name.slice(5);
    if (node.exportError) {
      const failure = failures.assets.find((item) => item.assetId === node.name && item.nodeId === node.nodeId);
      if (!failure || failure.pngHasVisiblePixels !== false) throw new Error(`unverified source failure: ${node.name}`);
      const rasterPath = `evidence/icons/source-exports/${slug}.png`;
      return {
        assetId: node.name, name: node.name, slug, nodeId: node.nodeId, componentKey: node.componentKey, canvas: node.canvas,
        viewBox: null, sourceDescription: node.description, publication: "unverified", availability: "source-unavailable",
        sourceFailure: { evidencePath: "evidence/icons/source-failures.json", error: failure.reason },
        rasterExport: { path: rasterPath, sha256: sha256(readFileSync(resolve(root, rasterPath))) },
        colorMode: "host", rendering: null, colorDecision: "source-foreground-binding; source has no visible pixels", runtime: null, semantics: "not-globally-defined",
      };
    }
    const sourcePath = `evidence/icons/source-exports/${slug}.svg`;
    const svg = readFileSync(resolve(root, sourcePath), "utf8");
    const analysis = analyzeSvg(svg);
    let treatment;
    try { treatment = classifyIcon(node, analysis, decisions.assets[node.name]); }
    catch (error) { issues.push(error.message); return null; }
    const extension = treatment.rendering === "png-mask" || analysis.foreignObject ? "png" : "svg";
    const runtimeSource = `evidence/icons/source-exports/${slug}.${extension}`;
    if (!existsSync(resolve(root, runtimeSource))) { issues.push(`missing exact source raster: ${node.name}`); return null; }
    const known = semantics.assets.find((asset) => asset.assetId === node.name);
    if (known && (known.source.nodeId !== node.nodeId || known.source.componentKey !== node.componentKey)) issues.push(`confirmed identity changed: ${node.name}`);
    if (known && known.colorMode !== treatment.colorMode) issues.push(`confirmed color mode changed: ${node.name}`);
    return {
      assetId: node.name, name: node.name, slug, nodeId: node.nodeId, componentKey: node.componentKey, canvas: node.canvas,
      availability: "available",
      viewBox: analysis.viewBox, sourceDescription: node.description, publication: "unverified",
      sourceExport: { path: sourcePath, sha256: sha256(svg) },
      ...(extension === "png" ? { rasterExport: { path: runtimeSource, sha256: sha256(readFileSync(resolve(root, runtimeSource))) } } : {}),
      colorMode: treatment.colorMode, rendering: treatment.rendering, colorDecision: treatment.basis,
      sourceStructure: { paints: analysis.visiblePaints, maskCount: analysis.masks, ids: analysis.ids, foreignObject: analysis.foreignObject, embeddedImage: analysis.embeddedImage },
      runtime: { modulePath: `packages/ui/src/icons/${slug}.tsx`, assetPath: `packages/ui/src/icons/assets/${slug}.${extension}`, exportName: iconExportName(slug), sourcePath: runtimeSource },
      semantics: known ? "discussion-confirmed" : "not-globally-defined",
    };
  }).filter(Boolean);
  const inventory = { schemaVersion: "1.0", source: capture.source, icons };
  if (existsSync(resolve(root, additionsPath))) {
    const bytes = readFileSync(resolve(root, additionsPath));
    const additions = JSON.parse(bytes);
    if (additions.schemaVersion !== "1.0" || JSON.stringify(additions.assets?.map((asset) => asset.assetId)) !== JSON.stringify(Object.keys(gradingSources))) throw new Error("unapproved supplementary icon set");
    inventory.sourceAdditions = { path: additionsPath, sha256: sha256(bytes), count: additions.assets.length };
    for (const addition of additions.assets) {
      const slug = addition.assetId.slice(5);
      if (addition.sourceExport?.path !== `evidence/icons/source-additions/${slug}.source.svg`) throw new Error(`invalid supplementary source path: ${addition.assetId}`);
      const svg = readFileSync(resolve(root, addition.sourceExport.path), "utf8");
      if (sha256(svg) !== addition.sourceExport.sha256) throw new Error(`supplementary source hash mismatch: ${addition.assetId}`);
      const derived = deriveGradingIcon(svg);
      const analysis = analyzeSvg(derived);
      icons.push({
        assetId: addition.assetId, name: addition.assetId, slug, nodeId: addition.source.nodeId, componentKey: null, canvas: [12, 12], source: addition.source,
        availability: "available", viewBox: analysis.viewBox, sourceDescription: addition.description, publication: "unverified",
        sourceExport: addition.sourceExport, derivation: { kind: "remove-white-backing-and-host-color", sha256: sha256(derived) },
        colorMode: "host", rendering: "svg-mask", colorDecision: "user-approved foreground-only source derivation; host supplies backing and semantic color",
        sourceStructure: { paints: analysis.visiblePaints, maskCount: analysis.masks, ids: analysis.ids, foreignObject: analysis.foreignObject, embeddedImage: analysis.embeddedImage },
        runtime: { modulePath: `packages/ui/src/icons/${slug}.tsx`, assetPath: `packages/ui/src/icons/assets/${slug}.svg`, exportName: iconExportName(slug), sourcePath: addition.sourceExport.path },
        semantics: "component-confirmed",
      });
    }
  }
  inventory.availableCount = icons.filter((icon) => icon.availability === "available").length;
  inventory.unavailableCount = icons.length - inventory.availableCount;
  issues.push(...validateInventory(inventory));
  for (const asset of semantics.assets) if (!icons.some((icon) => icon.assetId === asset.assetId)) issues.push(`missing discussion asset: ${asset.assetId}`);
  if (issues.length) throw new Error(issues.join("\n"));
  return inventory;
}

export function buildIconArtifacts(inventory, root = rootDirectory) {
  const files = new Map();
  const lifecycle = parseYamlSubset(readFileSync(resolve(root, "status/current-phase.yaml"), "utf8")).componentRefinements.iconLibrary;
  const catalog = [];
  const previewLines = [];
  const semantics = JSON.parse(readFileSync(resolve(root, "packages/foundations/src/icons/semantic-rules.json"), "utf8"));
  const uiPackage = JSON.parse(readFileSync(resolve(root, "packages/ui/package.json"), "utf8"));
  const foundationPackage = JSON.parse(readFileSync(resolve(root, "packages/foundations/package.json"), "utf8"));
  const exports = Object.fromEntries(Object.entries(uiPackage.exports).filter(([key]) => !key.startsWith("./icons/") && key !== "./icon"));
  exports["./icon"] = "./src/icon/icon.tsx";
  exports["./icons/catalog"] = "./src/icons/catalog.generated.ts";
  for (const icon of inventory.icons) {
    const { slug, runtime, assetId, colorMode, rendering } = icon;
    if (icon.availability === "available") {
    const extension = runtime.assetPath.split(".").at(-1);
    const sourceBytes = readFileSync(resolve(root, runtime.sourcePath));
    const assetBytes = icon.derivation ? Buffer.from(deriveGradingIcon(sourceBytes.toString())) : sourceBytes;
    files.set(runtime.assetPath, assetBytes);
    files.set(runtime.modulePath, `// Generated from the frozen Figma inventory. Do not redraw or edit.\nimport { forwardRef } from "react";\nimport { Icon, type IconAsset, type IconProps } from "../icon/icon";\n\nconst asset: IconAsset = { assetId: ${JSON.stringify(assetId)}, src: new URL("./assets/${slug}.${extension}", import.meta.url).href, colorMode: "${colorMode}", rendering: "${rendering}" };\n\nexport const ${runtime.exportName} = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ${runtime.exportName}(props, ref) {\n  return <Icon {...props} ref={ref} asset={asset} />;\n});\n`);
    exports[`./icons/${slug}`] = `./src/icons/${slug}.tsx`;
    previewLines.push(`  { assetId: ${JSON.stringify(assetId)}, src: new URL("./assets/${slug}.${extension}", import.meta.url).href, colorMode: "${colorMode}", rendering: "${rendering}" },`);
    }
    const defaults = semantics.rules.filter((rule) => rule.assetId === assetId);
    const related = semantics.rules.filter((rule) => rule.assetId === assetId || rule.variants.some((variant) => variant.assetId === assetId));
    catalog.push({ assetId, name: assetId, slug, exportName: runtime?.exportName ?? null, importPath: runtime ? `@rain-next/ui/icons/${slug}` : null, colorMode, rendering,
      availability: icon.availability, ...(icon.sourceFailure ? { sourceIssue: icon.sourceFailure.error } : {}),
      source: { ...(icon.source ?? { fileKey, nodeId: icon.nodeId }), componentKey: icon.componentKey, url: `https://www.figma.com/design/${icon.source?.fileKey ?? fileKey}?node-id=${icon.nodeId.replace(":", "-")}` },
      usageStatus: defaults.length ? "default" : icon.source || related.length || semantics.alternatives.some((alternative) => alternative.assetId === assetId) ? "explicit" : "unconfirmed",
      keywords: [...new Set(related.flatMap((rule) => rule.keywords))],
    });
  }
  files.set("packages/ui/src/icons/catalog.generated.ts", `// Generated. Import only in a full-library browser, never a single-icon consumer.\nimport type { IconAsset } from "../icon/icon";\nexport const iconPreviews: readonly IconAsset[] = [\n${previewLines.join("\n")}\n];\n`);
  files.set("packages/foundations/src/icons/catalog.generated.ts", `// Generated metadata only. No runtime graph or UI dependency.\nexport interface IconCatalogEntry {\n  readonly assetId: string; readonly name: string; readonly slug: string; readonly exportName: string | null; readonly importPath: string | null;\n  readonly colorMode: "host" | "intrinsic"; readonly rendering: "svg-mask" | "png-mask" | "image" | null; readonly availability: "available" | "source-unavailable"; readonly sourceIssue?: string;\n  readonly source: { readonly fileKey: string; readonly nodeId: string; readonly componentKey: string | null; readonly url: string; readonly kind?: \"non-component\"; readonly foregroundNodeId?: string };\n  readonly usageStatus: "default" | "explicit" | "unconfirmed"; readonly keywords: readonly string[];\n}\nexport const iconCatalog: readonly IconCatalogEntry[] = ${JSON.stringify(catalog, null, 2)};\n`);
  const exportOrder = [...Object.keys(uiPackage.exports).filter(name => Object.hasOwn(exports, name)), ...Object.keys(exports).filter(name => !Object.hasOwn(uiPackage.exports, name))];
  files.set("packages/ui/package.json", json({ ...uiPackage, exports: Object.fromEntries(exportOrder.map(name => [name, exports[name]])) }));
  foundationPackage.exports["./icons/icon-contract"] = "./src/icons/icon-contract.ts";
  foundationPackage.exports["./icons/semantic-rules"] = "./src/icons/semantic-rules.generated.ts";
  foundationPackage.exports["./icons/catalog"] = "./src/icons/catalog.generated.ts";
  files.set("packages/foundations/package.json", json(foundationPackage));
  files.set("evidence/icons/inventory.json", json(inventory));
  files.set("evidence/icons/source-lock.yaml", `schemaVersion: "1.0"\nfileKey: "${fileKey}"\npageId: "1:3"\npageName: "02 · Icons"\nsourceVersion: "unavailable"\npublication: "unverified"\ncount: ${inventory.source.count}\nreadStartedAt: "${inventory.source.readStartedAt}"\nreadCompletedAt: "${inventory.source.readCompletedAt}"\nexportFormat: "SVG_STRING"\ncontentsOnly: true\nsvgIdAttribute: false\ninventorySha256: "${sha256(json(inventory))}"\nsourceNodesSha256: "${sha256(readFileSync(resolve(root, "evidence/icons/source-nodes.json")))}"\n${existsSync(resolve(root, "evidence/icons/source-repairs.json")) ? `sourceRepairEvidenceSha256: "${sha256(readFileSync(resolve(root, "evidence/icons/source-repairs.json")))}"\n` : ""}`);
  const sharedFiles = ["packages/ui/src/icon/icon.tsx", "packages/ui/src/styles.css", "packages/ui/src/icons/assets/button-loading.png"];
  files.set("registry/icons.json", json({ schemaVersion: 1, kind: "RainLocalSourceRegistry", publication: "not-published", shared: { files: sharedFiles, peerDependencies: ["react"], styleDependencies: ["@rain-next/foundations/tokens.css", "@rain-next/ui/styles.css"] }, items: inventory.icons.filter((icon) => icon.availability === "available").map((icon) => ({ name: icon.slug, exportName: icon.runtime.exportName, importPath: `@rain-next/ui/icons/${icon.slug}`, files: [icon.runtime.modulePath, icon.runtime.assetPath] })) }));
  files.set("manifests/icons.json", json({ schemaVersion: 1, kind: "RainIconManifest", maturity: "registry-candidate", implementation: lifecycle.implementation, humanGate: lifecycle.humanGate, lifecycleSource: "status/current-phase.yaml#componentRefinements.iconLibrary", ...(lifecycle.sourceRepair ? { sourceRepair: { scope: lifecycle.sourceRepair.scope, assetIds: lifecycle.sourceRepair.source.nodes.map((node) => node.assetId), implementation: lifecycle.sourceRepair.implementation, automatedVerification: lifecycle.sourceRepair.automatedVerification, humanGate: lifecycle.sourceRepair.humanGate, evidence: "evidence/icons/source-repairs.json" } } : {}), publication: "not-published", sourceInventory: "evidence/icons/inventory.json", semanticRules: "packages/foundations/src/icons/semantic-rules.json", aiEntry: "docs/ai/icon-selection.md", catalog: "packages/foundations/src/icons/catalog.generated.ts", renderer: "packages/ui/src/icon/icon.tsx", assetIdentity: "registry-candidate", category: "foundation-icon", modificationMode: "managed", description: "Source-faithful Rain icon assets with confirmed scene selection and host-owned color.", useWhen: ["An existing Rain asset matches the actual action or information role"], doNotUseWhen: ["Source availability is unresolved", "Inferring new global semantics from a name alone"], anatomy: ["root", "isolated-source-image"], parts: ["root"], props: { size: "host size or explicit CSS width", label: "optional accessible information label", asset: "generated source identity" }, slots: [], variants: ["host", "intrinsic"], states: ["decorative", "informational"], dependencies: ["react"], tokens: ["host foreground and state tokens"], layoutConstraints: ["24x24 source canvas; host owns display size"], compositionRules: ["Compose through Button leadingIcon/trailingIcon", "Host owns actions, color, motion, disabled state and focus"], allowedModifications: ["Documented props and composition"], restrictedModifications: ["Editing generated geometry", "Recoloring intrinsic sources", "Assigning unconfirmed global defaults"], accessibility: { decorative: "aria-hidden", informational: "label sets role img", focus: "interactive host only" }, examples: ["apps/playground/src/docs/icons-page.tsx"], recipes: ["docs/ai/icon-selection.md"], antiPatterns: ["Page-local SVG redraw", "Blank placeholder for unavailable source", "Full catalog import for one static icon"], relatedComponents: ["Button"], relatedBlocks: [], visualLineage: { rainClassicReferences: ["Figma 02 · Icons", "evidence/rain-classic/reuse-matrix.yaml"], externalReferences: ["docs/plans/2026-09-03-icon-library-migration.md#8-参考做法与可追溯入口"], retainedTraits: ["Geometry, canvas, alpha, fixed palette and confirmed semantics"], redesignedTraits: ["React static entry and isolated image renderer"], intentionallyNotInherited: ["Vue implementation", "Old private icon defaults"] }, sourcePath: "evidence/icons/source-exports", sourceVersion: "unavailable; timestamp and hashes locked", migrationNotes: "Complete source identities retained; source failures remain unavailable and are never silently replaced.", installation: { kind: "local-workspace-source", registry: "registry/icons.json", styles: ["@rain-next/foundations/tokens.css", "@rain-next/ui/styles.css"], notStandalonePublicRegistry: true }, count: inventory.icons.length, availableCount: inventory.availableCount, unavailableCount: inventory.unavailableCount, items: catalog.map((icon) => ({ id: icon.assetId, importPath: icon.importPath, colorMode: icon.colorMode, usageStatus: icon.usageStatus, availability: icon.availability, figmaMapping: icon.source })) }));
  if (inventory.sourceAdditions) {
    const manifest = JSON.parse(files.get("manifests/icons.json"));
    manifest.sourceAdditions = { evidence: additionsPath, count: inventory.sourceAdditions.count, assetIds: Object.keys(gradingSources), canvas: [12, 12], derivation: "remove-white-backing-and-host-color", implementation: "generated", humanGate: "not-evaluated", publication: "not-published" };
    manifest.layoutConstraints.push("Supplemental grading rings retain their 12x12 canvas; the host supplies the backing surface.");
    files.set("manifests/icons.json", json(manifest));
    files.set("evidence/icons/source-lock.yaml", `${files.get("evidence/icons/source-lock.yaml")}sourceAdditionsCount: ${inventory.sourceAdditions.count}\nsourceAdditionsSha256: "${inventory.sourceAdditions.sha256}"\n`);
  }
  return files;
}

export function generateIcons({ root = rootDirectory, check = false } = {}) {
  generateIconSemantics({ root, check });
  const inventory = buildInventory(root);
  const files = buildIconArtifacts(inventory, root);
  const stale = [];
  for (const [path, data] of files) {
    const target = resolve(root, path);
    const expected = Buffer.isBuffer(data) ? data : Buffer.from(data);
    if (check) { if (!existsSync(target) || !readFileSync(target).equals(expected)) stale.push(path); }
    else { mkdirSync(dirname(target), { recursive: true }); writeFileSync(target, expected); }
  }
  if (stale.length) throw new Error(`generated icon files differ:\n${stale.join("\n")}`);
  return { count: inventory.icons.length, files: files.size, inventory };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { const result = generateIcons({ check: process.argv.includes("--check") }); console.log(`Icons: ${result.count} assets; ${result.files} generated files ${process.argv.includes("--check") ? "verified" : "written"}.`); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
