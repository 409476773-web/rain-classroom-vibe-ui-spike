import type { CompositionSpaceTokenName } from "@rain-next/foundations";

export type ConnectedSurfaceConnection = "inset" | "merged";
export type ConnectedSurfaceMode = "tonal" | "plain" | "outlined";
/** Frozen approved-v0.4.2 candidate keys, drawn from existing Rain spacing keys. */
export interface ConnectedSurfaceGeometry {
  panelRadius?: Extract<CompositionSpaceTokenName, 0 | 6 | 8 | 10 | 12>;
  tabRadius?: Extract<CompositionSpaceTokenName, 0 | 4 | 6 | 8 | 10 | 12>;
  shoulder?: Extract<CompositionSpaceTokenName, 4 | 6 | 8>;
  trackInset?: Extract<CompositionSpaceTokenName, 0 | 8 | 16 | 20 | 24 | 28 | 32>;
}
export function resolveConnectedSurfaceGeometry(connection: ConnectedSurfaceConnection, geometry: ConnectedSurfaceGeometry = {}) {
  if (connection !== "inset" && connection !== "merged") throw new TypeError("ConnectedSurface connection must be inset or merged.");
  const values = { panelRadius: 10, tabRadius: 10, shoulder: 8, trackInset: 24, ...geometry };
  const choices = { panelRadius: [0, 6, 8, 10, 12], tabRadius: [0, 4, 6, 8, 10, 12], shoulder: [4, 6, 8], trackInset: [0, 8, 16, 20, 24, 28, 32] };
  for (const key of Object.keys(choices) as (keyof ConnectedSurfaceGeometry)[]) {
    if (!choices[key].includes(values[key])) throw new RangeError(`ConnectedSurface ${key} must use an approved geometry key.`);
  }
  // The 2px guard is a local construction constraint from the approved reference.
  const minimumInset = connection === "inset" ? values.panelRadius + values.shoulder + 2 : 0;
  return { ...values, connection, minimumInset, resolvedInset: connection === "inset" ? Math.max(values.trackInset, minimumInset) : 0,
    adjusted: connection === "inset" && values.trackInset < minimumInset, outerOwner: connection === "inset" ? "work-surface" : "frame" } as const;
}
export type ResolvedConnectedSurfaceGeometry = ReturnType<typeof resolveConnectedSurfaceGeometry>;
export interface ConnectedSurfaceMeasurement {
  width: number; height: number; seam: number;
  viewport: { x: number; width: number };
  active?: { x: number; y: number; width: number; height: number };
}
const n = (value: number) => Math.round(value * 1000) / 1000;

/** Approved single closed SVG union, in frame-local CSS px, with no semantic or business state. */
export function buildConnectedSurfacePath(measurement: ConnectedSurfaceMeasurement, geometry: ResolvedConnectedSurfaceGeometry, mode: ConnectedSurfaceMode) {
  if (!["tonal", "plain", "outlined"].includes(mode)) throw new TypeError("Unknown ConnectedSurface surfaceMode.");
  const { width: w, height: h, seam, viewport, active } = measurement;
  if (![w, h, seam, viewport.x, viewport.width].every(Number.isFinite) || w <= 0 || h <= 0 || viewport.width <= 0 || seam < 0 || seam >= h) return null;
  const e = mode === "outlined" ? 0.5 : 0, x0 = e, x1 = w - e, bottom = h - e;
  const pr = geometry.panelRadius, br = geometry.panelRadius;
  let a = active?.x ?? 0, b = a + (active?.width ?? 0); const t = active?.y ?? 0;
  const visible = Boolean(active && Object.values(active).every(Number.isFinite) && active.width > 0 && active.height > 0 && a >= viewport.x - 1 && b <= viewport.x + viewport.width + 1);
  const leftMerge = visible && geometry.connection === "merged" && a <= x0 + 1, rightMerge = visible && geometry.connection === "merged" && b >= x1 - 1;
  let path: string;
  if (visible) {
    a = Math.max(x0, a); b = Math.min(x1, b);
    const s = geometry.shoulder, tr = Math.min(geometry.tabRadius, (b - a) / 4), al = leftMerge ? a : Math.max(x0 + pr, a - s), be = rightMerge ? b : Math.min(x1 - pr, b + s);
    path = leftMerge
      ? `M ${n(a)} ${n(t + tr)} Q ${n(a)} ${n(t)} ${n(a + tr)} ${n(t)}`
      : `M ${n(x0)} ${n(seam + pr)} Q ${n(x0)} ${n(seam)} ${n(x0 + pr)} ${n(seam)} L ${n(al)} ${n(seam)} Q ${n(a)} ${n(seam)} ${n(a)} ${n(seam - s)} L ${n(a)} ${n(t + tr)} Q ${n(a)} ${n(t)} ${n(a + tr)} ${n(t)}`;
    path += ` L ${n(b - tr)} ${n(t)} Q ${n(b)} ${n(t)} ${n(b)} ${n(t + tr)}`;
    if (!rightMerge) path += ` L ${n(b)} ${n(seam - s)} Q ${n(b)} ${n(seam)} ${n(be)} ${n(seam)} L ${n(x1 - pr)} ${n(seam)} Q ${n(x1)} ${n(seam)} ${n(x1)} ${n(seam + pr)}`;
  } else {
    path = `M ${n(x0)} ${n(seam + pr)} Q ${n(x0)} ${n(seam)} ${n(x0 + pr)} ${n(seam)} L ${n(x1 - pr)} ${n(seam)} Q ${n(x1)} ${n(seam)} ${n(x1)} ${n(seam + pr)}`;
  }
  path += ` L ${n(x1)} ${n(bottom - br)} Q ${n(x1)} ${n(bottom)} ${n(x1 - br)} ${n(bottom)} L ${n(x0 + br)} ${n(bottom)} Q ${n(x0)} ${n(bottom)} ${n(x0)} ${n(bottom - br)} Z`;
  return { path, activeVisible: visible, leftMerge, rightMerge, viewBox: `0 0 ${w} ${h}` };
}
