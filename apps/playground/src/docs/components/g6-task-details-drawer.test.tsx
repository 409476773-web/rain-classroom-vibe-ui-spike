import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { TaskDetailsDrawer } from "./g6-task-details-drawer";
let originalWidth: PropertyDescriptor | undefined;
function setViewportWidth(value: number) {
  Object.defineProperty(window, "innerWidth", { configurable: true, writable: true, value });
  window.dispatchEvent(new Event("resize"));
}

// JSDOM has no layout observer. Geometry and pointer resize are checked in the browser.
beforeEach(() => {
  originalWidth = Object.getOwnPropertyDescriptor(window, "innerWidth");
  vi.stubGlobal("ResizeObserver", class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
  const originalRect = HTMLElement.prototype.getBoundingClientRect;
  // The resize engine hit-tests document pointer events. A zero rectangle would
  // incorrectly classify every JSDOM click at (0,0) as a separator drag.
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    if (this.getAttribute("data-slot") === "resizable-handle") {
      return { x: 542, y: 0, left: 542, right: 544, top: 0, bottom: 768, width: 2, height: 768, toJSON() {} } as DOMRect;
    }
    return originalRect.call(this);
  });
});
afterEach(() => {
  vi.restoreAllMocks(); vi.unstubAllGlobals();
  if (originalWidth) Object.defineProperty(window, "innerWidth", originalWidth);
});

it("keeps one right-hand non-modal popup while the operable list changes its current task", async () => {
  const user = userEvent.setup();
  render(<TaskDetailsDrawer />);
  const first = screen.getByRole("button", { name: "查看任务：找一个值得追问的问题" });
  const second = screen.getByRole("button", { name: "查看任务：比较两种解释" });
  await user.click(first);
  const popup = await screen.findByRole("dialog", { name: "找一个值得追问的问题" });
  expect(popup).toHaveAttribute("data-swipe-direction", "right");
  expect(popup).not.toHaveAttribute("aria-modal", "true");
  expect(document.querySelector('[data-slot="drawer-overlay"]')).toBeNull();
  expect(first).toHaveAttribute("aria-expanded", "true");
  await waitFor(() => expect(within(popup).getByRole("button", { name: "关闭任务详情" })).toHaveFocus());
  await user.click(second);
  expect(screen.getByRole("dialog", { name: "比较两种解释" })).toBe(popup);
  expect(screen.getAllByRole("dialog")).toHaveLength(1);
  expect(second).toHaveFocus();
  expect(second).toHaveAttribute("aria-expanded", "true");
  expect(second).toHaveAttribute("aria-current", "true");
  expect(first).toHaveAttribute("aria-expanded", "false");
  expect(first).not.toHaveAttribute("aria-current");
  await user.click(second);
  expect(screen.getByRole("dialog")).toBe(popup);
});

it("allows outside pointer actions without dismissing the active task", async () => {
  const user = userEvent.setup();
  render(<><button>页面上的其他操作</button><TaskDetailsDrawer /></>);
  await user.click(screen.getByRole("button", { name: "查看任务：找一个值得追问的问题" }));
  const popup = await screen.findByRole("dialog");
  const outside = screen.getByRole("button", { name: "页面上的其他操作" });
  await user.click(outside);
  expect(outside).toHaveFocus();
  expect(screen.getByRole("dialog")).toBe(popup);
});

it("browses in order without wrapping and keeps focus on an available navigation control", async () => {
  const user = userEvent.setup();
  render(<TaskDetailsDrawer />);
  await user.click(screen.getByRole("button", { name: "查看任务：找一个值得追问的问题" }));
  const popup = await screen.findByRole("dialog");
  const previous = within(popup).getByRole("button", { name: "前一项" });
  const next = within(popup).getByRole("button", { name: "后一项" });
  expect(previous).toBeDisabled();
  expect(within(popup).getByText("1 / 3")).toBeInTheDocument();
  await user.click(next);
  expect(screen.getByRole("dialog", { name: "比较两种解释" })).toBe(popup);
  expect(next).toHaveFocus();
  await user.click(next);
  expect(popup).toHaveAccessibleName("带着证据分享你的判断");
  expect(next).toBeDisabled();
  expect(previous).toHaveFocus();
  expect(within(popup).getByText("3 / 3")).toBeInTheDocument();
  await user.click(previous);
  expect(popup).toHaveAccessibleName("比较两种解释");
  expect(previous).toHaveFocus();
  await user.click(previous);
  expect(popup).toHaveAccessibleName("找一个值得追问的问题");
  expect(previous).toBeDisabled();
  expect(next).toHaveFocus();
});

it("resets reading scroll for a new task and restores the latest task entry on close", async () => {
  const user = userEvent.setup();
  render(<TaskDetailsDrawer />);
  await user.click(screen.getByRole("button", { name: "查看任务：找一个值得追问的问题" }));
  const popup = await screen.findByRole("dialog");
  const body = popup.querySelector('[data-slot="drawer-body"]') as HTMLElement;
  body.scrollTop = 320;
  await user.click(within(popup).getByRole("button", { name: "后一项" }));
  expect(body.scrollTop).toBe(0);
  await user.click(within(popup).getByRole("button", { name: "关闭任务详情" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  const second = screen.getByRole("button", { name: "查看任务：比较两种解释" });
  await waitFor(() => expect(second).toHaveFocus());
  expect(second).toHaveAttribute("aria-expanded", "false");
  expect(second).not.toHaveAttribute("aria-current");
});

it("returns to the current task after Escape and reopens the requested task", async () => {
  const user = userEvent.setup();
  render(<TaskDetailsDrawer />);
  const third = screen.getByRole("button", { name: "查看任务：带着证据分享你的判断" });
  await user.click(third);
  await screen.findByRole("dialog", { name: "带着证据分享你的判断" });
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  await waitFor(() => expect(third).toHaveFocus());
  await user.click(screen.getByRole("button", { name: "查看任务：找一个值得追问的问题" }));
  expect(await screen.findByRole("dialog")).toHaveAccessibleName("找一个值得追问的问题");
});

it("expands requirements, table rows and width independently in the same popup", async () => {
  const user = userEvent.setup();
  render(<TaskDetailsDrawer />);
  await user.click(screen.getByRole("button", { name: "查看任务：比较两种解释" }));
  const popup = await screen.findByRole("dialog", { name: "比较两种解释" });
  const table = within(popup).getByRole("table", { name: "小组完成明细" });
  expect(within(table).getAllByRole("row")).toHaveLength(4);
  expect(within(table).getAllByRole("columnheader")).toHaveLength(8);
  await user.click(within(popup).getByRole("button", { name: "展开宽度" }));
  expect(screen.getByRole("dialog", { name: "比较两种解释" })).toBe(popup);
  expect(within(table).getAllByRole("row")).toHaveLength(4);
  const collapse = within(popup).getByRole("button", { name: "收起宽度" });
  expect(collapse).toHaveAttribute("aria-pressed", "true");
  await user.click(within(popup).getByRole("button", { name: "展开完整要求" }));
  expect(within(table).getAllByRole("row")).toHaveLength(4);
  expect(within(popup).getByText("核对证据的来源和收集条件。一份材料中的结论不一定适用于另一个情境，讨论时要保留时间、样本和观察方法等背景。")).toBeInTheDocument();
  await user.click(within(popup).getByRole("button", { name: "查看全部8组" }));
  expect(within(table).getAllByRole("row")).toHaveLength(9);
  expect(collapse).toBeInTheDocument();
  await user.click(within(popup).getByRole("button", { name: "收起要求" }));
  expect(within(table).getAllByRole("row")).toHaveLength(9);
  await user.click(within(popup).getByRole("button", { name: "返回3组预览" }));
  expect(within(table).getAllByRole("row")).toHaveLength(4);
  await user.click(collapse);
  expect(within(popup).getByRole("button", { name: "展开宽度" })).toHaveAttribute("aria-pressed", "false");
});

it("opens tasks from the whole row and restores each task's reading state", async () => {
  const user = userEvent.setup();
  render(<TaskDetailsDrawer />);
  await user.click(screen.getByRole("button", { name: "查看任务：比较两种解释" }));
  const popup = await screen.findByRole("dialog");
  await user.click(within(popup).getByRole("button", { name: "展开宽度" }));
  await user.click(within(popup).getByRole("button", { name: "展开完整要求" }));
  await user.click(within(popup).getByRole("button", { name: "查看全部8组" }));
  const body = popup.querySelector('[data-slot="drawer-body"]') as HTMLElement;
  body.scrollTop = 320;
  const tableScroll = within(popup).getByRole("region", { name: "小组完成明细横向滚动区" });
  tableScroll.scrollLeft = 120;
  fireEvent.scroll(tableScroll);
  await user.click(screen.getByText("对照两份材料，找出解释的共同点与分歧。"));
  expect(body.scrollTop).toBe(320);
  expect(within(popup).getByRole("button", { name: "收起要求" })).toBeInTheDocument();
  await user.click(within(popup).getByRole("button", { name: "后一项" }));
  expect(popup).toHaveAccessibleName("带着证据分享你的判断");
  expect(within(popup).getByRole("button", { name: "收起宽度" })).toBeInTheDocument();
  expect(within(popup).getByRole("button", { name: "展开完整要求" })).toBeInTheDocument();
  expect(body.scrollTop).toBe(0);
  await user.click(screen.getByText("对照两份材料，找出解释的共同点与分歧。"));
  expect(popup).toHaveAccessibleName("比较两种解释");
  expect(body.scrollTop).toBe(320);
  expect(within(popup).getByRole("button", { name: "收起要求" })).toBeInTheDocument();
  expect(within(within(popup).getByRole("table")).getAllByRole("row")).toHaveLength(9);
  expect(within(popup).getByRole("region", { name: "小组完成明细横向滚动区" }).scrollLeft).toBe(120);
});

it("limits widened details to preserve readable list space and restores the normal width", async () => {
  setViewportWidth(1024);
  const user = userEvent.setup();
  render(<TaskDetailsDrawer />);
  await user.click(screen.getByRole("button", { name: "查看任务：比较两种解释" }));
  const popup = await screen.findByRole("dialog");
  expect(popup.style.getPropertyValue("--drawer-content-width")).toBe("480px");
  await user.click(within(popup).getByRole("button", { name: "展开宽度" }));
  expect(parseFloat(popup.style.getPropertyValue("--drawer-content-width"))).toBeLessThanOrEqual(720);
  await user.click(within(popup).getByRole("button", { name: "收起宽度" }));
  expect(popup.style.getPropertyValue("--drawer-content-width")).toBe("480px");
  expect(within(popup).getByRole("button", { name: "展开宽度" })).toBeInTheDocument();
});

it("uses a right-hand full-width detail at tablet widths without a competing resize control", async () => {
  setViewportWidth(742);
  const user = userEvent.setup();
  render(<TaskDetailsDrawer />);
  await user.click(screen.getByRole("button", { name: "查看任务：比较两种解释" }));
  const popup = await screen.findByRole("dialog");
  expect(popup).toHaveAttribute("data-swipe-direction", "right");
  expect(popup.style.getPropertyValue("--drawer-content-width")).toBe("100vw");
  expect(screen.queryByRole("separator", { name: "调整任务详情宽度" })).toBeNull();
  expect(document.querySelector('[data-slot="drawer-overlay"]')).not.toBeNull();
  await waitFor(() => expect(within(popup).getByRole("button", { name: "关闭任务详情" })).toHaveFocus());
});

it("returns focused resize controls to the popup before narrow mode removes them", async () => {
  const user = userEvent.setup();
  render(<TaskDetailsDrawer />);
  await user.click(screen.getByRole("button", { name: "查看任务：比较两种解释" }));
  const popup = await screen.findByRole("dialog");
  screen.getByRole("separator", { name: "调整任务详情宽度" }).focus();
  await act(async () => { setViewportWidth(390); });
  expect(screen.queryByRole("separator")).toBeNull();
  expect(within(popup).getByRole("button", { name: "关闭任务详情" })).toHaveFocus();
  expect(within(popup).queryByRole("button", { name: "展开宽度" })).toBeNull();
});
