import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRequire } from "node:module";
import type { FeatureCollection, Geometry } from "geojson";
import type { ReactNode } from "react";
import { expect, test, vi } from "vitest";
import { makeRegions } from "./chart-data";
import { ChoroplethChart, type ChoroplethChartProps } from "../../../../../packages/ui/src/charts/vendor/charts/choropleth/choropleth-chart";
import { type ChoroplethFeature, type ChoroplethFeatureProperties, useChoropleth } from "../../../../../packages/ui/src/charts/vendor/charts/choropleth/choropleth-context";
import { ChoroplethFeature as FeatureLayer, type ChoroplethFeatureProps } from "../../../../../packages/ui/src/charts/vendor/charts/choropleth/choropleth-feature";

// Resolve the existing UI-owned projection dependency from its package.
const { geoMercator, geoPath } = createRequire(process.cwd() + "/packages/ui/package.json")("d3-geo");

vi.mock("../../../../../packages/ui/node_modules/@visx/responsive/esm/index.js", () => ({ ParentSize: ({ children }: { children: (size: { width: number; height: number }) => ReactNode }) => children({ width:400, height:200 }) }));

// Synthetic rectangles exercise the actual Mercator; they are not domestic map assets.
const feature = (id: string | number, longitude = 100): ChoroplethFeature => ({ type:"Feature", properties:{ id, name:"同名地区" }, geometry:{ type:"Polygon", coordinates:[[[longitude,20],[longitude,30],[longitude+10,30],[longitude+10,20],[longitude,20]]] } });
const regions: FeatureCollection<Geometry, ChoroplethFeatureProperties> = { type:"FeatureCollection", features:[feature("a"),feature("b",115)] };
const margin = { top:12, right:18, bottom:24, left:30 };
type Activation = (id:string | number, region:ChoroplethFeature) => void;
type ProposedFeatureProps = ChoroplethFeatureProps & { onFeatureActivate?:Activation; selectedFeatureId?:string | number };
type ProposedChartProps = Partial<ChoroplethChartProps> & { fitToData?:boolean };

function ProjectionReading() {
  const { features, pathGenerator, projectPoint, isLoaded } = useChoropleth();
  return <output data-testid="projection" data-loaded={isLoaded}>{JSON.stringify(features.map(region => ({ id:region.properties.id, path:pathGenerator(region), points:region.geometry.type === "Polygon" ? region.geometry.coordinates[0]!.map(point=>projectPoint(point as [number,number])) : [] })))}</output>;
}
function plot(featureProps:ProposedFeatureProps = {}, chartProps:ProposedChartProps = {}, controls?:ReactNode) {
  return <ChoroplethChart data={regions} margin={margin} animationDuration={0} enterTransition={{ duration:0 }} {...chartProps}><FeatureLayer {...featureProps} /><ProjectionReading />{controls}</ChoroplethChart>;
}
const paths = (container:HTMLElement) => [...container.querySelectorAll<SVGPathElement>(".choropleth-features path")];
const reading = (container:HTMLElement) => JSON.parse(container.querySelector('[data-testid="projection"]')!.textContent!) as { id:string | number; path:string; points:[number,number][] }[];
async function settle(container:HTMLElement) {
  await waitFor(()=>expect(container.querySelector('[data-testid="projection"]')).toHaveAttribute("data-loaded","true"));
}

test.each(["static base","static faded","static highlighted","enter"])("%s paths activate the stable region ID", async branch => {
  const activate = vi.fn<Activation>();
  const view = render(plot({ onFeatureActivate:activate }, branch === "enter" ? { animationDuration:60000, enterTransition:{ duration:60 } } : {}));
  if (branch !== "enter") await settle(view.container);
  if (branch === "static faded" || branch === "static highlighted") fireEvent.mouseEnter(paths(view.container)[0]!);
  const target = branch === "static highlighted" ? view.container.querySelector<SVGPathElement>('.choropleth-features path[data-feature-id="a"]')! : branch === "static faded" ? view.container.querySelector<SVGPathElement>('.choropleth-features path[data-feature-id="b"]')! : paths(view.container)[0]!;
  expect(target).not.toBeNull();
  fireEvent.click(target);
  const index = branch === "static faded" ? 1 : 0;
  expect(activate).toHaveBeenCalledExactlyOnceWith(regions.features[index]!.properties.id, regions.features[index]);
});

test("hover and leave preserve the same region hit targets and their containing layer", async () => {
  const view=render(plot());
  await settle(view.container);
  const before=paths(view.container),layer=before[0]!.parentElement;
  fireEvent.mouseEnter(before[0]!);
  expect(view.container.querySelector('[data-feature-id="a"]')).toBe(before[0]);
  expect(view.container.querySelector('[data-feature-id="b"]')).toBe(before[1]);
  expect(before[0]!.parentElement).toBe(layer);
  expect(layer!.children[0]).toBe(before[0]);
  expect(layer!.children[1]).toBe(before[1]);
  expect(before[1]).toHaveAttribute("opacity","0.4");
  fireEvent.mouseLeave(before[0]!);
  expect(view.container.querySelector('[data-feature-id="a"]')).toBe(before[0]);
  expect(view.container.querySelector('[data-feature-id="b"]')).toBe(before[1]);
  expect(before[0]!.parentElement).toBe(layer);
  for (const target of before) expect(target).toHaveAttribute("opacity","0.85");
});

test("hover is raised by an inert visual layer without moving its pointer target", async () => {
  const view=render(plot());
  await settle(view.container);
  const target=paths(view.container)[0]!;
  fireEvent.mouseEnter(target);
  const overlay=view.container.querySelector<SVGPathElement>('.choropleth-features path[pointer-events="none"]');
  expect(overlay).not.toBeNull();
  expect(overlay).toHaveAttribute("d",target.getAttribute("d"));
  expect(overlay).toHaveAttribute("opacity","1");
  expect(overlay).not.toHaveAttribute("data-feature-id");
  expect(target.parentElement!.lastElementChild).toBe(overlay);
  expect(target.parentElement!.firstElementChild).toBe(target);
});

test("a translucent hovered region receives one visible paint rather than two overlaid fills", async () => {
  const fill="rgba(21,97,248,.4)";
  const view=render(plot({fill}));
  await settle(view.container);
  const target=paths(view.container)[0]!,shape=target.getAttribute("d");
  fireEvent.mouseEnter(target);
  const visible=paths(view.container).filter(path=>path.getAttribute("d") === shape && Number(path.getAttribute("opacity")??1)>0);
  expect(visible).toHaveLength(1);
  expect(visible[0]).toHaveAttribute("fill",fill);
  expect(visible[0]).toHaveAttribute("opacity","1");
  if (view.container.querySelector('path[pointer-events="none"]')) {
    expect(target).toHaveAttribute("opacity","0");
    expect(target).toHaveStyle({transition:"none"});
  }
});

test("a pointer press remains activatable while its region gains hover", async () => {
  const activate=vi.fn<Activation>();
  const view=render(plot({onFeatureActivate:activate}));
  await settle(view.container);
  const target=paths(view.container)[0]!;
  fireEvent.pointerDown(target,{pointerId:1,clientX:120,clientY:70});
  fireEvent.mouseEnter(target);
  fireEvent.pointerUp(target,{pointerId:1,clientX:120,clientY:70});
  fireEvent.click(target);
  expect(activate).toHaveBeenCalledExactlyOnceWith("a",regions.features[0]);
});

test.each([0,"001",35])("a valid ID %j is preserved without numeric or index coercion", async id => {
  const region = feature(id);
  region.id = "top-level-id";
  const activate = vi.fn<Activation>();
  const view = render(plot({ onFeatureActivate:activate }, { data:{ type:"FeatureCollection", features:[region] } }));
  await settle(view.container);
  fireEvent.click(paths(view.container)[0]!);
  expect(activate).toHaveBeenCalledExactlyOnceWith(id,region);
});

test("a top-level GeoJSON ID is used when properties.id is absent", async () => {
  const region = feature("discard");
  delete region.properties.id;
  region.id = "top-level-id";
  const activate = vi.fn<Activation>();
  const view = render(plot({ onFeatureActivate:activate }, { data:{ type:"FeatureCollection", features:[region] } }));
  await settle(view.container);
  fireEvent.click(paths(view.container)[0]!);
  expect(activate).toHaveBeenCalledExactlyOnceWith("top-level-id",region);
});

test.each([undefined,"","   ",NaN,Infinity])("missing or invalid region ID %j never falls back to an array index", async id => {
  const region = feature("discard");
  if (id === undefined) delete region.properties.id;
  else region.properties.id = id;
  const activate = vi.fn<Activation>();
  const view = render(plot({ onFeatureActivate:activate }, { data:{ type:"FeatureCollection", features:[region] } }));
  await settle(view.container);
  fireEvent.click(paths(view.container)[0]!);
  expect(activate).not.toHaveBeenCalled();
});

test("selected state follows ID after geometry sorting and survives hover leave", async () => {
  const view = render(plot({ selectedFeatureId:"a" }));
  await settle(view.container);
  const selected = () => view.container.querySelector<SVGPathElement>('.choropleth-features path[data-selected="true"]');
  expect(selected()).not.toBeNull();
  expect(selected()).toHaveAttribute("d",reading(view.container).find(item=>item.id === "a")!.path);
  expect(Number(selected()!.getAttribute("stroke-width"))).toBeGreaterThan(.5);
  view.rerender(plot({ selectedFeatureId:"a" }, { data:{ ...regions, features:[...regions.features].reverse() } }));
  expect(selected()).toHaveAttribute("d",reading(view.container).find(item=>item.id === "a")!.path);
  fireEvent.mouseEnter(selected()!);
  fireEvent.mouseLeave(selected()!);
  expect(selected()).not.toBeNull();
  expect(selected()).toHaveAttribute("d",reading(view.container).find(item=>item.id === "a")!.path);
  view.rerender(plot({ selectedFeatureId:"a" }, { data:{ ...regions, features:[regions.features[1]!] } }));
  expect(selected()).toBeNull();
});

test("hidden SVG and equivalent host buttons activate the same ID by Enter and Space", async () => {
  const user = userEvent.setup();
  const activate = vi.fn<Activation>();
  const region = regions.features[0]!;
  const view = render(plot({ onFeatureActivate:activate }, {}, <button onClick={()=>activate(region.properties.id!,region)}>选择同名地区</button>));
  await settle(view.container);
  expect(view.container.querySelector("svg")).toHaveAttribute("aria-hidden","true");
  expect(view.container.querySelector("svg [tabindex]")).toBeNull();
  await user.tab();
  await user.keyboard("{Enter}");
  await user.keyboard(" ");
  fireEvent.click(paths(view.container)[0]!);
  expect(activate).toHaveBeenCalledTimes(3);
  expect(activate.mock.calls.every(([id,regionValue])=>id === "a" && regionValue === region)).toBe(true);
});

function expectFitted(container:HTMLElement) {
  const points = reading(container).flatMap(item=>item.points);
  expect(points.length).toBeGreaterThan(0);
  const xs = points.map(point=>point[0]), ys = points.map(point=>point[1]);
  expect(Math.min(...xs)).toBeGreaterThanOrEqual(margin.left-.01);
  expect(Math.max(...xs)).toBeLessThanOrEqual(400-margin.right+.01);
  expect(Math.min(...ys)).toBeGreaterThanOrEqual(margin.top-.01);
  expect(Math.max(...ys)).toBeLessThanOrEqual(200-margin.bottom+.01);
  expect(Math.max((Math.max(...xs)-Math.min(...xs))/(400-margin.left-margin.right),(Math.max(...ys)-Math.min(...ys))/(200-margin.top-margin.bottom))).toBeCloseTo(1,2);
  expect(paths(container).every(path=>!/NaN|Infinity/.test(path.getAttribute("d")!))).toBe(true);
}

test("fitToData uses the actual Mercator and refits when current geometry changes", () => {
  const view = render(plot({}, { fitToData:true }));
  expectFitted(view.container);
  const before = paths(view.container).map(path=>path.getAttribute("d"));
  view.rerender(plot({}, { fitToData:true, data:{ type:"FeatureCollection", features:[feature("new",75)] } }));
  expectFitted(view.container);
  expect(paths(view.container).map(path=>path.getAttribute("d"))).not.toEqual(before);
});

test("empty fitted geometry stays empty and does not generate invalid SVG paths", () => {
  const view = render(plot({}, { fitToData:true, data:{ type:"FeatureCollection", features:[] } }));
  expect(paths(view.container)).toHaveLength(0);
  expect(view.container.innerHTML).not.toMatch(/NaN|Infinity/);
});

test.each([false, true])("zoomEnabled=%s gives touch control only to interactive maps", zoomEnabled => {
  const view = render(plot({}, { zoomEnabled }));
  expect(view.container.querySelector("svg")).toHaveStyle({ touchAction: zoomEnabled ? "none" : "auto" });
});

test.each([{ left:250,right:250 },{ top:100,bottom:100 }])("non-positive inner dimensions %j do not create an invalid fitted viewport", invalidMargin => {
  const view = render(plot({}, { fitToData:true, margin:{ ...margin,...invalidMargin } }));
  expect(view.container.querySelector("svg")).toBeNull();
});

test("the original 177-region world projection is unchanged when fitting is omitted or false", () => {
  const world = makeRegions();
  const original = render(plot({}, { data:world }));
  const explicitFalse = render(plot({}, { data:world, fitToData:false }));
  const originalProjection = geoPath(geoMercator().center([0,20]).scale((400-margin.left-margin.right)/630*100).translate([(400-margin.left-margin.right)/2+margin.left,(200-margin.top-margin.bottom)/2+margin.top+50]));
  expect(paths(original.container)).toHaveLength(177);
  expect(paths(original.container).map(path=>path.getAttribute("d"))).toEqual(world.features.map(region=>originalProjection(region)));
  expect(paths(explicitFalse.container).map(path=>path.getAttribute("d"))).toEqual(paths(original.container).map(path=>path.getAttribute("d")));
  expect(reading(original.container).map(item=>item.id)).toEqual(world.features.map(region=>region.properties.id));
});
