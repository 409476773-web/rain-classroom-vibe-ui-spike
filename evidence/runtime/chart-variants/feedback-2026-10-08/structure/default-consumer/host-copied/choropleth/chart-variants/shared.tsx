import type { ChartRecipe } from "../chart-catalog";
import { useEffect, useState, type ReactNode, type SetStateAction } from "react";

export type VariantSettings = {
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
