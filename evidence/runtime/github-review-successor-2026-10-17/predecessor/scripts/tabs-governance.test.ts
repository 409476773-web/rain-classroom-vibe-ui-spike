import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import * as tailwind from "./verify-tailwind-b2.mjs";

const authorization = {
  authorization: "authorized", authorizedAt: "2026-09-10",
  decisionSource: "explicit-user-start-tabs-implementation", userStatement: "开始实施",
  scope: "tabs-three-appearances-three-sizes-four-positions",
  plan: "../docs/plans/2026-09-10-tabs-implementation.md",
  design: "../docs/plans/2026-09-10-tabs-design.md",
  stage: "preflight", preflight: "not-run", headless: "candidate-base-ui-1.8.0",
  implementation: "not-started", automatedVerification: "not-run", independentReview: "not-run",
  humanGate: "not-evaluated", contrastAcceptance: "not-granted",
  doesNotAuthorize: ["other-components-or-global-weak-neutral-rules", "new-dependencies-or-color-values", "figma-publication-business-migration-or-git"],
};
const phase = () => {
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  status.componentRefinements.tabs = structuredClone(authorization);
  return status;
};

it("admits only the exact Tabs stage without changing frozen history or inventing a Gate", () => {
  expect(helpers.hasTabsRefinementAuthorization).toBeTypeOf("function");
  const status = phase();
  expect(helpers.hasTabsRefinementAuthorization(status)).toBe(true);
  expect(() => helpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
  expect(helpers.getValidatedTailwindB2History(status).componentRefinements.tabs).toBeUndefined();
  for (const patch of [
    { authorization: "not-authorized" }, { scope: "all-components" }, { userStatement: "继续" },
    { humanGate: "accepted" }, { contrastAcceptance: "accepted" }, { stage: "implementation" },
    { implementation: "completed" }, { headless: "any" }, { doesNotAuthorize: [] }, { publication: "authorized" },
  ]) {
    const invalid = phase(); Object.assign(invalid.componentRefinements.tabs, patch);
    expect(helpers.hasTabsRefinementAuthorization(invalid)).toBe(false);
    expect(() => helpers.validateTokenFoundationsV1Phase(invalid)).toThrow();
  }
  const changed = phase(); changed.phaseHistory.tailwindB2.currentPhase.progress = "changed";
  expect(() => helpers.validateTokenFoundationsV1Phase(changed)).toThrow();
});

it("preflight permissions cannot authorize public Tabs, another file or another headless module", () => {
  expect(helpers.getTabsRefinementFiles).toBeTypeOf("function");
  const status = phase();
  const files = helpers.getTabsRefinementFiles(status);
  expect(files.application).toContain("apps/playground/src/experiments/tabs-preflight.tsx");
  expect(files.ui).toEqual([]);
  expect(files.foundations).toEqual([]);
  expect(helpers.isTabsImport(status, "apps/playground/src/experiments/tabs-preflight.tsx", "@base-ui/react/tabs")).toBe(true);
  expect(helpers.isTabsImport(status, "apps/playground/src/experiments/tabs-preflight.tsx", "@base-ui/react/tooltip")).toBe(true);
  for (const [file, module] of [
    ["packages/ui/src/tabs/tabs.tsx", "@base-ui/react/tabs"],
    ["apps/playground/src/other.tsx", "@base-ui/react/tabs"],
    ["apps/playground/src/experiments/tabs-preflight.tsx", "@base-ui/react/menu"],
  ]) expect(helpers.isTabsImport(status, file, module)).toBe(false);
  delete status.componentRefinements.tabs;
  expect(Object.values(helpers.getTabsRefinementFiles(status)).flat()).toEqual([]);
  expect(helpers.isTabsImport(status, "apps/playground/src/experiments/tabs-preflight.tsx", "@base-ui/react/tabs")).toBe(false);
});

it("limits preflight CSS to its local scope, declared geometry and public Tokens", () => {
  expect(tailwind.validateTabsPreflightSource).toBeTypeOf("function");
  const contract = { tabsPreflight: {
    source: "apps/playground/src/experiments/tabs-preflight.css",
    scope: ".rain-tabs-preflight", pixelValues: ["28px", "32px", "38px"],
    status: "local-experiment", test: "tests/e2e/tabs-preflight.spec.ts",
  } };
  const source = ".rain-tabs-preflight [role=tab] { height: 28px; padding: var(--rain-space-8); }";
  expect(tailwind.validateTabsPreflightSource({ source, contract, authorized: true })).toEqual([]);
  for (const candidate of [source.replace("28px", "29px"), source.replace(".rain-tabs-preflight", ":root"), source.replace(".rain-tabs-preflight", ".rain-tabs-preflight-elsewhere"),
    source.replace("--rain-space-8", "--rain-ref-blue-500"), source.replace("height: 28px", "color: #1561f8"),
    source.replace("height: 28px", "color: var(--rain-made-up)"), source + " button { color: inherit; }", ".rain-tabs-preflight ~ button { color: inherit; }",
    ".rain-tabs-preflight { color: red; }", ".rain-tabs-preflight { --rain-category-text-neutral-1: red; color: var(--rain-category-text-neutral-1); }", ".rain-tabs-preflight { background: oklch(60% .2 30); }",
    ".rain-tabs-preflight { color: var( --rain-made-up); }", ".rain-tabs-preflight { color: var(--rain-category-text-neutral-1, red); }"]) {
    expect(tailwind.validateTabsPreflightSource({ source: candidate, contract, authorized: true })).not.toEqual([]);
  }
  expect(tailwind.validateTabsPreflightSource({ source, contract, authorized: false })).not.toEqual([]);
  expect(tailwind.validateTabsPreflightSource({ source, contract: { tabsPreflight: { ...contract.tabsPreflight, pixelValues: ["29px"] } }, authorized: true })).not.toEqual([]);
});


it("requires an independently protected TSX and complete evidence before preflight passed", () => {
  expect(helpers.validateTabsPreflightInventory).toBeTypeOf("function");
  const status = phase();
  const files = new Map(Object.values(helpers.tabsPreflightFiles).flat().map(path => [path, "recorded content"]));
  const protectedPaths = { optional: ["apps/playground/src/experiments/tabs-preflight.tsx"] };
  expect(helpers.validateTabsPreflightInventory({ status, files, protectedPaths })).toEqual([]);
  files.delete("apps/playground/src/experiments/tabs-preflight.css");
  expect(helpers.validateTabsPreflightInventory({ status, files, protectedPaths: { optional: [] } })).not.toEqual([]);
  status.componentRefinements.tabs.preflight = "passed";
  expect(helpers.validateTabsPreflightInventory({ status, files, protectedPaths })).not.toEqual([]);
  files.set("apps/playground/src/experiments/tabs-preflight.css", "recorded CSS");
  expect(helpers.validateTabsPreflightInventory({ status, files, protectedPaths })).toEqual([]);
  files.set("evidence/runtime/tabs/preflight.md", "   ");
  expect(helpers.validateTabsPreflightInventory({ status, files, protectedPaths })).not.toEqual([]);
});

it("activates only the reviewed token batch after preflight, keeping public implementation imports closed", () => {
  const status = phase();
  Object.assign(status.componentRefinements.tabs, { stage: "tokens", preflight: "passed", headless: "base-ui-1.8.0", implementation: "in-progress" });
  expect(helpers.hasTabsRefinementAuthorization(status)).toBe(true);
  const files = helpers.getTabsRefinementFiles(status);
  expect(files.foundations).toContain("packages/foundations/src/tabs-token-contract.ts");
  expect(files.ui).toEqual([]);
  expect(helpers.isTabsImport(status, "packages/ui/src/tabs/tabs.tsx", "@base-ui/react/tabs")).toBe(false);
  for (const preflight of ["not-run", "failed"]) {
    status.componentRefinements.tabs.preflight = preflight;
    expect(helpers.hasTabsRefinementAuthorization(status)).toBe(false);
  }
});

it("allows public Tabs and private Tooltip imports only in their exact component files", () => {
  const status = phase();
  Object.assign(status.componentRefinements.tabs, { stage: 'component', preflight: 'passed', headless: 'base-ui-1.8.0', implementation: 'in-progress' });
  expect(helpers.getTabsRefinementFiles(status).ui).toContain('packages/ui/src/tabs/tabs-overflow.ts');
  expect(helpers.isTabsImport(status, 'packages/ui/src/tabs/tabs.tsx', '@base-ui/react/tabs')).toBe(true);
  expect(helpers.isTabsImport(status, 'packages/ui/src/tabs/tabs-full-label.tsx', '@base-ui/react/tooltip')).toBe(true);
  expect(helpers.isTabsImport(status, 'packages/ui/src/tabs/tabs.tsx', '@base-ui/react/menu')).toBe(false);
  expect(helpers.isTabsImport(status, 'packages/ui/src/tabs/other.tsx', '@base-ui/react/tabs')).toBe(false);
});

it("protects only the reviewed Tabs CSS rules, retaining shared Focus and color ownership", () => {
  const source = readFileSync('packages/ui/src/styles.css', 'utf8');
  const contract = helpers.parseYamlSubset(readFileSync('manifests/contracts/tailwind-b2.yaml', 'utf8'));
  const check = (css: string, authorized = true) => tailwind.validateTabsCssExceptions({ source: css, contract, authorized });
  expect(check(source)).toEqual([]);
  const predecessor = helpers.getG6PreviousSource(resolve('.'), 'packages/ui/src/styles.css');
  if (predecessor == null) throw new Error('Tabs synthetic fixture requires the verified G6 predecessor');
  const importPrefix = [
    '@import "./navigation/navigation.css";', '@import "./navigation/navigation-families.css";',
    '@import "./tree/tree.css";', '@import "./item/item.css";', '@import "./progress/progress.css";',
  ].join('\n') + '\n';
  expect(predecessor.startsWith(importPrefix)).toBe(true);
  const mutationSource = predecessor.slice(importPrefix.length);
  expect(check(mutationSource + '\n.unrelated { display: block; }')).toEqual([]);
  for (const added of [
    '.rain-tabs { --tabs-font: 20px; }', '.rain-tabs__tab { color: red; }',
    '[data-rain-id="ui-tabs"] [data-slot="tab"]:focus-visible { outline: none; }', '[class~="rain-tabs"] [data-slot="tab"] { padding: 0; }',
    '.rain-tabs__tab:focus-visible { outline: none; }', '.rain-tabs__label { color: var(--rain-category-text-neutral-4); }',
    '.outside { --tabs-radius: 18px; }', '@media (pointer: coarse) { .rain-tabs__tab { margin: 0; } }',
    '.r\\61 in-tabs__tab:focus-visible { outline: none; }', '[data-slot="root"][data-appearance="soft"] [data-slot="tab"] { padding: 0; }',
    '[data-slot="root"] [data-part="label"] { font-size: 20px; }', 'button:focus-visible { outline: none; }',
    '.unrelated, button:focus-visible { outline: none; }', ':is(.unrelated, button):focus-visible { outline: none; }', ':where(button, .unrelated) { padding: 0; }',
  ]) expect(check(mutationSource + '\n' + added)).not.toEqual([]);
  expect(check(mutationSource.replace('tabs-geometry:', 'unregistered-geometry:'))).not.toEqual([]);
  expect(check(mutationSource, false)).not.toEqual([]);
});

it('keeps Tabs metadata tied to real candidate sources and separate human acceptance', () => {
  const manifest = helpers.parseYamlSubset(readFileSync('manifests/ui/tabs.yaml', 'utf8')) as any;
  const registry = JSON.parse(readFileSync('registry/tabs.json', 'utf8'));
  const review = (helpers.parseYamlSubset(readFileSync('status/current-phase.yaml', 'utf8')) as any).componentRefinements.tabs;
  expect(tailwind.validateTabsMetadata({ manifest, registry, root: resolve("."), review })).toEqual([]);
  for (const patch of [{ implementation: review.implementation === 'completed' ? 'in-progress' : 'completed' }, { automatedVerification: review.automatedVerification === 'passed' ? 'not-run' : 'passed' }, { independentReview: review.independentReview === 'passed' ? 'not-run' : 'passed' }, { maturity: 'system-approved' }, { humanGate: review.humanGate === 'accepted' ? 'not-evaluated' : 'accepted' }, { contrastAcceptance: 'accepted' }, { sizes: [28, 32] }, { parts: ['root'] }, { evidence: ['missing.md'] }]) {
    expect(tailwind.validateTabsMetadata({ manifest: { ...manifest, ...patch }, registry, root: resolve("."), review })).not.toEqual([]);
  }
  expect(tailwind.validateTabsMetadata({ manifest, registry: { ...registry, publication: 'published' }, root: resolve('.') })).not.toEqual([]);
});

it('records only the explicit Tabs runtime visual acceptance with completed evidence and unchanged publication boundaries', () => {
  const status = helpers.parseYamlSubset(readFileSync('status/current-phase.yaml', 'utf8')) as any;
  const review = status.componentRefinements.tabs;
  Object.assign(review, { humanGate: 'accepted', humanGateDecision: {
    acceptedAt: '2026-09-12', decisionSource: 'explicit-user-confirmation', userStatement: '完成视觉验收',
    scope: 'tabs-runtime-visual-only', evidence: '../evidence/runtime/tabs-visual-refinement/verification.md',
  } });
  expect(helpers.hasTabsRefinementAuthorization(status)).toBe(true);
  expect(() => helpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
  const manifest = { ...helpers.parseYamlSubset(readFileSync('manifests/ui/tabs.yaml', 'utf8')) as any, humanGate: 'accepted', humanGateScope: 'tabs-runtime-visual-only' };
  const { shared, items, ...identity } = JSON.parse(readFileSync('registry/tabs.json', 'utf8'));
  const registry = { ...identity, humanGate: 'accepted', humanGateScope: 'tabs-runtime-visual-only', contrastAcceptance: 'not-granted', shared, items };
  expect(tailwind.validateTabsMetadata({ manifest, registry, root: resolve('.'), review })).toEqual([]);
  for (const patch of [{ acceptedAt: '2026-09-11' }, { decisionSource: 'automatic-checks' }, { userStatement: 'agent assumed' }, { scope: 'all-components-and-publication' }, { evidence: 'missing.md' }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.tabs.humanGateDecision, patch);
    expect(helpers.hasTabsRefinementAuthorization(invalid)).toBe(false);
    expect(tailwind.validateTabsMetadata({ manifest, registry, root: resolve("."), review: invalid.componentRefinements.tabs })).not.toEqual([]);
  }
  for (const patch of [{ humanGateDecision: undefined }, { visualRefinement: undefined }, { implementation: 'in-progress' }, { stage: 'component' }, { automatedVerification: 'not-run' }, { independentReview: 'findings' }, { contrastAcceptance: 'accepted' }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.tabs, patch);
    expect(helpers.hasTabsRefinementAuthorization(invalid)).toBe(false);
  }
  expect(tailwind.validateTabsMetadata({ manifest: { ...manifest, humanGateScope: 'all-components' }, registry, root: resolve('.'), review })).not.toEqual([]);
  for (const patch of [{ humanGateScope: 'all-components' }, { contrastAcceptance: 'accepted' }, { publication: 'published' }]) {
    expect(tailwind.validateTabsMetadata({ manifest, registry: { ...registry, ...patch }, root: resolve("."), review })).not.toEqual([]);
  }
});

it('requires both technical checks for completed documentation without advancing Human Gate', () => {
  const status = phase(); Object.assign(status.componentRefinements.tabs, { stage: 'documentation', preflight: 'passed', headless: 'base-ui-1.8.0', implementation: 'completed', automatedVerification: 'passed', independentReview: 'passed' });
  expect(helpers.hasTabsRefinementAuthorization(status)).toBe(true);
  for (const patch of [{ automatedVerification: 'not-run' }, { independentReview: 'findings' }, { humanGate: 'accepted' }, { contrastAcceptance: 'accepted' }, { stage: 'component' }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.tabs, patch);
    expect(helpers.hasTabsRefinementAuthorization(invalid)).toBe(false);
  }
});

it('retires technical runtime permissions only after preflight while retaining its evidence', () => {
  const status = phase(); Object.assign(status.componentRefinements.tabs, { stage: 'documentation', preflight: 'passed', headless: 'base-ui-1.8.0', implementation: 'in-progress' });
  expect(helpers.hasTabsRefinementAuthorization(status)).toBe(true);
  const files = new Map(Object.values(helpers.tabsPreflightFiles).flat().filter(file => !helpers.tabsRetiredPaths.includes(file)).map(file => [file, 'retained evidence']));
  expect(helpers.validateTabsPreflightInventory({ status, files, protectedPaths: {} })).toEqual([]);
  expect(helpers.getTabsRefinementFiles(status).application).toContain('apps/playground/src/docs/components/tabs-page.tsx');
  expect(helpers.getTabsRefinementFiles(status).application).not.toContain('apps/playground/src/experiments/tabs-preflight.tsx');
  expect(helpers.isTabsImport(status, 'apps/playground/src/experiments/tabs-preflight.tsx', '@base-ui/react/tabs')).toBe(false);
  expect(helpers.isTabsImport(status, 'packages/ui/src/tabs/tabs.tsx', '@base-ui/react/tabs')).toBe(true);
  files.set('apps/playground/src/experiments/tabs-preflight.css', 'stale runtime');
  expect(helpers.validateTabsPreflightInventory({ status, files, protectedPaths: {} })).not.toEqual([]);
  files.delete('apps/playground/src/experiments/tabs-preflight.css'); files.delete('evidence/runtime/tabs/preflight.md');
  expect(helpers.validateTabsPreflightInventory({ status, files, protectedPaths: {} })).not.toEqual([]);
});

it('admits only the confirmed visual revision and its exact files without advancing acceptance', () => {
  const status = phase();
  Object.assign(status.componentRefinements.tabs, {
    stage: 'documentation', preflight: 'passed', headless: 'base-ui-1.8.0', implementation: 'in-progress',
    visualRefinement: {
      authorization: 'authorized', authorizedAt: '2026-09-11', userStatement: '继续推进',
      scope: 'tabs-confirmed-visual-layout-refinement',
      plan: '../docs/plans/2026-09-11-tabs-visual-refinement-implementation.md',
      design: '../docs/plans/2026-09-11-tabs-visual-refinement-design.md',
    },
  });
  expect(helpers.hasTabsRefinementAuthorization(status)).toBe(true);
  expect(helpers.getTabsRefinementFiles(status).workspace).toContain('tests/e2e/tabs-visual-refinement.spec.ts');
  expect(helpers.getTabsRefinementFiles(status).documents).toContain('docs/plans/2026-09-11-tabs-visual-refinement-design.md');
  for (const patch of [{ authorization: 'not-authorized' }, { scope: 'all-components' }, { userStatement: '继续' }, { humanGate: 'accepted' }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.tabs.visualRefinement, patch);
    expect(helpers.hasTabsRefinementAuthorization(invalid)).toBe(false);
  }
  const premature = structuredClone(status); premature.componentRefinements.tabs.stage = 'preflight';
  expect(helpers.hasTabsRefinementAuthorization(premature)).toBe(false);
  delete status.componentRefinements.tabs.visualRefinement;
  expect(helpers.hasTabsRefinementAuthorization(status)).toBe(true);
  expect(helpers.getTabsRefinementFiles(status).workspace).not.toContain('tests/e2e/tabs-visual-refinement.spec.ts');
});
