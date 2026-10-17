import type { MatrixAxisItem, MatrixCell, MatrixEncoding } from "@rain-next/ui/charts";
import type { ChartState } from "../chart-data";

export interface MatrixFixture {
  id: "weekday-hour" | "course-version" | "course-similarity" | "course-count" | "support-level";
  caption: string;
  description: string;
  sourceIds: readonly string[];
  rows: MatrixAxisItem[];
  columns: MatrixAxisItem[];
  cells: MatrixCell[];
  encoding: MatrixEncoding;
  rowHeaderLabel: string;
  valueFormat?: (value: number) => string;
}

const courseLabels = ["高等数学", "线性代数", "概率论与数理统计", "大学物理", "程序设计基础", "数据结构", "离散数学", "算法设计与分析", "计算机网络", "操作系统", "数据库原理", "软件工程"];
const axes = (prefix: string, labels: readonly string[]): MatrixAxisItem[] => labels.map((label, index) => ({ id: `${prefix}-${index + 1}`, label }));
function numericCells(rows: MatrixAxisItem[], columns: MatrixAxisItem[], reading: (row: number, column: number) => number): MatrixCell[] {
  return rows.flatMap((row, rowIndex) => columns.map((column, columnIndex) => ({ rowId: row.id, columnId: column.id, kind: "value" as const, value: reading(rowIndex, columnIndex) })));
}

/** Deterministic Mock data; it is not connected to any school or learner records. */
export function makeMatrixFixtures(revision = 0, state: ChartState = "normal", similaritySize: 4 | 6 | 12 = 6): MatrixFixture[] {
  const change = revision % 3;
  const hourlyActivity = [
    [0, 0, 0, 0, 0, 1, 3, 6, 10, 15, 18, 14, 8, 10, 16, 19, 17, 11, 8, 13, 18, 16, 9, 3],
    [0, 0, 0, 0, 1, 2, 4, 8, 13, 17, 15, 12, 7, 11, 18, 20, 16, 10, 9, 14, 19, 15, 8, 2],
    [0, 0, 0, 0, 0, 1, 2, 5, 9, 14, 17, 15, 10, 8, 13, 18, 20, 14, 10, 12, 16, 18, 11, 4],
  ][change]!;
  const weekdayActivity = [.82, 1, .92, .96, .76, .48, .62];
  const courseSemesters = [
    [[1, 1, 2, 1], [2, 2, 2, 3], [3, 4, 3, 4], [2, 3, 3, 2], [1, 2, 1, 2], [3, 4, 4, 5]],
    [[1, 2, 1, 2], [2, 3, 2, 2], [4, 3, 4, 5], [3, 2, 3, 3], [2, 1, 2, 1], [4, 5, 3, 4]],
    [[2, 1, 1, 2], [3, 2, 3, 2], [3, 5, 4, 3], [2, 4, 2, 3], [1, 2, 2, 1], [5, 4, 5, 3]],
  ][change]!;
  const courseCounts = [[0, 62, 86, 68, 64, 54], [68, 48, 38, 88, 40, 60], [92, 82, 66, 78, 72, 68], [52, 58, 72, 44, 66, 48], [80, 74, 58, 76, 52, 62], [28, 36, 24, 42, 18, 90]];
  const countChanges = [[0, 0, 0, 0, 0, 0], [4, -6, 8, -4, 6, -8], [8, 7, -5, 9, -6, 4]][change]!;
  const supportLevels = [
    [[2, 2, 0, 0], [2, 2, 1, 0], [2, 2, 1, 1], [2, 1, 2, 1], [2, 2, 2, 1], [2, 2, 2, 2]],
    [[2, 1, 0, 0], [2, 2, 0, 1], [2, 2, 1, 0], [1, 2, 2, 1], [2, 1, 2, 2], [2, 2, 1, 2]],
    [[2, 2, 1, 0], [2, 1, 1, 0], [1, 2, 2, 1], [2, 1, 2, 0], [2, 2, 1, 2], [2, 1, 2, 2]],
  ][change]!;
  const days = axes("weekday", ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]);
  const hours = axes("hour", Array.from({ length: 24 }, (_, hour) => `${String(hour).padStart(2, "0")}:00`));
  const courses = axes("course", courseLabels.slice(0, 6));
  const versions = axes("version", ["2022 版", "2023 版", "2024 版", "2025 版"]);
  const similarities = axes("course", courseLabels.slice(0, similaritySize));
  const categories = axes("category", ["通识课程", "学科基础", "专业必修", "专业选修", "实践课程", "创新课程"]);
  const colleges = axes("college", ["计算机学院", "经济管理学院", "人文学院", "理学院", "外国语学院", "教育学院"]);
  const requirements = axes("requirement", ["知识与能力", "分析与表达", "协作与实践", "创新与反思"]);
  const fixtures: MatrixFixture[] = [
    { id: "weekday-hour", caption: "每周学习时段 · 次数", description: "按星期与小时比较学习次数，0 也是有效观测。", sourceIds: ["CH026", "CH033", "CH044", "CH054"],
      rows: days, columns: hours, cells: numericCells(days, hours, (row, column) => Math.round(hourlyActivity[column]! * weekdayActivity[row]!)).slice(0, -1),
      encoding: { kind: "heat", domain: [0, 20] }, rowHeaderLabel: "星期", valueFormat: String },
    { id: "course-version", caption: "课程与培养方案版本 · 开课学期", description: "学期按 1—8 排列；未设学期与无该课程分别记录。", sourceIds: ["CH076", "CH115"],
      rows: courses, columns: versions, cells: numericCells(courses, versions, (row, column) => courseSemesters[row]![column]!).map<MatrixCell>((cell, index) => index === 2
        ? { rowId: cell.rowId, columnId: cell.columnId, kind: "missing", label: "未设学期" }
        : index === 9 ? { rowId: cell.rowId, columnId: cell.columnId, kind: "not-applicable", label: "无该课程" } : cell),
      encoding: { kind: "heat", domain: [1, 8], steps: [1, 2, 3, 4, 5, 6, 7, 8] }, rowHeaderLabel: "课程", valueFormat: String },
    { id: "course-similarity", caption: "课程相似度", description: "同一课程对应两轴；方向不同的读数分别保留，缺测位置留空。", sourceIds: ["CH084", "CH087", "CH089", "CH090"],
      rows: similarities, columns: [...similarities], cells: numericCells(similarities, similarities, (row, column) => {
        if (row === column) return 1;
        const sameCluster = (row < 4) === (column < 4);
        const relatedness = sameCluster ? .86 - Math.min(5, Math.abs(row - column)) * .055 : .22 + (row + column) % 3 * .09;
        const directionalDifference = row < column ? .02 : -.02;
        return Math.round(Math.max(0, Math.min(1, relatedness + directionalDifference + [0, .05, -.06][change]!)) * 100) / 100;
      })
        .filter((_, index) => Math.floor(index / similaritySize) !== index % similaritySize || Math.floor(index / similaritySize) % 3 !== 0),
      encoding: { kind: "heat", domain: [0, 1] }, rowHeaderLabel: "课程", valueFormat: value => `${Math.round(value * 100)}%` },
    { id: "course-count", caption: "课程类别与学院 · 课程数", description: "圆面积与颜色深浅共用课程数量程；指向或用方向键查看精确课程数。", sourceIds: ["CH085", "CH088", "CH091", "CH092"],
      rows: categories, columns: colleges, cells: numericCells(categories, colleges, (row, column) => courseCounts[row]![column]! + countChanges[(row + column) % 6]!),
      encoding: { kind: "bubble", domainMax: 100, maxRadius: 18 }, rowHeaderLabel: "课程类别", valueFormat: String },
    { id: "support-level", caption: "课程支撑关系", description: "支撑关系只有无直接支撑、一般支撑和核心支撑三个等级。", sourceIds: ["CH145"],
      rows: courses, columns: requirements, cells: numericCells(courses, requirements, (row, column) => supportLevels[row]![column]!), rowHeaderLabel: "课程",
      encoding: { kind: "level", levels: [
        { value: 0, label: "无直接支撑", color: "var(--chart-scale-01)" },
        { value: 1, label: "一般支撑", color: "var(--chart-scale-03)" },
        { value: 2, label: "核心支撑", color: "var(--chart-scale-05)" },
      ] } },
  ];
  return fixtures.map(fixture => {
    if (state === "empty") return { ...fixture, rows: [], cells: [] };
    if (state === "single") return { ...fixture, rows: fixture.rows.slice(0, 1), columns: fixture.columns.slice(0, 1), cells: fixture.cells.filter(cell => cell.rowId === fixture.rows[0]!.id && cell.columnId === fixture.columns[0]!.id) };
    if (state === "long") return { ...fixture, rows: fixture.rows.map(row => ({ ...row, label: `${row.label}·跨学科协同与教学实践研究方向` })), columns: fixture.columns.map(column => ({ ...column, label: `${column.label}·联合培养与课程创新项目` })) };
    const cells = fixture.cells.map<MatrixCell>((cell, index) => {
      if (state === "missing" && index === 0 || state === "zero" && fixture.id === "course-version" && cell.kind === "value") return { rowId: cell.rowId, columnId: cell.columnId, kind: "missing", label: fixture.id === "course-version" ? "未设学期" : "缺测" };
      if (state === "invalid" && index === 0) return { rowId: cell.rowId, columnId: cell.columnId, kind: "value", value: NaN };
      return state === "zero" && cell.kind === "value" ? { ...cell, value: 0 } : cell;
    });
    return { ...fixture, cells, encoding: state === "zero" && fixture.encoding.kind === "bubble" ? { ...fixture.encoding, domainMax: 0 } : fixture.encoding };
  });
}
