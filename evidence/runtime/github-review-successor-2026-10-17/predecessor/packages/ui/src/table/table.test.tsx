import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import * as UI from "../index";

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
