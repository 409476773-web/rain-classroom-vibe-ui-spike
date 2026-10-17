import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import * as outputs from "./token-foundation-outputs.mjs";
import * as tokens from "./verify-token-foundations.mjs";
import * as tailwind from "./verify-tailwind-b2.mjs";

const authorization = {
  authorization: "authorized", authorizedAt: "2026-09-09",
  decisionSource: "explicit-user-continue-tag-next-step", userStatement: "继续建设tag的下一步",
  scope: "tag-select-and-local-tag-management-recipe",
  plan: "../docs/plans/2026-09-09-tag-batch-three-implementation.md",
  design: "../docs/plans/2026-09-09-tag-batch-three-design.md",
  headless: "base-ui-1.8.0-select-and-popover-only",
  implementationBaseline: "same-panel-immediate-selection",
  implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run",
  humanGate: "not-evaluated", contrastAcceptance: "not-granted",
  doesNotAuthorize: ["other-public-overlay-or-selection-migration", "new-color-values-or-global-visual-rules", "other-headless-dependencies-or-contrast-exceptions", "figma-publication-business-migration-or-git"],
};

it("admits only the exact third Tag batch and explicit visual acceptance without changing frozen history", () => {
  expect(helpers.hasTagBatchThreeAuthorization).toBeTypeOf("function");
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  status.componentRefinements.tagBatchThree = structuredClone(authorization);
  expect(helpers.hasTagBatchThreeAuthorization(status)).toBe(true);
  expect(() => helpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
  const accepted = structuredClone(status);
  Object.assign(accepted.componentRefinements.tagBatchThree, {
    implementation: "completed", automatedVerification: "passed", independentReview: "passed", humanGate: "accepted",
    humanGateDecision: {
      acceptedAt: "2026-09-10", decisionSource: "explicit-user-confirmation",
      userStatement: "好的，这一版视觉已经完成人工验收，没有问题。", scope: "tag-batch-three-runtime-visual-only",
      evidence: "../evidence/runtime/tag-batch-three/verification.md",
    },
  });
  expect(helpers.hasTagBatchThreeAuthorization(accepted)).toBe(true);
  expect(() => helpers.validateTokenFoundationsV1Phase(accepted)).not.toThrow();
  for (const patch of [{ humanGateDecision: undefined }, { implementation: "in-progress" }, { independentReview: "findings" },
    { humanGateDecision: { ...accepted.componentRefinements.tagBatchThree.humanGateDecision, scope: "all-tag-contrast-and-publication" } }]) {
    const invalid = structuredClone(accepted);
    Object.assign(invalid.componentRefinements.tagBatchThree, patch);
    expect(helpers.hasTagBatchThreeAuthorization(invalid)).toBe(false);
  }
  expect(helpers.getValidatedTailwindB2History(status).componentRefinements.tagBatchThree).toBeUndefined();
  for (const patch of [
    { scope: "all-tag-and-menu-work" }, { userStatement: "确定。" }, { headless: "any-headless" },
    { implementationBaseline: "two-selection-engines" }, { humanGate: "accepted" },
    { contrastAcceptance: "accepted" }, { doesNotAuthorize: [] }, { extraPermission: "publish" },
    { implementation: "completed" }, { humanGate: "awaiting_human" },
  ]) {
    const invalid = structuredClone(status);
    Object.assign(invalid.componentRefinements.tagBatchThree, patch);
    expect(helpers.hasTagBatchThreeAuthorization(invalid)).toBe(false);
    expect(() => helpers.validateTokenFoundationsV1Phase(invalid)).toThrow();
  }
  Object.assign(status.componentRefinements.tagBatchThree, {
    implementation: "completed", automatedVerification: "passed", independentReview: "passed", humanGate: "awaiting_human",
  });
  expect(helpers.hasTagBatchThreeAuthorization(status)).toBe(true);
  expect(() => helpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
});

it("limits Base UI imports to this Select and the local management Popover", () => {
  expect(helpers.isTagBatchThreeImport).toBeTypeOf("function");
  expect(helpers.isTagBatchThreeImport("packages/ui/src/tag/tag-select.tsx", "@base-ui/react/select")).toBe(true);
  expect(helpers.isTagBatchThreeImport("apps/playground/src/docs/components/tag-management-recipe.tsx", "@base-ui/react/popover")).toBe(true);
  for (const [file, module] of [
    ["packages/ui/src/tag/tag-select.tsx", "@base-ui/react/menu"],
    ["packages/ui/src/select/select.tsx", "@base-ui/react/select"],
    ["apps/playground/src/docs/components/tag-management-recipe.tsx", "@base-ui/react/dialog"],
    ["packages/ui/src/tag/tag-select.tsx", "@radix-ui/react-select"],
  ]) expect(helpers.isTagBatchThreeImport(file, module)).toBe(false);
});

it("registers precise popup roles and parents without widening or accepting contrast exceptions", () => {
  expect(outputs.getTagBatchThreeColorConsumers).toBeTypeOf("function");
  const filePath = "packages/ui/src/tag/tag-select.styles.ts", source = readFileSync(filePath, "utf8");
  const generated = outputs.getTokenFoundationOutputs();
  const pending: unknown[] = [];
  expect(tokens.validateRegisteredRecipeColors({ filePath, source, outputs: generated, pendingContrastFindings: pending })).toEqual([]);
  expect(pending).toEqual([]);
  for (const mutate of [
    (entry: any) => { entry.parentSurfaces = ["Background/Neutral/2"]; },
    (entry: any) => { entry.recipes[0].foreground.content = "decorative"; },
    (entry: any) => { entry.scope = "all-components"; },
    (entry: any) => { entry.recipes.pop(); },
  ]) {
    const invalid = structuredClone(generated), consumer = invalid.colorRecipeConsumers.find((entry: any) => entry.filePath === filePath);
    mutate(consumer);
    expect(tokens.validateRegisteredRecipeColors({ filePath, source, outputs: invalid })).not.toEqual([]);
  }
  expect(tokens.validateRegisteredRecipeColors({ filePath, source: source.replace("text-rain-category-text-brand-1", "text-rain-category-text-brand-2") })).not.toEqual([]);
});

it("guards the exact TagSelect CSS independently from the accepted Tag batches", () => {
  expect(tailwind.validateTagSelectCssExceptions).toBeTypeOf("function");
  const source = readFileSync("packages/ui/src/styles.css", "utf8"), contract = helpers.parseYamlSubset(readFileSync("manifests/contracts/tailwind-b2.yaml", "utf8"));
  expect(tailwind.validateTagSelectCssExceptions({ source, contract, authorized: true })).toEqual([]);
  expect(tailwind.validateTagCssExceptions({ source, contract })).toEqual([]);
  expect(tailwind.validateTagSelectCssExceptions({ source, contract, authorized: false })).not.toEqual([]);
  for (const changed of [source.replace("z-index: 40", "z-index: 999"), source + "\n.rain-tag-select__popup { background: red; }"]) {
    expect(tailwind.validateTagSelectCssExceptions({ source: changed, contract, authorized: true })).not.toEqual([]);
  }
});
