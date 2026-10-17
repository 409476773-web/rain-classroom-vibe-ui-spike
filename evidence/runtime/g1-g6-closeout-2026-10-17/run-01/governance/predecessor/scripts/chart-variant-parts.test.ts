import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ChartContextValue } from "../packages/ui/src/charts";
import { expect, test } from "vitest";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const vendor = "packages/ui/src/charts/vendor/";
const additions = [
  "background.tsx", "reference-area.tsx", "bar-depth.tsx", "bar-squares.tsx",
  "chart-brush.tsx", "chart-brush-handle.tsx", "chart-brush-layout.tsx",
  "chart-brush-selection-overlay.tsx", "chart-brush-track-overlay.tsx",
  "projection-line.tsx", "projection-line-end-marker.tsx",
  "line-series-terminal-marker.tsx", "markers/index.ts",
  "markers/chart-markers.tsx", "markers/marker-group.tsx", "segment.tsx",
];

test("the 16 required native chart parts have fixed-source hashes and Registry membership", () => {
  const lock = JSON.parse(read(`${vendor}source-lock.json`));
  const registry = JSON.parse(read("registry/charts.json"));
  expect(lock.commit).toBe("5d699897b2dde26374cf15501dbaadbc52cea982");
  for (const relative of additions) {
    const localPath = `charts/${relative}`;
    const path = `${vendor}${localPath}`;
    expect(existsSync(resolve(root, path)), path).toBe(true);
    const record = lock.files.find((file: { localPath: string }) => file.localPath === localPath);
    expect(record, localPath).toBeDefined();
    expect(record.upstreamPath).toBe(`packages/ui/src/${localPath}`);
    expect(record.upstreamSha256).toMatch(/^[0-9a-f]{64}$/);
    expect(record.localSha256).toBe(createHash("sha256").update(read(path)).digest("hex"));
    expect(lock.roots, localPath).toContain(localPath);
    expect(registry.shared.files, path).toContain(path);
    expect(read(path)).not.toContain("@/");
  }
  expect(read(`${vendor}LICENSE`)).toContain("MIT License");
});

test("native chart additions and actual upstream curve menu are public imports", async () => {
  const charts: Record<string, unknown> = await import("../packages/ui/src/charts");
  for (const name of [
    "Background", "ReferenceArea", "BarDepthBack", "BarDepthFront", "BarDepthProvider",
    "BarPulse", "useBarDepthEntries", "BarSquares", "BarColumnTrack", "ChartBrush",
    "ChartBrushLayout", "ChartBrushSelectionOverlay", "ChartBrushTrackOverlay",
    "ProjectionLine", "ProjectionLineEndMarker", "LineSeriesTerminalMarker",
    "ChartMarkers", "MarkerGroup", "MarkerTooltipContent", "useActiveMarkers",
    "SegmentBackground", "SegmentLineFrom", "SegmentLineTo",
    "curveNatural", "curveMonotoneX", "curveLinear", "curveStep", "curveBasis", "curveCatmullRom",
  ]) expect(charts[name], name).toBeDefined();
});

test("Brush's fixed dependency and each affected chart's source roots are installable", () => {
  const registry = JSON.parse(read("registry/charts.json"));
  expect(JSON.parse(read("packages/ui/package.json")).dependencies["@visx/brush"]).toBe("4.0.1-alpha.0");
  expect(registry.dependencies["@visx/brush"]).toBe("4.0.1-alpha.0");
  const roots: Record<string, string[]> = {
    area: ["background.tsx", "reference-area.tsx", "chart-brush.tsx", "chart-brush-layout.tsx", "segment.tsx"],
    line: ["background.tsx", "reference-area.tsx", "chart-brush.tsx", "chart-brush-layout.tsx", "projection-line.tsx", "projection-line-end-marker.tsx", "line-series-terminal-marker.tsx", "markers/index.ts", "segment.tsx"],
    composed: ["background.tsx", "reference-area.tsx"],
    bar: ["background.tsx", "reference-area.tsx", "bar-depth.tsx", "bar-squares.tsx"],
    scatter: ["background.tsx", "reference-area.tsx"],
    candlestick: ["background.tsx", "reference-area.tsx"],
    "live-line": ["background.tsx", "reference-area.tsx"],
  };
  for (const [id, files] of Object.entries(roots)) {
    const item = registry.items.find((candidate: { name: string }) => candidate.name === `chart-${id}`);
    expect(item, id).toBeDefined();
    for (const file of files) expect(item.files, `${id}: ${file}`).toContain(`${vendor}charts/${file}`);
  }
});

test("two square-bar instances keep their gradient and pattern references isolated", async () => {
  const uiRequire = createRequire(resolve(root, "packages/ui/package.json"));
  const { createElement } = uiRequire("react");
  const { renderToStaticMarkup } = uiRequire("react-dom/server");
  const { BarSquares } = await import("../packages/ui/src/charts/vendor/charts/bar-squares");
  const { ChartProvider } = await import("../packages/ui/src/charts/vendor/charts/chart-context");
  const yScale = (value: number) => 160 - value;
  const value = {
    data: [{ name: "A", value: 80 }],
    lines: [{ dataKey: "value" }],
    barScale: () => 0,
    bandWidth: 24,
    barXAccessor: (datum: Record<string, unknown>) => String(datum.name),
    yScale,
    yScales: { left: yScale },
    innerHeight: 160,
    animationDuration: 0,
    hoveredBarIndex: null,
  } as unknown as ChartContextValue;
  const instance = () => createElement(ChartProvider, {
    value,
    children: createElement("svg", {}, createElement(BarSquares, {
      dataKey: "value", animate: false, useGradient: true,
      fill: "url(#base)", patternPreset: "diagonal",
      gradientStops: [{ offset: 0, color: "var(--chart-1)" }, { offset: 100, color: "var(--chart-2)" }],
    })),
  });
  const markup = renderToStaticMarkup(createElement("div", {}, instance(), instance()));
  const ids = [...markup.matchAll(/id="([^"]+)"/g)].map(match => match[1]!);
  expect(ids).toHaveLength(4);
  expect(new Set(ids).size).toBe(ids.length);
  for (const [, id] of markup.matchAll(/url\(#([^\)]+)\)/g)) expect(ids).toContain(id);
});

test("3D bars retain unique clip references for distinct Chinese categories", async () => {
  const uiRequire = createRequire(resolve(root, "packages/ui/package.json"));
  const { createElement } = uiRequire("react");
  const { renderToStaticMarkup } = uiRequire("react-dom/server");
  const { BarDepthBack } = await import("../packages/ui/src/charts/vendor/charts/bar-depth");
  const { ChartProvider } = await import("../packages/ui/src/charts/vendor/charts/chart-context");
  const data = [{ label: "一班", value: 80 }, { label: "二班", value: 60 }];
  const yScale = (value: number) => 160 - value;
  const barScale = Object.assign((label: string) => label === "一班" ? 0 : 100, { step: () => 100 });
  const value = { data, lines: [{ dataKey: "value" }], barScale, bandWidth: 60, barXAccessor: (datum: Record<string, unknown>) => String(datum.label), yScale, yScales: { left: yScale }, innerHeight: 160, innerWidth: 200, animationDuration: 0, isLoaded: true, hoveredBarIndex: null, revealEpoch: 0 } as unknown as ChartContextValue;
  const markup = renderToStaticMarkup(createElement(ChartProvider, { value, children: createElement("svg", {}, createElement(BarDepthBack, { dataKey: "value" })) }));
  const ids = [...markup.matchAll(/<clipPath id="([^"]+)"/g)].map(match => match[1]!);
  expect(ids).toHaveLength(2);
  expect(new Set(ids).size).toBe(ids.length);
  for (const id of ids) expect(markup).toContain(`url(#${id})`);
});
