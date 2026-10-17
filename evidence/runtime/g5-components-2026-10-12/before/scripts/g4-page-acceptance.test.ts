import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { g4PageAcceptanceDecision, getG4PageAcceptanceBindings, getG4SourceBindings, getG4VisualRefinementSourceBindings, getG4SizingReviewSourceBindings, hasG4ComponentsAuthorization, parseYamlSubset } from "./verification-helpers.mjs";

const phase = () => parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;

describe("user acceptance of the three current G4 pages", () => {
  it("records only the explicit page decision and preserves all earlier Gates", () => {
    const current = phase();
    expect(current.componentRefinements.g4Components.pageAcceptance).toEqual(g4PageAcceptanceDecision);
    const previous = parseYamlSubset(readFileSync("evidence/runtime/g4-pages-acceptance-2026-10-12/before/status/current-phase.yaml", "utf8"));
    delete current.componentRefinements.g4Components.pageAcceptance;
    expect(current).toEqual(previous);
    for (const change of [{ pages: ["typography", "item", "progress", "chart"] }, { scope: "all-components" }, { contrastAcceptance: "accepted" }, { publication: "published" }, { userStatement: "automation passed" }]) {
      const invalid = phase();
      Object.assign(invalid.componentRefinements.g4Components.pageAcceptance, change);
      expect(hasG4ComponentsAuthorization(invalid)).toBe(false);
      expect(() => getG4PageAcceptanceBindings(process.cwd(), invalid)).toThrow();
    }
  });

  it("checks current metadata against actual originals and retains all three frozen source chains", () => {
    const current = phase(), acceptance = getG4PageAcceptanceBindings(process.cwd(), current);
    expect(Object.keys(acceptance.sourceFiles)).toHaveLength(8);
    for (const read of [getG4SizingReviewSourceBindings, getG4VisualRefinementSourceBindings, getG4SourceBindings]) expect(() => read(process.cwd(), current)).not.toThrow();
    for (const name of ["typography", "item", "progress"]) {
      const manifest = parseYamlSubset(readFileSync(`manifests/ui/${name}.yaml`, "utf8")) as any;
      expect(manifest.verification.pageAcceptance).toEqual(g4PageAcceptanceDecision);
      expect(manifest.humanGate).toBe("awaiting_human");
      expect(manifest.publication).toBe("unpublished");
    }
    const registry = JSON.parse(readFileSync("registry/g4-assets.json", "utf8"));
    expect(registry.pageAcceptance).toEqual(g4PageAcceptanceDecision);
    expect(registry.humanGate).toBe("awaiting_human");
  });
});
