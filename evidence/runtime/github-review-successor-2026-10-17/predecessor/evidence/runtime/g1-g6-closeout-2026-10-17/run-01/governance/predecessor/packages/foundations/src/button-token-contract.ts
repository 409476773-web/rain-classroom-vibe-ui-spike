import {
  colorTokenOutputs, measureColorContrast, resolveColor, validateColorUse,
  type ColorTheme, type ColorUse, type ColorValue,
} from "./color-registry.ts";

type Source = Readonly<{ tokenId: string; alpha?: number; alphaOperation?: "apply" | "replace"; componentOpacity?: number; opacityScope?: "leaf" }>;
const source = (tokenId: string, alpha?: number, alphaOperation: "apply" | "replace" = "apply"): Source =>
  alpha === undefined ? { tokenId } : { tokenId, alpha, alphaOperation };
// User-confirmed paint opacity applies to each background/border, never to the foreground or group.
const loadingPaint = (entry: Source): Source => ({ ...entry, componentOpacity: 0.82, opacityScope: "leaf" });

/** Component aliases own roles and state choices; RGB facts remain in the Category registry. */
const sources: Readonly<Record<string, Source>> = {
  "primary-bg": source("Fill/Brand/Solid/2"),
  "primary-hover-bg": source("Fill/Brand/Alpha/1"),
  "primary-pressed-bg": source("Fill/Brand/Alpha/1"),
  "secondary-bg": source("Fill/Brand/Solid/4"),
  "secondary-hover-bg": source("Fill/Brand/Alpha/3"),
  "secondary-pressed-bg": source("Fill/Brand/Alpha/3"),
  "secondary-border": source("Border/Brand/2"),
  "secondary-text": source("Text/Brand/1"),
  "tertiary-text": source("Text/Neutral/3"),
  "tertiary-border": source("Border/Neutral/3"),
  "tertiary-hover-bg": source("Fill/Neutral/Alpha/4"),
  "tertiary-pressed-bg": source("Fill/Neutral/Alpha/3"),
  "danger-primary-bg": source("Fill/Red/Solid/2"),
  "danger-primary-hover-bg": source("Fill/Red/Solid/1"),
  "danger-primary-pressed-bg": source("Fill/Red/Solid/1"),
  "danger-subtle-bg": source("Fill/Red/Solid/3", 35),
  "danger-subtle-hover-bg": source("Fill/Red/Solid/3", 65),
  "danger-subtle-pressed-bg": source("Fill/Red/Solid/3", 90),
  "danger-border": source("Border/Red/2"),
  "danger-text": source("Text/Red/1"),
  "text-default-color": source("Text/Neutral/3"),
  "text-brand-color": source("Text/Brand/1"),
  "text-danger-color": source("Text/Red/1"),
  "text-hover-bg": source("Fill/Neutral/Alpha/6"),
  "text-pressed-bg": source("Fill/Neutral/Alpha/5"),
  "text-danger-hover-bg": source("Fill/Red/Solid/3", 35),
  "text-danger-pressed-bg": source("Fill/Red/Solid/3", 65),
  "neutral-icon": source("Icon/Neutral/2"),
  "brand-icon": source("Icon/Brand/1"),
  "danger-icon": source("Icon/Red/1"),
  "on-color-foreground": source("OnColor/1"),
  "trailing-neutral-icon": source("Icon/Neutral/3"),
  "trailing-brand-icon": source("Icon/Brand/2"),
  "trailing-danger-icon": source("Icon/Red/2"),
  "trailing-on-color-foreground": source("OnColor/2"),
  "trailing-danger-on-color-foreground": source("OnColor/1", 90),
  "trailing-tertiary-icon": source("Icon/Neutral/2", 80),
  "strong-brand-border": source("Border/Brand/1"),
  "strong-danger-border": source("Border/Red/1"),
  "focus-outline": source("Border/Brand/1"),
  "focus-halo": source("Fill/Brand/Alpha/3"),
  "text-focus-outline": source("Border/Brand/1"),
  "text-focus-halo": source("Fill/Brand/Alpha/3"),
  "review-surface": source("Background/Neutral/1"),
  "review-page": source("Background/Neutral/3"),
  "review-text": source("Text/Neutral/1"),
  "loading-primary-bg": loadingPaint(source("Fill/Brand/Alpha/1", 90, "replace")),
  "loading-secondary-bg": loadingPaint(source("Fill/Brand/Solid/4")),
  "loading-danger-primary-bg": loadingPaint(source("Fill/Red/Solid/1")),
  "loading-danger-subtle-bg": loadingPaint(source("Fill/Red/Solid/3", 35)),
  "loading-secondary-border": loadingPaint(source("Border/Brand/2")),
  "loading-tertiary-border": loadingPaint(source("Border/Neutral/3")),
  "loading-danger-border": loadingPaint(source("Border/Red/2")),
};

function getSource(name: string, theme: ColorTheme): Source {
  if (theme !== "light" && theme !== "dark") throw new Error(`Unsupported Button theme: ${theme}`);
  if (name === "loading-primary-bg" && theme === "dark") return loadingPaint(source("Fill/Brand/Alpha/2"));
  if (name === "loading-danger-primary-bg" && theme === "dark") return loadingPaint(source("Fill/Red/Solid/2"));
  if ((name === "danger-primary-hover-bg" || name === "danger-primary-pressed-bg") && theme === "dark") return source("Fill/Red/Solid/2", 85);
  const entry = sources[name];
  if (!entry) throw new Error(`Unknown Button color alias: ${name}`);
  return entry;
}

export function getButtonColorVariables(theme: ColorTheme = "light"): Record<string, string> {
  return { ...Object.fromEntries(Object.keys(sources).map((name) => {
    const entry = getSource(name, theme);
    const output = colorTokenOutputs.find((token) => token.id === entry.tokenId)!;
    const reference = `var(${output.variable})`;
    const value = entry.alpha === undefined ? reference : entry.alphaOperation === "replace"
      ? `rgb(from ${reference} r g b / ${entry.alpha}%)`
      : `color-mix(in srgb, ${reference} ${entry.alpha}%, transparent)`;
    return [`--rain-button-${name}`, entry.componentOpacity === undefined ? value
      : `color-mix(in srgb, ${value} calc(var(--rain-button-loading-opacity) * 100%), transparent)`];
  })),
    // Resolve the composed paint again at each theme boundary, like its color aliases.
    "--rain-button-focus-primary-shadow": "0 0 0 1px var(--rain-color-surface-panel), 0 0 0 4px var(--rain-button-focus-halo)",
    "--rain-button-focus-rest-shadow": "0 0 0 3px var(--rain-button-focus-halo)",
    "--rain-button-text-focus-shadow": "0 0 0 3px var(--rain-button-text-focus-halo)",
  };
}

const newAliases = [
  "neutral-icon", "brand-icon", "danger-icon", "on-color-foreground",
  "trailing-neutral-icon", "trailing-brand-icon", "trailing-danger-icon", "trailing-on-color-foreground", "trailing-tertiary-icon",
  "trailing-danger-on-color-foreground",
  "strong-brand-border", "strong-danger-border", "focus-outline", "review-surface", "review-page", "review-text",
  "loading-primary-bg", "loading-secondary-bg", "loading-danger-primary-bg", "loading-danger-subtle-bg",
  "loading-secondary-border", "loading-tertiary-border", "loading-danger-border",
] as const;

/** Existing Button Tailwind bridges keep their names; only new roles need new bridges. */
export const buttonColorThemeMappings: Readonly<Record<string, string>> = Object.freeze(Object.fromEntries(
  newAliases.map((name) => [`--color-rain-button-${name}`, `var(--rain-button-${name})`]),
));

export type ButtonColorPart = Readonly<{
  /** trailing-icon describes the dual-icon case only; a lone trailing icon retains icon's source. */
  part: "background" | "border" | "label" | "icon" | "trailing-icon";
  alias: string;
  use: ColorUse;
  darkUse?: ColorUse;
}>;
export type ButtonColorRecipe = Readonly<{
  id: string; variant: "primary" | "secondary" | "tertiary" | "text";
  tone: "default" | "brand" | "danger";
  state: "default" | "hover" | "pressed" | "disabled" | "loading";
  opacity: number; parts: readonly ButtonColorPart[];
}>;

function part(partName: ButtonColorPart["part"], name: string, recipeId: string, disabled: boolean, textDisabled: boolean): ButtonColorPart {
  const role = partName === "background" ? "fill" : partName === "label" ? "text" : partName === "trailing-icon" ? "icon" : partName;
  const content = partName === "background" ? "surface" : disabled ? "disabled"
    : partName === "border" ? "decorative" : partName === "label" ? "text" : "meaningful-icon";
  const use = (theme: ColorTheme): ColorUse => ({
    ...getSource(name, theme), role, property: partName === "background" ? "background-color" : partName === "border" ? "border-color" : "color",
    content, context: "component-recipe", recipeId, brandIntent: "action", onColor: name.endsWith("on-color-foreground"),
    interaction: "interactive", critical: true,
    evidenceRef: "docs/plans/2026-09-05-size-density-first-recipes.md#12",
    ...(textDisabled && (partName === "label" || role === "icon") ? { componentOpacity: 0.3, opacityScope: "leaf" as const } : {}),
  });
  return { part: partName, alias: `--rain-button-${name}`, use: use("light"),
    ...(getSource(name, "dark") !== getSource(name, "light") ? { darkUse: use("dark") } : {}) };
}

function makeRecipe(variant: ButtonColorRecipe["variant"], tone: ButtonColorRecipe["tone"], state: ButtonColorRecipe["state"]): ButtonColorRecipe {
  const text = variant === "text", danger = tone === "danger", primary = variant === "primary";
  const disabled = state === "disabled", loading = state === "loading", hover = state === "hover", pressed = state === "pressed";
  const id = `button-${variant}-${tone}-${state}`;
  const label = text ? `text-${tone}-color` : primary ? "on-color-foreground" : danger ? "danger-text" : `${variant}-text`;
  const icon = !text && primary ? "on-color-foreground" : danger ? "danger-icon" : tone === "brand" || variant === "secondary" ? "brand-icon" : "neutral-icon";
  let background: string | null = null, border: string | null = text || primary ? null : danger ? "danger-border" : variant === "secondary" ? "secondary-border" : variant === "tertiary" ? "tertiary-border" : null;
  if (text) {
    if (hover || pressed) background = `text-${danger ? "danger-" : ""}${pressed ? "pressed" : "hover"}-bg`;
  } else if (danger) {
    if (primary || variant === "secondary" || hover || pressed) background = `danger-${primary ? "primary" : "subtle"}${pressed ? "-pressed" : hover ? "-hover" : ""}-bg`;
    if (pressed && primary) border = "strong-danger-border";
  } else {
    if (variant !== "tertiary" || hover || pressed) background = `${variant}${pressed ? "-pressed" : hover ? "-hover" : ""}-bg`;
    if (pressed && (primary || variant === "secondary")) border = "strong-brand-border";
  }
  if (loading && !text) {
    if (background) background = `loading-${background}`;
    if (border) border = `loading-${border}`;
  }
  const entries: Array<[ButtonColorPart["part"], string | null]> = [["background", background], ["border", border], ["label", label], ["icon", icon]];
  if (!loading) entries.push(["trailing-icon", primary && danger ? "trailing-danger-on-color-foreground" : danger ? "trailing-danger-icon" : primary ? "trailing-on-color-foreground"
    : variant === "tertiary" ? "trailing-tertiary-icon" : tone === "brand" || variant === "secondary" ? "trailing-brand-icon" : "trailing-neutral-icon"]);
  return Object.freeze({ id, variant, tone, state, opacity: disabled && !text ? primary ? 0.3 : 0.4 : 1,
    parts: Object.freeze(entries.filter((entry): entry is [ButtonColorPart["part"], string] => entry[1] !== null)
      .map(([partName, name]) => part(partName, name, id, disabled, disabled && text))),
  });
}

export const buttonColorRecipes: readonly ButtonColorRecipe[] = Object.freeze(
  (["primary", "secondary", "tertiary", "text"] as const).flatMap((variant) =>
    (variant === "text" ? ["default", "brand", "danger"] as const : ["default", "danger"] as const).flatMap((tone) =>
      (["default", "hover", "pressed", "disabled", "loading"] as const).map((state) => makeRecipe(variant, tone, state)))),
);

function composite(value: ColorValue, parent: ColorValue): ColorValue {
  return { rgb: value.rgb.map((channel, index) => Math.min(255, Math.max(0,
    channel * value.alpha + parent.rgb[index]! * (1 - value.alpha)))) as [number, number, number], alpha: 1 };
}

/** One declared Alpha fill over an opaque review surface; Focus paints outside that surface. */
export function validateButtonColorRecipe(recipe: ButtonColorRecipe, theme: ColorTheme, parentId: string) {
  if (!["Background/Neutral/1", "Background/Neutral/3"].includes(parentId)) throw new Error("Button parent surface is outside the reviewed contract");
  if (!Number.isFinite(recipe.opacity) || recipe.opacity < 0 || recipe.opacity > 1) throw new Error("Invalid Button group opacity");
  const parent = resolveColor(parentId, theme);
  const selectedUse = (entry: ButtonColorPart) => {
    const use = theme === "dark" ? entry.darkUse ?? entry.use : entry.use;
    const expected = getSource(entry.alias.replace(/^--rain-button-/, ""), theme);
    if (use.tokenId !== expected.tokenId || use.alpha !== expected.alpha || use.alphaOperation !== expected.alphaOperation) {
      throw new Error(`Button alias source mismatch: ${entry.alias}`);
    }
    if ((entry.part === "background" || entry.part === "border")
      && (use.componentOpacity !== expected.componentOpacity || use.opacityScope !== expected.opacityScope)) {
      throw new Error(`Button alias paint opacity mismatch: ${entry.alias}`);
    }
    return use;
  };
  const fill = recipe.parts.find((entry) => entry.part === "background");
  const fillUse = fill ? selectedUse(fill) : null;
  const fillValue = fillUse ? validateColorUse({ ...fillUse, theme, parentSurfaceId: parentId }).value : parent;
  const surface = composite({ ...fillValue, alpha: fillValue.alpha * (fillUse?.componentOpacity ?? 1) }, parent);
  const paintedBackground = composite({ ...surface, alpha: recipe.opacity }, parent);
  if (!recipe.parts.some((entry) => entry.part === "label") || !recipe.parts.some((entry) => entry.part === "icon")) throw new Error("Button recipe needs label and icon colors");
  let textContrast = 0, iconContrast = Infinity, trailingIconContrast: number | null = null;
  let acceptedTextContrastException: { actual: number; minimum: 4.5; decisionSource: "explicit-user-acceptance-danger-primary-text-contrast" } | null = null;
  for (const entry of recipe.parts) {
    if (entry.part === "background") continue;
    const use = selectedUse(entry);
    // Validate source identity/role eligibility against its declared Category surface.
    // Its returned source contrast is not the measurement of the derived Alpha or group paint below.
    const acceptedBackground = recipe.state === "loading" ? "--rain-button-loading-danger-primary-bg"
      : `--rain-button-danger-primary${recipe.state === "default" ? "" : `-${recipe.state}`}-bg`;
    const acceptedText = recipe.variant === "primary" && recipe.tone === "danger" && recipe.opacity === 1
      && ["default", "hover", "pressed", "loading"].includes(recipe.state)
      && entry.part === "label" && entry.alias === "--rain-button-on-color-foreground"
      && fill?.alias === acceptedBackground && use.tokenId === "OnColor/1"
      && use.role === "text" && use.property === "color" && use.content === "text"
      && use.alpha === undefined && use.componentOpacity === undefined;
    let checked: Pick<ReturnType<typeof validateColorUse>, "value" | "minimumContrast">;
    try {
      checked = validateColorUse({ ...use, theme,
        parentSurfaceId: fillUse?.tokenId ?? parentId,
        ...(fillUse ? { parentBackgroundId: parentId } : {}),
      });
    } catch (error) {
      // The user's exception covers this text paint only; global, role and Icon checks remain strict.
      if (!acceptedText || !(error instanceof Error) || !error.message.startsWith("Insufficient contrast:")) throw error;
      checked = { value: resolveColor(use.tokenId, theme), minimumContrast: 4.5 };
    }
    if (entry.part === "border") continue;
    const leaf = composite({ ...checked.value, alpha: checked.value.alpha * (use.componentOpacity ?? 1) }, surface);
    const paintedForeground = composite({ ...leaf, alpha: recipe.opacity }, parent);
    const contrast = measureColorContrast(paintedForeground, paintedBackground);
    if (contrast < checked.minimumContrast) {
      if (!acceptedText) throw new Error(`${recipe.id} ${entry.part} actual contrast ${contrast.toFixed(3)} < ${checked.minimumContrast}`);
      acceptedTextContrastException = { actual: contrast, minimum: 4.5, decisionSource: "explicit-user-acceptance-danger-primary-text-contrast" };
    }
    if (entry.part === "label") textContrast = contrast;
    else {
      iconContrast = Math.min(iconContrast, contrast);
      if (entry.part === "trailing-icon") trailingIconContrast = contrast;
    }
  }
  return { textContrast, iconContrast, trailingIconContrast, acceptedTextContrastException, surface, paintedBackground, parentId, theme };
}
