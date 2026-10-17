"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type HTMLAttributes } from "react";
import { CHART_SCALE_VARS } from "../vendor/charts/chart-scale";
import { computeHeatmapEnterFadeDelayMs, HEATMAP_DEFAULT_ENTER_EASE } from "../vendor/charts/heatmap/heatmap-animation";
import { TooltipBox } from "../vendor/charts/tooltip/tooltip-box";
import { getMatrixDataIndex, getMatrixEncoding, type MatrixAxisItem, type MatrixCell, type MatrixEncodedCell, type MatrixEncoding } from "./matrix-data";
import "./matrix.css";

export interface MatrixChartProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  rows: readonly MatrixAxisItem[];
  columns: readonly MatrixAxisItem[];
  cells: readonly MatrixCell[];
  caption: string;
  encoding: MatrixEncoding;
  rowHeaderLabel?: string;
  valueFormat?: (value: number) => string;
  reducedMotion?: boolean;
}

const hoverEase = [.4, 0, .2, 1] as const;
type Coordinate = { rowId: string; columnId: string };
const coordinateKey = (rowId: string, columnId: string) => JSON.stringify([rowId, columnId]);
function paintedRadius(circle: SVGCircleElement, reduced: boolean): number {
  if (reduced || typeof CSS === "undefined" || !CSS.supports?.("r", "1px")) return Number(circle.getAttribute("r"));
  const computed = parseFloat(getComputedStyle(circle).getPropertyValue("r"));
  return Number.isFinite(computed) ? computed : Number(circle.getAttribute("r"));
}

function luminance(color: string): number | undefined {
  const rgb = color.match(/^rgba?\((.+)\)$/);
  const srgb = color.match(/^color\(srgb (.+)\)$/);
  const parts = (rgb?.[1] ?? srgb?.[1])?.split(/[\s,\/]+/).filter(Boolean);
  if (!parts || parts.length < 3 || (parts[3] && parseFloat(parts[3]) !== 1 && parts[3] !== "100%")) return undefined;
  const channels = parts.slice(0, 3).map(part => parseFloat(part) / (part.endsWith("%") ? 100 : rgb ? 255 : 1));
  if (channels.some(value => !Number.isFinite(value) || value < 0 || value > 1)) return undefined;
  return channels.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
    .reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index]!, 0);
}

function MatrixMark({ encoded, encoding, reduced, revealed = true, delay = 0, dimmed = false, legend = false, legendRadius }: {
  encoded: MatrixEncodedCell; encoding: MatrixEncoding["kind"]; reduced: boolean; revealed?: boolean; delay?: number; dimmed?: boolean; legend?: boolean; legendRadius?: number;
}) {
  const reading = useRef<SVGTextElement>(null);
  const [bounds, setBounds] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  useLayoutEffect(() => {
    if (!reading.current) return;
    const measure = () => {
      if (!reading.current?.getBBox) return;
      try {
        const next = reading.current.getBBox();
        setBounds(previous => previous && previous.x === next.x && previous.y === next.y && previous.width === next.width && previous.height === next.height ? previous : next);
      } catch { setBounds(null); }
    };
    measure();
    document.fonts?.addEventListener("loadingdone", measure);
    return () => document.fonts?.removeEventListener("loadingdone", measure);
  }, [encoded.label, encoded.kind, encoding]);
  const translateX = bounds ? 20 - bounds.x - bounds.width / 2 : 0;
  const translateY = bounds ? 20 - bounds.y - bounds.height / 2 : 0;
  const minRadius = bounds && bounds.width > 0 && bounds.height > 0 ? Math.hypot(bounds.width / 2, bounds.height / 2) + 1.5 : Infinity;
  const fits = minRadius <= (encoded.radius ?? 0);
  useLayoutEffect(() => {
    const label = reading.current?.parentElement, circle = reading.current?.ownerSVGElement?.querySelector("circle");
    if (label && circle) label.dataset.fit = minRadius <= paintedRadius(circle, reduced) ? "true" : "false";
  }, [minRadius, encoded.radius, reduced]);
  const visible = reduced || legend || revealed;
  const inactive = { animate: { opacity: dimmed ? .42 : 1 }, transition: { duration: reduced ? 0 : .22, ease: hoverEase } };
  return <motion.span className="rain-matrix__symbol-reading" data-slot="mark-container" aria-hidden={legend ? undefined : true}
    initial={reduced || legend ? false : { opacity: 0, scale: encoding === "bubble" ? .72 : .94 }}
    animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : encoding === "bubble" ? .72 : .94 }}
    transition={{ duration: reduced || legend ? 0 : .45, delay: reduced || legend ? 0 : delay, ease: HEATMAP_DEFAULT_ENTER_EASE }}>
    {encoded.kind !== "value" ? <motion.span {...inactive} className={"rain-matrix__" + encoded.kind} data-slot="cell-mark">{encoded.kind === "not-applicable" ? "—" : null}</motion.span> : <>
      {encoding === "heat" ? <motion.span {...inactive} className="rain-matrix__heat" data-slot="cell-mark" style={{ backgroundColor: encoded.color }} aria-hidden="true">
        <span data-slot="reading-container"><span data-slot="reading">{encoded.label}</span></span>
      </motion.span> : <motion.svg {...inactive} className="rain-matrix__symbol" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" data-slot="cell-mark">
        <circle cx="20" cy="20" r={legendRadius ?? encoded.radius} fill={encoded.color} />
        {encoding === "bubble" && encoded.value === 0 && <circle data-slot="zero-mark" cx="20" cy="20" r="2" />}
        {encoding === "bubble" && !legend && <g data-slot="reading-container" data-fit={fits ? "true" : "false"} data-min-radius={Number.isFinite(minRadius) ? minRadius : undefined} transform={bounds ? "translate(" + translateX + " " + translateY + ")" : undefined}>
          <text ref={reading} data-slot="reading" x="20" y="20" textAnchor="middle" dominantBaseline="central">{encoded.label}</text>
        </g>}
      </motion.svg>}
      {!legend && encoding === "heat" && <span className="rain-matrix__color-probe" data-slot="fill-probe" style={{ backgroundColor: encoded.color }} />}
      {legend && <span data-slot="reading">{encoded.label}</span>}
    </>}
  </motion.span>;
}

/** A native classification matrix; the host owns axis order, units and data. */
export function MatrixChart({ rows, columns, cells, caption, encoding, rowHeaderLabel = "项目", valueFormat, reducedMotion = false, className = "", ...props }: MatrixChartProps) {
  const instanceId = useId();
  const root = useRef<HTMLDivElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const rowProbe = useRef<HTMLSpanElement>(null);
  const darkProbe = useRef<HTMLSpanElement>(null);
  const lightProbe = useRef<HTMLSpanElement>(null);
  const cellRefs = useRef(new Map<string, HTMLTableCellElement>());
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const paintFrame = useRef<number | null>(null);
  const previousPaint = useRef<string | null>(null);
  const [active, setActive] = useState<Coordinate | null>(null);
  const [legendSelection, setLegendSelection] = useState<{ signature: string; index: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [rowHeaderWidth, setRowHeaderWidth] = useState(48);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!(reducedMotion || prefersReducedMotion);
  const index = getMatrixDataIndex(rows, columns, cells);
  const model = getMatrixEncoding(encoding, valueFormat);
  const empty = !rows.length || !columns.length;
  const legendSignature = JSON.stringify(encoding.kind === "heat" ? [encoding.kind, encoding.domain, encoding.steps] : encoding.kind === "bubble" ? [encoding.kind, encoding.domainMax] : [encoding.kind, encoding.levels.map(level => level.value)]);
  const legendCount = encoding.kind === "heat" && !encoding.steps ? 5 : model.legend.length;
  const legendIndex = !empty && legendSelection?.signature === legendSignature && legendSelection.index < legendCount ? legendSelection.index : null;
  const activeRow = active && rows.find(row => row.id === active.rowId);
  const activeColumn = active && columns.find(column => column.id === active.columnId);
  const activeData = active && index.get(active.rowId)?.get(active.columnId);
  const inspected = activeRow && activeColumn && activeData ? active : null;
  const activeReading = activeRow && activeColumn && activeData ? [activeRow.label, activeColumn.label, model.encode(activeData).label].join("，") : "";
  const encodedPaints = [...cells].sort((a, b) => a.rowId.localeCompare(b.rowId) || a.columnId.localeCompare(b.columnId)).map(cell => {
    const encoded = model.encode(cell);
    return [cell.rowId, cell.columnId, encoded.kind, encoded.value, encoded.radius, encoded.color];
  });

  function cancelHide() {
    if (hideTimer.current !== null) clearTimeout(hideTimer.current);
    hideTimer.current = null;
  }
  function dismiss() { cancelHide(); setActive(null); }
  function leaveCell() {
    cancelHide();
    hideTimer.current = setTimeout(() => { hideTimer.current = null; setActive(null); }, 120);
  }
  function locate(coordinate: Coordinate | null) {
    const bounds = root.current?.getBoundingClientRect();
    if (!bounds) return;
    const target = coordinate && cellRefs.current.get(coordinateKey(coordinate.rowId, coordinate.columnId))?.getBoundingClientRect();
    setPosition(previous => {
      const next = { x: target ? target.left + target.width / 2 - bounds.left : previous.x, y: target ? target.top + target.height / 2 - bounds.top : previous.y, width: bounds.width, height: bounds.height };
      return Object.keys(next).every(key => next[key as keyof typeof next] === previous[key as keyof typeof previous]) ? previous : next;
    });
  }
  function inspect(rowId: string, columnId: string, keyboard = false) {
    cancelHide();
    setLegendSelection(null);
    const next = { rowId, columnId };
    setActive(previous => previous?.rowId === rowId && previous.columnId === columnId ? previous : next);
    if (keyboard) {
      const target = cellRefs.current.get(coordinateKey(rowId, columnId));
      target?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
      if (target && scroll.current) {
        const cellBounds = target.getBoundingClientRect();
        const headingRight = target.parentElement?.querySelector("th")?.getBoundingClientRect().right ?? scroll.current.getBoundingClientRect().left;
        if (cellBounds.left < headingRight) scroll.current.scrollLeft -= headingRight - cellBounds.left;
      }
    }
    locate(next);
  }
  function inspectLegend(next: number | null) { cancelHide(); setActive(null); setLegendSelection(next === null ? null : { signature: legendSignature, index: next }); }

  useEffect(() => () => { cancelHide(); if (paintFrame.current !== null) cancelAnimationFrame(paintFrame.current); }, []);
  useLayoutEffect(() => {
    const measure = () => {
      const probe = rowProbe.current;
      if (!probe) return;
      let width = 0;
      for (const label of [rowHeaderLabel, ...rows.map(row => row.label)]) {
        probe.textContent = label;
        width = Math.max(width, probe.getBoundingClientRect().width);
      }
      probe.textContent = "";
      const available = scroll.current?.clientWidth || root.current?.clientWidth || 600;
      setRowHeaderWidth(Math.max(48, Math.min(Math.ceil(width + 16), 240, Math.floor(available * .4))));
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    if (root.current) observer?.observe(root.current);
    document.fonts?.addEventListener("loadingdone", measure);
    return () => { observer?.disconnect(); document.fonts?.removeEventListener("loadingdone", measure); };
  }, [rows, rowHeaderLabel, className, props.style, empty]);
  useEffect(() => { if (active && !inspected) dismiss(); }, [active, inspected]);
  useEffect(() => { if (legendSelection && legendIndex === null) setLegendSelection(null); }, [legendSelection, legendIndex]);
  useEffect(() => {
    if (empty || revealed) return;
    if (reduced || typeof IntersectionObserver === "undefined") { setRevealed(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setRevealed(true); observer.disconnect(); }
    }, { threshold: .08 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, [empty, reduced, revealed]);
  useLayoutEffect(() => {
    const update = () => locate(active);
    update();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    if (root.current) observer?.observe(root.current);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => { observer?.disconnect(); window.removeEventListener("resize", update); window.removeEventListener("scroll", update, true); };
  }, [active, rows, columns, cells, rowHeaderWidth]);
  useLayoutEffect(() => {
    const dark = darkProbe.current && luminance(getComputedStyle(darkProbe.current).color);
    const light = lightProbe.current && luminance(getComputedStyle(lightProbe.current).color);
    const measure = () => {
      for (const probe of root.current?.querySelectorAll<HTMLElement>('[data-slot="fill-probe"]') ?? []) {
        const mark = probe.parentElement?.querySelector<HTMLElement>('.rain-matrix__heat');
        const background = (mark ? luminance(getComputedStyle(mark).backgroundColor) : undefined) ?? luminance(getComputedStyle(probe).backgroundColor);
        const label = mark?.querySelector<HTMLElement>('[data-slot="reading-container"]');
        if (!label) continue;
        const contrast = (text: number | undefined | null) => text == null || background == null ? 0 : (Math.max(text, background) + .05) / (Math.min(text, background) + .05);
        const darkRatio = contrast(dark), lightRatio = contrast(light);
        label.dataset.tone = darkRatio >= lightRatio ? "dark" : "light";
      }
      for (const label of root.current?.querySelectorAll<SVGGElement>('td svg [data-slot="reading-container"]') ?? []) {
        const circle = label.ownerSVGElement?.querySelector("circle");
        if (circle) label.dataset.fit = Number(label.dataset.minRadius ?? Infinity) <= paintedRadius(circle, reduced) ? "true" : "false";
      }
    };
    measure();
    const fills = [...root.current?.querySelectorAll<HTMLElement>('[data-slot="fill-probe"]') ?? []].map(probe => {
      const cell = probe.closest("td")!;
      return [cell.dataset.rowId!, cell.dataset.columnId!, getComputedStyle(probe).backgroundColor];
    }).sort((a, b) => a[0]!.localeCompare(b[0]!) || a[1]!.localeCompare(b[1]!));
    const signature = JSON.stringify([encoding.kind, encodedPaints, fills, props.style, (props as { "data-recipe"?: string })["data-recipe"], empty]);
    if (!reduced && previousPaint.current === signature) return;
    previousPaint.current = signature;
    if (paintFrame.current !== null) cancelAnimationFrame(paintFrame.current);
    paintFrame.current = null;
    if (reduced || empty) return;
    const end = performance.now() + 500;
    paintFrame.current = requestAnimationFrame(function sample(now) {
      measure();
      paintFrame.current = now < end ? requestAnimationFrame(sample) : null;
    });
  });
  const layoutTransition = { layout: { duration: reduced ? 0 : .45, ease: hoverEase } };
  // ponytail: native table coverage is 12×12 and 7×24; profile larger workloads before adding virtualization.
  return <div {...props} ref={root} style={{ ...props.style, "--rain-matrix-row-width": rowHeaderWidth + "px" } as CSSProperties} className={"rain-chart rain-matrix " + className} data-rain-id="ui-chart-matrix" data-variant={encoding.kind} data-state={empty ? "empty" : "normal"} data-reduced-motion={reduced ? "true" : undefined} data-revealed={reduced || revealed ? "true" : "false"}>
    <span className="rain-matrix__row-probe" aria-hidden="true"><span ref={rowProbe} /></span>
    <span ref={darkProbe} className="rain-matrix__color-probe rain-matrix__color-probe--dark" aria-hidden="true" />
    <span ref={lightProbe} className="rain-matrix__color-probe rain-matrix__color-probe--light" aria-hidden="true" />
    {empty ? <><p className="rain-matrix__caption">{caption}</p><p role="status" className="rain-matrix__empty">暂无矩阵数据</p></> : <>
      <span id={instanceId + "-instructions"} className="rain-matrix__sr-only">使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。</span>
      <span id={instanceId + "-inspection"} className="rain-matrix__sr-only" role="status" aria-live="polite" aria-atomic="true">{activeReading}</span>
      <div ref={scroll} className="rain-matrix__scroll" data-slot="scroll-container" role="region" aria-label={caption + "，可横向滚动"} aria-describedby={instanceId + "-instructions " + instanceId + "-inspection"} tabIndex={0}
        onFocus={event => { if (event.target === event.currentTarget) inspect(inspected?.rowId ?? rows[0]!.id, inspected?.columnId ?? columns[0]!.id, true); }}
        onBlur={() => dismiss()} onScroll={() => locate(active)}
        onKeyDown={event => {
          if (event.key === "Escape") { event.preventDefault(); dismiss(); return; }
          if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          let row = Math.max(0, rows.findIndex(item => item.id === active?.rowId)), column = Math.max(0, columns.findIndex(item => item.id === active?.columnId));
          if (event.key === "ArrowLeft") column = Math.max(0, column - 1);
          if (event.key === "ArrowRight") column = Math.min(columns.length - 1, column + 1);
          if (event.key === "ArrowUp") row = Math.max(0, row - 1);
          if (event.key === "ArrowDown") row = Math.min(rows.length - 1, row + 1);
          if (event.key === "Home") { column = 0; if (event.ctrlKey) row = 0; }
          if (event.key === "End") { column = columns.length - 1; if (event.ctrlKey) row = rows.length - 1; }
          inspect(rows[row]!.id, columns[column]!.id, true);
        }}>
        <table className="rain-matrix__table" data-slot="table" style={{ minWidth: rowHeaderWidth + columns.length * 72 + (columns.length + 2) * (encoding.kind === "heat" ? 1 : 4) }}>
          <caption>{caption}</caption>
          <colgroup><col style={{ width: rowHeaderWidth }} />{columns.map(column => <col key={column.id} />)}</colgroup>
          <thead><tr><th scope="col" className="rain-matrix__row-heading">{rowHeaderLabel}</th>{columns.map((column, columnIndex) => <motion.th key={column.id} layout={reduced ? false : "position"} transition={layoutTransition} id={instanceId + "-column-" + columnIndex} scope="col" data-active={inspected?.columnId === column.id ? "true" : undefined}>{column.label}</motion.th>)}</tr></thead>
          <tbody>{rows.map((row, rowIndex) => <tr key={row.id}>
            <motion.th layout={reduced ? false : "position"} transition={layoutTransition} id={instanceId + "-row-" + rowIndex} scope="row" className="rain-matrix__row-heading" data-active={inspected?.rowId === row.id ? "true" : undefined}>{row.label}</motion.th>
            {columns.map((column, columnIndex) => {
              const encoded = model.encode(index.get(row.id)!.get(column.id)!);
              const selected = inspected?.rowId === row.id && inspected.columnId === column.id;
              const highlighted = legendIndex === null ? null : encoded.kind !== "value" ? false : encoding.kind === "heat" ? encoding.steps ? encoded.value === model.legend[legendIndex]?.value : Math.min(4, Math.floor((encoded.fraction ?? 0) * 5)) === legendIndex
                : encoding.kind === "level" ? encoded.value === model.legend[legendIndex]?.value
                : encoding.domainMax === 0 ? encoded.value === 0 : (encoded.value ?? 0) > (model.legend[legendIndex - 1]?.value ?? 0) && (encoded.value ?? 0) <= (model.legend[legendIndex]?.value ?? 0);
              const dimmed = highlighted === false || !!inspected && inspected.rowId !== row.id && inspected.columnId !== column.id;
              const delay = computeHeatmapEnterFadeDelayMs({ column: columnIndex, row: rowIndex, revealEpoch: 0, animationDurationMs: 1100, enterStaggerScale: 1, fadeDurationSec: .45 }) / 1000;
              return <motion.td key={column.id} layout={reduced ? false : "position"} transition={layoutTransition} onLayoutAnimationComplete={selected ? () => locate(inspected) : undefined}
                ref={node => { const key = coordinateKey(row.id, column.id); if (node) cellRefs.current.set(key, node); else cellRefs.current.delete(key); }}
                headers={instanceId + "-row-" + rowIndex + " " + instanceId + "-column-" + columnIndex} aria-label={encoded.label} data-slot="cell" data-row-id={row.id} data-column-id={column.id} data-state={encoded.kind === "value" && encoded.value === 0 ? "zero" : encoded.kind}
                data-active={selected ? "true" : undefined} data-highlighted={highlighted === null ? undefined : String(highlighted)} onPointerEnter={() => inspect(row.id, column.id)} onPointerLeave={leaveCell}>
                <MatrixMark encoded={encoded} encoding={encoding.kind} reduced={reduced} revealed={revealed} delay={delay} dimmed={dimmed} />
              </motion.td>;
            })}
          </tr>)}</tbody>
        </table>
      </div>
      <ul className={"rain-matrix__legend" + (encoding.kind === "heat" ? encoding.steps ? " rain-matrix__legend--steps" : " rain-matrix__legend--heat" : "")} data-slot="legend" aria-label={caption + "图例"} aria-description={encoding.kind === "bubble" ? "气泡大小仅作提示，精确数量以数值为准。" : undefined}>
        {encoding.kind === "heat" && !encoding.steps ? <li>
          <div className="rain-matrix__legend-gradient" data-slot="legend-gradient" style={{ backgroundImage: "linear-gradient(to right, " + CHART_SCALE_VARS.join(", ") + ")" }}>
            {CHART_SCALE_VARS.map((_, range) => {
              const from = encoding.domain[0] + (encoding.domain[1] - encoding.domain[0]) * range / 5;
              const to = encoding.domain[0] + (encoding.domain[1] - encoding.domain[0]) * (range + 1) / 5;
              const label = (valueFormat ? valueFormat(from) : String(Number(from.toPrecision(12)))) + "–" + (valueFormat ? valueFormat(to) : String(Number(to.toPrecision(12))));
              return <span key={range} className="rain-matrix__legend-range" data-slot="legend-range" role="button" tabIndex={0} aria-label={label} data-active={legendIndex === range ? "true" : undefined} style={{ left: range * 20 + "%" }}
                onPointerEnter={() => inspectLegend(range)} onPointerLeave={event => { if (document.activeElement !== event.currentTarget) inspectLegend(null); }} onFocus={() => inspectLegend(range)} onBlur={() => inspectLegend(null)}
                onClick={() => inspectLegend(range)} onKeyDown={event => { if (event.key === "Escape") inspectLegend(null); else if (event.key === "Enter" || event.key === " ") { event.preventDefault(); inspectLegend(range); } }} />;
            })}
          </div>
          <div className="rain-matrix__legend-endpoints">{model.legend.map(encoded => <span key={encoded.value}>{encoded.label}</span>)}</div>
        </li> : model.legend.map((encoded, itemIndex) => <li key={encoded.value} role="button" tabIndex={0} aria-label={encoded.label} data-active={legendIndex === itemIndex ? "true" : undefined}
          onPointerEnter={() => inspectLegend(itemIndex)} onPointerLeave={event => { if (document.activeElement !== event.currentTarget) inspectLegend(null); }} onFocus={() => inspectLegend(itemIndex)} onBlur={() => inspectLegend(null)}
          onClick={() => inspectLegend(itemIndex)} onKeyDown={event => { if (event.key === "Escape") inspectLegend(null); else if (event.key === "Enter" || event.key === " ") { event.preventDefault(); inspectLegend(itemIndex); } }}>
          {encoding.kind === "heat" ? <><span className="rain-matrix__legend-step" data-slot="legend-step" aria-hidden="true" style={{ backgroundColor: encoded.color }} /><span data-slot="reading">{encoded.label}</span></> : <MatrixMark encoded={encoded} encoding={encoding.kind} reduced={reduced} legend legendRadius={encoding.kind === "bubble" ? encoded.value === 0 ? 0 : 8 + itemIndex * 4 : undefined} />}
        </li>)}
      </ul>
      <TooltipBox containerRef={root} containerWidth={position.width} containerHeight={position.height} x={position.x} y={position.y} visible={!!activeReading} animate={!reduced} entrance={!reduced} className="rain-matrix__tooltip">
        <div role="tooltip" className="rain-matrix__tooltip-content">
          <div>{activeRow && activeColumn ? activeRow.label + " · " + activeColumn.label : ""}</div>
          <div className="rain-matrix__tooltip-value">{activeData ? model.encode(activeData).label : ""}</div>
        </div>
      </TooltipBox>
    </>}
  </div>;
}
