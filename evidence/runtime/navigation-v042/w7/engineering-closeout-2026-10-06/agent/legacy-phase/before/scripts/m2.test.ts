// @vitest-environment node
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import * as governance from "./verification-helpers.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { getM2ColorConsumers, validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

const read = (file: string) => readFileSync(file, "utf8");
const phase = () => governance.parseYamlSubset(read("status/current-phase.yaml")) as any;

it("accepts only M2 local delivery, preserves prior decisions, and keeps both benchmarks independent", () => {
  expect(typeof governance.hasM2Authorization).toBe("function");
  const status = phase();
  expect(governance.hasM2Authorization(status)).toBe(true);
  expect(governance.getValidatedTailwindB2History(status)).toEqual(status.phaseHistory.tailwindB2);
  const earlier = structuredClone(status); delete earlier.componentRefinements.m2Delivery; delete earlier.componentRefinements.generationQuality;
  if (governance.hasAvatarFamilyAuthorization(status)) delete earlier.componentRefinements.avatarFamily;
  if (governance.hasInputNumberAuthorization(status)) delete earlier.componentRefinements.inputNumber;
  if (governance.hasTokenFirstV12Authorization(status)) delete earlier.componentRefinements.tokenFirstV12;
  expect(earlier).toEqual(governance.parseYamlSubset(read("evidence/runtime/m2/before/status/current-phase.yaml.txt")));
  for (const patch of [{ scope: "all-benchmarks" }, { humanGate: "accepted" }, { contrastAcceptance: "granted" },
    { publication: "published" }, { businessMigration: "authorized" }, { implementation: "completed", automatedVerification: "not-run" }, { unexpected: true }, { benchmarks: {} }, { benchmarks: { ...status.componentRefinements.m2Delivery.benchmarks, bmE: {} } }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.m2Delivery, patch);
    expect(governance.hasM2Authorization(invalid)).toBe(false);
    expect(() => governance.getValidatedTailwindB2History(invalid)).toThrow();
  }
  for (const key of ["bmC", "bmD"]) for (const patch of [{ humanGate: "accepted" }, { unexpected: true },
    { implementation: "completed", automatedVerification: "not-run" }, { independentReview: "assumed" }]) {
    const invalid = structuredClone(status); Object.assign(invalid.componentRefinements.m2Delivery.benchmarks[key], patch);
    expect(governance.hasM2Authorization(invalid)).toBe(false);
  }
  const independent = structuredClone(status);
  independent.componentRefinements.m2Delivery.implementation = "in-progress";
  Object.assign(independent.componentRefinements.m2Delivery.benchmarks.bmC, { implementation: "completed", automatedVerification: "passed", independentReview: "passed" });
  Object.assign(independent.componentRefinements.m2Delivery.benchmarks.bmD, { implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run" });
  expect(governance.hasM2Authorization(independent)).toBe(true);
  Object.assign(independent.componentRefinements.m2Delivery, { implementation: "completed", automatedVerification: "passed", independentReview: "passed" });
  expect(governance.hasM2Authorization(independent)).toBe(false);
  for (const key of ["rn15Delivery", "layoutsV1", "tableRn08"]) {
    const invalid = structuredClone(status); delete invalid.componentRefinements[key];
    expect(governance.hasM2Authorization(invalid)).toBe(false);
  }
});

it("projects only the reviewed M2 prototype entrance without changing the frozen source transitions", () => {
  const status = phase(), file = "apps/prototype/src/main.tsx", source = read(file);
  const before = read(`evidence/runtime/m2/before/${file}.txt`);
  const expected = createHash("sha256").update(before).digest("hex");
  const transitions = JSON.parse(read("evidence/runtime/rn15-delivery/source-transitions.json"));
  expect(governance.matchesRn15ProtectedSource(file, source, expected, status, transitions)).toBe(true);
  const movedEntry = source.match(/\/\/ m2-entry:start[\s\S]*?\/\/ m2-entry:end\n/)![0];
  for (const changed of [source.replace(movedEntry, "") + movedEntry, source + "\n// arbitrary change", source.replace("<LearningReportScenario />", "<UnreviewedScenario />"),
    source.replace("// m2-entry:end", "console.log('hidden mutation');\n// m2-entry:end"), source.replace("// m2-routes:end", "// m2-routes:end\n// m2-routes:start\nthrow Error();\n// m2-routes:end")]) {
    expect(governance.matchesRn15ProtectedSource(file, changed, expected, status, transitions)).toBe(false);
  }
  const invalid = structuredClone(status); invalid.componentRefinements.m2Delivery.humanGate = "accepted";
  expect(governance.matchesRn15ProtectedSource(file, source, expected, invalid, transitions)).toBe(false);
  expect(governance.matchesRn15ProtectedSource("apps/prototype/src/other.tsx", source, expected, status, transitions)).toBe(false);
});

it("allows exactly one grading directory navigation in its authorized page", () => {
  const status = phase(), file = "apps/prototype/src/scenarios/bm-c/page.tsx", source = read(file);
  expect(governance.prepareM2NavigationSource(file, source, status)).not.toMatch(/<(?:nav|aside)\b/i);
  for (const changed of [source + '<nav aria-label="platform">', source + '<nav aria-label="分层批改目录">',
    source.replace('<nav aria-label="分层批改目录">', '<nav aria-label="分层批改目录" data-platform="true">'), source + "<aside>"]) {
    expect(governance.prepareM2NavigationSource(file, changed, status)).toMatch(/<(?:nav|aside)\b/i);
  }
  expect(governance.prepareM2NavigationSource("apps/playground/src/app.tsx", source, status)).toMatch(/<nav\b/i);
  const invalid = structuredClone(status); delete invalid.componentRefinements.m2Delivery;
  expect(governance.prepareM2NavigationSource(file, source, invalid)).toMatch(/<nav\b/i);
});

it("checks each local color on its real surfaces and rejects weakened SVG, text, scope or source metadata", () => {
  const outputs = getTokenFoundationOutputs();
  outputs.colorCssConsumers.push(...getM2ColorConsumers());
  for (const filePath of ["apps/prototype/src/scenarios/bm-c/page.css", "apps/prototype/src/scenarios/bm-d/page.css"]) {
    const source = read(filePath), pendingContrastFindings: any[] = [], pendingEligibilityFindings: any[] = [];
    expect(validateRegisteredRecipeColors({ filePath, source, outputs, pendingContrastFindings, pendingEligibilityFindings })).toEqual([]);
    expect(pendingContrastFindings).toEqual([]); expect(pendingEligibilityFindings).toEqual([]);
    for (const changed of [source + '\n.escape { color: var(--rain-category-text-neutral-1); }', source.replace(/\.bm-[cd] \{/, ':root {'),
      source + '\n.escape { color: #000000; }']) expect(validateRegisteredRecipeColors({ filePath, source: changed, outputs }).length).toBeGreaterThan(0);
    for (const patch of [{ scope: ":root" }, { parentSurfaces: ["Background/Neutral/2"] }, { minimumContrast: 0 }, { unexpected: true }]) {
      const invalid = structuredClone(outputs); Object.assign(invalid.colorCssConsumers.find(entry => entry.filePath === filePath && entry.use.content === "text")!, patch);
      expect(validateRegisteredRecipeColors({ filePath, source, outputs: invalid }).length).toBeGreaterThan(0);
    }
    for (const patch of [{ content: "decorative", critical: false }, { tokenId: "Text/Neutral/5" }, { interaction: "non-interactive" }]) {
      const invalid = structuredClone(outputs);
      Object.assign(invalid.colorCssConsumers.find(entry => entry.filePath === filePath && entry.use.content === "text")!.use, patch);
      expect(validateRegisteredRecipeColors({ filePath, source, outputs: invalid }).length).toBeGreaterThan(0);
    }
    expect(validateRegisteredRecipeColors({ filePath, source, outputs, root: "/__missing_m2_authorization__" }).length).toBeGreaterThan(0);
  }
  const graphic = getM2ColorConsumers().filter((entry: any) => ["stroke", "fill", "color"].includes(entry.property) && entry.use.role === "icon");
  expect(graphic).toHaveLength(3);
  for (const entry of graphic) expect(entry).toMatchObject({ minimumContrast: 3, use: { content: "meaningful-icon", property: "color", critical: true } });
  for (const patch of [{ minimumContrast: 0 }, { use: { ...graphic[0].use, content: "decorative", critical: false } }]) {
    const invalid = structuredClone(outputs);
    Object.assign(invalid.colorCssConsumers.find(entry => entry.filePath === graphic[0].filePath && entry.selector === graphic[0].selector && entry.property === graphic[0].property)!, patch);
    expect(validateRegisteredRecipeColors({ filePath: graphic[0].filePath, source: read(graphic[0].filePath), outputs: invalid }).length).toBeGreaterThan(0);
  }
});

it("reads frozen M2 color metadata from the requested repository root without falling back", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-m2-color-root-"));
  try {
    mkdirSync(join(root, "status")); mkdirSync(join(root, "evidence/runtime/m2"), { recursive: true });
    writeFileSync(join(root, "status/current-phase.yaml"), read("status/current-phase.yaml"));
    writeFileSync(join(root, "evidence/runtime/m2/color-consumers.json"), read("evidence/runtime/m2/color-consumers.json") + "\n");
    expect(() => getM2ColorConsumers(root)).toThrow(/M2 color metadata differs/);
    const outputs = getTokenFoundationOutputs(); outputs.colorCssConsumers.push(...getM2ColorConsumers());
    const filePath = "apps/prototype/src/scenarios/bm-c/page.css";
    expect(validateRegisteredRecipeColors({ filePath, source: read(filePath), outputs, root })).toEqual(["M2 color metadata differs from its reviewed scope, roles or thresholds"]);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
