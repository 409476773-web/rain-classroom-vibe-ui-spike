export type CategoryChartState = "normal" | "empty" | "zero" | "long" | "single" | "missing" | "invalid";

export type PeriodPoint = { slotId: string; slotLabel: string; date: string; value: number | null };
export type ComparisonSlot = {
  slotId: string; slotLabel: string;
  currentDate: string | null; previousDate: string | null;
  currentValue: number | null; previousValue: number | null;
};

export function alignComparisonSlots(current: PeriodPoint[], previous: PeriodPoint[]): ComparisonSlot[] {
  function index(points: PeriodPoint[]) {
    const result = new Map<string, PeriodPoint>();
    for (const point of points) {
      const date = new Date(`${point.date}T00:00:00Z`);
      if (!point.slotId || !point.slotLabel || result.has(point.slotId)) throw new Error("周期位置必须有唯一 ID 和名称");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(point.date) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== point.date) throw new Error("周期观测日期无效");
      if (point.value !== null && (!Number.isFinite(point.value) || point.value < 0)) throw new Error("周期读数必须是有限非负数或 null");
      result.set(point.slotId, point);
    }
    return result;
  }
  const now = index(current), before = index(previous);
  return [...new Set([...now.keys(), ...before.keys()])].map(slotId => {
    const a = now.get(slotId), b = before.get(slotId);
    if (a && b && a.slotLabel !== b.slotLabel) throw new Error("相同周期位置的名称必须一致");
    return { slotId, slotLabel: (a ?? b)!.slotLabel, currentDate: a?.date ?? null, previousDate: b?.date ?? null, currentValue: a?.value ?? null, previousValue: b?.value ?? null };
  });
}

export type CategoryFixtureId = "semester" | "colleges" | "knowledge" | "period" | "version" | "score";
export type CategorySeries = { key: string; label: string; unit: string; kind: "line" | "area" | "bar"; yAxisId?: string };
export type CategoryRow = Record<string, unknown> & { id: string; label: string };
export type CategoryFixture = {
  id: CategoryFixtureId; reference: string; title: string; description: string;
  kind: "line" | "area" | "composed"; rows: CategoryRow[]; series: CategorySeries[];
  stacked?: boolean; yDomains?: Record<string, [0, number]>;
};

export const CATEGORY_FIXTURES: { id: CategoryFixtureId; label: string }[] = [
  { id: "semester", label: "学期趋势" }, { id: "colleges", label: "学院数量与占比" },
  { id: "knowledge", label: "层级堆叠与覆盖率" }, { id: "period", label: "周期对照" },
  { id: "version", label: "版本变化" }, { id: "score", label: "版本评分" },
];

export function makeCategoryFixtures(revision = 0, state: CategoryChartState = "normal"): CategoryFixture[] {
  const change = revision % 3;
  const period = alignComparisonSlots(
    ["2026-12-30", "2026-12-31", "2027-01-01", "2027-01-02", "2027-01-03"].map((date, index) => ({ slotId: `day-${index + 1}`, slotLabel: `第${index + 1}天`, date, value: [24, 36, 30, 52, 48][index]! + change * 5 })),
    ["2026-12-23", "2026-12-24", "2026-12-25", "2026-12-26"].map((date, index) => ({ slotId: `day-${index + 1}`, slotLabel: `第${index + 1}天`, date, value: [20, 28, 34, 40][index]! + change * 3 })),
  );
  const fixtures: CategoryFixture[] = [
    {
      id: "semester", reference: "CH-060", title: "学期课程参与趋势", kind: "area",
      description: "横轴按学期顺序等距排列。人数是各学期独立统计，缺测保留断口。",
      rows: ["2024春", "2024秋", "2025春", "2025秋", "2026春", "2026秋"].map((label, index) => ({ id: `semester-${index}`, label, students: [120, 156, 148, 184, 208, 236][index]! + change * (index + 1) * 8 })),
      series: [{ key: "students", label: "参与人数", unit: "人", kind: "area" }],
    },
    {
      id: "colleges", reference: "CH-005", title: "学院开课数量与覆盖率", kind: "composed", yDomains: { right: [0, 100] },
      description: "左轴为开课数量；右轴固定0—100%，覆盖率=已开课/计划课程。两个“计算机学院”对应不同校区，保留独立身份。",
      rows: ["计算机学院", "人文学院", "计算机学院", "经济管理学院"].map((label, index) => {
        const planned = [100, 80, 60, 120][index]!, courses = [40, 48, 36, 72][index]! + change * 4;
        return { id: `college-${index}`, label, campus: ["主校区", "主校区", "东校区", "主校区"][index], planned, courses, rate: Number((courses / planned * 100).toFixed(1)) };
      }),
      series: [{ key: "courses", label: "开课数量", unit: "门", kind: "bar" }, { key: "rate", label: "开课覆盖率", unit: "%", kind: "line", yAxisId: "right" }],
    },
    {
      id: "knowledge", reference: "CH-067", title: "知识点层级与覆盖情况", kind: "composed", stacked: true, yDomains: { right: [0, 100] },
      description: "左轴按已覆盖+待覆盖堆叠，合计为本层级知识点数量；右轴固定0—100%。缺测分项不补零，也不继续计算覆盖率。",
      rows: ["基础概念", "综合应用", "专题拓展"].map((label, index) => {
        const covered = [40, 60, 24][index]! + change * 4, uncovered = [60, 40, 36][index]! - change * 4;
        return { id: `level-${index}`, label, covered, uncovered, rate: Number((covered / (covered + uncovered) * 100).toFixed(1)) };
      }),
      series: [{ key: "covered", label: "已覆盖", unit: "个", kind: "bar" }, { key: "uncovered", label: "待覆盖", unit: "个", kind: "bar" }, { key: "rate", label: "覆盖率", unit: "%", kind: "line", yAxisId: "right" }],
    },
    {
      id: "period", reference: "CH-049", title: "本期与上期学习对照", kind: "area",
      description: "本例按周期内第几天对齐；按星期或教学周比较时，需要另行确定对应位置。两个面积叠加对照，不累计；两期保留各自日期，上期第5天尚无记录，保持缺测。",
      rows: period.map(row => ({ ...row, id: row.slotId, label: row.slotLabel })),
      series: [{ key: "currentValue", label: "本期学习次数", unit: "次", kind: "area" }, { key: "previousValue", label: "上期学习次数", unit: "次", kind: "area" }],
    },
    {
      id: "version", reference: "CH-073", title: "培养方案版本变化", kind: "area",
      description: "版本按公布顺序等距排列；面积表达各版本课程总数的变化，不把版本号解析成日期。",
      rows: ["2022版", "2023修订版", "2024版", "2025修订版", "2026版"].map((label, index) => ({ id: `version-${index}`, label, courses: [42, 46, 44, 50, 54][index]! + change * 2 })),
      series: [{ key: "courses", label: "课程总数", unit: "门", kind: "area" }],
    },
    {
      id: "score", reference: "CH-112", title: "课程版本满意度", kind: "composed", yDomains: { left: [0, 10] },
      description: "固定0—10分评分尺度；本例分数越高代表满意度越高。不同业务若方向相反，需另写解释。",
      rows: ["第一版", "第二版", "第三版", "第四版"].map((label, index) => ({ id: `score-${index}`, label, score: Number(([6.2, 7.1, 7.8, 8.6][index]! + change * .2).toFixed(1)) })),
      series: [{ key: "score", label: "满意度", unit: "分", kind: "bar" }],
    },
  ];
  return fixtures.map(fixture => ({ ...fixture, rows: state === "empty" ? [] : fixture.rows.slice(0, state === "single" ? 1 : undefined).map((row, index) => {
    const next = { ...row };
    if (state === "long") next.label = `${row.label} · 跨学科数字教育与教师发展联合培养项目`;
    for (const series of fixture.series) {
      if (state === "zero" && row[series.key] !== null) next[series.key] = 0;
      if (state === "missing" && index === 1) next[series.key] = null;
      if (state === "invalid" && index === 0) next[series.key] = NaN;
    }
    if (state === "zero" && fixture.id === "knowledge") next.rate = null;
    return next;
  }) }));
}
