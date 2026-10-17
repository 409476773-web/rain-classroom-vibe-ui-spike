import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import * as outputs from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors, validateTabsPaintRouting } from "./verify-token-foundations.mjs";
import { validateColorUse } from "../packages/foundations/src/color-registry";
import { tabsPaints } from "../packages/ui/src/tabs/tabs.styles";
import { parseYamlSubset, validateTokenFoundationsV1Phase } from "./verification-helpers.mjs";

const filePath = "packages/ui/src/tabs/tabs.styles.ts";
const source = () => readFileSync(filePath, "utf8");

it('removes persistent Soft selected borders while retaining its selected fill and content roles', () => {
  const consumers = outputs.getTabsColorConsumers()[0]!;
  expect(consumers.recipes.filter((recipe: any) => recipe.appearance === 'soft' && recipe.part === 'border')).toEqual([]);
  expect(tabsPaints.soft.selected.border).toBe('border-transparent');
  expect(tabsPaints.soft.selectedDisabled.border).toBe('border-transparent');
  expect(tabsPaints.soft.selected.paint).toBe('bg-rain-category-fill-brand-alpha-4');
  expect(tabsPaints.soft.selected.label).toBe('text-rain-category-text-brand-1');
});

it('binds approved paint roles to actual Tab/More and inert measurement consumers', () => {
  const actual = readFileSync('packages/ui/src/tabs/tabs.tsx', 'utf8');
  expect(validateTabsPaintRouting(actual)).toEqual([]);
  for (const candidate of [actual.replaceAll('tabsPaints.more', 'tabsPaints.soft.normal'), actual.replace('paints.count, part("count")', 'paints.label, part("count")'), actual.replace('<MoreParts /></DropdownMenu.Trigger>', '<TabParts item={props.items[0]!} selected={false} /></DropdownMenu.Trigger>'), actual.replace('aria-hidden="true" inert>', 'aria-hidden="true">')]) {
    expect(candidate).not.toBe(actual); expect(validateTabsPaintRouting(candidate)).not.toEqual([]);
  }
  expect(validateTabsPaintRouting(actual.replace('const nonLabelWidth =', 'const measuredNonLabelWidth =').replace('const minimum = nonLabelWidth', 'const minimum = measuredNonLabelWidth'))).toEqual([]);
});

it('keeps the original routing contract and rejects unrecorded navigation wrapper successors', () => {
  const archive = 'evidence/runtime/rn14-editability/starter-final.tar.gz';
  expect(createHash('sha256').update(readFileSync(archive)).digest('hex')).toBe('81ed247e9e3c57bf9edd94ace9bea30487557ab5404c26570aa8ea055c7f900e');
  const extraction = spawnSync('tar', ['-xOf', archive, 'packages/ui/src/tabs/tabs.tsx'], { encoding: 'utf8' });
  expect(extraction.status, extraction.stderr).toBe(0);
  expect(createHash('sha256').update(extraction.stdout).digest('hex')).toBe('f48ff92834dc2d9e753c3ba88c8fb973e96a1c74d02b2278496818d8c5f8fb2b');
  expect(validateTabsPaintRouting(extraction.stdout)).toEqual([]);
  const actual = readFileSync('packages/ui/src/tabs/tabs.tsx', 'utf8');
  const labelDeclaration = actual.split('\n').find(line => line.startsWith('  const label = <span ref={props.visualPreset'))!;
  expect(labelDeclaration).toBeTruthy();
  for (const candidate of [
    actual.replace('descriptionId={descriptionId} />', '/>'),
    actual.replace(labelDeclaration, labelDeclaration + '\n' + labelDeclaration),
    actual.replace('props.visualPreset === "navigation-browser" && item.description ?', 'props.visualPreset === "unknown" && item.description ?'),
    actual.replace('>{props.visualPreset ? item.count : count.display}</span>', '>{item.count}</span>'),
    actual.replace('paints.label, part("label")', 'paints.count, part("label")'),
    actual.replace('<TabParts item={item} selected={selected} measure />', '<TabParts item={item} selected={selected} measure={false} />'),
    actual.replace('className={rainCn("rain-navigation__description", part("description"))}', 'className={rainCn("rain-navigation__description", paints.label)}'),
  ]) { expect(candidate).not.toBe(actual); expect(validateTabsPaintRouting(candidate)).not.toEqual([]); }
});

it('requires the exact navigation acceptance and complete phase from the requested root for successor projection', () => {
  const actual = readFileSync('packages/ui/src/tabs/tabs.tsx', 'utf8');
  const phaseSource = readFileSync('status/current-phase.yaml', 'utf8');
  const status = parseYamlSubset(phaseSource) as any;
  expect(() => validateTokenFoundationsV1Phase(status)).not.toThrow();
  const root = mkdtempSync(join(tmpdir(), 'rain-tabs-routing-authorization-'));
  try {
    mkdirSync(join(root, 'status'));
    writeFileSync(join(root, 'status/current-phase.yaml'), phaseSource);
    expect(validateTabsPaintRouting(actual, root)).toEqual([]);
    for (const candidate of [
      phaseSource.replace('navigationComponentsV042W6W8:', 'unapprovedNavigationBatch:'),
      phaseSource + '\nunapprovedPermission:\n  authorization: authorized\n',
      phaseSource.replace(`scope: ${JSON.stringify(status.navigationComponentsV042.scope)}`, 'scope: "all-components"'),
    ]) {
      expect(candidate).not.toBe(phaseSource);
      writeFileSync(join(root, 'status/current-phase.yaml'), candidate);
      expect(validateTabsPaintRouting(actual, root)).not.toEqual([]);
    }
    rmSync(join(root, 'status/current-phase.yaml'));
    expect(validateTabsPaintRouting(actual, root)).not.toEqual([]);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

it("validates the real Tabs source and records only four Soft text eligibility decisions per theme", () => {
  expect(outputs.getTabsColorConsumers).toBeTypeOf("function");
  const decisions: any[] = [];
  expect(validateRegisteredRecipeColors({ filePath, source: source(), scopedEligibilityDecisions: decisions })).toEqual([]);
  expect(decisions).toHaveLength(8);
  for (const decision of decisions) {
    expect(decision.contrastException).toBe(false);
    expect(decision.actual).toBeGreaterThanOrEqual(4.5);
    expect(["label", "count"]).toContain(decision.part);
    expect(["ordinary", "focus"]).toContain(decision.state);
  }
  expect(() => validateColorUse({ tokenId: "Text/Neutral/4", role: "text", property: "color", context: "component-recipe", content: "text", interaction: "interactive", critical: true,
    recipeId: "another-component", evidenceRef: "docs/plans/2026-09-10-tabs-implementation.md", theme: "light", parentSurfaceId: "Fill/Neutral/Alpha/6", parentBackgroundId: "Background/Neutral/1" })).toThrow("Weak Neutral");
});

it("rejects added raw consumers, a copied file, and a different actual static definition", () => {
  const actual = source();
  for (const candidate of [actual + '\nconst added = "text-rain-category-text-neutral-4";', actual.replace('text-rain-category-text-neutral-4', 'text-rain-category-text-neutral-3')]) {
    expect(validateRegisteredRecipeColors({ filePath, source: candidate })).not.toEqual([]);
  }
  expect(validateRegisteredRecipeColors({ filePath: "packages/ui/src/tabs/other.ts", source: actual })).not.toEqual([]);
});

it("rejects post-initialization mutation and aliases, and freezes every mutable layer", () => {
  for (const extra of ['Object.assign(tabsPaints.more, tabsPaints.soft.normal);', 'const more = tabsPaints.more; Object.assign(more, tabsPaints.soft.normal);']) {
    expect(validateRegisteredRecipeColors({ filePath, source: source() + '\n' + extra })).not.toEqual([]);
  }
  expect(() => Object.assign(tabsPaints.more, tabsPaints.soft.normal)).toThrow();
  expect(Object.isFrozen(tabsPaints)).toBe(true);
  expect(Object.isFrozen(tabsPaints.soft)).toBe(true);
  expect(Object.isFrozen(tabsPaints.soft.normal)).toBe(true);
});

it("fails closed when source metadata, roles, state flags, surfaces or the indicator threshold change", () => {
  const mutations = [
    (entry: any) => { entry.symbol = "fakePaints"; },
    (entry: any) => { entry.scope = "[data-rain-id]"; },
    (entry: any) => { entry.componentId = "ui-other"; },
    ...["role", "content", "interaction", "critical", "evidenceRef", "tokenId"].map(key => (entry: any) => {
      const recipe = entry.recipes.find((row: any) => row.appearance === "soft" && row.state === "ordinary" && row.part === "label");
      recipe.foreground[key] = key === "critical" ? false : "forged";
    }),
    ...["selected", "disabled", "hover", "pressed"].map(key => (entry: any) => {
      entry.recipes.find((row: any) => row.appearance === "soft" && row.state === "ordinary" && row.part === "label")[key] = true;
    }),
    (entry: any) => { entry.recipes[0].parentBackgroundId = "Background/Neutral/2"; },
    (entry: any) => { entry.recipes[0].foreground.alpha = 40; },
    (entry: any) => { entry.recipes[0].foreground.componentOpacity = 0.8; },
    (entry: any) => { delete entry.recipes.find((row: any) => row.part === "indicator").requiredStateContrast; },
    (entry: any) => { entry.recipes.find((row: any) => row.appearance === "contained" && row.part === "label").parentSurfaceId = "Background/Neutral/1"; },
  ];
  for (const mutate of mutations) {
    const forged = structuredClone(outputs.getTokenFoundationOutputs());
    const entry = forged.colorRecipeConsumers.find((row: any) => row.filePath === filePath)!;
    mutate(entry);
    expect(validateRegisteredRecipeColors({ filePath, source: source(), outputs: forged })).not.toEqual([]);
  }
});
