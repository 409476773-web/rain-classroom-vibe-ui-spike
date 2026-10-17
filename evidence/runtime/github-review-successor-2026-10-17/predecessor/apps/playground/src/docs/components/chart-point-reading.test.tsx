import { fireEvent, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

const point = (day: number, value: unknown) => ({ date: new Date(2026, 8, day), value });
const fields = [{ key: "value", label: "参与人数", unit: "人" }];

test("the private date reader offers every dense date and reads the chosen original value by keyboard", async () => {
  const { ChartPointReading } = await import("./chart-point-reading");
  const data = Array.from({ length: 96 }, (_, index) => point(index + 1, index / 1000));
  const view = render(<ChartPointReading data={data} fields={fields} />);
  const select = view.getByRole("combobox", { name: "读取日期" });
  expect(within(select).getAllByRole("option")).toHaveLength(97);
  const user = userEvent.setup();
  await user.tab();
  expect(select).toHaveFocus();
  await user.selectOptions(select, String(data[95]!.date.getTime()));
  expect(view.getByRole("status")).toHaveTextContent("0.095 人");
  expect(view.getByRole("status")).toHaveTextContent("12月5日");
});

test("the private reader keeps the same date across an update and clears an absent date without choosing its replacement", async () => {
  const { ChartPointReading } = await import("./chart-point-reading");
  const data = [point(1, 1), point(2, 2), point(3, 3)];
  const view = render(<ChartPointReading data={data} fields={fields} />);
  const select = view.getByRole("combobox", { name: "读取日期" });
  fireEvent.change(select, { target: { value: String(data[1]!.date.getTime()) } });
  view.rerender(<ChartPointReading data={[point(0, 4), point(1, 5), point(2, 7), point(3, 8)]} fields={fields} />);
  expect(select).toHaveValue(String(data[1]!.date.getTime()));
  expect(view.getByRole("status")).toHaveTextContent("9月2日");
  expect(view.getByRole("status")).toHaveTextContent("7 人");
  view.rerender(<ChartPointReading data={[point(1, 5), point(3, 8)]} fields={fields} />);
  expect(select).toHaveValue("");
  expect(view.getByRole("status")).toHaveTextContent("请选择读取日期");
  expect(view.getByRole("status")).not.toHaveTextContent("8 人");
});

test("the private reader distinguishes zero and absent values and retains near-zero signs without rounding", async () => {
  const { ChartPointReading } = await import("./chart-point-reading");
  const data = [point(1, 0), point(2, null), point(3, undefined), point(4, NaN), point(5, -.00001), point(6, .00001)];
  const view = render(<ChartPointReading data={data} fields={[{ key: "value", label: "盈亏", unit: "元" }]} />);
  const select = view.getByRole("combobox", { name: "读取日期" });
  for (const [index, text] of [[0, "0 元"], [1, "缺测"], [2, "缺测"], [3, "缺测"], [4, "-0.00001 元"], [5, "0.00001 元"]] as const) {
    fireEvent.change(select, { target: { value: String(data[index]!.date.getTime()) } });
    expect(view.getByRole("status")).toHaveTextContent(text);
  }
});

test("the private reader keeps all overlapping series and their separate units", async () => {
  const { ChartPointReading } = await import("./chart-point-reading");
  const view = render(<ChartPointReading data={[{ date: new Date(2026, 8, 1), enrolled: 150, completed: 150, rate: 100 }]} fields={[
    { key: "enrolled", label: "参与人数", unit: "人" }, { key: "completed", label: "完成人数", unit: "人" }, { key: "rate", label: "完成率", unit: "%" },
  ]} />);
  expect(view.getByRole("status")).toHaveTextContent("参与人数 150 人");
  expect(view.getByRole("status")).toHaveTextContent("完成人数 150 人");
  expect(view.getByRole("status")).toHaveTextContent("完成率 100 %");
});

test("the private reader has a readable empty state without fabricated dates or values", async () => {
  const { ChartPointReading } = await import("./chart-point-reading");
  const view = render(<ChartPointReading data={[]} fields={fields} />);
  expect(view.getByRole("combobox", { name: "读取日期" })).toBeDisabled();
  expect(view.getByRole("status")).toHaveTextContent("当前没有可读日期");
  expect(view.getByRole("status")).not.toHaveTextContent("0 人");
});
