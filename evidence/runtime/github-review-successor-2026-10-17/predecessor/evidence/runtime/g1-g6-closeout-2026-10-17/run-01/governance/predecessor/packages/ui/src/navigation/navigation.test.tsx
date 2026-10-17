import { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { Tabs } from "../tabs/tabs";
import { NavigationBar, NavigationTabs, ScopeNavigation, visibleScopeItems } from "./navigation";

it("adds a browser identity description without changing the existing Tabs label contract", () => {
  const items = [{ value: "shared", label: "公共资源包", description: "课程内容 · 200 个班级共用", content: <input aria-label="编辑草稿" defaultValue="已保留" /> }];
  const { rerender } = render(<Tabs aria-label="范围" items={items} {...{ visualPreset: "navigation-browser" as const }} />);
  expect(screen.getByRole("tab", { name: "公共资源包" })).toHaveTextContent("课程内容 · 200 个班级共用");
  expect(screen.getByRole("tab", { name: "公共资源包" })).toHaveAccessibleDescription("课程内容 · 200 个班级共用");
  expect(screen.getByRole("tab", { name: "公共资源包" })).toHaveAttribute("aria-selected", "true");
  const draft = screen.getByLabelText("编辑草稿");
  rerender(<Tabs aria-label="范围" items={items} />);
  expect(screen.queryByText("课程内容 · 200 个班级共用")).toBeNull();
  expect(screen.getByLabelText("编辑草稿")).toBe(draft);
});

const scopes = [{ id: "shared", label: "公共资源包", description: "课程内容 · 班级共用" }, ...Array.from({ length: 200 }, (_, i) => ({ id: `class-${i + 1}`, label: `教学班 ${i + 1}`, description: "教学班 · 演示范围" }))];

it("keeps shared scope first and places the current overflow scope in the final visible slot", () => {
  expect(visibleScopeItems(scopes, "class-200", 4).map(item => item.id)).toEqual(["shared", "class-1", "class-2", "class-200"]);
  expect(visibleScopeItems(scopes, "class-1", 4).map(item => item.id)).toEqual(["shared", "class-1", "class-2", "class-3"]);
});

it("counts hidden classes and searches all scopes in an anchored nonmodal dropdown", async () => {
  function Example() { const [value, setValue] = useState("shared"); return <ScopeNavigation items={scopes} value={value} onValueChange={setValue}><p>应用拥有编辑状态</p></ScopeNavigation>; }
  render(<Example />);
  expect(screen.getAllByRole("tab")).toHaveLength(4);
  const more = screen.getByRole("button", { name: "更多班级" });
  expect(more).toHaveTextContent("197");
  fireEvent.click(more);
  expect(await screen.findByRole("dialog")).not.toHaveAttribute("aria-modal", "true");
  fireEvent.change(screen.getByRole("textbox", { name: "搜索范围" }), { target: { value: "200" } });
  fireEvent.click(screen.getByRole("button", { name: /^教学班 200/ }));
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  expect(screen.getByRole("tab", { name: "教学班 200" })).toHaveAttribute("aria-selected", "true");
  await waitFor(() => expect(screen.getByRole("tab", { name: "教学班 200" })).toHaveFocus());
  expect(screen.getAllByRole("tab").map(tab => tab.getAttribute("aria-label"))).toEqual(["公共资源包", "教学班 1", "教学班 2", "教学班 200"]);
});

it("reports a removed selected scope without silently selecting a different class", () => {
  const onChange = vi.fn();
  render(<ScopeNavigation items={scopes.slice(0, 2)} value="class-200" onValueChange={onChange} />);
  expect(screen.getByRole("status")).toHaveTextContent("当前范围已不可用");
  expect(onChange).not.toHaveBeenCalled();
  expect(screen.getAllByRole("tab").every(tab => tab.getAttribute("aria-selected") === "false")).toBe(true);
});

it("uses native destinations and aria-current while retaining modified link activation", () => {
  const navigate = vi.fn();
  render(<NavigationBar aria-label="平台导航" items={[{ id: "home", label: "教学工作台", href: "#home" }, { id: "course", label: "课程建设", href: "#course", count: 12 }]} activeId="course" onNavigate={navigate} />);
  expect(screen.getByRole("navigation", { name: "平台导航" })).toBeVisible();
  expect(screen.queryByRole("tablist")).toBeNull();
  const course = screen.getByRole("link", { name: "课程建设" });
  expect(course).toHaveAttribute("href", "#course");
  expect(course).toHaveAttribute("aria-current", "page");
  fireEvent.click(course, { ctrlKey: true });
  expect(navigate).not.toHaveBeenCalled();
  fireEvent.click(course);
  expect(navigate).toHaveBeenCalledOnce();
});

it("retains a stateful shared editor and untouched nested Tabs when the scope changes", () => {
  function Editor() { const [draft, setDraft] = useState(""); return <><input aria-label="范围编辑草稿" value={draft} onChange={event => setDraft(event.target.value)} /><Tabs aria-label="正文普通Tabs" items={[{ value: "normal", label: "旧默认", content: "普通内容" }]} /></>; }
  function Example() { const [value, setValue] = useState("shared"); return <ScopeNavigation items={scopes} value={value} onValueChange={setValue}><Editor /></ScopeNavigation>; }
  render(<Example />);
  const draft = screen.getByRole("textbox", { name: "范围编辑草稿" });
  fireEvent.change(draft, { target: { value: "不丢失的草稿" } });
  const oldTabs = screen.getByRole("tab", { name: "旧默认" }).closest('[data-rain-id="ui-tabs"]');
  expect(oldTabs).not.toHaveAttribute("data-visual-preset");
  fireEvent.click(screen.getByRole("tab", { name: "教学班 1" }));
  expect(screen.getByRole("textbox", { name: "范围编辑草稿" })).toBe(draft);
  expect(draft).toHaveValue("不丢失的草稿");
  expect(screen.getByRole("tab", { name: "旧默认" }).closest('[data-rain-id="ui-tabs"]')).toBe(oldTabs);
});

it("renders the approved plain navigation count while preserving ordinary Tabs parentheses", () => {
  const items=[{value:'counted',label:'计数样本',count:12,content:null}];
  const {rerender}=render(<NavigationTabs aria-label="计数" items={items}/>);
  expect(screen.getByRole('tab',{name:'计数样本'}).querySelector('[data-part="count"]')).toHaveTextContent(/^12$/);
  rerender(<Tabs aria-label="计数" items={items}/>);
  expect(screen.getByRole('tab',{name:'计数样本'}).querySelector('[data-part="count"]')).toHaveTextContent(/^\(12\)$/);
});

it("omits More when all classes are visible and recomputes the hidden count after a limit change", () => {
  const { rerender } = render(<ScopeNavigation items={scopes.slice(0,3)} value="shared" onValueChange={()=>{}} />);
  expect(screen.queryByRole('button',{name:'更多班级'})).toBeNull();
  rerender(<ScopeNavigation items={scopes} value="class-200" visibleLimit={3} onValueChange={()=>{}} />);
  expect(screen.getByRole('button',{name:'更多班级'})).toHaveTextContent('198');
});
