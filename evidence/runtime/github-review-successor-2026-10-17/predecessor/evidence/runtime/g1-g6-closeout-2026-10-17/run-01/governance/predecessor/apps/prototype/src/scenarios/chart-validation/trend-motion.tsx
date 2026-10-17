import { memo, useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Area, type AreaConfig } from "@ant-design/plots";
import type { Chart } from "@antv/g2";
import { Button } from "@rain-next/ui";
import { type Appearance, DataDisclosure, chartTheme, paletteColors, usePlotReady } from "./shared";
import "./trend-motion.css";

const WEEKS = Array.from({ length: 12 }, (_, index) => `第${index + 1}周`);
const SERIES = ["本期", "上期"] as const;
type Series = typeof SERIES[number];
const CURRENT: (number | null)[] = [42, 56, 63, 0, 71, 82, 68, null, 88, 95, 90, 106];
const PREVIOUS = [35, 46, 52, 47, 58, 64, 56, 70, 72, 78, 82, 88];
type Datum = { week: string; series: Series; segment: string; value: number | null; revealDelay: number; revealDuration: number };
type Geometry = { left: number; right: number; top: number; bottom: number; points: { x: number; y: (number | null)[] }[] };
type NativePathData = string | [string, ...number[]][];
type NativeShape = {
  nodeName: string;
  isConnected: boolean;
  parentNode: NativeShape | null;
  __removed__?: boolean;
  markType?: string;
  style: { d?: NativePathData; clipPath?: NativeShape | null; opacity?: number; stroke?: string };
  __data__?: { data?: Datum | Datum[] };
  getWorldTransform: () => ArrayLike<number>;
  querySelectorAll: (selector: string) => NativeShape[];
  contains: (node: NativeShape) => boolean;
};
type PathCopy = { native: NativeShape; path: SVGPathElement; clip?: SVGPathElement; clipId?: string; group?: SVGGElement; series: Series; matrix: number[] };
const svgElement = <K extends keyof SVGElementTagNameMap>(tag: K) => document.createElementNS("http://www.w3.org/2000/svg", tag);
const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));
// G stores path commands as arrays during morphing and as strings at rest.
// Preserve its live coordinates; Array.toString() would produce invalid "M,0".
const svgPathData = (data: NativePathData | undefined) => typeof data === "string"
  ? data : data?.map(([command, ...values]) => `${command}${values.join(" ")}`).join(" ") ?? "";
// Plots internally wraps onReady on every React render. Keep pointer-only
// updates outside that boundary so they cannot restart native transitions.
const NativeArea = memo(Area);
const datumOf = (mark: NativeShape) => {
  const datum = mark.__data__?.data;
  return Array.isArray(datum) ? datum[0] : datum;
};

export function TrendMotionSample({ appearance }: { appearance: Appearance }) {
  const ready = usePlotReady();
  const [activeIndex, setActiveIndex] = useState(5);
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [keyboardReading, setKeyboardReading] = useState(false);
  const [curve, setCurve] = useState<"smooth" | "linear">("smooth");
  const [visibleSeries, setVisibleSeries] = useState<Series[]>([...SERIES]);
  const [focusedSeries, setFocusedSeries] = useState<Series | null>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const interaction = useRef<HTMLDivElement>(null);
  const materialLayer = useRef<SVGGElement>(null);
  const materialClips = useRef<SVGDefsElement>(null);
  const highlightLayer = useRef<SVGGElement>(null);
  const highlightClip = useRef<SVGRectElement>(null);
  const crosshair = useRef<SVGRectElement>(null);
  const markers = useRef<(SVGGElement | null)[]>([]);
  const datePill = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const chart = useRef<Chart | null>(null);
  const copies = useRef<PathCopy[]>([]);
  const nativeMarks = useRef<NativeShape[]>([]);
  const entered = useRef(false);
  const nativeFrame = useRef(0);
  const finalSnapshotFrame = useRef(0);
  const repaintGuides = useRef<() => void>(() => {});
  const detach = useRef<() => void>(() => {});
  const pointerFocus = useRef(false);
  const uid = useId().replaceAll(":", "");
  const visible = pinned || hovered || keyboardReading;
  const current = useMemo(() => CURRENT.map((value, index) => index === 5 ? Number(value) + appearance.revision * 7 : value), [appearance.revision]);
  const palette = paletteColors(appearance);
  const colors = useMemo(() => [appearance.palette === "near" ? "#3D7BFF" : palette[0]!, palette[4]!], [appearance.palette, palette]);
  const live = useRef({ current, colors, focusedSeries, visibleSeries, gradient: appearance.gradient });
  live.current = { current, colors, focusedSeries, visibleSeries, gradient: appearance.gradient };

  const isCurrentMark = useCallback((mark: NativeShape) => {
    const root = chart.current?.getContext().canvas?.getRoot() as unknown as NativeShape | undefined;
    const datum = datumOf(mark);
    return mark.nodeName === "path" && mark.isConnected && mark.parentNode !== null && !mark.__removed__
      && !!datum && live.current.visibleSeries.includes(datum.series) && !!root?.contains(mark);
  }, []);

  const refreshGeometry = useCallback(() => {
    const raw = chart.current;
    const view = raw?.getView();
    if (!view) return;
    const { coordinate, scale, layout } = view;
    if (!scale.x || !scale.y) return;
    // G2 coordinates are plot-local. Its measured layout supplies the offset;
    // there are no duplicated padding or axis-size assumptions here.
    const x0 = (layout.x ?? 0) + (layout.paddingLeft ?? 0) + (layout.marginLeft ?? 0);
    const y0 = (layout.y ?? 0) + (layout.paddingTop ?? 0) + (layout.marginTop ?? 0);
    const origin = coordinate.map([0, 0]);
    const corner = coordinate.map([1, 1]);
    const point = (week: string, value: number) => {
      const mapped = coordinate.map([Number(scale.x!.map(week)) + (scale.x!.getBandWidth?.() ?? 0) / 2, Number(scale.y!.map(value))]);
      return { x: mapped[0]! + x0, y: mapped[1]! + y0 };
    };
    const next: Geometry = {
      left: Math.min(origin[0]!, corner[0]!) + x0,
      right: Math.max(origin[0]!, corner[0]!) + x0,
      top: Math.min(origin[1]!, corner[1]!) + y0,
      bottom: Math.max(origin[1]!, corner[1]!) + y0,
      points: WEEKS.map((week, index) => ({
        x: point(week, 0).x,
        y: [live.current.current[index] === null ? null : point(week, live.current.current[index]!).y, point(week, PREVIOUS[index]!).y],
      })),
    };
    setGeometry(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
  }, []);

  const paintNativePaths = useCallback(() => {
    const canvas = ready.host.current?.querySelector("canvas");
    const hostBounds = ready.host.current?.getBoundingClientRect();
    const canvasBounds = canvas?.getBoundingClientRect();
    const dx = canvasBounds && hostBounds ? canvasBounds.left - hostBounds.left : 0;
    const dy = canvasBounds && hostBounds ? canvasBounds.top - hostBounds.top : 0;
    copies.current = copies.current.filter(copy => {
      if (isCurrentMark(copy.native)) return true;
      // A removed G2 node loses its world transform. Drop its SVG material and
      // highlight too, before an old path can be painted at the Canvas origin.
      (copy.group ?? copy.path).remove();
      copy.clip?.parentElement?.remove();
      return false;
    });
    for (const copy of copies.current) {
      const matrix = copy.native.getWorldTransform();
      const values = [matrix[0]!, matrix[1]!, matrix[4]!, matrix[5]!, matrix[12]! + dx, matrix[13]! + dy];
      copy.matrix = values;
      copy.path.setAttribute("d", svgPathData(copy.native.style.d));
      copy.path.setAttribute("transform", `matrix(${values.join(" ")})`);
      const emphasis = !live.current.focusedSeries || copy.series === live.current.focusedSeries ? 1 : 0.2;
      copy.path.style.opacity = String(emphasis);
      if (copy.clip && copy.group) {
        const nativeClip = copy.native.style.clipPath;
        if (nativeClip?.style.d) {
          const m = nativeClip.getWorldTransform();
          copy.clip.setAttribute("d", svgPathData(nativeClip.style.d));
          copy.clip.setAttribute("transform", `matrix(${[m[0], m[1], m[4], m[5], m[12]! + dx, m[13]! + dy].join(" ")})`);
          copy.group.setAttribute("clip-path", `url(#${copy.clipId})`);
        } else copy.group.removeAttribute("clip-path");
      }
    }
    nativeMarks.current = nativeMarks.current.filter(isCurrentMark);
    for (const mark of nativeMarks.current) {
      const series = datumOf(mark)?.series;
      mark.style.opacity = !live.current.focusedSeries || live.current.focusedSeries === series ? 1 : 0.2;
    }
    repaintGuides.current();
  }, [isCurrentMark, ready.host]);

  const captureNativePaths = useCallback(() => {
    const raw = chart.current;
    if (!raw || !materialLayer.current || !highlightLayer.current || !materialClips.current) return;
    materialLayer.current.replaceChildren();
    highlightLayer.current.replaceChildren();
    materialClips.current.replaceChildren();
    copies.current = [];
    const elements = raw.getContext().canvas?.getRoot().querySelectorAll(".element") as unknown as NativeShape[] | undefined;
    nativeMarks.current = (elements ?? []).filter(element => (element.markType === "line" || element.markType === "area") && isCurrentMark(element));
    for (const mark of nativeMarks.current) {
      const datum = datumOf(mark)!;
      const series = datum.series;
      // Each continuous segment in this sample is one native Path. Do not
      // recursively copy its growInX clip or transient animation descendants.
      const native = mark;
      if (native.style.d) {
        const path = svgElement("path");
        path.dataset.series = series;
        path.dataset.segment = datum.segment;
        const copy: PathCopy = { native, path, series, matrix: [1, 0, 0, 1, 0, 0] };
        if (mark.markType === "area") {
          const group = svgElement("g");
          const clip = svgElement("path");
          const clipDefinition = svgElement("clipPath");
          clipDefinition.id = `${uid}-native-clip-${copies.current.length}`;
          clipDefinition.setAttribute("clipPathUnits", "userSpaceOnUse");
          clipDefinition.append(clip);
          materialClips.current.append(clipDefinition);
          path.setAttribute("fill", live.current.gradient ? `url(#${uid}-fill-${SERIES.indexOf(series)})` : live.current.colors[SERIES.indexOf(series)]!);
          if (!live.current.gradient) path.setAttribute("fill-opacity", "0.12");
          group.append(path);
          materialLayer.current.append(group);
          copy.clip = clip;
          copy.clipId = clipDefinition.id;
          copy.group = group;
        } else {
          path.setAttribute("fill", "none");
          path.setAttribute("stroke", live.current.colors[SERIES.indexOf(series)]!);
          path.setAttribute("stroke-width", "2.8");
          path.setAttribute("stroke-linecap", "round");
          highlightLayer.current.append(path);
        }
        copies.current.push(copy);
      }
    }
    paintNativePaths();
  }, [isCurrentMark, paintNativePaths, uid]);

  const bindNative = useCallback((raw: Chart) => {
    detach.current();
    chart.current = raw;
    const afterPaint = () => {
      cancelAnimationFrame(nativeFrame.current);
      cancelAnimationFrame(finalSnapshotFrame.current);
      refreshGeometry();
      captureNativePaths();
      const follow = () => { paintNativePaths(); nativeFrame.current = requestAnimationFrame(follow); };
      nativeFrame.current = requestAnimationFrame(follow);
    };
    const afterRender = () => {
      entered.current = true;
      cancelAnimationFrame(nativeFrame.current);
      // growInX leaves its clip attached. Remove the completed reveal so a
      // later data/size change is not clipped to the initial path's bounds.
      for (const mark of nativeMarks.current) mark.style.clipPath = null;
      refreshGeometry();
      captureNativePaths();
      // G2's exit-removal and morph-finalization callbacks share the finished
      // promise. Re-read the settled scene on the following paint boundary.
      cancelAnimationFrame(finalSnapshotFrame.current);
      finalSnapshotFrame.current = requestAnimationFrame(captureNativePaths);
    };
    raw.on("afterpaint", afterPaint);
    raw.on("afterrender", afterRender);
    detach.current = () => { raw.off("afterpaint", afterPaint); raw.off("afterrender", afterRender); };
  }, [captureNativePaths, paintNativePaths, refreshGeometry]);
  const onReady = useCallback((plot: unknown) => {
    ready.onReady(plot);
    bindNative((plot as { chart: Chart }).chart);
  }, [bindNative, ready.onReady]);
  useEffect(() => {
    if (chart.current) bindNative(chart.current);
    return () => { detach.current(); cancelAnimationFrame(nativeFrame.current); cancelAnimationFrame(finalSnapshotFrame.current); };
  }, [bindNative]);
  useEffect(() => { paintNativePaths(); }, [focusedSeries, visibleSeries, paintNativePaths]);

  const plotConfig = useMemo<AreaConfig>(() => {
    const first = !entered.current;
    const data: Datum[] = WEEKS.flatMap((week, index) => [
      { week, series: SERIES[0], segment: index < 8 ? "current-before-gap" : "current-after-gap", value: current[index] ?? null,
        revealDelay: index < 8 ? 0 : 1000 * 8 / 11, revealDuration: 1000 * (index < 8 ? 6 : 3) / 11 },
      { week, series: SERIES[1], segment: "previous", value: PREVIOUS[index]!, revealDelay: 0, revealDuration: 1000 },
    ]).filter(datum => visibleSeries.includes(datum.series));
    const animate = appearance.motion ? {
      enter: { type: first ? "growInX" : "fadeIn", ...(first ? {} : { duration: 160 }), easing: "linear" },
      update: { type: "morphing", duration: 360, easing: "ease-in-out" },
      exit: { type: "fadeOut", duration: 140 },
    } : false;
    const reveal = first ? { enterDelay: "revealDelay", enterDuration: "revealDuration" } : {};
    return {
      data, xField: "week", yField: "value", colorField: "series", seriesField: "segment", keyField: "segment",
      height: 280, stack: false, theme: chartTheme(), legend: false, tooltip: false,
      children: [{ type: "area", animate, encode: reveal }],
      scale: { x: { domain: WEEKS }, y: { zero: true }, color: { domain: SERIES, range: colors }, enterDelay: { type: "identity" }, enterDuration: { type: "identity" } },
      axis: { x: { title: false, labelAutoHide: true, labelAutoRotate: false, labelFormatter: (label: string) => label.replace("第", "") }, y: { title: "人次", grid: true } },
      // Native geometry and its animated clip remain authoritative. The local
      // SVG below Canvas only supplies the two-axis translucent area material.
      style: { shape: curve === "smooth" ? "smooth" : "area", fillOpacity: 0, connect: false,
        fill: (datum: Datum | Datum[]) => {
          const color = colors[SERIES.indexOf(Array.isArray(datum) ? datum[0]!.series : datum.series)]!;
          return appearance.gradient ? `linear-gradient(90deg, ${color}33 0%, ${color}00 100%)` : color;
        },
      },
      line: { animate, encode: reveal, style: { shape: curve === "smooth" ? "smooth" : "line", stroke: (datum: Datum | Datum[]) => colors[SERIES.indexOf(Array.isArray(datum) ? datum[0]!.series : datum.series)], lineWidth: 2, strokeOpacity: 0.7, connect: false } },
      interaction: { tooltip: false, elementHighlight: false }, onReady,
    };
  }, [appearance.gradient, appearance.motion, colors, current, curve, onReady, visibleSeries]);

  const spring = useRef({ frame: 0, values: [0, 0, 0], velocities: [0, 0, 0], initialized: false });
  useEffect(() => {
    if (!geometry || !panel.current || !datePill.current) return;
    const point = geometry.points[activeIndex]!;
    const panelWidth = panel.current.offsetWidth;
    const panelHeight = panel.current.offsetHeight;
    const hostWidth = ready.host.current?.clientWidth ?? geometry.right;
    const flip = point.x + panelWidth + 24 > hostWidth - 8;
    const panelX = clamp(flip ? point.x - panelWidth - 20 : point.x + 20, 4, hostWidth - panelWidth - 4);
    const values = point.y.filter((value, index): value is number => value !== null && visibleSeries.includes(SERIES[index]!));
    const panelY = clamp(Math.min(...values) - 18, geometry.top + 8, geometry.bottom - panelHeight - 8);
    const target = [point.x, panelX, panelY];
    const state = spring.current;
    cancelAnimationFrame(state.frame);
    if (!state.initialized || !appearance.motion || !visible) {
      state.values = [...target]; state.velocities = [0, 0, 0]; state.initialized = true;
    }
    panel.current.dataset.side = flip ? "left" : "right";
    const paint = () => {
      const x = state.values[0]!;
      crosshair.current?.setAttribute("x", String(x - 0.5));
      highlightClip.current?.setAttribute("x", String(x - 42));
      if (datePill.current) datePill.current.style.transform = `translate3d(${x - datePill.current.offsetWidth / 2}px, ${geometry.bottom + 5}px, 0)`;
      if (panel.current) panel.current.style.transform = `translate3d(${state.values[1]}px, ${state.values[2]}px, 0)`;
      SERIES.forEach((series, index) => {
        let y: number | null = null;
        // Track the actual animated native curve, including its live morph.
        // This also keeps rings on the curve while the fast X spring travels.
        for (const copy of copies.current.filter(item => !item.clip && item.series === series)) {
          if (!copy.path.getAttribute("d")) continue;
          const length = copy.path.getTotalLength();
          if (!length) continue;
          const project = (distance: number) => {
            const p = copy.path.getPointAtLength(distance);
            return { x: p.x * copy.matrix[0]! + p.y * copy.matrix[2]! + copy.matrix[4]!, y: p.x * copy.matrix[1]! + p.y * copy.matrix[3]! + copy.matrix[5]! };
          };
          if (x < project(0).x - 0.1 || x > project(length).x + 0.1) continue;
          let low = 0; let high = length;
          for (let i = 0; i < 16; i++) { const mid = (low + high) / 2; if (project(mid).x < x) low = mid; else high = mid; }
          y = project((low + high) / 2).y;
        }
        const marker = markers.current[index];
        if (marker) {
          marker.setAttribute("transform", `translate(${x} ${y ?? 0})`);
          marker.style.visibility = visible && visibleSeries.includes(series) && point.y[index] !== null && y !== null ? "visible" : "hidden";
        }
      });
    };
    repaintGuides.current = paint;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.032); last = now;
      let moving = false;
      target.forEach((goal, index) => {
        const stiffness = index === 0 ? 620 : 230;
        const damping = index === 0 ? 42 : 29;
        const distance = goal - state.values[index]!;
        state.velocities[index] = state.velocities[index]! + (stiffness * distance - damping * state.velocities[index]!) * dt;
        state.values[index] = state.values[index]! + state.velocities[index]! * dt;
        if (Math.abs(distance) > 0.05 || Math.abs(state.velocities[index]!) > 0.05) moving = true;
        else { state.values[index] = goal; state.velocities[index] = 0; }
      });
      paint();
      if (moving) state.frame = requestAnimationFrame(step);
    };
    paint();
    if (appearance.motion && visible) state.frame = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(state.frame); if (repaintGuides.current === paint) repaintGuides.current = () => {}; };
  }, [activeIndex, appearance.motion, geometry, ready.host, visible, visibleSeries]);

  const release = () => { setPinned(false); setHovered(false); setKeyboardReading(false); };
  const weekAt = (clientX: number, clientY: number) => {
    const bounds = interaction.current?.getBoundingClientRect();
    if (!geometry || !bounds) return null;
    const x = clientX - bounds.left; const y = clientY - bounds.top;
    if (x < geometry.left - 4 || x > geometry.right + 4 || y < geometry.top || y > geometry.bottom) return null;
    return geometry.points.reduce((best, point, index) => Math.abs(point.x - x) < Math.abs(geometry.points[best]!.x - x) ? index : best, 0);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "Enter", " ", "Escape"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Escape") { release(); return; }
    setKeyboardReading(true);
    if (event.key === "Enter" || event.key === " ") setPinned(value => !value);
    else setActiveIndex(index => event.key === "Home" ? 0 : event.key === "End" ? 11 : clamp(index + (["ArrowLeft", "ArrowDown"].includes(event.key) ? -1 : 1), 0, 11));
  };
  const reading = (series: Series) => {
    const value = series === "本期" ? current[activeIndex] : PREVIOUS[activeIndex];
    return value === null ? "缺测" : `${value} 人次`;
  };

  return <section className="chart-sample trend-motion-sample" aria-labelledby="trend-sample-title" onClick={event => { if (event.target === event.currentTarget) release(); }}>
    <header className="chart-sample-heading"><div><p className="chart-eyebrow">01 · 趋势与面积</p><h2 id="trend-sample-title">每周学习参与</h2></div><span className="chart-recipe">P03 · 清晰线与轻面积</span></header>
    <div className="chart-controls" role="group" aria-label="趋势插值方式"><span>曲线</span>
      <Button size="small" variant={curve === "smooth" ? "secondary" : "text"} aria-pressed={curve === "smooth"} onClick={() => setCurve("smooth")}>平滑</Button>
      <Button size="small" variant={curve === "linear" ? "secondary" : "text"} aria-pressed={curve === "linear"} onClick={() => setCurve("linear")}>折线</Button>
    </div>
    <div className="chart-legend trend-legend" aria-label="趋势系列">
      {SERIES.map((series, index) => <button key={series} type="button" aria-pressed={visibleSeries.includes(series)} disabled={visibleSeries.length === 1 && visibleSeries[0] === series}
        onPointerEnter={() => setFocusedSeries(visibleSeries.includes(series) ? series : null)} onPointerLeave={() => setFocusedSeries(null)} onFocus={() => setFocusedSeries(visibleSeries.includes(series) ? series : null)} onBlur={() => setFocusedSeries(null)}
        onClick={() => { setFocusedSeries(null); setVisibleSeries(previous => previous.includes(series) ? previous.filter(item => item !== series) : SERIES.filter(item => item === series || previous.includes(item))); }}>
        <span className="trend-legend-swatch" style={{ background: colors[index] }} aria-hidden="true" />{series}
      </button>)}
      <span className="trend-legend-hint">悬停读取 · 点击固定</span>
    </div>
    <div ref={ready.host} className="chart-body trend-chart-body" data-chart-ready="false" data-render-count={0}>
      <svg className="trend-materials" aria-hidden="true"><defs>
        {colors.map((color, index) => <linearGradient id={`${uid}-fill-${index}`} key={index} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.2" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient>)}
        <linearGradient id={`${uid}-edge-gradient`}><stop offset="0%" stopColor="white" stopOpacity="0.12" /><stop offset="7%" stopColor="white" /><stop offset="93%" stopColor="white" /><stop offset="100%" stopColor="white" stopOpacity="0.12" /></linearGradient>
        <mask id={`${uid}-edge-mask`} maskUnits="userSpaceOnUse" x={geometry?.left ?? 0} y={geometry?.top ?? 0} width={geometry ? geometry.right - geometry.left : 1} height={geometry ? geometry.bottom - geometry.top : 1}><rect x={geometry?.left ?? 0} y={geometry?.top ?? 0} width={geometry ? geometry.right - geometry.left : 1} height={geometry ? geometry.bottom - geometry.top : 1} fill={`url(#${uid}-edge-gradient)`} /></mask>
      </defs><defs ref={materialClips} /><g ref={materialLayer} mask={`url(#${uid}-edge-mask)`} /></svg>
      <div className="trend-native" role="img" aria-label="十二周本期与上期学习参与趋势。本期第四周为零，第八周缺测。精确数值可在图后读取。"><NativeArea {...plotConfig} /></div>
      <div ref={interaction} className="trend-interaction" data-testid="trend-interaction" role="group" aria-label="趋势图交互区" aria-describedby={`${uid}-instructions`} tabIndex={0}
        data-active-week={activeIndex} data-pinned={pinned} data-motion={appearance.motion ? "spring" : "reduced"} data-visible={visible}
        onPointerDown={() => { pointerFocus.current = true; }}
        onPointerMove={event => { if (pinned) return; const index = weekAt(event.clientX, event.clientY); setHovered(index !== null); if (index !== null) setActiveIndex(index); }}
        onPointerLeave={() => setHovered(false)} onFocus={() => { if (!pointerFocus.current) setKeyboardReading(true); pointerFocus.current = false; }} onBlur={() => setKeyboardReading(false)} onKeyDown={onKeyDown}
        onClick={event => { const index = weekAt(event.clientX, event.clientY); if (index === null) release(); else { setActiveIndex(index); setPinned(true); setKeyboardReading(false); } }}>
        {geometry?.points.map((point, index) => <span key={index} data-week-index={index} className="trend-week-target" aria-hidden="true" style={{ left: point.x - 5, top: geometry.top, height: geometry.bottom - geometry.top }} />)}
        <svg className="trend-guides" aria-hidden="true"><defs><clipPath id={`${uid}-highlight`}><rect ref={highlightClip} y={geometry?.top ?? 0} width={84} height={geometry ? geometry.bottom - geometry.top : 0} /></clipPath></defs>
          <g ref={highlightLayer} clipPath={`url(#${uid}-highlight)`} />
          <rect ref={crosshair} data-testid="trend-crosshair" y={geometry?.top ?? 0} width={1} height={geometry ? geometry.bottom - geometry.top : 0} className="trend-crosshair" />
          {SERIES.map((series, index) => <g key={series} ref={element => { markers.current[index] = element; }} data-testid="trend-marker" data-series={series} style={{ visibility: visibleSeries.includes(series) && (index === 1 || current[activeIndex] !== null) ? undefined : "hidden" }}>
            <circle r={7} fill="var(--rain-local-chart-surface)" stroke={colors[index]} strokeOpacity={0.22} strokeWidth={5} /><circle r={4} fill="var(--rain-local-chart-surface)" stroke={colors[index]} strokeWidth={2} />
          </g>)}
        </svg>
        <div ref={datePill} data-testid="trend-date-pill" className="trend-date-pill">{WEEKS[activeIndex]}</div>
        <div ref={panel} role="tooltip" className="trend-tooltip"><div className="trend-tooltip-surface"><div className="trend-tooltip-heading"><strong>{WEEKS[activeIndex]}</strong><span>{pinned ? "已固定" : "学习参与"}</span></div>
          {visibleSeries.map(series => <div className="trend-tooltip-row" key={series}><span><i style={{ background: colors[SERIES.indexOf(series)] }} />{series}</span><strong>{reading(series)}</strong></div>)}
          <p>{pinned ? "Esc 取消固定" : "点击固定读数"}</p>
        </div></div>
      </div>
    </div>
    <div className="chart-readout"><label>趋势读数<select aria-label="趋势读数" value={activeIndex} onChange={event => { setActiveIndex(Number(event.target.value)); setKeyboardReading(true); }} onBlur={() => setKeyboardReading(false)}>{WEEKS.map((week, index) => <option key={week} value={index}>{week}</option>)}</select></label>
      <output data-testid="trend-readout" aria-live="polite">{WEEKS[activeIndex]}：{visibleSeries.map(series => `${series} ${reading(series)}`).join(" · ")}</output>
    </div>
    <p id={`${uid}-instructions`} className="chart-note">方向键切换周次，Enter / 空格固定，Esc 取消。第4周为真实零值；第8周缺测，保留断线。</p>
    <DataDisclosure headers={["周次", "本期（人次）", "上期（人次）"]} rows={WEEKS.map((week, index) => [week, current[index] ?? "缺测", PREVIOUS[index]!])} />
  </section>;
}
