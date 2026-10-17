import { CHART_SCALE_VARS } from "../vendor/charts/chart-scale";

export interface MatrixAxisItem { id: string; label: string }
export type MatrixCell = { rowId: string; columnId: string } & (
  | { kind: "value"; value: number }
  | { kind: "missing"; label?: string }
  | { kind: "not-applicable"; label?: string }
);
export interface MatrixLevel { value: number; label: string; color: string }
export type MatrixEncoding =
  | { kind: "heat"; domain: readonly [number, number]; steps?: readonly number[] }
  | { kind: "bubble"; domainMax: number; maxRadius?: number }
  | { kind: "level"; levels: readonly MatrixLevel[] };
export interface MatrixEncodedCell {
  kind: MatrixCell["kind"];
  label: string;
  color: string;
  value?: number;
  fraction?: number;
  radius?: number;
}

function sequentialColor(fraction: number): string {
  const position = fraction * (CHART_SCALE_VARS.length - 1);
  const lower = Math.floor(position);
  const weight = (position - lower) * 100;
  return weight === 0 ? CHART_SCALE_VARS[lower]! : `color-mix(in srgb, ${CHART_SCALE_VARS[lower + 1]} ${weight}%, ${CHART_SCALE_VARS[lower]})`;
}

export function getMatrixDataIndex(rows: readonly MatrixAxisItem[], columns: readonly MatrixAxisItem[], cells: readonly MatrixCell[]): ReadonlyMap<string, ReadonlyMap<string, MatrixCell>> {
  const rowIds = new Set(rows.map(row => row.id));
  const columnIds = new Set(columns.map(column => column.id));
  if (rowIds.size !== rows.length || columnIds.size !== columns.length) throw new Error("矩阵轴 ID 重复");
  const index = new Map(rows.map(row => [row.id, new Map<string, MatrixCell>()]));
  for (const cell of cells) {
    const row = index.get(cell.rowId);
    if (!row || !columnIds.has(cell.columnId)) throw new Error("矩阵单元格引用未知轴 ID");
    if (row.has(cell.columnId)) throw new Error("矩阵单元格坐标重复");
    row.set(cell.columnId, cell);
  }
  for (const [rowId, row] of index) {
    for (const { id: columnId } of columns) {
      if (!row.has(columnId)) row.set(columnId, { rowId, columnId, kind: "missing" });
    }
  }
  return index;
}

export function getMatrixEncoding(encoding: MatrixEncoding, valueFormat: (value: number) => string = String): { encode: (cell: MatrixCell) => MatrixEncodedCell; legend: MatrixEncodedCell[] } {
  let legendValues: number[];
  if (encoding.kind === "heat") {
    const [min, max] = encoding.domain;
    if (encoding.domain.length !== 2 || !Number.isFinite(min) || !Number.isFinite(max) || max <= min || !Number.isFinite(max - min)) throw new Error("热度值域必须有限且严格递增");
    const { steps } = encoding;
    if (steps !== undefined && (!Array.isArray(steps) || !steps.length || steps[0] !== min || steps[steps.length - 1] !== max || steps.some((step, index) => !Number.isFinite(step) || step < min || step > max || index > 0 && step <= steps[index - 1]!))) throw new Error("热度步值必须有限、严格递增、位于值域内且包含两个端点");
    legendValues = steps ? [...steps] : [min, max];
  } else if (encoding.kind === "bubble") {
    if (!Number.isFinite(encoding.domainMax) || encoding.domainMax < 0) throw new Error("气泡值域必须是有限非负最大值");
    const maxRadius = encoding.maxRadius ?? 14;
    if (!Number.isFinite(maxRadius) || maxRadius <= 0 || maxRadius > 18) throw new Error("气泡最大半径必须在 0—18 SVG 单位内");
    legendValues = encoding.domainMax === 0 ? [0] : [encoding.domainMax / 4, encoding.domainMax / 2, encoding.domainMax];
  } else {
    if (!encoding.levels.length || new Set(encoding.levels.map(level => level.value)).size !== encoding.levels.length || encoding.levels.some(level => !Number.isFinite(level.value) || !level.label.trim() || !level.color.trim())) throw new Error("等级必须有唯一有限数值、标签与颜色");
    legendValues = encoding.levels.map(level => level.value);
  }

  const encode = (cell: MatrixCell): MatrixEncodedCell => {
    if (cell.kind === "missing") return { kind: cell.kind, label: cell.label ?? "缺测", color: "var(--chart-no-data)" };
    if (cell.kind === "not-applicable") return { kind: cell.kind, label: cell.label ?? "不适用", color: "transparent" };
    if (!Number.isFinite(cell.value)) throw new Error("矩阵数值必须是有限数字；缺测请使用 missing");
    const { value } = cell;
    const label = valueFormat(value);
    if (encoding.kind === "heat") {
      const [min, max] = encoding.domain;
      if (value < min || value > max) throw new Error("矩阵数值超出热度值域");
      if (encoding.steps && !encoding.steps.includes(value)) throw new Error("矩阵数值不是声明的热度步值");
      const fraction = (value - min) / (max - min);
      return { kind: cell.kind, value, label, fraction, color: sequentialColor(fraction) };
    }
    if (encoding.kind === "bubble") {
      if (value < 0 || value > encoding.domainMax) throw new Error("矩阵数值超出非负气泡值域");
      const fraction = encoding.domainMax === 0 ? 0 : value / encoding.domainMax;
      return { kind: cell.kind, value, label, fraction, radius: (encoding.maxRadius ?? 14) * Math.sqrt(fraction), color: sequentialColor(fraction) };
    }
    const level = encoding.levels.find(level => level.value === value);
    if (!level) throw new Error("矩阵数值没有对应等级");
    return { kind: cell.kind, value, label: level.label, color: level.color, radius: 10 };
  };
  return { encode, legend: legendValues.map(value => encode({ rowId: "", columnId: "", kind: "value", value })) };
}
