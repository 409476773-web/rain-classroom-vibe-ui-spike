import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { TaskDetailsDrawer } from "./g6-task-details-drawer";

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
