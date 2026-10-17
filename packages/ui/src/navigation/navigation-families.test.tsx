import { useState } from "react";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { RadioGroup } from "../radio/radio";
import { NavigationList, ObjectNavigator, SegmentedControl } from "./navigation-families";

it("keeps compact destinations keyboard-identifiable through the existing Tooltip without intercepting activation", async () => {
  const navigate = vi.fn(), user = userEvent.setup();
  render(<NavigationList aria-label="平台功能" appearance="icons" activeId="courses" onNavigate={navigate} items={[
    { id: "courses", label: "课程", href: "#courses", icon: <span>C</span>, description: "当前课程范围" },
    { id: "disabled", label: "暂不可用", href: "#locked", disabled: true, icon: <span>D</span> },
  ]} />);
  const link = screen.getByRole("link", { name: "课程" });
  expect(link).not.toHaveAttribute("title");
  await user.tab();
  expect(await screen.findByRole("tooltip")).toHaveTextContent("课程");
  expect(link).toHaveAccessibleDescription("当前课程范围 课程");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
  expect(link).toHaveFocus();
  fireEvent.click(link, { ctrlKey: true }); expect(navigate).not.toHaveBeenCalled();
  fireEvent.click(link); expect(navigate).toHaveBeenCalledOnce();
  await user.tab(); expect(screen.getByText("暂不可用").closest("a")).not.toHaveFocus();
});

it("navigates native destinations by stable ID while preserving modified activation", () => {
  const navigate = vi.fn();
  render(<NavigationList aria-label="课程功能" activeId="resource-2" onNavigate={navigate} items={[
    { id: "resource-1", label: "同名功能", href: "#one" },
    { id: "resource-2", label: "同名功能", href: "#two", count: 7 },
    { id: "unavailable", label: "暂不可用", href: "#locked", disabled: true },
  ]} />);
  const links = screen.getAllByRole("link", { name: "同名功能" });
  expect(links[1]).toHaveAttribute("href", "#two");
  expect(links[1]).toHaveAttribute("aria-current", "page");
  fireEvent.click(links[1]!, { ctrlKey: true });
  expect(navigate).not.toHaveBeenCalled();
  fireEvent.click(links[1]!);
  expect(navigate.mock.calls[0]?.[0]).toBe("resource-2");
  fireEvent.click(screen.getByText("暂不可用"));
  expect(navigate).toHaveBeenCalledOnce();
  expect(screen.getByText("暂不可用").closest("a")).toHaveAttribute("aria-disabled", "true");
});

it("keeps queue selection controlled and actions outside the selection button", async () => {
  const select = vi.fn(), action = vi.fn();
  const items = [
    { id: "student-1", label: "李梦", description: "20263001", status: <span>有申诉</span>, actions: <button onClick={action}>更多操作</button> },
    { id: "student-2", label: "李梦", description: "20263002" },
    { id: "student-3", label: "不可选对象", disabled: true },
  ];
  const view = render(<ObjectNavigator aria-label="学生队列" appearance="queue" content="identity" items={items} value="student-1" onValueChange={select} />);
  const selection = screen.getAllByRole("button", { name: "李梦" });
  expect(selection[0]).toHaveAttribute("aria-pressed", "true");
  expect(selection[0]).toHaveAccessibleDescription("20263001 有申诉");
  await userEvent.click(screen.getByRole("button", { name: "更多操作" }));
  expect(action).toHaveBeenCalledOnce();
  expect(select).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: "更多操作" }).closest("[data-slot=trailing-action]")?.parentElement).toBe(selection[0]!.parentElement);
  expect(selection[0]!.querySelector("button")).toBeNull();
  await userEvent.click(selection[1]!);
  expect(select.mock.calls).toEqual([["student-2"]]);
  expect(selection[0]).toHaveAttribute("aria-pressed", "true");
  await userEvent.click(screen.getByRole("button", { name: "不可选对象" }));
  expect(select).toHaveBeenCalledOnce();
  view.rerender(<ObjectNavigator aria-label="学生队列" appearance="queue" content="identity" items={[items[1]!, items[0]!]} value="student-1" onValueChange={select} />);
  expect(screen.getAllByRole("button", { name: "李梦" })[1]).toHaveAttribute("aria-pressed", "true");
});

it("retains object identity across appearances and supports all five content structures", () => {
  const items = [{ id: "object", label: "对象全名", icon: <span>图标</span>, count: 12, description: "对象归属", meta: "15 / 30", progress: 50, preview: <span>缩略图</span> }];
  const select = vi.fn();
  const view = render(<ObjectNavigator aria-label="对象" items={items} value="object" onValueChange={select} />);
  const selected = screen.getByRole("button", { name: "对象全名" });
  for (const content of ["simple", "info", "identity", "summary", "preview"] as const) {
    view.rerender(<ObjectNavigator aria-label="对象" content={content} appearance={content === "preview" ? "preview" : "cards"} items={items} value="object" onValueChange={select} />);
    expect(screen.getByRole("button", { name: "对象全名" })).toBe(selected);
    expect(selected).toHaveAttribute("aria-pressed", "true");
  }
  expect(within(selected).getByText("缩略图")).toBeVisible();
  view.rerender(<ObjectNavigator aria-label="对象" content="summary" items={items} value="object" onValueChange={select} />);
  expect(screen.getByRole("progressbar", { name: "对象全名完成进度" })).toHaveAttribute("aria-valuenow", "50");
  expect(select).not.toHaveBeenCalled();
});

it("reports empty, error, loading and removed selected objects without choosing replacements", () => {
  const select = vi.fn();
  const view = render(<ObjectNavigator aria-label="对象" items={[]} value={null} onValueChange={select} />);
  expect(screen.getByRole("status")).toHaveTextContent("暂无可用对象");
  view.rerender(<ObjectNavigator aria-label="对象" items={[]} value={null} loading onValueChange={select} />);
  expect(screen.getByRole("group", { name: "对象" })).toHaveAttribute("aria-busy", "true");
  expect(screen.getByRole("status")).toHaveTextContent("正在加载");
  view.rerender(<ObjectNavigator aria-label="对象" items={[]} value="removed" error="加载失败" onValueChange={select} />);
  expect(screen.getByRole("alert")).toHaveTextContent("加载失败");
  expect(screen.getByText("当前对象已不可用，请重新选择。")).toBeVisible();
  expect(select).not.toHaveBeenCalled();
});

it("uses existing native radio ownership and keyboard selection for segmented controls", async () => {
  function Example() {
    const [value, setValue] = useState<string | null>("list");
    return <SegmentedControl legend="显示模式" value={value} onValueChange={setValue} iconOnly options={[
      { value: "list", label: "列表", icon: <span>L</span> },
      { value: "blocked", label: "不可用", disabled: true, icon: <span>B</span> },
      { value: "grid", label: "网格", icon: <span>G</span> },
    ]} />;
  }
  render(<Example />);
  const list = screen.getByRole("radio", { name: "列表" });
  expect(list).toHaveAttribute("type", "radio");
  expect(list).toBeChecked();
  list.focus();
  await userEvent.keyboard("{ArrowRight}");
  expect(screen.getByRole("radio", { name: "网格" })).toBeChecked();
  expect(screen.getByRole("radio", { name: "不可用" })).toBeDisabled();
  expect(screen.getByRole("radiogroup", { name: "显示模式" })).toHaveAttribute("aria-orientation", "horizontal");
});

it("reuses RadioGroup reset semantics and leaves ordinary radio defaults untouched", async () => {
  render(<form aria-label="设置"><SegmentedControl legend="视图" name="view" defaultValue="week" tone="inverse" density="compact" options={[
    { value: "week", label: "周" }, { value: "month", label: "月" },
  ]} /><RadioGroup legend="原有组" options={[{ value: "old", label: "旧默认" }]} /></form>);
  await userEvent.click(screen.getByRole("radio", { name: "月" }));
  expect(new FormData(screen.getByRole("form") as HTMLFormElement).get("view")).toBe("month");
  await act(async () => { (screen.getByRole("form") as HTMLFormElement).reset(); });
  expect(screen.getByRole("radio", { name: "周" })).toBeChecked();
  const ordinary = screen.getByRole("radio", { name: "旧默认" }).closest("label");
  expect(ordinary).not.toHaveAttribute("data-local-recipe");
});

it("keeps white-background filters native radio choices with inline counts", async () => {
  const change = vi.fn();
  const view = render(<SegmentedControl legend="文件类型" appearance="white-line" value="all" onValueChange={change} options={[
    { value: "all", label: "全部文件", count: 12 }, { value: "pdf", label: "PDF", count: 3 },
  ]} />);
  expect(screen.queryByRole("tablist")).toBeNull();
  expect(screen.getByRole("radio", { name: "全部文件" })).toBeChecked();
  expect(screen.getByText("12")).toHaveAttribute("data-slot", "count");
  await userEvent.click(screen.getByRole("radio", { name: "PDF" }));
  expect(change).toHaveBeenCalledWith("pdf");
  view.rerender(<SegmentedControl legend="文件类型" appearance="white-soft" value="all" onValueChange={change} options={[{ value: "all", label: "全部文件", count: 12 }]} />);
  expect(screen.getByRole("radiogroup")).toHaveAttribute("data-appearance", "white-soft");
});

it("rejects ambiguous object IDs and invalid progress at the content boundary", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  for (const items of [[{ id: "a", label: "A" }, { id: "a", label: "B" }], [{ id: "", label: "A" }], [{ id: "a", label: "A", progress: 101 }]]) {
    expect(() => render(<ObjectNavigator aria-label="对象" items={items} value={null} onValueChange={() => {}} />)).toThrow();
  }
  error.mockRestore();
});

it("describes object metadata, count, business status and progress with stable per-instance IDs", () => {
  const item = { id: "same-id", label: "同名对象", description: "对象归属", meta: <span>6 组</span>, count: 0, status: <span>有申诉</span>, progress: 75 };
  const view = render(<>
    <ObjectNavigator aria-label="第一实例" items={[item]} value={item.id} onValueChange={() => {}} />
    <ObjectNavigator aria-label="第二实例" items={[item]} value={item.id} onValueChange={() => {}} />
  </>);
  const buttons = screen.getAllByRole("button", { name: "同名对象" });
  expect(buttons[0]).toHaveAccessibleDescription("对象归属 6 组 0 有申诉 完成 75%");
  expect(buttons[1]).toHaveAccessibleDescription("对象归属 6 组 0 有申诉 完成 75%");
  const firstIds = buttons[0]!.getAttribute("aria-describedby")!.split(" ");
  const secondIds = buttons[1]!.getAttribute("aria-describedby")!.split(" ");
  expect(firstIds).toHaveLength(5);
  expect(firstIds.some(id => secondIds.includes(id))).toBe(false);
  expect(firstIds.every(id => document.getElementById(id))).toBe(true);
  view.rerender(<>
    <ObjectNavigator aria-label="第一实例" appearance="queue" content="identity" items={[{ id: "other", label: "新增对象" }, item]} value={item.id} onValueChange={() => {}} />
    <ObjectNavigator aria-label="第二实例" items={[item]} value={item.id} onValueChange={() => {}} />
  </>);
  expect(screen.getAllByRole("button", { name: "同名对象" })[0]).toHaveAttribute("aria-describedby", firstIds.join(" "));
});

it("describes native navigation destination details without changing the destination name", () => {
  render(<NavigationList aria-label="信息导航" activeId="course" items={[{ id: "course", label: "课程内容", href: "#course", description: "2026 秋", count: 7, status: "已共享" }]} />);
  expect(screen.getByRole("link", { name: "课程内容" })).toHaveAccessibleDescription("2026 秋 7 已共享");
});
