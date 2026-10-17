import { ChartLegend, curveMonotoneX, curveNatural, type LegendItem as LegendItemData } from "@rain-next/ui/charts";
import type { ChartRecipe } from "../chart-catalog";
import type { ChartBoundaryScenario } from "../chart-data";
import { useEffect, useState, type ReactNode, type SetStateAction } from "react";

export type VariantSettings = {
  boundaryScenario?: ChartBoundaryScenario;
  loading?: boolean;
  state?: "normal" | "zero" | "long";
  value?: number | null;
  paused?: boolean;
  points?: { time: number; value: number }[];
  frozenNow?: number;
  focusId?: string;
  brush?: [string, string] | null;
};

export type VariantExampleProps = {
  variantId: string;
  recipe: ChartRecipe;
  revision: number;
  replay: number;
  reduced: boolean;
  /** False outside the viewport or while the document is hidden. Stop all loops. */
  active: boolean;
  settings?: VariantSettings;
  onSettingsChange?: (patch: VariantSettings) => void;
  curveName?: string;
  onCurveChange?: (value: string) => void;
};

export function useVariantSetting<K extends keyof VariantSettings>(key: K, fallback: Required<VariantSettings>[K], props: Pick<VariantExampleProps, "settings" | "onSettingsChange">): [Required<VariantSettings>[K], (value: SetStateAction<Required<VariantSettings>[K]>) => void] {
  const [local, setLocal] = useState(fallback);
  const current = props.settings?.[key] === undefined ? local : props.settings[key] as Required<VariantSettings>[K];
  const set = (value: SetStateAction<Required<VariantSettings>[K]>) => {
    const next = typeof value === "function" ? value(current) : value;
    setLocal(next);
    props.onSettingsChange?.({ [key]: next });
  };
  return [current, set];
}

export function useChartReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    change();
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  return reduced;
}

export const immediate = { type: "tween" as const, duration: 0 };
export const seriesColors = [1, 2, 3, 4, 5].map(index => `var(--chart-${index})`);

export function trendCurve(data: Record<string, unknown>[], dataKey: string) {
  const values = data.map(point => point[dataKey] as number | null);
  // Preserve flat readings and sharply slowing endpoints in the calibrated mock scenes.
  if (values.some((value, index) => value == null || value === 0 || index > 0 && value === values[index - 1])) return curveMonotoneX;
  const slopes = values.slice(1).map((value, index) => value! - values[index]!);
  const slowsAtEdge = slopes.length > 1 && (Math.abs(slopes[0]!) < Math.abs(slopes[1]!) / 3 || Math.abs(slopes.at(-1)!) < Math.abs(slopes.at(-2)!) / 3);
  return slowsAtEdge ? curveMonotoneX : curveNatural;
}

export function ExampleLegend({ items, hovered, onHover, showValue = false }: { items: LegendItemData[]; hovered: number | null; onHover: (index: number | null) => void; showValue?: boolean }) {
  const safeHovered = hovered != null && Number.isInteger(hovered) && hovered >= 0 && hovered < items.length ? hovered : null;
  return <ChartLegend className="rain-chart-legend" labelClassName="text-sm font-normal" valueClassName="text-sm font-normal" showValue={showValue} hoveredIndex={safeHovered} onHover={onHover} items={items}
    renderItem={({ item, index, isHovered, isFaded }) => <button type="button" className="rain-chart-legend-button" onFocus={() => onHover(index)} onBlur={() => onHover(null)} onClick={() => onHover(index)} style={{ display: "flex", alignItems: "center", gap: 8, border: 0, borderRadius: 8, padding: "6px 8px", font: "inherit", color: "var(--legend-foreground)", background: isHovered ? "var(--legend-muted)" : "transparent", opacity: isFaded ? .4 : 1, cursor: "pointer" }}>
      <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0, background: item.color }} /><span>{item.label}</span>{showValue && <span style={{ color: "var(--legend-muted-foreground)" }}>{item.value}</span>}
    </button>} />;
}

export function VariantTable({ data, caption = "示例精确数据" }: { data: Record<string, unknown>[]; caption?: string }) {
  const keys = Array.from(new Set(data.flatMap(row => Object.keys(row))));
  function cell(value: unknown): ReactNode {
    if (value instanceof Date) return [value.getFullYear(), String(value.getMonth() + 1).padStart(2, "0"), String(value.getDate()).padStart(2, "0")].join("-");
    if (value == null) return "缺测";
    return typeof value === "object" ? JSON.stringify(value) : String(value);
  }
  return <details className="rain-chart-data"><summary>查看精确数据</summary><div tabIndex={0} aria-label="精确数据表，可横向滚动"><table>
    <caption>{caption}</caption><thead><tr>{keys.map(key => <th key={key} scope="col">{key}</th>)}</tr></thead>
    <tbody>{data.map((row, index) => <tr key={index}>{keys.map((key, column) => column === 0 ? <th key={key} scope="row">{cell(row[key])}</th> : <td key={key}>{cell(row[key])}</td>)}</tr>)}</tbody>
  </table></div></details>;
}
