import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { AvatarGroup } from "./avatar-group";
import { AvatarGrid } from "./avatar-grid";

const members = Array.from({ length: 12 }, (_, i) => ({ id: String(i), name: `成员${i + 1}` }));
it("counts More within max and keeps the two actions siblings", async () => {
  const open = vi.fn();
  const { container, rerender } = render(<AvatarGroup members={members.slice(0, 9)} label="课程成员" />);
  expect(container.querySelectorAll('[data-rain-id="ui-avatar"]')).toHaveLength(9);
  expect(screen.queryByRole("button")).toBeNull();
  rerender(<AvatarGroup members={members} label="课程成员" onClick={open} render={<button type="button" />} />);
  expect(container.querySelectorAll('[data-rain-id="ui-avatar"]')).toHaveLength(8);
  expect(container.querySelector("button button")).toBeNull();
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "课程成员" }));
  expect(open).toHaveBeenCalledOnce();
  const more = screen.getByRole("button", { name: "查看其余4位成员" });
  await user.click(more);
  expect(open).toHaveBeenCalledOnce();
  const dialog = screen.getByRole("dialog");
  expect(within(dialog).getByText("成员9")).toBeInTheDocument();
  expect(within(dialog).getByText("成员12")).toBeInTheDocument();
  await user.keyboard("{Escape}");
  expect(more).toHaveFocus();
});

it("renders the grid count from zero to nine and truncates without a More action", () => {
  const { container, rerender } = render(<AvatarGrid members={[]} label="学习小组" />);
  expect(screen.getByRole("img", { name: "学习小组，暂无" })).toHaveAttribute("data-count", "0");
  expect(screen.getByText("暂无")).toBeInTheDocument();
  for (let count = 1; count <= 12; count++) {
    rerender(<AvatarGrid members={members.slice(0, count)} label="学习小组" />);
    expect(container.querySelectorAll('[data-rain-id="ui-avatar"]')).toHaveLength(Math.min(count, 9));
    expect(screen.queryByRole("button")).toBeNull();
  }
  rerender(<AvatarGrid members={members} label="进入学习小组" render={<a href="#group" />} />);
  expect(screen.getByRole("link", { name: "进入学习小组" })).toHaveAttribute("href", "#group");
  expect(container.querySelectorAll("a")).toHaveLength(1);
});
