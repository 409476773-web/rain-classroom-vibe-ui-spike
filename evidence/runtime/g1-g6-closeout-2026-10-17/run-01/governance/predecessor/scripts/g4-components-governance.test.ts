import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { collectRecordedPostB2Documents, getButtonGroupRepairSourceBindings, getG4SourceBindings, g4ComponentFiles, g4RetainedRecordPaths, g4SourceBindingPaths, hasG4ComponentsAuthorization, parseYamlSubset, validateG4Registry, validateG4SourceDirectives } from "./verification-helpers.mjs";
import { g4CssException, validateG4TailwindContract, validateProtectedTailwindSource } from "./verify-tailwind-b2.mjs";
import { getG4ColorConsumers, getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

const root = process.cwd();
const baseline = () => parseYamlSubset(readFileSync(join(root, "evidence/runtime/g4-components-2026-10-11/before/status/current-phase.yaml"), "utf8")) as any;
const authorized = () => {
  const phase = baseline();
  phase.componentRefinements.g4Components = {
    authorization: "authorized", authorizedAt: "2026-10-11", decisionSource: "explicit-user-g4-components-implementation",
    userStatement: "确定，先补齐 G4：Typography 复用收口，建设 Item 和 Progress，并补齐 Playground 展示和使用说明。",
    scope: "typography-reuse-item-progress-and-playground-docs", workMode: "system-mode", assetIdentity: "registry-candidate",
    plan: "docs/plans/2026-10-11-g4-components.md", evidence: "evidence/runtime/g4-components-2026-10-11/verification.md",
    sourceLock: "evidence/runtime/g4-components-2026-10-11/source-lock.json",
    sourceBindings: "evidence/runtime/g4-components-2026-10-11/source-bindings.json",
    implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run", humanGate: "awaiting_human",
    contrastAcceptance: "not-granted", publication: "unpublished", figmaWrite: "not-authorized",
    businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
  };
  return phase;
};

describe("G4 finite candidate authorization", () => {
  it("permits only the explicit scope while preserving prior records", () => {
    const phase = authorized(), before = baseline();
    expect(hasG4ComponentsAuthorization(phase)).toBe(true);
    delete phase.componentRefinements.g4Components;
    expect(phase).toEqual(before);
    expect(hasG4ComponentsAuthorization(phase)).toBe(false);
  });
  it("rejects broadened sources and transferred publication, visual or contrast acceptance", () => {
    for (const [field, value] of [["scope", "all-g4"], ["humanGate", "accepted"], ["contrastAcceptance", "accepted"], ["publication", "published"], ["figmaWrite", "authorized"], ["gitOperations", "authorized"], ["sourceBindings", "unrelated.json"], ["extraSource", "packages/ui/src/button/button.tsx"]] as const) {
      const phase = authorized();
      phase.componentRefinements.g4Components[field] = value;
      expect(hasG4ComponentsAuthorization(phase), field).toBe(false);
    }
  });
  it("cannot claim completion without scoped checks and independent review", () => {
    const phase = authorized(), record = phase.componentRefinements.g4Components;
    record.implementation = "completed";
    expect(hasG4ComponentsAuthorization(phase)).toBe(false);
    record.automatedVerification = "passed-scoped";
    expect(hasG4ComponentsAuthorization(phase)).toBe(false);
    record.independentReview = "passed-scoped";
    expect(hasG4ComponentsAuthorization(phase)).toBe(true);
  });
  it("requires the single explicit page source and keeps old scan directives unchanged", () => {
    const source = readFileSync(join(root, "evidence/runtime/g4-components-2026-10-11/before/apps/playground/src/styles.css"), "utf8");
    const directive = '@source "./docs/components/g4-component-pages.tsx";';
    const valid = source.replace('@source inline("text-rain-action-primary");', `${directive}\n@source inline("text-rain-action-primary");`);
    expect(validateG4SourceDirectives(source, authorized())).not.toEqual([]);
    expect(validateG4SourceDirectives(valid, authorized())).toEqual([]);
    expect(validateG4SourceDirectives(valid + '\n@source "./docs/components";', authorized())).not.toEqual([]);
    expect(validateG4SourceDirectives(valid.replace('@source not "./docs/components";', ""), authorized())).not.toEqual([]);
    expect(g4ComponentFiles.application).toEqual(["g4-component-pages.tsx", "g4-component-pages.css", "g4-component-pages.test.tsx"].map(file => `apps/playground/src/docs/components/${file}`));
  });
  it("does not allow a new raw palette in G4 styles", () => {
    expect(validateProtectedTailwindSource({ filePath: "packages/ui/src/item/item.styles.ts", source: 'export const itemPaints = { root: "#abcdef" };' })).toContain("raw color is forbidden in packages/ui/src/item/item.styles.ts: #abcdef");
    expect(validateProtectedTailwindSource({ filePath: "packages/ui/src/progress/progress.tsx", source: '<div className="bg-[#abcdef]" />' })).not.toEqual([]);
  });
  it("keeps every G4 source protected and the CSS exception finite", () => {
    const contract = parseYamlSubset(readFileSync(join(root, "manifests/contracts/tailwind-b2.yaml"), "utf8")) as any;
    const current = parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8"));
    expect(validateG4TailwindContract({ contract, status: current, root })).toEqual([]);
    contract.protectedPaths.optional = contract.protectedPaths.optional.filter((file: string) => file !== "packages/ui/src/item/item.tsx");
    expect(validateG4TailwindContract({ contract, status: current, root })).toContain("G4 missing protected source: packages/ui/src/item/item.tsx");
    contract.cssExceptions.entries.find((entry: any) => entry.id === g4CssException.id).selector = "all-ui";
    expect(validateG4TailwindContract({ contract, status: current, root })).toContain("G4 CSS exception must retain its exact owned Parts, Tokens and checks");
  });
  it("cannot broaden Registry sources, dependencies or publication by regenerating a source binding", () => {
    const registry = JSON.parse(readFileSync(join(root, "evidence/runtime/g4-review-sizing-2026-10-11/before/registry/g4-assets.json"), "utf8"));
    expect(validateG4Registry(registry)).toEqual([]);
    for (const mutate of [
      (copy: any) => { copy.publication = "published"; },
      (copy: any) => { copy.humanGate = "accepted"; },
      (copy: any) => { copy.dependencies["other-lib"] = "1.0.0"; },
      (copy: any) => { copy.items[1].files.push("packages/ui/src/unrelated.tsx"); },
      (copy: any) => { copy.items[0].importPath = "@rain-next/ui"; },
    ]) {
      const copy = structuredClone(registry); mutate(copy);
      expect(validateG4Registry(copy)).not.toEqual([]);
    }
  });
  it("binds the exact source successor and cannot rewrite a retained Foundation or prior Gate", () => {
    const fixture = mkdtempSync(join(tmpdir(), "rain-g4-source-bindings-")), phase = authorized();
    const beforeRoot = "evidence/runtime/g4-components-2026-10-11/before/";
    const hash = (source: string | Buffer) => createHash("sha256").update(source).digest("hex");
    const copy = (file: string) => {
      const preserved = join(root, "evidence/runtime/g4-review-sizing-2026-10-11/before", file);
      const source = readFileSync(existsSync(preserved) ? preserved : join(root, file));
      mkdirSync(dirname(join(fixture, file)), { recursive: true }); writeFileSync(join(fixture, file), source);
      return hash(source);
    };
    try {
      const record: any = { kind: "G4ComponentSourceBindings", scope: phase.componentRefinements.g4Components.scope, authorizedAt: "2026-10-11", sourceFiles: {}, retainedRecords: {} };
      copy(beforeRoot + "status/current-phase.yaml");
      for (const file of g4SourceBindingPaths) record.sourceFiles[file] = { before: existsSync(join(root, beforeRoot + file)) ? copy(beforeRoot + file) : null, after: copy(file) };
      for (const file of g4RetainedRecordPaths) { record.retainedRecords[file] = copy(file); copy(beforeRoot + file); }
      const writeRecord = () => writeFileSync(join(fixture, phase.componentRefinements.g4Components.sourceBindings), JSON.stringify(record));
      writeRecord();
      expect(() => getG4SourceBindings(fixture, phase)).not.toThrow();
      const changedGate = structuredClone(phase);
      changedGate.componentRefinements.g123PlaygroundAssetization.humanGate = "accepted";
      expect(() => getG4SourceBindings(fixture, changedGate)).toThrow("preserve every prior phase record and Gate");
      record.sourceFiles["packages/ui/src/unrelated.tsx"] = { before: null, after: "fake" }; writeRecord();
      expect(() => getG4SourceBindings(fixture, phase)).toThrow("exact finite source and predecessor inventory");
      delete record.sourceFiles["packages/ui/src/unrelated.tsx"];
      const stylesPath = "packages/ui/src/styles.css", styles = readFileSync(join(fixture, stylesPath), "utf8"), initialAfter = record.sourceFiles[stylesPath].after;
      for (const changedStyles of [styles + '\n@import "./unrelated/unrelated.css";\n', styles.replace("color: inherit;", "color: transparent;")]) {
        writeFileSync(join(fixture, stylesPath), changedStyles); record.sourceFiles[stylesPath].after = hash(changedStyles); writeRecord();
        expect(() => getG4SourceBindings(fixture, phase)).toThrow("shared styles must add only the two exact component imports");
      }
      writeFileSync(join(fixture, stylesPath), styles); record.sourceFiles[stylesPath].after = initialAfter;
      const tokenPath = "packages/foundations/src/tokens.css", changed = readFileSync(join(fixture, tokenPath), "utf8") + "\n:root { --rain-g4-palette: #abcdef; }\n";
      writeFileSync(join(fixture, tokenPath), changed); record.retainedRecords[tokenPath] = hash(changed); writeRecord();
      expect(() => getG4SourceBindings(fixture, phase)).toThrow("retained source or record changed");
    } finally { rmSync(fixture, { recursive: true, force: true }); }
  });
  it("composes the new shared-style imports without changing the old G2–G3 and Button Group binding records", () => {
    const phase = parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8"));
    expect(() => getButtonGroupRepairSourceBindings(root, phase)).not.toThrow();
  });
  it("audits the bound G4 Registry with the validated immutable phase history", () => {
    expect(hasG4ComponentsAuthorization(parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")))).toBe(true);
    const result = spawnSync(process.execPath, ["scripts/verify-boundaries.mjs"], { cwd: root, encoding: "utf8", timeout: 30000 });
    expect(result.error).toBeUndefined();
    expect(result.status).toBe(0);
    expect(`${result.stdout}${result.stderr}`).toContain("Boundary verification passed");
    expect(`${result.stdout}${result.stderr}`).not.toContain("registry/g4-assets.json");
  });
  it("audits bound G4 Tailwind sources without inheriting the previous phase authorization", () => {
    const phase = parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8"));
    const recorded = collectRecordedPostB2Documents(root, phase, []);
    expect(recorded.registries).toContain("registry/g4-assets.json");
    expect(recorded.manifests).toEqual(expect.arrayContaining(["typography", "item", "progress"].map(name => `manifests/ui/${name}.yaml`)));
    for (const status of [baseline(), { ...phase, componentRefinements: { ...(phase as any).componentRefinements, g4Components: { ...(phase as any).componentRefinements.g4Components, scope: "all-components" } } }]) {
      expect(collectRecordedPostB2Documents(root, status, []).registries).not.toContain("registry/g4-assets.json");
    }
    const result = spawnSync(process.execPath, ["scripts/verify-tailwind-b2.mjs"], { cwd: root, encoding: "utf8", timeout: 30000 });
    expect(result.error).toBeUndefined();
    const output = `${result.stdout}${result.stderr}`;
    expect(result.status).toBe(0);
    expect(output).toContain("Tailwind B2 verification passed");
    expect(output).not.toContain("structural utility flex-wrap is outside its authorized demo scope: packages/ui/src/item/item.tsx");
    expect(output).not.toContain("structural utility flex-wrap is outside its authorized demo scope: packages/ui/src/progress/progress.tsx");
    expect(output).not.toContain("G4 recorded sources cannot be checked:");
  });
});

describe("G4 existing palette consumers", () => {
  const outputs = () => {
    const result = getTokenFoundationOutputs() as any, g4 = getG4ColorConsumers();
    result.colorRecipeConsumers.push(...g4.colorRecipeConsumers);
    result.colorCssConsumers.push(...g4.colorCssConsumers);
    return result;
  };
  it("checks the current complete component and document paints", () => {
    for (const filePath of ["packages/ui/src/item/item.tsx", "packages/ui/src/item/item.css", "packages/ui/src/progress/progress.tsx", "packages/ui/src/progress/progress.css", "apps/playground/src/docs/components/g4-component-pages.css"]) {
      expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(join(root, filePath), "utf8"), outputs: outputs(), root }), filePath).toEqual([]);
    }
  });
  it("rejects an extra palette and metadata that erases text or progress contrast requirements", () => {
    const filePath = "packages/ui/src/progress/progress.tsx", source = readFileSync(join(root, filePath), "utf8");
    const weak = outputs();
    const indicator = weak.colorRecipeConsumers.find((entry: any) => entry.symbol === "progressPaints")?.recipes.find((entry: any) => entry.id === "g4-progress-indicator") as any;
    indicator.requiredStateContrast = 0;
    expect(validateRegisteredRecipeColors({ filePath, source, outputs: weak, root })).not.toEqual([]);
    const cssPath = "packages/ui/src/progress/progress.css", css = readFileSync(join(root, cssPath), "utf8");
    expect(validateRegisteredRecipeColors({ filePath: cssPath, source: `${css}\n.rain-progress { background-color: #abcdef; }`, outputs: outputs(), root })).not.toEqual([]);
    const changed = outputs();
    const feedback = changed.colorCssConsumers.find((entry: any) => entry.filePath.endsWith("g4-component-pages.css") && entry.selector.includes(".g4-doc-feedback")) as any;
    feedback.use.content = "decorative";
    expect(validateRegisteredRecipeColors({ filePath: feedback.filePath, source: readFileSync(join(root, feedback.filePath), "utf8"), outputs: changed, root })).not.toEqual([]);
  });
});
