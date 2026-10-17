import type { FeatureCollection, Geometry } from "geojson";
import type { ChoroplethFeatureProperties } from "@rain-next/ui/charts";
import rawRegions from "./data/china/regions.json";

export type ChinaDataState = "normal" | "zero" | "missing" | "invalid" | "unmatched" | "load-error";
export type ChinaRegion = { id: string; name: string; parentId: string | null; level: "province" | "prefecture" | "county"; branch: string; hasChildren: boolean; geometrySource: "hdx" | "osm" };
export type ChinaCollection = FeatureCollection<Geometry, ChoroplethFeatureProperties>;
export type ChinaStatistic = { id: string; value: number | null };
export const chinaRegions = rawRegions as readonly ChinaRegion[];
export function validateChinaRegions(regions: readonly ChinaRegion[]) {
  const ids = new Map(regions.map(region => [region.id, region]));
  if (ids.size !== regions.length || regions.length !== 399) throw new Error("地区清单缺失或身份重复");
  for (const region of regions) {
    if (!/^\d{6}$/.test(region.id) || !region.name.trim() || !["hdx", "osm"].includes(region.geometrySource)) throw new Error("地区身份或来源无效");
    if (region.level === "province") {
      if (region.parentId !== null || !["ordinary-province", "municipality", "province-only-source"].includes(region.branch)) throw new Error("省级分支无效");
    } else if (!["prefecture", "county"].includes(region.level) || !region.parentId || ids.get(region.parentId)?.level !== "province") throw new Error("地区父级无效");
    if (region.hasChildren !== regions.some(child => child.parentId === region.id)) throw new Error("可用地图子级与清单不一致");
  }
  for (const [level, count] of [["province", 34], ["prefecture", 333], ["county", 32]] as const) {
    if (regions.filter(region => region.level === level).length !== count) throw new Error("地区层级覆盖不完整");
  }
}
validateChinaRegions(chinaRegions);

export function getChinaRegion(id: string): ChinaRegion {
  const region = chinaRegions.find(row => row.id === id);
  if (!region) throw new Error(`未知地区：${id}`);
  return region;
}
export function getChinaLayerRegions(parentId: string | null): readonly ChinaRegion[] {
  if (parentId !== null && getChinaRegion(parentId).level !== "province") throw new Error("仅支持省级地图下钻");
  return chinaRegions.filter(region => region.parentId === parentId);
}
export function validateChinaGeometry(collection: ChinaCollection, expected: readonly ChinaRegion[]) {
  if (collection?.type !== "FeatureCollection" || !Array.isArray(collection.features) || collection.features.length !== expected.length) throw new Error("边界覆盖不完整");
  const regions = new Map(expected.map(region => [region.id, region])), seen = new Set<string>();
  for (const feature of collection.features) {
    const id = feature?.properties?.id;
    const region = typeof id === "string" ? regions.get(id) : undefined;
    if (!region || seen.has(region.id) || feature.type !== "Feature" || feature.id !== id || feature.properties.name !== region.name || feature.properties.parentId !== region.parentId || feature.properties.level !== region.level || feature.properties.geometrySource !== region.geometrySource) throw new Error("边界身份与地区清单不一致");
    seen.add(region.id);
    const geometry = feature.geometry;
    if (!geometry || !["Polygon", "MultiPolygon"].includes(geometry.type)) throw new Error("仅接受真实面边界");
    const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.type === "MultiPolygon" ? geometry.coordinates : [];
    if (!polygons.length) throw new Error("地区边界为空");
    for (const polygon of polygons) {
      if (!Array.isArray(polygon) || !polygon.length) throw new Error("地区边界为空");
      for (const ring of polygon) {
        if (!Array.isArray(ring) || ring.length < 4) throw new Error("边界环不完整");
        for (const point of ring) if (!Array.isArray(point) || point.length !== 2 || !point.every(Number.isFinite) || Math.abs(point[0]!) > 180 || Math.abs(point[1]!) > 90) throw new Error("边界坐标无效");
        if (ring[0]![0] !== ring.at(-1)![0] || ring[0]![1] !== ring.at(-1)![1]) throw new Error("边界环未闭合");
      }
    }
  }
}
export function toChoroplethCollection(collection: ChinaCollection): ChinaCollection {
  // d3 uses the opposite ring winding to RFC 7946; keep licensed source files unchanged.
  const reverse = (polygon: number[][][]) => polygon.map(ring => ring.map(point => [...point]).reverse());
  return { ...collection, features: collection.features.map(feature => {
    const geometry = feature.geometry;
    if (geometry.type !== "Polygon" && geometry.type !== "MultiPolygon") throw new Error("仅接受真实面边界");
    return { ...feature, properties: { ...feature.properties }, geometry: geometry.type === "Polygon" ? { ...geometry, coordinates: reverse(geometry.coordinates) } : { ...geometry, coordinates: geometry.coordinates.map(reverse) } };
  }) };
}

const geometryFiles = {
  provinces: new URL("./data/china/provinces.geojson", import.meta.url),
  cities: new URL("./data/china/cities-hdx.geojson", import.meta.url),
  counties: new URL("./data/china/counties-osm.geojson", import.meta.url),
};
const geometryRequests = new Map<string, Promise<ChinaCollection>>();
function fetchGeometry(url: URL, expected: readonly ChinaRegion[]) {
  const key = String(url), cached = geometryRequests.get(key);
  if (cached) return cached;
  const request = (async () => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`边界加载失败（${response.status}）`);
    const collection: ChinaCollection = await response.json();
    validateChinaGeometry(collection, expected);
    return collection;
  })().catch(error => { geometryRequests.delete(key); throw error; });
  geometryRequests.set(key, request);
  return request;
}
export async function loadChinaLayer(parentId: string | null): Promise<ChinaCollection> {
  const regions = getChinaLayerRegions(parentId);
  if (!regions.length) return { type: "FeatureCollection", features: [] };
  const sources = parentId === null
    ? [await fetchGeometry(geometryFiles.provinces, getChinaLayerRegions(null))]
    : await Promise.all([
      fetchGeometry(geometryFiles.cities, chinaRegions.filter(region => region.level !== "province" && region.geometrySource === "hdx")),
      fetchGeometry(geometryFiles.counties, chinaRegions.filter(region => region.geometrySource === "osm")),
    ]);
  return toChoroplethCollection({ type: "FeatureCollection", features: sources.flatMap(source => source.features).filter(feature => feature.properties.parentId === parentId) });
}
export function makeChinaStatistics(parentId: string | null, state: ChinaDataState, revision = 0): ChinaStatistic[] {
  const rows = getChinaLayerRegions(parentId).map((region, index) => ({ id: region.id, value: state === "missing" ? null : state === "zero" || index === 0 ? 0 : index === 1 ? null : 20 + index * 7 + revision * 3 }));
  if (state === "invalid" && rows[0]) rows[0].value = NaN;
  if (state === "unmatched") rows.push({ id: "999999", value: 17 });
  return rows;
}
export function applyChinaStatistics(collection: ChinaCollection, statistics: readonly ChinaStatistic[]): { data: ChinaCollection; unmatched: ChinaStatistic[] } {
  const values = new Map<string, number | null>();
  for (const row of statistics) {
    if (!/^\d{6}$/.test(row.id) || values.has(row.id) || row.value !== null && (!Number.isFinite(row.value) || row.value < 0)) throw new Error("统计身份重复或数值无效");
    values.set(row.id, row.value);
  }
  const ids = new Set(collection.features.map(feature => feature.properties.id));
  return { data: { ...collection, features: collection.features.map(feature => ({ ...feature, properties: { ...feature.properties, value: values.get(String(feature.properties.id)) ?? null } })) }, unmatched: statistics.filter(row => !ids.has(row.id)) };
}
export function chinaIntensityColor(value: number | null | undefined, max: number): string {
  if (value == null) return "var(--chart-no-data)";
  const step = value === 0 ? 1 : Math.max(1, Math.min(5, Math.ceil(value / max * 4) + 1));
  return `var(--chart-scale-0${step})`;
}
