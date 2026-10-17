/// <reference path="../../../../../../tests/node-runtime.d.ts" />
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { afterEach, expect, test, vi } from "vitest";
import { chinaRegions, validateChinaRegions, getChinaRegion, getChinaLayerRegions, validateChinaGeometry, toChoroplethCollection, makeChinaStatistics, applyChinaStatistics, chinaIntensityColor, type ChinaCollection } from "./china-region-data";

const directory = resolve("apps/playground/src/docs/components/chart-business/data/china");
const read = (name: string) => JSON.parse(readFileSync(resolve(directory, name), "utf8")) as ChinaCollection;
const provinces = read("provinces.geojson"), cities = read("cities-hdx.geojson"), counties = read("counties-osm.geojson");
const { geoArea } = createRequire(resolve("packages/ui/package.json"))("d3-geo") as { geoArea: (feature: ChinaCollection["features"][number]) => number };
afterEach(() => vi.unstubAllGlobals());

test("399 fixed regions have all real source geometry, hashes and correct available map parents", () => {
  expect(() => validateChinaRegions(chinaRegions)).not.toThrow();
  expect(chinaRegions).toHaveLength(399);
  expect(chinaRegions.filter(r => r.level === "province")).toHaveLength(34);
  expect(chinaRegions.filter(r => r.level === "prefecture")).toHaveLength(333);
  expect(chinaRegions.filter(r => r.level === "county")).toHaveLength(32);
  for (const collection of [provinces, cities, counties]) {
    const ids = new Set(collection.features.map(f => f.properties.id));
    expect(() => validateChinaGeometry(collection, chinaRegions.filter(r => ids.has(r.id)))).not.toThrow();
  }
  const source = JSON.parse(readFileSync(resolve(directory, "sources.json"), "utf8"));
  for (const file of source.files) expect(createHash("sha256").update(readFileSync(resolve(directory, file.path))).digest("hex")).toBe(file.sha256);
  expect(getChinaLayerRegions("440000")).toHaveLength(21);
  expect(getChinaLayerRegions("460000")).toHaveLength(19);
  expect(getChinaLayerRegions("650000")).toHaveLength(26);
});

test("municipal and special branches do not invent a prefecture or administrative absence", () => {
  expect(getChinaRegion("110000").branch).toBe("municipality");
  expect(getChinaLayerRegions("110000")).toEqual([]);
  expect(getChinaRegion("710000").branch).toBe("province-only-source");
  expect(getChinaLayerRegions("710000")).toEqual([]);
  expect(() => getChinaRegion("110100")).toThrow();
  expect(() => getChinaLayerRegions("999999")).toThrow();
});

test.each(["duplicate", "unknown-parent", "false-children", "empty-name"])("region boundary rejects %s", kind => {
  const rows = structuredClone(chinaRegions);
  if (kind === "duplicate") rows[1]!.id = rows[0]!.id;
  if (kind === "unknown-parent") rows.find(r => r.level === "prefecture")!.parentId = "999999";
  if (kind === "false-children") rows.find(r => r.id === "440000")!.hasChildren = false;
  if (kind === "empty-name") rows[0]!.name = " ";
  expect(() => validateChinaRegions(rows)).toThrow();
});

test.each(["duplicate", "unknown-id", "missing", "bad-parent", "nonfinite", "unclosed"])("geometry boundary rejects %s", kind => {
  const input = structuredClone(provinces);
  if (kind === "duplicate") input.features[1] = input.features[0]!;
  if (kind === "unknown-id") input.features[0]!.properties.id = "999999";
  if (kind === "missing") input.features.pop();
  if (kind === "bad-parent") input.features[0]!.properties.parentId = "440000";
  const geometry = input.features[0]!.geometry;
  if (geometry.type !== "MultiPolygon") throw new Error("Unexpected source type");
  if (kind === "nonfinite") geometry.coordinates[0]![0]![0]![0] = NaN;
  if (kind === "unclosed") geometry.coordinates[0]![0]!.pop();
  expect(() => validateChinaGeometry(input, chinaRegions.filter(r => r.level === "province"))).toThrow();
});

test("all 399 RFC geometries become finite local d3 areas without mutating sources or dropping six holes", () => {
  const all = { type: "FeatureCollection" as const, features: [...provinces.features, ...cities.features, ...counties.features] };
  const before = JSON.stringify(all), adapted = toChoroplethCollection(all);
  expect(adapted.features).toHaveLength(399);
  for (const feature of adapted.features) { expect(geoArea(feature)).toBeGreaterThan(0); expect(geoArea(feature)).toBeLessThan(2 * Math.PI); }
  const holes = (data: ChinaCollection) => data.features.reduce((count, f) => count + (f.geometry.type === "MultiPolygon" ? f.geometry.coordinates.reduce((n, p) => n + p.length - 1, 0) : 0), 0);
  expect(holes(adapted)).toBe(6);
  expect(JSON.stringify(all)).toBe(before);
});

test("exact statistics preserve zero/null/absent, report unmatched IDs and leave input intact", () => {
  const original = JSON.stringify(provinces);
  const rows = [{ id: "110000", value: 0 }, { id: "120000", value: null }, { id: "999999", value: 17 }];
  const result = applyChinaStatistics(provinces, rows);
  expect(result.data.features.find(f => f.properties.id === "110000")!.properties.value).toBe(0);
  expect(result.data.features.find(f => f.properties.id === "120000")!.properties.value).toBeNull();
  expect(result.data.features.find(f => f.properties.id === "130000")!.properties.value).toBeNull();
  expect(result.unmatched).toEqual([{ id: "999999", value: 17 }]);
  expect(JSON.stringify(provinces)).toBe(original);
});

test.each([NaN, Infinity, -1])("statistics boundary rejects %s", value => {
  expect(() => applyChinaStatistics(provinces, [{ id: "110000", value }])).toThrow();
});
test("statistics reject duplicate identities rather than overwrite or sum", () => {
  expect(() => applyChinaStatistics(provinces, [{ id: "110000", value: 1 }, { id: "110000", value: 2 }])).toThrow();
});
test("same-layer mocks stay identified on update; zero and missing are distinct", () => {
  expect(makeChinaStatistics("440000", "zero").every(r => r.value === 0)).toBe(true);
  expect(makeChinaStatistics("440000", "missing").every(r => r.value === null)).toBe(true);
  expect(makeChinaStatistics("440000", "normal", 0).map(r => r.id)).toEqual(makeChinaStatistics("440000", "normal", 1).map(r => r.id));
  expect(makeChinaStatistics("440000", "normal", 0).at(-1)?.value).not.toBe(makeChinaStatistics("440000", "normal", 1).at(-1)?.value);
  expect(chinaIntensityColor(0, 0)).toBe("var(--chart-scale-01)");
  expect(chinaIntensityColor(null, 0)).toBe("var(--chart-no-data)");
});

test("a failed actual geometry request can retry and is not cached as a permanent failure", async () => {
  vi.resetModules();
  const fetcher = vi.fn().mockResolvedValueOnce({ ok: false, status: 503 }).mockResolvedValue({ ok: true, json: async () => provinces });
  vi.stubGlobal("fetch", fetcher);
  const { loadChinaLayer } = await import("./china-region-data");
  await expect(loadChinaLayer(null)).rejects.toThrow();
  await expect(loadChinaLayer(null)).resolves.toHaveProperty("features.length", 34);
  expect(fetcher).toHaveBeenCalledTimes(2);
});

test("all province city layers can traverse the fixed dataset; loader refuses missing geometry and unknown parent", async () => {
  vi.resetModules();
  vi.stubGlobal("fetch", vi.fn(async (url: URL) => ({ ok: true, json: async () => String(url).includes("cities-hdx") ? cities : String(url).includes("counties-osm") ? counties : provinces })));
  const { loadChinaLayer } = await import("./china-region-data");
  for (const region of chinaRegions.filter(r => r.hasChildren)) expect((await loadChinaLayer(region.id)).features).toHaveLength(getChinaLayerRegions(region.id).length);
  await expect(loadChinaLayer("999999")).rejects.toThrow();
  vi.resetModules();
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => ({ ...provinces, features: provinces.features.slice(1) }) })));
  const fresh = await import("./china-region-data");
  await expect(fresh.loadChinaLayer(null)).rejects.toThrow();
});
