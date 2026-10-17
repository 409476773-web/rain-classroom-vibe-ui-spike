import { useLayoutEffect, useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { compositionSpaceTokens } from "@rain-next/foundations";
import { buildConnectedSurfacePath, resolveConnectedSurfaceGeometry, type ConnectedSurfaceConnection, type ConnectedSurfaceGeometry, type ConnectedSurfaceMode } from "./connected-surface-geometry";
import "./connected-surface.css";

export interface ConnectedSurfaceProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  instanceId: string;
  connection?: ConnectedSurfaceConnection;
  surfaceMode?: ConnectedSurfaceMode;
  geometry?: ConnectedSurfaceGeometry;
  activeKey?: string | number | null;
  /** Semantic controls remain owned by the caller; Tabs.Nav is supported directly. */
  track: ReactNode;
  children: ReactNode;
}

export function ConnectedSurface({ instanceId, connection = "inset", surfaceMode = "tonal", geometry, activeKey, track, children, className, style, ...props }: ConnectedSurfaceProps) {
  if (!instanceId.trim()) throw new TypeError("ConnectedSurface requires an instanceId.");
  if (!["tonal", "plain", "outlined"].includes(surfaceMode)) throw new TypeError("Unknown ConnectedSurface surfaceMode.");
  const resolved = resolveConnectedSurfaceGeometry(connection, geometry);
  const frameRef = useRef<HTMLDivElement>(null), rowRef = useRef<HTMLDivElement>(null), panelRef = useRef<HTMLDivElement>(null), svgRef = useRef<SVGSVGElement>(null);
  const previousActive = useRef<HTMLElement | null>(null);
  const { panelRadius, tabRadius, shoulder, resolvedInset } = resolved;
  useLayoutEffect(() => {
    const frame = frameRef.current!, row = rowRef.current!, panel = panelRef.current!, svg = svgRef.current!, path = svg.querySelector("path")!;
    let cancelled = false, raf: number | null = null;
    const observed = new Set<Element>();
    const schedule = () => { if (!cancelled && raf === null) raf = requestAnimationFrame(measure); };
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    const observe = (node: Element | null) => { if (node && !observed.has(node)) { observer?.observe(node); observed.add(node); } };
    function measure() {
      raf = null;
      if (cancelled) return;
      const viewport = row.querySelector<HTMLElement>("[data-connected-viewport], .rain-tabs__viewport") ?? row;
      const active = row.querySelector<HTMLElement>('[data-connected-active="true"], [role="tab"][aria-selected="true"]');
      observe(viewport); observe(row.querySelector('[role="tablist"]')); observe(active);
      const r = frame.getBoundingClientRect(), w = frame.offsetWidth, h = frame.offsetHeight;
      if (!w || !h || !r.width || !r.height) { path.setAttribute("d", ""); frame.dataset.measured = "false"; return; }
      const scaleX = r.width / w, scaleY = r.height / h;
      let vr = viewport.getBoundingClientRect(), ar = active?.getBoundingClientRect();
      if (active && active !== previousActive.current && ar?.width) {
        previousActive.current = active;
        const inset = resolvedInset * scaleX;
        const dx = ar.left < vr.left + inset ? (ar.left - vr.left - inset) / scaleX : ar.right > vr.right - inset ? (ar.right - vr.right + inset) / scaleX : 0;
        if (dx) { viewport.scrollLeft += dx; vr = viewport.getBoundingClientRect(); ar = active.getBoundingClientRect(); }
      }
      const outline = buildConnectedSurfacePath({ width: w, height: h, seam: (panel.getBoundingClientRect().top - r.top) / scaleY,
        viewport: { x: (vr.left - r.left) / scaleX, width: vr.width / scaleX },
        active: ar ? { x: (ar.left - r.left) / scaleX, y: (ar.top - r.top) / scaleY, width: ar.width / scaleX, height: ar.height / scaleY } : undefined }, resolved, surfaceMode);
      path.setAttribute("d", outline?.path ?? "");
      if (outline) svg.setAttribute("viewBox", outline.viewBox);
      frame.dataset.measured = String(Boolean(outline)); frame.dataset.activeVisible = String(outline?.activeVisible ?? false);
      frame.dataset.leftMerged = String(outline?.leftMerge ?? false); frame.dataset.rightMerged = String(outline?.rightMerge ?? false);
    }
    [frame, row, panel].forEach(observe);
    const mutation = new MutationObserver(schedule);
    mutation.observe(row, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-selected", "data-connected-active", "hidden"] });
    row.addEventListener("scroll", schedule, true); window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule); document.fonts?.addEventListener("loadingdone", schedule);
    measure(); schedule();
    return () => {
      cancelled = true; if (raf !== null) cancelAnimationFrame(raf);
      observer?.disconnect(); mutation.disconnect(); row.removeEventListener("scroll", schedule, true); window.removeEventListener("resize", schedule);
      document.fonts?.removeEventListener("loadingdone", schedule);
    };
  }, [connection, surfaceMode, panelRadius, tabRadius, shoulder, resolvedInset, activeKey]);

  const variables = { ...style, "--rain-local-cs-panel-radius": compositionSpaceTokens[panelRadius as keyof typeof compositionSpaceTokens],
    "--rain-local-cs-tab-radius": compositionSpaceTokens[tabRadius as keyof typeof compositionSpaceTokens], "--rain-local-cs-shoulder": compositionSpaceTokens[shoulder as keyof typeof compositionSpaceTokens],
    "--rain-local-cs-safe-inset": `${resolvedInset}px` } as CSSProperties;
  return <div {...props} ref={frameRef} className={["rain-connected-surface", className].filter(Boolean).join(" ")} style={variables}
    data-rain-id="layout-connected-surface" data-instance-id={instanceId} data-connection={connection} data-surface-mode={surfaceMode}
    data-resolved-inset={resolvedInset} data-inset-adjusted={resolved.adjusted} data-outer-owner={resolved.outerOwner} data-measured="false">
    <svg ref={svgRef} className="rain-connected-surface__layer" aria-hidden="true" focusable="false"><path className="rain-connected-surface__union" /></svg>
    <div ref={rowRef} className="rain-connected-surface__row">{track}</div>
    <div ref={panelRef} className="rain-connected-surface__panel">{children}</div>
  </div>;
}
