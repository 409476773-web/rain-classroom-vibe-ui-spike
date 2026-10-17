import { act, render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { summarize } from "./state";
import { buildGapPoints, ReportSubmissionGaps } from "./report-sections";
import { buildTrendPoints, TrendChart } from "./trend-chart";
import { LearningReportScenario } from "./page";

it("weights every submission across the full dataset and handles empty or zero denominators", () => {
  const rows = [{ group: "一班" as const, week: 1, expected: 20, submitted: 10, scoreTotal: 600 }, { group: "一班" as const, week: 2, expected: 20, submitted: 20, scoreTotal: 1800 }];
  expect(summarize(rows)).toEqual({ expected: 40, submissions: 30, average: 80, completion: 75 });
  expect(summarize([])).toEqual({ expected: 0, submissions: 0, average: null, completion: null });
  expect(summarize([{ ...rows[0]!, expected: 0, submitted: 0, scoreTotal: 0 }])).toEqual({ expected: 0, submissions: 0, average: null, completion: null });
});

it("keeps full-range KPIs unchanged by complete details and local chart selection", async () => {
  const user = userEvent.setup(); render(<LearningReportScenario />);
  const metrics = screen.getByRole("region", { name: "关键指标" }), original = metrics.textContent;
  expect(within(metrics).getByText("252")).toBeInTheDocument();
  expect(within(screen.getByRole("table")).getAllByRole("row")).toHaveLength(13);
  expect(metrics.textContent).toBe(original);
  await user.click(screen.getByRole("combobox", { name: "固定对照" }));
  await user.click(await screen.findByRole("option", { name: "第 4 周" }));
  expect(screen.getByRole("status", { name: "趋势读数" })).toHaveTextContent("第 4 周");
  expect(metrics.textContent).toBe(original);
  await user.click(screen.getByRole("combobox", { name: "报告班级" }));
  await user.click(await screen.findByRole("option", { name: "二班" }));
  expect(within(metrics).getByText("129")).toBeInTheDocument();
  expect(within(screen.getByRole("table")).getAllByRole("row")).toHaveLength(7);
  expect(screen.getByText("统计范围：二班 · 第 1–6 周 · 6 条周度汇总；指标覆盖全部筛选数据。")).toBeInTheDocument();
});

it("does not show stale metrics on loading or failure and can retry or recover from empty", async () => {
  const user = userEvent.setup(); let reject!: (error: Error) => void, calls = 0;
  const first = new Promise<void>((_resolve, fail) => { reject = fail; });
  render(<LearningReportScenario loadTask={() => ++calls === 1 ? first : Promise.resolve()} />);
  await user.click(screen.getByRole("button", { name: "刷新报告" }));
  expect(screen.queryByRole("region", { name: "关键指标" })).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("正在更新");
  await act(async () => reject(new Error("offline")));
  expect(await screen.findByRole("alert")).toHaveTextContent("报告加载失败");
  expect(screen.queryByRole("region", { name: "关键指标" })).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "重试加载" }));
  expect(await screen.findByRole("region", { name: "关键指标" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "预览空数据" }));
  expect(screen.getByRole("heading", { name: "暂无报告数据" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "恢复示例数据" }));
  expect(screen.getByRole("region", { name: "关键指标" })).toBeInTheDocument();
});

it("preserves missing weeks and zero denominators in the chart instead of inventing zeros", async () => {
  const rows = [{ group: "一班" as const, week: 1, expected: 2, submitted: 1, scoreTotal: 80 }, { group: "一班" as const, week: 3, expected: 0, submitted: 0, scoreTotal: 0 }];
  const points = buildTrendPoints(rows, "average", 1);
  expect(points).toHaveLength(6);
  expect(points.slice(0, 3)).toEqual([{ week: 1, 一班: 80, 二班: null }, { week: 2, 一班: null, 二班: null }, { week: 3, 一班: null, 二班: null }]);
  expect(buildTrendPoints(rows, "completion", 1)[0]).toEqual({ week: 1, 一班: 50, 二班: null });
  expect(buildTrendPoints(rows, "completion", 1)[2]?.一班).toBeNull();
  const { container } = render(<TrendChart rows={[...rows, { ...rows[0]!, week: 4, scoreTotal: 90 }]} metric="average" firstWeek={1} selectedWeek={1} />);
  await waitFor(() => expect(container.querySelector(".recharts-line-curve")?.getAttribute("d")?.match(/M/g)).toHaveLength(2));
  expect(container.querySelectorAll("circle.bm-d-series-one")).toHaveLength(2);
});

it("keeps both class metrics and the gap analysis stable when only the trend metric changes", async () => {
  const user = userEvent.setup(); render(<LearningReportScenario presentation="comparison" />);
  const comparison = screen.getByRole("region", { name: "班级对照" });
  expect(comparison).toHaveTextContent("79.9");
  expect(comparison).toHaveTextContent("78.8");
  expect(comparison).toHaveTextContent("3.8");
  const gaps = screen.getByRole("region", { name: "提交缺口" });
  expect(gaps).toHaveTextContent("46.7%");
  const original = comparison.textContent, gapContent = gaps.textContent;
  await user.click(screen.getByRole("radio", { name: "提交率" }));
  expect(comparison.textContent).toBe(original);
  expect(gaps.textContent).toBe(gapContent);
  expect(screen.queryByRole("combobox", { name: "固定对照" })).not.toBeInTheDocument();
});

it("updates all report chapters together and removes between-class conclusions for a single class", async () => {
  const user = userEvent.setup(); render(<LearningReportScenario presentation="comparison" />);
  const metrics = screen.getByRole("region", { name: "关键指标" });
  const gaps = screen.getByRole("region", { name: "提交缺口" });
  expect(metrics).toHaveTextContent("+15.0");
  expect(gaps).toHaveTextContent("60");
  await user.click(screen.getByRole("combobox", { name: "报告周期" }));
  await user.click(await screen.findByRole("option", { name: "第 4–6 周" }));
  expect(metrics).toHaveTextContent("+6.0");
  expect(metrics).toHaveTextContent("135");
  expect(gaps).toHaveTextContent("21");
  expect(gaps).toHaveTextContent("第 4–5 周");
  expect(gaps).not.toHaveTextContent("第 1–2 周");
  expect(screen.getByRole("region", { name: "班级对照" })).toHaveTextContent("84.1");
  await user.click(screen.getByRole("combobox", { name: "报告班级" }));
  await user.click(await screen.findByRole("option", { name: "二班" }));
  const performance = screen.getByRole("region", { name: "班级表现" });
  expect(performance).not.toHaveTextContent("一班");
  expect(performance).not.toHaveTextContent("高出");
  expect(performance).toHaveTextContent("88.5");
  expect(metrics).toHaveTextContent("69");
  expect(within(screen.getByRole("table", { name: "周度明细" })).getAllByRole("row")).toHaveLength(4);
  expect(screen.getByRole("columnheader", { name: "未提交" })).toBeInTheDocument();
});

it("plots a weighted overall series and leaves absent weeks disconnected", async () => {
  const rows = [
    { group: "一班" as const, week: 1, expected: 20, submitted: 10, scoreTotal: 600 },
    { group: "二班" as const, week: 1, expected: 20, submitted: 20, scoreTotal: 1800 },
    { group: "一班" as const, week: 3, expected: 20, submitted: 10, scoreTotal: 900 },
  ];
  const { container } = render(<TrendChart rows={rows} metric="average" firstWeek={1} selectedWeek={1} overall />);
  await waitFor(() => expect(container.querySelector(".recharts-line-curve")?.getAttribute("d")?.match(/M/g)).toHaveLength(2));
  expect(screen.getByText("80.0")).toBeInTheDocument();
  expect(container.querySelectorAll("circle.report-a-series-overall")).toHaveLength(2);
});

it("distinguishes a missing week from a real zero gap and avoids dividing a completed range by zero", () => {
  const rows = [{ group: "一班" as const, week: 4, expected: 26, submitted: 26, scoreTotal: 2080 }];
  expect(buildGapPoints(rows, 4)).toEqual([{ week: 4, gap: 0 }, { week: 5, gap: null }, { week: 6, gap: null }]);
  render(<ReportSubmissionGaps rows={rows} firstWeek={4} />);
  expect(screen.getByRole("complementary", { name: "缺口解读" })).toHaveTextContent("当前范围的作业均已提交");
  expect(screen.getByRole("region", { name: "提交缺口" })).not.toHaveTextContent("NaN");
});
