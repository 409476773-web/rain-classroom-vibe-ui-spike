import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { G3ComponentPage, type G3ComponentId } from "./g3-component-pages";
import { NavigationComponentPage, type NavigationComponentId } from "./navigation-component-pages";

beforeEach(() => {
  vi.stubGlobal("requestAnimationFrame", () => 1);
  vi.stubGlobal("cancelAnimationFrame", () => undefined);
});

it("executes advertised command shortcuts only inside the demonstration", () => {
  render(<G3ComponentPage component="command" />);
  fireEvent.keyDown(document.body, { key: "n", metaKey: true });
  expect(screen.getByText(/^已新建/)).toHaveTextContent("已新建 0 份");
  const input = screen.getByRole("combobox", { name: "搜索课程资料命令" });
  fireEvent.keyDown(input, { key: "n", metaKey: true });
  expect(screen.getByText(/^已新建/)).toHaveTextContent("已新建 1 份");
  fireEvent.keyDown(input, { key: "p", ctrlKey: true });
  expect(screen.getByText(/^已新建/)).toHaveTextContent("预览已打开");
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); window.location.hash = ""; });

it("renders every G3 and navigation asset as an independent document with its API and calling example", () => {
  const g3: G3ComponentId[] = ["scroll-area", "sheet", "sidebar", "command", "kbd", "context-menu", "hover-card", "menubar", "navigation-menu"];
  const navigation: NavigationComponentId[] = ["navigation-tabs", "navigation-bar", "scope-navigation", "navigation-list", "object-navigator", "segmented-control", "connected-surface", "workspace"];
  for (const id of [...g3, ...navigation]) {
    const view = render(g3.includes(id as G3ComponentId) ? <G3ComponentPage component={id as G3ComponentId} /> : <NavigationComponentPage component={id as NavigationComponentId} />);
    expect(view.container.querySelector('[data-rain-id="doc-' + id + '"]')).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toHaveAttribute("id", id + "-title");
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(view.container.querySelector("pre code")?.textContent).toBeTruthy();
    expect(view.container.querySelector('[data-demo-component="' + id + '"]')).toBeTruthy();
    view.unmount();
  }
});

it("keeps each navigation tab draft with its actual content when switching tabs and the browser surface", () => {
  render(<NavigationComponentPage component="navigation-tabs" />);
  fireEvent.change(screen.getByRole("textbox", { name: "该内容面备注" }), { target: { value: "资料草稿" } });
  fireEvent.click(screen.getByRole("tab", { name: "课堂任务" }));
  expect(screen.getByRole("textbox", { name: "该内容面备注" })).toHaveValue("");
  fireEvent.change(screen.getByRole("textbox", { name: "该内容面备注" }), { target: { value: "任务草稿" } });
  fireEvent.click(screen.getByRole("button", { name: "切换为连接工作面样式" }));
  expect(screen.getByRole("textbox", { name: "该内容面备注" })).toHaveValue("任务草稿");
  fireEvent.click(screen.getByRole("tab", { name: "课程资料" }));
  expect(screen.getByRole("textbox", { name: "该内容面备注" })).toHaveValue("资料草稿");
  expect(screen.getByRole("tab", { name: "学习报告" })).toHaveAttribute("aria-disabled", "true");
});

it("keeps sibling object actions independent from current identity and disables a removed object's editor", () => {
  render(<NavigationComponentPage component="object-navigator" />);
  fireEvent.change(screen.getByRole("textbox", { name: "当前学生备注" }), { target: { value: "林晓草稿" } });
  fireEvent.click(screen.getByRole("button", { name: "标记 周雨" }));
  expect(screen.getByRole("button", { name: "林晓" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("textbox", { name: "当前学生备注" })).toHaveValue("林晓草稿");
  fireEvent.click(screen.getByRole("button", { name: "周雨" }));
  expect(screen.getByRole("textbox", { name: "当前学生备注" })).toHaveValue("");
  fireEvent.click(screen.getByRole("button", { name: "林晓" }));
  expect(screen.getByRole("textbox", { name: "当前学生备注" })).toHaveValue("林晓草稿");
  fireEvent.change(screen.getByRole("combobox", { name: "对象集合状态" }), { target: { value: "missing" } });
  expect(screen.getByText("当前对象已不可用，请重新选择。")).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "当前学生备注" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "林晓" })).toHaveAttribute("aria-pressed", "false");
});

it("lets the workspace hide, peek, pin and focus without losing chapter drafts or external recovery", () => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(() => ({ x: 0, y: 0, top: 0, left: 0, bottom: 460, right: 900, width: 900, height: 460, toJSON: () => ({}) }));
  const { container } = render(<NavigationComponentPage component="workspace" />);
  const directory = container.querySelector<HTMLElement>('[data-region-id="directory"][data-side="start"]')!;
  const draft = screen.getByRole("textbox", { name: "宿主草稿" });
  fireEvent.change(draft, { target: { value: "第一讲草稿" } });
  fireEvent.click(screen.getByRole("link", { name: "第 2 讲 · 课程材料" }));
  expect(draft).toHaveValue("");
  fireEvent.click(screen.getByRole("link", { name: "第 1 讲 · 课程材料" }));
  expect(draft).toHaveValue("第一讲草稿");
  fireEvent.click(screen.getByRole("button", { name: "隐藏课程目录" }));
  expect(directory).toHaveAttribute("hidden");
  expect(screen.getByRole("button", { name: "显示课程目录" })).toBeEnabled();
  fireEvent.click(screen.getByRole("button", { name: "临时查看目录" }));
  expect(directory).toHaveAttribute("data-temporary", "true");
  fireEvent.click(within(directory).getByRole("button", { name: "固定面板" }));
  expect(directory).toHaveAttribute("data-mode", "expanded");
  expect(directory).toHaveAttribute("data-temporary", "false");
  fireEvent.click(screen.getByRole("button", { name: "专注主内容" }));
  expect(directory).toHaveAttribute("hidden");
  fireEvent.click(screen.getByRole("button", { name: "退出专注" }));
  expect(directory).not.toHaveAttribute("hidden");
  expect(draft).toHaveValue("第一讲草稿");
});

it("opens native demo destination links with their explicit destination selected, and rejects invalid IDs", () => {
  const targets = [
    { id: "sidebar" as const, query: "view=courses", heading: "我的课程" },
    { id: "navigation-menu" as const, query: "view=report", heading: "学习报告" },
    { id: "navigation-bar" as const, query: "view=resources", heading: "教学资料" },
    { id: "navigation-list" as const, query: "view=courses", heading: "我的课程" },
    { id: "workspace" as const, query: "chapter=12", heading: "第 12 讲 · 课程材料" },
  ];
  for (const { id, query, heading } of targets) {
    window.location.hash = id + "?" + query;
    const view = render(id === "sidebar" || id === "navigation-menu" ? <G3ComponentPage component={id} /> : <NavigationComponentPage component={id} />);
    expect(screen.getByRole("heading", { level: 3, name: heading })).toBeInTheDocument();
    view.unmount();
  }
  window.location.hash = "hover-card?member=lin";
  const member = render(<G3ComponentPage component="hover-card" />);
  expect(screen.getByRole("heading", { level: 3, name: "林老师" })).toBeInTheDocument();
  member.unmount();
  window.location.hash = "workspace?chapter=invalid";
  render(<NavigationComponentPage component="workspace" />);
  expect(screen.getByRole("heading", { level: 3, name: "第 1 讲 · 课程材料" })).toBeInTheDocument();
});
