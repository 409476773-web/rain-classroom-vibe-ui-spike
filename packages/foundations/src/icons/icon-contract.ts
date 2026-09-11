import { semanticRuleSet } from "./semantic-rules.generated";

export type IconAssetId = `icon/${string}`;
export type IconColorMode = "host" | "intrinsic";
export type IconHostRole = "control" | "selection" | "status" | "information";
export type IconStatusRole = "success" | "correct" | "completed" | "error" | "warning" | "published";
export type IconSelectionBasis = "explicit" | "component-spec" | "scene" | "default";
export type IconExplicitVariant = "filled" | "solid-triangle";
export type IconSelectorField = "intent" | "target" | "context";
export type IconMatchPattern = Readonly<Partial<Record<IconSelectorField, readonly string[]>>> & {
  readonly intent: readonly string[];
};

export interface IconSemanticAsset {
  readonly assetId: IconAssetId;
  readonly name: IconAssetId;
  readonly slug: string;
  readonly exportName: string;
  readonly importPath: string;
  readonly colorMode: IconColorMode;
  readonly source: { readonly fileKey: string; readonly nodeId: string; readonly componentKey: string };
  readonly publication: "unverified";
}

export interface IconSemanticRule {
  readonly id: string;
  readonly label: string;
  readonly assetId: IconAssetId;
  readonly match: readonly IconMatchPattern[];
  readonly priority: "default" | "scene";
  readonly hostRole: IconHostRole;
  readonly statusRole: IconStatusRole | null;
  readonly confirmation: "user-confirmed";
  readonly sourceIds: readonly string[];
  readonly keywords: readonly string[];
  readonly useWhen: string;
  readonly doNotUseWhen: readonly string[];
  readonly variants: readonly {
    readonly variant: IconExplicitVariant;
    readonly assetId: IconAssetId;
    readonly condition: string;
  }[];
}

export interface IconSemanticAlternative {
  readonly assetId: IconAssetId;
  readonly ruleIds: readonly string[];
  readonly label: string;
  readonly condition: string;
  readonly allowedBy: readonly ("explicit" | "component-spec")[];
}

export interface IconSemanticRuleSet {
  readonly schemaVersion: 1;
  readonly metadata: Readonly<Record<string, unknown>>;
  readonly guidance: readonly string[];
  readonly sourceCorrections: readonly Readonly<Record<string, unknown>>[];
  readonly assets: readonly IconSemanticAsset[];
  readonly rules: readonly IconSemanticRule[];
  readonly alternatives: readonly IconSemanticAlternative[];
  readonly blockedRequests: readonly { readonly match: IconMatchPattern; readonly code: string; readonly message: string }[];
  readonly diagnostics: Readonly<Record<string, string>>;
  readonly examples: readonly {
    readonly label: string;
    readonly request: SemanticIconRequest;
    readonly expected: Readonly<Record<string, unknown>>;
  }[];
}

/** A caller supplies actual behavior; labels and Chinese keywords are never parsed. */
export interface SemanticIconRequest {
  readonly intent?: string;
  readonly target?: string;
  readonly context?: string;
  readonly component?: string;
  readonly explicitAssetId?: string;
  readonly explicitVariant?: IconExplicitVariant;
  readonly confirmedComponentSpec?: {
    readonly component: string;
    readonly assetId: string;
    readonly confirmed: boolean;
    readonly source: string;
  };
}

export interface SemanticIconOptions {
  readonly availableAssets?: ReadonlySet<string> | readonly string[];
  /** For a validated, versioned rule set; equal-priority collisions remain diagnostic. */
  readonly rules?: readonly IconSemanticRule[];
}

interface IconSelection {
  readonly assetId: IconAssetId;
  readonly ruleId: string | null;
  readonly basis: IconSelectionBasis;
  readonly importPath: string;
  readonly exportName: string;
  /** Null means that availability alone did not provide asset color evidence. */
  readonly colorMode: IconColorMode | null;
  readonly hostRole: IconHostRole | null;
  readonly statusRole: IconStatusRole | null;
  readonly source: IconSemanticAsset["source"] | null;
  readonly decisionSource: string | null;
}

export type SemanticIconResult =
  | (IconSelection & { readonly status: "selected"; readonly availability: "available" | "not-checked" })
  | (IconSelection & { readonly status: "unavailable"; readonly code: "unavailable-asset"; readonly message: string })
  | { readonly status: "ambiguous"; readonly code: "missing-context" | "conflicting-rules"; readonly message: string; readonly candidates: readonly { readonly ruleId: string; readonly assetId: IconAssetId }[]; readonly missingFields: readonly IconSelectorField[] }
  | { readonly status: "unknown"; readonly code: string; readonly message: string; readonly requestedAssetId?: string };

const data: IconSemanticRuleSet = semanticRuleSet;
const fields: readonly IconSelectorField[] = ["intent", "target", "context"];
const assetsById = new Map<string, IconSemanticAsset>(data.assets.map((asset) => [asset.assetId, asset]));
const assetNamePattern = /^icon\/[a-z0-9]+(?:-[a-z0-9]+)*$/;

function diagnose(code: string, requestedAssetId?: string): SemanticIconResult {
  return { status: "unknown", code, message: data.diagnostics[code] ?? code, ...(requestedAssetId === undefined ? {} : { requestedAssetId }) };
}

function missingForPattern(request: SemanticIconRequest, pattern: IconMatchPattern): IconSelectorField[] | null {
  const missing: IconSelectorField[] = [];
  for (const field of fields) {
    const expected = pattern[field];
    if (!expected) continue;
    const actual = request[field];
    if (actual === undefined) missing.push(field);
    else if (!expected.includes(actual)) return null;
  }
  return missing;
}

function matchRules(request: SemanticIconRequest, rules: readonly IconSemanticRule[]) {
  const full: IconSemanticRule[] = [];
  const partial: { rule: IconSemanticRule; missing: IconSelectorField[] }[] = [];
  if (!request.intent) return { full, partial };
  for (const rule of rules) {
    const matches = rule.match.map((pattern) => missingForPattern(request, pattern)).filter((missing) => missing !== null);
    if (matches.some((missing) => missing.length === 0)) full.push(rule);
    else if (matches.length) partial.push({ rule, missing: [...new Set(matches.flat())] });
  }
  const hasScene = full.some((rule) => rule.priority === "scene");
  return { full: hasScene ? full.filter((rule) => rule.priority === "scene") : full, partial };
}

function selectAsset(assetId: string, basis: IconSelectionBasis, rule: IconSemanticRule | undefined, options: SemanticIconOptions, decisionSource: string | null = null): SemanticIconResult {
  if (!assetNamePattern.test(assetId)) return diagnose("invalid-asset-name", assetId);
  const asset = assetsById.get(assetId);
  const available = options.availableAssets === undefined ? undefined : new Set(options.availableAssets);
  if (!asset && !available?.has(assetId)) return diagnose("unknown-asset", assetId);
  const slug = assetId.slice(5);
  const pascalCase = slug.split("-").map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join("");
  const selection: IconSelection = {
    assetId: assetId as IconAssetId,
    basis,
    ruleId: rule?.id ?? null,
    importPath: asset?.importPath ?? `@rain-next/ui/icons/${slug}`,
    exportName: asset?.exportName ?? (/^[0-9]/.test(pascalCase) ? `Icon${pascalCase}` : `${pascalCase}Icon`),
    colorMode: asset?.colorMode ?? null,
    hostRole: rule?.hostRole ?? null,
    statusRole: rule?.statusRole ?? null,
    source: asset?.source ?? null,
    decisionSource,
  };
  if (available && !available.has(assetId)) return { ...selection, status: "unavailable", code: "unavailable-asset", message: data.diagnostics["unavailable-asset"] ?? "unavailable-asset" };
  return { ...selection, status: "selected", availability: available ? "available" : "not-checked" };
}

/** Selection only: never adds UI, imports an icon, opens a page, or mutates rules. */
export function resolveSemanticIcon(request: SemanticIconRequest, options: SemanticIconOptions = {}): SemanticIconResult {
  const matched = matchRules(request, options.rules ?? data.rules);
  const rule = matched.full.length === 1 ? matched.full[0] : undefined;

  if (request.explicitAssetId !== undefined) {
    return selectAsset(request.explicitAssetId, "explicit", rule, options, "current-task-explicit-asset");
  }
  const blocked = data.blockedRequests.find((entry) => missingForPattern(request, entry.match)?.length === 0);
  if (blocked) return { status: "unknown", code: blocked.code, message: blocked.message };

  if (!rule) {
    if (matched.full.length > 1) return {
      status: "ambiguous", code: "conflicting-rules", message: data.diagnostics["conflicting-rules"] ?? "conflicting-rules",
      candidates: matched.full.map((item) => ({ ruleId: item.id, assetId: item.assetId })), missingFields: [],
    };
    if (matched.partial.length) return {
      status: "ambiguous", code: "missing-context", message: data.diagnostics["missing-context"] ?? "missing-context",
      candidates: matched.partial.map(({ rule: item }) => ({ ruleId: item.id, assetId: item.assetId })),
      missingFields: fields.filter((field) => matched.partial.some((item) => item.missing.includes(field))),
    };
    return diagnose("unknown-intent");
  }

  if (request.explicitVariant !== undefined) {
    const variant = rule.variants.find((item) => item.variant === request.explicitVariant);
    return variant ? selectAsset(variant.assetId, "explicit", rule, options, "current-task-explicit-variant") : diagnose("unsupported-variant");
  }
  if (request.confirmedComponentSpec) {
    const spec = request.confirmedComponentSpec;
    const alternative = data.alternatives.find((item) => item.assetId === spec.assetId && item.ruleIds.includes(rule.id) && item.allowedBy.includes("component-spec"));
    if (!spec.confirmed || !spec.source.trim() || !spec.component.trim() || spec.component !== request.component || !alternative) return diagnose("invalid-component-spec", spec.assetId);
    return selectAsset(spec.assetId, "component-spec", rule, options, spec.source);
  }
  return selectAsset(rule.assetId, rule.priority, rule, options, rule.sourceIds.join(","));
}

export interface IconUsage {
  readonly ruleId: string;
  readonly assetId: IconAssetId;
  readonly label: string;
  readonly keywords: readonly string[];
  readonly useWhen: string;
  readonly doNotUseWhen: readonly string[];
  readonly selection: "default" | "explicit-variant" | "conditional-alternative";
  readonly condition: string | null;
  readonly hostRole: IconHostRole;
  readonly statusRole: IconStatusRole | null;
}

/** Empty usage means no fixed semantic rule, not that the asset is absent. */
export function getIconUsage(assetId: string): readonly IconUsage[] {
  return data.rules.flatMap((rule): IconUsage[] => {
    const common = { ruleId: rule.id, assetId: assetId as IconAssetId, label: rule.label, keywords: rule.keywords, useWhen: rule.useWhen, doNotUseWhen: rule.doNotUseWhen, hostRole: rule.hostRole, statusRole: rule.statusRole };
    const usages: IconUsage[] = [];
    if (rule.assetId === assetId) usages.push({ ...common, selection: "default", condition: null });
    for (const variant of rule.variants) if (variant.assetId === assetId) usages.push({ ...common, selection: "explicit-variant", condition: variant.condition });
    for (const alternative of data.alternatives) if (alternative.assetId === assetId && alternative.ruleIds.includes(rule.id)) usages.push({ ...common, label: alternative.label, selection: "conditional-alternative", condition: alternative.condition });
    return usages;
  });
}
