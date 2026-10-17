import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, animate, motion, useIsPresent, useMotionValue, useTransform } from "motion/react";
import { IconButton, Tooltip } from "@rain-next/ui";
import { AddIcon } from "@rain-next/ui/icons/add";
import { MinusIcon } from "@rain-next/ui/icons/minus";
import { RefreshIcon } from "@rain-next/ui/icons/refresh";
import { ChoroplethChart, TooltipBox, TooltipContent, useChoropleth, useChoroplethZoom, type TransformMatrix } from "@rain-next/ui/charts";
import { chinaIntensityColor, getChinaRegion, type ChinaCollection } from "./china-region-data";

export type ChinaMapView = { matrix: TransformMatrix; width: number; height: number };
export type ChinaMapFocus = { x: number; y: number; direction: "in" | "out" };
export const chinaMapIdentity: TransformMatrix = { scaleX: 1, scaleY: 1, translateX: 0, translateY: 0, skewX: 0, skewY: 0 };
export const chinaReading = (value: number | null) => value == null ? "无数据" : `${value.toLocaleString("zh-CN")} 人`;

// The installed Motion hook retains its initial preference; this local sample follows live changes.
export function useChinaReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    change(); media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  return reduced;
}

function MapFeatures({ selectedId, max, onActivate }: { selectedId: string | null; max: number; onActivate: (id: string, focus?: ChinaMapFocus) => void }) {
  const { features, featurePaths, hoveredFeatureIndex, setHoveredFeatureIndex, setTooltipData, containerRef } = useChoropleth();
  const { zoom } = useChoroplethZoom();
  const enter = (index: number, event: PointerEvent<SVGPathElement>) => {
    if (event.pointerType === "touch" || zoom?.isDragging) return;
    const bounds = containerRef.current!.getBoundingClientRect();
    setHoveredFeatureIndex(index);
    setTooltipData({ featureIndex: index, feature: features[index]!, x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  };
  const leave = () => { setHoveredFeatureIndex(null); setTooltipData(null); };
  const hovered = hoveredFeatureIndex == null ? undefined : features[hoveredFeatureIndex];
  return <g className="choropleth-features rain-china-features">
    {features.map((feature, index) => {
      const id = String(feature.properties.id), selected = selectedId === id;
      return <path key={id} d={featurePaths[index] ?? undefined} data-feature-id={id} data-selected={selected || undefined}
        fill={chinaIntensityColor(typeof feature.properties.value === "number" ? feature.properties.value : null, max)}
        stroke={selected ? "var(--chart-indicator-color)" : "var(--chart-background)"} strokeWidth={selected ? 1.8 : .7} vectorEffect="non-scaling-stroke"
        onPointerEnter={event => enter(index, event)} onPointerLeave={leave}
        onClick={event => {
          if (zoom?.isDragging) return;
          leave();
          const plot = containerRef.current!.getBoundingClientRect(), region = event.currentTarget.getBoundingClientRect();
          onActivate(id, { x: plot.width > 0 ? (region.left + region.width / 2 - plot.left) / plot.width : .5, y: plot.height > 0 ? (region.top + region.height / 2 - plot.top) / plot.height : .5, direction: "in" });
        }} />;
    })}
    {hovered && !zoom?.isDragging && <path key="hover-outline" d={featurePaths[hoveredFeatureIndex!] ?? undefined} fill="none" stroke="var(--chart-indicator-color)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" pointerEvents="none" />}
  </g>;
}
// Use the existing Choropleth SVG slot; the private layer keeps other map examples unchanged.
MapFeatures.displayName = "ChoroplethFeature";

function MapBindings({ view, onView, reduced }: { view?: ChinaMapView; onView: (view: ChinaMapView) => void; reduced: boolean }) {
  const { width, height, containerRef, tooltipData, setTooltipData, setHoveredFeatureIndex } = useChoropleth();
  const { zoom } = useChoroplethZoom();
  const restored = useRef(false), pointers = useRef(new Set<number>());
  const lastView = useRef(view);
  const initialView = useRef(view);
  const expected = useRef<TransformMatrix | null>(null);

  useLayoutEffect(() => {
    if (!zoom) return;
    const saved = restored.current ? lastView.current : initialView.current;
    if (!restored.current || saved && (saved.width !== width || saved.height !== height)) {
      const matrix = saved ? { ...saved.matrix, translateX: saved.matrix.translateX * width / saved.width, translateY: saved.matrix.translateY * height / saved.height } : chinaMapIdentity;
      expected.current = matrix;
      zoom.setTransformMatrix(matrix);
      restored.current = true;
    }
  }, [width, height, zoom?.setTransformMatrix]);

  useLayoutEffect(() => {
    if (!zoom) return;
    const svg = zoom.containerRef.current, group = svg?.querySelector<SVGGElement>(":scope > g");
    // Local gesture policy: ordinary scrolling belongs to the page, while pinch stays native visx.
    if (svg) svg.style.touchAction = zoom.transformMatrix.scaleX <= 1.001 ? "pan-y" : "none";
    if (group) group.style.transition = reduced || zoom.isDragging || pointers.current.size ? "none" : "transform 240ms cubic-bezier(.2,.7,.2,1)";
    const target = expected.current;
    if (target && Object.keys(target).some(key => target[key as keyof TransformMatrix] !== zoom.transformMatrix[key as keyof TransformMatrix])) return;
    expected.current = null;
    const snapshot = { matrix: { ...zoom.transformMatrix }, width, height };
    lastView.current = snapshot;
    onView(snapshot);
    if (zoom.isDragging) { setTooltipData(null); setHoveredFeatureIndex(null); }
  }, [zoom?.transformMatrix, zoom?.isDragging, width, height, reduced, onView, setTooltipData, setHoveredFeatureIndex]);

  useEffect(() => {
    const svg = zoom?.containerRef.current;
    if (!svg) return;
    const down = (event: globalThis.PointerEvent) => {
      pointers.current.add(event.pointerId);
      const group = svg.querySelector<SVGGElement>(":scope > g");
      if (group) group.style.transition = "none";
      setTooltipData(null); setHoveredFeatureIndex(null);
    };
    const up = (event: globalThis.PointerEvent) => {
      pointers.current.delete(event.pointerId);
      if (!pointers.current.size) {
        const group = svg.querySelector<SVGGElement>(":scope > g");
        if (group) group.style.transition = reduced ? "none" : "transform 240ms cubic-bezier(.2,.7,.2,1)";
      }
    };
    svg.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
    return () => { svg.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up); };
  }, [zoom?.containerRef, reduced, setTooltipData, setHoveredFeatureIndex]);

  const scale = zoom?.transformMatrix.scaleX ?? 1;
  const shifted = zoom && (Math.abs(zoom.transformMatrix.translateX) > .5 || Math.abs(zoom.transformMatrix.translateY) > .5 || Math.abs(scale - 1) > .001);
  return <>
    <div className="rain-china-map-controls" role="group" aria-label="地图视图工具">
      <Tooltip text="放大" placement="top"><IconButton size="28/14" icon={<AddIcon />} aria-label="放大地图" disabled={!zoom || scale >= 4 - .001} onClick={() => zoom?.scale({ scaleX: 1.25, scaleY: 1.25, point: { x: width / 2, y: height / 2 } })} /></Tooltip>
      <Tooltip text="缩小" placement="top"><IconButton size="28/14" icon={<MinusIcon />} aria-label="缩小地图" disabled={!zoom || scale <= 1.001} onClick={() => zoom?.scale({ scaleX: .8, scaleY: .8, point: { x: width / 2, y: height / 2 } })} /></Tooltip>
      <Tooltip text="恢复当前范围" placement="top"><IconButton size="28/14" icon={<RefreshIcon />} aria-label="恢复地图视图" disabled={!shifted} onClick={() => { setTooltipData(null); setHoveredFeatureIndex(null); zoom?.setTransformMatrix(chinaMapIdentity); }} /></Tooltip>
    </div>
    <AnimatePresence>
      {tooltipData && !zoom?.isDragging && <TooltipBox key="china-reading-tooltip" x={tooltipData.x} y={tooltipData.y} visible containerRef={containerRef} containerWidth={width} containerHeight={height}
        className="rain-chart-tooltip" animate={!reduced} entrance={!reduced} offset={12}>
        <TooltipContent title={String(tooltipData.feature.properties.name)} rows={[{ label: "参与人数", value: chinaReading(typeof tooltipData.feature.properties.value === "number" ? tooltipData.feature.properties.value : null), color: "var(--chart-scale-03)" }]} />
        <p className="rain-china-tooltip-action">{getChinaRegion(String(tooltipData.feature.properties.id)).hasChildren ? "点击查看省内" : "点击查看地区详情"}</p>
      </TooltipBox>}
    </AnimatePresence>
  </>;
}

export function ChinaRegionMap({ data, layerId, selectedId, max, view, onView, onActivate, focus, reduced }: { data: ChinaCollection; layerId: string; selectedId: string | null; max: number; view?: ChinaMapView; onView: (view: ChinaMapView) => void; onActivate: (id: string, focus?: ChinaMapFocus) => void; focus: ChinaMapFocus; reduced: boolean }) {
  const present = useIsPresent();
  return <motion.div className="rain-china-layer" data-map-active={present} data-map-layer={layerId}
    initial={{ opacity: 0, scale: reduced ? 1 : focus.direction === "out" ? 1.04 : .96 }} animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
    custom={focus} variants={{ leave: (next: ChinaMapFocus) => ({ opacity: 0, scale: reduced ? 1 : next.direction === "in" ? 1.5 : .94, x: reduced ? 0 : `${(.5 - next.x) * 20}%`, y: reduced ? 0 : `${(.5 - next.y) * 20}%` }) }}
    exit="leave" transition={{ duration: reduced ? 0 : .36, ease: [.2, .7, .2, 1] }}
    style={{ pointerEvents: present ? "auto" : "none", transformOrigin: `${focus.x * 100}% ${focus.y * 100}%` }}
    onWheelCapture={event => { if (!event.ctrlKey) event.stopPropagation(); }}>
    <ChoroplethChart data={data} className="rain-china-map" fitToData zoomEnabled zoomMin={1} zoomMax={4} aspectRatio="auto" animationDuration={0} enterTransition={{ duration: 0 }} margin={{ top: 24, right: 24, bottom: 24, left: 24 }}>
      <MapFeatures selectedId={selectedId} max={max} onActivate={onActivate} />
      <MapBindings view={view} onView={onView} reduced={reduced} />
    </ChoroplethChart>
  </motion.div>;
}

export function ChinaAnimatedReading({ value, reduced }: { value: number | null; reduced: boolean }) {
  const number = useMotionValue(value ?? 0);
  const formatted = useTransform(number, current => Math.round(current).toLocaleString("zh-CN"));
  useEffect(() => {
    if (value == null) return;
    if (reduced) { number.set(value); return; }
    const controls = animate(number, value, { duration: .28, ease: "easeOut" });
    return () => controls.stop();
  }, [value, reduced, number]);
  if (value == null) return <span>无数据</span>;
  return <><span className="rain-china-sr-only">{chinaReading(value)}</span><span aria-hidden="true"><motion.span>{formatted}</motion.span><span className="rain-china-unit">人</span></span></>;
}
