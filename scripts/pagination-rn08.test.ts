import { existsSync, readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { hasPaginationRn08Authorization, paginationRn08Files, parseYamlSubset, getValidatedTailwindB2History } from "./verification-helpers.mjs";

it("admits only the confirmed Pagination slice without advancing other Gates", () => {
  const phase = parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as any;
  expect(hasPaginationRn08Authorization(phase)).toBe(true);
  expect(() => getValidatedTailwindB2History(phase)).not.toThrow();
  const pending = structuredClone(phase);
  pending.componentRefinements.paginationRn08.humanGate = "awaiting_human";
  pending.componentRefinements.paginationRn08.compactRefinement.humanGate = "awaiting_human";
  delete pending.componentRefinements.paginationRn08.humanGateDecision;
  expect(hasPaginationRn08Authorization(pending)).toBe(true);
  pending.componentRefinements.paginationRn08.humanGate = "accepted";
  expect(hasPaginationRn08Authorization(pending)).toBe(false);
  for (const [field, value] of [["scope", "all-rn08"], ["humanGate", "awaiting_human"], ["contrastAcceptance", "accepted"], ["businessMigration", "authorized"], ["packageOrRegistryPublication", "published"], ["userStatement", "invented"]]) {
    const changed = structuredClone(phase);
    changed.componentRefinements.paginationRn08[field!] = value;
    expect(hasPaginationRn08Authorization(changed)).toBe(false);
    expect(() => getValidatedTailwindB2History(changed)).toThrow();
  }
  for (const path of Object.values(paginationRn08Files).flat()) expect(existsSync(path), path).toBe(true);
  for (const [field, value] of [["scope", "all-components"], ["humanGate", "awaiting_human"], ["contrastAcceptance", "accepted"], ["userStatement", "确认"]]) {
    const changed = structuredClone(phase);
    changed.componentRefinements.paginationRn08.compactRefinement[field!] = value;
    expect(hasPaginationRn08Authorization(changed)).toBe(false);
  }
  for (const [field, value] of [["scope", "all-rn08"], ["userStatement", "继续"], ["evidence", "unrelated.md"]]) {
    const changed = structuredClone(phase);
    changed.componentRefinements.paginationRn08.humanGateDecision[field!] = value;
    expect(hasPaginationRn08Authorization(changed)).toBe(false);
  }
  const manifest = parseYamlSubset(readFileSync("manifests/ui/pagination.yaml", "utf8")) as any;
  const registry = JSON.parse(readFileSync("registry/pagination.json", "utf8"));
  expect(manifest).toMatchObject({ id: "ui-pagination", maturity: "registry-candidate", publication: "unpublished" });
  expect(manifest.verification).toMatchObject({ automated: phase.componentRefinements.paginationRn08.automatedVerification,
    independentReview: phase.componentRefinements.paginationRn08.independentReview, humanGate: "accepted", humanGateScope: "pagination-current-runtime-visual-only", contrastAcceptance: "not-granted" });
  expect(manifest.compactRefinement).toMatchObject({ implementation: phase.componentRefinements.paginationRn08.compactRefinement.implementation,
    automated: phase.componentRefinements.paginationRn08.compactRefinement.automatedVerification,
    independentReview: phase.componentRefinements.paginationRn08.compactRefinement.independentReview, humanGate: "accepted", contrastAcceptance: "not-granted" });
  expect(registry).toMatchObject({ publication: "not-published", humanGate: "accepted", humanGateScope: "pagination-current-runtime-visual-only", contrastAcceptance: "not-granted" });
  for (const path of [...registry.shared.files, ...registry.shared.componentDependencies, ...registry.items.flatMap((item: { files: string[] }) => item.files)]) expect(existsSync(path), path).toBe(true);
});
