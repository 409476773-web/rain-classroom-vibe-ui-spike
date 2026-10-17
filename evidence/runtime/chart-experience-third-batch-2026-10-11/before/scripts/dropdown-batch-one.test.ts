import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import * as helpers from "./verification-helpers.mjs";
import * as tailwind from "./verify-tailwind-b2.mjs";
import * as colorVerification from "./verify-token-foundations.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";

it("limits the first dropdown batch to its explicit experiment authorization", () => {
  expect(helpers.hasDropdownBatchOneAuthorization).toBeTypeOf("function");
  const status = helpers.parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(helpers.hasDropdownBatchOneAuthorization(status)).toBe(true);
  expect(() => helpers.validateTokenFoundationsV1Phase(status)).not.toThrow();
  for (const mutate of [
    (record: any) => { record.userStatement = "确定。"; },
    (record: any) => { record.scope = "all-public-components"; },
    (record: any) => { record.publication = "authorized"; },
  ]) {
    const invalid = structuredClone(status);
    mutate(invalid.localExperiments.dropdownBatchOne);
    expect(helpers.hasDropdownBatchOneAuthorization(invalid)).toBe(false);
    expect(() => helpers.validateTokenFoundationsV1Phase(invalid)).toThrow();
  }
});

it("allows candidate imports only from the two experiment adapters", () => {
  expect(helpers.isDropdownExperimentImport).toBeTypeOf("function");
  const base = "apps/playground/src/experiments/headless/base.tsx";
  const radix = "apps/playground/src/experiments/headless/radix.tsx";
  expect(helpers.isDropdownExperimentImport(base, "@base-ui/react/menu")).toBe(true);
  expect(helpers.isDropdownExperimentImport(radix, "@radix-ui/react-dialog")).toBe(true);
  expect(helpers.isDropdownExperimentImport(base, "@base-ui/react/tooltip")).toBe(false);
  expect(helpers.isDropdownExperimentImport(base, "@radix-ui/react-dialog")).toBe(false);
  expect(helpers.isDropdownExperimentImport("packages/ui/src/popover/popover.tsx", "@base-ui/react/popover")).toBe(false);
  expect(helpers.isDropdownExperimentImport("apps/playground/src/app.tsx", "@radix-ui/react-dialog")).toBe(false);
});

it("checks the registered local comparison instead of allowing arbitrary CSS", () => {
  expect(tailwind.validateDropdownReviewSource).toBeTypeOf("function");
  const manifest = JSON.parse(readFileSync("apps/playground/src/experiments/headless/manifest.json", "utf8"));
  const source = readFileSync("apps/playground/src/experiments/headless/review.css", "utf8");
  const publicCss = ["tokens", "typography", "focus", "motion"].map(name => readFileSync(`packages/foundations/src/${name}.css`, "utf8")).join("\n");
  const check = (css: string) => tailwind.validateDropdownReviewSource({ manifest, source: css, publicCss });
  expect(check(source)).toEqual([]);
  for (const invalid of [
    ":root { color: red; }", ".dr-item { padding: 11px; }",
    ".dr-item { color: #ff0000; }", ".dr-item { color: var(--rain-ref-red-500); }",
    ".dr-item { gap: var(--rain-space-missing); }", ".dr-item { color: inherit !important; }",
  ]) expect(check(`${source}\n${invalid}`).length).toBeGreaterThan(0);
  expect(tailwind.verifyTailwindB2().failures.filter((failure: string) => failure.startsWith("Dropdown"))).toEqual([]);
});

it("keeps source observations and system colors inside their exact unaccepted comparison scope", () => {
  expect(colorVerification.prepareDropdownColorReview).toBeTypeOf("function");
  const manifest = JSON.parse(readFileSync("apps/playground/src/experiments/headless/manifest.json", "utf8"));
  const source = readFileSync("apps/playground/src/experiments/headless/review.css", "utf8");
  const prepare = (css: string) => colorVerification.prepareDropdownColorReview({ manifest, source: css });
  expect(prepare(source).failures).toEqual([]);
  expect(prepare(source.replace('@media (forced-colors: active)', '@media (max-width: 760px)')).failures.length).toBeGreaterThan(0);
  expect(prepare(`${source}\n[data-flavor="source"].dr-surface { border-color: #e4e9f2; }`).failures.length).toBeGreaterThan(0);
  const accepted = structuredClone(manifest);
  accepted.colorReview.exceptions[0].acceptedException = true;
  expect(colorVerification.prepareDropdownColorReview({ manifest: accepted, source }).failures.length).toBeGreaterThan(0);
  const missingPurpose = structuredClone(manifest);
  missingPurpose.colorReview.paints[0].splice(8, 2);
  expect(colorVerification.prepareDropdownColorReview({ manifest: missingPurpose, source }).failures.length).toBeGreaterThan(0);
});

it("records the lighter interactive description as a finding without relabeling or accepting it", () => {
  const manifest = JSON.parse(readFileSync("apps/playground/src/experiments/headless/manifest.json", "utf8"));
  const filePath = "apps/playground/src/experiments/headless/review.css";
  const prepared = colorVerification.prepareDropdownColorReview({ manifest, source: readFileSync(filePath, "utf8") });
  const outputs = getTokenFoundationOutputs();
  outputs.colorCssConsumers.push(...prepared.consumers);
  const pendingContrastFindings: any[] = [], pendingEligibilityFindings: any[] = [];
  const check = () => colorVerification.validateRegisteredRecipeColors({ filePath, source: prepared.source, outputs, pendingContrastFindings, pendingEligibilityFindings });
  expect(check()).toEqual([]);
  const findings = pendingEligibilityFindings.filter(item => item.recipeId === "dropdown-interactive-description");
  expect(findings.length).toBeGreaterThan(0);
  expect(findings.every(item => item.status === "pending-review" && item.acceptedException === false && item.content === "text")).toBe(true);
  prepared.consumers.find((item: any) => item.use.recipeId === "dropdown-interactive-description")!.use.critical = true;
  expect(check().some(message => message.includes("Weak Neutral needs non-critical, non-interactive content"))).toBe(true);
});
