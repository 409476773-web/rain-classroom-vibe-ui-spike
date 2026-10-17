import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { hasDropdownFamilyAuthorization, hasDropdownSelectionVisualReuseAuthorization, isDropdownFamilyImport, getValidatedTailwindB2History, parseYamlSubset } from "./verification-helpers.mjs";
import { getTokenFoundationOutputs, getDropdownFamilyColorConsumers } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";
import { validateDropdownFamilyManifest, validateDropdownFamilyRegistry, validateCheckboxCssExceptions, validateRadioCssExceptions } from "./verify-tailwind-b2.mjs";

const phase = (): any => parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8"));
const publicCssPath = "packages/ui/src/dropdown-menu/dropdown-menu.css";
const publicCss = readFileSync(publicCssPath, "utf8");

describe("Dropdown family candidate governance", () => {
  it("requires the exact new visual-reuse scope without extending existing Human Gates", () => {
    const status = phase();
    expect(hasDropdownSelectionVisualReuseAuthorization(status)).toBe(true);
    for (const change of [{ humanGateDecision: undefined }, { contrastAcceptance: "accepted" }, { scope: "all-choice-control-behavior" }]) {
      const changed = structuredClone(status); Object.assign(changed.componentRefinements.dropdownFamily.selectionVisualReuse, change);
      expect(hasDropdownSelectionVisualReuseAuthorization(changed)).toBe(false);
      expect(() => getValidatedTailwindB2History(changed)).toThrow();
    }
    delete status.componentRefinements.dropdownFamily.selectionVisualReuse;
    expect(hasDropdownFamilyAuthorization(status)).toBe(true);
    expect(hasDropdownSelectionVisualReuseAuthorization(status)).toBe(false);
    const contract = parseYamlSubset(readFileSync("manifests/contracts/tailwind-b2.yaml", "utf8"));
    const source = readFileSync("packages/ui/src/styles.css", "utf8");
    for (const validate of [validateCheckboxCssExceptions, validateRadioCssExceptions]) {
      expect(validate({ contract, source, menuVisualReuse: true })).toEqual([]);
      expect(validate({ contract, source, menuVisualReuse: false })).not.toEqual([]);
    }
  });
  it("adds only its exact authorization while retaining frozen history and independent Gates", () => {
    const status = phase();
    expect(hasDropdownFamilyAuthorization(status)).toBe(true);
    expect(() => getValidatedTailwindB2History(status)).not.toThrow();
    for (const change of [{ humanGateDecision: undefined }, { contrastAcceptance: "accepted" }, { scope: "all-overlays" }]) {
      const changed = structuredClone(status); Object.assign(changed.componentRefinements.dropdownFamily, change);
      expect(hasDropdownFamilyAuthorization(changed)).toBe(false);
      expect(() => getValidatedTailwindB2History(changed)).toThrow();
    }
    delete status.componentRefinements.dropdownFamily;
    expect(hasDropdownFamilyAuthorization(status)).toBe(false);
    expect(() => getValidatedTailwindB2History(status)).not.toThrow();
  });

  it("permits only Menu, Popover and the exact Dialog recipe caller", () => {
    expect(isDropdownFamilyImport("packages/ui/src/dropdown-menu/dropdown-menu.tsx", "@base-ui/react/menu")).toBe(true);
    expect(isDropdownFamilyImport("packages/ui/src/popover/popover.tsx", "@base-ui/react/popover")).toBe(true);
    expect(isDropdownFamilyImport("apps/playground/src/docs/components/dropdown-page.tsx", "@base-ui/react/dialog")).toBe(true);
    expect(isDropdownFamilyImport("packages/ui/src/select/select.tsx", "@base-ui/react/menu")).toBe(false);
    expect(isDropdownFamilyImport("packages/ui/src/dropdown-menu/dropdown-menu.tsx", "@base-ui/react/dialog")).toBe(false);
    expect(isDropdownFamilyImport("apps/playground/src/docs/components/dropdown-page.tsx", "@base-ui/react/menu")).toBe(false);
  });

  it("keeps actual sources as unpublished candidates and rejects maturity or source graph escalation", () => {
    for (const name of ["dropdown-menu", "popover"]) {
      const manifest = parseYamlSubset(readFileSync(`manifests/ui/${name}.yaml`, "utf8"));
      const args = { manifest, name, review: phase().componentRefinements.dropdownFamily };
      expect(validateDropdownFamilyManifest(args)).toEqual([]);
      expect(validateDropdownFamilyManifest({ ...args, manifest: { ...manifest, maturity: "system-approved" } })).not.toEqual([]);
    }
    const registry = JSON.parse(readFileSync("registry/dropdown-family.json", "utf8"));
    expect(validateDropdownFamilyRegistry(registry, { humanGate: "accepted" })).toEqual([]);
    expect(validateDropdownFamilyRegistry({ ...registry, publication: "published" }, { humanGate: "accepted" })).not.toEqual([]);
    registry.shared.files.push("packages/ui/src/select/select.tsx");
    expect(validateDropdownFamilyRegistry(registry, { humanGate: "accepted" })).not.toEqual([]);
  });

  it("records real contrast and weak-interactive findings without accepting exceptions", () => {
    const descriptions = getDropdownFamilyColorConsumers();
    expect(descriptions.find(entry => entry.selector === '.rain-menu-item:where(:not([data-tone="danger"]):not([data-disabled])) [data-slot="description"]'))
      .toMatchObject({ use: { tokenId: "Text/Neutral/3", content: "text" }, parentSurfaces: ["Background/Neutral/1", "Fill/Neutral/Alpha/6", "Fill/Neutral/Alpha/5"] });
    expect(descriptions.find(entry => entry.selector === '.rain-menu-item:where([data-tone="danger"], [data-disabled]) [data-slot="description"]'))
      .toMatchObject({ use: { tokenId: "Text/Neutral/4", content: "text" }, parentSurfaces: ["Background/Neutral/1", "Fill/Red/Alpha/2", "Fill/Red/Alpha/1"] });
    const contrast: Array<{ actual: number; minimum: number; acceptedException: boolean }> = [], eligibility: unknown[] = [];
    for (const filePath of new Set(getDropdownFamilyColorConsumers().map(entry => entry.filePath))) {
      expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8"), pendingContrastFindings: contrast, pendingEligibilityFindings: eligibility })).toEqual([]);
    }
    expect(contrast.length).toBeGreaterThan(0); expect(eligibility.length).toBeGreaterThan(0);
    expect(contrast.every(finding => !finding.acceptedException && finding.actual < finding.minimum && [3, 4.5].includes(finding.minimum))).toBe(true);
  });

  it("rejects missing or weakened color metadata and new unregistered paints", () => {
    const outputs = getTokenFoundationOutputs();
    const missing = { ...outputs, colorCssConsumers: outputs.colorCssConsumers.filter(entry => !(entry.filePath === publicCssPath && entry.use.recipeId === "menu-public-description")) };
    expect(validateRegisteredRecipeColors({ filePath: publicCssPath, source: publicCss, outputs: missing })).not.toEqual([]);
    const weakened = structuredClone(outputs);
    weakened.colorCssConsumers.find(entry => entry.filePath === publicCssPath && entry.use.recipeId === "menu-public-description")!.use.content = "decorative";
    expect(validateRegisteredRecipeColors({ filePath: publicCssPath, source: publicCss, outputs: weakened })).not.toEqual([]);
    expect(validateRegisteredRecipeColors({ filePath: publicCssPath, source: `${publicCss}\n.rain-menu-item { color: red; }` })).not.toEqual([]);
  });

  it.each(['@layer probe;', '@import "./unregistered.css";'])("fails closed on unsupported CSS before unregistered paint: %s", statement => {
    expect(validateRegisteredRecipeColors({ filePath: publicCssPath, source: `${publicCss}\n${statement}\n.probe { color: red; }` })).not.toEqual([]);
  });
});
