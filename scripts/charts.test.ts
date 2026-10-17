import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, dirname } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";
import { validateAsset } from "./asset-index.mjs";
import { parseYamlSubset } from "./verification-helpers.mjs";
import { CHART_ENTRIES } from "../apps/playground/src/docs/components/chart-catalog";
import { runCatalogDataChecks, makeFlow } from "../apps/playground/src/docs/components/chart-data";
import { rainChartRecipes } from "../packages/ui/src/charts/recipes";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const registry = JSON.parse(read("registry/charts.json"));
const lock = JSON.parse(read(registry.sourceLock));

test("19 discoverable chart entries preserve the original families and local additions", () => {
  expect(registry.items).toHaveLength(19);
  expect(new Set(CHART_ENTRIES.map(entry => entry.id)).size).toBe(19);
  expect(CHART_ENTRIES.filter(entry => entry.origin === "rain").map(entry => entry.id)).toEqual(["matrix", "network"]);
  for (const entry of CHART_ENTRIES) {
    const item = registry.items.find((candidate: {name:string}) => candidate.name === `chart-${entry.id}`);
    expect(item, entry.id).toBeDefined();
    const manifest = parseYamlSubset(read(item.manifest)) as Record<string, unknown>;
    validateAsset({ manifest, item, registry }, root);
    expect(manifest.assetIdentity).toBe("registry-candidate");
    expect(manifest.publication).toBe("unpublished");
    expect(entry.sourcePath, entry.id).toBe(manifest.sourcePath);
    expect(existsSync(resolve(root, entry.sourcePath)), entry.id).toBe(true);
    expect(entry.recipes).toContain(entry.defaultRecipe);
    for (const recipe of entry.recipes) expect(recipe in rainChartRecipes).toBe(true);
  }
});

test("fixed native source hashes and relative dependency closure are complete", () => {
  expect(lock.commit).toBe("5d699897b2dde26374cf15501dbaadbc52cea982");
  const vendor = dirname(resolve(root, registry.sourceLock));
  const locked = lock.files.map((file: { localPath: string }) => file.localPath).sort();
  const disk = readdirSync(vendor, { recursive: true }).map(String).filter(path => /\.tsx?$/.test(path)).sort();
  expect(new Set(locked).size).toBe(locked.length);
  expect(locked).toEqual(disk);
  const registered = [...new Set<string>([...registry.shared.files, ...registry.items.flatMap((item: { files: string[] }) => item.files)])]
    .filter(path => path.startsWith("packages/ui/src/charts/vendor/") && /\.tsx?$/.test(path))
    .map(path => path.slice("packages/ui/src/charts/vendor/".length)).sort();
  expect(registered).toEqual(locked);
  for (const file of lock.files) {
    const path = resolve(vendor, file.localPath);
    const source = readFileSync(path, "utf8");
    expect(createHash("sha256").update(source).digest("hex"), file.localPath).toBe(file.localSha256);
    expect(source).not.toMatch(/(?:apps\/(?:prototype|playground)|@\/)/);
    for (const [, specifier] of source.matchAll(/(?:from\s+|import\s*)["'](\.[^"']+)["']/g)) {
      const dependency = resolve(dirname(path), specifier!);
      expect(["", ".ts", ".tsx", "/index.ts", "/index.tsx"].some(ext => existsSync(dependency + ext)), `${file.localPath}: ${specifier}`).toBe(true);
    }
  }
  expect(read("packages/ui/src/charts/vendor/LICENSE")).toContain("MIT License");
});

test("170 fixed source IDs preserve family counts and all 17 existing entry mappings", () => {
  const reference = JSON.parse(read("apps/playground/src/docs/components/chart-variants/reference.json"));
  expect(reference).toHaveLength(170);
  expect(new Set(reference.map((item: { id: string }) => item.id)).size).toBe(170);
  const counts: Record<string, number> = {};
  for (const item of reference) {
    counts[item.family] = (counts[item.family] ?? 0) + 1;
    expect(CHART_ENTRIES.some(entry => entry.id === item.chartId), item.id).toBe(true);
    expect(item.sourceId).toBe(item.id);
  }
  expect(counts).toEqual({ area: 19, bar: 21, line: 19, "live-line": 9, pie: 9, radar: 6, ring: 6, scatter: 10, candlestick: 11, choropleth: 5, composed: 14, funnel: 9, gauge: 13, heatmap: 11, sankey: 5, sunburst: 3 });
  expect(new Set(reference.map((item: { chartId: string }) => item.chartId)).size).toBe(17);
});

test("compiled utilities stay inside chart hosts and no global token is declared", () => {
  const postcss = createRequire(import.meta.resolve("vite"))("postcss");
  for (const path of ["packages/ui/src/charts/styles.css", "packages/ui/src/charts/utilities.generated.css"]) {
    const css = postcss.parse(read(path));
    css.walkRules((rule: { selector:string; selectors:string[]; parent?: {type:string; name?:string} }) => {
      if (rule.parent?.type === "atrule" && /keyframes$/.test(rule.parent.name ?? "")) return;
      for (const selector of rule.selectors) expect(selector.trim()).toMatch(/^(?:\.rain-chart|:where\(\.rain-chart\)|&)/);
    });
    expect(read(path)).not.toMatch(/:root|:host|@property/);
  }
});

test("example trust boundaries reject invalid values and the single-flow recipe is minimal", () => {
  runCatalogDataChecks();
  const single = makeFlow(0, "single");
  expect(single.nodes).toHaveLength(2); expect(single.links).toHaveLength(1);
  expect(single.links[0]).toEqual({ source: 0, target: 1, value: 420 });
});
