import { tagActionColorSources, tagCategorySources, tagColorSource, tagStrongFillFamilies, tagSurfaceForegroundPairs, tagColorProfiles, tagColorProfileNames, tagColorSearchTerms, learningUnitTagProfiles, groupTypeTagProfiles, type TagPaint } from "./tag-token-contract.ts";

/** Confirmed Light/Dark Category facts; approved Semantic mappings live in token-contract. */
export type ColorCategory = "Text" | "Icon" | "Border" | "Background" | "Fill" | "OnColor";
export type ColorRole = "text" | "icon" | "border" | "background" | "fill";
export type ColorProperty = "color" | "background-color" | "border-color" | "outline-color";
export type ColorTheme = "light" | "dark";
export type ColorValue = Readonly<{ rgb: readonly [number, number, number]; alpha: number }>;
export type ColorToken = Readonly<{
  id: string; profileId: string; category: ColorCategory; family: string | null;
  mode: "Solid" | "Alpha" | null; key: number; order: number;
  light: ColorValue; dark: ColorValue; source: string; darkSource: string; lifecycle: "registry-candidate";
}>;

export const colorAlphaValues: readonly number[] = Object.freeze([5, 6, 10, 12, 15, 16, 18, 20, 25, 28, 30, 35, 40, 45, 55, 65, 75, 80, 85, 90]);

type ColorProfile = Readonly<{
  id: string; category: ColorCategory; direction: "strong-to-weak" | "front-to-back";
  defaultIds: readonly string[]; weakIds: readonly string[]; conditionalIds: readonly string[]; defaultParentSurfaceId: null;
  usageLabels: "pending-consumer-review";
}>;

// User-confirmed Excel input, including the Solid/2 correction and 77 blank Alpha = 100%.
const darkColors: Readonly<Record<string, readonly [hex: string, alphaPercent?: number]>> = Object.freeze({
  "Text/Neutral/1": ["#EFF1F5"],
  "Text/Neutral/2": ["#D3DAF0"],
  "Text/Neutral/3": ["#B7C1E0"],
  "Text/Neutral/4": ["#949CB8"],
  "Text/Neutral/5": ["#8891AD"],
  "Text/Neutral/6": ["#6F7A9E"],
  "Text/Brand/1": ["#7CA5FF"],
  "Text/Brand/2": ["#5188FF"],
  "Text/Brand/3": ["#2F71FF"],
  "Text/Second/1": ["#BCD1FF"],
  "Text/Second/2": ["#95B0EA"],
  "Text/Second/3": ["#566E9F"],
  "Text/Second/4": ["#2A3854"],
  "Text/Orange/1": ["#E49523"],
  "Text/Orange/2": ["#C16E0C"],
  "Text/Green/1": ["#14BF82"],
  "Text/Green/2": ["#119B68"],
  "Text/Red/1": ["#F55858"],
  "Text/Red/2": ["#E13843"],
  "Icon/Neutral/1": ["#D3DAF0"],
  "Icon/Neutral/2": ["#B7C1E0"],
  "Icon/Neutral/3": ["#8891AD"],
  "Icon/Neutral/4": ["#8490B5"],
  "Icon/Neutral/5": ["#555F80"],
  "Icon/Brand/1": ["#7CA5FF"],
  "Icon/Brand/2": ["#5188FF"],
  "Icon/Second/1": ["#BCD1FF"],
  "Icon/Second/2": ["#95B0EA"],
  "Icon/Second/3": ["#566E9F"],
  "Icon/Second/4": ["#2A3854"],
  "Icon/Orange/1": ["#E49523"],
  "Icon/Orange/2": ["#C16E0C"],
  "Icon/Green/1": ["#14BF82"],
  "Icon/Green/2": ["#119B68"],
  "Icon/Red/1": ["#F55858"],
  "Icon/Red/2": ["#E13843"],
  "Border/Neutral/1": ["#C2D4FF", 35],
  "Border/Neutral/2": ["#C2D4FF", 20],
  "Border/Neutral/3": ["#C2D4FF", 10],
  "Border/Neutral/4": ["#C2D4FF", 5],
  "Border/Brand/1": ["#2A5DCB"],
  "Border/Brand/2": ["#3054A4"],
  "Border/Brand/3": ["#233B71"],
  "Border/Second/1": ["#4D5B8B"],
  "Border/Second/2": ["#2C3450"],
  "Border/Orange/1": ["#F78600"],
  "Border/Orange/2": ["#643D17"],
  "Border/Green/1": ["#14BF82"],
  "Border/Green/2": ["#155243"],
  "Border/Red/1": ["#63292F"],
  "Border/Red/2": ["#3C2835"],
  "Background/Neutral/1": ["#1E243B"],
  "Background/Neutral/2": ["#1A1F33"],
  "Background/Neutral/3": ["#15192B"],
  "Background/Neutral/4": ["#101322"],
  "Background/Neutral/5": ["#05070E"],
  "Background/Dark/1": ["#646D91"],
  "Background/Dark/2": ["#ABB2CC"],
  "Background/Dark/3": ["#E5EBFF"],
  "Fill/Neutral/Solid/1": ["#2D3452"],
  "Fill/Neutral/Solid/2": ["#2A304A"],
  "Fill/Neutral/Solid/3": ["#242A41"],
  "Fill/Neutral/Solid/4": ["#1F2439"],
  "Fill/Neutral/Solid/5": ["#181C2B"],
  "Fill/Neutral/Solid/6": ["#131726"],
  "Fill/Neutral/Solid/7": ["#070B1D"],
  "Fill/Brand/Solid/1": ["#3C7AFF"],
  "Fill/Brand/Solid/2": ["#266BFF"],
  "Fill/Brand/Solid/3": ["#273B7C"],
  "Fill/Brand/Solid/4": ["#203065"],
  "Fill/Second/Solid/1": ["#485380"],
  "Fill/Second/Solid/2": ["#2F3754"],
  "Fill/Second/Solid/3": ["#1F2643"],
  "Fill/Orange/Solid/1": ["#FFA53A"],
  "Fill/Orange/Solid/2": ["#E38618"],
  "Fill/Orange/Solid/3": ["#28251E"],
  "Fill/Green/Solid/1": ["#01AF73"],
  "Fill/Green/Solid/2": ["#006E48"],
  "Fill/Green/Solid/3": ["#192C27"],
  "Fill/Red/Solid/1": ["#F34848"],
  "Fill/Red/Solid/2": ["#AE313A"],
  "Fill/Red/Solid/3": ["#301F1F"],
  "Fill/Neutral/Alpha/1": ["#6E81C8", 40],
  "Fill/Neutral/Alpha/2": ["#566AB5", 30],
  "Fill/Neutral/Alpha/3": ["#566AB5", 20],
  "Fill/Neutral/Alpha/4": ["#566AB5", 15],
  "Fill/Neutral/Alpha/5": ["#566AB5", 10],
  "Fill/Neutral/Alpha/6": ["#566AB5", 6],
  "Fill/Brand/Alpha/1": ["#3577FB", 85],
  "Fill/Brand/Alpha/2": ["#2164EB", 75],
  "Fill/Brand/Alpha/3": ["#3860FF", 30],
  "Fill/Brand/Alpha/4": ["#145FFF", 10],
  "Fill/Second/Alpha/1": ["#6F92F3", 18],
  "Fill/Second/Alpha/2": ["#6F92F3", 10],
  "Fill/Orange/Alpha/1": ["#E38618", 18],
  "Fill/Orange/Alpha/2": ["#E38618", 10],
  "Fill/Green/Alpha/1": ["#00FFB2", 18],
  "Fill/Green/Alpha/2": ["#00FFB2", 10],
  "Fill/Red/Alpha/1": ["#F34848", 18],
  "Fill/Red/Alpha/2": ["#F34848", 10],
  "OnColor/1": ["#FFFFFF"],
  "OnColor/2": ["#FFFFFF", 90],
  "OnColor/3": ["#FFFFFF", 80],
  "OnColor/4": ["#E4E9FF", 55],
  "OnColor/5": ["#E5EAFF", 30],
});

function colorFact(hex: string, alphaPercent = 100, registeredTagPreset = false): ColorValue {
  if (!/^#[\da-f]{6}$/i.test(hex) || !Number.isFinite(alphaPercent) || alphaPercent <= 0 || alphaPercent > 100
    || (!registeredTagPreset && alphaPercent !== 100 && !colorAlphaValues.includes(alphaPercent))) {
    throw new Error(`Invalid color fact: ${hex} / ${alphaPercent}`);
  }
  const rgb = Object.freeze([1, 3, 5].map(offset => Number.parseInt(hex.slice(offset, offset + 2), 16))) as unknown as readonly [number, number, number];
  return Object.freeze({rgb, alpha: alphaPercent / 100});
}

function scale(
  profileId: string,
  rows: readonly (readonly [key: number, hex: string, alphaPercent?: number])[],
  defaultKeys: readonly number[] = [],
  weakKeys: readonly number[] = [],
  conditionalKeys: readonly number[] = [],
  source = "docs/plans/2026-09-05-color-token-governance-design.md#4",
  pairedDark?: Readonly<Record<number, TagPaint>>,
) {
  const [category, family, mode] = profileId.split("/") as [ColorCategory, string?, ("Solid" | "Alpha")?];
  const profile: ColorProfile = Object.freeze({
    id: profileId, category, direction: category === "Background" ? "front-to-back" : "strong-to-weak",
    defaultIds: Object.freeze(defaultKeys.map((key) => `${profileId}/${key}`)),
    weakIds: Object.freeze(weakKeys.map((key) => `${profileId}/${key}`)),
    conditionalIds: Object.freeze(conditionalKeys.map((key) => `${profileId}/${key}`)),
    defaultParentSurfaceId: null,
    usageLabels: "pending-consumer-review",
  });
  const tokens: readonly ColorToken[] = rows.map(([key, hex, alphaPercent = 100], index) => {
    const dark = pairedDark ? pairedDark[key] : darkColors[`${profileId}/${key}`];
    if (!dark) throw new Error(`Missing Dark color fact: ${profileId}/${key}`);
    return Object.freeze({
      id: `${profileId}/${key}`, profileId, category, family: family ?? null, mode: mode ?? null,
      key, order: index + 1, light: colorFact(hex, alphaPercent, source === tagColorSource), dark: colorFact(dark[0], dark[1], source === tagColorSource),
      source, darkSource: pairedDark ? source : "evidence/runtime/color-dark-theme/confirmed-input.json",
      lifecycle: "registry-candidate",
    });
  });
  return { profile, tokens };
}

// Shared initial Text/Icon inputs preserve separate public identities, not a cross-category Alias.
const supplementalColors = {
  Second: { text: [[1, "#1C3A9C"], [2, "#3751A7"], [3, "#576EBD"], [4, "#91ACEA"]], border: [[1, "#5F7DE1"], [2, "#ACBAEA"]], solid: [[1, "#3752AB"], [2, "#365BD6"], [3, "#E3E9FC"]], alpha: [[1, "#4976F2", 18], [2, "#4976F2", 10]] },
  Orange: { text: [[1, "#DD5C00"], [2, "#F18300"]], border: [[1, "#F78600"], [2, "#FFD6B7"]], solid: [[1, "#EB7600"], [2, "#F78600"], [3, "#FFF2EB"]], alpha: [[1, "#F78600", 18], [2, "#F78600", 10]] },
  Green: { text: [[1, "#058952"], [2, "#00B574"]], border: [[1, "#14BF82"], [2, "#98DAC5"]], solid: [[1, "#0E9954"], [2, "#14B565"], [3, "#E7F9F2"]], alpha: [[1, "#14B565", 18], [2, "#14B565", 10]] },
  Red: { text: [[1, "#CA2732"], [2, "#F34848"]], border: [[1, "#F34848"], [2, "#F5BABC"]], solid: [[1, "#E13843"], [2, "#F34848"], [3, "#FCEDED"]], alpha: [[1, "#F34848", 18], [2, "#F34848", 10]] },
} as const;
export const colorFillFamilies: readonly string[] = Object.freeze([...Object.keys(supplementalColors), ...tagStrongFillFamilies]);

// Key is explicit; row position determines order only. Inserting a row never renames another ID.
const originalScales = [
  scale("Text/Neutral", [[1, "#142346"], [2, "#3A4865"], [3, "#495D87"], [4, "#56688F"], [5, "#7485A8"], [6, "#A0ACC5"]], [], [4, 5, 6]),
  scale("Text/Brand", [[1, "#0F55DF"], [2, "#1561F8"], [3, "#3D7BFF"]], [1]),
  scale("Icon/Neutral", [[1, "#3A4865"], [2, "#495D87"], [3, "#7485A8"], [4, "#96A3C1"], [5, "#B8C2D8"]], [], [4, 5]),
  scale("Icon/Brand", [[1, "#0F55DF"], [2, "#1561F8"]], [1]),
  scale("Border/Neutral", [[1, "#103FB7", 35], [2, "#103FB7", 25], [3, "#103FB7", 16], [4, "#103FB7", 10]], [2, 3]),
  scale("Border/Brand", [[1, "#3D7BFF"], [2, "#6495FF"], [3, "#B5CCFC"]]),
  scale("Background/Neutral", [[1, "#FFFFFF"], [2, "#F7F9FF"], [3, "#F2F4FF"], [4, "#EBEFFF"], [5, "#E3E9FD"]], [1, 2, 3], [], [4, 5]),
  scale("Background/Dark", [[1, "#15192B"], [2, "#32364B"], [3, "#535970"]], [2, 3]),
  scale("Fill/Neutral/Solid", [[1, "#CCD4ED"], [2, "#D7DEF5"], [3, "#E3E9FD"], [4, "#EBEFFF"], [5, "#F2F4FF"], [6, "#F5F7FE"], [7, "#FFFFFF"]], [4, 5, 6, 7], [], [1, 2, 3]),
  scale("Fill/Neutral/Alpha", [[1, "#546CC6", 28], [2, "#4A66D1", 20], [3, "#5075FE", 16], [4, "#5075FE", 12], [5, "#5577F4", 10], [6, "#5570F4", 6]], [3, 4, 5, 6], [], [1, 2]),
  scale("Fill/Brand/Solid", [[1, "#0F55DF"], [2, "#1561F8"], [3, "#C6D8FF"], [4, "#E0EAFF"]]),
  scale("Fill/Brand/Alpha", [[1, "#003AAD", 85], [2, "#154DBE", 65], [3, "#3D7BFF", 20], [4, "#3D7BFF", 10]]),
  scale("OnColor", [[1, "#FFFFFF"], [2, "#FFFFFF", 85], [3, "#E8F0FF", 75], [4, "#D8E0FF", 45], [5, "#D8E0FF", 25]], [1]),
  ...Object.entries(supplementalColors).flatMap(([family, colors]) => [
    scale(`Text/${family}`, colors.text, [], [], [], "docs/plans/2026-09-06-color-family-supplement-design.md#2"),
    scale(`Icon/${family}`, colors.text, [], [], [], "docs/plans/2026-09-06-color-family-supplement-design.md#2"),
    scale(`Border/${family}`, colors.border, [], [], [], "docs/plans/2026-09-06-color-family-supplement-design.md#2"),
    scale(`Fill/${family}/Solid`, colors.solid, [], [], [], "docs/plans/2026-09-06-color-family-supplement-design.md#2"),
    scale(`Fill/${family}/Alpha`, colors.alpha, [], [], [], "docs/plans/2026-09-06-color-family-supplement-design.md#2"),
  ]),
];

const tagScales = tagCategorySources.map(({ profileId, rows }) => scale(profileId,
  rows.map(([key, light]) => [key, light[0], light[1]]), [], [], [], tagColorSource,
  Object.fromEntries(rows.map(([key, , dark]) => [key, dark]))));
const hex = (value: ColorValue) => `#${value.rgb.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
const neutralSolidText = originalScales.flatMap(({ tokens }) => tokens).find(({ id }) => id === tagActionColorSources.neutralSolid)!;
const neutralSolidIcon = scale("Icon/TagNeutralSolid", [[1, hex(neutralSolidText.light), neutralSolidText.light.alpha * 100]], [], [], [], tagColorSource,
  { 1: [hex(neutralSolidText.dark), neutralSolidText.dark.alpha * 100] });
const actionScales = Object.entries(tagActionColorSources).map(([name, id]) => {
  const source = originalScales.flatMap(({ tokens }) => tokens).find((token) => token.id === id)!;
  return scale(`Fill/Tag${name[0]!.toUpperCase()}${name.slice(1)}Action/Alpha`, [[1, hex(source.light), 12], [2, hex(source.light), 18]], [], [], [], tagColorSource,
    { 1: [hex(source.dark), 12], 2: [hex(source.dark), 18] });
});
const scales = [...originalScales, ...tagScales, neutralSolidIcon, ...actionScales];

export const colorRegistry: readonly ColorToken[] = Object.freeze(scales.flatMap((entry) => entry.tokens));
export const colorCategoryProfiles: readonly ColorProfile[] = Object.freeze(scales.map((entry) => entry.profile));

function findToken(id: string): ColorToken {
  const token = colorRegistry.find((candidate) => candidate.id === id);
  if (!token) throw new Error(`Unknown public Category Token: ${id}`);
  return token;
}

export function resolveColor(id: string, theme: ColorTheme = "light"): ColorValue {
  const token = findToken(id);
  if (theme !== "light" && theme !== "dark") throw new Error(`Unsupported theme ${theme}: ${id}`);
  return token[theme];
}

export function colorToCss(value: ColorValue): string {
  if (value.rgb.length !== 3 || value.rgb.some((channel) => !Number.isFinite(channel) || channel < 0 || channel > 255)
    || !Number.isFinite(value.alpha) || value.alpha < 0 || value.alpha > 1) throw new Error("Invalid structured color");
  return `rgb(${value.rgb.join(" ")}${value.alpha === 1 ? "" : ` / ${Number((value.alpha * 100).toFixed(6))}%`})`;
}

const roleProperties: Readonly<Record<ColorRole, readonly ColorProperty[]>> = {
  text: ["color"], icon: ["color"], border: ["border-color", "background-color", "outline-color"],
  background: ["background-color"], fill: ["background-color"],
};
const prefixes: Record<ColorProperty, string> = { color: "text", "background-color": "bg", "border-color": "border", "outline-color": "outline" };

export const colorTokenOutputs = Object.freeze(colorRegistry.map((token) => {
  const slug = token.id.toLowerCase().replaceAll("/", "-");
  const roles: ColorRole[] = token.category === "OnColor" ? ["text", "icon"] : [token.category.toLowerCase() as ColorRole];
  return Object.freeze({
    id: token.id, variable: `--rain-category-${slug}`, themeVariable: `--color-rain-category-${slug}`,
    value: colorToCss(token.light), darkValue: colorToCss(token.dark),
    utilities: roles.flatMap((role) => roleProperties[role].map((property) => ({ className: `${prefixes[property]}-rain-category-${slug}`, property, role }))),
    displayClassName: `bg-rain-swatch-${slug}`, displayOnly: true,
    displayForegroundClassName: roles.some((role) => role === "text" || role === "icon") ? `text-rain-swatch-${slug}` : undefined,
    displayScope: '[data-rain-id="token-foundations"]',
  });
}));

export type ColorUse = Readonly<{
  tokenId: string; role: ColorRole; property: ColorProperty;
  context: "page" | "component-recipe" | "local-recipe";
  content: "text" | "large-text" | "meaningful-icon" | "essential-boundary" | "decorative" | "disabled" | "surface";
  theme?: ColorTheme; recipeId?: string; parentSurfaceId?: string; parentBackgroundId?: string;
  interaction?: "interactive" | "non-interactive"; critical?: boolean;
  evidenceRef?: string; opacityScope?: "leaf";
  brandIntent?: "action" | "selected" | "active" | "progress" | "brand-emphasis";
  onColor?: boolean; alpha?: number; alphaOperation?: "apply" | "replace"; componentOpacity?: number;
}>;

function luminance(rgb: readonly number[]): number {
  const [r = 0, g = 0, b = 0] = rgb.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

/** Measurement only: consumer role, context and readability still require validateColorUse. */
export function measureColorContrast(foreground: ColorValue, background: ColorValue): number {
  colorToCss(foreground); colorToCss(background);
  if (background.alpha !== 1) throw new Error("Contrast measurement requires an opaque background");
  const painted = foreground.rgb.map((channel, index) => channel * foreground.alpha + background.rgb[index]! * (1 - foreground.alpha));
  const a = luminance(painted), b = luminance(background.rgb);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** ponytail: one Alpha surface over an explicit opaque base; deeper stacks need a separate surface-chain design. */
export function resolveColorSurface(id: string, theme: ColorTheme = "light", parentBackgroundId?: string): ColorValue {
  const token = findToken(id);
  if (token.category !== "Background" && token.category !== "Fill") throw new Error("Parent must be a Background or Fill surface");
  const surface = resolveColor(id, theme);
  if (!parentBackgroundId) {
    if (surface.alpha !== 1) throw new Error("A known opaque parent background is required");
    return surface;
  }
  const baseToken = findToken(parentBackgroundId);
  if (baseToken.category !== "Background" && baseToken.category !== "Fill") throw new Error("Parent background must be a surface");
  const base = resolveColor(parentBackgroundId, theme);
  if (base.alpha !== 1) throw new Error("Parent background must be opaque");
  return Object.freeze({
    rgb: Object.freeze(surface.rgb.map((channel, index) => channel * surface.alpha + base.rgb[index]! * (1 - surface.alpha))) as unknown as readonly [number, number, number],
    alpha: 1,
  });
}

/** Validates a declared use; callers still verify the actual DOM, feature root and state match it. */
export function validateColorUse(use: ColorUse): { value: ColorValue; contrast: number | null; minimumContrast: number; parentSurfaceId: string | null } {
  const token = findToken(use.tokenId);
  let value = resolveColor(use.tokenId, use.theme);
  const categoryMatches = token.category === "OnColor" ? use.role === "text" || use.role === "icon" : token.category.toLowerCase() === use.role;
  if (!categoryMatches) throw new Error(`Category does not permit role ${use.role}`);
  if (!roleProperties[use.role]?.includes(use.property)) throw new Error(`Invalid property for ${use.role}`);
  const roleContents: Record<ColorRole, readonly string[]> = {
    text: ["text", "large-text", "decorative", "disabled"], icon: ["meaningful-icon", "decorative", "disabled"],
    border: ["essential-boundary", "decorative", "disabled"], background: ["surface"], fill: ["surface"],
  };
  if (!roleContents[use.role].includes(use.content)) throw new Error(`Invalid content for ${use.role}`);
  if (!["page", "component-recipe", "local-recipe"].includes(use.context)) throw new Error("Unknown consumption context");
  if (token.family === "Brand" && !["action", "selected", "active", "progress", "brand-emphasis"].includes(use.brandIntent ?? "")) throw new Error("Brand use needs an explicit eligible intent");
  const recipeDeclared = use.context !== "page" && /^[a-z][a-z0-9-]*$/.test(use.recipeId ?? "");
  const profile = colorCategoryProfiles.find((candidate) => candidate.id === token.profileId)!;
  if (profile.conditionalIds.includes(token.id) && (!recipeDeclared || !use.evidenceRef?.trim())) throw new Error("Conditional color requires a declared Recipe and consumer evidence");
  if (token.category === "OnColor" && (!use.onColor || !recipeDeclared)) throw new Error("OnColor needs an explicit surface Recipe context");
  if (use.alpha !== undefined) {
    if (!recipeDeclared) throw new Error("New Alpha combinations require a declared Recipe");
    if (!colorAlphaValues.includes(use.alpha)) throw new Error("Alpha is outside the whitelist");
    if (use.alphaOperation !== "apply" && use.alphaOperation !== "replace") throw new Error("Explicit Alpha operation required");
    if (use.alphaOperation === "apply" && value.alpha !== 1) throw new Error("Token already contains Alpha; use explicit replacement");
    value = Object.freeze({ rgb: value.rgb, alpha: use.alpha / 100 });
  } else if (use.alphaOperation !== undefined) throw new Error("Alpha operation requires a target Alpha");
  if (use.componentOpacity !== undefined) {
    if (!recipeDeclared) throw new Error("Component opacity requires a declared Recipe");
    if (!Number.isFinite(use.componentOpacity) || use.componentOpacity < 0 || use.componentOpacity > 1) throw new Error("Invalid component opacity");
    // ponytail: only a single paint on an independent opaque parent is modeled; composite groups need an outer-surface Recipe.
    if (use.opacityScope !== "leaf") throw new Error("Component opacity needs an explicit leaf compositing scope; composite groups are unsupported");
  }
  const minimumContrast = use.content === "text" ? 4.5 : ["large-text", "meaningful-icon", "essential-boundary"].includes(use.content) ? 3 : 0;
  if (!use.parentSurfaceId) {
    if (use.parentBackgroundId) throw new Error("Parent background requires an immediate parent surface");
    if (minimumContrast > 0 || value.alpha < 1 || token.category === "OnColor") throw new Error("A known parent surface is required");
    return { value, contrast: null, minimumContrast, parentSurfaceId: null };
  }
  const parentToken = findToken(use.parentSurfaceId);
  if (parentToken.category !== "Background" && parentToken.category !== "Fill") throw new Error("Parent must be a Background or Fill surface");
  if (parentToken.family === "Brand" && !["action", "selected", "active", "progress", "brand-emphasis"].includes(use.brandIntent ?? "")) throw new Error("Brand parent needs an explicit eligible intent");
  if (use.parentBackgroundId && findToken(use.parentBackgroundId).family === "Brand"
    && !["action", "selected", "active", "progress", "brand-emphasis"].includes(use.brandIntent ?? "")) throw new Error("Brand parent background needs an explicit eligible intent");
  const pairedForeground = tagSurfaceForegroundPairs[parentToken.id];
  if (pairedForeground && (use.role === "text" || use.role === "icon") && token.id !== pairedForeground) throw new Error(`This surface requires its paired foreground: ${pairedForeground}`);
  if ((use.role === "text" || use.role === "icon") && parentToken.category === "Fill" && colorFillFamilies.includes(parentToken.family ?? "")) {
    const strong = parentToken.mode === "Solid" && (parentToken.key === 1 || parentToken.key === 2);
    if (strong && token.category !== "OnColor") throw new Error("These Solid 1/2 surfaces allow only OnColor foregrounds");
    if (!strong && (token.category === "OnColor" || (token.family !== "Neutral" && token.family !== parentToken.family))) throw new Error("These subtle surfaces require Neutral or same-family foregrounds");
  }
  const parent = resolveColorSurface(use.parentSurfaceId, use.theme, use.parentBackgroundId);
  const contrast = measureColorContrast({rgb: value.rgb, alpha: value.alpha * (use.componentOpacity ?? 1)}, parent);
  if (contrast < minimumContrast) throw new Error(`Insufficient contrast: ${contrast.toFixed(2)} < ${minimumContrast}`);
  const weakNeutral = profile.weakIds.includes(token.id);
  if (weakNeutral && !["decorative", "disabled"].includes(use.content)
    && (use.interaction !== "non-interactive" || use.critical !== false)) throw new Error("Weak Neutral needs non-critical, non-interactive content");
  return { value, contrast, minimumContrast, parentSurfaceId: use.parentSurfaceId };
}

/** One local teaching example; no global role, Alias or existing component is changed. */
export const localColorRecipe = Object.freeze({
  tokenId: "Fill/Neutral/Alpha/3", role: "fill", property: "background-color", context: "local-recipe",
  content: "surface", parentSurfaceId: "Background/Neutral/1", recipeId: "token-color-demo-highlight",
  alpha: 20, alphaOperation: "replace",
} as const satisfies ColorUse);

export const localColorRecipeOutput = Object.freeze({
  id: localColorRecipe.recipeId,
  variable: `--rain-local-${localColorRecipe.recipeId}`,
  themeVariable: `--color-rain-local-${localColorRecipe.recipeId}`,
  className: `bg-rain-local-${localColorRecipe.recipeId}`,
  value: colorToCss(validateColorUse(localColorRecipe).value),
  scope: '[data-rain-id="token-color-demo"]',
  sourceTokenId: localColorRecipe.tokenId,
  assetIdentity: "local-experiment", promotionStatus: "not-proposed", theme: "light",
});

const tagSearchFamilies = tagColorProfileNames.map((profile) => ({
  family: tagColorProfiles[profile].family,
  label: tagColorSearchTerms[profile][0],
  keywords: [...tagColorSearchTerms[profile], profile, ...Object.entries({ ...learningUnitTagProfiles, ...groupTypeTagProfiles })
    .filter(([, value]) => value === profile).map(([name]) => name)],
}));

export const colorFamilyLabels: Readonly<Record<string, string>> = Object.freeze({
  Neutral: "中性", Brand: "品牌蓝", Dark: "深色表面", Second: "Second", Orange: "橙色", Green: "绿色", Red: "红色",
  ...Object.fromEntries(tagSearchFamilies.map(({ family, label }) => [family, label])),
});

const categoryLabels: Record<ColorCategory, string> = { Text: "文字 正文", Icon: "图标", Border: "边框 边界", Background: "背景 表面", Fill: "填充 底色", OnColor: "反白 前景" };
const discoveryEntries = colorRegistry.map((token) => {
  const family = tagSearchFamilies.find((entry) => entry.family === token.family);
  const state = family && token.category === "Fill" && token.mode === "Alpha" && token.key > 1;
  const scope = family ? (state ? "tag-state" : "tag-palette") : token.family?.startsWith("Tag") ? "tag-special" : "category";
  const output = colorTokenOutputs.find((entry) => entry.id === token.id)!;
  return Object.freeze({
    id: token.id, family: token.family, category: token.category, label: colorFamilyLabels[token.family ?? ""] ?? token.family ?? token.category,
    keywords: [...(family?.keywords ?? []), token.id, categoryLabels[token.category], ...(token.mode === "Alpha" ? ["浅底", "半透明"] : token.mode === "Solid" ? ["实底", "实色"] : [])],
    scope,
    purpose: state ? `Tag 关闭操作 ${token.key === 2 ? "Hover" : "Pressed"} 预设；不作为通用浅底推荐`
      : scope === "tag-special" ? "Tag 业务或动作专用预设；沿用对应组件用途"
      : "按内容、主题与实际父表面校验；优先已有 Variant 与完整 Recipe",
    utilities: output.utilities, source: token.source, darkSource: token.darkSource,
    supportedThemes: ["light", "dark"] as const,
  });
});

/** Explicit conditions only; this never verifies a page or accepts a contrast exception. */
export function assessColorUse(use: ColorUse) {
  let contrast: number | null = null;
  const result = (status: "passed" | "rejected" | "needs-context", reason: string) => ({ status, reason, contrast, actualUse: "not-verified" as const });
  try {
    findToken(use.tokenId);
    if (use.theme === undefined) return result("needs-context", "需要明确实际主题");
    resolveColor(use.tokenId, use.theme);
    if (!use.parentSurfaceId) return result("needs-context", "需要明确实际父表面");
    if (resolveColor(use.parentSurfaceId, use.theme).alpha < 1 && !use.parentBackgroundId) return result("needs-context", "Alpha 表面需要明确实际不透明父背景");
    // Only measure the source directly when no local paint transformation is requested.
    if (use.alpha === undefined && use.componentOpacity === undefined) {
      contrast = measureColorContrast(resolveColor(use.tokenId, use.theme), resolveColorSurface(use.parentSurfaceId, use.theme, use.parentBackgroundId));
    }
    const validated = validateColorUse(use);
    contrast = validated.contrast;
    if (use.context === "page" && [use.tokenId, use.parentSurfaceId, use.parentBackgroundId].some((id) => {
      const entry = discoveryEntries.find((candidate) => candidate.id === id);
      return entry?.scope === "tag-state" || entry?.scope === "tag-special";
    })) return result("needs-context", "含 Tag 状态或业务专用色；需对应既有 Recipe 或单独确认用途，不作通用页面配对推荐");
    return result("passed", "声明条件下通过；新页面实际使用尚未验证");
  } catch (error) {
    return result("rejected", error instanceof Error ? error.message : String(error));
  }
}

/** Fixed, non-interactive page examples. These are candidates, not new component Recipes. */
const discoveryPairings = tagSearchFamilies.flatMap(({ family }) => ([
  { label: "中性正文 + 浅底", tokenId: "Text/Neutral/1", role: "text", content: "text", parentSurfaceId: `Fill/${family}/Alpha/1`, parentBackgroundId: "Background/Neutral/1" },
  { label: "同色图标 + 浅底", tokenId: `Icon/${family}/1`, role: "icon", content: "meaningful-icon", parentSurfaceId: `Fill/${family}/Alpha/1`, parentBackgroundId: "Background/Neutral/1" },
  { label: "彩色正文 + 页面表面", tokenId: `Text/${family}/1`, role: "text", content: "text", parentSurfaceId: "Background/Neutral/1" },
] as const).map(({ label, ...pair }) => {
  const use = { ...pair, property: "color", context: "page", interaction: "non-interactive", critical: true } as const satisfies ColorUse;
  return { family, label, use, themes: { light: assessColorUse({ ...use, theme: "light" }), dark: assessColorUse({ ...use, theme: "dark" }) } };
}));

export const colorDiscovery = Object.freeze({
  scope: "existing-category-colors-current-workspace", guide: "docs/ai/token-selection.md#颜色检索与复用",
  defaultConsumption: "complete-recipe-first", entries: Object.freeze(discoveryEntries), pairings: Object.freeze(discoveryPairings),
  actualUse: "not-verified", publication: "not-authorized",
});

/** ponytail: exact keyword filtering for this small catalogue; ranking only if observed searches need it. */
export function searchColorTokens(query: string, category?: ColorCategory) {
  const terms = query.normalize("NFKC").trim().toLowerCase().split(/\s+/).filter(Boolean);
  return colorDiscovery.entries.filter((entry) => (!category || entry.category === category)
    && terms.every((term) => [entry.label, ...entry.keywords].join(" ").normalize("NFKC").toLowerCase().includes(term)));
}
