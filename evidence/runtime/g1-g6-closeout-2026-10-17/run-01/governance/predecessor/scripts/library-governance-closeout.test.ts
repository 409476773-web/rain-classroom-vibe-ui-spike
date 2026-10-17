import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, it } from "vitest";
import { getValidatedTailwindB2History, parseYamlSubset, validateTokenFoundationsV1Phase } from "./verification-helpers.mjs";
import * as helpers from "./verification-helpers.mjs";
import { copyDatePickerCloseoutFixture } from "./select-unification-test-fixture";
import { getLibraryPaintObservations, getTokenFirstV12ColorConsumers, validateRecordedPaintSource, validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";
import { validateColorUse } from "../packages/foundations/src/color-registry";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { buildIconArtifacts, buildInventory } from "./generate-icons.mjs";

const phase = () => parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
const chartKeys = ["chartLibraryValidation", "chartTrendMotion", "bklitRainValidation", "bklitRainCharts", "chartBusinessExpansion", "chartVariants", "chartRadarFeedback20261009"];

it("keeps existing public export order while regenerating icon artifacts", () => {
  const files = buildIconArtifacts(buildInventory());
  expect(files.get("packages/ui/package.json")).toBe(readFileSync("packages/ui/package.json", "utf8"));
});

it("rejects missing CSS paint properties even when the source hash matches", () => {
  const record = getLibraryPaintObservations();
  const file = structuredClone(record.localSources.find((file: any) => file.filePath.endsWith("navigation-switching-recipes.css")));
  file.inventory = file.inventory.filter((row: any) => row.property !== "border-block");
  expect(validateRecordedPaintSource(file, readFileSync(file.filePath, "utf8"))).not.toEqual([]);
});

it("records each JSX paint and opacity expression, including white gradients and dynamic values", () => {
  const record = getLibraryPaintObservations();
  const file = record.inlineSources.find((file: any) => file.filePath.endsWith("chart-validation/trend-motion.tsx"));
  expect(file.inventory.some((row: any) => row.property === "stopColor" && row.value === '"white"')).toBe(true);
  expect(file.inventory.some((row: any) => row.property === "strokeOpacity" && row.value === "{0.22}")).toBe(true);
  expect(file.inventory.some((row: any) => row.property === "background" && row.value === "colors[index]")).toBe(true);
  const missing = structuredClone(file);
  missing.inventory = missing.inventory.filter((row: any) => row.property !== "strokeOpacity");
  expect(validateRecordedPaintSource(missing, readFileSync(file.filePath, "utf8"))).not.toEqual([]);
  const opacity = record.localSources.flatMap((file: any) => file.inventory).find((row: any) => row.selector === ".rain-g2-toast-description" && row.property === "opacity");
  expect(opacity.minimum).toBe(4.5);
  expect(opacity.additionalRequirements).toContainEqual({ content: "meaningful-icon-or-graphic-or-boundary", minimum: 3 });
});

it("uses the declared G1 replacement alpha when measuring pending findings", () => {
  const consumers = getTokenFirstV12ColorConsumers();
  const consumer = consumers.find((row: any) => row.use.tokenId === "Border/Neutral/1" && row.use.alpha === 65)!;
  expect(consumer).toBeDefined();
  expect(validateColorUse({ ...consumer.use, theme: "light", parentSurfaceId: "Background/Neutral/1" }).contrast).toBeGreaterThan(3);
  const outputs = getTokenFoundationOutputs(), pendingContrastFindings: any[] = [];
  outputs.colorCssConsumers.push(...consumers);
  expect(validateRegisteredRecipeColors({ filePath: consumer.filePath, source: readFileSync(consumer.filePath, "utf8"), outputs, pendingContrastFindings })).toEqual([]);
  expect(pendingContrastFindings.filter(row => row.tokenId === "Border/Neutral/1" && row.theme === "light" && row.parentSurfaceId === "Background/Neutral/1" && row.consumer.includes(consumer.selector))).toEqual([]);
}, 45_000);

it("keeps pending Report A paint evidence without weakening text or data thresholds", () => {
  const record = getLibraryPaintObservations();
  const file = record.localSources.find((file: any) => file.filePath.endsWith("report-a.css"));
  expect(validateRecordedPaintSource(file, readFileSync(file.filePath, "utf8"))).toEqual([]);
  expect(file.inventory.filter((row: any) => row.selector.includes("gap-label") || row.selector.includes("point-label")).every((row: any) => row.content === "text" && row.minimum === 4.5)).toBe(true);
  expect(file.inventory.filter((row: any) => row.selector.includes("class-label") && row.property === "background").every((row: any) => row.minimum === 3)).toBe(true);
  expect(record.inlineSources[0].inventory.every((row: any) => row.minimum === 3 && row.actual === null && !row.acceptedException)).toBe(true);
  expect(validateRecordedPaintSource(file, readFileSync(file.filePath, "utf8") + "\n.report-a-note { color: white; }\n")).not.toEqual([]);
});

it("records Tree idle findings and keeps interaction contrast and real content roles strict", () => {
  const filePath = "packages/ui/src/tree/tree.css", source = readFileSync(filePath, "utf8"), outputs = getTokenFoundationOutputs();
  const pendingContrastFindings: any[] = [], pendingEligibilityFindings: any[] = [];
  expect(validateRegisteredRecipeColors({ filePath, source, outputs, pendingContrastFindings, pendingEligibilityFindings })).toEqual([]);
  expect(pendingContrastFindings.some(row => row.minimum === 4.5 && row.actual < 4.5 && row.acceptedException === false)).toBe(true);
  expect(pendingEligibilityFindings.some(row => row.tokenId === "Icon/Neutral/4" && row.critical && row.interaction === "interactive")).toBe(true);
  const changed = structuredClone(outputs);
  changed.colorCssConsumers.find((row: any) => row.filePath === filePath && row.use.tokenId === "Icon/Neutral/4")!.use.content = "decorative";
  expect(validateRegisteredRecipeColors({ filePath, source, outputs: changed })).toContain("Tree colors must retain their exact authorized selectors, roles, surfaces and original thresholds");
});

it("uses the recorded navigation successor without expanding its accepted scope", () => {
  const read = (helpers as any).getRecordedNavigationSourceBindings;
  expect(read).toBeTypeOf("function");
  const record = read(process.cwd(), phase());
  expect(record.sourceFiles["apps/playground/src/docs/components/navigation-doc-pages.css"].before).toBe("698b3ac6aad8ade8fff87682366372d50121d5bd8d6b80882e0702cf866b3b7d");
  const changed = phase(); changed.componentRefinements.navigationPlaygroundVisualRefinement.scope = "all-ui";
  expect(read(process.cwd(), changed)).toBeNull();
});

it("uses only recorded chart files and package-specific dependency versions", () => {
  const read = (helpers as any).getRecordedChartSourceBindings;
  expect(read).toBeTypeOf("function");
  const record = read(process.cwd(), phase());
  expect(record.sourceFiles["packages/ui/src/charts/vendor/lib/utils.ts"]).toMatch(/^[a-f0-9]{64}$/);
  expect(record.sourceFiles["packages/ui/src/charts/unapproved.ts"]).toBeUndefined();
  expect(record.dependencies["packages/ui/package.json"].dependencies["tailwind-merge"]).toBe("3.6.0");
  expect(record.dependencies["apps/prototype/package.json"].dependencies["tailwind-merge"]).toBe("2.6.0");
  const changed = phase(); changed.bklitRainCharts.unapproved = true;
  expect(() => read(process.cwd(), changed)).toThrow(/recorded phase scope/);
});

it("recognizes current authorized successors while retaining the exact original B2", () => {
  const status = phase();
  expect(createHash("sha256").update(JSON.stringify(status.phaseHistory.tailwindB2)).digest("hex")).toBe("fb9b518f55944a74c8081d88a83d2385c8615e95887efe0cd1eae9b16ae186fe");
  expect(getValidatedTailwindB2History(status)).toEqual(status.phaseHistory.tailwindB2);
  expect(() => validateTokenFoundationsV1Phase(status)).not.toThrow();
});

it("continues the finite source chain without changing original proofs or Select visuals", () => {
  expect(helpers.getLibraryGovernanceCloseoutSourceBindings(process.cwd())?.kind).toBe("LibraryGovernanceCloseoutSourceBindings");
  for (const name of ["getSelectUnificationSourceBindings", "getDatePickerVisualFeedbackSourceBindings", "getG5SourceBindings", "getG4SourceBindings"] as const) {
    expect(() => helpers[name](process.cwd(), phase()), name).not.toThrow();
  }
}, 30_000);

it("rejects widened paths, re-signed third sources, forged before, visual and old Gate changes", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-library-governance-"));
  const put = (file: string, bytes: Buffer | string) => { mkdirSync(dirname(join(root, file)), { recursive: true }); writeFileSync(join(root, file), bytes); };
  const copy = (file: string) => put(file, readFileSync(file));
  const directory = helpers.libraryGovernanceCloseoutEvidence, bindings = directory + "source-bindings.json";
  try {
    copyDatePickerCloseoutFixture(copy);
    expect(helpers.getLibraryGovernanceCloseoutSourceBindings(root)?.kind).toBe("LibraryGovernanceCloseoutSourceBindings");
    for (const observationPath of [directory + "concurrent-document-observation.json", directory + "concurrent-document-observation-02.json"]) {
      const observation = JSON.parse(readFileSync(observationPath, "utf8"));
      expect(observation.humanAcceptanceInherited).toBe(false);
      expect(observation.publicationAuthorized).toBe(false);
      for (const file of [observationPath, ...Object.keys(observation.sourceFiles), ...Object.values(observation.sourceFiles).map((binding: any) => binding.beforeSnapshot), ...Object.keys(observation.ownerRecords)]) {
        put(file, readFileSync(file, "utf8") + "\n/* unknown documentation successor */\n");
        expect(() => helpers.getLibraryGovernanceCloseoutSourceBindings(root)).toThrow(/observed documentation/);
        copy(file);
      }
    }
    const original = JSON.parse(readFileSync(bindings, "utf8"));
    const extra = structuredClone(original); extra.sourceFiles["unrelated.ts"] = { before: null, after: "0".repeat(64) };
    put(bindings, JSON.stringify(extra));
    expect(() => helpers.getLibraryGovernanceCloseoutSourceBindings(root)).toThrow(/exact finite authorization and source paths/);
    copy(bindings);
    for (const file of ["scripts/verify-token-foundations.mjs", "scripts/verification-helpers.mjs"]) {
      put(file, readFileSync(file, "utf8") + "\n/* unknown third source */\n");
      expect(() => helpers.getLibraryGovernanceCloseoutSourceBindings(root)).toThrow(/current source changed/);
      const resigned = structuredClone(original); resigned.sourceFiles[file].after = createHash("sha256").update(readFileSync(join(root, file))).digest("hex");
      put(bindings, JSON.stringify(resigned));
      expect(() => helpers.getLibraryGovernanceCloseoutSourceBindings(root)).toThrow(/verified final source hashes|current source changed/);
      copy(file); copy(bindings);
    }
    const before = directory + "before/scripts/verify-token-foundations.mjs";
    put(before, "forged before\n");
    expect(() => helpers.getLibraryGovernanceCloseoutSourceBindings(root)).toThrow(/before source changed/);
    copy(before);
    const visual = "packages/ui/src/select/select.styles.ts";
    put(visual, readFileSync(visual, "utf8") + "\n/* changed accepted Select */\n");
    expect(() => helpers.getLibraryGovernanceCloseoutSourceBindings(root)).toThrow(/current source changed/);
    copy(visual);
    put("status/current-phase.yaml", readFileSync("status/current-phase.yaml", "utf8").replace('humanGate: "awaiting_human"', 'humanGate: "accepted"'));
    expect(() => helpers.getLibraryGovernanceCloseoutSourceBindings(root)).toThrow(/preserve every previous phase record and Gate/);
    copy("status/current-phase.yaml");
    const oldProof = "evidence/runtime/slider-closeout-2026-10-13/source-bindings.json";
    put(oldProof, "{}");
    expect(() => helpers.getLibraryGovernanceCloseoutSourceBindings(root)).toThrow(/original proof changed/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

it("rejects changing a recorded successor, unknown phases or the original B2", () => {
  const status = phase();
  expect(() => validateTokenFoundationsV1Phase(status)).not.toThrow();
  for (const change of [
    (value: any) => { value.componentRefinements.navigationPlaygroundVisualRefinement.scope = "all-ui"; },
    (value: any) => { value.componentRefinements.navigationPlaygroundVisualRefinement.humanGate = "accepted"; },
    (value: any) => { value.localExperiments.rainDesignerStarter.humanGate = "accepted"; },
    (value: any) => { value.localExperiments.rainDesignerStarter.publication = "authorized"; },
    (value: any) => { value.localExperiments.unapproved = { authorization: "authorized" }; },
    (value: any) => { value.unapproved = { authorization: "authorized" }; },
    (value: any) => { value.phaseHistory.tailwindB2.currentPhase.status = "completed"; },
    ...chartKeys.map(key => (value: any) => { value[key].unapproved = true; }),
  ]) {
    const changed = structuredClone(status); change(changed);
    expect(() => validateTokenFoundationsV1Phase(changed)).toThrow(/Invalid Token Foundations V1/);
  }
});
