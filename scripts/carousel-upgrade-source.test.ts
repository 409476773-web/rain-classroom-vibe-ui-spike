import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { expect, it } from "vitest";
import { carouselUpgradeEvidence, carouselUpgradeFiles, carouselSharedSource, carouselBindingBytes, carouselSourceMode, sha256 } from "./carousel-upgrade-governance.mjs";
import { bindCarouselUpgrade } from "./bind-carousel-upgrade.mjs";
import { copyDatePickerCloseoutFixture } from "./select-unification-test-fixture";

it("verifies the finite successor through original G6 and rejects source, scope, prior-proof and sibling drift", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-carousel-successor-"));
  const put = (path: string, value: string | Buffer) => { mkdirSync(dirname(join(root, path)), { recursive: true }); writeFileSync(join(root, path), value); };
  const predecessor = "evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/predecessor/";
  const carouselView = predecessor + "evidence/runtime/drawer-refinement-2026-10-14/predecessor/";
  const copy = (path: string) => {
    const source = [carouselView + path, predecessor + path, path].find(candidate => existsSync(candidate));
    if (!source) throw new Error("Carousel fixture lacks its historical source: " + path);
    put(path, readFileSync(source));
  };
  const g6 = "evidence/runtime/g6-components-2026-10-14/";
  try {
    copyDatePickerCloseoutFixture(copy, true, false);
    const baseline = JSON.parse(readFileSync(g6 + "baseline.json", "utf8"));
    for (const path of [g6 + "baseline.json", g6 + "source-bindings.json", g6 + "source-lock.json", g6 + "color-consumers.json", ...Object.keys(baseline.protectedSources), ...Object.keys(baseline.retainedEvidence),
      ...Object.keys(baseline.files).filter(path => existsSync(path)), ...Object.entries(baseline.files).filter(([, hash]) => hash !== null).map(([path]) => g6 + "before/" + path)]) copy(path);
    for (const path of carouselUpgradeFiles) {
      copy(path);
      if (existsSync(carouselUpgradeEvidence + "before/" + path)) copy(carouselUpgradeEvidence + "before/" + path);
    }
    for (const name of ["authorization.json", "design-lineage.json"]) copy(carouselUpgradeEvidence + name);
    const lineage = JSON.parse(readFileSync(carouselUpgradeEvidence + "design-lineage.json", "utf8"));
    for (const path of Object.keys(lineage.sourceFiles)) copy(path);
    // Independently edited siblings are restored only inside this historical test fixture.
    // The live G6 verifier must continue rejecting their unsealed current bytes.
    const originalG6 = JSON.parse(readFileSync(g6 + "source-bindings.json", "utf8")).sourceFiles;
    const siblingPredecessors: Record<string, string> = {
      ...Object.fromEntries(["css", "tsx", "test.tsx"].map(ext => [`apps/playground/src/docs/components/g6-conversation-pages.${ext}`, `evidence/runtime/g6-doc-refinement-2026-10-14/before/g6-conversation-pages.${ext}`])),
      ...Object.fromEntries(["css", "tsx"].map(ext => [`packages/ui/src/drawer/drawer.${ext}`, `evidence/runtime/drawer-refinement-2026-10-14/before/packages/ui/src/drawer/drawer.${ext}`])),
      ...Object.fromEntries(["css", "test.tsx"].map(ext => [`apps/playground/src/docs/components/g6-interaction-pages.${ext}`, carouselUpgradeEvidence + `before/apps/playground/src/docs/components/g6-interaction-pages.${ext}`])),
    };
    for (const [path, snapshot] of Object.entries(siblingPredecessors)) {
      const original = readFileSync(snapshot); expect(sha256(original)).toBe(originalG6[path].after); put(path, original);
    }
    // Restore later sibling-only documentation/contracts in the temporary historical
    // fixture only when their stored bytes equal the original sealed G6 hash exactly.
    for (const [path, binding] of Object.entries(originalG6) as [string, { after: string | null }][]) {
      if (carouselUpgradeFiles.includes(path) || !binding.after) continue;
      const candidate = "evidence/runtime/drawer-refinement-2026-10-14/before/" + path;
      if (existsSync(candidate) && sha256(readFileSync(candidate)) === binding.after) put(path, readFileSync(candidate));
    }
    for (const path of carouselUpgradeFiles) if (carouselSourceMode(path) !== "whole-file") {
      put(path, carouselBindingBytes(root, path, carouselUpgradeEvidence + "before/" + path));
    }
    bindCarouselUpgrade(root);
    const verify = () => {
      const result = spawnSync(process.execPath, ["--input-type=module", "-e",
        'const m=await import(process.argv[1]);try{const r=m.getG6SourceBindings(process.argv[2]);const fs=await import("node:fs");const current=m.parseYamlSubset(fs.readFileSync(process.argv[2]+"/status/current-phase.yaml","utf8"));const s=m.getSliderCloseoutSourceBindings(process.argv[2],current);const before=m.parseYamlSubset(fs.readFileSync(process.argv[2]+"/evidence/runtime/slider-closeout-2026-10-13/before/status/current-phase.yaml","utf8"));m.restoreSliderCloseoutPhase(s,current,before);if(current.componentRefinements.carouselUpgrade)throw new Error("Carousel phase was not projected through Slider closeout");console.log(JSON.stringify({scope:r.carouselUpgrade.scope,sourceCount:Object.keys(r.carouselUpgrade.sourceFiles).length,sliderCarouselScope:s.carouselSuccessor.scope}));}catch(e){console.log(JSON.stringify({error:e.message}));}',
        new URL("file://" + join(root, "scripts/verification-helpers.mjs")).href, root], { encoding: "utf8" });
      expect(result.status, result.stderr).toBe(0);
      return JSON.parse(result.stdout);
    };
    expect(verify()).toEqual({ scope: "carousel-v04-public-upgrade", sourceCount: carouselUpgradeFiles.length, sliderCarouselScope: "carousel-v04-public-upgrade" });
    for (const path of ["packages/ui/src/carousel/carousel.css", "packages/ui/src/drawer/drawer.tsx", carouselSharedSource, "apps/playground/src/docs/components/g6-interaction-pages.css", "apps/playground/src/docs/components/g6-interaction-pages.test.tsx", g6 + "color-consumers.json", carouselUpgradeEvidence + "before/packages/ui/src/carousel/carousel.tsx", "apps/prototype/src/carousel-study/study.css"]) {
      const original = readFileSync(join(root, path)); put(path, original.toString() + "\n/* unauthorized drift */\n");
      expect(verify().error, path).toMatch(/changed|source|snapshot|proof/); put(path, original);
    }
    for (const [path, mutate] of [
      ["registry/g6-assets.json", (source: string) => { const registry = JSON.parse(source); registry.items.find((item: any) => item.name === "drawer").exportNames.push("UnapprovedDrawerPart"); return JSON.stringify(registry, null, 2) + "\n"; }],
      ["status/current-phase.yaml", (source: string) => source.replace("\ncomponentRefinements:\n", "\ncomponentRefinements:\n  unapprovedSibling:\n    status: \"unknown\"\n")],
      ["docs/ai/g6-components.md", (source: string) => source.replace("可拖动课前任务抽屉", "未封存的抽屉变更")],
    ] as const) {
      const original = readFileSync(join(root, path), "utf8"); put(path, mutate(original));
      expect(verify().error, path).toMatch(/source|previous phase/); put(path, original);
    }
    const path = carouselUpgradeEvidence + "source-bindings.json", original = readFileSync(join(root, path));
    const bindings = JSON.parse(original.toString()); bindings.sourceFiles["packages/ui/src/drawer/unapproved.tsx"] = { before: null, beforeSnapshot: null, after: "unapproved" };
    put(path, JSON.stringify(bindings)); expect(verify().error).toMatch(/finite/); put(path, original);
    expect(verify().scope).toBe("carousel-v04-public-upgrade");
  } finally { rmSync(root, { recursive: true, force: true }); }
}, 30_000);
