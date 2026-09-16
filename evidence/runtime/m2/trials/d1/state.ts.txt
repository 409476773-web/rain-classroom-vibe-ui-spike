export interface WeekData { group: "一班" | "二班"; week: number; expected: number; submitted: number; scoreTotal: number; }
export const reportData: readonly WeekData[] = Array.from({ length: 6 }, (_, index) => (["一班", "二班"] as const).map((group, groupIndex) => {
  const submitted = 18 + index + groupIndex, average = 72 + index * 3 + groupIndex * 2;
  return { group, week: index + 1, expected: 26, submitted, scoreTotal: submitted * average };
})).flat();
export function summarize(rows: readonly WeekData[]) {
  const expected = rows.reduce((sum, row) => sum + row.expected, 0), submissions = rows.reduce((sum, row) => sum + row.submitted, 0);
  return { expected, submissions, average: submissions ? rows.reduce((sum, row) => sum + row.scoreTotal, 0) / submissions : null, completion: expected ? submissions / expected * 100 : null };
}
