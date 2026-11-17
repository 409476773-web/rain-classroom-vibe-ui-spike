import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import * as UI from "../index";
import { MoreHorizontalIcon } from "../icons/more-horizontal";

it("cycles a controlled header sort without owning the records or activating adjacent actions", async () => {
  const more = vi.fn();
  function Consumer() {
    const [direction, setDirection] = useState<"none" | "ascending" | "descending">("none");
    return <UI.Table><UI.TableHeader><UI.TableRow><UI.TableHead aria-sort={direction}>
      <UI.TableHeaderContent actions={<UI.TableHeaderAction icon={<MoreHorizontalIcon/>} aria-label="课程列操作" onClick={more}/> }>
        <UI.TableSortButton label="课程" direction={direction} onDirectionChange={setDirection}/>
      </UI.TableHeaderContent>
    </UI.TableHead></UI.TableRow></UI.TableHeader></UI.Table>;
  }
  render(<Consumer/>);
  const sort = screen.getByRole("button", { name: "按课程排序" });
  for (const direction of ["ascending", "descending", "none"]) {
    await userEvent.click(sort);
    expect(screen.getByRole("columnheader")).toHaveAttribute("aria-sort", direction);
  }
  expect(more).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole("button", { name: "课程列操作" }));
  expect(more).toHaveBeenCalledOnce();
  expect(screen.getByRole("columnheader")).toHaveAttribute("aria-sort", "none");
});

it("keeps sort and action controls keyboard accessible and honors disabled state and refs", async () => {
  const change = vi.fn(), ref = createRef<HTMLButtonElement>();
  render(<UI.TableHeaderContent actions={<UI.TableHeaderAction ref={ref} icon={<MoreHorizontalIcon/>} aria-label="列菜单" open active/>}>
    <UI.TableSortButton label="分数" direction="none" disabled onDirectionChange={change}/>
  </UI.TableHeaderContent>);
  await userEvent.click(screen.getByRole("button", { name: "按分数排序" }));
  expect(change).not.toHaveBeenCalled();
  expect(ref.current).toBe(screen.getByRole("button", { name: "列菜单" }));
  expect(ref.current).toHaveAttribute("data-open");
  expect(ref.current).toHaveAttribute("data-active");
  await userEvent.tab();
  expect(ref.current).toHaveFocus();
});

it("preserves multi-level native scopes, spans and header layer metadata", () => {
  render(<UI.Table><UI.TableHeader>
    <UI.TableRow><UI.TableHead rowSpan={2}>学生</UI.TableHead><UI.TableHead colSpan={2} scope="colgroup">考核</UI.TableHead></UI.TableRow>
    <UI.TableRow headerLayer="control" titleLines={2}><UI.TableHead align="end">成绩</UI.TableHead><UI.TableHead>权重</UI.TableHead></UI.TableRow>
  </UI.TableHeader></UI.Table>);
  expect(screen.getByRole("columnheader", { name: "学生" })).toHaveAttribute("rowspan", "2");
  expect(screen.getByRole("columnheader", { name: "考核" })).toHaveAttribute("scope", "colgroup");
  expect(screen.getByRole("columnheader", { name: "考核" })).toHaveAttribute("colspan", "2");
  expect(screen.getByRole("columnheader", { name: "成绩" })).toHaveAttribute("data-align", "end");
  expect(screen.getByRole("columnheader", { name: "成绩" }).closest("tr")).toHaveAttribute("data-header-layer", "control");
});

it("associates header control labels with the existing field and keeps its input state in the host", async () => {
  const change = vi.fn();
  render(<UI.TableHeaderControl label="权重" htmlFor="shared-weight"><UI.Input id="shared-weight" defaultValue="10" onValueChange={change}/></UI.TableHeaderControl>);
  await userEvent.clear(screen.getByRole("textbox", { name: "权重" }));
  await userEvent.type(screen.getByRole("textbox", { name: "权重" }), "20");
  expect(screen.getByRole("textbox", { name: "权重" })).toHaveValue("20");
  expect(change).toHaveBeenLastCalledWith("20");
});

it("preserves native table structure, caption, column scope, row state and ref", () => {
  expect(UI.Table).toBeDefined();
  const ref = createRef<HTMLTableElement>();
  render(<UI.TableScrollArea aria-label="资料表滚动区"><UI.Table ref={ref}>
    <UI.TableCaption>课程资料</UI.TableCaption><UI.TableHeader><UI.TableRow><UI.TableHead>标题</UI.TableHead></UI.TableRow></UI.TableHeader>
    <UI.TableBody><UI.TableRow selected><UI.TableCell>教学案例</UI.TableCell></UI.TableRow></UI.TableBody>
    <UI.TableFooter><UI.TableRow><UI.TableCell>1 份资料</UI.TableCell></UI.TableRow></UI.TableFooter>
  </UI.Table></UI.TableScrollArea>);
  expect(screen.getByRole("table", { name: "课程资料" })).toBe(ref.current);
  expect(screen.getByRole("columnheader")).toHaveAttribute("scope", "col");
  expect(screen.getByRole("cell", { name: "教学案例" }).closest("tr")).toHaveAttribute("data-state", "selected");
  expect(screen.getByRole("region", { name: "资料表滚动区" })).toHaveAttribute("tabindex", "0");
});

it("scrolls only the focused region with arrow keys and respects child controls and canceled events", () => {
  const { rerender } = render(<UI.TableScrollArea aria-label="资料"><button>行操作</button></UI.TableScrollArea>);
  const area = screen.getByRole("region", { name: "资料" });
  Object.defineProperty(area, "clientWidth", { value: 200 });
  fireEvent.keyDown(area, { key: "ArrowRight" });
  expect(area.scrollLeft).toBe(100);
  fireEvent.keyDown(screen.getByRole("button"), { key: "ArrowRight" });
  fireEvent.keyDown(area, { key: "ArrowRight", shiftKey: true });
  expect(area.scrollLeft).toBe(100);
  rerender(<UI.TableScrollArea aria-label="资料" onKeyDown={event => event.preventDefault()} />);
  fireEvent.keyDown(area, { key: "ArrowRight" });
  expect(area.scrollLeft).toBe(100);
});

it("leaves empty-state actions interactive and composes a real heading", async () => {
  expect(UI.Empty).toBeDefined();
  const reset = vi.fn();
  render(<UI.Empty><UI.EmptyTitle>没有找到相关资料</UI.EmptyTitle><UI.EmptyDescription>试试其他关键词。</UI.EmptyDescription>
    <UI.EmptyActions><UI.Button onClick={reset}>清空筛选</UI.Button></UI.EmptyActions></UI.Empty>);
  expect(screen.getByRole("heading", { name: "没有找到相关资料" })).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "清空筛选" }));
  expect(reset).toHaveBeenCalledOnce();
});
