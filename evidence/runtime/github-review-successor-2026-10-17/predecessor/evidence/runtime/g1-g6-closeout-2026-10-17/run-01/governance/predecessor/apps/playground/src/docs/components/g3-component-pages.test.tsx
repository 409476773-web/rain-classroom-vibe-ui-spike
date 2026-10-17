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

it("recommended object queue retains the student-question draft and permits inspecting an unsubmitted student", () => {
  render(<NavigationComponentPage component="object-navigator" />);
  const scene = within(screen.getByRole("region", { name: "学生批阅" }));
  fireEvent.change(scene.getByRole("textbox", { name: "批阅备注" }), { target: { value: "欧阳小明的草稿" } });
  fireEvent.click(scene.getByRole("button", { name: "标记 林晓" }));
  expect(scene.getByRole("button", { name: "欧阳小明" })).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(scene.getByRole("button", { name: "林晓" }));
  fireEvent.click(scene.getByRole("button", { name: "欧阳小明" }));
  expect(scene.getByRole("textbox", { name: "批阅备注" })).toHaveValue("欧阳小明的草稿");
  fireEvent.click(scene.getByRole("button", { name: "陈一诺" }));
  expect(scene.getByRole("button", { name: "陈一诺" })).toHaveAttribute("aria-pressed", "true");
  expect(scene.getByRole("spinbutton", { name: "得分" })).toBeDisabled();
});

it("recommended object activities share exact horizontal progress readings without a third progress slot", () => {
  const { container } = render(<NavigationComponentPage component="object-navigator" />);
  const scene = within(screen.getByRole("region", { name: "课堂活动" }));
  expect(scene.getByRole("button", { name: "随堂练习：极限的直观理解" })).toHaveAccessibleDescription(/3 \/ 8 组完成.*37.5%/);
  expect(container.querySelectorAll('.object-recipe__activity-progress .rain-data-bar')).toHaveLength(3);
  expect(container.querySelectorAll('.object-recipe__activity-progress .rain-data-bar')[2]).toHaveAttribute("data-fraction", "0.375");
  expect(screen.getByRole("region", { name: "课堂活动" }).querySelector('[data-slot="progress"]')).toBeNull();
  fireEvent.click(scene.getByRole("button", { name: "小组汇报：从概念到真实应用" }));
  expect(scene.getByRole("heading", { name: "小组汇报：从概念到真实应用" })).toBeInTheDocument();
});

it("recommended object previews select a real slide while preserving readable page identity", () => {
  render(<NavigationComponentPage component="object-navigator" />);
  const scene = within(screen.getByRole("region", { name: "讲稿预览" }));
  const before = scene.getByRole("img", { name: "当前讲稿：极限的直观理解" }).getAttribute("src");
  fireEvent.click(scene.getByRole("button", { name: "课堂小结" }));
  expect(scene.getByRole("img", { name: "当前讲稿：课堂小结" }).getAttribute("src")).not.toBe(before);
  expect(scene.getByText("04 / 04")).toBeInTheDocument();
});

it("recommended object queue reflects a saved score and distinguishes a cleared score from the initial score", () => {
  render(<NavigationComponentPage component="object-navigator" />);
  const scene = within(screen.getByRole("region", { name: "学生批阅" }));
  const score = scene.getByRole("spinbutton", { name: "得分" });
  fireEvent.change(score, { target: { value: "6" } }); fireEvent.blur(score);
  fireEvent.click(scene.getByRole("button", { name: "保存评分" }));
  const entry = scene.getByRole("button", { name: "欧阳小明" });
  expect(entry.querySelector('[data-slot="status"]')).toHaveTextContent("6.0 分");
  fireEvent.change(score, { target: { value: "" } }); fireEvent.blur(score);
  expect(entry.querySelector('[data-slot="status"]')).toHaveTextContent("待批阅");
  expect(scene.getByRole("button", { name: "保存评分" })).toBeDisabled();
});

it("recommended scope searches all classes and keeps the shared draft when returning", async () => {
  render(<NavigationComponentPage component="scope-navigation" />);
  const scene = within(screen.getByRole("region", { name: "课程范围内容" }));
  fireEvent.change(scene.getByRole("textbox", { name: "范围教学备注" }), { target: { value: "公共范围草稿" } });
  fireEvent.click(scene.getByRole("button", { name: "更多班级" }));
  const search = await screen.findByRole("textbox", { name: "搜索范围" });
  fireEvent.change(search, { target: { value: "5 班" } });
  fireEvent.click(screen.getByRole("button", { name: /高等数学 5 班/ }));
  expect(scene.getByRole("tab", { name: "高等数学 5 班" })).toHaveAttribute("aria-selected", "true");
  expect(scene.getByRole("textbox", { name: "范围教学备注" })).toHaveValue("");
  fireEvent.click(scene.getByRole("tab", { name: "公共资源包" }));
  expect(scene.getByRole("textbox", { name: "范围教学备注" })).toHaveValue("公共范围草稿");
});

it("recommended connected surface changes connection without remounting its teaching draft", () => {
  render(<NavigationComponentPage component="connected-surface" />);
  const scene = within(screen.getByRole("region", { name: "课程范围内容" }));
  const note = scene.getByRole("textbox", { name: "范围教学备注" });
  fireEvent.change(note, { target: { value: "连续工作面草稿" } });
  fireEvent.click(screen.getByRole("button", { name: "贴边连接" }));
  expect(scene.getByRole("textbox", { name: "范围教学备注" })).toBe(note);
  expect(note).toHaveValue("连续工作面草稿");
});

it("recommended destination rail keeps the current courses and exposes a keyboard reachable expand control", () => {
  render(<NavigationComponentPage component="navigation-list" />);
  const scene = within(screen.getByRole("region", { name: "教师课程导航" }));
  expect(scene.getByRole("link", { name: "我的课程" })).toHaveAttribute("aria-current", "page");
  fireEvent.click(scene.getByRole("button", { name: "收起教学导航" }));
  const expand = scene.getByRole("button", { name: "展开教学导航" });
  expect(expand).toHaveAttribute("aria-expanded", "false");
  expect(scene.getByRole("link", { name: "我的课程" })).toHaveAttribute("aria-current", "page");
  expect(scene.getByText("48 项资料")).toBeInTheDocument();
  fireEvent.click(expand);
  expect(scene.getByRole("button", { name: "收起教学导航" })).toBeInTheDocument();
});

it("recommended course workspace keeps resource drafts and readonly properties through hide and focus", () => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(() => ({ x: 0, y: 0, top: 0, left: 0, bottom: 540, right: 1016, width: 1016, height: 540, toJSON: () => ({}) }));
  const { container } = render(<NavigationComponentPage component="workspace" />);
  const scene = within(screen.getByRole("region", { name: "课程资料编辑" }));
  const draft = scene.getByRole("textbox", { name: "教学备注" });
  fireEvent.change(draft, { target: { value: "函数讲义草稿" } });
  fireEvent.click(scene.getByRole("treeitem", { name: /1.2 极限的直观理解/ }));
  expect(draft).toHaveValue("");
  fireEvent.click(scene.getByRole("treeitem", { name: /1.1 函数的定义与表示/ }));
  expect(draft).toHaveValue("函数讲义草稿");
  expect(scene.getByRole("textbox", { name: "资料名称" })).toHaveValue("函数的定义与表示");
  expect(scene.queryByRole("textbox", { name: "文件类型" })).not.toBeInTheDocument();
  const directory = container.querySelector<HTMLElement>('.workspace-recipe [data-region-id="directory"][data-side="start"]')!;
  fireEvent.click(scene.getAllByRole("button", { name: "隐藏课程目录" })[0]!);
  expect(directory).toHaveAttribute("hidden");
  fireEvent.click(scene.getByRole("button", { name: "显示课程目录" }));
  fireEvent.click(scene.getByRole("button", { name: "专注资料" }));
  expect(draft).toHaveValue("函数讲义草稿");
  fireEvent.click(scene.getByRole("button", { name: "退出专注资料" }));
  expect(directory).not.toHaveAttribute("hidden");
});

it("recommended exercise tabs have actual panels and retain their separate notes", () => {
  render(<NavigationComponentPage component="navigation-tabs" />);
  const scene = within(screen.getByRole("region", { name: "第一章随堂练习" }));
  expect(scene.getByRole("tab", { name: "提交情况" })).toHaveAttribute("aria-selected", "true");
  expect(scene.getByRole("table", { name: "练习提交情况" })).toBeInTheDocument();
  fireEvent.change(scene.getByRole("textbox", { name: "内容面备注" }), { target: { value: "提交面备注" } });
  fireEvent.click(scene.getByRole("tab", { name: "题目内容" }));
  expect(scene.getByText("说明函数在一点连续的条件。")).toBeInTheDocument();
  expect(scene.getByRole("textbox", { name: "内容面备注" })).toHaveValue("");
  fireEvent.click(scene.getByRole("tab", { name: "批阅记录" }));
  expect(scene.getByText("林老师批阅了李梦的第 3 题。")).toBeInTheDocument();
  fireEvent.click(scene.getByRole("tab", { name: "提交情况" }));
  expect(scene.getByRole("textbox", { name: "内容面备注" })).toHaveValue("提交面备注");
});

it("recommended traversal changes its queue without transferring a student-question draft", () => {
  render(<NavigationComponentPage component="segmented-control" />);
  const scene = within(screen.getByRole("region", { name: "批阅顺序演示" }));
  fireEvent.change(scene.getByRole("textbox", { name: "批阅备注" }), { target: { value: "小明第三题的新备注" } });
  fireEvent.click(scene.getByRole("radio", { name: "按题" }));
  expect(scene.getByRole("button", { name: "第 3 题 · 极限与连续" })).toHaveAttribute("aria-pressed", "true");
  expect(scene.getByRole("textbox", { name: "批阅备注" })).toHaveValue("小明第三题的新备注");
  fireEvent.click(scene.getByRole("button", { name: "第 1 题 · 函数的概念" }));
  expect(scene.getByRole("textbox", { name: "批阅备注" })).toHaveValue("");
  fireEvent.click(scene.getByRole("button", { name: "第 3 题 · 极限与连续" }));
  fireEvent.click(scene.getByRole("radio", { name: "按人" }));
  expect(scene.getByRole("button", { name: "欧阳小明" })).toHaveAttribute("aria-pressed", "true");
  expect(scene.getByRole("textbox", { name: "批阅备注" })).toHaveValue("小明第三题的新备注");
  expect(scene.getByRole("status")).toHaveTextContent("未保存");
});

it("keeps reading details separate from edits and only commits a saved form", async () => {
  render(<G3ComponentPage component="sheet" />);
  fireEvent.click(screen.getByRole("button", { name: "打开资料详情" }));
  let dialog = await screen.findByRole("dialog", { name: "资料详情" });
  expect(within(dialog).queryByRole("textbox")).not.toBeInTheDocument();
  expect(within(dialog).getByRole("list", { name: "本讲阅读目录" }).children).toHaveLength(6);
  expect(within(dialog).getByText("课前请先阅读前两节，记录一个想在课堂讨论的问题。")).toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole("button", { name: "关闭资料详情" }));
  fireEvent.click(screen.getByRole("button", { name: "编辑资料" }));
  dialog = await screen.findByRole("dialog", { name: "编辑资料" });
  expect(within(dialog).getByRole("button", { name: "保存修改" })).toHaveAttribute("data-variant", "primary");
  expect(within(dialog).getByRole("button", { name: "取消" })).toHaveAttribute("data-variant", "tertiary");
  expect(within(dialog).getByRole("textbox", { name: "资料名称" })).toHaveAttribute("autocomplete", "off");
  fireEvent.change(within(dialog).getByRole("textbox", { name: "资料名称" }), { target: { value: "更新后的阅读资料" } });
  fireEvent.change(within(dialog).getByRole("textbox", { name: "资料备注" }), { target: { value: "新的课前说明" } });
  fireEvent.click(within(dialog).getByRole("button", { name: "取消" }));
  fireEvent.click(screen.getByRole("button", { name: "打开资料详情" }));
  dialog = await screen.findByRole("dialog", { name: "资料详情" });
  expect(within(dialog).getByText("第一讲 · 课程阅读资料")).toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole("button", { name: "关闭资料详情" }));
  fireEvent.click(screen.getByRole("button", { name: "编辑资料" }));
  dialog = await screen.findByRole("dialog", { name: "编辑资料" });
  expect(within(dialog).getByRole("textbox", { name: "资料名称" })).toHaveValue("更新后的阅读资料");
  fireEvent.click(within(dialog).getByRole("button", { name: "保存修改" }));
  fireEvent.click(screen.getByRole("button", { name: "打开资料详情" }));
  dialog = await screen.findByRole("dialog", { name: "资料详情" });
  expect(within(dialog).getByText("更新后的阅读资料")).toBeInTheDocument();
  expect(within(dialog).getByText("新的课前说明")).toBeInTheDocument();
});

it("keeps an invalid edit open and reports the error beside the name field", async () => {
  render(<G3ComponentPage component="sheet" />);
  fireEvent.click(screen.getByRole("button", { name: "编辑资料" }));
  const dialog = await screen.findByRole("dialog", { name: "编辑资料" });
  const name = within(dialog).getByRole("textbox", { name: "资料名称" });
  fireEvent.change(name, { target: { value: "   " } });
  fireEvent.click(within(dialog).getByRole("button", { name: "保存修改" }));
  expect(name).toHaveAttribute("aria-invalid", "true");
  expect(name).toHaveAccessibleDescription("请输入资料名称。");
  expect(dialog).toBeInTheDocument();
});

it("renders every G3 and navigation asset as an independent document with its API and calling example", () => {
  const g3: G3ComponentId[] = ["scroll-area", "sheet", "sidebar", "command", "kbd", "context-menu", "hover-card", "menubar", "navigation-menu"];
  const navigation: NavigationComponentId[] = ["navigation-tabs", "navigation-bar", "scope-navigation", "navigation-list", "object-navigator", "segmented-control", "connected-surface", "workspace"];
  for (const id of [...g3, ...navigation]) {
    const view = render(g3.includes(id as G3ComponentId) ? <G3ComponentPage component={id as G3ComponentId} /> : <NavigationComponentPage component={id as NavigationComponentId} />);
    expect(view.container.querySelector('[data-rain-id="doc-' + id + '"]')).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toHaveAttribute("id", id + "-title");
    expect(screen.getByRole("table", { name: /常用接口/ })).toBeInTheDocument();
    expect(view.container.querySelector("pre code")?.textContent).toBeTruthy();
    expect(view.container.querySelector('[data-demo-component="' + id + '"]')).toBeTruthy();
    view.unmount();
  }
});

it("keeps each navigation tab draft with its actual content when switching tabs and the browser surface", () => {
  render(<NavigationComponentPage component="navigation-tabs" />);
  fireEvent.click(screen.getByRole("button", { name: "高级组合与异常状态" }));
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
  const { container } = render(<NavigationComponentPage component="object-navigator" />);
  fireEvent.click(screen.getByRole("button", { name: "高级组合与异常状态" }));
  const demo = within(container.querySelector<HTMLElement>('[data-demo-component="object-navigator-advanced"]')!);
  fireEvent.change(demo.getByRole("textbox", { name: "当前学生备注" }), { target: { value: "林晓草稿" } });
  fireEvent.click(demo.getByRole("button", { name: "标记 周雨" }));
  expect(demo.getByRole("button", { name: "林晓" })).toHaveAttribute("aria-pressed", "true");
  expect(demo.getByRole("textbox", { name: "当前学生备注" })).toHaveValue("林晓草稿");
  fireEvent.click(demo.getByRole("button", { name: "周雨" }));
  expect(demo.getByRole("textbox", { name: "当前学生备注" })).toHaveValue("");
  fireEvent.click(demo.getByRole("button", { name: "林晓" }));
  expect(demo.getByRole("textbox", { name: "当前学生备注" })).toHaveValue("林晓草稿");
  fireEvent.change(demo.getByRole("combobox", { name: "对象集合状态" }), { target: { value: "missing" } });
  expect(demo.getByText("当前对象已不可用，请重新选择。")).toBeInTheDocument();
  expect(demo.getByRole("textbox", { name: "当前学生备注" })).toBeDisabled();
  expect(demo.getByRole("button", { name: "林晓" })).toHaveAttribute("aria-pressed", "false");
});

it("lets the workspace hide, peek, pin and focus without losing chapter drafts or external recovery", () => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(() => ({ x: 0, y: 0, top: 0, left: 0, bottom: 460, right: 900, width: 900, height: 460, toJSON: () => ({}) }));
  const { container } = render(<NavigationComponentPage component="workspace" />);
  fireEvent.click(screen.getByRole("button", { name: "高级组合与异常状态" }));
  const advanced = container.querySelector<HTMLElement>('[data-demo-component="workspace-advanced"]')!;
  const demo = within(advanced);
  const directory = advanced.querySelector<HTMLElement>('[data-region-id="directory"][data-side="start"]')!;
  const draft = demo.getByRole("textbox", { name: "宿主草稿" });
  fireEvent.change(draft, { target: { value: "第一讲草稿" } });
  fireEvent.click(screen.getByRole("link", { name: "第 2 讲 · 课程材料" }));
  expect(draft).toHaveValue("");
  fireEvent.click(screen.getByRole("link", { name: "第 1 讲 · 课程材料" }));
  expect(draft).toHaveValue("第一讲草稿");
  fireEvent.click(demo.getByRole("button", { name: "隐藏课程目录" }));
  expect(directory).toHaveAttribute("hidden");
  expect(demo.getByRole("button", { name: "显示课程目录" })).toBeEnabled();
  fireEvent.click(demo.getByRole("button", { name: "临时查看目录" }));
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
    { id: "navigation-bar" as const, query: "view=resources", heading: "教学内容" },
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
