import { colorTokenOutputs } from "../packages/foundations/src/color-registry.ts";
import { hasInputNumberAuthorization } from "./verification-helpers.mjs";
import { parseTopLevelCssBlocks } from "./verify-tailwind-b2.mjs";
const css = "packages/ui/src/input-number/input-number.css";
const page = "apps/playground/src/docs/components/input-number-page.css";
const parents = ["Fill/Neutral/Solid/7", "Fill/Neutral/Solid/6", "Fill/Neutral/Solid/5", "Fill/Red/Solid/3", "Fill/Orange/Solid/3", "Background/Neutral/1", "Background/Neutral/3"];
export function getInputNumberColorConsumers() {
  /** @type {Array<[string, string, string, string, string, string?]>} */
  const rows = [
    [css, ".rain-input-number__step", "color", "Icon/Neutral/2", "meaningful-icon"],
    [css, ".rain-input-number__controls", "border-inline-start", "Border/Neutral/3", "decorative", "var(--rain-line-thickness-1) solid "],
    [css, '.rain-input-number__step[data-slot="decrease"]', "border-inline-end", "Border/Neutral/3", "decorative", "var(--rain-line-thickness-1) solid "],
    [css, '.rain-input-number__step[data-slot="increase"]', "border-inline-start", "Border/Neutral/3", "decorative", "var(--rain-line-thickness-1) solid "],
    [css, ".rain-input-number__step:not(:disabled):hover, .rain-input-number__clear:hover", "background", "Fill/Neutral/Alpha/3", "surface"],
    [css, ".rain-input-number__step:not(:disabled):active, .rain-input-number__clear:active", "background", "Fill/Neutral/Alpha/2", "surface"],
    [css, ".rain-input-number__step:disabled", "color", "Icon/Neutral/5", "disabled"],
    [css, '.rain-input-number[data-permission="disabled"] [data-slot="prefix-text"], .rain-input-number[data-permission="disabled"] [data-slot="suffix-text"]', "color", "Text/Neutral/6", "disabled"],
    [css, ".rain-input-number__clear", "color", "Icon/Neutral/3", "meaningful-icon"],
    [page, ".number-page", "background", "Background/Neutral/3", "surface"],
    [page, ".number-page", "color", "Text/Neutral/1", "text"],
    [page, ".number-page p, .number-page li", "color", "Text/Neutral/3", "text"],
    [page, ".number-page__panel", "background", "Background/Neutral/1", "surface"],
    [page, ".number-page pre", "background", "Background/Neutral/1", "surface"],
  ];
  return rows.map(([filePath, selector, property, tokenId, content, prefix = ""]) => ({
    filePath, selector, property, value: `${prefix}var(${colorTokenOutputs.find(token => token.id === tokenId).variable})`,
    parentSurfaces: filePath === page ? ["Background/Neutral/1", "Background/Neutral/3"] : parents,
    use: { tokenId, content, role: tokenId.split("/")[0].toLowerCase(), property: property.startsWith("border") ? "border-color" : property === "background" ? "background-color" : property,
      context: "component-recipe", recipeId: "input-number", evidenceRef: "docs/plans/2026-09-16-input-number.md",
      interaction: filePath === page || ["disabled", "decorative", "surface"].includes(content) ? "non-interactive" : "interactive",
      critical: content === "text" || content === "meaningful-icon",
    },
  }));
}

// These aliases are owned and audited by the existing shared field; system paints only apply in forced colors.
export function prepareInputNumberSource(filePath, source, phase, failures = []) {
  if (filePath !== css) return source;
  if (!hasInputNumberAuthorization(phase)) { failures.push("InputNumber colors require scoped authorization"); return source; }
  const aliases = {
    outline: ["var(--rain-line-thickness-1) solid var(--rain-field-focus-line)", "var(--rain-line-thickness-1) solid var(--rain-field-readonly-line)", "var(--rain-line-thickness-2) solid var(--rain-field-focus-line)"],
    "box-shadow": ["0 0 0 3px var(--rain-field-focus-halo)"],
    "border-bottom-color": ["var(--rain-field-readonly-line)"],
    "background-image": ["linear-gradient(var(--rain-field-readonly-line), var(--rain-field-readonly-line))"],
  };
  const system = { "border-color": ["ButtonText"], color: ["ButtonText", "GrayText"], "outline-color": ["Highlight"], outline: ["2px solid Highlight"], "border-bottom": ["2px solid Highlight"] };
  const walk = (text, forced = false) => parseTopLevelCssBlocks(text, "InputNumber colors", failures).map(({ header, body }) => {
    if (header.startsWith("@media")) return `${header} {${walk(body, header === "@media (forced-colors: active)")}}`;
    return `${header} {${body.replace(/([a-z-]+)\s*:\s*([^;{}]+);/g, (declaration, property, raw) => {
      if (header.startsWith(".rain-input-number") && ((header.includes(":focus-visible") && aliases[property]?.includes(raw.trim())) || (forced && system[property]?.includes(raw.trim())))) return "";
      return declaration;
    })}}`;
  }).join("\n");
  return walk(source);
}
