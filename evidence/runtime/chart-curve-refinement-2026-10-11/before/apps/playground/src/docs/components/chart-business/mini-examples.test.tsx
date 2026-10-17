import { act, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { MiniColumns, MiniGallery, MiniPie, MiniProgress, MiniSegments, MiniTrend } from "./mini-examples";
import { EmbeddingExamples } from "./embedding-examples";
import { HorizontalBarComparison, RankingBars } from "./bar-examples";
import { makeMiniRows } from "./mini-data";

const { declaredSize } = vi.hoisted(() => ({
  declaredSize(target: Element) {
    let width = 0, height = 0;
    for (let current: Element | null = target; current && (!width || !height); current = current.parentElement) {
      const style = (current as HTMLElement).style;
      if (!width && /^\d+(\.\d+)?px$/.test(style.width)) width = Number.parseFloat(style.width);
      if (!height && /^\d+(\.\d+)?px$/.test(style.height)) height = Number.parseFloat(style.height);
    }
    return { width, height };
  },
}));
vi.mock("@visx/responsive", async () => {
  const React = await import("react");
  return { ParentSize: ({ children }: { children: (size: { width: number; height: number }) => React.ReactNode }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });
    React.useLayoutEffect(() => { if (ref.current) setSize(declaredSize(ref.current)); }, []);
    return <div ref={ref} style={{ width: "100%", height: "100%" }}>{children(size)}</div>;
  } };
});
let observers: { callback: ResizeObserverCallback; targets: Element[] }[];
const originalLength = Object.getOwnPropertyDescriptor(SVGElement.prototype,"getTotalLength");
beforeEach(() => {
  observers = [];
  // JSDOM lacks SVG path measurement; these tests inspect geometry, not stroke length.
  Object.defineProperty(SVGElement.prototype,"getTotalLength",{ configurable:true,value:() => 100 });
  vi.spyOn(HTMLCanvasElement.prototype,"getContext").mockReturnValue({
    font:"", textBaseline:"alphabetic", measureText:() => ({ actualBoundingBoxLeft:0,actualBoundingBoxRight:20,actualBoundingBoxAscent:10,actualBoundingBoxDescent:2 }),
  } as unknown as CanvasRenderingContext2D);
  vi.stubGlobal("ResizeObserver", class {
    targets: Element[] = [];
    constructor(public callback: ResizeObserverCallback) { observers.push(this); }
    observe(target: Element) {
      this.targets.push(target);
      this.callback([{ target, contentRect: declaredSize(target) } as ResizeObserverEntry], this as unknown as ResizeObserver);
    }
    unobserve(target: Element) { this.targets = this.targets.filter(item => item !== target); }
    disconnect() { this.targets = []; }
  });
});
afterEach(() => {
  vi.unstubAllGlobals(); vi.restoreAllMocks();
  if (originalLength) Object.defineProperty(SVGElement.prototype,"getTotalLength",originalLength);
  else Reflect.deleteProperty(SVGElement.prototype,"getTotalLength");
});
const sizes = ["compact", "comfortable"] as const;
const bars = (container: HTMLElement) => [...container.querySelectorAll('g[class^="bar-series-"] rect')];
test("zero comparison rankings explain the empty tracks without inventing a scale", () => {
  const rows = makeMiniRows(0,"zero");
  const view = render(<RankingBars rows={rows} maxValue={0} />);
  expect(view.getByText(/全零量程/)).toBeVisible();
  expect(view.container.querySelectorAll('[data-state="unscaled"][data-fraction="0"]')).toHaveLength(rows.length);
  expect(view.container.querySelectorAll('[data-row-id]')).toHaveLength(rows.length);
  view.rerender(<RankingBars rows={makeMiniRows()} maxValue={100} />);
  expect(view.queryByText(/全零量程/)).toBeNull();
});
test("both quantity and daily-column mini sizes explain a zero comparison maximum beside their readings", () => {
  const view = render(<MiniGallery row={makeMiniRows(0,"zero")[0]!} maxValue={0} trendMaxValue={0} reduced />);
  for (const kind of ["quantity","columns"]) for (const size of sizes) {
    const mini = view.container.querySelector(`[data-mini-kind="${kind}"][data-size="${size}"]`)!;
    const readingId = mini.closest("figure")!.getAttribute("aria-describedby")!;
    expect(view.container.ownerDocument.getElementById(readingId)).toHaveTextContent(/全零量程/);
  }
  expect(view.container.querySelectorAll('[data-state="unscaled"][data-fraction="0"]')).toHaveLength(2);
  view.rerender(<MiniGallery row={makeMiniRows()[0]!} maxValue={100} trendMaxValue={84} reduced />);
  expect(view.queryByText(/全零量程/)).toBeNull();
});
test.each([false,true])("horizontal comparison stacked=%s explains a zero comparison maximum beside its series labels", stacked => {
  const view = render(<HorizontalBarComparison rows={makeMiniRows(0,"zero")} maxValue={0} stacked={stacked} reduced />);
  expect(view.getByText(/全零量程/)).toBeVisible();
  view.rerender(<HorizontalBarComparison rows={makeMiniRows()} maxValue={100} stacked={stacked} reduced />);
  expect(view.queryByText(/全零量程/)).toBeNull();
});
test("a zero comparison maximum does not label missing or empty business readings as all-zero", () => {
  const missing = { ...makeMiniRows(0,"missing")[0]!, trend:[null,null], parts:[null,null,null] };
  const view = render(<><RankingBars rows={[missing]} maxValue={0} /><HorizontalBarComparison rows={[missing]} maxValue={0} reduced /><HorizontalBarComparison rows={[missing]} maxValue={0} stacked reduced /><MiniGallery row={missing} maxValue={0} trendMaxValue={0} reduced /></>);
  expect(view.queryAllByText(/全零量程/)).toHaveLength(0);
  view.rerender(<><RankingBars rows={[]} maxValue={0} /><HorizontalBarComparison rows={[]} maxValue={0} reduced /><MiniGallery row={{...missing,trend:[]}} maxValue={0} trendMaxValue={0} reduced /></>);
  expect(view.queryAllByText(/全零量程/)).toHaveLength(0);
});
test("table quantity bars shorten to 80px while retaining the shared domain and list widths", () => {
  vi.stubGlobal("IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} });
  const rows = makeMiniRows();
  const view = render(<EmbeddingExamples rows={rows} maxValue={200} trendMaxValue={88} reduced />);
  const tableBars = [...view.container.querySelectorAll(".rain-business-cell-value > .rain-data-bar")];
  expect(tableBars).toHaveLength(rows.length);
  tableBars.forEach((bar,index) => {
    expect(bar).toHaveStyle({ width:"80px",height:"6px" });
    expect(bar).toHaveAttribute("data-fraction",String(rows[index]!.count! / 200));
  });
  for (const bar of view.container.querySelectorAll(".rain-business-list-score > .rain-data-bar")) {
    expect(bar).toHaveStyle({ width:"120px",height:"6px" });
  }
});
test("progress can delegate its reading to its host without losing geometry or unavailable states", () => {
  const view = render(<MiniProgress value={20} maxValue={80} size="comfortable" showReading={false} reduced />);
  expect(view.container.querySelector("svg")).not.toBeNull();
  expect(view.container.querySelector("[data-mini-reading]")).toBeNull();
  view.rerender(<MiniProgress value={null} maxValue={80} size="comfortable" showReading={false} reduced />);
  expect(view.getByText("缺测")).toBeVisible();
  expect(view.container.querySelector("svg")).toBeNull();
  view.rerender(<MiniProgress value={0} maxValue={0} size="comfortable" showReading={false} reduced />);
  expect(view.getByText("不适用")).toBeVisible();
  view.rerender(<MiniProgress value={20} maxValue={80} size="comfortable" reduced />);
  expect(view.container.querySelector("[data-mini-reading]")).toHaveTextContent("25%");
});
test("each metric card has one primary reading and progress preserves its actual denominator", () => {
  vi.stubGlobal("IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} });
  const rows = makeMiniRows().map((row,index) => index === 0 ? { ...row, completed:20, goal:80 } : row);
  const view = render(<EmbeddingExamples rows={rows} maxValue={100} trendMaxValue={88} reduced />);
  const cards = view.container.querySelector(".rain-business-cards")!;
  const primary = cards.querySelectorAll(".rain-business-number[data-primary-reading]");
  expect(primary).toHaveLength(3);
  expect(primary[2]).toHaveTextContent("25%");
  expect(cards.querySelector("[data-mini-reading]")).toBeNull();
  expect(cards).toHaveTextContent("已完成 20 / 80 项");
  view.rerender(<EmbeddingExamples rows={rows.map((row,index) => index === 0 ? { ...row, completed:0, goal:0 } : row)} maxValue={100} trendMaxValue={88} reduced />);
  expect(cards.querySelectorAll(".rain-business-number")[2]).toHaveTextContent("—");
  expect(cards).toHaveTextContent("目标未设置");
  expect(cards).not.toHaveTextContent("0%");
});
function expectSlot(container: HTMLElement, kind: string, size: string, width: number, height: number, state: string) {
  const root = container.querySelector(`[data-mini-kind="${kind}"]`)!;
  expect(root).toHaveAttribute("data-size", size);
  expect(root).toHaveAttribute("data-mini-state", state);
  expect(root.querySelector(".rain-business-mini-slot")).toHaveStyle({ width: `${width}px`, height: `${height}px` });
  return root;
}
test.each(sizes)("%s mini columns preserve a common scale and avoid standard plot height", async size => {
  const view = render(<MiniColumns values={[0,11,22]} maxValue={22} size={size} reduced />);
  await waitFor(() => expect(view.container.querySelectorAll('g[class^="bar-series-"] rect')).toHaveLength(3));
  const height = size === "compact" ? 28 : 42;
  expect(bars(view.container).map(rect => Number(rect.getAttribute("height")))).toEqual([0,height/2,height]);
  expect(bars(view.container).map(rect => Number(rect.getAttribute("y")) + Number(rect.getAttribute("height")))).toEqual([height,height,height]);
  expectSlot(view.container,"columns",size,size === "compact" ? 96 : 128,size === "compact" ? 32 : 48,"normal");
  expect(view.container.querySelector(".rain-chart-plot")).toBeNull();
});
test("a missing composition does not fabricate a pie or segments", () => {
  const pie = render(<MiniPie values={[null,3]} reduced />);
  expect(pie.getByText("缺测")).toBeVisible();
  expect(pie.container.querySelector("svg")).toBeNull();
  const segments = render(<MiniSegments values={[0,0]} reduced />);
  expect(segments.getByText("零总量")).toBeVisible();
});
test("zero target is not a zero-percent progress arc", () => {
  const view = render(<MiniProgress value={0} maxValue={0} reduced />);
  expect(view.getByText("不适用")).toBeVisible();
  expect(view.container.querySelector("svg")).toBeNull();
});
test("entirely missing columns and invalid scale show a readable state", () => {
  const view = render(<MiniColumns values={[null,null]} maxValue={100} reduced />);
  expect(view.getByText("缺测")).toBeVisible();
  view.rerender(<MiniColumns values={[2,3]} maxValue={NaN} reduced />);
  expect(view.getByText("无效数据")).toBeVisible();
});
test("compact pie and progress paths are finite", () => {
  const view = render(<><MiniPie values={[3,2,5]} donut reduced /><MiniProgress value={75} maxValue={100} reduced /></>);
  expect(view.container.querySelectorAll("svg")).toHaveLength(2);
  for (const path of view.container.querySelectorAll("path")) expect(path.getAttribute("d")).not.toMatch(/NaN|Infinity|undefined/);
});

test.each(sizes)("%s zero columns keep the slot and draw no fabricated height", async size => {
  const view = render(<MiniColumns values={[0,0]} maxValue={0} size={size} reduced />);
  await waitFor(() => expect(bars(view.container)).toHaveLength(2));
  expect(bars(view.container).every(rect => rect.getAttribute("height") === "0")).toBe(true);
  expectSlot(view.container,"columns",size,size === "compact" ? 96 : 128,size === "compact" ? 32 : 48,"zero");
});

test.each(sizes)("%s segments render actual thin tracks and preserve zero or subpixel parts", async size => {
  const view = render(<MiniSegments values={[0,.001,9.999]} size={size} reduced />);
  await waitFor(() => expect(bars(view.container)).toHaveLength(3));
  const width = size === "compact" ? 120 : 160;
  const thickness = size === "compact" ? 6 : 8;
  expect(bars(view.container).map(rect => Number(rect.getAttribute("height")))).toEqual([thickness,thickness,thickness]);
  expect(bars(view.container).map(rect => Number(rect.getAttribute("rx")))).toEqual([0,0,0]);
  expect(Number(bars(view.container)[0]!.getAttribute("width"))).toBe(0);
  expect(Number(bars(view.container)[1]!.getAttribute("width"))).toBeCloseTo(width/10000,5);
  expect(bars(view.container).reduce((sum,rect) => sum + Number(rect.getAttribute("width")),0)).toBeCloseTo(width,5);
  expectSlot(view.container,"segments",size,width,size === "compact" ? 10 : 12,"normal");
});

test.each(sizes)("%s variants retain their slots in empty, missing, zero and invalid states", size => {
  const width = size === "compact" ? 96 : 128, height = size === "compact" ? 32 : 48;
  const view = render(<MiniColumns values={[]} maxValue={100} size={size} reduced />);
  for (const [values,maxValue,state,text] of [
    [[],100,"empty","暂无数据"], [[null,null],100,"missing","缺测"], [[NaN,3],100,"invalid","无效数据"],
    [[1,3],0,"invalid","无效数据"], [[2,101],100,"overflow","超出范围"],
  ] as const) {
    view.rerender(<MiniColumns values={[...values]} maxValue={maxValue} size={size} reduced />);
    expectSlot(view.container,"columns",size,width,height,state);
    expect(view.getByText(text).closest('[aria-hidden="true"]')).toBeNull();
    expect(view.container.querySelector("svg")).toBeNull();
  }
  view.rerender(<MiniPie values={[null,3]} size={size} reduced />);
  expectSlot(view.container,"pie",size,size === "compact" ? 32 : 56,size === "compact" ? 32 : 56,"missing");
  view.rerender(<MiniSegments values={[0,0]} size={size} reduced />);
  expectSlot(view.container,"segments",size,size === "compact" ? 120 : 160,size === "compact" ? 10 : 12,"zero");
  expect(view.getByText("零总量")).toBeVisible();
  view.rerender(<MiniProgress value={0} maxValue={0} size={size} reduced />);
  expectSlot(view.container,"arc",size,size === "compact" ? 40 : 72,size === "compact" ? 30 : 54,"inapplicable");
  view.rerender(<MiniTrend values={[null,3]} size={size} reduced />);
  expectSlot(view.container,"line",size,width,height,"missing");
});

test.each(sizes)("%s pie, donut, line and area paths are finite at their own declared size", async size => {
  const view = render(<><MiniPie values={[3,2,5]} size={size} reduced /><MiniPie values={[3,2,5]} donut size={size} reduced />
    <MiniTrend values={[2,4,1,5]} size={size} reduced /><MiniTrend values={[2,4,1,5]} area size={size} reduced /></>);
  await waitFor(() => expect(view.container.querySelectorAll("svg")).toHaveLength(4));
  for (const path of view.container.querySelectorAll("path")) expect(path.getAttribute("d")).not.toMatch(/NaN|Infinity|undefined/);
  for (const kind of ["pie","donut"]) expectSlot(view.container,kind,size,size === "compact" ? 32 : 56,size === "compact" ? 32 : 56,"normal");
  for (const kind of ["line","area"]) {
    const root = expectSlot(view.container,kind,size,size === "compact" ? 96 : 128,size === "compact" ? 32 : 48,"normal");
    expect([...root.querySelectorAll("path[stroke-width]")].some(path => Number(path.getAttribute("stroke-width")) === (size === "compact" ? 1.5 : 2))).toBe(true);
  }
});

test.each(sizes.flatMap(size => [false,true].map(donut => ({ size,donut }))))("reduced $size pie donut=$donut commits new values synchronously to their final paths", ({ size,donut }) => {
  const visiblePaths = (container:HTMLElement) => [...container.querySelectorAll('path[pointer-events="none"]')].map(path => path.getAttribute("d"));
  const view = render(<MiniPie values={[3,2,5]} size={size} donut={donut} reduced />);
  const initial = visiblePaths(view.container);
  const expected = render(<MiniPie values={[7,2,1]} size={size} donut={donut} reduced />);
  const final = visiblePaths(expected.container);
  expect(final).not.toEqual(initial);
  const sector = view.container.querySelector('path[pointer-events="none"]');
  view.rerender(<MiniPie values={[7,2,1]} size={size} donut={donut} reduced />);
  expect(visiblePaths(view.container)).toEqual(final);
  expect(view.container.querySelector('path[pointer-events="none"]')).toBe(sector);
});

test.each(sizes)("%s progress keeps a circular bottom-opening 225 degree arc at 0, 50 and 100 percent", size => {
  const view = render(<MiniProgress value={0} maxValue={100} size={size} reduced />);
  const canvas = size === "compact" ? 40 : 72;
  let previous = "";
  for (const value of [0,50,100]) {
    view.rerender(<MiniProgress value={value} maxValue={100} size={size} reduced />);
    const root = expectSlot(view.container,"arc",size,canvas,size === "compact" ? 30 : 54,value === 0 ? "zero" : "normal");
    expect(root.querySelector("svg")).toHaveAttribute("width",String(canvas));
    expect(root.querySelector("svg")).toHaveAttribute("height",String(canvas));
    const paths = [...root.querySelectorAll("path")];
    expect(paths).toHaveLength(value === 0 ? 1 : 2);
    const track = paths[0]!.getAttribute("d")!;
    expect(track).not.toMatch(/NaN|Infinity|undefined/);
    expect(track).toContain(`A${size === "compact" ? 18 : 32},${size === "compact" ? 18 : 32}`);
    const outerArc = track.match(new RegExp(`A${size === "compact" ? 18 : 32},${size === "compact" ? 18 : 32},0,1,1,([-\\d.]+),([-\\d.]+)`));
    expect(outerArc).not.toBeNull(); // The long sweep ends on the bottom right, leaving a bottom opening.
    expect(Number(outerArc![1])).toBeGreaterThan(0);
    expect(Number(outerArc![2])).toBeGreaterThan(0);
    if (value > 0) {
      const progress = paths[1]!.getAttribute("d")!;
      expect(progress).not.toBe(previous);
      if (value === 100) expect(progress).toBe(track);
      previous = progress;
    }
  }
});

test.each(sizes)("%s zero and single-point trends never produce a nonfinite path", async size => {
  const view = render(<MiniTrend values={[0,0,0]} size={size} reduced />);
  await waitFor(() => expect(view.container.querySelector("svg")).not.toBeNull());
  expectSlot(view.container,"line",size,size === "compact" ? 96 : 128,size === "compact" ? 32 : 48,"zero");
  for (const values of [[0,0,0],[7]]) {
    view.rerender(<MiniTrend values={values} area size={size} reduced />);
    for (const path of view.container.querySelectorAll("path")) expect(path.getAttribute("d")).not.toMatch(/NaN|Infinity|undefined/);
  }
});

test.each(sizes)("%s invalid progress never presents a normal fraction or percent", size => {
  const view = render(<MiniProgress value={null} maxValue={80} size={size} reduced />);
  for (const [value,maxValue,state] of [[null,80,"missing"],[NaN,80,"invalid"],[Infinity,80,"invalid"],[-1,80,"invalid"],[1,0,"invalid"],[81,80,"overflow"]] as const) {
    view.rerender(<MiniProgress value={value} maxValue={maxValue} size={size} reduced />);
    expectSlot(view.container,"arc",size,size === "compact" ? 40 : 72,size === "compact" ? 30 : 54,state);
    expect(view.container.querySelector("svg")).toBeNull();
    expect(view.container.querySelector("[data-mini-reading]")).toBeNull();
  }
});

test.each(sizes)("%s full ring retains its specified inner and outer radii", size => {
  const view = render(<MiniProgress value={50} maxValue={100} size={size} arc={false} reduced />);
  expectSlot(view.container,"ring",size,size === "compact" ? 32 : 64,size === "compact" ? 32 : 64,"normal");
  const path = view.container.querySelector("path")!.getAttribute("d")!;
  expect(path).toContain(`A${size === "compact" ? 14 : 30},${size === "compact" ? 14 : 30}`);
  expect(path).toContain(`A${size === "compact" ? 11 : 25},${size === "compact" ? 11 : 25}`);
});

function mockProgressInk() {
  let scale = 1;
  const nativeBounds = HTMLElement.prototype.getBoundingClientRect;
  vi.spyOn(HTMLElement.prototype,"getBoundingClientRect").mockImplementation(function(this:HTMLElement) {
    const group = this.closest<HTMLElement>(".rain-business-progress-reading");
    if (!group) return nativeBounds.call(this);
    const isPercent = this.tagName === "STRONG" || this.parentElement?.tagName === "STRONG";
    const percentWidth = (group.querySelector("strong")!.textContent === "100%" ? 52.65 : 43.218) * scale;
    const origin = group.dataset.placement === "outside" ? { left:300,top:500 } : { left:100,top:100 };
    const width = this === group ? percentWidth : this.hasAttribute("data-mini-baseline") ? 0 : isPercent ? percentWidth : 36*scale;
    const height = this === group ? 38*scale : this.hasAttribute("data-mini-baseline") ? 0 : (isPercent ? 22 : 16)*scale;
    const left = origin.left + (this === group ? 0 : (percentWidth-width)/2);
    const top = origin.top + (this === group ? 0 : this.hasAttribute("data-mini-baseline") ? (isPercent ? 18.218 : 34.6)*scale : isPercent ? 0 : 22*scale);
    return { width,height,left,top,right:left+width,bottom:top+height,x:left,y:top,toJSON() {} };
  });
  const measureText = vi.fn((text:string) => ({ actualBoundingBoxLeft:0, actualBoundingBoxRight:(text === "100%" ? 52.65 : text === "完成率" ? 36 : 43.218)*scale,
    actualBoundingBoxAscent:(text === "完成率" ? 9.936 : 13.914)*scale, actualBoundingBoxDescent:(text === "完成率" ? 1.26 : .936)*scale }));
  vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue({ font:"",textBaseline:"alphabetic",measureText } as unknown as CanvasRenderingContext2D);
  return { setScale:(value:number) => { scale = value; }, measureText };
}

test("comfortable progress moves the same readable node outside after text grows and restores it when it fits", async () => {
  const ink = mockProgressInk();
  const view = render(<MiniProgress value={20} maxValue={100} size="comfortable" reduced />);
  const reading = view.getByText("20%").parentElement!;
  expect(reading).toHaveAttribute("data-placement","center");
  expect(reading.closest('[aria-hidden="true"]')).toBeNull();
  ink.setScale(2);
  act(() => { for (const observer of observers) observer.callback(observer.targets.map(target => ({ target,contentRect:declaredSize(target) } as ResizeObserverEntry)),observer as unknown as ResizeObserver); });
  await waitFor(() => expect(reading).toHaveAttribute("data-placement","outside"));
  expect(view.getAllByText("20%")).toHaveLength(1);
  expectSlot(view.container,"arc","comfortable",72,54,"normal");
  ink.setScale(1);
  act(() => { for (const observer of observers) observer.callback(observer.targets.map(target => ({ target,contentRect:declaredSize(target) } as ResizeObserverEntry)),observer as unknown as ResizeObserver); });
  await waitFor(() => expect(reading).toHaveAttribute("data-placement","center"));
});

test("100 percent ink moves outside when its corners cross the circular inner area despite fitting the diameter", () => {
  const ink = mockProgressInk();
  const view = render(<MiniProgress value={100} maxValue={100} size="comfortable" reduced />);
  const reading = view.getByText("100%").parentElement!;
  expect(reading.getBoundingClientRect().width).toBeLessThan(56);
  expect(reading.getBoundingClientRect().height).toBeLessThan(56);
  expect(reading).toHaveAttribute("data-placement","outside");
  expect(ink.measureText).toHaveBeenCalledWith("100%");
  expect(view.getAllByText("100%")).toHaveLength(1);
  expect(reading.closest('[aria-hidden="true"]')).toBeNull();
  expectSlot(view.container,"arc","comfortable",72,54,"normal");
});

test("the gallery compares all nine chart kinds in adjacent compact and comfortable figures", async () => {
  const row = { ...makeMiniRows()[0]!,count:100,trend:[4,22,8,10,11,19,13,21],completed:20,goal:80 };
  const view = render(<MiniGallery row={row} maxValue={100} trendMaxValue={22} reduced />);
  expect(view.container.querySelectorAll("figure")).toHaveLength(18);
  const roots = [...view.container.querySelectorAll("figure [data-mini-kind]")];
  expect(roots.map(root => root.getAttribute("data-mini-kind"))).toEqual(["quantity","quantity","segments","segments","columns","columns","pie","pie","donut","donut","ring","ring","arc","arc","line","line","area","area"]);
  expect(roots.map(root => root.getAttribute("data-size"))).toEqual(Array.from({ length:18 },(_,index) => index % 2 ? "comfortable" : "compact"));
  await waitFor(() => expect(bars(view.container)).toHaveLength(22));
  const columns = view.container.querySelector('[data-mini-kind="columns"][data-size="compact"]')!;
  expect(Math.max(...[...columns.querySelectorAll('g[class^="bar-series-"] rect')].map(rect => Number(rect.getAttribute("height"))))).toBe(28);
  expect(view.getAllByText(/本期人数/).length).toBeGreaterThan(0);
  expect(view.getAllByText(/近8天每日人数/).length).toBeGreaterThan(0);
  for (const figure of view.container.querySelectorAll("figure")) expect(figure.querySelector(".rain-business-mini-gallery__graphic")).not.toBeNull();
  for (const figure of view.container.querySelectorAll("figure")) {
    const readingId = figure.getAttribute("aria-describedby")!;
    expect(view.container.ownerDocument.getElementById(readingId)).toHaveTextContent(/.+/);
  }
});
