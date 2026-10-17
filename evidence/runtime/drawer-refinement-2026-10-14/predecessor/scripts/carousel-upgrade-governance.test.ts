import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseYamlSubset } from "./verification-helpers.mjs";
import { carouselUpgradeAuthorization, carouselUpgradeEvidence, validateCarouselUpgradePhase, validateCarouselUpgradePackage, validateCarouselUpgradeRegistry, validateCarouselUpgradeLock, carouselSharedSource, carouselOwnedSource, carouselSharedPredecessor, validateCarouselUpgradeIndex, carouselRegistryOwnedSource, carouselRegistryPredecessor, carouselPhaseOwnedSource, carouselPhasePredecessor, carouselGuideOwnedSource, carouselGuidePredecessor } from "./carousel-upgrade-governance.mjs";

const entry = { ...carouselUpgradeAuthorization, evidence: carouselUpgradeEvidence + "verification.md", sourceBindings: carouselUpgradeEvidence + "source-bindings.json", colorConsumers: carouselUpgradeEvidence + "color-consumers.json", implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run" };
const previous = { componentRefinements: { g6Components: { humanGate: "awaiting_human", contrastAcceptance: "not-granted" }, sliderCloseout: { humanGate: "accepted" } } };
describe("finite Carousel successor contract", () => {
  it("admits the exact successor while preserving older gates", () => {
    expect(() => validateCarouselUpgradePhase({ componentRefinements: { ...previous.componentRefinements, carouselUpgrade: entry } }, previous, entry)).not.toThrow();
    const widened = { componentRefinements: { ...previous.componentRefinements, carouselUpgrade: { ...entry, publication: "published" } } };
    expect(() => validateCarouselUpgradePhase(widened, previous, widened.componentRefinements.carouselUpgrade)).toThrow();
    const changed = { componentRefinements: { ...previous.componentRefinements, g6Components: { humanGate: "accepted", contrastAcceptance: "not-granted" }, carouselUpgrade: entry } };
    expect(() => validateCarouselUpgradePhase(changed, previous, entry)).toThrow(/previous phase/);
  });
  it("does not accept completed implementation without both scoped checks", () => {
    const unchecked = { ...entry, implementation: "completed" };
    expect(() => validateCarouselUpgradePhase({ componentRefinements: { ...previous.componentRefinements, carouselUpgrade: unchecked } }, previous, unchecked)).toThrow(/unchecked/);
  });
  it("allows only the precise AutoScroll addition and rejects core or unrelated dependency drift", () => {
    const old = { name: "@rain-next/ui", dependencies: { "embla-carousel-react": "8.5.2", react: "19.2.8" } };
    const next = { ...old, dependencies: { ...old.dependencies, "embla-carousel-auto-scroll": "8.5.2" } };
    expect(() => validateCarouselUpgradePackage(next, old)).not.toThrow();
    for (const dependencies of [{ ...next.dependencies, "embla-carousel-react": "8.6.0" }, { ...next.dependencies, vaul: "1.0.0" }]) expect(() => validateCarouselUpgradePackage({ ...next, dependencies }, old)).toThrow(/only/);
  });
  it("keeps the original lock and core resolution, admitting only the precise plugin blocks", () => {
    const current = readFileSync("pnpm-lock.yaml", "utf8"), before = readFileSync(carouselUpgradeEvidence + "before/pnpm-lock.yaml", "utf8");
    expect(() => validateCarouselUpgradeLock(current, before)).not.toThrow();
    expect(() => validateCarouselUpgradeLock(current.replace("embla-carousel: 8.5.2", "embla-carousel: 8.6.0"), before)).toThrow();
    expect(() => validateCarouselUpgradeLock(current + "\n# unrelated lock change\n", before)).toThrow(/unrelated/);
  });
  it("changes only the Carousel index row while preserving sibling rows and index instructions", () => {
    const before = "# Index\n| **Drawer** | old |\n| **Carousel** | old |\nend\n";
    expect(() => validateCarouselUpgradeIndex(before.replace("| **Carousel** | old |", "| **Carousel** | updated |"), before)).not.toThrow();
    expect(() => validateCarouselUpgradeIndex(before.replace("| **Carousel** | old |\n", ""), before)).not.toThrow();
    expect(() => validateCarouselUpgradeIndex(before.replace("| **Drawer** | old |", "| **Drawer** | changed |"), before)).toThrow(/sibling/);
    expect(() => validateCarouselUpgradeIndex(before + "| **Carousel** | duplicate |\n", before)).toThrow(/duplicate/);
  });
  it("binds only owned shared-file regions and keeps sibling mutations visible to original G6", () => {
    const before = readFileSync(carouselUpgradeEvidence + "before/" + carouselSharedSource, "utf8");
    const owned = carouselOwnedSource(readFileSync(carouselSharedSource, "utf8"), before);
    expect(carouselSharedPredecessor(owned, before)).toBe(before);
    const sibling = owned.replace("function DrawerPage() {", "function DrawerPage() { /* sibling drift */");
    expect(carouselOwnedSource(sibling, before)).toBe(owned);
    expect(carouselSharedPredecessor(sibling, before)).toBe(before.replace("function DrawerPage() {", "function DrawerPage() { /* sibling drift */"));
    const changedCarousel = owned.replace("function CarouselPage() {", "function CarouselPage() { /* Carousel drift */");
    expect(carouselOwnedSource(changedCarousel, before)).not.toBe(owned);
    expect(() => carouselOwnedSource(owned.replace("CarouselContent, CarouselControls,", "CarouselContent,"), before)).toThrow(/import/);
  });
  it("projects only Carousel registry, phase and guide changes while leaving sibling drift for G6", () => {
    for (const [path, own, undo, mutate] of [
      ["registry/g6-assets.json", carouselRegistryOwnedSource, carouselRegistryPredecessor, (source: string) => source.replace('"DrawerHeader",', '"DrawerHeader",\n        "UnapprovedDrawerPart",')],
      ["status/current-phase.yaml", carouselPhaseOwnedSource, carouselPhasePredecessor, (source: string) => source.replace("\ncomponentRefinements:\n", "\ncomponentRefinements:\n  unapprovedSibling:\n    status: \"unknown\"\n")],
      ["docs/ai/g6-components.md", carouselGuideOwnedSource, carouselGuidePredecessor, (source: string) => source.replace("可拖动课前任务抽屉", "未封存的抽屉变更")],
    ] as const) {
      const before = readFileSync(carouselUpgradeEvidence + "before/" + path, "utf8");
      const canonical = own(readFileSync(path, "utf8"), before);
      expect(undo(canonical, before), path).toBe(before);
      const sibling = mutate(canonical);
      expect(own(sibling, before), path).toBe(canonical);
      expect(undo(sibling, before), path).not.toBe(before);
    }
  });
  it("preserves a final Carousel phase entry before the next root and never truncates lifecycle at comments", () => {
    for (const tail of ['localExperiments:\n  retained: "yes"\n', ""]) {
      const before = 'schemaVersion: "1"\ncomponentRefinements:\n  g6Components:\n    status: "original"\n' + tail;
      const current = before.slice(0, before.length - tail.length) + '  carouselUpgrade:\n    status: "owned"\n' + tail;
      const canonical = carouselPhaseOwnedSource(current, before);
      expect(carouselPhasePredecessor(current, before)).toBe(before);
      expect(carouselPhasePredecessor(canonical, before)).toBe(before);
      const parsed = parseYamlSubset(canonical) as { componentRefinements: { carouselUpgrade: { status: string } } };
      expect(parsed.componentRefinements.carouselUpgrade.status).toBe("owned");
    }
    const path = "status/current-phase.yaml", before = readFileSync(carouselUpgradeEvidence + "before/" + path, "utf8");
    const bound = carouselPhaseOwnedSource(readFileSync(path, "utf8"), before);
    const ownedStart = bound.indexOf("  carouselUpgrade:\n", bound.indexOf("\ncomponentRefinements:\n"));
    const current = bound.slice(0, ownedStart) + bound.slice(ownedStart).replace(/    implementation: "[^"\n]*"/, '    implementation: "in-progress"');
    const replaceOwned = (source: string, from: string, to: string) => source.slice(0, ownedStart) + source.slice(ownedStart).replace(from, to);
    const commented = replaceOwned(current, '    implementation: "in-progress"', '  # Lifecycle: keep these fields bound\n    implementation: "in-progress"');
    expect(commented).not.toBe(current);
    const canonical = carouselPhaseOwnedSource(commented, before), parsed = parseYamlSubset(canonical) as { componentRefinements: { carouselUpgrade: typeof entry } };
    expect(parsed.componentRefinements.carouselUpgrade.implementation).toBe("in-progress");
    const promoted = replaceOwned(commented, '    implementation: "in-progress"', '    implementation: "completed"');
    expect(carouselPhaseOwnedSource(promoted, before)).not.toBe(canonical);
    expect(() => validateCarouselUpgradePhase(parsed, parseYamlSubset(before), { ...parsed.componentRefinements.carouselUpgrade, implementation: "completed" })).toThrow(/bound owned phase/);
  });
  it("cannot use the Carousel registry update to change sibling assets or gates", () => {
    const carousel = { name: "carousel", exportNames: ["Carousel", "CarouselContent", "CarouselItem", "CarouselPrevious", "CarouselNext", "useCarousel"] };
    const old = { dependencies: { "embla-carousel-react": "8.5.2" }, humanGate: "awaiting_human", items: [carousel, { name: "drawer", files: ["drawer.tsx"] }] };
    const current = { ...old, dependencies: { ...old.dependencies, "embla-carousel-auto-scroll": "8.5.2" }, items: [{ ...carousel, exportNames: [...carousel.exportNames, "CarouselControls", "CarouselIndicators", "CarouselPlaybackControl"] }, old.items[1]] };
    expect(() => validateCarouselUpgradeRegistry(current, old)).not.toThrow();
    expect(() => validateCarouselUpgradeRegistry({ ...current, humanGate: "accepted" }, old)).toThrow(/another G6/);
    expect(() => validateCarouselUpgradeRegistry({ ...current, items: [current.items[0], { name: "drawer", files: ["changed.tsx"] }] }, old)).toThrow(/another G6/);
  });
});
