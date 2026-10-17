import type { CSSProperties } from "react";

const fontSizes = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 32, 36, 40] as const;
const fixedLineHeights = [12, 14, 15, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 42, 48] as const;
type Dimension = { type: "dimension"; value: number; unit: "px" };

function dimensions<const T extends readonly number[]>(values: T) {
  return Object.fromEntries(values.map((value) => [value, { type: "dimension", value, unit: "px" }])) as Record<T[number], Dimension>;
}

export const fontSizeTokens = dimensions(fontSizes);
export const lineHeightTokens = {
  ...dimensions(fixedLineHeights),
  equal: { type: "number", value: 1 },
} as const;
export const letterSpacingTokens = { default: { type: "dimension", value: 0, unit: "em" } } as const;

export type TypographyFontRole = "ui" | "reading" | "data";
export type TypographyComposition = {
  fontRole: TypographyFontRole;
  fontSize: number;
  lineHeight: number | "equal";
  fontWeight: number;
  letterSpacing: "default";
  numeric: "normal" | "tabular-nums lining-nums";
};

function preset(logicalId: string, label: string, useWhen: string, fontRole: TypographyFontRole, fontSize: number, lineHeight: number, fontWeight: number) {
  return {
    logicalId, label, useWhen, fontRole, fontSize, lineHeight, fontWeight,
    letterSpacing: "default" as const,
    numeric: fontRole === "data" ? "tabular-nums lining-nums" as const : "normal" as const,
  };
}

export const typographyPresets = {
  "ui-default": preset("Typography/UI/Default", "常规界面", "普通界面文字、表格正文和常规标签", "ui", 14, 22, 400),
  "ui-compact": preset("Typography/UI/Compact", "紧凑界面", "紧凑标签、短提示和辅助字段", "ui", 13, 18, 400),
  "ui-caption": preset("Typography/UI/Caption", "辅助信息", "次要元数据、图注与短辅助信息", "ui", 12, 20, 400),
  "ui-supporting": preset("Typography/UI/Supporting", "补充说明", "面板短说明和内容补充", "ui", 13, 20, 400),
  "heading-section": preset("Typography/Heading/Section", "区块标题", "卡片、区块标题和页面主标题", "ui", 16, 24, 600),
  "heading-page": preset("Typography/Heading/Page", "页面标题", "页面主标题默认 16px；同页已有较多 16px 标题时，才手动选择 17px 或 18px", "ui", 16, 24, 600),
  "reading-small": preset("Typography/Reading/Small", "紧凑阅读", "较紧凑的长内容阅读区", "reading", 14, 24, 400),
  "reading-default": preset("Typography/Reading/Default", "常规阅读", "答案解析、评语和报告结论", "reading", 15, 26, 400),
  "reading-large": preset("Typography/Reading/Large", "大字阅读", "更大字号的阅读区", "reading", 16, 26, 400),
  "data-default": preset("Typography/Data/Default", "关键数据", "极少使用、承担视觉锚点的关键数值。默认 28px，最大 28px；可选更小的已登记字号，并检查对应行高。", "data", 28, 36, 700),
} as const;
export type TypographyPresetName = keyof typeof typographyPresets;

export const typographyIssueMessages = {
  "composition-invalid": "排版组合尚未提供完整的数值与角色。",
  "preset-unregistered": "这个排版方案尚未登记。",
  "font-role-invalid": "请选择界面、阅读或关键数据字体角色。",
  "font-size-unregistered": "字号不在已登记选择中；继承或未知值需要检查实际节点。",
  "heading-font-size-limit": "标题默认 16px；极少数情况可手动选择 17px 或 18px。",
  "data-font-size-limit": "关键数据字号最大为 28px。",
  "line-height-unregistered": "行高不在已登记选择中；未登记值按局部候选处理。",
  "line-height-range": "行高必须在字号的 1 至 2 倍之间，包含上下限。",
  "font-weight-invalid": "界面与阅读只用 400/600；关键数据只用 700。",
  "letter-spacing-unregistered": "公共字距只有默认 0em；其他字距保留组件或局部范围。",
  "numeric-invalid": "关键数据需保留等宽数字和齐线数字规则。",
} as const;
export type TypographyIssue = keyof typeof typographyIssueMessages;
export type TypographyValidation = { valid: boolean; issues: TypographyIssue[]; resolvedLineHeight?: number };

/** Checks designed combinations; never clamps browser zoom or user reading styles. */
export function validateTypographyComposition(input: unknown, context?: { recipeId: string; componentId: string; part: string; appearance: string }): TypographyValidation {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return { valid: false, issues: ["composition-invalid"] };
  }
  const value = input as Record<string, unknown>;
  const issues: TypographyIssue[] = [];
  const validSize = typeof value.fontSize === "number" && Object.hasOwn(fontSizeTokens, value.fontSize);
  const validLine = value.lineHeight === "equal" || (typeof value.lineHeight === "number" && Object.hasOwn(lineHeightTokens, value.lineHeight));
  if (typeof value.fontRole !== "string" || !["ui", "reading", "data"].includes(value.fontRole)) issues.push("font-role-invalid");
  if (!validSize) issues.push("font-size-unregistered");
  if (value.fontRole === "data" && typeof value.fontSize === "number" && value.fontSize > 28) issues.push("data-font-size-limit");
  if (!validLine) issues.push("line-height-unregistered");
  const resolvedLineHeight = validSize && validLine ? (value.lineHeight === "equal" ? value.fontSize : value.lineHeight) as number : undefined;
  if (resolvedLineHeight !== undefined && (resolvedLineHeight < (value.fontSize as number) || resolvedLineHeight > 2 * (value.fontSize as number))) issues.push("line-height-range");
  const tagSolid = context?.recipeId === "tag-solid" && context.part === "label" && context.appearance === "solid"
    && ["ui-tag", "ui-tag-select", "ui-link-tag", "ui-checkable-tag", "ui-learning-unit-tag", "ui-difficulty-tag", "ui-group-type-tag", "ui-status-tag", "ui-system-status-tag", "ui-learning-unit-reminder-mark", "ui-scored-task-type-mark"].includes(context.componentId)
    && value.fontRole === "ui" && value.fontWeight === 700
    && ((value.fontSize === 12 && value.lineHeight === 14) || (value.fontSize === 13 && value.lineHeight === 18)
      || context.componentId === "ui-tag" && value.fontSize === 13 && value.lineHeight === 15
      || ["ui-status-tag", "ui-system-status-tag"].includes(context.componentId) && value.fontSize === 14 && value.lineHeight === 20
      || ["ui-learning-unit-reminder-mark", "ui-scored-task-type-mark"].includes(context.componentId) && value.fontSize === 13 && value.lineHeight === 16);
  if (!tagSolid && (value.fontRole === "data" ? value.fontWeight !== 700 : value.fontWeight !== 400 && value.fontWeight !== 600)) issues.push("font-weight-invalid");
  if (value.letterSpacing !== "default") issues.push("letter-spacing-unregistered");
  if (value.numeric !== "normal" && value.numeric !== "tabular-nums lining-nums" || value.fontRole === "data" && value.numeric !== "tabular-nums lining-nums") issues.push("numeric-invalid");
  return { valid: issues.length === 0, issues, resolvedLineHeight };
}

/** Data glyphs are only eligible inside an explicitly identified key value Part. */
export function validateDataFontUsage(input: unknown): boolean {
  if (input === null || typeof input !== "object" || Array.isArray(input)) return false;
  const value = input as Record<string, unknown>;
  return value.keyData === true && value.part === "value" && typeof value.text === "string" && /\d/.test(value.text) && /^[\d%.,:/K\s]+$/.test(value.text);
}

const weightVariables: Record<number, string> = {
  400: "--rain-font-weight-regular", 600: "--rain-font-weight-semibold", 700: "--rain-font-weight-bold",
};

function declarations(value: TypographyComposition): Record<string, string> {
  return {
    "font-family": `var(--rain-font-${value.fontRole})`,
    "font-size": `var(--rain-font-size-${value.fontSize})`,
    "line-height": `var(--rain-line-height-${value.lineHeight})`,
    "font-weight": `var(${weightVariables[value.fontWeight]})`,
    "letter-spacing": "var(--rain-letter-spacing-default)",
    "font-variant-numeric": `var(--rain-font-numeric-${value.numeric === "normal" ? "normal" : "data"})`,
  };
}

export function resolveTypographyPreset(name: string, overrides: Partial<TypographyComposition> = {}) {
  if (!Object.hasOwn(typographyPresets, name)) {
    return { composition: undefined, validation: { valid: false, issues: ["preset-unregistered"] } as TypographyValidation, style: undefined };
  }
  const composition = { ...typographyPresets[name as TypographyPresetName], ...overrides };
  const validation = validateTypographyComposition(composition);
  if (name.startsWith("heading-") && ![16, 17, 18].includes(composition.fontSize)) {
    validation.issues.push("heading-font-size-limit");
    validation.valid = false;
  }
  const css = validation.valid ? declarations(composition) : undefined;
  const style: CSSProperties | undefined = css ? {
    fontFamily: css["font-family"], fontSize: css["font-size"], lineHeight: css["line-height"],
    fontWeight: css["font-weight"], letterSpacing: css["letter-spacing"], fontVariantNumeric: css["font-variant-numeric"],
  } : undefined;
  return { composition, validation, style };
}

export function getTypographyCssVariables(): Record<string, string> {
  return {
    ...getLegacyTypographyAliases(),
    ...Object.fromEntries(Object.entries(fontSizeTokens).map(([key, token]) => [`--rain-font-size-${key}`, `${token.value}${token.unit}`])),
    ...Object.fromEntries(Object.entries(lineHeightTokens).map(([key, token]) => [`--rain-line-height-${key}`, token.type === "dimension" ? `${token.value}${token.unit}` : String(token.value)])),
    "--rain-letter-spacing-default": `${letterSpacingTokens.default.value}${letterSpacingTokens.default.unit}`,
    "--rain-font-numeric-normal": "normal",
    "--rain-font-numeric-data": "tabular-nums lining-nums",
  };
}

/** Keep the original role names while deriving their dimensions from complete presets. */
export function getLegacyTypographyAliases(): Record<string, string> {
  return Object.fromEntries((["ui", "reading", "data"] as const).flatMap((role) => {
    const css = declarations(typographyPresets[`${role}-default`]);
    return [[`--rain-type-${role}-size`, css["font-size"]!], [`--rain-type-${role}-line`, css["line-height"]!]];
  }));
}

export function getTypographyThemeVariables(): Record<string, string> {
  return {
    ...Object.fromEntries(Object.keys(fontSizeTokens).map((key) => [`--text-rain-size-${key}`, `var(--rain-font-size-${key})`])),
    ...Object.fromEntries(Object.keys(lineHeightTokens).map((key) => [`--leading-rain-${key}`, `var(--rain-line-height-${key})`])),
    "--tracking-rain-default": "var(--rain-letter-spacing-default)",
  };
}

export function getTypographyPresetDeclarations(): Record<TypographyPresetName, Record<string, string>> {
  return Object.fromEntries(Object.entries(typographyPresets).map(([name, value]) => [name, declarations(value)])) as Record<TypographyPresetName, Record<string, string>>;
}

/** Generated class inventory: the build must emit this list as a static scan source. */
export const typographyUtilityClassNames = {
  fontSize: Object.fromEntries(Object.keys(fontSizeTokens).map((key) => [key, `text-rain-size-${key}`])) as Record<number, string>,
  lineHeight: Object.fromEntries(Object.keys(lineHeightTokens).map((key) => [key, `leading-rain-${key}`])) as Record<number | "equal", string>,
  letterSpacing: { default: "tracking-rain-default" },
  preset: Object.fromEntries(Object.keys(typographyPresets).map((key) => [key, `rain-type-${key}`])) as Record<TypographyPresetName, string>,
};
