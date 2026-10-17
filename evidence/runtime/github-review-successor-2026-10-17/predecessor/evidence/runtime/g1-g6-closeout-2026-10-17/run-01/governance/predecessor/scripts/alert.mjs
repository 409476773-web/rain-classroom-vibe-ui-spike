import { colorTokenOutputs } from "../packages/foundations/src/color-registry.ts";
import { hasAlertAuthorization } from "./verification-helpers.mjs";
import { parseTopLevelCssBlocks } from "./verify-tailwind-b2.mjs";

const css = "packages/ui/src/alert/alert.css", page = "apps/playground/src/docs/components/alert-page.css";
const parents = ["Background/Neutral/1", "Background/Neutral/3"];
const tones = {
  info: { fill: "Fill/Brand/Alpha/4", border: "Border/Brand/3", text: "Text/Brand/1", icon: "Icon/Brand/1", actionBorder: "Border/Brand/1" },
  success: { fill: "Fill/Green/Alpha/2", border: "Border/Green/2", text: "Text/Green/1", icon: "Icon/Green/1", actionBorder: "Border/Green/1" },
  warning: { fill: "Fill/Orange/Alpha/2", border: "Border/Orange/2", text: "Text/Orange/1", icon: "Icon/Orange/1", actionBorder: "Border/Orange/1" },
  error: { fill: "Fill/Red/Alpha/2", border: "Border/Red/2", text: "Text/Red/1", icon: "Icon/Red/1", actionBorder: "Border/Red/1" },
};
export function getAlertColorConsumers() {
  // Explicit roles and actual composited surfaces; independent of the CSS being checked.
  const rows = [
    [page, ".alert-demo", "background-color", "Background/Neutral/1", "surface"],
    [page, ".alert-demo", "color", "Text/Neutral/1", "text"],
    [page, ".alert-demo__eyebrow, .alert-demo__label", "color", "Text/Neutral/3", "text"],
    [page, ".alert-demo .alert-demo__intro", "color", "Text/Neutral/2", "text"],
    [page, ".alert-demo__section", "border-top", "Border/Neutral/3", "decorative"],
    [page, ".alert-demo__section-heading > p, .alert-demo__note", "color", "Text/Neutral/3", "text", ["Background/Neutral/1", "Background/Neutral/2"]],
    [page, ".alert-demo__detail", "background-color", "Background/Neutral/2", "surface"],
    [page, ".alert-demo__canvas", "border", "Border/Neutral/3", "decorative"],
    [page, ".alert-demo__canvas-body p", "color", "Text/Neutral/3", "text"],
    [page, ".alert-demo__usage", "border-top", "Border/Neutral/3", "decorative"],
  ];
  for (const [tone, palette] of Object.entries(tones)) {
    const action = `.rain-alert[data-tone="${tone}"] .rain-alert__actions > [data-rain-id="ui-button"]`;
    rows.push(
      [css, `.rain-alert[data-tone="${tone}"]`, "background-color", palette.fill, "surface"],
      [css, `.rain-alert[data-tone="${tone}"]`, "border-color", palette.border, "decorative"],
      [css, action, "color", palette.text, "text", [palette.fill]],
      [css, action, "border-color", palette.actionBorder, "decorative", [palette.fill]],
      [css, `${action} [data-slot="label"]`, "color", palette.text, "text", [palette.fill]],
      [css, `${action} :is([data-slot="leading-icon"], [data-slot="trailing-icon"])`, "color", palette.icon, "meaningful-icon", [palette.fill]],
      [css, `.rain-alert[data-tone="${tone}"] > .rain-alert__icon`, "color", palette.icon, "meaningful-icon", [palette.fill]],
      [css, `.rain-alert[data-tone="${tone}"]`, "color", palette.text, "text", [palette.fill]],
    );
  }
  rows.push([css, '.rain-alert .rain-alert__actions > [data-rain-id="ui-button"][data-variant="tertiary"]', "background-color", "Background/Neutral/1", "surface"]);
  return rows.map(([filePath, selector, property, tokenId, content, parentSurfaces = parents]) => ({
    filePath, selector, property, parentSurfaces, parentBackgrounds: parents,
    ...(filePath === css && content === "text" ? { contrastReview: "pending-review" } : {}),
    value: `${["border", "border-top", "outline"].includes(property) ? `var(--rain-line-thickness-${property === "outline" ? 2 : 1}) solid ` : ""}var(${colorTokenOutputs.find(token => token.id === tokenId).variable})`,
    use: { tokenId, content, role: tokenId.split("/")[0].toLowerCase(), property: property.startsWith("border") || property === "outline" ? "border-color" : property,
      context: "component-recipe", recipeId: "alert",
      evidenceRef: "docs/plans/2026-09-20-alert.md", interaction: property === "outline" ? "interactive" : "non-interactive",
      critical: ["text", "meaningful-icon", "essential-boundary"].includes(content), ...(tokenId.includes("/Brand/") ? { brandIntent: "action" } : {}),
    },
  }));
}

export function prepareAlertSource(filePath, source, phase, failures = []) {
  if (![css, page].includes(filePath)) return source;
  if (!hasAlertAuthorization(phase)) { failures.push("Alert colors require exact scoped authorization"); return source; }
  const system = {
    '.rain-alert[data-tone]': { color: "CanvasText", "background-color": "Canvas", "border-color": "CanvasText" },
    '.rain-alert[data-tone] > .rain-alert__icon': { color: "CanvasText" },
  };
  const walk = (text, forced = false) => parseTopLevelCssBlocks(text, filePath, failures).map(({ header, body }) => {
    if (header.startsWith("@")) return `${header} {${walk(body, header === "@media (forced-colors: active)")}}`;
    return `${header} {${body.replace(/([a-z-]+)\s*:\s*([^;{}]+);/g, (declaration, property, value) =>
      filePath === css && forced && system[header]?.[property] === value.trim() ? "" : declaration)}}`;
  }).join("\n");
  return walk(source);
}
