import { colorTokenOutputs } from "../packages/foundations/src/color-registry.ts";
import { hasAvatarFamilyAuthorization } from "./verification-helpers.mjs";
import { parseTopLevelCssBlocks } from "./verify-tailwind-b2.mjs";

const avatar = "packages/ui/src/avatar/avatar.css";
const status = "packages/ui/src/status-indicator/status-indicator.css";
const page = "apps/playground/src/docs/components/avatar-page.css";
const evidenceRef = "docs/plans/2026-09-16-avatar-family-design-and-construction.md";
const surface = "Background/Neutral/1", fill = "Fill/Neutral/Solid/5";
// Explicit paint roles and actual parent surfaces; never inferred from CSS under test.
export function getAvatarColorConsumers() {
  const statusFills = ["Fill/TagSlate/Solid/1", "Fill/Brand/Solid/2", "Fill/TagClassroom/Solid/1", "Fill/TagCourseware/Solid/1", "Fill/Red/Solid/2"];
  /** @type {Array<[string, string, string, string, string, string[]?, string?]>} */
  const rows = [
    [avatar, ".rain-avatar-group__more", "background", "Fill/Neutral/Solid/7", "surface"],
    [avatar, ".rain-avatar-group__more::before", "background", fill, "surface"],
    [avatar, ".rain-avatar-group__more", "color", "Icon/Neutral/2", "meaningful-icon", ["Fill/Neutral/Solid/5"]],
    [avatar, ".rain-avatar-grid", "background", fill, "surface"],
    [avatar, '.rain-avatar-grid [data-slot="empty"]', "color", "Text/Neutral/3", "text", [fill]],
    [avatar, '.rain-avatar:is(button, a) > .rain-avatar__picture, .rain-avatar-group__strip:is(button, a) > .rain-avatar > .rain-avatar__picture', "background", "Fill/Neutral/Solid/7", "surface"],
    [avatar, '.rain-avatar:is(button, a):not(:disabled):hover > .rain-avatar__picture, .rain-avatar-group__strip:is(button, a):not(:disabled):hover > .rain-avatar > .rain-avatar__picture', "outline", "Border/Neutral/3", "decorative", [surface], "var(--rain-line-thickness-1) solid "],
    [avatar, '.rain-avatar:is(button, a):not(:disabled):is(:active, :focus-visible) > .rain-avatar__picture, .rain-avatar-group__strip:is(button, a):not(:disabled):is(:active, :focus-visible) > .rain-avatar > .rain-avatar__picture', "outline", "Border/Brand/2", "decorative", [surface], "var(--rain-line-thickness-1) solid "],
    [avatar, '.rain-avatar-group__more:hover', "border-color", "Border/Neutral/3", "decorative"],
    [avatar, '.rain-avatar-group__more:is(:active, :focus-visible)', "border-color", "Border/Brand/2", "decorative"],
    [avatar, '.rain-avatar:is(button, a):not(:disabled):hover > .rain-avatar__picture', "background", "Fill/Neutral/Solid/3", "surface"],
    [avatar, '.rain-avatar:is(button, a):not(:disabled):is(:active, :focus-visible) > .rain-avatar__picture, .rain-avatar-group__strip:is(button, a):not(:disabled):is(:active, :focus-visible) > .rain-avatar > .rain-avatar__picture', "background", "Fill/Neutral/Solid/7", "surface"],
    [avatar, '.rain-avatar-grid:is(button, a):not(:disabled):hover', "background", "Fill/Neutral/Solid/1", "surface"],
    [avatar, '.rain-avatar-grid:is(button, a):not(:disabled):is(:active, :focus-visible)', "background", fill, "surface"],
    [avatar, '.rain-avatar-grid:is(button, a):not(:disabled):is(:active, :focus-visible)::after', "border", "Border/Brand/2", "decorative", [surface], "var(--rain-line-thickness-1) solid "],
    [status, ".rain-status-indicator", "color", "OnColor/1", "meaningful-icon", statusFills],
    [status, ".rain-status-indicator", "background", statusFills[0], "surface"],
    [status, '.rain-status-indicator[data-tone="info"]', "background", "Fill/Brand/Solid/2", "surface"],
    [status, '.rain-status-indicator[data-tone="success"]', "background", "Fill/TagClassroom/Solid/1", "surface"],
    [status, '.rain-status-indicator[data-tone="warning"]', "background", "Fill/TagCourseware/Solid/1", "surface"],
    [status, '.rain-status-indicator[data-tone="danger"]', "background", "Fill/Red/Solid/2", "surface"],
    [status, '.rain-activity-overlay[data-ring="true"]::after', "border", "Border/Brand/1", "decorative", [surface], "var(--rain-space-2) solid "],
    [page, ".avatar-review-section", "background", surface, "surface"],
  ];
  return rows.map(([filePath, selector, property, tokenId, content, parentSurfaces = [surface], prefix = ""]) => ({
    filePath, selector, property, parentSurfaces,
    ...(tokenId === "OnColor/1" ? { contrastReview: "pending-review" } : {}),
    value: `${prefix}var(${colorTokenOutputs.find(entry => entry.id === tokenId).variable})`,
    use: { tokenId, content, role: tokenId.startsWith("OnColor/") ? "icon" : tokenId.split("/")[0].toLowerCase(),
      ...(tokenId.startsWith("OnColor/") ? { onColor: true } : {}),
      property: ["border", "outline"].includes(property) ? "border-color" : property === "background" ? "background-color" : property,
      context: "component-recipe", recipeId: "avatar-family", evidenceRef, interaction: "non-interactive",
      critical: ["text", "meaningful-icon"].includes(content), ...((tokenId.includes("/Brand/") || parentSurfaces.some(parent => parent.includes("/Brand/"))) ? { brandIntent: "progress" } : {}),
    },
  }));
}

// Finite non-color declarations are masked before the shared color auditor; paints retain full validation.
export function prepareAvatarSource(filePath, source, phase, failures = []) {
  if (![avatar, status, page].includes(filePath)) return source;
  if (!hasAvatarFamilyAuthorization(phase)) { failures.push("Avatar source requires exact phase authorization"); return source; }
  const variables = {
    "--rain-local-avatar-size": ["var(--rain-space-24)", "var(--rain-space-32)", "var(--rain-space-40)", "var(--rain-local-avatar-cell)"],
    "--rain-local-avatar-radius": ["var(--rain-radius-full)", "var(--rain-radius-4)", "var(--rain-radius-6)"],
    "--rain-local-avatar-overlap": ["var(--rain-space-10)", "var(--rain-space-12)", "var(--rain-space-16)"],
    "--rain-local-avatar-cell": ["12px", "18.5px", "38px"],
  };
  const owners = new Set([".rain-avatar", '.rain-avatar[data-size="24"]', '.rain-avatar[data-size="40"]',
    '.rain-avatar[data-shape="square"]', '.rain-avatar[data-shape="square"][data-size="24"]',
    ".rain-avatar-group", '.rain-avatar-group[data-size="24"]', '.rain-avatar-group[data-size="40"]',
    ".rain-avatar-grid", '.rain-avatar-grid[data-count="0"], .rain-avatar-grid[data-count="1"]',
    '.rain-avatar-grid:is([data-count="2"], [data-count="3"], [data-count="4"])', ".rain-avatar-grid__row > .rain-avatar"]);
  const references = {
    "inline-size": ["var(--rain-local-avatar-size)"], "block-size": ["var(--rain-local-avatar-size)"],
    "clip-path": ["inset(var(--rain-line-thickness-1) round calc(var(--rain-local-avatar-radius) - var(--rain-line-thickness-1)))", "inset(var(--rain-space-2) round calc(var(--rain-local-avatar-radius) - var(--rain-space-2)))"],
    "border-radius": ["var(--rain-local-avatar-radius)"], "margin-inline-start": ["calc(-1 * var(--rain-local-avatar-overlap))"],
  };
  const system = {
    ".rain-avatar-group__strip > .rain-avatar": { "outline-color": "Canvas" },
    ".rain-avatar-group__more::before": { background: "ButtonFace" },
    ".rain-avatar-group__more": { color: "ButtonText", background: "ButtonFace", "border-color": "ButtonText" },
    ".rain-status-indicator[data-tone]": { color: "CanvasText", background: "Canvas", outline: "var(--rain-line-thickness-1) solid CanvasText" },
    ".rain-activity-overlay": { background: "Canvas" },
    '.rain-activity-overlay[data-ring="true"]::after': { "border-color": "Highlight" },
  };
  if (filePath === status) {
    const overlay = parseTopLevelCssBlocks(source, filePath, failures).find(block => block.header === ".rain-activity-overlay");
    if (!overlay || !overlay.body.includes("background: var(--rain-overlay-focus);")) failures.push("Avatar activity must reuse the existing semantic focus mask");
  }
  const walk = (css, media = "") => parseTopLevelCssBlocks(css, filePath, failures).map(({ header, body }) => {
    if (header.startsWith("@media")) return `${header} {${walk(body, header)}}`;
    const masked = body.replace(/([a-z-]+)\s*:\s*([^;{}]+);/g, (declaration, property, raw) => {
      const value = raw.trim();
      if (filePath === status && header === ".rain-activity-overlay" && media === "" &&
        ((property === "background" && value === "var(--rain-overlay-focus)") || (property === "backdrop-filter" && value === "blur(var(--rain-space-2))"))) return "";
      if (filePath === avatar && owners.has(header) && variables[property]?.includes(value)) return "";
      if (filePath === avatar && header.startsWith(".rain-avatar") && references[property]?.includes(value)) return "";
      if (filePath === avatar && header === '.rain-avatar[data-presence="offline"] > .rain-avatar__picture > img' && property === "filter" && value === "grayscale(1)") return "";
      if (media === "@media (forced-colors: active)" && system[header]?.[property] === value) return "";
      return declaration;
    });
    return `${header} {${masked}}`;
  }).join("\n");
  return walk(source);
}
