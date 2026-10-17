import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { generateTokenFoundations, getGeneratedTokenFiles } from "./generate-token-foundations.mjs";
import { colorRegistry, colorToCss, validateColorUse, colorDiscovery } from "../packages/foundations/src/color-registry";
import { semanticColorAliases, semanticColorRoleAliases } from "../packages/foundations/src/token-contract";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateButtonAliasSource, validateTokenConsumerCss, validateTokenConsumerSource, verifyTokenFoundations } from "./verify-token-foundations.mjs";

const filePath = "apps/playground/src/docs/token-foundations/color-panel.tsx";
const source = readFileSync(filePath, "utf8");
const temporaryRoots: string[] = [];
afterEach(() => temporaryRoots.splice(0).forEach((root) => rmSync(root, { recursive: true, force: true })));

describe("Token Foundations consumption verification", () => {
  it("generates the same color discovery entries and conditional pairings used by the directory", () => {
    const manifest = JSON.parse(getGeneratedTokenFiles()["manifests/contracts/token-foundations-v1.json"]);
    expect(manifest.color.discovery).toBeDefined();
    expect(manifest.color.discovery).toEqual(colorDiscovery);
    expect(manifest.color.discovery.entries).toHaveLength(colorRegistry.length);
  });
  it("registers the real discovery examples and rejects a mismatched Alpha background", () => {
    const outputs = getTokenFoundationOutputs();
    const consumers = outputs.colorConsumers.filter((entry) => entry.selector.includes("discovery-"));
    expect(consumers).toHaveLength(8);
    const options = { filePath, source, outputs };
    expect(validateTokenConsumerSource(options)).toEqual([]);
    const wrong = outputs.colorConsumers.map((entry) => entry.selector === '[data-slot="discovery-light-text"]'
      ? { ...entry, use: { ...entry.use, parentBackgroundId: "Background/Neutral/3" } } : entry);
    expect(validateTokenConsumerSource({ ...options, outputs: { ...outputs, colorConsumers: wrong } }).join("\n")).toMatch(/background|surface|parent/i);
  });
  it("reports actual user-accepted danger Primary text shortfalls instead of claiming readability passed", () => {
    const result = verifyTokenFoundations() as any;
    expect(result.acceptedTextContrastExceptions).toHaveLength(8);
    for (const exception of result.acceptedTextContrastExceptions) {
      expect(exception.recipeId).toMatch(/^button-primary-danger-(default|hover|pressed|loading)$/);
      expect(exception.theme).toBe("light");
      expect(["Background/Neutral/1", "Background/Neutral/3"]).toContain(exception.parentId);
      expect(exception.part).toBe("label");
      expect(exception.actual).toBeGreaterThan(1);
      expect(exception.actual).toBeLessThan(4.5);
      expect(exception.minimum).toBe(4.5);
      expect(exception.decisionSource).toBe("explicit-user-acceptance-danger-primary-text-contrast");
    }
    expect(result.failures.filter((failure: string) => /text contrast exception authorization/i.test(failure))).toEqual([]);
    expect(() => validateColorUse({ tokenId: "OnColor/1", role: "text", property: "color", content: "text", context: "component-recipe", recipeId: "unaccepted-global-copy", onColor: true, theme: "light", parentSurfaceId: "Fill/Red/Solid/2" })).toThrow(/Insufficient contrast/);
  }, 20_000);

  it("rejects missing or broadened phase authorization for accepted text contrast", () => {
    const root = mkdtempSync(join(tmpdir(), "rain-button-contrast-authorization-"));
    temporaryRoots.push(root);
    const statusPath = join(root, "status/current-phase.yaml");
    mkdirSync(dirname(statusPath), { recursive: true });
    for (const status of [
      null,
      readFileSync("status/current-phase.yaml", "utf8").replace('part: "label"', 'part: "icon"'),
      readFileSync("status/current-phase.yaml", "utf8").replace('minimumContrast: 4.5', 'minimumContrast: 3'),
    ]) {
      if (status === null) rmSync(statusPath, { force: true });
      else writeFileSync(statusPath, status);
      const result = verifyTokenFoundations({ root }) as any;
      expect(result.acceptedTextContrastExceptions).toEqual([]);
      expect(result.acceptedComponentContrastExceptions).toEqual([]);
      expect(result.failures.join("\n")).toMatch(/text contrast exception authorization/i);
      if (status === null) expect(result.failures.join("\n")).toMatch(/Token phase authorization cannot be checked/);
    }
  });

  it("does not let component aliases bypass the Category color role boundary", () => {
    const bridge = readFileSync("packages/foundations/src/tailwind-theme.css", "utf8");
    expect(validateButtonAliasSource('bg-rain-button-primary text-rain-button-brand-icon border-rain-button-danger-border', bridge)).toEqual([]);
    expect(validateButtonAliasSource('border-rain-button-primary text-rain-button-primary bg-rain-button-danger-text', bridge)).toHaveLength(3);
  });
  it("generates complete themes and resets only the confirmed semantic references at theme boundaries", () => {
    const outputs = getTokenFoundationOutputs();
    const files = getGeneratedTokenFiles();
    const css = files["packages/foundations/src/tokens.css"].split("/* token-foundations-v1:values:start")[1]!;
    const dark = css.match(/^\[data-rain-theme="dark"\] \{([^}]+)\}/m)?.[1];
    const light = css.match(/^\[data-rain-theme="light"\] \{([^}]+)\}/m)?.[1];
    expect(dark).toBeDefined();
    expect(light).toBeDefined();
    expect(dark).not.toContain("--rain-ref-");
    expect((dark?.match(/--rain-category-[\w-]+:/g) ?? [])).toHaveLength(colorRegistry.length);
    const aliases = { ...semanticColorAliases, ...semanticColorRoleAliases };
    // Six existing Switch aliases were added by its authorized component contract.
    expect(Object.keys(aliases)).toHaveLength(24);
    expect(aliases).toMatchObject({
      "--rain-color-focus-control": "var(--rain-category-border-brand-1)",
      "--rain-color-focus-item": "var(--rain-category-border-brand-1)",
      "--rain-color-focus-danger": "var(--rain-category-border-brand-1)",
      "--rain-color-switch-track-unchecked": "var(--rain-category-icon-neutral-4)",
      "--rain-color-switch-track-hover": "var(--rain-category-icon-neutral-3)",
      "--rain-color-switch-track-pressed": "var(--rain-category-text-neutral-2)",
      "--rain-color-switch-track-checked-hover": "var(--rain-category-fill-brand-solid-1)",
      "--rain-color-switch-track-checked-pressed": "var(--rain-category-fill-brand-alpha-1)",
      "--rain-color-switch-indicator": "var(--rain-category-oncolor-1)",
    });
    for (const scope of [light, dark]) {
      expect((scope?.match(/--rain-color-[\w-]+:/g) ?? [])).toHaveLength(24);
      for (const [name, value] of Object.entries(aliases)) expect(scope).toContain(`${name}: ${value};`);
      expect(scope).toContain("--rain-link-color: var(--rain-color-action-primary-text);");
      expect(scope).not.toContain("--rain-color-intelligence-");
    }
    for (const token of colorRegistry) {
      const variable = `--rain-category-${token.id.toLowerCase().replaceAll("/", "-")}`;
      expect(light).toContain(`${variable}: ${colorToCss(token.light)};`);
      expect(dark).toContain(`${variable}: ${colorToCss(token.dark)};`);
      expect((outputs.variables as Record<string, string>)[variable]).toBe(colorToCss(token.light));
    }
    const manifest = JSON.parse(files["manifests/contracts/token-foundations-v1.json"]);
    expect(manifest.color.supportedThemes).toEqual(["light", "dark"]);
    expect(manifest.color.existingComponentMigration).toBe("semantic-aliases-and-button-recipes");
    expect(manifest.buttonColorRecipes).toHaveLength(45);
    expect(manifest.color.semanticAlignment.componentDarkValidation).toBe("not-included");
    expect(manifest.color.semanticAlignment.accessibility).toBe("open-placeholder-and-consumer-eligibility");
  });

  it("proves actual theme boundaries and rejects mixed-theme parent surfaces", () => {
    const outputs = getTokenFoundationOutputs();
    const common = { filePath, scope: '[data-rain-id="themed-demo"]' };
    const use = { theme: "dark", context: "local-recipe", recipeId: "themed-demo" } as const;
    const colorConsumers: import("./token-foundation-outputs.mjs").ColorConsumer[] = [
      { ...common, selector: '[data-slot="surface"]', className: "bg-rain-category-background-neutral-1", use: { ...use, tokenId: "Background/Neutral/1", role: "background", property: "background-color", content: "surface" } },
      { ...common, selector: '[data-slot="copy"]', className: "text-rain-category-text-neutral-1", use: { ...use, tokenId: "Text/Neutral/1", role: "text", property: "color", content: "text", parentSurfaceId: "Background/Neutral/1" } },
    ];
    const source = '<section data-rain-id="themed-demo" data-rain-theme="dark"><div data-slot="surface" className="bg-rain-category-background-neutral-1"><span data-slot="copy" className="text-rain-category-text-neutral-1">文字</span></div></section>';
    const input = { filePath, source, outputs: { ...outputs, colorConsumers, displayConsumers: [] } };
    expect(validateTokenConsumerSource(input)).toEqual([]);
    for (const theme of ['', ' data-rain-theme="light"', ' data-rain-theme="sepia"', ' data-rain-theme={theme}']) {
      expect(validateTokenConsumerSource({ ...input, source: source.replace(' data-rain-theme="dark"', theme) }).join("\n")).toMatch(/theme/i);
    }
    const lightConsumers = colorConsumers.map(entry => ({ ...entry, use: { ...entry.use, theme: "light" as const } }));
    const nestedReset = source.replace('<div data-slot="surface"', '<div data-rain-theme="light" data-slot="surface"');
    expect(validateTokenConsumerSource({ ...input, source: nestedReset, outputs: { ...input.outputs, colorConsumers: lightConsumers } })).toEqual([]);
    const mixed = source.replace('<span data-slot="copy"', '<span data-rain-theme="light" data-slot="copy"');
    expect(validateTokenConsumerSource({ ...input, source: mixed, outputs: { ...input.outputs, colorConsumers: [colorConsumers[0]!, lightConsumers[1]!] } }).join("\n")).toMatch(/theme/i);
  });

  it("accepts the real registered color consumers and a newly declared legal Recipe without verifier edits", () => {
    expect(validateTokenConsumerSource({ filePath, source })).toEqual([]);
    const outputs = getTokenFoundationOutputs();
    const entry: import("./token-foundation-outputs.mjs").ColorConsumer = { filePath, selector: '[data-slot="new-label"]', scope: '[data-rain-id="new-demo"]',
      className: "text-rain-category-text-neutral-1", use: { tokenId: "Text/Neutral/1", role: "text", property: "color",
        context: "local-recipe", content: "text", recipeId: "new-label", parentSurfaceId: "Background/Neutral/1" } };
    const parent: import("./token-foundation-outputs.mjs").ColorConsumer = { ...entry, selector: '[data-rain-id="new-demo"]', className: "bg-rain-category-background-neutral-1",
      use: { tokenId: "Background/Neutral/1", role: "background", property: "background-color", context: "local-recipe", content: "surface", recipeId: "new-label" } };
    expect(validateTokenConsumerSource({ filePath, source: '<section data-rain-id="new-demo" className="bg-rain-category-background-neutral-1"><p data-slot="new-label" className="text-rain-category-text-neutral-1">示例</p></section>',
      outputs: { ...outputs, colorConsumers: [entry, parent], displayConsumers: [] } })).toEqual([]);
  });

  it("resolves complete Local Recipes and registered typography/geometry selections in the real panels", () => {
    for (const name of ["geometry-panel", "typography-panel"]) {
      const path = `apps/playground/src/docs/token-foundations/${name}.tsx`;
      expect(validateTokenConsumerSource({ filePath: path, source: readFileSync(path, "utf8") })).toEqual([]);
    }
  });

  it("verifies the real Alpha surface ancestry rather than accepting an unrelated opaque base", () => {
    const outputs = getTokenFoundationOutputs();
    const common = {filePath, scope: '[data-rain-id="alpha-pair"]'};
    const recipe = {context: "local-recipe", recipeId: "alpha-pair"} as const;
    const colorConsumers: import("./token-foundation-outputs.mjs").ColorConsumer[] = [
      {...common, selector: '[data-rain-id="alpha-pair"]', className: "bg-rain-category-background-neutral-1", use: {...recipe, tokenId: "Background/Neutral/1", role: "background", property: "background-color", content: "surface"}},
      {...common, selector: '[data-slot="surface"]', className: "bg-rain-category-fill-red-alpha-2", use: {...recipe, tokenId: "Fill/Red/Alpha/2", role: "fill", property: "background-color", content: "surface", parentSurfaceId: "Background/Neutral/1"}},
      {...common, selector: '[data-slot="copy"]', className: "text-rain-category-text-red-1", use: {...recipe, tokenId: "Text/Red/1", role: "text", property: "color", content: "text", parentSurfaceId: "Fill/Red/Alpha/2", parentBackgroundId: "Background/Neutral/1"}},
    ];
    const source = '<div data-rain-id="alpha-pair" className="bg-rain-category-background-neutral-1"><div data-slot="surface" className="bg-rain-category-fill-red-alpha-2"><span data-slot="copy" className="text-rain-category-text-red-1">内容</span></div></div>';
    expect(validateTokenConsumerSource({filePath, source, outputs: {...outputs, colorConsumers, displayConsumers: []}})).toEqual([]);
    const wrongBase = colorConsumers.map(entry => entry.selector === '[data-slot="copy"]' ? {...entry, use: {...entry.use, parentBackgroundId: "Background/Neutral/2"}} : entry);
    expect(validateTokenConsumerSource({filePath, source, outputs: {...outputs, colorConsumers: wrongBase, displayConsumers: []}}).join("\n")).toMatch(/surface chain/);
    const intervening = {...common, selector: '[data-slot="intervening-surface"]', className: "bg-rain-category-background-dark-1", use: {...recipe, tokenId: "Background/Dark/1", role: "background", property: "background-color", content: "surface"}} as const;
    for (const paint of [intervening.className, "bg-rain-surface-page"]) {
      const wrapped = source.replace('<div data-slot="surface"', `<div data-slot="intervening-surface" className="${paint}"><div data-slot="surface"`) + '</div>';
      const consumers = paint === intervening.className ? [...colorConsumers, intervening] : colorConsumers;
      expect(validateTokenConsumerSource({filePath, source: wrapped, outputs: {...outputs, colorConsumers: consumers, displayConsumers: []}}).join("\n")).toMatch(/nearest painted surface/);
    }
    const ambiguous = source.replace('className="bg-rain-category-background-neutral-1"', 'className="bg-rain-category-background-neutral-1 bg-rain-surface-page"');
    expect(validateTokenConsumerSource({filePath, source: ambiguous, outputs: {...outputs, colorConsumers, displayConsumers: []}}).join("\n")).toMatch(/ambiguous background/);
  });

  it("keeps text-color comparison samples confined to their decorative preview scope", () => {
    const previewPath = "apps/playground/src/docs/token-foundations/color-pairing-preview.tsx";
    const outputs = getTokenFoundationOutputs();
    const displayConsumers = [{filePath: previewPath, selector:'[data-slot="pairing-text"]', scope:'[data-rain-id="token-foundations"]', displayOnly:true, kind:"pairing-foreground", consumerScope:'[data-rain-id="token-color-pairing"]'}];
    const valid = '<section data-rain-id="token-color-pairing"><span data-slot="pairing-text" aria-hidden="true" className="text-rain-swatch-oncolor-1">文字色样</span></section>';
    const input = {filePath:previewPath, source:valid, outputs:{...outputs,colorConsumers:[],displayConsumers}};
    expect(validateTokenConsumerSource(input)).toEqual([]);
    for(const source of [valid.replace(' aria-hidden="true"',''),valid.replace('token-color-pairing','another-region'), valid.replace('text-rain-swatch-oncolor-1','text-rain-swatch-fill-orange-solid-1')]) {
      expect(validateTokenConsumerSource({...input,source}).length).toBeGreaterThan(0);
    }
  });

  it("does not trust shadowed, replaced or locally invented inventory/composition bindings", () => {
    const path = "apps/playground/src/docs/token-foundations/geometry-panel.tsx";
    for (const mutation of [
      `import { tokenClassNames } from './token-classes.generated'; function Preview(){ const tokenClassNames={line:{h:{1:'text-rain-category-oncolor-1'}}}; return <p className={tokenClassNames.line.h[1]}>正文</p> }`,
      `import { tokenClassNames } from './token-classes.generated'; function Preview(tokenClassNames: any){return <p className={tokenClassNames.line.h[1]}>正文</p> }`,
      `function rainCn(...v:string[]){ return 'text-rain-category-oncolor-1' } const node=<p className={rainCn('h-rain-line-1')}>正文</p>;`,
      `import { tokenClassNames } from './token-classes.generated'; Object.assign(tokenClassNames.line.h, {1:'text-rain-category-oncolor-1'}); const node=<p className={tokenClassNames.line.h[1]}>正文</p>;`,
      `import { tokenClassNames } from './token-classes.generated'; tokenClassNames.line.h[1]='text-rain-category-oncolor-1'; const node=<p className={tokenClassNames.line.h[1]}>正文</p>;`,
    ]) expect(validateTokenConsumerSource({ filePath: path, source: mutation }).length).toBeGreaterThan(0);
  });

  it("requires an existing nonempty evidence file and keeps DOM opacity claims out of this batch", () => {
    const root = mkdtempSync(join(tmpdir(), "rain-token-evidence-")); temporaryRoots.push(root);
    const outputs = getTokenFoundationOutputs();
    const conditional: import("./token-foundation-outputs.mjs").ColorConsumer = {
      filePath, selector: '[data-rain-id="condition"]', scope: '[data-rain-id="condition"]',
      className: "bg-rain-category-background-neutral-4", use: { tokenId: "Background/Neutral/4", role: "background", property: "background-color", context: "local-recipe", content: "surface", recipeId: "conditional-example", evidenceRef: "evidence.md" },
    };
    const input = { root, filePath, source: '<div data-rain-id="condition" className="bg-rain-category-background-neutral-4" />', outputs: { ...outputs, colorConsumers: [conditional], displayConsumers: [] } };
    expect(validateTokenConsumerSource(input).length).toBeGreaterThan(0);
    writeFileSync(join(root, "evidence.md"), ""); expect(validateTokenConsumerSource(input).length).toBeGreaterThan(0);
    writeFileSync(join(root, "evidence.md"), "Consumer review evidence"); expect(validateTokenConsumerSource(input)).toEqual([]);
    const colorConsumers = outputs.colorConsumers.map((entry) => entry.selector === '[data-slot="derived-fill"]' ? { ...entry, use: { ...entry.use, componentOpacity: 0.5, opacityScope: "leaf" as const } } : entry);
    expect(validateTokenConsumerSource({ filePath, source, outputs: { ...outputs, colorConsumers } }).length).toBeGreaterThan(0);
  });

  it("rejects wrong role, Alpha and mismatched Dark in actual consumer metadata", () => {
    const outputs = getTokenFoundationOutputs();
    for (const mutation of [{ role: "text" as const }, { alpha: 5 }, { theme: "dark" as const }]) {
      const colorConsumers = outputs.colorConsumers.map((entry) => entry.selector === '[data-slot="derived-fill"]'
        ? { ...entry, use: { ...entry.use, ...mutation } } : entry);
      expect(validateTokenConsumerSource({ filePath, source, outputs: { ...outputs, colorConsumers } }).length).toBeGreaterThan(0);
    }
  });

  it("rejects private values, raw visual styles, unregistered utilities and dynamic concatenation", () => {
    for (const badSource of [
      '<p style={{ color: "#ffffff" }}>例</p>',
      '<p style={{ color: "var(--rain-ref-blue-500)" }}>例</p>',
      '<p className="text-rain-category-border-neutral-1">例</p>',
      '<p className="text-rain-category-text-neutral-1/5">例</p>',
      '<p className={"bg-rain-" + color}>例</p>',
      'const className = "bg-red-500"; <p className={className}>例</p>',
    ]) expect(validateTokenConsumerSource({ filePath, source: badSource, outputs: { ...getTokenFoundationOutputs(), colorConsumers: [], displayConsumers: [] } }).length).toBeGreaterThan(0);
  });

  it("does not let authored CSS bypass Category metadata or introduce named/raw colors", () => {
    const cssPath = "apps/playground/src/docs/token-foundations/token-foundations.css";
    expect(validateTokenConsumerCss({ filePath: cssPath, source: ".example { color: var(--rain-color-text-primary); border: var(--rain-line-thickness-1) solid var(--rain-color-border-default); }" })).toEqual([]);
    for (const selector of ["bg-rain-local-token-color-demo-highlight", "token-color-light-canvas", "token-color-dark-canvas"]) {
      expect(validateTokenConsumerCss({ filePath: cssPath, source: `.${selector} { background-color: var(--rain-color-surface-page); }` }).length).toBeGreaterThan(0);
    }
    for (const declaration of ["color: red", "background: #fff", "border: 1px solid red", "color: var(--rain-category-border-neutral-1)", "border-left-color: red", "box-shadow: 0 0 0 100px red", "background-image: linear-gradient(red, red)", "color: var(--rain-color-border-subtle)"]) {
      expect(validateTokenConsumerCss({ filePath: cssPath, source: `.example { ${declaration}; }` }).length).toBeGreaterThan(0);
    }
  });

  it("rejects opaque JSX spread and unrelated parent paints", () => {
    const spread = source.replace("</header>", '</header><p {...{ className: "text-rain-category-oncolor-1" }}>未验证正文</p>');
    const unrelated = source.replace('className="token-color-recipe-comparison bg-rain-category-background-neutral-1"', 'className="token-color-recipe-comparison"').replace("</header>", '</header><section data-rain-id="token-color-demo"><div className="token-color-recipe-comparison bg-rain-category-background-neutral-1" /></section>');
    for (const mutation of [spread, unrelated]) expect(validateTokenConsumerSource({ filePath, source: mutation }).length).toBeGreaterThan(0);
  });

  it("requires source-node, scope and metadata agreement instead of trusting legal-looking class names", () => {
    expect(validateTokenConsumerSource({ filePath, source: source.replace('data-slot="derived-fill"', 'data-slot="wrong-part"') }).length).toBeGreaterThan(0);
    expect(validateTokenConsumerSource({ filePath, source: source.replace('data-rain-id="token-color-demo"', 'data-rain-id="wrong-scope"') }).length).toBeGreaterThan(0);
    expect(validateTokenConsumerSource({ filePath, source: source.replace('bg-rain-category-fill-neutral-alpha-3', 'bg-rain-category-background-neutral-1') }).length).toBeGreaterThan(0);
  });

  it("keeps display-only swatches decorative and out of ordinary components", () => {
    expect(validateTokenConsumerSource({ filePath, source: source.replace('data-slot="category-swatch" aria-hidden="true"', 'data-slot="category-swatch"') }).length).toBeGreaterThan(0);
    expect(validateTokenConsumerSource({ filePath, source: source.replace("output.displayClassName", '\"bg-rain-swatch-invented\"') }).length).toBeGreaterThan(0);
    expect(validateTokenConsumerSource({ filePath, source: source.replace("const output = outputs.get(token.id)!", 'const output = { displayClassName: "bg-rain-category-text-neutral-1" }') }).length).toBeGreaterThan(0);
    expect(validateTokenConsumerSource({ filePath: "packages/ui/src/button/copy.tsx", source: '<span className="bg-rain-swatch-text-neutral-1" />' }).length).toBeGreaterThan(0);
  });

  it("detects drift in generated facts before auditing their consumers", () => {
    const root = mkdtempSync(join(tmpdir(), "rain-token-verify-"));
    temporaryRoots.push(root);
    for (const path of ["packages/foundations/src/tokens.css", "packages/foundations/src/typography.css", "packages/foundations/src/tailwind-theme.css"]) {
      mkdirSync(dirname(join(root, path)), { recursive: true });
      writeFileSync(join(root, path), readFileSync(path));
    }
    generateTokenFoundations({ root });
    const path = join(root, "packages/foundations/src/tokens.css");
    writeFileSync(path, readFileSync(path, "utf8").replace("--rain-line-thickness-1: 1px", "--rain-line-thickness-1: 2px"));
    expect(verifyTokenFoundations({ root }).failures.join("\n")).toMatch(/Stale.*tokens\.css/);
    const escapedPath = "apps/playground/src/escaped-color.tsx";
    mkdirSync(dirname(join(root, escapedPath)), { recursive: true });
    writeFileSync(join(root, escapedPath), '<p className="text-rain-category-oncolor-1">例</p>');
    expect(verifyTokenFoundations({ root }).failures.join("\n")).toMatch(/Category\/local colors require registered Token consumer metadata: apps\/playground\/src\/escaped-color\.tsx/);
    writeFileSync(join(root, escapedPath), `import { tokenClassNames } from './docs/token-foundations/token-classes.generated'; const node=<p className={tokenClassNames.color['OnColor/1'].utilities[0].className}>例</p>;`);
    expect(verifyTokenFoundations({ root }).failures.join("\n")).toMatch(/Category\/local colors require registered Token consumer metadata: apps\/playground\/src\/escaped-color\.tsx/);
  });
});
