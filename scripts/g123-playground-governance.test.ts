import { copyCurrentGovernanceFixture } from "./select-unification-test-fixture";
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getButtonGroupRepairDocumentationColorConsumers, getG123PlaygroundDocumentationColorConsumers, validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { collectRecordedPostB2Documents, getButtonGroupRepairSourceBindings, getG123TailwindCandidateOrigins, hasButtonGroupRepairAuthorization, hasButtonGroupSizeRefinementAuthorization, hasG123PlaygroundAssetizationAuthorization, parseYamlSubset, validateTokenFoundationsV1Phase } from "./verification-helpers.mjs";

const root = process.cwd();
const status = () => parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) as any;

describe("G1–G3 candidate extraction authorization", () => {
  it("accepts the exact current scope while preserving the frozen parent and Gates", () => {
    const phase = status();
    expect(hasG123PlaygroundAssetizationAuthorization(phase)).toBe(true);
    expect(() => validateTokenFoundationsV1Phase(phase)).not.toThrow();
    const failures: string[] = [];
    const docs = collectRecordedPostB2Documents(root, phase, failures);
    expect(failures).toEqual([]);
    expect(docs.registries).toContain("registry/g1-assets.json");
    expect(docs.registries).toContain("registry/g2-assets.json");
  });
  it("rejects publication, widened paths, forged registry identity and transferred human acceptance", () => {
    for (const [field, value] of [["scope", "all-components"], ["publication", "published"], ["figmaWrite", "authorized"], ["gitOperations", "authorized"], ["humanGate", "accepted"], ["g2RegistrySha256", "forged"], ["extraSource", "packages/ui/src/unrelated.tsx"]] as const) {
      const phase = status();
      phase.componentRefinements.g123PlaygroundAssetization[field] = value;
      expect(hasG123PlaygroundAssetizationAuthorization(phase), String(field)).toBe(false);
      expect(() => validateTokenFoundationsV1Phase(phase)).toThrow();
    }
  });
  it("does not grant a source scope from tampered current Registry bytes", () => {
    const fixture = mkdtempSync(join(tmpdir(), "rain-g123-registry-"));
    try {
      mkdirSync(join(fixture, "registry"));
      for (const name of ["g1", "g2"]) writeFileSync(join(fixture, `registry/${name}-assets.json`), readFileSync(join(root, `registry/${name}-assets.json`)));
      const file = join(fixture, "registry/g2-assets.json");
      const registry = JSON.parse(readFileSync(file, "utf8"));
      registry.items[0].files.push("packages/ui/src/unrelated.tsx");
      writeFileSync(file, JSON.stringify(registry, null, 2) + "\n");
      const failures: string[] = [];
      const docs = collectRecordedPostB2Documents(fixture, status(), failures);
      expect(docs.registries).not.toContain("registry/g2-assets.json");
      expect(failures.some(failure => failure.includes("registry/g2-assets.json") && failure.includes("preserve"))).toBe(true);
    } finally { rmSync(fixture, { recursive: true, force: true }); }
  });
  it("rejects relabeling an essential input boundary as decorative", () => {
    const filePath = "packages/ui/src/field/field.styles.ts";
    const outputs = getTokenFoundationOutputs();
    const frame = outputs.colorRecipeConsumers.find(row => row.filePath === filePath && row.symbol === "fieldFrameRecipe");
    const boundary = frame?.recipes.find((recipe: { boundary?: { content:string } }) => recipe.boundary?.content === "essential-boundary")?.boundary;
    if (!boundary) throw new Error("The shared Input/Textarea field must retain its essential boundary");
    boundary.content = "decorative";
    expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(join(root, filePath), "utf8"), outputs, root })).toContain("Select and shared field color metadata must retain their exact authorization, surfaces, content roles and thresholds");
  });

});

describe("Button Group size refinement authorization", () => {
  const authorizedSizes = () => {
    const phase = parseYamlSubset(readFileSync(join(root, "evidence/runtime/button-group-sizes-2026-10-08/before/status/current-phase.yaml"), "utf8")) as any;
    const repair = phase.componentRefinements.buttonGroupRepair;
    repair.styleRefinement.humanGate = "accepted";
    repair.styleRefinement.humanGateDecision = {
      acceptedAt: "2026-10-08", decisionSource: "explicit-user-button-group-style-current-runtime-confirmation",
      userStatement: "确定。需要补充多尺寸，现在只有1个尺寸。", scope: "button-group-style-current-runtime-visual-only",
      evidence: "evidence/runtime/button-group-sizes-2026-10-08/style-human-gate.json",
    };
    repair.sizeRefinement = {
      authorization: "authorized", authorizedAt: "2026-10-08", decisionSource: "explicit-user-button-group-five-sizes",
      userStatement: "确定。需要补充多尺寸，现在只有1个尺寸。", scope: "button-group-existing-five-button-sizes-and-local-docs-only",
      plan: "docs/plans/2026-10-08-button-group-sizes.md", evidence: "evidence/runtime/button-group-sizes-2026-10-08/verification.md",
      sourceBindings: "evidence/runtime/button-group-sizes-2026-10-08/source-bindings.json",
      implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run", humanGate: "awaiting_human",
    };
    return phase;
  };
  it("accepts the visual style decision separately from the new five-size authorization", () => {
    const phase = authorizedSizes(), repair = phase.componentRefinements.buttonGroupRepair;
    expect(hasButtonGroupSizeRefinementAuthorization(phase)).toBe(true);
    expect(repair.humanGate).toBe("awaiting_human");
    expect(repair.contrastAcceptance).toBe("not-granted");
    expect(phase.componentRefinements.g123PlaygroundAssetization.humanGate).toBe("awaiting_human");
    repair.sizeRefinement.implementation = "completed";
    expect(hasButtonGroupSizeRefinementAuthorization(phase)).toBe(false);
    repair.sizeRefinement.automatedVerification = "passed-scoped";
    expect(hasButtonGroupSizeRefinementAuthorization(phase)).toBe(false);
    repair.sizeRefinement.independentReview = "passed-scoped";
    expect(hasButtonGroupSizeRefinementAuthorization(phase)).toBe(true);
  });
  it("rejects widened scope, incomplete acceptance and transfer to other Gates", () => {
    for (const [field, value] of [["scope", "all-buttons-and-token-scales"], ["humanGate", "accepted"], ["sourceBindings", "unrelated.json"], ["publication", "authorized"], ["userStatement", "forged"]] as const) {
      const phase = authorizedSizes();
      phase.componentRefinements.buttonGroupRepair.sizeRefinement[field] = value;
      expect(hasButtonGroupSizeRefinementAuthorization(phase), field).toBe(false);
    }
    for (const mutate of [
      (repair: any) => { delete repair.styleRefinement.humanGateDecision; },
      (repair: any) => { repair.styleRefinement.humanGateDecision.scope = "all-components"; },
      (repair: any) => { repair.styleRefinement.humanGate = "awaiting_human"; },
      (repair: any) => { repair.humanGate = "accepted"; },
      (repair: any) => { repair.contrastAcceptance = "accepted"; },
    ]) {
      const phase = authorizedSizes(); mutate(phase.componentRefinements.buttonGroupRepair);
      expect(hasButtonGroupSizeRefinementAuthorization(phase)).toBe(false);
    }
  });
});

describe("Button Group limited repair authorization", () => {
  it("accepts the scoped style successor while rejecting widened scope and transferred acceptance", () => {
    const phase = status();
    expect(hasButtonGroupRepairAuthorization(phase)).toBe(true);
    for (const [field, value] of [["scope", "all-buttons"], ["humanGateDecision", undefined], ["sourceBindings", "unrelated.json"]] as const) {
      const changed = structuredClone(phase);
      changed.componentRefinements.buttonGroupRepair.styleRefinement[field] = value;
      expect(hasButtonGroupRepairAuthorization(changed)).toBe(false);
    }
  });
  const authorizedPhase = () => {
    const phase = parseYamlSubset(readFileSync(join(root, "evidence/runtime/button-group-repair-2026-10-07/before/status/current-phase.yaml"), "utf8")) as any;
    phase.componentRefinements.buttonGroupRepair = {
      authorization: "authorized", authorizedAt: "2026-10-07", decisionSource: "explicit-user-continue-button-group-repair",
      userStatement: "继续修复", scope: "button-group-existing-part-contract-seams-and-playground-only",
      workMode: "system-mode", assetIdentity: "registry-candidate",
      evidence: "evidence/runtime/button-group-repair-2026-10-07/verification.md",
      sourceBindings: "evidence/runtime/button-group-repair-2026-10-07/source-bindings.json",
      g2RegistrySha256: "333c776986568f83f5695dddb9e5e5b8e8eb2775d4f610b7fe151098ef4c7019",
      implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run",
      humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "not-authorized",
      businessMigration: "not-authorized", figmaWrite: "not-authorized", gitOperations: "no-operations-authorized",
      ...(status().componentRefinements.buttonGroupRepair.styleRefinement ? { styleRefinement: status().componentRefinements.buttonGroupRepair.styleRefinement } : {}),
    };
    return phase;
  };
  it("accepts only the independent repair after completed G123 work", () => {
    const phase = authorizedPhase();
    const parent = structuredClone(phase.componentRefinements.g123PlaygroundAssetization);
    expect(hasButtonGroupRepairAuthorization(phase)).toBe(true);
    expect(() => validateTokenFoundationsV1Phase(phase)).not.toThrow();
    expect(phase.componentRefinements.g123PlaygroundAssetization).toEqual(parent);
    phase.componentRefinements.buttonGroupRepair.implementation = "completed";
    expect(hasButtonGroupRepairAuthorization(phase)).toBe(false);
    phase.componentRefinements.buttonGroupRepair.automatedVerification = "passed-scoped";
    expect(hasButtonGroupRepairAuthorization(phase)).toBe(false);
    phase.componentRefinements.buttonGroupRepair.independentReview = "passed-scoped";
    expect(hasButtonGroupRepairAuthorization(phase)).toBe(true);
  });
  it("rejects widened scope, changed Registry identity and transferred acceptance", () => {
    for (const [field, value] of [["scope", "all-button-families"], ["publication", "published"], ["humanGate", "accepted"], ["contrastAcceptance", "accepted"], ["g2RegistrySha256", "forged"], ["extraSource", "packages/ui/src/button.tsx"]] as const) {
      const phase = authorizedPhase();
      phase.componentRefinements.buttonGroupRepair[field] = value;
      expect(hasButtonGroupRepairAuthorization(phase), field).toBe(false);
      expect(() => validateTokenFoundationsV1Phase(phase)).toThrow();
    }
    const phase = authorizedPhase();
    phase.componentRefinements.g123PlaygroundAssetization.implementation = "in-progress";
    expect(hasButtonGroupRepairAuthorization(phase)).toBe(false);
    const changedParent = authorizedPhase();
    changedParent.componentRefinements.g123PlaygroundAssetization.independentReview = "not-run";
    expect(hasButtonGroupRepairAuthorization(changedParent)).toBe(false);
  });
  it("binds the actual repair while keeping the original 82-source record", () => {
    const phase = status();
    const bindings = getButtonGroupRepairSourceBindings(root, phase);
    const file = "packages/ui/src/button-group/button-group.tsx";
    expect(bindings.sourceFiles[file].after).not.toBe(bindings.sourceFiles[file].before);
    expect(getG123TailwindCandidateOrigins(root, phase).sourceFiles[file]).toBe(bindings.sourceFiles[file].after);
    const recordPath = "evidence/runtime/g123-playground-2026-10-07/summary.json";
    expect(readFileSync(join(root, recordPath), "utf8")).toBe(readFileSync(join(root, "evidence/runtime/button-group-repair-2026-10-07/before", recordPath), "utf8"));
    expect(Object.keys(JSON.parse(readFileSync(join(root, recordPath), "utf8")).sourceHashes)).toHaveLength(82);
  });
  it("rejects changed binding bytes, actual paint source and retained Registry bytes", () => {
    const phase = status();
    const fixture = mkdtempSync(join(tmpdir(), "rain-button-group-bindings-"));
    const recordPath = "evidence/runtime/button-group-repair-2026-10-07/source-bindings.json";
    const bindings = getButtonGroupRepairSourceBindings(root, phase) as { sourceFiles: Record<string, { before: string | null; after: string }>; retainedRecords: Record<string, string> };
    try {
      copyCurrentGovernanceFixture(root, fixture);
      const files = [recordPath, ...Object.keys(bindings.sourceFiles), ...Object.keys(bindings.retainedRecords), ...Object.entries(bindings.sourceFiles).filter(([, binding]) => binding.before).map(([file]) => `evidence/runtime/button-group-repair-2026-10-07/before/${file}`)];
      for (const file of files) {
        mkdirSync(join(fixture, file, ".."), { recursive: true });
        writeFileSync(join(fixture, file), readFileSync(join(root, file)));
      }
      expect(() => getButtonGroupRepairSourceBindings(fixture, phase)).not.toThrow();
      for (const [file, expected] of [[recordPath, "preserve its recorded bytes"], ["evidence/runtime/button-group-sizes-2026-10-08/source-bindings.json", "size bindings must preserve"], ["packages/ui/src/button-group/button-group.css", "actual source changed"], ["registry/g2-assets.json", "retained record changed"]] as const) {
        const path = join(fixture, file), source = readFileSync(path, "utf8");
        writeFileSync(path, source + "\n/* unauthorized change */\n");
        const legacy = file === "registry/g2-assets.json" ? /retained record changed|retained predecessor or raw token changed/ : new RegExp(expected);
        // A current retained CSS/Registry owner rejects this same physical path
        // before the older Button Group reader reaches its original check.
        const boundOwner = file === "packages/ui/src/button-group/button-group.css" || file === "registry/g2-assets.json";
        const escapedPath = file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const rejected = boundOwner
          ? new RegExp(legacy.source + "|^(?:Closeout|GitHub review) retained source or original proof changed: " + escapedPath + "(?:\\n|$)")
          : legacy;
        expect(() => getButtonGroupRepairSourceBindings(fixture, phase)).toThrow(rejected);
        writeFileSync(path, source);
      }
    } finally { rmSync(fixture, { recursive: true, force: true }); }
  }, 120_000);
  it("retains reading contrast and exact roles for the local dark bridge", () => {
    const filePath = "apps/playground/src/docs/components/button-group-page.css";
    const source = readFileSync(join(root, filePath), "utf8"), outputs = getTokenFoundationOutputs();
    outputs.colorCssConsumers.push(...getButtonGroupRepairDocumentationColorConsumers(root));
    expect(validateRegisteredRecipeColors({ filePath, source, outputs, root })).toEqual([]);
    outputs.colorCssConsumers.find(row => row.filePath === filePath && row.property === "--rain-color-text-primary")!.use.content = "decorative";
    expect(validateRegisteredRecipeColors({ filePath, source, outputs, root })).toEqual(["Button Group documentation colors require exact authorization, reading roles, criticality and parent surfaces"]);
  });
});
